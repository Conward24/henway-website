/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, type ReactNode } from 'react';
import {
  ArrowRight,
  Check,
  Clock,
  Compass,
  Clipboard,
  FileText,
  ShieldCheck,
  Plus,
  Minus,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

/** Single source of truth for the hosted app login. */
const APP_LOGIN_URL = 'https://app.henwayai.com/login';

function StartButton({
  className = '',
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={APP_LOGIN_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Data: real, pulled from the live product (api.henwayai.com)         */
/* ------------------------------------------------------------------ */

const platforms = [
  'Lovable',
  'Cursor',
  'v0 by Vercel',
  'Bolt',
  'Claude Code',
  'Replit Agent',
  'Windsurf',
  'Bubble',
  'Glide',
  'FlutterFlow',
  'Google AI Studio',
  'IBM watsonx',
  'IBM Bob',
];

const deliverables = [
  {
    icon: Compass,
    title: 'The right tool to build on',
    desc: 'We match it to your industry, how comfortable you are with tech, and how big this needs to get. Picked from 13 real tools.',
  },
  {
    icon: Clipboard,
    title: 'Your first prompt, written for you',
    desc: 'This is the exact set of words you paste into the tool to get it started, written for you and filled in with your answers. Copy, paste, build. The blank page is gone.',
  },
  {
    icon: FileText,
    title: 'A one-page brief',
    desc: 'Plain-English: the problem, the solution, the next steps. Share a link or download the PDF.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance flags',
    desc: 'Work in health, finance, or law? It flags the privacy and safety rules you have to follow (like HIPAA or SOC 2) and which tools already meet them.',
  },
];

const steps = [
  { n: '1', title: 'Say what slows you down', desc: 'Pick your industry. Have a 3-question chat. Tap an answer or type your own.' },
  { n: '2', title: 'Point at the win', desc: 'Choose what “great” looks like from a few ready-made options. No essays.' },
  { n: '3', title: 'Pick the shape', desc: 'Automate it, make it smarter, or connect your tools. Pick the direction that fits.' },
  { n: '4', title: 'Get your prompt', desc: 'Walk away with your tool, your first prompt, and a one-page brief.' },
];

const tiers = [
  {
    name: 'Free',
    monthly: 0,
    annual: 0,
    line: 'Explore every idea you’ve got.',
    sessions: 'Unlimited runs',
    features: ['Full 7-minute discovery flow', 'See your tool pick + build prompt', 'Result expires 15 minutes after you finish'],
    cta: 'Start free',
    highlight: false,
  },
  {
    name: 'Founder',
    monthly: 29,
    annual: 249,
    line: 'For solo builders launching their first AI product.',
    sessions: '10 discoveries / month',
    features: ['Your build prompt, saved for good', 'Save & resume any session', 'Shareable session links', 'Branded PDF briefs'],
    cta: 'Get Founder',
    highlight: false,
  },
  {
    name: 'Consultant',
    monthly: 99,
    annual: 849,
    line: 'For consultants running discovery with clients.',
    sessions: 'Unlimited discoveries',
    features: ['Everything in Founder', 'White-label branding', 'Embeddable widget', 'Client CRM + continue-links', 'Up to 3 workspaces'],
    cta: 'Get Consultant',
    highlight: true,
  },
  {
    name: 'Agency',
    monthly: 249,
    annual: 1999,
    line: 'For agencies that offer AI discovery to their own clients.',
    sessions: 'Unlimited + custom domain',
    features: ['Everything in Consultant', 'Unlimited workspaces', 'Admin panel + API access', 'Priority support'],
    cta: 'Get Agency',
    highlight: false,
  },
];

const faqs = [
  {
    q: 'What is Henway?',
    a: 'Henway is an AI product-discovery tool. In about seven minutes it tells you which AI build platform to use for your idea and writes your first prompt, plus a one-page brief you can share.',
  },
  {
    q: 'Who is it for?',
    a: 'Founders and solo builders with an idea, non-technical operators, and consultants or agencies who scope AI builds for clients. If you can describe your problem in plain words, you can use it.',
  },
  {
    q: 'Do I need to be technical?',
    a: 'No. You bring the idea in plain language. Henway handles the part where you’d normally need to know the tools.',
  },
  {
    q: 'Which build tools can it recommend?',
    a: 'Thirteen, including Lovable, Cursor, v0 by Vercel, Bolt, Claude Code, Replit Agent, Windsurf, Bubble, Glide, FlutterFlow, Google AI Studio, IBM watsonx, and IBM Bob.',
  },
  {
    q: 'How long does it take?',
    a: 'About seven minutes, start to finish.',
  },
  {
    q: 'Is it free?',
    a: 'Yes. Discovery runs are unlimited and free, no credit card. Each result stays live for 15 minutes; to unlock and keep your build kit (the recommended platform and copy-paste prompt), you upgrade. Paid plans start at $29/month.',
  },
];

/* ------------------------------------------------------------------ */

function FaqItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void; key?: number }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={onClick} className="w-full py-6 flex items-center justify-between text-left group">
        <h4 className={`text-lg md:text-xl font-bold transition-colors ${open ? 'text-black' : 'text-henway-charcoal/60 group-hover:text-black'}`}>
          {q}
        </h4>
        <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}>
          {open ? <Minus className="w-5 h-5 text-henway-yellow" /> : <Plus className="w-5 h-5 text-gray-300 group-hover:text-henway-yellow" />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-lg text-henway-charcoal/70 leading-relaxed max-w-3xl">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Product() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  /* AEO: inject SoftwareApplication + FAQPage structured data so answer
     engines (ChatGPT, Perplexity, Google AI Overviews) can cite us cleanly. */
  useEffect(() => {
    const ld = document.createElement('script');
    ld.type = 'application/ld+json';
    ld.text = JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Henway',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        url: 'https://app.henwayai.com',
        description:
          'Henway is an AI product-discovery tool. In about seven minutes it tells you which AI build platform to use for your idea and writes your first prompt, plus a one-page brief.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free to start. Paid plans from $29/month.',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ]);
    document.head.appendChild(ld);
    return () => {
      document.head.removeChild(ld);
    };
  }, []);

  return (
    <main className="pt-20">
      {/* ---------------- Hero ---------------- */}
      <section className="section-container grid lg:grid-cols-2 gap-16 items-center min-h-[80vh] overflow-x-clip">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 mb-6">
            <img src="/images/egg-icon.png" alt="" className="w-6 h-6" aria-hidden="true" />
            <span className="arch-label arch-label-yellow !mb-0">The Henway App</span>
          </div>
          <h1 className="mb-6">Which AI tool should you build with?</h1>
          <p className="text-xl md:text-2xl mb-8 text-henway-charcoal/80 max-w-xl">
            You have an idea. Henway tells you the exact tool to build it with, then writes your first prompt for you: the exact words you paste in to get started. Seven minutes. Free to start.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <StartButton className="btn-yellow group">
              Start free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </StartButton>
            <a href="#how" className="btn-outline">See how it works</a>
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-henway-charcoal/40">
            No credit card · No coding · No permission needed
          </p>
        </motion.div>

        {/* Hero visual: a mock of the actual output */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative max-w-md mx-auto lg:mx-0"
        >
          <div className="absolute -top-4 -right-2 z-10 bg-black text-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2">
            <Clock className="w-4 h-4 text-henway-yellow" />
            <span className="font-bold text-sm">7 min</span>
          </div>
          <div className="bg-white rounded-3xl border border-henway-border shadow-2xl p-6 space-y-4">
            <div className="bg-henway-offwhite rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-henway-charcoal/80 max-w-[85%]">
              “I run a dental clinic. The front desk is buried in scheduling calls all day.”
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
                “Build a HIPAA-conscious scheduling web app for a dental clinic. Patients book,
                reschedule, and ask common questions via chat…”
              </p>
            </div>
            <button className="w-full bg-black text-white text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2">
              <Clipboard className="w-4 h-4" /> Copy first prompt
            </button>
          </div>

          {/* Mascot: baby chick peeking out at the lower-right of the card */}
          <motion.img
            src="/images/chick.png"
            alt="Henway chick"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden xl:block absolute left-full -translate-x-14 -bottom-12 w-44 z-20 pointer-events-none select-none drop-shadow-[0_14px_22px_rgba(0,0,0,0.14)]"
          />
        </motion.div>
      </section>

      {/* ---------------- What is Henway (AEO answer-first) ---------------- */}
      <section className="bg-henway-offwhite">
        <div className="section-container max-w-4xl text-center">
          <div className="arch-label arch-label-muted">What is Henway?</div>
          <p className="text-2xl md:text-3xl font-bold text-black leading-snug">
            Henway is the step <span className="text-henway-charcoal/40">before</span> you open any AI builder.
            It picks the right tool for your idea and writes your first prompt for you, the exact words you paste in, so you can start building today instead of spending a week on research.
          </p>
        </div>
      </section>

      {/* ---------------- The problem ---------------- */}
      <section className="bg-henway-charcoal py-24 text-white">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="arch-label arch-label-yellow">The problem</div>
            <h2 className="text-white mb-4">Too many tools. A blank screen. Lost weeks.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ['13+ ways to build', 'Lovable? Cursor? Bolt? Bubble? Each is great at something different. Which fits you?'],
              ['The blank page', 'Even with the right tool, the first prompt decides everything. Most people stall right here.'],
              ['Wrong start', 'Pick wrong and you rebuild from scratch, or quietly give up. We help you start right.'],
            ].map(([t, d], i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                <h4 className="text-white mb-3">{t}</h4>
                <p className="text-white/60">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- How it works (visual flow) ---------------- */}
      <section id="how" className="bg-white scroll-mt-20">
        <div className="section-container">
          <div className="text-center mb-14">
            <div className="arch-label arch-label-muted">How it works</div>
            <h2 className="mb-3">A short chat. A clear answer.</h2>
            <p className="text-xl text-henway-charcoal/60 flex items-center justify-center gap-2">
              <Clock className="w-5 h-5 text-henway-yellow" /> About 7 minutes, start to finish.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative">
                <div className="card-grid h-full">
                  <div className="w-12 h-12 rounded-full bg-henway-yellow text-black font-bold text-xl flex items-center justify-center mb-5">
                    {s.n}
                  </div>
                  <h4 className="mb-2">{s.title}</h4>
                  <p className="text-henway-charcoal/70">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-5 -translate-y-1/2 w-6 h-6 text-henway-yellow/40 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- What you get ---------------- */}
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

      {/* ---------------- Platforms ---------------- */}
      <section className="bg-white">
        <div className="section-container text-center">
          <div className="arch-label arch-label-muted">One recommendation. Thirteen platforms.</div>
          <h2 className="mb-10">It knows the tools so you don’t have to.</h2>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {platforms.map((p, i) => (
              <span
                key={i}
                className="px-5 py-2.5 rounded-full border border-gray-200 text-base font-bold text-henway-charcoal/70 hover:border-henway-yellow hover:text-black transition-all"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Inclusive voice ---------------- */}
      <section className="bg-black text-white py-24">
        <div className="section-container text-center max-w-4xl">
          <h2 className="text-white text-4xl md:text-6xl mb-8 leading-tight">
            You don’t need a technical co-founder. Or anyone’s permission.
          </h2>
          <p className="text-xl text-white/70">
            The best ideas don’t come from the people with the most access. They come from people who
            see the problem up close. Henway hands you the map and the first step. The rest is yours.
          </p>
        </div>
      </section>

      {/* ---------------- Pricing ---------------- */}
      <section id="pricing" className="bg-henway-offwhite scroll-mt-20">
        <div className="section-container">
          <div className="text-center mb-10">
            <div className="arch-label arch-label-yellow mx-auto">Pricing</div>
            <h2 className="mb-4">Start free. Pay when you’re building a lot.</h2>
            <div className="inline-flex items-center gap-1 bg-white border border-gray-200 rounded-full p-1 mt-2">
              <button
                onClick={() => setAnnual(false)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${!annual ? 'bg-henway-yellow text-black' : 'text-henway-charcoal/60'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${annual ? 'bg-henway-yellow text-black' : 'text-henway-charcoal/60'}`}
              >
                Annual
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {tiers.map((t, i) => (
              <div
                key={i}
                className={`flex flex-col p-7 rounded-3xl border bg-white transition-all hover:-translate-y-1 hover:shadow-lg ${
                  t.highlight ? 'border-henway-yellow shadow-lg ring-2 ring-henway-yellow/30' : 'border-gray-200'
                }`}
              >
                {t.highlight && (
                  <span className="self-start mb-3 text-[10px] font-extrabold uppercase tracking-[0.2em] bg-henway-yellow text-black px-3 py-1 rounded-full">
                    Most popular
                  </span>
                )}
                <h3 className="text-2xl mb-1">{t.name}</h3>
                <p className="text-sm text-henway-charcoal/60 mb-5 min-h-[40px]">{t.line}</p>
                <div className="mb-1">
                  <span className="text-4xl font-bold text-black">
                    ${annual ? t.annual : t.monthly}
                  </span>
                  <span className="text-henway-charcoal/50 text-sm">
                    {t.monthly === 0 ? '' : annual ? '/yr' : '/mo'}
                  </span>
                </div>
                {t.monthly > 0 && annual ? (
                  <p className="text-xs font-bold text-henway-charcoal/50 mb-4">
                    Save ${t.monthly * 12 - t.annual}/yr ({Math.round(((t.monthly * 12 - t.annual) / (t.monthly * 12)) * 100)}%) vs monthly
                  </p>
                ) : (
                  <p className="text-xs mb-4">&nbsp;</p>
                )}
                <p className="text-sm font-bold text-black mb-5">{t.sessions}</p>
                <ul className="space-y-3 mb-7 flex-1">
                  {t.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-henway-charcoal/80">
                      <Check className="w-4 h-4 text-henway-yellow flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <StartButton
                  className={`w-full text-center font-bold py-3 px-4 rounded-xl transition-all active:scale-95 ${
                    t.highlight ? 'bg-henway-yellow text-black hover:brightness-110' : 'border-2 border-black text-black hover:bg-black hover:text-white'
                  }`}
                >
                  {t.cta}
                </StartButton>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-henway-charcoal/50 mt-8 max-w-2xl mx-auto">
            The discovery is free, and you can run it as many times as you want. Your result stays live for 15 minutes. To save it, your recommended tool plus your ready-to-paste prompt, upgrade to any paid plan.
          </p>
        </div>
      </section>

      {/* ---------------- FAQ (AEO) ---------------- */}
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

      {/* ---------------- Lead-gen: have us build it ---------------- */}
      <section className="bg-henway-offwhite">
        <div className="section-container">
          <div className="rounded-3xl border border-henway-border bg-white p-10 md:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-sm">
            <div className="max-w-2xl">
              <div className="arch-label arch-label-yellow !text-left">Don't want to build it yourself?</div>
              <h2 className="mb-4 text-3xl md:text-4xl">Hand it to us.</h2>
              <p className="text-lg text-henway-charcoal/70">
                Henway can also design and build the whole product for you, start to finish, including in fields with strict rules like healthcare and finance. Bring the summary from your discovery and we will take it from there.
              </p>
            </div>
            <a href="/#contact" className="btn-outline flex-shrink-0 group">
              Work with us
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <section className="bg-henway-charcoal text-white py-24">
        <div className="section-container text-center max-w-3xl">
          <h2 className="text-white text-4xl md:text-6xl mb-6">Your first prompt is 7 minutes away.</h2>
          <p className="text-xl text-white/70 mb-10">
            Bring the idea you’ve been sitting on. Leave knowing what to build it with, and what to type first.
          </p>
          <StartButton className="btn-yellow text-lg group">
            Start free
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </StartButton>
          <p className="mt-5 text-sm text-white/40">
            Already have an account?{' '}
            <a href={APP_LOGIN_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-henway-yellow underline-offset-4 hover:text-white">
              Log in
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
