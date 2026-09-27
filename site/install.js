/*
 * Home-screen steps for the phone in the visitor's hand.
 *
 * iOS 26 moved Add to Home Screen behind a ⋯ menu next to the address bar,
 * which now sits at the bottom by default. The old line said "tap Share", and
 * on 2026-09-27 a tester on a new iPhone could find only "Add Bookmark".
 * In-app browsers (Instagram, Facebook, TikTok) can't add to the home screen
 * at all, and most of our traffic arrives through one of them.
 *
 * Same detection as the app (frontend/src/components/InstallApp.tsx). Fills
 * every [data-install-steps] element; without JavaScript the static text in
 * the element stays.
 */
(function () {
  var ua = navigator.userAgent || '';
  var touch = navigator.maxTouchPoints || 0;
  var ios = /iPad|iPhone|iPod/.test(ua) || (/Macintosh/.test(ua) && touch > 1);
  var android = /Android/.test(ua);

  function platform() {
    if (/FBAN|FBAV|FB_IAB|Instagram|musical_ly|TikTok|BytedanceWebview/i.test(ua)) return ios ? 'inapp-ios' : 'inapp-android';
    if (ios) {
      if (/CriOS|FxiOS|EdgiOS/.test(ua)) return 'ios-unknown';
      var s = ua.match(/Version\/(\d+)/), o = ua.match(/OS (\d+)[_.]\d/);
      var v = Math.max(s ? +s[1] : 0, o ? +o[1] : 0);
      if (v >= 26) return 'ios26';
      return s ? 'ios' : 'ios-unknown';
    }
    return android ? 'android' : 'desktop';
  }

  var k = function (t) { return '<b class="key">' + t + '</b>'; };
  var share = k('<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="M8 7l4-4 4 4"/><path d="M6 11v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-8"/></svg> Share');
  var toggle = '<span class="toggle" role="img" aria-label="on"></span>';

  var IOS26 = ['Tap ' + k('⋯') + ' next to the address bar.', 'Tap ' + share + '.', 'Scroll down, tap ' + k('Add to Home Screen') + '.', 'Keep <b>Open as Web App</b> ' + toggle + ' on. Tap ' + k('Add') + '.'];
  var IOS = ['Tap ' + share + ' in Safari.', 'Scroll down, tap ' + k('Add to Home Screen') + '.', 'Tap ' + k('Add') + '.'];
  var ANDROID = ['Tap ' + k('⋮') + ' at the top right of Chrome.', 'Tap ' + k('Add to Home screen') + ' or ' + k('Install app') + '.', 'Tap ' + k('Install') + '.'];
  var DESKTOP = ['Open this in Chrome or Edge.', 'Click the install icon at the right end of the address bar.', 'Click ' + k('Install') + '.'];

  function ol(items) { return '<ol class="steps">' + items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ol>'; }

  function html(p) {
    if (p === 'inapp-ios' || p === 'inapp-android') {
      return '<b>Open this in ' + (p === 'inapp-ios' ? 'Safari' : 'Chrome') + ' first.</b>' +
        ol(['Tap ' + k('⋯') + ' at the top of this screen.', 'Tap ' + k('Open in browser') + '.', 'Then come back here for the last step.']);
    }
    if (p === 'ios-unknown') return '<span class="lbl">Newer iPhone</span>' + ol(IOS26) + '<span class="lbl">Older iPhone</span>' + ol(IOS);
    return ol(p === 'ios26' ? IOS26 : p === 'ios' ? IOS : p === 'android' ? ANDROID : DESKTOP);
  }

  var p = platform();
  var els = document.querySelectorAll('[data-install-steps]');
  for (var i = 0; i < els.length; i++) { els[i].innerHTML = html(p); els[i].setAttribute('data-install-steps', p); }
})();
