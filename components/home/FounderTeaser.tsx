"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Quote } from "lucide-react";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export default function FounderTeaser() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-5xl overflow-hidden rounded-xl2 border border-white/70 bg-white/80 shadow-card frosted">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            {/* Copy */}
            <div className="p-8 sm:p-12">
              <p className="eyebrow">Meet the founder</p>
              <Quote className="mt-5 h-8 w-8 text-accent" />
              <p className="mt-4 text-[22px] font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[26px]">
                “We started SRS to give Perambalur a place where buying
                technology feels simple and honest — where you&apos;re treated
                like a neighbour, not a number.”
              </p>
              <div className="mt-6">
                <div className="text-[15px] font-bold text-ink">
                  {SITE.founder} · Founder
                </div>
                <div className="text-[14px] text-muted">
                  SRS Computers, Perambalur
                </div>
              </div>
              <Link
                href="/about"
                className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink hover:gap-2.5 transition-all"
              >
                Read our story <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Founder portrait */}
            <div className="relative min-h-[300px] bg-gradient-to-br from-surface-sky to-surface-mint">
              <div className="absolute inset-0 grid place-items-center p-8">
                <div className="relative h-40 w-40 overflow-hidden rounded-full bg-white shadow-card ring-4 ring-white">
                  <Image
                    src="/founder.jpeg"
                    alt={`${SITE.founder}, founder of SRS Computers`}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="absolute bottom-4 left-4 rounded-pill bg-white/80 px-3 py-1.5 text-[12.5px] font-medium text-ink shadow-sm frosted">
                Serving since {SITE.foundedYear}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
