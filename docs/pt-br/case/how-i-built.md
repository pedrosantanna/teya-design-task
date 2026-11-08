# Como construí

Eu dirigi o trabalho e tomei as decisões; agentes coletaram, etiquetaram, redigiram e conferiram, sob regras compartilhadas e etapas de revisão. Muitas decisões vieram do meu próprio repertório: o design system, os fluxos, os estados. Estão brutas em alguns pontos, firmes o bastante para construir em cima, e cada uma passou por revisão.

## O contexto de IA

O contexto de IA é tudo o que um agente lê antes de trabalhar: as regras, a pesquisa, as specs, as decisões e os registros. Ele é longo de propósito. Quanto mais do meu raciocínio está escrito, mais agentes consigo rodar ao mesmo tempo sem corrigir o resultado deles à mão.

- Um arquivo de regras, `AGENTS.md`, que todo agente lê: evidência, escrita, docs bilíngues, etapas de revisão (decisão 005).
- Um agente principal rodando subagentes em paralelo, e um segundo agente, de outra ferramenta, para revisões.
- Specs no OpenSpec: um PRD curto, specs de capacidade e uma change para cada parte do trabalho (decisão 044).
- Um design system escrito como código: tokens geram quatro temas, e lint, checagem de tipos e uma checagem de desvio de tokens rodam a cada edição de um agente.

```text
AGENTS.md                 regras que todo agente lê
openspec/
  project.md              o PRD
  specs/                  12 capacidades: request, answers, order, collection…
  changes/archive/        11 changes, uma por parte do trabalho
app/src/design-system/
  AGENTS.md               regras de interface para agentes
  tokens/                 tokens DTCG para iOS, Android, claro e escuro
  components/             59 componentes, os únicos que as telas podem usar
docs/                     este registro, em inglês e português
```

## Fluxos e estados

O primeiro fluxo do app veio de um agente que recebeu o blueprint de serviço e as hipóteses. Iterei o fluxo em dez versões, e todas ficam no menu de versões do canvas; o painel "Sobre este canvas" lista as decisões por trás dele. Os estados do pedido na loja e o fluxo do agente são a base sobre a qual um agente real seria construído, e mantive os dois simples aqui. Os estados da loja estão desenhados como diagrama em "O lado da loja", no [Conceito](concept.md).

Evidência: [fluxo do app](../develop/ideation/app-flow.md), [estados do pedido na loja](../develop/ideation/shop-states.md), [fluxo do agente](../develop/ideation/agent-flow.md).

## Modelo conceitual

Pedi um modelo conceitual antes de mais telas, para que o resultado dos agentes ficasse coerente com o jeito como quem compra pensa: quatro objetos, um verbo por ação, uma tabela de rótulos de status.

Evidência: [modelo conceitual](../develop/design-system/conceptual-model.md).

## Design system

O design system parte das diretrizes da Apple e depois é personalizado em tokens e 59 componentes. Os agentes só podem montar telas com esses componentes e tirar cada valor do tema, e uma checagem quebra o build quando um valor se desvia dos tokens.

Evidência: [design system](../develop/design-system/index.md).

## Marca e ilustrações

Snuffle é um cachorro farejando coisas. A marca começou como testes vetoriais de um agente, que redesenhei à mão no Figma; fora um quadro de rascunho para paletas, foi aí que o Figma entrou. As ilustrações 3D, modeladas em código e ajustadas num visualizador, dão ao app um caráter de high street britânica e servem de navegação nos blocos de categoria.

Evidência: [marca](../develop/design-system/mark.md), [ilustrações](../develop/design-system/illustrations.md).

## Explorações

As opções visuais ficam em canvases, um quadro por pergunta: onde ficam as abas, a brand, a identidade e a tipografia. Cada quadro guarda todas as rodadas lado a lado, e a opção que escolhi tem contorno verde. As bases decididas depois passam para o design system.

Evidência: [posição das abas](../develop/ideation/tab-placement.md), [brand](../develop/ideation/brand.md), [identidade](../develop/ideation/identity.md), [tipografia](../develop/ideation/type-scale.md).

## Usuários sintéticos

Usei usuários sintéticos como método de teste. Oito usuários de teste roteirizados, quatro para o Sam e quatro para a Jess, usam o protótipo e registram onde um fluxo quebra. Eles pegam fluxos quebrados e casos extremos; não são usuários e não dizem nada sobre demanda.

Evidência: [usuários sintéticos de teste](../deliver/synthetic-users.md).

## Etapas de revisão

- Um segundo agente etiquetou todos os posts às cegas.
- Uma revisão externa achou 15 problemas, a maioria afirmações mais certas do que a evidência (decisão 019).
- Um revisor de telas confere cada tela; um crítico visual mede o contraste no claro e no escuro.
- Uma revisão de código, revisões de coerência e os usuários de teste roteirizados.

Agentes revisando agentes têm os mesmos pontos cegos. Várias das checagens que importaram foram minhas, feitas olhando a tela renderizada.

## O que joguei fora

- Um primeiro rascunho de personas que parecia pronto e era circular.
- Superfícies pastel a 1,01 a 1,04:1 contra o fundo, antes de eu pedir um crítico visual.
- Um cartão de loja em vidro, medido e deixado de fora (decisão 058).
- Tempos de caminhada inventados, trocados por rotas reais (decisão 063).

Evidência: [registro de IA e suas falhas](../process/ai-log.md), [revisão de telas](../develop/design-system/screen-review.md).

## Um ciclo, do começo ao fim

<div class="feature"><video class="phone-video" src="../../case/media/getting-started.mp4" data-poster="../../case/media/getting-started.png" width="450" height="948" aria-label="Getting started depois da correção: a cena da rua se mexe, e Continue leva às duas páginas seguintes" controls muted playsinline loop preload="metadata"></video><div>

| | |
| --- | --- |
| O que pedi | O fade do Getting started parecia barato, a arte não animava e dois objetos não estavam centralizados |
| O que voltou | Um agente achou três motivos separados para nada se mexer, corrigiu os três, trocou o fade e centralizou cada objeto pelos próprios limites |
| O que fiz à mão | Rastreei eu mesmo, no navegador, a lista de lojas desenhada por cima das mensagens, e refiz as tags de cor dos clipes antigos que o Chrome desenhava fora do chão |
| O que conferiu | Uma varredura de outro agente percorreu os 34 passos; os oito usuários de teste continuaram chegando aos objetivos |

</div></div>

Evidência: [registro de IA, passo 76](../process/ai-log.md).
