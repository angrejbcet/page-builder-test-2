import type { Metadata } from "next";
import { ServiceHero, type ServiceHeroProps } from "@/public/sections/ServiceHero";
import { ServiceCards, type ServiceCardsProps } from "@/public/sections/ServiceCards";
import { LocationFAQSection, type LocationFAQSectionProps } from "@/public/sections/LocationFAQSection";
import { FinalCTASection, type FinalCTASectionProps } from "@/public/sections/FinalCTASection";
import { SEOHighlights, type SEOHighlightsProps } from "@/public/sections/SEOHighlights";
import { TestimonialSlider, type TestimonialSliderProps } from "@/public/sections/TestimonialSlider";
import { CredentialsBadgesSection, type CredentialsBadgesSectionProps } from "@/public/sections/CredentialsBadgesSection";
import { city_custom_1774020957838PageData, city_custom_1774020957838PageMetadata, city_custom_1774020957838PageJsonLd } from "@/content/pages/city-custom-1774020957838";

export const metadata: Metadata = city_custom_1774020957838PageMetadata;

export default function CityCustom1774020957838Page() {
  const { sections } = city_custom_1774020957838PageData;
  return (
    <>
      {city_custom_1774020957838PageJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(city_custom_1774020957838PageJsonLd) }}
        />
      ) : null}
      <ServiceHero key={sections[0].id} {...(sections[0].props as unknown as ServiceHeroProps)} />
      <ServiceCards key={sections[1].id} {...(sections[1].props as unknown as ServiceCardsProps)} />
      <LocationFAQSection key={sections[2].id} {...(sections[2].props as unknown as LocationFAQSectionProps)} />
      <FinalCTASection key={sections[3].id} {...(sections[3].props as unknown as FinalCTASectionProps)} />
      <SEOHighlights key={sections[4].id} {...(sections[4].props as unknown as SEOHighlightsProps)} />
      <TestimonialSlider key={sections[5].id} {...(sections[5].props as unknown as TestimonialSliderProps)} />
      <CredentialsBadgesSection key={sections[6].id} {...(sections[6].props as unknown as CredentialsBadgesSectionProps)} />
    </>
  );
}
