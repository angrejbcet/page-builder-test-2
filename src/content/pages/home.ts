import type { SectionInstance } from "@/lib/types";

export const homePageData = {
  title: "Home",
  slug: "home",
  sections: [
    {
      id: "bab87211-7dad-4329-9aa1-0bda0e9e61f6",
      sectionId: "heroSlider",
      props: {
        slides: [
          {
            id: "slide-1",
            image: "https://agency-forge.s3.us-east-2.amazonaws.com/images/cache/e2f02c2c2973fe15.png",
            cta1Link: "/contact",
            cta1Text: "Get a Free Estimate",
            cta2Link: "tel:5551234567",
            cta2Text: "Call Us Now",
            headline: "Transform Your Space with Rohnert Park's Premier Painters",
            subheadline: "Flawless interior, exterior, and commercial painting that enhances your property's value and beauty."
          },
          {
            id: "slide-2",
            image: "https://agency-forge.s3.us-east-2.amazonaws.com/images/cache/e7998a708ddc4b30.png",
            cta1Link: "/portfolio",
            cta1Text: "View Our Exterior Work",
            cta2Link: "/contact",
            cta2Text: "Request a Free Quote",
            headline: "Lasting Curb Appeal & Protection",
            subheadline: "Our expert exterior painting stands up to the California sun, protecting your investment for years to come."
          }
        ]
      }
    },
    {
      id: "5ab96c12-ada8-422a-a19e-a8cae280c766",
      sectionId: "offerRow",
      props: {
        image: "https://agency-forge.s3.us-east-2.amazonaws.com/images/cache/95f9d33f3c95a95b.png",
        ctaLink: "/contact",
        ctaText: "Claim My 10% Off",
        heading: "A Fresh Coat & A Fresh Deal",
        description: "As a welcome to new clients in the Rohnert Park area, book your project with Left Coast Painting and enjoy a special discount on us.",
        subheadline: "Get 10% Off Your First Painting Project!"
      }
    },
    {
      id: "0fa519fc-e0a9-48a6-8de0-f79e1da2eb00",
      sectionId: "aboutSection",
      props: {
        image: "https://agency-forge.s3.us-east-2.amazonaws.com/images/cache/12ac7c920f2e1312.png",
        ctaLink: "/about",
        ctaText: "Discover the Left Coast Difference",
        heading: "Rohnert Park's Trusted Name in Painting",
        highlight: "Quality Craftsmanship, Local Pride",
        description: [
          {
            value: "Left Coast Painting was founded on a simple principle: to provide our Rohnert Park neighbors with superior painting services backed by honesty and integrity. We are more than just painters; we are local artisans dedicated to perfecting our craft and transforming homes and businesses throughout our community."
          },
          {
            value: "Our commitment to you includes using premium materials, maintaining meticulous work sites, and ensuring clear communication from the first call to the final walkthrough. Your complete satisfaction is the benchmark of our success."
          }
        ]
      }
    },
    {
      id: "2c218479-1019-4f8c-838f-62d7ef8734d5",
      sectionId: "serviceCards",
      props: {
        cards: [
          {
            id: "interior-painting",
            link: "/services/interior-painting",
            image: "https://agency-forge.s3.us-east-2.amazonaws.com/images/cache/adc221a6a870a609.png",
            title: "Interior Painting",
            ctaText: "Revitalize Your Home",
            description: "Breathe new life into your living spaces. Our meticulous process ensures crisp lines, even coverage, and a flawless finish for your walls, ceilings, and trim."
          },
          {
            id: "exterior-painting",
            link: "/services/exterior-painting",
            image: "https://agency-forge.s3.us-east-2.amazonaws.com/images/cache/69b35d1459c79af1.png",
            title: "Exterior Painting",
            ctaText: "Protect Your Exterior",
            description: "Boost curb appeal and protect your property from the elements. We use durable, high-quality paints designed to withstand the California climate and look beautiful for years."
          },
          {
            id: "commercial-painting",
            link: "/services/commercial-painting",
            image: "https://agency-forge.s3.us-east-2.amazonaws.com/images/cache/a260ad4ce32ee7b8.png",
            title: "Commercial Painting",
            ctaText: "Elevate Your Business",
            description: "Create an inviting and professional atmosphere for your Rohnert Park business. We handle projects of all sizes, minimizing disruption to your operations."
          }
        ],
        heading: "Our Painting Services",
        highlight: "For Every Surface"
      }
    },
    {
      id: "6a97ac36-89cd-4447-bfd3-5d728856eada",
      sectionId: "statsSection",
      props: {
        image: "https://agency-forge.s3.us-east-2.amazonaws.com/images/cache/a7b133576757abc3.png",
        stats: [
          {
            id: "stat-1",
            label: "Years of Experience",
            value: "15+"
          },
          {
            id: "stat-2",
            label: "Projects Completed",
            value: "500+"
          },
          {
            id: "stat-3",
            label: "5-Star Reviews",
            value: "200+"
          },
          {
            id: "stat-4",
            label: "Customer Satisfaction",
            value: "99%"
          }
        ],
        ctaLink: "/contact",
        ctaText: "Get Your Free Estimate",
        heading: "Why Rohnert Park Homeowners & Businesses Choose Us",
        tagline: "The Left Coast Standard"
      }
    },
    {
      id: "b3e75d53-477e-41ed-baa7-d65b56545c1b",
      sectionId: "seoHighlights",
      props: {
        dark: false,
        sections: [
          {
            id: "seo-1",
            image: "https://agency-forge.s3.us-east-2.amazonaws.com/images/cache/d249b02ed1f82577.png",
            content: "As Rohnert Park painters, we understand the local climate's impact. We choose the right materials and apply proven techniques to ensure your paint job not only looks stunning but also provides lasting protection against the sun and weather.",
            ctaLink: "/about",
            ctaText: "Learn About Our Process",
            heading: "Local Expertise for Lasting California Finishes",
            imagePosition: "right"
          },
          {
            id: "seo-2",
            image: "https://agency-forge.s3.us-east-2.amazonaws.com/images/cache/c67c5ea132df83c5.png",
            content: "Your property is our priority. We guarantee a clean, organized work site from start to finish and a meticulous final inspection to ensure every detail meets our high standards. That's the Left Coast Painting promise.",
            ctaLink: "/contact",
            ctaText: "Request Your Free Quote",
            heading: "Our Commitment to a Flawless Finish",
            imagePosition: "left"
          }
        ]
      }
    },
    {
      id: "0a4d8464-ce37-46c3-a4f5-02c0f4abe36e",
      sectionId: "foundationSection",
      props: {
        image: "https://agency-forge.s3.us-east-2.amazonaws.com/images/cache/0af597e9ff9f8300.png",
        content: [
          {
            value: "Let's discuss your project. Our experts provide a detailed, transparent estimate and help you choose the perfect colors and finishes for your Rohnert Park home or business. There's no pressure, just professional advice to help you get started."
          }
        ],
        ctaLink: "/contact",
        ctaText: "Schedule My Free Consultation",
        heading: "Start with a Clear Vision & A Free Estimate",
        highlight: "No-Obligation Consultation",
        imagePosition: "right"
      }
    },
    {
      id: "3f1d7d96-6c1e-4a6e-b4b6-85d97ceda9ae",
      sectionId: "portfolioShowcase",
      props: {
        images: [
          {
            id: "p1",
            alt: "Professionally painted residential exterior in Rohnert Park, CA",
            src: "https://agency-forge.s3.us-east-2.amazonaws.com/images/cache/6a8088567e8ea583.png"
          },
          {
            id: "p2",
            alt: "Bright and modern living room with freshly painted walls",
            src: "https://agency-forge.s3.us-east-2.amazonaws.com/images/cache/fd13ec6d2d08e90c.png"
          },
          {
            id: "p3",
            alt: "Exterior of a commercial building painted by Left Coast Painting",
            src: "https://agency-forge.s3.us-east-2.amazonaws.com/images/cache/1da9c438d6707476.png"
          },
          {
            id: "p4",
            alt: "Close-up of clean paint lines on interior trim",
            src: "https://agency-forge.s3.us-east-2.amazonaws.com/images/cache/52396a18a3a7b33b.png"
          }
        ],
        ctaLink: "/portfolio",
        ctaText: "View Full Gallery",
        heading: "See Our Work In",
        highlight: "Rohnert Park",
        description: "From charming residential exteriors to sleek commercial interiors, our work speaks for itself. Explore our gallery of recently completed painting projects in your community."
      }
    },
    {
      id: "e4370675-23de-40f2-aba8-17abcf37f5d1",
      sectionId: "testimonialSlider",
      props: {
        heading: "Hear From Your Neighbors",
        reviews: [
          {
            id: "t1",
            quote: "Left Coast Painting completely transformed our home's exterior. The crew was professional, incredibly tidy, and the final result exceeded our expectations. They truly are the best painters in the area!",
            author: "Sarah L.",
            rating: 5,
            location: "Rohnert Park, CA"
          },
          {
            id: "t2",
            quote: "We hired them for our new office space and couldn't be happier. They worked around our schedule, finished on time, and the quality is impeccable. Great communication from the initial quote to the final walkthrough.",
            author: "David M.",
            rating: 5,
            location: "Rohnert Park, CA"
          },
          {
            id: "t3",
            quote: "The attention to detail was amazing. They prepped everything so carefully and the lines are perfectly crisp. Our interior looks brand new. I've already recommended them to two friends!",
            author: "Jennifer P.",
            rating: 5,
            location: "Rohnert Park, CA"
          }
        ],
        highlight: "Rohnert Park Reviews"
      }
    },
    {
      id: "c3eb3714-8abb-46d4-9781-a1c218f35ddf",
      sectionId: "blogCardsSection",
      props: {
        cards: [
          {
            id: "b1",
            title: "Your Industry Trends in ST for 2026",
            excerpt: "Discover what's new in the your industry industry this year and how it affects Your City homeowners.",
            image: "/images/blog-1.jpg",
            date: "Mar 17, 2026",
            link: "/blog-industry-trends"
          },
          {
            id: "b2",
            title: "Tips for Choosing the Right Your Industry Provider in Your City",
            excerpt: "Expert advice on what to look for when hiring a your industry professional in Your City.",
            image: "/images/blog-1.jpg",
            date: "Mar 6, 2026",
            link: "/blog-tips-choosing-provider"
          }
        ],
        ctaLink: "/blog",
        ctaText: "More Painting Pro-Tips",
        heading: "Pro Tips & Inspiration",
        highlight: "From Our Blog"
      }
    },
    {
      id: "a7c0af5f-d2b0-4c15-a33b-dd155b706daf",
      sectionId: "faqSection",
      props: {
        items: [
          {
            id: "faq1",
            answer: "We are based in Rohnert Park and proudly serve the surrounding Sonoma County communities. If you're unsure if you're in our service area, just give us a call!",
            question: "What areas do you serve besides Rohnert Park?"
          },
          {
            id: "faq2",
            answer: "Our free estimates include a detailed on-site assessment, a transparent breakdown of labor and material costs, and a clear project timeline. There are no hidden fees or obligations.",
            question: "What's included in a free estimate?"
          },
          {
            id: "faq3",
            answer: "Proper prep is key to a lasting finish. Our process includes thorough cleaning, sanding, patching any imperfections, and applying high-quality primer to ensure optimal paint adhesion and a smooth result.",
            question: "How do you prepare surfaces before painting?"
          },
          {
            id: "faq4",
            answer: "Absolutely. Left Coast Painting is a fully licensed, bonded, and insured painting contractor in the state of California for your complete peace of mind and protection.",
            question: "Are you fully licensed and insured?"
          }
        ],
        heading: "Your Questions, Answered",
        highlight: "Painting FAQs"
      }
    },
    {
      id: "0fe32cf4-318f-415a-aa81-6419aff3be67",
      sectionId: "serviceAreaAccordion",
      props: {
        items: [
          {
            id: "sa1",
            city: "Rohnert Park",
            details: "Providing comprehensive interior, exterior, and commercial painting services to our valued neighbors and businesses right here in our hometown."
          }
        ],
        heading: "Our Sonoma County",
        highlight: "Service Areas",
        description: "While we're based in Rohnert Park, our expert painting crews proudly serve homes and businesses throughout the greater Sonoma County area. Find your city below."
      }
    },
    {
      id: "7b9cb91a-c6f7-4a0a-82c0-c3f807a834b1",
      sectionId: "serviceAreaMap",
      props: {
        email: "support@leftcoastpaint.com",
        phone: "5551234567",
        address: "12352 Main st, Rohnert Park, CA 94928",
        heading: "Contact Your Local Rohnert Park Painters",
        description: "Ready to get started on your painting project? Reach out to our friendly team today for a free, no-obligation estimate. We're here to answer your questions and bring your vision to life."
      }
    }
  ] as SectionInstance[]
};
