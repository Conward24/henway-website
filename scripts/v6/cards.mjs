// Render scripts/v6/cards/*.html to site/og/*.jpg at 1200x630, then a contact sheet.
//   node scripts/v6/cards.mjs [sheet.png]
import { spawn } from 'node:child_process';
import { writeFileSync, readdirSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
const dir = path.dirname(new URL(import.meta.url).pathname);
const root = path.resolve(dir, '../..');
const outDir = path.join(root, 'site/og'); mkdirSync(outDir, { recursive: true });
const prof = mkdtempSync(path.join(tmpdir(), 'hw-cards-'));
const port = 9351;
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws;
for (let i = 0; i < 60; i++) { try { const j = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const p = j.find(t => t.type === 'page'); if (p) { ws = p.webSocketDebuggerUrl; break; } } catch {} await sleep(200); }
const sock = new WebSocket(ws); await new Promise(r => sock.onopen = r);
let id = 0; const pend = new Map();
sock.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); sock.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable'); await send('Runtime.enable');
const names = readdirSync(path.join(dir, 'cards')).filter(f => f.endsWith('.html')).map(f => f.slice(0, -5)).sort();
const report = {};
await send('Emulation.setDeviceMetricsOverride', { width: 1200, height: 630, deviceScaleFactor: 1, mobile: false });
for (const n of names) {
  await send('Page.navigate', { url: 'file://' + path.join(dir, 'cards', n + '.html') }); await sleep(1500);
  const r = await send('Runtime.evaluate', { awaitPromise: true, returnByValue: true, expression: `document.fonts.ready.then(()=>({font:document.fonts.check('850 92px Archivo'),imgs:[...document.images].filter(i=>!i.naturalWidth).map(i=>i.src.split('/').pop()),over:[...document.querySelectorAll('body *')].filter(e=>{const b=e.getBoundingClientRect();return b.width&&(b.right>1201||b.bottom>631||b.left<-1)}).map(e=>e.tagName+'.'+e.className).slice(0,4)}))` });
  report[n] = r.result.result.value;
  const s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 88, clip: { x: 0, y: 0, width: 1200, height: 630, scale: 1 } });
  writeFileSync(path.join(outDir, n + '.jpg'), Buffer.from(s.result.data, 'base64'));
}
const sheet = process.argv[2];
if (sheet) {
  const tiles = names.map(n => `<figure><img src="file://${outDir}/${n}.jpg" width="560"><img src="file://${outDir}/${n}.jpg" width="300"><figcaption>${n}</figcaption></figure>`).join('');
  const html = `<html><body style="margin:0;padding:24px;background:#ddd;font:700 22px Arial;display:grid;grid-template-columns:repeat(2,900px);gap:24px">${tiles}<style>figure{margin:0;display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap;background:#fff;padding:12px;border-radius:10px}figcaption{width:100%}</style></body></html>`;
  const f = path.join(prof, 'sheet.html'); writeFileSync(f, html);
  const rows = Math.ceil(names.length / 2), H = 48 + rows * (24 + 24 + 330 + 40);
  await send('Emulation.setDeviceMetricsOverride', { width: 1872, height: H, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'file://' + f }); await sleep(2000);
  const s = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  writeFileSync(sheet, Buffer.from(s.result.data, 'base64'));
}
console.log(JSON.stringify(report));
await send('Browser.close'); await sleep(1500); try { chrome.kill(); } catch {}
rmSync(prof, { recursive: true, force: true });
