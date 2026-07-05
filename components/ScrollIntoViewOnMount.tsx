"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

// Scrolls a target section into view once, shortly after the page mounts.
// Used on the About page so a redirect lands on the founder story (with the
// photo fully visible) instead of stopping at the hero on short viewports.
// Lenis owns scrolling (root), so drive it through the Lenis instance.
export default function ScrollIntoViewOnMount({
  targetId,
  offset = -100,
  delay = 350,
}: {
  targetId: string;
  offset?: number;
  delay?: number;
}) {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;

  useEffect(() => {
    const t = setTimeout(() => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY + offset);
      const l = lenisRef.current;
      if (l) l.scrollTo(y);
      else window.scrollTo({ top: y, behavior: "smooth" });
    }, delay);
    return () => clearTimeout(t);
  }, [targetId, offset, delay]);

  return null;
}
