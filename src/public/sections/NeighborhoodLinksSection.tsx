import React from "react";
import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

interface NeighborhoodLink {
  name: string;
  slug: string;
}

interface NeighborhoodLinksSectionProps {
  cityName: string;
  citySlug: string;
  countySlug: string;
  neighborhoods: NeighborhoodLink[];
  dark?: boolean;
  variant?: "grid" | "list" | "pills" | string;
}

type VariantProps = Omit<NeighborhoodLinksSectionProps, "variant">;

const ListVariant: React.FC<VariantProps> = ({
  cityName,
  citySlug,
  countySlug,
  neighborhoods,
  dark = false,
}) => (
  <section className={`py-20 px-4 @min-[768px]:px-8 ${dark ? "bg-secondary" : "bg-white"}`}>
    <div className="max-w-[1325px] mx-auto">
      <div className="text-center mb-12">
        <h2 className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${dark ? "text-white" : "text-secondary"}`}>
          {cityName} <span className="text-primary">Neighborhoods</span>
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
        <p className={`max-w-2xl mx-auto text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>
          We provide specialized painting services across {cityName}&apos;s
          diverse neighborhoods.
        </p>
      </div>

      <div className={`max-w-[800px] mx-auto rounded-xl border overflow-hidden ${
        dark ? "border-white/10" : "border-slate-100"
      }`}>
        <div className={`divide-y ${dark ? "divide-white/10" : "divide-slate-100"}`}>
          {neighborhoods.map((hood) => (
            <Link
              key={hood.slug}
              href={`/locations/${countySlug}/${citySlug}/neighborhoods/${hood.slug}`}
              title={`${hood.name} neighborhood services in ${cityName}`}
              className={`group flex items-center justify-between px-4 py-4 @min-[768px]:py-5 transition-colors ${
                dark
                  ? "hover:bg-white/5"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-primary flex-shrink-0" />
                <span className={`font-bold text-lg ${dark ? "text-white" : "text-secondary"}`}>
                  {hood.name}
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

const PillsVariant: React.FC<VariantProps> = ({
  cityName,
  citySlug,
  countySlug,
  neighborhoods,
  dark = false,
}) => (
  <section className={`py-20 px-4 @min-[768px]:px-8 ${dark ? "bg-secondary" : "bg-white"}`}>
    <div className="max-w-[1325px] mx-auto">
      <div className="text-center mb-12">
        <h2 className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${dark ? "text-white" : "text-secondary"}`}>
          {cityName} <span className="text-primary">Neighborhoods</span>
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
        <p className={`max-w-2xl mx-auto text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>
          We provide specialized painting services across {cityName}&apos;s
          diverse neighborhoods.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 @min-[768px]:gap-3">
        {neighborhoods.map((hood) => (
          <Link
            key={hood.slug}
            href={`/locations/${countySlug}/${citySlug}/neighborhoods/${hood.slug}`}
            title={`${hood.name} neighborhood services in ${cityName}`}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-colors hover:bg-primary hover:text-white hover:border-primary ${
              dark
                ? "text-gray-300 border-white/10"
                : "text-gray-600 border-slate-200"
            }`}
          >
            <Home className="w-4 h-4" />
            {hood.name}
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export const NeighborhoodLinksSection: React.FC<NeighborhoodLinksSectionProps> = ({
  cityName,
  citySlug,
  countySlug,
  neighborhoods,
  dark = false,
  variant = "grid",
}) => {
  if (neighborhoods.length === 0) return null;

  if (variant === "list") return <ListVariant cityName={cityName} citySlug={citySlug} countySlug={countySlug} neighborhoods={neighborhoods} dark={dark} />;
  if (variant === "pills") return <PillsVariant cityName={cityName} citySlug={citySlug} countySlug={countySlug} neighborhoods={neighborhoods} dark={dark} />;

  return (
    <section className={`py-20 px-4 @min-[768px]:px-8 ${dark ? "bg-secondary" : "bg-white"}`}>
      <div className="max-w-[1325px] mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${dark ? "text-white" : "text-secondary"}`}>
            {cityName} <span className="text-primary">Neighborhoods</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className={`max-w-2xl mx-auto text-lg ${dark ? "text-gray-400" : "text-gray-600"}`}>
            We provide specialized painting services across {cityName}&apos;s
            diverse neighborhoods.
          </p>
        </div>

        <div className="grid @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-3 gap-6">
          {neighborhoods.map((hood) => (
            <Link
              key={hood.slug}
              href={`/locations/${countySlug}/${citySlug}/neighborhoods/${hood.slug}`}
              title={`${hood.name} neighborhood services in ${cityName}`}
              className={`group flex items-center gap-4 p-6 rounded-xl border transition-all ${
                dark
                  ? "bg-white/5 border-white/10 hover:border-primary/40"
                  : "bg-slate-50 border-slate-100 hover:border-primary/30 hover:shadow-md"
              }`}
            >
              <div className="bg-primary/10 p-3 rounded-full">
                <Home className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${dark ? "text-white" : "text-secondary"}`}>
                  {hood.name}
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
