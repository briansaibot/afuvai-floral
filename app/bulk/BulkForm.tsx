"use client";

import { useState } from "react";
import { toast } from "sonner";
import { SectionHead } from "@/app/components/SectionHead";
import { BORDER, CARD, INK, IVORY, MUTED, SAGE, serif } from "@/lib/constants";

export default function BulkForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", occasion: "", stems: "", date: "", palette: "", notes: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Bulk inquiry submitted! We'll be in touch within 48 hours.");
    setForm({ name: "", email: "", phone: "", occasion: "", stems: "", date: "", palette: "", notes: "" });
  };

  return (
    <section className="py-20 border-b" style={{ borderColor: BORDER }}>
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <div className="text-center mb-10">
          <SectionHead label="Get a Quote" heading="Tell us about your order" center />
          <p style={{ color: MUTED, marginTop: "0.8rem", fontSize: "0.96rem" }}>
            We&apos;ll respond within 48 hours with a curated quote and stem list.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { label: "Full Name",           key: "name",  type: "text",  placeholder: "Jane Smith" },
              { label: "Email",               key: "email", type: "email", placeholder: "jane@example.com" },
              { label: "Phone",               key: "phone", type: "tel",   placeholder: "(702) 555-0100" },
              { label: "Approx. Stem Count",  key: "stems", type: "text",  placeholder: "e.g. 100 stems" },
            ].map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block mb-1.5" style={{ fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", color: INK, fontWeight: 500 }}>
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
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-1.5" style={{ fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", color: INK, fontWeight: 500 }}>
                Occasion / Use Case
              </label>
              <select
                value={form.occasion}
                onChange={(e) => setForm((p) => ({ ...p, occasion: e.target.value }))}
                className="w-full px-4 py-3 text-base outline-none border"
                style={{ background: CARD, borderColor: BORDER, color: INK }}
              >
                <option value="">Select...</option>
                <option>Wedding / DIY Bride</option>
                <option>Corporate Event</option>
                <option>Restaurant / Hotel</option>
                <option>Photo Shoot</option>
                <option>Floral Studio</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1.5" style={{ fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", color: INK, fontWeight: 500 }}>
                Needed By Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
                className="w-full px-4 py-3 text-base outline-none border"
                style={{ background: CARD, borderColor: BORDER, color: INK }}
              />
            </div>
          </div>
          <div>
            <label className="block mb-1.5" style={{ fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", color: INK, fontWeight: 500 }}>
              Color Palette or Flower Preferences
            </label>
            <input
              type="text"
              placeholder="e.g. White and blush, lots of greenery, garden-style..."
              value={form.palette}
              onChange={(e) => setForm((p) => ({ ...p, palette: e.target.value }))}
              className="w-full px-4 py-3 text-base outline-none border"
              style={{ background: CARD, borderColor: BORDER, color: INK }}
            />
          </div>
          <div>
            <label className="block mb-1.5" style={{ fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase", color: INK, fontWeight: 500 }}>
              Additional Notes
            </label>
            <textarea
              rows={4}
              placeholder="Venue, specific stem requests, delivery address area, budget..."
              value={form.notes}
              onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
              className="w-full px-4 py-3 text-base outline-none border resize-none"
              style={{ background: CARD, borderColor: BORDER, color: INK }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 text-base font-semibold uppercase hover:opacity-85 transition-opacity"
            style={{ background: SAGE, color: "#fff", letterSpacing: "0.14em" }}
          >
            Submit Bulk Inquiry
          </button>
          <p className="text-sm text-center" style={{ color: MUTED }}>
            Delivery only · Las Vegas Valley · hello@afuvai.com
          </p>
        </form>
      </div>
    </section>
  );
}
