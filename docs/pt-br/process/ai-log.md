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

### 20. Posição das abas e uma primeira identidade
Dois agentes trabalharam em paralelo, cada um na sua aba do navegador no Mobbin. Um reuniu onze referências de onde fica uma troca de modo ao lado de uma barra de pedido embaixo e pontuou seis posições por critérios de arquitetura da informação; recomendou uma barra inferior com Nearby e Requests dos lados da pílula de pedido, com um controle segmentado como alternativa. O agente principal desenhou as seis opções na home da v2. O outro agente pesquisou quatro direções de conceito britânicas (um terrier, os meninos de rua do Holmes, "dar uma saída rápida", uma fileira de lojas), checou nomes e a situação da marca Sherlock Holmes com buscas rápidas na web, montou três paletas de várias cores com contraste e paletas tonais do Material 3 calculados por um script, e aplicou as paletas na home da v2, no tema claro e no escuro. Ele redesenhou uma marca de terrier cuja boca parecia dentes. Eu pedi essas explorações; as escolhas de posição, conceito e paleta ainda são minhas.

### 21. Identidade v2: mais paletas e o ícone terrier com toldo
Não encontrei a paleta na primeira rodada e pedi mais, com quatro ou cinco cores por conjunto. O agente principal escreveu dez paletas em torno de pares complementares e um script que confere o contraste de cada tint sobre branco e sobre o fundo do modo escuro, e clareia o tint para o modo escuro. Também pedi um teste de ícone: o toldo da parade como barba de um terrier, mais baixo, com orelhas dobradas, olhos e nariz. O agente desenhou seis variantes em SVG. Os primeiros rascunhos tinham listras brancas que pareciam dentes, o mesmo problema do terrier da v1; ele subiu o toldo para logo abaixo do nariz e coloriu as listras. O canvas de identidade agora também tem versões.

### 22. Identidade v3: uma linha de ícone em cinco paletas
Escolhi o teste de ícone 3 (sobrancelhas e bigode) e cinco paletas (A, C, F, I, J). O agente principal redesenhou o bigode com quatro e cinco listras e aplicou nas cinco paletas, sobre o tint, num fundo claro e num fundo escuro, e em tamanhos pequenos. O zoom mínimo do canvas caiu para 4%, porque o quadro de identidade ficou mais alto do que o ajuste à tela conseguia mostrar.

### 23. Posição das abas, opção G
Pedi um teste em que Requests é um botão redondo ao lado da barra de pedido, como na barra do Granola. O agente principal desenhou o botão à esquerda e à direita, e a folha que ele abre, comparou com as opções A a F e deu a opinião dele: a G mantém a barra de pedido grande e põe Requests sob o polegar, ao custo de um ícone sem rótulo. O canvas de posição das abas agora também tem versões.

### 24. Fluxo do app v3, e um canvas por exploração
Escolhi a opção G com o botão à esquerda (decisão 026). O agente principal tirou as abas da home, pôs o botão redondo de Requests à esquerda da barra de pedido e transformou a tela de Requests numa folha sobre a rua. Também pedi para versionar só o fluxo do app e os estados do pedido na loja; os outros canvas de ideação (posição das abas, identidade) agora guardam todas as rodadas lado a lado num quadro só, então os menus de versão deles voltaram a ser um canvas único. O agente também restaurou dois títulos de seção que os próprios scripts dele tinham apagado do registro de decisões em português e do log de AI.

### 25. Paletas no Figma para teste
Eu queria testar à mão no Figma as dez paletas da segunda rodada. O agente criou num arquivo de testes meu uma coleção de variáveis de cor com os modos Light e Dark (44 variáveis, uma por cor), um componente de amostra e um quadro com as dez paletas ligadas a essas variáveis. O primeiro quadro saiu com as amostras achatadas, porque o agente fixou a altura do componente antes de deixá-lo se ajustar ao conteúdo; ele corrigiu isso no componente. Aqui o Figma é só um espaço de rascunho (decisão 003); a fonte das paletas continua sendo o canvas de identidade.

### 26. Escala tipográfica, e Requests em tela cheia
Pedi uma escala tipográfica a partir das diretrizes da Apple e do Material, testada em fontes que escolhi na Fontshare: Satoshi, Chillax, Switzer e Author sozinhas, e Telma, Gambetta e Pally nos títulos, com SF Pro ou Excon no resto. Um agente conferiu cada fonte, mediu altura-x, números e pesos com o fontTools, montou os espécimes e uma tela de conversa para cada uma e deu notas para leitura de conversa; a recomendação dele é Gambetta nos títulos e SF Pro no resto. As fontes ficam numa pasta privada. Na mesma rodada escolhi abrir Requests em tela cheia a partir do botão redondo, e o agente desenhou a v4 do fluxo do app com um storyboard da transição, a partir da transição de zoom do iOS e do container transform do Material.

### 27. Escala tipográfica, rodada 2
Tirei as fontes do sistema da escolha: SF Pro e Roboto são só fallback, porque nenhuma existe na outra plataforma (decisão 027). O agente acrescentou uma segunda rodada ao quadro de tipografia, combinando Gambetta, Telma e Pally com Switzer e com Satoshi, marcou os pares com SF Pro como fora e refez as notas. Gambetta com Switzer agora tem a melhor nota.

### 28. Escala tipográfica, rodada 3
Decidi que a conversa tem uma fonte só, uma sans forte com a Switzer como favorita, e fonte de display só no splash, na tela de entrada, no título da home e em títulos de widget (decisão 028). Também tirei a Pally. O agente removeu a Pally de todos os testes, acrescentou uma terceira rodada com essas quatro telas para cinco opções (Switzer sozinha, e Gambetta, Telma, Chillax ou Author no display) e deu notas para o papel de display; a Gambetta lidera. As rodadas 1 e 2 tinham posto fonte de display na conversa, o que o agente não deveria ter feito.

### 29. Gambetta e Switzer refinadas, e o terrier no Figma
Escolhi a Gambetta no display e a Switzer no resto (decisão 029) e pedi que o espaçamento fosse refinado a partir de fontes confiáveis, não da memória. O agente principal leu as diretrizes de tipografia da Apple (tabela de tracking, tamanhos mínimos, fontes próprias), os tokens de espaçamento entre letras do Material no código do Android e referências sobre tracking em display, e mediu as fontes com o fontTools. A Switzer colada vinha do tracking da SF copiado para o kit de wireframe; o agente definiu o tracking por fonte e por tamanho e deixou os títulos em Switzer mais pesados. Depois, um agente separado de revisão de acabamento conferiu a rodada 4 e encontrou dezesseis problemas, entre eles dois elementos em Gambetta na home, o cinza secundário reprovado no contraste e uma afirmação errada sobre números tabulares; todos foram corrigidos. Em paralelo pedi o ícone do terrier no Figma: o agente colocou como formas editáveis com nome, mais cinco variantes simples de orelha e sobrancelha para eu trabalhar.

### 30. Peso dos títulos em Switzer
Achei os títulos em Switzer 800 pesados demais ao lado da Gambetta. Um agente de tipografia mediu com o fontTools a espessura das hastes e a área de tinta de cada peso da Switzer contra a Gambetta 700, e comparou lado a lado numa página descartável: o Title 1 em 800 tinha a mesma haste da Gambetta a 34 pt, e 700 e 800 pareciam mais escuros que o display. Ele recomendou 600 para todos os títulos, botões e títulos de navegação, com cerca de metade do tracking negativo; o agente principal aplicou.

### 31. Quanto dura uma reserva, e os dois tipos de loja
Eu disse que um item pago não deveria ficar guardado só por algumas horas, pedi uma pesquisa documental sobre como as lojas do Reino Unido guardam pedidos e separei a loja cujo POS compartilha o estoque da loja que o concierge precisa consultar. Um agente leu as políticas de retirada de Argos, Decathlon, John Lewis, Screwfix, Smyths, Beaverbrooks e Aesop e o Consumer Rights Act, e acrescentou isso à pesquisa documental. Eu defini três formas de levar um item e os prazos de cada uma (decisão 030) e os dois tipos de loja (decisão 031). Depois o agente desenhou os estados da loja v2 e o fluxo do app v5 com datas no lugar de "até as 16h"; ele não achou nenhuma política publicada de independentes pequenas, então a semana delas é uma suposição testada pela H6.

### 32. Situação dos quadros e o design system
Pedi que os quadros de identidade e de escala tipográfica mostrassem o que foi escolhido e agrupassem cada rodada. O agente acrescentou uma área "Onde está" no topo de cada quadro, o número da rodada em cada área, e contornos e selos verdes para os itens escolhidos e pré-selecionados; conferi as notas com o que eu tinha dito durante as rodadas. Depois ele abriu uma seção de Design system fora da Ideação, com uma visão geral e uma página de tipografia feita a partir da especificação da rodada 4, com amostras nas fontes escolhidas. A cor fica de fora até eu escolher uma paleta.

### 33. Cinzas quentes e acentos a partir de Oat e Brew
Pedi para manter Oat e Brew, da paleta I, e explorar cinco acentos que funcionem com eles, além de escalas de cinza quente no estilo do shadcn/ui, e acrescentei que preto e branco puros precisam funcionar com tudo isso. Um agente leu a documentação do shadcn/ui, do Tailwind, do Radix Colors e do Material, montou três escalas de cinza em OKLCH que vão do matiz do Oat ao do Brew e quatro conjuntos de cinco acentos, conferindo cada combinação com um script. Ele precisou escurecer o Tea teal e o Jam para passarem de 4,5:1 sobre o Oat, e viu que os botões no tint do modo escuro precisam de rótulo preto. Sugeriu Lata de chá com o Cinza biscoito; a escolha continua em aberto no quadro.

### 34. A reserva sem pagamento sai
Questionei se valia manter a reserva sem pagamento e perguntei se a pesquisa tinha alguma evidência cultural forte a favor dela. O agente conferiu a pesquisa documental: o dinheiro é 19,2% das transações do varejo, mas a Argos acabou com as reservas sem pagamento e nada na evidência mostra compradores dependendo delas. Decidi tirá-la (decisão 032). O agente a removeu do Define, das hipóteses (H6 e H12 reescritas), dos estados da loja v3 e do fluxo do app v6, onde a folha agora avisa que sem pagar não há reserva. No quadro de posicionamento das abas ele também corrigiu a opção D, cuja barra ficava espremida em cima do indicador do iPhone por um nome de classe que ela dividia com as tags pequenas.

## Falhas da IA

- Um primeiro rascunho de personas parecia pronto, mas era circular, porque o agente o construiu antes de o método estar certo. O agente revisor percebeu; o agente que o escreveu, não.
- As páginas de método foram escritas como se um pesquisador humano sozinho tivesse feito o trabalho, e esconderam os agentes até eu apontar isso.
- As ferramentas não alcançaram o Reddit, os comentários do TikTok nem o Nextdoor. O contorno (um arquivo mais páginas salvas à mão) me custou tempo.
- No começo, algumas citações do Trustpilot voltaram encurtadas por uma ferramenta de resumo e tiveram de ser buscadas de novo ou descartadas.
