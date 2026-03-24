import type { Metadata } from "next";
import { AboutHeroSection, type AboutHeroProps } from "@/public/sections/AboutHeroSection";
import { ServiceAreaAccordionSection, type ServiceAreaAccordionProps } from "@/public/sections/ServiceAreaAccordionSection";
import { FinalCTASection, type FinalCTASectionProps } from "@/public/sections/FinalCTASection";
import { ServiceCards, type ServiceCardsProps } from "@/public/sections/ServiceCards";
import { ServiceAreaMapSection, type ServiceAreaProps } from "@/public/sections/ServiceAreaMapSection";
import { county_landing_1774028271443PageData, county_landing_1774028271443PageMetadata, county_landing_1774028271443PageJsonLd } from "@/content/pages/county-landing-1774028271443";

export const metadata: Metadata = county_landing_1774028271443PageMetadata;

export default function CountyLanding1774028271443Page() {
  const { sections } = county_landing_1774028271443PageData;
  return (
    <>
      {county_landing_1774028271443PageJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(county_landing_1774028271443PageJsonLd) }}
        />
      ) : null}
      <AboutHeroSection key={sections[0].id} {...(sections[0].props as unknown as AboutHeroProps)} />
      <ServiceAreaAccordionSection key={sections[1].id} {...(sections[1].props as unknown as ServiceAreaAccordionProps)} />
      <FinalCTASection key={sections[2].id} {...(sections[2].props as unknown as FinalCTASectionProps)} />
      <ServiceCards key={sections[3].id} {...(sections[3].props as unknown as ServiceCardsProps)} />
      <ServiceAreaMapSection key={sections[4].id} {...(sections[4].props as unknown as ServiceAreaProps)} />
    </>
  );
}
