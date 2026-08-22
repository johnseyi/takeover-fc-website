import Image from "next/image";

import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  Container,
  Cta,
  Eyebrow,
  JsonLd,
  Pill,
  Section,
  SectionHeading,
} from "@/components/ui";
import {
  aboutTheClub,
  brandStory,
  communities,
  creativityStatement,
  mission,
  takeoverLanguage,
  timeline,
  values,
  vision,
} from "@/content/club";
import { site } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const trail = [
  { label: "Home", href: "/" },
  { label: "Club", href: "/club" },
];

export const metadata = pageMetadata({
  title: "This is Takeover FC",
  description:
    "Takeover Creatives FC is a community-driven football club founded in 2024 in Kampala, Uganda, using football as a platform for youth development, discipline, mentorship, education and opportunity.",
  path: "/club",
  keywords: [
    "Takeover Creatives FC",
    "about Takeover FC",
    "football clubs in Kampala",
    "community football Uganda",
  ],
});

export default function ClubPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero
        size="tall"
        eyebrow="About the Club"
        title="This is Takeover FC."
        image="/images/senior-team-lineup.jpg"
        imageAlt="The Takeover FC senior team lined up in club kit before a match"
        trail={trail}
        intro={aboutTheClub.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      />

      {/* --- Our origin ------------------------------------------------- */}
      <Section id="origin" className="bg-pitch-950">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <SectionHeading
                eyebrow="Our Origin"
                title="It started with football."
                intro={
                  <>
                    <p>
                      Takeover FC began as football happening on open ground in
                      Namuwongo, Kanyogoga, Kasanvu, Soweto and Tebaleka — the
                      kind of football that exists in these communities whether
                      or not anyone organises it.
                    </p>
                    <p>
                      What changed in 2024 was structure. A name, a set of
                      standards, coaching, fixtures and an intent that went
                      beyond the next match.
                    </p>
                  </>
                }
              />
            </Reveal>

            <Reveal delay={120}>
              <ul className="space-y-3 border-l border-cream/12 pl-8">
                {brandStory.map((line, index) => (
                  <li
                    key={line}
                    className="display relative text-2xl text-cream sm:text-3xl"
                    style={{ opacity: 0.42 + index * 0.145 }}
                  >
                    <span
                      aria-hidden
                      className="absolute -left-[2.3rem] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-gold-400"
                    />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* --- Philosophy ------------------------------------------------- */}
      <Section id="philosophy" className="bg-cream text-emerald-900">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Our Philosophy"
              tone="dark"
              align="center"
              title="Redefining creativity through football."
              intro={creativityStatement.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            />
          </Reveal>
        </Container>
      </Section>

      {/* --- Mission & vision ------------------------------------------- */}
      <Section id="mission" className="relative overflow-hidden bg-emerald-900">
        <div className="takeover-grid absolute inset-0 opacity-70" />
        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <Eyebrow>Our Mission</Eyebrow>
              <p className="display mt-6 text-3xl leading-[1.05] text-cream sm:text-4xl">
                {mission}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <Eyebrow>Our Vision</Eyebrow>
              <p className="display mt-6 text-3xl leading-[1.05] text-cream sm:text-4xl">
                {vision}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* --- Values ------------------------------------------------------ */}
      <Section id="values" className="bg-pitch-950">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Our Values" title="What the club is built on." />
          </Reveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 60} as="li">
                <div className="group relative h-full bg-pitch-950 p-8">
                  <span className="display text-sm text-gold-500/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-4 text-2xl text-cream transition-colors duration-300 group-hover:text-gold-300 sm:text-3xl">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-cream/60">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* --- Communities -------------------------------------------------- */}
      <Section id="communities" className="relative isolate overflow-hidden">
        <Image
          src="/images/squad-lineup-community.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-pitch-950/90" />
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <SectionHeading
                eyebrow="Our Communities"
                title="Five names, one identity."
                intro={
                  <p>
                    These communities are not simply locations on a map. They are
                    part of the club&apos;s identity, and the reason Takeover FC
                    exists in the form it does.
                  </p>
                }
              />
            </Reveal>
            <Reveal delay={120}>
              <ul className="mt-9 flex flex-wrap gap-2">
                {communities.map((community) => (
                  <li key={community}>
                    <Pill tone="gold">{community}</Pill>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Cta href="/community">Our community work</Cta>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* --- The Takeover language system (§58) --------------------------- */}
      <Section className="border-y border-cream/8 bg-emerald-900/25">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The Takeover Concept"
              title="One word, five meanings."
              intro={
                <p>
                  The word Takeover carries the club&apos;s language system. It is
                  used deliberately, not forced into every sentence.
                </p>
              }
            />
          </Reveal>

          <ul className="mt-12 divide-y divide-cream/10 border-y border-cream/10">
            {takeoverLanguage.map((entry, index) => (
              <Reveal key={entry.phrase} delay={index * 60} as="li">
                <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 py-6">
                  <span className="display text-2xl text-cream sm:text-3xl lg:text-4xl">
                    {entry.phrase}
                  </span>
                  <span className="eyebrow text-gold-500">{entry.meaning}</span>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* --- Our future ---------------------------------------------------- */}
      <Section id="future" className="bg-pitch-950">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Our Future"
              title="A club built to last."
              intro={
                <p>
                  We are not a small team trying to become bigger. We are a young
                  club building something lasting — and we would rather build each
                  stage properly than announce it early.
                </p>
              }
            />
          </Reveal>

          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((entry, index) => (
              <Reveal key={entry.marker} delay={index * 80} as="li">
                <div className="h-full border-t border-cream/15 pt-6">
                  <p className="display text-3xl text-gold-400">{entry.marker}</p>
                  <h3 className="mt-3 text-base font-bold text-cream">{entry.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/60">
                    {entry.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120}>
            <div className="mt-16 flex flex-wrap gap-3">
              <Cta href="/club/leadership">Meet the leadership</Cta>
              <Cta href="/teams" variant="outline">
                See the squads
              </Cta>
              <Cta href="/academy" variant="outline">
                The academy
              </Cta>
            </div>
          </Reveal>

          <p className="mt-16 max-w-2xl text-sm leading-relaxed text-cream/40">
            {site.name} operates under {site.parentOrganisation}. Founded{" "}
            {site.founded} in {site.location}.
          </p>
        </Container>
      </Section>
    </>
  );
}
