import React from "react";
import Link from "next/link";
import { cn, normalizeContentBlocks } from "@/public/lib/utils";
import type { ContentBlock } from "@/lib/types";

export interface AboutSectionProps {
  heading: string;
  highlight: string;
  description: unknown;
  image: string;
  ctaText: string;
  ctaLink: string;
  variant?: "imageRight" | "imageLeft" | "fullWidth" | string;
  dark?: boolean;
  elementStyles?: Record<string, string>;
}

function ImageBlock({ image, heading }: { image: string; heading: string }) {
  return image?.startsWith("data:") || image?.startsWith("http") ? (
    <img src={image} alt={heading} className="absolute inset-0 w-full h-full object-cover" />
  ) : (
    <>
      <div className="absolute inset-0 bg-slate-300" />
      <div className="absolute inset-0 flex items-center justify-center text-slate-500">
        <span>[About Image]</span>
      </div>
    </>
  );
}

function RenderBlock({ block, dark, bodyStyle }: { block: ContentBlock; dark: boolean; bodyStyle?: React.CSSProperties }) {
  const textClass = cn("leading-relaxed text-sm @min-[768px]:text-base", dark ? "text-gray-300" : "text-gray-600");
  const lines = block.content.split("\n").filter(Boolean);

  switch (block.type) {
    case "bulletList":
      return (
        <ul className={cn("list-disc pl-5 space-y-1.5", textClass)} style={bodyStyle}>
          {lines.map((line, i) => <li key={i}>{line}</li>)}
        </ul>
      );
    case "numberedList":
      return (
        <ol className={cn("list-decimal pl-5 space-y-1.5", textClass)} style={bodyStyle}>
          {lines.map((line, i) => <li key={i}>{line}</li>)}
        </ol>
      );
    default:
      return <p className={textClass} style={bodyStyle}>{block.content}</p>;
  }
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  heading,
  highlight,
  description,
  image,
  ctaText,
  ctaLink = "/contact",
  variant = "imageRight",
  dark = false,
  elementStyles,
}) => {
  const blocks = normalizeContentBlocks(description);
  const bodyStyle = elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined;
  const hasSectionBg = !!elementStyles?._sectionBg;
  const imageOverlay = elementStyles?.imageOverlay;

  const headingEl = (
    <h2
      className={cn(
        "text-3xl @min-[768px]:text-4xl font-bold mb-6 leading-tight",
        dark ? "text-white" : "text-secondary",
      )}
      style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
    >
      {heading}{" "}
      <span
        className="text-primary"
        style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}
      >
        {highlight}
      </span>
    </h2>
  );

  const contentBlocks = (
    <div className="space-y-4 mb-8">
      {blocks.map((block) => (
        <RenderBlock key={block.id} block={block} dark={dark} bodyStyle={bodyStyle} />
      ))}
    </div>
  );

  const ctaButton = ctaText?.trim() ? (
    <Link
      href={ctaLink}
      className={cn(
        "inline-block font-medium px-8 py-3 rounded transition-colors",
        dark
          ? "bg-white text-secondary hover:bg-primary hover:text-white"
          : "bg-primary text-on-primary hover:bg-primary-dark",
      )}
      style={{
        ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg } : {}),
        ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}),
      }}
    >
      {ctaText}
    </Link>
  ) : null;

  if (variant === "fullWidth") {
    return (
      <section
        className={cn(
          "relative overflow-hidden",
          !hasSectionBg && (dark ? "bg-secondary" : "bg-white"),
        )}
      >
        <div className="relative w-full h-[300px] @min-[640px]:h-[400px] @min-[768px]:h-[500px]">
          <ImageBlock image={image} heading={heading} />
          {imageOverlay && <div className="absolute inset-0" style={{ backgroundColor: imageOverlay }} />}
          <div
            className={cn(
              "absolute inset-0 bg-linear-to-t",
              dark ? "from-secondary via-secondary/60 to-transparent" : "from-white via-white/60 to-transparent",
            )}
          />
        </div>
        <div className="relative max-w-[800px] mx-auto px-4 @min-[768px]:px-8 -mt-32 pb-20 text-center">
          {headingEl}
          {contentBlocks}
          {ctaButton}
        </div>
      </section>
    );
  }

  const imageOnLeft = variant === "imageLeft";

  return (
    <section
      className={cn(
        "py-12 @min-[768px]:py-20 px-4 @min-[768px]:px-8 @min-[1024px]:px-16",
        !hasSectionBg && (dark ? "bg-secondary" : "bg-white"),
      )}
    >
      <div className="max-w-[1325px] mx-auto grid @min-[768px]:grid-cols-2 gap-8 @min-[768px]:gap-12 items-center">
        <div
          className={cn(
            "relative w-full aspect-[4/3] bg-slate-200 rounded-lg overflow-hidden shadow-xl",
            imageOnLeft ? "@min-[768px]:order-1" : "@min-[768px]:order-2",
          )}
        >
          <ImageBlock image={image} heading={heading} />
          {imageOverlay && <div className="absolute inset-0" style={{ backgroundColor: imageOverlay }} />}
        </div>
        <div className={imageOnLeft ? "@min-[768px]:order-2" : "@min-[768px]:order-1"}>
          {headingEl}
          {contentBlocks}
          {ctaButton}
        </div>
      </div>
    </section>
  );
};
