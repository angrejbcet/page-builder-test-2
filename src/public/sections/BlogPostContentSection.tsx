"use client";

import React, { useEffect, useRef, useState } from "react";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import { cn } from "@/public/lib/utils";

export interface BlogPostContentProps {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
  categories?: string[];
  tags?: string[];
  content: string;
  variant?: "standard" | "sidebarToc" | "minimal" | string;
  dark?: boolean;
  elementStyles?: Record<string, string>;
}

function addIdsToHeadings(html: string): string {
  let counter = 0;
  return html.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (_match, tag, attrs, text) => {
    const id = `heading-${counter++}`;
    return `<${tag}${attrs} id="${id}">${text}</${tag}>`;
  });
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractToc(html: string): TocItem[] {
  const items: TocItem[] = [];
  const regex = /<(h[23])[^>]*id="([^"]*)"[^>]*>(.*?)<\/\1>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    items.push({
      id: m[2],
      text: m[3].replace(/<[^>]*>/g, ""),
      level: m[1] === "h2" ? 2 : 3,
    });
  }
  return items;
}

/* ------------------------------------------------------------------ */
/*  Shared types for variant renderers                                 */
/* ------------------------------------------------------------------ */

interface VariantRenderProps {
  title: string;
  coverImage: string;
  author: string;
  categories: string[];
  tags: string[];
  dark: boolean;
  contentWithIds: string;
  tocItems: TocItem[];
  activeId: string;
  formattedDate: string;
  hasRealImage: boolean;
  elementStyles?: Record<string, string>;
}

/* ------------------------------------------------------------------ */
/*  TOC list (reused across variants)                                  */
/* ------------------------------------------------------------------ */

function TocList({ tocItems, activeId, dark, minimal }: { tocItems: TocItem[]; activeId: string; dark: boolean; minimal?: boolean }) {
  if (tocItems.length <= 2) return null;

  if (minimal) {
    return (
      <nav className={cn("mb-8 border-l-2 pl-4", dark ? "border-primary/30" : "border-primary/20")}>
        <ul className="space-y-1.5">
          {tocItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(
                  "block text-sm transition-colors",
                  item.level === 3 && "pl-3",
                  activeId === item.id
                    ? "font-semibold text-primary"
                    : dark ? "text-gray-400 hover:text-primary" : "text-gray-600 hover:text-primary",
                )}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav className={cn(
      "mb-8 rounded-xl border p-4 @min-[768px]:p-6",
      dark ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-100",
    )}>
      <h3 className={cn("mb-3 text-sm font-bold uppercase tracking-wider", dark ? "text-gray-400" : "text-gray-500")}>
        Table of Contents
      </h3>
      <ul className="space-y-1.5">
        {tocItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block text-sm transition-colors",
                item.level === 3 && "pl-4",
                activeId === item.id
                  ? "font-semibold text-primary"
                  : dark ? "text-gray-400 hover:text-primary" : "text-gray-600 hover:text-primary",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Prose article body                                                 */
/* ------------------------------------------------------------------ */

function ArticleBody({ contentWithIds, dark, elementStyles }: { contentWithIds: string; dark: boolean; elementStyles?: Record<string, string> }) {
  return (
    <article
      className={cn(
        "blog-content prose prose-lg max-w-none prose-headings:font-bold prose-h2:mt-10 prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        dark
          ? "prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-300 prose-strong:text-gray-100 prose-headings:text-white"
          : "prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900",
      )}
      style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
      dangerouslySetInnerHTML={{ __html: contentWithIds }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Tags bar                                                           */
/* ------------------------------------------------------------------ */

function TagsBar({ tags, dark }: { tags: string[]; dark: boolean }) {
  if (tags.length === 0) return null;
  return (
    <div className={cn("mt-10 border-t pt-6", dark ? "border-white/10" : "border-gray-200")}>
      <div className="flex flex-wrap items-center gap-2">
        <Tag className={cn("h-4 w-4", dark ? "text-gray-500" : "text-gray-400")} />
        {tags.map((tag) => (
          <span
            key={tag}
            className={cn("rounded-full px-3 py-1 text-sm", dark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary")}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA Banner (shared)                                                */
/* ------------------------------------------------------------------ */

function CtaBanner({ elementStyles }: { elementStyles?: Record<string, string> }) {
  return (
    <section className="bg-primary px-4 @min-[768px]:px-8 py-12 @min-[768px]:py-16" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}>
      <div className="mx-auto max-w-[1325px] text-center">
        <h2 className="mb-4 text-2xl @min-[768px]:text-3xl @min-[1024px]:text-4xl font-bold text-white">
          Ready to Start Your Project?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-base @min-[768px]:text-lg text-white/80">
          Get a free, no-obligation estimate for your next project.
        </p>
        <span className="inline-flex cursor-pointer items-center rounded-md bg-white px-8 @min-[768px]:px-10 py-3 @min-[768px]:py-4 font-bold text-primary transition-colors hover:bg-secondary hover:text-white">
          Get Your Free Estimate
          <ArrowRight className="ml-2 h-5 w-5" />
        </span>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar TOC Variant                                                */
/* ------------------------------------------------------------------ */

const SidebarTocVariant: React.FC<VariantRenderProps> = ({
  title,
  coverImage,
  author,
  categories,
  tags,
  dark,
  contentWithIds,
  tocItems,
  activeId,
  formattedDate,
  hasRealImage,
  elementStyles,
}) => (
  <div>
    {/* Hero — same as standard */}
    <section className="relative flex min-h-[300px] @min-[768px]:min-h-[400px] items-end overflow-hidden">
      {hasRealImage ? (
        <img src={coverImage} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-secondary" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-secondary/30" />
      <div className="relative z-10 mx-auto w-full max-w-[1325px] px-4 @min-[768px]:px-8 pb-12 @min-[768px]:pb-16 pt-24 @min-[768px]:pt-32">
        {categories.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <span key={cat} className="rounded-full bg-primary px-3 py-1 text-xs @min-[768px]:text-sm font-semibold text-white">
                {cat}
              </span>
            ))}
          </div>
        )}
        <h1 className="mb-6 max-w-4xl text-2xl @min-[768px]:text-3xl @min-[1024px]:text-5xl font-bold leading-tight text-white" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 @min-[768px]:gap-6 text-sm text-gray-400">
          <span className="flex items-center gap-2"><User className="h-4 w-4" />{author}</span>
          <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{formattedDate}</span>
        </div>
      </div>
    </section>

    {/* Content — sidebar TOC layout */}
    <section className={cn("px-4 @min-[768px]:px-8 py-12 @min-[768px]:py-16", dark ? "bg-secondary" : "bg-slate-50")}>
      <div className="mx-auto max-w-[1100px]">
        <div className="@min-[1024px]:grid @min-[1024px]:grid-cols-[280px_1fr] @min-[1024px]:gap-8">
          {/* Sidebar TOC */}
          <aside className="mb-8 @min-[1024px]:mb-0">
            <div className="@min-[1024px]:sticky @min-[1024px]:top-24">
              <nav className={cn(
                "rounded-xl border p-4 @min-[768px]:p-6",
                dark ? "bg-white/5 border-white/10" : "bg-white border-gray-100 shadow-sm",
              )}>
                <h3 className={cn("mb-3 text-sm font-bold uppercase tracking-wider", dark ? "text-gray-400" : "text-gray-500")}>
                  Table of Contents
                </h3>
                <ul className="space-y-1.5">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={cn(
                          "block text-sm transition-colors",
                          item.level === 3 && "pl-4",
                          activeId === item.id
                            ? "font-semibold text-primary"
                            : dark ? "text-gray-400 hover:text-primary" : "text-gray-600 hover:text-primary",
                        )}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <div className={cn(
            "rounded-2xl p-6 @min-[768px]:p-8 @min-[1024px]:p-12 shadow-lg",
            dark ? "bg-white/5" : "bg-white",
          )}>
            <ArticleBody contentWithIds={contentWithIds} dark={dark} elementStyles={elementStyles} />
            <TagsBar tags={tags} dark={dark} />
          </div>
        </div>
      </div>
    </section>

    <CtaBanner elementStyles={elementStyles} />
  </div>
);

/* ------------------------------------------------------------------ */
/*  Minimal Variant                                                    */
/* ------------------------------------------------------------------ */

const MinimalVariant: React.FC<VariantRenderProps> = ({
  title,
  coverImage,
  author,
  tags,
  dark,
  contentWithIds,
  tocItems,
  activeId,
  formattedDate,
  hasRealImage,
  elementStyles,
}) => (
  <div>
    {/* Hero — compact, no categories */}
    <section className="relative flex min-h-[200px] @min-[768px]:min-h-[280px] items-end overflow-hidden">
      {hasRealImage ? (
        <img src={coverImage} alt={title} className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-secondary" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-secondary/30" />
      <div className="relative z-10 mx-auto w-full max-w-[1325px] px-4 @min-[768px]:px-8 pb-8 @min-[768px]:pb-12 pt-24">
        <h1 className="mb-3 max-w-3xl text-xl @min-[768px]:text-2xl @min-[1024px]:text-4xl font-bold leading-tight text-white" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
          {title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
          <span className="flex items-center gap-1.5"><User className="h-4 w-4" />{author}</span>
          <span className="text-gray-600">&middot;</span>
          <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" />{formattedDate}</span>
        </div>
      </div>
    </section>

    {/* Content — narrow, clean */}
    <section className={cn("px-4 @min-[768px]:px-8 py-10 @min-[768px]:py-14", dark ? "bg-secondary" : "bg-slate-50")}>
      <div className="mx-auto max-w-[680px]">
        <div className={cn("rounded-xl p-6 @min-[768px]:p-8", dark ? "bg-white/5" : "bg-white")}>
          <TocList tocItems={tocItems} activeId={activeId} dark={dark} minimal />
          <ArticleBody contentWithIds={contentWithIds} dark={dark} elementStyles={elementStyles} />
          <TagsBar tags={tags} dark={dark} />
        </div>
      </div>
    </section>

    <CtaBanner elementStyles={elementStyles} />
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main — Standard (default)                                          */
/* ------------------------------------------------------------------ */

export const BlogPostContentSection: React.FC<BlogPostContentProps> = ({
  title,
  coverImage,
  date,
  author,
  categories = [],
  tags = [],
  content,
  variant = "standard",
  dark = false,
  elementStyles,
}) => {
  const contentWithIds = addIdsToHeadings(content);
  const tocItems = extractToc(contentWithIds);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const hasRealImage =
    !!coverImage &&
    (coverImage.startsWith("http") || coverImage.startsWith("data:"));

  const formattedDate = (() => {
    try {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC",
      });
    } catch {
      return date;
    }
  })();

  useEffect(() => {
    observerRef.current?.disconnect();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 },
    );
    observerRef.current = observer;

    for (const item of tocItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [tocItems]);

  /* Shared props for variant renderers */
  const vp: VariantRenderProps = {
    title,
    coverImage,
    author,
    categories,
    tags,
    dark,
    contentWithIds,
    tocItems,
    activeId,
    formattedDate,
    hasRealImage,
    elementStyles,
  };

  if (variant === "sidebarToc") return <SidebarTocVariant {...vp} />;
  if (variant === "minimal") return <MinimalVariant {...vp} />;

  /* ---- Standard variant ---- */
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[300px] @min-[768px]:min-h-[400px] items-end overflow-hidden">
        {hasRealImage ? (
          <img
            src={coverImage}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-secondary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-secondary/30" />
        <div className="relative z-10 mx-auto w-full max-w-[1325px] px-4 @min-[768px]:px-8 pb-12 @min-[768px]:pb-16 pt-24 @min-[768px]:pt-32">
          {categories.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full bg-primary px-3 py-1 text-xs @min-[768px]:text-sm font-semibold text-white"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <h1 className="mb-6 max-w-4xl text-2xl @min-[768px]:text-3xl @min-[1024px]:text-5xl font-bold leading-tight text-white" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 @min-[768px]:gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className={cn("px-4 @min-[768px]:px-8 py-12 @min-[768px]:py-16", dark ? "bg-secondary" : "bg-slate-50")}>
        <div className="mx-auto max-w-[800px]">
          <div className={cn(
            "rounded-2xl p-6 @min-[768px]:p-8 @min-[1024px]:p-12 shadow-lg",
            dark ? "bg-white/5" : "bg-white",
          )}>
            <TocList tocItems={tocItems} activeId={activeId} dark={dark} />
            <ArticleBody contentWithIds={contentWithIds} dark={dark} elementStyles={elementStyles} />
            <TagsBar tags={tags} dark={dark} />
          </div>
        </div>
      </section>

      <CtaBanner elementStyles={elementStyles} />
    </div>
  );
};
