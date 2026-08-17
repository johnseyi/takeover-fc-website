import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { StatCounter } from "@/components/stat-counter";
import {
  Container,
  Cta,
  JsonLd,
  Section,
  SectionHeading,
} from "@/components/ui";
import {
  clubStats,
  partnershipSupports,
  whyPartner,
} from "@/content/club";
import { contact } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const trail = [
  { label: "Home", href: "/" },
  { label: "Partners", href: "/partners" },
  { label: "Partner With Us", href: "/partner-with-us" },
];

export const metadata = pageMetadata({
  title: "Partner With Us",
  description:
    "Sponsorship and partnership information for organisations working with Takeover Creatives FC — youth reach, community presence, brand visibility and measurable social impact in Kampala, Uganda.",
  path: "/partner-with-us",
  keywords: [
    "sponsor a football club Uganda",
    "football sponsorship Kampala",
    "CSR youth football Uganda",
  ],
});

export default function PartnerWithUsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero
        size="tall"
        eyebrow="Sponsorship"
        title="Takeover together."
        trail={trail}
        image="/images/champions-medals.jpg"
        imageAlt="A championship-winning squad photographed with medals and a trophy"
        intro={
          <p>
            Information for organisations considering a partnership with Takeover
            Creatives FC — what the club offers, what contributions support, and how
            to start the conversation.
          </p>
        }
      />

      {/* Why Takeover FC */}
      <Section className="bg-pitch-950">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why Takeover FC?"
              title="What a partner actually gets."
              intro={
                <p>
                  We are not offering the reach of a professional club, and we will
                  not claim to. What we offer is a young institution being built
                  properly, with room for partners who join early.
                </p>
              }
            />
          </Reveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
            {whyPartner.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 60} as="li">
                <div className="h-full bg-pitch-950 p-8">
                  <h3 className="display text-xl text-cream sm:text-2xl">
                    {reason.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-cream/60">
                    {reason.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          {/* Club facts a sponsor will ask for. */}
          <Reveal delay={120}>
            <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-cream/10 pt-12 lg:grid-cols-4">
              {clubStats.map((stat) => (
                <div key={stat.label}>
                  <dd className="display text-5xl text-cream sm:text-6xl">
                    <StatCounter
                      value={stat.value}
                      suffix={"suffix" in stat ? stat.suffix : ""}
                      format={"format" in stat && stat.format === "plain" ? "plain" : "count"}
                    />
                  </dd>
                  <dt className="eyebrow mt-3 text-gold-500">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* What contributions support */}
      <Section className="bg-cream text-emerald-900">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Partnership Opportunities"
              tone="dark"
              title="Exactly where a contribution goes."
              intro={
                <p>
                  These are unglamorous line items, and they are precisely the ones
                  that determine how many young people can actually play. A set of
                  boots is the difference between participating and watching.
                </p>
              }
            />
          </Reveal>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-xl border border-emerald-900/12 bg-emerald-900/12 sm:grid-cols-2 lg:grid-cols-4">
            {partnershipSupports.map((item, index) => (
              <Reveal key={item} delay={index * 50} as="li">
                <div className="flex h-full items-center gap-4 bg-cream px-6 py-8">
                  <span className="display text-lg text-emerald-900/25">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base font-semibold text-emerald-900">
                    {item}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120}>
            <p className="mt-12 max-w-2xl text-sm leading-relaxed text-emerald-900/70">
              Every partnership is defined with a specific commitment, duration and
              set of outcomes. The club reports back on what the contribution
              funded — not on how it sounded.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Enquiry form */}
      <Section id="enquire" className="relative overflow-hidden bg-emerald-900">
        <div className="takeover-grid absolute inset-0 opacity-70" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Start The Conversation"
                title="Request partnership information."
                intro={
                  <>
                    <p>
                      Tell us which area interests you and we will send club
                      information, what your contribution would support, and what
                      visibility and reporting look like in practice.
                    </p>
                  </>
                }
              />

              <dl className="mt-10 space-y-4 border-t border-cream/12 pt-8 text-sm">
                <div>
                  <dt className="eyebrow text-cream/40">Partnership enquiries</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${contact.partnerships}`}
                      className="text-cream underline decoration-cream/30 underline-offset-4 transition-colors hover:text-gold-300"
                    >
                      {contact.partnerships}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-cream/40">General</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${contact.general}`}
                      className="text-cream underline decoration-cream/30 underline-offset-4 transition-colors hover:text-gold-300"
                    >
                      {contact.general}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-10">
                <Cta href="/support" variant="outline">
                  Other ways to support
                </Cta>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl border border-cream/12 bg-pitch-950/50 p-7 sm:p-9">
                <ContactForm defaultEnquiry="Partnership" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
