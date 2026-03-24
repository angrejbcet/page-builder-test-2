import type { Metadata } from "next";
import type { SectionInstance, StaticPageData } from "@/lib/types";

export const blogPageData = {
  title: "Blog",
  slug: "blog",
  pageType: "blog",
  sections: [
    {
      id: "504fe751-99e7-4650-ad46-9e5e32daf80f",
      sectionId: "aboutHero",
      props: {
        dark: true,
        height: "medium",
        headline: "Our Blog",
        subheadline: "Tips, insights, and updates from Page Builder — 3/2/2026.",
        highlightText: "Latest News",
        backgroundImage: "/images/about-hero.jpg"
      }
    },
    {
      id: "8b8629a4-458a-4613-bbda-5b00ec0899b1",
      sectionId: "blogCardsSection",
      variant: "carousel",
      props: {
        dark: false,
        ctaLink: "/blog",
        ctaText: "Read All Articles",
        heading: "Latest from Our",
        highlight: "Blog",
        cards: []
      }
    }
  ] as SectionInstance[]
} satisfies StaticPageData;

export const blogPageMetadata = {
  title: "Blog",
  description: "PCE NextJS Website",
  openGraph: {
    title: "Blog",
    description: "PCE NextJS Website"
  }
} satisfies Metadata;

export const blogPageJsonLd = {"@context":"https://schema.org","@type":"Blog","name":"Page Builder — 3/2/2026 Blog","description":"Your Industry tips, guides, and insights from Page Builder — 3/2/2026.","publisher":{"@type":"Organization","name":"Page Builder — 3/2/2026"}} as Record<string, unknown> | null;
