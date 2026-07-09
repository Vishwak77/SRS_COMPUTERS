"use client";

// The home page ("/") ships its own full-page header, footer and background
// (see components/home/NewHome.tsx). These wrappers suppress the global chrome
// on the home route ONLY — every other route renders it exactly as before, so
// nothing outside the home page changes.

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackgroundGradient from "./BackgroundGradient";

export function GlobalNavbar() {
  return usePathname() === "/" ? null : <Navbar />;
}

export function GlobalFooter() {
  return usePathname() === "/" ? null : <Footer />;
}

export function GlobalBackground() {
  return usePathname() === "/" ? null : <BackgroundGradient />;
}
