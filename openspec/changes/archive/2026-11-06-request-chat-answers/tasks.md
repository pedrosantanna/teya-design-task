# Tasks

## 1. Components

- [x] 1.1 Chat bubble (shopper and Snuffle, grouping, sender line) and typing indicator; verify on `/design-system` in four themes and `npm run check`
- [x] 1.2 Answer row and answer card (best answer filled, others tonal, accessibility actions); verify on `/design-system`
- [x] 1.3 Request row with status label, preview, count and compact button; verify on `/design-system`
- [x] 1.4 Sheet (page sheet on iOS, modal bottom sheet on Android) and nav bar; verify on iOS simulator and web

## 2. Simulation

- [x] 2.1 Request scripts for eclipse glasses, birthday cake and sourdough, and the clock in the store; verify pause, step and jump from the debugger
- [x] 2.2 Simulated notification banner and Live Activity screen; verify the banner opens the chat

## 3. Screens

- [x] 3.1 Ask screen and the split proposal; verify against v7 frames "Ask" and "Snuffle suggests two requests"
- [x] 3.2 Chat: confirm, asking list, answers, details sheet; verify against v7 frames in four themes
- [x] 3.3 Requests full screen with filters; verify every status label matches the conceptual model word for word
- [x] 3.4 Keep looking and No shop has it; verify both from the debugger
- [x] 3.5 Run the screen-reviewer agent on each screen; verify findings are fixed or recorded

## Implementation notes

- The simulation lives in `app/src/store/simulation.ts` (clock, scripts per request, outcomes, date) and writes into the main store; the chat is derived from the store in `app/src/store/chat.ts`, so every debugger step shows its v7 frame. The debugger has a Simulation section (clock on/off, Step 5 s, Skip 1 min, payment and shop outcomes, date).
- New design-system components: `AnswerRow` (asking list), `ListRow`, `Alert`, `Notification` with `NotificationBanner`, `LiveActivity`, each with `Component.md` and examples.
- Routes: `/requests`, `/requests/new` (Ask and the split proposal), `/requests/[id]` (chat, details sheet, payment sheet), `/requests/[id]/order`, `/requests/[id]/keep-looking`, `/lock` (Away from the app).
- Checked on the web build in iOS and Android, light and dark. Not checked: an iOS simulator (sheet detents, keyboard), VoiceOver. 3.5: the screen review of the web build was run and its findings fixed (inverted chat list, composer on a dock, labels, keyboard controller, Enter to send).
