import { site, publisher } from '../site.config';

export const abs = (p: string) => new URL(p, site.url).toString();

export interface Crumb { name: string; path: string }

export const ORG_ID = `${site.url}/#publisher`;
export const SITE_ID = `${site.url}/#website`;

export function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: publisher.name,
    url: publisher.url,
    email: site.email,
    logo: { '@type': 'ImageObject', url: abs('/favicon.svg') },
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: site.name,
    url: site.url + '/',
    description: site.positioning,
    inLanguage: site.language,
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbNode(crumbs: Crumb[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: abs(c.path) })),
  };
}

export function webPageNode(opts: { type?: string; path: string; title: string; description: string; image?: string }) {
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': abs(opts.path) + '#webpage',
    url: abs(opts.path),
    name: opts.title,
    description: opts.description,
    inLanguage: site.language,
    isPartOf: { '@id': SITE_ID },
    publisher: { '@id': ORG_ID },
    ...(opts.image ? { primaryImageOfPage: { '@type': 'ImageObject', url: opts.image } } : {}),
  };
}

export function blogPostingNode(opts: {
  path: string; title: string; description: string; published: string; modified: string;
  authorName: string; authorPath: string; image: { url: string; width: number; height: number };
  section: string; keywords: string[]; wordCount: number; citations: string[];
}) {
  return {
    '@type': 'BlogPosting',
    '@id': abs(opts.path) + '#article',
    headline: opts.title.slice(0, 110),
    description: opts.description,
    url: abs(opts.path),
    mainEntityOfPage: abs(opts.path),
    image: { '@type': 'ImageObject', url: opts.image.url, width: opts.image.width, height: opts.image.height },
    datePublished: opts.published,
    dateModified: opts.modified,
    inLanguage: site.language,
    author: { '@type': 'Organization', name: opts.authorName, url: abs(opts.authorPath), parentOrganization: { '@id': ORG_ID } },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': SITE_ID },
    articleSection: opts.section,
    keywords: opts.keywords.join(', '),
    wordCount: opts.wordCount,
    ...(opts.citations.length ? { citation: opts.citations } : {}),
  };
}

/** Wrap nodes in one @graph. Organization and WebSite are always included. */
export function graph(nodes: object[]) {
  return { '@context': 'https://schema.org', '@graph': [organizationNode(), websiteNode(), ...nodes] };
}
