import type { Metadata } from "next";
import type { SectionInstance, StaticPageData } from "@/lib/types";

export const city_your_cityPageData = {
  title: "Your City Services",
  slug: "city-your-city",
  pageType: "city",
  sections: [
    {
      id: "2c86df83-7ddd-4410-a0dd-825056ebd1e8",
      sectionId: "serviceHero",
      variant: "standard",
      props: {
        dark: false,
        image: "/images/service-hero.jpg",
        headline: "Your Industry in Your City",
        offerText: "Serving Your Area",
        subheadline: "Page Builder — 3/2/2026 provides professional your industry services to Your City residents and businesses."
      }
    },
    {
      id: "03fa7271-7a74-4c2b-966b-d72d220c8b64",
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
      id: "3f35e42a-feb7-40d3-af13-537f9b9483e6",
      sectionId: "locationFaqSection",
      variant: "grid",
      props: {
        dark: false,
        faqs: [
          {
            answer: "We offer service one in Your City and surrounding areas.",
            question: "What services do you offer in Your City?"
          },
          {
            answer: "Call us or fill out our online form. We'll arrange a convenient time to discuss your project.",
            question: "How do I schedule a consultation in Your City?"
          }
        ],
        heading: "Your City",
        highlight: "FAQ"
      }
    },
    {
      id: "9749999c-9c3d-45ab-8122-2178aabf10b1",
      sectionId: "finalCta",
      variant: "dark",
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
      id: "2ac4c411-8a7f-494c-8755-e24634a1158d",
      sectionId: "seoHighlights",
      variant: "cards",
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
      id: "61c7d0e0-be87-4b35-a4e3-f9818531132a",
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
      id: "ae701d79-f227-4378-b060-d465a8e5a987",
      sectionId: "credentialsBadges",
      variant: "minimal",
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

export const city_your_cityPageMetadata = {
  title: "Your City Services",
  description: "PCE NextJS Website",
  openGraph: {
    title: "Your City Services",
    description: "PCE NextJS Website"
  }
} satisfies Metadata;

export const city_your_cityPageJsonLd = {"@context":"https://schema.org","@type":"LocalBusiness","name":"Page Builder — 3/2/2026","description":"Page Builder — 3/2/2026 provides professional your industry services in Your City, ST.","url":"https://yourbusiness.com","telephone":"(555) 000-0000","email":"info@yourbusiness.com","address":{"@type":"PostalAddress","streetAddress":"123 Main St","addressLocality":"Your City","addressRegion":"ST","postalCode":"00000"},"areaServed":[{"@type":"City","name":"Your City"}]} as Record<string, unknown> | null;
