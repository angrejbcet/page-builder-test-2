"use client";

import React from "react";
import { blog_tips_choosing_providerPageData } from "@/content/pages/blog-tips-choosing-provider";
import { BlogPostContentSection, type BlogPostContentProps } from "@/public/sections/BlogPostContentSection";

export default function BlogTipsChoosingProviderPage() {
  const { sections } = blog_tips_choosing_providerPageData;

  return (
    <>
      <BlogPostContentSection {...(sections[0].props as unknown as BlogPostContentProps)} />
    </>
  );
}
