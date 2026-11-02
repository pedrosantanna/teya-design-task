# Escala tipográfica

Uma escala tipográfica montada a partir dos estilos de texto da Apple, com os papéis correspondentes do Material 3, e testes de oito fontes da Fontshare sobre ela: quatro sozinhas e três fontes de display combinadas com uma fonte de corpo. Cada teste termina na mesma tela de conversa, que é onde o comprador mais lê. As fontes carregam de uma pasta privada e não vão para o repositório público; sem elas, o canvas usa a fonte do sistema.

```summary
Takeaways:
- A escala são os onze estilos de texto da Apple no tamanho padrão do Dynamic Type, de Large title (34 pt) a Caption 2 (11 pt), cada um ligado ao papel mais próximo do Material 3 para o Android.
- Para uma tela de conversa, a melhor nota vai para Gambetta nos títulos e Switzer no resto (98 de 100). A Switzer mantém conversa, preços e horários legíveis, com números tabulares por padrão; a Gambetta dá aos títulos uma voz editorial britânica.
- Fontes do sistema são só fallback (decisão 027), então os pares da rodada 1 com SF Pro estão fora. A rodada 2 combina Gambetta, Telma e Pally com a Switzer e com a Satoshi.
- A Switzer é a melhor fonte única (89), com a maior altura-x e números tabulares por padrão. Chillax e Author têm as notas mais baixas para ler uma conversa: legibilidade menor em tamanhos pequenos e só números proporcionais.
Call:
- Nada de rótulos em caixa-alta acima de títulos; só a primeira letra maiúscula, sempre, com a ênfase vindo de tamanho e peso.
- Fonte de display só em títulos de 20 pt para cima. Corpo, preços e horários ficam numa fonte de corpo com números tabulares.
- Fontes que escolhi: Satoshi, Chillax, Switzer e Author sozinhas; Telma, Gambetta e Pally como fontes de display, primeiro com SF Pro e Excon, depois com Switzer e Satoshi.
- SF Pro e Roboto são só fallback, nunca a fonte escolhida, porque nenhuma existe na outra plataforma (decisão 027).
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
| Pally | 0,500 | Só proporcionais | 400–700 |
| Excon | 0,518 | Só proporcionais | 100–900 |

## Notas para a tela de conversa

Ponderadas de 0 a 100: legibilidade 30%, números 15%, pesos 15%, escala 15%, personalidade 15%, combinação 10%.

| Tipografia | Nota |
| --- | --- |
| Gambetta + Switzer | 98 |
| Telma + Switzer | 93 |
| Pally + Switzer | 90 |
| Switzer | 89 |
| Gambetta + Satoshi | 86 |
| Telma + Satoshi | 83 |
| Satoshi | 80 |
| Pally + Satoshi | 78 |
| Gambetta + Excon | 77 |
| Telma + Excon | 72 |
| Pally + Excon | 69 |
| Chillax | 65 |
| Author | 65 |
| Gambetta, Telma ou Pally + SF Pro | Fora: fonte do sistema |

## Fontes

- Apple, Human Interface Guidelines, Typography: https://developer.apple.com/design/human-interface-guidelines/typography
- Material Design 3, Type scale tokens: https://m3.material.io/styles/typography/type-scale-tokens
- WCAG 2.2, Resize text (1.4.4) e Text spacing (1.4.12): https://www.w3.org/TR/WCAG22/
- Fontshare (Indian Type Foundry): https://www.fontshare.com
