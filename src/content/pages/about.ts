import type { Metadata } from "next";
import type { SectionInstance, StaticPageData } from "@/lib/types";

export const aboutPageData = {
  title: "About",
  slug: "about",
  pageType: "about",
  sections: [
    {
      id: "8715eca1-0652-45a0-8a44-d99c34fc2f61",
      sectionId: "aboutHero",
      props: {
        dark: true,
        height: "medium",
        headline: "About Page Builder — 3/2/2026",
        subheadline: "Proudly serving Your City and surrounding communities since day one.",
        highlightText: "Our Story",
        backgroundImage: "/images/about-hero.jpg"
      }
    },
    {
      id: "db520c9b-9b3a-404c-9b47-aa4ea11c862e",
      sectionId: "aboutSection",
      variant: "imageRight",
      props: {
        image: "/images/about-image.jpg",
        ctaLink: "/contact",
        ctaText: "Contact Us",
        heading: "Who We Are",
        highlight: "Our Mission",
        description: [
          "Page Builder — 3/2/2026 was founded with a simple goal: deliver the highest quality your industry services in Your City, ST.",
          "Our team of experienced professionals is committed to exceeding expectations on every project, big or small."
        ]
      }
    },
    {
      id: "ff9acd80-31e2-44d4-85ed-25d7b2dab462",
      sectionId: "teamProfiles",
      variant: "compact",
      props: {
        dark: false,
        heading: "Meet Our",
        members: [
          {
            id: "owner-1",
            bio: "With years of experience in your industry, our founder built Page Builder — 3/2/2026 on the principles of quality, integrity, and exceptional customer service.",
            name: "Owner Name",
            image: "",
            title: "Founder & CEO"
          }
        ],
        highlight: "Team"
      }
    },
    {
      id: "5b72ec77-c1d8-4739-ac58-18d9ee1eea8f",
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
      id: "8a72c4d1-966b-4292-93ec-12613e237882",
      sectionId: "missionSection",
      variant: "card",
      props: {
        dark: false,
        quote: "Our mission at Page Builder — 3/2/2026 is to deliver unmatched quality and service to every client, every time.",
        author: "Page Builder — 3/2/2026",
        values: [
          {
            icon: "award",
            title: "Quality",
            description: "We hold ourselves to the highest standards in everything we do."
          },
          {
            icon: "shield",
            title: "Integrity",
            description: "Honest, transparent service you can trust every time."
          },
          {
            icon: "clock",
            title: "Reliability",
            description: "On time, on budget, and always exceeding expectations."
          }
        ],
        heading: "Our Mission",
        backgroundImage: "/images/mission-bg.jpg"
      }
    },
    {
      id: "f26ad5b0-ccd2-4363-bb1b-1d3e5f2f69c4",
      sectionId: "timeline",
      variant: "singleSide",
      props: {
        dark: false,
        heading: "Our Journey",
        highlight: "& Achievements",
        milestones: [
          {
            id: "ms-1",
            year: "2010",
            title: "Company Founded",
            description: "Page Builder — 3/2/2026 was established in Your City."
          },
          {
            id: "ms-2",
            year: "2015",
            title: "Expanded Service Area",
            description: "Grew to serve multiple cities in the region."
          },
          {
            id: "ms-3",
            year: "2020",
            title: "100+ 5-Star Reviews",
            description: "Reached a major milestone in customer satisfaction."
          },
          {
            id: "ms-4",
            year: "2025",
            title: "Industry Leader",
            description: "Recognized as a top your industry provider."
          }
        ]
      }
    },
    {
      id: "d275dcde-3443-4637-92b6-88bf2c735cba",
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
      id: "78fde3e1-29e6-4a29-81c5-c408869af070",
      sectionId: "testimonialSlider",
      variant: "slider",
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

export const aboutPageMetadata = {
  title: "About",
  description: "PCE NextJS Website",
  openGraph: {
    title: "About",
    description: "PCE NextJS Website"
  }
} satisfies Metadata;

export const aboutPageJsonLd = {"@context":"https://schema.org","@type":"AboutPage","name":"About","description":""} as Record<string, unknown> | null;
