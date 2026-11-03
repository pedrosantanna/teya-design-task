# iOS e Android

A forma que cada elemento assume no iOS e no Android. O iOS é a referência (decisão 021); o Android recebe o componente do Material 3 ou o serviço do sistema mais próximo, para que o comprador, em qualquer um dos dois celulares, encontre os controles que já conhece.

```summary
Takeaways:
- Uma tabela, elemento por elemento: pagamento, notificações, status ao vivo, navegação, voltar, sheets, controles, retorno, haptics, ícones, fontes e materiais.
- O pagamento é Apple Pay no iOS e Google Pay no Android; a folha de pagamento é desenhada pelo sistema e o app não acrescenta nada a ela.
- O status ao vivo de um pedido é uma Live Activity no iOS e uma notificação contínua com barra de progresso no Android, promovida a Live Update onde houver (Android 16).
- A chave iOS/Android do protótipo (decisão 038) mostra a coluna da direita, para comparar as duas formas num mesmo build.
Call:
- Depois que uma revisão de design encontrou faltando especificações de componentes, estados, equivalentes de plataforma e regras de conteúdo, pedi que o design system ficasse completo o bastante para construir o protótipo a partir dele.
- Escolhi o HugeIcons para os ícones nas duas plataformas (decisão 042) e mantive esta tabela provisória (decisão 043).
AI:
- Um agente revisou o design system contra as telas da v7 e listou os elementos sem forma no Android. Outro agente escreveu esta tabela a partir das fundações existentes e da documentação das plataformas.
Trade-offs:
- Usar os componentes de cada plataforma significa construir e testar dois apps um pouco diferentes; um visual próprio único seria mais barato e pareceria estranho em pelo menos uma delas.
- As Live Updates só existem a partir do Android 16, então a maioria dos celulares Android ainda recebe uma notificação contínua.
```

## Elementos

| Elemento | iOS | Android |
| --- | --- | --- |
| Pagamento | Folha do Apple Pay | Folha do Google Pay |
| Notificação | Uma por resposta, agrupadas por pedido | Igual, num canal de notificação por tipo (respostas, compras) |
| Status ao vivo de um pedido | Live Activity na tela bloqueada e na Dynamic Island | Uma notificação contínua com barra de progresso pelas etapas do pedido; uma Live Update (uma notificação contínua promovida) onde houver, a partir do Android 16 |
| Barra de navegação | Navigation bar, título grande que encolhe para título em linha | Large top app bar do Material, que encolhe para small |
| Voltar | Deslizar a partir da borda esquerda, ou o chevron com o título anterior ("Requests") | Gesto de voltar preditivo, ou a seta na top app bar |
| Abrir Requests | Transição de zoom a partir do botão redondo | Container transform a partir do botão redondo |
| Sheet | Page sheet com detents médio e grande e um grabber | Modal bottom sheet do Material com alça e scrim |
| Controle segmentado | Segmented control do sistema | Segmented button do Material, seleção única, com check |
| Stepper | Estilo de stepper: menos e mais num só controle | Dois icon buttons do Material em volta do valor |
| Toast | Banner próprio em glass acima da barra de pedido | Snackbar do Material |
| Alerta | Alerta do sistema, ação destrutiva em vermelho | Dialog do Material, a ação de confirmar como text button |
| Ações de deslizar em linhas | Deslizar no fim da linha (Close) | Menu de toque longo |
| Haptic: seleção (chips, segmentos, stepper) | `Haptics.selectionAsync()` | `SEGMENT_TICK` (ou `CLOCK_TICK` antes da API 34) |
| Haptic: botão principal (Buy, Send) | `Haptics.impactAsync(ImpactFeedbackStyle.Light)` | `CONTEXT_CLICK` |
| Haptic: compra Ready ou Paid | `Haptics.notificationAsync(NotificationFeedbackType.Success)` | `CONFIRM` |
| Haptic: finais "not charged" | `Haptics.notificationAsync(NotificationFeedbackType.Warning)` | `REJECT` |
| Ícones | HugeIcons, com a variante do iOS para compartilhar (caixa com seta para cima), voltar (chevron) e mais (pontos na horizontal) | HugeIcons, com a variante do Android para compartilhar (três nós ligados), voltar (seta) e mais (pontos na vertical) |
| Fontes | Gambetta e Switzer; SF Pro como fallback | Gambetta e Switzer; Roboto como fallback |
| Superfícies flutuantes | Liquid Glass a partir do iOS 26, blur antes | Surface container tonal |
| Cantos | Contínuos | Circulares |
| Área de toque | 44 pt | 48 dp |
| Escala do texto | Dynamic Type | Ajuste de tamanho da fonte, tamanhos em sp |
| Leitor de tela | VoiceOver, com ações personalizadas nos cartões | TalkBack, com as mesmas ações no menu de ações dele |

As chamadas de haptics são do `expo-haptics` no iOS e as `HapticFeedbackConstants` do Android no Android; versões recentes do `expo-haptics` expõem as constantes do Android por `performAndroidHapticsAsync`, o que precisa ser conferido no SDK do Expo que o protótipo usa. Os haptics continuam ligados com Reduzir Movimento e seguem o ajuste de haptics do próprio sistema.

## No protótipo

O protótipo tem uma chave no topo que alterna a interface entre iOS, o padrão, e Android (decisão 038). Ela mostra as formas da coluna do Android a partir das mesmas telas. As superfícies que a versão web não alcança (as folhas do Apple Pay e do Google Pay, as notificações da tela bloqueada, a Live Activity e a Live Update) são desenhadas como telas simuladas nas duas formas.

## Fontes

- Apple, Human Interface Guidelines: Apple Pay, notifications, Live Activities, navigation bars, sheets, segmented controls, steppers, alerts, playing haptics: https://developer.apple.com/design/human-interface-guidelines
- Componentes do Material 3: top app bar, bottom sheets, segmented buttons, snackbar, dialogs, icon buttons: https://m3.material.io/components
- Android, Live Updates: https://developer.android.com/develop/ui/views/notifications/live-update
- Android, voltar preditivo: https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture
- Android, `HapticFeedbackConstants`: https://developer.android.com/reference/android/view/HapticFeedbackConstants
- Expo, Haptics: https://docs.expo.dev/versions/latest/sdk/haptics/
- Google Pay para Android: https://developers.google.com/pay/api/android
- HugeIcons: https://hugeicons.com
- [Forma e materiais](shape.md), [Movimento](motion.md) e [Tipografia](typography.md) para os valores por trás de cada forma
