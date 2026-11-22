import { spawn } from 'node:child_process';
import { writeFileSync, mkdtempSync, readdirSync, readFileSync, statSync } from 'node:fs';
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
await send('Page.navigate', { url: base + '/index.html' }); await sleep(3000); // warm-up: the first load in a fresh profile reveals gated sections late
const shots = process.argv.includes('--shots');
for (const w of (process.env.WIDTHS || '360,390,768,1280,1440').split(',').map(Number)) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 800 });
  for (const [v,pth] of [['home','/index.html'],['apps','/apps.html'],['pricing','/pricing.html'],['method','/method.html'],['trust','/trust.html'],['which','/which-tool.html'],['coaches','/coaches.html'],['getpaid','/get-paid.html'],['studio','/studio.html'],['consultants','/consultants.html'],['dpa','/dpa.html'],['setup','/get-paid/setup.html'],['support','/support.html'],['st-workout','/apps/workout.html'],['st-potluck','/apps/potluck.html'],['st-deals','/apps/deals.html'],['st-recipes','/apps/recipes.html'],['st-trip','/apps/trip.html'],['st-renewals','/apps/renewals.html']]) {
    if (process.env.ONLY && !process.env.ONLY.split(',').includes(v)) continue;
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
      // navfit: the phone sub-nav chips all fit, no chip cut at the right edge
      const mn=[...document.querySelectorAll('nav.mnav')].find(n=>getComputedStyle(n).display!=='none'&&n.getBoundingClientRect().height>0);
      let navfit=null; if(mn){const last=[...mn.querySelectorAll('a')].pop().getBoundingClientRect();navfit={fit:mn.scrollWidth<=mn.clientWidth+1&&last.right<=W+0.5,scrollW:mn.scrollWidth,clientW:mn.clientWidth,lastRight:Math.round(last.right)}}
      const headwrap=[...document.querySelectorAll('header a')].filter(a=>{const b=a.getBoundingClientRect();if(!b.height)return false;const lh=parseFloat(getComputedStyle(a).lineHeight)||parseFloat(getComputedStyle(a).fontSize)*1.3;return a.getClientRects().length>1||[...a.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()&&(()=>{const r=document.createRange();r.selectNodeContents(n);return r.getClientRects().length>1})())}).map(a=>a.textContent.trim());
      return {headwrap,navfit,navs,W,scrollW:document.documentElement.scrollWidth,over:over.slice(0,6),overCount:over.length,minFont,minEl,lowC:[...new Set(lowC)].slice(0,8),badImg:imgs,font:document.fonts.check('800 20px Archivo'),H:document.documentElement.scrollHeight};
    })()` });
    out[w+' '+v] = r.result.result ? r.result.result.value : r.result;
    // capfit: framed app captures show whole (no crop by the frame), app content not flush to the edge, no page heading above the app
    const c = await send('Runtime.evaluate', { returnByValue: true, awaitPromise: true, expression: `(async()=>{const res=[];
      const all=document.querySelectorAll('.shotw.cap');for(const f of all){const i=f.querySelector('img');const fb=f.getBoundingClientRect(),ib=i.getBoundingClientRect();if(!fb.height)continue;
        if(!i.complete)await new Promise(r=>{i.onload=i.onerror=r});
        const clipped=ib.bottom>fb.bottom+1||ib.right>fb.right+1||ib.height>f.clientHeight+2;
        const cv=document.createElement('canvas');cv.width=i.naturalWidth;cv.height=i.naturalHeight;const x=cv.getContext('2d');x.drawImage(i,0,0);
        const d=x.getImageData(0,0,cv.width,cv.height).data,w=cv.width,h=cv.height;const L=(X,Y)=>{const k=(Y*w+X)*4;return .3*d[k]+.59*d[k+1]+.11*d[k+2]};
        let ink=0,n=0;const x0=Math.round(w*.005),x1=Math.round(w*.06);for(let y=0;y<h;y+=2){n++;let t=0,p=L(x0,y);for(let X=x0+1;X<x1;X++){const v=L(X,y);if(Math.abs(v-p)>60)t++;p=v}if(t>=3)ink++}
        const bg=L(2,h-3);let first=-1,frac=0;for(let y=0;y<h&&first<0;y++){let c=0;for(let X=0;X<w;X+=2)if(Math.abs(L(X,y)-bg)>40)c++;c/=w/2;if(c>0.02){first=y;let c2=0;const yy=Math.min(h-1,y+12);for(let X=0;X<w;X+=2)if(Math.abs(L(X,yy)-bg)>40)c2++;frac=c2/(w/2)}}
        const flush=+(ink/n).toFixed(3);res.push({src:i.src.split('/').pop(),clipped,flush,startsWithApp:frac>=0.5,ok:!clipped&&flush<0.09&&frac>=0.5})}
      if(all.length&&!res.length)res.push({missing:true,ok:false});return res})()` });
    if (out[w+' '+v]) out[w+' '+v].capfit = c.result.result ? c.result.result.value : 'err';
    // henwaybar: no capture shows the Henway bar (cream band at the bottom of a live app). It sits over the app's
    // content, and on shared lists its "Nobody else sees them" line contradicts the page.
    const hb = await send('Runtime.evaluate', { returnByValue: true, awaitPromise: true, expression: `(async()=>{const res=[];const seen=new Set();
      for(const i of document.images){const b=i.getBoundingClientRect();if(!b.width||i.naturalWidth<300)continue;const src=i.currentSrc||i.src;if(seen.has(src))continue;seen.add(src);
        const cv=document.createElement('canvas');cv.width=i.naturalWidth;cv.height=i.naturalHeight;const x=cv.getContext('2d');x.drawImage(i,0,0);let d;try{d=x.getImageData(0,0,cv.width,cv.height).data}catch(e){continue}
        const w=cv.width,h=cv.height;let run=0,hit=-1;for(let y=Math.floor(h*.5);y<h;y++){let n=0,t=0;for(let X=0;X<w;X+=3){t++;const k=(y*w+X)*4;if(Math.abs(d[k]-246)<=5&&Math.abs(d[k+1]-242)<=5&&Math.abs(d[k+2]-232)<=5)n++}
          if(n/t>=.85){run++;if(run>=20){hit=y-19;break}}else run=0}
        if(hit>=0)res.push(src.split('/').pop()+' bar at '+Math.round(hit/h*100)+'%')}
      return res})()` });
    if (out[w+' '+v]) out[w+' '+v].henwaybar = hb.result.result ? hb.result.result.value : ['err'];
    if (shots && (w===390||w===1440)) {
      const H = out[w+' '+v].H; let k=0;
      for (let y=0;y<H;y+=5000,k++){ const s=await send('Page.captureScreenshot',{format:'jpeg',quality:65,captureBeyondViewport:true,clip:{x:0,y,width:w,height:Math.min(5000,H-y),scale:1}});
        writeFileSync(path.join(process.env.SHOTS||dir,`${v}-${w}-${k}.jpg`),Buffer.from(s.result.data,'base64')); }
    }
  }
}
// todo: no TODO-MICHAEL placeholder left anywhere in site/
const walk = d => readdirSync(d).flatMap(f => { const q = path.join(d, f); return statSync(q).isDirectory() ? walk(q) : [q]; });
const todos = walk(path.join(dir, '..', '..', 'site')).filter(f => /\.(html|css|js|txt|xml|json|md)$/.test(f) && readFileSync(f, 'utf8').includes('TODO-MICHAEL')).map(f => path.relative(path.join(dir, '..', '..'), f));
// copy: the retention sweep counts opens as activity, so the sentence says "nobody opened it or saved anything", not "nothing new saved".
// copy: change limits are 10 (free) and 30 a month (kept), so nothing says "unlimited changes".
// copy: the app builds a buildable request in one tap (since 2026-09-27); the split shows WHILE it builds, not before
const stale = walk(path.join(dir, '..', '..', 'site')).filter(f => /\.html$/.test(f) && /before (it|henway) builds?|before building|unlimited changes|nothing new saved|nobody opened it/i.test(readFileSync(f, 'utf8'))).map(f => path.relative(path.join(dir, '..', '..'), f));
// retention: every page that states the 6-month rule uses the app's sentence word for word (henway ee838da)
const RETENTION = "If an app goes 6 months with nobody opening it or saving anything, its saved data is cleared. The app itself stays. Apps you keep for $9, and apps on a paid plan, are kept as they are.";
const retention = walk(path.join(dir, '..', '..', 'site')).filter(f => /\.html$/.test(f)).filter(f => { const t = readFileSync(f, 'utf8').replace(/<[^>]+>/g, ''); return /saved data is cleared/.test(t) && !t.includes(RETENTION); }).map(f => path.relative(path.join(dir, '..', '..'), f));
out['site todo'] = { todos, stale, retention };
console.log(JSON.stringify(out, null, 1));
const bad = Object.entries(out).filter(([k, o]) => k === 'site todo' ? (o.todos.length > 0 || o.stale.length > 0 || o.retention.length > 0) : !o || o.overCount || o.scrollW > o.W || o.minFont < 13 || (o.lowC || []).length || (o.badImg || []).length || !o.font || o.navs !== 1 || (o.navfit && !o.navfit.fit) || (o.headwrap||[]).length || (o.todos||[]).length || (o.henwaybar||[]).length || !Array.isArray(o.capfit) || o.capfit.some(x => !x.ok));
for (const [k, o] of bad) console.log('FAIL ' + k + ' ' + JSON.stringify({ over: o?.over, minFont: o?.minFont, lowC: o?.lowC, badImg: o?.badImg, font: o?.font, navs: o?.navs, navfit: o?.navfit, headwrap: o?.headwrap, todos: o?.todos, stale: o?.stale, retention: o?.retention, henwaybar: o?.henwaybar, capfit: (o?.capfit||[]).filter?.(x=>!x.ok) }));
console.log(`RUBRIC ${Object.keys(out).length - bad.length}/${Object.keys(out).length} pass`);
await send('Browser.close'); await Promise.race([exited, sleep(15000)]); try { chrome.kill(); } catch {}
