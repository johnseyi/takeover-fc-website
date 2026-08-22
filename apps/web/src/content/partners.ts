/**
 * Partners — master plan §§19, 38.
 *
 * Deliberately empty. The club has no announced partners yet, and inventing
 * placeholder sponsor logos would undermine exactly the credibility this page
 * exists to build (§64: "Show, don't simply tell"). The partners page renders
 * an open-invitation state while this list is empty, and switches to a logo
 * wall automatically once real partners are added.
 */

import type { Partner } from "@/lib/types";

export const partners: Partner[] = [];

/** Named collaborations the club can point to today. */
export const collaborations = [
  {
    name: "Takeover Creatives Uganda",
    relationship: "Parent organisation",
    description:
      "Takeover Creatives FC operates under Takeover Creatives Uganda, the organisation behind the club's founding, identity and creative direction.",
  },
  {
    name: "Standard High School Zana — Ndeje Campus",
    relationship: "School connection",
    description:
      "Players associated with the club, including Under-17 captain Kenneth Gidudu and senior player Imran Yasin, are students at the school — a connection that keeps football and education aligned.",
  },
] as const;

/** How a partnership conversation actually runs (§39). */
export const partnershipProcess = [
  {
    step: "01",
    title: "Get in touch",
    description:
      "Tell us which area interests you — equipment, education, transport, health, media, infrastructure or general sponsorship.",
  },
  {
    step: "02",
    title: "We send the detail",
    description:
      "Club information, what the contribution would support, and what visibility and reporting look like in practice.",
  },
  {
    step: "03",
    title: "Agree the shape",
    description:
      "We define the commitment, the duration and the specific outcomes it funds. No vague arrangements.",
  },
  {
    step: "04",
    title: "Build it publicly",
    description:
      "Partners appear on the club's website, kit and media, and the work is documented so the contribution is visible.",
  },
] as const;
