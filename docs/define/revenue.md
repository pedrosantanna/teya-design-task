# Revenue

How the product makes money, written as hypotheses. The concept answers the shopper's and the shopkeeper's problems, and it also has to pay for itself. I work from one scenario: the concierge belongs to a payment provider with its own POS, as Teya is. The revenue comes from payments, from bringing shops onto the provider's network, and from promotion.

```summary
Takeaways:
- The main source is payments. Every hold, prepaid order and delivery is paid in the app, so the provider processes a purchase that would otherwise be cash or someone else's card terminal.
- The app also gives the provider a reason for shops to join its POS: to receive these payments and these shoppers. Each new shop brings all of its sales, not only the app's.
- Promotion is the third source: paid placement on the home screen, and reach beyond a shop's own street.
- For a POS provider, the app adds value to the whole network: more shoppers for the shops that already use its POS, which makes the POS worth keeping.
Call:
- No commission on the sale itself. Delivery apps take 14–35% (F9), and that's the cost independents complain about. Revenue comes from the payment and from promotion, which a shop can switch off.
- The scenario is a payment provider with a POS. A standalone app would need a commission, which I chose not to explore.
AI:
- I set the revenue sources and the network scenario. An agent wrote them as hypotheses with tests in the proof of concept, and suggested two more sources, listed at the end.
Trade-offs:
- Listing only shops on the provider's POS makes the app a strong reason to join, and makes the street look empty at first (cold start). Listing every shop and paying in the app makes coverage better, and makes the network argument weaker.
```

## Sources

| Source | How it works | Hypothesis |
| --- | --- | --- |
| Payments in the app | The shopper pays in the app for a hold, a prepaid order or a delivery. The provider processes the payment and earns its fee, including on purchases that used to be cash or another terminal | H12 |
| New shops on the network | A shop that wants to receive app payments and requests takes the provider's payment account or POS. The provider then processes the shop's counter sales too | H13 |
| Value of the POS network | Shops on the provider's POS get shoppers from the app. That raises their sales, so the POS is worth keeping and worth recommending | H14 |
| Promotion | A shop pays to appear on the home screen ("Open near you", "New on King Street") or to reach a neighbourhood beyond its own street | H15 |
| Reach across London | A shopper buys from a shop farther away because it's the only one with the item and they can pay ahead. This is what makes paid reach worth buying | H16 |

## Network scenario

I treat this as a hypothetical scenario: the concierge is part of a POS provider's ecosystem. Two versions are possible.

- **Network only.** Only shops on the provider's POS are listed and answer requests. The app is a benefit of the POS, and a reason for other shops to join. The street looks thin until enough shops are on it.
- **Open, paid through the network.** Any shop can answer, and every payment goes through the provider. Coverage is better from the start, and joining the POS becomes the upgrade (faster payouts, POS integration, instant answers from till stock).

For the proof of concept I start open, because the hypotheses need enough shops answering (H1), and I record which shops already use the provider's POS so both versions can be compared.

## Other sources I'd consider

- **A booking fee on delivery.** The shopper pays a flat fee when the concierge books a courier, with a margin on top of the courier's price. It depends on shoppers accepting a delivery fee for local shops (H7).
- **Paid demand insights.** The weekly demand summary is free; a paid version would add detail by hour, by item and against the rest of the street. It depends on shops valuing the free summary first (H9).

Both stay out of the hypotheses until the proof of concept says whether their preconditions hold.
