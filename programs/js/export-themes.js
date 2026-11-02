(function(){
window.EXPORT_THEMES = {
  original: { name:'Original \u2014 Black & Yellow', bg:'0A0A0A', panel:'1A1A1A', panel2:'131300', panel3:'0D0D00',
    accent:'F5FF00', accentDark:'1C1C00', accentDim:'444400', label:'666633', text:'FFFFFF',
    muted:'555555', muted2:'888888', rowText:'DDDDDD', border:'2A2A2A', writeBg:'CCCC00', writeTx:'333300', writeCell:'111100' },
  clean: { name:'Clean White \u2014 Professional', bg:'FFFFFF', panel:'F5F5F5', panel2:'EFEFEF', panel3:'E4E4E4',
    accent:'111111', accentDark:'E2E2E2', accentDim:'BFBFBF', label:'666666', text:'111111',
    muted:'777777', muted2:'999999', rowText:'333333', border:'DDDDDD', writeBg:'FFE066', writeTx:'5C4A00', writeCell:'FFFDF0' },
  ocean: { name:'Ocean Blue \u2014 Navy', bg:'0B1526', panel:'12233D', panel2:'0E1D33', panel3:'0A1626',
    accent:'4FC3F7', accentDark:'13314B', accentDim:'2A6C96', label:'7FB3D5', text:'F0F6FB',
    muted:'5A7A94', muted2:'8FB0C9', rowText:'D7E5F0', border:'1E3A5C', writeBg:'A5DBF7', writeTx:'0A3040', writeCell:'0F2337' },
  emerald: { name:'Emerald Green \u2014 Dark', bg:'07160F', panel:'0F2A1D', panel2:'0C2318', panel3:'081B12',
    accent:'34D399', accentDark:'11402C', accentDim:'1F6B4A', label:'5FA987', text:'ECFDF5',
    muted:'4E7A64', muted2:'7FAF97', rowText:'CFEDDE', border:'17452F', writeBg:'A7F3D0', writeTx:'064E3B', writeCell:'0A2016' },
  crimson: { name:'Crimson Red \u2014 Dark', bg:'160708', panel:'2A1214', panel2:'230E10', panel3:'1A0A0B',
    accent:'FF6B6B', accentDark:'3B1518', accentDim:'8A3038', label:'C98A8E', text:'FFF5F5',
    muted:'7A5558', muted2:'A97F82', rowText:'F2D9DB', border:'40191C', writeBg:'FFC9C9', writeTx:'5C1010', writeCell:'210C0E' },
};

window.setExportTheme = function(k){
  if (!EXPORT_THEMES[k]) return;
  STATE.exportTheme = k;
  try { localStorage.setItem('olympic_export_theme', k); } catch(e){}
  if (typeof scheduleSave === 'function') scheduleSave();
  showToast('Export theme: ' + EXPORT_THEMES[k].name + ' \u2713');
};

/* restore saved theme */
try {
  var savedT = localStorage.getItem('olympic_export_theme');
  if (savedT && EXPORT_THEMES[savedT]) STATE.exportTheme = savedT;
} catch(e){}
if (!STATE.exportTheme || !EXPORT_THEMES[STATE.exportTheme]) STATE.exportTheme = 'original';

/* inject picker next to the Export button in the topbar */
var topbar = document.querySelector('.topbar');
if (topbar) {
  var expBtn = Array.from(topbar.querySelectorAll('button')).find(function(b){ return b.textContent.indexOf('.docx')>-1; });
  if (expBtn && !document.getElementById('exp-theme')) {
    var sel = document.createElement('select');
    sel.id = 'exp-theme';
    sel.style.cssText = 'background:var(--c2);border:1px solid rgba(255,255,255,.08);color:var(--text);padding:8px 10px;font-size:12px;font-family:Barlow Condensed,sans-serif;font-weight:700;letter-spacing:1px;outline:none;border-radius:2px;margin-right:8px;height:100%';
    sel.onchange = function(){ setExportTheme(this.value); };
    Object.keys(EXPORT_THEMES).forEach(function(k){
      var o = document.createElement('option');
      o.value = k; o.textContent = '\uD83C\uDFA8 ' + EXPORT_THEMES[k].name;
      sel.appendChild(o);
    });
    sel.value = STATE.exportTheme;
    expBtn.parentNode.insertBefore(sel, expBtn);
  }
}
})();
