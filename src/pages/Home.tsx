/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, Fragment, type ReactNode } from 'react';
import { ArrowRight, Check, Clock, Compass, Clipboard, FileText, ShieldCheck, Plus, Minus, Sparkles, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

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
  { icon: Clipboard, title: 'Your first prompt, written for you', desc: 'This is the exact set of words you paste into the tool to get it started, written for you and filled in with your answers. Copy, paste, build. The blank page is gone.' },
  { icon: Compass, title: 'The right tool to build on', desc: 'We match it to your industry, how comfortable you are with tech, and how big this needs to get. Picked from 10+ real tools.' },
  { icon: FileText, title: 'A one-page brief', desc: 'Plain-English: the problem, the solution, the next steps. Share a link or download the PDF.' },
  { icon: ShieldCheck, title: 'Compliance flags', desc: 'Work in health, finance, or law? It flags the privacy and safety rules you have to follow (like HIPAA or SOC 2) and which tools already meet them.' },
];

const steps = [
  { n: '1', title: 'Say what slows you down', desc: 'Pick your industry. Have a 3-question chat. Tap an answer or type your own.', img: '/images/how-1.png' },
  { n: '2', title: 'Point at the win', desc: 'Choose what “great” looks like from a few ready-made options. No essays.', img: '/images/how-2.png' },
  { n: '3', title: 'Pick the shape', desc: 'Flag what matters most — speed, compliance, integrations — then pick the kind of tool: an automation, a smart assistant, a dashboard, or an integrator.', img: '/images/how-3.png' },
  { n: '4', title: 'Get your prompt', desc: 'Copy your first prompt straight into the recommended tool and go. You also walk away with a one-page brief to share.', img: '/images/how-4.png' },
];

const tiers = [
  { name: 'Free', monthly: 0, annual: 0, line: 'Explore every idea you’ve got.', sessions: 'Unlimited runs', features: ['Full 7-minute discovery flow', 'Download & share your one-page brief', 'Tool pick & build prompt stay locked', 'Results expire 15 minutes after you finish'], cta: 'Start free', highlight: false },
  { name: 'Founder', monthly: 29, annual: 249, line: 'For solo builders launching their first AI product.', sessions: '10 discoveries / month', features: ['Unlock your full build prompt — copy & keep it', 'Tool pick + compliance flags, unblurred', 'No 15-minute expiry, saved for good', 'Save & resume any session'], cta: 'Get Founder', highlight: false },
  { name: 'Consultant', monthly: 99, annual: 849, line: 'For consultants running discovery with clients.', sessions: 'Unlimited discoveries', features: ['Everything in Founder', 'White-label branding', 'Embeddable widget', 'Client CRM + continue-links', 'Up to 3 workspaces'], cta: 'Get Consultant', highlight: true },
  { name: 'Agency', monthly: 249, annual: 1999, line: 'For agencies that offer AI discovery to their own clients.', sessions: 'Unlimited + custom domain', features: ['Everything in Consultant', 'Unlimited workspaces', 'Admin panel + API access', 'Priority support'], cta: 'Get Agency', highlight: false },
];

const faqs = [
  { q: 'What is Henway?', a: 'Henway is an AI product-discovery tool. In about seven minutes it tells you which AI build platform to use for your idea and writes your first prompt, plus a one-page brief you can share.' },
  { q: 'Who is it for?', a: 'Founders and solo builders with an idea, non-technical operators, and consultants or agencies who scope AI builds for clients. If you can describe your problem in plain words, you can use it.' },
  { q: 'Do I need to be technical?', a: 'No. You bring the idea in plain language. Henway handles the part where you’d normally need to know the tools.' },
  { q: 'Which build tools can it recommend?', a: 'A growing set of build platforms, including Lovable, Cursor, v0 by Vercel, Bolt, Claude Code, Replit Agent, Windsurf, Bubble, Glide, FlutterFlow, Google AI Studio, IBM watsonx, and IBM Bob.' },
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
          <div className="arch-label arch-label-yellow !text-left">Idea in, build-ready out</div>
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

      {/* Proof strip — recognizable credential */}
      <section className="bg-henway-offwhite border-y border-henway-border">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-henway-charcoal/40 mb-3">Proven where it counts</p>
          <p className="text-lg md:text-2xl font-bold text-black">Featured on the IBM Think 2026 stage. We build client products on IBM watsonx.</p>
          <p className="text-sm text-henway-charcoal/50 mt-3">Cofounded <a href="https://www.myluahealth.com" target="_blank" rel="noopener noreferrer" className="underline decoration-henway-yellow/70 underline-offset-2 hover:text-black transition-colors">MyLÚA Health</a>, <a href="https://blabbing.io" target="_blank" rel="noopener noreferrer" className="underline decoration-henway-yellow/70 underline-offset-2 hover:text-black transition-colors">Blabbing</a>, and built for teams in finance.</p>
        </div>
      </section>

      {/* Manifesto */}
      <section className="bg-henway-charcoal text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="arch-label arch-label-yellow mx-auto">Why Henway</div>
          <h2 className="text-white text-4xl md:text-6xl mb-8 leading-tight">You don’t need to learn how to prompt.</h2>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-5">
            You didn’t learn to code to build a website. You won’t learn to prompt to build with AI.
          </p>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
            Every tool hides its hard part behind something familiar. A spreadsheet. A search bar. A chat. Henway is that layer for AI.
          </p>
          <p className="text-2xl md:text-3xl font-bold text-white mt-10">You bring what you know. We bring the perfect prompt.</p>
        </div>
      </section>

      {/* How it works — real app screenshots */}
      <section id="how" className="relative overflow-hidden bg-white scroll-mt-20">
        <img src="/images/mascot-peeking.png" alt="" aria-hidden="true" className="block absolute top-3 right-1 w-14 sm:top-6 sm:right-3 sm:w-20 lg:top-10 lg:right-6 xl:right-12 lg:w-24 xl:w-28 z-0 pointer-events-none select-none" />
        <div className="section-container relative z-10">
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
                  {s.n === '4' ? (
                    <div className="space-y-6">
                      {/* The brief you can share */}
                      <div className="rounded-2xl overflow-hidden border border-henway-border shadow-xl bg-henway-offwhite">
                        <img src={s.img} alt="Your one-page discovery brief, ready to share" className="w-full h-auto block" loading="lazy" />
                      </div>
                      {/* The tangible payoff: your copy-paste build prompt (the app's real output card) */}
                      <div className="relative max-w-md mx-auto lg:mx-0 lg:ml-auto">
                        <div className="absolute -top-4 -right-2 z-10 bg-black text-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2">
                          <Clock className="w-4 h-4 text-henway-yellow" />
                          <span className="font-bold text-sm">7 min</span>
                        </div>
                        <div className="bg-white rounded-3xl border border-henway-border shadow-2xl p-6 space-y-4">
                          <div className="bg-henway-offwhite rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-henway-charcoal/80 max-w-[85%]">
                            “I run a digital health startup. My team burns hours pulling patient data by hand.”
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-henway-charcoal/40">
                            <Sparkles className="w-4 h-4 text-henway-yellow" /> Henway recommends
                          </div>
                          <div className="border border-henway-yellow/40 bg-henway-yellow/5 rounded-2xl p-4">
                            <div className="flex items-center gap-2 mb-1">
                              <Compass className="w-4 h-4 text-henway-charcoal" />
                              <span className="font-bold text-black">Build on Lovable</span>
                              <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-henway-charcoal/40">HIPAA</span>
                            </div>
                            <p className="text-xs font-mono leading-relaxed text-henway-charcoal/70">
                              “Build a HIPAA-ready web app called ClearPull Health that syncs patient data from five health systems on a schedule and keeps a one-click exportable audit trail…”
                            </p>
                          </div>
                          <button className="w-full bg-black text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2">
                            <Clipboard className="w-4 h-4" /> Copy first prompt
                          </button>
                        </div>
                      </div>
                      <p className="flex items-center justify-center lg:justify-end gap-1.5 text-xs font-semibold text-henway-charcoal/50">
                        <Lock className="w-3.5 h-3.5" /> Full prompt unlocks on any paid plan
                      </p>
                    </div>
                  ) : (
                    <div className="rounded-2xl overflow-hidden border border-henway-border shadow-2xl bg-henway-offwhite">
                      <img src={s.img} alt={`The Henway app, step ${s.n}: ${s.title}`} className="w-full h-auto block" loading="lazy" />
                    </div>
                  )}
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
          <p className="text-center text-sm text-henway-charcoal/50 mt-10 max-w-2xl mx-auto">
            The one-page brief is free to download and share. <a href="#pricing" className="font-bold text-black underline decoration-henway-yellow decoration-2 underline-offset-2 hover:opacity-70">Unlock your build prompt, tool pick, and compliance flags</a> on any paid plan.
          </p>
        </div>
      </section>

      {/* What happens next — the last-mile bridge */}
      <section className="relative overflow-hidden bg-henway-yellow/5">
        <img src="/images/mascot-pointing.png" alt="" aria-hidden="true" className="hidden lg:block absolute bottom-0 left-2 xl:left-8 w-24 xl:w-28 z-20 pointer-events-none select-none" />
        <div className="section-container relative z-10">
          <div className="text-center mb-14">
            <div className="arch-label arch-label-yellow mx-auto">What happens next</div>
            <h2 className="mb-3">After Henway, the last step is easy.</h2>
            <p className="text-xl text-henway-charcoal/60 max-w-2xl mx-auto">You leave with a tool and a prompt. Here’s all you do with them.</p>
          </div>
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-3 md:gap-2 max-w-5xl mx-auto">
            {[
              ['Open the tool', 'We link you there.'],
              ['Paste your prompt', 'Ready to copy, no edits.'],
              ['Watch it build', 'Your words become a real first version.'],
              ['Refine in plain English', '“Make it blue.” Still no code.'],
            ].map(([t, d], i) => (
              <Fragment key={i}>
                <div className="flex-1 bg-white border border-henway-border rounded-2xl px-5 py-6 text-center">
                  <h4 className="text-lg mb-1">{t}</h4>
                  <p className="text-sm text-henway-charcoal/60">{d}</p>
                </div>
                {i < 3 && <ArrowRight className="hidden md:block self-center w-5 h-5 text-henway-yellow flex-shrink-0" />}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="bg-white">
        <div className="section-container text-center">
          <div className="mb-5 text-[13px] font-extrabold uppercase tracking-[0.3em] text-henway-charcoal/40 flex items-center justify-center gap-2 flex-wrap">
            <span>One recommendation from</span>
            <span className="text-henway-yellow text-2xl tracking-normal leading-none">10+</span>
            <span>platforms</span>
          </div>
          <h2 className="mb-10">It knows the tools so you don’t have to.</h2>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {platforms.map((p, i) => (
              <span key={i} className="px-5 py-2.5 rounded-full border border-gray-200 text-base font-bold text-henway-charcoal/70 hover:border-henway-yellow hover:text-black transition-all">{p}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-henway-offwhite scroll-mt-20">
        <div className="section-container">
          <div className="text-center mb-10">
            <div className="arch-label arch-label-yellow mx-auto">Pricing</div>
            <h2 className="mb-4">Start free. Pay when you’re ready to build.</h2>
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
      <section className="relative overflow-hidden bg-henway-charcoal text-white">
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
          <img src="/images/mascot-thumbsup.png" alt="" aria-hidden="true" className="lg:hidden mx-auto mt-8 w-20 pointer-events-none select-none drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]" />
        </div>
        <img src="/images/mascot-thumbsup.png" alt="" aria-hidden="true" className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-6 xl:right-16 w-24 xl:w-28 z-0 pointer-events-none select-none drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]" />
      </section>
    </main>
  );
}
