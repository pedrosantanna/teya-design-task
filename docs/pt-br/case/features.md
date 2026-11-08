# Funcionalidades

Nove clipes curtos do protótipo, um por funcionalidade, cada um com toques e digitação na versão web. As lojas são inventadas e respondem por um roteiro; o texto da interface fica em inglês.

Pedi um clipe por funcionalidade principal. Um agente escolheu as nove, gravou com um script, `app/e2e/record-features.mjs`, que começa cada uma num passo do percurso e esconde o depurador de estados, e conferiu cada clipe quadro a quadro. O script pode gravar tudo de novo quando as telas mudarem.

## Pedir duas coisas de uma vez

<div class="feature"><video class="phone-video" src="../../case/media/ask-split.mp4" data-poster="../../case/media/ask-split.png" width="450" height="948" aria-label="Sam digita óculos para eclipse para hoje e um bolo de aniversário para sábado; o Snuffle propõe dois pedidos e ele toca em Split into 2" controls muted playsinline loop preload="metadata"></video><div>

Sam digita óculos para eclipse para hoje e um bolo de aniversário para sábado numa mensagem só. Os dois vão para lojas diferentes em dias diferentes, então o Snuffle propõe dois pedidos e ele decide. Depois o Snuffle repete o pedido dos óculos com a quantidade e o prazo das 16h.

Separar mantém as respostas de cada pedido numa conversa, e o comprador nunca precisa descobrir qual loja vende o quê.

</div></div>

## Respostas das lojas

<div class="feature"><video class="phone-video" src="../../case/media/shops-answer.mp4" data-poster="../../case/media/shops-answer.png" width="450" height="948" aria-label="Depois de Allow, seis lojas passam de Asked para Seen e para uma resposta; Paper and Co, Broadway Chemist e Olympia Cameras respondem com preços" controls muted playsinline loop preload="metadata"></video><div>

Quando Sam permite as notificações, o Snuffle pergunta a seis lojas. A Broadway Chemist responde na hora pelo caixa, a Bush Opticians diz que não tem, a Paper & Co responde por mensagem com preço e data para retirar, e a Olympia Cameras oferece algo parecido.

Cada resposta diz de onde veio, porque o estoque lido no caixa e o sim de um lojista são promessas diferentes. Toda resposta traz Buy, então a busca termina onde a compra começa.

</div></div>

## Comprar e esperar a loja

<div class="feature"><video class="phone-video" src="../../case/media/buy-and-wait.mp4" data-poster="../../case/media/buy-and-wait.png" width="450" height="948" aria-label="Sam toca em Buy, mantém 2 pares e a retirada, paga 29,98 libras com Apple Pay e espera a Paper and Co separar os pares" controls muted playsinline loop preload="metadata"></video><div>

Buy mostra a loja, a quantidade e a escolha entre retirar ou receber, depois o Apple Pay de £29,98. O pagamento fica só autorizado. Sam é cobrado quando a Paper & Co confirma que separou os pares; no protótipo isso leva alguns segundos, numa loja de verdade pode levar minutos.

A loja não corre o risco de uma reserva sem pagamento, e o comprador não paga por um item que já acabou.

</div></div>

## Recibo e código de retirada

<div class="feature"><video class="phone-video" src="../../case/media/receipt-code.mp4" data-poster="../../case/media/receipt-code.png" width="450" height="948" aria-label="O recibo mostra Ready, collect by Mon 9 Nov, o código K7Q2, Extend e Cancel for a refund; depois o código abre em tela cheia" controls muted playsinline loop preload="metadata"></video><div>

O recibo diz que os pares estão prontos, até quando retirar e como estender uma vez ou cancelar com reembolso. No balcão o código abre em tela cheia para a loja ler ou digitar.

</div></div>

## Vendido antes

<div class="feature"><video class="phone-video" src="../../case/media/sold-first.mp4" data-poster="../../case/media/sold-first.png" width="450" height="948" aria-label="A Paper and Co vendeu os últimos pares, Sam não é cobrado e compra 1 par na Broadway Chemist" controls muted playsinline loop preload="metadata"></video><div>

A Paper & Co vendeu os últimos pares antes de conseguir separá-los, então Sam não é cobrado. O Snuffle indica a Broadway Chemist, que ainda tem um par, e continua procurando o segundo.

Toda falha do percurso termina com um próximo passo. Esta é a mais provável, porque as lojas consultadas respondem de memória.

</div></div>

## Ninguém tem

<div class="feature"><video class="phone-video" src="../../case/media/nobody-has-it.mp4" data-poster="../../case/media/nobody-has-it.png" width="450" height="948" aria-label="Nenhuma das seis lojas tem os óculos antes das 16h; Sam escolhe Keep looking até sexta, 6 de novembro" controls muted playsinline loop preload="metadata"></video><div>

Nenhuma das seis lojas tem os óculos antes das 16h: quatro disseram que não e duas não responderam. O Snuffle oferece perguntar a lojas mais longe, ou continuar procurando até sexta e avisar Sam quando uma tiver. Nada é comprado até ele tocar em Buy.

</div></div>

## Retirar depois do trabalho

<div class="feature"><video class="phone-video" src="../../case/media/jess-after-work.mp4" data-poster="../../case/media/jess-after-work.png" width="450" height="948" aria-label="Jess compra um pão de fermentação natural na Rossi's Bakery e escolhe retirar na banca da esquina, aberta até as 23h" controls muted playsinline loop preload="metadata"></video><div>

Jess sai do trabalho às 18h, quando a Rossi's Bakery fecha. Na hora do almoço ela compra um pão de fermentação natural e escolhe a banca da esquina como lugar de retirada; a Rossi's deixa o pão lá antes de fechar, e a banca fica aberta até as 23h.

Ela é a segunda persona, e o problema dela é o horário. O ponto de retirada é como a compra cabe no dia dela.

</div></div>

## Por perto e páginas de loja

<div class="feature"><video class="phone-video" src="../../case/media/nearby-shop-page.mp4" data-poster="../../case/media/nearby-shop-page.png" width="450" height="948" aria-label="Em Nearby, Sam abre Bakery, depois a Rossi's Bakery, e rola até as avaliações e o desempenho dela no Snuffle" controls muted playsinline loop preload="metadata"></video><div>

Navegar pelas lojas é a segunda entrada. Uma categoria em Nearby lista as lojas a até 15 minutos a pé. A página da loja mostra o que ela vende, o que compradores encontraram lá há pouco, avaliações de quem retirou, e com que rapidez e confiabilidade ela responde no Snuffle.

O mapa dessas telas mostra só o marcador nesta versão web; os blocos do mapa estavam sendo corrigidos quando os clipes foram gravados.

</div></div>

## Android

<div class="feature"><video class="phone-video android" src="../../case/media/android.mp4" data-poster="../../case/media/android.png" width="450" height="976" aria-label="A tela de respostas no Android; Buy abre a folha inferior e depois a folha do Google Pay" controls muted playsinline loop preload="metadata"></video><div>

O mesmo código Expo roda no Android, aqui numa moldura de Pixel. A seta de voltar, a tipografia e a folha de pagamento seguem as convenções do Android, e o Google Pay ocupa o lugar do Apple Pay.

As duas plataformas têm tema escuro. Estes clipes estão no claro, porque a moldura de celular da versão web mostra cantos brancos sob uma tela escura.

</div></div>

Evidência: [protótipo](../deliver/prototype.md), [fluxo do app](../develop/ideation/app-flow.md), [modelo conceitual](../develop/design-system/conceptual-model.md).
