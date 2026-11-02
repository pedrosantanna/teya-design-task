# Próximo passo

A Define termina com uma decisão sobre como aprender a partir daqui. Não vou fazer outra rodada de pesquisa com lojistas antes de construir. Vou construir uma prova de conceito do agente concierge, levá-la a algumas lojas em volta da localização de um comprador e usá-la com elas e com compradores. O cuidado de design vai para o app de quem compra; o lado da loja é desenhado como estados, sem interface.

```summary
Takeaways:
- Uma prova de conceito com lojas de verdade testa de uma vez a maior parte das hipóteses mais arriscadas: se as lojas respondem (H1), seguram itens (H6) e dão valor ao sinal de demanda (H9), e se os compradores perguntam, esperam e voltam (H2 a H4, H7, H8, H10).
- Convidar as lojas para a prova de conceito também é descoberta: como elas respondem, quando, por qual canal e com quanto esforço.
- As lojas podem trazer os primeiros compradores, o que trato como uma suposição sobre aquisição.
Call:
- Construir uma prova de conceito em vez de entrevistar lojistas primeiro. Um protótipo do agente leva dias, e o que as lojas fazem com um pedido real diz mais do que o que diriam numa entrevista.
- O cuidado de design vai para o app de quem compra, nativo e com iOS primeiro. O lado da loja fica como um conjunto de estados para o WhatsApp ou o POS da loja.
AI:
- Eu tomei a decisão. Um agente escreveu esta página a partir das minhas notas e ligou cada hipótese à parte da prova de conceito que a testa.
Trade-offs:
- Construir primeiro gasta esforço antes de eu saber se as lojas vão responder. O concierge feito à mão continua como alternativa se o agente não estiver pronto.
- Algumas lojas numa rua mostram se o fluxo funciona ali; não mostram se ele escala.
```

## Prova de conceito

| Parte | O que é | Hipóteses que testa |
| --- | --- | --- |
| Agente concierge com as lojas | O agente manda pedidos reais a cerca de dez lojas a até 15 minutos a pé da Blythe Road pelo WhatsApp, ou pelo POS quando o sistema da loja permite, e cuida das respostas delas | H1, H6, H11 |
| Protótipo do app de quem compra | O lado do comprador no blueprint, etapas 1 a 5, com as respostas do agente vindo das lojas de verdade quando elas respondem | H2, H3, H4, H5, H7, H8, H10 |
| Resumo da demanda | Um resumo semanal do que os compradores próximos pediram, enviado às lojas da prova de conceito | H9 |
| Pagamentos e ofertas pagas | Toda reserva pode ser paga agora ou no balcão. Depois de quatro semanas, as lojas recebem a oferta do POS do provedor e do destaque pago | H12 a H16 |

Os critérios de aprovação continuam como estão em [hipóteses](hypotheses.md).

## Área do teste

A prova de conceito acontece em volta da localização de um comprador, e não de uma rua: cerca de dez pequenas lojas independentes a até 15 minutos a pé da Blythe Road, espalhadas pelas lojas da própria Blythe Road, Shepherd's Bush Road, Shepherd's Bush Green, Goldhawk Road, Hammersmith Broadway e King Street, e Kensington High Street no lado do Olympia (distâncias no [conceito](index.md)). As lojas são escolhidas entre categorias que apareceram na netnografia: ferragens, floricultura, padaria, açougue, farmácia, papelaria. Dez lojas nesse anel ficam perto o bastante para visitar num dia, o que os convites exigem.

## Lojas como descoberta

Convidar uma loja é a primeira conversa com um lojista neste projeto. Cada convite registra como a loja responde hoje, quem responde, por qual canal, com que rapidez e o que a faria dizer não. São as perguntas em aberto 1 a 6 da [conclusão do Discover](../discover/conclusion.md), agora respondidas observando em vez de perguntando.

## Lojas como canal de aquisição

As lojas da prova de conceito podem indicá-la aos próprios clientes: um aviso no balcão, uma linha nas respostas pelo WhatsApp. Suponho que isso basta para chegar aos primeiros compradores em volta da Blythe Road. Outros canais de aquisição ficam fora deste take-home.

## Escopo para a Develop

- **App de quem compra.** Desenhado e prototipado como um app nativo de iOS, seguindo primeiro as Human Interface Guidelines da Apple e depois o Material Design.
- **Lado da loja.** Sem interface. Os estados por que um pedido passa do lado da loja, e a mensagem que a loja vê em cada um, para que possam ser mostrados aos lojistas e construídos no WhatsApp ou num POS.
- **Agentes.** O comportamento deles está descrito no blueprint; construí-los faz parte da prova de conceito, fora do protótipo deste take-home.
