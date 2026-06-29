"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Search, Star } from "lucide-react";
import { SITE } from "@/lib/site";

const CHIPS = [
  "Laptops",
  "Desktops",
  "CCTV",
  "Printers",
  "Accessories",
  "Repairs",
  "Networking",
  "Custom PCs",
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

        {/* Search-style hero card (echoes the reference prompt card) */}
        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate="show"
          className="mx-auto mt-8 max-w-2xl rounded-card border border-white/70 bg-white/90 p-3 shadow-card frosted"
        >
          <div className="flex items-center gap-3 px-3 py-3">
            <Search className="h-5 w-5 shrink-0 text-muted" />
            <span className="flex-1 text-left text-[16px] text-muted">
              What are you looking for today? — e.g. “gaming laptop under ₹60k”
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 px-1 pb-1">
            <span className="px-2 text-[12.5px] text-muted-light">
              We&apos;ll help you find it in-store
            </span>
            <Link href="/products" className="btn-dark">
              Browse products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {/* Suggestion chips */}
        <motion.div
          variants={fadeUp}
          custom={4}
          initial="hidden"
          animate="show"
          className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2"
        >
          {CHIPS.map((chip) => (
            <Link
              key={chip}
              href="/products"
              className="rounded-pill border border-white/70 bg-white/70 px-3.5 py-1.5 text-[13.5px] font-medium text-ink/80 shadow-sm transition-all hover:bg-white hover:shadow-soft"
            >
              {chip}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
