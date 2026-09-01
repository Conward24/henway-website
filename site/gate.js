/* Pre-launch password gate. Soft gate, same contract as the old React one
   (legacy/src/ComingSoon.tsx): keeps casual visitors out until launch. Shares
   the localStorage key with the React site, so anyone already through the old
   gate is already through this one. Loaded synchronously in <head> on every
   page so the body is hidden before first paint.
   Removing the gate = deleting the <script src="/gate.js"> line from each
   page (or this file). That is the launch decision, not a side effect. */
(function () {
  var KEY = 'henway_gate_v1';
  var PASSWORD = 'thehenway';

  try {
    if (localStorage.getItem(KEY) === 'open') return;
  } catch (e) { /* storage blocked: gate stays up for this visit */ }

  document.documentElement.setAttribute('data-gated', '');
  var hide = document.createElement('style');
  hide.textContent = 'html[data-gated] body{display:none!important}';
  document.head.appendChild(hide);

  function mount() {
    var wrap = document.createElement('div');
    wrap.id = 'hw-gate';
    wrap.innerHTML =
      '<style>' +
      '#hw-gate{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;' +
      'background:radial-gradient(120% 90% at 50% 0%,#3a3020 0%,#1d1810 55%,#120e09 100%);' +
      'font-family:Raleway,system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center;padding:24px}' +
      '#hw-gate .inner{max-width:420px;width:100%}' +
      '#hw-gate img{width:120px;margin:0 auto 26px;display:block;filter:drop-shadow(0 20px 34px rgba(0,0,0,.55))}' +
      '#hw-gate .kicker{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.28em;color:#ffcc00;margin-bottom:16px}' +
      '#hw-gate h1{font-size:clamp(30px,6vw,44px);font-weight:800;letter-spacing:-.02em;color:#f6f1e4;margin:0}' +
      '#hw-gate p.sub{font-size:17px;line-height:1.5;margin:18px 0 0;color:#b8ad90}' +
      '#hw-gate form{margin-top:34px;display:flex;flex-wrap:wrap;gap:12px;justify-content:center}' +
      '#hw-gate input{border-radius:999px;padding:13px 20px;font-size:16px;font-weight:600;outline:none;text-align:center;' +
      'flex:1 1 180px;background:rgba(255,255,255,.06);border:1.5px solid rgba(243,236,219,.28);color:#f3ecdb;font-family:inherit}' +
      '#hw-gate input.err{border-color:#e06b5a}' +
      '#hw-gate button{border-radius:999px;padding:13px 26px;font-size:16px;font-weight:800;border:0;cursor:pointer;' +
      'background:#ffcc00;color:#1d1810;font-family:inherit}' +
      '#hw-gate .msg{min-height:20px;margin-top:12px;font-size:14px;font-weight:600;color:#e6a08f}' +
      '#hw-gate .foot{margin-top:40px;font-size:12px;color:rgba(184,173,144,.6)}' +
      '</style>' +
      '<div class="inner">' +
      '<img src="/walk-assets/chick-shades-matte.webp" alt="" onerror="this.style.display=\'none\'">' +
      '<div class="kicker">The experience layer for AI</div>' +
      '<h1>Something’s hatching.</h1>' +
      '<p class="sub">Henway isn’t quite ready to meet the world. We’re putting the finishing touches on it. Check back soon.</p>' +
      '<form><input type="password" placeholder="Password" aria-label="Password" autocomplete="off">' +
      '<button type="submit">Enter</button></form>' +
      '<div class="msg" role="alert"></div>' +
      '<div class="foot">© ' + new Date().getFullYear() + ' Henway AI</div>' +
      '</div>';

    // Child of <html>, not <body>: the body is display:none while gated.
    document.documentElement.appendChild(wrap);

    var input = wrap.querySelector('input');
    var msg = wrap.querySelector('.msg');
    input.focus();
    input.addEventListener('input', function () {
      input.classList.remove('err');
      msg.textContent = '';
    });
    wrap.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      if (input.value.trim().toLowerCase() === PASSWORD) {
        try { localStorage.setItem(KEY, 'open'); } catch (e2) { /* ignore */ }
        wrap.remove();
        document.documentElement.removeAttribute('data-gated');
      } else {
        input.classList.add('err');
        input.value = '';
        msg.textContent = 'That’s not it. Try again.';
      }
    });
  }

  if (document.readyState !== 'loading') mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
