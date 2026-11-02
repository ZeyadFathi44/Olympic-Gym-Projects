/* ═══════════════════════════════════════════════════════════════
   👥 CLIENTS + 💾 SAVE SLOTS — same system as the Nutrition app
   Each client = a full snapshot of the program STATE. Slots =
   100 quick-save positions. All inline-onclick functions are
   assigned to window so they work inside the merged-file frame.
   ═══════════════════════════════════════════════════════════════ */
(function(){
  var CS_KEY = 'og_clients_prog_v2';
  var CA_KEY = 'og_client_active_prog';
  var SP_KEY = 'og_prog_slot_';
  var SLOTS_MAX = 100;

  function dbAll(){ try { return JSON.parse(localStorage.getItem(CS_KEY) || '{}'); } catch(e){ return {}; } }
  function dbSave(db){ try { localStorage.setItem(CS_KEY, JSON.stringify(db)); } catch(e){ showToast('Storage full — delete an old client','error'); } }
  function getActive(){ try { return localStorage.getItem(CA_KEY) || null; } catch(e){ return null; } }
  function setActive(id){ try { if (id) localStorage.setItem(CA_KEY, id); else localStorage.removeItem(CA_KEY); } catch(e){} }
  function slotCount(){ var n = parseInt((function(){ try { return localStorage.getItem('og_slot_count_prog'); } catch(e){ return ''; } })() || '', 10); return (n >= 4 && n <= SLOTS_MAX) ? n : 20; }
  function setSlotCount(n){ try { localStorage.setItem('og_slot_count_prog', String(n)); } catch(e){} }

  function splitLabel(k){ return (window.splitNames && window.splitNames[k]) || k || '—'; }
  function goalLabel(g){ var m = { hypertrophy:'Hypertrophy', strength:'Strength', endurance:'Endurance', fatloss:'Fat Loss', general:'General Fitness' }; return m[g] || g || '—'; }
  function goalColor(g){ var m = { hypertrophy:'var(--y)', strength:'#00CFFF', endurance:'#FF8C42', fatloss:'#f87171', general:'#4ade80' }; return m[g] || '#555'; }

  function blankState(){
    return {
      client:  { name:'', age:'', weight:'', height:'', goal:'hypertrophy', level:'intermediate', injuries:'' },
      program: { name:'', weeks:8, daysPerWeek:4, split:'ul4', periodization:'linear', startDate:'' },
      days: [], activeDay: 0, coachVol: {}
    };
  }

  var _inRestore = false;

  function snap(){
    var st = JSON.parse(JSON.stringify(STATE));
    return {
      _name:  (((STATE.client||{}).name) || '').trim() || (((STATE.program||{}).name) || '').trim() || 'Unnamed',
      _goal:  (STATE.client  && STATE.client.goal)  || '',
      _split: (STATE.program && STATE.program.split) || '',
      _days:  (STATE.days || []).length,
      _weeks: (STATE.program && STATE.program.weeks) || 8,
      STATE:  st
    };
  }

  function saveClient(id){
    var db = dbAll();
    var s = snap();
    if (!id) { id = 'cl_' + Date.now(); s._id = id; s._createdAt = Date.now(); }
    else { s._id = id; if (db[id]) s._createdAt = db[id]._createdAt; }
    s._savedAt = Date.now();
    db[id] = s; dbSave(db); setActive(id); updateTopbarPill();
    return id;
  }

  /* The builder's restoreState/syncUI/_uid live inside an IIFE and are NOT
     reachable from window — so the restore logic is inlined here, mirroring
     restoreState + syncUI exactly. Ids are renumbered onto a high random base
     so the IIFE's internal _uid counter can never collide with restored ids. */
  function applySnapshot(st){
    if (!st || typeof st !== 'object') return false;
    _inRestore = true;
    try {
      if (st.client)   STATE.client   = st.client;
      if (st.program)  STATE.program  = st.program;
      if (st.days)     STATE.days     = st.days;
      if (st.coachVol) STATE.coachVol = st.coachVol;
      if (!STATE.days) STATE.days = [];
      STATE.activeDay = Math.min(st.activeDay || 0, Math.max(0, STATE.days.length - 1));
      var nid = 1000000 + Math.floor(Math.random() * 1000000);
      STATE.days.forEach(function(d){
        d.id = nid++;
        (d.exercises || []).forEach(function(e){ e.id = nid++; });
      });
      var s = function(id, v){ var el = document.getElementById(id); if (el && v !== undefined && v !== null) el.value = v; };
      s('c-name',   STATE.client.name);
      s('c-age',    STATE.client.age);
      s('c-weight', STATE.client.weight);
      s('c-height', STATE.client.height);
      s('c-goal',   STATE.client.goal);
      s('c-level',  STATE.client.level);
      s('c-injuries', STATE.client.injuries);
      s('p-name',   STATE.program.name);
      s('p-weeks',  STATE.program.weeks);
      s('p-days',   STATE.program.daysPerWeek);
      s('p-period', STATE.program.periodization);
      s('split-select', STATE.program.split);
      window.selectSplit(STATE.program.split || 'ul4');
      if (STATE.coachVol && Object.keys(STATE.coachVol).length && window.buildVolOverrideGrid) window.buildVolOverrideGrid();
      if (window.renderDays) window.renderDays();
      /* persist: the IIFE-internal saveState can't be called from here */
      try { localStorage.setItem('olympic_gym_program_v2', JSON.stringify(STATE)); } catch(e){}
      return true;
    } catch(e){ return false; }
    finally { _inRestore = false; }
  }

  function openClient(id){
    var db = dbAll(); var rec = db[id]; if (!rec) return;
    if (!applySnapshot(rec.STATE)) { showToast('Could not load this client','error'); return; }
    saveState(true); setActive(id); updateTopbarPill(); rosterRenderP();
    showToast('✅ Client loaded: ' + (rec._name || ''), 'success');
  }
  window.chOpenClientP = openClient;

  window.chSaveClientP = function(id){
    var nid = saveClient(id || null);
    rosterRenderP();
    var db = dbAll();
    showToast('💾 Saved: ' + ((db[nid] && db[nid]._name) || 'Client'), 'success');
  };

  window.chDupClientP = function(id){
    var db = dbAll(); if (!db[id]) return;
    var copy = JSON.parse(JSON.stringify(db[id]));
    copy._id = 'cl_' + Date.now();
    copy._name = (copy._name || 'Client') + ' (Copy)';
    copy._createdAt = Date.now(); copy._savedAt = Date.now();
    db[copy._id] = copy; dbSave(db); rosterRenderP();
    showToast('✅ Client duplicated', 'success');
  };

  window.chDelClientP = function(id){
    var db = dbAll();
    var name = (db[id] && db[id]._name) || 'this client';
    if (!confirm('Delete ' + name + '? This cannot be undone.')) return;
    delete db[id]; dbSave(db);
    if (getActive() === id) { setActive(null); updateTopbarPill(); }
    rosterRenderP();
    showToast('Client deleted', 'info');
  };

  window.newClientP = function(){
    var hasWork = ((STATE.client || {}).name || '').trim() ||
                  (STATE.days || []).some(function(d){ return (d.exercises || []).length; });
    if (hasWork) {
      saveClient(getActive() || null);
      showToast('✅ Previous client auto-saved', 'success');
    }
    if (!applySnapshot(blankState())) { showToast('Reset failed','error'); return; }
    saveState(true); setActive(null); updateTopbarPill(); rosterRenderP();
    showPage('client');
    showToast('🆕 New client workspace ready', 'success');
  };

  /* ── topbar pill ── */
  function updateTopbarPill(){
    var pill = document.getElementById('og-cl-pill'); if (!pill) return;
    var id = getActive(); var nm = '';
    if (id) { var db = dbAll(); nm = (db[id] && db[id]._name) || ''; }
    if (!nm) nm = (((STATE.client || {}).name) || '').trim();
    if (nm) {
      pill.style.display = 'inline-flex';
      var n = document.getElementById('og-cl-name');
      if (n) n.textContent = nm;
    } else pill.style.display = 'none';
  }
  window.updateTopbarPill = updateTopbarPill;

  /* ── roster ── */
  window.rosterRenderP = function(){
    var grid  = document.getElementById('clients-grid');
    var empty = document.getElementById('clients-empty');
    var searchEl = document.getElementById('cl-search');
    if (!grid) return;
    var search = ((searchEl && searchEl.value) || '').toLowerCase().trim();
    var clients = Object.values(dbAll()).sort(function(a,b){ return (b._savedAt||0) - (a._savedAt||0); });
    var total = clients.length;
    var hyp = clients.filter(function(c){ return c._goal === 'hypertrophy'; }).length;
    var str = clients.filter(function(c){ return c._goal === 'strength'; }).length;
    var set = function(id, v){ var e = document.getElementById(id); if (e) e.textContent = v; };
    set('cs-total', total); set('cs-hyp', hyp); set('cs-str', str); set('cs-other', total - hyp - str);
    if (search) clients = clients.filter(function(c){
      return ((c._name||'') + ' ' + goalLabel(c._goal) + ' ' + splitLabel(c._split)).toLowerCase().indexOf(search) > -1;
    });
    var activeId = getActive();
    if (!total) { grid.style.display = 'none'; if (empty) empty.style.display = 'block'; return; }
    grid.style.display = 'grid'; if (empty) empty.style.display = 'none';
    if (!clients.length) {
      grid.innerHTML = '';
      if (empty) {
        empty.style.display = 'block';
        empty.innerHTML = '<div style="font-size:30px;margin-bottom:8px">🔍</div>'
          + '<div style="font-family:\'Bebas Neue\',sans-serif;font-size:16px;color:#666;letter-spacing:3px">NO MATCHES</div>'
          + '<div style="font-size:12px;color:#444;margin-top:6px">No client matches "' + search.replace(/</g,'&lt;') + '".</div>';
      }
      return;
    }
    if (empty) empty.innerHTML = '<div style="font-size:38px;margin-bottom:10px">👥</div>'
      + '<div style="font-family:\'Bebas Neue\',sans-serif;font-size:18px;color:#666;letter-spacing:3px">NO CLIENTS YET</div>'
      + '<div style="font-size:12px;color:#444;margin-top:6px">Build a program, type the athlete\'s name on the Athlete page, then tap 💾 on their card or use Save Slots.</div>';
    grid.innerHTML = clients.map(function(c){
      var isA = c._id === activeId;
      var col = goalColor(c._goal);
      var d = c._savedAt ? new Date(c._savedAt).toLocaleDateString('en-GB') : '—';
      return '<div onclick="chOpenClientP(\'' + c._id + '\')" style="cursor:pointer;background:#0f0f0f;border:1px solid ' + (isA ? 'rgba(245,255,0,.4)' : 'var(--border)') + ';border-radius:4px;position:relative;overflow:hidden;transition:border-color .2s">'
        + (isA
            ? '<div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#F5FF00,#FFD700)"></div>'
            : '<div style="position:absolute;top:0;left:0;width:3px;height:100%;background:' + col + '"></div>')
        + '<div style="padding:14px 16px">'
          + '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:6px;margin-bottom:8px">'
            + '<div style="min-width:0">'
              + '<div style="font-family:\'Barlow Condensed\',sans-serif;font-weight:700;font-size:16px;color:#e0e0e0;letter-spacing:1px;line-height:1.25;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + (c._name || 'Unnamed') + '</div>'
              + '<div style="font-size:9px;color:' + col + ';letter-spacing:2px;text-transform:uppercase;margin-top:3px">' + goalLabel(c._goal) + '</div>'
            + '</div>'
            + '<div style="display:flex;gap:4px;flex-shrink:0">'
              + '<button onclick="event.stopPropagation();chSaveClientP(\'' + c._id + '\')" title="Overwrite this client with the current program" style="background:rgba(245,255,0,.06);border:1px solid rgba(245,255,0,.18);color:var(--y);width:26px;height:26px;cursor:pointer;font-size:12px;border-radius:3px">💾</button>'
              + '<button onclick="event.stopPropagation();chDupClientP(\'' + c._id + '\')" title="Duplicate" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:#666;width:26px;height:26px;cursor:pointer;font-size:12px;border-radius:3px">⧉</button>'
              + '<button onclick="event.stopPropagation();chDelClientP(\'' + c._id + '\')" title="Delete" style="background:rgba(248,113,113,.06);border:1px solid rgba(248,113,113,.2);color:#f87171;width:26px;height:26px;cursor:pointer;font-size:12px;border-radius:3px">✕</button>'
            + '</div>'
          + '</div>'
          + '<div style="font-size:11px;color:var(--muted);line-height:1.7">'
            + '<span style="color:#888">' + splitLabel(c._split) + '</span><br>'
            + '<span>' + (c._days || 0) + ' days · ' + (c._weeks || 8) + ' weeks</span>'
          + '</div>'
          + (isA ? '<div style="font-size:9px;color:var(--y);letter-spacing:2px;text-transform:uppercase;margin-top:8px">● ACTIVE</div>' : '')
          + '<div style="font-size:10px;color:#444;margin-top:6px">Saved ' + d + '</div>'
        + '</div>'
      + '</div>';
    }).join('');
  };

  /* ── save slots ── */
  window.saveSlotP = function(i){
    var s = snap(); s._ts = Date.now();
    try { localStorage.setItem(SP_KEY + i, JSON.stringify(s)); }
    catch(e){ showToast('Storage full — clear an old slot','error'); return; }
    showToast('✅ Saved to slot ' + i + ' — ' + s._name, 'success');
    renderSlotsModal();
  };
  window.loadSlotP = function(i){
    var raw = null;
    try { raw = localStorage.getItem(SP_KEY + i); } catch(e){}
    if (!raw) { showToast('This slot is empty', 'info'); return; }
    var d; try { d = JSON.parse(raw); } catch(e){ showToast('Corrupt slot data', 'error'); return; }
    if (!applySnapshot(d.STATE)) { showToast('Could not load this slot','error'); return; }
    saveState(true); setActive(null); updateTopbarPill();
    showToast('✅ Loaded: ' + (d._name || 'Slot ' + i), 'success');
    closeSlotsModal();
  };
  window.delSlotP = function(i){
    try { localStorage.removeItem(SP_KEY + i); } catch(e){}
    renderSlotsModal();
    showToast('Slot ' + i + ' cleared', 'info');
  };
  window.slotsMoreP = function(d){
    var n = slotCount() + d;
    n = Math.max(4, Math.min(SLOTS_MAX, n));
    setSlotCount(n); renderSlotsModal();
  };
  window.openSlotsModal = function(){ renderSlotsModal(); var m = document.getElementById('og-slots-modal'); if (m) m.style.display = 'flex'; };
  window.closeSlotsModal = function(){ var m = document.getElementById('og-slots-modal'); if (m) m.style.display = 'none'; };

  function renderSlotsModal(){
    var grid = document.getElementById('og-slots-grid'); if (!grid) return;
    var count = slotCount();
    var lbl = document.getElementById('og-slot-count');
    if (lbl) lbl.textContent = count + ' / ' + SLOTS_MAX + ' slots';
    var html = '';
    for (var i = 1; i <= count; i++) {
      var rec = null;
      try { var raw = localStorage.getItem(SP_KEY + i); if (raw) rec = JSON.parse(raw); } catch(e){}
      var nm = rec ? (rec._name || '—') : '';
      html += '<button onclick="saveSlotP(' + i + ')" title="' + (rec ? (nm.replace(/"/g,'') + ' — click to overwrite') : 'Empty slot — click to save') + '"'
        + ' style="background:' + (rec ? 'rgba(74,222,128,.07)' : 'rgba(245,255,0,.03)') + ';border:1px solid ' + (rec ? 'rgba(74,222,128,.25)' : 'rgba(255,255,255,.06)') + ';color:' + (rec ? '#4ade80' : '#444') + ';padding:7px 3px;font-family:\'Bebas Neue\',sans-serif;font-size:15px;cursor:pointer;border-radius:3px;overflow:hidden">'
        + '<div style="font-size:13px">' + i + '</div>'
        + '<div style="font-family:\'Barlow\',sans-serif;font-size:8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 2px">' + (rec ? nm.slice(0,10) : 'EMPTY') + '</div>'
        + '</button>';
    }
    grid.innerHTML = html;
    var list = document.getElementById('og-saved-list');
    var emp = document.getElementById('og-slots-empty');
    if (!list) return;
    var rows = '';
    var hasAny = false;
    for (var j = 1; j <= SLOTS_MAX; j++) {
      var raw2 = null; try { raw2 = localStorage.getItem(SP_KEY + j); } catch(e){}
      if (!raw2) continue;
      var d2; try { d2 = JSON.parse(raw2); } catch(e){ continue; }
      hasAny = true;
      var dt = d2._ts ? new Date(d2._ts).toLocaleDateString('en-GB') : '—';
      rows += '<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);margin-bottom:8px;border-radius:4px">'
        + '<div style="width:32px;height:32px;background:rgba(245,255,0,.1);border:1px solid rgba(245,255,0,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:\'Bebas Neue\',sans-serif;color:var(--y);font-size:15px;flex-shrink:0">' + j + '</div>'
        + '<div style="flex:1;min-width:0">'
          + '<div style="font-family:\'Barlow Condensed\',sans-serif;font-weight:700;font-size:14px;color:#e0e0e0;letter-spacing:1px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + (d2._name || 'Unnamed') + '</div>'
          + '<div style="font-size:10px;color:#444;margin-top:2px">' + dt + ' · ' + splitLabel(d2._split) + ' · ' + (d2._days || 0) + ' days</div>'
        + '</div>'
        + '<button onclick="loadSlotP(' + j + ')" style="background:rgba(245,255,0,.1);border:1px solid rgba(245,255,0,.2);color:var(--y);padding:6px 14px;border-radius:4px;cursor:pointer;font-family:\'Barlow Condensed\',sans-serif;font-weight:700;font-size:12px;letter-spacing:1px">LOAD</button>'
        + '<button onclick="delSlotP(' + j + ')" style="background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.2);color:#f87171;padding:6px 10px;border-radius:4px;cursor:pointer;font-size:13px">✕</button>'
        + '</div>';
    }
    list.innerHTML = rows;
    if (emp) emp.style.display = hasAny ? 'none' : 'block';
  }
  window.renderSlotsModal = renderSlotsModal;

  /* ── keep the active client record in sync with autosave ── */
  var _clSyncT = null;
  function syncActiveNow(){
    var id = getActive(); if (!id) return;
    var db = dbAll(); if (!db[id]) return;
    var s = snap(); s._id = id; s._createdAt = db[id]._createdAt; s._savedAt = Date.now();
    db[id] = s; dbSave(db);
  }
  var _origSave = window.saveState; /* may be undefined — the app's real saveState is IIFE-scoped */
  window.saveState = function(silent){
    if (_origSave) { try { _origSave.apply(this, arguments); } catch(e){} }
    if (_inRestore) return;
    try { localStorage.setItem('olympic_gym_program_v2', JSON.stringify(STATE)); } catch(e){}
    if (!getActive()) return;
    clearTimeout(_clSyncT);
    _clSyncT = setTimeout(syncActiveNow, 1500);
  };
  window.addEventListener('beforeunload', function(){
    if (!_inRestore && getActive()) syncActiveNow();
  });

  /* ═══════════ inject the UI ═══════════ */
  /* sidebar item (after Athlete, in the Setup group) */
  var sideA = document.querySelector('.sidebar .ni[data-page="client"]');
  if (sideA) sideA.insertAdjacentHTML('afterend',
    '<div class="ni" onclick="showPage(\'clients\')" data-page="clients"><span class="ic">\uD83D\uDC65</span> Clients</div>');
  /* mobile bottom bar item */
  var bnavA = document.querySelector('.bnav .bi[data-page="client"]');
  if (bnavA) bnavA.insertAdjacentHTML('afterend',
    '<div class="bi" onclick="showPage(\'clients\')" data-page="clients"><span class="ic">\uD83D\uDC65</span><span class="lb">Clients</span></div>');
  /* topbar: active-client pill after the spacer + Clients/Slots buttons before the first button */
  var tb = document.querySelector('.topbar');
  if (tb) {
    var ts = tb.querySelector('.tspace');
    if (ts) ts.insertAdjacentHTML('afterend',
      '<span id="og-cl-pill" onclick="showPage(\'clients\')" style="display:none;align-items:center;gap:8px;padding:5px 12px;background:rgba(245,255,0,.06);border:1px solid rgba(245,255,0,.25);border-radius:999px;cursor:pointer;white-space:nowrap">'
      + '<span style="font-size:10px;color:var(--muted);letter-spacing:2px;">CLIENT</span>'
      + '<span id="og-cl-name" style="font-family:\'Barlow Condensed\',sans-serif;font-weight:700;font-size:12px;color:var(--y);letter-spacing:1px;"></span></span>');
    var firstBtn = tb.querySelector('.btn');
    if (firstBtn) firstBtn.insertAdjacentHTML('beforebegin',
      '<button class="btn btn-o btn-sm" onclick="showPage(\'clients\')">\uD83D\uDC65 Clients</button>'
      + '<button class="btn btn-o btn-sm" onclick="openSlotsModal()">\uD83D\uDCBE Slots</button>');
  }
  /* clients page */
  var main = document.querySelector('.main');
  if (main) main.insertAdjacentHTML('beforeend',
    '<div class="page" id="page-clients">'
    + '<div class="sec-title">Clients</div>'
    + '<div class="sec-sub">Every athlete saved as a card — tap a card to open their program</div>'
    + '<div class="divider"></div>'
    + '<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:14px">'
      + '<button class="btn btn-y btn-sm" onclick="newClientP()">🆕 New Client</button>'
      + '<button class="btn btn-o btn-sm" onclick="openSlotsModal()">💾 Save Slots</button>'
    + '</div>'
    + '<input class="fi" id="cl-search" placeholder="🔍 Search by name, goal, or split..." oninput="rosterRenderP()" style="margin-bottom:14px"/>'
    + '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px">'
      + '<div style="background:#0a0a0a;border:1px solid var(--border);padding:12px;text-align:center;position:relative"><div style="position:absolute;top:0;left:0;width:3px;height:100%;background:var(--y)"></div><div style="font-family:\'Bebas Neue\',sans-serif;font-size:26px;color:var(--y)" id="cs-total">0</div><div style="font-size:9px;color:var(--muted);letter-spacing:2px;text-transform:uppercase">Total Clients</div></div>'
      + '<div style="background:#0a0a0a;border:1px solid var(--border);padding:12px;text-align:center;position:relative"><div style="position:absolute;top:0;left:0;width:3px;height:100%;background:#00CFFF"></div><div style="font-family:\'Bebas Neue\',sans-serif;font-size:26px;color:#00CFFF" id="cs-hyp">0</div><div style="font-size:9px;color:var(--muted);letter-spacing:2px;text-transform:uppercase">Hypertrophy</div></div>'
      + '<div style="background:#0a0a0a;border:1px solid var(--border);padding:12px;text-align:center;position:relative"><div style="position:absolute;top:0;left:0;width:3px;height:100%;background:#FF8C42"></div><div style="font-family:\'Bebas Neue\',sans-serif;font-size:26px;color:#FF8C42" id="cs-str">0</div><div style="font-size:9px;color:var(--muted);letter-spacing:2px;text-transform:uppercase">Strength</div></div>'
      + '<div style="background:#0a0a0a;border:1px solid var(--border);padding:12px;text-align:center;position:relative"><div style="position:absolute;top:0;left:0;width:3px;height:100%;background:#4ade80"></div><div style="font-family:\'Bebas Neue\',sans-serif;font-size:26px;color:#4ade80" id="cs-other">0</div><div style="font-size:9px;color:var(--muted);letter-spacing:2px;text-transform:uppercase">Other Goals</div></div>'
    + '</div>'
    + '<div id="clients-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:12px"></div>'
    + '<div id="clients-empty" style="display:none;text-align:center;padding:56px 20px">'
      + '<div style="font-size:38px;margin-bottom:10px">👥</div>'
      + '<div style="font-family:\'Bebas Neue\',sans-serif;font-size:18px;color:#666;letter-spacing:3px">NO CLIENTS YET</div>'
      + '<div style="font-size:12px;color:#444;margin-top:6px">Build a program, type the athlete\'s name on the Athlete page, then tap 💾 on their card or use Save Slots.</div>'
    + '</div>'
    + '</div>');
  /* save slots modal */
  document.body.insertAdjacentHTML('beforeend',
    '<div id="og-slots-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:9999;align-items:center;justify-content:center;">'
    + '<div style="background:#0f0f0f;border:1px solid rgba(245,255,0,.25);border-radius:10px;width:min(560px,95vw);max-height:88vh;max-height:88dvh;overflow-y:auto;-webkit-overflow-scrolling:touch;box-shadow:0 20px 60px rgba(0,0,0,.9)">'
      + '<div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-bottom:1px solid rgba(245,255,0,.12);background:rgba(245,255,0,.05)">'
        + '<div><div style="font-family:\'Bebas Neue\',sans-serif;font-size:20px;color:var(--y);letter-spacing:2px">💾 SAVE SLOTS</div>'
        + '<div style="font-size:10px;color:#555;letter-spacing:1px;margin-top:2px">Quick-save the current program — saved locally in your browser</div></div>'
        + '<button onclick="closeSlotsModal()" style="background:none;border:none;color:#555;cursor:pointer;font-size:20px;padding:4px 8px">✕</button>'
      + '</div>'
      + '<div style="padding:18px 20px">'
        + '<div style="font-size:10px;color:#555;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px">Quick Save to Slot <span style="color:#333">(tap an empty slot to save · tap a filled slot to overwrite)</span></div>'
        + '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:5px" id="og-slots-grid"></div>'
        + '<div style="display:flex;align-items:center;gap:10px;margin-top:12px">'
          + '<span id="og-slot-count" style="font-size:10px;color:#555;letter-spacing:1px">20 / 100 slots</span>'
          + '<button onclick="slotsMoreP(-4)" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:#888;width:26px;height:22px;cursor:pointer;border-radius:3px;font-size:12px">−</button>'
          + '<button onclick="slotsMoreP(4)" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);color:#888;width:26px;height:22px;cursor:pointer;border-radius:3px;font-size:12px">+</button>'
        + '</div>'
        + '<div style="font-size:10px;color:#555;letter-spacing:2px;text-transform:uppercase;margin:18px 0 10px">Saved Programs</div>'
        + '<div id="og-saved-list"></div>'
        + '<div id="og-slots-empty" style="display:none;text-align:center;padding:30px 10px">'
          + '<div style="font-size:30px;margin-bottom:8px">💾</div>'
          + '<div style="font-size:12px;color:#444">No saved programs yet — tap any slot above to quick-save the current program.</div>'
        + '</div>'
      + '</div>'
    + '</div>'
    + '</div>');
  var sm = document.getElementById('og-slots-modal');
  if (sm) sm.addEventListener('click', function(e){ if (e.target === this) closeSlotsModal(); });

  /* boot */
  rosterRenderP();
  updateTopbarPill();
})();
