import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Flower Care Tips | Afuvai Floral Society',
  description: 'Keep your flowers fresh longer with expert care guides from Afuvai Floral',
};

const careTips = [
  {
    icon: '💧',
    title: 'Proper Watering',
    description:
      'Change water every 2-3 days and trim stem bottoms at a 45° angle. Use fresh, room-temperature water mixed with flower food for optimal vase life. Remove any leaves below the water line to prevent bacterial growth.',
  },
  {
    icon: '☀️',
    title: 'Light & Temperature',
    description:
      'Keep arrangements away from direct sunlight, ripening fruit, and heating vents. Ideal temperature is 65-72°F. Cool environments extend flower life significantly—avoid placing near sunny windows or radiators.',
  },
  {
    icon: '✂️',
    title: 'Arrangement Maintenance',
    description:
      'Remove fallen petals daily and mist lightly with water. Re-trim stems every 3 days and refresh the water. Remove any wilted flowers promptly to keep the arrangement looking vibrant and fresh.',
  },
  {
    icon: '🌸',
    title: 'Seasonal Adjustments',
    description:
      'In summer, water more frequently and keep arrangements cooler. In winter, avoid cold drafts. Humidity levels affect longevity—consider a light mist daily. Season-specific care extends life by 30-40%.',
  },
];

const vaseLife = [
  { flower: 'Roses', days: '7-14 days', notes: 'Remove thorns to reduce water absorption' },
  { flower: 'Tulips', days: '7-10 days', notes: 'Keep away from ripening fruit and ethylene gas' },
  { flower: 'Hydrangeas', days: '10-14 days', notes: 'Keep soil moist; hydrate leaves with mist' },
  { flower: 'Orchids', days: '14-30 days', notes: 'Thrive in cool, humid conditions with indirect light' },
];

export default function CareTipsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#5A6B54] to-[#5A6B54]/90">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-[#FAF8F3] mb-4">
            Flower Care Tips
          </h1>
          <p className="text-lg text-[#FAF8F3]/90 font-dmSans">
            Keep your flowers fresh and beautiful longer
          </p>
        </div>
      </section>

      {/* Care Tips Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {careTips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow border-l-4 border-[#B8995A]"
              >
                <div className="text-5xl mb-4">{tip.icon}</div>
                <h3 className="text-2xl font-playfair font-bold text-[#5A6B54] mb-3">
                  {tip.title}
                </h3>
                <p className="text-gray-700 font-dmSans text-sm leading-relaxed">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vase Life Reference Table */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-[#5A6B54] mb-8 text-center">
            Typical Vase Life by Flower
          </h2>
          <div className="overflow-hidden rounded-lg shadow-md">
            <table className="w-full">
              <thead>
                <tr className="bg-[#5A6B54]">
                  <th className="px-6 py-4 text-left text-[#FAF8F3] font-playfair font-bold">
                    Flower Type
                  </th>
                  <th className="px-6 py-4 text-left text-[#FAF8F3] font-playfair font-bold">
                    Vase Life
                  </th>
                  <th className="px-6 py-4 text-left text-[#FAF8F3] font-playfair font-bold">
                    Care Tips
                  </th>
                </tr>
              </thead>
              <tbody>
                {vaseLife.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-dmSans font-semibold text-gray-800">
                      {item.flower}
                    </td>
                    <td className="px-6 py-4 font-dmSans text-gray-700">{item.days}</td>
                    <td className="px-6 py-4 font-dmSans text-sm text-gray-600">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-[#5A6B54] mb-8 text-center">
            Common Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Should I add flower food?',
                a: 'Yes! Most arrangements come with flower food. If not, mix 1 teaspoon sugar, 1 teaspoon bleach, and 1 teaspoon lemon juice into 1 quart of water.',
              },
              {
                q: 'Why are my flowers wilting quickly?',
                a: 'Common causes: warm water, bacteria in vase, blocked stems, direct sunlight, or proximity to ripening fruit. Follow our care tips above to extend life.',
              },
              {
                q: 'Can I save dying flowers?',
                a: 'Yes! Remove wilted stems, refresh water, re-trim bottoms, and add fresh flower food. Move to a cooler location and mist lightly.',
              },
              {
                q: 'How often should I change the water?',
                a: 'Change water every 2-3 days for best results. Each time, clean the vase and re-trim the stem bottoms at a 45° angle.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-playfair font-bold text-[#5A6B54] text-lg mb-2">
                  {item.q}
                </h3>
                <p className="text-gray-700 font-dmSans text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-[#B8995A] text-center">
        <h2 className="text-3xl font-playfair font-bold text-[#FAF8F3] mb-4">
          Questions About Your Arrangement?
        </h2>
        <p className="text-[#FAF8F3]/90 font-dmSans mb-6 max-w-2xl mx-auto">
          Reach out anytime—we're happy to help keep your flowers fresh and beautiful
        </p>
        <Link
          href="/consultation"
          className="inline-block px-8 py-3 bg-[#5A6B54] text-[#FAF8F3] rounded-sm font-dmSans font-semibold hover:bg-[#4a5a44] transition-colors"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
}
