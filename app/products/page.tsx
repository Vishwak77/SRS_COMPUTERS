import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import BrowseProducts from "@/components/BrowseProducts";
import Gallery from "@/components/Gallery";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "Products — SRS Computers",
  description:
    "Browse laptops, desktops, CCTV, printers, networking, storage, accessories and power backup at SRS Computers, Perambalur.",
};

export default function ProductsPage() {
  return (
    <>
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

      <FinalCTA />
    </>
  );
}
