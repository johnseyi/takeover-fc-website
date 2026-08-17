import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs, Container, Eyebrow, TakeoverLine } from "@/components/ui";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
  trail?: { label: string; href: string }[];
  children?: ReactNode;
  /** `tall` for section landing pages, `compact` for utility pages. */
  size?: "compact" | "tall";
  className?: string;
}

/** Shared interior-page hero: photograph, breadcrumb, display headline. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  trail,
  children,
  size = "compact",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-pitch-950",
        size === "tall" ? "pb-20 pt-36 sm:pb-24 sm:pt-44" : "pb-16 pt-32 sm:pb-20 sm:pt-40",
        className,
      )}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="-z-10 object-cover opacity-30"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-b from-pitch-950 via-pitch-950/80 to-pitch-950" />
        </>
      ) : (
        <div className="takeover-grid absolute inset-0 -z-10 opacity-60" />
      )}

      <Container>
        {trail ? <Breadcrumbs trail={trail} /> : null}
        {eyebrow ? <Eyebrow className={trail ? "mt-6" : undefined}>{eyebrow}</Eyebrow> : null}

        <h1
          className={cn(
            "display mt-5 max-w-4xl text-cream",
            size === "tall"
              ? "text-5xl sm:text-6xl lg:text-7xl"
              : "text-4xl sm:text-5xl lg:text-6xl",
          )}
        >
          {title}
        </h1>

        {intro ? (
          <div className="mt-7 max-w-2xl space-y-4 text-base leading-relaxed text-cream/70 sm:text-lg">
            {intro}
          </div>
        ) : null}

        {children ? <div className="mt-9">{children}</div> : null}
      </Container>

      <TakeoverLine className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
