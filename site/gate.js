/* Pre-launch gate, now the birthday-launch WAITLIST (2026-09-05). Soft gate, same contract as the old React one
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
      '#hw-gate{position:fixed;inset:0;z-index:99999;display:flex;align-items:flex-start;justify-content:center;overflow:auto;' +
      'background:radial-gradient(120% 90% at 50% 0%,#3a3020 0%,#1d1810 55%,#120e09 100%);' +
      'font-family:Archivo,Raleway,system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center;padding:40px 24px 48px}' +
      '#hw-gate .inner{max-width:460px;width:100%;margin:auto}' +
      '#hw-gate img{width:104px;margin:0 auto 22px;display:block;filter:drop-shadow(0 20px 34px rgba(0,0,0,.55))}' +
      '#hw-gate .kicker{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.28em;color:#ffcc00;margin-bottom:14px}' +
      '#hw-gate h1{font-size:clamp(30px,6vw,44px);font-weight:800;letter-spacing:-.02em;color:#f6f1e4;margin:0;line-height:1.05}' +
      '#hw-gate p.sub{font-size:17px;line-height:1.5;margin:18px 0 0;color:#b8ad90}' +
      '#hw-gate form{margin-top:28px;display:flex;flex-direction:column;gap:10px;text-align:left}' +
      '#hw-gate input,#hw-gate select{border-radius:12px;padding:13px 16px;font-size:16px;font-weight:600;outline:none;width:100%;box-sizing:border-box;' +
      'background:rgba(255,255,255,.06);border:1.5px solid rgba(243,236,219,.28);color:#f3ecdb;font-family:inherit;-webkit-appearance:none;appearance:none}' +
      '#hw-gate select option{color:#1d1810}' +
      '#hw-gate input::placeholder{color:rgba(243,236,219,.55)}' +
      '#hw-gate input.err{border-color:#e06b5a}' +
      '#hw-gate button{border-radius:999px;padding:14px 26px;font-size:16px;font-weight:800;border:0;cursor:pointer;margin-top:4px;' +
      'background:#ffcc00;color:#1d1810;font-family:inherit}' +
      '#hw-gate button[disabled]{opacity:.6;cursor:default}' +
      '#hw-gate .fine{font-size:12px;color:rgba(184,173,144,.7);margin-top:8px;text-align:center}' +
      '#hw-gate .msg{min-height:20px;margin-top:10px;font-size:14px;font-weight:600;color:#e6a08f;text-align:center}' +
      '#hw-gate .done{display:none;margin-top:26px;padding:18px;border-radius:14px;background:rgba(255,204,0,.12);border:1px solid rgba(255,204,0,.35);color:#f6f1e4;font-size:16px;line-height:1.5}' +
      '#hw-gate .pw{margin-top:34px;font-size:13px;color:rgba(184,173,144,.7)}' +
      '#hw-gate .pw a{color:#b8ad90;text-decoration:underline;cursor:pointer}' +
      '#hw-gate .pwform{display:none;margin-top:12px;flex-direction:row;gap:10px}' +
      '#hw-gate .pwform input{flex:1}' +
      '#hw-gate .pwform button{margin-top:0;padding:12px 18px}' +
      '#hw-gate .foot{margin-top:36px;font-size:12px;color:rgba(184,173,144,.6)}' +
      '</style>' +
      '<div class="inner">' +
      '<img src="/walk-assets/chick-shades-matte.webp" alt="" onerror="this.style.display=\'none\'">' +
      '<div class="kicker">Something’s hatching. Sep 12.</div>' +
      '<h1>Henway opens on my birthday.</h1>' +
      '<p class="sub">The thing you keep working around is an app you haven’t built yet. You don’t need to be technical. You say what’s annoying you, it guides you from there, and about seven minutes later it’s a working app at its own link. Join the list and you get the link an hour before anyone else on Sep 12, when 25 Founding Hen seats open.</p>' +
      '<form class="wl">' +
      '<input type="text" name="name" placeholder="First name" autocomplete="given-name" aria-label="First name">' +
      '<input type="email" name="email" placeholder="Email" autocomplete="email" required aria-label="Email">' +
      '<select name="first_use" aria-label="What is the thing you keep working around?">' +
      '<option value="" disabled selected>What’s the thing you keep working around?</option>' +
      '<option value="own-business">Something for my own business</option>' +
      '<option value="clients">Something I’d run with clients</option>' +
      '<option value="team">Something for my team at work</option>' +
      '<option value="curious">I just want to see what it does</option>' +
      '</select>' +
      '<button type="submit">Put me on the list</button>' +
      '<div class="fine">No spam. One email a day the week of the launch, then quiet.</div>' +
      '</form>' +
      '<div class="msg" role="alert"></div>' +
      '<div class="done">You’re on the list. Check your inbox for one email from Michael, and watch for the link on Sep 12.</div>' +
      '<div class="pw">Already have the password? <a>Enter it here</a>' +
      '<form class="pwform"><input type="password" placeholder="Password" aria-label="Password" autocomplete="off">' +
      '<button type="submit">Enter</button></form></div>' +
      '<div class="foot">© ' + new Date().getFullYear() + ' Henway AI</div>' +
      '</div>';

    // Child of <html>, not <body>: the body is display:none while gated.
    document.documentElement.appendChild(wrap);

    var API = 'https://api.henwayai.com/leads/waitlist';
    var src = 'site';
    try {
      var q = new URLSearchParams(location.search).get('src');
      if (q && /^[a-z0-9-]{1,24}$/i.test(q)) src = q.toLowerCase();
    } catch (e) { /* ignore */ }

    var wl = wrap.querySelector('form.wl');
    var msg = wrap.querySelector('.msg');
    var done = wrap.querySelector('.done');
    var emailEl = wl.querySelector('input[name=email]');
    var btn = wl.querySelector('button');
    wl.addEventListener('submit', function (e) {
      e.preventDefault();
      msg.textContent = '';
      var email = emailEl.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailEl.classList.add('err');
        msg.textContent = 'That email doesn’t look right.';
        return;
      }
      emailEl.classList.remove('err');
      btn.disabled = true;
      btn.textContent = 'One sec…';
      var body = {
        email: email,
        name: wl.querySelector('input[name=name]').value.trim(),
        first_use: wl.querySelector('select[name=first_use]').value || '',
        src: src
      };
      fetch(API, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (!res.ok) throw new Error((res.j && res.j.error) || 'Something went wrong.');
          wl.style.display = 'none';
          done.style.display = 'block';
          try { localStorage.setItem('henway_waitlist_v1', email); } catch (e2) { /* ignore */ }
        })
        .catch(function (err) {
          btn.disabled = false;
          btn.textContent = 'Put me on the list';
          msg.textContent = err.message || 'Something went wrong. Try again.';
        });
    });
    try {
      if (localStorage.getItem('henway_waitlist_v1')) { wl.style.display = 'none'; done.style.display = 'block'; }
    } catch (e) { /* ignore */ }

    var pwLink = wrap.querySelector('.pw a');
    var pwForm = wrap.querySelector('form.pwform');
    var pwInput = pwForm.querySelector('input');
    pwLink.addEventListener('click', function () {
      pwForm.style.display = pwForm.style.display === 'flex' ? 'none' : 'flex';
      if (pwForm.style.display === 'flex') pwInput.focus();
    });
    pwInput.addEventListener('input', function () { pwInput.classList.remove('err'); msg.textContent = ''; });
    pwForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (pwInput.value.trim().toLowerCase() === PASSWORD) {
        try { localStorage.setItem(KEY, 'open'); } catch (e2) { /* ignore */ }
        wrap.remove();
        document.documentElement.removeAttribute('data-gated');
      } else {
        pwInput.classList.add('err');
        pwInput.value = '';
        msg.textContent = 'That’s not it. Try again.';
      }
    });
  }

  if (document.readyState !== 'loading') mount();
  else document.addEventListener('DOMContentLoaded', mount);
})();
