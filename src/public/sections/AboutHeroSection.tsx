import React from "react";
import { cn } from "@/public/lib/utils";

export interface AboutHeroProps {
  headline: string;
  highlightText: string;
  subheadline: string;
  backgroundImage: string;
  height?: "small" | "medium" | "large" | "fullscreen" | string;
  dark?: boolean;
  elementStyles?: Record<string, string>;
}

const HEIGHT_CLASSES: Record<string, string> = {
  small: "py-12 @min-[768px]:py-20 @min-[1024px]:py-24",
  medium: "py-16 @min-[768px]:py-28 @min-[1024px]:py-36",
  large: "py-20 @min-[768px]:py-36 @min-[1024px]:py-48",
  fullscreen: "min-h-[60vh] @min-[768px]:min-h-[80vh]",
};

export const AboutHeroSection: React.FC<AboutHeroProps> = ({
  headline,
  highlightText,
  subheadline,
  backgroundImage,
  height = "medium",
  dark = true,
  elementStyles,
}) => {
  const hasSectionBg = !!elementStyles?._sectionBg;
  const hasRealImage = backgroundImage?.startsWith("data:") || backgroundImage?.startsWith("http");
  const overlay = elementStyles?.imageOverlay;
  const topPx = elementStyles?.topPadding ? parseInt(elementStyles.topPadding, 10) : 0;

  return (
    <section
      className={cn(
        "relative w-full flex items-center justify-center",
        HEIGHT_CLASSES[height] || HEIGHT_CLASSES.medium,
        !hasSectionBg && (dark ? "bg-secondary" : "bg-slate-100"),
      )}
      style={topPx ? { paddingTop: `${topPx}px` } : undefined}
    >
      <div className="absolute inset-0">
        {hasRealImage && (
          <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        {overlay && <div className="absolute inset-0" style={{ backgroundColor: overlay }} />}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1
          className="text-4xl @min-[768px]:text-5xl @min-[1024px]:text-6xl font-bold text-white mb-6 drop-shadow-md"
          style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          {headline}{" "}
          <span
            className="text-primary"
            style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}
          >
            {highlightText}
          </span>
        </h1>
        <p
          className="text-base @min-[640px]:text-xl @min-[768px]:text-2xl text-gray-200 drop-shadow-sm max-w-3xl mx-auto"
          style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
        >
          {subheadline}
        </p>
      </div>
    </section>
  );
};
