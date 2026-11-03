# LiveActivity

A request's live status on the lock screen: a Live Activity on iOS, a Live Update (an ongoing notification before Android 16) on Android. Spec: Notification and Live Activity on `docs/develop/design-system/components.md` and the v7 frame "Away from the app". Simulated (decision 038).

## Props

| Prop | Type | Default | Notes |
| --- | --- | --- | --- |
| `title` | string | required | The request name |
| `status` | string | required | The request's status label without its suffix: "2 shops have them" |
| `deadline` | string | none | "by 4pm" |
| `answered`, `asked` | number | required | iOS: a segmented bar, one segment per shop asked. Android: a determinate progress bar |

## iOS and Android

iOS: a Live Activity, the mark at 40, title, status and deadline, and a segmented bar. Android: an ongoing notification (a Live Update from Android 16): the small mark and "Snuffle · 2 of 6 answered · by 4pm" in Caption 1, then the title and status, then a Material linear progress bar.

## Rules

Updates as answers arrive and ends when the request has an order or ends. Live Activities are drawn by the system, so the motion tokens don't apply.

## Accessibility

One element: title, status, deadline and "2 of 6 shops answered".
