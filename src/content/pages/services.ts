import type { Metadata } from "next";
import type { SectionInstance, StaticPageData } from "@/lib/types";

export const servicesPageData = {
  title: "Services",
  slug: "services",
  pageType: "services-landing",
  sections: [
    {
      id: "f6b9d823-0a81-4351-a61f-8f18d5883508",
      sectionId: "aboutHero",
      props: {
        dark: true,
        height: "medium",
        headline: "Our Your Industry Services",
        subheadline: "Professional your industry services tailored to your needs in Your City and beyond.",
        highlightText: "What We Offer",
        backgroundImage: "/images/about-hero.jpg"
      }
    },
    {
      id: "154a2e4e-34dc-4cc8-bcd2-d619fc1bc195",
      sectionId: "serviceCards",
      variant: "grid",
      props: {
        cards: [
          {
            id: "service-one",
            link: "/services/service-one",
            image: "/images/services-service-one.jpg",
            title: "Service One",
            ctaText: "Learn More",
            description: "Professional service one services for Your City and surrounding areas."
          }
        ],
        heading: "Our Professional Services",
        highlight: "What We Do"
      }
    },
    {
      id: "955ef7f4-269c-43ee-b52d-ecba0486564c",
      sectionId: "finalCta",
      variant: "brand",
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
    },
    {
      id: "cab7cb60-0e47-4fb4-a699-c365c691f730",
      sectionId: "introText",
      variant: "leftAligned",
      props: {
        dark: false,
        content: "Page Builder — 3/2/2026 provides expert your industry services to Your City and surrounding communities. With a commitment to quality and customer satisfaction, we deliver results that exceed expectations."
      }
    },
    {
      id: "1ff760ed-3b6f-463f-bae2-a3575e0bb2bb",
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
      id: "a14b21fb-fbb3-4d58-827d-ee2915c997c1",
      sectionId: "credentialsBadges",
      variant: "grid",
      props: {
        dark: true,
        badges: [
          {
            id: "b-1",
            type: "licensed",
            label: "Licensed",
            value: "ST Licensed"
          },
          {
            id: "b-2",
            type: "insured",
            label: "Insured",
            value: "Fully Insured"
          },
          {
            id: "b-3",
            type: "bonded",
            label: "Bonded",
            value: "Bonded"
          },
          {
            id: "b-4",
            type: "years",
            label: "Experience",
            value: "10+ Years"
          },
          {
            id: "b-5",
            type: "certified",
            label: "BBB Rating",
            value: "A+ Rated"
          },
          {
            id: "b-6",
            type: "certified",
            label: "Satisfaction",
            value: "Guaranteed"
          }
        ],
        heading: "Licensed, Insured",
        highlight: "& Certified"
      }
    }
  ] as SectionInstance[]
} satisfies StaticPageData;

export const servicesPageMetadata = {
  title: "Services",
  description: "PCE NextJS Website",
  openGraph: {
    title: "Services",
    description: "PCE NextJS Website"
  }
} satisfies Metadata;

export const servicesPageJsonLd = null as Record<string, unknown> | null;
