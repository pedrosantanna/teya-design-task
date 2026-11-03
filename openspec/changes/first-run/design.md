# Design

## Mark

The glyph is drawn from the paths of `docs/develop/design-system/img/mark-glyph.svg` on a tight view box (114 × 84 units), so its size is the glyph's width with no padding. Ears, eyes, nose and stripes 1, 3 and 5 are Foreground; stripes 2 and 4 are Muted foreground, the theme's lighter tone of the same ink, so the awning still reads as stripes in one colour family. Sizes are token names mapped to existing size tokens: `inline` (`size.icon.nav`, the sender line), `icon` (`size.avatar.shop`, notification and Live Activity), `large` (`size.thumb.request`, sign in) and `splash` (`size.category.art`, 120). Dedicated `size.mark.*` tokens are left to the token files' owner.

## Native splash and the in-app splash

`expo-splash-screen` shows `assets/images/splash-mark.png` (dark glyph) on `#EEE9E2` and `splash-mark-dark.png` (light glyph) on `#100A06`, both the `color.background` tokens, at `imageWidth` 120. The PNGs are rendered from the same SVG paths. The first first-run screen draws the same glyph at the same size and place, so the hand-off from the system splash is invisible; it then fades out (and grows slightly when motion is allowed) while Getting started fades in.

## First-run routes

`/welcome` holds the splash moment and the three pages in one horizontal paging `ScrollView` (native paging and swipe on iOS, Android and the web). `?page=` opens a page without the splash (journey steps). `/location-ask` and `/sign-in` follow. Each uses `router.replace`, so Back never returns into first run; native stacks fade between them and the web uses a `fade` view transition. Nearby's route redirects to `/welcome` while `hasOnboarded` is false.

## Persistence

`store/persist.ts` reads and writes a small JSON file in the document directory with `expo-file-system`'s synchronous API, so the flag is known before the first frame; `persist.web.ts` uses `localStorage`. On the web a link with `?step=` counts as onboarded (shared links open on their step) and `?firstRun=1` forces first run.

## Location prompt

The system prompt is simulated with `Alert`, which now stacks three or more actions vertically as iOS does: "Allow Once", "Allow While Using App", "Don't Allow" (Android: "While using the app", "Only this time", "Don't allow"). Don't Allow sets `locationOff`, so Nearby opens in its location-off state.

## Sign in

`SignInButton` has four providers. Apple is black on light and white on dark (HIG), using `codeInk` and `codeSurface`, which are pure black and white in both modes. Google and Facebook are Card with a border; email is a plain text button. Logos are HugeIcons glyphs, a prototype stand-in for the providers' own artwork. Any button signs in as the selected persona after a short spinner.
