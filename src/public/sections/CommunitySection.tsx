"use client";

import React from "react";
import { Heart } from "lucide-react";
import { cn } from "@/public/lib/utils";

interface CommunityItem {
  id: string;
  text: string;
}

export interface CommunitySectionProps {
  heading: string;
  highlight?: string;
  description: string;
  involvements: CommunityItem[];
  image?: string;
  dark?: boolean;
  variant?: "imageRight" | "imageLeft" | "fullWidth" | string;
  elementStyles?: Record<string, string>;
}

type CommunityVariantProps = Omit<CommunitySectionProps, "variant">;

function CommunityHeader({
  heading,
  highlight,
  dark = false,
  elementStyles,
}: Pick<CommunityVariantProps, "heading" | "highlight" | "dark" | "elementStyles">) {
  return (
    <div className="text-center mb-12">
      <Heart className="w-10 h-10 text-primary mx-auto mb-4" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined} />
      <h2
        className={cn(
          "text-3xl @min-[768px]:text-4xl font-bold mb-4",
          dark ? "text-white" : "text-gray-900"
        )}
        style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
      >
        {heading}{" "}
        {highlight && <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>}
      </h2>
      <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
    </div>
  );
}

function CommunityBody({
  description,
  involvements = [],
  dark = false,
  centered = false,
  elementStyles,
}: Pick<CommunityVariantProps, "description" | "involvements" | "dark" | "elementStyles"> & {
  centered?: boolean;
}) {
  return (
    <div className={centered ? "max-w-3xl mx-auto text-center" : "flex-1"}>
      <p
        className={cn(
          "text-base @min-[768px]:text-lg leading-relaxed mb-6",
          dark ? "text-gray-300" : "text-gray-600"
        )}
        style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
      >
        {description}
      </p>

      {involvements.length > 0 && (
        <ul className="space-y-3">
          {involvements.map((item, idx) => (
            <li
              key={item.id || `inv-${idx}`}
              className="flex items-start gap-3"
            >
              <span className="text-primary mt-1">•</span>
              <span className={dark ? "text-gray-200" : "text-gray-700"}>
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ImageLeftVariant({
  heading,
  highlight,
  description,
  involvements = [],
  image,
  dark = false,
  elementStyles,
}: CommunityVariantProps) {
  const hasImg = image?.startsWith("data:") || image?.startsWith("http");

  return (
    <section
      className={cn(
        "py-12 @min-[768px]:py-16 @min-[1024px]:py-24 px-4 @min-[768px]:px-8",
        dark ? "bg-secondary text-white" : "bg-white"
      )}
    >
      <div className="max-w-[1000px] mx-auto">
        <CommunityHeader heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />

        <div
          className={cn(
            "flex flex-col gap-6 @min-[768px]:gap-10 items-center",
            hasImg && "@min-[768px]:flex-row"
          )}
        >
          <CommunityBody
            description={description}
            involvements={involvements}
            dark={dark}
            centered={!hasImg}
            elementStyles={elementStyles}
          />

          {hasImg && (
            <div className="w-full @min-[768px]:w-2/5 @min-[768px]:order-[-1] flex-shrink-0">
              <img
                src={image}
                alt="Community involvement"
                className="w-full rounded-2xl object-cover aspect-[4/3]"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FullWidthVariant({
  heading,
  highlight,
  description,
  involvements = [],
  image,
  dark = false,
  elementStyles,
}: CommunityVariantProps) {
  const hasImg = image?.startsWith("data:") || image?.startsWith("http");

  return (
    <section
      className={cn(
        "py-12 @min-[768px]:py-16 @min-[1024px]:py-24 px-4 @min-[768px]:px-8",
        dark ? "bg-secondary text-white" : "bg-white"
      )}
    >
      <div className="max-w-[1000px] mx-auto">
        <CommunityHeader heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />

        {hasImg && (
          <img
            src={image}
            alt="Community involvement"
            className="w-full h-[300px] @min-[768px]:h-[400px] object-cover rounded-xl mb-8"
          />
        )}

        <div className="max-w-[800px] mx-auto">
          <CommunityBody
            description={description}
            involvements={involvements}
            dark={dark}
            centered
            elementStyles={elementStyles}
          />
        </div>
      </div>
    </section>
  );
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  variant = "imageRight",
  ...props
}) => {
  if (variant === "imageLeft") return <ImageLeftVariant {...props} />;
  if (variant === "fullWidth") return <FullWidthVariant {...props} />;

  const {
    heading,
    highlight,
    description,
    involvements = [],
    image,
    dark = false,
    elementStyles,
  } = props;
  const hasImg = image?.startsWith("data:") || image?.startsWith("http");

  return (
    <section
      className={cn(
        "py-12 @min-[768px]:py-16 @min-[1024px]:py-24 px-4 @min-[768px]:px-8",
        dark ? "bg-secondary text-white" : "bg-white"
      )}
    >
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-12">
          <Heart className="w-10 h-10 text-primary mx-auto mb-4" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined} />
          <h2
            className={cn(
              "text-3xl @min-[768px]:text-4xl font-bold mb-4",
              dark ? "text-white" : "text-gray-900"
            )}
            style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
          >
            {heading}{" "}
            {highlight && <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
        </div>

        <div
          className={cn(
            "flex flex-col gap-6 @min-[768px]:gap-10 items-center",
            hasImg && "@min-[768px]:flex-row"
          )}
        >
          <div
            className={hasImg ? "flex-1" : "max-w-3xl mx-auto text-center"}
          >
            <p
              className={cn(
                "text-base @min-[768px]:text-lg leading-relaxed mb-6",
                dark ? "text-gray-300" : "text-gray-600"
              )}
              style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
            >
              {description}
            </p>

            {involvements.length > 0 && (
              <ul className="space-y-3">
                {involvements.map((item, idx) => (
                  <li
                    key={item.id || `inv-${idx}`}
                    className="flex items-start gap-3"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span
                      className={dark ? "text-gray-200" : "text-gray-700"}
                    >
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {hasImg && (
            <div className="w-full @min-[768px]:w-2/5 flex-shrink-0">
              <img
                src={image}
                alt="Community involvement"
                className="w-full rounded-2xl object-cover aspect-[4/3]"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
