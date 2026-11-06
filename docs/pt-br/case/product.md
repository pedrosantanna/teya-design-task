# O produto

Um pedido, respondido pelas lojas, comprado e retirado na mesma conversa.

## O percurso

1. Sam digita dois pares de óculos para eclipse até as 16h.
2. O Snuffle pergunta a seis lojas. Uma responde na hora pelo caixa; as outras respondem no WhatsApp.
3. As respostas chegam na conversa, cada uma com a loja, o preço, uma data para retirar e Buy.
4. Ele compra na Paper & Co por £29,98 com Apple Pay, e só é cobrado quando a loja separa os pares.
5. O recibo traz um código de retirada e "collect by Mon 9 Nov".

Jess sai do trabalho depois que a Rossi's Bakery fecha. Na hora do almoço ela compra um pão de fermentação natural, e a Rossi's deixa o pão numa banca de jornal aberta até as 23h.

Todo beco sem saída tem um próximo passo: vendido antes, pagamento recusado, loja que não confirma, ninguém tem a tempo, Keep looking.

<!-- screenshot: the chat with two answers arriving, each with Buy -->

## O modelo

O app tem quatro objetos: pedido, loja, resposta e compra. Um item nunca é um deles, porque lojas pequenas não têm catálogo; ele é palavras e uma quantidade dentro de um pedido. Cada pedido é uma conversa, e as lojas aparecem como respostas dentro dela.

Evidência: [modelo conceitual](../develop/design-system/conceptual-model.md).

## O agente

Um pedido abre duas conversas. O comprador fala com o Snuffle na conversa; o Snuffle fala com cada loja consultada no WhatsApp, e com uma loja conectada pelo caixa. Toda resposta indica a fonte, porque o estoque do caixa e o sim de um lojista são promessas diferentes. O Snuffle nunca decide pelo comprador.

Evidência: [fluxo do agente](../develop/ideation/agent-flow.md).

## O lado da loja

As lojas não têm interface para aprender. Uma loja responde a uma mensagem com uma resposta numerada, separa o item e entrega. O lado dela é desenhado como estados, cada um com a mensagem de WhatsApp que ela vê.

<!-- screenshot: the shop request states canvas, from asked to collected -->

Evidência: [estados do pedido na loja](../develop/ideation/shop-states.md), [blueprint de serviço](../define/blueprint.md).

## Construído e só desenhado

O protótipo roda o caminho do Sam do pedido ao código com todos os caminhos de falha, a Jess retirando depois do trabalho, páginas de loja com avaliações, 42 lojas inventadas em ruas reais, iOS e Android, claro e escuro. Um pedido recorrente, uma pergunta quando faltam palavras e falhas depois da cobrança estão só desenhados.
