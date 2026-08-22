import { Suspense } from "react";

import { PageHero } from "@/components/page-hero";
import { PlayerFilters } from "@/components/player-filters";
import { Reveal } from "@/components/reveal";
import { Container, Cta, JsonLd, Section, SectionHeading } from "@/components/ui";
import { players } from "@/content/people";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const trail = [
  { label: "Home", href: "/" },
  { label: "Players", href: "/players" },
];

export const metadata = pageMetadata({
  title: "Players",
  description:
    "The Takeover Creatives FC player database — search and filter the senior and Under-17 squads by team, position, age group, nationality and status.",
  path: "/players",
  keywords: ["Takeover FC players", "youth football players Kampala", "football squad Uganda"],
});

export default function PlayersPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero
        eyebrow="Player Database"
        title="Takeover your potential."
        trail={trail}
        image="/images/squad-portrait-five.jpg"
        imageAlt="Five Takeover FC players standing together in club kit"
        intro={
          <p>
            Every player registered across the club&apos;s squads. Search by name,
            or filter by team, position, age group, nationality and status.
          </p>
        }
      />

      <Section className="bg-pitch-950">
        <Container>
          <Suspense
            fallback={
              <div className="h-40 animate-pulse rounded-xl border border-cream/10 bg-cream/[0.03]" />
            }
          >
            <PlayerFilters players={players} />
          </Suspense>
        </Container>
      </Section>

      <Section spacing="tight" className="border-t border-cream/8 bg-emerald-900/25">
        <Container>
          <Reveal>
            <div className="flex flex-wrap items-center justify-between gap-8">
              <SectionHeading
                eyebrow="Registration"
                title="The squad is still being built."
                intro={
                  <p>
                    As the club formalises registration, this database grows with
                    it. Players from our communities and beyond are welcome to
                    apply.
                  </p>
                }
                className="max-w-xl"
              />
              <Cta href="/join#player" variant="gold">
                Become a player
              </Cta>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
