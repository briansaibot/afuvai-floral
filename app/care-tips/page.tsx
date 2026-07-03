import { Metadata } from 'next';
import { BORDER, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, serif, sans } from '@/lib/constants';
import { SectionHead } from '@/app/components/SectionHead';

export const metadata: Metadata = {
  title: 'Flower Care Guide | Afuvai Floral Society',
  description: 'Keep your Afuvai floral arrangement fresh and beautiful longer with our expert care guide.',
};

const careTips = [
  {
    icon: '✦',
    title: 'Water & Nutrients',
    points: [
      'Change water every 2–3 days',
      'Trim stem bottoms at 45° angle',
      'Use fresh, room-temperature water with flower food',
      'Remove leaves below the water line',
    ],
  },
  {
    icon: '◇',
    title: 'Light & Temperature',
    points: [
      'Keep away from direct sunlight',
      'Ideal temperature: 65–72°F',
      'Avoid ripening fruit and heating vents',
      'Cool environments extend vase life significantly',
    ],
  },
  {
    icon: '◆',
    title: 'Daily Maintenance',
    points: [
      'Remove fallen petals daily',
      'Mist lightly with water',
      'Re-trim stems every 3 days',
      'Remove wilted flowers promptly',
    ],
  },
];

export default function CareTipsPage() {
  return (
    <div style={{ background: IVORY }}>
      {/* Header */}
      <section className="border-b pt-20 pb-16" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <SectionHead
            label="Flower Care"
            heading={<>Keep Your Arrangement<br />Fresh &amp; Beautiful</>}
          />
          <p style={{ color: MUTED, marginTop: '0.8rem', fontSize: '0.97rem', maxWidth: '500px' }}>
            With proper care, your Afuvai flowers can last two to three weeks. Follow these simple steps to maximize beauty and longevity.
          </p>
        </div>
      </section>

      {/* Care Tips Grid */}
      <section className="py-16" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {careTips.map((tip, idx) => (
              <div key={idx} className="border p-7" style={{ borderColor: BORDER, background: '#fff' }}>
                <div style={{ fontFamily: serif, fontSize: '1.8rem', color: GOLD, marginBottom: '1rem' }}>
                  {tip.icon}
                </div>
                <h3 style={{ fontFamily: serif, fontSize: '1.2rem', fontWeight: 500, color: INK, marginBottom: '1rem' }}>
                  {tip.title}
                </h3>
                <ul style={{ color: MUTED, fontSize: '0.88rem', lineHeight: 1.8 }}>
                  {tip.points.map((point, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 style={{ fontFamily: serif, fontSize: '1.25rem', fontWeight: 500, color: INK, marginBottom: '0.75rem' }}>
                Common Questions
              </h3>
              <div style={{ color: MUTED, fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1rem' }}>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Why are leaves wilting?</strong> Excess leaves absorb water and promote bacteria. Remove all leaves below the waterline.
                </p>
                <p>
                  <strong>Can I reuse the arrangement?</strong> Yes. Remove fallen petals, re-trim stems, refresh water daily, and enjoy for weeks.
                </p>
              </div>
            </div>
            <div>
              <h3 style={{ fontFamily: serif, fontSize: '1.25rem', fontWeight: 500, color: INK, marginBottom: '0.75rem' }}>
                Extend Vase Life
              </h3>
              <div style={{ color: MUTED, fontSize: '0.9rem', lineHeight: 1.8 }}>
                <p style={{ marginBottom: '0.75rem' }}>
                  Use a clean vase with fresh water and flower food provided. Position away from heat sources, direct sun, and ripening fruit.
                </p>
                <p>
                  Cooler rooms naturally extend longevity — think bedroom or dining room rather than sunny kitchen windowsill.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: SAGE }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.24em', color: GOLD_L, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Questions?
          </p>
          <h2 style={{ fontFamily: serif, fontSize: '2rem', color: IVORY, marginBottom: '1rem' }}>
            We're here to help.
          </h2>
          <p style={{ color: 'rgba(250,248,243,0.7)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Email us with care questions or to discuss your arrangement needs.
          </p>
          <a
            href="mailto:hello@afuvai.com?subject=Flower%20Care%20Question"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              background: GOLD,
              color: '#fff',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'opacity 0.3s',
            }}
            className="hover:opacity-85"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  );
}
