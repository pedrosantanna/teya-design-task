# Como construí com IA

Eu dirigi o trabalho e tomei as decisões; agentes coletaram, programaram, redigiram e conferiram, sob regras compartilhadas e etapas de revisão.

## O harness

- Um arquivo de regras, `AGENTS.md`, que todo agente lê: evidência, escrita, docs bilíngues, etapas de revisão (decisão 005).
- Um agente principal rodando subagentes em paralelo, e um segundo agente, de outra ferramenta, para revisões.
- Specs no OpenSpec: um PRD curto, specs de capacidade e uma change para cada parte do trabalho (decisão 044).
- Um design system escrito como código: tokens geram quatro temas, e lint, checagem de tipos e uma checagem de desvio de tokens rodam a cada edição de um agente.

<!-- screenshot: the repo tree with AGENTS.md, openspec/ and app/src/design-system/ open -->

## Um ciclo, do começo ao fim

No último dia eu disse que o fade do Getting started parecia barato, que a arte não animava e que dois objetos não estavam centralizados. Um agente achou três motivos separados para nada se mexer, corrigiu os três, trocou o fade e centralizou cada objeto pelos próprios limites. Depois mandei uma captura de tela da lista de lojas desenhada por cima das mensagens da conversa, e rastreei esse bug no navegador eu mesmo. Uma varredura de outro agente percorreu os 34 passos e achou os clipes mais antigos desenhados fora do chão, porque o Chrome lia as tags de cor deles de outro jeito; eu refiz as tags à mão, e um agente corrigiu o resto. Os oito usuários sintéticos de teste continuaram chegando aos objetivos.

<!-- screenshot: the AI log entry for that step next to the fixed Getting started screen -->

Evidência: [log de IA, passo 76](../process/ai-log.md).

## Etapas de revisão

- Um segundo agente etiquetou todos os posts às cegas (kappa de 0,85 a 0,93 nas etiquetas principais).
- Uma revisão externa achou 15 problemas, a maioria afirmações mais certas do que a evidência (decisão 019).
- Um revisor de telas confere cada tela; um crítico visual mede o contraste no claro e no escuro.
- Uma revisão de código, revisões de coerência e usuários sintéticos de teste para Sam e Jess.

Agentes revisando agentes têm os mesmos pontos cegos. Várias das checagens que importaram foram minhas, feitas olhando a tela renderizada.

## O que joguei fora

- Um primeiro rascunho de personas que parecia pronto e era circular.
- Superfícies pastel a 1,01 a 1,04:1 contra o fundo, antes de eu pedir um crítico visual.
- Um cartão de loja em vidro, medido e deixado de fora (decisão 058).
- Tempos de caminhada inventados, trocados por rotas reais (decisão 063).

Evidência: [falhas da IA](../process/ai-log.md), [revisão de telas](../develop/design-system/screen-review.md).
