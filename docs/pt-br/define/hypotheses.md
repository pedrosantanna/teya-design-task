# Hipóteses

O conceito se apoia em onze hipóteses. A maioria vem de uma suposição ou pergunta em aberto da [conclusão do Discover](../discover/conclusion.md); quatro vêm dos meus motivos para fazer do concierge um agente. Cada uma tem um teste e um resultado que conta como aprovação. Estão ordenadas por risco: o tamanho do estrago no conceito se a hipótese estiver errada, e o pouco de evidência que existe hoje.

```summary
Takeaways:
- A hipótese mais arriscada está do lado das lojas: lojistas respondendo a um pedido em minutos (H1). Não há evidência, e sem isso o concierge não funciona.
- A minha principal hipótese sobre o produto é que os compradores preferem perguntar a um concierge só a explorar lojas e ligar para elas por conta própria (H3), e que aceitam esperar enquanto ele trabalha (H4).
- Dois testes baratos cobrem a maior parte do risco: um concierge feito à mão pelo WhatsApp na King Street e um protótipo clicável com cinco ou seis compradores.
Call:
- Testar primeiro o lado das lojas, à mão, antes de construir qualquer coisa que dependa dele.
- Fazer o teste à mão pelo WhatsApp, comigo no papel de concierge. Ele testa as lojas, a espera e um dos canais de uma vez.
- Os critérios de aprovação são definidos antes do teste, para que um resultado não possa ser lido do jeito que convém.
AI:
- Um agente rascunhou as hipóteses a partir das suposições e do conceito, e propôs testes e critérios de aprovação. Eu acrescentei as quatro sobre o agente e defini a ordem.
Trade-offs:
- Testes pequenos dão direção e não provam nada. Passar com seis compradores justifica o próximo passo. Um lançamento pediria bem mais.
- Um concierge feito por uma pessoa esconde quão bem os agentes fariam o mesmo trabalho. Esse é um teste para depois, quando as lojas passarem.
```

## Hipóteses por risco

| # | Acredito que… | De onde vem | Teste | Passa se |
| --- | --- | --- | --- | --- |
| H1 | Lojistas respondem a um pedido de estoque em até 10 minutos enquanto estão abertos | A12; perguntas em aberto 2 e 5 | Concierge à mão: mandar 20 pedidos reais para 10 lojas da King Street por telefone e WhatsApp ao longo de dois dias, cronometrados | 60% respondidos em até 10 minutos |
| H2 | Um comprador com uma necessidade urgente e específica faz a ida quando uma loja confirma e segura o item | A5 | Protótipo com 5 ou 6 compradores, cada um com um cenário com prazo | 4 de 6 escolhem ir à loja em vez de pedir online |
| H3 | Compradores com uma necessidade específica preferem perguntar a um concierge só a explorar lojas e contatá-las uma por uma | Conceito; um post | O protótipo oferece perguntar e explorar desde a primeira tela; anotar a primeira escolha em cada cenário e perguntar qual pareceu mais simples | Perguntar é a primeira escolha em 4 de 6 cenários de necessidade específica, e 4 de 6 dizem que é mais simples |
| H4 | Os compradores aceitam esperar vários minutos quando o concierge diz o que está fazendo e continua procurando | Conceito | Concierge feito à mão pelo WhatsApp com 5 ou 6 compradores e pedidos reais; anotar quem espera e quem compra em outro lugar enquanto isso | 4 de 6 esperam a resposta |
| H5 | Os compradores confiam mais numa confirmação da loja do que num número de estoque numa listagem | A10 | Mesmo protótipo, duas versões da resposta lado a lado | 4 de 6 preferem a confirmação da loja e dizem por quê |
| H6 | As lojas seguram um item por algumas horas, e até o fechamento para quem já pagou | Pergunta em aberto 5 | Perguntar às 10 lojas da H1 se segurariam e por quanto tempo, com e sem pagamento | 6 de 10 segurariam um item pago até o fechamento |
| H7 | Reservar e pagar antes, e retirar numa janela combinada, traz de volta compradores que desistiram por causa do horário | A6, A7 | Cenário do protótipo para compradores que trabalham; pergunta de acompanhamento sobre o que fariam hoje | 3 de 5 dizem que usariam isso no lugar da Amazon ou do supermercado para aquela compra |
| H8 | Os compradores deixam pedidos com antecedência para o concierge agir sobre eles | Conceito | O protótipo oferece um pedido recorrente ao fim de cada cenário concluído | 3 de 6 criam um |
| H9 | Os lojistas veem valor em saber o que os compradores próximos pedem, inclusive o que eles não tinham | Pergunta em aberto 1 | Mostrar a 5 lojistas um resumo semanal fictício da demanda na rua deles | 3 de 5 dizem que isso mudaria o que estocam ou os faria responder pedidos |
| H10 | Alguns compradores preferem usar o concierge no WhatsApp ou no próprio assistente a instalar um app | Conceito | Perguntar a cada comprador dos testes da H3 e da H4 onde gostaria de usá-lo | Registrado como uma divisão; sem critério de aprovação, serve para definir a ordem dos canais |
| H11 | Uma minoria das lojas de uma rua tem dados de caixa com detalhe por item | F8; pergunta em aberto 3 | Contar, nas 10 lojas da King Street da H1, quais caixas têm códigos de produto | Registrado como número; sem critério de aprovação, serve para dimensionar o atalho da resposta na hora |

## O que cada teste precisa

- **Concierge à mão pelo WhatsApp (H1, H4, H6, H10, H11).** Um telefone, WhatsApp, uma lista de dez lojas de categorias que apareceram na netnografia (ferragens, floricultura, padaria, açougue, farmácia) e cinco ou seis compradores com necessidades reais. Eu faço o papel de concierge. Nada construído. Dois dias.
- **Teste do protótipo (H2, H3, H5, H7, H8, H10).** O protótipo clicável do Deliver, com cenários tirados dos posts das personas (óculos para eclipse na véspera, um ventilador numa onda de calor, as compras da semana depois do trabalho). Cinco ou seis compradores, 30 minutos cada.
- **Conversas com lojistas (H9).** Cinco visitas curtas com um mock-up impresso.

## Se a H1 falhar

O concierge, do jeito que foi desenhado, não funciona. As alternativas são mais estreitas: só lojas cujos caixas compartilham o estoque (respostas na hora, pouca cobertura), ou um pedido mais lento com a promessa de resposta até um horário definido, que serve mais à Jess do que ao Sam.

## Se a H3 ou a H4 falhar

O agente deixa de ser a entrada principal. Explorar lojas e categorias vira a tela principal, e o concierge fica como ferramenta para os pedidos que explorar não resolve.
