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
    title: 'Embed it on your site',
    desc: 'Drop the discovery widget onto your site. Every visitor who tries it becomes a scoped, qualified lead.',
  },
  {
    icon: UserPlus,
    title: 'Capture every prospect',
    desc: 'Send a continue-link so prospects finish discovery in their own time. You get their brief and their contact.',
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

export default function Consultants() {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <div className="arch-label arch-label-yellow !text-left">For consultants &amp; agencies</div>
          <h1 className="mb-6">Run branded AI discovery for your clients.</h1>
          <p className="text-xl md:text-2xl mb-4 text-henway-charcoal/80 max-w-xl">
            Henway becomes your white-labeled discovery tool. Turn every &ldquo;we should use AI&rdquo; conversation
            into a scoped, build-ready brief, with your name on it.
          </p>
          <p className="text-lg md:text-xl font-bold text-black mb-8">
            <span className="bg-henway-yellow/50 px-1.5 py-0.5 rounded box-decoration-clone">
              You become the AI expert. We do the heavy lifting.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
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
                &ldquo;We want to use AI in our clinic but have no idea where to start.&rdquo;
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-henway-charcoal/40 mb-2">
                <Sparkles className="w-4 h-4 text-henway-yellow" /> Your Agency recommends
              </div>
              <div className="border border-black/10 bg-black/5 rounded-2xl p-4 mb-4">
                <p className="text-sm font-bold text-black mb-1">A HIPAA-ready scheduling assistant</p>
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
          <h2 className="text-white text-4xl md:text-6xl mb-8 leading-tight">Your clients want AI. Few know what to build.</h2>
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-5">
            That gap is your opening. Henway gives you a structured, credible way to run AI product discovery, so you show up as the guide, not the guesser.
          </p>
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

      {/* How you use it */}
      <section className="bg-white">
        <div className="section-container">
          <div className="text-center mb-14">
            <div className="arch-label arch-label-yellow mx-auto">How you use it</div>
            <h2 className="mb-3">From your brand to a booked client.</h2>
          </div>
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-3 md:gap-2 max-w-5xl mx-auto">
            {steps.map(([t, d], i) => (
              <div key={i} className="contents">
                <div className="flex-1 bg-henway-offwhite border border-henway-border rounded-2xl px-5 py-6 text-center">
                  <div className="w-9 h-9 rounded-full bg-henway-yellow text-black font-bold flex items-center justify-center mx-auto mb-3">{i + 1}</div>
                  <h4 className="text-lg mb-1">{t}</h4>
                  <p className="text-sm text-henway-charcoal/60">{d}</p>
                </div>
                {i < steps.length - 1 && <ArrowRight className="hidden md:block self-center w-5 h-5 text-henway-yellow flex-shrink-0 rotate-90 md:rotate-0" />}
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
                <span className="text-2xl font-bold text-black">$99<span className="text-base text-henway-charcoal/50">/mo</span></span>
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
