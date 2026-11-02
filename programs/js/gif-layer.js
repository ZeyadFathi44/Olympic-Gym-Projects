(function(){

/* ══════════════════════════════════════════════════════════
   1. EXERCISE GIF DATABASE
   ─────────────────────────────────────────────────────────
   ▶ PASTE YOUR FULL GIF DATABASE INTO THIS OBJ:

   var EX_GIFS = {
     'Bench Press'      : 'https://your-host.com/gifs/bench-press.gif',
     'Lat Pulldown'     : 'https://your-host.com/gifs/lat-pulldown.gif',
     // ... one line per exercise, exact name as in the builder
   };

   Names must match the exercise names in the database exactly
   (capitalisation does not need to match — lookup is normalised).
   Olympic + Corrective exercises stay linked to their YouTube
   form videos automatically — no gif entries needed for them.
   Your pasted list can also be imported as a JSON file
   ({ "Exercise Name": "https://...gif", ... }) via the
   ‘Load GIF Database’ button on the Athlete page.
══════════════════════════════════════════════════════════ */
var EX_GIFS = {
};

var GIF_LS_KEY  = 'olympic_gym_gifdb_v1';
var _normGifs   = {};   // normalised lookup: 'benchpress' -> url
window.__gifCustom = _normGifs;   // shared with V2.6 layer

function normKey(n){
  return String(n||'').toLowerCase().replace(/[^a-z0-9]/g,'');
}
function rebuildGifIndex(){
  _normGifs = {};
  Object.keys(EX_GIFS).forEach(function(k){
    if (EX_GIFS[k]) _normGifs[normKey(k)] = EX_GIFS[k];
  });
}
function mergeGifDb(obj){
  Object.keys(obj||{}).forEach(function(k){ EX_GIFS[k] = obj[k]; });
  rebuildGifIndex();
  persistGifDb();
}
function persistGifDb(){
  try { localStorage.setItem(GIF_LS_KEY, JSON.stringify(EX_GIFS)); } catch(e){}
}
function loadGifDb(){
  try { var s = localStorage.getItem(GIF_LS_KEY); if (s) mergeGifDb(JSON.parse(s)); }
  catch(e){}
  rebuildGifIndex();
}
loadGifDb();

var _ytMap = null;
var _ytArr = null;      /* [{name, toks, yt}] for smart matching */
var _ytSmart = {};      /* memo for smart fallback results */
var ALIAS = { db:'dumbbell', dbs:'dumbbells', bb:'barbell' };
function buildYtIndex(){
  _ytMap = {}; _ytArr = []; _ytSmart = {};
  Object.keys(EX_DB).forEach(function(mg){
    EX_DB[mg].forEach(function(ex){
      if (!ex.yt) return;
      var k = normKey(ex.name);
      if (k && !_ytMap[k]) _ytMap[k] = ex.yt;
      var toks = String(ex.name).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().split(' ')
        .filter(Boolean).map(function(t){ return ALIAS[t] || t; });
      if (toks.length) _ytArr.push({ toks: toks, yt: ex.yt });
    });
  });
}
function getYtFor(name){
  if (!_ytMap) buildYtIndex();
  var k = normKey(name);
  if (_ytMap[k]) return _ytMap[k];
  if (_ytSmart[k] !== undefined) return _ytSmart[k];
  /* smart fallback: every word of the query must match a word of the db entry
     (equal, or one is a 3+ char prefix of the other); closest = fewest words */
  var qt = String(name).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().split(' ').filter(Boolean)
    .map(function(t){ return ALIAS[t] || t; });
  if (!qt.length) { _ytSmart[k] = null; return null; }
  var tk = function(t){ return t.length >= 3; };
  var hit = function(t, q){ return t === q || (t.length>=3 && q.length>=3 && (t.indexOf(q)===0 || q.indexOf(t)===0)); };
  var best = null, bestN = 99;
  for (var i = 0; i < _ytArr.length; i++) {
    var e = _ytArr[i], ok = true;
    for (var j = 0; j < qt.length && ok; j++) {
      var q = qt[j], found = false;
      for (var m = 0; m < e.toks.length; m++) {
        if (hit(e.toks[m], q) && (tk(q) || q.length >= 3 || e.toks[m] === q)) { found = true; break; }
      }
      if (!found) ok = false;
    }
    if (ok && e.toks.length < bestN) { bestN = e.toks.length; best = e.yt; }
  }
  _ytSmart[k] = best || null;
  return _ytSmart[k];
}
window.__getYtFor = getYtFor;   // shared with V2.6 layer

/* Resolve the "watch link" for any exercise: gif first, youtube fallback */
window.getExerciseLink = function(name){
  var n = normKey(name);
  if (_normGifs[n]) return { type:'gif', url:_normGifs[n] };
  var yt = getYtFor(name);
  return yt ? { type:'yt', url:yt } : null;
};

/* ── 2. GIF VIEWER MODAL ───────────────────────────────────── */
(function(){
  if (document.getElementById('gif-modal')) return;
  var m = document.createElement('div');
  m.className = 'gif-modal'; m.id = 'gif-modal';
  m.innerHTML =
    '<div class="gif-box">' +
      '<button class="gif-x" onclick="closeGifViewer()">&#x2715;</button>' +
      '<div class="gif-name" id="gif-name"></div>' +
      '<div class="gif-muscle" id="gif-muscle"></div>' +
      '<img class="gif-img" id="gif-img" alt="Exercise animation">' +
      '<div class="gif-note" id="gif-note"></div>' +
    '</div>';
  document.body.appendChild(m);
  m.addEventListener('click', function(e){ if (e.target === m) closeGifViewer(); });
})();
window.closeGifViewer = function(){ document.getElementById('gif-modal').classList.remove('show'); };
window.openGifViewer = function(exName, muscle){
  var link = getExerciseLink(exName);
  if (!link) { showToast('No demo available for: ' + exName); return; }
  if (link.type === 'yt') { window.open(link.url, '_blank'); return; }
  document.getElementById('gif-name').textContent = exName;
  document.getElementById('gif-muscle').textContent = (muscle || '') + (muscle ? ' \u2022 ' : '') + 'ANIMATED DEMO';
  var img = document.getElementById('gif-img');
  img.src = link.url;
  document.getElementById('gif-note').textContent = 'Watch the full movement path, copy it, then train \u2014 Olympic Gym';
  document.getElementById('gif-modal').classList.add('show');
};

/* ── 3. GOAL → VOLUME PRESET AUTO-APPLY ────────────────────── */
window.v2OnGoalChange = function(goal){
  var map = { 'hypertrophy':'hypertrophy', 'strength':'strength', 'endurance':'endurance', 'fat-loss':'fatloss' };
  var p = map[goal];
  if (p && typeof applyVolPreset === 'function') {
    Object.keys(VOL_PRESETS[p]).forEach(function(mg){ STATE.coachVol[mg] = VOL_PRESETS[p][mg].slice(); });
    if (document.getElementById('page-analytics').classList.contains('active')) buildAnalytics();
    if (typeof buildVolOverrideGrid === 'function') buildVolOverrideGrid();
    showToast('Volume targets updated for goal \u2713');
  }
};

/* ── 4. EXERCISE DB MODAL: GIF THUMBS + NAMES BESIDE GIFS ──── */
window.renderExDBList = function(query) {
  var listEl = document.getElementById('exdb-list');
  if (!listEl) return;
  var q = (query || '').toLowerCase().trim();
  var html = '';
  var mgs = _exdbActiveMG === 'All' ? Object.keys(EX_DB) : [_exdbActiveMG];
  if (_exdbActiveMG === 'All') {
    /* keep Olympic + Corrective at the bottom, main muscle groups first */
    mgs = mgs.filter(function(mg){ return mg!=='Olympic' && mg!=='Corrective'; })
             .concat(['Olympic','Corrective'].filter(function(mg){ return EX_DB[mg]; }));
  }
  var count = 0;
  mgs.forEach(function(mg) {
    var exs = EX_DB[mg] || [];
    exs.forEach(function(ex) {
      var name = ex.name;
      if (q && normKey(name).indexOf(normKey(q)) === -1) return;
      var col  = MG_COLOR[mg] || '#555';
      var link = getExerciseLink(name);
      html += '<div class="exdb-item" onclick="selectExFromDB(\'' + escHtml(name).replace(/'/g,'\\\'') + '\',\'' + mg + '\',\'' + escHtml(ex.yt||'') + '\')">';
      if (link && link.type === 'gif') {
        html += '<img class="exdb-thumb" loading="lazy" src="'+escHtml(link.url)+'" alt="'+escHtml(name)+' demo" onclick="event.stopPropagation();openGifViewer(\'' + escHtml(name).replace(/'/g,'\\\'') + '\',\'' + mg + '\')">';
      }
      html += '<span class="exdb-item-name">'+escHtml(name)+'</span>';
      if (link && link.type === 'gif') {
        html += '<span class="exdb-gifbtn" onclick="event.stopPropagation();openGifViewer(\'' + escHtml(name).replace(/'/g,'\\\'') + '\',\'' + mg + '\')" title="View animated demo">\u25B6 GIF</span>';
      }
      if (ex.yt) {
        html += '<a href="'+escHtml(ex.yt)+'" target="_blank" onclick="event.stopPropagation()" style="color:#ff4444;font-size:13px;text-decoration:none;flex-shrink:0;padding:2px 6px;border:1px solid #ff444433;border-radius:2px;font-family:Barlow Condensed,sans-serif;font-size:11px;letter-spacing:1px" title="Preview form video">&#x25B6; FORM</a>';
      }
      html += '<span class="exdb-item-mg" style="background:'+col+'22;color:'+col+'">'+mg+'</span>';
      html += '</div>';
      count++;
    });
  });
  if (!count) html = '<div style="text-align:center;padding:40px;color:#333;font-size:13px">No exercises found</div>';
  listEl.innerHTML = html;
};

/* ── 5. BUILDER ROWS: ▶ GIF DEMO BUTTON ────────────────────── */
var _v25RenderDays = window.renderDays;
window.renderDays = function(){
  _v25RenderDays();
  var area = document.getElementById('day-content');
  if (!area || !STATE.days.length) return;
  var d = STATE.days[STATE.activeDay];
  if (!d) return;
  area.querySelectorAll('.ex-row').forEach(function(row){
    var exId = parseInt(row.getAttribute('data-exid'), 10);
    var ec1 = row.querySelector('.ec1');
    var ex = d.exercises.find(function(e){ return e.id===exId; });
    if (!ec1 || !ex) return;
    var btn = document.createElement('button');
    btn.className = 'ic-btn';
    btn.title = 'View animated demo (GIF / video)';
    btn.innerHTML = '\u25B6';
    btn.style.color = '#7fbdff';
    btn.style.fontSize = '15px';
    btn.setAttribute('onclick', 'openGifViewer.apply(null, v2ExInfo('+d.id+','+exId+'))');
    var firstBtn = ec1.querySelector('.ic-btn');
    if (firstBtn) ec1.insertBefore(btn, firstBtn); else ec1.appendChild(btn);
  });
};
window.v2ExInfo = function(dayId, exId){
  var d = STATE.days.find(function(d){ return d.id===dayId; });
  var e = d && d.exercises.find(function(e){ return e.id===exId; });
  return e ? [e.name, e.muscle] : ['', ''];
};

/* ── 6. GIF DATABASE BACKUP BUTTONS (Athlete page) ─────────── */
var backupCard = document.getElementById('v2-import-file');
if (backupCard && backupCard.closest('.card')) {
  var row = backupCard.closest('.card').querySelector('div[style*="flex-wrap"]');
  if (row) {
    var gifBtn = document.createElement('button');
    gifBtn.className = 'btn btn-o btn-sm';
    gifBtn.innerHTML = '\uD83E\uDDE9 Load GIF Database';
    gifBtn.setAttribute('onclick', "document.getElementById('v2-gifdb-file').click()");
    var gifCount = document.createElement('span');
    gifCount.id = 'gifdb-count';
    gifCount.style.cssText = 'font-size:10px;color:#555;letter-spacing:1px';
    var gifFile = document.createElement('input');
    gifFile.type = 'file'; gifFile.id = 'v2-gifdb-file'; gifFile.accept = '.json,application/json';
    gifFile.style.display = 'none';
    gifFile.setAttribute('onchange', 'v2ImportGifDb(this)');
    row.appendChild(gifBtn); row.appendChild(gifCount); row.appendChild(gifFile);
    refreshGifCount();
  }
}
function refreshGifCount(){
  var c = document.getElementById('gifdb-count');
  if (c) c.textContent = Object.keys(EX_GIFS).length + ' gifs loaded';
}
window.v2ImportGifDb = function(inp){
  var f = inp.files && inp.files[0];
  if (!f) return;
  var reader = new FileReader();
  reader.onload = function(ev){
    try {
      var obj = JSON.parse(ev.target.result);
      mergeGifDb(obj);
      refreshGifCount();
      showToast(Object.keys(obj).length + ' exercise gifs linked \u2713');
    } catch(e) { showToast('GIF import failed \u2014 invalid JSON'); }
  };
  reader.readAsText(f);
  inp.value = '';
};

/* ── 7. .DOCX EXPORT: clickable exercise names ─────────────── */
window.exportDocx = async function() {
  if (!STATE.days.length) { showToast('Add training days first'); return; }
  document.getElementById('loading').classList.add('show');
  await new Promise(function(r) { setTimeout(r, 60); });
  try {
    var D   = docx;
    var Doc = D.Document,   Pkr = D.Packer,      Par = D.Paragraph,  TxR = D.TextRun;
    var Tbl = D.Table,      TR  = D.TableRow,     TC  = D.TableCell,  ImgR = D.ImageRun;
    var AT  = D.AlignmentType, BS = D.BorderStyle, WT = D.WidthType;
    var ST  = D.ShadingType,   VA = D.VerticalAlign, Hdr = D.Header, Ftr = D.Footer;
    var XHL = D.ExternalHyperlink;

    var THM = (window.EXPORT_THEMES||{})[STATE.exportTheme] || (window.EXPORT_THEMES||{}).original;
    var Y=THM.accent, BK=THM.bg, D2=THM.panel, D3=THM.panel2, D4=THM.panel3, WH=THM.text;
    var GR='4ADE80', BL='00CFFF', OR='FF8C42', RE='F87171';

    var nb   = { style:BS.NONE,   size:0,  color:'FFFFFF' };
    var nbs  = { top:nb, bottom:nb, left:nb, right:nb };
    var thn  = { style:BS.SINGLE, size:1,  color:THM.border };
    var thns = { top:thn, bottom:thn, left:thn, right:thn };
    var yb   = { style:BS.SINGLE, size:1,  color:THM.accentDim };
    var yThk = { style:BS.THICK,  size:18, color:Y };
    var yTop = { style:BS.SINGLE, size:8,  color:Y };

    var PW  = 12240, PH  = 15840, MAR = 1080;
    var TW  = PW - MAR * 2;

    var logoBytes = Uint8Array.from(atob(LOGO_B64), function(c) { return c.charCodeAt(0); });

    function R(txt, o) { return new TxR(Object.assign({ text:txt, font:'Arial', size:20, color:THM.rowText }, o || {})); }
    function RB(txt, o) { return R(txt, Object.assign({ bold:true }, o || {})); }
    function AR(txt, o) { return new TxR(Object.assign({ text:txt, font:'Arial', size:20, color:THM.rowText, rightToLeft:true }, o || {})); }

    function P(ch, o) {
      o = o || {};
      return new Par({ alignment: o.align || AT.LEFT, spacing:{ after: o.after||0, before: o.before||0 }, children: ch });
    }
    function PC(ch, o) { return P(ch, Object.assign({ align: AT.CENTER }, o || {})); }
    function AP(ch, o) { return new Par({ bidirectional:true, alignment:AT.RIGHT, spacing:{ after:(o&&o.after)||0, before:(o&&o.before)||0 }, children:ch }); }
    function SP(pt) { return new Par({ spacing:{ before:pt||130, after:0 }, children:[ new TxR('') ] }); }
    function LBL(txt) { return new Par({ spacing:{ before:0, after:120 }, children:[ R(txt, { size:16, color:'555533', allCaps:true }) ] }); }
    function RULE() {
      return new Par({ spacing:{ before:160, after:160 }, border:{ bottom:{ style:BS.SINGLE, size:8, color:Y, space:1 } }, children:[ new TxR('') ] });
    }

    function C(children, w, o) {
      o = o || {};
      return new TC({
        width: { size:w, type:WT.DXA },
        shading: { fill: o.fill || BK, type: ST.CLEAR },
        margins: { top: o.mt||110, bottom: o.mb||110, left: o.ml||160, right: o.mr||160 },
        verticalAlign: o.va || VA.CENTER,
        borders: o.borders || thns,
        columnSpan: o.span,
        children: children
      });
    }

    /* ── clickable exercise-name paragraph-------------------------------- */
    /* resolves the demo link for the exercise and wraps the name in an
       external hyperlink so clients can tap it in Word */
    /* GIF exercises: animated GIFs CANNOT play inside Word — and the local
       GIF file path (file:///…) only exists on the coach's PC. So we export
       the hosted GIF URL if a 🌐 GIF Hosting base is configured, otherwise
       a YouTube search link for that exercise (always works on any device). */
    var LINK_COL  = '7FBDFF';
    var GIFL_COL  = '4ADE80';
    function demoUrlFor(e) {
      var link = e.name ? getExerciseLink(e.name) : null;
      if (!link) return null;
      if (link.type === 'yt') return link.url;
      if (link.type === 'gif') {
        if (/^https?:\/\//i.test(link.url)) return link.url;   /* hosted GIF = works anywhere */
        return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(e.name + ' exercise form tutorial');
      }
      return link.url;
    }
    function nameChild(num, e) {
      var label = (num ? num + '. ' : '') + (e.name || '\u2014');
      var url   = demoUrlFor(e);
      if (!url) return AP([ AR(label, { size:19, color:THM.rowText }) ]);
      var col = getExerciseLink(e.name || '').type === 'gif' ? GIFL_COL : LINK_COL;
      var run = AR(label, { size:19, color:col, underline:{ type:'single', color:col } });
      return AP([ new XHL({ children:[ run ], link: url }) ]);
    }

    var goalMap = { hypertrophy:'Muscle Hypertrophy', strength:'Strength', endurance:'Muscular Endurance', 'fat-loss':'Fat Loss' };
    var cn  = STATE.client.name || 'ATHLETE';
    var np  = cn.trim().split(' ');
    var cfn = np[0].toUpperCase();
    var cln = np.slice(1).join(' ').toUpperCase();

    var pageHdr = new Tbl({
      width:{ size:TW, type:WT.DXA }, columnWidths:[1100, 7200, 1780],
      rows:[ new TR({ children:[
        C([ PC([ new ImgR({ data:logoBytes, transformation:{ width:72, height:55 }, type:'png' }) ]) ],
          1100, { fill:BK, borders:nbs, mt:0, mb:0, ml:0, mr:200 }),
        C([
          P([ R('OLYMPIC GYM  \u2014  TRAINING PROGRAM', { size:16, color:THM.label, allCaps:true }) ], { after:40 }),
          P([ RB(cfn+' ', { size:54, font:'Arial Black', color:WH }), RB(cln, { size:54, font:'Arial Black', color:Y }) ], { after:40 }),
          P([ R('PERSONALISED TRAINING PLAN  |  MADE BY COACH LOAI HASSAN', { size:15, color:THM.muted, allCaps:true }) ]),
        ], TW-1100-1780, { fill:BK, borders:nbs, mt:0, mb:0 }),
        C([
          PC([ R('GOAL', { size:14, color:THM.label, allCaps:true }) ], { after:40 }),
          PC([ RB(goalMap[STATE.client.goal] || STATE.client.goal || '\u2014', { size:18, font:'Arial Black', color:Y }) ], { after:60 }),
          PC([ R('LEVEL', { size:14, color:THM.label, allCaps:true }) ], { after:40 }),
          PC([ RB(STATE.client.level || 'Intermediate', { size:18, font:'Arial Black', color:Y }) ]),
        ], 1780, { fill:D3, borders:nbs, mt:60, mb:60, ml:120, mr:120 }),
      ]}) ]
    });

    var splitNames = { ul4:'Upper / Lower (4 days)', ppl3:'Push/Pull/Legs (3 days)', ppl6:'Push/Pull/Legs (6 days)', fb3:'Full Body (3 days)', arnold6:'Arnold Split (6 days)', arnold3:'Arnold Split (3 days)', bro5:'Body Part Split (5 days)', ul3:'Upper/Lower/Full (3 days)', phul4:'PHUL Power/Hypertrophy (4 days)', phat5:'PHAT Power/Hypertrophy (5 days)', split531:'5/3/1 Wendler Strength (4 days)', batman5:'Batman Split (5 days)' };
    var periodNames = { linear:'Linear Progression', wave:'Wave Loading', dup:'Daily Undulating (DUP)', block:'Block Periodization' };
    var IBW = [2200,2840,2200,2840];

    function ihc(txt, w) {
      return C([ P([ RB(txt, { size:17, color:Y, allCaps:true }) ]) ], w,
        { fill:THM.accentDark, borders:{ top:yb, bottom:{ style:BS.SINGLE,size:4,color:Y }, left:thn, right:thn }, mt:90, mb:90 });
    }
    function ivc(val, w) {
      return C([ PC([ R(val, { size:20, color:THM.rowText }) ]) ], w,
        { fill:D2, borders:thns, mt:90, mb:90 });
    }

    var summaryRows = [];
    summaryRows.push(new TR({ children:[ C([
      P([ RB('PROGRAM OVERVIEW', { size:22, font:'Arial Black', color:Y, allCaps:true }) ])
    ], TW, { fill:D3, borders:{ top:yTop, bottom:yb, right:yb, left:yThk }, mt:130, mb:130, ml:200, mr:200, span:4 }) ]}));

    var infoRows = [
      ['Athlete',       cn || '\u2014',                                  'Program Name', STATE.program.name || 'Training Program'],
      ['Age',           (STATE.client.age  ? STATE.client.age+' yrs' : '\u2014'),    'Duration',   STATE.program.weeks+' Weeks'],
      ['Weight',        (STATE.client.weight ? STATE.client.weight+' kg' : '\u2014'),'Days / Week',STATE.program.daysPerWeek],
      ['Height',        (STATE.client.height ? STATE.client.height+' cm' : '\u2014'),'Split Type', splitNames[STATE.program.split] || STATE.program.split],
      ['Training Goal', goalMap[STATE.client.goal] || '\u2014',                      'Periodization', periodNames[STATE.program.periodization] || STATE.program.periodization],
      ['Training Level',STATE.client.level || '\u2014',                              'Total Days', STATE.days.length+' training days'],
    ];
    infoRows.forEach(function(r) {
      summaryRows.push(new TR({ children:[ ihc(r[0],IBW[0]), ivc(r[1],IBW[1]), ihc(r[2],IBW[2]), ivc(r[3],IBW[3]) ] }));
    });

    if (STATE.client.injuries) {
      summaryRows.push(new TR({ children:[ C([
        P([ RB('INJURIES / RESTRICTIONS: ', { size:17, color:Y }), R(STATE.client.injuries, { size:17, color:THM.muted2 }) ]),
      ], TW, { fill:D4, borders:{ top:{ style:BS.SINGLE,size:4,color:Y }, bottom:yb, right:yb, left:yThk }, mt:110, mb:110, ml:180, mr:180, span:4 }) ]}));
    }

    var summaryTable = new Tbl({ width:{ size:TW, type:WT.DXA }, columnWidths:IBW, rows:summaryRows });

    /* ── volume analytics table ── */
    var vol = calcVolume();
    var VOL_COLS = [2520, 1680, 1680, 4200];
    var volRows = [];

    volRows.push(new TR({ children:[ C([
      P([ RB('WEEKLY VOLUME SUMMARY', { size:20, font:'Arial Black', color:Y, allCaps:true }) ])
    ], TW, { fill:D3, borders:{ top:yTop, bottom:yb, right:yb, left:yThk }, mt:120, mb:120, ml:200, mr:200, span:4 }) ]}));

    volRows.push(new TR({ tableHeader:true, children:[
      C([ P([ RB('MUSCLE GROUP', { size:16, color:BK, allCaps:true }) ]) ], VOL_COLS[0], { fill:Y, borders:nbs, mt:100, mb:100 }),
      C([ PC([ RB('SETS/WK',    { size:16, color:BK, allCaps:true }) ]) ], VOL_COLS[1], { fill:Y, borders:nbs, mt:100, mb:100 }),
      C([ PC([ RB('TARGET',     { size:16, color:BK, allCaps:true }) ]) ], VOL_COLS[2], { fill:Y, borders:nbs, mt:100, mb:100 }),
      C([ PC([ RB('STATUS',     { size:16, color:BK, allCaps:true }) ]) ], VOL_COLS[3], { fill:Y, borders:nbs, mt:100, mb:100 }),
    ]}));

    var statusColors = { none:THM.muted, low:RE, optimal:GR, high:OR };
    var statusText   = { none:'Not Trained', low:'Under-Trained', optimal:'Optimal \u2713', high:'Over-Trained' };

    Object.keys(VOL_OPT).forEach(function(mg, mi) {
      var sets   = vol[mg] || 0;
      var rng    = window.getVolTarget ? getVolTarget(mg) : VOL_OPT[mg];
      var status = volumeStatus(mg, sets);
      var scol   = statusColors[status];
      var stxt   = statusText[status];
      var bg     = mi % 2 === 0 ? D3 : D2;
      volRows.push(new TR({ children:[
        C([ P([ RB(mg, { size:18, color:WH }) ]) ], VOL_COLS[0], { fill:bg, borders:thns, mt:90, mb:90 }),
        C([ PC([ RB(String(sets), { size:22, color: sets===0?'444444':(status==='optimal'?GR:(status==='low'?RE:OR)) }) ]) ], VOL_COLS[1], { fill:bg, borders:thns, mt:90, mb:90 }),
        C([ PC([ R(rng[0]+'\u2013'+rng[1], { size:17, color:THM.muted2 }) ]) ], VOL_COLS[2], { fill:bg, borders:thns, mt:90, mb:90 }),
        C([ P([ R(stxt, { size:17, color:scol }) ]) ], VOL_COLS[3], { fill:bg, borders:thns, mt:90, mb:90 }),
      ]}));
    });

    var volTable = new Tbl({ width:{ size:TW, type:WT.DXA }, columnWidths:VOL_COLS, rows:volRows });

    /* ── training day tables: VERTICAL weeks — one week per page, per-set input rows ── */
    var dayBlocks = [];
    var weeksN = Math.min(parseInt(STATE.program.weeks,10) || 8, 16);
    var EXW = 3880, WL = 1650, WF = 1650, WR = 1500, RIRW = 1400;   /* exercise | from last week | weight | reps | rir */
    var EX_COLS = [EXW, WL, WF, WR, RIRW];
    var NCOL = 5;

    Array.from({ length: weeksN }, function(_, wi){ return wi + 1; }).forEach(function(weekNum) {
    var wkPrefix = 'W' + weekNum + ' — ';
    var isW1 = weekNum === 1;
    STATE.days.forEach(function(day, di) {
      var exRows = [];

      var loadStr = day.loadStatus ? (' — Load: ' + day.loadStatus) : '';
      var loadNote = day.loadNote || '';
      exRows.push(new TR({ children:[ C([
        AP([ AR(wkPrefix + day.label + loadStr, { bold:true, size:28, color:Y }) ]),
        P([ R(day.muscle || '', { size:18, color:THM.muted2 }) ], { before:40 }),
        loadNote ? P([ R('📋 ' + loadNote, { size:16, color:THM.label, italics:true }) ], { before:30 }) : null,
      ].filter(Boolean), TW, { fill:D3, borders:{ top:yTop, bottom:yb, right:yThk, left:yb }, mt:130, mb:130, ml:180, mr:200, span:NCOL }) ]}));

      exRows.push(new TR({ tableHeader:true, children:[
        C([ AP([ AR('التمرين — SET', { bold:true, size:17, color:BK, allCaps:true }) ]) ], EXW, { fill:Y, borders:nbs, mt:90, mb:90 }),
        C([ PC([ RB(isW1 ? 'FROM LAST WEEK\n(W1: START)' : 'FROM LAST WEEK\n(copy W'+(weekNum-1)+')', { size:12, color:THM.writeTx, allCaps:true }) ]) ], WL, { fill:THM.writeBg, borders:nbs, mt:90, mb:90 }),
        C([ PC([ RB('WEIGHT\n(kg)', { size:13, color:BK, allCaps:true }) ]) ], WF, { fill:Y, borders:nbs, mt:90, mb:90 }),
        C([ PC([ RB('REPS', { size:13, color:BK, allCaps:true }) ]) ], WR, { fill:Y, borders:nbs, mt:90, mb:90 }),
        C([ PC([ RB('RIR', { size:13, color:BK, allCaps:true }) ]) ], RIRW, { fill:Y, borders:nbs, mt:90, mb:90 }),
      ]}));

      day.exercises.forEach(function(e, ei) {
        var bg  = ei % 2 === 0 ? D3 : D2;
        var num = ei + 1;
        var ytLink = getExerciseLink(e.name || '');
        var ytRow = (ytLink && ytLink.type === 'yt') ? P([ R('▶ Form Video: ', { size:15, color:THM.muted, italics:true }), R(ytLink.url, { size:14, color:'4488CC', italics:true }) ], { before:20 }) : null;
        var nSets = Math.max(1, parseInt(e.sets) || 1);
        var firstInfo = [
          nameChild(num, e),
          P([ R((e.sets||'')+' sets • rest '+(e.rest||'—')+' • '+(e.rpe?'RPE '+e.rpe:''), { size:15, color:THM.muted2 }) ], { before:30 }),
          e.note ? P([ R(e.note, { size:16, color:THM.muted, italics:true }) ], { before:20 }) : null,
          e.muscle ? P([ R(e.muscle, { size:15, color:Y }) ], { before:20 }) : null,
          ytRow,
        ].filter(Boolean);
        for (var s0 = 1; s0 <= nSets; s0++) {
          var first = s0 === 1;
          var cells = [ C(
            first ? firstInfo : [ PC([ R('SET '+s0, { size:16, color:THM.muted2, allCaps:true }) ]) ],
            EXW, { fill:bg, borders:thns, mt:first?100:70, mb:first?100:70, ml:160, mr:160 }
          ) ];
          cells.push(C([ P([ R('', { size:18 }) ]) ], WL,   { fill:THM.writeCell, borders:{ top:thn, bottom:thn, left:{ style:BS.SINGLE,size:4,color:THM.writeBg }, right:thn }, mt:100, mb:100 }));
          cells.push(C([ P([ R('', { size:18 }) ]) ], WF,   { fill:THM.writeCell, borders:{ top:thn, bottom:thn, left:thn, right:thn }, mt:100, mb:100 }));
          cells.push(C([ P([ R('', { size:18 }) ]) ], WR,   { fill:THM.writeCell, borders:{ top:thn, bottom:thn, left:thn, right:thn }, mt:100, mb:100 }));
          cells.push(C([ P([ R('', { size:18 }) ]) ], RIRW, { fill:THM.writeCell, borders:{ top:thn, bottom:thn, left:thn, right:{ style:BS.SINGLE,size:4,color:THM.writeBg } }, mt:100, mb:100 }));
          exRows.push(new TR({ children:cells }));
        }
      });

      var totalSets = day.exercises.reduce(function(a,e){ return a+(parseInt(e.sets)||0); }, 0);
      exRows.push(new TR({ children:[
        C([ P([ RB(day.exercises.length+' EXERCISES • '+totalSets+' SETS', { size:17, color:Y, allCaps:true }) ]) ], EXW, { fill:D4, borders:{ top:{ style:BS.SINGLE,size:4,color:Y }, bottom:yb, left:yThk, right:thn }, mt:100, mb:100, ml:180, mr:160 }),
        C([ P([ R('', { size:14 }) ]) ], WL+WF+WR+RIRW, { fill:THM.panel3, borders:{ top:{ style:BS.SINGLE,size:4,color:Y }, bottom:yb, left:thn, right:yb }, mt:100, mb:100 }),
      ]}));

      dayBlocks.push(new Tbl({
        width:{ size:TW, type:WT.DXA },
        columnWidths: EX_COLS,
        visuallyRightToLeft: true,
        rows: exRows
      }));

      if (di < STATE.days.length - 1) dayBlocks.push(SP(180));
    });
    if (weekNum < weeksN) dayBlocks.push(D.PageBreak ? new Par({ children:[ new D.PageBreak() ] }) : SP(400));
    });

    /* ── progressive overload notes ── */
    var progMap = {
      linear: 'Add 2.5\u20135 kg to main compound lifts each week. For accessory exercises, add reps before weight (e.g. 3\u00D78 \u2192 3\u00D710 \u2192 3\u00D712, then increase load).',
      wave:   'Week 1: 3\u00D78 @70% | Week 2: 4\u00D76 @75% | Week 3: 5\u00D74 @80% | Week 4: Deload \u2014 then repeat with increased loads.',
      dup:    'Rotate daily: Strength day (3\u20135 reps) \u2192 Hypertrophy day (8\u201312 reps) \u2192 Endurance day (15\u201320 reps). Track all loads.',
      block:  'Block 1 (Wks 1\u20134): Accumulation \u2014 high volume. Block 2 (Wks 5\u20138): Intensification \u2014 heavy loads. Block 3 (Wks 9\u201312): Realization \u2014 peak.',
    };
    var progNote = progMap[STATE.program.periodization] || 'Track every set. Add weight or reps each session.';

    var progTable = new Tbl({
      width:{ size:TW, type:WT.DXA }, columnWidths:[TW],
      rows:[ new TR({ children:[ C([
        P([ RB('PROGRESSIVE OVERLOAD PROTOCOL', { size:18, font:'Arial Black', color:Y, allCaps:true }) ], { after:80 }),
        P([ R(progNote, { size:18, color:THM.muted2, italics:true }) ]),
        P([ R('\u25B6 Tap / click any exercise name in this document to open its animated training demo.', { size:15, color:'4488CC', italics:true }) ], { before:100 }),
      ], TW, { fill:D4, borders:{ top:yb, bottom:yb, right:yb, left:yThk }, mt:160, mb:160, ml:200, mr:200 }) ]}) ]
    });

    /* ── weekly schedule table ── */
    var wkCols = [840, TW-840];
    var wkRows = [];
    wkRows.push(new TR({ children:[
      C([ P([ RB('WEEKLY TRAINING SCHEDULE', { size:20, font:'Arial Black', color:Y, allCaps:true }) ]) ],
        TW, { fill:D3, borders:{ top:yTop, bottom:yb, right:yb, left:yThk }, mt:120, mb:120, ml:200, mr:200, span:2 })
    ]}));
    wkRows.push(new TR({ tableHeader:true, children:[
      C([ PC([ RB('DAY', { size:16, color:BK, allCaps:true }) ]) ], wkCols[0], { fill:Y, borders:nbs, mt:90, mb:90 }),
      C([ P([ RB('SESSION', { size:16, color:BK, allCaps:true }) ]) ], wkCols[1], { fill:Y, borders:nbs, mt:90, mb:90 }),
    ]}));
    STATE.days.forEach(function(d, i) {
      var bg = i%2===0 ? D3 : D2;
      wkRows.push(new TR({ children:[
        C([ PC([ RB('Day '+(i+1), { size:18, color:Y }) ]) ], wkCols[0], { fill:bg, borders:thns, mt:90, mb:90 }),
        C([ P([ RB(d.label, { size:18, color:WH }) ]), P([ R(d.muscle||'', { size:16, color:THM.muted }) ], { before:30 }) ], wkCols[1], { fill:bg, borders:thns, mt:90, mb:90 }),
      ]}));
    });
    var schedTable = new Tbl({ width:{ size:TW, type:WT.DXA }, columnWidths:wkCols, rows:wkRows });

    /* ── assemble document ── */
    var bodyChildren = [
      pageHdr, RULE(),
      LBL('PROGRAM OVERVIEW  \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014'),
      summaryTable, SP(180),
      LBL('WEEKLY SCHEDULE  \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014'),
      schedTable, SP(180),
      LBL('VOLUME ANALYTICS  \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014'),
      volTable, SP(180),
      LBL('TRAINING DAYS & PROGRESS LOG  \u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014\u2014'),
      P([ R('CLIENT: one week per page — for every SET: copy the weight × reps you finished LAST week with into FROM LAST WEEK, then write what you actually did: WEIGHT (kg), REPS and RIR. Week 1 = your starting weights. From week 2 on you always continue from the numbers you reached the week before — the weeks are connected, so you never restart from zero.', { size:16, color:THM.muted, italics:true }) ], { before:60, after:60 }),
    ];
    dayBlocks.forEach(function(b) { bodyChildren.push(b); });
    bodyChildren.push(SP(180));
    bodyChildren.push(progTable);
    bodyChildren.push(SP(160));
    bodyChildren.push(PC([ new ImgR({ data:logoBytes, transformation:{ width:100, height:77 }, type:'png' }) ]));
    bodyChildren.push(PC([ R('OLYMPIC GYM  |  Performance Training  |  Coach Loai Hassan', { size:16, color:THM.muted, allCaps:true }) ], { before:60 }));

    var doc = new Doc({
      background: { color: BK },
      sections:[{
        properties:{
          page:{ size:{ width:PW, height:PH }, margin:{ top:MAR, right:MAR, bottom:MAR, left:MAR } }
        },
        headers:{ default: new Hdr({ children:[
          new Par({ border:{ bottom:{ style:BS.SINGLE, size:8, color:Y, space:6 } }, spacing:{ after:0 }, children:[ new TxR('') ] })
        ]})},
        footers:{ default: new Ftr({ children:[
          new Par({ border:{ top:{ style:BS.SINGLE, size:8, color:Y, space:6 } }, alignment:AT.CENTER, spacing:{ before:80 }, children:[
            new TxR({ text:'OLYMPIC GYM  |  Coach Loai Hassan  |  Training Program  |  '+(STATE.client.name||'Athlete'), size:15, font:'Arial', color:THM.muted, allCaps:true })
          ] })
        ]})},
        children: bodyChildren
      }]
    });

    var fname = (STATE.client.name||'Athlete').replace(/\s+/g,'_') + '_Training_Program.docx';
    var b64   = await Pkr.toBase64String(doc);
    _dlB64 = b64; _dlFile = fname;

    var isIOS    = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    var isSafari = !!navigator.userAgent.match(/Version\/[\d.]+.*Safari/);

    if (!isIOS && !isSafari) {
      var bytes = Uint8Array.from(atob(b64), function(c) { return c.charCodeAt(0); });
      var blob  = new Blob([bytes], { type:'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      var url   = URL.createObjectURL(blob);
      var a     = document.createElement('a');
      a.href = url; a.download = fname;
      document.body.appendChild(a); a.click();
      setTimeout(function() { document.body.removeChild(a); URL.revokeObjectURL(url); }, 2000);
      showToast('Exported: ' + fname + ' \u2713');
    } else {
      openDocxSheet();
    }

  } catch(err) {
    console.error('Export error:', err);
    showToast('Error: ' + err.message.substring(0, 60));
  }
  document.getElementById('loading').classList.remove('show');
};

})();
