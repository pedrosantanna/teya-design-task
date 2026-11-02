# Como a IA foi usada

Eu dirigi o trabalho e tomei as decisões. Agentes de IA fizeram a maior parte da coleta, da etiquetagem, dos rascunhos e das checagens. Cada etapa abaixo lista o que foi pedido aos agentes, o que voltou e o que foi mantido, descartado ou corrigido.

## Quem faz o quê

| | Eu | Agentes de IA |
| --- | --- | --- |
| Direção | Define a pergunta, o método e o escopo; decide em cada etapa | Propõem opções e registram decisões |
| Pesquisa | Escolhe as redes, faz login onde é preciso, salva páginas que as ferramentas não alcançam | Buscam, leem, coletam e datam citações; pesquisa documental |
| Análise | Questiona o método, revisa os resultados | Etiquetam posts, montam tabelas e gráficos, rodam checagens |
| Escrita | Define tom e regras; revisa | Rascunham todas as páginas em inglês seguindo as regras de escrita do `AGENTS.md` |

Um agente principal roda subagentes para trabalho em paralelo. Um segundo agente cuida de revisões e tarefas secundárias. Todo agente lê o `AGENTS.md`, que reúne as regras compartilhadas.

## Log

### 1. Configuração inicial
Um agente montou o repo, as instruções dos agentes e o registro de decisões a partir do meu brief. Eu acrescentei duas regras cedo: nada fora do take-home entra no repo, e tudo é escrito em inglês com voz humana.

### 2. Pesquisa em paralelo
Cada um dos três agentes recebeu um brief escrito: (A) uma netnografia de compradores de Londres com um mapa de empatia, (B) benchmarks com o sentimento dos usuários, (C) uma revisão documental da high street, a rua comercial do bairro. Cada brief fixava uma janela de 18 meses e o formato de evidência: literal, handle, data, link.

Eles voltaram com cerca de 60 citações etiquetadas (umas 40 chegaram à página de achados), 17 produtos com 59 citações e um panorama datado com cerca de 35 números.

O Reddit bloqueou todas as ferramentas. O agente A leu o Reddit pelo Arctic Shift, um arquivo público de pesquisa, e deixou isso registrado. X e TikTok exigiam login.

O agente C relatou uma troca de primeiro-ministro e um Orçamento de outubro de 2026 que o agente principal não conseguiu confirmar com o próprio conhecimento. Mais tarde, um agente de escrita checou os dois em várias fontes. Os dois se confirmaram, com uma correção: o novo limite de business rates (imposto sobre imóveis comerciais) para pequenos negócios vale só para lojas, hospitalidade e lazer.

### 3. Verificação do Reddit
Os agentes tentaram a API do Reddit, dois navegadores e um script rodado pelo segundo agente. Tudo foi bloqueado. Eu salvei à mão 10 páginas de busca e 21 threads, e um script conferiu cada citação do Reddit com esses arquivos salvos. Das 69 citações do Reddit coletadas até ali, 68 bateram com o site ao vivo. Duas citações foram descartadas porque os posts tinham sido removidos.

### 4. Rascunho das páginas
Dois agentes de escrita transformaram a pesquisa em páginas, com citações de no máximo 25 palavras e fato separado de interpretação. O agente principal escreveu a visão geral e checou com scripts os links, a renderização e os campos das citações.

### 5. X e TikTok
Eu fiz login no X e no TikTok no Chrome. Um agente buscou nos dois pela minha sessão, só leitura. Os comentários do TikTok não carregavam para as ferramentas, então só as legendas foram usadas. Posts que usavam a high street para argumentos raciais ou políticos foram lidos e deixados de fora.

### 6. Proto-personas
Eu defini o método: etiquetar os posts, pontuá-los em duas dimensões que se ligam ao brief, clusterizar e depois descrever cada cluster como uma persona.

Um agente escreveu o codebook e etiquetou 44 posts, e um segundo agente os etiquetou às cegas. A concordância foi alta nas etiquetas por trás das duas dimensões (kappa 0,85–0,93) e mais fraca no que as pessoas fizeram em seguida (0,55). Regras escritas resolveram as divergências.

Antes de o método estar fechado, um agente revisor leu os arquivos sem contexto prévio. Achou circular um primeiro rascunho, porque as personas tinham sido atribuídas antes da pontuação, e esse rascunho foi descartado. Os dados finais deram três clusters, logo três proto-personas. Ver [método](../discover/personas/method.md).

### 7. Revisão de coerência
Eu pedi a um agente revisor que lesse todas as páginas em ordem e corrigisse o que não fazia sentido em conjunto. Ele reescreveu caixas "My call" pouco claras como decisões, tirou sobras de rascunhos anteriores e contagens desatualizadas, e corrigiu contradições entre páginas. Também tirou detalhes pessoais e me mandou seis perguntas em aberto. Eu respondi, e o agente principal aplicou as respostas.

### 8. Benchmarks por proto-persona
Um agente reorganizou os 17 benchmarks em relação a Sam, Jess e Ruth: 11 diretamente relevantes, 6 relacionados. Todo produto que uma persona já usa tem um post por trás. Onde não havia post, o produto aparece como uma opção que a persona ainda não usa.

### 9. Rodada de design
Um agente de design pesquisou padrões comuns de "AI slop" em design de interface e refinou o site de documentação para evitá-los, no mesmo estilo neutro.

### 10. Versão em português
Pedi todas as páginas também em português do Brasil, com um seletor de idioma no site. Três agentes traduziram as páginas em paralelo a partir de um glossário comum e repassaram os termos novos uns aos outros durante o trabalho. Depois, um quarto agente revisou as 15 páginas contra o inglês e fez cerca de 60 correções: decalques, dois deslizes de consistência e um de estrutura. Também encontrou quatro frases pouco claras no inglês, que corrigi nos dois idiomas.

### 11. Revisão de escrita e uma nova segunda dimensão
Li os documentos e achei que ainda pareciam escritos por IA, principalmente nos títulos de efeito. Um agente de pesquisa reuniu catálogos publicados de sinais de texto de IA (a página "Signs of AI writing" da Wikipedia, estudos de corpus sobre o vocabulário dos modelos, skills de escrita de código aberto) e trouxe as regras que faltavam na minha skill de escrita. Coloquei essas regras na skill, junto com uma regra minha: título é etiqueta objetiva. Depois, quatro agentes reescreveram todas as páginas em inglês com as regras novas e refizeram o português a partir do inglês novo. Eles tiraram bullets com rótulo em negrito, frases sobre a própria página, correções do tipo "não X, mas Y" e travessões.

Na mesma rodada, vi que o "ponto de falha" não dava para medir como escala. Troquei pela etapa da compra em que a tentativa parou (de 1 saber a 4 levar, decisão 016). O agente rodou a clusterização de novo, e os mesmos posts caíram nos mesmos três clusters.

Também reorganizei o Discover pela forma como os dados foram coletados (decisão 015). A pesquisa documental é contexto, e a netnografia é o único método usado sobre compradores, o que faz o mapa de empatia e as proto-personas se apoiarem em dados atitudinais. Agentes reescreveram a página de método e os resumos para deixar isso claro, e a barra lateral ganhou uma página de Pesquisa documental e um grupo Coleta de dados. Depois, um agente revisor leu todas as páginas em ordem, nos dois idiomas, e corrigiu as contradições que essas mudanças deixaram.

### 12. Telas e Teya
Um agente capturou as telas principais de oito apps dos benchmarks no Mobbin, pelo meu navegador logado, e salvou as imagens localmente. Just Eat, SumUp e Teya não estão no Mobbin. As imagens ficam fora do repositório público porque são telas de terceiros. O agente também leu as páginas públicas da Teya e escreveu o que a Teya faz e não faz pela Jess. Por fim, um agente montou a conclusão do Discover: fatos, suposições com nível de confiança sugerido por uma regra fixa e perguntas em aberto. Eu defino os níveis finais.

## Falhas da IA

- Um primeiro rascunho de personas parecia pronto, mas era circular, porque o agente o construiu antes de o método estar certo. O agente revisor percebeu; o agente que o escreveu, não.
- As páginas de método foram escritas como se um pesquisador humano sozinho tivesse feito o trabalho, e esconderam os agentes até eu apontar isso.
- As ferramentas não alcançaram o Reddit, os comentários do TikTok nem o Nextdoor. O contorno (um arquivo mais páginas salvas à mão) me custou tempo.
- No começo, algumas citações do Trustpilot voltaram encurtadas por uma ferramenta de resumo e tiveram de ser buscadas de novo ou descartadas.
