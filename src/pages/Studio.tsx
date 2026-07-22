/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ArrowRight, MessageSquare, Send, Linkedin, ExternalLink, Plus, Minus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const ASSETS = {
  MIKE_PHOTO: "/images/headshot-2026.png",
  THINK_ON_STAGE: "/images/think-on-stage.jpg",
  THINK_OTHER_ANGLE: "/images/think-other-angle.jpg",
  THINK_ZOOM_STAGE: "/images/think-zoom-stage.jpg",
};

const faqs = [
  {
    question: "What is the first step?",
    answer: "We start with a 'Discovery' phase. We look at your business, find the best ways to use AI, and create a clear plan to build it. We help you move from 'what if' to 'here is how.'"
  },
  {
    question: "How long does it take to build?",
    answer: "Planning usually takes 1-2 weeks. Building the actual tool takes between 4 and 12 weeks, depending on how complex it is. You'll get a finished product that's ready to use, not just a demo."
  },
  {
    question: "Is my information safe?",
    answer: "Yes. We build everything with high-level security from the start. We use industry-standard encryption to keep your data private and safe, just like a bank or a hospital would."
  },
  {
    question: "Do I need to be a tech expert?",
    answer: "Not at all. We handle all the technical work for you. You bring the business vision, and we'll build the system that makes it happen."
  },
  {
    question: "Is the AI accurate?",
    answer: "Yes. We connect the AI directly to your specific business data. This means it gives answers based on your real information, which makes it much more reliable and accurate for your work."
  }
];

function FAQItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void; key?: number | string; }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={onClick} className="w-full py-6 flex items-center justify-between text-left group">
        <h4 className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-black' : 'text-henway-charcoal/60 group-hover:text-black'}`}>
          {question}
        </h4>
        <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          {isOpen ? <Minus className="w-5 h-5 text-henway-yellow" /> : <Plus className="w-5 h-5 text-gray-300 group-hover:text-henway-yellow" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-lg text-henway-charcoal/70 leading-relaxed max-w-3xl">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Studio() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <main>
      {/* Hero — the dark hatchery stage */}
      <section className="stage pt-28 md:pt-32 pb-20 md:pb-24">
        <div className="grain" />
        <div className="glow" style={{ top: '-120px', left: '-60px' }} />
        <div className="max-w-7xl mx-auto px-6 relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-henway-yellow mb-5">Henway Studio · Done-for-you</div>
            <h1 className="mb-6">Don’t want to build it yourself? We’ll build it for you.</h1>
            <p className="text-xl md:text-2xl mb-4 max-w-xl" style={{ color: '#b8ad90' }}>
              Bring the idea. We design and build the real thing, end to end, the same way we build for large
              companies on tools like IBM watsonx.
            </p>
            <p className="text-lg md:text-xl font-bold mb-8">
              <span className="bg-henway-yellow text-black px-2 py-1 rounded box-decoration-clone">Safe. Reliable. Finished.</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
              <a href="#contact" className="btn-yellow w-full sm:w-auto">Start a Project</a>
              <a href="https://app.henwayai.com/signup" target="_blank" rel="noopener noreferrer" className="btn-ghost-light w-full sm:w-auto">Try the App Instead</a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
          >
            <img src="/images/think-zoom-stage.jpg" alt="Henway founder Michael Conward, PhD, on the IBM Think 2026 keynote panel" className="w-full h-auto rounded-2xl shadow-2xl border border-white/10" referrerPolicy="no-referrer" />
            <p className="text-sm mt-3 text-center lg:text-left" style={{ color: '#b8ad90' }}>Michael Conward, PhD, on the IBM Think 2026 keynote panel, with senior leaders from IBM and Snap.</p>
          </motion.div>
        </div>
      </section>

      {/* How we work */}
      <section id="how-it-works" className="stage text-white overflow-hidden">
        <div className="grain" />
        <div className="section-container relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="arch-label arch-label-yellow !text-left">How we work</div>
              <h2 className="text-white mb-8">From a rough idea to a real, working tool.</h2>
              <p className="text-xl text-white/70 mb-10 leading-relaxed">
                Most AI projects fail because they lack a clear plan. We act as your architect. We design the blueprint and then we stay to help you build it. No confusing decks, just tools that actually work.
              </p>
              <div className="space-y-8">
                {[
                  ['01', 'We learn your business', "We listen to your idea and figure out exactly where AI can save you time or make you money. We don't use tech just for the sake of it."],
                  ['02', 'We map the solution', 'We draw the "architectural drawings" for your software. We design how it works, how it looks, and how it talks to your other tools.'],
                  ['03', 'We make it real', "We build the actual system. Whether it's a secure health app or a smart finance workspace, we ensure the final product is fast, safe, and easy to use."],
                ].map(([n, t, d]) => (
                  <div key={n} className="flex gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-henway-yellow font-bold text-xl">{n}</span>
                    </div>
                    <div>
                      <h4 className="text-white mb-2">{t}</h4>
                      <p className="text-white/60">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-full max-w-[340px] aspect-[9/16] rounded-[3rem] border-[12px] border-white/5 overflow-hidden shadow-2xl shadow-black/50"
              >
                <video controls autoPlay loop muted playsInline className="w-full h-full object-cover" src="/videos/how-we-work.mp4" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent work */}
      <section id="capabilities" className="bg-henway-offwhite">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="arch-label arch-label-muted">Recent work</div>
            <h2 className="mb-4">One deep proof point, and the track record behind it.</h2>
            <p className="text-xl text-henway-charcoal/60">A signed client pilot, ventures the founder cofounded, and tools we build for ourselves.</p>
          </div>

          {/* Featured case study: Magnolia */}
          <div className="grid lg:grid-cols-2 items-stretch rounded-3xl overflow-hidden border border-henway-border bg-white shadow-xl mb-16">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="arch-label arch-label-yellow !text-left">Featured case study · Finance</div>
              <h3 className="text-3xl md:text-4xl mb-4">A deal workspace a search-fund operator trusts.</h3>
              <p className="text-lg text-henway-charcoal/80 mb-6">Upload the CIM, see instantly if the deal pencils, and draft the letter of intent, without juggling five spreadsheets. Built for an active searcher in the ETA space.</p>
              <ul className="space-y-2 mb-6">
                {['Instant DSCR and financeability from one upload', 'Deterministic math the buyer can actually trust', 'A draft LOI, prefilled from the deal'].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-henway-charcoal/80"><Check className="w-5 h-5 text-henway-yellow flex-shrink-0 mt-0.5" />{t}</li>
                ))}
              </ul>
              <blockquote className="border-l-4 border-henway-yellow pl-5 text-lg italic text-black mb-8">"I think what you've delivered... saves hours already right there."<span className="block text-xs font-bold not-italic text-henway-charcoal/50 mt-2 uppercase tracking-widest">Michael Cole</span></blockquote>
              <Link to="/case-study/magnolia" className="btn-yellow self-start inline-flex items-center gap-2">Read the full case study <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="bg-henway-charcoal p-6 md:p-8 flex items-center">
              <img src="/images/case-magnolia-summary.png" alt="The Deal Workspace living summary, showing DSCR, financeability, and adjustment flags." className="w-full h-auto rounded-xl border border-white/10 shadow-2xl" />
            </div>
          </div>

          {/* Also from Henway */}
          <div className="text-center mb-8"><div className="arch-label arch-label-muted mx-auto">Also from Henway</div></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { tag: 'Cofounded', cat: 'Healthcare', title: 'MyLÚA Health', desc: 'A HIPAA-compliant maternal-health platform Michael cofounded, now running on IBM watsonx.', href: 'https://www.ibm.com/case-studies/mylua-health', linkLabel: 'IBM case study' },
              { tag: 'Cofounded', cat: 'Market intelligence', title: 'Blabbing', desc: 'An AI market-intelligence platform Michael cofounded and built the first version of.', href: 'https://blabbing.io', linkLabel: 'Visit site' },
              { tag: 'In-house', cat: 'Video', title: 'AI video storyboarding', desc: 'Our own tool that turns an idea into a full storyboard in one pass. We used it to produce our explainer video.' },
              { tag: 'In-house', cat: 'Funding', title: 'Grant tracking & matching', desc: 'An internal tool that surfaces best-fit grants and tracks every deadline.' },
            ].map((item: { tag: string; cat: string; title: string; desc: string; href?: string; linkLabel?: string }, idx) => (
              <div key={idx} className="card-grid flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="arch-label arch-label-muted !text-left !mb-0">{item.cat}</div>
                  <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-henway-charcoal/40 border border-henway-border rounded-full px-2 py-0.5">{item.tag}</span>
                </div>
                <h3 className="text-xl mb-2 font-bold">{item.title}</h3>
                <p className="text-henway-charcoal/70 leading-snug text-sm flex-1">{item.desc}</p>
                {item.href && (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-4 text-sm font-bold text-black hover:text-henway-charcoal/60">
                    {item.linkLabel} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Founder */}
      <section id="founder" className="bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4">
              <div className="space-y-8">
                <img
                  src={ASSETS.MIKE_PHOTO}
                  alt="Michael Conward, Ph.D., founder of Henway"
                  className="w-full rounded-3xl border border-henway-border shadow-xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="pl-6 border-l-4 border-henway-yellow">
                  <p className="text-2xl font-bold italic text-black leading-tight">
                    "We take the ideas you've been carrying and build the systems that set them in motion."
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="arch-label arch-label-yellow !text-left">The Founder</div>
              <h2 className="text-5xl md:text-6xl mb-6">Michael Conward, Ph.D.</h2>
              <p className="text-xl font-bold text-henway-charcoal/60 mb-8">Founder & Chief AI Architect</p>
              <div className="space-y-6 text-lg text-henway-charcoal/80 leading-relaxed max-w-3xl">
                <p>
                  Michael builds AI that works in the real world, where things actually matter and mistakes have consequences. With over 10 years of experience as a CTO and founder, he has led teams building high-stakes platforms in healthcare and manufacturing.
                </p>
                <p>
                  He uses his background in engineering to make sure AI is safe, reliable, and helpful. He doesn&apos;t believe in replacing people; he believes in building tools that help people make better decisions, faster.
                </p>
              </div>
              <div className="mt-12 flex flex-wrap gap-8 items-center">
                <a href="https://www.linkedin.com/in/michaelconward/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold text-black hover:text-henway-yellow transition-colors group">
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Enterprise Credibility</span>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <a href="https://www.ibm.com/case-studies/mylua-health" target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:text-henway-yellow transition-colors flex items-center gap-1">
                      IBM Case Study <ExternalLink className="w-3 h-3" />
                    </a>
                    <a href="https://www.ibm.com/think/author/michael-conward" target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:text-henway-yellow transition-colors flex items-center gap-1">
                      IBM Think <ExternalLink className="w-3 h-3" />
                    </a>
                    <a href="https://www.ibm.com/new/product-blog/how-mylua-health-built-a-secure-maternal-care-agentic-platform-with-ibm-watsonx-orchestrate-and-watsonx-ai" target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:text-henway-yellow transition-colors flex items-center gap-1">
                      IBM Product Blog <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {["IBM Think 2026 Keynote Panel", "IBM TechXChange 2026 Speaker", "IBM Data & AI Customer Advisory Board"].map((badge) => (
                  <span key={badge} className="text-xs font-bold text-henway-charcoal/70 bg-henway-offwhite border border-henway-border rounded-full px-4 py-2">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IBM Think keynote */}
      <section id="ibm-think" className="bg-henway-offwhite">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="arch-label arch-label-yellow !text-left">On the IBM Think stage</div>
              <h2 className="mb-6">Trusted on one of tech's biggest stages.</h2>
              <p className="text-lg text-henway-charcoal/80 mb-6 leading-relaxed">
                IBM invited Henway founder Michael Conward, Ph.D. to speak at Think, its biggest conference, alongside senior leaders from IBM and Snap. The topic: how to build AI that large companies can actually trust.
              </p>
              <p className="text-lg text-henway-charcoal/80 leading-relaxed">
                Getting AI to work safely inside a big company is hard. The panel talked through how to do it the right way, so the technology stays reliable, safe, and easy to keep an eye on.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={ASSETS.THINK_ON_STAGE} alt="The panel on stage at IBM Think 2026 beneath the Think banner" className="w-full aspect-[4/5] rounded-2xl shadow-lg object-cover" loading="lazy" referrerPolicy="no-referrer" />
              <img src={ASSETS.THINK_OTHER_ANGLE} alt="Another angle of the IBM Think 2026 session" className="w-full aspect-[4/5] rounded-2xl shadow-lg object-cover" loading="lazy" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-12">
            <div className="bg-white border border-henway-border rounded-2xl p-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-henway-yellow">IBM Think 2026 · Keynote panel</span>
              <p className="font-bold text-black mt-1">Centralize control of your AI Agents</p>
              <p className="text-sm text-henway-charcoal/60">Michael spoke alongside senior leaders from IBM and Snap, in IBM's Spotlight Theater.</p>
            </div>
            <div className="bg-white border border-henway-border rounded-2xl p-5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-henway-yellow">IBM TechXChange 2026 · Upcoming talk</span>
              <p className="font-bold text-black mt-1">Healthcare Agents Under Real-World Constraints [TEC-2689]</p>
              <p className="text-sm text-henway-charcoal/70 mt-1">
                A behind-the-scenes look at what it really takes to build AI for healthcare, where privacy rules are strict and there is no room for mistakes. Less a how-to, more hard-won lessons.
              </p>
              <p className="text-xs text-henway-charcoal/40 mt-2 uppercase tracking-wide">A talk for healthcare and AI teams</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <div className="arch-label arch-label-yellow !text-left">Common Questions</div>
                <h2 className="mb-6">Everything you need to know.</h2>
                <p className="text-xl text-henway-charcoal/60 mb-8">
                  Can't find what you're looking for? <a href="#contact" className="text-black font-bold underline decoration-henway-yellow underline-offset-4">Send us a message</a>.
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="border-t border-gray-100">
                {faqs.map((faq, idx) => (
                  <FAQItem key={idx} question={faq.question} answer={faq.answer} isOpen={openFaqIndex === idx} onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-henway-offwhite">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <div className="arch-label arch-label-yellow !text-left">Get Started</div>
              <h2 className="mb-8">Let's build something real.</h2>
              <p className="text-xl text-henway-charcoal/80 mb-12 leading-relaxed">
                Want us to build your AI product for you? Tell us about it below. Whether you have a full plan or just a rough idea on a napkin, we will help you figure out the next step.
              </p>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-henway-yellow/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5 text-henway-yellow" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Direct Consultation</h4>
                    <p className="text-gray-600">Fill out the form and we'll be in touch within 24 hours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-henway-yellow/10 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-5 h-5 text-henway-yellow" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Rather build it yourself?</h4>
                    <p className="text-gray-600">
                      Use the <a href="https://app.henwayai.com/signup" target="_blank" rel="noopener noreferrer" className="underline font-medium hover:text-henway-yellow transition-colors">Henway app</a> to find your build tool and first message on your own, free.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 md:p-12 shadow-xl border border-henway-border rounded-3xl">
              <form action="https://formspree.io/f/xreyyzpa" method="POST" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2">First Name</label>
                    <input type="text" name="first_name" className="w-full p-4 bg-henway-offwhite border-none focus:ring-2 focus:ring-henway-yellow outline-none transition-all rounded-xl" placeholder="Jane" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2">Last Name</label>
                    <input type="text" name="last_name" className="w-full p-4 bg-henway-offwhite border-none focus:ring-2 focus:ring-henway-yellow outline-none transition-all rounded-xl" placeholder="Doe" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2">Email Address</label>
                  <input type="email" name="_replyto" className="w-full p-4 bg-henway-offwhite border-none focus:ring-2 focus:ring-henway-yellow outline-none transition-all rounded-xl" placeholder="jane@example.com" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2">Your Challenge</label>
                  <textarea name="message" className="w-full p-4 bg-henway-offwhite border-none focus:ring-2 focus:ring-henway-yellow outline-none transition-all h-32 resize-none rounded-xl" placeholder="What are you looking to build or automate?" required></textarea>
                </div>
                <button type="submit" className="w-full bg-black text-white font-bold py-5 flex items-center justify-center gap-3 hover:bg-henway-charcoal transition-all group rounded-xl">
                  SEND MESSAGE <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
