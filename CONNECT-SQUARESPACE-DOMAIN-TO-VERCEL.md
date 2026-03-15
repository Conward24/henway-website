# Connect Your Squarespace Domain to Vercel

You bought your domain through Squarespace. You can keep the domain there and just point it to Vercel so your Vercel site loads when people visit your domain.

---

## What you’re doing

- **Domain** = the address (e.g. `henway.ai`). It can stay registered with Squarespace.
- **DNS** = the “pointer” that says “when someone goes to henway.ai, send them to Vercel.”
- You’ll add a couple of DNS records in Squarespace; no need to move or transfer the domain.

---

## Step 1: Add the domain in Vercel

1. In Vercel, open your **henway-website** project.
2. Go to **Settings** → **Domains**.
3. Enter your domain (e.g. `henway.ai` or `www.henway.ai` or both).
4. Click **Add**.
5. Vercel will show you which **DNS records** to create. You’ll see something like:
   - For **apex** (e.g. `henway.ai`): an **A** record → `76.76.21.21` (or the IP Vercel shows).
   - For **www** (e.g. `www.henway.ai`): a **CNAME** record → `cname.vercel-dns.com` (or the value Vercel shows).

Write these down or keep the Vercel tab open; you’ll add them in Squarespace next.

---

## Step 2: Add the DNS records in Squarespace

1. Log in to **Squarespace** → go to **Settings** → **Domains** (or **Website** → **Domains**).
2. Click your domain (the one you’re connecting to Vercel).
3. Look for **DNS Settings**, **Advanced Settings**, or **Custom Records** (wording varies by account).
4. Add the records Vercel gave you:

   **For the root domain (e.g. henway.ai):**
   - Type: **A**
   - Host / Name: **@** (or leave blank if that’s how Squarespace does it)
   - Value / Data: **76.76.21.21** (or the IP Vercel shows)
   - TTL: leave default (e.g. 3600)

   **For www (e.g. www.henway.ai):**
   - Type: **CNAME**
   - Host / Name: **www**
   - Value / Data: **cname.vercel-dns.com** (or the hostname Vercel shows)
   - TTL: leave default

5. Save.

DNS can take a few minutes up to 48 hours to update. Vercel will show the domain as “Valid” once it’s working.

---

## Step 3: (Optional) Use Vercel’s nameservers instead

Some setups let you point the domain to Vercel by setting **nameservers** to Vercel’s. If Squarespace gives you that option and you prefer it, Vercel’s nameservers are shown under **Settings → Domains** for your domain. Only do this if you’re comfortable changing nameservers; the A + CNAME method above is usually simpler.

---

## Can you stop paying for Squarespace?

It depends what you’re paying for:

| What you pay Squarespace for | What to do |
|------------------------------|------------|
| **Domain only** (domain registration/renewal) | **Keep paying** for the domain so you keep owning it. You’re only paying for the domain, not hosting. DNS above just points that domain to Vercel. |
| **Squarespace “Website” or “Hosting” plan** | **You can cancel it** if your live site is now on Vercel and you don’t need the Squarespace site. Your domain can stay at Squarespace; only the hosting plan is cancelled. |
| **Domain + Hosting bundle** | **Cancel the hosting part** if possible, or downgrade to “domain only” so you only pay for the domain. If Squarespace doesn’t offer domain-only, you can either keep the cheapest plan just to hold the domain or **transfer the domain** to another registrar (e.g. Cloudflare, Namecheap) and then cancel Squarespace entirely. |

**Summary:** You don’t need Squarespace to *host* the site anymore—Vercel does that. You only need to *keep the domain* (so you keep owning the name). That might mean a small domain renewal fee with Squarespace, or moving the domain to another registrar and then cancelling Squarespace completely.

---

## Quick reference: info you need

- **From Vercel:** The exact A record IP and CNAME target (shown in **Settings → Domains** after you add the domain).
- **From Squarespace:** Access to **Settings → Domains → [your domain] → DNS / Advanced / Custom records** so you can add those two records.

No passwords or account links need to be “passed between” them—you’re only copying DNS values from Vercel into Squarespace.
