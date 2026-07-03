"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { SectionHead } from "@/app/components/SectionHead";
import { FaqBlock } from "@/app/components/FaqBlock";
import {
  BORDER, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, sans, serif,
  SUB_TIERS, SUB_FREQUENCIES, FAQS_SUB,
} from "@/lib/constants";

export default function SubscriptionsPage() {
  const [frequency, setFrequency] = useState("Monthly");

  const handleSubscribe = (tierName: string) => {
    toast.success(`${tierName} ${frequency} subscription — contact hello@afuvai.com to get started!`, { duration: 5000 });
  };

  return (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 text-center">
          <SectionHead label="Recurring Beauty" heading={<>Flowers,<br /><em style={{ color: GOLD, fontStyle: "italic" }}>delivered.</em></>} center />
          <p style={{ color: MUTED, marginTop: "0.8rem", fontSize: "0.97rem", maxWidth: "480px", margin: "0.8rem auto 0" }}>
            Three tiers. Three delivery schedules. All designed by AmiDayne, delivered fresh to your Las Vegas address.
          </p>
        </div>
      </div>

      {/* Frequency selector */}
      <div className="sticky top-[88px] z-20 border-b" style={{ borderColor: BORDER, background: "rgba(250,248,243,0.97)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-3 flex gap-2 justify-center">
          {SUB_FREQUENCIES.map((freq) => (
            <button
              key={freq}
              onClick={() => setFrequency(freq)}
              className="px-5 py-2 text-sm transition-all"
              style={{
                background: frequency === freq ? INK : "transparent",
                color: frequency === freq ? "#fff" : MUTED,
                border: `1px solid ${frequency === freq ? INK : BORDER}`,
                fontFamily: sans,
                letterSpacing: "0.06em",
              }}
            >
              {freq}
            </button>
          ))}
        </div>
      </div>

      {/* Tiers */}
      <section className="py-16 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {SUB_TIERS.map((tier) => {
              const isPopular = tier.badge === "Most Popular";
              return (
                <div
                  key={tier.name}
                  className="border"
                  style={{
                    borderColor: isPopular ? SAGE : BORDER,
                    borderWidth: isPopular ? "2px" : "1px",
                    background: IVORY,
                  }}
                >
                  {tier.badge && (
                    <div
                      className="text-center py-1.5"
                      style={{
                        background: isPopular ? SAGE : GOLD,
                        fontSize: "0.68rem",
                        letterSpacing: "0.18em",
                        color: "#fff",
                        textTransform: "uppercase",
                      }}
                    >
                      {tier.badge}
                    </div>
                  )}
                  <div className="relative overflow-hidden" style={{ height: "220px" }}>
                    <Image
                      src={tier.img}
                      alt={`${tier.name} subscription tier — floral delivery Las Vegas`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-7">
                    <div className="flex items-baseline justify-between mb-5">
                      <h3 style={{ fontFamily: serif, fontSize: "1.5rem", color: INK }}>{tier.name}</h3>
                      <div>
                        <span style={{ fontFamily: serif, fontSize: "1.6rem", color: GOLD }}>${tier.price[frequency]}</span>
                        <span style={{ fontSize: "0.78rem", color: MUTED }}>/delivery</span>
                      </div>
                    </div>
                    <ul className="space-y-2.5 mb-7">
                      {tier.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Check size={14} style={{ color: SAGE, flexShrink: 0, marginTop: "2px" }} />
                          <span style={{ fontSize: "0.88rem", color: MUTED }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleSubscribe(tier.name)}
                      className="w-full py-4 text-sm font-semibold uppercase hover:opacity-85 transition-opacity"
                      style={{
                        background: isPopular ? SAGE : "transparent",
                        color: isPopular ? "#fff" : SAGE,
                        border: isPopular ? "none" : `1px solid ${SAGE}`,
                        letterSpacing: "0.12em",
                      }}
                    >
                      Subscribe — {frequency}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-center mt-6" style={{ fontSize: "0.8rem", color: MUTED }}>
            No contracts · Cancel anytime · Las Vegas Valley delivery
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <div className="mb-10">
            <SectionHead label="Questions" heading="Subscription FAQ" />
          </div>
          <FaqBlock items={FAQS_SUB} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: CARD }}>
        <div className="max-w-xl mx-auto px-5 text-center">
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.24em", color: GOLD, textTransform: "uppercase", marginBottom: "0.5rem" }}>
            Questions?
          </p>
          <h2 style={{ fontFamily: serif, fontSize: "1.8rem", color: INK, marginBottom: "1rem" }}>
            We&apos;re happy to help.
          </h2>
          <a href="mailto:hello@afuvai.com" style={{ color: SAGE, fontSize: "0.97rem" }} className="hover:opacity-70 transition-opacity">
            hello@afuvai.com →
          </a>
        </div>
      </section>
    </div>
  );
}
