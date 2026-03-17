"use client";

import React from "react";

interface LegalBlock {
  id: string;
  heading: string;
  content: string;
}

export interface LegalContentSectionProps {
  title: string;
  lastUpdated?: string;
  blocks: LegalBlock[];
  disclaimer?: string;
  dark?: boolean;
  variant?: "standard" | "sidebarNav" | "cardBlocks";
  elementStyles?: Record<string, string>;
}

type VariantProps = Omit<LegalContentSectionProps, "variant">;

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const SidebarNavVariant: React.FC<VariantProps> = ({
  title,
  lastUpdated,
  blocks = [],
  disclaimer,
  dark = false,
  elementStyles,
}) => {
  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-white"
      }`}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-10">
          <h1
            className={`text-3xl @min-[768px]:text-4xl font-bold mb-2 ${
              dark ? "text-white" : "text-gray-900"
            }`}
            style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
          >
            {title}
          </h1>
          {lastUpdated && (
            <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
              Last Updated: {lastUpdated}
            </p>
          )}
          <div className="w-24 h-1 bg-primary rounded-full mt-4" />
        </div>

        {/* Mobile: horizontal scrollable TOC */}
        <div className="@min-[768px]:hidden mb-8 -mx-4 px-4">
          <nav
            className={`flex gap-3 overflow-x-auto pb-3 scrollbar-thin ${
              dark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {blocks.map((block, idx) => {
              const blockId = slugify(block.heading) || `block-${idx}`;
              return (
                <button
                  key={block.id || `toc-${idx}`}
                  onClick={() => handleScrollTo(blockId)}
                  className={`whitespace-nowrap text-sm px-3 py-1.5 rounded-full border flex-shrink-0 transition-colors ${
                    dark
                      ? "border-white/10 hover:bg-white/10"
                      : "border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {block.heading}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="grid @min-[768px]:grid-cols-[280px_1fr] gap-10">
          {/* Desktop: sticky sidebar TOC */}
          <nav className="hidden @min-[768px]:block">
            <div className="sticky top-24 space-y-1">
              {blocks.map((block, idx) => {
                const blockId = slugify(block.heading) || `block-${idx}`;
                return (
                  <button
                    key={block.id || `toc-d-${idx}`}
                    onClick={() => handleScrollTo(blockId)}
                    className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${
                      dark
                        ? "text-gray-300 hover:bg-white/10 hover:text-white"
                        : "text-gray-600 hover:bg-slate-100 hover:text-gray-900"
                    }`}
                  >
                    {block.heading}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Content */}
          <div className="space-y-8">
            {blocks.map((block, idx) => {
              const blockId = slugify(block.heading) || `block-${idx}`;
              return (
                <div key={block.id || `block-${idx}`} id={blockId}>
                  <h2
                    className={`text-lg @min-[768px]:text-xl font-bold mb-3 ${
                      dark ? "text-white" : "text-gray-900"
                    }`}
                    style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
                  >
                    {block.heading}
                  </h2>
                  <div
                    className={`leading-relaxed whitespace-pre-line break-words ${
                      dark ? "text-gray-300" : "text-gray-600"
                    }`}
                    style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                  >
                    {block.content}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {disclaimer && (
          <div
            className={`mt-12 p-4 @min-[768px]:p-6 rounded-xl text-sm ${
              dark
                ? "bg-white/5 text-gray-400"
                : "bg-slate-50 text-gray-500 border border-slate-200"
            }`}
          >
            <p className="font-semibold mb-1">Legal Disclaimer:</p>
            <p>{disclaimer}</p>
          </div>
        )}
      </div>
    </section>
  );
};

const CardBlocksVariant: React.FC<VariantProps> = ({
  title,
  lastUpdated,
  blocks = [],
  disclaimer,
  dark = false,
  elementStyles,
}) => (
  <section
    className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
      dark ? "bg-secondary text-white" : "bg-white"
    }`}
  >
    <div className="max-w-[800px] mx-auto">
      <div className="mb-10">
        <h1
          className={`text-3xl @min-[768px]:text-4xl font-bold mb-2 ${
            dark ? "text-white" : "text-gray-900"
          }`}
          style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          {title}
        </h1>
        {lastUpdated && (
          <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
            Last Updated: {lastUpdated}
          </p>
        )}
        <div className="w-24 h-1 bg-primary rounded-full mt-4" />
      </div>

      <div className="flex flex-col gap-6">
        {blocks.map((block, idx) => (
          <div
            key={block.id || `block-${idx}`}
            className={`rounded-xl p-6 @min-[768px]:p-8 border ${
              dark
                ? "bg-white/5 border-white/10"
                : "bg-slate-50 border-slate-100"
            }`}
          >
            <h2
              className={`text-lg @min-[768px]:text-xl font-bold mb-3 ${
                dark ? "text-white" : "text-gray-900"
              }`}
              style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
            >
              {block.heading}
            </h2>
            <div
              className={`leading-relaxed whitespace-pre-line break-words ${
                dark ? "text-gray-300" : "text-gray-600"
              }`}
              style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
            >
              {block.content}
            </div>
          </div>
        ))}
      </div>

      {disclaimer && (
        <div
          className={`mt-12 p-4 @min-[768px]:p-6 rounded-xl text-sm ${
            dark
              ? "bg-white/5 text-gray-400"
              : "bg-slate-50 text-gray-500 border border-slate-200"
          }`}
        >
          <p className="font-semibold mb-1">Legal Disclaimer:</p>
          <p>{disclaimer}</p>
        </div>
      )}
    </div>
  </section>
);

export const LegalContentSection: React.FC<LegalContentSectionProps> = ({
  title,
  lastUpdated,
  blocks = [],
  disclaimer,
  dark = false,
  variant = "standard",
  elementStyles,
}) => {
  if (variant === "sidebarNav")
    return (
      <SidebarNavVariant
        title={title}
        lastUpdated={lastUpdated}
        blocks={blocks}
        disclaimer={disclaimer}
        dark={dark}
        elementStyles={elementStyles}
      />
    );
  if (variant === "cardBlocks")
    return (
      <CardBlocksVariant
        title={title}
        lastUpdated={lastUpdated}
        blocks={blocks}
        disclaimer={disclaimer}
        dark={dark}
        elementStyles={elementStyles}
      />
    );

  return (
    <section
      className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-white"
      }`}
    >
      <div className="max-w-[800px] mx-auto">
        <div className="mb-10">
          <h1
            className={`text-3xl @min-[768px]:text-4xl font-bold mb-2 ${
              dark ? "text-white" : "text-gray-900"
            }`}
            style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
          >
            {title}
          </h1>
          {lastUpdated && (
            <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
              Last Updated: {lastUpdated}
            </p>
          )}
          <div className="w-24 h-1 bg-primary rounded-full mt-4" />
        </div>

        <div className="space-y-8">
          {blocks.map((block, idx) => (
            <div key={block.id || `block-${idx}`}>
              <h2
                className={`text-lg @min-[768px]:text-xl font-bold mb-3 ${
                  dark ? "text-white" : "text-gray-900"
                }`}
                style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
              >
                {block.heading}
              </h2>
              <div
                className={`leading-relaxed whitespace-pre-line break-words ${
                  dark ? "text-gray-300" : "text-gray-600"
                }`}
                style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
              >
                {block.content}
              </div>
            </div>
          ))}
        </div>

        {disclaimer && (
          <div
            className={`mt-12 p-4 @min-[768px]:p-6 rounded-xl text-sm ${
              dark ? "bg-white/5 text-gray-400" : "bg-slate-50 text-gray-500 border border-slate-200"
            }`}
          >
            <p className="font-semibold mb-1">Legal Disclaimer:</p>
            <p>{disclaimer}</p>
          </div>
        )}
      </div>
    </section>
  );
};
