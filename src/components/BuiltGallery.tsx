import { useState } from 'react';
import { BUILT_EXAMPLES, type Audience } from '../data/builtWithHenway';

// "Built with Henway" — the social-proof gallery. Answers the site feedback
// ("show me what others built") with a breadth of real example builds across
// tools and both audiences. Labelled as examples, described by what they do.

const APP_SIGNUP_URL = 'https://app.henwayai.com/signup';

type Tab = 'all' | Audience;
const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All builds' },
  { key: 'work', label: 'For work' },
  { key: 'self', label: 'For yourself' },
];

export default function BuiltGallery() {
  const [tab, setTab] = useState<Tab>('all');
  const items = BUILT_EXAMPLES.filter((b) => tab === 'all' || b.audience === tab);

  return (
    <div>
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl md:text-5xl mb-4">See what people build with it.</h2>
        <p className="text-lg text-henway-charcoal/70">
          One idea, one conversation, a real build. A taste of what comes out, for work and for yourself.
        </p>
      </div>

      {/* audience tabs */}
      <div className="flex justify-center gap-2 mb-8 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`text-sm font-bold rounded-full px-5 py-2 border transition-colors ${
              tab === t.key
                ? 'bg-henway-ink text-white border-henway-ink'
                : 'bg-white text-henway-ink border-henway-border hover:border-henway-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((b) => (
          <div key={b.id} className="bg-white border border-henway-border rounded-2xl overflow-hidden flex flex-col">
            <div className="border-b border-henway-border bg-henway-offwhite">
              <img src={`/gallery/${b.preview}`} alt={`${b.title} preview`} loading="lazy" className="w-full h-[200px] object-cover object-top" />
            </div>
            <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-henway-offwhite text-henway-gold border border-henway-border rounded-full px-2 py-0.5">
                Henway example
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-henway-yellow/20 text-henway-ink border border-henway-yellow/40 rounded-full px-2 py-0.5">
                {b.audience === 'work' ? 'For work' : 'For yourself'}
              </span>
            </div>
            <h3 className="text-xl font-bold text-henway-ink">{b.title}</h3>
            <div className="text-xs font-bold text-henway-gold mt-0.5">Built on {b.tool} · {b.industry}</div>
            <p className="text-sm leading-relaxed text-henway-charcoal/80 mt-2 mb-4 flex-1">{b.does}</p>
            <a
              href={APP_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 self-start text-sm font-extrabold text-henway-ink hover:text-henway-gold transition-colors"
            >
              Build one like it
              <span aria-hidden>→</span>
            </a>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-henway-charcoal/60 mt-8">
        These are our own example builds. Real member builds land here as people choose to share them.
      </p>
    </div>
  );
}
