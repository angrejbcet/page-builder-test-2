import type { SectionInstance } from "@/lib/types";

export const portfolioPageData = {
  title: "Portfolio",
  slug: "portfolio",
  sections: [
    {
      id: "d5720130-7dab-4667-857b-d7bfecb4f25a",
      sectionId: "aboutHero",
      props: {
        dark: true,
        height: "medium",
        headline: "Our Portfolio",
        subheadline: "Browse our latest your industry projects in Your City and beyond.",
        highlightText: "Recent Work",
        backgroundImage: "/images/about-hero.jpg"
      }
    },
    {
      id: "0c4d5f74-1165-4e72-800b-d18ad93c1edc",
      sectionId: "portfolioShowcase",
      variant: "split",
      props: {
        dark: false,
        images: [
          {
            id: "p1",
            alt: "Project 1",
            src: "/images/portfolio-1.jpg"
          },
          {
            id: "p2",
            alt: "Project 2",
            src: "/images/portfolio-2.jpg"
          },
          {
            id: "p3",
            alt: "Project 3",
            src: "/images/portfolio-3.jpg"
          },
          {
            id: "p4",
            alt: "Project 4",
            src: "/images/portfolio-4.jpg"
          }
        ],
        ctaLink: "/portfolio",
        ctaText: "View Gallery",
        heading: "Our",
        highlight: "Portfolio",
        description: "View our latest your industry projects. We keep it updated with our newest work!"
      }
    },
    {
      id: "59d6b2d6-ac20-4565-ae98-fa2cf19f1234",
      sectionId: "testimonialSlider",
      variant: "grid",
      props: {
        heading: "What Our Customers Say",
        reviews: [
          {
            id: "t1",
            quote: "Page Builder — 3/2/2026 did an incredible job. Professional, clean, and finished ahead of schedule. Highly recommend!",
            author: "Happy Customer",
            rating: 5,
            location: "Your City, ST"
          },
          {
            id: "t2",
            quote: "Outstanding work and great communication throughout. We'll definitely be using them again.",
            author: "Satisfied Client",
            rating: 5,
            location: "Your City, ST"
          },
          {
            id: "t3",
            quote: "This is our third project with Page Builder — 3/2/2026. Consistent quality every time.",
            author: "Returning Customer",
            rating: 5,
            location: "Your City, ST"
          }
        ],
        highlight: "Real Reviews"
      }
    },
    {
      id: "6c2be34f-ce5d-4800-b77d-3ed147897536",
      sectionId: "finalCta",
      variant: "image",
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
      }
    }
  ] as SectionInstance[]
};
