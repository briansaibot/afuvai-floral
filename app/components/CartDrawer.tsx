"use client";

import Image from "next/image";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { BORDER, CARD, GOLD, INK, IVORY, MUTED, SAGE, serif, sans } from "@/lib/constants";
import { redirectToStripeCheckout } from "@/lib/utils";

export function CartDrawer() {
  const { cartItems, cartTotal, cartOpen, setCartOpen, updateQty } = useCart();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={() => setCartOpen(false)} />
      <div
        className="relative w-full sm:max-w-sm flex flex-col h-full sm:border-l"
        style={{ background: IVORY, borderColor: BORDER }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: BORDER }}>
          <span style={{ fontFamily: serif, fontSize: "1.1rem", color: INK }}>Your Selection</span>
          <button onClick={() => setCartOpen(false)} style={{ color: MUTED }} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag size={32} style={{ color: MUTED, opacity: 0.4 }} />
              <p style={{ color: MUTED, fontSize: "0.9rem" }}>Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="flex items-start gap-3 pb-4 border-b"
                  style={{ borderColor: BORDER }}
                >
                  <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden" style={{ background: CARD }}>
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div style={{ fontSize: "0.88rem", fontWeight: 500, color: INK, lineHeight: 1.3 }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: MUTED, marginTop: "2px" }}>{item.size}</div>
                    <div style={{ fontSize: "0.88rem", color: GOLD, marginTop: "4px" }}>
                      ${(item.price * item.qty).toLocaleString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateQty(item.id, item.size, -1)}
                      className="w-6 h-6 flex items-center justify-center border"
                      style={{ borderColor: BORDER, color: MUTED }}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={11} />
                    </button>
                    <span style={{ fontSize: "0.85rem", color: INK, minWidth: "16px", textAlign: "center" }}>
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.size, 1)}
                      className="w-6 h-6 flex items-center justify-center border"
                      style={{ borderColor: BORDER, color: MUTED }}
                      aria-label="Increase quantity"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="px-6 py-5 border-t" style={{ borderColor: BORDER }}>
            <div className="flex items-center justify-between mb-4">
              <span style={{ fontSize: "0.8rem", letterSpacing: "0.1em", color: MUTED, textTransform: "uppercase" }}>
                Total
              </span>
              <span style={{ fontFamily: serif, fontSize: "1.3rem", color: INK }}>
                ${cartTotal.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => redirectToStripeCheckout(cartItems.map((i) => ({ name: i.name, price: i.price, qty: i.qty, size: i.size })))}
              className="w-full py-4 text-sm font-semibold uppercase hover:opacity-85 transition-opacity"
              style={{ background: SAGE, color: "#fff", letterSpacing: "0.14em", fontFamily: sans }}
            >
              Proceed to Checkout
            </button>
            <p className="text-center mt-3" style={{ fontSize: "0.72rem", color: MUTED }}>
              Online checkout coming soon · admin@afuvai.com
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
