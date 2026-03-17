"use client";

import React from "react";
import { homePageData } from "@/content/pages/home";
import { HeroSlider, type HeroSliderProps } from "@/public/sections/HeroSlider";
import { OfferRow, type OfferRowProps } from "@/public/sections/OfferRow";
import { AboutSection, type AboutSectionProps } from "@/public/sections/AboutSection";
import { ServiceCards, type ServiceCardsProps } from "@/public/sections/ServiceCards";
import { StatsSection, type StatsSectionProps } from "@/public/sections/StatsSection";
import { SEOHighlights, type SEOHighlightsProps } from "@/public/sections/SEOHighlights";
import { FoundationSection, type FoundationProps } from "@/public/sections/FoundationSection";
import { PortfolioShowcase, type PortfolioShowcaseProps } from "@/public/sections/PortfolioShowcase";
import { TestimonialSlider, type TestimonialSliderProps } from "@/public/sections/TestimonialSlider";
import { BlogCardsSection, type BlogCardsProps } from "@/public/sections/BlogCardsSection";
import { FAQSection, type FAQSectionProps } from "@/public/sections/FAQSection";
import { ServiceAreaAccordionSection, type ServiceAreaAccordionProps } from "@/public/sections/ServiceAreaAccordionSection";
import { ServiceAreaMapSection, type ServiceAreaProps } from "@/public/sections/ServiceAreaMapSection";

export default function HomePage() {
  const { sections } = homePageData;

  return (
    <>
      <HeroSlider {...(sections[0].props as unknown as HeroSliderProps)} />
      <OfferRow {...(sections[1].props as unknown as OfferRowProps)} />
      <AboutSection {...(sections[2].props as unknown as AboutSectionProps)} />
      <ServiceCards {...(sections[3].props as unknown as ServiceCardsProps)} />
      <StatsSection {...(sections[4].props as unknown as StatsSectionProps)} />
      <SEOHighlights {...(sections[5].props as unknown as SEOHighlightsProps)} />
      <FoundationSection {...(sections[6].props as unknown as FoundationProps)} />
      <PortfolioShowcase {...(sections[7].props as unknown as PortfolioShowcaseProps)} />
      <TestimonialSlider {...(sections[8].props as unknown as TestimonialSliderProps)} />
      <BlogCardsSection {...(sections[9].props as unknown as BlogCardsProps)} />
      <FAQSection {...(sections[10].props as unknown as FAQSectionProps)} />
      <ServiceAreaAccordionSection {...(sections[11].props as unknown as ServiceAreaAccordionProps)} />
      <ServiceAreaMapSection {...(sections[12].props as unknown as ServiceAreaProps)} />
    </>
  );
}
