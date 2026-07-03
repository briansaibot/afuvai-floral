"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { BORDER, CARD, GOLD, INK, MUTED, OCCASIONS, SAGE, sans, serif } from "@/lib/constants";
import { PRODUCTS } from "@/lib/constants";
import type { Product } from "@/lib/types";

interface ProductGridProps {
  initialOccasion?: string;
}

export function ProductGrid({ initialOccasion = "All" }: ProductGridProps) {
  const [activeOccasion, setActiveOccasion] = useState(initialOccasion);
  const [sortBy, setSortBy] = useState("default");

  const filtered = (() => {
    const base = activeOccasion === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeOccasion);
    if (sortBy === "price-asc") return [...base].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return [...base].sort((a, b) => b.price - a.price);
    if (sortBy === "name-az") return [...base].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "new") return [...base].sort((a, b) => (b.tag === "New" ? 1 : 0) - (a.tag === "New" ? 1 : 0));
    return base;
  })();

  return (
    <div id="collections">
      {/* Filters */}
      <div
        className="flex items-center justify-between gap-4 flex-wrap mb-6 pb-4 border-b"
        style={{ borderColor: BORDER }}
      >
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((occ) => (
            <button
              key={occ}
              onClick={() => setActiveOccasion(occ)}
              className="px-4 py-1.5 text-xs font-medium uppercase transition-all"
              style={{
                letterSpacing: "0.1em",
                background: activeOccasion === occ ? INK : "transparent",
                color: activeOccasion === occ ? "#fff" : MUTED,
                border: `1px solid ${activeOccasion === occ ? INK : BORDER}`,
                fontFamily: sans,
              }}
            >
              {occ}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1.5 text-xs border outline-none"
          style={{ background: CARD, borderColor: BORDER, color: MUTED, fontFamily: sans }}
          aria-label="Sort products"
        >
          <option value="default">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-az">Name: A–Z</option>
          <option value="new">Newest First</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <p className="mt-6 text-center" style={{ fontSize: "0.8rem", color: MUTED }}>
        Showing {filtered.length} arrangement{filtered.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
