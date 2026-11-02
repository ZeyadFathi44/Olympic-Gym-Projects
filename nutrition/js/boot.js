/* Boot: OG shield logo + splash dismissal (no CDN dependency) */
(function(){
  var logo = document.getElementById('og-loading-logo');
  if (logo) logo.src = window.OG_SHIELD_B64;
  var loader = document.getElementById('og-loading');
  window.ogHideLoader = function(){
    if (!loader || loader.classList.contains('hide')) return;
    loader.classList.add('hide');
    setTimeout(function(){ if (loader && loader.parentNode) loader.parentNode.removeChild(loader); }, 700);
  };
  window.addEventListener('load', function(){ setTimeout(window.ogHideLoader, 250); });
  setTimeout(window.ogHideLoader, 8000); /* safety: never leave the splash stuck */
})();
