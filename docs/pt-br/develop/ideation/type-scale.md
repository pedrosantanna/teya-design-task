# Escala tipográfica

Uma escala tipográfica montada a partir dos estilos de texto da Apple, com os papéis correspondentes do Material 3, e testes de fontes da Fontshare sobre ela: quatro sozinhas, fontes de display combinadas com uma fonte de corpo, e uma terceira rodada em que a fonte de display aparece só no splash, na tela de entrada, no título da home e em títulos de widget. Cada teste termina na mesma tela de conversa, que é onde o comprador mais lê. As fontes carregam de uma pasta privada e não vão para o repositório público; sem elas, o canvas usa a fonte do sistema.

```summary
Takeaways:
- Decisão 029: Gambetta 700 no display, Switzer no resto, com tracking definido por fonte e por tamanho (rodada 4). Os títulos em Switzer usam 600, para ficarem abaixo da Gambetta no peso visual.
- Decisão 028: a conversa e tudo o que o comprador lê usam uma sans forte, a Switzer por enquanto. Fonte de display só no splash, na tela de entrada, no título da home e em títulos de destaque de widgets.
- Nesse papel de display, a Gambetta tem a melhor nota com a Switzer (95 de 100), seguida de Chillax (80), Telma (78), Author e Switzer sozinha (72). A Pally saiu dos testes.
- A escala são os onze estilos de texto da Apple no tamanho padrão do Dynamic Type, de Large title (34 pt) a Caption 2 (11 pt), cada um ligado ao papel mais próximo do Material 3 para o Android.
- Para uma tela de conversa, a melhor nota vai para Gambetta nos títulos e Switzer no resto (98 de 100). A Switzer mantém conversa, preços e horários legíveis, com números tabulares por padrão; a Gambetta dá aos títulos uma voz editorial britânica.
- Fontes do sistema são só fallback (decisão 027), então os pares da rodada 1 com SF Pro estão fora. A rodada 2 combina Gambetta e Telma com a Switzer e com a Satoshi.
- A Switzer é a melhor fonte única (89), com a maior altura-x e números tabulares por padrão. Chillax e Author têm as notas mais baixas para ler uma conversa: legibilidade menor em tamanhos pequenos e só números proporcionais.
Call:
- Indiquei as fontes a testar: Satoshi, Chillax, Switzer e Author sozinhas; Telma e Gambetta como fontes de display, primeiro com SF Pro e Excon, depois com Switzer e Satoshi. Descartei a Pally depois de testá-la.
- Descartei SF Pro e Roboto como escolha, porque nenhuma existe na outra plataforma (decisão 027). Fonte de display só em títulos de 20 pt para cima; corpo, preços e horários ficam numa fonte de corpo com números tabulares.
- Escolhi só a primeira letra maiúscula, sempre, e nada de rótulos em caixa-alta acima de títulos; a ênfase vem de tamanho e peso.
- Pedi que o quadro mostrasse o que foi escolhido e agrupasse cada rodada. Ele começa com "Onde está", e a rodada 4 tem contorno verde como a especificação escolhida, de onde a página do design system tira os valores.
AI:
- Um agente conferiu cada fonte na Fontshare, mediu altura-x, números e pesos com o fontTools, montou a escala e os espécimes e deu notas às opções para uma tela de conversa. As notas são o julgamento dele pelos critérios descritos.
Trade-offs:
- Uma fonte de corpo própria precisa ser registrada no Dynamic Type do iOS e na escala de fonte do Android; a fonte do sistema faria isso de graça.
- As fontes da Fontshare são gratuitas pela ITF Free Font License; se o app pode embuti-las precisa ser conferido antes do Deliver.
```

## Regras de acessibilidade

- Todo estilo cresce com o Dynamic Type no iOS e com o ajuste de tamanho de fonte no Android (tamanhos em sp). A WCAG 1.4.4 pede texto que funcione a 200%.
- Nada abaixo de 11 pt; o corpo de texto tem 17 pt.
- Entrelinha de pelo menos 1,2 no corpo, e layouts que aguentam entrelinha de 1,5 e espaçamento entre letras maior (WCAG 1.4.12).
- Contraste de 4,5:1 para texto, 3:1 para texto grande e ícones (WCAG 1.4.3 e 1.4.11).
- Números tabulares para preços, horários e contagens.

## Medições

| Fonte | Altura-x (do em) | Números | Pesos |
| --- | --- | --- | --- |
| Satoshi | 0,484 | Proporcionais, tabulares com o recurso tnum | 300–900 |
| Chillax | 0,485 | Só proporcionais | 200–700 |
| Switzer | 0,531 | Tabulares por padrão | 100–900 |
| Author | 0,440 | Só proporcionais | 200–700 |
| Telma | 0,531 | Só proporcionais | 300–900 |
| Gambetta | 0,452 | Só proporcionais | 300–700 |
| Excon | 0,518 | Só proporcionais | 100–900 |

## Rodada 4: Gambetta e Switzer, refinadas

Escolhi a Gambetta para display e a Switzer para todo o resto (decisão 029). O tracking é definido por fonte e por tamanho. A tabela da Apple para a SF Pro aperta o texto de 17 pt em −0,43 pt porque a SF é desenhada para isso; copiado para a Switzer, que já é mais aberta (espaço lateral médio das minúsculas de 0,083 em, contra 0,071 da SF), deixou o texto com aparência de colado. A Gambetta 700 é desenhada justa (0,039 em), mas parece frouxa em tamanhos grandes, então recebe tracking negativo, como as referências de tipografia recomendam para display.

| Papel | Fonte e peso | Tamanho/entrelinha | Tracking |
| --- | --- | --- | --- |
| Splash | Gambetta 700 | 40/46 | −0,02 em |
| Título de display | Gambetta 700 | 34/40 | −0,015 em |
| Nome em display | Gambetta 700 | 26/30 | −0,01 em |
| Title 1 | Switzer 600 | 28/32 | −0,015 em |
| Title 2 | Switzer 600 | 22/26 | −0,01 em |
| Title 3 | Switzer 600 | 20/24 | −0,005 em |
| Headline | Switzer 600 | 17/22 | 0 |
| Body | Switzer 400 | 17/24 | 0 |
| Callout | Switzer 400 | 16/22 | 0 |
| Subheadline | Switzer 400 | 15/20 | 0 |
| Footnote | Switzer 400 | 13/18 | +0,01 em |
| Caption 1 | Switzer 500 | 12/16 | +0,015 em |
| Caption 2 | Switzer 500 | 11/14 | +0,02 em |

A entrelinha é uma proporção do tamanho, para acompanhar o Dynamic Type; texto secundário em #5B5B60 ou mais escuro, para contraste de 4,5:1. Os números da Switzer são tabulares no próprio desenho. Os títulos em Switzer começaram em 700–800 e pareciam mais escuros que a Gambetta no display; um agente de tipografia mediu hastes e área de tinta e passou para 600 (o Title 1 em 800 tinha a mesma haste da Gambetta a 34 pt). Um agente de revisão de acabamento conferiu a rodada 4 e as correções dele estão aplicadas: um elemento em Gambetta por tela, quebras de linha equilibradas, tracking da Gambetta mais suave, mais entrelinha no display de duas linhas e piso de 26 pt.

A Gambetta aparece só no splash, no título da tela de entrada, no título de boas-vindas da home, no cabeçalho da página da loja (34 pt) e no cartão de pronto para retirar (26 pt, uma linha). Uma loja em destaque no Nearby fica em Switzer, porque a home já tem o título de boas-vindas em Gambetta. Nunca abaixo de 26 pt, no máximo uma por tela e duas linhas, nunca em caixa-alta ou itálico, e nunca na conversa, em listas, botões, navegação, preços, formulários ou notificações.

## Rodada 3: display só onde cabe

Cinco opções, cada uma num splash, numa tela de entrada, numa home com o título e um widget de loja, e numa conversa só em Switzer.

| Display, com Switzer no resto | Nota |
| --- | --- |
| Gambetta | 95 |
| Chillax | 80 |
| Telma | 78 |
| Author | 72 |
| Switzer sozinha | 72 |

Ponderadas de 0 a 100: personalidade 30%, presença em tamanhos grandes 25%, combinação com a Switzer 20%, legibilidade num título de widget 15%, pesos 10%.

## Notas para a tela de conversa (rodadas 1 e 2)

As rodadas 1 e 2 puseram fonte de display na conversa, o que a decisão 028 não permite mais. Ficam como registro.

Ponderadas de 0 a 100: legibilidade 30%, números 15%, pesos 15%, escala 15%, personalidade 15%, combinação 10%.

| Tipografia | Nota |
| --- | --- |
| Gambetta + Switzer | 98 |
| Telma + Switzer | 93 |
| Switzer | 89 |
| Gambetta + Satoshi | 86 |
| Telma + Satoshi | 83 |
| Satoshi | 80 |
| Gambetta + Excon | 77 |
| Telma + Excon | 72 |
| Chillax | 65 |
| Author | 65 |
| Gambetta ou Telma + SF Pro | Fora: fonte do sistema |

## Fontes

- Apple, Human Interface Guidelines, Typography: https://developer.apple.com/design/human-interface-guidelines/typography
- Material Design 3, Type scale tokens: https://m3.material.io/styles/typography/type-scale-tokens
- WCAG 2.2, Resize text (1.4.4) e Text spacing (1.4.12): https://www.w3.org/TR/WCAG22/
- Apple, Human Interface Guidelines, Typography (estilos de texto, tamanhos mínimos, tabela de tracking, fontes próprias e Dynamic Type): https://developer.apple.com/design/human-interface-guidelines/typography
- Material Components for Android, typography tokens (espaçamento entre letras por papel): https://github.com/material-components/material-components-android/blob/master/lib/java/com/google/android/material/typography/res/values/tokens.xml
- Google Fonts Knowledge, Tracking (tracking negativo só em tamanhos de display): https://fonts.google.com/knowledge/glossary/tracking_letter_spacing
- CreativePro, On the track of good type (apertar o tracking no display): https://creativepro.com/?p=9396
- Butterick's Practical Typography (entrelinha de 120–145% do tamanho): https://practicaltypography.com/
- Fontshare (Indian Type Foundry): https://www.fontshare.com
