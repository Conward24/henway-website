/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ArrowRight, MessageSquare, User, Send, Linkedin, ExternalLink, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const ASSETS = {
  LOGO_BLACK: "/images/logo-black.png",
  EGG_ICON: "/images/egg-icon.png",
  MIKE_PHOTO: "/images/mike.jpg",
  EGG_CIRCUIT: "/images/egg-circuit.png"
};

const caseStudies = [
  {
    client: "MyLÚA Health",
    sub: "Secure AI Chatbot",
    outcome: "We built a secure AI chatbot and web app that helps doctors support thousands of women’s health patients at once.",
    quote: "Henway designed and built our women’s health chatbot and web app from the ground up—HIPAA-compliant, AI-powered, and ready to scale. It’s secure, elegant, and built with care."
  },
  {
    client: "Blabbing",
    sub: "Social Platform Automation",
    outcome: "We automated the daily updates for a social platform, so it stays fresh and relevant without anyone having to lift a finger.",
    quote: "Henway helped us design the automation behind our daily prediction questions—it was a game-changer for keeping the platform timely and relevant. They also built tools that support our content distribution, which has saved us serious time."
  },
  {
    client: "Henway Deal Workspace",
    sub: "Finance Deal Smart Workspace",
    outcome: "We built a smart workspace for finance deals. It replaces messy spreadsheets so you can see if a deal makes sense in seconds.",
    quote: "One place per deal. We edit assumptions, see instantly if the numbers pencil, and get a draft LOI without juggling five different spreadsheets."
  },
  {
    client: "Vertical AI Demo Studio",
    sub: "AI Video Storyboarding",
    outcome: "We created a tool that turns a simple idea into a full video storyboard in minutes, saving hours of scriptwriting and planning.",
    quote: "Instead of wrestling with decks and scripts, we generate full storyboards—scenes, prompts, and costs—in a single pass. It’s become our default way to design vertical demo videos."
  },
  {
    client: "Grant Application System",
    sub: "Grant Tracking & Matching",
    outcome: "We built a system that finds the best grants for your business and tracks every deadline, so you never miss out on funding.",
    quote: "We stopped losing track of deadlines and half-finished drafts. The system surfaces the best-fit grants for each venture and shows exactly where every application stands."
  },
  {
    client: "InstantCloser",
    sub: "AI Sales Assistant",
    outcome: "We're building an AI sales assistant that answers customer questions and books appointments 24/7, even when the office is closed.",
    quote: "InstantCloser greets every visitor, answers clinical questions, and captures high-intent leads while the team is offline—so the website finally sells like a real front desk."
  }
];

const faqs = [
  {
    question: "What is AI Product Discovery?",
    answer: "It's our guided process to help you identify high-impact AI opportunities, define your technical requirements, and create a roadmap for building a real product. We help you move from 'what if' to 'here is how.'"
  },
  {
    question: "How long does a typical implementation take?",
    answer: "Discovery usually takes 1-2 weeks. A full build can range from 4 to 12 weeks depending on complexity, ensuring we deliver a production-ready tool, not just a prototype."
  },
  {
    question: "Is my data secure?",
    answer: "Security is our foundation. We specialize in HIPAA-compliant and SOC2-ready architectures, ensuring your proprietary data and user information are handled with Ph.D.-level rigor and industry-standard encryption."
  },
  {
    question: "Do I need a technical background to work with Henway?",
    answer: "Not at all. We act as your technical architect and CTO-on-demand. We translate your business vision into robust technical systems so you can focus on growth while we handle the engineering."
  },
  {
    question: "How do you handle AI hallucinations or accuracy?",
    answer: "We implement 'Human-in-the-loop' design and Retrieval-Augmented Generation (RAG) to ground AI responses in your specific data, significantly reducing errors and ensuring high reliability for business-critical tasks."
  }
];

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  key?: number | string;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button 
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
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
            <p className="pb-8 text-lg text-henway-charcoal/70 leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [isPaused, setIsPaused] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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
          <div className="arch-label arch-label-yellow">Product Creation Platform</div>
          <h1 className="mb-8">Turn ideas into real AI products.</h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-henway-charcoal/80">
            Henway helps you turn your idea into a real tool. We help you plan it, design it, and show you exactly how to build it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="btn-yellow w-full sm:w-auto">
              Start a Project
            </a>
            <Link to="/discover" className="btn-outline w-full sm:w-auto">
              Try the AI Assistant
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Consolidated Section: How we work */}
      <section id="how-it-works" className="bg-henway-charcoal py-32 text-white overflow-hidden">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="arch-label arch-label-yellow !text-left">How we work</div>
              <h2 className="text-white mb-8">From a rough idea to a real, working tool.</h2>
              <p className="text-xl text-white/70 mb-12 leading-relaxed">
                Most AI projects fail because they lack a clear plan. We act as your architect—we design the blueprint and then we stay to help you build it. No confusing decks, just tools that actually work.
              </p>
              
              <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-henway-yellow font-bold text-xl">01</span>
                  </div>
                  <div>
                    <h4 className="text-white mb-2">We learn your business</h4>
                    <p className="text-white/60">We listen to your idea and figure out exactly where AI can save you time or make you money. We don't use tech just for the sake of it.</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-henway-yellow font-bold text-xl">02</span>
                  </div>
                  <div>
                    <h4 className="text-white mb-2">We map the solution</h4>
                    <p className="text-white/60">We draw the "architectural drawings" for your software. We design how it works, how it looks, and how it talks to your other tools.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-henway-yellow font-bold text-xl">03</span>
                  </div>
                  <div>
                    <h4 className="text-white mb-2">We make it real</h4>
                    <p className="text-white/60">We build the actual system. Whether it's a secure health app or a smart finance workspace, we ensure the final product is fast, safe, and easy to use.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative w-full max-w-[340px] aspect-[9/16] rounded-[3rem] border-[12px] border-white/5 overflow-hidden shadow-2xl shadow-black/50"
              >
                <video
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src="/videos/how-we-work.mp4"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Capabilities */}
      <section id="capabilities" className="bg-henway-offwhite">
        <div className="section-container">
          <div className="text-center mb-20">
            <div className="arch-label arch-label-muted">Our Expertise</div>
            <h2 className="mb-4">What we help you build.</h2>
            <p className="text-xl">Real tools that solve real problems.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Predicting What's Next",
                desc: "We use your data to help you see patterns and trends, so you can stop guessing and start making smarter decisions about the future."
              },
              {
                title: "AI That Knows Your Business",
                desc: "We build AI that understands your specific rules and documents, so it gives you answers that actually fit your company."
              },
              {
                title: "Your AI Roadmap",
                desc: "We help you find the best ways to use AI so you don't waste time or money on projects that don't work."
              },
              {
                title: "Smart Systems",
                desc: "We replace slow, manual work with smart systems that follow your rules and get things done for you."
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
      <section id="stories" className="py-24 overflow-hidden">
        <div className="section-container mb-16 text-center">
          <div className="arch-label arch-label-yellow mx-auto">Case Studies</div>
          <h2 className="mb-4">Real projects, real results.</h2>
          <p className="text-xl text-henway-charcoal/60">How we've helped others turn ideas into reality.</p>
        </div>

        {/* Marquee Container */}
        <div className="relative flex overflow-x-hidden">
          <div 
            className={`flex gap-8 whitespace-nowrap py-4 marquee-track ${isPaused ? 'paused' : ''}`}
            style={{ width: "fit-content" }}
          >
            {[...caseStudies, ...caseStudies, ...caseStudies].map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setIsPaused(!isPaused)}
                className="w-[400px] md:w-[500px] flex-shrink-0 whitespace-normal arch-card !mb-0 group hover:border-henway-yellow transition-colors cursor-pointer"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-6">
                    <div className="arch-label arch-label-yellow !text-left !mb-4">Case Study</div>
                    <h3 className="text-2xl mb-2 font-bold">{item.client}</h3>
                    <p className="text-sm uppercase tracking-widest text-henway-charcoal/40 font-bold mb-4">{item.sub}</p>
                    <p className="text-lg font-medium leading-snug text-henway-charcoal/80">{item.outcome}</p>
                  </div>
                  <div className="mt-auto pt-8 border-t border-gray-100">
                    <p className="text-sm italic text-gray-500 leading-relaxed">
                      "{item.quote}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: The Founder */}
      <section id="founder" className="bg-white py-32">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Photo Column */}
            <div className="lg:col-span-4">
              <div className="space-y-8">
                <img 
                  src={ASSETS.MIKE_PHOTO} 
                  alt="Dr. Michael Conward" 
                  className="w-full grayscale rounded-3xl border border-henway-border shadow-xl"
                  referrerPolicy="no-referrer"
                />
                <div className="pl-6 border-l-4 border-henway-yellow">
                  <p className="text-2xl font-bold italic text-black leading-tight">
                    "Designing systems that work in the real world, not just in a lab."
                  </p>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-8">
              <div className="arch-label arch-label-yellow !text-left">The Founder</div>
              <h2 className="text-5xl md:text-6xl mb-6">Michael Conward, Ph.D.</h2>
              <p className="text-xl font-bold text-henway-charcoal/60 mb-8">Mechanical Engineer & AI Systems Architect</p>
              
              <div className="space-y-6 text-lg text-henway-charcoal/80 leading-relaxed max-w-3xl">
                <p>
                  Michael focuses on designing intelligent technology for high-stakes, real-world environments. With over 10 years of experience across startups, industry, and academia, he has led teams as a CTO and founder building AI-powered platforms in healthcare and advanced manufacturing.
                </p>
                <p>
                  His work applies first-principles engineering—including system safety and human-in-the-loop design—to modern AI architectures that support decision-making without replacing human judgment.
                </p>
              </div>

              {/* Credibility Links */}
              <div className="mt-12 flex flex-wrap gap-8 items-center">
                <a 
                  href="https://www.linkedin.com/in/michaelconward/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-bold text-black hover:text-henway-yellow transition-colors group"
                >
                  <Linkedin className="w-5 h-5" /> 
                  <span>LinkedIn Profile</span>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                
                <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
                
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Enterprise Credibility</span>
                  <div className="flex items-center gap-6">
                    <a 
                      href="https://www.ibm.com/think/author/michael-conward" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-bold hover:text-henway-yellow transition-colors flex items-center gap-1"
                    >
                      IBM Think <ExternalLink className="w-3 h-3" />
                    </a>
                    <a 
                      href="https://www.ibm.com/new/product-blog/how-mylua-health-built-a-secure-maternal-care-agentic-platform-with-ibm-watsonx-orchestrate-and-watsonx-ai" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-bold hover:text-henway-yellow transition-colors flex items-center gap-1"
                    >
                      IBM Product Blog <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: The Vision */}
      <section className="bg-black text-white py-24 md:py-32">
        <div className="section-container text-center max-w-4xl">
          <h2 className="text-white text-4xl md:text-6xl mb-12">Turning smart ideas into real businesses.</h2>
          <p className="text-xl md:text-2xl text-gray-300">
            Henway is evolving. We aren't just building products; we are building a home for new companies. We provide the blueprints, the tools, and the hands-on support needed to take a concept from a sketch to a successful launch.
          </p>
        </div>
      </section>

      {/* Section 7: Philosophy Quote */}
      <section className="py-24 bg-white text-center">
        <div className="section-container">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-5xl font-light text-henway-charcoal italic max-w-5xl mx-auto leading-tight tracking-tight"
          >
            "We take the ideas you've been carrying and build the systems that set them in motion."
          </motion.p>
        </div>
      </section>

      {/* Section: FAQ */}
      <section id="faq" className="py-32 bg-white">
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
                  <FAQItem 
                    key={idx}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFaqIndex === idx}
                    onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Contact */}
      <section id="contact" className="bg-henway-offwhite py-32">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <div className="arch-label arch-label-yellow !text-left">Get Started</div>
              <h2 className="mb-8">Let's build something real.</h2>
              <p className="text-xl text-henway-charcoal/80 mb-12 leading-relaxed">
                Whether you have a fully-formed spec or just a rough idea on a napkin, we can help you figure out the next step. 
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
                    <h4 className="font-bold mb-1">Not ready to talk?</h4>
                    <p className="text-gray-600">
                      Use our <Link to="/discover" className="underline font-medium hover:text-henway-yellow transition-colors">AI Discovery Tool</Link> to explore what's possible on your own.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 md:p-12 shadow-xl border border-henway-border rounded-3xl">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2">First Name</label>
                    <input type="text" className="w-full p-4 bg-henway-offwhite border-none focus:ring-2 focus:ring-henway-yellow outline-none transition-all rounded-xl" placeholder="Jane" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2">Last Name</label>
                    <input type="text" className="w-full p-4 bg-henway-offwhite border-none focus:ring-2 focus:ring-henway-yellow outline-none transition-all rounded-xl" placeholder="Doe" required />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2">Email Address</label>
                  <input type="email" className="w-full p-4 bg-henway-offwhite border-none focus:ring-2 focus:ring-henway-yellow outline-none transition-all rounded-xl" placeholder="jane@example.com" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2">Your Challenge</label>
                  <textarea className="w-full p-4 bg-henway-offwhite border-none focus:ring-2 focus:ring-henway-yellow outline-none transition-all h-32 resize-none rounded-xl" placeholder="What are you looking to build or automate?" required></textarea>
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
