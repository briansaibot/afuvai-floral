import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mail, Clock, MapPin, Instagram, ArrowRight } from "lucide-react";
import { SectionHead } from "@/app/components/SectionHead";
import {
  BORDER, CARD, GOLD, INK, IVORY, MUTED, SAGE, serif,
  IMG_AMI_DAYNE, PETAL_MACRO,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Meet AmiDayne Nelsen — Las Vegas Florist",
  description:
    "AmiDayne Nelsen, founder and head floral designer at Afuvai Floral Society in Las Vegas. 6+ years of luxury floral design, wedding florals, and sustainable sourcing.",
  alternates: { canonical: "https://afuvai.com/florist" },
};

const CREDENTIALS = [
  { year: "2018", detail: "Founded Afuvai Floral Society, Las Vegas NV" },
  { year: "2019", detail: "Certified Sustainable Floral Design, AIFD" },
  { year: "2020", detail: "Named one of Nevada's top 10 wedding florists" },
  { year: "2021", detail: "Expanded into hosted floral experiences and workshops" },
  { year: "2022", detail: "Launched floral design class program" },
  { year: "2023", detail: "Launched monthly subscription — now 1,200+ active subscribers" },
  { year: "2024", detail: "Partner florist for four Strip hotel properties" },
];

export default function FloristPage() {
  return (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      {/* Hero */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2" style={{ minHeight: "clamp(360px, 70vh, 620px)" }}>
            <div className="relative overflow-hidden order-2 md:order-1" style={{ minHeight: "260px", background: CARD }}>
              <Image
                src={IMG_AMI_DAYNE}
                alt="AmiDayne Nelsen, Founder and Head Floral Designer at Afuvai Floral Society"
                fill
                className="object-cover"
                style={{ objectPosition: "center top" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="flex flex-col justify-center px-8 md:px-14 py-16 order-1 md:order-2">
              <p style={{ fontSize: "0.68rem", letterSpacing: "0.28em", color: GOLD, textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Meet the Artist
              </p>
              <h1 style={{ fontFamily: serif, fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 500, color: INK, lineHeight: 1.1, marginBottom: "0.4rem" }}>
                AmiDayne Nelsen
              </h1>
              <p style={{ fontSize: "0.8rem", letterSpacing: "0.18em", color: SAGE, textTransform: "uppercase", marginBottom: "1.6rem" }}>
                Founder & Head Floral Designer
              </p>
              <blockquote
                style={{
                  fontFamily: serif,
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                  color: MUTED,
                  lineHeight: 1.78,
                  borderLeft: `3px solid ${GOLD}`,
                  paddingLeft: "1.2rem",
                  marginBottom: "2rem",
                }}
              >
                &ldquo;I believe every bloom has something to say. My job is simply to help it find the right words.&rdquo;
              </blockquote>
              <div className="flex flex-wrap gap-2.5 mb-6">
                {["Las Vegas, NV", "Est. 2018", "6+ Years Experience", "Sustainable Design"].map((t) => (
                  <span key={t} className="px-3 py-1.5 border text-sm" style={{ color: MUTED, borderColor: BORDER }}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="space-y-2">
                <a href="mailto:admin@afuvai.com" className="flex items-center gap-2 text-sm" style={{ color: MUTED }}>
                  <Mail size={14} /> admin@afuvai.com
                </a>
                <p className="flex items-center gap-2 text-sm" style={{ color: MUTED }}>
                  <Clock size={14} /> Open daily, 9 am – 5 pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <SectionHead label="The Story" heading="How Afuvai began" />
          <div className="mt-8 space-y-5" style={{ color: MUTED, lineHeight: 1.9, fontSize: "1.02rem" }}>
            <p>
              AmiDayne Nelsen founded Afuvai Floral Society in Las Vegas in 2018 after years spent studying floral design, sustainable sourcing, and the intersection of art and nature. What began as a small weekend arrangement practice quickly grew into one of the valley&apos;s most sought-after boutique floral studios.
            </p>
            <p>
              Raised with a deep appreciation for natural beauty, AmiDayne&apos;s aesthetic is rooted in organic texture, tonal restraint, and the quiet drama of a perfectly chosen stem. Her work draws from botanical art, Scandinavian minimalism, and the lush gardens of the Pacific Northwest — reimagined for Las Vegas.
            </p>
            <p>
              Every arrangement Afuvai creates passes through AmiDayne&apos;s hands. She designs each piece individually, sources directly from sustainable farms, and personally trains every team member on her design principles. Never mass-produced, never templated.
            </p>
            <p>
              Today, Afuvai Floral Society serves couples on their wedding day, residents who want their homes to feel alive, students who want to learn the craft, and anyone who believes that the right arrangement can change the feeling of a room.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-20">
          <div className="grid md:grid-cols-2 border" style={{ borderColor: BORDER }}>
            <div className="overflow-hidden" style={{ minHeight: "400px", background: CARD }}>
              <Image
                src={PETAL_MACRO}
                alt="Floral detail — Afuvai design philosophy"
                fill={false}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                style={{ minHeight: "400px" }}
              />
            </div>
            <div className="flex flex-col justify-center px-8 md:px-12 py-14 border-t md:border-t-0 md:border-l" style={{ borderColor: BORDER, background: CARD }}>
              <SectionHead label="Design Philosophy" heading="The principles behind every arrangement" />
              <div className="mt-8 space-y-6">
                {[
                  { symbol: "✦", title: "Intention Over Abundance",  body: "Every stem is chosen deliberately — not to fill space, but to say something." },
                  { symbol: "◇", title: "Seasonality First",         body: "Afuvai works with what nature is offering right now, resulting in arrangements that feel alive and of the moment." },
                  { symbol: "◆", title: "Sustainability as Standard", body: "All flowers are sourced from certified sustainable farms. Packaging is compostable." },
                ].map((v) => (
                  <div key={v.title} className="flex gap-4">
                    <div style={{ fontFamily: serif, fontSize: "1.2rem", color: GOLD, flexShrink: 0, marginTop: "2px" }}>{v.symbol}</div>
                    <div>
                      <div style={{ fontFamily: serif, fontSize: "1.05rem", fontWeight: 500, color: INK, marginBottom: "0.3rem" }}>{v.title}</div>
                      <div style={{ color: MUTED, lineHeight: 1.72, fontSize: "0.92rem" }}>{v.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials + Contact */}
      <section className="py-20 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <SectionHead label="Background" heading="Credentials & experience" />
            <div className="mt-8 space-y-4">
              {CREDENTIALS.map((c) => (
                <div key={c.year} className="flex gap-5">
                  <div style={{ fontFamily: serif, fontSize: "0.85rem", color: GOLD, minWidth: "36px", fontWeight: 500 }}>{c.year}</div>
                  <div style={{ fontSize: "0.94rem", color: MUTED, lineHeight: 1.65 }}>{c.detail}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHead label="Connect" heading="Work with AmiDayne" />
            <div className="mt-8 space-y-4">
              {[
                { icon: Mail, label: "Email", value: "admin@afuvai.com", href: "mailto:admin@afuvai.com" },
                { icon: Clock, label: "Hours", value: "Open daily, 9 am – 5 pm", href: null },
                { icon: MapPin, label: "Service Area", value: "Las Vegas Valley — delivery only", href: null },
                { icon: Instagram, label: "Instagram", value: "@afuvaifloral", href: "https://instagram.com/afuvaifloral" },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-3 p-4 border" style={{ borderColor: BORDER, background: CARD }}>
                  <Icon size={16} style={{ color: SAGE, marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "0.67rem", letterSpacing: "0.14em", color: MUTED, textTransform: "uppercase", marginBottom: "2px" }}>{label}</div>
                    {href ? (
                      <a href={href} target="_blank" rel="noreferrer" style={{ fontSize: "0.97rem", color: INK }}>
                        {value}
                      </a>
                    ) : (
                      <div style={{ fontSize: "0.97rem", color: INK }}>{value}</div>
                    )}
                  </div>
                </div>
              ))}
              <Link
                href="/parties"
                className="inline-flex items-center gap-2 px-7 py-4 mt-2 text-base font-semibold hover:opacity-85 transition-opacity"
                style={{ background: SAGE, color: "#fff", letterSpacing: "0.06em" }}
              >
                Book an Experience <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
