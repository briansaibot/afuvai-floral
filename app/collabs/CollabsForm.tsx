"use client";

import { useState } from "react";
import { toast } from "sonner";
import { SectionHead } from "@/app/components/SectionHead";
import { BORDER, CARD, INK, IVORY, MUTED, SAGE } from "@/lib/constants";

export default function CollabsForm() {
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "", type: "", space: "", notes: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Pitch received! We'll be in touch within 48 hours with a proposal.");
    setForm({ name: "", business: "", email: "", phone: "", type: "", space: "", notes: "" });
  };

  return (
    <section id="pitch-form" className="py-16 md:py-20" style={{ background: CARD }}>
      <div className="max-w-2xl mx-auto px-5 md:px-8">
        <div className="text-center mb-10">
          <SectionHead label="Start a Conversation" heading="Pitch a collaboration." center />
          <p style={{ color: MUTED, fontSize: "0.96rem", marginTop: "0.5rem" }}>
            Tell us about your space and we&apos;ll send a proposal within 48 hours. No commitment required.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Your Name",      key: "name",     type: "text",  placeholder: "Jane Smith" },
              { label: "Business Name",  key: "business", type: "text",  placeholder: "The Bloom Room" },
              { label: "Email",          key: "email",    type: "email", placeholder: "jane@yourbrand.com" },
              { label: "Phone",          key: "phone",    type: "tel",   placeholder: "(702) 555-0100" },
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
                  style={{ background: IVORY, borderColor: BORDER, color: INK }}
                />
              </div>
            ))}
          </div>
          <div>
            <label className="block mb-1.5" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: INK, fontWeight: 500 }}>
              Type of Space
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
              className="w-full px-4 py-3 text-base outline-none border"
              style={{ background: IVORY, borderColor: BORDER, color: INK }}
            >
              <option value="">Select your space type...</option>
              <option>Winery / Tasting Room</option>
              <option>Coffee Roaster / Café</option>
              <option>Candle / Fragrance Studio</option>
              <option>Med Spa / Wellness Studio</option>
              <option>Patisserie / Tea House</option>
              <option>Bridal / Jewelry Boutique</option>
              <option>Boutique Hotel / Resort</option>
              <option>Fitness Studio</option>
              <option>Restaurant / Bar / Lounge</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block mb-1.5" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: INK, fontWeight: 500 }}>
              Tell Us About Your Space & Audience
            </label>
            <textarea
              rows={4}
              placeholder="Capacity, vibe, typical guest, why you think we'd be a good fit..."
              value={form.space}
              onChange={(e) => setForm((p) => ({ ...p, space: e.target.value }))}
              className="w-full px-4 py-3 text-base outline-none border resize-none"
              style={{ background: IVORY, borderColor: BORDER, color: INK }}
            />
          </div>
          <div>
            <label className="block mb-1.5" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: INK, fontWeight: 500 }}>
              Anything Else?
            </label>
            <textarea
              rows={3}
              placeholder="Preferred dates, format ideas, questions..."
              value={form.notes}
              onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
              className="w-full px-4 py-3 text-base outline-none border resize-none"
              style={{ background: IVORY, borderColor: BORDER, color: INK }}
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 text-base font-semibold uppercase hover:opacity-85 transition-opacity"
            style={{ background: SAGE, color: "#fff", letterSpacing: "0.14em" }}
          >
            Send My Pitch
          </button>
          <p className="text-sm text-center" style={{ color: MUTED }}>
            We respond within 48 hours · admin@afuvai.com
          </p>
        </form>
      </div>
    </section>
  );
}
