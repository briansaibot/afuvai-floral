import { Metadata } from 'next';
import ConsultationCalendar from '@/app/components/ConsultationCalendar';
import { BORDER, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, serif } from '@/lib/constants';
import { SectionHead } from '@/app/components/SectionHead';

export const metadata: Metadata = {
  title: 'Free Consultation | Afuvai Floral Society',
  description: 'Schedule your free 30-minute floral design consultation with Afuvai',
};

export default function ConsultationPage() {
  return (
    <div style={{ background: IVORY }}>
      {/* Header */}
      <section className="border-b pt-20 pb-16" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <SectionHead
            label="Book Your Session"
            heading={<>Free<br />Consultation</>}
          />
          <p style={{ color: MUTED, marginTop: '0.8rem', fontSize: '0.97rem', maxWidth: '500px' }}>
            30 minutes with our lead designer to discuss your vision, budget, and timeline.
          </p>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-20 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="bg-white border p-8 md:p-12" style={{ borderColor: BORDER }}>
            <div className="mb-8 text-center">
              <h2 style={{ fontFamily: serif, fontSize: '1.4rem', fontWeight: 500, color: INK, marginBottom: '0.5rem' }}>
                Choose Your Date & Time
              </h2>
              <p style={{ color: MUTED, fontSize: '0.88rem' }}>
                Monday–Saturday • 10am, 2pm, 4pm
              </p>
            </div>
            <ConsultationCalendar />
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <SectionHead label="Preparation" heading="What to Expect" center />
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Book Your Slot', desc: 'Select your preferred date and time' },
              { step: '2', title: 'Confirmation', desc: 'Email confirmation with Zoom or Vegas location details' },
              { step: '3', title: 'Consultation Call', desc: 'Discuss your vision, budget, and timeline' },
              { step: '4', title: 'Next Steps', desc: 'Receive a proposal and project timeline' },
            ].map((item, idx) => (
              <div key={item.step} className="text-center">
                <div
                  className="inline-block w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm mb-3"
                  style={{ background: GOLD, color: IVORY, fontFamily: serif }}
                >
                  {item.step}
                </div>
                <h3 style={{ fontFamily: serif, fontSize: '1rem', fontWeight: 500, color: INK, marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: MUTED, fontSize: '0.8rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="mb-12">
            <SectionHead label="Questions" heading="Consultation FAQ" center />
          </div>
          <div className="space-y-6">
            {[
              {
                q: 'Is the consultation really free?',
                a: 'Yes. We offer a complimentary 30-minute consultation to discuss your vision, budget, and ideas—no obligation.',
              },
              {
                q: 'Zoom or in-person?',
                a: 'Both available. We offer Zoom consultations for remote clients and in-person meetings for Las Vegas area clients.',
              },
              {
                q: 'Do I need to have a specific idea?',
                a: 'Not at all. Come with inspiration, Pinterest boards, color preferences, or a general concept. We refine your vision together.',
              },
              {
                q: 'How far in advance should I book?',
                a: 'Weddings: 2–3 months ahead. Events and specialty services: 4–6 weeks is ideal. We accommodate rush requests when possible.',
              },
              {
                q: 'What if I need to reschedule?',
                a: 'No problem. Reply to your confirmation email at least 24 hours before your slot to reschedule.',
              },
            ].map((item, idx) => (
              <div key={idx} className="border-b pb-6" style={{ borderColor: BORDER }}>
                <h3 style={{ fontFamily: serif, fontSize: '1.05rem', fontWeight: 500, color: INK, marginBottom: '0.5rem' }}>
                  {item.q}
                </h3>
                <p style={{ color: MUTED, fontSize: '0.9rem', lineHeight: 1.75 }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Alternative */}
      <section className="py-16" style={{ background: SAGE }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 style={{ fontFamily: serif, fontSize: '1.4rem', color: IVORY, marginBottom: '0.75rem' }}>
            Prefer to reach out directly?
          </h2>
          <p style={{ color: 'rgba(250,248,243,0.8)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            hello@afuvai.com
          </p>
          <p style={{ color: 'rgba(250,248,243,0.7)', fontSize: '0.88rem' }}>
            Open daily, 9 am–5 pm PST
          </p>
        </div>
      </section>
    </div>
  );
}
