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
  tagline: 'The plain-English reference for planning Bolivia',
  positioning:
    'The plain-English reference for planning Bolivia: altitude, the salt flats, the Andes and the Amazon, and the verified operators who make it easy.',
  domain: 'boliviaunpacked.tourground.com',
  url: 'https://boliviaunpacked.tourground.com',
  language: 'en',
  locale: 'en_GB',
  /** The only email address used anywhere on the site. */
  email: 'boliviaunpacked@tourground.com',
  editorLine: 'Edited by the Tourground publishing desk for Bolivia.',
  /** Launch / first-publication date of the site (ISO). Used as the published date for feed-driven pages. */
  launchDate: '2026-11-07',
  /** Accent colour (lagoon flamingo pink). Also update --accent in src/styles/global.css if changed. */
  accentColour: '#D94F7E',
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
};

/**
 * Disclosure and paid-label wording. A lawyer may edit any string here.
 * Do not hard-code this wording anywhere else in the codebase.
 */
export const disclosure = {
  footerPublishedBy: 'Published by Tourground.',
  footerShort:
    'Bolivia Unpacked is an independent reference published by Tourground. Rankings come only from the Tourground directory and are never paid for.',
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
    'Bolivia Unpacked is published by Tourground, which runs a directory and booking platform for tour operators and travel agencies. This site exists to help travellers plan Bolivia and to point them to verified companies listed on Tourground.',
    'Tourground has a commercial interest in travellers booking with companies on its platform. Links from company pages lead to those companies’ Tourground profile pages.',
    'Some brands are owned by Tourground’s founders through Tourground Geotrax. For Bolivia this is Altiplano Journeys. Wherever a founder-owned brand appears it carries the label “Founder-owned (Tourground Geotrax)”. It follows the same ranking rules as every other company.',
    'Ranks are taken unchanged from the Tourground directory export. Nobody can pay to change a rank. Companies on the Platinum tier may link to their own website; those links are marked rel="sponsored nofollow". All other companies link only to their Tourground profile.',
    'Paid placements, when they exist, are labelled “Advertisement feature”, appear at the top of a page and are visually separated from the rankings. At the time of writing there are no paid placements on this site.',
    'Guide and question pages are written by the Tourground publishing desk for Bolivia. No company pays for or reviews them before publication.',
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
 * Image credits. Every image used on the site must have an entry.
 * Unsplash images are allowed without a credit line on the site, but record them here.
 */
export const imageCredits: Array<{ file: string; owner: string; licence: string; note?: string }> = [
  {
    file: 'public/og-default.png',
    owner: 'Tourground',
    licence: 'Owned (generated typographic card, no photography)',
  },
];
