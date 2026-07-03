"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Heart, Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";
import { ProductCard } from "@/app/components/ProductCard";
import { PRODUCTS, ADDONS, BORDER, BORDER_G, CARD, GOLD, INK, IVORY, MUTED, SAGE, serif, sans } from "@/lib/constants";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = PRODUCTS.find((p) => p.id === Number(id));
  if (!product) notFound();

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const [selectedSize, setSelectedSize] = useState(product.sizes[1] ?? product.sizes[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [qty, setQty] = useState(1);

  const toggleAddon = (id: string) =>
    setSelectedAddons((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const addonTotal = selectedAddons.reduce((sum, id) => {
    const a = ADDONS.find((a) => a.id === id);
    return sum + (a?.price ?? 0);
  }, 0);

  const totalPrice = (selectedSize.price + addonTotal) * qty;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(
        { id: product.id, name: product.name, price: selectedSize.price, img: product.img },
        selectedSize.label,
        selectedSize.price
      );
    }
    toast.success(`${product.name} (${selectedSize.label}) added to cart`);
  };

  const paired = product.pairedProductId ? PRODUCTS.find((p) => p.id === product.pairedProductId) : null;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-[88px] min-h-screen" style={{ background: IVORY }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8" style={{ fontSize: "0.78rem", color: MUTED }}>
          <Link href="/" style={{ color: MUTED }} className="hover:opacity-70 transition-opacity">Home</Link>
          <span>/</span>
          <Link href="/#collections" style={{ color: MUTED }} className="hover:opacity-70 transition-opacity">Collections</Link>
          <span>/</span>
          <span style={{ color: INK }}>{product.name}</span>
        </nav>

        {/* Product detail */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Image */}
          <div className="relative overflow-hidden border" style={{ borderColor: BORDER, background: product.whiteBg ? "#fff" : CARD, aspectRatio: "4/5" }}>
            <Image
              src={product.img}
              alt={`${product.name} — ${product.category} floral arrangement by Afuvai Floral Society, Las Vegas`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.tag && (
              <span
                className="absolute top-4 left-4 px-3 py-1.5 text-[10px] font-semibold uppercase"
                style={{ background: SAGE, color: "#fff", letterSpacing: "0.1em" }}
              >
                {product.tag}
              </span>
            )}
          </div>

          {/* Details */}
          <div>
            <p style={{ fontSize: "0.68rem", letterSpacing: "0.2em", color: MUTED, textTransform: "uppercase", marginBottom: "0.5rem" }}>
              {product.category}
            </p>
            <h1 style={{ fontFamily: serif, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 500, color: INK, lineHeight: 1.1, marginBottom: "0.8rem" }}>
              {product.name}
            </h1>
            <p style={{ fontFamily: serif, fontSize: "1.8rem", color: GOLD, marginBottom: "1.5rem" }}>
              From ${selectedSize.price}
            </p>
            <p style={{ color: MUTED, lineHeight: 1.85, fontSize: "0.97rem", marginBottom: "2rem" }}>
              {product.desc}
            </p>

            {/* Size */}
            <div className="mb-5">
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", color: INK, textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 500 }}>
                Size
              </p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size)}
                    className="flex flex-col items-center px-5 py-3 border transition-all"
                    style={{
                      borderColor: selectedSize.label === size.label ? INK : BORDER,
                      background: selectedSize.label === size.label ? INK : "transparent",
                      color: selectedSize.label === size.label ? "#fff" : INK,
                    }}
                  >
                    <span style={{ fontSize: "0.88rem", fontWeight: 500 }}>{size.label}</span>
                    <span style={{ fontSize: "0.78rem", opacity: 0.75 }}>${size.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add-ons */}
            <div className="mb-6">
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", color: INK, textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 500 }}>
                Add-ons (Optional)
              </p>
              <div className="grid grid-cols-2 gap-2">
                {ADDONS.map((addon) => {
                  const selected = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className="flex items-center gap-3 p-3 border text-left transition-all"
                      style={{
                        borderColor: selected ? SAGE : BORDER,
                        background: selected ? "rgba(90,107,84,0.06)" : "transparent",
                      }}
                    >
                      {selected ? (
                        <div className="w-4 h-4 flex items-center justify-center flex-shrink-0" style={{ background: SAGE }}>
                          <Check size={10} style={{ color: "#fff" }} />
                        </div>
                      ) : (
                        <div className="w-4 h-4 border flex-shrink-0" style={{ borderColor: BORDER }} />
                      )}
                      <div>
                        <div style={{ fontSize: "0.8rem", fontWeight: 500, color: INK }}>{addon.label}</div>
                        <div style={{ fontSize: "0.72rem", color: MUTED }}>+${addon.price}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Qty + CTA */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center border" style={{ borderColor: BORDER }}>
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-3 hover:opacity-60 transition-opacity"
                  style={{ color: MUTED }}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-4 py-3" style={{ fontSize: "0.95rem", color: INK, minWidth: "40px", textAlign: "center" }}>
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-3 hover:opacity-60 transition-opacity"
                  style={{ color: MUTED }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <div style={{ fontFamily: serif, fontSize: "1.2rem", color: GOLD }}>
                ${totalPrice.toLocaleString()}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 text-base font-semibold uppercase hover:opacity-85 transition-opacity"
                style={{ background: SAGE, color: "#fff", letterSpacing: "0.1em" }}
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="px-4 py-4 border hover:opacity-70 transition-opacity"
                style={{ borderColor: BORDER, color: wishlisted ? "#c0392b" : MUTED }}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={18} style={{ fill: wishlisted ? "#c0392b" : "none" }} />
              </button>
            </div>

            <p className="mt-4 text-center" style={{ fontSize: "0.78rem", color: MUTED }}>
              Same-day delivery available · hello@afuvai.com
            </p>

            {/* Paired product */}
            {paired && (
              <div className="mt-6 p-4 border" style={{ borderColor: BORDER_G, background: CARD }}>
                <p style={{ fontSize: "0.68rem", letterSpacing: "0.16em", color: GOLD, textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  Also available
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 flex-shrink-0 overflow-hidden" style={{ background: "#fff" }}>
                    <Image src={paired.img} alt={paired.name} fill className="object-contain" sizes="56px" />
                  </div>
                  <div className="flex-1">
                    <div style={{ fontSize: "0.88rem", fontWeight: 500, color: INK }}>{paired.name}</div>
                    <div style={{ fontSize: "0.8rem", color: MUTED }}>From ${paired.sizes[0].price}</div>
                  </div>
                  <Link
                    href={`/product/${paired.id}`}
                    className="px-4 py-2 border text-xs font-semibold uppercase hover:opacity-80 transition-opacity"
                    style={{ borderColor: INK, color: INK, letterSpacing: "0.08em" }}
                  >
                    View →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="border-t pt-12" style={{ borderColor: BORDER }}>
            <div className="flex items-center justify-between mb-6">
              <h2 style={{ fontFamily: serif, fontSize: "1.4rem", color: INK }}>More in {product.category}</h2>
              <Link href="/#collections" style={{ fontSize: "0.82rem", color: SAGE }} className="hover:opacity-70 transition-opacity">
                View all <ArrowRight size={12} className="inline ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
