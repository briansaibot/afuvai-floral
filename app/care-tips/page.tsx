import { Metadata } from 'next';
import { BORDER, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, serif, sans } from '@/lib/constants';
import { SectionHead } from '@/app/components/SectionHead';

export const metadata: Metadata = {
  title: 'Flower Care Guide | AFUVAI',
  description: 'Expert floral care guide for Las Vegas climate. Keep your AFUVAI arrangement fresh and beautiful longer.',
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

const flowerCareGuide = [
  {
    flower: 'Roses & Garden Roses',
    care: 'Remove all thorns and foliage below waterline. Change water every 2 days. Roses are sensitive to ethylene gas — keep away from fruit and ripening vegetables. Mist petals daily for optimal appearance.',
  },
  {
    flower: 'Dahlias',
    care: 'Remove excess foliage and submerge stems for 30 seconds daily to hydrate. Dahlias are heavy drinkers — check water level daily. They prefer cooler temps (65–70°F). Re-cut stems every 3 days.',
  },
  {
    flower: 'Ranunculus',
    care: 'These delicate flowers need consistent water. Submerge stems in water each morning. Keep very cool (below 70°F for longevity). Remove any petals that brown at the edges.',
  },
  {
    flower: 'Spray Roses',
    care: 'More hardy than single roses. Remove lower foliage. Change water every 2–3 days. Keeps 7–10 days with proper care. Avoid ethylene exposure (fruit, ripening vegetables).',
  },
  {
    flower: 'Eucalyptus & Greenery',
    care: 'Greenery lasts longer than flowers — keep it hydrated. Remove all foliage below waterline. Change water frequently to prevent bacterial growth. Eucalyptus adds fragrance but will drop leaves naturally.',
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
            With proper care, your AFUVAI flowers can last two to three weeks. Follow these simple steps to maximize beauty and longevity.
          </p>
        </div>
      </section>

      {/* Core Care Tips Grid */}
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

      {/* Flower-Specific Care */}
      <section className="py-16" style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <h2 style={{ fontFamily: serif, fontSize: '1.8rem', color: INK, marginBottom: '2rem' }}>
            Flower-Specific Care
          </h2>
          <div className="space-y-4">
            {flowerCareGuide.map((item, idx) => (
              <div key={idx} className="border p-6" style={{ borderColor: BORDER, background: '#fff' }}>
                <h3 style={{ fontFamily: serif, fontSize: '1.1rem', color: GOLD, marginBottom: '0.5rem' }}>
                  {item.flower}
                </h3>
                <p style={{ color: MUTED, fontSize: '0.95rem', lineHeight: '1.7' }}>
                  {item.care}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Las Vegas Climate Section */}
      <section className="py-16" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <h2 style={{ fontFamily: serif, fontSize: '1.8rem', color: INK, marginBottom: '1rem' }}>
            Las Vegas Climate Considerations
          </h2>
          <p style={{ color: MUTED, fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '2rem' }}>
            Our desert climate is unique. Here's how to care for your flowers in Las Vegas:
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border p-6" style={{ borderColor: BORDER, background: CARD }}>
              <h3 style={{ fontFamily: serif, fontSize: '1.15rem', color: GOLD, marginBottom: '0.75rem' }}>
                Summer Heat (May–September)
              </h3>
              <ul style={{ color: MUTED, fontSize: '0.9rem', lineHeight: '1.8' }}>
                <li>• Keep arrangements in cooler rooms (air-conditioned spaces)</li>
                <li>• Change water every 1–2 days (heat accelerates bacteria growth)</li>
                <li>• Avoid windowsills with direct sun (UV damage)</li>
                <li>• Mist flowers more frequently (dry air desiccates petals)</li>
                <li>• Keep away from AC vents (direct airflow wilts blooms)</li>
              </ul>
            </div>
            <div className="border p-6" style={{ borderColor: BORDER, background: CARD }}>
              <h3 style={{ fontFamily: serif, fontSize: '1.15rem', color: GOLD, marginBottom: '0.75rem' }}>
                Dry Desert Air
              </h3>
              <ul style={{ color: MUTED, fontSize: '0.9rem', lineHeight: '1.8' }}>
                <li>• Humidity averages 20–30% in Vegas (very dry)</li>
                <li>• Mist arrangements daily with spray bottle</li>
                <li>• Use humidifier in the room if flowers look stressed</li>
                <li>• Check water level daily (evaporation is faster)</li>
                <li>• Petal edges may brown faster — this is normal</li>
              </ul>
            </div>
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
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Can I reuse the arrangement?</strong> Yes. Remove fallen petals, re-trim stems, refresh water daily, and enjoy for weeks.
                </p>
                <p>
                  <strong>Flowers arrived warm?</strong> Submerge stems in cool water for 30 minutes to rehydrate. Keep in cool room overnight before displaying.
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
                <p style={{ marginBottom: '0.75rem' }}>
                  Cooler rooms naturally extend longevity — think bedroom or dining room rather than sunny kitchen windowsill.
                </p>
                <p>
                  In Las Vegas summer, avoid placing arrangements in direct sunlight or near AC vents. Cooler, dimly-lit rooms preserve freshness best.
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
            Care Questions?
          </p>
          <h2 style={{ fontFamily: serif, fontSize: '2rem', color: IVORY, marginBottom: '1rem' }}>
            We're here to help.
          </h2>
          <p style={{ color: 'rgba(250,248,243,0.7)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Email us with care questions or reach out on WhatsApp anytime.
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
