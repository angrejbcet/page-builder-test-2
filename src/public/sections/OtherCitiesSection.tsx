import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

interface OtherCity {
  name: string;
  slug: string;
  countySlug: string;
}

interface OtherCitiesSectionProps {
  currentCityName: string;
  cities: OtherCity[];
  dark?: boolean;
  variant?: "grid" | "list" | "compact" | string;
}

type VariantProps = Omit<OtherCitiesSectionProps, "variant">;

const ListVariant: React.FC<VariantProps> = ({
  currentCityName,
  cities,
  dark = false,
}) => (
  <section className={`py-20 px-4 @min-[768px]:px-8 ${dark ? "bg-secondary" : "bg-white"}`}>
    <div className="max-w-[1325px] mx-auto">
      <div className="text-center mb-12">
        <h2 className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${dark ? "text-white" : "text-secondary"}`}>
          We Also Serve <span className="text-primary">Nearby Cities</span>
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
        <p className={`max-w-2xl mx-auto text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>
          In addition to {currentCityName}, we provide professional painting
          services across Sonoma County.
        </p>
      </div>

      <div className={`max-w-[800px] mx-auto rounded-xl border overflow-hidden ${
        dark ? "border-white/10" : "border-slate-100"
      }`}>
        <div className={`divide-y ${dark ? "divide-white/10" : "divide-slate-100"}`}>
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/locations/${city.countySlug}/${city.slug}`}
              title={`Professional services in ${city.name}`}
              className={`group flex items-center justify-between px-4 py-4 @min-[768px]:py-5 transition-colors ${
                dark
                  ? "hover:bg-white/5"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span className={`font-bold text-lg ${dark ? "text-white" : "text-secondary"}`}>
                  {city.name}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const CompactVariant: React.FC<VariantProps> = ({
  currentCityName,
  cities,
  dark = false,
}) => (
  <section className={`py-20 px-4 @min-[768px]:px-8 ${dark ? "bg-secondary" : "bg-white"}`}>
    <div className="max-w-[1325px] mx-auto">
      <div className="text-center mb-12">
        <h2 className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${dark ? "text-white" : "text-secondary"}`}>
          We Also Serve <span className="text-primary">Nearby Cities</span>
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
        <p className={`max-w-2xl mx-auto text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>
          In addition to {currentCityName}, we provide professional painting
          services across Sonoma County.
        </p>
      </div>

      <div className="grid grid-cols-2 @min-[640px]:grid-cols-3 @min-[768px]:grid-cols-4 @min-[1024px]:grid-cols-5 gap-2 @min-[768px]:gap-3">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/locations/${city.countySlug}/${city.slug}`}
            title={`Professional services in ${city.name}`}
            className={`group flex items-center gap-2 p-3 @min-[768px]:p-4 rounded-lg border transition-all ${
              dark
                ? "bg-white/5 border-white/10 hover:border-primary/40"
                : "bg-slate-50 border-slate-100 hover:border-primary/30 hover:shadow-md"
            }`}
          >
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span className={`text-sm font-semibold truncate ${dark ? "text-white" : "text-secondary"}`}>
              {city.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export const OtherCitiesSection: React.FC<OtherCitiesSectionProps> = ({
  currentCityName,
  cities,
  dark = false,
  variant = "grid",
}) => {
  if (cities.length === 0) return null;

  if (variant === "list") return <ListVariant currentCityName={currentCityName} cities={cities} dark={dark} />;
  if (variant === "compact") return <CompactVariant currentCityName={currentCityName} cities={cities} dark={dark} />;

  return (
    <section className={`py-20 px-4 @min-[768px]:px-8 ${dark ? "bg-secondary" : "bg-white"}`}>
      <div className="max-w-[1325px] mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${dark ? "text-white" : "text-secondary"}`}>
            We Also Serve <span className="text-primary">Nearby Cities</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className={`max-w-2xl mx-auto text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>
            In addition to {currentCityName}, we provide professional painting
            services across Sonoma County.
          </p>
        </div>

        <div className="grid @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-3 gap-6">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/locations/${city.countySlug}/${city.slug}`}
              title={`Professional services in ${city.name}`}
              className={`group flex items-center gap-4 p-6 rounded-xl border transition-all ${
                dark
                  ? "bg-white/5 border-white/10 hover:border-primary/40"
                  : "bg-slate-50 border-slate-100 hover:border-primary/30 hover:shadow-md"
              }`}
            >
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${dark ? "text-white" : "text-secondary"}`}>
                  {city.name}
                </h3>
                <span className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>
                  View painting services
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
