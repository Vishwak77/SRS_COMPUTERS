"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Reveal from "./Reveal";
import { ALL_PHOTOS as PHOTOS } from "@/lib/gallery";

// Masonry-ish spans for visual rhythm.
// First five entries cover the CP Plus photos; the portrait ones get tall tiles.
const SPANS = [
  "sm:row-span-2", "", "sm:row-span-2", "", "sm:row-span-2",
  "sm:row-span-2", "", "", "sm:row-span-2", "",
  "sm:row-span-2", "", "", "sm:row-span-2", "sm:row-span-2", // last: shop poster
];

export default function GalleryGrid() {
  const [index, setIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length)),
    []
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % PHOTOS.length)),
    []
  );

  // Keyboard control + scroll lock while the lightbox is open.
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);

    // Lenis drives scroll programmatically, so `overflow: hidden` alone does
    // NOT stop the page moving under the lightbox — it has to be paused too.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lenis?.start();
    };
  }, [index, close, prev, next, lenis]);

  const active = index === null ? null : PHOTOS[index];

  return (
    <>
      <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {PHOTOS.map((photo, i) => (
          <Reveal
            key={photo.src}
            delay={(i % 4) * 0.05}
            className={SPANS[i] ?? ""}
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Open photo ${i + 1} of ${PHOTOS.length}`}
              className="group relative h-full w-full overflow-hidden rounded-card border border-white/70 shadow-soft outline-none ring-accent transition-shadow focus-visible:ring-2"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={`transition-transform duration-700 group-hover:scale-105 ${
                  photo.fit === "contain"
                    ? "bg-white object-contain p-1.5"
                    : "object-cover"
                }`}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
          </Reveal>
        ))}
      </div>

      {/* Lightbox — portalled to <body> so the page's transformed/blurred
          ancestors can't clip it or trap it in a stacking context. */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={close}
                role="dialog"
                aria-modal="true"
                aria-label={`Photo ${(index ?? 0) + 1} of ${PHOTOS.length}`}
                className="fixed inset-0 z-[100] grid place-items-center bg-ink/85 p-4 backdrop-blur-sm"
              >
                <button
                  onClick={close}
                  aria-label="Close"
                  className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-pill bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  aria-label="Previous photo"
                  className="absolute left-3 grid h-11 w-11 place-items-center rounded-pill bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  aria-label="Next photo"
                  className="absolute right-3 grid h-11 w-11 place-items-center rounded-pill bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <motion.div
                  key={active.src}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative h-[70vh] w-full max-w-4xl"
                >
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 92vw, 900px"
                    className="rounded-card object-contain"
                  />
                </motion.div>

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-pill bg-white/10 px-4 py-1.5 text-[13px] font-semibold text-white">
                  {(index ?? 0) + 1} / {PHOTOS.length}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
