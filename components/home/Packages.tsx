"use client";

import { useState } from "react";
import {
  Cctv,
  Monitor,
  Home,
  Gamepad2,
  Cpu,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import {
  PACKAGE_GROUPS,
  type Package,
  type PackageGroup,
  type PackageIcon,
} from "@/lib/packages";
import { SITE } from "@/lib/site";

const ICONS: Record<PackageIcon, LucideIcon> = {
  cctv: Cctv,
  monitor: Monitor,
  home: Home,
  gaming: Gamepad2,
  workstation: Cpu,
};

// Prefill the WhatsApp message with the package the customer tapped.
function enquireHref(pkg: Package) {
  const text = `Hi SRS Computers — I'd like to know more about the ${pkg.name} (${pkg.detail}, ${pkg.price}).`;
  return `https://wa.me/91${SITE.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
}

function PackageCard({
  pkg,
  delay,
  selected,
  onSelect,
}: {
  pkg: Package;
  delay: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = ICONS[pkg.icon];

  return (
    <Reveal delay={delay} className="h-full">
      {/* Cards look identical by default; picking one turns it dark. */}
      <div
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        onClick={onSelect}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect();
          }
        }}
        className={`group relative flex h-full cursor-pointer flex-col rounded-xl2 border p-6 text-center shadow-soft outline-none transition-all duration-300 hover:-translate-y-1 hover:shadow-card focus-visible:ring-2 focus-visible:ring-accent sm:p-7 ${
          selected
            ? "border-ink/10 bg-ink text-white"
            : "border-white/70 bg-white/85 frosted hover:border-ink/10 hover:bg-ink"
        }`}
      >
        {pkg.popular && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-pill bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-ink shadow-sm">
            Popular
          </span>
        )}

        <div
          className={`mx-auto grid h-12 w-12 place-items-center rounded-2xl transition-colors ${
            selected ? "bg-white/10" : "bg-surface-card group-hover:bg-white/10"
          }`}
        >
          <Icon
            className={`h-6 w-6 transition-colors ${
              selected ? "text-accent" : "text-accent-deep group-hover:text-accent"
            }`}
          />
        </div>

        <h4
          className={`mt-4 text-[19px] font-extrabold tracking-[-0.01em] transition-colors ${
            selected ? "text-white" : "text-ink group-hover:text-white"
          }`}
        >
          {pkg.name}
        </h4>
        <p
          className={`mt-1 text-[13.5px] transition-colors ${
            selected ? "text-white/70" : "text-muted group-hover:text-white/70"
          }`}
        >
          {pkg.detail}
        </p>

        <div
          className={`mt-5 text-[30px] font-extrabold tracking-[-0.02em] transition-colors ${
            selected ? "text-white" : "text-ink group-hover:text-white"
          }`}
        >
          {pkg.price}
        </div>

        {/* Push the CTA to the bottom so cards line up regardless of copy length.
            stopPropagation so opening WhatsApp doesn't also toggle the card. */}
        <a
          href={enquireHref(pkg)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="btn-accent mt-auto w-full justify-center pt-2.5"
          aria-label={`Enquire about the ${pkg.name} on WhatsApp`}
        >
          Enquire <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </Reveal>
  );
}

function PackageGrid({ group }: { group: PackageGroup }) {
  // One pick at a time per group; clicking the same card again clears it.
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {group.packages.map((pkg, i) => (
        <PackageCard
          key={pkg.name}
          pkg={pkg}
          delay={(i % 4) * 0.05}
          selected={selected === pkg.name}
          onSelect={() => setSelected((s) => (s === pkg.name ? null : pkg.name))}
        />
      ))}
    </div>
  );
}

export default function Packages() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Packages</p>
          <h2 className="mt-3 text-[34px] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[44px]">
            Ready-made bundles, honest prices
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            Pick a package off the shelf or tell us what you need — we&apos;ll
            assemble, install and set it up for you in Perambalur.
          </p>
        </Reveal>

        {PACKAGE_GROUPS.map((group, gi) => (
          // The nav's "Packages" link targets #packages, which sits on the first
          // group (CCTV) so it lands on the cards, not the section intro above.
          <div
            key={group.key}
            id={gi === 0 ? "packages" : `${group.key}-packages`}
            className={`scroll-mt-28 ${gi === 0 ? "mt-14" : "mt-16 sm:mt-20"}`}
          >
            <Reveal className="mx-auto max-w-2xl text-center">
              <h3 className="text-[26px] font-extrabold tracking-[-0.01em] text-ink sm:text-[32px]">
                {group.title}
              </h3>
              {group.blurb && (
                <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
                  {group.blurb}
                </p>
              )}
            </Reveal>

            <PackageGrid group={group} />
          </div>
        ))}

        <Reveal className="mt-12 text-center">
          <p className="text-[15px] text-muted">
            Need something different? We build to your budget — just ask.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
