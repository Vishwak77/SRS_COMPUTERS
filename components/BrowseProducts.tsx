"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CATEGORIES, type Product } from "@/lib/catalogue";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const VALID = new Set(["all", ...CATEGORIES.map((c) => c.key)]);

export default function BrowseProducts() {
  const params = useSearchParams();
  const [active, setActive] = useState<string>("all");
  const [selected, setSelected] = useState<{ product: Product; cat: string } | null>(null);

  // Deep-link support: /products?cat=cctv activates that filter.
  useEffect(() => {
    const cat = params.get("cat");
    if (cat && VALID.has(cat)) setActive(cat);
  }, [params]);

  const visible =
    active === "all"
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.key === active);

  const totalCount = CATEGORIES.reduce((n, c) => n + c.products.length, 0);

  return (
    <div>
      {/* Filter bar */}
      <div className="sticky top-[84px] z-30 -mx-2 mb-10 px-2">
        <div className="relative">
          <div className="no-scrollbar flex items-center gap-2 overflow-x-auto rounded-pill border border-white/70 bg-white/75 p-2 pr-8 shadow-soft frosted scroll-px-2 [scrollbar-width:none]">
            <FilterPill
              label="All"
              count={totalCount}
              active={active === "all"}
              onClick={() => setActive("all")}
            />
            {CATEGORIES.map((c) => (
              <FilterPill
                key={c.key}
                label={c.label}
                count={c.products.length}
                active={active === c.key}
                onClick={() => setActive(c.key)}
              />
            ))}
          </div>
          {/* right fade hint that more categories scroll into view */}
          <div className="pointer-events-none absolute inset-y-1 right-1 w-12 rounded-r-pill bg-gradient-to-l from-white/90 to-transparent" />
        </div>
      </div>

      {/* Category sections */}
      <div className="space-y-16">
        {visible.map((cat) => (
          <section key={cat.key} id={cat.key} className="scroll-mt-40">
            <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-[26px] font-extrabold tracking-[-0.01em] text-ink sm:text-[32px]">
                  {cat.label}
                </h2>
                <p className="mt-1 max-w-xl text-[15px] text-muted">
                  {cat.blurb}
                </p>
              </div>
              <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted-light">
                {cat.products.length} products
              </span>
            </div>

            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
              >
                {cat.products.map((p, i) => (
                  <motion.div
                    key={p.name + p.brand}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.45,
                      delay: (i % 4) * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ProductCard
                      product={p}
                      onClick={() => setSelected({ product: p, cat: cat.label })}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </section>
        ))}
      </div>

      <ProductModal
        product={selected?.product ?? null}
        categoryLabel={selected?.cat}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

function FilterPill({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative shrink-0 rounded-pill px-4 py-2 text-[14px] font-semibold transition-colors ${
        active ? "text-white" : "text-ink/70 hover:text-ink"
      }`}
    >
      {active && (
        <motion.span
          layoutId="filter-pill"
          className="absolute inset-0 rounded-pill bg-ink"
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
        />
      )}
      <span className="relative">
        {label}
        <span className={`ml-1.5 text-[12px] ${active ? "text-white/60" : "text-muted-light"}`}>
          {count}
        </span>
      </span>
    </button>
  );
}
