/* Carry the campaign tag across the origin boundary.
 *
 * localStorage is per-origin, so what the site remembers about ?utm_source is
 * invisible to app.henwayai.com. The app is where signup and payment happen, so
 * without this the tag dies at the door and every conversion reports as direct.
 * Measured 2026-09-14: a visit to henwayai.com/tiktok followed by the signup
 * page carried nothing at all.
 *
 * So: remember the first tagged visit here, and stamp it onto every outbound
 * link to the app. First touch wins, matching the app's own rule.
 */
(function () {
  var KEY = 'henway_src_site';
  var FIELDS = ['utm_source', 'utm_medium', 'utm_campaign'];

  function remember() {
    try {
      var q = new URLSearchParams(location.search);
      if (!q.get('utm_source')) return;
      if (localStorage.getItem(KEY)) return;          // first touch wins
      var out = {};
      FIELDS.forEach(function (f) { if (q.get(f)) out[f] = q.get(f).slice(0, 60); });
      localStorage.setItem(KEY, JSON.stringify(out));
    } catch (e) { /* privacy mode: attribution is nice to have, never required */ }
  }

  function stored() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; }
    catch (e) { return {}; }
  }

  function stamp() {
    var src = stored();
    // A tag in the current URL beats the stored one: this visit is the truth.
    try {
      var q = new URLSearchParams(location.search);
      if (q.get('utm_source')) {
        src = {};
        FIELDS.forEach(function (f) { if (q.get(f)) src[f] = q.get(f); });
      }
    } catch (e) { /* fall back to what is stored */ }
    if (!src.utm_source) return;

    var links = document.querySelectorAll('a[href*="app.henwayai.com"]');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      try {
        var u = new URL(a.href);
        if (u.searchParams.get('utm_source')) continue;
        FIELDS.forEach(function (f) { if (src[f]) u.searchParams.set(f, src[f]); });
        a.href = u.toString();
      } catch (e) { /* a malformed href is not worth throwing over */ }
    }
  }

  remember();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', stamp);
  } else {
    stamp();
  }
})();
