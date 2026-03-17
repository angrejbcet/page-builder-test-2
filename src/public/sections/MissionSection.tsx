import React from "react";
import { cn } from "@/public/lib/utils";
import { QuoteIcon, Award, Shield, Clock, Heart, Star, Users, Zap, Target, Gem, ThumbsUp, Lightbulb, Rocket } from "lucide-react";

const ICON_MAP: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  award: Award, shield: Shield, clock: Clock, heart: Heart, star: Star,
  users: Users, zap: Zap, target: Target, gem: Gem, thumbsUp: ThumbsUp,
  lightbulb: Lightbulb, rocket: Rocket, quote: QuoteIcon,
};

interface ValueItem {
  icon?: string;
  title: string;
  description: string;
}

export interface MissionProps {
  heading?: string;
  quote: string;
  author: string;
  backgroundImage: string;
  values?: ValueItem[];
  variant?: "overlay" | "card" | "minimal" | "values" | string;
  dark?: boolean;
  elementStyles?: Record<string, string>;
}

type VariantProps = Omit<MissionProps, "variant">;

const hasRealImage = (src?: string) =>
  src?.startsWith("data:") || src?.startsWith("http");

function CardVariant({ quote, author, backgroundImage, dark = false, elementStyles }: VariantProps) {
  const hasSectionBg = !!elementStyles?._sectionBg;

  return (
    <section className={cn("relative py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8 flex items-center justify-center", !hasSectionBg && (dark ? "bg-secondary" : "bg-slate-50"))}>
      {hasRealImage(backgroundImage) && (
        <div className="absolute inset-0">
          <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
          <div className={cn("absolute inset-0", dark ? "bg-secondary" : "bg-white")} style={{ opacity: 0.92 }} />
        </div>
      )}

      <div className={cn(
        "relative z-10 w-full max-w-[800px] mx-auto rounded-2xl p-8 @min-[768px]:p-12 shadow-lg text-center",
        dark ? "bg-white/5 border border-white/10" : "bg-white border border-slate-100",
      )}>
        <QuoteIcon
          className={cn("w-10 h-10 @min-[768px]:w-14 @min-[768px]:h-14 mx-auto mb-6", dark ? "text-primary/70" : "text-primary/40")}
          style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}
        />

        <blockquote
          className={cn("text-xl @min-[640px]:text-2xl @min-[768px]:text-3xl font-semibold leading-relaxed mb-8", dark ? "text-white" : "text-secondary")}
          style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>

        <div className="flex items-center justify-center">
          <div className={cn("h-px w-12 mr-4", dark ? "bg-white/30" : "bg-slate-200")} style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
          <p
            className={cn("text-lg font-medium tracking-wide uppercase", dark ? "text-gray-300" : "text-gray-600")}
            style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
          >
            {author}
          </p>
          <div className={cn("h-px w-12 ml-4", dark ? "bg-white/30" : "bg-slate-200")} style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
        </div>
      </div>
    </section>
  );
}

function MinimalVariant({ quote, author, dark = false, elementStyles }: VariantProps) {
  const hasSectionBg = !!elementStyles?._sectionBg;

  return (
    <section className={cn("py-16 @min-[768px]:py-28 px-4 @min-[768px]:px-8 flex items-center justify-center text-center", !hasSectionBg && (dark ? "bg-secondary" : "bg-white"))}>
      <div className="max-w-3xl mx-auto">
        <blockquote
          className={cn("text-xl @min-[640px]:text-2xl @min-[768px]:text-3xl @min-[1024px]:text-4xl italic font-light leading-relaxed mb-10", dark ? "text-white" : "text-secondary")}
          style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          &ldquo;{quote}&rdquo;
        </blockquote>

        <div className={cn("h-px w-16 mx-auto mb-6", dark ? "bg-white/30" : "bg-slate-300")} style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />

        <p
          className={cn("text-base font-medium tracking-wide uppercase", dark ? "text-gray-300" : "text-gray-600")}
          style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
        >
          {author}
        </p>
      </div>
    </section>
  );
}

function ValuesVariant({ heading, quote, values = [], dark = false, elementStyles }: VariantProps) {
  const hasSectionBg = !!elementStyles?._sectionBg;

  return (
    <section className={cn("py-16 @min-[768px]:py-24 px-4 @min-[768px]:px-8", !hasSectionBg && (dark ? "bg-secondary" : "bg-white"))}>
      <div className="max-w-5xl mx-auto text-center">
        {heading && (
          <h2
            className={cn("text-3xl @min-[768px]:text-4xl @min-[1024px]:text-5xl font-bold mb-6", dark ? "text-white" : "text-secondary")}
            style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
          >
            {heading}
          </h2>
        )}

        <p
          className={cn("text-base @min-[768px]:text-lg max-w-3xl mx-auto leading-relaxed mb-12 @min-[768px]:mb-16", dark ? "text-gray-300" : "text-gray-600")}
          style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
        >
          {quote}
        </p>

        {values.length > 0 && (
          <div className={cn(
            "grid gap-6 @min-[768px]:gap-8",
            values.length === 1 && "max-w-sm mx-auto",
            values.length === 2 && "grid-cols-1 @min-[640px]:grid-cols-2 max-w-2xl mx-auto",
            values.length === 3 && "grid-cols-1 @min-[640px]:grid-cols-3",
            values.length >= 4 && "grid-cols-1 @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-4",
          )}>
            {values.map((v, i) => {
              const IconComp = ICON_MAP[v.icon || "star"] || Star;
              return (
                <div
                  key={i}
                  className={cn(
                    "rounded-xl p-6 @min-[768px]:p-8 text-center transition-colors",
                    dark
                      ? "bg-white/5 border border-white/10 hover:bg-white/10"
                      : "bg-slate-50 border border-slate-100 hover:bg-slate-100",
                  )}
                >
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4",
                      dark ? "bg-white/10" : "bg-primary/10",
                    )}
                  >
                    <IconComp
                      className={cn("w-6 h-6", dark ? "text-primary" : "text-primary")}
                      style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}
                    />
                  </div>
                  <h3
                    className={cn("text-lg font-semibold mb-2", dark ? "text-white" : "text-secondary")}
                    style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
                  >
                    {v.title}
                  </h3>
                  <p
                    className={cn("text-sm leading-relaxed", dark ? "text-gray-400" : "text-gray-500")}
                    style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                  >
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export const MissionSection: React.FC<MissionProps> = ({
  heading,
  quote,
  author,
  backgroundImage,
  values,
  variant = "overlay",
  dark = false,
  elementStyles,
}) => {
  const shared = { heading, quote, author, backgroundImage, values, dark, elementStyles };

  if (variant === "values") return <ValuesVariant {...shared} />;
  if (variant === "card") return <CardVariant {...shared} />;
  if (variant === "minimal") return <MinimalVariant {...shared} />;

  const overlay = elementStyles?.imageOverlay;

  return (
    <section className="relative py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8 flex items-center justify-center text-center bg-primary">
      <div className="absolute inset-0">
        {hasRealImage(backgroundImage) && (
          <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        {overlay && <div className="absolute inset-0" style={{ backgroundColor: overlay }} />}
        <div className={cn("absolute inset-0 mix-blend-multiply", dark ? "bg-secondary/90" : "bg-primary/90")} />
        <div className={cn("absolute inset-0", dark ? "bg-black/60" : "bg-black/40")} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <QuoteIcon className="w-12 h-12 @min-[768px]:w-16 @min-[768px]:h-16 text-white/50 mx-auto mb-8" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined} />

        <blockquote className="text-xl @min-[640px]:text-2xl @min-[768px]:text-3xl @min-[1024px]:text-4xl font-semibold text-white leading-relaxed mb-10" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
          &ldquo;{quote}&rdquo;
        </blockquote>

        <div className="flex items-center justify-center">
          <div className="h-px w-12 bg-white/50 mr-4" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
          <p className="text-white text-lg font-medium tracking-wide uppercase" style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
            {author}
          </p>
          <div className="h-px w-12 bg-white/50 ml-4" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
        </div>
      </div>
    </section>
  );
};
