"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gift, X, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { SITE } from "@/lib/site";

const STORAGE_KEY = "srs-offer-seen-v1";

/* Lightweight confetti burst (no dependency). */
function confettiBurst(host: HTMLElement) {
  const colors = ["#FF6A00", "#FF9A4D", "#FFC93C", "#34C759", "#7C5CFB"];
  for (let i = 0; i < 36; i++) {
    const piece = document.createElement("span");
    const size = 6 + Math.random() * 6;
    piece.style.cssText = `position:absolute;left:50%;top:40%;width:${size}px;height:${size * 0.5}px;background:${
      colors[i % colors.length]
    };border-radius:2px;pointer-events:none;will-change:transform,opacity;z-index:5;`;
    host.appendChild(piece);
    const angle = Math.random() * Math.PI * 2;
    const dist = 80 + Math.random() * 160;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 40;
    piece.animate(
      [
        { transform: "translate(-50%,-50%) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(${
            Math.random() * 720 - 360
          }deg)`,
          opacity: 0,
        },
      ],
      { duration: 900 + Math.random() * 500, easing: "cubic-bezier(.22,1,.36,1)" }
    ).onfinish = () => piece.remove();
  }
}

export default function OfferPopup() {
  const [open, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [showGiftButton, setShowGiftButton] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const scratching = useRef(false);
  const clearedRef = useRef(false);

  // First-visit auto-open (~6s), once per visitor; always show the gift button.
  useEffect(() => {
    setShowGiftButton(true);
    if (typeof window === "undefined") return;
    const seen = localStorage.getItem(STORAGE_KEY);
    if (seen) return;
    const t = setTimeout(() => setOpen(true), 6000);
    return () => clearTimeout(t);
  }, []);

  const markSeen = () =>
    typeof window !== "undefined" && localStorage.setItem(STORAGE_KEY, "1");

  const close = () => {
    setOpen(false);
    markSeen();
  };

  const doReveal = useCallback(() => {
    if (clearedRef.current) return;
    clearedRef.current = true;
    setRevealed(true);
    if (cardRef.current) confettiBurst(cardRef.current);
  }, []);

  // Paint the scratch cover when the popup opens.
  useEffect(() => {
    if (!open || revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = (canvas.width = canvas.offsetWidth * 2);
    const h = (canvas.height = canvas.offsetHeight * 2);
    // gradient foil
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, "#7C3A12");
    g.addColorStop(0.5, "#FF9A4D");
    g.addColorStop(1, "#7C3A12");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // sparkle text
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "bold 30px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ SCRATCH TO REVEAL ✦", w / 2, h / 2 - 6);
    ctx.font = "500 22px 'Plus Jakarta Sans', sans-serif";
    ctx.fillText("an offer just for you", w / 2, h / 2 + 34);
    ctx.globalCompositeOperation = "destination-out";
  }, [open, revealed]);

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || clearedRef.current) return;
    const rect = canvas.getBoundingClientRect();
    const x = (clientX - rect.left) * 2;
    const y = (clientY - rect.top) * 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(x, y, 46, 0, Math.PI * 2);
    ctx.fill();
    // measure cleared %
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 64) if (data[i] === 0) cleared++;
    if (cleared / (data.length / 64) > 0.22) doReveal();
  };

  return (
    <>
      {/* Floating gift button — always available, user-initiated */}
      {showGiftButton && !open && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 300, damping: 18 }}
          onClick={() => {
            setRevealed(false);
            clearedRef.current = false;
            setOpen(true);
          }}
          className="group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-pill bg-ink px-4 py-3 text-white shadow-card transition-all hover:brightness-110"
          aria-label="See today's offer"
        >
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
          </span>
          <Gift className="h-5 w-5 text-accent" />
          <span className="hidden text-[14px] font-semibold sm:inline">
            Today&apos;s offer
          </span>
        </motion.button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
              onClick={close}
            />

            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.92 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-card bg-white shadow-card"
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full bg-white/80 text-ink shadow-sm transition-transform hover:scale-105 frosted"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-br from-surface-mint to-surface-sky px-6 pt-7 text-center">
                <motion.div
                  animate={{ rotate: [0, -8, 8, -8, 0] }}
                  transition={{ repeat: Infinity, repeatDelay: 2.5, duration: 0.8 }}
                  className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ink shadow-soft"
                >
                  <Gift className="h-7 w-7 text-accent" />
                </motion.div>
                <h3 className="mt-4 text-[22px] font-extrabold tracking-[-0.01em] text-ink">
                  A little something for you
                </h3>
                <p className="mt-1 px-2 text-[14px] text-muted">
                  {revealed
                    ? "Here's your reason to drop by 👇"
                    : "Scratch the panel below to reveal today's offer."}
                </p>
              </div>

              {/* Reveal zone */}
              <div className="relative px-6 py-6">
                <motion.div
                  animate={
                    revealed
                      ? { scale: [1, 1.04, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-48 overflow-hidden rounded-card shadow-card"
                >
                  {/* The premium "ticket" offer underneath */}
                  <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,#7C3A12_0%,#4A2109_55%,#2A1206_100%)]">
                    {/* soft accent glow + shine */}
                    <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-accent/30 blur-3xl" />
                    <div className="absolute -bottom-12 -left-8 h-36 w-36 rounded-full bg-accent-deep/25 blur-3xl" />
                    {revealed && (
                      <motion.div
                        initial={{ x: "-120%" }}
                        animate={{ x: "160%" }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                        className="absolute inset-y-0 w-1/3 -skew-x-12 bg-white/15"
                      />
                    )}
                    {/* perforated ticket edge */}
                    <div className="absolute left-0 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
                    <div className="absolute right-0 top-1/2 h-5 w-5 translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />

                    <div className="relative flex h-full flex-col items-center justify-center px-7 text-center">
                      <span className="inline-flex items-center gap-1.5 rounded-pill bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-ink shadow-glow">
                        <Sparkles className="h-3.5 w-3.5" /> Exclusive
                      </span>
                      <p className="mt-3 text-[21px] font-extrabold leading-tight text-white">
                        Special in-store deals
                        <br /> this week
                      </p>
                      <p className="mt-1.5 text-[12.5px] leading-snug text-white/70">
                        Best prices on laptops, CCTV &amp; accessories — unlocked
                        when you visit us in Perambalur.
                      </p>
                    </div>
                  </div>

                  {/* Scratch canvas overlay */}
                  {!revealed && (
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 h-full w-full cursor-pointer touch-none"
                      onPointerDown={(e) => {
                        scratching.current = true;
                        scratchAt(e.clientX, e.clientY);
                      }}
                      onPointerMove={(e) => {
                        if (scratching.current) scratchAt(e.clientX, e.clientY);
                      }}
                      onPointerUp={() => (scratching.current = false)}
                      onPointerLeave={() => (scratching.current = false)}
                    />
                  )}
                </motion.div>

                {/* Tap-to-reveal shortcut for touch users */}
                {!revealed && (
                  <button
                    onClick={doReveal}
                    className="mx-auto mt-3 block text-[13px] font-semibold text-muted underline-offset-4 hover:text-ink hover:underline"
                  >
                    or tap here to reveal
                  </button>
                )}

                {/* CTAs appear after reveal */}
                <AnimatePresence>
                  {revealed && (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-5 flex flex-col gap-2.5 sm:flex-row"
                    >
                      <a
                        href={SITE.address.maps}
                        target="_blank"
                        rel="noreferrer"
                        onClick={markSeen}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-pill bg-accent px-5 py-3 text-[15px] font-semibold text-ink shadow-glow transition-all hover:brightness-105 active:scale-[0.98]"
                      >
                        <MapPin className="h-4.5 w-4.5" /> Get directions
                      </a>
                      <a
                        href={`https://wa.me/91${SITE.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                          "Hi SRS Computers! I'd love to know about this week's offers."
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={markSeen}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-pill bg-ink px-5 py-3 text-[15px] font-semibold text-white transition-all hover:brightness-110 active:scale-[0.98]"
                      >
                        <MessageCircle className="h-4.5 w-4.5" /> Message us
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
