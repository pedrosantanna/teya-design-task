# Movimento

Como as coisas se movem no app: seis molas, para que serve cada uma e as regras que mantêm o movimento rápido e fora do caminho. Todo movimento é uma mola, então pode ser interrompido e mantém a velocidade do dedo que o começou.

```summary
Takeaways:
- Seis molas: press, snappy, smooth, arrive, fade e status. Cada uma tem um valor para iOS (duração e bounce) e o token do Material 3 mais próximo para Android.
- O cartão de resposta chegando na conversa é o único momento com bounce visível. O resto assenta sem passar do ponto, ou quase.
- O retorno começa no toque, em até 100 ms, e nunca espera a rede. Um toque novo redireciona uma animação em andamento; nada bloqueia a interação.
- O Reduzir Movimento troca o deslocamento por um fade e mantém os haptics. Os haptics são poucos: seleção, um toque leve no botão principal, sucesso quando a loja confirma e a compra fica Ready (retirada) ou Paid (entrega), um aviso quando uma compra termina sem cobrança.
Call:
- Pedi um movimento que pareça premium e responda rápido, partindo do iOS e do Liquid Glass e somando o Material.
- Mantive os valores provisórios até serem ajustados num celular, no protótipo (decisão 040).
AI:
- Um agente pesquisou as orientações da Apple sobre molas (WWDC 2023 e 2024), os tokens de movimento do Material 3 e do Material 3 Expressive no código do Compose, o Reanimated e o Expo Haptics, e propôs as molas e as regras. Eu pedi um movimento com sensação premium e resposta rápida.
Trade-offs:
- Molas parecem vivas e podem ser interrompidas, e são mais difíceis de cronometrar com exatidão que curvas de easing.
- As molas do Material assentam mais rápido que os padrões da Apple, então o mesmo token fica um pouco mais rápido no Android.
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
| Respeitar o Reduzir Movimento | O deslocamento vira fade; os haptics ficam |
| Poucos haptics | Seleção para chips, impacto leve no botão principal, sucesso quando a compra fica Ready (retirada) ou Paid (entrega), aviso só nos finais "Not confirmed · not charged" e "Sold · not charged", nunca em "not charged yet" |
| Rodar na thread de UI | Shared values do Reanimated, Gesture Handler para arrastes, só transform e opacidade nos caminhos quentes, todos os tokens num `motion.ts` |

## Fontes

- Apple, "Animate with springs", WWDC 2023: https://developer.apple.com/videos/play/wwdc2023/10158/
- Apple, "Enhance your UI animations and transitions", WWDC 2024: https://developer.apple.com/videos/play/wwdc2024/10145
- Android, tokens de movimento do Material 3 no Compose: https://github.com/androidx/androidx/blob/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt e StandardMotionTokens.kt na mesma pasta
- Software Mansion, `withSpring` do Reanimated: https://docs.swmansion.com/react-native-reanimated/docs/animations/withSpring/
- Expo, Haptics: https://docs.expo.dev/versions/latest/sdk/haptics/
