"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";
import { CATEGORIES } from "@/lib/catalogue";

export default function SearchBar({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const submit = () => {
    if (query.trim()) {
      setOpen(false);
      inputRef.current?.blur();
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
    if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex items-center gap-2 rounded-pill bg-ink/[0.04] px-3 py-1.5 ring-1 ring-transparent transition-all focus-within:bg-white focus-within:ring-line">
        <Search className="h-4 w-4 shrink-0 text-muted" />
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
          placeholder="Search…"
          aria-label="Search products"
          className="w-full bg-transparent text-[14px] text-ink placeholder:text-muted outline-none"
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setOpen(false);
              inputRef.current?.focus();
            }}
            aria-label="Clear search"
            className="text-muted hover:text-ink"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && dropdownResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full z-50 mt-2 min-w-[280px] overflow-hidden rounded-card border border-white/70 bg-white shadow-card"
          >
            {dropdownResults.map(({ product: p, catLabel }, i) => (
              <Link
                key={p.name + p.brand + i}
                href={`/products?search=${encodeURIComponent(p.name)}`}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
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
                onClick={submit}
                className="text-[13px] font-semibold text-accent-deep hover:underline"
              >
                See all results for &ldquo;{query}&rdquo; →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
