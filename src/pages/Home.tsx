/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import CaseStudies from '../components/CaseStudies';

const steps = [
  { n: '1', title: 'Say what slows you down', desc: 'Pick your industry and have a short, 3-question chat. Tap an answer or type your own.' },
  { n: '2', title: 'Point at the win', desc: 'Choose what “great” looks like from a few ready-made options. No essays.' },
  { n: '3', title: 'Pick the shape', desc: 'Automate it, make it smarter, or connect your tools. Pick the direction that fits.' },
  { n: '4', title: 'Get your prompt', desc: 'Walk away with the right tool, your first prompt, and a one-page brief.' },
];

export default function Home() {
  return (
    <main className="pt-20">
      {/* Section 1: Hero — bridge / translation-layer positioning */}
      <section id="hero" className="section-container grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center lg:text-left"
        >
          <div className="arch-label arch-label-yellow">The layer between you and AI</div>
          <h1 className="mb-6">Turn what you already know into what AI can build.</h1>
          <p className="text-xl md:text-2xl mb-8 text-henway-charcoal/80 max-w-xl mx-auto lg:mx-0">
            AI can build almost anything, if you know exactly what to say. Henway is the bridge: you speak
            in plain words about work you already understand, and it writes the expert prompt and picks the
            right tool. No prompting, no code.
          </p>
          <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
            <Link to="/product" className="btn-yellow w-full sm:w-auto">
              Try the App Free
            </Link>
            <Link to="/studio" className="btn-outline w-full sm:w-auto">
              Have Us Build It
            </Link>
          </div>
        </motion.div>

        {/* Hero visual: the translation bridge illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="w-full"
        >
          <div className="rounded-2xl overflow-hidden border border-henway-border shadow-2xl">
            <img
              src="/images/bridge.jpg"
              alt="You describe your problem in plain words, Henway translates it, and AI builds the product."
              className="w-full h-auto block"
            />
          </div>
        </motion.div>
      </section>

      {/* Section: Manifesto — why Henway exists */}
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
          <p className="text-2xl md:text-3xl font-bold text-white mt-10">
            You bring what you know. We bring the perfect prompt.
          </p>
        </div>
      </section>

      {/* Section: How the app works (condensed; full walkthrough lives on /product) */}
      <section id="how" className="bg-white scroll-mt-20">
        <div className="section-container">
          <div className="text-center mb-14">
            <div className="arch-label arch-label-muted">How the app works</div>
            <h2 className="mb-3">Your idea to a build plan in 7 minutes.</h2>
            <p className="text-xl text-henway-charcoal/60">Answer a few questions in plain words. No prompting, no code.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="card-grid h-full">
                <div className="w-12 h-12 rounded-full bg-henway-yellow text-black font-bold text-xl flex items-center justify-center mb-5">
                  {s.n}
                </div>
                <h4 className="mb-2">{s.title}</h4>
                <p className="text-henway-charcoal/70">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/product" className="btn-outline inline-flex items-center gap-2">
              See it in action <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Proof — case studies */}
      <CaseStudies />

      {/* Section: Two ways to build */}
      <section id="two-ways" className="bg-henway-offwhite">
        <div className="section-container">
          <div className="text-center mb-14">
            <div className="arch-label arch-label-muted">Two ways to build with Henway</div>
            <h2 className="mb-4">Build it yourself, or have us build it.</h2>
            <p className="text-xl text-henway-charcoal/60">Same starting point. You choose how far we go.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* DIY: the app */}
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
              <Link to="/product" className="btn-yellow mt-auto self-start">Try the App Free</Link>
            </div>

            {/* Done-for-you: studio */}
            <div className="card-grid flex flex-col bg-henway-charcoal text-white border-henway-charcoal">
              <div className="arch-label arch-label-yellow !text-left">Have us build it</div>
              <h3 className="text-white mb-4">Done-for-you build</h3>
              <p className="text-lg text-white/70 mb-6">
                Bring the idea and we design and build the real thing for you. Safe, reliable, and finished, the same way we build for large companies on tools like IBM watsonx.
              </p>
              <ul className="space-y-2 mb-8 text-white/70">
                <li>From discovery to launch</li>
                <li>Healthcare, finance, and other industries with strict rules</li>
                <li>Hands-on, end to end</li>
              </ul>
              <Link to="/studio" className="btn-yellow mt-auto self-start">Meet Henway Studio</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Trust strip (studio credibility, condensed) */}
      <section className="bg-white py-20 md:py-24 border-t border-henway-border">
        <div className="section-container text-center max-w-3xl">
          <div className="arch-label arch-label-muted mx-auto">Built by a team you can trust</div>
          <h2 className="text-3xl md:text-4xl mb-4">Founded by Michael Conward, PhD. Featured on the IBM Think 2026 stage.</h2>
          <p className="text-lg text-henway-charcoal/70 mb-8">
            Henway comes from the same team that ships secure AI for healthcare and finance companies on tools
            like IBM watsonx. The app puts that expertise in your hands.
          </p>
          <Link to="/studio" className="btn-outline inline-flex items-center gap-2">
            Meet Henway Studio <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Section: Final CTA */}
      <section className="bg-henway-charcoal text-white py-24 md:py-28">
        <div className="section-container text-center max-w-3xl">
          <h2 className="text-white text-4xl md:text-5xl mb-8">Your idea is one conversation away from buildable.</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/product" className="btn-yellow w-full sm:w-auto">Try the App Free</Link>
            <Link to="/studio" className="w-full sm:w-auto border-2 border-white/30 text-white font-bold rounded-full px-8 py-3 hover:bg-white/10 transition-colors">
              Have Us Build It
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
