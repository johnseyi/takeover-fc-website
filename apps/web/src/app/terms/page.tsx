import { PageHero } from "@/components/page-hero";
import { Container, JsonLd, Section } from "@/components/ui";
import { contact, site } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const trail = [
  { label: "Home", href: "/" },
  { label: "Terms", href: "/terms" },
];

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms governing use of the ${site.name} website.`,
  path: "/terms",
});

const sections = [
  {
    heading: "Using this website",
    body: [
      `This website is published by ${site.name}, operating under ${site.parentOrganisation}. By using it you agree to these terms.`,
    ],
  },
  {
    heading: "Accuracy of information",
    body: [
      "The club publishes fixtures, results, squad information and news in good faith and updates them as promptly as it can. Details can change at short notice — particularly kick-off times and venues — and the club does not warrant that every page is complete or current at the moment you read it.",
      "Where a programme is planned rather than running, this site says so. Nothing described as planned or in development should be relied on as an existing service.",
    ],
  },
  {
    heading: "Club identity and content",
    body: [
      "The Takeover Creatives FC crest, name and club photography belong to the club. You may not use them to imply endorsement of a product, organisation or campaign without written permission.",
      "Journalists and partners may use the assets published in the media centre in line with the usage rules set out there.",
    ],
  },
  {
    heading: "Enquiries and applications",
    body: [
      "Submitting an enquiry, application or registration of interest does not create any obligation on the club to offer a trial, place, role or partnership.",
    ],
  },
  {
    heading: "External links",
    body: [
      "This site links to external websites, including social media platforms and mapping services. The club is not responsible for their content or their privacy practices.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "These terms may be updated as the club and the website develop. The version published here is the one that applies.",
    ],
  },
  {
    heading: "Contact",
    body: [`Questions about these terms should be sent to ${contact.general}.`],
  },
];

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero eyebrow="Legal" title="Terms of Use" trail={trail} />

      <Section className="bg-pitch-950">
        <Container width="narrow">
          <div className="rounded-xl border border-gold-400/25 bg-gold-400/[0.06] px-6 py-5">
            <p className="text-sm leading-relaxed text-cream/75">
              <strong className="font-bold text-gold-300">Review before launch.</strong>{" "}
              These terms are a working draft written to match how the site
              currently operates. They are not legal advice and should be reviewed
              before the site goes live.
            </p>
          </div>

          <div className="mt-12 space-y-11">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="display text-2xl text-cream sm:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-5 space-y-4 text-base leading-relaxed text-cream/70">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
