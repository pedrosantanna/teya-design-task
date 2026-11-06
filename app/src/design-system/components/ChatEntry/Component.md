# ChatEntry

The motion of a conversation: how an item enters, how it leaves, and how what is around it moves. Spec: Springs and Rules on `docs/develop/design-system/motion.md`.

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `animate` | `boolean` | `true` | Enters with a fade and a small rise on `spring.smooth`. Off for what is already there |
| `follows` | `boolean` | `false` | Enters 150 ms after the item before it (suggestions after Snuffle's message) |
| `leaves` | `boolean` | `true` | Fades out on `spring.fade` when removed |
| `moves` | `boolean` | `false` | Moves with the layout transition when its siblings change |

`useChatLayout()` returns the layout transition (`spring.smooth`), for a list's `itemLayoutAnimation` or a wrapper's `layout`; `undefined` under Reduce Motion.

## Behaviour

The same three movements everywhere in the chat: in (fade and rise), out (fade) and make room (layout). A status label that changes cross-fades in place (`internal/CrossFade`). Nothing bounces; the answer card keeps its own arrival on `spring.arrive`. With Reduce Motion new items only fade and nothing moves.

## Accessibility

No effect on the tree. Content is exposed as soon as it mounts.

## iOS and Android

Same on both.
