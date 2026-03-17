import React, { lazy, Suspense } from "react";
import type { FooterVariant } from "@/public/lib/types";

export interface MockupFooterProps {
  businessName: string;
  highlightWord?: string;
  logoUrl?: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  quickLinks?: { label: string; href: string }[];
  serviceLinks?: { label: string; href: string }[];
  locationLinks?: { label: string; href: string }[];
  copyrightName?: string;
  variant?: FooterVariant | string;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type AnyComponent = React.ComponentType<any>;

const variants: Record<string, React.LazyExoticComponent<AnyComponent>> = {
  fourColumn: lazy(() => import("./footers/FooterFourColumn").then((m) => ({ default: m.FooterFourColumn as AnyComponent }))),
  centered: lazy(() => import("./footers/FooterCentered").then((m) => ({ default: m.FooterCentered as AnyComponent }))),
  twoRow: lazy(() => import("./footers/FooterTwoRow").then((m) => ({ default: m.FooterTwoRow as AnyComponent }))),
  minimal: lazy(() => import("./footers/FooterMinimal").then((m) => ({ default: m.FooterMinimal as AnyComponent }))),
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export function MockupFooter(props: MockupFooterProps) {
  const variantKey = props.variant || "fourColumn";
  const Component = variants[variantKey] || variants.fourColumn;

  return (
    <Suspense fallback={<div className="h-16 bg-secondary" />}>
      <Component {...props} />
    </Suspense>
  );
}
