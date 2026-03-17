/**
 * Normalizes section props for export. Handles AI-generated {id, value} wrappers
 * and ensures consistent prop shape for section components.
 */

import type { SectionInstance } from "@/public/lib/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
function normalizeValue(val: any, _key?: string): any {
  if (val === null || val === undefined) return val;

  if (Array.isArray(val)) {
    if (val.length === 0) return val;
    const allSimpleWrapped = val.every(
      (item: unknown) =>
        item &&
        typeof item === "object" &&
        !Array.isArray(item) &&
        "value" in (item as object) &&
        Object.keys(item as object).filter((k) => k !== "id" && k !== "value").length === 0
    );
    if (allSimpleWrapped) {
      return val.map((item: { value?: unknown }) => String((item as { value?: unknown }).value ?? ""));
    }
    return val.map((item: unknown, idx: number) => {
      if (item && typeof item === "object" && !Array.isArray(item)) {
        const normalised = normalizeSectionProps((item as Record<string, unknown>) ?? {});
        if (!(normalised as Record<string, unknown>).id)
          (normalised as Record<string, unknown>).id = `auto-${_key || "item"}-${idx}`;
        return normalised;
      }
      return item;
    });
  }

  if (typeof val === "object" && !Array.isArray(val)) {
    const keys = Object.keys(val);
    if (
      keys.length <= 2 &&
      keys.includes("value") &&
      keys.every((k) => k === "id" || k === "value")
    ) {
      return String((val as { value?: unknown }).value ?? "");
    }
  }

  return val;
}

export function normalizeSectionProps(props: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(props)) {
    out[key] = normalizeValue(val, key);
  }
  return out;
}

/** Returns props ready to spread onto a section component (normalized + variant + elementStyles). */
export function getSectionProps(section: SectionInstance): Record<string, unknown> {
  const props = { ...normalizeSectionProps(section.props) };
  if (section.variant) (props as Record<string, unknown>).variant = section.variant;
  (props as Record<string, unknown>).elementStyles = {
    ...section.elementStyles,
    ...(section.styles?.backgroundColor && { _sectionBg: section.styles.backgroundColor }),
    ...(section.styles?.textColor && { _sectionText: section.styles.textColor }),
  };
  return props;
}
/* eslint-enable @typescript-eslint/no-explicit-any */
