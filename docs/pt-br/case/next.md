# O que vou testar a seguir

O primeiro teste é saber se as lojas respondem, à mão, antes de construir qualquer coisa que dependa disso. Defini cada critério de aprovação antes de testar, para que um resultado não possa ser lido a favor.

## As três hipóteses

O conceito se apoia nestas três. A H1 decide se o concierge pode funcionar; a H3 e a H4 decidem se quem compra quer usá-lo. Nenhuma tem evidência ainda.

<div class="dg dg-hyps"><div class="dg-hyp"><div class="dg-hyp-head"><b>H1 · As lojas respondem</b></div><dl><dt>Acredito que</dt><dd>Os lojistas respondem a um pedido de estoque no WhatsApp em até 10 minutos enquanto estão abertos, com uma resposta sobre a qual quem compra pode agir.</dd><dt>Teste</dt><dd>À mão, no WhatsApp: 60 pedidos para 10 lojas a menos de 15 minutos a pé da Blythe Road, em cinco dias.</dd><dt>Passa se</dt><dd>36 dos 60 pedidos recebem uma resposta válida em até 10 minutos, e pelo menos 12 das 24 buscas terminam com um sim utilizável antes do prazo.</dd></dl></div><div class="dg-hyp"><div class="dg-hyp-head"><b>H3 · Quem compra pergunta</b></div><dl><dt>Acredito que</dt><dd>Compradores com uma necessidade específica preferem perguntar a um concierge só a explorar lojas e contatá-las uma a uma.</dd><dt>Teste</dt><dd>O protótipo oferece perguntar e explorar desde a primeira tela; anoto a primeira escolha em cada cenário e pergunto qual pareceu mais simples.</dd><dt>Passa se</dt><dd>Perguntar é a primeira escolha em 14 de 20 cenários, e 14 de 20 dizem que é mais simples.</dd></dl></div><div class="dg-hyp"><div class="dg-hyp-head"><b>H4 · Quem compra espera</b></div><dl><dt>Acredito que</dt><dd>Os compradores aceitam esperar vários minutos quando o concierge diz o que está fazendo e continua procurando.</dd><dt>Teste</dt><dd>Concierge feito à mão no WhatsApp com 20 compradores e pedidos reais; anoto quem espera e quem compra em outro lugar.</dd><dt>Passa se</dt><dd>14 de 20 esperam a resposta.</dd></dl></div></div>

## Primeiro experimento

Cerca de dez lojas independentes a menos de 15 minutos a pé da Blythe Road, e cerca de 60 pedidos em cinco dias. Um agente manda os pedidos no WhatsApp, vinte compradores usam o protótipo e as lojas recebem um resumo semanal de demanda. Se o agente não estiver pronto, eu mesmo faço o papel do concierge no WhatsApp. Convidar as lojas também é a primeira conversa com um lojista neste projeto.

Evidência: [hipóteses](../define/hypotheses.md), [próximo passo](../define/next-step.md).

## Sinais para parar ou seguir

- H1, H3 e H4 passam: o concierge pode ser a entrada principal.
- H1 falha: o conceito se estreita para lojas cujo caixa compartilha estoque, ou para um pedido mais lento com resposta até um horário definido.
- H3 ou H4 falha: explorar vira a tela principal, e o Snuffle cuida do que explorar não responde.

## Medição

O sucesso na tarefa é a base: se quem compra vai do pedido a uma compra e a um item retirado, e onde desiste. A métrica norte é pedidos concluídos por semana, os pedidos que terminam com uma compra retirada ou entregue; uma semana inteira equilibra as tarefas dos dias úteis e as compras do fim de semana. Enquanto o produto é novo, eu registraria eventos de forma ampla e cortaria depois, porque eventos custam dinheiro em escala. O plano define 58 eventos e não constrói nenhum no protótipo, e o canvas do [Fluxo do app](../develop/ideation/app-flow.md) tem uma camada de medição (tecla M) que põe cada tarefa, evento e métrica na sua tela.

Evidência: [plano de medição](../verify/measurement.md), [métricas de produto](../verify/metrics.md).

## O que eu faria diferente

Eu colocaria alguns pedidos reais na frente das lojas cedo. A prova de conceito no lugar de entrevistas continua de pé, mas terminei com a H1 sem evidência nenhuma.

Eu definiria as etapas de revisão visual antes da primeira tela. O crítico visual chegou depois que os blocos pastel mediram 1,01:1, e várias decisões visuais foram revertidas em poucos dias: o fundo da marca, o lado do botão Requests, a cor do cartão de loja.

Eu usaria dados reais sempre que fosse barato. Os tempos de caminhada eram inventados até as rotas reais os substituírem, e duas lojas então ficaram fora do raio de 20 minutos.
