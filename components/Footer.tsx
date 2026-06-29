import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone, Mail } from "lucide-react";
import Logo from "./Logo";
import { SITE } from "@/lib/site";

const COLS = [
  {
    title: "Products",
    links: ["Laptops", "Desktops", "CCTV & Security", "Printers", "Accessories"],
    href: "/products",
  },
  {
    title: "Services",
    links: ["Custom PC builds", "Repairs & upgrades", "CCTV installation", "AMC plans", "Software setup"],
    href: "/services",
  },
  {
    title: "Company",
    links: ["About us", "Our story", "Visit us", "Brands we stock"],
    href: "/about",
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-10 border-t border-line bg-gradient-to-b from-white/40 to-[#dce3e8]/60">
      <div className="container-x py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand block */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-muted">
              {SITE.tagline}. Your trusted local store for everything computers
              and electronics.
            </p>
            <div className="mt-5 space-y-2 text-[14px] text-ink/80">
              <a href={SITE.address.maps} className="flex items-start gap-2 hover:text-ink">
                <MapPin className="mt-0.5 h-4 w-4 text-accent-deep" />
                {SITE.address.line1}, {SITE.address.line2}
              </a>
              <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 hover:text-ink">
                <Phone className="h-4 w-4 text-accent-deep" />
                {SITE.phoneDisplay}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-ink">
                <Mail className="h-4 w-4 text-accent-deep" />
                {SITE.email}
              </a>
            </div>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-muted-light">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link
                      href={col.href}
                      className="text-[15px] font-medium text-ink/80 transition-colors hover:text-ink"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-[13.5px] text-muted">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm transition-transform hover:-translate-y-0.5" aria-label="Instagram">
              <Instagram className="h-4 w-4 text-ink" />
            </a>
            <a href="#" className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm transition-transform hover:-translate-y-0.5" aria-label="Facebook">
              <Facebook className="h-4 w-4 text-ink" />
            </a>
            <span className="ml-2 text-[12.5px] font-semibold uppercase tracking-[0.1em] text-muted-light">
              Made in Perambalur
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
