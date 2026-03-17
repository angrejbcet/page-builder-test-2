/**
 * Public types – used by exported client sites.
 * Minimal subset of @/lib/types needed for sections, mockup, PageRenderer.
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

/** For DirectionalLinksSection – export-safe, no portal content deps */
export interface DirectionalLink {
  name: string;
  address?: string;
}

export interface DirectionalLinkGroup {
  heading: string;
  links: DirectionalLink[];
}

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
}
