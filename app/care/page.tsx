import type { Metadata } from "next";
import { Mail, Scissors, Droplets, Sun, Wind, Heart, Leaf } from "lucide-react";
import { BORDER, BORDER_G, CARD, GOLD, INK, IVORY, MUTED, SAGE, serif } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Flower Care Guide",
  description:
    "How to care for your Afuvai floral arrangement. Expert tips from AmiDayne on extending the life of your flowers.",
  alternates: { canonical: "https://afuvai.com/care" },
};

const CARE_TIPS = [
  { icon: Scissors, num: "01", title: "Trim the stems",         body: "Re-cut each stem at a 45-degree angle — about one inch from the bottom. Repeat every 2–3 days." },
  { icon: Droplets, num: "02", title: "Change the water daily", body: "Fresh, clean water is the single most important thing. Change daily, rinse the vase, and re-trim stems. Use room-temperature water." },
  { icon: Sun,      num: "03", title: "Find the right light",   body: "Bright, indirect light is ideal. Avoid direct sunlight and heating vents — both dehydrate blooms quickly." },
  { icon: Wind,     num: "04", title: "Keep away from heat",    body: "Heat and fruit bowls both speed wilting — fruit releases ethylene gas. Keep your arrangement in a cool, stable spot." },
  { icon: Heart,    num: "05", title: "Remove wilted blooms",   body: "Remove fading stems promptly. Decaying flowers release bacteria that shorten the life of healthy blooms." },
  { icon: Leaf,     num: "06", title: "Use the flower food",    body: "Dissolve the included flower food packet in your vase water. It genuinely extends vase life." },
];

export default function CarePage() {
  return (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      {/* Header */}
      <div className="border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-3xl mx-auto px-5 md:px-8 py-8">
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.28em", color: GOLD, textTransform: "uppercase", marginBottom: "0.5rem" }}>
            From Our Studio
          </p>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 500, color: INK }}>
            Flower Care Guide
          </h1>
          <p style={{ color: MUTED, lineHeight: 1.75, fontSize: "0.95rem", marginTop: "0.75rem" }}>
            Your Afuvai arrangement was crafted the morning of delivery. With proper care, most arrangements last 7–14 days.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 md:px-8 py-8">
        <div className="space-y-0">
          {CARE_TIPS.map(({ icon: Icon, num, title, body }) => (
            <div key={num} className="flex items-start gap-4 py-5 border-b" style={{ borderColor: BORDER }}>
              <div className="flex flex-col items-center gap-1 flex-shrink-0 w-10">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: CARD, border: `1px solid ${BORDER}` }}
                >
                  <Icon size={15} style={{ color: SAGE }} />
                </div>
                <div style={{ fontFamily: serif, fontSize: "0.68rem", color: GOLD, opacity: 0.5 }}>{num}</div>
              </div>
              <div>
                <h3 style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: INK, marginBottom: "0.3rem" }}>
                  {title}
                </h3>
                <p style={{ color: MUTED, lineHeight: 1.7, fontSize: "0.88rem" }}>{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-5 border" style={{ borderColor: BORDER_G, background: CARD }}>
          <div style={{ fontSize: "0.82rem", color: GOLD, marginBottom: "0.5rem" }}>✦ A note from AmiDayne</div>
          <p style={{ fontFamily: serif, fontStyle: "italic", color: MUTED, lineHeight: 1.75, fontSize: "0.92rem" }}>
            &ldquo;Every arrangement I design is meant to live with you — to change the feeling of a room, mark a moment, or simply remind you that beauty is worth paying attention to.&rdquo;
          </p>
          <div className="mt-3" style={{ fontSize: "0.75rem", color: MUTED }}>— AmiDayne Nelsen, Founder</div>
        </div>

        <div
          className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t"
          style={{ borderColor: BORDER }}
        >
          <p style={{ color: MUTED, fontSize: "0.88rem" }}>Questions about your arrangement?</p>
          <a
            href="mailto:admin@afuvai.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium hover:opacity-85 transition-opacity"
            style={{ background: SAGE, color: "#fff" }}
          >
            <Mail size={13} /> admin@afuvai.com
          </a>
        </div>
      </div>
    </div>
  );
}
