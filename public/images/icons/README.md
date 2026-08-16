# Henway icon sets

Six brand glyphs — hatching chick, egg, hen, chick (front), chick (side), nest — generated
2026-08-16 through the vertical AI studio (`google/nano-banana-pro`), keyed on blue and
knocked out to transparent PNG. 512×512 here; the app ships a 256×256 build.

## Why these exist

The app rendered the Henway identity about a hundred times using **emoji**, which meant Apple,
Google and Microsoft each decided what the mascot looked like. Michael saw it change on an
Android and it was real: those vendors draw the same Unicode concept as genuinely different
illustrations.

**These are not traced or tweaked copies of anyone's emoji.** Apple Color Emoji is proprietary
artwork licensed for display on Apple devices, not for redistribution, and a deliberately
slightly-different copy of a specific illustration is a derivative of it rather than an escape
from it. What is not ownable is the *concept* — anyone may draw a hatching chick. So the prompts
describe the subject and a Henway house style and never reference any vendor's rendering.

## Which set to use

| Set | Use it for | Do not use it for |
|---|---|---|
| **`soft3d/`** | **The app's interface set.** Same design language as the product UI, which is already soft: rounded corners, soft shadows, cream ground. Holds at 24px. | — |
| `flat/` | Places wanting a punchier, more graphic read — social cards, section dividers, print. Best silhouette when very small. | Anywhere beside soft UI, where it reads as a different kit. |
| `realistic/` | Hero and marketing moments, where it sits alongside the existing photographic mascot (`../chick.png`). | Anything under about 48px. Detail turns to mush and the hen becomes a brown blob. |

## Known defects, not yet fixed

- **`flat/egg.png` and `realistic/egg.png` render near-white** and nearly vanish on a cream
  ground. Warm the shell and deepen the shadow side before using either on cream.
- **`realistic/nest.png` contains a duckling**, not a chick. The prompt asked for two plain eggs
  and got a bird. Regenerate before use.
- **`soft3d/hen.png` is cream** while the other five are yellow, so it breaks a row of them.
  Deliberately left as-is; it is accurate to a hen.

## Regenerating

```
cd ~/vertical-ai-demo-studio
ICON_STYLE=soft3d|flat|realistic node scripts/henway-icon-set.mjs [icon-id …]
ICON_STYLE=soft3d|flat|realistic python3 scripts/henway-icon-knockout.py
```

Blue key rather than green: the subject is yellow, and a green key bleeds a green fringe into
yellow edges. The generator ignored a "nothing inside the egg" instruction twice, so **look at
the output before shipping it** rather than trusting the run.
