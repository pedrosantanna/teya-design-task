# Plano de medição

Como cada hipótese vai ser testada e medida, das tarefas que um comprador e uma loja fazem até as métricas que dizem se o produto funciona. A telemetria é uma definição para um build futuro: o protótipo não registra nada, e as lojas dele respondem seguindo um roteiro.

```summary
Takeaways:
- Cada hipótese tem uma métrica, os eventos que a calculam, o critério de aprovação e um método. A maior parte dos números vem de registros que o serviço guarda de qualquer jeito (pedidos, respostas, compras, pagamentos), então a prova de conceito não precisa de rastreamento no app.
- Os nomes dos eventos servem também de planilha de registro para o concierge feito à mão: uma linha por evento, com os horários do WhatsApp.
- A north star (a métrica principal) é o número de pedidos concluídos por semana: pedidos que terminam com uma compra retirada ou entregue. Ela só sobe quando uma loja responde, tem o item, e o comprador compra e retira.
- Com as premissas atuais, um pedido precisa de cerca de seis lojas prováveis abertas para receber um sim 80% das vezes. Dez lojas espalhadas em seis tipos, como na prova de conceito, deixam isso perto de 50%, que é o critério da H1 para as buscas.
- A recomendação é não ter NPS nem CSAT fixo por enquanto. A avaliação depois da retirada cobre a loja; o que ela não pega (pedidos que terminam sem compra, o próprio Snuffle, o ponto de vista da loja) fica coberto por conversas com os seis compradores e as dez lojas da prova de conceito.
Call:
- Pedi uma etapa de verificação ao lado dos usuários sintéticos de teste: como cada hipótese vai ser testada e a telemetria necessária para medir comportamento, documentada e explicitamente fora do protótipo.
- Pedi as tarefas principais com início e fim, sucesso, falha, abandono, tempo na tarefa e erros; uma taxonomia de eventos com notas de privacidade; métricas de produto e de marketplace, incluindo quantas lojas uma área precisa por comprador ativo; guardrails; e como as hipóteses se ligam a tudo isso.
- Disse que tendo a não usar NPS nem CSAT neste produto e pedi que as razões fossem conferidas contra o modelo. Adotei pedidos concluídos por semana como north star; os limites dos guardrails e a pergunta de pesquisa continuam em aberto.
AI:
- Um agente leu as hipóteses, o modelo conceitual, os fluxos do app, do agente e da loja, as specs e a simulação do protótipo, e escreveu as tarefas, os eventos, as métricas, o modelo de liquidez e a recomendação sobre NPS e CSAT.
- Cada entrada do modelo de liquidez é uma premissa, marcada como tal. Nenhum benchmark externo é usado; o único link externo é o guia do regulador britânico sobre tecnologias de armazenamento e acesso, que o agente abriu.
Trade-offs:
- Medir a partir dos registros do serviço deixa o rastreamento fora do app, e perde o que acontece na tela (o tempo comparando respostas, um pedido abandonado antes de enviar) até existir analytics com consentimento.
- O modelo de liquidez trata as lojas como independentes. Um item escasso, como óculos de eclipse na véspera, esgota em todo lugar ao mesmo tempo, então a taxa de atendimento real vai ser menor do que o modelo diz.
```

O detalhe está em duas páginas: [Tarefas e eventos](telemetry.md) define as tarefas e a taxonomia de eventos, e [Métricas de produto](metrics.md) define as métricas, a north star, o modelo de liquidez e os guardrails.

## Métodos

| Método | Quem | O que pode mostrar | Hipóteses |
| --- | --- | --- | --- |
| Teste do protótipo, moderado | 6 compradores, 30 minutos cada, cenários com prazo | Escolha declarada e usabilidade: o que escolhem, se terminam, quanto tempo levam, onde travam | H2, H3, H5, H7, H8, H10, H17 |
| Teste de 5 segundos | Os mesmos 6 compradores | Se a página da loja se lê de relance | H18 |
| Prova de conceito: o agente, ou o concierge feito à mão no WhatsApp | 10 lojas a até 15 minutos a pé da Blythe Road, 6 compradores com necessidades reais | Comportamento: lojas respondendo, atendimento, compra, retirada, volta | H1, H2, H4, H6, H7, H11, H12, H16 |
| Conversas com as lojas | As 10 lojas, mais 5 para o resumo de demanda | O que as lojas aceitam e valorizam, e o esforço delas | H6, H9, H13, H14, H15, H19 |
| Analytics num build futuro | Todo comprador que consentir | As mesmas métricas em escala, por área e ao longo do tempo | Todas, quando existir |

Um diário de duas semanas com os três compradores que trabalham no horário das lojas mostraria o que os dois dias da prova de conceito não mostram: se eles pedem de novo na semana seguinte. É uma proposta, fora dos testes como estão escritos.

## Hipóteses e suas medidas

Os critérios de aprovação são copiados de [Hipóteses](../define/hypotheses.md). Os nomes dos eventos estão definidos em [Tarefas e eventos](telemetry.md).

| # | Métrica | Eventos | Passa se | Método |
| --- | --- | --- | --- | --- |
| H1 | Parcela de consultas com resposta válida em até 10 minutos de loja aberta; parcela de buscas resolvidas | `shop_asked`, `shop_replied` (válida, minutos até responder), `shop_timed_out`, `answer_received` | 60% de 20 consultas; metade das buscas, relatadas separadamente | Prova de conceito |
| H2 | Declarado: ir à loja em vez de pedir online. Comportamento: taxa de retirada | Escolha no protótipo; `order_set_aside`, `order_collected`, `order_not_collected` | 4 de 6; 2 de cada 3 compras retiradas | Teste do protótipo, depois prova de conceito |
| H3 | Primeira ação por cenário: perguntar ou explorar; o que pareceu mais simples | `ask_started` contra `nearby_viewed`, `category_opened`, `shop_opened` como primeira ação; as notas de quem observa | 4 de 6 perguntam primeiro; 4 de 6 acham mais simples | Teste do protótipo |
| H4 | Compradores que esperam a resposta | `request_created`, `answer_received`, `payment_succeeded`, `request_closed`; uma pergunta depois sobre se compraram em outro lugar, que nenhum evento mostra | 4 de 6 esperam | Concierge feito à mão |
| H5 | Preferência entre a confirmação da loja e o estoque do caixa | Escolha num teste lado a lado | 4 de 6, com motivos | Teste do protótipo |
| H6 | Lojas que guardam um item comprado por 7 dias; depois, quanto tempo os itens esperam | Declarado; depois `order_set_aside` e `order_collected` (dias depois de pronto) | 6 de 10 | Conversas com as lojas |
| H6, depois do trabalho | Lojas que oferecem um horário mais tarde ou um ponto de retirada; pontos abertos depois das 18h30 | Declarado; uma volta pelo anel; depois `order_collected` (lugar, hora) | 3 de 10, e um ponto | Conversas e uma volta |
| H7 | Compradores que trabalham e compram antes para retirar depois | Escolha no protótipo; `payment_succeeded`, `order_collected` (lugar, hora) | 4 de 6 declarado; 2 compras reais retiradas | Teste do protótipo, depois prova de conceito |
| H8 | Compradores que escolhem Keep looking, uma vez ou toda semana | `keep_looking_set` (recorrente ou não) | 3 de 6 aviso pontual; 2 de 6 semanal | Teste do protótipo |
| H9 | Lojistas que dizem que o resumo mudaria o que estocam ou os faria responder | `demand_summary_sent`, `demand_summary_read` | 3 de 5 | Conversas com as lojas |
| H10 | Onde os compradores querem o concierge | Declarado; depois `request_created` (canal) | Uma divisão, sem critério | Teste do protótipo |
| H11 | Lojas cujo caixa guarda códigos de produto | O cadastro da loja (origem: conectada) | Uma contagem, sem critério | Prova de conceito |
| H12 | Sins que terminam em compra | `answer_received` (um sim) seguido de `payment_succeeded` no mesmo pedido | 70% | Prova de conceito |
| H13 | Lojas com outra maquininha que adotam o POS do provedor | `offer_made`, `offer_accepted` (tipo: pos) | 2 das primeiras 5 | Prova de conceito, depois de quatro semanas |
| H14 | Lojas no POS que o manteriam ou recomendariam; vendas do app por loja | `payment_succeeded` somado por loja; declarado | 3 de 5 | Prova de conceito e conversas |
| H15 | Lojas que pagam por destaque | `offer_made`, `offer_accepted` (tipo: promotion) | 2 de 10 | Prova de conceito |
| H16 | Parcela das compras retiradas em lojas a mais de 15 minutos | `order_collected` (minutos a pé) | Uma parcela, sem critério | Prova de conceito |
| H17 | Quantas vezes a loja consultada é escolhida, com e sem a linha de confiabilidade | Escolha em pares de cartões | 3 de 6 pares com a linha, e mais do que sem | Teste do protótipo |
| H18 | Leitura correta de "% would go back" contra estrelas | Respostas num teste de 5 segundos | 5 de 6, não menos do que com estrelas | Teste de 5 segundos |
| H19 | Lojas que aceitam um número público de precisão de estoque | Declarado | 6 de 10 | Conversas com as lojas |

## Indicadores de usabilidade e de produto

Indicadores de usabilidade dizem se um comprador consegue fazer uma tarefa: sucesso na tarefa, tempo na tarefa, erros e onde hesita. Eles vêm do teste do protótipo, onde as lojas seguem um roteiro, e dos [usuários sintéticos de teste](../deliver/synthetic-users.md), que só mostram que um caminho existe. Respondem "consegue", nunca "vai fazer".

Indicadores de produto dizem se as pessoas fazem e voltam: taxa de atendimento, conversão de um sim em compra, taxa de retirada, uso repetido, lojas que continuam respondendo. Eles precisam de lojas reais e necessidades reais, então começam na prova de conceito e saem dos registros do serviço. Um protótipo pode passar em todas as medidas de usabilidade enquanto o produto falha nestas, e por isso a H1 é testada primeiro.

O tempo esperando as lojas é do lado do produto. No protótipo, uma loja do roteiro responde em 1 a 40 segundos, então os tempos do protótipo medem o esforço do comprador e não dizem nada sobre a espera.

## Guardrails

Cada métrica de crescimento tem um guardrail que ela não pode empurrar para cima: compras canceladas, estornos, compras não retiradas, compras não confirmadas ou vendidas depois de um sim, reclamações, lojas que saem, compradores que desligam as notificações, e o número de pedidos que cada loja precisa responder para cada compra que recebe. As definições estão em [Métricas de produto](metrics.md#guardrails). Os limites devem ser definidos antes de a prova de conceito começar, como foram os critérios de aprovação.

## Avaliações, NPS e CSAT

O produto já pede uma medida atitudinal. Depois que uma compra é retirada ou entregue, o Snuffle pergunta a todo mundo que comprou "Would you go back?" com polegar para cima ou para baixo, até três tags e uma nota opcional (decisão 047). A parcela de polegares para cima é uma nota de satisfação por loja e por compra, e as tags dizem que parte deu errado ("Not ready when I came", "Wasn't as described").

A recomendação é não adicionar NPS. A prova de conceito tem seis compradores, então uma pessoa move o número em cerca de 17 pontos, e nenhuma decisão poderia se apoiar nele. O NPS pergunta se a pessoa recomendaria o app, um indicador indireto de voltar, e a prova de conceito consegue contar quem volta. As compras são poucas por mês, então um segundo pedido de resposta depois de uma tarefa rápida acrescenta atrito a um utilitário que já pede uma avaliação, e não diz qual etapa falhou.

Um CSAT fixo também não é necessário, porque a avaliação já é um, para a loja. A avaliação tem duas lacunas. Ela só chega a quem retirou, o caminho que deu certo, então um comprador cujo pedido terminou em "Not found" ou "Not confirmed" nunca é perguntado. E ela avalia a loja, não o Snuffle. Na prova de conceito, as duas lacunas saem mais baratas numa conversa com os seis compradores no fim do que numa pesquisa. Se um build futuro precisar de um número, a opção é uma pergunta opcional, "Did Snuffle help?", mostrada uma vez numa amostra dos pedidos que terminam sem compra. É uma opção para eu decidir, fora do plano.

As lojas precisam da própria pergunta. A satisfação delas é sobre esforço e vendas, e a nota de um comprador não diz nada sobre isso. Na prova de conceito, isso é uma conversa semanal com cada uma das dez lojas, pessoalmente ou no WhatsApp: quantos pedidos pareceram demais, o que mudariam, se continuariam. As lojas que saem são a medida de comportamento que acompanha essa conversa.

## Situação da telemetria

Nenhum destes eventos ou métricas está construído. O protótipo não tem analytics, e as lojas, os pagamentos e as datas dele vêm de uma simulação. Os eventos são a definição que um build futuro implementaria, e o registro que o concierge feito à mão manteria na mão. As regras de privacidade estão em [Tarefas e eventos](telemetry.md#privacidade).
