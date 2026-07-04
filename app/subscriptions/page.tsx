import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { SectionHead } from '@/app/components/SectionHead';
import { FaqBlock } from '@/app/components/FaqBlock';
import {
  BORDER, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, sans, serif,
  SUB_TIERS, FAQS_SUB,
} from '@/lib/constants';

export const metadata = {
  title: 'Floral Subscriptions Las Vegas | AFUVAI',
  description: 'Fresh flower delivery subscriptions in Las Vegas. Weekly, bi-weekly, or monthly arrangements. Designed by AmiDayne.',
};

export default function SubscriptionsPage() {
  // Map tier names to frequency descriptions
  const tierFrequencies = {
    Sage: 'Monthly',
    Gold: 'Bi-Weekly',
    Ivory: 'Weekly',
  };

  return (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 text-center">
          <SectionHead
            label="Recurring Beauty"
            heading={
              <>
                Flowers,<br />
                <em style={{ color: GOLD, fontStyle: 'italic' }}>delivered.</em>
              </>
            }
            center
          />
          <p style={{ color: MUTED, marginTop: '0.8rem', fontSize: '0.97rem', maxWidth: '520px', margin: '0.8rem auto 0' }}>
            Three tiers. Three delivery frequencies. Each designed by AmiDayne, delivered fresh to your Las Vegas address every week, bi-weekly, or month.
          </p>
        </div>
      </div>

      {/* Tiers */}
      <section className="py-20 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {SUB_TIERS.map((tier) => {
              const frequency = tierFrequencies[tier.name as keyof typeof tierFrequencies];
              const price = tier.price[frequency as keyof typeof tier.price];

              return (
                <div
                  key={tier.name}
                  className="border flex flex-col overflow-hidden hover:shadow-lg transition-shadow"
                  style={{
                    borderColor: tier.name === 'Gold' ? SAGE : BORDER,
                    borderWidth: tier.name === 'Gold' ? '2px' : '1px',
                    background: '#fff',
                  }}
                >
                  {/* Badge */}
                  {tier.badge && (
                    <div
                      className="text-center py-2"
                      style={{
                        background: tier.name === 'Gold' ? SAGE : GOLD,
                        fontSize: '0.65rem',
                        letterSpacing: '0.18em',
                        color: '#fff',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                      }}
                    >
                      {frequency}
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative overflow-hidden" style={{ height: '200px' }}>
                    <Image
                      src={tier.img}
                      alt={`${tier.name} subscription tier`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col flex-1">
                    {/* Tier name & price */}
                    <div className="mb-6">
                      <h3 style={{ fontFamily: serif, fontSize: '1.6rem', color: INK, marginBottom: '0.5rem' }}>
                        {tier.name}
                      </h3>
                      <div className="flex items-baseline gap-1">
                        <span style={{ fontFamily: serif, fontSize: '2.2rem', color: GOLD, fontWeight: '500' }}>
                          ${price}
                        </span>
                        <span style={{ fontSize: '0.9rem', color: MUTED, fontFamily: sans }}>
                          / {frequency.toLowerCase()}
                        </span>
                      </div>
                    </div>

                    {/* Items list */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {tier.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-3 items-start text-sm"
                          style={{ color: MUTED, lineHeight: '1.5' }}
                        >
                          <Check size={16} style={{ color: SAGE, flexShrink: 0, marginTop: '2px' }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href="/consultation"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold hover:opacity-85 transition-opacity uppercase"
                      style={{
                        background: tier.name === 'Gold' ? SAGE : GOLD,
                        color: '#fff',
                        letterSpacing: '0.08em',
                      }}
                    >
                      Learn More <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-12">
            <SectionHead label="The Process" heading="How subscriptions work" center />
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Your Tier', desc: 'Select Sage (monthly), Gold (bi-weekly), or Ivory (weekly).' },
              { step: '2', title: 'Share Preferences', desc: 'Tell us your color palette, flowers to avoid, or vase style.' },
              { step: '3', title: 'We Design', desc: 'Fresh arrangements designed weekly based on seasonal availability.' },
              { step: '4', title: 'Same-Day Delivery', desc: 'Delivered to your Las Vegas address on your schedule.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4"
                  style={{ background: GOLD, color: '#fff', fontFamily: serif, fontSize: '1.4rem', fontWeight: '600' }}
                >
                  {item.step}
                </div>
                <h3 style={{ fontFamily: serif, fontSize: '1.1rem', color: INK, marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: MUTED, fontSize: '0.9rem', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pause/Skip info */}
      <section className="py-16 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
          <h2 style={{ fontFamily: serif, fontSize: '1.8rem', color: INK, marginBottom: '1rem' }}>
            Flexibility built in.
          </h2>
          <p style={{ color: MUTED, fontSize: '0.95rem', lineHeight: '1.75', marginBottom: '1.5rem' }}>
            Pause or skip any delivery with 3 days' notice. No contracts, no penalties. Cancel anytime. Subscriptions are designed to work with your life, not against it.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-12">
            <SectionHead label="Questions" heading="Subscription FAQ" center />
          </div>
          <FaqBlock items={FAQS_SUB} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20" style={{ background: SAGE }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.24em', color: GOLD_L, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Ready to start?
          </p>
          <h2 style={{ fontFamily: serif, fontSize: '2.2rem', color: IVORY, marginBottom: '1rem' }}>
            Choose your tier.
          </h2>
          <p style={{ color: 'rgba(250,248,243,0.8)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Subscriptions start immediately. First arrangement designed and delivered within 2 business days.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 hover:bg-white/10 transition-colors font-semibold uppercase text-sm"
            style={{ color: IVORY, borderColor: IVORY, letterSpacing: '0.12em' }}
          >
            Start a Subscription <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
