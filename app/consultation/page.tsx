import { Metadata } from 'next';
import ConsultationCalendar from '@/app/components/ConsultationCalendar';

export const metadata: Metadata = {
  title: 'Free Consultation | Afuvai Floral Society',
  description: 'Schedule your free 30-minute floral design consultation with Afuvai',
};

export default function ConsultationPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#5A6B54] to-[#5A6B54]/90">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-playfair font-bold text-[#FAF8F3] mb-4">
            Schedule Your Free Consultation
          </h1>
          <p className="text-lg text-[#FAF8F3]/90 font-dmSans">
            Let's discuss your floral vision and create something beautiful together
          </p>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-playfair font-bold text-[#5A6B54] mb-2">
                Pick Your Date & Time
              </h2>
              <p className="text-gray-700 font-dmSans text-sm">
                30-minute consultation • Free • Via Zoom or in-person (Vegas area)
              </p>
            </div>

            {/* Calendar Component */}
            <ConsultationCalendar />
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-[#5A6B54] mb-12 text-center">
            What to Expect
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Book Your Slot',
                desc: 'Choose your preferred date and time from the calendar above',
              },
              {
                step: '2',
                title: 'Receive Confirmation',
                desc: 'Get email confirmation and Zoom link (or Vegas location details)',
              },
              {
                step: '3',
                title: 'Consultation Call',
                desc: 'Discuss your vision, budget, and timeline with our lead designer',
              },
              {
                step: '4',
                title: 'Next Steps',
                desc: "We'll send a proposal and timeline to bring your idea to life",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-block w-12 h-12 bg-[#B8995A] text-[#FAF8F3] rounded-full flex items-center justify-center font-playfair font-bold text-xl mb-3">
                  {item.step}
                </div>
                <h3 className="text-lg font-playfair font-bold text-[#5A6B54] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-700 font-dmSans">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-[#5A6B54] mb-8 text-center">
            Consultation FAQ
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Is the consultation really free?",
                a: "Yes! We offer a complimentary 30-minute consultation to discuss your vision, budget, and ideas—no strings attached.",
              },
              {
                q: "Can I do the consultation by Zoom?",
                a: "Absolutely. We offer both Zoom and in-person consultations for Las Vegas area clients. Choose what works best for you.",
              },
              {
                q: "Do I need to have a specific idea for my event?",
                a: "Not at all. Come with inspiration, Pinterest boards, color preferences, or just a general idea. We'll help refine your vision together.",
              },
              {
                q: "What if I need to reschedule?",
                a: "No problem. Just reply to your confirmation email at least 24 hours before your slot to reschedule.",
              },
              {
                q: "How far in advance should I book?",
                a: "For weddings, book 2-3 months ahead. For events and specialty services, 4-6 weeks is ideal. We can accommodate rush requests.",
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

      {/* Contact Alternative */}
      <section className="py-16 px-4 bg-[#5A6B54] text-center">
        <h2 className="text-2xl font-playfair font-bold text-[#FAF8F3] mb-4">
          Prefer to Call or Email?
        </h2>
        <p className="text-[#FAF8F3]/90 font-dmSans mb-6">
          hello@afuvai.com • (702) 555-AFUVAI
        </p>
      </section>
    </div>
  );
}
