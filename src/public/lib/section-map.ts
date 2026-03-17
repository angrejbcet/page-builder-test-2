/**
 * Single source of truth for section component metadata.
 * Used by PageRenderer (lazy loading) and website-export-generator (imports/JSX).
 * Add new sections here only — no need to update PageRenderer or export generator.
 */

import React from "react";

export interface SectionMapEntry {
  path: string;
  component: string;
  propsType: string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type LazyLoader = () => Promise<{ default: React.ComponentType<any> }>;

interface SectionDef extends SectionMapEntry {
  id: string;
  loader: LazyLoader;
}

const SECTION_DEFINITIONS: SectionDef[] = [
  {
    id: "heroSlider",
    path: "@/public/sections/HeroSlider",
    component: "HeroSlider",
    propsType: "HeroSliderProps",
    loader: () => import("@/public/sections/HeroSlider").then((m) => ({ default: m.HeroSlider as React.ComponentType<any> }))
  },
  {
    id: "aboutHero",
    path: "@/public/sections/AboutHeroSection",
    component: "AboutHeroSection",
    propsType: "AboutHeroProps",
    loader: () => import("@/public/sections/AboutHeroSection").then((m) => ({ default: m.AboutHeroSection as React.ComponentType<any> }))
  },
  {
    id: "serviceHero",
    path: "@/public/sections/ServiceHero",
    component: "ServiceHero",
    propsType: "ServiceHeroProps",
    loader: () => import("@/public/sections/ServiceHero").then((m) => ({ default: m.ServiceHero as React.ComponentType<any> }))
  },
  {
    id: "aboutSection",
    path: "@/public/sections/AboutSection",
    component: "AboutSection",
    propsType: "AboutSectionProps",
    loader: () => import("@/public/sections/AboutSection").then((m) => ({ default: m.AboutSection as React.ComponentType<any> }))
  },
  {
    id: "foundationSection",
    path: "@/public/sections/FoundationSection",
    component: "FoundationSection",
    propsType: "FoundationProps",
    loader: () => import("@/public/sections/FoundationSection").then((m) => ({ default: m.FoundationSection as React.ComponentType<any> }))
  },
  {
    id: "seoHighlights",
    path: "@/public/sections/SEOHighlights",
    component: "SEOHighlights",
    propsType: "SEOHighlightsProps",
    loader: () => import("@/public/sections/SEOHighlights").then((m) => ({ default: m.SEOHighlights as React.ComponentType<any> }))
  },
  {
    id: "missionSection",
    path: "@/public/sections/MissionSection",
    component: "MissionSection",
    propsType: "MissionProps",
    loader: () => import("@/public/sections/MissionSection").then((m) => ({ default: m.MissionSection as React.ComponentType<any> }))
  },
  {
    id: "serviceCards",
    path: "@/public/sections/ServiceCards",
    component: "ServiceCards",
    propsType: "ServiceCardsProps",
    loader: () => import("@/public/sections/ServiceCards").then((m) => ({ default: m.ServiceCards as React.ComponentType<any> }))
  },
  {
    id: "offerRow",
    path: "@/public/sections/OfferRow",
    component: "OfferRow",
    propsType: "OfferRowProps",
    loader: () => import("@/public/sections/OfferRow").then((m) => ({ default: m.OfferRow as React.ComponentType<any> }))
  },
  {
    id: "statsSection",
    path: "@/public/sections/StatsSection",
    component: "StatsSection",
    propsType: "StatsSectionProps",
    loader: () => import("@/public/sections/StatsSection").then((m) => ({ default: m.StatsSection as React.ComponentType<any> }))
  },
  {
    id: "portfolioShowcase",
    path: "@/public/sections/PortfolioShowcase",
    component: "PortfolioShowcase",
    propsType: "PortfolioShowcaseProps",
    loader: () => import("@/public/sections/PortfolioShowcase").then((m) => ({ default: m.PortfolioShowcase as React.ComponentType<any> }))
  },
  {
    id: "testimonialSlider",
    path: "@/public/sections/TestimonialSlider",
    component: "TestimonialSlider",
    propsType: "TestimonialSliderProps",
    loader: () => import("@/public/sections/TestimonialSlider").then((m) => ({ default: m.TestimonialSlider as React.ComponentType<any> }))
  },
  {
    id: "partnersSection",
    path: "@/public/sections/PartnersSection",
    component: "PartnersSection",
    propsType: "PartnersSectionProps",
    loader: () => import("@/public/sections/PartnersSection").then((m) => ({ default: m.PartnersSection as React.ComponentType<any> }))
  },
  {
    id: "blogCardsSection",
    path: "@/public/sections/BlogCardsSection",
    component: "BlogCardsSection",
    propsType: "BlogCardsProps",
    loader: () => import("@/public/sections/BlogCardsSection").then((m) => ({ default: m.BlogCardsSection as React.ComponentType<any> }))
  },
  {
    id: "blogPostContent",
    path: "@/public/sections/BlogPostContentSection",
    component: "BlogPostContentSection",
    propsType: "BlogPostContentProps",
    loader: () => import("@/public/sections/BlogPostContentSection").then((m) => ({ default: m.BlogPostContentSection as React.ComponentType<any> }))
  },
  {
    id: "faqSection",
    path: "@/public/sections/FAQSection",
    component: "FAQSection",
    propsType: "FAQSectionProps",
    loader: () => import("@/public/sections/FAQSection").then((m) => ({ default: m.FAQSection as React.ComponentType<any> }))
  },
  {
    id: "locationFaqSection",
    path: "@/public/sections/LocationFAQSection",
    component: "LocationFAQSection",
    propsType: "LocationFAQSectionProps",
    loader: () => import("@/public/sections/LocationFAQSection").then((m) => ({ default: m.LocationFAQSection as React.ComponentType<any> }))
  },
  {
    id: "serviceAreaAccordion",
    path: "@/public/sections/ServiceAreaAccordionSection",
    component: "ServiceAreaAccordionSection",
    propsType: "ServiceAreaAccordionProps",
    loader: () => import("@/public/sections/ServiceAreaAccordionSection").then((m) => ({ default: m.ServiceAreaAccordionSection as React.ComponentType<any> }))
  },
  {
    id: "serviceAreaMap",
    path: "@/public/sections/ServiceAreaMapSection",
    component: "ServiceAreaMapSection",
    propsType: "ServiceAreaProps",
    loader: () => import("@/public/sections/ServiceAreaMapSection").then((m) => ({ default: m.ServiceAreaMapSection as React.ComponentType<any> }))
  },
  {
    id: "directionalLinks",
    path: "@/public/sections/DirectionalLinksSection",
    component: "DirectionalLinksSection",
    propsType: "DirectionalLinksSectionProps",
    loader: () => import("@/public/sections/DirectionalLinksSection").then((m) => ({ default: m.DirectionalLinksSection as React.ComponentType<any> }))
  },
  {
    id: "finalCta",
    path: "@/public/sections/FinalCTASection",
    component: "FinalCTASection",
    propsType: "FinalCTASectionProps",
    loader: () => import("@/public/sections/FinalCTASection").then((m) => ({ default: m.FinalCTASection as React.ComponentType<any> }))
  },
  {
    id: "introText",
    path: "@/public/sections/IntroTextSection",
    component: "IntroTextSection",
    propsType: "IntroTextSectionProps",
    loader: () => import("@/public/sections/IntroTextSection").then((m) => ({ default: m.IntroTextSection as React.ComponentType<any> }))
  },
  {
    id: "iconColumns",
    path: "@/public/sections/IconColumnsSection",
    component: "IconColumnsSection",
    propsType: "IconColumnsSectionProps",
    loader: () => import("@/public/sections/IconColumnsSection").then((m) => ({ default: m.IconColumnsSection as React.ComponentType<any> }))
  },
  {
    id: "processSteps",
    path: "@/public/sections/ProcessStepsSection",
    component: "ProcessStepsSection",
    propsType: "ProcessStepsSectionProps",
    loader: () => import("@/public/sections/ProcessStepsSection").then((m) => ({ default: m.ProcessStepsSection as React.ComponentType<any> }))
  },
  {
    id: "credentialsBadges",
    path: "@/public/sections/CredentialsBadgesSection",
    component: "CredentialsBadgesSection",
    propsType: "CredentialsBadgesSectionProps",
    loader: () => import("@/public/sections/CredentialsBadgesSection").then((m) => ({ default: m.CredentialsBadgesSection as React.ComponentType<any> }))
  },
  {
    id: "checklistSection",
    path: "@/public/sections/ChecklistSection",
    component: "ChecklistSection",
    propsType: "ChecklistSectionProps",
    loader: () => import("@/public/sections/ChecklistSection").then((m) => ({ default: m.ChecklistSection as React.ComponentType<any> }))
  },
  {
    id: "contactForm",
    path: "@/public/sections/ContactFormSection",
    component: "ContactFormSection",
    propsType: "ContactFormSectionProps",
    loader: () => import("@/public/sections/ContactFormSection").then((m) => ({ default: m.ContactFormSection as React.ComponentType<any> }))
  },
  {
    id: "teamProfiles",
    path: "@/public/sections/TeamProfilesSection",
    component: "TeamProfilesSection",
    propsType: "TeamProfilesSectionProps",
    loader: () => import("@/public/sections/TeamProfilesSection").then((m) => ({ default: m.TeamProfilesSection as React.ComponentType<any> }))
  },
  {
    id: "businessHours",
    path: "@/public/sections/BusinessHoursSection",
    component: "BusinessHoursSection",
    propsType: "BusinessHoursSectionProps",
    loader: () => import("@/public/sections/BusinessHoursSection").then((m) => ({ default: m.BusinessHoursSection as React.ComponentType<any> }))
  },
  {
    id: "couponCards",
    path: "@/public/sections/CouponCardsSection",
    component: "CouponCardsSection",
    propsType: "CouponCardsSectionProps",
    loader: () => import("@/public/sections/CouponCardsSection").then((m) => ({ default: m.CouponCardsSection as React.ComponentType<any> }))
  },
  {
    id: "pricingSection",
    path: "@/public/sections/PricingSection",
    component: "PricingSection",
    propsType: "PricingSectionProps",
    loader: () => import("@/public/sections/PricingSection").then((m) => ({ default: m.PricingSection as React.ComponentType<any> }))
  },
  {
    id: "relatedServices",
    path: "@/public/sections/RelatedServicesSection",
    component: "RelatedServicesSection",
    propsType: "RelatedServicesSectionProps",
    loader: () => import("@/public/sections/RelatedServicesSection").then((m) => ({ default: m.RelatedServicesSection as React.ComponentType<any> }))
  },
  {
    id: "beforeAfter",
    path: "@/public/sections/BeforeAfterSection",
    component: "BeforeAfterSection",
    propsType: "BeforeAfterSectionProps",
    loader: () => import("@/public/sections/BeforeAfterSection").then((m) => ({ default: m.BeforeAfterSection as React.ComponentType<any> }))
  },
  {
    id: "timeline",
    path: "@/public/sections/TimelineSection",
    component: "TimelineSection",
    propsType: "TimelineSectionProps",
    loader: () => import("@/public/sections/TimelineSection").then((m) => ({ default: m.TimelineSection as React.ComponentType<any> }))
  },
  {
    id: "communitySection",
    path: "@/public/sections/CommunitySection",
    component: "CommunitySection",
    propsType: "CommunitySectionProps",
    loader: () => import("@/public/sections/CommunitySection").then((m) => ({ default: m.CommunitySection as React.ComponentType<any> }))
  },
  {
    id: "socialLinks",
    path: "@/public/sections/SocialLinksSection",
    component: "SocialLinksSection",
    propsType: "SocialLinksSectionProps",
    loader: () => import("@/public/sections/SocialLinksSection").then((m) => ({ default: m.SocialLinksSection as React.ComponentType<any> }))
  },
  {
    id: "poiSection",
    path: "@/public/sections/POISection",
    component: "POISection",
    propsType: "POISectionProps",
    loader: () => import("@/public/sections/POISection").then((m) => ({ default: m.POISection as React.ComponentType<any> }))
  },
  {
    id: "legalContent",
    path: "@/public/sections/LegalContentSection",
    component: "LegalContentSection",
    propsType: "LegalContentSectionProps",
    loader: () => import("@/public/sections/LegalContentSection").then((m) => ({ default: m.LegalContentSection as React.ComponentType<any> }))
  },
  {
    id: "customEmbed",
    path: "@/public/sections/CustomEmbedSection",
    component: "CustomEmbedSection",
    propsType: "CustomEmbedSectionProps",
    loader: () => import("@/public/sections/CustomEmbedSection").then((m) => ({ default: m.CustomEmbedSection as React.ComponentType<any> }))
  },
];
/* eslint-enable @typescript-eslint/no-explicit-any */

export const SECTION_MAP: Record<string, SectionMapEntry> = Object.fromEntries(
  SECTION_DEFINITIONS.map((d) => [d.id, { path: d.path, component: d.component, propsType: d.propsType }]),
);

export const sectionLoaders: Record<string, LazyLoader> = Object.fromEntries(
  SECTION_DEFINITIONS.map((d) => [d.id, d.loader]),
);
