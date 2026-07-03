import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHead } from "@/app/components/SectionHead";
import { FaqBlock } from "@/app/components/FaqBlock";
import { BORDER, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, serif, PARTY_EXPERIENCES, FAQS_PARTIES, PARTY_IMG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Hosted Floral Parties Las Vegas",
  description:
    "Bouquet bars, floral crown workshops, flower purse parties, and private event florals in Las Vegas. Book your experience with Afuvai Floral Society.",
  alternates: { canonical: "https://afuvai.com/parties" },
};

export default function PartiesPage() {
  return (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "clamp(280px, 55vh, 520px)" }}>
        <Image
          src={PARTY_IMG}
          alt="Hosted floral party experience by Afuvai Floral Society, Las Vegas"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${IVORY} 18%, rgba(250,248,243,0.2) 100%)` }} />
        <div
          className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pb-20 flex flex-col justify-end"
          style={{ minHeight: "clamp(280px, 55vh, 520px)" }}
        >
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>
            Hosted Floral Experiences
          </p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 500, color: INK, lineHeight: 1.05 }}>
            Flowers &<br />
            <em style={{ color: GOLD, fontStyle: "italic" }}>Good Company</em>
          </h1>
        </div>
      </section>

      {/* Experiences grid */}
      <section className="py-16 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-10">
            <SectionHead label="Signature Experiences" heading="Choose your event" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PARTY_EXPERIENCES.map((exp) => (
              <div key={exp.name} className="border" style={{ borderColor: BORDER, background: CARD }}>
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <Image
                    src={exp.img}
                    alt={`${exp.name} — floral experience by Afuvai, Las Vegas`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 w-7 h-7 flex items-center justify-center" style={{ background: SAGE, color: "#fff", fontSize: "1rem" }}>
                    {exp.symbol}
                  </div>
                </div>
                <div className="p-6">
                  <h3 style={{ fontFamily: serif, fontSize: "1.15rem", fontWeight: 500, color: INK, marginBottom: "0.3rem" }}>
                    {exp.name}
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span style={{ fontSize: "0.72rem", color: GOLD, letterSpacing: "0.08em" }}>{exp.price}</span>
                    <span style={{ fontSize: "0.72rem", color: MUTED }}>·</span>
                    <span style={{ fontSize: "0.72rem", color: MUTED }}>{exp.group}</span>
                    <span style={{ fontSize: "0.72rem", color: MUTED }}>·</span>
                    <span style={{ fontSize: "0.72rem", color: MUTED }}>{exp.duration}</span>
                  </div>
                  <p style={{ fontSize: "0.88rem", color: MUTED, lineHeight: 1.72 }}>{exp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center mb-10">
            <SectionHead label="The Process" heading="Easy to book, impossible to forget" center />
          </div>
          <div className="grid md:grid-cols-3">
            {[
              { num: "01", title: "Choose an experience", desc: "Pick from our signature formats or describe your custom vision." },
              { num: "02", title: "We come to you",       desc: "We bring all materials, tools, and florals to your venue anywhere in the Las Vegas Valley." },
              { num: "03", title: "Everyone leaves happy", desc: "Guests take home their creation and a memory. You get a room full of beautiful photos." },
            ].map((step, i) => (
              <div
                key={step.num}
                className={`p-6 border-b md:border-b-0 ${i < 2 ? "md:border-r" : ""}`}
                style={{ borderColor: BORDER }}
              >
                <div style={{ fontFamily: serif, fontSize: "1.6rem", color: GOLD, opacity: 0.4, marginBottom: "0.5rem" }}>{step.num}</div>
                <h3 style={{ fontFamily: serif, fontSize: "1.05rem", fontWeight: 500, color: INK, marginBottom: "0.4rem" }}>{step.title}</h3>
                <p style={{ color: MUTED, lineHeight: 1.7, fontSize: "0.88rem" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="mb-10">
            <SectionHead label="Questions" heading="Parties & events FAQ" />
          </div>
          <FaqBlock items={FAQS_PARTIES} />
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20" style={{ background: SAGE }}>
        <div className="max-w-2xl mx-auto px-5 md:px-8 text-center">
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.28em", color: GOLD_L, textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Book Your Experience
          </p>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 500, color: IVORY, marginBottom: "1rem" }}>
            Ready to host something beautiful?
          </h2>
          <p style={{ color: "rgba(250,248,243,0.7)", fontSize: "0.97rem", marginBottom: "2.5rem" }}>
            Tell us about your event and we'll send a custom proposal within 48 hours.
          </p>
          <a
            href="mailto:admin@afuvai.com?subject=Floral%20Party%20Booking"
            className="inline-flex items-center gap-2 px-10 py-5 text-base font-semibold border-2 hover:bg-white/10 transition-colors"
            style={{ color: IVORY, borderColor: IVORY, letterSpacing: "0.1em" }}
          >
            Email to Book <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
