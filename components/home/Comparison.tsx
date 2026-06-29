"use client";

import { Check, X } from "lucide-react";
import Reveal from "@/components/Reveal";
import { OLD_WAY, SRS_WAY } from "@/lib/site";

export default function Comparison() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container-x">
        <div className="mb-12 border-t border-line pt-12">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-[32px] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[42px]">
              Buying tech shouldn&apos;t be a gamble
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-muted">
              You shouldn&apos;t have to drive to the city or risk an online
              order. Compare the old way to the SRS way.
            </p>
          </Reveal>
        </div>

        <Reveal className="mx-auto max-w-4xl">
          <div className="grid gap-4 rounded-xl2 border border-line bg-white/70 p-4 shadow-soft frosted sm:grid-cols-2 sm:p-6">
            {/* Old way */}
            <div className="rounded-card bg-surface-rose/60 p-6">
              <span className="inline-block rounded-pill bg-rose-100 px-3 py-1 text-[13px] font-semibold text-rose-700">
                The old way
              </span>
              <ul className="mt-5 space-y-3.5">
                {OLD_WAY.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-rose-200">
                      <X className="h-3 w-3 text-rose-700" strokeWidth={3} />
                    </span>
                    <span className="text-[15px] leading-snug text-ink/70">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SRS way */}
            <div className="rounded-card bg-surface-green/70 p-6">
              <span className="inline-block rounded-pill bg-emerald-100 px-3 py-1 text-[13px] font-semibold text-emerald-700">
                The SRS way
              </span>
              <ul className="mt-5 space-y-3.5">
                {SRS_WAY.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-200">
                      <Check className="h-3 w-3 text-emerald-700" strokeWidth={3} />
                    </span>
                    <span className="text-[15px] font-medium leading-snug text-ink">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
