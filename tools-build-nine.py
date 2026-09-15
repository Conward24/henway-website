# The examples section as nine beats, one visible at a time.
# Every capability line is checked against capabilities.py LIMITS; every app is
# tagged only with what its code actually calls.
import re, hashlib, os

BEATS = [
 ("calendar", "Put it on your calendar",
  "Adds it to the calendar app you already use, on every device.",
  "Your own calendar does the reminding. Tap it again after a change and it updates the same entry.",
  "OpenRoutine", "founder",
  "Whoever opens up does it from memory. When it isn't me, things get missed.",
  "pK2RQTtGPjRC0uVQaxhZp5Ws", "phone"),
 ("csv", "Open it in a spreadsheet",
  "Any list opens in Numbers or Excel.",
  "It goes out that way. What you change there stays there.",
  "ScopeCheck", "consultant",
  "I finish a scoping call and the useful half is gone by the time I write it up.",
  "Vp_82h6ZGr5nVP7hfb0uEvje", "phone"),
 ("pdf", "Print it, or save a PDF",
  "Any screen turns into a document you can print or hand over.",
  "You decide when. It never sends it anywhere for you.",
  "DeckSpine", "consultant",
  "Every deck I build starts from the last client's deck, and drifts a little further each time.",
  "0PALUMzhRDIX0tjRi5VOmP2f", "phone"),
 ("link", "Send someone a link",
  "One tap opens the same share row you already use. Whoever gets it needs no account.",
  "They see it as it looked when you sent it, and cannot change it.",
  "IntakeOne", "founder",
  "New clients send me their details in five separate texts and I copy them into a note.",
  "kz0zEIJvGM_4MdCXIfLvCMoO", "phone"),
 ("mail", "Open your email, filled in",
  "It writes the message and opens your email with it ready to go.",
  "You press send. Nothing goes out on its own.",
  "QuoteSheet", "founder",
  "I'm retyping the same quote into a text message, from the truck, again.",
  "JORZHfTVAYdQJfahTmz4q6vh", "phone"),
 ("ondevice", "Stays on your device",
  "What you type stays on the phone or computer you typed it on.",
  "Save a backup file and it is yours to move or keep.",
  "TallyBoard", "founder",
  "My numbers live in a notebook, a spreadsheet, and my head.",
  "RqXu-gjpAeFIhKvQQ8-YPJAM", "phone"),
 ("speak", "Read it out loud",
  "Your device reads it in the voice it already has, and waits for each line to finish.",
  "Useful when your hands are busy. Same app as the calendar one, same screen.",
  "OpenRoutine", "founder",
  "When I'm opening up my hands are full. I can't be squinting at a checklist.",
  "pK2RQTtGPjRC0uVQaxhZp5Ws", "phone"),
 ("phone", "Tap to call",
  "Opens your phone's keypad with the number already in it.",
  "You press call. It never dials on its own, and it never sends a text.",
  "ShiftBoard", "founder",
  "I text six people every Friday asking who can cover Saturday.",
  "J0DMn6NsbOhMxSl2XXIjqCcE", "phone"),
 ("text", "Copy the words out",
  "Copies the finished wording so you can paste it into a text or an email.",
  "It goes only where you paste it.",
  "FridayLines", "consultant",
  "I write the Friday update on Friday, from memory, badly.",
  "BbI21OlTipM_8n4p9MWKT_vT", "phone"),
]
OTHER = {"calendar":"speak","csv":"pdf","pdf":"ondevice","link":"csv","mail":"pdf",
         "ondevice":"csv","speak":"calendar","phone":"link","text":"ondevice"}
SHORT = {"link":"Send someone a link","calendar":"Put it on your calendar",
         "speak":"Read it out loud","text":"Copy the words out",
         "mail":"Open your email, filled in","pdf":"Print it, or save a PDF",
         "phone":"Tap to call","csv":"Open it in a spreadsheet",
         "ondevice":"Stays on your device"}
BLURB = {b[0]: b[2] for b in BEATS}

def ver(path):
    """A content hash on the URL. These files are served immutable for a year,
    so when a beat moved to a different app and the bytes under
    <key>-desk.jpg changed, every browser that had already been to the site
    kept showing the OLD app beside the NEW label. The server was right and
    every visitor was wrong. A changed file must mean a changed URL."""
    with open(path, 'rb') as fh:
        return hashlib.md5(fh.read()).hexdigest()[:8]

WHO = {"founder": "For your own work", "consultant": "For client work"}

def tab(i, b):
    on = " on" if i == 0 else ""
    return (f'<button class="ntab{on}" role="tab" id="ntab-{b[0]}" data-n="{i}" type="button" '
            f'aria-selected="{"true" if i==0 else "false"}" aria-controls="npanel-{b[0]}">{b[1]}</button>')

def panel(i, b):
    key, label, promise, limit, app, who, quote, share, kind = b
    hid = "" if i == 0 else " hidden"
    eager = "eager" if i == 0 else "lazy"
    oth = OTHER[key]
    return f'''
      <div class="npanel" id="npanel-{key}" role="tabpanel" aria-labelledby="ntab-{key}" data-n="{i}"{hid}>
        <p class="nquote">&ldquo;{quote}&rdquo;</p>
        <div class="ntwo">
          <figure class="nshot nshot-desk"><img src="/walk-assets/nine/{key}-desk.jpg?v={ver(f'site/walk-assets/nine/{key}-desk.jpg')}" alt="{app} on a laptop, showing {label.lower()}" loading="{eager}" decoding="async" width="1400" height="790"><figcaption>On a laptop</figcaption></figure>
          <figure class="nshot nshot-phone"><img src="/walk-assets/nine/{key}-phone.jpg?v={ver(f'site/walk-assets/nine/{key}-phone.jpg')}" alt="{app} on a phone, showing {label.lower()}" loading="{eager}" decoding="async" width="600" height="1323"><figcaption>On the phone</figcaption></figure>
        </div>
        <ul class="ncaps">
          <li class="nc on"><b>{label}</b><span>{promise} {limit}</span></li>
          <li class="nc"><b>{SHORT[oth]}</b><span>{BLURB[oth]}</span></li>
        </ul>
        <p class="nfootline"><a class="nopen" href="https://api.henwayai.com/s/{share}" target="_blank" rel="noopener">Open {app} &rarr;</a><span class="nwho" data-who="{who}">{WHO[who]}</span><span class="nnum">{i+1:02d} <i>/ 9</i></span></p>
      </div>'''

SECTION = f'''
  <div class="wrap">
    <span class="eyebrow">What your device already does</span>
    <h2 style="margin:6px 0 12px;max-width:22ch;text-wrap:balance">Nine things your device already does. Somebody is <em>charging you</em> for most of them.</h2>
    <p class="lede" style="max-width:56ch">Eight real apps, each built in about seven minutes. Pick any one of the nine and see it in the app that uses it.</p>

    <div class="ntabs" role="tablist" aria-label="What your device already does">{''.join(tab(i,b) for i,b in enumerate(BEATS))}</div>
    <div class="npanels">{''.join(panel(i,b) for i,b in enumerate(BEATS))}</div>
    <div class="nfoot">
      <button class="nstep" id="nprev" type="button" aria-label="Previous">&larr;</button>
      <button class="nstep" id="nnext" type="button">Next &rarr;</button>
    </div>
  </div>'''

p = 'site/index.html'; s = open(p).read()
m = re.search(r'(<section class="sec" id="examples"[^>]*>)(.*?)(</section>)', s, re.S)
s = s[:m.start(2)] + SECTION + s[m.end(2):]
open(p, 'w').write(s)
print("beats:", s.count('role="tabpanel"'), "| tabs:", s.count('role="tab"')-1, "| images:", s.count('/walk-assets/nine/'))
