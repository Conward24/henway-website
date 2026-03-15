# Fix images so they always load

Images were pointing at GitHub URLs, which can be slow or blocked. The site now expects images from **your project**, so Vercel serves them from your domain.

---

## What to do

1. **Open the folder**  
   `henway-ai---product-creation-platform/public/images/`

2. **Add these 4 files** (with these exact names):

   | Save as            | Source |
   |--------------------|--------|
   | `logo-black.png`   | Your Henway logo (black, transparent). From [flask-chatbot](https://github.com/Conward24/flask-chatbot) or your files. |
   | `egg-icon.png`     | The egg icon (process cards). Same repo or your files. |
   | `egg-circuit.png`  | Egg/circuit graphic (contact section). Can be the same as egg icon if you only have one. |
   | `mike.jpg`         | Photo for the “Meet Mike” section. Use your real image (JPG or PNG; if PNG, name it `mike.png` and we can update the code). |

3. **Get the files from GitHub (if you want):**
   - Go to https://github.com/Conward24/flask-chatbot
   - Open the image file → **Right‑click “Download”** or **Raw** → save to your computer
   - Rename to `logo-black.png`, `egg-icon.png`, etc.
   - Move/copy them into `public/images/`

4. **Commit and push**  
   Then redeploy on Vercel (or let it auto‑deploy from the repo). Images will be served from your site and should load reliably.

---

## Why this works

- **Before:** Images loaded from GitHub. GitHub can throttle or redirect, so they sometimes didn’t show.
- **After:** Images live in the repo and are deployed with the site. Vercel serves them from your domain, so they load like the rest of the site.

No extra “image hosting” signup needed—just add the files to `public/images/` and push.
