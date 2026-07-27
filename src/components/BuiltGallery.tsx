import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BUILT_EXAMPLES, type Audience } from '../data/builtWithHenway';

// "Built with Henway" — the social-proof gallery. Answers the site feedback
// ("show me what others built") with a breadth of real example builds across
// tools and both audiences. Horizontal scroll-snap row so the section stays one
// card tall no matter how many builds; a peek of the next card + arrows signal
// there is more sideways. Labelled as examples, described by what they do.

const APP_SIGNUP_URL = 'https://app.henwayai.com/signup';

type Tab = 'all' | Audience;
const TABS: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All builds' },
  { key: 'work', label: 'For work' },
  { key: 'self', label: 'For yourself' },
];

export default function BuiltGallery() {
  const [tab, setTab] = useState<Tab>('all');
  const scroller = useRef<HTMLDivElement>(null);
  const items = BUILT_EXAMPLES.filter((b) => tab === 'all' || b.audience === tab);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <div>
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-3xl md:text-5xl mb-4">See what people build with it.</h2>
        <p className="text-lg text-henway-charcoal/70">
          One idea, one conversation, a real build. A taste of what comes out, for work and for yourself.
        </p>
      </div>

      {/* audience tabs + desktop scroll arrows */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                setTab(t.key);
                scroller.current?.scrollTo({ left: 0 });
              }}
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
        <div className="hidden md:flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="w-10 h-10 rounded-full border border-henway-border bg-white text-henway-ink flex items-center justify-center hover:border-henway-ink transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="w-10 h-10 rounded-full border border-henway-border bg-white text-henway-ink flex items-center justify-center hover:border-henway-ink transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* horizontal scroll-snap row — one card tall, peek signals more */}
      <div
        ref={scroller}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((b) => (
          <div
            key={b.id}
            className="snap-start shrink-0 w-[280px] sm:w-[320px] bg-white border border-henway-border rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="border-b border-henway-border bg-henway-offwhite">
              <img src={`/gallery/${b.preview}`} alt={`${b.title} preview`} loading="lazy" className="w-full h-[180px] object-cover object-top" />
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

      <p className="text-center text-sm text-henway-charcoal/60 mt-6">
        These are our own example builds. Real member builds land here as people choose to share them.
      </p>
    </div>
  );
}
