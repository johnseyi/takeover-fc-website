import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ==================================================================== *
 * The Takeover Line — signature element (§59)
 * ==================================================================== */

export function TakeoverLine({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("takeover-line h-px w-full opacity-70", className)}
    />
  );
}

/* ==================================================================== *
 * Buttons
 * ==================================================================== */

type ButtonVariant = "primary" | "gold" | "outline" | "ghost";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.8125rem] font-bold uppercase tracking-[0.14em] transition-all duration-300 ease-out";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-emerald-500 text-white hover:bg-emerald-400 hover:text-pitch-950 shadow-[0_1px_0_rgba(255,255,255,0.15)_inset]",
  gold: "bg-gold-400 text-pitch-950 hover:bg-gold-300",
  outline:
    "border border-cream/25 text-cream hover:border-gold-400 hover:text-gold-300",
  ghost: "text-cream/70 hover:text-gold-300",
};

interface CtaProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

export function Cta({ href, children, variant = "primary", className }: CtaProps) {
  const isExternal = href.startsWith("http");
  const classes = cn(buttonBase, buttonVariants[variant], className);

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

/* ==================================================================== *
 * Section scaffolding
 * ==================================================================== */

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Vertical rhythm. `tight` for stacked bands, `loose` for feature sections. */
  spacing?: "tight" | "normal" | "loose";
}

const spacingMap = {
  tight: "py-14 sm:py-16",
  normal: "py-20 sm:py-28",
  loose: "py-24 sm:py-36",
};

export function Section({ children, className, id, spacing = "normal" }: SectionProps) {
  return (
    <section id={id} className={cn(spacingMap[spacing], className)}>
      {children}
    </section>
  );
}

export function Container({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow";
}) {
  const widths = {
    narrow: "max-w-3xl",
    default: "max-w-6xl",
    wide: "max-w-[88rem]",
  };
  return (
    <div className={cn("mx-auto w-full px-5 sm:px-8", widths[width], className)}>
      {children}
    </div>
  );
}

/** Small all-caps label with a leading gold rule. */
export function Eyebrow({
  children,
  className,
  tone = "gold",
}: {
  children: ReactNode;
  className?: string;
  tone?: "gold" | "emerald" | "dark";
}) {
  const tones = {
    gold: "text-gold-400",
    emerald: "text-emerald-400",
    dark: "text-emerald-700",
  };
  const rules = {
    gold: "bg-gold-500/70",
    emerald: "bg-emerald-400/70",
    dark: "bg-emerald-700/50",
  };

  return (
    <p className={cn("eyebrow flex items-center gap-3", tones[tone], className)}>
      <span aria-hidden className={cn("h-px w-7 shrink-0", rules[tone])} />
      {children}
    </p>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
  tone = "light",
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow
          tone={tone === "dark" ? "dark" : "gold"}
          className={align === "center" ? "justify-center" : undefined}
        >
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={cn(
          "display mt-5 text-4xl sm:text-5xl lg:text-6xl",
          tone === "dark" ? "text-emerald-900" : "text-cream",
        )}
      >
        {title}
      </h2>
      {intro ? (
        <div
          className={cn(
            "mt-6 space-y-4 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-emerald-900/75" : "text-cream/70",
          )}
        >
          {intro}
        </div>
      ) : null}
    </div>
  );
}

/* ==================================================================== *
 * Small parts
 * ==================================================================== */

export function Pill({
  children,
  tone = "emerald",
  className,
}: {
  children: ReactNode;
  tone?: "emerald" | "gold" | "neutral" | "dark";
  className?: string;
}) {
  const tones = {
    emerald: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
    gold: "border-gold-400/40 bg-gold-400/10 text-gold-300",
    neutral: "border-cream/20 bg-cream/5 text-cream/70",
    dark: "border-emerald-800/25 bg-emerald-800/8 text-emerald-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.14em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Renders a JSON-LD block. Server-safe; used by every page with schema. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Content is generated by us from typed content files, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function Breadcrumbs({ trail }: { trail: { label: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.16em]">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-cream/45">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.href} className="flex items-center gap-2">
              {isLast ? (
                <span className="text-gold-400" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <>
                  <Link href={crumb.href} className="transition-colors hover:text-cream">
                    {crumb.label}
                  </Link>
                  <span aria-hidden className="text-cream/25">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * Honest empty state, used wherever the club genuinely has nothing to show yet
 * (partners, videos, planned squads). Preferable to inventing content.
 */
export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description: string;
  action?: { label: string; href: string };
  className?: string;
}) {
  return (
    <div
      className={cn(
        "takeover-grid rounded-2xl border border-dashed border-cream/15 bg-cream/[0.02] px-8 py-14 text-center",
        className,
      )}
    >
      <h3 className="display text-2xl text-cream sm:text-3xl">{title}</h3>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cream/60 sm:text-base">
        {description}
      </p>
      {action ? (
        <div className="mt-8">
          <Cta href={action.href} variant="outline">
            {action.label}
          </Cta>
        </div>
      ) : null}
    </div>
  );
}
