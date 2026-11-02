# Hipóteses

O conceito se apoia em oito hipóteses. Cada uma vem de uma suposição ou pergunta em aberto da [conclusão do Discover](../discover/conclusion.md), e cada uma tem um teste e um resultado que conta como aprovação. Estão ordenadas por risco: o tamanho do estrago no conceito se a hipótese estiver errada, e o pouco de evidência que existe hoje.

```summary
Takeaways:
- A hipótese mais arriscada está do lado das lojas: lojistas respondendo a um pedido em minutos (H1). Não há evidência, e sem isso o concierge não funciona.
- A principal hipótese sobre compradores é que um item confirmado e seguro basta para fazer a ida (H2).
- Dois testes baratos cobrem a maior parte do risco: um concierge feito à mão na King Street e um protótipo clicável com cinco ou seis compradores.
Call:
- Testar primeiro o lado das lojas, à mão, antes de construir qualquer coisa que dependa dele.
- Os critérios de aprovação são definidos antes do teste, para que um resultado não possa ser lido do jeito que convém.
AI:
- Um agente rascunhou as hipóteses a partir das suposições e do conceito, e propôs testes e critérios de aprovação. A ordem eu defini.
Trade-offs:
- Testes pequenos dão direção e não provam nada. Passar com seis compradores justifica o próximo passo. Um lançamento pediria bem mais.
```

## Hipóteses por risco

| # | Acredito que… | De onde vem | Teste | Passa se |
| --- | --- | --- | --- | --- |
| H1 | Lojistas respondem a um pedido de estoque em até 10 minutos enquanto estão abertos | A12; perguntas em aberto 2 e 5 | Concierge à mão: mandar 20 pedidos reais para 10 lojas da King Street por telefone e WhatsApp ao longo de dois dias, cronometrados | 60% respondidos em até 10 minutos |
| H2 | Um comprador com uma necessidade urgente e específica faz a ida quando uma loja confirma e segura o item | A5 | Protótipo com 5 ou 6 compradores, cada um com um cenário com prazo | 4 de 6 escolhem ir à loja em vez de pedir online |
| H3 | Os compradores confiam mais numa confirmação da loja do que num número de estoque numa listagem | A10 | Mesmo protótipo, duas versões da resposta lado a lado | 4 de 6 preferem a confirmação da loja e dizem por quê |
| H4 | Compradores com uma necessidade específica começam perguntando ao agente; explorar é usado quando não há uma | Conceito; um post | O protótipo oferece as duas opções desde a primeira tela; anotar a primeira escolha em cada cenário | Perguntar é a primeira escolha em 4 de 6 cenários de necessidade específica |
| H5 | As lojas seguram um item por algumas horas, e até o fechamento para quem já pagou | Pergunta em aberto 5 | Perguntar às 10 lojas da H1 se segurariam e por quanto tempo, com e sem pagamento | 6 de 10 segurariam um item pago até o fechamento |
| H6 | Reservar e pagar antes, e retirar numa janela combinada, traz de volta compradores que desistiram por causa do horário | A6, A7 | Cenário do protótipo para compradores que trabalham; pergunta de acompanhamento sobre o que fariam hoje | 3 de 5 dizem que usariam isso no lugar da Amazon ou do supermercado para aquela compra |
| H7 | Os lojistas veem valor em saber o que os compradores próximos pedem, inclusive o que eles não tinham | Pergunta em aberto 1 | Mostrar a 5 lojistas um resumo semanal fictício da demanda na rua deles | 3 de 5 dizem que isso mudaria o que estocam ou os faria responder pedidos |
| H8 | Uma minoria das lojas de uma rua tem dados de caixa com detalhe por item | F8; pergunta em aberto 3 | Contar, nas 10 lojas da King Street da H1, quais caixas têm códigos de produto | Registrado como número; sem critério de aprovação, serve para dimensionar o atalho da resposta na hora |

## O que cada teste precisa

- **Concierge à mão (H1, H5, H8).** Um telefone, WhatsApp e uma lista de dez lojas de categorias que apareceram na netnografia (ferragens, floricultura, padaria, açougue, farmácia). Nada construído. Dois dias.
- **Teste do protótipo (H2, H3, H4, H6).** O protótipo clicável do Deliver, com cenários tirados dos posts das personas (óculos para eclipse na véspera, um ventilador numa onda de calor, as compras da semana depois do trabalho). Cinco ou seis compradores, 30 minutos cada.
- **Conversas com lojistas (H7).** Cinco visitas curtas com um mock-up impresso.

## Se a H1 falhar

O concierge, do jeito que foi desenhado, não funciona. As alternativas são mais estreitas: só lojas cujos caixas compartilham o estoque (respostas na hora, pouca cobertura), ou um pedido mais lento com a promessa de resposta até um horário definido, que serve mais à Jess do que ao Sam.
