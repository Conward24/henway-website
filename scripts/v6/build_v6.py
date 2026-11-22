"""Build the v6 site pages from the approved comps.

    python3 scripts/v6/build_v6.py

comps.py is the muse comp (creative-advisor/passes/henway-site-v6-rollout-2026-11-21/
build.py), copied in unchanged so the design source lives with the site. This
script turns each comp view into a real page under site/, swaps comp-only links
for real ones, applies the truth edits (what has actually shipped), and marks
anything not live yet with data-gate so prod can hold it.

PUBLISH GATE. Every element with data-gate="<name>" is hidden on
henwayai.com until that gate opens. Gates open:
  payments  automatically, when /billing/plans reports app_payments.enabled
  copies    when GATES.copies is set true below (selling copies is not built)
  nudges    when GATES.nudges is set true below (one-tap "Ask Tyler to switch"
            on an AI card is drawn, not built)
  keepv2    when GATES.keepv2 is set true below (own name/icon and unlimited
            shared-list people on the $9 keep, pending the backend PR)
Any other host (Vercel previews, localhost) shows everything, and ?preview=1
shows everything on prod too, so the gated parts can be reviewed.
"""
import pathlib, re, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import comps as C
import fresh as F  # noqa: E402

# Support mailbox (matches the app). Michael is confirming it receives mail; swap it here only.
SUPPORT_EMAIL = "support@henwayai.com"

GATES = {"payments": False, "copies": False, "keepv2": False, "nudges": False}
SITE = ROOT / "site"

def orig(name):
    """The pre-v6 page, read from the last commit before v6 (BASE), never from
    site/, which this script overwrites."""
    return subprocess.run(["git", "show", f"{BASE}:site/{name}"], cwd=ROOT, capture_output=True, text=True, check=True).stdout

BASE = "25f0af8"  # henway-website main before v6
ORIGIN = "https://www.henwayai.com"

ROUTES = {"home": "/", "apps": "/apps", "method": "/method", "pricing": "/pricing", "trust": "/trust",
          "which": "/which-tool", "coaches": "/coaches", "getpaid": "/get-paid", "studio": "/studio",
          "consultants": "/consultants", "dpa": "/dpa", "setup": "/get-paid/setup"}
STARTERS = ["workout", "potluck", "deals", "recipes", "trip", "renewals"]
ROUTES.update({f"st-{k}": f"/apps/{k}" for k in STARTERS})
ROUTES["support"] = "/support"

def mine(key, medium="starter"):
    return f"https://app.henwayai.com/try?from={key}&utm_source=site&utm_medium={medium}"

KEYS = {s["k"]: s["key"] for s in C.ST}

# ---------------------------------------------------------------- shared chrome
NAV = [("home", "Home"), ("apps", "Starter apps"), ("method", "How it works"), ("pricing", "Pricing"), ("trust", "Trust")]

def header(cur):
    a = "".join(f'<a href="{ROUTES[k]}"{" class=cur aria-current=page" if k == cur else ""}>{t}</a>' for k, t in NAV)
    return (f'<header class="top"><div class="wrap"><a class="logo" href="/"><img src="/v6/img/logo-black.png" alt="Henway" width="120" height="30"></a>'
            f'<nav aria-label="Main">{a}</nav><a class="login" href="https://app.henwayai.com/login">Log in</a>'
            f'<a class="btn go sm" href="https://app.henwayai.com/try" data-cta="nav-start">Start free</a></div>'
            f'<nav class="mnav" aria-label="Main, small screens">{a}</nav></header>')

FOOT = '''<footer class="foot"><div class="wrap">
<div><img src="/v6/img/logo-black.png" alt="Henway" width="112" height="28"><p>If you can complain to a friend, you can make an app.</p></div>
<div><b>Product</b><a href="/apps">Starter apps</a><a href="/method">How it works</a><a href="/pricing">Pricing</a><a href="/trust">Trust</a><a href="/get-paid" data-gate="payments">Get paid</a></div>
<div><b>More</b><a href="/coaches">For coaches</a><a href="/consultants">For consultants</a><a href="/studio">Studio</a><a href="/which-tool">Henway vs AI app builders</a><a href="/dpa">DPA</a></div>
<div><b>Help</b><a href="/support">Support</a><a href="https://app.henwayai.com/privacy">Privacy</a><a href="https://app.henwayai.com/terms">Terms</a><a href="https://app.henwayai.com/privacy/delete">Delete my data</a><a href="mailto:{SUPPORT_EMAIL}">Contact</a></div>
</div><div class="wrap legal"><p>&copy; 2026 Henway LLC. Patent-pending technology. Product names on this site are trademarks of their owners. Henway is not affiliated with any of them and earns nothing when it recommends one.</p></div></footer>'''.replace("{SUPPORT_EMAIL}", SUPPORT_EMAIL)

GATE_HEAD = """<script>(function(){var G=%s,h=location.hostname,prod=/(^|\\.)henwayai\\.com$/.test(h),all=!prod||/[?&]preview=1/.test(location.search),c=document.documentElement.classList;
Object.keys(G).forEach(function(k){if(all||G[k])c.add('g-'+k)});
if(!c.contains('g-payments')&&window.fetch){fetch('https://api.henwayai.com/billing/plans',{cache:'no-store'}).then(function(r){return r.ok?r.json():null}).then(function(d){if(d&&d.app_payments&&d.app_payments.enabled){c.add('g-payments');document.dispatchEvent(new Event('henway:payments'))}else if(document.body&&document.body.dataset.gatePage==='payments'){location.replace('/')}}).catch(function(){})}})();</script>
<style>%s{display:none!important}
%s{display:none!important}</style>""" % ("%s", ",".join(f"html:not(.g-{g}) [data-gate~={g}]" for g in ("payments", "copies", "keepv2", "nudges")),
     ",".join(f"html.g-{g} [data-ungate~={g}]" for g in ("payments", "copies", "keepv2", "nudges")))

POSTHOG = re.search(r"<!-- PostHog.*?</script>", orig("pricing.html"), re.S).group(0)

OG = {"home": "home", "apps": "apps", "pricing": "pricing", "method": "method", "trust": "trust", "which": "which",
      "coaches": "coaches", "getpaid": "getpaid", "setup": "getpaid", "studio": "studio", "consultants": "consultants", "dpa": "default", **{f"st-{k}": "apps" for k in STARTERS}, "support": "default"}
OG_ALT = {"home": "Complain. Get an app. A coach's messy text next to the clean workout log Henway made from it.",
          "apps": "Find yours. Three Henway starter apps fanned out.", "pricing": "First app free. $9 to keep.",
          "method": "Talk. It builds. A complaint turns into a Workout Log app.", "trust": "You choose what leaves your phone.",
          "which": "Which one fits you?", "coaches": "Your clients, reminded. A Leg day reminder on a lock screen.",
          "getpaid": "Your app gets paid. $480 from a January challenge.", "studio": "When you'd rather hand it over.",
          "consultants": "End on something they can open.", "default": "Say it. Henway builds it."}

def head(slug, title, desc, og_title=None, robots=None):
    url = ORIGIN + ROUTES[slug] if ROUTES[slug] != "/" else ORIGIN + "/"
    og_title = og_title or title
    card = OG.get(slug, "default")
    og_img = f"{ORIGIN}/og/{card}.jpg"
    og_alt = OG_ALT[card]
    rb = f'\n<meta name="robots" content="{robots}">' if robots else ""
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">{rb}
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Henway">
<meta property="og:url" content="{url}">
<meta property="og:title" content="{og_title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="{og_img}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="{og_alt}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{og_title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="{og_img}">
<meta name="twitter:image:alt" content="{og_alt}">
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png?v=2">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png?v=2">
<meta name="theme-color" content="#fbf7ef">
{GATE_HEAD % repr(GATES).replace("'", '"').replace("False", "false").replace("True", "true")}
{POSTHOG}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/v6/v6.css">
</head>'''

LIVE_JS = """<script>
/* Prices and caps read live from /billing/plans, so the page says what the
   product charges. Every failure path leaves the printed values alone. */
(function(){if(!window.fetch)return;fetch('https://api.henwayai.com/billing/plans',{cache:'no-store'}).then(function(r){return r.ok?r.json():null}).then(function(d){if(!d)return;
function set(k,v){if(v==null)return;document.querySelectorAll('[data-live="'+k+'"]').forEach(function(e){e.textContent=v})}
if(d.keep_app&&d.keep_app.price)set('keep','$'+d.keep_app.price);
if(d.app_ai){set('ai-free',d.app_ai.daily_free);set('ai-paid',d.app_ai.daily_paid)}
if(d.app_payments&&d.app_payments.fee_bps!=null)set('fee',(d.app_payments.fee_bps/100)+'%');
var s=d.studio_session;if(s){set('studio','$'+s.price);if(s.url)document.querySelectorAll('[data-live-href="studio"]').forEach(function(a){a.href=s.url})}
(d.plans||[]).forEach(function(p){set('m-'+p.id,'$'+p.monthly_price);set('y-'+p.id,'or $'+p.annual_price.toLocaleString('en-US')+' a year')});
}).catch(function(){})})();
</script>"""

FILTER_JS = """<script>
document.querySelectorAll('.pick button').forEach(function(b){b.addEventListener('click',function(){
 document.querySelectorAll('.pick button').forEach(function(x){x.setAttribute('aria-pressed',x===b)});
 var f=b.dataset.f;document.querySelectorAll('.grid .card').forEach(function(c){c.style.display=(f==='all'||c.dataset.f===f)?'':'none'})})});
</script>"""

def page(slug, title, desc, body, extra_js="", og_title=None, robots=None, gate_page=None):
    gp = f' data-gate-page="{gate_page}"' if gate_page else ""
    return (head(slug, title, desc, og_title, robots) + f"\n<body{gp}>\n<main>{body}</main>\n{extra_js}\n"
            '<script src="/track.js" defer></script>\n</body>\n</html>\n')

# ---------------------------------------------------------------- transforms
def common(html, cur):
    # comp chrome -> real chrome
    html = re.sub(r'<header class="top">.*?</header>', lambda m: header(cur), html, count=1, flags=re.S)
    html = html.replace(C.FOOT, FOOT)
    for k, r in ROUTES.items():
        html = html.replace(f'href="#{k}"', f'href="{r}"')
    html = html.replace('src="img/hatching-chick.png"', 'src="/v6/img/hatching-chick.webp" width="260" height="260" loading="lazy"')
    html = html.replace('src="img/chick-shades-tight.png"', 'src="/v6/img/chick-shades-tight.webp" width="56" height="56"')
    html = html.replace('src="img/', 'src="/v6/img/')
    html = html.replace('href="https://app.henwayai.com/try"', 'href="https://app.henwayai.com/try" data-cta="start"')
    return html

def sub(html, a, b, count=1):
    assert a in html, ("missing", a[:80])
    return html.replace(a, b, count)

def gate(html, a, name, count=1):
    """Wrap the first element starting with `a` in a data-gate by adding the attribute."""
    assert a in html, ("missing gate target", a[:80])
    tag_end = a.index(">") if ">" in a else len(a)
    return html.replace(a, a[:tag_end] + f' data-gate="{name}"' + a[tag_end:], count)

# ---------------------------------------------------------------- pages
def home():
    # The fresh-eyes home (creative-advisor pass 2026-11-21). Content lives in fresh.py.
    body = header("home") + F.home_body(lambda k: mine(KEYS[k])) + FOOT
    return page("home", "Henway: if you can complain to a friend, you can make an app",
                "Say what's bugging you in plain words. Henway hands back a working app on your phone, ready to share by link. Your first app is free. $9 to keep it, once.",
                body, LIVE_JS, og_title="If you can complain to a friend, you can make an app.")

def story(k):
    s = F.S[k]
    body = header("apps") + F.story_body(k, lambda k: mine(KEYS[k])) + FOOT
    return page(f"st-{k}", f"{s['name']}: \u201c{s['q']}\u201d · Henway starter app",
                f"{s['lede']} Free to try. $9 to keep it, once.", body, LIVE_JS + F.BUYBAR_JS,
                og_title=f"{s['name']}: \u201c{s['q']}\u201d")

def apps():
    h = common(C.APPS, "apps")
    h = h.replace('class="card" data-f', 'class="card st-card" data-f')
    # names match the live apps
    h = h.replace("Brand Deals", "Brand Deal Tracker").replace("Group Trip", "Trip Plan")
    h = h.replace("<i>Shared with clients</i>", "<i>Each client's own log</i>")
    # every card links its story page
    for k, key in KEYS.items():
        h = sub(h, f'<a class="open" href="https://api.henwayai.com/s/{key}">Open it</a>',
                f'<a class="open" href="https://api.henwayai.com/s/{key}">Open it</a><a class="open" href="/apps/{k}">See how it works</a>')
    return page("apps", "Starter apps: find yours, then make it yours · Henway",
                "Starter apps that began as real complaints: a workout log your clients use, a potluck list, a brand deal tracker, a trip plan, a recipe box, license renewals. Open one, then make it yours. Free to start, $9 to keep.",
                h, FILTER_JS)

def pricing():
    h = common(C.PRICING, "pricing")
    free_ul = re.search(r'<div class="tier"><div class="tt"><b>Free</b>.*?<ul>.*?</ul>', h, re.S).group(0)
    new_free = re.sub(r"<ul>.*?</ul>", '<ul><li>An app at its own link</li><li>Change it by saying so</li>'
                      '<li data-gate="keepv2">Shared lists with up to 5 people</li>'
                      '<li><span data-live="ai-free">20</span> AI answers a day</li>'
                      '<li data-gate="payments">Take payments in your app</li>'
                      '<li class="x">6 months with nothing new saved clears its saved data. The app itself stays.</li></ul>', free_ul, flags=re.S)
    h = h.replace(free_ul, new_free)
    keep_ul = re.search(r'<div class="tier hot">.*?<ul>.*?</ul>', h, re.S).group(0)
    new_keep = re.sub(r"<ul>.*?</ul>", '<ul><li data-gate="keepv2">Your own app name and icon</li>'
                      '<li data-gate="keepv2">Shared lists with no cap on people</li><li data-ungate="keepv2">Share it with your people</li>'
                      '<li><span data-live="ai-paid">200</span> AI answers a day, not <span data-live="ai-free">20</span></li>'
                      '<li>Kept as it is, even if it sits unused</li><li>Help from Henway with that app</li><li>No subscription</li></ul>', keep_ul, flags=re.S)
    h = h.replace(keep_ul, new_keep)
    h = re.sub(r'(<div class="tier[^"]*">.*?</ul>)', lambda m: re.sub(r'(<li[^>]*>)(.*?)</li>', r'\1<span>\2</span></li>', m.group(1)), h, flags=re.S)
    h = sub(h, '<div class="amt"><span>$9</span>', '<div class="amt"><span data-live="keep">$9</span>')
    h = sub(h, '<div class="amt"><span>$150</span>', '<div class="amt"><span data-live="studio">$150</span>')
    h = sub(h, '<a class="btn dark" href="https://book.stripe.com/8x228t78q6I4fiS9L2bo400">', '<a class="btn dark" href="https://book.stripe.com/8x228t78q6I4fiS9L2bo400" data-live-href="studio" data-cta="studio-hour">')
    h = gate(h, '<section class="paid" style="margin-top:56px">', "payments")
    h = sub(h, '<div class="big5">5%</div>', '<div class="big5" data-live="fee">5%</div>')
    h = sub(h, "<li>No monthly charge</li><li>Payouts to your bank, through Stripe</li><li>Turn it on with one sentence</li>",
            "<li>No monthly charge</li><li>Stripe's card fee comes out of each payment</li><li>Refund a payment and Henway's 5% goes back too</li><li>Payouts to your bank, through Stripe</li><li><a href=\"/get-paid/setup\">How setup works, step by step</a></li>")
    for tid, (m, y) in {"tier_1": ("$29", "or $249 a year"), "tier_2": ("$139", "or $1,199 a year"), "tier_3": ("$249", "or $1,999 a year")}.items():
        h = sub(h, f'<div class="a">{m}<small>/mo</small></div><div class="y">{y}</div>',
                f'<div class="a"><span data-live="m-{tid}">{m}</span><small>/mo</small></div><div class="y" data-live="y-{tid}">{y}</div>')
    h = sub(h, 'href="https://www.henwayai.com/consultants"', 'href="/consultants"')
    h = sub(h, "<details><summary>What happens after 6 months?</summary><p>A free app nobody opens for 6 months gets cleared. Keep it for $9, once, and it stays.</p></details>",
            "<details><summary>What happens after 6 months?</summary><p>If an app goes 6 months with nothing new saved, its saved data is cleared. The app itself stays. Apps you keep for $9, and apps on a paid plan, are kept as they are.</p></details>"
            '<details id="refunds"><summary>Can I get a refund?</summary><p>See the refund policy on the <a href="/support#refunds">support page</a>.</p></details>')
    h = sub(h, "Free apps get 20 a day. Kept apps get 200.", 'Free apps get <span data-live="ai-free">20</span> a day. Kept apps get <span data-live="ai-paid">200</span>.')
    return page("pricing", "Henway pricing: first app free, keep it for $9 once",
                "Your first app is free, with no card. Keep it for $9, once, with no monthly bill. Or build it with Michael for $150. Monthly plans are for consultants and agencies.",
                h, LIVE_JS, og_title="Your first app is free. Keep it for $9, once.")

def method():
    h = common(C.METHOD, "method")
    h = gate(h, "<li><span>Clients can pay for the challenge</span>", "payments")
    h = sub(h, "<div><b>Reminders</b><span>Emails on the days you pick, to the people you add.</span></div>",
            "<div><b>Reminders</b><span>Emails on the days each person picks. One tap stops them.</span></div>")
    h = gate(h, "<div><b>Payments</b>", "payments")
    return page("method", "How Henway works: talk, it builds, you keep it",
                "Say what's bugging you. Henway tells you what it will build and what it won't, builds it at its own link, and keeps changing it when you say so. Every change can be undone.",
                h, og_title="Talk. It builds. You keep it.")

def trust():
    h = common(C.TRUST, "trust")
    h = sub(h, "<p>A shared list lives on Henway's server. Only people with the link can see it.</p>",
            "<p>Turn on a shared list and it lives on Henway's server. Each person agrees before they add to it. Everything else stays on your device.</p>")
    h = sub(h, "<p>Reminder emails come from Henway, on the days you pick. Anyone can stop them in one tap.</p>",
            "<p>A reminder goes only to someone who confirms it from their own inbox. We keep that email until they stop it, in one tap.</p>")
    h = sub(h, '<b>Only to people you add.</b>', '<b>Only to people who say yes.</b>')
    h = gate(h, '<div class="fact"><span class="k">Payments</span>', "payments")
    h = sub(h, "<p>Card details go straight to Stripe. Henway sees the amount and who paid, not the card.</p>",
            "<p>Card details go straight to Stripe. Henway sees the amount and what it was for, not the card or who paid.</p>")
    h = sub(h, "<p>Delete an app and its data goes with it. Ask us to erase everything and we do.</p>",
            "<p>Delete an app and its data goes with it. If an app goes 6 months with nothing new saved, its saved data is cleared. The app itself stays. Apps you keep for $9, and apps on a paid plan, are kept as they are. Ask us to erase everything and we do.</p>")
    h = sub(h, "<p>The photo, or your question and the bit of data it needs.", "<p>The photo or PDF, or your question and the bit of data it needs.")
    return page("trust", "Henway trust and privacy: what leaves your phone, and when",
                "A Henway app keeps what you type on your device unless you share a list. It asks before AI reads anything, sends it once, and Henway doesn't keep it. Here's what goes where.",
                h, og_title="Know what leaves your phone.")

def which():
    old = orig("which-tool.html")
    picker = re.search(r'<div id="picker".*?\n  </div>\n', old, re.S)
    script = re.search(r"<script>\s*/\*[^*]*?tenant the signed-out.*?</script>|<script>\s*/\*(?:(?!</script>).)*?/platforms/recommend.*?</script>", old, re.S)
    assert picker and script, "which-tool picker/script not found"
    h = common(C.WHICH, "")
    rows = {
        'cmp_you_get': ("A code project you run and host", "An app and its code, published on their platform"),
        'cmp_chat': ("An answer, sometimes code", "An answer, sometimes a small app inside the chat"),
        'cost_ptc': ('<td data-h="Prompt-to-code builders">Monthly plans</td>', '<td data-h="Prompt-to-code builders">Free tier, then monthly (Bolt Pro is $25)</td>'),
        'cost_chat': ('<td data-h="AI chat">Monthly plan</td>', '<td data-h="AI chat">Free tier, then monthly</td>'),
        'cost_nc': ('<td data-h="No-code builders">Monthly plans</td>', '<td data-h="No-code builders">Free tier, then monthly (Softr Basic is $19)</td>'),
    }
    for a, b in rows.values():
        h = sub(h, a, b)
    closer = re.search(r'<section class="closer"><div class="wrap">\n <h2 class="hh h2" style="margin-bottom:22px">Not sure\?.*?</section>', h, re.S).group(0)
    h = h.replace(closer, '<section class="closer ask"><div class="wrap"><h2 class="hh h2" style="margin-bottom:22px">Not sure? <span class="hl">Ask it.</span></h2>'
                  '<p class="lede">Describe what you want. You get an honest answer in about ten seconds, even when it isn\'t Henway. No account.</p>'
                  + picker.group(0) + '</div></section>')
    return page("which", "Which AI app builder should you use? Henway vs Lovable, Bolt, ChatGPT and Glide",
                "An honest side by side of Henway, prompt-to-code builders, AI chat and no-code builders, with when to pick something else. Or describe what you want and get an answer in ten seconds.",
                h, script.group(0), og_title="Which one fits you?")

def coaches():
    h = common(C.COACHES, "")
    h = h.replace(mine(KEYS["workout"], "coaches"), mine(KEYS["workout"], "coaches"))
    h = gate(h, '<div class="q3 wl tight">', "payments")
    h = gate(h, "<li><b>Dec 15</b>", "payments")
    h = sub(h, "<li><b>Every week</b><span>See who's slipping. Nudge them in one tap.</span></li>",
            "<li><b>Every week</b><span>Each client asks their log what they skipped.</span></li>")
    h = sub(h, "<div><b>It nudges for you</b><span>\"Leg day, Jordan.\" On the days you pick.</span></div>",
            "<div><b>It reminds them</b><span>\"Leg day, Jordan.\" On the days each client picks.</span></div>")
    h = gate(h, "<div><b>Get paid</b>", "payments")
    h = sub(h, '<p class="lede">Plans, reminders and the challenge they pay for. Built from what you already text them.</p>',
            '<p class="lede">The app your clients log in. Plans and reminders<span data-gate="payments">, and the challenge they pay for</span>. Built from what you already text them.</p>')
    return page("coaches", "Henway for coaches: the workout app your clients log in",
                "Turn the workouts you text clients into an app they log in. It reads their screenshots and reminds them on the days they pick. Start from the Workout Log starter, free.",
                h, og_title="Your clients' January, in one app.")

def getpaid():
    h = common(C.GETPAID, "")
    h = gate(h, '<div class="way"><div class="n">2</div>', "copies")
    h = sub(h, "<p class=\"lede\">Sell inside it. Or sell copies of it. Henway's fee is 5%. No monthly charge.</p>",
            "<p class=\"lede\">Sell inside it<span data-gate=\"copies\">, or sell copies of it</span>. Henway's fee is 5%. No monthly charge.</p>")
    h = sub(h, "<p style=\"font-size:20px;font-weight:700;margin:10px 0 0;color:#d9cfbb\">Tasha's January challenge, 12 clients</p>",
            "<p style=\"font-size:20px;font-weight:700;margin:10px 0 0;color:#d9cfbb\">An example: a $40 January challenge, 12 clients</p>")
    h = sub(h, "<div><b>Copies of your app</b><span>5% of each sale. You set the price.</span></div>",
            "<div data-gate=\"copies\"><b>Copies of your app</b><span>You set the price, $9 or more. Henway keeps 10% when they buy from your link.</span></div>")
    h = sub(h, 'One number: <span class="hl">5%.</span></h2>', '5% on payments.<span data-gate="copies"> <span class="hl">10% on copies.</span></span></h2>')
    h = sub(h, "<p class=\"lede\">Sell inside it<span data-gate=\"copies\">, or sell copies of it</span>. Henway's fee is 5%. No monthly charge.</p>",
            "<p class=\"lede\">Sell inside it<span data-gate=\"copies\">, or sell copies of it</span>. Henway keeps 5% of payments<span data-gate=\"copies\"> and 10% of copies sold from your link</span>. No monthly charge.</p>")
    h = sub(h, "<div><b>Card processing</b><span>Stripe handles cards and payouts.</span></div>",
            "<div><b>Card processing</b><span>Stripe's card fee comes out of each payment. Stripe handles cards and payouts.</span></div>"
            "<div><b>Refunds</b><span>Refund a payment and Henway's 5% goes back too.</span></div>")
    h = sub(h, '<span class="kick">Set up</span><h2 class="hh h2" style="margin-bottom:26px">Paid in <span class="hl">three steps.</span></h2>',
            '<span class="kick">Set up</span><h2 class="hh h2" style="margin-bottom:26px">Paid in <span class="hl">three steps.</span></h2><p style="margin:-10px 0 22px;font-weight:700"><a href="/get-paid/setup">See every screen, step by step →</a></p>')
    h = sub(h, '<span>by Coach Tasha</span></div><span class="pr">$19</span>', '<span>by a coach</span></div><span class="pr">$19</span>')
    return page("getpaid", "Get paid with your Henway app: payments inside your app, 5% fee",
                "Let clients pay inside your app for classes, challenges and deposits. Stripe pays you out. Henway's fee is 5% of each payment, with no monthly charge.",
                h, og_title="Your app can make money.", robots="noindex", gate_page="payments")

def studio():
    h = common(C.STUDIO, "")
    h = sub(h, '<a class="btn dark" href="https://book.stripe.com/8x228t78q6I4fiS9L2bo400">', '<a class="btn dark" href="https://book.stripe.com/8x228t78q6I4fiS9L2bo400" data-cta="studio-hour">')
    h = sub(h, '<a class="btn go" href="#">Start the pilot</a>', '<a class="btn go" href="mailto:letsconnect@henwayai.com?subject=Email%20alerts%20pilot" data-cta="studio-pilot">Start the pilot</a>')
    h = sub(h, '<a class="btn" href="#">Get a list</a>', '<a class="btn" href="mailto:letsconnect@henwayai.com?subject=Founding%20thesis%20list" data-cta="studio-thesis">Get a list</a>')
    h = sub(h, '<a class="btn" href="#">Book a 20-minute call</a>', '<a class="btn" href="https://bookme-omega-smoky.vercel.app" data-cta="studio-call">Book a 20-minute call</a>')
    h = sub(h, '<a class="btn go" href="#">Get in touch</a>', '<a class="btn go" href="mailto:letsconnect@henwayai.com?subject=Studio%20project">Get in touch</a>')
    assert 'href="#"' not in h
    return page("studio", "Henway Studio: when you'd rather hand it over",
                "Studio sets Henway up on your accounts, connects your tools and tunes it after launch. Start with a $150 hour, a $500 pilot or a $750 lead list.",
                h, og_title="When you'd rather hand it over.")

def consult():
    h = common(C.CONSULT, "")
    h = sub(h, "<li><b>It builds</b><span>About seven minutes, while they watch.</span></li>", "<li><b>It builds</b><span>A few minutes, while they watch.</span></li>")
    h = sub(h, '<a class="btn" href="/pricing">See plans</a>', '<a class="btn" href="#plans">See plans</a>')
    h = sub(h, '<span class="kick">Plans</span>', '<span class="kick" id="plans">Plans</span>')
    h = sub(h, '<h2 class="stack">', '<h1 class="stack">').replace('<span class="o">they can open.</span></h2>', '<span class="o">they can open.</span></h1>')
    for tid, (m, y) in {"tier_1": ("$29", "or $249 a year"), "tier_2": ("$139", "or $1,199 a year"), "tier_3": ("$249", "or $1,999 a year")}.items():
        h = sub(h, f'<div class="a">{m}<small>/mo</small></div><div class="y">{y}</div>',
                f'<div class="a"><span data-live="m-{tid}">{m}</span><small>/mo</small></div><div class="y" data-live="y-{tid}">{y}</div>')
    return page("consultants", "Henway for consultants: AI discovery that ends on a working app, under your brand",
                "Run discovery with a client's team. They describe a normal week, Henway builds a working app while they watch, and they leave with a brief that has your name on it.",
                h, LIVE_JS, og_title="End the room on something they can open.")

def dpa():
    old = orig("dpa.html")
    body = re.search(r'(<h2>1\. Roles</h2>.*?)\n</div></div>', old, re.S).group(1)
    h = common(C.DPA, "")
    # Keep the comp's header and section index; the legal text is today's, unchanged.
    h = re.sub(r'<h3>1\. Roles</h3>.*?Only this header changes\.</p>', lambda m: body.replace("<h2>", "<h3>").replace("</h2>", "</h3>"), h, count=1, flags=re.S)
    h = re.sub(r'<li><div><b>([^<]+)</b></div></li>', lambda m: f'<li><div><b>{m.group(1)}</b></div></li>', h)
    return page("dpa", "Henway data processing addendum",
                "The data processing addendum for using Henway with your own clients' personal data, most often on Consultant and Agency plans. Effective September 10, 2026.",
                h)


SETUP_STEPS = [
 ("henway-before", "In Henway", "Open Your apps and tap Set up payments.", "Read the Before you start card: what you need, about 5 minutes, and the 5% fee."),
 ("stripe-email", "Stripe", "Sign in or make a Stripe account.", "Use the email you want payout notices sent to."),
 ("stripe-type", "Stripe", "Pick your business type.", "Most coaches and hosts pick Individual. No company needed."),
 ("stripe-details", "Stripe", "Add your details.", "Your legal name, birth date and the last 4 of your SSN. Stripe checks who you are, not Henway."),
 ("stripe-website", "Stripe", "Website: you can leave it blank.", "We already told Stripe what you sell."),
 ("stripe-bank", "Stripe", "Add the bank for payouts.", "Payments land here on Stripe's payout schedule."),
 ("henway-on", "In Henway", "You're back. Payments are on.", "Now add a Pay button with Change this app: say \"Let clients pay $40 for January.\""),
]

def setup_page():
    steps = "".join(
        f'''<li class="sstep"><div class="txt"><span class="kick">Step {i} · {who}</span><h2 class="hh">{h}</h2><p>{p}</p></div>
<figure class="shotph" data-capture="{k}"><div><b>Screenshot needed</b><span>{k}.png · {"Stripe sandbox onboarding" if who == "Stripe" else "Henway app"}</span></div></figure></li>'''
        for i, (k, who, h, p) in enumerate(SETUP_STEPS, 1))
    body = header("") + f'''
<section class="phead"><div class="wrap">
 <span class="kick"><a href="/get-paid" style="text-decoration:none">Get paid</a> · Setup</span>
 <h1 class="hh h1">Take payments in <span class="hl">about 5 minutes.</span></h1>
 <p class="lede">Stripe pays you. Henway keeps 5% of each payment, and Stripe's card fee comes out of each one. Here's every screen you'll see.</p>
 <p style="font-weight:700;margin:0">You need: an email, your legal name, the last 4 of your SSN, and a bank account.</p>
</div></section>
<section style="padding-top:8px"><div class="wrap"><ol class="ssteps">{steps}</ol></div></section>
<section class="closer" style="background:var(--egg)"><div class="wrap"><h2 class="hh h2">Add a Pay button with <span class="hl">Change this app.</span></h2>
 <p class="lede">Say what it's for and how much. The button appears.</p><a class="btn go" href="https://app.henwayai.com/apps" data-cta="setup-open-apps">Open Your apps</a></div></section>
''' + FOOT
    for t in ("payments",):
        pass
    return page("setup", "How to set up payments in your Henway app, step by step",
                "Every screen of setting up payments in a Henway app: the Before you start card, Stripe's sign-up, business type, your details, website, bank, and the Pay button.",
                body, og_title="Take payments in about 5 minutes.", robots="noindex", gate_page="payments")


# ---------------------------------------------------------------- mobile image fixes
# Every picture carries its real size so the browser keeps its shape. Starter
# pictures are live captures at 340px wide (2x), so their text stays readable
# when they fill a card on a phone.
IMG_SIZES = {"coach-thread.png": (640, 830), "day2-read.jpg": (684, 464), "chick-shades-tight.webp": (56, 81),
             "hatching-chick.webp": (260, 263), "chick-hatch.png": (250, 360)}

def fix_imgs(html):
    html = html.replace('<div class="listing"><img src="/v6/img/st-workout.jpg" alt="Workout Log">',
                        '<div class="listing"><i class="lic" aria-hidden="true">WL</i>')
    html = re.sub(r'<img loading="lazy" width="400" height="500" src="/v6/img/st-', '<img src="/v6/img/st-', html)
    html = re.sub(r'<img src="/v6/img/st-([a-z]+)\.jpg"', r'<img loading="lazy" width="680" height="840" src="/v6/img/live-\1.jpg"', html)
    html = re.sub(r'(<img loading="lazy"[^>]*?) loading="lazy">', r'\1>', html)
    def size(m):
        tag, src = m.group(0), m.group(1)
        w, h = IMG_SIZES[src]
        tag = re.sub(r'\s(width|height)="\d+"', "", tag)
        return tag.replace("<img ", f'<img width="{w}" height="{h}" ', 1)
    return re.sub(r'<img [^>]*?src="/v6/img/(%s)"[^>]*>' % "|".join(re.escape(k) for k in IMG_SIZES), size, html)

EXTRA_CSS = """
.top .login{margin-left:8px;font-weight:700;font-size:16px;text-decoration:none;padding:8px 10px}
@media(max-width:900px){.top .login{margin-left:auto}.top .btn.go{margin-left:0}}
@media(max-width:380px){.top .login{display:none}.top .btn.go{margin-left:auto}}
.foot .legal{display:block;margin-top:22px}.foot .legal p{font-size:15px;color:var(--muted)}
.eg{grid-column:1/-1;margin:0;font-size:15px;font-weight:700;color:var(--muted)}
.ask #picker{text-align:left;margin:0 auto;max-width:720px;background:#fffdf8;border:2px solid var(--ink);border-radius:22px;padding:24px}
.ask #picker label{color:var(--goldt)!important;font-size:15px!important}
.ask #picker textarea,.ask #picker select{font-size:17px!important}
.ask #picker .btn,.ask #picker button{font:800 17px var(--sans)}
:root{--border:var(--line)}
.ssteps{list-style:none;margin:0;padding:0;display:grid;gap:0}
.sstep{display:grid;grid-template-columns:1fr;gap:18px;align-items:center;padding:34px 0;border-top:1px solid var(--line)}
@media(min-width:900px){.sstep{grid-template-columns:1fr 1fr;gap:56px}}
.sstep h2{font-size:clamp(26px,3vw,36px);letter-spacing:-.02em;line-height:1.05;margin:0 0 8px}.sstep p{margin:0;color:var(--muted);font-size:18px}
.shotph{margin:0;aspect-ratio:4/3;border:2px dashed var(--kraft);border-radius:18px;background:#fffdf8;display:grid;place-items:center;text-align:center;padding:16px}
.shotph b{display:block;font-size:18px}.shotph span{font-size:16px;color:var(--muted)}
@media(max-width:820px){.cmp td:first-child{width:auto}}
.todo{border:2px dashed #d9442b;border-radius:16px;padding:18px;background:#fff6f2}.todo b{color:#9e2814;letter-spacing:.08em}.todo p{margin:6px 0 0}
img{height:auto}
.top nav.mnav{display:none}
@media(max-width:900px){.top nav.mnav{display:flex}}
.mnav a{min-height:44px;display:inline-flex;align-items:center}
.top nav.mnav a.cur{background:var(--ink);color:var(--paper)}
.top .logo{flex:none}.top .logo img{width:120px;height:30px}
.foot a{padding:12px 0;min-height:44px;box-sizing:border-box}
.top .login{min-height:44px;display:inline-flex;align-items:center}
.card .row a.open{min-height:44px;display:inline-flex;align-items:center}
.card .shot{aspect-ratio:680/840}
.st img{aspect-ratio:680/840}
.listing .lic{width:76px;height:76px;border-radius:16px;background:#EAF4EE;border:2.5px solid #1b1b22;display:flex;align-items:center;justify-content:center;font-style:normal;font-weight:900;font-size:24px;flex:none;color:#1b1b22}
@media(max-width:640px){
 .card .shot{margin:12px -18px 0;border-radius:0;border-width:1.5px 0}
 .d2 .out.wl{padding:0;background:none;margin:0 -20px}
 .d2 .out img{border-radius:0}
 .ba{grid-template-columns:1fr;max-width:none}
 .d2 .in{display:block}.d2 .in img{width:100%}
 .shelf{grid-template-columns:1fr}
 .st img{width:calc(100% + 28px);max-width:none;margin:-14px -14px 0;border-radius:16px 16px 0 0;border:0;border-bottom:1px solid var(--line)}
}
"""


RETENTION = "If an app goes 6 months with nothing new saved, its saved data is cleared. The app itself stays. Apps you keep for $9, and apps on a paid plan, are kept as they are."

def support_page():
    qa = [
        ("Where are my apps?", "Sign in at <a href=\"https://app.henwayai.com/login\">app.henwayai.com/login</a> with the email you used. Your apps are under Apps. Built one without an account? It lives at its own link. If you gave us your email, that link is in the email we sent when it was ready."),
        ("How do I log in?", "Use Google, or type your email and tap the button to get a sign-in link. No password needed. If the link doesn't arrive, check spam, then email us."),
        ("How do I change my app?", "Open it and tap Change this app. Say what you want different. You see a preview first, and Undo puts it back."),
        ("What does $9 get me?", "That app is kept as it is, even if it sits unused, with <span data-live=\"ai-paid\">200</span> AI answers a day instead of <span data-live=\"ai-free\">20</span>, and help from Henway with it. You pay once. There's no subscription."),
        ("Why did an AI button stop working?", "Each app gets a set number of AI answers a day, shared by everyone who uses it. A photo counts as 2. It resets the next day, or keep the app for $9 to get more."),
        ("What happens after 6 months?", RETENTION),
        ("How do I delete my data?", "Delete an app from your Apps list and its data goes with it. To erase everything, use <a href=\"https://app.henwayai.com/privacy/delete\">Delete my data</a> or email us."),
    ]
    faq = "".join(f"<details><summary>{q}</summary><p>{a}</p></details>" for q, a in qa)
    body = header("") + f'''<section class="hero"><div class="wrap" style="display:block;max-width:860px">
 <span class="kick">Support</span>
 <h1 class="hh h1">Stuck? <span class="hl">Email us.</span></h1>
 <p class="lede">Write to <a href="mailto:{SUPPORT_EMAIL}"><b>{SUPPORT_EMAIL}</b></a>. Tell us the app's name and what happened. A person reads every email.</p>
 <div class="acts" style="margin-top:22px"><a class="btn go" href="mailto:{SUPPORT_EMAIL}?subject=Help%20with%20my%20app" data-cta="support-email">Email support</a></div>
</div></section>
<section><div class="wrap" style="max-width:860px">
 <span class="kick">Common questions</span>
 <div class="faq">{faq}</div>
</div></section>
<section id="refunds"><div class="wrap" style="max-width:860px">
 <span class="kick">Refunds</span>
 <h2 class="hh h2">Refund policy</h2>
 <div class="todo"><b>TODO-MICHAEL</b><p>Placeholder. The refund policy for the $9 keep, the $150 hour and payments inside apps goes here. It is waiting on Michael.</p></div>
</div></section>''' + FOOT
    return page("support", "Henway support: help with your app, logging in and refunds",
                f"Email {SUPPORT_EMAIL} and a person answers. Find your apps, log in, change an app, and what happens after 6 months.",
                body, LIVE_JS, og_title="Stuck? Email us.")

def build():
    css = C.CSS.split("/* comp switcher */")[0] + C.CSS.split(".view{display:none}.view.on{display:block}")[1] + C.CSS2 + EXTRA_CSS
    (SITE / "v6").mkdir(exist_ok=True)
    (SITE / "v6" / "v6.css").write_text(css)
    out = {"index.html": home(), "apps.html": apps(), "pricing.html": pricing(), "method.html": method(),
           "trust.html": trust(), "which-tool.html": which(), "coaches.html": coaches(), "get-paid.html": getpaid(),
           "studio.html": studio(), "consultants.html": consult(), "dpa.html": dpa(),
           "get-paid/setup.html": setup_page(), "support.html": support_page(), **{f"apps/{k}.html": story(k) for k in STARTERS}}
    (SITE / "v6" / "fresh.css").write_text(F.scoped_css())
    for name, html in out.items():
        html = fix_imgs(html)
        if name == "index.html" or name.startswith("apps/"):
            html = html.replace('<link rel="stylesheet" href="/v6/v6.css">', '<link rel="stylesheet" href="/v6/v6.css">\n<link rel="stylesheet" href="/v6/fresh.css">')
        assert "—" not in html, f"em dash in {name}"
        bad = re.findall(r'href="#(home|apps|method|pricing|trust|which|coaches|getpaid|studio|consultants|dpa)"', html)
        assert not bad, (name, bad)
        (SITE / name).parent.mkdir(exist_ok=True)
        (SITE / name).write_text(html)
    print("wrote", ", ".join(out))

if __name__ == "__main__":
    build()
