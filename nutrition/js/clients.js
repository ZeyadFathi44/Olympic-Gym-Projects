const CLIENT_STORE_KEY = 'og_clients_v1';
const CLIENT_ACTIVE_KEY = 'og_active_client_id';

function chGetAll() {
  try { return JSON.parse(localStorage.getItem(CLIENT_STORE_KEY) || '{}'); } catch(e) { return {}; }
}
function chSaveAll(db) { localStorage.setItem(CLIENT_STORE_KEY, JSON.stringify(db)); }
function chGetActive() { return localStorage.getItem(CLIENT_ACTIVE_KEY) || null; }
function chSetActive(id) { localStorage.setItem(CLIENT_ACTIVE_KEY, id); }

const _CH_IDS = [
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

function chCollect() {
  const d = { _savedAt: Date.now() };
  _CH_IDS.forEach(id => { const el = document.getElementById(id); if (el) d[id] = el.value; });
  d._meals = [];
  if (window.MEALS_DEF && window.OPTS_DEF) {
    MEALS_DEF.forEach(m => {
      OPTS_DEF.forEach(o => {
        document.querySelectorAll('#rows-' + m.id + '-' + o.n + ' .food-row').forEach(row => {
          const nEl = row.querySelector('.food-search');
          const gEl = row.querySelector('.food-qty-input');
          const tEl = row.querySelector('.food-tbsp-input');
          if (nEl?.value?.trim()) d._meals.push({
            meal: m.id, opt: o.n,
            name: nEl.value.trim(),
            grams: gEl?.value || '',
            tbsp:  tEl?.value || '',
            foodCal:  row.dataset.foodCal  || '',
            foodProt: row.dataset.foodProt || '',
            foodCarb: row.dataset.foodCarb || '',
            foodFat:  row.dataset.foodFat  || '',
            foodName:   row.dataset.foodName   || '',
            foodNameEn: row.dataset.foodNameEn || '',
            foodCat:    row.dataset.foodCat    || '',
            foodCatEn:  row.dataset.foodCatEn  || '',
            foodUnit:   row.dataset.foodUnit   || '',
            foodUnitG:  row.dataset.foodUnitG  || '',
            foodLiq:    row.dataset.foodLiq    || '',
            foodLiqBase: row.dataset.foodLiqBase || ''
          });
        });
      });
    });
  }
  d._supps = [];
  document.querySelectorAll('#supp-rows .supp-row').forEach(row => {
    const inp = row.querySelectorAll('input');
    if (inp[0]?.value) d._supps.push([inp[0].value, inp[1]?.value||'', inp[2]?.value||'']);
  });
  d._mealNames = window._mealNames || {};
  d._mealSubs = window._mealNameSubs || {};
  d._ccWeek = (window._ccWeek || ['M','M','M','M','M','M','M']).slice();
  d._ccOpts = (window._ccOpts && typeof window._ccOpts === 'object') ? JSON.parse(JSON.stringify(window._ccOpts)) : undefined;
  // 🍩 Free-meal flags (per-roster-client persistence)
  d._freeMeals = window._freeMeals || {};
  return d;
}

function chApply(data) {
  _CH_IDS.forEach(id => { const el = document.getElementById(id); if (el && data[id] !== undefined) el.value = data[id]; });
  // Restore meals into DOM
  if (data._meals && window.MEALS_DEF && window.OPTS_DEF) {
    MEALS_DEF.forEach(m => OPTS_DEF.forEach(o => {
      const c = document.getElementById('rows-' + m.id + '-' + o.n);
      if (c) c.innerHTML = '';
    }));
    data._meals.forEach(item => {
      const c = document.getElementById('rows-' + item.meal + '-' + item.opt);
      if (!c) return;
      addFoodRow(item.meal, item.opt);
      const row = c.lastElementChild;
      if (!row) return;
      const nameEl  = row.querySelector('.food-search');
      const qtyEl   = row.querySelector('.food-qty-input');
      const qtyLabel = row.querySelector('.food-qty-label');
      const tbspEl  = row.querySelector('.food-tbsp-input');
      const tbspWrap = row.querySelector('.food-tbsp-wrap');
      if (nameEl) nameEl.value = item.name || '';
      if (qtyEl)  qtyEl.value  = item.grams || '';
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
  // Restore carb-cycling weekly schedule
  if (Array.isArray(data._ccWeek) && data._ccWeek.length === 7) {
    window._ccWeek = data._ccWeek.slice();
  } else {
    window._ccWeek = ['M','M','M','M','M','M','M'];
  }
  // Restore carb cycling options
  window._ccOpts = (data._ccOpts && typeof data._ccOpts === 'object')
    ? { base: data._ccOpts.base || 'M', showKcal: !!data._ccOpts.showKcal }
    : { base: 'M', showKcal: false };
  const _cOptSel = document.getElementById('cc-opt-base');
  if (_cOptSel) _cOptSel.value = window._ccOpts.base;
  if (typeof ccLocalizeOptions === 'function') ccLocalizeOptions();
  // 🍩 Restore free-meal flags (old clients default to none)
  window._freeMeals = (data._freeMeals && typeof data._freeMeals === 'object') ? data._freeMeals : {};
  applyFreeMealChips();
  if (typeof ccRenderWeek === 'function') ccRenderWeek();
  calcBMR(); macroLockSyncInputs(); macroLockUpdateStatus(); ccSync();
  if (window.syncPreview) { const _orig = window._chSkipAutoSave; window._chSkipAutoSave = true; syncPreview(); window._chSkipAutoSave = _orig; }
  updateGrandTotal();
  chUpdateTopbar();
  // ⚠ re-pin allergen hints for the loaded client + plan
  if (typeof allergyScanAll === 'function') setTimeout(allergyScanAll, 80);
}

function chSaveClient(id) {
  const db = chGetAll();
  const data = chCollect();
  const name = data['c-name'] || 'Unnamed';
  if (!id) { id = 'cl_' + Date.now(); data._createdAt = Date.now(); }
  data._id = id; data._name = name;
  db[id] = data; chSaveAll(db); chSetActive(id); chUpdateTopbar();
  return id;
}

function chLoadClient(id) {
  const db = chGetAll();
  if (!db[id]) { toast('Client not found', 'error'); return; }
  chApply(db[id]); chSetActive(id); chUpdateTopbar();
  showPage('client');
  toast('✅ Loaded: ' + (db[id]._name || 'Client'), 'success');
}

function chDeleteClient(id) {
  const db = chGetAll();
  const name = db[id]?._name || 'this client';
  if (!confirm('Delete ' + name + '? This cannot be undone.')) return;
  delete db[id]; chSaveAll(db);
  if (chGetActive() === id) { localStorage.removeItem(CLIENT_ACTIVE_KEY); chUpdateTopbar(); }
  rosterRender(); toast('Client deleted', 'info');
}

function chDuplicateClient(id) {
  const db = chGetAll();
  if (!db[id]) return;
  const copy = JSON.parse(JSON.stringify(db[id]));
  const newId = 'cl_' + Date.now();
  copy._id = newId;
  copy._name = (copy['c-name'] || 'Client') + ' (Copy)';
  copy['c-name'] = copy._name;
  copy._createdAt = Date.now(); copy._savedAt = Date.now();
  db[newId] = copy; chSaveAll(db); rosterRender();
  toast('✅ Client duplicated', 'success');
}

function newClientFlow() {
  const curName = document.getElementById('c-name')?.value?.trim();
  if (curName) {
    chSaveClient(chGetActive() || null);
    toast('✅ Previous client auto-saved', 'success');
  }
  const clearIds = [
    'c-name','c-name-ar','c-age','c-goal','c-phase','c-injuries','c-allergies',
    'ib-weight','ib-height','ib-bf','ib-smm','ib-fatmass','ib-bmi','ib-tbw',
    'ib-protein-kg','ib-vfl','ib-score','ib-age','ib-date',
    't-cal','t-prot','t-carbs','t-fats','t-water','t-traintime',
    'cc-H-cal','cc-H-prot','cc-H-carbs','cc-H-fats',
    'cc-M-cal','cc-M-prot','cc-M-carbs','cc-M-fats',
    'cc-L-cal','cc-L-prot','cc-L-carbs','cc-L-fats','coach-notes'
  ];
  clearIds.forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  document.getElementById('supp-rows').innerHTML = ''; addSuppRow();
  if (window.MEALS_DEF && window.OPTS_DEF) {
    MEALS_DEF.forEach(m => OPTS_DEF.forEach(o => { const el = document.getElementById('rows-'+m.id+'-'+o.n); if(el) el.innerHTML=''; }));
  }
  localStorage.removeItem(CLIENT_ACTIVE_KEY);
  // Reset custom meal names to defaults
  window._mealNames = {};
  window._mealNameSubs = {};
  if (window.MEALS_DEF) {
    MEALS_DEF.forEach(m => {
      const inp = document.getElementById('meal-name-input-'+m.id);
      if (inp) inp.value = m.label;
      const sub = document.getElementById('meal-sub-input-'+m.id);
      if (sub) sub.value = m.sub;
    });
  }
  chUpdateTopbar(); calcBMR(); syncPreview(); updateGrandTotal();
  showPage('client');
  toast('🆕 New client workspace ready', 'success');
}

function chUpdateTopbar() {
  const pill = document.getElementById('topbar-client-pill');
  const nameEl = document.getElementById('topbar-client-name');
  const metaEl = document.getElementById('topbar-client-meta');
  const name = document.getElementById('c-name')?.value?.trim();
  const goal = document.getElementById('c-goal')?.value?.trim();
  const cal  = document.getElementById('t-cal')?.value?.trim();
  if (name && pill) {
    pill.style.display = 'flex';
    nameEl.textContent = name;
    metaEl.textContent = [goal, cal ? cal+' kcal' : ''].filter(Boolean).join(' · ') || 'No targets set';
  } else if (pill) {
    pill.style.display = 'none';
  }
}

// Auto-save on typing (debounced 3s)
let _chAutoTimer = null;
function chAutoSave() {
  if (window._chSkipAutoSave) return;
  clearTimeout(_chAutoTimer);
  _chAutoTimer = setTimeout(() => {
    const name = document.getElementById('c-name')?.value?.trim();
    if (!name) return;
    chSaveClient(chGetActive() || null);
  }, 3000);
}

// Patch syncPreview to also auto-save + update topbar
const _chOrigSync = window.syncPreview;
window.syncPreview = function() {
  if (_chOrigSync) _chOrigSync.apply(this, arguments);
  chUpdateTopbar();
  chAutoSave();
};

// ─── ROSTER RENDER ──────────────────────────────────────────
function rosterRender() {
  const db = chGetAll();
  const search = (document.getElementById('roster-search')?.value || '').toLowerCase().trim();
  const grid = document.getElementById('roster-grid');
  const empty = document.getElementById('roster-empty');
  const activeId = chGetActive();
  if (!grid) return;

  let clients = Object.values(db).sort((a, b) => (b._savedAt||0) - (a._savedAt||0));
  const total = clients.length;
  const loss  = clients.filter(c => (c['c-goal']||'').toLowerCase().match(/loss|cut|تخسيس|حرق/)).length;
  const gain  = clients.filter(c => (c['c-goal']||'').toLowerCase().match(/gain|bulk|mass|ضخامة|عضلات/)).length;

  const _set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  _set('rs-total', total); _set('rs-loss', loss); _set('rs-gain', gain); _set('rs-other', total - loss - gain);

  if (search) clients = clients.filter(c =>
    (c['c-name']||'').toLowerCase().includes(search) ||
    (c['c-name-ar']||'').includes(search) ||
    (c['c-goal']||'').toLowerCase().includes(search) ||
    (c['c-phase']||'').toLowerCase().includes(search)
  );

  grid.innerHTML = '';
  if (!total) { grid.style.display = 'none'; empty.style.display = 'block'; return; }
  grid.style.display = 'grid'; empty.style.display = 'none';

  if (!clients.length) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:30px;color:#444;font-size:13px;">No clients match your search.</div>';
    return;
  }

  clients.forEach(c => {
    const isActive = c._id === activeId;
    const name = c['c-name'] || 'Unnamed';
    const goal = c['c-goal'] || '—';
    const gl = goal.toLowerCase();
    let gc = '#555', gb = 'rgba(85,85,85,0.1)';
    if (gl.match(/loss|cut|تخسيس/))      { gc = '#f87171'; gb = 'rgba(248,113,113,0.1)'; }
    else if (gl.match(/gain|bulk|ضخامة/)) { gc = '#4ade80'; gb = 'rgba(74,222,128,0.1)'; }
    else if (gl.match(/maintain|recomp/)) { gc = '#00CFFF'; gb = 'rgba(0,207,255,0.1)'; }

    const cal = c['t-cal'] || '—';
    const prot = c['t-prot'] ? c['t-prot']+'g' : '—';
    const weight = c['ib-weight'] ? c['ib-weight']+' kg' : '—';
    const bf = c['ib-bf'] ? c['ib-bf']+'%' : '—';
    const savedDate = c._savedAt ? new Date(c._savedAt).toLocaleDateString('en-GB') : '—';
    const phase = c['c-phase'] || '';
    const nameAr = c['c-name-ar'] || '';

    const card = document.createElement('div');
    card.style.cssText = `background:var(--card);border:1px solid ${isActive?'rgba(245,255,0,0.4)':'var(--border2)'};position:relative;overflow:hidden;transition:border-color .2s;`;
    card.innerHTML = `
      ${isActive
        ? '<div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#F5FF00,#FFD700);"></div>'
        : '<div style="position:absolute;top:0;left:0;width:3px;height:100%;background:'+gc+';"></div>'}
      <div style="padding:16px 18px;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;">
          <div>
            <div style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:17px;color:#e0e0e0;letter-spacing:1px;line-height:1.2;">${name}</div>
            ${nameAr ? '<div style="font-size:12px;color:#555;direction:rtl;margin-top:2px;">'+nameAr+'</div>' : ''}
            ${isActive ? '<div style="font-size:9px;color:#F5FF00;letter-spacing:2px;text-transform:uppercase;margin-top:4px;">● ACTIVE</div>' : ''}
          </div>
          <div style="display:flex;gap:4px;flex-shrink:0;">
            <button onclick="chDuplicateClient('${c._id}')" title="Duplicate" style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);color:#444;width:28px;height:28px;cursor:pointer;font-size:13px;border-radius:3px;transition:color .15s;" onmouseover="this.style.color='#F5FF00'" onmouseout="this.style.color='#444'">⧉</button>
            <button onclick="chDeleteClient('${c._id}')" title="Delete" style="background:rgba(248,113,113,0.04);border:1px solid rgba(248,113,113,0.12);color:#444;width:28px;height:28px;cursor:pointer;font-size:13px;border-radius:3px;transition:color .15s;" onmouseover="this.style.color='#f87171'" onmouseout="this.style.color='#444'">✕</button>
          </div>
        </div>
        <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:12px;">
          <span style="background:${gb};border:1px solid ${gc}40;color:${gc};padding:2px 8px;font-family:'Barlow Condensed',sans-serif;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:2px;">${goal}</span>
          ${phase ? '<span style="background:rgba(245,255,0,0.05);border:1px solid rgba(245,255,0,0.12);color:#777;padding:2px 8px;font-family:\'Barlow Condensed\',sans-serif;font-size:11px;letter-spacing:1px;border-radius:2px;">'+phase+'</span>' : ''}
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:14px;">
          ${[['kcal',cal,'#F5FF00'],['Protein',prot,'#00CFFF'],['Weight',weight,'#aaa'],['BF%',bf,'#aaa']].map(([lbl,val,col])=>`
            <div style="background:rgba(0,0,0,0.3);padding:7px 4px;text-align:center;border-radius:2px;">
              <div style="font-family:'Bebas Neue',sans-serif;font-size:17px;color:${col};line-height:1;">${val}</div>
              <div style="font-size:8px;color:#444;letter-spacing:1px;text-transform:uppercase;">${lbl}</div>
            </div>`).join('')}
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div style="font-size:10px;color:#333;">Saved ${savedDate}</div>
          <button onclick="chLoadClient('${c._id}')" style="background:${isActive?'rgba(245,255,0,0.12)':'rgba(255,255,255,0.04)'};border:1px solid ${isActive?'rgba(245,255,0,0.3)':'rgba(255,255,255,0.09)'};color:${isActive?'#F5FF00':'#888'};padding:6px 16px;font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;border-radius:2px;transition:all .15s;">
            ${isActive ? '✓ ACTIVE' : 'LOAD →'}
          </button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

// Patch showPage to refresh roster + inbody chart
const _chOrigShow = window.showPage;
window.showPage = function(page) {
  if (_chOrigShow) _chOrigShow.apply(this, arguments);
  if (page === 'roster') setTimeout(rosterRender, 50);
  if (page === 'inbody') setTimeout(renderInBodyChart, 100);
};

// Init on load — restore active client
document.addEventListener('DOMContentLoaded', () => {
  const activeId = chGetActive();
  if (activeId) {
    const db = chGetAll();
    if (db[activeId]) chApply(db[activeId]);
  }
  chUpdateTopbar();
});
