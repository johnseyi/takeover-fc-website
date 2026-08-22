import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  Container,
  Cta,
  JsonLd,
  Section,
  SectionHeading,
} from "@/components/ui";
import { joinOptions } from "@/content/club";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const trail = [
  { label: "Home", href: "/" },
  { label: "Join Takeover", href: "/join" },
];

export const metadata = pageMetadata({
  title: "Join Takeover",
  description:
    "Become a player, coach or volunteer at Takeover Creatives FC, work with the club, or partner with us. Every route into the club, in one place.",
  path: "/join",
  keywords: [
    "football trials Kampala",
    "join a football club Uganda",
    "football coaching jobs Kampala",
    "volunteer football Uganda",
  ],
});

export default function JoinPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero
        size="tall"
        eyebrow="Join Takeover"
        title="Takeover your potential."
        trail={trail}
        image="/images/squad-portrait-duo.jpg"
        imageAlt="Two Takeover FC players in club shirts after a match"
        intro={
          <p>
            Five ways into the club — as a player, a coach, a volunteer, an employee
            or a partner. Ability and commitment matter more than history.
          </p>
        }
      />

      {/* Routes in */}
      <Section className="bg-pitch-950">
        <Container>
          <div className="space-y-5">
            {joinOptions.map((option, index) => (
              <Reveal key={option.id} delay={index * 70}>
                <article
                  id={option.id}
                  className="scroll-mt-28 rounded-2xl border border-cream/10 bg-pitch-900/50 p-8 transition-colors duration-400 hover:border-gold-400/35 sm:p-10"
                >
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)_auto] lg:items-center lg:gap-10">
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

                    <a
                      href="#apply"
                      className="inline-flex shrink-0 items-center justify-center rounded-full border border-cream/25 px-6 py-3 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-cream transition-colors hover:border-gold-400 hover:bg-gold-400 hover:text-pitch-950"
                    >
                      Apply
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* What to expect */}
      <Section className="bg-cream text-emerald-900">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What To Expect"
              tone="dark"
              title="How applications are handled."
              intro={
                <p>
                  Takeover FC is a young club, run by people who also have jobs and
                  studies. Here is an honest account of what happens after you get
                  in touch.
                </p>
              }
            />
          </Reveal>

          <ol className="mt-14 grid gap-8 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "We read everything",
                detail:
                  "Every enquiry is read by someone at the club. Nothing is filtered by an automated system.",
              },
              {
                step: "02",
                title: "We reply honestly",
                detail:
                  "If there is no place right now, we will say so rather than leave you waiting. Being told no quickly is more useful than silence.",
              },
              {
                step: "03",
                title: "We keep your details",
                detail:
                  "Registered interest is kept on file. When trials, coaching places or roles open, we come back to the people already waiting.",
              },
            ].map((item) => (
              <Reveal key={item.step} as="li">
                <div className="h-full border-t-2 border-emerald-900/30 pt-6">
                  <span className="display text-3xl text-emerald-900/40">{item.step}</span>
                  <h3 className="display mt-4 text-2xl text-emerald-900">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-emerald-900/70">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={120}>
            <p className="mt-14 max-w-2xl rounded-xl border border-emerald-900/15 bg-emerald-900/[0.04] px-6 py-5 text-sm leading-relaxed text-emerald-900/80">
              <strong className="font-bold">Under 18?</strong> Please apply with a
              parent or guardian, and include their contact details. The club will
              not process a young player&apos;s registration without them.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Application form */}
      <Section id="apply" className="relative scroll-mt-24 overflow-hidden bg-emerald-900">
        <div className="takeover-grid absolute inset-0 opacity-70" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
            <Reveal>
              <SectionHeading
                eyebrow="Apply"
                title="Tell us who you are."
                intro={
                  <>
                    <p>
                      Choose your enquiry type and tell us the essentials. For
                      players, include your age, position, current school and where
                      you play now.
                    </p>
                    <p>
                      For coaches and volunteers, tell us what you can offer and
                      when you are available.
                    </p>
                  </>
                }
              />
              <div className="mt-10">
                <Cta href="/contact" variant="outline">
                  Other ways to reach us
                </Cta>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-2xl border border-cream/12 bg-pitch-950/50 p-7 sm:p-9">
                <ContactForm defaultEnquiry="Player" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
