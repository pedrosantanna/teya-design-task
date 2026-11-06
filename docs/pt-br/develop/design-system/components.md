# Componentes

Todos os componentes que as telas usam, especificados a partir dos tokens das outras páginas do design system: do que cada um é feito, quais tokens usa, seus estados, suas formas no iOS e no Android e o que um leitor de tela recebe. O protótipo é construído a partir deles.

```summary
Takeaways:
- Cada componente tem uma tabela: anatomia, tokens, estados, formas no iOS e no Android, acessibilidade e truncamento.
- Só entram nomes de tokens das fundações: `radius.*`, `space.*` e os espaços semânticos, `spring.*`, os papéis de cor e os estilos de texto. Onde um valor ainda não tem token, a tabela diz.
- No máximo um controle preenchido em Índigo fica visível por vez, a ação de confirmação (Buy, Ask, enviar). Os botões tonais são neutros, o chip selecionado é cartão com texto e borda Índigo 800 (Índigo 300 no escuro), e o Índigo preenchido quer dizer que o comprador age. Cartões de resposta, de compra e linhas de pedido são um elemento só para o VoiceOver e o TalkBack, com o Buy ou o botão da linha como ação personalizada.
- Uma loja aparece no seu acento onde quer que esteja: um tile tonal com as iniciais e o toldo da marca, o acento em pequenos detalhes na página neutra dela (os chips e o pin do mapa), um cabeçalho tingido no recibo. "Browse by category" no Nearby é uma faixa de cartões de categoria nos mesmos pastéis, e cada um abre a tela de categoria com os lugares daquele tipo.
- A barra de pedido nunca encolhe: uma linha com o círculo de Requests e depois a cápsula Ask (o glifo do Snuffle, "Ask for anything nearby", um microfone). O glass dela se transforma no campo do New Request. As sheets têm título em Headline, centralizado.
- As barras não têm fundo: Voltar, Fechar e Confirmar são círculos de glass, as ações com ícone dividem uma cápsula de glass e um scroll edge effect substitui o fundo da barra. O endereço no topo de Nearby abre a sheet de localização.
- O nome de uma loja ocupa uma linha, uma prévia duas, e um preço nunca é cortado.
- A página da loja põe um carrossel de fotos dentro do cartão da loja, depois das ações, com um scrim da cor de fundo para que os pontos de página mantenham o contraste, e um toque abre um visualizador em tela cheia que cresce a partir da foto, dá zoom com pinça e troca de foto com um deslize.
- As avaliações trazem cinco componentes: a sheet de avaliação que quem comprou preenche depois de uma compra e, na página da loja, o resumo do que vende, a linha de confiabilidade, o resumo das avaliações e o cartão de avaliação. Cada sinal diz a sua origem e é um elemento só para o leitor de tela, com um rótulo completo.
Call:
- Depois que uma revisão de design encontrou faltando especificações de componentes, estados, equivalentes de plataforma e regras de conteúdo, pedi que o design system ficasse completo o bastante para construir o protótipo a partir dele.
- Escolhi o HugeIcons para os ícones (decisão 042) e mantive estas especificações provisórias (decisão 043), para serem ajustadas no tamanho real, no protótipo.
- Nesta rodada pedi para seguir o iOS 26 e o Liquid Glass do jeito que os próprios apps da Apple os usam, um fluxo de localização a partir do topo de Nearby e um mapa gratuito que eu possa estilizar.
- Depois de uma revisão de marca, aprovei acentos por loja, Lavanda para o Snuffle, no máximo um controle preenchido em Índigo por tela visível, Gambetta em todo título de tela e de seção, cartões de categoria no Nearby e as ilustrações 3D nas telas (decisão 045).
- Nesta rodada fiquei confuso quando a barra de pedido recolheu enquanto eu rolava: pressioná-la é a ação principal, então ela nunca encolhe. Também disse "I don't want Shops by kind, I want to find places by category" e aprovei as correções de uma revisão de acabamento em sheets, chips, página da loja, recibo e Requests (change craft-pass-2).
- Depois decidi que a marca do Snuffle nunca fica num tile nem num avatar: ela é um glifo solto, de uma cor só, que segue o tema. Isso reverte a marca sobre um tile Lavanda da decisão 045.
- Depois pedi avaliações e um resumo do que a loja vende na página da loja. Escolhi um polegar para cima ou para baixo em vez de estrelas, a precisão de estoque só depois de 10 respostas "has it" e uma contestação para as lojas (decisão 047).
- Depois de uma crítica visual do build web, pedi que o chip selecionado fosse o chip mais forte da fileira, o controle segmentado do iOS, o cabeçalho da tela de categoria alinhado com a lista embaixo e fotos das lojas nas linhas dela, e um scrim atrás de toda sheet.
- Depois escolhi linhas tingidas mais claras na tela de categoria escura, mantendo a cor inteira como fundo, e levei o círculo de Requests para depois do campo, como o iOS 26 põe o botão secundário depois do campo de busca no Music e no Podcasts (decisão 050).
- Depois de outra crítica visual e de uma revisão de telas da versão web, pedi as correções das duas no cabeçalho e nas linhas da tela de categoria, nas sheets, no controle segmentado, no espaçamento da barra de pedido, nos chips do New Request e na sheet de avaliação. Onde as tags da sheet de avaliação não batiam com o modelo conceitual, valem as listas do modelo (decisão 047).
- Na rodada 10 pedi que o campo do chat parasse de sumir sobre o fundo branco, com um campo preenchido e um fio, e que o círculo de Requests voltasse ao início da barra de pedido, porque o microfone fica perto demais do polegar num círculo no fim. Isso reverte minha decisão 050.
- Depois pedi que a página da loja seguisse a página de anúncio do Airbnb: um carrossel de fotos abaixo do alfinete, um visualizador de fotos em tela cheia, "Found here recently" com nomes de itens e sem comprador nem preço, as avaliações mais acima e uma linha "Promoted" num destaque pago, já que as regras de publicidade do Reino Unido esperam que o destaque pago seja identificável.
- Na rodada 10 pedi que o cartão da loja ficasse preso perto do topo, sob uma faixa de mapa, com o carrossel de fotos movido para dentro dele, depois das ações e cortado por ele, que "Promoted" saísse do protótipo em todo lugar mantendo o dado (decidi não mostrar posicionamento pago por enquanto), que Delivers e New ganhassem um ícone pequeno, e que a fileira de avaliações mostrasse até cinco notas e virasse lista vertical nos tamanhos de texto de acessibilidade.
- Ainda na rodada 10 pedi seis mudanças na página da loja: Delivers e New como grupos com ícone na linha de fatos, o mesmo espaço acima e abaixo das fotos, o cartão mais alto com o alfinete centralizado na faixa de mapa, todo contêiner crescendo com o cartão enquanto só o texto mantém as quebras de linha, uma margem de mapa menor nas laterais, e o cartão de volta na cor da loja com tudo dentro recolorido e medido (decisão 056, que reverte a decisão 055).
- Depois pedi que o alfinete ficasse centralizado entre a barra de status e o cartão, um único tratamento de chip numa linha do cartão da loja, as avaliações como um bloco lateral só com um cartão de resumo estreito primeiro, e os ícones de How they do on Snuffle alinhados ao recuo do cartão.
AI:
- Um agente revisou o design system contra as telas da v7 e listou o que faltava. Outro agente escreveu esta página a partir dos tokens existentes e dos frames da v7; eu defini o escopo e as regras que ele tinha de seguir.
- Um agente reescreveu as especificações da barra de navegação, do Voltar, do Fechar, da sheet, da barra de pedido e do mapa a partir das sessões da WWDC 2025 sobre o novo design e da documentação do MapLibre, e acrescentou o controle de localização e o Confirmar.
- Um agente aplicou a revisão de marca: acrescentou o tile de placeholder, o cartão de categoria e o cabeçalho do recibo, mudou as especificações de botão, chip, balão e sheet e construiu tudo no app. Outro agente renderizou as ilustrações que as telas usam.
- Um agente fez a revisão de acabamento com valores exatos, depois refez a barra de pedido, o campo e a transição entre eles, o título da sheet, as superfícies da página da loja e a tela de categoria, e conferiu tudo renderizado no claro e no escuro.
- Um agente especificou os cinco componentes de avaliação a partir dos benchmarks no Mobbin e das regras do Reino Unido sobre avaliações, e escreveu cada rótulo de acessibilidade por inteiro.
- Um agente aplicou a crítica visual aos chips, ao controle segmentado, às sheets e à tela de categoria, mediu os novos pares com a fórmula do WCAG 2 e os conferiu no build web, no claro e no escuro.
- Um agente fez os cartões tingidos das linhas e moveu o círculo de Requests no app, conferiu que a transformação no New Request ainda parte da cápsula e tirou capturas do Nearby e de quatro telas de categoria no escuro.
- Um agente aplicou as correções dessa rodada no app e nesta página, manteve os polegares da sheet de avaliação com 88 e registrou isso na especificação, e conferiu as telas alteradas no build web, no claro e no escuro.
- Um agente fez do campo do chat um campo preenchido com os novos tokens `chat.field` e `chat.fieldEdge`, moveu o círculo de Requests para antes da cápsula, conferiu a transformação no New Request a partir da nova posição e mediu os contrastes.
- Um agente construiu o carrossel de fotos, o visualizador e a nova ordem da página da loja a partir dos frames da v10, acrescentou os tokens do scrim e do visualizador, mediu os pontos de página sobre fotos pretas e brancas no claro e no escuro e conferiu a página em repouso, rolada e com o visualizador aberto no build web.
- Um agente moveu o carrossel para dentro do cartão (agora recebe a prop `width`), tirou Promoted do tile e da página da loja, pôs os ícones de Delivers e New no Badge, fez o carrossel de avaliações virar lista vertical a partir da escala de fonte 1,5 e trocou a borda do modo escuro nas tags de avaliação por `tag.fillRaised` (1,18:1 da linha Muted). Conferi renderizado no claro e no escuro em 402 por 874; a lista vertical não foi verificada com fonte ampliada na web.
- Um agente refez o layout da página da loja para essas seis mudanças: margens animadas para que os contêineres sigam a borda do cartão, um carrossel cujas fotos alargam com o cartão, o alfinete posicionado pela tinta medida do glifo (33,3 pt do topo e do cartão), o cartão, as linhas, os chips, os cartões de avaliação e os botões movidos para o chão de tile, duas novas cores de status sobre o tile, e capturas de três lojas no claro e no escuro em repouso, no meio da subida, rolada, nas avaliações e no visualizador.
- Na rodada 12 um agente aplicou as correções da crítica visual para a página da loja e a conversa: barra fixa sólida com um fio, bloco de título centralizado na conversa, os fatos em duas fileiras, "Ask" para nomes longos, carrossel de fotos com a próxima aparecendo, link da loja de 44 pt e o espaçamento acima de "See all". Conferi cada uma nas telas renderizadas.
- Um agente centralizou o alfinete a partir do recuo superior da área segura, criou `tag.fillOnRow`, refez Ratings como um painel de cartões da mesma altura com o resumo primeiro, alinhou à esquerda a coluna de ícones das linhas de confiabilidade e mediu cada par alterado com o script WCAG 2. Conferi a página renderizada no claro e no escuro em 402 por 874 e na moldura de dispositivo da web; a pilha vertical em texto grande não foi conferida com fonte ampliada na web.
Trade-offs:
- Especificar cada componente antes de o protótipo existir significa que alguns valores vão mudar quando estiverem num celular; escrever antes evita que as duas plataformas e as telas se afastem.
- Fazer de cada cartão um único elemento acessível mantém curta a ordem de leitura, ao custo de chegar às ações secundárias do cartão pelo menu de ações.
```

## Botão

| Aspecto | Especificação |
| --- | --- |
| Papéis | Primário preenchido (fundo Primary, a cor de rótulo dele), tonal (fundo Muted, rótulo Foreground; sobre o tile de acento de uma loja, branco a `state.tonalOnTile` no lugar, 40% no claro e 6% no escuro, para manter o matiz da loja), simples (sem fundo, rótulo Tint), destrutivo (sem fundo, rótulo Destructive). Sobre um fundo colorido (as páginas Índigo de Getting started) há mais dois: invertido (fundo Foreground, rótulo Background) e discreto (sem fundo, rótulo Foreground), para que o botão contraste com qualquer passo do fundo |
| Tamanhos | Grande: 50 de altura, largura total do conteúdo, rótulo em Headline. Compacto: 36 de altura, padding lateral `space.4` (`space.3` com ícone, cuja margem lateral já funciona como padding), rótulo em Subheadline com peso 600 |
| Tokens | `radius.full`; ícone até o rótulo `space.1`; botões lado a lado a `space.2`; os compactos alcançam `hit.min` com hit slop |
| Estados | Padrão, pressionado, desabilitado, carregando (ver [Estados e elevação](states.md)). O carregando é usado no Buy enquanto o Apple Pay ou o Google Pay responde: o rótulo vira um spinner e o botão mantém a largura |
| Regras | No máximo um botão preenchido (Índigo) por tela visível: a ação de confirmação (Buy, Ask, enviar). As ações secundárias são tonais e neutras. No recibo, "Extend to Mon 16 Nov" é um botão de texto simples e "Cancel for a refund" um botão de texto destrutivo que pede confirmação num alerta |
| iOS ↔ Android | Cápsula preenchida com cantos contínuos; sobre uma foto ou o mapa, ou numa barra, glass proeminente em Índigo (`glassProminent`) ↔ botões filled, filled tonal e text do Material. Web: cápsula preenchida, Índigo com blur sobre uma foto ou o mapa |
| Acessibilidade | Papel de botão; o rótulo é o texto visível com o preço lido ("Buy, £29.98"); carregando, o rótulo vira "Buy, waiting for payment" e o botão informa que está ocupado |
| Truncamento | Rótulos nunca são cortados; nos tamanhos de acessibilidade o botão cresce em altura e o rótulo quebra em duas linhas |

## Cartão de resposta

| Aspecto | Especificação |
| --- | --- |
| Anatomia | O tile de placeholder da loja (40, no acento dela, com as iniciais); nome da loja; linha de status com a origem ("Has them", depois "Replied 2 min ago"; "In stock now", depois "1 of 2, from the shop's till"); preço; tempo a pé e data limite de retirada numa linha; no máximo uma linha de ações (Buy, Buy 1, ou Show me com No thanks) |
| Tokens | Cor Card, `radius.card`, `inset.card`, `gap.block` entre blocos. Nome da loja em Headline, status em Caption 1 com Muted foreground, preço em Title 3, meta em Footnote. Entra com `spring.arrive` |
| Estados | Padrão, pressionado (o cartão inteiro), comprado (depois do Buy, o cartão de compra o substitui), dispensado (No thanks, com um snackbar para desfazer) |
| Regras | Buy preenchido só quando uma resposta pode ser comprada; com duas ou mais ofertas todo Buy é tonal e do mesmo tamanho, porque elas são equivalentes. "Buy 1 of 2" quando a loja tem menos do que o pedido; "Show me" é tonal, em cores neutras. Um toque em qualquer parte do cartão abre a folha de detalhes, como o Buy. O nome da loja é um link com um chevron pequeno depois dele (Muted foreground, área de toque de 44 pt feita da altura da linha mais 11 pt acima e abaixo no Headline, 12 pt no Subheadline) que abre a página da loja, empurrada com Back |
| iOS ↔ Android | O mesmo cartão nos dois; o botão Buy segue a tabela de botão |
| Acessibilidade | Um elemento. Rótulo: "Paper & Co, has them, replied 2 minutes ago, £14.99, 13 minute walk, collect by Monday 9 November". Ativá-lo abre a folha de detalhes; View shop, Buy, Show me e No thanks são ações personalizadas. O rótulo do próprio nome é "Paper & Co, view shop" |
| Truncamento | Nome da loja em 1 linha; linha de status em 1 linha, a origem sai antes do status; o preço nunca é cortado |

## Cartão de compra

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Rótulo de status (com um símbolo de aviso nos finais "not charged"); a loja em Headline com os itens embaixo em Footnote ("Paper & Co", "2 × eclipse glasses"); total; enquanto espera, uma lista de até três passos com o atual marcado; uma linha opcional "Keep looking for 1 more" |
| Tokens | Cor Card, `radius.card`, `inset.card`, `gap.block`. Status em Caption 1, loja e itens em Subheadline, total em Headline, passos em Footnote. Uma mudança de status anima com `spring.status` |
| Estados | Cada rótulo da tabela de estados do modelo conceitual; pressionado abre o recibo. O nome da loja é um link com chevron que abre a página da loja, com área de toque de 44 pt, e o cartão cede a ele a sua própria área; o recibo tem um botão View shop sob o cabeçalho |
| iOS ↔ Android | O mesmo cartão nos dois |
| Acessibilidade | Um elemento. Rótulo: status, loja, itens, total ("Waiting for Paper & Co, not charged yet, 2 eclipse glasses, £29.98"). Os passos são lidos depois do total como "step 2 of 3, Paper & Co sets them aside". Mudanças de status são anunciadas de forma educada (polite); View shop é uma ação personalizada |
| Truncamento | Rótulo de status em 1 linha, o estado e o detalhe quebram como duas unidades nos tamanhos grandes; itens em 2 linhas; o total nunca é cortado |

## Marca do Snuffle

| Aspecto | Especificação |
| --- | --- |
| Uso | Onde o Snuffle fala ou o app se mostra: a linha de remetente da conversa (dentro do [avatar do Snuffle](#avatar-do-snuffle)), o indicador de digitação, as notificações, a Live Activity, o splash e o login |
| Regra | O glifo solto da [Marca](mark.md), sem tile, círculo, preenchimento, borda ou sombra atrás, exceto no avatar do Snuffle da conversa, abaixo. Uma cor só, que segue o tema: Foreground (escuro sobre fundos claros, claro sobre escuros), com as duas listras de menos contraste do toldo em Muted foreground. Isso reverte a "marca sobre um tile Lavanda" da decisão 045. Só o ícone do app, que o sistema desenha, mantém um tile |
| Tokens | Largura pelos tokens de tamanho, altura de 84/114 dela: inline `size.icon.nav` (22, a linha de remetente), icon `size.avatar.shop` (40, notificação e Live Activity), large `size.thumb.request` (56, login), splash `size.category.art` (120, a mesma largura do splash nativo). Tokens próprios `size.mark.*` ainda faltam |
| iOS ↔ Android | Igual nos dois |
| Acessibilidade | Decorativa e oculta; a linha de remetente ou o rótulo em volta nomeia o Snuffle |

## Avatar do Snuffle

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Um círculo preenchido com `snuffle.avatar` (a Lavanda do balão no claro, Lavanda 600 no escuro) que é a cabeça do cachorro: o rosto da marca o preenche, as orelhas e os cantos do toldo passam da borda, e uma faixa do círculo aparece sob o toldo. No escuro, a Lavanda 900 do balão media 1,4:1 contra o fundo da conversa e a cabeça sumia; a Lavanda 600 dá 4,26:1, com o glifo sobre ela a 4,41:1. `space.2` antes da palavra "Snuffle" na linha de remetente, centralizado na linha |
| Tokens | Círculo `size.avatar.chat` (24); o glifo é escalado a partir do círculo (cerca de 34 de largura, o raio do rosto é o do círculo) e a caixa do avatar tem a largura do glifo, então o espaço até "Snuffle" é medido a partir da orelha. Substituiu um glifo de 14 pt dentro do círculo (decisão 061). Preenchimento `snuffle.avatar`, glifo em Foreground com as duas listras do toldo em Muted foreground. Glifo sobre o preenchimento: Foreground 13,07:1 no claro e 4,41:1 no escuro; as orelhas que passam do círculo ficam sobre o fundo da conversa |
| Uso | A linha de remetente de um grupo do Snuffle, no balão da conversa e no indicador de digitação. Em nenhum outro lugar: a barra de navegação e a barra de pedido mantêm o glifo solto |
| iOS ↔ Android | Igual nos dois |
| Acessibilidade | Decorativo e oculto; o rótulo do balão nomeia o remetente ("Snuffle: …") |

## Intro do splash

| Aspecto | Especificação |
| --- | --- |
| Uso | A primeira coisa que quem abre o app pela primeira vez vê, antes do Getting started: a marca se constrói sobre o Índigo 800, depois some e passa a vez para a página 1 (componente `MarkIntro`) |
| Anatomia | A marca do Snuffle em `size.category.art` (120, a largura da imagem do splash nativo) nas cores do splash (branco e listras em Índigo 300) sobre `color.splash.ground`; o toldo enrolado no alto, cinco listras se desenrolando com 70 ms de intervalo, orelhas, olhos e nariz, duas piscadas; cerca de 1,6 s, depois 250 ms parada, 150 ms de fade da marca e 200 ms de fade do fundo |
| Tokens | `color.splash.*`; o fundo é Índigo 800 nos dois modos, e a página 1 do Getting started é o mesmo Índigo 800 no escuro, então o fundo não muda de cor na passagem |
| Estados | Reduce Motion começa no último quadro e some; `?intro=<ms>` congela num instante, para quadros de revisão |
| Acessibilidade | Decorativa e oculta; nada para tocar |

## Balão da conversa

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Comprador: texto, alinhado à direita. Snuffle: uma linha de remetente no primeiro balão de um grupo, o [avatar do Snuffle](#avatar-do-snuffle) e depois a palavra "Snuffle" em Caption 1, com o dia quando não é hoje ("Snuffle, Sun 8 Nov"), depois o texto, alinhado à esquerda a partir da borda do conteúdo, sem coluna de avatar ao lado dos balões |
| Tokens | Balão do comprador em Primary com a cor de rótulo dele; balão do Snuffle em `snuffle.bubble` (Lavanda) com Foreground. `radius.bubble`, `inset.bubble`, texto em Body, linha de remetente em Caption 1. Largura máxima de 78% da largura do conteúdo. `space.2` da linha de remetente ao seu balão, `space.3` entre balões do mesmo remetente, `space.6` quando o remetente muda. O balão do comprador aparece com `spring.snappy` |
| Agrupamento | Balões seguidos de um remetente formam um grupo: uma linha de remetente ("Snuffle") por grupo, só no primeiro balão; os balões seguintes do grupo não têm |
| Estados | Enviando (o balão aparece na hora), enviado, falhou (um símbolo de tentar de novo ao lado e "Not sent. Tap to retry") |
| iOS ↔ Android | Igual nos dois |
| Acessibilidade | Cada balão é lido com o remetente ("Snuffle: I'm asking 6 shops…", "You: Collect"). A linha de remetente é texto visível, e o rótulo de cada balão nomeia o remetente mesmo onde a linha não aparece. Os chips de sugestão sob um balão do Snuffle vêm logo depois dele na ordem de leitura |
| Truncamento | Nunca é cortado; texto longo quebra a linha |

## Indicador de digitação

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Três pontos num balão do Snuffle, sob a linha de remetente (o avatar do Snuffle e "Snuffle") quando abre um grupo |
| Tokens | Balão do Snuffle (`snuffle.bubble`), `radius.bubble`, `inset.bubble`; pontos em `snuffle.dot`, pulsando com `spring.fade` |
| Estados | Aparece só se a resposta do Snuffle levar mais de uns 300 ms; é substituído no lugar pela resposta |
| iOS ↔ Android | Igual nos dois |
| Acessibilidade | Anunciado uma vez como "Snuffle is writing"; com Reduzir Movimento os pontos ficam parados, com metade da opacidade |

## Marca farejando

| Aspecto | Especificação |
| --- | --- |
| Anatomia | O glifo do Snuffle, com 88 de largura (a largura de uma ilustração média), com o nariz e as cinco listras do toldo se movendo sobre o rosto parado. Sem balão, tile nem sombra |
| Tokens | Cores da [marca do Snuffle](#marca-do-snuffle): Foreground, com as duas listras suaves em Muted foreground. Um ciclo de 2,6 s: o nariz sobe 2,5 unidades e cresce 10% em três farejadas de 300 ms, e as listras balançam até 3,5 graus, cada uma 45 ms depois da anterior |
| Estados | Aparece na conversa enquanto o Snuffle pergunta às lojas e ninguém respondeu; a tela o remove quando chega a primeira resposta. Substitui a scooter de entrega, que lembrava delivery. `paused` deixa a marca parada |
| iOS ↔ Android | Igual nos dois |
| Acessibilidade | Decorativa e escondida dos leitores de tela; com Reduzir Movimento o glifo fica parado |

## Entrada na conversa

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Um invólucro em volta de cada item da conversa (balão, cartão, linha de status, linha de chips) que define como ele entra, sai e se move |
| Tokens | Entrada: esmaece e sobe com `spring.smooth`; `follows` atrasa um item 150 ms depois do anterior (as sugestões depois da mensagem do Snuffle). Saída: esmaece com `spring.fade`. Os vizinhos abrem espaço com a transição de layout em `spring.smooth` (`useChatLayout()`) |
| Estados | `animate` desligado para o que já estava lá; `leaves` e `moves` valem por item. Um rótulo de status que muda faz fade cruzado no lugar. O cartão de resposta mantém a própria chegada em `spring.arrive` |
| iOS ↔ Android | Igual nos dois |
| Acessibilidade | Sem efeito na ordem de leitura; o conteúdo é exposto assim que monta. Com Reduzir Movimento os itens novos só esmaecem e nada se move |

## Barra de pedido e campo da conversa

| Aspecto | Especificação |
| --- | --- |
| Modos | Em Nearby: a barra de pedido, o círculo de Requests e a cápsula Ask. No New Request: o campo com o glifo e os chips de lugar e prazo dentro dele (chips de menu, a `space.3` da borda da cápsula). Numa conversa: o campo "Reply", sem o glifo |
| Anatomia | Uma linha: um círculo de glass de 48 para Requests no início, `space.2`, a cápsula Ask (flexível × 48, `radius.full`; a posição no fim da decisão 050 foi revertida). Dentro da cápsula: 16 (`size.askBar.leading`), o glifo do Snuffle no tamanho inline na cor do texto, 12 (`size.askBar.gap`, `space.3`), o placeholder "Ask for anything nearby" em Body na cor do texto secundário, e um microfone de 20 na cor do texto secundário numa caixa de 44 (como num campo de busca do iOS: abre a mesma tela, onde o ditado é do teclado), a 16 da ponta (`size.askBar.trailing`, `space.4`). Com texto, o microfone vira o botão de enviar: um círculo de 36 em Primary |
| Círculo de Requests | Antes da cápsula, alinhado ao Back no canto superior esquerdo. O microfone fica no fim da cápsula, e um círculo ali o deixava a 8 pt de onde o polegar descansa, o que convidava a toques errados. O ícone na cor do texto. O contador fica na borda de cima à direita do círculo e é Índigo 800 nos dois modos com texto branco, com no mínimo 18 de largura, num anel de 2 pt na cor do fundo |
| Tokens | `size.field` (48) para o círculo, a cápsula e o campo; `margin.screen` nas laterais; `clearance.askBar` (48) acima dela para a última linha de conteúdo |
| Comportamento | Nunca encolhe nem some. Pressioná-la é a ação principal da tela, e uma barra que recolhia ao rolar parecia ter sumido. Os chips de sugestão ficam no New Request, não acima da barra |
| Transição | Pressionar a cápsula abre o New Request: o glass da cápsula vira o campo enquanto o teclado sobe, a tela acima faz um crossfade e o círculo de Requests some junto com ela. A cápsula começa a um círculo e um espaço da margem da tela (56 pt), então o campo cresce a partir do retângulo medido dela até a margem e o glifo e o placeholder terminam onde ficam os do próprio campo. Na web, uma view transition dá às duas formas de glass o nome `snuffle-ask`; no iOS e no Android o campo cresce a partir do retângulo medido da cápsula com `spring.smooth` enquanto a rota faz fade. O Voltar faz o caminho inverso. Com Reduzir Movimento: um crossfade |
| Teclado | O campo sobe junto com o teclado e o conteúdo acima rola para que a última mensagem continue visível; o campo cresce até 5 linhas e depois rola. O teclado pertence ao campo: fecha quando a tela do campo perde o foco (um push, um pop, um zoom) e se o campo sai da tela com foco. A barra de pedido do Nearby não tem campo, então o teclado nunca aparece no Nearby |
| Materiais | O campo do chat (New Request, o chat de um pedido, a lista de Requests) é um campo preenchido, não glass: `chat.field` com um fio de 1 pt `chat.fieldEdge` em todas as plataformas, como no iMessage. O glass a 55% sobre o fundo branco do chat media 1,0:1 e quase não aparecia; o campo tem 1,21:1 sobre o branco no claro (borda 1,53:1) e 1,29:1 sobre o Fundo no escuro (borda 1,83:1), o placeholder tem 6,28:1 e 6,60:1, e o botão de enviar em Primary tem 8,75:1 e 11,86:1 com o rótulo. A barra de pedido do Nearby e o círculo de Requests continuam em glass sobre o Fundo. Glass na web: o cartão a 55% (`rgba(255,255,255,.55)` no claro, `rgba(40,37,35,.55)` no escuro) sob blur 20 e saturação 1,6, um brilho interno de 0,5 pt no topo em branco a 60%, um fio de 0,5 pt em #100A06 a 6% e uma sombra de 0 6 20 a 10%. iOS 26: Liquid Glass; iOS anterior: blur; Android: a superfície tonal (ver [Forma e materiais](shape.md)) |
| Estados | Vazio (microfone), digitando (enviar visível), enviando (o enviar vira um spinner por um instante), enviar desabilitado quando está offline |
| iOS ↔ Android | Próprio nos dois; o círculo de Requests abre Requests com a transição de zoom no iOS e o container transform no Android (decisão 026) |
| Acessibilidade | Cápsula "Ask Snuffle" com o placeholder como dica (o glifo e o microfone fazem parte dela); rótulo do campo "Ask Snuffle"; enviar "Send"; Requests "Requests, 1 needs you" |

### Checklist da barra de pedido

Conferida com o iOS 26 (as HIG sobre campos de busca e barras de ferramentas, Liquid Glass) e com o jeito como Apple Music, Mapas e Fotos, ChatGPT, Perplexity, Google Maps e Airbnb posicionam um campo ou uma busca embaixo.

| Item | Valor | Situação |
| --- | --- | --- |
| Posição | Embaixo da tela, ao alcance do polegar, como o iOS 26 leva a busca para baixo no iPhone (Music, Fotos, Safari) e como ChatGPT e Perplexity posicionam o campo | Ok |
| Altura | 48 (`size.field`), o tamanho de um campo de busca embaixo no iOS 26; o círculo de Requests também com 48 | Ok |
| Raio | `radius.full`, uma cápsula, como os controles de Liquid Glass | Ok |
| Espaçamento | 16 antes do glifo, 12 entre as partes, 16 da ponta até o ícone do microfone, todos na escala de espaçamento | Ok |
| Ícones | Glifo no tamanho inline; microfone de 20 numa caixa de 44; ícone de Requests com 24 (`size.icon.bar`) | Ok |
| Microfone | Cor do texto secundário, parte do toque da cápsula, como o microfone num campo de busca do iOS | Corrigido nesta rodada (estava na cor do texto e parecia uma segunda ação) |
| Círculo separado | Requests fica antes da cápsula num círculo de glass próprio, no início, alinhado ao Back; o microfone no fim da cápsula fica a 8 pt de um círculo no fim | Decidido: no início (rodada 10, reverte a decisão 050) |
| Área segura | `space.2` acima da margem segura de baixo, com um degradê de rolagem a partir de 24 acima da barra | Ok |
| Material | A receita de glass de [Forma e materiais](shape.md), a mesma do Voltar, do Fechar e das sheets | Ok |
| Nunca minimiza | A barra nunca encolhe nem some ao rolar; as barras de abas da Apple minimizam, mas aqui pressionar a barra é a ação principal da tela | Ok (uma diferença de propósito) |
| Teclado | O Nearby não tem campo de texto; o teclado abre no New Request, a partir da transição | Ok |

## Controle e sheet de localização

| Aspecto | Especificação |
| --- | --- |
| Uso | O lugar em torno do qual Nearby é montada, no topo de Nearby: "Blythe Road, W14 ›". Um toque abre a sheet "Where are you shopping?" |
| Anatomia | Controle: o ícone de localização (`Location05Icon`), o lugar em Subheadline com peso 600 e um chevron. Sheet: Current location, os lugares salvos (Home, Work), um campo de busca de endereço e, depois, o raio como controle segmentado: Within 10, 15 ou 20 min walk |
| Tokens | Controle em `hit.min`, rótulo em Tint; os lugares numa lista agrupada inset com `radius.card`; o campo com `radius.inner`; padding da sheet `space.6` |
| Estados | Localização atual (com `Gps01Icon`), um lugar salvo, um endereço buscado; localização desligada: a linha Current location pede a permissão. Escolher um lugar ou um raio fecha a sheet e recarrega Nearby, com tiles em skeleton até as lojas carregarem |
| Regras | O raio define quais lojas e ruas contam (decisão 024). O lugar ativo só muda aqui; a linha Places na sheet da conta adiciona, renomeia e apaga os lugares salvos |
| iOS ↔ Android | Sheet do sistema no detent ajustado, abrindo com zoom a partir do controle ↔ modal bottom sheet do Material. Web: bottom sheet |
| Acessibilidade | Controle: papel de botão, rótulo "Shopping near Blythe Road, W14, within 15 minutes' walk", dica "Change place". Cada linha lê o nome e se está selecionada |
| Truncamento | Uma linha; a rua é cortada antes do distrito do código postal |

## Chips de sugestão

| Aspecto | Especificação |
| --- | --- |
| Anatomia e tokens | Como o chip de sugestão em [Tags](tags.md): 32 de altura, `radius.full`, `space.2` entre eles, alcançando `hit.min`. Fundo Card sobre o fundo da tela; `chat.fill` sobre o fundo de um chat |
| Posição | Sob o balão do Snuffle que os propõe: três no New Request, sob o balão de abertura do Snuffle, e numa conversa quando o Snuffle oferece escolhas. Não ficam em Nearby. Quebram para uma segunda linha se não couberem |
| Estados | Padrão, pressionado; um toque envia o texto e os chips saem com `spring.fade` |
| iOS ↔ Android | Chip próprio ↔ suggestion chip do Material |
| Acessibilidade | Papel de botão; o rótulo é o texto do chip; agrupados como "Suggestions" |
| Truncamento | Uma linha; um chip maior que a largura do conteúdo termina em reticências, e o rótulo continua lendo o texto inteiro |

## Tile de loja e linha de loja

| Aspecto | Especificação |
| --- | --- |
| Tile de loja (Nearby) | Foto 4:3 em `tile.large` ou `tile.medium`, `radius.bubble`, um badge Delivers, com um símbolo de scooter, a 8 do canto da foto quando a loja entrega (New e Promoted não aparecem no tile; Promoted não aparece em lugar nenhum do protótipo, embora o dado continue); nome em Headline e os fatos embaixo, a `space.1`: o estado ("Open until 6pm") e a caminhada com um símbolo de pegadas ("2 min walk"), quebrando entre os dois num tile médio (Linhas de metadados na página [Conteúdo](content.md)) |
| Linha de loja (listas) | A foto da loja como miniatura de 40 com `radius.inner` (sobre o tile de placeholder enquanto carrega), senão o logo ou o tile de placeholder como um círculo de 40; nome em Headline, fatos embaixo (estado, caminhada e a rua onde nenhum filtro a nomeia, cada um uma unidade que quebra inteira); padding de linha `space.4` |
| Foto carregando ou ausente | O tile de placeholder no acento da loja fica sob a foto, então a cor da loja aparece até a foto entrar, ou de vez se ela falhar |
| Estados | Padrão, pressionado; uma loja fechada diz "Closed" em Foreground com "opens 9am" depois |
| iOS ↔ Android | Mesmo layout; uma lista de linhas é uma lista agrupada inset no iOS e uma lista do Material no Android |
| Acessibilidade | Um elemento. Rótulo: nome, badges, fatos ("Rossi's Bakery, open, until 6pm, 2 min walk"); a foto não tem rótulo próprio |
| Truncamento | Nome em 1 linha; fatos em até 2 linhas, quebrando entre unidades antes de cortar qualquer coisa |

## Linha de pedido

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Foto do item (56, `radius.inner`) sem nada por cima; nome do pedido e horário; o último status do Snuffle na voz dele como prévia ("Snuffle: Rossi's needs your answer"; as linhas de cada estado estão em [Conteúdo](content.md)); um rótulo de status sem ponto, ícone nem símbolo de repetir; um contador de respostas não lidas ou de pedidos que precisam do comprador. Sem botão na linha: o comprador abre o pedido para decidir |
| Tokens | Nome em Headline, horário em Caption 1, prévia em Subheadline com Muted foreground, status em Caption 1 ("Needs you" na cor do texto com peso 600, para o Buy ser o único Índigo da linha). Padding de linha `space.4`, `gap.inside` dentro do texto |
| Estados | Padrão, pressionado, não lido (contador visível), deslizado (Close como ação no fim da linha) |
| iOS ↔ Android | Ações de deslizar no iOS ↔ um menu de toque longo no Android |
| Acessibilidade | Um elemento. Rótulo: nome, status, prévia, horário ("Birthday cake, needs you, buy by Thursday 5 November, Snuffle: Rossi's needs your answer, 11:02am"). O Close é uma ação personalizada |
| Truncamento | Nome em 1 linha; prévia em 2 linhas; status em 1 linha |

## Sheet

| Aspecto | Especificação |
| --- | --- |
| Uso | A folha de detalhes, onde o comprador compra: loja, item, preço, quantidade, como receber, quando a cobrança acontece, Buy, a linha de risco e Directions |
| Forma | Uma sheet do sistema com grabber e Fechar no canto superior esquerdo; o detent ajustado por padrão: abre na altura do cabeçalho, do conteúdo e da área segura de baixo, até o detent grande, e rola quando o conteúdo é mais alto. Médio e grande ficam para a sheet em que ver a página atrás ajuda (um mapa, um chat com o qual a pessoa compara) ou para uma lista longa; o Buy fica fixo embaixo, acima da área segura |
| Título | Headline (Switzer 600, 17) por padrão, centralizado entre Fechar e Confirmar, como as sheets do iOS ("Where are you shopping?"). Quando o assunto da sheet é uma loja (a sheet de detalhes), o título da barra diz o que a sheet faz ("Buy", Headline) e o nome da loja é conteúdo: Display name (Gambetta 26), alinhado à esquerda sob a barra |
| Fundo | Toda sheet tem o mesmo fundo: a cor `sheet`, um tom mais escuro que o fundo no modo claro (#DEDAD5 sobre #EEE9E2, 1,15:1) e um passo do Stone mais claro no escuro (#1C1D1E sobre #0B0C0D, 1,16:1). Ela é opaca em todo detent (a 94% sobre um blur, as fotos de trás apareciam como manchas cinza) e mantém o contorno do glass, e um scrim fica atrás de toda sheet: texto a 20% no claro, preto a 48% no escuro (`color.sheetScrim`, `state.sheetScrim`), entrando junto com a sheet. O que fica sobre a sheet sobe um nível: linhas agrupadas e campos de texto são cartão no claro (1,39:1) e secundário no escuro (1,40:1), as listas agrupadas usam `radius.bubble` (20, o canto inset grouped do iOS 26), e Fechar e Confirmar no cabeçalho são glass no claro e um círculo secundário sólido no escuro (1,40:1; o glass dava 1,09:1 na sheet). Os chips e o controle segmentado seguem as regras deles, abaixo. No escuro, os separadores das linhas usam a borda, porque o separador escuro é a cor do secundário |
| Tokens | iOS: recuada no médio e de borda a borda no grande. Android e web: `radius.sheet`, opaca na cor `sheet`. O degradê do rodapé parte da cor da sheet. Uma linha selecionada mantém o fundo; o check marca a seleção. Os preços ficam na cor do texto. Cabeçalho e conteúdo na `margin.screen` nas laterais, para o Fechar e o Confirmar ficarem alinhados com as linhas, e `inset.sheet` (24) abaixo do conteúdo; os cartões de opção internos usam `radius.inner`. A alça é `color.grabber`, mais discreta que o título. Um subtítulo opcional fica sob o título em Headline no cabeçalho, em Subheadline na cor do texto secundário, a `space.1` dele. Abre com zoom a partir do que foi tocado (ver [Movimento](motion.md)) |
| Estados | Ajustada, média, grande, fechando (arrastar para baixo ou Close), sem poder fechar enquanto o Buy está carregando; uma sheet ajustada acompanha o conteúdo: se a altura muda com ela aberta (resultados de busca, tags depois de uma resposta), ela vai à nova altura com `spring.smooth` |
| iOS ↔ Android | Sheet do sistema com detents, em que o ajustado é o detent personalizado do iOS 16 em diante (um detent que devolve a altura do conteúdo) ↔ modal bottom sheet do Material, que envolve o conteúdo até o estado expandido, com alça. As duas sobre o mesmo scrim. Web: a forma do iOS |
| Teclado | Abrir uma sheet fecha o teclado de qualquer campo embaixo dela; um campo dentro da sheet sobe a sheet junto com o teclado; fechar a sheet fecha o teclado dela |
| Acessibilidade | O foco vai para o título da sheet ao abrir e volta ao cartão ao fechar; o scrim e o Close fecham; gesto de escape no iOS |

## Barra de navegação

| Aspecto | Especificação |
| --- | --- |
| Formas | Sem fundo na barra: os controles flutuam em glass sobre um scroll edge effect (blur suave e fade), com a borda hard só em listas densas. Título grande em Nearby e Requests, que rola com o conteúdo e encolhe para um título em linha à esquerda. Numa conversa, o bloco do título fica centralizado na tela: "Snuffle" com o seu glifo na primeira linha e o pedido na segunda, e o Voltar como um chevron sozinho num círculo de glass, centralizado nesse bloco, com "Requests" no menu de toque longo. A barra da conversa é um preenchimento sólido do fundo da conversa, com um fio de 0,5 pt. Na página da loja a barra fica fixa: Voltar como um chevron num círculo de glass à esquerda em qualquer posição de rolagem, e o nome em Headline aparecendo sobre o scroll edge quando o título grande passa por baixo da barra; a barra é um preenchimento sólido do tile do cartão, com um fio de 0,5 pt embaixo, quando o nome aparece, para que nenhum conteúdo apareça cortado ao lado do Voltar. As ações com ícone à direita dividem uma cápsula de glass |
| Tokens | Título grande em Display large (Gambetta 48) nas telas raiz, Nearby e Requests, e Display title (Gambetta 40) nas outras, como Places; 16 dos controles da barra ou 24 da linha de cima, e 16 até o conteúdo que ele apresenta. Título em linha em Headline; círculos de Voltar, Fechar e Confirmar de uns 44; ícones de 22 |
| Subtítulo da conversa | O nome do pedido em Caption 1 sob "Snuffle", centralizado, sem imagem ao lado. A foto do pedido fica na borda final da barra, redonda, com área de toque de 44 pt ("Change photo, Eclipse glasses"); um toque abre uma sheet com seis fotos do item numa grade de 3 × 2, a atual com anel e um check, e escolher uma troca a foto na barra e na linha do pedido em Requests |
| iOS ↔ Android | Controles flutuantes em glass sobre um scroll edge effect ↔ flexible top app bar do Material que encolhe para small, com tint ao rolar. Web: título grande, título em linha aparecendo com fade sobre uma máscara em gradiente, círculos com blur |
| Acessibilidade | O título é um cabeçalho; o Voltar é rotulado com o título da tela anterior ("Requests"), Fechar e Confirmar pela ação |
| Truncamento | Título em linha em 1 linha com reticências; títulos grandes quebram em duas linhas |

## Sheet de seleção de foto

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Uma [Sheet](#sheet) no detent ajustado, no fundo de sheet, com título, o nome do pedido como subtítulo e uma grade de tiles quadrados de foto, três por linha. Seis fotos na conversa |
| Tokens | Tiles em `radius.inner`; o selecionado tem um anel `size.edge.focus` em Primary e um selo de check. O anel sempre ocupa espaço (transparente quando desligado), então escolher não move nada |
| Estados | Um tile selecionado. O toque reduz o tile e dispara o haptic de seleção; a tela fecha a sheet depois da escolha e a nova foto aparece na barra e na linha do pedido |
| iOS ↔ Android | Igual nos dois; a sheet toma a forma de cada plataforma |
| Acessibilidade | A grade é um grupo de rádio; cada tile lê "Photo 2 of 6" e fica marcado quando selecionado |

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
| Uso | "Once" e "Every week" em Keep looking; o raio de caminhada na sheet de lugar |
| Tokens | Largura total do conteúdo, `radius.full`, rótulo em Subheadline; a seleção se move com `spring.snappy`. O padrão do iOS: um indicador um nível acima do trilho, sob a sombra delicada de cartão, sem borda. Claro: indicador cartão sobre trilho Border (1,53:1; sobre o secundário dava 1,29:1 e o trilho 1,08:1 na sheet). Os segmentos têm 32 de altura com 6 de área de toque extra em cima e embaixo (44); o padding do trilho é `size.segmented.inset` (2). Escuro: indicador Stone 360 sobre trilho cartão (1,41:1; um indicador secundário dava 1,15:1). `color.segmented.track` e `color.segmented.thumb`. Rótulo selecionado na cor do texto, Subheadline 600; os outros na cor do texto, Subheadline. O Android mantém o papel do chip selecionado (`chipSelected`, `onChipSelected`) com um check |
| Estados | Um segmento selecionado; pressionado; segmentos desabilitados não são usados |
| iOS ↔ Android | Segmented control do sistema ↔ segmented button do Material, seleção única, com check no segmento selecionado |
| Acessibilidade | Cada segmento é uma aba com "1 of 2" e o estado de seleção |

## Código de retirada

| Aspecto | Especificação |
| --- | --- |
| Anatomia | O título "Collection code, show at the counter", o código ("K7Q2"), um QR code, "Tap to enlarge" |
| Tokens | Código em Title 1, com letras espaçadas; QR sobre a superfície branca Card nos dois modos, `radius.inner`; o bloco fica no cartão do recibo |
| Estados | No recibo; ampliado em tela cheia, com o brilho da tela aumentado e restaurado ao fechar; retirado (a tela fecha e o cartão de compra mostra Collected) |
| iOS ↔ Android | Igual nos dois; o brilho pela API do sistema em cada um |
| Acessibilidade | O código é lido letra por letra ("K, 7, Q, 2"); o QR fica oculto para o leitor de tela; a tela ampliada tem botão Close |
| Truncamento | Nunca é cortado; o código fica numa linha em qualquer tamanho de texto e o QR encolhe primeiro |

## Mapa

| Aspecto | Especificação |
| --- | --- |
| Uso | O fundo fixo no topo da página da loja e o mapa da sheet Directions, na rua real da loja, com um pin, inclinado a 45–60° para os prédios aparecerem em 3D. Ele desenha o caminho a pé da porta do comprador (163 Blythe Road) até a loja na cor de acento da loja, contornado na cor On detail, com a porta como um ponto branco com anel da mesma cor. O mapa gira para a porta ficar à esquerda da loja e o caminho correr pela faixa larga de mapa que a tela mostra, se afasta (até o zoom 12,5) até o caminho inteiro caber, e centraliza o caminho na faixa; o pin acompanha a loja para o lado e mantém a altura. Longe de casa (o lugar Work) o mapa fica na loja, no zoom da área, sem desenhar o caminho, já que o caminho sai da porta de casa; ele também fica na loja na folha de detalhes de uma resposta |
| Tokens | Um estilo gerado a partir da paleta (ver [Imagens e ícones](imagery.md)); o pin é o `Location01Icon` em Primary; `radius.none` nas bordas da tela |
| Estados | Carregando (o Map ground; a imagem estática da área só para o mapa simples, já que mostraria as ruas erradas sob o caminho de uma loja), carregado; gestos desligados na página da loja; se o mapa não carregar, a imagem estática fica |
| iOS ↔ Android | MapLibre no iOS, no Android e na web, com um estilo só e dados do OpenStreetMap embutidos; Directions abre o app de mapas do sistema |
| Atribuição | "© OpenStreetMap contributors" num canto do mapa, no app e na gravação; onde o conteúdo cobre o mapa (a página da loja), uma linha centralizada no pé da página (`attribution={false}` no mapa) |
| Acessibilidade | Oculto para o leitor de tela; a rua e o tempo a pé no cartão levam a mesma informação |

## Notificação e Live Activity

| Aspecto | Especificação |
| --- | --- |
| Notificação | Título: o nome do pedido ("Eclipse glasses"); corpo: a frase do Snuffle ("Paper & Co on King Street has them too: £14.99 a pair."); uma por resposta, agrupadas por pedido. A marca ao lado é o glifo solto, sem tile de ícone |
| Live Activity | O nome do pedido, o rótulo de status ("2 shops have them", com o prazo depois) e a marca do Snuffle como glifo solto, sem tile de ícone; o progresso na Lavanda do Snuffle (`snuffle.dot` sobre `snuffle.bubble`); atualiza conforme as respostas chegam e termina quando o pedido vira compra ou termina |
| iOS ↔ Android | Notificação e Live Activity na tela bloqueada e na Dynamic Island ↔ notificação e Live Update (Android 16) ou uma notificação contínua nas versões anteriores |
| Regras | Rótulos de status como no modelo conceitual; nenhuma notificação de marketing; o protótipo desenha estas superfícies como telas simuladas (decisão 038) |
| Acessibilidade | Desenhadas pelo sistema; o texto precisa fazer sentido sem o app aberto |
| Truncamento | Corpo com até 2 linhas na tela bloqueada; o preço fica na primeira linha |

## Toast e snackbar

| Aspecto | Especificação |
| --- | --- |
| Uso | Desfazer depois de No thanks num cartão de resposta e depois de Close num pedido; confirmações curtas que não pedem decisão |
| Anatomia | Uma linha de texto e no máximo uma ação ("Request closed", depois Undo) |
| Tokens | Acima da barra de pedido, `margin.screen` nas laterais, `radius.full` no iOS; aparece e some com `spring.snappy`; 4 segundos, mais tempo com o leitor de tela ligado |
| iOS ↔ Android | Um banner próprio em glass (o iOS não tem toast do sistema) ↔ snackbar do Material |
| Acessibilidade | Anunciado de forma educada (polite); a ação pode ser alcançada antes de o banner sumir |

## Botões de fechar e confirmar

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Fechar: um × num círculo de glass. Confirmar: um check num círculo com tint Índigo |
| Tokens | Uns 44 de diâmetro, `radius.full`, ícones de 22; glass no iOS 26, blur no iOS anterior e na web |
| Posição | Fechar no canto superior esquerdo de sheets e telas apresentadas (`role: .close`). Confirmar no canto superior direito de uma sheet que salva uma edição, como renomear um lugar (`role: .confirm`) |
| iOS ↔ Android | Círculos de glass ↔ um ícone de fechar na top app bar ou no cabeçalho da sheet, e um "Done" filled ou tonal. Web: círculos com blur |
| Acessibilidade | Rótulos "Close" e "Done" |

## Pontos de página e botões de login

| Aspecto | Especificação |
| --- | --- |
| Uso | Primeiro uso: os pontos sob as três páginas do Getting started; os botões de login na tela de login |
| Pontos de página | `size.dot` (8), a `space.2` um do outro; o atual em Foreground, os outros em Foreground a `state.pageDotOff` (55%; 35% deixava os pontos em 2,17:1 no Índigo claro), para que tomem a cor do fundo embaixo deles; sobre uma foto da loja ficam brancos (`onLightbox`) numa pílula preta (`state.photoPill`, 30%), mudando com `spring.fade`. Mostram onde o comprador está e não são botões; deslizar e Continue passam as páginas |
| Botões de login | Apple, Google e Facebook são um só botão, a cápsula secundária: grande (50, largura toda, `radius.full`), Card com borda de 1 pt em Border (`size.edge.control`), o rótulo "Continue with …" em Headline e Foreground, o ícone do provedor com 20 pt (`space.5`) à frente. Só o ícone muda, e continua a forma publicada pelo dono: o logo da Apple, o G colorido do Google, o f branco do Facebook sobre #1877F2. O logo e o título da Apple são os dois Foreground, quase preto no claro e branco no escuro, como pede o HIG dela. A Apple vem primeiro. O email é um botão de texto em Tint, no 600 do Headline. No claro o botão se separa do fundo em 1,2:1 e a borda em 1,3:1; no escuro, 1,3:1 e 1,8:1 |
| Botão do Getting started | Sobre um fundo colorido de onboarding a ação é Foreground-inverse: uma cápsula Foreground com rótulo Background (preta no claro, quase branca no escuro), não Primary, que ficaria Índigo sobre Índigo ou sobre pastel. O rótulo da última página é "Get started", os outros "Continue" |
| Estados | Um botão de login mostra um spinner enquanto entra, e os outros ficam desativados |
| Acessibilidade | Os pontos são um elemento só ("Page 2 of 3"); cada botão de login é um botão com o próprio rótulo |

## Cabeçalho da página da loja

| Aspecto | Especificação |
| --- | --- |
| Anatomia | O mapa com o alfinete da loja, fixo atrás da tela; um cartão de conteúdo logo abaixo de uma faixa de mapa com o alfinete centralizado nela, com o nome, a linha de fatos ("Open until 6pm" numa linha própria, depois "2 min walk", "Blythe Road", "Delivers" com um símbolo de scooter e "New" com um símbolo de brilhos, cada um um grupo com seu símbolo, os dois últimos quando valem; com os quatro, a caminhada e a rua formam uma fileira e Delivers e New a seguinte, para que um quarto grupo nunca quebre sozinho, e cada grupo fica a 12 do outro), Ask [loja] como botão preenchido (só "Ask" quando o nome passa de 10 caracteres, com o nome da loja no rótulo falado, para a fileira caber em 402 pt e o último botão manter o padding do cartão), Call e Directions como botões tonais, o carrossel de fotos, depois as seções nesta ordem: What they sell (o resumo do que vende), Found here recently (até cinco nomes de itens em linhas simples, cada uma com quando foi encontrado no fim da linha, "Yesterday", "2 days ago"; nada para tocar, sem fotos), How it works (retirada, entrega e "Made to order" com o prazo quando a loja faz sob encomenda), Ratings (uma fileira lateral de cartões da mesma altura direto sobre o cartão, o resumo das avaliações primeiro e depois até cinco cartões de avaliação, indo até as bordas do cartão; embaixo, uma lista agrupada com "See all 38 reviews" e "How ratings work"; sem avaliações, uma lista agrupada só com "No ratings yet" e "How ratings work"; uma pilha vertical nos tamanhos de texto de acessibilidade) e How they do on Snuffle (linhas de confiabilidade) |
| Tokens | O cartão é o tile do acento da loja (`shop.accent.<hue>.tile`), no claro e no escuro, sólido e sem glass, com `radius.sheet` nos cantos de cima: 1,29 a 1,35:1 sobre o chão do mapa no claro e 1,71 a 1,83:1 no escuro, então não tem borda. Ele fica dois passos de `space.8` (96) abaixo da faixa da barra, já que a faixa de mapa é o cabeçalho da página, de modo que a faixa de mapa do topo da tela até o cartão (a área segura incluída) tem o alfinete no meio do que sobra sob a barra de status: a tinta do alfinete fica centralizada entre a base da barra de status (o recuo superior da área segura, sob a Dynamic Island) e a borda de cima do cartão, o mesmo espaço acima e abaixo. A moldura de dispositivo da web fornece o mesmo recuo. Em repouso o mapa aparece `space.3` (12) de cada lado; o conteúdo tem `space.6` (24) de padding dentro disso. As linhas, os cartões de avaliação e o bloco "What they sell" são `cardOnTile` (branco no claro, o cartão tingido no escuro), os chips e as tags de avaliação `tag.fillOnRow` (o Background no claro, 1,21:1 sobre a linha branca; `tag.fillRaised` no escuro, 1,36 a 1,41:1 sobre a linha; sem borda), as cápsulas Call e Directions `state.tonalOnTile`, e o texto secundário `mutedForegroundOnTile`; cada par está em [Cores](colour.md#acentos-das-lojas). O Ask é o único Índigo preenchido. O Liquid Glass fica no Back e na barra fixa. Na rolagem: nos primeiros `space.6` de percurso o cartão cresce até a largura total e todo contêiner dentro dele cresce junto, com a borda esquerda na do cartão: o carrossel de fotos (a altura fica, então nada abaixo se mexe), as linhas agrupadas, os grupos de chips, os cartões de avaliação, a fileira de ações e os separadores. Só os blocos de texto (o nome, as linhas de status e de fatos, e o parágrafo sob uma lista) mantêm a largura que têm em repouso, então as quebras de linha nunca mudam; o início deles acompanha a borda. O grupo das fotos tem `gap.section` acima, até as ações, e `gap.section` abaixo, até o primeiro título; as ações ficam `space.3` abaixo dos fatos. A fileira de ações, o carrossel de fotos e o carrossel de avaliações rolam para os lados além do padding até as bordas do cartão e são cortados ali; em repouso, o primeiro item fica na borda do texto. A borda de rolagem da barra de navegação usa o tile. Nome em Display title; títulos de seção em Section title; status e fatos em Subheadline, Muted foreground sobre o tile, com espaços não separáveis dentro de cada fato ("Open till 6pm", "Blythe Road", "2 min walk"), para a linha só quebrar entre fatos; a atribuição do mapa, "© OpenStreetMap contributors", é uma linha centralizada em Caption 2 no pé do cartão, `gap.section` abaixo da última seção, então aparece quando a pessoa rola para baixo e nunca fica sobre o cabeçalho; o Back sobre o mapa é glass no claro e, no escuro, um círculo Muted sólido com borda Border (o glass ali é Card, igual ao mapa) |
| Estados | Em repouso (uma faixa de mapa acima do cartão mostra o alfinete); expandido (o cartão sobe por cima do mapa e ocupa a tela; o título aparece na barra de navegação sobre um scroll edge na cor do cartão, numa barra sólida na cor do cartão, com um fio embaixo, para que nenhuma linha apareça atrás do título) |
| iOS ↔ Android | Mesmo layout; é empilhado a partir da tela que o abriu (o detalhe da loja), por isso tem Voltar, nunca Fechar (modelo conceitual) |
| Acessibilidade | Ordem de leitura: Voltar, fotos (cada uma um botão rotulado "[Loja] shopfront, [rua], 1 of 3"), nome, status, Ask, Call, Directions, depois as seções |
| Truncamento | O nome quebra em duas linhas, nunca mais; as linhas de status quebram |

## Carrossel de fotos

| Aspecto | Especificação |
| --- | --- |
| Uso | As fotos da loja na página da loja, entre o alfinete do mapa e o cartão; a página de anúncio do Airbnb é a referência |
| Anatomia | Dentro do cartão da loja, depois da fileira de ações e antes de What they sell: uma foto por vez na largura do contêiner menos 24 (em repouso, a largura da tela menos os `space.3` do mapa e os `space.6` de padding de cada lado, crescendo com o cartão quando ele ocupa a tela), 2:1 em repouso (`layout.carouselRatio`) e a mesma altura depois, cada foto com `radius.inner`, sobre o tile de placeholder da loja; troca de página para os lados, com 8 entre as fotos e 16 pt da próxima aparecendo (`space.4`); pontos de página centralizados na foto, sobre a borda de baixo dela, a `space.3` dela; com uma foto só não há pontos nem troca de página |
| Tokens | Um scrim preto (`color.photoScrim`) sobe da borda de baixo de cada foto: `state.photoScrim` (40%) na borda, sumindo em `layout.photoScrimReach` da altura. Os pontos ficam numa pílula preta em `state.photoPill` (20%; 30% parecia um losango escuro e 12% deixava os pontos brancos em 2,5 a 2,8:1 sobre uma foto clara). Os pontos são o PageDots: brancos, e os outros em `state.pageDotOff` |
| Contraste | Pontos brancos sobre a foto com o scrim e a pílula, na altura dos pontos, sobre uma foto totalmente branca e uma clara (#F2F2F2): 3,0:1 e 3,3:1; sobre uma foto escura a razão passa de 12:1. Os pontos inativos ficam entre 1,5 e 2,5:1 e só marcam a posição, como no Getting started |
| Estados | Carregando (o tile de placeholder aparece até a foto surgir, `spring.fade`); falha (o tile fica); pressionada (abre o visualizador) |
| Acessibilidade | A lista é "[Loja] photos"; cada foto é um botão lido como "[rótulo], 2 of 3" com a dica "Opens the photo full screen" |

## Visualizador de fotos

| Aspecto | Especificação |
| --- | --- |
| Uso | Uma visão em tela cheia das fotos da loja, aberta a partir de uma foto do carrossel (frame "Photo viewer" no app flow v10) |
| Anatomia | Fundo preto (`color.lightbox`, igual no claro e no escuro); a foto na largura da tela, centralizada; o Fechar de vidro no canto superior esquerdo, abaixo da barra de status; "1 of 3" centralizado nessa linha em Headline (`color.onLightbox`, branco sobre preto, 21:1); "Pinch to zoom, swipe for the next photo" em Footnote sob a foto (`color.onLightboxMuted`, 11,4:1) |
| Gestos | A pinça dá zoom até 4x a partir do centro da foto; um dedo move a foto ampliada dentro das bordas dela; toque duplo dá zoom de 2,5x e volta; deslizar passa para a próxima foto, e fica desligado enquanto a foto está ampliada |
| Movimento | Abrir faz uma cópia da foto tocada crescer do retângulo dela até o lugar dela com `spring.smooth`, enquanto o fundo preto aparece; fechar faz o contrário para a foto em que o visualizador está, e o carrossel já está nela. Com Reduzir movimento, ou quando a foto de onde abriu saiu da tela, ele aparece com `spring.fade` |
| iOS ↔ Android | Mesmo layout; o Fechar é de vidro no iOS e na web, um círculo tonal no Android. O visualizador é apresentado pelo portal da raiz, então na web fica dentro da moldura do celular |
| Acessibilidade | O visualizador é modal; cada foto é lida com seu rótulo, a contagem como "Photo 1 of 3", o Fechar como "Close photo" |

## Tile de placeholder

| Aspecto | Especificação |
| --- | --- |
| Uso | Uma loja sem foto, ou enquanto a foto carrega: cartões de resposta, linhas de pedido, linhas de loja, tiles, fotos da página da loja |
| Anatomia | O fundo `tile` do acento da loja; as iniciais (no máximo duas) no `ink` do acento; o toldo de cinco listras da marca como uma faixa no topo, alternando `ink` e `wash` |
| Tamanhos | Grande (tiles, fotos): faixa de 12, iniciais em Headline. Pequeno (miniaturas de 40): faixa de 8, iniciais em Subheadline 600. Mínimo (círculos de 24): iniciais em Caption 2, sem faixa. Os círculos não têm faixa |
| Regras | O acento vem do tipo da loja e nunca muda; o tile é a cor da loja, não um estado |
| Acessibilidade | Oculto; o cartão ou a linha leva o nome da loja |

## Cartão de categoria

| Aspecto | Especificação |
| --- | --- |
| Uso | "Browse by category" no Nearby, a primeira seção abaixo do título: um cartão por tipo que a área tem (um tipo sem loja por perto não tem cartão), numa faixa lateral ordenada pelo número de lojas daquele tipo abertas agora na área (o único estado de horário da área, já que ainda não há horário por loja), as com mais lojas primeiro; empates seguem uma prévia fixa de frequência no dia a dia (café, padaria, farmácia, jornaleiro, açougue, deli, florista, ferragens, papelaria, livros, brinquedos, ótica, moda, câmeras, presentes, bolsas); tipos sem nenhuma aberta ficam por último, na mesma prévia. Depois os matizes são espalhados: um cartão pode subir no máximo duas posições quando o anterior tem o mesmo pastel, para a ordem por contagem quebrar só o necessário. Essa regra é uma suposição: ainda não há dados de uso, e a prévia é um palpite meu sobre o que o comprador quer num dia comum. A Deliveroo personaliza a tela inicial por pedidos e horário do dia ([help.deliveroo.com/articles/3203714](https://help.deliveroo.com/articles/3203714)); com histórico de pedidos, a prévia daria lugar às contagens do próprio comprador |
| Anatomia | Um cartão de 120 × 164 no `tile` do acento do tipo, `radius.bubble`; uma imagem fixa do objeto 3D mais próximo no topo, renderizada na própria cor do cartão; o rótulo em Headline (17) embaixo, com recuo de `space.3`, curto o bastante para uma linha ("Toys", "Butchers"). Tipos sem uma imagem próxima ficam com o tile e o rótulo |
| Desempenho | Tamanho fixo, para a faixa nunca refazer o layout; memoizado; a imagem é um `expo-image` no tamanho exato, com cache em disco e chave de reciclagem; só imagens fixas na lista, sem clipes nem 3D ao vivo |
| Estados | Padrão, pressionado; um toque abre a tela de categoria com o zoom a partir do cartão |
| Acessibilidade | Papel de botão, com o tipo como rótulo; a imagem fica oculta |

## Tela de categoria

| Aspecto | Especificação |
| --- | --- |
| Uso | Os lugares de um tipo na área do comprador ("Bakeries", "Delis and cafés"), do mais perto ao mais longe |
| Anatomia | A tela inteira é o `tile` do tipo. Voltar, em glass com o preenchimento `tonalOnTile` (o preenchimento de cartão parecia um afundado nos tiles escuros); um cabeçalho sem fundo nem recuo lateral próprio, alinhado com os chips e a lista: o nome em Display title, a `gap.aboveTitle` da área da barra para o Voltar ficar a 32 do título, quebrando a linha antes da imagem; uma linha "3 places within 15 min walk" `space.2` abaixo, em `mutedForegroundOnTile` ("1 of 3 places within 15 min walk" enquanto uma rua está escolhida); a imagem do tipo apoiada na borda de baixo do cabeçalho, a `gap.title` dos chips; chips de filtro por rua quando os lugares ficam em mais de uma rua, All e no máximo quatro ruas, na regra de chip sobre tile; linhas de loja numa lista agrupada com `radius.card` (a foto da loja como miniatura de 40 com `radius.inner`, senão o tile tonal num círculo de 40, nome, os fatos (estado, caminhada e a rua enquanto All está escolhido), um chevron; a rua sai enquanto uma rua está escolhida, e "2 min walk" nunca se separa) |
| Linhas | As linhas usam o `cardOnTile` do acento sob a sombra suave: Card branco no claro; no escuro, um cartão tingido em OKLCH L 0,44, C 0,026 a 0,032 no matiz do acento, 1,40 a 1,48:1 mais claro que o tile, porque as linhas em Card pareciam buracos na cor (decisão 050). Os fatos e o chevron usam `mutedForegroundOnTile` (Stone 880 no escuro, 5,50:1 ou mais). A tela fica em `<Ground value="tile" accent>`. Ver [Cor](colour.md) |
| Transição | Zoom a partir do cartão de categoria em todas as plataformas; o título da barra aparece quando o cabeçalho rola para baixo dela |
| Estados | Uma linha abre a página da loja |
| Acessibilidade | O nome no cabeçalho é o cabeçalho da tela; cada linha lê nome e informações |

## Cabeçalho do recibo

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Um cartão no `tile` do acento da loja, sem faixa; o rótulo de status, o nome da loja em Display name (Gambetta 26) e a linha dos itens; em Ready, a ilustração da cesta (88) acima dele |
| Ações | Directions é o único botão preenchido; "Extend to …" é um botão de texto simples e "Cancel for a refund" um botão de texto destrutivo |
| Acessibilidade | O nome é o cabeçalho da tela; a cesta fica oculta |

## Resumo do que vende

| Aspecto | Especificação |
| --- | --- |
| Uso | "What they sell", a primeira seção da página da loja |
| Anatomia | Chips de categoria (os de uma loja conectada vêm das categorias e dos mais vendidos do caixa; os de uma loja consultada, das respostas "Had it" passadas e do tipo de loja); uma linha de preço em Footnote, "Most items £2–£35, from past answers" ou "from the shop's till"; "Asked about recently", até três respostas passadas como linhas ("Tide clock batteries", "Had it, 2 hours ago"), que saem onde a página já mostra Found here recently, que resume as mesmas respostas só pelo nome |
| Tokens | Chips como chips de sugestão sobre a linha Card, a `space.2` um do outro, quebrando em no máximo duas linhas; cada um é `tag.fillOnRow`, sem borda e sem cor de tile (o Background sobre a linha branca no claro, 1,21:1; `tag.fillRaised` no escuro, 1,36 a 1,41:1; veja [Tags](tags.md)), `gap.block` entre os chips, a linha de preço e as linhas |
| Estados | Um toque no chip abre o Ask com "[categoria] at [loja]" preenchido; sem respostas passadas, "Asked about recently" sai; ainda sem categorias, só o tipo da loja ("Stationer") |
| Regras | Os itens continuam sem página: uma linha de resposta passada não abre nada, e um chip pergunta. A linha de preço nunca arredonda uma faixa para parecer mais barata. Na página da loja, What they sell traz as faixas e a faixa de preço, e "Found here recently" logo abaixo lista só os nomes, sem toque, com uma linha que diz de onde vêm; as linhas "Had it, 2 hours ago" por resposta ficam no chat. Uma lista de nomes de itens sem toque informa a fonte dela |
| Acessibilidade | Os chips são botões com o rótulo "Ask about [categoria]"; a linha de preço lê "Most items 2 to 35 pounds, from past answers" |

## Linha de confiabilidade

| Aspecto | Especificação |
| --- | --- |
| Uso | "How they do on Snuffle", o que o Snuffle viu nas respostas e nas compras: taxa de resposta, precisão de estoque, tempo de resposta |
| Anatomia | Uma linha por sinal: um glifo do HugeIcons, o sinal em Subheadline ("Answers 9 in 10 requests", "Had it 24 of 25 times they said yes", "Usually replies in 6 min"), a origem em Footnote ("from 31 requests on Snuffle"). Uma loja conectada mostra "Stock from the till" no lugar do tempo de resposta. Abaixo de 10 respostas "has it", a precisão de estoque sai e a seção abre com "New on Snuffle" |
| Tokens | Linhas sobre Card com a sombra delicada, `gap.block` entre as linhas. O glifo fica numa coluna `size.icon.bar` que começa no recuo inicial da linha (`space.4`, o mesmo do texto das linhas ao redor), então o glifo fica tão longe da borda do cartão quanto os títulos, e é centralizado na primeira linha do título quando a linha quebra ou tem a origem embaixo. O separador é recuado até o texto, como numa lista do iOS, e toda linha tem o mesmo padding vertical (`space.3` acima e abaixo do texto). Texto em Foreground e Muted foreground |
| Estados | Padrão; nova (menos de 10 respostas "has it"); loja conectada |
| Regras | Contagens como estão, nunca arredondadas para cima ("24 of 25", não "100%"); sem escala de cor nem semáforo; nunca "verified" |
| Acessibilidade | Um elemento por linha, com rótulo completo: "Had it 24 of 25 times they said yes, from 31 requests on Snuffle" |

## Resumo das avaliações

| Aspecto | Especificação |
| --- | --- |
| Uso | O primeiro cartão do carrossel de Ratings na página da loja |
| Anatomia | "92%" em Display title com "would go back" em Body ao lado e "38 people" embaixo em Subheadline, Muted foreground (com menos de 5 avaliações, só a contagem em Title 3, "3 people so far"); depois até três tags com as contagens num grupo de chips que quebra ("Had it as promised 21"), as mais curtas primeiro, só as que cabem inteiras no cartão (uma tag mais longa sai, nunca é cortada). No cartão o número fica acima da legenda, e os cartões de avaliação vêm depois dele na mesma fileira. "See all 38 reviews" (abre a lista completa) e "How ratings work" não ficam no cartão: são uma lista agrupada de duas linhas com chevron sob o carrossel, em `cardOnTile` como as outras linhas |
| Tokens | Um cartão com 86% da largura do conteúdo, a mesma largura dos cartões de avaliação e das fotos, `cardOnTile` na página da loja (Card fora dela), `radius.inner`, `space.4` por dentro; `gap.block` entre o número e as tags; sem links dentro, o cartão tem cerca de 250 pt de altura, e os cartões de avaliação ficam dessa altura. Os chips são o tratamento único de chip numa linha do cartão da loja: `tag.fillOnRow`, sem borda, sem cor de tile, de altura `size.chip`, `space.3` de padding lateral, a tag em Footnote e a contagem em Muted foreground, a `space.2` um do outro; uma tag que não coubesse não aparece. Claro: o Background sobre a linha branca, 1,21:1, Foreground 16,3:1 e a contagem 6,3:1. Escuro: `tag.fillRaised` (Stone 360), 1,36 a 1,41:1 sobre as quatro linhas `cardOnTile`, Foreground 10,3:1 e a contagem 7,7:1. Nunca são o preenchimento de um controle e nada acontece ao toque |
| Estados | Sem avaliações: "No ratings yet" com "Snuffle has asked them 4 times" depois; poucas (menos de 5): "3 people so far" e as tags, sem porcentagem ("New on Snuffle" fica em How they do on Snuffle e não se repete aqui); muitas: a porcentagem; com resumo: "Summary by Snuffle from buyers' notes" acima de duas linhas de texto |
| Regras | Sem estrelas, sem média, sem decimal; a porcentagem é arredondada para baixo; a contagem de pessoas fica sempre ao lado. As tags negativas aparecem com as contagens, como as positivas |
| Acessibilidade | Um elemento: "Would go back, 92 percent of 38 people". Cada tag lê "Had it as promised, 21". O glifo de polegar fica oculto; o número e as palavras levam o sentido, nunca só a cor |

## Cartão de avaliação

| Aspecto | Especificação |
| --- | --- |
| Uso | A nota de uma pessoa. Na página da loja, até cinco cartões depois do resumo das avaliações no carrossel de Ratings (uma pilha vertical nos tamanhos de texto de acessibilidade, content.md); na tela de avaliações, todas as notas como linhas de uma lista agrupada, sobre o tile de acento da loja |
| Anatomia | Na página da loja, um cartão com 86% da largura do conteúdo, para o próximo aparecer mais ou menos tanto quanto a próxima foto acima, com a mesma altura do cartão de resumo ao lado, a nota limitada a cinco linhas, a `space.3` um do outro, direto sobre o tile do cartão sem contêiner em volta, encaixando cartão a cartão na borda do texto e indo até as bordas do cartão enquanto rolam; a nota da própria pessoa vem primeiro. O cartão de resumo tem a mesma largura, e sem cartões de avaliação ele ocupa a largura toda. Os cartões são `cardOnTile`: 1,45 a 1,52:1 sobre o tile no claro e 1,40 a 1,48:1 no escuro, como as linhas. Sem rotação automática. Na tela de avaliações, uma linha agrupada simples, sem tile próprio. Nos dois casos: o primeiro nome da pessoa em Subheadline semibold com o mês ("Oct 2026") em Footnote, Muted foreground, no fim da mesma linha ("You" para a nota da própria pessoa); só para um polegar para baixo, o glifo de polegar para baixo antes do nome (um polegar para cima não tem rótulo); embaixo a nota em Body sem aspas, limitada a cinco linhas nos cartões da página da loja e inteira na tela de avaliações; sem avatar nem tipo de compra; um separador recuado até o texto entre as linhas; a resposta da loja, se houver, recuada sob "Reply from [loja]" |
| Tokens | O cartão usa o `cardOnTile` da página da loja com a sombra delicada (fora dela, Card), `radius.inner`, `space.4` por dentro em todos os lados, `space.3` entre cartões. A linha agrupada tem o fundo Card, `radius.inner` na primeira e na última linha do grupo, `space.4` no início e `space.3` acima e abaixo, linhas a `space.1` uma da outra; nome em Subheadline 600, mês em Footnote com Muted foreground, nota em Body; a resposta sobre `chat.fill` com `radius.bubble` |
| Estados | Padrão; com nota; loja respondeu; editada ("Edited Oct 2026") |
| Regras | Só primeiros nomes, nunca sobrenomes nem fotos (os nomes do protótipo vêm de um conjunto fixo de primeiros nomes britânicos); os cartões em destaque espelham a divisão geral, então com 10% de polegares para baixo pelo menos um cartão negativo aparece quando há mais de 10 avaliações; as negativas nunca são retidas |
| Acessibilidade | Um elemento por cartão: "Priya, October 2026. Wouldn't go back. Not ready when I came. Reply from Paper & Co: …". A fileira é uma área rolável com o rótulo "Ratings and reviews, 3 of 38". Com Reduzir movimento, o arremesso para de uma vez em vez de desacelerar |

## Sheet de avaliação

| Aspecto | Especificação |
| --- | --- |
| Uso | Aberta pelo Rate no cartão de compra ("Collected · rate Paper & Co"), pelo recibo ou pelo chip Rate sob o balão do Snuffle "How was Paper & Co?" depois de uma entrega |
| Anatomia | Detent ajustado; título "Would you go back?", com "Your visit to Paper & Co" embaixo, no cabeçalho; dois botões grandes lado a lado, polegar para cima "Yes" e polegar para baixo "No"; escolhida uma resposta, Send como botão preenchido logo abaixo deles, para ficar visível sem rolar, depois as tags dela como chips de filtro (até três) sob "What went well?" ou "What went wrong?" e um campo opcional de nota ("Anything to add?", placeholder "Optional, 140 characters") |
| Tokens | Sheet como na tabela de sheet; botões de polegar com 88 de altura (duas alturas de toque), tonais, `radius.bubble` (20, o raio fixo de um tile de seleção, ver [Forma](shape.md)), selecionados no papel de selecionado com um `Tick02Icon` no canto; o título dos motivos a 24 do Send e a 8 dos chips; chips a `space.2` um do outro; o campo de nota sobre Card com um contador em Caption 1 |
| Estados | Vazia (Send oculto); respondida (as tags entram com `spring.arrive`); enviando; enviada (a sheet fecha e o cartão de compra lê "Collected · rated"); editando (aberta de novo dentro de 30 dias, com a resposta anterior selecionada) |
| Regras | Feita em menos de 10 segundos: um toque e Send bastam. As tags mudam com a resposta, e trocar a resposta as limpa. Nenhuma oferta ou recompensa vem junto com a avaliação |
| iOS ↔ Android | Sheet com detent ajustado ↔ bottom sheet modal do Material que envolve o conteúdo |
| Acessibilidade | Os polegares são um par de botões de alternância com os rótulos "Would go back" e "Wouldn't go back"; os chips anunciam "selected, 2 of 3"; o contador é lido quando restam 20 caracteres |

## Resumo de truncamento

| Texto | Linhas | Regra |
| --- | --- | --- |
| Nome da loja | 1 | Reticências no fim; na página da loja, duas linhas |
| Nome do pedido | 1 | Reticências no fim |
| Prévia numa linha de pedido | 2 | Reticências no fim |
| Rótulo de status | 1 | O detalhe desce inteiro para uma segunda linha antes de algo ser cortado |
| Nome do item | 2 | Reticências no fim |
| Preço, total, código de retirada | Nunca | O resto do texto cede primeiro |
| Balão da conversa, rótulo de botão | Nunca | Quebra a linha |
| Nota da avaliação | 3 | "More" abre a nota inteira; no máximo 140 caracteres |
| Linha de sinal, resumo das avaliações | Nunca | Quebra a linha |

## Fontes

- Apple, Human Interface Guidelines: buttons, sheets, navigation bars, segmented controls, steppers, notifications, Live Activities, accessibility: https://developer.apple.com/design/human-interface-guidelines
- Apple, "Build a UIKit app with the new design" e "Build a SwiftUI app with the new design", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/284/ e https://developer.apple.com/videos/play/wwdc2025/323/
- MapLibre: https://maplibre.org
- Componentes do Material 3: buttons, bottom sheets, top app bar, segmented buttons, snackbar, chips: https://m3.material.io/components
- Android, Live Updates: https://developer.android.com/develop/ui/views/notifications/live-update
- React Native, acessibilidade (ações personalizadas, papel ajustável, live regions): https://reactnative.dev/docs/accessibility
- Competition and Markets Authority, Fake reviews guidance (CMA208), 2025: https://assets.publishing.service.gov.uk/media/67eeb64fe9c76fa33048c790/CMA208_-_Fake_reviews_guidance.pdf
- [Benchmarks](../../discover/benchmarks.md), seção de avaliações, para os padrões por trás dos componentes de avaliação
- [Fluxo do app](../ideation/app-flow.md), v10, para as telas; [Modelo conceitual](conceptual-model.md) para as palavras e os estados; [Forma e materiais](shape.md), [Espaçamento e layout](spacing.md), [Movimento](motion.md), [Cor](colour.md), [Tipografia](typography.md), [Tags](tags.md) e [Imagens e ícones](imagery.md) para os tokens
