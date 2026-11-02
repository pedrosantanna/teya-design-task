# Registro de decisões

As decisões que moldaram o processo, da mais antiga para a mais recente, cada uma com o que eu decidi, por quê e o que fica em aberto.

## 000 · Estágio do produto e profundidade
**2026-11-01 · Decidido**

Eu decidi tratar isto como um produto que ainda não existe: sem usuários, sem dados de uso e sem comerciantes com quem aprender. Por isso a descoberta começa de fora para dentro, com conversa pública, pesquisa documental e os produtos que as pessoas já usam. Não há analytics para ler nem clientes existentes para entrevistar.

Também é um take-home com orçamento de poucas horas, então cada etapa vai só até onde a próxima decisão precisa. Uma descoberta 0-to-1 completa entrevistaria compradores e lojistas, faria a etiquetagem com mais de uma pessoa e duraria semanas. Onde eu paro antes disso, a página diz, e o Define lista o que deveria ser validado em seguida.

## 001 · Descoberta antes da escolha do problema
**2026-11-01 · Decidido**

O brief pede que eu escolha Findability ou Transaction como foco principal. Eu adiei essa escolha para depois de uma rodada de descoberta sobre a high street, a rua comercial do bairro: quem são as lojas, como vendem hoje, quem compra nelas e por quê.

**Por quê:** eu queria que a posição pedida pelo brief saísse da evidência. Escolher antes de entender o espaço seria escolher por intuição.
**Em aberto:** Findability ou Transaction, a decidir ao fim da descoberta.

## 002 · Plataforma
**2026-11-01 · Decidido**

Eu não escolho mobile ou web de antemão. A plataforma decorre de como o problema escolhido for resolvido.

**Em aberto:** plataforma.

## 003 · Meio do protótipo
**2026-11-01 · Decidido**

O protótipo final (e uma aplicação funcionando, se fizer sentido) é construído em código. Uso Figma e Apple Freeform só para exploração, quando eu escolho. Os resultados deles podem ser anexados como material de processo, mas não são entregáveis, e o Figma não é fonte de handoff.

**Por quê:** é em código que eu trabalho neste processo, então desenhar e construir acontecem no mesmo lugar.

## 004 · Documentação e vídeo
**2026-11-01 · Decidido**

Tudo (descoberta, decisões, protótipo, app) fica neste repo e é publicado como um site de documentação hospedado. O site registra o que eu faço com os agentes de IA: a pesquisa, as decisões, o que voltou e o que eu mantive. Foi escrito para mim, para os agentes e para qualquer pessoa que entre no trabalho. O resultado para avaliação é o walkthrough gravado, e este registro é a evidência dele.

## 005 · Configuração dos agentes
**2026-11-01 · Decidido**

Eu criei o `AGENTS.md` como instruções compartilhadas, para que todo agente que trabalha no repo siga as mesmas regras: o agente principal, que também roda subagentes, e um segundo agente que eu uso para revisões e tarefas secundárias.

## 006 · Método de descoberta
**2026-11-01 · Decidido**

A descoberta tem quatro frentes de trabalho, todas restritas a Londres, com Hammersmith como exemplo trabalhado:

1. Uma netnografia do que compradores dizem em redes sociais públicas, seguindo o método de Kozinets.
2. Um mapa de empatia construído a partir desse material, usando o canvas da Strategyzer, mais duas dimensões propostas para segmentar compradores depois.
3. Benchmarks de produtos que já atendem esses compradores, com uma netnografia do que os usuários dizem sobre eles.
4. Uma revisão documental da própria high street: história, regulação, dados e notícias recentes.

**Por quê:** eu queria entender o espaço a partir de evidência. Toda afirmação sobre pessoas se apoia numa citação literal com handle, rede, data e link, só dos últimos 18 meses. Escolhi a netnografia porque ela monta essa base de evidência de forma rápida e barata, o que cabe num take-home. Ela ficou como o único método sobre compradores (decisão 015); a página de [método](discover/netnography/method.md) explica o trade-off.
**Escolha ética:** as citações mantêm o handle público do autor, porque o link já o expõe e o handle torna a evidência verificável. Contas privadas e grupos fechados ficam de fora.

## 007 · Formato do site de documentação
**2026-11-01 · Decidido**

O artifact é um site de documentação com uma barra lateral organizada por fase: primeiro Discover, depois Define, Develop e Deliver. Por enquanto usa um design neutro no estilo shadcn/ui, a ser personalizado depois. O Markdown em `docs/` é o conteúdo e o site o renderiza, então existe uma cópia só de tudo.

**Por quê:** o processo é tão entregável quanto o protótipo, e com uma estrutura de documentação quem avalia pode ir direto à parte que interessa.

## 008 · Idioma e voz
**2026-11-01 · Decidido**

O inglês é o idioma de origem do repo. A versão em português veio depois (decisão 014). A escrita segue regras explícitas contra padrões de IA, listadas no `AGENTS.md`.

## 009 · Redes da netnografia
**2026-11-01 · Decidido**

Eu escolhi as redes com os critérios de seleção de sites de Kozinets: o site é relevante para a pergunta, ativo na janela de tempo, interativo (as pessoas conversam entre si), substancial, heterogêneo e rico em dados descritivos? Por cima desses critérios acrescentei minha própria regra ética: só conteúdo público.

| Rede | Por quê | Peso |
| --- | --- | --- |
| Reddit | Threads longas e francas; subreddits de Londres e dos bairros; fácil de filtrar por data | Principal |
| TikTok | Compradores mais jovens: vlogs de high street, conteúdo de "shop local", threads de comentários | Alto |
| X | Reação a notícias (fechamentos, Hammersmith Bridge, business rates, o imposto sobre imóveis comerciais); mais debate público que hábitos de compra | Médio |
| Mumsnet, App Store, Trustpilot | Abertos para leitura sem conta; relatos longos de experiência e avaliações de produtos | Apoio |
| Instagram | Mais a voz das lojas; só comentários em contas locais | Opcional; no fim não foi coletado |
| Facebook, Nextdoor | Onde moradores mais velhos falam da sua high street, mas quase sempre em grupos fechados ou feeds só para vizinhos | Excluídos das citações |

**Por quê:** uma primeira passada automatizada não conseguiu ler Reddit, X nem TikTok (bloqueados ou atrás de login), o que puxou a voz para fontes mais velhas e cheias de reclamação. X e TikTok foram lidos depois pela minha sessão logada no navegador, só leitura (sem postar, curtir ou seguir), e o Reddit por um arquivo público (decisão 010).

## 010 · Acesso ao Reddit
**2026-11-01 · Decidido**

O Reddit bloqueou toda rota automatizada que eu tinha: a ferramenta de fetch, os dois navegadores e o JSON público. A API oficial agora exige uma aprovação que leva dias. Então o trabalho de campo no Reddit foi lido pelo Arctic Shift, um arquivo público do Reddit usado em pesquisa acadêmica, e depois conferido com páginas que eu salvei à mão do site ao vivo. Toda citação do Reddit leva um status: **verificada** (conferida com a página ao vivo) ou **via arquivo** (ainda não conferida). Duas citações foram descartadas porque a checagem ao vivo mostrou que tinham sido removidas. X e TikTok foram lidos numa segunda passada pelo meu navegador logado. As ferramentas não conseguiram ler os comentários do TikTok, então a evidência do TikTok é só de legendas. Posts que usavam a high street para argumentar sobre declínio nacional em termos raciais foram lidos, mas não citados.

## 011 · Tamanho das citações
**2026-11-01 · Decidido**

Os posts pertencem a quem os escreveu. Eu limito as citações à frase que carrega o ponto, cerca de 25 palavras no máximo, sempre com link para o original completo. Isso também segue o conselho de Kozinets de usar só as palavras de uma pessoa que o ponto exige.

## 012 · Método das proto-personas
**2026-11-01 · Decidido**

Os posts da netnografia são etiquetados, pontuados em duas dimensões (urgência da necessidade e etapa da compra) e clusterizados com k-means. Cada cluster vira uma proto-persona, descrita com os campos de persona de Lewrick, Link e Leifer. Um segundo agente etiqueta cada post às cegas, para que as pontuações possam ser conferidas. Três clusters tiveram a melhor silhueta média na configuração que escolhi: as duas dimensões com o mesmo peso, k de 2 a 5. Não mostrei que isso se mantém com outros pesos. Depois da decisão 019, com o eixo da etapa com metade do peso, três clusters continuam com o melhor resultado, e com o dobro, cinco.

**Por quê:** eu queria que as personas saíssem dos dados, e que as dimensões conversassem com a escolha do brief entre findability e transaction.
**Trade-off:** três grupos pequenos (11, 6 e 3 posts depois da decisão 019), cada um rastreável até seus posts. São proto-personas porque ninguém foi entrevistado.
**Nomes, gênero, idade:** nomes e gêneros são rótulos que eu escolhi para equilibrar o conjunto (duas mulheres, um homem). A idade fica de fora a menos que outra fonte a sustente. O "provavelmente 50 anos ou mais" da Ruth vem de pesquisas de opinião em Londres, porque os posts não falam pelos compradores mais velhos.

## 013 · Quem fez o quê
**2026-11-01 · Decidido**

Toda página abre com os principais aprendizados, a minha decisão, como a IA foi usada naquela etapa e os trade-offs. O detalhe de método fica em subpáginas para quem quiser. Um [log](process/ai-log.md) contínuo registra o que foi pedido a cada agente, o que voltou e o que foi descartado.

## 014 · Documentação bilíngue
**2026-11-01 · Decidido**

O inglês continua sendo a fonte. Cada página também tem uma versão completa em português do Brasil, escolhida num seletor no topo do site, que abre em inglês por padrão. A partir de agora, todo conteúdo novo é escrito nos dois idiomas, e o português é revisado com base no inglês. As citações ficam no idioma original nas duas versões. A mesma área do topo traz um controle de tema claro, escuro ou do sistema, que substitui o antigo rótulo de fase.

**Por quê:** este registro é para mim e para quem trabalha nele comigo, e algumas dessas pessoas leem português com mais conforto. Com o inglês como fonte, uma única versão vale como referência.

## 015 · Método de coleta de dados
**2026-11-02 · Decidido**

Para dados sobre compradores eu usei um método só, a netnografia, e parei aí. Entrevistas, um survey, observação na rua e um estudo de diário eram todos possíveis. Para um take-home, a netnografia era o jeito mais rápido e barato de conseguir evidência rastreável. A pesquisa documental e os benchmarks também coletaram dados, sobre a rua e sobre os produtos que já existem. Usei a pesquisa documental sobre a high street para aprender o contexto. Ela cita alguns números publicados sobre compradores, como a forma de chegar à rua e a pesquisa de opinião por trás da idade de Ruth, mas não coletou nada dos compradores.

Posts públicos são dados atitudinais: o que as pessoas dizem que pensam, sentem e fizeram. O mapa de empatia e as proto-personas se apoiam neles, então carregam a distância conhecida entre o que as pessoas dizem e o que fazem. Num produto já estabelecido, eu acrescentaria dados comportamentais em seguida. Num produto 0-to-1, prefiro chegar rápido a uma ideia testável e colocá-la na frente de compradores. É desse teste que viria a evidência comportamental.

## 016 · Etapa da compra no lugar de ponto de falha
**2026-11-02 · Decidido**

A segunda dimensão era "ponto de falha", com quatro categorias (não conseguiu saber, não estava lá, não valeu a pena, não conseguiu pegar) pontuadas à mão. Ela parecia uma lista de categorias e não dava para medir como escala. Troquei pela etapa da compra em que a tentativa parou, contada na ordem da compra: 1 saber, 2 encontrar, 3 aceitar, 4 levar. As etapas têm espaços iguais, na mesma faixa de 0 a 10 da urgência da necessidade.

**Efeito:** os mesmos posts caem nos mesmos três clusters. A silhueta média passou de 0,55 para 0,57.

## 017 · Conceito de um agente concierge para a high street
**2026-11-02 · Decidido**

Depois do Discover, escolhi um conceito só para o Sam e a Jess: um app para quem compra cuja entrada principal é um agente. Ele responde a partir do caixa da loja quando o estoque é compartilhado e, quando não é, pergunta às lojas prováveis; depois deixa o comprador reservar, pagar, retirar ou receber em casa. A exploração clássica por loja e categoria fica como segunda entrada. A entrega cobre o lado de quem compra; o lado da loja é suposto.

**Por quê:** a dor mais forte é não saber antes de sair de casa (A1), e uma confirmação da loja é a resposta mais direta a ela sem um catálogo que a maioria das lojas não tem (F8).
**Posição no brief:** findability primeiro. A transaction é a etapa que fecha o ciclo, e é nela que aparecem as restrições do outro problema.
**Em aberto:** se as lojas respondem rápido o bastante (H1) decide se o concierge funciona. Isso é testado à mão antes de qualquer construção.

## 018 · Por que o concierge é um agente
**2026-11-02 · Decidido**

Fiz do concierge um agente, montado como vários agentes por trás de uma conversa só. Espero quatro coisas dele: uma interface para muitas tarefas, a espera pelas lojas resolvida para quem compra, pedidos que ele executa depois e alcance além de um app (WhatsApp, ou o assistente de AI do próprio comprador via MCP). O protótipo é o app, onde o concierge ganha uma interface feita só para esse trabalho.

**Por quê:** as lojas demoram e são difíceis de alcançar, e o trabalho de quem compra (achar, segurar, pagar, retirar) tem várias etapas. Uma conversa que corre atrás das lojas por ele combina mais com isso do que uma tela por etapa.
**Em aberto:** essa é minha principal hipótese de produto, e o Discover tem pouca evidência sobre ela. H3 (perguntar ganha de explorar), H4 (o comprador aceita a espera), H8 (pedidos deixados com antecedência) e H10 (canais) testam isso. Se H3 ou H4 falhar, explorar lojas e categorias vira a tela principal.

## 019 · @London_W4 fora dos clusters
**2026-11-02 · Decidido**

Uma revisão externa mostrou que o post de @London_W4 é uma caminhada pela King Street e uma impressão sobre ela, sem nenhuma compra de quem postou, então não atende ao codebook. Tirei o post e rodei a clusterização de novo.

**Efeito:** três clusters continuam com o melhor resultado (silhueta média 0,55, contra 0,54 para dois, quatro e cinco). Sam e Jess mantêm seus posts; a Ruth passa de quatro posts para três, todos de compras de rotina. São 20 posts clusterizados em vez de 21.
**Em aberto:** a Ruth agora se apoia em três posts, o que a deixa ainda mais claramente como a persona com menos evidência.

## 020 · Prova de conceito com lojas antes de mais pesquisa
**2026-11-02 · Decidido**

Não vou entrevistar lojistas antes de construir. Vou construir uma prova de conceito do agente concierge, levá-la a cerca de dez lojas da King Street e passar as hipóteses por ela com lojas e compradores. Convidar as lojas também serve de descoberta sobre como elas trabalham, e as lojas podem trazer os primeiros compradores.

**Por quê:** um protótipo do agente leva dias, e o que uma loja faz com um pedido real responde à H1, à H6 e à H9 melhor do que o que ela diria numa entrevista.
**Em aberto:** se o agente fica pronto a tempo. O concierge feito à mão continua como alternativa. As lojas como canal de aquisição são uma suposição.

## 021 · App nativo, iOS primeiro
**2026-11-02 · Decidido**

O app de quem compra é um app móvel nativo. Sigo primeiro as Human Interface Guidelines da Apple e depois o Material Design, o mais de perto possível. Quando o trabalho de marca pede uma mudança, ou quando um padrão existe no iOS e não no Android, fico com o iOS. O lado da loja não tem interface neste take-home.

**Por quê:** os padrões nativos são o que os compradores já conhecem, e partir de uma diretriz só mantém os wireframes consistentes.
**Em aberto:** a stack do protótipo.

## 022 · Canvas de ideação
**2026-11-02 · Decidido**

A ideação na Develop é um grupo de páginas. Algumas são texto; outras são canvas com fundo pontilhado, zoom e movimento como no FigJam, onde wireframes e diagramas ficam lado a lado, ligados por setas. Cada canvas tem um arquivo HTML próprio ao lado de uma página em Markdown com o título e o resumo. Os itens de um canvas podem ser selecionados, mas não movidos. O texto da interface nos wireframes fica em inglês nos dois idiomas do site, porque o app é para Londres; notas e rótulos seguem o idioma do site.

**Por quê:** fluxos e diagramas de estados se leem melhor no espaço do que em texto, e um canvas reutilizável mantém todos eles no mesmo registro.
**Em aberto:** um painel de inspeção, que por enquanto abre na seleção com detalhes básicos.

## 023 · Receita por pagamentos, rede e destaque pago
**2026-11-02 · Decidido**

Defini o modelo de negócio como hipóteses num cenário: o concierge pertence a um provedor de pagamento com POS próprio. A receita vem dos pagamentos feitos no app, das lojas que entram na rede do provedor para recebê-los, de mais vendas para as lojas que já estão nessa rede (o que faz o POS valer a pena) e do destaque e do alcance pagos. Não há comissão sobre a venda.

**Por quê:** a comissão de 14–35% dos apps de delivery é o custo de que as lojas independentes reclamam (F9). Um provedor de pagamento ganha no próprio pagamento, e uma loja que entra traz todas as suas vendas.
**Em aberto:** H12 a H16. Se a lista mostra só as lojas no POS do provedor ou todas as lojas; a prova de conceito começa aberta e registra quais lojas estão na rede.

## 024 · O escopo é a área do comprador
**2026-11-02 · Decidido**

O concierge trabalha a partir da localização e do prazo do comprador, em todas as high streets e fileiras de lojas ao alcance. As high streets agrupam lojas para explorar e para o destaque pago; elas não limitam a busca. Uma loja entra no escopo se é pequena, independente e está ao alcance. A prova de conceito sai da King Street sozinha para cerca de dez lojas a até 15 minutos a pé da Blythe Road, o que inclui a King Street (isso muda o local da decisão 020).

**Por quê:** a partir da Blythe Road, seis ruas comerciais ficam a menos de 15 minutos a pé. Prender o comprador a uma delas esconderia as outras, e uma rua com poucas lojas responderia à maioria das buscas com nada.
**Em aberto:** até onde os compradores vão para cada tipo de necessidade, o que o prazo só aproxima. A H16 registra com que frequência eles compram além da distância a pé.

## 025 · Um chat por tarefa
**2026-11-02 · Decidido**

Cada pedido é um chat com o concierge e reúne o que o comprador pediu de uma vez. Quando os itens precisam de dias ou tipos de loja diferentes, o concierge propõe separá-los em pedidos distintos e o comprador decide com um toque. As lojas aparecem dentro do chat como respostas, nunca como chats próprios, e uma compra fica no chat de onde veio. A aba Requests lista os chats com um status por linha: o status do item que vai precisar do comprador primeiro.

**Por quê:** a unidade continua sendo as palavras do próprio comprador, e a separação só acontece quando um status por linha deixaria de ser verdade. Um chat por produto fragmenta uma lista de compras; um chat por loja devolve ao comprador o trabalho que o concierge existe para fazer.
**Em aberto:** com que frequência a sugestão de separar acerta, e o nome da aba ("Requests" por enquanto).

## 026 · Botão de Requests à esquerda da barra de pedido
**2026-11-02 · Decidido**

A home não tem abas. Um botão redondo de Requests fica à esquerda da barra de pedido, com uma contagem quando um pedido precisa do comprador. Ele abre Requests em tela cheia, crescendo a partir do botão (a transição de zoom no iOS, o container transform no Android), e Requests encolhe de volta para dentro dele na saída. Uma versão anterior abria como uma folha; escolhi tela cheia para a lista ter a tela inteira. Isso substitui as abas Nearby e Requests da v2 do fluxo do app (opção G em Posição das abas).

**Por quê:** mantém a barra de pedido grande, que faz de pedir a entrada principal, e põe Requests sob o polegar. À esquerda, fica longe do botão de enviar durante a digitação.
**Em aberto:** um ícone de conversa diz menos que um rótulo, então a contagem e uma dica no primeiro uso precisam segurar isso; um terceiro modo pediria outro padrão.

## 027 · Fontes do sistema só como fallback
**2026-11-02 · Decidido**

As fontes do app funcionam nas duas plataformas. SF Pro (iOS) e Roboto (Android) são só fallback, nunca a fonte escolhida, porque nenhuma existe na outra plataforma. Os testes de tipografia combinam fontes de display e de corpo que vão junto com o app.

**Por quê:** uma fonte de marca precisa ser igual no iOS e no Android.
**Em aberto:** as fontes próprias precisam ser registradas no Dynamic Type e na escala de fonte do Android, e a licença delas conferida antes do Deliver.

## 028 · Uma sans para leitura, display só onde aparece
**2026-11-02 · Decidido**

Tudo o que o comprador lê, e a conversa acima de tudo, usa uma sans forte: a Switzer é a favorita por enquanto. Uma fonte de display, se houver, aparece só no splash, na tela de entrada, no título da home e em títulos de destaque de widgets, como o nome de uma loja num cartão. A conversa nunca mistura duas fontes. A Pally saiu dos testes.

**Por quê:** uma conversa é lida em tamanhos pequenos e rápido; uma segunda fonte ali acrescenta ruído sem acrescentar voz.
**Em aberto:** qual fonte de display, se houver. A Gambetta tem a melhor nota com a Switzer na rodada 3; a Switzer sozinha continua sendo uma opção.

## 029 · Gambetta no display, Switzer no resto
**2026-11-02 · Decidido**

A Gambetta 700 é a fonte de display e a Switzer a fonte de texto, com a especificação em Escala tipográfica, rodada 4. O tracking é definido por fonte e por tamanho: a Gambetta aperta conforme cresce (−0,01 a −0,02 em), a Switzer fica em 0 no texto e abre um pouco abaixo de 15 pt; títulos, botões e títulos de navegação em Switzer usam 600, o que os mantém firmes, mas mais leves que a Gambetta 700. A Gambetta aparece só onde a decisão 028 permite, no máximo uma vez por tela e nunca abaixo de 26 pt; o nome de uma loja vai em Gambetta só na página dela (34 pt) e no cartão de pronto para retirar (26 pt).

**Por quê:** uma serifada no display dá aos títulos uma voz editorial britânica; uma sans forte mantém tudo o que o comprador lê legível e consistente no iOS e no Android.
**Em aberto:** as fontes precisam ser registradas no Dynamic Type e na escala de fonte do Android, e a licença da ITF conferida para embutir no app.

## 030 · Três formas de levar um item, e quanto dura uma reserva
**2026-11-02 · Decidido**

O comprador pode reservar sem pagar (guardado até o fim do próximo dia de funcionamento, só onde a loja aceitar), pagar e a loja guardar (7 dias no padrão, com um dia de retirada escolhido pelo comprador, menos para perecíveis, até 14 dias se a loja aceitar, uma prorrogação de 7 dias, reembolso automático se ninguém retirar), ou pagar e a loja entregar com o próprio serviço. A entrega pela loja fica fora do app; o concierge só acompanha o status, e esse fluxo está mapeado, não desenhado.

**Por quê:** as lojas do Reino Unido guardam pedidos pagos para retirada por cerca de uma semana (Argos e Decathlon 7 dias, John Lewis 10, Screwfix 21), e reservas sem pagamento são curtas (cerca de 2 dias) ou deixaram de existir; uma reserva de poucas horas seria mais curta do que o comprador espera. Fontes na pesquisa documental, "Quanto tempo as lojas guardam um pedido para retirada".
**Em aberto:** se as independentes pequenas aceitam uma semana com uma unidade em estoque; a H6 testa isso.
**Fechado pela 032:** se vale manter a reserva sem pagamento. Eu questionei: ela existe por comodidade e para quem paga em dinheiro (19,2% das transações do varejo em 2024), mas aí o pagamento acontece fora do app, a loja fica com o risco de a pessoa não aparecer, e a pesquisa documental não encontrou um hábito forte por trás dela (a Argos acabou com as reservas sem pagamento; as lojas que mantêm guardam por cerca de dois dias). A alternativa é exigir o pagamento em toda reserva. A H12 conta qual das duas os compradores escolhem quando as duas são oferecidas.

## 031 · Lojas conectadas e lojas consultadas
**2026-11-02 · Decidido**

Existem dois tipos de loja. Uma loja conectada compartilha o estoque por item pelo POS: o concierge responde na hora e faz a reserva no POS. Uma loja consultada não tem dados de estoque: o concierge pergunta pelo WhatsApp ou pelas mensagens do POS, e a reserva é confirmada pela resposta dela. As duas aparecem nas mesmas respostas, marcadas pela origem da resposta.

**Por quê:** a resposta na hora e a resposta perguntada são promessas diferentes; o comprador precisa saber qual das duas está lendo.
**Em aberto:** quantas lojas de uma rua são conectadas (H11).

## 032 · Sem reserva sem pagamento
**2026-11-02 · Decidido**

Tirei a reserva sem pagamento. Um comprador que recebe um sim paga e a loja guarda o item, ou paga e a loja entrega. Quem não quer pagar vai até a loja sem reserva e pode encontrar o item vendido. O concierge avisa isso na resposta.

**Por quê:** a reserva sem pagamento existia por comodidade e para quem paga em dinheiro, mas o pagamento acontece fora do app, a loja fica com o risco de a pessoa não aparecer, muitas vezes com a única unidade que tem, e a pesquisa documental não encontrou um hábito forte por trás dela (a Argos acabou com as reservas sem pagamento; a Beaverbrooks guarda por 2 dias). Duas formas também são mais simples de explicar numa resposta só.
**Em aberto:** se quem reservaria passa a pagar ou só vai até a loja; a H12 agora conta quantos sins terminam numa reserva paga. Quem paga em dinheiro é um ponto cego: ninguém assim aparece na netnografia.

## Ainda em aberto

- Estrutura do repo (app único ou monorepo): decidir quando a construção começar e o formato dela estiver claro.
- Stack do protótipo: decidir no Deliver.
- Fluxo guiado por specs: se vale escrever specs antes de construir, e quão leves elas devem ser.
