import { SectionHead } from '@/app/components/SectionHead';
import { FaqBlock } from '@/app/components/FaqBlock';
import {
  BORDER, CARD, GOLD, INK, IVORY, MUTED, SAGE, serif,
} from '@/lib/constants';

export const metadata = {
  title: 'FAQ | AFUVAI',
  description: 'Frequently asked questions about AFUVAI floral design, delivery, subscriptions, and events.',
};

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'What areas do you deliver to?',
    a: 'We deliver same-day throughout the Las Vegas Valley, including Las Vegas, Henderson, North Las Vegas, Boulder City, and surrounding areas within our delivery zone. All subscription arrangements include free delivery.',
  },
  {
    q: "Can I pause or skip my subscription?",
    a: "Absolutely. You can pause, skip, or cancel any subscription anytime with 3 days' notice. No contracts, no penalties. Subscriptions are designed to work with your life, not against it.",
  },
  {
    q: "What flowers are in my arrangement?",
    a: "Every arrangement is designed by AmiDayne using seasonal, premium stems. We source garden roses, dahlias, ranunculus, spray roses, eucalyptus, and specialty greens. We accommodate color preferences and flower allergies — just let us know when you subscribe.",
  },
  {
    q: "Do you offer bulk flower orders?",
    a: "Yes. We design bulk arrangements for events, parties, and corporate gifting. Visit our Bulk page or call hello@afuvai.com for custom quotes on larger orders.",
  },
  {
    q: "How long do arrangements last?",
    a: "Our arrangements typically last 7-10 days with proper care. We include care instructions with every delivery. Keep water fresh, trim stems every 2-3 days, and remove lower foliage for best results.",
  },
  {
    q: "Can I gift a subscription?",
    a: "Yes. Gift subscriptions are available for 1, 3, or 6 months. Perfect for birthdays, holidays, or just because. Contact hello@afuvai.com to arrange.",
  },
  {
    q: "Do you offer wedding flowers?",
    a: "Yes. We design bridal bouquets, centerpieces, ceremony arrangements, and event florals. AmiDayne brings 40 years of family floral expertise from Wizard's Flower Magic. Schedule a free consultation to discuss your vision.",
  },
  {
    q: "What is your refund policy?",
    a: "If you're unsatisfied with any delivery, contact us within 24 hours and we'll redesign at no charge. Subscription customers can always skip or pause if an arrangement doesn't meet expectations.",
  },
  {
    q: "Do you ship nationally or internationally?",
    a: "We currently deliver same-day only in the Las Vegas Valley. We don't ship regionally or internationally, but all our arrangements are designed for local delivery to ensure maximum freshness.",
  },
  {
    q: "How do I schedule a consultation?",
    a: "Visit our Consultation page to book a 14-day calendar slot. Choose your preferred date and time (Mon-Sat, 10am/2pm/4pm). We'll design your first arrangement and discuss preferences.",
  },
  {
    q: "What if I need flowers same-day but not subscribed?",
    a: "Message us via WhatsApp or call hello@afuvai.com before 11am for same-day delivery. We'll design a custom arrangement and deliver the same day across the Las Vegas Valley.",
  },
  {
    q: "Do you offer corporate or bulk gifting?",
    a: "Yes. We design custom arrangements for offices, client gifts, employee appreciation, and events. Volume discounts available. Contact hello@afuvai.com for a quote.",
  },
];

export default function FaqPage() {
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      {/* Header */}
      <div className="border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 text-center">
          <SectionHead label="Questions?" heading="Frequently Asked" center />
          <p style={{ color: MUTED, marginTop: '0.8rem', fontSize: '0.97rem', maxWidth: '520px', margin: '0.8rem auto 0' }}>
            Everything you need to know about AFUVAI floral design, delivery, subscriptions, and events.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <FaqBlock items={FAQS} />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20" style={{ background: SAGE }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.24em', color: GOLD, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Still have questions?
          </p>
          <h2 style={{ fontFamily: serif, fontSize: '2rem', color: IVORY, marginBottom: '1rem' }}>
            Let's talk.
          </h2>
          <p style={{ color: 'rgba(250,248,243,0.85)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Email hello@afuvai.com or message us on WhatsApp. We're happy to help.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@afuvai.com"
              className="px-8 py-3 border-2 text-sm font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2 uppercase"
              style={{ color: IVORY, borderColor: IVORY, letterSpacing: '0.12em' }}
            >
              Email Us
            </a>
            <a
              href="https://wa.me/17025551234?text=Hi%20AFUVAI%2C%20I%20have%20a%20question%20about%20..."
              className="px-8 py-3 text-sm font-semibold hover:opacity-85 transition-opacity inline-flex items-center justify-center gap-2 uppercase"
              style={{ background: '#25D366', color: '#fff', letterSpacing: '0.12em' }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
