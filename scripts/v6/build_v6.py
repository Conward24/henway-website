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
  keepv2    when GATES.keepv2 is set true below (own name/icon and unlimited
            shared-list people on the $9 keep, pending the backend PR)
Any other host (Vercel previews, localhost) shows everything, and ?preview=1
shows everything on prod too, so the gated parts can be reviewed.
"""
import pathlib, re, subprocess, sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import comps as C  # noqa: E402

GATES = {"payments": False, "copies": False, "keepv2": False}
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
<div><b>Help</b><a href="https://app.henwayai.com/help">Support</a><a href="https://app.henwayai.com/privacy">Privacy</a><a href="https://app.henwayai.com/terms">Terms</a><a href="https://app.henwayai.com/privacy/delete">Delete my data</a><a href="mailto:support@henwayai.com">Contact</a></div>
</div><div class="wrap legal"><p>&copy; 2026 Henway AI. Patent-pending technology. Product names on this site are trademarks of their owners. Henway is not affiliated with any of them and earns nothing when it recommends one.</p></div></footer>'''

GATE_HEAD = """<script>(function(){var G=%s,h=location.hostname,prod=/(^|\\.)henwayai\\.com$/.test(h),all=!prod||/[?&]preview=1/.test(location.search),c=document.documentElement.classList;
Object.keys(G).forEach(function(k){if(all||G[k])c.add('g-'+k)});
if(!c.contains('g-payments')&&window.fetch){fetch('https://api.henwayai.com/billing/plans',{cache:'no-store'}).then(function(r){return r.ok?r.json():null}).then(function(d){if(d&&d.app_payments&&d.app_payments.enabled){c.add('g-payments');document.dispatchEvent(new Event('henway:payments'))}else if(document.body&&document.body.dataset.gatePage==='payments'){location.replace('/')}}).catch(function(){})}})();</script>
<style>html:not(.g-payments) [data-gate~=payments],html:not(.g-copies) [data-gate~=copies],html:not(.g-keepv2) [data-gate~=keepv2]{display:none!important}
html.g-payments [data-ungate~=payments],html.g-keepv2 [data-ungate~=keepv2]{display:none!important}</style>"""

POSTHOG = re.search(r"<!-- PostHog.*?</script>", orig("pricing.html"), re.S).group(0)

def head(slug, title, desc, og_title=None, robots=None):
    url = ORIGIN + ROUTES[slug] if ROUTES[slug] != "/" else ORIGIN + "/"
    og_title = og_title or title
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
<meta property="og:image" content="https://www.henwayai.com/images/og-complain.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Henway. If you can complain to a friend, you can make an app. Free to start.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{og_title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="https://www.henwayai.com/images/og-complain.jpg">
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
    h = common(C.HOME, "home")
    h = sub(h, '<p class="lede">Your coach\'s texts, turned into a log your clients use.</p>',
            '<p class="lede">Your coach\'s texts, turned into a log your clients use.</p>')
    h = sub(h, '<div class="ba">', '<div class="ba"><p class="eg">Meet Tasha, an example coach.</p>')
    # Week 1: each client signs up for their own reminder email.
    h = sub(h, "<p class=\"lede\">Tasha picks the days. The app does the nudging.</p>",
            "<p class=\"lede\">Clients pick their days. The app does the nudging.</p>")
    # Month 1 is payments: held until payments are on.
    h = gate(h, '<section class="ch egg"><div class="wrap">\n <div class="txt"><span class="kick">Month 1</span>', "payments")
    for k in ("workout", "potluck", "deals", "trip"):
        h = re.sub(r'<a class="st" href="/apps">(<img src="/v6/img/st-%s\.jpg")' % k,
                   lambda m, k=k: f'<a class="st" href="{mine(KEYS[k])}" data-cta="starter-{k}">{m.group(1)}', h)
    h = h.replace('<img src="/v6/img/st-', '<img loading="lazy" width="400" height="500" src="/v6/img/st-')
    return page("home", "Henway: if you can complain to a friend, you can make an app",
                "Say what's bugging you in plain words. Henway builds a working app at its own link: it reads your screenshots, reminds your people, and changes when you say so. Your first app is free.",
                h, og_title="If you can complain to a friend, you can make an app.")

def apps():
    h = common(C.APPS, "apps")
    h = h.replace('class="card" data-f', 'class="card st-card" data-f')
    return page("apps", "Starter apps: find yours, then make it yours · Henway",
                "Starter apps that began as real complaints: a workout log for coaches, a potluck list, brand deals, a group trip, a recipe box, license renewals. Open one, then make it yours. Free to start, $9 to keep.",
                h, FILTER_JS)

def pricing():
    h = common(C.PRICING, "pricing")
    free_ul = re.search(r'<div class="tier"><div class="tt"><b>Free</b>.*?<ul>.*?</ul>', h, re.S).group(0)
    new_free = re.sub(r"<ul>.*?</ul>", '<ul><li>An app at its own link</li><li>Change it by saying so</li>'
                      '<li data-gate="keepv2">Shared lists with up to 5 people</li><li data-ungate="keepv2">Share it with your people</li>'
                      '<li><span data-live="ai-free">20</span> AI answers a day</li>'
                      '<li data-gate="payments">Take payments in your app</li>'
                      '<li class="x">Cleared after 6 months if nothing new is saved</li></ul>', free_ul, flags=re.S)
    h = h.replace(free_ul, new_free)
    keep_ul = re.search(r'<div class="tier hot">.*?<ul>.*?</ul>', h, re.S).group(0)
    new_keep = re.sub(r"<ul>.*?</ul>", '<ul><li data-gate="keepv2">Your own app name and icon</li>'
                      '<li data-gate="keepv2">Shared lists with no cap on people</li>'
                      '<li><span data-live="ai-paid">200</span> AI answers a day, not <span data-live="ai-free">20</span></li>'
                      '<li>Stays for good, even if it sits unused</li><li>Help from Henway with that app</li><li>No subscription</li></ul>', keep_ul, flags=re.S)
    h = h.replace(keep_ul, new_keep)
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
            "<details><summary>What happens after 6 months?</summary><p>If nothing new is saved in a free app for 6 months, what was typed into it is cleared. Keep it for $9, once, and it stays.</p></details>")
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
            "<p>Delete an app and its data goes with it. An app with nothing new saved for 180 days is cleared, unless you kept it for $9. Ask us to erase everything and we do.</p>")
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
            "<li><b>Every week</b><span>See who logged and who didn't.</span></li>")
    h = sub(h, "<div><b>It nudges for you</b><span>\"Leg day, Jordan.\" On the days you pick.</span></div>",
            "<div><b>It nudges for you</b><span>\"Leg day, Jordan.\" On the days each client picks.</span></div>")
    h = gate(h, "<div><b>Get paid</b>", "payments")
    h = sub(h, '<p class="lede">Plans, reminders and the challenge they pay for. Built from what you already text them.</p>',
            '<p class="lede">Plans, reminders and the challenge they pay for. Built from what you already text them.</p>')
    return page("coaches", "Henway for coaches: your clients' workouts, reminders and January challenge in one app",
                "Turn the workouts you text clients into an app they log in. It reads screenshots, reminds them on their days, and shows who's slipping. Start from the Workout Log starter, free.",
                h, og_title="Your clients' January, in one app.")

def getpaid():
    h = common(C.GETPAID, "")
    h = gate(h, '<div class="way"><div class="n">2</div>', "copies")
    h = sub(h, "<p class=\"lede\">Sell inside it. Or sell copies of it. Henway's fee is 5%. No monthly charge.</p>",
            "<p class=\"lede\">Sell inside it<span data-gate=\"copies\">, or sell copies of it</span>. Henway's fee is 5%. No monthly charge.</p>")
    h = sub(h, "<p style=\"font-size:20px;font-weight:700;margin:10px 0 0;color:#d9cfbb\">Tasha's January challenge, 12 clients</p>",
            "<p style=\"font-size:20px;font-weight:700;margin:10px 0 0;color:#d9cfbb\">An example: a $40 January challenge, 12 clients</p>")
    h = sub(h, "<div><b>Copies of your app</b><span>5% of each sale. You set the price.</span></div>",
            "<div data-gate=\"copies\"><b>Copies of your app</b><span>You set the price, $9 or more. You keep 90% when they buy from your link, 70% from Henway's shelf.</span></div>")
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
 ("stripe-website", "Stripe", "Confirm your website.", "It's already filled in with your app's link."),
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
"""

def build():
    css = C.CSS.split("/* comp switcher */")[0] + C.CSS.split(".view{display:none}.view.on{display:block}")[1] + C.CSS2 + EXTRA_CSS
    (SITE / "v6").mkdir(exist_ok=True)
    (SITE / "v6" / "v6.css").write_text(css)
    out = {"index.html": home(), "apps.html": apps(), "pricing.html": pricing(), "method.html": method(),
           "trust.html": trust(), "which-tool.html": which(), "coaches.html": coaches(), "get-paid.html": getpaid(),
           "studio.html": studio(), "consultants.html": consult(), "dpa.html": dpa(),
           "get-paid/setup.html": setup_page()}
    for name, html in out.items():
        assert "—" not in html, f"em dash in {name}"
        bad = re.findall(r'href="#(home|apps|method|pricing|trust|which|coaches|getpaid|studio|consultants|dpa)"', html)
        assert not bad, (name, bad)
        (SITE / name).parent.mkdir(exist_ok=True)
        (SITE / name).write_text(html)
    print("wrote", ", ".join(out))

if __name__ == "__main__":
    build()
