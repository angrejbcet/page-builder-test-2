"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/public/lib/utils";
import { useModal } from "@/providers/ModalProvider";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  link?: string;
}

export interface FAQSectionProps {
  heading: string;
  highlight: string;
  subheading?: string;
  items: FAQItem[];
  dark?: boolean;
  variant?: "grid" | "accordion" | "minimal" | string;
  elementStyles?: Record<string, string>;
}

function SectionHeader({ heading, highlight, subheading, dark, elementStyles }: { heading: string; highlight: string; subheading?: string; dark: boolean; elementStyles?: Record<string, string> }) {
  return (
    <div className="text-center mb-16">
      <h2
        className={cn("text-3xl @min-[768px]:text-4xl font-bold mb-4", dark ? "text-white" : "text-gray-900")}
        style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
      >
        {heading}{" "}
        <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>
          {highlight}
        </span>
      </h2>
      <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
      {subheading && (
        <p
          className={cn("mt-6 max-w-2xl mx-auto text-base @min-[768px]:text-lg", dark ? "text-gray-400" : "text-gray-600")}
          style={elementStyles?.subheadingColor ? { color: elementStyles.subheadingColor } : elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}

function CtaButton({ dark, elementStyles }: { dark: boolean; elementStyles?: Record<string, string> }) {
  const { openContactModal } = useModal();
  return (
    <div className="text-center mt-16">
      <button
        onClick={openContactModal}
        className={cn(
          "inline-flex items-center justify-center px-8 py-3 font-semibold rounded-md transition-colors cursor-pointer",
          dark ? "bg-white text-secondary hover:bg-primary hover:text-white" : "bg-secondary text-white hover:bg-black",
        )}
        style={{
          ...(elementStyles?.ctaBg ? { backgroundColor: elementStyles.ctaBg } : {}),
          ...(elementStyles?.ctaTextColor ? { color: elementStyles.ctaTextColor } : {}),
        }}
      >
        Still have questions? Contact Us
      </button>
    </div>
  );
}

function FAQAccordion({ heading, highlight, subheading, items, dark, elementStyles }: Omit<FAQSectionProps, "variant">) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const hasSectionBg = !!elementStyles?._sectionBg;

  return (
    <section className={cn("py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8", !hasSectionBg && (dark ? "bg-secondary" : "bg-white"))}>
      <div className="max-w-[800px] mx-auto">
        <SectionHeader heading={heading} highlight={highlight} subheading={subheading} dark={!!dark} elementStyles={elementStyles} />

        <div className="space-y-3">
          {items.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={item.id || `faq-${idx}`}
                className={cn("rounded-xl overflow-hidden border", dark ? "border-white/10 bg-white/5" : "border-slate-200")}
                style={{ ...(elementStyles?.cardBg ? { backgroundColor: elementStyles.cardBg } : {}), ...(elementStyles?.cardBorder ? { borderColor: elementStyles.cardBorder } : {}) }}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className={cn("w-full flex items-center justify-between px-4 py-4 @min-[768px]:px-6 @min-[768px]:py-5 text-left transition-colors", dark ? "hover:bg-white/5" : "hover:bg-slate-50")}
                >
                  <span
                    className={cn("text-base @min-[768px]:text-lg font-bold pr-4 break-words", dark ? "text-white" : "text-secondary")}
                    style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}
                  >
                    {item.question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p className={cn("leading-relaxed", dark ? "text-gray-300" : "text-gray-600")} style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <CtaButton dark={!!dark} elementStyles={elementStyles} />
      </div>
    </section>
  );
}

function FAQMinimal({ heading, highlight, subheading, items, dark, elementStyles }: Omit<FAQSectionProps, "variant">) {
  const { openContactModal } = useModal();
  const hasSectionBg = !!elementStyles?._sectionBg;

  return (
    <section className={cn("py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8", !hasSectionBg && (dark ? "bg-secondary" : "bg-white"))}>
      <div className="max-w-[900px] mx-auto">
        <div className="mb-12">
          <h2
            className={cn("text-3xl @min-[768px]:text-4xl font-bold mb-4", dark ? "text-white" : "text-gray-900")}
            style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
          >
            {heading}{" "}
            <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>
              {highlight}
            </span>
          </h2>
          <div className="w-24 h-1 bg-primary rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
          {subheading && (
            <p className={cn("mt-4 text-base @min-[768px]:text-lg", dark ? "text-gray-400" : "text-gray-600")} style={elementStyles?.subheadingColor ? { color: elementStyles.subheadingColor } : undefined}>
              {subheading}
            </p>
          )}
        </div>

        <div className={cn("divide-y", dark ? "divide-white/10" : "divide-slate-200")}>
          {items.map((item, idx) => (
            <div key={item.id || `faq-${idx}`} className="py-8">
              <h3 className={cn("text-base @min-[768px]:text-lg font-bold mb-3 break-words", dark ? "text-white" : "text-secondary")} style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}>
                {item.question}
              </h3>
              <p className={cn("leading-relaxed", dark ? "text-gray-300" : "text-gray-600")} style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}>
                {item.answer}
              </p>
            </div>
          ))}
        </div>

        <div className={cn("mt-12 pt-8 border-t", dark ? "border-white/10" : "border-slate-200")}>
          <button
            onClick={openContactModal}
            className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors group cursor-pointer"
            style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}
          >
            Still have questions? Get in touch
            <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  heading,
  highlight,
  subheading,
  items = [],
  dark = false,
  variant = "grid",
  elementStyles,
}) => {
  const hasSectionBg = !!elementStyles?._sectionBg;
  if (variant === "accordion") return <FAQAccordion heading={heading} highlight={highlight} subheading={subheading} items={items} dark={dark} elementStyles={elementStyles} />;
  if (variant === "minimal") return <FAQMinimal heading={heading} highlight={highlight} subheading={subheading} items={items} dark={dark} elementStyles={elementStyles} />;

  return (
    <section className={cn("py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8", !hasSectionBg && (dark ? "bg-secondary" : "bg-white"))}>
      <div className="max-w-[1325px] mx-auto">
        <SectionHeader
          heading={heading}
          highlight={highlight}
          subheading={subheading || "Quick answers to our most common questions. For more detailed information, check out our blog resources."}
          dark={dark}
          elementStyles={elementStyles}
        />

        <div className="grid @min-[768px]:grid-cols-2 gap-x-12 gap-y-10">
          {items.map((item, idx) => (
            <div
              key={item.id || `faq-${idx}`}
              className={cn(
                "flex flex-col p-4 @min-[768px]:p-8 rounded-xl border transition-colors",
                dark ? "bg-white/5 border-white/10 hover:border-primary/30" : "bg-slate-50 border-slate-100 hover:border-primary/20",
              )}
              style={{ ...(elementStyles?.cardBg ? { backgroundColor: elementStyles.cardBg } : {}), ...(elementStyles?.cardBorder ? { borderColor: elementStyles.cardBorder } : {}) }}
            >
              <div className="flex items-start mb-4">
                <HelpCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-1" />
                <h3 className={cn("text-xl font-bold break-words", dark ? "text-white" : "text-secondary")} style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}>
                  {item.question}
                </h3>
              </div>
              <p
                className={cn("leading-relaxed mb-6 ml-6 @min-[768px]:ml-9 flex-grow", dark ? "text-gray-300" : "text-gray-600")}
                style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}
              >
                {item.answer}
              </p>
              {item.link && (
                <div className={cn("ml-6 @min-[768px]:ml-9 mt-auto pt-4 border-t", dark ? "border-white/10" : "border-slate-200")}>
                  <Link href={item.link || "/blog"} className="inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors group">
                    Read full article
                    <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>

        <CtaButton dark={dark} elementStyles={elementStyles} />
      </div>
    </section>
  );
};
