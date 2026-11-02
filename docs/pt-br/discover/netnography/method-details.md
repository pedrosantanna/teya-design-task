# Método em detalhe

Segui a netnografia de Kozinets, li o Reddit por um arquivo público e conferi cada citação com páginas ao vivo que eu salvei, e etiquetei as citações com uma lista de 14 etiquetas. A versão curta está em [método](method.md).

## Netnografia

Netnografia é o nome que Kozinets dá à pesquisa qualitativa em redes sociais que busca entender a cultura visível nos posts, threads e rastros das pessoas. Ele a apresenta como um procedimento definido, com etapas nomeadas ([Kozinets 2020, *Netnography: The Essential Guide*, 3ª ed., prévia da editora](https://api.pageplace.de/preview/DT0400.9781526482365_A37042502/preview-9781526482365_A37042502.pdf)). [Fenton e Parry](https://eprints.bournemouth.ac.uk/37932/) resumem seus quatro elementos definidores: um foco cultural, dados de redes sociais, envolvimento imersivo do pesquisador e um conjunto de práticas para conduzi-la. O livro descreve seis movimentos de procedimento. Os nomes abaixo seguem artigos posteriores, como [Kozinets e Gretzel (2024)](https://doi.org/10.1016/j.annals.2023.103693), que chamam o último de incarnation; o livro o chama de instantiation.

| Movimento | O que envolve | O que eu fiz |
| --- | --- | --- |
| Initiation | Formular a pergunta, planejar os sites, resolver a ética | Escrevi a pergunta de pesquisa; só posts públicos |
| Investigation | Encontrar e salvar rastros existentes | Busquei em subreddits locais e de Londres e no Mumsnet; salvei threads com data e hora |
| Interaction | Conversar com pessoas (opcional) | Nenhuma. Só leitura |
| Immersion | Manter um diário reflexivo durante a leitura | Um agente leu cerca de 30 threads completas e anotou frases recorrentes durante a leitura. Não há diário separado |
| Integration | Etiquetar, tematizar, interpretar | 14 etiquetas, 10 temas, um mapa de empatia, duas dimensões |
| Incarnation | Comunicar os achados | As páginas de netnografia desta documentação |

## Por que netnografia

O trabalho precisava de uma base de evidências sobre compradores, rápida e quase sem custo, dentro das poucas horas que um take-home permite. As pessoas já disseram muita coisa em público, dá para coletar em horas, e cada afirmação continua rastreável até um post datado.

Os limites são claros. As pessoas postam quando algo as irrita ou encanta, então os posts mostram o que importa para elas e dizem pouco sobre a frequência com que acontece. Não dá para fazer uma pergunta de acompanhamento a ninguém, e quem não posta fica de fora. Os posts são atitudinais: mostram o que as pessoas dizem que pensam e fazem. Para um produto que ainda não existe, eu os transformaria rápido numa ideia testável e buscaria evidência de comportamento na reação de compradores a ela ([método](method.md), decisão [015](../../decision-log.md)). A decisão [000](../../decision-log.md) registra como dimensionei a profundidade para este exercício.

## Sites

Kozinets pede que um site de campo seja relevante, ativo, interativo, substancial, heterogêneo e rico em dados descritivos. Acrescentei uma regra minha: só conteúdo público. A decisão [009](../../decision-log.md) registra a escolha.

- **Reddit** foi o site principal. Os subs locais (r/HammersmithandFulham, r/hammersmith, r/chiswick, r/shepherdsbush, r/fulham, r/ealing, r/acton) têm pouco movimento, então a maior parte das vozes do oeste de Londres veio de threads no r/london sobre a região, mais r/AskUK e r/CasualUK para alguns contrastes de escala nacional.
- **Mumsnet** deu threads longas, em primeira pessoa, que dá para ler sem conta. Puxa para mães e raramente diz onde quem posta mora.
- **X e TikTok** foram lidos numa segunda passada em 1º de novembro de 2026, pelo meu navegador logado, só leitura. A busca no X foi limitada à janela com `since:` e `until:`; as datas do TikTok vêm do ID do vídeo, que codifica a hora do upload. As ferramentas não conseguiram ler os comentários do TikTok, então a evidência do TikTok são legendas de vídeo, escritas por criadores e por lojas. As duas redes renderam muito menos conversa de comprador que o Reddit; o tema 10 nos [achados](findings.md) cobre o que elas mostraram.
- **Instagram e Nextdoor** não foram coletados. O Nextdoor é provavelmente onde os moradores de Hammersmith mais perguntam "is X open" (X está aberto?), então a ausência dele é a maior lacuna. Grupos do Facebook ficaram de fora por serem fechados.

### Acesso ao Reddit e checagem

O reddit.com recusou todas as rotas automáticas que os agentes tentaram (fetch, navegador embutido, curl). O conteúdo do Reddit foi lido pelo arquivo público [Arctic Shift](https://arctic-shift.photon-reddit.com/), que devolve cada post ou comentário com autor, horário e ID. Depois eu salvei 217 posts da busca ao vivo do Reddit e 21 threads de comentários completas em 1º de novembro de 2026, e `scripts/verify_reddit_quotes.py` conferiu o texto, o autor e a data de cada citação com esses arquivos. Duas citações foram descartadas porque a checagem ao vivo mostrou que tinham sido removidas. Cada card de citação traz um status:

- `verified` (verificada): texto, autor e data batem com o arquivo salvo do Reddit ao vivo, ou a citação foi lida diretamente no Mumsnet, no X ou no TikTok.
- `archive` (via arquivo): coletada do Arctic Shift e não conferida no site ao vivo. Uma citação está nesse estado, porque o comentário dela fica numa parte da thread que o arquivo salvo não carregou.

## Formato do mapa de empatia

Usei a versão de seis quadros do *Business Model Generation* de Osterwalder e Pigneur ([pp. 130–131](https://relayto.com/explore/business-model-generation-flipbook-r2k3tfx35p0cg/J1RVxTlK137)), que eles creditam a Dave Gray e à XPLANE. Gray depois [revisou o mapa](https://medium.com/the-xplane-collection/46df22df3c8a) com um quadro de objetivo e sem dores e ganhos. Mantive o canvas mais antigo porque dores e ganhos se traduzem direto em decisões de produto.

| Quadro | Pergunta |
| --- | --- |
| Vê | Como é o ambiente dessa pessoa, e que ofertas e problemas ela encontra? |
| Ouve | Quem e o que a influencia? |
| Pensa e sente | O que importa para ela que talvez não diga em público? O que a preocupa? |
| Diz e faz | Como ela age em público, e onde isso entra em choque com o que pensa? |
| Dores | Frustrações, obstáculos, riscos que teme |
| Ganhos | O que ela quer, e como mede o sucesso |

## Protocolo

**Pergunta.** Como os compradores da high street de Londres, Hammersmith e o oeste de Londres primeiro, decidem entre lojas independentes locais, redes e compra online, e onde falha a tentativa de descobrir "what's available nearby right now" (o que está disponível por perto agora)?

**Termos de busca**, por subreddit e limitados à janela: `high street`, `independent`, `shops`, `local shop(s)`, `Amazon`, `cash only`, `click and collect`, `King Street`, `Hammersmith`, `Shepherd`, `Chiswick`, `Fulham`, `Broadway`, `high road`, `butcher`, `hardware`, `corner shop`, `open on Sunday`, `open late`, `in stock`, `where can I buy`, `Westfield`. No Mumsnet busquei `high street`, `independent shops`, `Amazon`, `Hammersmith` e `Chiswick High Road`.

**Incluído:** posts datados de 1º de maio de 2025 a 1º de novembro de 2026 pela data da plataforma; públicos e legíveis sem login; com voz de comprador em primeira pessoa ou observação direta de compras locais; com handle e URL que pudessem ser conferidos.

**Excluído:** promoção feita por lojistas, posts de notícia sem voz de comprador, conteúdo apagado, qualquer coisa sem data ou anterior à janela (várias threads fortes do Mumsnet sobre Hammersmith e Chiswick de 2019 a 2024 caíram por isso) e avaliações de restaurante, a menos que tocassem em apoiar o comércio local ou em entrega. Uma exceção declarada: o tema 10 dos [achados](findings.md) mostra legendas do TikTok escritas por criadores, lojas e um organizador de mercado, para ilustrar o que essa rede carrega. Elas estão marcadas como conteúdo promocional e não contam como evidência de comprador.

**Geografia.** Cada citação tem o rótulo oeste de Londres, Londres toda ou Reino Unido todo. As citações de escala nacional ficaram limitadas a cerca de um sexto do conjunto e só serviram para reforçar algo que os dados de Londres já mostravam.

**Etiquetagem.** A codificação aberta produziu 14 etiquetas. Cada citação recebeu de uma a três. As etiquetas foram depois agrupadas em nove temas a partir de Reddit e Mumsnet, mais um décimo vindo da passada no X e no TikTok. Avaliei a força de cada tema por quantas citações, quantas redes, quão recentes e quão específicas do oeste de Londres.

| Etiqueta | Significado |
| --- | --- |
| `stock-visibility` | Não saber se uma loja próxima tem o item; ligar, perguntar por aí |
| `opening-hours` | Não saber se uma loja está aberta; horários que não encaixam; Google ou Facebook errados |
| `urgency` | Uma necessidade específica, com prazo |
| `online-default` | Desistir e pedir online |
| `delivery-collect` | Click and collect (compra online, retirada na loja), Deliveroo, entrega, pontos de retirada de encomendas |
| `discovery` | Como as pessoas descobrem lojas: Reddit, Google, boca a boca |
| `chains-vs-indie` | Comparar lojas independentes e redes |
| `support-local` | O apelo moral do "use them or lose them" (use ou perca) |
| `price` | Preço mais alto do comércio local, comparação de preço |
| `expertise-range` | O que só as lojas independentes oferecem: variedade, cortes, orientação |
| `decline-closure` | Fechamentos, pontos vazios, lojas perdidas |
| `place-identity` | O que uma high street significa para quem a usa |
| `cash-card` | Atrito de lojas que só aceitam dinheiro |
| `access-transport` | Estacionamento, deslocamento, Hammersmith Bridge |

## Ética

Tudo o que foi citado era público e legível sem conta, e ninguém foi contatado. Grupos fechados e contas privadas ficaram de fora. Os handles ficam ao lado das citações porque o link já os expõe e isso permite que qualquer pessoa confira a evidência (decisão [006](../../decision-log.md)). Kozinets alerta que handles pseudônimos podem levar até as pessoas, então as citações são curtas (menos de cerca de 25 palavras, cortadas com "…", nunca parafraseadas nem costuradas), e nenhum dos temas é sensível.

## Limites

- O Reddit puxa para um público mais jovem, masculino e que mora de aluguel, e os upvotes premiam ironia e reclamação. O Mumsnet puxa para mães.
- Faltam compradores mais velhos, que preferem pagar em dinheiro vivo ou não estão online, e talvez sejam eles que mais usam a high street.
- Não há dado interativo. Ninguém foi consultado sobre um app; tudo é o que as pessoas disseram espontaneamente.
- Os subs locais têm pouco movimento. r/hammersmith e r/shepherdsbush tiveram dois posts cada na janela, então a evidência de "Hammersmith" depende de threads do r/london sobre o bairro.
- Alguns eventos dominam. O eclipse de agosto de 2026 e a onda de calor de junho de 2026 produziram a maior parte dos posts de estoque urgente. Eu os li como experimentos naturais de achar estoque local rápido.
- O TikTok é só legenda. Os comentários, onde os compradores respondem, não puderam ser lidos, e as legendas são escritas para promover um lugar ou uma loja.

Próximo: [achados](findings.md), o [mapa de empatia](empathy-map.md) e as [dimensões propostas](dimensions.md). Lista completa de links em [fontes](../sources.md).
