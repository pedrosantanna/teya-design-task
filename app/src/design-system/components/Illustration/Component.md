# Illustration

A 3D illustration from `docs/develop/design-system/illustrations.md`, shipped as pre-rendered media: a still PNG of the rest pose and clips (entry, and an idle loop for the scooter and the shop). Clips on a flat ground (background, card) are MP4 H.264 played by `expo-video` (muted, no controls, no fullscreen or picture-in-picture, paused when the screen loses focus, the still behind until the first frame); Getting started's clips stay animated WebP with alpha, because its ground crossfades and video has no alpha. Each file is shaded for the ground it sits on, so the shade tones and the translucent shadow match that surface.

## Where it is used

| Screen | Illustration | Ground |
| --- | --- | --- |
| Receipt | `basket` (collection), `box` (delivery) | card |
| Asking the shops | `scooter` (entry, then idle) | background |
| Empty states (Nearby, Requests) | `crossroads` | background |
| Not found | `quietstreet` | background |
| Shop page | `shop` (entry, then idle) | background |
| Getting started | `crossroads`, `shop` (entry, then idle), `box` at `size="welcome"` | welcome: each page's own Indigo step |
| Nearby, Shops by kind | category art through `CategoryCard` | the card's tile colour |

The images come from `app/scripts/illustrations` (see its `manifest.json`): `render.mjs` renders frames from the docs viewer's export mode, `encode.mjs` writes `app/assets/illustrations/` and `manifest.generated.ts`. Never edit the generated file.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `name` | `IllustrationName` | required | `basket`, `box`, `scooter`, `crossroads`, `quietstreet`, `shop` |
| `size` | `'small'`, `'medium'`, `'large'`, `'hero'`, `'welcome'`, `'bleed'` | `'large'` | 64, 88, 120, 352, 312 pt, and 460 × 420 pt for bleed (a window onto the Getting started crossroads, wider than the screen). 120 pt is rendered for every illustration and smaller sizes draw it scaled down; 352 pt (hero) only for quietstreet on the location ask (ground `location`, which draws a soft radial lift behind the art in dark mode); 312 pt (welcome) only for Getting started |
| `ground` | `'background'`, `'card'`, `'welcome'` | `'background'` | The surface behind it; light or dark follows the theme. Each illustration is rendered for the one ground its screen uses (table above); asking for the other falls back to it |
| `play` | `'entry-then-idle'`, `'idle'`, `'still'` | `'entry-then-idle'` | Entry plays once (its length is in the manifest), then the idle loop, or the still when there is none |
| `accessibilityLabel` | string | none | Only when the picture carries meaning. Without it the illustration is decorative and hidden from VoiceOver and TalkBack |

## Behaviour

- With Reduce Motion (Reanimated `useReducedMotion`) it shows the still and never animates.
- The still sits behind the video and is the placeholder of a WebP, so nothing blinks while a clip decodes; it is also the entry's last frame and the idle's first.
- Files are required by base name (`basket.card-light.120.png`). Videos are composited on the ground colour (BT.709 tags, limited range) and decode within 1 of the token on iOS and the web. A single player plays the entry, then loads the idle. Stills ship at @2x and @3x; clips only at @3x, which Metro also serves to @2x screens, and hero clips only at @2x, to keep the set under 5 MB (3.6 MB with video). Shade and cast shadow mix toward a warm dark tone from the Biscuit ramp per ground (`groundTones` in the pipeline manifest). In dark mode the quietstreet iron is recoloured lighter (#8C847B) so the lamp and bench read on #0E0B09.
- Getting started's art (`ground="welcome"`) comes from the pipeline's `welcome` set: each object on its own page's Indigo step, transparent so the blending page ground shows no edge, shade and shadow toward Indigo 900. Stills at @2x and @3x, clips at @2x, each under 300 KB (the crossroads entry 490 KB).
- On dark grounds the basket is rendered with lighter shade tones (`darkTones` in the manifest) so it stays legible.

## Category cards

`CATEGORY_ILLUSTRATIONS[id][scheme].still` is each Nearby category's art: a transparent 120 × 164 pt still shaded for the card's tile colour (light: the ramp's tile step, dark: its dark tile step) and drawn over it, the object centred in the top 120 × 120 (its longer side is 80% of that square) and the tile below for the label. No animation, so the list scrolls smoothly. `CategoryCard` picks it with `categoryIllustration(id, scheme)` and `useIllustrationScheme()`.

## iOS and Android

Same on both. Android may loop an entry clip if it ignores the WebP loop count; the component swaps to the next phase after the entry's length either way.
