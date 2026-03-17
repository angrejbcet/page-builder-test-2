"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

interface ChecklistItem {
  id: string;
  text: string;
}

export interface ChecklistSectionProps {
  heading: string;
  highlight?: string;
  items: ChecklistItem[];
  dark?: boolean;
  variant?: "grid" | "singleColumn" | "minimal";
  elementStyles?: Record<string, string>;
}

type VariantProps = Omit<ChecklistSectionProps, "variant">;

const SingleColumnVariant: React.FC<VariantProps> = ({
  heading,
  highlight,
  items = [],
  dark = false,
  elementStyles,
}) => (
  <section
    className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
      dark ? "bg-secondary text-white" : "bg-primary/5"
    }`}
  >
    <div className="max-w-[900px] mx-auto">
      <div
        className={`rounded-2xl p-8 @min-[768px]:p-12 ${
          dark ? "bg-white/5" : "bg-white shadow-sm border border-primary/10"
        }`}
      >
        <div className="text-center mb-8 @min-[768px]:mb-10">
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

        <div className="space-y-3 pl-2">
          {items.map((item, idx) => (
            <div
              key={item.id || `check-${idx}`}
              className="flex items-start gap-3"
            >
              <CheckCircle
                className={`w-6 h-6 flex-shrink-0 mt-0.5 ${
                  dark ? "text-primary" : "text-green-600"
                }`}
              />
              <span
                className={`text-base leading-relaxed ${
                  dark ? "text-gray-200" : "text-gray-700"
                }`}
                style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
              >
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const MinimalVariant: React.FC<VariantProps> = ({
  heading,
  highlight,
  items = [],
  dark = false,
  elementStyles,
}) => (
  <section
    className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
      dark ? "bg-secondary text-white" : "bg-primary/5"
    }`}
  >
    <div className="max-w-[900px] mx-auto">
      <div className="text-center mb-8 @min-[768px]:mb-10">
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

      <div className="grid @min-[768px]:grid-cols-2 gap-x-8 gap-y-4">
        {items.map((item, idx) => (
          <div
            key={item.id || `check-${idx}`}
            className={`flex items-start gap-3 pb-4 border-b ${
              dark ? "border-white/10" : "border-slate-200"
            }`}
          >
            <CheckCircle
              className={`w-6 h-6 flex-shrink-0 mt-0.5 ${
                dark ? "text-primary" : "text-green-600"
              }`}
            />
            <span
              className={`text-base leading-relaxed ${
                dark ? "text-gray-200" : "text-gray-700"
              }`}
              style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
            >
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const ChecklistSection: React.FC<ChecklistSectionProps> = ({
  heading,
  highlight,
  items = [],
  dark = false,
  variant = "grid",
  elementStyles,
}) => {
  if (variant === "singleColumn")
    return <SingleColumnVariant heading={heading} highlight={highlight} items={items} dark={dark} elementStyles={elementStyles} />;
  if (variant === "minimal")
    return <MinimalVariant heading={heading} highlight={highlight} items={items} dark={dark} elementStyles={elementStyles} />;

  return (
    <section
      className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-primary/5"
      }`}
    >
      <div className="max-w-[900px] mx-auto">
        <div
          className={`rounded-2xl p-8 @min-[768px]:p-12 ${
            dark ? "bg-white/5" : "bg-white shadow-sm border border-primary/10"
          }`}
        >
          <div className="text-center mb-8 @min-[768px]:mb-10">
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

          <div className="grid @min-[768px]:grid-cols-2 gap-x-8 gap-y-4">
            {items.map((item, idx) => (
              <div
                key={item.id || `check-${idx}`}
                className="flex items-start gap-3"
              >
                <CheckCircle
                  className={`w-6 h-6 flex-shrink-0 mt-0.5 ${
                    dark ? "text-primary" : "text-green-600"
                  }`}
                />
                <span
                  className={`text-base leading-relaxed ${
                    dark ? "text-gray-200" : "text-gray-700"
                  }`}
                  style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                >
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
