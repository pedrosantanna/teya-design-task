# Cor

O Cinza biscoito é o neutro dos dois modos, e a Pastel parade com Índigo dá os acentos. Cada cor tem uma função: o Índigo é o comprador agindo, a Lavanda é o Snuffle falando, e os pastéis quentes são as lojas. As superfícies se separam pela luminosidade, e a borda só aparece onde uma superfície ainda precisa dela.

```summary
Takeaways:
- Modo claro: fundo #EEE9E2 (OKLCH L 0,935), cartões brancos a 1,21:1 sobre ele, secundário #E5E2DE para botões tonais sobre cartões. Os chips ficam na cor do cartão.
- Modo escuro: fundo #100A06, cartões #2B2420 (1,29:1), secundário #38312C. O mesmo croma do Cinza biscoito do modo claro.
- O Índigo #3D35B8 é o comprador agindo: o único botão preenchido de confirmação à vista, os links, a cor de destaque e os balões do comprador. No modo escuro ele sobe para o Índigo 300 com texto preto.
- Cada loja tem um acento fixo, escolhido pelo tipo dela: Pêssego, Pistache ou Manteiga. O passo de tile (OKLCH L 0,87, C 0,07, Manteiga C 0,09; no escuro L 0,36, C 0,08 com os matizes afastados) fica entre 1,20 e 1,26:1 sobre o fundo claro e preenche o tile tonal, o cartão de categoria, o cabeçalho da página da loja e o do recibo.
- A Lavanda é o Snuffle e nenhuma loja a usa: os balões (o passo de tile da Lavanda, #D7CCFE), os pontos de digitação e a Live Activity. Os chats ficam sobre um fundo neutro: branco no modo claro, o fundo no escuro.
- Os papéis semânticos vêm das mesmas escalas: o destrutivo é o vermelho do iOS escurecido para levar um rótulo branco (6,06:1), o aviso é Manteiga, o sucesso é Pistache, e o Aumentar Contraste dá a cada cartão uma borda de 1 px a 3,4:1 ou mais.
Call:
- Pedi para manter o Oat e o Brew, explorar acentos e cinzas quentes em volta deles e fazer o preto e o branco puros funcionarem com tudo isso. Escolhi o Cinza biscoito como neutro (decisão 034).
- Escolhi Pastel parade com Índigo nos dois modos e pedi superfícies sem borda, com mais contraste entre elas (decisão 036).
- Pedi um pouco mais de cor no fundo claro, depois mantive o croma da rodada 8 em L 0,96 (rodada 9), e pedi que a paleta fosse registrada aqui.
- Uma revisão de marca viu o Índigo fazendo todo o trabalho, os pastéis só em badges pequenos e superfícies com cara de iOS padrão. Aprovei um acento por loja, Lavanda para o Snuffle, no máximo um controle preenchido em Índigo por tela visível e um fundo mais escuro (#EEE9E2) com o cartão escuro mais claro (decisão 045).
- Nesta rodada, uma revisão de acabamento mediu os tiles pastéis entre 1,01 e 1,04:1 sobre o fundo. Pedi um passo de tile que apareça, a direção calma para o chat que a pesquisa recomendou (fundo neutro, sem tom roxo nem brilho), um fundo de sheet no modo escuro e que a seleção deixe de usar fundos cinza e chips pretos (change craft-pass-2).
AI:
- Um agente montou as escalas em OKLCH, desenhou as rodadas no quadro de identidade e mediu cada par abaixo. Eu escolhi a paleta, o neutro e o passo do fundo.
- Um agente propôs os papéis semânticos a partir das escalas existentes e calculou os contrastes com um script que usa a fórmula do WCAG 2. Eu pedi o conjunto e que o vermelho do iOS fosse adaptado à paleta.
- Um agente fez a revisão de marca no protótipo, depois criou os tokens de acento e do Snuffle, recalculou cada par abaixo para os quatro matizes e aplicou os papéis no app. Eu defini o passo de cada token.
- Um agente fez a revisão de acabamento, propôs a luminosidade e o croma do passo de tile, renderizou de novo as imagens das categorias sobre ele e mediu cada par alterado com um script que usa a fórmula do WCAG 2.
- Uma segunda crítica visual, feita por um agente, viu os tiles escuros virarem um oliva só, a Manteiga clara parecer marca-texto e o chip selecionado mais fraco que os brancos. Outro agente afastou os matizes escuros com mais croma, levou a Manteiga clara para um amarelo mais limpo, pôs uma borda de 1 pt no chip selecionado, renderizou de novo as imagens das categorias e recalculou a tabela abaixo.
Trade-offs:
- O secundário #E5E2DE sobre o novo fundo fica em 1,07:1, então não marca um chip ali; os chips foram para a cor do cartão, e o secundário só aparece sobre cartões.
- Com um pastel por loja, a cor da loja não carrega significado além do reconhecimento; status e ações mantêm as próprias cores, então um tile Pêssego nunca é lido como aviso.
- Os pontos de digitação em Lavanda 500 sobre Lavanda 100 ficam em 2,72:1. São decorativos (o VoiceOver lê "Snuffle is writing"), então mantive o passo mais claro.
- O texto secundário sobre o passo de tile escuro fica entre 4,59 e 4,87:1: passa no AA, mas com menos folga que no modo claro (5,00:1 ou mais). Mais croma no escuro custou um pouco (o Pistache foi de 4,64 para 4,59:1).
- Um fundo de chat branco põe superfícies de cartão sobre cartão, então cartões e linhas agrupadas no chat precisam de um contorno (um fio e uma sombra suave) que não precisam em outros lugares.
```

## Superfícies

Os dois modos usam o mesmo caminho de matiz do Cinza biscoito, quente na ponta clara e um pouco mais amarelo na escura. Os valores são passos de luminosidade em OKLCH convertidos para hex.

### Claro

```swatches
Fundo | #EEE9E2 | L 0,935, biscuit.940
Cartão | #FFFFFF | L 1,00, cartões e chips
Secundário | #E5E2DE | L 0,915, botões tonais e o stepper sobre cartões
Texto secundário | #59534D | L 0,445
Texto | #100A06 | L 0,15
```

### Escuro

```swatches
Fundo | #100A06 | L 0,15
Cartão | #2B2420 | L 0,265, cartões e chips
Secundário | #38312C | L 0,32, botões tonais e o stepper sobre cartões
Texto secundário | #B1AA9F | L 0,74
Texto | #FCFAF6 | L 0,985
Sheet | #1C1612 | L 0,20, sheets opacas, para as linhas em cartão (1,17:1) ainda se separarem
```

As sheets opacas usam o fundo no modo claro. O fundo de um chat é o cartão no modo claro e o fundo no escuro (veja Snuffle, abaixo).

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
| Primária | Índigo 800 #3D35B8, texto branco | Índigo 300 #B5BFFF, texto preto | O único botão preenchido de confirmação à vista (Buy, Ask), o enviar do compositor, os balões do comprador |
| Destaque (tint) | Índigo 800 | Índigo 300 | Links, botões de texto, ícones de ação, o ícone do botão de Requests |
| Botão tonal | Fundo secundário, texto na cor do texto | Fundo secundário, texto na cor do texto | Ações secundárias: Call e Directions na página da loja, Buy nas respostas que não são a melhor |
| Chip selecionado (`chipSelected`) | Fundo Índigo 100, texto Índigo 800 em semibold (7,45:1), uma borda de 1 pt em Índigo 200 (`chipSelectedEdge`) | Fundo Índigo 900, texto Índigo 200 (10,06:1), uma borda de 1 pt em Índigo 800 | Filtro ativo e os chips de lugar e prazo; também o passo atual num cartão de compra, o controle segmentado e a ação do snackbar no Android |
| Linha selecionada | A linha mantém o fundo; um check e o título em Headline | O mesmo | Uma escolha numa lista: o lugar na sheet de localização, retirar ou entregar na sheet de detalhes |
| Contador (`count`) | Índigo 800, texto branco (8,75:1), um anel de 2 pt na cor do fundo | O mesmo | O botão de Requests e as respostas não lidas |
| Badge sobre foto | Fundo 100 do acento, texto 800, ponto 500 | Os valores do claro | Promoted (Pistache), New (Pêssego), Delivers (Manteiga) |
| Badge sobre wash | Fundo do cartão, texto na cor do texto | Fundo do cartão, texto na cor do texto | O cabeçalho da página da loja, onde um badge pastel ficaria sobre outro pastel |
| Fundo do mapa | Manteiga 50 | #2B2420 | Placeholder do mapa atrás dos pinos |

O `filterSelected` (fundo na cor do texto) não é mais usado: um chip selecionado preto era a marca mais pesada do Nearby, então a seleção voltou para o Índigo tonal. Os badges mantêm os valores do claro no modo escuro porque ficam sobre fotos, que não mudam com o tema.

A primária preenche no máximo um controle por tela visível, a ação de confirmação; o enviar do compositor e os balões do comprador usam a mesma cor sem contar como esse botão ([revisão de telas](screen-review.md), verificações 8 e 19).

No modo escuro, o fundo do mapa era Manteiga 900, que parecia mostarda atrás dos pinos. É #2B2420, o mesmo passo do Cinza biscoito do cartão escuro agora.

## Acentos das lojas

Cada loja tem um acento fixo, escolhido pelo tipo dela (`store/kinds.ts`), então ela aparece igual no Nearby, no chat, na página dela e no recibo. Padarias, lojas de ferragens, bancas, livrarias, bolsas e presentes são Manteiga; cafés e delis, câmeras, brinquedos, açougues e moda são Pêssego; óticas, floriculturas, farmácias e papelarias são Pistache. Nenhuma loja é Lavanda, que é do Snuffle.

| Token | Claro | Escuro | Onde |
| --- | --- | --- | --- |
| `shop.accent.<hue>.tile` | Passo de tile: Pêssego #FEC5B2, Pistache #C5DEAE, Manteiga #E7D48F, Lavanda #D7CCFE | Pêssego #602C1C, Pistache #2A4618, Manteiga #4C3B01, Lavanda #3F3659 | O tile tonal, o cartão de categoria e o cabeçalho da tela de categoria, o cabeçalho da página da loja (sólido, terminando numa borda reta abaixo das ações), o cabeçalho do recibo |
| `shop.accent.<hue>.wash` | 100 | 900 | As listras claras do toldo no tile tonal |
| `shop.accent.<hue>.ink` | 800 | 200 | As iniciais e as listras escuras do toldo no tile |

Os passos 100 ficavam entre L 0,95 e 0,97, sobre um fundo em L 0,935, e mediam de 1,01 a 1,04:1 contra ele, então um tile parecia o próprio fundo. O passo de tile é definido pela luminosidade: OKLCH L 0,87 e C 0,07 no ângulo de cada matiz no modo claro, com a Manteiga em C 0,09 e matiz 95, para ler como amarelo e não como marca-texto. No modo escuro é L 0,36 e C 0,08, e os matizes ficam afastados para que as três cores de loja não virem um oliva só: Pêssego em 38, Manteiga em 90 (C 0,073, o máximo que o sRGB comporta ali) e Pistache em 135. A Lavanda continua em L 0,36, C 0,06. O recibo não tem mais a faixa de 4 pt em ink.

Contraste no passo de tile, claro / escuro:

| Matiz | Tile sobre o fundo | Texto | Texto secundário | Índigo 800 / 300 | Ink sobre o tile |
| --- | --- | --- | --- | --- | --- |
| Pêssego | 1,26:1 / 1,75:1 | 12,96:1 / 10,75:1 | 5,00:1 / 4,87:1 | 5,77:1 / 6,33:1 | 6,52:1 / 7,97:1 |
| Pistache | 1,20:1 / 1,86:1 | 13,51:1 / 10,13:1 | 5,21:1 / 4,59:1 | 6,01:1 / 5,97:1 | 6,43:1 / 7,99:1 |
| Manteiga | 1,22:1 / 1,81:1 | 13,31:1 / 10,42:1 | 5,13:1 / 4,72:1 | 5,92:1 / 6,14:1 | 6,53:1 / 7,80:1 |
| Lavanda | 1,25:1 / 1,76:1 | 13,07:1 / 10,70:1 | 5,04:1 / 4,84:1 | 5,82:1 / 6,30:1 | 6,59:1 / 7,93:1 |

Todo par de texto passa no AA. O texto passa no AAA; o texto secundário e o Índigo, não.

## Snuffle

| Token | Claro | Escuro | Onde |
| --- | --- | --- | --- |
| `snuffle.bubble` | Passo de tile da Lavanda #D7CCFE | Lavanda 900 #302747 | Os balões do Snuffle, o indicador de digitação, a trilha da Live Activity |
| `snuffle.dot` | Lavanda 500 | Lavanda 400 | Pontos de digitação, o progresso da Live Activity |
| `chat.ground` | Cartão #FFFFFF | Fundo #100A06 | O fundo do New Request e de todo chat |
| `chat.fill` | Fundo #EEE9E2 | Cartão #2B2420 | Chips e linhas agrupadas sobre o fundo do chat |
| `chat.edge` | #DEDAD5 | #2B2420 | Um fio em volta dos cartões sobre o fundo do chat, com a sombra suave |

O balão fica em 1,50:1 sobre o fundo branco do chat e em 1,41:1 sobre o escuro; o texto nele fica em 13,07:1 e 13,37:1. O chat não tem tom roxo, degradê nem brilho (a [Identidade](../ideation/identity.md) descarta degradês roxos): a Lavanda aparece só nos balões do Snuffle. A marca é o glifo sozinho na cor do texto (veja [Marca](mark.md)); os tokens que a desenhavam sobre um tile Lavanda com rosto Manteiga saíram.

A sombra suave do cartão tem duas camadas da cor do texto (claro): 0 1 2 a 4% e 0 4 12 a 5%. Ela separa as linhas em cartão de um fundo da mesma cor (a página da loja) e os cartões do fundo branco do chat.

## Papéis semânticos

Cada papel reaproveita uma escala ou o caminho do Cinza biscoito. O contraste é medido com a fórmula do WCAG 2 contra o fundo (#EEE9E2 ou #100A06) e o cartão (#FFFFFF ou #2B2420).

| Papel | Claro | Escuro | Contraste, claro / escuro | Onde |
| --- | --- | --- | --- | --- |
| Borda | #D4D0CB, L 0,86 | #433C36, L 0,36 | 1,27:1 sobre o fundo, 1,53:1 sobre o cartão / 1,81:1, 1,41:1 | Um cartão sobre uma área carregada, campos de texto |
| Separador | #DEDAD5, L 0,89 | #38312C, L 0,32 | 1,15:1, 1,39:1 / 1,54:1, 1,19:1 | Linhas de 1 px entre as linhas de uma lista, recuadas até o texto |
| Borda, Aumentar Contraste | #857F79, L 0,60 | #787068, L 0,55 | 3,28:1, 3,96:1 / 4,04:1, 3,14:1 | Todo cartão, balão e campo ganha uma borda de 1 px quando o Aumentar Contraste (iOS) ou o texto de alto contraste (Android) está ligado |
| Destrutivo | Fundo #BA2B28, rótulo branco | Fundo #F07F77, rótulo preto | Rótulo 6,06:1 / 8,01:1; como texto, 5,02:1 sobre o fundo, 6,06:1 sobre o cartão / 7,50:1, 5,82:1 | Cancel for a refund e qualquer ação que não dá para desfazer |
| Aviso | Manteiga 700 #6F5C1A | Manteiga 300 #D2C49A | 5,40:1, 6,52:1 / 11,33:1, 8,80:1 | O ícone de aviso em "Not confirmed · not charged" e "Sold · not charged" |
| Sucesso | Pistache 700 #4D682A | Pistache 300 #B8CDA1 | 5,22:1, 6,31:1 / 11,50:1, 8,93:1 | O ícone de check em Ready, Paid e Collected |
| Scrim | Preto a 40% | Preto a 40% | Não é texto | Atrás de sheets e diálogos próprios; um degradê de 0 a 40% sob badges ou botões de glass sobre uma foto |
| Desativado | Conteúdo: texto a 38% (#8D8884) sobre um contêiner de texto a 12% (#D9D5D1) | Conteúdo #7B7773 sobre contêiner #2C2723 | 2,40:1 / 3,33:1 | Botões e campos que ainda não podem ser usados |

O destrutivo parte do vermelho do sistema no iOS. O #FF3B30 leva um rótulo branco a só 3,55:1, então foi movido em OKLCH para L 0,52 no matiz 27, o que o mantém vermelho ao lado do Pêssego e passa de 4,5:1. No modo escuro ele segue o Índigo: fundo claro com rótulo preto. Aviso e sucesso ficam nas escalas de Manteiga e Pistache que os badges já usam, e vêm sempre com um ícone e um rótulo, nunca só com a cor.

O conteúdo desativado está isento do mínimo do WCAG 1.4.3, como todo controle inativo; sobre um cartão, os valores são #92908E sobre #E2E2E1 no modo claro e #86827D sobre #3D3833 no escuro. Só com o scrim, um texto branco sobre uma foto branca ficaria em 2,85:1, então um texto nunca fica sobre uma foto só com o scrim; os badges têm o próprio fundo.

## Contraste

| Par | Claro | Escuro |
| --- | --- | --- |
| Texto sobre o fundo | 16,28:1 | 18,86:1 |
| Texto secundário sobre o fundo | 6,28:1 | 8,54:1 |
| Texto secundário sobre cartão | 7,58:1 | 6,63:1 |
| Cartão sobre o fundo | 1,21:1 | 1,29:1 |
| Rótulo sobre a primária | 8,75:1 | 11,11:1 |
| Destaque sobre o fundo | 7,25:1 | 11,11:1 |
| Texto do chip selecionado sobre o fundo dele | 7,45:1 | 10,06:1 |
| Texto do badge sobre o fundo dele | 7,45 a 8,42:1 | 7,45 a 8,42:1 (valores do claro) |
| Balão do Snuffle sobre o fundo do chat | 1,50:1 | 1,41:1 |
| Linhas em cartão sobre a sheet escura | | 1,17:1 |

Todo par de texto passa no WCAG AA. Todos, exceto texto secundário sobre superfície secundária (5,87:1 no claro, 5,55:1 no escuro), texto secundário sobre o fundo claro (6,28:1) e as cores de destrutivo, aviso e sucesso sobre o fundo claro (5,02 a 5,40:1), passam no AAA. A borda do Aumentar Contraste passa dos 3:1 que o WCAG 1.4.11 pede para o limite de um componente (3,28:1 e 3,14:1 no mínimo). Pares de superfície não são texto e não têm mínimo no WCAG; 1,21:1 é o passo do cartão sobre o novo fundo, acima dos 1,13:1 de antes.

## Fontes

- [Identidade](../ideation/identity.md), rodadas 5 a 9 no quadro.
- Decisões 034, 036 e 045 no [registro de decisões](../../decision-log.md); change do OpenSpec `craft-pass-2`.
