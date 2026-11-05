# MarkIntro

The splash: the mark builds itself on the brand ground, then hands over to the first screen. Spec: Splash in `motion.md`; the glyph is `mark.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `onReveal` | `() => void` | none | Called when the mark has faded and the ground starts to fade; mount the screen under it |
| `onDone` | `() => void` | none | Called when the ground has gone |
| `frozenAt` | number (ms) | none | Holds the build at this time and skips the hand-off. 1600 or more is the final frame |

## Timeline

About 1.6 s, one clock on the UI thread. The awning starts rolled at the top; the five stripes unroll 70 ms apart, each with a spring that overshoots a little and a short sway about its top edge; the ears slide in, the eyes and nose pop, and the eyes blink twice. The finished mark holds for 250 ms, fades in 150 ms, and the ground fades in 200 ms.

## Rules

- It fills its parent and sits on `color.splash.ground` (Indigo 800 in every theme); the glyph is `splash.ink` with `splash.soft` on the two lighter stripes. Never on a tile.
- With Reduce Motion the final frame shows at once and only the fades remain.
- Decorative, hidden from screen readers.
