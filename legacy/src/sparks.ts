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
 * Generated 2026-09-01.
 */

export type Spark = { title: string; why: string };

export const SPARKS_GENERATED = '2026-09-01';

export const SPARKS: Spark[] = [
  { title: "Answer customer questions while you work", why: "Your AI chatbot replies to messages, answers FAQs, and schedules meetings on its own." },
  { title: "Fill in forms with information from multiple apps", why: "Connect your existing tools and let AI move data between them without your hands." },
  { title: "Find the best time for everyone to meet", why: "AI reads all your calendars and picks times that work, then books the room." },
  { title: "Check what competitors are doing right now", why: "An AI agent watches your competition and updates your tracker every single day." },
];
