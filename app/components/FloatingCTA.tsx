"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartContext";
import { SAGE, serif } from "@/lib/constants";

export function FloatingCTA() {
  const [show, setShow] = useState(false);
  const { cartCount, setCartOpen } = useCart();

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => setCartOpen(true)}
      className="fixed bottom-6 right-6 z-40 px-5 py-3 shadow-lg hover:opacity-90 transition-all"
      style={{ background: SAGE, color: "#fff", fontFamily: serif, fontSize: "0.85rem", letterSpacing: "0.06em" }}
      aria-label="Open cart"
    >
      {cartCount > 0 ? `Cart · ${cartCount}` : "Order Now"}
    </button>
  );
}
