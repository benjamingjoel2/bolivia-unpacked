/**
 * Ranked-list definitions. Lists are filters over the feed; ORDER ALWAYS COMES FROM rank[BO].
 * `match` is the value expected in a company's `niches[]` array in the feed
 * (null = every ranked company based in Bolivia).
 */
export interface NicheList {
  slug: string;
  title: string;
  short: string;
  intro: string;
  match: string | null;
  localOnly?: boolean;
}

export const nicheLists: NicheList[] = [
  {
    slug: 'local-operators',
    title: 'Best local operators in Bolivia',
    short: 'Local operators',
    intro: 'Verified companies based in Bolivia that deliver trips in Bolivia, in the order of their Tourground directory rank for Bolivia.',
    match: null,
    localOnly: true,
  },
  {
    slug: 'salt-flats-lipez',
    title: 'Salt flats and Lípez operators',
    short: 'Salt flats and Lípez',
    intro: 'Verified companies whose directory listing includes trips on the Salar de Uyuni and the Sur Lípez lagoons.',
    match: 'salt-flats-lipez',
  },
  {
    slug: 'trekking-climbing',
    title: 'Trekking and climbing operators in Bolivia',
    short: 'Trekking and climbing',
    intro: 'Verified companies whose directory listing includes trekking or mountaineering, for example in the Cordillera Real.',
    match: 'trekking-climbing',
  },
  {
    slug: 'amazon',
    title: 'Bolivian Amazon operators',
    short: 'Amazon',
    intro: 'Verified companies whose directory listing includes trips in the Bolivian Amazon, for example around Rurrenabaque and Madidi.',
    match: 'amazon',
  },
  {
    slug: 'culture-markets',
    title: 'Culture and markets operators in Bolivia',
    short: 'Culture and markets',
    intro: 'Verified companies whose directory listing includes cultural trips: cities, markets, festivals and heritage sites.',
    match: 'culture-markets',
  },
  {
    slug: 'family',
    title: 'Family trip operators in Bolivia',
    short: 'Family',
    intro: 'Verified companies whose directory listing includes family trips.',
    match: 'family',
  },
  {
    slug: 'overland-peru-chile',
    title: 'Overland combinations with Peru and Chile',
    short: 'Overland with Peru and Chile',
    intro: 'Verified companies whose directory listing includes multi-country overland trips combining Bolivia with Peru or Chile.',
    match: 'overland-peru-chile',
  },
];
