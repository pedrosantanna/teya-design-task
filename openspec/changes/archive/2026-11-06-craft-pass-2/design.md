# Design

## Tile step

The 100 steps sat at L 0.95 to 0.97 on a background at L 0.935, so they read as the background. The tile step is set by lightness, not by ramp position: OKLCH L 0.87 and C 0.07 at each hue's angle (light), L 0.36 and C 0.06 (dark). It gives 1.20 to 1.26:1 against the light background and 1.76 to 1.84:1 against the dark one, while Foreground stays at 12.9:1 or more and muted text at 5.0:1 or more in light (4.6:1 or more in dark). The 100 and 900 steps stay as `wash`, now only the light stripes of the awning band.

## Chat ground

Chats sit on white in light mode and on Background in dark. On white, Card surfaces need an edge: cards and grouped rows in a chat take a hairline in the separator colour and the delicate shadow, and chips take the Background fill. A `Ground` context set by the chat screens tells those components where they are, so screens don't pass a prop to every card.

## Ask bar morph

The web runs every route change as a view transition. A new `morph` kind names the bar's glass `snuffle-ask` in the old snapshot and the composer's glass in the new one, so the browser morphs one into the other while the screen crossfades. On iOS and Android the route fades and the composer grows from the bar's measured rectangle with `spring.smooth`. Under Reduce Motion both are a crossfade.

## Category screen

`categories/[kind]` lists the area's shops of one kind as shop rows, with a header in the kind's tile colour and its still, and the street filter chips. It opens with the zoom from the card on every platform (`ZoomSource`).
