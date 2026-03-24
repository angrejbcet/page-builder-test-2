"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useModal } from "@/providers/ModalProvider";

interface FAQ {
  question: string;
  answer: string;
}

export interface LocationFAQSectionProps {
  heading: string;
  highlight: string;
  faqs: FAQ[];
  dark?: boolean;
  variant?: "grid" | "accordion" | "list" | string;
  elementStyles?: Record<string, string>;
}

/* ── Accordion Variant ────────────────────────────────────────────── */

type FAQVariantProps = Omit<LocationFAQSectionProps, "variant">;

const AccordionVariant: React.FC<FAQVariantProps> = ({
  heading,
  highlight,
  faqs = [],
  dark = false,
  elementStyles,
}) => {
  const { openContactModal } = useModal();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (idx: number) =>
    setOpenIdx((prev) => (prev === idx ? null : idx));

  return (
    <section className={`py-20 px-4 @min-[768px]:px-8 ${dark ? "bg-secondary" : "bg-white"}`}>
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-14">
          <h2
            className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${
              dark ? "text-white" : "text-secondary"
            }`}
            style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
          >
            {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
        </div>

        <div className={`divide-y ${dark ? "divide-white/10" : "divide-slate-200"}`}>
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className={`w-full flex items-center justify-between gap-4 py-5 text-left transition-colors ${
                    dark ? "hover:text-primary" : "hover:text-primary"
                  }`}
                >
                  <span
                    className={`font-bold text-base @min-[768px]:text-lg ${
                      dark ? "text-white" : "text-secondary"
                    }`}
                    style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}
                  >
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-primary transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? "max-h-[500px] pb-5" : "max-h-0"
                  }`}
                >
                  <p
                    className={`text-base leading-relaxed ${
                      dark ? "text-gray-400" : "text-gray-600"
                    }`}
                    style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-14">
          <button
            onClick={openContactModal}
            className="inline-flex items-center px-8 py-3 bg-primary text-on-primary font-semibold rounded-md hover:bg-primary-dark transition-colors cursor-pointer"
          >
            Have More Questions? Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

/* ── List Variant ─────────────────────────────────────────────────── */

const FAQListVariant: React.FC<FAQVariantProps> = ({
  heading,
  highlight,
  faqs = [],
  dark = false,
  elementStyles,
}) => {
  const { openContactModal } = useModal();

  return (
    <section className={`py-20 px-4 @min-[768px]:px-8 ${dark ? "bg-secondary" : "bg-white"}`}>
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-14">
          <h2
            className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${
              dark ? "text-white" : "text-secondary"
            }`}
            style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
          >
            {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
        </div>

        <div className={`divide-y ${dark ? "divide-white/10" : "divide-slate-200"}`}>
          {faqs.map((faq, i) => (
            <div key={i} className="py-6">
              <h3
                className={`font-bold text-base @min-[768px]:text-lg mb-2 ${
                  dark ? "text-white" : "text-secondary"
                }`}
                style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}
              >
                {faq.question}
              </h3>
              <p
                className={`text-base leading-relaxed ${
                  dark ? "text-gray-400" : "text-gray-600"
                }`}
                style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <button
            onClick={openContactModal}
            className="inline-flex items-center px-8 py-3 bg-primary text-on-primary font-semibold rounded-md hover:bg-primary-dark transition-colors cursor-pointer"
          >
            Have More Questions? Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

/* ── Main Component ──────────────────────────────────────────────── */

export const LocationFAQSection: React.FC<LocationFAQSectionProps> = ({
  heading,
  highlight,
  faqs = [],
  dark = false,
  variant = "grid",
  elementStyles,
}) => {
  const { openContactModal } = useModal();

  if (faqs.length === 0) return null;

  if (variant === "accordion")
    return <AccordionVariant heading={heading} highlight={highlight} faqs={faqs} dark={dark} elementStyles={elementStyles} />;
  if (variant === "list")
    return <FAQListVariant heading={heading} highlight={highlight} faqs={faqs} dark={dark} elementStyles={elementStyles} />;

  return (
    <section className={`py-20 px-4 @min-[768px]:px-8 ${dark ? "bg-secondary" : "bg-white"}`}>
      <div className="max-w-[1325px] mx-auto">
        <div className="text-center mb-14">
          <h2 className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${dark ? "text-white" : "text-secondary"}`} style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
            {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
        </div>

        <div className="grid @min-[768px]:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`p-4 @min-[768px]:p-6 rounded-xl border ${
                dark
                  ? "bg-white/5 border-white/10"
                  : "bg-slate-50 border-slate-100"
              }`}
              style={{ ...(elementStyles?.cardBg ? { backgroundColor: elementStyles.cardBg } : {}), ...(elementStyles?.cardBorder ? { borderColor: elementStyles.cardBorder } : {}) }}
            >
              <div className="flex items-start gap-3 mb-3">
                <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <h3 className={`font-bold text-base @min-[768px]:text-lg break-words ${dark ? "text-white" : "text-secondary"}`} style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}>
                  {faq.question}
                </h3>
              </div>
              <p className={`text-base leading-relaxed ml-0 @min-[768px]:ml-8 ${dark ? "text-gray-400" : "text-gray-600"}`} style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <button
            onClick={openContactModal}
            className="inline-flex items-center px-8 py-3 bg-primary text-on-primary font-semibold rounded-md hover:bg-primary-dark transition-colors cursor-pointer"
          >
            Have More Questions? Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};
