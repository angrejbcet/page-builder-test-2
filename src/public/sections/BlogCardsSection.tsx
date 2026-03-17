"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/public/lib/utils";

interface BlogCardData {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  link: string;
}

export interface BlogCardsProps {
  heading: string;
  highlight: string;
  cards: BlogCardData[];
  ctaText: string;
  ctaLink: string;
  variant?: "carousel" | "grid" | "featured" | string;
  dark?: boolean;
  elementStyles?: Record<string, string>;
}

/* ------------------------------------------------------------------ */
/*  Shared card renderer                                               */
/* ------------------------------------------------------------------ */

function BlogCard({ card, dark, className, elementStyles }: { card: BlogCardData; dark: boolean; className?: string; elementStyles?: Record<string, string> }) {
  return (
    <Link
      href={card.link || "/blog"}
      className={cn(
        "group flex flex-col h-full rounded-xl overflow-hidden transition-all duration-300",
        dark
          ? "bg-white/5 border border-white/10 hover:bg-white/10"
          : "bg-white border border-slate-100 shadow-lg hover:shadow-xl",
        className,
      )}
      style={{ ...(elementStyles?.cardBg ? { backgroundColor: elementStyles.cardBg } : {}), ...(elementStyles?.cardBorder ? { borderColor: elementStyles.cardBorder } : {}) }}
    >
      <div className="h-56 relative overflow-hidden bg-slate-200">
        {card.image?.startsWith("data:") || card.image?.startsWith("http") ? (
          <img
            src={card.image}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
            [Blog Image: {card.title.substring(0, 15)}...]
          </div>
        )}
      </div>

      <div className="p-4 @min-[640px]:p-6 @min-[1024px]:p-8 flex flex-col flex-grow">
        <div className={cn("flex items-center text-sm mb-4", dark ? "text-gray-400" : "text-gray-500")}>
          <Calendar className="w-4 h-4 mr-2" />
          {card.date}
        </div>
        <h3 className={cn("text-xl font-bold mb-4 transition-colors line-clamp-2 group-hover:text-primary", dark ? "text-white" : "text-secondary")} style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}>
          {card.title}
        </h3>
        <p className={cn("mb-6 flex-grow leading-relaxed line-clamp-3", dark ? "text-gray-300" : "text-gray-600")} style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}>
          {card.excerpt}
        </p>
        <div className="mt-auto text-primary font-bold flex items-center" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>
          Read Article
          <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Grid Variant                                                       */
/* ------------------------------------------------------------------ */

const GridVariant: React.FC<Omit<BlogCardsProps, "variant">> = ({
  heading,
  highlight,
  cards = [],
  ctaText,
  ctaLink = "/blog",
  dark = false,
  elementStyles,
}) => (
  <section className={cn("py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8 overflow-hidden", dark ? "bg-secondary" : "bg-white")}>
    <div className="max-w-[1325px] mx-auto">
      <div className="flex flex-col @min-[768px]:flex-row justify-between items-end mb-16">
        <div className="text-left mb-6 @min-[768px]:mb-0">
          <h2 className={cn("text-3xl @min-[768px]:text-4xl font-bold mb-4", dark ? "text-white" : "text-secondary")} style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
            {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
        </div>
        <Link
          href={ctaLink}
          className={cn(
            "inline-flex items-center justify-center px-6 py-3 font-semibold border-2 rounded-md transition-all group",
            dark
              ? "bg-white text-secondary border-white hover:bg-primary hover:border-primary hover:text-white"
              : "bg-primary text-on-primary border-primary hover:bg-secondary hover:border-secondary",
          )}
          style={{ ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg, borderColor: elementStyles.ctaBg } : {}), ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}) }}
        >
          {ctaText}
          <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <BlogCard key={card.id || `blog-${idx}`} card={card} dark={dark} elementStyles={elementStyles} />
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Featured Variant                                                   */
/* ------------------------------------------------------------------ */

const FeaturedVariant: React.FC<Omit<BlogCardsProps, "variant">> = ({
  heading,
  highlight,
  cards = [],
  ctaText,
  ctaLink = "/blog",
  dark = false,
  elementStyles,
}) => {
  const firstCard = cards[0];
  const restCards = cards.slice(1);

  return (
    <section className={cn("py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8 overflow-hidden", dark ? "bg-secondary" : "bg-white")}>
      <div className="max-w-[1325px] mx-auto">
        <div className="flex flex-col @min-[768px]:flex-row justify-between items-end mb-16">
          <div className="text-left mb-6 @min-[768px]:mb-0">
            <h2 className={cn("text-3xl @min-[768px]:text-4xl font-bold mb-4", dark ? "text-white" : "text-secondary")} style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
              {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
          </div>
          <Link
            href={ctaLink}
            className={cn(
              "inline-flex items-center justify-center px-6 py-3 font-semibold border-2 rounded-md transition-all group",
              dark
                ? "bg-white text-secondary border-white hover:bg-primary hover:border-primary hover:text-white"
                : "bg-primary text-on-primary border-primary hover:bg-secondary hover:border-secondary",
            )}
            style={{ ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg, borderColor: elementStyles.ctaBg } : {}), ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}) }}
          >
            {ctaText}
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Hero first card */}
        {firstCard && (
          <Link
            href={firstCard.link || "/blog"}
            className={cn(
              "group grid @min-[768px]:grid-cols-2 rounded-xl overflow-hidden mb-8 transition-all duration-300",
              dark
                ? "bg-white/5 border border-white/10 hover:bg-white/10"
                : "bg-white border border-slate-100 shadow-lg hover:shadow-xl",
            )}
            style={{ ...(elementStyles?.cardBg ? { backgroundColor: elementStyles.cardBg } : {}), ...(elementStyles?.cardBorder ? { borderColor: elementStyles.cardBorder } : {}) }}
          >
            <div className="h-64 @min-[768px]:h-auto @min-[768px]:min-h-[340px] relative overflow-hidden bg-slate-200">
              {firstCard.image?.startsWith("data:") || firstCard.image?.startsWith("http") ? (
                <img
                  src={firstCard.image}
                  alt={firstCard.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
                  [Blog Image: {firstCard.title.substring(0, 15)}...]
                </div>
              )}
            </div>
            <div className="p-6 @min-[768px]:p-8 @min-[1024px]:p-10 flex flex-col justify-center">
              <div className={cn("flex items-center text-sm mb-4", dark ? "text-gray-400" : "text-gray-500")}>
                <Calendar className="w-4 h-4 mr-2" />
                {firstCard.date}
              </div>
              <h3 className={cn("text-2xl @min-[768px]:text-3xl font-bold mb-4 transition-colors group-hover:text-primary", dark ? "text-white" : "text-secondary")} style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}>
                {firstCard.title}
              </h3>
              <p className={cn("mb-6 leading-relaxed line-clamp-4", dark ? "text-gray-300" : "text-gray-600")} style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}>
                {firstCard.excerpt}
              </p>
              <div className="text-primary font-bold flex items-center" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>
                Read Article
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        )}

        {/* Remaining cards in 2-col grid */}
        {restCards.length > 0 && (
          <div className="grid @min-[768px]:grid-cols-2 gap-6">
            {restCards.map((card, idx) => (
              <BlogCard key={card.id || `blog-rest-${idx}`} card={card} dark={dark} elementStyles={elementStyles} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Main — Carousel (default)                                          */
/* ------------------------------------------------------------------ */

export const BlogCardsSection: React.FC<BlogCardsProps> = ({
  heading,
  highlight,
  cards = [],
  ctaText,
  ctaLink = "/blog",
  variant = "carousel",
  dark = false,
  elementStyles,
}) => {
  /* Early returns for non-carousel variants — BEFORE hooks */
  if (variant === "grid")
    return <GridVariant heading={heading} highlight={highlight} cards={cards} ctaText={ctaText} ctaLink={ctaLink} dark={dark} elementStyles={elementStyles} />;
  if (variant === "featured")
    return <FeaturedVariant heading={heading} highlight={highlight} cards={cards} ctaText={ctaText} ctaLink={ctaLink} dark={dark} elementStyles={elementStyles} />;

  /* Carousel hooks — only reached when variant === "carousel" */
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: true })],
  );

  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const showNav = cards.length > 3;

  return (
    <section className={cn("py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8 overflow-hidden", dark ? "bg-secondary" : "bg-white")}>
      <div className="max-w-[1325px] mx-auto">
        <div className="flex flex-col @min-[768px]:flex-row justify-between items-end mb-16">
          <div className="text-left mb-6 @min-[768px]:mb-0">
            <h2 className={cn("text-3xl @min-[768px]:text-4xl font-bold mb-4", dark ? "text-white" : "text-secondary")} style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
              {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
          </div>

          <div className="flex items-center gap-4">
            {showNav && (
              <div className="flex gap-3">
                <button
                  onClick={scrollPrev}
                  disabled={!prevEnabled}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed",
                    dark
                      ? "bg-white/10 border border-white/20 text-white hover:bg-primary hover:border-primary"
                      : "bg-slate-100 border border-slate-200 text-secondary hover:bg-primary hover:border-primary hover:text-white",
                  )}
                  aria-label="Previous articles"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={scrollNext}
                  disabled={!nextEnabled}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed",
                    dark
                      ? "bg-white/10 border border-white/20 text-white hover:bg-primary hover:border-primary"
                      : "bg-slate-100 border border-slate-200 text-secondary hover:bg-primary hover:border-primary hover:text-white",
                  )}
                  aria-label="Next articles"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
            <Link
              href={ctaLink}
              className={cn(
                "inline-flex items-center justify-center px-6 py-3 font-semibold border-2 rounded-md transition-all group",
                dark
                  ? "bg-white text-secondary border-white hover:bg-primary hover:border-primary hover:text-white"
                  : "bg-primary text-on-primary border-primary hover:bg-secondary hover:border-secondary",
              )}
              style={{ ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg, borderColor: elementStyles.ctaBg } : {}), ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}) }}
            >
              {ctaText}
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {cards.map((card, idx) => (
              <div
                key={card.id || `blog-${idx}`}
                className={cn(
                  "flex-[0_0_85%] min-w-0 pl-6",
                  "@min-[768px]:flex-[0_0_50%]",
                  "@min-[1024px]:flex-[0_0_33.333%]",
                )}
              >
                <BlogCard card={card} dark={dark} elementStyles={elementStyles} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
