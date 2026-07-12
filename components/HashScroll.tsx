"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

type Lenis = ReturnType<typeof useLenis>;

// Lenis owns the scroll position, so the browser's native "jump to #hash"
// behaviour is ignored. Everything hash-related has to go through it.

function scrollToEl(el: HTMLElement, lenis: Lenis) {
  // Lenis already honours the target's `scroll-mt-*`, so no extra offset.
  if (lenis) lenis.scrollTo(el);
  else el.scrollIntoView({ behavior: "smooth" });
}

/**
 * Scroll to `el`, then keep it pinned while the page settles.
 *
 * Late-loading images and scroll-reveals above the target can grow the page
 * after the scroll starts, leaving us parked short of it. So re-check a couple
 * of times and nudge only if we've drifted. Any real user input cancels the
 * corrections immediately — we must never yank the page out from under them.
 */
function settleScrollTo(el: HTMLElement, lenis: Lenis) {
  const timers: number[] = [];
  let cancelled = false;

  const cleanup = () => {
    timers.forEach(window.clearTimeout);
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", cancel);
  };

  function cancel() {
    cancelled = true;
    cleanup();
  }

  const nudge = () => {
    if (cancelled || !el.isConnected) return;
    const want = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
    if (Math.abs(el.getBoundingClientRect().top - want) > 6) scrollToEl(el, lenis);
  };

  scrollToEl(el, lenis);
  timers.push(window.setTimeout(nudge, 450));
  timers.push(
    window.setTimeout(() => {
      nudge();
      cleanup();
    }, 1200)
  );

  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("keydown", cancel);

  return cleanup;
}

/**
 * Click handler for nav links like `/#packages`.
 *
 * If we're already on the target route, the browser won't fire anything
 * (the hash is unchanged), so the link would look dead on a second click.
 * Scroll it ourselves instead. On a different route we let Next navigate and
 * `HashScroll` picks it up after the route paints.
 */
export function useHashNav() {
  const pathname = usePathname();
  const lenis = useLenis();

  return (href: string) =>
    (e: React.MouseEvent) => {
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return; // plain route — let Link do its job

      const path = href.slice(0, hashIndex) || "/";
      const id = href.slice(hashIndex + 1);
      if (!id || pathname !== path) return;

      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      settleScrollTo(el, lenis);
      // Keep the URL shareable without triggering a `hashchange`.
      window.history.replaceState(null, "", `#${id}`);
    };
}

/** Handles arriving at a `/#hash` URL — via nav, back/forward, or a cold load. */
export default function HashScroll() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    let stop: (() => void) | undefined;

    const jump = () => {
      const id = window.location.hash.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      stop?.();
      stop = settleScrollTo(el, lenis);
    };

    // Let the new route paint before measuring.
    const t = window.setTimeout(jump, 120);
    window.addEventListener("hashchange", jump);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", jump);
      stop?.();
    };
  }, [pathname, lenis]);

  return null;
}
