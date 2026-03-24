import type { Metadata } from "next";
import { blogPosts } from "@/content/blog-posts";
import { blogPostsToCardData } from "@/content/blog-utils";
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
import { homePageData, homePageMetadata, homePageJsonLd } from "@/content/pages/home";

export const metadata: Metadata = homePageMetadata;

export default function HomePage() {
  const { sections: pageSections } = homePageData;
  const cards = blogPostsToCardData(blogPosts, 3);
  const sections = pageSections.map((instance) =>
    instance.sectionId === "blogCardsSection"
      ? { ...instance, props: { ...instance.props, cards } }
      : instance,
  );
  return (
    <>
      {homePageJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageJsonLd) }}
        />
      ) : null}
      <HeroSlider key={sections[0].id} {...(sections[0].props as unknown as HeroSliderProps)} />
      <OfferRow key={sections[1].id} {...(sections[1].props as unknown as OfferRowProps)} />
      <AboutSection key={sections[2].id} {...(sections[2].props as unknown as AboutSectionProps)} />
      <ServiceCards key={sections[3].id} {...(sections[3].props as unknown as ServiceCardsProps)} />
      <StatsSection key={sections[4].id} {...(sections[4].props as unknown as StatsSectionProps)} />
      <SEOHighlights key={sections[5].id} {...(sections[5].props as unknown as SEOHighlightsProps)} />
      <FoundationSection key={sections[6].id} {...(sections[6].props as unknown as FoundationProps)} />
      <PortfolioShowcase key={sections[7].id} {...(sections[7].props as unknown as PortfolioShowcaseProps)} />
      <TestimonialSlider key={sections[8].id} {...(sections[8].props as unknown as TestimonialSliderProps)} />
      <BlogCardsSection key={sections[9].id} {...(sections[9].props as unknown as BlogCardsProps)} />
      <FAQSection key={sections[10].id} {...(sections[10].props as unknown as FAQSectionProps)} />
      <ServiceAreaAccordionSection key={sections[11].id} {...(sections[11].props as unknown as ServiceAreaAccordionProps)} />
      <ServiceAreaMapSection key={sections[12].id} {...(sections[12].props as unknown as ServiceAreaProps)} />
    </>
  );
}
