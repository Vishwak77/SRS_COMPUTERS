import Hero from "@/components/home/Hero";
import ShowcaseReveal from "@/components/home/ShowcaseReveal";
import LogoMarquee from "@/components/home/LogoMarquee";
import Stats from "@/components/home/Stats";
import FeatureCarousel from "@/components/home/FeatureCarousel";
import FeatureCards from "@/components/home/FeatureCards";
import Comparison from "@/components/home/Comparison";
import Testimonials from "@/components/home/Testimonials";
import FounderTeaser from "@/components/home/FounderTeaser";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ShowcaseReveal />
      <LogoMarquee />
      <Stats />
      <FeatureCarousel />
      <FeatureCards />
      <Comparison />
      <Testimonials />
      <FounderTeaser />
      <FinalCTA />
    </>
  );
}
