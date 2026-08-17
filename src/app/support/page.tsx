import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  Container,
  Cta,
  JsonLd,
  Section,
  SectionHeading,
} from "@/components/ui";
import { supportOptions } from "@/content/club";
import { contact } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const trail = [
  { label: "Home", href: "/" },
  { label: "Support Us", href: "/support" },
];

export const metadata = pageMetadata({
  title: "Support Us",
  description:
    "Help build what comes next at Takeover Creatives FC — sponsor the club, donate, contribute equipment, volunteer your skills or build a long-term partnership.",
  path: "/support",
  keywords: ["donate football Uganda", "support youth football Kampala", "volunteer football club"],
});

export default function SupportPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero
        size="tall"
        eyebrow="Support Us"
        title="Help us build what comes next."
        trail={trail}
        image="/images/player-celebration.jpg"
        imageAlt="A Takeover FC player celebrating during a community match"
        intro={
          <p>
            There are five ways to support Takeover FC, and every one of them
            changes something specific. This page sets out exactly what.
          </p>
        }
      />

      {/* Support options */}
      <Section className="bg-pitch-950">
        <Container>
          <div className="space-y-5">
            {supportOptions.map((option, index) => (
              <Reveal key={option.title} delay={index * 70}>
                <article className="group rounded-2xl border border-cream/10 bg-pitch-900/50 p-8 transition-colors duration-400 hover:border-gold-400/35 sm:p-10">
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)_auto] lg:items-center lg:gap-10">
                    <div>
                      <span className="display text-sm text-gold-500/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="display mt-2 text-3xl text-cream sm:text-4xl">
                        {option.title}
                      </h2>
                      <p className="mt-2 text-sm font-semibold text-gold-400">
                        {option.description}
                      </p>
                    </div>

                    <p className="text-base leading-relaxed text-cream/65">
                      {option.detail}
                    </p>

                    <Link
                      href={option.href}
                      className="inline-flex shrink-0 items-center justify-center rounded-full border border-cream/25 px-6 py-3 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-cream transition-colors hover:border-gold-400 hover:bg-gold-400 hover:text-pitch-950"
                    >
                      {option.cta}
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Where support goes */}
      <Section className="bg-cream text-emerald-900">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Where It Goes"
              tone="dark"
              title="No vague commitments."
              intro={
                <p>
                  A club asking for support owes an account of where it lands. As
                  Takeover FC formalises, contributions will be reported against
                  these categories in the club&apos;s quarterly updates.
                </p>
              }
            />
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Playing costs",
                detail:
                  "Pitch hire, match officials, competition entry and transport to away fixtures.",
              },
              {
                title: "Player welfare",
                detail:
                  "Matchday meals, medical support, and travel for players who cannot cover it.",
              },
              {
                title: "Equipment",
                detail:
                  "Boots, balls, kits, training bibs, goalkeeper gloves and cones — the things that decide how many can play.",
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <article className="takeover-grid-dark h-full rounded-xl border border-emerald-900/12 bg-cream p-8">
                  <h3 className="display text-2xl text-emerald-900">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-emerald-900/70">
                    {item.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section className="relative overflow-hidden bg-emerald-900">
        <div className="takeover-grid absolute inset-0 opacity-70" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="Get In Touch"
              align="center"
              title="Talk to us directly."
              intro={
                <p>
                  Every form of support starts with a conversation. Email the club,
                  or send an enquiry and we will come back to you.
                </p>
              }
            />
            <div className="mt-11 flex flex-wrap justify-center gap-3">
              <Cta href={`mailto:${contact.general}`} variant="gold">
                {contact.general}
              </Cta>
              <Cta href="/contact?enquiry=support" variant="outline">
                Send an enquiry
              </Cta>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
