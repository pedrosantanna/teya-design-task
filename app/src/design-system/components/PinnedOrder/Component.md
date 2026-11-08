# PinnedOrder

The order pinned under a request chat's nav bar: status, shop and items, the collection code while the order can be collected, one tap to the receipt. Spec: Pinned order on `docs/develop/design-system/components.md`; labels from the state table in `conceptual-model.md`; decision 068.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `status` | string | required | The order's label: "Ready · collect by Mon 9 Nov" |
| `tone` | `StatusTone` | `'default'` | As on the order card |
| `shop`, `items` | string | required | Line 2: "Paper & Co, 2 × eclipse glasses"; the items alone when the label already names the shop |
| `accent` | `ShopAccentName` | required | The leading square's fill (the shop's tile colour) |
| `fulfilment` | `'collect' \| 'delivery'` | `'collect'` | Store or Truck symbol |
| `code` | string | none | Only while Ready or Extended: "Code" over the code at the trailing end |
| `onPress` | function | required | Opens the receipt |
| `margin` | number | required | Screen margin |
| `scroll`, `backgroundAt` | `NavBarScroll`, number | none, 0 | The same values as the screen's `NavBar`, so the strip's fill and edge follow the bar's |

## Behaviour

- Full width, absolutely placed by the screen at the nav bar's height; the screen adds its measured height to the list's clearance.
- Its fill reaches over the bar's hairline and draws one hairline in `chat.groundEdge` at its own bottom: the bar and the strip read as one bar.
- Pressed: a state layer, no scale (it is a bar, not a card). A status change cross-fades the label.

## Accessibility

One button: "Order, Ready, collect by Mon 9 Nov, Paper & Co, 2 eclipse glasses, collection code K, 7, Q, 2", hint "Opens the receipt". The status is a polite live region. The press area starts 4 pt under the bar, 8 pt or more from Back.

## iOS and Android

Same strip; the chevron is iOS only.
