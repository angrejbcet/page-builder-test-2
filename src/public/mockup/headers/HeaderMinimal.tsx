"use client";

import React from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import type { MockupHeaderProps } from "../MockupHeader";
import { HeaderNav } from "./HeaderNav";

export function HeaderMinimal({
  businessName = "Business Name",
  highlightWord,
  logoUrl,
  phone,
  navLinks = [],
  ctaText = "Get an Estimate",
  ctaLink = "/contact",
}: MockupHeaderProps) {
  const highlight = highlightWord || businessName.split(" ").pop() || "";
  const prefix = highlightWord
    ? businessName.replace(new RegExp(`\\s*${highlightWord}\\s*$`), "")
    : businessName.replace(new RegExp(`\\s*${highlight}\\s*$`), "");

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1325px] mx-auto px-4 h-14 @min-[640px]:h-16 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center min-w-0">
          {logoUrl && (logoUrl.startsWith("http") || logoUrl.startsWith("data:")) ? (
            <img src={logoUrl} alt={businessName} className="h-7 @min-[640px]:h-9 w-auto max-w-[140px] @min-[640px]:max-w-[180px] object-contain" />
          ) : (
            <span className="text-base @min-[400px]:text-lg @min-[640px]:text-xl font-bold text-secondary truncate">
              {prefix} <span className="text-primary">{highlight}</span>
            </span>
          )}
        </Link>

        {/* Desktop nav + CTA */}
        <div className="hidden @min-[768px]:flex items-center gap-5 @min-[1024px]:gap-7">
          <HeaderNav
            navLinks={navLinks}
            linkClassName="text-secondary text-sm font-semibold hover:text-primary transition-colors"
            chevronClassName="text-gray-400"
          />
          {ctaText && (
            <Link
              href={ctaLink}
              className="bg-primary text-on-primary px-5 py-2 rounded-md text-sm font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap"
            >
              {ctaText}
            </Link>
          )}
        </div>

        {/* Mobile CTA */}
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
          {!phone && ctaText && (
            <Link
              href={ctaLink}
              className="bg-primary text-on-primary px-3 py-2 rounded-md text-xs font-semibold whitespace-nowrap"
            >
              {ctaText}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
