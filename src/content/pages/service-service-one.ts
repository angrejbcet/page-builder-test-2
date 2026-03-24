import type { Metadata } from "next";
import type { SectionInstance, StaticPageData } from "@/lib/types";

export const service_service_onePageData = {
  title: "Service One",
  slug: "service-service-one",
  pageType: "service",
  sections: [
    {
      id: "ac360ec8-f4c7-4de0-95ff-49ef44d11789",
      sectionId: "serviceHero",
      variant: "split",
      props: {
        dark: false,
        image: "/images/service-hero.jpg",
        headline: "Service One in Your City, ST",
        offerText: "Free Estimates Available",
        subheadline: "Professional service one services for Your City and surrounding areas."
      }
    },
    {
      id: "4947782a-e930-4b3f-a6b5-5d0c86289a8d",
      sectionId: "introText",
      variant: "centered",
      props: {
        dark: false,
        content: "Page Builder — 3/2/2026 provides expert service one services to Your City and surrounding communities. With a commitment to quality and customer satisfaction, we deliver results that exceed expectations."
      }
    },
    {
      id: "3f2638e1-b4a3-43c3-a168-efb05db0a3cf",
      sectionId: "seoHighlights",
      variant: "cards",
      props: {
        dark: false,
        columns: 2,
        heading: "",
        sections: [
          {
            id: "seo-svc-1",
            image: "/images/seo-1.jpg",
            content: "Page Builder — 3/2/2026 brings years of experience in service one. We use quality materials and proven techniques to deliver results that last.",
            ctaLink: "/contact",
            ctaText: "Get a Quote",
            heading: "Why Choose Us for Service One?",
            imagePosition: "right"
          },
          {
            id: "seo-svc-2",
            image: "/images/seo-2.jpg",
            content: "From initial consultation to final walkthrough, we keep you informed every step of the way. Our process is designed for quality, efficiency, and your complete satisfaction.",
            ctaLink: "/about",
            ctaText: "Learn More",
            heading: "Our Service One Process",
            imagePosition: "left"
          }
        ],
        imageFill: false,
        subheading: ""
      }
    },
    {
      id: "418de05a-9b6b-455c-b176-7c81204c279a",
      sectionId: "checklistSection",
      variant: "grid",
      props: {
        dark: false,
        items: [
          {
            id: "c-1",
            text: "Thorough inspection and assessment"
          },
          {
            id: "c-2",
            text: "Professional-grade materials and equipment"
          },
          {
            id: "c-3",
            text: "Expert installation or repair"
          },
          {
            id: "c-4",
            text: "Complete cleanup after service"
          },
          {
            id: "c-5",
            text: "Written warranty on all work"
          },
          {
            id: "c-6",
            text: "Service throughout Your City and surrounding areas"
          }
        ],
        heading: "What's Included in Our",
        highlight: "Service"
      }
    },
    {
      id: "afc1d145-799b-4395-8ce6-800ac11e2a2d",
      sectionId: "faqSection",
      variant: "accordion",
      props: {
        dark: false,
        items: [
          {
            id: "sfaq1",
            answer: "Costs vary by project scope. Contact us for a free, detailed estimate.",
            question: "How much does service one cost?"
          },
          {
            id: "sfaq2",
            answer: "Timelines depend on the project size. We'll provide a clear schedule during your consultation.",
            question: "How long does service one take?"
          },
          {
            id: "sfaq3",
            answer: "Yes, all our work comes with a satisfaction guarantee.",
            question: "Do you offer a warranty?"
          }
        ],
        heading: "Service One FAQ",
        highlight: "Common Questions",
        subheading: "Quick answers to our most common questions. For more detailed information, check out our blog resources."
      }
    },
    {
      id: "2bb99d9a-e15d-4ae5-a4aa-5a53ef8d905a",
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
      id: "5e6019af-0aeb-4d9c-92a5-008d507a60f6",
      sectionId: "processSteps",
      variant: "vertical",
      props: {
        dark: false,
        steps: [
          {
            id: "step-1",
            title: "Contact Us",
            description: "Reach out by phone or online to discuss your project needs and schedule a consultation."
          },
          {
            id: "step-2",
            title: "Free Assessment",
            description: "Our expert team evaluates your situation and provides a detailed, no-obligation estimate."
          },
          {
            id: "step-3",
            title: "Professional Service",
            description: "Our skilled technicians complete the work efficiently, with attention to every detail."
          },
          {
            id: "step-4",
            title: "Quality Guarantee",
            description: "We stand behind our work with a satisfaction guarantee. Your happiness is our priority."
          }
        ],
        heading: "Our Your Industry",
        highlight: "Process"
      }
    },
    {
      id: "f8b5a705-61db-4168-8faa-35b6486ddc07",
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
    },
    {
      id: "ec1c5ef7-e5c6-486d-bf8b-965bed88fd8f",
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
    }
  ] as SectionInstance[]
} satisfies StaticPageData;

export const service_service_onePageMetadata = {
  title: "Service One",
  description: "PCE NextJS Website",
  openGraph: {
    title: "Service One",
    description: "PCE NextJS Website"
  }
} satisfies Metadata;

export const service_service_onePageJsonLd = {"@context":"https://schema.org","@type":"Service","name":"Service One","description":"Professional service one services by Page Builder — 3/2/2026 in Your City, ST.","provider":{"@type":"LocalBusiness","name":"Page Builder — 3/2/2026","telephone":"(555) 000-0000"},"areaServed":{"@type":"City","name":"Your City"}} as Record<string, unknown> | null;
