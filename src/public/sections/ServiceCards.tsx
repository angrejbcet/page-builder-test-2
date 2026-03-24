"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/public/lib/utils";

interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  ctaText: string;
}

type ImageShape = "tall" | "square" | "landscape";

const IMAGE_HEIGHT: Record<ImageShape, string> = {
  tall: "h-52",
  square: "aspect-square",
  landscape: "aspect-[16/10]",
};

const OVERLAY_ASPECT: Record<ImageShape, string> = {
  tall: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[16/10]",
};

export interface ServiceCardsProps {
  heading: string;
  highlight: string;
  subheading?: string;
  cards: ServiceCardData[];
  imageShape?: ImageShape | string;
  columns?: "2" | "3" | "4" | string;
  variant?: "carousel" | "grid" | "compact" | "overlay" | string;
  elementStyles?: Record<string, string>;
}

const GRID_COLS: Record<string, string> = {
  "2": "@min-[640px]:grid-cols-2",
  "3": "@min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-3",
  "4": "@min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-4",
};

const CAROUSEL_SLIDE: Record<string, string> = {
  "2": "@min-[768px]:flex-[0_0_50%]",
  "3": "@min-[768px]:flex-[0_0_50%] @min-[1024px]:flex-[0_0_33.333%]",
  "4": "@min-[768px]:flex-[0_0_50%] @min-[1024px]:flex-[0_0_25%]",
};

function resolveShape(raw?: string): ImageShape {
  if (raw === "square" || raw === "landscape") return raw;
  return "tall";
}

function CardImage({ image, title, overlay, shape = "tall", elementStyles }: { image: string; title: string; overlay?: string; shape?: ImageShape; elementStyles?: Record<string, string> }) {
  const hasImage = image?.startsWith("data:") || image?.startsWith("http");
  const overlayColor = elementStyles?.imageOverlay || overlay;
  return (
    <div className={cn("relative overflow-hidden bg-slate-200", IMAGE_HEIGHT[shape])}>
      {hasImage ? (
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">[Image: {title}]</div>
      )}
      {overlayColor && hasImage && (
        <div className="absolute inset-0" style={{ backgroundColor: overlayColor }} />
      )}
    </div>
  );
}

function ServiceGrid({ heading, highlight, cards, imageShape, columns, elementStyles }: Omit<ServiceCardsProps, "variant">) {
  const shape = resolveShape(imageShape);
  const hasSectionBg = !!elementStyles?._sectionBg;
  const gridCols = GRID_COLS[columns || "3"] || GRID_COLS["3"];
  return (
    <section className={cn("py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8", !hasSectionBg && "bg-secondary")}>
      <div className="max-w-[1325px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl @min-[640px]:text-3xl @min-[768px]:text-4xl font-bold text-white mb-4" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
            {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
          </h2>
          <div className="w-24 h-1 bg-primary rounded-full mx-auto" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
        </div>
        <div className={cn("grid gap-4 @min-[768px]:gap-6", gridCols)}>
          {cards.map((card, idx) => (
            <div key={card.id || `card-${idx}`} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col" style={{ ...(elementStyles?.cardBg && { backgroundColor: elementStyles.cardBg }), ...(elementStyles?.cardBorder && { borderColor: elementStyles.cardBorder }) }}>
              <CardImage image={card.image} title={card.title} shape={shape} elementStyles={elementStyles} />
              <div className="p-4 @min-[640px]:p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold mb-2 text-secondary group-hover:text-primary transition-colors" style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}>{card.title}</h3>
                <p className="text-gray-600 mb-4 flex-grow leading-relaxed text-sm" style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}>{card.description}</p>
                <div className="mt-auto">
                  <Link href={card.link || "#"} className="inline-flex items-center text-primary font-bold hover:text-primary-dark transition-colors group/link text-sm" style={elementStyles?.ctaColor ? { color: elementStyles.ctaColor } : undefined}>
                    {card.ctaText}
                    <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCompact({ heading, highlight, cards, imageShape, columns, elementStyles }: Omit<ServiceCardsProps, "variant">) {
  const overlayColor = elementStyles?.imageOverlay;
  const shape = resolveShape(imageShape);
  const hasSectionBg = !!elementStyles?._sectionBg;
  const compactHeight = shape === "square" ? "aspect-square" : shape === "landscape" ? "aspect-[16/10]" : "h-28";
  const gridCols = GRID_COLS[columns || "4"] || GRID_COLS["4"];
  return (
    <section className={cn("py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8", !hasSectionBg && "bg-secondary")}>
      <div className="max-w-[1325px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl @min-[640px]:text-3xl @min-[768px]:text-4xl font-bold text-white mb-4" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
            {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
          </h2>
          <div className="w-24 h-1 bg-primary rounded-full mx-auto" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
        </div>
        <div className={cn("grid gap-4", gridCols)}>
          {cards.map((card, idx) => {
            const hasImg = card.image?.startsWith("data:") || card.image?.startsWith("http");
            return (
              <Link key={card.id || `card-${idx}`} href={card.link || "#"} className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-primary/30 transition-all" style={{ ...(elementStyles?.cardBg && { backgroundColor: elementStyles.cardBg }), ...(elementStyles?.cardBorder && { borderColor: elementStyles.cardBorder }) }}>
                <div className={cn("relative overflow-hidden rounded-lg bg-slate-700 mb-3", compactHeight)}>
                  {hasImg && (
                    <img src={card.image} alt={card.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  )}
                  {overlayColor && hasImg && <div className="absolute inset-0" style={{ backgroundColor: overlayColor }} />}
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-primary transition-colors mb-2" style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}>{card.title}</h3>
                <span className="inline-flex items-center text-sm text-primary font-semibold" style={elementStyles?.ctaColor ? { color: elementStyles.ctaColor } : undefined}>
                  {card.ctaText}
                  <ArrowRight className="ml-1 w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function buildOverlayGradient(elementStyles?: Record<string, string>): React.CSSProperties | undefined {
  const mode = elementStyles?.overlayMode || "dark";
  if (mode === "none") return { background: "transparent" };

  const opacityRaw = elementStyles?.overlayOpacity ? parseInt(elementStyles.overlayOpacity, 10) : undefined;
  const customColor = elementStyles?.imageOverlay;

  if (mode === "light") {
    const strength = opacityRaw != null ? opacityRaw / 100 : 0.6;
    const base = customColor || `rgba(255,255,255,${strength})`;
    return { background: `linear-gradient(to top, ${base} 0%, rgba(255,255,255,${strength * 0.3}) 50%, transparent 100%)` };
  }

  // dark (default)
  const strength = opacityRaw != null ? opacityRaw / 100 : 0.7;
  const base = customColor || `rgba(0,0,0,${strength})`;
  return { background: `linear-gradient(to top, ${base} 0%, rgba(0,0,0,${strength * 0.25}) 50%, transparent 100%)` };
}

function ServiceOverlay({ heading, highlight, subheading, cards, imageShape, columns, elementStyles }: Omit<ServiceCardsProps, "variant">) {
  const shape = resolveShape(imageShape);
  const hasSectionBg = !!elementStyles?._sectionBg;
  const displayHeading = highlight
    ? `${heading} ${highlight}`
    : heading;

  const overlayStyle = buildOverlayGradient(elementStyles);
  const isLight = elementStyles?.overlayMode === "light";
  const gridCols = GRID_COLS[columns || "4"] || GRID_COLS["4"];

  return (
    <section className={cn("py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8", !hasSectionBg && "bg-secondary")}>
      <div className="max-w-[1325px] mx-auto">
        <div className="text-center mb-12 @min-[768px]:mb-16">
          <h2 className="text-2xl @min-[640px]:text-3xl @min-[768px]:text-4xl @min-[1024px]:text-5xl font-serif italic font-normal text-white mb-4 tracking-wide" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
            {displayHeading}
          </h2>
          {subheading && (
            <p className="text-sm @min-[768px]:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        <div className={cn("grid grid-cols-1 gap-4 @min-[768px]:gap-5", gridCols)}>
          {cards.map((card, idx) => (
            <Link
              key={card.id || `card-${idx}`}
              href={card.link || "#"}
              className={cn("group relative rounded-xl overflow-hidden border border-white/10", OVERLAY_ASPECT[shape])}
              style={elementStyles?.cardBorder ? { borderColor: elementStyles.cardBorder } : undefined}
            >
              <div className="absolute inset-0 bg-secondary">
                {(card.image?.startsWith("data:") || card.image?.startsWith("http")) ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">[{card.title}]</div>
                )}
              </div>
              <div className="absolute inset-0" style={overlayStyle} />
              <div className="absolute inset-x-0 bottom-0 p-4 @min-[768px]:p-5">
                <h3
                  className={cn("text-base @min-[768px]:text-lg font-serif italic mb-1.5 leading-snug", isLight ? "text-gray-900" : "text-white")}
                  style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}
                >
                  {card.title}
                </h3>
                <p
                  className={cn("text-xs @min-[768px]:text-sm leading-relaxed line-clamp-3 mb-2", isLight ? "text-gray-700" : "text-gray-300")}
                  style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}
                >
                  {card.description}
                </p>
                {card.ctaText && (
                  <span
                    className={cn("inline-flex items-center text-xs @min-[768px]:text-sm font-semibold group-hover:underline", isLight ? "text-gray-900" : "text-white")}
                    style={elementStyles?.ctaColor ? { color: elementStyles.ctaColor } : undefined}
                  >
                    {card.ctaText}
                    <ArrowRight className="ml-1 w-3 h-3 @min-[768px]:w-4 @min-[768px]:h-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export const ServiceCards: React.FC<ServiceCardsProps> = ({
  heading,
  highlight,
  subheading,
  cards = [],
  imageShape,
  columns,
  variant = "carousel",
  elementStyles,
}) => {
  const shape = resolveShape(imageShape);
  const hasSectionBg = !!elementStyles?._sectionBg;
  if (variant === "grid") return <ServiceGrid heading={heading} highlight={highlight} cards={cards} imageShape={imageShape} columns={columns} elementStyles={elementStyles} />;
  if (variant === "compact") return <ServiceCompact heading={heading} highlight={highlight} cards={cards} imageShape={imageShape} columns={columns} elementStyles={elementStyles} />;
  if (variant === "overlay") return <ServiceOverlay heading={heading} highlight={highlight} subheading={subheading} cards={cards} imageShape={imageShape} columns={columns} elementStyles={elementStyles} />;

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
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

  const colCount = parseInt(columns || "3", 10);
  const showNav = cards.length > colCount;
  const slideCls = CAROUSEL_SLIDE[columns || "3"] || CAROUSEL_SLIDE["3"];

  return (
    <section className={cn("py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8 overflow-hidden", !hasSectionBg && "bg-secondary")}>
      <div className="max-w-[1325px] mx-auto">
        <div className="flex flex-col @min-[768px]:flex-row justify-between items-end mb-16">
          <div className="text-center @min-[768px]:text-left mb-6 @min-[768px]:mb-0 w-full @min-[768px]:w-auto">
            <h2 className="text-2xl @min-[640px]:text-3xl @min-[768px]:text-4xl font-bold text-white mb-4" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
              {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
            </h2>
            <div className="w-24 h-1 bg-primary rounded-full mx-auto @min-[768px]:mx-0" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}></div>
          </div>

          {showNav && (
            <div className="flex gap-3">
              <button
                onClick={scrollPrev}
                disabled={!prevEnabled}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous services"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={scrollNext}
                disabled={!nextEnabled}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next services"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {cards.map((card, idx) => (
              <div
                key={card.id || `card-${idx}`}
                className={cn(
                  "flex-[0_0_85%] min-w-0 pl-6",
                  slideCls
                )}
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full" style={{ ...(elementStyles?.cardBg && { backgroundColor: elementStyles.cardBg }), ...(elementStyles?.cardBorder && { borderColor: elementStyles.cardBorder }) }}>
                  <CardImage image={card.image} title={card.title} shape={shape} elementStyles={elementStyles} />

                  <div className="p-4 @min-[640px]:p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold mb-2 text-secondary group-hover:text-primary transition-colors" style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}>
                      {card.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow leading-relaxed text-sm" style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}>
                      {card.description}
                    </p>

                    <div className="mt-auto">
                      <Link
                        href={card.link || "#"}
                        className="inline-flex items-center text-primary font-bold hover:text-primary-dark transition-colors group/link text-sm"
                        style={elementStyles?.ctaColor ? { color: elementStyles.ctaColor } : undefined}
                      >
                        {card.ctaText}
                        <ArrowRight className="ml-2 w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
