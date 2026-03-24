"use client";

import React from "react";
import { Phone, ArrowRight } from "lucide-react";
import { useModal } from "@/providers/ModalProvider";

export interface FinalCTASectionProps {
  heading: string;
  description: string;
  cta1Text: string;
  cta1Link: string;
  cta2Text?: string;
  cta2Link?: string;
  cta3Text?: string;
  cta3Link?: string;
  dark?: boolean;
  backgroundImage?: string;
  variant?: "brand" | "dark" | "image" | string;
  elementStyles?: Record<string, string>;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({
  heading,
  description,
  cta1Text,
  cta1Link = "/contact",
  cta2Text,
  cta2Link,
  cta3Text,
  cta3Link,
  backgroundImage,
  variant = "brand",
  elementStyles,
}) => {
  const { openContactModal } = useModal();

  const renderButton = (
    text: string,
    link: string,
    style: "primary" | "secondary" | "outline",
    inlineStyle?: React.CSSProperties,
  ) => {
    const base =
      "inline-flex items-center justify-center gap-2 font-bold rounded-md transition-all text-sm @min-[640px]:text-base @min-[768px]:text-lg px-4 py-3 @min-[768px]:px-8 @min-[768px]:py-4";

    const isDark = variant === "dark";
    const styles = {
      primary: isDark
        ? `${base} bg-primary text-on-primary hover:bg-primary-dark shadow-lg`
        : `${base} bg-white text-primary hover:bg-gray-100 shadow-lg`,
      secondary: `${base} bg-black/30 text-white border-2 border-white/40 hover:bg-black/50`,
      outline: `${base} bg-transparent text-white border-2 border-white/30 hover:border-white/60`,
    };

    const isPhone = link.startsWith("tel:");
    const isContact = link === "/contact";

    if (isContact) {
      return (
        <button onClick={openContactModal} className={`${styles[style]} cursor-pointer`} style={inlineStyle}>
          {isPhone && <Phone className="w-5 h-5" />}
          {text}
          {!isPhone && <ArrowRight className="w-5 h-5" />}
        </button>
      );
    }

    return (
      <a href={link} className={styles[style]} style={inlineStyle}>
        {isPhone && <Phone className="w-5 h-5" />}
        {text}
        {!isPhone && <ArrowRight className="w-5 h-5" />}
      </a>
    );
  };

  const bgClass = variant === "dark"
    ? "bg-secondary"
    : variant === "image"
      ? "bg-secondary relative overflow-hidden"
      : "bg-primary";

  return (
    <section className={`${bgClass} py-12 @min-[768px]:py-16 @min-[1024px]:py-20 px-4 @min-[768px]:px-8`}>
      {variant === "image" && (
        <>
          {backgroundImage && (backgroundImage.startsWith("http") || backgroundImage.startsWith("data:")) && (
            <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-secondary/90" />
        </>
      )}
      <div className="relative max-w-[900px] mx-auto text-center text-white">
        <h2 className="text-2xl @min-[640px]:text-3xl @min-[768px]:text-4xl @min-[1024px]:text-5xl font-extrabold mb-6 leading-tight" style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
          {heading}
        </h2>
        <p className="text-base @min-[768px]:text-lg @min-[1024px]:text-xl text-white/90 mb-6 @min-[768px]:mb-10 max-w-2xl mx-auto leading-relaxed" style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
          {description}
        </p>
        <div className="flex flex-col @min-[640px]:flex-row items-center justify-center gap-4">
          {renderButton(cta1Text, cta1Link, "primary", elementStyles?.ctaBg || elementStyles?.ctaText ? { ...(elementStyles.ctaBg && { backgroundColor: elementStyles.ctaBg }), ...(elementStyles.ctaText && { color: elementStyles.ctaText }) } : undefined)}
          {cta2Text && cta2Link && renderButton(cta2Text, cta2Link, "secondary", elementStyles?.cta2Bg || elementStyles?.cta2Text ? { ...(elementStyles.cta2Bg && { backgroundColor: elementStyles.cta2Bg }), ...(elementStyles.cta2Text && { color: elementStyles.cta2Text }) } : undefined)}
          {cta3Text && cta3Link && renderButton(cta3Text, cta3Link, "outline", elementStyles?.cta3Bg || elementStyles?.cta3Text ? { ...(elementStyles.cta3Bg && { backgroundColor: elementStyles.cta3Bg }), ...(elementStyles.cta3Text && { color: elementStyles.cta3Text }) } : undefined)}
        </div>
      </div>
    </section>
  );
};
