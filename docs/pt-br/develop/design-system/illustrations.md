# Ilustrações

O Getting Started, a splash e os ícones grandes usam pequenos objetos 3D modelados em código a partir de caixas, cilindros, esferas e cápsulas. Eles são desenhados como uma ilustração técnica, com as cores da paleta em dois tons chapados, uma única espessura de linha para toda aresta e uma sombra projetada chapada, e um visualizador nesta página mostra cada um de qualquer câmera.

```summary
Takeaways:
- Cada objeto é montado em código a partir de poucos sólidos simples, então mudar uma cor, uma proporção ou uma peça é editar um arquivo.
- Cada superfície tem dois tons chapados. O tom iluminado é a cor da paleta; o tom de sombra é essa cor escurecida e misturada a uma versão escura do fundo, então um objeto sobre um fundo verde tem sombra esverdeada e sobre um fundo lavanda, sombra lavanda.
- Os contornos são encontrados na imagem renderizada, em vez de desenhados peça por peça. Onde duas peças se tocam ou uma esconde a outra, sai uma linha só, com a mesma espessura em qualquer zoom.
- As cenas são uma loja em duas variantes, uma esquina de rua comercial de Londres e um cruzamento maior; os objetos são uma cesta, uma scooter de entrega com um entregador e uma caixa de entrega. Na entrada, as peças caem uma depois da outra; os toldos e a scooter se mexem um pouco em repouso.
Call:
- Pedi um estilo de ilustração 3D para o Getting Started, a splash e os ícones grandes: formas simples modeladas em código, cores da paleta, contornos técnicos finos e sombras sólidas no estilo cel, e um visualizador para ajustá-las (decisão 042).
- Nesta rodada pedi linhas limpas onde as peças se encontram (sem anéis duplicados, sem segmentos soltos, nada afundado numa parede), um visual de desenho técnico em vez de desenho animado, sombreamento que acompanha a cor do fundo, formas mais simples que ainda se leem entre 64 e 120 px, uma nova esquina de rua comercial e um visualizador organizado como o Figma, com ferramentas que de fato movem o objeto.
- Na terceira rodada pedi painéis laterais que se recolhem (a barra lateral da documentação e os dois painéis do visualizador), os controles de visualização nos cantos da área de visualização, uma revisão do toldo da loja, uma cena de cruzamento, mobiliário urbano de Londres e uma correção para objetos que piscavam ao pousar.
- Mantive duas variantes da loja lado a lado para escolher depois: a ordem clássica, com o letreiro da fachada acima do toldo, e uma só com o toldo.
- O estilo é provisório até os objetos serem vistos no tamanho real no protótipo.
AI:
- Um agente refez a renderização dos contornos, o sombreamento e o visualizador, simplificou os quatro objetos que já existiam e modelou a esquina a partir das minhas notas e de capturas de tela ampliadas dos problemas. Eu reviso cada objeto no visualizador e decido o que muda.
- Na terceira rodada um agente comparou a loja com a versão anterior, refez o toldo a partir dela (sete listras, uma caixa do rolo, uma borda recortada em ondas), modelou o cruzamento e os prédios de loja de Londres, e rastreou o piscar: uma etiqueta ou uma faixa apoiada numa peça que se achatava era engolida por essa peça durante alguns quadros. Outro agente modelou o mobiliário urbano como objetos separados.
Trade-offs:
- Os contornos em espaço de tela pedem uma segunda renderização da cena a cada quadro (ids dos objetos, direções das superfícies e profundidade) e duas passadas de tela cheia. O agente mediu cerca de 10 ms por quadro em densidade 2x num notebook M1, dentro dos 16 ms que um quadro a 60 fps permite.
- As sombras são projetadas chapadas no chão, então um objeto nunca faz sombra em si mesmo; o tom de sombra nas faces viradas para longe da luz cumpre esse papel. Na esquina a sombra fica na altura da calçada, então onde ela passa para a rua, mais baixa, fica alguns centímetros acima.
- O visualizador carrega o three.js de uma CDN, então precisa de conexão; o app usaria imagens renderizadas, não o visualizador.
- As cenas de rua juntam por cor as peças fixas de cada prédio e de cada item do mobiliário, então o cruzamento desenha cerca de 230 malhas em vez de 500. Onde duas peças juntadas da mesma cor se tocam, não sai linha entre elas.
```

## Regras de estilo

| Regra | Na prática |
| --- | --- |
| Formas simples | Poucas caixas, cilindros, esferas, cápsulas e perfis extrudados, todos grandes. Poucas peças pequenas e quase nenhum chanfro arredondado, para que cada objeto ainda se leia entre 64 e 120 px |
| Só cores da paleta | Os preenchimentos vêm das rampas de [cor](colour.md): tons claros para superfícies grandes, de 500 a 900 para detalhes pequenos |
| Dois tons por superfície | Faces iluminadas mostram a cor da paleta. Faces viradas para longe da luz mostram a cor × 0,56 × um tom ambiente, misturada 36% ao tom escuro do fundo. O tom ambiente é o matiz do fundo; o tom escuro é o passo 800 da rampa dele (900 no Indigo 800), quase preto no Biscuit e índigo 900 nos fundos escuros |
| Contornos em espaço de tela | Depois que a cena é desenhada, uma passada compara o objeto, a direção da superfície e a profundidade de cada pixel com as dos vizinhos. Aparece uma linha na silhueta, onde duas peças se encontram e onde duas faces de uma mesma peça se encontram a 35° ou mais. As linhas são quase pretas, #1a1714, com cerca de 1,25 px e a mesma espessura em qualquer zoom; MSAA e FXAA deixam as curvas suaves |
| Peças apoiadas nas superfícies | Uma peça encosta na superfície a que pertence em vez de afundar nela, e nenhuma face visível divide o mesmo plano com outra, então nada pisca onde elas se encontram |
| Sombra sólida | Uma luz, vinda do alto à esquerda a menos que seja movida no visualizador. A sombra é uma forma chapada no chão, no próprio tom de sombra do fundo; num objeto com chão próprio, como a esquina, ela escurece esse chão pela mesma regra |
| Vista isométrica | Os objetos aparecem no ângulo isométrico exato (35,264° de elevação, 45° de giro); o visualizador também oferece câmeras ortográfica livre e em perspectiva |
| Movimento | Na entrada, as peças caem em ordem e pousam com um leve achatamento. Uma peça apoiada em outra se achata junto com ela, então nada afunda na peça de baixo; as lajes do chão caem sem se achatar. O movimento em repouso é discreto. Com Reduzir Movimento, o objeto aparece completo e fica parado |

Duas referências moldaram essas regras. Gooch, Gooch, Shirley e Cohen ("A non-photorealistic lighting model for automatic technical illustration", SIGGRAPH 1998) sombreiam deslocando o matiz em vez de escurecer em direção ao preto, e contornam silhuetas e vincos; aqui quem dá o matiz é o fundo. Saito e Takahashi ("Comprehensible rendering of 3-D shapes", SIGGRAPH 1990) encontram os contornos a partir de descontinuidades em imagens de profundidade e de normais da cena; a passada de contorno faz o mesmo, com um id de objeto a mais. Colorir as sombras com a paleta da cena em vez de deixá-las cinza também é comum na ilustração chapada e em jogos como Monument Valley.

## Visualizador

Os objetos ficam listados à esquerda e os ajustes da cena à direita: repetir a entrada, contornos, sombras, grade, giro automático, fundo, e ângulo e altura da luz. Cada painel tem no cabeçalho um botão que o esconde, e [ e ] fazem o mesmo; com o painel de objetos escondido, o título da página flutua no canto superior esquerdo e leva o botão que traz o painel de volta. A barra lateral da documentação se recolhe do mesmo jeito, pelo botão à esquerda da barra superior ou com ⌘\ (Ctrl+\). O visualizador e o site lembram dessas escolhas.

Os cantos da área de visualização guardam os controles. No canto inferior esquerdo ficam as ferramentas: Orbitar (O), Mover (H, ou segurar Espaço) e Zoom (Z), além de Redefinir vista (R); arrastar o mouse usa a ferramenta escolhida, arrastar com o botão direito move e a roda dá zoom. No canto inferior direito, a câmera (isométrica, ortográfica, perspectiva) fica ao lado do controle de zoom: −, o nível de zoom (que volta a 100%), + e Ajustar à tela (Shift+1). Quadros por segundo e tempo por quadro ficam no canto superior direito. Na vista isométrica, Orbitar gira o objeto, para que a câmera mantenha o ângulo exato. No celular, os dois painéis viram botões no canto superior direito.

## Objetos

| Objeto | Peças | Em repouso |
| --- | --- | --- |
| Loja | Uma fachada de loja britânica na ordem clássica, de cima para baixo: cornija, letreiro da fachada, a caixa do rolo do toldo e, sobre a vitrine, um toldo listrado com a borda recortada em ondas. Pilastras emolduram a frente e um rodapé sustenta a vitrine; uma porta com degrau, uma janela lateral, um vaso com planta, uma laje de telhado e uma chaminé | A borda recortada balança um pouco |
| Loja, sem letreiro | A mesma loja sem o letreiro: a caixa do rolo ocupa o lugar dele, então o toldo fica mais alto e faz o papel de letreiro | A borda recortada balança um pouco |
| Esquina de rua comercial | Cinco lojas de Londres num quarteirão: letreiros pintados, andares de cima em tijolo amarelo, tijolo vermelho ou estuque com janelas de guilhotina, uma loja de roupas com um manequim numa vitrine recuada e um café com mesa e lousa. Uma calçada elevada com meio-fio, uma faixa de pedestres com faróis Belisha, tracejado no meio da rua, linhas amarelas duplas, um poste de luz, uma cabine telefônica K6, uma caixa de correio, uma lixeira, um banco e um plátano | Na entrada o chão pousa primeiro, as lojas caem uma depois da outra e depois o mobiliário urbano; em repouso os toldos se mexem muito de leve |
| Cruzamento | Duas ruas comerciais que se cruzam, quatro quarteirões em volta do cruzamento com duas a quatro lojas cada e um pequeno jardim atrás. Calçadas com meio-fio nas quatro esquinas, uma faixa de pedestres com faróis Belisha em cada braço, tracejado no meio da rua, linhas de dar a preferência e linhas amarelas duplas; postes de luz, uma cabine telefônica, uma caixa de correio, um ponto de ônibus, lixeiras, bancos, plátanos, uma loja de roupas com manequim, um café e uma sorveteria com mesas na calçada. O quarteirão mais perto da câmera é baixo para que o cruzamento continue à vista | Na entrada o chão e a sinalização pousam, os quatro quarteirões caem um depois do outro e depois o mobiliário; em repouso os toldos se mexem muito de leve |
| Cesta | Corpo em caixa com uma faixa e uma borda, alça em arco, um pão, uma garrafa e uma maçã | Parada |
| Scooter de entrega | Rodas, carenagem, escudo das pernas, banco, guidão, um baú no bagageiro, um entregador com capacete redondo e sem rosto, dois riscos de vento | As rodas giram, a scooter balança, os riscos passam |
| Caixa de entrega | Uma caixa grande com fita adesiva e etiqueta de envio, e uma caixa menor em cima, de lado | Parada |
