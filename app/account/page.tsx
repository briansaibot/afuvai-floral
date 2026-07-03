"use client";

import { useState } from "react";
import { toast } from "sonner";
import { User, Package, Heart, Bell, Settings, CreditCard } from "lucide-react";
import { SectionHead } from "@/app/components/SectionHead";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { PRODUCTS, BORDER, CARD, GOLD, INK, IVORY, MUTED, SAGE, serif } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

const TABS = [
  { id: "orders",   label: "Orders",      icon: Package },
  { id: "wishlist", label: "Wishlist",     icon: Heart },
  { id: "settings", label: "Settings",    icon: Settings },
];

export default function AccountPage() {
  const [tab, setTab] = useState("orders");
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { wishlist } = useWishlist();

  const wishedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account login coming soon — contact hello@afuvai.com for assistance.");
  };

  if (!loggedIn) {
    return (
      <div className="pt-[88px] min-h-screen flex flex-col items-center justify-center px-5" style={{ background: IVORY }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <SectionHead label="Your Account" heading="Sign in" center />
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1.5" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: INK, fontWeight: 500 }}>
                Email
              </label>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-base outline-none border"
                style={{ background: CARD, borderColor: BORDER, color: INK }}
              />
            </div>
            <div>
              <label className="block mb-1.5" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: INK, fontWeight: 500 }}>
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-base outline-none border"
                style={{ background: CARD, borderColor: BORDER, color: INK }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 text-sm font-semibold uppercase hover:opacity-85 transition-opacity"
              style={{ background: SAGE, color: "#fff", letterSpacing: "0.14em" }}
            >
              Sign In
            </button>
          </form>
          <p className="text-center mt-4" style={{ fontSize: "0.82rem", color: MUTED }}>
            Account system coming soon. <a href="mailto:hello@afuvai.com" style={{ color: SAGE }}>Email us</a> for help.
          </p>
          {/* Show wishlist even when not logged in */}
          {wishedProducts.length > 0 && (
            <div className="mt-8 pt-8 border-t" style={{ borderColor: BORDER }}>
              <p style={{ fontSize: "0.72rem", letterSpacing: "0.1em", color: GOLD, textTransform: "uppercase", marginBottom: "1rem" }}>
                Your Wishlist ({wishedProducts.length})
              </p>
              <div className="space-y-3">
                {wishedProducts.map((p) => (
                  <Link key={p.id} href={`/product/${p.id}`} className="flex items-center gap-3 p-3 border" style={{ borderColor: BORDER, background: CARD }}>
                    <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden">
                      <Image src={p.img} alt={p.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: 500, color: INK }}>{p.name}</div>
                      <div style={{ fontSize: "0.78rem", color: GOLD }}>From ${p.sizes[0].price}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-12">
        <div className="mb-10 flex items-center justify-between">
          <SectionHead label="Welcome back" heading="Your Account" />
          <button
            onClick={() => setLoggedIn(false)}
            style={{ fontSize: "0.82rem", color: MUTED }}
            className="hover:opacity-70 transition-opacity"
          >
            Sign out
          </button>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-1">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors"
                style={{
                  background: tab === id ? CARD : "transparent",
                  color: tab === id ? SAGE : MUTED,
                  borderLeft: tab === id ? `2px solid ${SAGE}` : "2px solid transparent",
                }}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
          <div className="md:col-span-3">
            {tab === "orders" && (
              <div className="p-8 border text-center" style={{ borderColor: BORDER, background: CARD }}>
                <Package size={28} style={{ color: MUTED, opacity: 0.4, margin: "0 auto 1rem" }} />
                <p style={{ color: MUTED }}>No orders yet. Your order history will appear here.</p>
              </div>
            )}
            {tab === "wishlist" && (
              wishedProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {wishedProducts.map((p) => (
                    <Link key={p.id} href={`/product/${p.id}`} className="border group overflow-hidden" style={{ borderColor: BORDER, background: p.whiteBg ? "#fff" : CARD }}>
                      <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
                        <Image src={p.img} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" />
                      </div>
                      <div className="p-4">
                        <div style={{ fontFamily: serif, fontSize: "0.9rem", color: INK }}>{p.name}</div>
                        <div style={{ fontSize: "0.82rem", color: GOLD }}>From ${p.sizes[0].price}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-8 border text-center" style={{ borderColor: BORDER, background: CARD }}>
                  <Heart size={28} style={{ color: MUTED, opacity: 0.4, margin: "0 auto 1rem" }} />
                  <p style={{ color: MUTED }}>No saved items yet. Heart an arrangement to save it here.</p>
                </div>
              )
            )}
            {tab === "settings" && (
              <div className="p-8 border" style={{ borderColor: BORDER, background: CARD }}>
                <p style={{ color: MUTED, fontSize: "0.9rem" }}>Account settings coming soon. Contact <a href="mailto:hello@afuvai.com" style={{ color: SAGE }}>hello@afuvai.com</a> for changes.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
