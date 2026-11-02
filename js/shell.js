document.getElementById('og-logo').src = OG_SHIELD_B64;
document.getElementById('tb-logo').src = OG_SHIELD_B64;

var EL = {};
EL.programs  = document.getElementById('frame-programs');
EL.nutrition = document.getElementById('frame-nutrition');

var nutriLoaded = false, nutriLoading = false;
function loadNutrition(){
  if (nutriLoaded || nutriLoading) return;
  nutriLoading = true;
  var nb = document.getElementById('og-nboot');
  if (nb) nb.classList.add('show');
  EL.nutrition.src = 'nutrition/index.html';
}

function ogInjectIntoFrame(frameEl, which){
  var doc;
  try { doc = frameEl.contentDocument; } catch(e) { return false; }
  if (!doc || !doc.body || !doc.head) return false;
  if (doc.getElementById('og-liquid')) return true;

  /* ⌨ mobile keyboard stability (Android/Chrome): let the layout resize with the
     keyboard instead of panning a locked non-scrollable layout — a known cause of
     the IME dismissing after each character. */
  var vm = doc.querySelector('meta[name="viewport"]');
  if (vm) {
    var vc = vm.getAttribute('content') || '';
    if (vc.indexOf('interactive-widget') === -1) vm.setAttribute('content', vc + ', interactive-widget=resizes-content');
  }

  /* ⌨ focus keeper — when the app re-renders a row you are typing in (e.g. the
     Supplements timeline rebuilds on each keystroke), the focused input is removed
     from the DOM, focus silently drops (Chrome fires NO focusout on removal) and
     the keyboard closes. A MutationObserver notices the focused element was
     detached and restores focus + caret to its replacement row. */
  (function(){
    var last = null, lastPos = null, pending = 0;
    doc.addEventListener('focusin', function(e){
      var t = e.target;
      if (t && ((t.tagName === 'INPUT') || (t.tagName === 'TEXTAREA') || t.isContentEditable)) {
        last = t;
        lastPos = describe(t);
      }
    }, true);
    /* positional identity: index among inputs under the nearest ancestor with an
       id that survives re-renders (e.g. #vol-coach-overrides, #supp-rows) */
    function describe(t){
      var n = t.parentElement;
      while (n && n !== doc.body) {
        if (n.id) {
          var all = n.querySelectorAll('input,textarea');
          for (var i = 0; i < all.length; i++) { if (all[i] === t) return { root: n.id, idx: i }; }
          return { root: n.id, idx: -1 };
        }
        n = n.parentElement;
      }
      return null;
    }
    function findReplacement(t){
      if (t.id) { var byId = doc.getElementById(t.id); if (byId && byId !== t) return byId; }
      if (t.name) { var nl = doc.getElementsByName(t.name); for (var i = 0; i < nl.length; i++) { if (nl[i] !== t && nl[i].offsetParent !== null) return nl[i]; } }
      if (t.placeholder) {
        var sel2 = t.tagName + '[placeholder="' + String(t.placeholder).replace(/"/g, '\\"') + '"]';
        var cand = doc.querySelectorAll(sel2);
        for (var k = 0; k < cand.length; k++) { if (cand[k] !== t && cand[k].offsetParent !== null) return cand[k]; }
      }
      if (lastPos) {
        var root = doc.getElementById(lastPos.root);
        if (root) {
          var all2 = root.querySelectorAll('input,textarea');
          var cand2 = all2[lastPos.idx];
          if (cand2 && cand2 !== t && cand2.offsetParent !== null) return cand2;
        }
      }
      return null;
    }
    function restore(){
      pending = 0;
      if (!last || last.isConnected) return;
      /* proceed if nothing else took focus: activeElement is body, null, or the
         detached node itself (Chrome keeps it after removal) */
      var t = last;
      var ae = doc.activeElement;
      if (ae && ae !== doc.body && ae !== t && ae.isConnected) return; /* another element legitimately has focus */
      var again = findReplacement(t);
      if (again && !again.disabled && !again.readOnly) {
        /* 📛 focus() must never move the page: restoring focus to a replacement
           row (e.g. after deleting a meal row) used to auto-scroll the app to
           that element — a long scroll jump mid-list. Focus without scroll,
           then restore every scrollable container just in case. */
        var saved = [];
        try {
          var all = doc.querySelectorAll('*');
          for (var i = 0; i < all.length; i++) {
            var e = all[i];
            var st = e.scrollTop, sl = e.scrollLeft;
            if (st || sl) saved.push([e, st, sl]);
          }
        } catch (x) {}
        try { again.focus({ preventScroll: true }); }
        catch (e) { try { again.focus(); } catch (e2) {} }
        try { var L = String(t.value || '').length; if (again.setSelectionRange && again.type !== 'number') again.setSelectionRange(L, L); } catch (x) {}
        if (saved.length) {
          /* settle on the next tick in case the browser still auto-scrolled */
          setTimeout(function(){
            for (var j = 0; j < saved.length; j++) {
              try { saved[j][0].scrollTop = saved[j][1]; saved[j][0].scrollLeft = saved[j][2]; } catch (x) {}
            }
          }, 0);
        }
      }
    }
    new MutationObserver(function(){
      if (last && !last.isConnected && !pending) pending = setTimeout(restore, 20);
    }).observe(doc.documentElement || doc, { childList: true, subtree: true });
  })();

  /* ⌨ root-cause patch (Programs): the Coach Volume Control grid rebuilt its own
     HTML on EVERY keystroke — deleting the focused input, so the keyboard closed
     after one letter. Update state only while typing; refresh the grid + volume
     cards once when the field is left. */
  if (which === 'programs') {
    var psc = doc.createElement('script');
    psc.textContent = "(function(){ if (window.__ogVolPatched) return; window.__ogVolPatched = true; window.setCoachVol = function(mg, idx, val){ if(!STATE.coachVol[mg]) STATE.coachVol[mg] = (VOL_OPT[mg]||[10,20]).slice(); STATE.coachVol[mg][idx] = parseInt(val)||0; }; })();";
    doc.body.appendChild(psc);
    doc.addEventListener('change', function(e){
      var t = e.target;
      if (t && t.tagName === 'INPUT' && t.getAttribute && (t.getAttribute('oninput') || '').indexOf('setCoachVol') > -1) {
        try { if (doc.defaultView.buildAnalytics) doc.defaultView.buildAnalytics(); } catch (x) {}
      }
    }, true);
  }

  /* 1. liquid-glass style marker (stylesheet linked in frame head) */
  var st = doc.createElement('meta');
  st.id = 'og-liquid';
  st.name = 'og-injected';
  st.content = which;
  doc.head.appendChild(st);

  /* 2. app switcher at the top of the left sidebar (same .ni/.nav-item look) */
  var sb = doc.querySelector('nav.sidebar, #sidebar');
  if (sb) {
    var wrap = doc.createElement('div');
    wrap.id = 'og-switch-wrap';
    var cls = which === 'programs' ? 'ni' : 'nav-item';
    var ic  = which === 'programs' ? 'ic'  : 'icon';
    wrap.innerHTML =
      '<div class="' + (which === 'programs' ? 'ns' : 'nav-section') + '" style="margin-top:0">Olympic Projects</div>' +
      '<div class="' + cls + ' og-switch' + (which === 'programs' ? ' active' : '') + '" id="og-sw-programs" onclick="parent.ogShowApp && parent.ogShowApp(\'programs\')"><span class="' + ic + '">\u{1F3CB}\uFE0F</span> Programs</div>' +
      '<div class="' + cls + ' og-switch' + (which === 'nutrition' ? ' active' : '') + '" id="og-sw-nutrition" onclick="parent.ogShowApp && parent.ogShowApp(\'nutrition\')"><span class="' + ic + '">\u{1F957}</span> Nutrition</div>';
    sb.insertBefore(wrap, sb.firstChild);
  }

  if (which === 'programs') {
    /* 3. merge the two Export items into ONE with a choice submenu */
    var nav = doc.querySelectorAll('nav.sidebar .ni');
    var xN = null, dN = null;
    nav.forEach(function(n){
      var t = n.textContent;
      if (t.indexOf('Export .xlsx') > -1) xN = n;
      if (t.indexOf('Export .docx') > -1) dN = n;
    });
    if (xN && dN) {
      var ref = dN.nextSibling;
      var exp = doc.createElement('div');
      exp.innerHTML =
        '<div class="ni" id="og-export" onclick="ogToggleExport()"><span class="ic">\u{1F4E4}</span> Export</div>' +
        '<div class="og-exp" id="og-exp-menu">' +
          '<div class="og-exp-opt" onclick="exportDocx && exportDocx()"><span class="oi">\u{1F4C4}</span> Word File (.docx)</div>' +
          '<div class="og-exp-opt" onclick="exportXlsx && exportXlsx()"><span class="oi">\u{1F4CA}</span> Excel Sheet (.xlsx)</div>' +
        '</div>';
      xN.parentNode.insertBefore(exp, ref);
      xN.remove(); dN.remove();
    }
    var fw = doc.defaultView;
    window.ogToggleExport = function(){
      var m = doc.getElementById('og-exp-menu');
      if (m) m.classList.toggle('show');
    };
    fw.ogToggleExport = window.ogToggleExport;

    /* 4. hamburger + overlay + collapse toggle (Nutrition-style) */
    var tb = doc.querySelector('.topbar');
    if (tb && !doc.querySelector('.og-burger')) {
      var b = doc.createElement('button');
      b.className = 'og-burger'; b.textContent = '\u2630'; b.setAttribute('aria-label','Menu');
      b.onclick = function(){ ogToggleSb(); };
      tb.insertBefore(b, tb.firstChild);
    }
    /* 🛡 shield logo in the topbar — same slot as the Nutrition app */
    if (tb && !doc.getElementById('og-tb-logo')) {
      var lg = doc.createElement('img');
      lg.id = 'og-tb-logo'; lg.alt = '';
      lg.setAttribute('style','height:34px;width:auto;display:block;flex-shrink:0;');
      lg.src = OG_SHIELD_B64;
      var burger = doc.querySelector('.og-burger');
      tb.insertBefore(lg, burger ? burger.nextSibling : tb.firstChild);
    }
    if (!doc.querySelector('.og-sb-overlay')) {
      var ov = doc.createElement('div');
      ov.className = 'og-sb-overlay';
      ov.onclick = function(){ ogCloseSb(); };
      doc.body.appendChild(ov);
    }
    var mob = window.innerWidth < 1020;
    if (mob) doc.body.classList.add('sb-open');   /* start drawer-closed: no class = closed */
    if (mob) doc.body.classList.remove('sb-open');
    window.ogToggleSb = function(){
      if (doc.defaultView.innerWidth < 1020) {
        var open = doc.body.classList.toggle('sb-open');
        var o = doc.querySelector('.og-sb-overlay');
        if (o) o.classList.toggle('show', open);
      } else {
        doc.body.classList.toggle('sb-collapsed');
      }
    };
    fw.ogToggleSb = window.ogToggleSb;
    window.ogCloseSb = function(){
      doc.body.classList.remove('sb-open');
      var o = doc.querySelector('.og-sb-overlay');
      if (o) o.classList.remove('show');
    };
    fw.ogCloseSb = window.ogCloseSb;
    /* auto-close the drawer after a page tap on phone (same as Nutrition) */
    if (sb) sb.addEventListener('click', function(e){
      if (doc.defaultView.innerWidth >= 1020) return;
      var n = e.target && e.target.closest ? e.target.closest('.ni') : null;
      if (n && n.hasAttribute('data-page')) setTimeout(function(){ ogCloseSb(); }, 60);
    });
  } else {
    /* 📱 bottom bar for the Nutrition app — mirrors its sidebar pages, builder-style */
    var bar = doc.createElement('div');
    bar.className = 'og-bnav'; bar.id = 'og-bnav';
    var its = doc.querySelectorAll('#sidebar .nav-item[data-page]');
    var bh = '';
    its.forEach(function(it){
      var dp = it.getAttribute('data-page');
      if (dp === '__new') return;               /* modal flow, not a page */
      var ic = it.querySelector('.icon');
      var ico = ic ? ic.textContent : '\u2022';
      var label = ic ? it.textContent.slice(ic.textContent.length).trim() : it.textContent.trim();
      var oc = it.getAttribute('onclick') || '';
      bh += '<div class="bi" data-page="' + dp + '" onclick="' + oc.replace(/"/g,'&quot;') + '"><span class="ic">' + ico + '</span><span class="lb">' + label + '</span></div>';
    });
    bar.innerHTML = bh;
    doc.body.appendChild(bar);
    /* keep the bottom-bar highlight in sync with the sidebar's active page */
    setInterval(function(){
      var act = doc.querySelector('#sidebar .nav-item.active[data-page]');
      var dp = act ? act.getAttribute('data-page') : null;
      doc.querySelectorAll('#og-bnav .bi').forEach(function(bb){
        bb.classList.toggle('active', bb.getAttribute('data-page') === dp);
      });
    }, 400);
  }
  return true;
}


var _injTries = 0;
function ogTryInject(which){
  var ok = ogInjectIntoFrame(EL[which], which);
  if (!ok && _injTries < 60) { _injTries++; setTimeout(function(){ ogTryInject(which); }, 150); }
}
EL.programs.addEventListener('load',  function(){ _injTries = 0; ogTryInject('programs');  hideSplash(); });
EL.nutrition.addEventListener('load', function(){
  if (!nutriLoading && !nutriLoaded) return;
  nutriLoaded = true;
  var nb = document.getElementById('og-nboot');
  if (nb) nb.classList.remove('show');
  ogTryInject('nutrition');
});

var _splashed = false;
function hideSplash(){
  if (_splashed) return; _splashed = true;
  setTimeout(function(){ document.getElementById('og-loading').classList.add('hide'); }, 400);
}

/* ⏱ splash safety — never trap the user on the loading screen: if the app frame
   hasn't reported ready within 12s (e.g. an old iOS that can't parse the embedded
   code), force-hide the splash so whatever loaded is visible. */
setTimeout(function(){
  var el = document.getElementById('og-loading');
  if (el && !el.classList.contains('hide')) el.classList.add('hide');
}, 12000);

var active = 'programs';
try { active = localStorage.getItem('og_projects_tab') || 'programs'; } catch(e){}
function ogShowApp(key){
  active = key;
  if (key === 'nutrition') loadNutrition();   /* 📱 lazy-load on first switch */
  try { localStorage.setItem('og_projects_tab', key); } catch(e){}
  EL.programs.classList.toggle('hidden',  key !== 'programs');
  EL.nutrition.classList.toggle('hidden', key !== 'nutrition');
  /* sync switcher highlight inside both frames */
  [['programs','og-sw-programs'],['nutrition','og-sw-nutrition']].forEach(function(kv){
    ['programs','nutrition'].forEach(function(f){
      var doc = EL[f].contentDocument; if (!doc) return;
      var el = doc.getElementById(kv[1]);
      if (el) el.classList.toggle('active', kv[0] === key);
    });
  });
  /* close any open mobile drawer */
  ['programs','nutrition'].forEach(function(f){
    var doc = EL[f].contentDocument; if (!doc) return;
    doc.body.classList.remove('sb-open');
    var o = doc.querySelector('.og-sb-overlay'); if (o) o.classList.remove('show');
  });
}
window.ogShowApp = ogShowApp;
EL.programs.src = 'programs/index.html';   /* boot app loads immediately */
ogShowApp(active);

/* ── PWA: inline manifest + app icons generated from the shield (no external files) ── */
(function(){
  function makeIcon(size, cb){
    var c = document.createElement('canvas'); c.width = c.height = size;
    var x = c.getContext('2d');
    x.fillStyle = '#080808'; x.fillRect(0, 0, size, size);
    var img = new Image();
    img.onload = function(){
      var w = size * 0.52, h = w * (img.height / img.width);
      x.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
      cb(c.toDataURL('image/png'));
    };
    img.src = OG_SHIELD_B64;
  }
  makeIcon(192, function(i192){
    makeIcon(512, function(i512){
      try {
        var manifest = {
          name: 'Olympic Gym — Projects',
          short_name: 'Olympic Gym',
          description: 'Training Program Builder + Nutrition Plan Maker — Coach Loai Hassan',
          start_url: location.href.split('#')[0],
          display: 'standalone',
          orientation: 'any',
          background_color: '#080808',
          theme_color: '#080808',
          icons: [
            { src: i192, sizes: '192x192', type: 'image/png' },
            { src: i512, sizes: '512x512', type: 'image/png', purpose: 'maskable' }
          ]
        };
        var blob = new Blob([JSON.stringify(manifest)], { type: 'application/manifest+json' });
        document.getElementById('pwa-manifest').href = URL.createObjectURL(blob);
      } catch(e){}
      var ai = document.getElementById('apple-icon');
      if (ai) ai.href = i192;
    });
  });
})();

(function(){
  var d = new Date();
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var mon = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  document.getElementById('t-date').textContent = days[d.getDay()] + ', ' + mon[d.getMonth()] + ' ' + d.getDate();
})();
