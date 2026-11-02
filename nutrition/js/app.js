// ═══════════════════════════════════════════════════════════════
// APP STATE & CONSTANTS
// ═══════════════════════════════════════════════════════════════
const MEALS_DEF = [
  {id:'m1',icon:'🌅',label:'الوجبة الأولى',sub:'وجبة الصباح'},
  {id:'m2',icon:'🥪',label:'الوجبة الثانية',sub:'وجبة خفيفة صباحية'},
  {id:'m3',icon:'🍽',label:'الوجبة الثالثة',sub:'الوجبة الرئيسية'},
  {id:'m4',icon:'⚡',label:'الوجبة الرابعة',sub:'ما قبل التمرين'},
  {id:'m5',icon:'💪',label:'الوجبة الخامسة',sub:'ما بعد التمرين'},
  {id:'m6',icon:'🌙',label:'الوجبة السادسة',sub:'وجبة المساء'},
];
const OPTS_DEF = [
  {n:1,label:'الخيار الأول ١'},
  {n:2,label:'الخيار الثاني ٢'},
  {n:3,label:'الخيار الثالث ٣'},
];
// Expose to window so all window.MEALS_DEF / window.OPTS_DEF guards work
window.MEALS_DEF = MEALS_DEF;
window.OPTS_DEF  = OPTS_DEF;

// ═══════════════════════════════════════════════════════════
// 🌐  LANGUAGE SYSTEM  (AR ↔ EN)
// ═══════════════════════════════════════════════════════════
window._lang = 'ar'; // default

const LANG = {
  ar: {
    meals: [
      {label:'الوجبة الأولى',   sub:'وجبة الصباح'},
      {label:'الوجبة الثانية',  sub:'وجبة خفيفة صباحية'},
      {label:'الوجبة الثالثة',  sub:'الوجبة الرئيسية'},
      {label:'الوجبة الرابعة',  sub:'ما قبل التمرين'},
      {label:'الوجبة الخامسة',  sub:'ما بعد التمرين'},
      {label:'الوجبة السادسة',  sub:'وجبة المساء'},
    ],
    opts: ['الخيار الأول ١','الخيار الثاني ٢','الخيار الثالث ٣'],
    optLabelsExport: {1:'الخيار الأول  ١', 2:'الخيار الثاني  ٢', 3:'الخيار الثالث  ٣'},
    grandTotal:   'إجمالي كل الوجبات',
    mealTotal:    '📊 إجمالي الوجبة',
    addComponent: '+ إضافة مكون',
    emptyHint:    'أضف مكونات لحساب الإجمالي',
    search:       'ابحث في قاعدة البيانات...',
    gramLabel:    'غرام',
    spoonLabel:   'ملعقة',
    cal:'سعرات', prot:'بروتين', carb:'كربوهيدرات', fat:'دهون',
    calUnit:'kcal', protUnit:'غ', carbUnit:'غ', fatUnit:'غ',
    pctCal:'سعرات', pctProt:'بروتين', pctCarb:'كارب', pctFat:'دهون',
    gtCal:'سعرات', gtProt:'بروتين', gtCarb:'كارب', gtFat:'دهون',
    complete:'✅ مكتمل', over:'⚠️ زيادة', under:'🔻 ناقص', targets:'حدد الأهداف أولاً',
    freeMeal: 'وجبة حرة',
    pageTitle:'Meal Plan', pageSub:'3 options per meal — Arabic RTL',
    exportColFood:'اسم المكون', exportColQty:'الكمية', exportColSpoon:'ملاعق',
    exportHeaderLine:'PERSONALISED NUTRITION PLAN  |  MADE BY ',
    editHint:'✏️',
    direction:'rtl',
  },
  en: {
    meals: [
      {label:'Meal 1',   sub:'Morning Meal'},
      {label:'Meal 2',   sub:'Morning Snack'},
      {label:'Meal 3',   sub:'Main Meal'},
      {label:'Meal 4',   sub:'Pre-Workout'},
      {label:'Meal 5',   sub:'Post-Workout'},
      {label:'Meal 6',   sub:'Evening Meal'},
    ],
    opts: ['Option 1','Option 2','Option 3'],
    optLabelsExport: {1:'Option 1', 2:'Option 2', 3:'Option 3'},
    grandTotal:   'All Meals Total',
    mealTotal:    '📊 Meal Total',
    addComponent: '+ Add Food',
    emptyHint:    'Add foods to calculate totals',
    search:       'Search food database...',
    gramLabel:    'grams',
    spoonLabel:   'spoons',
    cal:'Calories', prot:'Protein', carb:'Carbs', fat:'Fat',
    calUnit:'kcal', protUnit:'g', carbUnit:'g', fatUnit:'g',
    pctCal:'Cal', pctProt:'Prot', pctCarb:'Carbs', pctFat:'Fat',
    gtCal:'Calories', gtProt:'Protein', gtCarb:'Carbs', gtFat:'Fat',
    complete:'✅ Complete', over:'⚠️ Over by', under:'🔻 Under by', targets:'Set targets first',
    freeMeal: 'Free Meal',
    pageTitle:'Meal Plan', pageSub:'3 options per meal',
    exportColFood:'Food Item', exportColQty:'Quantity', exportColSpoon:'Spoons',
    exportHeaderLine:'PERSONALISED NUTRITION PLAN  |  MADE BY ',
    editHint:'✏️',
    direction:'ltr',
  }
};

function toggleLanguage() {
  window._lang = (window._lang === 'ar') ? 'en' : 'ar';
  const btn = document.getElementById('lang-toggle-btn');
  if (btn) btn.textContent = window._lang === 'ar' ? '🌐 AR' : '🌐 EN';
  applyLanguage();
}

function applyLanguage() {
  const L = LANG[window._lang];
  const isEN = window._lang === 'en';

  // 1. Update OPTS_DEF labels (used in new meal blocks)
  OPTS_DEF[0].label = L.opts[0];
  OPTS_DEF[1].label = L.opts[1];
  OPTS_DEF[2].label = L.opts[2];

  // 2. Update MEALS_DEF defaults (for new clients / reset)
  MEALS_DEF.forEach((m,i) => {
    if (!window._mealNames?.[m.id]) { // only if not customised
      m.label = L.meals[i].label;
      m.sub   = L.meals[i].sub;
    }
  });

  // 3. Update existing meal blocks in DOM
  MEALS_DEF.forEach((m, i) => {
    const block = document.getElementById('block-'+m.id);
    if (!block) return;

    // meal name input (only if not user-customised)
    const nameInp = document.getElementById('meal-name-input-'+m.id);
    if (nameInp && !window._mealNames?.[m.id]) {
      nameInp.value = L.meals[i].label;
    }
    // meal sub (input — skip if the user customised it)
    const subEl = document.getElementById('meal-sub-input-'+m.id);
    if (subEl && !window._mealNameSubs?.[m.id]) subEl.value = L.meals[i].sub;

    // option tabs
    block.querySelectorAll('.opt-tab').forEach((tab, ti) => {
      tab.textContent = L.opts[ti] || tab.textContent;
    });

    // Per option: labels inside panels
    OPTS_DEF.forEach(o => {
      const z = document.getElementById('totals-zero-'+m.id+'-'+o.n);
      if (z) z.textContent = L.emptyHint;

      const tLabel = block.querySelector(`#totals-${m.id}-${o.n} .meal-totals-label`);
      if (tLabel) tLabel.textContent = L.mealTotal;

      // mt-lbl cells
      const mtCells = block.querySelectorAll(`#totals-${m.id}-${o.n} .mt-cell`);
      const labels  = [L.cal, L.prot, L.carb, L.fat];
      const units   = [L.calUnit, L.protUnit, L.carbUnit, L.fatUnit];
      mtCells.forEach((cell, ci) => {
        const lbl  = cell.querySelector('.mt-lbl');
        const unit = cell.querySelector('.mt-unit');
        if (lbl)  lbl.textContent  = labels[ci]  || lbl.textContent;
        if (unit) unit.textContent = units[ci]    || unit.textContent;
      });

      // Add-food button
      const addBtn = document.getElementById('opt-'+m.id+'-'+o.n)?.querySelector('.add-food-btn');
      if (addBtn) addBtn.textContent = L.addComponent;

      // Food rows in this option
      const rows = document.querySelectorAll(`#rows-${m.id}-${o.n} .food-row`);
      const isEN = (window._lang === 'en');
      rows.forEach(row => {
        const qtyLbl  = row.querySelector('.food-qty-label');
        const tbspLbl = row.querySelector('.food-tbsp-wrap .food-qty-label');
        const search  = row.querySelector('.food-search');
        if (search)  search.placeholder = L.search;
        // qty label: respect piece-based foods (banana = موزة/banana, egg = بيضة/egg, etc.)
        const foodUnit   = row.dataset.foodUnit   || '';
        const foodUnitEn = row.dataset.foodUnitEn || foodUnit;
        const sliceG     = parseFloat(row.dataset.foodSliceG) || 0;
        if (row.dataset.foodLiq === '1') {
          // liquid rows: re-render the لتر/كوب toggle chips in the new language
          ogLiqRenderLabel(row);
        } else if (qtyLbl) {
          if (foodUnit) {
            qtyLbl.textContent = isEN ? foodUnitEn : foodUnit;
          } else {
            qtyLbl.textContent = L.gramLabel;
          }
        }
        // secondary label: "slices" for slice-based foods, else "spoons"
        if (tbspLbl) {
          if (sliceG) {
            tbspLbl.textContent = isEN ? 'slices' : 'شريحة';
          } else {
            tbspLbl.textContent = L.spoonLabel;
          }
        }
      });
    });

    // Percentage badges
    const pctLabels = [L.pctCal, L.pctProt, L.pctCarb, L.pctFat];
    block.querySelectorAll('.meal-pct-lbl').forEach((el, i) => {
      el.textContent = pctLabels[i] || el.textContent;
    });
  });

  // 4. Grand total bar labels
  const gtRow = document.querySelector('#grand-total-bar');
  if (gtRow) {
    const hdr = gtRow.querySelector('span:first-child');
    if (hdr) hdr.textContent = L.grandTotal;
    // sub-labels under the numbers
    const gtDefs = [
      {lbl:'gt-cal-target',  txt: L.gtCal  + ' / '},
      {lbl:'gt-prot-target', txt: L.gtProt + ' / '},
      {lbl:'gt-carb-target', txt: L.gtCarb + ' / '},
      {lbl:'gt-fat-target',  txt: L.gtFat  + ' / '},
    ];
    // Replace label text nodes before target spans
    gtRow.querySelectorAll('.gt-cell').forEach((cell, ci) => {
      const smallDiv = cell.querySelector('div:nth-child(2)');
      if (!smallDiv) return;
      // Find the text node (before the target span) and update it
      for (const node of smallDiv.childNodes) {
        if (node.nodeType === 3 && node.textContent.trim()) {
          node.textContent = [L.gtCal,L.gtProt,L.gtCarb,L.gtFat][ci] + ' / ';
          break;
        }
      }
    });
  }

  // 5. Update page title/sub
  const pg = document.getElementById('page-meals');
  if (pg) {
    const sub = pg.querySelector('.sec-sub');
    if (sub) sub.textContent = L.pageSub;
  }

  // 6. Update status label if visible
  const statusEl = document.getElementById('gt-status-label');
  if (statusEl && statusEl.textContent && statusEl.textContent !== '—') {
    updateGrandTotal(); // recalc will use current lang
  }

  // 7. Rebuild grand-total bar text
  updateGrandTotal();
  syncPreview();
  // 8. Re-render carb cycling weekly grid with new language day names
  if (typeof ccRenderWeek === 'function') ccRenderWeek();
}

// Override updateGrandTotal status label to use current language
const _origUpdateGrandTotal = window.updateGrandTotal;
// (patched inline — status text uses L.complete / L.over / L.under)
function showPage(id){
  // Any accidental outer-document scroll (e.g. from focus/scrollIntoView)
  // must never shift the app layout — snap back to the top.
  document.documentElement.scrollTop=0;
  document.body.scrollTop=0;
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  document.getElementById('page-'+id).classList.add('active');
  document.querySelector('[data-page="'+id+'"]')?.classList.add('active');
  if(id==='preview')buildPreview();
  if(id==='grocery')groceryRender();
  if(id==='supplements'){suppRenderCatalog();suppTimelineRender();}
  if(id==='meals')recentBarRender();
  if(id==='progress')progRender();
  if(id==='templates')tplRender();
  // Close drawer on mobile after nav tap
  const sb=document.getElementById('sidebar');
  const ov=document.getElementById('sidebar-overlay');
  if(sb&&sb.classList.contains('open')){sb.classList.remove('open');ov.classList.remove('show');}
}

// ─── ARABIC FOOD DATABASE (300+ items) ───────────────────────
// All values per 100g unless noted: {cal, prot, carb, fat}
const FOOD_DB=[

  // ══════════════════════════════════════════════════════════
  // 🥩 بروتينات — دواجن
  // ══════════════════════════════════════════════════════════
  {ar:'صدور دجاج مشوية',             cat:'دواجن', en:'Grilled Chicken Breast', catEn:'Poultry', cal:165, prot:31,  carb:0,   fat:3.6, sliceG:60},
  {ar:'صدر دجاج مشوي (بدون جلد)',    cat:'دواجن', en:'Grilled Chicken Breast (no skin)', catEn:'Poultry', cal:165, prot:31,  carb:0,   fat:3.6, sliceG:60},
  {ar:'صدر دجاج مسلوق',              cat:'دواجن', en:'Boiled Chicken Breast', catEn:'Poultry', cal:150, prot:30,  carb:0,   fat:2.5, sliceG:60},
  {ar:'صدر دجاج على البخار',         cat:'دواجن', en:'Steamed Chicken Breast', catEn:'Poultry', cal:147, prot:29,  carb:0,   fat:2.4, sliceG:60},
  {ar:'فخذ دجاج مشوي (بدون جلد)',   cat:'دواجن', en:'Grilled Chicken Thigh (no skin)', catEn:'Poultry', cal:172, prot:24,  carb:0,   fat:8},
  {ar:'فخذ دجاج مسلوق (بدون جلد)',  cat:'دواجن', en:'Boiled Chicken Thigh (no skin)', catEn:'Poultry', cal:155, prot:22,  carb:0,   fat:7},
  {ar:'دجاج كامل مشوي (بدون جلد)',  cat:'دواجن', en:'Whole Grilled Chicken (no skin)', catEn:'Poultry', cal:190, prot:27,  carb:0,   fat:9},
  {ar:'صدر دجاج مفروم مشوي',        cat:'دواجن', en:'Grilled Ground Chicken', catEn:'Poultry', cal:148, prot:28,  carb:0,   fat:4},
  {ar:'كبدة دجاج مشوية',            cat:'دواجن', en:'Grilled Chicken Liver', catEn:'Poultry', cal:172, prot:27,  carb:1,   fat:6},
  {ar:'قانصة دجاج مسلوقة',          cat:'دواجن', en:'Boiled Chicken Gizzard', catEn:'Poultry', cal:154, prot:26,  carb:0,   fat:5},
  {ar:'صدر ديك رومي مشوي',          cat:'دواجن', en:'Grilled Turkey Breast', catEn:'Poultry', cal:135, prot:30,  carb:0,   fat:1},
  {ar:'فخذ ديك رومي مشوي',          cat:'دواجن', en:'Grilled Turkey Thigh', catEn:'Poultry', cal:174, prot:26,  carb:0,   fat:7},
  {ar:'ديك رومي مفروم مشوي',        cat:'دواجن', en:'Grilled Ground Turkey', catEn:'Poultry', cal:149, prot:22,  carb:0,   fat:6},
  {ar:'صدر بط مشوي (بدون جلد)',     cat:'دواجن', en:'Grilled Duck Breast (no skin)', catEn:'Poultry', cal:201, prot:23,  carb:0,   fat:11},
  {ar:'دراع دجاج مشوي (بدون جلد)', cat:'دواجن', en:'Grilled Chicken Drumstick (no skin)', catEn:'Poultry', cal:179, prot:25,  carb:0,   fat:8},

  // ══════════════════════════════════════════════════════════
  // 🥩 بروتينات — لحوم حمراء
  // ══════════════════════════════════════════════════════════
  {ar:'لحم أحمر مشوي',               cat:'لحوم حمراء', en:'Grilled Red Meat', catEn:'Red Meat', cal:195, prot:27,  carb:0,   fat:9},
  {ar:'كبدة مشوية',                  cat:'لحوم حمراء', en:'Grilled Liver', catEn:'Red Meat', cal:180, prot:28,  carb:3,   fat:6},
  {ar:'لحم بقري مفروم (95% خالي دهن)',cat:'لحوم حمراء', en:'Ground Beef 95% Lean', catEn:'Red Meat', cal:152, prot:26,  carb:0,   fat:5},
  {ar:'لحم بقري مفروم (90% خالي دهن)',cat:'لحوم حمراء', en:'Ground Beef 90% Lean', catEn:'Red Meat', cal:176, prot:26,  carb:0,   fat:8},
  {ar:'لحم بقري مفروم (80% خالي دهن)',cat:'لحوم حمراء', en:'Ground Beef 80% Lean', catEn:'Red Meat', cal:215, prot:24,  carb:0,   fat:13},
  {ar:'ستيك سيرلوين مشوي',           cat:'لحوم حمراء', en:'Grilled Sirloin Steak', catEn:'Red Meat', cal:207, prot:27,  carb:0,   fat:10},
  {ar:'ستيك فيليه مشوي',             cat:'لحوم حمراء', en:'Grilled Filet Steak', catEn:'Red Meat', cal:192, prot:28,  carb:0,   fat:8},
  {ar:'ستيك ريب آي مشوي',            cat:'لحوم حمراء', en:'Grilled Ribeye Steak', catEn:'Red Meat', cal:291, prot:24,  carb:0,   fat:21},
  {ar:'لحم بقري برازولا (مشوي جاف)', cat:'لحوم حمراء', en:'Bresaola (Dry Cured Beef)', catEn:'Red Meat', cal:151, prot:29,  carb:0,   fat:3},
  {ar:'لحم عجل مشوي (فيليه)',        cat:'لحوم حمراء', en:'Grilled Veal Fillet', catEn:'Red Meat', cal:172, prot:30,  carb:0,   fat:5},
  {ar:'لحم بقري مسلوق (صدر)',        cat:'لحوم حمراء', en:'Boiled Beef Brisket', catEn:'Red Meat', cal:230, prot:26,  carb:0,   fat:14},
  {ar:'لحم غنم فخذ مشوي',            cat:'لحوم حمراء', en:'Grilled Lamb Leg', catEn:'Red Meat', cal:231, prot:28,  carb:0,   fat:13},
  {ar:'لحم غنم كتف مشوي',            cat:'لحوم حمراء', en:'Grilled Lamb Shoulder', catEn:'Red Meat', cal:258, prot:25,  carb:0,   fat:17},
  {ar:'لحم غنم مفروم مشوي',          cat:'لحوم حمراء', en:'Grilled Ground Lamb', catEn:'Red Meat', cal:260, prot:24,  carb:0,   fat:18},
  {ar:'لحم ضأن ريش مشوي',            cat:'لحوم حمراء', en:'لحم ضأن ريش مشوي', catEn:'Red Meat', cal:294, prot:24,  carb:0,   fat:21},
  {ar:'لحم جمل مشوي',                cat:'لحوم حمراء', en:'لحم جمل مشوي', catEn:'Red Meat', cal:160, prot:27,  carb:0,   fat:5},
  {ar:'كبدة بقري مشوية',             cat:'لحوم حمراء', en:'كبدة بقري مشوية', catEn:'Red Meat', cal:191, prot:29,  carb:5,   fat:5},
  {ar:'كبدة غنم مشوية',              cat:'لحوم حمراء', en:'كبدة غنم مشوية', catEn:'Red Meat', cal:193, prot:30,  carb:3,   fat:7},
  {ar:'قلب بقري مشوي',               cat:'لحوم حمراء', en:'قلب بقري مشوي', catEn:'Red Meat', cal:175, prot:29,  carb:0.1, fat:6},
  {ar:'لسان بقري مسلوق',             cat:'لحوم حمراء', en:'لسان بقري مسلوق', catEn:'Red Meat', cal:284, prot:23,  carb:0,   fat:20},
  {ar:'لحم بقري مجفف (بيف جيركي)',  cat:'لحوم حمراء', en:'لحم بقري مجفف (بيف جيركي)', catEn:'Red Meat', cal:300, prot:33,  carb:11,  fat:12},

  // ══════════════════════════════════════════════════════════
  // 🐟 بروتينات — أسماك وبحريات
  // ══════════════════════════════════════════════════════════
  {ar:'سمك مشوي',                    cat:'أسماك وبحريات', en:'Grilled Fish', catEn:'Fish & Seafood', cal:145, prot:27,  carb:0,   fat:3.5},
  {ar:'سمك سلمون مشوي',              cat:'أسماك وبحريات', en:'سمك سلمون مشوي', catEn:'Fish & Seafood', cal:208, prot:25,  carb:0,   fat:12},
  {ar:'سمك سلمون مسلوق',             cat:'أسماك وبحريات', en:'سمك سلمون مسلوق', catEn:'Fish & Seafood', cal:195, prot:27,  carb:0,   fat:9},
  {ar:'سمك تونة طازج مشوي',          cat:'أسماك وبحريات', en:'سمك تونة طازج مشوي', catEn:'Fish & Seafood', cal:184, prot:30,  carb:0,   fat:6},
  {ar:'سمك تونة (علبة بالماء)',       cat:'أسماك وبحريات', en:'سمك تونة (علبة بالماء)', catEn:'Fish & Seafood', cal:116, prot:26,  carb:0,   fat:1},
  {ar:'سمك تونة (علبة بالزيت مصفاة)',cat:'أسماك وبحريات', en:'سمك تونة (علبة بالزيت مصفاة)', catEn:'Fish & Seafood', cal:198, prot:29,  carb:0,   fat:9},
  {ar:'سمك بلطي / تيلابيا مشوي',    cat:'أسماك وبحريات', en:'سمك بلطي / تيلابيا مشوي', catEn:'Fish & Seafood', cal:128, prot:26,  carb:0,   fat:2.7},
  {ar:'سمك دنيس مشوي',               cat:'أسماك وبحريات', en:'سمك دنيس مشوي', catEn:'Fish & Seafood', cal:146, prot:29,  carb:0,   fat:3},
  {ar:'سمك قاروص مشوي',              cat:'أسماك وبحريات', en:'سمك قاروص مشوي', catEn:'Fish & Seafood', cal:136, prot:28,  carb:0,   fat:2.5},
  {ar:'سمك الهامور مشوي',            cat:'أسماك وبحريات', en:'سمك الهامور مشوي', catEn:'Fish & Seafood', cal:143, prot:28,  carb:0,   fat:3},
  {ar:'سمك بوري مشوي',               cat:'أسماك وبحريات', en:'سمك بوري مشوي', catEn:'Fish & Seafood', cal:176, prot:26,  carb:0,   fat:7},
  {ar:'سمك أبو سيف مشوي',            cat:'أسماك وبحريات', en:'سمك أبو سيف مشوي', catEn:'Fish & Seafood', cal:172, prot:28,  carb:0,   fat:6},
  {ar:'سمك المكريل (إسقمري) مشوي',  cat:'أسماك وبحريات', en:'سمك المكريل (إسقمري) مشوي', catEn:'Fish & Seafood', cal:239, prot:24,  carb:0,   fat:15},
  {ar:'سمك الهيك مشوي',              cat:'أسماك وبحريات', en:'سمك الهيك مشوي', catEn:'Fish & Seafood', cal:113, prot:23,  carb:0,   fat:2},
  {ar:'سمك أنشوفة (معلبة بالزيت)',  cat:'أسماك وبحريات', en:'سمك أنشوفة (معلبة بالزيت)', catEn:'Fish & Seafood', cal:210, prot:29,  carb:0,   fat:10},
  {ar:'سمك الكبريتو (صنّار) مشوي',  cat:'أسماك وبحريات', en:'سمك الكبريتو (صنّار) مشوي', catEn:'Fish & Seafood', cal:138, prot:28,  carb:0,   fat:3},
  {ar:'سمك السردين مشوي',            cat:'أسماك وبحريات', en:'سمك السردين مشوي', catEn:'Fish & Seafood', cal:208, prot:25,  carb:0,   fat:11},
  {ar:'سمك السردين (معلب بالماء)',   cat:'أسماك وبحريات', en:'Canned Sardines in Water', catEn:'Fish & Seafood', cal:136, prot:24,  carb:0,   fat:4},
  {ar:'روبيان مسلوق',                cat:'أسماك وبحريات', en:'روبيان مسلوق', catEn:'Fish & Seafood', cal:99,  prot:24,  carb:0,   fat:0.3},
  {ar:'روبيان مشوي على الفحم',       cat:'أسماك وبحريات', en:'روبيان مشوي على الفحم', catEn:'Fish & Seafood', cal:112, prot:24,  carb:1,   fat:1.5},
  {ar:'كابوريا مسلوقة',              cat:'أسماك وبحريات', en:'كابوريا مسلوقة', catEn:'Fish & Seafood', cal:97,  prot:19,  carb:0,   fat:2},
  {ar:'جمبري تايجر مشوي',            cat:'أسماك وبحريات', en:'جمبري تايجر مشوي', catEn:'Fish & Seafood', cal:106, prot:20,  carb:1,   fat:2},
  {ar:'حبار مشوي',                   cat:'أسماك وبحريات', en:'Grilled Squid', catEn:'Fish & Seafood', cal:148, prot:27,  carb:5,   fat:2},
  {ar:'أخطبوط مسلوق',                cat:'أسماك وبحريات', en:'أخطبوط مسلوق', catEn:'Fish & Seafood', cal:164, prot:30,  carb:4,   fat:2},
  {ar:'بلح البحر مسلوق',             cat:'أسماك وبحريات', en:'Boiled Mussels', catEn:'Fish & Seafood', cal:172, prot:24,  carb:7,   fat:4},
  {ar:'كلاماري (بدون تحمير)',         cat:'أسماك وبحريات', en:'كلاماري (بدون تحمير)', catEn:'Fish & Seafood', cal:92,  prot:16,  carb:3,   fat:1.4},

  // ══════════════════════════════════════════════════════════
  // 🥚 بروتينات — بيض وألبان عالية البروتين
  // ══════════════════════════════════════════════════════════
  {ar:'بيض كامل مسلوق',              cat:'بيض وألبان', en:'بيض كامل مسلوق', catEn:'Eggs & Dairy', cal:155, prot:13,  carb:1.1, fat:11,  unit:'بيضة',  unitG:60},
  {ar:'بيض مقلي بالزيت (قليل)',      cat:'بيض وألبان', en:'بيض مقلي بالزيت (قليل)', catEn:'Eggs & Dairy', cal:185, prot:13,  carb:0.4, fat:14,  unit:'بيضة',  unitG:60},
  {ar:'بيض مخفوق بدون زيت',          cat:'بيض وألبان', en:'بيض مخفوق بدون زيت', catEn:'Eggs & Dairy', cal:149, prot:10,  carb:1.6, fat:11,  unit:'بيضة',  unitG:60},
  {ar:'بياض البيض مسلوق',            cat:'بيض وألبان', en:'بياض البيض مسلوق', catEn:'Eggs & Dairy', cal:52,  prot:11,  carb:0.7, fat:0.2, unit:'بياض',  unitG:33},
  {ar:'بياض البيض مخفوق',            cat:'بيض وألبان', en:'بياض البيض مخفوق', catEn:'Eggs & Dairy', cal:53,  prot:11,  carb:0.7, fat:0.2, unit:'بياض',  unitG:33},
  {ar:'بيض سمان مسلوق',              cat:'بيض وألبان', en:'بيض سمان مسلوق', catEn:'Eggs & Dairy', cal:158, prot:13,  carb:0.4, fat:11,  unit:'بيضة',  unitG:10},
  {ar:'جبن قريش (كوتاج)',            cat:'بيض وألبان', en:'جبن قريش (كوتاج)', catEn:'Eggs & Dairy', cal:98,  prot:11,  carb:3.4, fat:4.3},
  {ar:'جبن قريش خالي دسم',           cat:'بيض وألبان', en:'جبن قريش خالي دسم', catEn:'Eggs & Dairy', cal:72,  prot:12,  carb:3.5, fat:0.3},
  {ar:'زبادي يوناني خالي دسم (0%)',  cat:'بيض وألبان', en:'زبادي يوناني خالي دسم (0%)', catEn:'Eggs & Dairy', cal:59,  prot:10,  carb:3.6, fat:0.4},
  {ar:'زبادي يوناني كامل الدسم',     cat:'بيض وألبان', en:'زبادي يوناني كامل الدسم', catEn:'Eggs & Dairy', cal:97,  prot:9,   carb:3.8, fat:5},
  {ar:'جبن موزاريلا خالي دسم',       cat:'بيض وألبان', en:'جبن موزاريلا خالي دسم', catEn:'Eggs & Dairy', cal:149, prot:22,  carb:7,   fat:3.5},
  {ar:'جبن أبيض دمياطي',             cat:'بيض وألبان', en:'جبن أبيض دمياطي', catEn:'Eggs & Dairy', cal:250, prot:18,  carb:2,   fat:19},
  {ar:'جبن فيتا',                    cat:'بيض وألبان', en:'جبن فيتا', catEn:'Eggs & Dairy', cal:264, prot:14,  carb:4,   fat:21},
  {ar:'لبن بقر خالي دسم',            cat:'بيض وألبان', en:'لبن بقر خالي دسم', catEn:'Eggs & Dairy', cal:34,  prot:3.4, carb:5,   fat:0.1,  liq:1, liqBase:100},
  {ar:'لبن بقر كامل الدسم',          cat:'بيض وألبان', en:'لبن بقر كامل الدسم', catEn:'Eggs & Dairy', cal:61,  prot:3.2, carb:4.8, fat:3.3,  liq:1, liqBase:100},
  {ar:'ريكوتا خالي دسم',             cat:'بيض وألبان', en:'ريكوتا خالي دسم', catEn:'Eggs & Dairy', cal:136, prot:11,  carb:5,   fat:8},

  // ══════════════════════════════════════════════════════════
  // 🌿 بروتينات — بقوليات نباتية
  // ══════════════════════════════════════════════════════════
  {ar:'عدس أحمر مسلوق',              cat:'بقوليات', en:'عدس أحمر مسلوق', catEn:'Legumes', cal:116, prot:9,   carb:20,  fat:0.4},
  {ar:'عدس أخضر مسلوق',              cat:'بقوليات', en:'عدس أخضر مسلوق', catEn:'Legumes', cal:116, prot:9,   carb:20,  fat:0.4},
  {ar:'حمص مسلوق',                   cat:'بقوليات', en:'حمص مسلوق', catEn:'Legumes', cal:164, prot:9,   carb:27,  fat:2.6},
  {ar:'فول مدمس',                    cat:'بقوليات', en:'Foul Medames (Fava Beans)', catEn:'Legumes', cal:110, prot:8,   carb:20,  fat:0.4},
  {ar:'فاصوليا بيضاء مسلوقة',        cat:'بقوليات', en:'فاصوليا بيضاء مسلوقة', catEn:'Legumes', cal:139, prot:9,   carb:25,  fat:0.4},
  {ar:'فاصوليا حمراء مسلوقة',        cat:'بقوليات', en:'فاصوليا حمراء مسلوقة', catEn:'Legumes', cal:127, prot:9,   carb:23,  fat:0.5},
  {ar:'فاصوليا سوداء مسلوقة',        cat:'بقوليات', en:'فاصوليا سوداء مسلوقة', catEn:'Legumes', cal:132, prot:9,   carb:24,  fat:0.5},
  {ar:'بازلاء صفراء مسلوقة',         cat:'بقوليات', en:'بازلاء صفراء مسلوقة', catEn:'Legumes', cal:118, prot:8,   carb:21,  fat:0.4},
  {ar:'لوبيا مسلوقة',                cat:'بقوليات', en:'لوبيا مسلوقة', catEn:'Legumes', cal:116, prot:8,   carb:21,  fat:0.4},
  {ar:'توفو صلب',                    cat:'بقوليات', en:'Firm Tofu', catEn:'Legumes', cal:76,  prot:8,   carb:1.9, fat:4.8},
  {ar:'توفو طري',                    cat:'بقوليات', en:'توفو طري', catEn:'Legumes', cal:55,  prot:6,   carb:1.4, fat:3},
  {ar:'إيداماي (فول الصويا أخضر)',   cat:'بقوليات', en:'إيداماي (فول الصويا أخضر)', catEn:'Legumes', cal:122, prot:11,  carb:9,   fat:5},
  {ar:'بروتين نباتي مُعاد تشكيله (سويا)',cat:'بقوليات', en:'Textured Vegetable Protein (Soy)', catEn:'Legumes',cal:127,prot:12, carb:15, fat:1},
  {ar:'سيتان (بروتين القمح)',         cat:'بقوليات', en:'Seitan (Wheat Protein)', catEn:'Legumes', cal:160, prot:25,  carb:9,   fat:2},

  // ══════════════════════════════════════════════════════════
  // 💊 مكملات بروتين
  // ══════════════════════════════════════════════════════════
  {ar:'بروتين مصل اللبن (واي — سكوب 30غ)',cat:'مكملات بروتين', en:'Whey Protein (30g scoop)', catEn:'Protein Supplements',cal:120,prot:25,carb:3,  fat:1.5},
  {ar:'كازين بروتين (سكوب 30غ)',     cat:'مكملات بروتين', en:'Casein Protein (30g scoop)', catEn:'Protein Supplements', cal:120, prot:24,  carb:4,   fat:1},
  {ar:'بروتين البيض المجفف',          cat:'مكملات بروتين', en:'Dried Egg White Protein', catEn:'Protein Supplements', cal:382, prot:77,  carb:4,   fat:7},
  {ar:'بروتين نباتي مختلط (سكوب)',   cat:'مكملات بروتين', en:'Mixed Plant Protein (scoop)', catEn:'Protein Supplements', cal:120, prot:22,  carb:5,   fat:2},
  {ar:'بروتين البازلاء (سكوب)',       cat:'مكملات بروتين', en:'Pea Protein (scoop)', catEn:'Protein Supplements', cal:115, prot:24,  carb:2,   fat:1.5},
  {ar:'بروتين الأرز البني (سكوب)',    cat:'مكملات بروتين', en:'Brown Rice Protein (scoop)', catEn:'Protein Supplements', cal:110, prot:23,  carb:3,   fat:1.5},
  {ar:'بروتين سويا خالص (سكوب)',     cat:'مكملات بروتين', en:'Pure Soy Protein (scoop)', catEn:'Protein Supplements', cal:105, prot:22,  carb:2,   fat:1},

  // ══════════════════════════════════════════════════════════
  // 🌾 كربوهيدرات — حبوب وأرز
  // ══════════════════════════════════════════════════════════
  {ar:'أرز أبيض مسلوق',              cat:'حبوب وأرز', en:'أرز أبيض مسلوق', catEn:'Grains & Rice', cal:130, prot:2.7, carb:28,  fat:0.3},
  {ar:'أرز بني مسلوق',               cat:'حبوب وأرز', en:'أرز بني مسلوق', catEn:'Grains & Rice', cal:112, prot:2.6, carb:23,  fat:0.9},
  {ar:'أرز بسمتي أبيض مسلوق',        cat:'حبوب وأرز', en:'أرز بسمتي أبيض مسلوق', catEn:'Grains & Rice', cal:121, prot:3.5, carb:25,  fat:0.4},
  {ar:'أرز بسمتي بني مسلوق',         cat:'حبوب وأرز', en:'أرز بسمتي بني مسلوق', catEn:'Grains & Rice', cal:111, prot:3,   carb:22,  fat:1.1},
  {ar:'أرز ياسمين مسلوق',            cat:'حبوب وأرز', en:'أرز ياسمين مسلوق', catEn:'Grains & Rice', cal:129, prot:3,   carb:28,  fat:0.3},
  {ar:'أرز مصري مسلوق',              cat:'حبوب وأرز', en:'أرز مصري مسلوق', catEn:'Grains & Rice', cal:127, prot:2.5, carb:27,  fat:0.2},
  {ar:'شوفان مطبوخ بالماء',          cat:'حبوب وأرز', en:'Oatmeal cooked in water', catEn:'Grains & Rice', cal:71,  prot:2.5, carb:12,  fat:1.5},
  {ar:'شوفان جاف (خام)',             cat:'حبوب وأرز', en:'Dry Oats (raw)', catEn:'Grains & Rice', cal:389, prot:17,  carb:66,  fat:7},
  {ar:'شوفان فوري مطبوخ',            cat:'حبوب وأرز', en:'شوفان فوري مطبوخ', catEn:'Grains & Rice', cal:68,  prot:2.4, carb:12,  fat:1.4},
  {ar:'كينوا مسلوقة',                cat:'حبوب وأرز', en:'كينوا مسلوقة', catEn:'Grains & Rice', cal:120, prot:4.4, carb:21,  fat:1.9},
  {ar:'برغل مسلوق',                  cat:'حبوب وأرز', en:'برغل مسلوق', catEn:'Grains & Rice', cal:83,  prot:3,   carb:19,  fat:0.2},
  {ar:'كسكس مسلوق',                  cat:'حبوب وأرز', en:'كسكس مسلوق', catEn:'Grains & Rice', cal:112, prot:3.8, carb:23,  fat:0.2},
  {ar:'فريك مسلوق',                  cat:'حبوب وأرز', en:'فريك مسلوق', catEn:'Grains & Rice', cal:105, prot:4,   carb:22,  fat:0.5},
  {ar:'أرز كاوليفلور (مطبوخ)',       cat:'حبوب وأرز', en:'أرز كاوليفلور (مطبوخ)', catEn:'Grains & Rice', cal:25,  prot:2,   carb:5,   fat:0.3},
  {ar:'حنطة سوداء (بكويت) مسلوقة',  cat:'حبوب وأرز', en:'حنطة سوداء (بكويت) مسلوقة', catEn:'Grains & Rice', cal:92,  prot:3.4, carb:20,  fat:0.6},
  {ar:'شعير مسلوق',                  cat:'حبوب وأرز', en:'شعير مسلوق', catEn:'Grains & Rice', cal:123, prot:2.3, carb:28,  fat:0.4},
  {ar:'دخن مسلوق',                   cat:'حبوب وأرز', en:'دخن مسلوق', catEn:'Grains & Rice', cal:119, prot:3.5, carb:23,  fat:1},
  {ar:'أرز أسود مسلوق',              cat:'حبوب وأرز', en:'أرز أسود مسلوق', catEn:'Grains & Rice', cal:160, prot:4,   carb:33,  fat:1.5},
  {ar:'أرز أحمر مسلوق',              cat:'حبوب وأرز', en:'أرز أحمر مسلوق', catEn:'Grains & Rice', cal:119, prot:3,   carb:25,  fat:1},

  // ══════════════════════════════════════════════════════════
  // 🍞 كربوهيدرات — خبز ومعجنات
  // ══════════════════════════════════════════════════════════
  {ar:'خبز عيش بلدي',                cat:'خبز ومعجنات', en:'Egyptian Baladi Bread', catEn:'Bread & Pasta', cal:255, prot:9,   carb:53,  fat:1.4, unit:'قطعة',   unitG:60},
  {ar:'خبز توست أبيض',               cat:'خبز ومعجنات', en:'خبز توست أبيض', catEn:'Bread & Pasta', cal:265, prot:8.9, carb:49,  fat:3.2, unit:'شريحة',  unitG:25},
  {ar:'خبز توست أسمر',               cat:'خبز ومعجنات', en:'خبز توست أسمر', catEn:'Bread & Pasta', cal:247, prot:13,  carb:41,  fat:4.2, unit:'شريحة',  unitG:25},
  {ar:'خبز قمح كامل طازج',           cat:'خبز ومعجنات', en:'خبز قمح كامل طازج', catEn:'Bread & Pasta', cal:252, prot:12,  carb:43,  fat:3.4, unit:'شريحة',  unitG:30},
  {ar:'خبز الفينو',                   cat:'خبز ومعجنات', en:'خبز الفينو', catEn:'Bread & Pasta', cal:270, prot:9,   carb:52,  fat:2.5, unit:'قطعة',   unitG:70},
  {ar:'خبز باجيتا',                   cat:'خبز ومعجنات', en:'خبز باجيتا', catEn:'Bread & Pasta', cal:258, prot:9,   carb:50,  fat:3,   unit:'قطعة',   unitG:60},
  {ar:'خبز صمولي (بان شراب)',         cat:'خبز ومعجنات', en:'خبز صمولي (بان شراب)', catEn:'Bread & Pasta', cal:271, prot:9,   carb:51,  fat:3.5, unit:'قطعة',   unitG:60},
  {ar:'خبز رقيق عربي (لواش)',         cat:'خبز ومعجنات', en:'خبز رقيق عربي (لواش)', catEn:'Bread & Pasta', cal:332, prot:11,  carb:65,  fat:2.5, unit:'قطعة',   unitG:28},
  {ar:'تورتيلا قمح كامل',             cat:'خبز ومعجنات', en:'Whole Wheat Tortilla', catEn:'Bread & Pasta', cal:234, prot:8,   carb:41,  fat:5,   unit:'قطعة',   unitG:45},
  {ar:'كرواسون سادة',                 cat:'خبز ومعجنات', en:'كرواسون سادة', catEn:'Bread & Pasta', cal:406, prot:9,   carb:46,  fat:21,  unit:'قطعة',   unitG:57},
  {ar:'معكرونة سباغيتي مسلوقة',      cat:'خبز ومعجنات', en:'معكرونة سباغيتي مسلوقة', catEn:'Bread & Pasta', cal:158, prot:5.8, carb:31,  fat:0.9},
  {ar:'معكرونة بيني مسلوقة',          cat:'خبز ومعجنات', en:'معكرونة بيني مسلوقة', catEn:'Bread & Pasta', cal:158, prot:5.8, carb:31,  fat:0.9},
  {ar:'معكرونة قمح كامل مسلوقة',     cat:'خبز ومعجنات', en:'معكرونة قمح كامل مسلوقة', catEn:'Bread & Pasta', cal:124, prot:5.3, carb:26,  fat:0.5},
  {ar:'نودلز أرز مسلوقة',             cat:'خبز ومعجنات', en:'نودلز أرز مسلوقة', catEn:'Bread & Pasta', cal:108, prot:1.8, carb:25,  fat:0.2},
  {ar:'خبز الأرز (قطعة)',             cat:'خبز ومعجنات', en:'خبز الأرز (قطعة)', catEn:'Bread & Pasta', cal:387, prot:7,   carb:84,  fat:3,   unit:'قطعة',   unitG:9},

  // ══════════════════════════════════════════════════════════
  // 🥔 كربوهيدرات — بطاطس وجذور
  // ══════════════════════════════════════════════════════════
  {ar:'بطاطس بيضاء مسلوقة',          cat:'بطاطس وجذور', en:'بطاطس بيضاء مسلوقة', catEn:'Potatoes & Roots', cal:87,  prot:1.9, carb:20,  fat:0.1},
  {ar:'بطاطس مشوية في الفرن',        cat:'بطاطس وجذور', en:'بطاطس مشوية في الفرن', catEn:'Potatoes & Roots', cal:93,  prot:2.5, carb:21,  fat:0.1},
  {ar:'بطاطس مهروسة (بدون زبدة)',     cat:'بطاطس وجذور', en:'بطاطس مهروسة (بدون زبدة)', catEn:'Potatoes & Roots', cal:83,  prot:2,   carb:18,  fat:0.6},
  {ar:'بطاطا حلوة مسلوقة',           cat:'بطاطس وجذور', en:'Boiled Sweet Potato', catEn:'Potatoes & Roots', cal:86,  prot:1.6, carb:20,  fat:0.1},
  {ar:'بطاطا حلوة مشوية',            cat:'بطاطس وجذور', en:'Baked Sweet Potato', catEn:'Potatoes & Roots', cal:103, prot:2.3, carb:24,  fat:0.1},
  {ar:'بطاطا حلوة أرجوانية مسلوقة',  cat:'بطاطس وجذور', en:'بطاطا حلوة أرجوانية مسلوقة', catEn:'Potatoes & Roots', cal:82,  prot:1.5, carb:19,  fat:0.1},
  {ar:'كاسافا مسلوقة',               cat:'بطاطس وجذور', en:'كاسافا مسلوقة', catEn:'Potatoes & Roots', cal:160, prot:1.4, carb:38,  fat:0.3},
  {ar:'جزر مسلوق',                   cat:'بطاطس وجذور', en:'جزر مسلوق', catEn:'Potatoes & Roots', cal:35,  prot:0.8, carb:8.2, fat:0.2},
  {ar:'بنجر أحمر مسلوق',             cat:'بطاطس وجذور', en:'بنجر أحمر مسلوق', catEn:'Potatoes & Roots', cal:44,  prot:1.7, carb:10,  fat:0.2},
  {ar:'لفت مسلوق',                   cat:'بطاطس وجذور', en:'لفت مسلوق', catEn:'Potatoes & Roots', cal:22,  prot:1.1, carb:5,   fat:0.1},
  {ar:'يام مسلوق',                   cat:'بطاطس وجذور', en:'Boiled Yam', catEn:'Potatoes & Roots', cal:118, prot:1.5, carb:28,  fat:0.1},

  // ══════════════════════════════════════════════════════════
  // 🌽 كربوهيدرات — ذرة وحبوب خاصة
  // ══════════════════════════════════════════════════════════
  {ar:'ذرة صفراء مسلوقة',            cat:'ذرة وحبوب', en:'ذرة صفراء مسلوقة', catEn:'Corn & Grains', cal:96,  prot:3.4, carb:21,  fat:1.5},
  {ar:'ذرة بيضاء مسلوقة',            cat:'ذرة وحبوب', en:'ذرة بيضاء مسلوقة', catEn:'Corn & Grains', cal:86,  prot:3,   carb:19,  fat:1},
  {ar:'ذرة (علبة مصفاة)',            cat:'ذرة وحبوب', en:'ذرة (علبة مصفاة)', catEn:'Corn & Grains', cal:82,  prot:2.7, carb:18,  fat:0.9},
  {ar:'فشار بدون زيت',               cat:'ذرة وحبوب', en:'فشار بدون زيت', catEn:'Corn & Grains', cal:375, prot:11,  carb:74,  fat:4.5},
  {ar:'دقيق ذرة',                    cat:'ذرة وحبوب', en:'Corn Flour', catEn:'Corn & Grains', cal:363, prot:7,   carb:77,  fat:3.6},
  {ar:'نشا ذرة',                     cat:'ذرة وحبوب', en:'Corn Starch', catEn:'Corn & Grains', cal:381, prot:0.3, carb:91,  fat:0.1},
  {ar:'حبوب كورن فليكس',              cat:'ذرة وحبوب', en:'حبوب كورن فليكس', catEn:'Corn & Grains', cal:357, prot:7.5, carb:80,  fat:0.4},

  // ══════════════════════════════════════════════════════════
  // 🍌 كربوهيدرات — فواكه
  // ══════════════════════════════════════════════════════════
  {ar:'موز ناضج',                    cat:'فواكه', en:'Ripe Banana', catEn:'Fruits', cal:89,  prot:1.1, carb:23,  fat:0.3, unit:'موزة', unitEn:'banana', unitG:120},
  {ar:'موز أخضر (غير ناضج)',         cat:'فواكه', en:'Green Banana (unripe)', catEn:'Fruits', cal:89,  prot:1.1, carb:23,  fat:0.3, unit:'موزة', unitEn:'banana', unitG:120},
  {ar:'تفاح أحمر',                   cat:'فواكه', en:'تفاح أحمر', catEn:'Fruits', cal:52,  prot:0.3, carb:14,  fat:0.2},
  {ar:'تفاح أخضر',                   cat:'فواكه', en:'تفاح أخضر', catEn:'Fruits', cal:52,  prot:0.3, carb:14,  fat:0.2},
  {ar:'برتقال',                      cat:'فواكه', en:'برتقال', catEn:'Fruits', cal:47,  prot:0.9, carb:12,  fat:0.1},
  {ar:'يوسفي (مندرين)',              cat:'فواكه', en:'يوسفي (مندرين)', catEn:'Fruits', cal:53,  prot:0.8, carb:13,  fat:0.3},
  {ar:'ليمون أصفر',                  cat:'فواكه', en:'ليمون أصفر', catEn:'Fruits', cal:29,  prot:1.1, carb:9,   fat:0.3},
  {ar:'جريب فروت',                   cat:'فواكه', en:'جريب فروت', catEn:'Fruits', cal:42,  prot:0.8, carb:11,  fat:0.1},
  {ar:'مانجو',                       cat:'فواكه', en:'مانجو', catEn:'Fruits', cal:60,  prot:0.8, carb:15,  fat:0.4},
  {ar:'بابايا',                      cat:'فواكه', en:'بابايا', catEn:'Fruits', cal:43,  prot:0.5, carb:11,  fat:0.3},
  {ar:'أناناس',                      cat:'فواكه', en:'أناناس', catEn:'Fruits', cal:50,  prot:0.5, carb:13,  fat:0.1},
  {ar:'فراولة طازجة',                cat:'فواكه', en:'Fresh Strawberries', catEn:'Fruits', cal:32,  prot:0.7, carb:7.7, fat:0.3},
  {ar:'توت أزرق (بلوبيري)',          cat:'فواكه', en:'توت أزرق (بلوبيري)', catEn:'Fruits', cal:57,  prot:0.7, carb:14,  fat:0.3},
  {ar:'توت بري (راسبيري)',            cat:'فواكه', en:'توت بري (راسبيري)', catEn:'Fruits', cal:52,  prot:1.2, carb:12,  fat:0.7},
  {ar:'عنب أخضر',                    cat:'فواكه', en:'Green Grapes', catEn:'Fruits', cal:67,  prot:0.6, carb:17,  fat:0.4},
  {ar:'عنب أسود',                    cat:'فواكه', en:'عنب أسود', catEn:'Fruits', cal:69,  prot:0.7, carb:18,  fat:0.2},
  {ar:'بطيخ أحمر',                   cat:'فواكه', en:'بطيخ أحمر', catEn:'Fruits', cal:30,  prot:0.6, carb:7.6, fat:0.2},
  {ar:'شمام',                        cat:'فواكه', en:'شمام', catEn:'Fruits', cal:34,  prot:0.8, carb:8.2, fat:0.2},
  {ar:'خوخ',                         cat:'فواكه', en:'خوخ', catEn:'Fruits', cal:39,  prot:0.9, carb:10,  fat:0.3},
  {ar:'كمثرى',                       cat:'فواكه', en:'كمثرى', catEn:'Fruits', cal:57,  prot:0.4, carb:15,  fat:0.1},
  {ar:'تمر مجفف (مدجول)',            cat:'فواكه', en:'تمر مجفف (مدجول)', catEn:'Fruits', cal:277, prot:1.8, carb:75,  fat:0.2},
  {ar:'مشمش مجفف',                   cat:'فواكه', en:'Dried Apricots', catEn:'Fruits', cal:241, prot:3.4, carb:63,  fat:0.5},
  {ar:'زبيب',                        cat:'فواكه', en:'زبيب', catEn:'Fruits', cal:299, prot:3.1, carb:79,  fat:0.5},
  {ar:'إجاص',                        cat:'فواكه', en:'إجاص', catEn:'Fruits', cal:57,  prot:0.4, carb:15,  fat:0.1},
  {ar:'تين طازج',                    cat:'فواكه', en:'تين طازج', catEn:'Fruits', cal:74,  prot:0.8, carb:19,  fat:0.3},
  {ar:'كيوي',                        cat:'فواكه', en:'كيوي', catEn:'Fruits', cal:61,  prot:1.1, carb:15,  fat:0.5},
  {ar:'رمان',                        cat:'فواكه', en:'رمان', catEn:'Fruits', cal:83,  prot:1.7, carb:19,  fat:1.2},

  // ══════════════════════════════════════════════════════════
  // 🥦 كربوهيدرات — خضروات نشوية وخضروات عامة
  // ══════════════════════════════════════════════════════════
  {ar:'بروكلي مسلوق',                cat:'خضروات', en:'Steamed Broccoli', catEn:'Vegetables', cal:35,  prot:2.4, carb:7.2, fat:0.4},
  {ar:'قرنبيط مسلوق',                cat:'خضروات', en:'قرنبيط مسلوق', catEn:'Vegetables', cal:25,  prot:1.9, carb:5,   fat:0.3},
  {ar:'سبانخ مطبوخة',                cat:'خضروات', en:'سبانخ مطبوخة', catEn:'Vegetables', cal:23,  prot:3,   carb:3.8, fat:0.3},
  {ar:'سبانخ طازجة',                 cat:'خضروات', en:'Fresh Spinach', catEn:'Vegetables', cal:23,  prot:2.9, carb:3.6, fat:0.4},
  {ar:'خيار طازج',                   cat:'خضروات', en:'Fresh Cucumber', catEn:'Vegetables', cal:16,  prot:0.7, carb:3.6, fat:0.1},
  {ar:'طماطم طازجة',                 cat:'خضروات', en:'Fresh Tomatoes', catEn:'Vegetables', cal:18,  prot:0.9, carb:3.9, fat:0.2},
  {ar:'فلفل أخضر',                   cat:'خضروات', en:'Green Bell Pepper', catEn:'Vegetables', cal:20,  prot:0.9, carb:4.6, fat:0.2},
  {ar:'فلفل أحمر',                   cat:'خضروات', en:'Red Bell Pepper', catEn:'Vegetables', cal:31,  prot:1,   carb:7.2, fat:0.3},
  {ar:'فلفل أصفر',                   cat:'خضروات', en:'فلفل أصفر', catEn:'Vegetables', cal:27,  prot:1,   carb:6.3, fat:0.2},
  {ar:'كوسة مسلوقة',                 cat:'خضروات', en:'كوسة مسلوقة', catEn:'Vegetables', cal:17,  prot:1.2, carb:3.5, fat:0.3},
  {ar:'فاصوليا خضراء مسلوقة',        cat:'خضروات', en:'فاصوليا خضراء مسلوقة', catEn:'Vegetables', cal:35,  prot:1.9, carb:8,   fat:0.1},
  {ar:'ملوخية مطبوخة',               cat:'خضروات', en:'ملوخية مطبوخة', catEn:'Vegetables', cal:44,  prot:4.7, carb:8.1, fat:0.6},
  {ar:'بصل نيئ',                     cat:'خضروات', en:'بصل نيئ', catEn:'Vegetables', cal:40,  prot:1.1, carb:9.3, fat:0.1},
  {ar:'ثوم مفروم',                   cat:'خضروات', en:'ثوم مفروم', catEn:'Vegetables', cal:149, prot:6.4, carb:33,  fat:0.5},
  {ar:'خس رومين',                    cat:'خضروات', en:'خس رومين', catEn:'Vegetables', cal:17,  prot:1.2, carb:3.3, fat:0.3},
  {ar:'كرنب أبيض مطبوخ',             cat:'خضروات', en:'كرنب أبيض مطبوخ', catEn:'Vegetables', cal:23,  prot:1.3, carb:5.4, fat:0.1},
  {ar:'كرنب أخضر نيئ',               cat:'خضروات', en:'كرنب أخضر نيئ', catEn:'Vegetables', cal:25,  prot:1.3, carb:5.8, fat:0.1},
  {ar:'فطر مطبوخ',                   cat:'خضروات', en:'فطر مطبوخ', catEn:'Vegetables', cal:28,  prot:2.2, carb:5.3, fat:0.3},
  {ar:'فطر طازج',                    cat:'خضروات', en:'Fresh Mushrooms', catEn:'Vegetables', cal:22,  prot:3.1, carb:3.3, fat:0.3},
  {ar:'باذنجان مشوي',                cat:'خضروات', en:'Grilled Eggplant', catEn:'Vegetables', cal:35,  prot:0.8, carb:8.7, fat:0.2},
  {ar:'بازلاء مسلوقة',               cat:'خضروات', en:'بازلاء مسلوقة', catEn:'Vegetables', cal:84,  prot:5.4, carb:15,  fat:0.4},
  {ar:'قلقاس / تارو مسلوق',          cat:'خضروات', en:'قلقاس / تارو مسلوق', catEn:'Vegetables', cal:142, prot:0.5, carb:35,  fat:0.1},
  {ar:'أرتيشوك مسلوق',               cat:'خضروات', en:'أرتيشوك مسلوق', catEn:'Vegetables', cal:53,  prot:3,   carb:12,  fat:0.2},
  {ar:'هليون مسلوق',                 cat:'خضروات', en:'Boiled Asparagus', catEn:'Vegetables', cal:22,  prot:2.4, carb:4.1, fat:0.2},
  {ar:'خرشوف',                       cat:'خضروات', en:'خرشوف', catEn:'Vegetables', cal:53,  prot:3,   carb:12,  fat:0.2},

  // ══════════════════════════════════════════════════════════
  // 🥑 دهون صحية — زيوت
  // ══════════════════════════════════════════════════════════
  {ar:'زيت زيتون بكر ممتاز',         cat:'زيوت صحية', en:'Extra Virgin Olive Oil', catEn:'Healthy Oils', cal:884, prot:0,   carb:0,   fat:100},
  {ar:'زيت جوز الهند',               cat:'زيوت صحية', en:'Coconut Oil', catEn:'Healthy Oils', cal:862, prot:0,   carb:0,   fat:100},
  {ar:'زيت أفوكادو',                 cat:'زيوت صحية', en:'Avocado Oil', catEn:'Healthy Oils', cal:884, prot:0,   carb:0,   fat:100},
  {ar:'زيت الكتان',                  cat:'زيوت صحية', en:'Flaxseed Oil', catEn:'Healthy Oils', cal:884, prot:0,   carb:0,   fat:100},
  {ar:'زيت السمسم',                  cat:'زيوت صحية', en:'Sesame Oil', catEn:'Healthy Oils', cal:884, prot:0,   carb:0,   fat:100},
  {ar:'زيت بذور العنب',              cat:'زيوت صحية', en:'Grapeseed Oil', catEn:'Healthy Oils', cal:884, prot:0,   carb:0,   fat:100},
  {ar:'زيت جوز',                     cat:'زيوت صحية', en:'Walnut Oil', catEn:'Healthy Oils', cal:884, prot:0,   carb:0,   fat:100},
  {ar:'زيت السمن البلدي (غي)',        cat:'زيوت صحية', en:'Clarified Butter (Ghee)', catEn:'Healthy Oils', cal:900, prot:0,   carb:0,   fat:100},
  {ar:'زبدة غير مملحة',              cat:'زيوت صحية', en:'Unsalted Butter', catEn:'Healthy Oils', cal:717, prot:0.9, carb:0.1, fat:81},

  // ══════════════════════════════════════════════════════════
  // 🥜 دهون صحية — مكسرات وبذور
  // ══════════════════════════════════════════════════════════
  {ar:'لوز خام',                     cat:'مكسرات وبذور', en:'Raw Almonds', catEn:'Nuts & Seeds', cal:579, prot:21,  carb:22,  fat:50},
  {ar:'لوز محمص (بدون ملح)',          cat:'مكسرات وبذور', en:'لوز محمص (بدون ملح)', catEn:'Nuts & Seeds', cal:598, prot:21,  carb:20,  fat:52},
  {ar:'جوز',                         cat:'مكسرات وبذور', en:'جوز', catEn:'Nuts & Seeds', cal:654, prot:15,  carb:14,  fat:65},
  {ar:'جوز البقان (بيكان)',           cat:'مكسرات وبذور', en:'جوز البقان (بيكان)', catEn:'Nuts & Seeds', cal:691, prot:9,   carb:14,  fat:72},
  {ar:'كاجو خام',                    cat:'مكسرات وبذور', en:'Raw Cashews', catEn:'Nuts & Seeds', cal:553, prot:15,  carb:33,  fat:44},
  {ar:'كاجو محمص',                   cat:'مكسرات وبذور', en:'كاجو محمص', catEn:'Nuts & Seeds', cal:574, prot:16,  carb:33,  fat:46},
  {ar:'فستق حلبي',                   cat:'مكسرات وبذور', en:'فستق حلبي', catEn:'Nuts & Seeds', cal:560, prot:20,  carb:28,  fat:45},
  {ar:'بندق',                        cat:'مكسرات وبذور', en:'بندق', catEn:'Nuts & Seeds', cal:628, prot:15,  carb:17,  fat:61},
  {ar:'ماكاديميا',                   cat:'مكسرات وبذور', en:'ماكاديميا', catEn:'Nuts & Seeds', cal:718, prot:8,   carb:14,  fat:76},
  {ar:'فول سوداني خام',              cat:'مكسرات وبذور', en:'فول سوداني خام', catEn:'Nuts & Seeds', cal:567, prot:26,  carb:16,  fat:49},
  {ar:'فول سوداني محمص',             cat:'مكسرات وبذور', en:'فول سوداني محمص', catEn:'Nuts & Seeds', cal:585, prot:24,  carb:21,  fat:50},
  {ar:'زبدة اللوز الطبيعية',         cat:'مكسرات وبذور', en:'Natural Almond Butter', catEn:'Nuts & Seeds', cal:614, prot:21,  carb:19,  fat:56},
  {ar:'زبدة الفول السوداني الطبيعية',cat:'مكسرات وبذور', en:'Natural Peanut Butter', catEn:'Nuts & Seeds', cal:598, prot:25,  carb:20,  fat:51},
  {ar:'زبدة الكاجو',                 cat:'مكسرات وبذور', en:'Cashew Butter', catEn:'Nuts & Seeds', cal:587, prot:17,  carb:27,  fat:48},
  {ar:'طحينة سمسم',                  cat:'مكسرات وبذور', en:'Sesame Tahini', catEn:'Nuts & Seeds', cal:595, prot:17,  carb:21,  fat:54},
  {ar:'بذور السمسم',                 cat:'مكسرات وبذور', en:'Sesame Seeds', catEn:'Nuts & Seeds', cal:573, prot:18,  carb:23,  fat:50},
  {ar:'بذور عباد الشمس',             cat:'مكسرات وبذور', en:'Sunflower Seeds', catEn:'Nuts & Seeds', cal:584, prot:21,  carb:20,  fat:51},
  {ar:'بذور اليقطين (قرع)',           cat:'مكسرات وبذور', en:'Pumpkin Seeds', catEn:'Nuts & Seeds', cal:559, prot:30,  carb:11,  fat:49},
  {ar:'بذور الكتان المطحونة',         cat:'مكسرات وبذور', en:'Ground Flaxseeds', catEn:'Nuts & Seeds', cal:534, prot:18,  carb:29,  fat:42},
  {ar:'بذور الشيا',                  cat:'مكسرات وبذور', en:'Chia Seeds', catEn:'Nuts & Seeds', cal:486, prot:17,  carb:42,  fat:31},
  {ar:'بذور القنب',                  cat:'مكسرات وبذور', en:'Hemp Seeds', catEn:'Nuts & Seeds', cal:553, prot:32,  carb:9,   fat:49},
  {ar:'جوز الهند المبشور (غير محلى)',cat:'مكسرات وبذور', en:'جوز الهند المبشور (غير محلى)', catEn:'Nuts & Seeds', cal:660, prot:7,   carb:25,  fat:64},

  // ══════════════════════════════════════════════════════════
  // 🥑 دهون صحية — أفوكادو وأسماك دهنية وأخرى
  // ══════════════════════════════════════════════════════════
  {ar:'أفوكادو طازج',                cat:'دهون أخرى', en:'Fresh Avocado', catEn:'Other Fats', cal:160, prot:2,   carb:9,   fat:15},
  {ar:'زيتون أخضر',                  cat:'دهون أخرى', en:'Green Olives', catEn:'Other Fats', cal:115, prot:0.8, carb:6,   fat:11},
  {ar:'زيتون أسود',                  cat:'دهون أخرى', en:'Black Olives', catEn:'Other Fats', cal:115, prot:0.8, carb:6,   fat:11},
  {ar:'جبن شيدر كامل الدسم',         cat:'دهون أخرى', en:'Full-Fat Cheddar Cheese', catEn:'Other Fats', cal:402, prot:25,  carb:1.3, fat:33},
  {ar:'جبن جودة كامل الدسم',         cat:'دهون أخرى', en:'Full-Fat Gouda Cheese', catEn:'Other Fats', cal:356, prot:25,  carb:2.2, fat:27},
  {ar:'جبن بارميزان مبشور',          cat:'دهون أخرى', en:'Grated Parmesan Cheese', catEn:'Other Fats', cal:431, prot:38,  carb:4,   fat:29},
  {ar:'كريم تشيز (جبن كريمي)',        cat:'دهون أخرى', en:'Cream Cheese', catEn:'Other Fats', cal:342, prot:6,   carb:4,   fat:34},
  {ar:'قشطة حامضة',                  cat:'دهون أخرى', en:'Sour Cream', catEn:'Other Fats', cal:198, prot:2.4, carb:4.6, fat:19},
  {ar:'قشطة مزرعة (هيفي كريم)',       cat:'دهون أخرى', en:'Heavy Whipping Cream', catEn:'Other Fats', cal:340, prot:2.8, carb:2.8, fat:36},
  {ar:'زبدة الشيا والبذور',          cat:'دهون أخرى', en:'Chia & Seed Butter', catEn:'Other Fats', cal:470, prot:15,  carb:35,  fat:35},
  {ar:'صفار البيض',                  cat:'دهون أخرى', en:'Egg Yolk', catEn:'Other Fats', cal:322, prot:16,  carb:3.6, fat:27},

  // ══════════════════════════════════════════════════════════
  // 💊 مكملات أخرى
  // ══════════════════════════════════════════════════════════
  {ar:'كارب',                        cat:'مكملات أخرى', en:'Carb Powder', catEn:'Other Supplements', cal:380, prot:0,   carb:95,  fat:0},
  {ar:'كرياتين',                     cat:'مكملات أخرى', en:'Creatine', catEn:'Other Supplements', cal:0,   prot:0,   carb:0,   fat:0},
  {ar:'واي بروتين',                  cat:'مكملات بروتين', en:'Whey Protein', catEn:'Protein Supplements', cal:120, prot:25,  carb:3,   fat:1.5},
  {ar:'كازين',                       cat:'مكملات بروتين', en:'Casein', catEn:'Protein Supplements', cal:120, prot:24,  carb:4,   fat:1},
  {ar:'BCAA',                        cat:'مكملات أخرى', en:'BCAA', catEn:'Other Supplements', cal:25,  prot:5,   carb:1,   fat:0},
  {ar:'جلوتامين',                    cat:'مكملات أخرى', en:'Glutamine', catEn:'Other Supplements', cal:20,  prot:5,   carb:0,   fat:0},
  {ar:'أوميجا 3',                    cat:'مكملات أخرى', en:'Omega 3', catEn:'Other Supplements', cal:10,  prot:0,   carb:0,   fat:1},
  {ar:'برى ووركاوت',                 cat:'مكملات أخرى', en:'Pre-Workout', catEn:'Other Supplements', cal:10,  prot:0,   carb:2,   fat:0},
  {ar:'إل-كارنتين',                  cat:'مكملات أخرى', en:'L-Carnitine', catEn:'Other Supplements', cal:4,   prot:1,   carb:0,   fat:0},
  {ar:'كرياتين مونوهيدرات (5غ)',     cat:'مكملات أخرى', en:'Creatine Monohydrate (5g)', catEn:'Other Supplements', cal:0,   prot:0,   carb:0,   fat:0},
  {ar:'دكستروز / جلوكوز',           cat:'مكملات أخرى', en:'Dextrose / Glucose', catEn:'Other Supplements', cal:364, prot:0,   carb:91,  fat:0},
  {ar:'مالتوديكسترين',               cat:'مكملات أخرى', en:'مالتوديكسترين', catEn:'Other Supplements', cal:380, prot:0,   carb:95,  fat:0},
  {ar:'BCAA (بودرة)',                cat:'مكملات أخرى', en:'BCAA (powder)', catEn:'Other Supplements', cal:25,  prot:5,   carb:1,   fat:0},
  {ar:'جلوتامين (بودرة)',            cat:'مكملات أخرى', en:'Glutamine (powder)', catEn:'Other Supplements', cal:20,  prot:5,   carb:0,   fat:0},
  {ar:'أوميجا 3 (كبسول)',           cat:'مكملات أخرى', en:'أوميجا 3 (كبسول)', catEn:'Other Supplements', cal:10,  prot:0,   carb:0,   fat:1},
  {ar:'دبس قصب',                    cat:'مكملات أخرى', en:'Molasses', catEn:'Other Supplements', cal:290, prot:0,   carb:74,  fat:0.1},
  {ar:'عسل نحل طبيعي',              cat:'مكملات أخرى', en:'Natural Honey', catEn:'Other Supplements', cal:304, prot:0.3, carb:82,  fat:0},
  // ══════════════════════════════════════════════════════════
  // 🍽️ أطباق عربية شائعة (مطبوخة - لكل 100غ)
  // ══════════════════════════════════════════════════════════
  {ar:'كبسة دجاج (أرز ودجاج)',        cat:'أطباق عربية', en:'كبسة دجاج (أرز ودجاج)', catEn:'Arabic Dishes', cal:180, prot:12,  carb:22,  fat:5},
  {ar:'كبسة لحم',                     cat:'أطباق عربية', en:'كبسة لحم', catEn:'Arabic Dishes', cal:210, prot:14,  carb:22,  fat:7},
  {ar:'مجبوس دجاج',                   cat:'أطباق عربية', en:'مجبوس دجاج', catEn:'Arabic Dishes', cal:175, prot:11,  carb:21,  fat:5},
  {ar:'مندي دجاج',                    cat:'أطباق عربية', en:'مندي دجاج', catEn:'Arabic Dishes', cal:220, prot:18,  carb:18,  fat:8},
  {ar:'مندي لحم',                     cat:'أطباق عربية', en:'مندي لحم', catEn:'Arabic Dishes', cal:245, prot:16,  carb:18,  fat:10},
  {ar:'هريس (حريس قمح ودجاج)',        cat:'أطباق عربية', en:'هريس (حريس قمح ودجاج)', catEn:'Arabic Dishes', cal:185, prot:10,  carb:22,  fat:5},
  {ar:'شاورما دجاج (بدون خبز)',       cat:'أطباق عربية', en:'شاورما دجاج (بدون خبز)', catEn:'Arabic Dishes', cal:195, prot:20,  carb:3,   fat:11},
  {ar:'شاورما لحم (بدون خبز)',        cat:'أطباق عربية', en:'شاورما لحم (بدون خبز)', catEn:'Arabic Dishes', cal:215, prot:18,  carb:2,   fat:14},
  {ar:'كفتة مشوية',                   cat:'أطباق عربية', en:'كفتة مشوية', catEn:'Arabic Dishes', cal:235, prot:22,  carb:3,   fat:15},
  {ar:'كفتة مطبوخة بالصلصة',          cat:'أطباق عربية', en:'كفتة مطبوخة بالصلصة', catEn:'Arabic Dishes', cal:210, prot:19,  carb:7,   fat:13},
  {ar:'مسخن دجاج (بدون خبز)',         cat:'أطباق عربية', en:'مسخن دجاج (بدون خبز)', catEn:'Arabic Dishes', cal:230, prot:22,  carb:5,   fat:14},
  {ar:'دجاج بالكاري',                 cat:'أطباق عربية', en:'دجاج بالكاري', catEn:'Arabic Dishes', cal:185, prot:18,  carb:6,   fat:10},
  {ar:'ملوخية مع أرز ودجاج',          cat:'أطباق عربية', en:'ملوخية مع أرز ودجاج', catEn:'Arabic Dishes', cal:190, prot:13,  carb:24,  fat:5},
  {ar:'فتة حمص',                      cat:'أطباق عربية', en:'فتة حمص', catEn:'Arabic Dishes', cal:165, prot:8,   carb:22,  fat:5},
  {ar:'فتة دجاج',                     cat:'أطباق عربية', en:'فتة دجاج', catEn:'Arabic Dishes', cal:195, prot:15,  carb:18,  fat:7},
  {ar:'كشري مصري',                    cat:'أطباق عربية', en:'كشري مصري', catEn:'Arabic Dishes', cal:155, prot:6,   carb:30,  fat:2.5},
  {ar:'فلافل مقلية',                  cat:'أطباق عربية', en:'فلافل مقلية', catEn:'Arabic Dishes', cal:330, prot:13,  carb:32,  fat:18},
  {ar:'فلافل على الهواء (air fryer)', cat:'أطباق عربية', en:'فلافل على الهواء (air fryer)', catEn:'Arabic Dishes', cal:180, prot:10,  carb:22,  fat:6},
  {ar:'كباب تركي مشوي',               cat:'أطباق عربية', en:'كباب تركي مشوي', catEn:'Arabic Dishes', cal:250, prot:22,  carb:1,   fat:17},
  {ar:'برياني دجاج',                  cat:'أطباق عربية', en:'برياني دجاج', catEn:'Arabic Dishes', cal:195, prot:13,  carb:24,  fat:6},
  {ar:'عصيدة قمح',                    cat:'أطباق عربية', en:'عصيدة قمح', catEn:'Arabic Dishes', cal:140, prot:4,   carb:28,  fat:2},
  {ar:'مرق دجاج (مرقة)',              cat:'أطباق عربية', en:'مرق دجاج (مرقة)', catEn:'Arabic Dishes', cal:15,  prot:2,   carb:0.5, fat:0.4},
  {ar:'شوربة عدس',                    cat:'أطباق عربية', en:'شوربة عدس', catEn:'Arabic Dishes', cal:80,  prot:5,   carb:12,  fat:1},
  {ar:'شوربة دجاج بالشعيرية',         cat:'أطباق عربية', en:'شوربة دجاج بالشعيرية', catEn:'Arabic Dishes', cal:95,  prot:8,   carb:10,  fat:2},
  {ar:'وجبة سلطة تونة (بدون مايونيز)',cat:'أطباق عربية', en:'وجبة سلطة تونة (بدون مايونيز)', catEn:'Arabic Dishes', cal:130, prot:18,  carb:5,   fat:4},

  // ══════════════════════════════════════════════════════════
  // 🫙 صلصات وبهارات وتتبيلات
  // ══════════════════════════════════════════════════════════
  {ar:'حمص بالطحينة',                 cat:'صلصات ودهون', en:'Hummus with Tahini', catEn:'Sauces & Spreads', cal:177, prot:8,   carb:20,  fat:8},
  {ar:'لبنة (زبادي مصفى)',            cat:'صلصات ودهون', en:'Labneh (Strained Yogurt)', catEn:'Sauces & Spreads', cal:140, prot:9,   carb:5,   fat:9},
  {ar:'لبنة بالزيت',                  cat:'صلصات ودهون', en:'Labneh with Olive Oil', catEn:'Sauces & Spreads', cal:180, prot:8,   carb:4,   fat:14},
  {ar:'مربى فراولة (قليلة السكر)',    cat:'صلصات ودهون', en:'Strawberry Jam (low sugar)', catEn:'Sauces & Spreads', cal:85,  prot:0.5, carb:20,  fat:0.1},
  {ar:'مايونيز (قليل الدسم)',         cat:'صلصات ودهون', en:'Light Mayonnaise', catEn:'Sauces & Spreads', cal:332, prot:1,   carb:4,   fat:35},
  {ar:'مايونيز كامل الدسم',           cat:'صلصات ودهون', en:'Full-Fat Mayonnaise', catEn:'Sauces & Spreads', cal:680, prot:1,   carb:0.6, fat:75},
  {ar:'كاتشب طماطم',                  cat:'صلصات ودهون', en:'Tomato Ketchup', catEn:'Sauces & Spreads', cal:112, prot:1.3, carb:27,  fat:0.1},
  {ar:'خردل (مستردة)',                cat:'صلصات ودهون', en:'Mustard', catEn:'Sauces & Spreads', cal:70,  prot:4.4, carb:5.8, fat:3.7},
  {ar:'صلصة سريراشا',                 cat:'صلصات ودهون', en:'Sriracha Sauce', catEn:'Sauces & Spreads', cal:93,  prot:1.7, carb:19,  fat:0.8},
  {ar:'صلصة الصويا (خفيفة الصوديوم)', cat:'صلصات ودهون', en:'Low-Sodium Soy Sauce', catEn:'Sauces & Spreads', cal:53,  prot:8,   carb:5.6, fat:0.1},
  {ar:'خل تفاح',                      cat:'صلصات ودهون', en:'Apple Cider Vinegar', catEn:'Sauces & Spreads', cal:22,  prot:0,   carb:0.9, fat:0},
  {ar:'صلصة الثوم (توم يم)',          cat:'صلصات ودهون', en:'Garlic Sauce (Toum)', catEn:'Sauces & Spreads', cal:450, prot:1,   carb:8,   fat:48},
  {ar:'بابريكا مدخنة',                cat:'صلصات ودهون', en:'بابريكا مدخنة', catEn:'Sauces & Spreads', cal:289, prot:14,  carb:54,  fat:13},

  // ══════════════════════════════════════════════════════════
  // 🍫 مكملات وأطعمة وظيفية
  // ══════════════════════════════════════════════════════════
  {ar:'شوكولاتة داكنة (80% كاكاو)',   cat:'مكملات أخرى', en:'شوكولاتة داكنة (80% كاكاو)', catEn:'Other Supplements', cal:598, prot:8,   carb:46,  fat:43},
  {ar:'مسحوق الكاكاو الخالص',         cat:'مكملات أخرى', en:'مسحوق الكاكاو الخالص', catEn:'Other Supplements', cal:228, prot:20,  carb:58,  fat:14},
  {ar:'ستيفيا (محلي طبيعي)',          cat:'مكملات أخرى', en:'ستيفيا (محلي طبيعي)', catEn:'Other Supplements', cal:0,   prot:0,   carb:0,   fat:0},
  {ar:'إيريتريتول (محلي)',            cat:'مكملات أخرى', en:'إيريتريتول (محلي)', catEn:'Other Supplements', cal:20,  prot:0,   carb:5,   fat:0},
  {ar:'حمض الأميني L-كارنيتين',      cat:'مكملات أخرى', en:'حمض الأميني L-كارنيتين', catEn:'Other Supplements', cal:4,   prot:1,   carb:0,   fat:0},
  {ar:'كافيين (قرص 200مغ)',           cat:'مكملات أخرى', en:'كافيين (قرص 200مغ)', catEn:'Other Supplements', cal:0,   prot:0,   carb:0,   fat:0},
  {ar:'سيترولين مالات (5غ)',          cat:'مكملات أخرى', en:'سيترولين مالات (5غ)', catEn:'Other Supplements', cal:14,  prot:0,   carb:3.5, fat:0},
  {ar:'بيتا ألانين (3غ)',             cat:'مكملات أخرى', en:'بيتا ألانين (3غ)', catEn:'Other Supplements', cal:8,   prot:2,   carb:0,   fat:0},
  {ar:'HMB (1.5غ)',                   cat:'مكملات أخرى', en:'HMB (1.5غ)', catEn:'Other Supplements', cal:6,   prot:1.5, carb:0,   fat:0},
  {ar:'أرجينين (3غ)',                 cat:'مكملات أخرى', en:'أرجينين (3غ)', catEn:'Other Supplements', cal:12,  prot:3,   carb:0,   fat:0},
  {ar:'تريونين (2غ)',                 cat:'مكملات أخرى', en:'تريونين (2غ)', catEn:'Other Supplements', cal:8,   prot:2,   carb:0,   fat:0},
  {ar:'ZMA (زنك + مغنيسيوم)',         cat:'مكملات أخرى', en:'ZMA (زنك + مغنيسيوم)', catEn:'Other Supplements', cal:0,   prot:0,   carb:0,   fat:0},
  {ar:'فيتامين D3 (كبسول)',           cat:'مكملات أخرى', en:'فيتامين D3 (كبسول)', catEn:'Other Supplements', cal:0,   prot:0,   carb:0,   fat:0},
  {ar:'أوميجا 3 عالي التركيز (كبسول)',cat:'مكملات أخرى', en:'أوميجا 3 عالي التركيز (كبسول)', catEn:'Other Supplements', cal:15,  prot:0,   carb:0,   fat:1.5},
  {ar:'بروتين بار (100غ متوسط)',       cat:'مكملات أخرى', en:'بروتين بار (100غ متوسط)', catEn:'Other Supplements', cal:380, prot:30,  carb:38,  fat:10},
  {ar:'حبة طاقة (Energy Gel 30غ)',    cat:'مكملات أخرى', en:'حبة طاقة (Energy Gel 30غ)', catEn:'Other Supplements', cal:80,  prot:0.5, carb:20,  fat:0.5},
  {ar:'مشروب رياضي (250مل)',          cat:'مكملات أخرى', en:'مشروب رياضي (250مل)', catEn:'Other Supplements', cal:63,  prot:0,   carb:15,  fat:0},
  {ar:'كولاجين بودرة (10غ)',          cat:'مكملات أخرى', en:'كولاجين بودرة (10غ)', catEn:'Other Supplements', cal:35,  prot:9,   carb:0,   fat:0},

  // ══════════════════════════════════════════════════════════
  // 🧃 مشروبات
  // ══════════════════════════════════════════════════════════
  {ar:'قهوة سوداء (بدون سكر)',        cat:'مشروبات', en:'قهوة سوداء (بدون سكر)', catEn:'Beverages', cal:2,   prot:0.3, carb:0,   fat:0,  liq:1, liqBase:100},
  {ar:'قهوة بالحليب خالي دسم (200مل)',cat:'مشروبات', en:'قهوة بالحليب خالي دسم (200مل)', catEn:'Beverages', cal:60,  prot:4,   carb:8,   fat:0.5,  liq:1, liqBase:200},
  {ar:'شاي أخضر (كوب)',               cat:'مشروبات', en:'شاي أخضر (كوب)', catEn:'Beverages', cal:3,   prot:0,   carb:0.5, fat:0,  liq:1, liqBase:240},
  {ar:'شاي أسود بدون سكر',            cat:'مشروبات', en:'شاي أسود بدون سكر', catEn:'Beverages', cal:2,   prot:0,   carb:0.4, fat:0,  liq:1, liqBase:100},
  {ar:'عصير برتقال طازج (200مل)',     cat:'مشروبات', en:'عصير برتقال طازج (200مل)', catEn:'Beverages', cal:88,  prot:1.4, carb:21,  fat:0.4,  liq:1, liqBase:200},
  {ar:'عصير تفاح (200مل)',            cat:'مشروبات', en:'عصير تفاح (200مل)', catEn:'Beverages', cal:95,  prot:0.1, carb:24,  fat:0.1,  liq:1, liqBase:200},
  {ar:'حليب لوز غير محلى (200مل)',    cat:'مشروبات', en:'حليب لوز غير محلى (200مل)', catEn:'Beverages', cal:30,  prot:1.4, carb:0.3, fat:2.5,  liq:1, liqBase:200},
  {ar:'حليب الشوفان (200مل)',          cat:'مشروبات', en:'حليب الشوفان (200مل)', catEn:'Beverages', cal:90,  prot:3,   carb:14,  fat:2.5,  liq:1, liqBase:200},
  {ar:'حليب الصويا غير محلى (200مل)', cat:'مشروبات', en:'حليب الصويا غير محلى (200مل)', catEn:'Beverages', cal:54,  prot:5,   carb:3,   fat:2.5,  liq:1, liqBase:200},
  {ar:'كومبوتشا (250مل)',              cat:'مشروبات', en:'كومبوتشا (250مل)', catEn:'Beverages', cal:30,  prot:0,   carb:7,   fat:0,  liq:1, liqBase:250},
  {ar:'مياه جوز الهند (250مل)',        cat:'مشروبات', en:'مياه جوز الهند (250مل)', catEn:'Beverages', cal:48,  prot:1.8, carb:9,   fat:0.5,  liq:1, liqBase:250},
  {ar:'بروتين شيك (مصل + ماء 350مل)', cat:'مشروبات', en:'بروتين شيك (مصل + ماء 350مل)', catEn:'Beverages', cal:130, prot:25,  carb:5,   fat:2,  liq:1, liqBase:350},
  {ar:'لبن رائب (عيران 200مل)',        cat:'مشروبات', en:'لبن رائب (عيران 200مل)', catEn:'Beverages', cal:40,  prot:3.4, carb:4.8, fat:0.5,  liq:1, liqBase:200},
  {ar:'مشروب طاقة (250مل)',            cat:'مشروبات', en:'مشروب طاقة (250مل)', catEn:'Beverages', cal:113, prot:1.1, carb:28,  fat:0,  liq:1, liqBase:250},

  // ══════════════════════════════════════════════════════════
  // 🧀 وجبات خفيفة صحية
  // ══════════════════════════════════════════════════════════
  {ar:'تمر مدجول (حبة كبيرة 24غ)',    cat:'وجبات خفيفة', en:'تمر مدجول (حبة كبيرة 24غ)', catEn:'Snacks', cal:66,  prot:0.4, carb:18,  fat:0.1},
  {ar:'صودا كراكر (قطعة 10غ)',        cat:'وجبات خفيفة', en:'صودا كراكر (قطعة 10غ)', catEn:'Snacks', cal:42,  prot:0.9, carb:7,   fat:1},
  {ar:'كيك رز سادة (قطعة 9غ)',        cat:'وجبات خفيفة', en:'كيك رز سادة (قطعة 9غ)', catEn:'Snacks', cal:35,  prot:0.8, carb:7.4, fat:0.3},
  {ar:'شيبس بطاطس مخبوز (30غ)',       cat:'وجبات خفيفة', en:'شيبس بطاطس مخبوز (30غ)', catEn:'Snacks', cal:130, prot:2,   carb:20,  fat:5},
  {ar:'حلاوة طحينية (30غ)',           cat:'وجبات خفيفة', en:'حلاوة طحينية (30غ)', catEn:'Snacks', cal:165, prot:4,   carb:16,  fat:10},
  {ar:'مقرمشات قمح كامل (30غ)',       cat:'وجبات خفيفة', en:'مقرمشات قمح كامل (30غ)', catEn:'Snacks', cal:115, prot:3,   carb:22,  fat:2},
  {ar:'جرانولا بالمكسرات (50غ)',      cat:'وجبات خفيفة', en:'جرانولا بالمكسرات (50غ)', catEn:'Snacks', cal:220, prot:5,   carb:28,  fat:10},
  {ar:'زبادي + فواكه (200غ)',          cat:'وجبات خفيفة', en:'زبادي + فواكه (200غ)', catEn:'Snacks', cal:135, prot:9,   carb:20,  fat:1.5},
  {ar:'موز + زبدة لوز (1 ملعقة)',     cat:'وجبات خفيفة', en:'Banana + Almond Butter (1 tbsp)', catEn:'Snacks', cal:185, prot:4,   carb:30,  fat:8, unit:'حصة', unitEn:'portion', unitG:135},
  {ar:'تفاح + زبدة فول سوداني',       cat:'وجبات خفيفة', en:'تفاح + زبدة فول سوداني', catEn:'Snacks', cal:180, prot:5,   carb:26,  fat:8},
  {ar:'بيض مسلوق + أفوكادو نصف',     cat:'وجبات خفيفة', en:'بيض مسلوق + أفوكادو نصف', catEn:'Snacks', cal:195, prot:9,   carb:4,   fat:16},
  {ar:'خيار + حمص بالطحينة (3 ملاعق)',cat:'وجبات خفيفة', en:'Cucumber + Hummus (3 tbsp)', catEn:'Snacks', cal:125, prot:6,   carb:13,  fat:5.5},

  // ══════════════════════════════════════════════════════════
  // 🌾 حبوب إضافية ومنتجات
  // ══════════════════════════════════════════════════════════
  {ar:'نخالة القمح',                  cat:'حبوب وأرز', en:'نخالة القمح', catEn:'Grains & Rice', cal:216, prot:16,  carb:65,  fat:4},
  {ar:'جنين القمح',                   cat:'حبوب وأرز', en:'جنين القمح', catEn:'Grains & Rice', cal:360, prot:27,  carb:52,  fat:10},
  {ar:'دقيق كامل القمح',              cat:'حبوب وأرز', en:'دقيق كامل القمح', catEn:'Grains & Rice', cal:340, prot:13,  carb:72,  fat:2.5},
  {ar:'دقيق شوفان',                   cat:'حبوب وأرز', en:'دقيق شوفان', catEn:'Grains & Rice', cal:375, prot:13,  carb:68,  fat:7},
  {ar:'معكرونة من البقوليات مسلوقة', cat:'حبوب وأرز', en:'معكرونة من البقوليات مسلوقة', catEn:'Grains & Rice', cal:132, prot:9,   carb:22,  fat:1.5},
  {ar:'نودلز شيراتاكي (100غ)',         cat:'حبوب وأرز', en:'نودلز شيراتاكي (100غ)', catEn:'Grains & Rice', cal:9,   prot:0.3, carb:2.4, fat:0.2},
  {ar:'خبز العدس (بروتين عالي)',       cat:'خبز ومعجنات', en:'خبز العدس (بروتين عالي)', catEn:'Bread & Pasta', cal:180, prot:12,  carb:26,  fat:3},
  {ar:'خبز البطاطا الحلوة',           cat:'خبز ومعجنات', en:'خبز البطاطا الحلوة', catEn:'Bread & Pasta', cal:195, prot:5,   carb:38,  fat:3},
  {ar:'بانكيك الشوفان (بدون سكر)',    cat:'خبز ومعجنات', en:'بانكيك الشوفان (بدون سكر)', catEn:'Bread & Pasta', cal:230, prot:10,  carb:35,  fat:6},
  {ar:'وافل البروتين',                cat:'خبز ومعجنات', en:'وافل البروتين', catEn:'Bread & Pasta', cal:280, prot:22,  carb:30,  fat:7},

  // ══════════════════════════════════════════════════════════
  // 🐟 أسماك وبحريات إضافية
  // ══════════════════════════════════════════════════════════
  {ar:'سمك الكود (قد) مشوي',          cat:'أسماك وبحريات', en:'سمك الكود (قد) مشوي', catEn:'Fish & Seafood', cal:105, prot:23,  carb:0,   fat:0.9},
  {ar:'سمك الباس المخطط مشوي',        cat:'أسماك وبحريات', en:'سمك الباس المخطط مشوي', catEn:'Fish & Seafood', cal:124, prot:23,  carb:0,   fat:3},
  {ar:'سمك الفورال (تراوت) مشوي',    cat:'أسماك وبحريات', en:'سمك الفورال (تراوت) مشوي', catEn:'Fish & Seafood', cal:190, prot:26,  carb:0,   fat:9},
  {ar:'سمك الزبيدي (بومفريت) مشوي',  cat:'أسماك وبحريات', en:'سمك الزبيدي (بومفريت) مشوي', catEn:'Fish & Seafood', cal:155, prot:25,  carb:0,   fat:6},
  {ar:'سمك السنغاري مشوي',            cat:'أسماك وبحريات', en:'سمك السنغاري مشوي', catEn:'Fish & Seafood', cal:140, prot:27,  carb:0,   fat:3},
  {ar:'سمك القاروص البحري',           cat:'أسماك وبحريات', en:'سمك القاروص البحري', catEn:'Fish & Seafood', cal:136, prot:28,  carb:0,   fat:2.5},
  {ar:'لحم السمك المدخن (سلمون)',     cat:'أسماك وبحريات', en:'لحم السمك المدخن (سلمون)', catEn:'Fish & Seafood', cal:177, prot:19,  carb:0,   fat:11},
  {ar:'كاويار (بيض سمك)',             cat:'أسماك وبحريات', en:'كاويار (بيض سمك)', catEn:'Fish & Seafood', cal:264, prot:25,  carb:4,   fat:18},

  // ══════════════════════════════════════════════════════════
  // 🥚 بيض وألبان إضافية
  // ══════════════════════════════════════════════════════════
  {ar:'جبن موزاريلا طازجة',           cat:'بيض وألبان', en:'جبن موزاريلا طازجة', catEn:'Eggs & Dairy', cal:280, prot:17,  carb:2,   fat:22},
  {ar:'جبن الحلوم مشوية',             cat:'بيض وألبان', en:'جبن الحلوم مشوية', catEn:'Eggs & Dairy', cal:321, prot:21,  carb:0.5, fat:26},
  {ar:'زبادي عالي البروتين (سكير)',   cat:'بيض وألبان', en:'زبادي عالي البروتين (سكير)', catEn:'Eggs & Dairy', cal:65,  prot:11,  carb:4,   fat:0.5},
  {ar:'كيفير (لبن مخمر 200مل)',        cat:'بيض وألبان', en:'كيفير (لبن مخمر 200مل)', catEn:'Eggs & Dairy', cal:61,  prot:3.5, carb:7.5, fat:2},
  {ar:'جبن قريش بالخيار والأعشاب',   cat:'بيض وألبان', en:'جبن قريش بالخيار والأعشاب', catEn:'Eggs & Dairy', cal:90,  prot:10,  carb:4,   fat:3.5},
  {ar:'بيض كامل + بياض إضافي (3+2)',  cat:'بيض وألبان', en:'بيض كامل + بياض إضافي (3+2)', catEn:'Eggs & Dairy', cal:220, prot:26,  carb:1,   fat:11},
  {ar:'أومليت بالخضروات (بدون زيت)',  cat:'بيض وألبان', en:'أومليت بالخضروات (بدون زيت)', catEn:'Eggs & Dairy', cal:145, prot:12,  carb:4,   fat:9},
  {ar:'بيض مسلوق لين (5 دقائق)',      cat:'بيض وألبان', en:'بيض مسلوق لين (5 دقائق)', catEn:'Eggs & Dairy', cal:155, prot:13,  carb:1.1, fat:11},

  // ══════════════════════════════════════════════════════════
  // 🌿 أعشاب وتوابل مشتركة في الرياضة
  // ══════════════════════════════════════════════════════════
  {ar:'كركم (ملعقة 5غ)',              cat:'أعشاب وتوابل', en:'كركم (ملعقة 5غ)', catEn:'Herbs & Spices', cal:15,  prot:0.5, carb:3,   fat:0.4},
  {ar:'زنجبيل طازج (10غ)',            cat:'أعشاب وتوابل', en:'زنجبيل طازج (10غ)', catEn:'Herbs & Spices', cal:8,   prot:0.2, carb:1.8, fat:0.1},
  {ar:'قرفة (ملعقة صغيرة)',           cat:'أعشاب وتوابل', en:'قرفة (ملعقة صغيرة)', catEn:'Herbs & Spices', cal:6,   prot:0.1, carb:2,   fat:0.1},
  {ar:'حبة البركة (نيجيلا 5غ)',        cat:'أعشاب وتوابل', en:'حبة البركة (نيجيلا 5غ)', catEn:'Herbs & Spices', cal:23,  prot:1,   carb:2.5, fat:1.5},
  {ar:'الحلبة (بذور 5غ)',             cat:'أعشاب وتوابل', en:'الحلبة (بذور 5غ)', catEn:'Herbs & Spices', cal:12,  prot:0.9, carb:2.2, fat:0.4},
  {ar:'فلفل أسود مطحون',              cat:'أعشاب وتوابل', en:'فلفل أسود مطحون', catEn:'Herbs & Spices', cal:251, prot:10,  carb:64,  fat:3},
  {ar:'كمون مطحون',                   cat:'أعشاب وتوابل', en:'كمون مطحون', catEn:'Herbs & Spices', cal:375, prot:18,  carb:44,  fat:22},
  {ar:'إكليل الجبل (روزماري)',         cat:'أعشاب وتوابل', en:'Rosemary', catEn:'Herbs & Spices', cal:131, prot:3,   carb:21,  fat:5.9},

  // ══════════════════════════════════════════════════════════
  // سلطات — Salads
  // ══════════════════════════════════════════════════════════
  {ar:'سلطة خضراء بسيطة (خس + خيار + طماطم)',      cat:'سلطات', en:'Simple Green Salad (lettuce, cucumber, tomato)', catEn:'Salads', cal:25,  prot:1.5, carb:4,   fat:0.3},
  {ar:'سلطة خضراء بزيت الزيتون',                    cat:'سلطات', en:'Green Salad with Olive Oil',                     catEn:'Salads', cal:75,  prot:1.5, carb:4,   fat:6},
  {ar:'سلطة فتوش',                                   cat:'سلطات', en:'Fattoush Salad',                                 catEn:'Salads', cal:90,  prot:2.5, carb:14,  fat:3},
  {ar:'سلطة تبولة (بدون خبز)',                        cat:'سلطات', en:'Tabbouleh (no bread)',                           catEn:'Salads', cal:80,  prot:3,   carb:12,  fat:2.5},
  {ar:'سلطة سيزر (بدون كروتون)',                     cat:'سلطات', en:'Caesar Salad (no croutons)',                     catEn:'Salads', cal:110, prot:5,   carb:4,   fat:9},
  {ar:'سلطة سيزر كاملة (مع كروتون)',                 cat:'سلطات', en:'Caesar Salad (with croutons)',                   catEn:'Salads', cal:175, prot:6,   carb:15,  fat:11},
  {ar:'سلطة يونانية (خضار + زيتون + جبن فيتا)',      cat:'سلطات', en:'Greek Salad (veggies, olives, feta)',            catEn:'Salads', cal:140, prot:5,   carb:8,   fat:10},
  {ar:'سلطة روكيت بالبارميزان',                      cat:'سلطات', en:'Rocket Salad with Parmesan',                    catEn:'Salads', cal:120, prot:6,   carb:4,   fat:9},
  {ar:'سلطة الكول سلو (كرنب + جزر)',                 cat:'سلطات', en:'Coleslaw (cabbage, carrot)',                     catEn:'Salads', cal:95,  prot:1.5, carb:10,  fat:5.5},
  {ar:'سلطة الكول سلو (خالي دسم)',                   cat:'سلطات', en:'Light Coleslaw (low fat)',                       catEn:'Salads', cal:55,  prot:1.5, carb:10,  fat:1},
  {ar:'سلطة تونة وخضار',                             cat:'سلطات', en:'Tuna & Vegetable Salad',                        catEn:'Salads', cal:130, prot:18,  carb:5,   fat:4},
  {ar:'سلطة دجاج مشوي وخضار',                        cat:'سلطات', en:'Grilled Chicken & Veggie Salad',                catEn:'Salads', cal:160, prot:22,  carb:6,   fat:5},
  {ar:'سلطة السلمون المدخن',                          cat:'سلطات', en:'Smoked Salmon Salad',                           catEn:'Salads', cal:155, prot:15,  carb:5,   fat:8},
  {ar:'سلطة العدس والبقدونس',                         cat:'سلطات', en:'Lentil & Parsley Salad',                        catEn:'Salads', cal:120, prot:8,   carb:18,  fat:2},
  {ar:'سلطة الفاصولياء البيضاء',                     cat:'سلطات', en:'White Bean Salad',                               catEn:'Salads', cal:130, prot:8,   carb:20,  fat:2.5},
  {ar:'سلطة الحمص بالخضار الطازجة',                  cat:'سلطات', en:'Chickpea & Fresh Veggie Salad',                 catEn:'Salads', cal:145, prot:7,   carb:22,  fat:3},
  {ar:'سلطة الأفوكادو والطماطم',                     cat:'سلطات', en:'Avocado & Tomato Salad',                        catEn:'Salads', cal:160, prot:2.5, carb:7,   fat:13},
  {ar:'سلطة الكينوا والخضار',                         cat:'سلطات', en:'Quinoa & Vegetable Salad',                      catEn:'Salads', cal:170, prot:6,   carb:26,  fat:5},
  {ar:'سلطة المارولا والخيار (بدون تتبيلة)',          cat:'سلطات', en:'Romaine & Cucumber Salad (plain)',               catEn:'Salads', cal:20,  prot:1.2, carb:3,   fat:0.2},
  {ar:'سلطة الكيل والتفاح',                           cat:'سلطات', en:'Kale & Apple Salad',                            catEn:'Salads', cal:115, prot:3,   carb:18,  fat:3.5},
  {ar:'سلطة الجرجير والرمان',                         cat:'سلطات', en:'Arugula & Pomegranate Salad',                   catEn:'Salads', cal:95,  prot:2.5, carb:14,  fat:3.5},
  {ar:'سلطة المنطقة (طماطم + بصل + بقدونس)',         cat:'سلطات', en:'Shepherd Salad (tomato, onion, parsley)',        catEn:'Salads', cal:45,  prot:2,   carb:9,   fat:0.5},

  // ══════════════════════════════════════════════════════════
  // خضار سوتية — Sautéed Vegetables
  // ══════════════════════════════════════════════════════════
  {ar:'خضار سوتية مشكلة (بزيت زيتون)',               cat:'خضار سوتية', en:'Mixed Sautéed Vegetables (olive oil)',       catEn:'Sautéed Vegetables', cal:90,  prot:2.5, carb:9,   fat:5},
  {ar:'سبانخ سوتية بالثوم',                           cat:'خضار سوتية', en:'Sautéed Spinach with Garlic',               catEn:'Sautéed Vegetables', cal:65,  prot:3.5, carb:5,   fat:3.5},
  {ar:'كوسا سوتية بالثوم والزيتون',                   cat:'خضار سوتية', en:'Sautéed Zucchini with Garlic & Olive Oil',  catEn:'Sautéed Vegetables', cal:75,  prot:2,   carb:6,   fat:4.5},
  {ar:'بروكلي سوتية بالثوم',                          cat:'خضار سوتية', en:'Sautéed Broccoli with Garlic',               catEn:'Sautéed Vegetables', cal:70,  prot:4,   carb:7,   fat:3.5},
  {ar:'فلفل ألوان سوتية',                             cat:'خضار سوتية', en:'Sautéed Coloured Bell Peppers',              catEn:'Sautéed Vegetables', cal:60,  prot:1.5, carb:10,  fat:2.5},
  {ar:'فطر سوتية بالثوم والبقدونس',                   cat:'خضار سوتية', en:'Sautéed Mushrooms with Garlic & Parsley',   catEn:'Sautéed Vegetables', cal:70,  prot:3.5, carb:5,   fat:4},
  {ar:'باذنجان سوتي بالطماطم',                         cat:'خضار سوتية', en:'Sautéed Eggplant with Tomato',              catEn:'Sautéed Vegetables', cal:85,  prot:2,   carb:10,  fat:4},
  {ar:'قرنبيط سوتي بالكركم',                           cat:'خضار سوتية', en:'Sautéed Cauliflower with Turmeric',         catEn:'Sautéed Vegetables', cal:65,  prot:3,   carb:8,   fat:3},
  {ar:'هليون سوتي بزيت الزيتون',                      cat:'خضار سوتية', en:'Sautéed Asparagus with Olive Oil',           catEn:'Sautéed Vegetables', cal:60,  prot:3.5, carb:5,   fat:3},
  {ar:'بامية سوتية بالطماطم',                          cat:'خضار سوتية', en:'Sautéed Okra with Tomato',                  catEn:'Sautéed Vegetables', cal:65,  prot:2,   carb:9,   fat:2.5},
  {ar:'جزر سوتي بالزنجبيل',                           cat:'خضار سوتية', en:'Sautéed Carrots with Ginger',               catEn:'Sautéed Vegetables', cal:70,  prot:1.5, carb:12,  fat:2.5},
  {ar:'خضار سوتية بالصلصة الصينية',                   cat:'خضار سوتية', en:'Stir-Fry Vegetables with Soy Sauce',        catEn:'Sautéed Vegetables', cal:80,  prot:3,   carb:10,  fat:3},
  {ar:'ذرة سوتية بالزبدة (بدون زبدة)',                cat:'خضار سوتية', en:'Sautéed Corn (no butter)',                   catEn:'Sautéed Vegetables', cal:90,  prot:3,   carb:18,  fat:1.5},
  {ar:'كرنب سوتي بالثوم والزيتون',                    cat:'خضار سوتية', en:'Sautéed Cabbage with Garlic & Olive Oil',   catEn:'Sautéed Vegetables', cal:65,  prot:2,   carb:7,   fat:3.5},
  {ar:'فاصولياء خضراء سوتية',                         cat:'خضار سوتية', en:'Sautéed Green Beans',                       catEn:'Sautéed Vegetables', cal:55,  prot:2.5, carb:7,   fat:2.5},
  {ar:'بازلاء سوتية بالبصل',                          cat:'خضار سوتية', en:'Sautéed Green Peas with Onion',             catEn:'Sautéed Vegetables', cal:85,  prot:5,   carb:13,  fat:2},
  {ar:'خضار سوتية مشكلة مع دجاج',                    cat:'خضار سوتية', en:'Mixed Sautéed Veggies with Chicken',        catEn:'Sautéed Vegetables', cal:165, prot:18,  carb:9,   fat:6},
  {ar:'خضار سوتية مشكلة مع جمبري',                   cat:'خضار سوتية', en:'Mixed Sautéed Veggies with Shrimp',         catEn:'Sautéed Vegetables', cal:150, prot:17,  carb:9,   fat:5},

  // ══════════════════════════════════════════════════════════
  // 🍽️ أطباق عربية إضافية — v2 upgrade
  // ══════════════════════════════════════════════════════════
  {ar:'محشي كوسا باللحمة',            cat:'أطباق عربية', en:'Stuffed Zucchini with Meat', catEn:'Arabic Dishes', cal:120, prot:6,   carb:13,  fat:5},
  {ar:'ورق عنب محشي (لحمة وأرز)',      cat:'أطباق عربية', en:'Stuffed Vine Leaves (meat & rice)', catEn:'Arabic Dishes', cal:130, prot:5,   carb:16,  fat:4.5},
  {ar:'بامية باللحمة',                cat:'أطباق عربية', en:'Okra Stew with Meat', catEn:'Arabic Dishes', cal:120, prot:9,   carb:10,  fat:5.5},
  {ar:'مسقعة باللحمة',                cat:'أطباق عربية', en:'Moussaka with Meat', catEn:'Arabic Dishes', cal:130, prot:8,   carb:13,  fat:6},
  {ar:'مكرونة بشاميل',                cat:'أطباق عربية', en:'Baked Pasta Bechamel', catEn:'Arabic Dishes', cal:155, prot:8,   carb:17,  fat:6.5},
  {ar:'مشويات مشكلة مشوية',           cat:'أطباق عربية', en:'Mixed Grill Platter', catEn:'Arabic Dishes', cal:210, prot:24,  carb:0,   fat:12},
  {ar:'بانيه دجاج بالفرن (بدون قلي)',  cat:'أطباق عربية', en:'Oven Chicken Schnitzel (no frying)', catEn:'Arabic Dishes', cal:175, prot:22,  carb:12,  fat:4.5},
  {ar:'ناجتس دجاج بالفرن',            cat:'أطباق عربية', en:'Baked Chicken Nuggets', catEn:'Arabic Dishes', cal:200, prot:16,  carb:17,  fat:8},
  {ar:'برجر دجاج مشوي (بدون خبز)',    cat:'أطباق عربية', en:'Grilled Chicken Burger Patty (no bread)', catEn:'Arabic Dishes', cal:165, prot:22,  carb:2,   fat:8},
  {ar:'برجر لحم مشوي (بدون خبز)',     cat:'أطباق عربية', en:'Grilled Beef Burger Patty (no bread)', catEn:'Arabic Dishes', cal:240, prot:23,  carb:1,   fat:15},
  {ar:'كبة مشوية',                    cat:'أطباق عربية', en:'Baked Kibbeh', catEn:'Arabic Dishes', cal:200, prot:10,  carb:20,  fat:9},
  {ar:'شيش طاووق مشوي',               cat:'أطباق عربية', en:'Shish Tawook Grilled', catEn:'Arabic Dishes', cal:175, prot:24,  carb:2,   fat:8},

  // ══════════════════════════════════════════════════════════
  // 🥚 بيض وألبان إضافية — v2 upgrade
  // ══════════════════════════════════════════════════════════
  {ar:'زبادي سادة كامل الدسم',        cat:'بيض وألبان', en:'Plain Full-Fat Yogurt', catEn:'Eggs & Dairy', cal:61,  prot:3.5, carb:4.7, fat:3.3},
  {ar:'زبادي سادة خالي الدسم',        cat:'بيض وألبان', en:'Plain Fat-Free Yogurt', catEn:'Eggs & Dairy', cal:56,  prot:5.7, carb:7.7, fat:0.2},
  {ar:'جبن كيري لايت (مثلثات)',        cat:'بيض وألبان', en:'Light Cream Cheese Triangles', catEn:'Eggs & Dairy', cal:200, prot:9,   carb:6,   fat:16},
  {ar:'لبنة خالية الدسم',              cat:'بيض وألبان', en:'Fat-Free Labneh', catEn:'Eggs & Dairy', cal:100, prot:12,  carb:4,   fat:2.5},

  // ══════════════════════════════════════════════════════════
  // 🧃 مشروبات إضافية — v2 upgrade
  // ══════════════════════════════════════════════════════════
  {ar:'موهيتو بدون سكر (250مل)',       cat:'مشروبات', en:'Sugar-Free Mojito (250ml)', catEn:'Beverages', cal:12,  prot:0,   carb:3,   fat:0,  liq:1, liqBase:250},
  {ar:'كاكاو بالحليب خالي دسم (250مل)',cat:'مشروبات', en:'Cocoa with Skim Milk (250ml)', catEn:'Beverages', cal:120, prot:8,   carb:18,  fat:2.5,  liq:1, liqBase:250},
  {ar:'عصير مانجو طازج (200مل)',       cat:'مشروبات', en:'Fresh Mango Juice (200ml)', catEn:'Beverages', cal:90,  prot:0.6, carb:22,  fat:0.3,  liq:1, liqBase:200},
  {ar:'ليموناضة طازجة بدون سكر',       cat:'مشروبات', en:'Fresh Lemonade (no sugar)', catEn:'Beverages', cal:14,  prot:0,   carb:4,   fat:0,  liq:1, liqBase:100},
  {ar:'قهوة باردة كولد برو بدون سكر',  cat:'مشروبات', en:'Iced Cold Brew Coffee (no sugar)', catEn:'Beverages', cal:5,   prot:0.3, carb:0.5, fat:0,  liq:1, liqBase:100},

  // ══════════════════════════════════════════════════════════
  // 🍌 فواكه إضافية — v2 upgrade
  // ══════════════════════════════════════════════════════════
  {ar:'جوافة',                        cat:'فواكه', en:'Guava', catEn:'Fruits', cal:68,  prot:2.6, carb:14,  fat:1},
  {ar:'كرز',                          cat:'فواكه', en:'Cherries', catEn:'Fruits', cal:63,  prot:1.1, carb:16,  fat:0.2},

  // ══════════════════════════════════════════════════════════
  // 🧃 عصائر ومشروبات — v3 expansion (سائلة: لتر/كوب/مل)
  // ══════════════════════════════════════════════════════════
  {ar:'عصير جوافة طازج (200مل)',      cat:'مشروبات', en:'Fresh Guava Juice (200ml)', catEn:'Beverages', cal:66,  prot:1.2, carb:15,  fat:0.5,  liq:1, liqBase:200},
  {ar:'عصير فراولة طازج (200مل)',     cat:'مشروبات', en:'Fresh Strawberry Juice (200ml)', catEn:'Beverages', cal:48,  prot:0.9, carb:11,  fat:0.3,  liq:1, liqBase:200},
  {ar:'عصير بطيخ طازج (250مل)',       cat:'مشروبات', en:'Fresh Watermelon Juice (250ml)', catEn:'Beverages', cal:38,  prot:0.8, carb:9,   fat:0.1,  liq:1, liqBase:250},
  {ar:'عصير عنب طازج (200مل)',        cat:'مشروبات', en:'Fresh Grape Juice (200ml)', catEn:'Beverages', cal:128, prot:0.8, carb:31,  fat:0.3,  liq:1, liqBase:200},
  {ar:'عصير رمان طازج (200مل)',       cat:'مشروبات', en:'Fresh Pomegranate Juice (200ml)', catEn:'Beverages', cal:104, prot:1.3, carb:25,  fat:0.9,  liq:1, liqBase:200},
  {ar:'عصير أناناس طازج (200مل)',     cat:'مشروبات', en:'Fresh Pineapple Juice (200ml)', catEn:'Beverages', cal:94,  prot:1,   carb:22,  fat:0.2,  liq:1, liqBase:200},
  {ar:'عصير جزر طازج (200مل)',        cat:'مشروبات', en:'Fresh Carrot Juice (200ml)', catEn:'Beverages', cal:76,  prot:1.6, carb:17,  fat:0.3,  liq:1, liqBase:200},
  {ar:'عصير طماطم طازج (200مل)',      cat:'مشروبات', en:'Fresh Tomato Juice (200ml)', catEn:'Beverages', cal:36,  prot:1.8, carb:7,   fat:0.2,  liq:1, liqBase:200},
  {ar:'عصير كوكتيل فواكه (250مل)',    cat:'مشروبات', en:'Fruit Cocktail Juice (250ml)', catEn:'Beverages', cal:120, prot:1.5, carb:29,  fat:0.5,  liq:1, liqBase:250},
  {ar:'سموذي مانجو بالحليب (300مل)',  cat:'مشروبات', en:'Mango Milk Smoothie (300ml)', catEn:'Beverages', cal:210, prot:5,   carb:36,  fat:5,  liq:1, liqBase:300},
  {ar:'عصير قصب السكر (200مل)',       cat:'مشروبات', en:'Sugarcane Juice (200ml)', catEn:'Beverages', cal:150, prot:0.2, carb:38,  fat:0,  liq:1, liqBase:200},
  {ar:'عصير ليمون بالنعناع بدون سكر (250مل)',cat:'مشروبات', en:'Lemon Mint (no sugar, 250ml)', catEn:'Beverages', cal:18,  prot:0.4, carb:5,   fat:0,  liq:1, liqBase:250},
  {ar:'عصير ليموناضة بالسكر (250مل)', cat:'مشروبات', en:'Sweetened Lemonade (250ml)', catEn:'Beverages', cal:100, prot:0.2, carb:26,  fat:0,  liq:1, liqBase:250},
  {ar:'سموذي فراولة موز بالحليب (300مل)',cat:'مشروبات', en:'Strawberry Banana Smoothie (300ml)', catEn:'Beverages', cal:180, prot:5.5, carb:30,  fat:4,  liq:1, liqBase:300},
  {ar:'سموذي أخضر (سبانخ وتفاح 300مل)',cat:'مشروبات', en:'Green Smoothie (spinach & apple, 300ml)', catEn:'Beverages', cal:110, prot:2.5, carb:24,  fat:1,  liq:1, liqBase:300},
  {ar:'ميلك شيك فانيليا (300مل)',     cat:'مشروبات', en:'Vanilla Milkshake (300ml)', catEn:'Beverages', cal:315, prot:8,   carb:46,  fat:11,  liq:1, liqBase:300},
  {ar:'ميلك شيك شوكولاتة (300مل)',    cat:'مشروبات', en:'Chocolate Milkshake (300ml)', catEn:'Beverages', cal:345, prot:9,   carb:50,  fat:12,  liq:1, liqBase:300},
  {ar:'مياه معدنية (لتر)',            cat:'مشروبات', en:'Mineral Water (1L)', catEn:'Beverages', cal:0,   prot:0,   carb:0,   fat:0,  liq:1, liqBase:1000},
  {ar:'مياه فوارة بدون سكر (330مل)',  cat:'مشروبات', en:'Sugar-Free Sparkling Water (330ml)', catEn:'Beverages', cal:0,   prot:0,   carb:0,   fat:0,  liq:1, liqBase:330},
  {ar:'كوكاكولا (330مل)',             cat:'مشروبات', en:'Coca-Cola (330ml)', catEn:'Beverages', cal:139, prot:0,   carb:35,  fat:0,  liq:1, liqBase:330},
  {ar:'كوكاكولا دايت (330مل)',        cat:'مشروبات', en:'Diet Coke (330ml)', catEn:'Beverages', cal:1,   prot:0,   carb:0,   fat:0,  liq:1, liqBase:330},
  {ar:'بيبسي (330مل)',                cat:'مشروبات', en:'Pepsi (330ml)', catEn:'Beverages', cal:141, prot:0,   carb:35,  fat:0,  liq:1, liqBase:330},
  {ar:'سفن أب (330مل)',               cat:'مشروبات', en:'7UP (330ml)', catEn:'Beverages', cal:140, prot:0,   carb:35,  fat:0,  liq:1, liqBase:330},
  {ar:'فانتا برتقال (330مل)',         cat:'مشروبات', en:'Fanta Orange (330ml)', catEn:'Beverages', cal:160, prot:0,   carb:39,  fat:0,  liq:1, liqBase:330},
  {ar:'إسبريسو سادة (30مل)',          cat:'مشروبات', en:'Espresso (30ml)', catEn:'Beverages', cal:3,   prot:0.2, carb:0.5, fat:0,  liq:1, liqBase:30},
  {ar:'لاتيه بالحليب خالي الدسم (250مل)',cat:'مشروبات', en:'Latte with Skim Milk (250ml)', catEn:'Beverages', cal:95,  prot:7.5, carb:10,  fat:1,  liq:1, liqBase:250},
  {ar:'كابتشينو (150مل)',             cat:'مشروبات', en:'Cappuccino (150ml)', catEn:'Beverages', cal:75,  prot:5,   carb:7,   fat:3,  liq:1, liqBase:150},
  {ar:'قهوة موكا بالحليب (250مل)',    cat:'مشروبات', en:'Mocha Coffee with Milk (250ml)', catEn:'Beverages', cal:150, prot:6.5, carb:17,  fat:5.5,  liq:1, liqBase:250},
  {ar:'آيس كوفي بالحليب (250مل)',     cat:'مشروبات', en:'Iced Coffee with Milk (250ml)', catEn:'Beverages', cal:110, prot:5,   carb:12,  fat:3.5,  liq:1, liqBase:250},
  {ar:'فرابيه كارميل (350مل)',        cat:'مشروبات', en:'Caramel Frappe (350ml)', catEn:'Beverages', cal:320, prot:6,   carb:54,  fat:9,  liq:1, liqBase:350},
  {ar:'هوت شوكليت بالحليب (250مل)',   cat:'مشروبات', en:'Hot Chocolate with Milk (250ml)', catEn:'Beverages', cal:200, prot:7,   carb:28,  fat:6.5,  liq:1, liqBase:250},
  {ar:'كاكاو ساخن بدون سكر (250مل)',  cat:'مشروبات', en:'Sugar-Free Hot Cocoa (250ml)', catEn:'Beverages', cal:80,  prot:5,   carb:10,  fat:2.5,  liq:1, liqBase:250},
  {ar:'شاي بالحليب (كوب 240مل)',      cat:'مشروبات', en:'Milk Tea (240ml cup)', catEn:'Beverages', cal:80,  prot:4,   carb:10,  fat:3,  liq:1, liqBase:240},
  {ar:'شاي بالنعناع بدون سكر (200مل)',cat:'مشروبات', en:'Mint Tea (no sugar, 200ml)', catEn:'Beverages', cal:5,   prot:0,   carb:1,   fat:0,  liq:1, liqBase:200},
  {ar:'كركديه بدون سكر (200مل)',      cat:'مشروبات', en:'Hibiscus Tea (no sugar, 200ml)', catEn:'Beverages', cal:12,  prot:0,   carb:3,   fat:0,  liq:1, liqBase:200},
  {ar:'لبن عيران خالي الدسم (250مل)', cat:'مشروبات', en:'Fat-Free Ayran (250ml)', catEn:'Beverages', cal:50,  prot:4,   carb:5.5, fat:0.5,  liq:1, liqBase:250},
  {ar:'شيك بروتين + حليب (410مل)',    cat:'مشروبات', en:'Protein Shake with Milk (410ml)', catEn:'Beverages', cal:255, prot:35,  carb:12,  fat:6.5,  liq:1, liqBase:410},
  {ar:'حليب طازج كامل الدسم (250مل)', cat:'مشروبات', en:'Whole Fresh Milk (250ml)', catEn:'Beverages', cal:155, prot:8,   carb:12,  fat:8,  liq:1, liqBase:250},
  {ar:'حليب طازج خالي الدسم (250مل)', cat:'مشروبات', en:'Skim Fresh Milk (250ml)', catEn:'Beverages', cal:85,  prot:8.5, carb:12,  fat:0.3,  liq:1, liqBase:250},

  // ══════════════════════════════════════════════════════════
  // 🍎 فواكه إضافية — v3 expansion
  // ══════════════════════════════════════════════════════════
  {ar:'نكتارين',                      cat:'فواكه', en:'Nectarine', catEn:'Fruits', cal:44,  prot:1.1, carb:10.6,fat:0.3},
  {ar:'برقوق (خوخ شوكي)',             cat:'فواكه', en:'Plum', catEn:'Fruits', cal:46,  prot:0.7, carb:11,  fat:0.3},
  {ar:'مشمش طازج',                    cat:'فواكه', en:'Fresh Apricot', catEn:'Fruits', cal:48,  prot:1.4, carb:11,  fat:0.4},
  {ar:'توت بلدي طازج',                cat:'فواكه', en:'Fresh Mulberries', catEn:'Fruits', cal:43,  prot:1.4, carb:10,  fat:0.4},
  {ar:'ليتشي طازج',                   cat:'فواكه', en:'Fresh Lychee', catEn:'Fruits', cal:66,  prot:0.7, carb:17,  fat:0.4},
  {ar:'كاكي (برسيمون)',               cat:'فواكه', en:'Persimmon', catEn:'Fruits', cal:70,  prot:0.6, carb:18.6,fat:0.2},
  {ar:'باشن فروت طازج',               cat:'فواكه', en:'Fresh Passion Fruit', catEn:'Fruits', cal:97,  prot:2.2, carb:23,  fat:0.7},
  {ar:'سفرجل',                        cat:'فواكه', en:'Quince', catEn:'Fruits', cal:57,  prot:0.4, carb:15,  fat:0.1},
  {ar:'تين مجفف',                     cat:'فواكه', en:'Dried Figs', catEn:'Fruits', cal:249, prot:3.3, carb:63,  fat:1},
  {ar:'بطيخ أصفر',                    cat:'فواكه', en:'Yellow Watermelon', catEn:'Fruits', cal:31,  prot:0.5, carb:7.6, fat:0.2},

  // ══════════════════════════════════════════════════════════
  // 🥬 خضروات وأعشاب إضافية — v3 expansion
  // ══════════════════════════════════════════════════════════
  {ar:'بقدونس طازج',                  cat:'خضروات', en:'Fresh Parsley', catEn:'Vegetables', cal:36,  prot:3,   carb:6.3, fat:0.8},
  {ar:'كزبرة خضراء',                  cat:'خضروات', en:'Fresh Coriander', catEn:'Vegetables', cal:23,  prot:2.1, carb:3.7, fat:0.5},
  {ar:'نعناع طازج',                   cat:'خضروات', en:'Fresh Mint', catEn:'Vegetables', cal:44,  prot:3.3, carb:8,   fat:0.7},
  {ar:'كرفس طازج',                    cat:'خضروات', en:'Fresh Celery', catEn:'Vegetables', cal:16,  prot:0.7, carb:3,   fat:0.2},
  {ar:'ريحان طازج',                   cat:'خضروات', en:'Fresh Basil', catEn:'Vegetables', cal:23,  prot:3.2, carb:2.7, fat:0.6},
  {ar:'شبت طازج',                     cat:'خضروات', en:'Fresh Dill', catEn:'Vegetables', cal:33,  prot:3.5, carb:7,   fat:1},
  {ar:'جرجير طازج',                   cat:'خضروات', en:'Fresh Arugula', catEn:'Vegetables', cal:25,  prot:2.6, carb:3.7, fat:0.7},
  {ar:'بامية مسلوقة',                 cat:'خضروات', en:'Boiled Okra', catEn:'Vegetables', cal:21,  prot:1.9, carb:4.3, fat:0.2},
  {ar:'فلفل حار أخضر',                cat:'خضروات', en:'Hot Green Pepper', catEn:'Vegetables', cal:40,  prot:2,   carb:9,   fat:0.4},

  // ══════════════════════════════════════════════════════════
  // 🥩 بروتينات إضافية — v3 expansion
  // ══════════════════════════════════════════════════════════
  {ar:'سلامي (شرائح)',                cat:'لحوم حمراء', en:'Salami Slices', catEn:'Red Meat', cal:400, prot:22,  carb:2,   fat:33},
  {ar:'بسطرمة',                       cat:'لحوم حمراء', en:'Pastirma (Cured Beef)', catEn:'Red Meat', cal:240, prot:33,  carb:1,   fat:11},
  {ar:'مرتديلا دجاج',                 cat:'دواجن', en:'Chicken Mortadella', catEn:'Poultry', cal:180, prot:14,  carb:4,   fat:12},
  {ar:'لانشون دجاج',                  cat:'دواجن', en:'Chicken Luncheon Meat', catEn:'Poultry', cal:160, prot:14,  carb:5,   fat:9},
  {ar:'سمان مشوي (بدون جلد)',         cat:'دواجن', en:'Grilled Quail (no skin)', catEn:'Poultry', cal:168, prot:25,  carb:0,   fat:7},
  {ar:'جمبري مقلي',                   cat:'أسماك وبحريات', en:'Fried Shrimp', catEn:'Fish & Seafood', cal:240, prot:20,  carb:12,  fat:13},
  {ar:'سمك بلطي مقلي',                cat:'أسماك وبحريات', en:'Fried Tilapia', catEn:'Fish & Seafood', cal:210, prot:23,  carb:5,   fat:11},
  {ar:'جبن رومي',                     cat:'بيض وألبان', en:'Romy Cheese', catEn:'Eggs & Dairy', cal:380, prot:26,  carb:2,   fat:30},

  // ══════════════════════════════════════════════════════════
  // 🍔 أكل سريع وبطاطس مقلية — v3 expansion
  // ══════════════════════════════════════════════════════════
  {ar:'بطاطس محمرة (فريز)',           cat:'بطاطس وجذور', en:'French Fries', catEn:'Potatoes & Roots', cal:312, prot:3.4, carb:41,  fat:15},
  {ar:'شيبس بطاطس عادي (50غ)',        cat:'وجبات خفيفة', en:'Regular Potato Chips (50g)', catEn:'Snacks', cal:265, prot:3,   carb:25,  fat:16},
  {ar:'شريحة بيتزا مارجيريتا',        cat:'أكل سريع', en:'Margherita Pizza Slice', catEn:'Fast Food', cal:266, prot:11,  carb:33,  fat:10, unit:'شريحة', unitEn:'slice', unitG:100},
  {ar:'شريحة بيتزا بالبيبروني',       cat:'أكل سريع', en:'Pepperoni Pizza Slice', catEn:'Fast Food', cal:298, prot:13,  carb:30,  fat:14, unit:'شريحة', unitEn:'slice', unitG:100},
  {ar:'برجر لحم كامل (بالخبز)',       cat:'أكل سريع', en:'Full Beef Burger (with bun)', catEn:'Fast Food', cal:250, prot:13,  carb:25,  fat:12},
  {ar:'برجر دجاج كامل (بالخبز)',      cat:'أكل سريع', en:'Full Chicken Burger (with bun)', catEn:'Fast Food', cal:215, prot:14,  carb:26,  fat:7},
  {ar:'هوت دوج (بالخبز)',             cat:'أكل سريع', en:'Hot Dog (with bun)', catEn:'Fast Food', cal:290, prot:9.5, carb:22,  fat:17},
  {ar:'ساندويتش شاورما دجاج',         cat:'أكل سريع', en:'Chicken Shawarma Sandwich', catEn:'Fast Food', cal:215, prot:16,  carb:22,  fat:8},
  {ar:'ساندويتش شاورما لحم',          cat:'أكل سريع', en:'Beef Shawarma Sandwich', catEn:'Fast Food', cal:240, prot:14,  carb:22,  fat:11},
  {ar:'ساندويتش فلافل',               cat:'أكل سريع', en:'Falafel Sandwich', catEn:'Fast Food', cal:210, prot:7,   carb:30,  fat:7},
  {ar:'ناجتس دجاج مقلي',              cat:'أكل سريع', en:'Fried Chicken Nuggets', catEn:'Fast Food', cal:296, prot:15,  carb:17,  fat:19, unit:'قطعة', unitEn:'piece', unitG:16},
  {ar:'أصابع دجاج مقرمشة',            cat:'أكل سريع', en:'Crispy Chicken Fingers', catEn:'Fast Food', cal:250, prot:14,  carb:14,  fat:15, unit:'قطعة', unitEn:'piece', unitG:30},

  // ══════════════════════════════════════════════════════════
  // 🍰 حلويات — v3 expansion
  // ══════════════════════════════════════════════════════════
  {ar:'بسبوسة (قطعة 60غ)',            cat:'وجبات خفيفة', en:'Basbousa (60g piece)', catEn:'Snacks', cal:220, prot:3,   carb:32,  fat:9},
  {ar:'كنافة بالجبن (100غ)',          cat:'وجبات خفيفة', en:'Cheese Kunafa (100g)', catEn:'Snacks', cal:320, prot:6,   carb:38,  fat:16},
  {ar:'بقلاوة (قطعة 40غ)',            cat:'وجبات خفيفة', en:'Baklava (40g piece)', catEn:'Snacks', cal:160, prot:2.5, carb:16,  fat:9.5},
  {ar:'أم علي (كوب 200غ)',            cat:'وجبات خفيفة', en:'Om Ali (200g cup)', catEn:'Snacks', cal:300, prot:6,   carb:42,  fat:12},
  {ar:'قطايف بالقشطة (قطعة 50غ)',     cat:'وجبات خفيفة', en:'Qatayef with Cream (50g piece)', catEn:'Snacks', cal:155, prot:3,   carb:18,  fat:8},
  {ar:'كيك إسفنجي (قطعة 50غ)',        cat:'وجبات خفيفة', en:'Sponge Cake (50g piece)', catEn:'Snacks', cal:181, prot:3,   carb:35,  fat:4},
  {ar:'دونات سادة (قطعة 60غ)',        cat:'وجبات خفيفة', en:'Plain Donut (60g piece)', catEn:'Snacks', cal:229, prot:3.9, carb:27,  fat:12},
  {ar:'كوكيز شوكولاتة (قطعة 25غ)',    cat:'وجبات خفيفة', en:'Chocolate Cookie (25g piece)', catEn:'Snacks', cal:120, prot:1.5, carb:16,  fat:6},
  {ar:'آيس كريم فانيليا (100غ)',      cat:'وجبات خفيفة', en:'Vanilla Ice Cream (100g)', catEn:'Snacks', cal:207, prot:3.5, carb:24,  fat:11},
  {ar:'آيس كريم شوكولاتة (100غ)',     cat:'وجبات خفيفة', en:'Chocolate Ice Cream (100g)', catEn:'Snacks', cal:216, prot:3.8, carb:26,  fat:11.5},
  {ar:'شوكولاتة بالحليب (قطعة 25غ)',  cat:'وجبات خفيفة', en:'Milk Chocolate (25g piece)', catEn:'Snacks', cal:134, prot:1.9, carb:14.8,fat:7.5},
  {ar:'مارشميلو (5 حبات 25غ)',        cat:'وجبات خفيفة', en:'Marshmallows (5 pcs, 25g)', catEn:'Snacks', cal:80,  prot:0.5, carb:20,  fat:0.1},
  {ar:'جيلي بدون سكر (كوب)',          cat:'وجبات خفيفة', en:'Sugar-Free Gelatin (cup)', catEn:'Snacks', cal:10,  prot:1,   carb:0.5, fat:0},

  // ══════════════════════════════════════════════════════════
  // 🌰 مكسرات إضافية — v3 expansion
  // ══════════════════════════════════════════════════════════
  {ar:'كستناء محمصة',                 cat:'مكسرات وبذور', en:'Roasted Chestnuts', catEn:'Nuts & Seeds', cal:245, prot:3,   carb:53,  fat:2},
  {ar:'جوز برازيلي',                  cat:'مكسرات وبذور', en:'Brazil Nuts', catEn:'Nuts & Seeds', cal:656, prot:14,  carb:12,  fat:66},
];

const FOOD_DB_CATS=[...new Set(FOOD_DB.map(f=>f.cat))];

// ─── FOOD DROPDOWN LOGIC ──────────────────────────────────────
let _activeDropdownRow=null;

// ── Macro filter for food search ─────────────────────────────
window._foodFilter = 'all';

function setFoodFilter(f) {
  window._foodFilter = f;
  document.querySelectorAll('.macro-filter-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.filter === f);
  });
  // Re-render any open dropdowns
  document.querySelectorAll('.food-search:focus').forEach(inp => {
    renderDropdown(inp, inp.value);
  });
}

function applyFoodFilter(list) {
  const f = window._foodFilter || 'all';
  if (f === 'all') return list;
  const VEG_CATS = ['بقوليات','خضروات','فواكه','أطباق عربية','سلطات','خضار سوتية'];
  return list.filter(food => {
    switch(f) {
      case 'prot':    return food.prot >= 15;
      case 'lowcarb': return food.carb <= 10;
      case 'lowfat':  return food.fat  <= 3;
      case 'lowcal':  return food.cal  <= 100;
      case 'veg':     return VEG_CATS.includes(food.cat);
      default:        return true;
    }
  });
}

// ── Reset / New Plan ─────────────────────────────────────────
function resetPlan() {
  if (!confirm('Clear all current plan data and start fresh?\n(Saved plans are NOT affected)')) return;
  // Clear all form fields
  const ids = [
    'c-name','c-name-ar','c-coach-name','c-age','c-gender','c-goal','c-phase',
    'c-injuries','c-allergies',
    'ib-weight','ib-height','ib-bf','ib-smm','ib-fatmass','ib-bmi','ib-tbw',
    'ib-protein-kg','ib-vfl','ib-score','ib-age','ib-date',
    't-cal','t-prot','t-carbs','t-fats','t-water','t-traintime',
    'cc-H-cal','cc-H-prot','cc-H-carbs','cc-H-fats',
    'cc-M-cal','cc-M-prot','cc-M-carbs','cc-M-fats',
    'cc-L-cal','cc-L-prot','cc-L-carbs','cc-L-fats',
    'coach-notes','smg-tdee-input'
  ];
  ids.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  // Reset gender/activity selects
  const gender = document.getElementById('c-gender'); if (gender) gender.value = 'male';
  const ibGender = document.getElementById('ib-gender'); if (ibGender) ibGender.value = 'male';
  const activity = document.getElementById('ib-activity'); if (activity) activity.value = '1.55';
  // Clear all meal rows
  if (window.MEALS_DEF && window.OPTS_DEF) {
    MEALS_DEF.forEach(m => {
      OPTS_DEF.forEach(o => {
        const c = document.getElementById('rows-' + m.id + '-' + o.n);
        if (c) c.innerHTML = '';
        addFoodRow(m.id, o.n); addFoodRow(m.id, o.n); addFoodRow(m.id, o.n);
      });
    });
  }
  // Clear supplements and reset to one empty row
  const suppRows = document.getElementById('supp-rows');
  if (suppRows) suppRows.innerHTML = '';
  addSuppRow();
  // Reset meal names
  window._mealNames = {};
  window._mealNameSubs = {};
  if (window.MEALS_DEF) {
    MEALS_DEF.forEach((m, i) => {
      const L = LANG[window._lang || 'ar'];
      const inp = document.getElementById('meal-name-input-' + m.id);
      if (inp) inp.value = L.meals[i].label;
      const sub = document.getElementById('meal-sub-input-' + m.id);
      if (sub) sub.value = L.meals[i].sub;
    });
  }
  // BMR card
  const bmrCard = document.getElementById('bmr-card');
  if (bmrCard) bmrCard.style.display = 'none';
  updateGrandTotal(); syncPreview();
  showPage('client');
  toast('✅ Plan reset — ready for new client', 'success');
}

// ── Recent foods tracking ──────────────────────────────────
const RECENT_KEY = 'og-recent-foods';
const RECENT_MAX = 12;

function addToRecentFoods(foodIdx) {
  try {
    let recent = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    recent = recent.filter(i => i !== foodIdx);
    recent.unshift(foodIdx);
    if (recent.length > RECENT_MAX) recent = recent.slice(0, RECENT_MAX);
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
  } catch(e) {}
  if (typeof recentBarRender === 'function') recentBarRender();
}

function getRecentFoods() {
  try {
    const idxs = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    return idxs.map(i => FOOD_DB[i]).filter(Boolean);
  } catch(e) { return []; }
}

// ─── 🌍 MULTI-LANGUAGE FOOD ALIASES ──────────────────────────
// Typed / OCR'd / transliterated alternatives → canonical FOOD_DB names.
// Format: [ 'alias1|alias2|...', canonicalArabicName ]
// Matching is case-insensitive on the alias side; the right-hand value must
// point at a real FOOD_DB `ar` entry (verified on init).
const FOOD_ALIASES = [
  // proteins
  ['chicken|chicken breast|breast|دجاج دجاج مشوي|فيليه دجاج|فراخ مشوية',
    'صدور دجاج مشوية'],
  ['thigh|فخذ|دراجيل', 'فخذ دجاج مشوي (بدون جلد)'],
  ['fish|سمك|سمجة', 'سمك مشوي'],
  ['tuna|تونة|تونه|تون', 'سمك تونة (علبة بالماء)'],
  ['salmon|سلمون', 'سمك سلمون مشوي'],
  ['meat|beef|steak|لحمة|لحمه|لحم|لحوم', 'لحم أحمر مشوي'],
  ['lamb|خروف|غنم|ضأن|داني', 'لحم غنم فخذ مشوي'],
  ['mince|keema|لحمة مفروم|مفروم', 'لحم بقري مفروم (95% خالي دهن)'],
  ['egg|eggs|بيض|بيضة|بيضة مسلوقة', 'بيض كامل مسلوق'],
  ['egg white|بياض|بياض البيض|شدة|اومليت بياض', 'بياض البيض مسلوق'],
  ['turkey|تركي|ديك رومي|رومي', 'صدر ديك رومي مشوي'],
  ['shrimp|prawns|جمبري|روبيان', 'روبيان مشوي على الفحم'],
  // carbs
  ['oats|oatmeal|شوفان|شوربة شوفان|قرفة شوفان', 'شوفان جاف (خام)'],
  ['bread|toast|توست|عيش توست', 'خبز توست أبيض'],
  ['pita|baladi|بلدي|عيش بلدي|صاج', 'خبز عيش بلدي'],
  ['rice|أرز|ارز', 'أرز أبيض مسلوق'],
  ['rice|ارز مطبوخ', 'أرز أبيض مسلوق'],
  ['pasta|macaroni|spaghetti|مكرونة|معكرونة|مكارونة|سباغيتي|باستا', 'معكرونة سباغيتي مسلوقة'],
  ['potato|بطاطس|بطاطة|بطاطا بيضاء', 'بطاطس بيضاء مسلوقة'],
  ['sweet potato|kumara|بطاطا|بطاطا حلوة', 'بطاطا حلوة مسلوقة'],
  ['corn|كورن|جرجير ذرة', 'ذرة صفراء مسلوقة'],
  ['couscous|kouss|كسكسي', 'كسكس مسلوق'],
  ['bulgur|burgul|برغل|برجول', 'برغل مسلوق'],
  ['freekeh|فريك|فريكة', 'فريك مسلوق'],
  ['quinoa|كينوا', 'كينوا مسلوقة'],
  // dairy
  ['yogurt|yoghurt|زبادي', 'زبادي سادة خالي الدسم'],
  ['milk|لبن|حليب', 'لبن بقر خالي دسم'],
  ['cheese|جبنة|جبنه|جبن', 'جبن قريش خالي دسم'],
  ['cottage|cottage cheese|قريش|كوتاج', 'جبن قريش (كوتاج)'],
  ['labneh|لبنة|لبنه', 'لبنة خالية الدسم'],
  // fruits & fats
  ['banana|موز', 'موز ناضج'],
  ['apple|تفاح', 'تفاح أحمر'],
  ['orange|برتقال', 'برتقال'],
  ['dates|تمر|بلح|دقلة', 'تمر مجفف (مدجول)'],
  ['avocado|أفوكادو|افوكادو', 'أفوكادو طازج'],
  ['olive oil|زيت زيتون|زيت كويتون', 'زيت زيتون بكر ممتاز'],
  ['butter|زبدة', 'زبدة غير مملحة'],
  ['peanut butter|زبدة فول سوداني', 'زبدة الفول السوداني الطبيعية'],
  ['honey|عسل', 'عسل نحل طبيعي'],
  ['almonds|لوز', 'لوز خام'],
  ['walnuts|جوز|عين جمل', 'جوز'],
  ['peanuts|فول سوداني', 'فول سوداني محمص'],
  // legumes & veg
  ['lentils|عدس|adas', 'عدس أحمر مسلوق'],
  ['chickpeas|humos|حمص مسلوق|بقل حمص', 'حمص مسلوق'],
  ['hummus|حمص بالطحينة', 'حمص بالطحينة'],
  ['kidney beans|فاصوليا|لوبيا', 'فاصوليا بيضاء مسلوقة'],
  ['broccoli|بروكلي|بروكولي', 'بروكلي مسلوق'],
  ['spinach|سبانخ', 'سبانخ مطبوخة'],
  // drinks, grills & misc
  ['tea|شاي', 'شاي أسود بدون سكر'],
  ['coffee|قهوة|ايس كافيه|cold brew', 'قهوة سوداء (بدون سكر)'],
  ['shish tawook|tawook|شيش طاووق|طاووق|توك', 'شيش طاووق مشوي'],
  ['burger|برجر', 'برجر لحم مشوي (بدون خبز)'],
  ['schnitzel|بانيه|شنيتزل', 'بانيه دجاج بالفرن (بدون قلي)'],
];

// alias record → FOOD_DB canonical index. Built once per page load.
const FOOD_ALIAS_MAP = (() => {
  return FOOD_ALIASES.map(rec => {
    rec._idx = FOOD_DB.findIndex(f => f.ar === rec[1]);
    return rec;
  });
})();

// Query (typed text, any language/labels) → canonical FOOD_DB entries
function getAliasMatches(q) {
  const query = (q || '').trim().toLowerCase();
  if (query.length < 2) return [];
  const out = [];
  const seen = new Set();
  FOOD_ALIAS_MAP.forEach(rec => {
    if (rec._idx === undefined) return;
    const aliases = rec[0].split('|').map(a => a.trim().toLowerCase()).filter(Boolean);
    const hit = aliases.some(a =>
      a.length >= 2 && (a.includes(query) || query.includes(a)));
    if (hit && !seen.has(rec._idx)) {
      const f = FOOD_DB[rec._idx];
      if (f) { seen.add(rec._idx); out.push(f); }
    }
  });
  return out;
}

function renderDropdown(input,query){
  const row=input.closest('.food-row');
  const dd=row.querySelector('.food-dropdown');
  const q=(query||'').trim().toLowerCase();
  const isEN = window._lang === 'en';

  // ⚠ If the coach is editing the name manually, the pinned allergen hint
  // no longer refers to the (not-yet-chosen) food — drop it until a selection.
  const shownName = ((isEN ? (row.dataset.foodNameEn||'') : '') || row.dataset.foodName || '').toLowerCase();
  if (q && q !== shownName){
    const h = row.querySelector('.allergy-hint');
    if (h) h.remove();
    row.classList.remove('has-allergy');
  }

  // When query is empty, show recent foods first
  if (!q) {
    const recent = getRecentFoods();
    if (recent.length) {
      let html = `<div class="fdd-cat">${isEN ? '🕐 Recently Used' : '🕐 مستخدم حديثاً'}</div>`;
      recent.forEach(f => {
        const displayName = isEN ? (f.en||f.ar) : f.ar;
        const idx = FOOD_DB.indexOf(f);
        html += `<div class="fdd-item" data-idx="${idx}" onmousedown="selectFoodItem(event,this)">
          <span class="fdd-name">${displayName}${f.unit ? ` <span style="color:#FF8C42;font-size:10px;">/ ${f.unit}</span>` : ''}</span>
          <span class="fdd-macros">
            <span class="dp">${isEN?'P':'ب'} ${f.prot}</span>
            <span class="dc">${isEN?'C':'ك'} ${f.carb}</span>
            <span class="df">${isEN?'F':'د'} ${f.fat}</span>
            <span class="dk">${f.cal} ${isEN?'kcal':'سع'}</span>
          </span></div>`;
      });
      dd.innerHTML = html; dd.classList.add('open'); _activeDropdownRow = row; return;
    }
  }

  // Primary matches (by name/category) + secondary alias matches under it
  const primary = applyFoodFilter(q ? FOOD_DB.filter(f=>{
    const name = isEN ? (f.en||f.ar) : f.ar;
    const cat  = isEN ? (f.catEn||f.cat) : f.cat;
    return name.toLowerCase().includes(q) || cat.toLowerCase().includes(q) || f.ar.includes(q);
  }) : FOOD_DB);
  const aliasHits = q ? getAliasMatches(q) : [];
  const seenIdx = new Set(primary.map(f => FOOD_DB.indexOf(f)));
  aliasHits.forEach(f => { if (!seenIdx.has(FOOD_DB.indexOf(f))) seenIdx.add(FOOD_DB.indexOf(f)); });
  const filtered = primary.concat(aliasHits.filter(f => !primary.includes(f)));
  if(!filtered.length){
    dd.innerHTML=`<div class="fdd-empty">${isEN?'No results':'لا توجد نتائج'}</div>`;
    dd.classList.add('open');_activeDropdownRow=row;return;
  }
  let html='';let lastCat='';
  const aliasIdx = new Set(aliasHits.map(f => FOOD_DB.indexOf(f)));
  filtered.forEach((f,i)=>{
    const displayName = isEN ? (f.en||f.ar) : f.ar;
    const displayCat  = isEN ? (f.catEn||f.cat) : f.cat;
    if(displayCat!==lastCat){html+=`<div class="fdd-cat">${displayCat}</div>`;lastCat=displayCat;}
    const isAliasHit = aliasIdx.has(FOOD_DB.indexOf(f));
    html+=`<div class="fdd-item" data-idx="${FOOD_DB.indexOf(f)}" onmousedown="selectFoodItem(event,this)">
      <span class="fdd-name">${displayName}${f.unit?` <span style="color:#FF8C42;font-size:10px;">/ ${f.unit}</span>`:''}${isAliasHit?` <span class="fdd-alias-tag">↔</span>`:''}</span>
      <span class="fdd-macros">
        <span class="dp">${isEN?'P':'ب'} ${f.prot}</span>
        <span class="dc">${isEN?'C':'ك'} ${f.carb}</span>
        <span class="df">${isEN?'F':'د'} ${f.fat}</span>
        <span class="dk">${f.cal} ${isEN?'kcal':'سع'}</span>
      </span></div>`;
  });
  dd.innerHTML=html;dd.classList.add('open');_activeDropdownRow=row;
}

// Report which alias canonicals failed to bind to FOOD_DB (run once in console)
function aliasAudit(){
  const bad = FOOD_ALIAS_MAP.filter(r => r._idx === undefined).map(r => r[1]);
  return bad;
}

function selectFoodItem(e,el){
  e.preventDefault();e.stopPropagation();
  const row=el.closest('.food-row');
  const idx=parseInt(el.dataset.idx);
  const food=FOOD_DB[idx];
  const searchInput=row.querySelector('.food-search');
  const isEN = window._lang === 'en';
  searchInput.value = isEN ? (food.en||food.ar) : food.ar;
  row.dataset.foodCal=food.cal;row.dataset.foodProt=food.prot;
  row.dataset.foodCarb=food.carb;row.dataset.foodFat=food.fat;
  row.dataset.foodName=food.ar;row.dataset.foodNameEn=food.en||food.ar;row.dataset.foodCat=food.cat;row.dataset.foodCatEn=food.catEn||food.cat;
  // ── Unit-based items (eggs, toast, bread by piece) ──
  row.dataset.foodUnit   = food.unit   || '';
  row.dataset.foodUnitEn = food.unitEn || food.unit || '';
  row.dataset.foodUnitG  = food.unitG  || '';
  // ── Slice-based items (chicken breast etc: grams + slice count side-by-side) ──
  row.dataset.foodSliceG = food.sliceG || '';
  const qtyLabel = row.querySelector('.food-qty-label');
  const qtyInput = row.querySelector('.food-qty-input');
  const tbspLabel = row.querySelector('.food-tbsp-wrap .food-qty-label');
  // Track previous mode to decide whether to reset qty
  const prevMode = row.dataset.foodMode || '';
  const newMode  = ((food.unit && food.unitG) || food.liq) ? 'unit' : 'grams';
  row.dataset.foodMode = newMode;
  const modeChanged = prevMode && prevMode !== newMode;

  // Clear stale liquid state when a non-liquid food lands on this row
  if (!food.liq) { delete row.dataset.foodLiq; delete row.dataset.foodLiqBase; }

  if (food.liq){
    // LIQUID food (milk, juice, shake...): liters ⇄ cups toggle
    const base = food.liqBase || 100;
    row.dataset.foodLiq     = '1';
    row.dataset.foodLiqBase = String(base);
    // Default to liters; keep the existing unit choice if the row already had one
    const defKey = OG_LIQ_KEY_BY_AR[row.dataset.foodUnit] || 'l';
    const met = OG_LIQ_UNITS[defKey];
    row.dataset.foodUnit   = met.ar;
    row.dataset.foodUnitEn = met.en;
    row.dataset.foodUnitG  = String(Math.round((met.per * 100) / base * 10000) / 10000);
    if(qtyLabel) ogLiqRenderLabel(row);
    qtyInput.placeholder = '1';
    qtyInput.step = (defKey === 'ml') ? '50' : '0.25';
    if(!qtyInput.value || modeChanged) qtyInput.value = (defKey === 'ml') ? 250 : 1;
  } else if(food.unit && food.unitG){
    // PIECE-BASED food (banana, egg, toast)
    if(qtyLabel) qtyLabel.textContent = (isEN && food.unitEn) ? food.unitEn : food.unit;
    qtyInput.placeholder = '1';
    qtyInput.step = '1';
    if(!qtyInput.value || modeChanged) qtyInput.value = 1;
  } else {
    // GRAMS-BASED food
    if(qtyLabel) qtyLabel.textContent = isEN ? 'grams' : 'غرام';
    qtyInput.placeholder = '100';
    qtyInput.step = '1';
    if(!qtyInput.value || modeChanged) qtyInput.value = 100;
  }
  // Relabel the SECONDARY column (usually spoons) → slices for slice-based foods
  if(food.sliceG && tbspLabel){
    tbspLabel.textContent = isEN ? 'slices' : 'شريحة';
  } else if(tbspLabel){
    tbspLabel.textContent = isEN ? 'spoons' : 'ملعقة';
  }
  row.querySelector('.food-dropdown').classList.remove('open');
  _activeDropdownRow=null;
  // Auto-calc tbsp / slice if qty already set
  const tbspInput=row.querySelector('.food-tbsp-input');
  const tbspWrap=row.querySelector('.food-tbsp-wrap');
  if(food.sliceG){
    // slice mode: grams + slice count visible together
    if(tbspWrap) tbspWrap.style.visibility='visible';
    const qty = parseFloat(qtyInput.value)||100;
    tbspInput.value = Math.round((qty / food.sliceG) * 4) / 4;  // round to 0.25
    tbspInput.step = '0.25';
  } else if(!food.unit && !food.liq){
    // grams-based with tbsp helper
    if(tbspWrap) tbspWrap.style.visibility='visible';
    const qty=parseFloat(qtyInput.value)||100;
    const t=gramToTbsp(qty,food.ar,food.cat);
    if(t!==null)tbspInput.value=formatTbspNum(t);
  } else {
    // piece-based only: hide secondary column
    tbspInput.value='';
    if(tbspWrap) tbspWrap.style.visibility='hidden';
  }
  updateRowMacros(row);
  syncPreview();
  if(window.AppState) AppState.saveToHistory();
  addToRecentFoods(idx); // track recent foods
  allergyCheckRow(row); // ⚠ inline allergen hint if it clashes with the client
}

// ─── LIQUID FOODS: liters ⇄ cups toggle ──────────────────────
// Liquid foods (liq:1 in FOOD_DB) get a لتر/كوب toggle above the qty input.
// All math rides on the existing unit/unitG engine: dataset.foodUnitG is
// recomputed per choice so macros stay exact relative to the food's real
// serving basis (food.liqBase, in ml).
const OG_LIQ_UNITS = {
  l:   { ar:'لتر', en:'liter', per: 1000 },
  cup: { ar:'كوب', en:'cup',   per: 240  },
  ml:  { ar:'مل',  en:'ml',    per: 1    }
};
const OG_LIQ_KEY_BY_AR = { 'لتر':'l', 'كوب':'cup', 'مل':'ml' };
function ogLiqRenderLabel(row){
  if(!row || row.dataset.foodLiq !== '1') return;
  const qtyLbl = row.querySelector('.food-qty-label');
  if(!qtyLbl) return;
  const cur = OG_LIQ_KEY_BY_AR[row.dataset.foodUnit] || 'l';
  const isEN = window._lang === 'en';
  const names = { l:(isEN?'liter':'لتر'), cup:(isEN?'cup':'كوب'), ml:(isEN?'ml':'مل') };
  qtyLbl.innerHTML = '<span class="liq-chips">'
    + ['l','cup','ml'].map(function(u){
        return '<span class="liq-chip'+(u===cur?' on':'')+'" onclick="event.stopPropagation();ogLiqSetUnit(this.closest(\'.food-row\'),\''+u+'\')">'+names[u]+'</span>';
      }).join('')
    + '</span>';
}
function ogLiqSetUnit(row, u){
  if(!row) return;
  const key = OG_LIQ_UNITS[u] ? u : 'l';
  const base = parseFloat(row.dataset.foodLiqBase) || 100;
  const met = OG_LIQ_UNITS[key];
  row.dataset.foodUnit   = met.ar;
  row.dataset.foodUnitEn = met.en;
  row.dataset.foodUnitG  = String(Math.round((met.per * 100) / base * 10000) / 10000);
  const qtyInput = row.querySelector('.food-qty-input');
  if (qtyInput) qtyInput.step = (key === 'ml') ? '50' : '0.25';
  ogLiqRenderLabel(row);
  updateRowMacros(row);
  syncPreview();
  if(window.AppState) AppState.saveToHistory();
}


function recalcTotalsFromRow(panel){
  if(!panel)return;
  const id=panel.id; // "opt-m1-1"
  const parts=id.split('-'); // ["opt","m1","1"]
  const mealId=parts[1];const optN=parts[2];
  recalcMealTotals(mealId,optN);
}

function recalcMealTotals(mealId,optN){
  const rows=[...document.querySelectorAll('#rows-'+mealId+'-'+optN+' .food-row')];
  let totCal=0,totProt=0,totCarb=0,totFat=0,hasData=false;
  rows.forEach(row=>{
    const c=parseFloat(row.dataset.foodCal)||0;
    const p=parseFloat(row.dataset.foodProt)||0;
    const cb=parseFloat(row.dataset.foodCarb)||0;
    const f=parseFloat(row.dataset.foodFat)||0;
    if(!c&&!p)return;
    const unitG=parseFloat(row.dataset.foodUnitG)||0;
    const unit=row.dataset.foodUnit||'';
    const qtyRaw=parseFloat(row.querySelector('.food-qty-input')?.value)||0;
    let scale;
    if(unit && unitG && qtyRaw > 0){
      scale = (qtyRaw * unitG) / 100;
    } else {
      scale=(qtyRaw||100)/100;
    }
    totCal+=c*scale;totProt+=p*scale;totCarb+=cb*scale;totFat+=f*scale;hasData=true;
  });
  const zeroEl=document.getElementById('totals-zero-'+mealId+'-'+optN);
  const calEl=document.getElementById('mt-cal-'+mealId+'-'+optN);
  const protEl=document.getElementById('mt-prot-'+mealId+'-'+optN);
  const carbEl=document.getElementById('mt-carb-'+mealId+'-'+optN);
  const fatEl=document.getElementById('mt-fat-'+mealId+'-'+optN);
  if(!calEl)return;
  if(!hasData){
    calEl.textContent='—';protEl.textContent='—';carbEl.textContent='—';fatEl.textContent='—';
    if(zeroEl)zeroEl.textContent='أضف مكونات لحساب الإجمالي';
    return;
  }
  calEl.textContent=Math.round(totCal);
  protEl.textContent=totProt.toFixed(1);
  carbEl.textContent=totCarb.toFixed(1);
  fatEl.textContent=totFat.toFixed(1);
  if(zeroEl)zeroEl.textContent='';
  // Update grand total and meal % badges
  updateGrandTotal();
}

function closeAllDropdowns(){
  document.querySelectorAll('.food-dropdown.open').forEach(dd=>dd.classList.remove('open'));
  _activeDropdownRow=null;
}
document.addEventListener('click',e=>{if(!e.target.closest('.food-select-wrap'))closeAllDropdowns();});

// ─── MEAL UI ─────────────────────────────────────────────────
// Custom meal name storage
window._mealNames = {};
window._mealNameSubs = {}; // custom sub-name (secondary/Arabic) storage
function getMealName(mealId){
  return window._mealNames[mealId] || MEALS_DEF.find(m=>m.id===mealId)?.label || mealId;
}
function getMealSub(mealId){
  return window._mealNameSubs?.[mealId] || MEALS_DEF.find(m=>m.id===mealId)?.sub || '';
}

function buildMeals(){
  const c=document.getElementById('meals-container');c.innerHTML='';
  const L = LANG[window._lang || 'ar'];
  MEALS_DEF.forEach((m, idx)=>{
    const block=document.createElement('div');
    block.className='meal-block open';block.id='block-'+m.id;
    const mealLabel = getMealName(m.id);
    const mealSub   = getMealSub(m.id);
    block.innerHTML=`
      <div class="meal-pct-row" id="pct-row-${m.id}">
        <div class="meal-pct-cell">
          <div class="meal-pct-val" id="mpct-cal-${m.id}" style="color:#4ade80;">—%</div>
          <div style="height:2px;background:rgba(74,222,128,0.2);margin:2px 8px 0;border-radius:2px;"><div id="mpct-bar-cal-${m.id}" style="height:100%;background:#4ade80;width:0;border-radius:2px;transition:width .4s ease;"></div></div>
          <div class="meal-pct-lbl">${L.pctCal}</div>
        </div>
        <div class="meal-pct-cell">
          <div class="meal-pct-val" id="mpct-prot-${m.id}" style="color:var(--opt2);">—%</div>
          <div style="height:2px;background:rgba(0,207,255,0.2);margin:2px 8px 0;border-radius:2px;"><div id="mpct-bar-prot-${m.id}" style="height:100%;background:var(--opt2);width:0;border-radius:2px;transition:width .4s ease;"></div></div>
          <div class="meal-pct-lbl">${L.pctProt}</div>
        </div>
        <div class="meal-pct-cell">
          <div class="meal-pct-val" id="mpct-carb-${m.id}" style="color:var(--y);">—%</div>
          <div style="height:2px;background:rgba(245,255,0,0.2);margin:2px 8px 0;border-radius:2px;"><div id="mpct-bar-carb-${m.id}" style="height:100%;background:var(--y);width:0;border-radius:2px;transition:width .4s ease;"></div></div>
          <div class="meal-pct-lbl">${L.pctCarb}</div>
        </div>
        <div class="meal-pct-cell">
          <div class="meal-pct-val" id="mpct-fat-${m.id}" style="color:var(--opt3);">—%</div>
          <div style="height:2px;background:rgba(255,140,66,0.2);margin:2px 8px 0;border-radius:2px;"><div id="mpct-bar-fat-${m.id}" style="height:100%;background:var(--opt3);width:0;border-radius:2px;transition:width .4s ease;"></div></div>
          <div class="meal-pct-lbl">${L.pctFat}</div>
        </div>
      </div>
      <div class="meal-header" onclick="toggleMeal('${m.id}')">
        <div class="meal-header-left" onclick="event.stopPropagation()">
          <span class="meal-icon">${m.icon}</span>
          <div>
            <div style="display:flex;align-items:center;gap:4px;">
              <input class="meal-name-edit" id="meal-name-input-${m.id}"
                value="${(mealLabel+'').replace(/"/g,'&quot;')}"
                title="${L.editHint} Edit meal name"
                onchange="saveMealName('${m.id}',this.value)"
                onkeydown="if(event.key==='Enter')this.blur()"
              />
              <span class="meal-edit-hint" title="Edit">${L.editHint}</span>
            </div>
            <input class="meal-sub-edit" id="meal-sub-input-${m.id}"
              value="${(mealSub+'').replace(/"/g,'&quot;')}"
              title="Edit meal sub-name"
              onchange="saveMealSubName('${m.id}',this.value)"
              onkeydown="if(event.key==='Enter')this.blur()"
            />
          </div>
        </div>
        <span class="meal-chevron" onclick="toggleMeal('${m.id}');event.stopPropagation()">▼</span>
        <button onclick="event.stopPropagation();showCopyMealMenu('${m.id}',this)" title="Copy this meal to another meal" style="background:transparent;border:none;color:#333;font-size:12px;cursor:pointer;padding:4px 6px;transition:color .15s;flex-shrink:0;" onmouseover="this.style.color='var(--y)'" onmouseout="this.style.color='#333'">⇄</button>
      </div>
      <div class="meal-body">
        <div class="option-tabs">${OPTS_DEF.map(o=>`<div class="opt-tab${o.n===1?' active':''}" data-opt="${o.n}" onclick="switchOpt('${m.id}',${o.n},this)">${o.label}</div>`).join('')}</div>
        ${OPTS_DEF.map(o=>`<div class="opt-panel${o.n===1?' active':''}" id="opt-${m.id}-${o.n}">
          <div style="display:flex;gap:6px;padding:6px 0 4px;flex-wrap:wrap;">
            <button onclick="copyOptToNext('${m.id}',${o.n})" title="Copy this option to the next" style="background:transparent;border:1px solid rgba(245,255,0,0.15);color:#555;font-size:10px;padding:3px 9px;cursor:pointer;font-family:'Barlow Condensed',sans-serif;letter-spacing:1px;text-transform:uppercase;transition:all .15s;" onmouseover="this.style.borderColor='rgba(245,255,0,0.5)';this.style.color='var(--y)'" onmouseout="this.style.borderColor='rgba(245,255,0,0.15)';this.style.color='#555'">📋 Copy →</button>
            <button onclick="clearOpt('${m.id}',${o.n})" title="Clear all foods in this option" style="background:transparent;border:1px solid rgba(255,255,255,0.06);color:#444;font-size:10px;padding:3px 9px;cursor:pointer;font-family:'Barlow Condensed',sans-serif;letter-spacing:1px;text-transform:uppercase;transition:all .15s;" onmouseover="this.style.borderColor='rgba(248,113,113,0.4)';this.style.color='#f87171'" onmouseout="this.style.borderColor='rgba(255,255,255,0.06)';this.style.color='#444'">🗑 Clear</button>
            <button class="free-chip${window._freeMeals&&window._freeMeals['${m.id}-${o.n}']?' on':''}" id="fme-${m.id}-${o.n}" onclick="event.stopPropagation();toggleFreeMeal('${m.id}',${o.n})" title="Cheat day: this option becomes a 100% free meal — auto-balance trims carbs & fats from the rest of the plan">🍩 ${L.freeMeal}</button>
          </div>
          <div class="food-rows" id="rows-${m.id}-${o.n}"></div>
          <button class="add-food-btn" onclick="addFoodRow('${m.id}',${o.n})">${L.addComponent}</button>
          <div class="meal-totals" id="totals-${m.id}-${o.n}">
            <div class="meal-totals-header">
              <span class="meal-totals-label">${L.mealTotal}</span>
              <span class="meal-totals-zero" id="totals-zero-${m.id}-${o.n}">${L.emptyHint}</span>
            </div>
            <div class="meal-totals-body">
              <div class="mt-cell"><div class="mt-val cal" id="mt-cal-${m.id}-${o.n}">—</div><div class="mt-lbl">${L.cal}</div><div class="mt-unit">${L.calUnit}</div></div>
              <div class="mt-cell"><div class="mt-val prot" id="mt-prot-${m.id}-${o.n}">—</div><div class="mt-lbl">${L.prot}</div><div class="mt-unit">${L.protUnit}</div></div>
              <div class="mt-cell"><div class="mt-val carb" id="mt-carb-${m.id}-${o.n}">—</div><div class="mt-lbl">${L.carb}</div><div class="mt-unit">${L.carbUnit}</div></div>
              <div class="mt-cell"><div class="mt-val fat" id="mt-fat-${m.id}-${o.n}">—</div><div class="mt-lbl">${L.fat}</div><div class="mt-unit">${L.fatUnit}</div></div>
            </div>
          </div>
        </div>`).join('')}
      </div>`;
    c.appendChild(block);
    OPTS_DEF.forEach(o=>{for(let i=0;i<3;i++)addFoodRow(m.id,o.n);});
  });
}
function toggleMeal(id){document.getElementById('block-'+id).classList.toggle('open');}



// ─── SAVE CUSTOM MEAL NAME ────────────────────────────────────
function saveMealName(mealId, val){
  const trimmed = val.trim();
  if(!trimmed) return; // don't allow empty
  window._mealNames = window._mealNames || {};
  window._mealNames[mealId] = trimmed;
  // Also update the input in case user had whitespace
  const inp = document.getElementById('meal-name-input-'+mealId);
  if(inp) inp.value = trimmed;
  syncPreview();
}

// ─── SAVE CUSTOM MEAL SUB-NAME (Arabic/secondary) ─────────────
// Clearing the field restores the default subtitle.
function saveMealSubName(mealId, val){
  const trimmed = (val || '').trim();
  window._mealNameSubs = window._mealNameSubs || {};
  const inp = document.getElementById('meal-sub-input-'+mealId);
  if (!trimmed) {
    delete window._mealNameSubs[mealId]; // falls back to MEALS_DEF sub
    if (inp) inp.value = getMealSub(mealId);
    syncPreview();
    return;
  }
  window._mealNameSubs[mealId] = trimmed;
  if (inp) inp.value = trimmed;
  syncPreview();
}

// ─── GRAND TOTAL + MEAL PERCENTAGE UPDATE ────────────────────
function updateGrandTotal(){
  if(!window.MEALS_DEF || !window.OPTS_DEF) return;

  // Get daily targets
  const tCal  = parseFloat(document.getElementById('t-cal')?.value)  || 0;
  const tProt = parseFloat(document.getElementById('t-prot')?.value) || 0;
  const tCarb = parseFloat(document.getElementById('t-carbs')?.value)|| 0;
  const tFat  = parseFloat(document.getElementById('t-fats')?.value) || 0;

  let totCal=0, totProt=0, totCarb=0, totFat=0;

  MEALS_DEF.forEach(m => {
    // Find the active option tab for this meal
    const block = document.getElementById('block-'+m.id);
    let activeOpt = 1;
    if(block){
      const activeTab = block.querySelector('.opt-tab.active');
      if(activeTab) activeOpt = parseInt(activeTab.dataset.opt) || 1;
    }
    const {cal,prot,carb,fat} = getMealOptTotals(m.id, activeOpt);
    // 🍩 Per-meal % badges always show their own numbers (even for free meals)…
    updateMealPctBadges(m.id, activeOpt, tCal, tProt, tCarb, tFat);
    // …but free meals are excluded from the daily grand totals
    if(window._freeMeals && window._freeMeals[m.id + '-' + activeOpt]) return;
    totCal  += cal;
    totProt += prot;
    totCarb += carb;
    totFat  += fat;
  });

  // Update grand total display
  const fmt = (n) => n > 0 ? Math.round(n) : '—';
  const pct = (v,t) => t > 0 ? Math.min(Math.round(v/t*100), 200) : 0;
  const pctTxt = (v,t) => t > 0 ? Math.round(v/t*100)+'%' : '—';
  const over = (v,t) => t > 0 && v > t*1.05;

  const set = (id, val) => { const el=document.getElementById(id); if(el) el.textContent=val; };
  const setClass = (id, isOver) => { const el=document.getElementById(id); if(el){ el.classList.toggle('gt-over', isOver); } };
  const setBar = (id, pctVal) => { const el=document.getElementById(id); if(el) el.style.width = Math.min(pctVal,100)+'%'; };

  set('gt-cal',  fmt(totCal));
  set('gt-prot', fmt(totProt));
  set('gt-carb', fmt(totCarb));
  set('gt-fat',  fmt(totFat));

  set('gt-pct-cal',  pctTxt(totCal,  tCal));
  set('gt-pct-prot', pctTxt(totProt, tProt));
  set('gt-pct-carb', pctTxt(totCarb, tCarb));
  set('gt-pct-fat',  pctTxt(totFat,  tFat));

  set('gt-cal-target',  tCal  || '—');
  set('gt-prot-target', tProt || '—');
  set('gt-carb-target', tCarb || '—');
  set('gt-fat-target',  tFat  || '—');

  setBar('gt-bar-cal',  pct(totCal,  tCal));
  setBar('gt-bar-prot', pct(totProt, tProt));
  setBar('gt-bar-carb', pct(totCarb, tCarb));
  setBar('gt-bar-fat',  pct(totFat,  tFat));

  setClass('gt-cal',  over(totCal,  tCal));
  setClass('gt-prot', over(totProt, tProt));
  setClass('gt-carb', over(totCarb, tCarb));
  setClass('gt-fat',  over(totFat,  tFat));

  // Status label
  const statusEl = document.getElementById('gt-status-label');
  if(statusEl && tCal > 0){
    const diff = Math.round(totCal - tCal);
    const L = LANG[window._lang || 'ar'];
    if(Math.abs(diff) < 10) statusEl.textContent = L.complete;
    else if(diff > 0) statusEl.textContent = L.over + ' ' + diff + (window._lang==='en' ? ' kcal' : ' سعرة');
    else statusEl.textContent = L.under + ' ' + Math.abs(diff) + (window._lang==='en' ? ' kcal' : ' سعرة');
    statusEl.style.color = Math.abs(diff)<50 ? '#4ade80' : diff>0 ? '#f87171' : '#F5FF00';
    // 🍩 free-meal marker on the status line
    const freeActive = MEALS_DEF.some(m => {
      const block = document.getElementById('block-'+m.id);
      const tab = block && block.querySelector('.opt-tab.active');
      const n = tab ? (parseInt(tab.dataset.opt)||1) : 1;
      return window._freeMeals && window._freeMeals[m.id + '-' + n];
    });
    if(freeActive) statusEl.textContent += ' 🍩';
  } else if(statusEl) {
    statusEl.textContent = tCal > 0 ? '0%' : (LANG[window._lang||'ar'].targets);
    statusEl.style.color = '';
  }
}

function getMealOptTotals(mealId, optN){
  const rows = [...document.querySelectorAll('#rows-'+mealId+'-'+optN+' .food-row')];
  let cal=0, prot=0, carb=0, fat=0;
  rows.forEach(row => {
    const c = parseFloat(row.dataset.foodCal)||0;
    const p = parseFloat(row.dataset.foodProt)||0;
    const cb= parseFloat(row.dataset.foodCarb)||0;
    const f = parseFloat(row.dataset.foodFat)||0;
    if(!c && !p) return;
    const unitG = parseFloat(row.dataset.foodUnitG)||0;
    const unit  = row.dataset.foodUnit||'';
    const qty   = parseFloat(row.querySelector('.food-qty-input')?.value)||0;
    let scale = unit && unitG && qty>0 ? (qty*unitG)/100 : (qty||100)/100;
    cal  += c*scale; prot += p*scale; carb += cb*scale; fat  += f*scale;
  });
  return {cal, prot, carb, fat};
}

function updateMealPctBadges(mealId, optN, tCal, tProt, tCarb, tFat){
  const {cal,prot,carb,fat} = getMealOptTotals(mealId, optN);
  const fmt = (v,t) => t>0 ? Math.round(v/t*100)+'%' : '—';
  const barW = (v,t) => t>0 ? Math.min(Math.round(v/t*100),100)+'%' : '0%';
  const overCls = (v,t) => t>0 && v>t*1.05 ? '#f87171' : null;

  const fields = [
    ['cal', cal, tCal], ['prot', prot, tProt],
    ['carb', carb, tCarb], ['fat', fat, tFat]
  ];
  fields.forEach(([k, v, t]) => {
    const el  = document.getElementById('mpct-'+k+'-'+mealId);
    const bar = document.getElementById('mpct-bar-'+k+'-'+mealId);
    if(el){
      el.textContent = v > 0 ? fmt(v,t) : '—';
      if(overCls(v,t)) el.style.color = overCls(v,t);
    }
    if(bar) bar.style.width = v > 0 ? barW(v,t) : '0%';
  });
}
function switchOpt(mealId,optN,el){
  const body=document.getElementById('block-'+mealId).querySelector('.meal-body');
  body.querySelectorAll('.opt-tab').forEach(t=>t.classList.remove('active'));
  body.querySelectorAll('.opt-panel').forEach(p=>p.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('opt-'+mealId+'-'+optN).classList.add('active');
  updateGrandTotal();
  syncPreview();
}
// ─── TBSP / MEASURING SPOON CONVERSION ───────────────────────
// Density (g per tablespoon = 15ml) per food category / item
// If exact food not found, use category default
const TBSP_DENSITY={
  // Liquids & oils
  'زيت زيتون بكر ممتاز':13.6,'زيت جوز الهند':13.6,'زيت أفوكادو':13.6,'زيت السمسم':13.6,
  'زيت الكتان':13.6,'زيت بذور العنب':13.6,'زيت جوز':13.6,'زيت السمن البلدي (غي)':12.8,
  'زبدة غير مملحة':14.2,'كريم تشيز (جبن كريمي)':15,
  // Nut butters
  'زبدة الفول السوداني الطبيعية':16,'زبدة اللوز الطبيعية':16,'زبدة الكاجو':16,'طحينة سمسم':15,
  // Powders
  'بروتين مصل اللبن (واي — سكوب 30غ)':10,'كازين بروتين (سكوب)':10,'دكستروز / جلوكوز':12,
  'كرياتين مونوهيدرات (5غ)':5,'جلوتامين (بودرة)':6,'BCAA (بودرة)':5,
  'نشا ذرة':10,'دقيق ذرة':9,'شوفان جاف (خام)':9,
  // Seeds
  'بذور الشيا':10,'بذور الكتان المطحونة':9,'بذور السمسم':9,
  'بذور عباد الشمس':9,'بذور اليقطين (قرع)':10,'بذور القنب':10,
  // Honey / syrup
  'عسل نحل طبيعي':21,'دبس قصب':21,
  // Default by category
  _liquids:14, _powder:9, _grain:12, _cooked:18, _nuts:10, _default:15
};

function gramToTbsp(grams, foodName, cat){
  if(!grams||grams<=0)return null;
  // Exact match
  if(TBSP_DENSITY[foodName]) return+(grams/TBSP_DENSITY[foodName]).toFixed(2);
  // Category heuristics
  if(/زيت|سمن|زبد/.test(foodName)) return+(grams/TBSP_DENSITY._liquids).toFixed(2);
  if(/بودر|بروتين|كرياتين|دكستروز|جلوتامين|bcaa|نشا|دقيق/.test(foodName.toLowerCase())) return+(grams/TBSP_DENSITY._powder).toFixed(2);
  if(/بذور|سمسم|شيا|كتان/.test(foodName)) return+(grams/TBSP_DENSITY._powder).toFixed(2);
  if(/مسلوق|مطبوخ|مشوي/.test(foodName)) return+(grams/TBSP_DENSITY._cooked).toFixed(2);
  if(/أرز|معكرونة|شوفان|قمح|برغل|كسكس/.test(foodName)) return+(grams/TBSP_DENSITY._grain).toFixed(2);
  if(/لوز|جوز|كاجو|فستق|مكسرات|بندق/.test(foodName)) return+(grams/TBSP_DENSITY._nuts).toFixed(2);
  if(cat&&/زيوت/.test(cat)) return+(grams/TBSP_DENSITY._liquids).toFixed(2);
  if(cat&&/مكملات/.test(cat)) return+(grams/TBSP_DENSITY._powder).toFixed(2);
  return+(grams/TBSP_DENSITY._default).toFixed(2);
}

function tbspToGram(tbsp, foodName, cat){
  if(!tbsp||tbsp<=0)return null;
  if(TBSP_DENSITY[foodName]) return+Math.round(tbsp*TBSP_DENSITY[foodName]);
  if(/زيت|سمن|زبد/.test(foodName)) return+Math.round(tbsp*TBSP_DENSITY._liquids);
  if(/بذور|سمسم|شيا|كتان/.test(foodName)) return+Math.round(tbsp*TBSP_DENSITY._powder);
  if(/مسلوق|مطبوخ|مشوي/.test(foodName)) return+Math.round(tbsp*TBSP_DENSITY._cooked);
  if(/أرز|معكرونة|شوفان|قمح/.test(foodName)) return+Math.round(tbsp*TBSP_DENSITY._grain);
  if(/لوز|جوز|كاجو|مكسرات/.test(foodName)) return+Math.round(tbsp*TBSP_DENSITY._nuts);
  return+Math.round(tbsp*TBSP_DENSITY._default);
}

function formatTbspAr(tbsp){
  if(tbsp===null)return'—';
  if(tbsp<0.25)return `${Math.round(tbsp*1000/15)} مل`;
  if(tbsp<=0.5)return `½ ملعقة`;
  if(tbsp<=1)return `${tbsp<=0.75?'¾':'1'} ملعقة`;
  const full=Math.floor(tbsp);const rem=tbsp-full;
  const remStr=rem<0.25?'':rem<0.5?'¼':rem<0.75?'½':'¾';
  return full>0?`${full}${remStr?' '+remStr:''} ملعقة`:`${remStr} ملعقة`;
}

function formatTbspEn(tbsp){
  if(tbsp===null)return'—';
  if(tbsp<0.25)return `${Math.round(tbsp*1000/15)} ml`;
  if(tbsp<=0.5)return `½ tbsp`;
  if(tbsp<=1)return `${tbsp<=0.75?'¾':'1'} tbsp`;
  const full=Math.floor(tbsp);const rem=tbsp-full;
  const remStr=rem<0.25?'':rem<0.5?'¼':rem<0.75?'½':'¾';
  return full>0?`${full}${remStr?' '+remStr:''} tbsp`:`${remStr} tbsp`;
}

function addFoodRow(mealId,optN){
  const c=document.getElementById('rows-'+mealId+'-'+optN);
  const row=document.createElement('div');
  const isEN = window._lang === 'en';
  row.className='food-row';
  row.dataset.foodCal='';row.dataset.foodProt='';row.dataset.foodCarb='';row.dataset.foodFat='';
  row.dataset.foodName='';row.dataset.foodCat='';
  row.innerHTML=`
    <div class="food-select-wrap">
      <input type="text" class="food-search" placeholder="${isEN ? 'Search food database...' : 'ابحث في قاعدة البيانات...'}" autocomplete="off"
        oninput="renderDropdown(this,this.value)"
        onfocus="renderDropdown(this,this.value)"
        onkeydown="handleFoodKey(event,this)"/>
      <div class="food-dropdown"></div>
    </div>
    <div class="food-qty-wrap">
      <div class="food-qty-label">${isEN ? 'grams' : 'غرام'}</div>
      <input type="number" class="food-qty-input" placeholder="100" min="1" step="1" oninput="onQtyChange(this)"
        onkeydown="if(event.key==='Enter'){event.preventDefault();const rows=this.closest('.food-rows');const btn=this.closest('.opt-panel')?.querySelector('.add-food-btn');if(btn){btn.click();setTimeout(()=>{const newRow=rows?.lastElementChild?.querySelector('.food-search');if(newRow)newRow.focus();},50);}}"/>
    </div>
    <div class="food-tbsp-wrap">
      <div class="food-qty-label">${isEN ? 'spoons' : 'ملعقة'}</div>
      <input type="number" class="food-tbsp-input" placeholder="—" min="0.25" step="0.25" oninput="onTbspChange(this)"/>
    </div>
    <button class="del-row food-del-btn" onclick="this.closest('.food-row').remove();recalcTotalsFromRow(this.closest('.opt-panel'))" title="Delete row">✕</button>
    <button class="del-row" onclick="duplicateFoodRow(this.closest('.food-row'))" title="Duplicate this food row" style="background:transparent;border:none;color:#444;font-size:13px;cursor:pointer;padding:0 4px;transition:color .15s;" onmouseover="this.style.color='var(--y)'" onmouseout="this.style.color='#444'">⧉</button>
    <div class="food-macro-bar"></div>`;
  c.appendChild(row);
}

function onQtyChange(input){
  const row=input.closest('.food-row');
  const tbspInput=row.querySelector('.food-tbsp-input');
  const tbspWrap=row.querySelector('.food-tbsp-wrap');
  const qty=parseFloat(input.value)||0;
  const name=row.dataset.foodName||'';const cat=row.dataset.foodCat||'';
  const unit=row.dataset.foodUnit||'';
  const sliceG=parseFloat(row.dataset.foodSliceG)||0;
  if(sliceG){
    // slice mode: grams in qty, slices in secondary column
    if(tbspWrap) tbspWrap.style.visibility='visible';
    if(qty>0){
      tbspInput.value = Math.round((qty / sliceG) * 4) / 4;
    } else { tbspInput.value=''; }
  } else if(unit){
    // piece-based: no secondary column
    if(tbspWrap) tbspWrap.style.visibility='hidden';
  } else {
    if(tbspWrap) tbspWrap.style.visibility='visible';
    if(qty>0&&name){
      const t=gramToTbsp(qty,name,cat);
      tbspInput.value=t!==null?formatTbspNum(t):'';
      tbspInput.title=t?`${t} ملعقة كبيرة`:'';
    } else { tbspInput.value=''; }
  }
  updateRowMacros(input);
  syncPreview();
  if(window.AppState) AppState.saveToHistory();
}

function onTbspChange(input){
  const row=input.closest('.food-row');
  const qtyInput=row.querySelector('.food-qty-input');
  const val=parseFloat(input.value)||0;
  const name=row.dataset.foodName||'';const cat=row.dataset.foodCat||'';
  const sliceG=parseFloat(row.dataset.foodSliceG)||0;
  if(sliceG){
    // slice → grams
    if(val>0){
      qtyInput.value = Math.round(val * sliceG);
      updateRowMacros(qtyInput);
    }
  } else if(val>0&&name){
    // tbsp → grams
    const g=tbspToGram(val,name,cat);
    if(g){qtyInput.value=g;updateRowMacros(qtyInput);}
  }
}

function formatTbspNum(t){
  // Keep as decimal for the input field
  return Math.round(t*4)/4; // round to nearest 0.25
}

function updateRowMacros(rowOrQty){
  const row=rowOrQty.classList?.contains('food-row')?rowOrQty:rowOrQty.closest('.food-row');
  if(!row)return;
  const cal=parseFloat(row.dataset.foodCal)||0;
  const prot=parseFloat(row.dataset.foodProt)||0;
  const carb=parseFloat(row.dataset.foodCarb)||0;
  const fat=parseFloat(row.dataset.foodFat)||0;
  const bar=row.querySelector('.food-macro-bar');
  if(!cal&&!prot){bar.classList.remove('visible');recalcTotalsFromRow(row.closest('.opt-panel'));return;}
  const unitG=parseFloat(row.dataset.foodUnitG)||0;
  const unit=row.dataset.foodUnit||'';
  const sliceG=parseFloat(row.dataset.foodSliceG)||0;
  const qtyRaw=parseFloat(row.querySelector('.food-qty-input').value)||0;
  const isEN = window._lang === 'en';
  let scale, displayStr;
  if(unit && unitG && qtyRaw > 0){
    scale = (qtyRaw * unitG) / 100;
    const unitLabel = (isEN && row.dataset.foodNameEn) ? (row.dataset.foodUnitEn || unit) : unit;
    displayStr = `${qtyRaw} ${unitLabel}`;
  } else {
    const qty=qtyRaw||100;
    scale=qty/100;
    const secVal=parseFloat(row.querySelector('.food-tbsp-input')?.value)||null;
    let secStr = '';
    if(secVal){
      if(sliceG){
        secStr = ` • ${secVal} ${isEN ? 'slice' : 'شريحة'}`;
      } else {
        secStr = ` • ${formatTbspAr(secVal)}`;
      }
    }
    displayStr=`${qty}${isEN ? 'g' : 'غ'}${secStr}`;
  }
  bar.innerHTML=`<span class="fmb-per">${isEN ? 'Per' : 'لكل'} ${displayStr}:</span>
    <span class="fmb-item"><span class="fmb-label">${isEN ? 'cal' : 'سعرات'}</span><span class="fmb-val cal">${Math.round(cal*scale)}</span></span>
    <span class="fmb-item"><span class="fmb-label">${isEN ? 'prot' : 'بروتين'}</span><span class="fmb-val prot">${(prot*scale).toFixed(1)}${isEN ? 'g' : 'غ'}</span></span>
    <span class="fmb-item"><span class="fmb-label">${isEN ? 'carb' : 'كارب'}</span><span class="fmb-val carb">${(carb*scale).toFixed(1)}${isEN ? 'g' : 'غ'}</span></span>
    <span class="fmb-item"><span class="fmb-label">${isEN ? 'fat' : 'دهون'}</span><span class="fmb-val fat">${(fat*scale).toFixed(1)}${isEN ? 'g' : 'غ'}</span></span>`;
  bar.classList.add('visible');
  recalcTotalsFromRow(row.closest('.opt-panel'));
}

function handleFoodKey(e,input){
  const dd=input.closest('.food-row').querySelector('.food-dropdown');
  const items=[...dd.querySelectorAll('.fdd-item')];
  // Tab: jump to grams input, closing dropdown
  if(e.key==='Tab' && !e.shiftKey){
    const qtyInput=input.closest('.food-row').querySelector('.food-qty-input');
    if(qtyInput && dd.classList.contains('open')){
      e.preventDefault();
      dd.classList.remove('open');
      qtyInput.focus();
      qtyInput.select();
      return;
    }
  }
  if(!items.length)return;
  const cur=dd.querySelector('.fdd-item.highlighted');
  if(e.key==='ArrowDown'){
    e.preventDefault();
    const next=cur?items[items.indexOf(cur)+1]||items[0]:items[0];
    items.forEach(i=>i.classList.remove('highlighted'));next.classList.add('highlighted');next.scrollIntoView({block:'nearest'});
  } else if(e.key==='ArrowUp'){
    e.preventDefault();
    const prev=cur?items[items.indexOf(cur)-1]||items[items.length-1]:items[items.length-1];
    items.forEach(i=>i.classList.remove('highlighted'));prev.classList.add('highlighted');prev.scrollIntoView({block:'nearest'});
  } else if(e.key==='Enter'&&cur){
    e.preventDefault();cur.dispatchEvent(new MouseEvent('mousedown',{bubbles:true}));
  } else if(e.key==='Escape'){
    dd.classList.remove('open');
  }
}

// ─── SUPPLEMENTS ─────────────────────────────────────────────
function addSuppRow(s='',d='',t=''){
  const c=document.getElementById('supp-rows');
  const row=document.createElement('div');row.className='supp-row';
  row.innerHTML=`<input type="text" value="${s}" placeholder="e.g. Creatine"/>
    <input type="text" value="${d}" placeholder="e.g. 5g"/>
    <div style="position:relative;">
      <input type="text" value="${t}" placeholder="Post-workout" id="supp-timing-${Date.now()}" onfocus="showTimingChips(this)" onblur="setTimeout(()=>hideTimingChips(this),200)"/>
      <div class="supp-timing-chips" style="display:none;position:absolute;top:100%;left:0;right:0;background:var(--card);border:1px solid var(--border);z-index:200;padding:6px;display:none;flex-wrap:wrap;gap:4px;">
        ${['Pre-workout','Post-workout','Morning','Before bed','With breakfast','With lunch','With dinner','Between meals'].map(t=>`<button type="button" class="quick-chip" onmousedown="setTimingVal(this,'${t}')">${t}</button>`).join('')}
      </div>
    </div>
    <button class="del-row" onclick="this.parentElement.remove()">✕</button>`;
  c.appendChild(row);
  if(typeof suppTimelineRender==='function') suppTimelineRender();
}
// Live sync: typing (name/dose/timing) and deleting rows refresh the clock
document.addEventListener('input', e => {
  if(e.target && e.target.closest && e.target.closest('#supp-rows')){
    setTimeout(()=>{ if(typeof suppTimelineRender==='function') suppTimelineRender(); }, 0);
  }
});
document.addEventListener('click', e => {
  const t = e.target;
  if(t && t.closest && t.closest('#supp-rows .del-row')){
    // refresh after the row is actually removed
    setTimeout(()=>{ if(typeof suppTimelineRender==='function') suppTimelineRender(); }, 0);
  }
});
function showTimingChips(inp){
  const chips=inp.nextElementSibling;
  if(chips){chips.style.display='flex';}
}
function hideTimingChips(inp){
  const chips=inp.nextElementSibling;
  if(chips){chips.style.display='none';}
}
function setTimingVal(btn,val){
  const inp=btn.closest('.supp-timing-chips').previousElementSibling;
  if(inp){
    inp.value=val;
    inp.dispatchEvent(new Event('input',{bubbles:true}));
  }
}

// ─── 🛒 SUPPLEMENT CATALOG ────────────────────────────────────
// Full supplement database — tap a card to add it to the stack.
// g: group → perf=أداء وتمرين | health=صحة وفيتامينات | recov=استشفاء ونوم | fat=حرق الدهون
const SUPP_DB=[
  // 💪 Performance & Training
  {i:'💪',g:'perf',ar:'واي بروتين',          en:'Whey Protein',            d:'30g (scoop)',      t:'Post-workout'},
  {i:'💎',g:'perf',ar:'واي بروتين ايزوليت',   en:'Whey Isolate',            d:'30g (scoop)',      t:'Post-workout'},
  {i:'🌙',g:'perf',ar:'كازين بروتين',         en:'Casein Protein',          d:'30g (scoop)',      t:'Before bed'},
  {i:'💥',g:'perf',ar:'كرياتين مونوهيدرات',   en:'Creatine Monohydrate',    d:'5g',               t:'Post-workout'},
  {i:'⚡',g:'perf',ar:'بري ووركاوت',          en:'Pre-Workout',             d:'1 scoop',          t:'30 min pre-workout'},
  {i:'🧬',g:'perf',ar:'BCAA',                en:'BCAA',                    d:'10g',              t:'During workout'},
  {i:'🩸',g:'perf',ar:'سيترولين مالات',       en:'Citrulline Malate',       d:'5g',               t:'Pre-workout'},
  {i:'🏃',g:'perf',ar:'بيتا ألانين',          en:'Beta-Alanine',            d:'3g',               t:'Daily'},
  {i:'🔥',g:'perf',ar:'إل-كارنيتين',          en:'L-Carnitine',             d:'2g',               t:'Pre-workout'},
  {i:'🫀',g:'perf',ar:'أرجينين',              en:'Arginine',                d:'3g',               t:'Pre-workout'},
  // 🩺 Health & Vitamins
  {i:'🩺',g:'health',ar:'ملتي فيتامين',       en:'Multivitamin',            d:'1 tablet',         t:'With breakfast'},
  {i:'🐟',g:'health',ar:'أوميجا 3 (سمك)',     en:'Omega-3 Fish Oil',        d:'2 capsules',       t:'With meal'},
  {i:'☀️',g:'health',ar:'فيتامين D3',         en:'Vitamin D3',              d:'5000 IU',          t:'Morning'},
  {i:'🍊',g:'health',ar:'فيتامين C',          en:'Vitamin C',               d:'1000mg',           t:'With breakfast'},
  {i:'🧲',g:'health',ar:'مغنيسيوم',           en:'Magnesium',               d:'400mg',            t:'Before bed'},
  {i:'🛡',g:'health',ar:'زنك',                en:'Zinc',                    d:'25mg',             t:'Before bed'},
  {i:'🦴',g:'health',ar:'كالسيوم',            en:'Calcium',                 d:'500mg',            t:'With dinner'},
  {i:'🩸',g:'health',ar:'حديد (فريوسول)',     en:'Iron (Ferrous Sulfate)',  d:'18mg',             t:'Morning'},
  {i:'🔄',g:'health',ar:'بروبيوتيك',          en:'Probiotic',               d:'1 capsule',        t:'With breakfast'},
  {i:'🧹',g:'health',ar:'ألياف (سيلليوم)',    en:'Fiber (Psyllium Husk)',   d:'5g',               t:'Before bed'},
  {i:'🕸',g:'health',ar:'كولاجين',            en:'Collagen Peptides',       d:'10g',              t:'Morning'},
  {i:'❤️‍🔥',g:'health',ar:'كو Q10',          en:'Coenzyme Q10',            d:'100mg',            t:'With breakfast'},
  // 🌙 Recovery & Sleep
  {i:'😴',g:'recov',ar:'ميلاتونين',           en:'Melatonin',               d:'1-3mg',            t:'Before bed'},
  {i:'🌿',g:'recov',ar:'أشواجاندا',           en:'Ashwagandha',             d:'300mg',            t:'Before bed'},
  {i:'🛌',g:'recov',ar:'ZMA (زنك + مغنيسيوم)',en:'ZMA (Zinc + Magnesium)',  d:'1 dose',           t:'Before bed (empty stomach)'},
  {i:'🔋',g:'recov',ar:'جلوتامين',            en:'Glutamine',               d:'5g',               t:'Post-workout'},
  {i:'🩹',g:'recov',ar:'جلوكوزامين + كوندرويتين',en:'Glucosamine + Chondroitin',d:'1500mg',         t:'With breakfast'},
  // 🔥 Fat Loss & Metabolism
  {i:'☕',g:'fat',ar:'كافيين (قرص)',          en:'Caffeine Tablet',         d:'200mg',            t:'Morning / Pre-workout'},
  {i:'🍵',g:'fat',ar:'مستخلص الشاي الأخضر',   en:'Green Tea Extract',       d:'500mg',            t:'Morning'},
  {i:'✂️',g:'fat',ar:'CLA',                  en:'CLA (Conjugated Linoleic Acid)', d:'3g',         t:'With meals'},
  {i:'💧',g:'fat',ar:'خل التفاح',             en:'Apple Cider Vinegar',     d:'1 tbsp in water',  t:'With breakfast'},
  {i:'⚡',g:'fat',ar:'كروم (بيكولينات)',      en:'Chromium Picolinate',     d:'200mcg',           t:'With breakfast'},

  // ── v2 upgrade batch ──
  // 💪 Performance
  {i:'🏗',g:'perf',ar:'ماس جينر (مضخم)',      en:'Mass Gainer',             d:'2 scoops',         t:'Between meals'},
  {i:'🧪',g:'perf',ar:'EAA (أحماض أساسية)',   en:'EAA (Essential Amino Acids)', d:'10g',          t:'During workout'},
  {i:'💠',g:'perf',ar:'كرياتين HCL',          en:'Creatine HCL',            d:'2g',               t:'Post-workout'},
  {i:'🥩',g:'perf',ar:'بروتين لحم البقر',     en:'Beef Protein Isolate',    d:'30g (scoop)',      t:'Post-workout'},
  // 🩺 Health
  {i:'🅱',g:'health',ar:'مجموعة فيتامين B',    en:'Vitamin B-Complex',       d:'1 tablet',         t:'With breakfast'},
  {i:'💉',g:'health',ar:'فيتامين B12',        en:'Vitamin B12',             d:'1000mcg',          t:'Morning'},
  {i:'🥜',g:'health',ar:'فيتامين E',          en:'Vitamin E',               d:'400 IU',           t:'With breakfast'},
  {i:'💊',g:'health',ar:'كالسيوم K2 + D3',  en:'K2 + D3 Complex',         d:'1 capsule',        t:'With breakfast'},
  {i:'🧂',g:'health',ar:'إلكترولايت (أملاح البوتاسيوم)', en:'Electrolytes',   d:'1 sachet',         t:'During workout'},
  {i:'🫁',g:'health',ar:'إنزيمات هضمية',      en:'Digestive Enzymes',       d:'1 capsule',        t:'With meal'},
  {i:'🌿',g:'health',ar:'سبيرولينا',          en:'Spirulina',               d:'5g',               t:'Morning'},
  {i:'🔬',g:'health',ar:'سيلينيوم',           en:'Selenium',                d:'100mcg',           t:'With breakfast'},
  // 🌙 Recovery
  {i:'🍒',g:'recov',ar:'كرز تارت',            en:'Tart Cherry Extract',     d:'500mg',            t:'Before bed'},
  {i:'🟡',g:'recov',ar:'كركمين + بيبيرين',    en:'Curcumin + Piperine',     d:'1000mg',           t:'With breakfast'},
  {i:'🧘',g:'recov',ar:'جابا (GABA)',         en:'GABA',                    d:'500mg',            t:'Before bed'},
  {i:'🌱',g:'recov',ar:'روديولا (الجذور الذهبية)', en:'Rhodiola Rosea',      d:'300mg',            t:'Morning'},
  // 🔥 Fat Loss
  {i:'🟢',g:'fat',ar:'حبوب البن الأخضر',      en:'Green Coffee Bean Extract', d:'400mg',          t:'Morning'},
  {i:'🍚',g:'fat',ar:'قرفة سيلانية',          en:'Ceylon Cinnamon',         d:'1g',               t:'With breakfast'},
  {i:'⛔',g:'fat',ar:'يوهمبين (صائم)',        en:'Yohimbine (fasted)',      d:'5mg',              t:'Fasted / 30 min pre-workout'},
  {i:'🌀',g:'fat',ar:'كافيين + إل ثيانين',    en:'Caffeine + L-Theanine',   d:'200mg / 100mg',    t:'Morning'},
];

window._suppCat = 'all';

const SUPP_GROUPS = [
  {id:'all',    ic:'📦', ar:'الكل',            en:'All'},
  {id:'perf',   ic:'💪', ar:'أداء وتمرين',     en:'Performance'},
  {id:'health', ic:'🩺', ar:'صحة وفيتامينات',  en:'Health & Vitamins'},
  {id:'recov',  ic:'🌙', ar:'استشفاء ونوم',    en:'Recovery & Sleep'},
  {id:'fat',    ic:'🔥', ar:'حرق الدهون',      en:'Fat Loss'},
];

function suppRenderCatalog(){
  const isEN = (window._lang === 'en');
  const tabsEl = document.getElementById('supp-cat-tabs');
  const gridEl = document.getElementById('supp-grid');
  const emptyEl = document.getElementById('supp-catalog-empty');
  if(!tabsEl || !gridEl) return;

  // Tabs
  tabsEl.innerHTML = SUPP_GROUPS.map(gr => {
    const cnt = gr.id==='all' ? SUPP_DB.length : SUPP_DB.filter(s=>s.g===gr.id).length;
    const lbl = isEN ? gr.en : gr.ar;
    return `<button class="supp-cat-tab ${window._suppCat===gr.id?'active':''}" onclick="suppSetCat('${gr.id}')">${gr.ic} ${lbl} <span style="color:#444;">(${cnt})</span></button>`;
  }).join('');

  // Cards
  const q = (document.getElementById('supp-search')?.value || '').trim().toLowerCase();
  let list = SUPP_DB.map((s,idx)=>({...s, _i:idx}));
  if (window._suppCat !== 'all') list = list.filter(s => s.g === window._suppCat);
  if (q) list = list.filter(s =>
    s.ar.toLowerCase().includes(q) || s.en.toLowerCase().includes(q) ||
    s.d.toLowerCase().includes(q) || s.t.toLowerCase().includes(q)
  );

  if(!list.length){
    gridEl.innerHTML='';
    if(emptyEl) emptyEl.style.display='block';
    return;
  }
  if(emptyEl) emptyEl.style.display='none';

  gridEl.innerHTML = list.map(s => {
    const name = isEN ? s.en : s.ar;
    const dose = isEN ? s.d : s.d;
    return `<div class="supp-card" onclick="suppAddFromCatalog(${s._i})" title="${name} — ${dose} • ${s.t}">
      <span class="supp-card-ic">${s.i}</span>
      <span style="min-width:0;">
        <span class="supp-card-name">${name}</span><br/>
        <span class="supp-card-meta">💊 ${dose} &nbsp;•&nbsp; ⏰ ${s.t}</span>
      </span>
      <span class="supp-card-add">＋</span>
    </div>`;
  }).join('');
}

function suppSetCat(id){
  window._suppCat = id;
  suppRenderCatalog();
}

function suppAddFromCatalog(idx){
  const s = SUPP_DB[idx];
  if(!s) return;
  const isEN = (window._lang === 'en');
  addSuppRow(isEN ? s.en : s.ar, s.d, s.t);
  toast('✅ Added: ' + (isEN ? s.en : s.ar), 'success');
  // Nudge editor into view on mobile
  const rows = document.getElementById('supp-rows');
  if (rows && rows.parentElement) rows.parentElement.scrollIntoView({behavior:'smooth', block:'nearest'});
  if(typeof suppTimelineRender==='function') suppTimelineRender();
}

// ─── 🕐 SUPPLEMENT DAY TIMELINE ───────────────────────────────
// Reads the stack rows as they are (name / dose / timing strings) and places
// each supplement on a 24-hour clock. Timing words → hours; pre/during/post
// anchored on the training time entered in Client Info (default 18:00).
function _suppToHours(h24){
  // '14.5' → '2:30 PM' style label, respecting EN/AR lang
  const isEN = (window._lang === 'en');
  const h = Math.floor(h24), m = Math.round((h24-h)*60);
  const mm = (m<10?'0':'')+m;
  if(!isEN){
    const sfx = h24<12?'ص':(h24<17?'م':(h24<21?'م':'م'));
    let h12 = h%12; if(h12===0)h12=12;
    return h12+':'+mm+' '+(h24<12?'ص':'م');
  }
  let h12 = h%12; if(h12===0)h12=12;
  return h12+':'+mm+(h24<12?' AM':(h24<17?' PM':' PM'));
}

// Timing string → hour-of-day (or null when unrecognised).
// NOTE: order matters — most specific phrases are checked first.
function _suppTimeFor(timing, trainTime){
  const t = String(timing||'').toLowerCase();
  if(!t) return null;
  // Workout anchor from #t-traintime (falls back to 18:00)
  let trainH = 18;
  const tt = document.getElementById('t-traintime');
  if(tt && /^\d{1,2}:\d{2}/.test(tt.value)){
    const p = tt.value.split(':');
    trainH = (parseFloat(p[0]) + parseFloat(p[1])/60) % 24;
  }
  const has = re => re.test(t);
  // Ramadan schedule overrides (suhoor ≈ 4:00, iftar ≈ 18:15)
  if (window._ramadan) {
    if (has(/before\s*bed|فجر|نوم/)) return 23;
    if (has(/fasted|empty\s*stomach|صا|صائم/)) return 3.5;
    if (has(/suhoor|سحور|breakfast|فطار/)) return 4;
    if (has(/morning|صباح/)) return 5;
    if (has(/iftar|إفطار|افطار|lunch|غدا|غداء/)) return 18.25;
    if (has(/between|بين الوجبات/)) return 16;
    if (has(/mid.?day|afternoon|عصر/)) return 16.5;
    if (has(/dinner|عشاء/)) return 20;
    // pre/during/post fall through to the workout anchor below
  }
  if(has(/before\s*bed|\bfajr|خُد|سليب|naum/)) return 22;
  if(has(/fasted|empty\s*stomach|صا|صائم/)) return 6.5;
  if(has(/breakfast|فطار/)) return 7;
  if(has(/morning|صباح/)) return 7.5;
  if(has(/lunch|غدا|غداء/)) return 13;
  if(has(/between|بين الوجبات/)) return 10.5;
  if(has(/mid.?day|afternoon|عصر/)) return 16;
  if(has(/dinner|عشاء/)) return 19.5;
  if(has(/during|أثناء|خلال التمرين/)) return trainH;
  if(has(/\bpre\b|قبل التمرين/)) return (trainH - 0.5 + 24) % 24;
  if(has(/\bpost\b|بعد التمرين|post.?workout/)) return (trainH + 1) % 24;
  if(has(/daily|anytime|يوميا|أي وقت/)) return 12;
  return null;
}

function _suppGroupColor(name){
  const q = String(name||'').toLowerCase();
  const s = SUPP_DB.find(x =>
    x.en.toLowerCase() === q || x.ar === name ||
    x.en.toLowerCase().includes(q) && q.length > 3 ||
    q.includes(x.en.toLowerCase().split(' ')[0]) && q.length > 2);
  return s ? ({perf:'#F5FF00', health:'#00CFFF', recov:'#4ade80', fat:'#FF8C42'})[s.g] || '#888'
           : '#888';
}

// Main renderer — SVG clock + chronological list. Safe to call anytime.
function suppTimelineRender(){
  const clockEl = document.getElementById('supp-clock');
  const listEl  = document.getElementById('supp-tl-list');
  if(!clockEl || !listEl) return;
  if(typeof suppConflictsRender==='function') suppConflictsRender();
  const isEN = (window._lang === 'en');

  // 1) Collect rows
  const items = [];
  document.querySelectorAll('#supp-rows .supp-row').forEach(row => {
    const ins = row.querySelectorAll('input');
    if(ins.length < 3) return;
    const name = (ins[0].value||'').trim();
    const dose = (ins[1].value||'').trim();
    const tim  = (ins[2].value||'').trim();
    if(!name) return;
    const h = _suppTimeFor(tim);
    items.push({name, dose, tim, h: h===null?null:h});
  });

  // 2) Clock face (drawn once, then markers on top)
  const CX=120, CY=120, R=88;
  let svg = `<circle class="sc-face" cx="120" cy="120" r="104"/>`;
  // workout sector (pre −0.5h → post +1h, clamped-ish)
  let ttOk = false, trainH = 18;
  const tt = document.getElementById('t-traintime');
  if(tt && /^\d{1,2}:\d{2}/.test(tt.value || '')){
    const p = tt.value.split(':');
    trainH = (parseFloat(p[0]) + parseFloat(p[1])/60) % 24;
    ttOk = true;
  }
  if(ttOk){
    const a1 = ((trainH-0.5)/24)*Math.PI*2 - Math.PI/2;
    const a2 = ((trainH+1)/24)*Math.PI*2 - Math.PI/2;
    const x1 = CX + (R-10)*Math.cos(a1), y1 = CY + (R-10)*Math.sin(a1);
    const x2 = CX + (R-10)*Math.cos(a2), y2 = CY + (R-10)*Math.sin(a2);
    const large = (a2-a1) > Math.PI ? 1 : 0;
    svg += `<path class="sc-wedge" d="M ${CX} ${CY} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${(R-10)} ${(R-10)} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z"/>`;
  }
  // ticks + numbers
  for(let hIdx=0; hIdx<24; hIdx++){
    const ang = (hIdx/24)*Math.PI*2 - Math.PI/2;
    const major = (hIdx%3===0);
    const r1 = R-2, r2 = R+(major?6:3);
    svg += `<line class="${major?'sc-tick-major':'sc-tick'}" x1="${(CX+r1*Math.cos(ang)).toFixed(1)}" y1="${(CY+r1*Math.sin(ang)).toFixed(1)}" x2="${(CX+r2*Math.cos(ang)).toFixed(1)}" y2="${(CY+r2*Math.sin(ang)).toFixed(1)}"/>`;
    if(major){
      const rn = R+17;
      svg += `<text class="sc-num" x="${(CX+rn*Math.cos(ang)).toFixed(1)}" y="${(CY+rn*Math.sin(ang)).toFixed(1)}" text-anchor="middle" dominant-baseline="middle">${hIdx}</text>`;
    }
  }
  svg += `<circle class="sc-ring" cx="120" cy="120" r="${R-14}"/>`;
  // AM / PM hints
  svg += `<text class="sc-am" x="${CX}" y="${CY-R+30}" text-anchor="middle">AM ☀</text>`;
  svg += `<text class="sc-am" x="${CX}" y="${CY+R-26}" text-anchor="middle">PM 🌙</text>`;

  // 3) Markers — grouped timing entries, alternating radius to avoid overlap
  const placed = items.filter(x => x.h !== null).sort((a,b) => a.h - b.h);
  const counts = {};
  const knowsTrain = ttOk;
  placed.forEach(x => {
    const key = Math.round(x.h*4)/4;   // cluster within ~15 min
    counts[key] = (counts[key]||0)+1;
    const i = counts[key]-1;
    const radAlternation = i%2 === 0 ? 0 : 11;
    const ang = (x.h/24)*Math.PI*2 - Math.PI/2;
    const mr = R-14 + radAlternation;
    const mx = CX + mr*Math.cos(ang), my = CY + mr*Math.sin(ang);
    const color = _suppGroupColor(x.name);
    const ic = (SUPP_DB.find(s => s.en.toLowerCase()===x.name.toLowerCase() || s.ar===x.name)||{}).i || '💊';
    x._time = _suppToHours(x.h);
    x._color = color;
    svg += `<g class="supp-tl-mark" onclick="scrollToSuppRow('${x.name.replace(/'/g,"\\'")}')" >
      <circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="9" fill="${color}" opacity="0.16"/>
      <circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="4.5" fill="${color}"/>
      <foreignObject x="${(mx-9).toFixed(1)}" y="${(my-24).toFixed(1)}" width="18" height="18"><div class="st-mark-ic" style="font-size:12px;">${ic}</div></foreignObject>
      <title>${x.name} — ${x._time}</title>
    </g>`;
  });

  // 4) Hands — small hour/minute set to "now" for liveliness
  const now = new Date();
  const nowH = now.getHours() + now.getMinutes()/60;
  const nowA = (nowH/24)*Math.PI*2 - Math.PI/2;
  svg += `<line class="sc-hand-h" x1="${CX}" y1="${CY}" x2="${(CX+(R-30)*Math.cos(nowA)).toFixed(1)}" y2="${(CY+(R-30)*Math.sin(nowA)).toFixed(1)}"/>`;
  svg += `<circle class="sc-pin" cx="120" cy="120" r="3"/>`;

  const emptyEl = document.getElementById('supp-tl-empty');
  if(!placed.length){
    svg += `<text class="sc-mid" x="${CX}" y="${CY+4}" text-anchor="middle">${isEN ? 'NO STACK' : 'لا يوجد'}</text>`;
    clockEl.innerHTML = svg;
    listEl.innerHTML = '';
    if(emptyEl) emptyEl.style.display = 'block';
    return;
  }
  if(emptyEl) emptyEl.style.display = 'none';
  clockEl.innerHTML = svg;

  // 5) Legend
  const legEl = document.getElementById('supp-tl-legend');
  if(legEl){
    legEl.innerHTML = [
      ['#F5FF00','perf', isEN?'Performance':'أداء'],
      ['#00CFFF','health', isEN?'Health':'صحة'],
      ['#4ade80','recov', isEN?'Recovery':'استشفاء'],
      ['#FF8C42','fat', isEN?'Fat Loss':'حرق دهون'],
      ['#888','unk', isEN?'Custom':'مُدخل يدويّ'],
    ].map(([c,,lbl]) => `<div class="lg-row"><span class="lg-dot" style="background:${c}"></span>${lbl}</div>`).join('');
  }

  // 6) Chronological list (unknown-timing items last)
  const unknown = items.filter(x => x.h === null);
  let html = '';
  placed.forEach(x => {
    html += `<div class="supp-tl-row">
      <span class="tl-time">${x._time}</span>
      <span class="tl-dot" style="background:${x._color}"></span>
      <span class="tl-name">${isEN?x.name:x.name}</span>
      <span class="tl-dose">${x.dose}${x.tim?' • '+x.tim:''}</span>
    </div>`;
  });
  unknown.forEach(x => {
    html += `<div class="supp-tl-row" style="opacity:.55;">
      <span class="tl-time" style="color:#888;">—:—</span>
      <span class="tl-dot" style="background:#888"></span>
      <span class="tl-name">${x.name}</span>
      <span class="tl-dose">${x.dose}${x.tim?' • '+x.tim:''}</span>
    </div>`;
  });
  listEl.innerHTML = html;
}

// Click a clock marker → highlight its row in the editor
function scrollToSuppRow(name){
  const rows = document.querySelectorAll('#supp-rows .supp-row');
  rows.forEach(r => {
    const inp = r.querySelector('input');
    if(inp && inp.value.trim().toLowerCase() === String(name).toLowerCase()){
      r.scrollIntoView({behavior:'smooth', block:'center'});
      r.style.background = 'rgba(245,255,0,0.07)';
      setTimeout(()=>{ r.style.background=''; }, 1200);
    }
  });
}


// ─── BMR ──────────────────────────────────────────────────────
function calcBMR(){
  const w=parseFloat(document.getElementById('ib-weight').value);
  const h=parseFloat(document.getElementById('ib-height').value);
  // Use InBody-page age/gender first, fall back to Client page
  const aEl=document.getElementById('ib-age')||document.getElementById('c-age');
  const gEl=document.getElementById('ib-gender')||document.getElementById('c-gender');
  const a=parseFloat(aEl?.value);
  const g=gEl?.value||'male';
  const act=parseFloat(document.getElementById('ib-activity').value)||1.55;
  if(!w||!h||!a){
    document.getElementById('bmr-card').style.display='none';
    return;
  }
  const bmr=g==='male'?Math.round(10*w+6.25*h-5*a+5):Math.round(10*w+6.25*h-5*a-161);
  const tdee=Math.round(bmr*act);
  document.getElementById('r-bmr').textContent=bmr;
  document.getElementById('r-tdee').textContent=tdee;
  document.getElementById('r-deficit').textContent=tdee-500;
  document.getElementById('r-surplus').textContent=tdee+300;
  document.getElementById('bmr-card').style.display='block';
  window._bmr=bmr;window._tdee=tdee;
  const _si=document.getElementById("smg-tdee-input");if(_si&&!_si.value)_si.value=tdee;
  syncPreview();
}
function autofillFromTDEE(){
  if(!window._tdee){toast('Calculate BMR first');return;}
  const goal=document.getElementById('c-goal').value.toLowerCase();
  let cal=window._tdee;
  if(goal.includes('loss')||goal.includes('cut'))cal=window._tdee-500;
  else if(goal.includes('gain')||goal.includes('bulk'))cal=window._tdee+300;
  const w=parseFloat(document.getElementById('ib-weight').value)||75;
  const prot=Math.round(w*2.2);
  const fats=Math.round(cal*0.25/9);
  const carbs=Math.round((cal-prot*4-fats*9)/4);
  document.getElementById('t-cal').value=cal;
  document.getElementById('t-prot').value=prot;
  document.getElementById('t-carbs').value=Math.max(0,carbs);
  document.getElementById('t-fats').value=fats;
  syncPreview();toast('Macros auto-filled!');
}

// ─── SMART MACRO GENERATOR ───────────────────────────────────
window._smg={goal:'loss',level:'mild',profile:'highprot',protPerKg:2.6,result:null};

function smgSetGoal(g){
  window._smg.goal=g;
  document.querySelectorAll('.smg-goal-btn').forEach(b=>b.classList.toggle('active',b.dataset.goal===g));
  const ls=document.getElementById('smg-level-section');
  const ll=document.getElementById('smg-level-label');
  if(g==='maintain'){
    ls.style.display='none';
  } else {
    ls.style.display='block';
    ll.textContent=g==='loss'?'Deficit Level':'Surplus Level';
    // update level btn labels
    const levels=g==='loss'
      ?[['mild','Mild','–10%'],['moderate','Moderate','–20%'],['aggressive','Aggressive','–25%'],['extreme','Extreme','–30%'],['custom','Custom','✎ kcal']]
      :[['lean','Lean','+5%'],['moderate','Moderate','+10%'],['aggressive','Aggressive','+15%'],['custom','Custom','✎ kcal']];
    const cont=document.getElementById('smg-level-tabs');
    cont.innerHTML=levels.map(([k,n,pct],i)=>
      `<button class="smg-level-btn${i===0?' active':''}" data-level="${k}" onclick="smgSetLevel('${k}')">${n}<span>${pct}</span></button>`
    ).join('');
    window._smg.level=levels[0][0];
  }
  smgCalc();
}

function smgSetLevel(l){
  window._smg.level=l;
  document.querySelectorAll('.smg-level-btn').forEach(b=>b.classList.toggle('active',b.dataset.level===l));
  const crow=document.getElementById('smg-custom-row');
  if(crow) crow.style.display = (l==='custom') ? 'block' : 'none';
  if(l==='custom'){
    const inp=document.getElementById('smg-custom-deficit');
    if(inp && !inp.value) inp.value = window._tdee ? Math.round(window._tdee*0.2) : 300;
    if(inp) inp.focus();
  }
  smgCalc();
}

function smgSetProfile(p){
  window._smg.profile=p;
  document.querySelectorAll('.smg-profile-btn').forEach(b=>b.classList.toggle('active',b.dataset.profile===p));
  smgCalc();
}

function smgSetProt(pg){
  window._smg.protPerKg=pg;
  document.querySelectorAll('.smg-prot-btn').forEach(b=>b.classList.toggle('active',parseFloat(b.dataset.pg)===pg));
  const lbl=document.getElementById('smg-prot-label');
  if(lbl) lbl.textContent=pg+' g/kg';
  smgCalc();
}

function smgTdeeChange(){
  const v=parseFloat(document.getElementById('smg-tdee-input')?.value);
  if(v&&v>0){window._tdee=v;document.getElementById('smg-tdee-hint').textContent='TDEE set to '+v+' kcal. Adjust options and click Calculate.';}
  smgCalc();
}
function smgAutoFillTdee(){
  if(window._tdee){
    document.getElementById('smg-tdee-input').value=window._tdee;
    document.getElementById('smg-tdee-hint').textContent='TDEE pulled from BMR calculator: '+window._tdee+' kcal.';
    smgCalc();
  } else {
    toast('Fill in weight, height & age in the InBody page first, then return here.','info');
  }
}
function smgCalc(){
  // Read TDEE from input field first, then fall back to window._tdee
  const inputTdee=parseFloat(document.getElementById('smg-tdee-input')?.value);
  if(inputTdee&&inputTdee>0) window._tdee=inputTdee;
  if(!window._tdee){
    document.getElementById('smg-preview').style.display='none';
    const applyBtn=document.getElementById('smg-apply-btn');
    applyBtn.disabled=true; applyBtn.style.opacity='.4'; applyBtn.style.cursor='not-allowed';
    document.getElementById('smg-tdee-hint').textContent='⚠ Enter your TDEE above to calculate macros.';
    document.getElementById('smg-tdee-input').style.borderColor='rgba(255,80,80,0.6)';
    const _dk=document.getElementById('smg-deficit-kcal');if(_dk)_dk.textContent='— kcal';
    const _dd=document.getElementById('smg-deficit-daily');if(_dd)_dd.textContent='enter TDEE first';
    return;
  }
  document.getElementById('smg-tdee-input').style.borderColor='rgba(245,255,0,0.4)';
  const tdee=window._tdee;
  const w=parseFloat(document.getElementById('ib-weight')?.value)||75;
  const {goal,level,profile,protPerKg}=window._smg;
  const lossMap={mild:0.90,moderate:0.80,aggressive:0.75,extreme:0.70};
  const gainMap={lean:1.05,moderate:1.10,aggressive:1.15};
  // Custom deficit: absolute kcal typed by the user, applied on top of TDEE
  let customKcal=0;
  if(level==='custom'){
    customKcal=Math.max(0,Math.round(parseFloat(document.getElementById('smg-custom-deficit')?.value)||0));
    if(customKcal<25){
      document.getElementById('smg-preview').style.display='none';
      const applyBtn=document.getElementById('smg-apply-btn');
      applyBtn.disabled=true; applyBtn.style.opacity='.4'; applyBtn.style.cursor='not-allowed';
      const _dk=document.getElementById('smg-deficit-kcal');if(_dk)_dk.textContent='✎ kcal';
      const _dd=document.getElementById('smg-deficit-daily');if(_dd)_dd.textContent='write the amount above';
      return;
    }
  }
  let calMult=1.0;
  if(level==='custom'){
    calMult = (goal==='loss') ? 1-(customKcal/Math.max(1,tdee)) : 1+(customKcal/Math.max(1,tdee));
  }
  else if(goal==='loss') calMult=lossMap[level]||0.80;
  else if(goal==='gain') calMult=gainMap[level]||1.10;
  let cal=Math.round(tdee*calMult);
  if(goal==='loss'&&level==='custom') cal=Math.max(cal,Math.round(tdee*0.4)); // safety floor 40% of TDEE
  let prot=Math.round(w*(protPerKg||2.6));
  const maxProtKcal=Math.round(cal*0.80);
  if(prot*4>maxProtKcal) prot=Math.floor(maxProtKcal/4);
  let carbs,fats,note='';
  if(profile==='highprot'){
    fats=Math.round(cal*0.22/9);
    carbs=Math.max(0,Math.round((cal-prot*4-fats*9)/4));
    note='High protein setup. Carbs fill remaining calories after fats.';
  } else if(profile==='balanced'){
    fats=Math.round(cal*0.28/9);
    carbs=Math.max(0,Math.round((cal-prot*4-fats*9)/4));
    note='Balanced fat/carb split. Sustainable for most clients.';
  } else if(profile==='lowcarb'){
    carbs=Math.min(Math.max(0,Math.round((cal-prot*4)*0.20/4)), 80);
    fats=Math.max(30,Math.round((cal-prot*4-carbs*4)/9));
    note='Low carb: carbs capped at 80g. Remaining calories go to fats.';
  } else if(profile==='keto'){
    carbs=Math.min(25,Math.round((cal-prot*4)*0.04/4));
    fats=Math.max(30,Math.round((cal-prot*4-carbs*4)/9));
    note='Ketogenic: carbs <=25g. Remaining calories from fats.';
  } else {
    fats=Math.round(cal*0.18/9);
    carbs=Math.max(0,Math.round((cal-prot*4-fats*9)/4));
    note='High carb: low fat allocation, carbs fill the rest.';
  }
  const water=Math.round(w*0.04*10)/10;
  const goalLabel={'loss':'Fat Loss','maintain':'Maintain / Recomp','gain':'Muscle Gain'}[goal];
  const lossLL={mild:'Mild -10%',moderate:'Moderate -20%',aggressive:'Aggressive -25%',extreme:'Extreme -30%'};
  const gainLL={lean:'Lean +5%',moderate:'Moderate +10%',aggressive:'Aggressive +15%'};
  const levelLabel=level==='custom'
    ?((goal==='loss'?'−':'+')+customKcal+' kcal custom')
    :(goal==='gain'?(gainLL[level]||level):(lossLL[level]||level));
  const profileLabel={'highprot':'High Protein','balanced':'Balanced','lowcarb':'Low Carb','keto':'Keto','highcarb':'High Carb'}[profile];
  const pg=protPerKg||2.6;
  const desc=goal==='maintain'
    ?(goalLabel+' | '+profileLabel+' | '+pg+'g/kg prot')
    :(goalLabel+' | '+levelLabel+' | '+profileLabel+' | '+pg+'g/kg prot');
  const totalKcal=prot*4+carbs*4+fats*9;
  const pp=Math.round(prot*4/totalKcal*100);
  const cp=Math.round(carbs*4/totalKcal*100);
  const fp=Math.round(fats*9/totalKcal*100);
  document.getElementById('smg-desc').textContent=desc;
  document.getElementById('smg-p-cal').textContent=cal;
  document.getElementById('smg-p-prot').textContent=prot;
  document.getElementById('smg-p-carbs').textContent=carbs;
  document.getElementById('smg-p-fats').textContent=fats;
  document.getElementById('smg-p-water').textContent=water;
  document.getElementById('smg-pct-prot').textContent=pp;
  document.getElementById('smg-pct-carbs').textContent=cp;
  document.getElementById('smg-pct-fats').textContent=fp;
  document.getElementById('smg-bar-prot').style.width=pp+'%';
  document.getElementById('smg-bar-carbs').style.width=cp+'%';
  document.getElementById('smg-bar-fats').style.width=fp+'%';
  document.getElementById('smg-note').textContent='> '+note;
  document.getElementById('smg-preview').style.display='block';
  const applyBtn=document.getElementById('smg-apply-btn');
  applyBtn.disabled=false; applyBtn.style.opacity='1'; applyBtn.style.cursor='pointer';
  // Deficit window: live kcal difference from TDEE for the chosen level
  const _dWin=document.getElementById('smg-deficit-window');
  if(_dWin){
    if(goal==='maintain'){ _dWin.style.display='none'; }
    else{
      _dWin.style.display='';
      const diff=cal-tdee;
      const _k=document.getElementById('smg-deficit-kcal');
      const _d=document.getElementById('smg-deficit-daily');
      if(_k){ _k.textContent=((diff<0)?'−':'+')+Math.abs(diff)+' kcal'; _k.style.color=(diff<0)?'#FF8C42':'#4ade80'; }
      if(_d){ _d.textContent='→ '+cal+' kcal / day'; }
    }
  }
  window._smg.result={cal,prot,carbs,fats,water};
}

// ─── SIDEBAR TOGGLE ──────────────────────────────────────────
function toggleSidebar(){
  const sb=document.getElementById('sidebar');
  const ov=document.getElementById('sidebar-overlay');
  if(!sb||!ov)return;
  const isOpen=sb.classList.contains('open');
  sb.classList.toggle('open',!isOpen);
  ov.classList.toggle('show',!isOpen);
}

// ─── TOAST NOTIFICATION ──────────────────────────────────────
function toast(msg,type='info'){
  let t=document.getElementById('_toast');
  if(!t){
    t=document.createElement('div');t.id='_toast';
    Object.assign(t.style,{
      position:'fixed',bottom:'24px',left:'50%',transform:'translateX(-50%) translateY(20px)',
      background:'#1a1a1a',border:'1px solid rgba(245,255,0,0.3)',color:'#F5FF00',
      padding:'10px 22px',fontFamily:"'Barlow Condensed',sans-serif",fontWeight:'700',
      fontSize:'13px',letterSpacing:'2px',textTransform:'uppercase',zIndex:'9999',
      borderRadius:'2px',transition:'all .2s',opacity:'0',pointerEvents:'none',
      boxShadow:'0 4px 24px rgba(0,0,0,0.6)',whiteSpace:'nowrap'
    });
    document.body.appendChild(t);
  }
  if(type==='success')t.style.borderColor='rgba(74,222,128,0.5)',t.style.color='#4ade80';
  else if(type==='error')t.style.borderColor='rgba(248,113,113,0.5)',t.style.color='#f87171';
  else if(type==='warning')t.style.borderColor='rgba(255,184,0,0.6)',t.style.color='#FFB800';
  else t.style.borderColor='rgba(245,255,0,0.3)',t.style.color='#F5FF00';
  // Allow wrapping for long warning messages (like the uncertain-fields list)
  t.style.whiteSpace = (msg.length > 40) ? 'normal' : 'nowrap';
  t.style.maxWidth = (msg.length > 40) ? 'min(90vw, 500px)' : 'none';
  t.style.textAlign = 'center';
  t.textContent=msg;
  t.style.opacity='1';t.style.transform='translateX(-50%) translateY(0)';
  clearTimeout(t._to);
  // Keep warnings visible longer so user has time to read the field list
  const dur = (type==='warning') ? 5500 : 2800;
  t._to=setTimeout(()=>{t.style.opacity='0';t.style.transform='translateX(-50%) translateY(20px)';},dur);
}

// ═══════════════════════════════════════════════════════════
// 🍎  iOS SAFARI COMPATIBILITY LAYER
// ═══════════════════════════════════════════════════════════
window.__iosCompat = (function(){
  const ua = navigator.userAgent || '';
  const vendor = navigator.vendor || '';
  // True iOS (iPhone/iPad/iPod) OR iPadOS masquerading as Mac (has touch)
  const isIOS = /iPad|iPhone|iPod/.test(ua) ||
                (vendor.indexOf('Apple') > -1 && navigator.maxTouchPoints > 1);
  // Safari (not Chrome/Firefox/Edge on iOS, which all use WKWebView)
  const isSafari = /^((?!chrome|android|crios|fxios|edgios).)*safari/i.test(ua);
  // Standalone PWA mode
  const isStandalone = ('standalone' in navigator && navigator.standalone) ||
                       (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches);
  return { isIOS, isSafari, isStandalone, isIOSSafari: isIOS };
})();

// Set the --app-vh CSS variable for older iOS versions that lack dvh support
(function setAppVh(){
  function update(){
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--app-vh', vh + 'px');
  }
  update();
  window.addEventListener('resize', update, { passive: true });
  window.addEventListener('orientationchange', () => setTimeout(update, 100), { passive: true });
  // Also re-run on visual viewport changes (iOS keyboard show/hide)
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', update, { passive: true });
  }
})();

// Universal download helper — works on iOS Safari, Chrome, Firefox, desktop
// On iOS Safari where auto-download is unreliable, falls back to opening the
// blob in a new tab so user can tap Share → Save to Files / Save to Photos
window.downloadBlob = function(blob, filename) {
  try {
    // IE / old Edge
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
      return true;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.rel = 'noopener';
    // On iOS Safari, the `download` attribute is IGNORED.
    // Setting target=_blank + user-gesture click makes it at least open in a new tab
    // where the user can use the Share sheet.
    if (window.__iosCompat.isIOSSafari) {
      a.target = '_blank';
    }
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      try { document.body.removeChild(a); } catch(e){}
      try { URL.revokeObjectURL(url); } catch(e){}
    }, 1500);

    if (window.__iosCompat.isIOSSafari) {
      // iOS Safari will open blob in a new tab; give the user a heads-up
      toast('Opened in new tab — tap Share → Save to Files', 'info');
    }
    return true;
  } catch (err) {
    console.error('downloadBlob failed:', err);
    // Last-resort fallback: data URL read via FileReader
    try {
      const reader = new FileReader();
      reader.onload = function(e) {
        const a = document.createElement('a');
        a.href = e.target.result;
        a.download = filename;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { try { document.body.removeChild(a); } catch(e){} }, 1500);
      };
      reader.readAsDataURL(blob);
      return true;
    } catch (err2) {
      toast('Download failed — try desktop browser', 'error');
      return false;
    }
  }
};

// ─── SMG APPLY ───────────────────────────────────────────────
function smgApply(){
  if(!window._smg||!window._smg.result){toast('Run the calculator first','error');return;}
  const {cal,prot,carbs,fats,water}=window._smg.result;
  document.getElementById('t-cal').value=cal;
  document.getElementById('t-prot').value=prot;
  document.getElementById('t-carbs').value=carbs;
  document.getElementById('t-fats').value=fats;
  if(document.getElementById('t-water'))document.getElementById('t-water').value=water;
  syncPreview();
  // Sync macro lock panel if open
  macroLockSyncInputs();
  toast('Macros applied to plan ✓','success');
}

// ─── SYNC PREVIEW (stub — updates any live preview elements) ─
function syncPreview(){
  // Update macro lock inputs if panel is visible
  macroLockSyncInputs();
  // Rebuild preview if currently visible
  const _pp=document.getElementById("page-preview");
  if(_pp&&_pp.classList.contains("active"))buildPreview();
  // Update plan progress indicator
  updatePlanProgress();
}

function updatePlanProgress() {
  const pill = document.getElementById('plan-progress-pill');
  const bar  = document.getElementById('plan-progress-bar');
  const text = document.getElementById('plan-progress-text');
  if (!pill || !bar || !text) return;

  // Count filled fields out of key fields
  const keyFields = ['c-name','ib-weight','t-cal','t-prot','t-carbs','t-fats'];
  const filled = keyFields.filter(id => document.getElementById(id)?.value?.trim()).length;

  // Count meals with at least one food
  let mealsWithFood = 0;
  if (window.MEALS_DEF) {
    MEALS_DEF.forEach(m => {
      const hasFood = [1,2,3].some(n =>
        [...document.querySelectorAll('#rows-'+m.id+'-'+n+' .food-row')]
          .some(r => r.querySelector('.food-search')?.value?.trim())
      );
      if (hasFood) mealsWithFood++;
    });
  }

  const total = keyFields.length + (window.MEALS_DEF ? MEALS_DEF.length : 0);
  const done  = filled + mealsWithFood;
  const pct   = total > 0 ? Math.round(done / total * 100) : 0;

  bar.style.width  = pct + '%';
  bar.style.background = pct >= 80 ? '#4ade80' : pct >= 40 ? '#F5FF00' : '#FF8C42';
  text.textContent = pct + '%';
  text.style.color = pct >= 80 ? '#4ade80' : pct >= 40 ? '#F5FF00' : '#FF8C42';
  pill.style.display = 'flex';
}

// ─── BUILD PREVIEW PAGE ──────────────────────────────────────
function buildPreview(){
  const el=document.getElementById('page-preview');
  if(!el)return;
  const g=id=>document.getElementById(id)?.value||'';
  const cal=g('t-cal')||'—', prot=g('t-prot')||'—', carbs=g('t-carbs')||'—', fats=g('t-fats')||'—', water=g('t-water')||'—';
  const name=(g('c-name')||g('c-name-ar')||'—');
  const coach=g('c-coach-name')||'—';
  const goal=g('c-goal')||'';
  const phase=g('c-phase')||'';
  const traintime=g('t-traintime')||'';
  const notes=g('coach-notes')||'';
  const previewEl=document.getElementById('preview-body');
  if(!previewEl)return;

  // ── Carb-cycling support: preview (and the PDF built from it) must show ALL
  //    day plans — High / Medium / Low — not just the base Medium day. ──
  const isENlang = (window._lang === 'en');
  const ccCfg = (typeof ccIsConfigured === 'function') && ccIsConfigured();
  const _tierLabels = isENlang
    ? { H:'HIGH-CARB DAY', M:'MEDIUM-CARB DAY', L:'LOW-CARB DAY' }
    : { H:'يوم كارب عالي', M:'يوم كارب متوسط', L:'يوم كارب منخفض' };
  const _tierEmojis = { H:'🔥', M:'⚡', L:'❄️' };
  const _tierColors = { H:'#4ade80', M:'#00CFFF', L:'#FF8C42' };

  // ── Build meals HTML for ONE tier ────────────────────────────
  // tier 'M' preserves the builder's exact quantities; H/L scale carb-source
  // foods by ccGetTierScale() with the same rounding/dropping rules as DOCX.
  function mealsHtmlForTier(tier){
    const scale = (tier && tier !== 'M' && typeof ccGetTierScale === 'function') ? ccGetTierScale(tier) : 1;
    const tierScaled = scale !== 1;
    let html='';
    if(!window.MEALS_DEF || !window.OPTS_DEF) return html;
    MEALS_DEF.forEach(m=>{
      let mealHasContent=false;
      let mealBody='';

      OPTS_DEF.forEach(o=>{
        const rowsEl=document.getElementById('rows-'+m.id+'-'+o.n);
        if(!rowsEl)return;
        const rows=[...rowsEl.querySelectorAll('.food-row')];
        const items=[];
        rows.forEach(row=>{
          const food=row.querySelector('.food-search')?.value?.trim();
          if(!food)return;
          const unit=row.dataset.foodUnit||'';
          const unitEn=row.dataset.foodUnitEn||unit;
          const unitG=parseFloat(row.dataset.foodUnitG)||0;
          const sliceG=parseFloat(row.dataset.foodSliceG)||0;
          const qtyRaw=parseFloat(row.querySelector('.food-qty-input')?.value)||0;
          if(qtyRaw<=0)return;
          const cal_r=parseFloat(row.dataset.foodCal)||0;
          const prot_r=parseFloat(row.dataset.foodProt)||0;
          const carb_r=parseFloat(row.dataset.foodCarb)||0;
          const fat_r=parseFloat(row.dataset.foodFat)||0;
          const isEN=isENlang;

          // Apply the tier scale ONLY to carb-source foods (same rule as DOCX)
          const s = (tierScaled && typeof ccIsCarbFood === 'function' && ccIsCarbFood(row)) ? scale : 1;
          let scaled = qtyRaw * s;
          if (tierScaled) {
            // Sensible rounding — mirrors buildMealsDataForTier()
            if (unit && unitG) {
              scaled = Math.max(0, Math.round(scaled * 4) / 4);
              if (scaled < 0.25) return; // dropped
            } else {
              scaled = scaled >= 20 ? Math.round(scaled / 5) * 5 : Math.round(scaled);
              if (scaled < 5 && s < 1) return; // drop tiny portions on low days
              if (scaled <= 0) return;
            }
          }

          const isEN2 = isEN;
          let qtyStr='';
          const gramsLabel = isEN2 ? 'g' : 'غ';
          const macroScale = (unit && unitG) ? (scaled * unitG) / 100 : scaled / 100;
          if(unit && unitG && qtyRaw>0){
            // piece-based / liquid (e.g. "2 موزة" / "1 لتر")
            qtyStr=`${scaled} ${isEN2 ? unitEn : unit}`;
          } else if(sliceG){
            // slice-based: "120g (2 شريحة)"
            const slices = Math.round((scaled / sliceG) * 4) / 4;
            const sliceWord = isEN2 ? (slices === 1 ? 'slice' : 'slices') : 'شريحة';
            qtyStr=`${scaled}${gramsLabel} (${slices} ${sliceWord})`;
          } else {
            qtyStr=`${scaled}${gramsLabel}`;
          }
          const macroStr = cal_r&&macroScale>0
            ? `<span style="color:#666;font-size:10px;"> — ${Math.round(cal_r*macroScale)} ${isEN2?'kcal':'سع'} | ${isEN2?'P':'ب'}${(prot_r*macroScale).toFixed(1)} | ${isEN2?'C':'ك'}${(carb_r*macroScale).toFixed(1)} | ${isEN2?'F':'د'}${(fat_r*macroScale).toFixed(1)}</span>`
            : '';
          items.push({food,qtyStr,macroStr});
        });

        if(items.length>0){
          mealHasContent=true;
          const optLabel=OPTS_DEF.find(x=>x.n===o.n)?.label||('خيار '+o.n);
          const optColor=['var(--opt1)','var(--opt2)','var(--opt3)'][o.n-1]||'var(--muted)';
          mealBody+=`
            <div style="margin-bottom:12px;">
              <div style="font-size:11px;letter-spacing:2px;color:${optColor};text-transform:uppercase;font-family:'Barlow Condensed',sans-serif;font-weight:700;margin-bottom:6px;padding-bottom:4px;border-bottom:1px solid rgba(255,255,255,0.04);">${optLabel}</div>
              <table style="width:100%;border-collapse:collapse;">
                ${items.map((it,i)=>`
                  <tr style="border-bottom:1px solid rgba(255,255,255,0.03);">
                    <td style="padding:5px 0;font-size:13px;color:var(--text);direction:rtl;">${it.food}</td>
                    <td style="padding:5px 8px;font-size:12px;color:#888;text-align:center;white-space:nowrap;">${it.qtyStr}</td>
                    <td style="padding:5px 0;font-size:10px;text-align:left;color:#555;white-space:nowrap;">${it.macroStr}</td>
                  </tr>`).join('')}
              </table>
            </div>`;
        }
      });

      if(mealHasContent){
        // Compute active-option totals for this meal
        html+=`
          <div style="background:var(--card);border:1px solid var(--border2);margin-bottom:16px;overflow:hidden;">
            <div style="background:var(--card2);padding:10px 16px;display:flex;align-items:center;gap:10px;border-bottom:1px solid var(--border2);">
              <span style="font-size:18px;">${m.icon||'🍽'}</span>
              <div>
                <div style="font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:2px;color:var(--y);">${getMealName(m.id)||m.id}</div>
                ${getMealSub(m.id)?`<div style="font-size:10px;color:var(--muted);direction:rtl;">${getMealSub(m.id)}</div>`:''}
              </div>
            </div>
            <div style="padding:14px 16px;">
              ${mealBody}
            </div>
          </div>`;
      }
    });
    return html;
  }

  // ── Assemble the meal section(s): one labelled tier per cycling day ──
  let mealsHtml='';
  if (ccCfg) {
    const tierPill = tier => {
      const v = ccGetTierValues(tier);
      const parts = [];
      if (v.cal)   parts.push(Math.round(v.cal) + (isENlang ? ' kcal' : ' سع'));
      if (v.prot)  parts.push((isENlang ? 'P:' : 'ب:') + v.prot + 'g');
      if (v.carbs) parts.push((isENlang ? 'C:' : 'ك:') + v.carbs + 'g');
      if (v.fats)  parts.push((isENlang ? 'F:' : 'د:') + v.fats + 'g');
      return parts.join(' • ');
    };
    ['H','M','L'].forEach(tier=>{
      const html=mealsHtmlForTier(tier);
      const t=(typeof ccGetTierValues==='function') ? ccGetTierValues(tier) : {cal:0,prot:0,carbs:0,fats:0};
      const hasTargets = t.cal||t.prot||t.carbs||t.fats;
      if(!html && !hasTargets) return;
      const dirStyle = isENlang ? 'direction:ltr;' : 'direction:rtl;';
      mealsHtml+=`
        <div style="display:flex;align-items:center;gap:10px;margin:26px 0 12px;flex-wrap:wrap;${dirStyle}">
          <span style="font-size:20px;">${_tierEmojis[tier]}</span>
          <span style="font-family:'Bebas Neue',sans-serif;font-size:20px;letter-spacing:2px;color:${_tierColors[tier]};">${_tierLabels[tier]}</span>
          ${hasTargets?`<span style="font-size:10px;color:var(--muted);letter-spacing:1px;">${tierPill(tier)}</span>`:''}
        </div>
        ${html || (isENlang ? '<div style="color:#444;font-size:12px;padding:4px 0;">No meals differ for this day — adjust the meal builder for this tier.</div>' : '<div style="color:#444;font-size:12px;padding:4px 0;">—</div>')}`;
    });
  } else {
    mealsHtml = mealsHtmlForTier('M');
  }

  // ── Supplements ─────────────────────────────────────────
  let suppsHtml='';
  const suppRows=[...document.querySelectorAll('#supp-rows .supp-row')];
  const supps=suppRows.map(r=>{
    const inputs=[...r.querySelectorAll('input')];
    return {name:inputs[0]?.value?.trim(),dose:inputs[1]?.value?.trim(),time:inputs[2]?.value?.trim()};
  }).filter(s=>s.name);
  if(supps.length){
    suppsHtml=`
      <div style="background:var(--card);border:1px solid var(--border2);margin-bottom:16px;overflow:hidden;">
        <div style="background:var(--card2);padding:10px 16px;border-bottom:1px solid var(--border2);">
          <span style="font-family:'Bebas Neue',sans-serif;font-size:16px;letter-spacing:2px;color:#00CFFF;">💊 المكملات الغذائية</span>
        </div>
        <div style="padding:14px 16px;">
          <table style="width:100%;border-collapse:collapse;">
            ${supps.map(s=>`
              <tr style="border-bottom:1px solid rgba(255,255,255,0.04);">
                <td style="padding:6px 0;font-size:13px;color:var(--text);">${s.name}</td>
                <td style="padding:6px 8px;font-size:12px;color:#888;text-align:center;">${s.dose||''}</td>
                <td style="padding:6px 0;font-size:11px;color:#555;text-align:right;">${s.time||''}</td>
              </tr>`).join('')}
          </table>
        </div>
      </div>`;
  }

  // ── Coach Notes ──────────────────────────────────────────
  const notesHtml=notes?`
    <div style="background:var(--card);border:1px solid var(--border2);margin-bottom:16px;padding:14px 16px;">
      <div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:11px;letter-spacing:3px;color:var(--y);text-transform:uppercase;margin-bottom:8px;">📝 ملاحظات المدرب</div>
      <div style="font-size:13px;color:var(--muted);line-height:1.7;direction:rtl;white-space:pre-wrap;">${notes}</div>
    </div>`:'';

  previewEl.innerHTML=`
    <!-- Header -->
    <div style="margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--border);">
      <div style="font-family:'Bebas Neue',sans-serif;font-size:32px;color:#fff;letter-spacing:3px;line-height:1;">${name}</div>
      <div style="font-size:11px;color:var(--muted);letter-spacing:2px;margin-top:4px;">${coach}${goal?' — '+goal:''}${phase?' | '+phase:''}${traintime?' | ⏰ '+traintime:''}</div>
    </div>
    <!-- Macro pills -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px;">
      ${[['Calories','kcal',cal,'var(--y)'],['Protein','g',prot,'#00CFFF'],['Carbs','g',carbs,'var(--opt3)'],['Fats','g',fats,'var(--green)']].map(([l,u,v,c])=>`
        <div style="background:var(--card2);border-top:3px solid ${c};padding:14px 8px;text-align:center;">
          <div style="font-family:'Bebas Neue',sans-serif;font-size:28px;color:${c};line-height:1;">${v}</div>
          <div style="font-size:9px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-top:3px;">${l} ${u}</div>
        </div>`).join('')}
    </div>
    <div style="font-size:11px;color:var(--muted);margin-bottom:20px;">💧 Water: ${water}L</div>
    <!-- Meals -->
    ${mealsHtml||'<div style="color:#444;font-size:13px;padding:20px;text-align:center;">أضف مكونات في صفحة الوجبات لتظهر هنا</div>'}
    <!-- Supplements -->
    ${suppsHtml}
    <!-- Notes -->
    ${notesHtml}
  `;
}

// ═══════════════════════════════════════════════════════════════
// MACRO LOCK & DYNAMIC MODIFICATION SYSTEM
// ═══════════════════════════════════════════════════════════════
window._macroLock={cal:false,prot:false,carbs:false,fats:false};
window._macroLockPanel=false;

function macroLockInit(){
  const el=document.getElementById('macro-lock-panel');
  if(!el)return;
  macroLockSyncInputs();
}

function macroLockSyncInputs(){
  ['cal','prot','carbs','fats'].forEach(k=>{
    const src=document.getElementById('t-'+k);
    const dst=document.getElementById('ml-'+k);
    if(src&&dst&&document.activeElement!==dst)dst.value=src.value||'';
  });
}

function macroLockToggle(k){
  window._macroLock[k]=!window._macroLock[k];
  const btn=document.getElementById('ml-lock-'+k);
  const input=document.getElementById('ml-'+k);
  if(btn){
    btn.textContent=window._macroLock[k]?'🔒':'🔓';
    btn.style.color=window._macroLock[k]?'#f87171':'#555';
    btn.title=window._macroLock[k]?'Locked — won\'t auto-adjust':'Unlocked — will auto-adjust';
  }
  if(input){
    input.style.borderColor=window._macroLock[k]?'rgba(248,113,113,0.4)':'rgba(255,255,255,0.07)';
    input.style.color=window._macroLock[k]?'#f87171':'var(--text)';
    input.readOnly=window._macroLock[k];
    input.style.cursor=window._macroLock[k]?'not-allowed':'';
  }
  macroLockUpdateStatus();
}

function macroLockOnInput(k){
  if(window._macroLock[k])return;
  const val=parseFloat(document.getElementById('ml-'+k)?.value)||0;
  // Mirror to main target inputs
  const main=document.getElementById('t-'+k);
  if(main)main.value=val;
  // Auto-recalculate unlocked macros
  macroLockRebalance(k,val);
}

function macroLockRebalance(changedKey,changedVal){
  const locked=window._macroLock;
  const get=k=>parseFloat(document.getElementById('ml-'+k)?.value)||0;
  const setVal=(k,v)=>{
    if(locked[k])return;
    if(k===changedKey)return;
    const rounded=Math.max(0,Math.round(v));
    const inp=document.getElementById('ml-'+k);
    const main=document.getElementById('t-'+k);
    if(inp)inp.value=rounded;
    if(main)main.value=rounded;
  };
  const cal=get('cal'),prot=get('prot'),carbs=get('carbs'),fats=get('fats');
  const kcalFactor={prot:4,carbs:4,fats:9};

  if(changedKey==='cal'){
    // User changed CALORIES — redistribute unlocked macros proportionally
    const lockedKcal=(locked.prot?prot*4:0)+(locked.carbs?carbs*4:0)+(locked.fats?fats*9:0);
    const remaining=Math.max(0,changedVal-lockedKcal);
    const unlockedKcal=(!locked.prot?prot*4:0)+(!locked.carbs?carbs*4:0)+(!locked.fats?fats*9:0)||1;
    if(!locked.prot) setVal('prot', remaining*(prot*4/unlockedKcal)/4);
    if(!locked.carbs)setVal('carbs',remaining*(carbs*4/unlockedKcal)/4);
    if(!locked.fats) setVal('fats', remaining*(fats*9/unlockedKcal)/9);
  } else {
    // User changed a MACRO (prot/carbs/fats)
    if(!locked.cal){
      // Calories free — just sum up P+C+F
      const newCal=Math.round(prot*4+carbs*4+fats*9);
      const calInp=document.getElementById('ml-cal');
      const calMain=document.getElementById('t-cal');
      if(calInp)calInp.value=newCal;
      if(calMain)calMain.value=newCal;
    } else {
      // Calories LOCKED — fit remaining into other unlocked macros
      const changedKcal=changedVal*kcalFactor[changedKey];
      const lockedKcal=(locked.prot?prot*4:0)+(locked.carbs?carbs*4:0)+(locked.fats?fats*9:0);
      const remaining=Math.max(0,cal-lockedKcal-changedKcal);
      const others=['prot','carbs','fats'].filter(k=>k!==changedKey&&!locked[k]);
      const otherKcal=others.reduce((s,k)=>s+get(k)*kcalFactor[k],0)||1;
      others.forEach(k=>{
        const share=get(k)*kcalFactor[k]/otherKcal;
        setVal(k, remaining*share/kcalFactor[k]);
      });
    }
  }
  macroLockUpdateStatus();
}

function macroLockUpdateStatus(){
  const get=k=>parseFloat(document.getElementById('ml-'+k)?.value)||0;
  const cal=get('cal'),prot=get('prot'),carbs=get('carbs'),fats=get('fats');
  const calcCal=Math.round(prot*4+carbs*4+fats*9);
  const pp=cal>0?Math.round(prot*4/cal*100):0;
  const cp=cal>0?Math.round(carbs*4/cal*100):0;
  const fp=cal>0?Math.round(fats*9/cal*100):0;

  const statusEl=document.getElementById('ml-status');
  if(!statusEl)return;
  const diff=calcCal-cal;
  const diffStr=diff===0?'✓ Balanced':(diff>0?`+${diff} kcal over`:`${diff} kcal under`);
  const diffColor=diff===0?'#4ade80':Math.abs(diff)<50?'#F5FF00':'#f87171';
  statusEl.innerHTML=`
    <span style="color:${diffColor};font-weight:700;">${diffStr}</span>
    <span style="color:#555;">|</span>
    <span style="color:#00CFFF;">P ${pp}%</span>
    <span style="color:var(--opt3);">C ${cp}%</span>
    <span style="color:var(--green);">F ${fp}%</span>
  `;

  // Update bar
  const barEl=document.getElementById('ml-bar');
  if(barEl){
    barEl.innerHTML=`
      <div style="flex:${pp};background:#00CFFF;height:6px;border-radius:2px 0 0 2px;transition:flex .3s;min-width:${pp?2:0}px;"></div>
      <div style="flex:${cp};background:var(--opt3);height:6px;transition:flex .3s;min-width:${cp?2:0}px;"></div>
      <div style="flex:${fp};background:var(--green);height:6px;border-radius:0 2px 2px 0;transition:flex .3s;min-width:${fp?2:0}px;"></div>
    `;
  }
}

function macroLockApply(){
  ['cal','prot','carbs','fats'].forEach(k=>{
    const v=document.getElementById('ml-'+k)?.value;
    const main=document.getElementById('t-'+k);
    if(main&&v)main.value=v;
  });
  toast('Macro targets updated ✓','success');
}

function macroLockReset(){
  window._macroLock={cal:false,prot:false,carbs:false,fats:false};
  ['cal','prot','carbs','fats'].forEach(k=>{
    const btn=document.getElementById('ml-lock-'+k);
    const input=document.getElementById('ml-'+k);
    if(btn){btn.textContent='🔓';btn.style.color='#555';}
    if(input){
      input.style.borderColor='rgba(255,255,255,0.07)';
      input.style.color='var(--text)';
      input.readOnly=false;
      input.style.cursor='';
    }
  });
  macroLockSyncInputs();
  macroLockUpdateStatus();
  toast('All locks cleared','info');
}

// ─── EXPORT REAL .DOCX (matches Olympic Gym template) ────────
async function exportDocx(){
  const {
    Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
    ImageRun, AlignmentType, WidthType, BorderStyle, ShadingType,
    VerticalAlign, TableRowHeight
  } = docx;

  const g = id => document.getElementById(id)?.value || '';

  // ── Olympic Gym logo (embedded PNG) ─────────────────────────
  const LOGO_B64 = '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8IU3/Ool/3LL7aeceNOfX33ab373sjN+c9Mrz/j9X179lr/c/uq3/HXJSacvXvnas1euf9PZK9a94fQ1609/09qN73ntnXd/4OQVd57/4mXrzn/iH25921Hvfvdju0avc8UVp//z7X857xVL73jrv61e+taXrFpy2itXL3nlG9evPPWNy5e+8dRli9/1sp/+dNGDOWbkfXLiiSdGv/71//3bm3578sv/+qeXnnL77ae+YumKN7729hWve92KDW88Y9mqU96xcs05L//KV058IMeNe99ww/n3X7Lkbf/+19teeerNN73s5X/+/ctfdtufX3HarX999av++IeXvObm35520hWXvO5oHfza1z42ueGacx95219Pf+GaFW88fukdpz1r5dLTnrVm2ekvXLnkjSevW3P6K+5e/54Tv/GNlz6K9iN+sr7T/axnPbj8pz+d95jlq97+qnUbzzp1zYY3nrpq3etPXb78taesWPqW165YfPpbFv/lzNfd8vvzn/iWtzy4rIM/+9FjH7789nP+fe2Kt736rnVve+Xd699+0t13nnfyhjvPO2XDunNP3XDn205ZcedbX7N07emvWrbmLS9ftvKMly9fdd6rVqx+10krV5938so1Z5+8ZsMZp9yx9K3/9uc/v/eRJz5lXg9GXdzbjNuWvOtfl6x8y8tXrH7TS1atev2LVFZrfc1Zr1h253kn/+oPZz09BGiAHRl58cXP7fr1H15z9NLlr33T4sVvOPu2O1571q1LTjnjT4tPeutfFr/6LX9acvLpt9x28ll/ve2kU5cvPu1ty5a89twVS09/7S1/fsfLP/jBZ+rzHJlrT5VLPnlizw0/ev3fL7n1naesW/POc++++9xz12142xkrVp/5uiXLTz959cozTl6z8vRT1iw//dTVK99y8qrlp79q5bIzXr5y2TkvX7Ns0f/5y43/+fBFi54SL1oEd8VX3/Ck1UveccZd6896/V1r3/6qu9af+/q168989boNZ79s2Z3nvGbN+o88+w1veOKs8Xw68czHV3/xu7c948+3n3XOHcve/IFbb3/lh27968vOWcyf/ztufc0pd9x26lm3/eWMd/z2l+/9xxNPRMQ55Eufe94T/vKXU99y6+0v/887bjv5fbfddso7Fi8+6exlS046Z/kdJ5+1YsVZr7196Xuf8NjXIqH9RLd867JXPGbZqkWnr1537nv/+NeTL1i8/LUX3Lb85af+8ZYXvunmm1946pIlJ7/oN39+1eNPOgmViSZRvYkhcF8hMOEH433lkK1rCHQQeOxjkXz4w6987JvPfORHHvsPQ99aeL87Pny/+y17z5EPuvPsIx+46uyjjlr1jrnzl5274LDl71h4xIoLFh62fNFhCxd/YO5hS/7f3DlLPjxz5h0fv//hG756/4UbrnngURu/8aqTHvXqs89e0K3za+B51KPk5Ycfuf7C+QtW/PeChcsvWni/VRcdceSq/5p7+OIPHnb48o/e76i7Pz535pYX0I+RD/Dt239W6a1seNqjHu3/66i/Wf/xBz7g7k8ccfjaj9zvyFX/M3vO4vfNnrfqPQvmrv/4v/7r7LeOJVa6LiV6wJH9LzvqqG0fOHzh3ec//GGD73v4I4Y/fMSRd7/v/kdt+PDDjh740N8+fPg9D3uIfzVtsXXNTTMf9Lf1lz/4IQOfWnDE6q8cdsSabx12xPpvLjh81Zfvf9TG/154xN2f7pu5/PPHHnv4Oy+44FFH6ZjxJM+Xzj/yqME3H3nktk/NmLniwhmzVn38sAXrPnr44es+fMT9135g5tw7/oNYvHvGrNVn9CVL5y86EaV/+pfuf5s9d8WHZ89ffNHseYs/PGf+0k/NXbDyovkLVn9y/oKVn5i7cMUnjzh81aeOOGLpxYcdsfyiBfdb8cnDDl92kcrhh6/4xMKFqy5csGDtx+jnN4960MZrPn/FmW/8t+MwX/07+miUTjrpcU87bOFdnzz8iLWfPfyIdV847Ig1X1x4xJIvHna/YRD2UQAAEABJREFUJV9YeMSyzx1+2J0f+5u/GX71e96DEaLzuc89fvYTn5y/6JiHbbtw5qzF75t/2PL/WLBw5XvmHrbkvYcdseR9845Y8v75h93xn/MOX/Y++vH+B/7t+v+8/1Fr33+/B6z/xIMeMvjhBz/YPYfrj8zH+oT3f//342f/wwk9p//d45rffNBDNl88Z/7qd/X2LXnv7NlLP8S9/c+RR6795MLDV3+S63/isPutupA4UlZfzPLiI+635guHH3HX18rdd5y7btn1h9fWzer9x3/uOmnugjX/Of+wNR+dPX/ZxbNmL/3Y/LlrP7VwwcbP3//wuz+dlJd8+m3nPO+f20QFO10b/3DErDkbX7lwwYbz5sxefnpX5bY3z5u/8vye3lv/828fuun9XV1/fM8R97vr9O5k9eM5rvTJRfO6H3rMpjfPO2zl2fMXrn7r7AVLTp932JJzDlu44h3zDlvxjgX3W3bO/MPueM/h91963pfecupsjhn3/sQn/mn2U54+883dPX++oG/mbec85CEb3zl33h1vmzPvjvc+6MHrFj384Vv/c86cpf/9sIduO/+s8152+LiTmNIQuI8RMKJzHz8AW35CBORJT5p5xBFHDrwizW5+5t0bfnnE8MDt90e24bCsvmpeY/CO+bWB2+f55hrKurkuX9cnuLNLsKYKv6oSshU9eba8a2Doz0maL+6J3dq/W7CgfuKrX3HsE056CirvXoSQNha7IEtcw98+s9ZYUq7Xl1drtRXdlN5muqI7D+u6Mrd5p3/t/vCHdw394ebf3nHn3X/dIG691AYXi2+uLEm+ulyvLekquY1JpbJ5Rl/vlgfNmDGwy7/OmaFKkC3+x4H+W4/YtuWWI9bfffOCzdv+Mj/1q+cN1ZfM2rT1T3Pj0ka3asVNyxSZwUEgze+O87C2kmNNT7VrSw/7ZwSsCcDaSmNoaYywNpo1e8sDjjrKT5StkH/8x64FkBWPSrMVXXlzVbkU3V1p1Jd319PlM9au+/XswaHbZtUby/riaHOU9iPcAuRRtNVl+Zq+Rrqkq9a4fdZw7Y7K0PDScr2xotRoLi01U0pzabnRWF5p1Jb3ZfXlM7Lmkm7fXFpN0yXVlOX2LX/tataWlyvxqiNEbn/np77wprdoIJ8/Hy7LNnSHfPVsCauJ350VpHd2+WxNV0hXVfN0bSlP1yb1oTV9txzdIjqaaXrwQ/0JCxb0n9asLX1ic2jFjP5tt/X099/WPThwW8/Q4O09g4NLeoYHF/cMDy+lTyvnDQ4vrmR+lRsauiV20ZqZT3zi3xyxaNEDioyV4juRKBF++nH3f+bMuVtOqVbWPDT3y6M8W9mFsCaRsK4EPm+fryrnfm3FhzsrHmvLPvDnTlaxvrzbc0+ez6xa3Ta/rxt9//WZrdt//eurNwVsQJqtLIvbUIGsTyRfl9RrS1ytdntp7qyh2XG86cFr16I01q+HPLh3Zp6uWNhoLu6uDd9azRpLu7Zs+lMvfelds+Z3s9N0VfdA/4otK5YtXnnppaivGNwYBrYt6W421sxuNtb21mrLuuv1pTOHh1fOHhpexnLp/MGhWxdUS+v/rhndNWH2cVNtyRFOlpHArOge7r8lrg0tK6eNlX3I1swfHlg8Z3Dr7TO6ywOVvlJ/KY635WP9trYhcCAg4A4EJ8wHQ2AsAg9+MEqnnfaMf6h0bX6a+M29kmaSZFWJGl2IG91JySdx7OM4G5Qk1JIIdcauRgJpRohzigfi4FF2OapR7lw+VClJ7Z9m90SnYA4eIEAYHFgzQ5KtFRcPznSR78p9HGU55wk9cFEF4uJ4qNbA2OvqK3+xKW2WVlbKM9NqlHRlQwNxPlxDT1Ri9PbYtmmdpM0Ncx7zmIVHjh17zhv/vre7uuXISpx2dZdLcU9XpdrT2x2pXQghjiIR59zQ5m2DP1NdnkOG67lL0zRO82Yp87nLqMxC3tOoD5fKsZQbA5sqcbT9sGc/95+OVBKh40bLiUcj+fd/P/aBPb3+CJ8OohxHjKQO8AERgejqKSNHKs0sjbcP1qTuwE5goH/YR0kUXBwgUUgk9mCb4igR4jhGzJmSvILEd1FKKElAyaXEPaMAM6q96C7FKJUbLk42VGbP2f7Wl7zg4febdz3SqpPNktUbLm9GcS4SZTFU4qyMmM8hSsuhJ+obPuZWBPDqjrKF82bLc9PGXcf0370tDrUI9A5RHkDXWNInX2K9i9KLGH2ouF5US130SZA1Bly5nC0cGJAFnG6395o1fTPnLag8KSGuAdtI+4Y5n0dFIiTiuC4KQSDP1B6er3nkLkcDXlTqLOvSO6M673n/56lzwGvL9oHbszzUmmkWXJRAEHFkFCc+L5WjFGm6KSkl/Q+q1VDGqGsR4J7+jH86oqenef+ssSHK6pvQV03QVyHvSp1kzSie0Tc/b9bKK6++4g/LOTT8bT+azZQu5j1JyKvIia3PE4ScY5oV+DRGRoNtQ+sq3V3+GI4Ryi73wx8451GCLX/TW3GlnlLFlfOyS9KK9CR9bsGcIzGnuiApoau7VhuMUd9luCkMgQMCAXdAeGFOGAJjEPAelShq/kN9cOMRIW8kkSuJJ4FJmwzOUYQkLjH4AI6BxyECXASn/zHgulBGJA6xo60IarVhRC51w7WNpWp3evSMedAjHkkbw0P8sE8hnkEJ8Fw0zxyACCQdPs0abLn0rrtQBFp2FHetHxvTRuX2LHWDJCVInEiesSsU41CiwrnhuTNnuoXU7nS7cv+MWXNKXSIhVLu7UOnqQjNNdT30dvfkcamcivRsjrtjDViQgCxtprVqtSsvxUnIsiaE+yqVy/D6X9ZA37w+GR6+a36Wb39w7wMf2rXTgmz8OUd57tz4gZHUugRNEEzUh+voqfag2cwQMejmeY56fRA9XaWIMEQcxrtUT5vNepY2gvYTE+o8fQotrFJPpGJKQr3ebAeixwkcfXOBtiKoDw8xsPZzTH8lSbZ2d/f2//PGp0DqQ/1RjNw7BNIcQUQ/IleGiyskUSWU46QZBQwdfQs5AYDhge09iavPc6Fe6qpUiJlAcmGZQ0jaxLOd0fW8BDCoi4+pd2gMNkDIUE2iKI4Gjiy5bffjdLu9qzPD/Kyx7QHw9ZILDUQug4s81woIWc55A3++Ejj+3InEEBEE0sVAohOIMSSDuJx7ac5ZuvjPM3WxTXcP/nXb9vqa7upMYl0v7OGEdyARC8RxOJvZK/cjfNwARq7fPAtJEg3fT/zAvDjOUYodsixDngf+cABd5R40mm44z6u31BvxWh24/nA6k/ONEiikUz4QG4m4hoMjOXOoci9sC/z82d0P0jFjZdGio0sPPfrwR4RsaL4+Jt8EAp9WtdILT9yHtw8CSTWCi0p0RPJ80I+dw9qGwIGAgDsQnDAfDIGxCMwt8R/lqZ9Tinr4UVyFD/wsjQRpMoSGG0BGBsDPWuRRg/+QHEAe11nnLFmJH+Q9YPaDn/QpUgY75xgU+ZNeroQk6a0d9qRjD5+9aBEkb3TnlWhBE3lfyBi0A6NhXErgfc7APMjg4/MErhbHYPjm3O27P8fm3//mjj9ljeSuuBL7LAKiSt//Z+9NAO04qjP/71T1du99m3bZsix5N7YxYQskM8OQ/CeTIQmQADY2JCwOwySQZBLIQiABhUkyA5NlAiEQs8TYQAAHDMbsEAQG403YGCRsSZYlWfv2trv1UlX/r/otlmzJ9vP6LFe763Z3ddWpU7+q2+e71ZIMI00UlqGOEaE50BhuZdkyVhGm2T2JmytEZ4N9I9bqDDlXAuI4RpPtMjYi1cNu1+7iaxdeuIFhBVAWlYqqjhgU4iKn2G/nDHq9PtJGk3LCACaHsUUaR+50OXjIt4nDtzf91n8aiHT503nRbkTsY1l0WTdDWVi214QpHCJ2UmlarsaKOELB1x9WpGUSHZtYU7JYYTxLGegKaDojDJyRTqFcjJxiq+86mMjHEUlCsAkqqzgmBEc2SStFUQmjdcp4OCmLF0RngluietQMpYmipKpos1QlLIN4QX6V7bFETrS54Um964bOlFKuKArplx0atBz7ElHKNjm+wnHTNkKMBGVJccL5IpGg7pvLnJiqytL2guf9/Nkn0qAwHXOPev1MA2miUnFGsT8VRQtgE3DuWZSWA1I6OKuZBMKRiNmesyU67XGXxQ0r4srGoG0MLs6G2ZDKdXTH+IS7vV+UtpHFgOYQxxVy9rcsjdNObBp3zn/D685dzPKz+/g4hmMpVykpE+GMTOMRlOyji1KQB5woC0kmrr3xtu2XfW5sfKZiI1bjkNJWFGpxIsw2TAX8HLBOcTwG0e+ZOG3o5/3u7y4cxL22Tmf/wkaCU5SKsnphM2rC+fFxJZAksLHm2HOcFCW/6Y/1ej3euJeRcBkIzAMCfDzMAy+CC4HAvQgYPrqdsZGmwBGGLoYBMI9iooBBjspaGMqPigEnyRI+5yNACYNaCpgSZdWGUzmfxxGDXok876FyfURJ2Vyxcsnw2rVQY6O9hkKTwTqp64LByrshtMtzWrO6qkofHXz2bGLd6qYbd+6pyuhQu9e3fQb6srKoGNxFJ4jTRJR2g9YVJ/3BBSdlsxV5UlX5GZWVwYGhQdUv+8i4MtHL+xAKpETHenBgmdm4ee83WXR2V8o45yzDoMA5x2TgwHUQLzaaA+i324hiIEndyS/6tZ9byYrCNLPL0555ypLly4fO1MrFonx9hyKvIKIhTKht0RhspLQnzTgKOEZ1URAlvKVVClO5ejXIuqm6jitYFQdA69g1BhejNbyoZg0KMctRqizHweYcJwtLG84KxFlyLfWSJeyGMiX7XfEWfXWw4kBNUScrFlC8ogTacC59YYnC2RiCggJCQNc5cOxzAxUnQq/XoadAwgBMIQTCoiCpMMHlN6sc70UAFVyc6oXnnLNi+fOfTws49majtMp8eRCZRBARihv2xxT000JHCbSKoJg07/cZ48t+hSxqYWTAv6nSHLFKcQ4MnP+0p554wfPRXLPm0MT+naN3wMauw/dTtjIoKMiyFoU8VXuZFw2HiZOe+9NnebEqM94tHsSQqXonDg8MUmYIJvmaVEcpV3EMJBZHH2y3i7HbbtvlV3PcTL00zgph36ENfWY2mTqOnR+/qdUg5/1vpZGc++IX/8LymXozx141dlLaUCdGkYo0x1+IzP8YsNqBNWERIWrEqMq+i1VSLExji7AFAvOQgJqHPj05XAq9fEACfGrGWqmIG7TWfCirI1Icp9XIgiW7mq1FmxVaO42LxpCZCUSdUsd9qCjnw7gDJxQ4MWhDwCAYDQwOpo0GtK1EMVf8r2IRqf1xjg9xnoqID26u0Wi4KAKjRH179mP0AHbzdcFurRLngysYRAxf/zB0w/GFl6BKs6Zasd8cql9bTFeUFSed8BQR26jKrjSbifcH7BVUrFAasf2e7F0wePL26fL1wfvnT2rfKBYclYFPloCKTh9ZsyUiTk1tFuoAABAASURBVI0MN0455ZQFq+8VxNXgCE4xpruMhWB9JQB+FYkiBd4mLwH+wtcULI4+5Dnq/t6+fqN1TlsvcBQDug+OQmRVVdVVvK2kNbwzigZ2aCzdEumlW+jrDjRpRVEQcCXB1IGV5sinroQIsGmFKwHtGs5BsQ16wTN+3uMPC/M6gvA/ns/sNMNuSH0pojE+1qW4sliweAGgK4qR3C07aem4JNJ3UeWy4QSFFEAmkpucJbpDkqrBpz71dF0bOcaHlGXpLJUa77NBsF+1b77P/tzPR2G3lFPtOEonBxojJk0WcXRG4EzLsXqVxIkkcTMSNFa3e6jnwd6d4zdEpmkbdgCpbtYCvKhKjuGwcP5oHdt0wdLMv1pTmN5e8KvPGxwcyJZ32t3IUeT7JJHinInQ7XaR9zlzZHgPkP5ougrOOYczkjrITmcIFIRCRYQCWVEwKwth0mKiohyPh4d7Z+Owbc0aqF990c+dlWZyotbCaiUnRQ6IX7SxZKFA4Px+KVQOoqKmVqohzAx7IDDvCPjZOu+cCg4FAozH4qxL8qKIyrKsBYE/MhjAJwYcK9JYf9u6/e/77rd2/N531+74nWu/deebt27efT0DeJllA44BAFxwgFIKEdUKuBVFX5mKb0R4nvApznuaSbjBrwI4Z3nH7xFENApTzWT4zNmUDGJvrx3dpVSSJ1xF0FpBlIPhU78oSlRVIa2mXjGypLliptLll//X5uBIekZZ9VK+RgIYR21VgGKqLpJmrb41w7dedNGVY3XG9IdSDE6OkQqoAwnZQETAxSzEUQMFVwZ6va50evsWLF6GU9nVFqa31asRx8nYzzrXG+q1J6G1huZqBPnRBv2lOHMUGSJCwZa6SKfGNhm/WP/QWMfCanKO4ayCUhq+rJKIdxVE0vYd67d+ctPtvdfddOPE791y88Tvbdm8/x+gkzEvipRimTq4Cusyacs64gQypZQAx92CH0y17Zmjb4dJKzr2jjW+HFiX6wlCfeSc8F5dfnCoCaU12pM5+l3N/g3u3bjp4OcP7h/5x+3bFn7gzs1Dl+/Zs/jTBw4u/PS+fcMf371r+LIqX3nTnj1Pn/EBR9s4DWzljLG+FefYtkCpiEmxDV1f93M5sGtn9ZWd25IP7r574RXb71x4xbZNy6+YmDz3n8fHT3/3trtH3r/lrsaH2+1lXy+rBZPwm1t0S95Lbhe+eiq5qjYwMMS53UdV9JBmEefPpDQyPJNFNZPf1fnnrFySNdRJZdXXSRqhwQK+/4DF0NCAi6Msr4qBLZ3Oedtw+ObEOnCv8xR9jmrfuUKDmK+yklRxRTHmBHF29amL/+OaNWtUXZQf27cvbp119olnRLocsc4vvOW05FNJO2zZsJCLKDJLJHEGZ1PV6xlhbtgDgYdM4NGqODuxH60Ggt1A4KEQME3+InUmpkCJEgoJvwLhU5qmmLluJMs6t9xY/tsv/dKOL//if9n6uQ9duvejKE+6RcliBtoW1+tb0NKEIOKrGgtjDOtGFCGlLOsxW6yiOImE3wLG5MPcFN7UAB/kjTS1h92YPf3IRzB5aFx+WORuO+1WpqwQUwjECesxLhdFIVq5k19+8S+unKlUtUeXjQwnJ5dVW3RkMNkeRRzTt6KAF2RFFUV33939Grvbn6nD21xR0g6w4v9zdNZB8T+Bq3MVysqi0UzhV7GqctezlizBSTP1L7/8gsGlS/HcohiLBocH6kCXc8lGecNKQL5Q7LxlPKRwqoTLIksSdgBgEBxgC5HTihmUJ5FOwDJ1HeoPE+nBQ430rJvf+Vc3fPN5z/nGF//Dc679oqhTPmkm1eYkWUhdqiESMQlqbSMlj6VwEQe4APTF8F7dFuM2m8LURtv+xIsZAZz4jzpDwJGqE+qN9nr5Plj0qBkHsXDknOrQAb1+213JPzzr6Tf90U8//bo3nHfGd199+qpvv/yE5V98+cqVX3jtySs+9Xunrvrbr1955ZWmtnGMDy62uCRK6J94P8j6cP80r6Xf7yfXb7+r9e4PXXH1H5102udfu+rMq1+z+qzPvmrxko++YcmST7x99cmf+Z3TTv3E7zzj2R/4zDfWjY77pi5+3Y/3bdkxeb20Bp3lsHa6PSQJhQL7IqpEVdpq8cLhZ1z/pd/NfHmuziXW9E/KsmLx4LCSsjCgjuZcLqFYf6I9Bh1nE/12/ONLL11HwL4W05XAwEDLKio2kBCIzc8biAZfRCFKFOJU0Ocrv7w32hwY6P/yT/3UdSswvSl1YHFR7DtP6XIYjmbpn+UKneO5iJ97HFt+r0gHnOgoCoVma8l07XAIBOYXATW/3AneBAL3EGBoUV4wMGLWvxx5zgdqAUYYn6Qso6Wt6DQWm6pz7n5Irx8XzkU9Qcafl4mzVkFJ4gMTCykkaczn/syPecs8iA/0PokIrPgsnxTrgIk/6v3lUdK/ffo7myuX7mZdR7ED/uSF/0Jpvqxg5GbD1dKREbNszZo6m233z4ozt1RUBc2Cw0MDiHXENuixTmyaDvYVlq3fsAEzDtatKuHbndqzKe9oG0p5/xyMszWbqqrgbC6LluCMt7714tk/bJuasVWNZu+kZivTeb/ruUHFCXw9418riWUwd/A2rYUtCmf7fdRMLTS7pJxjQKuMLyMUiRWsL2ht5WzUQjGYnjv9Z2i8s91eAzoddECksqzls2DZjjEFWIXXFlo4KDyb3j1xn6Yvjzyw524mR1kn4IKQCA/TaWi4xSxL8RW7bqdkZ4YmP/z+2/ozdQ4/soq35dPh2Uc9pyauW1KaDIjDkYJPhjd8/1lJW5t03vf+L4ytWQPL6we1ex96vca3rXUld4rJrK5XlIQuDtZVkSTmZGn1/B/04dgiHmzZJQMDqmFtidJUAF8zllzlpEh1WSvL+3m166tfX1f/cwS1MX74P9dUlFzqE7omrq7jiN2xH7zNHpk6ga6LlFGWlItsMXqqv+fTggU4acFidVIUWeXFjOZLM6V5x9vjgdU4bwRQwjlhKYZbzjWG2ZC/+Vil0E4g8OAIqAdXLJQKBB5bAtZCFBjOlRI+0KEZcHzy58z1dyRSSSPJBqhcpnxbsxZVe3KsqFzXVLZwcZowUPCXr1JI4rQu5AOViuD2NuC42uA0w6SIgCs7dfKFLPzXQvypS6PUJtRJ/uLeyUWDO/Oe20nhUCZx7JytYGwODQcRQRzZoSTtnbD+q6gbb7Xc6rLqDlgG/l6vy5aBssr5KqJhnNJ9Z7OtP7j5zv1sxzLN7srLEP6SdjCML8Zf1fccRU5FWxH7OdAYQrs9ocWOL221esvPOQc1l+Zw7yllsXewyA+Icw5l4aBEkx9ox1A49mnTQceRi5PMps2GzVJ2gC0oui3QdT3PvKKYAreKosU5k9BearXEa9dCMbveExKDNVFlS1fRZx1ZeGEHBkiWJxfNRAfq0gzaAqlPpz9EZi/ddNZ9Dt6Oz2R3aJbOGgUV9aVfHFJZ2hxsNOm4L/AwEt1QxlZ1vywnozflGfhzP4eoHVysMj0wOKj9vbmkop/dMXloYqJB0IYrgVVp0GwMUDAUSDOl8t7BoUy1l3qbqossTfNlgkp7/nEcwyfnhGNHfkBbdGO3G0/rf2DS15lKz1dxwmVDji7qJFCc+DKN3joH3xfHviWxQqe3J1241J6DqU1e+cpfWl32D65QKNlVw7qchcpBMNVdx7knpGNp29AWdOpu/e4Gh7AFAvOQAKfqPPQquBQIkICAT3N/ZNQREYgIfLDxSWTqnKGowmHbgUN7JE6qSOn6b7ywPJimprmpnA8mNssyMzAAZ33EArzYgYJARO6xxF/NYNLUL/dkHnl28Gt7xnbsad9elrI3jrWNYmHg5bNefHD3id6Z9mKchAH/D/ktGNGr0zSKLYPLQKMFxg0Ii2ut4aCrA6P9H/zlu79xCPfe2BcHQ8HBRSoGFucMwDaYx75Z6Fhh34H9WLpwMbTOI5PvP2elYADcGvHkz7YG06jIu3Vga1AFiI7Q6XSQNlKkWYKMATdJYtbVCqRADebAreQKQpRkTimFmAHWtxuxLcfAFmv2VYzRkbjJSQimNyedGLbyfzpa+xW4iHFRa8cCmilligBJ6vIiWrhawFRfYmZjxsypi4SqFJgqEFG7OWJwqPsCLnD1OzkGm4Mo844baMWgCEv4JpCN4D7bXDLol1L0zzCg+/5CK0Q6gvfNjx/ztBOVGRNFmOM2egD7TRntMFzT0dBoNBqo+PrRcboXRZdjgtS5sTO82ef+J4wMDJRnG1O6mCtxvV4P/g8gZ2kDlqtsSdbq3L3jwM1/8u472r78TDrnnLXOVQbOsRAzlVL0XXO+RHDicVK4OFePa58rfc2GilavHHrmC1+I5otehIEs668aGk6GrPMrcZZ2HMDvA/hNAYTXBmRUJx1HUuYuuuqq6xC2QGA+ElDz0angUyDgCRhrRWtdBzUR/3Cd+hXqH9oMNLDIEUdtPoF96an0lPNXatHdBJIrBllJUoWKKxAiU/Vpj1WN4dK8UxLXIsnbi6KEtlJoxi2RqbIOBuCriinL9/28dB3Km2/+yU/g0q153jNV0cbMilNluhDdZ3AqVyXAkmc8A0OrTl98Jn3hi62UxhRENJpZgm67E2XJsG731LXtNsZ5c3Yvh2iGFBinNB0XH1w0LQgDsBcQZdWH1gpJkqHX47lI0ho0z1HDWPDpT/9MY/mKoaeX+QTSNK05+j+fQzsMrhmKssvAZ5FmGoODg9IaaERcBYvcCNHSAx9M2ZbTbMhytSpJI4iAdYS2jFPacY2nbQcH4Vi83itbakT8zynEcQpeMyg6KGnAWb6mcU1EumVRbxFglfBUuNG2wPvmE/P8NXtpZ21b60TA/wQ1Z18m0gn6/RxJ1PDDVVCIFSw0W8eXeSjJ2kRb1KqKYxizVQVjDfz4JlziExEtEOEUne7Lg2/lmm9878DYBNZqNVwolcCWFsaRhdLgCpgUxaheuGTw6bQov/bi85aoqH22tRZVqdAcGAI43hXVXF3XZJ077tj5dZZ1TEfsKhFJ0pg+zr5urAdW6xiOpZ3E0Cqu50Ze9PSSZY2f/u3ffPrqX/4vS5dqPXlqplWk4KA4+fxKYJI0YTmugKKfAiVV/d3SU1t6cBQKYQsE5iGBMDHn4aAEl6YIKAEfyA7+IT8T/GaOUyV85ONP4amL6U+GJ1gfMeu6jqf3/BKlPd4RcWbjRjjRvOvARz4YsmQ68SvBhkUELA2nbX2fF0fdO52BzYKRSR8MGPhpzKCkOIrTmAG4g+ZAtPy5P4sFZ52yYEWU5MsZY5QoDVMJtEQo8wJZ1qw63WofY82OZz8bJe61KdjpnBlXeC0Oiq1ZirGyyjHQGoJAo92ZUMtOGFn1iy/EwmVZZ3nacIMM/on3T7NxdhqM17CughdLEIuprT66qfOZzzoPlmWc8rccuEJALMYXYIYYoqovfIZPIlRhoMR0XN5ymmU9RzKld6ivI5/nM8B6uidwAAAQAElEQVRx8Dd9tWMltgH8xRrU5ZQSx37UeUepUJfREGc8mKMUmEsWtR3ds+Kcw0yyXByx7K2/9racQHWrOvJjLtvGS3cV45P2B6WJ2nm/oJCIEMcUU0LvRaAjV0ZRfyVXAZVO8oXNBhY4Z+OKU516h2IrqX0iTxfFI/u1HtiNo2yNRmI4Xk44djTLEhb+u1Qnzh6tIigm/+d9iCzhwlLr9NNHnnLK6c2TFi1qnGVRcLBYrd45ZNPjx28Ncwwc+Mot42pUUVLw5Gg1mR32QGAeEuDsnYdeBZee9ARanoBSEBE+jBU0V3YY5OpzkTqPQS+ylU4rHL7ZBgMUa9sGYFM4G8HdE4scb/JS7JIl4DnjAJf2haFTKBL8Q3+mHR8caIC5uN/NmMU7jRk+EOlmyQDikkYMiOHrhR74y18amTnh1NXDK1rD6pk6qk4qyp5UVcmAA5Sl4a/phhc9Va+f3nHZJ76y88orGT1wz1aWEHhXhVGe/bYMWoBln6YCsA+Q/h0Y26ZNi1jzZzzypec/9YSnjywrngsph4xFZqyDheepZ+t6nlMt2alD/cnm6uPMh4UQkCjLDCaKHp743QG8gabzLDG7pYDLFFe5ICZiCbY5XVI51qcXAjvdSMVaPo+Ho+8c43tucDrQEujPdHVwq/1htviFHCOKo6otDivAMg9jFxGISG3B8cCduKXuF6AkarSkvjmHj7WAKa3e3CurfX7Vy3GAqqoADcNYBeusOmHl0NnPOQcLYmVWNprZoFOFduyr44yMowwsBK34hqsa2Wztmfvu3fyGDc+XTmfSOkdl5m+yLnguTH6usDGIaK7qmXoeioiqTKeVNjvPyZqd84H+qWVZRM4LPT9c4v3StKTh8wQWggqWr8eENhupxWte82zeD3sgMP8IqPnn0hPTo+D1I0ugM22OD1W/w/9xmsOTf1jzhlU51/2ny/qDNrGCS5giXio+jHmAg/IPZsWnNuCrMTL6E97wt5mED32fFH/hegFAbcS4ZqHVdKBgmaPtf/Ind7TX3bR1V5YtmvS/+Lu9CSR8FRTxtY0wOAy04kVlNf40Qe9nBgai4X7ZFcVFj4y/hPk7HpOTk3QkVmm66Nabr2vvOVobgAgcgwydAjcfd8D+8BRemJnKwa/qMMojSSJ0uhPZshXNFzRa7leoNkYqdoNFGNsEtSlqKULgKa+B6aNnxTYANNtTXETE+ZUcdmOqDIOlr8ciDPSsy5u8tv56JjlXOp6L0ATv8RQeOCAGThjM+boDDJDwW0ShUwsofzGVRGiXpyJTR54euR+ezTKGQ2rpl0h9QyBK+7ePR1Z6aFdW2H/ap+dTfaAZEeEnd+Y7yylCJcqrue6uqpq78q6+PZKUltgCxYKONRSd7/fzzLn20jPO1j+rVHm+qFJbv5TEtqmJ4Oe+uAqNpNXfvr2/7rWvXdu/twMnnDApWZZxbBRgHcTXhwPIv/4uWIGzGkppRGzTJ5FqKE56P91s4HkW5QIAyu+O3fTHul2ROlvEH3nKXcShtF0597yz7slkftgDgflCgBN5vrgS/AgE7ktAROogKyKzN0WED2jFIK9gEsWnN2Y2gXbKxz0tfDrzoQ4GdaFYEZ/pzxm7ALGH/ZVo1ve2FZREEMUjvxUijueME3AO97+57VvzW8QN7G21hlnWcBm/QJYOIM9LKF0lSvDzSSrP0dqlxvahEnplvIBiW04hiVvVwf3ltt0LQdVzZGM+2mihMgJ9kxgOMl2ATvK8KqX+RR5FCnxhBMPXCLF2+vSzVz27NRz/R4l0U+kEOkp43x99fVsHP8ZWWtAAFJwoWCbAXzOLu9W+DZ5wFxF+cqe/wjIimmQ8m1rYYGZzcYcueqXUhUgOgWViX6UH+ISCOSX85krj/PFYSfwg0Ld77kdg3j2X/oxwHV1zLOd4F5aspsz7uw85GcMJAGe5OS9gvWjzacagP3eVlYbmK7qZzDkc3/XHnz10cLu5FYiN5sB5e/7PT1k2G6VK9apeQ2L3y1HTPLuwPVTWwnJ8qqrieOeI2O9mOjS6925cf6xmrV/G81yswHHuw5WeEBTnuG/PeNXkx5EG8jKXiKprwcLB81adsuK5WRzHlurYOdb1SSwsbXj+vq4/+qQ5FxR91rovXfi/MEhjYQ8EpgjMm081bzwJjgQChxHgyyfI1IqB89n+oTqT/PVUqm9NnU5/Kv8oF60YyVnfQlAxlQBFj4hxItYp/2QG+MDHPQacMEcw0wbFEe9VzDNM979XaN5y8EDnzvHJjtU6QrfX8yGhFhdVWcjJJ48868TlI+eXpk2lMWXP/80Z/yO71RyAK/R+Y7K954LVjtaUZXccBYhP0/drP0Hhw1/lWdKEsGpRtkG/2S+ROJETRxYMrCyrShn2xLJ/tu6u5X0FEZm2pHicSWCmUt0BfwTEWYd6Y03nMBPgNOsKtIMlTCfu3Ctrw/Cbs4x6VADKc6c1x3bhzZE/uKoDcEwUXy5hZlN1GyIsPJN1z7G+d88lIAzw3o86sc9svm7cMqADEeixFamz8HA2rdldCyOinciUbyICkak0ZdvC/+21qXNgDaDW3/S2Fx+8+0//Yd9db/pwcfDP/3505x+8/eDdv/sXu7e8/t0Hd7z5b+685Q9/GSy3s49+Gi++hT7fBWdhKWQqHh35gEPdbMQD55571n9buHDgbEd2dAKiNGbKNJrxmJL47q27ys20d5999+51Jo4z4hHeU8RuUfP3tnw7vDSGrfkjrytToDSFiuNo4fDw4Ao1tUHojGctNONfgzEbfhOhkxS93ga/T9CqlAGVspS/G1IgML8I8BswvxwK3gQCMwQ0f7b6B6tm1PFL6z75a3+/DgyVdUk1FSh9nk9iE4GNGKMZPPgL1qFi1PNChwKDv0rBR7ED3Jo1zJaIZ+Bz3MHV+QoiGiK8mDLGMOBP7j9NbtB7mtnwjmZzIIeLEMcNrub00OtPwlArnXHqGdGyE0aU0iXSNIZoBd8XUQ79bu7Kyu7cvXt8173/fA64lRXojAgcVyqgmKMg9FHRYWGgiXUDiv2oTB8QriApwP/qHx8flyTJpKSBI1/5GdAalIoQsR7ACrQzdazvYGZzPsgrChdmEJIHxTOW9PlMcNrBxEcwik3Ea1eJaLYRAzYF3PQfnvVBHBHtTNVx/v91RTFbG30QHxwt0IQ4B9pwPAUsx9QowNGuqW0VlYtAHx6EwfspUlVF3Yov4vvu59sMR3/u86GcS7OE5eornHr5ry1ecsLu/7lg2dY3Lli25TXx4I9/d2DhnX++8IRdb11+yqE3ZMN3vu7ksyZ/81vfen6ybh2qDT/ZfVd3vHsXysLFScS5kdaGOr028jJXS05YfPLgSKtlOY9FhPfYUXZN8ZDEUW98ov2TN75xbZs37rO/4x2gfCEWjq2IQEQA1nWckNZW8H0SEaiY8yCK2HYM/88BOKfEGiXckEz97bK6rmKbIGuhGV8Xfv5RZEecR6BIMxTZaHLVDg9jC1UDgUeJgJ++j5LpYDYQeOgE+OykHoij4YULZMGCRViwYEGdhoeHMTAwgEYzg/8zCHwxNBto1qzho1j8j1jDEOSE6w21A87y6Twd+sSB4dnWdRx/H0P5cweBT4bHinUc+IPewKlCKXHMuN/9TX///d51N9z8k0acdPwXqhGniLWg0chQlD3oFBBVwbqcqURV5BRDEcqyRJKl/FEcfe897/n87TjGZhmg2DN4TyIKB2UjON+QMtBsx68qeDHYbDbRprjSCdtu+bYNoiiBVilFh69g2UsD+IAFBcteot7Ipz7WZWx9yg9xZMPVGR8gxZIQA5sIyShf3pYMeA6IZQ1oluVndie6MMIrYR1RvKlYwssUHtku/AoVb/td/OZqg/4SQotHnsBbqrOAUkHRCbjpvGl7tElfWMbxjo/iYCd5+TB2zW6yEWqb0tn6dVEJLwTKokJVWopJroBUJcqimG0ly7qVig+NFGa7dtiu8vJO7WSXnuhs1Hm+NU4bE6lEB0446aSG76W79INr9+e98g5oXcWSoOga9Gg/jmMkqUKaST2P/Dwx7FLlKoBfDMXaprKDe3dPXDXb+L1OKJqVJQqQjeY4K6XqEoZ1aYJQDbRYmqvATkJE131RNG5sjoorPH3OU6ViCDT810DoA/zmpwXVpoGDHwnvn26kDt2uvxtSIDDvCKh551FwKBAggZ4CH8nOVZVlKFTwgbwOAPyV6YXO0NAQRJxKqj7LsQL3NWtgdSZWlOWD2lDfeCMaYBAxZcwYyaDvrDNmqo6Dg/Cpr7jqI87/Gu3BP8xjQf2LtyyNMz6u4oG3ouPuYLOHbLcDVfURKQ2tAJX00a8OQfFmHCn6UEIYsHxA13FqVZR0bZXup447ZpSwEbuEnHUNE19XGY3C9mHiPl83TCLxDotGu9dHnMWwXDCpjIGoCJZlxbBdxz7YAhHvaS0MqAbQGTO5O8tQplFVlSjiY87U7konKBnSSgLRDHZpnW9MhRKFcFHHGbZTZ05/dGyZ2kg1c5aoKO6MMigoCJSLEElGccWQLYXFlUCqY6dMxDa083HYJ7AEnaY1C79AUyre5pXfGwIFVy8WwTmB+LGpYmj20Zgu4sRalq4qH4Hx8DelrXgrmsFeqYiiIwEkRmkdrKJ/1HqqKh2mt4kJoNPuxt5/6wpY10e/zIXzVrRwElZGa9XIN22aqrC3jd7EZH87jHQqjn4zXQiFBpxo1u3xPIdlZ5RE8G8tjSuRphHEKaTJyAFTJdunLB3jMzKIIsXSAjGW/GMYxMiNgdZMQh+rnGUilH2DLE7hLDlGJaAcIN4PjX5eIdJCGxVcYZCmHEfeN1LSnoWmMOMUckATYQsE5iMBNR+dCj4FAjUBBhgRgfPJCixFiWWQ8cHVMfyC4blbF5z9kMleXwysi2JObSfg852J8ZGPYTA2wTmreH+mhtPKeUGg2IamPeXL8aaCdkprx8anc5h5P7uJFt7hSr07SxJGA4NYJzAVqysHH8Ad/fV/JkdLBC0KEAsRqSpEd13zlWs3X3opGF1w1M3C/zP8JRwFmbIawhWd+pWNVLDWIk1TKKEIEQZJxeDEjlbOsLyB8o0bkmK9RFHYWAELwylhW9b7UCc4YQZlDgM4bxy2O2goaB1DM4koFqURceJUpdld1runuKTScwqFZmD0Poq2iGMNLZp+C4Q88iK35wIOZU4qXB4hC2+Bt3iIphPbgeEdy+up/dRTl7J3VG30x7MURDxTUOKgQHxS0SlnlND2VJWH8VkAUkmiI4miCDzWgkCTQc2UjCGOcoblcM9GYaKMKTkufmwMkiSC/9eM814fOkrLYjKfvPHGLztfY3ISfUSDW1BG++J0CHmvgIhGM2myzjgiiprG4Ai0TriaVKHLV1qOYpVCnwqocZcxQ/f5a+Xe7mzipLOuAuc8vLuOtB3nAQhIUZkozicKIb5mzZFGKSIVA5w31rIOB8MLTQODkZERrjZVLNOEvWDeMwAAEABJREFU73ue5/SnQMQfHbVN2gXtWstKs42Hk0Bg/hBQ88eV4EkgcA+BhmVMVKJ0FPFBr+sHrIjUBUSmjxBpHvkr0m3busvleeEsg3tFGQGouo7zD2OeiTAK8uUVT/2zH7AKlpHZ8pWQsRQn/s+TUEiIaKe1f+xPrf748veXvvjOW/YfOIifxNnIxMREGyKsTLugPdENtpXA0a6mx5qCwwcIpSI20Nxy8y37bj+W7bIFEdHiFA8iYHBlIhxoCKI6adVEVaTQMsA2FLwQFEUA/MUdRxRbzkFxpUDLIIOpgtCPiPcd4ywY7HDEpmavvJyprIVluyICEYH32zKPwTxyLnfdfA8bmq2CJJko2u197Yx9swyIzlgILNt35FxAVOGccPmAVaziyo50nUMXjgEV0ByPFOIyOI4LnIISFpzeT1rZpNelEqGPTkNEeL+CUgVYEUIR7HjCYeeBWQ9j92PP6s4H9sOT5o2Za/ZLGOtZbGpvcFnPchVLxNW+QTgWFkiyBgvQZ0tkZVSuWcPuMmfDBpRXffbbW/p5vI1Lly5iXc5G5GWHrz1TlL0ebG4Arlg5vnNasmgh4rhEXnTHTbXg+x/617VcQ6Kho+y07YgCfrx8OkoR+HH0/fH3VawRMVm2ZSr6ygqWK0h50UbF11hFTl1KzFVZQEegHzH9YiEn/GBLHMX6JHwEAvOQgJqHPgWXAoGagP/1b/2vY2dg+cvUP5gNX5t4ATOdXBRlU0/augawedNmJ6JtnCTw5XkOERbhTPcHEeG1Fl+cP1ydpdQwxrjSxxPLQi5mWI64CgRnjbVUDb7oAyb/v4M4eEi+WxQYW7p8Ofq9nAYElgFKqci3CVsHZwYIKF47q3TkOr3sQNrFrmM1UFVguNTK358KoI51pU5KImiVotuxOHSgxzWojO1FsJWFZhdFDCtPnSuVoN8xmBztwzGY+fvWMXIJIzGNW+EHd2stmv4NHs+dKIFowCk45+Dv+SNv+Wtdmc7ISSvi533za2df9M//tPrVl31k5W+fuDT7vcEsW10yIKZRgz6xOsUOKEJohThLF8e1qoHThCM5IBVA6mA7Ir6rUl87GFERO8IrvzebFDnWiCCqi/mVB8V6ygHiFF0T5/yqQoJHanN+bvh+H568caUUVBx5zeid9VnoJfRXIFZ4qTSE7Az7HnO1xJe3VWF1rO0zeXt6d9fdWu6Z7Md3SGuw1BFQdNtcDVTo97tEVsFwLOM4w0DawMShg5yXfaRpNnn3rv51XAUkvGlLRzkQi+NW3/HHeyf2yY6NTUxEUdy2FV/B0V/wFaNIDEJmvQqtVgMHDx4EhxPgdwPkndBP35+iqFjOdxZw1roua4Q9EJiPBPxTZT769Xj7FNqfJwREpH6Yaq0xk/xD1p/zKF0c+XiN48SpWADG6IrB1SfnhL1hQBdLW04JoyIzwEBq+XqlMvy5XFJAMewyT7GM8rfhA4Opzx7cx/ih5vqkOTw2On6IAalCnGhYy7psX4kPfPTDTdsWRjBJDtly4fbGic/vsNQxd+s7w7veHzDQ+KRoRzEoOWiMHmrj7u17YA0DFDI4GyMmL0uRWFUFhK+jrK2q/fv390YPTVp2FVrRDwpImoWrj86fMjGfn34XB4k0RYVoGPahYmesv6FZRjnSnGw1RyZ/5ed/4eQ/feVrzl1zwcXn/9nQiLzeVm5h0WdJEyFWDShGfmF7Qp84FkalqVvj7TA5ij2apg8OHA+A4gxciaoTrFQlZrd+lQNKiTGVA9d2fFnnbSMFXApnI4iLZLbCwzihwHSsbrnBGIOyLOtU8Ya/ds7fZlNFzGL37KV1zhrFsVCorKK7ETrdSViXs399Y9F1f7LmHFacqpONY7LTGdjVOXgod7ZgXZZjPyO+ek34StKJYr+EIrWPwVYTXHSpms2hCWsW76AFy3R/u3eyvi8icLXP9SUsx7Kq7OjOnft2aNUY6/O1GTMhiBDpGIpD7L9jfq6MHup0d+88eEAQW8UbnoUpK6RxMmUMrIawBQLzlwCn8/x1Lnj25CbgGDQ8ARGBiPDhq+rkH8CaqyRRrBk3jhQ6z3rWMxjs4PzfREq4quMYRa1x0w95/wvUiYjVa9awmDNWpKwMfHhyqDeuLjgGW8swDi4S1HkP8qMoFu52SA9kzUbeaKTodCbpt6vbFn7TRDlYrkwBFrx2xqi9n/r0129fs2ZtdX9NeI8Z0LlcwfoMUM5N+eoPhiqt3W5Pbt++Y3+vU47G0mSoYtA3Fs4amDKHtZXp552Du/fs3NLrFYfEkpslU6cgFIPenoOBZXJwcnDaGee8l4rtCm3YOuDb6fZZh1ULKcoDqya6W84xaueqbm/7CbFWw1VPZLAxwqDs/aBdLp2BvkAESlJb5UrALVGJUpKIkghCMQU4OL4ugVBechzAREgsObWL1aIVl4PYN7CMeLHD3sKvNEgsjok1FV2s7U/VemiftSar6Rjn++yTFziG4nHm3HJeHW69KDQ7oJxlpuMQOQodQ01GVsypYF1PqagfPf2nV836t+EginYvG3WIx+JGo2yl7F9Z1CKC70AhMsU+o+jpt3vgN6A3Plkd/P23XTVKo2yFn8fYlcj93aewkgPjo8XXYNNxrdPKWYHWTBHArkPxO2aqpBQ01xdF9UN+7wrnplznee2byNS177PyihZhO34JPHF7pp64rgfPj3cCDCiu1+vBp36/P3vM8xz+r/pWppDmvf6iR9pIwEUIJ3zIN7IWFIOo1hpKwycnylYilanZSUU5Q5Hj/yArg7y1BUrTQ2V6DlxViGKVsayqyz6Ij9/6wyvH9xycXGeVVGPjBzA0mEFHYIArYdmGMDhDcijF6AcYdmNTr8jWPpBpx/DphBpAAFF0jfFLvEiBhrUVVCR79+5139i//8Ae5WKnJeXqg2HQ0mxLWf4K7xXF5MGx0e7lOrL/zusSVeyUTVkfNOwbqJNjwLJkypZQb5VhmGZmLYQo0gxXN3zi2LCuBVcFdKRFKxQyPNSUouOgXBPt8RwFVwnIEp6lcT04iiqRkS2HDlXXX3ABpFCJhUp6gF+CAyAVk2EqAAU4iFjBYVvKc3GegSNPXsBxfJ0k7Kd2IuKglYoiHFHLl5tr4sKNUyB5VvTt1UkEIsIc8Kgpc0Q7RLPLGglfXbGcU0pBoCGiwUJIM86DWAGqTKK0au1o9ATT27p1KD/2sa9835R6fT42pl1ZYKDVQsUVpDhLIVyg4jyHyftoxg2XqMHe5Jh8Z3QLxqdNHPXwjnfAWXGz7eCwTaTOFmfUHmeiL46PVXenaav07Tgp4FBwbCsOQOwGmyvzTRv2/kMja6xPUqJlnxSFpe9jr9+B48zmDKnJS9/Uhg9rKpwGAvOCAL9988KP4EQgcAQB/y7HOTP9IDX1g5cPVPjkC/oHrRLFQMvI7zOm0/e+910G+VKnaSpeDMWJRsT1/ihS0Fr5J7+IKO2L0z7jtSnFWQuxsFxN8IG5MB1rGKJEKXrw4L8iGzbA3L2rfbuOWp0FCxa40r+CYLtsB2wIvg2HHIwKFi4eK/JsT7sdHfMPlIIbA65oHWmlfFKsCyZB3X/Fa+XQaCSjE5O4bvTQobusdYYd5EpOhSSJmJJKaTVhodf3S1ybpsk+rXVlawFD9WSZGM+9jwAvoATTm4jhzanL2fZk6toXERG23QAoCWgT3W4H/pgwQDcHU1hV8pZBxDFwiDgumYVdrPZttXf4+nnuYoWUBhjNfUadbP0588Guy8w5QOFQlaCQqRmwC5wfChDNdlhPGaEryr/BwiO8icgsc89CROhNPY0ws8UxecEzBCh46KOD5yHiyylfn6NV0mEcsW3bVew3Jt2eZoNFc3AI/e4EhHW0jmnHQlMAZin59csyS5b0lSzZNmg5kY6wct8L5ZTjdsQNEYFInSpRse739d7dOye/CcSu3++inv+2W89XQVZ1xpIfX/6RYt3+A6P7eb8jIvWPDMcfBv475Y2zDbGUVf788BTOA4H5QkDNF0eCH4HA4QQYw51lABaROlv5DD5c/YWIoKICAPz0bfqs2dRqDSLWqeWGyhR83VJARwZaiw+4wl+gmkJDrV8PYTmuPoiOlGadCIp3waCSJDGSOBauVoi1bHjW+gOe2KHGik1V1Ri3RtmYdus/z2AM/TCs7Ork85Jowejab/3wR2vWbODyBbPvb6cOYzBxFY++X8JuCz/Kog+u0DC5PNb4yZ7d+6+Hs4cMVwPotcvznq1c0e/2i/1791ZfFoPdC0aW0JRBVZTIkgZEZDZ5F/xqjT/6ZEzlLC0Yvh9zzsAHtjiOoVQEGvFF0O30ea3R7vah4wgRh8PqDgo3BhX3OWI9dPO+iZLBSsmiQ5NjQ19+5Ru2j+7fD2lmg7GSqGGNVU406uQ0lPg/ZxTRvmaqmKb2yktSZZ1OFeCYKJ5YmC8ee5CoYlauRCrlLGSqxkP/TFNAuPl5B2489deIqLIqzj1/7RzYTsy79+wizBQ6wKS0PxeKBrprY1jDqaca3vF7KvCs2WxOTrbtZkg67ooKMV/PWU4X34YxOURVtFFAJC5dNXwIZuHWtVu57MK697c7P0p08vAy9fyhk+yHzbKB5v97V6fcs6P8iiPPONX8jgiLW5RcihJpufHx7Nquwf5INVOlxYoI/BxgN+ty/PCtiNbKV/SXIQUC847Afb50887D4NCTlwCjqX8wM9D6h2md/LVPNRQGg263W59Of8jTzn2G9Lolg3zpYkb/omyjX/ZQVn0GC1sX0z468kzrWCVx3NA64oNaI9IJtNYMKBC4mCE1ja1NsoIxhsUfzO4OHTL7up1obxIPlqYSrmI4WAZvBwVjXd0HQeKqPDkw2VY/ejBGC3bYWPAT9Yc/mUkVV43KsiiXLsFB2OwHo4cObo9imCiWkqsKfedsEeuB/I4NEzeN7snU6Hg5TCvxwMIRNTE5VvvjnPfOIlIaMUQajK3eLyclbxl6beFMCYqeury/p5RCpDMbR0MTcbRorJWdyIFYmOdFUkE3TZouqCReWDpZ1o+TVXurasW6bnf5v1324e98GNNbN69gEJF1pIDpzNmDAhh8e/3ebE6ih53mqlyv10FV0SfLqs5AxQoWlRRlXyprooxDOFvpIZ5QmwodYGIj0zY8c3+qtQaT9wXagmV87lRqJJxDSgFiAXqllAV1BQQRHBKBva8g2LLlQG9yotzmCjVmjTjHJqMogWEfkySFqJJzp0QcZWXej9d/59oNO2vj/Li/3fKmHycRgYjwamp3zrERB1tGWSOCKsfTHfv2HdrNPtXlKoocqBhV1ehc/71NNyxciLEoGhxoDQ5mJV+tGVtyHhiW1VMG608lSuh4fR4+AoH5RUDNL3eCN4HAPQT4KIZ/UPPBPJs5E2xEhA9bUVk2PDuH1zwf2llEUkXaVY6Chy/AVM5w04Nh5OKCiK9DW1MPaGOsWAPGRtT5SmkweENJEwqDOpEFEWxjoN/nJWs9mHabVNIAABAASURBVP2LX1zX7nebu3M2mfdKiFEMCBHtU+hUGqZSbCxzlWmNFe3GtgeySbeFHfAOCxgjfSjxPHyiISRZjKGhIWiVVP1O8eMiLzckkXSzRJVRJP0oirB3b7v9lY/v3fLFL/eTNB1ulbaSMh/H0MIBqJqjo38OEH+0MoapTRQ1jjPOUOQYro7ZigGODim+AIyUtpFuTExOqG9v21pctn/f4L9Mji+9fHx86GOHRoc/dmh80RX79i24rNs57UP7dp383o9fvvHtf/83a//if77t5vVT1oHGYGLF6QoUlYCiDwaOK2o+zZbJBmdOsWXbbjoYIY5TNJsZolihoF8gIF9fq5RjFqfUvp7XbL2HeiIiytflEZrixh+VijhHEvBcLAWDvz+TypJLOCaxsST0kS6wL4pZyqshEbBzHEsKu5kK08e1a1GtW7d55/hkcVBHmZUohugYfs7mxSSsrZAkMeK0ZQ4dMJs/c82Px6er3v/BT/jDSoiI93s2R6mEr64gn/jSrZOdXvldHWe2X1gnquHSeNgBrY1Xfe7abVdeCRPFzaQouNwUWTRaMQrOhZnv4pRBToqpk/AZCMw7AvUXed55FRwKBGYJ+N+lM4mxwjHWOQfeZliuGFJszPN6X78ESouJjasSCgEZGhoAgzWEasY/lCmCWE5xDYAH7j4OGGtLblKVBv66ThVg/WsGF0nR7fI9GITFH9T++c/vKzvjZr+ykQw0BhBFGRS9BFcnattGe9vO2TivEpl8IKM+zIt2iptwmy3uyMFfMBiKVlm6aUOhb7m9f6A91r+j1ynGqoo9MoalYhkbtTde+gV0uTignUs8H0SpRpG3KS4cFH3zthMdoQ7G3jBTztUUVztdwboKDmVdnrcgoguRbNv4geTKK6644W//6E3X/OUf/+En3/Gnb/v8297yls+99a1//Om3veXPPv/nf/rmq9/5x3/8lX98zf/44TfW/N8Ne1iXARSYnIRYRWHKAXLucLxcqXGGxSwTYCoORn0G7Nq+j6sMQFkYdDod9PtdaK2YVyHn+xVYpbUxjciBHZmu9BAP1Id0qnaMR7AdDaVUnbTWnoOIy5WOunJPExMcW5Kiy0TPMhaiDET80fpi4pQ/3Dfdsf7Og0Uhk4gpgkuW5e5Fqiji0kL+oB1KqKR1IM/Rw4PYjLP1yo1ztDFdXmTKXfZFoCJ54UtPhhcy+/d2rnFIJyhonOKKnDED2Llj4gemB//X2NlvrlVlja4XvO3OBLSOkaYNHL5Z5509PCecBwLzg8Axvnbzw7ngxZObgECBgZwBw6EWKs7xYS918g9vzSX9MtotOGxTqoNYO91qZDI+Ps66hnUrBiAN2NjB+fgKt38/RCteKb5XUsxkQPdtVUXlA6nYwlD89Kr2xJ5k8WIc0cZhzd3nlAGcKyBJlURZRLHBAHHPV8wHSJH6z2rQL2ejqMFwdh8T98lwpmT3uX5gxddjf2x9BN3q94z0OmXW6aFx883It2zcv6XflkMUVpVzyhX9ZHTTxvHvgNvYGFyeK6tjdpxiwgdSGqY9V/sZ8Q0SYziynIZZPknIpf6jIFyZQgVxliMiTBrKEb5pHfrKNT/ZsmYNdjBY7vnYx7D7Ix/BLp8uvRS7//VD2Psv/9Lef+WV+9sgfaYjdmMqcrXK+uZqTcHbYgExTBWT5RjdE0wnex1JkpZqZENQcYS0kdAng0gixKqBGFzGKidVY1b64uFtoqCUZ2Uhcg97b9RxLJQy9L/rL+s0xM+RBSOkTgcoaAeaA8ypIMpwOAyPFSAF6+A+W+HQS7IhX1B6VDJe4KWxt0Nw1oG1gYjOxBEXVnh5Hwv3zSDKI9oSOfxS/Gaf85xn1pmmH93qzPDeXoczwsSmmS7rXPutH/5o/5dwgOOrFi9ZpDrjEzbhq7lWqwXf/4KvHvkNum/DIScQmGcE1Dzz51FyJ5h9ohHgI92J4gsoihsfkPlUrrsQ8+HvBQMvXBRXY2c/ZajpH8S8rncrh5qm6qRV0UczzRgANYMVf+A7n+LSMXZTJOm6sBjnYIcYLRUTA75lMhAwALvCip0cXbS4PO/1r2q+8gMfOOUXPvjB5zz3wx/+D8/65OX/9bxPf+T/O+eyf/y5c//5b164mLYUU70vXAjX6+TOukpr5eAMRZatIAznWgu0SpipjJP7/u0bHGWrGvTMMXY6unrYfR+Atf9VnQzwTtp/2lOW5Gv5CmTDpvaNVdnYGMeNfhw1skgv3lROjvzAVx1pLY0qR7WnxHX5Ws2wm0oYTK2DKStwZUs546I8gw9+ctrpq7VzVvsrYY5v0ycRhlCA/YiGz/+p57a87YeSuLqhORwJKGycczRBjPU4adTXLOAsIQIcPIDSUXXbueIij1Slg+FrtKxBwZMoaBEU/U7eyorkJS9d/t8+8k9P/S8f/Kf/+MyPfOTnnvPBy5/7lI9+9D+c/Nkv/tqZH/zgC0664IJzEjZ2vzvd4aC5PvvLRT/LeXFP8r6JSJU1rXvZxacv/Nh7Th96z3sWDrUW2PN279ja83M0aQ5jbHS07oejqHQwgMcmxuIoW5ykVOGRrqxCnKag/XqlquLqjuXrT4gGdOSqqq+WTAtR3M8m1GWWaoT+17ZEhN8DVZ97/x1nKP1RmVYK3P7yb368/+C+8qahoWWun9u409G3r1+/Y/1aoDrnnAskTiPTGhmJvPO9rv8nErwAZMXZXWgy94M4mxNOAoH5QqCe5PPFmeBHIDBDwFqIVlJfeqGj+Dx2zkBrXQcPBmVYdFafdVb0f3/njc+//I4tz77sne8+/7ITToz/Q2kmXJJE6Hb7fLBrCOOkIANsHDnntDVlbRdRZSoKGitWwHhqUQFSseECKuooUQeGnnJO8jOvef2z/+erLzn7w6+6ZMUnXnLByKde+LLBz734gsVXXfyqU6/6/168/K+f9zyswPTGVROwQRH/qsf2qQZoS1VwuqT1An6LI21VVCJJDlp//YCJpeg3GHzheG6NY+Bl4KQQ0KrhYpWZpSeuZAZw1y7smTjoNpWF7cHFk+t/tOfmV/z3H9f/88fC+fc7VUW2dDFBu1vCOaEtwFA0eKYGVrICsmYNZNmypVqL4w5hhyDK+RNoCEREizZDS5Y2WmuAh/QcMUaJqJLmckAc4DRTOp0SQW1W2GPU27N+5pwkjkVVpTi4BI4aLM+7KMoOqztksY0XLChO+G+/dMpLL3jFqX930WtO+fBLL17+yYtesfoLL75oydUv+KXW1b9xyenX/PW7fvE3Xv/6Z8a10WN8aJ2RrsS+n8458Ag/B31xf20tF+TS/jN+/r+ufPeLLjn967/5m7/wrRe86NkfOOPck58qjlz7HY5vRra2Tr7edHLTxyMO1ia6KK2yvJs2mpRFHAlr0WwNIY4byAuL0lhkzUT1F0OOqPzQLtglZ0t06tr79qE3etB+o6rcoSwdwOS43DY+3q//GYALLrjSilTx+OiBwX7Pfz8yEAn7dzhCJ6LSR8Kv2p/w8RgQeBI18ZAeUE8iPqGrjycB0bAwTmkLy+BhqhJcHEGVW+S9ruTF2GA2kP/iyIL+RSesUK88cXl8QZK505rNpp7sdmRgYBCmEP4yngrkFDRcTokyq6ceyJFuVnw49yOdOC+g+ORne45tOVSukNxODParPSvixujZnd7tJ+XmjtVQd55isfGUvPrJaaXbdnLS7MRvettFR1CydDLKNGVZCe871QIUFYqrqEWsMC8SrZXbtq05G8RxrM2/9IFYZ8TZin5xOaM6LJWlRRRlUhRTAYuvjHoT7fSHZREVkRqUiQPqWzTN8Ok/xUSRqvjuQzq9LlSk0S96qGwBH8TjKILwidCnPluzBq47Oarorq4zoQGGfloB84RbLLDNxkCSrL8ADynAJRQTIG1QXHo+ivbF0gebsMcajudVldn16xn3AcnYVrvX1dwwMJhBa4M4Akqu3vV6fXR6fXVgdN/iTm/vOeOd289qT95yWlFsWCW48xSltpxuzMbVpd120uBQ1RodXfdA7C0BiUElzhloFZNzwqTY/xKFyylfe4PQB5+q4/3PNrLn6d1ix9lFOdbskWnJOdBIm0Cl2Bfh+IObAxTnAM+Otisdsc9GTFmgKHPEWYJur8e2I8S8JxSjHHt1tLpHy7P00HnBTf/ZMOCiupjQDVFOK22tSCQ+c906cF4Mr+v23Jaqkv7Xv3rT5g99CHv9PRG4Xbv2ZBCJ4wZFDmsY+mIry355dzhWzOuL5aevEVIgML8I+Fk6vzwK3gQCJFAUMHyMtlUktqwYlCXnq6gEVdsgQRMnrDiRBXpSoa8mu6NSdMaNKwtKgSSxkkU6ajJYKAaOBJHOYHSOvuvyWZ/h4CFbv+Zxahnf1DRz62jXOCil62BgubIg8YAvK73KyHh7UjHaiDGlFFROvbytbFLqKqrsgfH2lrt27Zmky/U+MgLEUWz6Vd9VMiV0ImVhegYJ28nijOUU+j0j5/DsgfYeY0isB5wpwGQQKwZcpWAZaHywEW55latGpNWaNfUSiLv2+3dcb9DaYqvmRHVoYMNMG1z6KZTVecKFlOZQip4Zh4u5muL/DRrnYEgv1nApF0t8nUZTFFcZtHGpOJNCkMIqYeKv90grEYbK0mhf9iGlvOc4UK4sSwgqRHwxEluLWBQ0tLNV6m754U535ZW10KEoSyZ1lPZi6lRnJ5BGOcr+JBzj68DwUqjGIujGEhnrVaqftxOgN5BpLv/k4ypRecuaMs37pty7b2Jsxuax/LYdqWq0LrcRFy4c50Sfr/u6vQkkqULB+Zg2U9E6Fs2CWrcFqi2F7YphPypbokeRkrgYzXgIsY7YidJV4Ds33HfLC0BZxTlCDhSeTQ5CQS6aSs6SCdUcMklg/N/sum/1o+YojpxQ7BjLMZaYjDn32IbXlpUrHGBMQ3vjdXX3W7/3qV2dtrlR2Wzr/v1YX+dOfyik2hiKsMggRx+p1lDsSmRo10QuShPa602XDodAYH4RUPPLneBNIDBFoKpQtlpLdui4ZXWUQGsHPvOhGOT9/wKi351awdBakESxasRJkiidKKcYgDWEP1uVD55KYKoCFjmiJDG9rh296uof1+skscpUJHEF3qWMgDAURRQ7WsfQEjEeCJSKEEURYkRoZS0MN4fqPN63zWarU9hi08f+ce2UMwAmtsFFUVapSNtsoIWSHTGlxSBfQTQaA/B/W6goCufPR09oMDiw0v3s/m9dFf3KNhoN57hK4P201tAHxdcZPQqergy1Yq2UsWvW+I4A31u3a+e+vfGNu3a6r393427//0SqW2DcdI205bw//X4XQ0ND7KMDRLOPCbSOKCas66dgJvVDlaPVaojvgyMbBjroOEG333PGVU6UconWeCjb4CDcwID/twKdTSj+VBzDllzJyBksGejjRCHOxLRa6UwD7ptfv2XH8MLl+8uysppj5FmmSYSMZS1d7uc5+pVBnGZoNFKyySmXgJTLMiLTAAAQAElEQVT9coVFFjVsIxvZdcXl/7YLD7DpgahXltGo0mkZpw1nKluPf5Ik8P+2TysbhuEKlKsEYizgCogqoLSDijREJ4h0hjgZRHdsEqLAc80RpDo4SttkYGFLJ7SqOacdz5SiHRXBt5lo5WArtsgGjlL/aFnWWWdsiYjz11mgLAwULTS50pTFiTPGuTwXN1N3fBztg/ua102ODq7dtGnyhpl8fzSG6zXsY5+KWyccK3KOBDCmon1xPQLKstasLV8npEBgvhBQ88WR4EcgcDgBpdBvt/XNSbJwt7Gxm+i00SsmkbaAdJAPWu3gGAhcqaFtDMX/+FSntjGMFX2+LqD2sOOw5iAYTxmkGlAmdokb3jhxANt9W6bqs5mc+T1I1eWxjxglErG0WTKvhKa5oZTihq8gemMMpOM5VBGjIQO2P1Hts13ZzWX/0tvzSS2CS5KsNFa5LmVQlo4wGMTodHP4f9ywNZBCaYs8p3++wgOkrmYIrTquNB1pDTYgDIJZq8mwLqDzSBsG7d4+iqrMYHrjaoW97cfV5zZtzT64Zs2GWd+A3Nc3adKwGYNwd6JAFo+QVQMaCWA1smjIjZgpwbR750FX5F0r0nNxZJBlgomxcWRJA5FIVZbtonJdi6NtDyKvX+Qm1qmtSgHFHHSSgqskqOhnLz+EwhyoTju7oWdN9Ud2j0/aDUUR8Y1OgiQepk8JV05GyfMQzy3FasF+lGQTocgd+j1isQ1EagRlL62KTnRnd6LaOmvzGCft9iTF8Mhtpmgc0Kw7OTnJkn5eKDS4QtPnAk5/AhQOCfMFii0rEWhRZEPfVAuxtNCb6NOvJmzV57uhjmtIhqNuVGJR5Bwo2hwMxWTOMU7qPuR5CQoWK9oZHamjVj9appPExlETWsUQEcQ6gjig2+6hyrUXfZIMeP+nam/YgOI739z//R/9QH3sQx+6q35t5e+sWQO1YLGSOK0Ap1H0hUJyAIavxHTLoNJdV1kOIpq+eEiBwLwj8OC/NfPO9eDQ8Uxg82YUX//6uh8c2O9uFFlgB4eXQrikk9s+f7V3mEpwuZwiwjgIZYV2DMiMDWIgwt/aUWlUVOZJ6orKFAzdDdNITuiPH4punJjAJs9uYGDQKthYuLwvisFRs66yULTBfIgDYiXoTU7wNUmMgaxRH/2qjpZI531T5TkreWPTiT/4bS+vemk6WOoo5Y/oCo42dJwiyTK0+zmStIEoOUbAm7YzcxjiSaOVIGtk4v/sB1+dYYJBN4ob0FGCbq9tkzTqDw0tMyw6s7vbbvvahve//1M/ZgZ7wU/uqtGsdBJ3DYFEWrkmVz6KfsmlG4FfPTCVc5a/8g9iamtkWaW1FFkrtgaFG5s4hIGhQVTW2NGJQwUgeRYPMvphztuStXCNpGWK0po4zbgKlqLiyldpqMtE2N9W1UwHbKPJyD9tfcfEjvF1N2z/gcPCUWNS9itxB/ZPYGRkIVqNFMbmiGOBYwD2woQrFhgcHIajgNPSRLOxxHbaclDrBePTJo95eO97kV/33S03OLd0c3tCeo1sgdFpipLLYmINsijGcGuAC2yW9gUgfQptWK7ZWPbBt11yasZxDEVxoriqAqdtboR+37fZNM2sShJj+c62qkrW0Yg4viKCKE6h47iqDPcpDXpfA0fLkWbVz039h88rk3PcOohT6wYGsyrN4l6RV/R64Iiab3zzd3bc8JKPHLGa8453gArMlZUxLk1bsBT/RcmvFL9uluYL9qnZWC59lQjCFgjMQwJqHvoUXHryEThaj93ll9+wc/RA6wpTLf2qjhfvryQ1RmvEzSQ3yvY6Rbdro37Hxb1JF+dt+BRV44hdjynnz/giyVq5lawAFm+fHG999mtfu+MT//qvOOAbLHLJK9jICaxo1adCyhm2SmNtacWWUK4yMEVrqJVXzvRKm/f4LDeF7bvK5VVl3Mavfen6fd7WTGo0YAeGFk1OdLqFSmPLshgYztBopZjsdZC1hoEo7XX7VWfBggf8A7HoRnDscjXZmTBeZAyNDKM1OAjjhIkrMBlXZDCAW3683c744I9r1sBeeaUPv/5qKilV5GVVTqgIXWfyTt4bLURVTiKLifakS7LU6kjZRVPFMbJ4eNzC9iCa4izF8MgCHBw94MrKMsQllY6H2sY1+2zniLbxYLYLgNKm/TgdaDuoKi+NidLUxI1WaaHzvIjz3LTs7T+ZmBVSbMds/Ul1w8To0AeXnLDyRwMLhncsX37a3qpsdtud0mqColJwcaLcyMhgyddXNO0cx7bq9qmC1MAoMLCDiWsxD+zk3/3dv2+87ZbJy2K18sassTCfHB13gyMDRiS3FVcKrZ2Ajhw029WagkYpKOreexLvJYasSkxOdpBmC6tUn9jp9e77ypIG+0Vl80qkiptNjkXC+TIBoUgq+booouhsDS/sWVFFdoAmH9h9wGbRyMiyfWkjq5wunE5zVG4CnXxfbqWbJ42oXUpjlu+0SbeGNafP64MIXGHT3Uo3OzpKOZeH0O0XSJsjVema3UZjZc+4Ze2rrrr23rbq+uEjEHi8CajH24HQfiBwLAJ8JdRds+ajX7/i4xvecuemgT8puk+5FObsbwjO2ZzGP7V9ZOBnt6voqXwNdd7dwHnboc+/S/T5myHn3e5w/nrI026ZmFz578489X2jo6ve+uVrdv/1q1/3w1tn2mv3BtYJnnqzUk//kdLPvFXU07coeeqdgnPvFDlvSxSds0XpM+8ybtVdkFXblD51i45O2Qo5eWdVLt9ozYobb7vtwP4Ze/7Y6zGWlCMb0/T062K9ekOSnHxHaRdtKculO7PkKXvKfNWEuLMPiDr1wI4dP5P4OveXUi4iOFmxfXjoqT+pipU7YE7bJe7MO1rZ0zdF6rxNVXHqHYOtZ2xujw1O3J8df6+qhtpJcsLdWbr6brHLtg4Pnbm51TiVLE+6a+HIWTv6/YGdsVp+oNdcIL783TuwSdQpt/e6y38i7uxbnTt700DzuXdp/bTtxpy7u9teeWeZr/Ci0fnyc0letHzlq7fu6XUHfxzJit1anbSzrBZvh1uwTanl26J41S7Bqm3dycW3HG73z/7qzh3vfOc3PnDrD82b9+wavuLgvkXfU+bU24eHztk8MvyUTVqdeIdWJ2xIopPucG7R7WU1cmecnbSx2Vy1y1UL16+/bff69753c364zWOdr12L9tt/+3OfXb+hfPvuHY2/BFZ+vt8e3irRym1ZtnxrXja2alm6VbB8GzhGWq3YoWXZDpFFd4tafLeKFm13WLitKIa3DQ6fuwNu9R0TE0u/+S//8uX7CIJcLyx1vHJnkqy6u9ddcLCsFu1I0xU70njFXuuWboj06pt1dPK3bbV844Kn4j71j9aHAwfSojCL9zm7fIeOlu1K0hW70+ykbY3Gqi1JsnpHuzP4rc985t9nFvCOZmI2rz+x8hut9KfX2/z07dqedvfiJU+7C1i2PU3OPDg5ufTg5PiJm269bn9/tkI4CQTmEYEnptCZRwCDK48uAQbE3u/+j9t/9MbXX/OvF7/ss++86CWfecPLX/zJX7/wVz79ipe+8OOvvODFn/v1l7/4qldd+KLPv/oVv/qlV1/84mt+88Jf/fxrX/bCz11ywUu/8Fu/+ZpvvulXfunT73rdf/7gVRe9+pub6O1sUH7fX33lmxdc+Kk3v/zXvsT617zu4pdc/YqXv/QLr7jwpZ95xcUXXnnxhS+56qJLXn3Nxdd9f/ErXvuqL73y937/6t/YsnXVK/ftPePi7XevuuSfPnD9J774RRwhMDZsQPlHf/rR777/Pd/5w93bTnjd5KHTfn33tiUvz3s/9bI/eMNVL/6NC//1Bb99yWd/48bvpB/8/pu+X9Cf+92vvhqdf/7b71+9cf3wfx/dd/7L9tx1zkv+4A1fvegVL73s5a991adf/vY/ue6V//apve+68o9v8oLjfm194Qu7ep/5zI+v3Hbngv9+6ODpr95914pXHtiz8qLdu5e+fNPm6KWHxpZf+OnPbnzPu9412vaG/vrd195y/bfdn9v8P11y16YzX/uiF/zby1978TUX/NoLPvGy1//6l37jja/77Nv++A3v86/HfPE5p3++7NZtH//IDX+9eXP28n77zAvoxwXbtwxctHfvwlfu2bngVetuab/+L/7yyk/dy7D73Ocw9k/vWfut33nNte/5izXffsvWzSdeMrF39Ss3bWy+YnJs1W9Mjp1yyY4dSy7p9c66ZM+ORZds29Z83Z6dC1+1dUvjD2+5bfxb97J3v5dfuw2d//Ocj133m2/4+Pv23LnszXvuXv3rOzYNXbxn19ILu/1TLtyzd9GF+3ctvvDgzhMv2Ltj+QUH9yx92aG9iy7YvXfkgn17F1wwOraM6cQLdmxd8LLR/Wdc8ta3fvETnNN8ZXRks+vWbRz76he3/eO2u5a/auzgqS/Zt3PZhTu2D73srm0Dv9brn/Wq3btP/t2PXrrhL//Pm79w86WXojyy9tGvRg+OXLp988LfP7Bv9a+PHjz1orvvWnLRtm1LXjF+4NzXrl8/9FuXXfbD9//v/7350NFrH5n79nde/+2LXvLp17/65R9/yf/687UvueWW6sKNd8QXb9264KJ/fM/3X/6WP7zivRyXySNrhatAYH4QCEJnfoxD8OIBCPDXdZ9pz9e/jk1f+hJu/epX8YNrrsEPvvxl3HJ1ncpbPvelzq1XfbXzw6u/Utz2xa/hxxQhP/nsZ7GF9Q58eTP8r/hZkeObu/p7Byavvnr/5s9/qfjRF75arP/cl8pbr/5yWdv7zNVTdj/5Gdzyn//zh2/51Gfxgw98ALeceeY/3LjqtL/93lnnvvemv/qrjf7/In3voOWuvvrA5JvffPvGU0754K0nnvjPN5922hU3L1r0V9d/+HLceM1X8P2PXHH3zS948bs3XokjXy15n46S7P9+7y37zzrvXT9cecr/umHlmW+/4YOXjd36mavpJ9P/+6ett170mo/euRYP6le++/3fv2Hv6jM+cMuK1Zf+4KQzL7vVH0877bKbzjrr4zedfPLf3vTa37pmE32o++RX1F7w4ivvOPHE/7PuvPP+7off+AZu+ew14z/492vLH3jWl39q58Yr1+6vRRHrzHmnKCze+Kb1m88447Lrhxe/+8ZVqz60btXpn1h38slX3Lxy5aU3/OyzP3zL2rWTB45m2IuFb96AvZd9Apue8/Mf++FpT/3Izc94xmduPvvsT9581lmfuOm88z518xlnfPyGU8/65PdWr778+hNXved7p571v257y1u+MX40e/eX58fpy1/GxJnPfv+WU855P8fgihtOOPnjNy1efNlNJ5zMdOqHbzzh1A/ceNIpH7p++cp/uWH5yituWMl0wsrLb1x8Au+z7MpTrrhh4bI1t73vfbcfdQVl7VpUF736qo2rz/h/15948oe+u3r1R75/JuucweOJS96z7ilPuexHl7zhpi2XsztArgAACcFJREFUfmFX9/58PfzeK1/5pW3Peta/3Hj22R+97txzr/ze+c+4+trzz7/m+lWnf3Td05/+uVv/4A9+spvl67Hm8X73r31tb+eqL7b5nSrX/f3f303Wn7z5rHM/ceMpp/zd9X/2Zxtu/PCHd2+jgQdli+XC/igQCCaPTSAInWOzCXcCgaMRcMycSTx9yLu38ZArh4r3S8CznUmWJWfO/ZGXD2t/JGzcnwPevk/3V2Yu97yte6e51A9lA4EnPIEgdJ7wQxg6EAgEAoHAXAmE8oHAk4dAEDpPnrEOPQ0EAoFAIBAIBJ50BILQedINeehwIDB3AqFGIBAIBAJPVAJB6DxRRy74HQgEAoFAIBAIBAIPSCAInQdEFArMnUCoEQgEAoFAIBAIzA8CQejMj3EIXgQCgUAgEAgEAoHAo0BgXgidR6FfwWQgEAgEAoFAIBAIBAIIQidMgkAgEAgEAoFAYH4RCN48ggSC0HkEYQZTgUAgEAgEAoFAIDC/CAShM7/GI3gTCAQCgcDcCYQagUAgcEwCQegcE024EQgEAoFAIBAIBAJPdAJB6DzRRzD4HwjMnUCoEQgEAoHAk4ZAEDpPmqEOHQ0EAoFAIBAIBJ58BILQefKN+dx7HGoEAoFAIBAIBAJPUAJB6DxBBy64HQgEAoFAIBAIBAIPTODREDoP3GooEQgEAoFAIBAIBAKBwGNAIAidxwByaCIQCAQCgUDgyUwg9P3xJBCEzuNJP7QdCAQCgUAgEAgEAo8qgSB0HlW8wXggEAgEAnMnEGoEAoHAI0cgCJ1HjmWwFAgEAoFAIBAIBALzjEAQOvNsQII7gcDcCYQagUAgEAgEAsciEITOsciE/EAgEAgEAoFAIBB4whMIQucJP4Rz70CoEQgEAoFAIBAIPFkIBKHzZBnp0M9AIBAIBAKBQOBJSOBBCJ0nIZXQ5UAgEAgEAoFAIBA4LggEoXNcDGPoRCAQCAQCgcBjRiA09IQiEITOE2q4grOBQCAQCAQCgUAgMBcCQejMhVYoGwgEAoHA3AmEGoFAIPA4EghC53GEH5oOBAKBQCAQCAQCgUeXQBA6jy7fYD0QmDuBUCMQCAQCgUDgESMQhM4jhjIYCgQCgUAgEAgEAoH5RiAInfk2InP3J9QIBAKBQCAQCAQCgWMQCELnGGBCdiAQCAQCgUAgEAg8EQkc6XMQOkfyCFeBQCAQCAQCgUAgcBwRCELnOBrM0JVAIBAIBAKBuRMINY5vAkHoHN/jG3oXCAQCgUAgEAg8qQkEofOkHv7Q+UAgEJg7gVAjEAgEnkgEgtB5Io1W8DUQCAQCgUAgEAgE5kQgCJ054QqFA4G5Ewg1AoFAIBAIBB4/AkHoPH7sQ8uBQCAQCAQCgUAg8CgTCELnUQY8d/OhRiAQCAQCgUAgEAg8UgSC0HmkSAY7gUAgEAgEAoFAIPDIE3iYFoPQeZgAQ/VAIBAIBAKBQCAQmL8EgtCZv2MTPAsEAoFAIBCYO4FQIxA4gkAQOkfgCBeBQCAQCAQCgUAgcDwRCELneBrN0JdAIBCYO4FQIxAIBI5rAkHoHNfDGzoXCAQCgUAgEAg8uQkEofPkHv/Q+7kTCDUCgUAgEAgEnkAEgtB5Ag1WcDUQCAQCgUAgEAgE5kYgCJ258Zp76VAjEAgEAoFAIBAIBB43AkHoPG7oQ8OBQCAQCAQCgcCTj8Bj3eMgdB5r4qG9QCAQCAQCgUAgEHjMCASh85ihDg0FAoFAIBAIzJ1AqBEIPDwCQeg8PH6hdiAQCAQCgUAgEAjMYwJB6MzjwQmuBQKBwNwJhBqBQCAQCBxOIAidw2mE80AgEAgEAoFAIBA4rggEoXNcDWfozNwJhBqBQCAQCAQCxzOBIHSO59ENfQsEAoFAIBAIBJ7kBILQmeMECMUDgUAgEAgEAoFA4IlDIAidJ85YBU8DgUAgEAgEAoH5RmDe+xOEzrwfouBgIBAIBAKBQCAQCDxUAkHoPFRyoV4gEAgEAoHA3AmEGoHAY0wgCJ3HGHhoLhAIBAKBQCAQCAQeOwJB6Dx2rENLgUAgMHcCoUYgEAgEAg+LQBA6DwtfqBwIBAKBQCAQCAQC85lAEDrzeXSCb3MnEGoEAoFAIBAIBAKHEQhC5zAY4TQQCAQCgUAgEAgEji8CT3ahc3yNZuhNIBAIBAKBQCAQCBxBIAidI3CEi0AgEAgEAoFA4MlM4PjrexA6x9+Yhh4FAoFAIBAIBAKBwDSBIHSmQYRDIBAIBAKBwNwJhBqBwHwnEITOfB+h4F8gEAgEAoFAIBAIPGQCQeg8ZHShYiAQCMydQKgRCAQCgcBjSyAInceWd2gtEAgEAoFAIBAIBB5DAkHoPIawQ1NzJxBqBAKBQCAQCAQCD4dAEDoPh16oGwgEAoFAIBAIBALzmsBxJnTmNevgXCAQCAQCgUAgEAg8xgSC0HmMgYfmAoFAIBAIBAKBx4xAaAhB6IRJEAgEAoFAIBAIBALHLYEgdI7boQ0dCwQCgUBgzgRChUDguCMQhM5xN6ShQ4FAIBAIBAKBQCAwQyAInRkS4RgIBAJzJxBqBAKBQCAwzwkEoTPPByi4FwgEAoFAIBAIBAIPnUAQOg+dXag5dwKhRiAQCAQCgUAg8JgSCELnMcUdGgsEAoFAIBAIBAKBx5LA/BY6jyWJ0FYgEAgEAoFAIBAIHHcEgtA57oY0dCgQCAQCgUDgeCUQ+jV3AkHozJ1ZqBEIBAKBQCAQCAQCTxACQeg8QQYquBkIBAKBwNwJhBqBQCAQhE6YA4FAIBAIBAKBQCBw3BIIQue4HdrQsUBg7gRCjUAgEAgEjjcCQegcbyMa+hMIBAKBQCAQCAQCswSC0JlFEU7mTiDUCAQCgUAgEAgE5jeBIHTm9/gE7wKBQCAQCAQCgUDgYRB4TIXOw/AzVA0EAoFAIBAIBAKBQGDOBILQmTOyUCEQCAQCgUAgEHhECAQjjwGBIHQeA8ihiUAgEAgEAoFAIBB4fAgEofP4cA+tBgKBQCAwdwKhRiAQCMyZQBA6c0YWKgQCgUAgEAgEAoHAE4VAEDpPlJEKfgYCcycQagQCgUAg8KQnEITOk34KBACBQCAQCAQCgcDxSyAIneN3bOfes1AjEAgEAoFAIBA4zggEoXOcDWjoTiAQCAQCgUAgEAjcQ+DhCJ17rISzQCAQCAQCgUAgEAgE5iGBIHTm4aAElwKBQCAQCASeiASCz/ORQBA683FUgk+BQCAQCAQCgUAg8IgQCELnEcEYjAQCgUAgMHcCoUYgEAg8+gSC0Hn0GYcWAoFAIBAIBAKBQOBxIhCEzuMEPjQbCMydQKgRCAQCgUAgMFcC/z8AAAD//2mcH/gAAAAGSURBVAMAyyt3hKmdA2AAAAAASUVORK5CYII=';
  const logoBytes = Uint8Array.from(atob(LOGO_B64), c => c.charCodeAt(0));
  // Logo dimensions: 570x438px → scaled to fit ~1 inch wide in DXA
  // 1 inch = 914400 EMU; 1 DXA = 635 EMU
  // Target: 1080 DXA wide = 685800 EMU; height proportional: 685800*(438/570) = 526800 EMU
  const LOGO_EMU_W = 685800;
  const LOGO_EMU_H = 526800;

  // ── Collect data ────────────────────────────────────────────
  const name    = g('c-name') || g('c-name-ar') || 'CLIENT NAME';
  const nameAr  = g('c-name-ar') || '';
  const coach   = g('c-coach-name') || 'Coach Loai Hassan';
  const goal    = g('c-goal')  || '—';
  const phase   = g('c-phase') || '—';
  const cal     = g('t-cal')   || '—';
  const prot    = g('t-prot')  || '—';
  const carbs   = g('t-carbs') || '—';
  const fats    = g('t-fats')  || '—';
  const water   = g('t-water') || '—';
  const traintime = g('t-traintime') || '';
  const notes   = g('coach-notes') || '';

  const ibWeight = g('ib-weight'); const ibBf = g('ib-bf');
  const ibSmm = g('ib-smm');       const ibFm = g('ib-fatmass');
  const ibBmi = g('ib-bmi');       const ibBmr = document.getElementById("r-bmr")?.textContent?.trim() || "—";
  const ibTbw = g('ib-tbw');       const ibProt = g('ib-protein-kg');
  const ibVfl = g('ib-vfl');       const ibScore = g('ib-score');
  const ibDate = g('ib-date');
  const tdee = document.getElementById('r-tdee')?.textContent || '—';

  // Collect meals — tier-aware helper (applies carb-cycling scale if tier != 'M')
  const isENexport = (window._lang === 'en');
  const mealsData = {};

  // ── Helper: populate mealsData for a given tier (pass 'M' for unchanged base) ──
  function buildMealsDataForTier(tier) {
    const scale = (tier && tier !== 'M' && typeof ccGetTierScale === 'function') ? ccGetTierScale(tier) : 1;
    const out = {};
    if (!window.MEALS_DEF || !window.OPTS_DEF) return out;
    MEALS_DEF.forEach(m => {
      out[m.id] = { label: getMealName(m.id), sub: getMealSub(m.id), icon: m.icon, opts: {} };
      OPTS_DEF.forEach(o => {
        const rows = [...document.querySelectorAll('#rows-'+m.id+'-'+o.n+' .food-row')];
        const items = [];
        rows.forEach(row => {
          const foodAR = row.dataset.foodName   || '';
          const foodEN = row.dataset.foodNameEn || foodAR;
          const food = isENexport ? (foodEN || row.querySelector('.food-search')?.value?.trim() || '')
                                  : (row.querySelector('.food-search')?.value?.trim() || '');
          if(!food) return;
          const unit   = row.dataset.foodUnit   || '';
          const unitEn = row.dataset.foodUnitEn || unit;
          const unitG  = parseFloat(row.dataset.foodUnitG)  || 0;
          const sliceG = parseFloat(row.dataset.foodSliceG) || 0;
          const qtyBase = parseFloat(row.querySelector('.food-qty-input')?.value) || 0;
          if (qtyBase <= 0) return;

          // Apply tier scale only to carb-source foods
          const isCarb = (typeof ccIsCarbFood === 'function') ? ccIsCarbFood(row) : false;
          const s = isCarb ? scale : 1;
          let qty = qtyBase * s;
          // Sensible rounding
          if (unit && unitG) {
            qty = Math.max(0, Math.round(qty * 4) / 4);
            if (qty < 0.25) return; // dropped
          } else {
            qty = qty >= 20 ? Math.round(qty / 5) * 5 : Math.round(qty);
            if (qty < 5 && s < 1) return; // drop tiny portions on low days
            if (qty <= 0) return;
          }

          const gramSuffix = isENexport ? 'g' : 'غ';
          let qtyStr = '';
          if (unit && unitG) {
            const unitLbl = isENexport ? unitEn : unit;
            qtyStr = `${qty} ${unitLbl}`;
          } else if (sliceG) {
            const slices = Math.round((qty / sliceG) * 4) / 4;
            const sliceWord = isENexport ? (slices === 1 ? 'slice' : 'slices') : 'شريحة';
            qtyStr = `${qty}${gramSuffix} (${slices} ${sliceWord})`;
          } else {
            qtyStr = `${qty}${gramSuffix}`;
          }

          // Spoon/slice secondary column
          const tbspEl = row.querySelector('.food-tbsp-input');
          const tbspVal = tbspEl ? parseFloat(tbspEl.value) : NaN;
          let spoonStr = '';
          if (!unit && !sliceG && !isNaN(tbspVal) && tbspVal > 0) {
            // Scale spoon count proportionally for carb foods
            const scaledTbsp = isCarb ? tbspVal * s : tbspVal;
            spoonStr = isENexport ? formatTbspEn(scaledTbsp) : formatTbspAr(scaledTbsp);
          }
          items.push({ food, qty: qtyStr, spoon: spoonStr });
        });
        out[m.id].opts[o.n] = items;
      });
    });
    return out;
  }

  // Figure out which tiers to export
  let exportTiers = ['M']; // default = single base plan
  const cyclingConfigured = (typeof ccIsConfigured === 'function') && ccIsConfigured();
  if (cyclingConfigured && typeof ccGetSelectedExportTiers === 'function') {
    const sel = ccGetSelectedExportTiers();
    if (sel.length > 0) exportTiers = sel;
  }

  // Backward-compat: fill mealsData with Medium so any code that inspects it still works
  Object.assign(mealsData, buildMealsDataForTier('M'));

  // Supplements
  const supps = [];
  document.querySelectorAll('#supp-rows .supp-row').forEach(row=>{
    const inp = [...row.querySelectorAll('input')];
    if(inp[0]?.value?.trim()) supps.push({ name: inp[0].value.trim(), dose: inp[1]?.value||'', time: inp[2]?.value||'' });
  });

  // ── Helper styles ───────────────────────────────────────────
  const T = EXPORT_THEMES[window._exportTheme || 'neon']; // active theme
  const BG = T.docBg;
  const ACCENT = T.sectionColor;
  const W = 10080; // content width DXA
  const noBorder   = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
  const border444  = { style: BorderStyle.SINGLE, size: 1, color: T.rowSep || '444400' };
  const border2A   = { style: BorderStyle.SINGLE, size: 1, color: T.rowSep || '2A2A2A' };

  const mk = (size, color) => ({ style: BorderStyle.SINGLE, size, color });
  const borderY8 = mk(8, ACCENT); const borderY1 = mk(1, ACCENT); const borderY3 = mk(3, ACCENT);
  const borderYthick = { style: BorderStyle.THICK, size: 18, color: ACCENT };
  const borderC4 = mk(4, T.opt2.header); const borderC1 = mk(1, T.opt2.header); const borderC3 = mk(3, T.opt2.header);
  const borderO4 = mk(4, T.opt3.header); const borderO1 = mk(1, T.opt3.header); const borderO3 = mk(3, T.opt3.header);

  const shd = (fill) => ({ type: ShadingType.CLEAR, fill, color: 'auto' });
  const margins = (t,l,b,r) => ({ top:t, left:l, bottom:b, right:r });

  const isEN = (window._lang === 'en');
  const arFont = { font:'Arial', rightToLeft: !isEN };
  const enFont = { font:'Arial' };

  // Helper: create a simple text cell — direction respects current language
  const cell = (text, opts={}) => {
    const {
      w=W, fill='131300', color='F5FF00', size=18, bold=false,
      rtl=false, top=border2A, left=border2A, bottom=border2A, right=border2A,
      valign=VerticalAlign.CENTER, align=AlignmentType.LEFT,
      marginTop=100, marginLeft=150, marginBottom=100, marginRight=150,
      colspan=1
    } = opts;
    // In EN mode never use RTL regardless of rtl param
    const useRtl = isEN ? false : rtl;
    const children = [new TextRun({ text, font:'Arial', color, size, bold, rightToLeft:useRtl })];
    const cellProps = {
      width: { size: w, type: WidthType.DXA },
      shading: shd(fill),
      borders: { top, left, bottom, right },
      margins: margins(marginTop, marginLeft, marginBottom, marginRight),
      verticalAlign: valign,
    };
    if(colspan > 1) cellProps.columnSpan = colspan;
    return new TableCell({ ...cellProps, children:[
      new Paragraph({ alignment: align, bidirectional: useRtl, children })
    ]});
  };

  // ── Section label ──────────────────────────────────────────
  const sectionLabel = (text) => new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, font:'Arial', allCaps:true, color:T.ibKeyColor||ACCENT, size:16 })]
  });

  // ── HEADER TABLE ────────────────────────────────────────────
  const headerTable = new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [1620, 6760, 1700],
    borders: { top:noBorder, left:noBorder, bottom:noBorder, right:noBorder, insideH:noBorder, insideV:noBorder },
    rows: [new TableRow({ children: [
      // Logo cell — Olympic Gym PNG (always dark bg for visibility on light themes)
      new TableCell({
        width: { size:1620, type:WidthType.DXA },
        shading: shd(T.logoBg || BG),
        borders: { top:noBorder, left:noBorder, bottom:noBorder, right:noBorder },
        margins: margins(0,0,0,80),
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ alignment: AlignmentType.CENTER, children:[
          new ImageRun({
            data: logoBytes,
            transformation: { width: 113, height: 87 },
            type: 'png'
          })
        ]})]
      }),
      // Name + subtitle
      new TableCell({
        width: { size:6760, type:WidthType.DXA },
        shading: shd(BG),
        borders: { top:noBorder, left:noBorder, bottom:noBorder, right:noBorder },
        margins: margins(0,0,0,0),
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new Paragraph({ spacing:{after:30}, children:[
            new TextRun({ text:'OLYMPIC GYM  —  NUTRITION PLAN', font:'Arial', allCaps:true, color:T.ibKeyColor||ACCENT, size:16 })
          ]}),
          new Paragraph({ spacing:{after:30}, children:[
            new TextRun({ text:'CLIENT ', font:'Arial Black', bold:true, allCaps:true, color:T.headerSubColor, size:18 }),
            new TextRun({ text: (name||'NAME').toUpperCase(), font:'Arial Black', bold:true, allCaps:true, color:T.headerNameColor||ACCENT, size:18 }),
            ...(nameAr ? [new TextRun({ text:'  '+nameAr, font:'Arial', color:T.headerSubColor, size:16, rightToLeft:true })] : [])
          ]}),
          new Paragraph({ children:[
            new TextRun({ text:'PERSONALISED NUTRITION PLAN  |  MADE BY '+coach.toUpperCase(), font:'Arial', allCaps:true, color:T.footerColor, size:15 })
          ]})
        ]
      }),
      // Goal + Phase
      new TableCell({
        width: { size:1700, type:WidthType.DXA },
        shading: shd(T.mealTitleBg),
        borders: { top:noBorder, left:noBorder, bottom:noBorder, right:noBorder },
        margins: margins(60,120,60,120),
        verticalAlign: VerticalAlign.CENTER,
        children: [
          new Paragraph({ alignment:AlignmentType.CENTER, children:[new TextRun({ text:'GOAL', font:'Arial', allCaps:true, color:T.headerSubColor||'888888', size:15 })]}),
          new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:30}, children:[new TextRun({ text:goal.toUpperCase(), font:'Arial Black', bold:true, color:ACCENT, size:14 })]}),
          new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:60}, children:[new TextRun({ text:'PHASE', font:'Arial', allCaps:true, color:T.ibKeyColor||ACCENT, size:15 })]}),
          new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:30}, children:[new TextRun({ text:phase.toUpperCase(), font:'Arial Black', bold:true, color:ACCENT, size:14 })]})
        ]
      })
    ]})]
  });

  // Yellow divider paragraph
  const divider = new Paragraph({
    spacing:{ before:140, after:140 },
    border:{ bottom:{ style:BorderStyle.SINGLE, size:6, color:ACCENT, space:1 }}
  });

  // ── MACRO TARGETS TABLE ─────────────────────────────────────
  const macroCell = (label, value, accentColor, topColor) => new TableCell({
    width: { size:2520, type:WidthType.DXA },
    shading: shd(T.macroBoxBg),
    borders: { top:{ style:BorderStyle.SINGLE, size:8, color:topColor }, left:border444, bottom:border444, right:border444 },
    margins: margins(140,160,140,160),
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({ alignment:AlignmentType.CENTER, children:[new TextRun({ text:label.toUpperCase(), font:'Arial', allCaps:true, color:T.footerColor, size:15 })]}),
      new Paragraph({ alignment:AlignmentType.CENTER, spacing:{before:40}, children:[
        new TextRun({ text:value+(label.toUpperCase()==='CALORIES'?' kcal':'g'), font:'Arial Black', bold:true, color:accentColor, size:28 })
      ]})
    ]
  });

  const macroTable = new Table({
    width:{ size:W, type:WidthType.DXA },
    columnWidths:[2520,2520,2520,2520],
    rows:[new TableRow({ children:[
      macroCell('CALORIES', cal,   ACCENT,        ACCENT),
      macroCell('PROTEIN',  prot,  T.opt1.header, T.opt1.header),
      macroCell('CARBS',    carbs, T.opt2.header, T.opt2.header),
      macroCell('FATS',     fats,  T.opt3.header, T.opt3.header),
    ]})]
  });

  // ── INBODY TABLE ────────────────────────────────────────────
  const ibLabelCell = (text, w=2200) => new TableCell({
    width:{size:w, type:WidthType.DXA},
    shading:shd(T.ibBoxBg),
    borders:{ top:border444, left:border2A, bottom:mk(3,ACCENT), right:border2A },
    margins:margins(80,140,80,140),
    verticalAlign:VerticalAlign.CENTER,
    children:[new Paragraph({ children:[new TextRun({ text, font:'Arial', bold:true, allCaps:true, color:T.ibKeyColor, size:17 })]})]
  });
  const ibValCell = (text, w=2840) => new TableCell({
    width:{size:w, type:WidthType.DXA},
    shading:shd(T.macroBoxBg),
    borders:{ top:border2A, left:border2A, bottom:border2A, right:border2A },
    margins:margins(90,140,90,140),
    verticalAlign:VerticalAlign.CENTER,
    children:[new Paragraph({ alignment:AlignmentType.CENTER, children:[new TextRun({ text:text||'—', font:'Arial', color:T.ibValColor, size:18 })]})]
  });

  const ibHeaderRow = new TableRow({ children:[
    new TableCell({
      columnSpan:4, width:{size:W, type:WidthType.DXA},
      shading:shd(T.mealTitleBg),
      borders:{ top:borderY8, left:borderYthick, bottom:border444, right:border444 },
      margins:margins(130,200,130,200),
      verticalAlign:VerticalAlign.CENTER,
      children:[new Paragraph({ children:[new TextRun({ text:'📊  INBODY — CLIENT MEASUREMENT DATA', font:'Arial Black', bold:true, allCaps:true, color:ACCENT, size:22 })]})]
    })
  ]});

  const ibTable = new Table({
    width:{size:W, type:WidthType.DXA},
    columnWidths:[2200,2840,2200,2840],
    rows:[
      ibHeaderRow,
      new TableRow({ children:[ ibLabelCell('Weight (kg)'), ibValCell(ibWeight||'—'), ibLabelCell('Body Fat %'), ibValCell(ibBf||'—') ]}),
      new TableRow({ children:[ ibLabelCell('Skeletal Muscle Mass'), ibValCell(ibSmm||'—'), ibLabelCell('Fat Mass (kg)'), ibValCell(ibFm||'—') ]}),
      new TableRow({ children:[ ibLabelCell('BMI'), ibValCell(ibBmi||'—'), ibLabelCell('Basal Metabolic Rate'), ibValCell(ibBmr||'—') ]}),
      new TableRow({ children:[ ibLabelCell('Total Body Water'), ibValCell(ibTbw||'—'), ibLabelCell('Protein (kg)'), ibValCell(ibProt||'—') ]}),
      new TableRow({ children:[ ibLabelCell('Visceral Fat Level'), ibValCell(ibVfl||'—'), ibLabelCell('Fitness Score'), ibValCell(ibScore||'—') ]}),
      new TableRow({ children:[
        new TableCell({
          columnSpan:4, width:{size:W, type:WidthType.DXA},
          shading:shd(T.ibBoxBg),
          borders:{ top:mk(3,ACCENT), left:border444, bottom:border444, right:border444 },
          margins:margins(100,160,100,160),
          children:[new Paragraph({ children:[
            new TextRun({ text:'Date: ', font:'Arial', bold:true, color:ACCENT, size:18 }),
            new TextRun({ text:(ibDate||'—')+'     ', font:'Arial', color:T.ibValColor||'888888', size:18 }),
            new TextRun({ text:'TDEE: ', font:'Arial', bold:true, color:ACCENT, size:18 }),
            new TextRun({ text:(tdee||'—')+'     ', font:'Arial', color:T.ibValColor, size:18 }),
            new TextRun({ text:'Water: ', font:'Arial', bold:true, color:ACCENT, size:18 }),
            new TextRun({ text:water+'L     ', font:'Arial', color:T.ibValColor, size:18 }),
            ...(traintime ? [
              new TextRun({ text:'Training: ', font:'Arial', bold:true, color:ACCENT, size:18 }),
              new TextRun({ text:traintime, font:'Arial', color:T.ibValColor, size:18 })
            ] : [])
          ]})]
        })
      ]})
    ]
  });

  // ── MEAL TABLE BUILDER ──────────────────────────────────────
  const OPT_COLORS = {
    1: { ...T.opt1, borderTop: mk(8, T.opt1.header), b1: mk(1,T.opt1.header), b3: mk(3,T.opt1.header), b4: mk(4,T.opt1.header), bR: mk(6,T.opt1.header) },
    2: { ...T.opt2, borderTop: mk(8, T.opt2.header), b1: mk(1,T.opt2.header), b3: mk(3,T.opt2.header), b4: mk(4,T.opt2.header), bR: mk(6,T.opt2.header) },
    3: { ...T.opt3, borderTop: mk(8, T.opt3.header), b1: mk(1,T.opt3.header), b3: mk(3,T.opt3.header), b4: mk(4,T.opt3.header), bR: mk(6,T.opt3.header) }
  };
  const OPT_LABELS_AR = LANG[window._lang||'ar'].optLabelsExport;
  const L_EX = LANG[window._lang||'ar'];
  // bidirectional only in AR mode — isEN already declared above
  const bidiPara = (children, align) => new Paragraph({
    ...(align ? {alignment:align} : {}),
    bidirectional: !isEN,
    children
  });
  const rtlRun = (text, opts) => new TextRun({
    text, font:'Arial', rightToLeft: !isEN, ...opts
  });

  function buildMealTable(mealId) {
    const meal = mealsData[mealId];
    if(!meal) return null;
    const rows = [];

    // Meal title row
    rows.push(new TableRow({ children:[
      new TableCell({
        columnSpan:3, width:{size:W, type:WidthType.DXA},
        shading:shd(T.mealTitleBg),
        borders:{ top:mk(8,T.mealTitleBorder||ACCENT), left:mk(1,T.mealTitleBorder||ACCENT), bottom:mk(1,T.mealTitleBorder||ACCENT), right:{style:BorderStyle.THICK,size:18,color:T.mealTitleBorder||ACCENT} },
        margins:margins(130,160,130,200),
        verticalAlign:VerticalAlign.CENTER,
        children:[bidiPara([rtlRun(meal.label+' — '+meal.sub+'  '+meal.icon, {bold:true, color:ACCENT, size:26})])]
      })
    ]}));

    // Each option
    [1,2,3].forEach(optN => {
      const c = OPT_COLORS[optN];
      const items = meal.opts[optN] || [];

      // Option label row
      rows.push(new TableRow({ children:[
        new TableCell({
          columnSpan:3, width:{size:W, type:WidthType.DXA},
          shading:shd(c.hdr_bg),
          borders:{ top:c.b4, left:c.b1, bottom:c.b1, right:c.bR },
          margins:margins(90,160,90,200),
          verticalAlign:VerticalAlign.CENTER,
          children:[bidiPara([rtlRun(OPT_LABELS_AR[optN], {bold:true, color:c.header})])]
        })
      ]}));

      // Column headers — 3 columns: food name | grams | spoons
      rows.push(new TableRow({ children:[
        new TableCell({
          width:{size:5980, type:WidthType.DXA},
          shading:shd('141400'),
          borders:{ top:c.b1, left:border2A, bottom:c.b3, right:border2A },
          margins:margins(70,140,70,140),
          verticalAlign:VerticalAlign.CENTER,
          children:[bidiPara([rtlRun(L_EX.exportColFood, {bold:true, color:c.header, size:17})])]
        }),
        new TableCell({
          width:{size:2100, type:WidthType.DXA},
          shading:shd('141400'),
          borders:{ top:c.b1, left:border2A, bottom:c.b3, right:border2A },
          margins:margins(70,140,70,140),
          verticalAlign:VerticalAlign.CENTER,
          children:[bidiPara([rtlRun(L_EX.exportColQty, {bold:true, color:c.header, size:17})], AlignmentType.CENTER)]
        }),
        new TableCell({
          width:{size:2000, type:WidthType.DXA},
          shading:shd('141400'),
          borders:{ top:c.b1, left:border2A, bottom:c.b3, right:border2A },
          margins:margins(70,140,70,140),
          verticalAlign:VerticalAlign.CENTER,
          children:[bidiPara([rtlRun(L_EX.exportColSpoon, {bold:true, color:c.header, size:17})], AlignmentType.CENTER)]
        })
      ]}));

      // Food rows — only include options that have at least one real food item
      const activeItems = items.filter(it => it.food && it.food.trim());
      if (!activeItems.length) {
        // This option is empty — skip its rows entirely but keep label row as placeholder
        rows.push(new TableRow({ children:[
          new TableCell({
            columnSpan:3, width:{size:W, type:WidthType.DXA},
            shading:shd(c.bg1),
            borders:{ top:border2A, left:border2A, bottom:border2A, right:border2A },
            margins:margins(95,140,95,140),
            verticalAlign:VerticalAlign.CENTER,
            children:[bidiPara([rtlRun('—', {color:T.emptyColor||'2A2A2A', size:18})])]
          })
        ]}));
        return;
      }
      const minRows = Math.max(activeItems.length, 3);
      for(let i=0; i<minRows; i++){
        const item = activeItems[i] || {food:'', qty:'', spoon:''};
        const bg = i%2===0 ? c.bg1 : c.bg2;
        rows.push(new TableRow({ children:[
          new TableCell({
            width:{size:5980, type:WidthType.DXA},
            shading:shd(bg),
            borders:{ top:border2A, left:border2A, bottom:border2A, right:border2A },
            margins:margins(95,140,95,140),
            verticalAlign:VerticalAlign.CENTER,
            children:[bidiPara([rtlRun(item.food||'', {color:item.food?(T.foodColor||'DDDDDD'):(T.emptyColor||'3A3A3A'), size:19})])]
          }),
          new TableCell({
            width:{size:2100, type:WidthType.DXA},
            shading:shd(bg),
            borders:{ top:border2A, left:border2A, bottom:border2A, right:border2A },
            margins:margins(95,140,95,140),
            verticalAlign:VerticalAlign.CENTER,
            children:[bidiPara([rtlRun(item.qty||'', {color:item.qty?(T.qtyColor||'BBBBBB'):(T.emptyColor||'3A3A3A'), size:19})], AlignmentType.CENTER)]
          }),
          new TableCell({
            width:{size:2000, type:WidthType.DXA},
            shading:shd(bg),
            borders:{ top:border2A, left:border2A, bottom:border2A, right:border2A },
            margins:margins(95,140,95,140),
            verticalAlign:VerticalAlign.CENTER,
            children:[bidiPara([rtlRun(item.spoon||'', {color:item.spoon?(T.spoonColor||'AAAAAA'):(T.emptyColor||'3A3A3A'), size:19})], AlignmentType.CENTER)]
          })
        ]}));
      }
    });

    return new Table({
      width:{size:W, type:WidthType.DXA},
      columnWidths:[5980, 2100, 2000],
      rows
    });
  }

  // ── TOTAL TABLE ─────────────────────────────────────────────
  const totalTable = new Table({
    width:{size:W, type:WidthType.DXA},
    columnWidths:[W],
    rows:[new TableRow({ children:[
      new TableCell({
        width:{size:W, type:WidthType.DXA},
        shading:shd(T.totalBg),
        borders:{ top:borderY8, left:borderYthick, bottom:border444, right:border444 },
        margins:margins(160,200,160,200),
        children:[
          new Paragraph({ spacing:{after:100}, children:[new TextRun({ text:'TOTAL DAILY INTAKE', font:'Arial Black', bold:true, allCaps:true, color:ACCENT })]}),
          new Paragraph({ children:[
            new TextRun({ text:'Calories: ', font:'Arial', bold:true, color:ACCENT }),
            new TextRun({ text:cal+' kcal     ', font:'Arial', color:T.qtyColor }),
            new TextRun({ text:'Protein: ', font:'Arial', bold:true, color:T.opt1.header||'88FF88' }),
            new TextRun({ text:prot+'g     ', font:'Arial', color:T.qtyColor }),
            new TextRun({ text:'Carbs: ', font:'Arial', bold:true, color:T.opt2.header||'88CCFF' }),
            new TextRun({ text:carbs+'g     ', font:'Arial', color:T.qtyColor }),
            new TextRun({ text:'Fats: ', font:'Arial', bold:true, color:T.opt3.header||'FFAA44' }),
            new TextRun({ text:fats+'g', font:'Arial', color:T.qtyColor }),
          ]})
        ]
      })
    ]})]
  });

  // ── SUPPLEMENT TABLE ─────────────────────────────────────────
  const suppRows = [
    new TableRow({ children:[
      new TableCell({ width:{size:2200,type:WidthType.DXA}, shading:shd(ACCENT), borders:{top:noBorder,left:border2A,bottom:noBorder,right:border2A}, margins:margins(110,150,110,150), verticalAlign:VerticalAlign.CENTER,
        children:[new Paragraph({ children:[new TextRun({ text:'SUPPLEMENT', font:'Arial Black', bold:true, allCaps:true, color:BG, size:19 })]})]}),
      new TableCell({ width:{size:1400,type:WidthType.DXA}, shading:shd(ACCENT), borders:{top:noBorder,left:border2A,bottom:noBorder,right:border2A}, margins:margins(110,150,110,150), verticalAlign:VerticalAlign.CENTER,
        children:[new Paragraph({ children:[new TextRun({ text:'DOSE', font:'Arial Black', bold:true, allCaps:true, color:BG, size:19 })]})]}),
      new TableCell({ width:{size:6480,type:WidthType.DXA}, shading:shd(ACCENT), borders:{top:noBorder,left:border2A,bottom:noBorder,right:border2A}, margins:margins(110,150,110,150), verticalAlign:VerticalAlign.CENTER,
        children:[new Paragraph({ children:[new TextRun({ text:'TIMING / NOTES', font:'Arial Black', bold:true, allCaps:true, color:BG, size:19 })]})]}),
    ]}),
    ...(supps.length > 0 ? supps : [{name:'',dose:'',time:''}]).map((s, i)=>
      new TableRow({ children:[
        new TableCell({ width:{size:2200,type:WidthType.DXA}, shading:shd(i%2===0?T.opt1.bg1:T.opt1.bg2), borders:{top:border2A,left:border2A,bottom:border2A,right:border2A}, margins:margins(100,150,100,150),
          children:[new Paragraph({ children:[new TextRun({ text:s.name||'', font:'Arial', color:ACCENT, size:18 })]})]}),
        new TableCell({ width:{size:1400,type:WidthType.DXA}, shading:shd(i%2===0?T.macroBoxBg:T.ibBoxBg), borders:{top:border2A,left:border2A,bottom:border2A,right:border2A}, margins:margins(100,150,100,150),
          children:[new Paragraph({ children:[new TextRun({ text:s.dose||'', font:'Arial', color:T.qtyColor, size:18 })]})]}),
        new TableCell({ width:{size:6480,type:WidthType.DXA}, shading:shd(i%2===0?T.ibBoxBg:BG), borders:{top:border2A,left:border2A,bottom:border2A,right:border2A}, margins:margins(100,150,100,150),
          children:[new Paragraph({ children:[new TextRun({ text:s.time||'', font:'Arial', color:T.ibValColor, size:18 })]})]}),
      ]})
    )
  ];
  const suppTable = new Table({ width:{size:W,type:WidthType.DXA}, columnWidths:[2200,1400,6480], rows:suppRows });

  // ── COACH NOTES TABLE ───────────────────────────────────────
  const notesTable = new Table({
    width:{size:W,type:WidthType.DXA},
    columnWidths:[W],
    rows:[new TableRow({ children:[
      new TableCell({
        width:{size:W,type:WidthType.DXA},
        shading:shd(T.ibBoxBg),
        borders:{ top:border444, left:borderYthick, bottom:border444, right:border444 },
        margins:margins(160,200,160,200),
        children:[
          new Paragraph({ spacing:{after:80}, children:[new TextRun({ text:'COACH NOTES', font:'Arial Black', bold:true, allCaps:true, color:T.headerNameColor||ACCENT, size:18 })]}),
          ...(notes ? notes.split('\n').map(line=> new Paragraph({ spacing:{after:60}, children:[new TextRun({ text:line, font:'Arial', color:T.foodColor, size:19 })]}))
            : [1,2,3].map(()=> new Paragraph({ spacing:{after:60}, children:[new TextRun({ text:' ', font:'Arial', color:T.footerColor||'333333', size:19 })]})))
        ]
      })
    ]})]
  });

  // ── Spacer paragraph ────────────────────────────────────────
  const spacer = () => new Paragraph({ spacing:{before:180} });

  // ── TIER LABELS & COLORS for headings ──
  const tierLabels = isENexport
    ? { H:'HIGH-CARB DAY', M:'MEDIUM-CARB DAY', L:'LOW-CARB DAY' }
    : { H:'يوم كارب عالي', M:'يوم كارب متوسط', L:'يوم كارب منخفض' };
  const tierEmojis = { H:'🔥', M:'⚡', L:'❄️' };
  const tierColors = { H:'4ade80', M:'00CFFF', L:'FF8C42' };

  // ── Build tier targets table (if cycling is configured) ──────
  const buildTierTargetsTable = () => {
    if (!cyclingConfigured) return null;
    const get = id => parseFloat(document.getElementById(id)?.value) || 0;
    const header = new TableRow({
      tableHeader: true,
      children: ['','Cal','Prot','Carbs','Fats'].map((txt, i) => new TableCell({
        shading: shd(T.tableHead || '1a1a1a'),
        margins: margins(80,120,80,120),
        children: [new Paragraph({ alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: txt, font:'Arial', bold:true, size:18, color: ACCENT })]
        })]
      }))
    });
    const rows = [header];
    ['H','M','L'].forEach(tier => {
      const cal = get(`cc-${tier}-cal`), prot = get(`cc-${tier}-prot`);
      const c = get(`cc-${tier}-carbs`), f = get(`cc-${tier}-fats`);
      if (!cal && !prot && !c && !f) return;
      const label = `${tierEmojis[tier]} ${tierLabels[tier]}`;
      const cells = [label, cal||'—', prot ? prot+'g' : '—', c ? c+'g' : '—', f ? f+'g' : '—'];
      rows.push(new TableRow({
        children: cells.map((txt, i) => new TableCell({
          margins: margins(60,120,60,120),
          shading: shd(i === 0 ? (T.cardBg || '0f0f0f') : (T.tableCell || '141414')),
          children: [new Paragraph({ alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: String(txt), font:'Arial', bold: i === 0, size:18,
              color: i === 0 ? tierColors[tier] : (T.cellText || 'e0e0e0') })]
          })]
        }))
      }));
    });
    if (rows.length <= 1) return null;
    return new Table({
      width: { size: W, type: WidthType.DXA },
      rows: rows,
      borders: { top:border2A, bottom:border2A, left:border2A, right:border2A,
                 insideHorizontal:border2A, insideVertical:border2A }
    });
  };

  // ── Build weekly schedule block ──────────────────────────────
  const buildWeekSchedule = () => {
    if (!cyclingConfigured || !Array.isArray(window._ccWeek)) return null;
    const dayNamesEN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const dayNamesAR = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
    const dayNames = isENexport ? dayNamesEN : dayNamesAR;
    // Precomputed dark tints of each tier color for use as cell background.
    // DOCX shading colors must be exactly 6 hex chars (RRGGBB) — no alpha.
    const tierCellBg = { H:'14281A', M:'0A1E26', L:'28160A' };
    const headerCells = [];
    const tierCells = [];
    window._ccWeek.forEach((tier, i) => {
      headerCells.push(new TableCell({
        margins: margins(60,60,60,60),
        shading: shd(T.tableHead || '1a1a1a'),
        children: [new Paragraph({ alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: dayNames[i], font:'Arial', bold:true, size:16, color:'808080' })]
        })]
      }));
      tierCells.push(new TableCell({
        margins: margins(100,60,100,60),
        shading: shd(tierCellBg[tier] || '141414'),
        children: [new Paragraph({ alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: `${tierEmojis[tier]} `, font:'Arial', size:20 }),
            new TextRun({ text: tier, font:'Arial', bold:true, size:24, color: tierColors[tier] })
          ]
        })]
      }));
    });
    return new Table({
      width: { size: W, type: WidthType.DXA },
      rows: [
        new TableRow({ children: headerCells }),
        new TableRow({ children: tierCells })
      ],
      borders: { top:border2A, bottom:border2A, left:border2A, right:border2A,
                 insideHorizontal:border2A, insideVertical:border2A }
    });
  };

  // ── Build meal blocks for a specific tier ─────────────────────
  // Repopulates `mealsData` with that tier's scaled items, then uses buildMealTable
  // (which reads `mealsData`) to produce the tables.
  const buildMealBlocksForTier = (tier) => {
    // Re-populate mealsData for this tier
    const tierData = buildMealsDataForTier(tier);
    // Copy into mealsData so buildMealTable can read it
    Object.keys(mealsData).forEach(k => { delete mealsData[k]; });
    Object.keys(tierData).forEach(k => { mealsData[k] = tierData[k]; });

    const blocks = [];
    if (window.MEALS_DEF) {
      MEALS_DEF.forEach(m => {
        let hasFoodAnyOpt = false;
        const mData = mealsData[m.id];
        if (mData) {
          [1,2,3].forEach(n => {
            const items = mData.opts[n] || [];
            if (items.some(it => it.food && it.food.trim())) hasFoodAnyOpt = true;
          });
        }
        if (!hasFoodAnyOpt) return;
        const t = buildMealTable(m.id);
        if (t) { blocks.push(spacer()); blocks.push(t); }
      });
    }
    return blocks;
  };

  // ── Build the full meal plan section(s): either single (no cycling)
  //     or multiple tier sections with a header label before each. ──
  const mealPlanSections = [];
  if (exportTiers.length === 1) {
    // Single tier path — unchanged look
    mealPlanSections.push(...buildMealBlocksForTier(exportTiers[0]));
  } else {
    // Multi-tier path — one labeled section per tier
    exportTiers.forEach((tier, idx) => {
      if (idx > 0) mealPlanSections.push(spacer());
      // Tier heading paragraph
      mealPlanSections.push(new Paragraph({
        spacing: { before: 240, after: 80 },
        alignment: AlignmentType.LEFT,
        children: [
          new TextRun({ text: `${tierEmojis[tier]}  ${tierLabels[tier]}  `,
            font:'Arial', bold:true, size:28, color: tierColors[tier] }),
          new TextRun({ text: '━'.repeat(isENexport ? 30 : 22),
            font:'Arial', size:16, color: tierColors[tier] })
        ]
      }));
      mealPlanSections.push(...buildMealBlocksForTier(tier));
    });
  }

  // Keep `mealBlocks` name alive for any later references (set to medium content)
  const mealBlocks = mealPlanSections;
  // Restore mealsData to Medium for any subsequent totals computations
  const mediumData = buildMealsDataForTier('M');
  Object.keys(mealsData).forEach(k => { delete mealsData[k]; });
  Object.keys(mediumData).forEach(k => { mealsData[k] = mediumData[k]; });

  // ── Assemble document ────────────────────────────────────────
  const doc = new Document({
    background: { color: BG },
    sections:[{
      properties:{
        page:{
          size:{ width:12240, height:15840 },
          margin:{ top:1080, right:1080, bottom:1080, left:1080 }
        }
      },
      children: (() => {
        const kids = [
          headerTable,
          divider,
          sectionLabel('DAILY TARGETS  ——————————————————————————————————'),
          macroTable
        ];
        // Insert carb cycling blocks if configured
        const tierTable = (typeof buildTierTargetsTable === 'function') ? buildTierTargetsTable() : null;
        const weekTable = (typeof buildWeekSchedule === 'function') ? buildWeekSchedule() : null;
        if (tierTable) {
          kids.push(spacer());
          kids.push(sectionLabel((isENexport ? 'CARB CYCLING TIERS' : 'مستويات تدوير الكارب') + '  ——————————————————————————'));
          kids.push(tierTable);
        }
        if (weekTable) {
          kids.push(spacer());
          kids.push(sectionLabel((isENexport ? 'WEEKLY SCHEDULE' : 'الجدول الأسبوعي') + '  ——————————————————————————————'));
          kids.push(weekTable);
        }
        kids.push(spacer());
        kids.push(sectionLabel('INBODY DATA  ————————————————————————————————————'));
        kids.push(ibTable);
        kids.push(spacer());
        kids.push(sectionLabel('MEAL PLAN  ——————————————————————————————————————'));
        kids.push(...mealBlocks);
        kids.push(spacer());
        kids.push(sectionLabel('DAILY GRAND TOTAL  ————————————————————————————————'));
        kids.push(totalTable);
        kids.push(spacer());
        kids.push(sectionLabel('SUPPLEMENT STACK  —————————————————————————————————'));
        kids.push(suppTable);
        kids.push(spacer());
        kids.push(notesTable);
        kids.push(new Paragraph({ spacing:{before:160}, alignment:AlignmentType.CENTER, children:[
          new TextRun({ text:'OLYMPIC GYM  |  Performance Nutrition', font:'Arial', allCaps:true, color:T.footerColor||'333333', size:16 })
        ]}));
        return kids;
      })()
    }]
  });

  // ── Generate and download ─────────────────────────────────────
  document.getElementById('export-loading').classList.add('show');
  try {
    const blob = await Packer.toBlob(doc);
    const filename = 'NutritionPlan_'+(name||'Client').replace(/\s+/g,'_')+'.docx';
    // Use iOS-aware download helper (falls back to opening in new tab on iOS Safari)
    const ok = window.downloadBlob(blob, filename);
    if (ok && !window.__iosCompat.isIOSSafari) {
      toast('✅ Plan exported as .docx!', 'success');
    } else if (ok) {
      // iOS Safari path — helper already showed the "Share → Save to Files" toast
      // Give a follow-up success after a moment
      setTimeout(() => toast('✅ Word file ready — use Share sheet', 'success'), 3200);
    }
  } catch(err) {
    console.error('Export error:', err);
    toast('Export failed: '+err.message, 'error');
  } finally {
    document.getElementById('export-loading').classList.remove('show');
  }
}

// Init on load
document.addEventListener('DOMContentLoaded',()=>{
  macroLockInit();
  buildMeals();
  addSuppRow();
  syncPreview();
  updateGrandTotal();
  renderInBodyChart();
  buildThemeGrid();
  // Carb cycling weekly grid + summary
  if (typeof ccRenderWeek === 'function') ccRenderWeek();
  if (typeof ccSync === 'function') ccSync();
});

// ═══════════════════════════════════════════════════════════
// 🎨  EXPORT THEME SYSTEM
// ═══════════════════════════════════════════════════════════
window._exportTheme = 'neon'; // default

// ═══════════════════════════════════════════════════════════
// 🚀  COACH UX HELPERS
// ═══════════════════════════════════════════════════════════

// Quick-set a field value and trigger sync
function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) { el.value = val; el.dispatchEvent(new Event('input')); }
}

// Append text to coach notes
function appendNote(text) {
  const el = document.getElementById('coach-notes');
  if (!el) return;
  el.value = (el.value ? el.value + '\n' : '') + text;
  el.dispatchEvent(new Event('input'));
  el.scrollTop = el.scrollHeight;
}

// Toggle note templates panel
function showNoteTemplates() {
  const panel = document.getElementById('note-templates');
  if (!panel) return;
  panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
}

// Duplicate a food row (copy all values to a new row appended after it)
function duplicateFoodRow(row) {
  if (!row) return;
  const panel = row.closest('.opt-panel');
  const mealId = panel?.id?.replace(/^opt-/,'')?.replace(/-\d+$/,'');
  const optN   = parseInt(panel?.id?.split('-')?.pop());
  if (!mealId || !optN) return;

  addFoodRow(mealId, optN);
  const container = document.getElementById('rows-' + mealId + '-' + optN);
  const rows = container.querySelectorAll('.food-row');
  const newRow = rows[rows.length - 1];
  if (!newRow) return;

  // Copy all field values and dataset
  const srcSearch = row.querySelector('.food-search');
  const srcQty    = row.querySelector('.food-qty-input');
  const srcTbsp   = row.querySelector('.food-tbsp-input');
  const dstSearch = newRow.querySelector('.food-search');
  const dstQty    = newRow.querySelector('.food-qty-input');
  const dstTbsp   = newRow.querySelector('.food-tbsp-input');

  if (dstSearch) dstSearch.value = srcSearch?.value || '';
  if (dstQty)    dstQty.value    = srcQty?.value    || '';
  if (dstTbsp)   dstTbsp.value   = srcTbsp?.value   || '';

  // Copy dataset
  ['foodCal','foodProt','foodCarb','foodFat','foodName','foodNameEn','foodCat','foodCatEn','foodUnit','foodUnitEn','foodUnitG','foodSliceG','foodLiq','foodLiqBase'].forEach(k => {
    newRow.dataset[k] = row.dataset[k] || '';
  });

  // Copy tbsp wrap visibility
  const srcWrap = row.querySelector('.food-tbsp-wrap');
  const dstWrap = newRow.querySelector('.food-tbsp-wrap');
  if (srcWrap && dstWrap) dstWrap.style.visibility = srcWrap.style.visibility;

  // Copy qty label AND secondary (slice/spoon) label
  const srcLbl = row.querySelector('.food-qty-label');
  const dstLbl = newRow.querySelector('.food-qty-label');
  if (srcLbl && dstLbl) dstLbl.textContent = srcLbl.textContent;
  if (newRow.dataset.foodLiq === '1') ogLiqRenderLabel(newRow);
  const srcTbspLbl = row.querySelector('.food-tbsp-wrap .food-qty-label');
  const dstTbspLbl = newRow.querySelector('.food-tbsp-wrap .food-qty-label');
  if (srcTbspLbl && dstTbspLbl) dstTbspLbl.textContent = srcTbspLbl.textContent;

  updateRowMacros(newRow);
  recalcMealTotals(mealId, optN);
  toast('Row duplicated', 'info');
}

// ── Clear all food rows from one option ─────────────────────
function clearOpt(mealId, optN) {
  const container = document.getElementById('rows-' + mealId + '-' + optN);
  if (!container) return;
  const filled = [...container.querySelectorAll('.food-row')].filter(r => r.querySelector('.food-search')?.value?.trim());
  if (!filled.length) { toast('Option already empty', 'info'); return; }
  container.innerHTML = '';
  for (let i = 0; i < 3; i++) addFoodRow(mealId, optN);
  recalcMealTotals(mealId, optN);
  updateGrandTotal();
  syncPreview();
  toast('Option cleared', 'info');
}

// ── Copy entire meal to another meal ─────────────────────────
function showCopyMealMenu(fromMealId, btn) {
  document.querySelectorAll('.copy-meal-menu').forEach(m => m.remove());
  if (!window.MEALS_DEF) return;
  const menu = document.createElement('div');
  menu.className = 'copy-meal-menu';
  menu.style.cssText = 'position:fixed;background:#111;border:1px solid rgba(245,255,0,0.25);z-index:2000;min-width:190px;padding:4px 0;box-shadow:0 8px 28px rgba(0,0,0,0.85);';
  menu.innerHTML = `<div style="font-size:9px;color:#444;letter-spacing:2px;padding:6px 12px 4px;text-transform:uppercase;">Copy this meal to →</div>` +
    MEALS_DEF.filter(m => m.id !== fromMealId).map(m =>
      `<div onclick="copyMealTo('${fromMealId}','${m.id}');this.closest('.copy-meal-menu').remove()"
        style="padding:8px 14px;font-family:'Barlow Condensed',sans-serif;font-size:13px;color:var(--muted);cursor:pointer;display:flex;align-items:center;gap:8px;"
        onmouseover="this.style.background='rgba(245,255,0,0.07)';this.style.color='var(--y)'"
        onmouseout="this.style.background='';this.style.color='var(--muted)'">
        <span>${m.icon}</span><span>${getMealName(m.id)}</span>
      </div>`
    ).join('');
  const r = btn.getBoundingClientRect();
  menu.style.top  = Math.min(r.bottom + 4, window.innerHeight - 220) + 'px';
  menu.style.left = Math.max(r.left - 140, 8) + 'px';
  document.body.appendChild(menu);
  setTimeout(() => {
    const close = e => { if (!menu.contains(e.target)) { menu.remove(); document.removeEventListener('click', close); } };
    document.addEventListener('click', close);
  }, 60);
}

function copyMealTo(fromId, toId) {
  if (!window.OPTS_DEF) return;
  let anyCopied = false;
  OPTS_DEF.forEach(o => {
    const fromRows = [...document.querySelectorAll('#rows-'+fromId+'-'+o.n+' .food-row')];
    const toContainer = document.getElementById('rows-'+toId+'-'+o.n);
    if (!toContainer) return;
    if (!fromRows.some(r => r.querySelector('.food-search')?.value?.trim())) return;
    toContainer.innerHTML = '';
    fromRows.forEach(row => {
      addFoodRow(toId, o.n);
      const rows2  = toContainer.querySelectorAll('.food-row');
      const newRow = rows2[rows2.length - 1];
      if (!newRow) return;
      ['foodCal','foodProt','foodCarb','foodFat','foodName','foodNameEn','foodCat','foodCatEn','foodUnit','foodUnitEn','foodUnitG','foodSliceG','foodLiq','foodLiqBase']
        .forEach(k => { newRow.dataset[k] = row.dataset[k] || ''; });
      const si = newRow.querySelector('.food-search');
      const qi = newRow.querySelector('.food-qty-input');
      const ti = newRow.querySelector('.food-tbsp-input');
      const tw = newRow.querySelector('.food-tbsp-wrap');
      const ql = newRow.querySelector('.food-qty-label');
      const tl = newRow.querySelector('.food-tbsp-wrap .food-qty-label');
      if (si) si.value = row.querySelector('.food-search')?.value || '';
      if (qi) qi.value = row.querySelector('.food-qty-input')?.value || '';
      if (ti) ti.value = row.querySelector('.food-tbsp-input')?.value || '';
      // Mirror qty/secondary labels from source
      const srcQl = row.querySelector('.food-qty-label');
      const srcTl = row.querySelector('.food-tbsp-wrap .food-qty-label');
      if (ql && srcQl) ql.textContent = srcQl.textContent;
      if (tl && srcTl) tl.textContent = srcTl.textContent;
      if (row.dataset.foodUnit && row.dataset.foodUnitG) {
        // piece-based: hide secondary
        if (tw) tw.style.visibility = 'hidden';
      } else if (row.dataset.foodSliceG) {
        // slice-based: show secondary
        if (tw) tw.style.visibility = 'visible';
      }
      if (newRow.dataset.foodLiq === '1') { ogLiqRenderLabel(newRow); if (tw) tw.style.visibility = 'hidden'; }
      updateRowMacros(newRow);
      anyCopied = true;
    });
    recalcMealTotals(toId, o.n);
  });
  if (!anyCopied) { toast('No foods to copy', 'info'); return; }
  updateGrandTotal(); syncPreview();
  const dest = document.getElementById('block-'+toId);
  if (dest) { dest.classList.add('open'); setTimeout(() => dest.scrollIntoView({behavior:'smooth',block:'center'}), 100); }
  toast(`✅ Copied to ${getMealName(toId)}`, 'success');
}

// Copy all foods from one option to the next option (1→2, 2→3, 3→1)
function copyOptToNext(mealId, fromOptN) {
  const toOptN = (fromOptN % 3) + 1; // 1→2, 2→3, 3→1
  const fromContainer = document.getElementById('rows-' + mealId + '-' + fromOptN);
  const toContainer   = document.getElementById('rows-' + mealId + '-' + toOptN);
  if (!fromContainer || !toContainer) return;

  const srcRows = fromContainer.querySelectorAll('.food-row');
  if (!srcRows.length) { toast('No foods to copy', 'info'); return; }

  // Clear target first
  toContainer.innerHTML = '';

  srcRows.forEach(srcRow => {
    const srcSearch = srcRow.querySelector('.food-search');
    if (!srcSearch?.value?.trim()) return;

    addFoodRow(mealId, toOptN);
    const newRows = toContainer.querySelectorAll('.food-row');
    const newRow  = newRows[newRows.length - 1];
    if (!newRow) return;

    const dstSearch = newRow.querySelector('.food-search');
    const dstQty    = newRow.querySelector('.food-qty-input');
    const dstTbsp   = newRow.querySelector('.food-tbsp-input');
    if (dstSearch) dstSearch.value = srcSearch.value;
    if (dstQty)    dstQty.value    = srcRow.querySelector('.food-qty-input')?.value || '';
    if (dstTbsp)   dstTbsp.value   = srcRow.querySelector('.food-tbsp-input')?.value || '';

    ['foodCal','foodProt','foodCarb','foodFat','foodName','foodNameEn','foodCat','foodCatEn','foodUnit','foodUnitG','foodLiq','foodLiqBase'].forEach(k => {
      newRow.dataset[k] = srcRow.dataset[k] || '';
    });

    const srcWrap = srcRow.querySelector('.food-tbsp-wrap');
    const dstWrap = newRow.querySelector('.food-tbsp-wrap');
    if (srcWrap && dstWrap) dstWrap.style.visibility = srcWrap.style.visibility;

    const srcLbl = srcRow.querySelector('.food-qty-label');
    const dstLbl = newRow.querySelector('.food-qty-label');
    if (srcLbl && dstLbl) dstLbl.textContent = srcLbl.textContent;
    if (newRow.dataset.foodLiq === '1') { ogLiqRenderLabel(newRow); const dw = newRow.querySelector('.food-tbsp-wrap'); if (dw) dw.style.visibility = 'hidden'; }

    updateRowMacros(newRow);
  });

  recalcMealTotals(mealId, toOptN);

  // Switch tab to show the destination option
  const block = document.getElementById('block-' + mealId);
  if (block) {
    block.querySelectorAll('.opt-tab').forEach(t => t.classList.remove('active'));
    block.querySelectorAll('.opt-panel').forEach(p => p.classList.remove('active'));
    const tab = block.querySelector(`.opt-tab[data-opt="${toOptN}"]`);
    const pan = document.getElementById('opt-' + mealId + '-' + toOptN);
    if (tab) tab.classList.add('active');
    if (pan) pan.classList.add('active');
  }

  const L = LANG[window._lang || 'ar'];
  toast(`✅ Copied to ${L?.opts?.[toOptN-1] || 'Option ' + toOptN}`, 'success');
  updateGrandTotal();
  syncPreview();
}


const EXPORT_THEMES = {
  neon: {
    id: 'neon',
    name: '⭐ Coach Loai',
    desc: 'Yellow on black — Olympic Gym signature',
    preview: ['0A0A0A','F5FF00','141400','111100'],
    // Document
    docBg:       '0A0A0A',
    pageBg:      '0A0A0A',
    // Header
    headerNameColor:  'F5FF00',
    headerSubColor:   'AAAAAA',
    headerGoalColor:  'F5FF00',
    headerBg:         '0A0A0A',
    dividerColor:     'F5FF00',
    // Section labels
    sectionColor: 'F5FF00',
    // InBody box
    ibBoxBg:     '111100',
    ibKeyColor:  'F5FF00',
    ibValColor:  '888888',
    // Macro box
    macroBoxBg:  '111100',
    // Meal title
    mealTitleBg: '131300',
    mealTitleColor: 'F5FF00',
    mealTitleBorder: 'F5FF00',
    // Options
    opt1: { header:'F5FF00', bg1:'111100', bg2:'0C0C00', hdr_bg:'161600',
      b4:{style:'single',size:4,color:'F5FF00'}, bR:{style:'single',size:6,color:'F5FF00'},
      b1:{style:'single',size:1,color:'F5FF00'}, b3:{style:'single',size:3,color:'F5FF00'},
      borderTop:{style:'single',size:8,color:'F5FF00'} },
    opt2: { header:'00CFFF', bg1:'001218', bg2:'000D12', hdr_bg:'001A22',
      b4:{style:'single',size:4,color:'00CFFF'}, bR:{style:'single',size:6,color:'00CFFF'},
      b1:{style:'single',size:1,color:'00CFFF'}, b3:{style:'single',size:3,color:'00CFFF'},
      borderTop:{style:'single',size:8,color:'00CFFF'} },
    opt3: { header:'FF8C42', bg1:'180B00', bg2:'120800', hdr_bg:'1F0E00',
      b4:{style:'single',size:4,color:'FF8C42'}, bR:{style:'single',size:6,color:'FF8C42'},
      b1:{style:'single',size:1,color:'FF8C42'}, b3:{style:'single',size:3,color:'FF8C42'},
      borderTop:{style:'single',size:8,color:'FF8C42'} },
    foodColor:   'DDDDDD',
    qtyColor:    'BBBBBB',
    spoonColor:  'AAAAAA',
    emptyColor:  '2A2A2A',
    totalBg:     '111100',
    totalColor:  'F5FF00',
    footerColor: '333333',
    rowSep:      '2A2A2A',
  },

  // ══════════════════════════════════════════════════════════════
  // ⭐ COACH LOAI SIGNATURE COLLECTION — same dark pattern, different primaries
  // ══════════════════════════════════════════════════════════════

  electric: {
    id: 'electric',
    name: '⭐ Electric Lime',
    desc: 'Lime + cyan + pink on black — high-voltage energy',
    preview: ['0A0A0A','CDFF00','0E1800','0A1100'],
    docBg: '0A0A0A', pageBg: '0A0A0A',
    headerNameColor: 'CDFF00', headerSubColor: 'AAAAAA', headerGoalColor: 'CDFF00',
    headerBg: '0A0A0A', dividerColor: 'CDFF00',
    sectionColor: 'CDFF00',
    ibBoxBg: '0E1800', ibKeyColor: 'CDFF00', ibValColor: '888888',
    macroBoxBg: '0E1800',
    mealTitleBg: '0A1100', mealTitleColor: 'CDFF00', mealTitleBorder: 'CDFF00',
    opt1: { header:'CDFF00', bg1:'0E1800', bg2:'0A1100', hdr_bg:'142200',
      b4:{style:'single',size:4,color:'CDFF00'}, bR:{style:'single',size:6,color:'CDFF00'},
      b1:{style:'single',size:1,color:'CDFF00'}, b3:{style:'single',size:3,color:'CDFF00'},
      borderTop:{style:'single',size:8,color:'CDFF00'} },
    opt2: { header:'00CFFF', bg1:'001218', bg2:'000D12', hdr_bg:'001A22',
      b4:{style:'single',size:4,color:'00CFFF'}, bR:{style:'single',size:6,color:'00CFFF'},
      b1:{style:'single',size:1,color:'00CFFF'}, b3:{style:'single',size:3,color:'00CFFF'},
      borderTop:{style:'single',size:8,color:'00CFFF'} },
    opt3: { header:'FF3FB5', bg1:'18001A', bg2:'120014', hdr_bg:'1F0022',
      b4:{style:'single',size:4,color:'FF3FB5'}, bR:{style:'single',size:6,color:'FF3FB5'},
      b1:{style:'single',size:1,color:'FF3FB5'}, b3:{style:'single',size:3,color:'FF3FB5'},
      borderTop:{style:'single',size:8,color:'FF3FB5'} },
    foodColor:'DDDDDD', qtyColor:'BBBBBB', spoonColor:'AAAAAA',
    emptyColor:'2A2A2A', totalBg:'0E1800', totalColor:'CDFF00',
    footerColor:'333333', rowSep:'2A2A2A',
  },

  inferno: {
    id: 'inferno',
    name: '⭐ Inferno Gold',
    desc: 'Gold + red + bronze on black — aggressive luxury',
    preview: ['0A0A0A','FFB800','1A1000','140B00'],
    docBg: '0A0A0A', pageBg: '0A0A0A',
    headerNameColor: 'FFB800', headerSubColor: 'AAAAAA', headerGoalColor: 'FFB800',
    headerBg: '0A0A0A', dividerColor: 'FFB800',
    sectionColor: 'FFB800',
    ibBoxBg: '1A1000', ibKeyColor: 'FFB800', ibValColor: '888888',
    macroBoxBg: '1A1000',
    mealTitleBg: '140B00', mealTitleColor: 'FFB800', mealTitleBorder: 'FFB800',
    opt1: { header:'FFB800', bg1:'1A1000', bg2:'140B00', hdr_bg:'201400',
      b4:{style:'single',size:4,color:'FFB800'}, bR:{style:'single',size:6,color:'FFB800'},
      b1:{style:'single',size:1,color:'FFB800'}, b3:{style:'single',size:3,color:'FFB800'},
      borderTop:{style:'single',size:8,color:'FFB800'} },
    opt2: { header:'FF3333', bg1:'1A0000', bg2:'140000', hdr_bg:'200404',
      b4:{style:'single',size:4,color:'FF3333'}, bR:{style:'single',size:6,color:'FF3333'},
      b1:{style:'single',size:1,color:'FF3333'}, b3:{style:'single',size:3,color:'FF3333'},
      borderTop:{style:'single',size:8,color:'FF3333'} },
    opt3: { header:'CD7F32', bg1:'180E04', bg2:'120A03', hdr_bg:'1E1105',
      b4:{style:'single',size:4,color:'CD7F32'}, bR:{style:'single',size:6,color:'CD7F32'},
      b1:{style:'single',size:1,color:'CD7F32'}, b3:{style:'single',size:3,color:'CD7F32'},
      borderTop:{style:'single',size:8,color:'CD7F32'} },
    foodColor:'DDDDDD', qtyColor:'BBBBBB', spoonColor:'AAAAAA',
    emptyColor:'2A2A2A', totalBg:'1A1000', totalColor:'FFB800',
    footerColor:'333333', rowSep:'2A2A2A',
  },

  arctic: {
    id: 'arctic',
    name: '⭐ Arctic Neon',
    desc: 'Electric blue + white + cyan on black — cool clinical',
    preview: ['0A0A0A','3B82F6','0B1020','080D18'],
    docBg: '0A0A0A', pageBg: '0A0A0A',
    headerNameColor: '3B82F6', headerSubColor: 'AAAAAA', headerGoalColor: '3B82F6',
    headerBg: '0A0A0A', dividerColor: '3B82F6',
    sectionColor: '3B82F6',
    ibBoxBg: '0B1020', ibKeyColor: '3B82F6', ibValColor: '888888',
    macroBoxBg: '0B1020',
    mealTitleBg: '080D18', mealTitleColor: '3B82F6', mealTitleBorder: '3B82F6',
    opt1: { header:'3B82F6', bg1:'0B1020', bg2:'080D18', hdr_bg:'0E1428',
      b4:{style:'single',size:4,color:'3B82F6'}, bR:{style:'single',size:6,color:'3B82F6'},
      b1:{style:'single',size:1,color:'3B82F6'}, b3:{style:'single',size:3,color:'3B82F6'},
      borderTop:{style:'single',size:8,color:'3B82F6'} },
    opt2: { header:'FFFFFF', bg1:'141414', bg2:'101010', hdr_bg:'1A1A1A',
      b4:{style:'single',size:4,color:'FFFFFF'}, bR:{style:'single',size:6,color:'FFFFFF'},
      b1:{style:'single',size:1,color:'FFFFFF'}, b3:{style:'single',size:3,color:'FFFFFF'},
      borderTop:{style:'single',size:8,color:'FFFFFF'} },
    opt3: { header:'22D3EE', bg1:'001218', bg2:'000D12', hdr_bg:'001A22',
      b4:{style:'single',size:4,color:'22D3EE'}, bR:{style:'single',size:6,color:'22D3EE'},
      b1:{style:'single',size:1,color:'22D3EE'}, b3:{style:'single',size:3,color:'22D3EE'},
      borderTop:{style:'single',size:8,color:'22D3EE'} },
    foodColor:'DDDDDD', qtyColor:'BBBBBB', spoonColor:'AAAAAA',
    emptyColor:'2A2A2A', totalBg:'0B1020', totalColor:'3B82F6',
    footerColor:'333333', rowSep:'2A2A2A',
  },

  venom: {
    id: 'venom',
    name: '⭐ Venom Green',
    desc: 'Toxic green + yellow + cyan on black — hardcore',
    preview: ['0A0A0A','39FF14','0B1A0B','081408'],
    docBg: '0A0A0A', pageBg: '0A0A0A',
    headerNameColor: '39FF14', headerSubColor: 'AAAAAA', headerGoalColor: '39FF14',
    headerBg: '0A0A0A', dividerColor: '39FF14',
    sectionColor: '39FF14',
    ibBoxBg: '0B1A0B', ibKeyColor: '39FF14', ibValColor: '888888',
    macroBoxBg: '0B1A0B',
    mealTitleBg: '081408', mealTitleColor: '39FF14', mealTitleBorder: '39FF14',
    opt1: { header:'39FF14', bg1:'0B1A0B', bg2:'081408', hdr_bg:'0E2210',
      b4:{style:'single',size:4,color:'39FF14'}, bR:{style:'single',size:6,color:'39FF14'},
      b1:{style:'single',size:1,color:'39FF14'}, b3:{style:'single',size:3,color:'39FF14'},
      borderTop:{style:'single',size:8,color:'39FF14'} },
    opt2: { header:'F5FF00', bg1:'111100', bg2:'0C0C00', hdr_bg:'161600',
      b4:{style:'single',size:4,color:'F5FF00'}, bR:{style:'single',size:6,color:'F5FF00'},
      b1:{style:'single',size:1,color:'F5FF00'}, b3:{style:'single',size:3,color:'F5FF00'},
      borderTop:{style:'single',size:8,color:'F5FF00'} },
    opt3: { header:'00CFFF', bg1:'001218', bg2:'000D12', hdr_bg:'001A22',
      b4:{style:'single',size:4,color:'00CFFF'}, bR:{style:'single',size:6,color:'00CFFF'},
      b1:{style:'single',size:1,color:'00CFFF'}, b3:{style:'single',size:3,color:'00CFFF'},
      borderTop:{style:'single',size:8,color:'00CFFF'} },
    foodColor:'DDDDDD', qtyColor:'BBBBBB', spoonColor:'AAAAAA',
    emptyColor:'2A2A2A', totalBg:'0B1A0B', totalColor:'39FF14',
    footerColor:'333333', rowSep:'2A2A2A',
  },

  sunrise: {
    id: 'sunrise',
    name: '⭐ Sunrise Gold',
    desc: 'Amber + cyan + red on black — warm premium',
    preview: ['0A0A0A','FFA500','1A1300','140E00'],
    docBg: '0A0A0A', pageBg: '0A0A0A',
    headerNameColor: 'FFA500', headerSubColor: 'AAAAAA', headerGoalColor: 'FFA500',
    headerBg: '0A0A0A', dividerColor: 'FFA500',
    sectionColor: 'FFA500',
    ibBoxBg: '1A1300', ibKeyColor: 'FFA500', ibValColor: '888888',
    macroBoxBg: '1A1300',
    mealTitleBg: '140E00', mealTitleColor: 'FFA500', mealTitleBorder: 'FFA500',
    opt1: { header:'FFA500', bg1:'1A1300', bg2:'140E00', hdr_bg:'201700',
      b4:{style:'single',size:4,color:'FFA500'}, bR:{style:'single',size:6,color:'FFA500'},
      b1:{style:'single',size:1,color:'FFA500'}, b3:{style:'single',size:3,color:'FFA500'},
      borderTop:{style:'single',size:8,color:'FFA500'} },
    opt2: { header:'00CFFF', bg1:'001218', bg2:'000D12', hdr_bg:'001A22',
      b4:{style:'single',size:4,color:'00CFFF'}, bR:{style:'single',size:6,color:'00CFFF'},
      b1:{style:'single',size:1,color:'00CFFF'}, b3:{style:'single',size:3,color:'00CFFF'},
      borderTop:{style:'single',size:8,color:'00CFFF'} },
    opt3: { header:'FF4444', bg1:'1A0000', bg2:'140000', hdr_bg:'200404',
      b4:{style:'single',size:4,color:'FF4444'}, bR:{style:'single',size:6,color:'FF4444'},
      b1:{style:'single',size:1,color:'FF4444'}, b3:{style:'single',size:3,color:'FF4444'},
      borderTop:{style:'single',size:8,color:'FF4444'} },
    foodColor:'DDDDDD', qtyColor:'BBBBBB', spoonColor:'AAAAAA',
    emptyColor:'2A2A2A', totalBg:'1A1300', totalColor:'FFA500',
    footerColor:'333333', rowSep:'2A2A2A',
  },

  ice: {
    id: 'ice',
    name: 'Ice Blue',
    desc: 'Cyan on deep navy — clean & clinical',
    preview: ['050D14','00CFFF','0A1820','071018'],
    docBg: '050D14', pageBg: '050D14',
    headerNameColor: '00CFFF', headerSubColor: '7AAABB', headerGoalColor: '00CFFF',
    headerBg: '050D14', dividerColor: '00CFFF',
    sectionColor: '00CFFF',
    ibBoxBg: '0A1820', ibKeyColor: '00CFFF', ibValColor: '7AAABB',
    macroBoxBg: '0A1820',
    mealTitleBg: '071018', mealTitleColor: '00CFFF', mealTitleBorder: '00CFFF',
    opt1: { header:'00CFFF', bg1:'0A1820', bg2:'071015', hdr_bg:'0D1E28',
      b4:{style:'single',size:4,color:'00CFFF'}, bR:{style:'single',size:6,color:'00CFFF'},
      b1:{style:'single',size:1,color:'00CFFF'}, b3:{style:'single',size:3,color:'00CFFF'},
      borderTop:{style:'single',size:8,color:'00CFFF'} },
    opt2: { header:'4DE8FF', bg1:'081218', bg2:'060E13', hdr_bg:'0B1A22',
      b4:{style:'single',size:4,color:'4DE8FF'}, bR:{style:'single',size:6,color:'4DE8FF'},
      b1:{style:'single',size:1,color:'4DE8FF'}, b3:{style:'single',size:3,color:'4DE8FF'},
      borderTop:{style:'single',size:8,color:'4DE8FF'} },
    opt3: { header:'80F0FF', bg1:'06101A', bg2:'050D14', hdr_bg:'091522',
      b4:{style:'single',size:4,color:'80F0FF'}, bR:{style:'single',size:6,color:'80F0FF'},
      b1:{style:'single',size:1,color:'80F0FF'}, b3:{style:'single',size:3,color:'80F0FF'},
      borderTop:{style:'single',size:8,color:'80F0FF'} },
    foodColor:'C8E8F0', qtyColor:'89BBCC', spoonColor:'6699AA',
    emptyColor:'1A2A33', totalBg:'0A1820', totalColor:'00CFFF',
    footerColor:'334455', rowSep:'1A2A33',
  },

  ember: {
    id: 'ember',
    name: 'Ember Orange',
    desc: 'Warm fire tones — bold & energetic',
    preview: ['0F0800','FF8C42','1A0E00','140B00'],
    docBg: '0F0800', pageBg: '0F0800',
    headerNameColor: 'FF8C42', headerSubColor: 'AA7755', headerGoalColor: 'FF8C42',
    headerBg: '0F0800', dividerColor: 'FF8C42',
    sectionColor: 'FF8C42',
    ibBoxBg: '1A0E00', ibKeyColor: 'FF8C42', ibValColor: 'AA7755',
    macroBoxBg: '1A0E00',
    mealTitleBg: '140B00', mealTitleColor: 'FF8C42', mealTitleBorder: 'FF8C42',
    opt1: { header:'FF8C42', bg1:'1A0E00', bg2:'140B00', hdr_bg:'201200',
      b4:{style:'single',size:4,color:'FF8C42'}, bR:{style:'single',size:6,color:'FF8C42'},
      b1:{style:'single',size:1,color:'FF8C42'}, b3:{style:'single',size:3,color:'FF8C42'},
      borderTop:{style:'single',size:8,color:'FF8C42'} },
    opt2: { header:'FFAA66', bg1:'160C00', bg2:'100900', hdr_bg:'1C0F00',
      b4:{style:'single',size:4,color:'FFAA66'}, bR:{style:'single',size:6,color:'FFAA66'},
      b1:{style:'single',size:1,color:'FFAA66'}, b3:{style:'single',size:3,color:'FFAA66'},
      borderTop:{style:'single',size:8,color:'FFAA66'} },
    opt3: { header:'FFCC88', bg1:'120A00', bg2:'0E0800', hdr_bg:'180D00',
      b4:{style:'single',size:4,color:'FFCC88'}, bR:{style:'single',size:6,color:'FFCC88'},
      b1:{style:'single',size:1,color:'FFCC88'}, b3:{style:'single',size:3,color:'FFCC88'},
      borderTop:{style:'single',size:8,color:'FFCC88'} },
    foodColor:'EEC9A0', qtyColor:'CC9966', spoonColor:'AA7744',
    emptyColor:'2A1800', totalBg:'1A0E00', totalColor:'FF8C42',
    footerColor:'443322', rowSep:'2A1800',
  },

  slate: {
    id: 'slate',
    name: 'Slate Pro',
    desc: 'White on charcoal — professional & print-ready',
    preview: ['1A1A1A','FFFFFF','222222','1C1C1C'],
    docBg: '1A1A1A', pageBg: '1A1A1A',
    headerNameColor: 'FFFFFF', headerSubColor: '999999', headerGoalColor: 'FFFFFF',
    headerBg: '1A1A1A', dividerColor: 'AAAAAA',
    sectionColor: 'DDDDDD',
    ibBoxBg: '222222', ibKeyColor: 'DDDDDD', ibValColor: '888888',
    macroBoxBg: '222222',
    mealTitleBg: '1C1C1C', mealTitleColor: 'FFFFFF', mealTitleBorder: 'AAAAAA',
    opt1: { header:'FFFFFF', bg1:'222222', bg2:'1C1C1C', hdr_bg:'282828',
      b4:{style:'single',size:4,color:'AAAAAA'}, bR:{style:'single',size:6,color:'AAAAAA'},
      b1:{style:'single',size:1,color:'AAAAAA'}, b3:{style:'single',size:3,color:'AAAAAA'},
      borderTop:{style:'single',size:8,color:'AAAAAA'} },
    opt2: { header:'CCCCCC', bg1:'1E1E1E', bg2:'181818', hdr_bg:'242424',
      b4:{style:'single',size:4,color:'CCCCCC'}, bR:{style:'single',size:6,color:'CCCCCC'},
      b1:{style:'single',size:1,color:'CCCCCC'}, b3:{style:'single',size:3,color:'CCCCCC'},
      borderTop:{style:'single',size:8,color:'CCCCCC'} },
    opt3: { header:'EEEEEE', bg1:'1A1A1A', bg2:'161616', hdr_bg:'202020',
      b4:{style:'single',size:4,color:'EEEEEE'}, bR:{style:'single',size:6,color:'EEEEEE'},
      b1:{style:'single',size:1,color:'EEEEEE'}, b3:{style:'single',size:3,color:'EEEEEE'},
      borderTop:{style:'single',size:8,color:'EEEEEE'} },
    foodColor:'DDDDDD', qtyColor:'AAAAAA', spoonColor:'888888',
    emptyColor:'333333', totalBg:'222222', totalColor:'FFFFFF',
    footerColor:'555555', rowSep:'2E2E2E',
  },

  royal: {
    id: 'royal',
    name: 'Royal Purple',
    desc: 'Gold on deep purple — premium & luxurious',
    preview: ['0D0A18','D4AF37','151024','100D1E'],
    docBg: '0D0A18', pageBg: '0D0A18',
    headerNameColor: 'D4AF37', headerSubColor: '9980CC', headerGoalColor: 'D4AF37',
    headerBg: '0D0A18', dividerColor: 'D4AF37',
    sectionColor: 'D4AF37',
    ibBoxBg: '151024', ibKeyColor: 'D4AF37', ibValColor: '9980CC',
    macroBoxBg: '151024',
    mealTitleBg: '100D1E', mealTitleColor: 'D4AF37', mealTitleBorder: 'D4AF37',
    opt1: { header:'D4AF37', bg1:'151024', bg2:'100D1E', hdr_bg:'1A142C',
      b4:{style:'single',size:4,color:'D4AF37'}, bR:{style:'single',size:6,color:'D4AF37'},
      b1:{style:'single',size:1,color:'D4AF37'}, b3:{style:'single',size:3,color:'D4AF37'},
      borderTop:{style:'single',size:8,color:'D4AF37'} },
    opt2: { header:'C9A227', bg1:'120F22', bg2:'0E0C1A', hdr_bg:'171428',
      b4:{style:'single',size:4,color:'C9A227'}, bR:{style:'single',size:6,color:'C9A227'},
      b1:{style:'single',size:1,color:'C9A227'}, b3:{style:'single',size:3,color:'C9A227'},
      borderTop:{style:'single',size:8,color:'C9A227'} },
    opt3: { header:'B8962E', bg1:'0F0C20', bg2:'0B0A18', hdr_bg:'141126',
      b4:{style:'single',size:4,color:'B8962E'}, bR:{style:'single',size:6,color:'B8962E'},
      b1:{style:'single',size:1,color:'B8962E'}, b3:{style:'single',size:3,color:'B8962E'},
      borderTop:{style:'single',size:8,color:'B8962E'} },
    foodColor:'D8C8A0', qtyColor:'B09060', spoonColor:'907040',
    emptyColor:'1E1830', totalBg:'151024', totalColor:'D4AF37',
    footerColor:'443355', rowSep:'1E1830',
  },

  forest: {
    id: 'forest',
    name: 'Forest Green',
    desc: 'Green on dark earth — natural & fresh',
    preview: ['080F08','4ade80','0E1A0E','0A150A'],
    docBg: '080F08', pageBg: '080F08',
    headerNameColor: '4ade80', headerSubColor: '6B9B6B', headerGoalColor: '4ade80',
    headerBg: '080F08', dividerColor: '4ade80',
    sectionColor: '4ade80',
    ibBoxBg: '0E1A0E', ibKeyColor: '4ade80', ibValColor: '6B9B6B',
    macroBoxBg: '0E1A0E',
    mealTitleBg: '0A150A', mealTitleColor: '4ade80', mealTitleBorder: '4ade80',
    opt1: { header:'4ade80', bg1:'0E1A0E', bg2:'0A150A', hdr_bg:'122012',
      b4:{style:'single',size:4,color:'4ade80'}, bR:{style:'single',size:6,color:'4ade80'},
      b1:{style:'single',size:1,color:'4ade80'}, b3:{style:'single',size:3,color:'4ade80'},
      borderTop:{style:'single',size:8,color:'4ade80'} },
    opt2: { header:'34C468', bg1:'0C1A0C', bg2:'081408', hdr_bg:'101E10',
      b4:{style:'single',size:4,color:'34C468'}, bR:{style:'single',size:6,color:'34C468'},
      b1:{style:'single',size:1,color:'34C468'}, b3:{style:'single',size:3,color:'34C468'},
      borderTop:{style:'single',size:8,color:'34C468'} },
    opt3: { header:'22A850', bg1:'0A1A0A', bg2:'071207', hdr_bg:'0E1C0E',
      b4:{style:'single',size:4,color:'22A850'}, bR:{style:'single',size:6,color:'22A850'},
      b1:{style:'single',size:1,color:'22A850'}, b3:{style:'single',size:3,color:'22A850'},
      borderTop:{style:'single',size:8,color:'22A850'} },
    foodColor:'B8D8B8', qtyColor:'88BB88', spoonColor:'669966',
    emptyColor:'1A2A1A', totalBg:'0E1A0E', totalColor:'4ade80',
    footerColor:'334433', rowSep:'1A2A1A',
  },

  crimson: {
    id: 'crimson',
    name: 'Crimson Red',
    desc: 'Red & white on deep black — power & fire',
    preview: ['080008','FF2D55','1A0010','120008'],
    docBg:'080008', pageBg:'080008',
    headerNameColor:'FF2D55', headerSubColor:'AA4466', headerGoalColor:'FF2D55',
    headerBg:'080008', dividerColor:'FF2D55',
    sectionColor:'FF2D55',
    ibBoxBg:'1A0010', ibKeyColor:'FF2D55', ibValColor:'AA4466',
    macroBoxBg:'1A0010',
    mealTitleBg:'120008', mealTitleColor:'FF2D55', mealTitleBorder:'FF2D55',
    opt1:{ header:'FF2D55', bg1:'1A0010', bg2:'120008', hdr_bg:'200014',
      b4:{style:'single',size:4,color:'FF2D55'}, bR:{style:'single',size:6,color:'FF2D55'},
      b1:{style:'single',size:1,color:'FF2D55'}, b3:{style:'single',size:3,color:'FF2D55'},
      borderTop:{style:'single',size:8,color:'FF2D55'} },
    opt2:{ header:'FF6B8A', bg1:'160010', bg2:'0E000A', hdr_bg:'1C0014',
      b4:{style:'single',size:4,color:'FF6B8A'}, bR:{style:'single',size:6,color:'FF6B8A'},
      b1:{style:'single',size:1,color:'FF6B8A'}, b3:{style:'single',size:3,color:'FF6B8A'},
      borderTop:{style:'single',size:8,color:'FF6B8A'} },
    opt3:{ header:'FF9BAA', bg1:'140008', bg2:'0C0006', hdr_bg:'1A000E',
      b4:{style:'single',size:4,color:'FF9BAA'}, bR:{style:'single',size:6,color:'FF9BAA'},
      b1:{style:'single',size:1,color:'FF9BAA'}, b3:{style:'single',size:3,color:'FF9BAA'},
      borderTop:{style:'single',size:8,color:'FF9BAA'} },
    foodColor:'F0C0CC', qtyColor:'CC8899', spoonColor:'AA6677',
    emptyColor:'2A0010', totalBg:'1A0010', totalColor:'FF2D55',
    footerColor:'441122', rowSep:'2A0010',
  },

  teal: {
    id: 'teal',
    name: 'Teal Glow',
    desc: 'Teal & mint on black — fresh & modern',
    preview: ['050F0F','00E5CC','0A1E1E','071616'],
    docBg:'050F0F', pageBg:'050F0F',
    headerNameColor:'00E5CC', headerSubColor:'4AA8A0', headerGoalColor:'00E5CC',
    headerBg:'050F0F', dividerColor:'00E5CC',
    sectionColor:'00E5CC',
    ibBoxBg:'0A1E1E', ibKeyColor:'00E5CC', ibValColor:'4AA8A0',
    macroBoxBg:'0A1E1E',
    mealTitleBg:'071616', mealTitleColor:'00E5CC', mealTitleBorder:'00E5CC',
    opt1:{ header:'00E5CC', bg1:'0A1E1E', bg2:'071616', hdr_bg:'0D2424',
      b4:{style:'single',size:4,color:'00E5CC'}, bR:{style:'single',size:6,color:'00E5CC'},
      b1:{style:'single',size:1,color:'00E5CC'}, b3:{style:'single',size:3,color:'00E5CC'},
      borderTop:{style:'single',size:8,color:'00E5CC'} },
    opt2:{ header:'00C4AE', bg1:'081A1A', bg2:'051212', hdr_bg:'0B2020',
      b4:{style:'single',size:4,color:'00C4AE'}, bR:{style:'single',size:6,color:'00C4AE'},
      b1:{style:'single',size:1,color:'00C4AE'}, b3:{style:'single',size:3,color:'00C4AE'},
      borderTop:{style:'single',size:8,color:'00C4AE'} },
    opt3:{ header:'7FFFD4', bg1:'061516', bg2:'040F10', hdr_bg:'091B1C',
      b4:{style:'single',size:4,color:'7FFFD4'}, bR:{style:'single',size:6,color:'7FFFD4'},
      b1:{style:'single',size:1,color:'7FFFD4'}, b3:{style:'single',size:3,color:'7FFFD4'},
      borderTop:{style:'single',size:8,color:'7FFFD4'} },
    foodColor:'B0EEE8', qtyColor:'80CCCC', spoonColor:'60AAAA',
    emptyColor:'0A1E1E', totalBg:'0A1E1E', totalColor:'00E5CC',
    footerColor:'2A5050', rowSep:'0A1E1E',
  },

  midnight: {
    id: 'midnight',
    name: 'Midnight Blue',
    desc: 'Electric blue on deepest black — premium dark',
    preview: ['030510','4D9DFF','080D20','060A18'],
    docBg:'030510', pageBg:'030510',
    headerNameColor:'4D9DFF', headerSubColor:'5566AA', headerGoalColor:'4D9DFF',
    headerBg:'030510', dividerColor:'4D9DFF',
    sectionColor:'4D9DFF',
    ibBoxBg:'080D20', ibKeyColor:'4D9DFF', ibValColor:'5566AA',
    macroBoxBg:'080D20',
    mealTitleBg:'060A18', mealTitleColor:'4D9DFF', mealTitleBorder:'4D9DFF',
    opt1:{ header:'4D9DFF', bg1:'080D20', bg2:'060A18', hdr_bg:'0B1228',
      b4:{style:'single',size:4,color:'4D9DFF'}, bR:{style:'single',size:6,color:'4D9DFF'},
      b1:{style:'single',size:1,color:'4D9DFF'}, b3:{style:'single',size:3,color:'4D9DFF'},
      borderTop:{style:'single',size:8,color:'4D9DFF'} },
    opt2:{ header:'80BFFF', bg1:'060B1C', bg2:'040814', hdr_bg:'090F22',
      b4:{style:'single',size:4,color:'80BFFF'}, bR:{style:'single',size:6,color:'80BFFF'},
      b1:{style:'single',size:1,color:'80BFFF'}, b3:{style:'single',size:3,color:'80BFFF'},
      borderTop:{style:'single',size:8,color:'80BFFF'} },
    opt3:{ header:'B3D9FF', bg1:'04091A', bg2:'030712', hdr_bg:'070C20',
      b4:{style:'single',size:4,color:'B3D9FF'}, bR:{style:'single',size:6,color:'B3D9FF'},
      b1:{style:'single',size:1,color:'B3D9FF'}, b3:{style:'single',size:3,color:'B3D9FF'},
      borderTop:{style:'single',size:8,color:'B3D9FF'} },
    foodColor:'C0D8F0', qtyColor:'8899BB', spoonColor:'6677AA',
    emptyColor:'080D20', totalBg:'080D20', totalColor:'4D9DFF',
    footerColor:'223355', rowSep:'080D20',
  },

  platinum: {
    id: 'platinum',
    name: 'Platinum White',
    desc: 'Silver & white on light grey — clean minimal',
    preview: ['F0F0F0','1A1A1A','E0E0E0','D8D8D8'],
    docBg:'F4F4F4', pageBg:'F4F4F4',
    logoBg:'0A0A0A', // force black behind logo for visibility
    headerNameColor:'111111', headerSubColor:'555555', headerGoalColor:'111111',
    headerBg:'F4F4F4', dividerColor:'333333',
    sectionColor:'222222',
    ibBoxBg:'E0E0E0', ibKeyColor:'111111', ibValColor:'555555',
    macroBoxBg:'E8E8E8',
    mealTitleBg:'DDDDDD', mealTitleColor:'111111', mealTitleBorder:'333333',
    opt1:{ header:'111111', bg1:'E8E8E8', bg2:'DEDEDE', hdr_bg:'D8D8D8',
      b4:{style:'single',size:4,color:'333333'}, bR:{style:'single',size:6,color:'111111'},
      b1:{style:'single',size:1,color:'AAAAAA'}, b3:{style:'single',size:3,color:'666666'},
      borderTop:{style:'single',size:8,color:'111111'} },
    opt2:{ header:'444444', bg1:'E4E4E4', bg2:'DADADA', hdr_bg:'D4D4D4',
      b4:{style:'single',size:4,color:'555555'}, bR:{style:'single',size:6,color:'333333'},
      b1:{style:'single',size:1,color:'AAAAAA'}, b3:{style:'single',size:3,color:'777777'},
      borderTop:{style:'single',size:8,color:'444444'} },
    opt3:{ header:'777777', bg1:'E0E0E0', bg2:'D6D6D6', hdr_bg:'D0D0D0',
      b4:{style:'single',size:4,color:'777777'}, bR:{style:'single',size:6,color:'555555'},
      b1:{style:'single',size:1,color:'BBBBBB'}, b3:{style:'single',size:3,color:'888888'},
      borderTop:{style:'single',size:8,color:'777777'} },
    foodColor:'222222', qtyColor:'444444', spoonColor:'666666',
    emptyColor:'CCCCCC', totalBg:'E0E0E0', totalColor:'111111',
    footerColor:'999999', rowSep:'CCCCCC',
  },

  sunset: {
    id: 'sunset',
    name: 'Sunset Pink',
    desc: 'Hot pink & coral on dark navy — vibrant & bold',
    preview: ['0A0514','FF5FA0','1A0828','130520'],
    docBg:'0A0514', pageBg:'0A0514',
    headerNameColor:'FF5FA0', headerSubColor:'993366', headerGoalColor:'FF5FA0',
    headerBg:'0A0514', dividerColor:'FF5FA0',
    sectionColor:'FF5FA0',
    ibBoxBg:'1A0828', ibKeyColor:'FF5FA0', ibValColor:'993366',
    macroBoxBg:'1A0828',
    mealTitleBg:'130520', mealTitleColor:'FF5FA0', mealTitleBorder:'FF5FA0',
    opt1:{ header:'FF5FA0', bg1:'1A0828', bg2:'130520', hdr_bg:'200A30',
      b4:{style:'single',size:4,color:'FF5FA0'}, bR:{style:'single',size:6,color:'FF5FA0'},
      b1:{style:'single',size:1,color:'FF5FA0'}, b3:{style:'single',size:3,color:'FF5FA0'},
      borderTop:{style:'single',size:8,color:'FF5FA0'} },
    opt2:{ header:'FF9ACC', bg1:'160624', bg2:'0F041C', hdr_bg:'1C082C',
      b4:{style:'single',size:4,color:'FF9ACC'}, bR:{style:'single',size:6,color:'FF9ACC'},
      b1:{style:'single',size:1,color:'FF9ACC'}, b3:{style:'single',size:3,color:'FF9ACC'},
      borderTop:{style:'single',size:8,color:'FF9ACC'} },
    opt3:{ header:'FFB347', bg1:'120420', bg2:'0C031A', hdr_bg:'180628',
      b4:{style:'single',size:4,color:'FFB347'}, bR:{style:'single',size:6,color:'FFB347'},
      b1:{style:'single',size:1,color:'FFB347'}, b3:{style:'single',size:3,color:'FFB347'},
      borderTop:{style:'single',size:8,color:'FFB347'} },
    foodColor:'F0CCDD', qtyColor:'CC99BB', spoonColor:'AA7799',
    emptyColor:'200A30', totalBg:'1A0828', totalColor:'FF5FA0',
    footerColor:'441133', rowSep:'200A30',
  },

  desert: {
    id: 'desert',
    name: 'Desert Sand',
    desc: 'Warm sand & brown on dark mahogany — earthy & rich',
    preview: ['0F0A06','E8C87A','1E1408','160F06'],
    docBg:'0F0A06', pageBg:'0F0A06',
    headerNameColor:'E8C87A', headerSubColor:'9B7D45', headerGoalColor:'E8C87A',
    headerBg:'0F0A06', dividerColor:'E8C87A',
    sectionColor:'E8C87A',
    ibBoxBg:'1E1408', ibKeyColor:'E8C87A', ibValColor:'9B7D45',
    macroBoxBg:'1E1408',
    mealTitleBg:'160F06', mealTitleColor:'E8C87A', mealTitleBorder:'E8C87A',
    opt1:{ header:'E8C87A', bg1:'1E1408', bg2:'160F06', hdr_bg:'241A0A',
      b4:{style:'single',size:4,color:'E8C87A'}, bR:{style:'single',size:6,color:'E8C87A'},
      b1:{style:'single',size:1,color:'E8C87A'}, b3:{style:'single',size:3,color:'E8C87A'},
      borderTop:{style:'single',size:8,color:'E8C87A'} },
    opt2:{ header:'D4A843', bg1:'1A1206', bg2:'120D04', hdr_bg:'201608',
      b4:{style:'single',size:4,color:'D4A843'}, bR:{style:'single',size:6,color:'D4A843'},
      b1:{style:'single',size:1,color:'D4A843'}, b3:{style:'single',size:3,color:'D4A843'},
      borderTop:{style:'single',size:8,color:'D4A843'} },
    opt3:{ header:'C49030', bg1:'160F04', bg2:'0E0A03', hdr_bg:'1C1406',
      b4:{style:'single',size:4,color:'C49030'}, bR:{style:'single',size:6,color:'C49030'},
      b1:{style:'single',size:1,color:'C49030'}, b3:{style:'single',size:3,color:'C49030'},
      borderTop:{style:'single',size:8,color:'C49030'} },
    foodColor:'F0DDB0', qtyColor:'C8A870', spoonColor:'A08050',
    emptyColor:'201508', totalBg:'1E1408', totalColor:'E8C87A',
    footerColor:'553D20', rowSep:'201508',
  },
};

function buildThemeGrid() {
  const grid = document.getElementById('theme-grid');
  if (!grid) return;
  grid.innerHTML = Object.values(EXPORT_THEMES).map(t => `
    <div class="theme-card ${t.id === window._exportTheme ? 'selected' : ''}"
      id="theme-card-${t.id}" onclick="selectTheme('${t.id}')"
      style="cursor:pointer;border:2px solid ${t.id===window._exportTheme?'#'+t.preview[1]:'#333'};
        background:#0f0f0f;padding:12px;transition:all .15s;">
      <div style="display:flex;gap:5px;margin-bottom:8px;">
        ${t.preview.map(c=>`<div style="flex:1;height:20px;background:#${c};border-radius:2px;"></div>`).join('')}
      </div>
      <div style="font-family:'Bebas Neue',sans-serif;font-size:14px;color:#${t.preview[1]};letter-spacing:2px;">${t.name}</div>
      <div style="font-size:10px;color:#555;margin-top:2px;line-height:1.4;">${t.desc}</div>
    </div>
  `).join('');
}

function selectTheme(id) {
  window._exportTheme = id;
  const t = EXPORT_THEMES[id];
  // Update border on cards
  document.querySelectorAll('.theme-card').forEach(card => {
    const tid = card.id.replace('theme-card-','');
    const th = EXPORT_THEMES[tid];
    card.style.border = tid === id ? `2px solid #${th.preview[1]}` : '2px solid #333';
    card.classList.toggle('selected', tid === id);
  });
  // Update export button color to match theme accent
  const btn = document.getElementById('theme-export-btn');
  if (btn) {
    btn.style.background = '#' + t.preview[1];
    btn.style.color = parseInt(t.preview[1],16) > 0x888888 ? '#000' : '#fff';
    btn.style.borderColor = '#' + t.preview[1];
  }
}

function openThemeModal() {
  buildThemeGrid();
  selectTheme(window._exportTheme || 'neon');
  // Toggle the cycling selector based on whether cycling is configured
  const ccSelector = document.getElementById('cc-export-selector');
  if (ccSelector) {
    const configured = (typeof ccIsConfigured === 'function') && ccIsConfigured();
    ccSelector.style.display = configured ? 'block' : 'none';
    if (configured && typeof ccUpdateExportHint === 'function') ccUpdateExportHint();
  }
  const overlay = document.getElementById('theme-modal-overlay');
  const modal   = document.getElementById('theme-modal');
  if (overlay) { overlay.style.display = 'flex'; }
  if (modal)   { modal.style.display   = 'block'; }
}

function ccUpdateExportHint() {
  const tiers = ccGetSelectedExportTiers();
  const hint = document.getElementById('cc-export-hint');
  if (!hint) return;
  if (tiers.length === 0) {
    hint.innerHTML = '<span style="color:#f87171;">⚠ Select at least one day plan to export.</span>';
  } else if (tiers.length === 1 && tiers[0] === 'M') {
    hint.innerHTML = 'Exporting base (Medium) plan only — no tier scaling.';
  } else {
    const names = { H:'HIGH', M:'MEDIUM', L:'LOW' };
    const ordered = tiers.map(t => names[t]).join(' + ');
    hint.innerHTML = `Exporting ${tiers.length} day plan${tiers.length>1?'s':''}: <strong style="color:var(--y);">${ordered}</strong>. High/Low variants auto-scale carb foods.`;
  }
}

function closeThemeModal() {
  const overlay = document.getElementById('theme-modal-overlay');
  const modal   = document.getElementById('theme-modal');
  if (overlay) overlay.style.display = 'none';
  if (modal)   modal.style.display   = 'none';
}

function confirmThemeExport() {
  closeThemeModal();
  exportDocx();
}
const AppState = {
  history: [],
  historyIndex: -1,

  saveToHistory() {
    // Snapshot all form values
    const snap = {};
    document.querySelectorAll('[id]').forEach(el => {
      if (el.value !== undefined && el.id) snap[el.id] = el.value;
    });
    snap.__mealNames = JSON.stringify(window._mealNames || {});
    snap.__mealSubs = JSON.stringify(window._mealNameSubs || {});
    if (this.historyIndex < this.history.length - 1)
      this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(JSON.stringify(snap));
    this.historyIndex++;
    if (this.history.length > 25) { this.history.shift(); this.historyIndex--; }
  },

  undo() {
    if (this.historyIndex <= 0) { toast('Nothing to undo', 'info'); return; }
    this.historyIndex--;
    const snap = JSON.parse(this.history[this.historyIndex]);
    Object.keys(snap).forEach(id => {
      if (id === '__mealNames' || id === '__mealSubs') return;
      const el = document.getElementById(id);
      if (el && el.value !== undefined) el.value = snap[id];
    });
    if (snap.__mealNames) {
      window._mealNames = JSON.parse(snap.__mealNames);
      if (window.MEALS_DEF) MEALS_DEF.forEach(m => {
        const inp = document.getElementById('meal-name-input-'+m.id);
        if (inp) inp.value = getMealName(m.id);
      });
    }
    if (snap.__mealSubs) {
      window._mealNameSubs = JSON.parse(snap.__mealSubs);
      if (window.MEALS_DEF) MEALS_DEF.forEach(m => {
        const inp = document.getElementById('meal-sub-input-'+m.id);
        if (inp) inp.value = getMealSub(m.id);
      });
    }
    syncPreview(); updateGrandTotal(); calcBMR();
    toast('↩ Undo', 'info');
  },

  redo() {
    if (this.historyIndex >= this.history.length - 1) { toast('Nothing to redo', 'info'); return; }
    this.historyIndex++;
    const snap = JSON.parse(this.history[this.historyIndex]);
    Object.keys(snap).forEach(id => {
      if (id === '__mealNames' || id === '__mealSubs') return;
      const el = document.getElementById(id);
      if (el && el.value !== undefined) el.value = snap[id];
    });
    // Restore meal names & sub-names (redo previously skipped these)
    if (snap.__mealNames) {
      window._mealNames = JSON.parse(snap.__mealNames);
    }
    if (snap.__mealSubs) {
      window._mealNameSubs = JSON.parse(snap.__mealSubs);
    }
    if (window.MEALS_DEF) MEALS_DEF.forEach(m => {
      const nameInp = document.getElementById('meal-name-input-'+m.id);
      if (nameInp) nameInp.value = getMealName(m.id);
      const subInp = document.getElementById('meal-sub-input-'+m.id);
      if (subInp) subInp.value = getMealSub(m.id);
    });
    syncPreview(); updateGrandTotal(); calcBMR();
    toast('↪ Redo', 'info');
  }
};

// Keyboard shortcuts: Ctrl+Z undo, Ctrl+Y / Ctrl+Shift+Z redo
document.addEventListener('keydown', e => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;
  if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); AppState.undo(); }
  if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); AppState.redo(); }
});

// ═══════════════════════════════════════════════════════════
// ✅  DATA VALIDATION
// ═══════════════════════════════════════════════════════════
function validateClientData() {
  const errors = [];
  const weight = parseFloat(document.getElementById('ib-weight')?.value);
  if (weight && (weight < 30 || weight > 300)) errors.push('Weight must be between 30–300 kg');
  const age = parseInt(document.getElementById('c-age')?.value || document.getElementById('ib-age')?.value);
  if (age && (age < 10 || age > 100)) errors.push('Age must be between 10–100');
  const cal = parseInt(document.getElementById('t-cal')?.value);
  if (cal && (cal < 800 || cal > 8000)) errors.push('Calories seem out of range (800–8000)');
  const prot = parseInt(document.getElementById('t-prot')?.value);
  if (cal && prot && prot * 4 > cal) errors.push('Protein calories exceed total calories');

  const banner = document.getElementById('validation-banner');
  if (errors.length > 0) {
    if (banner) {
      banner.innerHTML = errors.map(e=>`<div style="color:#f87171;font-size:12px;padding:3px 0;">⚠️ ${e}</div>`).join('');
      banner.classList.add('show');
      setTimeout(() => banner.classList.remove('show'), 5000);
    }
    return false;
  }
  if (banner) banner.classList.remove('show');
  return true;
}

// Auto-validate on key target changes
['t-cal','t-prot','t-carbs','t-fats','ib-weight','c-age','ib-age'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', validateClientData);
});

// ═══════════════════════════════════════════════════════════
// 📈  INBODY PROGRESS CHART
// ═══════════════════════════════════════════════════════════
let _inbodyChart = null;

function saveInBodyHistory() {
  const entry = {
    date: document.getElementById('ib-date')?.value || new Date().toISOString().split('T')[0],
    weight: parseFloat(document.getElementById('ib-weight')?.value) || 0,
    smm:    parseFloat(document.getElementById('ib-smm')?.value)    || 0,
    bf:     parseFloat(document.getElementById('ib-bf')?.value)     || 0
  };
  if (!entry.weight) { toast('Enter weight before saving history', 'info'); return; }
  let history = JSON.parse(localStorage.getItem('og-inbody-history') || '[]');
  // Avoid exact duplicates on same date
  history = history.filter(h => h.date !== entry.date);
  history.push(entry);
  history.sort((a,b) => a.date.localeCompare(b.date));
  localStorage.setItem('og-inbody-history', JSON.stringify(history));
  renderInBodyChart();
  toast('✅ InBody snapshot saved', 'success');
}

function clearInBodyHistory() {
  if (!confirm('Clear all InBody history? This cannot be undone.')) return;
  localStorage.removeItem('og-inbody-history');
  renderInBodyChart();
  toast('History cleared', 'info');
}

function renderInBodyChart() {
  const history = JSON.parse(localStorage.getItem('og-inbody-history') || '[]');
  const card = document.getElementById('progress-chart-card');
  const listEl = document.getElementById('inbody-history-list');
  if (!card) return;

  if (history.length < 2) {
    card.style.display = 'none';
    return;
  }
  card.style.display = 'block';

  // Render history chips
  if (listEl) {
    listEl.innerHTML = history.slice(-6).reverse().map(h =>
      `<div style="background:var(--card2);border:1px solid var(--border2);padding:6px 12px;font-size:11px;color:var(--muted);">
        <span style="color:var(--y);font-family:'Bebas Neue',sans-serif;font-size:14px;">${h.date}</span>
        &nbsp; ${h.weight}kg &nbsp;|&nbsp; SMM ${h.smm}kg &nbsp;|&nbsp; BF ${h.bf}%
      </div>`
    ).join('');
  }

  const canvas = document.getElementById('inbody-chart');
  if (!canvas) return;
  if (typeof Chart === 'undefined') return;

  if (_inbodyChart) { _inbodyChart.destroy(); _inbodyChart = null; }

  _inbodyChart = new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: history.map(h => h.date),
      datasets: [
        { label: 'Weight (kg)', data: history.map(h => h.weight), borderColor: '#F5FF00', backgroundColor: 'rgba(245,255,0,0.08)', tension: 0.4, pointRadius: 4, pointBackgroundColor: '#F5FF00' },
        { label: 'Muscle (kg)',  data: history.map(h => h.smm),    borderColor: '#00CFFF', backgroundColor: 'rgba(0,207,255,0.08)', tension: 0.4, pointRadius: 4, pointBackgroundColor: '#00CFFF' },
        { label: 'Body Fat %',  data: history.map(h => h.bf),     borderColor: '#FF8C42', backgroundColor: 'rgba(255,140,66,0.08)', tension: 0.4, pointRadius: 4, pointBackgroundColor: '#FF8C42' }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { labels: { color: '#888', font: { size: 11 } } } },
      scales: {
        y: { grid: { color: 'rgba(255,255,255,0.07)' }, ticks: { color: '#666' } },
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#666', maxRotation: 45 } }
      }
    }
  });
}

// ═══════════════════════════════════════════════════════════
// 🚀  SMART MEAL AUTO-GENERATOR
// ═══════════════════════════════════════════════════════════
function generateAutoMeals() {
  const targets = {
    cal:   parseInt(document.getElementById('t-cal')?.value)   || 0,
    prot:  parseInt(document.getElementById('t-prot')?.value)  || 0,
    carbs: parseInt(document.getElementById('t-carbs')?.value) || 0,
    fats:  parseInt(document.getElementById('t-fats')?.value)  || 0
  };

  if (targets.cal < 800) {
    toast('⚠️ Set calorie targets first (Targets page)', 'info');
    showPage('targets');
    return;
  }
  if (!window.MEALS_DEF) { toast('Meals not ready', 'error'); return; }
  // FOOD_DB is const — don't use window.FOOD_DB
  if (typeof FOOD_DB === 'undefined' || !FOOD_DB.length) {
    toast('Food database not loaded', 'error'); return;
  }

  // Fill defaults for empty macros
  if (!targets.prot)  targets.prot  = Math.round(targets.cal * 0.30 / 4);
  if (!targets.carbs) targets.carbs = Math.round(targets.cal * 0.40 / 4);
  if (!targets.fats)  targets.fats  = Math.round(targets.cal * 0.30 / 9);

  // Distribution across meals
  const dist = [
    { pct_p:0.25, pct_c:0.30, pct_f:0.20 }, // Meal 1 Breakfast
    { pct_p:0.10, pct_c:0.10, pct_f:0.10 }, // Meal 2 Snack
    { pct_p:0.30, pct_c:0.30, pct_f:0.30 }, // Meal 3 Lunch
    { pct_p:0.20, pct_c:0.20, pct_f:0.25 }, // Meal 4 Pre/Post
    { pct_p:0.10, pct_c:0.05, pct_f:0.10 }, // Meal 5 Snack 2
    { pct_p:0.05, pct_c:0.05, pct_f:0.05 }  // Meal 6 Light
  ];

  // Pre-build all picks BEFORE clearing anything
  const mealPlans = [];
  const count = Math.min(MEALS_DEF.length, dist.length);
  for (let i = 0; i < count; i++) {
    const d = dist[i];
    const picks = buildMealPicks({
      prot:  targets.prot  * d.pct_p,
      carbs: targets.carbs * d.pct_c,
      fats:  targets.fats  * d.pct_f
    });
    mealPlans.push({ mealId: MEALS_DEF[i].id, picks });
  }

  // Check we got at least something
  const totalPicks = mealPlans.reduce((s, m) => s + m.picks.length, 0);
  if (totalPicks === 0) {
    toast('Could not find matching foods — check food database', 'error');
    return;
  }

  // NOW clear option 1 and fill
  mealPlans.forEach(({ mealId, picks }) => {
    const container = document.getElementById('rows-'+mealId+'-1');
    if (!container) return;
    container.innerHTML = '';
    picks.forEach(pick => {
      addFoodRow(mealId, 1);
      const rows = container.querySelectorAll('.food-row');
      const row  = rows[rows.length - 1];
      if (!row) return;
      const searchInput = row.querySelector('.food-search');
      const qtyInput    = row.querySelector('.food-qty-input');
      const tbspInput   = row.querySelector('.food-tbsp-input');
      if (!searchInput || !qtyInput) return;
      searchInput.value     = (window._lang==='en') ? (pick.food.en||pick.food.ar) : (pick.food.ar||'');
      qtyInput.value        = pick.grams;
      row.dataset.foodCal   = pick.food.cal  || 0;
      row.dataset.foodProt  = pick.food.prot || 0;
      row.dataset.foodCarb  = pick.food.carb || 0;
      row.dataset.foodFat   = pick.food.fat  || 0;
      row.dataset.foodName  = pick.food.ar || ''; row.dataset.foodNameEn = pick.food.en || pick.food.ar || ''; row.dataset.foodCatEn = pick.food.catEn || pick.food.cat || '';
      row.dataset.foodCat   = pick.food.cat  || '';
      row.dataset.foodUnit  = '';
      row.dataset.foodUnitG = '';
      delete row.dataset.foodLiq; delete row.dataset.foodLiqBase;
      if (tbspInput) {
        const t = gramToTbsp(pick.grams, pick.food.ar, pick.food.cat);
        tbspInput.value = (t !== null) ? formatTbspNum(t) : '';
      }
      updateRowMacros(row);
    });
    recalcMealTotals(mealId, 1);
  });

  // Switch all tabs to option 1
  MEALS_DEF.forEach(m => {
    const block = document.getElementById('block-'+m.id);
    if (!block) return;
    block.querySelectorAll('.opt-tab').forEach(t => t.classList.remove('active'));
    block.querySelectorAll('.opt-panel').forEach(p => p.classList.remove('active'));
    const tab1 = block.querySelector('.opt-tab[data-opt="1"]');
    const pan1 = document.getElementById('opt-'+m.id+'-1');
    if (tab1) tab1.classList.add('active');
    if (pan1) pan1.classList.add('active');
  });

  updateGrandTotal();
  syncPreview();
  toast('✅ Meal plan auto-generated!', 'success');
  showPage('meals');
}

// Build food picks for one meal — uses FOOD_DB directly (no window.FOOD_DB)
function buildMealPicks(targets) {
  const picks = [];

  const protFoods = FOOD_DB.filter(f => f.prot > 15 && f.carb < 8 && !f.unit && !f.liq);
  const carbFoods = FOOD_DB.filter(f => f.carb > 15 && f.prot < 12 && f.fat < 8 && !f.unit && !f.liq);
  const fatFoods  = FOOD_DB.filter(f => f.fat  > 8  && f.carb < 5  && !f.unit && !f.liq);

  if (protFoods.length && targets.prot > 5) {
    const pool = protFoods.slice(0, Math.min(protFoods.length, 20));
    const pf   = pool[Math.floor(Math.random() * pool.length)];
    const g    = Math.round((targets.prot * 0.65) / (pf.prot / 100));
    picks.push({ food: pf, grams: Math.min(Math.max(g, 50), 450) });
  }

  if (carbFoods.length && targets.carbs > 10) {
    const pool = carbFoods.slice(0, Math.min(carbFoods.length, 20));
    const cf   = pool[Math.floor(Math.random() * pool.length)];
    const g    = Math.round((targets.carbs * 0.70) / (cf.carb / 100));
    picks.push({ food: cf, grams: Math.min(Math.max(g, 30), 350) });
  }

  if (fatFoods.length && targets.fats > 8) {
    const pool = fatFoods.slice(0, Math.min(fatFoods.length, 10));
    const ff   = pool[Math.floor(Math.random() * pool.length)];
    const g    = Math.round((targets.fats * 0.40) / (ff.fat / 100));
    picks.push({ food: ff, grams: Math.min(Math.max(g, 5), 60) });
  }

  return picks;
}

function autoFillMealOpt(mealId, optN, targets) {
  // Kept for backward compatibility — delegates to new helpers
  if (typeof FOOD_DB === 'undefined') return;
  const container = document.getElementById('rows-'+mealId+'-'+optN);
  if (!container) return;
  container.innerHTML = '';
  const picks = buildMealPicks(targets);
  picks.forEach(pick => {
    addFoodRow(mealId, optN);
    const rows = container.querySelectorAll('.food-row');
    const row  = rows[rows.length - 1];
    if (!row) return;
    const si = row.querySelector('.food-search');
    const qi = row.querySelector('.food-qty-input');
    if (!si || !qi) return;
    si.value = (window._lang==='en') ? (pick.food.en||pick.food.ar) : (pick.food.ar||'');
    qi.value = pick.grams;
    row.dataset.foodCal  = pick.food.cal  || 0;
    row.dataset.foodProt = pick.food.prot || 0;
    row.dataset.foodCarb = pick.food.carb || 0;
    row.dataset.foodFat  = pick.food.fat  || 0;
    row.dataset.foodName = pick.food.ar || ''; row.dataset.foodNameEn = pick.food.en || pick.food.ar || '';
    row.dataset.foodCat  = pick.food.cat  || '';
    row.dataset.foodUnit = '';
    row.dataset.foodUnitG= '';
    delete row.dataset.foodLiq; delete row.dataset.foodLiqBase;
    updateRowMacros(row);
  });
  recalcMealTotals(mealId, optN);
}

// ═══════════════════════════════════════════════════════════
// 📱  FAB QUICK-ADD
// ═══════════════════════════════════════════════════════════
function fabQuickAdd() {
  // Find first visible active meal and click its add-food button
  const activePanels = document.querySelectorAll('.opt-panel.active');
  for (const panel of activePanels) {
    const btn = panel.querySelector('.add-food-btn');
    if (btn && panel.offsetParent !== null) {
      btn.click();
      const rows = panel.querySelectorAll('.food-row');
      if (rows.length) rows[rows.length-1].scrollIntoView({ behavior:'smooth', block:'center' });
      return;
    }
  }
  toast('Navigate to a meal first', 'info');
}

// Show/hide FAB based on current page — hook via MutationObserver on active page class
(function setupFabVisibility() {
  const updateFab = () => {
    const fab = document.getElementById('fab-quick-btn');
    if (!fab) return;
    const mealsActive = document.getElementById('page-meals')?.classList.contains('active');
    fab.style.display = mealsActive ? 'flex' : 'none';
  };
  // Poll lightly since showPage is overridden multiple times
  setInterval(updateFab, 300);
})();

// ═══════════════════════════════════════════════════════════
// 📄  PDF EXPORT (iOS Safari compatible)
// ═══════════════════════════════════════════════════════════
async function exportPDF(btn) {
  // CRITICAL: capture btn reference BEFORE any await.
  // iOS Safari clears `event` across awaits, so falling back to `event?.target`
  // silently loses the button ref and breaks the finally{} UI restore.
  btn = btn || (typeof event !== 'undefined' ? event.target : null);
  const originalText = btn ? btn.textContent : null;
  if (btn) { btn.textContent = '⏳ PDF...'; btn.disabled = true; }

  try {
    // Make sure Preview is built and visible (html2canvas can't render hidden elements well)
    const previewEl = document.getElementById('preview-body');
    if (!previewEl) { toast('Open Preview first', 'info'); return; }

    // Ensure preview page is active so layout is measured correctly
    try {
      if (typeof showPage === 'function' && !document.getElementById('page-preview')?.classList.contains('active')) {
        showPage('preview');
      }
      buildPreview();
    } catch(e) { /* non-fatal */ }

    // Give the browser a frame to commit layout before capture (iOS-critical)
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    const [jsPDFModule, html2canvasModule] = await Promise.all([
      import('https://cdn.jsdelivr.net/npm/jspdf@2.5.1/+esm'),
      import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm')
    ]);
    const { jsPDF } = jsPDFModule;
    const html2canvas = html2canvasModule.default;

    // iOS Safari caps canvas at ~4096×4096px (or 16.7M total pixels).
    // Use scale 1 on iOS for tall plans; use 2 on desktop for sharper output.
    const isIOS = window.__iosCompat && window.__iosCompat.isIOSSafari;
    const previewHeight = previewEl.scrollHeight || previewEl.offsetHeight || 1200;
    const previewWidth  = previewEl.scrollWidth  || previewEl.offsetWidth  || 800;
    // Maximum safe dimension for iOS Safari canvas
    const maxDim = isIOS ? 4096 : 8192;
    let scale = isIOS ? 1.5 : 2;
    // If even at scale 1.5 we'd blow the cap, drop to 1 or below
    if (previewHeight * scale > maxDim) scale = maxDim / previewHeight;
    if (previewWidth  * scale > maxDim) scale = Math.min(scale, maxDim / previewWidth);
    scale = Math.max(0.75, Math.min(scale, 2));

    const canvas = await html2canvas(previewEl, {
      backgroundColor: '#0f0f0f',
      scale: scale,
      useCORS: true,
      allowTaint: false,
      logging: false,
      imageTimeout: 15000,
      // iOS-friendly: force the foreignObject renderer off (less iOS crashing)
      foreignObjectRendering: false,
      windowWidth: previewWidth,
      windowHeight: previewHeight
    });

    const pdf = new jsPDF('p', 'mm', 'a4');
    // Use JPEG on iOS — much smaller memory footprint than PNG for tall captures,
    // which matters because iOS Safari kills tabs that exceed ~250MB RAM.
    const mimeType = isIOS ? 'image/jpeg' : 'image/png';
    const imgFormat = isIOS ? 'JPEG' : 'PNG';
    const imgQuality = isIOS ? 0.85 : 0.92;

    let imgData;
    try {
      imgData = canvas.toDataURL(mimeType, imgQuality);
    } catch (e) {
      // Tainted canvas or iOS memory failure — fall back to JPEG at lower quality
      imgData = canvas.toDataURL('image/jpeg', 0.7);
    }
    if (!imgData || imgData === 'data:,') {
      throw new Error('Canvas capture produced empty image. Preview may be too tall for this device.');
    }

    const pageW     = 210;
    const pageH     = 297;
    const imgW      = pageW;
    const imgH      = canvas.height * imgW / canvas.width;
    let remaining   = imgH;
    let yOffset     = 0;

    pdf.addImage(imgData, imgFormat, 0, yOffset, imgW, imgH);
    remaining -= pageH;

    while (remaining > 0) {
      yOffset = -(imgH - remaining);
      pdf.addPage();
      pdf.addImage(imgData, imgFormat, 0, yOffset, imgW, imgH);
      remaining -= pageH;
    }

    const name = document.getElementById('c-name')?.value || 'Client';
    const filename = `NutritionPlan_${name.replace(/\s+/g,'_')}.pdf`;

    // Route through iOS-aware download helper instead of pdf.save()
    // pdf.save() internally uses a.click() which iOS Safari silently ignores.
    const blob = pdf.output('blob');
    const ok = window.downloadBlob(blob, filename);
    if (ok && !isIOS) {
      toast('✅ PDF exported!', 'success');
    } else if (ok) {
      setTimeout(() => toast('✅ PDF ready — use Share sheet', 'success'), 3200);
    }
  } catch(err) {
    console.error('PDF export error:', err);
    toast('PDF failed: ' + (err.message || 'unknown').slice(0,60), 'error');
  } finally {
    if (btn) {
      btn.textContent = originalText || '📄 PDF';
      btn.disabled = false;
    }
  }
}
