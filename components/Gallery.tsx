"use client";

import Image from "next/image";
import Reveal from "./Reveal";

// Real in-store photos from public/gallery (store-01 … store-11).
const PHOTOS = Array.from({ length: 11 }, (_, i) => ({
  src: `/gallery/store-${String(i + 1).padStart(2, "0")}.jpeg`,
  alt: `Inside SRS Computers, Perambalur — shelf ${i + 1}`,
}));

// Masonry-ish spans for visual rhythm (mirrors the reference's collage gallery).
const SPANS = [
  "row-span-2", "", "", "row-span-2", "", "row-span-2",
  "", "", "row-span-2", "", "",
];

export default function Gallery() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Inside the store</p>
          <h2 className="mt-3 text-[32px] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[42px]">
            Real shelves, real stock
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            A peek inside our Perambalur showroom — cameras, printers, ink,
            networking and accessories, all in stock and ready to take home.
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {PHOTOS.map((photo, i) => (
              <div
                key={photo.src}
                className={`group relative overflow-hidden rounded-card border border-white/70 shadow-soft ${
                  SPANS[i] ?? ""
                }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
