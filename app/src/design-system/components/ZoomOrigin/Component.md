# ZoomOrigin

A wrapper that marks where an overlay grows from: the Nearby area row (location sheet), an answer card (details sheet). Change `ios26-patterns-and-location`, Motion on `docs/develop/design-system/motion.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `id` | string | required | Unique on screen. `Sheet`'s `origin` names it |
| `children` | node | required | |
| `style` | style | none | Layout only |

The overlay measures the wrapper in window coordinates when it opens and zooms from that rectangle with `spring.smooth`; under Reduce Motion it fades.

## Accessibility

None of its own; the child keeps its role and label.
