import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHead } from "@/app/components/SectionHead";
import {
  BORDER, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, serif, sans,
  ORCHID_DARK, WEDDING_ARCH, RECEPTION_TABLE, WHITE_FLORAL, PETAL_MACRO,
  BULK_FLOWERS,
} from "@/lib/constants";
import BulkForm from "./BulkForm";

export const metadata: Metadata = {
  title: "Bulk Flower Orders Las Vegas",
  description:
    "Wholesale and bulk flower orders for event planners, restaurants, hotels, DIY brides, and floral studios in Las Vegas. Same-day delivery across the Las Vegas Valley.",
  alternates: { canonical: "https://afuvai.com/bulk" },
};

export default function BulkPage() {
  const fixedPriceFlowers = BULK_FLOWERS.filter((f) => !f.marketPrice);
  const marketPriceFlowers = BULK_FLOWERS.filter((f) => f.marketPrice);

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
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: GOLD_L, textTransform: "uppercase", marginBottom: "1rem" }}>
            For Makers, Events & Trade
          </p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 500, color: INK, lineHeight: 1.05 }}>
            Flowers in<br /><em style={{ color: GOLD, fontStyle: "italic" }}>Bulk</em>
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <SectionHead label="Volume Florals" heading="Professional-grade stems for your event" />
            </div>
            <div>
              <p style={{ color: MUTED, lineHeight: 1.9, fontSize: "1rem", marginBottom: "1.25rem" }}>
                Sourced from premier growers and wholesalers, our bulk packages are designed for event planners, DIY brides, working florists, and hospitality venues. All stems arrive fresh and conditioned.
              </p>
              <p style={{ color: MUTED, lineHeight: 1.9, fontSize: "1rem" }}>
                Custom palettes, seasonal adjustments, and wholesale pricing available. Same-day delivery across Las Vegas Valley.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed-Price Packages */}
      <section className="py-16 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-12">
            <SectionHead label="Ready-Made Packages" heading="Fixed pricing • Order anytime" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fixedPriceFlowers.map((flower) => (
              <div
                key={flower.id}
                className="border group overflow-hidden flex flex-col"
                style={{ borderColor: BORDER, background: "#fff" }}
              >
                {/* Image */}
                <div style={{ height: "200px", overflow: "hidden", background: CARD }}>
                  <Image
                    src={flower.img}
                    alt={flower.name}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 style={{ fontFamily: serif, fontSize: "1.2rem", fontWeight: 500, color: INK, marginBottom: "0.5rem" }}>
                    {flower.name}
                  </h3>
                  <p style={{ color: MUTED, fontSize: "0.85rem", marginBottom: "1rem", lineHeight: 1.6 }}>
                    {flower.desc}
                  </p>

                  {/* Contents */}
                  <ul style={{ color: MUTED, fontSize: "0.8rem", marginBottom: "1.5rem", lineHeight: 1.7, paddingLeft: "1.2rem" }}>
                    {flower.contents.map((item, i) => (
                      <li key={i} style={{ marginBottom: "0.3rem" }}>
                        • {item}
                      </li>
                    ))}
                  </ul>

                  {/* Divider */}
                  <div style={{ borderTop: `1px solid ${BORDER}`, margin: "1rem 0" }} />

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between mt-auto">
                    <span style={{ fontFamily: serif, fontSize: "1.5rem", color: GOLD, fontWeight: 500 }}>
                      ${flower.price}
                    </span>
                    <button
                      className="inline-flex items-center gap-1 px-4 py-2.5 text-xs font-semibold hover:opacity-85 transition-opacity uppercase"
                      style={{ background: SAGE, color: "#fff", letterSpacing: "0.08em" }}
                    >
                      Add to Cart <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Price Items */}
      <section className="py-16 border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-12">
            <SectionHead
              label="Seasonal & Market Price"
              heading={<>Premium stems<br />Custom pricing</>}
            />
            <p style={{ color: MUTED, marginTop: "0.8rem", fontSize: "0.96rem", maxWidth: "520px" }}>
              Dahlias, peonies, flowering branches, and premium exotics vary by season and market availability. Request a custom quote for current pricing and availability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketPriceFlowers.map((flower) => (
              <div
                key={flower.id}
                className="border group overflow-hidden flex flex-col"
                style={{ borderColor: BORDER, background: "#fff" }}
              >
                {/* Image */}
                <div style={{ height: "160px", overflow: "hidden", background: CARD }}>
                  <Image
                    src={flower.img}
                    alt={flower.name}
                    width={300}
                    height={160}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-5">
                  <h3 style={{ fontFamily: serif, fontSize: "1.1rem", fontWeight: 500, color: INK, marginBottom: "0.4rem" }}>
                    {flower.name}
                  </h3>
                  <p style={{ color: MUTED, fontSize: "0.8rem", marginBottom: "1rem", lineHeight: 1.5 }}>
                    {flower.desc}
                  </p>

                  {/* Contents */}
                  <ul style={{ color: MUTED, fontSize: "0.75rem", marginBottom: "1rem", lineHeight: 1.6, paddingLeft: "1rem" }}>
                    {flower.contents.map((item, i) => (
                      <li key={i} style={{ marginBottom: "0.25rem" }}>
                        • {item}
                      </li>
                    ))}
                  </ul>

                  {/* Divider */}
                  <div style={{ borderTop: `1px solid ${BORDER}`, margin: "0.75rem 0" }} />

                  {/* Price & CTA */}
                  <div className="mt-auto">
                    <p style={{ fontSize: "0.8rem", color: MUTED, marginBottom: "0.75rem" }}>
                      <strong>Starting at ${flower.startingAt}</strong>
                    </p>
                    <a
                      href="#quote"
                      className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold hover:opacity-85 transition-opacity uppercase"
                      style={{ background: GOLD, color: "#fff", letterSpacing: "0.08em" }}
                    >
                      Get Quote
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-16 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-12">
            <SectionHead label="Who We Serve" heading="Built for every need" center />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { img: WEDDING_ARCH, title: "Event Planners", desc: "Large-scale event florals. Minimums from 25 stems." },
              { img: RECEPTION_TABLE, title: "Restaurants & Hotels", desc: "Weekly fresh stems for hospitality venues." },
              { img: WHITE_FLORAL, title: "DIY Brides", desc: "Curate your own wedding florals with guidance." },
              { img: PETAL_MACRO, title: "Floral Studios", desc: "Wholesale supply for working florists." },
            ].map((s) => (
              <div key={s.title} className="border overflow-hidden group" style={{ borderColor: BORDER, background: "#fff" }}>
                <div className="overflow-hidden" style={{ height: "140px" }}>
                  <Image
                    src={s.img}
                    alt={`${s.title}`}
                    width={300}
                    height={140}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: INK, marginBottom: "0.4rem" }}>
                    {s.title}
                  </h3>
                  <p style={{ color: MUTED, fontSize: "0.8rem", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Request Form */}
      <section id="quote" className="py-16 border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="text-center mb-12">
            <SectionHead label="Custom Quotes" heading="Let's discuss your event" center />
            <p style={{ color: MUTED, marginTop: "0.8rem", fontSize: "0.96rem" }}>
              For seasonal stems, custom palettes, or large orders — fill out the form below and we'll provide a detailed quote within 24 hours.
            </p>
          </div>
          <BulkForm />
        </div>
      </section>

      {/* Quick Stats */}
      <section style={{ borderColor: BORDER, background: SAGE, color: IVORY }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-4">
            {[
              { label: "Minimum Order", value: "25 stems" },
              { label: "Lead Time", value: "48–72 hrs" },
              { label: "Service Area", value: "Las Vegas Valley" },
              { label: "Custom Available", value: "Always" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`p-6 text-center border-b sm:border-b-0 ${i < 3 ? "sm:border-r" : ""}`}
                style={{ borderColor: "rgba(250,248,243,0.15)" }}
              >
                <div style={{ fontFamily: serif, fontSize: "1.4rem", color: GOLD_L, marginBottom: "4px" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: "0.7rem", color: "rgba(250,248,243,0.7)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
