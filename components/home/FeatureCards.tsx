"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Headphones } from "lucide-react";
import Reveal from "@/components/Reveal";

export default function FeatureCards() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">More than a shop</p>
          <h2 className="mt-3 text-[34px] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[44px]">
            Advice you can trust, service that stays
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            We&apos;re not here for a single sale. We&apos;re the people you call
            when something breaks, slows down, or needs an upgrade.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Card 1 — mint */}
          <Reveal direction="left" className="overflow-hidden rounded-xl2 border border-white/70 bg-surface-mint p-8 shadow-soft sm:p-10">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="mt-5 text-[24px] font-extrabold tracking-[-0.01em] text-ink sm:text-[28px]">
              Honest, no-pressure advice
            </h3>
            <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted">
              Tell us your budget and what you actually need. We&apos;ll point
              you to the right product — never the most expensive one.
            </p>
            <div className="mt-7 rounded-2xl border border-white/80 bg-white/70 p-4 shadow-sm frosted">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-ink">Your budget</span>
                <span className="rounded-pill bg-surface-mint px-2.5 py-1 text-[12px] font-semibold text-emerald-700">Matched</span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-line">
                <div className="h-full w-3/4 rounded-full bg-emerald-400" />
              </div>
              <div className="mt-2 text-[12.5px] text-muted">Recommendation ready — 3 great options in your range.</div>
            </div>
            <Link href="/products" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink hover:gap-2.5 transition-all">
              See our products <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>

          {/* Card 2 — sky */}
          <Reveal direction="right" delay={0.1} className="overflow-hidden rounded-xl2 border border-white/70 bg-surface-sky p-8 shadow-soft sm:p-10">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-sm">
              <Headphones className="h-6 w-6 text-accent-deep" />
            </div>
            <h3 className="mt-5 text-[24px] font-extrabold tracking-[-0.01em] text-ink sm:text-[28px]">
              Walk-in support, always
            </h3>
            <p className="mt-3 max-w-md text-[16px] leading-relaxed text-muted">
              Something not working? Just walk in. Our in-house technicians
              handle repairs, upgrades and setup for any brand.
            </p>
            <div className="mt-7 space-y-2">
              {["Diagnostics while you wait", "Genuine parts & upgrades", "Annual maintenance plans"].map((t) => (
                <div key={t} className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/70 px-4 py-2.5 text-[14px] font-medium text-ink/80 shadow-sm frosted">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-accent">
                    <svg viewBox="0 0 24 24" className="h-3 w-3 text-ink" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  </span>
                  {t}
                </div>
              ))}
            </div>
            <Link href="/services" className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-ink hover:gap-2.5 transition-all">
              Explore our services <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
