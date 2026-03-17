"use client";

import React, { useRef, useEffect, useState } from "react";

export interface CustomEmbedSectionProps {
  heading?: string;
  description?: string;
  embedCode: string;
  maxWidth?: string;
  backgroundColor?: string;
  variant?: "contained" | "full-width" | "card" | string;
  elementStyles?: Record<string, string>;
}

function SandboxedEmbed({ html, title }: { html: string; title?: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(400);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = `<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>body{margin:0;padding:16px;font-family:system-ui,-apple-system,sans-serif;}</style>
</head><body>${html}</body></html>`;

    iframe.srcdoc = doc;

    const handleLoad = () => {
      try {
        const body = iframe.contentDocument?.body;
        if (body) {
          const newHeight = Math.max(body.scrollHeight + 32, 100);
          setHeight(Math.min(newHeight, 1200));
        }
      } catch {
        /* cross-origin, keep default */
      }
    };

    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      title={title || "Embedded content"}
      className="w-full border-0"
      style={{ height: `${height}px` }}
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    />
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
        </svg>
      </div>
      <p className="text-sm font-medium text-slate-500">Custom Embed</p>
      <p className="text-xs text-slate-400 mt-1 max-w-xs">
        Paste HTML code in the section settings to embed booking widgets, calendars, forms, or other third-party content.
      </p>
    </div>
  );
}

export const CustomEmbedSection: React.FC<CustomEmbedSectionProps> = ({
  heading,
  description,
  embedCode,
  maxWidth = "1200px",
  backgroundColor = "#ffffff",
  variant = "contained",
  elementStyles,
}) => {
  const hasContent = embedCode && embedCode.trim().length > 0;

  if (variant === "full-width") {
    return (
      <section style={{ backgroundColor }}>
        {(heading || description) && (
          <div className="max-w-[1200px] mx-auto px-4 pt-16 pb-8 text-center">
            {heading && <h2 className="text-2xl @min-[768px]:text-3xl @min-[1024px]:text-4xl font-bold text-secondary mb-4" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>{heading}</h2>}
            {description && <p className="text-gray-600 max-w-2xl mx-auto" style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>{description}</p>}
          </div>
        )}
        <div className="pb-16">
          {hasContent ? <SandboxedEmbed html={embedCode} title={heading} /> : <div className="max-w-[1200px] mx-auto px-4"><EmptyState /></div>}
        </div>
      </section>
    );
  }

  if (variant === "card") {
    return (
      <section style={{ backgroundColor }} className="py-16 px-4 @min-[768px]:px-8">
        <div className="mx-auto max-w-full" style={{ maxWidth }}>
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            {(heading || description) && (
              <div className="px-4 @min-[768px]:px-8 pt-6 @min-[768px]:pt-8 pb-4 text-center">
                {heading && <h2 className="text-xl @min-[768px]:text-2xl @min-[1024px]:text-3xl font-bold text-secondary mb-3" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>{heading}</h2>}
                {description && <p className="text-gray-600 max-w-xl mx-auto" style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>{description}</p>}
              </div>
            )}
            <div className="p-4">
              {hasContent ? <SandboxedEmbed html={embedCode} title={heading} /> : <EmptyState />}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ backgroundColor }} className="py-16 px-4 @min-[768px]:px-8">
      <div className="mx-auto max-w-full" style={{ maxWidth }}>
        {(heading || description) && (
          <div className="text-center mb-10">
            {heading && <h2 className="text-2xl @min-[768px]:text-3xl @min-[1024px]:text-4xl font-bold text-secondary mb-4" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>{heading}</h2>}
            {description && <p className="text-gray-600 max-w-2xl mx-auto" style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>{description}</p>}
          </div>
        )}
        {hasContent ? <SandboxedEmbed html={embedCode} title={heading} /> : <EmptyState />}
      </div>
    </section>
  );
};
