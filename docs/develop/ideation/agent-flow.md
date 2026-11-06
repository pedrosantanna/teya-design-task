# Agent flow

The conversation between the shopper and Snuffle, turn by turn, and behind it the conversation between Snuffle and the shops. The boxes are states of the conversation with the lines said in each, not screens: the screens are on App flow and the shop's own request states on Shop request states.

```summary
Takeaways:
- One ask opens two conversations. The shopper talks to Snuffle in the chat; Snuffle talks to each asked shop on WhatsApp, in numbered replies, and to a connected shop through its till.
- Snuffle speaks at a few fixed points: it confirms what it understood, asks how the shopper wants the item, says who it asked, reports each answer, and reports the money (charged, not charged, refunded).
- Every dead end has a next move in the chat: sold and not confirmed go to the next shop, nothing found offers Ask further away and Keep looking, a missed date offers Ask the shop again.
- The prototype plays the whole main path and the dead ends of Buy and Collect. A weekly ask, a question for missing words, an ask outside the area and the failures after the charge are only designed, and each is marked as such on the board.
Call:
- I asked for a page next to App flow and Shop request states that shows the conversations as a flow, the chats as I imagine them, and not as screens.
- I asked that every branch say whether the prototype does it, a timer plays the shop, or it is only designed, so the assumptions are visible.
- I decided that Snuffle never decides for the shopper: a similar item, a smaller quantity and a late find are shown, and the shopper taps Buy.
AI:
- An agent drew the board from the prototype's scripts (simulation, chat, other chats and journey steps) and from the specs, and took the shop's messages from Shop request states v5. I reviewed which branches exist in the prototype and which are assumptions.
Trade-offs:
- Quoting the prototype's exact lines makes the board accurate and ties it to a script that only knows three asks.
- The designed-only branches (missing words, outside the area, gone after the charge) are the cases a real agent meets first, and the ones the prototype has no data for.
```

## Reading the board

The board has three parts. The top row of columns follows one ask from the words to the receipt: the ask, the shops being asked, the answers, Buy and Collect. Below it, a weekly request and the branch for when nothing comes back. At the bottom, the messages between Snuffle and the shops.

A solid frame is something the prototype does. A dashed frame is only designed. The shop's side is played by timers in the prototype, and those nodes say so.

## What stays open

The tone of Snuffle's questions when a word is missing is a guess until it is tested with real asks. How many times Snuffle asks a shop that does not understand a numbered reply is open. Who reviews a disputed signal is still open on Shop request states.
