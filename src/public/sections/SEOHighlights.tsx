"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/public/lib/utils";
import { useModal } from "@/providers/ModalProvider";

interface SEOSection {
  id: string;
  heading: string;
  content: string;
  image: string;
  imagePosition: "left" | "right";
  ctaText: string;
  ctaLink: string;
}

type ImageShape = "tall" | "square" | "landscape";

export interface SEOHighlightsProps {
  heading?: string;
  subheading?: string;
  sections: SEOSection[];
  dark?: boolean;
  columns?: 2 | 3 | 4 | number;
  imageFill?: boolean;
  imageShape?: ImageShape | string;
  variant?: "alternating" | "stacked" | "cards" | string;
  elementStyles?: Record<string, string>;
}

function resolveShape(raw?: string): ImageShape {
  if (raw === "square" || raw === "landscape") return raw;
  return "tall";
}

const IMAGE_HEIGHT: Record<ImageShape, string> = {
  tall: "h-40 @min-[640px]:h-44 @min-[768px]:h-48",
  square: "aspect-square",
  landscape: "aspect-[16/10]",
};

const FILL_ASPECT: Record<ImageShape, string> = {
  tall: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[16/10]",
};

function SectionHeading({ heading, subheading, dark, elementStyles }: { heading?: string; subheading?: string; dark: boolean; elementStyles?: Record<string, string> }) {
  if (!heading && !subheading) return null;
  return (
    <div className="text-center mb-12 @min-[768px]:mb-16">
      {heading && (
        <h2
          className={cn("text-2xl @min-[640px]:text-3xl @min-[768px]:text-4xl font-bold mb-4 leading-tight", dark ? "text-white" : "text-secondary")}
          style={elementStyles?.sectionHeadingColor ? { color: elementStyles.sectionHeadingColor } : elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          {heading}
        </h2>
      )}
      {subheading && (
        <p className={cn("max-w-3xl mx-auto text-base @min-[768px]:text-lg leading-relaxed", dark ? "text-gray-400" : "text-gray-500")} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
          {subheading}
        </p>
      )}
    </div>
  );
}

function SEOCtaButton({ section, dark, elementStyles }: { section: SEOSection; dark: boolean; elementStyles?: Record<string, string> }) {
  const { openContactModal } = useModal();
  const btnClass = cn(
    "inline-flex items-center justify-center px-4 py-3 @min-[768px]:px-8 font-semibold rounded-md transition-all group",
    dark ? "bg-white text-secondary hover:bg-primary hover:text-white" : "bg-secondary text-white hover:bg-primary",
  );
  const ctaStyle = {
    ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg } : {}),
    ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}),
  };

  if (section.ctaLink === "/contact") {
    return (
      <button onClick={openContactModal} className={`${btnClass} cursor-pointer`} style={ctaStyle}>
        {section.ctaText}
        <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
      </button>
    );
  }
  return (
    <Link href={section.ctaLink || "#"} className={btnClass} style={ctaStyle}>
      {section.ctaText}
      <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
    </Link>
  );
}

function SEOImageBlock({ image, heading, overlay }: { image: string; heading: string; overlay?: string }) {
  const hasImage = image?.startsWith("data:") || image?.startsWith("http");
  return (
    <>
      {hasImage ? (
        <img src={image} alt={heading} className="absolute inset-0 w-full h-full object-cover" />
      ) : (
        <>
          <div className="absolute inset-0" style={{ backgroundColor: "#cbd5e1" }} />
          <div className="absolute inset-0 bg-black/5 flex items-center justify-center text-white/80 font-medium tracking-wider uppercase text-sm">
            [Image: {(heading || "").substring(0, 15)}...]
          </div>
        </>
      )}
      {overlay && hasImage && <div className="absolute inset-0" style={{ backgroundColor: overlay }} />}
    </>
  );
}

function SEOCards({ heading, subheading, sections, dark, columns: rawCols = 2, imageFill = false, imageShape: rawShape, elementStyles }: {
  heading?: string;
  subheading?: string;
  sections: SEOSection[];
  dark: boolean;
  columns?: number | string;
  imageFill?: boolean;
  imageShape?: string;
  elementStyles?: Record<string, string>;
}) {
  const cols = Number(rawCols) || 2;
  const shape = resolveShape(rawShape);
  const hasSectionBg = !!elementStyles?._sectionBg;
  const colClass = cols >= 4
    ? "@min-[768px]:grid-cols-2 @min-[1024px]:grid-cols-4"
    : cols >= 3
      ? "@min-[768px]:grid-cols-2 @min-[1024px]:grid-cols-3"
      : "@min-[768px]:grid-cols-2";

  const overlay = elementStyles?.imageOverlay;

  return (
    <section className={cn("py-16 @min-[768px]:py-24 px-4 @min-[768px]:px-8", !hasSectionBg && (dark ? "bg-secondary" : "bg-slate-50"))}>
      <div className="max-w-[1325px] mx-auto">
        <SectionHeading heading={heading} subheading={subheading} dark={dark} elementStyles={elementStyles} />
        <div className={cn("grid gap-6", colClass)}>
          {sections.map((section, idx) => (
            imageFill ? (
              <Link
                key={section.id || idx}
                href={section.ctaLink || "#"}
                className={cn(
                  "group relative rounded-2xl overflow-hidden shadow-lg border",
                  FILL_ASPECT[shape],
                  dark ? "border-white/10" : "border-slate-100",
                )}
              >
                <div className="absolute inset-0">
                  <SEOImageBlock image={section.image} heading={section.heading || ""} />
                </div>
                {overlay && <div className="absolute inset-0" style={{ backgroundColor: overlay }} />}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-black/20" />
                <div className="absolute inset-x-0 bottom-0 p-4 @min-[640px]:p-5 @min-[1024px]:p-6">
                  <h3 className="text-lg @min-[768px]:text-xl font-bold text-white mb-2 leading-tight" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
                    {section.heading}
                  </h3>
                  <p className="text-sm text-gray-200 leading-relaxed line-clamp-3 mb-3" style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
                    {section.content}
                  </p>
                  <span className="inline-flex items-center text-sm text-primary font-semibold group-hover:underline" style={elementStyles?.ctaBg ? { color: elementStyles.ctaBg } : undefined}>
                    {section.ctaText}
                    <ArrowRight className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ) : (
              <div key={section.id || idx} className={cn("rounded-2xl overflow-hidden shadow-lg flex flex-col", dark ? "bg-secondary/60 border border-white/10" : "bg-white border border-slate-100")}>
                <div className={cn("relative w-full", IMAGE_HEIGHT[shape])}>
                  <SEOImageBlock image={section.image} heading={section.heading || ""} overlay={overlay} />
                </div>
                <div className="p-4 @min-[640px]:p-5 @min-[1024px]:p-6 flex flex-col flex-grow">
                  <h3 className={cn("text-xl font-bold mb-3 leading-tight", dark ? "text-white" : "text-secondary")} style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>{section.heading}</h3>
                  <p className={cn("leading-relaxed mb-5 flex-grow text-sm", dark ? "text-gray-300" : "text-gray-600")} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>{section.content}</p>
                  <div className="mt-auto">
                    <SEOCtaButton section={section} dark={dark} elementStyles={elementStyles} />
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}

export const SEOHighlights: React.FC<SEOHighlightsProps> = ({
  heading: sectionTitle,
  subheading,
  sections = [],
  dark = false,
  columns = 2,
  imageFill = false,
  imageShape,
  variant = "alternating",
  elementStyles,
}) => {
  const safeSections = Array.isArray(sections) ? sections : [];
  if (safeSections.length === 0) return null;
  const hasSectionBg = !!elementStyles?._sectionBg;

  if (variant === "cards") return <SEOCards heading={sectionTitle} subheading={subheading} sections={safeSections} dark={dark} columns={columns} imageFill={imageFill} imageShape={imageShape} elementStyles={elementStyles} />;

  return (
    <div className={cn("w-full", !hasSectionBg && (dark ? "bg-secondary" : "bg-white"))}>
      {(sectionTitle || subheading) && (
        <div className="pt-12 @min-[768px]:pt-20 px-4 @min-[768px]:px-8">
          <div className="max-w-[1325px] mx-auto">
            <SectionHeading heading={sectionTitle} subheading={subheading} dark={dark} elementStyles={elementStyles} />
          </div>
        </div>
      )}
      {safeSections.map((section, idx) => {
        if (!section || typeof section !== "object") return null;
        const itemHeading = section.heading || "";
        const isImageLeft = variant === "stacked"
          ? false
          : idx % 2 === 0;

        return (
          <section
            key={section.id || idx}
            className={cn(
              "py-12 @min-[768px]:py-20 px-4 @min-[768px]:px-8",
              !hasSectionBg && !elementStyles?.altRowBg && (dark ? "bg-secondary" : idx % 2 === 0 ? "bg-white" : "bg-slate-50"),
              !hasSectionBg && elementStyles?.altRowBg && idx % 2 === 0 && (dark ? "bg-secondary" : "bg-white"),
            )}
            style={!hasSectionBg && elementStyles?.altRowBg && idx % 2 !== 0 ? { backgroundColor: elementStyles.altRowBg } : undefined}
          >
            <div className="max-w-[1325px] mx-auto grid @min-[768px]:grid-cols-2 gap-8 @min-[768px]:gap-12 @min-[1024px]:gap-20 items-center">
              <div className={cn("relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg", isImageLeft ? "@min-[768px]:order-1" : "@min-[768px]:order-2")}>
                <SEOImageBlock image={section.image} heading={itemHeading} overlay={elementStyles?.imageOverlay} />
              </div>
              <div className={cn("flex flex-col justify-center", isImageLeft ? "@min-[768px]:order-2" : "@min-[768px]:order-1")}>
                <h2 className={cn("text-2xl @min-[768px]:text-3xl @min-[1024px]:text-4xl font-bold mb-6 leading-tight", dark ? "text-white" : "text-secondary")} style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>{section.heading}</h2>
                <div className="w-16 h-1 bg-primary rounded-full mb-8" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
                <p className={cn("text-base @min-[768px]:text-lg leading-relaxed mb-10", dark ? "text-gray-300" : "text-gray-600")} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>{section.content}</p>
                <div>
                  <SEOCtaButton section={section} dark={dark} elementStyles={elementStyles} />
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
