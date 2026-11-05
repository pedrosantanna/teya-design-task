# Estados e elevação

Como um controle fica quando pressionado, desabilitado, selecionado, em foco ou carregando; como as superfícies se empilham; e o que cada família de telas mostra quando está vazia, carregando, offline ou com erro. Os valores partem das páginas de cor, forma e movimento.

```summary
Takeaways:
- Cinco estados de interação com tokens: pressionado (escala 0,97 e uma camada de estado de 10%, `spring.press`), desabilitado (conteúdo a 38% sobre um contêiner a 12%), selecionado (um chip cartão com texto e borda Índigo; o indicador do controle segmentado), foco (um anel de 2 px na versão web) e carregando (um spinner no lugar do rótulo, mesma largura).
- Três níveis de elevação: conteúdo plano, controles flutuantes em glass ou superfície tonal, e sheets modais sobre um scrim (texto a 20% no claro, preto a 48% no escuro). Nada de sombra no modo escuro.
- Os skeletons copiam a forma das linhas e dos cartões que substituem e só aparecem depois de uns 300 ms.
- Toda mensagem de erro diz o que aconteceu, onde está o dinheiro e o que o comprador pode fazer em seguida.
- A página da loja tem quatro estados de avaliação: sem avaliações, poucas (menos de 5, sem porcentagem), muitas e loja respondeu. A precisão de estoque espera 10 respostas "has it".
Call:
- Depois que uma revisão de design encontrou faltando especificações de componentes, estados, equivalentes de plataforma e regras de conteúdo, pedi que o design system ficasse completo o bastante para construir o protótipo a partir dele.
- Mantive estes estados provisórios (decisão 043); o protótipo vai mostrar quais telas vazias e de erro precisam de um desenho próprio.
- Depois pedi avaliações na página da loja e escolhi mostrar a precisão de estoque só depois de 10 respostas "has it" (decisão 047).
- Depois de uma crítica visual, pedi que o chip selecionado ficasse um nível acima dos não selecionados, o controle segmentado do iOS e um scrim atrás de toda sheet.
AI:
- Um agente revisou o design system contra as telas da v7 e não encontrou estados além do caminho feliz e dos finais de pagamento. Outro agente escreveu esta página a partir dos tokens existentes; eu defini o padrão de erro: o que aconteceu, o dinheiro e o próximo passo.
- Um agente escreveu os estados de avaliação a partir das regras de contagem baixa da página de Conteúdo.
- Um agente reescreveu o estado selecionado e o scrim das sheets a partir da crítica visual e os mediu no claro e no escuro.
Trade-offs:
- Uma camada de estado com porcentagem fixa é simples de construir nas duas plataformas e fica um pouco mais fraca sobre os fundos claros do que sobre o Índigo.
- Esperar 300 ms antes de um skeleton faz uma resposta lenta mostrar nada por um instante; mostrar o skeleton na hora faria ele piscar a cada resposta rápida.
```

## Estados de interação

| Estado | Visual | Tokens | Observações |
| --- | --- | --- | --- |
| Pressionado | Escala para 0,97 e uma camada de estado de uns 10% da cor do conteúdo sobre o fundo | `spring.press` na entrada, `spring.snappy` ao soltar | Começa no toque; um cartão é pressionado inteiro |
| Desabilitado | Conteúdo a 38% de opacidade sobre o contêiner a 12% | Sem movimento | Usado pouco: um controle desabilitado diz o porquê ao lado, ou não aparece |
| Selecionado | Chips de filtro: fundo cartão, rótulo Índigo 800 em 600 e uma borda Índigo 800 de 1,5 pt (escuro: cartão, Índigo 300 e borda de 1 pt); os chips não selecionados ficam um nível abaixo. Segmentos: um indicador cartão sob a sombra delicada sobre um trilho secundário, rótulo na cor do texto em 600 (escuro: indicador Stone 360 sobre trilho cartão). Opções: o check e o título em semibold | `color.chipOn`, `size.edge.selected`, `color.segmented.*`, `spring.snappy` | Chips, segmentos e opções da folha de detalhes; o rótulo continua o mesmo. O papel Índigo tonal (`chipSelected`) continua no passo atual do cartão de compra, no botão segmentado do Android e nos polegares da sheet de avaliação |
| Foco | Um anel visível de 2 px em Tint, 2 px para fora do controle, seguindo o canto dele | O raio do controle mais 2 | Versão web e uso por teclado (WCAG 2.4.7); nos celulares o sistema desenha o próprio foco |
| Carregando | Um spinner substitui o rótulo; o controle mantém a largura e o fundo | `spring.fade` entre rótulo e spinner | Só esse controle para de receber toques; o Close e o resto da tela continuam ativos |

Os valores de desabilitado e pressionado são os valores de estado do Material 3; o iOS não publica um equivalente, então as duas plataformas usam esses.

## Elevação e camadas

| Nível | O que fica nele | Material | Sombra |
| --- | --- | --- | --- |
| Plano | Conteúdo: tiles, linhas, cartões, balões | Superfícies sólidas (Background, Card, Muted) | Nenhuma; as superfícies se separam pela luminosidade |
| Flutuante | A barra de pedido, botões de fechar sobre o mapa ou uma foto, toasts | Glass no iOS 26, blur no iOS anterior, um surface container tonal no Android | A sombra do próprio glass do sistema no modo claro; nenhuma no modo escuro |
| Modal | Sheets, o código de retirada em tela cheia, alertas | Sheet do sistema ou superfície com `radius.sheet` sobre um scrim: texto a 20% (claro) ou preto a 48% (escuro) nas sheets, `color.sheetScrim`; preto a 40% nos alertas | Nenhuma no modo escuro; o scrim faz o trabalho |

Ordem de trás para a frente:

| Ordem | Camada |
| --- | --- |
| 1 | Conteúdo |
| 2 | Cabeçalho fixo (a barra de navegação encolhida, a borda do cartão da página da loja) |
| 3 | Barra de pedido e campo da conversa |
| 4 | Sheet |
| 5 | Scrim |
| 6 | Alerta |
| 7 | Toast e snackbar |

Um toast fica acima de um alerta para que o Undo continue alcançável; o scrim de um alerta cobre a sheet abaixo dele.

## Estados vazios

| Família de telas | Quando | O que aparece |
| --- | --- | --- |
| Nearby | Nenhuma loja a até 15 min | A frase do Snuffle "No shops on Snuffle within 15 minutes of you yet." e duas ações: Ask anyway (o Snuffle tenta lojas mais longe) e Change area |
| Requests | Nenhum pedido ainda | A marca do Snuffle, "Ask for anything nearby and your requests will show here.", e a barra de pedido em foco ao tocar |
| Requests, um filtro | Nada naquele filtro | Uma linha com o nome do filtro ("Nothing needs you right now."), com All ainda selecionável |
| Conversa | Um pedido novo antes de o Snuffle responder | O balão do comprador, depois o indicador de digitação |
| Página da loja | Nenhuma resposta anterior | A seção "Asked about recently" sai, em vez de aparecer vazia |
| Página da loja, avaliações | Nenhuma avaliação ainda | "No ratings yet · Snuffle has asked them 4 times" em Ratings; How they do on Snuffle continua aparecendo |
| Compra | Nunca fica vazia | n/a |

## Estados de avaliação

| Estado | Quando | Ratings | How they do on Snuffle |
| --- | --- | --- | --- |
| Sem avaliações | Ninguém que comprou avaliou ainda | "No ratings yet · Snuffle has asked them 4 times" | Taxa e tempo de resposta; "New on Snuffle" até 10 respostas "has it" |
| Poucas | De 1 a 4 avaliações | "New on Snuffle · 3 buyers so far", as tags com as contagens e os cartões de avaliação; sem porcentagem | Como acima, ou com a precisão de estoque quando houver 10 respostas "has it" |
| Muitas | 5 avaliações ou mais | "92% would go back · 38 buyers", as tags, três cartões de avaliação que espelham a divisão, "All 38 ratings ›" | Taxa de resposta, precisão de estoque, tempo de resposta |
| Loja respondeu | Uma avaliação tem a resposta única da loja | A resposta abaixo do cartão, como "Reply from [loja]" | Sem mudança |

Uma loja conectada mostra "Stock from the till" no lugar do tempo de resposta em todos os estados. Uma avaliação fica editável por 30 dias; um cartão editado mostra "Edited Oct 2026".

## Estados de carregamento

| Família de telas | Skeleton | Observações |
| --- | --- | --- |
| Nearby | Formas de tile em `tile.large` e `tile.medium` com duas linhas de texto sob cada uma, em Muted | As formas seguem o grid real, para nada pular quando as fotos carregam |
| Requests | Linhas com um quadrado de 56, duas linhas de texto e uma linha curta de status | No máximo três linhas |
| Conversa | O indicador de digitação; as linhas de resposta na lista de lojas perguntadas mostram "Asked" na hora | Sem balões skeleton: a resposta do Snuffle chega inteira |
| Página da loja | O Map ground, as formas das fotos e o cartão com duas linhas de texto | O nome aparece assim que é conhecido |
| Compra | A forma do cartão com a linha de status | Mudanças de status animam com `spring.status` |

Os skeletons só aparecem depois de uns 300 ms e passam para o conteúdo com `spring.fade`. As fotos aparecem em fade sobre o skeleton; uma foto que falha deixa o placeholder sem foto de [Imagens e ícones](imagery.md).

## Condições

| Condição | O que aparece | O que continua funcionando |
| --- | --- | --- |
| Offline | Um banner sob a barra de navegação: "You're offline. I'll send this when you're back." | Ler pedidos, compras e o código de retirada (guardados no aparelho); mensagens novas ficam na fila; o Buy fica bloqueado com "Buy needs a connection." |
| Localização desligada | Nearby mostra a área de Places (Home, work) com "Using Home. Turn on location for shops near where you are." | Perguntar funciona com a área salva; Turn on location abre os Ajustes |
| Sem área salva e localização desligada | Nearby pede um código postal ou uma rua | Nada mais até a área ser definida |
| Notificações negadas | Depois do primeiro envio, uma frase do Snuffle: "Notifications are off, so I'll keep answers here and on the Requests button." com Turn on | O contador no botão de Requests e a lista de Requests levam tudo |
| Nenhuma loja por perto | Como o estado vazio de Nearby | Ask anyway e Change area |

## Padrão de erro

Toda mensagem de erro tem três partes, nesta ordem: o que aconteceu, a situação do dinheiro, o próximo passo. A situação do dinheiro é sempre dita, mesmo quando nada foi cobrado, porque é a primeira pergunta do comprador.

| Final | O que aconteceu | Dinheiro | Próximo passo |
| --- | --- | --- | --- |
| Vendido | A Paper & Co vendeu os últimos pares antes de separar | Você não foi cobrado | A resposta da próxima loja com o próprio Buy, ou Keep looking |
| Não confirmado | A Paper & Co não confirmou em 10 minutos | Você não foi cobrado | A resposta da próxima loja, ou Keep looking |
| Pagamento recusado | O Apple Pay recusou o pagamento | Você não foi cobrado e a loja não foi consultada | Try again, que reabre a folha de pagamento |
| Não retirado | Você não retirou até Mon 9 Nov, então a compra foi cancelada | £29.98 estornados no seu cartão | Ask Paper & Co again, ou Keep looking |
| Erro do app ou da rede | A mensagem não foi enviada | Nada mudou | Tocar para tentar de novo |

Os rótulos de status desses finais levam o símbolo de aviso, como em [Tags](tags.md). O texto está em [Conteúdo e voz](content.md).

## Fontes

- Material 3, interaction states (opacidades da camada de estado, valores de desabilitado): https://m3.material.io/foundations/interaction/states
- Material 3, elevation: https://m3.material.io/styles/elevation
- Apple, Human Interface Guidelines, Materials e Loading: https://developer.apple.com/design/human-interface-guidelines/materials e https://developer.apple.com/design/human-interface-guidelines/loading
- W3C, WCAG 2.2, 2.4.7 Focus visible: https://www.w3.org/WAI/WCAG22/Understanding/focus-visible
- [Fluxo do app](../ideation/app-flow.md), v7, para os finais; [Movimento](motion.md), [Cor](colour.md) e [Forma e materiais](shape.md) para os tokens
