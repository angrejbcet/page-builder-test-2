/**
 * Export-safe directions URL helper.
 * Builds Google Maps directions URL from origin to destination.
 * Used by DirectionalLinksSection – destination comes from section props (headerProps.address).
 */

export function directionsUrl(origin: string, destination: string): string {
  const originEnc = encodeURIComponent(origin);
  const destEnc = encodeURIComponent(destination);
  return `https://www.google.com/maps/dir/${originEnc}/${destEnc}`;
}
