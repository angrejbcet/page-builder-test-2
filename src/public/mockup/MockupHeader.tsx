"use client";

import React, { lazy, Suspense } from "react";
import type { HeaderVariant } from "@/lib/types";
import type { NavLink } from "@/lib/types";

export interface MockupHeaderProps {
  businessName: string;
  highlightWord?: string;
  logoUrl?: string;
  phone?: string;
  address?: string;
  navLinks?: NavLink[];
  ctaText?: string;
  ctaLink?: string;
  socialLinks?: { platform: string; href: string }[];
  variant?: HeaderVariant | string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyComponent = React.ComponentType<any>;

const variants: Record<string, React.LazyExoticComponent<AnyComponent>> = {
  classic: lazy(() => import("./headers/HeaderClassic").then((m) => ({ default: m.HeaderClassic as AnyComponent }))),
  centered: lazy(() => import("./headers/HeaderCentered").then((m) => ({ default: m.HeaderCentered as AnyComponent }))),
  minimal: lazy(() => import("./headers/HeaderMinimal").then((m) => ({ default: m.HeaderMinimal as AnyComponent }))),
  bold: lazy(() => import("./headers/HeaderBold").then((m) => ({ default: m.HeaderBold as AnyComponent }))),
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export function MockupHeader(props: MockupHeaderProps) {
  const variantKey = props.variant || "classic";
  const Component = variants[variantKey] || variants.classic;

  return (
    <Suspense fallback={<div className="h-20 bg-white" />}>
      <Component {...props} />
    </Suspense>
  );
}
