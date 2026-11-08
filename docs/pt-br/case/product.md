# O produto

Um pedido, respondido pelas lojas, comprado e retirado na mesma conversa.

## O percurso

O Sam precisa de dois pares de óculos para eclipse até as 16h de segunda, 2 de novembro. Todo beco sem saída no caminho tem um próximo passo.

<div class="dg dg-journey"><div class="dg-jrow is-head"><span></span><span>Etapa</span><span>Quando não dá certo</span></div><div class="dg-jrow"><time>13:02</time><div class="dg-jstep"><b>Pedido</b>“Eclipse glasses, 2 pairs, before 4pm”, com um bolo para sábado na mesma mensagem</div><div class="dg-jends"><span class="dg-jend">Duas coisas para lojas diferentes: o Snuffle propõe dois pedidos</span></div></div><div class="dg-jrow"><time>13:05</time><div class="dg-jstep"><b>Seis lojas consultadas</b>A Broadway Chemist responde na hora pelo caixa; as outras recebem uma mensagem no WhatsApp</div><div class="dg-jends"><span class="dg-jend">Ninguém tem até as 16h: perguntar mais longe, ou continuar procurando até sexta, 6 de novembro</span></div></div><div class="dg-jrow"><time>13:14</time><div class="dg-jstep"><b>Respostas na conversa</b>A Paper &amp; Co tem, a £14,99 o par, para retirar até segunda, 9 de novembro</div><div class="dg-jends"></div></div><div class="dg-jrow"><time>13:15</time><div class="dg-jstep"><b>Buy</b>O Apple Pay autoriza £29,98; nada é capturado ainda</div><div class="dg-jends"><span class="dg-jend">Pagamento recusado: nenhuma compra, e nenhuma loja é chamada para separar</span></div></div><div class="dg-jrow"><time>13:16</time><div class="dg-jstep"><b>Esperando a loja</b>A Paper &amp; Co tem 10 minutos para separar os pares</div><div class="dg-jends"><span class="dg-jend">Vendido antes: nada é cobrado, 1 par na Broadway Chemist</span><span class="dg-jend">Sem confirmação em 10 minutos: nada é cobrado</span></div></div><div class="dg-jrow"><time>13:19</time><div class="dg-jstep"><b>Separado e cobrado</b>O recibo traz o código K7Q2</div><div class="dg-jends"><span class="dg-jend">Não vai dar: prorrogar uma vez, até segunda, 16 de novembro</span><span class="dg-jend">Não retirado até segunda, 9 de novembro: reembolso integral</span></div></div><div class="dg-jrow"><time>15:42</time><div class="dg-jstep"><b>Retirada</b>O código abre em tela cheia no balcão</div><div class="dg-jends"></div></div></div>

A Jess, a segunda persona, sai do trabalho depois que a Rossi's Bakery fecha. Na hora do almoço ela compra um pão de fermentação natural, e a Rossi's deixa o pão numa banca de jornal aberta até as 23h.

Evidência: [protótipo](../deliver/prototype.md), [fluxo do app](../develop/ideation/app-flow.md).

## O modelo

Quatro objetos, e o item não é um deles: lojas pequenas não têm catálogo, então um item é palavras e uma quantidade dentro de um pedido.

<div class="dg dg-chain"><div class="dg-box"><b>Pedido</b>Uma conversa, com um lugar e um prazo<div class="dg-list"><span><span class="dg-tag">2 × eclipse glasses · by 4pm</span></span></div></div><div class="dg-arrow">consulta 6</div><div class="dg-box"><b>Loja</b>Conectada, pelo caixa, ou consultada, no WhatsApp</div><div class="dg-arrow">uma cada</div><div class="dg-box"><b>Resposta</b>Um cartão na conversa do pedido, com a fonte, um preço e Buy</div><div class="dg-arrow">Buy</div><div class="dg-box"><b>Compra</b>Uma loja, uma data para retirar e um código</div></div>

Evidência: [modelo conceitual](../develop/design-system/conceptual-model.md).

## O agente

Um pedido abre duas conversas. Toda resposta diz de onde veio, porque o estoque de um caixa e o sim de um lojista são promessas diferentes, e o Snuffle nunca decide por quem compra.

<div class="dg dg-convos"><div class="dg-convo"><b>Comprador e Snuffle, no app</b><div class="dg-msg is-me">Eclipse glasses, 2 pairs, before 4pm</div><div class="dg-msg">Got it: 2 pairs within 15 minutes of you, by 4pm. Will you collect them, or should I check delivery too?</div><div class="dg-msg">I'm asking 6 shops on 5 streets near you. You can leave the app; I'll tell you as they answer.</div><div class="dg-msg is-card"><span class="dg-tag">Caixa</span>Broadway Chemist · In stock now · 1 at £9.50</div><div class="dg-msg is-card"><span class="dg-tag">WhatsApp</span>Paper &amp; Co · Has them · £14.99 · Buy</div></div><div class="dg-convo"><b>Snuffle e as lojas, no WhatsApp ou pelo caixa</b><div class="dg-msg">Hi Ana, someone a 13-minute walk away needs 2 pairs of eclipse glasses by 4pm today. Do you have them? Reply 1 and your price, 2 No, 3 Something similar, or tell me how many you have.</div><div class="dg-msg is-shop">1 £14.99</div><div class="dg-msg is-sys">Broadway Chemist: estoque lido do caixa, então ninguém é consultado</div></div></div>

As falas da conversa são o texto de interface do protótipo, em inglês.

Evidência: [fluxo do agente](../develop/ideation/agent-flow.md).

## O lado da loja

As lojas não têm interface para aprender. Cada estado tem a mensagem de WhatsApp que a loja vê, e todo o trabalho da loja são três respostas.

<div class="dg"><div class="dg-chain"><div class="dg-box"><b>Consultada</b>Uma mensagem de template sobre um item, com prazo</div><div class="dg-arrow">responde <span>“1 £14.99”</span></div><div class="dg-box"><b>Comprado</b>£29,98 autorizados; separar para K7Q2 em até 10 minutos</div><div class="dg-arrow">responde <span>“done”</span></div><div class="dg-box"><b>Separado e cobrado</b>Guardado até a data de retirada</div><div class="dg-arrow">lê o código</div><div class="dg-box"><b>Retirado</b>Quem comprou pode avaliar a loja</div></div><div class="dg-cap">Quando não dá certo</div><div class="dg-cols"><div class="dg-box is-dashed"><b>Sem resposta em 10 minutos</b><small>↳ de Consultada</small>A linha mostra No reply; uma resposta atrasada ainda conta como demanda</div><div class="dg-box is-dashed"><b>Vendido, ou sem “done” a tempo</b><small>↳ de Comprado</small>A autorização cai e ninguém é cobrado</div><div class="dg-box is-dashed"><b>Não retirado até a data</b><small>↳ de Separado</small>Cancelado, reembolsado e de volta à venda</div></div></div>

Evidência: [estados do pedido na loja](../develop/ideation/shop-states.md), [blueprint de serviço](../define/blueprint.md).

## Construído e só desenhado

<div class="dg dg-cols"><div class="dg-box"><b>Construído no protótipo</b><ul><li>O caminho do Sam do pedido ao código, com todos os caminhos de falha</li><li>A Jess retirando depois do trabalho</li><li>Páginas de loja com avaliações</li><li>42 lojas inventadas em ruas reais</li><li>iOS e Android, claro e escuro</li></ul></div><div class="dg-box is-dashed"><b>Só desenhado</b><ul><li>Um pedido semanal</li><li>Uma pergunta quando faltam quantidade ou prazo</li><li>Um pedido fora da área</li><li>Falhas depois da cobrança</li><li>Uma resposta da loja do seu próprio jeito</li></ul></div></div>

Cada funcionalidade, como um clipe curto, está na página seguinte: [funcionalidades](features.md).
