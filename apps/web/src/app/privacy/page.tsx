import { PageHero } from "@/components/page-hero";
import { Container, JsonLd, Section } from "@/components/ui";
import { contact, site } from "@/content/site";
import { breadcrumbSchema, pageMetadata } from "@/lib/seo";

const trail = [
  { label: "Home", href: "/" },
  { label: "Privacy Policy", href: "/privacy" },
];

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal information submitted through this website.`,
  path: "/privacy",
});

const sections = [
  {
    heading: "Who we are",
    body: [
      `${site.name} ("the club", "we", "us") is a community football club based in ${site.location}, operating under ${site.parentOrganisation}. This policy explains how we handle personal information submitted through this website.`,
    ],
  },
  {
    heading: "What we collect",
    body: [
      "We collect only the information you choose to send us. When you use an enquiry form, your mail application sends us your name, email address, and any phone number, organisation or message content you include.",
      "This website does not require an account, and we do not ask for payment details.",
    ],
  },
  {
    heading: "How enquiry forms work",
    body: [
      "The enquiry forms on this site do not transmit data to a server owned by the club. They open a pre-filled message in your own email application, which you then send yourself. Nothing is submitted until you press send in your mail client.",
    ],
  },
  {
    heading: "Why we use your information",
    body: [
      "To reply to your enquiry, to process player, coaching or volunteer applications, to discuss partnerships, and to keep a record of interest so we can contact you when relevant opportunities open.",
      "We do not sell personal information, and we do not share it with third parties for marketing.",
    ],
  },
  {
    heading: "Young people",
    body: [
      "Applications from anyone under 18 should be made with a parent or guardian, whose contact details we ask to be included. The club will not process a young person's registration without a parent or guardian involved.",
      "Player profiles published on this site are limited to football information. We do not publish home addresses, dates of birth, contact details or any other sensitive personal information about young players.",
    ],
  },
  {
    heading: "Photography",
    body: [
      "The club photographs matches, training and community activity, and publishes selected images on this website and its social channels. If you or a young person in your care appears in a photograph you would like removed, contact us and we will remove it.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Enquiries are kept for as long as they remain relevant to the reason you contacted us, and are deleted when they no longer are.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask us what information we hold about you, ask for it to be corrected, or ask us to delete it. Email the club and we will act on your request.",
    ],
  },
  {
    heading: "Analytics and cookies",
    body: [
      "This website does not currently set advertising or tracking cookies. If the club introduces analytics in future, this policy will be updated before it goes live.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions about this policy should be sent to ${contact.general}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <PageHero eyebrow="Legal" title="Privacy Policy" trail={trail} />

      <Section className="bg-pitch-950">
        <Container width="narrow">
          <div className="rounded-xl border border-gold-400/25 bg-gold-400/[0.06] px-6 py-5">
            <p className="text-sm leading-relaxed text-cream/75">
              <strong className="font-bold text-gold-300">Review before launch.</strong>{" "}
              This policy is drafted to reflect how the website actually behaves
              today. It is not legal advice, and the club should have it reviewed
              against Uganda&apos;s Data Protection and Privacy Act before going
              live.
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
