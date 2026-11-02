# Marca

O ícone do app por enquanto: um terrier cuja boca é o toldo de uma loja. Eu o desenhei à mão no Figma a partir dos testes de ícone do agente e o escolhi como a primeira decisão de identidade. Ele é provisório: a linha está definida, o desenho e as cores não, então ele aparece aqui em preto e branco.

```summary
Takeaways:
- O rosto de um terrier com orelhas dobradas e baixas e dois olhos em ponto. A boca é um toldo listrado, como os que ficam sobre as vitrines, com o nariz apoiado nele.
- Dois tons: um de mais contraste para o rosto e três das listras, e um de menos contraste para as outras duas. Em preto e branco, são o preto e um cinza médio.
- O agente reconstruiu meu desenho sobre um eixo de simetria só, centralizou-o oticamente e o aplicou aos formatos de ícone do iOS e do Android: claro, escuro e tingido no iOS, adaptável e temático no Android.
Call:
- Provisória (decisão 033). Em preto e branco até a paleta ser escolhida.
AI:
- Um agente desenhou os testes de ícone em SVG a partir das minhas sementes (um cão farejador, as compras britânicas, os toldos da parade). Levei os dois primeiros para o Figma e mudei os vetores à mão. O agente exportou a minha versão, reconstruiu-a sobre um eixo só e desenhou as aplicações nas plataformas; ele só mudou proporções onde o desenho estava fora de centro.
Trade-offs:
- No Android o desenho precisa caber numa zona segura de 66 dp, então ele ocupa cerca de metade da largura do ícone e as listras ficam finas em tamanhos pequenos. Uma versão mais simples para tamanhos pequenos continua em aberto.
```

<div class="marks">
<figure><img src="../../../develop/design-system/img/mark-glyph.svg" alt="A marca em preto e cinza, sem a base" width="256" height="192"><figcaption>Sobre branco</figcaption></figure>
<figure><img src="../../../develop/design-system/img/mark-glyph-white.svg" alt="A marca em branco e cinza sobre preto" width="256" height="192"><figcaption>Sobre preto</figcaption></figure>
</div>

## Dos testes à marca

<div class="marks wide">
<figure><img src="../../../develop/design-system/img/mark-figma-board.png" alt="Quatro ícones num quadro do Figma: dois testes do agente, uma seta e duas versões desenhadas à mão" width="1161" height="300"><figcaption>Meu quadro no Figma. À esquerda da seta, os testes de ícone 1 e 2 do agente. À direita, as minhas duas versões; escolhi a última.</figcaption></figure>
</div>

Nos testes do agente, o toldo da parade era uma barra atravessando o rosto, com listras penduradas e dois traços como sobrancelhas. No Figma, eu mesmo mudei os vetores:

| Mudança | Ponto de partida |
| --- | --- |
| Tirei a barra de cima do toldo, então as listras começam logo abaixo do nariz | Testes 1 e 2; com a barra, as listras pareciam dentes |
| Troquei as sobrancelhas por dois olhos em ponto | Os traços dos testes 1 e 2 |
| Mantive as orelhas baixas e dobradas | Teste 2; minha primeira versão tinha orelhas em pé, como o teste 1 |
| Apoiei o nariz no toldo | Nos testes o nariz ficava sobre a barra |
| Mantive dois tons nas listras | As listras alternadas dos testes |

## Refinamento

O agente reconstruiu o desenho a partir dos vetores do Figma sem mudar as formas:

| Mudança | Desenho no Figma | Reconstruído |
| --- | --- | --- |
| Eixo de simetria | Três centros: olhos e nariz em 85,0, orelhas em 85,3, toldo em 85,65 (de 168) | Um eixo só para todas as partes; a orelha direita é o espelho da esquerda |
| Listras | Cinco listras de 17 unidades, com um degrau de 0,3 entre a segunda e a terceira | Cinco listras de exatamente 17 unidades |
| Posição | Desenho centralizado 2,5 unidades abaixo do centro da base e 1,3 à direita | Centralizado na horizontal e 4 unidades acima do centro, porque o toldo deixa o desenho pesado embaixo |

<div class="marks">
<figure><img src="../../../develop/design-system/img/mark-grid.svg" alt="A marca sobre um grid de construção com eixo, centro ótico e círculo de conteúdo" width="336" height="336"><figcaption>Grid de 8 unidades sobre uma base de 168. Vermelho: as linhas de centro da base. Azul tracejado: o centro ótico do desenho. Círculo cinza: 80% da base.</figcaption></figure>
</div>

## iOS

A Apple pede uma imagem quadrada de 1024 px; o sistema aplica a máscara arredondada, então a arte não tem cantos nem sombra próprios. Desde o iOS 18, um ícone também pode ter uma versão escura e uma tingida: a escura mantém o desenho claro sobre fundo escuro, e a tingida é em tons de cinza, que o sistema colore com o tom escolhido pela pessoa.

<div class="marks">
<figure><img src="../../../develop/design-system/img/mark-ios-light.svg" alt="Ícone do iOS, claro" width="168" height="168"><figcaption>Claro</figcaption></figure>
<figure><img src="../../../develop/design-system/img/mark-ios-dark.svg" alt="Ícone do iOS, escuro" width="168" height="168"><figcaption>Escuro</figcaption></figure>
<figure><img src="../../../develop/design-system/img/mark-ios-tinted.svg" alt="Ícone do iOS, tingido" width="168" height="168"><figcaption>Tingido, em tons de cinza</figcaption></figure>
</div>

## Android

Um ícone adaptável tem duas camadas de 108 dp. Os launchers mostram os 72 dp do meio através da própria máscara (círculo, squircle, quadrado arredondado) e podem mover as camadas, então o desenho fica dentro de uma zona segura de 66 dp. Desde o Android 13, uma camada monocromática deixa o launcher aplicar ao ícone as cores do papel de parede; o segundo tom vira uma transparência mais clara da mesma cor.

<div class="marks">
<figure><img src="../../../develop/design-system/img/mark-android-layers.svg" alt="Ícone adaptável do Android em 108 dp, com a área visível e a zona segura" width="216" height="216"><figcaption>Base de 108 dp. Azul: área visível de 72 dp. Vermelho tracejado: zona segura de 66 dp.</figcaption></figure>
<figure><img src="../../../develop/design-system/img/mark-android-circle.svg" alt="Ícone do Android com máscara circular" width="144" height="144"><figcaption>Máscara circular</figcaption></figure>
<figure><img src="../../../develop/design-system/img/mark-android-themed.svg" alt="Ícone temático do Android" width="144" height="144"><figcaption>Temático, camada monocromática</figcaption></figure>
</div>

## Anatomia

| Parte | Forma | Tom |
| --- | --- | --- |
| Orelhas | Duas orelhas dobradas, baixas na cabeça, espelhadas | Mais contraste |
| Olhos | Dois pontos, a 15 unidades de cada lado do eixo | Mais contraste |
| Nariz | Um oval apoiado no toldo | Mais contraste |
| Toldo | Cinco listras de 17 unidades com pontas arredondadas, as duas de fora com um canto de cima arredondado | Listras 1, 3 e 5 com mais contraste; 2 e 4 com menos contraste |

Na versão do Figma, os tons eram Brew #5A3E2B e #AFA085 sobre Oat #E9DCC3. Eles voltam quando a paleta for escolhida.

## Em aberto

- Uma versão mais simples para tamanhos abaixo de uns 29 pt.
- As cores, que seguem a paleta quando eu escolher uma.
- O nome.
