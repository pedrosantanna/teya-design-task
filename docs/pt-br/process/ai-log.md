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
Os agentes tentaram a API do Reddit, dois navegadores e um script rodado pelo segundo agente. Tudo foi bloqueado. Eu salvei à mão 10 páginas de busca e 21 threads, e um script conferiu cada citação do Reddit com esses arquivos salvos. Até ali os agentes tinham coletado 69 citações do Reddit, e 68 bateram com as páginas salvas. Duas citações foram descartadas porque os posts tinham sido removidos depois; as notas dessa etapa não dizem se a citação que não bateu era uma delas. Cortes posteriores por tamanho e relevância deixaram 28 citações do Reddit na documentação: 27 conferidas no site ao vivo e uma de um arquivo público.

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
Um agente capturou as telas principais de oito apps dos benchmarks no Mobbin, pelo meu navegador logado, e salvou as imagens localmente. Just Eat, SumUp e Teya não estão no Mobbin. As imagens ficam fora do repositório público porque são telas de terceiros. O agente também leu as páginas públicas da Teya e escreveu o que a Teya faz e não faz pela Jess. Por fim, um agente montou a conclusão do Discover: fatos, suposições com nível de confiança sugerido por uma regra fixa e perguntas em aberto. Os níveis ainda são as sugestões do agente; eu reviso e defino os finais.

### 13. Define: conceito, canvas e hipóteses
Eu escrevi o conceito: um agente que funciona como concierge da high street. Um agente conferiu cada parte com a evidência do Discover, preencheu um canvas de proposta de valor para o Sam e outro para a Jess a partir do mapa de empatia e das páginas de persona, e rascunhou oito hipóteses com testes e critérios de aprovação. Antes, enxuguei as perguntas em aberto da conclusão: tirei a escolha do comprador, que era uma decisão minha, e acrescentei perguntas sobre como os lojistas trabalham.

### 14. Por que um agente, e o blueprint de serviço
Escrevi por que o concierge é um agente: vários agentes por trás de uma conversa só, que cuida da espera pelas lojas, executa pedidos depois e pode viver fora do app (decisão 018). Um agente revisou as páginas da Define a partir disso: o conceito, os dois canvas e as hipóteses, que passaram de oito para onze. Eu acrescentei quatro sobre o agente (perguntar primeiro, a espera, pedidos deixados com antecedência, canais) e juntei a antiga "agente como entrada principal" à primeira delas, e o teste feito à mão passou para o WhatsApp, comigo no papel de concierge. O agente também rascunhou um blueprint de serviço com o comprador, o concierge, os agentes por trás dele e a loja, e criou um bloco de blueprint para o site. Eu defini as etapas e quais agentes ficam por trás do concierge. A primeira versão era uma tabela de frases, com texto demais para ser lida como blueprint; o agente redesenhou em cartões curtos com uma cor por raia, setas ao longo das etapas do comprador e os pontos de falha marcados. Essa versão ainda tinha ruído, com cada item numa caixa colorida, então pedi mais uma rodada: agora só as três raias que agem (comprador, concierge e loja) têm cartões, e pontos de contato, sistemas, agentes e pontos de falha são texto simples.

### 15. Revisão externa
Passei a documentação para um segundo agente, de outra ferramenta e sem o contexto deste projeto, e pedi uma revisão da evidência, do método e das páginas da Define. Ele encontrou 15 problemas e alguns menores, quase todos pontos em que uma leitura tinha mais certeza do que a evidência permitia. Dois agentes aplicaram as correções, um no Discover e outro na Define; eu decidi como tratar cada uma.

- No Discover, o agente recontou os posts por trás de cada suposição. A A3 (uma ida perdida termina na Amazon) caiu de Alto para Baixo, porque só dois posts mostram isso; a A6 (horário) de Médio para Baixo, porque dois dos seis posts da Jess tratam de horário; e a A8 agora registra os dois desfechos depois de uma ida perdida. O estoque local do Google também funciona a partir do site ou de um feed da loja, então o que é possível, o que se sabe e a minha suposição (a nova A14) estão separados. A etapa da compra aparece como uma ordem que eu escolhi, os três clusters como o melhor resultado para os pesos que escolhi (outros pesos dão quatro ou cinco), e o post de @London_W4, que não atendia ao codebook, saiu dos clusters (decisão 019): continuam três clusters, com a Ruth em três posts.
- Na Define, as hipóteses dizem quais critérios medem escolha declarada e quais medem comportamento, a H1 conta à parte os pedidos por WhatsApp e as buscas resolvidas, e todo teste com compradores usa seis pessoas. O blueprint mostra a reserva confirmada antes do pagamento, o que acontece quando o item já foi vendido, o pagamento falha ou a reserva expira, e três opções depois do trabalho para a Jess, todas supostas.

### 16. Próximo passo, receita e os primeiros canvas
Decidi fazer uma prova de conceito com lojas da King Street em vez de mais uma rodada de pesquisa (decisão 020), construir o app nativo e iOS primeiro (021) e fazer a ideação em canvas (022). Também defini as hipóteses de receita no cenário de um provedor de pagamentos com POS próprio (023). Um agente escreveu as páginas Próximo passo e Receita, acrescentou as hipóteses H12 a H16 e sugeriu mais duas fontes de receita, que por enquanto deixei fora das hipóteses.

Para a Develop, um agente reuniu 14 referências de home no Mobbin (Granola, Shop, Deliveroo, Uber Eats, Wolt, Too Good To Go, Airbnb, ChatGPT, Perplexity) e propôs a ordem dos módulos da home. O agente principal construiu o canvas (mover, zoom, seleção, uma gaveta com notas e ligações) e um kit de wireframe iOS em preto e branco, e depois desenhou o fluxo do app a partir do blueprint e os estados do pedido na loja. Eu defini a estrutura: a barra de pedido embaixo, o menu no avatar, as telas do fluxo e a reserva antes do pagamento. Quando vi os primeiros desenhos, o concierge parecia uma pessoa ao lado dos agentes; deixei explícito que o concierge é o agente com quem o comprador conversa, no app, no WhatsApp ou via MCP.

### 17. A área do comprador
Decidi que o concierge trabalha a partir da localização e do prazo do comprador, em todas as high streets ao alcance, em vez de uma high street só (decisão 024). Um agente mediu no OpenStreetMap rotas a pé da Blythe Road até as ruas comerciais em volta e as agrupou em anéis: seis ruas a até 15 minutos. Ele também verificou se a GLA define uma high street por um número mínimo de lojas; as fontes que encontrou não dão número nenhum, então os docs não usam um. A prova de conceito passou para cerca de dez lojas no anel de 15 minutos, e os wireframes agora mostram a rua de cada loja. O agente trocou as redes que tinha usado nos primeiros wireframes (uma rede de papelarias, uma de farmácias e uma de óticas) por lojas independentes inventadas, porque o produto é para lojas independentes.

### 18. Passe de acabamento nos canvas
Achei os wireframes apertados e o texto saindo das formas dos estados. O agente descobriu que o vazamento vinha de um nome de classe que o canvas dividia com a mensagem de carregamento do site, o que tirava o respiro lateral, e dos estados de início e fim em formato de pílula. Ele deu largura fixa e respiro aos estados, marcou os estados finais com um anel em vez da pílula, afastou frames e estados para os rótulos das setas caberem, alinhou as notas embaixo das telas, passou os espaçamentos do app para um ritmo de 8 pontos, tirou um aviso que cobria o código de retirada e deixou o painel "Sobre este canvas" mais largo, com o resumo empilhado.

### 19. Fluxo do app v2 e versões no canvas
Achei que a primeira home misturava duas tarefas: explorar a rua e acompanhar o que eu tinha pedido. Pedi uma home só, com duas abas no topo, como no Airbnb, e Requests como uma lista de conversas que reúne buscas e compras. Um agente reuniu referências de listas de chat no Mobbin (Airbnb, Vinted, Depop, WhatsApp, Messenger, ChatGPT, Perplexity) e propôs a linha: a foto do item com os logos das lojas, o pedido nas palavras do comprador, a última mensagem, uma linha de status e um botão só quando é o comprador que está segurando o pedido. O agente principal desenhou a v2, acrescentou uma tela em que o concierge propõe separar um pedido, escreveu os trade-offs do que uma conversa deve conter (decisão minha, ainda em aberto) e corrigiu o espaçamento dos títulos, que o passe anterior tinha deixado grande demais, e os botões cujo texto quebrava. O canvas agora guarda versões: abre na mais recente, e a v1 fica no menu de versões.

## Falhas da IA

- Um primeiro rascunho de personas parecia pronto, mas era circular, porque o agente o construiu antes de o método estar certo. O agente revisor percebeu; o agente que o escreveu, não.
- As páginas de método foram escritas como se um pesquisador humano sozinho tivesse feito o trabalho, e esconderam os agentes até eu apontar isso.
- As ferramentas não alcançaram o Reddit, os comentários do TikTok nem o Nextdoor. O contorno (um arquivo mais páginas salvas à mão) me custou tempo.
- No começo, algumas citações do Trustpilot voltaram encurtadas por uma ferramenta de resumo e tiveram de ser buscadas de novo ou descartadas.
