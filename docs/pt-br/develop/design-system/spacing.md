# Espaçamento e layout

A escala de espaçamento, os espaços que agrupam o conteúdo numa tela e o grid que dimensiona tiles, balões e cartões. Todo espaço é um passo de 4, e a proximidade faz o agrupamento antes de qualquer cartão ou borda.

```summary
Takeaways:
- Oito tokens de espaçamento numa base de 4 pt, de 4 a 48, e sete espaços semânticos construídos sobre eles: dentro de um grupo, entre blocos, recuos de cartão e de balão, entre seções, a margem da tela e a área mínima de toque.
- O espaço entre grupos é pelo menos o dobro do maior espaço dentro deles. Um título fica a 8 do seu conteúdo e a 32 da seção anterior. Na conversa, balões do mesmo remetente ficam a 12 um do outro, e uma troca de remetente fica a 24.
- Um cartão só é usado onde o espaçamento sozinho não agrupa, como os cartões de resposta e de compra na conversa.
- Uma coluna de conteúdo com margem de 16 abaixo de 414 pt de largura e 20 a partir de 414. A largura dos tiles vem de uma fórmula; só margens e gutters são fixos. Os carrosséis mostram uma ponta do tile seguinte.
Call:
- Pedi que o espaçamento e o grid partissem do iOS, ampliassem para o Material e seguissem a Gestalt (decisão 041).
- Mantive os valores provisórios, para serem ajustados no tamanho real, no protótipo.
AI:
- Um agente pesquisou as Human Interface Guidelines da Apple (lidas a partir do JSON da HIG, porque as páginas são renderizadas por script), o Material 3 e a documentação do Android, e o NN/g sobre Gestalt, e propôs os tokens e as regras. Eu pedi um design system moderno, baseado primeiro no iOS, depois no Material, e na Gestalt.
Trade-offs:
- Uma base de 4 pt bate com os passos do Material e fica perto dos valores da Apple, ao custo de alguns tamanhos intermediários que a Apple usa (como 10 e 14), que só aparecem no recuo do balão.
- As margens de 16 e 20 seguem o que o UIKit faz nos iPhones atuais, segundo relatos; não confirmei no iOS 26.
```

## Tokens de espaçamento

| Token | Valor | Onde |
| --- | --- | --- |
| `space.1` | 4 | Ícone ao rótulo, título à linha de meta |
| `space.2` | 8 | Entre chips, linhas num bloco de cartão, título ao seu conteúdo |
| `space.3` | 12 | Entre blocos num cartão, gutter do carrossel, balões do mesmo remetente |
| `space.4` | 16 | Padding de cartão, padding de linha |
| `space.5` | 20 | Margem da tela nos iPhones largos |
| `space.6` | 24 | Entre grupos sem relação numa seção, troca de remetente na conversa |
| `space.7` | 32 | Entre seções em Nearby, Requests e na página da loja |
| `space.8` | 48 | Só a folga inferior acima da barra de pedido; sob um título grande, a primeira seção começa 8 abaixo |

## Espaços semânticos

| Token | Valor | Notas |
| --- | --- | --- |
| `gap.inside` | 4–8 | Itens dentro de um grupo |
| `gap.block` | 12 | Blocos dentro de um cartão |
| `inset.card` | 16 | Um cartão com `radius.card` 28 menos 16 leva o conteúdo com `radius.inner` 12 |
| `inset.bubble` | 10 na vertical, 14 na horizontal | Balões da conversa |
| `gap.section` | 32 | Seções numa tela |
| `margin.screen` | 16 abaixo de 414 pt de largura, 20 a partir de 414; 16 dp no Android | Valor do Android vindo de uma fonte secundária, a conferir em m3.material.io |
| `hit.min` | 44 pt no iOS, 48 dp no Android | Vale para a área de toque, não para o tamanho desenhado |

## Regras de espaçamento

| Regra | Na prática |
| --- | --- |
| Proporção de proximidade | O espaço entre grupos é pelo menos 2× o maior espaço dentro deles; títulos ficam a 8 do conteúdo e a 32 da seção anterior; na conversa, 12 entre os balões de um remetente e 24 na troca de remetente |
| Região comum depois do espaço | Um cartão só onde o espaçamento não agrupa, como os cartões de resposta e de compra na conversa; uma borda se sobrepõe a outros agrupamentos, então é usada com parcimônia |
| Área de toque não é tamanho visual | Chips são desenhados com 32 de altura e chegam a 44 com `hitSlop`; alvos nunca ficam a menos de 8 um do outro |
| Áreas seguras primeiro | O conteúdo rola por baixo das barras; os controles ficam dentro de `useSafeAreaInsets` |
| Largura do texto | O corpo de texto nunca passa da guia de leitura, que num celular são as margens da tela |

## Tokens de grid e layout

| Token | Valor | Onde |
| --- | --- | --- |
| Colunas | 1 coluna de conteúdo; 4 no grid de categorias | Todas as telas |
| Margem | 16 / 20 | Como `margin.screen` |
| Gutter | 12 | Carrosséis e o grid de categorias |
| `tile.large` | 0,78 × largura do conteúdo ≈ 290 / 312, imagem 4:3 | Open near you: um tile e uma ponta do seguinte |
| `tile.medium` | (conteúdo − 12) / 2,3 ≈ 156 / 168, imagem 4:3 | New near you |
| Célula de categoria | (conteúdo − 36) / 4 ≈ 84 / 91, 1:1 | Grid de categorias |
| Largura máxima do balão | 78% do conteúdo ≈ 290 / 312 | Balões da conversa |
| Cartões de resposta e de compra | Largura total do conteúdo | Conversa |
| Versão web | Moldura de celular, 402 × 874 | Protótipo no navegador |

As larguras são para um iPhone 17 de 402 pt e um iPhone 17 Pro Max de 440 pt. Os iPhones antigos de 6,1″ têm 393 pt de largura e o Air, 420. No Android, a largura compacta (abaixo de 600 dp) cobre quase todos os celulares na vertical.

## Regras de grid

| Regra | Na prática |
| --- | --- |
| Carrosséis mostram uma ponta | O primeiro tile começa na margem, o último termina na margem, a paginação encaixa; a ponta é o único sinal de rolagem |
| Uma proporção por linha | Todas as imagens de uma linha ou carrossel têm a mesma proporção |
| Larguras pela fórmula | Tiles e células são calculados a partir da largura do conteúdo; só gutters e margens são fixos |
| Sheets como no Maps | Detents médio e grande; o conteúdo dentro da sheet fica na margem da tela (16, ou 20 nos iPhones largos), como no Maps |
| Layouts padrão | Linha ou grid sempre que possível, como a HIG pede para coleções |

As frações 0,78 e 2,3 dos tiles são uma proposta a conferir no tamanho real.

## Fontes

- Apple, Human Interface Guidelines, Accessibility (44 × 44 pt padrão, 28 × 28 mínimo, espaço entre controles): https://developer.apple.com/design/human-interface-guidelines/accessibility
- Apple, Human Interface Guidelines, Buttons (área de toque e tamanhos): https://developer.apple.com/design/human-interface-guidelines/buttons
- Apple, Human Interface Guidelines, Layout (agrupamento, áreas seguras, margens): https://developer.apple.com/design/human-interface-guidelines/layout
- Apple, Human Interface Guidelines, Collections: https://developer.apple.com/design/human-interface-guidelines/collections
- Apple, "Get to know the new design system", WWDC 2025: https://developer.apple.com/videos/play/wwdc2025/356
- Apple, UIKit `readableContentGuide`: https://developer.apple.com/documentation/uikit/uiview/readablecontentguide
- Material 3, chips (alvo de 48 dp): https://m3.material.io/components/chips
- SAP Fiori for Android, citando as margens e os passos de 4 dp do Material 3 (secundária; a conferir em m3.material.io): https://experience.sap.com/fiori-design-android/
- Android, classes de tamanho de janela: https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes
- Harley, "The Principle of Proximity in Visual Design", NN/g, 2020: https://www.nngroup.com/articles/gestalt-proximity/
- Harley, "The Principle of Common Region", NN/g, 2020: https://www.nngroup.com/articles/common-region/
- useyourloaf, "iPhone 17 screen sizes": https://useyourloaf.com/blog/iphone-17-screen-sizes/
- Margens de 16 pt e 20 pt nos iPhones atuais: comportamento do UIKit relatado com frequência, a confirmar num aparelho com iOS 26
