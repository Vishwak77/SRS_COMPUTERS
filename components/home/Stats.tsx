"use client";

import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import { STATS } from "@/lib/site";

export default function Stats() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Why Perambalur shops with us</p>
          <h2 className="mt-3 text-[34px] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[44px]">
            A name the town has trusted for years
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            From first laptops to full office fit-outs, families and businesses
            across the district come back to SRS — and bring their friends.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.1}
              className="rounded-card border border-white/70 bg-white/80 p-8 text-center shadow-soft frosted"
            >
              <div className="text-[48px] font-extrabold leading-none tracking-tight text-ink sm:text-[56px]">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-3 text-[15px] font-medium text-muted">
                {stat.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
