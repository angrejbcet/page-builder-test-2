"use client";

import React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import type { MockupHeaderProps } from "../MockupHeader";
import { HeaderNav } from "./HeaderNav";

export function HeaderCentered({
  businessName = "Business Name",
  highlightWord,
  logoUrl,
  phone = "(555) 000-0000",
  navLinks = [],
  ctaText = "Get an Estimate",
  ctaLink = "/contact",
}: MockupHeaderProps) {
  const highlight = highlightWord || businessName.split(" ").pop() || "";
  const prefix = highlightWord
    ? businessName.replace(new RegExp(`\\s*${highlightWord}\\s*$`), "")
    : businessName.replace(new RegExp(`\\s*${highlight}\\s*$`), "");

  const renderLogo = (className?: string) => {
    if (logoUrl && (logoUrl.startsWith("http") || logoUrl.startsWith("data:"))) {
      return <img src={logoUrl} alt={businessName} className={`h-7 @min-[640px]:h-10 w-auto max-w-[140px] @min-[640px]:max-w-[200px] object-contain ${className ?? ""}`} />;
    }
    return (
      <span className={`text-base @min-[400px]:text-lg @min-[640px]:text-2xl font-bold text-secondary truncate ${className ?? ""}`}>
        {prefix} <span className="text-primary">{highlight}</span>
      </span>
    );
  };

  return (
    <header className="w-full">
      {/* Logo row — centered on desktop, left on mobile */}
      <div className="bg-white py-3 @min-[640px]:py-5">
        <div className="max-w-[1325px] mx-auto px-4 flex justify-between @min-[768px]:justify-center items-center gap-3">
          <Link href="/" className="min-w-0">{renderLogo()}</Link>
          {/* Mobile phone CTA */}
          <div className="flex @min-[768px]:hidden items-center shrink-0">
            {phone && (
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="flex items-center gap-1.5 bg-primary text-on-primary px-3 py-2 rounded-md text-xs font-semibold whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5" />
                Call
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Nav row — desktop only */}
      <div className="bg-white border-t border-b border-gray-200 sticky top-0 z-50 hidden @min-[768px]:block">
        <div className="max-w-[1325px] mx-auto px-4 flex items-center justify-between h-12">
          <div className="hidden @min-[1024px]:flex items-center w-[200px]" />

          <nav className="flex items-center gap-5 @min-[1024px]:gap-7">
            <HeaderNav
              navLinks={navLinks}
              linkClassName="text-secondary font-semibold text-sm hover:text-primary transition-colors py-2"
              chevronClassName="text-gray-400"
            />
          </nav>

          <div className="flex items-center gap-5 w-[200px] justify-end">
            {phone && (
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="flex items-center text-secondary text-sm hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 mr-1.5" />
                {phone}
              </a>
            )}
            {ctaText && (
              <Link
                href={ctaLink}
                className="bg-primary text-on-primary px-5 py-1.5 rounded-md text-sm font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap"
              >
                {ctaText}
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
