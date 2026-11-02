// ══════════════════════════════════════════════════════════
// 💾 SAVE / LOAD SYSTEM
// ══════════════════════════════════════════════════════════
// Slot count is user-adjustable: starts at 20, up to 100 via the ＋ / −
// buttons in the save modal. The count itself persists in localStorage.
// Slot DATA always lives in the plain shared keys og_plan_slot_<n>.
const SAVE_KEY_PREFIX = 'og_plan_slot_';
const SAVE_SLOTS_MIN = 20;
const SAVE_SLOTS_MAX = 100;

function getSlotCount() {
  let n = parseInt(localStorage.getItem('og_slot_count'), 10);
  if (!Number.isFinite(n) || n < SAVE_SLOTS_MIN) n = SAVE_SLOTS_MIN;
  if (n > SAVE_SLOTS_MAX) n = SAVE_SLOTS_MAX;
  return n;
}
function setSlotCount(n) {
  localStorage.setItem('og_slot_count', String(Math.max(SAVE_SLOTS_MIN, Math.min(SAVE_SLOTS_MAX, n))));
}
// Highest slot currently holding a saved plan (0 = none used)
function getHighestUsedSlot() {
  let hi = 0;
  for (let i = 1; i <= SAVE_SLOTS_MAX; i++) {
    if (localStorage.getItem(SAVE_KEY_PREFIX + i)) hi = i;
  }
  return hi;
}
function addSaveSlots(n) {
  const cur = getSlotCount();
  if (cur >= SAVE_SLOTS_MAX) { toast('Maximum is ' + SAVE_SLOTS_MAX + ' slots', 'info'); return; }
  setSlotCount(Math.min(SAVE_SLOTS_MAX, cur + n));
  renderSaveModal();
}
function removeSaveSlots(n) {
  const cur = getSlotCount();
  const target = Math.max(SAVE_SLOTS_MIN, cur - n);
  const used = getHighestUsedSlot();
  if (used > target) {
    toast('Slot ' + used + ' has a saved plan — delete it first before removing slots', 'error');
    return;
  }
  setSlotCount(target);
  renderSaveModal();
}

function collectPlanData() {
  const ids = [
    'c-name','c-name-ar','c-coach-name','c-age','c-gender','c-goal','c-phase',
    'c-injuries','c-allergies',
    'ib-weight','ib-height','ib-bf','ib-smm','ib-fatmass','ib-bmi','ib-tbw',
    'ib-protein-kg','ib-vfl','ib-score','ib-age','ib-gender','ib-activity','ib-date',
    't-cal','t-prot','t-carbs','t-fats','t-water','t-traintime',
    'cc-H-cal','cc-H-prot','cc-H-carbs','cc-H-fats',
    'cc-M-cal','cc-M-prot','cc-M-carbs','cc-M-fats',
    'cc-L-cal','cc-L-prot','cc-L-carbs','cc-L-fats',
    'coach-notes'
  ];
  const data = { ts: Date.now(), v: 1 };
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) data[id] = el.value;
  });
  // Meals — save all food rows with correct selectors
  data._meals = [];
  if (window.MEALS_DEF && window.OPTS_DEF) {
    MEALS_DEF.forEach(m => {
      OPTS_DEF.forEach(o => {
        const rows = document.querySelectorAll('#rows-' + m.id + '-' + o.n + ' .food-row');
        rows.forEach(row => {
          const nameEl = row.querySelector('.food-search');
          const qtyEl  = row.querySelector('.food-qty-input');
          const tbspEl = row.querySelector('.food-tbsp-input');
          if (nameEl?.value?.trim()) {
            data._meals.push({
              meal: m.id, opt: o.n,
              name: nameEl.value.trim(),
              grams: qtyEl?.value || '',
              tbsp:  tbspEl?.value || '',
              foodCal:  row.dataset.foodCal  || '',
              foodProt: row.dataset.foodProt || '',
              foodCarb: row.dataset.foodCarb || '',
              foodFat:  row.dataset.foodFat  || '',
              foodName:   row.dataset.foodName   || '',
              foodNameEn: row.dataset.foodNameEn || '',
              foodCat:    row.dataset.foodCat    || '',
              foodCatEn:  row.dataset.foodCatEn  || '',
              foodUnit:   row.dataset.foodUnit   || '',
              foodUnitEn: row.dataset.foodUnitEn || '',
              foodUnitG:  row.dataset.foodUnitG  || '',
              foodSliceG: row.dataset.foodSliceG || '',
              foodLiq:    row.dataset.foodLiq    || '',
              foodLiqBase: row.dataset.foodLiqBase || ''
            });
          }
        });
      });
    });
  }
  // Supplements
  data._supps = [];
  document.querySelectorAll('#supp-rows .supp-row').forEach(row => {
    const inputs = row.querySelectorAll('input');
    if (inputs[0]?.value) {
      data._supps.push([inputs[0].value, inputs[1]?.value || '', inputs[2]?.value || '']);
    }
  });
  // Custom meal names
  data._mealNames = window._mealNames || {};
  data._mealSubs = window._mealNameSubs || {};
  // Weekly carb-cycling schedule
  data._ccWeek = (window._ccWeek || ['M','M','M','M','M','M','M']).slice();
  // Carb cycling options (base / per-day kcal)
  data._ccOpts = (window._ccOpts && typeof window._ccOpts === 'object') ? JSON.parse(JSON.stringify(window._ccOpts)) : undefined;
  // 🍩 Free-meal flags
  data._freeMeals = window._freeMeals || {};
  return data;
}

function applyPlanData(data) {
  const ids = [
    'c-name','c-name-ar','c-coach-name','c-age','c-gender','c-goal','c-phase',
    'c-injuries','c-allergies',
    'ib-weight','ib-height','ib-bf','ib-smm','ib-fatmass','ib-bmi','ib-tbw',
    'ib-protein-kg','ib-vfl','ib-score','ib-age','ib-gender','ib-activity','ib-date',
    't-cal','t-prot','t-carbs','t-fats','t-water','t-traintime',
    'cc-H-cal','cc-H-prot','cc-H-carbs','cc-H-fats',
    'cc-M-cal','cc-M-prot','cc-M-carbs','cc-M-fats',
    'cc-L-cal','cc-L-prot','cc-L-carbs','cc-L-fats',
    'coach-notes'
  ];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el && data[id] !== undefined) el.value = data[id];
  });
  // Meals — restore into DOM
  if (data._meals && window.MEALS_DEF && window.OPTS_DEF) {
    // Clear all rows first
    MEALS_DEF.forEach(m => OPTS_DEF.forEach(o => {
      const c = document.getElementById('rows-' + m.id + '-' + o.n);
      if (c) c.innerHTML = '';
    }));
    // Restore saved meals
    data._meals.forEach(item => {
      const c = document.getElementById('rows-' + item.meal + '-' + item.opt);
      if (!c) return;
      addFoodRow(item.meal, item.opt);
      const row = c.lastElementChild;
      if (!row) return;
      const nameEl = row.querySelector('.food-search');
      const qtyEl  = row.querySelector('.food-qty-input');
      const qtyLabel = row.querySelector('.food-qty-label');
      const tbspEl  = row.querySelector('.food-tbsp-input');
      const tbspWrap = row.querySelector('.food-tbsp-wrap');
      if (nameEl) nameEl.value = item.name || '';
      if (qtyEl)  qtyEl.value  = item.grams || '';
      // Restore tbsp: use saved value if present, else recalculate
      // Set all dataset fields first
      row.dataset.foodCal    = item.foodCal    || '';
      row.dataset.foodProt   = item.foodProt   || '';
      row.dataset.foodCarb   = item.foodCarb   || '';
      row.dataset.foodFat    = item.foodFat    || '';
      row.dataset.foodName   = item.foodName   || item.name || '';
      row.dataset.foodNameEn = item.foodNameEn || item.foodName || item.name || '';
      row.dataset.foodCat    = item.foodCat    || '';
      row.dataset.foodCatEn  = item.foodCatEn  || item.foodCat || '';
      row.dataset.foodUnit   = item.foodUnit   || '';
      row.dataset.foodUnitEn = item.foodUnitEn || item.foodUnit || '';
      row.dataset.foodUnitG  = item.foodUnitG  || '';
      row.dataset.foodSliceG = item.foodSliceG || '';
      row.dataset.foodLiq    = item.foodLiq    || '';
      row.dataset.foodLiqBase = item.foodLiqBase || '';
      const _isEN = (window._lang === 'en');
      const _tbspLabelEl = row.querySelector('.food-tbsp-wrap .food-qty-label');
      // Restore secondary column value (tbsp or slice)
      if (tbspEl) {
        if (item.tbsp) {
          tbspEl.value = item.tbsp;
        } else if (item.foodSliceG && item.grams) {
          tbspEl.value = Math.round((parseFloat(item.grams) / parseFloat(item.foodSliceG)) * 4) / 4;
        } else if (item.grams && item.foodName && !item.foodUnit) {
          const t = gramToTbsp(parseFloat(item.grams), item.foodName || '', item.foodCat || '');
          tbspEl.value = (t !== null) ? formatTbspNum(t) : '';
        } else {
          tbspEl.value = '';
        }
      }
      if (item.foodUnit && item.foodUnitG) {
        // Piece-based (banana, egg) or liquid (لتر/كوب): primary column unit counter
        if (row.dataset.foodLiq === '1') {
          ogLiqRenderLabel(row);
          if (qtyEl) qtyEl.step = (item.foodUnit === 'مل') ? '50' : '0.25';
        } else if (qtyLabel) {
          qtyLabel.textContent = (_isEN && item.foodUnitEn) ? item.foodUnitEn : item.foodUnit;
        }
        if (tbspWrap) tbspWrap.style.visibility = 'hidden';
      } else if (item.foodSliceG) {
        // Slice-based (chicken breast): grams + slice side by side
        if (qtyLabel)       qtyLabel.textContent       = _isEN ? 'grams' : 'غرام';
        if (_tbspLabelEl)   _tbspLabelEl.textContent   = _isEN ? 'slices' : 'شريحة';
        if (tbspWrap)       tbspWrap.style.visibility  = 'visible';
      }
      updateRowMacros(row);
    });
  }
  // Supplements
  if (data._supps) {
    document.getElementById('supp-rows').innerHTML = '';
    data._supps.forEach(s => addSuppRow(s[0], s[1], s[2]));
    if (!data._supps.length) addSuppRow();
  }
  // Restore custom meal names
  if (data._mealNames) {
    window._mealNames = data._mealNames;
    Object.keys(data._mealNames).forEach(mealId => {
      const inp = document.getElementById('meal-name-input-'+mealId);
      if (inp) inp.value = data._mealNames[mealId];
    });
  }
  // Restore custom meal sub-names
  window._mealNameSubs = (data._mealSubs && typeof data._mealSubs === 'object') ? data._mealSubs : {};
  Object.keys(window._mealNameSubs).forEach(mealId => {
    const inp = document.getElementById('meal-sub-input-'+mealId);
    if (inp) inp.value = window._mealNameSubs[mealId];
  });
  // Restore carb-cycling weekly schedule (backward-compat: 'M' × 7 if missing)
  if (Array.isArray(data._ccWeek) && data._ccWeek.length === 7) {
    window._ccWeek = data._ccWeek.slice();
  } else {
    window._ccWeek = ['M','M','M','M','M','M','M'];
  }
  // Restore carb cycling options (defaults for old saved plans)
  window._ccOpts = (data._ccOpts && typeof data._ccOpts === 'object')
    ? { base: data._ccOpts.base || 'M', showKcal: !!data._ccOpts.showKcal }
    : { base: 'M', showKcal: false };
  const _cOptSel = document.getElementById('cc-opt-base');
  if (_cOptSel) _cOptSel.value = window._ccOpts.base;
  if (typeof ccLocalizeOptions === 'function') ccLocalizeOptions();
  if (typeof ccSync === 'function') ccSync();
  // 🍩 Restore free-meal flags (empty object for old saved plans)
  window._freeMeals = (data._freeMeals && typeof data._freeMeals === 'object') ? data._freeMeals : {};
  applyFreeMealChips();
  if (typeof ccRenderWeek === 'function') ccRenderWeek();
  calcBMR();
  macroLockSyncInputs();
  macroLockUpdateStatus();
  ccSync();
  syncPreview();
  updateGrandTotal();
  // ⚠ re-pin allergen hints for the loaded plan + client allergies
  if (typeof allergyScanAll === 'function') setTimeout(allergyScanAll, 80);
}

function savePlan(slot) {
  const data = collectPlanData();
  const name = document.getElementById('c-name')?.value || 'Unnamed Plan';
  data._name = name;
  localStorage.setItem(SAVE_KEY_PREFIX + slot, JSON.stringify(data));
  toast('✅ Plan saved to slot ' + slot + ' — ' + name, 'success');
  renderSaveModal();
}

function loadPlan(slot) {
  const raw = localStorage.getItem(SAVE_KEY_PREFIX + slot);
  if (!raw) { toast('No plan in this slot', 'info'); return; }
  try {
    const data = JSON.parse(raw);
    applyPlanData(data);
    toast('✅ Plan loaded: ' + (data._name || 'Slot ' + slot), 'success');
    closeSaveModal();
  } catch(e) {
    toast('Error loading plan', 'error');
  }
}

function deletePlan(slot) {
  localStorage.removeItem(SAVE_KEY_PREFIX + slot);
  renderSaveModal();
  toast('Plan deleted', 'info');
}

function openSaveModal() {
  renderSaveModal();
  const m = document.getElementById('save-modal');
  m.style.display = 'flex';
}
function closeSaveModal() {
  document.getElementById('save-modal').style.display = 'none';
}

function renderSaveModal() {
  // Render slot buttons
  const grid = document.getElementById('save-slots-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const slotCount = getSlotCount();
  const countLbl = document.getElementById('slot-count-label');
  if (countLbl) countLbl.textContent = slotCount + ' / ' + SAVE_SLOTS_MAX + ' slots';
  for (let i = 1; i <= slotCount; i++) {
    const raw = localStorage.getItem(SAVE_KEY_PREFIX + i);
    const exists = !!raw;
    const btn = document.createElement('button');
    const slotName = exists ? (JSON.parse(raw)._name || '—') : '';
    const slotCal = exists ? (JSON.parse(raw)['t-cal'] || '') : '';
    btn.title = exists ? `${slotName} · ${slotCal ? slotCal+' kcal' : ''}` : 'Empty slot';
    btn.style.cssText = `background:${exists ? 'rgba(74,222,128,0.08)' : 'rgba(245,255,0,0.03)'};border:1px solid ${exists ? 'rgba(74,222,128,0.25)' : 'rgba(255,255,255,0.05)'};color:${exists ? '#4ade80' : '#333'};padding:8px 4px;font-family:'Bebas Neue',sans-serif;font-size:16px;cursor:pointer;border-radius:3px;transition:all .15s;text-align:center;overflow:hidden;`;
    btn.innerHTML = `<div style="font-size:14px;">${i}</div><div style="font-family:'Barlow',sans-serif;font-size:8px;letter-spacing:0.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%;padding:0 2px;color:${exists ? '#4ade80' : '#333'};">${exists ? slotName.slice(0,10) : 'EMPTY'}</div>`;
    btn.onclick = () => savePlan(i);
    grid.appendChild(btn);
  }
  // Render saved plans list
  const list = document.getElementById('saved-plans-list');
  const empty = document.getElementById('save-empty');
  if (!list) return;
  list.innerHTML = '';
  // Saved plans are always listed from ALL possible slots, so nothing
  // saved ever becomes invisible even if the visible slot count is reduced.
  let hasAny = false;
  for (let i = 1; i <= SAVE_SLOTS_MAX; i++) {
    const raw = localStorage.getItem(SAVE_KEY_PREFIX + i);
    if (!raw) continue;
    hasAny = true;
    let data;
    try { data = JSON.parse(raw); } catch(e) { continue; }
    const date = new Date(data.ts).toLocaleDateString('en-GB');
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;align-items:center;gap:12px;padding:12px 14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);margin-bottom:8px;border-radius:4px;';
    row.innerHTML = `
      <div style="width:32px;height:32px;background:rgba(245,255,0,0.1);border:1px solid rgba(245,255,0,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;color:#F5FF00;font-size:16px;flex-shrink:0;">${i}</div>
      <div style="flex:1;min-width:0;">
        <div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:14px;color:#e0e0e0;letter-spacing:1px;">${data._name || 'Unnamed Plan'}</div>
        <div style="font-size:10px;color:#444;margin-top:2px;">${date} · ${data['t-cal'] || '—'} kcal · ${data['c-goal'] || '—'}</div>
      </div>
      <button onclick="loadPlan(${i})" style="background:rgba(245,255,0,0.1);border:1px solid rgba(245,255,0,0.2);color:#F5FF00;padding:6px 14px;border-radius:4px;cursor:pointer;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:1px;">LOAD</button>
      <button onclick="deletePlan(${i})" style="background:rgba(248,113,113,0.08);border:1px solid rgba(248,113,113,0.2);color:#f87171;padding:6px 10px;border-radius:4px;cursor:pointer;font-size:13px;">✕</button>
    `;
    list.appendChild(row);
  }
  empty.style.display = hasAny ? 'none' : 'block';
}

// Close modal on backdrop click
document.getElementById('save-modal')?.addEventListener('click', function(e) {
  if (e.target === this) closeSaveModal();
});

// ══════════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════════
// 📅 SMART CARB CYCLING — 3-tier (H/M/L) + weekly schedule
// ══════════════════════════════════════════════════════════
// State: window._ccWeek is a 7-element array of 'H'|'M'|'L' for Sun..Sat
window._ccWeek = window._ccWeek || ['M','M','M','M','M','M','M'];

// Weekly presets (Sun,Mon,Tue,Wed,Thu,Fri,Sat)
const CC_PRESETS = {
  'fat-loss':    ['L','H','L','M','L','M','L'],   // 1H / 2M / 4L
  'muscle-gain': ['M','H','H','M','H','L','H'],   // 4H / 2M / 1L
  'recomp':      ['M','H','M','L','H','M','L'],   // 2H / 3M / 2L
  'maintenance': ['M','H','M','M','L','H','M']    // 2H / 4M / 1L
};
const CC_DAY_NAMES_SHORT    = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const CC_DAY_NAMES_SHORT_AR = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];

// g/kg body weight tables keyed by goal
const CC_PROT_PER_KG = { 'fat loss':2.2, 'muscle gain':1.8, 'recomp':2.0, 'body recomposition':2.0, 'maintenance':1.6 };
const CC_CARB_PER_KG = {
  // Fat loss: moderate on H (refeed), low on M, very low on L.
  // Total weekly carbs stay restricted — H day is a carb refeed, not a bulk day.
  'fat loss':        { H:3.0, M:1.8, L:0.8 },
  // Muscle gain: generous on H (training fuel), moderate M, light L.
  'muscle gain':     { H:6.0, M:4.0, L:2.5 },
  // Recomp: balanced spread.
  'recomp':          { H:4.0, M:2.5, L:1.3 },
  'body recomposition': { H:4.0, M:2.5, L:1.3 },
  // Maintenance: moderate spread.
  'maintenance':     { H:3.5, M:2.3, L:1.3 }
};
const CC_FAT_FLOOR_PER_KG = 0.6;

function ccShowTab(tier) {
  ['H','M','L'].forEach(t => {
    const tab = document.getElementById('cc-tab-' + t);
    const panel = document.getElementById('cc-panel-' + t);
    const isActive = t === tier;
    const color = t === 'H' ? '#4ade80' : t === 'M' ? '#00CFFF' : '#FF8C42';
    if (tab) {
      tab.style.borderBottomColor = isActive ? color : 'transparent';
      tab.style.color = isActive ? color : 'var(--muted)';
    }
    if (panel) panel.style.display = isActive ? 'block' : 'none';
  });
}

// Read macro targets with priority: Macro Lock panel first, then main targets card.
// The Lock panel is where macros are actively planned (with lock/rebalance logic),
// so it's the authoritative source. Main targets serve only as fallback.
// Returns { cal, prot, carbs, fats } with 0 for fields empty in both panels.
function ccReadMacroTargets() {
  const read = (lockId, mainId) => {
    const lock = parseFloat(document.getElementById(lockId)?.value);
    if (lock && !isNaN(lock) && lock > 0) return lock;
    const main = parseFloat(document.getElementById(mainId)?.value);
    if (main && !isNaN(main) && main > 0) return main;
    return 0;
  };
  return {
    cal:   read('ml-cal',   't-cal'),
    prot:  read('ml-prot',  't-prot'),
    carbs: read('ml-carbs', 't-carbs'),
    fats:  read('ml-fats',  't-fats')
  };
}

function ccPullFromMain() {
  // Pull from main targets OR macro-lock panel (whichever has values) into Medium tier
  const t = ccReadMacroTargets();
  const set = (id, v) => { const el = document.getElementById(id); if(el && v) el.value = v; };
  if (t.cal)   set('cc-M-cal',   t.cal);
  if (t.prot)  set('cc-M-prot',  t.prot);
  if (t.carbs) set('cc-M-carbs', t.carbs);
  if (t.fats)  set('cc-M-fats',  t.fats);
  ccSync();
  ccShowTab('M');
  const hasAny = t.cal || t.prot || t.carbs || t.fats;
  if (hasAny) {
    toast('Medium tier pulled from your targets ✓', 'success');
  } else {
    toast('⚠ No targets to pull — set calories/macros first', 'warning');
  }
}

function ccSmartFill() {
  // Goal detection (accepts Arabic + English variants)
  const goalRaw = (document.getElementById('c-goal')?.value || 'recomp').toLowerCase().trim();
  let goalKey = 'recomp';
  if (/fat.?loss|cut|lose|deficit|تنشيف|حرق|فقد|خسارة/i.test(goalRaw))        goalKey = 'fat loss';
  else if (/muscle.?gain|bulk|mass|grow|surplus|تضخيم|زيادة|بناء/i.test(goalRaw)) goalKey = 'muscle gain';
  else if (/recomp|body.?recomp|إعادة/i.test(goalRaw))                       goalKey = 'recomp';
  else if (/maint|ثبات|ثابت/i.test(goalRaw))                                 goalKey = 'maintenance';

  // Carb-cycling multipliers applied to the anchor carb value.
  // Protein and fat stay CONSTANT across all tiers — only carbs (and therefore
  // total calories) cycle. This matches how real carb cycling is prescribed
  // and means the Medium day matches the user's Lock panel exactly.
  const CC_CARB_MULT = {
    'fat loss':      { H: 1.30, M: 1.00, L: 0.55 },   // deep L-day drop for a cut
    'muscle gain':   { H: 1.40, M: 1.00, L: 0.75 },   // big H-day surplus, moderate L
    'recomp':        { H: 1.30, M: 1.00, L: 0.65 },
    'body recomposition': { H: 1.30, M: 1.00, L: 0.65 },
    'maintenance':   { H: 1.20, M: 1.00, L: 0.80 }
  };
  const mults = CC_CARB_MULT[goalKey] || CC_CARB_MULT['recomp'];

  const set = (id, v) => { const el = document.getElementById(id); if(el) el.value = v; };

  // ── PRIMARY PATH: pull anchor from the Macro Lock panel (or main targets as fallback) ──
  const targets = ccReadMacroTargets();
  const hasAnchor = targets.cal > 0 && targets.prot > 0 && targets.carbs > 0 && targets.fats > 0;

  if (hasAnchor) {
    // Medium tier = exact anchor values. Protein + fat held constant across tiers.
    // Only carbs cycle. Calories re-derived from resulting macros.
    const anchorProt = Math.round(targets.prot);
    const anchorFat  = Math.round(targets.fats);
    const anchorCarb = Math.round(targets.carbs);

    ['H','M','L'].forEach(tier => {
      const c = Math.round(anchorCarb * mults[tier]);
      const cal = Math.round(anchorProt*4 + c*4 + anchorFat*9);
      set(`cc-${tier}-cal`,   cal);
      set(`cc-${tier}-prot`,  anchorProt);
      set(`cc-${tier}-carbs`, c);
      set(`cc-${tier}-fats`,  anchorFat);
    });
    // Which panel did we read from?
    const source = (parseFloat(document.getElementById('ml-cal')?.value) > 0)
                   ? 'Macro Lock panel' : 'Daily Targets';
    toast(`✓ Filled from ${source} — carbs cycled for ${goalKey}`, 'success');
    ccSync();
    return;
  }

  // ── FALLBACK PATH: no macro targets available → use body weight × goal formulas ──
  const weight = parseFloat(document.getElementById('ib-weight')?.value) ||
                 parseFloat(document.getElementById('c-weight')?.value) || 0;

  if (weight >= 30 && weight <= 250) {
    const protPerKg = CC_PROT_PER_KG[goalKey] || 2.0;
    const prot = Math.round(weight * protPerKg);
    const carbs = CC_CARB_PER_KG[goalKey] || CC_CARB_PER_KG['recomp'];
    const fatFloor = Math.round(weight * CC_FAT_FLOOR_PER_KG);

    // Base calorie anchor from weight × goal-appropriate multiplier
    const bwMult = goalKey === 'fat loss'    ? 28
                 : goalKey === 'muscle gain' ? 38
                 : 33;
    const baseCal = Math.round(weight * bwMult);

    const tierMults = {
      'fat loss':     { H: 1.05, M: 1.00, L: 0.85 },
      'muscle gain':  { H: 1.10, M: 1.00, L: 0.95 },
      'recomp':       { H: 1.10, M: 1.00, L: 0.90 },
      'maintenance':  { H: 1.05, M: 1.00, L: 0.95 }
    };
    const cmults = tierMults[goalKey] || tierMults['recomp'];

    ['H','M','L'].forEach(tier => {
      const c = Math.round(weight * carbs[tier]);
      const tierCal = Math.round(baseCal * cmults[tier]);
      let fat = Math.round((tierCal - prot*4 - c*4) / 9);
      if (fat < fatFloor) fat = fatFloor;
      const finalCal = Math.round(prot*4 + c*4 + fat*9);
      set(`cc-${tier}-cal`,   finalCal);
      set(`cc-${tier}-prot`,  prot);
      set(`cc-${tier}-carbs`, c);
      set(`cc-${tier}-fats`,  fat);
    });
    toast(`⚠ No Lock panel data — estimated from ${weight}kg body weight`, 'warning');
    ccSync();
    return;
  }

  // ── LAST RESORT: no Lock panel AND no weight — ask user to fill something ──
  toast('⚠ Fill the Macro Lock panel or add body weight, then try again', 'warning');
}

function ccGetTierValues(tier) {
  const g = id => parseFloat(document.getElementById(id)?.value) || 0;
  return {
    cal:   g(`cc-${tier}-cal`),
    prot:  g(`cc-${tier}-prot`),
    carbs: g(`cc-${tier}-carbs`),
    fats:  g(`cc-${tier}-fats`)
  };
}

function ccSetTierValues(tier, v) {
  const set = (id, x) => { const el = document.getElementById(id); if(el) el.value = x; };
  set(`cc-${tier}-cal`,   v.cal);
  set(`cc-${tier}-prot`,  v.prot);
  set(`cc-${tier}-carbs`, v.carbs);
  set(`cc-${tier}-fats`,  v.fats);
}

// ── Carb cycling options + live deficit equation ──
window._ccOpts = (window._ccOpts && typeof window._ccOpts === 'object') ? window._ccOpts : { base: 'M', showKcal: false };

// Best available TDEE (maintenance kcal):
// Macro-generator TDEE input → window._tdee from the BMR calculator → its result box → daily target
function ccGetTDEE() {
  const smg = parseFloat(document.getElementById('smg-tdee-input')?.value);
  if (smg && smg > 0) return Math.round(smg);
  if (window._tdee && window._tdee > 0) return Math.round(window._tdee);
  const rt = parseFloat(document.getElementById('r-tdee')?.textContent);
  if (rt && rt > 0) return Math.round(rt);
  return parseFloat(document.getElementById('t-cal')?.value) || 0;
}

// Resolution of the comparison base for the equation strip
function ccGetEquationBase() {
  const mode = window._ccOpts.base || 'M';
  if (mode === 'targets') {
    const t = ccReadMacroTargets();
    return { ...t, label: { en: 'Main targets', ar: 'الأهداف الأساسية' } };
  }
  if (mode === 'tdee') {
    return { cal: ccGetTDEE(), prot: 0, carbs: 0, fats: 0, label: { en: 'TDEE (maintenance)', ar: 'TDEE (الثبات)' } };
  }
  const m = ccGetTierValues('M');
  return { ...m, label: { en: 'Medium day', ar: 'يوم Medium' } };
}

// Calories derived from macros first (falls back to the cal input when macros are empty)
// so the equation always adds up internally.
function ccTierCal(v) {
  const fromMacros = Math.round((v.prot || 0) * 4 + (v.carbs || 0) * 4 + (v.fats || 0) * 9);
  return (v.prot || v.carbs || v.fats) ? fromMacros : (v.cal || 0);
}

function ccRenderEquation() {
  const strip = document.getElementById('cc-equation-strip');
  if (!strip) return;
  const isEN = (window._lang === 'en');
  const dir = isEN ? 'ltr' : 'rtl';
  const base = ccGetEquationBase();
  const baseLbl = isEN ? base.label.en : base.label.ar;
  const T = { H: ccGetTierValues('H'), L: ccGetTierValues('L') };
  const baseCal = ccTierCal(base);
  const colors = { H: '#4ade80', L: '#FF8C42' };
  const icons  = { H: '🔥', L: '🧊' };

  const fmt = n => Math.round(n).toLocaleString('en-US');
  const sgn = n => (n >= 0 ? '+' : '−') + fmt(Math.abs(n));

  function tierRow(tier) {
    const v = T[tier];
    const vCal = ccTierCal(v);
    if (!vCal) {
      return `<div style="font-size:12px;color:var(--muted);margin-bottom:4px;">${icons[tier]} ${isEN ? 'Fill the ' + tier + ' day inputs to see its deficit/surplus' : 'املأ قيم يوم ' + tier + ' لظهور العجز/الزيادة'}</div>`;
    }
    const diff = baseCal ? vCal - baseCal : 0;
    const pct  = baseCal ? ` <span style="color:${diff >= 0 ? colors[tier] : colors[tier]};opacity:.8;">(${sgn(diff / baseCal * 100)}%)</span>` : '';
    let terms;
    if (base.carbs && v.carbs) {
      // Carb delta term is the headline — protein/fat deltas appended when they differ
      terms = isEN
        ? `(<b>${fmt(v.carbs)}</b>g − ${fmt(base.carbs)}g) × 4 kcal`
        : `(<b>${fmt(v.carbs)}</b>ج − ${fmt(base.carbs)}ج) × 4 كالوري`;
      const extras = [];
      if (base.prot && Math.round(v.prot - base.prot) !== 0) extras.push(`(${sgn(v.prot - base.prot)}g × 4)`);
      if (base.fats && Math.round(v.fats - base.fats) !== 0) extras.push(`(${sgn(v.fats - base.fats)}g × 9)`);
      if (extras.length) terms += ' ' + (isEN ? '+ ' : '') + extras.join(' + ');
      terms += ` = <span style="color:${diff >= 0 ? colors[tier] : colors[tier]};font-weight:700;">${sgn(diff)} kcal</span>${pct}`;
    } else if (baseCal) {
      terms = isEN ? `${fmt(vCal)} kcal − ${fmt(baseCal)} kcal = <span style="color:${colors[tier]};font-weight:700;">${sgn(diff)} kcal</span>${pct}`
                   : `${fmt(vCal)} كالوري − ${fmt(baseCal)} كالوري = <span style="color:${colors[tier]};font-weight:700;">${sgn(diff)} kcal</span>${pct}`;
    } else {
      terms = isEN ? 'Set a comparison base or TDEE first' : 'حدد أساس المقارنة أو TDEE أولاً';
    }
    const title = isEN
      ? `${icons[tier]} ${tier}-carb day vs ${baseLbl}:`
      : `${icons[tier]} يوم ${tier} مقابل ${baseLbl}:`;
    return `<div style="font-size:13px;color:#e8e8e8;direction:${dir};text-align:${isEN ? 'left' : 'right'};margin-bottom:5px;font-family:'Barlow',sans-serif;">${title}<br><span style="letter-spacing:.3px;">${terms}</span></div>`;
  }

  // Weekly net, weighted by how many of each day the schedule has
  let weekly = '';
  const week = window._ccWeek || [];
  if (week.length === 7) {
    const nH = week.filter(t => t === 'H').length;
    const nM = week.filter(t => t === 'M').length;
    const nL = week.filter(t => t === 'L').length;
    const vCal = t => ccTierCal(ccGetTierValues(t));
    const dH = baseCal ? vCal('H') - baseCal : 0;
    const dM = baseCal ? vCal('M') - baseCal : 0;
    const dL = baseCal ? vCal('L') - baseCal : 0;
    if (baseCal && (vCal('H') || vCal('M') || vCal('L'))) {
      const net = dH * nH + dM * nM + dL * nL;
      if (net !== 0) {
        const kg = Math.abs(net) / 7700;
        const kgLbl = isEN ? (net < 0 ? 'fat loss' : 'gain') + '/week' : (net < 0 ? 'خصم دهون' : 'زيادة') + ' أسبوعياً';
        weekly = `<div style="border-top:1px dashed rgba(255,255,255,0.08);margin-top:8px;padding-top:7px;font-size:11px;color:var(--muted);direction:${dir};text-align:${isEN
          ? 'left' : 'right'};">⚖️ ${isEN ? 'Weekly net' : 'صافي الأسبوع'} (${nH}H/${nM}M/${nL}L): <span style="color:${net < 0 ? '#4ade80' : '#FF8C42'};font-weight:700;">${sgn(net)} kcal/week</span> ≈ ${kg.toFixed(2)} kg ${kgLbl}</div>`;
      }
    }
  }

  strip.innerHTML =
    `<div style="font-size:10px;color:#00CFFF;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">🧮 ${isEN ? 'Deficit / Surplus Equation — vs ' + baseLbl : 'معادلة العجز / الزيادة — مقابل ' + baseLbl}</div>` +
    tierRow('H') + tierRow('L') + weekly;
  strip.style.display = 'block';
}

// ── Options handlers ──
function ccSetOptBase(v) {
  window._ccOpts.base = (v === 'targets' || v === 'tdee') ? v : 'M';
  ccSync();
}
function ccSetIntensity(level) {
  const multsMap = { gentle: { H: 1.15, L: 0.85 }, standard: { H: 1.30, L: 0.60 }, aggressive: { H: 1.45, L: 0.40 } };
  const mults = multsMap[level] || multsMap.standard;
  const M = ccGetTierValues('M');
  const t = ccReadMacroTargets();
  const anchorCarb = M.carbs || t.carbs || 0;
  if (!anchorCarb) { toast('⚠ Fill the Medium tier (or main targets) first', 'warning'); return; }
  const prot = M.prot || t.prot || 0;
  const fat  = M.fats || t.fats  || 0;
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
  ['H', 'L'].forEach(tier => {
    const c = Math.round(anchorCarb * mults[tier]);
    const cal = Math.round(prot * 4 + c * 4 + fat * 9);
    set(`cc-${tier}-cal`,   cal);
    set(`cc-${tier}-prot`,  prot);
    set(`cc-${tier}-carbs`, c);
    set(`cc-${tier}-fats`,  fat);
  });
  const isEN2 = (window._lang === 'en');
  const lbl = { gentle: isEN2 ? '🌤 Gentle' : '🌤 هادي', standard: isEN2 ? '📊 Standard' : '📊 عادية', aggressive: isEN2 ? '🔥 Aggressive' : '🔥 قوية' }[level] || level;
  toast(`✓ ${lbl} — H & L carbs set from Medium day`, 'success');
  ccSync();
}
function ccToggleDayKcal() {
  window._ccOpts.showKcal = !window._ccOpts.showKcal;
  const chip = document.getElementById('cc-opt-daykcal');
  if (chip) chip.textContent = (window._lang === 'en')
    ? '🔢 Per-day kcal: ' + (window._ccOpts.showKcal ? 'ON' : 'OFF')
    : '🔢 سعرات كل يوم: ' + (window._ccOpts.showKcal ? 'شغال' : 'مقفول');
  ccRenderWeek();
}
function ccLocalizeOptions() {
  const isEN = (window._lang === 'en');
  const bl = document.getElementById('cc-opt-base-label');
  if (bl) bl.textContent = isEN ? 'Compare vs' : 'قارن مع';
  const il = document.getElementById('cc-opt-intensity-label');
  if (il) il.textContent = isEN ? 'Intensity:' : 'الشدة:';
  const dk = document.getElementById('cc-opt-daykcal');
  if (dk) dk.textContent = isEN
    ? '🔢 Per-day kcal: ' + (window._ccOpts.showKcal ? 'ON' : 'OFF')
    : '🔢 سعرات كل يوم: ' + (window._ccOpts.showKcal ? 'شغال' : 'مقفول');
  const hint = document.getElementById('cc-opt-hint');
  if (hint) {
    hint.textContent = isEN
      ? 'Intensity presets set H & L carbs from your Medium day — protein & fat stay constant across tiers.'
      : 'أزرار الشدة بتحسب كارب يومي H و L من يوم Medium — البروتين والدهون ثابتين في كل الأيام.';
    hint.style.direction = isEN ? 'ltr' : 'rtl';
  }
  const sel = document.getElementById('cc-opt-base');
  if (sel) {
    const opts = sel.options;
    if (opts.length === 3) {
      opts[0].text = isEN ? '🔥/🧊 vs Medium day' : 'مقابل يوم Medium';
      opts[1].text = isEN ? 'vs Main targets' : 'مقابل الأهداف الأساسية';
      opts[2].text = isEN ? 'vs TDEE (maintenance)' : 'مقابل TDEE (الثبات)';
    }
  }
}

function ccApplyPreset(presetKey) {
  const preset = CC_PRESETS[presetKey];
  if (!preset) return;
  window._ccWeek = preset.slice();
  ccRenderWeek();
  ccSync();
  toast(`Preset applied: ${presetKey.replace('-',' ')}`, 'success');
}

function ccRenderWeek() {
  const grid = document.getElementById('cc-week-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const isEN = (window._lang === 'en');
  const dayLabels = isEN ? CC_DAY_NAMES_SHORT : CC_DAY_NAMES_SHORT_AR;

  // Localize heading + hint
  const headingEl = document.getElementById('cc-week-heading');
  const hintEl    = document.getElementById('cc-week-hint');
  if (headingEl) {
    headingEl.textContent = isEN ? 'Weekly Schedule' : 'الجدول الأسبوعي';
    headingEl.style.textTransform = isEN ? 'uppercase' : 'none';
    headingEl.style.direction = isEN ? 'ltr' : 'rtl';
  }
  if (hintEl) {
    hintEl.textContent = isEN
      ? 'Tap any day to cycle through H → M → L'
      : 'اضغط على أي يوم للتبديل بين H ← M ← L';
    hintEl.style.direction = isEN ? 'ltr' : 'rtl';
    hintEl.style.textAlign = isEN ? 'left' : 'right';
  }

  window._ccWeek.forEach((tier, i) => {
    const colors = { H:'#4ade80', M:'#00CFFF', L:'#FF8C42' };
    const bgColors = { H:'rgba(74,222,128,0.12)', M:'rgba(0,207,255,0.12)', L:'rgba(255,140,66,0.12)' };
    const cell = document.createElement('button');
    cell.className = 'cc-day-cell';
    cell.style.cssText = `padding:10px 6px;background:${bgColors[tier]};border:1px solid ${colors[tier]}40;border-radius:3px;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:3px;font-family:'Barlow Condensed',sans-serif;transition:all .15s;`;
    // For Arabic we drop uppercase (pointless on Arabic script) and tighten letter-spacing
    const dayStyle = isEN
      ? "font-size:9px;color:var(--muted);letter-spacing:1px;text-transform:uppercase;"
      : "font-size:11px;color:var(--muted);letter-spacing:0;font-family:'Barlow',sans-serif;direction:rtl;";
    cell.innerHTML = `
      <span style="${dayStyle}">${dayLabels[i]}</span>
      <span style="font-family:'Bebas Neue',sans-serif;font-size:20px;color:${colors[tier]};">${tier}</span>
      ${(() => {
        if (!(window._ccOpts && window._ccOpts.showKcal)) return '';
        const v = (typeof ccGetTierValues === 'function') ? ccGetTierValues(tier) : null;
        const k = v ? ((v.prot || v.carbs || v.fats)
          ? Math.round((v.prot||0)*4 + (v.carbs||0)*4 + (v.fats||0)*9)
          : (v.cal || 0)) : 0;
        return k ? `<span style="font-family:'Barlow Condensed',sans-serif;font-size:9px;color:var(--muted);letter-spacing:.5px;">≈${k.toLocaleString('en-US')}</span>` : '';
      })()}
    `;
    cell.onclick = () => {
      const order = ['H','M','L'];
      const next = order[(order.indexOf(window._ccWeek[i]) + 1) % 3];
      window._ccWeek[i] = next;
      ccRenderWeek();
      ccSync();
    };
    grid.appendChild(cell);
  });
}

function ccSync() {
  // Live equation strip + per-day kcal follow these inputs
  ccRenderEquation();
  ccLocalizeOptions();
  if (window._ccOpts && window._ccOpts.showKcal) ccRenderWeek();
  // Update the weekly summary based on tier values × weekly schedule
  const sums = { cal:0, prot:0, carbs:0, fats:0 };
  let filledDays = 0;
  window._ccWeek.forEach(tier => {
    const v = ccGetTierValues(tier);
    if (v.cal || v.carbs) {
      sums.cal += v.cal; sums.prot += v.prot;
      sums.carbs += v.carbs; sums.fats += v.fats;
      filledDays++;
    }
  });

  const sumEl = document.getElementById('cc-summary');
  if (!sumEl) return;

  if (filledDays === 0) { sumEl.style.display = 'none'; return; }
  sumEl.style.display = 'block';

  const avg = { cal: Math.round(sums.cal/7), prot: Math.round(sums.prot/7),
                carbs: Math.round(sums.carbs/7), fats: Math.round(sums.fats/7) };
  document.getElementById('cc-sum-cal').textContent  = avg.cal  || '—';
  document.getElementById('cc-sum-prot').textContent = (avg.prot  || '—') + (avg.prot  ? 'g' : '');
  document.getElementById('cc-sum-carb').textContent = (avg.carbs || '—') + (avg.carbs ? 'g' : '');
  document.getElementById('cc-sum-fat').textContent  = (avg.fats  || '—') + (avg.fats  ? 'g' : '');

  // Deficit / surplus vs TDEE (if available)
  const tdee = ccGetTDEE();
  const defEl = document.getElementById('cc-sum-deficit');
  if (defEl && tdee && avg.cal) {
    const dailyDiff = avg.cal - tdee;
    const weeklyDiff = dailyDiff * 7;
    const fatKg = Math.abs(weeklyDiff) / 7700;
    const dir = weeklyDiff < 0 ? 'deficit' : weeklyDiff > 0 ? 'surplus' : 'maintenance';
    const verb = weeklyDiff < 0 ? 'fat loss' : 'potential gain';
    defEl.innerHTML = weeklyDiff === 0
      ? `<span style="color:var(--muted);">Weekly maintenance — no kcal deficit/surplus</span>`
      : `<span style="color:${weeklyDiff<0?'#4ade80':'#FF8C42'};font-weight:600;">${dir === 'deficit' ? '–' : '+'}${Math.abs(Math.round(weeklyDiff))} kcal/week</span> <span style="color:var(--muted);">≈ ${fatKg.toFixed(2)} kg ${verb}/week</span>`;
  } else if (defEl) {
    defEl.textContent = '';
  }
}

// ── Carb Cycling: Variant Generator (scales carb foods for H and L tiers) ──
// CARB_FOOD_CATS: matches categories from the food DB where items are primarily carb sources.
// Foods in these categories get scaled; protein/fat/dairy/veg foods stay as-is.
const CC_CARB_FOOD_CATS = [
  'فواكه', 'نشويات', 'كربوهيدرات', 'حبوب',
  'Fruits', 'Starches', 'Carbs', 'Grains',
  'Carbohydrates'
];
const CC_CARB_FOOD_NAME_PATTERNS = [
  /أرز|رز/i, /شوفان/i, /خبز|toast/i, /بطاط/i, /معكرونة|باستا|pasta/i,
  /برغل|كسكس/i, /فريكة/i, /كورنفل/i, /حبوب.*فطور/i, /granola/i,
  /rice|oats|bread|potato|sweet.?potato/i, /banana|موز/i, /date|تمر/i,
  /honey|عسل/i, /maple|شراب/i, /fruit/i
];

function ccIsCarbFood(row) {
  // Determine if a food row is primarily a carb source (to scale).
  // Uses dataset (category + name), with fallback to macro ratio check.
  const cat = (row.dataset.foodCat || row.dataset.foodCatEn || '').toString();
  const name = (row.dataset.foodName || row.dataset.foodNameEn || '').toString();

  // Category match
  for (const c of CC_CARB_FOOD_CATS) {
    if (cat.includes(c)) return true;
  }
  // Name pattern match (catches things mislabeled by category)
  for (const rx of CC_CARB_FOOD_NAME_PATTERNS) {
    if (rx.test(name)) return true;
  }
  // Macro ratio fallback: if carbs provide >55% of calories, treat as carb food
  const cal  = parseFloat(row.dataset.foodCal)  || 0;
  const carb = parseFloat(row.dataset.foodCarb) || 0;
  if (cal > 0 && (carb * 4 / cal) > 0.55) return true;
  return false;
}

// Compute the carb-food scale factor for a given target tier vs the base (Medium).
// Returns a number (e.g. 1.4 for High, 0.6 for Low) or 1 if no cycling configured.
function ccGetTierScale(tier) {
  const base = ccGetTierValues('M');
  const target = ccGetTierValues(tier);
  if (!base || !target) return 1;
  if (base.carbs && target.carbs) return target.carbs / base.carbs;
  // Fallback: derive the ratio from per-day calories when carbs are missing
  // on either side (protein & fat stay constant, so kcal ratio ≈ carb ratio).
  const bc = ccTierCal(base), tc = ccTierCal(target);
  if (bc > 0 && tc > 0) return Math.max(0.2, Math.min(3, tc / bc));
  return 1;
}

// ── Build a tier variant snapshot of all meal rows ──
// Returns a structure: { mealId: { optN: [ { food, qty, qtyUnit, isCarb, cal, prot, carb, fat, scaled_qty }, ... ] } }
// `scaled_qty` is the tier-adjusted gram/piece count rounded to sensible precision.
function ccBuildTierSnapshot(tier, isENexport) {
  if (!window.MEALS_DEF || !window.OPTS_DEF) return {};
  const scale = ccGetTierScale(tier);
  const snap = {};
  MEALS_DEF.forEach(m => {
    snap[m.id] = {};
    OPTS_DEF.forEach(o => {
      const rowsEl = document.getElementById('rows-' + m.id + '-' + o.n);
      if (!rowsEl) { snap[m.id][o.n] = []; return; }
      const rows = [...rowsEl.querySelectorAll('.food-row')];
      const items = [];
      rows.forEach(row => {
        const food = row.querySelector('.food-search')?.value?.trim();
        if (!food) return;
        const unit   = row.dataset.foodUnit   || '';
        const unitEn = row.dataset.foodUnitEn || unit;
        const unitG  = parseFloat(row.dataset.foodUnitG)  || 0;
        const sliceG = parseFloat(row.dataset.foodSliceG) || 0;
        const qtyRaw = parseFloat(row.querySelector('.food-qty-input')?.value) || 0;
        const cal_r  = parseFloat(row.dataset.foodCal)  || 0;
        const prot_r = parseFloat(row.dataset.foodProt) || 0;
        const carb_r = parseFloat(row.dataset.foodCarb) || 0;
        const fat_r  = parseFloat(row.dataset.foodFat)  || 0;
        const isCarb = ccIsCarbFood(row);

        // Apply scale only to carb-source foods
        const s = isCarb ? scale : 1;
        let scaledQty = qtyRaw * s;
        // Sensible rounding: piece-based → nearest 0.25; grams → nearest 5g (if >20g) else 1g
        if (unit && unitG) {
          scaledQty = Math.max(0, Math.round(scaledQty * 4) / 4);
          if (scaledQty < 0.25 && qtyRaw > 0) scaledQty = 0;  // drop if scaled to nothing
        } else {
          if (scaledQty >= 20) scaledQty = Math.round(scaledQty / 5) * 5;
          else                 scaledQty = Math.round(scaledQty);
          if (scaledQty < 5 && qtyRaw > 0 && scale < 1) scaledQty = 0; // drop tiny portions on low days
        }

        // Format qty string for display/export
        const isEN = !!isENexport;
        const gramSuffix = isEN ? 'g' : 'غ';
        let qtyStr = '';
        if (scaledQty > 0) {
          if (unit && unitG) {
            const unitLbl = isEN ? unitEn : unit;
            qtyStr = `${scaledQty} ${unitLbl}`;
          } else if (sliceG) {
            const slices = Math.round((scaledQty / sliceG) * 4) / 4;
            const sliceWord = isEN ? (slices === 1 ? 'slice' : 'slices') : 'شريحة';
            qtyStr = `${scaledQty}${gramSuffix} (${slices} ${sliceWord})`;
          } else {
            qtyStr = `${scaledQty}${gramSuffix}`;
          }
        }

        // Macro totals at this scaled qty
        let macroScale = 0;
        if (unit && unitG && scaledQty > 0)  macroScale = (scaledQty * unitG) / 100;
        else if (scaledQty > 0)              macroScale = scaledQty / 100;

        items.push({
          food,
          qty: qtyStr,
          scaledQty,
          isCarb,
          scaleApplied: s,
          cal:  Math.round(cal_r  * macroScale),
          prot: +(prot_r * macroScale).toFixed(1),
          carb: +(carb_r * macroScale).toFixed(1),
          fat:  +(fat_r  * macroScale).toFixed(1)
        });
      });
      // Filter out dropped rows
      snap[m.id][o.n] = items.filter(it => it.scaledQty > 0);
    });
  });
  return snap;
}

// Get which tiers the user wants exported (reads checkboxes in export dialog)
function ccGetSelectedExportTiers() {
  const tiers = [];
  ['H','M','L'].forEach(t => {
    const el = document.getElementById('cc-export-tier-' + t);
    if (el && el.checked) tiers.push(t);
  });
  return tiers;
}

// Is carb cycling actually configured? (any tier has non-zero macros)
function ccIsConfigured() {
  const keys = ['cal','prot','carbs','fats'];
  return ['H','M','L'].some(t => keys.some(k => {
    const v = parseFloat(document.getElementById(`cc-${t}-${k}`)?.value);
    return v && v > 0;
  }));
}
