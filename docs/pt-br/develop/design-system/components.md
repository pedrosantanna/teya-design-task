# Componentes

Todos os componentes que as telas da v7 usam, especificados a partir dos tokens das outras páginas do design system: do que cada um é feito, quais tokens usa, seus estados, suas formas no iOS e no Android e o que um leitor de tela recebe. O protótipo é construído a partir deles.

```summary
Takeaways:
- Vinte componentes, cada um numa tabela: anatomia, tokens, estados, formas no iOS e no Android, acessibilidade e truncamento.
- Só entram nomes de tokens das fundações: `radius.*`, `space.*` e os espaços semânticos, `spring.*`, os papéis de cor e os estilos de texto. Onde um valor ainda não tem token, a tabela diz.
- Só um Buy preenchido fica visível por vez. Cartões de resposta, de compra e linhas de pedido são um elemento só para o VoiceOver e o TalkBack, com o Buy ou o botão da linha como ação personalizada.
- O nome de uma loja ocupa uma linha, uma prévia duas, e um preço nunca é cortado.
Call:
- Depois que uma revisão de design encontrou faltando especificações de componentes, estados, equivalentes de plataforma e regras de conteúdo, pedi que o design system ficasse completo o bastante para construir o protótipo a partir dele.
- Escolhi o HugeIcons para os ícones (decisão 042) e mantive estas especificações provisórias (decisão 043), para serem ajustadas no tamanho real, no protótipo.
AI:
- Um agente revisou o design system contra as telas da v7 e listou o que faltava. Outro agente escreveu esta página a partir dos tokens existentes e dos frames da v7; eu defini o escopo e as regras que ele tinha de seguir.
Trade-offs:
- Especificar cada componente antes de o protótipo existir significa que alguns valores vão mudar quando estiverem num celular; escrever antes evita que as duas plataformas e as telas se afastem.
- Fazer de cada cartão um único elemento acessível mantém curta a ordem de leitura, ao custo de chegar às ações secundárias do cartão pelo menu de ações.
```

## Botão

| Aspecto | Especificação |
| --- | --- |
| Papéis | Primário preenchido (fundo Primary, a cor de rótulo dele), tonal (fundo Muted, rótulo Tint), simples (sem fundo, rótulo Tint), destrutivo (sem fundo, rótulo no vermelho do sistema; o vermelho ainda não tem token na paleta) |
| Tamanhos | Grande: 50 de altura, largura total do conteúdo, rótulo em Headline. Compacto: 36 de altura, padding lateral `space.4`, rótulo em Subheadline com peso 600 |
| Tokens | `radius.full`; ícone até o rótulo `space.1`; botões lado a lado a `space.2`; os compactos alcançam `hit.min` com hit slop |
| Estados | Padrão, pressionado, desabilitado, carregando (ver [Estados e elevação](states.md)). O carregando é usado no Buy enquanto o Apple Pay ou o Google Pay responde: o rótulo vira um spinner e o botão mantém a largura |
| Regras | Um primário preenchido visível por tela. "Cancel for a refund" é destrutivo e pede confirmação num alerta |
| iOS ↔ Android | Botão do iOS com cantos de cápsula contínuos, glass só sobre uma foto ou o mapa ↔ botões filled, filled tonal e text do Material |
| Acessibilidade | Papel de botão; o rótulo é o texto visível com o preço lido ("Buy, £29.98"); carregando, o rótulo vira "Buy, waiting for payment" e o botão informa que está ocupado |
| Truncamento | Rótulos nunca são cortados; nos tamanhos de acessibilidade o botão cresce em altura e o rótulo quebra em duas linhas |

## Cartão de resposta

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Nome da loja; linha de status com a origem ("Has them · replied 2 min ago", "In stock now · 1 of 2 · till"); preço; tempo a pé e data limite de retirada numa linha; no máximo uma linha de ações (Buy, Buy 1, ou Show me com No thanks) |
| Tokens | Cor Card, `radius.card`, `inset.card`, `gap.block` entre blocos. Nome da loja em Headline, status em Caption 1 com Muted foreground, preço em Title 3, meta em Footnote. Entra com `spring.arrive` |
| Estados | Padrão, pressionado (o cartão inteiro), comprado (depois do Buy, o cartão de compra o substitui), dispensado (No thanks, com um snackbar para desfazer) |
| Regras | Só a melhor resposta tem Buy preenchido; as outras são tonais. Um toque em qualquer parte do cartão abre a folha de detalhes, como o Buy |
| iOS ↔ Android | O mesmo cartão nos dois; o botão Buy segue a tabela de botão |
| Acessibilidade | Um elemento. Rótulo: "Paper & Co, has them, replied 2 minutes ago, £14.99, 13 minute walk, collect by Monday 9 November". Ativá-lo abre a folha de detalhes; Buy, Show me e No thanks são ações personalizadas |
| Truncamento | Nome da loja em 1 linha; linha de status em 1 linha, a origem sai antes do status; o preço nunca é cortado |

## Cartão de compra

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Rótulo de status (com um símbolo de aviso nos finais "not charged"); loja e itens ("Paper & Co · 2 × eclipse glasses"); total; enquanto espera, uma lista de até três passos com o atual marcado; uma linha opcional "Keep looking for 1 more" |
| Tokens | Cor Card, `radius.card`, `inset.card`, `gap.block`. Status em Caption 1, loja e itens em Subheadline, total em Headline, passos em Footnote. Uma mudança de status anima com `spring.status` |
| Estados | Cada rótulo da tabela de estados do modelo conceitual; pressionado abre o recibo |
| iOS ↔ Android | O mesmo cartão nos dois |
| Acessibilidade | Um elemento. Rótulo: status, loja, itens, total ("Waiting for Paper & Co, not charged yet, 2 eclipse glasses, £29.98"). Os passos são lidos depois do total como "step 2 of 3, Paper & Co sets them aside". Mudanças de status são anunciadas de forma educada (polite) |
| Truncamento | Rótulo de status em 1 linha, o sufixo desce para baixo nos tamanhos grandes; itens em 2 linhas; o total nunca é cortado |

## Balão da conversa

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Comprador: texto, alinhado à direita. Snuffle: a marca do Snuffle (28) e uma linha de remetente "Snuffle" no primeiro balão de um grupo, com o dia quando não é hoje ("Snuffle · Sun 8 Nov"), depois o texto, alinhado à esquerda |
| Tokens | Balão do comprador em Primary com a cor de rótulo dele; balão do Snuffle em Muted com Foreground. `radius.bubble`, `inset.bubble`, texto em Body, linha de remetente em Caption 1. Largura máxima de 78% da largura do conteúdo. `space.3` entre balões do mesmo remetente, `space.5` quando o remetente muda. O balão do comprador aparece com `spring.snappy` |
| Agrupamento | Balões seguidos de um remetente formam um grupo: uma marca e uma linha de remetente por grupo |
| Estados | Enviando (o balão aparece na hora), enviado, falhou (um símbolo de tentar de novo ao lado e "Not sent · tap to retry") |
| iOS ↔ Android | Igual nos dois |
| Acessibilidade | Cada balão é lido com o remetente ("Snuffle: I'm asking 6 shops…", "You: Collect"). A marca fica oculta. Os chips de sugestão sob um balão do Snuffle vêm logo depois dele na ordem de leitura |
| Truncamento | Nunca é cortado; texto longo quebra a linha |

## Indicador de digitação

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Três pontos num balão do Snuffle, com a marca |
| Tokens | Balão Muted, `radius.bubble`, `inset.bubble`; pontos em Muted foreground, pulsando com `spring.fade` |
| Estados | Aparece só se a resposta do Snuffle levar mais de uns 300 ms; é substituído no lugar pela resposta |
| iOS ↔ Android | Igual nos dois |
| Acessibilidade | Anunciado uma vez como "Snuffle is writing"; com Reduzir Movimento os pontos ficam parados, com metade da opacidade |

## Barra de pedido e campo da conversa

| Aspecto | Especificação |
| --- | --- |
| Modos | Em Nearby: a barra de pedido, com o botão redondo de Requests à esquerda (com contador quando um pedido precisa do comprador) e o campo "Ask for anything nearby". Numa conversa: o campo "Reply", sozinho |
| Anatomia | Campo em Callout; o botão de enviar aparece dentro da ponta direita do campo só quando há texto, em Primary; na tela Ask, os chips de lugar e prazo ("Within 15 min", "By 4pm") ficam dentro do campo |
| Tokens | `radius.full` para a barra, o campo e o botão de Requests; altura de 50, igual a um botão grande; `margin.screen` nas laterais; folga de `space.8` acima dela para a última linha de conteúdo. O contador segue a página de Tags |
| Teclado | A barra sobe junto com o teclado e o conteúdo acima rola para que a última mensagem continue visível; o campo cresce até 5 linhas e depois rola |
| Materiais | iOS 26: glass interativo. iOS anterior: blur. Android: surface container high (ver [Forma e materiais](shape.md)) |
| Estados | Vazio, em foco, digitando (enviar visível), enviando (o enviar vira um spinner por um instante), enviar desabilitado só quando está offline |
| iOS ↔ Android | Próprio nos dois; o botão de Requests abre Requests com a transição de zoom no iOS e o container transform no Android (decisão 026) |
| Acessibilidade | Rótulo do campo "Ask Snuffle"; botão de enviar "Send"; botão de Requests "Requests, 1 needs you" |

## Chips de sugestão

| Aspecto | Especificação |
| --- | --- |
| Anatomia e tokens | Como o chip de sugestão em [Tags](tags.md): 32 de altura, `radius.full`, fundo Muted, `space.2` entre eles, alcançando `hit.min` |
| Posição | Acima da barra de pedido em Nearby, e sob o balão do Snuffle que os propõe numa conversa; no máximo 3 visíveis, rolando para o lado se não couberem |
| Estados | Padrão, pressionado; um toque envia o texto e os chips saem com `spring.fade` |
| iOS ↔ Android | Chip próprio ↔ suggestion chip do Material |
| Acessibilidade | Papel de botão; o rótulo é o texto do chip; agrupados como "Suggestions" |
| Truncamento | Uma linha; um chip maior que a largura do conteúdo termina em reticências, e o rótulo continua lendo o texto inteiro |

## Tile de loja e linha de loja

| Aspecto | Especificação |
| --- | --- |
| Tile de loja (Nearby) | Foto 4:3 em `tile.large` ou `tile.medium`, `radius.bubble`, até dois badges a 8 do canto da foto; nome em Headline e meta em Footnote ("Open till 6pm · 2 min walk") embaixo, a `space.1` |
| Linha de loja (listas) | Logo ou monograma de 40 num círculo, nome em Headline, meta em Footnote; padding de linha `space.4` |
| Estados | Padrão, pressionado; a meta de uma loja fechada diz "Closed · opens 9am" |
| iOS ↔ Android | Mesmo layout; uma lista de linhas é uma lista agrupada inset no iOS e uma lista do Material no Android |
| Acessibilidade | Um elemento. Rótulo: nome, badges, meta ("Rossi's Bakery, promoted, open till 6pm, 2 minute walk"); a foto não tem rótulo próprio |
| Truncamento | Nome em 1 linha; meta em 1 linha, o tempo a pé fica e a rua sai primeiro |

## Linha de pedido

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Foto do item (56, `radius.inner`) com os logos das lojas (24); nome do pedido e horário; prévia com quem falou ("Snuffle: Paper & Co has them too."); um rótulo de status; um botão compacto só quando o pedido precisa do comprador ("Buy at Rossi's"); um contador de respostas não lidas |
| Tokens | Nome em Headline, horário em Caption 1, prévia em Subheadline com Muted foreground, status em Caption 1 (Tint para "Needs you"). Padding de linha `space.4`, `gap.inside` dentro do texto |
| Estados | Padrão, pressionado, não lido (contador visível), deslizado (Close como ação no fim da linha) |
| iOS ↔ Android | Ações de deslizar no iOS ↔ um menu de toque longo no Android |
| Acessibilidade | Um elemento. Rótulo: nome, status, prévia, horário ("Birthday cake, needs you, buy by Thursday 5 November, Snuffle: Rossi's can do it with 2 days' notice, 11:02am"). O botão e o Close são ações personalizadas |
| Truncamento | Nome em 1 linha; prévia em 2 linhas; status em 1 linha |

## Sheet

| Aspecto | Especificação |
| --- | --- |
| Uso | A folha de detalhes, onde o comprador compra: loja, item, preço, quantidade, como receber, quando a cobrança acontece, Buy, a linha de risco e Directions |
| Forma | Uma page sheet com grabber e botão Close; detents médio e grande, abrindo no grande quando o conteúdo pede; o Buy fica fixo embaixo, acima da área segura |
| Tokens | Cantos da sheet do sistema no iOS, `radius.sheet` nas sheets próprias e no Android; padding `space.6`; os cartões de opção internos usam `radius.inner`. Abre a partir do que foi tocado com `spring.smooth` |
| Estados | Média, grande, fechando (arrastar para baixo ou Close), sem poder fechar enquanto o Buy está carregando |
| iOS ↔ Android | Sheet do sistema com detents ↔ modal bottom sheet do Material com scrim |
| Acessibilidade | O foco vai para o título da sheet ao abrir e volta ao cartão ao fechar; o scrim e o Close fecham; gesto de escape no iOS |

## Barra de navegação

| Aspecto | Especificação |
| --- | --- |
| Formas | Título grande em Nearby e Requests, que encolhe para título em linha quando a lista rola. Título em linha numa conversa, com Back chamado "Requests". Na página da loja, Close à esquerda e nenhum título até o nome passar por baixo da barra; a barra se esconde ao rolar para baixo e volta ao rolar para cima |
| Tokens | Título grande em Title 1; título em linha em Headline; botões da barra em `hit.min`; símbolos de 22 |
| iOS ↔ Android | Navigation bar com título grande ↔ large top app bar do Material, que encolhe para small |
| Acessibilidade | O título é um cabeçalho; Back e Close são rotulados pela ação |
| Truncamento | Título em linha em 1 linha com reticências; títulos grandes quebram em duas linhas |

## Stepper

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Rótulo "Quantity", um botão de menos, o valor, um botão de mais |
| Tokens | Botões de 36 num círculo, fundo Muted, símbolo em Tint, alcançando `hit.min`; valor em Headline; `space.3` entre as partes |
| Estados | Menos desabilitado em 1; mais desabilitado no estoque da loja ("Has 1 of 2" limita a 1); cada passo atualiza o total no rótulo do Buy |
| iOS ↔ Android | Estilo de stepper do iOS ↔ dois icon buttons do Material em volta do valor (o Material não tem stepper) |
| Acessibilidade | Um elemento ajustável: "Quantity, 2"; deslizar para cima e para baixo muda o valor |

## Controle segmentado

| Aspecto | Especificação |
| --- | --- |
| Uso | "Once" e "Every week" em Keep looking |
| Tokens | Largura total do conteúdo, `radius.full`, rótulo em Subheadline; a seleção se move com `spring.snappy` |
| Estados | Um segmento selecionado; pressionado; segmentos desabilitados não são usados |
| iOS ↔ Android | Segmented control do sistema ↔ segmented button do Material, seleção única, com check no segmento selecionado |
| Acessibilidade | Cada segmento é uma aba com "1 of 2" e o estado de seleção |

## Código de retirada

| Aspecto | Especificação |
| --- | --- |
| Anatomia | O título "Collection code · show at the counter", o código ("K7Q2"), um QR code, "Tap to enlarge" |
| Tokens | Código em Title 1, com letras espaçadas; QR sobre a superfície branca Card nos dois modos, `radius.inner`; o bloco fica no cartão do recibo |
| Estados | No recibo; ampliado em tela cheia, com o brilho da tela aumentado e restaurado ao fechar; retirado (a tela fecha e o cartão de compra mostra Collected) |
| iOS ↔ Android | Igual nos dois; o brilho pela API do sistema em cada um |
| Acessibilidade | O código é lido letra por letra ("K, 7, Q, 2"); o QR fica oculto para o leitor de tela; a tela ampliada tem botão Close |
| Truncamento | Nunca é cortado; o código fica numa linha em qualquer tamanho de texto e o QR encolhe primeiro |

## Mapa

| Aspecto | Especificação |
| --- | --- |
| Uso | O fundo fixo no topo da página da loja, centrado na loja, com um pin |
| Tokens | Cor Map ground por trás dos tiles; pin em Primary; `radius.none` nas bordas da tela |
| Estados | Carregando (só o Map ground), carregado; gestos desligados na página da loja |
| iOS ↔ Android | Apple Maps ↔ Google Maps, por um único componente de mapa; Directions abre o app de mapas do sistema |
| Acessibilidade | Oculto para o leitor de tela; a rua e o tempo a pé no cartão levam a mesma informação |

## Notificação e Live Activity

| Aspecto | Especificação |
| --- | --- |
| Notificação | Título: o nome do pedido ("Eclipse glasses"); corpo: a frase do Snuffle ("Paper & Co on King Street has them too: £14.99 a pair."); uma por resposta, agrupadas por pedido |
| Live Activity | O nome do pedido, o rótulo de status ("2 shops have them · by 4pm") e a marca do Snuffle; atualiza conforme as respostas chegam e termina quando o pedido vira compra ou termina |
| iOS ↔ Android | Notificação e Live Activity na tela bloqueada e na Dynamic Island ↔ notificação e Live Update (Android 16) ou uma notificação contínua nas versões anteriores |
| Regras | Rótulos de status como no modelo conceitual; nenhuma notificação de marketing; o protótipo desenha estas superfícies como telas simuladas (decisão 038) |
| Acessibilidade | Desenhadas pelo sistema; o texto precisa fazer sentido sem o app aberto |
| Truncamento | Corpo com até 2 linhas na tela bloqueada; o preço fica na primeira linha |

## Toast e snackbar

| Aspecto | Especificação |
| --- | --- |
| Uso | Desfazer depois de No thanks num cartão de resposta e depois de Close num pedido; confirmações curtas que não pedem decisão |
| Anatomia | Uma linha de texto e no máximo uma ação ("Request closed · Undo") |
| Tokens | Acima da barra de pedido, `margin.screen` nas laterais, `radius.full` no iOS; aparece e some com `spring.snappy`; 4 segundos, mais tempo com o leitor de tela ligado |
| iOS ↔ Android | Um banner próprio em glass (o iOS não tem toast do sistema) ↔ snackbar do Material |
| Acessibilidade | Anunciado de forma educada (polite); a ação pode ser alcançada antes de o banner sumir |

## Botão de fechar

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Um símbolo × num círculo de 30 |
| Tokens | `radius.full`, área de toque de 44; glass sobre o mapa ou uma foto, fundo Muted no resto |
| iOS ↔ Android | Close no canto superior esquerdo de uma sheet ou página apresentada ↔ o mesmo, ou um ícone de fechar na top app bar |
| Acessibilidade | Rótulo "Close" |

## Cabeçalho da página da loja

| Aspecto | Especificação |
| --- | --- |
| Anatomia | O mapa, fixo no topo; até três fotos da loja que entram pela direita sobre ele, a primeira posição deixando o mapa visível; um cartão de conteúdo com o nome, a linha de status ("Open till 6pm · Blythe Road · 2 min walk", "Made to order · 2 days' notice"), Ask [loja] como botão preenchido, Call e Directions como botões tonais, depois "Asked about recently" |
| Tokens | Fotos 3:2, `radius.bubble`, gutter de `space.3`; cartão de conteúdo na cor Card com `radius.sheet` nos cantos de cima; nome em Display title (o único momento em Gambetta nesta tela); status em Footnote |
| Estados | Em repouso (mapa visível); expandido (o cartão sobe por cima do mapa e das fotos e ocupa a tela; o título aparece na barra de navegação) |
| iOS ↔ Android | Mesmo layout; é apresentado sobre a tela que o abriu e fecha de volta para ela, por isso tem Close e não Back |
| Acessibilidade | Ordem de leitura: nome, status, Ask, Call, Directions, fotos (cada uma rotulada "[Loja] shopfront, [rua]"), respostas anteriores |
| Truncamento | O nome quebra em duas linhas, nunca mais; as linhas de status quebram |

## Resumo de truncamento

| Texto | Linhas | Regra |
| --- | --- | --- |
| Nome da loja | 1 | Reticências no fim; na página da loja, duas linhas |
| Nome do pedido | 1 | Reticências no fim |
| Prévia numa linha de pedido | 2 | Reticências no fim |
| Rótulo de status | 1 | O sufixo depois do "·" desce para uma segunda linha antes de algo ser cortado |
| Nome do item | 2 | Reticências no fim |
| Preço, total, código de retirada | Nunca | O resto do texto cede primeiro |
| Balão da conversa, rótulo de botão | Nunca | Quebra a linha |

## Fontes

- Apple, Human Interface Guidelines: buttons, sheets, navigation bars, segmented controls, steppers, notifications, Live Activities, accessibility: https://developer.apple.com/design/human-interface-guidelines
- Componentes do Material 3: buttons, bottom sheets, top app bar, segmented buttons, snackbar, chips: https://m3.material.io/components
- Android, Live Updates: https://developer.android.com/develop/ui/views/notifications/live-update
- React Native, acessibilidade (ações personalizadas, papel ajustável, live regions): https://reactnative.dev/docs/accessibility
- [Fluxo do app](../ideation/app-flow.md), v7, para as telas; [Modelo conceitual](conceptual-model.md) para as palavras e os estados; [Forma e materiais](shape.md), [Espaçamento e layout](spacing.md), [Movimento](motion.md), [Cor](colour.md), [Tipografia](typography.md), [Tags](tags.md) e [Imagens e ícones](imagery.md) para os tokens
