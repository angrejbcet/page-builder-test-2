"use client";

import React from "react";
import Link from "next/link";
import { Tag } from "lucide-react";
import { useModal } from "@/providers/ModalProvider";

export interface OfferRowProps {
  heading: string;
  subheadline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image?: string;
  variant?: "banner" | "centered" | "card" | string;
  dark?: boolean;
  elementStyles?: Record<string, string>;
}

type VariantProps = Omit<OfferRowProps, "variant">;

const hasRealImage = (src?: string) =>
  src?.startsWith("data:") || src?.startsWith("http");

function CtaButton({
  ctaText,
  ctaLink,
  className,
  style,
}: {
  ctaText: string;
  ctaLink: string;
  className: string;
  style?: React.CSSProperties;
}) {
  const { openContactModal } = useModal();

  if (ctaLink === "/contact") {
    return (
      <button onClick={openContactModal} className={`${className} cursor-pointer`} style={style}>
        {ctaText}
      </button>
    );
  }
  return (
    <Link href={ctaLink} className={className} style={style}>
      {ctaText}
    </Link>
  );
}

function CenteredVariant({
  heading,
  subheadline,
  description,
  ctaText,
  ctaLink = "/contact",
  image,
  dark = false,
  elementStyles,
}: VariantProps) {
  return (
    <section
      className={`relative text-white py-10 @min-[768px]:py-16 px-4 @min-[768px]:px-8 overflow-hidden ${
        dark ? "border-b-4 border-secondary" : "border-b-4 border-primary-dark"
      }`}
      style={{ backgroundColor: dark ? "var(--color-secondary, #1e293b)" : "var(--color-primary)" }}
    >
      {hasRealImage(image) && (
        <>
          <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className={`absolute inset-0 ${dark ? "bg-secondary/85" : "bg-primary/80"}`} />
        </>
      )}
      {!hasRealImage(image) && dark && <div className="absolute inset-0 bg-secondary" />}

      <div className="relative max-w-[900px] mx-auto text-center">
        <div className="flex items-center justify-center mb-2 opacity-90">
          <Tag className="w-5 h-5 mr-2" />
          <span className="font-bold tracking-wider uppercase text-sm" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>{heading}</span>
        </div>

        <h2 className="text-2xl @min-[640px]:text-3xl @min-[768px]:text-4xl font-extrabold mb-3" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
          {subheadline}
        </h2>
        <p className="text-white/90 text-base @min-[768px]:text-lg max-w-2xl mx-auto leading-relaxed mb-8" style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
          {description}
        </p>

        <CtaButton
          ctaText={ctaText}
          ctaLink={ctaLink}
          className="inline-block bg-black hover:bg-secondary text-white text-lg font-bold py-3 px-6 @min-[768px]:py-4 @min-[768px]:px-10 rounded-md shadow-lg transform hover:-translate-y-1 transition-all"
          style={elementStyles?.ctaBg || elementStyles?.ctaText ? { ...(elementStyles.ctaBg && { backgroundColor: elementStyles.ctaBg }), ...(elementStyles.ctaText && { color: elementStyles.ctaText }) } : undefined}
        />
      </div>
    </section>
  );
}

function CardVariant({
  heading,
  subheadline,
  description,
  ctaText,
  ctaLink = "/contact",
  image,
  dark = false,
  elementStyles,
}: VariantProps) {
  return (
    <section
      className={`py-10 @min-[768px]:py-16 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary" : "bg-slate-50"
      }`}
    >
      <div className="relative max-w-[900px] mx-auto rounded-2xl p-6 @min-[768px]:p-10 bg-primary text-on-primary overflow-hidden">
        {hasRealImage(image) && (
          <>
            <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/85" />
          </>
        )}

        <div className="relative flex flex-col @min-[1024px]:flex-row items-center justify-between gap-6 @min-[768px]:gap-8">
          <div className="flex-1 text-center @min-[1024px]:text-left">
            <div className="flex items-center justify-center @min-[1024px]:justify-start mb-2 opacity-90">
              <Tag className="w-5 h-5 mr-2" />
              <span className="font-bold tracking-wider uppercase text-sm" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>{heading}</span>
            </div>
            <h2 className="text-2xl @min-[640px]:text-3xl @min-[768px]:text-4xl font-extrabold mb-3" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
              {subheadline}
            </h2>
            <p className="text-white/90 text-base @min-[768px]:text-lg max-w-3xl leading-relaxed" style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
              {description}
            </p>
          </div>

          <div className="flex-shrink-0 w-full @min-[1024px]:w-auto">
            <CtaButton
              ctaText={ctaText}
              ctaLink={ctaLink}
              className="block w-full text-center bg-black hover:bg-secondary text-white text-lg font-bold py-3 px-4 @min-[768px]:py-4 @min-[768px]:px-10 rounded-md shadow-lg transform hover:-translate-y-1 transition-all"
              style={elementStyles?.ctaBg || elementStyles?.ctaText ? { ...(elementStyles.ctaBg && { backgroundColor: elementStyles.ctaBg }), ...(elementStyles.ctaText && { color: elementStyles.ctaText }) } : undefined}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export const OfferRow: React.FC<OfferRowProps> = ({
  heading,
  subheadline,
  description,
  ctaText,
  ctaLink = "/contact",
  image,
  variant = "banner",
  dark = false,
  elementStyles,
}) => {
  const shared = { heading, subheadline, description, ctaText, ctaLink, image, dark, elementStyles };

  if (variant === "centered") return <CenteredVariant {...shared} />;
  if (variant === "card") return <CardVariant {...shared} />;

  const hasImage = hasRealImage(image);

  return (
    <section
      className={`relative text-white py-8 @min-[768px]:py-12 px-4 @min-[768px]:px-8 overflow-hidden ${
        dark ? "border-b-4 border-secondary" : "border-b-4 border-primary-dark"
      }`}
      style={{ backgroundColor: dark ? "var(--color-secondary, #1e293b)" : "var(--color-primary)" }}
    >
      {hasImage && (
        <>
          <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className={`absolute inset-0 ${dark ? "bg-secondary/85" : "bg-primary/80"}`} />
        </>
      )}
      {!hasImage && dark && <div className="absolute inset-0 bg-secondary" />}

      <div className="relative max-w-[1325px] mx-auto flex flex-col @min-[1024px]:flex-row items-center justify-between gap-6 @min-[768px]:gap-8">
        <div className="flex-1 text-center @min-[1024px]:text-left">
          <div className="flex items-center justify-center @min-[1024px]:justify-start mb-2 opacity-90">
            <Tag className="w-5 h-5 mr-2" />
            <span className="font-bold tracking-wider uppercase text-sm" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>{heading}</span>
          </div>
          <h2 className="text-2xl @min-[640px]:text-3xl @min-[768px]:text-4xl font-extrabold mb-3" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
            {subheadline}
          </h2>
          <p className="text-white/90 text-base @min-[768px]:text-lg max-w-3xl leading-relaxed" style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
            {description}
          </p>
        </div>

        <div className="flex-shrink-0 w-full @min-[1024px]:w-auto">
          <CtaButton
            ctaText={ctaText}
            ctaLink={ctaLink}
            className="block w-full text-center bg-black hover:bg-secondary text-white text-lg font-bold py-3 px-4 @min-[768px]:py-4 @min-[768px]:px-10 rounded-md shadow-lg transform hover:-translate-y-1 transition-all"
            style={elementStyles?.ctaBg || elementStyles?.ctaText ? { ...(elementStyles.ctaBg && { backgroundColor: elementStyles.ctaBg }), ...(elementStyles.ctaText && { color: elementStyles.ctaText }) } : undefined}
          />
        </div>
      </div>
    </section>
  );
};
