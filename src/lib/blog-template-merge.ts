import type { BlogPost, SectionInstance } from "@/lib/types";

const BLOG_SINGLE_SLOT_IDS = new Set<string>(["dynamicBlogPageContent", "blogPostContent"]);

/** Applies the current post from blog-posts.ts onto blog-single template slot sections. */
export function mergeBlogPostIntoTemplateSections(
  templateSections: SectionInstance[],
  post: BlogPost,
): SectionInstance[] {
  return templateSections.map((instance) => {
    if (!BLOG_SINGLE_SLOT_IDS.has(instance.sectionId)) {
      return instance;
    }
    return {
      ...instance,
      props: {
        ...instance.props,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        coverImage: post.coverImage || "/images/blog-1.jpg",
        date: post.date,
        author: post.author,
        categories: post.categories ?? [],
        tags: post.tags ?? [],
        content: post.content ?? "",
        dark: false,
      },
    };
  });
}

/** First blog-single content slot after merge (template should have one). */
export function firstBlogContentSlot(merged: SectionInstance[]): SectionInstance | null {
  const found = merged.find((instance) => BLOG_SINGLE_SLOT_IDS.has(instance.sectionId));
  return found ?? null;
}
