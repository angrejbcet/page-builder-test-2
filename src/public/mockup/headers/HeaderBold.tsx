"use client";

import React from "react";
import Link from "next/link";
import { Phone, MapPin, Facebook, Instagram } from "lucide-react";
import type { MockupHeaderProps } from "../MockupHeader";
import { HeaderNav } from "./HeaderNav";

export function HeaderBold({
  businessName = "Business Name",
  highlightWord,
  logoUrl,
  phone = "(555) 000-0000",
  address = "",
  navLinks = [],
  ctaText = "Get an Estimate",
  ctaLink = "/contact",
  socialLinks = [],
}: MockupHeaderProps) {
  const highlight = highlightWord || businessName.split(" ").pop() || "";
  const prefix = highlightWord
    ? businessName.replace(new RegExp(`\\s*${highlightWord}\\s*$`), "")
    : businessName.replace(new RegExp(`\\s*${highlight}\\s*$`), "");

  return (
    <header className="w-full absolute top-0 left-0 right-0 z-50">
      {/* Top bar — desktop only */}
      <div className="bg-secondary/90 text-white/80 py-1.5 text-xs hidden @min-[768px]:block">
        <div className="max-w-[1325px] mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {address && (
              <span className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1.5" />
                {address}
              </span>
            )}
            {phone && (
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="flex items-center hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 mr-1.5 text-primary" />
                {phone}
              </a>
            )}
          </div>
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.platform === "Instagram" ? Instagram : Facebook;
              return (
                <a
                  key={link.platform}
                  href={link.href}
                  aria-label={link.platform}
                  className="hover:text-white transition-colors"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main header — semi-transparent */}
      <div className="bg-secondary/70 backdrop-blur-md">
        <div className="max-w-[1325px] mx-auto px-4 py-3 @min-[640px]:py-4 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center min-w-0">
            {logoUrl && (logoUrl.startsWith("http") || logoUrl.startsWith("data:")) ? (
              <img src={logoUrl} alt={businessName} className="h-7 @min-[640px]:h-10 w-auto max-w-[140px] @min-[640px]:max-w-[200px] object-contain brightness-0 invert" />
            ) : (
              <span className="text-base @min-[400px]:text-lg @min-[640px]:text-2xl font-bold text-white truncate">
                {prefix} <span className="text-primary">{highlight}</span>
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden @min-[768px]:flex items-center gap-5 @min-[1024px]:gap-7">
            <HeaderNav
              navLinks={navLinks}
              linkClassName="text-white/90 font-semibold hover:text-primary transition-colors py-2 text-sm @min-[1024px]:text-base"
              chevronClassName="text-white/50"
            />
          </nav>

          {/* Right side: CTA — desktop */}
          <div className="hidden @min-[768px]:flex items-center gap-5">
            {ctaText && (
              <Link
                href={ctaLink}
                className="bg-primary text-on-primary px-4 py-2 @min-[1024px]:px-7 @min-[1024px]:py-3 rounded-md text-sm @min-[1024px]:text-base font-bold hover:bg-primary-dark transition-colors whitespace-nowrap"
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
          </div>
        </div>
      </div>
    </header>
  );
}
