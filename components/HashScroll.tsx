"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

// Scrolls to the URL hash target (e.g. /products#brands). Native hash anchors
// don't work while Lenis owns scrolling, so drive it through the Lenis instance.
// Handles both a fresh load with a hash and same-page hash navigation.
export default function HashScroll({ offset = -100 }: { offset?: number }) {
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  lenisRef.current = lenis;
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (hash.length < 2) return;
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!el) return;
      const y = Math.max(0, el.getBoundingClientRect().top + window.scrollY + offset);
      const l = lenisRef.current;
      if (l) l.scrollTo(y);
      else window.scrollTo({ top: y, behavior: "smooth" });
    };

    // Delay lets the page render (product list, gallery) so the target's
    // position is settled before we measure it.
    const t = setTimeout(scrollToHash, 400);
    // Covers clicking a hash link while already on this page.
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [pathname, offset]);

  return null;
}
