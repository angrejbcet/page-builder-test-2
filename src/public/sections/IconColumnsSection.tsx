"use client";

import React from "react";
import {
  Shield,
  Clock,
  Award,
  Star,
  Heart,
  Target,
  Eye,
  Zap,
  Phone,
  Mail,
  MapPin,
  ThumbsUp,
  Wrench,
  CheckCircle,
  Users,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  shield: Shield,
  clock: Clock,
  award: Award,
  star: Star,
  heart: Heart,
  target: Target,
  eye: Eye,
  zap: Zap,
  phone: Phone,
  mail: Mail,
  mappin: MapPin,
  thumbsup: ThumbsUp,
  wrench: Wrench,
  check: CheckCircle,
  users: Users,
};

function resolveIcon(name?: string): LucideIcon {
  if (!name) return Star;
  const key = name.toLowerCase().replace(/[^a-z]/g, "");
  return ICON_MAP[key] || Star;
}

interface ColumnItem {
  id: string;
  icon?: string;
  headline: string;
  description: string;
}

export interface IconColumnsSectionProps {
  heading: string;
  highlight?: string;
  columns: ColumnItem[];
  dark?: boolean;
  variant?: "grid" | "horizontal" | "bordered";
  elementStyles?: Record<string, string>;
}

type VariantProps = Omit<IconColumnsSectionProps, "variant">;

/* ─── Heading (shared) ─── */
function SectionHeading({ heading, highlight, dark, elementStyles }: Pick<VariantProps, "heading" | "highlight" | "dark" | "elementStyles">) {
  if (!heading) return null;
  return (
    <div className="text-center mb-10 @min-[768px]:mb-14">
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

/* ─── Horizontal variant ─── */
function HorizontalVariant({ heading, highlight, columns = [], dark = false, elementStyles }: VariantProps) {
  return (
    <section
      className={`py-20 @min-[768px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />

        <div className="grid gap-6 @min-[1024px]:grid-cols-2">
          {columns.map((col, idx) => {
            const Icon = resolveIcon(col.icon);
            return (
              <div
                key={col.id || `col-${idx}`}
                className={`flex items-start gap-4 @min-[768px]:gap-6 p-5 @min-[768px]:p-6 rounded-xl transition-all ${
                  dark
                    ? "bg-white/5 hover:bg-white/10"
                    : "bg-white shadow-sm hover:shadow-md border border-slate-100"
                }`}
              >
                <div
                  className={`w-14 h-14 @min-[768px]:w-16 @min-[768px]:h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                    dark ? "bg-primary/20" : "bg-primary/10"
                  }`}
                >
                  <Icon className="w-8 h-8 text-primary" style={elementStyles?.iconColor ? { color: elementStyles.iconColor } : undefined} />
                </div>
                <div>
                  <h3
                    className={`text-lg @min-[768px]:text-xl font-bold mb-2 ${
                      dark ? "text-white" : "text-secondary"
                    }`}
                  >
                    {col.headline}
                  </h3>
                  <p
                    className={`leading-relaxed ${
                      dark ? "text-gray-300" : "text-gray-600"
                    }`}
                    style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                  >
                    {col.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Bordered variant ─── */
function BorderedVariant({ heading, highlight, columns = [], dark = false, elementStyles }: VariantProps) {
  return (
    <section
      className={`py-20 @min-[768px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />

        <div
          className={`grid gap-8 ${
            columns.length === 2
              ? "@min-[768px]:grid-cols-2"
              : columns.length >= 4
                ? "@min-[768px]:grid-cols-2 @min-[1024px]:grid-cols-4"
                : "@min-[768px]:grid-cols-3"
          }`}
        >
          {columns.map((col, idx) => {
            const Icon = resolveIcon(col.icon);
            return (
              <div
                key={col.id || `col-${idx}`}
                className={`text-center rounded-xl border p-6 @min-[768px]:p-8 transition-all hover:shadow-md ${
                  dark
                    ? "bg-white/5 border-white/10 hover:border-primary/30"
                    : "bg-white border-slate-200 shadow-sm hover:border-primary/30"
                }`}
              >
                <div
                  className={`w-16 h-16 @min-[768px]:w-20 @min-[768px]:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                    dark ? "bg-primary/20" : "bg-primary/10"
                  }`}
                >
                  <Icon className="w-10 h-10 text-primary" style={elementStyles?.iconColor ? { color: elementStyles.iconColor } : undefined} />
                </div>
                <h3
                  className={`text-lg @min-[768px]:text-xl font-bold mb-3 ${
                    dark ? "text-white" : "text-secondary"
                  }`}
                >
                  {col.headline}
                </h3>
                <p
                  className={`leading-relaxed ${
                    dark ? "text-gray-300" : "text-gray-600"
                  }`}
                  style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                >
                  {col.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Main export (grid = default) ─── */
export const IconColumnsSection: React.FC<IconColumnsSectionProps> = ({
  heading,
  highlight,
  columns = [],
  dark = false,
  variant = "grid",
  elementStyles,
}) => {
  if (variant === "horizontal") return <HorizontalVariant heading={heading} highlight={highlight} columns={columns} dark={dark} elementStyles={elementStyles} />;
  if (variant === "bordered") return <BorderedVariant heading={heading} highlight={highlight} columns={columns} dark={dark} elementStyles={elementStyles} />;

  return (
    <section
      className={`py-20 @min-[768px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <SectionHeading heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />

        <div
          className={`grid gap-8 ${
            columns.length === 2
              ? "@min-[768px]:grid-cols-2"
              : columns.length >= 4
                ? "@min-[768px]:grid-cols-2 @min-[1024px]:grid-cols-4"
                : "@min-[768px]:grid-cols-3"
          }`}
        >
          {columns.map((col, idx) => {
            const Icon = resolveIcon(col.icon);
            return (
              <div
                key={col.id || `col-${idx}`}
                className={`text-center p-5 @min-[768px]:p-8 rounded-xl transition-all ${
                  dark
                    ? "bg-white/5 hover:bg-white/10"
                    : "bg-white shadow-sm hover:shadow-md border border-slate-100"
                }`}
              >
                <div
                  className={`w-16 h-16 @min-[768px]:w-20 @min-[768px]:h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                    dark ? "bg-primary/20" : "bg-primary/10"
                  }`}
                >
                  <Icon className="w-10 h-10 text-primary" style={elementStyles?.iconColor ? { color: elementStyles.iconColor } : undefined} />
                </div>
                <h3
                  className={`text-lg @min-[768px]:text-xl font-bold mb-3 ${
                    dark ? "text-white" : "text-secondary"
                  }`}
                >
                  {col.headline}
                </h3>
                <p
                  className={`leading-relaxed ${
                    dark ? "text-gray-300" : "text-gray-600"
                  }`}
                  style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                >
                  {col.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
