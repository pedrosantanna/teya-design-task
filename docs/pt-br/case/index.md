# Visão geral

O Snuffle é um concierge para as pequenas lojas independentes perto de quem compra: você diz o que precisa e até quando, ele pergunta às lojas, e você compra e retira na mesma conversa.

<div class="feature"><video class="phone-video" src="../../case/media/shops-answer.mp4" data-poster="../../case/media/shops-answer.png" width="450" height="948" aria-label="Seis lojas passam de Asked para Seen e para uma resposta; Paper and Co, Broadway Chemist e Olympia Cameras respondem com preço e Buy" controls muted playsinline loop preload="metadata"></video><div>

## Minha resposta ao brief

Escolhi findability: tem, agora? Poucas lojas pequenas publicam estoque item a item, então uma busca tem pouco para indexar. No Snuffle, a própria loja responde. Onde o caixa compartilha o estoque, a resposta é imediata; em todos os outros casos o Snuffle pergunta à loja e nunca chuta.

A transaction decide o que cada resposta carrega: a loja, o preço, uma data para retirar e Buy. A busca termina onde a compra começa.

A aposta da qual tudo depende é que as lojas respondem em minutos enquanto estão abertas. Nada na evidência mostra isso ainda, então é a [primeira coisa que vou testar](next.md).

</div></div>

## Como eu trabalho

Usei muito pouco Figma. Construo com agentes de IA em código e registro cada decisão como contexto extenso: a pesquisa, as specs, as regras e os registros. Chamo isso de contexto de IA, e ele é o segundo bloco da barra lateral. Todo agente lê esse contexto antes de trabalhar, então consigo rodar vários em paralelo sem gastar meu tempo corrigindo resultado ruim de IA.

Fiz isto sozinho, dirigindo os agentes, de 1 a 6 de novembro de 2026, num brief de take-home sem produto, compradores ou lojas reais por trás.

## O percurso

As páginas seguem a ordem em que trabalhei, que é também a ordem da gravação.

1. [Descoberta](discovery.md): pesquisa documental, Hammersmith, posts públicos, proto-personas e a escolha de findability.
2. [Conceito](concept.md): um concierge de agentes entre compradores e lojas, e as decisões principais com o que cada uma deixou de lado.
3. [Valor e viabilidade](viability.md): por que ele pertence a um provedor de POS, com uma projeção de receita.
4. [Como construí](how-i-built.md): o contexto de IA, os fluxos e o design system, as etapas de revisão e o que joguei fora.
5. [O produto](product.md), suas [funcionalidades](features.md) e o [protótipo](../deliver/prototype.md).
6. [O que vou testar a seguir](next.md): três hipóteses com critério de aprovação, o primeiro experimento e os sinais para parar ou seguir.

## O que ainda não foi medido

Nada sobre demanda. Nenhum comprador ou lojista foi entrevistado; a evidência sobre compradores são 20 posts públicos clusterizados. As lojas do protótipo são inventadas e respondem por roteiro, e os números de receita são uma projeção. Saber se as lojas respondem é o [primeiro teste](next.md).

Evidência: [o brief](../brief.md), [registro de decisões](../decision-log.md).
