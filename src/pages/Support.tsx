/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageCircle, Mail, Clock, CreditCard } from 'lucide-react';

const tiers = [
  { plan: 'Agency', window: 'Same business day', note: 'Priority' },
  { plan: 'Consultant', window: 'Within 1 business day', note: '' },
  { plan: 'Free & Founder', window: 'Within 2 business days', note: '' },
];

export default function Support() {
  return (
    <main className="pt-20">
      <section className="section-container text-center max-w-4xl">
        <div className="arch-label arch-label-yellow mx-auto">Help &amp; support</div>
        <h1 className="mb-6">A real person answers.</h1>
        <p className="text-xl text-henway-charcoal/80 max-w-2xl mx-auto">
          We're a small team and we read every message. Here's how to reach us and what to expect.
        </p>
      </section>

      {/* How to reach us */}
      <section className="section-container">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="card-grid">
            <div className="w-12 h-12 rounded-xl bg-henway-yellow flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-black" />
            </div>
            <h3 className="mb-2 text-xl">From inside the app</h3>
            <p className="text-henway-charcoal/80 mb-4">
              Signed in? Open <strong>Help</strong> in the top nav to send us a message, share feedback, or request a
              feature. It routes straight to us, tagged with your plan.
            </p>
            <a href="https://app.henwayai.com/help" className="font-bold text-black underline decoration-henway-yellow decoration-2 underline-offset-2">Open Help in the app →</a>
          </div>
          <div className="card-grid">
            <div className="w-12 h-12 rounded-xl bg-henway-yellow flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-black" />
            </div>
            <h3 className="mb-2 text-xl">By email</h3>
            <p className="text-henway-charcoal/80 mb-4">
              Prefer email, or not signed up yet? Reach us any time and we'll get back to you.
            </p>
            <a href="mailto:support@henwayai.com" className="font-bold text-black underline decoration-henway-yellow decoration-2 underline-offset-2">support@henwayai.com</a>
          </div>
        </div>
      </section>

      {/* Response times */}
      <section className="bg-henway-offwhite">
        <div className="section-container max-w-4xl">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-henway-yellow" />
            <h2 className="m-0 text-3xl">Response times</h2>
          </div>
          <div className="rounded-2xl border border-henway-border bg-white overflow-hidden">
            {tiers.map((t, i) => (
              <div key={t.plan} className={`flex items-center justify-between gap-4 px-6 py-5 ${i > 0 ? 'border-t border-henway-border' : ''}`}>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-black">{t.plan}</span>
                  {t.note && (
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-henway-yellow text-black rounded-full px-2 py-0.5">{t.note}</span>
                  )}
                </div>
                <span className="text-henway-charcoal/70">{t.window}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-henway-charcoal/50 mt-4">
            Business days, roughly 9-5 US time. We often reply faster.
          </p>
        </div>
      </section>

      {/* Billing, cancellation, refunds — plain English, links to Terms */}
      <section className="section-container max-w-3xl">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-henway-yellow" />
          <h2 className="m-0 text-3xl">Billing &amp; cancellation</h2>
        </div>
        <ul className="space-y-3 text-lg text-henway-charcoal/80 list-disc pl-6">
          <li>Paid plans renew automatically each period until you cancel.</li>
          <li>Cancel any time from the billing portal in the app. Your plan stays active until the end of the period you've paid for, then drops to Free.</li>
          <li>Your work is never deleted when a plan ends. It's just locked behind the plan you were on.</li>
          <li>Fees are non-refundable except where the law requires. If something went wrong, email us anyway. We're reasonable.</li>
        </ul>
        <p className="text-sm text-gray-500 mt-8">
          Full details in our{' '}
          <a href="https://app.henwayai.com/terms" className="font-bold text-gray-600 underline">Terms of Service</a>.
        </p>
      </section>
    </main>
  );
}
