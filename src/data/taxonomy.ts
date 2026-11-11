/** Blog categories and destinations. Order here is the order shown on the site. */

export interface Category { slug: string; name: string; description: string }
export interface DestinationTopic { slug: string; name: string; description: string; photo: string }

export const categories: Category[] = [
  { slug: 'destinations', name: 'Destinations', description: 'La Paz, the Uyuni salt flats, Lake Titicaca, Sucre and Potosí, the Amazon and the Yungas: what each place is like and how to see it well.' },
  { slug: 'itineraries', name: 'Itineraries', description: 'Day-by-day routes through Bolivia, paced for the altitude, and how to fit Bolivia together with its neighbours.' },
  { slug: 'altitude-health', name: 'Altitude & Health', description: 'How to handle the altitude, what the official health advice says, and how to plan a trip that lets your body keep up.' },
  { slug: 'adventure', name: 'Adventure', description: 'Multi-day jeep crossings, rainforest and pampas trips, and the outdoor side of Bolivia, with the safety questions worth asking.' },
  { slug: 'food-culture', name: 'Food & Culture', description: 'Markets, colonial cities, the lake communities and the everyday life you meet on the road in Bolivia.' },
  { slug: 'travel-tips', name: 'Travel Tips', description: 'Seasons, entry rules, getting around and the practical things first-timers ask about Bolivia.' },
];

export const destinations: DestinationTopic[] = [
  { slug: 'la-paz', name: 'La Paz', description: 'The seat of government, poured into a canyon below El Alto, with the cable cars overhead and Illimani on the skyline.', photo: 'la-paz-illimani' },
  { slug: 'uyuni', name: 'Uyuni & the salt flats', description: 'The Salar de Uyuni and the lagoons, geysers and deserts of Sur Lípez, usually seen on a multi-day 4x4 trip.', photo: 'uyuni-salt-crust' },
  { slug: 'titicaca', name: 'Lake Titicaca', description: 'Copacabana, Isla del Sol and the lake shore, with the Cordillera Real across the water.', photo: 'isla-del-sol' },
  { slug: 'sucre-potosi', name: 'Sucre & Potosí', description: 'Two UNESCO World Heritage cities: white-walled Sucre and the silver city of Potosí below the Cerro Rico.', photo: 'sucre' },
  { slug: 'amazon', name: 'The Amazon', description: 'Rurrenabaque, the rainforest of Madidi and the wetlands of the pampas in Bolivia’s lowland north.', photo: 'madidi' },
  { slug: 'yungas', name: 'The Yungas', description: 'Steep, green valleys that fall from the Andes towards the Amazon, a short drive and a world away from La Paz.', photo: 'yungas' },
];

export const categoryBySlug = (s: string) => categories.find((c) => c.slug === s);
export const destinationBySlug = (s: string) => destinations.find((d) => d.slug === s);
export const categoryPath = (s: string) => (s === 'destinations' ? '/destinations/' : `/category/${s}/`);
export const destinationPath = (s: string) => `/destinations/${s}/`;
