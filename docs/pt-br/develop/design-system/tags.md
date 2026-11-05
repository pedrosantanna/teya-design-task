# Tags

Os seis tipos de rótulo pequeno do app: chips de filtro, chips de sugestão, rótulos de status, badges, contadores e tags de avaliação. Cada um tem uma função, um tamanho e uma regra de cor, para o comprador distinguir de relance uma ação de um estado e de uma promoção.

```summary
Takeaways:
- Dois chips que o comprador toca (filtro e sugestão) e três rótulos que só informam (rótulo de status, badge, contador). As tags de avaliação são as duas coisas: chips que quem comprou escolhe na sheet de avaliação e rótulos com contagem na página da loja.
- Rótulos de status não têm preenchimento e seguem palavra por palavra a tabela de estados do modelo conceitual; um por cartão ou linha.
- Badges ficam só em tiles com foto, no máximo dois por tile, com fundo 100 do acento e texto 800. Promoted sempre aparece, porque declara o posicionamento pago.
- A cor nunca é o único sinal: avisos levam um símbolo, e chips selecionados mantêm o rótulo (o Android acrescenta um checkmark).
Call:
- Pedi que as etiquetas fossem tratadas do mesmo jeito que forma e movimento, partindo do iOS e ampliando para o Material (decisão 041).
- Mantive os valores provisórios, para serem ajustados no tamanho real, no protótipo.
- Pedi que o Índigo signifique só ação, então um chip de filtro selecionado virou Foreground com texto invertido, e os chips foram para a cor do cartão porque o secundário quase não aparece sobre o novo fundo (decisão 045).
- Nesta rodada, uma revisão de acabamento viu o chip selecionado preto como a marca mais pesada do Nearby. Pedi que a seleção voltasse ao Índigo tonal (Índigo 100 com texto Índigo 800 em semibold), "Needs you" na cor do texto para o Buy ser o único Índigo numa linha de pedido, e que os badges mantivessem os valores do claro sobre fotos nos dois modos (change craft-pass-2).
- Depois pedi avaliações na página da loja, com tags de listas fixas que mudam com o polegar para cima ou para baixo (decisão 047).
- Depois que uma crítica visual mediu o chip Índigo 100 em 1,03:1 sobre o fundo, mais claro que os chips brancos ao lado, pedi uma regra nova: os chips não selecionados ficam um nível abaixo e o chip selecionado é cartão com texto e borda Índigo.
- Depois de outra crítica visual e de uma revisão de telas da versão web, pedi as correções das duas: no escuro, os chips desligados sobre o fundo passam a ser o próprio fundo com borda Border, e os chips de lugar e prazo do New Request viram uma só forma de menu. O chip selecionado sobre um tile escuro mantém o Card da decisão 049, porque o chip tingido da crítica mudaria essa decisão.
AI:
- Um agente pesquisou as Human Interface Guidelines da Apple (lidas a partir do JSON da HIG, porque as páginas são renderizadas por script) e os chips e badges do Material 3, e propôs os tipos e as regras a partir da página de cor e do modelo conceitual. Eu pedi um design system moderno, baseado primeiro no iOS, depois no Material.
- Um agente acrescentou as tags de avaliação como um tipo, com as duas listas fixas, a partir dos chips de tema do Etsy e do Google Maps.
- Um agente construiu a nova regra de chip para cada fundo, criou `color.chipOn`, `state.chipEdge` e `size.edge` e a mediu no claro e no escuro.
- Um agente aplicou as correções de chip dessa rodada, criou o chip de menu e mediu a borda do chip sobre o fundo escuro.
Trade-offs:
- Um rótulo de status sem preenchimento é mais discreto que uma pílula e mais fácil de passar despercebido; escolhi assim para que o preço continue sendo o elemento mais forte do cartão.
- O iOS não tem componente de chip, então os chips são próprios no iOS e chips do Material no Android.
```

## Tipos

| Tipo | Anatomia | Tamanho | Cor | Onde |
| --- | --- | --- | --- | --- |
| Chip de filtro | Rótulo, símbolo opcional à esquerda, contagem depois de "·" | 32 de altura, padding 12–14, `radius.full`, toque de 44 | Desligado, um nível abaixo do chip selecionado, texto Foreground: sobre o fundo no claro, o próprio fundo com uma borda de 1 pt de Foreground a 12% (`glassEdge`, `state.chipEdge`; a borda dá 1,29:1); sobre uma sheet clara, a cor da sheet com a mesma borda; sobre o tile de uma loja ou categoria, `tonalOnTile` (branco a 40% no claro, 1,17 a 1,18:1 no tile; 6% no escuro, 1,19 a 1,20:1); numa seção de Card e numa sheet escura, Muted; sobre o fundo escuro, o próprio fundo com uma borda Border de 1 pt (Stone 360, 1,82:1; como Card ele tinha o mesmo preenchimento do chip selecionado); sobre o fundo de um chat, `chat.fill`. Ligado: fundo Card, rótulo Índigo 800 em 600 (8,75:1) e uma borda Índigo 800 de 1,5 pt (`size.edge.selected`); escuro: Card com texto Índigo 300 (8,60:1) e borda de 1 pt (`color.chipOn`) | Filtros de Requests, filtro de rua em Nearby; escolha única, "All" primeiro |
| Chip de sugestão | Texto, símbolo opcional | Como o chip de filtro | Fundo Card (sobre o fundo de um chat, `chat.fill`), texto em primeiro plano | Sob o balão do Snuffle que os oferece: três no New Request, e numa conversa; um toque envia o texto |
| Chip de menu, uma forma do chip de filtro | Valor, depois uma seta para baixo em Muted foreground | Como o chip de filtro | Como um chip de filtro desligado sobre o seu fundo | Um valor já definido que o comprador pode mudar: o lugar ("Within 15 min", que abre a sheet de localização) e o prazo ("Any time", que abre uma lista curta) no compositor do New Request. Os dois têm a mesma aparência, porque os dois estão definidos |
| Rótulo de status | Ícone opcional, depois texto em Caption 1 | Na linha, sem preenchimento | Primeiro plano secundário; "Needs you" na cor do texto em 600 (Caption 1 Strong); um ícone de aviso só nos finais "Not confirmed · not charged" e "Sold · not charged", nunca em "not charged yet" | Linhas, cartões e notificações, exatamente como na tabela de estados |
| Badge | Texto em Caption 2 | 20 de altura, padding 8, `radius.full`, a 8 do canto da foto | Fundo 100 do acento, texto 800, nos dois modos, já que uma foto não muda com o tema. Sobre o acento de uma loja (o cabeçalho da página da loja): fundo Card, texto na cor do texto. Promoted Pistache, New Pêssego, Delivers Manteiga | Tiles com foto e o cabeçalho da página da loja |
| Tag de avaliação | Texto; na página da loja, a contagem depois de "·" | Na sheet de avaliação, como chip de filtro; na página da loja e nos cartões de avaliação, texto na linha sem preenchimento | Sheet de avaliação: como o chip de filtro, até três selecionadas. Página da loja: texto Foreground, contagem em Muted foreground; tags positivas e negativas têm a mesma aparência | Sheet de avaliação, resumo das avaliações ("Had it as promised · 21"), cartões de avaliação |
| Contador | Um número | Diâmetro mínimo de 18, `radius.full`, num anel de 2 pt na cor do fundo | Índigo 800 com texto branco nos dois modos (8,75:1) | No botão redondo de Requests, para pedidos que precisam do comprador; limite de "9+" |

## Regras

| Regra | Na prática |
| --- | --- |
| Um status por objeto | Um rótulo de status por cartão ou linha |
| Poucos badges | No máximo dois badges por tile; Promoted sempre aparece, porque declara o posicionamento pago |
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
