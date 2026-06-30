"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Search, Star, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { CATEGORIES } from "@/lib/catalogue";

const CHIPS: { label: string; cat: string }[] = [
  { label: "Laptops", cat: "laptops" },
  { label: "Desktops", cat: "desktops" },
  { label: "CCTV", cat: "cctv" },
  { label: "Printers", cat: "printers" },
  { label: "Accessories", cat: "accessories" },
  { label: "Networking", cat: "networking" },
  { label: "Storage", cat: "storage" },
  { label: "UPS & Power", cat: "power" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Hero() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Flatten all products for dropdown search
  const allProducts = useMemo(
    () =>
      CATEGORIES.flatMap((c) =>
        c.products.map((p) => ({ product: p, catKey: c.key, catLabel: c.label }))
      ),
    []
  );

  const dropdownResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allProducts
      .filter(
        ({ product: p }) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [query, allProducts]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      setOpen(false);
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      setOpen(false);
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative pt-12 sm:pt-16">
      <div className="container-x">
        {/* App-store style sub-pill */}
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="show"
          className="mx-auto flex w-fit items-center gap-2 rounded-pill border border-white/70 bg-white/80 px-4 py-1.5 text-[13.5px] font-medium text-ink shadow-soft frosted"
        >
          <MapPin className="h-4 w-4 text-accent-deep" />
          Serving Perambalur & nearby towns
          <ArrowRight className="h-3.5 w-3.5 text-muted" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="show"
          className="mx-auto mt-6 max-w-4xl text-center text-[40px] font-extrabold leading-[1.04] tracking-[-0.02em] text-ink sm:text-[58px] lg:text-[68px]"
        >
          Every computer & electronics
          <br className="hidden sm:block" /> need, sorted by{" "}
          <span className="relative whitespace-nowrap text-accent-deep">
            real people
            <svg
              viewBox="0 0 220 12"
              className="absolute -bottom-1 left-0 w-full text-accent"
              fill="none"
            >
              <path
                d="M2 9C60 3 160 3 218 8"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </motion.h1>

        {/* Trust row */}
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          animate="show"
          className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[14px] text-muted"
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                />
              ))}
            </span>
            Loved locally
          </span>
          <span className="text-line">•</span>
          <span>Since 2009 in Perambalur</span>
          <span className="text-line">•</span>
          <span>{SITE.hours}</span>
        </motion.div>

        {/* Search card */}
        <motion.div
          ref={containerRef}
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate="show"
          className="relative mx-auto mt-8 max-w-2xl"
        >
          <div className="rounded-card border border-white/70 bg-white/90 p-3 shadow-card frosted">
            <div className="flex items-center gap-3 px-3 py-3">
              <Search className="h-5 w-5 shrink-0 text-muted" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpen(true);
                }}
                onFocus={() => query && setOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder='What are you looking for? — e.g. "gaming laptop"'
                className="flex-1 bg-transparent text-[16px] text-ink placeholder:text-muted outline-none"
              />
              {query && (
                <button
                  onClick={() => { setQuery(""); setOpen(false); inputRef.current?.focus(); }}
                  className="text-muted hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex items-center justify-between gap-2 px-1 pb-1">
              <span className="px-2 text-[12.5px] text-muted-light">
                We&apos;ll help you find it in-store
              </span>
              <button onClick={handleSearch} className="btn-dark">
                Search <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Live dropdown */}
          <AnimatePresence>
            {open && dropdownResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-card border border-white/70 bg-white shadow-card"
              >
                {dropdownResults.map(({ product: p, catLabel }, i) => (
                  <Link
                    key={p.name + p.brand + i}
                    href={`/products?search=${encodeURIComponent(p.name)}`}
                    onClick={() => { setOpen(false); setQuery(""); }}
                    className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-card"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[14px] font-semibold text-ink">
                        {p.brand} {p.name}
                      </div>
                      <div className="text-[12px] text-muted">{catLabel}</div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted" />
                  </Link>
                ))}
                <div className="border-t border-line px-4 py-2.5">
                  <button
                    onClick={handleSearch}
                    className="text-[13px] font-semibold text-accent-deep hover:underline"
                  >
                    See all results for &ldquo;{query}&rdquo; →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Suggestion chips — deep-link to category */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate="show"
          className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2"
        >
          {CHIPS.map((chip) => (
            <Link
              key={chip.cat}
              href={`/products?cat=${chip.cat}`}
              className="rounded-pill border border-white/70 bg-white/70 px-3.5 py-1.5 text-[13.5px] font-medium text-ink/80 shadow-sm transition-all hover:bg-white hover:shadow-soft"
            >
              {chip.label}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
