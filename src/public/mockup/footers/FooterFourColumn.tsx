import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import type { MockupFooterProps } from "../MockupFooter";

export function FooterFourColumn({
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
    <footer className="bg-secondary text-gray-300 pt-12 @min-[768px]:pt-16">
      <div className="max-w-[1325px] mx-auto px-4 grid grid-cols-1 @min-[768px]:grid-cols-2 @min-[1024px]:grid-cols-4 gap-8 @min-[768px]:gap-10 mb-12">
        <div>
          <Link href="/" className="inline-block mb-6">
            {logoUrl && (logoUrl.startsWith("http") || logoUrl.startsWith("data:")) ? (
              <img src={logoUrl} alt={businessName} className="h-9 sm:h-10 w-auto max-w-[160px] sm:max-w-[200px] object-contain brightness-0 invert" />
            ) : (
              <span className="text-xl sm:text-2xl font-bold text-white">
                {prefix} <span className="text-primary">{highlight}</span>
              </span>
            )}
          </Link>
          {description && (
            <p className="mb-6 text-sm leading-relaxed">{description}</p>
          )}
          <div className="space-y-3">
            {phone && (
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="flex items-center hover:text-primary transition-colors text-sm"
              >
                <Phone className="w-4 h-4 mr-3" />
                {phone}
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center hover:text-primary transition-colors text-sm"
              >
                <Mail className="w-4 h-4 mr-3" />
                {email}
              </a>
            )}
            {address && (
              <div className="flex items-start text-sm">
                <MapPin className="w-4 h-4 mr-3 mt-1 flex-shrink-0" />
                <span>{address}</span>
              </div>
            )}
          </div>
        </div>

        {quickLinks.length > 0 && (
          <div>
            <h3 className="text-white text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-primary">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {serviceLinks.length > 0 && (
          <div>
            <h3 className="text-white text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-primary">
              Our Services
            </h3>
            <ul className="space-y-3 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {locationLinks.length > 0 && (
          <div>
            <h3 className="text-white text-lg font-bold mb-6 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-primary">
              Service Areas
            </h3>
            <ul className="space-y-3 text-sm">
              {locationLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-[#1a1b1f] py-6 text-sm border-t border-gray-800">
        <div className="max-w-[1325px] mx-auto px-4 flex flex-col @min-[768px]:flex-row justify-between items-center">
          <div className="mb-4 @min-[768px]:mb-0">
            &copy; {currentYear} {displayCopyright}. All Rights Reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 items-center">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-use" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
          <div className="mt-4 @min-[768px]:mt-0 text-gray-500">
            Web Designs by{" "}
            <a
              href="https://pointclickengage.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-white transition-colors"
            >
              Point Click Engage
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
