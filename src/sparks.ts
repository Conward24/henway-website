/**
 * "Newly possible" spark cards for the idea side of the homepage fork.
 *
 * NOT hand-written marketing copy. Generated from the app's own /signal endpoint
 * (lens: "opportunity"), so the site shows what the product actually produces.
 *
 * STALENESS: unlike the pain cards, these rot. Regenerate with
 *   node tools/refresh-sparks.mjs
 * which also runs monthly in .github/workflows/refresh-sparks.yml.
 *
 * Generated 2026-08-13.
 */

export type Spark = { title: string; why: string };

export const SPARKS_GENERATED = '2026-08-13';

export const SPARKS: Spark[] = [
  { title: "Fill blank spaces in product photos automatically", why: "Generate realistic product backgrounds and settings so photos look professional without hiring a photographer." },
  { title: "Answer customer texts when you are not working", why: "Handle common questions from buyers 24/7 so you can focus on bigger work while customers get instant replies." },
  { title: "Read job applications and rank best candidates first", why: "Saves hours sorting through applications by flagging who looks most qualified or interested before you read any." },
  { title: "Make rooms look better in your home listing photos", why: "Show buyers virtual furniture in empty spaces so they can picture living there and want to visit." },
];
