# SnuffleSniff

Snuffle's glyph sniffing, shown while Snuffle asks the shops and no one has answered yet. It takes the place of the delivery scooter, which read as delivery. Spec: Mark on `docs/develop/design-system/mark.md` (the splash is the reference for the character) and the asking state on `components.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `width` | `number` | 88 | The glyph's width, the width of a medium illustration. Height is 84/114 of it |
| `paused` | `boolean` | `false` | Stops the loop and leaves the glyph still |

## Behaviour

One looping clock of 2.6 s drives two layers over the still face (ears and eyes). The nose lifts 2.5 units and grows 10% in three short sniffs of 300 ms, then rests for the rest of the loop. The five awning stripes sway about their top edge, up to 3.5 degrees, each 45 ms after the one before, so they ripple like whiskers; their sway follows the sniffs and dies out about 450 ms after the last one. The screen removes the component when the first answer arrives.

Colours are those of `SnuffleMark`: Foreground, with the two soft stripes in Muted foreground. No tile, no shadow.

## Accessibility

Decorative and hidden from screen readers. With Reduce Motion the glyph stays still.

## iOS and Android

Same on both.
