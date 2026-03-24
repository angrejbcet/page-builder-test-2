import type { Metadata } from "next";
import { ServiceHero, type ServiceHeroProps } from "@/public/sections/ServiceHero";
import { IntroTextSection, type IntroTextSectionProps } from "@/public/sections/IntroTextSection";
import { SEOHighlights, type SEOHighlightsProps } from "@/public/sections/SEOHighlights";
import { ChecklistSection, type ChecklistSectionProps } from "@/public/sections/ChecklistSection";
import { FAQSection, type FAQSectionProps } from "@/public/sections/FAQSection";
import { FinalCTASection, type FinalCTASectionProps } from "@/public/sections/FinalCTASection";
import { ProcessStepsSection, type ProcessStepsSectionProps } from "@/public/sections/ProcessStepsSection";
import { CredentialsBadgesSection, type CredentialsBadgesSectionProps } from "@/public/sections/CredentialsBadgesSection";
import { TestimonialSlider, type TestimonialSliderProps } from "@/public/sections/TestimonialSlider";
import { service_subservice_1774028382657PageData, service_subservice_1774028382657PageMetadata, service_subservice_1774028382657PageJsonLd } from "@/content/pages/service-subservice-1774028382657";

export const metadata: Metadata = service_subservice_1774028382657PageMetadata;

export default function ServiceSubservice1774028382657Page() {
  const { sections } = service_subservice_1774028382657PageData;
  return (
    <>
      {service_subservice_1774028382657PageJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(service_subservice_1774028382657PageJsonLd) }}
        />
      ) : null}
      <ServiceHero key={sections[0].id} {...(sections[0].props as unknown as ServiceHeroProps)} />
      <IntroTextSection key={sections[1].id} {...(sections[1].props as unknown as IntroTextSectionProps)} />
      <SEOHighlights key={sections[2].id} {...(sections[2].props as unknown as SEOHighlightsProps)} />
      <ChecklistSection key={sections[3].id} {...(sections[3].props as unknown as ChecklistSectionProps)} />
      <FAQSection key={sections[4].id} {...(sections[4].props as unknown as FAQSectionProps)} />
      <FinalCTASection key={sections[5].id} {...(sections[5].props as unknown as FinalCTASectionProps)} />
      <ProcessStepsSection key={sections[6].id} {...(sections[6].props as unknown as ProcessStepsSectionProps)} />
      <CredentialsBadgesSection key={sections[7].id} {...(sections[7].props as unknown as CredentialsBadgesSectionProps)} />
      <TestimonialSlider key={sections[8].id} {...(sections[8].props as unknown as TestimonialSliderProps)} />
    </>
  );
}
