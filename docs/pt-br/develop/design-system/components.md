# Componentes

Todos os componentes que as telas da v7 usam, especificados a partir dos tokens das outras páginas do design system: do que cada um é feito, quais tokens usa, seus estados, suas formas no iOS e no Android e o que um leitor de tela recebe. O protótipo é construído a partir deles.

```summary
Takeaways:
- Vinte componentes, cada um numa tabela: anatomia, tokens, estados, formas no iOS e no Android, acessibilidade e truncamento.
- Só entram nomes de tokens das fundações: `radius.*`, `space.*` e os espaços semânticos, `spring.*`, os papéis de cor e os estilos de texto. Onde um valor ainda não tem token, a tabela diz.
- No máximo um controle preenchido em Índigo fica visível por vez, a ação de confirmação (Buy, Ask, enviar). Os botões tonais são neutros, o chip selecionado é Índigo tonal (Índigo 100 com texto Índigo 800), e o Índigo preenchido quer dizer que o comprador age. Cartões de resposta, de compra e linhas de pedido são um elemento só para o VoiceOver e o TalkBack, com o Buy ou o botão da linha como ação personalizada.
- Uma loja aparece no seu acento onde quer que esteja: um tile tonal com as iniciais e o toldo da marca, o acento atrás do nome na página dela, um cabeçalho tingido no recibo. "Browse by category" no Nearby é uma faixa de cartões de categoria nos mesmos pastéis, e cada um abre a tela de categoria com os lugares daquele tipo.
- A barra de pedido nunca encolhe: uma linha com o círculo de Requests e a cápsula Ask (o glifo do Snuffle, "Ask for anything nearby", um microfone). O glass dela se transforma no campo do New Request. As sheets têm título em Headline, centralizado.
- As barras não têm fundo: Voltar, Fechar e Confirmar são círculos de glass, as ações com ícone dividem uma cápsula de glass e um scroll edge effect substitui o fundo da barra. O endereço no topo de Nearby abre a sheet de localização.
- O nome de uma loja ocupa uma linha, uma prévia duas, e um preço nunca é cortado.
Call:
- Depois que uma revisão de design encontrou faltando especificações de componentes, estados, equivalentes de plataforma e regras de conteúdo, pedi que o design system ficasse completo o bastante para construir o protótipo a partir dele.
- Escolhi o HugeIcons para os ícones (decisão 042) e mantive estas especificações provisórias (decisão 043), para serem ajustadas no tamanho real, no protótipo.
- Nesta rodada pedi para seguir o iOS 26 e o Liquid Glass do jeito que os próprios apps da Apple os usam, um fluxo de localização a partir do topo de Nearby e um mapa gratuito que eu possa estilizar.
- Depois de uma revisão de marca, aprovei acentos por loja, Lavanda para o Snuffle, no máximo um controle preenchido em Índigo por tela visível, Gambetta em todo título de tela e de seção, cartões de categoria no Nearby e as ilustrações 3D nas telas (decisão 045).
- Nesta rodada fiquei confuso quando a barra de pedido recolheu enquanto eu rolava: pressioná-la é a ação principal, então ela nunca encolhe. Também disse "I don't want Shops by kind, I want to find places by category" e aprovei as correções de uma revisão de acabamento em sheets, chips, página da loja, recibo e Requests (change craft-pass-2).
- Depois decidi que a marca do Snuffle nunca fica num tile nem num avatar: ela é um glifo solto, de uma cor só, que segue o tema. Isso reverte a marca sobre um tile Lavanda da decisão 045.
AI:
- Um agente revisou o design system contra as telas da v7 e listou o que faltava. Outro agente escreveu esta página a partir dos tokens existentes e dos frames da v7; eu defini o escopo e as regras que ele tinha de seguir.
- Um agente reescreveu as especificações da barra de navegação, do Voltar, do Fechar, da sheet, da barra de pedido e do mapa a partir das sessões da WWDC 2025 sobre o novo design e da documentação do MapLibre, e acrescentou o controle de localização e o Confirmar.
- Um agente aplicou a revisão de marca: acrescentou o tile de placeholder, o cartão de categoria e o cabeçalho do recibo, mudou as especificações de botão, chip, balão e sheet e construiu tudo no app. Outro agente renderizou as ilustrações que as telas usam.
- Um agente fez a revisão de acabamento com valores exatos, depois refez a barra de pedido, o campo e a transição entre eles, o título da sheet, as superfícies da página da loja e a tela de categoria, e conferiu tudo renderizado no claro e no escuro.
Trade-offs:
- Especificar cada componente antes de o protótipo existir significa que alguns valores vão mudar quando estiverem num celular; escrever antes evita que as duas plataformas e as telas se afastem.
- Fazer de cada cartão um único elemento acessível mantém curta a ordem de leitura, ao custo de chegar às ações secundárias do cartão pelo menu de ações.
```

## Botão

| Aspecto | Especificação |
| --- | --- |
| Papéis | Primário preenchido (fundo Primary, a cor de rótulo dele), tonal (fundo Muted, rótulo Foreground), simples (sem fundo, rótulo Tint), destrutivo (sem fundo, rótulo Destructive) |
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
| Anatomia | O tile de placeholder da loja (40, no acento dela, com as iniciais); nome da loja; linha de status com a origem ("Has them · replied 2 min ago", "In stock now · 1 of 2 · till"); preço; tempo a pé e data limite de retirada numa linha; no máximo uma linha de ações (Buy, Buy 1, ou Show me com No thanks) |
| Tokens | Cor Card, `radius.card`, `inset.card`, `gap.block` entre blocos. Nome da loja em Headline, status em Caption 1 com Muted foreground, preço em Title 3, meta em Footnote. Entra com `spring.arrive` |
| Estados | Padrão, pressionado (o cartão inteiro), comprado (depois do Buy, o cartão de compra o substitui), dispensado (No thanks, com um snackbar para desfazer) |
| Regras | Só a melhor resposta tem Buy preenchido; "Buy", "Buy 1" e "Show me" nas outras são tonais, em cores neutras. Um toque em qualquer parte do cartão abre a folha de detalhes, como o Buy |
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

## Marca do Snuffle

| Aspecto | Especificação |
| --- | --- |
| Uso | Onde o Snuffle fala ou o app se mostra: a linha de remetente da conversa, o indicador de digitação, as notificações, a Live Activity, o splash e o login |
| Regra | O glifo solto da [Marca](mark.md), sem tile, círculo, avatar, preenchimento, borda ou sombra atrás. Uma cor só, que segue o tema: Foreground (escuro sobre fundos claros, claro sobre escuros), com as duas listras de menos contraste do toldo em Muted foreground. Isso reverte a "marca sobre um tile Lavanda" da decisão 045. Só o ícone do app, que o sistema desenha, mantém um tile |
| Tokens | Largura pelos tokens de tamanho, altura de 84/114 dela: inline `size.icon.nav` (22, a linha de remetente), icon `size.avatar.shop` (40, notificação e Live Activity), large `size.thumb.request` (56, login), splash `size.category.art` (120, a mesma largura do splash nativo). Tokens próprios `size.mark.*` ainda faltam |
| iOS ↔ Android | Igual nos dois |
| Acessibilidade | Decorativa e oculta; a linha de remetente ou o rótulo em volta nomeia o Snuffle |

## Balão da conversa

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Comprador: texto, alinhado à direita. Snuffle: uma linha de remetente no primeiro balão de um grupo, o glifo solto da marca (inline, sem avatar) ao lado de "Snuffle", com o dia quando não é hoje ("Snuffle · Sun 8 Nov"), depois o texto, alinhado à esquerda a partir da borda do conteúdo, sem coluna de avatar |
| Tokens | Balão do comprador em Primary com a cor de rótulo dele; balão do Snuffle em `snuffle.bubble` (Lavanda) com Foreground. `radius.bubble`, `inset.bubble`, texto em Body, linha de remetente em Caption 1. Largura máxima de 78% da largura do conteúdo. `space.3` entre balões do mesmo remetente, `space.5` quando o remetente muda. O balão do comprador aparece com `spring.snappy` |
| Agrupamento | Balões seguidos de um remetente formam um grupo: uma linha de remetente, com o glifo, por grupo |
| Estados | Enviando (o balão aparece na hora), enviado, falhou (um símbolo de tentar de novo ao lado e "Not sent · tap to retry") |
| iOS ↔ Android | Igual nos dois |
| Acessibilidade | Cada balão é lido com o remetente ("Snuffle: I'm asking 6 shops…", "You: Collect"). A marca fica oculta. Os chips de sugestão sob um balão do Snuffle vêm logo depois dele na ordem de leitura |
| Truncamento | Nunca é cortado; texto longo quebra a linha |

## Indicador de digitação

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Três pontos num balão do Snuffle, sob a linha de remetente (glifo e "Snuffle") quando abre um grupo |
| Tokens | Balão do Snuffle (`snuffle.bubble`), `radius.bubble`, `inset.bubble`; pontos em `snuffle.dot`, pulsando com `spring.fade` |
| Estados | Aparece só se a resposta do Snuffle levar mais de uns 300 ms; é substituído no lugar pela resposta |
| iOS ↔ Android | Igual nos dois |
| Acessibilidade | Anunciado uma vez como "Snuffle is writing"; com Reduzir Movimento os pontos ficam parados, com metade da opacidade |

## Barra de pedido e campo da conversa

| Aspecto | Especificação |
| --- | --- |
| Modos | Em Nearby: a barra de pedido, o círculo de Requests e a cápsula Ask. No New Request: o campo com o glifo e os chips de lugar e prazo dentro dele. Numa conversa: o campo "Reply", sem o glifo |
| Anatomia | Uma linha: um círculo de glass de 48 para Requests, `space.2`, a cápsula Ask (flexível × 48, `radius.full`). Dentro da cápsula: 16 (`size.askBar.leading`), o glifo do Snuffle no tamanho inline na cor do texto, 10 (`size.askBar.gap`), o placeholder "Ask for anything nearby" em Body na cor do texto secundário, e um microfone de 20 na cor do texto numa caixa de 44, a 14 da ponta (`size.askBar.trailing`). Com texto, o microfone vira o botão de enviar: um círculo de 36 em Primary |
| Círculo de Requests | O ícone na cor do texto. O contador é Índigo 800 nos dois modos com texto branco, com no mínimo 18 de largura, num anel de 2 pt na cor do fundo |
| Tokens | `size.field` (48) para o círculo, a cápsula e o campo; `margin.screen` nas laterais; `clearance.askBar` (48) acima dela para a última linha de conteúdo |
| Comportamento | Nunca encolhe nem some. Pressioná-la é a ação principal da tela, e uma barra que recolhia ao rolar parecia ter sumido. Os chips de sugestão ficam no New Request, não acima da barra |
| Transição | Pressionar a cápsula abre o New Request: o glass da cápsula vira o campo enquanto o teclado sobe, a tela acima faz um crossfade e o círculo de Requests se dissolve no Voltar. Na web, uma view transition dá às duas formas de glass o nome `snuffle-ask`; no iOS e no Android o campo cresce a partir do retângulo medido da cápsula com `spring.smooth` enquanto a rota faz fade. O Voltar faz o caminho inverso. Com Reduzir Movimento: um crossfade |
| Teclado | O campo sobe junto com o teclado e o conteúdo acima rola para que a última mensagem continue visível; o campo cresce até 5 linhas e depois rola |
| Materiais | Glass na web: o cartão a 55% (`rgba(255,255,255,.55)` no claro, `rgba(43,36,32,.55)` no escuro) sob blur 20 e saturação 1,6, um brilho interno de 0,5 pt no topo em branco a 60%, um fio de 0,5 pt em #100A06 a 6% e uma sombra de 0 6 20 a 10%. iOS 26: Liquid Glass; iOS anterior: blur; Android: a superfície tonal (ver [Forma e materiais](shape.md)) |
| Estados | Vazio (microfone), digitando (enviar visível), enviando (o enviar vira um spinner por um instante), enviar desabilitado quando está offline |
| iOS ↔ Android | Próprio nos dois; o círculo de Requests abre Requests com a transição de zoom no iOS e o container transform no Android (decisão 026) |
| Acessibilidade | Cápsula "Ask Snuffle" com o placeholder como dica (o glifo e o microfone fazem parte dela); rótulo do campo "Ask Snuffle"; enviar "Send"; Requests "Requests, 1 needs you" |

## Controle e sheet de localização

| Aspecto | Especificação |
| --- | --- |
| Uso | O lugar em torno do qual Nearby é montada, no topo de Nearby: "Blythe Road, W14 ›". Um toque abre a sheet "Where are you shopping?" |
| Anatomia | Controle: o ícone de localização (`Location05Icon`), o lugar em Subheadline com peso 600 e um chevron. Sheet: Current location, os lugares salvos (Home, Work), um campo de busca de endereço e, depois, o raio como controle segmentado: Within 10, 15 ou 20 min walk |
| Tokens | Controle em `hit.min`, rótulo em Tint; os lugares numa lista agrupada inset com `radius.card`; o campo com `radius.inner`; padding da sheet `space.6` |
| Estados | Localização atual (com `Gps01Icon`), um lugar salvo, um endereço buscado; localização desligada: a linha Current location pede a permissão. Escolher um lugar ou um raio fecha a sheet e recarrega Nearby, com tiles em skeleton até as lojas carregarem |
| Regras | O raio define quais lojas e ruas contam (decisão 024). O lugar ativo só muda aqui; a linha Places na sheet da conta adiciona, renomeia e apaga os lugares salvos |
| iOS ↔ Android | Sheet do sistema no detent médio, abrindo com zoom a partir do controle ↔ modal bottom sheet do Material. Web: bottom sheet |
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
| Tile de loja (Nearby) | Foto 4:3 em `tile.large` ou `tile.medium`, `radius.bubble`, até dois badges a 8 do canto da foto; nome em Headline e meta em Footnote ("Open till 6pm · 2 min walk") embaixo, a `space.1` |
| Linha de loja (listas) | Logo, ou o tile de placeholder como um círculo de 40, nome em Headline, meta em Footnote; padding de linha `space.4` |
| Foto carregando ou ausente | O tile de placeholder no acento da loja fica sob a foto, então a cor da loja aparece até a foto entrar, ou de vez se ela falhar |
| Estados | Padrão, pressionado; a meta de uma loja fechada diz "Closed · opens 9am" |
| iOS ↔ Android | Mesmo layout; uma lista de linhas é uma lista agrupada inset no iOS e uma lista do Material no Android |
| Acessibilidade | Um elemento. Rótulo: nome, badges, meta ("Rossi's Bakery, promoted, open till 6pm, 2 minute walk"); a foto não tem rótulo próprio |
| Truncamento | Nome em 1 linha; meta em até 2 linhas, quebrando antes de cortar qualquer coisa |

## Linha de pedido

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Foto do item (56, `radius.inner`) com no máximo duas lojas que responderam em círculos de 20 nos acentos delas, com as iniciais, cada um num anel de 2 pt na cor do fundo, e depois "+1"; nome do pedido e horário; prévia com quem falou ("Snuffle: Paper & Co has them too."); um rótulo de status; um botão compacto só quando o pedido precisa do comprador ("Buy at Rossi's"); um contador de respostas não lidas |
| Tokens | Nome em Headline, horário em Caption 1, prévia em Subheadline com Muted foreground, status em Caption 1 ("Needs you" na cor do texto com peso 600, para o Buy ser o único Índigo da linha). Padding de linha `space.4`, `gap.inside` dentro do texto |
| Estados | Padrão, pressionado, não lido (contador visível), deslizado (Close como ação no fim da linha) |
| iOS ↔ Android | Ações de deslizar no iOS ↔ um menu de toque longo no Android |
| Acessibilidade | Um elemento. Rótulo: nome, status, prévia, horário ("Birthday cake, needs you, buy by Thursday 5 November, Snuffle: Rossi's can do it with 2 days' notice, 11:02am"). O botão e o Close são ações personalizadas |
| Truncamento | Nome em 1 linha; prévia em 2 linhas; status em 1 linha |

## Sheet

| Aspecto | Especificação |
| --- | --- |
| Uso | A folha de detalhes, onde o comprador compra: loja, item, preço, quantidade, como receber, quando a cobrança acontece, Buy, a linha de risco e Directions |
| Forma | Uma sheet do sistema com grabber e Fechar no canto superior esquerdo; detents médio e grande, abrindo no grande quando o conteúdo pede; o Buy fica fixo embaixo, acima da área segura |
| Título | Headline (Switzer 600, 17) por padrão, centralizado entre Fechar e Confirmar, como as sheets do iOS ("Where are you shopping?"). Quando o assunto da sheet é uma loja (a sheet de detalhes), o título da barra diz o que a sheet faz ("Buy", Headline) e o nome da loja é conteúdo: Display name (Gambetta 26), alinhado à esquerda sob a barra. Sheets de linhas sobre fotos (a de lugar e a de conta) são opacas na cor `sheet` em todos os detents, para as fotos não borrarem através do glass |
| Tokens | iOS: a sheet do sistema, recuada e com glass no médio, opaca e de borda a borda no grande, sem fundo nem cantos próprios. Android e web: `radius.sheet`, com blur no médio na web e opaca na cor `sheet` (o fundo no claro, #1C1612 no escuro) em direção ao grande. O degradê do rodapé parte da cor da sheet. Uma linha selecionada mantém o fundo; o check marca a seleção. Os preços ficam na cor do texto. Padding `space.6`; os cartões de opção internos usam `radius.inner`. Abre com zoom a partir do que foi tocado (ver [Movimento](motion.md)) |
| Estados | Média, grande, fechando (arrastar para baixo ou Close), sem poder fechar enquanto o Buy está carregando |
| iOS ↔ Android | Sheet do sistema com detents ↔ modal bottom sheet do Material com alça e scrim. Web: bottom sheet, com blur no médio e sólida na altura total |
| Acessibilidade | O foco vai para o título da sheet ao abrir e volta ao cartão ao fechar; o scrim e o Close fecham; gesto de escape no iOS |

## Barra de navegação

| Aspecto | Especificação |
| --- | --- |
| Formas | Sem fundo na barra: os controles flutuam em glass sobre um scroll edge effect (blur suave e fade), com a borda hard só em listas densas. Título grande em Nearby e Requests, que rola com o conteúdo e encolhe para um título em linha à esquerda. Numa conversa, o título em linha e o Voltar como um chevron sozinho num círculo de glass, com "Requests" no menu de toque longo. Na página da loja a barra fica fixa: Voltar como um chevron num círculo de glass à esquerda em qualquer posição de rolagem, e o nome em Headline aparecendo sobre o scroll edge quando o título grande passa por baixo da barra; enquanto o wash do acento está sob a barra, o scroll edge usa a cor do wash. As ações com ícone à direita dividem uma cápsula de glass |
| Tokens | Título grande em Display large (Gambetta 48) nas telas raiz, Nearby e Requests, e Display title (Gambetta 40) nas outras, como Places; 16 dos controles da barra ou 24 da linha de cima, e 16 até o conteúdo que ele apresenta. Título em linha em Headline; círculos de Voltar, Fechar e Confirmar de uns 44; ícones de 22 |
| iOS ↔ Android | Controles flutuantes em glass sobre um scroll edge effect ↔ flexible top app bar do Material que encolhe para small, com tint ao rolar. Web: título grande, título em linha aparecendo com fade sobre uma máscara em gradiente, círculos com blur |
| Acessibilidade | O título é um cabeçalho; o Voltar é rotulado com o título da tela anterior ("Requests"), Fechar e Confirmar pela ação |
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
| Uso | O fundo fixo no topo da página da loja, centrado na loja, com um pin, inclinado a 45–60° para os prédios aparecerem em 3D |
| Tokens | Um estilo gerado a partir da paleta (ver [Imagens e ícones](imagery.md)); o pin é o `Location01Icon` em Primary; `radius.none` nas bordas da tela |
| Estados | Carregando (o Map ground e a imagem estática do mapa da loja), carregado; gestos desligados na página da loja; se o mapa não carregar, a imagem estática fica |
| iOS ↔ Android | MapLibre no iOS, no Android e na web, com um estilo só e dados do OpenStreetMap embutidos; Directions abre o app de mapas do sistema |
| Atribuição | "© OpenStreetMap contributors" num canto do mapa, no app e na gravação |
| Acessibilidade | Oculto para o leitor de tela; a rua e o tempo a pé no cartão levam a mesma informação |

## Notificação e Live Activity

| Aspecto | Especificação |
| --- | --- |
| Notificação | Título: o nome do pedido ("Eclipse glasses"); corpo: a frase do Snuffle ("Paper & Co on King Street has them too: £14.99 a pair."); uma por resposta, agrupadas por pedido. A marca ao lado é o glifo solto, sem tile de ícone |
| Live Activity | O nome do pedido, o rótulo de status ("2 shops have them · by 4pm") e a marca do Snuffle como glifo solto, sem tile de ícone; o progresso na Lavanda do Snuffle (`snuffle.dot` sobre `snuffle.bubble`); atualiza conforme as respostas chegam e termina quando o pedido vira compra ou termina |
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
| Pontos de página | `size.dot` (8), a `space.2` um do outro; o atual em Foreground, os outros em Border, mudando com `spring.fade`. Mostram onde o comprador está e não são botões; deslizar e Continue passam as páginas |
| Botões de login | Grandes (50, largura toda, `radius.full`), rótulo em Headline com o logo do provedor. Apple primeiro, preto no claro e branco no escuro, como pede o HIG da Apple; Google e Facebook sobre Card com uma Border fina; email como botão de texto em Tint. Os logos são glifos do HugeIcons no protótipo |
| Estados | Um botão de login mostra um spinner enquanto entra, e os outros ficam desativados |
| Acessibilidade | Os pontos são um elemento só ("Page 2 of 3"); cada botão de login é um botão com o próprio rótulo |

## Cabeçalho da página da loja

| Aspecto | Especificação |
| --- | --- |
| Anatomia | O mapa, fixo no topo; até três fotos da loja que entram pela direita sobre ele, a primeira posição deixando o mapa visível; um cartão de conteúdo com o nome, a linha de status ("Open till 6pm · Blythe Road · 2 min walk", "Made to order · 2 days' notice"), Ask [loja] como botão preenchido, Call e Directions como botões tonais, depois "Asked about recently" |
| Tokens | Fotos 3:2, `radius.bubble`, gutter de `space.3`, cada uma sobre o tile de placeholder da loja; cartão de conteúdo na cor Background com `radius.sheet` nos cantos de cima e o wash do acento da loja, sólido, atrás do nome, das linhas de status, das tags e das ações, terminando numa borda reta `space.6` abaixo das ações, recuado com o cartão em repouso e de borda a borda quando ele ocupa a tela; a linha de ações mantém `space.5` de folga no fim dentro do cartão; a atribuição do mapa fica entre as fotos e o cartão; nome em Display title; títulos de seção em Section title; status em Footnote |
| Estados | Em repouso (mapa visível); expandido (o cartão sobe por cima do mapa e das fotos e ocupa a tela; o título aparece na barra de navegação) |
| iOS ↔ Android | Mesmo layout; é empilhado a partir da tela que o abriu (o detalhe da loja), por isso tem Voltar, nunca Fechar (modelo conceitual) |
| Acessibilidade | Ordem de leitura: nome, status, Ask, Call, Directions, fotos (cada uma rotulada "[Loja] shopfront, [rua]"), respostas anteriores |
| Truncamento | O nome quebra em duas linhas, nunca mais; as linhas de status quebram |

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
| Uso | "Browse by category" no Nearby: um cartão por tipo que a área tem (um tipo sem loja por perto não tem cartão), numa faixa lateral |
| Anatomia | Um cartão de 120 × 164 no `tile` do acento do tipo, `radius.bubble`; uma imagem fixa do objeto 3D mais próximo no topo, renderizada na própria cor do cartão; o rótulo em Subheadline 600 embaixo, com recuo de `space.3`. Tipos sem uma imagem próxima ficam com o tile e o rótulo |
| Desempenho | Tamanho fixo, para a faixa nunca refazer o layout; memoizado; a imagem é um `expo-image` no tamanho exato, com cache em disco e chave de reciclagem; só imagens fixas na lista, sem clipes nem 3D ao vivo |
| Estados | Padrão, pressionado; um toque abre a tela de categoria com o zoom a partir do cartão |
| Acessibilidade | Papel de botão, com o tipo como rótulo; a imagem fica oculta |

## Tela de categoria

| Aspecto | Especificação |
| --- | --- |
| Uso | Os lugares de um tipo na área do comprador ("Bakeries", "Delis and cafés"), do mais perto ao mais longe |
| Anatomia | Voltar; um cartão de cabeçalho no `tile` do tipo com o nome em Display title, uma linha "3 places within 15 min walk" e a imagem do tipo; chips de filtro por rua quando os lugares ficam em mais de uma rua; linhas de loja (o tile tonal num círculo de 40, nome, "Open till 6pm · Blythe Road · 2 min walk", um chevron) |
| Transição | Zoom a partir do cartão de categoria em todas as plataformas; o título da barra aparece quando o cabeçalho rola para baixo dela |
| Estados | Uma linha abre a página da loja |
| Acessibilidade | O nome no cabeçalho é o cabeçalho da tela; cada linha lê nome e informações |

## Cabeçalho do recibo

| Aspecto | Especificação |
| --- | --- |
| Anatomia | Um cartão no `tile` do acento da loja, sem faixa; o rótulo de status, o nome da loja em Display name (Gambetta 26) e a linha dos itens; em Ready, a ilustração da cesta (88) acima dele |
| Ações | Directions é o único botão preenchido; "Extend to …" é um botão de texto simples e "Cancel for a refund" um botão de texto destrutivo |
| Acessibilidade | O nome é o cabeçalho da tela; a cesta fica oculta |

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
- Apple, "Build a UIKit app with the new design" e "Build a SwiftUI app with the new design", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/284/ e https://developer.apple.com/videos/play/wwdc2025/323/
- MapLibre: https://maplibre.org
- Componentes do Material 3: buttons, bottom sheets, top app bar, segmented buttons, snackbar, chips: https://m3.material.io/components
- Android, Live Updates: https://developer.android.com/develop/ui/views/notifications/live-update
- React Native, acessibilidade (ações personalizadas, papel ajustável, live regions): https://reactnative.dev/docs/accessibility
- [Fluxo do app](../ideation/app-flow.md), v7, para as telas; [Modelo conceitual](conceptual-model.md) para as palavras e os estados; [Forma e materiais](shape.md), [Espaçamento e layout](spacing.md), [Movimento](motion.md), [Cor](colour.md), [Tipografia](typography.md), [Tags](tags.md) e [Imagens e ícones](imagery.md) para os tokens
