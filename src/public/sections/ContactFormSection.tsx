"use client";

import React, { useState, useMemo } from "react";
import { Send, Loader2, CheckCircle, Calendar, Phone as PhoneIcon } from "lucide-react";

export interface FormFieldConfig {
  id: string;
  label: string;
  type: "text" | "email" | "phone" | "select" | "textarea" | "checkbox" | "date" | "radio";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  halfWidth?: boolean;
}

interface ServiceOption {
  id: string;
  label: string;
}

export interface ContactFormSectionProps {
  heading: string;
  description?: string;
  services: ServiceOption[];
  phone: string;
  email: string;
  address: string;
  mapQuery?: string;
  dark?: boolean;
  variant?: "standard" | "stacked" | "formOnly" | "quoteRequest" | "appointment" | "callback" | "newsletter" | string;
  fields?: FormFieldConfig[];
  submitLabel?: string;
  successMessage?: string;
  elementStyles?: Record<string, string>;
}

const DEFAULT_CONTACT_FIELDS: FormFieldConfig[] = [
  { id: "name", label: "Your Full Name", type: "text", required: true },
  { id: "phone", label: "Phone Number", type: "phone", required: true, halfWidth: true },
  { id: "email", label: "Email Address", type: "email", required: true, halfWidth: true },
  { id: "service", label: "Select a Service", type: "select", required: true },
  { id: "contactMethod", label: "Preferred Contact Method", type: "radio", options: ["Phone Call", "Email", "Text Message"] },
  { id: "message", label: "Tell us about your project or question...", type: "textarea", required: true },
];

const QUOTE_REQUEST_FIELDS: FormFieldConfig[] = [
  { id: "name", label: "Full Name", type: "text", required: true },
  { id: "email", label: "Email", type: "email", required: true, halfWidth: true },
  { id: "phone", label: "Phone", type: "phone", required: true, halfWidth: true },
  { id: "service", label: "Service Needed", type: "select", required: true },
  { id: "address", label: "Property Address", type: "text", required: false },
  { id: "timeline", label: "When do you need this done?", type: "select", options: ["ASAP", "Within 1 week", "Within 2 weeks", "Within a month", "Flexible"] },
  { id: "budget", label: "Estimated Budget", type: "select", options: ["Under $500", "$500-$1,000", "$1,000-$5,000", "$5,000-$10,000", "$10,000+", "Not sure"] },
  { id: "details", label: "Project Details", type: "textarea", required: true },
];

const APPOINTMENT_FIELDS: FormFieldConfig[] = [
  { id: "name", label: "Full Name", type: "text", required: true },
  { id: "email", label: "Email", type: "email", required: true, halfWidth: true },
  { id: "phone", label: "Phone", type: "phone", required: true, halfWidth: true },
  { id: "service", label: "Service", type: "select", required: true },
  { id: "preferredDate", label: "Preferred Date", type: "date", required: true, halfWidth: true },
  { id: "preferredTime", label: "Preferred Time", type: "select", required: true, halfWidth: true, options: ["Morning (8am-12pm)", "Afternoon (12pm-4pm)", "Evening (4pm-7pm)"] },
  { id: "notes", label: "Additional Notes", type: "textarea" },
];

const CALLBACK_FIELDS: FormFieldConfig[] = [
  { id: "name", label: "Your Name", type: "text", required: true },
  { id: "phone", label: "Best Number to Reach You", type: "phone", required: true },
  { id: "callTime", label: "Best Time to Call", type: "select", required: true, options: ["Morning", "Afternoon", "Evening", "Anytime"] },
  { id: "reason", label: "What's this about?", type: "select" },
  { id: "notes", label: "Brief Message (Optional)", type: "textarea" },
];

const NEWSLETTER_FIELDS: FormFieldConfig[] = [
  { id: "email", label: "Email Address", type: "email", required: true },
  { id: "name", label: "First Name (Optional)", type: "text" },
  { id: "interests", label: "I'm interested in...", type: "checkbox", options: ["Tips & Guides", "Special Offers", "Company News", "New Services"] },
];

function getDefaultFieldsForVariant(variant: string): FormFieldConfig[] {
  switch (variant) {
    case "quoteRequest": return QUOTE_REQUEST_FIELDS;
    case "appointment": return APPOINTMENT_FIELDS;
    case "callback": return CALLBACK_FIELDS;
    case "newsletter": return NEWSLETTER_FIELDS;
    default: return DEFAULT_CONTACT_FIELDS;
  }
}

export const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  heading,
  description,
  services = [],
  phone,
  email,
  address,
  mapQuery,
  dark = false,
  variant = "standard",
  fields,
  submitLabel,
  successMessage,
  elementStyles,
}) => {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [formData, setFormData] = useState<Record<string, string | string[]>>({});
  const [honeypot, setHoneypot] = useState("");

  const resolvedFields = useMemo(() => {
    if (fields && fields.length > 0) return fields;
    return getDefaultFieldsForVariant(variant);
  }, [fields, variant]);

  const handleChange = (fieldId: string, value: string) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleCheckbox = (fieldId: string, option: string, checked: boolean) => {
    setFormData((prev) => {
      const current = (prev[fieldId] as string[]) || [];
      return {
        ...prev,
        [fieldId]: checked
          ? [...current, option]
          : current.filter((o) => o !== option),
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;
    setFormState("sending");
    setTimeout(() => setFormState("sent"), 1500);
  };

  const encodedAddress = encodeURIComponent(mapQuery || address || "");

  const defaultSubmitLabel = variant === "newsletter" ? "Subscribe" :
    variant === "callback" ? "Request Callback" :
    variant === "appointment" ? "Book Appointment" :
    variant === "quoteRequest" ? "Get My Free Quote" : "Send Message";

  const defaultSuccess = variant === "newsletter" ? "You're subscribed!" :
    variant === "callback" ? "We'll call you back soon!" :
    variant === "appointment" ? "Appointment request received!" :
    variant === "quoteRequest" ? "Quote request submitted!" : "Message Sent!";

  const renderField = (field: FormFieldConfig) => {
    const baseClass = "w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary";

    switch (field.type) {
      case "textarea":
        return (
          <textarea
            name={field.id}
            value={(formData[field.id] as string) || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder || `${field.label}${field.required ? " *" : ""}`}
            required={field.required}
            rows={4}
            className={`${baseClass} resize-y`}
          />
        );

      case "select":
        return (
          <select
            name={field.id}
            value={(formData[field.id] as string) || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
            className={baseClass}
          >
            <option value="">{field.placeholder || `${field.label}${field.required ? " *" : ""}`}</option>
            {field.id === "service" && !field.options ? (
              <>
                {services.map((svc, i) => (
                  <option key={svc.id || `svc-${i}`} value={svc.label}>{svc.label}</option>
                ))}
                <option value="General Inquiry">General Inquiry</option>
                <option value="Other">Other</option>
              </>
            ) : (
              field.options?.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))
            )}
          </select>
        );

      case "radio":
        return (
          <div>
            <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
              {field.label}
            </label>
            <div className="flex flex-wrap gap-3 @min-[768px]:gap-6">
              {(field.options || []).map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={field.id}
                    value={opt}
                    checked={(formData[field.id] as string) === opt}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case "checkbox":
        return (
          <div>
            <label className={`block text-sm font-medium mb-2 ${dark ? "text-gray-300" : "text-gray-700"}`}>
              {field.label}
            </label>
            <div className="flex flex-wrap gap-3">
              {(field.options || []).map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={((formData[field.id] as string[]) || []).includes(opt)}
                    onChange={(e) => handleCheckbox(field.id, opt, e.target.checked)}
                    className="text-primary focus:ring-primary rounded"
                  />
                  <span className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case "date":
        return (
          <input
            type="date"
            name={field.id}
            value={(formData[field.id] as string) || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            required={field.required}
            className={baseClass}
          />
        );

      default:
        return (
          <input
            type={field.type === "phone" ? "tel" : field.type}
            name={field.id}
            value={(formData[field.id] as string) || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder || `${field.label}${field.required ? " *" : ""}`}
            required={field.required}
            className={baseClass}
          />
        );
    }
  };

  const renderForm = (className?: string) => (
    <div className={`p-4 @min-[768px]:p-8 @min-[1024px]:p-10 ${dark ? "bg-zinc-900" : "bg-white"} ${className || ""}`}>
      {formState === "sent" ? (
        <div className="flex flex-col items-center justify-center h-full text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
          <h3 className={`text-xl @min-[768px]:text-2xl font-bold mb-2 ${dark ? "text-white" : "text-gray-900"}`}>
            {successMessage || defaultSuccess}
          </h3>
          <p className={dark ? "text-gray-400" : "text-gray-600"}>
            We&apos;ll get back to you within 1-4 hours during business hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <h3 className={`text-xl font-bold mb-2 ${dark ? "text-white" : "text-gray-900"}`}>
            {variant === "newsletter" ? "Stay Updated" :
             variant === "callback" ? "Request a Callback" :
             variant === "appointment" ? "Book an Appointment" :
             variant === "quoteRequest" ? "Get a Free Quote" : "Send Us a Message"}
          </h3>

          {resolvedFields.map((field, idx) => {
            const nextField = resolvedFields[idx + 1];
            const isHalf = field.halfWidth && nextField?.halfWidth;

            if (field.halfWidth && idx > 0 && resolvedFields[idx - 1]?.halfWidth) {
              return null;
            }

            if (isHalf) {
              return (
                <div key={field.id} className="grid @min-[640px]:grid-cols-2 gap-4">
                  {renderField(field)}
                  {renderField(nextField)}
                </div>
              );
            }

            return <div key={field.id}>{renderField(field)}</div>;
          })}

          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute -left-[9999px] opacity-0"
            tabIndex={-1}
            autoComplete="off"
          />

          <button
            type="submit"
            disabled={formState === "sending"}
            className="w-full bg-primary text-on-primary font-bold py-4 rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            style={elementStyles?.accentColor ? { backgroundColor: elementStyles.accentColor } : undefined}
          >
            {formState === "sending" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                {variant === "appointment" ? <Calendar className="w-5 h-5" /> :
                 variant === "callback" ? <PhoneIcon className="w-5 h-5" /> :
                 <Send className="w-5 h-5" />}
                {submitLabel || defaultSubmitLabel}
              </>
            )}
          </button>

          <p className={`text-xs ${dark ? "text-gray-500" : "text-gray-400"}`}>
            * Required fields. We&apos;ll never share your information.
          </p>
        </form>
      )}
    </div>
  );

  const renderMap = (className?: string) => (
    <div className={`bg-slate-200 relative ${className || "min-h-[400px]"}`}>
      {encodedAddress ? (
        <iframe
          title="Business Location"
          src={`https://maps.google.com/maps?q=${encodedAddress}&output=embed`}
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-sm">
          [Google Map]
        </div>
      )}
    </div>
  );

  const renderQuickContact = () => (
    <div className="mt-8 flex flex-wrap justify-center gap-4 @min-[768px]:gap-8 text-sm">
      {phone && (
        <a href={`tel:${phone.replace(/\D/g, "")}`} className="flex items-center gap-2 text-primary font-semibold hover:underline" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>
          📞 {phone}
        </a>
      )}
      {email && (
        <a href={`mailto:${email}`} className="flex items-center gap-2 text-primary font-semibold hover:underline" style={elementStyles?.accentColor ? { color: elementStyles.accentColor } : undefined}>
          ✉️ {email}
        </a>
      )}
      {address && (
        <span className={`break-words ${dark ? "text-gray-400" : "text-gray-600"}`}>📍 {address}</span>
      )}
    </div>
  );

  const renderHeading = () =>
    heading ? (
      <div className="text-center mb-12">
        <h2
          className={`text-3xl @min-[768px]:text-4xl font-bold mb-4 ${
            dark ? "text-white" : "text-gray-900"
          }`}
          style={elementStyles?.headingColor ? { color: elementStyles.headingColor } : undefined}
        >
          {heading}
        </h2>
        {description && (
          <p className={`text-lg max-w-2xl mx-auto ${dark ? "text-gray-300" : "text-gray-600"}`} style={elementStyles?.bodyColor ? { color: elementStyles.bodyColor } : undefined}>
            {description}
          </p>
        )}
      </div>
    ) : null;

  const showMap = !["formOnly", "newsletter", "callback"].includes(variant);

  const renderContent = () => {
    if (variant === "stacked") {
      return (
        <>
          <div className={`rounded-2xl overflow-hidden shadow-lg border ${dark ? "border-zinc-700" : "border-slate-200"}`}>
            {renderForm()}
          </div>
          {showMap && (
            <div className="mt-6 rounded-2xl overflow-hidden shadow-lg">
              {renderMap("h-[350px] @min-[768px]:h-[400px]")}
            </div>
          )}
        </>
      );
    }

    if (!showMap) {
      return (
        <div className="max-w-[700px] mx-auto">
          <div className={`rounded-2xl overflow-hidden shadow-lg border ${dark ? "border-zinc-700" : "border-slate-200"}`}>
            {renderForm()}
          </div>
        </div>
      );
    }

    return (
      <div className={`grid @min-[1024px]:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-lg border ${dark ? "border-zinc-700" : "border-slate-200"}`}>
        {renderForm()}
        {renderMap("min-h-[400px] @min-[1024px]:min-h-0")}
      </div>
    );
  };

  return (
    <section
      className={`py-20 @min-[768px]:py-24 px-4 @min-[768px]:px-8 ${
        dark ? "bg-secondary" : "bg-white"
      }`}
    >
      <div className="max-w-[1200px] mx-auto">
        {renderHeading()}
        {renderContent()}
        {variant !== "newsletter" && renderQuickContact()}
      </div>
    </section>
  );
};
