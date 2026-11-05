# Tags

Os seis tipos de rótulo pequeno do app: chips de filtro, chips de sugestão, rótulos de status, badges, contadores e tags de avaliação. Cada um tem uma função, um tamanho e uma regra de cor, para o comprador distinguir de relance uma ação de um estado e de uma promoção.

```summary
Takeaways:
- Dois chips que o comprador toca (filtro e sugestão) e três rótulos que só informam (rótulo de status, badge, contador). As tags de avaliação são as duas coisas: chips que quem comprou escolhe na sheet de avaliação e rótulos com contagem na página da loja.
- Rótulos de status seguem palavra por palavra a tabela de estados do modelo conceitual e desenham o estado e o detalhe em pesos e cores diferentes, nunca com o ponto; só "Needs you" fica numa pílula; um por cartão ou linha.
- Badges ficam só em tiles com foto, no máximo dois por tile, com fundo 100 do acento e texto 800. Delivers leva um símbolo de scooter e New um símbolo de brilhos. Decidi não mostrar Promoted em lugar nenhum do protótipo por enquanto; o dado continua.
- A cor nunca é o único sinal: avisos levam um símbolo, e chips selecionados mantêm o rótulo (o Android acrescenta um checkmark).
Call:
- Pedi que as etiquetas fossem tratadas do mesmo jeito que forma e movimento, partindo do iOS e ampliando para o Material (decisão 041).
- Mantive os valores provisórios, para serem ajustados no tamanho real, no protótipo.
- Pedi que o Índigo signifique só ação, então um chip de filtro selecionado virou Foreground com texto invertido, e os chips foram para a cor do cartão porque o secundário quase não aparece sobre o novo fundo (decisão 045).
- Nesta rodada, uma revisão de acabamento viu o chip selecionado preto como a marca mais pesada do Nearby. Pedi que a seleção voltasse ao Índigo tonal (Índigo 100 com texto Índigo 800 em semibold), "Needs you" na cor do texto para o Buy ser o único Índigo numa linha de pedido, e que os badges mantivessem os valores do claro sobre fotos nos dois modos (change craft-pass-2).
- Depois pedi avaliações na página da loja, com tags de listas fixas que mudam com o polegar para cima ou para baixo (decisão 047).
- Depois que uma crítica visual mediu o chip Índigo 100 em 1,03:1 sobre o fundo, mais claro que os chips brancos ao lado, pedi uma regra nova: os chips não selecionados ficam um nível abaixo e o chip selecionado é cartão com texto e borda Índigo.
- Depois de outra crítica visual e de uma revisão de telas da versão web, pedi as correções das duas: no escuro, os chips desligados sobre o fundo passam a ser o próprio fundo com borda Border, e os chips de lugar e prazo do New Request viram uma só forma de menu. O chip selecionado sobre um tile escuro mantém o Card da decisão 049, porque o chip tingido da crítica mudaria essa decisão.
- Na rodada 10 achei feias as bordas escuras dos chips e da pílula "Needs you". Pedi que cor e contraste fizessem esse trabalho: um contêiner tonal um passo claro acima do fundo, como os papéis de contêiner do Material 3 e os preenchimentos escuros da Apple, e borda só onde um preenchimento não funciona. A seleção no escuro é preenchimento e peso, não contorno.
- Depois pedi um único tratamento de chip numa linha dentro do cartão da loja, um preenchimento neutro e discreto, sem borda e sem cor de tile, depois que os chips na cor do próprio cartão pareceram buracos.
AI:
- Um agente pesquisou as Human Interface Guidelines da Apple (lidas a partir do JSON da HIG, porque as páginas são renderizadas por script) e os chips e badges do Material 3, e propôs os tipos e as regras a partir da página de cor e do modelo conceitual. Eu pedi um design system moderno, baseado primeiro no iOS, depois no Material.
- Um agente acrescentou as tags de avaliação como um tipo, com as duas listas fixas, a partir dos chips de tema do Etsy e do Google Maps.
- Um agente construiu a nova regra de chip para cada fundo, criou `color.chipOn`, `state.chipEdge` e `size.edge` e a mediu no claro e no escuro.
- Um agente aplicou as correções de chip dessa rodada, criou o chip de menu e mediu a borda do chip sobre o fundo escuro.
- Um agente tirou as bordas escuras de todos os chips e da pílula, definiu os tokens de contêiner escuro, refez os quatro fundos de chip escuro com eles e mediu cada par contra o seu fundo.
- Na rodada 12 um agente mediu as tags de avaliação sobre as linhas escuras (1,37 a 1,40:1), deu a elas o tile do destaque, reuniu os contêineres escuros numa tabela só, organizada por fundo, e apagou o token `container`, que ninguém usava.
- Um agente criou `tag.fillOnRow`, aplicou nos chips de "What they sell" e nas tags de avaliação e mediu cada par: 1,21:1 no claro e 1,36 a 1,41:1 no escuro, com o texto acima de AA.
Trade-offs:
- Um rótulo de status sem preenchimento é mais discreto que uma pílula e mais fácil de passar despercebido; escolhi assim para que o preço continue sendo o elemento mais forte do cartão.
- O iOS não tem componente de chip, então os chips são próprios no iOS e chips do Material no Android.
```

## Tipos

| Tipo | Anatomia | Tamanho | Cor | Onde |
| --- | --- | --- | --- | --- |
| Chip de filtro | Rótulo, símbolo opcional à esquerda, contagem depois do rótulo em Muted foreground | 32 de altura, padding 12–14, `radius.full`, toque de 44 | Desligado, um nível abaixo do chip selecionado, texto Foreground. Claro: sobre o fundo, o próprio fundo com uma borda de 1 pt de Foreground a 12% (`glassEdge`, `state.chipEdge`; a borda dá 1,29:1); sobre uma sheet, a cor da sheet com a mesma borda; sobre o tile de uma loja ou categoria, `tonalOnTile` (branco a 40%, 1,17 a 1,18:1 no tile); numa seção de Card, Muted (sobre uma linha dentro do cartão da página da loja, `tag.fillOnRow`: o Background, 1,21:1 sobre a linha branca, sem borda); sobre o fundo de um chat, `chat.fill`. O escuro não tem bordas: um contêiner tonal ([Contêineres escuros](#contêineres-escuros)), `tag.fill` sobre o fundo e um chat, `tag.fillRaised` sobre uma sheet e uma seção de Card, o `cardOnTile` do tile sobre um tile, `tag.fillOnRow` sobre uma linha dentro do cartão da página da loja (Stone 360, 1,36 a 1,41:1, sem cor de tile). Ligado: claro, fundo Card, rótulo Índigo 800 em 600 (8,75:1) e uma borda Índigo 800 de 1,5 pt (`size.edge.selected`); escuro, um contêiner Índigo (`chipSelected`, `chipSelectedRaised`, `chipSelectedOnTile`) com texto Índigo 200 em 600 (8,1 a 11,6:1) e sem borda | Filtros de Requests, filtro de rua em Nearby; escolha única, "All" primeiro |
| Chip de sugestão | Texto, símbolo opcional | Como o chip de filtro | Como o chip de filtro desligado sobre o seu fundo (sobre o fundo de um chat, `chat.fill` no claro, `tag.fill` no escuro), texto em primeiro plano | Sob o balão do Snuffle que os oferece: três no New Request, e numa conversa; um toque envia o texto |
| Chip de menu, uma forma do chip de filtro | Valor, depois uma seta para baixo em Muted foreground | Como o chip de filtro | Como um chip de filtro desligado sobre o seu fundo | Um valor já definido que o comprador pode mudar: o lugar ("Within 15 min", que abre a sheet de localização) e o prazo ("Any time", que abre uma lista curta) no compositor do New Request. Os dois têm a mesma aparência, porque os dois estão definidos |
| Rótulo de status | Ícone opcional, depois o estado em Caption 1 Strong e o detalhe em Caption 1 | Na linha; "Needs you" numa pílula (Card, 1,2:1 sobre o Background, no claro; `tag.fill`, 1,55:1, no escuro) | Estado em Foreground (Success em Ready, Paid e Collected, Warning nos finais "not charged"), detalhe em Muted foreground com a primeira letra maiúscula ("Buy by Thu 5 Nov"); os dois quebram como unidades; um ícone de aviso só nos finais "Not confirmed, not charged" e "Sold, not charged", nunca em "not charged yet" | Linhas, cartões e notificações, exatamente como na tabela de estados |
| Badge | Texto em Caption 2 | 20 de altura, padding 8, `radius.full`, a 8 do canto da foto | Fundo 100 do acento, texto 800, nos dois modos, já que uma foto não muda com o tema. Sobre o acento de uma loja (o cabeçalho da página da loja): fundo Card, texto na cor do texto. New (símbolo de brilhos) Pêssego, Delivers (símbolo de scooter) Manteiga; Promoted não é desenhado | Tiles com foto e o cabeçalho da página da loja |
| Tag de avaliação | Texto; na página da loja, a contagem depois da tag | Na sheet de avaliação, como chip de filtro; na página da loja, um chip que só informa, igual a todo chip numa linha do cartão da loja (`tag.fillOnRow`: claro, o Background, 1,21:1 da linha branca; escuro, `tag.fillRaised`, 1,36 a 1,41:1 da linha; sem borda e sem cor de tile; nada ao toque) | Sheet de avaliação: como o chip de filtro, até três selecionadas. Página da loja: texto Foreground (16,3:1 no claro, 10,3:1 ou mais no escuro), contagem em Muted foreground (6,28:1 no claro, 7,7:1 ou mais no escuro); tags positivas e negativas têm a mesma aparência | Sheet de avaliação, resumo das avaliações ("Had it as promised · 21"), cartões de avaliação |
| Contador | Um número | Diâmetro mínimo de 18, `radius.full`, num anel de 2 pt na cor do fundo | Índigo 800 com texto branco nos dois modos (8,75:1) | No botão redondo de Requests, para pedidos que precisam do comprador; limite de "9+" |

## Contêineres escuros

No escuro, um chip ou pílula é um preenchimento tonal um passo claro acima do fundo, sem borda. Cada preenchimento fica de 1,4 a 1,6:1 do fundo em que está, e todo rótulo passa de 7:1. Os tokens têm croma baixo (a paleta escura da decisão 051), então um preenchimento Pêssego, Pistache, Manteiga ou Lavanda continua reconhecível sem uma área pastel grande. O claro mantém as bordas.

| Fundo | Chip desligado | Preenchimento | Chip desligado sobre o fundo | Texto sobre o preenchimento | Chip selecionado |
| --- | --- | --- | --- | --- | --- |
| Background | `tag.fill` | Stone 320 #323334 | 1,55:1 sobre #0B0C0D | Foreground 12,14:1 | `chipSelected`, Índigo 900 #222169, 1,39:1 |
| Chat | `tag.fill` | Stone 320 #323334 | 1,55:1 sobre #0B0C0D | Foreground 12,14:1 | `chipSelected`, 1,39:1 |
| Sheet | `tag.fillRaised` | Stone 360 #3D3E3F | 1,58:1 sobre #1C1D1E | Foreground 10,28:1 | `chipSelectedRaised`, Índigo 850 #2E2B8F, 1,49:1 |
| Seção de Card | `tag.fillRaised` | Stone 360 #3D3E3F | 1,41:1 sobre Card #252627 | Foreground 10,28:1 | `chipSelectedRaised`, 1,49:1 |
| Tile (a tela de categoria, o cartão da página da loja) | `shop.accent.<hue>.cardOnTile` | #624D46, #4C5745, #595242, #535062 | 1,40 a 1,48:1 sobre o tile | Foreground 7,30 a 7,54:1 | `chipSelectedOnTile`, Índigo 950 #1A194F, 1,41 a 1,51:1 |
| Linha dentro do cartão da página da loja (seus chips e tags de avaliação) | `tag.fillOnRow` (`tag.fillRaised`) | Stone 360 #3D3E3F | 1,36 a 1,41:1 sobre as quatro linhas `cardOnTile` | Foreground 10,28:1; a contagem em Stone 880 7,74:1 | Nenhum |

A linha Pêssego #624D46 é o par mais apertado da página da loja, com 1,36:1 para o seu chip, abaixo dos 1,4:1 que um chip sobre uma linha tingida precisava quando usava o `tile` do destaque. Escolhi um chip neutro para o cartão inteiro em vez dos tingidos, então 1,36:1 é o piso, acima do mínimo de 1,15:1 para uma superfície. O `shop.accent.<hue>.container`, que dava 1,09 a 1,15:1 sobre o cartão de linha, foi apagado: nenhum componente o lê.

O chip selecionado se distingue dos não selecionados pelo matiz Índigo, pelo preenchimento e pelo rótulo em semibold. Aviso e Sucesso continuam texto com símbolo, então não têm contêiner; competiriam com o preço. Os badges ficam sobre fotos e não têm borda em nenhum dos dois modos.

## Regras

| Regra | Na prática |
| --- | --- |
| Um status por objeto | Um rótulo de status por cartão ou linha |
| Poucos badges | No máximo dois badges por tile; Promoted não aparece |
| Sem preenchimento no rótulo de status | Uma pílula competiria com o preço |
| Mais que cor | Avisos também ganham um símbolo; a cor nunca carrega significado sozinha |
| A seleção mantém o rótulo | Um chip selecionado mantém o texto; o Android acrescenta um checkmark, como o Material |
| Badges para o que importa | Um contador só para pedidos que precisam do comprador, já que a HIG reserva badges para informação crítica |
| Tags de avaliação de listas fixas | Para cima: "Had it as promised", "Set aside on time", "Friendly", "Good value", "Knew their stuff". Para baixo: "Wasn't as described", "Not ready when I came", "Hard to find". A lista segue o polegar; não há tags de texto livre |
| Tags negativas têm a mesma aparência | Uma tag negativa não fica vermelha nem menor; as palavras levam o sentido |
| Origem de uma resposta | A resposta de uma loja consultada diz "Has it · replied 2 min ago"; a de uma loja conectada diz "In stock now · from the shop's till", encurtado nas linhas compactas para "In stock now" ou "In stock · 1 of 2" ao lado do símbolo de raio, que representa o caixa (o VoiceOver continua lendo "from the shop's till") |

Os tamanhos dos badges do Material (ponto de 6 dp, com texto de 16 dp) estão a conferir em m3.material.io.

## Fontes

- Apple, Human Interface Guidelines, Tab bars (badges): https://developer.apple.com/design/human-interface-guidelines/tab-bars
- Apple, Human Interface Guidelines, Accessibility (mais que cor): https://developer.apple.com/design/human-interface-guidelines/accessibility
- Material 3, chips (assist, filter, input, suggestion; 32 dp de altura, alvo de 48 dp): https://m3.material.io/components/chips
- Material Components for Android, `BadgeDrawable`: https://developer.android.com/reference/com/google/android/material/badge/BadgeDrawable
- [Cor](colour.md) (papéis de badge e de chip selecionado) e [Modelo conceitual](conceptual-model.md) (estados e palavras)
