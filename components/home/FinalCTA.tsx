"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Cpu, Camera, Printer, HardDrive, Mouse, Wifi } from "lucide-react";
import { SITE } from "@/lib/site";

const FLOATERS = [
  { Icon: Cpu, className: "left-[6%] top-[18%]", delay: 0 },
  { Icon: Camera, className: "right-[8%] top-[12%]", delay: 0.6 },
  { Icon: Printer, className: "left-[12%] bottom-[16%]", delay: 1.2 },
  { Icon: HardDrive, className: "right-[10%] bottom-[20%]", delay: 0.3 },
  { Icon: Mouse, className: "left-[22%] top-[44%]", delay: 0.9 },
  { Icon: Wifi, className: "right-[20%] top-[48%]", delay: 1.5 },
];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Floating product icons */}
      {FLOATERS.map(({ Icon, className, delay }, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none absolute hidden md:block ${className}`}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="grid h-16 w-16 place-items-center rounded-2xl border border-white/70 bg-white/70 shadow-soft frosted">
            <Icon className="h-7 w-7 text-ink/40" strokeWidth={1.4} />
          </div>
        </motion.div>
      ))}

      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto max-w-2xl rounded-card border border-white/70 bg-white/85 px-8 py-12 text-center shadow-card frosted sm:px-12"
        >
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-ink">
            <svg viewBox="0 0 24 24" className="h-7 w-7 text-accent" fill="currentColor"><path d="M13 2 4.5 13.2c-.4.5 0 1.3.7 1.3H11l-1 7.5c-.1.8.9 1.2 1.4.5L20 11.3c.4-.5 0-1.3-.7-1.3H13l1-7.5c.1-.8-.9-1.2-1.4-.5Z"/></svg>
          </div>
          <p className="mt-6 eyebrow">Drop by today</p>
          <h2 className="mt-3 text-[34px] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[44px]">
            Come see it for yourself
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[17px] leading-relaxed text-muted">
            Visit our Perambalur showroom, or give us a call. We&apos;re happy to
            help you find exactly what you need.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-accent w-full sm:w-auto">
              Get directions <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${SITE.phone}`}
              className="btn-ghost w-full sm:w-auto"
            >
              <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
            </a>
          </div>
          <p className="mt-4 text-[13px] text-muted-light">
            {SITE.hours} · No appointment needed
          </p>
        </motion.div>
      </div>
    </section>
  );
}
