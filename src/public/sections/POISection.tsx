"use client";

import React from "react";
import { MapPin } from "lucide-react";

interface POIItem {
  id: string;
  name: string;
}

export interface POISectionProps {
  heading: string;
  highlight?: string;
  description?: string;
  items: POIItem[];
  dark?: boolean;
  variant?: "grid" | "list" | "tags" | string;
  elementStyles?: Record<string, string>;
}

type VariantProps = Omit<POISectionProps, "variant">;

const ListVariant: React.FC<VariantProps> = ({
  heading,
  highlight,
  description,
  items = [],
  dark = false,
  elementStyles,
}) => (
  <section
    className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
      dark ? "bg-secondary text-white" : "bg-white"
    }`}
  >
    <div className="max-w-[1200px] mx-auto">
      <div className="text-center mb-10">
        <h2
          className={`text-2xl @min-[640px]:text-3xl @min-[768px]:text-4xl font-bold mb-4 ${
            dark ? "text-white" : "text-gray-900"
          }`}
          style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          {heading}{" "}
          {highlight && <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>}
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
        {description && (
          <p className={`mt-4 text-base @min-[768px]:text-lg max-w-2xl mx-auto ${dark ? "text-gray-300" : "text-gray-600"}`} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
            {description}
          </p>
        )}
      </div>

      <div className={`max-w-[800px] mx-auto rounded-xl border overflow-hidden ${
        dark ? "border-white/10" : "border-slate-100"
      }`}>
        <div className={`divide-y ${dark ? "divide-white/10" : "divide-slate-100"}`}>
          {items.map((poi, idx) => (
            <div
              key={poi.id || `poi-${idx}`}
              className="flex items-start gap-3 py-4 px-4 @min-[768px]:px-5"
            >
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className={`text-base font-medium ${dark ? "text-gray-200" : "text-gray-700"}`} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
                {poi.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const TagsVariant: React.FC<VariantProps> = ({
  heading,
  highlight,
  description,
  items = [],
  dark = false,
  elementStyles,
}) => (
  <section
    className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
      dark ? "bg-secondary text-white" : "bg-white"
    }`}
  >
    <div className="max-w-[1200px] mx-auto">
      <div className="text-center mb-10">
        <h2
          className={`text-2xl @min-[640px]:text-3xl @min-[768px]:text-4xl font-bold mb-4 ${
            dark ? "text-white" : "text-gray-900"
          }`}
          style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          {heading}{" "}
          {highlight && <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>}
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
        {description && (
          <p className={`mt-4 text-base @min-[768px]:text-lg max-w-2xl mx-auto ${dark ? "text-gray-300" : "text-gray-600"}`} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 @min-[768px]:gap-3">
        {items.map((poi, idx) => (
          <span
            key={poi.id || `poi-${idx}`}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
              dark
                ? "bg-white/5 text-gray-200 border border-white/10"
                : "bg-slate-50 text-gray-700 border border-slate-100"
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
            {poi.name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export const POISection: React.FC<POISectionProps> = ({
  heading,
  highlight,
  description,
  items = [],
  dark = false,
  variant = "grid",
  elementStyles,
}) => {
  if (items.length === 0) return null;

  if (variant === "list") return <ListVariant heading={heading} highlight={highlight} description={description} items={items} dark={dark} elementStyles={elementStyles} />;
  if (variant === "tags") return <TagsVariant heading={heading} highlight={highlight} description={description} items={items} dark={dark} elementStyles={elementStyles} />;

  return (
    <section
      className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-white"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10">
          <h2
            className={`text-2xl @min-[640px]:text-3xl @min-[768px]:text-4xl font-bold mb-4 ${
              dark ? "text-white" : "text-gray-900"
            }`}
            style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
          >
            {heading}{" "}
            {highlight && <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
          {description && (
            <p className={`mt-4 text-base @min-[768px]:text-lg max-w-2xl mx-auto ${dark ? "text-gray-300" : "text-gray-600"}`} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
              {description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 @min-[640px]:grid-cols-2 @min-[768px]:grid-cols-3 @min-[1024px]:grid-cols-4 gap-4">
          {items.map((poi, idx) => (
            <div
              key={poi.id || `poi-${idx}`}
              className={`flex items-center gap-3 p-3 @min-[768px]:p-4 rounded-xl ${
                dark
                  ? "bg-white/5 text-gray-200"
                  : "bg-slate-50 text-gray-700 border border-slate-100"
              }`}
            >
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm font-medium break-words min-w-0" style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>{poi.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
