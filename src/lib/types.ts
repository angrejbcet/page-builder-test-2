/**
 * Canonical shared types for exported client sites and anything that must match them
 * (mockup headers, sections, PageRenderer). Admin code should import these via
 * `@/lib/types`, which re-exports from here — do not redefine the same shapes in
 * `src/lib/types.ts`.
 */

export interface SectionStyles {
  backgroundColor?: string;
  textColor?: string;
  backgroundImage?: string;
  backgroundOverlay?: string;
  backgroundOverlayOpacity?: number;
}

export interface SectionInstance {
  id: string;
  sectionId: string;
  variant?: string;
  props: Record<string, unknown>;
  styles?: SectionStyles;
  elementStyles?: Record<string, string>;
}

export type ContentBlockType = "paragraph" | "bulletList" | "numberedList";

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: string;
}

export interface FontConfig {
  headingFamily: string;
  bodyFamily: string;
  headingWeight?: string;
  bodyWeight?: string;
  headingScale?: number;
}

export interface CustomTheme {
  primary: string;
  primaryDark: string;
  secondary: string;
  accent: string;
}

export type HeaderVariant = "classic" | "centered" | "minimal" | "bold";
export type FooterVariant = "fourColumn" | "centered" | "twoRow" | "minimal";

export interface PageLayout {
  sections: SectionInstance[];
  theme?: string;
  customTheme?: CustomTheme;
  fonts?: FontConfig;
  headerProps?: Record<string, unknown>;
  footerProps?: Record<string, unknown>;
}

/** Header / mobile nav — matches builder `NavLink` shape for mockup components */
export interface MegaMenuColumn {
  title?: string;
  links: { label: string; href: string; description?: string; image?: string }[];
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
  megaMenu?: boolean;
  columns?: MegaMenuColumn[];
}

/** For DirectionalLinksSection – export-safe, no portal content deps */
export interface DirectionalLink {
  name: string;
  address?: string;
}

export interface DirectionalLinkGroup {
  heading: string;
  links: DirectionalLink[];
}

/** SEO fields (snake_case) — matches exported content and metadata helpers */
export interface PageSEO {
  meta_title?: string | null;
  meta_description?: string | null;
  og_image?: string | null;
  canonical_url?: string | null;
  schema_type?: string | null;
}

/**
 * Serializable subset of Next.js `Metadata` — written as `*PageMetadata` / `post.metadata`
 * and assigned to `export const metadata` in route files.
 */
export interface SerializablePageMetadata {
  title: string;
  description: string;
  openGraph?: {
    title: string;
    description: string;
    images?: string[];
  };
  alternates?: {
    canonical: string;
  };
}

/** Page body only — no SEO (see *PageMetadata and *PageJsonLd in the same file). */
export interface StaticPageData {
  title: string;
  slug: string;
  pageType?: string;
  sections: SectionInstance[];
}

/** Blog post body + precomputed route metadata + JSON-LD */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage: string;
  author?: string;
  categories?: string[];
  tags?: string[];
  content?: string;
  metadata: SerializablePageMetadata;
  jsonLd?: Record<string, unknown> | null;
}
