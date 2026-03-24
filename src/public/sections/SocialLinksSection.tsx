"use client";

import React from "react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Star, Globe } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const PLATFORM_ICONS: Record<string, LucideIcon> = {
  facebook: Facebook,
  instagram: Instagram,
  twitter: Twitter,
  x: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  google: Star,
  yelp: Star,
  tiktok: Globe,
};

function getPlatformIcon(platform: string): LucideIcon {
  const key = platform.toLowerCase().replace(/[^a-z]/g, "");
  return PLATFORM_ICONS[key] || Globe;
}

interface SocialLinkItem {
  id: string;
  platform: string;
  url: string;
}

export interface SocialLinksSectionProps {
  heading: string;
  highlight?: string;
  links: SocialLinkItem[];
  dark?: boolean;
  variant?: "grid" | "iconOnly" | "pills" | string;
  elementStyles?: Record<string, string>;
}

type SocialLinksVariantProps = Omit<SocialLinksSectionProps, "variant">;

const IconOnlyVariant: React.FC<SocialLinksVariantProps> = ({
  heading,
  highlight,
  links = [],
  dark = false,
  elementStyles,
}) => {
  if (links.length === 0) return null;

  return (
    <section
      className={`py-12 @min-[768px]:py-16 @min-[1024px]:py-20 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
      }`}
    >
      <div className="max-w-[800px] mx-auto text-center">
        <h2
          className={`text-2xl @min-[640px]:text-3xl @min-[768px]:text-4xl font-bold mb-4 ${
            dark ? "text-white" : "text-gray-900"
          }`}
          style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          {heading}{" "}
          {highlight && <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>}
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-10" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />

        <div className="flex flex-wrap items-center justify-center gap-3 @min-[768px]:gap-4">
          {links.map((link, idx) => {
            const Icon = getPlatformIcon(link.platform);
            return (
              <a
                key={link.id || `social-${idx}`}
                href={link.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                title={link.platform}
                className={`w-12 h-12 @min-[768px]:w-14 @min-[768px]:h-14 rounded-full flex items-center justify-center transition-all hover:scale-110 ${
                  dark
                    ? "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    : "bg-white text-secondary hover:shadow-md border border-slate-200 hover:border-primary/30"
                }`}
              >
                <Icon className="w-5 h-5 @min-[768px]:w-6 @min-[768px]:h-6 text-primary" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const PillsVariant: React.FC<SocialLinksVariantProps> = ({
  heading,
  highlight,
  links = [],
  dark = false,
  elementStyles,
}) => {
  if (links.length === 0) return null;

  return (
    <section
      className={`py-12 @min-[768px]:py-16 @min-[1024px]:py-20 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
      }`}
    >
      <div className="max-w-[800px] mx-auto text-center">
        <h2
          className={`text-2xl @min-[640px]:text-3xl @min-[768px]:text-4xl font-bold mb-4 ${
            dark ? "text-white" : "text-gray-900"
          }`}
          style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          {heading}{" "}
          {highlight && <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>}
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-10" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />

        <div className="flex flex-wrap items-center justify-center gap-2 @min-[768px]:gap-3">
          {links.map((link, idx) => {
            const Icon = getPlatformIcon(link.platform);
            return (
              <a
                key={link.id || `social-${idx}`}
                href={link.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                title={link.platform}
                className={`inline-flex items-center gap-2 px-3 py-1.5 @min-[768px]:px-4 @min-[768px]:py-2 rounded-full text-sm font-medium transition-colors hover:bg-primary hover:text-white ${
                  dark
                    ? "bg-white/5 text-white border border-white/10"
                    : "bg-white text-secondary border border-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="capitalize">{link.platform}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({
  heading,
  highlight,
  links = [],
  dark = false,
  variant = "grid",
  elementStyles,
}) => {
  if (links.length === 0) return null;

  if (variant === "iconOnly") return <IconOnlyVariant heading={heading} highlight={highlight} links={links} dark={dark} elementStyles={elementStyles} />;
  if (variant === "pills") return <PillsVariant heading={heading} highlight={highlight} links={links} dark={dark} elementStyles={elementStyles} />;

  return (
    <section
      className={`py-12 @min-[768px]:py-16 @min-[1024px]:py-20 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
      }`}
    >
      <div className="max-w-[800px] mx-auto text-center">
        <h2
          className={`text-2xl @min-[640px]:text-3xl @min-[768px]:text-4xl font-bold mb-4 ${
            dark ? "text-white" : "text-gray-900"
          }`}
          style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          {heading}{" "}
          {highlight && <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>}
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-10" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />

        <div className="flex flex-wrap items-center justify-center gap-4">
          {links.map((link, idx) => {
            const Icon = getPlatformIcon(link.platform);
            return (
              <a
                key={link.id || `social-${idx}`}
                href={link.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                title={link.platform}
                className={`flex items-center gap-3 px-4 py-3 @min-[768px]:px-6 @min-[768px]:py-4 rounded-xl transition-all font-semibold ${
                  dark
                    ? "bg-white/5 text-white hover:bg-white/10 border border-white/10"
                    : "bg-white text-secondary hover:shadow-md border border-slate-200 hover:border-primary/30"
                }`}
              >
                <Icon className="w-6 h-6 text-primary" />
                <span className="capitalize">{link.platform}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
