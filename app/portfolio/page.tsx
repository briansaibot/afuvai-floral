"use client";

import { useState } from "react";
import Image from "next/image";
import type { Metadata } from "next";
import { SectionHead } from "@/app/components/SectionHead";
import { BORDER, CARD, GOLD, INK, IVORY, MUTED, SAGE, sans, serif, PORTFOLIO_ITEMS, PORTFOLIO_CATS } from "@/lib/constants";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
          <SectionHead label="Our Work" heading="The Afuvai portfolio" />
          <p style={{ color: MUTED, marginTop: "0.75rem", fontSize: "0.96rem", maxWidth: "480px" }}>
            Weddings, birthdays, anniversaries, corporate florals, and everyday beauty — every arrangement designed by AmiDayne in Las Vegas.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="sticky top-[88px] z-20 border-b" style={{ borderColor: BORDER, background: "rgba(250,248,243,0.97)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 flex gap-2 overflow-x-auto">
          {PORTFOLIO_CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 text-xs uppercase whitespace-nowrap transition-all"
              style={{
                letterSpacing: "0.1em",
                background: activeCategory === cat ? INK : "transparent",
                color: activeCategory === cat ? "#fff" : MUTED,
                border: `1px solid ${activeCategory === cat ? INK : BORDER}`,
                fontFamily: sans,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden border"
              style={{ borderColor: BORDER, background: item.whiteBg ? "#fff" : CARD, aspectRatio: "4/5" }}
            >
              <Image
                src={item.img}
                alt={`${item.title} — ${item.category} floral arrangement by Afuvai, ${item.venue}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                loading="lazy"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4"
                style={{ background: "linear-gradient(to top, rgba(26,26,20,0.88) 0%, transparent 60%)" }}
              >
                <div style={{ fontSize: "0.62rem", letterSpacing: "0.16em", color: GOLD, textTransform: "uppercase", marginBottom: "0.3rem" }}>
                  {item.category}
                </div>
                <div style={{ fontFamily: serif, fontSize: "0.95rem", color: IVORY, lineHeight: 1.3 }}>{item.title}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(250,248,243,0.6)", marginTop: "2px" }}>{item.venue}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center" style={{ fontSize: "0.8rem", color: MUTED }}>
          {filtered.length} pieces · Las Vegas, NV
        </p>
      </div>
    </div>
  );
}
