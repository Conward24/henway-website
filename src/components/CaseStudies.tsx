import { useState, useRef, useEffect } from 'react';

const caseStudies = [
  {
    client: "Henway Deal Workspace",
    sub: "Search-Fund Deal Workspace",
    outcome: "We built a living workspace for search-fund acquisitions. Upload the CIM (the deal's confidential info memo), see instantly if it pencils, and draft the LOI (letter of intent), without juggling five spreadsheets.",
    quote: "I think what you've delivered... saves hours already right there."
  },
  {
    client: "AI Video Production Studio",
    sub: "AI Video Storyboarding",
    outcome: "We created a tool that turns a simple idea into a full video storyboard in minutes, saving hours of scriptwriting and planning.",
    quote: "Instead of wrestling with decks and scripts, we generate full storyboards (scenes, prompts, and costs) in a single pass. It’s become our default way to design vertical demo videos."
  },
  {
    client: "Grant Application System",
    sub: "Grant Tracking & Matching",
    outcome: "We built a system that finds the best grants for your business and tracks every deadline, so you never miss out on funding.",
    quote: "We stopped losing track of deadlines and half-finished drafts. The system surfaces the best-fit grants for each venture and shows exactly where every application stands."
  },
  {
    client: "Instant Closer",
    sub: "AI Sales Assistant",
    outcome: "We're building an AI sales assistant that answers customer questions and books appointments 24/7, even when the office is closed.",
    quote: "Instant Closer greets every visitor, answers questions, and captures high-intent leads while the team is offline, so the website finally sells like a real front desk."
  }
];

/** Auto-scrolling, manually-scrollable case-study strip. Shared by Home + Studio. */
export default function CaseStudies() {
  const [isPaused, setIsPaused] = useState(false);
  const caseStudiesScrollRef = useRef<HTMLDivElement>(null);
  const isPausedRef = useRef(isPaused);
  const userScrollCooldownUntilRef = useRef<number>(0);
  /** While true (finger on strip), pause auto-scroll so RAF doesn't fight swipe; clears on lift. */
  const caseStudiesTouchHoldRef = useRef(false);

  useEffect(() => { isPausedRef.current = isPaused; }, [isPaused]);
  useEffect(() => { if (!isPaused) userScrollCooldownUntilRef.current = 0; }, [isPaused]);

  useEffect(() => {
    const el = caseStudiesScrollRef.current;
    if (!el) return;
    let rafId = 0;
    const tick = () => {
      const now = Date.now();
      if (!isPausedRef.current && now >= userScrollCooldownUntilRef.current) {
        el.scrollLeft += 0.55;
        const segment = el.scrollWidth / 2;
        if (segment > 0 && el.scrollLeft >= segment - 2) {
          el.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const pauseAutoForManualBrowsing = () => {
    userScrollCooldownUntilRef.current = Date.now() + 8000;
  };

  return (
    <section id="stories" className="py-24" aria-label="Case studies">
      <div className="section-container mb-16 text-center">
        <div className="arch-label arch-label-yellow mx-auto">Case Studies</div>
        <h2 className="mb-4">Real projects, real results.</h2>
        <p className="text-xl text-henway-charcoal/60">How we've helped others turn ideas into reality.</p>
      </div>

      <div className="relative px-4 md:px-6">
        <div
          ref={caseStudiesScrollRef}
          role="region"
          aria-label="Case study cards, scroll horizontally"
          className="flex touch-pan-x gap-8 overflow-x-auto overflow-y-hidden scroll-auto py-4 pb-6 [scrollbar-width:thin] [scrollbar-color:#FFCC00_#E5E7EB] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-henway-yellow [&::-webkit-scrollbar-track]:bg-gray-100"
          onWheel={(e) => {
            if (Math.abs(e.deltaX) > 2 || e.shiftKey) {
              pauseAutoForManualBrowsing();
            }
          }}
          onTouchStart={() => { caseStudiesTouchHoldRef.current = true; }}
          onTouchEnd={(e) => { if (e.touches.length === 0) caseStudiesTouchHoldRef.current = false; }}
          onTouchCancel={(e) => { if (e.touches.length === 0) caseStudiesTouchHoldRef.current = false; }}
          onPointerDown={(e) => {
            if (e.pointerType === 'touch' || e.pointerType === 'pen') {
              caseStudiesTouchHoldRef.current = true;
              return;
            }
            if (e.pointerType === 'mouse' && !(e.target as HTMLElement).closest('[data-case-study-card]')) {
              pauseAutoForManualBrowsing();
            }
          }}
          onPointerUp={(e) => {
            if (e.pointerType === 'touch' || e.pointerType === 'pen') {
              caseStudiesTouchHoldRef.current = false;
            }
          }}
          onPointerCancel={(e) => {
            if (e.pointerType === 'touch' || e.pointerType === 'pen') {
              caseStudiesTouchHoldRef.current = false;
            }
          }}
        >
          {/* 2× data: required for seamless loop */}
          {[...caseStudies, ...caseStudies].map((item, idx) => (
            <div
              key={idx}
              data-case-study-card
              onClick={() => setIsPaused((p) => !p)}
              className="w-[400px] md:w-[500px] flex-shrink-0 whitespace-normal arch-card !mb-0 group hover:border-henway-yellow transition-colors cursor-pointer"
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <div className="arch-label arch-label-yellow !text-left !mb-4">Case Study</div>
                  <h3 className="text-2xl mb-2 font-bold">{item.client}</h3>
                  <p className="text-sm uppercase tracking-widest text-henway-charcoal/40 font-bold mb-4">{item.sub}</p>
                  <p className="text-lg font-medium leading-snug text-henway-charcoal/80">{item.outcome}</p>
                </div>
                <div className="mt-auto pt-8 border-t border-gray-100">
                  <p className="text-sm italic text-gray-500 leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
