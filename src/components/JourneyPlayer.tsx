/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* The "journey player": a device that auto-plays through the Henway flow so
   people SEE the transformation (talk -> build kit) instead of reading it.
   Clean on-brand recreations of the real screens. The egg->hen ribbon is the
   scrubber: click a step to jump. Auto-play pauses on interaction and for
   reduced-motion. */

type Screen = { egg: string; cap: string; render: () => JSX.Element };

const DUR = 6000; // ms per screen — slow enough to actually read

function Bar({ pct }: { pct: number }) {
  return <div className="p-bar"><i style={{ width: `${pct}%` }} /></div>;
}

const screens: Screen[] = [
  {
    egg: '🐣', cap: 'You talk',
    render: () => (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2"><span className="text-lg">🐣</span><Bar pct={18} /></div>
        <div className="text-[9px] font-extrabold tracking-[0.14em] uppercase text-henway-gold ml-6 mt-1">Listen</div>
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-4xl">🐥</div>
          <div className="font-extrabold text-base mt-2">What's slowing you down?</div>
          <div className="p-mic my-4"><span className="ring" /><span className="ring b" />
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1d1810" strokeWidth="2.2"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
          </div>
          <div className="p-wave"><span /><span /><span /><span /><span /><span /></div>
          <div className="mt-3 bg-white border border-[#e9e1d0] rounded-xl px-3 py-2 text-[12px] font-semibold text-left leading-snug" style={{ color: '#3f3a2e' }}>
            "I run a fitness studio. My team wastes hours booking classes and chasing no-shows…"
          </div>
        </div>
      </div>
    ),
  },
  {
    egg: '🐥', cap: 'It gets it',
    render: () => (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2"><span className="text-lg">🐥</span><Bar pct={40} /></div>
        <div className="text-[9px] font-extrabold tracking-[0.14em] uppercase text-henway-gold ml-6 mt-1">Understand</div>
        <div className="flex-1 flex flex-col justify-center gap-2">
          <div className="self-end bg-henway-ink text-white rounded-2xl rounded-br-sm px-3 py-2 text-[12px] max-w-[82%]">Last-minute cancellations. Empty spots we could fill.</div>
          <div className="self-start bg-white border border-[#e9e1d0] rounded-2xl rounded-bl-sm px-3 py-2 text-[12px] max-w-[86%]" style={{ color: '#1d1810' }}>So the real problem is <b>filling open spots fast</b>, not the calendar itself. Who books today, a person or software?</div>
          <div className="self-end bg-henway-ink text-white rounded-2xl rounded-br-sm px-3 py-2 text-[12px] max-w-[82%]">A person, by text. It's slow.</div>
          <div className="mt-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-henway-gold"><span>🐥</span> Henway is listening</div>
        </div>
      </div>
    ),
  },
  {
    egg: '🐤', cap: 'You react',
    render: () => (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2"><span className="text-lg">🐤</span><Bar pct={62} /></div>
        <div className="text-[9px] font-extrabold tracking-[0.14em] uppercase text-henway-gold ml-6 mt-1">Focus</div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="font-extrabold text-base mb-1">Here's what "great" looks like</div>
          <div className="text-[11px] mb-2" style={{ color: '#7a7360' }}>Pick the one that fits. No wrong answer.</div>
          <div className="rounded-xl border-2 border-henway-yellow bg-henway-yellow/10 px-3 py-2.5 text-[12px] font-bold flex items-center gap-2">
            <span>✓</span> Auto-fill from a waitlist + text alerts
          </div>
          <div className="rounded-xl border border-[#e9e1d0] bg-white px-3 py-2.5 text-[12px] font-semibold mt-1.5" style={{ color: '#6b6353' }}>A public "open spots" page</div>
          <div className="rounded-xl border border-[#e9e1d0] bg-white px-3 py-2.5 text-[12px] font-semibold mt-1.5" style={{ color: '#6b6353' }}>Membership + credits system</div>
        </div>
      </div>
    ),
  },
  {
    egg: '🐔', cap: 'It builds',
    render: () => (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2"><span className="text-lg">🐔</span><Bar pct={82} /></div>
        <div className="text-[9px] font-extrabold tracking-[0.14em] uppercase text-henway-gold ml-6 mt-1">See it</div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="rounded-xl border border-[#e9e1d0] overflow-hidden shadow-sm">
            <div className="bg-henway-yellow text-black px-3 py-1.5 text-[11px] font-extrabold flex items-center justify-between"><span>BookFill</span><span className="opacity-60">•••</span></div>
            <div className="bg-white p-3 flex flex-col gap-1.5">
              <div className="h-2.5 rounded bg-henway-egg w-2/3" />
              <div className="rounded-lg bg-henway-egg/60 h-8 flex items-center px-2 text-[10px] font-bold" style={{ color: '#6b6353' }}>3 open spots tonight</div>
              <div className="rounded-lg border border-henway-yellow bg-henway-yellow/10 h-8 flex items-center px-2 text-[10px] font-extrabold" style={{ color: '#1d1810' }}>Text the waitlist →</div>
              <div className="h-2 rounded bg-henway-egg w-1/2" />
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] font-bold" style={{ color: '#7a7360' }}>
            <span className="inline-block w-2 h-2 rounded-full bg-[#2e8b57] animate-pulse" /> Building your live preview…
          </div>
        </div>
      </div>
    ),
  },
  {
    egg: '🐔', cap: 'You keep it',
    render: () => (
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-2"><span className="text-lg">🐔</span><Bar pct={100} /></div>
        <div className="text-[9px] font-extrabold tracking-[0.14em] uppercase text-henway-gold ml-6 mt-1">Your build kit</div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="rounded-xl border-2 border-henway-yellow bg-henway-yellow/[0.06] p-3">
            <div className="flex items-center gap-2 mb-1.5"><span className="text-[10px] font-extrabold uppercase tracking-wider text-henway-gold">Henway recommends</span><span className="ml-auto text-[9px] font-extrabold uppercase tracking-wide text-henway-charcoal/40">Fast build</span></div>
            <div className="font-extrabold text-[13px] mb-1.5">🧭 Build on Lovable</div>
            <div className="relative">
              <p className="font-mono text-[10.5px] leading-relaxed blur-[3px] select-none" style={{ color: '#6b6353' }}>"Build a web app called BookFill that auto-fills class cancellations from a waitlist and texts reminders…"</p>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded" style={{ background: 'linear-gradient(rgba(251,247,239,.2),rgba(251,247,239,.9))' }}>
                <span className="inline-flex gap-1 items-center bg-henway-ink text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full">🔒 Your build message</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5 mt-3 text-[11px] font-extrabold text-henway-gold"><span>🐔</span> Message + tool + brief. Ready.</div>
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
      <div className="hatch-ribbon mb-8 w-full max-w-md">
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
        <div className="screen" style={{ minHeight: 460 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.35 }}
              className="h-full"
              style={{ minHeight: 416 }}
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

      {/* controls: prev / play-pause / next */}
      <div className="mt-5 flex items-center gap-3">
        <button
          onClick={prev}
          aria-label="Previous step"
          className="w-11 h-11 rounded-full border-2 border-henway-border bg-white text-henway-ink flex items-center justify-center text-lg font-extrabold hover:border-henway-yellow transition-colors active:scale-95"
        >‹</button>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="h-11 px-5 rounded-full bg-henway-yellow text-black flex items-center gap-2 text-sm font-extrabold active:scale-95 transition-transform"
        >
          {playing ? <><span className="text-xs">❚❚</span> Pause</> : <><span className="text-xs">▶</span> Play</>}
        </button>
        <button
          onClick={next}
          aria-label="Next step"
          className="w-11 h-11 rounded-full border-2 border-henway-border bg-white text-henway-ink flex items-center justify-center text-lg font-extrabold hover:border-henway-yellow transition-colors active:scale-95"
        >›</button>
      </div>
      <p className="mt-3 text-xs font-semibold text-henway-charcoal/45">Tap the screen, or use the arrows, to move through it.</p>
    </div>
  );
}
