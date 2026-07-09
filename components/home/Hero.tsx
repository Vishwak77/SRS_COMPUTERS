"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";
import { SITE } from "@/lib/site";
import GalleryMarquee from "./GalleryMarquee";

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
  return (
    <section className="relative pt-5 sm:pt-7">
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
          className="mx-auto mt-5 max-w-4xl text-center text-[34px] font-extrabold leading-[1.04] tracking-[-0.02em] text-ink sm:text-[48px] lg:text-[56px]"
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
          className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[14px] text-muted"
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

        {/* Suggestion chips — deep-link to category */}
        <motion.div
          variants={fadeUp}
          custom={3}
          initial="hidden"
          animate="show"
          className="mx-auto mt-5 flex max-w-4xl flex-wrap items-center justify-center gap-2"
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

      {/* Store photo loop — the hero's centrepiece, full-bleed */}
      <motion.div
        variants={fadeUp}
        custom={4}
        initial="hidden"
        animate="show"
        className="mt-7"
      >
        <GalleryMarquee />
      </motion.div>
    </section>
  );
}
