# Map

A real map of the prototype's high street (Blythe Road / Brook Green, London W14), drawn by MapLibre from OpenStreetMap data bundled with the app. Spec: Map on `docs/develop/design-system/components.md`; style from `imagery.md` (Map style).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `loading` | boolean | `false` | Map ground alone |
| `pin` | boolean | `true` | The shop's pin in Primary at the centre |
| `accent` | ShopAccentName | none | The pin takes the shop's `detail` fill with an `onDetail` edge and dot instead of Primary |
| `extent` | `{ width, height, pinY }` | none | For a tall view such as the shop page's full-screen background: the camera keeps the shop under a pin `pinY` points from the top |
| `interactive` | boolean | `false` | Pan and zoom. Off on the shop page, where the map is a backdrop |
| `shopId` | string | none | A shop placed by `npm run map:places`: the map stands on its street and draws the walk from 163 Blythe Road in the shop's accent (cased in On detail, the door a white dot), turned so the door is to the left, zoomed out (to 12.5 at most) until the walk fits, and centred across; the pin follows the shop sideways. Without `extent` the map uses its own size |
| `route` | boolean | `true` | Draw the walk. Off away from home (the Work place): the map stands on the shop at the area's zoom |
| `attribution` | boolean | `true` | "© OpenStreetMap contributors" on the map. Off where the screen credits the map at its foot (the shop page) |

Map roles from the palette (`mapGround`, `mapRoad`, `mapRoadMain`, `mapPark`, `mapWater`, `mapBuilding`; Biscuit neutrals with soft Pistachio parks and pale cool water in light, the cool neutral with low-chroma parks and water in dark), buildings extruded in 3D (8 m where the data has no height), seen at a pitch of 50°. No labels, no points of interest. The pin is HugeIcons' location glyph filled in Primary (Indigo 800 / Indigo 300).

## Platforms

- iOS and Android: `@maplibre/maplibre-react-native` (MapLibre Native, config plugin in `app.json`), `Map.tsx`.
- Web: `maplibre-gl`'s CSP build, loaded from `map/` beside the page (`Map.web.tsx`). It needs no `blob:` worker, so it runs inside the docs artifact's iframe.
- Both show a static image of the area (`assets/map/fallback-*.jpg`) until the first full render, and keep it if the map can't draw (no WebGL, script blocked). With a shop's route they show the Map ground instead, since the image is of other streets.

## Data and attribution

- Data © OpenStreetMap contributors, under the ODbL. The credit is on the map, or at the foot of a screen whose map sits behind content (`attribution={false}`).
- The data is fetched once from the Overpass API for a box about 4 km east to west and 2.5 km north to south and kept in `assets/map/*.json` in a compact encoding (`mapData.ts` decodes it). The app makes no map requests at runtime.
- The shops are made up, but each stands at a real point on its real street: `assets/map/places.json` (`mapRoute.ts` reads it) holds each shop's point and the walk to it from 163 Blythe Road, and the seed's walk times are those routes at 80 m a minute (decision 063).

## Regenerating

| Command | When |
| --- | --- |
| `npm run map:fetch` | Change the area (`scripts/map-area.mjs`) or the layers |
| `npm run map:places` | A shop's street or walk time changes; then set the seed's walk times from the report it prints |
| `npm run map` | After a colour change (also run by `npm run tokens`); `npm run check` fails on drift |
| `npm run map:fallback` | After changing the data, the style or the camera; needs Google Chrome |

The style is built by `scripts/map-style.mjs` into `style.generated.ts`. Never edit the generated file.

## Do and don't

- Do put it in a container with a height; corners come from the container (`radius.none` at the screen edges).
- Don't use it for navigation: Directions opens the system maps app.

## Accessibility

Hidden from screen readers; the street and walk time in the card carry the same information.
