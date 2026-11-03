# Design system

As fundações do app do comprador, escritas como a referência a partir da qual as telas são construídas. Só entra aqui o que está decidido; as explorações ficam na Ideação até eu escolher, e cada fundação aponta para o quadro de onde veio.

```summary
Takeaways:
- A tipografia está definida: Gambetta 700 no display em quatro lugares, Switzer em tudo o que o comprador lê, sobre os estilos de texto da Apple com os papéis correspondentes do Material 3.
- A marca é provisória: um retriever cuja boca é o toldo de uma loja, em dois tons.
- A cor está decidida (decisão 036, rodada 9): o Cinza biscoito é o neutro e os acentos são a Pastel parade com Índigo; o fundo claro é L 0,96 com o croma da rodada 8 (#F4F1ED), e o modo escuro mantém as superfícies da rodada 8. Os papéis semânticos (borda, separador, destrutivo, aviso, sucesso, scrim, desativado) estão definidos nos dois modos.
- Espaçamento, tags e imagens são provisórios (decisão 041): uma escala de espaçamento de 4 pt e um grid de uma coluna, cinco tipos de tag, proporções de imagem e um conjunto de ícones, o HugeIcons (decisão 042). Uma revisão de quinze itens verifica cada tela contra eles.
Call:
- Defini a regra de entrada: uma fundação precisa de uma decisão do registro por trás, e os valores vêm da última rodada do quadro de ideação, nunca redigitados de memória.
- Pedi que cada fundação partisse do iOS e ampliasse para o Material 3, como na decisão 021, e que a paleta fosse registrada aqui depois que eu a escolhesse.
AI:
- Um agente levou a especificação tipográfica da rodada 4 e as cores da rodada 9 do quadro de ideação para estas páginas. Eu escolhi as fontes e as regras nas decisões 027 a 029.
Trade-offs:
- A cor foi definida antes de qualquer tela em acabamento final, então os papéis podem mudar quando o protótipo os puser à prova.
```

## Fundações

| Fundação | Situação | Fonte |
| --- | --- | --- |
| [Modelo conceitual](conceptual-model.md) | Definido (decisão 039): quatro objetos (pedido, loja, resposta, compra), seus verbos, rótulos de status e palavras | [App flow](../ideation/app-flow.md), [achados da netnografia](../../discover/netnography/findings.md) |
| [Componentes](components.md) | Provisório (decisão 043): especificação de cada componente que as telas usam, com as formas no iOS e no Android | Revisão de design da v7 |
| [Estados e elevação](states.md) | Provisório (decisão 043): estados de interação, elevação, estados vazios, de carregamento e de erro | Revisão de design da v7 |
| [iOS e Android](platforms.md) | Provisório (decisão 043): no que cada elemento vira em cada plataforma, haptics incluídos | Revisão de design da v7 |
| [Conteúdo e voz](content.md) | Provisório (decisão 043): a voz do Snuffle, o padrão de erro, formatos do Reino Unido | Revisão de design da v7 |
| [Tipografia](typography.md) | Definida (decisões 027, 028, 029) | [Escala tipográfica](../ideation/type-scale.md), rodada 4 |
| [Cor](colour.md) | Definida. Neutro: Cinza biscoito (decisão 034). Acentos escolhidos: Pastel parade com Índigo, sobre o Cinza biscoito no claro e no escuro, sem bordas (decisão 036). Fundo claro L 0,96 com o croma da rodada 8, #F4F1ED (rodada 9); escuro como na rodada 8. Papéis semânticos com contrastes nos dois modos | [Identidade](../ideation/identity.md) |
| [Marca](mark.md) | Provisória (decisão 033): um retriever com um toldo no lugar da boca, desenhado à mão no Figma | [Identidade](../ideation/identity.md) |
| [Forma e materiais](shape.md) | Provisório (decisão 040): seis raios da escala do Material 3, cantos concêntricos, Liquid Glass só em controles flutuantes | Pesquisa da decisão 040 |
| [Movimento](motion.md) | Provisório (decisão 040): seis molas com valores para iOS e Material 3, regras de resposta, interrupção e Reduzir Movimento | Pesquisa da decisão 040 |
| [Espaçamento e layout](spacing.md) | Provisório (decisão 041): oito tokens de espaçamento numa base de 4 pt, espaços semânticos, uma coluna de conteúdo com margens de 16/20 e larguras de tile por fórmula | Pesquisa da decisão 041 |
| [Tags](tags.md) | Provisório (decisão 041): chips de filtro e de sugestão, rótulos de status, badges e contadores, com regras de tamanho e cor | Pesquisa da decisão 041 |
| [Imagens e ícones](imagery.md) | Provisório (decisões 041 e 042): HugeIcons Stroke Rounded com um mapa de ícones, proporções e tamanhos de imagem, regras para fotos e para o mapa; o placeholder sem foto é uma proposta não testada | Pesquisa da decisão 041 |
| [Ilustrações](illustrations.md) | Decidido (decisão 042): objetos 3D modelados em código, com contorno e sombras sólidas, num visualizador | Imagens de referência do autor |
| [Revisão de telas](screen-review.md) | Provisório (decisão 041): quinze verificações que um agente aplica em toda tela | Pesquisa da decisão 041 |
