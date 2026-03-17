"use client";

import React from "react";
import { Tag, Clock, Phone } from "lucide-react";

interface CouponItem {
  id: string;
  title: string;
  savings: string;
  description: string;
  includes?: string[];
  code?: string;
  expiration?: string;
  terms?: string;
  badge?: string;
}

export interface CouponCardsSectionProps {
  heading: string;
  highlight?: string;
  description?: string;
  coupons: CouponItem[];
  phone: string;
  columns?: "1" | "2" | "3" | "4" | string;
  dark?: boolean;
  variant?: "grid" | "list" | "featured" | string;
  elementStyles?: Record<string, string>;
}

const GRID_COLS: Record<string, string> = {
  "1": "grid-cols-1",
  "2": "grid-cols-1 @min-[768px]:grid-cols-2",
  "3": "grid-cols-1 @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-3",
  "4": "grid-cols-1 @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-4",
};

/* ── List Variant ─────────────────────────────────────────────────── */

type CouponVariantProps = Omit<CouponCardsSectionProps, "variant">;

const ListVariant: React.FC<CouponVariantProps> = ({
  heading,
  highlight,
  description,
  coupons = [],
  phone,
  dark = false,
  elementStyles,
}) => (
  <section
    className={`py-20 @min-[768px]:py-24 px-4 @min-[768px]:px-8 ${
      dark ? "bg-secondary text-white" : "bg-white"
    }`}
  >
    <div className="max-w-[1200px] mx-auto">
      <div className="text-center mb-14">
        <h2
          className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${
            dark ? "text-white" : "text-gray-900"
          }`}
          style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          {heading}{" "}
          {highlight && <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>}
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
        {description && (
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${dark ? "text-gray-300" : "text-gray-600"}`} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 @min-[768px]:gap-6">
        {coupons.map((coupon, idx) => (
          <div
            key={coupon.id || `coupon-${idx}`}
            className={`flex flex-col @min-[768px]:flex-row @min-[768px]:items-center gap-4 @min-[768px]:gap-6 p-4 @min-[768px]:p-6 rounded-2xl border transition-all ${
              dark
                ? "bg-white/5 border-white/10 hover:border-primary/30"
                : "bg-white border-slate-200 hover:shadow-md"
            }`}
            style={elementStyles?.cardBg || elementStyles?.cardBorder ? { ...(elementStyles.cardBg && { backgroundColor: elementStyles.cardBg }), ...(elementStyles.cardBorder && { borderColor: elementStyles.cardBorder }) } : undefined}
          >
            {/* Left: badge + title + savings */}
            <div className="flex-shrink-0 @min-[768px]:w-[280px]">
              {coupon.badge && (
                <span className="inline-flex items-center gap-1.5 bg-primary text-on-primary text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full mb-3" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}>
                  <Tag className="w-3 h-3" />
                  {coupon.badge}
                </span>
              )}
              <h3
                className={`text-xl font-bold mb-2 ${
                  dark ? "text-white" : "text-secondary"
                }`}
                style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}
              >
                {coupon.title}
              </h3>
              <span className="text-2xl @min-[640px]:text-3xl font-extrabold text-primary">
                {coupon.savings}
              </span>
            </div>

            {/* Middle: description + details */}
            <div className="flex-1 min-w-0">
              <p className={`mb-2 leading-relaxed ${dark ? "text-gray-300" : "text-gray-600"}`} style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}>
                {coupon.description}
              </p>
              {coupon.includes && coupon.includes.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
                  {coupon.includes.map((item, i) => (
                    <span key={i} className={`text-sm flex items-center gap-1 ${dark ? "text-gray-300" : "text-gray-600"}`}>
                      <span className="text-green-500">✓</span> {item}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap items-center gap-3 text-sm">
                {coupon.expiration && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    <span className={dark ? "text-orange-300" : "text-orange-600"}>
                      Expires: {coupon.expiration}
                    </span>
                  </span>
                )}
                {coupon.code && (
                  <span className="font-mono font-bold bg-primary/10 text-primary px-2.5 py-0.5 rounded-md">
                    {coupon.code}
                  </span>
                )}
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex-shrink-0 @min-[768px]:w-auto">
              <a
                href={`tel:${phone?.replace(/\D/g, "")}`}
                className="flex items-center justify-center gap-2 w-full @min-[768px]:w-auto bg-primary text-on-primary font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap"
              >
                <Phone className="w-5 h-5" />
                Call {phone}
              </a>
            </div>

            {coupon.terms && (
              <p className={`text-xs leading-relaxed w-full ${dark ? "text-gray-500" : "text-gray-400"}`}>
                {coupon.terms}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Featured Variant ────────────────────────────────────────────── */

const FeaturedVariant: React.FC<CouponVariantProps> = ({
  heading,
  highlight,
  description,
  coupons = [],
  phone,
  dark = false,
  elementStyles,
}) => {
  const [first, ...rest] = coupons;

  const renderCard = (coupon: CouponItem, idx: number, isHero: boolean) => (
    <div
      key={coupon.id || `coupon-${idx}`}
      className={`rounded-2xl overflow-hidden transition-all ${
        dark
          ? "bg-white/5 border border-white/10 hover:border-primary/30"
          : "bg-white border-2 border-slate-200 hover:border-primary/30 shadow-sm hover:shadow-lg"
      }`}
      style={elementStyles?.cardBg || elementStyles?.cardBorder ? { ...(elementStyles.cardBg && { backgroundColor: elementStyles.cardBg }), ...(elementStyles.cardBorder && { borderColor: elementStyles.cardBorder }) } : undefined}
    >
      {coupon.badge && (
        <div className={`bg-primary text-on-primary font-bold tracking-wider uppercase px-4 flex items-center gap-2 ${isHero ? "text-sm py-2.5" : "text-xs py-2"}`} style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}>
          <Tag className={isHero ? "w-4 h-4" : "w-3.5 h-3.5"} />
          {coupon.badge}
        </div>
      )}

      <div className={isHero ? "p-6 @min-[640px]:p-8 @min-[1024px]:p-10" : "p-4 @min-[640px]:p-6"}>
        <h3
          className={`font-bold mb-4 ${
            isHero ? "text-2xl @min-[768px]:text-3xl" : "text-xl"
          } ${dark ? "text-white" : "text-secondary"}`}
          style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}
        >
          {coupon.title}
        </h3>

        <div className={`bg-primary/10 rounded-xl text-center mb-6 ${isHero ? "py-6 px-8" : "py-4 px-6"}`}>
          <span className={`font-extrabold text-primary ${isHero ? "text-4xl @min-[640px]:text-5xl @min-[768px]:text-6xl" : "text-2xl @min-[640px]:text-3xl"}`}>
            {coupon.savings}
          </span>
        </div>

        <p className={`mb-4 leading-relaxed ${isHero ? "text-lg" : ""} ${dark ? "text-gray-300" : "text-gray-600"}`} style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}>
          {coupon.description}
        </p>

        {coupon.includes && coupon.includes.length > 0 && (
          <div className="mb-4 space-y-2">
            <p className={`text-sm font-bold ${dark ? "text-gray-200" : "text-gray-800"}`}>
              What&apos;s Included:
            </p>
            {coupon.includes.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col @min-[640px]:flex-row gap-2 @min-[640px]:items-center @min-[640px]:justify-between mb-4">
          {coupon.expiration && (
            <div className="flex items-center gap-1.5 text-sm">
              <Clock className="w-4 h-4 text-orange-500" />
              <span className={dark ? "text-orange-300" : "text-orange-600"}>
                Expires: {coupon.expiration}
              </span>
            </div>
          )}
          {coupon.code && (
            <span className="text-sm font-mono font-bold bg-primary/10 text-primary px-3 py-1 rounded-md">
              {coupon.code}
            </span>
          )}
        </div>

        <a
          href={`tel:${phone?.replace(/\D/g, "")}`}
          className={`flex items-center justify-center gap-2 w-full bg-primary text-on-primary font-bold rounded-lg hover:bg-primary-dark transition-colors ${isHero ? "py-5 text-lg" : "py-4"}`}
        >
          <Phone className="w-5 h-5" />
          Claim Offer — Call {phone}
        </a>

        {coupon.terms && (
          <p className={`mt-3 text-xs leading-relaxed ${dark ? "text-gray-500" : "text-gray-400"}`}>
            {coupon.terms}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <section
      className={`py-20 @min-[768px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-white"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <h2
            className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${
              dark ? "text-white" : "text-gray-900"
            }`}
            style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
          >
            {heading}{" "}
            {highlight && <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
          {description && (
            <p className={`mt-4 text-lg max-w-2xl mx-auto ${dark ? "text-gray-300" : "text-gray-600"}`} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
              {description}
            </p>
          )}
        </div>

        {first && renderCard(first, 0, true)}

        {rest.length > 0 && (
          <div className="grid grid-cols-1 @min-[768px]:grid-cols-2 gap-4 mt-6">
            {rest.map((coupon, idx) => renderCard(coupon, idx + 1, false))}
          </div>
        )}
      </div>
    </section>
  );
};

/* ── Main Component ──────────────────────────────────────────────── */

export const CouponCardsSection: React.FC<CouponCardsSectionProps> = ({
  heading,
  highlight,
  description,
  coupons = [],
  phone,
  columns = "2",
  dark = false,
  variant = "grid",
  elementStyles,
}) => {
  if (variant === "list")
    return <ListVariant heading={heading} highlight={highlight} description={description} coupons={coupons} phone={phone} dark={dark} elementStyles={elementStyles} />;
  if (variant === "featured")
    return <FeaturedVariant heading={heading} highlight={highlight} description={description} coupons={coupons} phone={phone} dark={dark} elementStyles={elementStyles} />;

  return (
    <section
      className={`py-20 @min-[768px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-white"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <h2
            className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${
              dark ? "text-white" : "text-gray-900"
            }`}
            style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
          >
            {heading}{" "}
            {highlight && <span className="text-primary" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>{highlight}</span>}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined} />
          {description && (
            <p className={`mt-4 text-lg max-w-2xl mx-auto ${dark ? "text-gray-300" : "text-gray-600"}`} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
              {description}
            </p>
          )}
        </div>

        <div className={`grid ${GRID_COLS[columns] || GRID_COLS["2"]} gap-4 @min-[768px]:gap-8`}>
          {coupons.map((coupon, idx) => (
            <div
              key={coupon.id || `coupon-${idx}`}
              className={`rounded-2xl overflow-hidden transition-all ${
                dark
                  ? "bg-white/5 border border-white/10"
                  : "bg-white border-2 border-slate-200 hover:border-primary/30 shadow-sm hover:shadow-lg"
              }`}
              style={elementStyles?.cardBg || elementStyles?.cardBorder ? { ...(elementStyles.cardBg && { backgroundColor: elementStyles.cardBg }), ...(elementStyles.cardBorder && { borderColor: elementStyles.cardBorder }) } : undefined}
            >
              {coupon.badge && (
                <div className="bg-primary text-on-primary text-xs font-bold tracking-wider uppercase px-4 py-2 flex items-center gap-2" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}>
                  <Tag className="w-3.5 h-3.5" />
                  {coupon.badge}
                </div>
              )}

              <div className="p-4 @min-[640px]:p-6 @min-[1024px]:p-8">
                <h3
                  className={`text-xl font-bold mb-4 ${
                    dark ? "text-white" : "text-secondary"
                  }`}
                  style={elementStyles?.cardTitleColor ? { color: elementStyles.cardTitleColor } : undefined}
                >
                  {coupon.title}
                </h3>

                <div className="bg-primary/10 rounded-xl py-4 px-6 text-center mb-6">
                  <span className="text-2xl @min-[640px]:text-3xl @min-[768px]:text-4xl @min-[1024px]:text-5xl font-extrabold text-primary">
                    {coupon.savings}
                  </span>
                </div>

                <p
                  className={`mb-4 leading-relaxed ${
                    dark ? "text-gray-300" : "text-gray-600"
                  }`}
                  style={elementStyles?.cardTextColor ? { color: elementStyles.cardTextColor } : undefined}
                >
                  {coupon.description}
                </p>

                {coupon.includes && coupon.includes.length > 0 && (
                  <div className="mb-4 space-y-2">
                    <p className={`text-sm font-bold ${dark ? "text-gray-200" : "text-gray-800"}`}>
                      What&apos;s Included:
                    </p>
                    {coupon.includes.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col @min-[640px]:flex-row gap-2 @min-[640px]:items-center @min-[640px]:justify-between mb-4">
                  {coupon.expiration && (
                    <div className="flex items-center gap-1.5 text-sm">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className={dark ? "text-orange-300" : "text-orange-600"}>
                        Expires: {coupon.expiration}
                      </span>
                    </div>
                  )}
                  {coupon.code && (
                    <span className="text-sm font-mono font-bold bg-primary/10 text-primary px-3 py-1 rounded-md">
                      {coupon.code}
                    </span>
                  )}
                </div>

                <a
                  href={`tel:${phone?.replace(/\D/g, "")}`}
                  className="flex items-center justify-center gap-2 w-full bg-primary text-on-primary font-bold py-4 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Claim Offer — Call {phone}
                </a>

                {coupon.terms && (
                  <p
                    className={`mt-3 text-xs leading-relaxed ${
                      dark ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {coupon.terms}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
