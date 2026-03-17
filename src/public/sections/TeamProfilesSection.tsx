"use client";

import React from "react";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  image?: string;
}

export interface TeamProfilesSectionProps {
  heading: string;
  highlight?: string;
  members: TeamMember[];
  dark?: boolean;
  variant?: "cards" | "list" | "compact" | string;
  elementStyles?: Record<string, string>;
}

type VariantProps = Omit<TeamProfilesSectionProps, "variant">;

function hasRealImage(src?: string): boolean {
  return !!src && (src.startsWith("data:") || src.startsWith("http"));
}

function SectionHeader({ heading, highlight, dark, elementStyles }: { heading: string; highlight?: string; dark: boolean; elementStyles?: Record<string, string> }) {
  return (
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
    </div>
  );
}

function SectionWrapper({ dark, children }: { dark: boolean; children: React.ReactNode }) {
  return (
    <section
      className={`py-12 @min-[768px]:py-16 @min-[1024px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-white"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">{children}</div>
    </section>
  );
}

/* ── List variant: always alternating rows ── */
function ListVariant({ heading, highlight, members = [], dark = false, elementStyles }: VariantProps) {
  return (
    <SectionWrapper dark={dark}>
      <SectionHeader heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />
      <div className="space-y-10 @min-[768px]:space-y-16">
        {members.map((member, idx) => {
          const imgLeft = idx % 2 === 0;
          const hasImg = hasRealImage(member.image);

          return (
            <div
              key={member.id || `member-${idx}`}
              className={`flex flex-col ${
                imgLeft ? "@min-[768px]:flex-row" : "@min-[768px]:flex-row-reverse"
              } gap-6 @min-[768px]:gap-8 items-center`}
            >
              <div className="w-full @min-[768px]:w-1/3 flex-shrink-0">
                {hasImg ? (
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.title}`}
                    className="w-full aspect-[4/5] object-cover rounded-xl"
                  />
                ) : (
                  <div className="w-full aspect-[4/5] bg-slate-200 rounded-xl flex items-center justify-center">
                    <span className="text-slate-400 text-sm">[Photo]</span>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3
                  className={`text-xl @min-[768px]:text-2xl font-bold mb-1 ${
                    dark ? "text-white" : "text-secondary"
                  }`}
                  style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
                >
                  {member.name}
                </h3>
                <p className="text-primary font-semibold mb-4" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>
                  {member.title}
                </p>
                <p
                  className={`leading-relaxed ${
                    dark ? "text-gray-300" : "text-gray-600"
                  }`}
                  style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                >
                  {member.bio}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

/* ── Compact variant: always grid, smaller cards, name + role only ── */
function CompactVariant({ heading, highlight, members = [], dark = false, elementStyles }: VariantProps) {
  const hasImages = members.some((m) => hasRealImage(m.image));

  return (
    <SectionWrapper dark={dark}>
      <SectionHeader heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />
      <div className="grid grid-cols-2 @min-[768px]:grid-cols-3 @min-[1024px]:grid-cols-4 gap-3 @min-[768px]:gap-4">
        {members.map((member, idx) => {
          const hasImg = hasRealImage(member.image);

          return (
            <div
              key={member.id || `member-${idx}`}
              className={`rounded-xl overflow-hidden transition-all ${
                dark
                  ? "bg-white/5 hover:bg-white/10"
                  : "bg-slate-50 border border-slate-100 hover:shadow-md"
              }`}
            >
              {hasImg || hasImages ? (
                hasImg ? (
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.title}`}
                    className="w-full h-32 @min-[768px]:h-40 object-cover"
                  />
                ) : (
                  <div className="w-full h-32 @min-[768px]:h-40 bg-slate-200 flex items-center justify-center">
                    <span className="text-slate-400 text-xs">[Photo]</span>
                  </div>
                )
              ) : null}
              <div className="p-3">
                <h3
                  className={`text-sm font-bold mb-0.5 ${
                    dark ? "text-white" : "text-secondary"
                  }`}
                  style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
                >
                  {member.name}
                </h3>
                <p className="text-primary text-xs font-semibold" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>
                  {member.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

/* ── Main export ── */
export const TeamProfilesSection: React.FC<TeamProfilesSectionProps> = ({
  heading,
  highlight,
  members = [],
  dark = false,
  variant = "default",
  elementStyles,
}) => {
  if (variant === "list")
    return <ListVariant heading={heading} highlight={highlight} members={members} dark={dark} elementStyles={elementStyles} />;

  if (variant === "compact")
    return <CompactVariant heading={heading} highlight={highlight} members={members} dark={dark} elementStyles={elementStyles} />;

  // Default / cards
  const hasImages = members.some(
    (m) => m.image?.startsWith("data:") || m.image?.startsWith("http"),
  );

  return (
    <SectionWrapper dark={dark}>
      <SectionHeader heading={heading} highlight={highlight} dark={dark} elementStyles={elementStyles} />
      {members.length <= 2 ? (
        <div className="space-y-10 @min-[768px]:space-y-16">
          {members.map((member, idx) => {
            const imgLeft = idx % 2 === 0;
            const hasImg =
              member.image?.startsWith("data:") ||
              member.image?.startsWith("http");

            return (
              <div
                key={member.id || `member-${idx}`}
                className={`flex flex-col ${
                  imgLeft ? "@min-[768px]:flex-row" : "@min-[768px]:flex-row-reverse"
                } gap-4 @min-[768px]:gap-8 items-center`}
              >
                <div className="w-full @min-[768px]:w-1/3 flex-shrink-0">
                  {hasImg ? (
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.title}`}
                      className="w-full aspect-[4/5] object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="w-full aspect-[4/5] bg-slate-200 rounded-2xl flex items-center justify-center">
                      <span className="text-slate-400 text-sm">[Photo]</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-xl @min-[768px]:text-2xl font-bold mb-1 ${
                      dark ? "text-white" : "text-secondary"
                    }`}
                    style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
                  >
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-4" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>
                    {member.title}
                  </p>
                  <p
                    className={`leading-relaxed ${
                      dark ? "text-gray-300" : "text-gray-600"
                    }`}
                    style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                  >
                    {member.bio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-3 gap-4 @min-[768px]:gap-8">
          {members.map((member, idx) => {
            const hasImg =
              member.image?.startsWith("data:") ||
              member.image?.startsWith("http");

            return (
              <div
                key={member.id || `member-${idx}`}
                className={`rounded-xl overflow-hidden transition-all ${
                  dark
                    ? "bg-white/5 hover:bg-white/10"
                    : "bg-slate-50 border border-slate-100 hover:shadow-md"
                }`}
              >
                {hasImg || hasImages ? (
                  hasImg ? (
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.title}`}
                      className="w-full aspect-square object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-slate-200 flex items-center justify-center">
                      <span className="text-slate-400 text-sm">[Photo]</span>
                    </div>
                  )
                ) : null}
                <div className="p-6">
                  <h3
                    className={`text-lg font-bold mb-1 ${
                      dark ? "text-white" : "text-secondary"
                    }`}
                    style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
                  >
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-semibold mb-3" style={elementStyles?.highlightColor ? { color: elementStyles.highlightColor } : undefined}>
                    {member.title}
                  </p>
                  <p
                    className={`text-sm leading-relaxed ${
                      dark ? "text-gray-400" : "text-gray-600"
                    }`}
                    style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                  >
                    {member.bio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </SectionWrapper>
  );
};
