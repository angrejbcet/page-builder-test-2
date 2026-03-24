import type { Metadata } from "next";
import type { SectionInstance, StaticPageData } from "@/lib/types";

export const county_landing_1774028265560PageData = {
  title: "County Landing Page",
  slug: "county-landing-1774028265560",
  pageType: "county-landing",
  sections: [
    {
      id: "ede2b419-b8fb-49d7-8e4f-2a3f8919f364",
      sectionId: "aboutHero",
      props: {
        dark: true,
        height: "medium",
        headline: "About Page Builder — 3/2/2026",
        subheadline: "Proudly serving Your City and surrounding communities.",
        highlightText: "Our Story",
        backgroundImage: "/images/about-hero.jpg"
      }
    },
    {
      id: "e5242cbf-1ed6-43c6-a6ec-9443d7b274c4",
      sectionId: "serviceAreaAccordion",
      props: {
        dark: false,
        items: [
          {
            id: "sa1",
            city: "Your City",
            links: [
              {
                href: "/locations/your-city",
                label: "Your City Services"
              }
            ],
            details: "Professional service one for Your City residents and businesses.",
            neighborhoods: []
          }
        ],
        heading: "Areas We",
        highlight: "Serve",
        description: "Page Builder — 3/2/2026 proudly serves Your City and surrounding areas."
      }
    },
    {
      id: "11f616ee-bb0f-49a2-8c1c-a7e881906f30",
      sectionId: "finalCta",
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
      id: "382dc75f-3fdf-4f84-8072-ffb96764f630",
      sectionId: "serviceCards",
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
      id: "09a27854-0e7b-4f34-b2f2-ba978b2f2370",
      sectionId: "serviceAreaMap",
      props: {
        dark: false,
        zoom: 14,
        email: "info@yourbusiness.com",
        phone: "(555) 000-0000",
        address: "123 Main St, Your City, ST 00000",
        heading: "Proudly Serving Your City & Surrounding Areas",
        coordinates: {
          lat: 38.3396,
          lng: -122.7011
        },
        description: "Located in Your City, we are perfectly positioned to serve the entire region."
      }
    }
  ] as SectionInstance[]
} satisfies StaticPageData;

export const county_landing_1774028265560PageMetadata = {
  title: "County Landing Page",
  description: "PCE NextJS Website",
  openGraph: {
    title: "County Landing Page",
    description: "PCE NextJS Website"
  }
} satisfies Metadata;

export const county_landing_1774028265560PageJsonLd = {"@context":"https://schema.org","@type":"LocalBusiness","name":"Page Builder — 3/2/2026","description":"Page Builder — 3/2/2026 provides professional your industry services in Your City, ST.","url":"https://yourbusiness.com","telephone":"(555) 000-0000","email":"info@yourbusiness.com","address":{"@type":"PostalAddress","streetAddress":"123 Main St","addressLocality":"Your City","addressRegion":"ST","postalCode":"00000"},"areaServed":[{"@type":"City","name":"Your City"}]} as Record<string, unknown> | null;
