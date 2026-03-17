"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, MapPin } from "lucide-react";
import { cn } from "@/public/lib/utils";

interface ServiceAreaCityLink {
  label: string;
  href: string;
}

interface ServiceAreaAccordionItem {
  id: string;
  city: string;
  details: string;
  neighborhoods?: string | string[];
  links: ServiceAreaCityLink[];
}

export interface ServiceAreaAccordionProps {
  heading: string;
  highlight: string;
  description: string;
  items: ServiceAreaAccordionItem[];
  variant?: "centered" | "leftAligned" | "bordered" | string;
  dark?: boolean;
  elementStyles?: Record<string, string>;
}

function AccordionLinks({ links, dark }: { links: ServiceAreaCityLink[]; dark: boolean }) {
  if (!Array.isArray(links) || links.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link, idx) => (
        <Link
          key={idx}
          href={link.href || "#"}
          className={cn(
            "inline-block text-sm font-medium px-4 py-2 rounded transition-colors",
            dark
              ? "bg-white/10 text-gray-300 hover:bg-primary/20 hover:text-primary"
              : "bg-slate-100 hover:bg-primary/10 hover:text-primary text-slate-700"
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

function parseNeighborhoods(raw: string | string[] | undefined): string[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw.filter(Boolean);
  return raw.split(",").map((n) => n.trim()).filter(Boolean);
}

function NeighborhoodTags({ neighborhoods, dark }: { neighborhoods: string | string[] | undefined; dark: boolean }) {
  const parsed = parseNeighborhoods(neighborhoods);
  if (parsed.length === 0) return null;
  return (
    <div className="mt-4">
      <p className={cn("text-xs font-semibold uppercase tracking-wider mb-2", dark ? "text-gray-400" : "text-gray-500")}>
        Neighborhoods
      </p>
      <div className="flex flex-wrap gap-2">
        {parsed.map((n, idx) => (
          <span
            key={idx}
            className={cn(
              "inline-block text-xs px-3 py-1 rounded-full",
              dark ? "bg-white/10 text-gray-300" : "bg-slate-100 text-slate-600"
            )}
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Left-Aligned Variant ─────────────────────────────────────────── */

function LeftAlignedVariant({
  heading,
  highlight,
  description,
  items,
  dark,
  elementStyles,
}: Omit<ServiceAreaAccordionProps, "variant">) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || "auto-item-0");
  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <section className={cn("py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8", dark ? "bg-secondary" : "bg-white")}>
      <div className="max-w-[900px] mx-auto">
        <div className="mb-16">
          <h2 className={cn("text-3xl @min-[768px]:text-4xl font-bold mb-4", dark ? "text-white" : "text-gray-900")} style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
            {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
          </h2>
          <div className="w-24 h-1 bg-primary rounded-full mb-6" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
          <p className={cn("text-base @min-[768px]:text-lg leading-relaxed max-w-2xl", dark ? "text-gray-300" : "text-gray-600")} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
            {description}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={cn(
                  "border rounded-xl transition-all duration-300 overflow-hidden",
                  isOpen
                    ? cn("border-primary/30 shadow-md", dark ? "bg-white/10" : "bg-white")
                    : dark
                      ? "border-white/10 bg-white/5 hover:border-white/20"
                      : "border-slate-200 bg-white hover:border-slate-300"
                )}
              >
                <button
                  className="w-full px-4 py-4 @min-[768px]:px-6 @min-[768px]:py-5 flex items-center justify-between focus:outline-none"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center text-left">
                    <MapPin className={cn("w-5 h-5 mr-3 transition-colors", isOpen ? "text-primary" : "text-gray-400")} />
                    <span className={cn(
                      "text-xl font-bold transition-colors break-words min-w-0",
                      isOpen ? "text-primary" : dark ? "text-white" : "text-gray-900"
                    )}>
                      {item.city}
                    </span>
                  </div>
                  <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", isOpen ? "rotate-180 text-primary" : "text-gray-400")} />
                </button>
                  <div className={cn("transition-all duration-300 ease-in-out", isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0")}>
                  <div className="px-6 pb-6 pt-2">
                    <div className={cn("pl-4 @min-[768px]:pl-8 border-l-2 ml-2", dark ? "border-white/10" : "border-slate-100")}>
                      <p className={cn("mb-6 leading-relaxed", dark ? "text-gray-300" : "text-gray-600")} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>{item.details}</p>
                      <AccordionLinks links={item.links} dark={!!dark} />
                      <NeighborhoodTags neighborhoods={item.neighborhoods} dark={!!dark} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Bordered Variant ─────────────────────────────────────────────── */

function BorderedVariant({
  heading,
  highlight,
  description,
  items,
  dark,
  elementStyles,
}: Omit<ServiceAreaAccordionProps, "variant">) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || "auto-item-0");
  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <section className={cn("py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8", dark ? "bg-secondary" : "bg-slate-50")}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={cn("text-3xl @min-[768px]:text-4xl font-bold mb-4", dark ? "text-white" : "text-gray-900")} style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
            {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
          <p className={cn("text-base @min-[768px]:text-lg leading-relaxed max-w-2xl mx-auto", dark ? "text-gray-300" : "text-gray-600")} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
            {description}
          </p>
        </div>

        <div className="space-y-3">
          {items.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={cn(
                  "rounded-xl transition-all duration-300 overflow-hidden border-2",
                  isOpen
                    ? cn("border-primary/40 shadow-lg", dark ? "bg-white/10" : "bg-white")
                    : dark
                      ? "border-white/10 bg-white/5 hover:border-white/20"
                      : "border-slate-200 bg-white hover:border-slate-300"
                )}
              >
                <button
                  className="w-full px-4 py-4 @min-[768px]:px-6 @min-[768px]:py-5 flex items-center justify-between focus:outline-none"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center text-left">
                    <MapPin className={cn("w-5 h-5 mr-3 transition-colors", isOpen ? "text-primary" : "text-gray-400")} />
                    <span className={cn(
                      "text-xl font-bold transition-colors break-words min-w-0",
                      isOpen ? "text-primary" : dark ? "text-white" : "text-gray-900"
                    )}>
                      {item.city}
                    </span>
                  </div>
                  <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", isOpen ? "rotate-180 text-primary" : "text-gray-400")} />
                </button>
                <div className={cn("transition-all duration-300 ease-in-out", isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0")}>
                  <div className="px-6 pb-6 pt-2">
                    <div className={cn("pl-4 @min-[768px]:pl-8 border-l-2 ml-2", dark ? "border-primary/30" : "border-primary/20")}>
                      <p className={cn("mb-6 leading-relaxed", dark ? "text-gray-300" : "text-gray-600")} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>{item.details}</p>
                      <AccordionLinks links={item.links} dark={!!dark} />
                      <NeighborhoodTags neighborhoods={item.neighborhoods} dark={!!dark} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Main Export (default: centered) ──────────────────────────────── */

export const ServiceAreaAccordionSection: React.FC<ServiceAreaAccordionProps> = ({
  heading,
  highlight,
  description,
  items = [],
  variant = "centered",
  dark = false,
  elementStyles,
}) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || "auto-item-0");

  if (variant === "leftAligned") return <LeftAlignedVariant heading={heading} highlight={highlight} description={description} items={items} dark={dark} elementStyles={elementStyles} />;
  if (variant === "bordered") return <BorderedVariant heading={heading} highlight={highlight} description={description} items={items} dark={dark} elementStyles={elementStyles} />;

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className={cn("py-12 @min-[768px]:py-24 px-4 @min-[768px]:px-8", dark ? "bg-secondary" : "bg-slate-50")}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={cn("text-3xl @min-[768px]:text-4xl font-bold mb-4", dark ? "text-white" : "text-gray-900")} style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
            {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
          <p className={cn("text-base @min-[768px]:text-lg leading-relaxed max-w-2xl mx-auto", dark ? "text-gray-300" : "text-gray-600")} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
            {description}
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={cn(
                  "border rounded-xl transition-all duration-300 overflow-hidden",
                  isOpen
                    ? cn("border-primary/30 shadow-md", dark ? "bg-white/10" : "bg-white")
                    : dark
                      ? "border-white/10 bg-white/5 hover:border-white/20"
                      : "border-slate-200 bg-white hover:border-slate-300"
                )}
              >
                <button
                  className="w-full px-4 py-4 @min-[768px]:px-6 @min-[768px]:py-5 flex items-center justify-between focus:outline-none"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center text-left">
                    <MapPin className={cn(
                      "w-5 h-5 mr-3 transition-colors",
                      isOpen ? "text-primary" : "text-gray-400"
                    )} />
                    <span className={cn(
                      "text-xl font-bold transition-colors break-words min-w-0",
                      isOpen ? "text-primary" : dark ? "text-white" : "text-gray-900"
                    )}>
                      {item.city}
                    </span>
                  </div>
                  <ChevronDown className={cn(
                    "w-5 h-5 transition-transform duration-300",
                    isOpen ? "rotate-180 text-primary" : "text-gray-400"
                  )} />
                </button>

                <div
                  className={cn(
                    "transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-6 pb-6 pt-2">
                    <div className={cn("pl-4 @min-[768px]:pl-8 border-l-2 ml-2", dark ? "border-white/10" : "border-slate-100")}>
                      <p className={cn("mb-6 leading-relaxed", dark ? "text-gray-300" : "text-gray-600")} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
                        {item.details}
                      </p>
                      <AccordionLinks links={item.links} dark={dark} />
                      <NeighborhoodTags neighborhoods={item.neighborhoods} dark={dark} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
