import { Countdown } from "@/components/countdown";
import { FixturesTabs } from "@/components/fixtures-tabs";
import { NextMatchPanel } from "@/components/match-card";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Container, Cta, JsonLd, Section } from "@/components/ui";
import {
  getNextMatch,
  getRecord,
  getResults,
  getUpcomingMatches,
} from "@/content/matches";
import { breadcrumbSchema, matchSchema, pageMetadata } from "@/lib/seo";
import { directionsUrl } from "@/lib/utils";

export const revalidate = 3600;

const trail = [
  { label: "Home", href: "/" },
  { label: "Fixtures & Results", href: "/fixtures-results" },
];

export const metadata = pageMetadata({
  title: "Fixtures & Results",
  description:
    "Takeover Creatives FC fixtures, results and match centre — upcoming matches, scorelines and reports for the senior team and Under-17 squad in Kampala.",
  path: "/fixtures-results",
  keywords: ["Takeover FC fixtures", "Takeover FC results", "Kampala football fixtures"],
});

export default function FixturesResultsPage() {
  const nextMatch = getNextMatch();
  const upcoming = getUpcomingMatches();
  const results = getResults();
  const record = getRecord();

  const recordCells = [
    { label: "Played", value: record.played },
    { label: "Won", value: record.won },
    { label: "Drawn", value: record.drawn },
    { label: "Lost", value: record.lost },
    { label: "Goals for", value: record.goalsFor },
    { label: "Goals against", value: record.goalsAgainst },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          ...upcoming.slice(0, 5).map((match) => matchSchema(match)),
        ]}
      />

      <PageHero
        eyebrow="Fixtures & Results"
        title="Takeover the pitch."
        trail={trail}
        image="/images/match-first-touch.jpg"
        imageAlt="A Takeover FC player controlling the ball during a match"
        intro={
          <p>
            Every fixture, result and match report across the club&apos;s squads.
            Kick-off times are East Africa Time.
          </p>
        }
      />

      {/* Next match */}
      {nextMatch ? (
        <Section spacing="tight" className="bg-pitch-950">
          <Container>
            <Reveal>
              <NextMatchPanel match={nextMatch} />
              <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <Countdown target={nextMatch.kickoff} />
                <Cta href={directionsUrl(nextMatch.venue)} variant="outline">
                  Get directions
                </Cta>
              </div>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* Season record */}
      {record.played > 0 ? (
        <Section spacing="tight" className="border-y border-cream/8 bg-emerald-900/25">
          <Container>
            <Reveal>
              <h2 className="eyebrow text-gold-500">Record from recorded matches</h2>
              <dl className="mt-7 grid grid-cols-3 gap-x-6 gap-y-8 lg:grid-cols-6">
                {recordCells.map((cell) => (
                  <div key={cell.label}>
                    <dd className="display text-4xl text-cream tabular-nums sm:text-5xl">
                      {cell.value}
                    </dd>
                    <dt className="mt-2 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-cream/40">
                      {cell.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* Tabs */}
      <Section className="bg-pitch-950">
        <Container>
          <FixturesTabs upcoming={upcoming} results={results} />
        </Container>
      </Section>
    </>
  );
}
