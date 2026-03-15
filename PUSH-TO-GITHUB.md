# Push This Project to GitHub (Then Connect Vercel)

I don’t have access to your GitHub account, so you’ll need to run these steps yourself. It only takes a couple of minutes.

---

## 1. Create a new repo on GitHub

1. Go to [github.com](https://github.com) and sign in.
2. Click the **+** (top right) → **New repository**.
3. **Repository name:** e.g. `henway-ai` or `henway-website`.
4. Choose **Public**.
5. **Do not** check “Add a README” or “Add .gitignore” (this folder already has files).
6. Click **Create repository**.

---

## 2. Run these commands in Terminal

Open **Terminal** (Mac), copy and paste this whole block, then press Enter:

```bash
cd /Users/michaelconward/Downloads/henway-ai---product-creation-platform

git init
git add .
git commit -m "Initial commit: Henway AI site"

git branch -M main
git remote add origin https://github.com/Conward24/henway-website.git
git push -u origin main
```

When you run `git push`, GitHub will ask you to sign in (browser or token). Use your normal GitHub login or a **Personal Access Token** if you have 2FA.

---

## 3. Connect the repo to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (e.g. with GitHub).
2. Click **Add New…** → **Project**.
3. You should see **YOUR_REPO_NAME** in the list. Click **Import**.
4. Leave the build settings as they are. Click **Deploy**.
5. When it’s done, you’ll get a live URL. Optionally add your custom domain under **Settings → Domains**.

---

## If you get “Permission denied” or “Authentication failed” on push

- GitHub no longer accepts account passwords for `git push`. Use either:
  - **GitHub CLI:** install with `brew install gh`, then run `gh auth login` and follow the prompts, then try `git push` again, or  
  - **Personal Access Token:** GitHub → **Settings → Developer settings → Personal access tokens** → create a token with `repo` scope, and when Terminal asks for your password, paste the token instead.

Once the code is on GitHub and you’ve imported the project in Vercel, the site will deploy and show up there.
