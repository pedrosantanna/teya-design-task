# iOS and Android

The form each element takes on iOS and on Android. iOS is the reference (decision 021); Android gets the nearest Material 3 component or system service, so a shopper on either phone finds the controls they already know.

```summary
Takeaways:
- One table, element by element: payment, notifications, live status, navigation, back, sheets, controls, feedback, haptics, icons, fonts and materials.
- Payment is Apple Pay on iOS and Google Pay on Android; the system sheet is drawn by the system and the app adds nothing to it.
- The live status of a request is a Live Activity on iOS and an ongoing notification with a progress bar on Android, promoted to a Live Update where available (Android 16).
- The prototype's iOS/Android switch (decision 038) renders the right-hand column, so both forms can be compared in one build.
Call:
- After a design review found component specs, states, platform equivalents and content rules missing, I asked for the design system to be complete enough to build the prototype from.
- I chose HugeIcons for icons on both platforms (decision 042) and kept this table provisional (decision 043).
AI:
- An agent reviewed the design system against the v7 screens and listed the elements with no Android form. Another agent wrote this table from the existing foundations and the platform documentation.
Trade-offs:
- Using each platform's own components means two slightly different apps to build and test; one custom look on both would be cheaper and would feel foreign on at least one of them.
- Live Updates exist only from Android 16, so most Android phones still get an ongoing notification.
```

## Elements

| Element | iOS | Android |
| --- | --- | --- |
| Payment | Apple Pay sheet | Google Pay sheet |
| Notification | One per answer, grouped by request | Same, in one notification channel per kind (answers, orders) |
| Live status of a request | Live Activity on the lock screen and the Dynamic Island | An ongoing notification with a progress bar through the request's steps; a Live Update (a promoted ongoing notification) where available, from Android 16 |
| Nav bar | Navigation bar, large title collapsing to inline | Material large top app bar collapsing to small |
| Back | Swipe from the left edge, or the chevron with the previous title ("Requests") | Predictive back gesture, or the arrow in the top app bar |
| Opening Requests | Zoom transition from the round button | Container transform from the round button |
| Sheet | Page sheet with medium and large detents and a grabber | Material modal bottom sheet with a drag handle and a scrim |
| Segmented control | System segmented control | Material segmented button, single select, with a check |
| Stepper | Stepper style: minus and plus in one control | Two Material icon buttons around the value |
| Toast | Custom banner in glass above the ask bar | Material snackbar |
| Alert | System alert, destructive action in red | Material dialog, the confirming action as a text button |
| Swipe actions on rows | Trailing swipe (Close) | Long-press menu |
| Haptic: selection (chips, segments, stepper) | `Haptics.selectionAsync()` | `SEGMENT_TICK` (or `CLOCK_TICK` before API 34) |
| Haptic: primary button (Buy, Send) | `Haptics.impactAsync(ImpactFeedbackStyle.Light)` | `CONTEXT_CLICK` |
| Haptic: order Ready or Paid | `Haptics.notificationAsync(NotificationFeedbackType.Success)` | `CONFIRM` |
| Haptic: "not charged" endings | `Haptics.notificationAsync(NotificationFeedbackType.Warning)` | `REJECT` |
| Icons | HugeIcons, with the iOS variant for share (box with an up arrow), back (chevron) and more (horizontal dots) | HugeIcons, with the Android variant for share (three connected nodes), back (arrow) and more (vertical dots) |
| Fonts | Gambetta and Switzer; SF Pro as fallback | Gambetta and Switzer; Roboto as fallback |
| Floating surfaces | Liquid Glass on iOS 26 and later, blur before | Tonal surface container |
| Corners | Continuous | Circular |
| Hit area | 44 pt | 48 dp |
| Text scaling | Dynamic Type | Font size setting, sizes in sp |
| Screen reader | VoiceOver, with custom actions on cards | TalkBack, with the same actions in its actions menu |

The haptic calls are `expo-haptics` on iOS and Android's `HapticFeedbackConstants` on Android; recent versions of `expo-haptics` expose the Android constants through `performAndroidHapticsAsync`, which needs checking in the Expo SDK the prototype uses. Haptics stay on with Reduce Motion and follow the system's own haptics setting.

## In the prototype

The prototype has a switch at the top that flips the interface between iOS, the default, and Android (decision 038). It renders the forms in the Android column from the same screens. Surfaces the web build can't reach (the Apple Pay and Google Pay sheets, lock-screen notifications, the Live Activity and the Live Update) are drawn as simulated screens in both forms.

## Sources

- Apple, Human Interface Guidelines: Apple Pay, notifications, Live Activities, navigation bars, sheets, segmented controls, steppers, alerts, playing haptics: https://developer.apple.com/design/human-interface-guidelines
- Material 3 components: top app bar, bottom sheets, segmented buttons, snackbar, dialogs, icon buttons: https://m3.material.io/components
- Android, Live Updates: https://developer.android.com/develop/ui/views/notifications/live-update
- Android, predictive back: https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture
- Android, `HapticFeedbackConstants`: https://developer.android.com/reference/android/view/HapticFeedbackConstants
- Expo, Haptics: https://docs.expo.dev/versions/latest/sdk/haptics/
- Google Pay for Android: https://developers.google.com/pay/api/android
- HugeIcons: https://hugeicons.com
- [Shape and materials](shape.md), [Motion](motion.md) and [Typography](typography.md) for the values behind each form
