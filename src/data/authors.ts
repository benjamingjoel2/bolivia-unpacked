/**
 * Authors. Only real bylines go here. Add a named writer only with their consent,
 * a real bio and the trips they actually made; never invent a person.
 */
export interface Author { id: string; name: string; role: string; bio: string[]; url?: string }

export const authors: Author[] = [
  {
    id: 'desk',
    name: 'The Bolivia Unpacked desk',
    role: 'Writers and editors, Tourground',
    bio: [
      'Posts on Bolivia Unpacked are written and edited by the Bolivia Unpacked desk at Tourground, the travel directory that publishes this blog.',
      'We write from official sources and from what local operators in the Tourground directory know about running trips on the ground. Health, entry and safety facts link to the official source and show the date we last checked them.',
      'We do not publish invented quotes, reviews, prices or statistics. When we cannot source something, we leave it out.',
    ],
  },
];

export const authorById = (id: string) => authors.find((a) => a.id === id);
