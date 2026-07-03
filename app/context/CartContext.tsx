"use client";

import { createContext, useContext, useState, useCallback } from "react";
import type { CartItem } from "@/lib/types";

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: { id: number; name: string; price: number; img: string }, size: string, price: number) => void;
  updateQty: (id: number, size: string, delta: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = useCallback(
    (product: { id: number; name: string; price: number; img: string }, size: string, price: number) => {
      setCartItems((prev) => {
        const ex = prev.find((i) => i.id === product.id && i.size === size);
        if (ex) return prev.map((i) => (i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i));
        return [...prev, { id: product.id, name: product.name, price, qty: 1, img: product.img, size }];
      });
      setCartOpen(true);
    },
    []
  );

  const updateQty = useCallback((id: number, size: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id && i.size === size ? { ...i, qty: i.qty + delta } : i)).filter((i) => i.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, cartTotal, cartOpen, setCartOpen, addToCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
