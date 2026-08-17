import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  Container,
  Cta,
  JsonLd,
  Section,
  SectionHeading,
} from "@/components/ui";
import { staff } from "@/content/people";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";
import { initials } from "@/lib/utils";
import type { StaffMember } from "@/lib/types";

const trail = [
  { label: "Home", href: "/" },
  { label: "Club", href: "/club" },
  { label: "Leadership", href: "/club/leadership" },
];

export const metadata = pageMetadata({
  title: "Club Leadership",
  description:
    "The leadership, management, technical, administrative, medical and support staff behind Takeover Creatives FC — structure and accountability at a community football club in Kampala.",
  path: "/club/leadership",
  keywords: ["Takeover FC leadership", "football club management Kampala"],
});

const departments: StaffMember["department"][] = [
  "Leadership",
  "Technical",
  "Administration",
  "Medical",
  "Support",
];

function StaffCard({ member }: { member: StaffMember }) {
  return (
    <article className="group h-full rounded-xl border border-cream/10 bg-pitch-900/50 p-6 transition-colors duration-400 hover:border-gold-400/35">
      <div className="flex items-start gap-4">
        <span
          aria-hidden
          className="display flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-cream/12 bg-emerald-900/60 text-lg text-cream/40"
        >
          {initials(member.name)}
        </span>
        <div className="min-w-0">
          <h3 className="display text-xl text-cream sm:text-2xl">{member.name}</h3>
          <p className="mt-1.5 text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-gold-500">
            {member.position}
          </p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-cream/60">{member.bio}</p>

      <div className="mt-6 border-t border-cream/10 pt-5">
        <h4 className="eyebrow text-cream/40">Responsibilities</h4>
        <ul className="mt-3 space-y-2">
          {member.responsibilities.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-cream/65">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function LeadershipPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero
        eyebrow="Club Leadership"
        title="Structure and accountability."
        trail={trail}
        image="/images/squad-portrait-five.jpg"
        imageAlt="Takeover FC players standing together in club kit"
        intro={
          <>
            <p>
              A football club is only as credible as the people responsible for
              running it. This page sets out who does what at Takeover FC — the
              leadership, technical staff, administration, medical support and the
              people who keep matchdays upright.
            </p>
          </>
        }
      />

      {/* Honest notice while real post-holders are being confirmed. */}
      <Section spacing="tight" className="border-b border-cream/8 bg-emerald-900/25">
        <Container>
          <Reveal>
            <div className="rounded-xl border border-gold-400/25 bg-gold-400/[0.06] px-6 py-5">
              <p className="text-sm leading-relaxed text-cream/75">
                <strong className="font-bold text-gold-300">
                  Post-holder names are being confirmed.
                </strong>{" "}
                The roles below reflect how the club is structured. Individual
                names, photographs and biographies will be published as each
                appointment is formally confirmed.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {departments.map((department, deptIndex) => {
        const members = staff.filter((member) => member.department === department);
        if (members.length === 0) return null;

        return (
          <Section
            key={department}
            spacing="tight"
            className={deptIndex % 2 === 1 ? "bg-pitch-900/30" : "bg-pitch-950"}
          >
            <Container>
              <Reveal>
                <SectionHeading
                  eyebrow={
                    department === "Leadership"
                      ? "Club Leadership"
                      : department === "Technical"
                        ? "Technical Team"
                        : department === "Administration"
                          ? "Administrative Team"
                          : department === "Medical"
                            ? "Medical Team"
                            : "Support Staff"
                  }
                  title={
                    department === "Leadership"
                      ? "Running the club."
                      : department === "Technical"
                        ? "On the training ground."
                        : department === "Administration"
                          ? "Behind the operation."
                          : department === "Medical"
                            ? "Player welfare."
                            : "Matchday and logistics."
                  }
                  className="max-w-2xl"
                />
              </Reveal>

              <div className="mt-11 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {members.map((member, index) => (
                  <Reveal key={member.slug} delay={index * 70}>
                    <StaffCard member={member} />
                  </Reveal>
                ))}
              </div>
            </Container>
          </Section>
        );
      })}

      <Section className="border-t border-cream/8 bg-pitch-950">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Join the Staff"
              title="We are building the team behind the team."
              intro={
                <p>
                  Coaches, physiotherapists, administrators, educators and
                  volunteers. As the club formalises, so does the group of people
                  running it.
                </p>
              }
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <Cta href="/join#coach">Become a coach</Cta>
              <Cta href="/join#volunteer" variant="outline">
                Volunteer with us
              </Cta>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
