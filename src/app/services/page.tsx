import type { Metadata } from "next";
import { AboutHeroSection, type AboutHeroProps } from "@/public/sections/AboutHeroSection";
import { ServiceCards, type ServiceCardsProps } from "@/public/sections/ServiceCards";
import { FinalCTASection, type FinalCTASectionProps } from "@/public/sections/FinalCTASection";
import { IntroTextSection, type IntroTextSectionProps } from "@/public/sections/IntroTextSection";
import { TestimonialSlider, type TestimonialSliderProps } from "@/public/sections/TestimonialSlider";
import { CredentialsBadgesSection, type CredentialsBadgesSectionProps } from "@/public/sections/CredentialsBadgesSection";
import { servicesPageData, servicesPageMetadata, servicesPageJsonLd } from "@/content/pages/services";

export const metadata: Metadata = servicesPageMetadata;

export default function ServicesPage() {
  const { sections } = servicesPageData;
  return (
    <>
      {servicesPageJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageJsonLd) }}
        />
      ) : null}
      <AboutHeroSection key={sections[0].id} {...(sections[0].props as unknown as AboutHeroProps)} />
      <ServiceCards key={sections[1].id} {...(sections[1].props as unknown as ServiceCardsProps)} />
      <FinalCTASection key={sections[2].id} {...(sections[2].props as unknown as FinalCTASectionProps)} />
      <IntroTextSection key={sections[3].id} {...(sections[3].props as unknown as IntroTextSectionProps)} />
      <TestimonialSlider key={sections[4].id} {...(sections[4].props as unknown as TestimonialSliderProps)} />
      <CredentialsBadgesSection key={sections[5].id} {...(sections[5].props as unknown as CredentialsBadgesSectionProps)} />
    </>
  );
}
