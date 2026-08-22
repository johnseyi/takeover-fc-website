import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import {
  Container,
  JsonLd,
  Section,
  SectionHeading,
} from "@/components/ui";
import { contact, site, socials } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const trail = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "/contact" },
];

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Takeover Creatives FC in Kampala, Uganda — general, partnership, media and player enquiries.",
  path: "/contact",
  keywords: ["contact Takeover FC", "football club contact Kampala"],
});

const channels = [
  {
    label: "General enquiries",
    value: contact.general,
    detail: "Anything that does not fit the categories below.",
  },
  {
    label: "Partnership enquiries",
    value: contact.partnerships,
    detail: "Sponsorship, equipment, education, health, media and infrastructure.",
  },
  {
    label: "Media enquiries",
    value: contact.media,
    detail: "Interviews, photography, accreditation and comment.",
  },
  {
    label: "Player enquiries",
    value: contact.players,
    detail: "Trials, registration, coaching and volunteering.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero
        eyebrow="Contact"
        title="Get in touch."
        trail={trail}
        intro={
          <p>
            Takeover FC is based in Kampala and run by people who answer their own
            email. Choose the right channel and we will come back to you.
          </p>
        }
      />

      <Section className="bg-pitch-950">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16">
            {/* Channels */}
            <Reveal>
              <h2 className="display text-3xl text-cream sm:text-4xl">
                Direct contact
              </h2>

              <ul className="mt-9 space-y-4">
                {channels.map((channel) => (
                  <li
                    key={channel.label}
                    className="rounded-xl border border-cream/12 bg-pitch-900/50 p-6"
                  >
                    <p className="eyebrow text-gold-500">{channel.label}</p>
                    <a
                      href={`mailto:${channel.value}`}
                      className="mt-3 block text-base text-cream underline decoration-cream/25 underline-offset-4 transition-colors hover:text-gold-300"
                    >
                      {channel.value}
                    </a>
                    <p className="mt-2 text-sm text-cream/50">{channel.detail}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-9 space-y-5 border-t border-cream/10 pt-8">
                <div>
                  <p className="eyebrow text-cream/40">Phone</p>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, "")}`}
                    className="mt-2 block text-base text-cream transition-colors hover:text-gold-300"
                  >
                    {contact.phone}
                  </a>
                </div>
                <div>
                  <p className="eyebrow text-cream/40">Based in</p>
                  <p className="mt-2 text-base text-cream">{contact.address}</p>
                </div>
                <div>
                  <p className="eyebrow text-cream/40">Organisation</p>
                  <p className="mt-2 text-base text-cream">
                    {site.name}, under {site.parentOrganisation}
                  </p>
                </div>
              </div>

              <div className="mt-9 border-t border-cream/10 pt-8">
                <p className="eyebrow text-cream/40">Follow the club</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex rounded-full border border-cream/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-cream/65 transition-colors hover:border-gold-400/60 hover:text-gold-300"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Form */}
            <Reveal delay={120}>
              <div className="rounded-2xl border border-cream/12 bg-pitch-900/50 p-7 sm:p-9">
                <SectionHeading title="Send an enquiry" className="max-w-none" />
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
