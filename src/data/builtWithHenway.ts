// The "Built with Henway" gallery — Henway's own flagship example builds, one
// per no-code tool per audience. Mirrors the app's data/featuredBuilds.ts.
// These are examples (labelled as such), described by what they do — no
// invented customer testimonials. Source: henway-launch-content/4-workstreams/
// feed-case-studies/00-MATRIX.md

export type Audience = 'work' | 'self';

export type BuiltExample = {
  id: string;
  title: string;
  tool: string;
  audience: Audience;
  industry: string;
  does: string;
};

export const BUILT_EXAMPLES: BuiltExample[] = [
  { id: 'shiftswap', title: 'ShiftSwap', tool: 'Lovable', audience: 'work', industry: 'Retail & hospitality',
    does: 'Staff post and claim shift swaps on a shared board and the manager approves in one tap, so changes stop getting lost in group texts.' },
  { id: 'plantparent', title: 'PlantParent', tool: 'Lovable', audience: 'self', industry: 'Hobbies',
    does: 'Tracks every plant and nudges you before it needs water, so nothing wilts from a forgotten watering.' },
  { id: 'decksignal', title: 'DeckSignal', tool: 'Bolt', audience: 'work', industry: 'Sales',
    does: 'Shows which prospects actually opened the pitch deck and when, so follow-ups go to the warm ones first.' },
  { id: 'tripsplit', title: 'TripSplit', tool: 'Bolt', audience: 'self', industry: 'Travel',
    does: 'Splits trip expenses live so everyone can see who paid what and who owes whom, no spreadsheet.' },
  { id: 'invoicenudge', title: 'InvoiceNudge', tool: 'Replit', audience: 'work', industry: 'Freelance',
    does: 'Auto-drafts polite, on-time payment reminders you approve and send, so chasing invoices stops slipping.' },
  { id: 'runstreak', title: 'RunStreak', tool: 'Replit', audience: 'self', industry: 'Fitness',
    does: 'Tracks your running streak with a friends leaderboard, so a solo habit gets some accountability.' },
  { id: 'fieldcheck', title: 'FieldCheck', tool: 'Glide', audience: 'work', industry: 'Field service',
    does: 'Crews log each site visit from their phone and the office sees it live, so nothing gets lost on paper by Friday.' },
  { id: 'recipebox', title: 'RecipeBox', tool: 'Glide', audience: 'self', industry: 'Food',
    does: 'Turns recipes scattered across screenshots and links into one searchable cookbook on your phone.' },
  { id: 'leadrouter', title: 'LeadRouter', tool: 'Make', audience: 'work', industry: 'Agency',
    does: 'New form fills auto-sort and ping the right rep in Slack, so leads stop going cold in a shared inbox. It just runs.' },
  { id: 'inboxtonotion', title: 'InboxToNotion', tool: 'Make', audience: 'self', industry: 'Productivity',
    does: 'Starred emails auto-save to a Notion reading list, so "read later" actually happens. Nothing to open, it just runs.' },
];
