import type { BlogPost } from "@/lib/types";

export type BlogCardData = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  link: string;
};

/** URL prefix for single-post routes (matches blog index slug), e.g. "/blog" */
export const blogPostUrlPrefix = "/blog";

/** Maps blog-posts.ts entries to BlogCardsSection props. Omit limit for all posts (blog index). */
export function blogPostsToCardData(posts: BlogPost[], limit?: number): BlogCardData[] {
  const sorted = [...posts].sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : 0));
  const picked = limit === undefined ? sorted : sorted.slice(0, limit);
  return picked.map((post, i) => {
    const prefix = blogPostUrlPrefix;
    const link = (prefix ? `${prefix}/${post.slug}` : `/${post.slug}`).replace(/\/+/g, "/");
    return {
      id: post.slug || `card-${i}`,
      title: post.title,
      excerpt: post.excerpt,
      image: post.coverImage || "/images/blog-1.jpg",
      date: new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      link: link || `/${post.slug}`,
    };
  });
}
