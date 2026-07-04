import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHead } from '@/app/components/SectionHead';
import {
  BORDER, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, sans, serif,
  IMG_GARDEN_SUNRISE, IMG_GOLDEN_HOUR, IMG_SUMMER_RADIANCE, IMG_BLUSHING_GARDEN,
} from '@/lib/constants';

export const metadata = {
  title: 'Journal | AFUVAI',
  description: 'Floral inspiration, design philosophy, and gifting guides from AFUVAI.',
};

interface JournalPost {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}

const JOURNAL_POSTS: JournalPost[] = [
  {
    title: "The Art of Occasion Gifting",
    excerpt: "How to choose flowers that say what words cannot. A guide to meaningful floral gifting for every milestone.",
    date: "July 2026",
    readTime: "4 min read",
    image: IMG_SUMMER_RADIANCE,
    slug: "occasion-gifting",
  },
  {
    title: "Corporate & VIP Gifting",
    excerpt: "Elevate your client relationships and employee appreciation. How luxury florals create lasting impressions in business.",
    date: "June 2026",
    readTime: "5 min read",
    image: IMG_GOLDEN_HOUR,
    slug: "corporate-gifting",
  },
  {
    title: "The Philosophy Behind Every Arrangement",
    excerpt: "Design isn't decoration. It's intention. Learn how we approach each arrangement with precision, craft, and vision.",
    date: "May 2026",
    readTime: "6 min read",
    image: IMG_BLUSHING_GARDEN,
    slug: "design-philosophy",
  },
  {
    title: "Luxury Flower Delivery in Las Vegas",
    excerpt: "Why same-day matters. Why freshness is non-negotiable. Why every delivery from AFUVAI is treated like an event.",
    date: "April 2026",
    readTime: "4 min read",
    image: IMG_GARDEN_SUNRISE,
    slug: "luxury-delivery",
  },
];

export default function JournalPage() {
  return (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 text-center">
          <SectionHead
            label="Inspiration & Insight"
            heading="Journal"
            center
          />
          <p style={{ color: MUTED, marginTop: '0.8rem', fontSize: '0.97rem', maxWidth: '520px', margin: '0.8rem auto 0' }}>
            Essays on design, gifting, and the art of fresh flowers. Written by AmiDayne.
          </p>
        </div>
      </div>

      {/* Posts Grid */}
      <section className="py-20 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {JOURNAL_POSTS.map((post, idx) => (
              <article
                key={idx}
                className="border overflow-hidden hover:shadow-lg transition-shadow group"
                style={{ borderColor: BORDER, background: '#fff' }}
              >
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: '240px' }}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col h-full">
                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-4 text-xs">
                    <span style={{ color: MUTED, letterSpacing: '0.06em' }}>{post.date}</span>
                    <span style={{ color: MUTED }}>·</span>
                    <span style={{ color: MUTED, letterSpacing: '0.06em' }}>{post.readTime}</span>
                  </div>

                  {/* Title */}
                  <h2
                    style={{
                      fontFamily: serif,
                      fontSize: '1.35rem',
                      color: INK,
                      marginBottom: '0.75rem',
                      lineHeight: '1.4',
                    }}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p
                    style={{
                      color: MUTED,
                      fontSize: '0.95rem',
                      lineHeight: '1.7',
                      marginBottom: '1.5rem',
                      flex: 1,
                    }}
                  >
                    {post.excerpt}
                  </p>

                  {/* CTA */}
                  <a
                    href={`/journal/${post.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity uppercase"
                    style={{ color: SAGE, letterSpacing: '0.08em' }}
                  >
                    Read Essay <ArrowRight size={12} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20" style={{ background: SAGE }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.24em', color: GOLD_L, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Stay inspired
          </p>
          <h2 style={{ fontFamily: serif, fontSize: '2rem', color: IVORY, marginBottom: '1rem' }}>
            Floral inspiration delivered.
          </h2>
          <p style={{ color: 'rgba(250,248,243,0.85)', fontSize: '0.95rem', marginBottom: '2rem' }}>
            Essays on design, luxury, and the art of fresh flowers. Delivered to your inbox monthly.
          </p>
          <form className="flex flex-col md:flex-row gap-3 justify-center">
            <input
              type="email"
              placeholder="Your email"
              className="px-5 py-3 text-sm flex-1 md:flex-initial md:w-64"
              style={{ background: 'rgba(255,255,255,0.95)', color: INK }}
              required
            />
            <button
              type="submit"
              className="px-8 py-3 text-sm font-semibold hover:opacity-85 transition-opacity uppercase"
              style={{ background: GOLD, color: '#fff', letterSpacing: '0.12em' }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
