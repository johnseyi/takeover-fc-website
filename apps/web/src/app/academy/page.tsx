import { ContactForm } from "@/components/contact-form";
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
import { academySections } from "@/content/club";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const trail = [
  { label: "Home", href: "/" },
  { label: "Club", href: "/club" },
  { label: "Academy", href: "/academy" },
];

export const metadata = pageMetadata({
  title: "Academy",
  description:
    "The planned Takeover FC Youth Academy — structured player development, football training, education, character development, mentorship and a clear pathway for young players in Kampala.",
  path: "/academy",
  keywords: [
    "football academy Kampala",
    "youth football academy Uganda",
    "Takeover FC academy",
  ],
});

export default function AcademyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero
        size="tall"
        eyebrow="The Academy"
        title="Building the next generation."
        trail={trail}
        image="/images/squad-portrait-five.jpg"
        imageAlt="Young Takeover FC players standing together in club kit"
        intro={
          <>
            <p>
              Talent in our communities is not scarce. Structure is. The Takeover
              FC Youth Academy is the club&apos;s answer to that.
            </p>
          </>
        }
      >
        <Pill tone="gold">In development</Pill>
      </PageHero>

      {/* Honest framing about status. */}
      <Section spacing="tight" className="border-b border-cream/8 bg-emerald-900/25">
        <Container>
          <Reveal>
            <div className="rounded-xl border border-gold-400/25 bg-gold-400/[0.06] px-6 py-5">
              <p className="text-sm leading-relaxed text-cream/75">
                <strong className="font-bold text-gold-300">
                  The academy is not yet open.
                </strong>{" "}
                We could fill one tomorrow. What we could not yet guarantee is that
                the coaching, safeguarding, equipment and education support would
                all be in place at the standard young players deserve. This page
                sets out what we are building and invites the people who can help
                build it.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Academy pillars */}
      <Section className="bg-pitch-950">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What It Will Be"
              title="Nine things an academy has to get right."
              intro={
                <p>
                  A youth academy is not a training session with a better name. It
                  has to be consistent, structured and accountable — or it is not
                  worth a young player&apos;s time.
                </p>
              }
            />
          </Reveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
            {academySections.map((section, index) => (
              <Reveal key={section.title} delay={index * 55} as="li">
                <div className="group h-full bg-pitch-950 p-8">
                  <span className="display text-sm text-gold-500/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-4 text-xl text-cream transition-colors duration-300 group-hover:text-gold-300 sm:text-2xl">
                    {section.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-cream/60">
                    {section.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Pathway */}
      <Section className="relative overflow-hidden bg-emerald-900">
        <div className="takeover-grid absolute inset-0 opacity-70" />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              eyebrow="The Pathway"
              title="Community football to a career in the game."
              intro={
                <p>
                  Every stage exists today except the academy itself. Adding it
                  closes the gap between a young player being talented and a young
                  player being developed.
                </p>
              }
            />
          </Reveal>

          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                stage: "01",
                title: "Community football",
                detail: "Open, community-based talent identification.",
                live: true,
              },
              {
                stage: "02",
                title: "Academy",
                detail: "Structured development, education and mentorship.",
                live: false,
              },
              {
                stage: "03",
                title: "Under-17",
                detail: "Competitive youth football with real fixtures.",
                live: true,
              },
              {
                stage: "04",
                title: "Senior team",
                detail: "The club's first team, and opportunities beyond it.",
                live: true,
              },
            ].map((step, index) => (
              <Reveal key={step.stage} delay={index * 90} as="li">
                <div className="h-full border-t-2 border-gold-400/60 pt-6">
                  <div className="flex items-center gap-3">
                    <span className="display text-3xl text-gold-400">{step.stage}</span>
                    {!step.live ? <Pill tone="neutral">Planned</Pill> : null}
                  </div>
                  <h3 className="display mt-4 text-2xl text-cream">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/65">
                    {step.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Register interest */}
      <Section id="register" className="bg-pitch-950">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Register Interest"
                title="Be part of building it."
                intro={
                  <>
                    <p>
                      We want to hear from three groups: young players and their
                      families who want a place when the academy opens, coaches and
                      educators who want to work in it, and organisations who can
                      help fund or equip it.
                    </p>
                    <p>
                      Registering interest is not an application and carries no
                      obligation. It tells us who is waiting.
                    </p>
                  </>
                }
              />
              <div className="mt-9 flex flex-wrap gap-3">
                <Cta href="/join#player" variant="outline">
                  Player enquiries
                </Cta>
                <Cta href="/partner-with-us" variant="outline">
                  Fund the academy
                </Cta>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl border border-cream/12 bg-pitch-900/50 p-7 sm:p-9">
                <ContactForm defaultEnquiry="General" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
