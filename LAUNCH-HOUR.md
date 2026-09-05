# Launch hour: Sep 12 2026

Two parts. Part 1 is a code change (one PR). Part 2 is what you do in the hour after it deploys. Part 0 is what needs your Google and Microsoft accounts and should be done before Sep 12.

Source: `~/gtm-advisor/research/seo-aeo-2026.md` (sections 2.4 and 4).

---

## Part 0: before Sep 12 (needs Michael's accounts)

These cannot be scripted; they need you logged in. Both survive the gate because verification is DNS-based, not page-based.

### Google Search Console

1. Go to https://search.google.com/search-console and sign in with the Google account that should own the property.
2. Add property → choose **Domain** (not URL prefix) → enter `henwayai.com`.
3. Copy the TXT record Google shows (`google-site-verification=...`).
4. Add it as a DNS TXT record on the apex (`@`) at the DNS host for henwayai.com (see `CONNECT-SQUARESPACE-DOMAIN-TO-VERCEL.md` for where DNS lives). TTL default is fine.
5. Back in Search Console click **Verify**. If it fails, wait 10 minutes for DNS and retry.
6. Sitemaps (left nav) → add `https://www.henwayai.com/sitemap.xml` → Submit. It will show "Couldn't fetch" or few pages until the gate drops; that is expected.
7. Settings → confirm "Generative AI features" (or the equivalent AI-features toggle) is ON. Do not opt out.

### Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters and sign in with a Microsoft account.
2. Choose **Import from Google Search Console** (fastest; reuses the verification above), or add `https://www.henwayai.com` manually and verify via DNS CNAME/TXT.
3. Sitemaps → submit `https://www.henwayai.com/sitemap.xml`.
4. IndexNow (left nav) → it will detect the hosted key file at `https://www.henwayai.com/f67168b961ed38543a0995a4af0b3068.txt`. Nothing to type; the key is already live.

### Vercel domain redirect (apex → www)

The apex `henwayai.com` currently answers **307** (temporary). This is a domain-level setting, not in `vercel.json`.

1. Vercel dashboard → the henway-website project → Settings → Domains.
2. On `henwayai.com` (the apex) click Edit → it is set to "Redirect to www.henwayai.com". Change the status code from 307 to **308** (permanent). Save.
3. Check: `curl -sI https://henwayai.com/ | head -1` should print `HTTP/2 308`.

---

## Part 1: the gate-removal PR

The gate is one line in each of the 8 HTML files under `site/`:

```html
<script src="/gate.js"></script>
```

It is line 5 in every file, immediately under the `<!-- Pre-launch gate ... -->` comment. Delete that `<script>` line (and the comment above it) in all 8:

```
site/index.html
site/method.html
site/examples.html
site/consultants.html
site/pricing.html
site/trust.html
site/studio.html
site/the-walk.html
```

Do not delete `site/gate.js` itself in the same PR; deleting the file while any page still references it leaves a 404 script request. Remove the file in a follow-up once the lines are gone.

Steps:

```bash
cd ~/henway-website
git checkout -b ungate
# remove the gate script line from all 8 pages
for f in site/*.html; do perl -0pi -e 's{<!-- Pre-launch gate:[^\n]*\n<script src="/gate.js"></script>\n}{}' "$f"; done
grep -c 'gate.js' site/*.html          # every line should read :0
npm run build
npx --yes serve dist -l 4397 &         # then open http://localhost:4397 and confirm the page paints with no gate
git add site && git commit -m "Open the gate"
git push -u origin ungate
gh pr create --fill --base main
```

Rehearse this once on a preview deployment before Sep 12 (Vercel builds every branch push; the preview URL carries `X-Robots-Tag: noindex` so it will not leak into search). Merge the PR to `main` at the launch minute; Vercel deploys `main` to production.

---

## Part 2: the launch hour (after the PR is live)

Confirm the deploy first:

```bash
curl -s https://www.henwayai.com/ | grep -c 'gate.js'     # must be 0
curl -sI https://www.henwayai.com/robots.txt | head -1     # 200
curl -s https://www.henwayai.com/sitemap.xml | grep -c '<loc>'   # 7
```

Then, in this order:

### 1. Request Indexing ×7 (Search Console)

URL Inspection (top search bar in Search Console) → paste each URL → wait for the inspection → **Request Indexing**. Do all seven:

```
https://www.henwayai.com/
https://www.henwayai.com/method
https://www.henwayai.com/examples
https://www.henwayai.com/consultants
https://www.henwayai.com/pricing
https://www.henwayai.com/trust
https://www.henwayai.com/studio
```

Practitioners report a soft quota of roughly 10–12 requests per property per day; seven fits.

### 2. IndexNow POST (Bing, Yandex and adopters)

```bash
curl -sS -X POST "https://api.indexnow.org/IndexNow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d '{
    "host": "www.henwayai.com",
    "key": "f67168b961ed38543a0995a4af0b3068",
    "keyLocation": "https://www.henwayai.com/f67168b961ed38543a0995a4af0b3068.txt",
    "urlList": [
      "https://www.henwayai.com/",
      "https://www.henwayai.com/method",
      "https://www.henwayai.com/examples",
      "https://www.henwayai.com/consultants",
      "https://www.henwayai.com/pricing",
      "https://www.henwayai.com/trust",
      "https://www.henwayai.com/studio"
    ]
  }' -w "\nHTTP %{http_code}\n"
```

200 or 202 = received. 403 = key file not reachable. 422 = a URL is off-host.

### 3. Resubmit the sitemap

Search Console → Sitemaps → the existing `sitemap.xml` row → resubmit (or remove and re-add). Bing Webmaster Tools → Sitemaps → resubmit the same URL.

### 4. URL Inspection → "View crawled page"

Sep 12 later in the day, and again Sep 13–19: Search Console → URL Inspection on `https://www.henwayai.com/` → **View crawled page** → Screenshot and HTML tabs. The screenshot must show the real home page, not the gate. If it shows the gate, Google indexed a pre-launch render; Request Indexing again and check the next day.

### 5. One social post with UTMs (same hour)

Discovery through links is still how Google finds a new site fastest. Post the home URL with both parameter sets so PostHog's channel classifier and the `gate.js`-era `src` convention both read it:

```
https://www.henwayai.com/?utm_source=linkedin&utm_medium=social&utm_campaign=launch-sep12&src=li
```

---

## Week one checks

- Search Console → Performance → Search results: impressions for "henway" and "ai app builder".
- Search Console → Performance → Generative AI (beta): impressions.
- Bing Webmaster Tools → AI Performance: citations in Copilot.
- PostHog → channel breakdown: Organic Search vs AI vs Social vs Direct.
