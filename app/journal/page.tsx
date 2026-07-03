import { Metadata } from 'next';
import Link from 'next/link';
import { BORDER, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, serif, sans, STUDIO_IMG, ROSE_IMG, PURPLE_BOUQUET } from '@/lib/constants';
import { SectionHead } from '@/app/components/SectionHead';

export const metadata: Metadata = {
  title: 'Design Inspiration | Afuvai Floral Society',
  description: 'Explore floral design inspiration, trends, and ideas from Afuvai Floral Society in Las Vegas.',
};

const inspirationPosts = [
  {
    title: 'Garden Palette Trends 2026',
    excerpt: 'Soft pastels and jewel tones dominate this season. Discover the colors defining luxury floral design this year.',
    image: ROSE_IMG,
  },
  {
    title: 'The Art of Seasonal Arrangement',
    excerpt: "Seasonal flowers tell a story. Learn how we design around nature's finest blooms throughout the year.",
    image: PURPLE_BOUQUET,
  },
  {
    title: 'Wedding Floral Philosophy',
    excerpt: 'Every wedding tells a story. Explore our approach to designing florals that reflect your love and vision.',
    image: STUDIO_IMG,
  },
];

export default function JournalPage() {
  return (
    <div style={{ background: IVORY }}>
      {/* Header */}
      <section className="border-b pt-20 pb-16" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <SectionHead
            label="Inspiration & Ideas"
            heading={<>Design<br />Journal</>}
          />
          <p style={{ color: MUTED, marginTop: '0.8rem', fontSize: '0.97rem', maxWidth: '500px' }}>
            Thoughts on floral design, seasonal beauty, and the art of creating meaningful arrangements.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {inspirationPosts.map((post, idx) => (
              <div
                key={idx}
                className="group border overflow-hidden transition-shadow duration-300 hover:shadow-lg"
                style={{ borderColor: BORDER, background: '#fff' }}
              >
                {/* Image */}
                <div style={{ height: '240px', overflow: 'hidden', background: CARD, position: 'relative' }} className="group">
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                    className="group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 style={{ fontFamily: serif, fontSize: '1.2rem', fontWeight: 500, color: INK, marginBottom: '0.5rem' }}>
                    {post.title}
                  </h3>
                  <p style={{ color: MUTED, fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                    {post.excerpt}
                  </p>
                  <a
                    href="#"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      color: SAGE,
                      textDecoration: 'none',
                      letterSpacing: '0.08em',
                      transition: 'opacity 0.3s',
                      opacity: 1,
                    }}
                    className="hover:opacity-70"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: SAGE, borderTop: `1px solid ${BORDER}` }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.24em', color: GOLD_L, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Inspiration
          </p>
          <h2 style={{ fontFamily: serif, fontSize: '2rem', color: IVORY, marginBottom: '1rem' }}>
            Get design ideas delivered.
          </h2>
          <p style={{ color: 'rgba(250,248,243,0.7)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Follow Afuvai on Instagram for daily inspiration and behind-the-scenes design work.
          </p>
          <a
            href="https://instagram.com/afuvaifloral"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              padding: '1rem 2rem',
              background: IVORY,
              color: SAGE,
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              transition: 'opacity 0.3s',
            }}
            className="hover:opacity-85"
          >
            Follow Afuvai
          </a>
        </div>
      </section>
    </div>
  );
}
