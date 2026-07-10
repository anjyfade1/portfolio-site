import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturedWorkSection } from "@/components/sections/FeaturedWorkSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ToolkitSection } from "@/components/sections/ToolkitSection";
import { AboutPreviewSection } from "@/components/sections/AboutPreviewSection";
import { ContactCtaSection } from "@/components/sections/ContactCtaSection";
import { TechMarquee } from "@/components/TechMarquee";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechMarquee />
      <FeaturedWorkSection />
      <ExperienceSection />
      <AboutPreviewSection />
      <ToolkitSection />
      <ContactCtaSection />
    </>
  );
}
