"use client";

import React from "react";

interface StepItem {
  id: string;
  title: string;
  description: string;
}

export interface ProcessStepsSectionProps {
  heading: string;
  highlight?: string;
  steps: StepItem[];
  dark?: boolean;
  variant?: "grid" | "vertical" | "numbered" | string;
  elementStyles?: Record<string, string>;
}

type VariantProps = Omit<ProcessStepsSectionProps, "variant">;

const VerticalVariant: React.FC<VariantProps> = ({
  heading,
  highlight,
  steps = [],
  dark = false,
  elementStyles,
}) => {
  return (
    <section
      className={`py-20 @min-[768px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-white"
      }`}
    >
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-10 @min-[768px]:mb-14">
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

        <div className="relative">
          {steps.map((step, idx) => (
            <div
              key={step.id || `step-${idx}`}
              className="relative flex gap-4 @min-[768px]:gap-6 pb-10 last:pb-0"
            >
              {idx < steps.length - 1 && (
                <div
                  className={`absolute left-[20px] @min-[768px]:left-[24px] top-10 @min-[768px]:top-12 bottom-0 w-0.5 -translate-x-1/2 ${
                    dark ? "bg-white/20" : "bg-slate-200"
                  }`}
                />
              )}

              <div className="w-10 h-10 @min-[768px]:w-12 @min-[768px]:h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold flex-shrink-0 relative z-10 text-sm @min-[768px]:text-base" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}>
                {idx + 1}
              </div>

              <div className="pt-1 @min-[768px]:pt-2">
                <h3
                  className={`text-base @min-[768px]:text-lg font-bold mb-2 ${
                    dark ? "text-white" : "text-secondary"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    dark ? "text-gray-300" : "text-gray-600"
                  }`}
                  style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NumberedVariant: React.FC<VariantProps> = ({
  heading,
  highlight,
  steps = [],
  dark = false,
  elementStyles,
}) => {
  return (
    <section
      className={`py-20 @min-[768px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-white"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10 @min-[768px]:mb-14">
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

        {/* Mobile: vertical stacked */}
        <div className="flex flex-col gap-8 @min-[768px]:hidden">
          {steps.map((step, idx) => (
            <div key={step.id || `step-${idx}`} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold flex-shrink-0 text-sm" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}>
                {idx + 1}
              </div>
              <div>
                <h3
                  className={`text-base font-bold mb-2 ${
                    dark ? "text-white" : "text-secondary"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    dark ? "text-gray-300" : "text-gray-600"
                  }`}
                  style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: horizontal numbered line */}
        <div className="hidden @min-[768px]:block">
          <div className="relative flex justify-between">
            <div
              className={`absolute top-[20px] left-0 right-0 h-0.5 ${
                dark ? "bg-white/20" : "bg-slate-200"
              }`}
            />

            {steps.map((step, idx) => (
              <div
                key={step.id || `step-${idx}`}
                className="relative flex flex-col items-center text-center flex-1 px-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold relative z-10 text-sm mb-4" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}>
                  {idx + 1}
                </div>

                <h3
                  className={`text-base @min-[1024px]:text-lg font-bold mb-2 ${
                    dark ? "text-white" : "text-secondary"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed ${
                    dark ? "text-gray-300" : "text-gray-600"
                  }`}
                  style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const ProcessStepsSection: React.FC<ProcessStepsSectionProps> = ({
  heading,
  highlight,
  steps = [],
  dark = false,
  variant = "default",
  elementStyles,
}) => {
  if (variant === "vertical")
    return <VerticalVariant heading={heading} highlight={highlight} steps={steps} dark={dark} elementStyles={elementStyles} />;
  if (variant === "numbered")
    return <NumberedVariant heading={heading} highlight={highlight} steps={steps} dark={dark} elementStyles={elementStyles} />;

  // Default: grid
  return (
    <section
      className={`py-20 @min-[768px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-white"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-10 @min-[768px]:mb-14">
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

        <div className="grid @min-[768px]:grid-cols-2 @min-[1024px]:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={step.id || `step-${idx}`}
              className={`relative text-center p-5 @min-[768px]:p-8 rounded-xl ${
                dark
                  ? "bg-white/5"
                  : "bg-slate-50 border border-slate-100"
              }`}
            >
              <div className="text-4xl @min-[768px]:text-6xl font-extrabold text-primary/20 mb-4 leading-none">
                {idx + 1}
              </div>
              <h3
                className={`text-base @min-[768px]:text-lg font-bold mb-3 ${
                  dark ? "text-white" : "text-secondary"
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  dark ? "text-gray-300" : "text-gray-600"
                }`}
                style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
              >
                {step.description}
              </p>
              {idx < steps.length - 1 && (
                <div className="hidden @min-[1024px]:block absolute top-12 -right-4 text-primary/30 text-3xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
