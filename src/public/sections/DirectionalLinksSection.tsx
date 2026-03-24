"use client";

import React, { useState } from "react";
import { ExternalLink, Navigation, ChevronDown } from "lucide-react";
import type { DirectionalLinkGroup } from "@/lib/types";
import { directionsUrl } from "@/public/lib/directions";

export interface DirectionalLinksSectionProps {
  groups: DirectionalLinkGroup[];
  cityName: string;
  /** Business address for directions destination. Injected from headerProps in export. */
  destinationAddress?: string;
  heading?: string;
  highlight?: string;
  dark?: boolean;
  variant?: "grid" | "accordion" | "inline" | string;
}

type DirectionalLinksVariantProps = Omit<DirectionalLinksSectionProps, "variant">;

function buildDirectionsHref(link: { name: string; address?: string }, cityName: string, destinationAddress?: string): string {
  const origin = `${link.address || link.name}, ${cityName}`;
  const dest = destinationAddress || `${cityName}`;
  return directionsUrl(origin, dest);
}

const AccordionVariant: React.FC<DirectionalLinksVariantProps> = ({
  groups,
  cityName,
  heading = "Directions from",
  highlight,
  dark = false,
  destinationAddress,
}) => {
  const displayHighlight = highlight || cityName;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className={`py-20 px-4 @min-[768px]:px-8 ${dark ? "bg-secondary" : "bg-white"}`}>
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-14">
          <h2 className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${dark ? "text-white" : "text-secondary"}`}>
            {heading} <span className="text-primary">{displayHighlight}</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className={`max-w-2xl mx-auto text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>
            Find driving directions to our office from popular landmarks, neighborhoods,
            and points of interest in {cityName}.
          </p>
        </div>

        <div className="space-y-3">
          {groups.map((group, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={group.heading}
                className={`rounded-xl overflow-hidden transition-colors ${
                  dark ? "bg-white/5 border border-white/10" : "bg-slate-50 border border-slate-100"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className={`w-full flex items-center justify-between gap-3 px-6 py-4 text-left transition-colors ${
                    dark ? "hover:bg-white/10" : "hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Navigation className="w-5 h-5 text-primary flex-shrink-0" />
                    <h3 className={`text-lg font-bold ${dark ? "text-white" : "text-secondary"}`}>
                      {group.heading}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    } ${dark ? "text-gray-400" : "text-gray-500"}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <ul className="space-y-2">
                      {group.links.map((link) => (
                        <li key={link.name}>
                          <a
                            href={buildDirectionsHref(link, cityName, destinationAddress)}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Get driving directions from ${link.name} to ${cityName}`}
                            className={`inline-flex items-center gap-2 text-sm py-1.5 transition-colors ${
                              dark
                                ? "text-gray-400 hover:text-primary"
                                : "text-gray-600 hover:text-primary"
                            }`}
                          >
                            <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                            Directions from {link.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const InlineVariant: React.FC<DirectionalLinksVariantProps> = ({
  groups,
  cityName,
  heading = "Directions from",
  highlight,
  dark = false,
  destinationAddress,
}) => {
  const displayHighlight = highlight || cityName;

  return (
    <section className={`py-20 px-4 @min-[768px]:px-8 ${dark ? "bg-secondary" : "bg-white"}`}>
      <div className="max-w-[1325px] mx-auto">
        <div className="text-center mb-14">
          <h2 className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${dark ? "text-white" : "text-secondary"}`}>
            {heading} <span className="text-primary">{displayHighlight}</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className={`max-w-2xl mx-auto text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>
            Find driving directions to our office from popular landmarks, neighborhoods,
            and points of interest in {cityName}.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 @min-[768px]:gap-3 justify-center">
          {groups.map((group) =>
            group.links.map((link) => (
              <a
                key={`${group.heading}-${link.name}`}
                href={buildDirectionsHref(link, cityName, destinationAddress)}
                target="_blank"
                rel="noopener noreferrer"
                title={`Get driving directions from ${link.name} to ${cityName}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                  dark
                    ? "bg-white/5 text-gray-300 border-white/10 hover:bg-primary hover:text-white hover:border-primary"
                    : "bg-white text-gray-600 border-slate-200 hover:bg-primary hover:text-white hover:border-primary"
                }`}
              >
                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                {link.name}
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export const DirectionalLinksSection: React.FC<DirectionalLinksSectionProps> = ({
  groups,
  cityName,
  heading = "Directions from",
  highlight,
  dark = false,
  variant = "grid",
  destinationAddress,
}) => {
  const displayHighlight = highlight || cityName;
  const variantProps = { groups, cityName, heading, highlight, dark, destinationAddress };

  if (variant === "accordion") return <AccordionVariant {...variantProps} />;
  if (variant === "inline") return <InlineVariant {...variantProps} />;

  return (
    <section className={`py-20 px-4 @min-[768px]:px-8 ${dark ? "bg-secondary" : "bg-white"}`}>
      <div className="max-w-[1325px] mx-auto">
        <div className="text-center mb-14">
          <h2 className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${dark ? "text-white" : "text-secondary"}`}>
            {heading} <span className="text-primary">{displayHighlight}</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className={`max-w-2xl mx-auto text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>
            Find driving directions to our office from popular landmarks, neighborhoods,
            and points of interest in {cityName}.
          </p>
        </div>

        <div className="grid @min-[768px]:grid-cols-2 @min-[1024px]:grid-cols-3 gap-8">
          {groups.map((group) => (
            <div
              key={group.heading}
              className={`rounded-xl p-6 ${dark ? "bg-white/5 border border-white/10" : "bg-slate-50 border border-slate-100"}`}
            >
              <div className="flex items-center gap-3 mb-5">
                <Navigation className="w-5 h-5 text-primary" />
                <h3 className={`text-lg font-bold ${dark ? "text-white" : "text-secondary"}`}>
                  {group.heading}
                </h3>
              </div>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={buildDirectionsHref(link, cityName, destinationAddress)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Get driving directions from ${link.name} to ${cityName}`}
                      className={`inline-flex items-center gap-2 text-sm py-1.5 transition-colors ${
                        dark
                          ? "text-gray-400 hover:text-primary"
                          : "text-gray-600 hover:text-primary"
                      }`}
                    >
                      <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                      Directions from {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
