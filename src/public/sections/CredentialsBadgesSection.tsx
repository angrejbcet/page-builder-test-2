"use client";

import React from "react";
import { Shield, Award, FileCheck, BadgeCheck, Building2, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const BADGE_ICONS: Record<string, LucideIcon> = {
  licensed: FileCheck,
  insured: Shield,
  bonded: BadgeCheck,
  certified: Award,
  association: Building2,
  years: Clock,
};

function resolveBadgeIcon(type?: string): LucideIcon {
  if (!type) return Award;
  const key = type.toLowerCase().replace(/[^a-z]/g, "");
  for (const [k, icon] of Object.entries(BADGE_ICONS)) {
    if (key.includes(k)) return icon;
  }
  return Award;
}

interface BadgeItem {
  id: string;
  label: string;
  value: string;
  type?: string;
}

export interface CredentialsBadgesSectionProps {
  heading: string;
  highlight?: string;
  badges: BadgeItem[];
  dark?: boolean;
  variant?: "grid" | "banner" | "minimal" | string;
  elementStyles?: Record<string, string>;
}

type CredentialsBadgesVariantProps = Omit<CredentialsBadgesSectionProps, "variant">;

function CredentialsSectionHeader({ heading, highlight, dark, elementStyles }: { heading: string; highlight?: string; dark: boolean; elementStyles?: Record<string, string> }) {
  return (
    <div className="text-center mb-12">
      <h2
        className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${
          dark ? "text-white" : "text-gray-900"
        }`}
        style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
      >
        {heading}{" "}
        {highlight && <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>}
      </h2>
      <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
    </div>
  );
}

const BannerVariant: React.FC<CredentialsBadgesVariantProps> = ({
  heading,
  highlight,
  badges = [],
  dark = true,
  elementStyles,
}) => {
  return (
    <section
      className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <CredentialsSectionHeader heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />

        <div className="flex gap-6 @min-[768px]:gap-8 overflow-x-auto pb-2">
          {badges.map((badge, idx) => {
            const Icon = resolveBadgeIcon(badge.type || badge.label);
            return (
              <div
                key={badge.id || `badge-${idx}`}
                className={`flex items-center gap-3 flex-shrink-0 px-4 py-3 rounded-lg transition-all ${
                  dark
                    ? "bg-white/5 hover:bg-white/10"
                    : "bg-white shadow-sm hover:shadow-md border border-slate-100"
                }`}
                style={{ ...(elementStyles?.cardBg && { backgroundColor: elementStyles.cardBg }), ...(elementStyles?.cardBorder && { borderColor: elementStyles.cardBorder }) }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    dark ? "bg-primary/20" : "bg-primary/10"
                  }`}
                >
                  <Icon className="w-5 h-5 text-primary" style={elementStyles?.iconColor ? { color: elementStyles.iconColor } : undefined} />
                </div>
                <div className="min-w-0">
                  <p
                    className={`text-sm font-bold leading-tight ${
                      dark ? "text-white" : "text-secondary"
                    }`}
                  >
                    {badge.value}
                  </p>
                  <p
                    className={`text-xs ${
                      dark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {badge.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const MinimalVariant: React.FC<CredentialsBadgesVariantProps> = ({
  heading,
  highlight,
  badges = [],
  dark = true,
  elementStyles,
}) => {
  return (
    <section
      className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <CredentialsSectionHeader heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />

        <div className="flex flex-wrap items-center justify-center gap-3">
          {badges.map((badge, idx) => {
            const Icon = resolveBadgeIcon(badge.type || badge.label);
            return (
              <span
                key={badge.id || `badge-${idx}`}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  dark
                    ? "bg-white/10 text-gray-200 hover:bg-white/15"
                    : "bg-white text-secondary shadow-sm hover:shadow-md border border-slate-100"
                }`}
              >
                <Icon className="w-4 h-4 text-primary" style={elementStyles?.iconColor ? { color: elementStyles.iconColor } : undefined} />
                {badge.value}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const CredentialsBadgesSection: React.FC<CredentialsBadgesSectionProps> = ({
  heading,
  highlight,
  badges = [],
  dark = true,
  variant = "grid",
  elementStyles,
}) => {
  if (variant === "banner") return <BannerVariant heading={heading} highlight={highlight} badges={badges} dark={dark} elementStyles={elementStyles} />;
  if (variant === "minimal") return <MinimalVariant heading={heading} highlight={highlight} badges={badges} dark={dark} elementStyles={elementStyles} />;

  return (
    <section
      className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <CredentialsSectionHeader heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />

        <div className="grid grid-cols-2 @min-[768px]:grid-cols-3 @min-[1024px]:grid-cols-6 gap-4">
          {badges.map((badge, idx) => {
            const Icon = resolveBadgeIcon(badge.type || badge.label);
            return (
              <div
                key={badge.id || `badge-${idx}`}
                className={`flex flex-col items-center text-center p-3 @min-[768px]:p-5 rounded-xl transition-all ${
                  dark
                    ? "bg-white/5 hover:bg-white/10"
                    : "bg-white shadow-sm hover:shadow-md border border-slate-100"
                }`}
                style={{ ...(elementStyles?.cardBg && { backgroundColor: elementStyles.cardBg }), ...(elementStyles?.cardBorder && { borderColor: elementStyles.cardBorder }) }}
              >
                <div
                  className={`w-12 h-12 @min-[768px]:w-14 @min-[768px]:h-14 rounded-full flex items-center justify-center mb-3 ${
                    dark ? "bg-primary/20" : "bg-primary/10"
                  }`}
                >
                  <Icon className="w-7 h-7 text-primary" style={elementStyles?.iconColor ? { color: elementStyles.iconColor } : undefined} />
                </div>
                <p
                  className={`text-sm font-bold mb-1 ${
                    dark ? "text-white" : "text-secondary"
                  }`}
                >
                  {badge.value}
                </p>
                <p
                  className={`text-xs ${
                    dark ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {badge.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
