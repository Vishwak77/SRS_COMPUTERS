"use client";

import { Star } from "lucide-react";
import { BRANDS } from "@/lib/site";

export default function LogoMarquee() {
  const row = [...BRANDS, ...BRANDS]; // duplicate for seamless loop
  return (
    <section className="relative py-10">
      <div className="container-x">
        <div className="mb-7 flex items-center justify-center gap-2 text-[12.5px] uppercase tracking-[0.14em] text-muted-light">
          <span className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
          </span>
          <span className="font-semibold text-muted">5.0</span>
          <span>·</span>
          <span>Trusted brands we stock & service</span>
        </div>

        {/* Marquee with edge fades */}
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f4fafb] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f4fafb] to-transparent" />
          <div className="flex w-max animate-marquee items-center gap-14 pr-14">
            {row.map((brand, i) => (
              <span
                key={i}
                className="select-none whitespace-nowrap text-[26px] font-extrabold tracking-tight text-ink/30 transition-colors hover:text-ink/60"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
