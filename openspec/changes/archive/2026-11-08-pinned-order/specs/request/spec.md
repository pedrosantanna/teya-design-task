# Spec Delta

## MODIFIED Requirements

### Requirement: Simulated notification
When a shop answers while the shopper is on another screen, the prototype SHALL show the notification as a simulated system banner, the same on iOS, Android and web. When the order is ready, the banner SHALL say the collection code is pinned in the chat.

#### Scenario: Banner
- **WHEN** Paper & Co answers while Sam is on Nearby
- **THEN** a banner from Snuffle shows "Paper & Co on King Street has them too: £14.99 a pair." and tapping it opens the chat

#### Scenario: Order ready
- **WHEN** Paper & Co sets Sam's order aside while Sam is on another screen
- **THEN** the banner reads "Paper & Co has set them aside. Your collection code is pinned in the chat."
