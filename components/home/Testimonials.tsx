"use client";

import { Star, Quote } from "lucide-react";
import Reveal from "@/components/Reveal";
import { TESTIMONIALS } from "@/lib/site";

export default function Testimonials() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Word of mouth</p>
          <h2 className="mt-3 text-[32px] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[44px]">
            What Perambalur says about us
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            Most of our customers come from a friend&apos;s recommendation —
            here&apos;s why.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={t.name}
              delay={(i % 2) * 0.1}
              direction={i % 2 === 0 ? "left" : "right"}
              className="relative overflow-hidden rounded-card border border-white/70 bg-white/85 p-7 shadow-soft frosted"
            >
              <Quote className="h-7 w-7 text-accent" />
              <div className="mt-3 flex">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-[16.5px] leading-relaxed text-ink/90">
                “{t.quote}”
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-surface-sky to-surface-mint text-[18px] font-bold text-ink/70">
                  {t.initials}
                </div>
                <div>
                  <div className="text-[14.5px] font-bold text-ink">{t.name}</div>
                  <div className="text-[13px] text-muted">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
