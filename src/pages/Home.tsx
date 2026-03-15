/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, MessageSquare, User, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

// Images in public/images/ – served by Vercel so they load reliably (no GitHub hotlinking)
const ASSETS = {
  LOGO_BLACK: "/images/logo-black.png",
  EGG_ICON: "/images/egg-icon.png",
  MIKE_PHOTO: "/images/mike.jpg",
  EGG_CIRCUIT: "/images/egg-circuit.png",
};

export default function Home() {
  return (
    <main className="pt-20">
      {/* Section 1: Hero */}
      <section id="hero" className="section-container flex flex-col items-center text-center min-h-[70vh] justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl"
        >
          <div className="text-henway-yellow font-bold text-sm mb-6 uppercase tracking-[0.2em]">Product Creation Platform</div>
          <h1 className="mb-8">Turn ideas into real AI products.</h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-henway-charcoal/80">
            Henway helps you turn your idea into a real tool. We help you plan it, design it, and show you exactly how to build it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/discover" className="btn-yellow w-full sm:w-auto">
              Start a Project
            </Link>
            <a href="#how-it-works" className="flex items-center gap-2 font-bold hover:gap-3 transition-all group text-lg">
              See how it works <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* Section 2: Cognitive Bridge */}
      <section id="how-it-works" className="bg-henway-offwhite">
        <div className="section-container">
          <div className="text-center mb-20">
            <div className="text-henway-charcoal/40 font-bold text-xs mb-4 uppercase tracking-[0.3em]">The Process</div>
            <h2 className="mb-4">From ambiguity to architecture.</h2>
            <p className="text-xl">We take your big idea and make it a clear plan.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Define",
                desc: "We listen to your idea. We help you figure out the problem and how data can solve it."
              },
              {
                title: "Design",
                desc: "We draw the map. We design how the smart computer parts will work and what the tool will look like."
              },
              {
                title: "Build",
                desc: "You get a clear path to build your product, or we can help you find the right people to do it."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-12 flex flex-col items-center text-center border border-gray-100 shadow-sm">
                <img src={ASSETS.EGG_ICON} alt="Egg Icon" className="w-12 h-12 mb-8" referrerPolicy="no-referrer" />
                <h3 className="mb-4">{item.title}</h3>
                <p className="text-lg text-henway-charcoal/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Anti-Consultant */}
      <section id="why-henway" className="section-container grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-henway-yellow font-bold text-xs mb-4 uppercase tracking-[0.3em]">The Problem</div>
          <h2 className="mb-8">Why most AI projects never ship.</h2>
        </div>
        <div>
          <p className="text-xl md:text-2xl leading-relaxed text-henway-charcoal/90">
            Most projects fail because people start building too fast. They guess instead of planning. Henway stops you from wasting money. We make sure your idea works before you spend a lot to build it.
          </p>
        </div>
      </section>

      {/* Section 4: Capabilities */}
      <section id="capabilities" className="bg-henway-offwhite">
        <div className="section-container">
          <div className="text-center mb-20">
            <div className="text-henway-charcoal/40 font-bold text-xs mb-4 uppercase tracking-[0.3em]">Our Expertise</div>
            <h2 className="mb-4">What we help you build.</h2>
            <p className="text-xl">Real tools that solve real problems.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Internal AI Copilots",
                desc: "Smart tools that help your team work faster and better every day."
              },
              {
                title: "Predictive Analytics Platforms",
                desc: "Tools that use your data to see what might happen next in your business."
              },
              {
                title: "Venture-Backed AI Startups",
                desc: "New companies built from the ground up with smart technology at the center."
              },
              {
                title: "Automated Workflows",
                desc: "Systems that do the boring work for you so you can focus on what matters."
              }
            ].map((item, idx) => (
              <div key={idx} className="card-grid">
                <h3 className="mb-4">{item.title}</h3>
                <p className="text-lg text-henway-charcoal/80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Success Stories */}
      <section id="stories" className="section-container">
        <div className="text-center mb-20">
          <div className="text-henway-yellow font-bold text-xs mb-4 uppercase tracking-[0.3em]">Social Proof</div>
          <h2 className="mb-4">Success Stories</h2>
          <p className="text-xl">How we've helped others manifest reality.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              client: "Healthcare Startup",
              outcome: "Reduced patient onboarding time by 60% using an AI-driven triage system.",
              quote: "Henway didn't just give us a deck; they gave us the blueprint for our entire core product."
            },
            {
              client: "E-commerce Brand",
              outcome: "Implemented predictive inventory scaling that saved $200k in overstock costs.",
              quote: "The clarity we got in the first two weeks was worth more than months of previous consulting."
            },
            {
              client: "SaaS Founder",
              outcome: "Launched a venture-backed AI copilot from a napkin sketch in under 90 days.",
              quote: "Mike and the team are the architectural bridge every non-technical founder needs."
            }
          ].map((item, idx) => (
            <div key={idx} className="p-10 border border-henway-border bg-white flex flex-col justify-between hover:border-henway-yellow transition-colors">
              <div>
                <div className="text-henway-yellow font-bold text-[10px] mb-6 uppercase tracking-[0.4em]">Case Study</div>
                <h3 className="text-xl mb-4 font-bold">{item.client}</h3>
                <p className="text-lg mb-8 font-medium leading-snug">{item.outcome}</p>
              </div>
              <p className="text-sm italic text-gray-500 border-t border-gray-100 pt-8">
                "{item.quote}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: The Founder */}
      <section id="founder" className="bg-henway-offwhite">
        <div className="section-container grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="text-henway-charcoal/40 font-bold text-xs mb-4 uppercase tracking-[0.3em]">The Visionary</div>
            <h2 className="mb-8">Meet Mike.</h2>
            <p className="text-xl mb-6 text-henway-charcoal/80">
              Dr. Michael Conward works at the intersection of Healthcare, Business, and AI. He started Henway to make smart technology easy for everyone.
            </p>
            <p className="text-2xl font-bold italic text-black">
              "Designing systems that work in the real world, not just in a lab."
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src={ASSETS.MIKE_PHOTO} 
              alt="Dr. Michael Conward" 
              className="w-full grayscale border border-henway-border shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Section: Split Contact / Consultation (New) */}
      <section id="contact" className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl mb-4">Not sure what's possible with AI?</h2>
          <p className="text-2xl text-henway-yellow font-bold">Let's figure it out—together.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: AI Assistant Path */}
          <div className="p-10 border-2 border-black flex flex-col items-center text-center h-full">
            <p className="text-xl mb-8 font-medium">
              Just describe a challenge you face at work. Our FREE assistant will guide you through a conversation and show you what AI can do.
            </p>
            <Link to="/discover" className="bg-black text-white font-bold py-4 px-8 mb-8 hover:scale-105 transition-transform">
              USE THE ASSISTANT (IT'S FREE)
            </Link>
            <div className="text-sm text-gray-500 space-y-1 mb-12">
              <p>No sign up required.</p>
              <p>Takes less than 5 min.</p>
            </div>
            <img src={ASSETS.EGG_CIRCUIT} alt="Egg Circuit" className="w-32 h-32 opacity-80" referrerPolicy="no-referrer" />
          </div>

          {/* Right: Human Path */}
          <div className="p-10 bg-henway-offwhite h-full">
            <div className="flex items-center gap-3 mb-8">
              <ArrowRight className="w-6 h-6" />
              <h3 className="text-2xl font-bold">Prefer to talk to a human instead?</h3>
            </div>
            <p className="mb-8 text-gray-600">
              Tell us about your challenge, and we'll follow up with personalized ideas or automation help.
            </p>
            
            {/* Form submits to Formspree – replace formId with yours from formspree.io */}
            <form
              action="https://formspree.io/f/YOUR_FORM_ID"
              method="POST"
              className="space-y-6"
            >
              <input type="text" name="_gotcha" className="hidden" aria-hidden="true" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="block text-xs font-bold uppercase mb-2">First Name *</label>
                  <input id="first-name" type="text" name="first_name" className="w-full p-3 border border-gray-300 rounded-none focus:border-henway-yellow outline-none" required />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-xs font-bold uppercase mb-2">Last Name *</label>
                  <input id="last-name" type="text" name="last_name" className="w-full p-3 border border-gray-300 rounded-none focus:border-henway-yellow outline-none" required />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase mb-2">Email *</label>
                <input id="email" type="email" name="email" className="w-full p-3 border border-gray-300 rounded-none focus:border-henway-yellow outline-none" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase mb-2">Message *</label>
                <textarea id="message" name="message" className="w-full p-3 border border-gray-300 rounded-none focus:border-henway-yellow outline-none h-32" placeholder="What's going on or what would you like help with?" required></textarea>
              </div>
              <button type="submit" className="w-full bg-henway-charcoal text-white font-bold py-4 hover:bg-black transition-colors">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Section 6: The Vision */}
      <section className="bg-black text-white py-24 md:py-32">
        <div className="section-container text-center max-w-4xl">
          <h2 className="text-white text-4xl md:text-6xl mb-12">The future of venture enablement.</h2>
          <p className="text-xl md:text-2xl text-gray-300">
            Henway is evolving. We aren't just building products; we are building a home for new companies. We provide the plans, the tools, and the help needed to turn a smart idea into a real business.
          </p>
        </div>
      </section>

      {/* Section 7: Rossi Quote */}
      <section className="section-container text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-2xl md:text-4xl font-light text-henway-charcoal italic max-w-4xl mx-auto leading-relaxed"
        >
          "That idea you've had that you don't know what to do with... we help you turn it into something real."
        </motion.p>
      </section>
    </main>
  );
}
