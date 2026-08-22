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
import { girlsFootball } from "@/content/club";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const trail = [
  { label: "Home", href: "/" },
  { label: "Club", href: "/club" },
  { label: "Girls' Football", href: "/girls-football" },
];

export const metadata = pageMetadata({
  title: "Girls' Football",
  description:
    "Takeover Creatives FC's long-term development strategy includes establishing a girls' football programme creating pathways for young female players in Kampala, Uganda.",
  path: "/girls-football",
  keywords: ["girls football Uganda", "women's football Kampala", "girls football pathway"],
});

export default function GirlsFootballPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero
        size="tall"
        eyebrow="Girls' Football"
        title="Opportunity should not depend on gender."
        trail={trail}
        image="/images/match-shielding-ball.jpg"
        imageAlt="A footballer shielding the ball from an opponent during a match in Kampala"
        intro={<p>{girlsFootball.statement}</p>}
      >
        <Pill tone="gold">{girlsFootball.status}</Pill>
      </PageHero>

      {/* Honest status */}
      <Section spacing="tight" className="border-b border-cream/8 bg-emerald-900/25">
        <Container>
          <Reveal>
            <div className="rounded-xl border border-gold-400/25 bg-gold-400/[0.06] px-6 py-5">
              <p className="text-sm leading-relaxed text-cream/75">
                <strong className="font-bold text-gold-300">
                  This programme has not started yet.
                </strong>{" "}
                We are presenting it as a future programme rather than pretending it
                already exists. When the first session happens, this page will
                change — and the change will mean something.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* What it needs to include */}
      <Section className="bg-pitch-950">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="The Ambition"
                title="What we are working toward."
                intro={
                  <p>
                    A girls&apos; programme built to the same standard as every
                    other squad in the club — not a token session bolted onto the
                    end of a training week.
                  </p>
                }
              />
            </Reveal>

            <Reveal delay={120}>
              <ul className="space-y-5">
                {girlsFootball.ambitions.map((ambition, index) => (
                  <li key={ambition} className="flex gap-5 border-b border-cream/10 pb-5">
                    <span className="display shrink-0 text-lg text-gold-500/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base leading-relaxed text-cream/75">
                      {ambition}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What it needs from outside */}
      <Section className="relative overflow-hidden bg-emerald-900">
        <div className="takeover-grid absolute inset-0 opacity-70" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="What It Will Take"
              title="This one needs help to start."
              intro={
                <p>
                  A girls&apos; pathway needs coaches, safeguarding, kit, transport
                  and somewhere safe to train. It is the part of the club&apos;s
                  plan most likely to be accelerated by the right partner.
                </p>
              }
            />
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Coaches",
                detail:
                  "Female coaches especially. Young players need to see the pathway represented on the touchline.",
              },
              {
                title: "Safeguarding",
                detail:
                  "Trained welfare officers and clear procedures, in place before the first session rather than after.",
              },
              {
                title: "Equipment & transport",
                detail:
                  "Kit, balls and a way to get players safely to training and fixtures.",
              },
            ].map((need, index) => (
              <Reveal key={need.title} delay={index * 90}>
                <article className="h-full rounded-xl border border-cream/12 bg-pitch-950/40 p-8">
                  <h3 className="display text-2xl text-cream">{need.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-cream/65">
                    {need.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <div className="mt-14 flex flex-wrap gap-3">
              <Cta href="/partner-with-us" variant="gold">
                Help us start it
              </Cta>
              <Cta href="/join#coach" variant="outline">
                Coach with us
              </Cta>
              <Cta href="/contact" variant="outline">
                Register interest
              </Cta>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
