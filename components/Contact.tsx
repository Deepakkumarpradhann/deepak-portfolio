"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Github, Linkedin, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { site } from "@/data/site";
import { validateContact, type ContactErrors, type ContactValues } from "@/lib/validation";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { MagneticButton } from "./MagneticButton";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const empty: ContactValues = { name: "", email: "", message: "" };

export function Contact() {
  const [values, setValues] = useState<ContactValues>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactValues, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  const update = (key: keyof ContactValues, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key]) setErrors(validateContact(next));
  };

  const blur = (key: keyof ContactValues) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validateContact(values));
  };

  const openMailto = () => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name.trim()}`);
    const body = encodeURIComponent(`${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot }),
      });
      const data: { ok?: boolean; fallback?: boolean } = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("sent");
        setValues(empty);
        setTouched({});
      } else if (data.fallback) {
        // Server has no email provider configured: hand the message to the visitor's mail app.
        setStatus("mailto");
        openMailto();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const field = (key: keyof ContactValues) =>
    `w-full rounded-xl border bg-bg/60 px-4 py-3 outline-none transition placeholder:text-muted/60 focus:border-cyan focus:ring-2 focus:ring-cyan/30 ${
      errors[key] ? "border-red-400" : "border-line"
    }`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative px-4 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading id="contact-title" index="06" eyebrow="Contact" title="Let&apos;s build something.">
          Email is the quickest way to reach me.
        </SectionHeading>

        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <div className="glass h-full rounded-3xl p-8">
              <p className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1 text-sm text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
                {site.availability.label}
              </p>

              <ul className="mt-8 space-y-5">
                <li>
                  <a href={`mailto:${site.email}`} className="group flex items-center gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet/15 text-violet transition group-hover:bg-violet group-hover:text-white">
                      <Mail size={20} aria-hidden />
                    </span>
                    <span className="break-all">{site.email}</span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.phone.replace(/[^+\d]/g, "")}`} className="group flex items-center gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet/15 text-violet transition group-hover:bg-violet group-hover:text-white">
                      <Phone size={20} aria-hidden />
                    </span>
                    {site.phone}
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet/15 text-violet">
                    <MapPin size={20} aria-hidden />
                  </span>
                  {site.location}
                </li>
                {site.linkedin && (
                  <li>
                    <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet/15 text-violet transition group-hover:bg-violet group-hover:text-white">
                        <Linkedin size={20} aria-hidden />
                      </span>
                      LinkedIn
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                )}
                {site.github && (
                  <li>
                    <a href={site.github} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-violet/15 text-violet transition group-hover:bg-violet group-hover:text-white">
                        <Github size={20} aria-hidden />
                      </span>
                      GitHub
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} noValidate className="glass rounded-3xl p-8" aria-label="Contact form">
              <div className="space-y-5">
                <div>
                  <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="c-name"
                    name="name"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    onBlur={() => blur("name")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "c-name-err" : undefined}
                    className={field("name")}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p id="c-name-err" role="alert" className="mt-1.5 text-sm text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => blur("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "c-email-err" : undefined}
                    className={field("email")}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p id="c-email-err" role="alert" className="mt-1.5 text-sm text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="c-message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    onBlur={() => blur("message")}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "c-message-err" : undefined}
                    className={`${field("message")} resize-y`}
                    placeholder="Tell me about the role or project…"
                  />
                  {errors.message && (
                    <p id="c-message-err" role="alert" className="mt-1.5 text-sm text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Honeypot: hidden from people, tempting to bots */}
                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                  <label>
                    Website
                    <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                  </label>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <MagneticButton>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric via-violet to-cyan px-6 py-3 font-medium text-white shadow-[0_0_30px_-4px_rgb(var(--violet)/0.7)] transition hover:brightness-110 disabled:opacity-60"
                    >
                      {status === "sending" ? (
                        <Loader2 size={18} className="animate-spin" aria-hidden />
                      ) : (
                        <Send size={18} aria-hidden />
                      )}
                      {status === "sending" ? "Sending…" : "Send message"}
                    </button>
                  </MagneticButton>

                  <p role="status" aria-live="polite" className="text-sm">
                    {status === "sent" && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-1.5 text-emerald-400"
                      >
                        <CheckCircle2 size={16} aria-hidden /> Message sent. I&apos;ll reply soon.
                      </motion.span>
                    )}
                    {status === "mailto" && (
                      <span className="text-muted">Opening your email app with the message ready to send.</span>
                    )}
                    {status === "error" && (
                      <span className="text-red-400">
                        Couldn&apos;t send that. Please email{" "}
                        <a className="underline" href={`mailto:${site.email}`}>
                          {site.email}
                        </a>{" "}
                        instead.
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
