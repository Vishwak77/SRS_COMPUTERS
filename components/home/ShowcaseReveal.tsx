"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const SHELF = [
  { image: "/products/laptop-hp-victus-15.jpg", name: "Gaming Laptops", spec: "Latest GPUs · high-refresh", tint: "bg-surface-sky", href: "/products?cat=laptops" },
  { image: "/products/desktop-srs-gaming.jpg", name: "Custom Desktops", spec: "Built to your budget", tint: "bg-surface-mint", href: "/products?cat=desktops" },
  { image: "/products/cctv-hikvision-colorvu-bullet.jpg", name: "CCTV Kits", spec: "HD · night vision · install", tint: "bg-surface-sky", href: "/products?cat=cctv" },
  { image: "/products/printer-canon-g3012.jpg", name: "Printers & Ink", spec: "Print · scan · copy · Wi-Fi", tint: "bg-surface-mint", href: "/products?cat=printers" },
];

export default function ShowcaseReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);

  return (
    <section ref={ref} className="relative -mt-2 pb-20 pt-16 sm:pb-28">
      <motion.div
        style={{ y, scale, opacity }}
        className="container-x"
      >
        <div className="mx-auto max-w-5xl overflow-hidden rounded-card border border-white/70 bg-white/95 shadow-card frosted">
          {/* Mock toolbar */}
          <div className="flex items-center justify-between border-b border-line px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 hidden text-[13px] font-medium text-muted sm:inline">
                SRS Showroom · In stock today
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-pill bg-surface-card px-3 py-1 text-[12px] font-medium text-muted">
                Perambalur
              </span>
              <span className="rounded-pill bg-accent px-3 py-1 text-[12px] font-semibold text-ink">
                Open now
              </span>
            </div>
          </div>

          {/* Mock canvas: shelf of products */}
          <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-4">
            {SHELF.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group rounded-2xl border border-line bg-white p-4 transition-shadow hover:shadow-soft"
              >
                <Link href={p.href} className="block">
                  <div
                    className={`mb-3 flex h-28 items-center justify-center overflow-hidden rounded-xl p-2 ${p.tint}`}
                  >
                    {/* Flex, not grid: an auto-sized grid row grew to the
                        image's intrinsic height, so percentage heights on the
                        image resolved against itself and it overflowed. */}
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={160}
                      height={120}
                      unoptimized
                      className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-[14.5px] font-semibold text-ink">
                    {p.name}
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-muted">{p.spec}</div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[13px] font-semibold text-accent-deep opacity-0 transition-opacity group-hover:opacity-100">
                      Browse →
                    </span>
                    <span className="rounded-pill bg-surface-card px-2.5 py-1 text-[11.5px] font-medium text-muted">
                      In store
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
