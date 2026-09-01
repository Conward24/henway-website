// Re-shoot the five example apps for /examples, desktop + mobile, from the
// SAME live share links the cards open. Real headless captures, no mockups:
// desktop 1280x800@1.5 and iPhone-ish 390x844@2 (mobile emulation on).
// Writes site/walk-assets/ex-<name>-desktop.webp and ex-<name>-mobile.webp.
//   node tools/shoot-examples.mjs
// CDP pattern lifted from ~/creative-advisor/tools/henway-screens/shots-real3.mjs.
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const APPS = [
  ['shiftboard', 'https://api.henwayai.com/s/VoFbWhcK7oAS0yJidRljwXJK'],
  ['quotesheet', 'https://api.henwayai.com/s/vxSU66BsBO9lpZMl54lCpy25'],
  ['openroutine', 'https://api.henwayai.com/s/MmwqCzU7yA3i13k9RCzXmGwB'],
  ['intakeone', 'https://api.henwayai.com/s/MIGDZDHkRcv6ocem2QPlrgGN'],
  ['tallyboard', 'https://api.henwayai.com/s/GWgBtqX9HgeqXmL8Ij0D6Tgd'],
];
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'site', 'walk-assets');

const PORT = 9412;
const sl = (ms) => new Promise((r) => setTimeout(r, ms));
const profile = mkdtempSync(join(tmpdir(), 'henway-exshots-'));
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, '--window-size=1280,900', '--hide-scrollbars', 'about:blank'], { stdio: 'ignore' });
process.on('exit', () => { try { chrome.kill(); } catch {} try { rmSync(profile, { recursive: true, force: true }); } catch {} });
for (let i = 0; i < 40; i++) { try { await fetch(`http://127.0.0.1:${PORT}/json/version`); break; } catch { await sl(250); } }
const t = await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' }).then((r) => r.json());
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise((r) => ws.addEventListener('open', r));
let id = 0; const w = new Map();
ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && w.has(m.id)) { w.get(m.id)(m); w.delete(m.id); } });
const send = (m, p = {}) => new Promise((r) => { const i = ++id; w.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: p })); });
const ev = async (e) => (await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true })).result?.result?.value;
await send('Page.enable'); await send('Runtime.enable');

async function shoot(url, name, kind, metrics) {
  await send('Emulation.setDeviceMetricsOverride', metrics);
  await send('Page.navigate', { url });
  // settle: body has real content and network went quiet-ish
  for (let i = 0; i < 60; i++) { if ((await ev('document.body ? document.body.innerText.length : 0')) > 40) break; await sl(300); }
  await sl(2500);
  const s = await send('Page.captureScreenshot', { format: 'webp', quality: 88 });
  if (!s.result?.data) { console.error('FAILED', name, kind, JSON.stringify(s).slice(0, 200)); return false; }
  writeFileSync(join(OUT, `ex-${name}-${kind}.webp`), Buffer.from(s.result.data, 'base64'));
  console.log('shot', name, kind);
  return true;
}

let ok = true;
for (const [name, url] of APPS) {
  ok = (await shoot(url, name, 'desktop', { width: 1280, height: 800, deviceScaleFactor: 1.5, mobile: false })) && ok;
  ok = (await shoot(url, name, 'mobile', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true })) && ok;
}
ws.close(); chrome.kill();
console.log(ok ? 'ALL DONE' : 'SOME FAILED');
process.exit(ok ? 0 : 1);
