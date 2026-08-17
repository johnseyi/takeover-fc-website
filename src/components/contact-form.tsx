"use client";

import { useState, type FormEvent } from "react";
import { contact } from "@/content/site";

const ENQUIRY_TYPES = [
  "General",
  "Partnership",
  "Sponsorship",
  "Media",
  "Player",
  "Coaching",
  "Volunteer",
  "Support",
  "Careers",
] as const;

/** Route each enquiry type to the inbox that should receive it. */
const routing: Record<string, string> = {
  Partnership: contact.partnerships,
  Sponsorship: contact.partnerships,
  Media: contact.media,
  Player: contact.players,
  Coaching: contact.players,
  Volunteer: contact.players,
};

const fieldClass =
  "w-full rounded-lg border border-cream/15 bg-cream/[0.04] px-4 py-3 text-sm text-cream placeholder:text-cream/30 focus:border-gold-400/60 focus:outline-none";

const labelClass =
  "block text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-cream/50";

/**
 * Contact form (§45).
 *
 * There is no server or CMS behind the site yet, so rather than pretend to
 * submit, the form composes a fully-populated email in the visitor's mail client
 * and says so plainly. Swap `handleSubmit` for a POST to a form endpoint when a
 * backend exists — the markup and validation do not need to change.
 */
export function ContactForm({
  defaultEnquiry = "General",
  compact = false,
}: {
  defaultEnquiry?: string;
  compact?: boolean;
}) {
  const [enquiry, setEnquiry] = useState(defaultEnquiry);
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const phone = String(data.get("phone") ?? "");
    const organisation = String(data.get("organisation") ?? "");
    const message = String(data.get("message") ?? "");
    const type = String(data.get("enquiryType") ?? "General");

    const to = routing[type] ?? contact.general;
    const subject = `${type} enquiry — ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      organisation ? `Organisation: ${organisation}` : null,
      `Enquiry type: ${type}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className={compact ? "space-y-5" : "grid gap-5 sm:grid-cols-2"}>
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Name <span className="text-gold-400">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`${fieldClass} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="cf-email" className={labelClass}>
            Email <span className="text-gold-400">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${fieldClass} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="cf-phone" className={labelClass}>
            Phone
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`${fieldClass} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="cf-org" className={labelClass}>
            Organisation
          </label>
          <input
            id="cf-org"
            name="organisation"
            type="text"
            autoComplete="organization"
            className={`${fieldClass} mt-2`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-type" className={labelClass}>
          Enquiry type <span className="text-gold-400">*</span>
        </label>
        <select
          id="cf-type"
          name="enquiryType"
          required
          value={enquiry}
          onChange={(event) => setEnquiry(event.target.value)}
          className={`${fieldClass} mt-2 appearance-none`}
        >
          {ENQUIRY_TYPES.map((type) => (
            <option key={type} value={type} className="bg-pitch-900">
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>
          Message <span className="text-gold-400">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={6}
          className={`${fieldClass} mt-2 resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          className="rounded-full bg-emerald-500 px-7 py-3.5 text-[0.8125rem] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-emerald-400 hover:text-pitch-950"
        >
          Send enquiry
        </button>
        <p aria-live="polite" className="text-xs text-cream/45">
          {sent
            ? "Your email client should now be open with the message ready to send."
            : "This opens a pre-filled email in your mail application."}
        </p>
      </div>
    </form>
  );
}
