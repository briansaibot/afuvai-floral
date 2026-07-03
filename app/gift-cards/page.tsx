"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { SectionHead } from "@/app/components/SectionHead";
import { BORDER, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, serif, HERO_IMG } from "@/lib/constants";

export default function GiftCardsPage() {
  const [amount, setAmount] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [form, setForm] = useState({ from: "", to: "", email: "", message: "" });

  const AMOUNTS = [50, 100, 150, 200, 250, 500];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const total = amount ?? Number(custom);
    if (!total || total < 25) {
      toast.error("Minimum gift card amount is $25.");
      return;
    }
    toast.success(`Gift card for $${total} — contact hello@afuvai.com to complete your purchase!`, { duration: 6000 });
  };

  return (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 text-center">
          <SectionHead label="The Gift That Blooms" heading={<>Afuvai<br /><em style={{ color: GOLD, fontStyle: "italic" }}>Gift Cards</em></>} center />
          <p style={{ color: MUTED, marginTop: "0.8rem", fontSize: "0.97rem", maxWidth: "460px", margin: "0.8rem auto 0" }}>
            Give the gift of flowers in any amount. Redeemable on arrangements, subscriptions, classes, and events.
          </p>
        </div>
      </div>

      {/* Card preview + form */}
      <section className="py-16 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Visual */}
            <div>
              <div
                className="relative overflow-hidden border mb-4"
                style={{ borderColor: BORDER, aspectRatio: "3/2" }}
              >
                <Image src={HERO_IMG} alt="Afuvai gift card" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0" style={{ background: "rgba(26,26,20,0.55)" }} />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.24em", color: GOLD_L, textTransform: "uppercase", marginBottom: "0.5rem" }}>
                    Afuvai Floral Society · Las Vegas
                  </p>
                  <p style={{ fontFamily: serif, fontSize: "2.5rem", color: IVORY, lineHeight: 1 }}>
                    {amount ? `$${amount}` : custom ? `$${custom}` : "$—"}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: "rgba(250,248,243,0.6)", marginTop: "0.5rem" }}>Gift Card</p>
                </div>
              </div>
              <p style={{ fontSize: "0.82rem", color: MUTED, textAlign: "center" }}>
                Delivered digitally via email · No expiration
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <p style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: INK, fontWeight: 500, marginBottom: "0.75rem" }}>
                  Select Amount
                </p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {AMOUNTS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => { setAmount(a); setCustom(""); }}
                      className="py-3 border text-sm font-semibold transition-all"
                      style={{
                        background: amount === a ? INK : "transparent",
                        color: amount === a ? "#fff" : MUTED,
                        borderColor: amount === a ? INK : BORDER,
                        fontFamily: serif,
                      }}
                    >
                      ${a}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  min={25}
                  placeholder="Custom amount (min $25)"
                  value={custom}
                  onChange={(e) => { setCustom(e.target.value); setAmount(null); }}
                  className="w-full px-4 py-3 text-base outline-none border"
                  style={{ background: CARD, borderColor: BORDER, color: INK }}
                />
              </div>
              {[
                { label: "From",          key: "from",    type: "text",  placeholder: "Your name" },
                { label: "To",            key: "to",      type: "text",  placeholder: "Recipient's name" },
                { label: "Recipient Email", key: "email", type: "email", placeholder: "recipient@email.com" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key}>
                  <label className="block mb-1.5" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: INK, fontWeight: 500 }}>
                    {label}
                  </label>
                  <input
                    required
                    type={type}
                    placeholder={placeholder}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                    className="w-full px-4 py-3 text-base outline-none border"
                    style={{ background: CARD, borderColor: BORDER, color: INK }}
                  />
                </div>
              ))}
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: INK, fontWeight: 500 }}>
                  Personal Message (optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Write something beautiful..."
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  className="w-full px-4 py-3 text-base outline-none border resize-none"
                  style={{ background: CARD, borderColor: BORDER, color: INK }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 text-base font-semibold uppercase hover:opacity-85 transition-opacity"
                style={{ background: SAGE, color: "#fff", letterSpacing: "0.14em" }}
              >
                Purchase Gift Card
              </button>
              <p className="text-sm text-center" style={{ color: MUTED }}>
                Purchase via hello@afuvai.com · No expiration
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
