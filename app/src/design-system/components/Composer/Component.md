# Composer

The ask bar on Nearby (round Requests button and the field "Ask for anything nearby") and the chat composer (the field "Reply" alone). Spec: Ask bar and composer on `docs/develop/design-system/components.md`; materials from `shape.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `mode` | `'ask'`, `'reply'` | `'reply'` | Ask adds the Requests button |
| `value`, `onChangeText` | controlled text | required | |
| `onSend` | `(text) => void` | none | Fires with the trimmed text; light haptic (iOS) or context click (Android) |
| `placeholder` | string | by mode | |
| `sending` | boolean | `false` | Send becomes a spinner |
| `sendDisabled` | boolean | `false` | Offline: send at 38%, the field still takes text |
| `requestsCount` | number | `0` | Count on the Requests button for requests that need the shopper |
| `onRequestsPress` | function | none | Opens Requests (zoom transition on iOS, container transform on Android; the screen does that) |
| `onFieldPress` | function | none | The field becomes a button ("Ask Snuffle") that opens the Ask screen; Nearby uses it so the keyboard opens there |
| `chips` | ReactNode | none | Place and deadline chips inside the composer on New Request (menu chips), `space.3` in from the capsule's top and sides |
| `nativeID` | string | none | Links the field to a `KeyboardGestureArea` (`textInputNativeID`), so an interactive keyboard dismiss starts at the composer |

## Behaviour

- Height 50 to match a large button, `radius.full`; the field grows to five lines, then scrolls.
- Send appears inside the field's right end only when there is text, in Primary, scaling in with `spring.snappy`; the field is empty at the right otherwise. Dictation can't be simulated in the prototype, so the typing composer has no microphone for now; the Nearby ask bar keeps it as part of the button that opens Ask.
- On the web, Enter sends and Shift+Enter starts a new line.
- Material: Liquid Glass (interactive) on iOS 26 when the system offers it and Reduce Transparency is off; blur on earlier iOS and the web; a solid surface on Android or with Reduce Transparency. The palette has no surface-container role, so Android uses Card.
- The screen places it at the bottom with `margin.screen` at the sides and keeps `clearance.askBar` (48) under the last row of content. On the phones it rides on the keyboard in a `KeyboardStickyView` (react-native-keyboard-controller), with the home-indicator inset dropped while the keyboard is open, and the conversation is a `KeyboardChatScrollView` so its last message stays above the composer; dragging the conversation down dismisses the keyboard with the finger.
- Web: a 2 px Tint focus ring while the field has focus.

## Accessibility

Field "Ask Snuffle"; send "Send"; Requests button "Requests, 1 needs you".

## iOS and Android

Custom on both; only the material and the send icon (`ArrowUp02Icon` ↔ `SentIcon`) change.

## Keyboard focus

The keyboard belongs to the field. When the composer has a field (New Request, a chat), it closes the keyboard as its screen loses focus, and drops focus if it unmounts while focused (`internal/keyboard.ts`). The ask-bar form (`onFieldPress`) has no field and leaves the keyboard alone, so it can't close the keyboard New Request is raising.
