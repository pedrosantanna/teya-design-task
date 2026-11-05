# iOS and Android

The form each element takes on iOS, Android and the web. iOS 26 is the reference (decision 021), followed the way Apple's own apps use it; Android gets the nearest Material 3 Expressive component or system service and the web build the nearest browser form, so a shopper on any of them finds the controls they already know.

```summary
Takeaways:
- Two tables: the Liquid Glass patterns (back, close, confirm, bar actions, titles, the ask bar, sheets, search, the primary button) on iOS, Android and the web, then every other element on iOS and Android.
- Back is a chevron alone in a glass circle; the previous screen's title moves to the long-press menu and the accessibility label. Close and Confirm are glass circles at the top of sheets.
- Payment is Apple Pay on iOS and Google Pay on Android; the system sheet is drawn by the system and the app adds nothing to it.
- The live status of a request is a Live Activity on iOS and an ongoing notification with a progress bar on Android, promoted to a Live Update where available (Android 16).
- The prototype's iOS/Android switch (decision 038) renders the right-hand column, so both forms can be compared in one build.
Call:
- After a design review found component specs, states, platform equivalents and content rules missing, I asked for the design system to be complete enough to build the prototype from.
- I chose HugeIcons for icons on both platforms (decision 042) and kept this table provisional (decision 043).
- In this round I asked to follow iOS 26 and Liquid Glass as Apple's own apps use them, with Apple Music and Freeform as references, on iOS, Android and the web.
AI:
- An agent reviewed the design system against the v7 screens and listed the elements with no Android form. Another agent wrote this table from the existing foundations and the platform documentation.
- An agent read Apple's WWDC 2025 sessions on adopting the new design (284, 323 and 356), the Expo Router native tabs docs and Material 3 Expressive, mapped each pattern to the three platforms and fixed where the earlier table disagreed with them (Back with the previous title, the sheet's custom background).
Trade-offs:
- Using each platform's own components means two slightly different apps to build and test; one custom look on both would be cheaper and would feel foreign on at least one of them.
- Live Updates exist only from Android 16, so most Android phones still get an ongoing notification.
- Following the system's glass closely ties the iOS look to iOS 26; the web can only approximate it with a blur, which costs rendering time on older phones.
```

## Liquid Glass patterns

Apple Music and Freeform are the reference for where iOS 26 puts these controls. The Android column follows Material 3 Expressive and the web column uses CSS. How each screen change moves is on [Motion](motion.md), and the glass recipe for the web on [Shape and materials](shape.md).

| Element | iOS 26 | Android (Material 3 Expressive) | Web |
| --- | --- | --- | --- |
| Back | Chevron alone in a glass circle floating at the top left; the previous title is in the long-press menu and the accessibility label; swipe back from anywhere on the screen | Arrow icon button in the top app bar; predictive back | Chevron in a blurred circle; the previous title in `aria-label` |
| Close | Glass × circle, about 44, at the top left of sheets and presented views (`role: .close`) | Close icon in the top app bar or the sheet header | Blurred × circle |
| Confirm | Checkmark circle tinted Indigo at the top right (`role: .confirm`) | Filled or tonal "Done" button | Indigo checkmark circle |
| More and actions | Icon-only items share one glass capsule on the right; a text button, Close and Confirm each get their own glass; fixed spacing between groups | Icon buttons and an overflow menu (vertical dots); a floating toolbar for actions in context | One blurred capsule |
| Nav title | The large title scrolls with the content and collapses to an inline leading title; the bar has no fill; a scroll edge effect (soft blur and fade) replaces the bar background, with the hard style only for dense lists | Flexible top app bar collapsing to small, tinted on scroll | Large heading; the inline title fades in over a gradient mask |
| Ask bar and Requests button | Modelled on the tab view's bottom accessory (Apple Music's mini player): a glass capsule above the bottom edge that shrinks inline on scroll down (`NativeTabs.BottomAccessory` and `usePlacement` in Expo Router, if used) | Floating toolbar | Fixed blurred capsule that shrinks on scroll |
| Sheet | System sheet, inset with glass when it fits its content (the fit detent, a custom detent from iOS 16) or sits at medium, opaque and edge to edge at large, zooming from its source; no custom background | Modal bottom sheet with a drag handle and a scrim, `radius.sheet` | Bottom sheet with blur at medium, solid at full height |
| Search | At the bottom on iPhone | Search app bar at the top | Bottom capsule at phone widths |
| Primary button | Filled capsule; prominent glass in Indigo (`glassProminent`) over a photo or the map, or in a bar | Filled button | Filled capsule; blurred Indigo over a photo or the map |

## Elements

| Element | iOS | Android |
| --- | --- | --- |
| Payment | Apple Pay sheet | Google Pay sheet |
| Notification | One per answer, grouped by request | Same, in one notification channel per kind (answers, orders) |
| Live status of a request | Live Activity on the lock screen and the Dynamic Island | An ongoing notification with a progress bar through the request's steps; a Live Update (a promoted ongoing notification) where available, from Android 16 |
| Segmented control | System segmented control | Material segmented button, single select, with a check |
| Stepper | Stepper style: minus and plus in one control | Two Material icon buttons around the value |
| Toast | Custom banner in glass above the ask bar | Material snackbar |
| Alert | System alert, destructive action in red | Material dialog, the confirming action as a text button |
| Swipe actions on rows | Trailing swipe (Close) | Long-press menu |
| Haptic: selection (chips, segments, stepper) | `Haptics.selectionAsync()` | `SEGMENT_TICK` (or `CLOCK_TICK` before API 34) |
| Haptic: primary button (Buy, Send) | `Haptics.impactAsync(ImpactFeedbackStyle.Light)` | `CONTEXT_CLICK` |
| Haptic: order Ready or Paid | `Haptics.notificationAsync(NotificationFeedbackType.Success)` | `CONFIRM` |
| Haptic: "not charged" endings | `Haptics.notificationAsync(NotificationFeedbackType.Warning)` | `REJECT` |
| Icons | HugeIcons for the app's own buttons, with the iOS variant for share (box with an up arrow) and more (horizontal dots). On iOS 26 the system draws Back; in the cross-platform prototype the app draws it with the HugeIcons chevron to match | HugeIcons, with the Android variant for share (three connected nodes), back (arrow) and more (vertical dots) |
| Fonts | Gambetta and Switzer; SF Pro as fallback | Gambetta and Switzer; Roboto as fallback |
| Floating surfaces | Liquid Glass on iOS 26 and later, blur before | Tonal surface container |
| Corners | Continuous | Circular |
| Hit area | 44 pt | 48 dp |
| Text scaling | Dynamic Type | Font size setting, sizes in sp |
| Screen reader | VoiceOver, with custom actions on cards | TalkBack, with the same actions in its actions menu |

The haptic calls are `expo-haptics` on iOS and Android's `HapticFeedbackConstants` on Android; recent versions of `expo-haptics` expose the Android constants through `performAndroidHapticsAsync`, which needs checking in the Expo SDK the prototype uses. Haptics stay on with Reduce Motion and follow the system's own haptics setting.

## In the prototype

The prototype has a switch at the top that flips the interface between iOS, the default, and Android (decision 038). It renders the forms in the Android column from the same screens. Surfaces the web build can't reach (the Apple Pay and Google Pay sheets, lock-screen notifications, the Live Activity and the Live Update) are drawn as simulated screens in both forms. In a browser the prototype follows the web column of the patterns table.

## Sources

- Apple, Human Interface Guidelines: Apple Pay, notifications, Live Activities, navigation bars, sheets, segmented controls, steppers, alerts, playing haptics: https://developer.apple.com/design/human-interface-guidelines
- Material 3 components: top app bar, bottom sheets, segmented buttons, snackbar, dialogs, icon buttons: https://m3.material.io/components
- Android, Live Updates: https://developer.android.com/develop/ui/views/notifications/live-update
- Android, predictive back: https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture
- Android, `HapticFeedbackConstants`: https://developer.android.com/reference/android/view/HapticFeedbackConstants
- Expo, Haptics: https://docs.expo.dev/versions/latest/sdk/haptics/
- Google Pay for Android: https://developers.google.com/pay/api/android
- Apple, "Build a UIKit app with the new design", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/284/
- Apple, "Build a SwiftUI app with the new design", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/323/
- Apple, "Get to know the new design system", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/356
- Expo Router, native tabs (bottom accessory): https://docs.expo.dev/router/advanced/native-tabs/
- Material 3 Expressive, toolbars and app bars: https://m3.material.io/components/toolbars and https://m3.material.io/components/app-bars
- HugeIcons: https://hugeicons.com
- [Shape and materials](shape.md), [Motion](motion.md) and [Typography](typography.md) for the values behind each form
