"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, MessageCircle, MapPin, ShieldCheck, Store, BadgeCheck } from "lucide-react";
import type { Product } from "@/lib/catalogue";
import { SITE } from "@/lib/site";

const TRUST = [
  { icon: Store, label: "See it in-store" },
  { icon: ShieldCheck, label: "Genuine & warranted" },
  { icon: BadgeCheck, label: "Expert advice" },
];

export default function ProductModal({
  product,
  categoryLabel,
  onClose,
}: {
  product: Product | null;
  categoryLabel?: string;
  onClose: () => void;
}) {
  const [imgOk, setImgOk] = useState(true);

  // Reset image state when the product changes; lock body scroll while open.
  useEffect(() => {
    setImgOk(true);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  const waText = product
    ? encodeURIComponent(
        `Hi SRS Computers! I'm interested in the ${product.brand} ${product.name}. Could you let me know the price and availability?`
      )
    : "";
  const waHref = `https://wa.me/91${SITE.whatsapp.replace(/[^0-9]/g, "")}?text=${waText}`;

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative z-10 grid w-full max-w-3xl overflow-hidden rounded-card border border-white/70 bg-white shadow-card md:grid-cols-2"
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-ink shadow-sm transition-transform hover:scale-105 hover:bg-white frosted"
            >
              <X className="h-4.5 w-4.5" />
            </button>

            {/* Image side */}
            <div className="relative flex items-center justify-center bg-gradient-to-br from-surface-sky to-surface-mint p-8 md:p-10">
              {imgOk ? (
                <Image
                  src={product.image}
                  alt={`${product.brand} ${product.name}`}
                  width={420}
                  height={420}
                  unoptimized
                  className="max-h-[260px] w-auto object-contain drop-shadow-xl md:max-h-[340px]"
                  onError={() => setImgOk(false)}
                />
              ) : (
                <div className="text-center">
                  <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-accent-deep">
                    {product.brand}
                  </div>
                  <div className="mt-1 text-[20px] font-extrabold text-ink/50">
                    {product.name}
                  </div>
                </div>
              )}
            </div>

            {/* Details side */}
            <div className="flex flex-col p-6 sm:p-8">
              {categoryLabel && (
                <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-accent-deep">
                  {categoryLabel}
                </span>
              )}
              <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-pill bg-surface-card px-3 py-1 text-[12px] font-semibold text-ink">
                {product.brand}
              </span>
              <h2 className="mt-3 text-[24px] font-extrabold leading-tight tracking-[-0.01em] text-ink sm:text-[28px]">
                {product.name}
              </h2>
              <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
                {product.desc}
              </p>

              {/* Trust chips */}
              <div className="mt-5 flex flex-wrap gap-2">
                {TRUST.map((t) => (
                  <span
                    key={t.label}
                    className="inline-flex items-center gap-1.5 rounded-pill bg-surface-mint px-3 py-1.5 text-[12.5px] font-medium text-ink/80"
                  >
                    <t.icon className="h-3.5 w-3.5 text-emerald-600" />
                    {t.label}
                  </span>
                ))}
              </div>

              {/* Enquiry CTAs — low friction, immediately actionable */}
              <div className="mt-auto pt-6">
                <p className="mb-3 text-[13.5px] text-muted">
                  Ask us about price &amp; availability — we&apos;ll reply fast.
                </p>
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-pill bg-[#25D366] px-5 py-3 text-[15px] font-semibold text-white shadow-soft transition-all hover:brightness-105 active:scale-[0.98]"
                  >
                    <MessageCircle className="h-4.5 w-4.5" /> WhatsApp enquiry
                  </a>
                  <a
                    href={`tel:${SITE.phone}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-pill bg-ink px-5 py-3 text-[15px] font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
                  >
                    <Phone className="h-4.5 w-4.5" /> Call now
                  </a>
                </div>
                <a
                  href={SITE.address.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-muted transition-colors hover:text-ink"
                >
                  <MapPin className="h-4 w-4 text-accent-deep" /> Or visit our
                  Perambalur showroom
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
