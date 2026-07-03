import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Truck, Leaf, Phone } from "lucide-react";
import { ProductGrid } from "./components/ProductGrid";
import { SectionHead } from "./components/SectionHead";
import {
  BORDER, BORDER_G, CARD, GOLD, GOLD_L, HERO_IMG, INK, IVORY, MUTED, SAGE, SAGE_D, STUDIO_IMG, WORKSHOP_IMG,
  TESTIMONIALS, SUB_TIERS, SUB_FREQUENCIES, serif, sans,
  IMG_PURSE, IMG_PURSE_BLACK, IMG_PURSE_LIFESTYLE, IMG_GOLDEN_HOUR, IMG_GARDEN_REVERIE,
  PINK_BOUQUET, PURPLE_BOUQUET, WHITE_FLORAL,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: "Afuvai Floral Society | Las Vegas Luxury Florist",
  description:
    "Afuvai Floral Society — Las Vegas luxury floral design, same-day delivery, VIP experiences, and floral classes across the Las Vegas Valley.",
  alternates: { canonical: "https://afuvai.com" },
};

export default function HomePage() {
  return (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ minHeight: "clamp(480px, 80vh, 780px)" }}>
        <Image
          src={HERO_IMG}
          alt="Luxury floral arrangements by Afuvai Floral Society, Las Vegas"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(26,26,20,0.72) 0%, rgba(26,26,20,0.2) 60%, transparent 100%)" }}
        />
        <div
          className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 h-full flex flex-col justify-center"
          style={{ minHeight: "clamp(480px, 80vh, 780px)" }}
        >
          <div style={{ maxWidth: "520px" }}>
            <p
              style={{
                fontSize: "0.68rem",
                letterSpacing: "0.3em",
                color: GOLD_L,
                textTransform: "uppercase",
                marginBottom: "1.2rem",
                opacity: 0.9,
              }}
            >
              ✦ Las Vegas Luxury Floral Society
            </p>
            <h1
              style={{
                fontFamily: serif,
                fontSize: "clamp(2.8rem, 7vw, 5.2rem)",
                fontWeight: 500,
                color: IVORY,
                lineHeight: 1.05,
                marginBottom: "1.5rem",
              }}
            >
              Flowers that<br />
              <em style={{ color: GOLD_L, fontStyle: "italic" }}>say everything.</em>
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.8,
                color: "rgba(250,248,243,0.78)",
                marginBottom: "2.2rem",
                maxWidth: "420px",
              }}
            >
              Luxury floral design, same-day delivery, and unforgettable experiences — designed by AmiDayne for Las Vegas.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#collections"
                className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold hover:opacity-85 transition-opacity"
                style={{ background: SAGE, color: "#fff", letterSpacing: "0.08em" }}
              >
                Shop Collections <ArrowRight size={15} />
              </Link>
              <Link
                href="/weddings"
                className="inline-flex items-center gap-2 px-7 py-4 text-base font-semibold border-2 hover:bg-white/10 transition-colors"
                style={{ color: IVORY, borderColor: "rgba(250,248,243,0.5)", letterSpacing: "0.08em" }}
              >
                Wedding Florals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { icon: Truck,  label: "Same-Day Delivery",   sub: "Order by 11am" },
              { icon: Star,   label: "5-Star Rated",        sub: "100+ reviews" },
              { icon: Leaf,   label: "Sustainably Sourced", sub: "Certified farms" },
              { icon: Phone,  label: "Open Daily",          sub: "9 am – 5 pm" },
            ].map(({ icon: Icon, label, sub }, i) => (
              <div
                key={label}
                className={`flex items-center gap-3 px-6 py-4 ${i < 3 ? "border-r" : ""}`}
                style={{ borderColor: BORDER }}
              >
                <Icon size={18} style={{ color: SAGE, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 500, color: INK }}>{label}</div>
                  <div style={{ fontSize: "0.72rem", color: MUTED }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Classes Highlight */}
      <section className="border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative h-64 order-2 md:order-1" style={{ background: CARD }}>
              <Image
                src={WORKSHOP_IMG}
                alt="Floral design class with AmiDayne — Las Vegas"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Copy */}
            <div
              className="flex flex-col justify-center px-8 md:px-12 py-10 order-1 md:order-2 border-b md:border-b-0 md:border-l"
              style={{ borderColor: BORDER }}
            >
              <div
                className="inline-flex items-center gap-2 mb-3 px-3 py-1 self-start border"
                style={{ borderColor: BORDER_G, background: "rgba(184,153,90,0.08)" }}
              >
                <span
                  style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: GOLD, textTransform: "uppercase" }}
                >
                  Classes
                </span>
              </div>
              <h2
                style={{
                  fontFamily: serif,
                  fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                  fontWeight: 500,
                  color: INK,
                  lineHeight: 1.1,
                  marginBottom: "0.8rem",
                }}
              >
                Learn Floral<br />
                <em style={{ color: GOLD, fontStyle: "italic" }}>Design</em>
              </h2>
              <p style={{ color: MUTED, lineHeight: 1.75, fontSize: "0.9rem", marginBottom: "1rem", maxWidth: "420px" }}>
                Public and private floral design classes in Las Vegas. All skill levels welcome. Leave with finished arrangements and new techniques.
              </p>
              <p style={{ color: MUTED, lineHeight: 1.6, fontSize: "0.8rem", marginBottom: "1.5rem" }}>
                <strong>Beginner</strong> • Seasonal Design • Advanced • Private Sessions
              </p>
              <Link
                href="/classes"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold hover:opacity-85 transition-opacity uppercase"
                style={{ background: SAGE, color: "#fff", letterSpacing: "0.08em", width: "fit-content" }}
              >
                Explore Classes →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collections grid */}
      <section className="py-16 md:py-20 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-10">
            <SectionHead label="The Collection" heading="Every arrangement, every occasion" />
            <p style={{ color: MUTED, marginTop: "0.75rem", fontSize: "0.96rem", maxWidth: "480px" }}>
              27 original designs — from everyday gifts to wedding centerpieces, all crafted by AmiDayne Nelsen.
            </p>
          </div>
          <ProductGrid />
        </div>
      </section>

      {/* Services strip */}
      <section className="border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-3">
            {[
              { img: IMG_GOLDEN_HOUR,     title: "Wedding Florals",  href: "/weddings",  sub: "Ceremony · Reception · Bridal", desc: "Full-service wedding florals across Las Vegas Valley. From intimate ceremonies to grand receptions." },
              { img: PINK_BOUQUET,         title: "Floral Classes",   href: "/classes",   sub: "Beginner · Seasonal · Advanced", desc: "Learn floral design directly from AmiDayne. Public classes, private workshops, and team events." },
              { img: IMG_GARDEN_REVERIE,   title: "Subscriptions",   href: "/subscriptions", sub: "Weekly · Bi-Weekly · Monthly", desc: "Fresh arrangements delivered on your schedule. Three tiers — from a single seasonal stem to four bespoke pieces." },
            ].map(({ img, title, href, sub, desc }, i) => (
              <Link
                key={title}
                href={href}
                className={`group block relative overflow-hidden ${i < 2 ? "border-b md:border-b-0 md:border-r" : ""}`}
                style={{ borderColor: BORDER, minHeight: "360px" }}
              >
                <Image
                  src={img}
                  alt={`${title} — Afuvai Floral Society`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(26,26,20,0.88) 0%, rgba(26,26,20,0.1) 60%)" }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <p style={{ fontSize: "0.62rem", letterSpacing: "0.2em", color: GOLD_L, textTransform: "uppercase", marginBottom: "0.5rem" }}>
                    {sub}
                  </p>
                  <h3 style={{ fontFamily: serif, fontSize: "1.5rem", fontWeight: 500, color: IVORY, marginBottom: "0.6rem" }}>
                    {title}
                  </h3>
                  <p style={{ color: "rgba(250,248,243,0.7)", fontSize: "0.88rem", lineHeight: 1.65, marginBottom: "1rem" }}>
                    {desc}
                  </p>
                  <span
                    className="inline-flex items-center gap-1.5 text-sm font-medium"
                    style={{ color: GOLD_L, letterSpacing: "0.04em" }}
                  >
                    Explore <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 border-b" style={{ borderColor: BORDER, background: CARD }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="mb-12 text-center">
            <SectionHead label="From Our Clients" heading="What Las Vegas is saying" center />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="border p-8" style={{ borderColor: BORDER, background: IVORY }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} style={{ color: GOLD, fill: GOLD }} />
                  ))}
                </div>
                <p style={{ fontFamily: serif, fontStyle: "italic", color: MUTED, lineHeight: 1.78, fontSize: "0.97rem", marginBottom: "1.5rem" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 500, color: INK }}>{t.name}</div>
                  <div style={{ fontSize: "0.75rem", color: MUTED }}>{t.city}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription preview */}
      <section className="py-16 md:py-20 border-b" style={{ borderColor: BORDER }}>
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <SectionHead label="Never Miss a Bloom" heading="Fresh flowers, on your schedule" />
            <Link
              href="/subscriptions"
              className="inline-flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity flex-shrink-0"
              style={{ color: SAGE, letterSpacing: "0.06em" }}
            >
              View all tiers <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {SUB_TIERS.map((tier) => (
              <div
                key={tier.name}
                className="border"
                style={{
                  borderColor: tier.badge === "Most Popular" ? SAGE : BORDER,
                  borderWidth: tier.badge === "Most Popular" ? "2px" : "1px",
                  background: IVORY,
                }}
              >
                <div className="relative overflow-hidden" style={{ height: "200px" }}>
                  <Image
                    src={tier.img}
                    alt={`${tier.name} tier subscription — ${tier.badge || "monthly floral delivery"}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {tier.badge && (
                    <span
                      className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-semibold uppercase"
                      style={{
                        background: tier.badge === "Most Popular" ? SAGE : GOLD,
                        color: "#fff",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {tier.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 style={{ fontFamily: serif, fontSize: "1.2rem", color: INK, marginBottom: "0.3rem" }}>
                    {tier.name}
                  </h3>
                  <p style={{ fontFamily: serif, fontSize: "1.4rem", color: GOLD, marginBottom: "1rem" }}>
                    From ${tier.price.Monthly}/mo
                  </p>
                  <ul className="space-y-1.5 mb-5">
                    {tier.items.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2" style={{ fontSize: "0.84rem", color: MUTED }}>
                        <span style={{ color: SAGE, marginTop: "1px" }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/subscriptions"
                    className="block text-center py-3 text-sm font-semibold uppercase hover:opacity-85 transition-opacity"
                    style={{
                      background: tier.badge === "Most Popular" ? SAGE : "transparent",
                      color: tier.badge === "Most Popular" ? "#fff" : SAGE,
                      border: tier.badge === "Most Popular" ? "none" : `1px solid ${SAGE}`,
                      letterSpacing: "0.1em",
                    }}
                  >
                    Subscribe
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio CTA */}
      <section
        className="relative overflow-hidden"
        style={{ minHeight: "400px", background: SAGE_D }}
      >
        <Image
          src={STUDIO_IMG}
          alt="Afuvai Floral Society studio — Las Vegas"
          fill
          className="object-cover"
          style={{ opacity: 0.3 }}
          sizes="100vw"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-20 text-center">
          <p style={{ fontSize: "0.68rem", letterSpacing: "0.3em", color: GOLD_L, textTransform: "uppercase", marginBottom: "1.2rem" }}>
            ✦ Las Vegas Valley
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontSize: "clamp(2rem, 5vw, 3.6rem)",
              fontWeight: 500,
              color: IVORY,
              marginBottom: "1.2rem",
              lineHeight: 1.1,
            }}
          >
            Ready to make someone&apos;s day?
          </h2>
          <p style={{ color: "rgba(250,248,243,0.7)", fontSize: "1rem", marginBottom: "2.5rem", maxWidth: "480px", margin: "0 auto 2.5rem" }}>
            Same-day delivery across Las Vegas, Henderson, Summerlin, and North Las Vegas. Order by 2 pm.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/#collections"
              className="px-8 py-4 text-base font-semibold hover:opacity-85 transition-opacity"
              style={{ background: GOLD, color: INK, letterSpacing: "0.08em" }}
            >
              Shop Now
            </Link>
            <a
              href="mailto:hello@afuvai.com"
              className="px-8 py-4 text-base font-semibold border-2 hover:bg-white/10 transition-colors"
              style={{ color: IVORY, borderColor: "rgba(250,248,243,0.4)", letterSpacing: "0.08em" }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
