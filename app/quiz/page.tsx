"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/app/components/SectionHead";
import { BORDER, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, serif, PRODUCTS } from "@/lib/constants";

const OCCASIONS_QUIZ = ["Birthday", "Anniversary", "Wedding", "Sympathy", "Corporate", "Everyday", "Signature"];
const PALETTES = ["Soft & Blush (pinks, creams)", "Bold & Vivid (reds, blues, oranges)", "Natural & Green (whites, greens)", "Jewel-Toned (purples, burgundy)", "Warm & Golden (yellows, peach)"];
const BUDGETS = ["Under $100", "$100–$150", "$150–$200", "$200–$300", "No budget — make it extraordinary"];

function getRecommendations(occasion: string, palette: string, budget: string) {
  let results = [...PRODUCTS];

  if (occasion) {
    const map: Record<string, string[]> = {
      Birthday: ["Birthday", "Everyday"],
      Anniversary: ["Anniversary", "Signature"],
      Wedding: ["Wedding", "Signature"],
      Sympathy: ["Sympathy"],
      Corporate: ["Corporate"],
      Everyday: ["Everyday"],
      Signature: ["Signature"],
    };
    const cats = map[occasion] ?? [];
    results = results.filter((p) => cats.includes(p.category));
  }

  if (budget) {
    const max = budget.includes("300") ? 300 : budget.includes("200") ? 200 : budget.includes("150") ? 150 : budget.includes("100") ? 100 : 9999;
    results = results.filter((p) => p.price <= max);
  }

  return results.slice(0, 4);
}

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState("");
  const [palette, setPalette] = useState("");
  const [budget, setBudget] = useState("");

  const recs = step === 3 ? getRecommendations(occasion, palette, budget) : [];

  return (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 text-center">
          <SectionHead label="Find Your Perfect Bouquet" heading={<>Build Your<br /><em style={{ color: GOLD, fontStyle: "italic" }}>Bouquet</em></>} center />
          <p style={{ color: MUTED, marginTop: "0.8rem", fontSize: "0.97rem" }}>
            Answer three questions and we&apos;ll match you with the perfect Afuvai arrangement.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 md:px-8 py-16">
        {/* Progress */}
        {step < 3 && (
          <div className="flex gap-2 mb-10">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-1 flex-1 transition-all"
                style={{ background: i <= step ? SAGE : CARD }}
              />
            ))}
          </div>
        )}

        {/* Step 0: Occasion */}
        {step === 0 && (
          <div>
            <h2 style={{ fontFamily: serif, fontSize: "1.5rem", color: INK, marginBottom: "0.5rem" }}>
              What&apos;s the occasion?
            </h2>
            <p style={{ color: MUTED, fontSize: "0.9rem", marginBottom: "2rem" }}>Pick the one that fits best.</p>
            <div className="grid grid-cols-2 gap-3">
              {OCCASIONS_QUIZ.map((occ) => (
                <button
                  key={occ}
                  onClick={() => { setOccasion(occ); setStep(1); }}
                  className="py-4 px-5 border text-left hover:opacity-80 transition-all"
                  style={{
                    borderColor: BORDER,
                    background: CARD,
                    fontFamily: serif,
                    fontSize: "1rem",
                    color: INK,
                  }}
                >
                  {occ}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Palette */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: serif, fontSize: "1.5rem", color: INK, marginBottom: "0.5rem" }}>
              What color palette calls to you?
            </h2>
            <p style={{ color: MUTED, fontSize: "0.9rem", marginBottom: "2rem" }}>Your aesthetic, your choice.</p>
            <div className="space-y-3">
              {PALETTES.map((p) => (
                <button
                  key={p}
                  onClick={() => { setPalette(p); setStep(2); }}
                  className="w-full py-4 px-5 border text-left hover:opacity-80 transition-all"
                  style={{ borderColor: BORDER, background: CARD, fontSize: "0.97rem", color: INK }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Budget */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: serif, fontSize: "1.5rem", color: INK, marginBottom: "0.5rem" }}>
              What&apos;s your budget?
            </h2>
            <p style={{ color: MUTED, fontSize: "0.9rem", marginBottom: "2rem" }}>All arrangements are worth it. We promise.</p>
            <div className="space-y-3">
              {BUDGETS.map((b) => (
                <button
                  key={b}
                  onClick={() => { setBudget(b); setStep(3); }}
                  className="w-full py-4 px-5 border text-left hover:opacity-80 transition-all"
                  style={{ borderColor: BORDER, background: CARD, fontSize: "0.97rem", color: INK }}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: serif, fontSize: "1.6rem", color: INK, marginBottom: "0.5rem" }}>
              Your perfect matches.
            </h2>
            <p style={{ color: MUTED, fontSize: "0.9rem", marginBottom: "2rem" }}>
              Based on your choices — {occasion}, {palette.split(" (")[0]}, {budget}.
            </p>
            {recs.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 mb-8">
                {recs.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="border group overflow-hidden"
                    style={{ borderColor: BORDER, background: product.whiteBg ? "#fff" : CARD }}
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                      <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, 25vw"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 style={{ fontFamily: serif, fontSize: "0.95rem", color: INK }}>{product.name}</h3>
                      <p style={{ fontSize: "0.88rem", color: GOLD }}>From ${product.sizes[0].price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-8 border text-center mb-8" style={{ borderColor: BORDER, background: CARD }}>
                <p style={{ color: MUTED }}>No exact matches — try a different budget or occasion.</p>
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => { setStep(0); setOccasion(""); setPalette(""); setBudget(""); }}
                className="flex-1 py-3 border text-sm font-semibold uppercase hover:opacity-80 transition-opacity"
                style={{ borderColor: SAGE, color: SAGE, letterSpacing: "0.1em" }}
              >
                Start Over
              </button>
              <Link
                href="/#collections"
                className="flex-1 py-3 text-center text-sm font-semibold uppercase hover:opacity-85 transition-opacity"
                style={{ background: SAGE, color: "#fff", letterSpacing: "0.1em" }}
              >
                Browse All →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
