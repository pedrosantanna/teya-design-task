# AreaRow

The area at the top of Nearby: "Blythe Road, W14 ›" over "6 shopping streets within 15 min". It opens the location sheet. Spec: `openspec/specs/nearby` (Area header) and the `location` capability in change `ios26-patterns-and-location`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `place` | string | required | Headline, one line |
| `detail` | string | required | Footnote, two lines at most |
| `onPress` | function | none | Opens "Where are you shopping?" |

Press scale with `spring.press`. Wrap it in `ZoomOrigin` so the sheet grows from it.

## Accessibility

One button: "Shopping near Blythe Road, W14. 6 shopping streets within 15 min", hint "Changes where you're shopping".
