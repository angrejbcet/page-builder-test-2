import React from "react";
import Link from "next/link";
import type { MockupFooterProps } from "../MockupFooter";

export function FooterMinimal({
  businessName = "Business Name",
  highlightWord,
  logoUrl,
  copyrightName,
}: MockupFooterProps) {
  const currentYear = new Date().getFullYear();
  const displayCopyright = copyrightName || businessName;

  const highlight = highlightWord || businessName.split(" ").pop() || "";
  const prefix = highlightWord
    ? businessName.replace(new RegExp(`\\s*${highlightWord}\\s*$`), "")
    : businessName.replace(new RegExp(`\\s*${highlight}\\s*$`), "");

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms-of-use" },
  ];

  return (
    <footer className="bg-secondary text-gray-300">
      <div className="max-w-[1325px] mx-auto px-4 py-5 flex flex-col @min-[768px]:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex-shrink-0">
          {logoUrl && (logoUrl.startsWith("http") || logoUrl.startsWith("data:")) ? (
            <img src={logoUrl} alt={businessName} className="h-7 sm:h-8 w-auto max-w-[140px] sm:max-w-[160px] object-contain brightness-0 invert" />
          ) : (
            <span className="text-lg font-bold text-white">
              {prefix} <span className="text-primary">{highlight}</span>
            </span>
          )}
        </Link>

        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex-shrink-0 text-xs text-center @min-[768px]:text-right">
          <span>&copy; {currentYear} {displayCopyright}</span>
          <span className="mx-2 text-gray-600">|</span>
          <span className="text-gray-500">
            by{" "}
            <a
              href="https://pointclickengage.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-white transition-colors"
            >
              Point Click Engage
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
