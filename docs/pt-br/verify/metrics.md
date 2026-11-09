# Métricas de produto

As métricas que dizem se o Snuffle funciona como marketplace e como negócio, como cada uma é calculada a partir dos eventos de [Tarefas e eventos](telemetry.md), e um modelo simples de quantas lojas uma área precisa para um pedido receber respostas a tempo. Nada disto é medido ainda.

```summary
Takeaways:
- A north star é pedidos concluídos por semana, os pedidos que terminam com uma compra retirada ou entregue. As entradas dela são compradores ativos, pedidos por comprador, taxa de atendimento, conversão de um pedido atendido em compra, confirmação e retirada, com as lojas que respondem em cada área como entrada do lado da oferta.
- A taxa de atendimento (fill rate: pedidos que recebem pelo menos um sim utilizável a tempo) é o número central do marketplace. Com uma taxa de resposta de 60% (a marca da H1 para seguir nas consultas, estimativa minha) e uma chance assumida de 40% de uma loja que responde ter o item, cerca de 6 lojas prováveis abertas dão 80% de atendimento; 3 dão 56%.
- Isso significa cerca de 4 lojas no Snuffle por tipo num anel de 15 minutos, 24 para seis tipos. As 10 lojas da prova de conceito dão 52%, o que define a marca da H1 para seguir no atendimento em 50% de cerca de 60 pedidos.
- O cenário base da estimativa de receita dá cerca de 98 compradores ativos por mês para cada loja ativa. Com 6 lojas consultadas por pedido, cada loja responde cerca de 11 consultas para cada compra que recebe, cerca de 24 por dia útil. A prova de conceito consulta cada loja mais ou menos uma vez por dia útil. A carga de respostas é o guardrail que limita o quanto o Snuffle pode consultar.
- Os pagamentos rendem cerca de 16 pence por compra no cenário base (£18 a 0,9%). A maior parte do dinheiro vem de lojas que adotam o POS do provedor, então a adesão ao POS por área é relatada ao lado do GMV.
Call:
- Pedi uma candidata a north star e suas entradas, as métricas de oferta e demanda, as métricas de dinheiro da estimativa de receita, tudo por área e por comprador, e um modelo de quantas lojas uma área precisa por comprador ativo, com cada entrada marcada como premissa a testar. Adotei pedidos concluídos por semana como north star.
- Pedi que nenhum benchmark fosse inventado, e que qualquer número de fora viesse de uma fonte aberta e com link.
- Mantive o modelo e defini as marcas da H1 a partir dele (decisão 070): 60% de respostas é uma estimativa minha, abaixo da régua que a Meta usava para um negócio que responde, e a marca de 50% de atendimento é a previsão do próprio modelo para 10 lojas.
AI:
- Um agente definiu as métricas a partir dos eventos e da estimativa de receita, montou o modelo de liquidez com as premissas que já estavam nos documentos (o anel de 15 minutos, a taxa de resposta da H1, as dez lojas da prova de conceito, os seis tipos), acrescentou três premissas próprias, marcadas, e conferiu as contas num script curto.
- Numa segunda passada, um agente alinhou as métricas aos eventos revisados: a taxa de retirada conta a partir de `order_ready`, o GMV soma `payment_taken` e a H12 conta por pedido com um sim. As contas da liquidez não mudaram.
- Numa terceira passada, um agente procurou benchmarks para r e para o atendimento e não achou nenhum para este mercado; as referências ao lado de r são as mais próximas que encontrou. As contas foram conferidas de novo.
Trade-offs:
- Uma north star de pedidos concluídos premia necessidades atendidas e ignora o valor da compra; o GMV ao lado pega um desvio para compras muito pequenas.
- O modelo trata a resposta de cada loja como independente e a parcela de lojas que têm o item como um número só para todos os tipos. As duas coisas são simplificações que a prova de conceito vai corrigir.
```

## North star

Pedidos concluídos por semana: pedidos que terminam com uma compra retirada ou entregue. Um pedido semanal conta uma vez por semana em que é concluído.

Ela precisa que todas as partes funcionem: uma loja respondeu, tinha o item e o separou, o comprador comprou e retirou. Ela conta o que o comprador veio buscar, uma venda para a loja e um pagamento para o provedor. O número de pedidos criados cresceria enquanto os compradores voltam para casa de mãos vazias, e o GMV premiaria poucas compras grandes em vez de muitas necessidades atendidas.

Ela se decompõe em entradas, cada uma com um responsável:

pedidos concluídos = compradores ativos × pedidos por comprador × taxa de atendimento × atendido para compra × taxa de confirmação × taxa de retirada

A oferta fica embaixo da taxa de atendimento: lojas que respondem por tipo na área, a taxa de resposta delas e com que frequência têm o item. Adotei esta north star antes da prova de conceito, e os resultados dela ainda podem mudá-la.

## Métricas

| Métrica | Definição | De onde |
| --- | --- | --- |
| Pedidos concluídos (north star) | Pedidos com um `order_collected` ou `order_delivered`, por semana; um pedido recorrente conta uma vez por ciclo | Serviço |
| Compradores ativos | Compradores com pelo menos um `request_created` na semana ou no mês | Serviço |
| Pedidos por comprador ativo | `request_created` por comprador ativo, por semana e por mês | Serviço |
| Taxa de repetição | Uso repetido como definido em [Tarefas e eventos](telemetry.md): compradores com uma compra retirada ou entregue que têm outro pedido em até 30 dias, pedidos novos e ciclos recorrentes relatados à parte | Serviço |
| Pedidos recorrentes | Pedidos que passam a se repetir (`keep_looking_set`, recorrente sim), e as compras nos ciclos seguintes (`cycle` acima de 1) | Serviço |
| Lojas no Snuffle | Lojas com `shop_joined` e sem `shop_opted_out`, por área e tipo | Serviço |
| Lojas que respondem | Lojas com pelo menos uma `shop_replied` válida nos últimos 30 dias | Serviço |
| Taxa de resposta em 10 minutos | `shop_replied` válida em até 10 minutos de loja aberta, por `shop_asked` no WhatsApp com a loja aberta (H1) | Serviço |
| Tempo de resposta | Minutos de loja aberta de `shop_asked` no WhatsApp até uma `shop_replied` válida; mediana e percentil 90 | Serviço |
| Taxa de atendimento | Pedidos com pelo menos um `answer_received` comprável antes do prazo, por pedido com prazo | Serviço |
| Cobertura por tipo | Taxa de atendimento por tipo, com `request_not_found` dividido entre todos disseram não e sem resposta | Serviço |
| Tempo até a primeira resposta comprável | De `request_created` ao primeiro `answer_received` comprável; mediana e percentil 90 | Serviço |
| Sim para compra | Por pedido com pelo menos um `answer_received` sim, se uma compra (`payment_authorised` ou `payment_taken`) vem depois nele (H12) | Serviço |
| Atendido para compra | Pedidos com uma compra, por pedido com uma resposta comprável | Serviço |
| Pedido para compra | Pedidos com uma compra, por `request_created` | Serviço |
| Taxa de confirmação | `order_confirmed` por `payment_authorised` | Serviço |
| Taxa de retirada | `order_collected` por `order_ready` para retirada (H2) | Serviço |
| GMV | Soma dos valores de `payment_taken`, menos os valores de `refund_issued` | Serviço |
| Valor médio da compra | GMV por compra | Serviço |
| Compras por comprador | Compras por comprador com pelo menos uma compra no mês | Serviço |
| Voltaria | Polegares para cima por compra, pela `rating_submitted` mais recente de cada uma, por loja e área | Serviço |

## Dinheiro

A [estimativa de receita](../define/revenue-estimate.md) traz três fontes, cada uma com uma métrica.

| Fonte | Métrica | Cenário base da estimativa |
| --- | --- | --- |
| Pagamentos no app | GMV × taxa líquida, por compra, por área | £18 × 0,9% ≈ £0,16 por compra; cerca de £2,90 por comprador mensal por ano (£364.000 sobre 125.000 compradores) |
| Lojas novas no POS do provedor | Adesão ao POS: lojas no Snuffle fora do POS do provedor que o adotam (`offer_accepted`, tipo pos), e o faturamento em cartão no balcão delas | 25% das lojas ativas novas no POS; metade da adesão causada pelo app |
| Destaque pago | Lojas que compram uma semana em destaque, e receita por área | 8% das lojas ativas, £20 por semana |

A receita por área e por loja ativa é relatada ao lado do GMV, porque uma loja que adota o POS traz todas as vendas do balcão, e no cenário base essa fonte é maior do que os pagamentos no app.

## Por área e por comprador

Toda métrica é relatada por área e por comprador. A demanda é agrupada pelo distrito postal de onde o pedido foi feito, a oferta pelo distrito postal da loja. O anel de 15 minutos de um comprador cruza distritos, então a taxa de atendimento de uma área conta os pedidos feitos nela, onde quer que estejam as lojas que responderam. Por comprador, os cortes úteis são pedidos, compras e receita por comprador ativo, e a taxa de repetição segundo como foi o primeiro pedido: um primeiro pedido que terminou em "Not found" é o que mais provavelmente será o último.

## Liquidez

Quantas lojas uma área precisa para que um pedido receba um sim utilizável a tempo. Cada entrada abaixo é uma premissa a testar; nenhuma é benchmark.

| Entrada | Valor | De onde vem |
| --- | --- | --- |
| r: parcela das lojas consultadas que respondem de forma válida em até 10 minutos | 60% | A marca da H1 para seguir nas consultas, e uma estimativa minha. Não existe número publicado sobre lojas independentes do Reino Unido respondendo pelo WhatsApp. Fica abaixo da régua que a Meta usava para um negócio que responde: o selo "Very responsive to messages" exigia 90% de taxa de resposta e 15 minutos de tempo de resposta nos últimos 7 dias ([Central de Ajuda do Facebook, arquivada em 2020](https://web.archive.org/web/20200509150311/https://www.facebook.com/help/988319821208361)) |
| h: parcela das lojas que respondem e têm o item | 40% | Premissa, sem fonte. A prova de conceito mede à parte de r (H1) |
| o: parcela das lojas prováveis abertas quando o pedido chega | 80% | Premissa para o horário comercial, sem fonte |
| k: tipos de loja que provavelmente têm um item | 2 | Premissa. No protótipo, os óculos de eclipse vão para seis tipos (farmácia, ótica, papelaria, loja de câmeras, loja de ferragens, brinquedos) e o pão de fermentação natural para um |
| Tipos numa área | 6 | As categorias da prova de conceito: ferragens, floricultura, padaria, açougue, farmácia, papelaria |
| Anel | 15 minutos a pé | A área do conceito e da prova de conceito |

### Lojas consultadas por pedido

Se cada loja consultada dá um sim utilizável com probabilidade r × h, e as lojas respondem de forma independente, um pedido feito a n lojas recebe pelo menos um sim com probabilidade 1 − (1 − r × h)ⁿ. Com r × h = 0,6 × 0,4 = 0,24:

| Lojas consultadas (n) | Taxa de atendimento |
| --- | --- |
| 2 | 1 − 0,76² = 42% |
| 3 | 1 − 0,76³ = 56% |
| 6 | 1 − 0,76⁶ = 81% |
| 9 | 1 − 0,76⁹ = 92% |

Resolvendo para n: n = ln(1 − atendimento) ÷ ln(1 − r × h), arredondado para cima. Lojas necessárias com outros valores de r × h:

| r × h | Lojas para 50% de atendimento | Para 80% | Para 90% |
| --- | --- | --- | --- |
| 0,24 (respondem 60%, têm 40%) | 3 | 6 | 9 |
| 0,36 (respondem 60%, têm 60%) | 2 | 4 | 6 |
| 0,48 (respondem 60%, têm 80%) | 2 | 3 | 4 |

O pedido de óculos de eclipse do protótipo consulta 6 lojas, o que dá 81% com as entradas base.

### Lojas por área

Um pedido tira suas n lojas prováveis de k tipos, e só as abertas contam, então n = lojas por tipo × k × o. Para 80% de atendimento: lojas por tipo = 6 ÷ (2 × 0,8) = 3,75, ou seja, 4 por tipo, e 4 × 6 tipos = 24 lojas no Snuffle num anel de 15 minutos. Para 50%: 3 ÷ 1,6 ≈ 2 por tipo, 12 lojas.

Na marca da H1 para parar nas consultas, r = 45% e r × h = 0,18, um pedido precisa de n = ln 0,2 ÷ ln 0,82 ≈ 8,1, então 9 lojas prováveis para 80% de atendimento: 9 ÷ 1,6 ≈ 5,6, então 6 por tipo e 36 lojas num anel, arredondando para cima como acima. Eu julgo que isso passa do que as independentes de um anel conseguem oferecer.

A prova de conceito tem 10 lojas em 6 tipos, cerca de 1,7 por tipo. Isso dá n = 1,7 × 2 × 0,8 ≈ 2,7 lojas prováveis por pedido e uma taxa de atendimento de 1 − 0,76^2,7 ≈ 52%. A marca da H1 para seguir no atendimento é 50% de cerca de 60 pedidos, e a marca para parar, 30%. Lenny Rachitsky põe a taxa de atendimento entre menos de 5% num marketplace de e-commerce e mais de 80% no fundo do funil ([Lenny Rachitsky, "The most important marketplace metrics", 29 de março de 2022](https://www.lennysnewsletter.com/p/the-most-important-marketplace-metrics)), uma faixa larga demais para definir uma marca, então a marca vem do modelo. Seguir ali diz que o conceito pode funcionar com dez lojas; se dez bastam para o produto é outra pergunta.

### Compradores por loja

O piso de oferta acima não depende de quantos compradores existem. São os compradores que decidem se as lojas recebem compras suficientes para ficar. O cenário base do Reino Unido na estimativa de receita tem 3.195 lojas ativas, 312.000 compradores ativos por mês, 125.000 compradores que compram e 187.000 compras por mês: cerca de 98 compradores ativos por mês e 58 compras por loja ativa. Para um anel de 24 lojas nesse ritmo: 24 × 58 = 1.392 compras por mês, de 1.392 ÷ 1,5 compras por comprador = 928 compradores, de 928 ÷ 40% de compradores entre os ativos = 2.320 compradores ativos por mês no anel. Se 58 compras por mês mantêm uma loja respondendo é algo que também não foi testado.

### Carga de respostas

Cada compra custa às lojas muitas respostas. Com n = 6, atendimento de 80% e pedidos atendidos comprados nos 70% da H12, um pedido vira compra 0,8 × 0,7 = 56% das vezes, então as lojas respondem 6 ÷ 0,56 ≈ 10,7 consultas por compra. Com 58 compras por loja por mês, são cerca de 620 consultas por mês, cerca de 24 por dia útil em 26 dias. As 160 consultas da prova de conceito em três semanas dão cerca de 1 por loja por dia útil, então ela testa as respostas com pouca carga.

Essa é a tensão deste marketplace: consultar mais lojas aumenta o atendimento e o número de nãos que cada loja digita. As alavancas são escolher melhor as lojas, já que um h maior precisa de menos lojas (com r × h = 0,48, 3 lojas dão 80% e a carga cai pela metade, para cerca de 5 consultas por compra); lojas conectadas pelo caixa, que respondem sem esforço (H11); e consultar em ondas, parando quando houver um sim, o que troca a espera do comprador pelo esforço da loja. Consultas por loja por dia e por compra são um guardrail, e a conversa semanal com as lojas diz onde fica o limite. Na prova de conceito, uma loja não é consultada de novo no mesmo dia depois de 10 consultas; o limite para a operação estável continua em aberto.

## Guardrails

| Guardrail | Definição | O que vigia |
| --- | --- | --- |
| Cancelamentos | `order_cancelled` por `order_ready` para retirada | Compra cedo demais, datas de retirada que não servem |
| Estornos | `refund_issued` por compra, por motivo | Todo caminho de devolução de dinheiro |
| Não retiradas | `order_not_collected` por `order_ready` para retirada; o inverso dos 2 em 3 da H2 | Estoque preso nas lojas, dinheiro de volta aos compradores |
| Não confirmadas ou vendidas depois de um sim | `order_not_confirmed` e `order_sold` por `payment_authorised` | Respostas em que o comprador não pode confiar; precisão de estoque |
| Reclamações | `complaint_opened` por 100 compras, por assunto, de comprador e de loja | Falhas que nenhum outro evento mostra |
| Lojas que saem | `shop_opted_out` por loja ativa por mês, por motivo | Carga de respostas, poucas vendas |
| Notificações desligadas | `notifications_changed` para desligado, por comprador ativo | Mensagens demais do Snuffle |
| Carga de respostas | `shop_asked` por loja por dia útil, e por compra | Consultar lojas demais |
| Polegar para baixo | Polegares para baixo por compra, pela `rating_submitted` mais recente, com as tags; "Not ready when I came" relatada à parte | Lojas que falham no atendimento presencial |

A taxa de resposta às avaliações não é meta. O Snuffle pergunta uma vez a cada pessoa que comprou e lembra no máximo uma vez (decisão 047 e o [blueprint de serviço](../define/blueprint.md)), e empurrar essa taxa para cima significaria mais pedidos de avaliação.
