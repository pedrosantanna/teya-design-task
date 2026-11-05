# iOS e Android

A forma que cada elemento assume no iOS, no Android e na web. O iOS 26 é a referência (decisão 021), seguido do jeito que os próprios apps da Apple o usam; o Android recebe o componente do Material 3 Expressive ou o serviço do sistema mais próximo, e a versão web a forma mais próxima no navegador, para que o comprador, em qualquer um deles, encontre os controles que já conhece.

```summary
Takeaways:
- Duas tabelas: os padrões do Liquid Glass (voltar, fechar, confirmar, ações da barra, títulos, a barra de pedido, sheets, busca, o botão principal) no iOS, no Android e na web, e depois todos os outros elementos no iOS e no Android.
- Voltar é um chevron sozinho num círculo de glass; o título da tela anterior vai para o menu de toque longo e para o rótulo de acessibilidade. Fechar e Confirmar são círculos de glass no topo das sheets.
- O pagamento é Apple Pay no iOS e Google Pay no Android; a folha de pagamento é desenhada pelo sistema e o app não acrescenta nada a ela.
- O status ao vivo de um pedido é uma Live Activity no iOS e uma notificação contínua com barra de progresso no Android, promovida a Live Update onde houver (Android 16).
- A chave iOS/Android do protótipo (decisão 038) mostra a coluna da direita, para comparar as duas formas num mesmo build.
Call:
- Depois que uma revisão de design encontrou faltando especificações de componentes, estados, equivalentes de plataforma e regras de conteúdo, pedi que o design system ficasse completo o bastante para construir o protótipo a partir dele.
- Escolhi o HugeIcons para os ícones nas duas plataformas (decisão 042) e mantive esta tabela provisória (decisão 043).
- Nesta rodada pedi para seguir o iOS 26 e o Liquid Glass do jeito que os próprios apps da Apple os usam, com o Apple Music e o Freeform como referência, no iOS, no Android e na web.
AI:
- Um agente revisou o design system contra as telas da v7 e listou os elementos sem forma no Android. Outro agente escreveu esta tabela a partir das fundações existentes e da documentação das plataformas.
- Um agente leu as sessões da WWDC 2025 sobre adotar o novo design (284, 323 e 356), a documentação das native tabs do Expo Router e o Material 3 Expressive, associou cada padrão às três plataformas e corrigiu onde a tabela anterior divergia deles (Voltar com o título anterior, o fundo próprio da sheet).
Trade-offs:
- Usar os componentes de cada plataforma significa construir e testar dois apps um pouco diferentes; um visual próprio único seria mais barato e pareceria estranho em pelo menos uma delas.
- As Live Updates só existem a partir do Android 16, então a maioria dos celulares Android ainda recebe uma notificação contínua.
- Seguir de perto o glass do sistema prende o visual do iOS ao iOS 26; a web só consegue se aproximar dele com um blur, que custa tempo de renderização em celulares mais antigos.
```

## Padrões do Liquid Glass

O Apple Music e o Freeform são a referência de onde o iOS 26 coloca estes controles. A coluna do Android segue o Material 3 Expressive e a da web usa CSS. Como cada troca de tela se move está em [Movimento](motion.md), e a receita do glass na web em [Forma e materiais](shape.md).

| Elemento | iOS 26 | Android (Material 3 Expressive) | Web |
| --- | --- | --- | --- |
| Voltar | Chevron sozinho num círculo de glass flutuando no canto superior esquerdo; o título anterior fica no menu de toque longo e no rótulo de acessibilidade; deslizar para voltar a partir de qualquer ponto da tela | Icon button de seta na top app bar; voltar preditivo | Chevron num círculo com blur; o título anterior no `aria-label` |
| Fechar | Círculo de glass com ×, de uns 44, no canto superior esquerdo de sheets e telas apresentadas (`role: .close`) | Ícone de fechar na top app bar ou no cabeçalho da sheet | Círculo com blur e × |
| Confirmar | Círculo com check com tint Índigo no canto superior direito (`role: .confirm`) | Botão "Done" filled ou tonal | Círculo Índigo com check |
| Mais e ações | Itens só com ícone dividem uma cápsula de glass à direita; um botão de texto, Fechar e Confirmar ganham cada um o seu glass; espaço fixo entre os grupos | Icon buttons e um menu de overflow (pontos na vertical); uma floating toolbar para ações no contexto | Uma cápsula com blur |
| Título da navegação | O título grande rola com o conteúdo e encolhe para um título em linha à esquerda; a barra não tem fundo; um scroll edge effect (blur suave e fade) substitui o fundo da barra, com o estilo hard só em listas densas | Flexible top app bar que encolhe para small, com tint ao rolar | Título grande; o título em linha aparece com fade sobre uma máscara em gradiente |
| Barra de pedido e botão de Requests | Inspirada no bottom accessory da tab view (o mini player do Apple Music): uma cápsula de glass acima da borda de baixo que encolhe em linha ao rolar para baixo (`NativeTabs.BottomAccessory` e `usePlacement` no Expo Router, se usados) | Floating toolbar | Cápsula fixa com blur que encolhe ao rolar |
| Sheet | Sheet do sistema, recuada das bordas e com glass quando se ajusta ao conteúdo (o detent ajustado, personalizado desde o iOS 16) ou fica no médio, opaca e de borda a borda no grande, abrindo com zoom a partir da origem; sem fundo próprio | Modal bottom sheet com alça e scrim, `radius.sheet` | Bottom sheet com blur no médio, sólida na altura total |
| Busca | Embaixo no iPhone | Search app bar no topo | Cápsula embaixo nas larguras de celular |
| Botão principal | Cápsula preenchida; glass proeminente em Índigo (`glassProminent`) sobre uma foto ou o mapa, ou numa barra | Botão filled | Cápsula preenchida; Índigo com blur sobre uma foto ou o mapa |

## Elementos

| Elemento | iOS | Android |
| --- | --- | --- |
| Pagamento | Folha do Apple Pay | Folha do Google Pay |
| Notificação | Uma por resposta, agrupadas por pedido | Igual, num canal de notificação por tipo (respostas, compras) |
| Status ao vivo de um pedido | Live Activity na tela bloqueada e na Dynamic Island | Uma notificação contínua com barra de progresso pelas etapas do pedido; uma Live Update (uma notificação contínua promovida) onde houver, a partir do Android 16 |
| Controle segmentado | Segmented control do sistema | Segmented button do Material, seleção única, com check |
| Stepper | Estilo de stepper: menos e mais num só controle | Dois icon buttons do Material em volta do valor |
| Toast | Banner próprio em glass acima da barra de pedido | Snackbar do Material |
| Alerta | Alerta do sistema, ação destrutiva em vermelho | Dialog do Material, a ação de confirmar como text button |
| Ações de deslizar em linhas | Deslizar no fim da linha (Close) | Menu de toque longo |
| Haptic: seleção (chips, segmentos, stepper) | `Haptics.selectionAsync()` | `SEGMENT_TICK` (ou `CLOCK_TICK` antes da API 34) |
| Haptic: botão principal (Buy, Send) | `Haptics.impactAsync(ImpactFeedbackStyle.Light)` | `CONTEXT_CLICK` |
| Haptic: compra Ready ou Paid | `Haptics.notificationAsync(NotificationFeedbackType.Success)` | `CONFIRM` |
| Haptic: finais "not charged" | `Haptics.notificationAsync(NotificationFeedbackType.Warning)` | `REJECT` |
| Ícones | HugeIcons para os botões do próprio app, com a variante do iOS para compartilhar (caixa com seta para cima) e mais (pontos na horizontal). No iOS 26 o sistema desenha o Voltar; no protótipo multiplataforma o app o desenha com o chevron do HugeIcons, para combinar | HugeIcons, com a variante do Android para compartilhar (três nós ligados), voltar (seta) e mais (pontos na vertical) |
| Fontes | Gambetta e Switzer; SF Pro como fallback | Gambetta e Switzer; Roboto como fallback |
| Superfícies flutuantes | Liquid Glass a partir do iOS 26, blur antes | Surface container tonal |
| Cantos | Contínuos | Circulares |
| Área de toque | 44 pt | 48 dp |
| Escala do texto | Dynamic Type | Ajuste de tamanho da fonte, tamanhos em sp |
| Leitor de tela | VoiceOver, com ações personalizadas nos cartões | TalkBack, com as mesmas ações no menu de ações dele |

As chamadas de haptics são do `expo-haptics` no iOS e as `HapticFeedbackConstants` do Android no Android; versões recentes do `expo-haptics` expõem as constantes do Android por `performAndroidHapticsAsync`, o que precisa ser conferido no SDK do Expo que o protótipo usa. Os haptics continuam ligados com Reduzir Movimento e seguem o ajuste de haptics do próprio sistema.

## No protótipo

O protótipo tem uma chave no topo que alterna a interface entre iOS, o padrão, e Android (decisão 038). Ela mostra as formas da coluna do Android a partir das mesmas telas. As superfícies que a versão web não alcança (as folhas do Apple Pay e do Google Pay, as notificações da tela bloqueada, a Live Activity e a Live Update) são desenhadas como telas simuladas nas duas formas. No navegador, o protótipo segue a coluna da web da tabela de padrões.

## Fontes

- Apple, Human Interface Guidelines: Apple Pay, notifications, Live Activities, navigation bars, sheets, segmented controls, steppers, alerts, playing haptics: https://developer.apple.com/design/human-interface-guidelines
- Componentes do Material 3: top app bar, bottom sheets, segmented buttons, snackbar, dialogs, icon buttons: https://m3.material.io/components
- Android, Live Updates: https://developer.android.com/develop/ui/views/notifications/live-update
- Android, voltar preditivo: https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture
- Android, `HapticFeedbackConstants`: https://developer.android.com/reference/android/view/HapticFeedbackConstants
- Expo, Haptics: https://docs.expo.dev/versions/latest/sdk/haptics/
- Google Pay para Android: https://developers.google.com/pay/api/android
- Apple, "Build a UIKit app with the new design", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/284/
- Apple, "Build a SwiftUI app with the new design", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/323/
- Apple, "Get to know the new design system", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/356
- Expo Router, native tabs (bottom accessory): https://docs.expo.dev/router/advanced/native-tabs/
- Material 3 Expressive, toolbars e app bars: https://m3.material.io/components/toolbars e https://m3.material.io/components/app-bars
- HugeIcons: https://hugeicons.com
- [Forma e materiais](shape.md), [Movimento](motion.md) e [Tipografia](typography.md) para os valores por trás de cada forma
