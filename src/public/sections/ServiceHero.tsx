"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useModal } from "@/providers/ModalProvider";

export interface ServiceHeroProps {
  headline: string;
  subheadline: string;
  offerText?: string;
  image: string;
  breadcrumbs?: { label: string; href: string }[];
  variant?: "standard" | "centered" | "split" | string;
  dark?: boolean;
  elementStyles?: Record<string, string>;
}

type VariantProps = Omit<ServiceHeroProps, "variant">;

const hasRealImage = (src?: string) =>
  src?.startsWith("data:") || src?.startsWith("http");

function CenteredVariant({
  headline,
  subheadline,
  offerText,
  image,
  breadcrumbs = [],
  dark = false,
  elementStyles,
}: VariantProps) {
  const { openContactModal } = useModal();
  const topPx = elementStyles?.topPadding ? parseInt(elementStyles.topPadding, 10) : 0;

  return (
    <section className="relative min-h-[360px] @min-[640px]:min-h-[420px] flex items-center overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: "#1e293b" }}>
        {hasRealImage(image) && (
          <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
      </div>
      <div
        className={`absolute inset-0 bg-gradient-to-b ${
          dark
            ? "from-secondary/95 via-secondary/85 to-secondary/70"
            : "from-secondary/90 via-secondary/75 to-secondary/50"
        }`}
      />

      <div className="relative z-10 max-w-[1325px] mx-auto w-full px-4 @min-[768px]:px-8 py-20 text-center" style={topPx ? { paddingTop: `${topPx}px` } : undefined}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center justify-center gap-2 text-sm text-gray-400 overflow-x-auto">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {i > 0 && <span>/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <a href={crumb.href || "#"} className="hover:text-white transition-colors">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-primary font-medium" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {offerText && (
          <span className="inline-block bg-primary text-on-primary text-sm font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}>
            {offerText}
          </span>
        )}

        <h1 className="text-4xl @min-[768px]:text-5xl @min-[1024px]:text-6xl font-bold text-white leading-tight max-w-3xl mx-auto mb-6" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
          {headline}
        </h1>
        <p className="text-base @min-[768px]:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed" style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
          {subheadline}
        </p>

        <div className="flex flex-col @min-[640px]:flex-row gap-4 justify-center">
          <button
            onClick={openContactModal}
            className="inline-flex items-center justify-center bg-primary text-on-primary font-bold px-5 py-3 @min-[768px]:px-8 @min-[768px]:py-4 rounded-md hover:bg-primary-dark transition-colors group cursor-pointer"
            style={{ ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg } : {}), ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}) } as React.CSSProperties}
          >
            Get a Free Estimate
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="tel:+17075551234"
            className="inline-flex items-center justify-center bg-white/10 border border-white/20 text-white font-bold px-5 py-3 @min-[768px]:px-8 @min-[768px]:py-4 rounded-md hover:bg-white/20 transition-colors"
          >
            Call (707) 555-1234
          </a>
        </div>
      </div>
    </section>
  );
}

function SplitVariant({
  headline,
  subheadline,
  offerText,
  image,
  dark = false,
  elementStyles,
}: VariantProps) {
  const { openContactModal } = useModal();

  return (
    <section className={`py-12 @min-[768px]:py-20 ${dark ? "bg-secondary" : "bg-white"}`}>
      <div className="max-w-[1325px] mx-auto px-4 @min-[768px]:px-8">
        <div className="grid grid-cols-1 @min-[768px]:grid-cols-2 gap-8 @min-[1024px]:gap-12 items-center">
          {/* Image - shown first on mobile */}
          <div className="order-1 @min-[768px]:order-2">
            {hasRealImage(image) ? (
              <img
                src={image}
                alt=""
                className="w-full h-[280px] @min-[640px]:h-[340px] @min-[768px]:h-[400px] object-cover rounded-2xl"
              />
            ) : (
              <div className="w-full h-[280px] @min-[640px]:h-[340px] @min-[768px]:h-[400px] bg-slate-200 rounded-2xl" />
            )}
          </div>

          {/* Content */}
          <div className="order-2 @min-[768px]:order-1">
            {offerText && (
              <span className="inline-block bg-primary text-on-primary text-sm font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}>
                {offerText}
              </span>
            )}

            <h1
              className={`text-3xl @min-[768px]:text-4xl @min-[1024px]:text-5xl font-bold leading-tight mb-6 ${
                dark ? "text-white" : "text-secondary"
              }`}
              style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
            >
              {headline}
            </h1>
            <p
              className={`text-base @min-[768px]:text-lg mb-8 leading-relaxed ${
                dark ? "text-gray-300" : "text-gray-600"
              }`}
              style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
            >
              {subheadline}
            </p>

            <div className="flex flex-col @min-[640px]:flex-row gap-4">
              <button
                onClick={openContactModal}
                className="inline-flex items-center bg-primary text-on-primary font-bold px-5 py-3 @min-[768px]:px-8 @min-[768px]:py-4 rounded-md hover:bg-primary-dark transition-colors group cursor-pointer"
                style={{ ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg } : {}), ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}) } as React.CSSProperties}
              >
                Get a Free Estimate
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="tel:+17075551234"
                className={`inline-flex items-center font-bold px-5 py-3 @min-[768px]:px-8 @min-[768px]:py-4 rounded-md transition-colors ${
                  dark
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-white text-secondary hover:bg-slate-50 border border-slate-200"
                }`}
              >
                Call (707) 555-1234
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const ServiceHero: React.FC<ServiceHeroProps> = ({
  headline,
  subheadline,
  offerText,
  image,
  breadcrumbs = [],
  variant = "standard",
  dark = false,
  elementStyles,
}) => {
  const shared = { headline, subheadline, offerText, image, breadcrumbs, dark, elementStyles };

  if (variant === "centered") return <CenteredVariant {...shared} />;
  if (variant === "split") return <SplitVariant {...shared} />;

  const { openContactModal } = useModal();
  const topPx = elementStyles?.topPadding ? parseInt(elementStyles.topPadding, 10) : 0;

  return (
    <section className="relative min-h-[360px] @min-[640px]:min-h-[420px] flex items-center overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundColor: "#1e293b" }}>
        {hasRealImage(image) && (
          <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
      </div>
      <div
        className={`absolute inset-0 bg-gradient-to-r ${
          dark
            ? "from-secondary/95 via-secondary/85 to-secondary/50"
            : "from-secondary/95 via-secondary/80 to-secondary/40"
        }`}
      />

      <div className="relative z-10 max-w-[1325px] mx-auto w-full px-4 @min-[768px]:px-8 py-20" style={topPx ? { paddingTop: `${topPx}px` } : undefined}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-400 overflow-x-auto">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {i > 0 && <span>/</span>}
                  {i < breadcrumbs.length - 1 ? (
                    <a
                      href={crumb.href || "#"}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-primary font-medium" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {offerText && (
          <span className="inline-block bg-primary text-on-primary text-sm font-bold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}>
            {offerText}
          </span>
        )}

        <h1 className="text-4xl @min-[768px]:text-5xl @min-[1024px]:text-6xl font-bold text-white leading-tight max-w-3xl mb-6" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
          {headline}
        </h1>
        <p className="text-base @min-[768px]:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed" style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
          {subheadline}
        </p>

        <div className="flex flex-col @min-[640px]:flex-row gap-4">
          <button
            onClick={openContactModal}
            className="inline-flex items-center bg-primary text-on-primary font-bold px-5 py-3 @min-[768px]:px-8 @min-[768px]:py-4 rounded-md hover:bg-primary-dark transition-colors group cursor-pointer"
            style={{ ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg } : {}), ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}) } as React.CSSProperties}
          >
            Get a Free Estimate
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </button>
          <a
            href="tel:+17075551234"
            className="inline-flex items-center bg-white/10 border border-white/20 text-white font-bold px-5 py-3 @min-[768px]:px-8 @min-[768px]:py-4 rounded-md hover:bg-white/20 transition-colors"
          >
            Call (707) 555-1234
          </a>
        </div>
      </div>
    </section>
  );
};
