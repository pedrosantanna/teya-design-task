# Estados do pedido na loja

Um pedido do lado da loja, do momento em que o concierge pergunta até o momento em que o item é retirado ou liberado. Não há interface para a loja neste take-home: estes estados, e a mensagem de WhatsApp que a loja vê em cada um, são o que eu levo aos lojistas na prova de conceito.

```summary
Takeaways:
- A loja faz quatro coisas no fluxo inteiro: responder sim ou não, separar o item, entregá-lo e avisar que foi retirado. Cada uma é uma resposta no WhatsApp ou um toque no POS.
- O comprador só é cobrado depois que a loja confirma que o item está separado, então um item que já foi vendido não custa dinheiro a ninguém.
- Um "não" ou uma resposta atrasada não se perde: os dois alimentam o resumo semanal da demanda (H9).
Call:
- WhatsApp primeiro, porque as lojas já usam e não é preciso instalar nada. A primeira mensagem é um template pré-aprovado por causa da regra de 24 horas do WhatsApp.
- A variante no POS mostra os mesmos estados na maquininha, com botões no lugar de respostas digitadas.
AI:
- Um agente desenhou os estados a partir do blueprint de serviço e escreveu as mensagens de exemplo. Eu defini a ordem entre reserva e pagamento e quais respostas a loja pode mandar.
Trade-offs:
- Respostas numeradas (1, 2, 3) são rápidas de interpretar e rígidas para a loja. Texto livre seria mais amigável, e exige que o agente o leia com confiabilidade.
```
