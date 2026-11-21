"""Batch 1 comps: Home, Starter apps, Pricing, in look A. Run: python3 build.py"""
import pathlib, json, html as H
P = pathlib.Path(__file__).parent

CSS = r"""
:root{--paper:#fbf7ef;--ink:#1d1810;--muted:#5f584a;--egg:#efe7d6;--off:#f4edde;--line:#e3d9c4;--gold:#a8790a;--goldt:#7a5807;--yellow:#FFCC00;--kraft:#d9c39a;
 --sans:"Archivo","Helvetica Neue",Arial,sans-serif;--max:1160px}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%;scroll-behavior:smooth}
body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--sans);font-size:17px;line-height:1.55;overflow-x:hidden}
img{max-width:100%;display:block}
a{color:inherit}
.wrap{max-width:var(--max);margin:0 auto;padding:0 20px}
/* comp switcher */
.sw{position:sticky;top:0;z-index:50;background:var(--ink);color:var(--paper)}
.sw .wrap{display:flex;gap:8px;align-items:center;min-height:56px;overflow-x:auto}
.sw b{font-size:15px;letter-spacing:.08em;text-transform:uppercase;color:#d8c9a6;margin-right:6px;white-space:nowrap}
.sw button{font:700 16px var(--sans);color:var(--paper);background:transparent;border:1.5px solid #5a4e3c;border-radius:99px;min-height:40px;padding:0 16px;cursor:pointer;white-space:nowrap}
.sw button[aria-pressed=true]{background:var(--yellow);border-color:var(--yellow);color:var(--ink)}
.view{display:none}.view.on{display:block}
/* site chrome */
.top{border-bottom:1px solid var(--line);background:var(--paper)}
.top .wrap{display:flex;align-items:center;gap:20px;min-height:72px}
.top .logo img{height:30px;width:auto}
.top nav{display:flex;gap:4px;margin-left:auto}
.top nav a{font-weight:700;font-size:16px;text-decoration:none;padding:8px 12px;border-radius:99px}
.top nav a.cur{background:var(--egg)}
.top .go{margin-left:8px}
.mnav{display:none}
@media(max-width:900px){.top nav{display:none}.top .go{margin-left:auto}
 .mnav{display:flex;gap:6px;overflow-x:auto;padding:0 20px 12px;scrollbar-width:none}
 .mnav a{flex:none;font-weight:700;font-size:16px;text-decoration:none;padding:8px 14px;border-radius:99px;border:1.5px solid var(--line);background:#fffdf8}
 .mnav a.cur{background:var(--ink);color:var(--paper);border-color:var(--ink)}}
.btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 24px;border-radius:999px;font-weight:800;font-size:17px;text-decoration:none;border:1.5px solid var(--ink);background:#fff;color:var(--ink);white-space:nowrap}
.btn.go{background:var(--yellow);border-color:var(--yellow)}
.btn.dark{background:var(--ink);color:var(--paper);border-color:var(--ink)}
.btn.sm{min-height:44px;padding:0 18px;font-size:16px}
.kick{display:block;font-size:15px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--goldt);margin:0 0 10px}
.hh{font-weight:800;letter-spacing:-.036em;line-height:.98;margin:0}
.hl{color:var(--goldt)}
.h1{font-size:clamp(44px,7.2vw,84px)}
.h2{font-size:clamp(34px,4.6vw,56px)}
.lede{font-size:clamp(18px,1.6vw,21px);line-height:1.45;color:var(--muted);margin:14px 0 22px;max-width:34ch}
.foot{border-top:2px solid var(--ink);margin-top:0;padding:40px 0 56px;background:var(--off)}
.foot .wrap{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:24px}
.foot b{display:block;font-size:15px;letter-spacing:.1em;text-transform:uppercase;color:var(--goldt);margin:0 0 8px}
.foot a{display:block;text-decoration:none;font-weight:600;padding:4px 0;font-size:16px}
.foot p{margin:0;font-size:16px;color:var(--muted)}
.foot img{height:28px;width:auto;margin:0 0 10px}
section{padding:64px 0}
@media(max-width:700px){section{padding:44px 0}}

/* ---------- HOME ---------- */
.hero .wrap{display:grid;grid-template-columns:1fr;gap:28px;align-items:center}
@media(min-width:960px){.hero .wrap{grid-template-columns:1fr 1fr;gap:56px}.hero{padding:80px 0}.ba{max-width:600px;justify-self:end}.ba .wlt{font-size:24px}.ba .wlrow{font-size:18px;padding:9px 0}}
@media(max-width:480px){.ba .wlt{font-size:18px}}
.ba{display:grid;grid-template-columns:44fr 56fr;gap:12px;align-items:start;max-width:560px}
.lab{display:inline-block;font-size:15px;font-weight:800;border-radius:99px;padding:3px 12px;margin:0 0 8px}
.lab.b{background:var(--egg)}.lab.a{background:var(--yellow)}
.ba .before img{border-radius:14px;box-shadow:0 10px 26px rgba(29,24,16,.18);transform:rotate(-2deg)}
.wl{background:#EAF4EE;background-image:radial-gradient(#c9d9cf 1.2px,transparent 1.3px);background-size:14px 14px;border-radius:22px;padding:14px;color:#1b1b22}
.wl.tight{padding:0;background:none}
.wlc{background:#fff;border:2.5px solid #1b1b22;border-radius:18px;box-shadow:5px 5px 0 #1b1b22;padding:14px 15px}
.wlt{font-weight:900;font-stretch:112%;font-size:21px;letter-spacing:-.01em;line-height:1.1;margin:0 0 8px}
.wlrow{display:flex;justify-content:space-between;gap:8px;padding:6px 0;border-bottom:1px solid #e4e4ea;font-size:16px}
.wlrow:last-of-type{border-bottom:0}
.wlrow em{font-style:normal;font-weight:700;white-space:nowrap}
.ok{display:inline-flex;width:20px;height:20px;border-radius:50%;background:#1b1b22;color:#fff;font-size:14px;align-items:center;justify-content:center;margin-right:6px;flex:none}
.ai{font-size:16px;font-weight:700;color:#4d4d58;margin:0 0 6px}
.wlb{display:inline-flex;align-items:center;min-height:44px;padding:0 18px;border-radius:99px;border:2.5px solid #1b1b22;background:#FF6B35;color:#1b1b22;font-weight:800;font-size:16px;box-shadow:3px 3px 0 #1b1b22}
.wlb.ghost{background:#fff}
.acts{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px}
.wlp{font-size:17px;line-height:1.4;margin:0 0 6px}
.price{font-weight:900;font-stretch:112%;font-size:44px;line-height:1;margin:4px 0}
.stat{display:flex;justify-content:space-between;align-items:baseline;margin-top:10px;font-weight:700}
.stat b{font-size:28px;font-weight:900;font-stretch:112%}
.ch .wrap{display:grid;grid-template-columns:1fr;gap:26px;align-items:center}
.ch .vis{width:100%;max-width:460px;justify-self:center}
@media(min-width:900px){.ch .wrap{grid-template-columns:1fr 1fr;gap:64px}.ch.flip .txt{order:2}.ch .vis{justify-self:center}}
.ch.egg{background:var(--egg)}.ch.off{background:var(--off)}
.chat{display:grid;gap:10px}
.me{justify-self:end;max-width:86%;background:var(--ink);color:var(--paper);border-radius:20px 20px 6px 20px;padding:12px 16px;font-size:17px;line-height:1.4}
.hw{display:grid;grid-template-columns:60px 1fr;gap:8px;align-items:end}
.hwc{background:#fff;border:1.5px solid var(--line);border-radius:20px 20px 20px 6px;padding:14px;box-shadow:0 8px 22px rgba(29,24,16,.08)}
.hwc p{margin:0 0 10px;font-size:17px;font-weight:600}
.tile{display:flex;gap:12px;align-items:center;background:var(--off);border-radius:14px;padding:10px}
.tile i{width:48px;height:48px;border-radius:12px;background:#EAF4EE;border:2.5px solid #1b1b22;display:flex;align-items:center;justify-content:center;font-style:normal;font-weight:900;font-size:20px;flex:none}
.tile b{display:block;font-size:17px}.tile span{font-size:16px;color:var(--muted)}
.d2{display:grid;grid-template-columns:1fr;gap:12px;align-items:center}
.d2 .in{display:flex;align-items:center;gap:12px}.d2 .in img{width:88px}
@media(min-width:900px){.d2{grid-template-columns:26% 1fr}.d2 .in{display:block}.d2 .in img{width:auto}.ch .vis.wide{max-width:580px}}
.d2 .in img{border-radius:12px;box-shadow:0 8px 20px rgba(29,24,16,.16);transform:rotate(-3deg)}
.d2 .arrow{font-size:16px;font-weight:800;color:var(--goldt);text-align:center;margin-top:10px}
.d2 .out img{border-radius:16px}
.lock{background:linear-gradient(#3a3026,#1d1810);color:#fff;border-radius:28px;padding:28px 16px 30px;text-align:center;font-family:-apple-system,"SF Pro Display","Helvetica Neue",Arial,sans-serif}
.lock .time{font-size:72px;font-weight:600;letter-spacing:-.03em;line-height:1}
.lock .date{font-size:17px;font-weight:600;margin:4px 0 22px}
.note{background:rgba(255,255,255,.95);color:#000;border-radius:18px;padding:12px 14px;text-align:left}
.note .from{display:flex;justify-content:space-between;font-size:14px;font-weight:600;color:#333}
.note .bg{font-size:21px;font-weight:700;margin:3px 0 1px}.note .sm{font-size:16px}
.shelf{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
@media(min-width:900px){.shelf{grid-template-columns:repeat(4,1fr)}}
.st{background:#fffdf8;border:1.5px solid var(--line);border-radius:18px;padding:14px;display:flex;flex-direction:column;gap:8px;text-decoration:none}
.st img{border-radius:12px;border:1px solid var(--line);aspect-ratio:1/1;object-fit:cover;object-position:top}
.st .tg{font-size:15px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--goldt)}
.st .pn{font-size:18px;font-weight:800;line-height:1.2;letter-spacing:-.01em;flex:1}
.st .mm{font-size:16px;font-weight:800;text-decoration:underline;text-underline-offset:3px}
.closer{text-align:center}
.closer img{width:130px;margin:0 auto 10px}
.closer .lede{margin-left:auto;margin-right:auto}
.trustl{font-size:16px;color:var(--muted);margin:14px 0 0}

/* ---------- STARTER SHOP ---------- */
.shophero{padding:64px 0 28px}
.shophero .h1{max-width:11ch}
.pick{display:flex;flex-wrap:wrap;gap:8px;margin:6px 0 0}
.pick span{font-weight:800;font-size:16px;margin-right:6px;align-self:center}
.pick button{font:700 16px var(--sans);min-height:44px;padding:0 16px;border-radius:99px;border:1.5px solid var(--ink);background:#fffdf8;color:var(--ink);cursor:pointer}
.pick button[aria-pressed=true]{background:var(--ink);color:var(--paper)}
.grid{display:grid;grid-template-columns:1fr;gap:30px;padding:28px 0 8px}
@media(min-width:700px){.grid{grid-template-columns:1fr 1fr;gap:34px}}
@media(min-width:1100px){.grid{grid-template-columns:repeat(3,1fr)}}
.card{position:relative;background:#fffdf8;border:2px solid var(--ink);border-radius:22px;padding:18px 18px 20px;box-shadow:6px 6px 0 var(--ink);display:flex;flex-direction:column}
.card:nth-child(3n+1){transform:rotate(-.6deg)}.card:nth-child(3n+2){transform:rotate(.5deg)}
.card:before{content:"";position:absolute;top:-14px;left:50%;width:110px;height:28px;margin-left:-55px;background:rgba(217,195,154,.85);transform:rotate(-3deg);border-radius:2px}
.card .tg{font-size:15px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--goldt)}
.card h3{font-size:clamp(24px,2.3vw,28px);line-height:1.08;letter-spacing:-.025em;font-weight:800;margin:6px 0 14px}
.card .shot{border-radius:16px;overflow:hidden;border:1.5px solid var(--line);background:var(--off);aspect-ratio:13/16}
.card .shot img{width:100%;height:100%;object-fit:cover;object-position:top}
.card .nm{display:flex;justify-content:space-between;align-items:baseline;gap:8px;margin:14px 0 2px}
.card .nm b{font-size:20px;letter-spacing:-.01em}
.card .nm small{font-size:15px;color:var(--muted);font-weight:600;white-space:nowrap}
.card p{margin:0 0 12px;font-size:17px;color:var(--muted)}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 16px}
.chips i{font-style:normal;font-size:15px;font-weight:700;background:var(--egg);border-radius:99px;padding:3px 10px}
.card .row{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:auto}
.card .row a.open{font-weight:800;font-size:16px;text-underline-offset:3px}
.card .pz{font-size:15px;color:var(--muted);font-weight:600;margin:12px 0 0}
.how{display:grid;grid-template-columns:1fr;gap:14px;counter-reset:s}
@media(min-width:800px){.how{grid-template-columns:repeat(3,1fr)}}
.how div{border-top:3px solid var(--ink);padding:14px 0 0}
.how div b{display:block;font-size:24px;letter-spacing:-.02em;margin:0 0 4px}
.how div b:before{counter-increment:s;content:counter(s) ". ";color:var(--goldt)}
.how div span{color:var(--muted)}
.more{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}
.more a{font-weight:700;font-size:16px;text-decoration:none;border:1.5px solid var(--line);background:#fffdf8;border-radius:99px;padding:8px 14px}
.say{max-width:640px;margin:0 auto;text-align:left;background:#fff;border:2px solid var(--ink);border-radius:20px;padding:16px 16px 14px;box-shadow:6px 6px 0 var(--ink)}
.say .ph{font-size:18px;color:var(--muted);min-height:56px}
.say .row{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}
.say small{font-size:15px;color:var(--muted)}

/* ---------- PRICING ---------- */
.phero{padding:56px 0 20px;text-align:center}
.free{font-weight:900;font-stretch:115%;font-size:clamp(110px,22vw,250px);line-height:.85;letter-spacing:-.05em;margin:6px 0 10px}
.phero .lede{margin:6px auto 24px;max-width:30ch}
.tiers{display:grid;grid-template-columns:1fr;gap:18px;padding:30px 0 10px;align-items:stretch}
@media(min-width:900px){.tiers{grid-template-columns:repeat(3,1fr)}}
.tier{background:#fffdf8;border:1.5px solid var(--line);border-radius:22px;padding:24px 22px;display:flex;flex-direction:column}
.tier.hot{border:2.5px solid var(--ink);box-shadow:6px 6px 0 var(--yellow),6px 6px 0 2.5px var(--ink)}
.tier .tt{display:flex;justify-content:space-between;align-items:center;gap:8px}
.tier .tt b{font-size:22px;letter-spacing:-.01em}
.badge{font-size:15px;font-weight:800;background:var(--yellow);border-radius:99px;padding:3px 12px}
.amt{display:flex;align-items:baseline;gap:8px;margin:14px 0 4px}
.amt span{font-size:60px;font-weight:900;font-stretch:112%;letter-spacing:-.04em;line-height:1}
.amt small{font-size:16px;font-weight:700;color:var(--muted)}
.tier .for{font-size:17px;color:var(--muted);margin:0 0 16px}
.tier ul{list-style:none;padding:0;margin:0 0 22px;display:grid;gap:10px}
.tier li{display:grid;grid-template-columns:22px 1fr;gap:8px;font-size:17px;line-height:1.4}
.tier li:before{content:"✓";font-weight:900;color:var(--goldt)}
.tier li.x{color:var(--muted)}.tier li.x:before{content:"–"}
.tier .btn{margin-top:auto;width:100%}
.paid{background:var(--ink);color:var(--paper)}
.paid .kick{color:#e9c55a}
.paid .wrap{display:grid;grid-template-columns:1fr;gap:30px;align-items:center}
@media(min-width:900px){.paid .wrap{grid-template-columns:1fr 1fr;gap:64px}}
.paid .lede{color:#d9cfbb}
.big5{font-weight:900;font-stretch:115%;font-size:clamp(96px,14vw,170px);line-height:.85;letter-spacing:-.05em;color:var(--yellow)}
.paid ul{list-style:none;padding:0;margin:18px 0 0;display:grid;gap:10px;font-size:18px}
.paid li:before{content:"✓  ";color:var(--yellow);font-weight:900}
.cons{display:grid;grid-template-columns:1fr;gap:14px;margin-top:22px}
@media(min-width:800px){.cons{grid-template-columns:repeat(3,1fr)}}
.con{border:1.5px solid var(--line);border-radius:18px;padding:18px;background:#fffdf8}
.con b{font-size:20px}.con .a{font-size:34px;font-weight:900;letter-spacing:-.03em;margin:6px 0 0}
.con .a small{font-size:16px;color:var(--muted);font-weight:700}
.con .y{font-size:16px;color:var(--muted);margin:2px 0 10px}
.con p{margin:0;font-size:16px}
.faq{display:grid;grid-template-columns:1fr;gap:0;max-width:820px}
.faq details{border-bottom:1.5px solid var(--line);padding:16px 0}
.faq summary{font-weight:800;font-size:19px;cursor:pointer;list-style:none;display:flex;justify-content:space-between;gap:10px}
.faq summary:after{content:"+";color:var(--goldt);font-size:24px;line-height:1}
.faq details[open] summary:after{content:"–"}
.faq p{margin:10px 0 0;color:var(--muted);font-size:17px}

/* ---------- NOTES ---------- */
.notes h2{font-size:clamp(28px,3.4vw,40px);letter-spacing:-.02em;margin:0 0 8px;line-height:1.1}
.notes .sub{color:var(--muted);margin:0 0 20px;max-width:70ch}
.notes section{border-bottom:1px solid var(--line)}
table.t{width:100%;border-collapse:collapse;font-size:16px}
table.t th{text-align:left;font-size:15px;letter-spacing:.05em;text-transform:uppercase;border-bottom:2px solid var(--ink);padding:8px 10px 8px 0}
table.t td{border-bottom:1px solid var(--line);padding:11px 10px 11px 0;vertical-align:top}
table.t td:first-child{font-weight:800;white-space:nowrap}
.dec{display:inline-block;font-weight:800;font-size:15px;border-radius:99px;padding:2px 10px;background:var(--egg);white-space:nowrap}
.dec.rb{background:var(--yellow)}.dec.rt{background:#f3dfa0}.dec.nw{background:var(--ink);color:var(--paper)}.dec.rd{background:#f0d2c4}
@media(max-width:760px){table.t thead{display:none}table.t tr{display:block;border-bottom:1px solid var(--line);padding:12px 0}table.t td{display:block;border:0;padding:3px 0}}
.board{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px}
.board figure{margin:0;background:#fffdf8;border:1.5px solid var(--line);border-radius:16px;overflow:hidden}
.board img{aspect-ratio:1222/731;object-fit:cover;object-position:top;width:100%}
.board figcaption{padding:12px 14px 16px;font-size:16px}
.board figcaption b{display:block;font-size:18px}
.board .aw{display:inline-block;font-size:15px;font-weight:800;background:var(--yellow);border-radius:99px;padding:1px 10px;margin:4px 0 6px}
.board .pg{display:inline-block;font-size:15px;font-weight:800;background:var(--egg);border-radius:99px;padding:1px 10px;margin:4px 6px 6px 0}
.gate{columns:2 300px;margin:0;padding-left:20px}.gate li{margin:0 0 8px}
.qs{list-style:none;padding:0;margin:0;display:grid;gap:12px}
.qs li{border:2px solid var(--ink);border-radius:16px;padding:16px 18px;font-size:19px;font-weight:700;background:#fffdf8}
.qs li span{display:block;font-size:16px;font-weight:600;color:var(--muted);margin-top:6px}
.pok{font-weight:800}
"""

LOGO = '<img src="img/logo-black.png" alt="Henway">'
NAV = [("home", "Home"), ("apps", "Starter apps"), ("method", "How it works"), ("pricing", "Pricing"), ("trust", "Trust")]

def link(k):
    return f"#{k}"

def chrome_top(cur):
    a = "".join(f'<a href="{link(k)}"{" class=cur" if k==cur else ""}>{t}</a>' for k, t in NAV)
    return f'''<header class="top"><div class="wrap"><a class="logo" href="#home">{LOGO}</a><nav aria-label="Main">{a}</nav>
<a class="btn go sm go" href="https://app.henwayai.com/try">Start free</a></div><div class="mnav" aria-label="Main, small screens">{a}</div></header>'''

FOOT = '''<footer class="foot"><div class="wrap">
<div><img src="img/logo-black.png" alt="Henway"><p>If you can complain to a friend, you can make an app.</p></div>
<div><b>Product</b><a href="#apps">Starter apps</a><a href="#method">How it works</a><a href="#pricing">Pricing</a><a href="#trust">Trust</a><a href="#getpaid">Get paid</a></div>
<div><b>More</b><a href="#coaches">For coaches</a><a href="#consultants">For consultants</a><a href="#studio">Studio</a><a href="#which">Henway vs AI app builders</a><a href="#dpa">DPA</a></div>
<div><b>Help</b><a href="https://app.henwayai.com/help">Support</a><a href="https://app.henwayai.com/privacy">Privacy</a><a href="https://app.henwayai.com/terms">Terms</a></div>
</div></footer>'''

# ---------------- HOME ----------------
HOME = chrome_top("home") + """
<section class="hero"><div class="wrap">
 <div class="txt">
  <h1 class="hh h1">If you can complain to a friend, you can <span class="hl">make an app.</span></h1>
  <p class="lede">Your coach's texts, turned into a log your clients use.</p>
  <a class="btn go" href="https://app.henwayai.com/try">Start free</a>
 </div>
 <div class="ba">
  <div class="before"><span class="lab b">Before</span><img src="img/coach-thread.png" alt="A long text from Coach Tasha with Monday's leg workout"></div>
  <div><span class="lab a">After</span>
   <div class="wl tight"><div class="wlc">
    <div class="wlt">Monday · Legs</div>
    <div class="wlrow"><span><span class="ok">✓</span>Squat</span><em>4×8</em></div>
    <div class="wlrow"><span><span class="ok">✓</span>RDL</span><em>3×10</em></div>
    <div class="wlrow"><span><span class="ok">✓</span>Lunges</span><em>3×12</em></div>
    <div class="wlrow"><span><span class="ok">✓</span>Press</span><em>3×10</em></div>
    <div class="wlrow"><span><span class="ok">✓</span>Plank</span><em>3×45s</em></div>
   </div></div></div>
 </div>
</div></section>

<section class="ch off"><div class="wrap">
 <div class="txt"><span class="kick">Day 1</span><h2 class="hh h2">Tasha complains. <span class="hl">Henway builds it.</span></h2>
  <p class="lede">No forms. Just say what's bugging you.</p></div>
 <div class="vis"><div class="chat">
  <div class="me">My clients lose the workouts I text them. Then they ask me again.</div>
  <div class="hw"><img src="img/chick-shades-tight.png" alt="Henway chick">
   <div class="hwc"><p>Here's your app. Send it to your clients.</p>
    <div class="tile"><i>W</i><div><b>Workout Log</b><span>Ready for 12 clients</span></div></div></div></div>
 </div></div>
</div></section>

<section class="ch flip"><div class="wrap">
 <div class="txt"><span class="kick">Day 2</span><h2 class="hh h2">Snap the plan. <span class="hl">It's logged.</span></h2>
  <p class="lede">A screenshot goes in. Sets come out.</p></div>
 <div class="vis wide"><div class="d2">
  <div class="in"><img src="img/coach-thread.png" alt="The coach's text, as a screenshot"><div class="arrow">Screenshot →</div></div>
  <div class="out wl"><img src="img/day2-read.jpg" alt="Workout Log reads five sets from the screenshot: back squat 4 by 8 at 135, Romanian deadlift 3 by 10 at 95, walking lunges, leg press, plank. Check these sets."></div>
 </div></div>
</div></section>

<section class="ch egg"><div class="wrap">
 <div class="txt"><span class="kick">Week 1</span><h2 class="hh h2">It reminds <span class="hl">every client.</span></h2>
  <p class="lede">Tasha picks the days. The app does the nudging.</p></div>
 <div class="vis"><div class="lock"><div class="time">7:00</div><div class="date">Monday, January 5</div>
  <div class="note"><div class="from"><span>WORKOUT LOG</span><span>now</span></div>
  <div class="bg">Leg day, Jordan.</div><div class="sm">Last time: back squat 4 × 8 at 135.</div></div></div></div>
</div></section>

<section class="ch flip"><div class="wrap">
 <div class="txt"><span class="kick">Week 2</span><h2 class="hh h2">It spots <span class="hl">what's missing.</span></h2>
  <p class="lede">Then it suggests what's next.</p></div>
 <div class="vis"><div class="wl"><div class="wlc">
   <div class="ai">✦ Suggested by AI</div>
   <p class="wlp"><b>Jordan</b> hasn't logged since Tuesday.</p>
   <p class="wlp">9 of 12 clients did legs this week.</p>
   <div class="acts"><span class="wlb">Nudge Jordan</span><span class="wlb ghost">Dismiss</span></div></div>
  <div class="wlc" style="margin-top:14px"><div class="ai">✦ Next for your app</div>
   <p class="wlp">Add a progress chart for each client?</p>
   <div class="acts"><span class="wlb">Add it</span><span class="wlb ghost">Not now</span></div></div></div></div>
</div></section>

<section class="ch egg"><div class="wrap">
 <div class="txt"><span class="kick">Month 1</span><h2 class="hh h2">Her clients <span class="hl">pay in the app.</span></h2>
  <p class="lede">The January challenge sells itself.</p></div>
 <div class="vis"><div class="wl"><div class="wlc">
   <div class="wlt">January Challenge</div><p class="wlp" style="color:#4d4d58">4 weeks with Coach Tasha</p>
   <div class="price">$40</div><div class="acts"><span class="wlb">Pay $40</span></div></div>
  <div class="wlc" style="margin-top:14px"><div class="stat"><span>Joined</span><b>12</b></div><div class="stat"><span>Paid to Tasha</span><b>$480</b></div></div></div></div>
</div></section>

<section class="ch off"><div class="wrap" style="grid-template-columns:1fr">
 <div class="txt"><span class="kick">Your turn</span><h2 class="hh h2">Make <span class="hl">yours.</span></h2>
  <p class="lede" style="max-width:46ch">Start from an app someone already needed. Change anything.</p></div>
 <div class="shelf">
  <a class="st" href="#apps"><img src="img/st-workout.jpg" alt="Workout Log"><span class="tg">Coaches</span><span class="pn">"My clients lose my workouts."</span><span class="mm">Make it mine</span></a>
  <a class="st" href="#apps"><img src="img/st-potluck.jpg" alt="Dish List"><span class="tg">Hosts</span><span class="pn">"Three people said mac and cheese."</span><span class="mm">Make it mine</span></a>
  <a class="st" href="#apps"><img src="img/st-deals.jpg" alt="Brand Deals"><span class="tg">Creators</span><span class="pn">"Three brands owe me money."</span><span class="mm">Make it mine</span></a>
  <a class="st" href="#apps"><img src="img/st-trip.jpg" alt="Group trip"><span class="tg">Trips</span><span class="pn">"Who's bringing the cooler?"</span><span class="mm">Make it mine</span></a>
 </div>
 <p style="font-size:18px;font-weight:700;margin:4px 0 0">First app free. Keep any app for $9, once. <a href="#apps">See all starters →</a></p>
</div></section>

<section class="closer"><div class="wrap">
 <img src="img/hatching-chick.png" alt="A chick hatching from its egg">
 <h2 class="hh h2">What's bugging <span class="hl">you?</span></h2>
 <p class="lede">Tell Henway. Your first app is free.</p>
 <a class="btn go" href="https://app.henwayai.com/try">Start free</a>
 <p class="trustl">It asks before AI sees anything.</p>
</div></section>
""" + FOOT

# ---------------- STARTER SHOP ----------------
ST = [
 dict(k="workout", key="qaVPwtlEpxfqaC48QkXvpPJk", f="clients", tg="Coaches", q="My clients lose the workouts I text them.", nm="Workout Log",
      d="Clients snap your plan and their sets are logged.", ch=["Reads screenshots", "Shared with clients", "Reminders"]),
 dict(k="potluck", key="7FHkMiAU4ocdNeOF6rog6Wjb", f="group", tg="Hosts", q="Three people said mac and cheese.", nm="Dish List",
      d="Everyone adds a dish. You see what's still missing.", ch=["One shared link", "What's missing?"]),
 dict(k="deals", key="Ln0XlH8zbT5Nmq8pg-W8r5_K", f="money", tg="Creators", q="Three brands owe me money.", nm="Brand Deals",
      d="Snap the contract. See who owes you and what's late.", ch=["Reads contracts", "Overdue at the top"]),
 dict(k="trip", key="UPcd_kRT3qSMcxM95Jrl6mlE", f="group", tg="Trips", q="Who's bringing the cooler?", nm="Group Trip",
      d="Days, plans and who's bringing what, at one link.", ch=["One shared link", "What are we forgetting?"]),
 dict(k="recipes", key="b2ILS-fPhAe4GKifPwkVnHrK", f="kitchen", tg="Cooks", q="I save recipes and still don't know what's for dinner.", nm="Recipe Box",
      d="Snap a recipe card. Ask what you can make tonight.", ch=["Reads photos", "Pantry"]),
 dict(k="renewals", key="vwdwJyF0QWndhXQgVlbWgJvX", f="work", tg="Nurses and pros", q="My license renewal snuck up on me.", nm="License Renewals",
      d="Every license and CE hour, with due dates on your calendar.", ch=["Calendar dates", "What's missing?"]),
]
def card(s):
    mine = f"https://app.henwayai.com/try?from={s['key']}&utm_source=site&utm_medium=starter"
    opn = f"https://api.henwayai.com/s/{s['key']}"
    chips = "".join(f"<i>{c}</i>" for c in s["ch"])
    return f'''<article class="card" data-f="{s['f']}"><span class="tg">{s['tg']}</span><h3>"{s['q']}"</h3>
<div class="shot"><img src="img/st-{s['k']}.jpg" alt="{s['nm']}, the starter app, open on a phone" loading="lazy"></div>
<div class="nm"><b>{s['nm']}</b><small>By Henway</small></div><p>{s['d']}</p><div class="chips">{chips}</div>
<div class="row"><a class="btn go sm" href="{mine}">Make it mine</a><a class="open" href="{opn}">Open it</a></div>
<p class="pz">Free to start · $9 to keep</p></article>'''

APPS = chrome_top("apps") + f"""
<section class="shophero"><div class="wrap">
 <span class="kick">Starter apps</span>
 <h1 class="hh h1">Find <span class="hl">yours.</span></h1>
 <p class="lede" style="max-width:40ch">Each one started as a complaint. Pick the one that sounds like your week, then make it yours.</p>
 <div class="pick" role="group" aria-label="Filter starters"><span>What's bugging you?</span>
  <button aria-pressed="true" data-f="all">Everything</button><button aria-pressed="false" data-f="clients">My clients</button>
  <button aria-pressed="false" data-f="group">My group</button><button aria-pressed="false" data-f="money">My money</button>
  <button aria-pressed="false" data-f="kitchen">My kitchen</button><button aria-pressed="false" data-f="work">My work</button></div>
</div></section>
<div class="wrap"><div class="grid">{''.join(card(s) for s in ST)}</div></div>

<section><div class="wrap">
 <span class="kick">How starters work</span><h2 class="hh h2" style="margin-bottom:24px">Yours in <span class="hl">a minute.</span></h2>
 <div class="how">
  <div><b>Pick one</b><span>Open it first. Put something real in.</span></div>
  <div><b>Say what's different</b><span>"My clients train three days, not five." It changes.</span></div>
  <div><b>Keep it</b><span>Your first app is free. Keep any app for $9, once.</span></div>
 </div>
</div></section>

<section class="closer" style="background:var(--egg)"><div class="wrap">
 <h2 class="hh h2" style="margin-bottom:22px">Don't see <span class="hl">yours?</span></h2>
 <div class="say"><div class="ph">Say it like you'd text a friend…</div>
  <div class="row"><small>It asks before AI sees anything.</small><a class="btn go sm" href="https://app.henwayai.com/try">Build mine</a></div></div>
</div></section>
""" + FOOT

# ---------------- PRICING ----------------
PRICING = chrome_top("pricing") + """
<section class="phero"><div class="wrap">
 <span class="kick">Pricing</span>
 <div class="free">Free.</div>
 <h1 class="hh" style="font-size:clamp(26px,3vw,34px);letter-spacing:-.02em">Your first app is free.</h1>
 <p class="lede">Make it, change it, share it. Pay only to keep more.</p>
 <a class="btn go" href="https://app.henwayai.com/try">Start free</a>
</div></section>

<div class="wrap"><div class="tiers">
 <div class="tier"><div class="tt"><b>Free</b></div>
  <div class="amt"><span>$0</span></div><p class="for">Your first app, start to finish.</p>
  <ul><li>An app at its own link</li><li>Change it by saying so</li><li>Share it with your people</li><li>20 AI answers a day</li><li class="x">Cleared if nobody opens it for 6 months</li></ul>
  <a class="btn" href="https://app.henwayai.com/try">Start free</a></div>
 <div class="tier hot"><div class="tt"><b>Keep it</b><span class="badge">Pay once</span></div>
  <div class="amt"><span>$9</span><small>once, per app</small></div><p class="for">For the app you'll use for years.</p>
  <ul><li>Stays at its link, even if it sits unopened</li><li>200 AI answers a day, not 20</li><li>Help from Henway with that app</li><li>No subscription</li></ul>
  <a class="btn go" href="https://app.henwayai.com/try">Keep an app</a></div>
 <div class="tier"><div class="tt"><b>Build it with Michael</b></div>
  <div class="amt"><span>$150</span><small>60 minutes</small></div><p class="for">Bring the idea. Leave with the app.</p>
  <ul><li>One hour, building it together, live</li><li>Your app, set up and shared</li><li>Counts toward Studio if you hand it over</li></ul>
  <a class="btn dark" href="https://book.stripe.com/8x228t78q6I4fiS9L2bo400">Book the hour</a></div>
</div></div>

<section class="paid" style="margin-top:56px"><div class="wrap">
 <div><span class="kick">When your app gets paid</span>
  <div class="big5">5%</div>
  <h2 class="hh h2" style="margin-top:16px">Sell inside <span style="color:var(--yellow)">your app.</span></h2>
  <p class="lede">Classes, challenges, plans. Clients pay in the app. Henway's fee is 5% of each payment.</p>
  <ul><li>No monthly charge</li><li>Payouts to your bank, through Stripe</li><li>Turn it on with one sentence</li></ul></div>
 <div class="vis" style="max-width:440px;justify-self:center;width:100%"><div class="wl"><div class="wlc">
   <div class="wlt">January Challenge</div><p class="wlp" style="color:#4d4d58">4 weeks with Coach Tasha</p>
   <div class="price">$40</div><div class="acts"><span class="wlb">Pay $40</span></div></div>
  <div class="wlc" style="margin-top:14px"><div class="stat"><span>Joined</span><b>12</b></div><div class="stat"><span>Paid</span><b>$480</b></div><div class="stat"><span>Henway's 5%</span><b>$24</b></div></div></div></div>
</div></section>

<section><div class="wrap">
 <span class="kick">For consultants and agencies</span>
 <h2 class="hh h2">Run discovery <span class="hl">with clients.</span></h2>
 <p class="lede" style="max-width:52ch">Monthly plans for people who run Henway sessions for others, under their own brand.</p>
 <div class="cons">
  <div class="con"><b>Founder</b><div class="a">$29<small>/mo</small></div><div class="y">or $249 a year</div><p>10 builds a month. Save, resume and share sessions.</p></div>
  <div class="con"><b>Consultant</b><div class="a">$139<small>/mo</small></div><div class="y">or $1,199 a year</div><p>150 discoveries a month. Your brand. A widget for your site.</p></div>
  <div class="con"><b>Agency</b><div class="a">$249<small>/mo</small></div><div class="y">or $1,999 a year</div><p>5 seats, 600 discoveries, your own domain.</p></div>
 </div>
 <p style="margin:18px 0 0;font-weight:700"><a href="https://www.henwayai.com/consultants">See Henway for consultants →</a></p>
</div></section>

<section style="padding-top:0"><div class="wrap">
 <span class="kick">Questions</span>
 <div class="faq">
  <details><summary>Can I change my free app?</summary><p>Yes. Say what you want different and the app updates. Free apps change too.</p></details>
  <details><summary>What happens after 6 months?</summary><p>A free app nobody opens for 6 months gets cleared. Keep it for $9, once, and it stays.</p></details>
  <details><summary>What's an AI answer?</summary><p>Some apps have a button that reads a photo or suggests something. Each tap is one answer. Free apps get 20 a day. Kept apps get 200.</p></details>
  <details><summary>Is $9 a subscription?</summary><p>No. You pay once for each app you keep.</p></details>
 </div>
</div></section>

<section class="closer" style="background:var(--egg)"><div class="wrap">
 <img src="img/hatching-chick.png" alt="A chick hatching from its egg">
 <h2 class="hh h2">Start with <span class="hl">one.</span></h2>
 <p class="lede">Your first app is free.</p>
 <a class="btn go" href="https://app.henwayai.com/try">Start free</a>
</div></section>
""" + FOOT

CSS2 = r"""
.phead{padding:64px 0 36px}
.phead .lede{max-width:44ch}
.steps{display:grid;gap:0}
.step .wrap{display:grid;grid-template-columns:1fr;gap:26px;align-items:center}
@media(min-width:900px){.step .wrap{grid-template-columns:1fr 1fr;gap:64px}.step:nth-child(even) .txt{order:2}}
.step .num{font-weight:900;font-stretch:115%;font-size:clamp(64px,8vw,104px);line-height:.8;color:var(--gold);letter-spacing:-.05em;margin:0 0 8px}
.step:nth-child(even){background:var(--off)}
.card2{background:#fff;border:1.5px solid var(--line);border-radius:20px;padding:16px;box-shadow:0 10px 26px rgba(29,24,16,.08)}
.card2 h4{margin:0 0 8px;font-size:16px;letter-spacing:.08em;text-transform:uppercase;color:var(--goldt)}
.card2 p{margin:0 0 10px;font-size:17px}
.split{display:grid;gap:10px}
.split div{border-radius:14px;padding:12px 14px;font-size:17px}
.split b{display:block;font-size:15px;letter-spacing:.08em;text-transform:uppercase;margin:0 0 2px}
.split .y{background:#EAF4EE}.split .p{background:var(--off)}.split .n{background:#f6e3d8}
.vers{list-style:none;margin:0;padding:0}
.vers li{display:flex;justify-content:space-between;gap:10px;padding:10px 0;border-bottom:1px solid var(--line);font-size:17px}
.vers li:last-child{border:0}.vers em{font-style:normal;color:var(--muted);white-space:nowrap}
.spec{border-top:2px solid var(--ink)}
.spec div{display:grid;grid-template-columns:1fr;gap:2px;padding:14px 0;border-bottom:1px solid var(--line)}
@media(min-width:700px){.spec div{grid-template-columns:240px 1fr;gap:24px}}
.spec b{font-size:18px}.spec span{color:var(--muted)}
.facts{display:grid;grid-template-columns:1fr;gap:14px}
@media(min-width:700px){.facts{grid-template-columns:1fr 1fr}}
@media(min-width:1100px){.facts{grid-template-columns:repeat(3,1fr)}}
.fact{background:#fffdf8;border:1.5px solid var(--line);border-radius:18px;padding:20px}
.fact .k{font-size:15px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--goldt)}
.fact b{display:block;font-size:22px;letter-spacing:-.02em;line-height:1.15;margin:6px 0 8px}
.fact p{margin:0;color:var(--muted);font-size:17px}
.consent{max-width:420px;background:#fff;border:2.5px solid #1b1b22;border-radius:20px;box-shadow:6px 6px 0 #1b1b22;padding:18px}
.consent p{font-size:18px;margin:0 0 14px;font-weight:600}
.subs{display:flex;flex-wrap:wrap;gap:8px}.subs i{font-style:normal;font-weight:700;font-size:16px;border:1.5px solid var(--line);border-radius:99px;padding:6px 14px;background:#fffdf8}
.cmp{width:100%;border-collapse:collapse;font-size:17px}
.cmp th,.cmp td{text-align:left;vertical-align:top;padding:14px 12px 14px 0;border-bottom:1px solid var(--line)}
.cmp thead th{font-size:16px;border-bottom:2px solid var(--ink)}
.cmp thead th small{display:block;font-weight:600;color:var(--muted);font-size:15px}
.cmp td:first-child{font-weight:800;width:18%}
.cmp .us{background:#fff7d1}
@media(max-width:820px){.cmp thead{display:none}.cmp tr{display:block;border-bottom:2px solid var(--ink);padding:12px 0}.cmp td{display:block;border:0;padding:4px 0;width:auto}
 .cmp td:before{content:attr(data-h);display:block;font-size:15px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--goldt)}.cmp td:first-child{font-size:20px}.cmp td:first-child:before{content:none}.cmp .us{background:none;border-left:4px solid var(--yellow)!important;padding-left:10px}}
.idx{counter-reset:i;list-style:none;padding:0;margin:0;border-top:2px solid var(--ink)}
.idx li{display:grid;grid-template-columns:56px 1fr;gap:10px;padding:16px 0;border-bottom:1px solid var(--line);font-size:18px}
.idx li:before{counter-increment:i;content:"(" counter(i) ")";font-weight:800;color:var(--goldt)}
.idx li b{display:block}.idx li span{color:var(--muted);font-size:17px}
.quest{position:relative;max-width:520px;height:600px;margin:0 auto;width:100%}
.quest>div{position:absolute;width:78%}
.quest .q1{left:0;top:0;transform:rotate(-4deg)}.quest .q2{right:0;top:215px;transform:rotate(3deg);z-index:2}.quest .q3{left:6%;top:375px;transform:rotate(-1.5deg);z-index:3}
@media(max-width:420px){.quest{height:540px}.quest>div{width:90%}.quest .q2{top:200px}.quest .q3{top:370px}}
.tl{list-style:none;padding:0;margin:0;display:grid;gap:0;border-left:3px solid var(--ink);margin-left:8px}
.tl li{position:relative;padding:0 0 22px 22px}
.tl li:before{content:"";position:absolute;left:-10px;top:4px;width:17px;height:17px;border-radius:50%;background:var(--yellow);border:3px solid var(--ink)}
.tl b{display:block;font-size:15px;letter-spacing:.1em;text-transform:uppercase;color:var(--goldt)}
.tl span{font-size:19px;font-weight:700}
.three{display:grid;grid-template-columns:1fr;gap:18px}
@media(min-width:800px){.three{grid-template-columns:repeat(3,1fr)}}
.three div{border-top:3px solid var(--ink);padding-top:14px}
.three b{display:block;font-size:24px;letter-spacing:-.02em;margin:0 0 6px}.three span{color:var(--muted)}
.ways{display:grid;grid-template-columns:1fr;gap:20px}
@media(min-width:900px){.ways{grid-template-columns:1fr 1fr}}
.way{background:#fffdf8;border:2px solid var(--ink);border-radius:22px;padding:24px;box-shadow:6px 6px 0 var(--ink)}
.way .n{font-weight:900;font-size:56px;letter-spacing:-.04em;line-height:1;color:var(--goldt)}
.way h3{font-size:clamp(26px,2.6vw,32px);letter-spacing:-.02em;line-height:1.05;margin:8px 0 8px}
.way p{color:var(--muted);margin:0 0 16px}
.listing{display:flex;gap:12px;align-items:center;background:var(--off);border-radius:16px;padding:12px}
.listing img{width:76px;height:76px;object-fit:cover;object-position:top;border-radius:12px;border:1.5px solid var(--line)}
.listing b{display:block;font-size:18px}.listing span{font-size:16px;color:var(--muted)}
.listing .pr{margin-left:auto;font-weight:900;font-size:22px}
.offers{display:grid;grid-template-columns:1fr;gap:22px}
@media(min-width:900px){.offers{grid-template-columns:repeat(3,1fr)}}
.offer{background:#fffdf8;border:2px solid var(--ink);border-radius:22px;padding:22px;display:flex;flex-direction:column}
.offer:nth-child(1){transform:rotate(-.5deg)}.offer:nth-child(3){transform:rotate(.5deg)}
.offer .tg{font-size:15px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--goldt)}
.offer h3{font-size:26px;letter-spacing:-.02em;line-height:1.05;margin:8px 0 8px}
.offer p{color:var(--muted);margin:0 0 16px}
.offer .pp{font-weight:900;font-size:34px;letter-spacing:-.03em;line-height:1}
.offer .pp small{display:block;font-size:16px;font-weight:700;color:var(--muted);margin-top:6px;letter-spacing:0}
.offer .btn{margin-top:20px}
.quote{font-size:clamp(24px,3vw,34px);font-weight:800;letter-spacing:-.02em;line-height:1.2;max-width:28ch;margin:0 0 14px}
.quote+p{color:var(--muted);margin:0}
.stack{font-weight:900;font-stretch:112%;font-size:clamp(52px,9vw,120px);line-height:.88;letter-spacing:-.045em;margin:0}
.stack span{display:block}.stack .o{color:var(--goldt)}
.ch .txt,.ch .vis{min-width:0}
.snip{max-width:100%;background:var(--ink);color:#f3ead6;border-radius:16px;padding:16px;font:600 15px/1.5 ui-monospace,Menlo,monospace;overflow-x:auto;white-space:pre}
.door{display:inline-flex;align-items:center;gap:8px;border:2px solid var(--ink);border-radius:99px;padding:8px 16px;font-weight:800;background:#fff}
.dochead{padding:56px 0 30px;border-bottom:2px solid var(--ink)}
.dochead .meta{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-top:28px;border-top:1px solid var(--line);padding-top:14px}
.dochead .meta b{display:block;font-size:15px;letter-spacing:.1em;text-transform:uppercase;color:var(--goldt)}
.doc{max-width:760px}
.doc h3{font-size:24px;margin:28px 0 8px}.doc p{font-size:17px}
"""

CTA = '<a class="btn go" href="https://app.henwayai.com/try">Start free</a>'

METHOD = chrome_top("method") + f"""
<section class="phead"><div class="wrap">
 <span class="kick">How it works</span>
 <h1 class="hh h1">Talk. It builds. <span class="hl">You keep it.</span></h1>
 <p class="lede">Four steps. No forms, no code, no tutorials.</p>
</div></section>
<div class="steps">
<section class="step"><div class="wrap">
 <div class="txt"><div class="num">1</div><h2 class="hh h2">Say what's <span class="hl">bugging you.</span></h2>
  <p class="lede">Out loud or typed. Henway reads it back so you can argue with the wording.</p></div>
 <div class="vis" style="max-width:460px;justify-self:center;width:100%"><div class="chat">
  <div class="me">I write every client's workout in my notes app and text it to them. They lose it.</div>
  <div class="hw"><img src="img/chick-shades-tight.png" alt="Henway chick"><div class="hwc"><p>So: one place your clients see this week's plan and log their sets. Right?</p>
   <div class="acts" style="margin:0"><span class="btn go sm">That's it</span><span class="btn sm">Not quite</span></div></div></div></div></div>
</div></section>
<section class="step"><div class="wrap">
 <div class="txt"><div class="num">2</div><h2 class="hh h2">It builds. <span class="hl">It tells you the limits.</span></h2>
  <p class="lede">Before it builds, it says what it will make, what your phone already does, and what this app won't do.</p></div>
 <div class="vis" style="max-width:460px;justify-self:center;width:100%"><div class="card2"><h4>Before it builds</h4><div class="split">
  <div class="y"><b>Building</b>Weekly plan, set logging, reminders, reading screenshots</div>
  <div class="p"><b>Your phone does this</b>Calendar alerts, sharing the link</div>
  <div class="n"><b>Not in this app</b>Live video sessions</div></div></div></div>
</div></section>
<section class="step"><div class="wrap">
 <div class="txt"><div class="num">3</div><h2 class="hh h2">Share it. <span class="hl">Keep it.</span></h2>
  <p class="lede">Your app lives at its own link. Your first one is free. Keep any app for $9, once.</p></div>
 <div class="vis" style="max-width:460px;justify-self:center;width:100%"><div class="card2">
  <div class="tile" style="margin-bottom:14px"><i>W</i><div><b>Workout Log</b><span>Shared with 12 clients</span></div></div>
  <div class="acts" style="margin:0"><span class="btn dark sm">Copy link</span><span class="btn go sm">Keep it · $9</span></div></div></div>
</div></section>
<section class="step"><div class="wrap">
 <div class="txt"><div class="num">4</div><h2 class="hh h2">It grows <span class="hl">with you.</span></h2>
  <p class="lede">Say what's different and it changes. Every change is saved. Undo any of them.</p></div>
 <div class="vis" style="max-width:460px;justify-self:center;width:100%"><div class="card2"><h4>Versions</h4><ul class="vers">
  <li><span>Added a progress chart</span><em>Today</em></li><li><span>Three days a week, not five</span><em>Jan 2</em></li>
  <li><span>Clients can pay for the challenge</span><em>Dec 14</em></li><li><span>Built Workout Log</span><em>Dec 1</em></li></ul>
  <div class="acts"><span class="btn sm">Undo last change</span></div></div></div>
</div></section>
</div>
<section><div class="wrap">
 <span class="kick">What every app gets</span><h2 class="hh h2" style="margin-bottom:24px">The <span class="hl">spec sheet.</span></h2>
 <div class="spec">
  <div><b>Its own link</b><span>Opens on a phone or a laptop. Nothing to install.</span></div>
  <div><b>Changes by talking</b><span>Say it, and the app updates. Free apps change too.</span></div>
  <div><b>Undo</b><span>Every version saved. Go back in one tap.</span></div>
  <div><b>Reads what you snap</b><span>Photos, screenshots and PDFs become entries. It asks before AI sees anything.</span></div>
  <div><b>Shared lists</b><span>Your group adds to the same list from one link.</span></div>
  <div><b>Reminders</b><span>Emails on the days you pick, to the people you add.</span></div>
  <div><b>Payments</b><span>Clients pay inside your app. Henway's fee is 5%.</span></div>
 </div>
</div></section>
<section class="closer" style="background:var(--egg)"><div class="wrap">
 <h2 class="hh h2">What's bugging <span class="hl">you?</span></h2><p class="lede">Your first app is free.</p>{CTA}
</div></section>
""" + FOOT

TRUST = chrome_top("trust") + f"""
<section class="phead"><div class="wrap">
 <span class="kick">Trust</span>
 <h1 class="hh h1">Know what leaves <span class="hl">your phone.</span></h1>
 <p class="lede">You say yes before AI sees anything. Here's what goes where, in plain words.</p>
</div></section>
<section class="ch off"><div class="wrap">
 <div class="txt"><span class="kick">At the tap</span><h2 class="hh h2">It asks <span class="hl">first.</span></h2>
  <p class="lede">The first time an app wants AI to read something, it tells you what goes and where.</p></div>
 <div class="vis"><div class="consent"><div class="ai">✦ Before AI reads this</div>
  <p>This photo goes to Henway's AI to read the words, once. It isn't kept.</p>
  <div class="acts" style="margin:0"><span class="wlb">Send it</span><span class="wlb ghost">Type it instead</span></div></div></div>
</div></section>
<section><div class="wrap"><div class="facts">
 <div class="fact"><span class="k">AI</span><b>Only what the answer needs.</b><p>The photo, or your question and the bit of data it needs. It goes to Henway and to Anthropic, and comes back as text. Henway doesn't store it.</p></div>
 <div class="fact"><span class="k">Training</span><b>Not used to train AI.</b><p>Your content isn't used to train models, ours or anyone's. Anthropic's commercial terms say the same.</p></div>
 <div class="fact"><span class="k">Shared lists</span><b>Stored so your group sees one list.</b><p>A shared list lives on Henway's server. Only people with the link can see it.</p></div>
 <div class="fact"><span class="k">Reminders</span><b>Only to people you add.</b><p>Reminder emails come from Henway, on the days you pick. Anyone can stop them in one tap.</p></div>
 <div class="fact"><span class="k">Payments</span><b>Handled by Stripe.</b><p>Card details go straight to Stripe. Henway sees the amount and who paid, not the card.</p></div>
 <div class="fact"><span class="k">Your data</span><b>Yours to delete.</b><p>Delete an app and its data goes with it. Ask us to erase everything and we do.</p></div>
</div></div></section>
<section class="ch egg"><div class="wrap">
 <div class="txt"><span class="kick">Running it for clients?</span><h2 class="hh h2">You stay the one <span class="hl">they trust.</span></h2>
  <p class="lede">On Consultant and Agency plans the work runs under your brand. Your client signs nothing of ours.</p>
  <a class="btn" href="#dpa">Read the DPA</a></div>
 <div class="vis"><div class="card2"><h4>Who handles what</h4><div class="subs"><i>Anthropic · AI</i><i>Stripe · payments</i><i>Railway · hosting</i><i>Vercel · website</i><i>Resend · email</i><i>PostHog · analytics</i></div></div></div>
</div></section>
<section class="closer"><div class="wrap"><h2 class="hh h2">Questions about <span class="hl">your data?</span></h2>
 <p class="lede">Read the privacy policy, or ask a person.</p><a class="btn" href="https://app.henwayai.com/privacy">Privacy policy</a></div></section>
""" + FOOT

def cmp_row(h, a, b, c, d):
    hs = ["Henway", "Prompt-to-code builders", "AI chat", "No-code builders"]
    cells = [a, b, c, d]
    return f'<tr><td>{h}</td>' + "".join(f'<td data-h="{hs[i]}"{" class=us" if i==0 else ""}>{x}</td>' for i, x in enumerate(cells)) + "</tr>"

WHICH = chrome_top("") + f"""
<section class="phead"><div class="wrap">
 <span class="kick">Henway vs AI app builders</span>
 <h1 class="hh h1">Which one <span class="hl">fits you?</span></h1>
 <p class="lede">An honest side by side. Sometimes the answer isn't Henway.</p>
</div></section>
<section style="padding-top:0"><div class="wrap">
 <table class="cmp"><thead><tr><th></th><th class="us">Henway</th><th>Prompt-to-code builders<small>Lovable, Bolt, Replit</small></th><th>AI chat<small>ChatGPT, Claude</small></th><th>No-code builders<small>Glide, Softr</small></th></tr></thead><tbody>
 {cmp_row("You start by", "Saying what's bugging you", "Writing a prompt for the app", "Asking a question", "Setting up a spreadsheet or tables")}
 {cmp_row("You get", "A working app at its own link", "A code project you run and host", "An answer, sometimes code", "An app on top of your data")}
 {cmp_row("Changes", "Say it. Undo any change.", "Prompt again. The code changes.", "Copy, paste, try again", "Change settings by hand")}
 {cmp_row("Best for", "Everyday jobs for you and your people", "People who want the code", "Thinking it through", "Teams with data already in a sheet")}
 {cmp_row("Cost", "First app free, $9 once to keep", "Monthly plans", "Monthly plan", "Monthly plans")}
 </tbody></table>
</div></section>
<section style="background:var(--off)"><div class="wrap">
 <span class="kick">Pick something else when</span><h2 class="hh h2" style="margin-bottom:22px">The honest <span class="hl">part.</span></h2>
 <ol class="idx">
  <li><div><b>You write code and want to own it.</b><span>A prompt-to-code builder hands you the project.</span></div></li>
  <li><div><b>Thousands of strangers will log in.</b><span>That's a product with its own backend. Start with a builder made for that, or talk to Studio.</span></div></li>
  <li><div><b>Your data already lives in a big spreadsheet.</b><span>A no-code builder sits right on top of it.</span></div></li>
  <li><div><b>You just need to think it through.</b><span>AI chat is great at that. Come back when you want the app.</span></div></li>
 </ol>
</div></section>
<section class="closer"><div class="wrap">
 <h2 class="hh h2" style="margin-bottom:22px">Not sure? <span class="hl">Ask it.</span></h2>
 <div class="say"><div class="ph">Describe what you want to make…</div>
  <div class="row"><small>It answers honestly, even when the answer isn't Henway.</small><a class="btn go sm" href="https://app.henwayai.com/try">Ask</a></div></div>
</div></section>
""" + FOOT

COACHES = chrome_top("") + f"""
<section class="hero"><div class="wrap">
 <div class="txt"><span class="kick">For coaches</span>
  <h1 class="hh h1">Your clients' January, <span class="hl">in one app.</span></h1>
  <p class="lede">Plans, reminders and the challenge they pay for. Built from what you already text them.</p>
  <div class="acts" style="gap:14px"><a class="btn go" href="https://app.henwayai.com/try?from=qaVPwtlEpxfqaC48QkXvpPJk&utm_source=site&utm_medium=coaches">Make it mine</a><a class="btn" href="https://api.henwayai.com/s/qaVPwtlEpxfqaC48QkXvpPJk">Open the app</a></div></div>
 <div class="quest">
  <div class="q1 wl tight"><div class="wlc"><div class="wlt">Monday · Legs</div>
   <div class="wlrow"><span><span class="ok">✓</span>Squat</span><em>4×8</em></div><div class="wlrow"><span><span class="ok">✓</span>RDL</span><em>3×10</em></div><div class="wlrow"><span><span class="ok">✓</span>Lunges</span><em>3×12</em></div></div></div>
  <div class="q2"><div class="note" style="box-shadow:0 14px 30px rgba(29,24,16,.25);border:1px solid var(--line)"><div class="from"><span>WORKOUT LOG</span><span>7:00</span></div><div class="bg">Leg day, Jordan.</div><div class="sm">Last time: squat 4 × 8 at 135.</div></div></div>
  <div class="q3 wl tight"><div class="wlc"><div class="wlt">January Challenge</div><div class="price" style="font-size:36px">$40</div><div class="acts" style="margin-top:6px"><span class="wlb">Pay $40</span></div></div></div>
 </div>
</div></section>
<section style="background:var(--off)"><div class="wrap">
 <span class="kick">Pre-sell January</span><h2 class="hh h2" style="margin-bottom:26px">Start it <span class="hl">this week.</span></h2>
 <ol class="tl"><li><b>Today</b><span>Say how you coach. Your app is ready in minutes.</span></li>
  <li><b>Dec 15</b><span>Open the January challenge. Clients pay in the app.</span></li>
  <li><b>Jan 5</b><span>Day one. The app reminds everyone.</span></li>
  <li><b>Every week</b><span>See who's slipping. Nudge them in one tap.</span></li></ol>
</div></section>
<section><div class="wrap"><div class="three">
 <div><b>Snap the plan</b><span>A screenshot of your plan becomes logged sets.</span></div>
 <div><b>It nudges for you</b><span>"Leg day, Jordan." On the days you pick.</span></div>
 <div><b>Get paid</b><span>$40 challenges, packs, check-ins. Henway's fee is 5%.</span></div>
</div></div></section>
<section class="closer" style="background:var(--egg)"><div class="wrap">
 <img src="img/hatching-chick.png" alt="A chick hatching from its egg">
 <h2 class="hh h2">What do your clients <span class="hl">keep asking?</span></h2>
 <p class="lede">That's your app. First one free.</p>{CTA}
</div></section>
""" + FOOT

GETPAID = chrome_top("") + f"""
<section class="paid" style="padding:72px 0"><div class="wrap">
 <div><span class="kick">Get paid</span><h1 class="hh h1" style="color:var(--paper)">Your app can <span style="color:var(--yellow)">make money.</span></h1>
  <p class="lede">Sell inside it. Or sell copies of it. Henway's fee is 5%. No monthly charge.</p>{CTA}</div>
 <div style="text-align:center"><div class="big5">$480</div><p style="font-size:20px;font-weight:700;margin:10px 0 0;color:#d9cfbb">Tasha's January challenge, 12 clients</p></div>
</div></section>
<section><div class="wrap"><div class="ways">
 <div class="way"><div class="n">1</div><h3>Sell inside your app.</h3><p>Classes, challenges, orders, deposits. Say "let clients pay $40 for January" and the button appears.</p>
  <div class="wl"><div class="wlc"><div class="stat"><span>January Challenge</span><b>$40</b></div><div class="acts"><span class="wlb">Pay $40</span></div></div></div></div>
 <div class="way"><div class="n">2</div><h3>Sell copies of your app.</h3><p>Built something others need? List it as a starter. They pay to make it theirs. You set the price.</p>
  <div class="listing"><img src="img/st-workout.jpg" alt="Workout Log"><div><b>Workout Log</b><span>by Coach Tasha</span></div><span class="pr">$19</span></div></div>
</div></div></section>
<section style="background:var(--off)"><div class="wrap">
 <span class="kick">Set up</span><h2 class="hh h2" style="margin-bottom:26px">Paid in <span class="hl">three steps.</span></h2>
 <ol class="tl"><li><b>Say it</b><span>"Let clients pay $40 for the challenge."</span></li>
  <li><b>Connect Stripe</b><span>A few minutes. Stripe checks who you are.</span></li>
  <li><b>Get paid</b><span>Payouts go to your bank, through Stripe.</span></li></ol>
</div></section>
<section><div class="wrap">
 <span class="kick">The fee</span><h2 class="hh h2" style="margin-bottom:22px">One number: <span class="hl">5%.</span></h2>
 <div class="spec"><div><b>In-app payments</b><span>5% of each payment. No monthly charge.</span></div>
  <div><b>Copies of your app</b><span>5% of each sale. You set the price.</span></div>
  <div><b>Card processing</b><span>Stripe handles cards and payouts.</span></div></div>
</div></section>
<section class="closer" style="background:var(--egg)"><div class="wrap"><h2 class="hh h2">Build the app. <span class="hl">Then sell it.</span></h2><p class="lede">Your first app is free.</p>{CTA}</div></section>
""" + FOOT

STUDIO = chrome_top("") + f"""
<section class="phead"><div class="wrap">
 <span class="kick">Studio</span>
 <h1 class="hh h1">When you'd rather <span class="hl">hand it over.</span></h1>
 <p class="lede">Most people build on Henway themselves. Studio sets it up on your accounts, connects your tools and tunes it after launch.</p>
 <a class="btn dark" href="https://book.stripe.com/8x228t78q6I4fiS9L2bo400">Start with an hour · $150</a>
</div></section>
<section style="padding-top:10px"><div class="wrap"><div class="offers">
 <div class="offer"><span class="tg">Try it first</span><h3>Urgent-email alerts</h3><p>The emails that need you now reach your phone. Everything else waits. It doesn't reply to anyone.</p>
  <div class="pp">$500<small>two-week pilot, counts toward the build from $1,500</small></div><a class="btn go" href="#">Start the pilot</a></div>
 <div class="offer"><span class="tg">Public records</span><h3>Lead finder</h3><p>Every business that fits your industry and region, ranked, with a link to the record behind each one.</p>
  <div class="pp">$750<small>thesis list in 5 business days, counts toward a build from $4,500</small></div><a class="btn" href="#">Get a list</a></div>
 <div class="offer"><span class="tg">For teams</span><h3>Live ops board</h3><p>Tasks, chat and email on one page, with a short brief every morning. Your team keeps working where it works.</p>
  <div class="pp">From $4,000<small>set up on your Asana, Slack and email</small></div><a class="btn" href="#">Book a 20-minute call</a></div>
</div></div></section>
<section class="ch egg"><div class="wrap">
 <div class="txt"><span class="kick">One example</span><p class="quote">"I think what you've delivered... that saves hours already right there."</p>
  <p>Michael Cole, Magnolia Company, walking through his finished deal workspace.</p></div>
 <div class="vis"><div class="card2"><h4>What Studio did</h4><ul class="vers">
  <li><span>Watched him do a deal by hand</span><em>2 hours</em></li><li><span>Built the narrow core</span><em>2 weeks</em></li>
  <li><span>Tuned on his own past deals</span><em>Done</em></li></ul></div></div>
</div></section>
<section><div class="wrap">
 <span class="kick">When Studio is the answer</span><div class="three" style="margin-top:14px">
 <div><b>Your contract needs a vendor</b><span>Someone who signs your paperwork and names every service it uses.</span></div>
 <div><b>It's bigger than a first build</b><span>You want it handled end to end.</span></div>
 <div><b>You want us in the room</b><span>A workshop or a board where the builder being there matters.</span></div>
</div></div></section>
<section class="closer" style="background:var(--off)"><div class="wrap"><h2 class="hh h2">Tell us <span class="hl">the situation.</span></h2>
 <p class="lede">We take a few at a time, and we'll say if a plan already covers it.</p><a class="btn go" href="#">Get in touch</a></div></section>
""" + FOOT

CONSULT = chrome_top("") + f"""
<section class="phead"><div class="wrap">
 <span class="kick">For consultants</span>
 <h2 class="stack"><span>End the room</span><span>on something</span><span class="o">they can open.</span></h2>
 <p class="lede" style="margin-top:22px">Their team describes a normal week. You run the session. They leave with a working app and a brief with your name on it.</p>
 <div class="acts" style="gap:14px">{CTA}<a class="btn" href="#pricing">See plans</a></div>
</div></section>
<section style="background:var(--off)"><div class="wrap">
 <span class="kick">In the room</span><h2 class="hh h2" style="margin-bottom:26px">How a session <span class="hl">runs.</span></h2>
 <ol class="tl"><li><b>Before</b><span>Your logo, your colors. Every session runs under your name.</span></li>
  <li><b>They talk</b><span>Their team describes a normal week. Nobody types.</span></li>
  <li><b>You run it</b><span>It reads the problem back. They argue with the wording. That's the session.</span></li>
  <li><b>It builds</b><span>About seven minutes, while they watch.</span></li>
  <li><b>They leave</b><span>A working app at its own link, and your brief.</span></li></ol>
</div></section>
<section class="ch"><div class="wrap">
 <div class="txt"><span class="kick">Your brand, both ways</span><h2 class="hh h2">The way back in is <span class="hl">a door to you.</span></h2>
  <p class="lede">Every app you build carries your name. Put the flow on your site with one line.</p>
  <span class="door">Stuck? Ask Northside Advisory</span></div>
 <div class="vis" style="max-width:520px"><div class="snip">&lt;script async
  src="https://api.henwayai.com/widget/loader.js"
  data-widget-key="your-key"&gt;&lt;/script&gt;</div></div>
</div></section>
<section style="padding-top:0"><div class="wrap">
 <span class="kick">Plans</span><div class="cons">
  <div class="con"><b>Founder</b><div class="a">$29<small>/mo</small></div><div class="y">or $249 a year</div><p>10 builds a month. Save, resume and share sessions.</p></div>
  <div class="con"><b>Consultant</b><div class="a">$139<small>/mo</small></div><div class="y">or $1,199 a year</div><p>150 discoveries a month. Your brand. A widget for your site.</p></div>
  <div class="con"><b>Agency</b><div class="a">$249<small>/mo</small></div><div class="y">or $1,999 a year</div><p>5 seats, 600 discoveries, your own domain.</p></div></div>
</div></section>
<section class="closer" style="background:var(--egg)"><div class="wrap"><h2 class="hh h2">Try it on <span class="hl">your own week.</span></h2><p class="lede">Your first app is free.</p>{CTA}</div></section>
""" + FOOT

DPA_SECS = ["Roles", "What we process, and for how long", "Your instructions", "Confidentiality", "Security", "Sub-processors", "Data subject requests", "Personal data breach", "Deletion and return", "Audits", "International transfers", "Precedence and liability", "Contact"]
DPA = chrome_top("") + f"""
<section class="dochead"><div class="wrap">
 <span class="kick">Henway · Legal</span>
 <h1 class="hh h1">Data Processing <span class="hl">Addendum.</span></h1>
 <p class="lede" style="max-width:52ch">For when you use Henway with your own clients' personal data, most often on Consultant and Agency plans.</p>
 <div class="meta"><div><b>Effective</b>September 10, 2026</div><div><b>Part of</b>Henway Terms of Service</div><div><b>Sections</b>13</div><div><b>Questions</b>Contact, section 13</div></div>
</div></section>
<section><div class="wrap"><div class="doc">
 <ol class="idx">{''.join(f'<li><div><b>{s}</b></div></li>' for s in DPA_SECS)}</ol>
 <h3>1. Roles</h3><p>For personal data you put into the Services about your own clients, you are the controller and Henway is the processor. You decide what to collect and why; we process it to provide the Services.</p>
 <p style="color:var(--muted)">The rest of the text stays as it is today. Only this header changes.</p>
</div></div></section>
""" + FOOT

PAGES = [("home", "Home", HOME), ("apps", "Starter apps", APPS), ("pricing", "Pricing", PRICING), ("method", "How it works", METHOD),
         ("trust", "Trust", TRUST), ("which", "Which tool", WHICH), ("coaches", "Coaches", COACHES), ("getpaid", "Get paid", GETPAID),
         ("studio", "Studio", STUDIO), ("consultants", "Consultants", CONSULT), ("dpa", "DPA", DPA)]

# ---------------- NOTES ----------------
SITEMAP = [
 ("Home", "/", "rb", "Rebuild", "The v6 coach journey replaces the feature page. Nav is set to the 5 tabs."),
 ("Starter apps", "/apps", "rb", "Rebuild", "Becomes the starter shop. Keep the URL: it's the bio link and /examples points here. The live page says apps stay on your device, which shared lists changed. The older gallery apps (Tonight, ShiftBoard, QuoteSheet and the rest) are dropped. New starters inspired by Scout will join the shop later."),
 ("Pricing", "/pricing", "rt", "Rewrite", "Built from the live plans API: Free, $9 keep, $150 hour and 5% on payments. Consultant plans sit lower on the page."),
 ("How it works", "/method", "rt", "Rewrite", "Talk, build, keep, it grows. The live copy still says changes are 15 minutes on free and the build message needs a paid plan. The honest split stays as step 2. The hand-off to another builder is dropped. Keep the URL, label it How it works."),
 ("Trust", "/trust", "rt", "Rewrite", "Adds AI consent, shared lists, reminders and Stripe payments. The live copy says app data stays on your device, but shared lists now live on Henway's server."),
 ("Which tool", "/which-tool", "rt", "Rewrite, keep URL", "It ranks in search. Becomes an honest Henway vs AI app builders page, and keeps the ask-it box."),
 ("Coaches", "/coaches", "nw", "New", "Landing page for the December push: coaches pre-sell January challenges."),
 ("Get paid", "/get-paid", "nw", "New", "Selling inside your app, and selling copies of it. 5%, no monthly charge."),
 ("Studio", "/studio", "", "Keep, restyle", "Offers and prices are current ($500 pilot, $750 list, from $4,000). New skin plus the $150 hour as the way in. The Magnolia story stays here."),
 ("Consultants", "/consultants", "", "Keep, restyle", "This is where the $29, $139 and $249 plans live. The content is current, so it gets the new skin and a tighter flow."),
 ("DPA", "/dpa", "", "Keep, header only", "Legal text, effective Sep 10, 2026. Only the header and the section index change."),
 ("Live build", "/live", "rd", "Retire, 301 to /", "The Nov 17 Instagram Live has passed."),
 ("Sermon Circle", "/sermon", "rd", "Retire, 301 to /apps", "Michael's call. Its footer was still selling the closed $9.99 Founding price."),
 ("Gift", "/gift", "rd", "Retire, 301 to /apps", "Michael's call. It held the birthday apps (PromptFlow, Sermon Circle). /apps is the closest page."),
]
def sm_rows():
    return "".join(f'<tr><td>{p}</td><td>{u}</td><td><span class="dec {c}">{d}</span></td><td>{r}</td></tr>' for p, u, c, d, r in SITEMAP)

REDIRECTS = [("/live", "/", "301", "Event passed"), ("/sermon", "/apps", "301", "Retired"), ("/gift", "/apps", "301", "Retired; apps listed on /apps"),
             ("/case-study/magnolia", "/studio", "301", "It points at /#examples today, which the new home drops. The Magnolia story is on Studio."),
             ("/examples", "/apps", "keep", "Already in place"), ("/the-walk", "/method", "keep", "Already in place"), ("/security", "/trust", "keep", "Already in place")]

REFS = [
 ("home", "Cash App Fall Release", "Honorable Mention", "Mar 4, 2026", "aw-cashapp.jpg", "One phone, one line per chapter (Day 2, Week 1).", "https://cash.app/new"),
 ("home", "RUN Payments", "Honorable Mention", "Mar 5, 2025", "aw-runpay.jpg", "The money number is the hero (Month 1).", "https://runpayments.io/"),
 ("home", "Feather Computer", "Honorable Mention", "Nov 19, 2025", "aw-feather.jpg", "Warm paper and everyday chores, calm type.", "https://feather.computer/"),
 ("home", "MindMarket", "Site of the Day", "Dec 29, 2025", "aw-mindmarket.jpg", "A character at the edge of the product (the chick in Day 1).", "https://mindmarket.com/"),
 ("home", "Lando Norris", "Site of the Day", "Nov 17, 2025", "aw-lando.jpg", "Huge type, one loud accent color.", "https://landonorris.com/"),
 ("apps", "Sweet Tape", "Site of the Day", "Nov 17, 2026", "aw-sweettape-1.jpg", "Everyday chaos as the headline. Products taped down like real objects.", "https://www.awwwards.com/sites/sweet-tape"),
 ("apps", "Sweet Tape (product row)", "Site of the Day", "Nov 17, 2026", "aw-sweettape-2.jpg", "Each product next to the moment it's for, with use tags.", "https://www.awwwards.com/sites/sweet-tape"),
 ("apps", "Delta Cafés", "Site of the Day", "Nov 13, 2026", "aw-delta.jpg", "'Find the coffee that suits you': a quick pick that leads to the product. This became our 'What's bugging you?' filter.", "https://www.awwwards.com/sites/delta-cafes"),
 ("pricing", "Reflect", "Honorable Mention", "May 11, 2023", "aw-reflect.jpg", "The price as one giant word: Free.", "https://www.awwwards.com/sites/reflect"),
 ("pricing", "Attio", "Honorable Mention", "Apr 6, 2021", "aw-attio.jpg", "Clean tier cards, one marked, plain lines under each price. The award was for the 2021 site; the pricing page is today's.", "https://www.awwwards.com/sites/attio"),
 ("method", "Heron AI", "Site of the Day", "Oct 12, 2026", "aw-heron.jpg", "Warm paper and a plain spec sheet. This became our numbered steps and 'spec sheet' list.", "https://www.awwwards.com/sites/heron-ai"),
 ("trust", "Cyera AI Guardian", "Site of the Day", "Nov 11, 2026", "aw-cyera.jpg", "An AI data-safety promise in two short lines ('Know your data. Control your AI.').", "https://www.awwwards.com/sites/cyera-ai-guardian"),
 ("which", "Creative Reference Library", "Site of the Day", "Nov 10, 2026", "aw-crl.jpg", "A numbered index with plain notes. This became 'Pick something else when'.", "https://www.awwwards.com/sites/creative-reference-library"),
 ("coaches", "Grail", "Site of the Day", "Nov 4, 2026", "aw-grail.jpg", "Daily quest cards floating in a stack. This became the hero's stack of workout, reminder and challenge cards.", "https://www.awwwards.com/sites/grail"),
 ("getpaid", "RUN Payments", "Honorable Mention", "Mar 5, 2025", "aw-runpay.jpg", "The money number as the hero ($480).", "https://runpayments.io/"),
 ("getpaid", "Cash App Fall Release", "Honorable Mention", "Mar 4, 2026", "aw-cashapp.jpg", "One payment card, one line of copy.", "https://cash.app/new"),
 ("studio", "Carter Ogunsola", "Site of the Day", "Nov 19, 2026", "aw-carter.jpg", "Work shown as objects with a price-like label. This became the three offer cards, each with its price up front.", "https://www.awwwards.com/sites/carter-ogunsola"),
 ("consultants", "Bulletproof", "Site of the Day", "Nov 16, 2026", "aw-bulletproof.jpg", "An agency claim stacked in giant type. This became 'End the room on something they can open.'", "https://www.awwwards.com/sites/bulletproof"),
 ("dpa", "Creative Reference Library", "Site of the Day", "Nov 10, 2026", "aw-crl.jpg", "Numbered sections and a version/date block. This became the DPA header.", "https://www.awwwards.com/sites/creative-reference-library"),
]
PG = {k: t for k, t, _ in PAGES}
def board():
    return "".join(f'''<figure><img src="img/{i}" alt="{s} website" loading="lazy"><figcaption><span class="pg">{PG[p]}</span><b>{s}</b><span class="aw">{a} · {d}</span><br>{n}<br><a href="{u}">{u.replace('https://www.','').replace('https://','')}</a></figcaption></figure>''' for p, s, a, d, i, n, u in REFS)

def notes():
    rub = (P / "rubric.html").read_text() if (P / "rubric.html").exists() else "<p>(pending)</p>"
    redir = "".join(f"<tr><td>{a}</td><td>{b}</td><td>{c}</td><td>{d}</td></tr>" for a, b, c, d in REDIRECTS)
    return f'''<div class="notes"><div class="wrap">
<section><span class="kick">Muse pass · Henway site v6 · Nov 21, 2026</span><h2>The whole site, page by page</h2>
<p class="sub">I read every page on henwayai.com from its live HTML before deciding. All of them are designed here, as if every feature has shipped. Nav on every page: Home · Starter apps · How it works · Pricing · Trust. The footer holds Get paid, Coaches, Consultants, Studio, Henway vs AI app builders and DPA.</p>
<table class="t"><thead><tr><th>Page</th><th>URL</th><th>Decision</th><th>Why</th></tr></thead><tbody>{sm_rows()}</tbody></table></section>
<section><h2>Redirect plan</h2><table class="t"><thead><tr><th>From</th><th>To</th><th>Type</th><th>Why</th></tr></thead><tbody>{redir}</tbody></table></section>
<section><h2>Award references, by page</h2><p class="sub">Each one checked on awwwards.com on Nov 21, 2026. Awards are for the whole site, not one page.</p><div class="board">{board()}</div></section>
<section><h2>The check</h2><p class="sub">Each page tested at 390, 768, 1280 and 1440 pixels wide.</p>{rub}</section>
<section><h2>Before it goes live</h2><p class="sub">These comps are designed as if everything is built. Each item here needs a real capture, a shipped feature or a yes before the live site uses it.</p>
<ul class="gate">
<li>Home: hero "after" card, Day 1 chat, Week 1 reminder and Week 2 suggestions (drawn)</li>
<li>Coach Tasha, her text, Jordan and the $480 (a sample story)</li>
<li>Payments in apps: Home Month 1, Pricing, Coaches and Get paid all wait for payments to go live</li>
<li>Selling copies of your app (Get paid, way 2): not built. The 5% fee and the $19 price are placeholders</li>
<li>The 5% math: confirm who pays Stripe's card fee</li>
<li>Reminder emails (How it works, Trust, Coaches): confirm the one-tap stop and who can receive them</li>
<li>Trust: "Henway doesn't store it" and "delete an app and its data goes with it" need checking against the code and privacy policy. The live page says typed data is cleared after 180 days on every plan, which conflicts with the $9 promise. Settle that first.</li>
<li>Trust: "Henway sees the amount and who paid, not the card." Confirm with the payments build.</li>
<li>Which tool: every claim about other tools (what you get, monthly plans) needs checking on their sites the week it ships</li>
<li>How it works: the Versions card and the "Not in this app" example (drawn)</li>
<li>Starter shop filter buttons (comp only, needs building)</li>
<li>Starter shop: the older gallery row was removed on purpose. New starters inspired by Scout will be added later.</li>
<li>The $9 card's "Help from Henway with that app": define what it includes</li>
<li>Consultants: "Northside Advisory" is a sample studio name</li>
<li>Studio: the Michael Cole quote is the one he signed off. Any new quote needs a fresh yes.</li>
</ul>
<p class="sub" style="margin-top:12px">Real captures: Day 2 (today's build) and all six starter images, captured from the live starters.</p></section>
<section><h2>Two questions</h2><ol class="qs">
<li>Henway's 5% on app payments: does it include Stripe's card fee, or does the seller pay that on top? <span>This sets the number on Pricing, Coaches and Get paid.</span></li>
<li>Selling copies of an app: what's Henway's cut, and does the seller set any price? <span>Get paid shows 5% and a $19 example for now.</span></li></ol></section>
</div></div>'''

JS = r"""
const V=[...document.querySelectorAll('.view')].map(v=>v.id.slice(2));
function show(v){if(!V.includes(v))v='home';V.forEach(k=>{document.getElementById('v-'+k).classList.toggle('on',k===v);const t=document.getElementById('t-'+k);t.setAttribute('aria-pressed',k===v);if(k===v)t.scrollIntoView({block:'nearest',inline:'nearest'})});}
V.forEach(k=>document.getElementById('t-'+k).addEventListener('click',()=>{location.hash=k;show(k);scrollTo(0,0)}));
addEventListener('hashchange',()=>{show(location.hash.slice(1));scrollTo(0,0)});
show(location.hash.slice(1));
document.querySelectorAll('.pick button').forEach(b=>b.addEventListener('click',()=>{
 document.querySelectorAll('.pick button').forEach(x=>x.setAttribute('aria-pressed',x===b));
 const f=b.dataset.f;document.querySelectorAll('.card').forEach(c=>c.style.display=(f==='all'||c.dataset.f===f)?'':'none');}));
"""

def build():
    views = "".join(f'<div class="view" id="v-{k}">{h}</div>' for k, t, h in PAGES) + f'<div class="view" id="v-notes">{notes()}</div>'
    btns = "".join(f'<button id="t-{k}">{t}</button>' for k, t, _ in PAGES) + '<button id="t-notes">Sitemap and notes</button>'
    html = f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Henway site v6: every page</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&display=swap" rel="stylesheet">
<style>{CSS}{CSS2}</style></head><body>
<div class="sw"><div class="wrap"><b>Site v6</b>{btns}</div></div>
<main>{views}</main><script>{JS}</script></body></html>'''
    html = html.replace('href="#" class', 'href="https://www.henwayai.com/studio" class').replace('<a class="btn go" href="#">', '<a class="btn go" href="https://www.henwayai.com/studio">').replace('<a class="btn" href="#">', '<a class="btn" href="https://www.henwayai.com/studio">')
    (P / "index.html").write_text(html)

if __name__ == "__main__":
    build()
