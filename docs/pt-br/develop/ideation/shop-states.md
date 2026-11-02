# Estados do pedido na loja

Um pedido do lado da loja, do momento em que o concierge pergunta até o momento em que o item é retirado ou liberado. Não há interface para a loja neste take-home: estes estados, e a mensagem de WhatsApp que a loja vê em cada um, são o que eu levo aos lojistas na prova de conceito.

```summary
Takeaways:
- Dois tipos de loja respondem. O POS de uma loja conectada compartilha o estoque, então a resposta é na hora e a reserva é um toque na maquininha. Uma loja consultada recebe uma mensagem no WhatsApp e responde do jeito dela.
- Depois de um sim, o comprador escolhe uma de duas formas: pagar e a loja guarda o item por 7 dias, ou pagar e a loja entregar com o entregador dela. Não existe reserva sem pagamento (decisão 032).
- O comprador só é cobrado depois que a loja confirma que o item está separado, então um item que já foi vendido não custa dinheiro a ninguém. Uma reserva paga que ninguém retira é reembolsada automaticamente.
- Um "não" ou uma resposta atrasada não se perde: os dois alimentam o resumo semanal da demanda (H9).
Call:
- Os prazos seguem como as lojas do Reino Unido guardam pedidos para retirada: uma semana para pedidos pagos, menos para perecíveis (decisão 030).
- A entrega pela loja está mapeada, não desenhada: o concierge só repassa "enviado", o link de rastreio e "entregue".
- WhatsApp primeiro para as lojas consultadas, porque as lojas já usam e não é preciso instalar nada. A primeira mensagem é um template pré-aprovado por causa da regra de 24 horas do WhatsApp.
AI:
- Um agente desenhou os estados a partir do blueprint de serviço e escreveu as mensagens de exemplo. Na v2 ele acrescentou a loja conectada, as três formas e as datas, depois da pesquisa documental sobre retirada no Reino Unido. Na v3 o agente tirou a reserva sem pagamento depois que eu a descartei. Eu defini a ordem entre reserva e pagamento, as formas de levar e quais respostas a loja pode mandar.
Trade-offs:
- Uma semana prende estoque numa loja que pode ter uma unidade só; a loja pode encurtar, e aí a promessa muda de loja para loja.
- Respostas numeradas (1, 2, 3) são rápidas de interpretar e rígidas para a loja. Texto livre seria mais amigável, e exige que o agente o leia com confiabilidade.
```

## Versões

| Versão | O que mudou | Por quê |
| --- | --- | --- |
| v3 (atual) | Sem a reserva sem pagamento: depois de um sim, a loja guarda um item pago ou entrega | A reserva sem pagamento deixava o pagamento fora do app e o risco de a pessoa não aparecer com a loja (decisão 032) |
| v2 | Lojas conectadas e consultadas, as três formas de levar o item, reservas em dias com dia de retirada, a entrega da própria loja mapeada | Uma reserva "até as 16h" era mais curta do que as lojas do Reino Unido guardam pedidos pagos (decisões 030 e 031) |
| v1 | Primeiros estados a partir do blueprint, mensagens de WhatsApp | Primeira versão |
