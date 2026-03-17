import type { SectionInstance } from "@/lib/types";

export const blogPageData = {
  title: "Blog",
  slug: "blog",
  sections: [
    {
      id: "8cd509a0-1cd6-42ba-a776-7e8a9a839912",
      sectionId: "aboutHero",
      props: {
        headline: "Our Blog",
        subheadline: "Tips, insights, and updates from Page Builder — 3/2/2026.",
        highlightText: "Latest News",
        backgroundImage: "/images/about-hero.jpg"
      }
    },
    {
      id: "9d28f1f6-bf65-4328-98a1-f7a56be6d84b",
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
        ctaText: "Read All Articles",
        heading: "Latest from Our",
        highlight: "Blog"
      }
    }
  ] as SectionInstance[]
};
