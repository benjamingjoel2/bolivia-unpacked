import { site, publisher } from '../site.config';
import type { Company } from './feed';
import { countryName, outboundLink } from './feed';

export const abs = (p: string) => new URL(p, site.url).toString();

export interface Crumb { name: string; path: string }

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export const publisherLd = () => ({
  '@type': 'Organization',
  '@id': `${publisher.url}/#organization`,
  name: publisher.name,
  url: publisher.url,
});

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    name: site.name,
    url: site.url + '/',
    description: site.positioning,
    inLanguage: site.language,
    publisher: publisherLd(),
  };
}

export function articleLd(opts: { title: string; description: string; path: string; published: string; modified: string; about?: object }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title.slice(0, 110),
    description: opts.description,
    url: abs(opts.path),
    mainEntityOfPage: abs(opts.path),
    datePublished: opts.published,
    dateModified: opts.modified,
    inLanguage: site.language,
    author: publisherLd(),
    publisher: { ...publisherLd(), logo: { '@type': 'ImageObject', url: abs('/og-default.png') } },
    image: abs('/og-default.png'),
    isPartOf: { '@id': `${site.url}/#website` },
    ...(opts.about ? { about: opts.about } : {}),
  };
}

export function destinationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['TouristDestination', 'Country'],
    '@id': `${site.url}/#bolivia`,
    name: 'Bolivia',
    alternateName: 'Plurinational State of Bolivia',
    url: abs('/guide/'),
    sameAs: ['https://www.wikidata.org/wiki/Q750'],
    containsPlace: [
      { '@type': 'Place', name: 'La Paz' },
      { '@type': 'Place', name: 'Lake Titicaca' },
      { '@type': 'Place', name: 'Salar de Uyuni' },
      { '@type': 'Place', name: 'Potosí' },
      { '@type': 'Place', name: 'Sucre' },
      { '@type': 'Place', name: 'Cordillera Real' },
      { '@type': 'Place', name: 'Yungas' },
      { '@type': 'Place', name: 'Rurrenabaque' },
      { '@type': 'Place', name: 'Santa Cruz de la Sierra' },
    ],
  };
}

export function companyLd(c: Company, path: string) {
  const link = outboundLink(c);
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': abs(path) + '#company',
    name: c.name,
    description: c.summary,
    url: abs(path),
    sameAs: [c.profile_url, ...(link.paid ? [link.href] : [])],
    address: { '@type': 'PostalAddress', addressCountry: c.country_base },
    areaServed: c.delivers_in.map((code) => ({ '@type': 'Country', name: countryName(code) })),
    ...(c.memberships && c.memberships.length ? { memberOf: c.memberships.map((m) => ({ '@type': 'Organization', name: m })) } : {}),
    ...(c.founder_owned ? { parentOrganization: { '@type': 'Organization', name: publisher.founderGroup } } : {}),
  };
}

export function itemListLd(name: string, path: string, items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    url: abs(path),
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: abs(it.path) })),
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}
