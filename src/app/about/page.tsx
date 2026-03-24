import type { Metadata } from "next";
import { AboutHeroSection, type AboutHeroProps } from "@/public/sections/AboutHeroSection";
import { AboutSection, type AboutSectionProps } from "@/public/sections/AboutSection";
import { TeamProfilesSection, type TeamProfilesSectionProps } from "@/public/sections/TeamProfilesSection";
import { FinalCTASection, type FinalCTASectionProps } from "@/public/sections/FinalCTASection";
import { MissionSection, type MissionProps } from "@/public/sections/MissionSection";
import { TimelineSection, type TimelineSectionProps } from "@/public/sections/TimelineSection";
import { CredentialsBadgesSection, type CredentialsBadgesSectionProps } from "@/public/sections/CredentialsBadgesSection";
import { TestimonialSlider, type TestimonialSliderProps } from "@/public/sections/TestimonialSlider";
import { aboutPageData, aboutPageMetadata, aboutPageJsonLd } from "@/content/pages/about";

export const metadata: Metadata = aboutPageMetadata;

export default function AboutPage() {
  const { sections } = aboutPageData;
  return (
    <>
      {aboutPageJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
        />
      ) : null}
      <AboutHeroSection key={sections[0].id} {...(sections[0].props as unknown as AboutHeroProps)} />
      <AboutSection key={sections[1].id} {...(sections[1].props as unknown as AboutSectionProps)} />
      <TeamProfilesSection key={sections[2].id} {...(sections[2].props as unknown as TeamProfilesSectionProps)} />
      <FinalCTASection key={sections[3].id} {...(sections[3].props as unknown as FinalCTASectionProps)} />
      <MissionSection key={sections[4].id} {...(sections[4].props as unknown as MissionProps)} />
      <TimelineSection key={sections[5].id} {...(sections[5].props as unknown as TimelineSectionProps)} />
      <CredentialsBadgesSection key={sections[6].id} {...(sections[6].props as unknown as CredentialsBadgesSectionProps)} />
      <TestimonialSlider key={sections[7].id} {...(sections[7].props as unknown as TestimonialSliderProps)} />
    </>
  );
}
