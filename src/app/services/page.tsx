"use client";

import React from "react";
import { servicesPageData } from "@/content/pages/services";
import { AboutHeroSection, type AboutHeroProps } from "@/public/sections/AboutHeroSection";
import { ServiceCards, type ServiceCardsProps } from "@/public/sections/ServiceCards";
import { FinalCTASection, type FinalCTASectionProps } from "@/public/sections/FinalCTASection";
import { IntroTextSection, type IntroTextSectionProps } from "@/public/sections/IntroTextSection";
import { TestimonialSlider, type TestimonialSliderProps } from "@/public/sections/TestimonialSlider";
import { CredentialsBadgesSection, type CredentialsBadgesSectionProps } from "@/public/sections/CredentialsBadgesSection";

export default function ServicesPage() {
  const { sections } = servicesPageData;

  return (
    <>
      <AboutHeroSection {...(sections[0].props as unknown as AboutHeroProps)} />
      <ServiceCards {...(sections[1].props as unknown as ServiceCardsProps)} />
      <FinalCTASection {...(sections[2].props as unknown as FinalCTASectionProps)} />
      <IntroTextSection {...(sections[3].props as unknown as IntroTextSectionProps)} />
      <TestimonialSlider {...(sections[4].props as unknown as TestimonialSliderProps)} />
      <CredentialsBadgesSection {...(sections[5].props as unknown as CredentialsBadgesSectionProps)} />
    </>
  );
}
