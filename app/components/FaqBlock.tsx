"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { BORDER, INK, MUTED, serif } from "@/lib/constants";
import type { FaqItem } from "@/lib/types";

interface FaqBlockProps {
  items: FaqItem[];
}

export function FaqBlock({ items }: FaqBlockProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {items.map((faq, i) => (
        <div key={i} className="border-b" style={{ borderColor: BORDER }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left gap-4"
            aria-expanded={open === i}
          >
            <span style={{ fontFamily: serif, fontSize: "1.05rem", color: INK }}>{faq.q}</span>
            <ChevronDown
              size={15}
              style={{
                color: MUTED,
                flexShrink: 0,
                transform: open === i ? "rotate(180deg)" : "none",
                transition: "transform 0.25s",
              }}
            />
          </button>
          {open === i && (
            <div className="pb-5 pr-6" style={{ color: MUTED, lineHeight: 1.8, fontSize: "0.97rem" }}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
