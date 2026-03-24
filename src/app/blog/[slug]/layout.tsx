import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { blogPosts } from "@/content/blog-posts";
import { blogSingleTemplateSections } from "@/content/blog-template-sections";
import { AboutHeroSection, type AboutHeroProps } from "@/public/sections/AboutHeroSection";
import { FinalCTASection, type FinalCTASectionProps } from "@/public/sections/FinalCTASection";

/** No static paths at build for `/blog/[slug]` — each post is rendered on demand (replace `blogPosts` with fetch/API when ready). */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Not found" };
  return post.metadata;
}

/**
 * Blog single shell: template sections from `blogSingleTemplateSections`, with
 * `{children}` where the first dynamic slot is (article body lives in page.tsx).
 */
export default async function BlogPostLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <>
      {post.jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(post.jsonLd) }}
        />
      ) : null}
      <AboutHeroSection key={blogSingleTemplateSections[0].id} {...(blogSingleTemplateSections[0].props as unknown as AboutHeroProps)} />
      {children}
      <FinalCTASection key={blogSingleTemplateSections[2].id} {...(blogSingleTemplateSections[2].props as unknown as FinalCTASectionProps)} />
    </>
  );
}
