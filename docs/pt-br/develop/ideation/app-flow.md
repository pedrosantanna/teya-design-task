# Fluxo do app

O fluxo principal do app de quem compra em wireframes, da tela inicial até a retirada do item, com os caminhos para quando algo falha. Ele segue o [blueprint de serviço](../../define/blueprint.md), etapas 1 a 5, com as respostas das lojas simuladas. As telas usam o kit de iOS da Apple em preto e branco; o design visual vem depois.

```summary
Takeaways:
- O concierge destas telas é o próprio agente: o app é uma das formas de chegar a ele, ao lado do WhatsApp e do MCP. Os balões de chat marcados como Concierge são as respostas do agente.
- Uma tela inicial com duas abas no topo (v2): Nearby para a rua, Requests para tudo o que o comprador pediu. A barra de pedido grande embaixo começa um pedido novo a partir de qualquer uma das abas, como no Granola; não há barra de abas embaixo.
- Cada pedido é um chat com o concierge, e a aba Requests lista os pedidos como uma caixa de mensagens, com um status em cada linha.
- Depois de fazer um pedido, o comprador pode sair do app. As respostas das lojas chegam como notificações e numa Live Activity, e cada resposta aparece no chat assim que chega.
- A loja confirma a reserva antes de o Apple Pay aparecer, então o pagamento só acontece para um item que foi mesmo separado.
Call:
- Padrões nativos de iOS primeiro (decisão 021): títulos grandes, sheets, Apple Pay, Live Activities.
- Aba Nearby, de cima para baixo: lojas em destaque abertas agora, novidades por perto com filtro por rua, lojas por tipo. Os pedidos em andamento e as compras anteriores foram para a aba Requests na v2.
- O canvas guarda todas as versões. Ele abre na mais recente; as anteriores ficam no menu de versões.
AI:
- Um agente analisou telas iniciais bem resolvidas no Mobbin (Granola, Shop, Deliveroo, Uber Eats, Wolt, Too Good To Go, Airbnb, ChatGPT, Perplexity) e propôs a ordem dos módulos. Para a v2, outro agente analisou listas de chats (Airbnb, Vinted, Depop, WhatsApp, Messenger, ChatGPT, Perplexity) e propôs a anatomia das linhas da aba Requests. Outro agente desenhou os wireframes a partir do blueprint. Eu defini a estrutura: a barra de pedido embaixo, o menu do avatar e as telas do fluxo.
Trade-offs:
- Colocar o concierge numa barra embaixo não deixa espaço para uma barra de abas embaixo, então as duas abas ficam no topo e os ajustes ficam atrás do menu do avatar.
- Wireframes no site da documentação são rápidos de mudar e fáceis de ligar ao blueprint, mas não rodam num celular.
```

## Versões

| Versão | O que mudou | Por quê |
| --- | --- | --- |
| v3 (atual) | Sem abas: um botão redondo de Requests à esquerda da barra de pedido abre Requests como uma folha sobre a rua (decisão 026) | Comparei sete posições para a troca e escolhi a que mantém a barra de pedido grande |
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
