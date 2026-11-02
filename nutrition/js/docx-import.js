// ═══════════════════════════════════════════════════════════
// 📂 IMPORT .DOCX SYSTEM
// ═══════════════════════════════════════════════════════════

let _importParsed = null; // stores last parsed result

function triggerDocxImport() {
  document.getElementById('docx-file-input').value = '';
  document.getElementById('docx-file-input').click();
}

function openImportModal() {
  document.getElementById('import-modal').classList.add('show');
  document.getElementById('imp-results').style.display = 'none';
  document.getElementById('imp-drop-zone').style.display = 'block';
  document.getElementById('imp-progress').classList.remove('show');
  document.getElementById('imp-apply-btn').style.display = 'none';
  _importParsed = null;
}

function closeImportModal() {
  document.getElementById('import-modal').classList.remove('show');
}

function handleDocxDrop(e) {
  const file = e.dataTransfer.files[0];
  if (!file) return;
  if (!file.name.endsWith('.docx')) { toast('Please upload a .docx Word file', 'error'); return; }
  processDocxFile(file);
}

function handleDocxImport(input) {
  const file = input.files[0];
  if (!file) return;
  openImportModal();
  processDocxFile(file);
}

function setImpProgress(pct, text) {
  document.getElementById('imp-progress').classList.add('show');
  document.getElementById('imp-prog-bar').style.width = pct + '%';
  document.getElementById('imp-prog-text').textContent = text;
}

function toggleRawText() {
  const el = document.getElementById('imp-raw-text');
  const tog = document.getElementById('imp-raw-toggle');
  const show = el.style.display === 'none';
  el.style.display = show ? 'block' : 'none';
  tog.textContent = show ? '[hide]' : '[show]';
}

async function processDocxFile(file) {
  openImportModal();
  document.getElementById('imp-drop-zone').style.display = 'none';
  setImpProgress(20, 'Reading .docx file...');

  try {
    const arrayBuffer = await file.arrayBuffer();
    setImpProgress(50, 'Extracting text content...');

    const result = await mammoth.extractRawText({ arrayBuffer });
    const rawText = result.value || '';
    setImpProgress(80, 'Parsing plan data...');

    const parsed = parseDocxText(rawText);
    _importParsed = parsed;
    _importParsed._rawText = rawText;
    _importParsed._fileName = file.name;

    setImpProgress(100, 'Done! Review and apply below.');
    renderImportResults(parsed, rawText);

  } catch (err) {
    console.error('Import error:', err);
    setImpProgress(0, '');
    document.getElementById('imp-progress').classList.remove('show');
    document.getElementById('imp-drop-zone').style.display = 'block';
    toast('Could not read file. Make sure it is a valid .docx', 'error');
  }
}

// ── Smart text parser ──────────────────────────────────────
function parseDocxText(text) {
  const lines = text.split(/\n/).map(l => l.trim()).filter(Boolean);
  const parsed = {
    name: '', nameAr: '', coach: '', goal: '', phase: '',
    cal: '', prot: '', carbs: '', fats: '', water: '',
    meals: [], supps: [], notes: ''
  };

  // Helper: extract number after pattern
  function extractNum(pattern, src) {
    const m = src.match(pattern);
    return m ? m[1].replace(/,/g,'') : '';
  }

  const full = text;

  // ── Client name: look for common patterns ──
  // English name: after "Client:" or "Name:" or "الاسم:" or first capitalized line
  const nameMatch = full.match(/(?:client|name|client name|اسم العميل|الاسم)\s*[:\-–]\s*([A-Za-z\u0600-\u06FF][^\n,]{2,40})/i);
  if (nameMatch) parsed.name = nameMatch[1].trim();

  // Arabic name: look for Arabic text near name
  const arNameMatch = full.match(/(?:الاسم|اسم العميل|العميل)\s*[:\-–]\s*([\u0600-\u06FF][^\n]{2,40})/);
  if (arNameMatch) parsed.nameAr = arNameMatch[1].trim();

  // Coach
  const coachMatch = full.match(/(?:coach|مدرب|المدرب|coached by)\s*[:\-–]?\s*([A-Za-z\u0600-\u06FF][^\n,]{2,40})/i);
  if (coachMatch) parsed.coach = coachMatch[1].trim();
  if (!parsed.coach && /loai|لؤي/i.test(full)) parsed.coach = 'Coach Loai Hassan';

  // Goal
  const goalMatch = full.match(/(?:goal|الهدف|target|هدف)\s*[:\-–]\s*([^\n,]{2,60})/i);
  if (goalMatch) parsed.goal = goalMatch[1].trim();
  else {
    if (/fat.?loss|تخسيس|حرق/i.test(full)) parsed.goal = 'Fat Loss';
    else if (/muscle.?gain|ضخامة|زيادة/i.test(full)) parsed.goal = 'Muscle Gain';
    else if (/maintain|recomp/i.test(full)) parsed.goal = 'Maintenance';
  }

  // Phase
  const phaseMatch = full.match(/(?:phase|المرحلة|مرحلة)\s*[:\-–]?\s*([^\n,]{1,40})/i);
  if (phaseMatch) parsed.phase = phaseMatch[1].trim();

  // ── Macros ──
  parsed.cal   = extractNum(/(?:calories?|سعرات?|kcal)[^\d]*?(\d{3,4})/i, full);
  parsed.prot  = extractNum(/(?:protein|بروتين)[^\d]*?(\d{2,3})/i, full);
  parsed.carbs = extractNum(/(?:carbs?|carbohydrate|كربوهيدرات)[^\d]*?(\d{2,3})/i, full);
  parsed.fats  = extractNum(/(?:fats?|دهون)[^\d]*?(\d{2,3})/i, full);
  parsed.water = extractNum(/(?:water|ماء|مياه)[^\d]*?(\d[\d.]*)\s*(?:l|liter|لتر)?/i, full);

  // ── Meals (markdown-table aware) ──
  // mammoth outputs DOCX tables as markdown-style pipe-delimited rows:
  //   | **الوجبة الأولى — الفطور / السحور  🌅** |
  //   | **الخيار الأول  ١** |
  //   | **اسم المكون** | **الكمية** | **ملاعق** |
  //   | بيض كامل | 2 بيضة |  |
  //   | ...
  // We need to:
  //   (a) strip pipes and markdown bold (**...**) from each line
  //   (b) detect meal headers, option markers, and header-name rows — and skip them
  //   (c) assign each food row to the active option (1, 2, or 3)
  //   (d) emit meal objects with both flat `items` (backward compat) AND `options` map

  const mealHeaderRe = /(وجبة|إفطار|افطار|غداء|عشاء|سناك|الوجبة|breakfast|lunch|dinner|snack|pre.?workout|post.?workout|meal\s*\d)/i;
  const tableHeaderRe = /^(?:اسم\s+المكون|الكمية|ملاعق|الخيار(?:ات)?|food\s+name?|qty|quantity|spoons?|tbsp|tablespoons?|servings?)\b/i;
  // Section boundary: lines that signal the MEAL PLAN section has ended.
  // These are the section headings that come AFTER the meals in the export template.
  // NOTE: "NUTRITION PLAN" and "OLYMPIC GYM" alone are NOT in this list because they
  // also appear at the TOP of the document (header), before any meals.
  // Only trigger after at least one meal has started.
  const sectionBoundaryRe = /^(?:daily\s+(?:grand\s+)?total|total\s+daily\s+intake|supplement\s+stack|coach\s+notes|ملاحظات|إجمالي|المكملات)\b/i;
  // Lines that are clearly junk and should never become food items
  const junkLineRe = /^(?:-+|—+|–+|\*+|={3,}|_{3,})$/;

  // Normalize Arabic-Indic ordinal digits to Latin
  function normOrd(s) {
    return s.replace(/[١۱]/g,'1').replace(/[٢۲]/g,'2').replace(/[٣۳]/g,'3')
            .replace(/[٤۴]/g,'4').replace(/[٥۵]/g,'5').replace(/[٦۶]/g,'6');
  }

  // Convert a raw markdown-table line → array of cell strings (or null if not a table line)
  function parseTableCells(line) {
    if (!line.includes('|')) return null;
    // Remove markdown bold
    let l = line.replace(/\*\*/g, '');
    // Strip leading/trailing pipes, split on |
    l = l.replace(/^\s*\|/, '').replace(/\|\s*$/, '');
    return l.split('|').map(c => c.trim());
  }

  // Check if cells form a table-header row (food/qty/spoons labels)
  function isHeaderRow(cells) {
    if (!cells) return false;
    return cells.some(c => c && tableHeaderRe.test(c.replace(/\*\*/g,'').trim()));
  }

  // Determine which option number (1,2,3) a cell-line's marker indicates (or 0 if none)
  function optionNumber(text) {
    const raw = text.replace(/\*\*/g,'').trim();
    const n   = normOrd(raw);
    if (/الخيار\s+الأول|الخيار\s+الأولى/.test(raw))   return 1;
    if (/الخيار\s+الثاني|الخيار\s+الثانية/.test(raw)) return 2;
    if (/الخيار\s+الثالث|الخيار\s+الثالثة/.test(raw)) return 3;
    const m = n.match(/(?:option|خيار)\s*([123])/i);
    if (m) return parseInt(m[1]);
    // Trailing "١" or "1" after "الخيار"
    const m2 = n.match(/الخيار[^\d]*([123])/);
    if (m2) return parseInt(m2[1]);
    return 0;
  }

  const mealMatches = [];
  let currentMeal = null;
  let currentOption = 1;
  let mealSectionEnded = false;

  for (const rawLine of lines) {
    // Strip markdown bold + pipes to get a plain form for detection
    const cells = parseTableCells(rawLine);
    const plainLine = (cells ? cells.join(' ') : rawLine).replace(/\*\*/g,'').trim();
    if (!plainLine) continue;

    // ── Section boundary? Only stop collecting if we've seen at least one meal. ──
    // This prevents "NUTRITION PLAN" / "OLYMPIC GYM" in the document HEADER from
    // short-circuiting the meal-plan scan before we've even found the first meal.
    if (sectionBoundaryRe.test(plainLine) && (currentMeal || mealMatches.length > 0)) {
      mealSectionEnded = true;
      if (currentMeal) {
        const hasAny = currentMeal.items.length > 0 ||
          [1,2,3].some(n => currentMeal.options[n] && currentMeal.options[n].length > 0);
        if (hasAny) mealMatches.push(currentMeal);
        currentMeal = null;
      }
      continue;
    }
    if (mealSectionEnded) continue;

    // ── Junk lines (separators, dashes) ──
    if (junkLineRe.test(plainLine)) continue;

    // ── 1. New meal header? ──
    // Only treat as a meal header if the plain form starts with a meal keyword.
    // We also reject lines that are clearly food rows (pipe-delimited with digits).
    const looksLikeFoodRow = cells && cells.length >= 2 && /\d/.test(rawLine) && !mealHeaderRe.test(plainLine.split(/\s+/)[0] || '');
    if (!looksLikeFoodRow && mealHeaderRe.test(plainLine) && plainLine.length < 80) {
      if (currentMeal) {
        const hasAny = currentMeal.items.length > 0 ||
          [1,2,3].some(n => currentMeal.options[n] && currentMeal.options[n].length > 0);
        if (hasAny) mealMatches.push(currentMeal);
      }
      currentMeal = { name: plainLine, items: [], options: { 1: [], 2: [], 3: [] } };
      currentOption = 1;
      continue;
    }

    if (!currentMeal) continue;

    // ── 2. Option marker? ──
    const optNum = optionNumber(plainLine);
    if (optNum > 0) {
      currentOption = optNum;
      continue;
    }

    // ── 3. Table header row (skip)? ──
    if (isHeaderRow(cells) || tableHeaderRe.test(plainLine)) continue;

    // ── 4. Food row ──
    // If we have pipe-cells, use them: cell[0] = food name, cell[1] = qty, cell[2] = spoons
    let foodName = '', qty = '';
    if (cells && cells.length >= 2) {
      // Find the first non-empty cell → food name
      foodName = (cells[0] || '').trim();
      // Find the first cell with a digit → qty
      for (let i = 1; i < cells.length; i++) {
        if (cells[i] && /\d/.test(cells[i])) { qty = cells[i].trim(); break; }
      }
    } else {
      // Non-tabular line: use old heuristic
      const gramMatch = rawLine.match(/(\d+(?:\.\d+)?)\s*(?:g|gram|grams|غرام|جرام|غ|جم)\b/i);
      qty = gramMatch ? gramMatch[0] : '';
      foodName = rawLine.replace(/\d+\s*(?:g|gram|grams|غرام|جرام|غ|جم|kg|ml|l)\b/gi, '').trim();
    }

    // ── Reject junk rows ──
    if (!foodName) continue;
    const nameClean = foodName.replace(/\*\*/g,'').replace(/\|/g,'').trim();
    if (!nameClean) continue;
    if (nameClean === '—' || nameClean === '-' || nameClean === '–') continue;
    if (nameClean.length < 2) continue;
    if (tableHeaderRe.test(nameClean)) continue;
    if (junkLineRe.test(nameClean)) continue;
    if (/^\s*(?:\*+|-+|—+|–+|={3,})\s*$/.test(nameClean)) continue;
    // Reject markdown table separators like "| --- |" or "---"
    if (/^-{2,}$/.test(nameClean)) continue;
    // Reject if the name is ONLY Latin uppercase words (header text like "SUPPLEMENT", "OLYMPIC GYM")
    if (/^[A-Z\s—\-]{4,}$/.test(nameClean)) continue;
    // Reject header-cell fragments that survive single-cell lines after pipe splitting
    // (e.g. "| اسم المكون |" → cells=["اسم المكون"], name="اسم المكون")
    if (/^(?:اسم\s*المكون|الكمي[ةه]|ملاع[قي]|ملعق[ةه]|الخيار|خيار\s*\d*|اسم|ingredient|quantity|amount|qty)\s*$/i.test(nameClean)) continue;

    const entry = { name: nameClean, qty };
    currentMeal.items.push(entry);
    if (currentMeal.options[currentOption]) currentMeal.options[currentOption].push(entry);
  }

  if (currentMeal) {
    const hasAny = currentMeal.items.length > 0 ||
      [1,2,3].some(n => currentMeal.options[n] && currentMeal.options[n].length > 0);
    if (hasAny) mealMatches.push(currentMeal);
  }
  parsed.meals = mealMatches;

  // ── Supplements ──
  const suppKeywords = ['creatine', 'protein powder', 'whey', 'casein', 'omega', 'vitamin', 'bcaa', 'pre-workout', 'caffeine', 'zinc', 'magnesium', 'كرياتين', 'واي', 'أوميغا', 'فيتامين', 'بروتين'];
  const suppRe = new RegExp(`(${suppKeywords.join('|')})`, 'gi');
  const suppLines = lines.filter(l => suppRe.test(l));
  parsed.supps = suppLines.map(l => l.trim()).filter((v,i,a) => a.indexOf(v) === i).slice(0,10);

  // ── Coach notes ──
  const notesMatch = full.match(/(?:notes?|ملاحظات|تعليمات|تنبيه)[:\-–]?\s*([\s\S]{10,500}?)(?=\n\n|\n[A-Z\u0600-\u06FF]|$)/i);
  if (notesMatch) parsed.notes = notesMatch[1].trim();

  return parsed;
}

// ── Render parsed results into modal ───────────────────────
function renderImportResults(p, rawText) {
  // Fill editable fields
  document.getElementById('imp-c-name').value  = p.name;
  document.getElementById('imp-c-name-ar').value = p.nameAr;
  document.getElementById('imp-c-coach').value = p.coach || 'Coach Loai Hassan';
  document.getElementById('imp-c-goal').value  = p.goal;
  document.getElementById('imp-c-phase').value = p.phase;
  document.getElementById('imp-t-cal').value   = p.cal;
  document.getElementById('imp-t-prot').value  = p.prot;
  document.getElementById('imp-t-carbs').value = p.carbs;
  document.getElementById('imp-t-fats').value  = p.fats;
  document.getElementById('imp-t-water').value = p.water;

  // Meals grid
  const grid = document.getElementById('imp-meals-grid');
  grid.innerHTML = '';
  if (p.meals.length === 0) {
    grid.innerHTML = '<div style="font-size:12px;color:#444;padding:8px;">No meals detected automatically. You can add them manually after applying.</div>';
  } else {
    p.meals.forEach(m => {
      const card = document.createElement('div');
      card.className = 'imp-meal-card';
      card.innerHTML = `<div class="imp-meal-name">${m.name}</div>
        <div class="imp-meal-items">${m.items.map(i =>
          `<div class="imp-meal-item"><span>${i.name}</span><span style="color:#555;">${i.qty}</span></div>`
        ).join('') || '<span style="color:#444;font-size:11px;">No items parsed</span>'}</div>`;
      grid.appendChild(card);
    });
  }

  // Supplements
  if (p.supps.length > 0) {
    document.getElementById('imp-supps-section').style.display = 'block';
    document.getElementById('imp-supps-list').innerHTML = p.supps.map(s => `• ${s}`).join('<br>');
  }

  // Notes
  if (p.notes) {
    document.getElementById('imp-notes-section').style.display = 'block';
    document.getElementById('imp-coach-notes').value = p.notes;
  }

  // Raw text
  document.getElementById('imp-raw-text').textContent = rawText;

  // Show results
  document.getElementById('imp-results').style.display = 'block';
  document.getElementById('imp-apply-btn').style.display = 'inline-flex';
}

// ── Apply imported data to the main form ───────────────────
function applyImportedPlan() {
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el && val) { el.value = val; el.dispatchEvent(new Event('input')); }
  };

  setVal('c-name',       document.getElementById('imp-c-name').value);
  setVal('c-name-ar',    document.getElementById('imp-c-name-ar').value);
  setVal('c-coach-name', document.getElementById('imp-c-coach').value);
  setVal('c-goal',       document.getElementById('imp-c-goal').value);
  setVal('c-phase',      document.getElementById('imp-c-phase').value);
  setVal('t-cal',        document.getElementById('imp-t-cal').value);
  setVal('t-prot',       document.getElementById('imp-t-prot').value);
  setVal('t-carbs',      document.getElementById('imp-t-carbs').value);
  setVal('t-fats',       document.getElementById('imp-t-fats').value);
  setVal('t-water',      document.getElementById('imp-t-water').value);

  // Coach notes
  const notesVal = document.getElementById('imp-coach-notes').value;
  if (notesVal) setVal('coach-notes', notesVal);

  // ── Apply MEALS ──
  let mealRowsAdded = 0;
  let mealFoodsMatched = 0;
  let mealFoodsUnmatched = 0;
  if (_importParsed && Array.isArray(_importParsed.meals) && _importParsed.meals.length > 0) {
    const result = applyImportedMeals(_importParsed.meals);
    mealRowsAdded     = result.rowsAdded;
    mealFoodsMatched  = result.matched;
    mealFoodsUnmatched = result.unmatched;
  }

  // ── Apply SUPPLEMENTS ──
  let suppsAdded = 0;
  if (_importParsed && Array.isArray(_importParsed.supps) && _importParsed.supps.length > 0) {
    suppsAdded = applyImportedSupps(_importParsed.supps);
  }

  // Trigger recalculations
  if (typeof calcBMR === 'function') calcBMR();
  if (typeof macroLockSyncInputs === 'function') macroLockSyncInputs();
  if (typeof ccSync === 'function') ccSync();
  if (typeof updateGrandTotal === 'function') updateGrandTotal();
  if (typeof syncPreview === 'function') syncPreview();

  closeImportModal();
  showPage('client');

  // ── Build status message ──
  const bits = [];
  if (mealFoodsMatched > 0) bits.push(`${mealFoodsMatched} food${mealFoodsMatched===1?'':'s'} matched`);
  if (mealFoodsUnmatched > 0) bits.push(`${mealFoodsUnmatched} need${mealFoodsUnmatched===1?'s':''} review`);
  if (suppsAdded > 0) bits.push(`${suppsAdded} supplement${suppsAdded===1?'':'s'}`);
  const detail = bits.length ? ' (' + bits.join(', ') + ')' : '';

  if (mealFoodsUnmatched > 0) {
    toast(`✅ Plan imported${detail} — please review the Meals tab`, 'warning');
  } else if (mealRowsAdded > 0 || suppsAdded > 0) {
    toast(`✅ Plan imported${detail}`, 'success');
  } else {
    toast('✅ Plan imported — add meals manually in the Meals tab', 'success');
  }
}

// ── Apply imported meals: map each parsed meal to a slot, fuzzy-match each food ──
function applyImportedMeals(meals) {
  if (typeof FOOD_DB === 'undefined' || !FOOD_DB.length) {
    return { rowsAdded: 0, matched: 0, unmatched: 0 };
  }

  const MEAL_IDS = ['m1','m2','m3','m4','m5','m6'];

  // Keyword hints for mapping a parsed meal name → numbered slot
  const slotKeywords = {
    m1: ['الفطور','الإفطار','الافطار','السحور','الصباح','breakfast','morning','suhoor','سحور','الأولى','1','أولى'],
    m2: ['خفيفة','سناك','snack','mid.?morning','mid-morning','الثانية','2','ثانية'],
    m3: ['غداء','الرئيسية','lunch','main','الثالثة','3','ثالثة'],
    m4: ['ما قبل التمرين','قبل التمرين','pre.?workout','pre-workout','preworkout','الرابعة','4','رابعة'],
    m5: ['ما بعد التمرين','بعد التمرين','post.?workout','post-workout','postworkout','الخامسة','5','خامسة'],
    m6: ['عشاء','إفطار','افطار','المساء','dinner','evening','iftar','السادسة','6','سادسة']
  };

  // Build a fast lookup: which MEALS_DEF slot best matches this meal name?
  function matchMealSlot(name, usedSlots) {
    const lower = (name || '').toLowerCase();
    let bestSlot = null, bestScore = 0;
    for (const slot of MEAL_IDS) {
      if (usedSlots.has(slot)) continue;
      for (const kw of slotKeywords[slot]) {
        const re = new RegExp(kw, 'i');
        if (re.test(lower)) {
          const score = kw.length;
          if (score > bestScore) { bestScore = score; bestSlot = slot; }
        }
      }
    }
    return bestSlot;
  }

  // ── Fuzzy-match a food name against FOOD_DB ──
  // Returns the FOOD_DB index of the best match (or -1 if none good enough).
  //
  // Design notes:
  //   • Stopwords reject structural noise words (option labels, column headers,
  //     markdown artifacts) that leaked out of the DOCX parser.
  //   • Containment requires WHOLE-WORD boundaries so "ال" won't match
  //     inside "الخيار" and inflate the score of any 2-word food entry.
  //   • Threshold 70 % (was 50 %). Short names win only on full containment.
  function matchFood(query) {
    const qOrig = (query || '').trim();
    if (!qOrig || qOrig.length < 2) return -1;

    // Reject queries that are clearly table/meal structure, not food names.
    // Tested in BOTH raw and pipe-stripped forms.
    const STOPWORDS_FULL = [
      /^الخيار(\s+.*)?$/,      // "الخيار الأول", "الخيار 1", etc.
      /^اسم\s+المكون$/,
      /^الكمية$/,
      /^ملاعق$/,
      /^خيار(\s+.*)?$/,
      /^option(\s+\d+)?$/i,
      /^food\s*name$/i,
      /^(qty|quantity)$/i,
      /^(spoons?|tbsp|tablespoons?)$/i,
      /^(serving|servings|units?)$/i,
      /^(الوجبة|meal)(\s+.*)?$/i
    ];
    const qClean = qOrig.replace(/\|/g, ' ').replace(/\*\*/g,'').replace(/\s+/g,' ').trim();
    if (STOPWORDS_FULL.some(re => re.test(qClean))) return -1;

    // Remove pipes + markdown before normalization
    const normalize = (s) => s
      .toLowerCase()
      .replace(/\|/g, ' ')
      .replace(/\*\*/g, '')
      .replace(/\([^)]*\)/g, ' ')
      .replace(/\[[^\]]*\]/g, ' ')
      .replace(/[\u064B-\u0652\u0670]/g, '')      // Arabic diacritics
      .replace(/[إأآا]/g, 'ا').replace(/ى/g,'ي').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/ة/g,'ه')
      // Qty suffixes (standalone word) — avoid stripping inside names
      .replace(/\d+(?:[\.,]\d+)?\s*(?:g|gram|grams|غ|جم|جرام|غرام|kg|kilo|ml|l|liter|tbsp|tsp|ملعقة|حصه|scoop|cup|piece|pcs|قطعه|بيضه|شريحه|موزه|حبه|كبسوله|سكوب|تابلت)\b/gi, ' ')
      .replace(/[\u2013\u2014\-:;,\.،؛•·]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const q = normalize(qOrig);
    if (!q || q.length < 2) return -1;
    // Query words: min length 3 (kills "ال", "2 ", short junk)
    const qWords = q.split(' ').filter(w => w.length >= 3);
    if (qWords.length === 0) return -1;

    // Stopword word-list (Arabic article "ال" family + common structural words)
    const stopWordSet = new Set([
      'ال','او','من','في','مع','على','عند','بدون','الي',
      'الاول','الثاني','الثالث','الاولى','الثانيه','الثالثه',
      'الخيار','خيار','اسم','المكون','الكميه','ملاعق','ملعقه',
      'option','food','name','qty','spoon','spoons','tbsp','meal'
    ]);
    const qMeaningful = qWords.filter(w => !stopWordSet.has(w));
    if (qMeaningful.length === 0) return -1;

    let bestIdx = -1, bestScore = 0;
    let bestHasExactWordHit = false;

    for (let i = 0; i < FOOD_DB.length; i++) {
      const f = FOOD_DB[i];
      const ar = normalize(f.ar || '');
      const en = normalize(f.en || '');
      const targets = [ar, en].filter(Boolean);

      for (const t of targets) {
        if (!t) continue;

        // Perfect match = instant return
        if (t === q) return i;

        // Full containment (whole query fits inside target OR vice versa) —
        // require at least one meaningful query word AND the contained side
        // is at least 4 chars long, to avoid "ال" matching everything.
        if (t.length >= 4 && q.length >= 4) {
          if (t.includes(q) || q.includes(t)) {
            const score = Math.min(t.length, q.length) / Math.max(t.length, q.length) * 100;
            if (score > bestScore) { bestScore = score; bestIdx = i; bestHasExactWordHit = true; }
            continue;
          }
        }

        // Whole-word overlap: match only when entire words coincide or
        // one word is a strict suffix/prefix of ≥4 chars. Substring match
        // ("ال" inside "الخيار") is NOT allowed.
        const tWords = t.split(' ').filter(w => w.length >= 2);
        const tMeaningful = tWords.filter(w => !stopWordSet.has(w));
        if (tMeaningful.length === 0) continue;

        let overlap = 0;
        let hasExactWordHit = false;
        for (const qw of qMeaningful) {
          for (const tw of tMeaningful) {
            if (tw === qw) { overlap++; hasExactWordHit = true; break; }
            // Allow containment only if the shorter side is ≥ 4 chars
            if (qw.length >= 4 && tw.includes(qw)) { overlap++; break; }
            if (tw.length >= 4 && qw.includes(tw)) { overlap++; break; }
          }
        }
        if (overlap === 0) continue;
        const score = (overlap / Math.max(qMeaningful.length, tMeaningful.length)) * 100;
        // Prefer matches with exact word hits, and require higher score for matches without them
        const effectiveScore = score + (hasExactWordHit ? 20 : 0);
        if (effectiveScore > bestScore) {
          bestScore = effectiveScore;
          bestIdx = i;
          bestHasExactWordHit = hasExactWordHit;
        }
      }
    }
    // Threshold: 70% when no exact word hit, 50% when there IS one.
    // Exact-word hits are strong signals even at lower overlap (e.g. "موز" matching "موز ناضج")
    const minScore = bestHasExactWordHit ? 50 : 70;
    return bestScore >= minScore ? bestIdx : -1;
  }

  // ── Assign each parsed meal to a slot ──
  const usedSlots = new Set();
  const assigned = []; // [{slot, meal}]
  // First pass: keyword-matched assignments
  for (const meal of meals) {
    const slot = matchMealSlot(meal.name, usedSlots);
    if (slot) { assigned.push({ slot, meal }); usedSlots.add(slot); }
  }
  // Second pass: fill unmatched meals into next available slot in order
  const unassigned = meals.filter(m => !assigned.find(a => a.meal === m));
  for (const meal of unassigned) {
    const nextSlot = MEAL_IDS.find(s => !usedSlots.has(s));
    if (!nextSlot) break; // all 6 slots full
    assigned.push({ slot: nextSlot, meal });
    usedSlots.add(nextSlot);
  }

  let rowsAdded = 0;
  let matched = 0;
  let unmatched = 0;

  // ── For each assignment, populate all 3 option columns ──
  for (const { slot, meal } of assigned) {
    // Determine which options have content. If parser populated meal.options
    // (new format), use that. Otherwise fall back to meal.items → option 1 only.
    const optMap = meal.options && typeof meal.options === 'object' ? meal.options : null;
    const hasAnyOption = optMap && [1,2,3].some(n => Array.isArray(optMap[n]) && optMap[n].length > 0);

    let optionsToApply;
    if (hasAnyOption) {
      optionsToApply = { 1: optMap[1] || [], 2: optMap[2] || [], 3: optMap[3] || [] };
    } else {
      optionsToApply = { 1: Array.isArray(meal.items) ? meal.items : [], 2: [], 3: [] };
    }

    // ── Inner helper: fill one option column ──
    const fillOption = (optN, items) => {
      if (!items || items.length === 0) return;
      const container = document.getElementById('rows-' + slot + '-' + optN);
      if (!container) return;

      // Clear existing empty blanks (preserve any user-set rows)
      const existingRows = [...container.querySelectorAll('.food-row')];
      for (const r of existingRows) {
        const hasFood = r.dataset.foodName || (r.querySelector('.food-search')?.value || '').trim();
        if (!hasFood) r.remove();
      }

      for (const item of items) {
        if (!item || !item.name) continue;

        // Parse qty — supports grams, pieces, slices, spoons
        let grams = 0;
        let pieceCount = 0;
        let sliceCount = 0;
        const rawQty = String(item.qty || '');
        // Grams: "150g", "150 غ", "150غرام", "150جرام", "150جم"
        const gMatch = rawQty.match(/(\d+(?:\.\d+)?)\s*(?:g|gram|grams|غرام|جرام|غ|جم|kg)\b/i);
        if (gMatch) {
          grams = parseFloat(gMatch[1]);
          if (/kg/i.test(gMatch[0])) grams *= 1000;
        }
        // Pieces: "2 بيضة", "1 حبة", "1 موزة"
        const pMatch = rawQty.match(/(\d+(?:\.\d+)?)\s*(?:piece|pcs|بيضه|بيضة|حبه|حبة|موزه|موزة|كبسوله|كبسولة|تابلت|سكوب|scoop)\b/i);
        if (!grams && pMatch) pieceCount = parseFloat(pMatch[1]);
        // Slices: "1 شريحة", "2 slices"
        const sMatch = rawQty.match(/(\d+(?:\.\d+)?)\s*(?:slices?|شريحه|شريحة)\b/i);
        if (!grams && sMatch) sliceCount = parseFloat(sMatch[1]);

        // Also scan the food name itself for grams like "Rice 150g"
        if (!grams && !pieceCount && !sliceCount) {
          const inName = String(item.name).match(/(\d+(?:\.\d+)?)\s*(?:g|gram|غرام|جرام|غ|جم)\b/i);
          if (inName) grams = parseFloat(inName[1]);
        }

        const cleanName = String(item.name)
          .replace(/\|/g, ' ')
          .replace(/\*\*/g, '')
          .replace(/\d+\s*(?:g|gram|grams|غرام|جرام|غ|جم|kg|ml|l)\b/gi, '')
          .replace(/\s+/g, ' ')
          .trim();
        if (!cleanName) continue;

        // Add a new row
        addFoodRow(slot, optN);
        const rows = container.querySelectorAll('.food-row');
        const row = rows[rows.length - 1];
        if (!row) continue;
        rowsAdded++;

        // Match against FOOD_DB
        const dbIdx = matchFood(cleanName);
        if (dbIdx >= 0) {
          const food = FOOD_DB[dbIdx];
          const isEN = window._lang === 'en';
          const searchInput = row.querySelector('.food-search');
          const qtyInput = row.querySelector('.food-qty-input');
          const qtyLabel = row.querySelector('.food-qty-label');
          const tbspInput = row.querySelector('.food-tbsp-input');
          const tbspWrap = row.querySelector('.food-tbsp-wrap');
          const tbspLabel = row.querySelector('.food-tbsp-wrap .food-qty-label');

          searchInput.value = isEN ? (food.en || food.ar) : food.ar;
          row.dataset.foodCal  = food.cal;
          row.dataset.foodProt = food.prot;
          row.dataset.foodCarb = food.carb;
          row.dataset.foodFat  = food.fat;
          row.dataset.foodName    = food.ar;
          row.dataset.foodNameEn  = food.en || food.ar;
          row.dataset.foodCat     = food.cat;
          row.dataset.foodCatEn   = food.catEn || food.cat;
          row.dataset.foodUnit    = food.unit   || '';
          row.dataset.foodUnitEn  = food.unitEn || food.unit || '';
          row.dataset.foodUnitG   = food.unitG  || '';
          row.dataset.foodSliceG  = food.sliceG || '';
          row.dataset.foodMode    = (food.unit && food.unitG) ? 'unit' : 'grams';

          if (food.unit && food.unitG) {
            // Piece-based food
            if (qtyLabel) qtyLabel.textContent = (isEN && food.unitEn) ? food.unitEn : food.unit;
            qtyInput.placeholder = '1';
            qtyInput.step = '1';
            let pieces;
            if (pieceCount > 0) pieces = pieceCount;
            else if (grams > 0) pieces = Math.max(1, Math.round(grams / food.unitG));
            else pieces = 1;
            qtyInput.value = pieces;
            if (tbspWrap) tbspWrap.style.visibility = 'hidden';
            if (tbspInput) tbspInput.value = '';
          } else if (food.liq) {
            // Liquid food (milk, juice...): liters ⇄ cups toggle, default liters
            const base = food.liqBase || 100;
            row.dataset.foodLiq = '1';
            row.dataset.foodLiqBase = String(base);
            qtyInput.placeholder = '1';
            qtyInput.step = '0.25';
            qtyInput.value = grams > 0 ? Math.round((grams / 1000) * 100) / 100 : 1;
            if (typeof ogLiqSetUnit === 'function') ogLiqSetUnit(row, 'l');
            if (tbspWrap) tbspWrap.style.visibility = 'hidden';
            if (tbspInput) tbspInput.value = '';
          } else if (food.sliceG) {
            // Slice food: grams primary, slice count secondary
            if (qtyLabel) qtyLabel.textContent = isEN ? 'grams' : 'غرام';
            qtyInput.placeholder = '100';
            qtyInput.step = '1';
            let g;
            if (grams > 0) g = grams;
            else if (sliceCount > 0) g = Math.round(sliceCount * food.sliceG);
            else g = 100;
            qtyInput.value = g;
            if (tbspLabel) tbspLabel.textContent = isEN ? 'slices' : 'شريحة';
            if (tbspWrap) tbspWrap.style.visibility = 'visible';
            tbspInput.value = Math.round((g / food.sliceG) * 4) / 4;
            tbspInput.step = '0.25';
          } else {
            // Grams-based food
            if (qtyLabel) qtyLabel.textContent = isEN ? 'grams' : 'غرام';
            qtyInput.placeholder = '100';
            qtyInput.step = '1';
            qtyInput.value = grams > 0 ? grams : 100;
            if (tbspLabel) tbspLabel.textContent = isEN ? 'spoons' : 'ملعقة';
            if (tbspWrap) tbspWrap.style.visibility = 'visible';
            try {
              const t = (typeof gramToTbsp === 'function') ? gramToTbsp(parseFloat(qtyInput.value) || 100, food.ar, food.cat) : null;
              if (t != null && typeof formatTbspNum === 'function') tbspInput.value = formatTbspNum(t);
            } catch (e) { /* ignore */ }
          }

          if (typeof updateRowMacros === 'function') updateRowMacros(row);
          matched++;
        } else {
          // No DB match — leave text + flag row for user review
          const searchInput = row.querySelector('.food-search');
          if (searchInput) searchInput.value = cleanName;
          const qtyInput = row.querySelector('.food-qty-input');
          if (qtyInput && grams > 0) qtyInput.value = grams;
          row.style.background = 'rgba(255,184,0,0.06)';
          row.style.borderLeft = '3px solid #FFB800';
          row.title = 'Imported food not matched to database — please select manually';
          unmatched++;
        }
      }

      // Recompute option totals
      if (typeof recalcMealTotals === 'function') recalcMealTotals(slot, optN);
    };

    fillOption(1, optionsToApply[1]);
    fillOption(2, optionsToApply[2]);
    fillOption(3, optionsToApply[3]);
  }

  return { rowsAdded, matched, unmatched };
}

// ── Apply imported supplements (free-text lines → addSuppRow) ──
function applyImportedSupps(supps) {
  if (typeof addSuppRow !== 'function') return 0;
  let added = 0;
  for (const line of supps) {
    if (!line || typeof line !== 'string') continue;
    const trimmed = line.trim();
    if (!trimmed || trimmed.length < 3) continue;

    // Try to extract dose from patterns like "5g", "5 g", "30mg", "2 capsules", "1 scoop"
    let dose = '';
    const doseMatch = trimmed.match(/(\d+(?:\.\d+)?)\s*(g|gram|grams|mg|mcg|ug|iu|IU|ml|l|capsule|capsules|scoop|scoops|tablet|tablets|كبسوله|كبسولة|حبه|حبة|سكوب|ملعقة|غرام|جرام|غ|مغ|ملغ)\b/i);
    if (doseMatch) dose = doseMatch[0];

    // Try to extract timing
    let timing = '';
    const timingPatterns = [
      { re: /pre.?workout|قبل التمرين|قبل التدريب/i, val: 'Pre-workout' },
      { re: /post.?workout|بعد التمرين|بعد التدريب/i, val: 'Post-workout' },
      { re: /morning|صباح|الصباح/i, val: 'Morning' },
      { re: /before bed|قبل النوم|قبل نوم/i, val: 'Before bed' },
      { re: /breakfast|مع الفطور|مع الافطار/i, val: 'With breakfast' },
      { re: /lunch|مع الغداء/i, val: 'With lunch' },
      { re: /dinner|مع العشاء/i, val: 'With dinner' },
      { re: /between meals|بين الوجبات/i, val: 'Between meals' }
    ];
    for (const tp of timingPatterns) {
      if (tp.re.test(trimmed)) { timing = tp.val; break; }
    }

    // Extract the supplement name: strip dose + timing phrases
    let name = trimmed;
    if (doseMatch) name = name.replace(doseMatch[0], ' ');
    for (const tp of timingPatterns) name = name.replace(tp.re, ' ');
    name = name.replace(/[\u2013\u2014\-:;,\.،؛•·]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (!name) name = trimmed;

    addSuppRow(name, dose, timing);
    added++;
  }
  return added;
}

// Close modal on backdrop click
document.getElementById('import-modal').addEventListener('click', function(e) {
  if (e.target === this) closeImportModal();
});

// ═══════════════════════════════════════════════════════════
// 📷 INBODY AI PHOTO SCANNER
// ═══════════════════════════════════════════════════════════

let _ibPhotoBase64 = null;
let _ibPhotoType   = 'image/jpeg';

function ibHandleDrop(e) {
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) ibLoadPhoto(file);
  else toast('Please drop an image file', 'error');
}

function ibHandlePhotoUpload(input) {
  const file = input.files[0];
  if (file) ibLoadPhoto(file);
}

function ibLoadPhoto(file) {
  _ibPhotoType = file.type || 'image/jpeg';
  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;
    _ibPhotoBase64 = dataUrl.split(',')[1];
    // Show preview
    const preview = document.getElementById('ib-scan-preview');
    const placeholder = document.getElementById('ib-scan-placeholder');
    preview.src = dataUrl;
    preview.style.display = 'block';
    placeholder.style.display = 'none';
    // Show scan button
    document.getElementById('ib-scan-btn').style.display = 'inline-flex';
    document.getElementById('ib-scan-chips').style.display = 'none';
    document.getElementById('ib-scan-chips').innerHTML = '';
    document.getElementById('ib-scan-status').style.display = 'none';
  };
  reader.readAsDataURL(file);
}

function ibSetProgress(pct, text) {
  document.getElementById('ib-scan-status').style.display = 'block';
  document.getElementById('ib-scan-bar').style.width = pct + '%';
  document.getElementById('ib-scan-status-text').textContent = text;
}

// ── Tesseract OCR scan — 100% offline, no API key ──────────
let _tesseractWorker = null;

async function ibGetWorker() {
  if (_tesseractWorker) return _tesseractWorker;
  ibSetProgress(10, 'Loading OCR engine (first time only)...');
  _tesseractWorker = await Tesseract.createWorker(['eng', 'ara'], 1, {
    logger: m => {
      if (m.status === 'recognizing text') {
        // Show progress during each of the two OCR passes
        ibSetProgress(25 + Math.round(m.progress * 55), 'Reading text off photo...');
      }
    }
  });
  // Tune Tesseract for InBody sheets: expect dense tabular text with
  // numbers and mixed English/Arabic. PSM 6 = "Assume a single uniform
  // block of text" — gives Tesseract more context than the default PSM 3.
  try {
    await _tesseractWorker.setParameters({
      tessedit_pageseg_mode: Tesseract.PSM ? Tesseract.PSM.SINGLE_BLOCK : '6',
      // Tell Tesseract these are common characters we expect.
      // Don't set tessedit_char_whitelist — it's too aggressive and
      // would drop Arabic. Instead we just bias with user_defined_dpi.
      user_defined_dpi: '300',
      preserve_interword_spaces: '1'
    });
  } catch (e) {
    // Older tesseract.js versions may not support all params — non-fatal
    console.warn('Tesseract param set partial failure:', e);
  }
  return _tesseractWorker;
}

// ── Image preprocessing: SMART multi-variant pipeline for blurry/tilted photos ─
// Produces several enhanced versions of the photo so the OCR can pick the best.
// Handles: uneven lighting, low contrast, noise, slight blur, bad white balance,
// rotated phone shots, and InBody's light-gray-on-white text.
function ibPreprocessImage(base64, mimeType) {
  // EXIF-aware decoding: phone photos are often saved with a rotation EXIF
  // tag. Modern browsers apply it when rendering <img>, but canvas.drawImage
  // has historically ignored it — producing sideways OCR scans. We decode
  // through createImageBitmap(..., {imageOrientation:'from-image'}) and
  // fall back to <img> wherever that isn't available.
  return ibDecodeSource(base64, mimeType).then(img => new Promise(resolve => {
      // ─── 1) UPSCALE aggressively for small/blurry images ───
      // More aggressive than before — phone shots are often too small for OCR
      const minLongEdge = Math.max(img.width, img.height);
      let targetLongEdge;
      if (minLongEdge < 1000)      targetLongEdge = 2800;   // very small — big upscale
      else if (minLongEdge < 1800) targetLongEdge = 2600;
      else if (minLongEdge < 2400) targetLongEdge = 2400;
      else                         targetLongEdge = Math.min(minLongEdge, 3200);
      const scale = targetLongEdge / minLongEdge;
      const W = Math.round(img.width * scale);
      const H = Math.round(img.height * scale);

      const canvas = document.createElement('canvas');
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });

      // High-quality scaling for the upscale
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, W, H);
      ctx.drawImage(img, 0, 0, W, H);

      const idata = ctx.getImageData(0, 0, W, H);
      const src   = idata.data;
      const N     = W * H;

      // ─── 2) GRAYSCALE with luminance-tuned weights ───
      // Build a single-channel gray buffer for all downstream steps
      const gray = new Uint8ClampedArray(N);
      for (let i = 0, p = 0; i < src.length; i += 4, p++) {
        gray[p] = 0.299 * src[i] + 0.587 * src[i+1] + 0.114 * src[i+2];
      }

      // ─── 3) AUTO-LEVELS with histogram percentile clip ───
      // More robust than min/max: uses 2nd/98th percentile so a single
      // bright or dark pixel can't skew the range.
      const hist = new Uint32Array(256);
      for (let i = 0; i < N; i++) hist[gray[i]]++;
      const clipCount = Math.round(N * 0.02);
      let cum = 0, pLo = 0, pHi = 255;
      for (let v = 0; v < 256; v++) { cum += hist[v]; if (cum > clipCount) { pLo = v; break; } }
      cum = 0;
      for (let v = 255; v >= 0; v--) { cum += hist[v]; if (cum > clipCount) { pHi = v; break; } }
      const rng = Math.max(pHi - pLo, 1);

      const leveled = new Uint8ClampedArray(N);
      for (let i = 0; i < N; i++) {
        const v = ((gray[i] - pLo) / rng) * 255;
        leveled[i] = v < 0 ? 0 : v > 255 ? 255 : v;
      }

      // ─── 4) LIGHT UNSHARP MASK (deblurring) ───
      // Helps sharpen soft/slightly-blurry phone photos without noise explosion.
      // Box-blur radius 2 as a cheap approximation of Gaussian blur.
      const sharp = new Uint8ClampedArray(N);
      const blurred = boxBlur(leveled, W, H, 2);
      const amount = 0.6;  // sharpening strength
      for (let i = 0; i < N; i++) {
        const v = leveled[i] + amount * (leveled[i] - blurred[i]);
        sharp[i] = v < 0 ? 0 : v > 255 ? 255 : v;
      }

      // ─── 5) S-CURVE CONTRAST ───
      const curved = new Uint8ClampedArray(N);
      for (let i = 0; i < N; i++) {
        let v = sharp[i];
        v = v < 128
          ? 128 * Math.pow(v / 128, 0.7)
          : 255 - 128 * Math.pow((255 - v) / 128, 0.7);
        curved[i] = v < 0 ? 0 : v > 255 ? 255 : v;
      }

      // ─── 6) ADAPTIVE (SAUVOLA-LIKE) THRESHOLD ───
      // Far better than global threshold for phone photos of InBody sheets
      // because the lighting is usually uneven (flash hotspot, shadow across page).
      // We use a fast integral-image-based local mean/std approximation.
      const binary = adaptiveThreshold(curved, W, H, 25, 0.18);

      // ─── 7) Compose output: use the sharpened grayscale as the primary ───
      // Tesseract actually does better on grayscale than on pre-binarized in many cases
      // because it has its own internal binarization. But we upscaled + denoised + contrast-boosted.
      // We write `sharp` back to the image data (keeps anti-aliased edges).
      for (let i = 0, p = 0; p < N; i += 4, p++) {
        src[i] = src[i+1] = src[i+2] = curved[p];
        src[i+3] = 255;
      }
      ctx.putImageData(idata, 0, 0);

      // Also produce a BINARY variant for difficult cases
      const binCanvas = document.createElement('canvas');
      binCanvas.width = W; binCanvas.height = H;
      const binCtx = binCanvas.getContext('2d');
      const binData = binCtx.createImageData(W, H);
      for (let i = 0, p = 0; p < N; i += 4, p++) {
        binData.data[i] = binData.data[i+1] = binData.data[i+2] = binary[p];
        binData.data[i+3] = 255;
      }
      binCtx.putImageData(binData, 0, 0);

      resolve({
        grayscale: canvas.toDataURL('image/png').split(',')[1],
        binary:    binCanvas.toDataURL('image/png').split(',')[1],
        width:  W,
        height: H
      });
    }));
}

// Decode to an EXIF-oriented drawable source (ImageBitmap preferred).
function ibDecodeSource(base64, mimeType) {
  const fromImg = () => new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = `data:${mimeType};base64,${base64}`;
  });
  if (typeof createImageBitmap !== 'function') return fromImg();
  return fetch(`data:${mimeType};base64,${base64}`)
    .then(r => r.blob())
    .then(b => createImageBitmap(b, { imageOrientation: 'from-image' }))
    .catch(fromImg);
}

// ── Fast box blur (used for unsharp mask) ─────────────────
function boxBlur(src, W, H, r) {
  const tmp = new Uint8ClampedArray(src.length);
  const out = new Uint8ClampedArray(src.length);
  const d = r * 2 + 1;
  // horizontal pass
  for (let y = 0; y < H; y++) {
    let sum = 0;
    const row = y * W;
    for (let x = -r; x <= r; x++) sum += src[row + Math.max(0, Math.min(W-1, x))];
    for (let x = 0; x < W; x++) {
      tmp[row + x] = sum / d;
      const xAdd = Math.min(W-1, x + r + 1);
      const xSub = Math.max(0, x - r);
      sum += src[row + xAdd] - src[row + xSub];
    }
  }
  // vertical pass
  for (let x = 0; x < W; x++) {
    let sum = 0;
    for (let y = -r; y <= r; y++) sum += tmp[Math.max(0, Math.min(H-1, y)) * W + x];
    for (let y = 0; y < H; y++) {
      out[y * W + x] = sum / d;
      const yAdd = Math.min(H-1, y + r + 1);
      const ySub = Math.max(0, y - r);
      sum += tmp[yAdd * W + x] - tmp[ySub * W + x];
    }
  }
  return out;
}

// ── Adaptive threshold (Sauvola-inspired, using integral images for speed) ──
// For each pixel, computes local mean within `window` px, and thresholds
// based on mean*(1-k). Critical for phone photos with uneven lighting.
function adaptiveThreshold(gray, W, H, window, k) {
  const r = window >> 1;
  const N = W * H;
  // Integral image
  const ii = new Float64Array((W + 1) * (H + 1));
  for (let y = 0; y < H; y++) {
    let rowSum = 0;
    for (let x = 0; x < W; x++) {
      rowSum += gray[y * W + x];
      ii[(y + 1) * (W + 1) + (x + 1)] = ii[y * (W + 1) + (x + 1)] + rowSum;
    }
  }
  const out = new Uint8ClampedArray(N);
  for (let y = 0; y < H; y++) {
    const y1 = Math.max(0, y - r);
    const y2 = Math.min(H - 1, y + r);
    for (let x = 0; x < W; x++) {
      const x1 = Math.max(0, x - r);
      const x2 = Math.min(W - 1, x + r);
      const area = (y2 - y1 + 1) * (x2 - x1 + 1);
      const sum  = ii[(y2 + 1) * (W + 1) + (x2 + 1)]
                 - ii[y1 * (W + 1) + (x2 + 1)]
                 - ii[(y2 + 1) * (W + 1) + x1]
                 + ii[y1 * (W + 1) + x1];
      const mean = sum / area;
      const threshold = mean * (1 - k);
      out[y * W + x] = gray[y * W + x] < threshold ? 0 : 255;
    }
  }
  return out;
}

async function ibScanPhoto() {
  if (!_ibPhotoBase64) { toast('Please upload a photo first', 'error'); return; }

  document.getElementById('ib-scan-btn').disabled = true;
  document.getElementById('ib-scan-chips').style.display = 'none';
  ibSetProgress(5, 'Enhancing photo...');

  try {
    // ─── 1. Preprocess (produces TWO variants: grayscale and binary) ───
    const variants = await ibPreprocessImage(_ibPhotoBase64, _ibPhotoType);
    ibSetProgress(18, 'Starting OCR engine...');

    const worker = await ibGetWorker();

    // ─── 2. First pass: grayscale variant (best for most photos) ───
    ibSetProgress(25, 'Pass 1/2 — Reading text...');
    const grayBlob = ibB64ToBlob(variants.grayscale, 'image/png');
    const r1 = await worker.recognize(grayBlob);
    const text1 = r1.data.text || '';
    const conf1 = r1.data.confidence || 0;
    const words1 = r1.data.words || [];

    // ─── 3. Second pass: binary variant (better for low-contrast / uneven light) ──
    // FAST PATH: if pass 1 landed with very high confidence, skip pass 2 —
    // roughly halves total scan time on clean sheets.
    let text2 = '', conf2 = 0, words2 = [];
    if (conf1 >= 85 && text1.length > 300) {
      ibSetProgress(75, 'High confidence — cross-check skipped ⚡');
    } else try {
      const binBlob = ibB64ToBlob(variants.binary, 'image/png');
      const r2 = await worker.recognize(binBlob);
      text2 = r2.data.text || '';
      conf2 = r2.data.confidence || 0;
      words2 = r2.data.words || [];
    } catch (e) { /* non-fatal — pass 2 is just a fallback */ }

    ibSetProgress(85, 'Parsing InBody values...');

    // ─── 4. Parse BOTH and merge (take whichever has the most non-null fields) ───
    const parsed1 = ibParseOcrText(text1, words1);
    const parsed2 = text2 ? ibParseOcrText(text2, words2) : null;
    let merged  = ibMergeParsed(parsed1, parsed2, conf1, conf2);

    // ─── 5. SIDEWAYS-PHOTO AUTO-RETRY ─────────────────────────
    // If both passes read very few fields the photo may be rotated (EXIF or
    // handheld). Re-run once on a 90°-rotated version and keep the better parse.
    if (ibCountFields(merged) < 4) {
      try {
        ibSetProgress(88, 'Few fields read — retrying rotated 90°...');
        const rotB64   = await ibRotateImage(_ibPhotoBase64, _ibPhotoType, 90);
        const rotVar   = await ibPreprocessImage(rotB64, _ibPhotoType);
        const rotRes   = await worker.recognize(ibB64ToBlob(rotVar.grayscale, 'image/png'));
        const rotParse = ibParseOcrText(rotRes.data.text || '', rotRes.data.words || []);
        if (ibCountFields(rotParse) > ibCountFields(merged)) merged = rotParse;
      } catch(e) { console.warn('Rotation retry failed:', e); }
    }

    // Show the higher-confidence raw text
    const rawEl = document.getElementById('ib-ocr-raw');
    if (rawEl) rawEl.textContent = (conf1 >= conf2 || !text2) ? text1 : text2;

    ibSetProgress(100, 'Done! Fields filled ✅');
    ibApplyFields(merged);

  } catch (err) {
    console.error('OCR error:', err);
    document.getElementById('ib-scan-status').style.display = 'none';
    toast('OCR failed: ' + (err.message || 'Unknown error'), 'error');
    document.getElementById('ib-scan-btn').disabled = false;
  }
}

// Helper: convert base64 → Blob (used twice above)
function ibB64ToBlob(b64, mime) {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

// Merge two parsed result sets. For each field:
//   • Prefer the variant where the value is non-null
//   • If both have a value and they agree within ±5%, keep it
//   • If they disagree strongly, keep the one from the higher-confidence pass
function ibMergeParsed(a, b, confA, confB) {
  if (!b) return a;
  const out = {};
  const preferA = confA >= confB;
  for (const k of Object.keys(a)) {
    const va = a[k], vb = b[k];

    // ─── Uncertainty array: union of both passes ──
    if (k === '_uncertain') {
      const set = new Set([...(Array.isArray(va) ? va : []), ...(Array.isArray(vb) ? vb : [])]);
      out[k] = [...set];
      continue;
    }

    if (va == null && vb == null) { out[k] = null; continue; }
    if (va == null) { out[k] = vb; continue; }
    if (vb == null) { out[k] = va; continue; }
    // Both present — compare
    if (typeof va === 'number' && typeof vb === 'number') {
      const avg = (va + vb) / 2;
      const disagreement = Math.abs(va - vb) / (avg || 1);
      if (disagreement < 0.05) {
        // Values agree → use higher-precision (more decimals) one
        const dpA = (String(va).split('.')[1] || '').length;
        const dpB = (String(vb).split('.')[1] || '').length;
        out[k] = dpA >= dpB ? va : vb;
      } else {
        out[k] = preferA ? va : vb;
        // Disagreement between passes → add to uncertain list
        if (!out._uncertain) out._uncertain = [];
        if (!out._uncertain.includes(k)) out._uncertain.push(k);
      }
    } else {
      // Strings (name, date) — prefer longer non-junk result
      out[k] = (String(va).length >= String(vb).length) ? va : vb;
    }
  }
  // Ensure _uncertain exists even if both passes had empty ones
  if (!out._uncertain) out._uncertain = [];
  return out;
}

// ── SMART InBody OCR parser ────────────────────────────────────
// Upgraded for blurry / low-quality photos. Handles:
//   • OCR character-confusion errors (O↔0, I↔1, l↔1, S↔5, B↔8, Z↔2, G↔6)
//   • Fuzzy label matching (missing/swapped letters in labels)
//   • Missing/misplaced decimal points (732 → 73.2 in weight range)
//   • Values on next or same line, in either order (label-right or label-left)
//   • Arabic and English simultaneously
//   • Range-based disambiguation of which number belongs to which field
//   • Cross-field sanity checks (fat_mass = weight × BF%)
function ibParseOcrText(text, words) {
  const d = {
    name: null, age: null, weight: null, height: null, bmi: null,
    body_fat_percent: null, fat_mass: null,
    skeletal_muscle_mass: null, total_body_water: null,
    protein_kg: null, visceral_fat_level: null,
    fitness_score: null, basal_metabolic_rate: null,
    lean_body_mass: null, minerals_kg: null, whr: null, obesity_degree: null,
    target_weight: null, date: null
  };

  // ─── Normalize the OCR text ────────────────────────────────
  let norm = text
    // Normalize Arabic-Indic digits to ASCII digits
    .replace(/[٠۰]/g, '0').replace(/[١۱]/g, '1').replace(/[٢۲]/g, '2')
    .replace(/[٣۳]/g, '3').replace(/[٤۴]/g, '4').replace(/[٥۵]/g, '5')
    .replace(/[٦۶]/g, '6').replace(/[٧۷]/g, '7').replace(/[٨۸]/g, '8')
    .replace(/[٩۹]/g, '9')
    // Replace common unicode spaces with regular space
    .replace(/[\u00A0\u2000-\u200F\u2028-\u202F]/g, ' ')
    // Fix common OCR character confusion inside runs of digits
    .replace(/(\d)[Oo](\d)/g, '$10$2')
    .replace(/(\d)[Il|](\d)/g, '$11$2')
    .replace(/(\d)[S](\d)/g, '$15$2')
    .replace(/(\d)[B](\d)/g, '$18$2')
    .replace(/(\d)[Zz](\d)/g, '$12$2')
    .replace(/(\d)[Gg](\d)/g, '$16$2')
    // Fix "O" / "I" at the START of a number followed by digits
    .replace(/\b[Oo](\d+)/g, '0$1')
    .replace(/\b[Il|](\d+)/g, '1$1')
    // Strip units that glue onto numbers and break parseFloat
    .replace(/(\d)%/g, '$1 %')
    .replace(/(\d)(kcal|kg|cm|mm|kHz|Hz)\b/gi, '$1 $2')
    // Collapse multi-space
    .replace(/[ \t]+/g, ' ');

  const lines = norm.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const full  = lines.join('\n');

  // ─── Build a row map from Tesseract word bboxes (if available) ─
  // Each "row" is a list of {text, bbox, cx, cy} objects sharing similar y.
  // This lets us find "the number right next to the Weight label on the same row"
  // instead of scanning linear OCR text and grabbing whichever number comes first.
  let rows = null;
  if (words && words.length > 0) {
    // Normalize word texts the same way we normalized full text
    const normWord = (w) => (w || '')
      .replace(/[٠۰]/g, '0').replace(/[١۱]/g, '1').replace(/[٢۲]/g, '2')
      .replace(/[٣۳]/g, '3').replace(/[٤۴]/g, '4').replace(/[٥۵]/g, '5')
      .replace(/[٦۶]/g, '6').replace(/[٧۷]/g, '7').replace(/[٨۸]/g, '8')
      .replace(/[٩۹]/g, '9');

    const processed = words.map(w => {
      const bb = w.bbox || {};
      const cy = ((bb.y0 || 0) + (bb.y1 || 0)) / 2;
      const cx = ((bb.x0 || 0) + (bb.x1 || 0)) / 2;
      const h  = (bb.y1 || 0) - (bb.y0 || 0);
      return { text: normWord(w.text), cx, cy, h, bb, conf: w.confidence || 0 };
    }).filter(w => w.text && w.h > 0);

    // Estimate median word height to set tolerance for "same row"
    const hs = processed.map(w => w.h).sort((a, b) => a - b);
    const medH = hs.length ? hs[Math.floor(hs.length / 2)] : 20;
    const rowTol = Math.max(8, medH * 0.7);

    // Group words into rows by y-center
    processed.sort((a, b) => a.cy - b.cy);
    rows = [];
    for (const w of processed) {
      const r = rows.find(row => Math.abs(row.cy - w.cy) < rowTol);
      if (r) {
        r.words.push(w);
        // Update row centroid (running average)
        r.cy = (r.cy * (r.words.length - 1) + w.cy) / r.words.length;
      } else {
        rows.push({ cy: w.cy, words: [w] });
      }
    }
    // Sort words within each row left-to-right
    rows.forEach(r => r.words.sort((a, b) => a.cx - b.cx));
  }

  // ─── Fuzzy-match a label (edit distance 1) ─────────────────
  function fuzzyContains(line, label) {
    const lineL = line.toLowerCase();
    const labelL = label.toLowerCase();
    if (lineL.includes(labelL)) return true;
    if (labelL.length < 5) return false;
    for (let i = 0; i <= lineL.length - labelL.length + 1; i++) {
      if (i < 0 || i > lineL.length) continue;
      const win = lineL.substr(Math.max(0, i - 1), labelL.length + 2);
      if (editDist(win.substr(0, labelL.length), labelL) <= 1) return true;
      if (win.length >= labelL.length && editDist(win.substr(win.length - labelL.length), labelL) <= 1) return true;
    }
    return false;
  }

  function editDist(a, b) {
    if (a === b) return 0;
    const la = a.length, lb = b.length;
    if (Math.abs(la - lb) > 2) return 99;
    const dp = new Array(lb + 1);
    for (let j = 0; j <= lb; j++) dp[j] = j;
    for (let i = 1; i <= la; i++) {
      let prev = dp[0]; dp[0] = i;
      for (let j = 1; j <= lb; j++) {
        const tmp = dp[j];
        dp[j] = a[i-1] === b[j-1]
          ? prev
          : 1 + Math.min(prev, dp[j-1], dp[j]);
        prev = tmp;
      }
    }
    return dp[lb];
  }

  // ─── Extract all numeric tokens from a string ──────────────
  // Returns array of {value, inParens, raw, pos} so we can filter out
  // range numbers that appear inside parentheses like "(41.7-50.9)".
  function numsInWithContext(s) {
    const fixed = s.replace(/(\d)[\.,]\s+(\d)/g, '$1.$2')
                   .replace(/(\d),(\d)/g, '$1.$2');
    const out = [];
    const re = /(-?\d+(?:\.\d+)?)/g;
    let m;
    let parenDepth = 0;
    let lastIdx = 0;
    while ((m = re.exec(fixed))) {
      // Count parens between lastIdx and m.index
      for (let i = lastIdx; i < m.index; i++) {
        if (fixed[i] === '(' || fixed[i] === '[' || fixed[i] === '{') parenDepth++;
        else if (fixed[i] === ')' || fixed[i] === ']' || fixed[i] === '}') parenDepth = Math.max(0, parenDepth - 1);
      }
      lastIdx = m.index + m[1].length;
      out.push({
        value: parseFloat(m[1]),
        inParens: parenDepth > 0,
        raw: m[1],
        pos: m.index
      });
    }
    return out;
  }

  function numsIn(s) {
    return numsInWithContext(s).map(x => x.value);
  }

  // ─── Try to rescue a number with a missing decimal point ──
  function rescueDecimal(n, min, max) {
    if (n == null) return null;
    if (n >= min && n <= max) return n;
    if (n / 10 >= min && n / 10 <= max) return n / 10;
    if (n / 100 >= min && n / 100 <= max) return n / 100;
    if (n / 1000 >= min && n / 1000 <= max) return n / 1000;
    return null;
  }

  // ─── BBOX-BASED LABEL SEARCH ────────────────────────────────
  // This is the new primary strategy. Find the label's bbox, then pick
  // the closest number on the same row, preferring ones not in parens.
  // Returns null if no bbox-based result or rows unavailable.
  function findByLabelBbox(labels, min, max, opts = {}) {
    if (!rows) return null;
    const excludeLabels = opts.excludeLabels || [];

    // Find rows containing any of the label strings
    for (const row of rows) {
      const rowText = row.words.map(w => w.text).join(' ');

      // Skip if the row contains an excluded (more-specific) label
      if (excludeLabels.some(lb => fuzzyContains(rowText, lb))) continue;

      const matched = labels.some(lb => fuzzyContains(rowText, lb));
      if (!matched) continue;

      // Find the rightmost x of the last matched label word
      let labelEndX = 0;
      for (const w of row.words) {
        for (const lb of labels) {
          const lbLower = lb.toLowerCase();
          const wLower = w.text.toLowerCase();
          // Match if the word IS the label word or contains it
          if (wLower.length >= 3 && (lbLower.includes(wLower) || wLower.includes(lbLower.split(' ')[0]))) {
            if (w.bb.x1 > labelEndX) labelEndX = w.bb.x1;
          }
        }
      }

      // Collect numeric candidates from this row with their x positions
      const candidates = [];
      for (const w of row.words) {
        const nums = numsInWithContext(w.text);
        for (const num of nums) {
          candidates.push({
            value: num.value,
            x: w.cx,
            inParens: num.inParens,
            afterLabel: w.bb.x0 >= labelEndX
          });
        }
      }

      // Also scan text-joined row for parens context (single-word parens don't always work)
      const rowNumsCtx = numsInWithContext(rowText);
      // If the row-level paren detection disagrees with word-level, trust row-level
      // by filtering candidates whose value appears inside parens in the row text
      const parenValues = new Set(rowNumsCtx.filter(n => n.inParens).map(n => n.value));
      candidates.forEach(c => { if (parenValues.has(c.value)) c.inParens = true; });

      // Prefer: (1) numbers after the label, (2) not in parens, (3) in range
      // Score each candidate
      const scored = candidates
        .filter(c => {
          const v = c.value;
          return (v >= min && v <= max) || rescueDecimal(v, min, max) != null;
        })
        .map(c => {
          let score = 0;
          if (c.afterLabel) score += 100;
          if (!c.inParens) score += 50;
          const inRange = c.value >= min && c.value <= max;
          if (inRange) score += 30;
          // Prefer decimal numbers when possible
          if (!Number.isInteger(c.value)) score += 5;
          return { ...c, score };
        })
        .sort((a, b) => b.score - a.score);

      if (scored.length > 0) {
        const best = scored[0];
        if (best.value >= min && best.value <= max) return best.value;
        return rescueDecimal(best.value, min, max);
      }
    }
    return null;
  }

  // ─── TEXT-LINE LABEL SEARCH (fallback when bboxes unavailable) ─
  function findByLabelText(labels, min, max, opts = {}) {
    const windowAhead = opts.windowAhead ?? 3;
    const windowBack  = opts.windowBack  ?? 0;
    const preferDecimal = opts.preferDecimal ?? true;
    const excludeLabels = opts.excludeLabels || [];

    for (let i = 0; i < lines.length; i++) {
      const ln = lines[i];
      if (excludeLabels.some(lb => fuzzyContains(ln, lb))) continue;
      const matched = labels.some(lb => fuzzyContains(ln, lb));
      if (!matched) continue;

      // Collect candidates with paren context; skip parens-bound numbers
      const candidates = [];
      const pushFrom = (str) => {
        numsInWithContext(str).forEach(n => {
          if (!n.inParens) candidates.push(n.value);
        });
      };
      pushFrom(ln);
      for (let j = 1; j <= windowAhead && i + j < lines.length; j++) pushFrom(lines[i + j]);
      for (let j = 1; j <= windowBack  && i - j >= 0;             j++) pushFrom(lines[i - j]);

      // Try direct range hit
      for (const n of candidates) {
        if (n >= min && n <= max) {
          if (preferDecimal && Number.isInteger(n)) {
            const decimal = candidates.find(x => !Number.isInteger(x) && x >= min && x <= max);
            if (decimal != null) return decimal;
          }
          return n;
        }
      }
      // Try rescue
      for (const n of candidates) {
        const r = rescueDecimal(n, min, max);
        if (r != null) return r;
      }
    }
    return null;
  }

  // ─── Combined: try bbox first, fall back to text-line ──────
  function findByLabel(labels, min, max, opts = {}) {
    const bboxResult = findByLabelBbox(labels, min, max, opts);
    if (bboxResult != null) return bboxResult;
    return findByLabelText(labels, min, max, opts);
  }

  // ─── Name detection ───────────────────────────────────────
  for (const ln of lines) {
    if (fuzzyContains(ln, 'Name') || fuzzyContains(ln, 'Patient') || fuzzyContains(ln, 'Client')) {
      const m = ln.match(/(?:Name|Patient|Client|ID)\s*[:\-]?\s*([A-Za-z][A-Za-z\s'\.]{2,40})/i);
      if (m) {
        const c = m[1].trim().replace(/\s{2,}/g, ' ');
        if (!/result|analysis|body|inbody|report|test|score/i.test(c) && c.length > 2) {
          d.name = c;
          break;
        }
      }
    }
  }
  // Arabic
  const nameAr = full.match(/(?:الاسم|اسم)\s*[:\-]?\s*([\u0600-\u06FF][\u0600-\u06FF\s]{2,40})/);
  if (nameAr) {
    const n = nameAr[1].trim();
    d.name = d.name ? `${d.name} / ${n}` : n;
  }

  // ─── Weight (30–200 kg) ─── exclude Target/Control variants
  d.weight = findByLabel(
    ['Weight','Wt.','الوزن','Peso','체중'],
    30, 200,
    { excludeLabels: ['Target Weight','Weight Control','Muscle Control','Fat Control'] }
  );

  // ─── Target Weight (separate field, for completeness) ──────
  d.target_weight = findByLabel(
    ['Target Weight','الوزن المستهدف'],
    30, 200
  );

  // ─── Height (120–220 cm) ──────────────────────────────────
  d.height = findByLabel(
    ['Height','Ht.','الطول','Altura','키'],
    120, 220
  );

  // ─── Skeletal Muscle Mass (15–60 kg) ─── exclude Muscle Control
  d.skeletal_muscle_mass = findByLabel(
    ['Skeletal Muscle Mass','Skeletal Muscle','SMM','كتلة العضلات الهيكلية','كتلة العضلات'],
    15, 60,
    { excludeLabels: ['Muscle Control'] }
  );

  // ─── Body Fat % (3–60) ─── exclude "Body Fat Mass" (kg, not %)
  d.body_fat_percent = findByLabel(
    ['Percent Body Fat','% Body Fat','Body Fat %','PBF','نسبة الدهون','Fat Percent'],
    3, 60,
    { excludeLabels: ['Body Fat Mass','Fat Mass','Fat Control'] }
  );

  // ─── Fat Mass (2–80 kg) ─── exclude "Fat Control" (target delta)
  d.fat_mass = findByLabel(
    ['Body Fat Mass','Fat Mass','كتلة الدهون'],
    2, 80,
    { excludeLabels: ['Fat Control','Body Fat Percentage'] }
  );

  // ─── BMI (12–50) ──────────────────────────────────────────
  d.bmi = findByLabel(
    ['BMI','Body Mass Index','مؤشر كتلة الجسم','مؤشر كتلة'],
    12, 50
  );

  // ─── Total Body Water (20–70 L) ───────────────────────────
  d.total_body_water = findByLabel(
    ['Total Body Water','TBW','الماء الكلي','إجمالي ماء الجسم'],
    20, 70,
    { excludeLabels: ['Intracellular','Extracellular','ICW','ECW'] }
  );

  // ─── Protein (5–25 kg) ────────────────────────────────────
  d.protein_kg = findByLabel(
    ['Protein','البروتين','Proteina','Proteinas'],
    5, 25
  );

  // ─── Minerals (1.5–8 kg) — new field ──────────────────────
  d.minerals_kg = findByLabel(
    ['Minerals','المعادن','Mineral'],
    1.5, 8
  );

  // ─── Visceral Fat Level (1–30, integer typical) ───────────
  d.visceral_fat_level = findByLabel(
    ['Visceral Fat Level','VFL','الدهون الحشوية','دهون البطن','مستوى الدهون الحشوية'],
    1, 30,
    { preferDecimal: false, excludeLabels: ['Visceral Fat Area'] }
  );

  // ─── Age (10–90 years) ────────────────────────────────────
  d.age = findByLabel(['Age','العمر','السن','Edad'], 10, 90, { preferDecimal: false });
  if (!d.age) {
    const ageM = full.match(/(\d{1,2})\s*(?:yrs?\.?|years?|سنة|عاماً?|yo\b)/i);
    if (ageM) { const v = parseInt(ageM[1]); if (v >= 10 && v <= 90) d.age = v; }
  }

  // ─── InBody Score / Fitness Score (0–100 integer) ─────────
  d.fitness_score = findByLabel(
    ['InBody Score','Fitness Score','Total Score','النقاط','درجة اللياقة'],
    0, 100,
    { preferDecimal: false }
  );
  if (d.fitness_score != null && !Number.isInteger(d.fitness_score)) d.fitness_score = null;
  const dupes = [d.weight, d.body_fat_percent, d.total_body_water, d.protein_kg, d.skeletal_muscle_mass, d.bmi];
  if (d.fitness_score != null && dupes.some(v => v === d.fitness_score)) d.fitness_score = null;

  // ─── BMR (800–3500 kcal) — typical adult range ────────────
  d.basal_metabolic_rate = findByLabel(
    ['Basal Metabolic Rate','BMR','معدل الأيض الأساسي','معدل الأيض','Resting Energy','RMR'],
    800, 3500,
    { preferDecimal: false }
  );

  // ─── Waist-Hip Ratio (0.6–1.2) — new field ────────────────
  d.whr = findByLabel(
    ['Waist-Hip Ratio','WHR','Waist Hip','نسبة الخصر'],
    0.6, 1.2
  );

  // ─── Obesity Degree (50–250 %) — new field ────────────────
  d.obesity_degree = findByLabel(
    ['Obesity Degree','درجة السمنة'],
    50, 250,
    { preferDecimal: false }
  );

  // ─── Lean Body Mass (20–150 kg) ───────────────────────────
  d.lean_body_mass = findByLabel(
    ['Lean Body Mass','LBM','Fat Free Mass','FFM','Lean Mass','الكتلة الخالية من الدهون','الكتلة الخالية'],
    20, 150,
    { excludeLabels: ['Lean Mass Evaluation'] }
  );

  // ─── Date ─────────────────────────────────────────────────
  const dm1 = full.match(/(20\d{2})[\/\.\-](\d{1,2})[\/\.\-](\d{1,2})/);
  const dm2 = full.match(/(\d{1,2})[\/\.\-](\d{1,2})[\/\.\-](20\d{2})/);
  if (dm1) d.date = `${dm1[1]}-${dm1[2].padStart(2,'0')}-${dm1[3].padStart(2,'0')}`;
  else if (dm2) d.date = `${dm2[3]}-${dm2[2].padStart(2,'0')}-${dm2[1].padStart(2,'0')}`;

  // ─── CROSS-FIELD SANITY & RESCUE ──────────────────────────

  // 1. Weight vs Height confusion: InBody sheets put them close together.
  //    If they're near each other in value, one of them is wrong.
  if (d.weight && d.height && Math.abs(d.height - d.weight) < 5 && d.height < 130) {
    d.height = null;  // height should be >130 for most adults
  }

  // 2. If we have weight + BF%, derive fat_mass
  if (!d.fat_mass && d.weight && d.body_fat_percent) {
    d.fat_mass = Math.round(d.weight * d.body_fat_percent / 100 * 10) / 10;
  }

  // 3. If we have weight + fat_mass, derive BF%
  if (!d.body_fat_percent && d.weight && d.fat_mass) {
    d.body_fat_percent = Math.round(d.fat_mass / d.weight * 1000) / 10;
  }

  // 4. If weight + fat_mass exist but disagree with BF% by >3 points, trust BF%
  if (d.weight && d.body_fat_percent && d.fat_mass) {
    const expected = d.weight * d.body_fat_percent / 100;
    if (Math.abs(expected - d.fat_mass) / d.weight > 0.03) {
      // Recalculate fat_mass from the other two
      d.fat_mass = Math.round(expected * 10) / 10;
    }
  }

  // 5. If we have weight + height, derive BMI
  if (!d.bmi && d.weight && d.height) {
    const hm = d.height / 100;
    d.bmi = Math.round(d.weight / (hm * hm) * 10) / 10;
  }

  // 6. If SMM is suspicious (>60% of weight), it was probably the LBM instead
  if (d.skeletal_muscle_mass && d.weight && d.skeletal_muscle_mass > d.weight * 0.65) {
    // Move SMM → LBM (if LBM is empty)
    if (!d.lean_body_mass) d.lean_body_mass = d.skeletal_muscle_mass;
    d.skeletal_muscle_mass = null;
  }

  // 7. If LBM is suspicious (< 40% of weight), it was probably SMM
  if (d.lean_body_mass && d.weight && d.lean_body_mass < d.weight * 0.4) {
    if (!d.skeletal_muscle_mass) d.skeletal_muscle_mass = d.lean_body_mass;
    d.lean_body_mass = null;
  }

  // 8. TBW is typically 50-65% of weight. If out of band, null it.
  if (d.total_body_water && d.weight) {
    const ratio = d.total_body_water / d.weight;
    if (ratio < 0.35 || ratio > 0.75) d.total_body_water = null;
  }

  // 9. Protein is typically ~16% of weight. If >30% of weight, likely mis-read.
  if (d.protein_kg && d.weight && d.protein_kg > d.weight * 0.3) {
    d.protein_kg = null;
  }

  // ─── COMPUTE UNCERTAINTY FLAGS ────────────────────────────
  // After all parsing and rescue, run each value through a plausibility
  // checker. Any field that lands outside a tight "likely correct" range
  // gets added to _uncertain so the UI can flag it for user review.
  d._uncertain = [];

  const checkUncertain = (key, val, tightMin, tightMax) => {
    if (val == null) return;
    if (val < tightMin || val > tightMax) d._uncertain.push(key);
  };

  // Tight ranges = "looks correct" (looser than parse ranges but narrower than absolute plausibility)
  checkUncertain('weight',               d.weight,               35, 180);
  checkUncertain('height',               d.height,               130, 210);
  checkUncertain('body_fat_percent',     d.body_fat_percent,     4, 55);
  checkUncertain('skeletal_muscle_mass', d.skeletal_muscle_mass, 18, 55);
  checkUncertain('fat_mass',             d.fat_mass,             2, 70);
  checkUncertain('bmi',                  d.bmi,                  13, 45);
  checkUncertain('total_body_water',     d.total_body_water,     25, 65);
  checkUncertain('protein_kg',           d.protein_kg,           6, 22);
  checkUncertain('minerals_kg',          d.minerals_kg,          2, 7);
  checkUncertain('visceral_fat_level',   d.visceral_fat_level,   1, 25);
  checkUncertain('basal_metabolic_rate', d.basal_metabolic_rate, 900, 3200);
  checkUncertain('lean_body_mass',       d.lean_body_mass,       30, 130);
  checkUncertain('whr',                  d.whr,                  0.65, 1.15);
  checkUncertain('obesity_degree',       d.obesity_degree,       55, 220);

  // Cross-field uncertainty: if BMI computed from weight/height disagrees
  // with parsed BMI by >2 points, flag BMI as uncertain.
  if (d.weight && d.height && d.bmi) {
    const hm = d.height / 100;
    const calcBmi = d.weight / (hm * hm);
    if (Math.abs(calcBmi - d.bmi) > 2 && !d._uncertain.includes('bmi')) {
      d._uncertain.push('bmi');
    }
  }

  // If BF% and fat_mass disagree strongly, flag fat_mass
  if (d.weight && d.body_fat_percent && d.fat_mass) {
    const calcFm = d.weight * d.body_fat_percent / 100;
    if (Math.abs(calcFm - d.fat_mass) / d.weight > 0.04 && !d._uncertain.includes('fat_mass')) {
      d._uncertain.push('fat_mass');
    }
  }

  return d;
}

function ibApplyFields(d) {
  const fieldMap = [
    { key: 'weight',               id: 'ib-weight',     label: 'Weight',   unit: 'kg' },
    { key: 'height',               id: 'ib-height',     label: 'Height',   unit: 'cm' },
    { key: 'body_fat_percent',     id: 'ib-bf',         label: 'BF%',      unit: '%'  },
    { key: 'skeletal_muscle_mass', id: 'ib-smm',        label: 'SMM',      unit: 'kg' },
    { key: 'fat_mass',             id: 'ib-fatmass',    label: 'Fat Mass', unit: 'kg' },
    { key: 'bmi',                  id: 'ib-bmi',        label: 'BMI',      unit: ''   },
    { key: 'total_body_water',     id: 'ib-tbw',        label: 'TBW',      unit: 'L'  },
    { key: 'protein_kg',           id: 'ib-protein-kg', label: 'Protein',  unit: 'kg' },
    { key: 'visceral_fat_level',   id: 'ib-vfl',        label: 'VFL',      unit: ''   },
    { key: 'fitness_score',        id: 'ib-score',      label: 'Score',    unit: ''   },
  ];

  const chipsEl = document.getElementById('ib-scan-chips');
  chipsEl.innerHTML = '';
  let filled = 0;

  // ── Uncertainty helper: toggle .ib-uncertain class + ⚠ badge ──
  const uncertainSet = new Set(d._uncertain || []);
  const applyUncertaintyUI = (el, isUncertain, label) => {
    if (!el) return;
    // Remove any existing badge on this input's parent wrap
    const parent = el.parentElement;
    if (parent) {
      parent.querySelectorAll('.ib-uncertain-badge').forEach(b => b.remove());
    }
    el.classList.remove('ib-uncertain');
    if (isUncertain) {
      el.classList.add('ib-uncertain');
      // Ensure parent is positioned so the badge can absolute-position inside it
      if (parent && getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative';
      }
      const badge = document.createElement('span');
      badge.className = 'ib-uncertain-badge';
      badge.textContent = '⚠';
      badge.title = `Check this ${label} value — it looks unusual. Please verify against the InBody sheet.`;
      badge.style.color = '#FFB800';
      if (parent) parent.appendChild(badge);
    }
  };

  // ── Handle name: fill both c-name and c-name-ar ──
  if (d.name) {
    const isArabic = /[\u0600-\u06FF]/.test(d.name);
    const nameId = isArabic ? 'c-name-ar' : 'c-name';
    const nameEl = document.getElementById(nameId);
    if (nameEl && !nameEl.value) {
      nameEl.value = d.name;
      nameEl.dispatchEvent(new Event('input'));
      filled++;
    }
    const chip = document.createElement('div');
    chip.className = 'ib-chip filled';
    chip.style.borderColor = 'rgba(245,255,0,0.35)';
    chip.innerHTML = `<span class="ib-chip-label">Name</span><span class="ib-chip-val" style="color:#F5FF00;">${d.name}</span>`;
    chipsEl.appendChild(chip);
  }

  // ── Handle age: fill ib-age and c-age ──
  if (d.age) {
    ['ib-age','c-age'].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.value = d.age; el.dispatchEvent(new Event('input')); }
    });
    filled++;
    const chip = document.createElement('div');
    chip.className = 'ib-chip filled';
    chip.style.borderColor = 'rgba(245,255,0,0.35)';
    chip.innerHTML = `<span class="ib-chip-label">Age</span><span class="ib-chip-val" style="color:#F5FF00;">${d.age} yrs</span>`;
    chipsEl.appendChild(chip);
  }

  // ── Fill all numeric fields ──
  fieldMap.forEach(f => {
    const val = d[f.key];
    const el = document.getElementById(f.id);

    // Always clear any previous uncertain styling first (even if this scan didn't fill the field)
    if (el) {
      el.classList.remove('ib-uncertain');
      const p = el.parentElement;
      if (p) p.querySelectorAll('.ib-uncertain-badge').forEach(b => b.remove());
    }

    if (val === null || val === undefined) return;
    if (el) { el.value = val; el.dispatchEvent(new Event('input')); filled++; }

    const isUncertain = uncertainSet.has(f.key);
    applyUncertaintyUI(el, isUncertain, f.label);

    const chip = document.createElement('div');
    chip.className = 'ib-chip filled';
    if (isUncertain) {
      chip.style.borderColor = 'rgba(255,184,0,0.6)';
      chip.style.background = 'rgba(255,184,0,0.08)';
    }
    chip.innerHTML = `<span class="ib-chip-label">${f.label}</span><span class="ib-chip-val" ${isUncertain?'style="color:#FFB800;"':''}>${val}${f.unit}${isUncertain?' ⚠':''}</span>`;
    chipsEl.appendChild(chip);
  });

  // ── Date ──
  if (d.date) {
    const dateEl = document.getElementById('ib-date');
    if (dateEl) { dateEl.value = d.date; dateEl.dispatchEvent(new Event('input')); }
    const chip = document.createElement('div');
    chip.className = 'ib-chip filled';
    chip.innerHTML = `<span class="ib-chip-label">Date</span><span class="ib-chip-val">${d.date}</span>`;
    chipsEl.appendChild(chip);
  }

  // ── BMR chip (display only) ──
  if (d.basal_metabolic_rate) {
    const isUnc = uncertainSet.has('basal_metabolic_rate');
    const chip = document.createElement('div');
    chip.className = 'ib-chip';
    if (isUnc) {
      chip.style.borderColor = 'rgba(255,184,0,0.6)';
      chip.style.background = 'rgba(255,184,0,0.08)';
    }
    chip.innerHTML = `<span class="ib-chip-label">BMR</span><span class="ib-chip-val" ${isUnc?'style="color:#FFB800;"':''}>${d.basal_metabolic_rate} kcal${isUnc?' ⚠':''}</span>`;
    chipsEl.appendChild(chip);
  }

  chipsEl.style.display = 'flex';
  document.getElementById('ib-ocr-toggle-row').style.display = 'block';
  document.getElementById('ib-scan-btn').disabled = false;

  if (typeof calcBMR === 'function') calcBMR();
  if (typeof syncPreview === 'function') syncPreview();

  // ── Build status message ──
  const uncertainVisible = fieldMap.filter(f => uncertainSet.has(f.key) && d[f.key] != null);
  let msg;
  if (filled === 0) {
    msg = '⚠️ Could not read values — check raw OCR text below';
    toast(msg, 'error');
  } else if (uncertainVisible.length > 0) {
    const names = uncertainVisible.map(f => f.label).join(', ');
    msg = `✅ ${filled} filled — ⚠ please verify: ${names}`;
    toast(msg, 'warning');
  } else {
    msg = `✅ ${filled} fields filled from InBody sheet!`;
    toast(msg, 'success');
  }
}

// Count readable fields in a parsed result (excludes the _uncertain array).
function ibCountFields(d) {
  if (!d) return 0;
  let n = 0;
  for (const k of Object.keys(d)) {
    if (k === '_uncertain') continue;
    if (d[k] !== null && d[k] !== undefined && d[k] !== '') n++;
  }
  return n;
}

// Rotate a base64 image by 90/180/270 degrees (used by the sideways-photo retry).
function ibRotateImage(base64, mimeType, degrees) {
  return new Promise((resolve, reject) => {
    ibDecodeSource(base64, mimeType).then(img => {
      try {
        const w = img.width, h = img.height;
        const swap = (degrees === 90 || degrees === 270);
        const canvas = document.createElement('canvas');
        canvas.width  = swap ? h : w;
        canvas.height = swap ? w : h;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(degrees * Math.PI / 180);
        ctx.drawImage(img, -w / 2, -h / 2);
        resolve(canvas.toDataURL('image/png').split(',')[1]);
      } catch (err) { reject(err); }
    }).catch(reject);
  });
}

// ── Clipboard paste (screenshot straight from Ctrl+V) ────────
function ibPasteFromClipboard() {
  (async () => {
    try {
      if (!navigator.clipboard || !navigator.clipboard.read) throw new Error('no clipboard API');
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const type = item.types.find(t => t.startsWith('image/'));
        if (type) {
          const blob = await item.getType(type);
          ibLoadPhoto(blob);
          toast('📋 Screenshot pasted — ready to scan', 'success');
          return;
        }
      }
      toast('No image found in clipboard', 'error');
    } catch (e) {
      toast('Clipboard blocked by browser — use Upload instead', 'error');
    }
  })();
}

// Global paste listener: only acts while the InBody page is open
document.addEventListener('paste', e => {
  const page = document.getElementById('page-inbody');
  if (!page || !page.classList.contains('active')) return;
  try {
    const items = (e.clipboardData && e.clipboardData.items) || [];
    for (const it of items) {
      if (it.type && it.type.startsWith('image/')) {
        const blob = it.getAsFile();
        if (blob) { ibLoadPhoto(blob); toast('📋 Pasted image loaded — press Scan', 'success'); }
        break;
      }
    }
  } catch (err) {}
});

// ────────────────────────────────────────────────────────────────
// 🧾 GROCERY LIST — aggregates every food across meals & options
// ────────────────────────────────────────────────────────────────
window._grocery = { opts: { 1: true, 2: true, 3: true }, excluded: {}, stock: [] };

function groceryToggleOpt(n) {
  const on = !window._grocery.opts[n];
  window._grocery.opts[n] = on;
  const chip = document.getElementById('gro-chip-' + n);
  if (chip) chip.classList.toggle('on', on);
  groceryRender();
}

function groceryCollect() {
  const groups = {};   // category key → {name → item}
  const order = [];    // keeps category display order
  MEALS_DEF.forEach(m => {
    OPTS_DEF.forEach(o => {
      if (!window._grocery.opts[o.n]) return;
      const rows = [...document.querySelectorAll('#rows-' + m.id + '-' + o.n + ' .food-row')];
      rows.forEach(row => {
        const nameAr = row.dataset.foodName;
        if (!nameAr) return; // empty row
        const catKey = row.dataset.foodCat || (row.dataset.foodCatEn ?? 'other');
        if (!groups[catKey]) { groups[catKey] = {}; order.push({ key: catKey, cat: row.dataset.foodCat, catEn: row.dataset.foodCatEn }); }
        const unit  = row.dataset.foodUnit || '';
        const unitG = parseFloat(row.dataset.foodUnitG) || 0;
        const qty   = parseFloat(row.querySelector('.food-qty-input')?.value) || 0;
        const grams = (unit && unitG && qty > 0) ? qty * unitG : (qty || 100);
        let it = groups[catKey][nameAr];
        if (!it) {
          it = {
            name: nameAr, nameEn: row.dataset.foodNameEn || nameAr,
            unit, unitG,
            cal: parseFloat(row.dataset.foodCal) || 0,
            grams: 0, pieces: 0
          };
          groups[catKey][nameAr] = it;
        }
        it.grams += grams;
        if (unit && qty > 0) it.pieces += qty;
      });
    });
  });
  return { groups, order };
}

function groceryRender() {
  const groupsEl  = document.getElementById('grocery-groups');
  const emptyEl   = document.getElementById('grocery-empty');
  const summaryEl = document.getElementById('grocery-summary');
  if (!groupsEl) return;
  const isEN = (window._lang === 'en');
  const { groups, order } = groceryCollect();

  const excl = window._grocery.excluded;
  window._grocery.stock = [];
  let anyGroup = false, totKcal = 0, totItems = 0, html = '';

  order.forEach(g => {
    const items = Object.values(groups[g.key] || {});
    if (!items.length) return;
    anyGroup = true;
    let gKcal = 0, gCnt = 0, rowsHtml = '';
    items.forEach(it => {
      const idx = window._grocery.stock.length;
      window._grocery.stock.push(it.name);
      const isExcluded = !!excl[it.name];
      if (!isExcluded) {
        const kcal = it.cal * (it.grams / 100);
        gKcal += kcal; gCnt++;
        totKcal += kcal; totItems++;
      }
      const name = isEN ? it.nameEn : it.name;
      let qtyTxt = Math.round(it.grams) + ' ' + (isEN ? 'g' : 'غ');
      if (it.unit && it.unitG && it.pieces) {
        qtyTxt += ' (≈' + (Math.round(it.pieces * 10) / 10) + ' ' + (isEN ? 'pcs' : it.unit) + ')';
      }
      rowsHtml += `<div class="grocery-item ${isExcluded ? 'excluded' : ''}" onclick="groceryToggleItem(${idx})">
        <input class="g-check" type="checkbox" ${isExcluded ? '' : 'checked'} onclick="event.stopPropagation();groceryToggleItem(${idx})"/>
        <span class="g-name">${name}</span>
        <span class="g-kcal">${isEN ? Math.round(it.cal * (it.grams / 100)) + ' kcal' : Math.round(it.cal * it.grams / 100) + ' سع'}</span>
        <span class="g-qty">${qtyTxt}</span>
      </div>`;
    });
    html += `<div class="grocery-group">
      <div class="grocery-group-hd">
        <span class="grocery-group-name">${isEN ? (g.catEn || g.key) : (g.cat || g.key)}</span>
        <span class="grocery-group-val">${gCnt} ${isEN ? 'items • ≈' : 'عنصر • ≈'}${Math.round(gKcal)} ${isEN ? 'kcal' : 'سع'}</span>
      </div>${rowsHtml}</div>`;
  });

  if (!anyGroup) {
    groupsEl.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    if (summaryEl) summaryEl.style.display = 'none';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';
  if (summaryEl) {
    summaryEl.style.display = 'block';
    summaryEl.innerHTML = `<span style="font-family:'Barlow Condensed',sans-serif;font-weight:700;letter-spacing:2px;color:var(--y);text-transform:uppercase;">${totItems} ${isEN ? 'items included' : 'عنصر مُتضمن'} · ${Math.round(totKcal)} ${isEN ? 'kcal total' : 'سع إجمالي'}</span>`;
  }
  groupsEl.innerHTML = html;
}

function groceryToggleItem(idx) {
  const name = window._grocery.stock[idx];
  if (!name) return;
  window._grocery.excluded[name] = !window._grocery.excluded[name];
  groceryRender();
}

function groceryCopy() {
  const isEN = (window._lang === 'en');
  const { groups, order } = groceryCollect();
  const clientName = document.getElementById('c-name')?.value || document.getElementById('c-name-ar')?.value || '';
  let lines = [isEN ? '🧾 GROCERY LIST — Olympic Gym' : '🧾 قائمة المشتريات — Olympic Gym'];
  if (clientName) lines.push(isEN ? 'Client: ' + clientName : 'العميل: ' + clientName);
  lines.push('──────────────');
  order.forEach(g => {
    const items = Object.values(groups[g.key] || {});
    const incl = items.filter(it => !window._grocery.excluded[it.name]);
    if (!incl.length) return;
    lines.push('');
    lines.push(isEN ? '[' + (g.catEn || g.key) + ']' : '[' + (g.cat || g.key) + ']');
    incl.forEach(it => {
      const name = isEN ? it.nameEn : it.name;
      let qty = Math.round(it.grams) + ' ' + (isEN ? 'g' : 'غ');
      if (it.unit && it.unitG && it.pieces) qty += ' (≈' + (Math.round(it.pieces * 10) / 10) + ' ' + (isEN ? 'pcs' : it.unit) + ')';
      lines.push('• ' + name + ' — ' + qty);
    });
  });
  const txt = lines.join('\n');
  const done = () => toast('📋 Grocery list copied!', 'success');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(txt).then(done).catch(() => groceryCopyFallback(txt, done));
  } else groceryCopyFallback(txt, done);
}
function groceryCopyFallback(txt, done) {
  const ta = document.createElement('textarea');
  ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); done(); } catch (e) { toast('Copy failed', 'error'); }
  ta.remove();
}

// ── Plan file export / import (JSON — share between devices) ──
function exportPlanFile() {
  try {
    if (typeof collectPlanData !== 'function') throw new Error('collectPlanData missing');
    const data = collectPlanData();
    const client = (document.getElementById('c-name')?.value || document.getElementById('c-name-ar')?.value || 'Plan');
    const safe = String(client).trim().replace(/[\\/:*?"<>|]/g, '') || 'Plan';
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    window.downloadBlob(blob, 'OG_Plan_' + safe + '.json');
    toast('📤 Plan file exported', 'success');
  } catch (e) {
    toast('Export failed: ' + (e.message || e), 'error');
  }
}

function importPlanFile(input) {
  const f = input.files && input.files[0];
  if (!f) return;
  const r = new FileReader();
  r.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      if (typeof applyPlanData !== 'function') throw new Error('applyPlanData missing');
      applyPlanData(data);
      closeSaveModal();
      toast('✅ Plan file applied!', 'success');
      if (typeof rosterRender === 'function') setTimeout(rosterRender, 50);
    } catch (err) {
      toast('Invalid plan file: ' + (err.message || err), 'error');
    }
  };
  r.onerror = () => toast('Could not read file', 'error');
  r.readAsText(f);
  input.value = '';
}

// ════════════════════════════════════════════════════════════════
// 🌙 RAMADAN MODE — shifts day anchors to suhoor/iftar schedule
// ════════════════════════════════════════════════════════════════
window._ramadan = false;
try { window._ramadan = localStorage.getItem('og_ramadan_mode') === '1'; } catch(e) {}

function toggleRamadanMode() {
  window._ramadan = !window._ramadan;
  try { localStorage.setItem('og_ramadan_mode', window._ramadan ? '1' : '0'); } catch(e) {}
  applyRamadanModeUI();
  if (typeof suppTimelineRender === 'function') suppTimelineRender();
  toast(window._ramadan ? '🌙 Ramadan Mode ON — timing shifted to suhoor/iftar' : 'Ramadan Mode OFF — normal timing', 'success');
}

function applyRamadanModeUI() {
  const isEN = (window._lang === 'en');
  const chip = document.getElementById('ramadan-mode-chip');
  if (chip) {
    chip.classList.toggle('ram-on', window._ramadan);
    chip.textContent = window._ramadan ? (isEN ? '🌙 Ramadan Mode: ON' : '🌙 وضع رمضان: ON')
                                       : (isEN ? '🌙 Ramadan Mode' : '🌙 وضع رمضان');
  }
  const msg = isEN
    ? '🌙 <b>Ramadan Mode active.</b> Supplement-day anchors now follow the suhoor (≈ 4:00 AM) / iftar (≈ 6:15 PM) schedule. Set your training time as usual — pre/during/post-workout items follow it.'
    : '🌙 <b>وضع رمضان مُفعّل.</b> توقيت المكملات الآن يتبع جدول السحور (≈ 4:00 ص) والإفطار (≈ 6:15 م). حدّد وقت التمرين كالعادة — مكملات ما قبل/أثناء/بعد التمرين تتبعه.';
  ['ramadan-banner-meals', 'ramadan-banner-supps'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.innerHTML = msg; el.style.display = window._ramadan ? 'block' : 'none'; }
  });
}
document.addEventListener('DOMContentLoaded', applyRamadanModeUI);

// ════════════════════════════════════════════════════════════════
// 🕐 RECENT FOODS BAR — one-tap chips above the meal plan
// ════════════════════════════════════════════════════════════════
// Track the last food row the coach focused (chips fill that row)
document.addEventListener('focusin', e => {
  if (e.target && e.target.classList && e.target.classList.contains('food-search')) {
    window._lastFoodRow = e.target.closest('.food-row');
  }
});

function recentBarRender() {
  const bar = document.getElementById('recent-foods-bar');
  const chipsEl = document.getElementById('recent-chips');
  if (!bar || !chipsEl) return;
  const isEN = (window._lang === 'en');
  const rec = getRecentFoods();
  if (!rec.length) { bar.style.display = 'none'; return; }
  bar.style.display = 'flex';
  chipsEl.innerHTML = rec.slice(0, 10).map(f => {
    const idx = FOOD_DB.indexOf(f);
    if (idx < 0) return '';
    const name = isEN ? (f.en || f.ar) : f.ar;
    return `<button class="recent-chip" onclick="recentChipPick(${idx})" title="${name} — ${f.cal} kcal"><span class="rc-kcal">${f.cal}</span>${name}</button>`;
  }).join('');
}

function recentChipPick(idx) {
  const isEN = (window._lang === 'en');
  const row = window._lastFoodRow;
  const holder = document.getElementById('recent-foods-bar');
  if (!row || !document.body.contains(row)) {
    toast(isEN ? 'Open a food row first — tap one of the name fields in the meals' : 'افتح صف طعام أولاً — اضغط على خانة الاسم في الوجبات', 'error');
    return;
  }
  const fake = document.createElement('div');
  fake.dataset.idx = idx;
  row.appendChild(fake);
  try { selectFoodItem({ preventDefault(){}, stopPropagation(){} }, fake); } catch(e) {}
  fake.remove();
  if (holder) holder.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
document.addEventListener('DOMContentLoaded', recentBarRender);

// ════════════════════════════════════════════════════════════════
// ⚠️ SUPPLEMENT CONFLICT WARNINGS — silent, inline, informational
// ════════════════════════════════════════════════════════════════
function suppStackNames() {
  return [...document.querySelectorAll('#supp-rows .supp-row')].map(row => {
    const inp = row.querySelectorAll('input');
    return inp[0] ? (inp[0].value || '').trim() : '';
  }).filter(Boolean);
}

function suppConflictsRender() {
  const box = document.getElementById('supp-conflicts');
  if (!box) return;
  const isEN = (window._lang === 'en');
  const names = suppStackNames();
  const hasAny = re => names.some(n => re.test(n));
  const count = re => names.filter(n => re.test(n)).length;
  const out = [];

  // 1) stimulant stacking (pre-workout / caffeine / green tea / green coffee / yohimbine)
  const STIM = /(pre.?workout|بري وورك|كافيين|caffeine|شاي أخضر|green tea|green coffee|بن أخضر|يوهمبين|yohimbine|l.?theanine|ثيانين)/i;
  const nStim = count(STIM);
  if (nStim >= 2) out.push({ type: 'warn', en: `<b>${nStim} stimulant sources</b> in one stack — watch total caffeine (aim ≤ 400 mg/day) and consider placing them apart (morning vs pre-workout).`, ar: `<b>${nStim} مصادر منبهات</b> في نفس الروتين — راقب إجمالي الكافيين (الحد ≈ 400 ملغرام/يوم) وفكّر في توزيعها (صباح vs قبل التمرين).` });

  // 2) iron × calcium/zinc — absorption competition
  if (hasAny(/فريوسول|حديد|iron/i) && hasAny(/كالسيوم|calcium|zinc|زنك/i))
    out.push({ type: 'warn', en: '<b>Iron vs Calcium/Zinc</b> — these compete for absorption. Keep them ≥ 2 hours apart (e.g. iron morning, zinc/magnesium at night).', ar: '<b>حديد يتنافس مع الكالسيوم/الزنك</b> على الامتصاص. باعد بينهما ساعتين على الأقل (الحديد صباحاً، الزنك/المغنيسيوم ليلاً).' });

  // 3) zinc + magnesium separate rows → suggest ZMA consolidation
  if (hasAny(/زنك|zinc/i) && hasAny(/مغنيسيوم|magnesium/i) && !hasAny(/\bzma\b/i))
    out.push({ type: 'info', en: 'Zinc and Magnesium both at night? A single <b>ZMA</b> dose covers both — fewer pills, same effect.', ar: 'الزنك والمغنيسيوم معاً ليلاً؟ جرعة <b>ZMA</b> واحدة تحقق الاثنين — حبتين أقل ونفس النتيجة.' });

  // 4) multivitamin overlapping single vitamins
  if (hasAny(/ملتي|multivitamin|multi.?vit/i) && hasAny(/فيتامين|vitamin|فيتامين D3|فيتامين C|B12/i))
    out.push({ type: 'info', en: '<b>Multivitamin + separate vitamins</b> — same nutrients twice. Check doses so single vitamins don\'t double what the multi already gives.', ar: '<b>ملتي فيتامين + فيتامينات مفردة</b> — نفس العناصر مرتين. راقب الجرعات حتى لا يتضاعف ما يغطيه الملتي أصلَه.' });

  // 5) vitamin D3 duplicated with K2+D3
  if (hasAny(/فيتامين D3|vitamin d3|\bd3\b/i) && hasAny(/K2\ ?\+?\ ?D3/i))
    out.push({ type: 'info', en: '<b>D3 and K2+D3 together</b> — you\'re taking D3 twice. Keep one of them.', ar: '<b>D3 و K2+D3 معاً</b> — فيتامين D3 مكرر. يكفي واحد منهما.' });

  // 6) multiple protein powders
  const nProt = count(/واي|بروتين ?(واي|ايزوليت|كازين)|whey|isolate|casein|mass gainer|مضخم|beef protein/i);
  if (nProt >= 2) out.push({ type: 'info', en: `<b>${nProt} different protein powders</b> — fine if deliberate (fast vs slow), but one type is usually enough for budget and adherence.`, ar: `<b>${nProt} أنواع بروتين مختلفة</b> — جيد إذا كان مقصوداً (سريع vs بطيء)، لكن نوع واحد غالباً كافٍ للبساطة والالتزام.` });

  // 7) melatonin + ZMA/mag — informational synergy note
  if (hasAny(/ميلاتونين|melatonin/i) && hasAny(/مغنيسيوم|melatonin|zma/i))
    out.push({ type: 'info', en: 'Night stack looks good: Magnesium/ZMA + Melatonin complement each other for sleep quality.', ar: 'روتين الليل جيد: المغنيسيوم/ZMA + الميلاتونين يكملان بعضهما لجودة النوم.' });

  box.innerHTML = out.map(c =>
    `<div class="supp-${c.type === 'warn' ? 'conflict' : 'info'}">${c.type === 'warn' ? '⚠️' : 'ℹ️'} ${isEN ? c.en : c.ar}</div>`
  ).join('');
}

// ════════════════════════════════════════════════════════════════
// 📈 PROGRESS TRACKER — weekly weight / body-fat / photos
// ════════════════════════════════════════════════════════════════
function progKey() {
  const id = chGetActive();
  if (id) return 'og_progress_' + id;
  const nm = (document.getElementById('c-name')?.value || document.getElementById('c-name-ar')?.value || '').trim();
  return 'og_progress_' + (nm ? nm.toLowerCase().replace(/\s+/g, '_') : 'default');
}

function progLoad() {
  try { return JSON.parse(localStorage.getItem(progKey()) || '[]'); }
  catch(e) { return []; }
}
function progSave(entries) {
  try { localStorage.setItem(progKey(), JSON.stringify(entries)); }
  catch(e) { toast('Storage full — remove an old photo entry', 'error'); }
}

// Compress a photo to ~640px JPEG so ~dozens fit in localStorage
function progPhotoToFile(file) {
  return new Promise(resolve => {
    if (!file || !file.type.startsWith('image/')) { resolve(null); return; }
    const img = new Image();
    img.onload = () => {
      try {
        const MAX = 640;
        const scale = Math.min(1, MAX / Math.max(img.width, img.height));
        const cv = document.createElement('canvas');
        cv.width = Math.round(img.width * scale);
        cv.height = Math.round(img.height * scale);
        cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height);
        resolve(cv.toDataURL('image/jpeg', 0.72));
        URL.revokeObjectURL(img.src);
      } catch(e) { resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = URL.createObjectURL(file);
  });
}

function progAdd() {
  const isEN = (window._lang === 'en');
  const wEl = document.getElementById('prog-w');
  const w = parseFloat(wEl.value);
  if (!w || w < 25 || w > 400) {
    toast(isEN ? 'Enter a valid weight first' : 'أدخل وزناً صحيحاً أولاً', 'error');
    return;
  }
  const bfCol = document.getElementById('prog-bf');
  const bf = parseFloat(bfCol.value);
  const note = document.getElementById('prog-note').value.trim();
  let date = document.getElementById('prog-date').value;
  if (!date) date = new Date().toISOString().slice(0, 10);
  const entry = { d: date, w, bf: (bf && bf > 2 && bf < 70) ? bf : null, note: note || '', ts: Date.now() };

  const finish = (photo) => {
    if (photo) entry.p = photo;
    const entries = progLoad();
    // ts must be unique (two check-ins can happen in the same millisecond)
    while (entries.some(x => x.ts === entry.ts)) entry.ts++;
    // Same date → replace instead of duplicating (typo fix = just re-add)
    const sameIdx = entries.findIndex(x => x.d === date);
    if (sameIdx >= 0) entries[sameIdx] = Object.assign(entries[sameIdx], entry);
    else { entries.push(entry); entries.sort((a, b) => a.d < b.d ? -1 : 1); }
    progSave(entries);
    wEl.value = ''; bfCol.value = ''; document.getElementById('prog-note').value = '';
    const ph = document.getElementById('prog-photo-input'); if (ph) ph.value = '';
    progRender();
    toast('✅ ' + (isEN ? 'Check-in saved' : 'تم حفظ الوزن'), 'success');
  };
  const f = document.getElementById('prog-photo-input').files[0];
  if (f) progPhotoToFile(f).then(finish);
  else finish(null);
}

function progDelete(ts) {
  const entries = progLoad().filter(x => x.ts !== ts);
  progSave(entries);
  progRender();
}

function progUseWeight(ts) {
  const isEN = (window._lang === 'en');
  const e = progLoad().find(x => x.ts === ts);
  if (!e) return;
  const el = document.getElementById('ib-weight');
  if (el) { el.value = e.w; el.dispatchEvent(new Event('input')); }
  toast('⚖️ ' + (isEN ? 'Used as current InBody weight' : 'تم اعتماده كوزن حالي'), 'success');
}

// SVG line chart of weights (bf as dashed secondary if present)
function progChartSVG(entries) {
  const W = 620, H = 190, PL = 40, PR = 14, PT = 16, PB = 28;
  const ws = entries.map(e => e.w);
  let min = Math.min(...ws), max = Math.max(...ws);
  const pad = Math.max(1, (max - min) * 0.15);
  min = Math.floor((min - pad) * 10) / 10; max = Math.ceil((max + pad) * 10) / 10;
  const x = i => entries.length === 1 ? (W - PR - 30) : PL + i * (W - PL - PR) / (entries.length - 1);
  const y = v => PT + (H - PT - PB) * (1 - (v - min) / (max - min || 1));
  const pts = entries.map((e, i) => `${x(i).toFixed(1)},${y(e.w).toFixed(1)}`).join(' ');
  const isEN = (window._lang === 'en');
  let s = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" role="img" aria-label="weight chart">`;
  // horizontal gridlines
  [0, 0.5, 1].forEach(t => {
    const yy = (PT + t * (H - PT - PB)).toFixed(1);
    const vv = (max - t * (max - min)).toFixed(1);
    s += `<line x1="${PL}" y1="${yy}" x2="${W - PR}" y2="${yy}" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>`;
    s += `<text x="${PL - 6}" y="${(+yy + 3)}" fill="#555" font-size="9" text-anchor="end">${vv}</text>`;
  });
  if (entries.some(e => e.bf)) {
    const bfs = entries.filter(e => e.bf);
    const bmin = Math.min(...bfs.map(e => e.bf)) - 1;
    const bmax = Math.max(...bfs.map(e => e.bf)) + 1;
    const yb = v => PT + (H - PT - PB) * (1 - (v - bmin) / (bmax - bmin || 1));
    const bp = entries.filter(e => e.bf).map((e, i, a) => {
      const gi = entries.indexOf(e);
      const xi = entries.length === 1 ? (W - PR - 30) : PL + gi * (W - PL - PR) / (entries.length - 1);
      return `${xi.toFixed(1)},${yb(e.bf).toFixed(1)}`;
    }).join(' ');
    s += `<polyline points="${bp}" fill="none" stroke="#00CFFF" stroke-width="1.5" stroke-dasharray="5 4" opacity="0.85"/>`;
    entries.filter(e => e.bf).forEach(e => {
      const gi = entries.indexOf(e);
      const xi = entries.length === 1 ? (W - PR - 30) : PL + gi * (W - PL - PR) / (entries.length - 1);
      s += `<circle cx="${xi.toFixed(1)}" cy="${yb(e.bf).toFixed(1)}" r="2.8" fill="#00CFFF"/>`;
    });
  }
  s += `<polyline points="${pts}" fill="none" stroke="#4ade80" stroke-width="2.5" stroke-linejoin="round"/>`;
  entries.forEach((e, i) => {
    s += `<circle cx="${x(i).toFixed(1)}" cy="${y(e.w).toFixed(1)}" r="4" fill="#4ade80"/>`;
    if (entries.length <= 14) s += `<text x="${x(i).toFixed(1)}" y="${H - 8}" fill="#555" font-size="9" text-anchor="middle">${(e.d || '').slice(5)}</text>`;
  });
  const last = entries[entries.length - 1], first = entries[0];
  const diff = (last.w - first.w);
  const dTxt = (diff >= 0 ? '+' : '') + diff.toFixed(1) + ' kg';
  s += `<text x="${W - PR}" y="${PT + 2}" fill="${diff <= 0 ? '#4ade80' : '#FF8C42'}" font-size="11" text-anchor="end" font-family="Barlow Condensed">${dTxt} ${isEN ? '(since start)' : '(من البداية)'}</text>`;
  if (entries.some(e => e.bf)) s += `<text x="${W - PR}" y="${PT + 18}" fill="#00CFFF" font-size="10" text-anchor="end" opacity=".8">${isEN ? '- -  body fat %' : '- -  دهون %'}</text>`;
  s += '</svg>';
  return s;
}

function progRender() {
  const wrap = document.getElementById('prog-chart-wrap');
  if (!wrap) return;
  const isEN = (window._lang === 'en');
  const entries = progLoad().slice(); // already sorted by date
  entries.sort((a, b) => a.d < b.d ? -1 : 1);
  // client name
  const nm = document.getElementById('c-name')?.value || document.getElementById('c-name-ar')?.value || '';
  const cn = document.getElementById('prog-client-name');
  if (cn) cn.textContent = nm || (isEN ? 'No client selected' : 'لا يوجد عميل محدد');
  // default date = today when empty
  const dEl = document.getElementById('prog-date');
  if (dEl && !dEl.value) dEl.value = new Date().toISOString().slice(0, 10);
  const emptyEl = document.getElementById('prog-empty');
  const listEl = document.getElementById('prog-list');
  if (!entries.length) {
    if (wrap) wrap.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    if (listEl) listEl.innerHTML = '';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';
  if (wrap) wrap.innerHTML = progChartSVG(entries);
  if (listEl) {
    const rev = entries.slice().reverse();
    listEl.innerHTML = rev.map(e => {
      const d = e.d || '';
      const bf = e.bf ? `<span class="pl-bf">${isEN ? 'BF' : 'دهون'} ${e.bf}%</span>` : '<span class="pl-bf" style="color:#333;">—</span>';
      const note = e.note ? `<span class="pl-note" title="${e.note}">💬 ${e.note}</span>` : '<span class="pl-note"></span>';
      const ph = e.p ? `<img class="pl-photo" src="${e.p}" onclick="progShowPhoto('${e.ts}')" alt="photo"/>` : '';
      return `<div class="prog-foldout-row">
        <span class="pl-date">${d}</span>
        <span class="pl-w">${e.w}<small> kg</small></span>
        ${bf}
        ${note}
        ${ph}
        <button class="pl-use" onclick="progUseWeight(${e.ts})">${isEN ? '⚖ Use as InBody weight' : '⚖ اعتمد كوزن'}</button>
        <button class="pl-del" onclick="progDelete(${e.ts})" title="${isEN ? 'delete' : 'حذف'}">✕</button>
      </div>`;
    }).join('');
  }
}
function progShowPhoto(ts) {
  const e = progLoad().find(x => String(x.ts) === String(ts));
  if (!e || !e.p) return;
  let t = document.getElementById('prog-photo-target');
  if (!t) {
    t = document.createElement('div');
    t.id = 'prog-photo-target';
    t.onclick = () => t.classList.remove('show');
    document.body.appendChild(t);
  }
  t.innerHTML = `<img src="${e.p}" alt="progress photo"/>`;
  t.classList.add('show');
}

// ════════════════════════════════════════════════════════════════
// 🍩 CHEAT DAY / FREE MEAL EXCHANGE
// ════════════════════════════════════════════════════════════════
// One option of one meal can be marked as a "free meal". The grand total
// excludes it, and ——AUTO-BALANCE—— trims carbs & fats from the OTHER
// meals so daily totals still hit target. Protein is never trimmed.
window._freeMeals = window._freeMeals || {};
window._cheatUndo = [];

function cheatBanner(html) {
  const b = document.getElementById('cheat-banner');
  if (!b) { if (html) toast(html.replace(/<[^>]+>/g, ''), 'success'); return; }
  if (!html) { b.style.display = 'none'; b.innerHTML = ''; return; }
  b.innerHTML = html;
  b.style.display = 'block';
}

function isFreeKey(key) { return !!(window._freeMeals && window._freeMeals[key]); }

function toggleFreeMeal(mealId, optN) {
  const isEN = (window._lang === 'en');
  const key = mealId + '-' + optN;
  const turningOn = !isFreeKey(key);
  if (turningOn) {
    // single free meal per plan — unmark any other
    const other = Object.keys(window._freeMeals).filter(k => window._freeMeals[k] && k !== key);
    other.forEach(k => window._freeMeals[k] = false);
    window._freeMeals[key] = true;
  } else {
    window._freeMeals[key] = false;
  }
  applyFreeMealChips();
  updateGrandTotal();
  toast(turningOn
    ? '🍩 ' + (isEN ? 'Free meal set — totals exclude it now' : 'تم تعيين وجبة حرة — الإجماليات تستثنيها الآن')
    : (isEN ? 'Free meal removed' : 'تم إلغاء الوجبة الحرة'), 'success');
}

function applyFreeMealChips() {
  MEALS_DEF.forEach(m => OPTS_DEF.forEach(o => {
    const key = m.id + '-' + o.n;
    const chip = document.getElementById('fme-' + key);
    if (chip) chip.classList.toggle('on', isFreeKey(key));
    const panel = document.getElementById('opt-' + key);
    if (panel) panel.classList.toggle('free-meal', isFreeKey(key));
  }));
}

// Row grams + per-food macros (same scale logic as updateRowMacros)
function cheatRowInfo(row) {
  const c   = parseFloat(row.dataset.foodCal)  || 0;
  const p   = parseFloat(row.dataset.foodProt) || 0;
  const cb  = parseFloat(row.dataset.foodCarb) || 0;
  const f   = parseFloat(row.dataset.foodFat)  || 0;
  if (!c && !p) return null;
  const unitG = parseFloat(row.dataset.foodUnitG) || 0;
  const unit  = row.dataset.foodUnit || '';
  const qty   = parseFloat(row.querySelector('.food-qty-input')?.value) || 0;
  const grams = (unit && unitG && qty > 0) ? qty * unitG : qty;
  return { row, qty, unit, unitG, prot100: p, carb100: cb, fat100: f,
           carbTot: cb * grams / 100, fatTot: f * grams / 100, protTot: p * grams / 100 };
}

function cheatCollect() {
  const freeKeys = [];
  MEALS_DEF.forEach(m => OPTS_DEF.forEach(o => { if (isFreeKey(m.id + '-' + o.n)) freeKeys.push(m.id + '-' + o.n); }));
  const freeTot = { cal: 0, prot: 0, carb: 0, fat: 0 };
  freeKeys.forEach(k => {
    const [mid, on] = k.split('-');
    const t = getMealOptTotals(mid, on);
    freeTot.cal += t.cal; freeTot.prot += t.prot; freeTot.carb += t.carb; freeTot.fat += t.fat;
  });
  const rows = [];
  MEALS_DEF.forEach(m => OPTS_DEF.forEach(o => {
    if (isFreeKey(m.id + '-' + o.n)) return; // free rows are never trimmed
    [...document.querySelectorAll('#rows-' + m.id + '-' + o.n + ' .food-row')].forEach(row => {
      const info = cheatRowInfo(row);
      if (info) rows.push(info);
    });
  }));
  return { freeKeys, freeTot, rows };
}

function setRowQty(row, newQty) {
  const inp = row.querySelector('.food-qty-input');
  if (!inp) return null;
  const old = inp.value;
  inp.value = newQty;
  updateRowMacros(row);   // recalc row bar, meal totals, grand total, preview
  return old;
}

function autoCompensate() {
  const isEN = (window._lang === 'en');
  const { freeKeys, freeTot, rows } = cheatCollect();
  if (!freeKeys.length) {
    toast(isEN ? 'Mark a meal as 🍩 Free Meal first (the donut chip shown on every option)' : 'علّم وجبة كـ 🍩 حرّة أولاً (زر الدنُت في كل خيار)', 'error');
    return;
  }
  const tC = parseFloat(document.getElementById('t-carbs')?.value) || 0;
  const tF = parseFloat(document.getElementById('t-fats')?.value)  || 0;
  if (!tC || !tF) {
    toast(isEN ? 'Set the Carb & Fat targets first (Daily Targets page)' : 'حدد أهداف الكربوهيدرات والدهون أولاً', 'error');
    return;
  }
  const allowC = Math.max(0, tC - freeTot.carb);
  const allowF = Math.max(0, tF - freeTot.fat);
  const oC = rows.reduce((s, r) => s + r.carbTot, 0);
  const oF = rows.reduce((s, r) => s + r.fatTot, 0);
  let dC = Math.round((oC - allowC) * 10) / 10;
  let dF = Math.round((oF - allowF) * 10) / 10;

  if (dC <= 0 && dF <= 0) {
    cheatBanner('DONUT ' + (isEN
      ? `<b>Free meal: ${freeKeys.length}</b> (≈${Math.round(freeTot.carb)}g C / ${Math.round(freeTot.fat)}g F). The rest of the plan is already within target — nothing to trim ✅`
      : `<b>وجبة حرة</b> (≈${Math.round(freeTot.carb)}غ كارب / ${Math.round(freeTot.fat)}غ دهون). باقي الخطة داخل الهدف — لا شيء للخصم ✅`));
    return;
  }
  window._cheatUndo = [];
  let trimmedC = 0, trimmedF = 0;

  const trimPass = (key100, need, isCarb) => {
    let remaining = need;
    // Only primary-macro rows get trimmed: a row is a carb source when carbs
    // provide ≥ 50% of its macro weight relative to protein+carb+fat, and
    // vice versa for fat — so protein foods (chicken etc.) are never touched.
    const totOf = r => (r.carb100 + r.fat100 + r.prot100) || 1;
    const keyTot = key100.replace('100', '') + 'Tot'; // carbTot / fatTot
    const scored = rows.filter(r => r[keyTot] > 0.5 && r[key100] / totOf(r) > 0.5)
                       .sort((a, b) => (b[keyTot] - a[keyTot]));

    scored.forEach(r => {
      if (remaining <= 0.05) return;
      const contrib = r[keyTot];
      if (contrib <= 0.1) return;
      // take up to 90% of the row's contribution; never below ~15 g of food
      const take = Math.min(remaining, contrib * 0.9);
      const minShare = (r.unit && r.unitG) ? Math.max(1, Math.ceil(15 / r.unitG)) : Math.max(0, Math.round(15 / 5) * 5);
      let newQty = r.qty * ((contrib - take) / contrib);
      if (r.unit && r.unitG) newQty = Math.round(newQty);
      else newQty = Math.round(newQty / 5) * 5;
      if (newQty < minShare) newQty = Math.min(r.qty, minShare);
      if (newQty >= r.qty) return; // nothing reduced for this row
      const actualTake = contrib * (1 - newQty / r.qty);
      if (actualTake > 0.05) {
        window._cheatUndo.push({ row: r.row, old: r.qty });
        setRowQty(r.row, newQty);
        remaining -= actualTake;
        if (isCarb) trimmedC += actualTake; else trimmedF += actualTake;
      }
    });
  };

  trimPass('carb100', dC, true);
  trimPass('fat100',  dF, false);

  const btn = document.getElementById('cheat-undo-btn');
  if (btn) btn.style.display = window._cheatUndo.length ? 'inline-flex' : 'none';
  cheatingSaveUndo();
  cheatBanner('🍩 ' + (isEN
    ? `<b>Cheat day balanced:</b> carbs trimmed <span style="color:#F5FF00;">${Math.round(trimmedC)} g</span>, fats trimmed <span style="color:#FF8C42;">${Math.round(trimmedF)} g</span> across other meals — <b>protein untouched</b>. Free meal ≈ ${Math.round(freeTot.cal)} kcal.`
    : `<b>تمت الموازنة:</b> خُصم من الكربوهيدرات <span style="color:#F5FF00;">${Math.round(trimmedC)} غ</span> ومن الدهون <span style="color:#FF8C42;">${Math.round(trimmedF)} غ</span> من باقي الوجبات — <b>البروتين لم يُمَس</b>. الوجبة الحرة ≈ ${Math.round(freeTot.cal)} سع.`));
  if (typeof syncPreview === 'function') syncPreview();
}

function cheatUndo() {
  const isEN = (window._lang === 'en');
  if (!window._cheatUndo || !window._cheatUndo.length) return;
  window._cheatUndo.forEach(u => setRowQty(u.row, u.old));
  window._cheatUndo = [];
  const btn = document.getElementById('cheat-undo-btn');
  if (btn) btn.style.display = 'none';
  cheatBanner('');
  toast('↩ ' + (isEN ? 'Quantities restored' : 'تمت إعادة الكميات السابقة'), 'success');
}

function cheatingSaveUndo() {
  // auto-balance is a snapshot edit; keep undo available during the session
  const btn = document.getElementById('cheat-undo-btn');
  if (btn) btn.style.display = window._cheatUndo.length ? 'inline-flex' : 'none';
}

// ════════════════════════════════════════════════════════════════
// ⚠ ALLERGY FLAG WARNINGS
// Reads the client's #c-allergies text, builds the active allergen
// set, and pins an inline red hint on any meal row whose food
// matches. Re-scans when the coach types allergies or picks foods.
// ════════════════════════════════════════════════════════════════
const ALLERGEN_DEF = [
  { id:'dairy', icon:'🥛', ar:'ألبان / لاكتوز', en:'Dairy / Lactose',
    triggers:['lactose','milk','dairy','cheese','yogurt','yoghurt','laban','حليب','ألبان','البن','زبادي','جبن','لاكتوز'],
    cats:['بيض وألبان'],
    words:['جبن','زبادي','حليب','لبن','لبنة','قشطة','موزاريلا','فيتا','شيدر','جودة','بارميزان','ريكوتا','كوتاج','دمياطي','كيري','مثلثات','مصل اللبن','واي بروتين','كازين','كريم تشيز','كيفير','زبدة غير مملحة','شيك'],
    skip:['بيض','بياض','صفار','أومليت','زبدة اللوز','زبدة الكاجو','زبدة الشيا','حليب لوز','حليب الشوفان','حليب الصويا'] },
  { id:'egg', icon:'🥚', ar:'بيض', en:'Eggs',
    triggers:['egg','eggs','بيض'],
    cats:['بيض وألبان'],
    words:['بيض','بياض','صفار','أومليت','بيضة'],
    skip:['جبن','زبادي','حليب','لبن','لبنة','قشطة','موزاريلا','فيتا','شيدر','جودة','بارميزان','ريكوتا','كوتاج','دمياطي','كيري','مثلثات','مصل اللبن','واي','كازين','كريم تشيز','كيفير','زبدة'] },
  { id:'gluten', icon:'🌾', ar:'غلوتين / قمح', en:'Gluten / Wheat',
    triggers:['gluten','glutin','wheat','غلوتين','جلوتين','قمح','wheat allergy','خبز'],
    cats:['خبز ومعجنات'],
    words:['خبز','مكرونة','معكرونة','سباغيتي','بيني','نودلز','برغل','فريك','كسكس','شعير','حنطة','كرواسون','تورتيلا','صمولي','فينو','باجيت','لواش','سيتان','قمح','بكويت','كيك','كراكر'],
    skip:['خبز العدس','حليب شوفان','شوفان'] },
  { id:'nuts', icon:'🥜', ar:'مكسرات', en:'Tree Nuts',
    triggers:['nut','nuts','لوز','جوز','مكسرات','فستق','كاجو','بندق','عين جمل','بيكان'],
    cats:[],
    words:['لوز','عين جمل','جوز','كاجو','فستق','بندق','ماكاديميا','بيكان','مكسرات'],
    skip:['جوز الهند'] },
  { id:'peanut', icon:'🤎', ar:'فول سوداني', en:'Peanuts',
    triggers:['peanut','فول سوداني','سوداني'],
    cats:[],
    words:['فول سوداني','سوداني'] },
  { id:'fish', icon:'🐟', ar:'سمك وبحريات', en:'Fish / Seafood',
    triggers:['fish','seafood','سمك','بحريات','روبيان','جمبري','تونة','سلمون'],
    cats:['أسماك وبحريات'],
    words:['سمك','تونة','سلمون','روبيان','جمبري','سردين','أنشوفة','كابوريا','حبار','أخطبوط','كلاماري','بلح البحر','كافيار','مكريل'] },
  { id:'soy', icon:'🌱', ar:'صويا', en:'Soy',
    triggers:['soy','صويا','توفو','إيداماي'],
    cats:[],
    words:['توفو','صويا','إيداماي'] },
  { id:'sesame', icon:'🫒', ar:'سمسم / طحينة', en:'Sesame',
    triggers:['sesame','سمسم','طحينة'],
    cats:[],
    words:['سمسم','طحينة','حلاوة طحينية'] }
];

// Parse the coach's free-text allergies field → active allergen defs.
window._allergyCache = { text: null, flags: [] };

function allergyActive() {
  const el = document.getElementById('c-allergies');
  const text = el ? el.value : '';
  if (window._allergyCache.text === text) return window._allergyCache.flags;
  const t = text.toLowerCase();
  const flags = !t.trim() ? [] : ALLERGEN_DEF.filter(def =>
    def.triggers.some(tr => t.includes(tr.toLowerCase())));
  window._allergyCache = { text, flags };
  return flags;
}

// Does this food (category + Arabic/English name) match an active allergen?
function foodAllergens(cat, nameAr, nameEn) {
  const flags = allergyActive();
  if (!flags.length) return [];
  const name = ((nameAr || '') + ' ' + (nameEn || '')).toLowerCase();
  const catL = (cat || '').toLowerCase();
  return flags.filter(def => {
    if (def.cats && def.cats.length && def.cats.some(c => catL.includes(c.toLowerCase()))) {
      const skipped = def.skip && def.skip.some(s => name.includes(s.toLowerCase()));
      if (!skipped) return true;
    }
    const hit = def.words.some(w => name.includes(w.toLowerCase()));
    if (!hit) return false;
    if (def.skip && def.skip.some(s => name.includes(s.toLowerCase()))) return false;
    return true;
  });
}

// Pin/unpin the inline red hint on one food row.
function allergyCheckRow(row) {
  if (!row || !row.classList || !row.classList.contains('food-row')) return;
  let hint = row.querySelector('.allergy-hint');
  const matched = foodAllergens(row.dataset.foodCat || '', row.dataset.foodName || '', row.dataset.foodNameEn || '');
  if (!matched.length) {
    if (hint) hint.remove();
    row.classList.remove('has-allergy');
    allergyBannerUpdate();
    return;
  }
  const isEN = window._lang === 'en';
  const msg = matched.map(a => a.icon + ' ' + (isEN ? a.en : a.ar)).join('  •  ');
  const full = (isEN
    ? `⚠ Client allergy: ${msg} — swap this food for the client's safety`
    : `⚠ حساسية العميل: ${msg} — استبدل هذا الطعام`);
  if (!hint) {
    hint = document.createElement('div');
    hint.className = 'allergy-hint';
    hint.style.cssText = 'grid-column:1/-1;';
    row.appendChild(hint);
  }
  hint.textContent = full;
  row.classList.add('has-allergy');
  allergyBannerUpdate();
}

// Meals-page summary banner: active allergens + number of flagged rows.
function allergyBannerUpdate() {
  const b = document.getElementById('allergy-banner');
  const text = document.getElementById('c-allergies')?.value || '';
  if (!b) return;
  if (!text.trim()) { b.style.display = 'none'; b.innerHTML = ''; return; }
  const isEN = window._lang === 'en';
  const flags = allergyActive();
  let flagged = 0;
  document.querySelectorAll('.food-row.has-allergy').forEach(() => flagged++);
  const labelTxt = flags.map(a => a.icon + ' ' + (isEN ? a.en : a.ar)).join(' • ');
  b.innerHTML = '⚠ ' + (isEN
    ? `<b>Client allergies:</b> ${labelTxt} — <b style="color:#f87171;">${flagged} food suspect${flagged===1?'':'s'}</b> marked in red below`
    : `<b>حساسيات العميل:</b> ${labelTxt} — <b style="color:#f87171;">${flagged} طعام</b> معلَّم بالأحمر أدناه`);
  b.style.display = 'block';
}

// Re-scan every meal row (on allergies text change / plan load).
function allergyScanAll() {
  document.querySelectorAll('.food-row').forEach(allergyCheckRow);
  allergyBannerUpdate();
}

// Bind the allergies textarea once (re-scan on every change)
(function allergyBindField() {
  const el = document.getElementById('c-allergies');
  if (el && !el._allergyBound) {
    el._allergyBound = true;
    let t;
    el.addEventListener('input', () => { clearTimeout(t); t = setTimeout(allergyScanAll, 250); });
  }
})();

// ════════════════════════════════════════════════════════════════
// 🗂 PLAN TEMPLATES LIBRARY — save any plan, load with one click
// ════════════════════════════════════════════════════════════════
const TPL_KEY = 'og_templates_v1';

function tplLoadAll() {
  try { return JSON.parse(localStorage.getItem(TPL_KEY) || '[]'); }
  catch(e) { return []; }
}
function tplSaveAll(list) {
  try { localStorage.setItem(TPL_KEY, JSON.stringify(list)); }
  catch(e) { toast('Storage full — delete an old template', 'error'); }
}

function tplSaveCurrent() {
  const isEN = (window._lang === 'en');
  const nameEl = document.getElementById('tpl-name-input');
  const name = (nameEl.value || '').trim();
  if (!name) {
    toast(isEN ? 'Give the template a name first' : 'اختر اسماً للقالب أولاً', 'error');
    nameEl.focus();
    return;
  }
  if (typeof collectPlanData !== 'function') { toast('collectPlanData missing', 'error'); return; }
  const data = collectPlanData();
  // Templates are reusable: strip client identity
  delete data['c-name']; delete data['c-name-ar'];
  delete data['ib-date'];
  const list = tplLoadAll();
  // Same name → overwrite (user iterating on the same template)
  const i = list.findIndex(t => t.name === name);
  const rec = { id: 'tpl_' + Date.now(), name, ts: Date.now(), data };
  if (i >= 0) rec.id = list[i].id, list[i] = rec; else list.push(rec);
  tplSaveAll(list);
  nameEl.value = '';
  tplRender();
  toast('💾 ' + (isEN ? 'Template saved: ' : 'تم حفظ القالب: ') + name, 'success');
}

function tplDelete(id) {
  tplSaveAll(tplLoadAll().filter(t => t.id !== id));
  tplRender();
  const isEN = (window._lang === 'en');
  toast((isEN ? 'Template deleted' : 'تم حذف القالب'), 'success');
}

function tplApply(id) {
  const isEN = (window._lang === 'en');
  const t = tplLoadAll().find(x => x.id === id);
  if (!t || typeof applyPlanData !== 'function') return;
  // Keep current client name & coach line unless they're empty
  const keep = {};
  ['c-name', 'c-name-ar', 'c-coach-name'].forEach(k => {
    const el = document.getElementById(k);
    if (el && el.value.trim()) keep[k] = el.value;
  });
  try {
    applyPlanData(Object.assign({}, t.data, keep));
  } catch (e) {
    toast((isEN ? 'Load failed: ' : 'فشل التحميل: ') + (e.message || e), 'error');
    return;
  }
  toast('✅ ' + (isEN ? 'Template applied: ' : 'تم تطبيق القالب: ') + t.name, 'success');
  if (typeof suppTimelineRender === 'function') suppTimelineRender();
  if (typeof rosterRender === 'function') setTimeout(rosterRender, 50);
  showPage('targets');
}

function tplRender() {
  const grid = document.getElementById('tpl-grid');
  if (!grid) return;
  const isEN = (window._lang === 'en');
  const emptyEl = document.getElementById('tpl-empty');
  const list = tplLoadAll().slice().sort((a, b) => b.ts - a.ts);
  if (!list.length) {
    grid.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }
  if (emptyEl) emptyEl.style.display = 'none';
  grid.innerHTML = list.map(t => {
    const d = new Date(t.ts);
    const dstr = d.toISOString().slice(0, 10);
    const meals = (t.data._meals || []).length;
    const supps = (t.data._supps || []).length;
    const cal = t.data['t-cal'] || '—';
    const meta = `${dstr} · ${meals} ${isEN ? 'foods' : 'طعام'} · ${supps} ${isEN ? 'supps' : 'مكمل'} · ${cal} ${isEN ? 'kcal' : 'سع'}`;
    return `<div class="tpl-card">
      <button class="tpl-del" onclick="tplDelete('${t.id}')" title="${isEN ? 'delete' : 'حذف'}">✕</button>
      <div class="tpl-name">🗂 ${t.name}</div>
      <div class="tpl-meta">${meta}</div>
      <button class="tpl-load" onclick="tplApply('${t.id}')">⚡ ${isEN ? 'Load for current client' : 'تطبيق على العميل الحالي'}</button>
    </div>`;
  }).join('');
}
