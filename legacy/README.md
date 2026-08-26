# Deprecated: the React marketing site

This is the Vite + React + react-router site that served henwayai.com until the
static v2 site replaced it. It is kept for reference only. **Nothing here is built
or deployed.**

What lives in it that is still worth reading before deleting anything:

- `src/painCards.ts` / `src/sparks.ts` — generated data, never hand-edited.
  `tools/refresh-sparks.mjs` (still at the repo root, still on a monthly GitHub
  Actions schedule) writes `legacy/src/sparks.ts`. Nothing consumes it now.
  Disable the workflow or repoint it if v2 ever grows a sparks surface.
- `src/App.tsx` — held the password gate (`isGateOpen()`, default false). The v2
  static site has **no gate**. Anything that ships from `site/` is public.
- `src/pages/Studio.tsx` — the EmailJS `#contact` form. v2 links
  `mailto:letsconnect@henwayai.com` instead; there is no form on the new site.
- `src/pages/Security.tsx` — the old security page. v2's `/trust` replaces it,
  and `/security` 301s there in `vercel.json`.
- `src/pages/CaseMagnolia.tsx` — the Magnolia case study. **v2 has no case-study
  page**; `/case-study/magnolia` currently 302s to `/examples`.

The live site is now the plain HTML in `/site`, copied to `dist/` alongside
`public/` by `npm run build`. No bundler.
