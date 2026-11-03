# Fluxo do app

O fluxo principal do app de quem compra em wireframes, da tela inicial até a retirada do item, com os caminhos para quando algo falha. Ele segue o [blueprint de serviço](../../define/blueprint.md), etapas 1 a 5, com as respostas das lojas simuladas. As telas usam o kit de iOS da Apple em preto e branco; o design visual vem depois.

```summary
Takeaways:
- O agente com quem o comprador conversa se chama Snuffle na interface e tem a marca como avatar. É o mesmo agente que responde no WhatsApp e por MCP.
- A home é a rua, com uma barra grande de pedido embaixo, como a do Granola. Um botão redondo à esquerda da barra abre Requests em tela cheia, uma lista de conversas com um status por linha (decisão 026). Não há tab bar.
- Depois de pedir, o comprador pode sair do app. As respostas das lojas chegam por notificação e por Live Activity, e cada resposta aparece na conversa assim que chega.
- O comprador compra: o Apple Pay autoriza o valor, e o sim de uma loja consultada faz a cobrança. Numa loja conectada, a venda é na hora. Cada loja define a janela de retirada, que aparece antes do Buy, e um pedido que ninguém retira é reembolsado integralmente (decisão 037).
Call:
- Defini a direção: iOS nativo primeiro, as diretrizes da Apple antes do Material, e a Apple vence onde as duas divergem (decisão 021). Daí os títulos grandes, page sheets, Apple Pay e Live Activities.
- Defini a estrutura (a barra de pedido embaixo, o menu do avatar, as telas do fluxo) e escolhi um botão redondo de Requests à esquerda da barra de pedido, que abre Requests em tela cheia (decisão 026).
- Pedi para tirar o Hold porque ele podia ser lido como reserva grátis e deixava o comprador sem saber se tinha comprado, e escolhi Buy (decisão 037).
- Pedi versões neste canvas: ele abre na mais recente, e as anteriores ficam no menu de versões.
AI:
- Um agente olhou telas de home no Mobbin (Granola, Shop, Deliveroo, Uber Eats, Wolt, Too Good To Go, Airbnb, ChatGPT, Perplexity) e propôs a ordem dos módulos. Outro olhou listas de conversa para as linhas de Requests. Agentes desenharam os wireframes a partir do blueprint. Na v7, um agente revisou o fluxo atrás de casos faltando, outro fez uma passada de craft e um terceiro aplicou o Buy e as lacunas da revisão. Eu defini a estrutura, escolhi Buy no lugar de Hold e quais lacunas fechar.
Trade-offs:
- Com a barra de pedido embaixo, não sobra espaço para uma tab bar, então Requests fica atrás de um botão e os ajustes atrás do avatar.
- Cobrar só no sim da loja faz o comprador esperar alguns minutos numa loja consultada até a compra ficar fechada.
```

## Versões

| Versão | O que mudou | Por quê |
| --- | --- | --- |
| v7 (atual) | Buy substitui Hold: o Apple Pay autoriza, o sim da loja faz a cobrança e, numa loja conectada, a venda é na hora; a janela de retirada e o reembolso aparecem antes do Buy. Telas novas: nenhuma loja tem, a loja não confirmou a tempo, o lembrete na véspera com extensão, a entrega da própria loja. O agente é o Snuffle, com a marca como avatar. As ações das telas de erro foram para baixo, as sheets viraram page sheets, horários e preços batem entre as telas, as setas contornam as telas | A revisão de um agente achou casos faltando e setas que pulavam etapas; eu tirei o Hold (decisão 037) e pedi as correções de craft |
| v6 | A folha da loja oferece duas formas (pagar e a loja guarda 7 dias, a loja entrega); o concierge avisa que sem pagar não há reserva | A reserva sem pagamento deixava o pagamento fora do app e o risco de a pessoa não aparecer com a loja (decisão 032) |
| v5 | A folha da loja oferece três formas de levar o item (pagar e a loja guarda 7 dias, reservar e pagar na loja, a loja entrega) e um dia de retirada; as reservas mostram datas; uma loja conectada responde "in stock now" a partir do caixa | Uma reserva de poucas horas era mais curta do que as lojas do Reino Unido guardam pedidos pagos (decisões 030 e 031) |
| v4 | Requests abre em tela cheia, crescendo a partir do botão redondo, com um storyboard da transição | Uma folha deixava a lista com meia tela; a transição mantém a ligação com o botão de onde veio |
| v3 | Sem abas: um botão redondo de Requests à esquerda da barra de pedido abre Requests como uma folha sobre a rua (decisão 026) | Comparei sete posições para a troca e escolhi a que mantém a barra de pedido grande |
| v2 | A tela inicial e a tela inicial rolada viraram uma tela só, com as abas Nearby e Requests no topo. O pedido em andamento e as compras recentes saíram da tela inicial e foram para a aba Requests, uma lista de chats com um status em cada linha. Uma tela em que o concierge propõe dividir um pedido em dois. Espaçamento dos títulos mais justo, rótulos dos botões numa linha só | Percebi que a tela inicial misturava duas funções, explorar a rua e acompanhar o que eu pedi, e que o cartão do pedido e as compras recentes pareciam módulos avulsos |
| v1 | Primeiro fluxo a partir do blueprint: tela inicial no estilo do Granola, chat, reservas, pagamento, caminhos de falha, outros caminhos | Primeira versão depois das referências do Mobbin |

## O que é um pedido

Cada pedido é um chat com o concierge. A questão era quanto cabe num chat. Decidi por um chat por tarefa, com o concierge propondo separar (decisão 025).

| Opção | O que funciona | Custos |
| --- | --- | --- |
| Um chat por tarefa (o que o comprador pediu de uma vez) | Corresponde ao jeito como as pessoas pedem: "óculos para hoje e um bolo para sábado". As mensagens seguintes ficam num lugar só | Itens com prazos ou lojas diferentes se misturam numa conversa, e um status por linha deixa de ser verdade |
| Um chat por produto | Um status claro por linha; avisos e recompras ficam ligados ao produto | Uma lista de compras vira cinco chats, e o comprador repete o contexto |
| Um chat por loja, como no WhatsApp | Corresponde ao jeito como as lojas respondem, e à prova de conceito no WhatsApp | O comprador tem que pensar em lojas, que é o trabalho que o concierge existe para fazer. Uma busca vira seis chats |
| Um chat por tarefa, e o concierge propõe dividir | Mantém as palavras do comprador como unidade e só divide quando os itens precisam de dias ou tipos de loja diferentes. As lojas aparecem dentro do chat como respostas, nunca como chats próprios | A divisão do concierge tem que estar certa, e o comprador toma mais uma decisão (um toque) |

**Decisão:** a última opção, que é a que a v2 desenha. Uma compra fica no chat de onde veio, e a linha mostra o status do item que vai precisar do comprador primeiro.

## Nome da aba

"Requests" cobre tanto o que está sendo buscado quanto o que foi comprado. Alternativas: "Errands" (britânico, mas menos claro para quem não é falante nativo), "Chats" (diz o formato, não o conteúdo), "Orders" (só serve para o que foi comprado). Mantive "Requests" na v2.

## Referências

| App | O que eu peguei |
| --- | --- |
| Granola | Uma barra de pedido flutuante embaixo como a principal porta de entrada |
| Deliveroo, Uber Eats | Um pedido em andamento com o horário de chegada ou de retirada como título, e uma barra recolhida do pedido acima do resto do conteúdo |
| Too Good To Go | Janela de retirada em cada cartão, avatar da loja sobre a foto, "Local heroes" como módulo editorial |
| Wolt | Cartões de loja com o logo como imagem e horário de abertura, distância e retirada numa linha só |
| Shop | Respostas do assistente que misturam texto com carrosséis de lojas |
| Airbnb | Abas com ícone no topo para os dois modos do app; títulos de seção com uma seta; linhas da caixa de mensagens com a foto, o avatar do anfitrião sobre ela e uma linha de status |
| Vinted, Depop | A foto do item como imagem da linha, filtros por estado e eventos da loja como cartões dentro do chat |
| WhatsApp, Messenger | Chips de filtro com contagem, não lidas em negrito com contagem, avatares empilhados quando há mais de um participante |

As capturas ficam fora do repositório público porque são telas de terceiros.
