"use client";

import React, { useEffect, useRef, useState } from "react";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import { cn } from "@/public/lib/utils";
import Image from "next/image";

export interface BlogPostContentProps {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
  categories?: string[];
  tags?: string[];
  /** HTML body; may be empty while a post is a draft */
  content?: string;
  variant?: "standard" | "sidebarToc" | "minimal" | "wideHero" | string;
  dark?: boolean;
  elementStyles?: Record<string, string>;
}

/** Outer article column — comfortable reading width on large screens */
const WIDE_READING =
  "mx-auto w-full max-w-[min(100%,42rem)] sm:max-w-[min(100%,48rem)] lg:max-w-[min(100%,56rem)] xl:max-w-[min(100%,64rem)] 2xl:max-w-[min(100%,72rem)]";
const WIDE_READING_PAD = "px-4 @min-[768px]:px-8";
const PAGE_GUTTER = "mx-auto w-full max-w-[min(100%,1325px)] px-4 @min-[768px]:px-8";

function addIdsToHeadings(html: string | undefined | null): string {
  const safe = html ?? "";
  let counter = 0;
  return safe.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (_match, tag, attrs, text) => {
    const id = `heading-${counter++}`;
    return `<${tag}${attrs} id="${id}">${text}</${tag}>`;
  });
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractToc(html: string | undefined | null): TocItem[] {
  const items: TocItem[] = [];
  const safe = html ?? "";
  const regex = /<(h[23])[^>]*id="([^"]*)"[^>]*>(.*?)<\/\1>/gi;
  let m;
  while ((m = regex.exec(safe)) !== null) {
    items.push({
      id: m[2],
      text: (m[3] ?? "").replace(/<[^>]*>/g, ""),
      level: m[1] === "h2" ? 2 : 3,
    });
  }
  return items;
}

interface VariantRenderProps {
  title: string;
  coverImage: string;
  author: string;
  date: string;
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

function CategoryChips({
  categories,
  lightOnImage,
}: {
  categories: string[];
  lightOnImage?: boolean;
}) {
  if (categories.length === 0) return null;
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {categories.map((cat) => (
        <span
          key={cat}
          className={cn(
            "rounded-full px-3 py-1 text-xs @min-[768px]:text-sm font-semibold",
            lightOnImage ? "bg-primary text-white" : "bg-primary/15 text-primary",
          )}
        >
          {cat}
        </span>
      ))}
    </div>
  );
}

function MetaRow({
  author,
  date,
  formattedDate,
  lightOnImage,
}: {
  author: string;
  date: string;
  formattedDate: string;
  lightOnImage?: boolean;
}) {
  if (!author?.trim() && !date?.trim()) return null;
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-4 @min-[768px]:gap-6 text-sm",
        lightOnImage ? "text-gray-300" : "text-gray-500 dark:text-gray-400",
      )}
    >
      {author?.trim() ? (
        <span className="flex items-center gap-2">
          <User className="h-4 w-4 shrink-0 opacity-80" />
          {author}
        </span>
      ) : null}
      {date?.trim() ? (
        <span className="flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0 opacity-80" />
          {formattedDate}
        </span>
      ) : null}
    </div>
  );
}

function MetaRowMinimal({ author, date, formattedDate }: { author: string; date: string; formattedDate: string }) {
  if (!author?.trim() && !date?.trim()) return null;
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
      {author?.trim() ? (
        <span className="flex items-center gap-1.5">
          <User className="h-4 w-4 shrink-0" />
          {author}
        </span>
      ) : null}
      {author?.trim() && date?.trim() ? <span className="text-gray-400">&middot;</span> : null}
      {date?.trim() ? (
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4 shrink-0" />
          {formattedDate}
        </span>
      ) : null}
    </div>
  );
}

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
                    : dark
                      ? "text-gray-400 hover:text-primary"
                      : "text-gray-600 hover:text-primary",
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
    <nav
      className={cn(
        "mb-8 rounded-xl border p-4 @min-[768px]:p-6",
        dark ? "border-white/10 bg-white/5" : "border-gray-100 bg-gray-50",
      )}
    >
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
                  : dark
                    ? "text-gray-400 hover:text-primary"
                    : "text-gray-600 hover:text-primary",
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

function ArticleBody({
  contentWithIds,
  dark,
  elementStyles,
  proseSize = "lg",
}: {
  contentWithIds: string;
  dark: boolean;
  elementStyles?: Record<string, string>;
  proseSize?: "lg" | "xl";
}) {
  return (
    <article
      className={cn(
        "blog-content prose max-w-none prose-headings:font-bold prose-h2:mt-10 prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
        proseSize === "xl" ? "prose-xl" : "prose-lg",
        dark
          ? "prose-p:text-gray-300 prose-p:leading-relaxed prose-li:text-gray-300 prose-strong:text-gray-100 prose-headings:text-white"
          : "prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900",
      )}
      style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
      dangerouslySetInnerHTML={{ __html: contentWithIds }}
    />
  );
}

function TagsBar({ tags, dark }: { tags: string[]; dark: boolean }) {
  if (!tags?.length) return null;
  return (
    <div className={cn("mt-10 border-t pt-6", dark ? "border-white/10" : "border-gray-200")}>
      <div className="flex flex-wrap items-center gap-2">
        <Tag className={cn("h-4 w-4", dark ? "text-gray-500" : "text-gray-400")} />
        {tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              "rounded-full px-3 py-1 text-sm",
              dark ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary",
            )}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function CtaBanner({ elementStyles }: { elementStyles?: Record<string, string> }) {
  return (
    <section
      className="bg-primary px-4 py-12 @min-[768px]:px-8 @min-[768px]:py-16"
      style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}
    >
      <div className="mx-auto max-w-[1325px] text-center">
        <h2 className="mb-4 text-2xl font-bold text-white @min-[768px]:text-3xl @min-[1024px]:text-4xl">
          Ready to Start Your Project?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-base text-white/80 @min-[768px]:text-lg">
          Get a free, no-obligation estimate for your next project.
        </p>
        <span className="inline-flex cursor-pointer items-center rounded-md bg-white px-8 py-3 font-bold text-primary transition-colors @min-[768px]:px-10 @min-[768px]:py-4 hover:bg-secondary hover:text-white">
          Get Your Free Estimate
          <ArrowRight className="ml-2 h-5 w-5" />
        </span>
      </div>
    </section>
  );
}

/* ── Full-bleed gradient hero (standard + wideHero) ───────────────── */

function MagazineHero({
  title,
  coverImage,
  hasRealImage,
  categories,
  author,
  date,
  formattedDate,
  elementStyles,
}: Pick<
  VariantRenderProps,
  "title" | "coverImage" | "hasRealImage" | "categories" | "author" | "date" | "formattedDate" | "elementStyles"
>) {
  return (
    <section
      className={cn(
        "relative flex items-end overflow-hidden",
        hasRealImage && "min-h-[280px] @min-[768px]:min-h-[380px] @min-[1024px]:min-h-[440px]",
      )}
    >
      {hasRealImage ? (
        <Image
          src={coverImage}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover"
          fill
          unoptimized
        />
      ) : (
        <div className="absolute inset-0 bg-secondary" />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/80 to-secondary/40" />
      <div className={cn(PAGE_GUTTER, "relative z-10 py-10 @min-[768px]:py-14 @min-[1024px]:py-16")}>
        <CategoryChips categories={categories} lightOnImage />
        <h1
          className="mb-6 max-w-4xl text-2xl font-bold leading-tight text-white @min-[768px]:text-4xl @min-[1024px]:text-5xl"
          style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          {title}
        </h1>
        <MetaRow author={author} date={date} formattedDate={formattedDate} lightOnImage />
      </div>
    </section>
  );
}

/* ── Standard: magazine hero + card + TOC ─────────────────────────── */

const StandardVariant: React.FC<VariantRenderProps> = (props) => {
  const { dark, contentWithIds, tocItems, activeId, tags, elementStyles } = props;
  return (
    <div>
      <MagazineHero {...props} />
      <section className={cn("py-12 @min-[768px]:py-16", dark ? "bg-secondary" : "bg-slate-50")}>
        <div className={cn(WIDE_READING, WIDE_READING_PAD)}>
          <div
            className={cn(
              "rounded-2xl p-6 shadow-lg @min-[768px]:p-8 @min-[1024px]:p-12",
              dark ? "bg-white/5" : "bg-white",
            )}
          >
            <TocList tocItems={tocItems} activeId={activeId} dark={dark} />
            <ArticleBody contentWithIds={contentWithIds} dark={dark} elementStyles={elementStyles} proseSize="xl" />
            <TagsBar tags={tags} dark={dark} />
          </div>
        </div>
      </section>
      <CtaBanner elementStyles={elementStyles} />
    </div>
  );
};

/* ── Wide hero: same top hero, wide fluid body, no TOC, no card ───── */

const WideHeroVariant: React.FC<VariantRenderProps> = (props) => {
  const { dark, contentWithIds, tags, elementStyles } = props;
  return (
    <div>
      <MagazineHero {...props} />
      <section className={cn("py-12 @min-[768px]:py-16 @min-[1024px]:py-20", dark ? "bg-secondary" : "bg-slate-50")}>
        <div className={cn(WIDE_READING, WIDE_READING_PAD)}>
          <ArticleBody contentWithIds={contentWithIds} dark={dark} elementStyles={elementStyles} proseSize="xl" />
          <TagsBar tags={tags} dark={dark} />
        </div>
      </section>
      <CtaBanner elementStyles={elementStyles} />
    </div>
  );
};

/* ── Sidebar TOC: plain title band + contained cover + rail ───────── */

const SidebarTocVariant: React.FC<VariantRenderProps> = ({
  title,
  coverImage,
  author,
  date,
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
    <header
      className={cn(
        "border-b py-10 @min-[768px]:py-14",
        dark ? "border-white/10 bg-secondary" : "border-gray-200 bg-white",
      )}
    >
      <div className={PAGE_GUTTER}>
        <CategoryChips categories={categories} />
        <h1
          className="max-w-4xl text-3xl font-bold leading-tight tracking-tight text-gray-900 @min-[768px]:text-4xl @min-[1024px]:text-5xl dark:text-white"
          style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          {title}
        </h1>
        <MetaRowMinimal author={author} date={date} formattedDate={formattedDate} />
      </div>
    </header>

    {hasRealImage ? (
      <div className={cn(dark ? "bg-secondary" : "bg-slate-50", "pb-2 pt-6 @min-[768px]:pt-8")}>
        <div className={PAGE_GUTTER}>
          <div className="overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5">
            <div className="relative aspect-[16/9] w-full @min-[1024px]:aspect-[21/9]">
              <Image src={coverImage} alt={title} className="h-full w-full object-cover" fill unoptimized />
            </div>
          </div>
        </div>
      </div>
    ) : null}

    <section className={cn("py-12 @min-[768px]:py-16", dark ? "bg-secondary" : "bg-slate-50")}>
      <div className={cn("mx-auto w-full max-w-[min(100%,1325px)]", WIDE_READING_PAD)}>
        <div className="@min-[1024px]:grid @min-[1024px]:grid-cols-[minmax(220px,280px)_minmax(0,1fr)] @min-[1024px]:gap-10 @min-[1280px]:gap-14">
          <aside className="mb-10 @min-[1024px]:mb-0">
            <div className="@min-[1024px]:sticky @min-[1024px]:top-24">
              {tocItems.length > 2 ? (
                <nav
                  className={cn(
                    "rounded-xl border p-4 @min-[768px]:p-6",
                    dark ? "border-white/10 bg-white/5" : "border-gray-100 bg-white shadow-sm",
                  )}
                >
                  <h3
                    className={cn(
                      "mb-3 text-sm font-bold uppercase tracking-wider",
                      dark ? "text-gray-400" : "text-gray-500",
                    )}
                  >
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
                              : dark
                                ? "text-gray-400 hover:text-primary"
                                : "text-gray-600 hover:text-primary",
                          )}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              ) : null}
            </div>
          </aside>

          <div
            className={cn(
              "min-w-0 rounded-xl border p-6 @min-[768px]:p-8 @min-[1024px]:p-10",
              dark ? "border-white/10 bg-white/5" : "border-gray-100 bg-white shadow-sm",
            )}
          >
            <ArticleBody contentWithIds={contentWithIds} dark={dark} elementStyles={elementStyles} proseSize="xl" />
            <TagsBar tags={tags} dark={dark} />
          </div>
        </div>
      </div>
    </section>

    <CtaBanner elementStyles={elementStyles} />
  </div>
);

/* ── Minimal: editorial — plain text header, no TOC, no hero overlay */

const MinimalVariant: React.FC<VariantRenderProps> = ({
  title,
  coverImage,
  author,
  date,
  categories,
  tags,
  dark,
  contentWithIds,
  formattedDate,
  hasRealImage,
  elementStyles,
}) => (
  <div>
    <section className={cn(dark ? "bg-secondary" : "bg-slate-50")}>
      <div className={cn(WIDE_READING, WIDE_READING_PAD, "py-12 @min-[768px]:py-16 @min-[1024px]:py-20")}>
        <CategoryChips categories={categories} />
        <h1
          className="text-3xl font-bold leading-tight tracking-tight text-gray-900 @min-[768px]:text-4xl @min-[1024px]:text-5xl dark:text-white"
          style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          {title}
        </h1>
        <MetaRowMinimal author={author} date={date} formattedDate={formattedDate} />

        {hasRealImage ? (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-xl shadow-md ring-1 ring-black/5 @min-[768px]:mt-10">
            <Image src={coverImage} alt={title} className="h-full w-full object-cover" fill unoptimized />
          </div>
        ) : null}

        <div className="mt-10 @min-[768px]:mt-12">
          <ArticleBody contentWithIds={contentWithIds} dark={dark} elementStyles={elementStyles} proseSize="xl" />
          <TagsBar tags={tags} dark={dark} />
        </div>
      </div>
    </section>

    <CtaBanner elementStyles={elementStyles} />
  </div>
);

/* ── Main export ─────────────────────────────────────────────────── */

export const BlogPostContentSection: React.FC<BlogPostContentProps> = ({
  title,
  coverImage,
  date,
  author,
  categories = [],
  tags = [],
  content = "",
  variant = "standard",
  dark = false,
  elementStyles,
}) => {
  const contentWithIds = addIdsToHeadings(content);
  const tocItems = extractToc(contentWithIds);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  const hasRealImage =
    !!coverImage && (coverImage.startsWith("http") || coverImage.startsWith("data:"));

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

  const vp: VariantRenderProps = {
    title,
    coverImage,
    author,
    date,
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
  if (variant === "wideHero") return <WideHeroVariant {...vp} />;
  return <StandardVariant {...vp} />;
};
