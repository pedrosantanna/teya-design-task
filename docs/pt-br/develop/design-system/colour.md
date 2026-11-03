# Cor

O Cinza biscoito é o neutro dos dois modos, e a Pastel parade com Índigo dá os acentos: Índigo para tudo em que o comprador age, quatro cores claras para preenchimentos e badges. As superfícies se separam pela luminosidade, e a borda só aparece onde uma superfície ainda precisa dela.

```summary
Takeaways:
- Modo claro: fundo #F4F1ED (OKLCH L 0,96), cartões brancos a 1,13:1 sobre ele, superfícies secundárias #E5E2DE para chips e balões do Snuffle.
- Modo escuro: fundo #100A06, cartões #231D18 (1,18:1), secundário #332C27. O mesmo croma do Cinza biscoito do modo claro.
- O Índigo #3D35B8 fica nos botões, nos links, na cor de destaque e nos balões do comprador; no modo escuro ele sobe para o Índigo 300 com texto preto.
- Pêssego, Pistache, Manteiga e Lavanda aparecem só como badges tonais e preenchimentos: fundo claro com texto escuro do mesmo matiz, acima de 7:1 nos dois modos.
- Os papéis semânticos vêm das mesmas escalas: o destrutivo é o vermelho do iOS escurecido para levar um rótulo branco (6,06:1), o aviso é Manteiga, o sucesso é Pistache, e o Aumentar Contraste dá a cada cartão uma borda de 1 px a 3,4:1 ou mais.
Call:
- Pedi para manter o Oat e o Brew, explorar acentos e cinzas quentes em volta deles e fazer o preto e o branco puros funcionarem com tudo isso. Escolhi o Cinza biscoito como neutro (decisão 034).
- Escolhi Pastel parade com Índigo nos dois modos e pedi superfícies sem borda, com mais contraste entre elas (decisão 036).
- Pedi um pouco mais de cor no fundo claro, depois mantive o croma da rodada 8 em L 0,96 (rodada 9), e pedi que a paleta fosse registrada aqui.
AI:
- Um agente montou as escalas em OKLCH, desenhou as rodadas no quadro de identidade e mediu cada par abaixo. Eu escolhi a paleta, o neutro e o passo do fundo.
- Um agente propôs os papéis semânticos a partir das escalas existentes e calculou os contrastes com um script que usa a fórmula do WCAG 2. Eu pedi o conjunto e que o vermelho do iOS fosse adaptado à paleta.
Trade-offs:
- Sem bordas, os cartões brancos sobre #F4F1ED dependem de um passo de 1,13:1; numa tela escura ou de baixa qualidade eles podem se misturar, então a borda continua permitida onde um cartão fica sobre uma área carregada, e o Aumentar Contraste liga as bordas em tudo.
- A Lavanda ainda não tem função nas telas; fica no conjunto para estados que o protótipo ainda não desenhou.
```

## Superfícies

Os dois modos usam o mesmo caminho de matiz do Cinza biscoito, quente na ponta clara e um pouco mais amarelo na escura. Os valores são passos de luminosidade em OKLCH convertidos para hex.

### Claro

```swatches
Fundo | #F4F1ED | L 0,96
Cartão | #FFFFFF | L 1,00
Secundário | #E5E2DE | L 0,915, chips e balões do Snuffle
Texto secundário | #59534D | L 0,445
Texto | #100A06 | L 0,15
```

### Escuro

```swatches
Fundo | #100A06 | L 0,15
Cartão | #231D18 | L 0,235
Secundário | #332C27 | L 0,30, chips e balões do Snuffle
Texto secundário | #B1AA9F | L 0,74
Texto | #FCFAF6 | L 0,985
```

## Acentos

Cada acento é uma escala de dez passos montada em OKLCH a partir da cor base. A base fica no 800 para o Índigo e entre 100 e 300 para as cores claras.

### Índigo

```swatches
50 | #F4F6FF
100 | #E8ECFF
200 | #D1D8FF
300 | #B5BFFF
400 | #96A2FF
500 | #7982FF
600 | #5F63E8
700 | #494AC0
800 | #3D35B8 | base
900 | #222169
```

### Pêssego

```swatches
50 | #FDF5F2
100 | #F9E9E4
200 | #F2D3C9
300 | #FFB59E | base
400 | #D69B88
500 | #C17F6B
600 | #A6634E
700 | #864B39
800 | #663627
900 | #462318
```

### Pistache

```swatches
50 | #F5F8F1
100 | #E9F0E1
200 | #C9EBA2 | base
300 | #B8CDA1
400 | #9BB57C
500 | #809E5C
600 | #65833E
700 | #4D682A
800 | #384D1A
900 | #24340E
```

### Manteiga

```swatches
50 | #F9F7F0
100 | #FFE7A0 | base
200 | #E4DAC0
300 | #D2C49A
400 | #BCAA73
500 | #A69050
600 | #8B752F
700 | #6F5C1A
800 | #53430D
900 | #382C04
```

### Lavanda

```swatches
50 | #F7F6FD
100 | #EDEBF8
200 | #DCD6F1
300 | #CDBDFF | base
400 | #AEA2D6
500 | #9687C3
600 | #7C6CA8
700 | #625388
800 | #483C67
900 | #302747
```

## Papéis

| Papel | Claro | Escuro | Onde |
| --- | --- | --- | --- |
| Primária | Índigo 800 #3D35B8, texto branco | Índigo 300 #B5BFFF, texto preto | Botões, o enviar do compositor, os balões do comprador |
| Destaque (tint) | Índigo 800 | Índigo 300 | Links, ícones de ação, o ícone do botão de Requests |
| Chip selecionado | Fundo Índigo 100, texto Índigo 800 | Fundo Índigo 900, texto Índigo 200 | Filtro ativo, "Open now" |
| Badge | Fundo 100 do acento, texto 800, ponto 500 | Fundo 900 do acento, texto 200, ponto 400 | Promoted (Pistache), New (Pêssego), Delivers (Manteiga) |
| Fundo do mapa | Manteiga 50 | #2A241F | Placeholder do mapa atrás dos pinos |

A primária é o preenchimento do único botão principal de uma tela; o enviar do compositor e os balões do comprador usam a mesma cor sem contar como esse botão ([revisão de telas](screen-review.md), verificação 8).

No modo escuro, o fundo do mapa era Manteiga 900, que parecia mostarda atrás dos pinos. Agora é #2A241F, um neutro do Cinza biscoito entre o cartão #231D18 e o secundário #332C27; o token `mapGround` do app acompanha.

## Papéis semânticos

Cada papel reaproveita uma escala ou o caminho do Cinza biscoito. O contraste é medido com a fórmula do WCAG 2 contra o fundo (#F4F1ED ou #100A06) e o cartão (#FFFFFF ou #231D18).

| Papel | Claro | Escuro | Contraste, claro / escuro | Onde |
| --- | --- | --- | --- | --- |
| Borda | #D4D0CB, L 0,86 | #433C36, L 0,36 | 1,36:1 sobre o fundo, 1,53:1 sobre o cartão / 1,81:1, 1,54:1 | Um cartão sobre uma área carregada, campos de texto |
| Separador | #DEDAD5, L 0,89 | #38312C, L 0,32 | 1,24:1, 1,39:1 / 1,54:1, 1,30:1 | Linhas de 1 px entre as linhas de uma lista, recuadas até o texto |
| Borda, Aumentar Contraste | #857F79, L 0,60 | #787068, L 0,55 | 3,51:1, 3,96:1 / 4,04:1, 3,42:1 | Todo cartão, balão e campo ganha uma borda de 1 px quando o Aumentar Contraste (iOS) ou o texto de alto contraste (Android) está ligado |
| Destrutivo | Fundo #BA2B28, rótulo branco | Fundo #F07F77, rótulo preto | Rótulo 6,06:1 / 8,01:1; como texto, 5,38:1 sobre o fundo, 6,06:1 sobre o cartão / 7,50:1, 6,35:1 | Cancel for a refund e qualquer ação que não dá para desfazer |
| Aviso | Manteiga 700 #6F5C1A | Manteiga 300 #D2C49A | 5,79:1, 6,52:1 / 11,33:1, 9,60:1 | O ícone de aviso em "Not confirmed · not charged" e "Sold · not charged" |
| Sucesso | Pistache 700 #4D682A | Pistache 300 #B8CDA1 | 5,60:1, 6,31:1 / 11,50:1, 9,75:1 | O ícone de check em Ready, Paid e Collected |
| Scrim | Preto a 40% | Preto a 40% | Não é texto | Atrás de sheets e diálogos próprios; um degradê de 0 a 40% sob badges ou botões de glass sobre uma foto |
| Desativado | Conteúdo: texto a 38% (#8D8884) sobre um contêiner de texto a 12% (#D9D5D1) | Conteúdo #7B7773 sobre contêiner #2C2723 | 2,40:1 / 3,33:1 | Botões e campos que ainda não podem ser usados |

O destrutivo parte do vermelho do sistema no iOS. O #FF3B30 leva um rótulo branco a só 3,55:1, então foi movido em OKLCH para L 0,52 no matiz 27, o que o mantém vermelho ao lado do Pêssego e passa de 4,5:1. No modo escuro ele segue o Índigo: fundo claro com rótulo preto. Aviso e sucesso ficam nas escalas de Manteiga e Pistache que os badges já usam, e vêm sempre com um ícone e um rótulo, nunca só com a cor.

O conteúdo desativado está isento do mínimo do WCAG 1.4.3, como todo controle inativo; sobre um cartão, os valores são #92908E sobre #E2E2E1 no modo claro e #86827D sobre #3D3833 no escuro. Só com o scrim, um texto branco sobre uma foto branca ficaria em 2,85:1, então um texto nunca fica sobre uma foto só com o scrim; os badges têm o próprio fundo.

## Contraste

| Par | Claro | Escuro |
| --- | --- | --- |
| Texto sobre o fundo | 17,46:1 | 18,86:1 |
| Texto secundário sobre cartão | 7,58:1 | 7,24:1 |
| Cartão sobre o fundo | 1,13:1 | 1,18:1 |
| Rótulo sobre a primária | 8,75:1 | 11,11:1 |
| Destaque sobre o fundo | 7,77:1 | 11,11:1 |
| Texto do chip selecionado sobre o fundo dele | 7,45:1 | 10,06:1 |
| Texto do badge sobre o fundo dele | 7,45 a 8,42:1 | 9,86 a 10,10:1 |

Todo par de texto passa no WCAG AA. Todos, exceto texto secundário sobre superfície secundária (5,87:1 no modo claro) e as cores de destrutivo, aviso e sucesso do modo claro (5,38 a 6,52:1), passam no AAA. A borda do Aumentar Contraste passa dos 3:1 que o WCAG 1.4.11 pede para o limite de um componente. Pares de superfície não são texto e não têm mínimo no WCAG; 1,13:1 é o menor passo que aceitei sem borda.

## Fontes

- [Identidade](../ideation/identity.md), rodadas 5 a 9 no quadro.
- Decisões 034 e 036 no [registro de decisões](../../decision-log.md).
