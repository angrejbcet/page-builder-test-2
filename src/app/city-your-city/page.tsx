import type { Metadata } from "next";
import { ServiceHero, type ServiceHeroProps } from "@/public/sections/ServiceHero";
import { ServiceCards, type ServiceCardsProps } from "@/public/sections/ServiceCards";
import { LocationFAQSection, type LocationFAQSectionProps } from "@/public/sections/LocationFAQSection";
import { FinalCTASection, type FinalCTASectionProps } from "@/public/sections/FinalCTASection";
import { SEOHighlights, type SEOHighlightsProps } from "@/public/sections/SEOHighlights";
import { TestimonialSlider, type TestimonialSliderProps } from "@/public/sections/TestimonialSlider";
import { CredentialsBadgesSection, type CredentialsBadgesSectionProps } from "@/public/sections/CredentialsBadgesSection";
import { city_your_cityPageData, city_your_cityPageMetadata, city_your_cityPageJsonLd } from "@/content/pages/city-your-city";

export const metadata: Metadata = city_your_cityPageMetadata;

export default function CityYourCityPage() {
  const { sections } = city_your_cityPageData;
  return (
    <>
      {city_your_cityPageJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(city_your_cityPageJsonLd) }}
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
