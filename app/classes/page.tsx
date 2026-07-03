import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHead } from "@/app/components/SectionHead";
import { BORDER, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, serif, CLASSES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Floral Design Classes Las Vegas",
  description:
    "Learn floral design with AmiDayne Nelsen in Las Vegas. Beginner bouquet, seasonal design, advanced arrangement classes, and private group workshops.",
  alternates: { canonical: "https://afuvai.com/classes" },
};

export default function ClassesPage() {
  return (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
          <SectionHead
            label="Learn Floral Design"
            heading={<>Classes with<br /><em style={{ color: GOLD, fontStyle: "italic" }}>AmiDayne</em></>}
          />
          <p style={{ color: MUTED, marginTop: "0.8rem", fontSize: "0.97rem", maxWidth: "500px" }}>
            Public and private floral design classes held in Las Vegas. All skill levels welcome — leave with a finished arrangement and new skills.
          </p>
        </div>
      </div>

      {/* Classes grid */}
      <section className="py-16 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {CLASSES.map((cls) => (
              <div key={cls.name} className="border group" style={{ borderColor: BORDER, background: CARD }}>
                <div className="relative overflow-hidden" style={{ height: "240px" }}>
                  <Image
                    src={cls.img}
                    alt={`${cls.name} — floral design class by Afuvai, Las Vegas`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 style={{ fontFamily: serif, fontSize: "1.3rem", fontWeight: 500, color: INK }}>
                      {cls.name}
                    </h3>
                    <span style={{ fontFamily: serif, fontSize: "1.2rem", color: GOLD, flexShrink: 0 }}>
                      {cls.price === 0 ? "Custom" : `$${cls.price}`}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <span style={{ fontSize: "0.72rem", color: MUTED, letterSpacing: "0.08em" }}>⏱ {cls.duration}</span>
                    <span style={{ fontSize: "0.72rem", color: MUTED }}>·</span>
                    <span style={{ fontSize: "0.72rem", color: MUTED }}>👥 {cls.group}</span>
                  </div>
                  <p style={{ color: MUTED, lineHeight: 1.75, fontSize: "0.9rem", marginBottom: "1.2rem" }}>{cls.desc}</p>
                  <a
                    href="mailto:hello@afuvai.com?subject=Class%20Booking"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold uppercase hover:opacity-85 transition-opacity"
                    style={{ background: SAGE, color: "#fff", letterSpacing: "0.1em" }}
                  >
                    Book This Class <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to expect */}
      <section className="border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
          <div className="text-center mb-8">
            <SectionHead label="What to Expect" heading="A class at Afuvai" center />
          </div>
          <div className="grid md:grid-cols-3 gap-0">
            {[
              { symbol: "✦", title: "All Materials Included", body: "Stems, tools, ribbon, vase — everything is provided." },
              { symbol: "◇", title: "Guided by AmiDayne",    body: "Every class led personally. Small groups, individual attention." },
              { symbol: "◆", title: "Take It Home",          body: "You leave with a finished arrangement designed by you." },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`p-6 border-b md:border-b-0 ${i < 2 ? "md:border-r" : ""}`}
                style={{ borderColor: BORDER }}
              >
                <div style={{ fontFamily: serif, fontSize: "1.3rem", color: GOLD, marginBottom: "0.5rem" }}>{item.symbol}</div>
                <h3 style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: INK, marginBottom: "0.4rem" }}>{item.title}</h3>
                <p style={{ color: MUTED, lineHeight: 1.6, fontSize: "0.8rem" }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: SAGE }}>
        <div className="max-w-2xl mx-auto px-5 text-center">
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.24em", color: GOLD_L, textTransform: "uppercase", marginBottom: "0.5rem" }}>
            Ready to Learn?
          </p>
          <h2 style={{ fontFamily: serif, fontSize: "2rem", color: IVORY, marginBottom: "1rem" }}>
            Book a class with AmiDayne.
          </h2>
          <p style={{ color: "rgba(250,248,243,0.7)", fontSize: "0.95rem", marginBottom: "2rem" }}>
            Class schedule releases monthly. Email us to get on the list or book a private session.
          </p>
          <a
            href="mailto:hello@afuvai.com?subject=Class%20Inquiry"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 hover:bg-white/10 transition-colors font-semibold uppercase text-sm"
            style={{ color: IVORY, borderColor: IVORY, letterSpacing: "0.12em" }}
          >
            Get in Touch <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </div>
  );
}
