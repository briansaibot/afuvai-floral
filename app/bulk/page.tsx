import type { Metadata } from "next";
import Image from "next/image";
import { SectionHead } from "@/app/components/SectionHead";
import {
  BORDER, CARD, GOLD, INK, IVORY, MUTED, SAGE, serif,
  ORCHID_DARK, WEDDING_ARCH, RECEPTION_TABLE, WHITE_FLORAL, PETAL_MACRO,
} from "@/lib/constants";
import BulkForm from "./BulkForm";

export const metadata: Metadata = {
  title: "Bulk Flower Orders Las Vegas",
  description:
    "Wholesale and bulk flower orders for event planners, restaurants, hotels, DIY brides, and floral studios in Las Vegas. Same-day delivery across the Las Vegas Valley.",
  alternates: { canonical: "https://afuvai.com/bulk" },
};

export default function BulkPage() {
  return (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "clamp(280px, 55vh, 520px)" }}>
        <Image
          src={ORCHID_DARK}
          alt="Bulk flowers Las Vegas — Afuvai Floral Society wholesale stems"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ opacity: 0.55 }}
        />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${IVORY} 18%, rgba(250,248,243,0.2) 100%)` }} />
        <div
          className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 pb-20 flex flex-col justify-end"
          style={{ minHeight: "clamp(280px, 55vh, 520px)" }}
        >
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>
            For Makers, Events & Trade
          </p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 500, color: INK, lineHeight: 1.05 }}>
            Flowers in<br /><em style={{ color: GOLD, fontStyle: "italic" }}>Bulk</em>
          </h1>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-14"><SectionHead label="Who We Serve" heading="Built for volume" /></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { img: WEDDING_ARCH,    title: "Event Planners",       desc: "Large-scale event florals delivered ready-to-arrange. Minimums starting at 25 stems." },
              { img: RECEPTION_TABLE, title: "Restaurants & Hotels", desc: "Weekly fresh-cut stems and table arrangements for dining and hospitality venues." },
              { img: WHITE_FLORAL,    title: "DIY Brides",           desc: "Curate your own wedding florals with guidance from AmiDayne. Order by stem type or color palette." },
              { img: PETAL_MACRO,     title: "Floral Studios",       desc: "Wholesale stem supply for working florists and studio owners in the Las Vegas Valley." },
            ].map((s) => (
              <div key={s.title} className="border overflow-hidden group" style={{ borderColor: BORDER, background: IVORY }}>
                <div className="overflow-hidden" style={{ height: "180px" }}>
                  <Image
                    src={s.img}
                    alt={`${s.title} — bulk flowers Las Vegas`}
                    width={400}
                    height={180}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 style={{ fontFamily: serif, fontSize: "1.1rem", fontWeight: 500, color: INK, marginBottom: "0.5rem" }}>{s.title}</h3>
                  <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4">
            {[
              { label: "Minimum Order",   value: "25 stems" },
              { label: "Lead Time",       value: "48–72 hrs" },
              { label: "Service Area",    value: "Las Vegas Valley" },
              { label: "Custom Palettes", value: "Always available" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`p-6 text-center border-b sm:border-b-0 ${i < 3 ? "sm:border-r" : ""}`}
                style={{ borderColor: BORDER, background: CARD }}
              >
                <div style={{ fontFamily: serif, fontSize: "1.5rem", color: GOLD, marginBottom: "4px" }}>{s.value}</div>
                <div style={{ fontSize: "0.72rem", color: MUTED, letterSpacing: "0.12em", textTransform: "uppercase" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry form */}
      <BulkForm />
    </div>
  );
}
