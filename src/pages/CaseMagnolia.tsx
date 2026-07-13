/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { ArrowRight, Upload, Calculator, ShieldCheck, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const built = [
  { icon: Upload, title: 'Upload the CIM', desc: 'Drop in the confidential information memorandum (the 30-to-40-page dossier a broker sends). It extracts revenue and EBITDA automatically.' },
  { icon: Calculator, title: 'Model the financing', desc: 'An SBA financing model runs on the spot: purchase price at each multiple, equity required, seller note, and debt service.' },
  { icon: ShieldCheck, title: 'See if it pencils', desc: 'Instant DSCR and a green/yellow/red financeability read, so a go or no-go takes seconds, not an afternoon.' },
  { icon: FileText, title: 'Draft the LOI', desc: 'A letter of intent, prefilled from the deal. One upload in, a deliverable out.' },
];

export default function CaseMagnolia() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-container max-w-4xl">
        <div className="arch-label arch-label-yellow">Case Study · Henway Studio</div>
        <h1 className="mb-6">A deal workspace a search-fund operator actually trusts.</h1>
        <p className="text-xl md:text-2xl text-henway-charcoal/80 max-w-3xl">
          For an active searcher in the emerging ETA (entrepreneurship-through-acquisition) space, we replaced the messiest part of buying a business: reading a broker memo and hand-building a financial model before you can even decide if a deal is worth a call.
        </p>
        <div className="flex flex-wrap gap-x-8 gap-y-2 mt-8 text-sm font-bold text-henway-charcoal/50 uppercase tracking-widest">
          <span>Client · Michael Cole (Magnolia)</span>
          <span>Sector · Search-fund finance</span>
          <span>Build · 2-week pilot</span>
        </div>
      </section>

      {/* The problem */}
      <section className="bg-henway-offwhite">
        <div className="section-container max-w-3xl">
          <div className="arch-label arch-label-muted">The problem</div>
          <h2 className="mb-6">The unglamorous part eats the week.</h2>
          <p className="text-lg text-henway-charcoal/80 mb-4">
            A searcher finds a business. A broker sends a 40-page memo. Then the real work starts: hand-keying the P&amp;L into Excel, chasing down EBITDA adjustments, checking whether the deal still pencils. Every deal comes in a different format. Every template is a little different.
          </p>
          <p className="text-lg text-henway-charcoal/80">
            For someone without a finance background, it is slow, and easy to miss the thing that matters.
          </p>
          <blockquote className="border-l-4 border-henway-yellow pl-6 mt-8 text-xl md:text-2xl font-medium text-black leading-snug">
            "Reading a 30-page document and moving numbers into an Excel spreadsheet... can take a few hours."
            <cite className="block text-sm font-bold text-henway-charcoal/50 mt-3 not-italic uppercase tracking-widest">Michael Cole</cite>
          </blockquote>
        </div>
      </section>

      {/* What we built */}
      <section className="section-container">
        <div className="text-center mb-14">
          <div className="arch-label arch-label-yellow mx-auto">What we built</div>
          <h2>One workspace, one deal at a time.</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {built.map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} className="arch-card !mb-0 flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-henway-yellow flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-xl mb-2 font-bold">{b.title}</h3>
                  <p className="text-henway-charcoal/80">{b.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Screenshot: living summary */}
      <section className="bg-henway-offwhite">
        <div className="section-container max-w-5xl">
          <div className="rounded-2xl overflow-hidden border border-henway-border shadow-2xl">
            <img src="/images/case-magnolia-summary.png" alt="The Deal Workspace living summary: adjusted EBITDA, purchase-price range, DSCR and financeability, and the assumption change log." className="w-full h-auto block" />
          </div>
          <p className="text-center text-sm text-henway-charcoal/50 mt-4">The living deal summary. Upload the CIM, and DSCR, financeability, and the adjustment flags update on the spot.</p>
        </div>
      </section>

      {/* The design choice: trust */}
      <section className="bg-henway-charcoal text-white py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="arch-label arch-label-yellow">Why it earns trust</div>
          <h2 className="text-white text-3xl md:text-4xl mb-6 leading-tight">The feature nobody asks for: being able to trust the math.</h2>
          <p className="text-lg text-white/70 mb-4">
            An AI tool that spits out a purchase price is easy to build and easy to distrust. So we made a deliberate choice. The financials are deterministic. No model guessing at EBITDA, no black box. Every number traces to an input you can see and change.
          </p>
          <p className="text-lg text-white/70">
            In high-stakes, regulated work, "trust me" is a dealbreaker. "Here is exactly how I got this number" is the product.
          </p>
        </div>
      </section>

      {/* Outcome */}
      <section className="section-container max-w-3xl">
        <div className="arch-label arch-label-muted">The outcome</div>
        <h2 className="mb-6">Validated on his own past deals.</h2>
        <p className="text-lg text-henway-charcoal/80 mb-4">
          Built and delivered in a two-week sprint, then walked through live on the searcher's real deals. The manual path, read the memo, build the model, type the LOI, now runs in one pass.
        </p>
        <p className="text-sm text-henway-charcoal/50 mb-8">
          In the interest of honesty: the time saved is the searcher's own estimate, not a measured Henway metric, and no acquisition has closed on the back of the tool. It is a pilot, and we say so.
        </p>
        <div className="rounded-2xl overflow-hidden border border-henway-border shadow-xl mb-10">
          <img src="/images/case-magnolia-loi.png" alt="The generated Draft LOI: purchase price, multiple, owner's cash flow, equity, seller note, and SBA loan breakdown." className="w-full h-auto block" />
        </div>
        <blockquote className="border-l-4 border-henway-yellow pl-6 text-2xl md:text-3xl font-medium text-black leading-snug">
          "I think what you've delivered... saves hours already right there."
          <cite className="block text-sm font-bold text-henway-charcoal/50 mt-4 not-italic uppercase tracking-widest">Michael Cole, on walking through the workspace</cite>
        </blockquote>
        <p className="text-lg text-henway-charcoal/80 mt-10">
          And on what speed signals to the other side of the table:
        </p>
        <blockquote className="border-l-4 border-henway-yellow pl-6 mt-6 text-xl md:text-2xl font-medium text-black leading-snug">
          "Somebody sent you a SIM and 15 minutes later you got an LOI for him. The broker's looking at you like, okay, this guy's serious... This person is not kicking tires."
          <cite className="block text-sm font-bold text-henway-charcoal/50 mt-3 not-italic uppercase tracking-widest">Michael Cole</cite>
        </blockquote>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-henway-charcoal text-white py-24">
        <div className="section-container text-center max-w-3xl">
          <h2 className="text-white text-4xl md:text-5xl mb-6">Have a workflow buried in documents?</h2>
          <p className="text-xl text-white/70 mb-10">If your team does the same steps every deal, that is not a job. That is a spec. Henway Studio builds the tool that matches your friction.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/studio" className="btn-yellow w-full sm:w-auto inline-flex items-center justify-center gap-2">Talk to the Studio <ArrowRight className="w-4 h-4" /></Link>
            <a href="https://app.henwayai.com/signup" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto border-2 border-white/30 text-white font-bold rounded-full px-8 py-3 hover:bg-white/10 transition-colors">Try the App Free</a>
          </div>
        </div>
      </section>
    </main>
  );
}
