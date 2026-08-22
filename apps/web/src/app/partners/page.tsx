import Image from "next/image";

import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  Container,
  Cta,
  JsonLd,
  Pill,
  Section,
  SectionHeading,
} from "@/components/ui";
import { partnershipAreas } from "@/content/club";
import { collaborations, partners, partnershipProcess } from "@/content/partners";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const trail = [
  { label: "Home", href: "/" },
  { label: "Partners", href: "/partners" },
];

export const metadata = pageMetadata({
  title: "Partners",
  description:
    "Partnership builds possibility. How organisations, businesses and institutions work with Takeover Creatives FC across sponsorship, equipment, education, health, media and community programmes.",
  path: "/partners",
  keywords: ["football club partnership Uganda", "sponsor youth football Kampala"],
});

export default function PartnersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero
        size="tall"
        eyebrow="Partners"
        title="Partnership builds possibility."
        trail={trail}
        image="/images/senior-team-lineup.jpg"
        imageAlt="The Takeover FC senior team lined up in club kit"
        intro={
          <p>
            Takeover FC believes meaningful change is built through collaboration.
            We work with organisations, businesses, institutions and individuals
            who believe in the potential of young people.
          </p>
        }
      />

      {/* Current partners — or an honest empty state (§19). */}
      <Section className="bg-pitch-950">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Our Partners" title="Who we work with." />
          </Reveal>

          {partners.length > 0 ? (
            <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-4">
              {partners.map((partner) => (
                <article key={partner.slug} className="bg-pitch-950 p-8">
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={160}
                      height={80}
                      className="h-12 w-auto opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                    />
                  ) : (
                    <h3 className="display text-2xl text-cream">{partner.name}</h3>
                  )}
                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-gold-500">
                    {partner.partnershipType}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-cream/60">
                    {partner.description}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <Reveal delay={80}>
              <div className="takeover-grid mt-12 rounded-2xl border border-dashed border-cream/15 bg-cream/[0.02] px-8 py-14 sm:px-12">
                <div className="max-w-2xl">
                  <h3 className="display text-3xl text-cream sm:text-4xl">
                    No announced partners yet — and we are not going to pretend
                    otherwise.
                  </h3>
                  <p className="mt-6 text-base leading-relaxed text-cream/65">
                    Filling this page with borrowed logos would undermine exactly
                    the credibility it exists to build. Takeover FC has no formal
                    sponsors or partners to announce today.
                  </p>
                  <p className="mt-4 text-base leading-relaxed text-cream/65">
                    The first organisations to work with the club will be named
                    here, with what they support and what it changed.
                  </p>
                  <div className="mt-9">
                    <Cta href="/partner-with-us" variant="gold">
                      Be the first
                    </Cta>
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </Container>
      </Section>

      {/* Existing collaborations */}
      <Section className="border-t border-cream/8 bg-pitch-900/30">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Existing Connections"
              title="What already exists."
              intro={
                <p>
                  Two relationships underpin the club today. Neither is a commercial
                  sponsorship, and both are worth stating plainly.
                </p>
              }
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {collaborations.map((item, index) => (
              <Reveal key={item.name} delay={index * 100}>
                <article className="h-full rounded-xl border border-cream/10 bg-pitch-900/50 p-8">
                  <Pill tone="neutral">{item.relationship}</Pill>
                  <h3 className="display mt-5 text-2xl text-cream sm:text-3xl">
                    {item.name}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-cream/65">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Partnership areas */}
      <Section className="bg-cream text-emerald-900">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Partnership Areas"
              tone="dark"
              title="Eleven ways to work with us."
              intro={
                <p>
                  Partnership does not have to mean a cheque. Some of the most
                  useful contributions to a club at this stage are practical.
                </p>
              }
            />
          </Reveal>

          <ul className="mt-12 flex flex-wrap gap-3">
            {partnershipAreas.map((area, index) => (
              <Reveal key={area} delay={index * 40} as="li">
                <span className="inline-flex rounded-full border border-emerald-900/25 px-5 py-2.5 text-sm font-semibold text-emerald-900">
                  {area}
                </span>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Process */}
      <Section className="relative overflow-hidden bg-emerald-900">
        <div className="takeover-grid absolute inset-0 opacity-70" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="How It Works"
              title="Takeover together."
              intro={
                <p>
                  A partnership conversation with Takeover FC is deliberately
                  concrete. Here is how it runs.
                </p>
              }
            />
          </Reveal>

          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {partnershipProcess.map((step, index) => (
              <Reveal key={step.step} delay={index * 90} as="li">
                <div className="h-full border-t-2 border-gold-400/60 pt-6">
                  <span className="display text-3xl text-gold-400">{step.step}</span>
                  <h3 className="display mt-4 text-xl text-cream sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/65">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={140}>
            <div className="mt-14 flex flex-wrap gap-3">
              <Cta href="/partner-with-us" variant="gold">
                Request partnership information
              </Cta>
              <Cta href="/support" variant="outline">
                Other ways to support
              </Cta>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
