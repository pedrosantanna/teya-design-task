# Map

A real map of the prototype's high street (Blythe Road / Brook Green, London W14), drawn by MapLibre from OpenStreetMap data bundled with the app. Spec: Map on `docs/develop/design-system/components.md`; style from `imagery.md` (Map style).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `loading` | boolean | `false` | Map ground alone |
| `pin` | boolean | `true` | The shop's pin in Primary at the centre |
| `extent` | `{ width, height, pinY }` | none | For a tall view such as the shop page's full-screen background: the camera keeps the shop under a pin `pinY` points from the top |
| `interactive` | boolean | `false` | Pan and zoom. Off on the shop page, where the map is a backdrop |

Map ground (Butter 50 / Card #282523), roads in Muted, parks and water in muted tints, buildings extruded in 3D (8 m where the data has no height), seen at a pitch of 50°. No labels, no points of interest. The pin is HugeIcons' location glyph filled in Primary (Indigo 800 / Indigo 300).

## Platforms

- iOS and Android: `@maplibre/maplibre-react-native` (MapLibre Native, config plugin in `app.json`), `Map.tsx`.
- Web: `maplibre-gl`'s CSP build, loaded from `map/` beside the page (`Map.web.tsx`). It needs no `blob:` worker, so it runs inside the docs artifact's iframe.
- Both show a static image of the same view (`assets/map/fallback-*.jpg`) until the first full render, and keep it if the map can't draw (no WebGL, script blocked).

## Data and attribution

- Data © OpenStreetMap contributors, under the ODbL. "© OpenStreetMap contributors" is always shown on the map.
- The data is fetched once from the Overpass API for a box about 2.5 km across and kept in `assets/map/*.json` in a compact encoding (`mapData.ts` decodes it). The app makes no map requests at runtime.
- One area for every shop: the shops are made up and have no coordinates.

## Regenerating

| Command | When |
| --- | --- |
| `npm run map:fetch` | Change the area (`scripts/map-area.mjs`) or the layers |
| `npm run map` | After a colour change (also run by `npm run tokens`); `npm run check` fails on drift |
| `npm run map:fallback` | After changing the data, the style or the camera; needs Google Chrome |

The style is built by `scripts/map-style.mjs` into `style.generated.ts`. Never edit the generated file.

## Do and don't

- Do put it in a container with a height; corners come from the container (`radius.none` at the screen edges).
- Don't use it for navigation: Directions opens the system maps app.

## Accessibility

Hidden from screen readers; the street and walk time in the card carry the same information.
