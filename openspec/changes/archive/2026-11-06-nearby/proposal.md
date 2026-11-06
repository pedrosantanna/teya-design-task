# Proposal

## Why

Nearby is the first screen of the recording and where the shopper chooses between browsing and asking (H3). It replaces the starter screen from `app-foundation`.

## What Changes

- Nearby screen: area header, "Open near you" (large tiles) and "New near you" (medium tiles with a street filter), suggestion chips, and the ask bar with the round Requests button.
- Components: shop tile, badge, filter chip, suggestion chip, ask bar, Requests button with count, each with `Component.md` and examples.
- Mock content for Sam and Jess from the debugger's store, with Unsplash photos and credits.
- Skeletons after 300 ms, photos fading in, and the no-photo placeholder.

## Capabilities

### New Capabilities

None.

### Modified Capabilities
- `nearby`: adds how the prototype fills Nearby from mock content, credits photos, and loads.

## Impact

- `app/src/app/index.tsx` becomes Nearby; new components in `app/src/design-system/components/`; content in `app/src/content/`.
