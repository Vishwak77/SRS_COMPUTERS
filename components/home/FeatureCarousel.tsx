"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cpu, Camera, Printer, Wrench, Wifi, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

const TABS = [
  {
    key: "Computers",
    icon: Cpu,
    title: "Laptops, desktops & custom builds",
    body: "Tell us your budget and what you'll use it for. We'll recommend the right machine — and assemble a custom build if you want one — tested and ready before you leave.",
    tint: "from-surface-sky to-white",
    bullets: ["Branded & assembled", "Gaming & workstations", "Genuine warranty"],
    image: "/products/laptop-asus-rog-strix-g16.jpg",
    href: "/products?cat=laptops",
  },
  {
    key: "CCTV",
    icon: Camera,
    title: "CCTV & security systems",
    body: "Protect your home or shop with HD camera kits. We survey your site, run neat cabling, install everything and set up live viewing on your phone.",
    tint: "from-surface-mint to-white",
    bullets: ["Free site survey", "Phone viewing setup", "Neat professional install"],
    image: "/products/cctv-hikvision-colorvu-bullet.jpg",
    href: "/products?cat=cctv",
  },
  {
    key: "Printers",
    icon: Printer,
    title: "Printers, ink & supplies",
    body: "Ink-tank, inkjet and laser printers for home and office, plus genuine cartridges, toner and refills for every major brand under one roof.",
    tint: "from-surface-sky to-white",
    bullets: ["All major brands", "Genuine cartridges", "Bulk & office plans"],
    image: "/products/printer-canon-g3012.jpg",
    href: "/products?cat=printers",
  },
  {
    key: "Networking",
    icon: Wifi,
    title: "Networking & Wi-Fi",
    body: "Routers, switches, range extenders and full small-office networks — selected and configured so everything just connects and stays fast.",
    tint: "from-surface-mint to-white",
    bullets: ["Home & office Wi-Fi", "Routers & switches", "Setup included"],
    image: "/products/net-tplink-archer-ax23.jpg",
    href: "/products?cat=networking",
  },
  {
    key: "Service",
    icon: Wrench,
    title: "Repairs, upgrades & AMC",
    body: "In-house technicians for diagnostics, RAM/SSD upgrades, screen and board-level repair — for any brand, whether you bought it from us or not.",
    tint: "from-surface-sky to-white",
    bullets: ["Any brand welcome", "Upgrades while you wait", "Annual maintenance"],
    image: "/products/desktop-srs-gaming.jpg",
    href: "/services",
  },
];

export default function FeatureCarousel() {
  const [active, setActive] = useState(0);
  const tab = TABS[active];
  const Icon = tab.icon;

  return (
    <section className="relative py-16 sm:py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Everything under one roof</p>
          <h2 className="mt-3 text-[34px] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[44px]">
            Whatever you need, just ask
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            One trusted shop for your whole tech life — pick a category to see
            how we can help.
          </p>
        </Reveal>

        {/* Tabs */}
        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {TABS.map((t, i) => (
            <button
              key={t.key}
              onClick={() => setActive(i)}
              className={`rounded-pill px-4 py-2 text-[14.5px] font-semibold transition-all ${
                i === active
                  ? "bg-ink text-white shadow-soft"
                  : "bg-white/70 text-ink/70 ring-1 ring-line hover:bg-white"
              }`}
            >
              {t.key}
            </button>
          ))}
        </Reveal>

        {/* Panel */}
        <Reveal className="mt-8">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-card border border-white/70 shadow-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.key}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={`grid gap-8 bg-gradient-to-br ${tab.tint} p-8 sm:grid-cols-2 sm:p-12`}
              >
                {/* Left: copy */}
                <div className="flex flex-col justify-center">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-ink">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="mt-5 text-[26px] font-extrabold leading-tight tracking-[-0.01em] text-ink sm:text-[30px]">
                    {tab.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-muted">
                    {tab.body}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {tab.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-[14.5px] font-medium text-ink/80"
                      >
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-accent">
                          <svg viewBox="0 0 24 24" className="h-3 w-3 text-ink" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link href={tab.href} className="btn-dark mt-7 w-fit">
                    {tab.key === "Service" ? "See our services" : `Browse ${tab.key}`}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Right: real product visual */}
                <div className="relative grid place-items-center">
                  <div className="relative grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-2xl border border-white/80 bg-white/70 shadow-soft frosted">
                    <Image
                      src={tab.image}
                      alt={tab.title}
                      width={360}
                      height={270}
                      unoptimized
                      className="max-h-[80%] w-auto object-contain drop-shadow-lg"
                    />
                    <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/80 shadow-sm frosted">
                      <Icon className="h-4 w-4 text-accent-deep" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
