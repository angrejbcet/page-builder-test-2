import { notFound } from "next/navigation";
import { blogPosts } from "@/content/blog-posts";
import { blogSingleTemplateSections } from "@/content/blog-template-sections";
import {
  firstBlogContentSlot,
  mergeBlogPostIntoTemplateSections,
} from "@/lib/blog-template-merge";
import { BlogPostContentSection, type BlogPostContentProps } from "@/public/sections/BlogPostContentSection";


/** Article body for `{children}` in ./layout.tsx (one `BlogPostContentSection`; shell sections live in the layout). On-demand render only — see `dynamic` in ./layout.tsx. */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const merged = mergeBlogPostIntoTemplateSections(blogSingleTemplateSections, post);
  const contentSlot = firstBlogContentSlot(merged);
  if (!contentSlot) notFound();
  return (
    <>
      <BlogPostContentSection
        key={contentSlot.id}
        {...(contentSlot.props as unknown as BlogPostContentProps)}
      />
    </>
  );
}
