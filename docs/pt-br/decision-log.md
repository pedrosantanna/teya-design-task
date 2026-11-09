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

A Gambetta 700 é a fonte de display e a Switzer a fonte de texto, com a especificação em Escala tipográfica, rodada 4. O tracking é definido por fonte e por tamanho: a Gambetta aperta conforme cresce (−0,01 a −0,02 em), a Switzer fica em 0 no texto e abre um pouco abaixo de 15 pt; títulos, botões e títulos de navegação em Switzer usam 600, o que os mantém firmes, mas mais leves que a Gambetta 700. A Gambetta aparece só onde a decisão 028 permite, no máximo uma vez por tela e nunca abaixo de 26 pt; o nome de uma loja vai em Gambetta só na página dela (34 pt) e dentro do cartão de compra quando ela está pronta para retirar (26 pt), que é o mesmo cartão de compra, não um segundo desenho.

**Por quê:** uma serifada no display dá aos títulos uma voz editorial britânica; uma sans forte mantém tudo o que o comprador lê legível e consistente no iOS e no Android.
**Em aberto:** as fontes precisam ser registradas no Dynamic Type e na escala de fonte do Android, e a licença da ITF conferida para embutir no app.

## 030 · Três formas de levar um item, e quanto dura uma reserva
**2026-11-02 · Decidido**

O comprador pode reservar sem pagar (guardado até o fim do próximo dia de funcionamento, só onde a loja aceitar), pagar e a loja guardar (7 dias no padrão, com um dia de retirada escolhido pelo comprador, menos para perecíveis, até 14 dias se a loja aceitar, uma prorrogação de 7 dias, reembolso automático se ninguém retirar), ou pagar e a loja entregar com o próprio serviço. A entrega pela loja fica fora do app; o concierge só acompanha o status, e esse fluxo está mapeado, não desenhado.

**Por quê:** as lojas do Reino Unido guardam pedidos pagos para retirada por cerca de uma semana (Argos e Decathlon 7 dias, John Lewis 10, Screwfix 21), e reservas sem pagamento são curtas (cerca de 2 dias) ou deixaram de existir; uma reserva de poucas horas seria mais curta do que o comprador espera. Fontes na pesquisa documental, "Quanto tempo as lojas guardam um pedido para retirada".
**Em aberto:** se as independentes pequenas aceitam uma semana com uma unidade em estoque; a H6 testa isso.
**Fechado pela 032:** se vale manter a reserva sem pagamento. Eu questionei: ela existe por comodidade e para quem paga em dinheiro (19,2% das transações do varejo em 2024), mas aí o pagamento acontece fora do app, a loja fica com o risco de a pessoa não aparecer, e a pesquisa documental não encontrou um hábito forte por trás dela (a Argos acabou com as reservas sem pagamento; as lojas que mantêm guardam por cerca de dois dias). A alternativa é exigir o pagamento em toda reserva. A H12 conta qual das duas os compradores escolhem quando as duas são oferecidas.

**Substituída em parte pela 037:** o comprador compra, sem reserva sem pagamento, e a loja define o prazo de retirada.

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

## 033 · Uma marca provisória
**2026-11-02 · Provisória**

O ícone do app é um terrier cuja boca é o toldo de uma loja: orelhas dobradas e baixas, dois olhos em ponto, um nariz apoiado em cinco listras. Eu o desenhei à mão no Figma a partir dos dois primeiros testes de ícone do agente, baixando as orelhas e trocando as sobrancelhas por olhos. Ele tem dois tons, um de mais contraste e um de menos contraste, sobre Oat e Brew por enquanto. É a primeira decisão de identidade; o design system tem uma página para ela.

**Por quê:** ele junta as duas direções de que eu mais gostei, o terrier que entra nas lojas e os toldos da parade, e se lê como um rosto antes de se ler como uma loja.
**Em aberto:** o desenho final e uma versão mais simples para tamanhos pequenos, as cores (elas seguem a paleta) e o nome.
**Atualização, no mesmo dia:** o cachorro é um retriever, não um terrier: uma raça britânica cujo trabalho é sair e trazer algo de volta, como o concierge. Os nomes de retriever estão na página de identidade.
**Escopo:** parei a marca nesta versão. Com mais tempo eu a desenvolveria mais, talvez de outro jeito, mas o brand não é o foco do exercício e o resultado é bom o bastante para dar uma cara ao app.

## 034 · Cinza biscoito como neutro
**2026-11-02 · Provisória**

O neutro do app é o Cinza biscoito, da rodada 4 do quadro de identidade: uma escala em OKLCH que vai do matiz do Oat ao do Brew com cerca de 60% do croma deles, com fundo #FCFAF6, borda #E0DCD5, texto secundário #5B5249 e texto principal #0E0A08. Texto preto puro e branco sobre escuro passam com ele. Os acentos não estão escolhidos. A Caixa de correio foi minha primeira pista; não gostei da Slate roof dela e pedi uma quinta cor mais clara e mais saturada, depois achei as outras paletas melhores que a Caixa de correio. A rodada 5 mostra a Caixa de correio com três candidatas e seis paletas saturadas da rodada 2 sobre o Cinza biscoito.

**Por quê:** quente o bastante para ficar ao lado da marca sem emenda, discreto o bastante para qualquer conjunto de acentos levar a cor.
**Em aberto:** o conjunto de acentos. A marca fica em preto e branco até lá.
**Substituído:** os valores de fundo, borda e texto acima foram trocados nas rodadas 8 e 9; os atuais estão na página [Cor](develop/design-system/colour.md). O fundo claro mudou de novo na 045 (#EEE9E2, L 0,935) e o modo escuro na 051.

## 035 · O app se chama Snuffle
**2026-11-02 · Decidido**

O app do comprador é Snuffle. Um cachorro faz "snuffle" quando trabalha o chão com o nariz; o snuffle mat esconde petiscos para o cachorro achar pelo cheiro. O site da documentação agora leva o nome e a marca.

**Por quê:** é sonoro, lúdico e remete a procurar e encontrar coisas, que é o trabalho do concierge; vem do retriever da marca. Saiu de três rodadas de nomes (direções de conceito, nomes de retriever, palavras de farejar e buscar), com palavras descartadas por conflito ou por segundo sentido negativo.
**Em aberto:** uma busca de marca registrada (UK IPO) e uma conferência na App Store; até agora só foram feitas buscas rápidas na web.

## 036 · Pastel parade com Índigo no Cinza biscoito
**2026-11-02 · Decidido**

Os acentos são a Pastel parade com Índigo: o Índigo para texto, botões e tint, e Pêssego, Pistache, Manteiga e Lavanda como preenchimentos e badges tonais. O neutro é o Cinza biscoito no modo claro e no escuro. Bordas são evitadas: as superfícies se separam pela luminosidade (fundo claro em L 0,95 com cartões brancos, 1,16:1; cartões escuros em L 0,235, 1,18:1), e a borda aparece só onde uma superfície ainda precisar.

**Por quê:** dos três temas testados nas mesmas telas, a Pastel parade com Índigo foi a mais calma, e os preenchimentos claros dela dão badges tonais que funcionam nos dois modos. Na rodada 7, um cartão branco sobre o fundo claro ficava em 1,04:1 sem borda, pouco demais.
**Atualização, rodada 9:** o fundo claro passa para L 0,96 e mantém o croma da rodada 8 (#F4F1ED), com superfícies secundárias em L 0,915; os cartões continuam brancos e se destacam a 1,13:1. O fundo da rodada 8 parecia um pouco escuro. As versões mais saturadas (×1,8 e ×2,5) e a menos saturada (45%) foram descartadas. O modo escuro não muda: mantém as superfícies da rodada 8, já que o croma não mudou.
**Substituído:** o fundo em L 0,95 e o passo de 1,16:1 do cartão no primeiro parágrafo foram trocados pela rodada 9: L 0,96 (#F4F1ED) e 1,13:1. A decisão 045 moveu depois o fundo claro para #EEE9E2 (L 0,935), e a 051 o modo escuro; a página [Cor](develop/design-system/colour.md) tem os valores atuais.

## 037 · Comprar, depois retirar
**2026-11-03 · Decidido**

A ação do comprador é Buy (comprar), não Hold (reservar). "Hold" pode ser lido como reserva grátis ou como um passo antes da compra, e deixa o comprador sem saber se já comprou. O comprador toca em Buy e paga uma vez com Apple Pay. Numa loja conectada, o pagamento é cobrado na hora, porque o POS tem o estoque. Numa loja consultada, o valor só é autorizado e é cobrado quando a loja responde que separou o item; se a loja não confirma em 10 minutos, a autorização cai e o comprador é avisado. Cada loja define por quanto tempo guarda um item comprado: 7 dias por padrão, ou 14 ou 30, e o mesmo dia ou o seguinte para perecíveis; vale uma extensão do mesmo tamanho. Comprar não é reservar: o item é do comprador assim que a loja confirma. Se ninguém retira até o fim do prazo, o pedido é cancelado e o comprador recebe o reembolso integral automaticamente, como fazem as grandes redes, e a loja volta a vender o item. O comprador vê a data antes de tocar em Buy ("Collect by Mon 9 Nov · full refund if you don't") e de novo no recibo; a conversa não oferece o prazo como motivo para comprar.

**Por quê:** no Reino Unido não há prazo legal mínimo para retirar um pedido pago. Os termos da própria loja definem o prazo, e a Torts (Interference with Goods) Act 1977 só regula o que a loja pode fazer com itens deixados depois de um aviso. As redes guardam pedidos pagos de click-and-collect por cerca de uma semana e depois cancelam e devolvem o valor integral, sem taxa: a Argos cancela depois de 7 dias (com uma extensão de 7) e reembolsa em até 5 dias úteis; a John Lewis devolve o pedido ao depósito depois de 7 dias e reembolsa a conta; a IKEA cancela a retirada perdida e reembolsa em até 14 dias. A Screwfix guarda por 21 dias e depois devolve ao estoque. Uniqlo e Decathlon guardam por 7 dias, a Boots por 14. Lavanderias guardam peças por 60 a 90 dias, mas guardam bens do próprio cliente, muitas vezes com valor ainda a pagar, o que é outro caso. Eu tinha pedido de 30 a 90 dias; escolhi o padrão como prazo inicial e deixei a loja ir além, porque um prazo longo tira da prateleira a única unidade de uma loja pequena e só a loja sabe quanto pode esperar.
**Suposição:** o comprador entende "Buy" com uma data de retirada melhor que "Hold"; a prova de conceito pode contar as dúvidas sobre isso.
**Mudanças:** a H12 agora conta quantos sins terminam numa compra. A decisão 032 continua valendo: ainda não há reserva sem pagamento.
**Fontes:** Argos, "What happens if my collection window expires" (https://help.argos.co.uk/help/delivery-and-collection/what-happens-if-my-collection-window-expires); FAQ da Uniqlo UK (https://faq-uk.uniqlo.com/articles/en_US/FAQ/How-long-do-I-have-to-collect-my-Click-Collect-order-UK); Decathlon UK (https://custhelp-sprinklr.decathlon.co.uk/articles/my-order/how-long-do-you-hold-click-and-collect-orders/698c644d6873450e473e2e7d); John Lewis, click and collect (https://au.johnlewis.com/customer-services/delivery-information/click-and-collect); FAQ de click and collect da Screwfix (https://www.screwfix.ie/help/faq/clickandcollect-faq); Torts (Interference with Goods) Act 1977, itens não retirados (https://legislation.gov.uk/ukpga/1977/32/crossheading/uncollected-goods).

## 038 · O protótipo é um app em Expo
**2026-11-03 · Decidido**

O protótipo é feito com Expo (React Native): um código só, que roda como app de iOS para o vídeo e como build web dentro destes docs, para quem avalia poder navegar. O conteúdo é simulado. Um switch no topo troca a interface entre iOS (o padrão) e Android, e o menu do avatar troca entre Sam e Jess. O código segue boas práticas de código limpo e de performance, e uma checagem de performance roda em cada build: Lighthouse no build web e uma checagem de frames por segundo e tempo de abertura no app.

**Por quê:** a decisão 021 define o app como nativo e iOS primeiro; o Expo dá um app de verdade no celular e um build web do mesmo código, o que um protótipo só web ou em SwiftUI não daria.
**Em aberto:** se o build web carrega dentro do iframe do artifact; é a primeira coisa a testar. O que só existe no iOS (a folha do Apple Pay, as notificações na tela bloqueada, as Live Activities) é desenhado como tela simulada, para os dois builds ficarem iguais.

## 039 · Um modelo conceitual para o app
**2026-11-03 · Decidido**

O app tem quatro objetos: pedido, loja, resposta e compra. O Snuffle é a voz que fala com o comprador, não um objeto, e um item nunca ganha página própria: lojas pequenas não têm catálogo, então um item é texto e quantidade dentro de um pedido, de uma resposta ou de uma compra. Cada objeto tem uma forma de cartão e uma de detalhe, cada ação um verbo e cada estado um rótulo usado em todo lugar. Um pedido que fica aberto é "Keep looking", a resposta de uma loja é uma "answer", e as lojas aparecem como tiles com foto em Nearby e como linhas nas outras listas. O modelo está na página Modelo conceitual do design system, e toda tela é conferida contra ele.

**Por quê:** depois da v7, as telas usavam várias palavras para a mesma coisa (quatro nomes para um pedido aberto, três para uma compra esperando a loja) e termos de pagamento na conversa. Um modelo definido antes de mais telas segue o conselho de Johnson e Henderson de projetar primeiro o que vai ser projetado, e o ponto de Norman de que o comprador só aprende o modelo pelas telas.
**Suposição:** "request" faz sentido para os compradores, que escrevem perguntas, não pedidos; o teste do protótipo pode dizer.
**Atualização, apresentação:** a forma de detalhe de um objeto é empurrada e sai com Voltar; uma tarefa é uma sheet e sai com Fechar. A página da loja, que eu tinha desenhado com um botão de fechar, passa a ser um push com Voltar, porque é o detalhe da loja e o comprador continua navegando a partir dela. A regra está na página Modelo conceitual e a revisão de telas confere.

## 040 · Forma, materiais e movimento
**2026-11-03 · Provisório**

Os cantos usam seis raios tirados da escala de forma do Material 3 (0, 12, 20, 28, 32 e uma cápsula), concêntricos quando aninhados e contínuos no iOS. Controles são cápsulas e contêineres têm raio fixo. O Liquid Glass fica só no que flutua sobre o conteúdo e age: a barra de pedido, o botão redondo de Requests, as sheets e botões sobre uma foto ou o mapa; cartões, balões e tiles continuam sólidos. O movimento usa seis molas com valores para iOS e Material 3; o retorno começa no toque, toda animação pode ser interrompida e o Reduzir Movimento troca o deslocamento por um fade. Os valores estão nas páginas Forma e materiais e Movimento do design system.

**Por quê:** pedi cantos mais arredondados, poucos raios e um movimento com sensação premium e resposta rápida. O sistema de design da Apple de 2025 tem formas fixas, cápsulas e concêntricas, mas não publica uma escala de tokens, então os valores vêm da escala do Material, o que deixa o Android exato. As molas seguem a orientação da Apple na WWDC 2023 e os tokens de movimento do Material 3.
**Em aberto:** os valores são ajustados num celular, no protótipo; os valores de forma do Material foram lidos num espelho da documentação do Android e ainda precisam ser conferidos em m3.material.io.

## 041 · Espaçamento, layout, tags, imagens e uma revisão de telas
**2026-11-03 · Provisório**

O design system ganha mais quatro fundamentos: espaçamento numa base de 4 pt com intervalos nomeados e um grid de coluna única para celular, cinco tipos de tag (chip de filtro, chip de sugestão, rótulo de status, badge, contador) e regras para fotos, placeholders e símbolos. Uma checklist de quinze itens transforma princípios de Gestalt, hierarquia visual e arquitetura de informação em verificações, e um agente `screen-reviewer` a aplica, junto com o modelo conceitual e os tokens, em toda tela antes de ela ser publicada, nos canvas agora e no protótipo depois. Os esboços feitos à mão ficam no repositório e aparecem ao lado da tela que inspiraram.

**Por quê:** pedi que o design system cobrisse tags, imagens, espaçamento e grid do mesmo jeito que forma e movimento, partindo do iOS e abrindo para o Material, e que toda tela fosse conferida contra Gestalt e arquitetura de informação, visualmente, por um agente no fluxo de trabalho. Proximidade e região comum explicam quase tudo o que faz uma tela parecer agrupada, então a escala de espaçamento foi montada em torno delas.
**Em aberto:** as margens e os tamanhos de badge do Material e as margens de 16/20 pt do iPhone no iOS 26 ainda precisam ser confirmados; as larguras dos tiles são propostas a conferir no tamanho real.

## 042 · HugeIcons e um estilo de ilustração 3D
**2026-11-03 · Decidido**

Todo ícone do app vem do HugeIcons (Stroke Rounded, conjunto gratuito), não do SF Symbols nem do Material Symbols. Onde uma plataforma tem forma própria, como compartilhar, voltar ou mais, o app usa o glifo do HugeIcons que combina com aquela plataforma. O Getting Started, a splash e os ícones grandes usam ilustrações 3D modeladas em código a partir de formas simples: só cores da paleta, contornos escuros finos como num desenho técnico e sombras sólidas em preto ou num tom mais escuro da paleta, sem desfoque nem degradê. Um visualizador na página Ilustrações do design system mostra os objetos e me deixa ajustar câmera, contornos e sombras.

**Por quê:** eu queria uma família de ícones só, com traço arredondado que combina com as cápsulas, nas duas plataformas, e ilustrações que dessem ao app uma cara própria, sem fotos nem banco de imagens. Dei ao agente imagens de referência (isométricas, com contorno, sombras sólidas e chapadas) e pedi uma versão mais simples desse visual.
**Em aberto:** os objetos até agora são uma loja, uma cesta, uma moto com entregador e uma caixa de entrega; a animação é uma primeira versão.

## 043 · Componentes, estados, plataformas e conteúdo
**2026-11-03 · Provisório**

O design system ganha especificações para cada componente que as telas usam (anatomia, tokens, estados, formas no iOS e no Android, acessibilidade), estados de interação e elevação, estados vazios, de carregamento e de erro, um mapa de iOS e Android que o switch do protótipo segue, cores semânticas (borda, separador, destrutivo, aviso, sucesso, scrim, desabilitado) e regras de conteúdo: a voz do Snuffle em inglês britânico, formatos do Reino Unido e horários em 12 horas. Treze incoerências entre páginas foram corrigidas junto.

**Por quê:** uma revisão de design contra as telas da v7 achou tokens sem componentes e páginas que se contradiziam. Pedi que o design system ficasse completo o bastante para construir o protótipo antes de qualquer código.
**Em aberto:** o vermelho destrutivo e as constantes de haptic do Android ainda precisam ser conferidos no protótipo; as telas da v7 ainda mostram horários em 24 horas.

## 044 · OpenSpec e um app Expo só, sem monorepo
**2026-11-03 · Decidido**

O protótipo é um app Expo só, em `app/`, sem monorepo nem Turborepo: um projeto já gera iOS, Android e web. O trabalho é guiado por specs com o OpenSpec: um PRD curto em `openspec/project.md`, specs vivas por capacidade em `openspec/specs/` e uma proposta de mudança por feature em `openspec/changes/`, fundida nas specs quando termina; as tarefas podem virar issues no GitHub. O design system é código que os agentes precisam seguir: arquivos de tokens no formato DTCG 2025.10 geram quatro temas tipados (iOS e Android, claro e escuro) pelo Unistyles 3, os componentes só aceitam nomes de token, e lint, checagem de tipos e checagem de divergência dos tokens rodam a cada edição de um agente e quando ele para, por hooks do Claude Code.

**Por quê:** pedi um desenvolvimento guiado por specs leve e não escrito em pedra, com um PRD e features e issues que possam crescer a partir dele, e que o design system funcionasse como harness para agentes de código. O OpenSpec é a opção atual mais leve e mantém as specs vivas; o GitHub Spec Kit e o Kiro são mais pesados. Um monorepo só ajudaria com vários pacotes, e há um.
**Em aberto:** os builds de desenvolvimento de iOS e Android e as checagens de Lighthouse e de frame rate ainda não rodaram; as fontes ainda não estão embutidas no app.

## 045 · Identidade em uso
**2026-11-03 · Provisório**

Cada cor tem uma função. O Índigo é o comprador agindo: no máximo um controle preenchido em Índigo por tela visível, a ação de confirmação, com botões tonais neutros e o chip selecionado em Foreground. A Lavanda é o Snuffle falando: os balões, os pontos de digitação, a marca (redesenhada como um golden retriever sobre um tile Lavanda), as notificações e a Live Activity. Cada loja tem um acento fixo vindo do tipo dela (Pêssego, Pistache, Manteiga ou Lavanda), mostrado como um tile tonal com as iniciais e o toldo da marca, um wash atrás do nome na página dela e um cabeçalho tingido no recibo. O fundo claro vai para #EEE9E2 e o cartão escuro para #2B2420. Todo título de tela e de seção fica em Gambetta, com títulos de 48 pt em Nearby e Requests e o título grande mais perto do conteúdo do que do que está acima dele. O Nearby ganha "Shops by kind" com as imagens 3D, e o recibo, o momento em que o Snuffle pergunta, o Requests vazio e o Not found mostram uma ilustração. Os créditos das fotos saem da interface e ficam no código.

**Por quê:** uma revisão de marca do protótipo viu que o Índigo era a única cor fazendo alguma coisa, os pastéis só apareciam em badges pequenos, as superfícies pareciam iOS padrão, lojas sem foto eram quadrados cinza, a marca parecia um panda a 28 pt, a Gambetta tinha pouca presença e as ilustrações nunca apareciam. As fotos são provisórias num protótipo que não é publicado como produto, então os créditos não pertencem à tela.
**Em aberto:** Gambetta em todo título substitui as decisões 028 e 029 como teste e pode ser revertida. O wash claro (passo 50) é quase branco e mal aparece atrás do nome de uma loja. As ilustrações foram renderizadas sobre o fundo e o cartão escuro antigos e precisam ser renderizadas de novo; ainda não há estado offline para a cabine telefônica.

## 046 · Padrões do iOS 26, um mapa embutido e a marca solta
**2026-11-03 · Decidido**

O app segue os padrões do Liquid Glass do iOS 26 como os próprios apps da Apple usam, com o Material 3 Expressive no Android e os mesmos padrões desenhados no web: voltar só com o chevron num círculo de glass, botões de fechar e confirmar em glass, barras sem preenchimento, toda troca de tela animada. A barra de pedido fica sempre inteira e nunca recolhe, porque pedir é a ação principal do app. O mapa é o MapLibre com dados do OpenStreetMap dentro do app e um estilo da paleta com prédios em 3D. A marca do Snuffle é um glifo solto na cor de primeiro plano do tema e nunca fica dentro de um tile ou círculo, o que desfaz o tile da marca da decisão 045. As conversas mantêm um fundo neutro; o Snuffle é marcado pelo glifo, pelo nome e pelos balões em Lavanda, não por uma tela roxa.

**Por quê:** eu queria que o protótipo parecesse com os apps atuais da Apple em todas as plataformas, um mapa que eu pudesse estilizar de graça e que carregasse dentro do artifact, e uma marca que se leia como ela mesma, não como ícone de app. A pesquisa mostrou que apps que hospedam um assistente marcam quem está falando em vez de pintar a tela inteira.
**Em aberto:** o gesto de arrastar para fechar as transições de zoom não foi verificado num aparelho; o mapa no artifact publicado não foi verificado.

## 047 · As avaliações vêm de compras retiradas; os sinais do próprio Snuffle ficam ao lado
**2026-11-03 · Decidido**

Uma avaliação é um atributo da compra, e o modelo mantém os seus quatro objetos. Só uma compra marcada como Collected ou Delivered pode ser avaliada, uma vez, e quem comprou pode mudá-la por 30 dias. Ela guarda um polegar para cima ou para baixo para "Would you go back?", até três tags de duas listas fixas, uma nota opcional de 140 caracteres e o mês da compra. A página da loja mostra dois sinais identificados pela origem: "What buyers said" ("92% would go back · 38 buyers" e a contagem das tags) e "What Snuffle saw", calculado a partir das respostas e das compras (taxa de resposta, precisão de estoque, tempo de resposta típico). Ela também ganha "What they sell": chips de categoria que abrem o Ask, "Asked about recently" e uma linha de preço. A página segue cabeçalho e ações, What they sell, How they do on Snuffle, What buyers say. Os itens continuam sem página.

Fiz três escolhas. Um polegar para cima ou para baixo para "Would you go back?" em vez de estrelas. A precisão de estoque ("Had it 24 of 25 times when they said yes") só aparece depois de 10 respostas "has it"; antes disso a loja é "New on Snuffle", com a taxa e o tempo de resposta. As lojas veem os próprios sinais e podem contestar um caso específico, o que fica nos estados do pedido do lado da loja, já que a loja não tem interface.

**Por quê:** uma loja consultada não tem dados de caixa, então quem escolhe entre ela e uma loja conectada só tem a resposta para se guiar. O Snuffle vê cada resposta e cada compra, então pode relatar como a loja se saiu sem perguntar a ninguém. O Vinted separa as avaliações de membros das automáticas, e essa separação deixa o comprador distinguir opinião de registro. Estrelas tendem a uma distribuição em J e a uma média que a esconde, e uma pergunta de sim ou não é mais rápida de responder depois de uma retirada. As regras do Reino Unido definem o resto: o Schedule 20 do DMCC Act 2024 (parágrafo 13, em vigor desde 6 de abril de 2025) proíbe avaliações falsas e com incentivo escondido, e o guia da CMA (CMA208) proíbe o review gating (4.5), então o Snuffle pergunta a todos que compraram, nunca retém uma avaliação negativa, espelha a divisão nos destaques, identifica qualquer resumo como feito a partir das notas de quem comprou, marca incentivos e publica "How ratings work".
**Suposição:** as lojas aceitam um número público de precisão de estoque se puderem contestar um caso (H19); "% would go back" se lê tão fácil quanto estrelas (H18); a linha de confiabilidade deixa uma loja consultada competir com uma conectada (H17).
**Em aberto:** como uma contestação é analisada, e por quem; o texto de "How ratings work"; se as listas de tags servem a todo tipo de loja.
**Fontes:** Digital Markets, Competition and Consumers Act 2024, Schedule 20 (https://www.legislation.gov.uk/ukpga/2024/13/schedule/20); CMA, Fake reviews guidance, CMA208 (https://assets.publishing.service.gov.uk/media/67eeb64fe9c76fa33048c790/CMA208_-_Fake_reviews_guidance.pdf); a seção de Avaliações dos [benchmarks](discover/benchmarks.md).

**Substituída em parte pelas 056 e 060:** as avaliações mostram um primeiro nome e um mês, e as notas ficam num carrossel só com o resumo primeiro.

## 048 · Stone no modo escuro
**2026-11-03 · Decidido**

O modo escuro usa o Stone, o Cinza biscoito com 45% do croma (a coluna "menos cor" da rodada 8 da identidade), nos mesmos passos de luminosidade: fundo #0E0B09, sheet #191715, cartão #282523 (1,29:1), secundário #353230, texto secundário #AEAAA6 (6,6:1 no cartão) e texto #FBFAF8. O modo claro continua no Cinza biscoito. Os acentos e os tiles das lojas não mudam.

**Por quê:** voltei aos testes de modo escuro no quadro de identidade e preferi o Biscuit menos saturado: a versão com o croma inteiro parecia marrom à noite, e o cinza mais calmo deixa os tiles pastel e o Índigo carregarem a cor.

## 049 · Seleção de chip, um scrim de sheet e tiles renderizados a partir dos tokens
**2026-11-04 · Decidido**

Um chip de filtro selecionado é cartão com o rótulo em Índigo 800 em 600 e uma borda Índigo 800 de 1,5 pt (escuro: cartão, Índigo 300 e borda de 1 pt), e os chips não selecionados ficam um nível abaixo: o fundo com um fio de 12% no claro, a sobreposição tonalOnTile sobre um tile, secundário sobre um cartão ou uma sheet escura. O controle segmentado do iOS segue o padrão do sistema, um indicador um nível acima do trilho sob a sombra delicada, com o rótulo selecionado na cor do texto. Toda sheet é opaca, mantém o contorno do glass e tem um scrim atrás, texto a 20% no claro e preto a 48% no escuro; um toque nele fecha a sheet. As listas agrupadas numa sheet usam `radius.bubble`; Fechar e Confirmar numa sheet escura são secundário sólido; o glass escuro ganha um fio Stone 360; o Voltar sobre o tile de uma categoria usa o preenchimento tonalOnTile. O pipeline de ilustrações lê as cores dos tiles e dos fundos dos tokens de cor e falha quando o canto de uma imagem difere do tile dela, e as imagens de categoria seguem um enquadramento só.

**Por quê:** uma crítica visual do build web mediu o chip Índigo 100 em 1,03:1 sobre o fundo, mais claro que os chips brancos ao lado; as fotos apareciam através da sheet a 94% como manchas cinza; o círculo de Fechar escuro dava 1,09:1 na sheet; e as imagens Manteiga escuras tinham sido renderizadas sobre uma cor de tile que os tokens não usavam mais, então apareciam como caixas. Pedi essas correções; um agente as construiu e mediu cada par novo.
**Em aberto:** o fundo escuro da tela de categoria (a tela inteira no tile do tipo) ainda está por decidir. O Índigo tonal (`chipSelected`) continua no passo atual do cartão de compra, nos polegares da sheet de avaliação e no botão segmentado do Android.

## 050 · Linhas tingidas mais claras na tela de categoria escura; Requests depois do campo
**2026-11-04 · Decidido · a posição de Requests foi revertida pela 055**

No modo escuro a tela de categoria mantém o tile inteiro do tipo como fundo, e as linhas de loja sobre ele são um cartão tingido mais claro que o tile: OKLCH L 0,44, C 0,03 no matiz do acento (`shop.accent.<hue>.cardOnTile`: Pêssego #624D47, Pistache #4B5646, Manteiga #595240, Lavanda #534F62), 1,37 a 1,51:1 acima do tile. A linha de detalhes e o chevron das linhas usam o Stone 840 (#CECAC6, `mutedForegroundOnTile`), com 4,74:1 ou mais sobre todos os cartões, porque o Stone 740 media 3,35 a 3,42:1 ali. O modo claro mantém as linhas em Card branco. Na barra de pedido do Nearby, o círculo de Requests sai de antes da cápsula Ask e vai para depois dela, no fim, com o contador.

Escolhi a cor inteira com linhas mais claras em vez de um fundo escuro com uma faixa da cor que se desfaz sob o cabeçalho. Escolhi o círculo no fim porque o iOS 26 põe o botão secundário depois do campo de busca, como no Music e no Podcasts.

**Por quê:** as linhas em Card #282523 ficavam mais escuras que todos os tiles escuros (1,30 a 1,44:1 no sentido errado), então pareciam buracos recortados na cor. Um fundo escuro com uma faixa que se desfaz perderia a cor que liga a tela ao cartão de onde ela saiu no zoom. O círculo vinha antes para se dissolver no Voltar, no canto superior esquerdo; a transformação no New Request parte da cápsula, que agora começa na margem da tela como o campo, então seguir a posição da Apple não custa nada.
**Em aberto:** a página da loja ainda põe linhas em Card sobre o tile escuro (1,30 a 1,44:1, mais escuras); se ela recebe os mesmos cartões não está decidido. O chip de rua selecionado continua em Card com Índigo 300, porque o Índigo 300 fica abaixo do AA sobre os cartões tingidos.

## 051 · Um modo escuro mais calmo e mais frio
**2026-11-05 · Decidido**

O modo escuro usa accents com menos croma sobre um neutro mais frio. Os tiles mantêm os matizes com cerca de 55% do croma: Peach #52352C, Pistachio #34422C, Butter #403925, Lavender #3E3950, com linhas tingidas sobre eles (#5C4F4B, #4F554B, #565249, #53515C). O neutro Stone vai para o matiz 270 com metade do croma: Background #0B0C0D, Sheet #171719, Card #252627, Muted #323334, Foreground #FAFAFB. Os accents das lojas no escuro ganham passos novos de wash e ink com a mesma fração de croma. A sheet escura foi para #1C1D1E, para se separar do fundo em 1,16:1.

Escolhi isso depois de comparar quatro opções no board de identidade (rodada 10): os accents escuros de hoje, os accents claros usados sem mudança no escuro, accents com menos croma e um neutro mais frio.

**Por quê:** os tiles de hoje liam como marrom, verde e oliva. Os accents claros faziam de cada tile a coisa mais clara da tela. Menos croma mantém a ordem dos matizes e a hierarquia do tile sobre o cartão, e todo par de texto continua passando AA (o texto secundário sobre um tile foi de 4,58 para 4,66:1 no pior caso). O neutro mais frio muda pouco sozinho, mas separa os tiles quentes de um cinza neutro.
**Em aberto:** o balão do Snuffle no escuro (Lavender 900) ainda tem o croma antigo.

## 052 · Promoted na página da loja, não no tile
**2026-11-05 · Decidido**

Os tiles do Nearby não têm badge Promoted nem New. Um destaque pago é identificado na página da loja, com uma linha "Promoted" no cartão da loja.

**Por quê:** os tiles já ficam sob um título que diz o que é a fileira, e os badges deixavam o Nearby carregado. As regras de publicidade do Reino Unido (o código CAP) esperam que um destaque pago seja identificável, então o rótulo muda de lugar em vez de sumir.
**Em aberto:** se a própria fileira precisa explicar como funciona o destaque.

## 053 · Categorias ordenadas pelo que está aberto perto de você
**2026-11-05 · Premissa**

O Browse by category ordena os tipos pela quantidade de lojas daquele tipo abertas agora na área do comprador, com empates resolvidos por uma ordem fixa do dia a dia (café, padaria, farmácia, banca, açougue, deli, floricultura, ferragens, …). Tipos sem nada aberto vão para o fim, e as cores se espalham para que vizinhos sejam diferentes.

**Por quê:** um agente de pesquisa viu que o Deliveroo personaliza por pedidos anteriores e hora do dia, e nenhum outro app publica a sua regra. Sem dados de uso, a oferta perto do comprador é o sinal mais útil que o protótipo tem.
**Em aberto:** horários por loja; o protótipo tem um único estado de horário.

## 054 · Usuários sintéticos de teste testam fluxos, não demanda
**2026-11-05 · Decidido**

Usuários de teste roteirizados a partir dos objetivos de Sam e Jess conduzem a versão web por oito cenários com Playwright e registram passos, tempo, becos sem saída, controles sem nome, alvos pequenos e erros. Uma revisão opcional por agente lê os passos registrados contra o checklist de revisão de telas e é identificada como revisão heurística.

**Por quê:** eles acham quebras funcionais e de usabilidade rápido e de forma repetível, nos termos da própria persona. A NN/g e artigos recentes alertam que usuários simulados são otimistas demais e homogêneos, então eu os mantenho fora da pesquisa: não validam demanda, não substituem compradores nem lojistas e não substituem a prova de conceito.
**Em aberto:** nada da primeira rodada; um agente corrigiu as quebras e a segunda rodada chegou a todos os objetivos. Três alvos ainda ficam abaixo de 44 pt na web.

## 055 · Uma página de loja neutra, um campo de chat preenchido, Requests de volta à esquerda
**2026-11-05 · Decidido · o cartão neutro foi revertido pela 058**

A página da loja deixa de usar a cor do tile da loja como fundo: a página e o cartão da loja ficam neutros, o padding do cartão sobe de 20 para 24 e o accent da loja aparece só em detalhes pequenos (os chips e o pin). No claro, o cartão é branco, com as linhas um passo abaixo, como faz o Airbnb. O mapa usa a paleta do Snuffle. O cartão continua sólido; o vidro fica no Voltar e na barra fixa. No chat, o compositor vira um campo preenchido com um filete, em vez de vidro branco sobre fundo branco. Na barra de pedido do Nearby, o círculo de Requests volta para antes do campo, o que reverte a posição da decisão 050.

**Por quê:** um pastel usado como fundo de uma tela inteira é a coisa mais clara do modo escuro, inverte a ordem de elevação e põe texto escuro em ilhas claras; accents pequenos no tom claro funcionam no escuro, como recomenda a orientação de tema escuro do Material. A Apple reserva o Liquid Glass para a camada de controles, então um cartão de conteúdo em vidro faria o texto depender do mapa atrás dele. O compositor de vidro media cerca de 1,0:1 contra o chat branco. À direita, o círculo de Requests ficava a 8 pt do microfone, onde o polegar descansa, o que convida a toques errados; à esquerda ele se alinha ao Voltar.
**Em aberto:** se a tela de categoria mantém a cor cheia.

## 056 · Fatos sem pontos flutuantes, primeiro nome nas avaliações
**2026-11-05 · Decidido**

As linhas de metadados não juntam mais os fatos com pontos. Uma palavra de status leva a sua cor ("Open" na cor de sucesso, o horário em Muted), a caminhada e a rua são grupos com ícone, as unidades nunca quebram ("12 min walk"), as linhas só quebram entre grupos, e "Promoted" é uma tag. As linhas de pedidos mostram uma tag "Needs you" com o prazo ao lado. O cartão da loja é um cinza quente (Biscuit 915), e o texto dele mantém as quebras de linha quando o cartão alarga. As avaliações mostram o primeiro nome de quem avaliou e o mês, nunca sobrenome, foto ou como o pedido foi entregue. A seção de avaliações segue: a fatia de quem voltaria, as tags principais, três avaliações e "See all". Found here recently é uma lista curta de até cinco nomes com há quanto tempo. How it works vem logo depois de Found here recently.

**Por quê:** as linhas com pontos pareciam genéricas; as melhores páginas de lugares (Apple Maps, Google Maps, Airbnb) separam os fatos por peso, cor e ícones e guardam os pontos para listas simples de quantidades. Um primeiro nome faz a avaliação parecer de uma pessoa sem expô-la. Um carrossel de nomes sem fotos só acrescentaria uma rolagem.
O botão de compra diz "Buy for £29.98".
**Em aberto:** se a contagem diz "people" ou "buyers".

**Fechado depois:** a contagem diz "people".

## 057 · Ilustrações desenhadas para a tela, badges tonais no escuro, avaliações em carrossel, o avatar do Snuffle
**2026-11-05 · Decidido**

As ilustrações 3D são renderizadas sobre fundo transparente, com a caixa do próprio objeto centrada (a sombra cai onde a luz manda), num tamanho maior (a arte das categorias em 80% do quadrado, o Getting started em 312 pt), com um contorno de 1,4 pt que mantém a mesma largura em qualquer tamanho de exibição e vincos mais leves nos tamanhos pequenos. O app as compõe sobre a cor do tile ou da página. No modo escuro, badges e chips são preenchimentos tonais com um passo claro em relação ao fundo (1,39 a 1,58:1), com texto em 7,4:1 ou mais, e sem bordas; a seleção aparece pelo preenchimento e pelo peso. As avaliações da página da loja são um carrossel com encaixe de até cinco cartões (uma lista em textos grandes), cada um com primeiro nome e data. O carrossel de fotos fica dentro do cartão da loja, depois das ações, e o cartão começa logo abaixo do pin. "Delivers" e "New" levam um ícone; "Promoted" não aparece e não reordena o Nearby. No chat, a linha de remetente do Snuffle tem um pequeno avatar: a marca num círculo do Lavanda do balão do Snuffle, o único lugar em que a marca fica dentro de uma forma no app.

**Por quê:** traços desenhados em unidades do mundo engrossavam e se fundiam nos tamanhos pequenos, e tiles embutidos obrigavam a renderizar de novo a cada mudança de cor. As bordas nos badges escuros faziam o trabalho que a cor deveria fazer, como mostram os contêineres tonais do Material e os preenchimentos escuros da Apple. Um carrossel mantém as avaliações numa fileira da página. Uma ordem paga sem rótulo enganaria, então sem o rótulo a ordem também sai.
**Em aberto:** se o destaque pago volta a aparecer, identificado; o custo medido de um cartão de loja em vidro.

**Substituída em parte pelas 060, 061 e 062:** as notas viraram um painel e depois cartões direto sobre o cartão da loja; o avatar do Snuffle passa do círculo.

## 058 · O cartão da loja volta a ter a cor da categoria; vidro medido e deixado de fora
**2026-11-05 · Decidido · reverte o cartão neutro da 055**

O cartão da loja volta a ser o tile de accent da loja, no claro e no escuro, com tudo sobre ele recolorido para o tile: linhas no tom de cartão do tile, chips na cor do tile, Call e Directions na sobreposição tonal, palavras de status nos novos papéis `successOnTile` e `warningOnTile`, e Ask como o único Índigo preenchido. O cartão fica a 12 pt das bordas da tela, mais alto, para o pin da loja ficar centrado na faixa de mapa acima dele, e cresce até a largura total ao rolar; todo contêiner cresce junto, enquanto o texto mantém as quebras de linha. "Delivers" e "New" são fatos com ícone na linha da caminhada e da rua, e as fotos ficam entre dois espaços de seção. O cartão continua sólido.

**Por quê:** com a paleta escura de croma baixo (051) e os badges tonais sem borda (057), um cartão colorido funciona no modo escuro e liga a página da loja à categoria de onde ela veio. Um agente mediu um cartão de vidro: a CPU no simulador do iOS ficou dentro do ruído, mas a versão web perdeu quadros durante a subida com a CPU 4x mais lenta, o custo de GPU não pôde ser medido, e o texto secundário só passava porque o mapa é claro ou quase preto.

## 059 · Todo pedido é uma conversa completa; chats no bege do app
**2026-11-05 · Decidido**

Todo pedido da lista de Requests abre como uma conversa completa, com histórico, status e próxima ação (comprar, mudar ou parar um pedido recorrente, avaliar, continuar procurando ou perguntar mais longe), e toda conversa tem o compositor. O fundo do chat é o Background nos dois modos, e o campo do compositor é Card com um filete de Border em todo lugar em que aparece, então ele se lê igual no New Request, num pedido e na lista de Requests. Isso reverte o fundo branco do chat do craft-pass-2.

**Por quê:** os pedidos antigos abriam como uma mensagem sem como agir, então não ficava claro o que fazer nem onde responder. Num chat branco o campo era bege, e na lista de Requests, que é bege, o mesmo campo sumia; um fundo e um campo resolvem os dois e tiram o salto de cor ao abrir uma conversa.
**Em aberto:** comprar a partir de um pedido antigo pula as sheets de detalhes e de pagamento, e uma avaliação dada ali não chega à página da loja.

## 060 · Avaliações num painel, um chip discreto, sheets do tamanho do conteúdo
**2026-11-05 · Decidido**

As avaliações da página da loja são um painel: um carrossel cujo primeiro cartão é o resumo (a fatia de quem voltaria, a contagem de pessoas, até três tags) e cujos cartões seguintes são avaliações, todos da mesma altura, com "See all N reviews" e "How ratings work" no pé do painel. Os chips numa linha dentro do cartão da loja têm um único preenchimento neutro e discreto, sem borda e sem a cor do tile, tags de avaliação incluídas. O pin da loja fica centrado entre o fim da status bar e o cartão. Sheets de ações e de ajustes abrem na altura do conteúdo, até o detent grande (o detent personalizado do iOS; a bottom sheet do Material faz o mesmo), e a sheet de localização não encolhe enquanto o comprador digita; Directions mantém o detent médio porque o mapa atrás importa. A arte da Bakery é um saco de papel com baguetes e um pão com cortes, e a do Deli põe o pote e o queijo lado a lado.

**Por quê:** as avaliações eram três grupos separados e a lista ficava longa; um painel as mantém juntas e fáceis de ler. Chips na própria cor do cartão pareciam buracos, e os com borda pareciam campos. Uma sheet que abria pela metade escondia parte de Account. O vídeo do splash na página da Marca agora toca uma vez, porque um loop de 2,4 s parecia piscar.

## 061 · O avatar do Snuffle passa do círculo
**2026-11-05 · Decidido**

Na linha de remetente da conversa, o círculo do Snuffle é a cabeça do cachorro: o rosto da marca o preenche, as orelhas e os cantos do toldo passam da borda, e uma faixa do círculo aparece sob o toldo. O círculo tem um token próprio, `snuffle.avatar`: a Lavanda do balão no claro e Lavanda 600 no escuro. Os cartões de Bakery, Café e Newsagent seguem a composição da Chemist e do Deli, com um objeto alto atrás e à esquerda e um baixo na frente e à direita.

**Por quê:** pedi um teste com o cachorro vazando do círculo e fiquei com ele; com 24 pt, o glifo antigo dentro do círculo era pequeno e parecia um adesivo, enquanto a versão vazada se lê como um rosto. No escuro, a Lavanda 900 do balão media 1,4:1 contra o fundo da conversa e a cabeça sumia; a Lavanda 600 dá 4,26:1.

## 062 · Carrosséis até a borda do cartão, um cabeçalho de mapa mais alto, o crédito do mapa no pé
**2026-11-05 · Decidido**

Na página da loja, os cartões de avaliação ficam direto sobre o cartão, sem painel em volta, e uma lista agrupada embaixo tem "See all N reviews" e "How ratings work"; sem avaliações, uma lista só tem "No ratings yet" e "How ratings work". O carrossel de avaliações e o de fotos rolam além do padding até as bordas do cartão e são cortados ali, enquanto o primeiro cartão ou foto fica na borda do texto, como a fileira de ações já fazia. A faixa de mapa acima do cartão ficou mais alta (dois passos de `space.8` abaixo da barra em vez de um), já que funciona como cabeçalho da página. "© OpenStreetMap contributors" sai do canto do mapa e vira uma linha centralizada no pé do cartão.

**Por quê:** um cartão dentro de outro parecia um contêiner a mais, e carrosséis cortados na borda do texto pareciam encurtados. O cabeçalho ficava apertado em volta do alfinete. O crédito ficava sobre o cabeçalho em toda visita. As diretrizes de atribuição do OpenStreetMap pedem o crédito onde o mapa aparece; uma linha no pé da mesma página foi a leitura que adotei, e escolhi manter o crédito só ali, não também no mapa. Se um dia for preciso uma leitura mais estrita, `attribution` no mapa o devolve ao canto.

## 063 · Lojas na rua real, com o caminho desenhado no mapa
**2026-11-06 · Decidido**

Cada loja fica na rua que o cartão diz, num ponto real dessa rua no OpenStreetMap, e o mapa desenha o caminho a pé da porta do comprador, 163 Blythe Road, até ela, na cor de acento da loja. Um script de build (`npm run map:places`) lê as ruas caminháveis do OpenStreetMap, acha o ponto na rua de cada loja cuja distância a pé mais se aproxima do tempo da loja e calcula o trajeto; depois ajustei o tempo a pé de cada loja ao comprimento do trajeto, a 80 m por minuto, para o cartão e o mapa concordarem. O mapa gira para a porta ficar à esquerda da loja, se afasta até o caminho inteiro caber na faixa de mapa acima do cartão e centraliza o caminho; o pin acompanha a loja para o lado. A área do mapa cresceu para uns 4 km de leste a oeste, para a Askew Road e a Kensington Church Street ficarem dentro. A Wells Road Bakery foi para a Uxbridge Road, porque a Wells Road fica a 10 minutos e a padaria é das lojas consultadas só mais longe.

**Por quê:** com um mapa só para todas as lojas, o pin ficava na Blythe Road até para uma loja da King Street, e os tempos a pé eram inventados. Os trajetos reais mudaram alguns bastante (a delicatéssen e a livraria ficam a 25 e 28 minutos, além do raio de 20 minutos, então o Nearby não as lista mais; duas lojas da Hammersmith Road foram de 6 para 10 minutos). O endereço do comprador é uma premissa do protótipo; num celular ele viria da localização.

## 064 · Uma conversa que se move, a marca farejando, botões Buy equivalentes e a foto do pedido
**2026-11-06 · Decidido**

Tudo o que chega numa conversa entra de um jeito só: aparece com fade e sobe 8 pt, chips e cartões seguem a mensagem anterior, um status que muda faz cross-fade, e com Reduce Motion fica só o fade. Enquanto o Snuffle consulta as lojas, a marca fareja (o toldo balança como bigode e o focinho treme) onde ficava a scooter de entrega. Com duas ou mais ofertas, todo Buy é tonal e do mesmo tamanho; Buy preenchido só quando uma resposta pode ser comprada, e uma oferta parcial diz "Buy 1 of 2". A foto do pedido vai para a direita da barra da conversa, e um toque oferece seis fotos do item para escolher. Um cartão com dois objetos põe o mais alto atrás e à esquerda e o mais baixo na frente e à direita, com um objeto comprido girado contra essa diagonal (Ilustrações, Dois objetos).

**Por quê:** mensagens e status apareciam e trocavam num quadro só e pareciam quebrados. A scooter dizia entrega enquanto o Snuffle procurava; escolhi a marca em vez de um cruzamento pequeno, que vira ruído nesse tamanho. Duas lojas com um Buy preenchido e outro cinza pareciam uma recomendação que o app não fez. A foto sob "Snuffle" apertava o título, e uma foto fixa dos óculos de eclipse de outra pessoa pode não ser o que o comprador quer.

**Atualizado:** a oferta parcial diz "Buy only 1" (o número que a loja tem), já que "Buy 1 of 2" parecia um passo numa sequência.

**Atualizado:** a subida é de 16 pt, já que 8 pt pareciam nenhum movimento no celular (AI log, passo 78).

## 065 · Os docs abrem com o case; o processo vira a documentação do harness
**2026-11-06 · Decidido**

O site tem dois blocos. O primeiro, "O case", é uma narrativa curta para quem avalia o take-home: uma visão geral com a conclusão primeiro, a posição, o produto, o protótipo, as decisões-chave, viabilidade e escala, como trabalhei, e validação e próximos passos. Cada página é uma síntese do que já existe e aponta para a evidência. O segundo bloco, "Contexto de IA" (antes chamado "Harness de IA e contexto"), mantém todas as páginas que existiam, com o conteúdo intacto, reagrupadas como a documentação do sistema de trabalho: intenção, pesquisa, specs do produto, fluxos e estados, design system, explorações, verificação e registros.

**Por quê:** a ordem Discover, Define, Develop e Deliver fazia o leitor percorrer o processo antes de achar a posição e enterrava as decisões num registro com mais de 60 entradas. Agrupar as páginas existentes pelo que elas são, mais perto de uma documentação spec-driven, as mantém como o registro para o qual o case aponta. Nada foi apagado, e nenhuma página existente mudou.

**Atualizado:** em 8 de novembro renomeei o segundo bloco para "Contexto de IA" e reordenei o case para seguir a ordem em que trabalhei, que é também a ordem da gravação: visão geral, descoberta, conceito, valor e viabilidade, como construí, o produto, funcionalidades, o protótipo e o que vou testar a seguir. A posição e as decisões principais foram para Descoberta e Conceito (registro de IA, passo 85).

## 066 · No modo escuro, os tiles das lojas mantêm os pastéis do claro e os cartões sobre eles ficam escuros
**2026-11-06 · Decidido**

O tile de acento de uma loja é o mesmo pastel no claro e no escuro (Butter #E7D48F, Peach #FEC5B2, Pistachio #C5DEAE), com texto em tinta direto sobre ele, e os cartões sobre ele no escuro são um escuro translúcido do matiz do tile, como valores sólidos (#514A31, #5A453E, #454E3D), com texto claro; os botões tonais e o Back usam esse cartão, e o Ask sobre um tile é Indigo 800. O pin do mapa é o pastel com um ponto em tinta, e o caminho é o pastel contornado na cor do fundo. O escuro reusa as ilustrações claras das categorias, já que os tiles agora são iguais. É a opção 2, variação 4, do board de Identidade (round 11), e substitui os tiles escuros das decisões 051 e 058.

**Por quê:** os tiles escuros tinham croma de 0,03 a 0,05 e liam como cáqui, marrom-avermelhado e cinza-floresta, a só 3 a 6 de distância de matiz, onde 2 é o menor passo visível. Comparei três direções e as variações delas no board e escolhi os pastéis claros com cartões escuros. O custo é o brilho: o tile fica a 12,9 a 13,5:1 do fundo escuro, então a página da loja, a tela de categoria e os cartões de categoria são blocos claros numa interface escura.

## 067 · Como as hipóteses são medidas, definido e não construído
**2026-11-06 · Decidido · os limites das proteções ficam em aberto**

O harness tem uma etapa de verificação: um plano de medição que liga cada hipótese a uma métrica, aos eventos por trás dela, a um critério de aprovação e a um método; as tarefas do comprador e da loja com início, fim, sucesso e abandono; o tempo na tarefa como mediana e percentil 90, separado em esforço do comprador e espera pela loja; uma taxonomia de 58 eventos sem dado pessoal; métricas de produto e de oferta e demanda por área e por comprador; um modelo de liquidez de quantas lojas uma área precisa; e proteções. A métrica norte é pedidos concluídos por semana. Nada disso é construído no protótipo. Não adiciono NPS nem um CSAT permanente: o rating de polegar após a retirada já mede a loja, e as lacunas que ele deixa (pedidos que terminam sem compra, o próprio Snuffle) são cobertas na prova de conceito conversando com os compradores e com uma conversa semanal com cada loja.

**Por quê:** a prova de conceito é pequena (6 compradores, 10 lojas), então uma nota como o NPS mudaria cerca de 17 pontos por pessoa e não diria qual etapa falhou, enquanto quase tudo de que as hipóteses precisam sai de registros que o serviço guarda de qualquer jeito. As entradas do modelo (a parcela de lojas que tem o item, quantas estão abertas, quantos tipos de loja poderiam tê-lo) são premissas, marcadas como tal.

**Em aberto:** os limites das proteções antes da prova de conceito, e se uma build futura pergunta "Did Snuffle help?" numa amostra de pedidos que terminam sem compra.

## 068 · Quando há uma compra, a conversa a fixa, e o recibo agrupa o código com a data
**2026-11-08 · Decidido · o status repetido na conversa fica em aberto**

Quando um pedido tem uma compra, a conversa dele fixa a compra sob a barra de navegação: o rótulo de status, a loja e os itens, o código de retirada enquanto a compra pode ser retirada, e um toque até o recibo. Ela aparece em todos os estados da compra menos Sold e Not confirmed, em que nada foi cobrado e a conversa segue para a próxima resposta. A faixa usa o preenchimento e a borda da barra de navegação, e a barra da conversa fica preenchida em qualquer rolagem, então as duas se leem como uma barra só. No recibo, as seções de baixo e o Directions ficam como estavam. Enquanto a compra pode ser retirada, o cabeçalho verde diz a loja e os itens, e o cartão do código traz o código com "Collect by Mon 9 Nov" e "Full refund if you don't" logo abaixo; o rótulo de status ("Ready", "Extended") sai do cabeçalho, porque a data diz o que importa no balcão e a compra fixada e o cartão de compra carregam o rótulo. Todo outro estado abre o cabeçalho com o seu rótulo de status. A ilustração da cesta saiu.

**Por quê:** um agente comparou Uber Eats, Too Good To Go, Live Activities, WhatsApp e Messages for Business. Os que funcionam deixam a compra ativa a um toque, num lugar fixo, com a fase atual; uma faixa fixada no topo da conversa faz isso sem disputar espaço com o campo da conversa e o teclado embaixo, e o código no fim dela pode ser lido em voz alta no balcão sem abrir nada. A compra continua dentro da conversa do seu pedido, como diz o modelo conceitual. O código e a data são um par no balcão, e o QR precisa de uma margem branca, então os dois ficam no seu próprio cartão; dentro do cartão verde o código ficava apertado.

**Em aberto:** o cartão de compra na conversa repete o status fixado quando os dois estão na tela, e as conversas dos outros pedidos ainda não fixam as compras, porque só o pedido ativo tem recibo no protótipo.

## 069 · Amostras maiores, e critérios de aprovação escritos como contagens
**2026-11-09 · Decidido**

Aumentei o tamanho das amostras dos testes. O concierge feito à mão manda 60 pedidos em cinco dias (6 por loja, cerca de 24 buscas) em vez de 20 em dois dias. O teste do protótipo e o concierge feito à mão têm 20 compradores cada em vez de 6, com pelo menos 10 deles trabalhando no horário das lojas, e as conversas sobre o resumo de demanda passam de 5 lojistas para 10. Todo critério de aprovação agora é escrito como contagem. A H1 passa se 36 dos 60 pedidos recebem uma resposta válida em até 10 minutos e pelo menos 12 das 24 buscas são resolvidas, e os critérios de compradores sobre 6 passam para 20 (4 de 6 vira 14 de 20). As lojas continuam 10.

**Por quê:** uma porcentagem de 6 ou de 20 parece mais precisa do que é, e "4 de 6" é pouco para apoiar uma decisão. As lojas continuam 10 porque esse é o anel de lojas alcançáveis a até 15 minutos a pé da Blythe Road, e o modelo de liquidez das métricas de produto se apoia em 10 lojas em 6 tipos. O argumento contra o NPS da decisão 067 continua valendo com 20 compradores, já que uma pessoa move o número em 5 pontos.

**Em aberto:** os números novos ampliam os critérios antigos; nenhum benchmark ou estimativa de volume os define. A decisão 070 substitui esses números.

## 070 · Uma prova de conceito de quatro semanas dimensionada pelo funil, com marcas para seguir, iterar e parar
**2026-11-09 · Decidido · o limite de carga de respostas para a operação estável continua em aberto**

Primeiro acertei o vocabulário: um pedido é o que o comprador pede ao Snuffle (`request_created`), e uma consulta é um pedido enviado a uma loja (`shop_asked`). A prova de conceito dura quatro semanas com as mesmas 10 lojas no anel de 15 minutos em volta da Blythe Road, 5 no POS do provedor e 5 com outras maquininhas. Vinte compradores, pelo menos 10 deles trabalhando no horário das lojas, fazem cerca de 3 pedidos cada nas três primeiras semanas: cerca de 60 pedidos, que chegam às lojas como cerca de 160 consultas. A quarta semana fica para o resumo de demanda (H9) e as ofertas de dinheiro (H13 a H15). O tamanho sai do funil: 60 pedidos × 50% de atendimento × 70% comprados × 2 em 3 retiradas dá cerca de 14 compras retiradas, o bastante para ler a H2, a H7 e a H12. Toda hipótese com marca agora tem uma marca para seguir e uma para parar, definidas antes do teste, com iterar no meio, e os resultados saem com o intervalo de Wilson de 90%. A H1 segue com 60% das consultas respondidas em 10 minutos e 8 de 10 lojas respondendo a metade, e para abaixo de 45% ou abaixo de 6 lojas; o atendimento dela segue com 50% dos pedidos e para abaixo de 30%, com o h medido à parte. Os 60% ficam abaixo da antiga régua "Very responsive" da Meta (90%, 15 minutos) e são uma estimativa minha; os 45% são onde eu julgo que o modelo precisa de mais lojas do que um anel tem; os 50% são a previsão do próprio modelo para 10 lojas. As marcas de compradores seguem em 14 de 20 e param em 9; a H4 conta os pedidos lentos ainda abertos quando o sim chega (seguir 70%, parar abaixo de 50%); o comportamento da H7 segue com 5 dos 10 compradores que trabalham; a H9 conta as lojas que se comprometem com mais um mês (seguir 6, parar 3); a H12 segue com 70%. A H6, a H13, a H14, a H17 e a H19 ficam como só direção. A H15 vira exploratória, e a H16 espera um segundo anel. O teste do protótipo começa com uma rodada de usabilidade de 5 a 8 compradores. Na prova de conceito, uma loja não é consultada de novo no mesmo dia depois de 10 consultas.

**Por quê:** uma auditoria do plano mostrou que a marca da H1 estava no valor do próprio modelo, então um conceito que funcionasse exatamente como o modelo prevê passaria ou falharia no cara ou coroa. As marcas para seguir continuam nos valores do modelo, e com uma marca para parar bem abaixo de cada uma, um resultado perto do modelo cai em seguir ou iterar; só um erro claro vira parar. Dez compradores que trabalham não chegavam à marca de comportamento da H7, de 6, com o volume antigo, os testes misturavam cinco dias com quatro semanas, a marca da H15 ficava acima do que a estimativa de receita prevê para 10 lojas, e a H16 não dava para medir com todas as lojas dentro do anel. Vinte e quatro buscas dariam cerca de 6 compras retiradas, pouco para a H2, a H7 ou a H12.

**Em aberto:** o limite de carga de respostas na operação estável; não existe número publicado sobre lojas independentes do Reino Unido respondendo pelo WhatsApp, então os 60% da H1 continuam uma estimativa minha; e a prova de conceito testa as lojas com cerca de 1 consulta por dia, contra cerca de 24 na operação estável do modelo, então não diz nada sobre responder em escala.

## Ainda em aberto

