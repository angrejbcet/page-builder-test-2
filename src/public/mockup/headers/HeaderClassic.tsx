"use client";

import React from "react";
import Link from "next/link";
import { Phone, MapPin, Facebook, Instagram } from "lucide-react";
import type { MockupHeaderProps } from "../MockupHeader";
import { HeaderNav } from "./HeaderNav";

export function HeaderClassic({
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
    <header className="w-full">
      {/* Top bar — desktop only */}
      <div className="bg-secondary text-white py-2 text-sm hidden @min-[768px]:block">
        <div className="max-w-[1325px] mx-auto px-4 flex justify-between items-center">
          <div className="flex space-x-6 items-center">
            {phone && (
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="flex items-center hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                {phone}
              </a>
            )}
            {address && (
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {address}
              </div>
            )}
          </div>
          <div className="flex space-x-4 items-center">
            {socialLinks.map((link) => {
              const Icon = link.platform === "Instagram" ? Instagram : Facebook;
              return (
                <a
                  key={link.platform}
                  href={link.href}
                  aria-label={link.platform}
                  className="hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-[1325px] mx-auto px-4 py-3 @min-[640px]:py-4 flex justify-between items-center gap-3">
          <Link href="/" className="flex items-center min-w-0">
            {logoUrl && (logoUrl.startsWith("http") || logoUrl.startsWith("data:")) ? (
              <img src={logoUrl} alt={businessName} className="h-7 @min-[640px]:h-10 w-auto max-w-[140px] @min-[640px]:max-w-[200px] object-contain" />
            ) : (
              <span className="text-base @min-[400px]:text-lg @min-[640px]:text-2xl font-bold text-secondary truncate">
                {prefix}{" "}
                <span className="text-primary">{highlight}</span>
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden @min-[768px]:flex items-center gap-5 @min-[1024px]:gap-7">
            <HeaderNav
              navLinks={navLinks}
              linkClassName="text-secondary font-semibold hover:text-primary transition-colors py-2 text-sm @min-[1024px]:text-base"
              chevronClassName="text-gray-400"
            />
            {ctaText && (
              <Link
                href={ctaLink}
                className="bg-primary text-on-primary px-4 py-2 @min-[1024px]:px-6 rounded-md font-semibold hover:bg-primary-dark transition-colors whitespace-nowrap text-sm"
              >
                {ctaText}
              </Link>
            )}
          </nav>

          {/* Mobile CTA — phone only */}
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
