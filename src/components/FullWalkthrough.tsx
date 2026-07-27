/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/* Full walkthrough — the ENTIRE Henway journey as a self-paced CLICKTHROUGH:
   one screen at a time in a single phone, advanced with the arrows, the step
   dots, or a tap on the screen (matches the interactive player on the homepage
   and the consultant flow, instead of a long vertical scroll). Phone mocks: the
   markup and warm palette mirror JourneyPlayer.tsx exactly, so the screens feel
   identical to the approved player. One consistent NON-regulated story: a
   fitness studio front desk -> the real "BookFill" app. Copy is lifted from the
   real prototype (henway-journey-full-flow.html). */

import { useState, useEffect, useRef, Fragment } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// 5-stage hatch ribbon (same as the homepage player); each step maps to a phase.
const STAGES = ['🥚', '🐣', '🐥', '🐤', '🐔'];
const PHASES = ['Listen', 'Understand', 'Focus', 'Hatch', 'Coop'];
const PHASE_OF = [0, 0, 0, 1, 1, 2, 3, 3, 3, 3, 4]; // one per step, in order

// --- small helpers, matched to JourneyPlayer's phone header ---
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

type Step = { title: string; blurb: string; render: () => JSX.Element };

const steps: Step[] = [
  // 1 — FORK
  {
    title: 'Start anywhere',
    blurb: 'You do not need a polished idea. Pick whether you are fixing a headache at work or building something new, and Henway takes it from there.',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐣" label="Listen" pct={8} />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-4xl">🐣</div>
          <div className="font-extrabold text-lg mt-2 tracking-tight">What brings you here?</div>
          <div className="text-[12px] mt-1 font-semibold" style={{ color: '#7a7360' }}>You don't need a big idea to start.</div>
          <div className="w-full mt-3 bg-white border border-[#e9e1d0] rounded-xl p-3 text-center shadow-sm"><div className="text-lg">🛠️</div><div className="font-extrabold text-[13px] mt-0.5">Fix something at work</div><div className="text-[11px]" style={{ color: '#7a7360' }}>A problem in your job or business</div></div>
          <div className="w-full mt-2 bg-white border border-[#e9e1d0] rounded-xl p-3 text-center shadow-sm"><div className="text-lg">💡</div><div className="font-extrabold text-[13px] mt-0.5">Build an idea I have</div><div className="text-[11px]" style={{ color: '#7a7360' }}>Something you wish existed</div></div>
        </div>
      </div>
    ),
  },
  // 2 — YOUR WORLD (industry)
  {
    title: 'Your world',
    blurb: 'Tell Henway your industry so it speaks in your day, not generic tech talk. The whole flow tailors itself to how your business actually runs.',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐣" label="Listen" pct={16} />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-3xl">🐣</div>
          <div className="font-extrabold text-lg mt-1 tracking-tight">What's your world?</div>
          <div className="text-[11.5px] mt-1 font-semibold" style={{ color: '#7a7360' }}>So I can talk about your day, not everyone's.</div>
          <div className="grid grid-cols-2 gap-2 w-full mt-3">
            {[
              { e: '🩺', n: 'Healthcare clinic' },
              { e: '💇', n: 'Salon / spa' },
              { e: '🍽️', n: 'Restaurant / café' },
              { e: '🏠', n: 'Real estate' },
              { e: '🏋️', n: 'Fitness / studio', on: true },
              { e: '🛍️', n: 'Shop / online store' },
            ].map((i) => (
              <div
                key={i.n}
                className="rounded-xl p-2.5 flex flex-col items-center gap-1 shadow-sm"
                style={{
                  background: i.on ? 'rgba(255,204,0,.06)' : '#fff',
                  border: `${i.on ? '2px' : '1px'} solid ${i.on ? '#ffcc00' : '#e9e1d0'}`,
                }}
              >
                <span className="text-xl">{i.e}</span>
                <span className="text-[11px] font-extrabold leading-tight" style={{ color: '#1d1810' }}>{i.n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  // 3 — CAPTURE (talk, type, or choose) — ported from JourneyPlayer scene 2
  {
    title: 'Say what is hard',
    blurb: 'Talk out loud or tap a frustration you recognize. No blank page, no jargon. You just describe the thing you keep wishing was easier.',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐣" label="Listen" pct={24} />
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
  // 4 — RECOGNIZE — ported from JourneyPlayer scene 3
  {
    title: 'Hear it back',
    blurb: 'Henway plays your problem back in one clear sentence. If it is off, you fix it in your own words. This is where you feel understood.',
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
          <div className="text-[11px] mt-2 font-semibold" style={{ color: '#a89f88' }}>Not quite? Edit it, or tell me what to change.</div>
        </div>
      </div>
    ),
  },
  // 5 — UNDERSTAND (3 quick facts, nest fills in)
  {
    title: 'Three quick questions',
    blurb: 'A few taps about who it is for and what a win looks like. Each answer shapes the build so it fits you, not everyone.',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐥" label="Understand" pct={50} />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-3xl">🐥</div>
          <div className="font-extrabold text-lg mt-1 tracking-tight">Who's it really for?</div>
          <div className="text-[11.5px] mt-1 font-semibold" style={{ color: '#7a7360' }}>3 quick things, so your build fits you, not everyone.</div>
          <div className="flex gap-2 my-3">
            {[0, 1, 2].map((k) => (
              <span key={k} className="w-[30px] h-10 grid place-items-center text-[14px] rounded-[50%_50%_48%_48%/60%_60%_40%_40%] transition" style={{ background: k === 0 ? 'linear-gradient(160deg,#fff2c0,#ffd451)' : '#efe7d6', border: `1.5px solid ${k === 0 ? '#ffcc00' : '#dcd2bd'}`, transform: k === 0 ? 'translateY(-3px)' : 'none' }}>{k === 0 ? '🥚' : ''}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 justify-center">
            <span className="bg-white border-[1.5px] border-[#e9e1d0] rounded-full px-3 py-1.5 text-[11.5px] font-extrabold" style={{ color: '#6b6353' }}>Just me</span>
            <span className="bg-henway-yellow border-2 border-henway-yellow rounded-full px-3 py-1.5 text-[11.5px] font-extrabold text-black">My team</span>
            <span className="bg-white border-[1.5px] border-[#e9e1d0] rounded-full px-3 py-1.5 text-[11.5px] font-extrabold" style={{ color: '#6b6353' }}>My customers</span>
          </div>
          <div className="text-[11px] mt-3 font-bold" style={{ color: '#a89f88' }}>or type your own…</div>
        </div>
      </div>
    ),
  },
  // 6 — SHAPE — ported from JourneyPlayer scene 5
  {
    title: 'See the shape',
    blurb: 'Henway proposes the one thing to build first, in plain language. Swap the direction or fine-tune what it is. You stay in control without writing a spec.',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐤" label="Focus" pct={62} />
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-center"><div className="font-extrabold text-lg tracking-tight">Here's the shape of it.</div><div className="text-[11.5px] mt-1 font-semibold" style={{ color: '#7a7360' }}>I narrowed it to the one thing to build first.</div></div>
          <div className="mt-2.5 border-2 border-henway-yellow bg-henway-yellow/[0.06] rounded-2xl p-3">
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-henway-gold mb-1">Your build</div>
            <div className="text-[12.5px] font-bold" style={{ color: '#1d1810' }}>A booking app that fills open class spots from a waitlist and texts reminders, on its own.</div>
          </div>
          <div className="text-left text-[9px] font-extrabold uppercase tracking-wider mt-3 mb-1.5" style={{ color: '#a89f88' }}>What it is</div>
          <div className="flex flex-wrap gap-1.5">
            <span className="bg-henway-yellow border-2 border-henway-yellow rounded-full px-2.5 py-1 text-[10px] font-extrabold text-black">Automation</span>
            <span className="bg-white border border-[#e9e1d0] rounded-full px-2.5 py-1 text-[10px] font-extrabold" style={{ color: '#6b6353' }}>Smart assistant</span>
            <span className="bg-white border border-[#e9e1d0] rounded-full px-2.5 py-1 text-[10px] font-extrabold" style={{ color: '#6b6353' }}>Dashboard</span>
          </div>
        </div>
      </div>
    ),
  },
  // 7 — HATCH (loader)
  {
    title: 'Hatch it',
    blurb: 'Your answers turn into a real build. Nothing to write, no prompting skill. Henway does the translating while you watch.',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐤" label="Hatch" pct={74} />
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-5xl">🐣</div>
          <div className="font-extrabold text-lg mt-3 tracking-tight">Hatching your build…</div>
          <div className="text-[12px] mt-1 font-semibold" style={{ color: '#7a7360' }}>Turning your answers into a real build.</div>
          <div className="p-wave mt-4"><span /><span /><span /><span /><span /><span /></div>
          <div className="w-32 h-1.5 rounded-full bg-henway-egg overflow-hidden mt-4">
            <div className="h-full bg-henway-yellow rounded-full" style={{ width: '68%' }} />
          </div>
          <div className="text-[11px] mt-3 font-bold" style={{ color: '#a89f88' }}>Writing your build message…</div>
        </div>
      </div>
    ),
  },
  // 8 — PREVIEW (BookFill) — ported from JourneyPlayer scene 7
  {
    title: 'A live preview',
    blurb: 'Here is a working preview of your idea, in its own look, made from what you said. Seeing it real is the moment it clicks.',
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
  // 9 — BRIEF — ported from JourneyPlayer scene 8
  {
    title: "Your build's ready",
    blurb: 'The full build message and one-page brief, written for you. Copy it into any build tool, or save it. Your work stays yours.',
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
  // 10 — GET IT BUILT (have the team build it) — from prototype buildForYou()
  {
    title: 'Or have us build it',
    blurb: 'Not a DIY person? Hand the brief to our team and get a quote. Same brief, built for you, start to finish.',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐔" label="See it" pct={95} />
        <div className="flex-1 flex flex-col justify-center text-center">
          <div className="text-3xl">🐔</div>
          <div className="font-extrabold text-[15px] mt-1 tracking-tight">Get it built for you.</div>
          <div className="text-[11px] mt-1 font-semibold" style={{ color: '#7a7360' }}>Don't want to DIY? Our team builds it from this brief.</div>
          <div className="mt-2.5 rounded-2xl border-2 border-henway-yellow bg-henway-yellow/[0.06] p-3 text-left">
            <div className="text-[9px] font-extrabold uppercase tracking-wider text-henway-gold">Scoped from your brief</div>
            <div className="text-[15px] font-extrabold mt-0.5 leading-tight" style={{ color: '#1d1810' }}>We read your brief and send you a quote.</div>
            <div className="text-[10.5px] mt-0.5" style={{ color: '#7a7360' }}>Usually within a day. No obligation.</div>
          </div>
          <div className="mt-2.5 rounded-xl border border-[#e9e1d0] bg-white p-2.5 text-left">
            <div className="text-[9px] font-extrabold uppercase tracking-wider mb-1.5" style={{ color: '#a89f88' }}>How it works</div>
            {['We review your brief and email you a quote, usually within a day.', 'You approve the quote. We build it from your brief.', 'You review it in plain words and go live.'].map((s, k) => (
              <div key={k} className="flex gap-2 items-start py-1 text-[11px] text-left" style={{ color: '#1d1810' }}>
                <span className="flex-none w-[18px] h-[18px] rounded-full bg-henway-yellow text-black text-[10px] font-extrabold grid place-items-center mt-px">{k + 1}</span>
                <span className="leading-snug">{s}</span>
              </div>
            ))}
          </div>
          <div className="mt-2.5 bg-henway-yellow text-black rounded-xl py-2.5 text-[12px] font-extrabold">Request my quote →</div>
        </div>
      </div>
    ),
  },
  // 11 — COOP — ported from JourneyPlayer scene 10
  {
    title: 'Welcome to the Coop',
    blurb: 'Every build you hatch lives in your home base. Come back, refine, and hatch the next one. You are a Hen now.',
    render: () => (
      <div className="flex flex-col h-full">
        <Head egg="🐔" label="The Coop" pct={100} />
        <div className="flex-1 flex flex-col justify-center text-center">
          <div className="text-3xl">🐔</div>
          <div className="font-extrabold text-[15px] mt-1 tracking-tight">Welcome to the Coop.</div>
          <div className="text-[11.5px] mt-1 font-semibold" style={{ color: '#7a7360' }}>Your home base. Your hatched builds live here.</div>
          <div className="flex gap-2 mt-3">
            <div className="flex-1 rounded-xl border border-henway-eggline bg-henway-egg/50 py-2"><div className="font-mono text-lg font-bold text-henway-gold leading-none">1</div><div className="text-[8px] font-extrabold uppercase tracking-wide mt-1" style={{ color: '#7a7360' }}>Hatched</div></div>
            <div className="flex-1 rounded-xl border border-henway-eggline bg-henway-egg/50 py-2"><div className="font-mono text-lg font-bold text-henway-gold leading-none">🔥1</div><div className="text-[8px] font-extrabold uppercase tracking-wide mt-1" style={{ color: '#7a7360' }}>Streak</div></div>
            <div className="flex-1 rounded-xl border-2 border-henway-yellow bg-henway-yellow/10 py-2"><div className="font-mono text-lg font-bold text-henway-gold leading-none">+10</div><div className="text-[8px] font-extrabold uppercase tracking-wide mt-1" style={{ color: '#7a7360' }}>Coop pts</div></div>
          </div>
          <div className="mt-2.5 rounded-xl border border-[#e9e1d0] bg-white p-2.5 flex items-center gap-2.5 text-left">
            <span className="text-xl">🐤</span>
            <div><div className="text-[12px] font-extrabold" style={{ color: '#1d1810' }}>BookFill</div><div className="text-[10px]" style={{ color: '#7a7360' }}>Saved just now · tap to reopen</div></div>
          </div>
          <div className="mt-2.5 bg-henway-yellow text-black rounded-xl py-2.5 text-[12px] font-extrabold">Hatch another 🐣</div>
        </div>
      </div>
    ),
  },
];

const DUR = 5000;       // ms per step
const DUR_PREVIEW = 7000; // the live-preview payoff (step index 7) holds longer

export default function FullWalkthrough() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useRef(false);
  const n = steps.length;

  // manual moves take control (stop auto-play); the ribbon/dots/arrows/tap all use this
  const go = (k: number) => { setPlaying(false); setI((k + n) % n); };
  const prev = () => go(i - 1);
  const next = () => go(i + 1);
  const curPhase = PHASE_OF[i];
  const jumpPhase = (p: number) => { const idx = PHASE_OF.findIndex((x) => x === p); if (idx >= 0) go(idx); };

  useEffect(() => {
    reduce.current = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce.current) setPlaying(false);
  }, []);

  // only start once scrolled into view, so it begins at step 1
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') { setInView(true); return; }
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) setInView(true); },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // auto-advance timer (loops); advancing here does NOT stop playback
  useEffect(() => {
    if (!playing || !inView) return;
    const dur = i === 7 ? DUR_PREVIEW : DUR;
    const id = window.setTimeout(() => setI((k) => (k + 1) % n), dur);
    return () => window.clearTimeout(id);
  }, [i, playing, inView, n]);

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

      {/* device flanked by arrows so the nav sits right next to the screen */}
      <div className="flex items-center justify-center gap-2 sm:gap-5">
        <button onClick={prev} aria-label="Previous step" className="hidden sm:flex flex-none w-12 h-12 rounded-full border-2 border-henway-border bg-white text-henway-ink items-center justify-center text-xl font-extrabold hover:border-henway-yellow transition-colors active:scale-95 shadow-sm">‹</button>
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
                {steps[i].render()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <button onClick={next} aria-label="Next step" className="hidden sm:flex flex-none w-12 h-12 rounded-full border-2 border-henway-border bg-white text-henway-ink items-center justify-center text-xl font-extrabold hover:border-henway-yellow transition-colors active:scale-95 shadow-sm">›</button>
      </div>

      {/* controls: play/pause always; arrows on mobile (desktop has the side arrows) */}
      <div className="mt-5 flex items-center gap-3">
        <button onClick={prev} aria-label="Previous step" className="flex sm:hidden flex-none w-11 h-11 rounded-full border-2 border-henway-border bg-white text-henway-ink items-center justify-center text-lg font-extrabold active:scale-95">‹</button>
        <button onClick={() => setPlaying((p) => !p)} className="h-11 px-5 rounded-full bg-henway-yellow text-black flex items-center gap-2 text-sm font-extrabold active:scale-95 transition-transform">
          {playing ? <><span className="text-xs">❚❚</span> Pause</> : <><span className="text-xs">▶</span> Play</>}
        </button>
        <button onClick={next} aria-label="Next step" className="flex sm:hidden flex-none w-11 h-11 rounded-full border-2 border-henway-border bg-white text-henway-ink items-center justify-center text-lg font-extrabold active:scale-95">›</button>
      </div>

      {/* caption */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`cap${i}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-5 text-center max-w-md"
        >
          <div className="text-xs font-extrabold uppercase tracking-[0.2em] text-henway-gold mb-1.5">Step {i + 1} of {n}</div>
          <h3 className="text-2xl md:text-3xl mb-2 font-extrabold tracking-tight text-henway-ink">{steps[i].title}</h3>
          <p className="text-henway-charcoal/75 text-base md:text-lg leading-relaxed">{steps[i].blurb}</p>
        </motion.div>
      </AnimatePresence>

      {/* step dots — clickable scrubber */}
      <div className="mt-4 flex flex-wrap justify-center gap-1.5 max-w-[280px]">
        {steps.map((_, k) => (
          <button
            key={k}
            onClick={() => go(k)}
            aria-label={`Go to step ${k + 1}`}
            className={`h-2 rounded-full transition-all ${k === i ? 'w-6 bg-henway-yellow' : 'w-2 bg-henway-border hover:bg-henway-gold/50'}`}
          />
        ))}
      </div>

      <p className="mt-3 text-xs font-semibold text-henway-charcoal/45">Plays on its own. Tap the screen, the arrows, or the dots to take over.</p>
    </div>
  );
}
