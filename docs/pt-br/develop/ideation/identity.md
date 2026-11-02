# Identidade

Uma primeira exploração da identidade do app do comprador: quatro direções de conceito britânicas e ligadas a encontrar ou comprar, três paletas de destaque, e as paletas aplicadas às telas iniciais da v2 e aos papéis do Material 3. O produto ainda não tem nome. A linha da marca está escolhida; a paleta e o nome estão em aberto.

```summary
Takeaways:
- Quatro direções: o terrier (um cachorro que entra nas lojas e volta com a coisa), os Irregulars (os mensageiros de rua de Holmes), dar uma saidinha (o mandado rápido britânico) e a parade (fachadas pintadas e toldos de feira).
- Os Irregulars são os mais próximos da estrutura do conceito: um concierge com quem o comprador fala, vários agentes perguntando às lojas por trás. O terrier dá rosto à espera.
- Três paletas, cada uma construída sobre um par complementar mais uma terceira cor: Pillar and park (verde e vermelho, manteiga), Awning (cobalto e laranja, menta), Tiles (verde-petróleo e rosa, ocre). Todo tint passa 4,5:1 como texto e como rótulo de botão nos modos claro e escuro.
- Vários nomes óbvios já existem ou estão concorridos (Parade, Fetch, Errand, Legwork), e "Nip" sozinho é uma ofensa étnica.
- A rodada 4 mantém Oat e Brew como base e acrescenta três escalas de cinza quente, no estilo do shadcn, e quatro conjuntos de cinco acentos (Lata de chá, Esmalte de fachada, Quitanda, Caixa de correio). Texto preto puro e branco sobre o Brew passam em todo lugar; o agente sugere Lata de chá com o Cinza biscoito.
Call:
- Escolhido: a marca segue o teste de ícone 3, o toldo da parade como barba de terrier, com sobrancelhas e bigode de quatro ou cinco faixas. Pré-selecionadas: as paletas A, C, F, I e J. Em aberto: o nome e a paleta, as duas decisões minhas.
- Com personagem, multicor e sem a cara genérica de produto de IA (sem gradientes roxos, brilhos ou orbes luminosos).
AI:
- Eu dei as sementes: um cachorro farejador, um investigador no estilo Sherlock, a cultura de compras britânica. Um agente buscou na web referências e conflitos de nome, verificou a situação de direito autoral e de marca de Sherlock Holmes, montou as paletas com um script que calcula o contraste WCAG e as paletas tonais do Material 3, desenhou os esboços de marca em SVG, aplicou as paletas aos wireframes da v2 e capturou nove apps do Mobbin.
- As verificações de nome são buscas rápidas na web, não buscas de marca registrada. Nomes marcados como "não verificado" não foram buscados.
- Na rodada 4, um agente leu a documentação do shadcn/ui, do Tailwind, do Radix Colors e do Material sobre neutros, montou as escalas de cinza em OKLCH com um script e conferiu o contraste WCAG de cada combinação, incluindo preto e branco puros. Ele escureceu um pouco o Tea teal e o Jam para passarem sobre o Oat.
Trade-offs:
- Cada paleta tem uma cor secundária e uma terciária que falham como texto no branco (Butter, Marmalade, Mint, Rose, Ochre). Elas ficam para preenchimentos, selos e pontos de status; texto nesses matizes usa o tom mais escuro do Material 3.
- Mostrar todas as paletas nas mesmas duas telas facilita a comparação, e esconde como cada uma mudaria layout, tipografia ou ilustração.
```

## Rodadas

Todas as rodadas ficam no mesmo quadro, a mais recente no topo, abaixo de uma área "Onde está" com o que foi escolhido, pré-selecionado, descartado e o que está em aberto. Os itens escolhidos têm contorno verde; os pré-selecionados, um selo verde.

| Rodada | O que acrescentou |
| --- | --- |
| 4 | Oat e Brew da paleta I como base: três escalas de cinza quente no estilo do shadcn (de Oat e Brew até perto do stone do Tailwind) e quatro conjuntos de cinco acentos, cada um testado com preto e branco puros |
| 3 | Teste de ícone 3 (sobrancelhas e bigode) com bigode de quatro ou cinco listras, nas paletas A, C, F, I e J |
| 2 | Mais dez paletas de quatro ou cinco cores, e seis testes de ícone em que o toldo da parade vira a barba de um terrier |
| 1 | Quatro direções de conceito, três paletas, aplicações na home da v2, referências |

## Paletas, segunda rodada

Não encontrei a paleta nas três primeiras. Estas dez trabalham com mais cores por conjunto (quatro ou cinco), cada uma montada em torno de um par complementar. A primeira cor é o tint (cor-chave do iOS, primária do Material 3); o contraste dela aparece sobre branco e, no modo escuro, sobre #1C1C1E. As cores mais claras são para preenchimentos, chips e pontos de status, não para texto.

| Paleta | Cores | Conjunto | Tint, claro / escuro |
| --- | --- | --- | --- |
| A · Lido | 5 | Pool blue #2F6FDE, Coral #FF6F59, Sun #FFD25A, Lilac #B9A7F5, Mint #6ED3A5 | #2F6FDE (4,72:1) / #4E84E3 (4,65:1) |
| B · Greengrocer | 4 | Leaf #2E7D4F, Tomato #E4572E, Lemon #F6D743, Plum #7B4B94 | #2E7D4F (5,05:1) / #38975F (4,67:1) |
| C · Pick and mix | 4 | Violet #5B3FE0, Raspberry #E23E73, Lime #A7D129, Apricot #FFB26B | #5B3FE0 (6,5:1) / #8874E9 (4,64:1) |
| D · Allotment | 4 | Moss #3F6B22, Beetroot #A23B72, Marigold #F5A623, Cornflower #6C8EF5 | #3F6B22 (6,29:1) / #589630 (4,72:1) |
| E · Seaside rock | 4 | Navy #1B3A6B, Rock pink #FF7EB6, Sea mint #7FE3C4, Sand #F4D58D | #1B3A6B (11,27:1) / #5586D4 (4,66:1) |
| F · Flower show | 5 | Emerald #00796B, Magenta #C2185B, Primrose #FFE082, Periwinkle #8C9EFF, Blush #FFC4C4 | #00796B (5,32:1) / #009886 (4,73:1) |
| G · Corner shop | 4 | Cobalt #3346D3, Tangerine #FF8A3D, Pistachio #B8E07A, Blush #F7B7C3 | #3346D3 (7,1:1) / #6E7BE0 (4,52:1) |
| H · Night bus | 4 | Indigo #3D35B8, Amber #FFB000, Neon pink #FF5FA2, Cyan #3FD0E0 | #3D35B8 (8,75:1) / #807AD9 (4,62:1) |
| I · Tea and biscuits | 5 | Tea teal #0F6E6E, Jam #C8325A, Custard #F7C948, Oat #E9DCC3, Brew #5A3E2B | #0F6E6E (6,04:1) / #149292 (4,5:1) |
| J · Pastel parade | 5 | Ink blue #2442A8, Peach #FFB59E, Pistachio #C9EBA2, Lavender #CDBDFF, Butter #FFE7A0 | #2442A8 (8,68:1) / #647FDE (4,56:1) |

## Teste de ícone 3, explorado

Escolhi a linha do teste de ícone 3, sobrancelhas e bigode, e pedi um bigode mais largo, com quatro ou cinco listras, nas paletas Lido (A), Pick and mix (C), Flower show (F), Tea and biscuits (I) e Pastel parade (J). Cada paleta mostra o ícone sobre o tint, num fundo claro e num fundo escuro, e depois em 60 e 29 pontos.

## Testes de ícone

O toldo listrado da parade vira a barba de um terrier: um pouco mais baixo, com orelhas dobradas em cima e olhos e nariz acima dele. Uma forma segura os dois lados do produto, as lojas (o toldo) e o concierge (o cachorro). Seis variantes: orelhas, olhos e nariz; só orelhas e nariz; sobrancelhas e barba curta; dentro de uma cabeça; uma piscadela; uma cor. Cada uma aparece em Lido, Greengrocer e num fundo escuro, e em 60 e 29 pontos. Os primeiros rascunhos usavam listras brancas, que pareciam dentes; agora as listras alternam duas cores da paleta e o toldo começa logo abaixo do nariz, como um bigode.

## Direções de conceito

| Direção | Ideia | Encaixe com o concierge | Principal risco |
| --- | --- | --- | --- |
| O terrier | Um pequeno terrier britânico que entra nas lojas por você e volta com a coisa | Um personagem com o que fazer enquanto o comprador espera: farejando, achou, trazendo | Pode parecer app de pet, ou infantil |
| Os Irregulars | A rede de mensageiros de rua de Holmes, liderada por Wiggins, que reporta a uma pessoa | Um concierge na frente, vários agentes perguntando às lojas por trás | Marca registrada: o espólio de Conan Doyle ainda reivindica direitos sobre o nome e a imagem de Sherlock Holmes |
| Dar uma saidinha | "I'm just nipping to the shops": o mandado rápido britânico | O trabalho do produto é o mandado curto com prazo | Se apoia numa expressão sem visual próprio; "Nip" sozinho é ofensa |
| A parade | Uma parade de lojas com fachadas pintadas e toldos listrados | A rua e suas lojas carregam a marca | Pastiche de tradição, e o concierge fica sem rosto |

Sobre Sherlock Holmes: Conan Doyle morreu em 1930, então as histórias estão em domínio público no Reino Unido, e desde 1º de janeiro de 2023 todas estão em domínio público nos EUA (Klinger v. Conan Doyle Estate tratou das anteriores). O espólio de Conan Doyle diz ter direitos de marca e de common law sobre o nome e a imagem de Sherlock Holmes, e em 2020 processou a Netflix por Enola Holmes; o caso terminou em acordo. Não busquei no registro do UK IPO. Qualquer nome ou imagem desta direção precisa dessa busca antes, e o chapéu deerstalker, o cachimbo e o nome "Sherlock" ficam de fora.

### Ideias de nome

| Direção | Nomes | O que a busca rápida encontrou |
| --- | --- | --- |
| O terrier | Rummage, Fetch, Ferret, Terrier, Snout | Rumage, buscador britânico de itens usados, tem o mesmo som. Fetch Rewards e Fetch Pet Insurance (EUA). eFerret, app de alertas do eBay. Terrier e Snout não verificados |
| Os Irregulars | Wiggins, Irregulars, Legwork, Runners, Footwork | Nenhum app de compras chamado Wiggins no Reino Unido. The Irregulars, da Netflix (2021). Legwork é usado por várias empresas, uma delas um app que paga pessoas para visitar lojas locais. Runners e Footwork não verificados |
| Dar uma saidinha | Popround, Nippy, Errand, Back in 5, Nip | Popround: nada encontrado. Nippy é uma start-up britânica de entrega rápida de mercado. Errand está concorrido. "Nip" é uma ofensa étnica contra japoneses. Back in 5 não verificado |
| A parade | Parade, Barrow, Fascia, Awning, Coster | Parade é uma plataforma criada no Reino Unido que vende para skate shops independentes, e uma marca americana de roupa íntima. Barrow é nome de lugar com app da cidade. Os demais não verificados |

## Paletas

Cada paleta tem um tint (a cor-chave do iOS para elementos interativos, e a primária do Material 3), uma secundária e uma terciária, e quatro cores de status para a lista de Requests. O valor claro é usado no branco e nos fundos agrupados do sistema, o escuro no preto e no #1C1C1E.

| Paleta | Tint (claro / escuro) | Secundária | Terciária | Tint como texto no branco | Tint como texto no preto |
| --- | --- | --- | --- | --- | --- |
| Pillar and park | Park green #1C7350 / #5FCB98 | Pillar red #C42F43 / #FF8590 | Butter #F3CB4F | 5,81:1 | 10,48:1 |
| Awning | Cobalt #2B54C4 / #94B1FF | Marmalade #E5782A / #FFB070 | Mint #6FCDA2 / #8FE0BA | 6,63:1 | 9,99:1 |
| Tiles | Tile teal #0D6A70 / #5EC8CB | Rose #E0607B / #FF9EB2 | Ochre #D9A535 / #F0C45E | 6,34:1 | 10,60:1 |

| Status | Pillar and park | Awning | Tiles |
| --- | --- | --- | --- |
| Buscando (anel) | #B98A0C / #F3CB4F | #2E9A6C / #8FE0BA | #B7861C / #F0C45E |
| Precisa de você | #C42F43 / #FF8590 | #D2671A / #FFB070 | #D4506D / #FF9EB2 |
| Em andamento | #1C7350 / #5FCB98 | #2B54C4 / #94B1FF | #0D6A70 / #5EC8CB |
| Concluído | #8E8E93 | #8E8E93 | #8E8E93 |

Todo ponto de status tem pelo menos 3:1 contra o fundo, o que a WCAG pede para elementos gráficos que não são texto. Buscando é um anel e os outros são pontos cheios, então o estado não depende só da cor.

No Material 3, cada cor da marca gera sua própria paleta tonal, para a secundária e a terciária manterem o matiz em vez de serem derivadas da primária: tons 40 e 90 no claro, 80 e 30 no escuro, e uma superfície neutra a partir do matiz do tint com croma baixo. Cada papel passa de 6,4:1 contra sua cor "on". O canvas mostra os valores.

## Fontes

- shadcn/ui: Theming: https://ui.shadcn.com/docs/theming
- Tailwind CSS: Colors: https://tailwindcss.com/docs/colors
- Radix Colors: Understanding the scale: https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
- Radix Colors: Composing a palette: https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette
- Evil Martians: OKLCH in CSS, why we moved from RGB and HSL: https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl
- Evil Martians: Harmony palette (GitHub): https://github.com/evilmartians/harmony
- tweakcn (GitHub): https://github.com/jnsahaj/tweakcn
- Material Color Utilities (GitHub): https://github.com/material-foundation/material-color-utilities
- WCAG 2.2 Understanding 1.4.3 Contrast (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- WCAG 2.2 Understanding 1.4.11 Non-text Contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- Etymonline, "terrier": https://www.etymonline.com/word/terrier
- Merriam-Webster, "terrier": https://www.merriam-webster.com/dictionary/terrier
- Staffordshire Bull Terrier (Wikipedia): https://en.wikipedia.org/wiki/Staffordshire_Bull_Terrier
- Oxford Learner's Dictionaries, "ferret out": https://www.oxfordlearnersdictionaries.com/definition/english/ferret-out
- Baker Street Irregulars (Wikipedia): https://en.wikipedia.org/wiki/Baker_Street_Irregulars
- Klinger v. Conan Doyle Estate (Wikipedia): https://en.wikipedia.org/wiki/Klinger_v._Conan_Doyle_Estate,_Ltd.
- Conan Doyle Estate, marcas e direitos autorais: https://conandoyleestate.com/licensing/trademarks-and-copyrights
- Processo de Enola Holmes encerrado (Copyright Lately): https://copyrightlately.com/enola-holmes-copyright-lawsuit-dismissed
- Oxford Learner's Dictionaries, "nip": https://www.oxfordlearnersdictionaries.com/definition/english/nip_1
- Britannica Dictionary, "nip": https://www.britannica.com/dictionary/nip
- Vocabulary.com, "Nip": https://www.vocabulary.com/dictionary/Nip
- Babita Sharma, The Corner Shop: https://www.johnmurraypress.co.uk/titles/babita-sharma/the-corner-shop/9781473673229
- Shopping parade (Wikipedia): https://en.wikipedia.org/wiki/Shopping_parade
- Shop signs (Designing Buildings): https://www.designingbuildings.co.uk/wiki/Shop_signs
- Guia de publicidade em fachadas de Medway: https://www.medway.gov.uk/download/downloads/id/2328/shopfront_advertising_guide_2015.pdf
- Costermonger (Wikipedia): https://en.wikipedia.org/wiki/Costermonger
- Verificações de nome: Rumage (https://www.cbinsights.com/compare/gumtree-vs-rumage), Fetch Pet Insurance (https://apps.apple.com/app/id925165009), eFerret (https://apps.apple.com/app/eferret/id1658695827), Legwork (https://apps.apple.com/az/app/legwork/id6760600594), The Irregulars cancelada (https://www.spoilertv.com/2021/05/the-irregulars-cancelled-by-netflix.html), Nippy (https://www.seedrs.com/nippy/sections/idea), Delivery by Errand (https://apps.shopify.com/errand), Parade (https://www.jenkemmag.com/home/2019/08/26/parade-world-rethinking-way-buy-skate-goods-online/), Barrow Buzz (https://www.atcm.org/barrowbidlaunchesbarrowbuzz)
- Apple Human Interface Guidelines, cor: https://developer.apple.com/design/human-interface-guidelines/color
- Material 3, papéis de cor: https://m3.material.io/styles/color/roles
- WCAG 2.2, contraste mínimo e contraste de elementos não textuais: https://www.w3.org/TR/WCAG22/#contrast-minimum

As capturas do Mobbin (Duolingo, Headspace, Monzo, Too Good To Go, Citymapper, Deliveroo, Finch, Airbnb, Cash App) ficam fora do repositório público porque são telas de terceiros.
