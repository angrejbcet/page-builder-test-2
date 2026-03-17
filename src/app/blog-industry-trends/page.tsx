"use client";

import React from "react";
import { blog_industry_trendsPageData } from "@/content/pages/blog-industry-trends";
import { BlogPostContentSection, type BlogPostContentProps } from "@/public/sections/BlogPostContentSection";
import { AboutHeroSection, type AboutHeroProps } from "@/public/sections/AboutHeroSection";

export default function BlogIndustryTrendsPage() {
  const { sections } = blog_industry_trendsPageData;

  return (
    <>
      <BlogPostContentSection {...(sections[0].props as unknown as BlogPostContentProps)} />
      <AboutHeroSection {...(sections[1].props as unknown as AboutHeroProps)} />
    </>
  );
}
