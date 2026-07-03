import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Design Inspiration | Afuvai Floral Society',
  description: 'Explore floral design ideas, inspiration, and past work from Afuvai Floral',
};

const inspirationPosts = [
  {
    title: 'Blush & Gold Wedding',
    image: '/images/journal/blush-gold-wedding.jpg',
    category: 'Weddings',
    link: '/weddings',
  },
  {
    title: 'Tropical Party Setup',
    image: '/images/journal/tropical-party.jpg',
    category: 'Parties',
    link: '/parties',
  },
  {
    title: 'Minimalist Sage',
    image: '/images/journal/minimalist-sage.jpg',
    category: 'Events',
    link: '/specialty',
  },
  {
    title: 'Bold Strip Gala',
    image: '/images/journal/bold-strip-gala.jpg',
    category: 'Specialty',
    link: '/specialty',
  },
  {
    title: 'Garden Romantic',
    image: '/images/journal/garden-romantic.jpg',
    category: 'Weddings',
    link: '/weddings',
  },
  {
    title: 'Modern Geometric',
    image: '/images/journal/modern-geometric.jpg',
    category: 'Events',
    link: '/specialty',
  },
  {
    title: 'Seasonal Elegance',
    image: '/images/journal/seasonal-elegance.jpg',
    category: 'Collections',
    link: '/shop',
  },
  {
    title: 'Luxury Venue Glow',
    image: '/images/journal/luxury-venue-glow.jpg',
    category: 'Weddings',
    link: '/weddings',
  },
  {
    title: 'Intimate Tablescape',
    image: '/images/journal/intimate-tablescape.jpg',
    category: 'Events',
    link: '/specialty',
  },
];

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#5A6B54] to-[#5A6B54]/90">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-[#FAF8F3] mb-4">
            Design Inspiration
          </h1>
          <p className="text-lg text-[#FAF8F3]/90 font-dmSans">
            Explore our portfolio of floral designs and find inspiration for your event
          </p>
        </div>
      </section>

      {/* Inspiration Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {inspirationPosts.map((post, idx) => (
              <Link href={post.link} key={idx}>
                <div className="group relative h-80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gray-100">
                  {/* Image */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <span className="text-sm font-dmSans font-semibold text-[#B8995A] mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {post.category}
                    </span>
                    <h3 className="text-2xl font-playfair font-bold mb-2 opacity-100 group-hover:opacity-100 transition-opacity">
                      {post.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-[#5A6B54] mb-12 text-center">
            Explore Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Weddings',
                desc: 'From intimate ceremonies to grand celebrations',
                link: '/weddings',
              },
              {
                title: 'Specialty Events',
                desc: 'DIY, venues, and Las Vegas Strip experiences',
                link: '/specialty',
              },
              {
                title: 'Classes & Workshops',
                desc: 'Learn floral design from our expert instructors',
                link: '/classes',
              },
            ].map((service, idx) => (
              <Link href={service.link} key={idx}>
                <div className="text-center p-6 rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                  <h3 className="text-2xl font-playfair font-bold text-[#5A6B54] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 font-dmSans text-sm">{service.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-[#B8995A] text-center">
        <h2 className="text-3xl font-playfair font-bold text-[#FAF8F3] mb-4">
          Ready to Create Your Vision?
        </h2>
        <p className="text-[#FAF8F3]/90 font-dmSans mb-6 max-w-2xl mx-auto">
          Book a free consultation to discuss your floral design ideas
        </p>
        <Link
          href="/consultation"
          className="inline-block px-8 py-3 bg-[#5A6B54] text-[#FAF8F3] rounded-sm font-dmSans font-semibold hover:bg-[#4a5a44] transition-colors"
        >
          Schedule Consultation
        </Link>
      </section>
    </div>
  );
}
