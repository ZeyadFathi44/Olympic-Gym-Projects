/* 🛡 storage safety shim — iOS Safari throws a SecurityError when a page opened
   from a local file (file://) touches localStorage, which would kill the app's
   boot scripts. If real storage is available this does nothing; otherwise an
   in-memory storage takes over so the app still RUNS (saving persists only in
   that session — for permanent saving, host the file online via HTTPS). */
(function(){
  var ok = false;
  try { window.localStorage.setItem('__og_t','1'); window.localStorage.removeItem('__og_t'); ok = true; } catch(e) { ok = false; }
  if (ok) return;
  var mem = {};
  var shim = {
    getItem: function(k){ k = String(k); return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null; },
    setItem: function(k, v){ mem[String(k)] = String(v); },
    removeItem: function(k){ delete mem[String(k)]; },
    clear: function(){ mem = {}; },
    key: function(i){ var ks = Object.keys(mem); return i < ks.length ? ks[i] : null; }
  };
  Object.defineProperty(shim, 'length', { get: function(){ return Object.keys(mem).length; } });
  try { Object.defineProperty(window, 'localStorage', { value: shim, writable: false, configurable: true }); }
  catch(e) { try { window.localStorage = shim; } catch(e2){} }
})();
