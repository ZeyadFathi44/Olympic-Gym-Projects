(function(){
if (typeof window.__ds === 'undefined') return;

/* ── 1. STANDALONE DATABASE PAGE ────────────────────────────── */
var main = document.querySelector('.main');
if (main && !document.getElementById('page-db')) {
  main.insertAdjacentHTML('beforeend',
    '<div class="page" id="page-db">' +
    '<div class="sec-title">Exercise Database</div>' +
    '<div class="sec-sub">Every exercise with its form video \u2014 tap to watch the technique</div>' +
    '<div class="divider"></div>' +
    '<input class="dbpage-search" id="dbpage-search" placeholder="Search exercises... (e.g. bench press)" oninput="v2dbRender()">' +
    '<div class="exdb-filter" id="dbpage-mgfilter" style="border-bottom:none;padding:12px 0 4px"></div>' +
    '<div class="exdb-filter" id="dbpage-eqfilter" style="border-bottom:none;padding:0 0 12px"></div>' +
    '<div class="dbpage-grid" id="dbpage-list"></div>' +
    '<div style="font-size:10px;color:#333;margin-top:14px">Tap any card to open its form video on YouTube.</div>' +
    '</div>'
  );
}

var _dbpageMG = 'All';
window.v2dbChips = function(){
  var mgEl = document.getElementById('dbpage-mgfilter');
  var eqEl = document.getElementById('dbpage-eqfilter');
  if (!mgEl) return;
  var list = Object.keys(EX_DB);
  mgEl.innerHTML = list.map(function(mg){
    var col = MG_COLOR[mg] || 'var(--y)';
    var active = mg === _dbpageMG;
    var st = active ? 'background:'+col+';border-color:'+col+';color:#000' : '';
    return '<button class="exdb-tag'+(active?' active':'')+'" onclick="v2dbSetMG(\''+mg+'\')" style="'+st+'">'+mg+'</button>';
  }).join('');
  if (eqEl) eqEl.innerHTML = '';
};
window.v2dbSetMG = function(mg){ _dbpageMG = mg; v2dbChips(); v2dbRender(); };
window.v2dbRender = function(){
  var listEl = document.getElementById('dbpage-list');
  if (!listEl) return;
  var ds = window.__ds;
  var q = document.getElementById('dbpage-search').value.toLowerCase().trim();
  var qn = ds.dsNorm(q);
  var html = '';
  var n = 0, MAX = 700;
  var groups = Object.keys(EX_DB).filter(function(mg){ return _dbpageMG === 'All' || _dbpageMG === mg; });
  groups.forEach(function(mg){
    (EX_DB[mg]||[]).forEach(function(ex){
      if (qn && ds.dsNorm(ex.name).indexOf(qn) === -1) return;
      if (n >= MAX) return;
      var yt = ex.yt || '';
      var vid = (yt.match(/(?:v=|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{11})/) || [])[1];
      var nm = escHtml(String(ex.name)).replace(/'/g,'\\\'');
      var col = MG_COLOR[mg] || '#555';
      html += '<div class="dbpage-card" onclick="v2dbOpen(\''+nm+'\')">';
      if (vid) html += '<img loading="lazy" src="https://i.ytimg.com/vi/'+vid+'/mqdefault.jpg" alt="" onerror="this.style.visibility=\'hidden\'">';
      else html += '<div style="height:110px;background:#111;border:1px solid #1a1a1a;display:flex;align-items:center;justify-content:center;font-size:26px">\u25B6</div>';
      html += '<div class="dbpage-name">'+escHtml(ex.name)+'</div>';
      html += '<div><span style="font-size:9px;font-weight:700;color:'+col+';letter-spacing:1px">'+mg+'</span></div>';
      html += '<div style="margin-top:6px"><span style="font-size:10px;font-weight:700;color:#ff4444;letter-spacing:1px;border:1px solid #ff444433;border-radius:2px;padding:2px 8px">\u25B6 FORM VIDEO</span></div>';
      html += '</div>';
      n++;
    });
  });
  listEl.innerHTML = n ? html : '<div style="color:#333;padding:30px;grid-column:1/-1;text-align:center">No exercises match</div>';
  if (n >= MAX) listEl.insertAdjacentHTML('beforeend', '<div style="color:#555;padding:14px;grid-column:1/-1;text-align:center;font-size:11px">Showing first '+n+' \u2014 use search or a muscle filter to see more</div>');
};
window.v2dbOpen = function(name){
  var link = getExerciseLink(name);
  if (link && link.url) { window.open(link.url, '_blank'); return; }
  window.open('https://www.youtube.com/results?search_query=' + encodeURIComponent(name + ' exercise form tutorial'), '_blank');
};
window.v2dbPage = function(){ v2dbChips(); v2dbRender(); };

/* hook into showPage */
var _v27ShowPage = window.showPage;
window.showPage = function(id){
  _v27ShowPage(id);
  if (id === 'db') window.v2dbPage();
};

/* ── 2. NAV ENTRIES ─────────────────────────────────────────── */
var sidebar = document.querySelector('.sidebar') || document.evaluate ? document.body : null;
if (document.querySelector('.sidebar')) {
  var toolsNi = document.querySelector('.ni[data-page="tools"]');
  if (toolsNi) {
    toolsNi.insertAdjacentHTML('afterend',
      '<div class="ni" onclick="showPage(\'db\')" data-page="db"><span class="ic">\uD83D\uDCDA</span> Database</div>');
  }
}
var bnav = document.querySelector('.bnav');
if (bnav) {
  var volDiv = Array.from(bnav.children).find(function(c){ return c.textContent.toLowerCase().indexOf('volume')>-1; });
  if (volDiv) {
    volDiv.insertAdjacentHTML('beforebegin',
      '<div class="bi" onclick="showPage(\'db\')" data-page="db"><span class="ic">\uD83D\uDCDA</span><span class="lb">Database</span></div>');
  }
}

})();
