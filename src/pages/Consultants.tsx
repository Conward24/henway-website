/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Palette, Code2, UserPlus, FileText, ArrowRight, Sparkles, Check } from 'lucide-react';

const APP_SIGNUP_URL = 'https://app.henwayai.com/signup';

const features = [
  {
    icon: Palette,
    title: 'White-label it as yours',
    desc: 'Your logo, your colors, your custom domain. Clients see your brand running the discovery, not ours.',
  },
  {
    icon: Code2,
    title: 'Run it live, or embed it',
    desc: 'Use it in the room during a workshop, or drop the widget on your site so every visitor becomes a scoped, qualified lead.',
  },
  {
    icon: UserPlus,
    title: 'Capture the team’s know-how',
    desc: 'Your client’s people describe their real work in plain words. Their expertise becomes usable input, not another doc no one reads.',
  },
  {
    icon: FileText,
    title: 'Hand over client-ready briefs',
    desc: 'Each client walks away with a one-page brief and the exact build message, branded as your deliverable.',
  },
];

const steps = [
  ['Brand it', 'Add your logo, colors, and domain in a couple of minutes.'],
  ['Share or embed', 'Put it on your site, or send a link into a client engagement.'],
  ['They run discovery', 'A guided 7-minute flow turns their idea into a scoped plan.'],
  ['You close', 'You get the brief, the build message, and their contact, ready to pitch.'],
];

// Concise, desktop playthrough of the ideal consultant run, shown in the REAL
// Henway UI rendered in a sample consultant's own brand (StudioNorth navy), so a
// consultant sees exactly what they and their clients will get.
const NAVY = '#14324A';

const FLOW: { img: string; step: string; value: string }[] = [
  { img: 'step1.png', step: 'Brand it as yours', value: 'Your logo, colors, and domain. In two minutes, clients see your studio running the discovery, not us.' },
  { img: 'step2.png', step: 'Run it in the room', value: 'Live in a workshop, embedded on your site, or a link they finish later. The team’s "we should use AI" becomes a scoped, credible project.' },
  { img: 'step3.png', step: 'Hand over a branded brief', value: 'A one-page brief and the exact build message, as your deliverable. You look like you have a product-discovery practice.' },
];

function ConsultantFlow() {
  return (
    <section className="bg-white">
      <div className="section-container">
        <div className="text-center mb-3 max-w-2xl mx-auto">
          <div className="arch-label arch-label-yellow mx-auto">How you use it</div>
          <h2 className="mb-4">Run it like it's yours.</h2>
          <p className="text-xl text-henway-charcoal/65">The real screens, in your brand, live in a workshop or on your site. Your domain, your deliverable, Henway is the engine your clients never see.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mt-12">
          {FLOW.map((f, i) => (
            <motion.div
              key={f.step}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <img src={`/consultant/${f.img}`} alt={f.step} loading="lazy" className="w-full" />
              <div className="mt-4 px-1">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="w-7 h-7 rounded-full text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0" style={{ background: NAVY }}>{i + 1}</span>
                  <h4 className="text-lg leading-tight">{f.step}</h4>
                </div>
                <p className="text-sm text-henway-charcoal/65 leading-relaxed">{f.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-2xl md:text-3xl font-bold text-henway-ink mt-14">One closed engagement pays for the year.</p>
      </div>
    </section>
  );
}

export default function Consultants() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="arch-label arch-label-yellow !text-center lg:!text-left">For AI &amp; transformation consultants</div>
          <h1 className="mb-6">The AI deliverable your clients actually use.</h1>
          <p className="text-xl md:text-2xl mb-4 text-henway-charcoal/80 max-w-xl">
            Every client wants an AI story; few have adoption to show for it. Henway is the missing piece:
            your client&rsquo;s team describes their real work in plain words, and it hands back a scoped,
            build-ready brief and the exact message, under your brand.
          </p>
          <p className="text-lg md:text-xl font-bold text-henway-ink mb-8">Run it live in a workshop, or as the hands-on layer of a retainer. You&rsquo;re the guide who ships, not the guesser.</p>
          <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
            <a href={APP_SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn-yellow w-full sm:w-auto">Start free</a>
            <a href="/#pricing" className="btn-outline w-full sm:w-auto">See plans</a>
          </div>
          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-henway-charcoal/40">
            White-label · Embeddable · From $139/mo
          </p>
        </motion.div>

        {/* Hero visual: a mock of the white-labeled tool */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
        >
          <div className="rounded-3xl border border-henway-border shadow-2xl overflow-hidden bg-white">
            <div className="flex items-center gap-2 px-4 py-3 bg-henway-offwhite border-b border-henway-border">
              <span className="w-3 h-3 rounded-full bg-gray-300" />
              <span className="w-3 h-3 rounded-full bg-gray-300" />
              <span className="w-3 h-3 rounded-full bg-gray-300" />
              <span className="ml-3 text-xs font-mono text-henway-charcoal/50">discover.youragency.com</span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-extrabold text-sm">A</div>
                <span className="font-extrabold text-black">Your Agency</span>
                <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-henway-charcoal/40">Discovery</span>
              </div>
              <div className="bg-henway-offwhite rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-henway-charcoal/80 mb-4 max-w-[90%]">
                &ldquo;We want to use AI in our business but have no idea where to start.&rdquo;
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-henway-charcoal/40 mb-2">
                <Sparkles className="w-4 h-4 text-henway-yellow" /> Your Agency recommends
              </div>
              <div className="border border-black/10 bg-black/5 rounded-2xl p-4 mb-4">
                <p className="text-sm font-bold text-black mb-1">A branded client booking portal</p>
                <p className="text-xs text-henway-charcoal/60">Build it on Lovable · one-page brief + copy-paste message ready.</p>
              </div>
              <button className="w-full bg-black text-white text-sm font-bold py-3 rounded-xl">Book a call with Your Agency</button>
            </div>
          </div>
          <p className="text-sm text-henway-charcoal/50 mt-3 text-center lg:text-left">Your brand. Your domain. Your leads.</p>
        </motion.div>
      </section>

      {/* Why */}
      <section className="bg-henway-charcoal text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="arch-label arch-label-yellow mx-auto">Why it works</div>
          <h2 className="text-white text-4xl md:text-6xl mb-8 leading-tight">Your clients want AI. Almost none have adoption to show for it.</h2>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-4">
            The gap was never the model. It&rsquo;s translation, from a person&rsquo;s real work into what AI needs.
            That&rsquo;s a deliverable, and right now no one owns it. You can.
          </p>
          <div className="grid sm:grid-cols-3 gap-5 mt-10 mb-2 text-left">
            {[
              ['Only 25%', 'of employees who can use AI actually do (IBM, 2026)'],
              ['~95%', 'of enterprise AI pilots show no measurable impact (MIT, 2025)'],
              ['One try', 'is all most people give it, training teaches the tool, not the job'],
            ].map(([n, d]) => (
              <div key={n} className="bg-white/5 border border-white/10 rounded-2xl px-5 py-5">
                <div className="text-3xl md:text-4xl font-extrabold text-henway-yellow">{n}</div>
                <div className="text-sm text-white/65 mt-2 leading-snug">{d}</div>
              </div>
            ))}
          </div>
          <p className="text-2xl md:text-3xl font-bold text-white mt-10">One closed engagement pays for the year.</p>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-henway-offwhite">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="arch-label arch-label-muted">What you get</div>
            <h2 className="mb-4">A discovery tool that looks like yours.</h2>
            <p className="text-xl text-henway-charcoal/60">Every feature here is built and ready.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} className="card-grid flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-henway-yellow flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl">{f.title}</h3>
                    <p className="text-henway-charcoal/80">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How you use it — a concise, DESKTOP playthrough of the ideal consultant
          run, shown in the consultant's own brand (StudioNorth navy, not Henway
          yellow) so the white-label lands visually. */}
      <ConsultantFlow />

      {/* The deliverable — a full example brief so prospects see the quality */}
      <section className="bg-henway-offwhite">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
            <div>
              <div className="arch-label arch-label-muted">The deliverable</div>
              <h2 className="mb-4">The brief your client actually gets.</h2>
              <p className="text-lg text-henway-charcoal/70 mb-6">One page, branded as yours: the build, the problem it solves, what it does, the tool to build it on, and the exact copy-paste message. It looks like a $10k discovery, produced in minutes.</p>
              <ul className="space-y-3">
                {['A clear build with a one-line pitch', 'The problem, in the client’s own words', 'What it does, plus the recommended no-code tool', 'The exact build message, ready to copy'].map((x) => (
                  <li key={x} className="flex items-start gap-2 text-henway-charcoal/80"><Check className="w-5 h-5 text-henway-yellow flex-shrink-0 mt-0.5" /> {x}</li>
                ))}
              </ul>
            </div>
            <img src="/consultant/example-brief.png" alt="An example client brief, branded as StudioNorth" loading="lazy" className="w-full rounded-2xl shadow-xl" />
          </div>
        </div>
      </section>

      {/* For agencies — the team workspace on their own domain */}
      <section className="bg-white">
        <div className="section-container">
          <div className="text-center mb-3 max-w-2xl mx-auto">
            <div className="arch-label arch-label-yellow mx-auto">For agencies</div>
            <h2 className="mb-4">Your whole studio, on your domain.</h2>
            <p className="text-xl text-henway-charcoal/65">One workspace for the team: every client discovery in one place, on your own custom domain, with seats for your people.</p>
          </div>
          <img src="/consultant/agency-dashboard.png" alt="An agency team workspace, branded as StudioNorth" loading="lazy" className="w-full max-w-5xl mx-auto rounded-2xl shadow-2xl mt-10" />
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            {[['Your custom domain', 'Run discovery on studionorth.co, not ours.'], ['Up to 5 seats', 'Your whole team, one shared workspace.'], ['Every client in one place', 'All discoveries and builds, tracked together.']].map(([t, d]) => (
              <div key={t} className="text-center">
                <h4 className="text-lg mb-1">{t}</h4>
                <p className="text-sm text-henway-charcoal/60">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing snapshot */}
      <section className="bg-henway-offwhite">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="arch-label arch-label-muted">Plans</div>
            <h2 className="mb-4">Priced to pay for itself.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="card-grid">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-2xl">Consultant</h3>
                <span className="text-2xl font-bold text-black">$139<span className="text-base text-henway-charcoal/50">/mo</span></span>
              </div>
              <p className="text-henway-charcoal/60 mb-4">For the solo consultant running discovery with clients.</p>
              <ul className="space-y-2 text-henway-charcoal/80">
                {['Up to 150 discoveries / month', 'White-label with your brand', 'Embeddable widget', 'Continue-links to prospects'].map((x) => (
                  <li key={x} className="flex items-start gap-2"><Check className="w-5 h-5 text-henway-yellow flex-shrink-0" /> {x}</li>
                ))}
              </ul>
            </div>
            <div className="card-grid">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="text-2xl">Agency</h3>
                <span className="text-2xl font-bold text-black">$249<span className="text-base text-henway-charcoal/50">/mo</span></span>
              </div>
              <p className="text-henway-charcoal/60 mb-4">For agencies running client discovery on their own domain.</p>
              <ul className="space-y-2 text-henway-charcoal/80">
                {['Everything in Consultant', 'Up to 5 team seats', 'Up to 600 discoveries / month', 'Your own custom domain', 'Priority support'].map((x) => (
                  <li key={x} className="flex items-start gap-2"><Check className="w-5 h-5 text-henway-yellow flex-shrink-0" /> {x}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center text-sm text-henway-charcoal/50 mt-8">
            See the full comparison on the <a href="/#pricing" className="font-bold text-black underline decoration-henway-yellow decoration-2 underline-offset-2 hover:opacity-70">pricing page</a>.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-henway-charcoal text-white">
        <div className="section-container text-center max-w-3xl relative z-10">
          <h2 className="text-white text-4xl md:text-5xl mb-6">Make AI discovery your offer.</h2>
          <p className="text-xl text-white/70 mb-10">Start free, brand it in minutes, and put a real AI-discovery service in front of your clients this week.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={APP_SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn-yellow w-full sm:w-auto">Start free</a>
            <a href="/#pricing" className="w-full sm:w-auto border-2 border-white/30 text-white font-bold rounded-full px-8 py-3 hover:bg-white/10 transition-colors">See plans</a>
          </div>
        </div>
        <img src="/images/mascot-thumbsup.png" alt="" aria-hidden="true" className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-6 xl:right-16 w-24 xl:w-28 z-0 pointer-events-none select-none drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]" />
      </section>
    </main>
  );
}
