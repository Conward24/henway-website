/* Build the personal "here's your build" pages.
 *
 * One JSON per recipient in scripts/for-people/ becomes one page at
 * /for/<slug>. The video is a real file under site/for-assets/, not a Drive
 * link: a Drive link on an iPhone bounces to the app or a sign-in wall, and
 * the whole point of the send is that the first tap plays something.
 *
 *   node scripts/build-for-pages.mjs            # build them all
 *   node scripts/build-for-pages.mjs sarah      # build just one
 *
 * Content is authored by hand in the JSON, so write real typographic
 * characters (’ “ ” —) rather than HTML entities. Only attribute values are
 * escaped; body copy is passed through as written.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PEOPLE = join(ROOT, 'scripts', 'for-people');
const OUT = join(ROOT, 'site', 'for');
const TEMPLATE = readFileSync(join(ROOT, 'scripts', 'for-template.html'), 'utf8');

const REQUIRED = ['slug', 'appName', 'appLine', 'appUrl', 'video'];

const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

const mmss = (t) => `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;

function chaptersBlock(chapters) {
  if (!chapters || !chapters.length) return '';
  const items = chapters.map((c) =>
    `      <li><button type="button" data-jump="${c.t}" data-label="${attr(c.label)}">` +
    `<b>${mmss(c.t)}</b> <span>${c.label}</span></button></li>`
  ).join('\n');
  // Naming the count up front tells them an 8-minute video is navigable
  // rather than a wall, without costing the CTA its place under the video.
  return `<details class="jump">
    <summary>Jump to a part &middot; ${chapters.length} moments</summary>
    <ol>
${items}
    </ol>
  </details>`;
}

/* The build finishing and the video ending are different moments, and only one
 * of them is the claim. Reuses the chapter seek handler via data-jump. */
function highlightBlock(h) {
  if (!h || typeof h.t !== 'number') return '';
  return `<button type="button" class="hi" data-jump="${h.t}" data-label="${attr(h.label || 'highlight')}">` +
    `<b>${mmss(h.t)}</b><span><strong>${h.label || ''}</strong>` +
    `${h.sub ? `<em>${h.sub}</em>` : ''}</span></button>`;
}

function pdfButton(p) {
  if (!p.pdfUrl) return '';
  const label = p.pdfLabel || 'Read the one-pager';
  return `<a class="secondary" id="cta-pdf" href="${attr(p.pdfUrl)}" target="_blank" rel="noopener">${label} &rarr;</a>`;
}

/* Tag app.henwayai.com links so the existing track.js rule (a tag already on
 * the link wins) leaves them alone and a signup reports this page rather than
 * "direct". api.henwayai.com is deliberately left alone: that domain serves the
 * generated app itself, it does not report to our analytics, and appending
 * query params to somebody's app link only risks breaking the one thing the
 * whole page exists to deliver. Clicks are measured here instead, via
 * for_cta_click. */
function tagged(url, slug) {
  try {
    const u = new URL(url);
    if (u.hostname === 'api.henwayai.com') return url;
    if (!u.searchParams.get('utm_source')) {
      u.searchParams.set('utm_source', 'directsend');
      u.searchParams.set('utm_medium', 'text');
      u.searchParams.set('utm_campaign', `for-${slug}`);
    }
    return u.toString();
  } catch {
    return url; // a relative or malformed href is not worth failing the build over
  }
}

function render(p) {
  const missing = REQUIRED.filter((k) => !p[k]);
  if (missing.length) throw new Error(`${p.slug || '(no slug)'}: missing ${missing.join(', ')}`);

  const name = p.name || '';
  const values = {
    SLUG: p.slug,
    TITLE: p.title || `${name ? name + ' — ' : ''}${p.appName} · Henway`,
    OG_TITLE: p.ogTitle || `${name ? name + ', ' : ''}here's your build`,
    OG_DESC: p.ogDesc || `${p.appName}. ${p.appLine}`,
    OG_IMAGE: p.ogImage || '/images/chick-shades-party.png',
    // A page opens on either a quoted read of their work, or a personal note
    // that does the same job in your own voice. Neither is required; a page
    // with both just leads with the quote.
    OBSERVATION_BLOCK: p.observation ? `<p class="you">&ldquo;${p.observation}&rdquo;</p>` : '',
    NOTE_BLOCK: p.note ? `<div class="note">${p.note}</div>` : '',
    APP_NAME: p.appName,
    APP_LINE: p.appLine,
    LEDE: p.lede || '',
    VIDEO_URL: p.video,
    POSTER_URL: p.poster || '',
    // The caption under the video makes a claim about the cut, so it is not
    // hardcoded: a trimmed video must not sit under the words "nothing cut".
    META_LINE: [p.durationLabel, p.metaNote ?? 'start to finish'].filter(Boolean).join(' &middot; '),
    APP_URL: attr(tagged(p.appUrl, p.slug)),
    PDF_BUTTON: pdfButton({ ...p, pdfUrl: p.pdfUrl ? tagged(p.pdfUrl, p.slug) : '' }),
    HIGHLIGHT_BLOCK: highlightBlock(p.highlight),
    CHAPTERS_BLOCK: chaptersBlock(p.chapters),
    SIGNOFF: p.signoff || '',
  };

  let html = TEMPLATE;
  for (const [k, v] of Object.entries(values)) {
    html = html.replaceAll(`{{${k}}}`, v);
  }
  const leftover = html.match(/\{\{[A-Z_]+\}\}/g);
  if (leftover) throw new Error(`${p.slug}: unreplaced token ${[...new Set(leftover)].join(', ')}`);
  return html;
}

const only = process.argv[2];
if (!existsSync(PEOPLE)) { console.error(`No ${PEOPLE} directory.`); process.exit(1); }
mkdirSync(OUT, { recursive: true });

const files = readdirSync(PEOPLE).filter((f) => f.endsWith('.json') && !f.startsWith('_'));
let built = 0;
for (const f of files) {
  const p = JSON.parse(readFileSync(join(PEOPLE, f), 'utf8'));
  if (only && p.slug !== only) continue;

  const asset = join(ROOT, 'site', p.video.replace(/^\//, ''));
  if (!existsSync(asset)) console.warn(`  ! ${p.slug}: video not found at site${p.video}`);

  writeFileSync(join(OUT, `${p.slug}.html`), render(p));
  console.log(`  /for/${p.slug}`);
  built++;
}
if (!built) { console.error(only ? `No person with slug "${only}".` : 'No people to build.'); process.exit(1); }
console.log(`${built} page${built === 1 ? '' : 's'} built.`);
