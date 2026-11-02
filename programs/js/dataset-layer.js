(function(){

/* V2.8: GIF dataset removed — but this layer still powers YouTube links,
   recommended rest times, muscle-group mapping and the exercise modal. */

/* ── A. DATASET INDEXES ─────────────────────────────────────── */
/* EDS entry: [id, name, gifPath, thumbPath, equipment, category, target, muscle_group, steps(en)] */
var GIF_BASE_DIR = 'exercises-dataset-main';   // folder that ships next to this HTML

var EDS_NORM = {};
window.EDS_NORM = EDS_NORM; // debug
function dsNorm(n){ return String(n||'').toLowerCase().replace(/[^a-z0-9]/g,''); }
(function(){
  EDS.forEach(function(e, idx){ if (e[1]) EDS_NORM[dsNorm(e[1])] = idx; });
})();

/* find a dataset exercise from any name (exact, then contains) */
function matchDataset(name){
  var n = dsNorm(name);
  if (!n) return null;
  if (EDS_NORM[n] !== undefined) return EDS[EDS_NORM[n]];
  var best = null, bestLen = 9999;
  Object.keys(EDS_NORM).forEach(function(k){
    if (k.indexOf(n) > -1 || n.indexOf(k) > -1) {
      var e = EDS[EDS_NORM[k]];
      if (e[1].length < bestLen) { best = e; bestLen = e[1].length; }
    }
  });
  return best;
}
/* absolute URL for a dataset gif/thumb */
var _gifBaseURL = null; // optional hosting override, set via UI (GIF_FOLDER_BASE)
function mediaURL(path){
  if (localStorage.getItem('olympic_gym_gifbase')) return localStorage.getItem('olympic_gym_gifbase').replace(/\/$/,'') + '/' + path;
  try { return new URL(GIF_BASE_DIR + '/' + path, location.href).href; }
  catch(e) { return GIF_BASE_DIR + '/' + path; }
}

/* dataset category+target → app muscle group */
function dsToMG(cat, target){
  cat = (cat||'').toLowerCase(); target = (target||'').toLowerCase();
  if (cat==='chest') return 'Chest';
  if (cat==='back') return 'Back';
  if (cat==='shoulders') return 'Shoulders';
  if (cat==='waist') return 'Core';
  if (cat==='cardio') return 'Cardio';
  if (cat==='neck') return 'Traps';
  if (cat==='lower arms') return 'Forearms';
  if (cat==='lower legs') return 'Calves';
  if (cat==='upper arms') return target.indexOf('triceps')>-1 ? 'Triceps' : 'Biceps';
  if (cat==='upper legs') {
    if (target.indexOf('hamstring')>-1 || target.indexOf('femoris')>-1) return 'Hamstrings';
    if (target.indexOf('glute')>-1 || target.indexOf('abductor')>-1) return 'Glutes';
    if (target.indexOf('calf')>-1) return 'Calves';
    return 'Quads'; // quadriceps + adductors + everything else
  }
  return '';
}

/* equipment label normalisation */
function dsEquipLabel(eq){
  eq = (eq||'').toLowerCase();
  if (eq.indexOf('body')>-1) return 'Body Weight';
  if (eq.indexOf('smith')>-1) return 'Smith';
  if (eq.indexOf('leverage')>-1 || eq.indexOf('machine')>-1) return 'Machine';
  if (eq.indexOf('ez')>-1) return 'EZ Bar';
  if (eq.indexOf('barbell')>-1) return 'Barbell';
  if (eq.indexOf('dumbbell')>-1) return 'Dumbbell';
  if (eq.indexOf('cable')>-1) return 'Cable';
  if (eq.indexOf('kettlebell')>-1) return 'Kettlebell';
  if (eq.indexOf('band')>-1) return 'Band';
  if (eq.indexOf('ball')>-1) return 'Ball';
  if (eq.indexOf('weighted')>-1) return 'Weighted';
  return 'Other';
}
var EQUIPS = ['All','Barbell','Dumbbell','Cable','Machine','Smith','Body Weight','Band','Kettlebell','EZ Bar','Weighted','Ball','Other'];

/* Olympic & Corrective groups must always stay on YouTube */
var YT_ONLY = {};
(function(){
  ['Olympic','Corrective','Cardio'].forEach(function(mg){
    (EX_DB[mg]||[]).forEach(function(ex){ if (mg==='Olympic'||mg==='Corrective') YT_ONLY[dsNorm(ex.name)] = true; });
  });
})();

/* ── B. OVERRIDE getExerciseLink (V2.8: GIF dataset removed) ── */
/* Every exercise now resolves to its YouTube form video directly. */
window.getExerciseLink = function(name){
  if (!dsNorm(name)) return null;
  var yt = window.__getYtFor(name);
  return yt ? { type:'yt', url:yt } : null;
};

/* ── C. GIF VIEWER: steps + equipment + target ──────────────── */
window.openGifViewer = function(exName, muscle){
  var link = getExerciseLink(exName);
  if (!link) { showToast('No demo available for: ' + exName); return; }
  if (link.type === 'yt') { window.open(link.url, '_blank'); return; }
  var e = link.entry || matchDataset(exName);
  document.getElementById('gif-name').textContent = exName;
  document.getElementById('gif-muscle').innerHTML =
    (e && e[6] ? e[6].charAt(0).toUpperCase()+e[6].slice(1)+' \u2022 ' : '') +
    (e ? dsEquipLabel(e[4]) : '') + ' \u2022 ANIMATED DEMO';
  var img = document.getElementById('gif-img');
  img.src = link.url;
  var note = document.getElementById('gif-note');
  if (e && e[8] && e[8].length) {
    note.style.textAlign = 'right';
    note.innerHTML = '<div style="font-size:10px;color:var(--y);letter-spacing:2px;text-transform:uppercase;margin-bottom:6px">HOW TO PERFORM</div>' +
      e[8].map(function(s,i){ return '<div style="display:flex;gap:8px;margin-bottom:5px;text-align:left"><b style="color:var(--y);min-width:16px">'+(i+1)+'.</b><span style="direction:ltr">'+s+'</span></div>'; }).join('');
  } else {
    note.textContent = 'Copy the movement path, then train \u2014 Olympic Gym';
  }
  document.getElementById('gif-modal').classList.add('show');
};

/* ── D. RECOMMENDED REST ────────────────────────────────────── */
window.getRecommendedRest = function(e){
  var n = (e.name||'').toLowerCase();
  var mg = e.muscle||'';
  var big  = /squat|deadlift|hip thrust|clean|jerk|snatch|five|dip/.test(n);
  var comp = /squat|deadlift|press|row|bench|pull-up|chin-up|lunge|step-up|shrug|pullover/.test(n);
  var core = mg==='Core' || /plank|sit-up|crunch|hollow|v-up|leg raise|knee raise|ab wheel|russian twist/.test(n);
  var iso  = /curl|pushdown|extension|fly|raise|wrist|kickback|pull-apart|laterial|lateral/.test(n);
  var base;
  if (core) base = '60s';
  else if (big) base = '3 min';
  else if (comp) base = '2 min';
  else if (iso) base = '60s';
  else base = '90s';
  var g = STATE.client.goal;
  if (g === 'strength' && (big || comp)) base = big ? '3-4 min' : '2-3 min';
  if ((g === 'fat-loss' || g === 'endurance') && big) base = '90s';
  if ((g === 'fat-loss' || g === 'endurance') && comp) base = '60-90s';
  return base;
};

/* ── E. BUILDER: name typing → dataset muscle + auto rest ───── */
var _v26UpdateExName = window.updateExName;
window.updateExName = function(dayId, exId, inputEl){
  _v26UpdateExName(dayId, exId, inputEl);
  var d = STATE.days.find(function(d){ return d.id===dayId; });
  if (!d) return;
  var e = d.exercises.find(function(e){ return e.id===exId; });
  if (!e || !e.name) return;
  if (e.muscle && e.muscle !== '') { /* EX_DB already detected */ }
  else {
    var m = matchDataset(e.name);
    if (m) {
      var mg = dsToMG(m[5], m[6]);
      if (mg && !e.muscle) {
        e.muscle = mg;
        var sel = document.getElementById('badge-'+exId);
        if (sel) { sel.value = mg; var col = MG_COLOR[mg]||'#333'; sel.style.background=col+'22'; sel.style.color=col; sel.style.borderColor=col+'44'; }
      }
    }
  }
  if (!e.rest) { e.rest = getRecommendedRest(e); var ri = document.getElementById && document.querySelector('[data-exid="'+exId+'"] .ec5 input'); if (ri) ri.value = e.rest; }
};

/* ── F. SPLIT APPLY → refresh rests to recommended ──────────── */
var _v26ApplySplit = window.applySplit;
window.applySplit = function(){
  var key = gv('split-select') || STATE.program.split;
  _v26ApplySplit();
  /* keep Days/Week in sync with the applied split */
  if (SPLITS[key] && STATE.days.length) {
    STATE.program.daysPerWeek = STATE.days.length;
    var pDays = document.getElementById('p-days');
    if (pDays) pDays.value = String(STATE.days.length);
  }
  var refreshed = 0;
  STATE.days.forEach(function(d){
    d.exercises.forEach(function(e){
      var rec = getRecommendedRest(e);
      if (rec && e.rest !== rec) { e.rest = rec; refreshed++; }
    });
  });
  renderDays();
  if (refreshed) showToast('Split applied \u2014 rest times set to recommended ('+refreshed+' updated)');
};

/* ── G. BUILDER: ℞ Auto-Rest button + rest placeholders ─────── */
var _v26RenderDays = window.renderDays;
window.renderDays = function(){
  _v26RenderDays();
  var area = document.getElementById('day-content');
  if (!area || !STATE.days.length) return;
  var d = STATE.days[STATE.activeDay];
  if (!d) return;
  /* per-row rest placeholder = recommended + hide YT row when a gif exists */
  area.querySelectorAll('.ex-row').forEach(function(row){
    var exId = parseInt(row.getAttribute('data-exid'),10);
    var e = d.exercises.find(function(x){ return x.id===exId; });
    if (!e) return;
    var restInp = row.querySelector('.ec5 input');
    if (restInp && !restInp.value) restInp.placeholder = 'rec: ' + getRecommendedRest(e);
    var link = e.name ? getExerciseLink(e.name) : null;
    var ytWrap = row.querySelector('.ec7');
    if (ytWrap) {
      var ytDiv = ytWrap.querySelector('div');
      if (ytDiv) {
        if (link && link.type === 'gif') {
          ytDiv.innerHTML = '<span style="font-size:10px;color:var(--green);font-weight:700;letter-spacing:1px">\u25B6 GIF DEMO READY \u2014 TAP \u25B6 TO VIEW</span>';
        } else if (link && link.type === 'yt') {
          var a = link.url;
          ytDiv.innerHTML = '<span style="font-size:10px;color:#555;white-space:nowrap;letter-spacing:1px">YT LINK:</span><input class="fi-ex" value="'+a+'" placeholder="Video link" style="font-size:11px;color:#aaa" onchange="updateEx('+d.id+','+exId+',\'ytLink\',this.value)">';
        }
      }
    }
  });
  /* ℞ Auto-Rest day button */
  var addBtn = Array.from(area.querySelectorAll('button.btn-o')).find(function(b){ return b.textContent.indexOf('Add Exercise') > -1; });
  if (addBtn && !area.querySelector('.v26-rest-btn')) {
    var b = document.createElement('button');
    b.className = 'btn btn-o v26-rest-btn';
    b.style.cssText = 'margin-top:10px;width:100%';
    b.innerHTML = '\u211E Apply Recommended Rest to All';
    b.setAttribute('onclick', 'v2AutoRestDay('+d.id+')');
    addBtn.parentNode.insertBefore(b, addBtn.nextSibling);
  }
};
window.v2AutoRestDay = function(dayId){
  var d = STATE.days.find(function(d){ return d.id===dayId; });
  if (!d) return;
  d.exercises.forEach(function(e){ e.rest = getRecommendedRest(e); });
  renderDays();
  showToast('Recommended rest applied \u2713');
};

/* ── H. EXERCISE DB: coach DB + 1,324-exercise dataset ──────── */
var _exdbActiveEQ = 'All';
var _exdbMeta = {};   // name -> {mg, img, equip, ds(entry|null)}

/* equipment filter row inside the modal */
(function(){
  var modal = document.querySelector('.exdb-box');
  if (!modal || document.getElementById('exdb-eqfilter')) return;
  var row = modal.querySelector('.exdb-filter');
  var eq = document.createElement('div');
  eq.className = 'exdb-filter'; eq.id = 'exdb-eqfilter';
  row.parentNode.insertBefore(eq, row.nextSibling);
})();

window.buildExDBFilter = function(){
  var fEl = document.getElementById('exdb-filter');
  var mgs = ['All'];
  var mgList = Object.keys(EX_DB);
  if (_exdbActiveMG === 'All') {
    mgs = mgs.concat(mgList.filter(function(mg){ return mg!=='Olympic' && mg!=='Corrective'; }));
    mgs = mgs.concat(['Olympic','Corrective'].filter(function(mg){ return EX_DB[mg]; }));
  } else mgs = mgs.concat(mgList.filter(function(mg){ return mg===_exdbActiveMG; }));
  fEl.innerHTML = mgs.map(function(mg) {
    var col = MG_COLOR[mg] || 'var(--y)';
    var active = mg === _exdbActiveMG;
    var count = mg === 'All' ? (
      (function(){
        var c = 0; mgList.forEach(function(k){ c += EX_DB[k].length; }); c += EDS.length; return c;
      })()
    ) : (EX_DB[mg]||[]).length;
    var activeStyle = active ? 'background:'+col+';border-color:'+col+';color:#000' : '';
    return '<button class="exdb-tag'+(active?' active':'')+'" onclick="setExDBFilter(\'' + mg + '\')" style="'+activeStyle+'">' + mg + ' <small style="opacity:.55">('+count+')</small></button>';
  }).join('');

  /* equipment chips — only meaningful with the GIF dataset (now removed) */
  var eqEl = document.getElementById('exdb-eqfilter');
  if (eqEl) eqEl.innerHTML = '';
};

window.setExDBEqFilter = function(q){ _exdbActiveEQ = q; buildExDBFilter(); renderExDBList(document.getElementById('exdb-search').value); };
var _v26SetExDBFilter = window.setExDBFilter;
window.setExDBFilter = function(mg){ _v26SetExDBFilter(mg); };

/* combined render: coach DB + dataset */
window.renderExDBList = function(query) {
  var listEl = document.getElementById('exdb-list');
  if (!listEl) return;
  var q = (query || '').toLowerCase().trim();
  var qn = dsNorm(q);
  /* limit: when searching dataset show max 220 matches */
  var html = '';
  var count = 0;
  var matchedMG = function(mg){ return _exdbActiveMG==='All' || _exdbActiveMG===mg; };
  var matchedEQ = function(eq){ return _exdbActiveEQ==='All' || _exdbActiveEQ===dsEquipLabel(eq); };

  function item(name, mg, img, equip, yt, entry) {
    /* soft cap: browsing everything without a search — keep it fast */
    if (_exdbActiveMG === 'All' && !qn && count >= 400) return;
    _exdbMeta[name] = { mg:mg, img:img, equip:equip, ds:entry, yt:yt };
    var col = MG_COLOR[mg] || '#555';
    var link = getExerciseLink(name);
    var nm = escHtml(String(name)).replace(/'/g,'\\\'');
    html += '<div class="exdb-item" onclick="selectExFromDB(\'' + nm + '\',\'' + mg + '\',\'' + escHtml(yt||'') + '\')">';
    if (link && link.type === 'gif' && img) html += '<img class="exdb-thumb" loading="lazy" src="'+escHtml(img)+'" alt="" onclick="event.stopPropagation();openGifViewer(\''+nm+'\',\''+mg+'\')">';
    else if (link && link.type === 'gif') html += '<img class="exdb-thumb" loading="lazy" src="'+escHtml(link.url)+'" alt="" onclick="event.stopPropagation();openGifViewer(\''+nm+'\',\''+mg+'\')">';
    html += '<span class="exdb-item-name">'+escHtml(name)+'</span>';
    if (equip) html += '<span style="background:#0a1e26;color:#6ec3dd;border:1px solid #14333e;font-size:9px;font-weight:700;padding:2px 7px;border-radius:2px;letter-spacing:1px;flex-shrink:0;white-space:nowrap">'+escHtml(equip)+'</span>';
    if (link && link.type === 'gif') html += '<span class="exdb-gifbtn" onclick="event.stopPropagation();openGifViewer(\''+nm+'\',\''+mg+'\')" title="View animated demo">\u25B6 GIF</span>';
    if (yt && (!link || link.type !== 'gif')) html += '<a href="'+escHtml(yt)+'" target="_blank" onclick="event.stopPropagation()" style="color:#ff4444;font-size:13px;text-decoration:none;flex-shrink:0;padding:2px 6px;border:1px solid #ff444433;border-radius:2px;font-family:Barlow Condensed,sans-serif;font-size:11px;letter-spacing:1px" title="Preview form video">&#x25B6; FORM</a>';
    html += '<span class="exdb-item-mg" style="background:'+col+'22;color:'+col+'">'+mg+'</span>';
    html += '</div>';
    count++;
  }

  /* coach's curated groups first */
  var coachOrder = Object.keys(EX_DB);
  if (_exdbActiveMG === 'All') coachOrder = coachOrder.filter(function(mg){ return mg!=='Olympic' && mg!=='Corrective'; });
  coachOrder.forEach(function(mg) {
    (EX_DB[mg]||[]).forEach(function(ex) {
      if (!matchedMG(mg)) return;
      if (q && dsNorm(ex.name).indexOf(qn) === -1) return;
      var link = getExerciseLink(ex.name);
      var img = (link && link.entry && link.entry[3]) ? mediaURL(link.entry[3]) : '';
      item(ex.name, mg, img, dsEquipLabel(ex.equip || (link && link.entry ? link.entry[4] : '')), ex.yt||'', link && link.entry || null);
    });
  });

  /* Olympic + Corrective ( youtube ) at bottom-of-coach list */
  ['Olympic','Corrective'].forEach(function(mg) {
    if (_exdbActiveMG === 'All' || _exdbActiveMG === mg) {
      (EX_DB[mg]||[]).forEach(function(ex) {
        if (q && dsNorm(ex.name).indexOf(qn) === -1) return;
        item(ex.name, mg, '', '', ex.yt||'', null);
      });
    }
  });

  /* then the full 1,324 dataset (skip names already in coach list) */
  var coachNorm = {};
  coachOrder.concat(['Olympic','Corrective']).forEach(function(mg){ (EX_DB[mg]||[]).forEach(function(ex){ coachNorm[dsNorm(ex.name)] = 1; }); });
  var maxShow = qn ? 200 : 120;
  var shown = 0;
  EDS.forEach(function(m) {
    if (shown >= maxShow) return;
    var name = m[1];
    var mg = dsToMG(m[5], m[6]) || 'Other';
    if (coachNorm[dsNorm(name)]) return;
    if (!matchedMG(mg)) return;
    if (!matchedEQ(m[4])) return;
    if (qn && dsNorm(name).indexOf(qn) === -1) return;
    item(name, mg, mediaURL(m[3]), dsEquipLabel(m[4]), '', m);
    shown++;
  });

  if (!count) html = '<div style="text-align:center;padding:40px;color:#333;font-size:13px">No exercises found \u2014 clear filters or search</div>';
  if (_exdbActiveMG === 'All' && !qn && count >= 400) html += '<div style="text-align:center;padding:14px;color:#333;font-size:11px">Showing first 400 \u2014 use search or a muscle filter to see all '+ (function(){ var c=0; Object.keys(EX_DB).forEach(function(k){ c += EX_DB[k].length; }); return c; })() +' exercises</div>';
  listEl.innerHTML = html;
};
function extraShownShim(){ return 0; }

/* keep search input behaviour */
window.filterExDB = function(){ renderExDBList(document.getElementById('exdb-search').value); };
window.setExDBFilterOriginal = function(mg){ _exdbActiveMG = mg; buildExDBFilter(); renderExDBList(document.getElementById('exdb-search').value); };
/* v2.5-era setExDBFilter already does this — keep chain consistent */
window.setExDBFilter = function(mg){ _exdbActiveMG = mg; buildExDBFilter(); renderExDBList(document.getElementById('exdb-search').value); };

/* ── I. DATALIST: all names (coach + dataset) ───────────────── */
window.buildDatalist = function() {
  var dl = document.getElementById('ex-list-all');
  if (!dl) return;
  var seen = {}; var html = '';
  Object.keys(EX_DB).forEach(function(mg) {
    EX_DB[mg].forEach(function(ex) {
      if (seen[ex.name]) return; seen[ex.name] = 1;
      html += '<option value="' + ex.name + '">' + mg + '</option>';
    });
  });
  EDS.forEach(function(m) {
    if (seen[m[1]]) return; seen[m[1]] = 1;
    html += '<option value="' + m[1] + '">' + dsEquipLabel(m[4]) + ' \u2014 ' + dsToMG(m[5], m[6]) + '</option>';
  });
  dl.innerHTML = html;
};

/* ── J. GIF base URL config — removed (GIF dataset retired) ── */

/* ── K. expose internals for later layers ──────────────────── */
window.__ds = { mediaURL: mediaURL, dsToMG: dsToMG, dsEquipLabel: dsEquipLabel, matchDataset: matchDataset, dsNorm: function(n){ return dsNorm(n); }, YT_ONLY: YT_ONLY, EQUIPS: EQUIPS };
})();
