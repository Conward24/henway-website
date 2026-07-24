/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState, Fragment } from 'react';
import { motion, AnimatePresence } from 'motion/react';

/* The "journey player" — the full 10-scene Henway story, auto-playing so people
   SEE the transformation instead of reading it. One consistent NON-regulated
   story: a fitness studio front desk -> the real "BookFill" app. Scene 2/7/9
   markup ported from the approved mockups (journey-mockups/corrected-scenes.html);
   captions are Michael's deck copy. The egg->hen ribbon shows phase progress and
   is a clickable scrubber (jumps to a phase); prev/next + tap advance scene by
   scene. Pauses for reduced-motion. */

type Scene = { phase: number; cap: string; sub?: string; render: () => JSX.Element };

const DUR = 6000;      // ms per scene
const DUR_MONEY = 8500; // scene 7 (the payoff) holds longer

// 5-stage hatch ribbon; each scene maps to one phase index.
const STAGES = ['🥚', '🐣', '🐥', '🐤', '🐔'];
const PHASES = ['Listen', 'Understand', 'Focus', 'Hatch', 'Coop'];

function Bar({ pct }: { pct: number }) {
  return <div className="p-bar"><i style={{ width: `${pct}%` }} /></div>;
}
function Head({ egg, label, pct }: { egg: string; label: string; pct: number }) {
  return (
    <>
      <div className="flex items-center gap-2"><span className="text-lg">{egg}</span><Bar pct={pct} /></div>
      <div className="text-[9px] font-extrabold tracking-[0.14em] uppercase text-henway-gold ml-6 mt-1">{label}</div>
    </>
  );
}

const scenes: Scene[] = [
  // 1 — START ANYWHERE (fork)
  {
    phase: 0, cap: 'Start anywhere',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐥" label="Listen" pct={8} />
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
  // 2 — TALK, TYPE, OR CHOOSE (merged mic + trending) — ported from corrected-scenes.html
  {
    phase: 0, cap: 'Talk, type, or choose',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐣" label="Listen" pct={22} />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="font-extrabold text-[16px] tracking-tight leading-tight">What do you keep wishing was easier?</div>
          <div className="p-mic my-3"><span className="ring" /><span className="ring b" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1d1810" strokeWidth="2.2"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
          </div>
          <div className="text-[11px] font-bold" style={{ color: '#7a7360' }}>Tap to talk</div>
          <div className="text-[8.5px] font-extrabold uppercase tracking-[0.1em] mt-2.5 mb-1" style={{ color: '#a89f88' }}>or tap what fits</div>
          <div className="w-full bg-white border border-[#e9e1d0] rounded-[10px] px-2.5 py-2 text-[11px] font-bold text-left whitespace-nowrap overflow-hidden">My front desk is buried in booking calls</div>
          <div className="w-full bg-white border border-[#e9e1d0] rounded-[10px] px-2.5 py-2 text-[11px] font-bold text-left whitespace-nowrap overflow-hidden mt-1.5">No-shows cost us money every week</div>
          <div className="w-full text-left text-[8.5px] font-extrabold uppercase tracking-[0.05em] text-henway-gold mt-3 mb-0.5">🔥 Trending in fitness studio</div>
          <div className="w-full flex justify-between items-center gap-2 bg-[#fffaf0] border border-[#ffe9b0] rounded-[9px] px-2.5 py-2 text-[10px] font-bold mt-1.5 whitespace-nowrap"><span className="overflow-hidden text-ellipsis">Auto-fill classes from a waitlist</span><span className="text-henway-gold font-extrabold flex-none">Start →</span></div>
          <div className="w-full flex justify-between items-center gap-2 bg-[#fffaf0] border border-[#ffe9b0] rounded-[9px] px-2.5 py-2 text-[10px] font-bold mt-1.5 whitespace-nowrap"><span className="overflow-hidden text-ellipsis">Class reminders + no-show alerts</span><span className="text-henway-gold font-extrabold flex-none">Start →</span></div>
          <div className="text-[8.5px] mt-3 font-semibold" style={{ color: '#a89f88' }}>🔒 Your ideas stay yours. Henway never trains on them.</div>
        </div>
      </div>
    ),
  },
  // 3 — HENWAY LISTENS (reflect)
  {
    phase: 1, cap: 'Henway listens',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐥" label="Understand" pct={36} />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-3xl">🐥</div>
          <div className="font-extrabold text-lg mt-1 tracking-tight">Here's what I'm hearing.</div>
          <div className="w-full mt-3 bg-henway-egg border border-henway-eggline rounded-xl px-3 py-2.5 text-left">
            <div className="text-[9px] font-extrabold uppercase tracking-wider" style={{ color: '#7a7360' }}>Your problem</div>
            <div className="text-[12.5px] font-bold mt-0.5" style={{ color: '#1d1810' }}>Booking and no-shows eat the front desk's day, and nothing fills the empty spots.</div>
          </div>
          <div className="w-full mt-2 bg-henway-yellow text-black rounded-xl py-2 text-[12px] font-extrabold">That's it →</div>
          <div className="text-[11px] mt-2 font-semibold" style={{ color: '#a89f88' }}>Not quite? Redo.</div>
        </div>
      </div>
    ),
  },
  // 4 — AND HENWAY UNDERSTANDS (react / win)
  {
    phase: 1, cap: 'Just react to it',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐥" label="Understand" pct={48} />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="font-extrabold text-lg tracking-tight">What would make it a win?</div>
          <div className="text-[11.5px] mt-1 font-semibold" style={{ color: '#7a7360' }}>Tap what matters. It shapes your build.</div>
          <div className="flex gap-1.5 justify-center my-3">
            {['🥚', '🥚', '🥚'].map((e, k) => (
              <span key={k} className="w-6 h-8 grid place-items-center text-[13px] rounded-[50%_50%_48%_48%/60%_60%_40%_40%]" style={{ background: k === 0 ? 'linear-gradient(160deg,#fff2c0,#ffd451)' : '#efe7d6', border: `1.5px solid ${k === 0 ? '#ffcc00' : '#dcd2bd'}` }}>{e}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            <span className="bg-henway-yellow border-2 border-henway-yellow rounded-full px-3 py-1.5 text-[11.5px] font-extrabold text-black">Save time</span>
            <span className="bg-white border-[1.5px] border-[#e9e1d0] rounded-full px-3 py-1.5 text-[11.5px] font-extrabold" style={{ color: '#6b6353' }}>More bookings</span>
            <span className="bg-white border-[1.5px] border-[#e9e1d0] rounded-full px-3 py-1.5 text-[11.5px] font-extrabold" style={{ color: '#6b6353' }}>Fewer no-shows</span>
          </div>
          <div className="text-[11px] mt-3 font-bold" style={{ color: '#a89f88' }}>or type your own…</div>
        </div>
      </div>
    ),
  },
  // 5 — FOCUS ON THE DETAILS (shape)
  {
    phase: 2, cap: 'Focus on the details',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐤" label="Focus" pct={60} />
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center"><div className="font-extrabold text-lg tracking-tight">Here's the shape of it.</div><div className="text-[11.5px] mt-1 font-semibold" style={{ color: '#7a7360' }}>I narrowed it to the one thing to build first.</div></div>
          <div className="mt-2.5 border-2 border-henway-yellow bg-henway-yellow/[0.06] rounded-2xl p-3">
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-henway-gold mb-1">Your build</div>
            <div className="text-[12.5px] font-bold" style={{ color: '#1d1810' }}>A booking app that fills open class spots from a waitlist and texts reminders, on its own.</div>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2.5 justify-center">
            {['Automation', 'Bookings', 'Reminders'].map((t) => <span key={t} className="bg-white border border-[#e9e1d0] rounded-full px-2.5 py-1 text-[10px] font-extrabold" style={{ color: '#6b6353' }}>{t}</span>)}
          </div>
        </div>
      </div>
    ),
  },
  // 6 — HATCH YOUR NEW IDEA (hatching animation)
  {
    phase: 3, cap: 'Hatch your new idea',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐤" label="Hatch" pct={72} />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.div className="text-5xl" animate={{ rotate: [-7, 7, -7] }} transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}>🐣</motion.div>
          <div className="font-extrabold text-lg mt-3 tracking-tight">Hatching your build…</div>
          <div className="text-[12px] mt-1 font-semibold" style={{ color: '#7a7360' }}>Turning your answers into a real build.</div>
          <div className="w-32 h-1.5 rounded-full bg-henway-egg overflow-hidden mt-4">
            <motion.div className="h-full bg-henway-yellow rounded-full" animate={{ width: ['10%', '90%'] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} />
          </div>
        </div>
      </div>
    ),
  },
  // 7 — SEE YOUR IDEA COME ALIVE (BookFill) — ported from corrected-scenes.html
  {
    phase: 4, cap: 'See your idea come alive',
    render: () => (
      <div className="flex flex-col h-full">
        <div className="pb-0">
          <Head egg="🐔" label="See it" pct={84} />
          <div className="text-center font-extrabold text-[14px] tracking-tight mt-2">🐣 Here it is. <span className="text-henway-gold">Your idea, alive.</span></div>
        </div>
        {/* BookFill — a real app in its OWN indigo palette, directly in the phone */}
        <div className="bg-white -mx-[18px] px-4 pt-2.5 flex-1 mt-2">
          <div className="flex justify-between items-start">
            <div><div className="text-[13px] font-extrabold" style={{ color: '#241a4d' }}>BookFill</div><div className="text-[9px]" style={{ color: '#8a97a8' }}>Tuesday · Studio 9</div></div>
            <span className="w-5 h-5 rounded-full grid place-items-center text-[8px] font-extrabold" style={{ background: '#e6e2fb', color: '#5b4fd6' }}>S9</span>
          </div>
          <div className="flex gap-1.5 mt-2">
            <span className="text-[9px] font-extrabold px-2.5 py-0.5 rounded-full text-white" style={{ background: '#5b4fd6' }}>Tonight</span>
            <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: '#eef1f5', color: '#8a97a8' }}>Classes</span>
            <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: '#eef1f5', color: '#8a97a8' }}>Members</span>
          </div>
          <div className="rounded-lg px-2.5 py-1.5 text-[9.5px] font-bold mt-2 flex items-center gap-1.5" style={{ background: '#241a4d', color: '#d7d2f5' }}><span className="w-1.5 h-1.5 rounded-full" style={{ background: '#8b7ff0' }} /> Auto-filled 3 open spots from the waitlist.</div>
          <div className="text-[8.5px] font-extrabold tracking-wider mt-3 mb-1.5" style={{ color: '#9aa6b5' }}>TONIGHT'S CLASSES</div>
          <div className="rounded-[11px] p-2.5 mb-1.5" style={{ background: '#fff', border: '1px solid #eef1f5', boxShadow: '0 1px 3px rgba(20,40,70,.05)' }}>
            <div className="flex justify-between"><div><div className="text-[11.5px] font-extrabold" style={{ color: '#241a4d' }}>6:00 · Spin</div><div className="text-[9px]" style={{ color: '#8a97a8' }}>Studio A · Kim</div></div><span className="text-[8.5px] font-extrabold px-2 py-0.5 rounded-md" style={{ background: '#e6e2fb', color: '#5b4fd6' }}>Full</span></div>
            <div className="flex gap-2.5 text-[8.5px] font-bold mt-1"><span style={{ color: '#5b4fd6' }}>● 2 filled from waitlist</span><span style={{ color: '#3a9d8c' }}>Reminders sent</span></div>
            <div className="flex gap-1.5 mt-1.5"><span className="flex-1 text-center text-[9px] font-extrabold rounded-md py-1.5" style={{ border: '1px solid #ded9f5', color: '#6a6288' }}>Roster</span><span className="flex-1 text-center text-[9px] font-extrabold rounded-md py-1.5 text-white" style={{ background: '#5b4fd6' }}>Text waitlist</span></div>
          </div>
          <div className="rounded-[11px] p-2.5" style={{ background: '#fff', border: '1px solid #eef1f5' }}>
            <div className="flex justify-between"><div><div className="text-[11.5px] font-extrabold" style={{ color: '#241a4d' }}>7:30 · Yoga</div><div className="text-[9px]" style={{ color: '#8a97a8' }}>Studio B · Sam</div></div><span className="text-[8.5px] font-bold px-2 py-0.5 rounded-md" style={{ background: '#eef1f5', color: '#8a97a8' }}>4 spots</span></div>
            <div className="flex gap-2.5 text-[8.5px] font-bold mt-1"><span style={{ color: '#c98a2e' }}>● Waitlist notified</span><span style={{ color: '#8a97a8' }}>Filling…</span></div>
          </div>
          <div className="text-center text-[9px] py-2.5 font-semibold leading-snug" style={{ color: '#a89f88' }}>A real preview, made just now from what you said. Not the finished build yet, but this is yours.</div>
        </div>
      </div>
    ),
  },
  // 8 — YOU KEEP IT (build kit)
  {
    phase: 4, cap: 'You keep it',
    sub: 'Copy the message to build in the right tool for you.',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐔" label="Your build kit" pct={90} />
        <div className="flex-1 flex flex-col justify-center text-center">
          <div className="text-3xl">🐔</div>
          <div className="font-extrabold text-[15px] mt-1 tracking-tight">Your build's ready.</div>
          <div className="text-[11px] mt-1 font-semibold" style={{ color: '#7a7360' }}>🔒 This build is yours. We never train on your work.</div>
          <div className="mt-2.5 rounded-xl border border-[#e9e1d0] bg-white p-2.5 text-left">
            <p className="font-mono text-[10px] leading-relaxed" style={{ color: '#6b6353' }}>"Build a web app called BookFill that fills open class spots from a waitlist, texts reminders, and shows tonight's schedule the front desk can edit in seconds…"</p>
          </div>
          <div className="mt-2 bg-henway-yellow text-black rounded-xl py-2.5 text-[12px] font-extrabold flex items-center justify-center gap-1.5">📋 Copy build message</div>
          <div className="text-[10px] mt-2 font-semibold" style={{ color: '#a89f88' }}>See the full brief · PDF · Save</div>
        </div>
      </div>
    ),
  },
  // 9 — WE RESEARCH THE BEST TOOL (Lovable) — ported from corrected-scenes.html
  {
    phase: 4, cap: 'The right tool for you',
    sub: 'So you can go make it real.',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐔" label="See it" pct={95} />
        <div className="flex-1 flex flex-col justify-center text-center">
          <div className="text-3xl">🐥</div>
          <div className="font-extrabold text-lg mt-1 tracking-tight">Let's make it real.</div>
          <div className="text-[11.5px] mt-1 font-semibold" style={{ color: '#7a7360' }}>About 7 minutes. I'll set you up with the best fit.</div>
          <div className="mt-2.5 rounded-2xl border border-[#e9e1d0] bg-white p-3 text-left">
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-henway-gold">Best tool for you</div>
            <div className="text-[14px] font-extrabold mt-0.5" style={{ color: '#1d1810' }}>🧭 Lovable</div>
            <div className="text-[10.5px] mt-1 leading-snug" style={{ color: '#7a7360' }}>Great for a non-coder building a real app with logins, bookings, and reminders. The fastest way to get your first version live.</div>
          </div>
          <div className="mt-2 rounded-xl px-3 py-2 text-left text-[10px] leading-snug" style={{ background: '#f4f0e6', border: '1px solid #e6ddca', color: '#6b6353' }}><b style={{ color: '#5a4d33' }}>Worth knowing:</b> build and preview for free. You only upgrade when you're ready to share it.</div>
          <div className="mt-2.5 bg-henway-yellow text-black rounded-xl py-2.5 text-[12px] font-extrabold">Copy my prompt</div>
        </div>
      </div>
    ),
  },
  // 10 — JOIN THE COOP
  {
    phase: 4, cap: 'Join the Coop',
    sub: 'Join Henway.',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐔" label="The Coop" pct={100} />
        <div className="flex-1 flex flex-col justify-center text-center">
          <div className="text-3xl">🐔</div>
          <div className="font-extrabold text-[15px] mt-1 tracking-tight">Welcome to the Coop.</div>
          <div className="text-[11.5px] mt-1 font-semibold" style={{ color: '#7a7360' }}>You're a Hen now. Come back and hatch another.</div>
          <div className="flex gap-2 mt-3">
            <div className="flex-1 rounded-xl border border-henway-eggline bg-henway-egg/50 py-2"><div className="font-mono text-lg font-bold text-henway-gold leading-none">1</div><div className="text-[8px] font-extrabold uppercase tracking-wide mt-1" style={{ color: '#7a7360' }}>Hatched</div></div>
            <div className="flex-1 rounded-xl border border-henway-eggline bg-henway-egg/50 py-2"><div className="font-mono text-lg font-bold text-henway-gold leading-none">🔥1</div><div className="text-[8px] font-extrabold uppercase tracking-wide mt-1" style={{ color: '#7a7360' }}>Streak</div></div>
            <div className="flex-1 rounded-xl border-2 border-henway-yellow bg-henway-yellow/10 py-2"><div className="font-mono text-lg font-bold text-henway-gold leading-none">+1</div><div className="text-[8px] font-extrabold uppercase tracking-wide mt-1" style={{ color: '#7a7360' }}>Coop pts</div></div>
          </div>
          <div className="mt-3 rounded-xl px-3 py-2.5" style={{ background: 'linear-gradient(135deg,#fff6d6,#ffe7a3)', border: '1px solid #ffe38a' }}>
            <div className="text-[11px] font-extrabold" style={{ color: '#1d1810' }}>💛 Bring a friend to the Coop</div>
            <div className="text-[9.5px]" style={{ color: '#7a6a3a' }}>You both unlock a free Pro build.</div>
          </div>
          <div className="mt-2.5 bg-henway-yellow text-black rounded-xl py-2.5 text-[12px] font-extrabold">Hatch another 🐣</div>
        </div>
      </div>
    ),
  },
];

export default function JourneyPlayer() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce.current) setPlaying(false);
  }, []);

  // Don't start the journey until it's actually scrolled into view, so people
  // see it from scene 1 instead of arriving mid-way.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setInView(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) setInView(true); },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing || !inView) return;
    const dur = i === 6 ? DUR_MONEY : DUR;
    const id = window.setTimeout(() => setI((n) => (n + 1) % scenes.length), dur);
    return () => window.clearTimeout(id);
  }, [i, playing, inView]);

  const go = (n: number) => { setPlaying(false); setI((n + scenes.length) % scenes.length); };
  const prev = () => go(i - 1);
  const next = () => go(i + 1);
  // clicking a phase egg jumps to that phase's first scene
  const jumpPhase = (p: number) => { const idx = scenes.findIndex((s) => s.phase === p); if (idx >= 0) go(idx); };

  const curPhase = scenes[i].phase;

  return (
    <div ref={rootRef} className="flex flex-col items-center">
      {/* egg -> hen ribbon = phase progress + scrubber */}
      <div className="hatch-ribbon mb-8 w-full max-w-md">
        {STAGES.map((egg, p) => (
          <Fragment key={p}>
            <button
              onClick={() => jumpPhase(p)}
              aria-label={`Phase: ${PHASES[p]}`}
              className={`text-2xl shrink-0 transition-transform ${p === curPhase ? 'scale-125' : p < curPhase ? 'opacity-90' : 'opacity-40 hover:opacity-70'}`}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >{egg}</button>
            {p < STAGES.length - 1 && (
              <div className="hbar"><i style={{ width: p < curPhase ? '100%' : '0%' }} /></div>
            )}
          </Fragment>
        ))}
      </div>

      {/* the device — tap to advance */}
      <div className="phone cursor-pointer" onClick={next} role="button" aria-label="Next step">
        <div className="notch" />
        <div className="screen" style={{ minHeight: 500 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.35 }}
              className="h-full"
              style={{ minHeight: 456 }}
            >
              {scenes[i].render()}
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
          className="mt-6 text-center max-w-sm"
        >
          <div className="text-2xl md:text-3xl font-extrabold tracking-tight text-henway-ink">{scenes[i].cap}</div>
          {scenes[i].sub && <div className="text-sm text-henway-charcoal/60 mt-1 font-semibold">{scenes[i].sub}</div>}
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-henway-gold mt-1.5">Step {i + 1} of {scenes.length}</div>
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
