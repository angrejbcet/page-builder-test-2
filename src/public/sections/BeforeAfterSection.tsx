"use client";

import React, { useState } from "react";

interface BeforeAfterPair {
  id: string;
  beforeImage: string;
  afterImage: string;
  label?: string;
}

export interface BeforeAfterSectionProps {
  heading: string;
  highlight?: string;
  pairs: BeforeAfterPair[];
  dark?: boolean;
  variant?: "sideBySide" | "stacked" | "slider" | string;
  elementStyles?: Record<string, string>;
}

type VariantProps = Omit<BeforeAfterSectionProps, "variant">;

function hasRealImage(src?: string): boolean {
  return !!src && (src.startsWith("data:") || src.startsWith("http"));
}

function SectionHeader({ heading, highlight, dark, elementStyles }: { heading: string; highlight?: string; dark: boolean; elementStyles?: Record<string, string> }) {
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

function SectionWrapper({ dark, children }: { dark: boolean; children: React.ReactNode }) {
  return (
    <section
      className={`py-12 @min-[768px]:py-16 @min-[1024px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-white"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">{children}</div>
    </section>
  );
}

/* ── Slider pair with CSS clip-path controlled by range input ── */
function SliderPair({ pair, idx, dark, elementStyles }: { pair: BeforeAfterPair; idx: number; dark: boolean; elementStyles?: Record<string, string> }) {
  const [value, setValue] = useState(50);
  const hasBefore = hasRealImage(pair.beforeImage);
  const hasAfter = hasRealImage(pair.afterImage);

  return (
    <div
      className={`rounded-xl overflow-hidden ${
        dark ? "bg-white/5" : "bg-slate-50 border border-slate-100"
      }`}
    >
      <div className="relative w-full aspect-[4/3] select-none">
        {/* Before image (full, bottom layer) */}
        {hasBefore ? (
          <img
            src={pair.beforeImage}
            alt={`Before ${pair.label || ""}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-slate-300 flex items-center justify-center">
            <span className="text-slate-500 text-xs">[Before]</span>
          </div>
        )}

        {/* After image (clipped, top layer) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          {hasAfter ? (
            <img
              src={pair.afterImage}
              alt={`After ${pair.label || ""}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
              <span className="text-slate-400 text-xs">[After]</span>
            </div>
          )}
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary pointer-events-none z-10"
          style={{ left: `${value}%`, transform: "translateX(-50%)", ...(elementStyles?.accentColor && { backgroundColor: elementStyles.accentColor }) }}
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg"
            style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
              <path d="M4 8H12M4 8L6 6M4 8L6 10M12 8L10 6M12 8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          Before
        </span>
        <span className="absolute bottom-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          After
        </span>

        {/* Range input */}
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label={`Compare before and after${pair.label ? ` for ${pair.label}` : ""}`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
        />
      </div>
      {pair.label && (
        <div className="px-4 py-3">
          <p
            className={`text-sm font-medium ${
              dark ? "text-gray-300" : "text-gray-700"
            }`}
            style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
          >
            {pair.label}
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Stacked variant ── */
function StackedVariant({ heading, highlight, pairs = [], dark = false, elementStyles }: VariantProps) {
  return (
    <SectionWrapper dark={dark}>
      <SectionHeader heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />
      <div className="grid @min-[768px]:grid-cols-2 gap-6">
        {pairs.map((pair, idx) => {
          const hasBefore = hasRealImage(pair.beforeImage);
          const hasAfter = hasRealImage(pair.afterImage);

          return (
            <div
              key={pair.id || `pair-${idx}`}
              className={`rounded-xl overflow-hidden ${
                dark ? "bg-white/5" : "bg-slate-50 border border-slate-100"
              }`}
            >
              {/* Before */}
              <div className="relative">
                {hasBefore ? (
                  <img
                    src={pair.beforeImage}
                    alt={`Before ${pair.label || ""}`}
                    className="w-full aspect-[16/9] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[16/9] bg-slate-300 flex items-center justify-center">
                    <span className="text-slate-500 text-xs">[Before]</span>
                  </div>
                )}
                <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Before
                </span>
              </div>

              {/* After */}
              <div className="relative">
                {hasAfter ? (
                  <img
                    src={pair.afterImage}
                    alt={`After ${pair.label || ""}`}
                    className="w-full aspect-[16/9] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[16/9] bg-slate-200 flex items-center justify-center">
                    <span className="text-slate-400 text-xs">[After]</span>
                  </div>
                )}
                <span className="absolute bottom-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                  After
                </span>
              </div>

              {pair.label && (
                <div className="px-4 py-3">
                  <p
                    className={`text-sm font-medium ${
                      dark ? "text-gray-300" : "text-gray-700"
                    }`}
                    style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                  >
                    {pair.label}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

/* ── Slider variant ── */
function SliderVariant({ heading, highlight, pairs = [], dark = false, elementStyles }: VariantProps) {
  return (
    <SectionWrapper dark={dark}>
      <SectionHeader heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />
      <div className="grid @min-[768px]:grid-cols-2 @min-[1024px]:grid-cols-3 gap-4 @min-[768px]:gap-8">
        {pairs.map((pair, idx) => (
          <SliderPair key={pair.id || `pair-${idx}`} pair={pair} idx={idx} dark={dark} elementStyles={elementStyles} />
        ))}
      </div>
    </SectionWrapper>
  );
}

/* ── Main export ── */
export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({
  heading,
  highlight,
  pairs = [],
  dark = false,
  variant = "default",
  elementStyles,
}) => {
  if (variant === "stacked")
    return <StackedVariant heading={heading} highlight={highlight} pairs={pairs} dark={dark} elementStyles={elementStyles} />;

  if (variant === "slider")
    return <SliderVariant heading={heading} highlight={highlight} pairs={pairs} dark={dark} elementStyles={elementStyles} />;

  // Default / sideBySide
  return (
    <SectionWrapper dark={dark}>
      <SectionHeader heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />
      <div className="grid @min-[768px]:grid-cols-2 @min-[1024px]:grid-cols-3 gap-4 @min-[768px]:gap-8">
        {pairs.map((pair, idx) => {
          const hasBefore = hasRealImage(pair.beforeImage);
          const hasAfter = hasRealImage(pair.afterImage);

          return (
            <div
              key={pair.id || `pair-${idx}`}
              className={`rounded-xl overflow-hidden ${
                dark ? "bg-white/5" : "bg-slate-50 border border-slate-100"
              }`}
            >
              <div className="grid grid-cols-2">
                <div className="relative">
                  {hasBefore ? (
                    <img
                      src={pair.beforeImage}
                      alt={`Before ${pair.label || ""}`}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-slate-300 flex items-center justify-center">
                      <span className="text-slate-500 text-xs">[Before]</span>
                    </div>
                  )}
                  <span className="absolute bottom-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    Before
                  </span>
                </div>
                <div className="relative">
                  {hasAfter ? (
                    <img
                      src={pair.afterImage}
                      alt={`After ${pair.label || ""}`}
                      className="w-full aspect-[4/3] object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-[4/3] bg-slate-200 flex items-center justify-center">
                      <span className="text-slate-400 text-xs">[After]</span>
                    </div>
                  )}
                  <span className="absolute bottom-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    After
                  </span>
                </div>
              </div>
              {pair.label && (
                <div className="px-4 py-3">
                  <p
                    className={`text-sm font-medium ${
                      dark ? "text-gray-300" : "text-gray-700"
                    }`}
                    style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                  >
                    {pair.label}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
};
