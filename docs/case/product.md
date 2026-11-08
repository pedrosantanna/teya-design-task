# The product

One request, answered by the shops, bought and collected in the same chat.

## The journey

Sam needs two pairs of eclipse glasses by 4pm on Monday 2 November. Every dead end on the way has a next move.

<div class="dg dg-journey"><div class="dg-jrow is-head"><span></span><span>Step</span><span>When it doesn't work out</span></div><div class="dg-jrow"><time>13:02</time><div class="dg-jstep"><b>Ask</b>“Eclipse glasses, 2 pairs, before 4pm”, with a cake for Saturday in the same message</div><div class="dg-jends"><span class="dg-jend">Two things for different shops: Snuffle proposes two requests</span></div></div><div class="dg-jrow"><time>13:05</time><div class="dg-jstep"><b>Six shops asked</b>Broadway Chemist answers at once from its till; the others get a WhatsApp message</div><div class="dg-jends"><span class="dg-jend">Nobody has it by 4pm: ask further away, or keep looking until Fri 6 Nov</span></div></div><div class="dg-jrow"><time>13:14</time><div class="dg-jstep"><b>Answers in the chat</b>Paper &amp; Co has them at £14.99 a pair, collect by Mon 9 Nov</div><div class="dg-jends"></div></div><div class="dg-jrow"><time>13:15</time><div class="dg-jstep"><b>Buy</b>Apple Pay authorises £29.98; nothing is taken yet</div><div class="dg-jends"><span class="dg-jend">Payment declined: no order, and no shop asked to set them aside</span></div></div><div class="dg-jrow"><time>13:16</time><div class="dg-jstep"><b>Waiting for the shop</b>Paper &amp; Co has 10 minutes to set the pairs aside</div><div class="dg-jends"><span class="dg-jend">Sold first: not charged, 1 pair at Broadway Chemist</span><span class="dg-jend">No confirmation in 10 minutes: not charged</span></div></div><div class="dg-jrow"><time>13:19</time><div class="dg-jstep"><b>Set aside and charged</b>The receipt carries the code K7Q2</div><div class="dg-jends"><span class="dg-jend">Can't make it: extend once, to Mon 16 Nov</span><span class="dg-jend">Not collected by Mon 9 Nov: refunded in full</span></div></div><div class="dg-jrow"><time>15:42</time><div class="dg-jstep"><b>Collect</b>The code opens full screen at the counter</div><div class="dg-jends"></div></div></div>

Jess, the second persona, finishes work after Rossi's Bakery closes. At lunchtime she buys a sourdough, and Rossi's drops it at a newsagent open until 11pm.

Evidence: [prototype](../deliver/prototype.md), [app flow](../develop/ideation/app-flow.md).

## The model

Four objects, and the item isn't one of them: small shops have no catalogue, so an item is words and a quantity inside a request.

<div class="dg dg-chain"><div class="dg-box"><b>Request</b>One chat, with a place and a deadline<div class="dg-list"><span><span class="dg-tag">2 × eclipse glasses · by 4pm</span></span></div></div><div class="dg-arrow">asks 6</div><div class="dg-box"><b>Shop</b>Connected, through its till, or asked, on WhatsApp</div><div class="dg-arrow">one each</div><div class="dg-box"><b>Answer</b>A card in the request's chat, with its source, a price and Buy</div><div class="dg-arrow">Buy</div><div class="dg-box"><b>Order</b>One shop, a collect-by date and a code</div></div>

Evidence: [conceptual model](../develop/design-system/conceptual-model.md).

## The agent

One ask opens two conversations. Every answer says where it came from, because a till's stock and a shopkeeper's yes are different promises, and Snuffle never decides for the shopper.

<div class="dg dg-convos"><div class="dg-convo"><b>Shopper and Snuffle, in the app</b><div class="dg-msg is-me">Eclipse glasses, 2 pairs, before 4pm</div><div class="dg-msg">Got it: 2 pairs within 15 minutes of you, by 4pm. Will you collect them, or should I check delivery too?</div><div class="dg-msg">I'm asking 6 shops on 5 streets near you. You can leave the app; I'll tell you as they answer.</div><div class="dg-msg is-card"><span class="dg-tag">Till</span>Broadway Chemist · In stock now · 1 at £9.50</div><div class="dg-msg is-card"><span class="dg-tag">WhatsApp</span>Paper &amp; Co · Has them · £14.99 · Buy</div></div><div class="dg-convo"><b>Snuffle and the shops, on WhatsApp or through the till</b><div class="dg-msg">Hi Ana, someone a 13-minute walk away needs 2 pairs of eclipse glasses by 4pm today. Do you have them? Reply 1 and your price, 2 No, 3 Something similar, or tell me how many you have.</div><div class="dg-msg is-shop">1 £14.99</div><div class="dg-msg is-sys">Broadway Chemist: stock read from the till, so nobody is asked</div></div></div>

The chat lines are the prototype's interface copy.

Evidence: [agent flow](../develop/ideation/agent-flow.md).

## The shop side

Shops have no interface to learn. Each state has the WhatsApp message the shop sees, and the shop's whole job is three replies.

<div class="dg"><div class="dg-chain"><div class="dg-box"><b>Asked</b>A template message about one item, with a deadline</div><div class="dg-arrow">replies <span>“1 £14.99”</span></div><div class="dg-box"><b>Bought</b>£29.98 authorised; set aside for K7Q2 within 10 minutes</div><div class="dg-arrow">replies <span>“done”</span></div><div class="dg-box"><b>Set aside and charged</b>Kept until the collect-by date</div><div class="dg-arrow">scans the code</div><div class="dg-box"><b>Collected</b>The buyer can rate the shop</div></div><div class="dg-cap">When it doesn't work out</div><div class="dg-cols"><div class="dg-box is-dashed"><b>No reply in 10 minutes</b><small>↳ from Asked</small>The row reads No reply; a late answer still counts as demand</div><div class="dg-box is-dashed"><b>Sold, or no “done” in time</b><small>↳ from Bought</small>The authorisation lapses and nobody is charged</div><div class="dg-box is-dashed"><b>Not collected by the date</b><small>↳ from Set aside</small>Cancelled, refunded, and back on sale</div></div></div>

Evidence: [shop request states](../develop/ideation/shop-states.md), [service blueprint](../define/blueprint.md).

## Built and designed only

<div class="dg dg-cols"><div class="dg-box"><b>Built in the prototype</b><ul><li>Sam's path from ask to code, with every failure path</li><li>Jess collecting after work</li><li>Shop pages with ratings</li><li>42 invented shops on real streets</li><li>iOS and Android, light and dark</li></ul></div><div class="dg-box is-dashed"><b>Designed only</b><ul><li>A weekly ask</li><li>A question when the quantity or deadline is missing</li><li>An ask outside the area</li><li>Failures after the charge</li><li>A reply in the shop's own words</li></ul></div></div>

Each feature, as a short clip, is on the next page: [features](features.md).
