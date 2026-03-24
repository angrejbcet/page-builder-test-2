import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import type { MockupFooterProps } from "../MockupFooter";

export function FooterTwoRow({
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

  const hasLinks = quickLinks.length > 0 || serviceLinks.length > 0 || locationLinks.length > 0;

  return (
    <footer className="bg-secondary text-gray-300">
      {/* Top row */}
      <div className="max-w-[1325px] mx-auto px-4 pt-12 @min-[768px]:pt-14 pb-8 @min-[768px]:pb-10">
        <div className={`grid grid-cols-1 ${hasLinks ? "@min-[1024px]:grid-cols-5" : ""} gap-10`}>
          <div className={hasLinks ? "@min-[1024px]:col-span-2" : ""}>
            <Link href="/" className="inline-block mb-5">
              {logoUrl && (logoUrl.startsWith("http") || logoUrl.startsWith("data:")) ? (
                <img src={logoUrl} alt={businessName} className="h-9 sm:h-10 w-auto max-w-[160px] sm:max-w-[200px] object-contain brightness-0 invert" />
              ) : (
                <span className="text-xl sm:text-2xl font-bold text-white">
                  {prefix} <span className="text-primary">{highlight}</span>
                </span>
              )}
            </Link>
            {description && (
              <p className="text-sm leading-relaxed mb-5 max-w-md">{description}</p>
            )}
            <div className="space-y-2.5">
              {phone && (
                <a href={`tel:${phone.replace(/\D/g, "")}`} className="flex items-center hover:text-primary transition-colors text-sm">
                  <Phone className="w-4 h-4 mr-3" />
                  {phone}
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="flex items-center hover:text-primary transition-colors text-sm">
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

          {hasLinks && (
            <div className="@min-[1024px]:col-span-3 grid grid-cols-1 @min-[640px]:grid-cols-3 gap-8">
              {quickLinks.length > 0 && (
                <div>
                  <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Quick Links</h3>
                  <ul className="space-y-2.5 text-sm">
                    {quickLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {serviceLinks.length > 0 && (
                <div>
                  <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Our Services</h3>
                  <ul className="space-y-2.5 text-sm">
                    {serviceLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {locationLinks.length > 0 && (
                <div>
                  <h3 className="text-white text-sm font-bold uppercase tracking-wider mb-4">Service Areas</h3>
                  <ul className="space-y-2.5 text-sm">
                    {locationLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom row */}
      <div className="bg-[#1e1f24] py-5 text-xs border-t border-gray-800">
        <div className="max-w-[1325px] mx-auto px-4 flex flex-col @min-[768px]:flex-row justify-between items-center gap-3">
          <span>&copy; {currentYear} {displayCopyright}. All Rights Reserved.</span>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
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
