"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface RelatedService {
  id: string;
  title: string;
  description: string;
  image?: string;
  link: string;
}

export interface RelatedServicesSectionProps {
  heading: string;
  highlight?: string;
  services: RelatedService[];
  dark?: boolean;
  variant?: "grid" | "list" | "compact" | string;
  elementStyles?: Record<string, string>;
}

type RelatedServicesVariantProps = Omit<RelatedServicesSectionProps, "variant">;

function RelatedSectionHeader({ heading, highlight, dark, elementStyles }: { heading: string; highlight?: string; dark: boolean; elementStyles?: Record<string, string> }) {
  return (
    <div className="text-center mb-14">
      <h2
        className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${
          dark ? "text-white" : "text-gray-900"
        }`}
        style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
      >
        {heading}{" "}
        {highlight && <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>}
      </h2>
      <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
    </div>
  );
}

function ServiceImage({ image, title, className }: { image?: string; title: string; className: string }) {
  const hasImg = image?.startsWith("data:") || image?.startsWith("http");
  if (hasImg) {
    return <img src={image} alt={title} className={`object-cover ${className}`} />;
  }
  return (
    <div className={`bg-slate-200 flex items-center justify-center ${className}`}>
      <span className="text-slate-400 text-xs">[Service Image]</span>
    </div>
  );
}

const ListVariant: React.FC<RelatedServicesVariantProps> = ({
  heading,
  highlight,
  services = [],
  dark = false,
  elementStyles,
}) => {
  return (
    <section
      className={`py-12 @min-[768px]:py-16 @min-[1024px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-white"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <RelatedSectionHeader heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />

        <div className={`divide-y ${dark ? "divide-white/10" : "divide-slate-200"}`}>
          {services.map((svc, idx) => (
            <Link
              key={svc.id || `related-${idx}`}
              href={svc.link || "#"}
              className="group flex flex-col @min-[640px]:flex-row gap-4 @min-[768px]:gap-6 py-6 first:pt-0 last:pb-0"
            >
              <ServiceImage
                image={svc.image}
                title={svc.title}
                className="w-full @min-[640px]:w-24 @min-[640px]:h-24 @min-[768px]:w-32 @min-[768px]:h-32 rounded-lg flex-shrink-0 aspect-[4/3] @min-[640px]:aspect-square"
              />
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-lg font-bold mb-2 group-hover:text-primary transition-colors ${
                    dark ? "text-white" : "text-secondary"
                  }`}
                  style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}
                >
                  {svc.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-3 ${
                    dark ? "text-gray-400" : "text-gray-600"
                  }`}
                  style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}
                >
                  {svc.description}
                </p>
                <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:underline" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>
                  Learn More
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const CompactVariant: React.FC<RelatedServicesVariantProps> = ({
  heading,
  highlight,
  services = [],
  dark = false,
  elementStyles,
}) => {
  return (
    <section
      className={`py-12 @min-[768px]:py-16 @min-[1024px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-white"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <RelatedSectionHeader heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />

        <div className="grid grid-cols-2 @min-[768px]:grid-cols-3 @min-[1024px]:grid-cols-4 gap-3 @min-[768px]:gap-4">
          {services.map((svc, idx) => (
            <Link
              key={svc.id || `related-${idx}`}
              href={svc.link || "#"}
              className={`group rounded-xl overflow-hidden transition-all ${
                dark
                  ? "bg-white/5 hover:bg-white/10 border border-white/10"
                  : "bg-slate-50 hover:shadow-md border border-slate-100"
              }`}
              style={{ ...(elementStyles?.cardBg && { backgroundColor: elementStyles.cardBg }), ...(elementStyles?.cardBorder && { borderColor: elementStyles.cardBorder }) }}
            >
              <ServiceImage
                image={svc.image}
                title={svc.title}
                className="w-full aspect-[4/3]"
              />
              <div className="p-3 @min-[768px]:p-4">
                <h3
                  className={`text-sm @min-[768px]:text-base font-bold mb-2 group-hover:text-primary transition-colors ${
                    dark ? "text-white" : "text-secondary"
                  }`}
                  style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}
                >
                  {svc.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-primary text-xs @min-[768px]:text-sm font-semibold group-hover:underline" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>
                  Learn More
                  <ArrowRight className="w-3 h-3 @min-[768px]:w-4 @min-[768px]:h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export const RelatedServicesSection: React.FC<RelatedServicesSectionProps> = ({
  heading,
  highlight,
  services = [],
  dark = false,
  variant = "grid",
  elementStyles,
}) => {
  if (variant === "list") return <ListVariant heading={heading} highlight={highlight} services={services} dark={dark} elementStyles={elementStyles} />;
  if (variant === "compact") return <CompactVariant heading={heading} highlight={highlight} services={services} dark={dark} elementStyles={elementStyles} />;

  return (
    <section
      className={`py-12 @min-[768px]:py-16 @min-[1024px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-white"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <RelatedSectionHeader heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />

        <div className="grid @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-4 gap-4 @min-[768px]:gap-6">
          {services.map((svc, idx) => {
            const hasImg =
              svc.image?.startsWith("data:") || svc.image?.startsWith("http");
            return (
              <Link
                key={svc.id || `related-${idx}`}
                href={svc.link || "#"}
                className={`group rounded-xl overflow-hidden transition-all ${
                  dark
                    ? "bg-white/5 hover:bg-white/10 border border-white/10"
                    : "bg-slate-50 hover:shadow-md border border-slate-100"
                }`}
                style={{ ...(elementStyles?.cardBg && { backgroundColor: elementStyles.cardBg }), ...(elementStyles?.cardBorder && { borderColor: elementStyles.cardBorder }) }}
              >
                {hasImg ? (
                  <img
                    src={svc.image}
                    alt={svc.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-slate-200 flex items-center justify-center">
                    <span className="text-slate-400 text-xs">[Service Image]</span>
                  </div>
                )}
                <div className="p-5">
                  <h3
                    className={`text-lg font-bold mb-2 group-hover:text-primary transition-colors ${
                      dark ? "text-white" : "text-secondary"
                    }`}
                    style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-3 ${
                      dark ? "text-gray-400" : "text-gray-600"
                    }`}
                    style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}
                  >
                    {svc.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-semibold group-hover:underline" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>
                    Learn More
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
