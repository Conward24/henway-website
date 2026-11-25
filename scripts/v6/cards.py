"""Share cards (og:image) for the v6 site, one per page, in look A.

    python3 scripts/v6/cards.py            # writes scripts/v6/cards/*.html
    node scripts/v6/cards.mjs              # renders them to site/og/*.jpg (1200x630)

Each card: one headline of six words or fewer, one picture, nothing small.
Real assets only (site/v6/img): the logo, the chicks, the starter captures.
"""
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = pathlib.Path(__file__).parent / "cards"
IMG = "../../../site/v6/img/"

BASE = """<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&display=block" rel="stylesheet">
<style>
*{box-sizing:border-box}html,body{margin:0}
body{width:1200px;height:630px;overflow:hidden;background:#fbf7ef;color:#1d1810;font-family:Archivo,Arial,sans-serif;position:relative}
.bar{position:absolute;left:0;top:0;right:0;height:14px;background:#FFCC00}
.logo{position:absolute;left:64px;top:52px;height:44px}
.txt{position:absolute;left:64px;top:150px;width:560px}
h1{font-weight:850;font-size:92px;line-height:.94;letter-spacing:-.045em;margin:0}
h1 em{font-style:normal;color:#7a5807}
.big h1{font-size:104px}
.pic{position:absolute;right:56px;top:0;bottom:0;width:520px;display:flex;align-items:center;justify-content:center}
.card{background:#fff;border:3px solid #1d1810;border-radius:26px;box-shadow:8px 8px 0 #1d1810;padding:24px 28px}
.row{display:flex;justify-content:space-between;align-items:center;font-size:34px;font-weight:700;padding:9px 0;border-bottom:2px solid #efe7d6}
.row:last-child{border:0}.row i{font-style:normal;color:#1f8a4c;margin-right:12px}.row em{font-style:normal;color:#5f584a}
.lab{display:inline-block;font-size:26px;font-weight:800;border-radius:99px;padding:4px 18px;margin:0 0 12px}
</style></head><body><div class="bar"></div><img class="logo" src="IMG/logo-black.png">BODY</body></html>"""

def card(body):
    return BASE.replace("BODY", body).replace("IMG/", IMG)

CARDS = {
"home": """<div class="txt" style="top:190px;width:440px"><h1 style="font-size:84px">Complain.<br><em>Get an&nbsp;app.</em></h1></div>
<div class="pic" style="width:620px;right:36px;gap:22px">
 <div style="width:230px"><span class="lab" style="background:#efe7d6">Before</span><img src="IMG/coach-thread.png" style="width:230px;border-radius:18px;box-shadow:0 14px 30px rgba(29,24,16,.25);transform:rotate(-3deg)"></div>
 <div style="width:360px"><span class="lab" style="background:#FFCC00">After</span><div class="card" style="padding:18px 24px">
  <div style="font-size:34px;font-weight:850;margin:0 0 6px">Monday · Legs</div>
  <div class="row"><span><i>✓</i>Squat</span><em>4×8</em></div><div class="row"><span><i>✓</i>RDL</span><em>3×10</em></div>
  <div class="row"><span><i>✓</i>Lunges</span><em>3×12</em></div><div class="row"><span><i>✓</i>Plank</span><em>3×45s</em></div></div></div></div>""",
"apps": """<div class="txt big" style="top:190px"><h1>Find<br><em>yours.</em></h1></div>
<div class="pic" style="width:700px;right:10px">
 <img src="IMG/st-potluck.jpg" style="position:absolute;width:250px;border-radius:22px;border:3px solid #1d1810;left:40px;top:120px;transform:rotate(-9deg);box-shadow:0 16px 34px rgba(29,24,16,.25)">
 <img src="IMG/st-deals.jpg" style="position:absolute;width:250px;border-radius:22px;border:3px solid #1d1810;right:40px;top:120px;transform:rotate(9deg);box-shadow:0 16px 34px rgba(29,24,16,.25)">
 <img src="IMG/st-workout.jpg" style="position:absolute;width:270px;border-radius:22px;border:3px solid #1d1810;left:215px;top:80px;z-index:2;box-shadow:0 18px 38px rgba(29,24,16,.3)"></div>""",
"pricing": """<div class="txt" style="width:640px;top:160px"><h1>First app free.<br><em>$9 to keep.</em></h1></div>
<div class="pic" style="width:420px"><img src="IMG/hatching-chick.webp" style="width:380px"></div>""",
"method": """<div class="txt" style="top:180px"><h1>Talk.<br><em>It builds.</em></h1></div>
<div class="pic" style="flex-direction:column;align-items:stretch;gap:26px;width:540px">
 <div style="align-self:flex-end;background:#1d1810;color:#fbf7ef;font-size:34px;font-weight:700;border-radius:28px 28px 6px 28px;padding:22px 28px;max-width:470px">My clients lose my workouts.</div>
 <div style="display:flex;align-items:flex-end;gap:16px"><img src="IMG/chick-shades-tight.webp" style="width:92px">
  <div class="card" style="display:flex;align-items:center;gap:20px;padding:20px 26px"><div style="width:74px;height:74px;border-radius:18px;background:#FFCC00;display:grid;place-items:center;font-size:40px;font-weight:900">W</div>
  <div style="font-size:38px;font-weight:850">Workout Log</div></div></div></div>""",
"coaches": """<div class="txt" style="top:170px;width:560px"><h1>Your clients,<br><em>reminded.</em></h1></div>
<div class="pic" style="width:480px"><div style="width:440px;background:linear-gradient(#3a3026,#1d1810);border-radius:40px;padding:40px 24px 34px;text-align:center;color:#fff">
 <div style="font-size:96px;font-weight:600;line-height:1;letter-spacing:-.03em">7:00</div>
 <div style="background:rgba(255,255,255,.93);color:#1d1810;border-radius:24px;padding:20px 24px;text-align:left;margin-top:30px">
 <div style="font-size:22px;font-weight:800;letter-spacing:.08em;color:#5f584a">WORKOUT LOG</div><div style="font-size:44px;font-weight:850;margin-top:6px">Leg day, Jordan.</div></div></div></div>""",
"getpaid": """<div class="txt" style="top:180px;width:520px"><h1>Your app<br><em>gets paid.</em></h1></div>
<div class="pic" style="width:560px"><div class="card" style="text-align:center;padding:36px 40px;width:500px">
 <div style="font-size:30px;font-weight:800;color:#5f584a;letter-spacing:.06em">JANUARY CHALLENGE</div>
 <div style="font-size:170px;font-weight:900;letter-spacing:-.05em;line-height:1;margin:10px 0">$480</div>
 <div style="display:inline-block;background:#FFCC00;font-size:34px;font-weight:850;border-radius:99px;padding:10px 30px">12 paid</div></div></div>""",
"trust": """<div class="txt" style="top:150px;width:620px"><h1>You choose<br>what leaves<br><em>your phone.</em></h1></div>
<div class="pic" style="width:440px"><div class="card" style="width:420px;padding:30px">
 <div style="font-size:28px;font-weight:800;color:#7a5807">✦ Before AI reads this</div>
 <div style="display:flex;gap:14px;margin-top:22px"><span style="background:#1d1810;color:#fff;font-size:30px;font-weight:800;border-radius:99px;padding:14px 24px">Send it</span><span style="border:3px solid #1d1810;font-size:30px;font-weight:800;border-radius:99px;padding:11px 22px">Not now</span></div></div></div>""",
"which": """<div class="txt" style="top:180px;width:640px"><h1>Which one<br><em>fits you?</em></h1></div>
<div class="pic" style="width:420px"><img src="IMG/chick-shades-tight.webp" style="width:300px"></div>""",
"studio": """<div class="txt" style="top:160px;width:640px"><h1>When you'd rather<br><em>hand it over.</em></h1></div>
<div class="pic" style="width:400px;flex-direction:column;gap:18px">
 <div class="card" style="font-size:56px;font-weight:900;width:300px;text-align:center;transform:rotate(-3deg)">$150</div>
 <div class="card" style="font-size:56px;font-weight:900;width:300px;text-align:center;transform:rotate(2deg);background:#FFCC00">$500</div></div>""",
"consultants": """<div class="txt" style="top:150px;width:680px"><h1>End on something<br><em>they can open.</em></h1></div>
<div class="pic" style="width:380px"><div class="card" style="display:flex;flex-direction:column;align-items:center;gap:16px;padding:30px 34px">
 <div style="width:120px;height:120px;border-radius:28px;background:#FFCC00;display:grid;place-items:center;font-size:64px;font-weight:900">✓</div>
 <div style="font-size:36px;font-weight:850">Their app</div></div></div>""",
"default": """<div class="txt" style="top:170px;width:620px"><h1>Say it.<br><em>Henway builds it.</em></h1></div>
<div class="pic" style="width:440px"><img src="IMG/hatching-chick.webp" style="width:390px"></div>""",
}

if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    for k, b in CARDS.items():
        (OUT / f"{k}.html").write_text(card(b))
    print("wrote", len(CARDS))
