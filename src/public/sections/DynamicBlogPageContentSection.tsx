"use client";

import React from "react";
import { BlogPostContentSection } from "./BlogPostContentSection";
import type { BlogPostContentProps } from "./BlogPostContentSection";


export type DynamicBlogPageContentProps = BlogPostContentProps;

/**
 * Dynamic Blog Page Content — placeholder for the Blog Single template slot (`dynamicBlogPageContent`).
 * Shows a placeholder when empty; delegates to BlogPostContentSection when content is present.
 */
export const DynamicBlogPageContentSection: React.FC<DynamicBlogPageContentProps> = (props) => {
  const hasContent = !!(props?.title || props?.content);

  if (!hasContent) {
    return (
      <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-100 px-8 py-16 text-center dark:border-zinc-500 dark:bg-zinc-800">
        <div>
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            Dynamic Blog Page Content
          </p>
          <p className="mt-1.5 text-xs text-zinc-600 dark:text-zinc-400">
            When editing a blog post, the article will display in this area.
          </p>
        </div>
      </div>
    );
  }

  return (
    <BlogPostContentSection {...props} />
  );
};
