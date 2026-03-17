import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import type { MockupFooterProps } from "../MockupFooter";

export function FooterCentered({
  businessName = "Business Name",
  highlightWord,
  logoUrl,
  description = "",
  phone = "",
  email = "",
  address = "",
  quickLinks = [],
  serviceLinks = [],
  locationLinks = [],
  copyrightName,
}: MockupFooterProps) {
  const currentYear = new Date().getFullYear();
  const displayCopyright = copyrightName || businessName;

  const highlight = highlightWord || businessName.split(" ").pop() || "";
  const prefix = highlightWord
    ? businessName.replace(new RegExp(`\\s*${highlightWord}\\s*$`), "")
    : businessName.replace(new RegExp(`\\s*${highlight}\\s*$`), "");

  return (
    <footer className="bg-secondary text-gray-300">
      <div className="max-w-[1325px] mx-auto px-4 pt-12 @min-[768px]:pt-16 pb-8 @min-[768px]:pb-10 flex flex-col items-center text-center">
        <Link href="/" className="inline-block mb-4">
          {logoUrl && (logoUrl.startsWith("http") || logoUrl.startsWith("data:")) ? (
            <img src={logoUrl} alt={businessName} className="h-10 sm:h-12 w-auto max-w-[180px] sm:max-w-[220px] object-contain brightness-0 invert" />
          ) : (
            <span className="text-xl sm:text-2xl @min-[768px]:text-3xl font-bold text-white">
              {prefix} <span className="text-primary">{highlight}</span>
            </span>
          )}
        </Link>

        {description && (
          <p className="max-w-lg text-sm leading-relaxed mb-6">{description}</p>
        )}

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mb-4">
          {phone && (
            <a href={`tel:${phone.replace(/\D/g, "")}`} className="flex items-center hover:text-primary transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              {phone}
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`} className="flex items-center hover:text-primary transition-colors">
              <Mail className="w-4 h-4 mr-2" />
              {email}
            </a>
          )}
          {address && (
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              {address}
            </span>
          )}
        </div>

        {quickLinks.length > 0 && (
          <div className="mb-3">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Quick Links</h4>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {serviceLinks.length > 0 && (
          <div className="mb-3">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Services</h4>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm">
              {serviceLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {locationLinks.length > 0 && (
          <div className="mb-3">
            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Service Areas</h4>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm">
              {locationLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="w-16 h-0.5 bg-primary rounded-full my-6" />

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm mb-2">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
        </div>
      </div>

      <div className="bg-[#1a1b1f] py-5 text-sm border-t border-gray-800">
        <div className="max-w-[1325px] mx-auto px-4 flex flex-col sm:flex-row justify-center items-center gap-2 text-center">
          <span>&copy; {currentYear} {displayCopyright}. All Rights Reserved.</span>
          <span className="hidden sm:inline text-gray-600">|</span>
          <span className="text-gray-500">
            Web Designs by{" "}
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
