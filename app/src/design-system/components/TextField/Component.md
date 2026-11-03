# TextField

A single-line text field: the address search in the location sheet and a place's name on Places. Change `ios26-patterns-and-location`.

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

`hit.min` tall, Muted fill, Body text; a clear button shows while there is text. Focus ring in Tint on the web.

## iOS and Android

iOS: a full-radius capsule (the search field). Android: `radius.inner` corners, the filled text field.

## Accessibility

The label is read for the field; the clear button reads "Clear".
