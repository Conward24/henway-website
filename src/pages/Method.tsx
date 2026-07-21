/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { ArrowRight, Clipboard } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const APP_SIGNUP_URL = 'https://app.henwayai.com/signup';

const moves = [
  { n: '1', title: 'Name the friction', desc: 'Pick your industry. Answer three short questions about the thing that eats your time. You are describing a pain, not a product.' },
  { n: '2', title: 'Point at the win', desc: 'Choose what "great" looks like from ready-made options. Faster? Audit-proof? Zero manual steps? You pick the outcome; the method handles the wording.' },
  { n: '3', title: 'Pick the shape', desc: 'Automation, smart assistant, dashboard, or integrator? Pick the shape, then flag what matters: speed, compliance, integrations.' },
  { n: '4', title: 'Get your message', desc: 'Nothing new to write. It assembles from your four answers, matched to the right build tool, with a one-page brief and compliance flags where they apply.' },
];

export default function Method() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-container text-center max-w-4xl">
        <div className="arch-label arch-label-yellow mx-auto">The Bridge Method</div>
        <h1 className="mb-6">You don't need to learn to prompt.</h1>
        <p className="text-xl md:text-2xl text-henway-charcoal/80 max-w-2xl mx-auto mb-4">
          You didn't learn to code to build a website. You won't learn to prompt to build with AI.
          Here is the four-move method that turns what you already know into a build message.
        </p>
        <p className="text-lg font-bold text-black mb-8">
          <span className="bg-henway-yellow/50 px-1.5 py-0.5 rounded box-decoration-clone">Four moves. About seven minutes.</span>
        </p>
        <a href={APP_SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn-yellow">Start free</a>
      </section>

      {/* The gap */}
      <section className="bg-henway-charcoal text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="arch-label arch-label-yellow mx-auto">The real gap</div>
          <h2 className="text-white text-3xl md:text-5xl mb-8 leading-tight">Person → Translation → Perfect message → Build tool.</h2>
          <p className="text-xl text-white/70 leading-relaxed">
            Everyone works on the last link. The build tools are a well-run race. Prompt courses teach you to write the artifact by hand.
            Almost nobody owns the middle: turning your knowledge into a spec a tool can execute. That is the gap. The Bridge Method is how you cross it.
          </p>
        </div>
      </section>

      {/* The four moves */}
      <section className="section-container">
        <div className="text-center mb-14">
          <div className="arch-label arch-label-muted">The method</div>
          <h2 className="mb-3">Four moves. Each about your world, not about AI.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {moves.map((m) => (
            <div key={m.n} className="arch-card !mb-0 flex gap-5">
              <div className="w-12 h-12 rounded-full bg-henway-yellow text-black font-bold text-xl flex items-center justify-center flex-shrink-0">{m.n}</div>
              <div>
                <h3 className="text-xl mb-2 font-bold">{m.title}</h3>
                <p className="text-henway-charcoal/80">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-lg font-medium text-henway-charcoal/70 max-w-2xl mx-auto mt-12">
          The punchline: you never had to figure out a message. You described your world four times and the message fell out.
        </p>
      </section>

      {/* Worked example */}
      <section className="bg-henway-offwhite">
        <div className="section-container max-w-4xl">
          <div className="text-center mb-10">
            <div className="arch-label arch-label-yellow mx-auto">A worked example</div>
            <h2>From "records are a mess" to a build message.</h2>
          </div>
          <p className="text-lg text-henway-charcoal/80 mb-6 text-center max-w-2xl mx-auto">
            Start with what people actually say: "We waste hours every week rebooking clients across three different calendars by hand." Move 4 produces this.
          </p>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl overflow-hidden border border-henway-border shadow-2xl bg-white max-w-2xl mx-auto">
            <div className="flex items-center justify-between px-5 py-3 border-b border-henway-border bg-henway-offwhite">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-henway-charcoal/50">Your build message</span>
              <span className="text-xs font-bold text-black bg-henway-yellow rounded-full px-3 py-1">Recommended: Lovable</span>
            </div>
            <div className="p-5">
              <div className="rounded-xl border border-henway-border bg-henway-offwhite p-4">
                <p className="text-[15px] leading-relaxed text-henway-charcoal">
                  Build a web app called <strong>OneCalendar</strong> that pulls every booking into one schedule, auto-resolves double-bookings, and texts clients a confirmation. No manual re-entry.
                </p>
              </div>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-black"><Clipboard className="w-4 h-4" /> Copy message</div>
            </div>
          </motion.div>
          <p className="text-center text-henway-charcoal/60 mt-6 max-w-2xl mx-auto">
            Every clause traces back to a move. Nobody sat down to write a message. It is just your four answers, compressed.
          </p>
        </div>
      </section>

      {/* Honest note + CTA */}
      <section className="relative overflow-hidden bg-henway-charcoal text-white py-24">
        <div className="section-container text-center max-w-3xl">
          <h2 className="text-white text-4xl md:text-5xl mb-6">Do all four in about seven minutes.</h2>
          <p className="text-xl text-white/70 mb-4">
            The app runs the method with you: the right tool, your first message written for you, a one-page brief, and compliance flags. No code. No prompting skill.
          </p>
          <p className="text-base text-white/50 mb-10">
            One honest note: the message is the start of the build, not the end. Henway writes your messages, the first one and the next ones.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={APP_SIGNUP_URL} target="_blank" rel="noopener noreferrer" className="btn-yellow w-full sm:w-auto">Start free</a>
            <Link to="/studio" className="w-full sm:w-auto border-2 border-white/30 text-white font-bold rounded-full px-8 py-3 hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2">
              Have Us Build It <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
