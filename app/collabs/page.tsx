import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/app/components/SectionHead";
import { BORDER, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, serif, IMG_WILD_MEADOW, IMG_HEX_ARCH, PINK_BOUQUET, PURPLE_BOUQUET } from "@/lib/constants";
import CollabsForm from "./CollabsForm";

export const metadata: Metadata = {
  title: "Collaborate with Afuvai",
  description:
    "Partner with Afuvai Floral Society for co-hosted floral events in Las Vegas. Wineries, roasters, boutiques, spas — shared audiences, beautiful content, sold-out rooms.",
  alternates: { canonical: "https://afuvai.com/collabs" },
};

const FORMATS = [
  { title: "Wine & Flowers",    sub: "Sip & arrange.",        desc: "The evergreen favorite. Guests build a bouquet over a flight at your tasting room.",          ideal: "WINERIES · TASTING ROOMS" },
  { title: "Coffee & Blooms",   sub: "Morning bouquets.",     desc: "A bright daytime build over specialty coffee. Low-cost, high frequency, endlessly photogenic.", ideal: "ROASTERS · CAFÉS" },
  { title: "Scent & Stem",      sub: "A sensory pairing.",    desc: "Florals meet fragrance — guests design an arrangement and a personalized candle.",             ideal: "CANDLE · FRAGRANCE STUDIOS" },
  { title: "Self-Care Sunday",  sub: "Bloom & glow.",         desc: "A wellness-focused experience — facials, treatments, and florals in one afternoon.",            ideal: "MED SPAS · WELLNESS STUDIOS" },
  { title: "Petals & Pairings", sub: "Design & dine.",        desc: "An elevated evening of arranging alongside chocolate, dessert, or tea.",                       ideal: "PATISSERIES · TEA HOUSES" },
  { title: "Vow & Vase",        sub: "Bridal collab.",        desc: "A weekend pop-up with a bridal boutique — brides build a bouquet while they browse.",           ideal: "BRIDAL · JEWELRY BOUTIQUES" },
];

const PARTNER_TYPES = [
  "Boutique wineries & tasting rooms", "Specialty coffee roasters", "Candle & fragrance studios", "Bridal boutiques",
  "Med spas & aesthetic clinics", "Pilates, yoga & boutique fitness", "Champagne bars & lounges", "Interior & design showrooms",
  "Jewelry boutiques", "Boutique hotels & resort spas", "Patisseries & chocolatiers", "Tea houses",
  "Country & golf clubs", "Luxury real estate brokerages", "Lifestyle concept shops", "Photography studios",
];

export default function CollabsPage() {
  return (
    <div className="pt-[88px] min-h-screen overflow-x-hidden" style={{ background: IVORY }}>
      {/* Hero */}
      <section style={{ background: SAGE }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-px" style={{ background: GOLD_L }} />
            <span style={{ fontSize: "0.68rem", letterSpacing: "0.28em", color: GOLD_L, textTransform: "uppercase" }}>Partner With Us</span>
          </div>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(2.8rem, 7vw, 5rem)", fontWeight: 500, lineHeight: 1.06, color: IVORY, marginBottom: "1.5rem", maxWidth: "700px" }}>
            Better together, in bloom.
          </h1>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.82, color: "rgba(250,248,243,0.75)", maxWidth: "540px", marginBottom: "2.5rem" }}>
            AFUVAI co-hosts public floral experiences with the best independent brands in Las Vegas — wineries, roasters, boutiques, and spas. Shared audiences, beautiful content, and a sold-out room.
          </p>
          <Link
            href="#pitch-form"
            className="inline-block px-8 py-3.5 text-sm font-semibold uppercase border-2 hover:bg-white/10 transition-colors"
            style={{ color: IVORY, borderColor: IVORY, letterSpacing: "0.14em" }}
          >
            Become a Partner
          </Link>
        </div>
      </section>

      {/* The Model */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative overflow-hidden order-2 md:order-1" style={{ minHeight: "400px", background: CARD }}>
              <Image src={IMG_WILD_MEADOW} alt="Afuvai collaboration event" fill className="object-cover" sizes="50vw" />
            </div>
            <div className="flex flex-col justify-center px-8 md:px-12 py-14 order-1 md:order-2 border-b md:border-b-0 md:border-l" style={{ borderColor: BORDER }}>
              <h2 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 500, color: INK, lineHeight: 1.15, marginBottom: "1.2rem" }}>
                One event.<br />Two audiences.
              </h2>
              <p style={{ color: MUTED, lineHeight: 1.85, fontSize: "0.97rem", marginBottom: "1.8rem" }}>
                A co-hosted floral event puts your brand and ours in front of each other&apos;s followers, fills your space on a slow night, and generates a week of content for both of us. We handle the floral experience end to end. You bring the venue, your product, and your audience.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Shared cross-promotion to both audiences",
                  "Foot traffic & bar/retail sales for your space",
                  "Professionally styled, share-ready content",
                  "New email & social followers for both brands",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: GOLD }} />
                    <span style={{ fontSize: "0.94rem", color: MUTED }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="py-16 md:py-20 border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-10">
            <SectionHead label="Signature Collaborations" heading="Formats that sell out." />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FORMATS.map((f) => (
              <div key={f.title} className="p-6 border" style={{ borderColor: BORDER, background: IVORY }}>
                <h3 style={{ fontFamily: serif, fontSize: "1.1rem", fontWeight: 500, color: INK, marginBottom: "0.25rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.85rem", fontStyle: "italic", color: GOLD, marginBottom: "0.75rem" }}>{f.sub}</p>
                <p style={{ fontSize: "0.88rem", color: MUTED, lineHeight: 1.72, marginBottom: "1.25rem" }}>{f.desc}</p>
                <div className="pt-4 border-t" style={{ borderColor: BORDER }}>
                  <span style={{ fontSize: "0.65rem", letterSpacing: "0.18em", color: MUTED, textTransform: "uppercase" }}>Ideal: {f.ideal}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner types */}
      <section className="py-16 md:py-20 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-10">
            <SectionHead label="Who We Partner With" heading="The right rooms, the right crowd." />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PARTNER_TYPES.map((type) => (
              <div
                key={type}
                className="flex items-center justify-center px-4 py-5 border text-center"
                style={{ borderColor: BORDER, background: IVORY, fontSize: "0.88rem", color: INK, lineHeight: 1.45 }}
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pitch form */}
      <CollabsForm />
    </div>
  );
}
