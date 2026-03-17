import type { FontConfig } from "./types";

export interface FontPairing {
  id: string;
  label: string;
  heading: string;
  body: string;
  category: "serif" | "sans-serif" | "mixed";
}

export const fontPairings: FontPairing[] = [
  { id: "montserrat-opensans", label: "Montserrat + Open Sans", heading: "Montserrat", body: "Open Sans", category: "sans-serif" },
  { id: "playfair-sourcesans", label: "Playfair Display + Source Sans 3", heading: "Playfair Display", body: "Source Sans 3", category: "mixed" },
  { id: "lora-roboto", label: "Lora + Roboto", heading: "Lora", body: "Roboto", category: "mixed" },
  { id: "raleway-opensans", label: "Raleway + Open Sans", heading: "Raleway", body: "Open Sans", category: "sans-serif" },
  { id: "poppins-inter", label: "Poppins + Inter", heading: "Poppins", body: "Inter", category: "sans-serif" },
  { id: "oswald-lato", label: "Oswald + Lato", heading: "Oswald", body: "Lato", category: "sans-serif" },
  { id: "merriweather-opensans", label: "Merriweather + Open Sans", heading: "Merriweather", body: "Open Sans", category: "mixed" },
  { id: "dmserif-dmsans", label: "DM Serif Display + DM Sans", heading: "DM Serif Display", body: "DM Sans", category: "mixed" },
  { id: "cormorant-proza", label: "Cormorant Garamond + Proza Libre", heading: "Cormorant Garamond", body: "Proza Libre", category: "mixed" },
  { id: "inter-inter", label: "Inter (Heading + Body)", heading: "Inter", body: "Inter", category: "sans-serif" },
  { id: "bebas-roboto", label: "Bebas Neue + Roboto", heading: "Bebas Neue", body: "Roboto", category: "sans-serif" },
  { id: "cabin-cabin", label: "Cabin (Heading + Body)", heading: "Cabin", body: "Cabin", category: "sans-serif" },
  { id: "roboto-slab-roboto", label: "Roboto Slab + Roboto", heading: "Roboto Slab", body: "Roboto", category: "mixed" },
  { id: "josefin-work", label: "Josefin Sans + Work Sans", heading: "Josefin Sans", body: "Work Sans", category: "sans-serif" },
  { id: "crimson-work", label: "Crimson Text + Work Sans", heading: "Crimson Text", body: "Work Sans", category: "mixed" },
  { id: "nunito-nunito", label: "Nunito (Heading + Body)", heading: "Nunito", body: "Nunito", category: "sans-serif" },
  { id: "libre-libre", label: "Libre Baskerville + Libre Franklin", heading: "Libre Baskerville", body: "Libre Franklin", category: "mixed" },
  { id: "archivo-roboto", label: "Archivo Black + Roboto", heading: "Archivo Black", body: "Roboto", category: "sans-serif" },
  { id: "quicksand-opensans", label: "Quicksand + Open Sans", heading: "Quicksand", body: "Open Sans", category: "sans-serif" },
  { id: "bitter-sourcesans", label: "Bitter + Source Sans 3", heading: "Bitter", body: "Source Sans 3", category: "mixed" },
];

export function getGoogleFontUrl(config: FontConfig): string {
  const families = new Set([config.headingFamily, config.bodyFamily]);
  const params = Array.from(families)
    .map(
      (f) =>
        `family=${encodeURIComponent(f)}:wght@300;400;500;600;700;800;900`,
    )
    .join("&");
  return `https://fonts.googleapis.com/css2?${params}&display=swap`;
}

export function fontConfigFromPairing(pairing: FontPairing): FontConfig {
  return {
    headingFamily: pairing.heading,
    bodyFamily: pairing.body,
    headingWeight: "700",
    bodyWeight: "400",
  };
}
