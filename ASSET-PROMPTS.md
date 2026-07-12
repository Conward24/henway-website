# Henway — Visual Asset Prompts (for Nano Banana Pro 2)

Prompts for the key images that would strengthen the site (rule 8: *show it*). Nano Banana Pro
renders text and keeps character consistency well, so for anything with the chick, **attach
`public/images/chick.png` as a reference image** and tell it to match that exact chick.

**Brand palette:** Henway yellow `#FFCC00`, gold accent `#E6B800`, near-black charcoal `#1A1A1A`,
off-white `#F9F9F9`, pure white `#FFFFFF`. Wordmark: "Henway" in bold black with a yellow chick
hatching from an egg. Mascot: fuzzy yellow baby chick (the reference file). Keep everything clean,
modern, lots of white space, soft shadows. **No text with dashes.**

---

## 1. Home hero visual ⭐ (highest priority)
*Gives the currently text-only home hero something to show.*

> A clean, modern product hero image on a pure white background. A slightly angled, floating
> laptop and phone showing a minimal AI app interface: a chat card that reads "HENWAY RECOMMENDS
> — Build on Lovable" with a short prompt snippet and a black "Copy first prompt" button, plus a
> small yellow "7 min" badge. Beside the devices, a cute fuzzy yellow baby chick (match the
> attached reference chick exactly) standing and looking up at the screen. Soft realistic
> shadows, bright and friendly, generous white space. Accent color #FFCC00. Minimal, premium SaaS
> aesthetic. No slogans or paragraph text in the image. Aspect ratio 4:3, high resolution,
> transparent or pure-white background.

## 2. Chick mascot pose set ⭐ (reuse across the whole site)
*Run as separate generations, same reference, for a consistent brand character. Ask for
transparent PNGs so they drop in anywhere.*

Base instruction for each: *"Using the attached chick as the exact character reference, generate
the same fuzzy yellow baby chick, studio product photo, soft shadow, on a transparent background,
square, high resolution."* Then the pose:

- **Peeking:** "...peeking around from the right edge, only head and one wing visible, curious."
- **Pointing:** "...standing, one wing raised pointing up and to the right, as if gesturing at a UI element."
- **Hatching:** "...half-emerged from a cracked white eggshell, wings up, celebratory 'just hatched' moment."
- **Thinking:** "...tilting its head, one wing to its chin, a small yellow thought bubble above it (empty)."
- **Thumbs-up:** "...standing confidently with one wing raised in an approving gesture."

## 3. "Hatched" brand metaphor (idea → product)
*For a section break or the vision section — the core Henway story in one image.*

> A minimalist illustration on off-white (#F9F9F9): on the left, a glowing lightbulb-shaped egg;
> a subtle motion trail leads right to the same egg cracked open with a fuzzy yellow baby chick
> (match reference) stepping out toward a small, clean app window. Flat modern vector style with
> soft gradients, Henway yellow #FFCC00 and charcoal #1A1A1A, lots of negative space. Conveys
> "your idea, hatched into a real product." No text. Aspect ratio 16:9.

## 4. Social / OG share image (link previews) ⭐
*What shows when henwayai.com is shared in Slack, iMessage, LinkedIn.*

> A 1200x630 social share card, pure white background with a bold black headline reading
> "Stop guessing which AI tool to build with." in a clean geometric sans-serif, left-aligned. On
> the right, the fuzzy yellow baby chick (match reference) beside a small floating app card with a
> yellow "7 min" badge. Small "Henway" wordmark with a hatching-egg logo in the top-left corner.
> Accent #FFCC00. Crisp, high-contrast, premium. Exactly this headline text, spelled correctly,
> no other text, no dashes. Aspect ratio 1200:630.

## 5. "The problem" concept image (optional, for the /product problem section)
> A minimal conceptual illustration: a small person standing before a wall of many different app
> tool icons and a giant blank screen, looking overwhelmed, muted grayscale — except one path
> lit in Henway yellow #FFCC00 leading forward. Clean flat vector, lots of negative space,
> charcoal + yellow only. Conveys "too many tools, a blank screen, lost weeks." No text. 16:9.

---

### Tips for best results
- Attach `public/images/chick.png` for every chick asset; say "match this exact chick."
- Ask for **transparent PNG** on anything you'll overlay (mascot poses, hero cutout).
- Generate 3–4 variations, pick the cleanest, then downscale/export web-optimized (WebP or
  compressed PNG) into `public/images/`.
- Keep the chick's proportions consistent so it reads as one mascot across the site.
- Re-check any rendered text for typos and stray dashes before using.
