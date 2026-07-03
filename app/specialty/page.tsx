import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Specialty Services | Afuvai Floral Society',
  description: 'DIY wedding florals, luxury venue arrangements, and Strip property event flowers',
};

const specialtyServices = [
  {
    title: 'DIY Weddings',
    description:
      "We empower couples to create their own wedding florals with expert guidance. Our DIY packages include pre-designed arrangements, step-by-step tutorials, and full support to bring your vision to life—at a fraction of traditional florist costs.",
    image: '/images/specialty/diy-wedding.jpg',
    cta: 'Learn About DIY',
    ctaLink: '/weddings',
    color: 'sage',
  },
  {
    title: 'Luxury Wedding Venues',
    description:
      "We partner with Las Vegas's most prestigious venues to deliver sophisticated floral installations. From grand ballrooms to intimate garden settings, we create arrangements that complement your venue and elevate your celebration.",
    image: '/images/specialty/luxury-venue.jpg',
    cta: 'Venue Arrangements',
    ctaLink: '/weddings',
    color: 'gold',
  },
  {
    title: 'Las Vegas Strip & Casino Events',
    description:
      'From intimate private events at luxury properties to grand casino celebrations, we design bold, glamorous arrangements that match the glitz of the Strip. Our high-impact designs are built for statement moments.',
    image: '/images/specialty/strip-events.jpg',
    cta: 'Explore Strip Services',
    ctaLink: '/parties',
    color: 'ivory',
  },
];

export default function SpecialtyPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#5A6B54] to-[#5A6B54]/90">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-[#FAF8F3] mb-4">
            Specialty Services
          </h1>
          <p className="text-lg text-[#FAF8F3]/90 font-dmSans">
            Tailored floral solutions for your unique celebration
          </p>
        </div>
      </section>

      {/* Specialty Cards Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialtyServices.map((service, idx) => (
              <div
                key={idx}
                className="group rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-playfair font-bold text-[#5A6B54] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 font-dmSans text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* CTA Button */}
                  <Link
                    href={service.ctaLink}
                    className={`inline-block px-6 py-2 rounded-sm font-dmSans font-semibold text-sm transition-all duration-300 ${
                      service.color === 'sage'
                        ? 'bg-[#5A6B54] text-[#FAF8F3] hover:bg-[#4a5a44]'
                        : service.color === 'gold'
                        ? 'bg-[#B8995A] text-[#FAF8F3] hover:bg-[#a8894a]'
                        : 'bg-[#FAF8F3] text-[#5A6B54] border-2 border-[#5A6B54] hover:bg-[#5A6B54] hover:text-[#FAF8F3]'
                    }`}
                  >
                    {service.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose AFUVAI Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-[#5A6B54] text-center mb-12">
            Why Choose AFUVAI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Expert Design',
                desc: 'Decades of floral artistry meets modern aesthetic sensibilities',
              },
              {
                title: 'Customization',
                desc: 'Every arrangement tailored to your venue, vision, and budget',
              },
              {
                title: 'Local Expertise',
                desc: 'Deep knowledge of Las Vegas venues and event requirements',
              },
              {
                title: 'Premium Quality',
                desc: 'Fresh, seasonal flowers sourced from the finest growers',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <h3 className="text-xl font-playfair font-bold text-[#B8995A] mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 font-dmSans text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-[#5A6B54] text-center">
        <h2 className="text-3xl font-playfair font-bold text-[#FAF8F3] mb-4">Ready to Plan?</h2>
        <p className="text-[#FAF8F3]/90 font-dmSans mb-6 max-w-2xl mx-auto">
          Let's discuss your vision and create something extraordinary
        </p>
        <Link
          href="/consultation"
          className="inline-block px-8 py-3 bg-[#B8995A] text-[#FAF8F3] rounded-sm font-dmSans font-semibold hover:bg-[#a8894a] transition-colors"
        >
          Schedule Free Consultation
        </Link>
      </section>
    </div>
  );
}
