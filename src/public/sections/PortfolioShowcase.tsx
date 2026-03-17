"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
}

export interface PortfolioShowcaseProps {
  heading: string;
  highlight: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  images: PortfolioImage[];
  variant?: "split" | "masonry" | "carousel" | string;
  dark?: boolean;
  elementStyles?: Record<string, string>;
}

/* ------------------------------------------------------------------ */
/*  Masonry Variant                                                    */
/* ------------------------------------------------------------------ */

const MasonryVariant: React.FC<Omit<PortfolioShowcaseProps, "variant">> = ({
  heading,
  highlight,
  description,
  ctaText,
  ctaLink = "/contact",
  images = [],
  dark = false,
  elementStyles,
}) => {
  const heights = ["h-[280px]", "h-[220px]", "h-[320px]", "h-[240px]", "h-[300px]"];

  return (
    <section className={`${dark ? "bg-secondary" : "bg-white"} py-20 px-4 @min-[768px]:px-8 overflow-hidden`}>
      <div className="max-w-[1325px] mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-2xl @min-[768px]:text-3xl @min-[1024px]:text-5xl font-bold leading-tight mb-4 ${dark ? "text-white" : "text-secondary"}`}
            style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
          >
            {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-6" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
          <p className={`text-base @min-[768px]:text-lg leading-relaxed max-w-2xl mx-auto ${dark ? "text-gray-300" : "text-gray-600"}`} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
            {description}
          </p>
        </div>

        <div className="columns-2 @min-[768px]:columns-3 gap-4">
          {images.map((img, idx) => (
            <div
              key={img.id || `masonry-${idx}`}
              className={`break-inside-avoid mb-4 rounded-xl overflow-hidden relative group ${heights[idx % heights.length]}`}
            >
              {img.src?.startsWith("data:") || img.src?.startsWith("http") ? (
                <img
                  src={img.src}
                  alt={img.alt || ""}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <>
                  <div className="absolute inset-0" style={{ backgroundColor: "#475569" }} />
                  <div className="absolute inset-0 bg-black/10 flex items-end p-4">
                    <span className="text-white/70 text-sm font-medium">
                      {img.alt || "[Project Photo]"}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href={ctaLink}
            className="inline-flex items-center bg-primary text-on-primary font-bold px-8 py-4 rounded-md hover:bg-primary-dark transition-colors group"
            style={{ ...(elementStyles?.ctaBg && { backgroundColor: elementStyles.ctaBg }), ...(elementStyles?.ctaText && { color: elementStyles.ctaText }) }}
          >
            {ctaText}
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/*  Carousel Variant                                                   */
/* ------------------------------------------------------------------ */

const CarouselVariant: React.FC<Omit<PortfolioShowcaseProps, "variant">> = ({
  heading,
  highlight,
  description,
  ctaText,
  ctaLink = "/contact",
  images = [],
  dark = false,
  elementStyles,
}) => (
  <section className={`${dark ? "bg-secondary" : "bg-white"} py-20 px-4 @min-[768px]:px-8 overflow-hidden`}>
    <div className="max-w-[1325px] mx-auto">
      <div className="text-center mb-12">
        <h2
          className={`text-2xl @min-[768px]:text-3xl @min-[1024px]:text-5xl font-bold leading-tight mb-4 ${dark ? "text-white" : "text-secondary"}`}
          style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
        </h2>
        <div className="w-16 h-1 bg-primary rounded-full mx-auto mb-6" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
        <p className={`text-base @min-[768px]:text-lg leading-relaxed max-w-2xl mx-auto ${dark ? "text-gray-300" : "text-gray-600"}`} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
          {description}
        </p>
      </div>

      <div className="overflow-x-auto snap-x snap-mandatory scroll-smooth flex gap-4 pb-4 -mx-4 px-4">
        {images.map((img, idx) => (
          <div
            key={img.id || `carousel-${idx}`}
            className="flex-[0_0_85%] @min-[768px]:flex-[0_0_45%] @min-[1024px]:flex-[0_0_30%] snap-start rounded-xl overflow-hidden relative group h-[280px] @min-[768px]:h-[320px]"
          >
            {img.src?.startsWith("data:") || img.src?.startsWith("http") ? (
              <img
                src={img.src}
                alt={img.alt || ""}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <>
                <div className="absolute inset-0" style={{ backgroundColor: "#475569" }} />
                <div className="absolute inset-0 bg-black/10 flex items-end p-4">
                  <span className="text-white/70 text-sm font-medium">
                    {img.alt || "[Project Photo]"}
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href={ctaLink}
          className="inline-flex items-center bg-primary text-on-primary font-bold px-8 py-4 rounded-md hover:bg-primary-dark transition-colors group"
          style={{ ...(elementStyles?.ctaBg && { backgroundColor: elementStyles.ctaBg }), ...(elementStyles?.ctaText && { color: elementStyles.ctaText }) }}
        >
          {ctaText}
          <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/*  Main — Split (default)                                             */
/* ------------------------------------------------------------------ */

export const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({
  heading,
  highlight,
  description,
  ctaText,
  ctaLink = "/contact",
  images = [],
  variant = "split",
  dark = false,
  elementStyles,
}) => {
  if (variant === "masonry")
    return (
      <MasonryVariant heading={heading} highlight={highlight} description={description} ctaText={ctaText} ctaLink={ctaLink} images={images} dark={dark} elementStyles={elementStyles} />
    );
  if (variant === "carousel")
    return (
      <CarouselVariant heading={heading} highlight={highlight} description={description} ctaText={ctaText} ctaLink={ctaLink} images={images} dark={dark} elementStyles={elementStyles} />
    );

  const featured = images[0];
  const secondary = images.slice(1, 3);
  const tertiary = images.slice(3, 5);

  return (
    <section className={`${dark ? "bg-secondary" : "bg-white"} py-20 px-4 @min-[768px]:px-8 overflow-hidden`}>
      <div className="max-w-[1325px] mx-auto grid @min-[1024px]:grid-cols-5 gap-6 @min-[768px]:gap-8 @min-[1024px]:gap-10 items-center">

        {/* Left: Content (2 cols) */}
        <div className="@min-[1024px]:col-span-2 flex flex-col justify-center">
          <h2
            className={`text-2xl @min-[768px]:text-3xl @min-[1024px]:text-5xl font-bold leading-tight mb-4 ${dark ? "text-white" : "text-secondary"}`}
            style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
          >
            {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
          </h2>
          <div className="w-16 h-1 bg-primary rounded-full mb-6" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
          <p className={`text-base @min-[768px]:text-lg leading-relaxed mb-10 ${dark ? "text-gray-300" : "text-gray-600"}`} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
            {description}
          </p>
          <Link
            href={ctaLink}
            className="inline-flex items-center self-start bg-primary text-on-primary font-bold px-8 py-4 rounded-md hover:bg-primary-dark transition-colors group"
            style={{ ...(elementStyles?.ctaBg && { backgroundColor: elementStyles.ctaBg }), ...(elementStyles?.ctaText && { color: elementStyles.ctaText }) }}
          >
            {ctaText}
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right: Photo Grid (3 cols) */}
        <div className="@min-[1024px]:col-span-3 grid grid-cols-2 gap-4">
          {/* Featured large image spanning left column full height */}
          <div className="row-span-2 relative rounded-xl overflow-hidden min-h-[220px] @min-[640px]:min-h-[280px] @min-[768px]:min-h-[360px] group">
            {featured?.src?.startsWith("data:") || featured?.src?.startsWith("http") ? (
              <img
                src={featured.src}
                alt={featured.alt || ""}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <>
                <div className="absolute inset-0" style={{ backgroundColor: "#475569" }} />
                <div className="absolute inset-0 bg-black/10 flex items-end p-4">
                  <span className="text-white/70 text-sm font-medium">
                    {featured?.alt || "[Project Photo]"}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Top-right and bottom-right images */}
          {secondary.map((img, idx) => (
            <div
              key={img.id || `sec-${idx}`}
              className="relative rounded-xl overflow-hidden min-h-[120px] @min-[640px]:min-h-[150px] @min-[768px]:min-h-[170px] group"
            >
              {img.src?.startsWith("data:") || img.src?.startsWith("http") ? (
                <img
                  src={img.src}
                  alt={img.alt || ""}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <>
                  <div className="absolute inset-0" style={{ backgroundColor: "#475569" }} />
                  <div className="absolute inset-0 bg-black/10 flex items-end p-4">
                    <span className="text-white/70 text-sm font-medium">
                      {img.alt}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* Optional bottom row spanning both columns */}
          {tertiary.length > 0 && tertiary.map((img, idx) => (
            <div
              key={img.id || `ter-${idx}`}
              className="relative rounded-xl overflow-hidden min-h-[120px] @min-[640px]:min-h-[150px] @min-[768px]:min-h-[170px] group"
            >
              {img.src?.startsWith("data:") || img.src?.startsWith("http") ? (
                <img
                  src={img.src}
                  alt={img.alt || ""}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <>
                  <div className="absolute inset-0" style={{ backgroundColor: "#475569" }} />
                  <div className="absolute inset-0 bg-black/10 flex items-end p-4">
                    <span className="text-white/70 text-sm font-medium">
                      {img.alt}
                    </span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
