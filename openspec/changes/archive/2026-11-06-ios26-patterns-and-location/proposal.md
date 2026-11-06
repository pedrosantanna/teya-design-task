# Proposal

## Why

The prototype is recorded on an iPhone running iOS 26, and its chrome still reads as iOS 17: bars with solid fills, a text Back label, a 30 pt close circle, sheets that always sit on the edge, and screens that swap without a transition from where the shopper tapped. The area at the top of Nearby is also fixed, so the "where" of a request can't be changed, and Nearby's Change area button leads nowhere.

## What Changes

- Navigation chrome follows iOS 26 (Liquid Glass): Back is a chevron in a glass circle with the previous title only in its accessibility label; Close is a 44 pt glass × circle; a new Confirm is a tinted checkmark circle where a sheet commits ("Done" tonal button on Android). Bar actions are icon-only in one glass capsule. Bars have no fill: a scroll-edge fade sits under the floating controls, and large titles collapse to an inline leading title.
- Glass is one material everywhere: Liquid Glass on iOS 26, a blur on earlier iOS, a CSS backdrop blur with a translucent fill, an inner highlight and a soft shadow on the web, and a solid surface under Reduce Transparency and on Android.
- The ask bar and the Requests button become a floating glass bottom accessory that shrinks on scroll down and expands on scroll up, animated on the UI thread.
- Sheets float inset with all corners rounded at the medium detent and anchor to the edges, opaque, at the large detent. Android keeps the Material bottom sheet with a drag handle and scrim.
- Every screen change is animated, with Apple Music as the reference: zooms from the tapped element (Nearby tile → shop page, Requests button → Requests, collection code, address row → location sheet), a push for Requests → chat, sheets that grow from the answer card or the button, a crossfade for payment → receipt. Reduce Motion turns all of them into crossfades.
- The Display title (Gambetta) grows to 40/44.
- A spacing pass on every screen: sections 32 apart, 8 from a heading to its content, card insides 12/16, and the last item clears the bottom accessory by 48.
- A location flow: the area row on Nearby opens "Where are you shopping?" (current location, saved places, address search, walking radius, Confirm); Nearby reloads with that area's streets and shops. The Account sheet's Places row opens a Places screen to add, rename and delete places.

## Capabilities

### New Capabilities
- `location`: choosing where the shopper is shopping (current location, saved places, an address) and how far they will walk, and managing saved places.

### Modified Capabilities
- `nearby`: the area row opens the location sheet; the area and radius drive the shops and street count; the bottom accessory; the zoom into a shop page.
- `shop-page`: opens with a zoom from the tile and can be dismissed by dragging; Back is the glass chevron.
- `request`: Requests opens with a zoom from the Requests button; chat push; Keep looking opens as a sheet; Close and Confirm on sheets.

## Impact

- Design system: `NavBar`, `Sheet`, `CloseButton`, `Dock`, `Composer`, `FloatingSurface`, `CollectionCode`; new `GlassButton`, `ConfirmButton`, `BottomAccessory`, `TextField`, `ZoomSource` and an internal scroll-edge fade and zoom helpers. Token `type.displayTitle` changes to 40/44.
- Store: `place`, `radius` and `places`, a second seed area (Kensington High St, W8), and the debugger's Content section.
- Routes: new `/places`; stack options per route for the transitions.
- No new dependencies. The Map component is being replaced in a parallel change and is not touched here; the design-system docs are updated in a parallel change.
