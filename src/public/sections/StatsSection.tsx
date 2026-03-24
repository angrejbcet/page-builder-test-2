"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/public/lib/utils";
import { useModal } from "@/providers/ModalProvider";

interface StatItem {
  id: string;
  value: string;
  label: string;
}

export interface StatsSectionProps {
  tagline: string;
  heading: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  stats: StatItem[];
  dark?: boolean;
  variant?: "split" | "bar" | "centered" | "dark" | string;
  elementStyles?: Record<string, string>;
}

type CtaProps = {
  ctaText: string;
  ctaLink: string;
  dark: boolean;
  elementStyles?: Record<string, string>;
  className?: string;
};

function CtaButton({ ctaText, ctaLink, dark, elementStyles, className }: CtaProps) {
  const { openContactModal } = useModal();
  const style =
    elementStyles?.ctaBg || elementStyles?.ctaText
      ? { ...(elementStyles.ctaBg && { backgroundColor: elementStyles.ctaBg }), ...(elementStyles.ctaText && { color: elementStyles.ctaText }) }
      : undefined;

  const base = cn(
    "inline-flex items-center font-bold px-4 py-3 @min-[768px]:px-8 @min-[768px]:py-4 rounded-md transition-colors group",
    dark ? "bg-white text-secondary hover:bg-primary hover:text-white" : "bg-primary text-on-primary hover:bg-primary-dark",
    className,
  );

  if (ctaLink === "/contact") {
    return (
      <button onClick={openContactModal} className={cn(base, "cursor-pointer")} style={style}>
        {ctaText}
        <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
      </button>
    );
  }
  return (
    <a href={ctaLink} className={base} style={style}>
      {ctaText}
      <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
    </a>
  );
}

function StatsBar({ tagline, heading, stats, dark, elementStyles }: Pick<StatsSectionProps, "tagline" | "heading" | "stats" | "dark" | "elementStyles">) {
  const hasSectionBg = !!elementStyles?._sectionBg;
  return (
    <section className={cn("py-16 px-4 @min-[768px]:px-8", !hasSectionBg && (dark ? "bg-secondary" : "bg-white"))}>
      <div className="max-w-[1325px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>{tagline}</span>
          <h2
            className={cn("text-3xl @min-[1024px]:text-4xl font-bold leading-tight", dark ? "text-white" : "text-secondary")}
            style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
          >
            {heading}
          </h2>
        </div>
        <div className="grid grid-cols-2 @min-[1024px]:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.id || `stat-${index}`} className="text-center">
              <p className="text-3xl @min-[640px]:text-4xl @min-[768px]:text-5xl @min-[1024px]:text-6xl font-extrabold text-primary mb-3" style={elementStyles?.statValueColor ? { color: elementStyles.statValueColor } : undefined}>
                {stat.value}
              </p>
              <p className={cn("text-sm font-bold tracking-widest uppercase", dark ? "text-gray-400" : "text-gray-500")} style={elementStyles?.statLabelColor ? { color: elementStyles.statLabelColor } : undefined}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsCentered({ tagline, heading, ctaText, ctaLink, stats, dark, elementStyles }: Omit<StatsSectionProps, "image" | "variant">) {
  const hasSectionBg = !!elementStyles?._sectionBg;
  return (
    <section className={cn("py-24 px-4 @min-[768px]:px-8", !hasSectionBg && (dark ? "bg-secondary" : "bg-white"))}>
      <div className="max-w-[1000px] mx-auto text-center">
        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>{tagline}</span>
        <h2
          className={cn("text-2xl @min-[768px]:text-3xl @min-[1024px]:text-5xl font-bold leading-tight mb-16", dark ? "text-white" : "text-secondary")}
          style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          {heading}
        </h2>
        <div className="grid grid-cols-2 @min-[1024px]:grid-cols-4 gap-10 mb-12">
          {stats.map((stat, index) => (
            <div
              key={stat.id || `stat-${index}`}
              className={cn("rounded-2xl p-4 @min-[640px]:p-6 @min-[1024px]:p-8 border", dark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-100")}
            >
              <p className="text-4xl @min-[1024px]:text-5xl font-extrabold text-primary mb-2" style={elementStyles?.statValueColor ? { color: elementStyles.statValueColor } : undefined}>{stat.value}</p>
              <p className={cn("text-xs font-bold tracking-widest uppercase", dark ? "text-gray-400" : "text-gray-500")} style={elementStyles?.statLabelColor ? { color: elementStyles.statLabelColor } : undefined}>{stat.label}</p>
            </div>
          ))}
        </div>
        <CtaButton ctaText={ctaText} ctaLink={ctaLink} dark={!!dark} elementStyles={elementStyles} />
      </div>
    </section>
  );
}

function StatsDark({ tagline, heading, ctaText, ctaLink, stats, elementStyles }: Omit<StatsSectionProps, "image" | "variant" | "dark">) {
  const hasSectionBg = !!elementStyles?._sectionBg;
  return (
    <section className={cn("py-24 px-4 @min-[768px]:px-8", !hasSectionBg && "bg-gray-900")}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>{tagline}</span>
          <h2 className="text-2xl @min-[768px]:text-3xl @min-[1024px]:text-5xl font-bold text-white leading-tight" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>{heading}</h2>
        </div>
        <div className="grid grid-cols-2 @min-[1024px]:grid-cols-4 gap-6 mb-14">
          {stats.map((stat, index) => (
            <div key={stat.id || `stat-${index}`} className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 @min-[640px]:p-6 @min-[1024px]:p-8 text-center border border-white/10 hover:border-primary/30 transition-colors">
              <p className="text-4xl @min-[1024px]:text-5xl font-extrabold text-primary mb-3" style={elementStyles?.statValueColor ? { color: elementStyles.statValueColor } : undefined}>{stat.value}</p>
              <p className="text-xs font-bold tracking-widest uppercase text-gray-400" style={elementStyles?.statLabelColor ? { color: elementStyles.statLabelColor } : undefined}>{stat.label}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <CtaButton ctaText={ctaText} ctaLink={ctaLink} dark elementStyles={elementStyles} />
        </div>
      </div>
    </section>
  );
}

export const StatsSection: React.FC<StatsSectionProps> = ({
  tagline,
  heading,
  ctaText,
  ctaLink = "/contact",
  image,
  stats = [],
  dark = false,
  variant = "split",
  elementStyles,
}) => {
  const hasSectionBg = !!elementStyles?._sectionBg;
  if (variant === "bar") return <StatsBar tagline={tagline} heading={heading} stats={stats} dark={dark} elementStyles={elementStyles} />;
  if (variant === "centered") return <StatsCentered tagline={tagline} heading={heading} ctaText={ctaText} ctaLink={ctaLink} stats={stats} dark={dark} elementStyles={elementStyles} />;
  if (variant === "dark") return <StatsDark tagline={tagline} heading={heading} ctaText={ctaText} ctaLink={ctaLink} stats={stats} elementStyles={elementStyles} />;

  const hasImage = image?.startsWith("data:") || image?.startsWith("http");

  return (
    <section className={cn("py-0 overflow-hidden", !hasSectionBg && (dark ? "bg-secondary" : "bg-white"))}>
      <div className="max-w-[1325px] mx-auto">
        <div className="grid @min-[768px]:grid-cols-2 min-h-[400px] @min-[768px]:min-h-[500px]">
          <div className="flex flex-col justify-center px-6 @min-[768px]:px-12 @min-[1024px]:px-16 py-16 @min-[768px]:py-20">
            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>{tagline}</span>
            <h2
              className={cn("text-2xl @min-[768px]:text-3xl @min-[1024px]:text-5xl font-bold leading-tight mb-8", dark ? "text-white" : "text-secondary")}
              style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
            >
              {heading}
            </h2>
            <CtaButton ctaText={ctaText} ctaLink={ctaLink} dark={dark} elementStyles={elementStyles} className="self-start" />
          </div>
          <div className="relative min-h-[350px] @min-[768px]:min-h-0">
            {hasImage ? (
              <img src={image} alt={heading} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <div className="absolute inset-0" style={{ backgroundColor: "#94a3b8" }} />
                <div className="absolute inset-0 flex items-center justify-center text-white/60 font-medium tracking-wider uppercase text-sm">[Experience Image]</div>
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 @min-[1024px]:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.id || `stat-${index}`}
              className={cn("px-4 py-6 @min-[768px]:px-6 @min-[768px]:py-8 text-center text-white", index % 2 === 0 ? "bg-secondary" : "bg-secondary/80")}
            >
              <p className="text-4xl @min-[1024px]:text-5xl font-extrabold text-primary mb-2" style={elementStyles?.statValueColor ? { color: elementStyles.statValueColor } : undefined}>{stat.value}</p>
              <p className="text-xs @min-[1024px]:text-sm font-bold tracking-widest uppercase text-gray-300" style={elementStyles?.statLabelColor ? { color: elementStyles.statLabelColor } : undefined}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
