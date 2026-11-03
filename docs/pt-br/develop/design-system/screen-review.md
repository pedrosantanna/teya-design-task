# Revisão de telas

As dezessete verificações por que passa toda tela, seja wireframe ou protótipo. Um agente as aplica em todas as telas, olhando a tela renderizada, e relata o que falha, tela por tela. As verificações cobrem agrupamento e hierarquia, o modelo conceitual e suas palavras, os tokens das outras páginas do design system e as diretrizes da Apple primeiro, depois as do Material.

```summary
Takeaways:
- Dezessete verificações sob cinco títulos: Gestalt, hierarquia, arquitetura da informação, modelo e palavras, acessibilidade.
- Cada verificação tem um critério que dá para medir na tela: um espaço em tokens, uma contagem de tamanhos ou ações, uma palavra da tabela de Palavras.
- O agente revisa a tela renderizada, não o código, e relata as falhas por tela, para eu corrigir ou registrar por que uma fica.
Call:
- Pedi que cada tela fosse verificada contra Gestalt e arquitetura de informação, visualmente, por um agente no fluxo de trabalho (decisão 041).
- Mantive as verificações provisórias; elas serão ajustadas conforme o protótipo mostrar quais pegam problemas de fato.
AI:
- Um agente pesquisou o NN/g sobre Gestalt, hierarquia visual e revelação progressiva, o Laws of UX sobre a lei de Hick, e Rosenfeld, Morville e Arango e Covert sobre arquitetura da informação, e propôs a lista. Eu pedi que toda tela fosse verificada contra o design system.
Trade-offs:
- Contagens fixas (três tamanhos de texto, cinco chips) são fáceis de verificar e podem acusar uma tela que funciona; uma falha é um aviso para olhar, e eu decido se ela fica.
```

## Gestalt

| # | Verificação | Passa quando |
| --- | --- | --- |
| 1 | Proximidade | Itens de um grupo ficam a 4–12 um do outro, grupos a pelo menos 24, seções a 32, e todo espaço é um valor `space.*`; na conversa, 12 entre os balões de um remetente e 24 na troca de remetente |
| 2 | Proximidade dos títulos | Cada título fica pelo menos duas vezes mais perto do seu conteúdo que da seção anterior |
| 3 | Região comum | Um cartão ou sheet só aparece onde o espaçamento não separa; nada de cartão dentro de cartão. Roda no claro e no escuro: um contêiner agrupado pode sumir contra o fundo escuro |
| 4 | Semelhança | Um objeto tem a mesma aparência em todo lugar (uma loja é um tile em Nearby e uma linha no resto) |
| 5 | Continuidade e alinhamento | Tudo fica na linha da margem ou num recuo; o primeiro item de um carrossel se alinha com o título |
| 6 | Figura e fundo | Glass só em controles flutuantes; texto sobre foto passa 4,5:1 com o scrim |
| 7 | Barras | Tudo o que rola sob a barra de status, a barra de navegação ou a barra de pedido ganha um fundo de borda de rolagem |

## Hierarquia

| # | Verificação | Passa quando |
| --- | --- | --- |
| 8 | Hierarquia visual | No máximo três tamanhos de texto por bloco e quatro por tela, sem contar a barra de navegação e a interface do sistema; um botão principal preenchido (Índigo) visível ao mesmo tempo. O enviar do compositor e os balões do comprador também são Índigo e não contam |
| 9 | Lei de Hick | No máximo 5 chips de filtro ou 3 sugestões visíveis; uma sheet tem no máximo 2 ações mais Cancel |

## Arquitetura da informação

| # | Verificação | Passa quando |
| --- | --- | --- |
| 10 | Revelação progressiva | O detalhe fica no máximo dois níveis abaixo (cartão, depois sheet ou página); preço e status ficam no primeiro nível |
| 11 | Findability | O comprador sabe onde está (o título da barra de navegação, ou o título grande de Nearby na home, que não tem abas), e toda lista pode ser filtrada pelos estados que mostra |

## Modelo e palavras

| # | Verificação | Passa quando |
| --- | --- | --- |
| 12 | Rótulos | Toda palavra vem da tabela de Palavras do [modelo conceitual](conceptual-model.md); nenhum sinônimo evitado |
| 13 | Rótulos de status | Um rótulo de status por cartão ou linha, exatamente como na tabela de estados |

## Acessibilidade

| # | Verificação | Passa quando |
| --- | --- | --- |
| 14 | Tamanho dos alvos | Todo alvo tem pelo menos 44 pt (48 dp), com pelo menos 8 entre alvos |
| 15 | Áreas seguras | Nada importante sob a Dynamic Island, o indicador de início ou a barra de pedido; o último item fica a 48 da barra de pedido |
| 16 | Extensão da rolagem | O conteúdo não rola além do último item mais do que o espaço livre da barra de pedido |
| 17 | Cor e imagens | A cor nunca é o único sinal; toda imagem tem rótulo ou fica oculta |

Os relatos citam as verificações pelo número. Os tokens estão em [Espaçamento e layout](spacing.md), [Tags](tags.md), [Imagens e ícones](imagery.md), [Forma e materiais](shape.md) e [Cor](colour.md).

## Fontes

- Harley, "The Principle of Proximity in Visual Design", NN/g, 2020: https://www.nngroup.com/articles/gestalt-proximity/
- Harley, "The Principle of Common Region", NN/g, 2020: https://www.nngroup.com/articles/common-region/
- Gordon, "Visual Hierarchy in UX", NN/g, 2021 (no máximo três tamanhos): https://www.nngroup.com/articles/visual-hierarchy-ux-definition/
- Nielsen, "Progressive Disclosure", NN/g, 2006 (mais de dois níveis costuma ter usabilidade baixa): https://www.nngroup.com/articles/progressive-disclosure/
- Laws of UX, lei de Hick: https://lawsofux.com/hicks-law/
- Rosenfeld, Morville e Arango, *Information Architecture*, 4ª edição, O'Reilly, 2015
- Covert, *How to Make Sense of Any Mess*, 2014
- Apple, Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines
