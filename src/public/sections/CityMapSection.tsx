"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MapPin } from "lucide-react";
import { APIProvider, Map, AdvancedMarker, Pin, useMapsLibrary } from "@vis.gl/react-google-maps";
import { cn } from "@/public/lib/utils";

function GeocodedCityMap({
  cityName,
  fallback,
  zoom,
}: {
  cityName: string;
  fallback: { lat: number; lng: number };
  zoom: number;
}) {
  const geocodingLib = useMapsLibrary("geocoding");
  const [center, setCenter] = useState(fallback);

  const geocode = useCallback(
    (query: string) => {
      if (!geocodingLib || !query) return;
      const geocoder = new geocodingLib.Geocoder();
      geocoder.geocode({ address: query }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          const loc = results[0].geometry.location;
          setCenter({ lat: loc.lat(), lng: loc.lng() });
        }
      });
    },
    [geocodingLib],
  );

  useEffect(() => {
    if (cityName) geocode(cityName);
  }, [cityName, geocode]);

  return (
    <Map
      mapId={`city-map-${cityName.toLowerCase().replace(/\s/g, "-")}`}
      defaultZoom={zoom}
      center={center}
      zoom={zoom}
      gestureHandling="cooperative"
      disableDefaultUI={false}
      style={{ width: "100%", height: "100%" }}
    >
      <AdvancedMarker position={center}>
        <Pin background="#ea6a61" borderColor="#000000" glyphColor="#000000" />
      </AdvancedMarker>
    </Map>
  );
}

interface CityMapSectionProps {
  cityName: string;
  coordinates: { lat: number; lng: number };
  zipCodes: string[];
  latitude?: number;
  longitude?: number;
  zoom?: number;
  variant?: "split" | "stacked" | "fullMap" | string;
  dark?: boolean;
  elementStyles?: Record<string, string>;
}

/* ── Shared helpers ───────────────────────────────────────────────── */

function resolveCityMapConfig(props: Pick<CityMapSectionProps, "coordinates" | "latitude" | "longitude" | "zoom">) {
  const hasManualOverride = !!(props.latitude && props.longitude);
  const manualPosition = hasManualOverride ? { lat: props.latitude!, lng: props.longitude! } : null;
  const mapZoom = props.zoom || 13;
  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  return { hasManualOverride, manualPosition, mapZoom, mapApiKey };
}

function CityMapContent({
  mapApiKey,
  hasManualOverride,
  manualPosition,
  fallbackPosition,
  mapZoom,
  cityName,
}: {
  mapApiKey: string;
  hasManualOverride: boolean;
  manualPosition: { lat: number; lng: number } | null;
  fallbackPosition: { lat: number; lng: number };
  mapZoom: number;
  cityName: string;
}) {
  if (!mapApiKey) {
    return (
      <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-500">
        <MapPin className="w-16 h-16 mb-4 text-slate-600" />
        <span className="text-xl font-medium tracking-widest uppercase">
          {cityName} Map
        </span>
        <span className="text-sm mt-2">Requires Google Maps API Key</span>
      </div>
    );
  }

  return (
    <APIProvider apiKey={mapApiKey}>
      {hasManualOverride ? (
        <Map
          mapId={`city-map-${cityName.toLowerCase().replace(/\s/g, "-")}`}
          defaultZoom={mapZoom}
          defaultCenter={manualPosition!}
          gestureHandling="cooperative"
          disableDefaultUI={false}
          style={{ width: "100%", height: "100%" }}
        >
          <AdvancedMarker position={manualPosition!}>
            <Pin background="#ea6a61" borderColor="#000000" glyphColor="#000000" />
          </AdvancedMarker>
        </Map>
      ) : (
        <GeocodedCityMap
          cityName={cityName}
          fallback={fallbackPosition}
          zoom={mapZoom}
        />
      )}
    </APIProvider>
  );
}

function ZipCodeBadges({ zipCodes, dark }: { zipCodes: string[]; dark: boolean }) {
  if (!zipCodes || zipCodes.length === 0) return null;
  return (
    <div>
      <h4 className={cn("text-sm font-bold uppercase tracking-wider mb-3", dark ? "text-gray-500" : "text-gray-400")}>
        Zip Codes We Cover
      </h4>
      <div className="flex flex-wrap gap-2">
        {zipCodes.map((zip) => (
          <span
            key={zip}
            className={cn(
              "text-sm font-medium px-3 py-1.5 rounded-md",
              dark ? "bg-white/10 text-gray-300" : "bg-slate-100 text-gray-600"
            )}
          >
            {zip}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Stacked Variant ──────────────────────────────────────────────── */

function StackedVariant({
  cityName,
  coordinates,
  zipCodes,
  dark,
  latitude,
  longitude,
  zoom,
  elementStyles,
}: Omit<CityMapSectionProps, "variant">) {
  const { hasManualOverride, manualPosition, mapZoom, mapApiKey } = resolveCityMapConfig({ coordinates, latitude, longitude, zoom });

  return (
    <section className={cn("py-12 @min-[768px]:py-24 overflow-hidden", dark ? "bg-secondary" : "bg-white")}>
      <div className="max-w-5xl mx-auto px-4 @min-[768px]:px-8 mb-10 text-center">
        <h2 className={cn("text-2xl @min-[1024px]:text-3xl font-bold mb-4", dark ? "text-white" : "text-gray-900")} style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
          Serving <span className="text-primary" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>{cityName}</span>
        </h2>
        <p className={cn("mb-6 leading-relaxed max-w-2xl mx-auto", dark ? "text-gray-400" : "text-gray-600")} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
          We proudly serve all of {cityName} and the surrounding areas.
          Our team knows your neighborhoods inside and out.
        </p>
        <div className="flex justify-center">
          <ZipCodeBadges zipCodes={zipCodes} dark={!!dark} />
        </div>
      </div>
      <div className={cn("w-full h-[400px] @min-[768px]:h-[500px] relative", dark ? "bg-slate-800" : "bg-slate-200")}>
        <CityMapContent
          mapApiKey={mapApiKey}
          hasManualOverride={hasManualOverride}
          manualPosition={manualPosition}
          fallbackPosition={coordinates}
          mapZoom={mapZoom}
          cityName={cityName}
        />
      </div>
    </section>
  );
}

/* ── FullMap Variant ──────────────────────────────────────────────── */

function FullMapVariant({
  cityName,
  coordinates,
  zipCodes,
  dark,
  latitude,
  longitude,
  zoom,
  elementStyles,
}: Omit<CityMapSectionProps, "variant">) {
  const { hasManualOverride, manualPosition, mapZoom, mapApiKey } = resolveCityMapConfig({ coordinates, latitude, longitude, zoom });

  return (
    <section className="overflow-hidden">
      <div className="relative w-full h-[500px] @min-[768px]:h-[600px]">
        <div className={cn("absolute inset-0", dark ? "bg-slate-800" : "bg-slate-200")}>
          <CityMapContent
            mapApiKey={mapApiKey}
            hasManualOverride={hasManualOverride}
            manualPosition={manualPosition}
            fallbackPosition={coordinates}
            mapZoom={mapZoom}
            cityName={cityName}
          />
        </div>
        <div className={cn(
          "absolute bottom-4 left-4 @min-[768px]:bottom-8 @min-[768px]:left-8 rounded-xl shadow-lg p-4 @min-[768px]:p-6 max-w-[400px] z-10",
          dark ? "bg-secondary/95 backdrop-blur-sm" : "bg-white/95 backdrop-blur-sm"
        )}>
          <h2 className={cn("text-xl @min-[768px]:text-2xl font-bold mb-3", dark ? "text-white" : "text-gray-900")} style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
            Serving <span className="text-primary" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>{cityName}</span>
          </h2>
          <p className={cn("mb-4 text-sm leading-relaxed", dark ? "text-gray-400" : "text-gray-600")} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
            We proudly serve all of {cityName} and the surrounding areas.
          </p>
          <ZipCodeBadges zipCodes={zipCodes} dark={!!dark} />
        </div>
      </div>
    </section>
  );
}

/* ── Main Export (default: split) ─────────────────────────────────── */

export const CityMapSection: React.FC<CityMapSectionProps> = ({
  cityName,
  coordinates,
  zipCodes,
  latitude,
  longitude,
  zoom = 13,
  variant = "split",
  dark = false,
  elementStyles,
}) => {
  if (variant === "stacked") {
    return <StackedVariant cityName={cityName} coordinates={coordinates} zipCodes={zipCodes} dark={dark} latitude={latitude} longitude={longitude} zoom={zoom} elementStyles={elementStyles} />;
  }
  if (variant === "fullMap") {
    return <FullMapVariant cityName={cityName} coordinates={coordinates} zipCodes={zipCodes} dark={dark} latitude={latitude} longitude={longitude} zoom={zoom} elementStyles={elementStyles} />;
  }

  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const hasManualOverride = !!(latitude && longitude);
  const manualPosition = hasManualOverride
    ? { lat: latitude!, lng: longitude! }
    : null;
  const mapZoom = zoom || 13;

  return (
    <section className={cn("overflow-hidden", dark ? "bg-slate-900" : "bg-slate-50")}>
      <div className="flex flex-col @min-[1024px]:flex-row min-h-[450px]">
        <div className={cn(
          "w-full @min-[1024px]:w-1/3 p-10 @min-[1024px]:p-14 flex flex-col justify-center",
          dark ? "bg-secondary" : "bg-white"
        )}>
          <h2 className={cn("text-2xl @min-[1024px]:text-3xl font-bold mb-4", dark ? "text-white" : "text-gray-900")} style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
            Serving <span className="text-primary" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>{cityName}</span>
          </h2>
          <p className={cn("mb-6 leading-relaxed", dark ? "text-gray-400" : "text-gray-600")} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
            We proudly serve all of {cityName} and the surrounding areas.
            Our team knows your neighborhoods inside and out.
          </p>
          <ZipCodeBadges zipCodes={zipCodes} dark={dark} />
        </div>

        <div className={cn(
          "w-full @min-[1024px]:w-2/3 relative h-[350px] @min-[768px]:h-auto @min-[768px]:min-h-[350px]",
          dark ? "bg-slate-800" : "bg-slate-200"
        )}>
          <CityMapContent
            mapApiKey={mapApiKey}
            hasManualOverride={hasManualOverride}
            manualPosition={manualPosition}
            fallbackPosition={coordinates}
            mapZoom={mapZoom}
            cityName={cityName}
          />
        </div>
      </div>
    </section>
  );
};
