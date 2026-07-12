# Henway — Visual Asset Prompts (optimized for Nano Banana Pro)

Positioning: **Turn what you already know into what AI can build. No prompting, no code.**
Every asset should reinforce that message.

**How Nano Banana Pro actually wants to be prompted:** it's a reasoning model, not a keyword
matcher. Write each prompt as a creative-director brief in full sentences: subject → action →
setting → style → composition/camera → lighting → exact text (quoted) → constraints. When you
attach a reference image, explicitly say what to keep locked (proportions, colors, texture) and
what's allowed to change (pose, background, scene). Put exact on-image copy in quotes near the
top, restate the spelling once, and close with a "no other text" constraint — this is what
actually gets clean typography instead of garbled text.

**Brand palette:** Henway yellow `#FFCC00`, gold accent `#E6B800`, near-black charcoal `#1A1A1A`,
off-white `#F9F9F9`, pure white `#FFFFFF`. Wordmark: "Henway" in bold black with a yellow chick
hatching from an egg. Mascot: fuzzy yellow baby chick (the reference file). Style: clean, modern
SaaS aesthetic, generous negative space, soft realistic shadows (not flat/cartoon shadows unless
noted). **No em dashes or en dashes in any rendered text** — use periods or "no" instead.

**Site font:** the Henway website is set entirely in **Raleway** (a geometric sans-serif, from
Google Fonts). For any asset that renders headline or label text, ask for Raleway by name (e.g.
"in Raleway, a geometric sans-serif") so the typography matches the site and the wordmark.

**Before you generate:** attach `public/images/chick.png` as an image reference for every chick
asset. In the prompt, refer to it explicitly as "the attached reference image" and state which
traits to preserve exactly (see each prompt below).

For any asset that includes the **Henway wordmark** (the "Henway" text lockup with the hatching
egg icon), also attach `public/images/henway-logo.png` as a second reference image and instruct
the model to reproduce that exact lockup rather than redraw it from a text description. This
keeps the egg icon's crack pattern, shading, and letterforms identical across every asset instead
of drifting each time it's regenerated.

**Recommended settings:** generate at **2K**, aspect ratio as noted per prompt, and ask for
**3 to 4 variations** per asset so you have options to pick the cleanest render, especially for
anything with rendered text.

---

## 1. Social / OG share image ⭐ (highest priority)
*What shows when henwayai.com is shared in Slack, iMessage, LinkedIn.*

```
Using the first attached image as the exact character reference for the chick, and the second
attached image as the exact reference for the Henway wordmark logo, generate a social share card
sized for Open Graph (target 1200x630), aspect ratio 16:9 (the closest available option),
resolution 2K.

Composition: pure white (#FFFFFF) background, wide horizontal layout, generous negative space,
subject weighted to the right two-thirds so the left two-thirds stays clean for the headline.

Subject and action: on the right side of the frame, the same fuzzy yellow baby chick from the
reference image standing confidently on the ground, facing slightly toward the viewer, wings
relaxed at its sides, warm soft studio lighting from the upper left casting a soft realistic
shadow beneath it. Keep the chick's proportions, feather texture, eye shape, and coloring
(yellow #FFCC00 body, small orange beak) exactly as shown in the reference image. Do not
redesign the character.

Text to render, exactly as written and spelled correctly, no other text anywhere in the image:
- Large bold black headline, left-aligned, in Raleway (a clean geometric sans-serif, the Henway
  site font), positioned upper left: "Turn what you already know into what AI can build."
- Below the headline, smaller, uppercase, letter-spaced, in Henway yellow (#FFCC00): "NO
  PROMPTING. NO CODE."
- In the top-left corner, reproduce the Henway wordmark exactly as shown in the second reference
  image: the word "Henway" in bold black lettering with the yellow hatching-egg icon to its
  right. Do not redraw, restyle, or reinterpret the logo, place it at a small scale as a corner
  lockup, keeping its proportions, colors, and the egg's crack pattern identical to the
  reference.

Style: crisp, high-contrast, premium SaaS marketing card, similar in polish to a Stripe or Linear
Open Graph image. Flat clean lighting on the text, soft realistic lighting on the chick only.

Constraints: no watermark, no extra characters, no background clutter, no gradients behind the
text, no misspellings, no dashes of any kind in the rendered text, do not crop the chick.
```

---

## 2. The bridge illustration ⭐ (core positioning image)
*"You → Henway → AI" translation concept. Use in hero, manifesto, or section header.*

```
Using the attached image as the exact character reference for the chick, generate a wide
horizontal illustration, aspect ratio 16:9, resolution 2K.

Setting and background: off-white (#F9F9F9) flat background, minimal, lots of negative space,
nothing else in the scene besides the three elements described below, arranged left to right
along a single horizontal eye line.

Left element: a soft rounded speech bubble, simple line-art style with a thin charcoal
(#1A1A1A) outline, containing one line of text rendered exactly as written and spelled
correctly, no other text in the bubble: "the front desk is buried in scheduling calls all day."

Center element: the same fuzzy yellow baby chick from the reference image, standing on a glowing
Henway-yellow (#FFCC00) bridge or curved arrow path that visually connects the speech bubble on
the left to the app window on the right. The chick faces forward, one wing raised slightly as if
gesturing between the two elements, acting as a friendly translator. Keep the chick's
proportions, feather texture, eye shape, and coloring exactly as shown in the reference image.

Right element: a crisp, simple, finished app window mockup with a thin charcoal outline, a plain
title bar, and two or three simple flat UI blocks inside suggesting a real finished product. No
readable text inside the app window itself, just clean rectangular UI shapes.

Style: flat modern vector illustration with soft subtle gradients on the yellow bridge only,
otherwise flat color fills. Two-color palette: charcoal #1A1A1A line art and Henway yellow
#FFCC00 accents, on the #F9F9F9 background. Even, soft, shadowless lighting consistent with flat
vector illustration, not photorealistic.

Constraints: no paragraph text anywhere except the single quoted speech-bubble line, no
watermark, no extra characters or props, no dashes of any kind in the rendered text, keep all
three elements aligned on the same horizontal axis.
```

---

## 3. Chick mascot pose set ⭐ (reuse across the site)
*Generate each pose as its own request, same reference image, transparent background, so they
drop into any layout as a consistent character.*

**Shared base for every pose below (prepend this to each one):**

```
Using the attached image as the exact character reference, generate the same fuzzy yellow baby
chick character: same proportions, same feather texture, same eye shape and size, same small
orange beak, same body color (#FFCC00 with a slightly deeper #E6B800 shading on the underside).
Do not redesign or restyle the character. Studio product photography lighting, soft realistic
drop shadow directly beneath the chick only, transparent background (alpha channel, no
background color at all), square 1:1 aspect ratio, resolution 2K, centered composition with the
chick occupying roughly 70 percent of the frame height so it can be scaled freely.
```

**Then append the specific pose:**

- **Peeking**
  ```
  Pose: the chick peeking around from the right edge of the frame, only its head and the tip of
  one wing visible, the rest of its body cropped off-frame to the right, a curious wide-eyed
  expression, head tilted slightly. No shadow on the invisible body, only where visible parts
  touch the implied surface.
  ```

- **Pointing**
  ```
  Pose: the chick standing fully in frame on both feet, one wing raised up and to the right at
  roughly a 45 degree angle as if pointing at something just outside the frame, the other wing
  relaxed at its side, an alert, helpful expression.
  ```

- **Hatching**
  ```
  Pose: the chick half-emerged from a cracked white eggshell sitting on the ground, both wings
  raised up and outward in a celebratory gesture, an excited open-beak expression, a few small
  eggshell fragments scattered near its feet. The eggshell should be simple flat white with thin
  charcoal crack lines, matching the illustration style rather than photoreal.
  ```

- **Translating**
  ```
  Pose: the chick standing centered between two simple flat icons, a small speech-bubble icon to
  its left and a small app-window icon to its right, one wing extended toward each icon as if
  handing something from one to the other, a friendly focused expression. Render the two icons in
  simple flat charcoal line art, no text inside either icon.
  ```

- **Thumbs-up**
  ```
  Pose: the chick standing confidently facing forward, one wing raised with the wingtip curled
  upward in a clear approving "thumbs up" gesture, a warm confident expression, weight slightly
  forward as if mid-step.
  ```

---

## 4. "Hatched" metaphor (idea → built product)
*Section break or manifesto image. The Henway story in one frame.*

```
Using the attached image as the exact character reference for the chick, generate a minimalist
horizontal illustration, aspect ratio 16:9, resolution 2K.

Background: flat off-white (#F9F9F9), no texture, generous negative space, nothing in the scene
except the two elements below connected by a single subtle motion trail.

Left element: an egg-shaped outline in Henway yellow (#FFCC00) with a simple flat lightbulb
filament shape glowing faintly inside it, rendered as flat line art with a thin charcoal
(#1A1A1A) outline, representing an idea. It should read clearly as "an idea inside an egg,"
sitting on the ground, unbroken.

Right element: the same egg, now cracked open, with the fuzzy yellow baby chick from the
reference image stepping out of it toward a small, simple, finished app window (thin charcoal
outline, plain title bar, two or three flat UI blocks inside, no readable text). Keep the chick's
proportions, feather texture, eye shape, and coloring exactly as shown in the reference image.

Connecting the two: a single thin, subtly dotted or gradient motion trail in Henway yellow
leading from the unbroken egg on the left to the cracked egg and chick on the right, implying
time passing and transformation.

Style: flat modern vector illustration with soft subtle gradients limited to the yellow trail and
egg glow, otherwise flat color fills, two-color palette of charcoal #1A1A1A and Henway yellow
#FFCC00 on the #F9F9F9 background, even shadowless lighting consistent with flat vector
illustration.

Constraints: no text anywhere in the image, no watermark, no extra props or characters, keep both
eggs the same size and shape so the transformation reads clearly.
```

---

## 5. (Optional) Product page "in action" image
*Photographic hero for /product, alternative to the code-built card.*

```
Using the attached image as the exact character reference for the chick, generate a clean
product hero photograph, aspect ratio 4:3, resolution 2K, on a pure white (#FFFFFF) background.

Subject and setting: a modern laptop floating at a slight three-quarter angle, screen facing
mostly toward camera, displaying a minimal AI app interface. On the laptop screen, render a chat
card UI with a small yellow accent tag and one line of bold text, and below it a short
monospace-style code or prompt snippet in a lighter gray, and below that a black rounded button.
Also show a small yellow rounded badge near the top corner of the screen.

Text to render on the laptop screen, exactly as written and spelled correctly, no other text
anywhere in the image:
- Chat card header: "Henway recommends: Build on Lovable"
- Button label: "Copy first prompt"
- Small badge: "7 min"

Character: the same fuzzy yellow baby chick from the reference image standing on the surface
beside the laptop, looking up and slightly toward the screen with a curious, pleased expression.
Keep the chick's proportions, feather texture, eye shape, and coloring exactly as shown in the
reference image.

Lighting and style: soft realistic studio lighting from the upper left, gentle natural shadows
under the laptop and the chick, bright, friendly, premium product-photography look, generous
white space around both subjects, Henway yellow (#FFCC00) used only as the small UI accents
described above, not as a background wash.

Constraints: no slogans anywhere outside the described UI text, no watermark, no dashes of any
kind in the rendered text, no misspellings, keep the screen's UI text small and legible rather
than oversized.
```

---

### General tips carried over and reinforced
- Always attach `public/images/chick.png` and explicitly name what to lock (proportions, feather
  texture, eye shape, color) versus what's new (pose, scene) — vague "match the reference" phrasing
  is the most common cause of character drift.
- Whenever the wordmark appears in an asset, attach `public/images/henway-logo.png` alongside the
  chick reference and tell the model to reproduce it exactly rather than describing the logo in
  words. Letting the model redraw "Henway" and the egg icon from a text description is the fastest
  way to get subtly wrong letterforms or a mismatched crack pattern on the egg.
- Ask for **transparent PNG** (alpha channel) on anything you'll overlay, and say so explicitly
  in the prompt rather than assuming a white background will be treated as transparent.
- Generate **3 to 4 variations** per asset, especially anything with rendered text, and pick the
  cleanest. Re-check spelling and confirm no stray dashes crept into the render.
- If an output is close but not right, don't re-roll from scratch — Nano Banana Pro handles
  conversational edits well. Say something like: "Keep everything the same, but move the badge
  to the top-right corner and make the yellow slightly warmer."
- Export web-optimized (WebP or compressed PNG) into `public/images/` once you've picked finals.
