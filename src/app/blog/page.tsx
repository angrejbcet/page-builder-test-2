"use client";

import React from "react";
import { blogPageData } from "@/content/pages/blog";
import { AboutHeroSection, type AboutHeroProps } from "@/public/sections/AboutHeroSection";
import { BlogCardsSection, type BlogCardsProps } from "@/public/sections/BlogCardsSection";

export default function BlogPage() {
  const { sections } = blogPageData;

  return (
    <>
      <AboutHeroSection {...(sections[0].props as unknown as AboutHeroProps)} />
      <BlogCardsSection {...(sections[1].props as unknown as BlogCardsProps)} />
    </>
  );
}
