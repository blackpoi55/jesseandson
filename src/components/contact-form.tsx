"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, Mail } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { LineIcon, WhatsAppIcon } from "@/components/brand/icons";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const garments = ["Suit", "Jacket", "Shirt", "Pants", "Overcoat", "Waistcoat", "Tuxedo", "Skirt", "Dress", "Shoes", "Accessories"];
const times = ["Morning", "Lunch", "Afternoon", "Evening"];

type Mode = "general" | "appointment";
type Status = "idle" | "sending" | "sent" | "fallback";
type Values = {
  name: string;
  email: string;
  phone: string;
  garment: string;
  visitDate: string;
  visitTime: string;
  message: string;
  company: string; // honeypot
};

const empty: Values = { name: "", email: "", phone: "", garment: "", visitDate: "", visitTime: "", message: "", company: "" };

function compose(mode: Mode, v: Values) {
  const lines = [
    mode === "appointment" ? "Appointment request" : "General enquiry",
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    v.phone && `Phone: ${v.phone}`,
    v.garment && `Garment: ${v.garment}`,
    v.visitDate && `Planned visit: ${v.visitDate}${v.visitTime ? ` (${v.visitTime})` : ""}`,
    "",
    v.message,
  ].filter((l): l is string => typeof l === "string");
  return lines.join("\n");
}

export function ContactForm({
  defaultMode = "appointment",
  showTabs = true,
  submitLabel,
  className,
}: {
  defaultMode?: Mode;
  showTabs?: boolean;
  submitLabel?: string;
  className?: string;
}) {
  const uid = useId();
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  // Deep links: /contact#appointment or #enquiry
  useEffect(() => {
    if (!showTabs) return;
    const fromHash = () => {
      const h = window.location.hash;
      if (h === "#appointment") setMode("appointment");
      if (h === "#enquiry") setMode("general");
    };
    const t = setTimeout(fromHash, 0);
    window.addEventListener("hashchange", fromHash);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [showTabs]);

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!values.name.trim()) e.name = "Please tell us your name";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = "Enter a valid email address";
    if (mode === "general" && !values.message.trim()) e.message = "Let us know how we can help";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, ...values }),
      });
      setStatus(res.ok ? "sent" : "fallback");
    } catch {
      setStatus("fallback");
    }
  };

  const text = compose(mode, values);
  const subject = mode === "appointment" ? "Appointment request" : "Website enquiry";

  const field =
    "peer w-full border-0 border-b border-line bg-transparent px-0 pt-6 pb-3 text-[1.02rem] text-fg outline-none transition-colors placeholder:text-transparent focus:border-gold focus:ring-0";
  const label =
    "pointer-events-none absolute top-6 left-0 origin-left text-[0.95rem] text-subtle transition-all duration-300 peer-focus:top-0 peer-focus:scale-[0.78] peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-[0.78]";

  return (
    <div className={cn("relative", className)}>
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center py-16 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
              className="btn-gold flex size-20 items-center justify-center rounded-full"
            >
              <Check className="size-9" strokeWidth={1.5} />
            </motion.span>
            <h3 className="mt-8 font-serif text-4xl">Thank you.</h3>
            <p className="mt-3 max-w-md text-muted">
              Your {mode === "appointment" ? "appointment request" : "enquiry"} has been sent. Jesse or Manop will be in
              touch during opening hours.
            </p>
            <button
              onClick={() => {
                setValues(empty);
                setStatus("idle");
              }}
              className="mt-8 text-[0.7rem] tracking-[0.25em] text-gold uppercase hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : status === "fallback" ? (
          <motion.div key="fallback" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-10">
            <h3 className="font-serif text-4xl">Almost there.</h3>
            <p className="mt-3 max-w-lg text-muted">
              Choose how you&apos;d like to send your message — everything you typed is already filled in.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`}
                className="flex items-center justify-center gap-3 rounded-[3px] border border-line px-5 py-4 transition hover:border-gold hover:text-gold"
              >
                <Mail className="size-5" strokeWidth={1.4} /> Email
              </a>
              <a
                href={`${site.whatsapp}?text=${encodeURIComponent(text)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 rounded-[3px] border border-line px-5 py-4 transition hover:border-[#25D366] hover:text-[#25D366]"
              >
                <WhatsAppIcon className="size-5" /> WhatsApp
              </a>
              <a
                href={site.line.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => navigator.clipboard?.writeText(text).catch(() => {})}
                className="flex items-center justify-center gap-3 rounded-[3px] border border-line px-5 py-4 transition hover:border-[#06C755] hover:text-[#06C755]"
              >
                <LineIcon className="size-5" /> LINE
              </a>
            </div>
            <p className="mt-4 text-xs text-subtle">Choosing LINE copies your message so you can paste it into the chat.</p>
            <button onClick={() => setStatus("idle")} className="mt-8 text-[0.7rem] tracking-[0.25em] text-gold uppercase hover:underline">
              ← Back to the form
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" noValidate onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {showTabs && (
              <div role="tablist" className="mb-10 inline-flex rounded-full border border-line p-1">
                {(["appointment", "general"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    role="tab"
                    aria-selected={mode === m}
                    onClick={() => setMode(m)}
                    className={cn(
                      "relative rounded-full px-5 py-2.5 text-[0.7rem] font-medium tracking-[0.2em] uppercase transition-colors",
                      mode === m ? "text-ink" : "text-muted hover:text-fg",
                    )}
                  >
                    {mode === m && (
                      <motion.span layoutId={`${uid}-tab`} className="btn-gold absolute inset-0 rounded-full" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                    )}
                    <span className="relative">{m === "appointment" ? "Book an appointment" : "General enquiry"}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              <div className="relative">
                <input id={`${uid}-name`} className={field} placeholder=" " value={values.name} onChange={set("name")} autoComplete="name" aria-invalid={!!errors.name} />
                <label htmlFor={`${uid}-name`} className={label}>
                  Your name *
                </label>
                {errors.name && <p className="mt-2 text-sm text-[#d9667a]">{errors.name}</p>}
              </div>
              <div className="relative">
                <input id={`${uid}-email`} type="email" className={field} placeholder=" " value={values.email} onChange={set("email")} autoComplete="email" aria-invalid={!!errors.email} />
                <label htmlFor={`${uid}-email`} className={label}>
                  Email address *
                </label>
                {errors.email && <p className="mt-2 text-sm text-[#d9667a]">{errors.email}</p>}
              </div>
              <div className="relative">
                <input id={`${uid}-phone`} type="tel" className={field} placeholder=" " value={values.phone} onChange={set("phone")} autoComplete="tel" />
                <label htmlFor={`${uid}-phone`} className={label}>
                  Phone / WhatsApp
                </label>
              </div>
              <div className="relative">
                <select id={`${uid}-garment`} className={cn(field, "appearance-none")} value={values.garment} onChange={set("garment")}>
                  <option value="" disabled hidden />
                  {garments.map((g) => (
                    <option key={g} value={g} className="bg-elevated text-fg">
                      {g}
                    </option>
                  ))}
                </select>
                <label htmlFor={`${uid}-garment`} className={cn(label, values.garment && "top-0 scale-[0.78]")}>
                  Garment you&apos;re interested in
                </label>
                <span className="pointer-events-none absolute right-0 bottom-4 text-gold">▾</span>
              </div>

              <AnimatePresence initial={false}>
                {mode === "appointment" && (
                  <motion.div
                    key="visit"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid gap-x-8 gap-y-7 overflow-hidden sm:col-span-2 sm:grid-cols-2"
                  >
                    <div className="relative">
                      <input id={`${uid}-date`} type="date" className={cn(field, "[color-scheme:inherit]")} value={values.visitDate} onChange={set("visitDate")} />
                      <label htmlFor={`${uid}-date`} className="absolute top-0 left-0 origin-left scale-[0.78] text-[0.95rem] text-subtle">
                        Planned date of visit
                      </label>
                    </div>
                    <div className="relative">
                      <select id={`${uid}-time`} className={cn(field, "appearance-none")} value={values.visitTime} onChange={set("visitTime")}>
                        <option value="" disabled hidden />
                        {times.map((t) => (
                          <option key={t} value={t} className="bg-elevated text-fg">
                            {t}
                          </option>
                        ))}
                      </select>
                      <label htmlFor={`${uid}-time`} className={cn(label, values.visitTime && "top-0 scale-[0.78]")}>
                        Preferred time
                      </label>
                      <span className="pointer-events-none absolute right-0 bottom-4 text-gold">▾</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative sm:col-span-2">
                <textarea
                  id={`${uid}-message`}
                  rows={4}
                  className={cn(field, "resize-none")}
                  placeholder=" "
                  value={values.message}
                  onChange={set("message")}
                  aria-invalid={!!errors.message}
                />
                <label htmlFor={`${uid}-message`} className={label}>
                  {mode === "appointment" ? "Occasion, fabrics, dates in Bangkok…" : "How can we help? *"}
                </label>
                {errors.message && <p className="mt-2 text-sm text-[#d9667a]">{errors.message}</p>}
              </div>
              {/* Honeypot */}
              <input type="text" name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={set("company")} className="hidden" aria-hidden />
            </div>

            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-subtle">
                By sending, you agree to our{" "}
                <a href="/privacy-policy" className="text-gold underline-offset-4 hover:underline">
                  privacy policy
                </a>
                .
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-gold group/btn inline-flex h-14 items-center justify-center gap-3 rounded-[3px] px-10 font-serif text-[1.3rem] italic disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="size-5 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    {submitLabel ?? (mode === "appointment" ? "Request appointment" : "Send enquiry")}
                    <span className="transition-transform group-hover/btn:translate-x-1">→</span>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
