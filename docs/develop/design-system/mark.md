# Mark

The app's icon for now: a retriever whose mouth is a shop's awning. A retriever's job is to go out and bring something back, which is Snuffle's job too, and the breed is British: the Golden Retriever was bred at Guisachan in the Scottish Highlands from 1868, and the Labrador was developed on British estates from Newfoundland dogs. I drew it by hand in Figma from the agent's icon tests and chose it as the first identity decision. It is provisional: the line is settled, the drawing and the colours are not, so it is shown here in black and white.

```summary
Takeaways:
- A retriever's face with low, folded ears and two dot eyes. Its mouth is a striped awning, the kind over a shopfront, with the nose resting on it.
- Two tones: a high-contrast one for the face and three of the stripes, a low-contrast one for the other two. In black and white that is black and a mid grey.
- The agent rebuilt my drawing on one symmetry axis and centred it optically, then applied it to the iOS and Android icon formats: light, dark and tinted on iOS, adaptive and themed on Android.
Call:
- I took the agent's first two icon tests into Figma, adjusted the vectors by hand and chose the fourth version as the provisional mark (decision 033).
- I asked for it to be refined on an icon grid in black and white until the palette was chosen, and pointed out when it sat too high.
- I stopped here on purpose. With more time I would develop the mark further, perhaps in another direction, but the brand is not the focus of this exercise; I enjoyed it and the result is good enough to give the app a face.
- I asked for the splash to be a short vector animation on Indigo: the awning first, unrolling stripe by stripe, then the face and two blinks.
- Inside the app the mark is a bare glyph in one colour that follows the theme, never on a tile or in an avatar. This reverses the "mark on a Lavender tile" of decision 045.
AI:
- An agent built the splash intro in code from the glyph's own paths. An agent drew the icon tests in SVG from my seeds (a sniffer dog, British shopping, the parade's awnings). I took the first two into Figma and changed the vectors by hand. The agent exported my version, rebuilt it on one axis and drew the platform applications. Its first optical centre put the glyph too high; I pointed it out and it chose a new one by comparing offsets by eye.
Trade-offs:
- The native splash shows the finished glyph, and the in-app intro starts from the rolled awning, so the face disappears for a moment when the intro begins; the intro's last frame is the native image again. A native splash with the glyph already drawn avoids a flash of the wrong colour, and I accepted the jump.
- On Android the glyph has to fit a 66 dp safe zone, so it is about half the icon's width and the stripes get thin at small sizes. A simpler version for small sizes is still open.
```

<div class="marks">
<figure><img src="img/mark-glyph.svg" alt="The mark in black and grey, without a tile" width="256" height="192"><figcaption>On white</figcaption></figure>
<figure><img src="img/mark-glyph-white.svg" alt="The mark in white and grey on black" width="256" height="192"><figcaption>On black</figcaption></figure>
</div>

## From the tests to the mark

<div class="marks wide">
<figure><img src="img/mark-figma-board.png" alt="Four icons on a Figma board: two agent tests, an arrow, and two hand-drawn versions" width="1000" height="260"><figcaption>My Figma board. Left of the arrow: the agent's icon tests 1 and 2. Right: my two versions; I chose the last one.</figcaption></figure>
</div>

The agent's tests had the parade's awning as a bar across the face, with stripes hanging from it and two dashes for brows. In Figma I changed the vectors myself:

| Change | Starting point |
| --- | --- |
| Removed the awning's top bar, so the stripes start right under the nose | Tests 1 and 2; with the bar, the stripes read as teeth |
| Replaced the brows with two dot eyes | The dashes in tests 1 and 2 |
| Kept the ears low and folded | Test 2; my first version had upright ears, like test 1 |
| Rested the nose on the awning | The nose sat on the bar in the tests |
| Kept two tones in the stripes | The tests' alternating stripes |

## Refinement

The agent rebuilt the drawing from the Figma vectors without changing its shapes:

| Change | Figma drawing | Rebuilt |
| --- | --- | --- |
| Symmetry axis | Three centres: eyes and nose at 85.0, ears at 85.3, awning at 85.65 (of 168) | One axis for all parts; the right ear is a mirror of the left |
| Stripes | Five stripes of 17 units, with a 0.3 unit step between the second and third | Five stripes of exactly 17 units |
| Position | Glyph centred 2.5 units below the tile's centre and 1.3 to the right | Centred horizontally; vertically 4 units below the tile's centre, chosen by eye from offsets of 0 to 9 in the circle mask, where the wide ears meet the curve and make a centred glyph look high |

<div class="marks">
<figure><img src="img/mark-grid.svg" alt="The mark on a construction grid with axis, optical centre and content circle" width="336" height="336"><figcaption>8-unit grid on a 168 tile. Red: the tile's centre lines. Blue dashed: the glyph's centre, 4 units below. Grey circle: 80% of the tile.</figcaption></figure>
</div>

## iOS

Apple asks for one square 1024 px image; the system applies the rounded mask, so the artwork has no corners or shadow of its own. Since iOS 18 an icon can also have a dark and a tinted version: the dark one keeps the glyph light on a dark background, and the tinted one is greyscale, which the system colours with the shopper's tint.

<div class="marks">
<figure><img src="img/mark-ios-light.svg" alt="iOS icon, light" width="168" height="168"><figcaption>Light</figcaption></figure>
<figure><img src="img/mark-ios-dark.svg" alt="iOS icon, dark" width="168" height="168"><figcaption>Dark</figcaption></figure>
<figure><img src="img/mark-ios-tinted.svg" alt="iOS icon, tinted" width="168" height="168"><figcaption>Tinted, in greyscale</figcaption></figure>
</div>

## Android

An adaptive icon is two 108 dp layers. Launchers show the middle 72 dp through their own mask (circle, squircle, rounded square) and may move the layers, so the glyph stays inside a 66 dp safe zone. Since Android 13, a monochrome layer lets the launcher theme the icon with the wallpaper's colours; the second tone becomes a lighter alpha of the same colour.

<div class="marks">
<figure><img src="img/mark-android-layers.svg" alt="Android adaptive icon at 108 dp with the visible area and the safe zone" width="216" height="216"><figcaption>108 dp canvas. Blue: 72 dp visible area. Red dashed: 66 dp safe zone.</figcaption></figure>
<figure><img src="img/mark-android-circle.svg" alt="Android icon in a circle mask" width="144" height="144"><figcaption>Circle mask</figcaption></figure>
<figure><img src="img/mark-android-themed.svg" alt="Android themed icon" width="144" height="144"><figcaption>Themed, monochrome layer</figcaption></figure>
</div>

## In the app

The square exists only as the app icon, which the system draws. Everywhere inside the app the mark is the glyph alone: no tile, no circle, no avatar, and nothing behind it. It takes one colour from the theme, Foreground, so it is dark on light backgrounds and light on dark ones; the two low-contrast stripes are Muted foreground, the lighter tone of the same ink, as on Android's themed icon.

| Where | Size |
| --- | --- |
| The chat's sender line, beside "Snuffle", with no avatar column | 22 wide |
| Notification and Live Activity | 40 wide |
| Sign in | 56 wide |
| The splash, native and in the app, centred on Indigo 800 (white glyph, see below) | 120 wide |

On the splash the glyph takes two fixed colours on Indigo 800, the brand colour: white (8.75:1 on the ground) for the face and stripes 1, 3 and 5, and Indigo 300 (4.94:1 on the ground, 1.8:1 beside the white) for stripes 2 and 4. The grey of the white variant above is too dark on Indigo, so the low tone moves up the same ramp. The tokens are `color.splash.ground`, `ink` and `soft`.

This reverses the part of decision 045 that put the mark on a Lavender tile with a warm face behind the glyph. Lavender stays Snuffle's colour through its bubbles and typing dots.

## Splash intro

The splash plays the mark building itself, in about 1.6 s; the timing is on the [motion page](motion.md#splash). Only the awning shows at first, rolled up at the top like the blind of a shop. It comes down, and the five stripes unroll one after the other, each with a short sway and a small overshoot. Then the ears, eyes and nose appear and the dog blinks twice. The final frame is the glyph above, the same as the native splash image. The intro starts from the rolled awning, so the face drops out for a moment when the system hands over, then builds back. The stripes are the same five paths as the glyph, drawn one by one, so the last frame matches it exactly.

## Anatomy

| Part | Shape | Tone |
| --- | --- | --- |
| Ears | Two folded ears, low on the head, mirrored | High contrast |
| Eyes | Two dots, 15 units either side of the axis | High contrast |
| Nose | An oval resting on the awning | High contrast |
| Awning | Five stripes of 17 units with rounded ends, the outer two with a rounded top corner | Stripes 1, 3 and 5 high contrast; 2 and 4 low contrast |

In the Figma version the tones were Brew #5A3E2B and #AFA085 on Oat #E9DCC3. They come back when the palette is chosen.

## Open


- A simpler version for sizes below about 29 pt.
- The colours, which follow the palette once I choose one.
- The name. Retriever names are on the [identity page](../ideation/identity.md).

## Sources

- Golden Retriever Club of America, history of the breed: https://grca.org/?p=1831
- Labrador Retriever (Wikipedia): https://en.wikipedia.org/wiki/Labrador_Retriever
