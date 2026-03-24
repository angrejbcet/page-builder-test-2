import type { Metadata } from "next";
import { AboutHeroSection, type AboutHeroProps } from "@/public/sections/AboutHeroSection";
import { PortfolioShowcase, type PortfolioShowcaseProps } from "@/public/sections/PortfolioShowcase";
import { TestimonialSlider, type TestimonialSliderProps } from "@/public/sections/TestimonialSlider";
import { FinalCTASection, type FinalCTASectionProps } from "@/public/sections/FinalCTASection";
import { portfolioPageData, portfolioPageMetadata, portfolioPageJsonLd } from "@/content/pages/portfolio";

export const metadata: Metadata = portfolioPageMetadata;

export default function PortfolioPage() {
  const { sections } = portfolioPageData;
  return (
    <>
      {portfolioPageJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioPageJsonLd) }}
        />
      ) : null}
      <AboutHeroSection key={sections[0].id} {...(sections[0].props as unknown as AboutHeroProps)} />
      <PortfolioShowcase key={sections[1].id} {...(sections[1].props as unknown as PortfolioShowcaseProps)} />
      <TestimonialSlider key={sections[2].id} {...(sections[2].props as unknown as TestimonialSliderProps)} />
      <FinalCTASection key={sections[3].id} {...(sections[3].props as unknown as FinalCTASectionProps)} />
    </>
  );
}
