"use client";

import React from "react";
import { Clock, AlertCircle } from "lucide-react";

interface DayHours {
  id: string;
  day: string;
  hours: string;
}

export interface BusinessHoursSectionProps {
  heading: string;
  schedule: DayHours[];
  emergencyText?: string;
  dark?: boolean;
  variant?: "card" | "split" | "minimal" | string;
  elementStyles?: Record<string, string>;
}

type VariantProps = Omit<BusinessHoursSectionProps, "variant">;

const TODAY_INDEX = new Date().getDay();
const DAY_NAMES = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const WEEKEND = ["saturday", "sunday"];

/* ─── Shared heading ─── */
function HoursHeading({ heading, dark, elementStyles }: Pick<VariantProps, "heading" | "dark" | "elementStyles">) {
  return (
    <div className="text-center mb-10">
      <Clock className="w-10 h-10 text-primary mx-auto mb-4" />
      <h2
        className={`text-3xl @min-[768px]:text-4xl font-bold ${
          dark ? "text-white" : "text-gray-900"
        }`}
        style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
      >
        {heading}
      </h2>
    </div>
  );
}

/* ─── Shared emergency text ─── */
function EmergencyNote({ emergencyText }: { emergencyText?: string }) {
  if (!emergencyText) return null;
  return (
    <div className="mt-6 flex items-center justify-center gap-2 text-primary font-semibold">
      <AlertCircle className="w-5 h-5" />
      <span className="break-words">{emergencyText}</span>
    </div>
  );
}

/* ─── Shared row renderer ─── */
function HoursRow({ row, idx, total, dark, elementStyles }: { row: DayHours; idx: number; total: number; dark: boolean; elementStyles?: Record<string, string> }) {
  const isToday = DAY_NAMES[TODAY_INDEX] === row.day.toLowerCase();
  const isClosed = row.hours.toLowerCase() === "closed" || row.hours.toLowerCase() === "n/a";

  return (
    <div
      key={row.id || `day-${idx}`}
      className={`flex items-center justify-between px-4 py-3 @min-[768px]:px-6 @min-[768px]:py-4 ${
        idx < total - 1
          ? dark
            ? "border-b border-white/10"
            : "border-b border-slate-100"
          : ""
      } ${
        isToday
          ? dark
            ? "bg-primary/20"
            : "bg-primary/5"
          : ""
      }`}
      style={isToday && elementStyles?.accentColor ? { backgroundColor: `${elementStyles.accentColor}15` } : undefined}
    >
      <span
        className={`font-semibold ${
          isToday
            ? "text-primary"
            : dark
              ? "text-gray-200"
              : "text-gray-800"
        }`}
      >
        {row.day}
        {isToday && (
          <span className="ml-2 text-xs font-bold bg-primary text-on-primary px-2 py-0.5 rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}>
            Today
          </span>
        )}
      </span>
      <span
        className={`min-w-0 ${
          isClosed
            ? "text-red-400 font-medium"
            : dark
              ? "text-gray-300"
              : "text-gray-600"
        }`}
        style={!isClosed && elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
      >
        {row.hours}
      </span>
    </div>
  );
}

/* ─── Split variant ─── */
function SplitVariant({ heading, schedule = [], emergencyText, dark = false, elementStyles }: VariantProps) {
  const weekdayRows = schedule.filter((r) => WEEKDAYS.includes(r.day.toLowerCase()));
  const weekendRows = schedule.filter((r) => WEEKEND.includes(r.day.toLowerCase()));

  const hasWeekdays = weekdayRows.length > 0;
  const hasWeekend = weekendRows.length > 0;
  const hasBoth = hasWeekdays && hasWeekend;

  function CardGroup({ title, rows }: { title: string; rows: DayHours[] }) {
    return (
      <div
        className={`rounded-2xl overflow-hidden ${
          dark ? "bg-white/5" : "bg-white shadow-sm border border-slate-200"
        }`}
      >
        <div
          className={`px-4 py-3 @min-[768px]:px-6 @min-[768px]:py-4 font-bold text-sm uppercase tracking-wider ${
            dark ? "bg-white/5 text-gray-400" : "bg-slate-50 text-gray-500"
          }`}
        >
          {title}
        </div>
        {rows.map((row, idx) => (
          <HoursRow key={row.id || `day-${idx}`} row={row} idx={idx} total={rows.length} dark={dark} elementStyles={elementStyles} />
        ))}
      </div>
    );
  }

  return (
    <section
      className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
      }`}
    >
      <div className={`mx-auto ${hasBoth ? "max-w-[800px]" : "max-w-[600px]"}`}>
        <HoursHeading heading={heading} dark={dark} elementStyles={elementStyles} />

        <div className={hasBoth ? "grid @min-[768px]:grid-cols-2 gap-4 @min-[768px]:gap-6" : ""}>
          {hasWeekdays && <CardGroup title="Weekdays" rows={weekdayRows} />}
          {hasWeekend && <CardGroup title="Weekend" rows={weekendRows} />}
        </div>

        <EmergencyNote emergencyText={emergencyText} />
      </div>
    </section>
  );
}

/* ─── Minimal variant ─── */
function MinimalVariant({ heading, schedule = [], emergencyText, dark = false, elementStyles }: VariantProps) {
  return (
    <section
      className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
      }`}
    >
      <div className="max-w-[600px] mx-auto">
        <HoursHeading heading={heading} dark={dark} elementStyles={elementStyles} />

        <div className={`divide-y ${dark ? "divide-white/10" : "divide-slate-200"}`}>
          {schedule.map((row, idx) => {
            const isToday = DAY_NAMES[TODAY_INDEX] === row.day.toLowerCase();
            const isClosed = row.hours.toLowerCase() === "closed" || row.hours.toLowerCase() === "n/a";

            return (
              <div
                key={row.id || `day-${idx}`}
                className={`flex items-center justify-between py-3 @min-[768px]:py-4 ${
                  isToday
                    ? dark
                      ? "bg-primary/10 -mx-4 px-4 rounded-lg"
                      : "bg-primary/5 -mx-4 px-4 rounded-lg"
                    : ""
                }`}
              >
                <span
                  className={`font-semibold ${
                    isToday
                      ? "text-primary"
                      : dark
                        ? "text-gray-200"
                        : "text-gray-800"
                  }`}
                >
                  {row.day}
                  {isToday && (
                    <span className="ml-2 text-xs font-bold bg-primary text-on-primary px-2 py-0.5 rounded-full" style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}>
                      Today
                    </span>
                  )}
                </span>
                <span
                  className={`min-w-0 ${
                    isClosed
                      ? "text-red-400 font-medium"
                      : dark
                        ? "text-gray-300"
                        : "text-gray-600"
                  }`}
                  style={!isClosed && elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}
                >
                  {row.hours}
                </span>
              </div>
            );
          })}
        </div>

        <EmergencyNote emergencyText={emergencyText} />
      </div>
    </section>
  );
}

/* ─── Main export (card = default) ─── */
export const BusinessHoursSection: React.FC<BusinessHoursSectionProps> = ({
  heading,
  schedule = [],
  emergencyText,
  dark = false,
  variant = "default",
  elementStyles,
}) => {
  const allProps: VariantProps = { heading, schedule, emergencyText, dark, elementStyles };

  if (variant === "split") return <SplitVariant {...allProps} />;
  if (variant === "minimal") return <MinimalVariant {...allProps} />;

  return (
    <section
      className={`py-16 @min-[768px]:py-20 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary text-white" : "bg-slate-50"
      }`}
    >
      <div className="max-w-[600px] mx-auto">
        <HoursHeading heading={heading} dark={dark} elementStyles={elementStyles} />

        <div
          className={`rounded-2xl overflow-hidden ${
            dark ? "bg-white/5" : "bg-white shadow-sm border border-slate-200"
          }`}
        >
          {schedule.map((row, idx) => (
            <HoursRow key={row.id || `day-${idx}`} row={row} idx={idx} total={schedule.length} dark={dark} elementStyles={elementStyles} />
          ))}
        </div>

        <EmergencyNote emergencyText={emergencyText} />
      </div>
    </section>
  );
};
