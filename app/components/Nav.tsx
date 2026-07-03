"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X, ChevronDown, User, Instagram, Facebook } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { Logo } from "./Logo";
import {
  BORDER, BORDER_G, CARD, GOLD, GOLD_L, INK, IVORY, MUTED, SAGE, sans, serif,
  PRIMARY_NAV, DROPDOWN_NAV, ALL_NAV_MOBILE, PRODUCTS,
} from "@/lib/constants";

export function Nav() {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, setCartOpen } = useCart();
  const [dropOpen, setDropOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropRef = useRef<HTMLDivElement>(null);
  const dropTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const openDrop = () => {
    if (dropTimeout.current) clearTimeout(dropTimeout.current);
    setDropOpen(true);
  };
  const closeDrop = () => {
    dropTimeout.current = setTimeout(() => setDropOpen(false), 120);
  };

  const searchResults =
    searchQuery.length > 1
      ? PRODUCTS.filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  const dropPages = ["/parties", "/collabs", "/bulk", "/quiz", "/subscriptions", "/gift-cards", "/care", "/portfolio"];
  const dropActive = dropPages.some((p) => pathname.startsWith(p));

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "rgba(250,248,243,0.97)",
          borderBottom: `1px solid ${BORDER}`,
          backdropFilter: "blur(14px)",
        }}
      >
        {/* Announcement bar */}
        <div className="overflow-hidden py-1.5" style={{ background: SAGE }}>
          <div
            className="marquee-track flex gap-20 whitespace-nowrap"
            style={{
              fontSize: "0.63rem",
              letterSpacing: "0.2em",
              color: "rgba(250,248,243,0.78)",
              textTransform: "uppercase",
            }}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className="flex gap-20 flex-shrink-0">
                {[
                  "Las Vegas · Same-Day Delivery",
                  "Floral Design Classes",
                  "Hosted Floral Parties",
                  "Now Booking 2026–2027",
                  "Las Vegas · Henderson · Summerlin · North Las Vegas",
                  "VIP Floral Experiences",
                  "Bulk Flower Orders",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-2">
                    <span style={{ color: GOLD_L }}>✦</span> {t}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* Main nav row */}
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-[62px] flex items-center justify-between gap-4">
          <Link href="/" className="flex-shrink-0" aria-label="Afuvai Floral Society home">
            <Logo />
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-5">
              {PRIMARY_NAV.map(({ label, href }) => {
                const active = pathname === href || (href === "/#collections" && pathname === "/");
                return (
                  <Link
                    key={label}
                    href={href}
                    style={{
                      fontSize: "0.71rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: active ? SAGE : MUTED,
                      fontWeight: active ? 500 : 400,
                      transition: "color 0.2s",
                      whiteSpace: "nowrap",
                    }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = INK)}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = active ? SAGE : MUTED)}
                  >
                    {label}
                  </Link>
                );
              })}

              {/* More dropdown */}
              <div className="relative" ref={dropRef} onMouseEnter={openDrop} onMouseLeave={closeDrop}>
                <button
                  className="flex items-center gap-1"
                  style={{
                    fontSize: "0.71rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: dropActive ? SAGE : MUTED,
                    fontWeight: dropActive ? 500 : 400,
                    transition: "color 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  aria-expanded={dropOpen}
                  aria-haspopup="true"
                >
                  More
                  <ChevronDown
                    size={12}
                    style={{ transition: "transform 0.2s", transform: dropOpen ? "rotate(180deg)" : "none" }}
                  />
                </button>

                {dropOpen && (
                  <div
                    className="absolute top-full right-0 mt-3 border shadow-lg z-50"
                    style={{
                      background: IVORY,
                      borderColor: BORDER,
                      minWidth: "420px",
                      boxShadow: "0 8px 32px rgba(26,26,20,0.10)",
                    }}
                  >
                    <div style={{ height: "2px", background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
                    <div className="grid grid-cols-2 gap-0">
                      {DROPDOWN_NAV.map((section, si) => (
                        <div
                          key={section.section}
                          className={si === 0 ? "border-r p-5" : "p-5"}
                          style={{ borderColor: BORDER }}
                        >
                          <p
                            style={{
                              fontSize: "0.6rem",
                              letterSpacing: "0.24em",
                              color: GOLD,
                              textTransform: "uppercase",
                              marginBottom: "0.8rem",
                              fontWeight: 600,
                            }}
                          >
                            {section.section}
                          </p>
                          <div className="space-y-1">
                            {section.links.map(({ label, href: linkHref }) => {
                              const isActive = pathname === linkHref;
                              return (
                                <Link
                                  key={label}
                                  href={linkHref}
                                  onClick={() => setDropOpen(false)}
                                  className="w-full text-left flex items-center gap-2 px-3 py-2 transition-colors"
                                  style={{ background: isActive ? CARD : "transparent" }}
                                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = CARD)}
                                  onMouseLeave={(e) =>
                                    ((e.currentTarget as HTMLElement).style.background = isActive ? CARD : "transparent")
                                  }
                                >
                                  {isActive && (
                                    <div
                                      className="w-1 h-1 rounded-full flex-shrink-0"
                                      style={{ background: SAGE }}
                                    />
                                  )}
                                  <span
                                    style={{
                                      fontSize: "0.85rem",
                                      color: isActive ? SAGE : INK,
                                      fontWeight: isActive ? 500 : 400,
                                    }}
                                  >
                                    {label}
                                  </span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div
                      className="border-t px-5 py-3 flex flex-wrap gap-x-5 gap-y-1"
                      style={{ borderColor: BORDER, background: CARD }}
                    >
                      {[
                        { label: "Subscriptions", href: "/subscriptions" },
                        { label: "Care Guide", href: "/care" },
                        { label: "Contact", href: "/florist" },
                        { label: "hello@afuvai.com", href: "/florist" },
                      ].map(({ label, href: linkHref }) => (
                        <Link
                          key={label}
                          href={linkHref}
                          onClick={() => setDropOpen(false)}
                          style={{ fontSize: "0.73rem", color: MUTED, letterSpacing: "0.04em" }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = SAGE)}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = MUTED)}
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Icon row */}
            <Link href="/account" style={{ color: MUTED }} className="hover:opacity-60 transition-opacity" aria-label="Account">
              <User size={18} />
            </Link>
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{ color: MUTED }}
              className="hover:opacity-60 transition-opacity"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative hover:opacity-60 transition-opacity"
              style={{ color: MUTED }}
              aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-[17px] h-[17px] rounded-full flex items-center justify-center text-[9px] font-bold"
                  style={{ background: SAGE, color: "#fff" }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden hover:opacity-60 transition-opacity"
              style={{ color: MUTED }}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t px-5 md:px-8 py-3" style={{ borderColor: BORDER, background: IVORY }}>
            <div className="max-w-7xl mx-auto flex items-center gap-3">
              <Search size={15} style={{ color: MUTED, flexShrink: 0 }} />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search arrangements, occasions, classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-base"
                style={{ color: INK, fontFamily: sans }}
                aria-label="Search products"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} style={{ color: MUTED }} aria-label="Clear search">
                  <X size={13} />
                </button>
              )}
            </div>
            {searchResults.length > 0 && (
              <div className="max-w-7xl mx-auto mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 pb-2">
                {searchResults.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.id}`}
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    className="flex items-center gap-3 p-2.5 rounded-sm"
                    style={{ background: CARD }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.name} className="w-10 h-10 rounded-sm object-cover" />
                    <div>
                      <div className="text-sm font-medium" style={{ color: INK }}>{p.name}</div>
                      <div className="text-sm" style={{ color: MUTED }}>From ${p.sizes[0].price}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col" style={{ background: SAGE }}>
          <div className="flex items-center justify-between px-6 py-4">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <Logo h="40px" />
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ color: "rgba(250,248,243,0.75)" }}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-8 py-4">
            <div className="mb-4">
              {ALL_NAV_MOBILE.slice(0, 5).map(({ label, href }, i) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 border-b"
                  style={{
                    fontFamily: serif,
                    fontSize: "1.55rem",
                    color: IVORY,
                    borderColor: "rgba(250,248,243,0.1)",
                    animationName: "fadeSlideIn",
                    animationDuration: "0.38s",
                    animationTimingFunction: "ease",
                    animationDelay: `${i * 0.05}s`,
                    animationFillMode: "both",
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="pt-4">
              <p
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.24em",
                  color: GOLD_L,
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                More
              </p>
              {ALL_NAV_MOBILE.slice(5).map(({ label, href }, i) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 border-b"
                  style={{
                    fontSize: "1rem",
                    color: "rgba(250,248,243,0.75)",
                    borderColor: "rgba(250,248,243,0.08)",
                    fontFamily: sans,
                    animationName: "fadeSlideIn",
                    animationDuration: "0.38s",
                    animationTimingFunction: "ease",
                    animationDelay: `${(i + 5) * 0.04}s`,
                    animationFillMode: "both",
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <div className="px-8 py-5 border-t" style={{ borderColor: "rgba(250,248,243,0.12)" }}>
            <p style={{ fontSize: "0.78rem", color: "rgba(250,248,243,0.5)", marginBottom: "0.75rem" }}>
              hello@afuvai.com · Open daily 9am–5pm
            </p>
            <div className="flex gap-5">
              <a
                href="https://instagram.com/afuvaifloral"
                target="_blank"
                rel="noreferrer"
                style={{ color: "rgba(250,248,243,0.45)" }}
                aria-label="Afuvai on Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: "rgba(250,248,243,0.45)" }}
                aria-label="Afuvai on Facebook"
              >
                <Facebook size={17} />
              </a>
              <a
                href="https://tiktok.com/@afuvaifloral"
                target="_blank"
                rel="noreferrer"
                style={{ color: "rgba(250,248,243,0.45)" }}
                aria-label="Afuvai on TikTok"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
