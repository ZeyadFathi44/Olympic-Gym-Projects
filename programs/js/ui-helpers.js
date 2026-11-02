function selectSplit(key) {
  document.querySelectorAll('.split-card').forEach(function(c){ c.classList.remove('selected'); });
  var map=['ul4','ppl3','ppl6','fb3'];
  var idx=map.indexOf(key);
  var cards=document.querySelectorAll('.split-card');
  if(idx>=0&&cards[idx]) cards[idx].classList.add('selected');
  var sel=document.getElementById('split-select');
  if(sel) sel.value=key;
  STATE.program.split=key;
}
function highlightSplit(key){ selectSplit(key); }

/* ── Build datalist on load ─────────────────────────────────── */
function buildDatalist() {
  var dl = document.getElementById('ex-list-all');
  if(!dl) return;
  var html = '';
  Object.keys(EX_DB).forEach(function(mg) {
    EX_DB[mg].forEach(function(ex) {
      html += '<option value="' + ex.name + '">' + mg + '</option>';
    });
  });
  dl.innerHTML = html;
}
document.addEventListener('DOMContentLoaded', function() {
  buildDatalist();
});
