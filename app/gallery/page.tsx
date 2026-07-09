import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import GalleryGrid from "@/components/GalleryGrid";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "Gallery — SRS Computers",
  description:
    "Photos from inside the SRS Computers showroom in Perambalur — laptops, CCTV, printers, ink, networking and accessories, all in stock.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Inside the store"
        title={
          <>
            Real shelves,
            <br className="hidden sm:block" /> real stock
          </>
        }
        subtitle="A look around our Perambalur showroom. Everything you see here is on the shelf and ready to take home."
      />

      <section className="relative py-14 sm:py-20">
        <div className="container-x">
          <GalleryGrid />

          <Reveal className="mt-12 text-center">
            <p className="text-[15px] text-muted">
              Want to see something in person? Drop by the showroom — we&apos;re
              open all week.
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
