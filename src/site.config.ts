/**
 * Bolivia Unpacked: the one site config file.
 *
 * Everything an editor, the owner or a lawyer may need to change lives here:
 * name, domain, editor line, accent colour, contact details, address,
 * and ALL disclosure and paid-placement wording.
 *
 * Legal sign-off (US, UK, EU, Brazil) is required before launch.
 * Record the sign-off in `legal.signOff` below once given.
 */

export const site = {
  name: 'Bolivia Unpacked',
  tagline: 'Travel stories and practical planning for Bolivia',
  positioning:
    'Story-led, practical travel writing for people planning a trip to Bolivia: the salt flats, La Paz, Lake Titicaca, the colonial south and the Amazon, with every trip linked to a verified local operator.',
  domain: 'boliviaunpacked.tourground.com',
  url: 'https://boliviaunpacked.tourground.com',
  language: 'en',
  locale: 'en_GB',
  /** The only email address used anywhere on the site. */
  email: 'boliviaunpacked@tourground.com',
  editorLine: 'Written and edited by the Bolivia Unpacked desk at Tourground.',
  /** Launch / first-publication date of the site (ISO). Used as the published date for feed-driven pages. */
  launchDate: '2026-11-07',
  /** Accent colour (Andean terracotta). Also update --terracotta in src/styles/global.css if changed. */
  accentColour: '#B5502F',
  /** Destination country code used for ranks in the feed (rank.BO). */
  countryCode: 'BO',
  destinationSlug: 'bolivia',
} as const;

export const publisher = {
  name: 'Tourground',
  url: 'https://tourground.com',
  /** Founder-owned brand group label. */
  founderGroup: 'Tourground Geotrax',
  /**
   * Business address: the publishing desk for this destination.
   * PLACEHOLDER until the founders confirm (see FACTS-TO-VERIFY.md).
   * While `placeholder` is true the site shows only the city and country,
   * with a "pending confirmation" note, never a made-up street address.
   */
  address: {
    placeholder: true,
    venue: 'To be confirmed: premium coworking space, La Paz',
    street: '',
    locality: 'La Paz',
    region: 'La Paz',
    postalCode: '',
    country: 'Bolivia',
    countryCode: 'BO',
  },
  /**
   * Main-site contact flow for corrections and removals.
   * PLACEHOLDER URL until the main site's flow exists (see FACTS-TO-VERIFY.md).
   */
  correctionUrl: 'https://tourground.com/contact?topic=booster-correction&site=boliviaunpacked',
  /** Where "browse verified operators" points. PLACEHOLDER until a Bolivia-filtered directory URL exists. */
  directoryUrl: 'https://tourground.com/',
};

/**
 * Newsletter. No mailing-list provider is connected yet.
 * While `action` is empty the sign-up form is replaced by an email link (subject "Subscribe").
 * To switch on a real form, set `action` to the provider's form POST URL and `emailField` to its email field name.
 */
export const newsletter = {
  action: '',
  emailField: 'email',
  pitch: 'One email when we publish something new: trip stories, seasonal notes and planning advice for Bolivia. No spam, unsubscribe any time.',
};

/**
 * Disclosure and paid-label wording. A lawyer may edit any string here.
 * Do not hard-code this wording anywhere else in the codebase.
 */
export const disclosure = {
  footerPublishedBy: 'Published by Tourground.',
  footerShort:
    'Bolivia Unpacked is a travel blog published by Tourground. Every trip links to a verified operator in the Tourground directory. Paid placements are always labelled “Advertisement feature”.',
  planBoxNote:
    'Operators are listed through the Tourground directory, which publishes only verified companies. Tourground earns money when travellers book through its platform.',
  founderOwnedLabel: 'Founder-owned (Tourground Geotrax)',
  founderOwnedExplainer:
    'This brand is owned by the founders of Tourground, the publisher of this site. It is ranked by the same rules as every other company and gets no preferential position.',
  paidLabel: 'Advertisement feature',
  paidExplainer:
    'Advertisement features are paid for. They are shown separately from the rankings, never change a company’s rank and are always labelled.',
  paidLinkRel: 'sponsored nofollow',
  rankingStatement:
    'Rank is merit, never paid. The order on every list comes only from the rank field in the Tourground directory export. We do not reorder it and payment is never taken into account.',
  verifiedOnlyStatement:
    'We list only companies the Tourground directory marks as verified, plus brands owned by Tourground’s founders, which are labelled as such. Unverified companies and prospects are never published.',
  correctionLinkText: 'Request a correction or removal',
  examplesBanner:
    'Example record. This is not a real company. It exists only to test the site templates and is never published on the live site.',
  /** Full text of the Publisher disclosure page. Paragraphs. */
  publisherDisclosure: [
    'Bolivia Unpacked is a travel blog published by Tourground, which runs a directory and booking platform for tour operators and travel agencies. The blog exists to help travellers plan Bolivia and to point them to verified local companies listed on Tourground.',
    'Tourground has a commercial interest in travellers booking with companies on its platform. Every post ends with a “Plan this trip” box that links to an operator’s page on Tourground.',
    'Some brands are owned by Tourground’s founders through Tourground Geotrax. For Bolivia this is Altiplano Journeys. Wherever Altiplano Journeys is recommended it carries the label “Founder-owned (Tourground Geotrax)”, so you can weigh the recommendation knowing that relationship.',
    'Operators shown on this site come only from the Tourground directory, which publishes companies it has verified. Nobody pays for a recommendation inside a post.',
    'Paid placements, when they exist, are labelled “Advertisement feature” and are visually separated from editorial content. Links in them are marked rel="sponsored nofollow". At the time of writing there are no paid placements on this site.',
    'Posts are written by the Bolivia Unpacked desk. No company pays for, writes or reviews a post before publication.',
  ],
  /** Tier names as shown to readers. */
  tierLabels: {
    verified: 'Verified',
    black: 'Black (verified)',
    platinum: 'Platinum (verified)',
    founder: 'Founder-owned (Tourground Geotrax)',
  } as Record<string, string>,
  tierExplainer:
    'Tiers are set by Tourground. Verified, Black and Platinum companies have passed Tourground’s verification. Tier never affects rank. Platinum is a paid tier that allows a link to the company’s own website.',
};

export const legal = {
  /** Record who signed off and when. Launch only when all four are true. */
  signOff: { US: false, UK: false, EU: false, BR: false },
  controllerName: 'Tourground',
  /** Effective date of Privacy, Terms and Cookie policies (ISO). */
  policiesEffective: '2026-11-07',
};

export const analytics = {
  /** Vercel Web Analytics only. No other tracking. */
  vercelWebAnalytics: true,
};

/** Paid placement is not built yet. Keep empty; the AdSlot component renders nothing when empty. */
export const paidPlacements: Array<{
  id: string;
  pages: string[];
  title: string;
  body: string;
  href: string;
}> = [];

/**
 * Image credits live in src/data/photos.json (one record per photograph: author, licence, source).
 * The /photo-credits/ page and every photo caption are generated from that file.
 * Only freely licensed photographs (Wikimedia Commons, CC BY / CC BY-SA / CC0 / public domain) with no identifiable people.
 */
