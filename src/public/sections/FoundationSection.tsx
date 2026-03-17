"use client";

import React from "react";
import Link from "next/link";
import { cn, normalizeContentBlocks } from "@/public/lib/utils";
import { useModal } from "@/providers/ModalProvider";
import type { ContentBlock } from "@/public/lib/types";

export interface FoundationProps {
  heading: string;
  highlight: string;
  content: unknown;
  image: string;
  imagePosition?: "left" | "right";
  ctaText?: string;
  ctaLink?: string;
  dark?: boolean;
  variant?: "standard" | "card" | "stacked" | string;
  elementStyles?: Record<string, string>;
}

type FoundationVariantProps = Omit<FoundationProps, "variant">;

function FoundationImage({ image }: { image: string }) {
  if (image?.startsWith("data:") || image?.startsWith("http")) {
    return (
      <img
        src={image}
        alt="Foundation"
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }
  return (
    <>
      <div className="absolute inset-0" style={{ backgroundColor: "#e2e8f0" }} />
      <div className="absolute inset-0 bg-black/5 flex items-center justify-center text-slate-500 font-medium">
        [Foundation Image]
      </div>
    </>
  );
}

function RenderBlock({ block, dark, bodyStyle }: { block: ContentBlock; dark: boolean; bodyStyle?: React.CSSProperties }) {
  const textClass = cn("leading-relaxed text-base @min-[768px]:text-lg", dark ? "text-gray-300" : "text-gray-600");
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

function FoundationContent({
  heading,
  highlight,
  content,
  dark = false,
  ctaText,
  ctaLink = "/contact",
  elementStyles,
}: Pick<FoundationVariantProps, "heading" | "highlight" | "content" | "dark" | "ctaText" | "ctaLink" | "elementStyles">) {
  const { openContactModal } = useModal();
  const blocks = normalizeContentBlocks(content);
  const bodyStyle = elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined;

  return (
    <>
      <h2
        className={cn(
          "text-2xl @min-[768px]:text-3xl @min-[1024px]:text-4xl font-bold mb-6 leading-tight",
          dark ? "text-white" : "text-secondary"
        )}
        style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
      >
        {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
      </h2>

      <div className="w-16 h-1 bg-primary rounded-full mb-8" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />

      <div className="space-y-6">
        {blocks.map((block) => (
          <RenderBlock key={block.id} block={block} dark={dark} bodyStyle={bodyStyle} />
        ))}
      </div>

      {ctaText && ctaLink && (
        <div className="mt-8">
          {ctaLink === "/contact" ? (
            <button
              onClick={openContactModal}
              className={cn(
                "inline-block font-medium px-8 py-3 rounded transition-colors cursor-pointer",
                dark
                  ? "bg-white text-secondary hover:bg-primary hover:text-white"
                  : "bg-primary text-on-primary hover:bg-primary-dark"
              )}
              style={{
                ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg } : {}),
                ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}),
              }}
            >
              {ctaText}
            </button>
          ) : (
            <Link
              href={ctaLink}
              className={cn(
                "inline-block font-medium px-8 py-3 rounded transition-colors",
                dark
                  ? "bg-white text-secondary hover:bg-primary hover:text-white"
                  : "bg-primary text-on-primary hover:bg-primary-dark"
              )}
              style={{
                ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg } : {}),
                ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}),
              }}
            >
              {ctaText}
            </Link>
          )}
        </div>
      )}
    </>
  );
}

function CardVariant({
  heading,
  highlight,
  content = [],
  image,
  imagePosition = "right",
  ctaText,
  ctaLink,
  dark = false,
  elementStyles,
}: FoundationVariantProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <section
      className={cn(
        "py-12 @min-[768px]:py-20 px-4 @min-[768px]:px-8",
        dark ? "bg-secondary" : "bg-white"
      )}
    >
      <div className="max-w-[1325px] mx-auto grid @min-[768px]:grid-cols-2 gap-8 items-center">
        <div
          className={cn(
            "relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl",
            isImageLeft ? "@min-[768px]:order-1" : "@min-[768px]:order-2"
          )}
        >
          <FoundationImage image={image} />
        </div>

        <div
          className={cn(
            "rounded-xl border shadow-lg p-6 @min-[768px]:p-8",
            dark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-100",
            isImageLeft ? "@min-[768px]:order-2" : "@min-[768px]:order-1"
          )}
        >
          <FoundationContent
            heading={heading}
            highlight={highlight}
            content={content}
            dark={dark}
            ctaText={ctaText}
            ctaLink={ctaLink}
            elementStyles={elementStyles}
          />
        </div>
      </div>
    </section>
  );
}

function StackedVariant({
  heading,
  highlight,
  content = [],
  image,
  ctaText,
  ctaLink,
  dark = false,
  elementStyles,
}: FoundationVariantProps) {
  return (
    <section
      className={cn(
        "py-12 @min-[768px]:py-20 px-4 @min-[768px]:px-8",
        dark ? "bg-secondary" : "bg-white"
      )}
    >
      <div className="max-w-[1325px] mx-auto">
        <div className="relative w-full h-[300px] @min-[768px]:h-[400px] rounded-xl overflow-hidden">
          <FoundationImage image={image} />
        </div>

        <div className="max-w-[800px] mx-auto mt-10">
          <FoundationContent
            heading={heading}
            highlight={highlight}
            content={content}
            dark={dark}
            ctaText={ctaText}
            ctaLink={ctaLink}
            elementStyles={elementStyles}
          />
        </div>
      </div>
    </section>
  );
}

export const FoundationSection: React.FC<FoundationProps> = ({
  variant = "standard",
  ...props
}) => {
  if (variant === "card") return <CardVariant {...props} />;
  if (variant === "stacked") return <StackedVariant {...props} />;

  const {
    heading,
    highlight,
    content,
    image,
    imagePosition = "right",
    ctaText,
    ctaLink = "/contact",
    dark = false,
    elementStyles,
  } = props;
  const isImageLeft = imagePosition === "left";

  return (
    <section
      className={cn(
        "py-12 @min-[768px]:py-20 px-4 @min-[768px]:px-8",
        dark ? "bg-secondary" : "bg-white"
      )}
    >
      <div className="max-w-[1325px] mx-auto grid @min-[768px]:grid-cols-2 gap-8 @min-[768px]:gap-12 @min-[1024px]:gap-20 items-center">
        <div
          className={cn(
            "relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl",
            isImageLeft ? "@min-[768px]:order-1" : "@min-[768px]:order-2"
          )}
        >
          <FoundationImage image={image} />
        </div>

        <div
          className={cn(
            "flex flex-col justify-center",
            isImageLeft ? "@min-[768px]:order-2" : "@min-[768px]:order-1"
          )}
        >
          <FoundationContent
            heading={heading}
            highlight={highlight}
            content={content}
            dark={dark}
            ctaText={ctaText}
            ctaLink={ctaLink}
            elementStyles={elementStyles}
          />
        </div>
      </div>
    </section>
  );
};
