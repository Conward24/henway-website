/**
 * Regenerate src/sparks.ts — the "newly possible" cards on the idea side of the
 * homepage fork.
 *
 *   node tools/refresh-sparks.mjs          write if the API returns a full set
 *   node tools/refresh-sparks.mjs --check  report age only, exit 1 if stale
 *
 * Talks to the live /signal endpoint as the public "try" tenant, so it needs no
 * secrets, no backend checkout and no API key. That is why this replaced the
 * earlier Python version: the same cards, runnable from CI.
 *
 * WHY A SCRIPT AT ALL: the site is a static Vite app and cannot call /signal in
 * the browser (CORS, tenant auth, and rate limiting on the homepage), so the
 * cards ship as a constant. Pain cards can sit still because a consultant's week
 * does not change. These claim to be current, so they rot, and a visibly stale
 * "what's newly possible" undermines the freshness it is claiming.
 *
 * Never hand-edit src/sparks.ts. Editing it makes the site promise cards the
 * product will not produce.
 */

import { readFileSync, writeFileSync } from 'node:fs';

const API = process.env.HENWAY_API ?? 'https://api.henwayai.com';
const OUT = new URL('../legacy/src/sparks.ts', import.meta.url);
const STALE_AFTER_DAYS = 45;
const WANT = 4;

function currentAgeDays() {
  try {
    const match = readFileSync(OUT, 'utf8').match(/Generated (\d{4}-\d{2}-\d{2})/);
    if (!match) return null;
    return Math.floor((Date.now() - Date.parse(match[1])) / 86_400_000);
  } catch {
    return null;
  }
}

function render(items, today) {
  const cards = items
    .map((c) => `  { title: ${JSON.stringify(c.title)}, why: ${JSON.stringify(c.why)} },`)
    .join('\n');
  return `/**
 * "Newly possible" spark cards for the idea side of the homepage fork.
 *
 * NOT hand-written marketing copy. Generated from the app's own /signal endpoint
 * (lens: "opportunity"), so the site shows what the product actually produces.
 *
 * STALENESS: unlike the pain cards, these rot. Regenerate with
 *   node tools/refresh-sparks.mjs
 * which also runs monthly in .github/workflows/refresh-sparks.yml.
 *
 * Generated ${today}.
 */

export type Spark = { title: string; why: string };

export const SPARKS_GENERATED = '${today}';

export const SPARKS: Spark[] = [
${cards}
];
`;
}

const age = currentAgeDays();

if (process.argv.includes('--check')) {
  if (age === null) {
    console.log('sparks.ts: missing or undated');
    process.exit(1);
  }
  const stale = age > STALE_AFTER_DAYS;
  console.log(`sparks.ts: ${age} days old (${stale ? 'STALE, regenerate' : 'ok'})`);
  process.exit(stale ? 1 : 0);
}

const res = await fetch(`${API}/signal`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'X-Tenant-Slug': 'try' },
  body: JSON.stringify({ context: '', lens: 'opportunity' }),
});

if (!res.ok) {
  console.error(`/signal returned ${res.status} — leaving sparks.ts alone`);
  process.exit(1);
}

const { items = [] } = await res.json();

if (items.length < WANT) {
  // Better to keep last month's four than publish two. A hero column with half
  // its cards missing reads as broken, and the old ones are at worst a bit stale.
  console.error(`got ${items.length} items, wanted ${WANT} — leaving sparks.ts alone`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
writeFileSync(OUT, render(items.slice(0, WANT), today));
console.log(`wrote src/sparks.ts (${today})`);
for (const item of items.slice(0, WANT)) console.log('  *', item.title, '|', item.why);
