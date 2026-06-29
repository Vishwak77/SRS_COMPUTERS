"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type Direction = "up" | "left" | "right" | "scale";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  direction?: Direction;
};

const offsets: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 28 },
  left: { x: -36 },
  right: { x: 36 },
  scale: { scale: 0.94, y: 16 },
};

// Bottom-up (or directional) fade reveal — the reference's primary scroll motion.
// Degrades gracefully: reduced-motion renders immediately; reveal never leaves
// content permanently hidden.
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y,
  once = true,
  direction = "up",
}: Props) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once, margin: "0px 0px -10% 0px" });

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const off = direction === "up" && y != null ? { y } : offsets[direction];
  const hidden = { opacity: 0, x: 0, y: 0, scale: 1, ...off };
  const shown = { opacity: 1, x: 0, y: 0, scale: 1 };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={inView ? shown : hidden}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
