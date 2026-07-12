/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, type ReactNode } from 'react';
import { Check, Clock, Compass, Clipboard, FileText, ShieldCheck, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import CaseStudies from '../components/CaseStudies';

const APP_LOGIN_URL = 'https://app.henwayai.com/login';
const APP_SIGNUP_URL = 'https://app.henwayai.com/signup';

/** Primary "try the app free" CTA: opens the real app signup. */
function StartButton({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <a href={APP_SIGNUP_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

const platforms = [
  'Lovable', 'Cursor', 'v0 by Vercel', 'Bolt', 'Claude Code', 'Replit Agent', 'Windsurf',
  'Bubble', 'Glide', 'FlutterFlow', 'Google AI Studio', 'IBM watsonx', 'IBM Bob',
];

const deliverables = [
  { icon: Compass, title: 'The right tool to build on', desc: 'We match it to your industry, how comfortable you are with tech, and how big this needs to get. Picked from 13 real tools.' },
  { icon: Clipboard, title: 'Your first prompt, written for you', desc: 'This is the exact set of words you paste into the tool to get it started, written for you and filled in with your answers. Copy, paste, build. The blank page is gone.' },
  { icon: FileText, title: 'A one-page brief', desc: 'Plain-English: the problem, the solution, the next steps. Share a link or download the PDF.' },
  { icon: ShieldCheck, title: 'Compliance flags', desc: 'Work in health, finance, or law? It flags the privacy and safety rules you have to follow (like HIPAA or SOC 2) and which tools already meet them.' },
];

const steps = [
  { n: '1', title: 'Say what slows you down', desc: 'Pick your industry. Have a 3-question chat. Tap an answer or type your own.', img: '/images/how-1.png' },
  { n: '2', title: 'Point at the win', desc: 'Choose what “great” looks like from a few ready-made options. No essays.', img: '/images/how-2.png' },
  { n: '3', title: 'Pick the shape', desc: 'Automate it, make it smarter, or connect your tools. Pick the direction that fits.', img: '/images/how-3.png' },
  { n: '4', title: 'Get your prompt', desc: 'Walk away with the right tool, your first prompt, and a one-page brief.', img: '/images/how-4.png' },
];

const tiers = [
  { name: 'Free', monthly: 0, annual: 0, line: 'Explore every idea you’ve got.', sessions: 'Unlimited runs', features: ['Full 7-minute discovery flow', 'See your tool pick + build prompt', 'Result expires 15 minutes after you finish'], cta: 'Start free', highlight: false },
  { name: 'Founder', monthly: 29, annual: 249, line: 'For solo builders launching their first AI product.', sessions: '10 discoveries / month', features: ['Your build prompt, saved for good', 'Save & resume any session', 'Shareable session links', 'Branded PDF briefs'], cta: 'Get Founder', highlight: false },
  { name: 'Consultant', monthly: 99, annual: 849, line: 'For consultants running discovery with clients.', sessions: 'Unlimited discoveries', features: ['Everything in Founder', 'White-label branding', 'Embeddable widget', 'Client CRM + continue-links', 'Up to 3 workspaces'], cta: 'Get Consultant', highlight: true },
  { name: 'Agency', monthly: 249, annual: 1999, line: 'For agencies that offer AI discovery to their own clients.', sessions: 'Unlimited + custom domain', features: ['Everything in Consultant', 'Unlimited workspaces', 'Admin panel + API access', 'Priority support'], cta: 'Get Agency', highlight: false },
];

const faqs = [
  { q: 'What is Henway?', a: 'Henway is an AI product-discovery tool. In about seven minutes it tells you which AI build platform to use for your idea and writes your first prompt, plus a one-page brief you can share.' },
  { q: 'Who is it for?', a: 'Founders and solo builders with an idea, non-technical operators, and consultants or agencies who scope AI builds for clients. If you can describe your problem in plain words, you can use it.' },
  { q: 'Do I need to be technical?', a: 'No. You bring the idea in plain language. Henway handles the part where you’d normally need to know the tools.' },
  { q: 'Which build tools can it recommend?', a: 'Thirteen, including Lovable, Cursor, v0 by Vercel, Bolt, Claude Code, Replit Agent, Windsurf, Bubble, Glide, FlutterFlow, Google AI Studio, IBM watsonx, and IBM Bob.' },
  { q: 'How long does it take?', a: 'About seven minutes, start to finish.' },
  { q: 'Is it free?', a: 'Yes. Discovery runs are unlimited and free, no credit card. Each result stays live for 15 minutes; to unlock and keep your build kit (the recommended platform and copy-paste prompt), you upgrade. Paid plans start at $29/month.' },
];

function FaqItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void; key?: number }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={onClick} className="w-full py-6 flex items-center justify-between text-left group">
        <h4 className={`text-lg md:text-xl font-bold transition-colors ${open ? 'text-black' : 'text-henway-charcoal/60 group-hover:text-black'}`}>{q}</h4>
        <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          {open ? <Minus className="w-5 h-5 text-henway-yellow" /> : <Plus className="w-5 h-5 text-gray-300 group-hover:text-henway-yellow" />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
            <p className="pb-8 text-lg text-henway-charcoal/70 leading-relaxed max-w-3xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  /* AEO: SoftwareApplication + FAQPage structured data for answer engines. */
  useEffect(() => {
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify([
      { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'Henway', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: 'https://app.henwayai.com', description: 'Henway is an AI product-discovery tool. In about seven minutes it tells you which AI build platform to use for your idea and writes your first prompt, plus a one-page brief.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free to start. Paid plans from $29/month.' } },
      { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ]);
    document.head.appendChild(ld);
    return () => { document.head.removeChild(ld); };
  }, []);

  return (
    <main className="pt-20">
      {/* Hero — bridge / translation-layer positioning */}
      <section id="hero" className="section-container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-left">
          <div className="arch-label arch-label-yellow !text-left">The layer between you and AI</div>
          <h1 className="mb-6">Turn what you already know into what AI can build.</h1>
          <p className="text-xl md:text-2xl mb-4 text-henway-charcoal/80 max-w-xl">
            Describe your idea in plain words. Henway picks the right tool to build it and writes your first
            prompt, ready to paste in.
          </p>
          <p className="text-lg md:text-xl font-bold text-black mb-8">
            <span className="bg-henway-yellow/50 px-1.5 py-0.5 rounded box-decoration-clone">No code. No guesswork.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
            <StartButton className="btn-yellow w-full sm:w-auto">Try the App Free</StartButton>
            <Link to="/studio" className="btn-outline w-full sm:w-auto">Have Us Build It</Link>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }} className="w-full">
          <div className="rounded-2xl overflow-hidden border border-henway-border shadow-2xl">
            <img src="/images/bridge.jpg" alt="You describe your problem in plain words, Henway translates it, and AI builds the product." className="w-full h-auto block" />
          </div>
        </motion.div>
      </section>

      {/* Manifesto */}
      <section className="bg-henway-charcoal text-white py-24 md:py-32">
        <div className="section-container max-w-4xl text-center">
          <div className="arch-label arch-label-yellow mx-auto">Why Henway</div>
          <h2 className="text-white text-4xl md:text-6xl mb-8 leading-tight">You don’t need to learn how to prompt.</h2>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-6">
            You didn’t learn to code to build a website. You won’t learn to prompt to build with AI. Every
            tool eventually hides its hardest part behind something familiar: a spreadsheet, a search bar, a chat.
          </p>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
            Henway is that layer for AI. You answer plain questions about work you already understand, and it
            writes the expert prompt and picks the right tool. The skill barrier is the last thing standing
            between people and what AI can do. We’re removing it.
          </p>
          <p className="text-2xl md:text-3xl font-bold text-white mt-10">You bring what you know. We bring the perfect prompt.</p>
        </div>
      </section>

      {/* The problem */}
      <section className="bg-henway-offwhite py-24">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="arch-label arch-label-yellow">The problem</div>
            <h2 className="mb-4">Too many tools. A blank screen. Lost weeks.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ['13+ ways to build', 'Lovable? Cursor? Bolt? Bubble? Each is great at something different. Which fits you?'],
              ['The blank page', 'Even with the right tool, the first prompt decides everything. Most people stall right here.'],
              ['Wrong start', 'Pick wrong and you rebuild from scratch, or quietly give up. We help you start right.'],
            ].map(([t, d], i) => (
              <div key={i} className="bg-white border border-gray-200 p-8 rounded-2xl">
                <h4 className="mb-3">{t}</h4>
                <p className="text-henway-charcoal/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — real app screenshots */}
      <section id="how" className="bg-white scroll-mt-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <div className="arch-label arch-label-muted">How it works</div>
            <h2 className="mb-3">A short chat. A clear answer.</h2>
            <p className="text-xl text-henway-charcoal/60 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-henway-yellow" /> About 7 minutes, start to finish.
            </p>
          </div>
          <div className="space-y-16 md:space-y-24">
            {steps.map((s, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <div className="rounded-2xl overflow-hidden border border-henway-border shadow-2xl bg-henway-offwhite">
                    <img src={s.img} alt={`The Henway app, step ${s.n}: ${s.title}`} className="w-full h-auto block" loading="lazy" />
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-henway-yellow text-black font-bold text-xl flex items-center justify-center flex-shrink-0">{s.n}</div>
                    <div className="arch-label arch-label-muted !mb-0">Step {s.n} of 4</div>
                  </div>
                  <h3 className="text-3xl md:text-4xl mb-4">{s.title}</h3>
                  <p className="text-lg text-henway-charcoal/70 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-henway-offwhite">
        <div className="section-container">
          <div className="text-center mb-14">
            <div className="arch-label arch-label-yellow mx-auto">What you walk away with</div>
            <h2>Four things you can use today.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {deliverables.map((d, i) => {
              const Icon = d.icon;
              return (
                <div key={i} className="card-grid flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-henway-yellow flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl">{d.title}</h3>
                    <p className="text-henway-charcoal/80">{d.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="bg-white">
        <div className="section-container text-center">
          <div className="arch-label arch-label-muted">One recommendation. Thirteen platforms.</div>
          <h2 className="mb-10">It knows the tools so you don’t have to.</h2>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {platforms.map((p, i) => (
              <span key={i} className="px-5 py-2.5 rounded-full border border-gray-200 text-base font-bold text-henway-charcoal/70 hover:border-henway-yellow hover:text-black transition-all">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Proof — case studies */}
      <CaseStudies />

      {/* Pricing */}
      <section id="pricing" className="bg-henway-offwhite scroll-mt-20">
        <div className="section-container">
          <div className="text-center mb-10">
            <div className="arch-label arch-label-yellow mx-auto">Pricing</div>
            <h2 className="mb-4">Start free. Pay when you’re building a lot.</h2>
            <div className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full p-1 mt-2">
              <button onClick={() => setAnnual(false)} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${!annual ? 'bg-henway-yellow text-black' : 'text-henway-charcoal/60'}`}>Monthly</button>
              <button onClick={() => setAnnual(true)} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${annual ? 'bg-henway-yellow text-black' : 'text-henway-charcoal/60'}`}>Annual</button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {tiers.map((t, i) => (
              <div key={i} className={`flex flex-col p-7 rounded-3xl border bg-white transition-all hover:-translate-y-1 hover:shadow-lg ${t.highlight ? 'border-henway-yellow shadow-lg ring-2 ring-henway-yellow/30' : 'border-gray-200'}`}>
                {t.highlight && <span className="self-start mb-3 text-[10px] font-extrabold uppercase tracking-[0.2em] bg-henway-yellow text-black px-3 py-1 rounded-full">Most popular</span>}
                <h3 className="text-2xl mb-1">{t.name}</h3>
                <p className="text-sm text-henway-charcoal/60 mb-5 min-h-[40px]">{t.line}</p>
                <div className="mb-1">
                  <span className="text-4xl font-bold text-black">${annual ? t.annual : t.monthly}</span>
                  <span className="text-henway-charcoal/50 text-sm">{t.monthly === 0 ? '' : annual ? '/yr' : '/mo'}</span>
                </div>
                {t.monthly > 0 && annual ? (
                  <p className="text-xs font-bold text-henway-charcoal/50 mb-4">Save ${t.monthly * 12 - t.annual}/yr ({Math.round(((t.monthly * 12 - t.annual) / (t.monthly * 12)) * 100)}%) vs monthly</p>
                ) : (
                  <p className="text-xs mb-4">&nbsp;</p>
                )}
                <p className="text-sm font-bold text-black mb-5">{t.sessions}</p>
                <ul className="space-y-3 mb-7 flex-1">
                  {t.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-henway-charcoal/80"><Check className="w-4 h-4 text-henway-yellow flex-shrink-0 mt-0.5" />{f}</li>
                  ))}
                </ul>
                <StartButton className={`w-full text-center font-bold py-3 px-4 rounded-xl transition-all active:scale-95 ${t.highlight ? 'bg-henway-yellow text-black hover:brightness-110' : 'border-2 border-black text-black hover:bg-black hover:text-white'}`}>{t.cta}</StartButton>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-henway-charcoal/50 mt-8 max-w-2xl mx-auto">
            The discovery is free, and you can run it as many times as you want. Your result stays live for 15 minutes. To save it, your recommended tool plus your ready-to-paste prompt, upgrade to any paid plan.
          </p>
        </div>
      </section>

      {/* Two ways to build */}
      <section id="two-ways" className="bg-white">
        <div className="section-container">
          <div className="text-center mb-14">
            <div className="arch-label arch-label-muted">Two ways to build with Henway</div>
            <h2 className="mb-4">Build it yourself, or have us build it.</h2>
            <p className="text-xl text-henway-charcoal/60">Same starting point. You choose how far we go.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-grid flex flex-col">
              <div className="arch-label arch-label-yellow !text-left">Do it yourself</div>
              <h3 className="mb-4">The Henway app</h3>
              <p className="text-lg text-henway-charcoal/80 mb-6">
                Answer a few quick questions (about 7 minutes) and walk away with the right tool to build with, your first prompt (the exact words to paste in to get started), and a simple one-page summary. Then build it yourself.
              </p>
              <ul className="space-y-2 mb-8 text-henway-charcoal/80">
                <li>Free to start, no credit card</li>
                <li>Recommends from 13 real AI tools</li>
                <li>Self-serve, in minutes</li>
              </ul>
              <StartButton className="btn-yellow mt-auto self-start">Try the App Free</StartButton>
            </div>
            <div className="card-grid flex flex-col bg-henway-charcoal text-white border-henway-charcoal">
              <div className="arch-label arch-label-yellow !text-left">Have us build it</div>
              <h3 className="text-white mb-4">Done-for-you build</h3>
              <p className="text-lg text-white/70 mb-6">
                Bring the idea and we design and build the real thing for you. Safe, reliable, and finished, the same way we build for large companies on tools like IBM watsonx.
              </p>
              <ul className="space-y-2 mb-8 text-white/70">
                <li>From discovery to launch</li>
                <li>Healthcare, finance, and other industries with strict rules</li>
                <li>Built by the team behind secure AI on IBM watsonx</li>
                <li>Featured on the IBM Think 2026 stage</li>
              </ul>
              <Link to="/studio" className="btn-yellow mt-auto self-start">Meet Henway Studio</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="section-container grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="arch-label arch-label-yellow !text-left">Questions</div>
              <h2 className="mb-4">Straight answers.</h2>
              <p className="text-lg text-henway-charcoal/60">Everything most people ask before their first run.</p>
            </div>
          </div>
          <div className="lg:col-span-8 border-t border-gray-100">
            {faqs.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} open={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-henway-charcoal text-white py-24 md:py-28">
        <div className="section-container text-center max-w-3xl relative z-10">
          <h2 className="text-white text-4xl md:text-5xl mb-6">Your idea is one conversation away from buildable.</h2>
          <p className="text-xl text-white/70 mb-10">Bring the idea you’ve been sitting on. Leave knowing what to build it with, and what to type first.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <StartButton className="btn-yellow w-full sm:w-auto">Try the App Free</StartButton>
            <Link to="/studio" className="w-full sm:w-auto border-2 border-white/30 text-white font-bold rounded-full px-8 py-3 hover:bg-white/10 transition-colors">Have Us Build It</Link>
          </div>
          <p className="mt-6 text-sm text-white/40">
            Already have an account?{' '}
            <a href={APP_LOGIN_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-henway-yellow underline-offset-4 hover:text-white">Log in</a>
          </p>
        </div>
        <img src="/images/mascot-thumbsup.png" alt="" aria-hidden="true" className="hidden lg:block absolute bottom-0 right-6 xl:right-16 w-36 xl:w-44 z-0 pointer-events-none select-none drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]" />
      </section>
    </main>
  );
}
