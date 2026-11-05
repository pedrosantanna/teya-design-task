# TextField

A text field: the address search in the location sheet, a place's name on Places, and (multi-line) the note in the rating sheet. Changes `ios26-patterns-and-location` and `shop-ratings-and-range`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `value` | string | required | |
| `onChangeText` | function | required | |
| `label` | string | required | Accessibility label |
| `placeholder` | string | none | |
| `icon` | HugeIcons icon | none | Leading, e.g. Search |
| `autoFocus` | boolean | `false` | |
| `onSubmit` | function | none | Return key |
| `multiline` | boolean | `false` | Grows with the text, starts two `hit.min` tall, `radius.inner` corners on both platforms, no clear button |
| `maxLength` | number | none | The note takes 140 |

`hit.min` tall, Card fill with a hairline Border (Muted in a dark sheet, where the rows are Muted), Body text; a clear button shows while there is text. Focus ring in Tint on the web.

## iOS and Android

iOS: a full-radius capsule (the search field). Android: `radius.inner` corners, the filled text field.

## Accessibility

The label is read for the field; the clear button reads "Clear".

## Keyboard

If the field unmounts while it has focus (its sheet closes), it drops focus and closes the keyboard (`internal/keyboard.ts`).
