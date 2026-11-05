# Cor

O Cinza biscoito é o neutro do modo claro, e o Stone, o mesmo cinza com 45% do croma, o do modo escuro. A Pastel parade com Índigo dá os acentos. Cada cor tem uma função: o Índigo é o comprador agindo, a Lavanda é o Snuffle falando, e os pastéis quentes são as lojas. As superfícies se separam pela luminosidade, e a borda só aparece onde uma superfície ainda precisa dela.

```summary
Takeaways:
- Modo claro: fundo #EEE9E2 (OKLCH L 0,935), cartões brancos a 1,21:1 sobre ele, secundário #E5E2DE para botões tonais sobre cartões. Um chip não selecionado fica um nível abaixo do selecionado, que é cartão com texto e borda Índigo 800.
- Modo escuro: fundo #0E0B09, cartões #282523 (1,29:1), secundário #353230. São passos do Stone: o Cinza biscoito com 45% do croma, para o escuro ser lido como um cinza quente e calmo, e não como marrom.
- O Índigo #3D35B8 é o comprador agindo: o único botão preenchido de confirmação à vista, os links, a cor de destaque e os balões do comprador. No modo escuro ele sobe para o Índigo 300 com texto preto.
- Cada loja tem um acento fixo, escolhido pelo tipo dela: Pêssego, Pistache ou Manteiga. O passo de tile (OKLCH L 0,87, C 0,07, Manteiga C 0,09; no escuro L 0,36, C 0,08 com os matizes afastados, e uma Manteiga mais calma em L 0,34, C 0,05) fica entre 1,20 e 1,26:1 sobre o fundo claro e preenche o tile tonal, o cartão de categoria, a página da loja inteira e o cabeçalho do recibo. Na página da loja ele é o fundo de todas as seções, com as linhas em Card por cima sob a sombra suave; a cor do texto fica em 10,1:1 ou mais sobre todos os tiles e o texto secundário em 4,6:1 ou mais, no claro e no escuro.
- A Lavanda é o Snuffle e nenhuma loja a usa: os balões (o passo de tile da Lavanda, #D7CCFE), os pontos de digitação e a Live Activity. Os chats ficam sobre um fundo neutro: branco no modo claro, o fundo no escuro.
- Os papéis semânticos vêm das mesmas escalas: o destrutivo é o vermelho do iOS escurecido para levar um rótulo branco (6,06:1), o aviso é Manteiga, o sucesso é Pistache, e o Aumentar Contraste dá a cada cartão uma borda de 1 px a 3,4:1 ou mais.
Call:
- Pedi para manter o Oat e o Brew, explorar acentos e cinzas quentes em volta deles e fazer o preto e o branco puros funcionarem com tudo isso. Escolhi o Cinza biscoito como neutro (decisão 034).
- Escolhi Pastel parade com Índigo nos dois modos e pedi superfícies sem borda, com mais contraste entre elas (decisão 036).
- Pedi um pouco mais de cor no fundo claro, depois mantive o croma da rodada 8 em L 0,96 (rodada 9), e pedi que a paleta fosse registrada aqui.
- Uma revisão de marca viu o Índigo fazendo todo o trabalho, os pastéis só em badges pequenos e superfícies com cara de iOS padrão. Aprovei um acento por loja, Lavanda para o Snuffle, no máximo um controle preenchido em Índigo por tela visível e um fundo mais escuro (#EEE9E2) com o cartão escuro mais claro (decisão 045).
- Nesta rodada, uma revisão de acabamento mediu os tiles pastéis entre 1,01 e 1,04:1 sobre o fundo. Pedi um passo de tile que apareça, a direção calma para o chat que a pesquisa recomendou (fundo neutro, sem tom roxo nem brilho), um fundo de sheet no modo escuro e que a seleção deixe de usar fundos cinza e chips pretos (change craft-pass-2).
- Pedi um tratamento só para todas as sheets: o mesmo glass, um tom mais escuro que o fundo no modo claro e um passo afastado dele no escuro, com o que fica sobre a sheet subindo um nível para continuar separado. Mantive a sheet escura em #191715.
- Com o croma inteiro do Biscuit, o modo escuro parecia marrom. Escolhi para ele a coluna "menos cor" da rodada 8, chamada Stone, para ter um modo escuro mais neutro; o modo claro continua no Biscuit (decisão 048).
- Depois de uma quarta crítica visual, pedi que o chip selecionado fosse cartão com texto e borda Índigo, os não selecionados um nível abaixo, o controle segmentado do iOS e um scrim atrás de toda sheet (texto a 20% no claro, preto a 48% no escuro).
- Na tela de categoria escura, as linhas em Card ficavam mais escuras que o tile e pareciam buracos. Escolhi manter a cor inteira como fundo e fazer das linhas um cartão tingido mais claro que ele, em vez de um fundo escuro com uma faixa que se desfaz (decisão 050).
- Depois de outra crítica visual e de uma revisão de telas da versão web, pedi as correções das duas: uma alça mais discreta no escuro, um trilho do controle segmentado que apareça na sheet clara, chips escuros sobre o fundo que não se confundam com o selecionado, a contagem do cabeçalho da tela de categoria na mesma cor do texto secundário das linhas e um Voltar escuro sobre o tile sem a saturação extra e o halo.
AI:
- Um agente montou as escalas em OKLCH, desenhou as rodadas no quadro de identidade e mediu cada par abaixo. Eu escolhi a paleta, o neutro e o passo do fundo.
- Um agente propôs os papéis semânticos a partir das escalas existentes e calculou os contrastes com um script que usa a fórmula do WCAG 2. Eu pedi o conjunto e que o vermelho do iOS fosse adaptado à paleta.
- Um agente fez a revisão de marca no protótipo, depois criou os tokens de acento e do Snuffle, recalculou cada par abaixo para os quatro matizes e aplicou os papéis no app. Eu defini o passo de cada token.
- Um agente fez a revisão de acabamento, propôs a luminosidade e o croma do passo de tile, renderizou de novo as imagens das categorias sobre ele e mediu cada par alterado com um script que usa a fórmula do WCAG 2.
- Uma segunda crítica visual, feita por um agente, viu os tiles escuros virarem um oliva só, a Manteiga clara parecer marca-texto e o chip selecionado mais fraco que os brancos. Outro agente afastou os matizes escuros com mais croma, levou a Manteiga clara para um amarelo mais limpo, pôs uma borda de 1 pt no chip selecionado, renderizou de novo as imagens das categorias e recalculou a tabela abaixo.
- Um agente criou a escala Stone, apontou para ela as superfícies e o texto do modo escuro, renderizou de novo as ilustrações escuras e o fallback escuro do mapa e recalculou cada par escuro desta página com o script do WCAG 2.
- Uma terceira crítica visual, feita por um agente, viu o tile Manteiga escuro puxar para um cáqui amarronzado, as linhas em Card sobre ele parecerem sujas e os botões em Muted quase sumirem (1,17:1). Outro agente baixou a Manteiga escura para L 0,34, C 0,05, deu aos botões tonais sobre um tile uma camada branca, subiu os pontos de página inativos para 35% e recalculou os pares abaixo.
- Um agente calculou os tons da sheet e os contrastes com o script do WCAG 2, escolheu L 0,89 para a sheet clara (L 0,90 a 0,91 dava só 1,09 a 1,12:1), subiu linhas, campos e o trilho do controle segmentado um nível e conferiu tudo renderizado no claro e no escuro.
- Um agente calculou os cartões tingidos escuros das linhas da tela de categoria (OKLCH L 0,44, C 0,03 no matiz de cada acento), viu o texto secundário a 3,35 a 3,42:1 sobre eles, criou o Stone 840 para o texto secundário ali e mediu cada par novo com o script do WCAG 2.
- Um agente achou as imagens Manteiga escuras renderizadas sobre um tile antigo (#4C3B01 contra o token #423717), fez o pipeline de ilustrações ler as cores dos tiles dos tokens e falhar quando o canto de uma imagem difere, renderizou de novo as imagens de categoria e mediu os novos pares de chip, controle segmentado, sheet e glass.
- Um agente criou `color.grabber` (Stone 445 no escuro, 2,49:1 sobre a sheet), passou o trilho do controle segmentado claro para Border, deu aos chips escuros sobre o fundo uma borda Border, criou os valores de glass sobre o tile e mediu cada par novo com o script do WCAG 2.
Trade-offs:
- O secundário #E5E2DE sobre o novo fundo fica em 1,07:1, então não marca um chip ali; os chips foram para a cor do cartão, e o secundário só aparece sobre cartões.
- A sheet escura fica em 1,10:1 sobre o fundo, abaixo do 1,15:1 buscado: sheets mais claras aproximam dela as linhas em cartão e em secundário. O realce do contorno marca a borda de cima no lugar disso.
- Com um pastel por loja, a cor da loja não carrega significado além do reconhecimento; status e ações mantêm as próprias cores, então um tile Pêssego nunca é lido como aviso.
- Os pontos de digitação em Lavanda 500 sobre Lavanda 100 ficam em 2,72:1. São decorativos (o VoiceOver lê "Snuffle is writing"), então mantive o passo mais claro.
- O texto secundário sobre o passo de tile escuro fica entre 4,58 e 5,08:1: passa no AA, mas com menos folga que no modo claro (5,00:1 ou mais). Mais croma no escuro custou um pouco (o Pistache foi de 4,64 para 4,59:1).
- Um fundo de chat branco põe superfícies de cartão sobre cartão, então cartões e linhas agrupadas no chat precisam de um contorno (um fio e uma sombra suave) que não precisam em outros lugares.
```

## Superfícies

O modo claro usa o caminho de matiz do Cinza biscoito, quente na ponta clara e um pouco mais amarelo na escura. O modo escuro usa o Stone, com os mesmos passos de luminosidade e o mesmo matiz e 45% do croma do Biscuit (`stone.*` nos primitivos). Os valores são passos de luminosidade em OKLCH convertidos para hex.

### Claro

```swatches
Fundo | #EEE9E2 | L 0,935, biscuit.940
Cartão | #FFFFFF | L 1,00, cartões e chips
Secundário | #E5E2DE | L 0,915, botões tonais e o stepper sobre cartões
Texto secundário | #59534D | L 0,445
Texto | #100A06 | L 0,15
Sheet | #DEDAD5 | L 0,89, o fundo de toda sheet, 1,15:1 abaixo do fundo
```

### Escuro

```swatches
Fundo | #0E0B09 | L 0,15, stone.150
Cartão | #282523 | L 0,265, cartões e chips
Secundário | #353230 | L 0,32, botões tonais e o stepper sobre cartões
Texto secundário | #AEAAA6 | L 0,74
Texto | #FBFAF8 | L 0,985
Sheet | #191715 | L 0,20, o fundo de toda sheet; as linhas sobre ela usam o secundário (1,40:1)
Texto secundário sobre o tile | #CECAC6 | L 0,84, stone.840, o texto secundário das linhas da tela de categoria (4,74:1 ou mais)
```

Toda sheet tem o mesmo fundo, um tom afastado do fundo da tela: mais escuro no modo claro, mais claro no escuro. O que fica sobre uma sheet sobe um nível: linhas e campos são cartão no modo claro (1,39:1 sobre a sheet) e secundário no escuro (1,40:1), onde o cartão ficaria em 1,17:1; o Fechar e o Confirmar do cabeçalho também, no escuro. Os chips e o controle segmentado seguem a regra deles (um nível abaixo do selecionado); o trilho do controle segmentado é Border no claro (1,10:1 sobre a sheet, com o seletor branco a 1,53:1 sobre ele; Muted dava 1,08:1 e o seletor 1,29:1). A alça é `color.grabber`: texto secundário a 38% no claro (1,72:1), Stone 445 #5A5754 no escuro (2,49:1), uma cor sólida mais discreta que o título; o texto secundário a 38% aparecia como #514F4C ali (2,19:1), um cinza translúcido que dependia do que estava embaixo. Atrás de toda sheet há um scrim, `sheetScrim`: texto a 20% no claro, preto a 48% no escuro. Texto sobre a sheet: texto 14,13:1 e texto secundário 5,45:1 no claro, 17,14:1 e 7,75:1 no escuro. No escuro a sheet fica em 1,10:1 sobre o fundo, abaixo do 1,15 que eu buscava; mantive #191715, e o realce do contorno de glass marca a borda de cima. O fundo de um chat é o cartão no modo claro e o fundo no escuro (veja Snuffle, abaixo).

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
| Destaque (tint) | Índigo 800 | Índigo 300 | Links, botões de texto, ícones de ação. O ícone do botão de Requests fica na cor do texto: o contador ao lado leva o Índigo |
| Botão tonal | Fundo secundário, texto na cor do texto | Fundo secundário, texto na cor do texto | Ações secundárias: Call e Directions na página da loja, Buy nas respostas que não são a melhor |
| Chip de filtro selecionado (`chipOn`) | Fundo cartão, texto Índigo 800 em semibold (8,75:1), uma borda de 1,5 pt em Índigo 800 (7,25:1 sobre o fundo) | Fundo cartão, texto Índigo 300 (8,60:1), uma borda de 1 pt em Índigo 300 | Filtro ativo e os chips de lugar e prazo. O fundo Índigo 100 que ele substituiu dava 1,03:1 sobre o fundo, mais claro que os chips brancos ao lado |
| Seleção tonal (`chipSelected`) | Fundo Índigo 100, texto Índigo 800 em semibold (7,45:1), uma borda de 1 pt em Índigo 200 (`chipSelectedEdge`) | Fundo Índigo 900, texto Índigo 200 (10,06:1), uma borda de 1 pt em Índigo 800 | O passo atual num cartão de compra, os polegares da sheet de avaliação, o controle segmentado e a ação do snackbar no Android |
| Linha selecionada | A linha mantém o fundo; um check e o título em Headline | O mesmo | Uma escolha numa lista: o lugar na sheet de localização, retirar ou entregar na sheet de detalhes |
| Contador (`count`) | Índigo 800, texto branco (8,75:1), um anel de 2 pt na cor do fundo | O mesmo | O botão de Requests e as respostas não lidas |
| Badge sobre foto | Fundo 100 do acento, texto 800, ponto 500 | Os valores do claro | Promoted (Pistache), New (Pêssego), Delivers (Manteiga) |
| Badge sobre wash | Fundo do cartão, texto na cor do texto | Fundo do cartão, texto na cor do texto | A página da loja, onde um badge pastel ficaria sobre outro pastel |
| Fundo do mapa | Manteiga 50 | Cartão #282523 | Placeholder do mapa atrás dos pinos |

O `filterSelected` (fundo na cor do texto) não é mais usado: um chip selecionado preto era a marca mais pesada do Nearby, então a seleção voltou para o Índigo tonal. Os badges mantêm os valores do claro no modo escuro porque ficam sobre fotos, que não mudam com o tema.

A primária preenche no máximo um controle por tela visível, a ação de confirmação; o enviar do compositor e os balões do comprador usam a mesma cor sem contar como esse botão ([revisão de telas](screen-review.md), verificações 8 e 19).

No modo escuro, o fundo do mapa era Manteiga 900, que parecia mostarda atrás dos pinos. É #282523, o passo do Stone do cartão escuro.

## Acentos das lojas

Cada loja tem um acento fixo, escolhido pelo tipo dela (`store/kinds.ts`), então ela aparece igual no Nearby, no chat, na página dela e no recibo. Padarias, lojas de ferragens, bancas, livrarias, bolsas e presentes são Manteiga; cafés e delis, câmeras, brinquedos, açougues e moda são Pêssego; óticas, floriculturas, farmácias e papelarias são Pistache. Nenhuma loja é Lavanda, que é do Snuffle.

| Token | Claro | Escuro | Onde |
| --- | --- | --- | --- |
| `shop.accent.<hue>.tile` | Passo de tile: Pêssego #FEC5B2, Pistache #C5DEAE, Manteiga #E7D48F, Lavanda #D7CCFE | Pêssego #602C1C, Pistache #2A4618, Manteiga #423717, Lavanda #3F3659 | O tile tonal, o cartão de categoria e o cabeçalho da tela de categoria, a página da loja, tingida por inteiro (o fundo do cartão atrás de todas as seções e o scroll edge da barra fixa), o cabeçalho do recibo |
| `shop.accent.<hue>.wash` | 100 | 900 | As listras claras do toldo no tile tonal |
| `shop.accent.<hue>.ink` | 800 | 200 | As iniciais e as listras escuras do toldo no tile |
| `shop.accent.<hue>.cardOnTile` | Card (branco) | Pêssego #624D47, Pistache #4B5646, Manteiga #595240, Lavanda #534F62 | As linhas de loja na tela de categoria |
| `mutedForegroundOnTile` | Texto secundário | Stone 840, #CECAC6 | A linha de detalhes e o chevron das linhas na tela de categoria |

Os passos 100 ficavam entre L 0,95 e 0,97, sobre um fundo em L 0,935, e mediam de 1,01 a 1,04:1 contra ele, então um tile parecia o próprio fundo. O passo de tile é definido pela luminosidade: OKLCH L 0,87 e C 0,07 no ângulo de cada matiz no modo claro, com a Manteiga em C 0,09 e matiz 95, para ler como amarelo e não como marca-texto. No modo escuro é L 0,36 e C 0,08, e os matizes ficam afastados para que as três cores de loja não virem um oliva só: Pêssego em 38, Manteiga em 90 e Pistache em 135. A Manteiga é mais calma que as outras duas, em L 0,34 e C 0,05: em L 0,36 e C 0,073 (#4C3B01) ela puxava para um cáqui amarronzado, e as linhas em Card Stone sobre ela pareciam sujas. A Lavanda continua em L 0,36, C 0,06. O recibo não tem mais a faixa de 4 pt em ink.

Contraste no passo de tile, claro / escuro:

| Matiz | Tile sobre o fundo | Texto | Texto secundário | Índigo 800 / 300 | Ink sobre o tile |
| --- | --- | --- | --- | --- | --- |
| Pêssego | 1,26:1 / 1,75:1 | 12,96:1 / 10,74:1 | 5,00:1 / 4,86:1 | 5,77:1 / 6,33:1 | 6,52:1 / 7,97:1 |
| Pistache | 1,20:1 / 1,86:1 | 13,51:1 / 10,13:1 | 5,21:1 / 4,58:1 | 6,01:1 / 5,97:1 | 6,43:1 / 7,99:1 |
| Manteiga | 1,22:1 / 1,67:1 | 13,31:1 / 11,24:1 | 5,13:1 / 5,08:1 | 5,92:1 / 6,62:1 | 6,53:1 / 8,43:1 |
| Lavanda | 1,25:1 / 1,76:1 | 13,07:1 / 10,69:1 | 5,04:1 / 4,83:1 | 5,82:1 / 6,30:1 | 6,59:1 / 7,93:1 |

Todo par de texto passa no AA. O texto passa no AAA; o texto secundário e o Índigo, não.

Na página da loja as linhas ficam sobre o tile em Card: branco nos tiles claros (1,45 a 1,52:1) e Stone #282523 nos escuros (Pêssego 1,36:1, Pistache 1,44:1, Manteiga 1,30:1), destacadas pela sombra delicada. Botões tonais sobre um tile não usam Muted, uma cápsula cinza que media 1,13 a 1,17:1 no claro e 1,08 a 1,20:1 no escuro e parecia uma mancha sobre o matiz. Eles usam `color.tonalOnTile` (branco) com `state.tonalOnTile`: 40% no claro (1,17 a 1,18:1 sobre o tile, texto sobre ele a 15,33:1 ou mais) e 6% no escuro (1,19 a 1,20:1, texto a 8,50:1 ou mais). As telas põem os botões em `<Ground value="tile">`.

### Linhas na tela de categoria

No modo escuro a tela de categoria mantém o tile inteiro como fundo, e as linhas em Card (#282523) ficavam mais escuras que o tile, então pareciam buracos na cor. As linhas passam a usar `shop.accent.<hue>.cardOnTile`: OKLCH L 0,44, C 0,03 no matiz do acento, mais claro que o tile e bem menos saturado, então a lista se destaca da cor sem competir com ela. O modo claro mantém as linhas em Card branco. A tela informa o acento com `<Ground value="tile" accent>`, e o `ShopRow` o lê.

O texto secundário (Stone 740) media 3,35 a 3,42:1 sobre os novos cartões, abaixo do AA. Baixar o cartão não resolve: no 1,2:1 que o cartão precisa sobre o tile, o Stone 740 ainda fica perto de 3,9:1. A linha de detalhes e o chevron usam `mutedForegroundOnTile`, o Stone 840 (#CECAC6, o matiz e o croma do Stone 740 em L 0,84). Valores no escuro:

| Matiz | Cartão sobre o tile | Cartão contra o tile | Texto | Texto secundário sobre o tile (Stone 840) | Stone 740, para comparar | Separador | Card #282523 contra o tile, antes |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Pêssego | #624D47 | 1,43:1 | 7,53:1 | 4,82:1 | 3,41:1 | 1,62:1 | 1,36:1, mais escuro |
| Pistache | #4B5646 | 1,37:1 | 7,40:1 | 4,74:1 | 3,35:1 | 1,65:1 | 1,44:1, mais escuro |
| Manteiga | #595240 | 1,51:1 | 7,44:1 | 4,76:1 | 3,36:1 | 1,64:1 | 1,30:1, mais escuro |
| Lavanda | #534F62 | 1,41:1 | 7,56:1 | 4,84:1 | 3,42:1 | 1,61:1 | 1,37:1, mais escuro |

Todo cartão fica 1,37:1 ou mais claro que o tile. Os chips de rua e o Voltar mantêm a camada `tonalOnTile`. O chip selecionado continua em Card com texto Índigo 300 (8,60:1): sobre o cartão tingido o Índigo 300 ficaria em 4,36 a 4,45:1, abaixo do AA. As linhas da página da loja não mudam; ela continua pondo linhas em Card sobre o tile.

## Snuffle

| Token | Claro | Escuro | Onde |
| --- | --- | --- | --- |
| `snuffle.bubble` | Passo de tile da Lavanda #D7CCFE | Lavanda 900 #302747 | Os balões do Snuffle, o indicador de digitação, a trilha da Live Activity |
| `snuffle.dot` | Lavanda 500 | Lavanda 400 | Pontos de digitação, o progresso da Live Activity |
| `chat.ground` | Cartão #FFFFFF | Fundo #0E0B09 | O fundo do New Request e de todo chat |
| `chat.fill` | Fundo #EEE9E2 | Cartão #282523 | Chips e linhas agrupadas sobre o fundo do chat |
| `chat.edge` | #DEDAD5 | #282523 | Um fio em volta dos cartões sobre o fundo do chat, com a sombra suave |

O balão fica em 1,50:1 sobre o fundo branco do chat e em 1,41:1 sobre o escuro; o texto nele fica em 13,07:1 e 13,36:1. O chat não tem tom roxo, degradê nem brilho (a [Identidade](../ideation/identity.md) descarta degradês roxos): a Lavanda aparece só nos balões do Snuffle. A marca é o glifo sozinho na cor do texto (veja [Marca](mark.md)); os tokens que a desenhavam sobre um tile Lavanda com rosto Manteiga saíram.

A sombra suave do cartão tem duas camadas da cor do texto (claro): 0 1 2 a 4% e 0 4 12 a 5%. Ela separa as linhas em cartão de um fundo da mesma cor (a página da loja) e os cartões do fundo branco do chat.

## Papéis semânticos

Cada papel reaproveita uma escala ou o caminho do cinza (Biscuit no modo claro, Stone no escuro). O contraste é medido com a fórmula do WCAG 2 contra o fundo (#EEE9E2 ou #0E0B09) e o cartão (#FFFFFF ou #282523).

| Papel | Claro | Escuro | Contraste, claro / escuro | Onde |
| --- | --- | --- | --- | --- |
| Borda | #D4D0CB, L 0,86 | #403D3A, L 0,36 | 1,27:1 sobre o fundo, 1,53:1 sobre o cartão / 1,82:1, 1,41:1 | Um cartão sobre uma área carregada, campos de texto |
| Separador | #DEDAD5, L 0,89 | #353230, L 0,32 | 1,15:1, 1,39:1 / 1,54:1, 1,20:1 | Linhas de 1 px entre as linhas de uma lista, recuadas até o texto |
| Borda, Aumentar Contraste | #857F79, L 0,60 | #74716D, L 0,55 | 3,28:1, 3,96:1 / 4,04:1, 3,14:1 | Todo cartão, balão e campo ganha uma borda de 1 px quando o Aumentar Contraste (iOS) ou o texto de alto contraste (Android) está ligado |
| Destrutivo | Fundo #BA2B28, rótulo branco | Fundo #F07F77, rótulo preto | Rótulo 6,06:1 / 8,01:1; como texto, 5,02:1 sobre o fundo, 6,06:1 sobre o cartão / 7,48:1, 5,81:1 | Cancel for a refund e qualquer ação que não dá para desfazer |
| Aviso | Manteiga 700 #6F5C1A | Manteiga 300 #D2C49A | 5,40:1, 6,52:1 / 11,31:1, 8,78:1 | O ícone de aviso em "Not confirmed · not charged" e "Sold · not charged" |
| Sucesso | Pistache 700 #4D682A | Pistache 300 #B8CDA1 | 5,22:1, 6,31:1 / 11,48:1, 8,91:1 | O ícone de check em Ready, Paid e Collected |
| Scrim | Preto a 40% | Preto a 40% | Não é texto | Atrás de sheets e diálogos próprios; um degradê de 0 a 40% sob badges ou botões de glass sobre uma foto |
| Desativado | Conteúdo: texto a 38% (#8D8884) sobre um contêiner de texto a 12% (#D9D5D1) | Conteúdo #797876 sobre contêiner #2A2826 | 2,40:1 / 3,33:1 | Botões e campos que ainda não podem ser usados |

O destrutivo parte do vermelho do sistema no iOS. O #FF3B30 leva um rótulo branco a só 3,55:1, então foi movido em OKLCH para L 0,52 no matiz 27, o que o mantém vermelho ao lado do Pêssego e passa de 4,5:1. No modo escuro ele segue o Índigo: fundo claro com rótulo preto. Aviso e sucesso ficam nas escalas de Manteiga e Pistache que os badges já usam, e vêm sempre com um ícone e um rótulo, nunca só com a cor.

O conteúdo desativado está isento do mínimo do WCAG 1.4.3, como todo controle inativo; sobre um cartão, os valores são #92908E sobre #E2E2E1 no modo claro e #888684 sobre #413F3D no escuro. Só com o scrim, um texto branco sobre uma foto branca ficaria em 2,85:1, então um texto nunca fica sobre uma foto só com o scrim; os badges têm o próprio fundo.

## Getting started

Getting started é o único lugar em que o Índigo ocupa a tela. Cada uma das três páginas vai de borda a borda num passo próprio da escala, e o passo fica mais fundo a cada página, então as páginas se leem como uma sequência que caminha para a cor de compromisso. O modo escuro percorre a escala no sentido contrário, do passo mais escuro para cima. Enquanto o comprador arrasta, o fundo passa de um passo para o outro sob o dedo.

| Página | Fundo claro | Foreground sobre ele | Fundo escuro | Foreground sobre ele |
| --- | --- | --- | --- | --- |
| 1, Ask for anything nearby | Índigo 300 #B5BFFF | 11,11:1 | Índigo 900 #222169 | 13,52:1 |
| 2, Snuffle asks the shops for you | Índigo 400 #96A2FF | 8,34:1 | Índigo 800 #3D35B8 | 8,39:1 |
| 3, Buy, then collect when it suits you | Índigo 500 #7982FF | 6,04:1 | Índigo 700 #494AC0 | 6,66:1 |

Título, corpo, Skip e o ponto da página atual ficam em Foreground (#100A06 no claro, #FBFAF8 no escuro). Um texto Muted cairia abaixo de 4,5:1 nesses passos, então o corpo também é Foreground e os estilos de tipo fazem a hierarquia. Continue é uma cápsula em Foreground com rótulo em Background (16,28:1 no claro, 18,81:1 no escuro), para se destacar em qualquer passo. Os outros pontos ficam em Foreground a 35% (`state.pageDotOff`) e tomam a cor do fundo: 1,93 a 2,16:1 nos passos claros e 2,15 a 2,90:1 nos escuros, com o ponto atual a 3,10:1 ou mais contra eles. A 30% mediam 1,75 a 2,49:1 e quase sumiam no Índigo 500 e no 700. Os tokens são `color.welcome.ground1` a `ground3`. Texto branco sobre Índigo 500 daria 3,26:1 e texto em Índigo 900 daria 4,33:1, por isso a página 3 para no 500 no modo claro.

## Contraste

| Par | Claro | Escuro |
| --- | --- | --- |
| Texto sobre o fundo | 16,28:1 | 18,81:1 |
| Texto secundário sobre o fundo | 6,28:1 | 8,50:1 |
| Texto secundário sobre cartão | 7,58:1 | 6,60:1 |
| Cartão sobre o fundo | 1,21:1 | 1,29:1 |
| Rótulo sobre a primária | 8,75:1 | 11,11:1 |
| Destaque sobre o fundo | 7,25:1 | 11,08:1 |
| Texto do chip selecionado sobre o fundo cartão | 8,75:1 | 8,60:1 |
| Texto da seleção tonal sobre o fundo dela | 7,45:1 | 10,06:1 |
| Texto do badge sobre o fundo dele | 7,45 a 8,42:1 | 7,45 a 8,42:1 (valores do claro) |
| Balão do Snuffle sobre o fundo do chat | 1,50:1 | 1,41:1 |
| Sheet sobre o fundo | 1,15:1 | 1,10:1 |
| Linhas sobre a sheet (cartão no claro, secundário no escuro) | 1,39:1 | 1,40:1 |
| Texto sobre a sheet | 14,13:1 | 17,14:1 |
| Texto secundário sobre a sheet | 5,45:1 | 7,75:1 |

Todo par de texto passa no WCAG AA. Todos, exceto texto secundário sobre superfície secundária (5,87:1 no claro, 5,51:1 no escuro), texto secundário sobre o fundo claro (6,28:1) e as cores de destrutivo, aviso e sucesso sobre o fundo claro (5,02 a 5,40:1), passam no AAA. A borda do Aumentar Contraste passa dos 3:1 que o WCAG 1.4.11 pede para o limite de um componente (3,28:1 e 3,14:1 no mínimo). Pares de superfície não são texto e não têm mínimo no WCAG; 1,21:1 é o passo do cartão sobre o novo fundo, acima dos 1,13:1 de antes.

## Fontes

- [Identidade](../ideation/identity.md), rodadas 5 a 9 no quadro.
- Decisões 034, 036, 045 e 048 no [registro de decisões](../../decision-log.md); change do OpenSpec `craft-pass-2`.
