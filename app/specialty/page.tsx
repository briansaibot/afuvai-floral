import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { BORDER, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, serif, sans, WEDDING_ARCH, RECEPTION_TABLE, PARTY_IMG } from '@/lib/constants';
import { SectionHead } from '@/app/components/SectionHead';

export const metadata: Metadata = {
  title: 'Specialty Services | Afuvai Floral Society',
  description: 'DIY wedding florals, luxury venue arrangements, and Strip property event flowers for Las Vegas celebrations.',
};

const specialtyServices = [
  {
    title: 'DIY Weddings',
    description:
      'Empower your celebration with pre-designed arrangements and step-by-step guidance. Perfect for couples seeking creative control and exceptional value.',
    image: WEDDING_ARCH,
    cta: 'Learn About DIY',
    ctaLink: '/weddings',
  },
  {
    title: 'Luxury Venue Florals',
    description:
      'Grand ballrooms to intimate gardens — we craft sophisticated installations that complement your venue and elevate the entire celebration.',
    image: RECEPTION_TABLE,
    cta: 'Venue Collections',
    ctaLink: '/weddings',
  },
  {
    title: 'Las Vegas Strip Events',
    description:
      'Bold, glamorous arrangements designed for statement moments. From luxury properties to grand celebrations, we match the sophistication of the Strip.',
    image: PARTY_IMG,
    cta: 'Explore Services',
    ctaLink: '/parties',
  },
];

export default function SpecialtyPage() {
  return (
    <div style={{ background: IVORY }}>
      {/* Header */}
      <section className="border-b pt-20 pb-16" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <SectionHead
            label="Tailored Floral Solutions"
            heading={<>Specialty<br />Services</>}
          />
          <p style={{ color: MUTED, marginTop: '0.8rem', fontSize: '0.97rem', maxWidth: '500px' }}>
            From intimate gatherings to grand celebrations, we design arrangements that reflect your vision and elevate your event.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {specialtyServices.map((service, idx) => (
              <div
                key={idx}
                className="group border overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                style={{ borderColor: BORDER, background: '#fff' }}
              >
                {/* Image */}
                <div style={{ height: '240px', overflow: 'hidden', background: CARD }}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={400}
                    height={240}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 style={{ fontFamily: serif, fontSize: '1.25rem', fontWeight: 500, color: INK, marginBottom: '0.75rem' }}>
                    {service.title}
                  </h3>
                  <p style={{ color: MUTED, lineHeight: 1.75, fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                    {service.description}
                  </p>
                  <Link
                    href={service.ctaLink}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold hover:opacity-85 transition-opacity uppercase"
                    style={{ background: SAGE, color: '#fff', letterSpacing: '0.08em' }}
                  >
                    {service.cta} <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Afuvai */}
      <section className="py-16" style={{ borderBottom: `1px solid ${BORDER}`, background: CARD }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <SectionHead label="Excellence" heading="Why Choose Afuvai" center />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: 'Expert Design', desc: 'Decades of floral artistry meets refined aesthetic sensibility' },
              { title: 'Full Customization', desc: 'Every arrangement tailored to your vision, venue, and budget' },
              { title: 'Local Mastery', desc: 'Deep expertise in Las Vegas venues and event requirements' },
              { title: 'Premium Quality', desc: 'Fresh, seasonal flowers sourced from the finest growers' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <h3 style={{ fontFamily: serif, fontSize: '1.1rem', fontWeight: 500, color: INK, marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: MUTED, lineHeight: 1.75, fontSize: '0.88rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: SAGE }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.24em', color: GOLD_L, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Ready to Celebrate?
          </p>
          <h2 style={{ fontFamily: serif, fontSize: '2rem', color: IVORY, marginBottom: '1rem' }}>
            Let's discuss your vision.
          </h2>
          <p style={{ color: 'rgba(250,248,243,0.7)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Schedule a free consultation to explore possibilities tailored to your event.
          </p>
          <Link
            href="/consultation"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 hover:bg-white/10 transition-colors font-semibold uppercase text-sm"
            style={{ color: IVORY, borderColor: IVORY, letterSpacing: '0.12em' }}
          >
            Free Consultation <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
