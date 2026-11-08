# Conceito

Suponho que a maior parte do que uma loja pequena vende não está em nenhum sistema de estoque, então a parte difícil é saber se o item está lá agora. O Snuffle é um conjunto de agentes que age como o concierge de quem compra e pergunta às lojas por ele.

<div class="dg dg-chain dg-hub"><div class="dg-box"><b>Compradores na área</b><div class="dg-list"><span>Sam: óculos para eclipse até as 16h</span><span>Jess: um pão de fermentação natural que ela possa retirar depois das 18h</span><small>e todo outro pedido por perto</small></div></div><div class="dg-arrow is-both">pedido · respostas</div><div class="dg-box"><b>Snuffle</b><div class="dg-list"><span>Entende o pedido</span><span>Escolhe as lojas prováveis e pergunta a todas de uma vez</span><span>Traz cada resposta, com a fonte indicada</span></div></div><div class="dg-arrow is-both">pergunta · resposta</div><div class="dg-box"><b>Lojas ao alcance</b><div class="dg-list"><span>Broadway Chemist <span class="dg-tag">Caixa</span></span><span>Paper &amp; Co <span class="dg-tag">WhatsApp</span></span><span>Rossi's Bakery <span class="dg-tag">WhatsApp</span></span></div></div></div>

## Por que um concierge

Considerei os padrões comuns de marketplace: um catálogo para buscar, ou um diretório de lojas para explorar. Os dois tratam o item como dado estruturado que cada loja mantém atualizado. Eu precisava que o item continuasse em palavras, para que quem compra o descreva como quiser e o lojista responda do mesmo jeito, sem controle de estoque por trás. Por isso a entrada principal é um concierge que pergunta às lojas. Explorar lojas continua como a segunda entrada.

<div class="dg dg-options dg-options-2"><div class="dg-box"><span class="dg-badge">Considerado</span><b>Padrões de marketplace</b>Busca em catálogo, ou um diretório de lojas para explorar.<span>O item é dado estruturado, com estoque, mantido atualizado por cada loja.</span></div><div class="dg-box is-chosen"><span class="dg-badge is-chosen">Escolhido</span><b>Um concierge que pergunta às lojas</b>Quem compra pede com as próprias palavras; o lojista responde com as dele.<span>Sem catálogo nem controle de estoque. Custa minutos de espera e depende de as lojas responderem.</span></div></div>

## Como funciona

O Snuffle entende o pedido, pergunta às lojas pelo caixa quando a loja é conectada e pelo WhatsApp quando não é, e devolve as respostas numa conversa só. Ele fica entre muitos compradores e muitas lojas ao mesmo tempo, em todas as ruas ao alcance de quem compra, para que ninguém precise sair ligando.

## Como a transaction molda cada resposta

Uma resposta só ajuda se quem compra puder agir sobre ela na mesma conversa. Por isso toda resposta traz a loja, o preço, uma data para retirar e Buy. O comprador só é cobrado quando a loja confirma que separou o item. Uma compra é de uma loja só, com retirada como padrão.

## O lado da loja

As lojas não têm interface para aprender. Cada estado tem a mensagem de WhatsApp que a loja vê, e todo o trabalho da loja são três respostas.

<div class="dg"><div class="dg-chain"><div class="dg-box"><b>Consultada</b>Uma mensagem de template sobre um item, com prazo</div><div class="dg-arrow">responde <span>“1 £14.99”</span></div><div class="dg-box"><b>Comprado</b>£29,98 autorizados; separar para K7Q2 em até 10 minutos</div><div class="dg-arrow">responde <span>“done”</span></div><div class="dg-box"><b>Separado e cobrado</b>Guardado até a data de retirada</div><div class="dg-arrow">lê o código</div><div class="dg-box"><b>Retirado</b>Quem comprou pode avaliar a loja</div></div><div class="dg-cap">Quando não dá certo</div><div class="dg-cols"><div class="dg-box is-dashed"><b>Sem resposta em 10 minutos</b><small>↳ de Consultada</small>A linha mostra No reply; uma resposta atrasada ainda conta como demanda</div><div class="dg-box is-dashed"><b>Vendido, ou sem “done” a tempo</b><small>↳ de Comprado</small>A autorização cai e ninguém é cobrado</div><div class="dg-box is-dashed"><b>Não retirado até a data</b><small>↳ de Separado</small>Cancelado, reembolsado e de volta à venda</div></div></div>

Evidência: [estados do pedido na loja](../develop/ideation/shop-states.md), [blueprint de serviço](../define/blueprint.md).

## Proposta de valor, hipóteses e blueprint

Escrevi uma proposta de valor a partir das dores do mapa de empatia, depois transformei as premissas em que ela se apoia em hipóteses, cada uma com um critério de aprovação definido antes de qualquer teste. Um blueprint de serviço mapeia cada etapa entre o comprador, o Snuffle, os agentes por trás dele e a loja. Cada página do contexto de IA separa a minha decisão do que um agente fez naquela etapa.

Evidência: [conceito](../define/index.md), [proposta de valor](../define/value-proposition.md), [hipóteses](../define/hypotheses.md), [blueprint de serviço](../define/blueprint.md).

## Decisões principais

| Decisão | O que deixei de lado | Registro |
| --- | --- | --- |
| Um agente que pergunta às lojas é a entrada principal; explorar vem em segundo | Uma busca de catálogo, que precisa de dados de item que a maioria das independentes não tem. Uma loja consultada leva minutos | 017, 018 |
| O pedido é a unidade: quatro objetos e nenhuma página de item | Uma conversa por produto ou por loja. "Pedido" não é a palavra que os compradores usam | 025, 039 |
| Comprar, depois retirar: o pagamento numa loja consultada é capturado quando ela separa o item | O Hold, que parecia uma reserva grátis, e a reserva sem pagamento, em que a loja corre o risco de ninguém aparecer. Quem paga em dinheiro vivo | 032, 037 |
| As lojas respondem no WhatsApp com respostas numeradas, sem app para instalar | Uma interface para lojas. As respostas são rígidas, e a regra de 24 horas do WhatsApp limita os acompanhamentos a templates | 021, 031 |
| O Snuffle olha a área de quem compra, não uma única high street | Um escopo arrumado de uma rua só. Da Blythe Road, seis ruas comerciais ficam a menos de 15 minutos a pé | 024 |
| Uma prova de conceito com lojas antes de entrevistas | Construir antes de saber se as lojas respondem | 015, 020 |


## O que supus e o que deixei de fora

As premissas de maior risco são sobre as lojas: que elas respondem no WhatsApp em até dez minutos e guardam um item comprado por cerca de uma semana. Nenhum lojista está na evidência, e cada premissa tem uma hipótese que a testa.

Deixei de fora uma interface para lojas, uma cesta com várias lojas, entrega agendada pelo Snuffle, pagamentos, estoque e agentes reais, e a Ruth.

Evidência: [registro de decisões](../decision-log.md).
