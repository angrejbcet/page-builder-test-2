import React from "react";

interface Partner {
  name: string;
  logo: string;
  description: string;
}

export interface PartnersSectionProps {
  heading: string;
  highlight: string;
  description?: string;
  partners: Partner[];
  dark?: boolean;
  variant?: "grid" | "carousel" | "logoStrip" | string;
  elementStyles?: Record<string, string>;
}

type PartnersSectionVariantProps = Omit<PartnersSectionProps, "variant">;

function PartnerLogo({ partner, dark, className }: { partner: Partner; dark: boolean; className: string }) {
  return (
    <div
      className={`rounded-lg flex items-center justify-center font-bold text-sm overflow-hidden ${className} ${
        dark
          ? "bg-white/10 text-gray-400"
          : "bg-white text-gray-500 border border-gray-200"
      }`}
    >
      {partner.logo?.startsWith("data:") || partner.logo?.startsWith("http") ? (
        <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain" />
      ) : (
        `[${partner.name}]`
      )}
    </div>
  );
}

function SectionHeader({ heading, highlight, description, dark, elementStyles }: { heading: string; highlight: string; description?: string; dark: boolean; elementStyles?: Record<string, string> }) {
  return (
    <div className="text-center mb-16">
      <h2
        className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${
          dark ? "text-white" : "text-secondary"
        }`}
        style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
      >
        {heading} <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>
      </h2>
      <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}></div>
      {description && (
        <p
          className={`text-lg max-w-2xl mx-auto leading-relaxed ${
            dark ? "text-gray-400" : "text-gray-600"
          }`}
          style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
        >
          {description}
        </p>
      )}
    </div>
  );
}

const CarouselVariant: React.FC<PartnersSectionVariantProps> = ({
  heading,
  highlight,
  description,
  partners = [],
  dark = false,
  elementStyles,
}) => {
  return (
    <section
      className={`py-12 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${dark ? "bg-secondary" : "bg-white"}`}
    >
      <div className="max-w-[1325px] mx-auto">
        <SectionHeader heading={heading} highlight={highlight} description={description} dark={dark} elementStyles={elementStyles} />

        <div className="flex gap-4 @min-[768px]:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4">
          {partners.map((partner, idx) => (
            <div
              key={partner.name || `partner-${idx}`}
              className={`flex-[0_0_85%] @min-[768px]:flex-[0_0_45%] @min-[1024px]:flex-[0_0_30%] snap-start rounded-xl p-4 @min-[640px]:p-6 @min-[1024px]:p-8 flex flex-col items-center text-center transition-all duration-300 ${
                dark
                  ? "bg-white/5 border border-white/10 hover:border-primary/30"
                  : "bg-slate-50 border border-slate-100 hover:border-primary/30 hover:shadow-md"
              }`}
              style={{ ...(elementStyles?.cardBg && { backgroundColor: elementStyles.cardBg }), ...(elementStyles?.cardBorder && { borderColor: elementStyles.cardBorder }) }}
            >
              <PartnerLogo
                partner={partner}
                dark={dark}
                className="w-24 h-14 @min-[640px]:w-28 @min-[640px]:h-16 @min-[768px]:w-32 @min-[768px]:h-20 mb-6"
              />
              <h3
                className={`text-base @min-[768px]:text-lg font-bold mb-3 ${
                  dark ? "text-white" : "text-secondary"
                }`}
              >
                {partner.name}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  dark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LogoStripVariant: React.FC<PartnersSectionVariantProps> = ({
  heading,
  highlight,
  description,
  partners = [],
  dark = false,
  elementStyles,
}) => {
  return (
    <section
      className={`py-12 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${dark ? "bg-secondary" : "bg-white"}`}
    >
      <div className="max-w-[1325px] mx-auto">
        <SectionHeader heading={heading} highlight={highlight} description={description} dark={dark} elementStyles={elementStyles} />

        <div className="flex flex-wrap items-center justify-center gap-6 @min-[768px]:gap-10">
          {partners.map((partner, idx) => (
            <div
              key={partner.name || `partner-${idx}`}
              className="flex flex-col items-center text-center"
            >
              <PartnerLogo
                partner={partner}
                dark={dark}
                className="w-32 h-20 mb-3"
              />
              <p
                className={`text-sm font-medium ${
                  dark ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const PartnersSection: React.FC<PartnersSectionProps> = ({
  heading,
  highlight,
  description,
  partners = [],
  dark = false,
  variant = "grid",
  elementStyles,
}) => {
  if (variant === "carousel") return <CarouselVariant heading={heading} highlight={highlight} description={description} partners={partners} dark={dark} elementStyles={elementStyles} />;
  if (variant === "logoStrip") return <LogoStripVariant heading={heading} highlight={highlight} description={description} partners={partners} dark={dark} elementStyles={elementStyles} />;

  return (
    <section
      className={`py-12 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${dark ? "bg-secondary" : "bg-white"}`}
    >
      <div className="max-w-[1325px] mx-auto">
        <SectionHeader heading={heading} highlight={highlight} description={description} dark={dark} elementStyles={elementStyles} />

        <div className="grid @min-[768px]:grid-cols-2 @min-[1024px]:grid-cols-3 gap-4 @min-[768px]:gap-8">
          {partners.map((partner, idx) => (
            <div
              key={partner.name || `partner-${idx}`}
              className={`rounded-xl p-4 @min-[640px]:p-6 @min-[1024px]:p-8 flex flex-col items-center text-center transition-all duration-300 ${
                dark
                  ? "bg-white/5 border border-white/10 hover:border-primary/30"
                  : "bg-slate-50 border border-slate-100 hover:border-primary/30 hover:shadow-md"
              }`}
              style={{ ...(elementStyles?.cardBg && { backgroundColor: elementStyles.cardBg }), ...(elementStyles?.cardBorder && { borderColor: elementStyles.cardBorder }) }}
            >
              <PartnerLogo
                partner={partner}
                dark={dark}
                className="w-24 h-14 @min-[640px]:w-28 @min-[640px]:h-16 @min-[768px]:w-32 @min-[768px]:h-20 mb-6"
              />
              <h3
                className={`text-base @min-[768px]:text-lg font-bold mb-3 ${
                  dark ? "text-white" : "text-secondary"
                }`}
              >
                {partner.name}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  dark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
