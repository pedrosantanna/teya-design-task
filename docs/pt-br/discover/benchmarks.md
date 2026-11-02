# Benchmarks

Comparei dezessete produtos que um comprador em Londres pode usar hoje, ou que fracassaram recentemente de um jeito que ensina alguma coisa, e organizei todos pela relação com as três [proto-personas](personas/index.md). Onze tocam no que Sam, Jess ou Ruth enfrentam, ou são aquilo a que elas já recorrem. Seis são úteis para o brief de modo geral e ficam como notas curtas. Em todos eles, a reclamação que os usuários mais repetem é que o app disse que algo estava disponível e a loja não tinha.

Um agente levantou os produtos e as avaliações em paralelo com a netnografia, antes de as proto-personas existirem. Nada nesta página alimentou as personas, que saem só da clusterização dos posts de compradores. Organizei os produtos por persona depois, e por isso esta página vem depois delas.

```summary
Takeaways:
- Sam: o Google mostra estoque por perto só para lojas que lhe dão dados por item, e nenhum post o mostra achando estoque assim. Ele pergunta no Reddit e no WhatsApp, e em dois posts acaba recorrendo à Amazon.
- Jess: apps de entrega e o Peckish da Co-op já resolvem o problema de conseguir coisas de lojas locais, com comissão de 14–35% e uma loja por pedido. Um dos posts dela cita a Amazon como alternativa.
- A Teya já recebe pagamentos com cartão e manda links de pagamento para as lojas que a Jess usaria. Nada nas páginas públicas dela é voltado para quem compra.
- Ruth: nada foi feito para ela. Diretórios do que ainda está aberto em uma rua não duraram.
- A reclamação mais repetida, seja qual for o modelo, é ouvir que algo estava disponível quando não estava.
Call:
- Reorganizei os benchmarks em torno de Sam, Jess e Ruth. Na etapa Define vou escolher um problema para um comprador, e uma lista agrupada por categoria de produto não mostrava de quem é o problema que cada produto toca.
- Produtos que não tocam nos problemas das personas ficam na página como notas curtas, porque ainda respondem perguntas do brief (excedente, checkout com várias lojas, quick commerce, vitrines de comerciantes).
- Um ✓ precisa de um post das páginas de achados ou de personas. Sem post, a marca é ○.
AI:
- Um agente capturou as telas principais de oito apps no Mobbin, uma biblioteca de telas de apps. Elas ficam na minha cópia local, fora do repositório público, e aparecem no site com o link da fonte.
- Um agente de pesquisa escolheu os 17 produtos e coletou avaliações datadas do feed da App Store, do Trustpilot e do Mumsnet. Um agente de escrita buscou de novo as citações truncadas e descartou as que não conseguiu confirmar.
- Um agente reorganizou a página a partir das proto-personas e escreveu a tabela de personas e os padrões por persona. Cada ✓ indica o post que o sustenta, para que possa ser conferido.
Trade-offs:
- Os clusters de personas são pequenos (de 4 a 11 posts), então cada ✓ se apoia em um ou dois posts.
- Sites de avaliação tendem a concentrar reclamações, e não há Reddit nesta página. As taxas de comissão são as informadas por terceiros.
```

## Produtos por persona

✓ a persona usa hoje, com um post como evidência. ○ resolve o problema da persona, mas nenhum post mostra a persona usando. – não tem relação com o problema dela.

| Produto | Sam (1 · saber) | Jess (4 · levar) | Ruth (2 · encontrar) | Evidência do ✓ |
| --- | --- | --- | --- | --- |
| Google local listings + NearSt | ✓ | – | ○ | Sam: u/dy14n19 confere no Google o horário de uma confeitaria e não confia na informação |
| Instagram / WhatsApp / Facebook | ○ | – | ○ | |
| Amazon | ✓ | ✓ | – | Sam: Dbank e u/Mediocre_Sprinkles compram na Amazon depois de uma ida frustrada. Jess: LividArse "shop on Amazon" (compro na Amazon); u/WearyChampionship365 confere a Amazon antes de um prazo |
| Nextdoor | – | – | ○ | |
| ShopAppy e apps de BID | – | ○ | ○ | |
| Deliveroo | – | ○ | ○ | |
| Uber Eats | – | ○ | – | |
| Just Eat | – | ○ | – | |
| Co-op Peckish | – | ○ | – | |
| Gophr / Stuart | – | ○ | – | |
| Too Good To Go | – | – | – | |
| OLIO | – | – | – | |
| Shop app (Shopify) | – | – | – | |
| Etsy | – | – | – | |
| Bookshop.org / Hive | – | – | – | |
| Zapp / Zoom by Ocado | – | – | – | |
| Square Online / SumUp / Teya | – | ○ | – | |

Fora desses produtos, Sam pergunta no Reddit (u/akat224, u/grand_web, u/claudiav2603), liga antes (u/jamesshovlin), confere o site de uma rede antes de retirar (Dbank) e, uma vez, pergunta ao chatbot de IA do X qual loja tem um item (@Jojo_agboola). Jess usa o supermercado para as compras da semana (u/killmetruck). Ruth compra alguma coisa na banca de jornal que tem um balcão dos correios (u/Aggravating-Desk4004). A evidência está nos [achados](netnography/findings.md) e na [página de personas](personas/index.md).

## Seleção e fontes

Comecei pelo brief e mantive todo produto que atende alguém tentando comprar de uma loja próxima, mais dois fracassos recentes (ShopAppy e as start-ups de quick commerce). Acrescentei o Peckish da Co-op e a Hive, e deixei de fora a Faire porque ela vende no atacado para lojas.

As citações vêm de três fontes que podem ser lidas sem conta:

- **Avaliações da App Store do Reino Unido**, coletadas do feed público de avaliações da Apple, que traz autor, data e texto completo. As avaliações da App Store não têm link permanente, então cada card leva à página de avaliações do app no Reino Unido e o contexto traz o id da avaliação na Apple.
- **Trustpilot UK**, lido na página própria de cada avaliação.
- **Mumsnet**, lido na thread, com o id da resposta no link.

Todas as citações têm data entre 1º de maio de 2025 e 1º de novembro de 2026 e foram conferidas na fonte. As citações foram cortadas até as palavras essenciais, com "…" onde houve corte.

O Reddit bloqueou as ferramentas de pesquisa, e X, TikTok e Instagram exigem login, então esta página não tem citações dessas redes; a [netnografia](netnography/method.md) cobre o Reddit à parte. As vozes da App Store e do Mumsnet tendem a ser mais velhas e mais propensas a reclamar do que as do r/london. As avaliações da App Store cobrem todo o Reino Unido. NearSt, Peckish e ShopAppy não têm avaliações de consumidores no período, e nenhuma avaliação da Teya que encontrei menciona vendas online.

## Comparação

| Produto | Categoria | Como as pessoas encontram as coisas | Como a compra se resolve | Quem paga | Situação no Reino Unido |
| --- | --- | --- | --- | --- | --- |
| Google local listings + NearSt | Descoberta de estoque local | "Em estoque perto de você" por item no Search e no Maps, alimentado pelo site da loja, por um feed ou pelo caixa (por meio de parceiros como a NearSt) | Sem compra; o comprador vai até a loja ou clica para ir ao site dela. O Universal Cart do Google, com várias lojas, é só nos EUA | Listagens gratuitas; as lojas pagam a NearSt; o Google vende anúncios de estoque local | Ativo; a NearSt é de Londres |
| Instagram / WhatsApp / Facebook | Onde as lojas pequenas já vendem | Seguir e rolar a tela; sem horário ou estoque confiável | Uma conversa, depois transferência bancária, link de pagamento ou pagamento na loja | Gratuito para a loja | Em todo lugar |
| Amazon | A alternativa padrão | Busca enorme | Uma cesta com muitos vendedores; mercearia fresca com entrega no mesmo dia em partes de Londres desde junho de 2026 | Taxas dos vendedores; assinatura Prime | Ativo |
| Nextdoor | Rede de vizinhança | Recomendações de vizinhos e um hub "Local Faves", por negócio e não por item | Nenhuma; contato com o negócio | Anunciantes | Ativo |
| ShopAppy e apps de BID | Diretórios da cidade | Diretório de independentes por cidade | Click & collect, entregador, pagamento na retirada | Prefeituras e BIDs muitas vezes pagavam o primeiro ano | A ShopAppy encerrou as atividades em 2023; os apps de BID são programas de fidelidade |
| Deliveroo | Marketplace de entrega | Navegação por loja e categoria, busca, posicionamento pago | Uma loja por pedido; entregadores da Deliveroo | Comissão da loja (informada em 20–35%) mais taxas do comprador | Ativo; da DoorDash desde outubro de 2025 |
| Uber Eats | Marketplace de entrega | Navegação por loja, abas de mercado, busca | Uma loja por pedido no Reino Unido; pacotes com duas lojas existem nos EUA | Comissão da loja mais taxas do comprador | Ativo |
| Just Eat | Marketplace de entrega | Navegação por loja, seção "Shops" | Uma loja; entregadores próprios ou a loja entrega | Comissão (informada em ~14% se a loja entrega) mais taxas do comprador | Ativo; da Prosus desde outubro de 2025 |
| Co-op Peckish | Ferramenta de entrega para mercearias independentes | A vitrine própria de cada loja; não foi encontrada navegação compartilhada | Uma loja; a loja entrega, ou Uber Direct / Just Eat | A loja paga uma comissão menor (informada) | Lançado em fevereiro de 2025 |
| Gophr / Stuart | Entregadores no mesmo dia | Nenhuma; a loja agenda | Entregador da loja até a porta | A loja paga por serviço | Londres e outras cidades |
| Too Good To Go | Excedente de comida | Mapa de lojas próximas; "Surprise Bags", então sem busca por item | Uma loja; pré-pago; só retirada, em uma janela definida | A loja paga uma taxa anual e comissão por sacola | Ativo; fundado em Londres |
| OLIO | Compartilhamento gratuito | Mapa de itens gratuitos por perto | Gratuito; retirada combinada por chat | Parceiros do varejo pagam pelas coletas | Ativo |
| Shop app (Shopify) | Checkout com várias lojas | Seguir marcas e acompanhar pedidos; sem "perto de mim" | Até 15 lojas em um checkout Shop Pay desde outubro de 2026, cada loja continua sendo a vendedora; lojas Shopify oferecem retirada local e entrega | Assinatura da loja e taxas de pagamento | Data do checkout universal no Reino Unido não confirmada |
| Etsy | Marketplace de artesanato | Busca por palavra-chave, "Find similar", filtro por localização da loja | Uma cesta, pedidos e frete separados por loja; sem fluxo de retirada | Taxas de anúncio, transação e publicidade do vendedor | Ativo |
| Bookshop.org / Hive | Livros, com uma parte para lojas locais | Catálogo central baseado em ISBNs; o comprador indica uma loja local | Um depósito central envia o livro; a loja local recebe uma parte | Financiado pelo preço de capa | Ativo |
| Zapp / Zoom by Ocado | Quick commerce | Um catálogo curto e selecionado | Estoque e entregadores próprios, 20–60 minutos | Taxas do comprador e margem | Zoom em poucas áreas de cobertura; situação da Zapp incerta; Getir e Gorillas saíram em 2024 |
| Square Online / SumUp / Teya | Vitrines e pagamentos para comerciantes | Só o site próprio da loja | Uma loja; retirada ou entrega local feita pela loja | A loja paga taxas de processamento | Ativo |

## Produtos ligados às personas

### Google local listings e NearSt

**Sam ✓ (etapa 1, saber) · Ruth ○ (etapa 2, encontrar).** Sam usa o Google hoje: u/dy14n19 conferiu se uma confeitaria de Hammersmith ainda estava aberta e não confiou na resposta. Para Ruth é uma opção: o Google poderia avisar que uma loja fechou ou mudou de horário, mas o açougue que ela frequenta toda semana estava fechado no horário anunciado (Valentando), que é a mesma falha.

```screens
image: ../../../private/benchmarks/google-maps.jpg
source: https://mobbin.com/apps/google-maps-ios-84a5727c-9a4d-40f6-95ce-aa915413c4dc/c5414d91-2c38-4da8-8d6e-f4dc01be6602/screens
```

O Google mostra o que as lojas próximas têm "em estoque" no Search, no Shopping e no Maps, e o Business Profile é onde a maioria das pessoas confere horários de funcionamento. O Google obtém o estoque de uma loja de três jeitos. Pode marcar como disponíveis na loja física os produtos que a loja já lista online, usando o site e os dados de localização dela; a loja pode enviar um feed de estoque local à mão ou por API ([Google Merchant Center Help](https://support.google.com/merchants/answer/15609877?hl=en-GB)); ou um parceiro pode enviá-lo a partir do caixa. A NearSt, uma start-up de Londres, é um desses parceiros: conecta mais de 150 sistemas de ponto de venda ao Google e, desde 2025, aos feeds de estoque da Deliveroo, da Uber Eats e da Just Eat ([Asian Trader](https://www.asiantrader.biz/nearst-tech-connects-uber-eats-deliveroo-just-eat)). Todos os caminhos dependem de dados por item que a loja já mantém online ou no caixa. Não encontrei nenhum número sobre quantas lojas independentes pequenas têm esses dados. Minha suposição é que poucas padarias, floriculturas e açougues têm, porque o estoque delas muda todo dia e muitas vezes não tem códigos de produto; o número mais próximo é de 2019 e cobre todos os setores ([a high street hoje](high-street-landscape.md)). Nada é comprado no Google para estoque local: o comprador vai até a loja ou clica para ir ao site dela, e o novo Universal Cart do Google, com várias lojas, foi lançado só nos EUA, em 15 de outubro de 2026 ([Digital Commerce 360](https://www.digitalcommerce360.com/2026/10/16/google-universal-cart-launch-features/)).

```quote
text: "the opening times listed on Google have no basis in reality."
handle: zingally
network: Mumsnet · Am I Being Unreasonable
date: 2025-12-05
url: https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148978039
tags: google-local, opening-hours, negative
context: Thread sobre lojas independentes fechadas quando as listagens dizem que estão abertas.
status: verified
```

```quote
text: "…when you're searching for a category. When I'm looking for a flower store, I really don't need to know about local cake shops or nightclubs"
handle: user64946284
network: App Store (UK) · Google Maps
date: 2026-10-03
url: https://apps.apple.com/gb/app/id585027354?see-all=reviews
tags: google-maps, category-search, negative
context: Avaliação de 3 estrelas, id da avaliação na Apple 14622524493. Buscar por tipo de loja traz ruído.
status: verified
```

### Instagram, WhatsApp e Facebook

**Sam ○ (etapa 1, saber) · Ruth ○ (etapa 2, encontrar).** Os compradores usam o WhatsApp para compartilhar estoque: na corrida do eclipse, u/jamesshovlin indicou um grupo de reposição mantido por compradores. Esse post fica fora dos clusters de personas, então não conto como Sam usando hoje. Para Ruth, a página da loja no Facebook é onde o horário do dia às vezes aparece; nenhum post a mostra conferindo.

```screens
image: ../../../private/benchmarks/instagram.jpg
source: https://mobbin.com/apps/instagram-ios-3aa6c4a6-7200-43f0-81c2-397c22fa1596/c2173e91-816f-4b77-baa2-3579d4ce2b7e/screens
```

```screens
image: ../../../private/benchmarks/whatsapp.jpg
source: https://mobbin.com/apps/whats-app-ios-8738dbc9-e7a8-4fef-91e5-6afd1c9d092b/36ae4720-4bee-4257-85b3-80d5447e899d/screens
```

Para muitas floriculturas, padarias, açougues e butiques de Londres, o Instagram ou o Facebook é a vitrine, e os pedidos acontecem por mensagem ou telefone, com pagamento na loja, por transferência bancária ou por link de pagamento. Nada nesses canais é estruturado: não há horário, estoque, endereço ou preço confiável, e cada pedido é uma conversa. Eles são gratuitos e pessoais, e servem para compras avulsas e trabalhos sob encomenda. Duas pessoas numa mesma thread do Mumsnet dizem que as lojas publicam o horário do dia só no Facebook, ou não têm nenhuma forma de receber pedidos.

```quote
text: "He is a bookshop with no website, so I can't order books from him at home."
handle: Codyrhodesisaheel
network: Mumsnet · Am I Being Unreasonable
date: 2025-12-05
url: https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977812
tags: social-only-shops, no-transaction-rail, negative
context: A compradora quer comprar de uma loja independente local e não tem canal para isso.
status: verified
```

```quote
text: "Several more shops seem to rely on posting that days opening hours on their FB page"
handle: BeansAndNoodles
network: Mumsnet · Am I Being Unreasonable
date: 2025-12-05
url: https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves
tags: social-only-shops, opening-hours, negative
context: Post de abertura da thread.
status: verified
```

### Amazon

**Sam ✓ (etapa 1, saber) · Jess ✓ (etapa 4, levar).** Alguns posts dos dois terminam na Amazon. Sam: Dbank não encontrou nenhum dos sete que o site de uma loja listava e comprou na Amazon; u/Mediocre_Sprinkles percorreu todas as lojas e foi para casa encomendar. Jess: LividArse compra na Amazon "because it's always there" (porque está sempre lá). A Amazon também tem limites para eles: antes do eclipse, u/WearyChampionship365 descobriu que ninguém conseguia entregar a tempo.

```screens
image: ../../../private/benchmarks/amazon.jpg
source: https://mobbin.com/apps/amazon-shopping-ios-f3ecc40c-1f6d-4b81-8f5a-cb67d8271469/c06b306e-d93a-4ff9-b45f-14388ab02e16/screens
```

A Amazon é a régua com que um app de high street, a rua comercial do bairro, é medido: uma cesta, um pagamento, uma promessa de entrega e devolução fácil. Desde junho de 2026 ela inclui mercearia fresca na entrega no mesmo dia em partes do centro e do leste de Londres ([About Amazon](https://www.aboutamazon.co.uk/news/retail/amazon-customers-can-now-add-fresh-groceries-to-same-day-delivery-orders-in-parts-of-london)). Os avaliadores na App Store elogiam o preço e as devoluções e reclamam da busca quando não sabem exatamente o que querem. Alguns dizem que as promessas de entrega que não se cumprem estão fazendo essas pessoas voltarem à high street.

```quote
text: "I'd rather go to towns high streets now because even on prime and even when you pay same day delivery it still doesn't arrive."
handle: gidfles
network: App Store (UK) · Amazon Shopping
date: 2026-10-23
url: https://apps.apple.com/gb/app/id335187483?see-all=reviews
tags: amazon, same-day-reliability, high-street, negative
context: Avaliação de 1 estrela, id da avaliação na Apple 14702225618.
status: verified
```

```quote
text: "The app is good when you know what you want. When you don't; it's like asking a drunk for street directions."
handle: KJCM98...3
network: App Store (UK) · Amazon Shopping
date: 2026-10-22
url: https://apps.apple.com/gb/app/id335187483?see-all=reviews
tags: amazon, exploratory-search, negative
context: Avaliação de 2 estrelas, id da avaliação na Apple 14698589453.
status: verified
```

### Nextdoor

**Ruth ○ (etapa 2, encontrar).** Ruth fica sabendo das lojas por vizinhos e fóruns locais, que é para o que serve o Nextdoor. Nenhum post do cluster dela o menciona. Ele encontra negócios, não itens, então não responde à pergunta de Sam.

```screens
image: ../../../private/benchmarks/nextdoor.jpg
source: https://mobbin.com/apps/nextdoor-ios-def2c342-4fb2-4636-bbcc-a0271fbe2651/aff28b15-291f-4855-96a2-6c142dbe490d/screens
```

O Nextdoor é uma rede de vizinhança onde as pessoas recomendam negócios locais; o Nextdoor diz que as recomendações são cerca de 30% do seu conteúdo. Em setembro de 2026 lançou o "Local Faves", um hub que classifica negócios próximos pela confiança dos vizinhos, com resumos por IA do que os vizinhos dizem, disponível no Reino Unido ([Nextdoor via Nasdaq](https://www.nasdaq.com/press-release/nextdoor-deepens-its-commitment-local-business-discovery-and-recommendations-2026-09)). Nada pode ser comprado. As avaliações mostram o que as pessoas valorizam: um raio pequeno e verificado. Os donos de negócio têm dificuldade para manter suas páginas atualizadas.

```quote
text: "Used to work well as a local app. Now you get info from 50 miles away."
handle: Dj wade mister
network: App Store (UK) · Nextdoor
date: 2026-10-06
url: https://apps.apple.com/gb/app/id640360962?see-all=reviews
tags: nextdoor, hyperlocal-radius, negative
context: Avaliação de 1 estrela, id da avaliação na Apple 14634752755.
status: verified
```

```quote
text: "This app is terrible for business. It's almost impossible to add and edit your business information, so many glitches."
handle: AppleG69
network: App Store (UK) · Nextdoor
date: 2026-08-08
url: https://apps.apple.com/gb/app/id640360962?see-all=reviews
tags: nextdoor, merchant-burden, negative
context: Avaliação de 1 estrela de um dono de negócio, id da avaliação na Apple 14402387098.
status: verified
```

### ShopAppy e apps de BID

**Jess ○ (etapa 4, levar) · Ruth ○ (etapa 2, encontrar).** A ShopAppy oferecia o que falta para Jess, click and collect (compra online, retirada na loja) e pagamento na retirada em lojas independentes, e uma lista de quais lojas uma cidade ainda tem, que é a pergunta de Ruth. Nenhuma das duas pode usar: ela fechou em 2023.

A ShopAppy era uma "virtual high street" (high street virtual) fundada por volta de 2016: cada cidade ganhava um diretório de lojas independentes com click & collect, entregadores, pagamento na retirada e pontos de coleta, muitas vezes pago pelas prefeituras (Kingston e Enfield, em Londres, entre elas). Chegou a mais de 120 cidades, encerrou as atividades em outubro de 2023, e a empresa foi dissolvida em fevereiro de 2025 ([Companies House](https://find-and-update.company-information.service.gov.uk/company/10285855)). O relato que está hoje no antigo domínio diz que o custo de manter uma plataforma para milhares de microcomerciantes superou a receita, e que a maioria das lojas pequenas não conseguia manter estoque em tempo real, pagamentos online e envio ([ShopAppy story](https://shopappy.com/the-shopappy-story)). Os apps de BID (associação de negócios do bairro) de hoje são programas de fidelidade e desconto, como o Love Leam em Leamington ([BID Leamington](https://bidleamington.com/love-leam-app-launches/)), e não encontrei nenhum app de BID em Londres que busque estoque ou receba pedidos. Não há avaliações no período.

### Deliveroo

**Jess ○ (etapa 4, levar) · Ruth ○ (etapa 2, encontrar).** A Deliveroo leva os produtos de uma loja local até Jess fora do horário de trabalho dela, pagos com cartão. Nenhum post do cluster dela a menciona. O único post que menciona, u/Inge_Jones pedindo de um restaurante local "to keep them afloat" (para ajudar a manter o restaurante de pé), fica fora do mapa, mais perto de Ruth.

```screens
image: ../../../private/benchmarks/deliveroo.jpg
source: https://mobbin.com/apps/deliveroo-ios-c53d6f39-5c63-417d-a595-2e3fa65e404e/b24076da-f39f-48dd-8dfa-fd3974e046df/screens
```

A Deliveroo foi muito além dos restaurantes: mercado, dark stores Hop e, desde 2023, "Shopping" não alimentício de parceiros como Boots e B&Q, além do que ela chama de milhares de varejistas independentes. A DoorDash concluiu a compra de £2,9bn em outubro de 2025 ([Business Wire](https://secure.businesswire.com/news/home/20251002060133/en/DoorDash-Completes-Acquisition-of-Deliveroo)). Os compradores veem as opções por loja e categoria, e o posicionamento pago influencia a ordem. Cada pedido é de uma loja, entregue por entregadores da Deliveroo, com comissão informada de 20–35% mais taxas do comprador ([DineOpen](https://www.dineopen.com/blog/deliveroo-vs-just-eat-vs-uber-eats-commission-2026)). O estoque vem de cardápios que a loja mantém, então muitas vezes os itens se revelam indisponíveis só depois do pagamento.

```quote
text: "Wanted paint for a current project but only toiletries turned up. Puzzled how this shop has no paint in? ( white paint!)"
handle: Mel59u
network: App Store (UK) · Deliveroo
date: 2026-10-27
url: https://apps.apple.com/gb/app/id1001501844?see-all=reviews
tags: deliveroo, non-food-retail, assortment, negative
context: Avaliação de 1 estrela, id da avaliação na Apple 14717839950. Alguém comprando material de reforma em um app feito para comida.
status: verified
```

```quote
text: "Good service but anything out of stock you never get the refund so be careful what you order…"
handle: Anthony Tindall
network: App Store (UK) · Deliveroo
date: 2026-10-27
url: https://apps.apple.com/gb/app/id1001501844?see-all=reviews
tags: deliveroo, substitutions-refunds, mixed
context: Avaliação de 2 estrelas, id da avaliação na Apple 14717220291.
status: verified
```

### Uber Eats

**Jess ○ (etapa 4, levar).** O mesmo papel da Deliveroo para Jess: entrega de lojas próximas, só cartão, fora do horário das lojas. Nenhum post a mostra usando. Os avaliadores esbarram nas duas reclamações de Jess pelo outro lado: horários errados e entrega lenta.

```screens
image: ../../../private/benchmarks/uber-eats.jpg
source: https://mobbin.com/apps/uber-eats-ios-647bbce0-2eac-4b6f-a34b-3753263bf409/abf2e266-f49b-44b0-a25f-07a9c7b7bcff/screens
```

A Uber Eats tem muito estoque de mercado e conveniência no Reino Unido, incluindo a Co-op em mais de 1.300 lojas ([Grocery Gazette](https://www.grocerygazette.co.uk/2025/03/19/co-op-uber-eats-partnership/)). O recurso "bundle a second store" (juntar uma segunda loja), duas lojas próximas por uma taxa de entrega, foi lançado nos EUA em 2023 e não consegui confirmar no Reino Unido ([Uber](https://www.uber.com/us/en/newsroom/multi-store-ordering/)). A Uber Direct aluga seus entregadores para lojas que mantêm a própria vitrine. As avaliações reclamam de preços acima dos da prateleira, de horários de funcionamento que não batem com a realidade e de entregas de mercado lentas.

```quote
text: "…sent the driver to pick it up from a store that was closed, and that is always closed at that location…"
handle: Udohulk
network: App Store (UK) · Uber Eats
date: 2026-10-28
url: https://apps.apple.com/gb/app/id1058959277?see-all=reviews
tags: uber-eats, opening-hours-data, negative
context: Avaliação de 1 estrela, id da avaliação na Apple 14723705027.
status: verified
```

```quote
text: "you may as well walk to the shop and buy your stuff as deliveries take a stupid length of time"
handle: Jim Rickety
network: App Store (UK) · Uber Eats
date: 2026-10-17
url: https://apps.apple.com/gb/app/id1058959277?see-all=reviews
tags: uber-eats, delivery-speed, negative
context: Avaliação de 1 estrela, id da avaliação na Apple 14676968657. Quando a loja está perto, a entrega precisa ser melhor do que ir a pé.
status: verified
```

### Just Eat

**Jess ○ (etapa 4, levar).** Jess não usa. Os usuários já sentem a culpa por não comprar no comércio local que aparece no cluster de Jess.

A Just Eat, da Prosus desde outubro de 2025, tem uma seção "Shops" para conveniência e mercado e faz as entregas do Peckish ([RetailDetail](https://www.retaildetail.eu/news/food/acquisition-of-just-eat-takeaway-completed-the-hard-work-is-just-beginning/)). A comissão informada, cerca de 14% quando a loja entrega, é a menor taxa anunciada entre as três grandes. Cada pedido é de uma loja, e os grandes podem ser divididos entre dois entregadores, o que confunde os avaliadores. Os usuários sabem que as taxas prejudicam as lojas locais, e alguns pedem mais varejo não alimentício.

```quote
text: "if you've ever talked to a shop or cafe that uses them. JE fees are crippling. I feel bad keeping buying…"
handle: Mykul1982
network: App Store (UK) · Just Eat
date: 2026-10-30
url: https://apps.apple.com/gb/app/id566347057?see-all=reviews
tags: just-eat, merchant-fees, guilt, mixed
context: Avaliação de 3 estrelas, id da avaliação na Apple 14730904946, de um usuário que não sai de casa.
status: verified
```

```quote
text: "I'd love to see some clothing shops for children.. maybe things like hats & scarfs & socks etc…"
handle: TheCuriousTravellers
network: App Store (UK) · Just Eat
date: 2026-10-24
url: https://apps.apple.com/gb/app/id566347057?see-all=reviews
tags: just-eat, non-food-demand, positive
context: Avaliação de 5 estrelas, id da avaliação na Apple 14705035024. Demanda por lojas locais não alimentícias em um app de entrega.
status: verified
```

### Co-op Peckish

**Jess ○ (etapa 4, levar).** O Peckish permite que uma loja de conveniência independente entregue com os próprios preços. Isso combina mais com as compras de rotina de Jess do que com uma ida especial. Nenhum post a mostra usando.

O Peckish foi lançado em fevereiro de 2025 como um app de entrega e sistema de pedidos que qualquer loja de conveniência independente pode usar, vendendo com os próprios preços ([The Grocer](https://www.thegrocer.co.uk/news/co-op-launches-rapid-grocery-delivery-app-for-independents-called-peckish/701536.article)). A própria loja entrega, ou a Co-op repassa o pedido para a Uber Direct ou a Just Eat, por uma comissão informada de um dígito, ou cerca de metade da taxa dos agregadores. Não encontrei navegação compartilhada entre lojas nem listagem na App Store do Reino Unido com esse nome, e não há avaliações de consumidores no período. Uma grande empresa estabelecida está apostando que as independentes precisam mais de infraestrutura barata do que de mais um marketplace.

### Gophr e Stuart

**Jess ○ (etapa 4, levar).** O trecho do entregador por trás de uma entrega local no mesmo dia. Jess nunca vê esse trecho; uma loja ou um app agendaria por ela. Também tem a ver com o prazo de Sam, embora as tentativas de Sam parem antes, na etapa 1 ou 2.

A Gophr é uma rede de entregas no mesmo dia fundada em Londres que entrega para o Screwfix Sprint e opera o serviço TradePoint Express da B&Q ([London Loves Business](https://londonlovesbusiness.com/bq-to-start-same-day-deliveries/)). A Stuart oferece entregadores por uma API com rastreamento ao vivo ([Stuart](https://stuart.com/courier-service-london/)). A loja agenda e paga por serviço, e o comprador nunca vê o app da empresa de entregas. Redes de material de construção já vendem entrega em 30 a 90 minutos por meio delas para londrinos sem carro.

```quote
text: "Great service from order to delivery of wheelbarrow about 1 hour as have no car was great"
handle: Barry Griffiths
network: Trustpilot (UK) · Gophr
date: 2026-10-09
url: https://uk.trustpilot.com/reviews/6ac90d1b34558118b76c3fb3
tags: gophr, bulky-items, car-free, positive
context: Avaliação de 5 estrelas. A entrega torna possível uma compra volumosa sem carro.
status: verified
```

```quote
text: "Ordered and delivered within 30 mins, Screwfix Sprint…"
handle: KR
network: Trustpilot (UK) · Gophr
date: 2026-10-30
url: https://uk.trustpilot.com/reviews/6ae4599dc4731f35a7af3d90
tags: gophr, hardware-same-day, positive
context: Avaliação de 5 estrelas. A promessa de 30 minutos de uma rede de material de construção cumprida por um entregador terceirizado.
status: verified
```

### Square Online, SumUp e Teya

**Jess ○ (etapa 4, levar).** Leitores de cartão resolvem diretamente um dos atritos de Jess: barracas que só aceitam dinheiro quando ela não tem dinheiro vivo (u/rsweb). Nenhum post a mostra escolhendo uma loja por aceitar cartão.

As empresas de pagamento com cartão que as lojas pequenas já usam, cada uma com um jeito de vender pelo site próprio da loja ([Square](https://squareup.com/gb/en/online-store)). A Teya, a empresa que definiu este brief, lista publicamente maquininhas de cartão, uma conta empresarial, links de pagamento e plugins para Shopify e WooCommerce ([Teya Pay by Link](https://www.teya.com/online-payments/pay-by-link)). Cada loja é uma ilha, sem navegação entre lojas; as vendas de uma loja e, em alguns casos, os dados de estoque dela já passam por essas empresas.

```quote
text: "SumUp has been amazing setting up my 3D printing business and providing me with a website store to sell my products"
handle: BikeCam David
network: Trustpilot (UK) · SumUp
date: 2026-10-07
url: https://uk.trustpilot.com/reviews/6ac57954df7990f1219e4121
tags: sumup, merchant-online-store, positive
context: Avaliação de 5 estrelas de um dono de negócio. O provedor de pagamento é o caminho para uma loja na web.
status: verified
```

#### A Teya e a Jess

Foi a Teya que propôs este brief, então conferi as páginas públicas dela (novembro de 2026) contra o problema da Jess: ela compraria no comércio local, mas não consegue chegar enquanto as lojas estão abertas, e algumas barracas só aceitam dinheiro.

| O que a Teya faz hoje | O que isso significa para a Jess |
| --- | --- |
| Maquininhas de cartão e Tap to Pay no celular ([Teya](https://www.teya.com/en-gb)) | Uma barraca que aceita cartão resolve o problema do só dinheiro (u/rsweb) |
| Pay by Link: a loja manda um link de pagamento por SMS, chat, e-mail ou QR code, sem precisar de site, e o cliente paga na página de checkout da Teya ([Pay by Link](https://www.teya.com/online-payments/pay-by-link)) | Uma loja poderia receber o pedido da Jess por mensagem e já estar paga quando ela chegar |
| Plugins para Shopify e WooCommerce e um checkout hospedado, para lojas com site próprio ([Teya](https://www.teya.com/en-gb)) | Só ajuda se a loja tiver loja virtual, uma loja de cada vez |
| Ferramentas do lado do lojista: conta empresarial, crédito, o app da Teya, depósito de dinheiro em lojas PayPoint ([FF News](https://ffnews.com/newsarticle/paytech/paypoint-and-teya-announce-new-partnership-to-facilitate-cash-deposits/)) | Nada que a Jess veja |

O que não encontrei nas páginas públicas da Teya: um app ou site para quem compra, um jeito de buscar ou navegar entre lojas da Teya, estoque ou horário que o comprador possa conferir, pedido antecipado com retirada fora do horário, entrega, ou uma cesta com várias lojas. Essas são as partes do problema da Jess que continuam em aberto.

*Minha leitura:* a Teya já está no caixa das lojas que a Jess usaria e consegue receber o pagamento antes de ela chegar. A metade que falta é a do comprador.

## Outros produtos

Nenhum destes responde ao que Sam, Jess ou Ruth precisam agora. Eles tocam em outras perguntas do brief.

### Too Good To Go

Excedente de comida: os compradores pagam antes por uma "Surprise Bag" de uma loja próxima e retiram em uma janela definida; não há busca por item, de propósito ([Too Good To Go](https://www.toogoodtogo.co.uk/en-gb/business)). Mostra que as pessoas planejam uma ida em torno de uma janela de retirada em uma padaria pequena, e o que acontece quando o estoque do app está errado.

```screens
image: ../../../private/benchmarks/too-good-to-go.jpg
source: https://mobbin.com/apps/too-good-to-go-ios-d544c59a-6284-499f-ba07-92ca14f91002/00967c9c-7821-467b-8c31-7052fcd944b5/screens
```

```quote
text: "Order was cancelled as I was at the till to collect because the store had no surplus, so a completely waisted journey…"
handle: Montymoo2
network: App Store (UK) · Too Good To Go
date: 2026-09-23
url: https://apps.apple.com/gb/app/id1060683933?see-all=reviews
tags: too-good-to-go, inventory-truth, refund, negative
context: Avaliação de 1 estrela, id da avaliação na Apple 14584934531.
status: verified
```

### OLIO

Compartilhamento gratuito de comida e itens domésticos entre vizinhos, com voluntários coletando excedente de supermercados como a Tesco ([The Grocer](https://www.thegrocer.co.uk/news/tescos-olio-food-waste-partnership-hits-100-million-meals/723887.article)). Os vizinhos retiram dentro de uma janela quando vale a pena, e janelas curtas deixam pessoas de fora.

```quote
text: "most of them post at 9pm and expect you to show up shortly before 9:30…"
handle: sleepy.uwu.nova
network: App Store (UK) · OLIO
date: 2026-09-26
url: https://apps.apple.com/gb/app/id1008237086?see-all=reviews
tags: olio, pickup-windows, accessibility, negative
context: Avaliação de 2 estrelas, id da avaliação na Apple 14597041444. Janelas curtas deixam de fora quem depende de transporte público lento.
status: verified
```

### Shop app (Shopify)

Desde outubro de 2026, carrinhos de até 15 lojas Shopify são pagos em um único checkout Shop Pay, e cada loja continua sendo a vendedora ([Shopifreaks](https://www.shopifreaks.com/shopify-launches-universal-checkout-in-the-shop-app-letting-shoppers-buy-from-multiple-brands-with-one-cart-and-one-checkout/)). As lojas Shopify também oferecem retirada local e entrega ([Shopify](https://www.shopify.com/local-delivery)), mas o app não tem noção de "perto de mim" nem data para o Reino Unido. É o exemplo público mais claro de um checkout único para muitas independentes.

```quote
text: "this helps me to keep track what I've ordered and when I should expect it… with quick links to message sellers."
handle: MoogStarr
network: App Store (UK) · Shop
date: 2026-10-15
url: https://apps.apple.com/gb/app/id1223471316?see-all=reviews
tags: shop-app, multi-merchant-tracking, positive
context: Avaliação de 5 estrelas, id da avaliação na Apple 14669838962. Um só lugar para pedidos de muitas lojas.
status: verified
```

### Etsy

Um marketplace global de artesanato: uma cesta com muitas lojas, cada uma enviando separadamente, sem retirada ([Etsy Help](https://help.etsy.com/hc/articles/115015627947)). Prova que uma cesta com milhares de vendedores minúsculos funciona, e que "local", ali, é um rótulo que os vendedores digitam.

```quote
text: "I love finding unique gifts as well as supporting small businesses and I am NEVER disappointed on Etsy…"
handle: Grotty75
network: App Store (UK) · Etsy
date: 2026-10-20
url: https://apps.apple.com/gb/app/id477128284?see-all=reviews
tags: etsy, support-small-business, positive
context: Avaliação de 5 estrelas, id da avaliação na Apple 14690302358.
status: verified
```

### Bookshop.org e Hive

Livros vendidos online com uma parte repassada a livrarias independentes; a Bookshop.org tinha pago mais de £4m às independentes até janeiro de 2025 ([The Bookseller](https://www.thebookseller.com/news/bookshoporg-surpasses-4m-profit-for-indie-bookshops)). Os ISBNs facilitam um catálogo único e limpo, mas o livro sai de um depósito central.

```quote
text: "Hive shouldn't advertise items as in stock when they aren't and shouldn't accept orders for items they don't have."
handle: customer
network: Trustpilot (UK) · Hive
date: 2025-12-19
url: https://uk.trustpilot.com/reviews/694484566e150e09333d2c40
tags: hive, inventory-truth, negative
context: Avaliação de 1 estrela com o título "Don't lie about available stock" (não mintam sobre o estoque disponível).
status: verified
```

### Zapp e Zoom by Ocado

Quick commerce: um catálogo curto, estoque e entregadores próprios, entrega em menos de uma hora. A Getir saiu do Reino Unido em abril de 2024 ([The Grocer](https://www.thegrocer.co.uk/news/rapid-grocer-getir-confirms-uk-exit/690798.article)), o site da Zapp não abre mais, e o Zoom entrega a partir de poucos pontos, incluindo Acton ([Zoom](https://zoom.ocado.com/)).

```quote
text: "Lucky to be in catchment. Work full time so this is so helpful and I can flex my shopping needs"
handle: vicsipro
network: App Store (UK) · Zoom by Ocado
date: 2026-10-08
url: https://apps.apple.com/gb/app/id1447126432?see-all=reviews
tags: zoom-ocado, coverage, positive
context: Avaliação de 5 estrelas, id da avaliação na Apple 14644783903.
status: verified
```

## Padrões

*Minha leitura das avaliações acima e dos posts das personas. As contagens são pequenas.*

**Sam: para na etapa 1, saber.**

1. O "quem tem isso agora" por item só existe onde a loja dá dados por item ao Google, pelo site, por um feed ou pelo caixa (por meio da NearSt). Não encontrei nenhum número sobre quantas independentes fazem isso, e suponho que poucas padarias, floriculturas e açougues façam. Nenhum post mostra Sam achando estoque assim. Ele pergunta a pessoas: Reddit, um grupo de reposição no WhatsApp, um chatbot de IA.
2. Disponibilidade errada é a reclamação mais comum, seja qual for o modelo. Compradores da Deliveroo pagam e depois ficam sabendo que os itens estão em falta (Anthony Tindall), compradores do Too Good To Go chegam ao caixa e não há excedente (Montymoo2), e a Hive aceita pedidos de livros que não tem (customer). Os horários de funcionamento falham do mesmo jeito no Google (zingally) e na Uber Eats (Udohulk). Para Sam, um produto que anuncia estoque e erra custa a ida e o prazo (Dbank).

**Jess: para na etapa 4, levar.**

3. A entrega a partir de lojas locais já existe, uma loja por vez e com um custo. Deliveroo, Uber Eats, Just Eat e Peckish entregam fora do horário e aceitam cartão, com comissão de 14–35% mais taxas. O único post do cluster da Jess que cita uma alternativa cita a Amazon. Nenhum post do cluster dela menciona um app de entrega.
4. A promessa da Amazon é a régua, e ela está falhando. Alguns usuários da Amazon dizem que a entrega no mesmo dia não chega e que preferem ir à high street (gidfles). A entrega a partir de uma loja próxima precisa ser melhor do que ir a pé até lá (Jim Rickety). A Gophr mostra que o trecho do entregador já funciona em uma hora para londrinos sem carro (Barry Griffiths).

**Ruth: para na etapa 2, encontrar.**

5. Nada foi feito para ela. A pergunta dela é quais lojas ainda estão aqui e abertas. Os diretórios que respondiam a isso não duraram: a ShopAppy fechou, os apps de BID viraram cartões de fidelidade, e os usuários do Nextdoor reclamam quando o raio aumenta (Dj wade mister).
6. A informação em que ela confia fica desatualizada. Os horários ficam no Facebook (BeansAndNoodles), os horários do Google estão errados (zingally), e os donos têm dificuldade para editar os perfis que já têm (AppleG69). O açougue que ela frequenta toda semana fechado no horário anunciado (Valentando) é a mesma falha.

**No brief como um todo.**

7. Uma cesta com muitos vendedores existe, mas só com entrega pelo correio. Amazon e Etsy juntam vendedores em uma cesta; o checkout universal do Shop app e o Universal Cart do Google chegaram em outubro de 2026. Nenhum combina várias lojas locais com retirada ou com uma única entrega local.
8. "Apoiar o comércio local" atrai as pessoas, e uma experiência ruim afasta. Os compradores citam isso como motivo para comprar (Grotty75) e se sentem culpados pelas taxas que as lojas pagam (Mykul1982). A falha de "em estoque" da Hive atingiu exatamente esses compradores.

## Espaço em aberto

*Ideias que decorrem dos padrões acima. Não encontrei nenhum produto que faça qualquer uma delas.*

- **Sam.** A disponibilidade poderia ser uma promessa que a loja confirma. Ele já pergunta às pessoas quem tem. A mesma pergunta poderia ir para as lojas próximas, e a loja que tem aceita e separa o item, então ele vê "já está separado" antes de sair. Isso responde à reclamação mais comum sem pedir um catálogo às lojas.
- **Jess.** Ela poderia conseguir as coisas da rua no horário dela: retirada depois que a loja fecha, pagamento com cartão, ou uma única corrida de entregador por várias lojas da mesma rua, com cada loja continuando a ser a vendedora. As peças de checkout existem (Shop app, Etsy) e as peças de entrega existem (Gophr, Uber Direct); ninguém as juntou para uma high street, com preço pensado para competir com a entrega no mesmo dia da Amazon.
- **Ruth.** Ela precisa saber o que ainda está aqui e aberto, mantido atualizado sem trabalho do dono. Os registros de caixa e de pagamento com cartão já passam por provedores como Square, SumUp e Teya, e poderiam alimentar horários de funcionamento e um "aberto hoje" sem nova tarefa administrativa.
- **Sem persona.** Lojas sem códigos de produto poderiam mostrar "o que há de novo na sua rua hoje": a fornada do dia, as flores da semana. Usuários da Amazon dizem que a busca falha quando não sabem o que querem (KJCM98...3), e a surpresa funciona para o Too Good To Go. Isso fica na ponta passeando, onde nenhum dos três clusters está.
