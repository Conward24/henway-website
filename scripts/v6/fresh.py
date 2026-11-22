"""The fresh-eyes homepage and the six starter story pages (/apps/<starter>).

Source: ~/creative-advisor/passes/henway-home-fresh-eyes-2026-11-21 (PASS.md,
template.html). The template's styles are scoped under .fx here so they sit on
top of the site's v6.css without changing any other page.

Every claim on these pages was checked against the live starter apps at
api.henwayai.com/s/<key> on 2026-11-21. Anything drawn rather than captured is
listed in GATE-LIST.md in the pass folder.
"""
import re
from pathlib import Path

PASS = Path.home() / "creative-advisor/passes/henway-home-fresh-eyes-2026-11-21"

# ---------------------------------------------------------------- the starters
# The featured shelf, in order. Ranked by expected popularity on 2026-11-21.
# Re-rank from real "Make it mine" clicks (utm_medium=starter, data-cta
# starter-<key>) once there are a few weeks of them. Order here = order on the
# home shelf. Nothing else needs to change.
FEATURED = ["workout", "potluck", "deals", "recipes", "trip", "renewals"]

# The hero example rotates with the season.
# 2026-11-21: Dish List through Thanksgiving week (Thu 11/26/2026).
# 2027-01-01: switch to "workout" (New Year). Brand Deals at tax time.
HERO = "potluck"

S = {
 "workout": dict(close="Your clients' version.", name="Workout Log", ic="WL", tag="Fitness", who="clients",
   q="My clients lose the workouts I text them.", qh='My clients lose <span class="hl">the workouts I text them.</span>',
   gone="Snap the plan. It's logged.",
   lede="The app your clients log in. You make it once. They snap your plan and the sets land in their own log.",
   for_=["Personal trainers", "Run clubs", "Gym regulars"]),
 "potluck": dict(close="Your family's version.", name="Dish List", ic="DL", tag="With family", who="family",
   q="Three people said mac and cheese.", qh='Three people said <span class="hl">mac and cheese.</span>',
   gone="Everyone sees one list. It spots what's missing.",
   lede="One live list for the whole family. It shows what's missing, and anyone can ask it for a reminder.",
   for_=["Holiday hosts", "Family dinners", "Office potlucks"]),
 "deals": dict(close="Your deals, sorted.", name="Brand Deal Tracker", ic="BD", tag="Side hustle", who="deals",
   q="I do the work, then lose track of who owes me.", qh='I do the work, then lose track of <span class="hl">who owes me.</span>',
   gone="Snap the contract. It tells you who's late.",
   lede="Every brand deal, what you owe them and what they owe you. See who's late at a glance.",
   for_=["Creators", "Influencers", "Freelancers"]),
 "recipes": dict(close="Your kitchen's version.", name="Recipe Box", ic="RB", tag="At home", who="kitchen",
   q="I save recipes and still don't know what's for dinner.", qh='I save recipes and still don\'t know <span class="hl">what\'s for dinner.</span>',
   gone="Snap Grandma's card. It's saved.",
   lede="Every recipe in one place. Snap a card and it's saved. Ask what you can make from the pantry.",
   for_=["Home cooks", "Busy parents", "Family recipe keepers"]),
 "trip": dict(close="Your crew's version.", name="Trip Plan", ic="TP", tag="Trips", who="crew",
   q="Who's bringing the cooler?", qh='Who\'s bringing <span class="hl">the cooler?</span>',
   gone="Everyone claims a job. Nothing gets forgotten.",
   lede="One page for the group trip: the days, who's in, and who's bringing what. Send the link. Nobody installs anything.",
   for_=["Group trips", "Bachelorette weekends", "Family reunions"]),
 "renewals": dict(close="Your licenses, on your calendar.", name="License Renewals", ic="LR", tag="At work", who="licenses",
   q="My license renewal sneaks up on me.", qh='My license renewal <span class="hl">sneaks up on me.</span>',
   gone="Every renewal on your calendar, 30 days early.",
   lede="Your licenses, certifications and CE hours in one place, with renewal dates on your own calendar.",
   for_=["Nurses", "Therapists", "Realtors"]),
}

# ---------------------------------------------------------------- components
def phone(key, cls="", lazy=True):
    lz = ' loading="lazy"' if lazy else ""
    return (f'<div class="phone{(" " + cls) if cls else ""}"><img src="/v6/img/phone-{key}.jpg" width="680" height="1472"{lz} '
            f'alt="{S[key]["name"]}, the starter app, open on a phone"></div>')

def thread(title, msgs):
    m = "".join(f'<div class="msg{" me" if w == "me" else ""}">{"" if w == "me" else f"<small>{w}</small>"}{t}</div>' for w, t in msgs)
    return f'<div class="thread"><p class="t">{title}</p>{m}</div>'

def card(inner, cls=""):
    return f'<div class="card{(" " + cls) if cls else ""}" style="min-height:0">{inner}</div>'

def rows(items, head=None):
    h = f'<span class="dl">{head}</span>' if head else ""
    return h + "".join(f'<div class="row{" new" if n else ""}"><span>{a}</span><b>{b}</b></div>' for a, b, n in items)

def ai(title, body, pills):
    p = "".join(f'<span class="pill{" k" if i == 0 else ""}"{g}>{t}</span>' for i, (t, g) in enumerate(pills))
    return card(f'<p class="ai">&#10022; {title}</p>{body}<div class="pills">{p}</div>')

def mail(frm, to, sub, body):
    return card(f'<div class="hdr"><b>{frm}</b> to {to}</div><p class="sub">{sub}</p><p>{body}</p>', "mail")

def ask(said, done):
    return (f'<div class="vis fstack" style="max-width:440px"><div class="ask"><span>{said}</span><i>&uarr;</i></div>'
            + card(f'<div class="done"><p style="margin:0"><b>Done.</b> {done}</p><span class="undo">Undo</span></div>') + '</div>')

def complain(key, said, ready):
    return (f'<div class="vis"><div class="bubble flat">{said}</div>'
            f'<div class="tile"><div class="ic">{S[key]["ic"]}</div><div><b>{S[key]["name"]}</b><span>{ready}</span></div></div></div>')

def pay(app, label, ok_text):
    """A Pay button drawn in the app's style, before and after Stripe confirms."""
    return card(f'<span class="dl">{app}</span><div class="paybtns"><span class="paybtn">{label}</span>'
                f'<span class="payarrow" aria-hidden="true">&rarr;</span><span class="paybtn paid">Paid &#10003;</span></div>'
                f'<p class="paynote">{ok_text}</p>', "paycard")

NUDGE = ' data-gate="nudges"'
NO_NUDGE = ' data-ungate="nudges"'

# ---------------------------------------------------------------- story chapters
# (label, headline html, line, visual html, gate)  gate: "", "payments", or "-payments" (shown only while payments is off)
def chapters(key):
    if key == "potluck":
        return [
         ("Before", '47 messages. <span class="hl">No plan.</span>', "Thanksgiving week, in the family chat.",
          '<div class="vis">' + thread("Family &#127810; &middot; Monday", [("Jenna", "I'll bring mac and cheese!"), ("Tyler", "Mac and cheese from me too"),
            ("Aunt Debbie", "Wait is anyone doing dessert? I can make mac and cheese"), ("me", "How many people are coming??"), ("Tyler", "who's getting ice")]) + "</div>", ""),
         ("Monday", 'Complain once. <span class="hl">Get the app.</span>', "No forms. Say it the way you'd say it to your sister.",
          complain(key, "Every year three people bring mac and cheese and nobody brings ice.", "Ready to send to the family"), ""),
         ("Monday night", 'One link. <span class="hl">Everyone adds a dish.</span>', "They open it in their browser. Nothing to download. Each person says OK before their dish is shared.",
          '<div class="vis">' + card(rows([("Jenna", "Mac and cheese", 0), ("Tyler", "Mac and cheese", 0), ("Aunt Debbie", "Pumpkin pie", 0), ("Marcus", "Green beans", 1)], "Dish list")
            + '<div class="row"><em>18 coming &middot; 9 dishes</em><em>live</em></div>') + "</div>", ""),
         ("Wednesday", 'It spots <span class="hl">what\'s missing.</span>', "One tap asks. You decide what to do with it.",
          '<div class="vis">' + ai("What's still missing?", "<p>Three mac and cheese. Nobody has ice, cups or rolls.</p><p>One dessert for 18 people.</p>",
            [("Ask Tyler to switch", NUDGE), ("Add to my list", NO_NUDGE), ("Dismiss", "")]) + "</div>", ""),
         ("Thursday, 8 am", 'It reminds <span class="hl">whoever asks.</span>', "Tyler asked for a reminder. It lands in his inbox, not your texts.",
          '<div class="vis">' + mail("Dish List", "Tyler", "Your reminder", "Bring ice and cups. Dinner is at 2.") + "</div>", ""),
         ("December", 'Same people. <span class="hl">Next dinner.</span>', "Ask it to change. Undo is one tap.",
          ask("Add Christmas Eve, same family", "Christmas Eve is ready. 18 people kept."), ""),
        ]
    if key == "workout":
        return [
         ("Before", 'A text they <span class="hl">can\'t find.</span>', "Tasha, an example coach, sends Monday's plan as a long text. By Monday it's buried.",
          '<div class="vis">' + thread("Tasha's clients &middot; Sunday", [("me", "Monday: back squat 4x8 @135, RDL 3x10 @95, walking lunges 3x12, leg press 3x10 @180, plank 3x45s"),
            ("Jordan", "wait which one was Monday"), ("Sam", "can you resend the leg one?"), ("Priya", "I wrote it on my hand lol")]) + "</div>", ""),
         ("Monday", 'Complain once. <span class="hl">Get their app.</span>', "She makes it once, the way she'd say it to another coach. Her clients are the ones who use it.",
          complain(key, "My clients lose the workouts I text them.", "Ready for 12 clients"), ""),
         ("Tuesday", 'Snap the plan. <span class="hl">It\'s logged.</span>', "A client snaps the screenshot in their own log. They check the sets before they're saved.",
          '<div class="vis">' + ai("Suggested by AI", rows([("Back squat", "4 &times; 8 &middot; 135", 0), ("Romanian deadlift", "3 &times; 10 &middot; 95", 0),
            ("Walking lunges", "3 &times; 12", 0), ("Leg press", "3 &times; 10 &middot; 180", 0), ("Plank", "3 &times; 45 sec", 0)]), [("Check these sets", ""), ("Dismiss", "")]) + "</div>", ""),
         ("Friday", 'It spots <span class="hl">the skipped day.</span>', "A client taps once to ask what's missing this week.",
          '<div class="vis">' + ai("Ask what is missing this week", "<p>Upper body Monday, lower body Wednesday. Nothing logged since then.</p><p>If you trained since, send the screenshot.</p>",
            [("Dismiss", "")]) + "</div>", ""),
         ("Week 2", 'It reminds <span class="hl">each client.</span>', "Each client picks their own days and time. Tasha doesn't send a thing.",
          '<div class="vis">' + mail("Workout Log", "Jordan", "Leg day", "Monday's plan is in your log. Check off your sets as you go.") + "</div>", ""),
         ("January", 'Her challenge, <span class="hl">paid in the app.</span>', "Clients pay inside their log. The money goes to her own Stripe.",
          '<div class="vis">' + pay("January Challenge", "Pay $40 for January challenge", "12 clients paid. Henway keeps 5%.") + "</div>", "payments"),
         ("January", 'Same clients. <span class="hl">Next block.</span>', "Ask it to change. Undo is one tap.",
          ask("Add a week 5 deload", "Week 5 is in every client's log."), "-payments"),
        ]
    if key == "deals":
        return [
         ("Before", 'Paid? <span class="hl">Nobody knows.</span>', "Three brands, three threads, one invoice nobody answered.",
          '<div class="vis">' + thread("Brightside Coffee &middot; Inbox", [("Sam at Brightside", "Loved the reel!! Invoice received, it's processing"),
            ("me", "Following up on the October invoice"), ("me", "Hi again, checking on the $1,800"), ("Sam at Brightside", "Looping in finance &#128591;")]) + "</div>", ""),
         ("Monday", 'Complain once. <span class="hl">Get the app.</span>', "No spreadsheet. Say it the way you'd say it to a friend.",
          complain(key, "I do the work, then lose track of who owes me.", "Ready for your deals"), ""),
         ("Tuesday", 'Snap the contract. <span class="hl">It\'s filled in.</span>', "You check every field before it's saved.",
          '<div class="vis">' + ai("Suggested by AI", rows([("Brand", "Glow Co.", 0), ("Fee", "$1,200", 0), ("Deliverables", "1 Reel + 3 Stories", 0), ("Post by", "Dec 5", 0), ("Paid", "Net 30 after posting", 0)]),
            [("Put these in the form", ""), ("Dismiss", "")]) + "</div>", ""),
         ("Friday", 'It tells you <span class="hl">who\'s late.</span>', "One tap: what's overdue or due this week.",
          '<div class="vis">' + ai("What's overdue or due this week?", "<p><b>Overdue:</b> Brightside Coffee, $1,800, 20 days late.</p><p><b>Due this week:</b> Trailpeak Outdoors, $3,200.</p><p><b>Still to invoice:</b> Northbay Meal Kits, $1,250.</p>",
            [("Keep", ""), ("Dismiss", "")]) + "</div>", ""),
         ("Week 2", 'The chase email, <span class="hl">already written.</span>', "Draft a reminder opens your own email with the message written. You hit send.",
          '<div class="vis">' + mail("You", "Brightside Coffee", "The October reel invoice", "Hi Sam, a quick note that the $1,800 invoice is now 20 days past due. Could you send me a payment date?") + "</div>", ""),
         ("Month 1", 'Next deal. <span class="hl">Same app.</span>', "Ask it to change. Undo is one tap.",
          ask("Add a column for usage rights", "Every deal has a usage rights line now."), ""),
        ]
    if key == "recipes":
        return [
         ("Before", 'Recipes everywhere. <span class="hl">Dinner nowhere.</span>', "Screenshots, a blue box of cards, and a family chat.",
          '<div class="vis">' + thread("Mom &middot; Sunday", [("Mom", "Here's Grandma's cornbread, I took a picture of the card"),
            ("me", "which card was the chicken one"), ("Mom", "The one in the blue box. Or was it a screenshot?"), ("me", "ok what's for dinner")]) + "</div>", ""),
         ("Monday", 'Complain once. <span class="hl">Get the app.</span>', "Say it the way you'd say it in the kitchen.",
          complain(key, "I save recipes and still don't know what's for dinner.", "Ready for your recipes"), ""),
         ("Tuesday", 'Snap the card. <span class="hl">It\'s saved.</span>', "It reads the photo. You check it before it's saved.",
          '<div class="vis">' + ai("Suggested by AI", rows([("Title", "Grandma's Cornbread", 0), ("Tags", "family, side dish, baking", 0), ("Ingredients", "7", 0), ("Steps", "4", 0)]),
            [("Check and edit it", ""), ("Dismiss", "")]) + "</div>", ""),
         ("Thursday", 'What can I <span class="hl">make tonight?</span>', "It compares your pantry with your saved recipes.",
          '<div class="vis">' + ai("What can I make with my pantry?", "<p>The closest is Weeknight lemon garlic chicken. You'd still need lemon and dried oregano.</p>",
            [("Keep this note", ""), ("Dismiss", "")]) + "</div>", ""),
         ("Sunday, 4 pm", 'It reminds you <span class="hl">to plan.</span>', "You pick the day and time. It emails you your own note.",
          '<div class="vis">' + mail("Recipe Box", "you", "Your reminder", "Pick three dinners for the week.") + "</div>", ""),
         ("Month 1", 'Your box, <span class="hl">your way.</span>', "Ask it to change. Undo is one tap.",
          ask("Add a holiday tag", "Every recipe can be tagged holiday now."), ""),
        ]
    if key == "trip":
        return [
         ("Before", 'Four chats. <span class="hl">No cooler.</span>', "The group trip, planned across every app at once.",
          '<div class="vis">' + thread("Tahoe!! &#127956; &middot; Tuesday", [("Maya", "wait are we doing Friday or Saturday"), ("Dev", "I can drive 4"),
            ("Chris", "who's bringing the cooler"), ("me", "I made a doc"), ("Maya", "what doc")]) + "</div>", ""),
         ("Monday", 'Complain once. <span class="hl">Get the app.</span>', "Say it the way you'd say it to the group.",
          complain(key, "Who's bringing the cooler?", "Lake Tahoe, CA &middot; 4 people"), ""),
         ("Monday night", 'One link. <span class="hl">Everyone claims a job.</span>', "Friends open it from the link. Nothing to install. Each person says OK before what they add is shared.",
          '<div class="vis">' + card(rows([("Chris", "Cooler and ice", 0), ("Dev", "Driving, 4 seats", 0), ("Maya", "Speaker", 0), ("Priya", "S'mores", 1)], "Who's bringing it")) + "</div>", ""),
         ("Wednesday", 'What are <span class="hl">we forgetting?</span>', "One tap checks the plan.",
          '<div class="vis">' + ai("What are we forgetting?", "<p>Life jackets. Paddleboards. Trash bags.</p>", [("Add to the list", ""), ("Dismiss", "")]) + "</div>", ""),
         ("Friday, 7 am", 'It reminds <span class="hl">whoever asks.</span>', "Chris asked for a reminder. It lands in his inbox.",
          '<div class="vis">' + mail("Trip Plan", "Chris", "Your reminder", "Cooler and ice. Leaving at 9.") + "</div>", ""),
         ("Next trip", 'Same crew. <span class="hl">Next trip.</span>', "Ask it to change. Undo is one tap.",
          ask("Add a ski weekend in February", "February is ready. 4 people kept."), ""),
        ]
    if key == "renewals":
        return [
         ("Before", 'The renewal you <span class="hl">almost missed.</span>', "One email, two weeks out, with CE hours still to go.",
          '<div class="vis">' + mail("Board of Nursing", "you", "Your license expires in 14 days", "Renew online before the expiration date to keep practicing.") + "</div>", ""),
         ("Monday", 'Complain once. <span class="hl">Get the app.</span>', "Say it the way you'd say it at the nurses' station.",
          complain(key, "My license renewal sneaks up on me.", "Ready for your licenses"), ""),
         ("Tuesday", 'Every license, <span class="hl">one screen.</span>', "Each license, its board, its date, and the CE hours logged against it.",
          '<div class="vis">' + card(rows([("RN license", "Renews 09/07/2027", 0), ("BLS", "Renews 01/15/2027", 0), ("CE hours", "4 of 24", 0)], "Licenses")) + "</div>", ""),
         ("Wednesday", 'Dates on <span class="hl">your calendar.</span>', "One tap adds every renewal date. Your calendar reminds you 30 days before each one.",
          '<div class="vis">' + card('<p class="ai">Renewing within 90 days: 1</p><div class="pills"><span class="pill k">Add renewal dates to my calendar</span></div>'
            '<div class="row" style="margin-top:12px"><span>Aug 8, 2027</span><b>Renew RN license in 30 days</b></div>') + "</div>", ""),
         ("Friday", 'It tells you <span class="hl">what\'s missing.</span>', "One tap checks your hours against each license.",
          '<div class="vis">' + ai("Ask what is missing", "<p>RN: 20 CE hours still needed before 09/07/2027.</p><p>BLS has no CE hours listed. If it needs them, add them here.</p>",
            [("Add as a note", ""), ("Dismiss", "")]) + "</div>", ""),
         ("Next year", 'New license. <span class="hl">Same app.</span>', "Ask it to change. Undo is one tap.",
          ask("Add my real estate license", "Real estate is on the list, with its CE hours."), ""),
        ]
    raise KeyError(key)

# The script table: each beat = one shot + one spoken line. Kept out of the public build.
SCRIPTS = {
 "potluck": [("Before", "The family thread scrolling", "Every year. Three mac and cheese, no ice."),
             ("Monday", "Phone: say it to Henway, Dish List hatches", "So I complained to Henway instead."),
             ("Monday night", "Link dropped in the chat, names appearing", "One link. Everybody adds their dish."),
             ("Wednesday", "Tap What's still missing?", "It caught the third mac and cheese before I did."),
             ("Thursday", "Tyler's inbox, the reminder he asked for", "I didn't text anybody."),
             ("Close", "Make it mine", "Free to start. Nine bucks to keep it.")],
 "workout": [("Before", "Coach Tasha's long text, clients asking again (Tasha is an example coach)", "Every Monday, the same three texts."),
             ("Monday", "Say it to Henway, Workout Log hatches", "So she complained to Henway."),
             ("Tuesday", "Client snaps the plan, sets appear, Check these sets", "A screenshot goes in. Sets come out."),
             ("Friday", "Tap Ask what is missing this week", "It noticed the skipped day."),
             ("Week 2", "Jordan's inbox: Leg day", "She didn't send a thing."),
             ("Close", "Make it mine", "Free to start. Nine bucks to keep it.")],
 "deals": [("Before", "The Brightside thread, three follow-ups", "I did the reel in October. Still waiting."),
           ("Monday", "Say it to Henway, Brand Deal Tracker hatches", "So I complained to Henway."),
           ("Tuesday", "Snap the contract, fields fill in, Put these in the form", "Snap it. Check it. Done."),
           ("Friday", "Tap What's overdue or due this week?", "Twenty days late. Now I know."),
           ("Week 2", "Draft a reminder opens my email, I hit send", "The chase email was already written."),
           ("Close", "Make it mine", "Free to start. Nine bucks to keep it.")],
 "recipes": [("Before", "Mom's photo of the card, the blue box", "Recipes everywhere. Dinner nowhere."),
             ("Monday", "Say it to Henway, Recipe Box hatches", "So I complained to Henway."),
             ("Tuesday", "Snap Grandma's card, Check and edit it", "Grandma's cornbread, saved."),
             ("Thursday", "Tap What can I make with my pantry?", "It told me what to buy. Two things."),
             ("Sunday", "My inbox: pick three dinners", "It reminds me to plan."),
             ("Close", "Make it mine", "Free to start. Nine bucks to keep it.")],
 "trip": [("Before", "The group chat, four plans at once", "Who's bringing the cooler?"),
          ("Monday", "Say it to Henway, Trip Plan hatches", "So I complained to Henway."),
          ("Monday night", "Link in the chat, names claiming jobs", "One link. Everyone claims a job."),
          ("Wednesday", "Tap What are we forgetting?", "Life jackets. We'd have forgotten."),
          ("Friday", "Chris's inbox, the reminder he asked for", "I didn't text anybody."),
          ("Close", "Make it mine", "Free to start. Nine bucks to keep it.")],
 "renewals": [("Before", "The board's email: 14 days", "Two weeks out, six hours short."),
              ("Monday", "Say it to Henway, License Renewals hatches", "So I complained to Henway."),
              ("Tuesday", "Every license on one screen", "Every date in one place."),
              ("Wednesday", "Tap Add renewal dates to my calendar", "My calendar warns me a month out."),
              ("Friday", "Tap Ask what is missing", "Twenty hours to go. Now I know."),
              ("Close", "Make it mine", "Free to start. Nine bucks to keep it.")],
}

# ---------------------------------------------------------------- pages
def shelf(mine):
    out = []
    for k in FEATURED:
        s = S[k]
        out.append(f'''<article class="st"><span class="tag">{s["tag"]}</span><p class="q">{s["q"]}</p>
 <div class="shot"><div class="phone"><picture><source media="(max-width:640px)" srcset="/v6/img/live-{k}.jpg" width="680" height="840"><img src="/v6/img/phone-{k}.jpg" width="680" height="1472" loading="lazy" alt="{s["name"]}, the starter app, open on a phone"></picture></div></div>
 <p class="gone">{s["gone"]}</p>
 <div class="acts"><a class="btn go sm" href="{mine(k)}" data-cta="starter-{k}">Get this app</a><a class="more2" href="/apps/{k}">See how it works</a></div></article>''')
    return "\n".join(out)

HERO_COPY = {
 "potluck": dict(said="Every year three people bring mac and cheese and nobody brings ice.", sent='Sent to the family chat &middot; <span>18 coming</span>'),
 "workout": dict(said="My clients lose the workouts I text them.", sent='Sent to 12 clients &middot; <span>logging today</span>'),
}

def home_body(mine):
    hc = HERO_COPY[HERO]
    return f'''<div class="fx">
<section class="hero"><div class="wrap">
 <div>
  <h1 class="hh h1">If you can complain to a friend, you can <span class="hl">make an app.</span></h1>
  <p class="lede">Say what's bugging you. Henway hands back a working app on your phone, ready to share by link.</p>
  <div class="cta"><a class="btn go" href="https://app.henwayai.com/try?utm_source=site&amp;utm_medium=home&amp;utm_campaign=hero" data-cta="start">Start free</a><small>Your first app is free.</small></div>
 </div>
 <div class="stage">
  <div class="bubble"><span class="who">You said</span>{hc["said"]}<span class="arrow" aria-hidden="true">&rarr;</span></div>
  <div class="pw">
   <img class="chick" src="/v6/img/chick-hatch.png" width="250" height="360" alt="">
   {phone(HERO, lazy=False)}
   <div class="sent">{hc["sent"]}</div>
  </div>
 </div>
</div></section>

<section class="band"><div class="wrap">
 <div class="center">
  <span class="kick">Then you close it</span>
  <h2 class="hh h2">It keeps working <span class="hl">without you.</span></h2>
  <p class="lede" style="max-width:34ch">A chat answers you. An app works for everyone you send it to.</p>
 </div>
 <div class="beats">
  <div class="beat">
   <p class="when">Tuesday, 7:02 pm</p>
   <div class="card"><span class="dl">Dish list</span>
    <div class="row"><span>Jenna</span><b>Mac and cheese</b></div>
    <div class="row"><span>Tyler</span><b>Mac and cheese</b></div>
    <div class="row new"><span>Aunt Debbie</span><b>Pumpkin pie</b></div>
   </div>
   <h3>Your family fills it in from their phones.</h3>
  </div>
  <div class="beat">
   <p class="when">Wednesday, 9:15 am</p>
   <div class="card"><p class="ai">&#10022; What's still missing?</p>
    <p><b>Three</b> mac and cheese. <b>No one</b> has ice or cups yet.</p>
    <div class="pills"><span class="pill k"{NUDGE}>Ask Tyler to switch</span><span class="pill k"{NO_NUDGE}>Add to my list</span><span class="pill">Dismiss</span></div>
   </div>
   <h3>It spots what's missing before you do.</h3>
  </div>
  <div class="beat">
   <p class="when">Thursday, 8:00 am</p>
   <div class="card mail"><div class="hdr"><b>Dish List</b> to Tyler</div>
    <p class="sub">Your reminder</p>
    <p>Bring ice and cups. Dinner is at 2.</p>
   </div>
   <h3>Anyone can ask for a reminder, so you don't text twelve people.</h3>
  </div>
 </div>
</div></section>

<section class="complaints"><div class="wrap">
 <div class="center">
  <span class="kick">Starter apps</span>
  <h2 class="hh h2">Complaints in. <span class="hl">Apps out.</span></h2>
  <p class="lede" style="max-width:36ch">Each one started as somebody's complaint. Get it as is, or make it yours.</p>
 </div>
 <div class="shelf">{shelf(mine)}</div>
 <p class="more">Something else bugging you? <a href="https://app.henwayai.com/try?utm_source=site&amp;utm_medium=home&amp;utm_campaign=find-own" data-cta="start">Say it your way &rarr;</a></p>
</div></section>

<section class="grow band"><div class="wrap">
 <div><span class="kick">Next week</span><h2 class="hh h2">Need more? <span class="hl">Just ask it.</span></h2><p class="lede">Tell your app what to change. It changes. Undo is one tap.</p></div>
 <div class="fstack">
  <div class="ask"><span>Add a spot for allergies</span><i>&uarr;</i></div>
  <div class="card" style="min-height:0"><div class="done"><p style="margin:0"><b>Done.</b> Every dish has an allergy note now.</p><span class="undo">Undo</span></div></div>
  <div class="card" style="min-height:0"><p class="ai">&#10022; Ideas for your app</p><p>Show how many dishes each course has?</p><div class="pills"><span class="pill k">Show me</span><span class="pill">Not now</span></div></div>
 </div>
</div></section>

<section class="sell" data-gate="payments copies"><div class="wrap">
 <div class="center">
  <span class="kick">Get paid</span>
  <h2 class="hh h2">Make it. <span class="hl">Then sell it.</span></h2>
  <p class="lede" style="max-width:38ch">Take payments right in your app, or sell copies of it. No chasing Venmo, no invoices.</p>
 </div>
 <div class="ways">
  <div class="way2">
   <span class="n">1</span><h3>Get paid inside your app.</h3>
   <div class="shotw">{pay("January Challenge", "Pay $40 for January challenge", "12 clients paid this week.")}</div>
   <p>The money goes to your own Stripe. Henway keeps <span data-live="fee">5%</span>.</p>
  </div>
  <div class="way2">
   <span class="n">2</span><h3>Sell copies of your app.</h3>
   <div class="shotw cap"><img src="/v6/img/sell-copy.jpg" width="716" height="1149" loading="lazy" alt="A sell page: a preview of the Potluck Sign-Up app, and a button that reads Get your own copy, $19"></div>
   <p>The buyer gets their own copy with none of your data. Henway keeps 10% from your link.</p>
  </div>
 </div>
 <p class="more"><a href="/get-paid">How getting paid works &rarr;</a></p>
</div></section>

<section class="fprice"><div class="wrap">
 <span class="kick">Price</span>
 <h2 class="hh h2">Pay once. <span class="hl">Keep it.</span></h2>
 <div class="big">
  <div><strong>Free</strong><span>your first app</span></div>
  <div class="nine"><strong data-live="keep">$9</strong><span>to keep any app, once</span></div>
 </div>
 <p class="small">No monthly bill. Want a hand? <a href="/studio">Book an hour with Michael, <span data-live="studio">$150</span>.</a></p>
</div></section>

<section class="trust band"><div class="wrap">
 <div><span class="kick">Trust</span><h2 class="hh h2">It asks before <span class="hl">AI sees anything.</span></h2><p class="lede">What you type stays on your phone unless you share a list. <a href="/trust">How it works</a></p></div>
 <div class="fconsent"><h4>Let AI read this photo?</h4><p>Only this photo, only to fill in the recipe. You check it before it's saved.</p><div class="pills" style="margin:0"><span class="pill k">Read it</span><span class="pill">Not now</span></div></div>
</div></section>

<section class="close"><div class="wrap">
 <img class="chk" src="/v6/img/chick-hatch.png" width="250" height="360" alt="" loading="lazy">
 <h2 class="hh h2">What's bugging you?</h2>
 <form class="fsay" action="https://app.henwayai.com/try" method="get" data-cta="close-form"><input name="card" aria-label="What's bugging you" placeholder="Say it like you'd tell a friend" maxlength="300"><input type="hidden" name="utm_source" value="site"><input type="hidden" name="utm_medium" value="home"><input type="hidden" name="utm_campaign" value="close"><button class="btn go" type="submit">Start free</button></form>
 <p class="free">Your first app is free. It asks before AI sees anything.</p>
</div></section>
</div>'''

def story_body(key, mine):
    s = S[key]
    get = mine(key)
    chs = []
    for i, (lab, h2, line, vis, g) in enumerate(chapters(key)):
        ga = ' data-gate="payments"' if g == "payments" else (' data-ungate="payments"' if g == "-payments" else "")
        flip = " flip" if i % 2 else ""
        top = ' style="border-top:0"' if i == 0 else ""
        chs.append(f'<div class="ch{flip}"{top}{ga}><div><span class="day">{lab}</span><h2 class="hh h2">{h2}</h2><p class="lede">{line}</p></div>{vis}</div>')
    eg = '<p class="eg2">Tasha is an example coach, not a real customer.</p>' if key == "workout" else ""
    chips = "".join(f"<span>{c}</span>" for c in s["for_"])
    return f'''<div class="fx story">
<div class="buybar" id="buybar"><div class="wrap"><span class="bn"><b>{s["name"]}</b><span>Free to try &middot; <span data-live="keep">$9</span> to keep, once</span></span><a class="btn go sm" href="{get}" data-cta="starter-{key}-bar">Get this app</a></div></div>
<section class="shero"><div class="wrap">
 <div>
  <p class="crumb"><a href="/apps">Starter apps</a> / {s["name"]}</p>
  <h1 class="hh q">&ldquo;{s["qh"]}&rdquo;</h1>
  <p class="lede">{s["lede"]}</p>
  <div class="cta"><a class="btn go" href="{get}" data-cta="starter-{key}">Get this app</a><small>Free to try. It uses your free first app. <span data-live="keep">$9</span> to keep it, once.</small></div>
  <p class="for"><b>For</b> {chips}</p>
  <a class="jump" href="#week">See a week with it &darr;</a>
 </div>
 <div class="stage" style="justify-content:center;padding-top:40px"><div class="pw"><img class="chick" src="/v6/img/chick-hatch.png" width="250" height="360" alt="">{phone(key, lazy=False)}</div></div>
</div></section>

<section id="week" style="padding-top:0"><div class="wrap">
{eg}
{"".join(chs)}
</div></section>

<section class="close"><div class="wrap">
 <img class="chk" src="/v6/img/chick-hatch.png" width="250" height="360" alt="" loading="lazy">
 <h2 class="hh h2">{s["close"]}</h2>
 <div class="cta" style="justify-content:center"><a class="btn go" href="{get}" data-cta="starter-{key}-close">Get this app</a></div>
 <p class="free">Free to try. <span data-live="keep">$9</span> to keep it, once. Change anything by asking.</p>
</div></section>
</div>'''

BUYBAR_JS = """<script>
(function(){var bb=document.getElementById('buybar'),hc=document.querySelector('.shero .cta');
if(bb&&hc&&'IntersectionObserver' in window){new IntersectionObserver(function(e){bb.classList.toggle('show',!e[0].isIntersecting&&e[0].boundingClientRect.top<0)}).observe(hc)}})();
</script>"""

# ---------------------------------------------------------------- styles
def scoped_css():
    """The template's styles, minus the mockup-only and site-chrome rules, scoped under .fx."""
    t = (PASS / "template.html").read_text()
    css = re.search(r"<style>(.*?)</style>", t, re.S).group(1)
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    drop = re.compile(r"^(@font-face|:root|\*|html|body|img|a|\.wrap|\.page|\.rv|\.top|\.foot|\.notes|#p-dish-list)\b")
    out = []
    def scope(sel_block):
        sels, body = sel_block.split("{", 1)
        sl = [x.strip() for x in sels.split(",")]
        if all(drop.match(x) for x in sl):
            return ""
        sl = [x for x in sl if not drop.match(x)]
        return ",".join(".fx " + x for x in sl) + "{" + body
    i = 0
    while i < len(css):
        j = css.find("{", i)
        if j < 0:
            break
        head = css[i:j].strip()
        if head.startswith("@media"):
            depth, k = 1, j + 1
            while depth:
                if css[k] == "{": depth += 1
                elif css[k] == "}": depth -= 1
                k += 1
            inner = css[j + 1:k - 1]
            rules = [r.strip() + "}" for r in inner.split("}") if r.strip()]
            sc = "".join(scope(r) for r in rules)
            if sc:
                out.append(head + "{" + sc + "}")
            i = k
        else:
            k = css.find("}", j)
            out.append(scope(css[i:k + 1].strip()))
            i = k + 1
    vars_ = re.search(r":root\{(.*?)\}", css, re.S).group(1)
    css = "\n".join(o for o in out if o)
    # v6.css already owns these class names; the fresh ones get their own
    for old, new in ((".stack", ".fstack"), (".price", ".fprice"), (".say", ".fsay"), (".consent", ".fconsent")):
        css = re.sub(re.escape(".fx " + old) + r"(?![\w-])", ".fx " + new, css)
        css = re.sub(r"(?<=[ ,{])" + re.escape(old) + r"(?![\w-])", new, css)
    return ".fx{" + vars_ + "}\n" + css + EXTRA

EXTRA = """
.fx p.free{font-weight:500;font-stretch:100%;line-height:1.5;letter-spacing:normal}
.fx .more a{border:0;background:none;padding:0 4px;font-size:18px;text-decoration:underline;text-underline-offset:3px}
.fx .card:before{display:none}
.fx .st img{aspect-ratio:auto;max-width:100%;margin:0;border:0;object-fit:fill}
.fx .dl{background:#b5361f}
.fx .bubble.flat{position:static;transform:rotate(-1.5deg);max-width:none}
.fx .eg2{margin:8px 0 0;font-size:15px;font-weight:700;color:var(--muted)}
.fx .crumb a,.fx .jump,.fx .st .acts a.more2,.fx .more a{display:inline-flex;align-items:center;min-height:44px}
.fx .story .foot{padding-bottom:56px}
.fx .paybtns{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin:6px 0 4px}
.fx .paybtn{display:inline-flex;align-items:center;min-height:44px;padding:0 16px;border-radius:12px;border:2px solid var(--ink);background:#fff;font-weight:800;font-size:16px}
.fx .paybtn.paid{background:#1d1810;color:#fff}
.fx .payarrow{font-weight:900;color:var(--gold);font-size:22px}
.fx .paynote{margin:8px 0 0;font-size:15px;color:var(--muted)}
.fx .ways{display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:48px}
.fx .way2{background:#fff;border:2px solid var(--ink);border-radius:24px;padding:24px;box-shadow:6px 6px 0 var(--ink);display:flex;flex-direction:column;gap:14px}
.fx .way2 .n{display:inline-flex;width:36px;height:36px;border-radius:50%;background:var(--yellow);font-weight:900;align-items:center;justify-content:center}
.fx .way2 h3{font-size:clamp(24px,2.4vw,30px);font-weight:850;letter-spacing:-.025em;line-height:1.05;margin:0}
.fx .way2 p{margin:0;font-size:17px;color:var(--muted)}
.fx .way2 .shotw{background:var(--off);border-radius:18px;padding:18px}
.fx .way2 .shotw.cap{padding:0;overflow:hidden;border:1.5px solid var(--line);max-width:340px;margin-left:auto;margin-right:auto}
.fx .way2 .shotw.cap img{width:100%;height:auto}
@media(max-width:900px){.fx .ways{grid-template-columns:1fr;max-width:520px;margin-left:auto;margin-right:auto}}
@media(max-width:640px){
 .fx .way2{padding:18px}
 .fx .way2 .shotw.cap{margin:0 -18px;max-width:none;border-radius:0;border-width:1.5px 0}
 .fx .way2 .shotw{margin:0 -18px;border-radius:0;padding:14px 18px}
 .fx .pw .phone{width:min(340px,calc(100vw - 40px));transform:none}
 .fx .chick{right:-4px}
 .fx .st{display:flex;flex-direction:column;padding:16px}
 .fx .st .shot{margin:14px -16px 0;padding:0;border-radius:0;background:none}
 .fx .st .shot .phone{width:100%;padding:0;border-radius:0;background:none;box-shadow:none}
 .fx .st .shot .phone img{border-radius:0;border-top:1.5px solid var(--line);border-bottom:1.5px solid var(--line)}
 .fx .st .q{font-size:22px}
 .fx .st .acts{flex-wrap:wrap}
 .fx .buybar .btn{flex:none}
 .fx.story{padding-bottom:84px}
}
@media(max-width:380px){.fx .pw .phone{width:calc(100vw - 32px);padding:5px;border-radius:36px}.fx .pw .phone img{border-radius:31px}}
"""
