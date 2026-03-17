# Public (Exportable) Code – Single Source of Truth

This folder is the **only** source for code shared between the admin portal and exported client sites. No duplicates – types, utils, and components live here.

## Structure

- **providers/** – Export-safe `ModalProvider` (navigates to `/contact`)
- **lib/types.ts** – Shared types: SectionStyles, SectionInstance, ContentBlock, PageLayout, FontConfig, etc.
- **lib/utils.ts** – `cn`, `unwrapText`, `normalizeContentBlocks`
- **lib/google-fonts.ts** – `getGoogleFontUrl`, `fontPairings`, `fontConfigFromPairing`
- **lib/directions.ts** – `directionsUrl` for DirectionalLinksSection
- **sections/** – All section components
- **mockup/** – Header, Footer, MobileBottomNav and variants

## Usage

- **Admin portal**: Imports from `@/public/lib/*` for shared code. `src/lib/types.ts` imports from here and adds admin-only types (Project, QuoteData, etc.).
- **Export**: Copies `src/public/*` to the client repo. No duplicate type definitions.
