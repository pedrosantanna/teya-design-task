// Mock content from app flow v7 (docs/develop/ideation/app-flow-v7.html): Sam's eclipse glasses and
// Jess's collect-after-work sourdough, around Blythe Road, W14. No real shop is represented.
import type { ContentSet, Persona, PersonaContent, Shop } from './types';

const shops: Record<string, Shop> = {
  rossis: {
    id: 'rossis',
    name: "Rossi's Bakery",
    street: 'Blythe Road',
    walkMinutes: 2,
    openUntil: '6pm',
    opensAt: '7am',
    image: 'rossis-bakery-front',
    promoted: true,
    notice: "2 days' notice",
    source: 'asked',
    history: [
      { item: 'Sourdough', had: true, when: '2 hours ago' },
      { item: 'Rye loaf', had: false, when: 'this morning' },
    ],
  },
  paperCo: {
    id: 'paperCo',
    name: 'Paper & Co',
    street: 'King Street',
    walkMinutes: 13,
    openUntil: '7pm',
    opensAt: '9am',
    image: 'paper-co-front',
    promoted: true,
    isNew: true,
    delivers: { fee: 3.5, by: 'today' },
    source: 'asked',
  },
  halo: {
    id: 'halo',
    name: 'Halo Florist',
    street: 'Goldhawk Road',
    walkMinutes: 13,
    openUntil: '5pm',
    opensAt: '8am',
    image: 'halo-florist-front',
    isNew: true,
    source: 'asked',
  },
  olympia: {
    id: 'olympia',
    name: 'Olympia Cameras',
    street: 'Kensington High Street',
    walkMinutes: 12,
    openUntil: '6pm',
    opensAt: '10am',
    image: 'olympia-cameras-front',
    isNew: true,
    source: 'asked',
  },
  broadway: {
    id: 'broadway',
    name: 'Broadway Chemist',
    street: 'Hammersmith Broadway',
    walkMinutes: 12,
    openUntil: '8pm',
    opensAt: '8am',
    image: 'broadway-chemist-front',
    source: 'till',
  },
  // No photo of an optician or a second chemist in images.ts yet: these two borrow interiors.
  bushOpticians: {
    id: 'bushOpticians',
    name: 'Bush Opticians',
    street: "Shepherd's Bush Green",
    walkMinutes: 14,
    openUntil: '6pm',
    opensAt: '9am',
    image: 'olympia-cameras-interior',
    source: 'asked',
  },
  goldhawk: {
    id: 'goldhawk',
    name: 'Goldhawk Pharmacy',
    street: 'Goldhawk Road',
    walkMinutes: 11,
    openUntil: '7pm',
    opensAt: '9am',
    image: 'broadway-chemist-counter',
    source: 'asked',
  },
  brookToys: {
    id: 'brookToys',
    name: 'Brook Green Toys',
    street: "Shepherd's Bush Road",
    walkMinutes: 9,
    openUntil: '6pm',
    opensAt: '10am',
    image: 'brook-green-toys-front',
    source: 'asked',
  },
  brookHardware: {
    id: 'brookHardware',
    name: 'Brook Hardware',
    street: "Shepherd's Bush Road",
    walkMinutes: 8,
    openUntil: '5:30pm',
    opensAt: '8am',
    image: 'brook-hardware-front',
    source: 'asked',
  },
  corner: {
    id: 'corner',
    name: 'Blythe Road corner shop',
    street: 'Blythe Road',
    walkMinutes: 1,
    openUntil: '11pm',
    opensAt: '7am',
    image: 'corner-shop-front',
    isNew: true,
    source: 'asked',
  },
};

const nearbyShops = [
  shops.rossis,
  shops.paperCo,
  shops.halo,
  shops.olympia,
  shops.broadway,
  shops.brookToys,
  shops.brookHardware,
  shops.corner,
];

const sam: PersonaContent = {
  id: 'sam',
  name: 'Sam',
  area: 'Blythe Road, W14',
  streets: '6 shopping streets within 15 min',
  greeting: 'Good afternoon, Sam',
  suggestions: ['Birthday candles', 'Flowers for tonight', 'Picture hooks'],
  card: 'Debit card •••• 4021',
  shops: [...nearbyShops, shops.bushOpticians, shops.goldhawk],
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
      { shopId: 'broadway', price: 9.5, available: 1, collectBy: 'Wed 4 Nov' },
      { shopId: 'bushOpticians', price: 0, collectBy: '' },
      { shopId: 'paperCo', price: 14.99, collectBy: 'Mon 9 Nov', repliedAgo: '2 min ago' },
      { shopId: 'olympia', item: 'Solar viewer cards', price: 6, collectBy: 'Wed 4 Nov', repliedAgo: '1 min ago' },
      { shopId: 'goldhawk', price: 0, collectBy: '' },
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
  shops: nearbyShops,
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

const extraAsked: Shop[] = [
  shops.halo,
  shops.brookHardware,
  shops.corner,
  { ...shops.goldhawk, id: 'goldhawk2', name: 'Goldhawk Road Pharmacy (No. 2)' },
  { ...shops.brookToys, id: 'kingToys', name: 'King Street Toys', street: 'King Street' },
  { ...shops.olympia, id: 'westCameras', name: 'West London Camera Exchange', street: 'Hammersmith Road' },
];

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

export function shopById(content: PersonaContent, id: string): Shop | undefined {
  return content.shops.find((s) => s.id === id);
}
