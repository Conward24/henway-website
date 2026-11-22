import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
const dir = path.dirname(new URL(import.meta.url).pathname);
const base = process.env.BASE || 'http://127.0.0.1:8765';
const prof = mkdtempSync(path.join(tmpdir(), 'muse-b1-'));
const port = 9343;
const chrome = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--no-first-run','--no-default-browser-check','--disable-gpu','--hide-scrollbars','about:blank'], { stdio: 'ignore' });
const exited = new Promise(r => chrome.on('exit', r));
const sleep = ms => new Promise(r => setTimeout(r, ms));
let ws;
for (let i = 0; i < 50; i++) { try { const j = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const p = j.find(t => t.type === 'page'); if (p) { ws = p.webSocketDebuggerUrl; break; } } catch {} await sleep(200); }
const sock = new WebSocket(ws); await new Promise(r => sock.onopen = r);
let id = 0; const pend = new Map();
sock.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } };
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); sock.send(JSON.stringify({ id: i, method, params })); });
await send('Page.enable'); await send('Runtime.enable');
const out = {};
const shots = process.argv.includes('--shots');
for (const w of [390, 768, 1280, 1440]) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 800 });
  for (const [v,pth] of [['home','/index.html'],['apps','/apps.html'],['pricing','/pricing.html'],['method','/method.html'],['trust','/trust.html'],['which','/which-tool.html'],['coaches','/coaches.html'],['getpaid','/get-paid.html'],['studio','/studio.html'],['consultants','/consultants.html'],['dpa','/dpa.html'],['setup','/get-paid/setup.html'],['support','/support.html'],['st-workout','/apps/workout.html'],['st-potluck','/apps/potluck.html'],['st-deals','/apps/deals.html'],['st-recipes','/apps/recipes.html'],['st-trip','/apps/trip.html'],['st-renewals','/apps/renewals.html']]) {
    await send('Page.navigate', { url: base + pth }); await sleep(2200);
    await send('Runtime.evaluate', { awaitPromise: true, expression: `(async()=>{document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager');for(let y=0;y<document.documentElement.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,40))}scrollTo(0,0);await Promise.race([Promise.all([...document.images].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r}))),new Promise(r=>setTimeout(r,4000))])})()` }); // load lazy images so badImg means broken, not unscrolled
    const r = await send('Runtime.evaluate', { returnByValue: true, expression: `(() => {
      const W = document.documentElement.clientWidth; const over = [];
      const root=document.body;
      for (const el of root.querySelectorAll('*')) { const b = el.getBoundingClientRect(); if (!b.width) continue;
        if (el.closest('.mnav,.sw .wrap,.card')) { if(!el.matches('.card')) continue; }
        if (b.right > W + 1 || b.left < -1) over.push((el.className||el.tagName)+' '+Math.round(b.left)+'..'+Math.round(b.right)); }
      const lum=c=>{const m=c.match(/[\\d.]+/g).map(Number);const f=x=>{x/=255;return x<=.03928?x/12.92:Math.pow((x+.055)/1.055,2.4)};return [0.2126*f(m[0])+0.7152*f(m[1])+0.0722*f(m[2]),m[3]===undefined?1:m[3]]};
      const bgOf=el=>{while(el){const c=getComputedStyle(el).backgroundColor;const a=c.match(/[\\d.]+/g);if(a&&(a.length<4||+a[3]>0.5))return c;el=el.parentElement}return 'rgb(251,247,239)'};
      let minFont=99,minEl='',lowC=[];
      const wk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
      while(wk.nextNode()){const t=wk.currentNode;if(!t.textContent.trim())continue;const el=t.parentElement;const b=el.getBoundingClientRect();if(!b.width)continue;const cs=getComputedStyle(el);
        const f=parseFloat(cs.fontSize);if(f<minFont){minFont=f;minEl=el.className+': '+t.textContent.trim().slice(0,30)}
        const [L1]=lum(cs.color),[L2]=lum(bgOf(el));const cr=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);
        const big=f>=24||(f>=18.66&&+cs.fontWeight>=700);if(cr<(big?3:4.5))lowC.push(t.textContent.trim().slice(0,24)+' '+cr.toFixed(2))}
      const imgs=[...root.querySelectorAll('img')].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src.split('/').pop());
      const navs=[...document.querySelectorAll('header nav')].filter(n=>{const c=getComputedStyle(n),b=n.getBoundingClientRect();return c.display!=='none'&&c.visibility!=='hidden'&&b.height>0}).length;
      return {navs,W,scrollW:document.documentElement.scrollWidth,over:over.slice(0,6),overCount:over.length,minFont,minEl,lowC:[...new Set(lowC)].slice(0,8),badImg:imgs,font:document.fonts.check('800 20px Archivo'),H:document.documentElement.scrollHeight};
    })()` });
    out[w+' '+v] = r.result.result ? r.result.result.value : r.result;
    if (shots && (w===390||w===1440)) {
      const H = out[w+' '+v].H; let k=0;
      for (let y=0;y<H;y+=5000,k++){ const s=await send('Page.captureScreenshot',{format:'jpeg',quality:65,captureBeyondViewport:true,clip:{x:0,y,width:w,height:Math.min(5000,H-y),scale:1}});
        writeFileSync(path.join(process.env.SHOTS||dir,`${v}-${w}-${k}.jpg`),Buffer.from(s.result.data,'base64')); }
    }
  }
}
console.log(JSON.stringify(out, null, 1));
const bad = Object.entries(out).filter(([, o]) => !o || o.overCount || o.scrollW > o.W || o.minFont < 13 || (o.lowC || []).length || (o.badImg || []).length || !o.font || o.navs !== 1);
for (const [k, o] of bad) console.log('FAIL ' + k + ' ' + JSON.stringify({ over: o?.over, minFont: o?.minFont, lowC: o?.lowC, badImg: o?.badImg, font: o?.font, navs: o?.navs }));
console.log(`RUBRIC ${Object.keys(out).length - bad.length}/${Object.keys(out).length} pass`);
await send('Browser.close'); await Promise.race([exited, sleep(15000)]); try { chrome.kill(); } catch {}
