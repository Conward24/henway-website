# Deploy Your Henway Site (Faster Than Recreating in Squarespace)

You already have a complete, good-looking site from Google AI Studio. **Don’t recreate it in Squarespace.** Deploy this project as-is and get a live URL in a few minutes.

---

## Quick answers

| Question | Answer |
|----------|--------|
| **Reliable?** | Yes. Vercel and Netlify run millions of sites, with high uptime and global CDNs. Your site is just static files + optional serverless; no server to maintain. |
| **Mobile?** | Yes. The site is built with responsive Tailwind classes (`sm:`, `md:`, flexible grids). Layout, text, and buttons adapt to phones and tablets. |
| **Domain?** | You add your domain in the host’s dashboard (Vercel or Netlify), then point your registrar’s DNS to them. No Google needed for the domain. |
| **Contact form?** | Submissions go through **Formspree** (or Netlify Forms if you use Netlify). You connect the form once; no backend or Google account required for form data. |

---

## Option 1: Vercel (recommended, free)

1. Create an account at [vercel.com](https://vercel.com) (use “Continue with GitHub” if you have GitHub).
2. **Import the project:**
   - If this folder is in a GitHub repo: click “Add New Project” → “Import” your repo.
   - If it’s only on your computer: drag the folder `henway-ai---product-creation-platform` onto the Vercel dashboard, or install the Vercel CLI and run `vercel` in this folder.
3. Vercel will detect Vite. Leave **Build Command** as `npm run build` and **Output Directory** as `dist`. Click **Deploy**.
4. In a minute or two you’ll get a URL like `https://your-project.vercel.app`.

**Optional – “Discover” AI tool:** In the project’s **Settings → Environment Variables**, add `GEMINI_API_KEY` with your Gemini API key. Redeploy. Without it, the rest of the site still works; only the Discover tool needs it.

**Custom domain:** In the project, go to **Settings → Domains** and add your domain (e.g. `henway.ai` or `www.henway.ai`). Vercel shows you exactly which DNS records to add at your registrar (e.g. GoDaddy, Namecheap, Google Domains). You’re only “linking” the domain to Vercel—no Google sign-in or extra services required for the domain itself.

---

## Option 2: Netlify (free)

1. Create an account at [netlify.com](https://netlify.com).
2. **Import the project:**
   - If this is in GitHub: “Add new site” → “Import an existing project” → connect GitHub and select the repo.
   - If it’s only local: install [Netlify CLI](https://docs.netlify.com/cli/get-started/) and run `netlify deploy --build` in this folder (or drag the folder into the Netlify “Sites” drag-and-drop area for a one-time deploy).
3. Netlify will use the `netlify.toml` in this repo: build command `npm run build`, publish folder `dist`, and SPA redirects are already set.
4. You’ll get a URL like `https://random-name.netlify.app`.

**Optional:** In **Site settings → Environment variables**, add `GEMINI_API_KEY` for the Discover tool, then trigger a new deploy.

**Custom domain:** **Domain management → Add custom domain** and follow the DNS steps. Netlify tells you what to enter at your domain registrar.

---

## Contact form: get submissions in your inbox

Right now the contact form is wired to **Formspree**. You don’t need Google or a backend.

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form. Formspree gives you an endpoint like `https://formspree.io/f/abcxyz`.
3. In this project, open `src/pages/Home.tsx` and replace `YOUR_FORM_ID` in the form `action` with your Formspree form ID (the part after `/f/`).  
   So if your endpoint is `https://formspree.io/f/mynameabc`, change the action to that URL.
4. Redeploy. Submissions will go to Formspree; you can receive them by email and/or view them in the Formspree dashboard. No code or server required.

**If you deploy on Netlify:** You can instead use **Netlify Forms** (no Formspree needed). In `Home.tsx`, change the form to add `data-netlify="true"` and a `name="contact"` attribute, and ensure each input has a `name`. Submissions will appear under **Site dashboard → Forms**. See [Netlify Forms](https://docs.netlify.com/forms/setup/) for the exact markup.

---

## Why this is better than rebuilding in Squarespace

| Approach | What you do | Result |
|----------|-------------|--------|
| **Deploy this project** | Push to GitHub (or drag folder), connect to Vercel/Netlify, add env if needed | Exact AI Studio design, same layout and styling, live in minutes |
| **Recreate in Squarespace** | Rebuild every section with blocks, then fight the theme with custom CSS | Different structure, layout/sizing never quite match, lots of tweaking |

You’re not “building from scratch” here—you’re **publishing** something that’s already built. No need to learn React or Vite; you only need to run the deploy steps above.

---

## Run it locally first (optional)

```bash
cd /Users/michaelconward/Downloads/henway-ai---product-creation-platform
npm install
npm run dev
```

Open `http://localhost:3000`. If it looks right, deploy the same code with Option 1 or 2.

---

## If you still want Squarespace later

You can use Squarespace for a **blog, shop, or contact form** and keep this as your main marketing site. Point your domain’s main address (e.g. `henway.ai`) to Vercel/Netlify and use a subdomain (e.g. `blog.henway.ai` or `shop.henway.ai`) for Squarespace.
