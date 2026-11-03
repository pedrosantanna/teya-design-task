# Imagery and icons

Where images and icons come from, the sizes and ratios they take on each surface, and the rules for photos, icons, the map and the tile shown when a shop has no photo.

```summary
Takeaways:
- Icons are HugeIcons, the free Stroke Rounded set, through `@hugeicons/react-native` with `@hugeicons/core-free-icons`. One set on both platforms; share, back and more change form on Android.
- Stroke width follows the text beside the icon: 1.5 next to regular text, 2 next to semibold.
- Photos are the shop's own, in daylight, of the shopfront or counter. No stock photos, no filters, no identifiable people. An item never has a photo: thumbnails show the shop or a request placeholder.
- Ratios are few: 4:3 for tiles, 1:1 for thumbnails and categories, 3:2 for the shop page header. Corners follow the shape tokens.
- A shop with no photo gets a tonal tile with its initials and the mark's awning. This is a proposal and hasn't been tested.
Call:
- I asked for imagery to be covered the same way as shape and motion, starting from iOS and widening to Material (decision 041).
- I chose HugeIcons over SF Symbols and Material Symbols, so the app has one icon style on both platforms (decision 042).
- I kept the values provisional, to be tuned at real size in the prototype.
AI:
- An agent researched Apple's Human Interface Guidelines on images (read from the HIG JSON, since the pages render by script) and proposed the sizes and rules. I asked for a modern design system grounded in iOS first, then Material.
- An agent mapped every icon in app flow v7 to a HugeIcons name, checked each name against the icon list in `@hugeicons/core-free-icons` 4.4.0 and drew the candidates on a contact sheet to pick the forms. I chose the set.
Trade-offs:
- Real shop photos vary in quality; stock photos would look tidier and tell the shopper nothing about the shop.
- One icon set looks the same on iOS and Android and gives up what the system symbols do for free: weight that follows Dynamic Type, symbol animations and filled variants. The free set is stroke only, so a selected state can't switch to a filled icon.
```

## Sources of images and icons

| Kind | iOS | Android and web |
| --- | --- | --- |
| Icons | HugeIcons Stroke Rounded, free set (MIT licence), 24 × 24 grid | Same |
| Access | `HugeiconsIcon` from `@hugeicons/react-native`, which draws with `react-native-svg`; icons imported one by one from `@hugeicons/core-free-icons` | Same |
| Photos | JPEG or HEIC at @2x and @3x | Same files |
| Flat graphics | SVG or PDF | SVG |
| 3D illustrations | PNG at @2x and @3x | Same files |

## Sizes and ratios

| Image | Ratio | Size | Corner |
| --- | --- | --- | --- |
| Large tile (Open near you) | 4:3 | `tile.large` | `radius.bubble` |
| Medium tile (New near you) | 4:3 | `tile.medium` | `radius.bubble` |
| Category cell | 1:1 | Category cell | `radius.bubble` |
| Shop or request thumbnail | 1:1 | 56 in rows, 40 in answer rows | `radius.inner` |
| Shop page header | 3:2 | Full bleed | `radius.none` |
| Snuffle mark in the chat | 1:1 | 28 | Circle |
| Shop logo or monogram | 1:1 | 24 on a thumbnail, 40 on a shop row | Circle |
| Inline icon | n/a | The text's line height minus 4 (16 next to Body) | n/a |
| Nav and toolbar icon | n/a | 22 | n/a |
| Icon on the Requests button and in the ask bar | n/a | 24 | n/a |

Sizes are in pt on iOS and dp on Android. Tile widths are on [Spacing and layout](spacing.md). A thumbnail is the answering shop's photo, or the request placeholder in a request row; it is never an item photo from a catalogue, because in the [conceptual model](conceptual-model.md) an item is text.

## Rules

| Rule | In practice |
| --- | --- |
| Stroke follows the text | `strokeWidth` 1.5 next to Switzer 400 and 500, 2 next to Switzer 600; icons scale with the text they sit beside |
| Monochrome by default | An icon takes the colour of its text; status icons take the warning or success role from [Colour](colour.md) |
| No fill for selection | The free set has no filled forms, so selection shows in colour and in the label |
| Platform forms | Share, back and more follow the platform, as in the map below; every other icon is the same on both |
| Shop photos | The shop's own, in daylight, shopfront or counter, no filters, no stock photos, no identifiable people |
| No item photos | Items have no photos; a row shows the shop's photo or the request placeholder |
| Scrim only when needed | A 0 → 40% black gradient only under badges or glass buttons on a photo |
| No-photo placeholder (proposal, untested) | A tonal tile in the accent 100 fill chosen by the shop's kind, initials in Switzer 600 in the 800 tone, and the mark's five-stripe awning as a band across the top |
| Map style | Light: Butter 50 ground (#F9F7F0), Biscuit grey roads (muted, #E5E2DE), Indigo 800 pins. Dark: Butter 900 ground (#382C04), muted roads (#332C27), Indigo 300 pins. Labels in Switzer, no points of interest other than the shops |
| Alt text | "[Shop] shopfront, [street]"; placeholders and decorative images are hidden from VoiceOver and TalkBack; an icon that acts carries the action's name |
| Badges in the label | Badges are read as part of the tile's label: "Rossi's Bakery, promoted, open till 6pm" |

## Icon map

Every icon in [app flow v7](../ideation/app-flow.md) and the ones the next screens need. Names are the exports of `@hugeicons/core-free-icons`; all were checked against version 4.4.0. The status bar's signal, Wi-Fi and battery are drawn by the system.

| Role | Where | HugeIcons | Android, if different |
| --- | --- | --- | --- |
| Send | The composer's send, in an Indigo circle | `ArrowUp02Icon` | `SentIcon` |
| Microphone | Dictation in the ask bar and composer | `Mic01Icon` | |
| Requests | The round Requests button; message the shop from an order | `BubbleChatIcon` | |
| Location | The shopper's area on Nearby | `Location05Icon` | |
| Current location | Centre the map on the shopper | `Gps01Icon` | |
| Map pin | A shop on the map, an address row | `Location01Icon` | |
| Directions | Directions on an order and a shop page | `Navigation03Icon` | |
| Call | Call the shop | `Call02Icon` | |
| Close | Sheets, the full-screen code | `Cancel01Icon` | |
| Back | Navigation bar | `ArrowLeft01Icon` (chevron) | `ArrowLeft02Icon` (arrow) |
| Chevron | Rows that open something | `ArrowRight01Icon` | None; Material rows don't show one |
| More | Navigation bar menu | `MoreHorizontalIcon` | `MoreVerticalIcon` |
| Share | Order and shop page | `Share03Icon` (box with an arrow) | `Share08Icon` (three nodes) |
| Warning | "Not confirmed · not charged", "Sold · not charged" | `Alert02Icon` | |
| Check | Ready, Paid, Collected; a chosen option | `Tick02Icon` | |
| Clock | Collect-by dates, opening hours | `Clock01Icon` | |
| Calendar | "Until Fri 6 Nov" on a request kept looking | `Calendar03Icon` | |
| QR code | The collection code on the receipt | `QrCodeIcon` | |
| Expand | Open the code full screen | `ArrowExpand01Icon` | |
| Person | Avatar fallback, the account menu | `UserIcon` | |
| Plus | Quantity up | `PlusSignIcon` | |
| Minus | Quantity down | `MinusSignIcon` | |
| Notifications | Notification settings | `Notification01Icon` | |
| Search | Search in Requests | `Search01Icon` | |
| Camera | Ask with a photo | `Camera01Icon` | |
| Repeat | "Every Friday" | `RepeatIcon` | |
| From the till | "In stock now · till" | `FlashIcon` | |
| Seen | An asked shop has seen the request | `ViewIcon` | |
| Doesn't have it | An answer with nothing to buy | `CancelCircleIcon` | |
| Collect | Collect at the shop | `Store02Icon` | |
| Delivery | The shop delivers | `DeliveryTruck01Icon` | |
| Payment | The card in the Buy sheet | `CreditCardIcon` | |
| Rate | Rate an order | `StarIcon` | |
| Settings | Settings in the account menu | `Settings01Icon` | |

## 3D illustrations

Empty states, first run and the splash use 3D illustrations: simple shapes, the palette's colours, thin outlines and solid flat shadows, with no gradients or photo textures. How they are made and where each one goes is on [Illustrations](illustrations.md).

## Sources

- HugeIcons: https://hugeicons.com
- `@hugeicons/react-native` (props `icon`, `size`, `color`, `strokeWidth`): https://www.npmjs.com/package/@hugeicons/react-native
- `@hugeicons/core-free-icons` (icon list, MIT licence): https://www.npmjs.com/package/@hugeicons/core-free-icons
- Apple, Human Interface Guidelines, Images: https://developer.apple.com/design/human-interface-guidelines/images
- Apple, Human Interface Guidelines, Icons (interface icons): https://developer.apple.com/design/human-interface-guidelines/icons
- [Shape and materials](shape.md) (corner tokens), [Colour](colour.md) (accent fills, map colours), [Mark](mark.md) (the awning)
