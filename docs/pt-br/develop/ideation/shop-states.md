# Estados do pedido na loja

Um pedido do lado da loja, do momento em que o concierge pergunta até o momento em que o item é retirado ou liberado. Não há interface para a loja neste take-home: estes estados, e a mensagem de WhatsApp que a loja vê em cada um, são o que eu levo aos lojistas na prova de conceito.

```summary
Takeaways:
- Há dois tipos de loja respondendo. O POS de uma loja conectada compartilha o estoque, então a resposta é na hora e a venda também. Uma loja consultada recebe uma mensagem do Snuffle no WhatsApp e responde do seu jeito.
- O comprador compra, e o valor é autorizado. A loja consultada confirma que separou o item, e isso faz a cobrança. Se ela não confirma em 10 minutos, a autorização cai e ninguém é cobrado (decisão 037).
- Cada loja define por quanto tempo guarda um item comprado: 7 dias por padrão, 14 ou 30, o mesmo dia ou o seguinte para perecíveis. Se ninguém retira, o pedido é cancelado, o comprador recebe o reembolso integral e o item volta à venda.
- Um "não" ou uma resposta atrasada não se perde: os dois entram no resumo semanal de demanda (H9).
Call:
- Disse que um item pago não devia ficar guardado só por algumas horas e pedi a norma do Reino Unido. As janelas de retirada seguem como as redes do Reino Unido guardam pedidos pagos de click-and-collect, cerca de uma semana, e a loja pode dar mais (decisões 030 e 037).
- Separei a loja conectada da loja consultada (decisão 031), tirei a reserva sem pagamento (decisão 032) e defini a ordem entre autorização e confirmação e quais respostas a loja pode mandar.
- Escolhi o WhatsApp primeiro para as lojas consultadas, porque elas já usam e não precisam instalar nada. A primeira mensagem é um template pré-aprovado por causa da regra de 24 horas do WhatsApp.
- Deixei a entrega pela loja mapeada, não desenhada: o Snuffle só repassa "cobrado", "a caminho" e "entregue". A loja marca o item como retirado, lendo o código ou com um toque.
AI:
- Um agente desenhou os estados a partir do blueprint de serviço e escreveu as mensagens de exemplo. Na v2 ele acrescentou a loja conectada e as datas, depois da pesquisa documental sobre retirada no Reino Unido; na v3 tirou a reserva sem pagamento depois que eu a descartei; na v4 passou os estados para a compra e acrescentou as lacunas que uma revisão de fluxo encontrou. Eu defini a ordem entre autorização e confirmação, as janelas de retirada e quais respostas a loja pode mandar.
Trade-offs:
- Um prazo longo prende estoque de uma loja que pode ter uma unidade só; deixar cada loja definir faz a promessa variar de loja para loja.
- Respostas numeradas (1, 2, 3) são fáceis de ler pelo agente e rígidas para a loja. Texto livre seria mais simpático e exige que o agente leia com segurança.
```

## Versões

| Versão | O que mudou | Por quê |
| --- | --- | --- |
| v4 (atual) | O comprador compra em vez de reservar: comprado (autorizado), separado e cobrado, esperando retirada, retirado pela loja. Ramos novos: não confirmou em 10 minutos, o comprador cancela, não retirado até a data, tem menos do que o pedido, entrega cobrada e enviada. Uma nota sobre o ajuste da janela de retirada da loja. As mensagens vêm do Snuffle | Decisão 037, e uma revisão de fluxo que achou estados da loja sem tela para o comprador e o contrário |
| v3 | Sem a reserva sem pagamento: depois de um sim, a loja guarda um item pago ou entrega | A reserva sem pagamento deixava o pagamento fora do app e o risco de a pessoa não aparecer com a loja (decisão 032) |
| v2 | Lojas conectadas e consultadas, as três formas de levar o item, reservas em dias com dia de retirada, a entrega da própria loja mapeada | Uma reserva "até as 16h" era mais curta do que as lojas do Reino Unido guardam pedidos pagos (decisões 030 e 031) |
| v1 | Primeiros estados a partir do blueprint, mensagens de WhatsApp | Primeira versão |
