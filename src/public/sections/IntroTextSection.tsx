"use client";

import React from "react";

export interface IntroTextSectionProps {
  content: string;
  dark?: boolean;
  variant?: "centered" | "leftAligned" | "accent";
  elementStyles?: Record<string, string>;
}

type VariantProps = Omit<IntroTextSectionProps, "variant">;

const LeftAlignedVariant: React.FC<VariantProps> = ({ content, dark = false, elementStyles }) => (
  <section
    className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
      dark ? "bg-secondary" : "bg-white"
    }`}
  >
    <div className="max-w-[900px] mx-auto">
      <p
        className={`text-base @min-[640px]:text-lg @min-[768px]:text-xl leading-relaxed ${
          dark ? "text-gray-300" : "text-gray-600"
        }`}
        style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
      >
        {content}
      </p>
    </div>
  </section>
);

const AccentVariant: React.FC<VariantProps> = ({ content, dark = false, elementStyles }) => (
  <section
    className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
      dark ? "bg-secondary" : "bg-white"
    }`}
  >
    <div className="max-w-[800px] mx-auto">
      <div className="border-l-4 border-primary pl-6 @min-[768px]:pl-8" style={elementStyles?.accentColor ? { borderColor: elementStyles.accentColor } : undefined}>
        <p
          className={`text-base @min-[640px]:text-lg @min-[768px]:text-xl leading-relaxed ${
            dark ? "text-gray-300" : "text-gray-600"
          }`}
          style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
        >
          {content}
        </p>
      </div>
    </div>
  </section>
);

export const IntroTextSection: React.FC<IntroTextSectionProps> = ({
  content,
  dark = false,
  variant = "centered",
  elementStyles,
}) => {
  if (variant === "leftAligned") return <LeftAlignedVariant content={content} dark={dark} elementStyles={elementStyles} />;
  if (variant === "accent") return <AccentVariant content={content} dark={dark} elementStyles={elementStyles} />;

  return (
    <section className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${dark ? "bg-secondary text-white" : "bg-white text-gray-700"}`}>
      <div className="max-w-[800px] mx-auto text-center">
        <p className="text-base @min-[640px]:text-lg @min-[768px]:text-xl leading-relaxed" style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
          {content}
        </p>
      </div>
    </section>
  );
};
