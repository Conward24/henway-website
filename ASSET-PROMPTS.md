# Henway — Visual Asset Prompts (for Nano Banana Pro 2)

Prompts for the images that strengthen the site. Positioning is now the **bridge / translation
layer**: *Turn what you already know into what AI can build. No prompting, no code.* Keep every
asset on that message. Nano Banana Pro renders text and keeps character consistency well, so for
anything with the chick, **attach `public/images/chick.png` as a reference image** and tell it to
match that exact chick.

**Brand palette:** Henway yellow `#FFCC00`, gold accent `#E6B800`, near-black charcoal `#1A1A1A`,
off-white `#F9F9F9`, pure white `#FFFFFF`. Wordmark: "Henway" in bold black with a yellow chick
hatching from an egg. Mascot: fuzzy yellow baby chick (the reference file). Clean, modern, lots of
white space, soft shadows. **No text with dashes** (house style: no em or en dashes).

> Note: the home hero's bridge diagram and the product page's app-card are already built in code,
> so you don't need AI images for those. These prompts cover the pieces code can't do: the social
> card, the mascot set, and richer illustrations.

---

## 1. Social / OG share image ⭐ (highest priority)
*What shows when henwayai.com is shared in Slack, iMessage, LinkedIn. Uses the new headline.*

> A 1200x630 social share card, pure white background. Bold black headline, left-aligned, in a
> clean geometric sans-serif: "Turn what you already know into what AI can build." Below it in
> smaller yellow (#FFCC00) uppercase letter-spaced text: "NO PROMPTING. NO CODE." On the right,
> the fuzzy yellow baby chick (match the attached reference) standing confidently. A small
> "Henway" wordmark with a hatching-egg logo in the top-left corner. Crisp, high-contrast,
> premium SaaS look. Render exactly this text, spelled correctly, no dashes, no other text.
> Aspect ratio 1200:630.

## 2. The bridge illustration ⭐ (the core positioning image)
*A richer, hero-worthy version of the "you → Henway → AI" translation idea. Use in the hero, the
manifesto, or a section header.*

> A clean, modern horizontal illustration on off-white (#F9F9F9). Left side: a person's plain
> spoken words shown as a soft speech bubble reading "the front desk is buried in scheduling calls
> all day." A glowing yellow (#FFCC00) bridge or arrow path leads to the center, where a fuzzy
> yellow baby chick (match the attached reference) sits as the friendly translator. From the chick,
> the path continues right to a crisp, finished app window labeled with a clean UI. Convey
> "everyday words on the left, a real AI-built product on the right, Henway is the bridge in the
> middle." Flat modern vector with soft gradients, charcoal + yellow, generous negative space. No
> paragraph text beyond the single speech-bubble line. Aspect ratio 16:9.

## 3. Chick mascot pose set ⭐ (reuse across the whole site)
*Run as separate generations, same reference, for a consistent brand character. Ask for
transparent PNGs so they drop in anywhere.*

Base instruction for each: *"Using the attached chick as the exact character reference, generate
the same fuzzy yellow baby chick, studio product photo, soft shadow, on a transparent background,
square, high resolution."* Then the pose:

- **Peeking:** "...peeking around from the right edge, only head and one wing visible, curious."
- **Pointing:** "...standing, one wing raised pointing up and to the right, as if gesturing at a UI element."
- **Hatching:** "...half-emerged from a cracked white eggshell, wings up, celebratory 'just hatched' moment."
- **Translating:** "...standing between a speech bubble and a small app window, one wing toward each, as if handing one to the other."
- **Thumbs-up:** "...standing confidently with one wing raised in an approving gesture."

## 4. "Hatched" metaphor (idea → built product)
*For a section break or the manifesto — the Henway story in one image.*

> A minimalist illustration on off-white (#F9F9F9): on the left, a glowing lightbulb-shaped egg;
> a subtle motion trail leads right to the same egg cracked open with a fuzzy yellow baby chick
> (match the attached reference) stepping out toward a small, clean app window. Flat modern vector
> with soft gradients, Henway yellow #FFCC00 and charcoal #1A1A1A, lots of negative space. Conveys
> "your idea, hatched into a real product." No text. Aspect ratio 16:9.

## 5. (Optional) Product page "in action" image
*Only if you want a photographic hero on /product instead of the code-built card.*

> A clean product hero on pure white: a slightly angled floating laptop showing a minimal AI app
> interface with a chat card that reads "HENWAY RECOMMENDS - Build on Lovable" (use a colon or the
> word "recommends", no dash), a short prompt snippet, a black "Copy first prompt" button, and a
> small yellow "7 min" badge. A fuzzy yellow baby chick (match the attached reference) stands
> beside the laptop looking up at the screen. Soft realistic shadows, bright and friendly,
> generous white space, accent #FFCC00. No slogans in the image. Aspect ratio 4:3, transparent or
> white background.

---

### Tips for best results
- Attach `public/images/chick.png` for every chick asset; say "match this exact chick."
- Ask for **transparent PNG** on anything you'll overlay (mascot poses, cutouts).
- Generate 3–4 variations, pick the cleanest, export web-optimized (WebP or compressed PNG) into
  `public/images/`, and hand them back to me to wire in.
- Keep the chick's proportions consistent so it reads as one mascot across the site.
- Re-check any rendered text for typos and stray dashes before using.
