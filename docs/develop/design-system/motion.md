# Motion

How things move in the app: six springs, what each one is for, and the rules that keep motion quick and out of the way. Every movement is a spring, so it can be interrupted and keeps the speed of the finger that started it.

```summary
Takeaways:
- Six springs: press, snappy, smooth, arrive, fade and status. Each has an iOS value (duration and bounce) and the nearest Material 3 token for Android.
- The answer card arriving in the chat is the one moment with visible bounce. Everything else settles without overshoot or with very little.
- Feedback starts at touch-down, within 100 ms, and never waits for the network. A new tap retargets a running animation; nothing blocks input.
- Reduce Motion swaps movement for a fade and keeps the haptics. Haptics are few: selection, a light tap on the primary button, success when the shop confirms and the order becomes Ready (collect) or Paid (delivery), a warning when an order ends not charged.
Call:
- I asked for motion that feels premium and quick to respond, starting from iOS and Liquid Glass and adding Material.
- I kept the values provisional until they are tuned on a phone in the prototype (decision 040).
AI:
- An agent researched Apple's spring guidance (WWDC 2023 and 2024), the Material 3 and Material 3 Expressive motion tokens in the Compose source, and Reanimated and Expo Haptics, and proposed the springs and rules. I asked for motion that feels premium and fast to respond.
Trade-offs:
- Springs feel alive and can be interrupted, and are harder to time exactly than eased curves.
- Material's springs settle faster than Apple's defaults, so the same token feels a little quicker on Android.
```

## Springs

| Token | iOS (duration, bounce) | Android (Material 3, damping ratio / stiffness) | Used for |
| --- | --- | --- | --- |
| `spring.press` | 0.2 s, 0 | fast effects, 1.0 / 3800 | Press: scale to 0.97 and darken the fill |
| `spring.snappy` | 0.3 s, 0.15 | standard fast spatial, 0.9 / 1400 | Release, chip selection, switches, the shopper's bubble appearing |
| `spring.smooth` | 0.45 s, 0 | standard default spatial, 0.9 / 700 | Navigation push, custom sheets, list changes |
| `spring.arrive` | 0.5 s, 0.2 | expressive default spatial, 0.8 / 380 | An answer card entering the chat |
| `spring.fade` | 0.25 s, 0 | default effects, 1.0 / 1600 | Opacity and colour, skeleton to content |
| `spring.status` | 0.6 s, 0 | slow effects, 1.0 / 800 | An order's status changing |

In Reanimated, a spring takes `duration` in milliseconds and `dampingRatio` = 1 − bounce. Live Activities are drawn by the system, so these tokens don't apply there.

## Rules

| Rule | In practice |
| --- | --- |
| Respond at touch-down | Press state and haptic fire on press-in, well within 100 ms |
| Everything can be interrupted | Springs only for movement; a gesture's velocity is passed into the spring |
| Motion starts where it came from | A sheet rises from what opened it; an answer card grows from its place in the chat |
| Never block input | No animation disables touch; a new tap retargets it |
| Show the shopper's action at once | Their bubble appears straight away; a skeleton shows only if an answer takes more than about 300 ms |
| Respect Reduce Motion | Movement becomes a fade; haptics stay |
| Few haptics | Selection for chips, a light impact for the primary button, success when the order becomes Ready (collect) or Paid (delivery), a warning only on the endings "Not confirmed · not charged" and "Sold · not charged", never on "not charged yet" |
| Run on the UI thread | Reanimated shared values, Gesture Handler for pans, only transform and opacity on hot paths, all tokens in one `motion.ts` |

## Sources

- Apple, "Animate with springs", WWDC 2023: https://developer.apple.com/videos/play/wwdc2023/10158/
- Apple, "Enhance your UI animations and transitions", WWDC 2024: https://developer.apple.com/videos/play/wwdc2024/10145
- Android, Material 3 motion tokens in Compose: https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt and StandardMotionTokens.kt in the same folder
- Software Mansion, Reanimated `withSpring`: https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring/
- Expo, Haptics: https://docs.expo.dev/versions/latest/sdk/haptics/
