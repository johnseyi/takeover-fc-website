import Image from "next/image";
import Link from "next/link";
import { contact, footerNav, legalNav, site, socials } from "@/content/site";
import { TakeoverLine } from "@/components/ui";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream/10 bg-pitch-950">
      <TakeoverLine className="opacity-90" />

      <div className="takeover-grid">
        <div className="mx-auto max-w-[88rem] px-5 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,2.4fr)]">
            {/* Identity */}
            <div>
              <Link href="/" className="flex items-center gap-4">
                <Image
                  src="/logo.png"
                  alt=""
                  width={51}
                  height={64}
                  className="h-14 w-auto"
                />
                <span className="leading-none">
                  <span className="display block text-2xl text-cream">Takeover FC</span>
                  <span className="eyebrow mt-1.5 block text-gold-500">
                    {site.tagline}
                  </span>
                </span>
              </Link>

              <p className="mt-7 max-w-sm text-sm leading-relaxed text-cream/55">
                {site.description}
              </p>

              <dl className="mt-7 space-y-2 text-sm">
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-cream/40">Founded</dt>
                  <dd className="text-cream/75">{site.founded}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-cream/40">Based</dt>
                  <dd className="text-cream/75">{site.location}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-20 shrink-0 text-cream/40">Email</dt>
                  <dd>
                    <a
                      href={`mailto:${contact.general}`}
                      className="text-cream/75 underline decoration-cream/25 underline-offset-4 transition-colors hover:text-gold-300"
                    >
                      {contact.general}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Navigation columns */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {footerNav.map((column) => (
                <nav key={column.heading} aria-label={column.heading}>
                  <h2 className="eyebrow text-gold-500">{column.heading}</h2>
                  <ul className="mt-5 space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-sm text-cream/60 transition-colors hover:text-cream"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="mt-16 border-t border-cream/10 pt-10">
            <h2 className="eyebrow text-gold-500">Follow Takeover FC</h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-cream/70 transition-colors hover:border-gold-400/60 hover:text-gold-300"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="mt-12 flex flex-col gap-5 border-t border-cream/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-cream/40">
              © {year} {site.name}. All Rights Reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {legalNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs text-cream/45 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-8 text-[0.6875rem] uppercase tracking-[0.2em] text-cream/25">
            {site.parentOrganisation} · {site.philosophy}
          </p>
        </div>
      </div>
    </footer>
  );
}
