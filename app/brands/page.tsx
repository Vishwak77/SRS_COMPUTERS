import PageHero from "@/components/PageHero";
import LogoMarquee from "@/components/home/LogoMarquee";
import FinalCTA from "@/components/home/FinalCTA";

export const metadata = {
  title: "Brands — SRS Computers",
  description:
    "The brands SRS Computers stocks and services in Perambalur — Dell, HP, Lenovo, ASUS, Acer, Canon, Epson, Hikvision, CP Plus, TP-Link and more.",
};

export default function BrandsPage() {
  return (
    <>
      <PageHero
        eyebrow="Brands we carry"
        title={
          <>
            Genuine products,
            <br className="hidden sm:block" /> trusted names
          </>
        }
        subtitle="We stock and service the brands you already know — sold genuine, warranted, and backed by our in-house team."
      />

      <LogoMarquee />
      <FinalCTA />
    </>
  );
}
