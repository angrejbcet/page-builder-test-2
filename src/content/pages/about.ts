import type { SectionInstance } from "@/lib/types";

export const aboutPageData = {
  title: "About",
  slug: "about",
  sections: [
    {
      id: "4dfd927a-cc99-4896-9b76-c9124976c268",
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
      id: "ae95513f-dbfe-4f18-a772-b61f7c88d50e",
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
      id: "f5ccbfda-c403-41c4-95d4-909e3b11e2d4",
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
      id: "d6d0c763-1e5d-4f4b-905b-9fe562760b11",
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
      id: "d6c35151-cae5-4c33-8b8f-ef24445e2a61",
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
      id: "d0d83f1d-cdcf-435d-9060-01f8038d46a7",
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
      id: "5507dd21-74c0-44f0-a930-fb5d035cc2d5",
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
      id: "bef1f4a5-208b-4a5b-a98a-47cec38d5df3",
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
};
