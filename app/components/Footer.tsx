import Link from "next/link";
import { Instagram, Facebook, Mail, Clock, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { BORDER, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, sans, serif } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: INK, color: "rgba(250,248,243,0.72)" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-10 md:gap-8 mb-12 pb-12 border-b" style={{ borderColor: "rgba(250,248,243,0.1)" }}>
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <span
                style={{
                  fontFamily: serif,
                  fontSize: "1.3rem",
                  fontWeight: 600,
                  color: IVORY,
                  letterSpacing: "0.04em",
                  lineHeight: 1,
                }}
              >
                AFUVAI
                <span
                  style={{
                    display: "block",
                    fontSize: "0.55rem",
                    letterSpacing: "0.28em",
                    color: GOLD,
                    textTransform: "uppercase",
                    fontWeight: 400,
                    fontFamily: sans,
                  }}
                >
                  Floral Society
                </span>
              </span>
            </div>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "rgba(250,248,243,0.55)", marginBottom: "1.2rem" }}>
              Las Vegas luxury floral design. Same-day delivery, floral classes, and custom event florals across the Las Vegas Valley.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/afuvaifloral"
                target="_blank"
                rel="noreferrer"
                style={{ color: "rgba(250,248,243,0.4)" }}
                className="hover:opacity-75 transition-opacity"
                aria-label="Afuvai on Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: "rgba(250,248,243,0.4)" }}
                className="hover:opacity-75 transition-opacity"
                aria-label="Afuvai on Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://tiktok.com/@afuvaifloral"
                target="_blank"
                rel="noreferrer"
                style={{ color: "rgba(250,248,243,0.4)" }}
                className="hover:opacity-75 transition-opacity"
                aria-label="Afuvai on TikTok"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.22em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem", fontWeight: 600 }}>
              Shop
            </p>
            <div className="space-y-2.5">
              {[
                { label: "All Collections", href: "/#collections" },
                { label: "Weddings", href: "/weddings" },
                { label: "Subscriptions", href: "/subscriptions" },
                { label: "Gift Cards", href: "/gift-cards" },
                { label: "Bulk Orders", href: "/bulk" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  style={{ fontSize: "0.88rem", color: "rgba(250,248,243,0.55)", display: "block" }}
                  className="hover:opacity-80 transition-opacity"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Experiences */}
          <div>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.22em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem", fontWeight: 600 }}>
              Experiences
            </p>
            <div className="space-y-2.5">
              {[
                { label: "Floral Classes", href: "/classes" },
                { label: "Hosted Parties", href: "/parties" },
                { label: "Collaborations", href: "/collabs" },
                { label: "Build Your Bouquet", href: "/quiz" },
                { label: "Portfolio", href: "/portfolio" },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  style={{ fontSize: "0.88rem", color: "rgba(250,248,243,0.55)", display: "block" }}
                  className="hover:opacity-80 transition-opacity"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.22em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem", fontWeight: 600 }}>
              Contact
            </p>
            <div className="space-y-3">
              <a
                href="mailto:hello@afuvai.com"
                className="flex items-start gap-2 hover:opacity-80 transition-opacity"
                style={{ fontSize: "0.88rem", color: "rgba(250,248,243,0.55)" }}
              >
                <Mail size={13} style={{ marginTop: "2px", flexShrink: 0 }} />
                hello@afuvai.com
              </a>
              <div className="flex items-start gap-2" style={{ fontSize: "0.88rem", color: "rgba(250,248,243,0.55)" }}>
                <Clock size={13} style={{ marginTop: "2px", flexShrink: 0 }} />
                Open daily, 9 am – 5 pm
              </div>
              <div className="flex items-start gap-2" style={{ fontSize: "0.88rem", color: "rgba(250,248,243,0.55)" }}>
                <MapPin size={13} style={{ marginTop: "2px", flexShrink: 0 }} />
                Las Vegas Valley · Delivery only
              </div>
            </div>
            <Link
              href="/florist"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 border text-sm hover:opacity-80 transition-opacity"
              style={{ borderColor: "rgba(250,248,243,0.2)", color: "rgba(250,248,243,0.6)", fontSize: "0.8rem" }}
            >
              Meet AmiDayne →
            </Link>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p style={{ fontSize: "0.72rem", color: "rgba(250,248,243,0.3)", letterSpacing: "0.06em" }}>
            © {year} Afuvai Floral Society. Las Vegas, Nevada.
          </p>
          <div className="flex gap-6">
            {[
              { label: "Care Guide", href: "/care" },
              { label: "Meet the Florist", href: "/florist" },
              { label: "Privacy", href: "/florist" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                style={{ fontSize: "0.72rem", color: "rgba(250,248,243,0.3)", letterSpacing: "0.04em" }}
                className="hover:opacity-60 transition-opacity"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
