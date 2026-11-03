# Forma e materiais

Os raios de canto de cada superfície do app, a regra que mantém os cantos aninhados em sintonia e onde o Liquid Glass é usado. Os valores vêm da escala de forma do Material 3, então o Android os usa como estão; o iOS desenha os mesmos valores com cantos contínuos.

```summary
Takeaways:
- Seis tokens de raio: none 0, inner 12, bubble 20, card 28, sheet 32 e full (uma cápsula). Os cantos ficam mais arredondados que os dos wireframes.
- Cantos aninhados são concêntricos: o raio de dentro é o raio de fora menos o padding, nunca abaixo de 8. Um cartão com 28 e padding de 16 leva imagens com 12.
- Controles são cápsulas; contêineres têm raio fixo. No iOS, toda view arredondada usa cantos contínuos (`borderCurve: 'continuous'`).
- O Liquid Glass fica só no que flutua sobre o conteúdo e age: a barra de pedido, o botão redondo de Requests, os círculos de Voltar, Fechar e Confirmar, os botões da barra, as sheets no detent médio e os botões sobre uma foto ou o mapa. Cartões, balões e tiles continuam sólidos.
Call:
- Pedi cantos mais arredondados, um conjunto pequeno de raios e uma sensação premium, partindo do iOS e do Liquid Glass e somando o Material.
- Mantive os raios provisórios (decisão 040); o protótipo vai mostrar se eles funcionam no tamanho real.
- Nesta rodada pedi para seguir o Liquid Glass do jeito que os próprios apps da Apple o usam, no iOS, no Android e na web. No Android a barra de pedido vira uma floating toolbar do Material 3 Expressive.
AI:
- Um agente pesquisou o novo sistema de design da Apple (WWDC 2025), o Material 3 e o Material 3 Expressive e as APIs do React Native e do Expo, e propôs os tokens e as regras. Eu pedi cantos mais arredondados, poucos raios e uma sensação premium.
- Um agente conferiu nas sessões da WWDC 2025 sobre adotar o novo design (284 e 323) quais controles recebem glass e como as sheets mudam entre os detents, e acrescentou a coluna da web.
Trade-offs:
- Tirar os valores da escala do Material deixa o Android exato e o iOS próximo; a Apple não publica uma escala de tokens, só os três tipos de forma.
- O glass só existe a partir do iOS 26. Versões anteriores do iOS ganham um blur, o Android uma superfície tonal e a web um blur em CSS, então o app fica um pouco diferente em cada um.
```

## Raio

| Token | Valor | Papel no Material 3 | Onde |
| --- | --- | --- | --- |
| `radius.none` | 0 | none | Fotos de ponta a ponta, como o topo da página da loja |
| `radius.inner` | 12 | medium | Imagens e miniaturas dentro de um cartão ou linha, campos dentro de uma sheet |
| `radius.bubble` | 20 | large increased | Balões da conversa, tiles com foto em Nearby |
| `radius.card` | 28 | extra large | Cartões, cartões de resposta e de compra na conversa, listas agrupadas avulsas (a lista de lojas perguntadas, os grupos de ajustes) |
| `radius.sheet` | 32 | extra large increased | Sheets no Android e na web, e o cartão de conteúdo da página da loja; as sheets do sistema no iOS mantêm os cantos delas |
| `radius.full` | metade da altura | full | Botões, chips, a barra de pedido, o botão de Requests, badges, avatares |

## Regras

| Regra | Na prática |
| --- | --- |
| Cantos concêntricos | Raio de dentro = raio de fora − padding, e nunca abaixo de 8 |
| Controles são cápsulas | Tudo que o comprador toca para agir é `full`; tudo que guarda conteúdo tem raio fixo |
| Nenhum canto passa o contêiner | Nada na borda de um cartão ou de uma sheet tem raio maior que o do cartão ou da sheet |
| Cantos contínuos no iOS | Um helper de estilo compartilhado define `borderCurve: 'continuous'`; o Android desenha arcos circulares, como o Material |

O sistema de design da Apple de 2025 tem três tipos de forma: fixa, cápsula (metade da altura) e concêntrica (o raio do pai menos o padding). Os tokens acima são os fixos; a cápsula é `full`, e a concêntrica é a regra.

## Materiais

| Elemento | iOS 26 em diante | iOS anterior | Android | Web |
| --- | --- | --- | --- | --- |
| Botão de Requests | Glass, interativo, círculo | Blur | Surface container high, `full` | Círculo com blur |
| Barra de pedido | Glass, interativo, cápsula, posicionada como o bottom accessory da tab view | Blur | Floating toolbar (Material 3 Expressive), `full` | Cápsula com blur |
| Voltar, Fechar e Confirmar | Círculos de glass; Confirmar com tint Índigo | Blur | Icon buttons na top app bar; Done como botão filled ou tonal | Círculos com blur |
| Botões da barra | Icon buttons dividem uma cápsula de glass; um botão de texto ganha a sua | Blur | Icon buttons, sem contêiner | Uma cápsula com blur |
| Barra de navegação | Sem fundo; um scroll edge effect sob os controles | Blur | Top app bar, com tint ao rolar | Máscara em gradiente |
| Sheets | Sheet do sistema: glass recuado no médio, opaca no grande; sem fundo próprio | Sheet do sistema | Bottom sheet do Material, `radius.sheet` | Blur no médio, sólida na altura total, `radius.sheet` |
| Botões sobre uma foto ou o mapa | Glass, cápsula; o principal em glass Índigo proeminente | Blur | Botão tonal | Cápsula com blur |
| Cartões, balões, cartões de resposta, tiles | Cores sólidas de cartão e secundária | Igual | Igual | Igual |

O glass só é usado quando o sistema oferece e o Reduzir Transparência está desligado; senão o elemento ganha um blur ou uma superfície sólida que ainda passa no contraste. O tint Índigo sobre o glass fica para a ação principal.

Na web, o glass é `backdrop-filter: blur(20–30px) saturate(180%)` sobre um fundo translúcido, com um realce interno de 1 px e uma sombra suave. Com `prefers-reduced-transparency`, vira a superfície sólida, como o Reduzir Transparência faz no iOS.

## Fontes

- Apple, "Get to know the new design system", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/356
- Apple, "Build a UIKit app with the new design", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/284/
- Apple, "Build a SwiftUI app with the new design", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/323/
- Apple, Human Interface Guidelines, Materials: https://developer.apple.com/design/human-interface-guidelines/materials
- Escala de forma do Material 3, como publicada na documentação dos componentes Android: https://gitea.com/784622644/material-components-android/src/branch/master/docs/theming/Shape.md (um espelho; a conferir em m3.material.io)
- React Native, view style props (`borderCurve`): https://reactnative.dev/docs/0.81/view-style-props
- Expo, `expo-glass-effect`: https://docs.expo.dev/versions/latest/sdk/glass-effect
- Material 3 Expressive, toolbars: https://m3.material.io/components/toolbars
- MDN, `backdrop-filter`: https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter e `prefers-reduced-transparency`: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency
