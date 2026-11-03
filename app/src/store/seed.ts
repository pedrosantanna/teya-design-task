// Mock content from app flow v8 (docs/develop/ideation/app-flow-v8.html): Sam's eclipse glasses and
// Jess's collect-after-work sourdough, around Blythe Road, W14. No real shop is represented.
import type { Area, AreaId, ContentSet, Persona, PersonaContent, Place, Shop } from './types';

// The 12 mock shops (docs/deliver/prototype.md, Mocked content). Walk times are from Blythe Road, W14; the
// Kensington area below reuses three of them with walk times from Kensington High St. No real shop is represented.
const shops: Record<string, Shop> = {
  corner: {
    id: 'corner',
    name: 'Blythe Road News',
    kind: 'cornerShop',
    street: 'Blythe Road',
    walkMinutes: 1,
    openUntil: '11pm',
    opensAt: '7am',
    image: 'corner-shop-front',
    isNew: true,
    source: 'asked',
    collectWindow: '7 days',
    items: [
      { name: 'Birthday candles', price: 1.99 },
      { name: 'AA batteries, pack of 4', price: 4.5 },
      { name: 'Birthday card', price: 2.95 },
    ],
  },
  rossis: {
    id: 'rossis',
    name: "Rossi's Bakery",
    kind: 'bakery',
    street: 'Blythe Road',
    walkMinutes: 2,
    openUntil: '6pm',
    opensAt: '7am',
    image: 'rossis-bakery-front',
    promoted: true,
    notice: "2 days' notice",
    source: 'asked',
    collectWindow: 'same day',
    items: [
      { name: 'Sourdough loaf', price: 4.2 },
      { name: 'Rye loaf', price: 4.5 },
      { name: 'Birthday cake, 2 days\' notice', price: 32 },
    ],
    history: [
      { item: 'Sourdough', had: true, when: '2 hours ago' },
      { item: 'Rye loaf', had: false, when: 'this morning' },
    ],
  },
  brookHardware: {
    id: 'brookHardware',
    name: 'Brook Hardware',
    kind: 'hardware',
    street: "Shepherd's Bush Road",
    walkMinutes: 8,
    openUntil: '5:30pm',
    opensAt: '8am',
    image: 'brook-hardware-front',
    delivers: { fee: 5, by: 'tomorrow' },
    source: 'asked',
    collectWindow: '30 days',
    items: [
      { name: 'Picture hooks, pack of 10', price: 2.49 },
      { name: 'Desk fan', price: 29.99 },
      { name: 'Key cut', price: 5 },
    ],
  },
  brookToys: {
    id: 'brookToys',
    name: 'Brook Green Toys',
    kind: 'toys',
    street: "Shepherd's Bush Road",
    walkMinutes: 9,
    openUntil: '6pm',
    opensAt: '10am',
    image: 'brook-green-toys-front',
    source: 'asked',
    collectWindow: '30 days',
    items: [
      { name: 'Wooden train set', price: 24 },
      { name: 'Party bag fillers', price: 8 },
      { name: 'Solar system science kit', price: 15 },
    ],
  },
  goldhawkButchers: {
    id: 'goldhawkButchers',
    name: 'Goldhawk Butchers',
    kind: 'butcher',
    street: 'Goldhawk Road',
    walkMinutes: 11,
    openUntil: '5:30pm',
    opensAt: '8am',
    image: 'goldhawk-butchers-front',
    notice: 'Cuts to order',
    source: 'asked',
    collectWindow: 'next day',
    items: [
      { name: 'Rib of beef for two, cut to order', price: 38 },
      { name: 'Pork sausages, 6', price: 6.5 },
      { name: 'Free-range chicken', price: 14 },
    ],
  },
  broadway: {
    id: 'broadway',
    name: 'Broadway Chemist',
    kind: 'chemist',
    street: 'Hammersmith Broadway',
    walkMinutes: 12,
    openUntil: '8pm',
    opensAt: '8am',
    image: 'broadway-chemist-front',
    source: 'till',
    collectWindow: '7 days',
    items: [
      { name: 'Eclipse glasses', price: 9.5 },
      { name: 'Sun cream SPF 50', price: 8.99 },
      { name: 'Hay fever tablets', price: 4.49 },
    ],
  },
  olympia: {
    id: 'olympia',
    name: 'Olympia Cameras',
    kind: 'cameras',
    street: 'Kensington High Street',
    walkMinutes: 12,
    openUntil: '6pm',
    opensAt: '10am',
    image: 'olympia-cameras-front',
    isNew: true,
    source: 'asked',
    collectWindow: '14 days',
    items: [
      { name: 'Solar viewer cards', price: 6 },
      { name: 'Solar filter sheet', price: 18 },
      { name: '35 mm film roll', price: 12.5 },
    ],
  },
  paperCo: {
    id: 'paperCo',
    name: 'Paper & Co',
    kind: 'stationery',
    street: 'King Street',
    walkMinutes: 13,
    openUntil: '7pm',
    opensAt: '9am',
    image: 'paper-co-front',
    promoted: true,
    isNew: true,
    delivers: { fee: 3.5, by: 'today' },
    source: 'asked',
    collectWindow: '7 days',
    items: [
      { name: 'Eclipse glasses, ISO certified', price: 14.99 },
      { name: 'A4 photo frame', price: 12 },
      { name: 'Birthday card', price: 3.5 },
    ],
  },
  halo: {
    id: 'halo',
    name: 'Halo Florist',
    kind: 'florist',
    street: 'Goldhawk Road',
    walkMinutes: 13,
    openUntil: '5pm',
    opensAt: '8am',
    image: 'halo-florist-front',
    isNew: true,
    delivers: { fee: 6, by: 'today' },
    source: 'asked',
    collectWindow: 'same day',
    items: [
      { name: 'Seasonal bouquet', price: 35 },
      { name: 'Single stems', price: 4 },
      { name: 'Potted orchid', price: 22 },
    ],
  },
  bushOpticians: {
    id: 'bushOpticians',
    name: 'Bush Opticians',
    kind: 'opticians',
    street: "Shepherd's Bush Green",
    walkMinutes: 14,
    openUntil: '6pm',
    opensAt: '9am',
    image: 'bush-opticians-front',
    source: 'asked',
    collectWindow: '14 days',
    items: [
      { name: 'Clip-on sun lenses', price: 25 },
      { name: 'Glasses repair kit', price: 6 },
      { name: 'Lens cloths, 3', price: 3 },
    ],
  },
  abingdonDeli: {
    id: 'abingdonDeli',
    name: 'Abingdon Deli',
    kind: 'cafe',
    street: 'Abingdon Road',
    walkMinutes: 18,
    openUntil: '8pm',
    opensAt: '8am',
    image: 'abingdon-deli-front',
    promoted: true,
    delivers: { fee: 4, by: 'today' },
    source: 'asked',
    collectWindow: 'same day',
    items: [
      { name: 'Olive oil, 500 ml', price: 9.5 },
      { name: 'Coffee beans, 250 g', price: 8 },
      { name: 'Seasonal veg box', price: 15 },
    ],
  },
  churchBooks: {
    id: 'churchBooks',
    name: 'Church Street Books',
    kind: 'books',
    street: 'Kensington Church Street',
    walkMinutes: 20,
    openUntil: '7pm',
    opensAt: '9am',
    image: 'church-street-books-front',
    isNew: true,
    source: 'till',
    collectWindow: '30 days',
    items: [
      { name: 'London street atlas', price: 9.99 },
      { name: "Children's book of the night sky", price: 7.99 },
      { name: 'Book token', price: 10 },
    ],
    history: [{ item: 'A street atlas of London', had: true, when: 'yesterday' }],
  },
};

/** All 12 shops, nearest first. The 15-minute radius shows the first ten; 20 minutes adds the deli and the bookshop. */
const allTwelve = Object.values(shops);

const sam: PersonaContent = {
  id: 'sam',
  name: 'Sam',
  area: 'Blythe Road, W14',
  streets: '6 shopping streets within 15 min',
  greeting: 'Good afternoon, Sam',
  suggestions: ['Birthday candles', 'Flowers for tonight', 'Picture hooks'],
  card: 'Debit card •••• 4021',
  shops: allTwelve,
  active: {
    id: 'eclipse',
    title: 'Eclipse glasses',
    asked: 'Eclipse glasses, 2 pairs, before 4pm',
    quantity: 2,
    plural: true,
    deadline: '4pm',
    area: 'Within 15 min',
    image: 'eclipse-glasses',
    offers: [
      { shopId: 'broadway', price: 9.5, available: 1, collectBy: 'Mon 9 Nov' },
      { shopId: 'bushOpticians', price: 0, collectBy: '' },
      { shopId: 'paperCo', price: 14.99, collectBy: 'Mon 9 Nov', repliedAgo: '2 min ago' },
      { shopId: 'olympia', item: 'Solar viewer cards', price: 6, collectBy: 'Mon 16 Nov', repliedAgo: '1 min ago' },
      { shopId: 'brookHardware', price: 0, collectBy: '' },
      { shopId: 'brookToys', price: 0, collectBy: '' },
    ],
  },
  others: [
    {
      id: 'cake',
      title: 'Birthday cake',
      when: '11:02',
      preview: "Snuffle: Rossi's can do it with 2 days' notice.",
      state: 'needsYou',
      label: 'Needs you · buy by Thu 5 Nov',
      action: "Buy at Rossi's",
      image: 'birthday-cake',
    },
    {
      id: 'sourdough',
      title: 'Sourdough',
      when: 'Fri',
      preview: 'You: Collect after work as usual',
      state: 'repeat',
      label: 'Every Friday',
      image: 'sourdough-loaf',
    },
    {
      id: 'hooks',
      title: 'Picture hooks',
      when: '12 Oct',
      preview: 'Snuffle: How was Brook Hardware?',
      state: 'collected',
      label: 'Collected',
      image: 'picture-hooks',
    },
    {
      id: 'fan',
      title: 'Desk fan',
      when: 'Aug 2025',
      preview: 'Snuffle: No shop nearby had one in time.',
      state: 'notFound',
      label: 'Not found',
      image: 'desk-fan',
    },
  ],
  order: {
    shopId: 'paperCo',
    total: 29.98,
    deliveryTotal: 33.48,
    collectBy: 'Mon 9 Nov',
    extendedTo: 'Mon 16 Nov',
    code: 'K7Q2',
  },
};

const jess: PersonaContent = {
  id: 'jess',
  name: 'Jess',
  area: 'Blythe Road, W14',
  streets: '6 shopping streets within 15 min',
  greeting: 'Good afternoon, Jess',
  suggestions: ["Sourdough from Rossi's every Friday", 'Flowers for tonight', 'A desk fan for work'],
  card: 'Debit card •••• 7730',
  shops: allTwelve,
  active: {
    id: 'sourdough',
    title: 'Sourdough',
    asked: "Sourdough from Rossi's, but I finish work at 6",
    quantity: 1,
    plural: false,
    area: 'Within 15 min',
    image: 'sourdough-loaf',
    offers: [{ shopId: 'rossis', price: 4.2, collectBy: 'Fri 6 Nov', repliedAgo: '3 min ago' }],
  },
  others: [
    {
      id: 'fan',
      title: 'Desk fan',
      when: '13:21',
      preview: 'You: A fan I can collect after work',
      state: 'looking',
      label: 'Looking · until Fri 6 Nov',
      image: 'desk-fan-alt',
    },
    {
      id: 'flowers',
      title: 'Flowers for tonight',
      when: 'Tue',
      preview: 'Snuffle: How was Halo Florist?',
      state: 'collected',
      label: 'Collected',
      image: 'flowers-bouquet',
    },
  ],
  order: {
    shopId: 'rossis',
    total: 4.2,
    collectBy: 'Fri 6 Nov',
    extendedTo: 'Sat 7 Nov',
    code: 'R3M8',
    collectAt: 'corner',
  },
};

export const personas: Record<Persona, PersonaContent> = { sam, jess };

const longNames: Record<string, string> = {
  rossis: "Rossi & Daughters Family Bakery and Patisserie",
  paperCo: 'Paper & Co Stationers, Art Supplies and Gifts',
  broadway: 'Broadway Chemist and Late-Night Dispensary',
  olympia: 'Olympia Cameras, Film Processing and Repairs',
};

// manyAnswers asks the other six of the 12 shops too, so all 12 answer.
const extraAsked: Shop[] = [shops.halo, shops.corner, shops.goldhawkButchers, shops.rossis, shops.abingdonDeli, shops.churchBooks];

function withSet(base: PersonaContent, set: ContentSet): PersonaContent {
  switch (set) {
    case 'default':
      return base;
    case 'empty':
      return { ...base, shops: base.shops.slice(0, 2), others: [] };
    case 'longNames': {
      const rename = (shop: Shop): Shop => ({ ...shop, name: longNames[shop.id] ?? shop.name });
      return {
        ...base,
        shops: base.shops.map(rename),
        active: {
          ...base.active,
          title: `${base.active.title} for watching the partial solar eclipse from the park`,
        },
        others: base.others.map((r) => ({ ...r, title: `${r.title} for the weekend, if anyone has one in stock` })),
      };
    }
    case 'manyAnswers': {
      const known = new Set(base.shops.map((s) => s.id));
      const added = extraAsked.filter((s) => !known.has(s.id));
      return {
        ...base,
        shops: [...base.shops, ...added],
        active: {
          ...base.active,
          offers: [
            ...base.active.offers,
            ...added.map((s, i) => ({ shopId: s.id, price: 8 + i, collectBy: 'Fri 6 Nov', repliedAgo: `${i + 3} min ago` })),
          ],
        },
      };
    }
  }
}

const cache = new Map<string, PersonaContent>();

/** The persona's content in the given content set. Cached so selectors return stable objects. */
export function contentFor(persona: Persona, set: ContentSet): PersonaContent {
  const key = `${persona}:${set}`;
  let content = cache.get(key);
  if (!content) {
    content = withSet(personas[persona], set);
    cache.set(key, content);
  }
  return content;
}

// The second seed area, around Kensington High Street (Work): three of the 12 shops, walk times from there.
const workShops: Shop[] = [
  { ...shops.olympia, walkMinutes: 3, promoted: true, isNew: false },
  { ...shops.abingdonDeli, walkMinutes: 4 },
  { ...shops.churchBooks, walkMinutes: 9 },
];

export const areas: Record<AreaId, Area> = {
  blythe: { id: 'blythe', name: 'Blythe Road, W14', shops: [], streets: { 10: 3, 15: 6, 20: 9 } },
  kensington: { id: 'kensington', name: 'Kensington High St, W8', shops: workShops, streets: { 10: 4, 15: 5, 20: 7 } },
};

/** Current location: in the prototype, the seed area around Blythe Road. */
export const currentPlace: Place = { id: 'current', label: 'Current location', address: 'Blythe Road, W14', area: 'blythe' };

/** Saved places the prototype starts with. */
export const seedPlaces: Place[] = [
  { id: 'home', label: 'Home', address: 'Blythe Road, W14', area: 'blythe' },
  { id: 'work', label: 'Work', address: 'Kensington High St, W8', area: 'kensington' },
];

/** What the address search finds (mock results): each points at a seed area. */
export const addressBook: { address: string; area: AreaId }[] = [
  { address: 'Blythe Road, W14', area: 'blythe' },
  { address: 'Brook Green, W6', area: 'blythe' },
  { address: 'King Street, W6', area: 'blythe' },
  { address: "Shepherd's Bush Road, W6", area: 'blythe' },
  { address: 'Kensington High St, W8', area: 'kensington' },
  { address: 'Earls Court Road, W8', area: 'kensington' },
  { address: 'Abingdon Road, W8', area: 'kensington' },
];

const allShops = new Map<string, Shop>(allTwelve.map((s) => [s.id, s]));

export function shopById(content: PersonaContent, id: string): Shop | undefined {
  return content.shops.find((s) => s.id === id) ?? allShops.get(id);
}
