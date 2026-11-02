(function(){
  var FADE = 180;
  function fadeThenClose(els, orig, args, self){
    var anim = [];
    (els || []).forEach(function(el){
      if (el && el.style.display !== 'none') anim.push(el);
    });
    if (!anim.length) { orig.apply(self, args); return; }
    anim.forEach(function(el){
      el.style.transition = 'opacity ' + FADE + 'ms ease';
      el.style.opacity = '0';
      el.style.pointerEvents = 'none';
    });
    setTimeout(function(){
      anim.forEach(function(el){ el.style.transition = ''; el.style.opacity = ''; el.style.pointerEvents = ''; });
      orig.apply(self, args);
    }, FADE);
  }
  function wrap(name, elsFn){
    var orig = window[name];
    if (typeof orig !== 'function' || orig.__ogFade) return;
    var w = function(){ fadeThenClose(elsFn(), orig, arguments, this); };
    w.__ogFade = true;
    window[name] = w;
  }
  wrap('closeSaveModal',   function(){ return [document.getElementById('save-modal')]; });
  wrap('closeThemeModal',  function(){ return [document.getElementById('theme-modal'), document.getElementById('theme-modal-overlay')]; });
  wrap('closeImportModal', function(){ return [document.getElementById('import-modal')]; });
})();
