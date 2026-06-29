"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/catalogue";

export default function ProductCard({
  product,
  onClick,
}: {
  product: Product;
  onClick?: () => void;
}) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full overflow-hidden rounded-card border border-white/70 bg-white/85 text-left shadow-soft frosted transition-all duration-300 hover:-translate-y-1 hover:shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
      {/* Image area */}
      <div className="relative aspect-square overflow-hidden bg-surface-card">
        {imgOk ? (
          <Image
            src={product.image}
            alt={`${product.brand} ${product.name}`}
            fill
            unoptimized
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-5 transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgOk(false)}
          />
        ) : (
          // Styled placeholder if the image is missing/failed
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface-sky to-surface-mint p-4 text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent-deep">
              {product.brand}
            </span>
            <span className="text-[14px] font-semibold leading-snug text-ink/60">
              {product.name}
            </span>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-pill bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-ink shadow-sm frosted">
          {product.brand}
        </span>
      </div>

      {/* Details */}
      <div className="p-4">
        <h3 className="text-[15.5px] font-bold leading-tight text-ink">
          {product.name}
        </h3>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted line-clamp-2">
          {product.desc}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-semibold text-accent-deep opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          View details
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </button>
  );
}
