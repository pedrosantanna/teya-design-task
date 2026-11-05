# Movimento

Como as coisas se movem no app: seis molas, para que serve cada uma e as regras que mantêm o movimento rápido e fora do caminho. Todo movimento é uma mola, então pode ser interrompido e mantém a velocidade do dedo que o começou.

```summary
Takeaways:
- Seis molas: press, snappy, smooth, arrive, fade e status. Cada uma tem um valor para iOS (duração e bounce) e o token do Material 3 mais próximo para Android.
- O cartão de resposta chegando na conversa é o único momento com bounce visível. O resto assenta sem passar do ponto, ou quase.
- Toda troca de tela é animada, com o Apple Music como referência: o que abre cresce a partir do que foi tocado (um zoom no iOS, um container transform no Android, uma View Transition na web) e fecha de volta para ele.
- O retorno começa no toque, em até 100 ms, e nunca espera a rede. Um toque novo redireciona uma animação em andamento; nada bloqueia a interação.
- O Reduzir Movimento troca o deslocamento e todas as transições de tela por um crossfade e mantém os haptics. Os haptics são poucos: seleção, um toque leve no botão principal, sucesso quando a loja confirma e a compra fica Ready (retirada) ou Paid (entrega), um aviso quando uma compra termina sem cobrança.
Call:
- Pedi um movimento que pareça premium e responda rápido, partindo do iOS e do Liquid Glass e somando o Material.
- Mantive os valores provisórios até serem ajustados num celular, no protótipo (decisão 040).
- Pedi que o splash fosse uma intro vetorial curta da marca sobre Índigo, de cerca de 1,6 s, com o toldo desenrolando listra por listra e um balanço rápido.
- Nesta rodada pedi que toda troca de tela fosse animada, com o Apple Music como referência, e trouxe de volta o zoom a partir do botão redondo de Requests (decisão 026).
AI:
- Um agente pesquisou as orientações da Apple sobre molas (WWDC 2023 e 2024), os tokens de movimento do Material 3 e do Material 3 Expressive no código do Compose, o Reanimated e o Expo Haptics, e propôs as molas e as regras. Eu pedi um movimento com sensação premium e resposta rápida.
- Um agente escreveu a linha do tempo do splash e a construiu com um único relógio do Reanimated, depois tirou quadros em 0, 400, 800, 1200 e 1600 ms para conferir.
- Um agente associou cada troca de tela a uma transição do iOS 26, do Material 3 e da web e conferiu o que o Expo Router, o Reanimated e o navegador suportam hoje.
Trade-offs:
- Molas parecem vivas e podem ser interrompidas, e são mais difíceis de cronometrar com exatidão que curvas de easing.
- As molas do Material assentam mais rápido que os padrões da Apple, então o mesmo token fica um pouco mais rápido no Android.
- A transição de zoom do Expo Router ainda é alpha e pede o iOS 18, e os shared elements do Reanimated são experimentais, então algumas transições podem cair para um push ou um fade no protótipo.
```

## Molas

| Token | iOS (duração, bounce) | Android (Material 3, damping ratio / stiffness) | Onde |
| --- | --- | --- | --- |
| `spring.press` | 0,2 s, 0 | fast effects, 1,0 / 3800 | Toque: reduz para 0,97 e escurece o preenchimento |
| `spring.snappy` | 0,3 s, 0,15 | standard fast spatial, 0,9 / 1400 | Soltar, seleção de chip, switches, o balão do comprador aparecendo |
| `spring.smooth` | 0,45 s, 0 | standard default spatial, 0,9 / 700 | Navegação, sheets próprias, mudanças em listas |
| `spring.arrive` | 0,5 s, 0,2 | expressive default spatial, 0,8 / 380 | Um cartão de resposta entrando na conversa |
| `spring.fade` | 0,25 s, 0 | default effects, 1,0 / 1600 | Opacidade e cor, skeleton para conteúdo |
| `spring.status` | 0,6 s, 0 | slow effects, 1,0 / 800 | O status de uma compra mudando |

No Reanimated, uma mola recebe `duration` em milissegundos e `dampingRatio` = 1 − bounce. As Live Activities são desenhadas pelo sistema, então esses tokens não valem lá.

## Regras

| Regra | Na prática |
| --- | --- |
| Responder no toque | O estado de toque e o haptic disparam ao encostar, bem dentro de 100 ms |
| Tudo pode ser interrompido | Só molas para deslocamento; a velocidade do gesto entra na mola |
| O movimento começa de onde veio | Uma sheet sobe do que a abriu; um cartão de resposta cresce do lugar dele na conversa |
| Nunca bloquear a interação | Nenhuma animação desliga o toque; um toque novo a redireciona |
| Mostrar a ação do comprador na hora | O balão dele aparece na hora; um skeleton só aparece se uma resposta levar mais de uns 300 ms |
| Respeitar o Reduzir Movimento | O deslocamento e as transições de tela viram crossfade; os haptics ficam |
| Poucos haptics | Seleção para chips, impacto leve no botão principal, sucesso quando a compra fica Ready (retirada) ou Paid (entrega), aviso só nos finais "Not confirmed · not charged" e "Sold · not charged", nunca em "not charged yet" |
| Rodar na thread de UI | Shared values do Reanimated, Gesture Handler para arrastes, só transform e opacidade nos caminhos quentes, todos os tokens num `motion.ts` |

## Splash

O splash é a única sequência roteirizada: a marca se constrói sobre o Índigo 800 em cerca de 1,6 s, guiada por um único relógio na thread de UI, então toda execução é igual.

| Tempo (ms) | O que se move |
| --- | --- |
| 0 | Só o toldo aparece, enrolado no alto como uma barra listrada fina, um pouco acima do seu lugar |
| 100 a 800 | As cinco listras se desenrolam da esquerda para a direita, com 70 ms entre elas. Cada uma é uma mola com um pequeno excesso (amortecimento 0,55) e balança em torno da borda de cima, até 7 graus, esmaecendo em cerca de 0,4 s |
| 780 | As orelhas entram deslizando de cada lado |
| 960 e 1050 | Os olhos crescem a partir do centro, depois o nariz salta com um pouco mais de quique |
| 1240 e 1400 | Duas piscadas: os olhos fecham até um décimo da altura e abrem de novo em 260 ms cada |
| 1600 | A marca pronta fica parada por 250 ms, some em 150 ms, e depois o fundo some em 200 ms revelando o Getting started; a página monta quando o fundo começa a sumir, então sua animação de entrada é vista |

Com Reduzir movimento a marca pronta aparece de uma vez e só os dois esmaecimentos ficam. A construção é desenhada com `react-native-svg` e Reanimated; um link com `?intro=<ms>` no build web a congela nesse tempo, para revisão.

## Transições de tela

Nenhuma tela muda sem movimento. Cada transição começa no elemento que foi tocado, para o comprador ver de onde a tela nova veio e para onde ela volta.

| Troca | iOS | Android | Web |
| --- | --- | --- | --- |
| Nearby → página da loja | Zoom a partir do tile; arrastar para baixo fecha, acompanhando o dedo | Container transform | Morph de View Transition a partir do tile |
| Nearby → Requests | Zoom a partir do botão redondo de Requests (decisão 026) | Container transform | View Transition a partir do círculo |
| Nearby → sheet de localização | Zoom a partir da linha do endereço | Bottom sheet sobe | A sheet cresce a partir da linha |
| Requests → conversa | Push, sob o Voltar de glass | Shared axis X, com voltar preditivo | Slide |
| Conversa → folha de detalhes | A sheet abre com zoom a partir do cartão de resposta | Bottom sheet sobe | A sheet cresce a partir do cartão |
| Folha de detalhes → pagamento | A folha do Apple Pay sobre a folha de detalhes | Folha do Google Pay | Slide para cima |
| Pagamento → recibo | A folha de detalhes se transforma no recibo | Fade through | Crossfade |
| Recibo → código ampliado | Zoom a partir do código | Container transform | Morph |
| Qualquer tela → Keep looking | Sheet a partir do botão | Bottom sheet | Fade e escala |

Com o Reduzir Movimento ligado, cada uma delas vira um crossfade. Os pushes e as sheets que o app desenha usam `spring.smooth`; os zooms do sistema e as folhas de pagamento mantêm o tempo do sistema.

No app em Expo, o zoom é o `Link.AppleZoom` do Expo Router, que é alpha e pede o iOS 18; as shared element transitions do Reanimated são o outro caminho e são experimentais. A versão web usa `document.startViewTransition`. Onde nenhum deles funciona, a troca cai para um push ou um fade.

### Web

Na web um push leva 350 ms, uma sheet sobe em 380 ms e sai em 320 ms, um zoom leva 420 ms e o morph da barra de pergunta 420 ms, todos na curva do iOS `cubic-bezier(0.32, 0.72, 0, 1)`. Um zoom e um morph recortam em `radius.card` (28). O toque do ponteiro não tem atraso. Um arraste que começa a até 24 pt da borda esquerda e percorre 72 pt, quase na horizontal, volta como o botão Back; só funciona em telas empilhadas, então uma sheet ou o compositor do New Request fecham com o controle próprio. O navegador não consegue seguir o dedo numa view transition, então o gesto confirma ao soltar. Com Reduce Motion, toda mudança é um crossfade de 200 ms: as telas fazem fade no lugar e não deslizam. Os valores são constantes nomeadas em `internal/transitions.ts`, não tokens.


## Fontes

- Apple, "Animate with springs", WWDC 2023: https://developer.apple.com/videos/play/wwdc2023/10158/
- Apple, "Enhance your UI animations and transitions", WWDC 2024: https://developer.apple.com/videos/play/wwdc2024/10145
- Android, tokens de movimento do Material 3 no Compose: https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt e StandardMotionTokens.kt na mesma pasta
- Software Mansion, `withSpring` do Reanimated: https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring/
- Expo, Haptics: https://docs.expo.dev/versions/latest/sdk/haptics/
- Apple, "Build a SwiftUI app with the new design", WWDC 2025 (transições de zoom, sheets): https://developer.apple.com/videos/play/wwdc2025/323/
- Material 3, padrões de transição (container transform, shared axis, fade through): https://m3.material.io/styles/motion/transitions/transition-patterns
- Software Mansion, shared element transitions do Reanimated: https://docs.swmansion.com/react-native-reanimated/docs/shared-element-transitions/overview/
- Expo Router (`Link.AppleZoom`): https://docs.expo.dev/router/introduction/
- MDN, `Document.startViewTransition()`: https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition
