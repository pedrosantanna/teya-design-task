# Prototype

The shopper app running in the browser, from the same Expo code that runs on iPhone and Android. Content is mocked; the shops answer on a script. Press D, or the round button, to open the state debugger and change the persona, the platform, the journey step and the state of each request, answer and order.

```summary
Takeaways:
- One Expo app builds iOS, Android and this web version (decision 038); the frame switches between an iPhone and a Pixel with the platform.
- The state debugger sets persona (Sam or Jess), platform, light or dark, journey step, the states from the conceptual model and the content set; the simulation clock can be paused or stepped.
- Sam's journey runs end to end: ask, answers arriving, buy, wait for the shop, collect; every failure path from app flow v7 is one jump away.
Call:
- I asked for a prototype that runs as a real app for the recording and as a web build inside these docs, with a debugger to set any state while I navigate, and an iPhone or Android frame around it.
- I asked for every screen to be checked by the screen reviewer before publishing; its findings were fixed in this build.
AI:
- Agents built the store and debugger, the design-system components, the screens and the simulation from the OpenSpec changes; another agent reviewed the running screens and a last one fixed what it found.
Trade-offs:
- The web build can't show native glass, haptics or the real payment sheets; they are drawn, and the recording uses the iOS build.
```

Open it on its own to use the full window: `app-web/index.html`. Add `?debug=0` to hide the debugger, `?os=android` for Android, or `?step=` to start at a step.
