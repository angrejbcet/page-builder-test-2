import type { Metadata } from "next";
import type { SectionInstance, StaticPageData } from "@/lib/types";

export const city_custom_1774020957838PageData = {
  title: "New City Services",
  slug: "city-custom-1774020957838",
  pageType: "city",
  sections: [
    {
      id: "3e10013a-e169-4407-853a-0d2d86bc5150",
      sectionId: "serviceHero",
      variant: "split",
      props: {
        dark: false,
        image: "/images/service-hero.jpg",
        headline: "Your Industry in New City",
        offerText: "Serving Your Area",
        subheadline: "Page Builder — 3/2/2026 provides professional your industry services to New City residents and businesses."
      }
    },
    {
      id: "13a1a063-59da-4b8e-aed7-3e484996f9f0",
      sectionId: "serviceCards",
      variant: "compact",
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
      id: "a84d283f-d7eb-4f3a-83e3-264187510dad",
      sectionId: "locationFaqSection",
      variant: "list",
      props: {
        dark: false,
        faqs: [
          {
            answer: "We offer service one in New City and surrounding areas.",
            question: "What services do you offer in New City?"
          },
          {
            answer: "Call us or fill out our online form. We'll arrange a convenient time to discuss your project.",
            question: "How do I schedule a consultation in New City?"
          }
        ],
        heading: "New City",
        highlight: "FAQ"
      }
    },
    {
      id: "6a24bf04-802a-40e5-9c8f-e2d3b33b369d",
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
    },
    {
      id: "fed382d3-752c-4899-8492-afe1584ec943",
      sectionId: "seoHighlights",
      variant: "stacked",
      props: {
        dark: false,
        columns: 2,
        heading: "",
        sections: [
          {
            id: "seo-1",
            image: "/images/seo-1.jpg",
            content: "Working with local experts in Your City ensures you get professionals who understand the area. We deliver results that exceed expectations and stand the test of time.",
            ctaLink: "/about",
            ctaText: "Learn More",
            heading: "Why Choose Page Builder — 3/2/2026?",
            imagePosition: "right"
          },
          {
            id: "seo-2",
            image: "/images/seo-2.jpg",
            content: "We use industry-leading tools and practices to ensure every project meets the highest standards.",
            ctaLink: "/contact",
            ctaText: "Contact Us",
            heading: "Quality You Can Count On",
            imagePosition: "left"
          }
        ],
        imageFill: false,
        subheading: ""
      }
    },
    {
      id: "847ecb48-d660-43fd-92b2-7dcd75e1e445",
      sectionId: "testimonialSlider",
      variant: "featured",
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
      id: "8e644ee6-64bd-4f06-b2c7-c62eeecbd801",
      sectionId: "credentialsBadges",
      variant: "banner",
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

export const city_custom_1774020957838PageMetadata = {
  title: "New City Services",
  description: "PCE NextJS Website",
  openGraph: {
    title: "New City Services",
    description: "PCE NextJS Website"
  }
} satisfies Metadata;

export const city_custom_1774020957838PageJsonLd = {"@context":"https://schema.org","@type":"LocalBusiness","name":"Page Builder — 3/2/2026","description":"Page Builder — 3/2/2026 provides professional your industry services in Your City, ST.","url":"https://yourbusiness.com","telephone":"(555) 000-0000","email":"info@yourbusiness.com","address":{"@type":"PostalAddress","streetAddress":"123 Main St","addressLocality":"Your City","addressRegion":"ST","postalCode":"00000"},"areaServed":[{"@type":"City","name":"Your City"}]} as Record<string, unknown> | null;
