import type { Metadata } from "next";
import { blogPosts } from "@/content/blog-posts";
import { blogPostsToCardData } from "@/content/blog-utils";
import { AboutHeroSection, type AboutHeroProps } from "@/public/sections/AboutHeroSection";
import { BlogCardsSection, type BlogCardsProps } from "@/public/sections/BlogCardsSection";
import { blogPageData, blogPageMetadata, blogPageJsonLd } from "@/content/pages/blog";

export const metadata: Metadata = blogPageMetadata;

export default function BlogPage() {
  const { sections: pageSections } = blogPageData;
  const cards = blogPostsToCardData(blogPosts, undefined);
  const sections = pageSections.map((instance) =>
    instance.sectionId === "blogCardsSection"
      ? { ...instance, props: { ...instance.props, cards } }
      : instance,
  );
  return (
    <>
      {blogPageJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPageJsonLd) }}
        />
      ) : null}
      <AboutHeroSection key={sections[0].id} {...(sections[0].props as unknown as AboutHeroProps)} />
      <BlogCardsSection key={sections[1].id} {...(sections[1].props as unknown as BlogCardsProps)} />
    </>
  );
}
