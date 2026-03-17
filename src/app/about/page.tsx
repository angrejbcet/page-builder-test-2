"use client";

import React from "react";
import { aboutPageData } from "@/content/pages/about";
import { AboutHeroSection, type AboutHeroProps } from "@/public/sections/AboutHeroSection";
import { AboutSection, type AboutSectionProps } from "@/public/sections/AboutSection";
import { TeamProfilesSection, type TeamProfilesSectionProps } from "@/public/sections/TeamProfilesSection";
import { FinalCTASection, type FinalCTASectionProps } from "@/public/sections/FinalCTASection";
import { MissionSection, type MissionProps } from "@/public/sections/MissionSection";
import { TimelineSection, type TimelineSectionProps } from "@/public/sections/TimelineSection";
import { CredentialsBadgesSection, type CredentialsBadgesSectionProps } from "@/public/sections/CredentialsBadgesSection";
import { TestimonialSlider, type TestimonialSliderProps } from "@/public/sections/TestimonialSlider";

export default function AboutPage() {
  const { sections } = aboutPageData;

  return (
    <>
      <AboutHeroSection {...(sections[0].props as unknown as AboutHeroProps)} />
      <AboutSection {...(sections[1].props as unknown as AboutSectionProps)} />
      <TeamProfilesSection {...(sections[2].props as unknown as TeamProfilesSectionProps)} />
      <FinalCTASection {...(sections[3].props as unknown as FinalCTASectionProps)} />
      <MissionSection {...(sections[4].props as unknown as MissionProps)} />
      <TimelineSection {...(sections[5].props as unknown as TimelineSectionProps)} />
      <CredentialsBadgesSection {...(sections[6].props as unknown as CredentialsBadgesSectionProps)} />
      <TestimonialSlider {...(sections[7].props as unknown as TestimonialSliderProps)} />
    </>
  );
}
