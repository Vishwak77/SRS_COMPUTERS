"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { useHashNav } from "./HashScroll";
import { NAV_LINKS, PRODUCT_MENU, SITE } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // products mega-menu
  const [mobileOpen, setMobileOpen] = useState(false);
  const hashNav = useHashNav();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement / promo bar */}
      <div className="relative z-40 bg-teal-bar text-center text-[13.5px] text-white">
        <div className="container-x flex items-center justify-center gap-2 py-2">
          <span className="font-semibold">Now open in Perambalur</span>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-accent-soft hover:text-white transition-colors"
          >
            Visit our showroom <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Floating pill nav */}
      <header className="sticky top-0 z-40">
        {/* The pill floats with a gap above and beside it, so scrolling content
            used to peek through that gap and get sliced by the viewport edge.
            BackgroundGradient is `fixed`, so the page colour at the very top is
            always #ffd2ac — fading that same colour out behind the pill hides
            the passing text without showing a seam. Only needed once scrolled. */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-0 h-[96px] transition-opacity duration-300 sm:h-[108px] ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background:
              "linear-gradient(to bottom, #ffd2ac 0%, #ffd2ac 58%, rgba(255,210,172,0.55) 80%, rgba(255,210,172,0) 100%)",
          }}
        />
        {/* The pill carries 7 links + search + two CTAs, which don't fit inside
            the 1200px content column. It's a floating pill, so let it run a
            little wider than the page container from xl up. */}
        <div className="relative container-x pt-3 xl:max-w-[1320px]">
          <motion.nav
            onMouseLeave={() => setMenuOpen(false)}
            className={`relative mx-auto flex items-center justify-between rounded-pill border border-white/60 px-2.5 py-2 pl-3 transition-all duration-300 sm:px-3 sm:pl-4 ${
              scrolled
                ? "frosted bg-white/70 shadow-nav"
                : "bg-white/85 shadow-nav"
            }`}
          >
            <Logo />

            {/* Center links — in-flow (not absolutely centered) so the search
                field in the right group can't overlap them. */}
            <ul className="hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
              {NAV_LINKS.map((link) => (
                <li
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setMenuOpen(!!link.hasMenu)}
                >
                  <Link
                    href={link.href}
                    onClick={hashNav(link.href)}
                    className={`inline-flex items-center gap-1 whitespace-nowrap rounded-pill px-2 py-1.5 text-[14px] font-medium transition-colors hover:bg-ink/[0.04] hover:text-ink xl:px-2.5 xl:text-[14.5px] ${
                      link.hasMenu && menuOpen ? "bg-ink/[0.04] text-ink" : "text-ink/80"
                    }`}
                  >
                    {link.label}
                    {link.hasMenu && (
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-300 ${
                          menuOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Products mega-menu — anchored directly under this item */}
                  {link.hasMenu && (
                    <AnimatePresence>
                      {menuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                        >
                          {/* invisible hover bridge fills the gap so the cursor can travel down */}
                          <div className="w-[640px] max-w-[92vw] rounded-card border border-white/70 bg-white/95 p-3 shadow-card frosted">
                            <div className="grid grid-cols-3 gap-1">
                              {PRODUCT_MENU.map((col, i) => (
                                <div key={i} className="space-y-0.5">
                                  {col.map((item) => (
                                    <Link
                                      key={item.label}
                                      href={`/products?cat=${item.cat}`}
                                      onClick={() => setMenuOpen(false)}
                                      className="group/item flex items-start gap-2 rounded-2xl px-3 py-2.5 transition-colors hover:bg-surface-card"
                                    >
                                      <div>
                                        <div className="text-[14px] font-semibold text-ink">
                                          {item.label}
                                        </div>
                                        <div className="text-[12px] text-muted">
                                          {item.desc}
                                        </div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                            <Link
                              href="/products"
                              onClick={() => setMenuOpen(false)}
                              className="mt-2 flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-white transition-colors hover:brightness-110"
                            >
                              <span className="text-[14px] font-semibold">
                                Browse the full catalogue
                              </span>
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              ))}
            </ul>

            {/* Right CTAs */}
            <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
              {/* Nav pill is width-capped by container-x, so this can't grow at
                  wider viewports — 7 links + CTA leave no slack. Keep the field
                  narrow at xl and only give it room once the links have some. */}
              <SearchBar className="hidden w-[124px] xl:block 2xl:w-[150px]" />
              <a
                href={`tel:${SITE.phone}`}
                className="hidden items-center gap-2 rounded-pill px-3.5 py-2 text-[15px] font-semibold text-ink/80 transition-colors hover:bg-ink/[0.04] sm:inline-flex"
              >
                <Phone className="h-4 w-4" /> Call
              </a>
              <Link
                href="/contact"
                /* Compact on narrow phones (320px) so the menu button stays on
                   screen; full size from sm up. */
                className="btn-accent whitespace-nowrap px-3 py-2 text-[13.5px] sm:px-5 sm:py-2.5 sm:text-[15px]"
              >
                {/* Wide wordmark leaves no room for the full label on phones. */}
                <span className="sm:hidden">Directions</span>
                <span className="hidden sm:inline">Get Directions</span>
              </Link>
              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-pill ring-1 ring-line sm:h-9 sm:w-9 lg:hidden"
                aria-label="Menu"
              >
                <span className="space-y-1">
                  <span className="block h-0.5 w-4 bg-ink" />
                  <span className="block h-0.5 w-4 bg-ink" />
                </span>
              </button>
            </div>
          </motion.nav>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/20 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="container-x pt-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-card bg-white p-4 shadow-card">
                <SearchBar className="mb-3" />
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      hashNav(link.href)(e);
                      setMobileOpen(false);
                    }}
                    className="block rounded-2xl px-4 py-3 text-[16px] font-semibold text-ink hover:bg-surface-card"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-accent mt-2 w-full"
                >
                  Get Directions
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
