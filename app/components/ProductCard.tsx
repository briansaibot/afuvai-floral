"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/app/context/WishlistContext";
import { useCart } from "@/app/context/CartContext";
import { toast } from "sonner";
import { BORDER, CARD, GOLD, INK, MUTED, SAGE, serif, sans } from "@/lib/constants";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const wishlisted = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    const defaultSize = product.sizes[1] ?? product.sizes[0];
    addToCart(
      { id: product.id, name: product.name, price: product.price, img: product.img },
      defaultSize.label,
      defaultSize.price
    );
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="group border" style={{ borderColor: BORDER, background: product.whiteBg ? "#fff" : CARD }}>
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block relative overflow-hidden" style={{ aspectRatio: "4/5", background: product.whiteBg ? "#fff" : CARD }}>
        <Image
          src={product.img}
          alt={`${product.name} — ${product.category} floral arrangement by Afuvai Floral Society`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          loading="lazy"
        />
        {product.tag && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
            style={{ background: SAGE, color: "#fff", letterSpacing: "0.1em" }}
          >
            {product.tag}
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: "rgba(250,248,243,0.9)" }}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart size={14} style={{ color: wishlisted ? "#c0392b" : MUTED, fill: wishlisted ? "#c0392b" : "none" }} />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4">
        <div style={{ fontSize: "0.62rem", letterSpacing: "0.18em", color: MUTED, textTransform: "uppercase", marginBottom: "0.3rem" }}>
          {product.category}
        </div>
        <Link href={`/product/${product.id}`}>
          <h3
            style={{ fontFamily: serif, fontSize: "1rem", fontWeight: 500, color: INK, lineHeight: 1.25, marginBottom: "0.4rem" }}
            className="hover:text-[#5A6B54] transition-colors"
          >
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between gap-2">
          <span style={{ fontFamily: serif, fontSize: "1.1rem", color: GOLD }}>
            From ${product.sizes[0].price}
          </span>
          <button
            onClick={handleQuickAdd}
            className="px-3 py-1.5 text-xs font-semibold uppercase border hover:opacity-80 transition-opacity"
            style={{ borderColor: SAGE, color: SAGE, letterSpacing: "0.08em", fontFamily: sans }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
