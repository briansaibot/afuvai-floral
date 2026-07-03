import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHead } from "@/app/components/SectionHead";
import { FaqBlock } from "@/app/components/FaqBlock";
import ConsultationCalendar from "@/app/components/ConsultationCalendar";
import {
  BORDER, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, serif,
  FAQS_WEDDINGS, IMG_WILD_MEADOW, IMG_HEX_ARCH, IMG_METAL_ARCH, IMG_PURSE,
  WEDDING_ARCH, WEDDING_BRIDE, WEDDING_DECOR, RECEPTION_TABLE,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Wedding Florals Las Vegas",
  description:
    "Afuvai Floral Society — Las Vegas luxury wedding florist. Ceremony arches, bridal bouquets, reception tables, and full-service wedding florals. Book your consultation.",
  alternates: { canonical: "https://afuvai.com/weddings" },
};

const WEDDING_SERVICES = [
  { title: "Bridal Bouquets",        desc: "Hand-tied, wired, or cascading. Designed to your vision, palette, and style. Bridesmaids and flower girl pieces available.", img: IMG_WILD_MEADOW },
  { title: "Ceremony Installations", desc: "Arches, altars, aisles, and pew florals. From a simple greenery arch to full floral walls and hanging installations.", img: IMG_HEX_ARCH },
  { title: "Reception Tablescapes",  desc: "Centerpieces from bud vases to statement urns, all coordinated with your ceremony palette and venue.", img: RECEPTION_TABLE },
  { title: "Venue Florals",          desc: "Cocktail hour arrangements, escort card tables, cake florals, and statement pieces for every corner of your reception.", img: WEDDING_DECOR },
];

export default function WeddingsPage() {
  return (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "clamp(360px, 70vh, 680px)" }}>
        <Image
          src={WEDDING_ARCH}
          alt="Wedding arch with luxury florals by Afuvai Floral Society, Las Vegas"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(250,248,243,1) 0%, rgba(250,248,243,0.15) 60%, transparent 100%)" }} />
        <div
          className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pb-16 flex flex-col justify-end"
          style={{ minHeight: "clamp(360px, 70vh, 680px)" }}
        >
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>
            For Your Wedding Day
          </p>
          <h1
            style={{ fontFamily: serif, fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 500, color: INK, lineHeight: 1.05 }}
          >
            Wedding<br />
            <em style={{ color: GOLD, fontStyle: "italic" }}>Florals</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 md:py-20 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <SectionHead
              label="Full-Service Wedding Florals"
              heading={<>Every bloom,<br />perfectly placed.</>}
            />
            <div>
              <p style={{ color: MUTED, lineHeight: 1.9, fontSize: "1rem", marginBottom: "1.25rem" }}>
                AmiDayne has designed weddings for intimate ceremonies of 20 and grand receptions of 500+. Every wedding begins with a complimentary consultation — a conversation about your vision, venue, color palette, and the feeling you want guests to carry with them after the last dance.
              </p>
              <p style={{ color: MUTED, lineHeight: 1.9, fontSize: "1rem", marginBottom: "2rem" }}>
                We handle everything: sourcing, design, delivery, setup, and teardown. You arrive to a fully dressed venue — not a box of supplies.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#booking"
                  className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold hover:opacity-85 transition-opacity"
                  style={{ background: SAGE, color: "#fff", letterSpacing: "0.06em" }}
                >
                  Book a Consultation <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-0">
            {WEDDING_SERVICES.map((service, i) => (
              <div
                key={service.title}
                className={`group flex gap-0 border-b ${i % 2 === 0 ? "md:border-r" : ""}`}
                style={{ borderColor: BORDER }}
              >
                <div className="relative overflow-hidden flex-shrink-0" style={{ width: "160px", minHeight: "200px", background: CARD }}>
                  <Image
                    src={service.img}
                    alt={`${service.title} — Afuvai wedding florals`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="160px"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col justify-center p-7">
                  <h3 style={{ fontFamily: serif, fontSize: "1.2rem", fontWeight: 500, color: INK, marginBottom: "0.6rem" }}>
                    {service.title}
                  </h3>
                  <p style={{ color: MUTED, lineHeight: 1.75, fontSize: "0.9rem" }}>{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: "200+", label: "Weddings Designed" },
              { value: "$1,500",   label: "Starting From" },
              { value: "6+",  label: "Years in Las Vegas" },
              { value: "5★",  label: "Average Rating" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`px-6 py-8 text-center ${i < 3 ? "border-r" : ""}`}
                style={{ borderColor: BORDER }}
              >
                <div style={{ fontFamily: serif, fontSize: "2rem", color: GOLD, marginBottom: "0.3rem" }}>{stat.value}</div>
                <div style={{ fontSize: "0.72rem", letterSpacing: "0.12em", color: MUTED, textTransform: "uppercase" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="py-16 md:py-20 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-end justify-between mb-8">
            <SectionHead label="Recent Work" heading="Wedding portfolio" />
            <Link href="/portfolio" style={{ fontSize: "0.82rem", color: SAGE }} className="hover:opacity-70 transition-opacity flex-shrink-0">
              Full portfolio <ArrowRight size={12} className="inline ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[IMG_WILD_MEADOW, IMG_HEX_ARCH, IMG_METAL_ARCH, WEDDING_BRIDE].map((img, i) => (
              <div
                key={i}
                className="relative overflow-hidden group border"
                style={{ borderColor: BORDER, aspectRatio: "3/4", background: CARD }}
              >
                <Image
                  src={img}
                  alt={`Afuvai wedding florals portfolio — Las Vegas`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20 border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <SectionHead label="Our Process" heading="From first bloom to last dance" center />
          </div>
          <div className="grid md:grid-cols-4 gap-0">
            {[
              { num: "01", title: "Consultation",   desc: "We discuss your vision, venue, palette, and budget. Complimentary — no obligation." },
              { num: "02", title: "Proposal",       desc: "We send a detailed proposal with mood boards, stem concepts, and pricing within 5 days." },
              { num: "03", title: "Design Day",     desc: "Your florals are designed fresh the morning of your wedding by AmiDayne and her team." },
              { num: "04", title: "Setup & Beyond", desc: "We arrive, install everything, and stay until the last piece is perfect. Teardown included." },
            ].map((step, i) => (
              <div
                key={step.num}
                className={`p-6 md:p-8 border-b md:border-b-0 ${i < 3 ? "md:border-r" : ""}`}
                style={{ borderColor: BORDER }}
              >
                <div style={{ fontFamily: serif, fontSize: "1.8rem", color: GOLD, opacity: 0.35, marginBottom: "0.75rem" }}>{step.num}</div>
                <h3 style={{ fontFamily: serif, fontSize: "1.1rem", fontWeight: 500, color: INK, marginBottom: "0.5rem" }}>{step.title}</h3>
                <p style={{ color: MUTED, lineHeight: 1.72, fontSize: "0.88rem" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="mb-10">
            <SectionHead label="Questions" heading="Wedding florals FAQ" />
          </div>
          <FaqBlock items={FAQS_WEDDINGS} />
        </div>
      </section>

      {/* Consultation Booking */}
      <section id="booking" className="border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-20">
          <div className="text-center mb-12">
            <SectionHead label="Book Your Consultation" heading="30 minutes with AmiDayne" center />
            <p style={{ color: MUTED, marginTop: "0.8rem", fontSize: "0.96rem" }}>
              Discuss your wedding vision, timeline, and venue. Via Zoom or in Las Vegas.
            </p>
          </div>
          <div className="bg-white border p-8 md:p-12" style={{ borderColor: BORDER }}>
            <ConsultationCalendar />
          </div>
        </div>
      </section>
      
      {/* Alternative Contact */}
      <section className="py-16" style={{ background: CARD }}>
        <div className="max-w-2xl mx-auto px-5 md:px-8 text-center">
          <p style={{ color: MUTED, fontSize: "0.96rem", marginBottom: "1rem" }}>
            Prefer to discuss details first?
          </p>
          <a
            href="mailto:hello@afuvai.com?subject=Wedding%20Floral%20Inquiry"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold hover:opacity-85 transition-opacity"
            style={{ background: SAGE, color: "#fff", letterSpacing: "0.1em" }}
          >
            Email AmiDayne <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
