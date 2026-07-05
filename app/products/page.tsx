import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import BrowseProducts from "@/components/BrowseProducts";
import HashScroll from "@/components/HashScroll";
import Gallery from "@/components/Gallery";
import LogoMarquee from "@/components/home/LogoMarquee";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "Products — SRS Computers",
  description:
    "Browse laptops, desktops, CCTV, printers, networking, storage, accessories and power backup at SRS Computers, Perambalur.",
};

export default function ProductsPage() {
  return (
    <>
      {/* Scroll to #brands (or any hash) since Lenis overrides native anchors. */}
      <HashScroll offset={-96} />

      <PageHero
        eyebrow="Browse our range"
        title={
          <>
            Everything tech,
            <br className="hidden sm:block" /> in one place
          </>
        }
        subtitle="From your next laptop to a full CCTV setup — explore what we stock, then drop by the Perambalur showroom to see it in person. Filter by category below."
      />

      <section className="relative py-12 sm:py-16">
        <div className="container-x">
          <Suspense fallback={<div className="h-40" />}>
            <BrowseProducts />
          </Suspense>
        </div>
      </section>

      <Gallery />

      <section id="brands" className="relative scroll-mt-28 pt-4">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Brands we carry</p>
            <h2 className="mt-3 text-[30px] font-extrabold leading-tight tracking-[-0.02em] text-ink sm:text-[40px]">
              Genuine products, trusted names
            </h2>
          </div>
        </div>
      </section>
      <LogoMarquee />

      <FinalCTA />
    </>
  );
}
