import HeroBanner from "@/components/home/HeroBanner";
import Hero from "@/components/home/Hero";
import ShowcaseReveal from "@/components/home/ShowcaseReveal";
import Stats from "@/components/home/Stats";
import FeatureCarousel from "@/components/home/FeatureCarousel";
import Packages from "@/components/home/Packages";
import Testimonials from "@/components/home/Testimonials";
import FounderTeaser from "@/components/home/FounderTeaser";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <Hero />
      <ShowcaseReveal />
      <Stats />
      <FeatureCarousel />
      <Packages />
      <Testimonials />
      <FounderTeaser />
      <FinalCTA />
    </>
  );
}
