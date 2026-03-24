import type { SectionInstance } from "@/lib/types";

export const blogSingleTemplateSections = [
  {
    id: "7430d6ab-62c6-41a5-b6dc-ba400c3b304d",
    props: {
      dark: true,
      height: "medium",
      headline: "About Page Builder — 3/2/2026",
      subheadline: "Proudly serving Your City and surrounding communities.",
      highlightText: "Our Story",
      backgroundImage: "/images/about-hero.jpg"
    },
    sectionId: "aboutHero"
  },
  {
    id: "dynamic-blog-content",
    props: {},
    variant: "minimal",
    sectionId: "dynamicBlogPageContent"
  },
  {
    id: "f3043b5d-9078-4405-8911-88effcac01a2",
    props: {
      heading: "Ready for Expert Your Industry Service in Your City?",
      cta1Link: "tel:5550000000",
      cta1Text: "Call Now: (555) 000-0000",
      cta2Link: "/contact",
      cta2Text: "Schedule Service",
      cta3Link: "/contact",
      cta3Text: "Get Free Estimate",
      description: "Join hundreds of satisfied Your City customers who trust Page Builder — 3/2/2026. Call us today for fast, reliable service.",
      backgroundImage: "/images/cta-bg.jpg"
    },
    sectionId: "finalCta"
  }
] as SectionInstance[];
