"use client";

import React from "react";
import { DollarSign, ArrowRight } from "lucide-react";
import { useModal } from "@/providers/ModalProvider";

interface PricingFactor {
  id: string;
  text: string;
}

export interface PricingSectionProps {
  heading: string;
  highlight?: string;
  description: string;
  priceRange?: string;
  factors: PricingFactor[];
  ctaText: string;
  ctaLink: string;
  dark?: boolean;
  variant?: "standard" | "card" | "split";
  elementStyles?: Record<string, string>;
}

type VariantProps = Omit<PricingSectionProps, "variant">;

/* ─── Shared CTA button ─── */
function CtaButton({ ctaText, ctaLink, openContactModal, elementStyles }: { ctaText: string; ctaLink: string; openContactModal: () => void; elementStyles?: Record<string, string> }) {
  const ctaStyle = { ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg } : {}), ...(elementStyles?.ctaText ? { color: elementStyles.ctaText } : {}) };
  const hasCtaStyle = elementStyles?.ctaBg || elementStyles?.ctaText;

  if (ctaLink === "/contact") {
    return (
      <button
        onClick={openContactModal}
        className="inline-flex items-center gap-2 bg-primary text-on-primary font-bold px-4 py-3 @min-[768px]:px-10 @min-[768px]:py-4 rounded-lg hover:bg-primary-dark transition-colors text-sm @min-[768px]:text-lg cursor-pointer"
        style={hasCtaStyle ? ctaStyle : undefined}
      >
        {ctaText}
        <ArrowRight className="w-5 h-5" />
      </button>
    );
  }
  return (
    <a
      href={ctaLink}
      className="inline-flex items-center gap-2 bg-primary text-on-primary font-bold px-4 py-3 @min-[768px]:px-10 @min-[768px]:py-4 rounded-lg hover:bg-primary-dark transition-colors text-sm @min-[768px]:text-lg"
      style={hasCtaStyle ? ctaStyle : undefined}
    >
      {ctaText}
      <ArrowRight className="w-5 h-5" />
    </a>
  );
}

/* ─── Shared heading block ─── */
function PricingHeading({ heading, highlight, dark, elementStyles }: Pick<VariantProps, "heading" | "highlight" | "dark" | "elementStyles">) {
  return (
    <div className="mb-10">
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

/* ─── Shared price badge ─── */
function PriceBadge({ priceRange, dark, elementStyles }: Pick<VariantProps, "priceRange" | "dark" | "elementStyles">) {
  if (!priceRange) return null;
  return (
    <div
      className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl mb-8 ${
        dark ? "bg-white/10" : "bg-primary/10"
      }`}
    >
      <DollarSign className="w-8 h-8 text-primary" />
      <span className="text-2xl @min-[768px]:text-3xl font-extrabold text-primary" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>
        {priceRange}
      </span>
    </div>
  );
}

/* ─── Shared factors grid ─── */
function FactorsGrid({ factors, dark, showLabel = true }: { factors: PricingFactor[]; dark: boolean; showLabel?: boolean }) {
  if (factors.length === 0) return null;
  return (
    <div className="mb-10">
      {showLabel && (
        <p
          className={`text-sm font-bold uppercase tracking-wider mb-4 ${
            dark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Pricing Factors
        </p>
      )}
      <div className="grid @min-[640px]:grid-cols-2 gap-3 text-left">
        {factors.map((f, idx) => (
          <div
            key={f.id || `factor-${idx}`}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${
              dark ? "bg-white/5" : "bg-white border border-slate-200"
            }`}
          >
            <span className="text-primary font-bold">•</span>
            <span
              className={`text-sm ${
                dark ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {f.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Card variant ─── */
function CardVariant(props: VariantProps) {
  const { heading, highlight, description, priceRange, factors = [], ctaText, ctaLink = "/contact", dark = false, elementStyles } = props;
  const { openContactModal } = useModal();

  return (
    <section
      className={`py-12 @min-[768px]:py-16 @min-[1024px]:py-20 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
      }`}
    >
      <div
        className={`max-w-[800px] mx-auto rounded-2xl border p-8 @min-[768px]:p-12 text-center ${
          dark
            ? "bg-white/5 border-white/10 shadow-lg shadow-black/20"
            : "bg-white border-slate-200 shadow-lg"
        }`}
      >
        <PricingHeading heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />
        <PriceBadge priceRange={priceRange} dark={dark} elementStyles={elementStyles} />

        <p
          className={`text-lg leading-relaxed mb-8 max-w-2xl mx-auto ${
            dark ? "text-gray-300" : "text-gray-600"
          }`}
          style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
        >
          {description}
        </p>

        <div className="max-w-lg mx-auto">
          <FactorsGrid factors={factors} dark={dark} />
        </div>

        <CtaButton ctaText={ctaText} ctaLink={ctaLink} openContactModal={openContactModal} elementStyles={elementStyles} />
      </div>
    </section>
  );
}

/* ─── Split variant ─── */
function SplitVariant(props: VariantProps) {
  const { heading, highlight, description, priceRange, factors = [], ctaText, ctaLink = "/contact", dark = false, elementStyles } = props;
  const { openContactModal } = useModal();

  return (
    <section
      className={`py-12 @min-[768px]:py-16 @min-[1024px]:py-20 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
      }`}
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="grid @min-[768px]:grid-cols-2 gap-8 @min-[1024px]:gap-12 items-start">
          {/* Left: heading + description + CTA */}
          <div>
            <h2
              className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${
                dark ? "text-white" : "text-gray-900"
              }`}
              style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
            >
              {heading}{" "}
              {highlight && <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>}
            </h2>
            <div className="w-24 h-1 bg-primary rounded-full mb-6" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />

            {priceRange && (
              <div
                className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl mb-6 ${
                  dark ? "bg-white/10" : "bg-primary/10"
                }`}
              >
                <DollarSign className="w-7 h-7 text-primary" />
                <span className="text-xl @min-[768px]:text-2xl font-extrabold text-primary" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>
                  {priceRange}
                </span>
              </div>
            )}

            <p
              className={`text-lg leading-relaxed mb-8 ${
                dark ? "text-gray-300" : "text-gray-600"
              }`}
              style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
            >
              {description}
            </p>

            <CtaButton ctaText={ctaText} ctaLink={ctaLink} openContactModal={openContactModal} elementStyles={elementStyles} />
          </div>

          {/* Right: factors card */}
          {factors.length > 0 && (
            <div
              className={`rounded-2xl border p-6 @min-[768px]:p-8 ${
                dark
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              <p
                className={`text-sm font-bold uppercase tracking-wider mb-5 ${
                  dark ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Pricing Factors
              </p>
              <div className="grid gap-3">
                {factors.map((f, idx) => (
                  <div
                    key={f.id || `factor-${idx}`}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg ${
                      dark ? "bg-white/5" : "bg-slate-50 border border-slate-100"
                    }`}
                  >
                    <span className="text-primary font-bold">•</span>
                    <span
                      className={`text-sm ${
                        dark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Main export (standard = default) ─── */
export const PricingSection: React.FC<PricingSectionProps> = ({
  heading,
  highlight,
  description,
  priceRange,
  factors = [],
  ctaText,
  ctaLink = "/contact",
  dark = false,
  variant = "standard",
  elementStyles,
}) => {
  const allProps: VariantProps = { heading, highlight, description, priceRange, factors, ctaText, ctaLink, dark, elementStyles };

  if (variant === "card") return <CardVariant {...allProps} />;
  if (variant === "split") return <SplitVariant {...allProps} />;

  const { openContactModal } = useModal();

  return (
    <section
      className={`py-12 @min-[768px]:py-16 @min-[1024px]:py-20 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
      }`}
    >
      <div className="max-w-[900px] mx-auto text-center">
        <PricingHeading heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />
        <PriceBadge priceRange={priceRange} dark={dark} elementStyles={elementStyles} />

        <p
          className={`text-lg leading-relaxed mb-8 max-w-2xl mx-auto ${
            dark ? "text-gray-300" : "text-gray-600"
          }`}
          style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
        >
          {description}
        </p>

        <div className="max-w-lg mx-auto">
          <FactorsGrid factors={factors} dark={dark} />
        </div>

        <CtaButton ctaText={ctaText} ctaLink={ctaLink} openContactModal={openContactModal} elementStyles={elementStyles} />
      </div>
    </section>
  );
};
