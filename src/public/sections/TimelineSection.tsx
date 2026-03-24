"use client";

import React from "react";

interface MilestoneItem {
  id: string;
  year: string;
  title: string;
  description?: string;
}

export interface TimelineSectionProps {
  heading: string;
  highlight?: string;
  milestones: MilestoneItem[];
  dark?: boolean;
  variant?: "alternating" | "singleSide" | "horizontal" | string;
  elementStyles?: Record<string, string>;
}

type VariantProps = Omit<TimelineSectionProps, "variant">;

const SingleSideVariant: React.FC<VariantProps> = ({
  heading,
  highlight,
  milestones = [],
  dark = false,
  elementStyles,
}) => {
  return (
    <section
      className={`py-20 @min-[768px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
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
          <div
            className={`absolute left-[20px] @min-[768px]:left-[24px] top-0 bottom-0 w-0.5 -translate-x-1/2 ${
              dark ? "bg-white/20" : "bg-primary/20"
            }`}
          />

          <div className="space-y-8">
            {milestones.map((item, idx) => (
              <div
                key={item.id || `ms-${idx}`}
                className="relative flex gap-4 @min-[768px]:gap-6"
              >
                <div className="w-10 h-10 @min-[768px]:w-12 @min-[768px]:h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold flex-shrink-0 relative z-10 text-xs @min-[768px]:text-sm" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}>
                  {item.year}
                </div>

                <div className="flex-1">
                  <div
                    className={`p-4 @min-[768px]:p-5 rounded-xl ${
                      dark
                        ? "bg-white/5 border border-white/10"
                        : "bg-white shadow-sm border border-slate-100"
                    }`}
                  >
                    <h3
                      className={`text-lg font-bold mb-2 ${
                        dark ? "text-white" : "text-secondary"
                      }`}
                      style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
                    >
                      {item.title}
                    </h3>
                    {item.description && (
                      <p
                        className={`text-sm leading-relaxed ${
                          dark ? "text-gray-300" : "text-gray-600"
                        }`}
                        style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const HorizontalVariant: React.FC<VariantProps> = ({
  heading,
  highlight,
  milestones = [],
  dark = false,
  elementStyles,
}) => {
  return (
    <section
      className={`py-20 @min-[768px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
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

        {/* Mobile: simple vertical stack */}
        <div className="flex flex-col gap-6 @min-[768px]:hidden">
          {milestones.map((item, idx) => (
            <div
              key={item.id || `ms-${idx}`}
              className={`p-4 rounded-xl ${
                dark
                  ? "bg-white/5 border border-white/10"
                  : "bg-white shadow-sm border border-slate-100"
              }`}
            >
              <span className="text-primary font-extrabold text-base" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>
                {item.year}
              </span>
              <h3
                className={`text-lg font-bold mt-1 mb-2 ${
                  dark ? "text-white" : "text-secondary"
                }`}
                style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
              >
                {item.title}
              </h3>
              {item.description && (
                <p
                  className={`text-sm leading-relaxed ${
                    dark ? "text-gray-300" : "text-gray-600"
                  }`}
                  style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                >
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Desktop: horizontal scroll timeline */}
        <div className="hidden @min-[768px]:block">
          <div className="relative overflow-x-auto pb-4">
            <div
              className={`absolute top-[20px] left-0 right-0 h-0.5 ${
                dark ? "bg-white/20" : "bg-primary/20"
              }`}
            />

            <div className="flex gap-6 @min-[768px]:gap-8">
              {milestones.map((item, idx) => (
                <div
                  key={item.id || `ms-${idx}`}
                  className="relative flex-shrink-0 w-[280px] @min-[768px]:w-[320px]"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold relative z-10 text-xs" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}>
                      {item.year}
                    </div>
                  </div>

                  <div
                    className={`p-4 @min-[768px]:p-5 rounded-xl ${
                      dark
                        ? "bg-white/5 border border-white/10"
                        : "bg-white shadow-sm border border-slate-100"
                    }`}
                  >
                    <h3
                      className={`text-lg font-bold mb-2 ${
                        dark ? "text-white" : "text-secondary"
                      }`}
                      style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
                    >
                      {item.title}
                    </h3>
                    {item.description && (
                      <p
                        className={`text-sm leading-relaxed ${
                          dark ? "text-gray-300" : "text-gray-600"
                        }`}
                        style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  heading,
  highlight,
  milestones = [],
  dark = false,
  variant = "default",
  elementStyles,
}) => {
  if (variant === "singleSide")
    return <SingleSideVariant heading={heading} highlight={highlight} milestones={milestones} dark={dark} elementStyles={elementStyles} />;
  if (variant === "horizontal")
    return <HorizontalVariant heading={heading} highlight={highlight} milestones={milestones} dark={dark} elementStyles={elementStyles} />;

  // Default: alternating
  return (
    <section
      className={`py-20 @min-[768px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
      }`}
    >
      <div className="max-w-[900px] mx-auto">
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
          <div
            className={`absolute left-6 @min-[768px]:left-1/2 top-0 bottom-0 w-0.5 ${
              dark ? "bg-white/20" : "bg-primary/20"
            } -translate-x-1/2`}
          />

          <div className="space-y-10">
            {milestones.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={item.id || `ms-${idx}`}
                  className="relative flex items-start"
                >
                  <div
                    className={`absolute left-6 @min-[768px]:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-primary z-10 ${
                      dark ? "bg-secondary" : "bg-white"
                    }`}
                    style={{ top: "6px", ...(elementStyles?.accentColor ? { borderColor: elementStyles.accentColor } : {}) }}
                  />

                  <div
                    className={`ml-14 @min-[768px]:ml-0 @min-[768px]:w-[calc(50%-2rem)] ${
                      isLeft
                        ? "@min-[768px]:mr-auto @min-[768px]:pr-0"
                        : "@min-[768px]:ml-auto @min-[768px]:pl-0"
                    }`}
                  >
                    <div
                      className={`p-4 @min-[768px]:p-5 rounded-xl ${
                        dark
                          ? "bg-white/5"
                          : "bg-white shadow-sm border border-slate-100"
                      }`}
                    >
                      <span className="text-primary font-extrabold text-base @min-[768px]:text-lg" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>
                        {item.year}
                      </span>
                      <h3
                        className={`text-lg font-bold mt-1 mb-2 ${
                          dark ? "text-white" : "text-secondary"
                        }`}
                        style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
                      >
                        {item.title}
                      </h3>
                      {item.description && (
                        <p
                          className={`text-sm leading-relaxed ${
                            dark ? "text-gray-400" : "text-gray-600"
                          }`}
                          style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
