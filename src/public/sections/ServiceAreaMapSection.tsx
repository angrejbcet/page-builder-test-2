"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { APIProvider, Map, AdvancedMarker, Pin, useMapsLibrary } from "@vis.gl/react-google-maps";
import { cn } from "@/public/lib/utils";

const DEFAULT_POS = { lat: 38.3396, lng: -122.7011 };

function GeocodedMap({
  address,
  fallback,
  zoom,
}: {
  address: string;
  fallback: { lat: number; lng: number };
  zoom: number;
}) {
  const geocodingLib = useMapsLibrary("geocoding");
  const [center, setCenter] = useState(fallback);

  const geocode = useCallback(
    (addr: string) => {
      if (!geocodingLib || !addr) return;
      const geocoder = new geocodingLib.Geocoder();
      geocoder.geocode({ address: addr }, (results, status) => {
        if (status === "OK" && results?.[0]) {
          const loc = results[0].geometry.location;
          setCenter({ lat: loc.lat(), lng: loc.lng() });
        }
      });
    },
    [geocodingLib],
  );

  useEffect(() => {
    if (address) geocode(address);
  }, [address, geocode]);

  return (
    <Map
      mapId="service-area-map"
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

export interface ServiceAreaProps {
  heading: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  coordinates?: { lat: number; lng: number };
  latitude?: number;
  longitude?: number;
  zoom?: number;
  variant?: "split" | "stacked" | "mapFirst" | string;
  dark?: boolean;
  elementStyles?: Record<string, string>;
}

/* ── Shared helpers ───────────────────────────────────────────────── */

function resolveMapConfig(props: Pick<ServiceAreaProps, "coordinates" | "latitude" | "longitude" | "zoom">) {
  const hasManualOverride = !!(props.latitude && props.longitude);
  const manualPosition = hasManualOverride ? { lat: props.latitude!, lng: props.longitude! } : null;
  const fallbackPosition = props.coordinates || DEFAULT_POS;
  const mapZoom = props.zoom || 14;
  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  return { hasManualOverride, manualPosition, fallbackPosition, mapZoom, mapApiKey };
}

function ServiceAreaMapContent({
  mapApiKey,
  hasManualOverride,
  manualPosition,
  fallbackPosition,
  mapZoom,
  address,
}: {
  mapApiKey: string;
  hasManualOverride: boolean;
  manualPosition: { lat: number; lng: number } | null;
  fallbackPosition: { lat: number; lng: number };
  mapZoom: number;
  address: string;
}) {
  if (!mapApiKey) {
    return (
      <>
        <div className="absolute inset-0 bg-[url('/images/map-placeholder.jpg')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-500">
          <MapPin className="w-16 h-16 mb-4 text-slate-600" />
          <span className="text-sm @min-[768px]:text-xl font-medium tracking-widest uppercase">Interactive Map Placeholder</span>
          <span className="text-sm mt-2">Requires Google Maps API Key</span>
        </div>
      </>
    );
  }

  return (
    <APIProvider apiKey={mapApiKey}>
      {hasManualOverride ? (
        <Map
          mapId="service-area-map"
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
        <GeocodedMap address={address} fallback={fallbackPosition} zoom={mapZoom} />
      )}
    </APIProvider>
  );
}

function ContactItems({ address, phone, email, dark }: { address: string; phone: string; email: string; dark: boolean }) {
  const iconBg = dark ? "bg-primary/20" : "bg-primary/10";
  const labelCls = cn("font-semibold mb-1", dark ? "text-white" : "text-gray-900");
  const valueCls = cn("break-words", dark ? "text-gray-400" : "text-gray-500");
  const linkCls = cn("break-words transition-colors", dark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900");

  return (
    <div className="space-y-6">
      <div className="flex items-start">
        <div className={cn("p-3 rounded-full mr-4", iconBg)}>
          <MapPin className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h4 className={labelCls}>Our Location</h4>
          <p className={valueCls}>{address}</p>
        </div>
      </div>
      <div className="flex items-start">
        <div className={cn("p-3 rounded-full mr-4", iconBg)}>
          <Phone className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h4 className={labelCls}>Call Us</h4>
          <a href={`tel:${phone}`} className={linkCls}>{phone}</a>
        </div>
      </div>
      <div className="flex items-start">
        <div className={cn("p-3 rounded-full mr-4", iconBg)}>
          <Mail className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h4 className={labelCls}>Email Us</h4>
          <a href={`mailto:${email}`} className={linkCls}>{email}</a>
        </div>
      </div>
      <div className="flex items-start">
        <div className={cn("p-3 rounded-full mr-4", iconBg)}>
          <Clock className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h4 className={labelCls}>Business Hours</h4>
          <p className={dark ? "text-gray-400" : "text-gray-500"}>Mon - Sun: 9:00 AM - 5:00 PM</p>
        </div>
      </div>
    </div>
  );
}

function SplitHeading({ heading, dark, className, elementStyles }: { heading: string; dark: boolean; className?: string; elementStyles?: Record<string, string> }) {
  return (
    <h2 className={cn("text-3xl @min-[1024px]:text-4xl font-bold mb-6", dark ? "text-white" : "text-gray-900", className)} style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}>
      {(heading || "").split(" ").slice(0, -2).join(" ")}{" "}
      <span className="text-primary" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>{(heading || "").split(" ").slice(-2).join(" ")}</span>
    </h2>
  );
}

/* ── Stacked Variant ──────────────────────────────────────────────── */

function StackedVariant({
  heading,
  description,
  address,
  phone,
  email,
  dark,
  coordinates,
  latitude,
  longitude,
  zoom,
  elementStyles,
}: Omit<ServiceAreaProps, "variant">) {
  const { hasManualOverride, manualPosition, fallbackPosition, mapZoom, mapApiKey } = resolveMapConfig({ coordinates, latitude, longitude, zoom });

  return (
    <section className={cn("py-12 @min-[768px]:py-24 overflow-hidden", dark ? "bg-secondary" : "bg-white")}>
      <div className="max-w-5xl mx-auto px-4 @min-[768px]:px-8 mb-10">
        <SplitHeading heading={heading} dark={!!dark} elementStyles={elementStyles} />
        <p className={cn("mb-10 text-lg leading-relaxed max-w-3xl", dark ? "text-gray-400" : "text-gray-600")} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
          {description}
        </p>
        <ContactItems address={address} phone={phone} email={email} dark={!!dark} />
      </div>
      <div className={cn("w-full h-[400px] @min-[768px]:h-[500px] relative", dark ? "bg-slate-800" : "bg-slate-200")}>
        <ServiceAreaMapContent
          mapApiKey={mapApiKey}
          hasManualOverride={hasManualOverride}
          manualPosition={manualPosition}
          fallbackPosition={fallbackPosition}
          mapZoom={mapZoom}
          address={address}
        />
      </div>
    </section>
  );
}

/* ── MapFirst Variant ─────────────────────────────────────────────── */

function MapFirstVariant({
  heading,
  description,
  address,
  phone,
  email,
  dark,
  coordinates,
  latitude,
  longitude,
  zoom,
  elementStyles,
}: Omit<ServiceAreaProps, "variant">) {
  const { hasManualOverride, manualPosition, fallbackPosition, mapZoom, mapApiKey } = resolveMapConfig({ coordinates, latitude, longitude, zoom });

  return (
    <section className="overflow-hidden">
      <div className="relative w-full h-[500px] @min-[768px]:h-[650px]">
        <div className={cn("absolute inset-0", dark ? "bg-slate-800" : "bg-slate-200")}>
          <ServiceAreaMapContent
            mapApiKey={mapApiKey}
            hasManualOverride={hasManualOverride}
            manualPosition={manualPosition}
            fallbackPosition={fallbackPosition}
            mapZoom={mapZoom}
            address={address}
          />
        </div>
        <div className={cn(
          "absolute bottom-4 left-4 @min-[768px]:bottom-8 @min-[768px]:left-8 rounded-xl shadow-lg p-4 @min-[768px]:p-6 max-w-[400px] z-10",
          dark ? "bg-secondary/95 backdrop-blur-sm" : "bg-white/95 backdrop-blur-sm"
        )}>
          <SplitHeading heading={heading} dark={!!dark} className="text-2xl @min-[1024px]:text-3xl mb-4" elementStyles={elementStyles} />
          <p className={cn("mb-6 text-sm leading-relaxed", dark ? "text-gray-400" : "text-gray-600")} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
            {description}
          </p>
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-primary mr-2 shrink-0" />
              <span className={cn("text-sm break-words", dark ? "text-gray-300" : "text-gray-600")}>{address}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-primary mr-2 shrink-0" />
              <a href={`tel:${phone}`} className={cn("text-sm transition-colors", dark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900")}>{phone}</a>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-primary mr-2 shrink-0" />
              <a href={`mailto:${email}`} className={cn("text-sm break-words transition-colors", dark ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900")}>{email}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Main Export (default: split) ─────────────────────────────────── */

export const ServiceAreaMapSection: React.FC<ServiceAreaProps> = ({
  heading = "Our Service Area",
  description = "",
  address = "",
  phone = "",
  email = "",
  coordinates,
  latitude,
  longitude,
  zoom = 14,
  variant = "split",
  dark = false,
  elementStyles,
}) => {
  if (variant === "stacked") {
    return <StackedVariant heading={heading} description={description} address={address} phone={phone} email={email} dark={dark} coordinates={coordinates} latitude={latitude} longitude={longitude} zoom={zoom} elementStyles={elementStyles} />;
  }
  if (variant === "mapFirst") {
    return <MapFirstVariant heading={heading} description={description} address={address} phone={phone} email={email} dark={dark} coordinates={coordinates} latitude={latitude} longitude={longitude} zoom={zoom} elementStyles={elementStyles} />;
  }

  const mapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";
  const hasManualOverride = !!(latitude && longitude);
  const manualPosition = hasManualOverride
    ? { lat: latitude!, lng: longitude! }
    : null;
  const fallbackPosition = coordinates || DEFAULT_POS;
  const mapZoom = zoom || 14;

  return (
    <section className={cn("py-0 overflow-hidden", dark ? "bg-slate-900 text-white" : "bg-slate-50")}>
      <div className="flex flex-col @min-[1024px]:flex-row min-h-[400px] @min-[768px]:min-h-[600px]">

        <div className={cn(
          "w-full @min-[1024px]:w-1/3 p-6 @min-[768px]:p-10 @min-[1024px]:p-16 flex flex-col justify-center relative z-10 shadow-2xl",
          dark ? "bg-secondary" : "bg-white"
        )}>
          <SplitHeading heading={heading} dark={dark} elementStyles={elementStyles} />
          <p className={cn("mb-10 text-lg leading-relaxed", dark ? "text-gray-400" : "text-gray-600")} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
            {description}
          </p>
          <ContactItems address={address} phone={phone} email={email} dark={dark} />
        </div>

        <div className={cn(
          "w-full @min-[1024px]:w-2/3 relative h-[400px] @min-[768px]:h-auto @min-[768px]:min-h-[400px]",
          dark ? "bg-slate-800" : "bg-slate-200"
        )}>
          <ServiceAreaMapContent
            mapApiKey={mapApiKey}
            hasManualOverride={hasManualOverride}
            manualPosition={manualPosition}
            fallbackPosition={fallbackPosition}
            mapZoom={mapZoom}
            address={address}
          />
        </div>

      </div>
    </section>
  );
};
