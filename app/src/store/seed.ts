// Mock content from app flow v8 (docs/develop/ideation/app-flow-v8.html): Sam's eclipse glasses and
// Jess's collect-after-work sourdough, around Blythe Road, W14. No real shop is represented.
import { moreShops, widerShops } from './seed-more';
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
    walkMinutes: 11,
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
    walkMinutes: 14,
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
    walkMinutes: 10,
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
    kind: 'deli',
    street: 'Abingdon Road',
    walkMinutes: 25,
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
    walkMinutes: 28,
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

// What each shop sells, how it has done on Snuffle and what buyers say (change shop-ratings-and-range). Mock numbers,
// plausible for each kind of shop: a busy bakery answers fast and often, an optician slowly. Blythe Road News has no
// ratings yet and Halo Florist has three, so the page shows both of its early states.
type Profile = Pick<Shop, 'categories' | 'priceRange' | 'ratings' | 'reliability'>;

const profiles: Record<string, Profile> = {
  corner: {
    categories: ['Birthday cards', 'Batteries', 'Candles', 'Milk and bread', 'Stamps'],
    priceRange: { from: 1, to: 12 },
    reliability: { answered: 6, asked: 8, hadItRight: 4, hadItTotal: 4, replyMinutes: 9, connected: false },
    ratings: { up: 0, down: 0, tags: {}, notes: [] },
  },
  rossis: {
    categories: ['Sourdough', 'Rye', 'Pastries', 'Focaccia', 'Celebration cakes'],
    priceRange: { from: 2, to: 35 },
    reliability: { answered: 46, asked: 51, hadItRight: 24, hadItTotal: 25, replyMinutes: 6, connected: false },
    ratings: {
      up: 35,
      down: 3,
      tags: { Friendly: 21, 'Had it as promised': 18, 'Set aside on time': 12, 'Not ready when I came': 3 },
      notes: [
        { name: 'Amelia', text: 'Collected a seeded loaf and two buns after work. My name was on the bag, the loaf still warm, and they asked after my mum.', up: true, month: 'Oct 2026', how: 'Collected' },
        { name: 'Oliver', text: "Ordered a lemon cake for my sister's birthday. Ready on the day they said, boxed with a ribbon, and as good as it looked.", up: true, month: 'Oct 2026', how: 'Collected' },
        { name: 'Priya', text: 'Told it would be ready at five, but they were still boxing it. Ten minutes at the counter. Lovely focaccia once it came.', up: false, month: 'Sep 2026', how: 'Collected' },
        { name: 'Tom', text: 'Messaged at lunch to ask about rye. They put the last loaf aside and I collected it on the way home. Proper crust.', up: true, month: 'Aug 2026', how: 'Collected' },
        { name: 'Grace', text: 'Birthday focaccia for twelve, warm from the oven and cut into squares. They even found candles in a drawer for us.', up: true, month: 'Jul 2026', how: 'Collected' },
      ],
    },
  },
  brookHardware: {
    categories: ['Screws and fixings', 'Picture hooks', 'Keys cut', 'Paint', 'Fans and heaters'],
    priceRange: { from: 1, to: 60 },
    reliability: { answered: 30, asked: 38, hadItRight: 17, hadItTotal: 19, replyMinutes: 14, connected: false },
    ratings: {
      up: 19,
      down: 4,
      tags: { 'Had it as promised': 11, 'Good value': 9, Friendly: 6, 'Not ready when I came': 3, 'Hard to find': 1 },
      notes: [
        { name: 'Hannah', text: 'Needed picture hooks for a heavy mirror. They found the right ones, showed me how to fix them and charged me for two.', up: true, month: 'Oct 2026', how: 'Collected' },
        { name: 'Callum', text: "The fan came a day later than they said, with no message. It works well, but I'd planned my Saturday around it.", up: false, month: 'Aug 2026', how: 'Delivered' },
        { name: 'Sophie', text: 'Bought a spirit level and some screws. Cheaper than the big shop, two minutes from my door, and he knew his stuff.', up: true, month: 'Jul 2026', how: 'Collected' },
      ],
    },
  },
  brookToys: {
    categories: ['Wooden toys', 'Party bags', 'Science kits', 'Puzzles', 'Craft sets'],
    priceRange: { from: 3, to: 40 },
    reliability: { answered: 21, asked: 26, hadItRight: 12, hadItTotal: 13, replyMinutes: 11, connected: false },
    ratings: {
      up: 11,
      down: 1,
      tags: { Friendly: 7, 'Had it as promised': 5, 'Good value': 3 },
      notes: [
        { name: 'Ravi', text: 'Picked up balloons and a banner for a party. They wrapped it all without me asking and laughed at my colour choice.', up: true, month: 'Oct 2026', how: 'Collected' },
        { name: 'Megan', text: 'Asked for twelve party bags with sweets and a small toy each. Sorted by the afternoon, and every bag was different.', up: true, month: 'Sep 2026', how: 'Collected' },
      ],
    },
  },
  goldhawkButchers: {
    categories: ['Beef', 'Sausages', 'Free-range chicken', 'Cuts to order', 'Barbecue packs'],
    priceRange: { from: 5, to: 45 },
    reliability: { answered: 33, asked: 36, hadItRight: 20, hadItTotal: 21, replyMinutes: 8, connected: false },
    ratings: {
      up: 27,
      down: 2,
      tags: { 'Had it as promised': 16, Friendly: 12, 'Good value': 8, 'Not ready when I came': 2 },
      notes: [
        { name: 'Jack', text: 'Asked for a rib of beef cut for four. Ready at nine as promised, tied neatly, with a tip on how long to rest it.', up: true, month: 'Oct 2026', how: 'Collected' },
        { name: 'Chloe', text: 'Six pork and leek sausages for Sunday breakfast. The best this side of Hammersmith, and an extra one for the dog.', up: true, month: 'Sep 2026', how: 'Collected' },
      ],
    },
  },
  broadway: {
    categories: ['Sun care', 'Hay fever', 'First aid', 'Eclipse glasses', 'Baby care'],
    priceRange: { from: 2, to: 25 },
    reliability: { answered: 120, asked: 120, hadItRight: 58, hadItTotal: 61, connected: true },
    ratings: {
      up: 41,
      down: 5,
      tags: { 'Had it as promised': 24, 'Set aside on time': 19, Friendly: 9, 'Hard to find': 3, "Wasn't as described": 2 },
      notes: [
        { name: 'Imran', text: 'The app said one left and it really was, at the front of the shelf. Collected within the hour and the code scanned first time.', up: true, month: 'Oct 2026', how: 'Collected' },
        { name: 'Beth', text: 'Showed my code and they had my bag ready. In and out in two minutes, which suited a lunch break, with a smile too.', up: true, month: 'Oct 2026', how: 'Collected' },
        { name: 'Dan', text: 'They said in stock, but the pack was the wrong strength. Swapped without fuss, though I had walked there for nothing.', up: false, month: 'Sep 2026', how: 'Collected' },
      ],
    },
  },
  olympia: {
    categories: ['Film', 'Solar filters', 'Camera repairs', 'Film processing', 'Lenses'],
    priceRange: { from: 6, to: 120 },
    reliability: { answered: 9, asked: 11, hadItRight: 5, hadItTotal: 5, replyMinutes: 12, connected: false },
    ratings: {
      up: 4,
      down: 0,
      tags: { 'Had it as promised': 3, Friendly: 2 },
      notes: [{ name: 'Ayesha', text: 'Went in for viewing glasses and left knowing far more about the eclipse than I did. Patient with my daft questions, too.', up: true, month: 'Oct 2026', how: 'Collected' }],
    },
  },
  paperCo: {
    categories: ['Cards', 'Frames', 'Notebooks', 'Art supplies', 'Eclipse glasses'],
    priceRange: { from: 2, to: 35 },
    reliability: { answered: 14, asked: 16, hadItRight: 8, hadItTotal: 8, replyMinutes: 6, connected: false },
    ratings: {
      up: 6,
      down: 1,
      tags: { 'Had it as promised': 4, 'Knew their stuff': 3, Friendly: 2 },
      notes: [
        { name: 'Rosie', text: 'They set a frame aside and gift-wrapped it in brown paper and string. Collected on my way to the party. Looked lovely.', up: true, month: 'Oct 2026', how: 'Collected' },
        { name: 'Liam', text: 'Needed a card and a small gift in a hurry. Both delivered the same afternoon, and the card was signed and stamped for me.', up: true, month: 'Oct 2026', how: 'Delivered' },
        { name: 'Fatima', text: 'Good quality and nicely presented, but the notebook cost more than I expected. Fine as a gift, not for every day.', up: false, month: 'Sep 2026', how: 'Collected' },
      ],
    },
  },
  halo: {
    categories: ['Bouquets', 'Single stems', 'Plants', 'Wedding flowers', 'Wreaths'],
    priceRange: { from: 4, to: 60 },
    reliability: { answered: 10, asked: 12, hadItRight: 6, hadItTotal: 7, replyMinutes: 9, connected: false },
    ratings: {
      up: 2,
      down: 1,
      tags: { Friendly: 2, 'Had it as promised': 1, 'Not ready when I came': 1 },
      notes: [
        { name: 'Ed', text: 'Ordered a small bouquet for my gran. Ready when they said, tied with raffia and in her favourite colours. It lasted a fortnight.', up: true, month: 'Oct 2026', how: 'Collected' },
        { name: 'Nadia', text: "Delivery came an hour after the slot they gave and I'd stayed in. The tulips were beautiful and the driver apologised.", up: false, month: 'Oct 2026', how: 'Delivered' },
        { name: 'Harry', text: 'Wedding table flowers for forty, wired and ready at seven. She talked me through keeping them fresh overnight.', up: true, month: 'Sep 2026', how: 'Collected' },
        { name: 'Maya', text: 'Picked up a single stem and a pot of ranunculus. Wrapped in brown paper with a little care card, and they asked if I wanted a vase.', up: true, month: 'Aug 2026', how: 'Collected' },
      ],
    },
  },
  bushOpticians: {
    categories: ['Sunglasses', 'Repairs', 'Lens care', 'Clip-ons', 'Cases'],
    priceRange: { from: 3, to: 90 },
    reliability: { answered: 18, asked: 22, hadItRight: 10, hadItTotal: 11, replyMinutes: 20, connected: false },
    ratings: {
      up: 9,
      down: 2,
      tags: { Friendly: 6, 'Had it as promised': 5, 'Not ready when I came': 2 },
      notes: [
        { name: 'Joe', text: "My glasses came apart on the bus. They fixed the arm while I waited with a cup of tea and wouldn't take a penny.", up: true, month: 'Sep 2026', how: 'Collected' },
        { name: 'Maya', text: 'Took most of the day to answer about my prescription lenses. The reply was clear and helpful, but I had to chase twice.', up: false, month: 'Aug 2026', how: 'Collected' },
      ],
    },
  },
  abingdonDeli: {
    categories: ['Olive oil', 'Coffee', 'Cheese', 'Veg boxes', 'Fresh pasta'],
    priceRange: { from: 3, to: 30 },
    reliability: { answered: 40, asked: 44, hadItRight: 31, hadItTotal: 33, replyMinutes: 7, connected: false },
    ratings: {
      up: 52,
      down: 6,
      tags: { 'Good value': 22, Friendly: 30, 'Had it as promised': 26, 'Not ready when I came': 2 },
      notes: [
        { name: 'Harry', text: 'Veg box on the doorstep before six, as they said, carrots still dirty. A bunch of mint tucked in as a small bonus.', up: true, month: 'Oct 2026', how: 'Delivered' },
        { name: 'Grace', text: 'Asked for beans ground for my old moka pot. They checked how fine it needed to be and let me taste two roasts.', up: true, month: 'Oct 2026', how: 'Collected' },
        { name: 'Ben', text: 'The oil is lovely, peppery and fresh, and I could taste it first. But it was twice the supermarket price, so a treat.', up: false, month: 'Sep 2026', how: 'Collected' },
      ],
    },
  },
  churchBooks: {
    categories: ['Maps and atlases', "Children's books", 'Fiction', 'Local history', 'Book tokens'],
    priceRange: { from: 5, to: 30 },
    reliability: { answered: 34, asked: 34, hadItRight: 15, hadItTotal: 15, connected: true },
    ratings: {
      up: 5,
      down: 0,
      tags: { 'Had it as promised': 4, 'Set aside on time': 3, Friendly: 2 },
      notes: [{ name: 'Zara', text: "They had found the atlas I'd asked about. It was behind the counter with my name on a slip, wrapped against the rain.", up: true, month: 'Oct 2026', how: 'Collected' }],
    },
  },
};

for (const [id, profile] of Object.entries(profiles)) Object.assign(shops[id], profile);

/** All 12 shops, nearest first. The 15-minute radius shows the first ten; 20 minutes adds the deli and the bookshop. */
const allTwelve = Object.values(shops);

/** What Nearby and the Category screens list around Blythe Road: the 12 demo shops and the others (seed-more.ts). */
const homeNearby = [...allTwelve, ...moreShops];

const sam: PersonaContent = {
  id: 'sam',
  name: 'Sam',
  area: 'Blythe Road, W14',
  streets: '6 shopping streets within 15 min',
  greeting: 'Good afternoon, Sam',
  suggestions: ['Birthday candles', 'Flowers for tonight', 'Picture hooks'],
  card: 'Debit card •••• 4021',
  shops: allTwelve,
  nearby: homeNearby,
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
    wider: [
      { shopId: 'hollandCameras', price: 6.5, collectBy: 'Mon 9 Nov', repliedAgo: '1 min ago' },
      { shopId: 'uxbridgeOpticians', price: 0, collectBy: '' },
      { shopId: 'hollandStationers', item: 'Solar viewer sheets', price: 4.5, collectBy: 'Mon 16 Nov', repliedAgo: '1 min ago' },
    ],
  },
  others: [
    {
      id: 'cake',
      title: 'Birthday cake',
      when: '11:02',
      preview: "Snuffle: Rossi's needs your answer",
      state: 'needsYou',
      label: 'Needs you · buy by Thu 5 Nov',
      image: 'birthday-cake',
    },
    {
      id: 'sourdough',
      title: 'Sourdough',
      when: 'Fri',
      preview: "Snuffle: Next Friday's loaf is set aside",
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
      preview: 'Snuffle: No one had it. Want me to keep looking?',
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
  nearby: homeNearby,
  active: {
    id: 'sourdough',
    title: 'Sourdough',
    asked: "Sourdough from Rossi's, but I finish work at 6",
    quantity: 1,
    plural: false,
    area: 'Within 15 min',
    image: 'sourdough-loaf',
    offers: [{ shopId: 'rossis', price: 4.2, collectBy: 'Fri 6 Nov', repliedAgo: '3 min ago' }],
    wider: [
      { shopId: 'kensingtonBake', price: 4.8, collectBy: 'Fri 6 Nov', repliedAgo: '2 min ago' },
      { shopId: 'wellsBakery', price: 0, collectBy: '' },
    ],
  },
  others: [
    {
      id: 'fan',
      title: 'Desk fan',
      when: '13:21',
      preview: 'Snuffle: Still looking until Fri 6 Nov',
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
      return { ...base, shops: base.shops.slice(0, 2), nearby: base.shops.slice(0, 2), others: [] };
    case 'longNames': {
      const rename = (shop: Shop): Shop => ({ ...shop, name: longNames[shop.id] ?? shop.name });
      return {
        ...base,
        shops: base.shops.map(rename),
        nearby: base.nearby.map(rename),
        active: {
          ...base.active,
          title: `${base.active.title} for watching the partial solar eclipse from the park`,
        },
        others: base.others.map((r) => ({ ...r, title: `${r.title} for the weekend, if anyone has one in stock` })),
      };
    }
    case 'manyAnswers': {
      // Asked shops are the request's offers; the shops list may already hold these shops (as nearby ones).
      const asked = new Set(base.active.offers.map((o) => o.shopId));
      const added = extraAsked.filter((s) => !asked.has(s.id));
      const known = new Set(base.shops.map((s) => s.id));
      return {
        ...base,
        shops: [...base.shops, ...added.filter((s) => !known.has(s.id))],
        nearby: [...base.nearby, ...added.filter((s) => !base.nearby.some((n) => n.id === s.id))],
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

const widerById = new Map(widerShops.map((s) => [s.id, s]));
const cache = new Map<string, PersonaContent>();

/** The shops asked after "Ask further away" join the request's offers and its shops. */
function withWider(base: PersonaContent): PersonaContent {
  const wider = base.active.wider ?? [];
  if (wider.length === 0) return base;
  const added = wider.map((o) => widerById.get(o.shopId)).filter((s): s is Shop => !!s);
  return {
    ...base,
    shops: [...base.shops, ...added],
    active: { ...base.active, nearCount: base.active.offers.length, offers: [...base.active.offers, ...wider] },
  };
}

/** The persona's content in the given content set, with the wider shops once they have been asked. Cached so selectors return stable objects. */
export function contentFor(persona: Persona, set: ContentSet, widened = false): PersonaContent {
  const key = `${persona}:${set}:${widened ? 'wide' : 'near'}`;
  let content = cache.get(key);
  if (!content) {
    const base = withSet(personas[persona], set);
    content = widened ? withWider(base) : base;
    cache.set(key, content);
  }
  return content;
}

// The second seed area, around Kensington High Street (Work): three of the 12 shops and some of the others, walk
// times from there.
const more = new Map(moreShops.map((s) => [s.id, s]));
const workShops: Shop[] = [
  { ...shops.olympia, walkMinutes: 3, promoted: true, isNew: false },
  { ...shops.abingdonDeli, walkMinutes: 4 },
  { ...more.get('addisonCameras')!, walkMinutes: 6 },
  { ...more.get('clearView')!, walkMinutes: 7 },
  { ...shops.churchBooks, walkMinutes: 9 },
  { ...more.get('alimentari')!, walkMinutes: 9 },
  { ...more.get('littleBear')!, walkMinutes: 10 },
  { ...more.get('wildStem')!, walkMinutes: 11 },
  { ...more.get('pastelaria')!, walkMinutes: 12 },
  { ...more.get('quillLedger')!, walkMinutes: 14 },
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

const everyShop = [...allTwelve, ...moreShops, ...widerShops];
const allShops = new Map<string, Shop>(everyShop.map((s) => [s.id, s]));

/** A shop's place in the full list, stable across content sets (the shop page's made-up phone number uses it). */
export function shopNumber(id: string): number {
  return Math.max(0, everyShop.findIndex((s) => s.id === id));
}

export function shopById(content: PersonaContent, id: string): Shop | undefined {
  return content.shops.find((s) => s.id === id) ?? allShops.get(id);
}
