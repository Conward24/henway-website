// Mobile checks for the v6 pages, run like a phone: DPR 3, touch, iOS Safari UA.
//   BASE=http://127.0.0.1:8765 node scripts/v6/mobile.mjs [--shots DIR] [--widths 375,390,414,430]
// Exit code 1 when any hard check fails. Checks, per page and width:
//   warp     rendered aspect ratio of an <img> (or background image) is >2% off
//            its natural ratio and it isn't object-fit cover/contain
//   crop     a capture (app screenshot, phone frame, chick) is cover-cropped by >2%
//   textimg  text inside a capture would render under 11px
//   tiny     a section's single main picture is narrower than 60% of the viewport
//   overlap  two text blocks, or text and an image, overlap (not ancestor/descendant)
//   tap      a button, nav link, filter or footer link is under 44px tall or wide
//   overflow anything past the right edge, or the page scrolls sideways
import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync, rmSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

const base = process.env.BASE || 'http://127.0.0.1:8765';
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const shotDir = arg('--shots', null); if (shotDir) mkdirSync(shotDir, { recursive: true });
const widths = arg('--widths', '375,390,414,430').split(',').map(Number);
const PAGES = [['home', '/index.html'], ['apps', '/apps.html'], ['pricing', '/pricing.html'], ['method', '/method.html'], ['trust', '/trust.html'],
  ['which', '/which-tool.html'], ['coaches', '/coaches.html'], ['getpaid', '/get-paid.html'], ['setup', '/get-paid/setup.html'], ['support', '/support.html'], ['st-workout', '/apps/workout.html'], ['st-potluck', '/apps/potluck.html'], ['st-deals', '/apps/deals.html'], ['st-recipes', '/apps/recipes.html'], ['st-trip', '/apps/trip.html'], ['st-renewals', '/apps/renewals.html'],
  ['studio', '/studio.html'], ['consultants', '/consultants.html'], ['dpa', '/dpa.html']];
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1';

const prof = mkdtempSync(path.join(tmpdir(), 'hw-mobile-'));
const port = 9361;
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws;
for (let i = 0; i < 60; i++) { try { const j = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const p = j.find(t => t.type === 'page'); if (p) { ws = p.webSocketDebuggerUrl; break; } } catch {} await sleep(200); }
const sock = new WebSocket(ws); await new Promise(r => sock.onopen = r);
let id = 0; const pend = new Map();
sock.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); sock.send(JSON.stringify({ id: i, method, params })); setTimeout(() => { if (pend.has(i)) { pend.delete(i); r({ error: { message: 'timeout ' + method } }); } }, 45000); }); // a stuck CDP call fails the page, not the run
await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
await send('Network.setUserAgentOverride', { userAgent: UA, platform: 'iPhone' });
await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });

// Smallest text inside each capture, in the image's own pixels (measured by eye on the source files).
const TEXTPX = { 'phone-workout.jpg': 24, 'phone-potluck.jpg': 24, 'phone-deals.jpg': 24, 'phone-recipes.jpg': 24, 'phone-trip.jpg': 24, 'phone-renewals.jpg': 24, 'sell-copy.jpg': 28, 'live-workout.jpg': 24, 'live-potluck.jpg': 24, 'live-deals.jpg': 24, 'live-recipes.jpg': 24, 'live-trip.jpg': 24, 'live-renewals.jpg': 24, 'coach-thread.png': 24, 'day2-read.jpg': 22, 'st-workout.jpg': 22, 'st-potluck.jpg': 22, 'st-deals.jpg': 22,
  'st-trip.jpg': 22, 'st-recipes.jpg': 22, 'st-renewals.jpg': 22 };
const CAPTURE = /(coach-thread|day2-read|st-[a-z]+|live-[a-z]+|phone-[a-z]+|sell-copy|chick-shades-tight|hatching-chick)\./;

const CHECK = `(() => {
 const TEXTPX = ${JSON.stringify(TEXTPX)}, CAPTURE = ${CAPTURE};
 const W = document.documentElement.clientWidth, out = [];
 const vis = el => { const b = el.getBoundingClientRect(); const cs = getComputedStyle(el); return b.width > 1 && b.height > 1 && cs.visibility !== 'hidden' && cs.display !== 'none' && +cs.opacity > 0.05; };
 const name = el => (el.currentSrc || el.src || '').split('/').pop().split('?')[0];
 const where = el => { const s = el.closest('section,header,footer'); const h = s && s.querySelector('h1,h2,.kick'); return h ? h.textContent.trim().slice(0, 28) : (s ? s.className : ''); };
 const imgs = [...document.querySelectorAll('img')].filter(vis);
 for (const im of imgs) {
  if (!im.naturalWidth) continue;
  const cs = getComputedStyle(im), n = name(im), b = { width: im.offsetWidth, height: im.offsetHeight }; // layout box: a rotate() must not read as a warp
  // content box, not border box
  const pw = b.width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight) - parseFloat(cs.borderLeftWidth) - parseFloat(cs.borderRightWidth);
  const ph = b.height - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - parseFloat(cs.borderTopWidth) - parseFloat(cs.borderBottomWidth);
  const rr = pw / ph, nr = im.naturalWidth / im.naturalHeight, off = Math.abs(rr / nr - 1);
  const fit = cs.objectFit;
  if (off > 0.02 && fit !== 'cover' && fit !== 'contain') out.push(['warp', n + ' ' + (off * 100).toFixed(1) + '% off (' + Math.round(pw) + 'x' + Math.round(ph) + ' vs ' + im.naturalWidth + 'x' + im.naturalHeight + ')', where(im)]);
  if (fit === 'cover' && CAPTURE.test(n) && off > 0.02) out.push(['crop', n + ' cover-cropped ' + (off * 100).toFixed(1) + '%', where(im)]);
  if (TEXTPX[n]) {
   // with contain the image is scaled by the limiting side
   const scale = fit === 'contain' ? Math.min(pw / im.naturalWidth, ph / im.naturalHeight) : fit === 'cover' ? Math.max(pw / im.naturalWidth, ph / im.naturalHeight) : pw / im.naturalWidth;
   const px = TEXTPX[n] * scale;
   if (px < 11) out.push(['textimg', n + ' text renders ' + px.toFixed(1) + 'px', where(im)]);
  }
 }
 // background images
 for (const el of document.querySelectorAll('body *')) { const bg = getComputedStyle(el).backgroundImage; if (bg && bg.startsWith('url(') && vis(el)) { const cs = getComputedStyle(el); if (cs.backgroundSize !== 'cover' && cs.backgroundSize !== 'contain') out.push(['warp', 'background ' + bg.slice(0, 60) + ' size ' + cs.backgroundSize, where(el)]); } }
 // main picture per section: a section whose visual column holds exactly one capture/picture
 for (const s of document.querySelectorAll('section')) {
  const pics = [...s.querySelectorAll('.vis img, .pic img, .ba img, .d2 img, .shot img, figure img')].filter(vis).filter(i => i.naturalWidth >= 400);
  if (pics.length === 1) { const w = pics[0].getBoundingClientRect().width; if (w < 0.6 * W) out.push(['tiny', name(pics[0]) + ' main picture ' + Math.round(w) + 'px of ' + W, where(pics[0])]); }
 }
 // a card's picture (shelf/starter cards) is its main picture too
 for (const c of document.querySelectorAll('article, .st, .card')) {
  const pics = [...c.querySelectorAll('img')].filter(vis).filter(i => i.naturalWidth >= 400 && CAPTURE.test(name(i)));
  if (pics.length === 1) { const w = pics[0].getBoundingClientRect().width; if (w < 0.6 * W) out.push(['tiny', name(pics[0]) + ' card picture ' + Math.round(w) + 'px of ' + W, where(pics[0])]); }
 }
 // overlap: text blocks vs text blocks and images (skip ancestor/descendant, skip intentional stacks)
 const blocks = [...document.querySelectorAll('h1,h2,h3,p,li,.btn,.lab,.kick,img,.wlc,.card2,.note,.chat > div')].filter(vis).filter(el => !el.closest('.quest,.fanstack,.foot,.buybar') && !el.matches('img.chick')) /* the chick perches on the phone by design */.filter(el => { const d = el.closest('details'); return !d || d.open || el.closest('summary'); }); // a closed <details> body is not on screen
 const R = blocks.map(el => el.getBoundingClientRect());
 for (let i = 0; i < blocks.length; i++) for (let j = i + 1; j < blocks.length; j++) {
  const a = blocks[i], c = blocks[j]; if (a.contains(c) || c.contains(a)) continue;
  const p = R[i], q = R[j]; const ix = Math.min(p.right, q.right) - Math.max(p.left, q.left), iy = Math.min(p.bottom, q.bottom) - Math.max(p.top, q.top);
  if (ix > 4 && iy > 4) out.push(['overlap', (a.tagName + '.' + a.className).slice(0, 24) + ' "' + a.textContent.trim().slice(0, 30) + '" / ' + (c.tagName + '.' + c.className).slice(0, 24) + ' "' + c.textContent.trim().slice(0, 30) + '"' + ' ' + Math.round(ix) + 'x' + Math.round(iy), where(a)]);
 }
 // tap targets
 for (const el of document.querySelectorAll('a.btn, button, .top nav a, .mnav a, .foot a, .pick button, .st, a.open, .top .login, select, textarea')) {
  if (!vis(el)) continue; const b = el.getBoundingClientRect();
  if (b.height < 43.5 || b.width < 43.5) out.push(['tap', (el.textContent || el.tagName).trim().slice(0, 24) + ' ' + Math.round(b.width) + 'x' + Math.round(b.height), where(el)]);
 }
 // wordcol: a line of text squeezed into one word per line (a grid or flex item too narrow for its words)
 { const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n, seen = new Set();
   while ((n = tw.nextNode())) { const el = n.parentElement; if (!el || seen.has(el) || !vis(el) || el.closest('.mnav,script,style,pre,code,.snip')) continue;
     const words = n.textContent.trim().split(' ').filter(Boolean); if (words.length < 3) continue;
     const r = document.createRange(); r.selectNodeContents(n); const tops = new Set([...r.getClientRects()].filter(x => x.width > 0).map(x => Math.round(x.top)));
     if (tops.size >= 3 && tops.size >= words.length * 0.75) { seen.add(el); out.push(['wordcol', '"' + n.textContent.trim().slice(0, 40) + '" breaks into ' + tops.size + ' lines for ' + words.length + ' words', where(el)]); } } }
 // overflow
 if (document.documentElement.scrollWidth > W + 1) out.push(['overflow', 'page scrolls sideways ' + document.documentElement.scrollWidth + ' > ' + W, '']);
 for (const el of document.querySelectorAll('body *')) { if (!vis(el) || el.closest('.mnav,.snip,.pick')) continue; const b = el.getBoundingClientRect(); if (b.right > W + 1) { out.push(['overflow', (el.tagName + '.' + el.className).slice(0, 30) + ' right ' + Math.round(b.right), where(el)]); break; } }
 return { out, H: document.documentElement.scrollHeight };
})()`;

const all = {}; let fails = 0;
for (const w of widths) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: 844, deviceScaleFactor: 3, mobile: true, screenWidth: w, screenHeight: 844 });
  const only = arg('--only', ''); // comma list of page names
  for (const [v, p] of PAGES.filter(([v]) => !only || only.split(',').includes(v))) {
    await send('Page.navigate', { url: base + p }); await sleep(1800);
    // scroll through so lazy images load, then back to top
    await send('Runtime.evaluate', { awaitPromise: true, expression: `(async()=>{document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');for(let y=0;y<document.documentElement.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0);await Promise.race([Promise.all([...document.images].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r}))),new Promise(r=>setTimeout(r,3000))]);await Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,2000))])})()` });
    await sleep(300);
    const r = await send('Runtime.evaluate', { returnByValue: true, expression: CHECK });
    const res = r.result?.result?.value || { out: [['error', 'check did not run: ' + (r.error?.message || 'no result'), '']], H: 844 };
    all[`${w} ${v}`] = res.out; fails += res.out.length;
    if (shotDir) {
      const H = Math.min(res.H, 16000);
      const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70, captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: H, scale: 1 / 3 * 1.0 } });
      if (s.result?.data) writeFileSync(path.join(shotDir, `${v}-${w}.jpg`), Buffer.from(s.result.data, 'base64')); else res.out.push(['error', 'screenshot failed: ' + (s.error?.message || ''), '']);
    }
  }
}
fails = Object.values(all).reduce((n, l) => n + l.length, 0);
const byKind = {};
for (const [k, list] of Object.entries(all)) for (const [kind, msg, at] of list) (byKind[kind] ||= new Set()).add(`${k.split(' ')[1]} @${k.split(' ')[0]} [${at}] ${msg}`);
for (const [kind, set] of Object.entries(byKind)) { console.log(`== ${kind} (${set.size})`); for (const m of [...set].slice(0, 400)) console.log('  ' + m); }
console.log(fails ? `FAIL ${fails} issues` : 'PASS');
await send('Browser.close'); await sleep(1200); try { chrome.kill(); } catch {}
rmSync(prof, { recursive: true, force: true });
process.exit(fails ? 1 : 0);
