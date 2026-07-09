"use client";

import Image from "next/image";

// A curated subset of public/gallery — the full set lives on /gallery.
// Skips near-duplicates (06 repeats 05, 08 repeats 03), the cluttered 09, and
// the marketing banner 10, which reads as noise at tile size.
const PHOTOS = [
  { n: "01", alt: "CCTV pan-tilt cameras on display at SRS Computers" },
  { n: "02", alt: "Accessories and chargers on the shelf at SRS Computers" },
  { n: "03", alt: "Ink, cables and accessories across the SRS Computers shelves" },
  { n: "04", alt: "Wireless mice and keyboards in the SRS Computers display case" },
  { n: "05", alt: "Canon printers and ink at SRS Computers" },
  { n: "07", alt: "Boxed CCTV camera kits at SRS Computers" },
].map((p) => ({ src: `/gallery/store-${p.n}.jpeg`, alt: p.alt }));

export default function GalleryMarquee() {
  const track = [...PHOTOS, ...PHOTOS]; // duplicate for seamless loop

  return (
    <div
      className="relative overflow-hidden"
      style={{
        // Mask rather than a solid-color gradient overlay: this sits on the
        // hero's peach gradient, not a flat surface.
        maskImage:
          "linear-gradient(to right, transparent, black 4rem, black calc(100% - 4rem), transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 4rem, black calc(100% - 4rem), transparent)",
      }}
    >
      <div
        className="flex w-max animate-marquee gap-4 pr-4 motion-reduce:animate-none hover:[animation-play-state:paused]"
        style={{ ["--marquee-duration" as string]: "45s" }}
      >
        {track.map((photo, i) => (
          <div
            key={`${photo.src}-${i}`}
            // Second copy of the track is decorative — don't announce twice.
            aria-hidden={i >= PHOTOS.length || undefined}
            // Height tracks the viewport (not a fixed px) so the row stays fully
            // above the fold on short laptops and phones; width follows the ratio.
            className="group relative aspect-[3/2] h-[140px] shrink-0 overflow-hidden rounded-card border border-white/70 shadow-soft sm:h-[clamp(150px,24vh,250px)]"
          >
            <Image
              src={photo.src}
              alt={i < PHOTOS.length ? photo.alt : ""}
              fill
              unoptimized
              loading="eager"
              sizes="375px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
