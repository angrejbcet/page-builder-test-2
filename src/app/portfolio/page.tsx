"use client";

import React from "react";
import { portfolioPageData } from "@/content/pages/portfolio";
import { AboutHeroSection, type AboutHeroProps } from "@/public/sections/AboutHeroSection";
import { PortfolioShowcase, type PortfolioShowcaseProps } from "@/public/sections/PortfolioShowcase";
import { TestimonialSlider, type TestimonialSliderProps } from "@/public/sections/TestimonialSlider";
import { FinalCTASection, type FinalCTASectionProps } from "@/public/sections/FinalCTASection";

export default function PortfolioPage() {
  const { sections } = portfolioPageData;

  return (
    <>
      <AboutHeroSection {...(sections[0].props as unknown as AboutHeroProps)} />
      <PortfolioShowcase {...(sections[1].props as unknown as PortfolioShowcaseProps)} />
      <TestimonialSlider {...(sections[2].props as unknown as TestimonialSliderProps)} />
      <FinalCTASection {...(sections[3].props as unknown as FinalCTASectionProps)} />
    </>
  );
}
