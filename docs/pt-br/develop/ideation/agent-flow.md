# Fluxo do agente

A conversa entre o comprador e o Snuffle, turno a turno, e por trás dela a conversa entre o Snuffle e as lojas. As caixas são estados da conversa com as falas ditas em cada um, não telas: as telas estão no Fluxo do app e os estados do pedido na loja em Estados do pedido na loja.

```summary
Takeaways:
- Um pedido abre duas conversas. O comprador fala com o Snuffle no chat; o Snuffle fala com cada loja consultada no WhatsApp, com respostas numeradas, e com uma loja conectada pelo caixa.
- O Snuffle fala em poucos pontos fixos: confirma o que entendeu, pergunta como o comprador quer o item, diz quem consultou, relata cada resposta e relata o dinheiro (cobrado, não cobrado, reembolsado).
- Todo beco sem saída tem um próximo passo no chat: sold e não confirmou levam à próxima loja, nada encontrado oferece Ask further away e Keep looking, uma data perdida oferece Ask the shop again.
- O protótipo faz todo o caminho principal e os becos sem saída de Buy e Collect. Um pedido semanal, uma pergunta quando faltam palavras, um pedido fora da área e as falhas depois da cobrança estão só desenhados, e cada um está marcado assim no quadro.
Call:
- Pedi uma página ao lado do Fluxo do app e de Estados do pedido na loja que mostrasse as conversas como um fluxo, os chats como eu os imagino, e não como telas.
- Pedi que cada ramo diga se o protótipo faz, se um timer faz o papel da loja ou se está só desenhado, para as suposições ficarem visíveis.
- Decidi que o Snuffle nunca decide pelo comprador: um item parecido, uma quantidade menor e um achado tardio são mostrados, e o comprador toca em Buy.
AI:
- Um agente desenhou o quadro a partir dos roteiros do protótipo (simulação, chat, outros chats e passos da jornada) e das specs, e tirou as mensagens da loja dos Estados do pedido na loja v5. Eu revisei quais ramos existem no protótipo e quais são suposições.
Trade-offs:
- Citar as falas exatas do protótipo deixa o quadro fiel, e o prende a um roteiro que só conhece três pedidos.
- Os ramos só desenhados (faltam palavras, fora da área, sumiu depois da cobrança) são os casos que um agente de verdade encontra primeiro, e os que o protótipo não tem dados para mostrar.
```

## Lendo o quadro

O quadro tem três partes. A fileira de colunas de cima segue um pedido das palavras até o recibo: o pedido, as lojas sendo consultadas, as respostas, Buy e Collect. Abaixo, um pedido semanal e o ramo para quando nada volta. Na base, as mensagens entre o Snuffle e as lojas.

Uma moldura contínua é algo que o protótipo faz. Uma moldura tracejada só está desenhada. O lado da loja é feito por timers no protótipo, e esses nós dizem isso.

## O que fica em aberto

O tom das perguntas do Snuffle quando falta uma palavra é um palpite até ser testado com pedidos reais. Quantas vezes o Snuffle pergunta de novo a uma loja que não entende uma resposta numerada está em aberto. Quem revisa um sinal contestado continua em aberto em Estados do pedido na loja.
