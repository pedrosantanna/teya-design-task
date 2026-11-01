# Método em detalhe

O codebook, como os dois etiquetadores se compararam, como as divergências foram resolvidas, e as etiquetas e pontuações de cada post.

**O que "codificação" quer dizer aqui.** É o termo da pesquisa qualitativa para etiquetagem: ler cada post e dar a ele etiquetas de uma lista fixa, como "item específico" ou "não conseguiu saber". Não tem nada a ver com programação. A lista de etiquetas e a regra de cada uma é o codebook. Um "etiquetador" (coder) é quem aplica o codebook; aqui, dois agentes de IA. A versão curta está em [método](method.md).

## Codebook, as etiquetas e suas regras

A unidade é um post público. Um post só é etiquetado se descreve as compras da própria pessoa que postou: uma ocasião específica ou um hábito dela. Opiniões sobre outras pessoas ou sobre a rua, conteúdo escrito por ou para um negócio e posts que não são sobre compras ficam de fora.

| Campo | Valores |
| --- | --- |
| Tarefa (job) | **specific**: um item, loja ou serviço em particular · **routine**: compras e serviços regulares · **discovery**: passeando, achados, nenhum item em mente |
| Urgente (urgent) | **yes** se o post menciona um prazo ou pressão de tempo, senão **no** |
| Onde deu errado (failure) | **information**: não conseguiu saber, ou foi mal informado, sobre estoque, horário ou quem vende · **access**: horários que não encaixam, deslocamento, estacionamento, velocidade de entrega, pagamento · **availability**: o item, a loja ou uma oferta que valesse a pena não estava lá · **value**: preço ou qualidade que não valem a pena · **none** |
| Postura (stance) | **persists**: continuou usando o comércio local apesar de um custo mencionado · **defects**: passou para o online, uma rede ou um supermercado, ou parou de ir · **unknown** |

**Regras de desempate:**

1. Onde deu errado = a causa raiz. Um açougue fechado que obriga a uma ida mais longa é availability, não access.
2. Conta o post inteiro, não só o trecho mostrado.
3. Persists exige um custo mencionado no post. Um hábito leal sem custo continua unknown.

## Dois etiquetadores, etiquetando separadamente

Um agente etiquetou primeiro. Um segundo agente depois etiquetou os mesmos 44 posts só a partir do codebook, sem ver os primeiros códigos. Concordância antes da reconciliação:

<!-- generated:agreement -->
| Campo | Posts comparados | Concordância | Kappa de Cohen |
| --- | --- | --- | --- |
| include | 44 | 41/44 (93%) | 0.85 |
| job | 27 | 26/27 (96%) | 0.93 |
| urgent | 27 | 26/27 (96%) | 0.92 |
| failure | 27 | 24/27 (89%) | 0.85 |
| stance | 27 | 20/27 (74%) | 0.55 |
<!-- /generated:agreement -->

O kappa corrige a concordância pelo acaso. Acima de 0,8 costuma ser lido como forte e 0,4–0,6 como moderado. A postura é o campo fraco: a maioria dos posts não diz o que a pessoa fez depois.

## Como as divergências foram resolvidas

<!-- generated:resolutions -->
| Post | Resolvido como | Por quê |
| --- | --- | --- |
| [u/jamesshovlin](https://www.reddit.com/r/london/comments/1vk3h8e/comment/p2tb0s2/) | specific, none, unknown | Agreed with coder B: the search worked through the WhatsApp group, so nothing broke. |
| [Valentando](https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977465) | routine, information, persists | Kept persists: the same post says they buy there every week, after the visit when it was shut. |
| [u/Miraclefish](https://www.reddit.com/r/london/comments/1ueg96t/comment/otjhcgo/) | specific, availability, unknown | Kept urgent: the full post is about getting an AC the same day in the heatwave. |
| [u/killmetruck](https://www.reddit.com/r/london/comments/1tz5j3p/comment/oq967k5/) | routine, access, defects | Kept defects: for routine shopping they use the supermarket; the butcher is for anniversaries only. |
| [u/Inge_Jones](https://www.reddit.com/r/Ealing/comments/1x3g7ci/comment/pfbvje4/) | routine, none, unknown | Agreed with coder B: no cost is stated, so loyalty can't be coded as persists. |
| [u/mjfh2](https://www.reddit.com/r/london/comments/1niwnlw/comment/nemvjcy/) | routine, availability, persists | Kept availability: the root cause is the butcher closing; the trip to Chiswick follows from it. |
| [u/Accomplished-Pen2660](https://www.reddit.com/r/Ealing/comments/1ug10pv/comment/oty3pvk/) | excluído | Agreed with coder B: opinion about the street. |
| [u/Vermathorax](https://www.reddit.com/r/london/comments/1tz5j3p/comment/oq989gy/) | routine, none, persists | Kept persists: the full post says the butcher is a bit more expensive and they still choose it. |
| [u/rising_then_falling](https://www.reddit.com/r/london/comments/1niwnlw/comment/nema5k6/) | routine, none, unknown | Agreed with coder B: no cost is stated. |
| [u/Peppy_Tomato](https://www.reddit.com/r/AskUK/comments/1rn7npv/comment/o94plrm/) | routine, none, unknown | Kept unknown: choosing supermarket click and collect is not switching away from local shops. |
| [u/Aggravating-Desk4004](https://www.reddit.com/r/Ealing/comments/1xjkdgb/) | routine, availability, unknown | Agreed with coder B on stance: buying something each visit is a habit, not a cost. Kept availability for the lost post offices. |
| [@hollygardnerx](https://www.tiktok.com/@hollygardnerx/video/7578215485968354582) | excluído | Agreed with coder B: creator content that promotes a place is excluído, as the codebook says. |
| [@tafsonthemove](https://www.tiktok.com/@tafsonthemove/video/7503202705293266198) | excluído | Agreed with coder B: creator content that promotes a place is excluído. |
| [u/Username8831](https://www.reddit.com/r/Ealing/comments/1v6423y/comment/oznttbd/) | specific, value, defects | Agreed with coder B: a one-off visit to a bike workshop is a specific service, not routine. |
<!-- /generated:resolutions -->

## Cada post etiquetado

<!-- generated:coding -->
| Post | Date | Job | Urgent | Failure | Stance | Urgency | Failure score | Grupo | Why |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [u/moanyjoany](https://www.reddit.com/r/Ealing/comments/1vlcuor/comment/p30r2af/) | 2026-08-11 | specific | yes | availability | persists | 10 | 6 | Sam | Tried two shops for eclipse glasses; both sold out. |
| [u/Mediocre_Sprinkles](https://www.reddit.com/r/CasualUK/comments/1n23ixq/comment/nb2z980/) | 2025-08-28 | specific | yes | availability | defects | 10 | 6 | Sam | 'In a pinch', every shop, nothing; paid parking; buys on Amazon. |
| [u/Miraclefish](https://www.reddit.com/r/london/comments/1ueg96t/comment/otjhcgo/) | 2026-06-24 | specific | yes | availability | unknown | 10 | 6 | Sam | Shops out of stock in the heatwave; online 2+ weeks. |
| [u/xmastreee](https://www.reddit.com/r/CasualUK/comments/1n23ixq/comment/nb31nms/) | 2025-08-28 | specific | yes | availability | unknown | 10 | 6 | Sam | Hardware shop had nothing in stock; says he'd have paid the premium. Outcome not stated. |
| [u/jamesshovlin](https://www.reddit.com/r/london/comments/1vk3h8e/comment/p2tdld2/) | 2026-08-10 | specific | yes | information | unknown | 10 | 9 | Sam | Eclipse glasses before the eclipse; says stock can't be known without visiting or phoning. |
| [u/akat224](https://www.reddit.com/r/london/comments/1ueg96t/) | 2026-06-24 | specific | yes | information | unknown | 10 | 9 | Sam | Needs a portable AC 'asap'; asks which places have it in stock. |
| [Dbank](https://www.mumsnet.com/talk/_chat/5509007-do-you-still-enjoy-shopping-on-the-high-street-or-mostly-online?reply=151334565) | 2026-03-27 | specific | no | information | defects | 7 | 9 | Sam | Website listed 7 in stock, shop had none; bought on Amazon. |
| [u/dy14n19](https://www.reddit.com/r/HammersmithandFulham/comments/1myug4c/) | 2025-08-24 | specific | no | information | unknown | 7 | 9 | Sam | Google says the patisserie is closed and they don't trust it. |
| [@Jojo_agboola](https://x.com/Jojo_agboola/status/2112618905525276980) | 2026-10-20 | specific | no | information | unknown | 7 | 9 | Sam | Asks X's AI chatbot which walk-in store stocks a fragrance. |
| [u/grand_web](https://www.reddit.com/r/chiswick/comments/1vlibmn/) | 2026-08-11 | specific | yes | information | unknown | 10 | 9 | Sam | Last minute; asks which stores nearby sell eclipse glasses. |
| [u/claudiav2603](https://www.reddit.com/r/london/comments/1vk3h8e/comment/p2y26dy/) | 2026-08-11 | specific | yes | information | unknown | 10 | 9 | Sam | Asks which store near Hammersmith has eclipse glasses, the day before. |
| [LividArse](https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977221) | 2025-12-05 | routine | no | access | defects | 4 | 1 | Jess | Independents not consistently open; ends up at McDonald's and Amazon. |
| [FerrisWheelsandLilacs](https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148976658) | 2025-12-05 | routine | no | access | unknown | 4 | 1 | Jess | States her own rule: pays more locally if convenient, won't jump through hoops. No behaviour shown. |
| [u/killmetruck](https://www.reddit.com/r/london/comments/1tz5j3p/comment/oq967k5/) | 2026-06-07 | routine | no | access | defects | 4 | 1 | Jess | Butcher open office hours only and double the price; supermarket for the week, butcher for anniversaries. |
| [u/rsweb](https://www.reddit.com/r/AskUK/comments/1my0t02/comment/na8v8ju/) | 2025-08-23 | routine | no | access | unknown | 4 | 1 | Jess | Doesn't carry cash, so cash-only stalls don't work for them. |
| [u/WearyChampionship365](https://www.reddit.com/r/Ealing/comments/1vlc46x/comment/p30rnx7/) | 2026-08-11 | specific | yes | access | unknown | 10 | 1 | Jess | Online can't deliver before the deadline. |
| [u/Username8831](https://www.reddit.com/r/Ealing/comments/1v6423y/comment/oznttbd/) | 2026-07-25 | specific | no | value | defects | 7 | 4 | Jess | Used the bike workshop once; thought it too expensive. |
| [@London_W4](https://x.com/London_W4/status/2102723893463044506) | 2026-09-23 | discovery | no | availability | unknown | 1 | 6 | Ruth | Walked the length of King Street; found it depressing. |
| [u/mjfh2](https://www.reddit.com/r/london/comments/1niwnlw/comment/nemvjcy/) | 2025-09-17 | routine | no | availability | persists | 4 | 6 | Ruth | Local butcher gone; now has to go to Chiswick, 'a pain'. |
| [u/Aggravating-Desk4004](https://www.reddit.com/r/Ealing/comments/1xjkdgb/) | 2026-10-31 | routine | no | availability | unknown | 4 | 6 | Ruth | Post offices lost; always buys something at the newsagent counter that remains. |
| [Valentando](https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977465) | 2025-12-05 | routine | no | information | persists | 4 | 9 | Ruth | Weekly butcher shut during its advertised hours; keeps buying there. |
| [Kenjenny](https://www.mumsnet.com/talk/_chat/5509007-do-you-still-enjoy-shopping-on-the-high-street-or-mostly-online?reply=151334270) | 2026-03-27 | discovery | no | none | defects | – | – | Nada deu errado (fora dos clusters) | Lives near Oxford Street but can't remember last going clothes shopping there. |
| [u/Inge_Jones](https://www.reddit.com/r/Ealing/comments/1x3g7ci/comment/pfbvje4/) | 2026-10-11 | routine | no | none | unknown | – | – | Nada deu errado (fora dos clusters) | Eats a local restaurant's food often via Deliveroo to keep it afloat. |
| [u/Vermathorax](https://www.reddit.com/r/london/comments/1tz5j3p/comment/oq989gy/) | 2026-06-07 | routine | no | none | persists | – | – | Nada deu errado (fora dos clusters) | Chooses the butcher: better quality, accommodates special requests. |
| [u/rising_then_falling](https://www.reddit.com/r/london/comments/1niwnlw/comment/nema5k6/) | 2025-09-17 | routine | no | none | unknown | – | – | Nada deu errado (fora dos clusters) | 'My local guy will cut any bit of meat you ask for.' |
| [u/Peppy_Tomato](https://www.reddit.com/r/AskUK/comments/1rn7npv/comment/o94plrm/) | 2026-03-07 | routine | no | none | unknown | – | – | Nada deu errado (fora dos clusters) | Chooses click and collect for control over timing; describes no failure. |
| [u/jamesshovlin](https://www.reddit.com/r/london/comments/1vk3h8e/comment/p2tb0s2/) | 2026-08-10 | specific | yes | none | unknown | – | – | Nada deu errado (fora dos clusters) | Same hunt; shares a shop's stock count and a WhatsApp restock group to fill the information gap. |
<!-- /generated:coding -->

### Deixados de fora

<!-- generated:excluded -->
| Post | Por que ficou de fora |
| --- | --- |
| [Agix](https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148976563) | Generalises about shops' hours and other people; no behaviour of the poster's own. |
| [u/Outside-Assignment85](https://www.reddit.com/r/london/comments/1vr9i0n/comment/p4brlc4/) | Advises a visitor about King Street; opinion about the street, no own shopping described. |
| [u/No_Witness9533](https://www.reddit.com/r/london/comments/1vr9i0n/comment/p4bxk0e/) | Advises a visitor about Hammersmith; opinion about the street. |
| [u/JollyExPat](https://www.reddit.com/r/london/comments/1tatyc0/comment/olc54ib/) | Recommends Chiswick as a high street; opinion, no own shopping. |
| [u/abitofasitdown](https://www.reddit.com/r/london/comments/1niwnlw/) | Laments Kew losing its butcher; opinion about the street. |
| [u/Accomplished-Pen2660](https://www.reddit.com/r/Ealing/comments/1ug10pv/comment/oty3pvk/) | Describes how the street changed, not the poster's own shopping. |
| [u/squeakyeggs](https://www.reddit.com/r/Ealing/comments/1vhe1k8/comment/p7t14xd/) | Written by a former shop owner's son. |
| [u/sd_1874](https://www.reddit.com/r/london/comments/1ukfwni/comment/ouvf2m5/) | Opinion on chains, no shopping behaviour. |
| [u/Rhubarbatross](https://www.reddit.com/r/london/comments/1pvd92z/comment/nvw7a0u/) | About the bridge and traffic. |
| [u/anonypanda](https://www.reddit.com/r/london/comments/1uke914/comment/ouyun00/) | About the bridge and traffic. |
| [@OpenChiswickW4](https://x.com/OpenChiswickW4/status/2069295025561760040) | Opinion about what other people should do. |
| [@loveandlondon](https://www.tiktok.com/@loveandlondon/video/7509933373075492118) | Creator guide promoting a place as content. |
| [@hollygardnerx](https://www.tiktok.com/@hollygardnerx/video/7578215485968354582) | Creator content promoting a shop. |
| [@tafsonthemove](https://www.tiktok.com/@tafsonthemove/video/7503202705293266198) | Creator content promoting a stall. |
| [@stillshipping](https://www.tiktok.com/@stillshipping/video/7693511674925518102) | Market commentary, not the poster's own shopping. |
| [@hackneyfleamarket](https://www.tiktok.com/@hackneyfleamarket/video/7689755751471959318) | Written by the market organiser. |
| [u/Greg-Normal](https://www.reddit.com/r/london/comments/1niwnlw/comment/neo7ha3/) | Scolds other people; no own behaviour. |
<!-- /generated:excluded -->

## Códigos por tarefa e falha

<!-- generated:grid -->
```occasion-grid
{"rows": [{"id": "specific", "label": "Specific item or shop"}, {"id": "routine", "label": "Routine shopping and services"}, {"id": "discovery", "label": "Discovery and browsing"}], "cols": [{"id": "information", "label": "Information", "maps": "findability"}, {"id": "access", "label": "Access", "maps": "transaction"}, {"id": "availability", "label": "Availability", "maps": "the street's offer"}, {"id": "value", "label": "Value", "maps": "the street's offer"}, {"id": "none", "label": "No failure", "maps": ""}], "groups": {"mission": "Sam, the mission shopper", "lapsed": "Jess, the lapsed local", "regular": "Ruth, the regular", "worked": "Nothing broke (not clustered)"}, "cells": [{"row": "specific", "col": "information", "posts": [{"h": "u/jamesshovlin", "s": "unknown", "g": "mission", "u": true}, {"h": "u/akat224", "s": "unknown", "g": "mission", "u": true}, {"h": "Dbank", "s": "defects", "g": "mission", "u": false}, {"h": "u/dy14n19", "s": "unknown", "g": "mission", "u": false}, {"h": "@Jojo_agboola", "s": "unknown", "g": "mission", "u": false}, {"h": "u/grand_web", "s": "unknown", "g": "mission", "u": true}, {"h": "u/claudiav2603", "s": "unknown", "g": "mission", "u": true}]}, {"row": "specific", "col": "access", "posts": [{"h": "u/WearyChampionship365", "s": "unknown", "g": "lapsed", "u": true}]}, {"row": "specific", "col": "availability", "posts": [{"h": "u/moanyjoany", "s": "persists", "g": "mission", "u": true}, {"h": "u/Mediocre_Sprinkles", "s": "defects", "g": "mission", "u": true}, {"h": "u/Miraclefish", "s": "unknown", "g": "mission", "u": true}, {"h": "u/xmastreee", "s": "unknown", "g": "mission", "u": true}]}, {"row": "specific", "col": "value", "posts": [{"h": "u/Username8831", "s": "defects", "g": "lapsed", "u": false}]}, {"row": "specific", "col": "none", "posts": [{"h": "u/jamesshovlin", "s": "unknown", "g": "worked", "u": true}]}, {"row": "routine", "col": "information", "posts": [{"h": "Valentando", "s": "persists", "g": "regular", "u": false}]}, {"row": "routine", "col": "access", "posts": [{"h": "LividArse", "s": "defects", "g": "lapsed", "u": false}, {"h": "FerrisWheelsandLilacs", "s": "unknown", "g": "lapsed", "u": false}, {"h": "u/killmetruck", "s": "defects", "g": "lapsed", "u": false}, {"h": "u/rsweb", "s": "unknown", "g": "lapsed", "u": false}]}, {"row": "routine", "col": "availability", "posts": [{"h": "u/mjfh2", "s": "persists", "g": "regular", "u": false}, {"h": "u/Aggravating-Desk4004", "s": "unknown", "g": "regular", "u": false}]}, {"row": "routine", "col": "none", "posts": [{"h": "u/Inge_Jones", "s": "unknown", "g": "worked", "u": false}, {"h": "u/Vermathorax", "s": "persists", "g": "worked", "u": false}, {"h": "u/rising_then_falling", "s": "unknown", "g": "worked", "u": false}, {"h": "u/Peppy_Tomato", "s": "unknown", "g": "worked", "u": false}]}, {"row": "discovery", "col": "availability", "posts": [{"h": "@London_W4", "s": "unknown", "g": "regular", "u": false}]}, {"row": "discovery", "col": "none", "posts": [{"h": "Kenjenny", "s": "defects", "g": "worked", "u": false}]}]}
```
<!-- /generated:grid -->

Arquivos de dados: `docs/discover/personas/coding-a.json` (primeiro etiquetador), `coding-b.json` (segundo etiquetador), `coding.json` (final). Rode `python3 scripts/build_personas.py` para reconstruir todas as tabelas e o mapa.
