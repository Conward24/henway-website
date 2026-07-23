/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* The "journey player": a device that auto-plays through the Henway flow so
   people SEE the transformation instead of reading it. Six beats mapped to the
   hatch ribbon (Listen -> Understand -> Focus -> See it -> Coop). The "See it"
   screen shows a REAL app in its own look (not Henway's brand) to signal the
   preview is real. Egg->hen ribbon is a clickable scrubber; prev/next controls;
   tap the device to advance; pauses for reduced-motion. */

type Screen = { egg: string; cap: string; render: () => JSX.Element };

const DUR = 6000;

function Bar({ pct }: { pct: number }) {
  return <div className="p-bar"><i style={{ width: `${pct}%` }} /></div>;
}
function Head({ egg, phase, pct }: { egg: string; phase: string; pct: number }) {
  return (
    <>
      <div className="flex items-center gap-2"><span className="text-lg">{egg}</span><Bar pct={pct} /></div>
      <div className="text-[9px] font-extrabold tracking-[0.14em] uppercase text-henway-gold ml-6 mt-1">{phase}</div>
    </>
  );
}

const screens: Screen[] = [
  // 1 — LISTEN: the fork
  {
    egg: '🥚', cap: 'Start anywhere',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐥" phase="Listen" pct={12} />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-4xl">🐥</div>
          <div className="font-extrabold text-lg mt-2 tracking-tight">What brings you here?</div>
          <div className="text-[12px] mt-1 font-semibold" style={{ color: '#7a7360' }}>You don't need a big idea to start.</div>
          <div className="w-full mt-3 bg-white border border-[#e9e1d0] rounded-xl p-3 text-center shadow-sm"><div className="text-lg">🛠️</div><div className="font-extrabold text-[13px] mt-0.5">Fix something at work</div><div className="text-[11px]" style={{ color: '#7a7360' }}>A problem in your job or business</div></div>
          <div className="w-full mt-2 bg-white border border-[#e9e1d0] rounded-xl p-3 text-center shadow-sm"><div className="text-lg">💡</div><div className="font-extrabold text-[13px] mt-0.5">Build an idea I have</div><div className="text-[11px]" style={{ color: '#7a7360' }}>Something you wish existed</div></div>
        </div>
      </div>
    ),
  },
  // 2 — LISTEN: talk
  {
    egg: '🐣', cap: 'You talk',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐣" phase="Listen" pct={30} />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="font-extrabold text-lg tracking-tight">Just say it out loud.</div>
          <div className="p-mic my-4"><span className="ring" /><span className="ring b" />
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1d1810" strokeWidth="2.2"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
          </div>
          <div className="p-wave"><span /><span /><span /><span /><span /><span /></div>
          <div className="mt-3 bg-white border border-[#e9e1d0] rounded-xl px-3 py-2 text-[12px] font-semibold text-left leading-snug" style={{ color: '#3f3a2e' }}>
            "My front desk is buried in scheduling calls. We miss half of them…"
          </div>
        </div>
      </div>
    ),
  },
  // 3 — UNDERSTAND
  {
    egg: '🐥', cap: 'It gets it',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐥" phase="Understand" pct={48} />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-3xl">🐥</div>
          <div className="font-extrabold text-lg mt-1 tracking-tight">Here's what I'm hearing.</div>
          <div className="w-full mt-3 bg-henway-egg border border-henway-eggline rounded-xl px-3 py-2.5 text-left">
            <div className="text-[9px] font-extrabold uppercase tracking-wider" style={{ color: '#7a7360' }}>Your problem</div>
            <div className="text-[12.5px] font-bold mt-0.5" style={{ color: '#1d1810' }}>Booking eats the front desk's day, and no-shows still slip through.</div>
          </div>
          <div className="w-full mt-2 bg-henway-yellow text-black rounded-xl py-2 text-[12px] font-extrabold">That's it →</div>
          <div className="text-[11px] mt-2 font-semibold" style={{ color: '#a89f88' }}>Not quite? Redo.</div>
        </div>
      </div>
    ),
  },
  // 4 — FOCUS: propose
  {
    egg: '🐤', cap: 'You react',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐤" phase="Focus" pct={66} />
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center"><div className="font-extrabold text-lg tracking-tight">Here's what "great" looks like</div><div className="text-[12px] mt-1 font-semibold" style={{ color: '#7a7360' }}>Pick the one that fits.</div></div>
          <div className="mt-2.5 border-2 border-henway-yellow bg-henway-yellow/[0.06] rounded-2xl p-2.5">
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-henway-gold mb-1.5">A few directions</div>
            <div className="rounded-lg border-2 border-henway-yellow bg-white px-2.5 py-2 text-[12px] font-extrabold">Auto-fill from a waitlist + text alerts<span className="block text-[10px] font-medium mt-0.5" style={{ color: '#7a7360' }}>Fills empty spots on its own</span></div>
            <div className="rounded-lg border border-[#e9e1d0] bg-white px-2.5 py-2 text-[12px] font-semibold mt-1.5" style={{ color: '#6b6353' }}>A public "open spots" page</div>
            <div className="rounded-lg border border-[#e9e1d0] bg-white px-2.5 py-2 text-[12px] font-semibold mt-1.5" style={{ color: '#6b6353' }}>Reminders + no-show alerts</div>
          </div>
        </div>
      </div>
    ),
  },
  // 5 — SEE IT: the money screen. A REAL app, in its OWN look (not Henway).
  {
    egg: '🐔', cap: 'Your idea, alive',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐔" phase="See it" pct={86} />
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center mb-2"><div className="font-extrabold text-[15px] tracking-tight">🐣 Here it is. <span className="text-henway-gold">Your idea, alive.</span></div></div>
          {/* a real, generated app — its own dark professional UI */}
          <div className="rounded-xl overflow-hidden shadow-lg" style={{ border: '1px solid #24303f' }}>
            <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#151d29' }}>
              <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: '#3aa981' }} />
              <span className="text-[12px] font-extrabold" style={{ color: '#eef2f7' }}>DeskFill</span>
              <span className="ml-auto text-[9px] font-bold" style={{ color: '#7c8aa0' }}>Today</span>
            </div>
            <div className="px-3 py-2.5 flex flex-col gap-1.5" style={{ background: '#1c2635' }}>
              <div className="flex items-center justify-between rounded-lg px-2.5 py-1.5" style={{ background: '#233043' }}>
                <span className="text-[11px] font-bold" style={{ color: '#cdd7e5' }}>6:00 · Spin</span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full" style={{ background: '#2a3a1e', color: '#a3d977' }}>Auto-filled ✓</span>
              </div>
              <div className="flex items-center justify-between rounded-lg px-2.5 py-1.5" style={{ background: '#233043' }}>
                <span className="text-[11px] font-bold" style={{ color: '#cdd7e5' }}>7:30 · Yoga</span>
                <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full" style={{ background: '#3a3320', color: '#e6c766' }}>2 on waitlist</span>
              </div>
              <div className="text-center text-[11px] font-extrabold rounded-lg py-1.5 mt-0.5" style={{ background: '#3aa981', color: '#06231a' }}>Text the waitlist</div>
            </div>
          </div>
          <div className="text-center text-[10px] mt-2 font-semibold" style={{ color: '#a89f88' }}>A real preview, made from what you said.</div>
        </div>
      </div>
    ),
  },
  // 6 — COOP: kit + you're a Hen
  {
    egg: '🐔', cap: 'You keep it',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐔" phase="The Coop" pct={100} />
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center"><div className="font-extrabold text-[15px] tracking-tight">You hatched it. <span className="text-henway-gold">You're a Hen.</span></div></div>
          <div className="mt-2.5 border-2 border-henway-yellow bg-henway-yellow/[0.06] rounded-2xl p-3">
            <div className="flex items-center gap-2 mb-1.5"><span className="text-[9px] font-extrabold uppercase tracking-wider text-henway-gold">Henway recommends</span><span className="ml-auto text-[9px] font-extrabold uppercase tracking-wide text-henway-charcoal/40">Fast build</span></div>
            <div className="font-extrabold text-[13px] mb-1.5">🧭 Build on Lovable</div>
            <div className="relative">
              <p className="font-mono text-[10.5px] leading-relaxed blur-[3px] select-none" style={{ color: '#6b6353' }}>"Build a web app called DeskFill that auto-fills open class slots from a waitlist and texts reminders…"</p>
              <div className="absolute inset-0 flex items-center justify-center rounded" style={{ background: 'linear-gradient(rgba(251,247,239,.2),rgba(251,247,239,.9))' }}>
                <span className="inline-flex gap-1 items-center bg-henway-ink text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full">🔒 Your build message</span>
              </div>
            </div>
          </div>
          <div className="text-center text-[10px] font-extrabold text-henway-gold mt-2.5">Message + tool + brief. Saved.</div>
        </div>
      </div>
    ),
  },
];

export default function JourneyPlayer() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce.current) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setI((n) => (n + 1) % screens.length), DUR);
    return () => window.clearTimeout(id);
  }, [i, playing]);

  const jump = (n: number) => { setPlaying(false); setI((n + screens.length) % screens.length); };
  const prev = () => jump(i - 1);
  const next = () => jump(i + 1);

  return (
    <div className="flex flex-col items-center">
      {/* egg -> hen ribbon = the scrubber */}
      <div className="hatch-ribbon mb-8 w-full max-w-lg">
        {screens.map((s, n) => (
          <Fragment key={n}>
            <button
              onClick={() => jump(n)}
              aria-label={`Step ${n + 1}: ${s.cap}`}
              className={`text-2xl shrink-0 transition-transform ${n === i ? 'scale-125' : 'opacity-45 hover:opacity-80'}`}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >{s.egg}</button>
            {n < screens.length - 1 && (
              <div className="hbar"><i style={{ width: n < i ? '100%' : '0%' }} /></div>
            )}
          </Fragment>
        ))}
      </div>

      {/* the device — tap to advance */}
      <div className="phone cursor-pointer" onClick={next} role="button" aria-label="Next step">
        <div className="notch" />
        <div className="screen" style={{ minHeight: 470 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.35 }}
              className="h-full"
              style={{ minHeight: 426 }}
            >
              {screens[i].render()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* caption */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`cap${i}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-center"
        >
          <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-henway-ink">{screens[i].cap}</div>
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-henway-gold mt-1">Step {i + 1} of {screens.length}</div>
        </motion.div>
      </AnimatePresence>

      {/* controls */}
      <div className="mt-5 flex items-center gap-3">
        <button onClick={prev} aria-label="Previous step" className="w-11 h-11 rounded-full border-2 border-henway-border bg-white text-henway-ink flex items-center justify-center text-lg font-extrabold hover:border-henway-yellow transition-colors active:scale-95">‹</button>
        <button onClick={() => setPlaying((p) => !p)} className="h-11 px-5 rounded-full bg-henway-yellow text-black flex items-center gap-2 text-sm font-extrabold active:scale-95 transition-transform">
          {playing ? <><span className="text-xs">❚❚</span> Pause</> : <><span className="text-xs">▶</span> Play</>}
        </button>
        <button onClick={next} aria-label="Next step" className="w-11 h-11 rounded-full border-2 border-henway-border bg-white text-henway-ink flex items-center justify-center text-lg font-extrabold hover:border-henway-yellow transition-colors active:scale-95">›</button>
      </div>
      <p className="mt-3 text-xs font-semibold text-henway-charcoal/45">Tap the screen, or use the arrows, to move through it.</p>
    </div>
  );
}
