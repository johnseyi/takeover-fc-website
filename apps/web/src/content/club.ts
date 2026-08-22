/**
 * Club identity content — mission, vision, values, communities, timeline and
 * impact areas. Copy is taken from the Official Website Master Plan (§§13–24,
 * 33–35, 56, 58) so the site speaks in the voice the club specified.
 */

export const mission =
  "To use football as a platform for developing young people through sport, education, mentorship, discipline, creativity and opportunity.";

export const vision =
  "To build a respected football institution that develops talented and disciplined young people while creating lasting opportunities for individuals and communities.";

/** §13 — Homepage "Who we are". */
export const whoWeAre = [
  "Takeover Creatives FC was built from the belief that football can be more than a game. It can become a pathway to discipline, education, mentorship, confidence, opportunity and community transformation.",
  "Founded in 2024, Takeover FC is growing from a community football initiative into a structured football club with ambitions to develop young players, build teams, create opportunities and establish a lasting institution around football.",
];

/** §21 — About the club page. */
export const aboutTheClub = [
  "Takeover Creatives FC is a community-driven football club founded in 2024 under Takeover Creatives Uganda.",
  "The club exists to use football as a platform for youth development, discipline, mentorship, education and opportunity.",
  "Our ambition is to build a structured football institution capable of developing players while creating meaningful opportunities for young people both on and beyond the pitch.",
];

/** §5 — Why the Takeover Creatives identity matters. */
export const creativityStatement = [
  "Creativity is not limited to graphic design, art or technology.",
  "Football itself is creative. Community development is creative. Youth empowerment is creative. Building opportunities where none existed is creative.",
  "That is where the Takeover Creatives identity becomes powerful.",
];

/** §24 — Core values. */
export const values = [
  {
    title: "Discipline",
    description: "Talent without discipline cannot build a lasting career.",
  },
  {
    title: "Character",
    description: "We develop the person as much as the player.",
  },
  {
    title: "Creativity",
    description: "Football is an expression of imagination, intelligence and individuality.",
  },
  {
    title: "Teamwork",
    description: "No player, coach or organisation succeeds alone.",
  },
  {
    title: "Respect",
    description: "Respect for teammates, opponents, officials, communities and the game.",
  },
  {
    title: "Opportunity",
    description: "Every young person deserves a chance to discover what they can become.",
  },
  {
    title: "Community",
    description: "Our roots remain central to our identity.",
  },
] as const;

/** §14 — Our story timeline. */
export const timeline = [
  {
    marker: "2024",
    title: "The Beginning",
    description: "Takeover FC is established as a community-based football initiative.",
    image: "/images/match-dirt-pitch-duel.jpg",
    imageAlt:
      "Takeover FC players competing for the ball on a dirt pitch in a Kampala community",
  },
  {
    marker: "Today",
    title: "Building the Club",
    description:
      "The organisation is developing its structure, identity, player development systems and community programmes.",
    image: "/images/squad-lineup-community.jpg",
    imageAlt: "The Takeover FC squad lined up on a community pitch before kick-off",
  },
  {
    marker: "Next",
    title: "The Academy",
    description: "Development of a structured youth academy.",
    image: "/images/squad-portrait-five.jpg",
    imageAlt: "Five Takeover FC players standing together in club kit after a match",
  },
  {
    marker: "Future",
    title: "A Club Built to Last",
    description:
      "Expansion into girls' football, scholarships, national competitions and a community sports centre.",
    image: "/images/champions-trophy-celebration.jpg",
    imageAlt: "Young footballers celebrating together with a championship trophy",
  },
] as const;

/** §1, §15 — The communities the club is rooted in. */
export const communities = [
  "Namuwongo",
  "Kanyogoga",
  "Kasanvu",
  "Soweto",
  "Tebaleka",
] as const;

export const communityIntro = [
  "Takeover FC is rooted in the communities of Namuwongo, Kanyogoga, Kasanvu, Soweto and Tebaleka.",
  "These communities are not simply locations on a map. They are part of the club's identity.",
  "Through football, mentorship, education and opportunity, Takeover FC aims to help young people see possibilities beyond their immediate circumstances.",
];

/** §34 — Community impact areas. */
export const impactAreas = [
  {
    title: "Football",
    description: "Creating access to organised football.",
  },
  {
    title: "Education",
    description: "Encouraging young people to remain connected to education.",
  },
  {
    title: "Mentorship",
    description: "Providing guidance and positive role models.",
  },
  {
    title: "Life Skills",
    description: "Developing discipline, teamwork, responsibility and resilience.",
  },
  {
    title: "Opportunity",
    description: "Connecting young people to football and development opportunities.",
  },
] as const;

/** §12 — Homepage club statistics. */
export const clubStats = [
  { value: 2024, label: "Founded", format: "plain" as const },
  { value: 25, label: "Young People Served", suffix: "+" },
  { value: 5, label: "Core Communities" },
  { value: 1, label: "Bigger Mission" },
] as const;

/** §17 — Homepage impact areas (short labels). */
export const impactPillars = [
  "Football Development",
  "Education",
  "Mentorship",
  "Life Skills",
  "Community",
  "Opportunity",
] as const;

/** §56 — The brand story, used as a standalone narrative block. */
export const brandStory = [
  "It started with football.",
  "But football became the platform.",
  "The platform became a community.",
  "The community became a club.",
  "And the club is becoming an institution.",
] as const;

/** §58 — The "Takeover" language system. */
export const takeoverLanguage = [
  { phrase: "Takeover The Pitch", meaning: "Football" },
  { phrase: "Takeover The Future", meaning: "Youth development" },
  { phrase: "Takeover Opportunity", meaning: "Community" },
  { phrase: "Takeover Your Potential", meaning: "Player development" },
  { phrase: "Takeover Together", meaning: "Partnership" },
] as const;

/** §36 — Academy page sections. */
export const academySections = [
  {
    title: "Why the Academy",
    description:
      "Talent in our communities is not scarce — structure is. A dedicated academy gives young players a consistent environment in which to train, learn and be seen.",
  },
  {
    title: "Player Development",
    description:
      "Long-term individual development plans built around technique, physical readiness, game understanding and position-specific work.",
  },
  {
    title: "Football Training",
    description:
      "Structured weekly sessions with qualified coaching, progressive workloads and regular competitive football.",
  },
  {
    title: "Education",
    description:
      "Academy participation is tied to staying connected to school. Football is the platform, not the replacement.",
  },
  {
    title: "Character Development",
    description:
      "Discipline, punctuality, responsibility and respect are coached as deliberately as passing and finishing.",
  },
  {
    title: "Mentorship",
    description:
      "Every player is supported by coaches and senior players who understand where they come from.",
  },
  {
    title: "Pathways",
    description:
      "A clear route from community football into the Under-17 squad, the senior team and opportunities beyond the club.",
  },
  {
    title: "Coaching",
    description:
      "Investment in coach education so the standard of instruction grows with the club.",
  },
  {
    title: "Talent Identification",
    description:
      "Open, community-based scouting so ability — not access — determines who gets a chance.",
  },
] as const;

/** §37 — Girls' football long-term vision. */
export const girlsFootball = {
  status: "In development",
  statement:
    "Takeover FC believes football opportunities should not be limited by gender. The club's long-term development strategy includes establishing a girls' football programme that creates pathways for young female players.",
  ambitions: [
    "A dedicated girls' training group within the community",
    "Qualified coaching and safeguarding built in from the first session",
    "Competitive fixtures against other Kampala sides",
    "The same education, mentorship and life-skills support the boys' teams receive",
    "A pathway into a full girls' academy squad",
  ],
} as const;

/** §38 — Partnership areas. */
export const partnershipAreas = [
  "Sponsorship",
  "Equipment",
  "Player development",
  "Education",
  "Technology",
  "Transport",
  "Health and welfare",
  "Community programmes",
  "Events",
  "Media",
  "Infrastructure",
] as const;

/** §39 — Why partner with Takeover FC. */
export const whyPartner = [
  {
    title: "Youth Reach",
    description:
      "Direct, trusted access to young people across five Kampala communities.",
  },
  {
    title: "Community Presence",
    description:
      "The club operates inside the neighbourhoods it serves, not at a distance from them.",
  },
  {
    title: "Football Platform",
    description:
      "Matchdays, kit, training and competitions offer visible, repeated brand association.",
  },
  {
    title: "Brand Visibility",
    description:
      "Club media, photography and match coverage carry partners into every story we tell.",
  },
  {
    title: "Social Impact",
    description:
      "Contributions are tied to measurable youth development outcomes, not vanity metrics.",
  },
  {
    title: "Long-Term Development",
    description:
      "We are building an institution. Partners who join early grow with it.",
  },
] as const;

/** §39 — What partner contributions can support. */
export const partnershipSupports = [
  "Football equipment",
  "Training",
  "Player welfare",
  "Transport",
  "Medical support",
  "Kits",
  "Academy development",
  "Community programmes",
] as const;

/** §40 — Support categories. */
export const supportOptions = [
  {
    title: "Sponsor",
    description: "Support the club financially.",
    detail:
      "Sponsorship covers the running costs that keep a football club upright: pitch hire, match officials, transport to fixtures and competition entry.",
    href: "/partner-with-us",
    cta: "Discuss sponsorship",
  },
  {
    title: "Donate",
    description: "Make a direct contribution.",
    detail:
      "One-off contributions go straight into player welfare — meals on matchdays, medical support and travel for players who cannot cover it themselves.",
    href: "/contact?enquiry=support",
    cta: "Make a donation",
  },
  {
    title: "Donate Equipment",
    description: "Support players with football equipment.",
    detail:
      "Boots, balls, training bibs, goalkeeper gloves, cones and kit. Equipment is the single most immediate way to increase how many young people can play.",
    href: "/contact?enquiry=support",
    cta: "Donate equipment",
  },
  {
    title: "Volunteer",
    description: "Contribute skills and time.",
    detail:
      "Coaching, physiotherapy, administration, photography, tutoring and safeguarding. Skills are as valuable to this club as funding.",
    href: "/join#volunteer",
    cta: "Volunteer with us",
  },
  {
    title: "Partner",
    description: "Build a long-term institutional relationship.",
    detail:
      "For organisations that want to build something with the club over years — an academy, a programme, a facility — rather than back a single season.",
    href: "/partner-with-us",
    cta: "Become a partner",
  },
] as const;

/** §44 — Join Takeover routes. */
export const joinOptions = [
  {
    id: "player",
    title: "Become a Player",
    description: "Player registration and trial applications.",
    detail:
      "Open to young players from our communities and beyond. Tell us your age, position, current school and where you play now. Ability matters more than history.",
    enquiryType: "Player",
  },
  {
    id: "coach",
    title: "Become a Coach",
    description: "Technical opportunities.",
    detail:
      "We are building a coaching group that can grow with the academy. Qualifications help, but commitment to young people matters more.",
    enquiryType: "Coaching",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description: "Community and administrative opportunities.",
    detail:
      "Matchday support, community programmes, media, tutoring, logistics and safeguarding. Give what time you have.",
    enquiryType: "Volunteer",
  },
  {
    id: "work",
    title: "Work With Us",
    description: "Professional opportunities.",
    detail:
      "As the club formalises, roles in operations, communications and player welfare will open. Register your interest and we will be in touch.",
    enquiryType: "Careers",
  },
  {
    id: "partner",
    title: "Partner With Us",
    description: "Institutional opportunities.",
    detail:
      "Schools, NGOs, businesses, associations and academies who want to build something alongside Takeover FC.",
    enquiryType: "Partnership",
  },
] as const;
