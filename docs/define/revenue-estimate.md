# Revenue estimate

A basic projection of what Snuffle could earn a month and a year in London and in the UK, built from public benchmarks. It follows the three sources in [Revenue](revenue.md): payments in the app, shops that join the provider's POS because of the app, and promotion. There is no commission. These are estimates to frame the opportunity and to show which inputs matter, not forecasts.

```summary
Takeaways:
- In the base case the UK reaches about 3,200 active shops, 125,000 monthly buyers and £40m of GMV a year, and earns about £1.0m a year. London alone earns about £170,000.
- Payments in the app are the smallest part at this scale: about £3 of net revenue per buyer a year. Shops that join the POS (their counter sales and subscription) are the largest source, then payments, then promotion.
- The UK base case is close to my assumed cost of a small team, £1.0m a year. It needs roughly 3,300 active shops and 128,000 monthly buyers. London alone does not cover it in any scenario but the optimistic one.
- The input that moves the result most is the share of shops that join and stay active, then installs and the net take rate.
Call:
- I asked for a basic revenue estimate from benchmarks: how many shops, what conversion, how many items, what take rate, and what revenue a month and a year.
- I kept the scenario from Revenue: no commission, a payment provider with its own POS, and revenue from payments, new shops on the network and promotion.
- I set the cost to cover as one assumed figure, £1.0m a year, and left the break-even to be read against it.
AI:
- An agent searched public sources, read the ones it could open, ran the model and wrote the page. Where it could not open a source or find a figure, the input is marked as an assumption with how it was chosen.
- I review every assumption and can change it; the model is one short script, so a change reruns in seconds.
Trade-offs:
- The shopper and shop sides are modelled separately, so the numbers do not check that each shop gets the orders the buyers imply. The base case works out at about 58 orders per shop a month, which I judge plausible and have not tested.
- Counting shops that join the POS as revenue depends on how much of the joining the app causes. I set that share by scenario (30%, 50%, 70%) because no source exists for it.
```

## Method

The model describes a steady state, about three years after launch, in a market where the provider already has a POS network. It runs once for London and once for the UK, in three scenarios.

- Shops: the number of independent shops in the prototype's categories, times the share that are active on Snuffle.
- Shoppers: installs as a share of the population, then monthly active users, then buyers, then orders and items.
- Revenue: the net share of GMV the provider keeps on app payments, the counter sales and subscription of shops new to the provider's POS, and promoted slots.

Every input is an assumption with a basis. Where a public figure anchors it, the source is in the table and in [Sources](#sources). I could not open some primary reports, so those anchors come from search summaries and are flagged.

## Funnel

The first block counts shops, the second shoppers, the third money. Conservative, base and optimistic are the three scenario values. Items cost £6 each in every scenario, so the average order value follows from items per order.

| Step | Conservative | Base | Optimistic | Basis |
| --- | --- | --- | --- | --- |
| Retail enterprises, UK | 213,000 | 213,000 | 213,000 | ONS, March 2025 snapshot, VAT and PAYE based |
| Share in the prototype's categories (food specialists, florists, hardware) | 15% | 15% | 15% | Assumption. I chose it by eye from the categories in the prototype; ONS gives no split by category in the pages I could open |
| Addressable shops, UK | 31,950 | 31,950 | 31,950 | 213,000 × 15% |
| Addressable shops, London | 6,294 | 6,294 | 6,294 | London is 19.7% of UK businesses (ONS), used as a proxy for London's share of retail. Assumption: London's real share of this retail count may differ |
| Share of addressable shops active on Snuffle | 5% | 10% | 20% | Assumption. For scale: Too Good To Go reported more than 26,000 UK business partners in 2024, and that count includes branches of chains |
| Of those, share new to the provider's POS | 15% | 25% | 35% | Assumption. H13 passes at 2 of the first 5 offered shops |
| Share of that joining caused by the app | 30% | 50% | 70% | Assumption. No source; this is the number I trust least |
| Installs, as share of population | 1% | 3% | 6% | Assumption. For scale: Deliveroo's 4.1m UK and Ireland monthly active consumers are about 6% of UK population; Too Good To Go reports more than 7m UK users, about 10% (undated) |
| Monthly active users, as share of installs | 10% | 15% | 25% | Assumption. Shopping apps keep about 4–9% of users at day 30, which is a lower bound for a monthly figure |
| Buyers, as share of monthly active users | 30% | 40% | 50% | Assumption |
| Orders per buyer per month | 1.0 | 1.5 | 2.5 | Assumption. Ceiling: Deliveroo's 3.5 orders a month per active consumer for takeaway |
| Items per order | 2 | 3 | 4 | Assumption |
| Average order value | £12 | £18 | £24 | Items × £6. For scale: £7.75 average basket in ACS convenience stores (2023); £27.6 per Deliveroo order in the UK and Ireland (2024) |
| Net take rate on app payments | 0.6% | 0.9% | 1.2% | See [take rate](#take-rate) |
| Counter card turnover of a new POS shop, per year | £80,000 | £120,000 | £160,000 | Assumption. The PSR found 93.7% of acquired merchants take under £380,000 a year in card turnover |
| POS subscription per new shop, per month | £0 | £10 | £19 | Anchors: £0 a month on Teya's Start plan; £19 a month for SumUp Payments Plus. Base is my blended guess |
| Shops buying a promoted slot | 3% | 8% | 15% | Assumption. H15 passes at 2 of 10 shops, or 20% |
| Price per promoted week | £10 | £20 | £30 | Assumption. For scale: Deliveroo's ad run-rate was £77m in late 2023, roughly 1% of its GTV |
| Weeks a buying shop promotes, per year | 26 | 26 | 26 | Assumption |

### Take rate

A UK small merchant pays a blended rate of about 1.5–1.75% on card payments: SumUp lists 1.69%, Square 1.75% and Teya 1.59% on consumer cards, and Teya's Essential machine page shows 1.49%. Teya quotes individual rates and publishes no standard price list. The PSR found about 98% of small and medium merchants on standard (blended) pricing.

The provider keeps less than that. Interchange on UK consumer cards is capped at 0.2% for debit and 0.3% for credit. Scheme fees were 0.14% according to BRC member data quoted by the PSR. Processing, fraud, support and risk cost more; I assume 0.2–0.5% of GMV. That leaves 0.6–1.2%, so I use 0.9% in the base case. Adyen's net revenue is about 0.17% of volume (H2 2025), which is what a large enterprise processor keeps and a floor for comparison, not an SME rate.

## Scenarios

Revenue is net revenue to the provider, per year unless marked. GMV is the value of orders paid in the app. "New shops" is the app's share of counter-sales margin and subscription from shops that joined the POS.

| | London conservative | London base | London optimistic | UK conservative | UK base | UK optimistic |
| --- | --- | --- | --- | --- | --- | --- |
| Active shops | 315 | 629 | 1,259 | 1,598 | 3,195 | 6,390 |
| Installs | 89,500 | 268,500 | 537,000 | 693,000 | 2.08m | 4.16m |
| Monthly active users | 9,000 | 40,300 | 134,000 | 69,300 | 312,000 | 1.04m |
| Monthly buyers | 2,700 | 16,100 | 67,100 | 20,800 | 125,000 | 520,000 |
| Orders a month | 2,700 | 24,200 | 168,000 | 20,800 | 187,000 | 1.30m |
| GMV a month | £32,000 | £435,000 | £4.03m | £249,000 | £3.37m | £31.2m |
| GMV a year | £0.39m | £5.2m | £48.3m | £3.0m | £40.4m | £374m |
| Payments revenue | £2,000 | £47,000 | £580,000 | £18,000 | £364,000 | £4.49m |
| New shops revenue | £7,000 | £94,000 | £662,000 | £35,000 | £479,000 | £3.36m |
| Promotion revenue | £2,000 | £26,000 | £147,000 | £12,000 | £133,000 | £748,000 |
| Total a year | £12,000 | £168,000 | £1.39m | £65,000 | £976,000 | £8.60m |
| Total a month | £1,000 | £14,000 | £116,000 | £5,000 | £81,000 | £717,000 |
| Against £1.0m a year of cost | -£988,000 | -£832,000 | +£390,000 | -£935,000 | -£24,000 | +£7.6m |

Two checks against public figures. The base UK GMV of £40m is about 0.9% of Deliveroo's £4.5bn in the UK and Ireland (162.8m orders at £27.6, 2024). Promotion comes to 0.3–0.6% of GMV in the base case, below the roughly 1% Deliveroo earns from advertising.

## Break-even

I assume a small product team and its running costs at £1.0m a year: about eight people (product, design, engineering, data, shop onboarding) at a fully loaded £85,000, so £680,000, plus £150,000 for infrastructure, payments operations and support, plus £170,000 for tools and acquiring the first shoppers. The figure is mine and unsourced.

At base-case unit economics, the UK covers £1.0m with about 3,300 active shops, 128,000 monthly buyers and 320,000 monthly active users. At £0.6m of cost the need drops to about 2,000 shops and 77,000 buyers; at £1.5m it rises to about 4,900 shops and 192,000 buyers.

London alone would need about six times its base-case activity to cover £1.0m, around 3,800 active shops, which is more than half of the 6,294 addressable ones. London works as the launch market and as a proof of concept; it does not by itself pay for the product.

## Sensitivity

I moved one input at a time in the UK base case to its conservative and then its optimistic value and looked at the change in total revenue.

| Input | Conservative | Optimistic |
| --- | --- | --- |
| Share of shops active | -31% | +63% |
| Installs as share of population | -25% | +37% |
| Net take rate | -27% | +27% |
| Monthly active users, share of installs | -12% | +25% |
| Orders per buyer | -12% | +25% |
| Items per order | -12% | +12% |

The share of addressable shops that join and stay active moves the result most, because shops drive both promotion and the counter-sales revenue. Installs and the take rate come next. Subscription price, promotion price and weeks promoted each move the total by less than 10%.

## Reading these numbers

These are order-of-magnitude estimates for framing the opportunity. They are not forecasts, and the range between conservative and optimistic is about 130 times in the UK. The inputs I have the least evidence for are the share of shops active, the share of the app's joining that it causes, and the shopper funnel; the proof of concept in [Hypotheses](hypotheses.md) (H12 to H16) is what would replace those with data.

## Sources

- ONS, [UK business: activity, size and location, 2025](https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/bulletins/ukbusinessactivitysizeandlocation/2025): retail 213,000 and accommodation and food services 177,000 VAT and PAYE based businesses; London 538,000 businesses, 19.7% of the UK. Rounded in the release.
- Department for Business and Trade, [Business population estimates 2025](https://www.gov.uk/government/statistics/business-population-estimates-2025/business-population-estimates-for-the-uk-and-regions-2025-statistical-release): 5.69m UK private sector businesses, 547,000 SMEs in wholesale and retail. A separate figure of 304,560 retail businesses appears in the [House of Commons Library briefing on the retail industry](https://researchbriefings.files.parliament.uk/documents/SN06186/SN06186.pdf); I saw it only in a search summary, so I did not use it.
- Greater London Authority [demography data](https://data.london.gov.uk/demography): 8.95m for London (mid-2023, seen in a search summary). ONS [mid-2024 UK population estimates](https://www.gov.uk/government/statistics/population-estimates-for-the-uk-england-wales-scotland-and-northern-ireland-mid-2024): 69.3m, as reported in the press; I did not open the release.
- Payment Systems Regulator, [card-acquiring market review, final report (November 2021)](https://www.psr.org.uk/media/p1tlg0iw/psr-card-acquiring-market-review-final-report-november-2021.pdf): about 98% of small and medium merchants on standard pricing; 93.7% of acquired merchants under £380,000 turnover; scheme fees at 0.14% (BRC data).
- Osborne Clarke, [The Interchange Fee Regulation: the fee cap is now in force](https://www.osborneclarke.com/insights/the-interchange-fee-regulation-the-fee-cap-is-now-in-force): UK interchange caps of 0.2% for debit and 0.3% for credit consumer cards (seen in a search summary).
- SumUp, [best card readers for UK small businesses](https://www.sumup.com/en-gb/compare/best-card-readers/): SumUp 1.69% and £19 a month for Payments Plus, Square 1.75%, Teya 1.59% and £0 a month on Start. A competitor's page, so treat it as marketing. Teya, [Essential card machine](https://teya.com/shop/essential-card-machine): 1.49%. Teya, [pricing](https://www.teya.com/pricing): rates quoted individually.
- Adyen, [H2 2025 results](https://www.adyen.com/press-and-media/adyen-publishes-h2-2025-financial-results-3pgu2): net revenue €1,270.7m on €745.3bn of volume, about 17 basis points.
- Deliveroo, [Q4 2024 trading update](https://corporate.deliveroo.co.uk/assets/2317/3700/9446/Deliveroo_Q4_2024_Trading_Update_RNS_vFINAL.pdf): UK and Ireland 162.8m orders and £27.6 per order in 2024; 4.1m monthly active consumers in Q4 2024; group order frequency 3.5 a month. Statista, [Deliveroo ad revenue](https://fr.statista.com/statistics/1208634/deliveroo-ad-revenue/): £77m run-rate in late 2023 (seen in a search summary). The 1% of GTV is my division against group GTV of about £7bn.
- Too Good To Go UK, [press release on 40 million bags](https://www.toogoodtogo.com/en-gb/press/40-million): 26,000 or more UK business partners in a 2024 announcement (seen in a search summary). IGD, [Too Good To Go profile](https://www.igd.com/articles/too-good-to-go): more than 7m UK users, undated.
- App retention: Braze, [mobile app retention](https://www.braze.com/resources/articles/mobile-app-retention) (shopping at 4.0–4.6% at day 30, citing Business of Apps and AppsFlyer data) and Phiture, [retention benchmarks](https://phiture.com/mobilegrowthstack/managing-retention-rate-benchmarks-and-expectations/) (marketplaces at 8–9%). I did not reach the Adjust or AppsFlyer reports themselves.
- ACS, [research](https://www.acs.org.uk/research): average convenience basket of £7.75 in the 2023 Local Shop Report (seen in a search summary).

I found no source for how many independents there are in the prototype's categories, for items per order at independents, for Snuffle-style order frequency, for the price or uptake of a promoted slot at a small shop, or for Teya's POS subscription price. Those are assumptions, chosen as the table says.
