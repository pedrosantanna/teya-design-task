# Map

A static, stylised map standing in for Apple Maps and Google Maps until a map SDK is added. Spec: Map on `docs/develop/design-system/components.md`; style from `imagery.md` (Map style).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `loading` | boolean | `false` | Map ground alone |
| `pin` | boolean | `true` | One pin in Primary at the centre |

Fills its container: Map ground (Butter 50 / Butter 900), a made-up street grid and blocks in Muted, the pin in Primary (Indigo 800 / Indigo 300). No gestures, no labels.

## Do and don't

- Do put it in a container with a height; corners come from the container (`radius.none` at the screen edges).
- Don't present it as a real map: Directions opens the system maps app.

## Accessibility

Hidden from screen readers; the street and walk time in the card carry the same information.
