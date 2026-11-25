#!/usr/bin/env python3
"""Wrap a v7 body fragment in a page's own <head> + the shared v7 nav and footer.

Usage: python3 scripts/v7page.py site/<page>.html <fragment.html>

Keeps from the existing page: everything in <head> (title, meta, gate script,
PostHog, fonts) except v6 stylesheets, the <body> tag (data-gate-page), and
everything after </main> (the live-prices script, track.js). Replaces the rest.
Idempotent: run it again with a new fragment to rebuild the page.
"""
import re, sys
page, frag_path = sys.argv[1], sys.argv[2]
src = open(page).read()
frag = open(frag_path).read()

head_end = src.index('</head>')
head = src[:head_end]
head = re.sub(r'\s*<link rel="stylesheet" href="/v[67]/[^"]+">', '', head)
head += '\n<link rel="stylesheet" href="/v7/v7.css">\n'
body_tag = re.search(r'<body[^>]*>', src).group(0)
tail = src[src.index('</main>') + len('</main>'):]

# which nav item is current
path = '/' + page.split('site/', 1)[-1].replace('index.html', '').replace('.html', '')
path = path.rstrip('/') or '/'
NAV = [('/', 'Home'), ('/apps', 'Starter apps'), ('/method', 'How it works'), ('/get-paid', 'Get paid'), ('/pricing', 'Pricing')]
def links():
    out = []
    for href, label in NAV:
        cur = path == href or (href != '/' and path.startswith(href + '/'))
        gate = ' data-gate="payments"' if href == '/get-paid' else ''
        out.append(f'<a href="{href}"{gate}{" aria-current=page" if cur else ""}>{label}</a>')
    return ''.join(out)

nav = ('<header class="top"><div class="wrap"><a class="logo" href="/"><img src="/v6/img/logo-black.png" alt="Henway" width="120" height="30"></a>'
       f'<nav aria-label="Main">{links()}</nav>'
       '<a class="login" href="https://app.henwayai.com/login">Log in</a>'
       '<a class="go" href="https://app.henwayai.com/try" data-cta="nav-start">Start free</a></div>'
       f'<nav class="mnav" aria-label="Main, small screens">{links()}</nav></header>')

foot = '''<footer class="foot"><div class="wrap">
<div><img src="/v6/img/logo-black.png" alt="Henway" width="112" height="28"><p class="small" style="margin-top:10px">If you can complain to a friend, you can make an app.</p></div>
<div><b>Product</b><a href="/apps">Starter apps</a><a href="/method">How it works</a><a href="/get-paid" data-gate="payments">Get paid</a><a href="https://app.henwayai.com/shelf" data-gate="copies">Browse the shelf</a><a href="/pricing">Pricing</a><a href="/trust">Trust</a></div>
<div><b>More</b><a href="/coaches">For coaches</a><a href="/consultants">For consultants</a><a href="/studio">Studio</a><a href="/which-tool">Henway vs AI app builders</a><a href="/dpa">DPA</a></div>
<div><b>Help</b><a href="/support">Support</a><a href="https://app.henwayai.com/privacy">Privacy</a><a href="https://app.henwayai.com/terms">Terms</a><a href="https://app.henwayai.com/terms#shelf" data-gate="copies">Seller terms</a><a href="https://app.henwayai.com/privacy/delete">Delete my data</a><a href="mailto:support@henwayai.com">Contact</a></div>
<div class="legal">&copy; 2026 Henway LLC. Patent-pending technology. Product names on this site are trademarks of their owners. Henway is not affiliated with any of them and earns nothing when it recommends one.</div>
</div></footer>'''

out = f'{head}</head>\n{body_tag}\n<main>{nav}\n{frag}\n{foot}</main>{tail}'
open(page, 'w').write(out)
print('built', page, path)
