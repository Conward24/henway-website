/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Lock, EyeOff, Trash2, CreditCard, Sparkles } from 'lucide-react';

const points = [
  {
    icon: Lock,
    title: 'Encrypted in transit and at rest',
    body: 'Everything runs over HTTPS. Contact details captured in a discovery (names, emails) are stored in an encrypted identity vault, kept separate from the discovery content itself.',
  },
  {
    icon: EyeOff,
    title: 'Your ideas stay yours',
    body: "We don't sell or publish your content, we don't use your concept to build a competing product, and one user's answers never influence another user's results. You own your ideas and the briefs and messages we generate for you.",
  },
  {
    icon: Sparkles,
    title: 'How AI is used',
    body: 'Your answers are sent to our AI sub-processor (Anthropic) solely to generate your brief, tool pick, and build message. Your raw idea text is not used to train models or improve the product.',
  },
  {
    icon: Trash2,
    title: 'Delete your data any time',
    body: 'Anyone can request erasure of their personal data from the self-serve privacy page, no account or login required. We honor it, keeping only what the law requires.',
  },
  {
    icon: CreditCard,
    title: 'Payments handled by Stripe',
    body: 'Billing runs through Stripe. Card numbers go straight to Stripe and are never stored on Henway servers.',
  },
  {
    icon: ShieldCheck,
    title: 'Only aggregates for improvement',
    body: 'To improve the product we look at de-identified, aggregated usage patterns, never your specific idea text or personal details.',
  },
];

export default function Security() {
  return (
    <main className="pt-20">
      <section className="section-container text-center max-w-4xl">
        <div className="w-16 h-16 rounded-2xl bg-henway-yellow mx-auto mb-6 flex items-center justify-center shadow-[0_16px_40px_rgba(255,204,0,.22)]"><ShieldCheck className="w-8 h-8 text-black" /></div>
        <div className="arch-label arch-label-yellow mx-auto">Security &amp; privacy</div>
        <h1 className="mb-6">Your ideas are the whole point. We treat them that way.</h1>
        <p className="text-xl text-henway-charcoal/80 max-w-2xl mx-auto">
          Henway is a place to think out loud about what you want to build. Here's plainly how we handle
          what you share.
        </p>
      </section>

      <section className="section-container">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="card-grid flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-henway-yellow flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl">{p.title}</h3>
                  <p className="text-henway-charcoal/80">{p.body}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Honest scope note — we help you flag compliance for what you build; we
          are not ourselves a compliance/BAA product. */}
      <section className="bg-henway-offwhite">
        <div className="section-container max-w-3xl">
          <div className="rounded-3xl border border-henway-eggline bg-henway-egg/50 border-l-4 border-l-henway-yellow p-8 md:p-10">
            <h2 className="mb-3 text-3xl">A straight answer on compliance</h2>
            <p className="text-lg text-henway-charcoal/80 mb-4">
              Henway helps you spot when an idea will carry rules like HIPAA or GDPR, so you build the right thing
              from day one. Henway itself is a discovery tool, not a regulated data system. Don't paste real patient
              records, secrets, or other sensitive third-party data into a session. We don't need it to do our job.
            </p>
            <p className="text-henway-charcoal/70">
              Questions about security, a data-processing agreement, or how we handle a specific case? Email{' '}
              <a href="mailto:support@henwayai.com" className="font-bold text-henway-ink underline decoration-henway-yellow decoration-2 underline-offset-2">support@henwayai.com</a>.
            </p>
          </div>
          <p className="text-sm text-henway-charcoal/50 mt-8">
            See also our{' '}
            <a href="https://app.henwayai.com/privacy" className="font-bold text-henway-charcoal/70 underline">Privacy Policy</a>{' '}
            and{' '}
            <a href="https://app.henwayai.com/terms" className="font-bold text-henway-charcoal/70 underline">Terms of Service</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
