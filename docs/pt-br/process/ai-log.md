# Como a IA foi usada

Eu dirigi o trabalho e tomei as decisões. Agentes de IA fizeram a maior parte da coleta, da etiquetagem, dos rascunhos e das checagens. Esta página registra cada etapa: o que foi pedido aos agentes, o que voltou e o que foi mantido, descartado ou corrigido.

## Quem faz o quê

| | Eu | Agentes de IA |
| --- | --- | --- |
| Direção | Define a pergunta, o método e o escopo; decide em cada etapa | Propõem opções e registram decisões |
| Pesquisa | Escolhe as redes, faz login onde é preciso, salva páginas que as ferramentas não alcançam | Buscam, leem, coletam e datam citações; pesquisa documental |
| Análise | Questiona o método, revisa os resultados | Etiquetam posts, montam tabelas e gráficos, rodam checagens |
| Escrita | Define tom e regras; revisa | Rascunham todas as páginas em inglês seguindo as regras de escrita do `AGENTS.md` |

**Ferramentas.** Um agente principal roda subagentes para trabalho em paralelo. Um segundo agente é usado para revisões e tarefas secundárias. Todo agente lê o `AGENTS.md`, que reúne as regras compartilhadas.

## Log

### 1. Configuração inicial
Um agente montou o repo, as instruções dos agentes e o registro de decisões a partir do meu brief. Eu acrescentei duas regras cedo: nada fora do take-home entra no repo, e tudo é escrito em inglês com voz humana.

### 2. Três agentes de pesquisa em paralelo
Cada agente recebeu um brief escrito: (A) uma netnografia de compradores de Londres com um mapa de empatia, (B) benchmarks com o sentimento dos usuários, (C) uma revisão documental da high street, a rua comercial do bairro. Cada brief fixava uma janela de 18 meses e o formato de evidência: literal, handle, data, link.

- **O que voltou:** cerca de 60 citações etiquetadas (umas 40 chegaram à página de achados), 17 produtos com 59 citações e um panorama datado com cerca de 35 números.
- **O que deu errado:** o Reddit bloqueou todas as ferramentas. O agente A leu o Reddit pelo Arctic Shift, um arquivo público de pesquisa, e deixou isso registrado. X e TikTok exigiam login.
- **O que foi corrigido:** o agente C relatou uma troca de primeiro-ministro e um Orçamento de outubro de 2026 que o agente principal não conseguiu confirmar com o próprio conhecimento. Mais tarde, um agente de escrita checou os dois em várias fontes. Os dois se confirmaram, com uma correção: o novo limite de business rates (imposto sobre imóveis comerciais) para pequenos negócios vale só para lojas, hospitalidade e lazer.

### 3. Verificando o Reddit
Os agentes tentaram a API do Reddit, dois navegadores e um script rodado pelo segundo agente. Tudo foi bloqueado. Eu salvei à mão 10 páginas de busca e 21 threads. Um script conferiu cada citação do Reddit com esses arquivos salvos.

- **Mantido:** 68 das 69 citações do Reddit coletadas até ali bateram com o site ao vivo.
- **Descartado:** duas citações cujos posts tinham sido removidos.

### 4. Escrevendo as páginas
Dois agentes de escrita transformaram a pesquisa em páginas. Regras: citações de no máximo 25 palavras, e fato separado de interpretação. O agente principal escreveu a visão geral e checou com scripts os links, a renderização e os campos das citações.

### 5. X e TikTok
Eu fiz login no X e no TikTok no Chrome. Um agente buscou nos dois pela minha sessão, só leitura. Os comentários do TikTok não carregavam para as ferramentas, então só as legendas foram usadas. Posts que usavam a high street para argumentos raciais ou políticos foram lidos e deixados de fora.

### 6. Proto-personas
- **Método:** eu defini. Etiquetar os posts, pontuá-los em duas dimensões que se ligam ao brief, clusterizar e depois descrever cada cluster como uma persona.
- **Etiquetagem:** um agente escreveu o codebook e etiquetou 44 posts. Um segundo agente os etiquetou às cegas. A concordância foi alta nas etiquetas por trás das duas dimensões (kappa 0,85–0,93) e mais fraca no que as pessoas fizeram em seguida (0,55). Regras escritas resolveram as divergências.
- **Revisão:** antes de o método estar fechado, um agente revisor leu os arquivos sem contexto prévio. Achou circular um primeiro rascunho, porque as personas tinham sido atribuídas antes da pontuação. Esse rascunho foi descartado.
- **Resultado:** três clusters, logo três proto-personas. Ver [método](../discover/personas/method.md).

### 7. Revisão de coerência
Eu pedi a um agente revisor que lesse todas as páginas em ordem e corrigisse o que não fazia sentido em conjunto. Ele reescreveu caixas "My call" pouco claras como decisões de verdade, tirou sobras de rascunhos anteriores e contagens desatualizadas, e corrigiu contradições entre páginas. Também tirou detalhes pessoais e me mandou seis perguntas em aberto. Eu respondi; o agente principal aplicou as respostas.

### 8. Benchmarks reorganizados em torno das proto-personas
Um agente reorganizou os 17 benchmarks em relação a Sam, Jess e Ruth: 11 diretamente relevantes, 6 relacionados. Todo produto que uma persona já usa tem um post por trás. Onde não havia post, o produto aparece como uma opção que a persona ainda não usa.

### 9. Rodada de design
Um agente de design pesquisou padrões comuns de "AI slop" em design de interface e refinou o site de documentação para evitá-los, no mesmo estilo neutro.

### 10. Uma versão em português
Pedi todas as páginas também em português do Brasil, com um seletor de idioma no site. Três agentes traduziram as páginas em paralelo a partir de um glossário comum e repassaram os termos novos uns aos outros durante o trabalho. Depois, um quarto agente revisou as 15 páginas contra o inglês. Ele fez cerca de 60 correções: decalques, dois deslizes de consistência e um de estrutura. Também encontrou quatro frases pouco claras no inglês, que corrigi nos dois idiomas.

## O que a IA fez mal aqui

- **Construiu antes de o método estar certo.** Um primeiro rascunho de personas parecia pronto, mas era circular. O agente revisor percebeu; o agente que o escreveu, não.
- **Escreveu como se um pesquisador humano sozinho tivesse feito o trabalho.** As páginas de método escondiam os agentes até eu apontar isso.
- **Não alcançou fontes importantes.** Reddit, comentários do TikTok e Nextdoor. O contorno (um arquivo mais páginas salvas à mão) me custou tempo.
- **Cortou demais as citações no começo.** Algumas citações do Trustpilot voltaram encurtadas por uma ferramenta de resumo e tiveram de ser buscadas de novo ou descartadas.
