"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { CATEGORIES, type Product } from "@/lib/catalogue";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

const VALID = new Set(["all", ...CATEGORIES.map((c) => c.key)]);

export default function BrowseProducts() {
  const params = useSearchParams();
  const [active, setActive] = useState<string>("all");
  const [selected, setSelected] = useState<{ product: Product; cat: string } | null>(null);

  const searchQuery = params.get("search") ?? "";

  // Lenis owns scrolling (root), so scroll through its instance. Keep the latest
  // instance in a ref so the scroll effect can depend only on `active`.
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  const firstRun = useRef(true);

  // Deep-link support: /products?cat=cctv activates that filter.
  useEffect(() => {
    const cat = params.get("cat");
    if (cat && VALID.has(cat)) setActive(cat);
  }, [params]);

  // When the category changes (filter pill, nav menu, or a /products?cat= link),
  // bring the top of the selected section into view instead of leaving the user
  // stranded wherever they were scrolled. Skip the initial mount so a plain
  // /products visit is left at the top naturally.
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const l = lenisRef.current;
    // Gap below the sticky nav + filter bar (matches the sections' scroll-mt-40).
    const GAP = 150;
    // Let the filtered list settle (sections unmount) before measuring so the
    // target section lands right under the sticky filter bar.
    const t = setTimeout(() => {
      if (active === "all") {
        if (l) l.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const el = document.getElementById(active);
      if (!el) return;
      // Absolute document position — reliable regardless of offset-parent.
      const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY - GAP);
      if (l) l.scrollTo(y);
      else window.scrollTo({ top: y, behavior: "smooth" });
    }, 120);
    return () => clearTimeout(t);
  }, [active]);

  const totalCount = CATEGORIES.reduce((n, c) => n + c.products.length, 0);

  // Cross-category search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    const hits: { product: Product; catLabel: string; catKey: string }[] = [];
    for (const cat of CATEGORIES) {
      for (const p of cat.products) {
        if (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q)
        ) {
          hits.push({ product: p, catLabel: cat.label, catKey: cat.key });
        }
      }
    }
    return hits;
  }, [searchQuery]);

  const visible =
    active === "all"
      ? CATEGORIES
      : CATEGORIES.filter((c) => c.key === active);

  if (searchResults) {
    return (
      <div>
        {/* Search results header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted-light">
              Search results
            </p>
            <h2 className="mt-1 text-[26px] font-extrabold tracking-[-0.01em] text-ink sm:text-[32px]">
              {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for &ldquo;{searchQuery}&rdquo;
            </h2>
          </div>
          <a
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-white px-4 py-2 text-[13.5px] font-semibold text-ink shadow-sm transition-all hover:bg-surface-card"
          >
            <X className="h-3.5 w-3.5" /> Clear search
          </a>
        </div>

        {searchResults.length === 0 ? (
          <div className="py-20 text-center text-muted">
            <p className="text-[18px] font-semibold text-ink">No products found</p>
            <p className="mt-2 text-[15px]">Try a different search term or browse by category below.</p>
            <a href="/products" className="btn-dark mt-6 inline-flex">Browse all products</a>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {searchResults.map(({ product: p, catLabel, catKey }, i) => (
                <motion.div
                  key={p.name + p.brand + catKey}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard
                    product={p}
                    onClick={() => setSelected({ product: p, cat: catLabel })}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        <ProductModal
          product={selected?.product ?? null}
          categoryLabel={selected?.cat}
          onClose={() => setSelected(null)}
        />
      </div>
    );
  }

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
