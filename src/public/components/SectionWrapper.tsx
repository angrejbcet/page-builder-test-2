"use client";

import React from "react";
import type { SectionInstance } from "@/lib/types";

interface SectionWrapperProps {
  section: SectionInstance;
  children: React.ReactNode;
}

export function SectionWrapper({ section, children }: SectionWrapperProps) {
  const customBg = section.styles?.backgroundColor;
  const customText = section.styles?.textColor;
  const bgImage = section.styles?.backgroundImage;
  const bgOverlay = section.styles?.backgroundOverlay || "#ffffff";
  const bgOverlayOpacity = section.styles?.backgroundOverlayOpacity ?? 0.85;
  const hasBgImage = bgImage && (bgImage.startsWith("http") || bgImage.startsWith("data:"));

  const wrapperStyle: React.CSSProperties = {};
  if (customBg && !hasBgImage) wrapperStyle.backgroundColor = customBg;
  if (customText) wrapperStyle.color = customText;

  return (
    <div
      key={section.id}
      className="relative"
      {...(customBg || hasBgImage ? { "data-section-bg": "" } : {})}
      {...(customText ? { "data-section-text": "" } : {})}
      style={Object.keys(wrapperStyle).length > 0 ? wrapperStyle : undefined}
    >
      {hasBgImage && (
        <>
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div
            className="absolute inset-0 z-0"
            style={{ backgroundColor: bgOverlay, opacity: bgOverlayOpacity }}
          />
        </>
      )}
      <div data-section-content="" className={hasBgImage ? "relative z-1" : undefined}>
        {children}
      </div>
    </div>
  );
}
