# Motion

How things move in the app: six springs, what each one is for, and the rules that keep motion quick and out of the way. Every movement is a spring, so it can be interrupted and keeps the speed of the finger that started it.

```summary
Takeaways:
- Six springs: press, snappy, smooth, arrive, fade and status. Each has an iOS value (duration and bounce) and the nearest Material 3 token for Android.
- The answer card arriving in the chat is the one moment with visible bounce. Everything else settles without overshoot or with very little.
- Every screen change is animated, with Apple Music as the reference: what opens grows from what was tapped (a zoom on iOS, a container transform on Android, a View Transition on the web) and closes back into it.
- Feedback starts at touch-down, within 100 ms, and never waits for the network. A new tap retargets a running animation; nothing blocks input.
- Reduce Motion turns movement and every screen transition into a crossfade and keeps the haptics. Haptics are few: selection, a light tap on the primary button, success when the shop confirms and the order becomes Ready (collect) or Paid (delivery), a warning when an order ends not charged.
Call:
- I asked for motion that feels premium and quick to respond, starting from iOS and Liquid Glass and adding Material.
- I kept the values provisional until they are tuned on a phone in the prototype (decision 040).
- I asked for the splash to be a short vector intro of the mark on Indigo, about 1.6 s, with the awning unrolling stripe by stripe and a quick sway.
- In this round I asked for every screen change to be animated, with Apple Music as the reference, and brought back the zoom from the round Requests button (decision 026).
AI:
- An agent researched Apple's spring guidance (WWDC 2023 and 2024), the Material 3 and Material 3 Expressive motion tokens in the Compose source, and Reanimated and Expo Haptics, and proposed the springs and rules. I asked for motion that feels premium and fast to respond.
- An agent wrote the splash timeline and built it with one Reanimated clock, then took frames at 0, 400, 800, 1200 and 1600 ms to check it.
- An agent matched each screen change to an iOS 26, Material 3 and web transition and checked what Expo Router, Reanimated and the browser support today.
Trade-offs:
- Springs feel alive and can be interrupted, and are harder to time exactly than eased curves.
- Material's springs settle faster than Apple's defaults, so the same token feels a little quicker on Android.
- Expo Router's zoom transition is still alpha and needs iOS 18, and Reanimated's shared elements are experimental, so some transitions may fall back to a push or a fade in the prototype.
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
| Respect Reduce Motion | Movement and screen transitions become a crossfade; haptics stay |
| Few haptics | Selection for chips, a light impact for the primary button, success when the order becomes Ready (collect) or Paid (delivery), a warning only on the endings "Not confirmed · not charged" and "Sold · not charged", never on "not charged yet" |
| Run on the UI thread | Reanimated shared values, Gesture Handler for pans, only transform and opacity on hot paths, all tokens in one `motion.ts` |

## Splash

The splash is the one scripted sequence: the mark builds itself on Indigo 800 in about 1.6 s, driven by one clock on the UI thread so every run is the same.

| Time (ms) | What moves |
| --- | --- |
| 0 | Only the awning shows, rolled up at the top as a thin striped bar, a little above its place |
| 100 to 800 | The five stripes unroll left to right, 70 ms apart. Each is a spring with a small overshoot (damping 0.55) and sways about its top edge, up to 7 degrees, fading out in about 0.4 s |
| 780 | The ears slide in from each side |
| 960 and 1050 | The eyes grow from the centre, then the nose pops with a little more bounce |
| 1240 and 1400 | Two blinks: the eyes close to a tenth of their height and open again in 260 ms each |
| 1600 | The finished mark holds for 250 ms, fades in 150 ms, then the ground fades to Getting started in 200 ms; the page mounts as the ground starts to fade, so its entry animation is seen |

With Reduce Motion the finished mark shows at once and only the two fades remain. The build is drawn with `react-native-svg` and Reanimated; a link with `?intro=<ms>` on the web build holds it at that time, for review.

## Screen transitions

No screen changes without motion. Each transition starts from the element that was tapped, so the shopper sees where the new screen came from and where it goes back to.

| Change | iOS | Android | Web |
| --- | --- | --- | --- |
| Nearby → shop page | Zoom from the tile; drag down to dismiss, following the finger | Container transform | View Transition morph from the tile |
| Nearby → Requests | Zoom from the round Requests button (decision 026) | Container transform | View Transition from the circle |
| Nearby → location sheet | Zoom from the address row | Bottom sheet rises | Sheet grows from the row |
| Requests → chat | Push, under the glass Back | Shared axis X, with predictive back | Slide |
| Chat → details sheet | The sheet zooms from the answer card | Bottom sheet rises | Sheet grows from the card |
| Details sheet → payment | The Apple Pay sheet over the details sheet | Google Pay sheet | Slide up |
| Payment → receipt | The details sheet morphs into the receipt | Fade through | Crossfade |
| Receipt → enlarged code | Zoom from the code | Container transform | Morph |
| Any → Keep looking | Sheet from the button | Bottom sheet | Fade and scale |

With Reduce Motion on, each of these is a crossfade. Pushes and sheets the app draws use `spring.smooth`; system zooms and the payment sheets keep the system's timing. A sheet at the fit detent also uses `spring.smooth` to move to a new height when its content changes; under Reduce Motion it jumps.

In the Expo app the zoom is Expo Router's `Link.AppleZoom`, which is alpha and needs iOS 18; Reanimated's shared element transitions are the other route and are experimental. The web build uses `document.startViewTransition`. Where none of them works, the change falls back to a push or a fade.

### Web

On the web a push takes 350 ms, a sheet rises in 380 ms and leaves in 320 ms, a zoom takes 420 ms and the ask bar's morph 420 ms, all on the iOS curve `cubic-bezier(0.32, 0.72, 0, 1)`. A zoom and a morph clip to `radius.card` (28). A pointer press has no delay. A touch drag that starts within 24 pt of the left edge and travels 72 pt, mostly sideways, goes back like the Back button; it works only on pushed screens, so a sheet or the New Request composer closes with its own control. The browser can't follow a finger through a view transition, so the gesture commits on release. With Reduce Motion, every change is a 200 ms crossfade: the screens fade in place and don't slide. The values are named constants in `internal/transitions.ts`, not tokens.


## Chat

Everything that arrives in a chat comes in the same way: Snuffle's message (its sender line and bubble together) fades in and rises 8 pt on `spring.smooth`; the shopper's bubble keeps its `spring.snappy` scale. The typing indicator fades in and out, and the message rises in over it, so there is never a gap or two of them. Suggestion chips, the asking list, a status label and an offer card fade and rise 150 ms after the message before them. When a status changes (an answer row, an order card), the old content fades out as the new fades in, on `spring.status`, instead of swapping. On native the rows already on screen slide to make room; on the web they shift in one step, because the layout transition flipped the inverted list. While Snuffle asks the shops, the sniffing mark ([Mark](mark.md#sniffing)) stands where the scooter used to be and fades out, giving back its height on `spring.smooth`, when the first answer arrives. With Reduce Motion new items only fade and nothing moves.

## Sources

- Apple, "Animate with springs", WWDC 2023: https://developer.apple.com/videos/play/wwdc2023/10158/
- Apple, "Enhance your UI animations and transitions", WWDC 2024: https://developer.apple.com/videos/play/wwdc2024/10145
- Android, Material 3 motion tokens in Compose: https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt and StandardMotionTokens.kt in the same folder
- Software Mansion, Reanimated `withSpring`: https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring/
- Expo, Haptics: https://docs.expo.dev/versions/latest/sdk/haptics/
- Apple, "Build a SwiftUI app with the new design", WWDC 2025 (zoom transitions, sheets): https://developer.apple.com/videos/play/wwdc2025/323/
- Material 3, transition patterns (container transform, shared axis, fade through): https://m3.material.io/styles/motion/transitions/transition-patterns
- Software Mansion, Reanimated shared element transitions: https://docs.swmansion.com/react-native-reanimated/docs/shared-element-transitions/overview/
- Expo Router (`Link.AppleZoom`): https://docs.expo.dev/router/introduction/
- MDN, `Document.startViewTransition()`: https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition
