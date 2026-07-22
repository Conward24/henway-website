/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, Fragment, type ReactNode } from 'react';
import { Clipboard, Compass, FileText, ShieldCheck, Check, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const APP_LOGIN_URL = 'https://app.henwayai.com/login';
const APP_SIGNUP_URL = 'https://app.henwayai.com/signup';

// Founding Hens band near pricing. Toggle off if the $19 founding rate is not
// yet honored. FOUNDING_HENS_CLAIMED is the REAL count of claimed seats, never inflate it.
const SHOW_FOUNDING_HENS = true;
const FOUNDING_HENS_CLAIMED = 0;

/** Primary "try the app free" CTA: opens the real app signup. */
function StartButton({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <a href={APP_SIGNUP_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

const platforms = [
  'Lovable', 'Base44', 'Bolt', 'v0 by Vercel', 'Replit Agent', 'Google AI Studio',
  'Rork', 'FlutterFlow', 'Bubble', 'Glide', 'Cursor', 'Claude Code', 'GitHub Copilot', 'IBM Bob',
];

const deliverables = [
  { icon: Clipboard, title: 'Your first message, written for you', desc: 'The exact words you paste into the tool to get it started, filled in with your answers. Copy, paste, build.' },
  { icon: Compass, title: 'The right tool to build on', desc: 'Matched to your industry, how comfortable you are with tech, and how big this needs to get. Picked from 13 real tools.' },
  { icon: FileText, title: 'A one-page brief', desc: 'Plain-English problem, solution, and next steps. Share a link or download the PDF.' },
  { icon: ShieldCheck, title: 'Compliance flags', desc: 'Work in health, finance, or law? Henway flags the rules a build would carry, like HIPAA or SOC 2, and points you to a stack that can actually meet them. No shipping on a tool that cannot sign a BAA.' },
];

const steps = [
  { n: '1', emoji: '🎙️', title: 'Say what’s slowing you down', desc: 'Tap the mic and just talk, or pick from ready-made cards. Fixing something at work or building an idea, it starts the same way.' },
  { n: '2', emoji: '✨', title: 'React to a few directions', desc: 'Henway proposes what “great” looks like and a few ways to build it. You just say what fits. No need to know the options up front.' },
  { n: '3', emoji: '👀', title: 'See it built, then shape it', desc: 'Watch a live preview come to life, then refine it in plain words. “Make it simpler.” Every change sharpens the build.' },
  { n: '4', emoji: '🐔', title: 'Walk out with your message', desc: 'Your copy-paste first message, the right tool to build on, and a one-page brief to share. Paste it in and go.' },
];

const tiers = [
  { name: 'Free', monthly: 0, annual: 0, line: 'Explore every idea you’ve got.', sessions: 'Unlimited runs', features: ['Full 7-minute discovery flow', 'Download & share your one-page brief', 'Tool pick & build message stay locked', 'Results expire 15 minutes after you finish'], cta: 'Start free', highlight: false },
  { name: 'Founder', monthly: 29, annual: 249, line: 'For solo builders launching their first AI product.', sessions: '10 discoveries / month', features: ['Unlock & keep your full build message', 'Tool pick + compliance flags, unblurred', 'No 15-minute expiry, saved for good', 'Save & resume any session'], cta: 'Get Founder', highlight: false },
  { name: 'Consultant', monthly: 139, annual: 1199, line: 'For consultants running AI discovery with their clients.', sessions: 'Up to 150 / month', features: ['Everything in Founder', 'White-label it with your brand', 'Embeddable widget for your site', 'Continue-links to prospects'], cta: 'Get Consultant', highlight: true },
  { name: 'Agency', monthly: 249, annual: 1999, line: 'For agencies running client discovery on their own domain.', sessions: 'Up to 600 / month', features: ['Everything in Consultant', 'Up to 5 team seats', 'Your own custom domain', 'Priority support'], cta: 'Get Agency', highlight: false },
];

const faqs = [
  { q: 'What is Henway?', a: 'Henway is an AI product-discovery tool. In about seven minutes it finds the problem worth solving, shows you a live preview of your idea, tells you which AI build platform to use, and writes your first message, plus a one-page brief you can share.' },
  { q: 'Who is it for?', a: 'Anyone with something worth solving: people fixing a problem at work, founders building an idea they’ve been sitting on, non-technical operators, and consultants or agencies who scope AI builds for clients. No idea in hand? It’ll show you what’s newly possible. If you can talk about your problem in plain words, you can use it.' },
  { q: 'Do I need to be technical?', a: 'No. You bring the idea in plain language. Henway handles the part where you’d normally need to know the tools.' },
  { q: 'Which build tools can it recommend?', a: 'A growing set of build platforms, including Lovable, Base44, Bolt, v0 by Vercel, Replit Agent, Google AI Studio, Rork, FlutterFlow, Bubble, Glide, Cursor, Claude Code, GitHub Copilot, and IBM Bob.' },
  { q: 'What about compliance, like HIPAA?', a: 'When a build would carry rules like HIPAA or SOC 2, Henway flags it and points you to a stack that can actually meet them, so you don’t ship patient data on a tool that can’t sign a BAA.' },
  { q: 'Is it free?', a: 'Yes. Discovery runs are unlimited and free, no credit card. Each result stays live for 15 minutes; to unlock and keep your build kit (the recommended platform and copy-paste message), you upgrade. Paid plans start at $29/month.' },
];

const fade = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

function FaqItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-henway-border/70 last:border-0">
      <button onClick={onClick} className="w-full py-6 flex items-center justify-between text-left group gap-4">
        <h4 className={`text-lg md:text-xl font-extrabold transition-colors ${open ? 'text-henway-ink' : 'text-henway-charcoal/55 group-hover:text-henway-ink'}`}>{q}</h4>
        <span className={`flex-shrink-0 text-2xl leading-none text-henway-yellow transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && <p className="pb-8 text-lg text-henway-charcoal/75 leading-relaxed max-w-3xl">{a}</p>}
    </div>
  );
}

export default function Home() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activePill, setActivePill] = useState<number | null>(null);

  /* Ambient "scanning" glow that hops across the build tools, so the section
     shows Henway weighing all of them for you. Pauses for reduced-motion. */
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let prev = -1;
    const id = window.setInterval(() => {
      let n = Math.floor(Math.random() * platforms.length);
      if (n === prev) n = (n + 1) % platforms.length;
      prev = n;
      setActivePill(n);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  /* AEO: SoftwareApplication + FAQPage structured data for answer engines. */
  useEffect(() => {
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify([
      { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Henway', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: 'https://app.henwayai.com', description: 'Henway is an AI product-discovery tool. In about seven minutes it finds the problem worth solving, shows you a live preview of your idea, tells you which AI build platform to use, and writes your first message, plus a one-page brief.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free to start. Paid plans from $29/month.' } },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ]);
    document.head.appendChild(ld);
    return () => { document.head.removeChild(ld); };
  }, []);

  return (
    <main>
      {/* ===== HERO — the dark hatchery stage ===== */}
      <section id="hero" className="stage pt-28 md:pt-32 pb-20">
        <div className="grain" />
        <div className="glow" style={{ top: '-100px', right: '-30px' }} />
        <div className="max-w-7xl mx-auto px-6 relative grid grid-cols-1 lg:grid-cols-[1.05fr_.95fr] gap-12 lg:gap-16 items-center">
          <motion.div {...fade} className="text-center lg:text-left">
            <div className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-henway-yellow mb-5">The experience layer for AI</div>
            <img src="/images/chick-shades.png" alt="Henway chick mascot in sunglasses" className="block lg:hidden w-36 sm:w-44 mx-auto -mt-1 mb-4 floaty" style={{ filter: 'drop-shadow(0 18px 30px rgba(0,0,0,.5))' }} referrerPolicy="no-referrer" />
            <h1 className="text-4xl md:text-6xl">Turn what <span className="text-henway-yellow">you</span> already know into what AI can <span className="text-henway-yellow">build</span>.</h1>
            <p className="text-xl md:text-2xl mt-6 max-w-xl mx-auto lg:mx-0" style={{ color: '#b8ad90' }}>
              Talk it through in plain words. Henway hands you a live preview, the first message, and the right tool to build it.
            </p>
            <p className="mt-5 text-base md:text-lg font-bold" style={{ color: '#eadfc2' }}>Talk or type. No code. No idea needed to start.</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">
              <StartButton className="btn-yellow w-full sm:w-auto">Start free</StartButton>
              <Link to="/studio" className="btn-ghost-light w-full sm:w-auto">Have us build it</Link>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-9 lg:flex lg:gap-8">
              {[['~7min', 'idea → buildable'], ['13', 'build tools, one pick'], ['$0', 'to run discovery']].map(([b, s]) => (
                <div key={s} className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <b className="font-mono text-2xl lg:text-3xl font-bold text-henway-yellow tracking-tight">{b}</b>
                  <span className="text-xs lg:text-sm font-semibold" style={{ color: '#b8ad90' }}>{s}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="relative flex justify-center" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <img src="/images/chick-shades.png" alt="Henway chick mascot in sunglasses" className="hidden lg:block absolute z-[4] w-[140px] floaty" style={{ left: '-4%', bottom: '-6px', filter: 'drop-shadow(0 20px 34px rgba(0,0,0,.55))' }} referrerPolicy="no-referrer" />
            <div className="phone floaty">
              <div className="notch" />
              <div className="screen">
                <div className="flex items-center gap-2 mb-1"><span className="text-xl">🐣</span><div className="p-bar"><i /></div></div>
                <div className="text-[9px] font-extrabold tracking-[0.14em] uppercase text-henway-gold ml-7 mt-1">Listen · Understand · Focus</div>
                <div className="text-center mt-6">
                  <div className="text-5xl leading-none">🐥</div>
                  <div className="text-center font-extrabold text-lg mt-4 tracking-tight">What’s slowing you down?</div>
                  <p className="text-[13px] mt-2 font-semibold" style={{ color: '#7a7360' }}>Tap and talk. I’ll take it from there.</p>
                </div>
                <div className="p-mic"><span className="ring" /><span className="ring b" />
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1d1810" strokeWidth="2.2"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
                </div>
                <div className="p-wave"><span /><span /><span /><span /><span /><span /></div>
                <div className="mt-4 bg-white border border-[#e9e1d0] rounded-2xl px-4 py-3 text-[13px] font-semibold leading-snug" style={{ color: '#3f3a2e' }}>
                  “I run a boutique fitness studio. My team wastes hours booking classes and chasing no-shows…”
                </div>
                <p className="text-center text-xs font-bold mt-4" style={{ color: '#a89f88' }}>or pick from a card ↓</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== Proof strip ===== */}
      <section className="bg-henway-offwhite border-y border-henway-border">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-henway-gold mb-3">Proven where it counts</div>
          <p className="text-lg md:text-2xl font-extrabold text-henway-ink">Featured on the IBM Think 2026 stage. We build client products on IBM watsonx.</p>
          <p className="text-sm text-henway-charcoal/60 mt-3">Cofounded <a href="https://www.myluahealth.com" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-henway-yellow/70 underline-offset-2 hover:text-henway-ink">MyLÚA Health</a>, <a href="https://blabbing.io" target="_blank" rel="noopener noreferrer" className="font-bold underline decoration-henway-yellow/70 underline-offset-2 hover:text-henway-ink">Blabbing</a>, and built for teams in finance.</p>
        </div>
      </section>

      {/* ===== Hatching ribbon ===== */}
      <section className="py-11">
        <div className="max-w-3xl mx-auto px-6">
          <div className="hatch-ribbon">
            {['🥚', '🐣', '🐥', '🐤', '🐔'].map((e, i) => (
              <Fragment key={i}>
                <motion.span className="text-lg sm:text-2xl shrink-0" initial={{ opacity: 0.4, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1.1 }} viewport={{ once: true }} transition={{ delay: i * 0.18 }}>{e}</motion.span>
                {i < 4 && <div className="hbar"><motion.i initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ delay: i * 0.18, duration: 0.9 }} /></div>}
              </Fragment>
            ))}
          </div>
          <p className="text-center text-henway-charcoal/45 font-mono text-xs mt-4">Listen → Understand → Focus → Hatch → See it → Coop</p>
        </div>
      </section>

      {/* ===== How it works ===== */}
      <section id="how" className="section-container pt-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="arch-label">How it works</div>
          <h2 className="text-4xl md:text-5xl">Talk it through. Watch it hatch.</h2>
          <p className="text-lg text-henway-charcoal/60 mt-4 flex items-center justify-center gap-2"><Clock className="w-5 h-5 text-henway-yellow" /> About 7 minutes, start to finish.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <motion.div key={i} {...fade} transition={{ duration: 0.5, delay: i * 0.06 }} className={`bg-white border rounded-2xl p-5 lg:p-6 flex gap-4 lg:flex-col lg:gap-0 transition-all hover:-translate-y-1 hover:shadow-lg ${s.n === '4' ? 'border-henway-yellow' : 'border-henway-border hover:border-henway-yellow'}`}>
              <div className="w-12 h-12 rounded-xl bg-henway-egg border border-henway-eggline flex items-center justify-center text-2xl flex-shrink-0 lg:mb-3">{s.emoji}</div>
              <div>
                <h3 className="text-lg sm:text-xl">{s.title}</h3>
                <p className="text-sm text-henway-charcoal/70 mt-1.5 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Manifesto — on stage ===== */}
      <section className="stage py-20 md:py-24">
        <div className="grain" />
        <div className="glow" style={{ bottom: '-220px', right: '-120px' }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <div className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-henway-yellow mb-5">Why Henway</div>
          <h2 className="text-4xl md:text-6xl">You don’t need to learn how to prompt.</h2>
          <p className="text-xl md:text-2xl leading-relaxed mt-6" style={{ color: '#b8ad90' }}>
            You didn’t learn to code to build a website. You won’t learn to prompt to build with AI. Every tool hides its hard part behind something familiar. A spreadsheet. A search bar. A chat. Henway is that layer for AI.
          </p>
          <p className="text-2xl md:text-3xl font-extrabold mt-9" style={{ color: '#f6f1e4' }}>You bring what you know. We bring the perfect message.</p>
        </div>
      </section>

      {/* ===== What you get + build-message reveal ===== */}
      <section className="bg-henway-offwhite">
        <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="arch-label !text-center lg:!text-left">What you walk away with</div>
            <h2 className="text-3xl md:text-5xl text-center lg:text-left">Four things you can use today.</h2>
            <div className="flex flex-col gap-3.5 mt-7">
              {deliverables.map((d, i) => {
                const Icon = d.icon;
                return (
                  <div key={i} className="bg-white border border-henway-border rounded-2xl p-[18px] flex gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-henway-yellow flex items-center justify-center flex-shrink-0"><Icon className="w-5 h-5 text-black" /></div>
                    <div><b className="font-extrabold text-henway-ink">{d.title}</b><p className="text-sm text-henway-charcoal/70 mt-0.5">{d.desc}</p></div>
                  </div>
                );
              })}
            </div>
          </div>
          <motion.div {...fade}>
            <div className="bg-white border border-henway-border rounded-3xl overflow-hidden shadow-xl">
              <div className="bg-henway-yellow text-black px-[18px] py-3.5 font-extrabold flex justify-between items-center"><span>🐣 Your build kit</span><span className="font-mono text-xs">7 min</span></div>
              <div className="p-[18px]">
                <div className="chatline">“My team burns hours booking classes and chasing no-shows by hand.”</div>
                <div className="reco">
                  <div className="flex items-center gap-2 mb-2"><span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-henway-gold">Henway recommends</span><span className="ml-auto text-[10px] font-extrabold uppercase tracking-widest text-henway-charcoal/45">Fast build</span></div>
                  <div className="font-extrabold mb-2">🧭 Build on Lovable</div>
                  <div className="locked">
                    <div className="blurwrap"><p className="font-mono text-[12.5px] text-henway-charcoal/70 leading-relaxed">“Build a web app called BookFill that auto-fills class cancellations from a waitlist, texts reminders, and shows a live schedule owners can edit in seconds…”</p></div>
                    <div className="lockover">
                      <span className="lockchip">🔒 Full build message</span>
                      <p className="text-[13px] font-bold text-henway-charcoal/70">Preview free · unlock the copy-paste message on any paid plan</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-[12.5px] text-henway-charcoal/50 mt-3 font-semibold">The one-page brief is free to download. The build message unlocks when you keep it.</p>
          </motion.div>
        </div>
      </section>

      {/* ===== Platforms ===== */}
      <section className="section-container text-center">
        <div className="text-[13px] font-extrabold uppercase tracking-[0.28em] text-henway-gold mb-4">One recommendation from 13 build tools</div>
        <h2 className="text-3xl md:text-5xl mb-9">It knows the tools so you don’t have to.</h2>
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
          {platforms.map((p, i) => <span key={i} className={`pill duration-500 ${i === activePill ? 'pill-active' : ''}`}>{p}</span>)}
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section id="pricing" className="bg-henway-offwhite scroll-mt-20">
        <div className="section-container">
          <div className="text-center mb-7">
            <div className="arch-label">Pricing</div>
            <h2 className="text-3xl md:text-5xl mb-4">Start free. Pay when you’re ready to build.</h2>
            <div className="inline-flex items-center gap-1 bg-white border border-henway-border rounded-full p-1">
              <button onClick={() => setAnnual(false)} className={`px-5 py-2 rounded-full text-sm font-extrabold transition-all ${!annual ? 'bg-henway-yellow text-black' : 'text-henway-charcoal/60'}`}>Monthly</button>
              <button onClick={() => setAnnual(true)} className={`px-5 py-2 rounded-full text-sm font-extrabold transition-all ${annual ? 'bg-henway-yellow text-black' : 'text-henway-charcoal/60'}`}>Annual</button>
            </div>
          </div>
          {SHOW_FOUNDING_HENS && (
            <div className="max-w-3xl mx-auto mb-8 rounded-3xl border-2 border-henway-yellow bg-henway-yellow/10 px-6 py-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <img src="/images/chick-shades.png" alt="" className="w-16 flex-shrink-0" style={{ filter: 'drop-shadow(0 8px 14px rgba(40,32,4,.22))' }} referrerPolicy="no-referrer" />
              <div className="flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap"><span className="font-extrabold text-henway-ink text-lg">Founding Hens</span><span className="text-[11px] font-extrabold uppercase tracking-widest bg-henway-yellow text-black px-2.5 py-0.5 rounded-full">{FOUNDING_HENS_CLAIMED > 0 ? `${FOUNDING_HENS_CLAIMED} of 25 claimed` : '25 seats open'}</span></div>
                <p className="text-sm text-henway-charcoal/70 mt-1.5">The first 25 paying Hens lock <b className="text-henway-ink">$19/mo for life</b> (Founder is $29). When the 25 seats are gone, they are gone.</p>
              </div>
              <StartButton className="btn-yellow whitespace-nowrap flex-shrink-0">Claim a seat</StartButton>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {tiers.map((t, i) => (
              <div key={i} className={`flex flex-col p-7 rounded-3xl border bg-white transition-all hover:-translate-y-1 hover:shadow-lg ${t.highlight ? 'border-henway-yellow shadow-lg ring-4 ring-henway-yellow/20' : 'border-henway-border'}`}>
                {t.highlight && <span className="self-start mb-3 text-[10px] font-extrabold uppercase tracking-[0.16em] bg-henway-yellow text-black px-3 py-1 rounded-full">Most popular</span>}
                <h3 className="text-2xl mb-1">{t.name}</h3>
                <p className="text-sm text-henway-charcoal/60 mb-5 min-h-[40px]">{t.line}</p>
                <div className="mb-1"><span className="text-4xl font-extrabold text-henway-ink">${annual ? t.annual.toLocaleString() : t.monthly}</span><span className="text-henway-charcoal/50 text-sm">{t.monthly === 0 ? '' : annual ? '/yr' : '/mo'}</span></div>
                {t.monthly > 0 && annual ? (
                  <p className="text-xs font-bold text-henway-charcoal/50 mb-4">Save ${(t.monthly * 12 - t.annual).toLocaleString()}/yr ({Math.round(((t.monthly * 12 - t.annual) / (t.monthly * 12)) * 100)}%) vs monthly</p>
                ) : (<p className="text-xs mb-4">&nbsp;</p>)}
                <p className="text-sm font-extrabold text-henway-ink mb-5">{t.sessions}</p>
                <ul className="space-y-3 mb-7 flex-1">
                  {t.features.map((f, j) => (<li key={j} className="flex items-start gap-2 text-sm text-henway-charcoal/80"><Check className="w-4 h-4 text-henway-yellow flex-shrink-0 mt-0.5" />{f}</li>))}
                </ul>
                <StartButton className={`w-full text-center font-extrabold py-3 px-4 rounded-full transition-all active:scale-95 ${t.highlight ? 'bg-henway-yellow text-black hover:brightness-105' : 'border-2 border-henway-ink text-henway-ink hover:bg-henway-ink hover:text-henway-paper'}`}>{t.cta}</StartButton>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-henway-charcoal/50 mt-8 max-w-2xl mx-auto">The discovery is free, and you can run it as many times as you want. Your result stays live for 15 minutes. To save it, your recommended tool plus your ready-to-paste message, upgrade to any paid plan.</p>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section-container grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <div className="arch-label !text-left">Questions</div>
            <h2 className="text-4xl md:text-5xl mb-4">Straight answers.</h2>
            <p className="text-lg text-henway-charcoal/60">Everything most people ask before their first run.</p>
          </div>
        </div>
        <div className="lg:col-span-8 border-t border-henway-border/70">
          {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} open={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />)}
        </div>
      </section>

      {/* ===== Final CTA — on stage, with the shades hen ===== */}
      <section className="stage py-24">
        <div className="grain" />
        <div className="glow" style={{ top: '30%', left: '50%', transform: 'translateX(-50%)' }} />
        <div className="max-w-3xl mx-auto px-6 text-center relative">
          <img src="/images/chick-shades.png" alt="Henway chick mascot in sunglasses" className="w-32 mx-auto mb-5 floaty" style={{ filter: 'drop-shadow(0 20px 34px rgba(0,0,0,.55))' }} referrerPolicy="no-referrer" />
          <h2 className="text-4xl md:text-5xl">Your idea is one conversation away from buildable.</h2>
          <p className="text-xl mt-6" style={{ color: '#b8ad90' }}>Bring the thing you keep wishing was easier. Leave knowing what to build it with, and what to type first.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-9">
            <StartButton className="btn-yellow w-full sm:w-auto">Start free</StartButton>
            <Link to="/studio" className="btn-ghost-light w-full sm:w-auto">Have us build it <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </div>
          <p className="mt-6 text-sm" style={{ color: 'rgba(184,173,144,.7)' }}>Already have an account? <a href={APP_LOGIN_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-henway-yellow underline-offset-4 text-henway-yellow">Log in</a></p>
        </div>
      </section>
    </main>
  );
}
