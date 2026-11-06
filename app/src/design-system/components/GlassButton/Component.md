# GlassButton

An icon in a 44 pt glass circle, floating over content: Back, the bar's single actions. Spec: Nav bar and Close button on `docs/develop/design-system/components.md` (iOS 26 patterns, change `ios26-patterns-and-location`).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `icon` | HugeIcons icon or platform icon name | required | `back` is the chevron on iOS and the arrow on Android |
| `accessibilityLabel` | string | required | Back names the previous screen: "Back to Requests" |
| `onPress` | function | none | Without it the button is disabled |
| `overMedia` | boolean | `false` | Android only: a tonal circle behind the icon over the map or a photo |
| `disabled` | boolean | `false` | |

Glass follows `FloatingSurface`: Liquid Glass on iOS 26, a blur on earlier iOS, CSS glass on the web, a solid surface under Reduce Transparency. The ground changes the fill: inside `<Ground value="tile">` (the Category screen) the glass takes the accent's `tonal` at `state.tonalOnTile` instead of Card (white at 55% in light), so it lifts off the tile; on the web it also takes the on-tile glass values (`state.glassSaturateOnTile`, `state.glassShadowOnTile`). In dark the tonal colour is opaque, so Back is a solid circle in the accent's dark card with a light glyph, like the street chips beside it (5.88 to 5.99:1 on the tile, round 18); the shop page's nav bar puts its Back on that ground in dark too, over the map; inside `<Ground value="sheet">` in dark (a sheet's header) it is a solid Muted circle.

## iOS and Android

iOS and the web: the glyph alone in a glass circle, no text label. Android: a Material standard icon button (48 dp hit area, no container) with the arrow for Back.

## Accessibility

Role button; the label carries what the glyph can't, such as the previous screen's title.
