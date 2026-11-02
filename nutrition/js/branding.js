(function(){
  var B64 = window.OG_SHIELD_B64;
  var tb = document.getElementById('topbar-logo-img');
  if (tb && B64) tb.src = B64;
  /* Browser-tab favicon + Apple touch icon (fixes the favicon.ico 404) */
  if (B64 && !document.querySelector('link[rel="icon"]')) {
    var fav = document.createElement('link');
    fav.rel = 'icon'; fav.type = 'image/png'; fav.sizes = 'any'; fav.href = B64;
    document.head.appendChild(fav);
    var touch = document.createElement('link');
    touch.rel = 'apple-touch-icon'; touch.sizes = '180x180'; touch.href = B64;
    document.head.appendChild(touch);
  }
})();
