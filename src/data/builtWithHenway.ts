// The "Built with Henway" gallery — Henway's own flagship example builds, with a
// real preview of each so people can see what they'd get. Three for work, three
// for yourself, spanning the five no-code tools. Labelled as examples, described
// by what they do. Previews live in public/gallery/. Source:
// henway-launch-content/4-workstreams/feed-case-studies/00-MATRIX.md

export type Audience = 'work' | 'self';

export type BuiltExample = {
  id: string;
  title: string;
  tool: string;
  audience: Audience;
  industry: string;
  does: string;
  preview: string; // filename in /gallery
};

export const BUILT_EXAMPLES: BuiltExample[] = [
  { id: 'shiftswap', title: 'ShiftSwap', tool: 'Lovable', audience: 'work', industry: 'Retail & hospitality',
    does: 'Staff post and claim shift swaps on a shared board and the manager approves in one tap, so changes stop getting lost in group texts.',
    preview: 'shiftswap.png' },
  { id: 'tripsplit', title: 'TripSplit', tool: 'Bolt', audience: 'self', industry: 'Travel',
    does: 'Splits trip expenses live so everyone can see who paid what and who owes whom, no spreadsheet.',
    preview: 'tripsplit.png' },
  { id: 'invoicenudge', title: 'InvoiceNudge', tool: 'Replit', audience: 'work', industry: 'Freelance',
    does: 'Auto-drafts polite, on-time payment reminders you approve and send, so chasing invoices stops slipping.',
    preview: 'invoicenudge.png' },
  { id: 'recipebox', title: 'RecipeBox', tool: 'Glide', audience: 'self', industry: 'Food',
    does: 'Turns recipes scattered across screenshots and links into one searchable cookbook on your phone.',
    preview: 'recipebox.png' },
  { id: 'leadrouter', title: 'LeadRouter', tool: 'Bubble', audience: 'work', industry: 'Agency',
    does: 'Every new lead is sorted, assigned to the right rep, and tracked from New to Responded, so nothing goes cold in a shared inbox.',
    preview: 'leadrouter.png' },
  { id: 'runstreak', title: 'RunStreak', tool: 'Replit', audience: 'self', industry: 'Fitness',
    does: 'Tracks your running streak with a friends leaderboard, so a solo habit gets some accountability.',
    preview: 'runstreak.png' },
];
