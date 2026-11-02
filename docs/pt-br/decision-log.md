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

Os posts da netnografia são etiquetados, pontuados em duas dimensões (urgência da necessidade e etapa da compra) e clusterizados com k-means. Cada cluster vira uma proto-persona, descrita com os campos de persona de Lewrick, Link e Leifer. Um segundo agente etiqueta cada post às cegas, para que as pontuações possam ser conferidas. Os dados sustentam três clusters.

**Por quê:** eu queria que as personas saíssem dos dados, e que as dimensões conversassem com a escolha do brief entre findability e transaction.
**Trade-off:** três grupos pequenos (11, 6 e 4 posts), cada um rastreável até seus posts. São proto-personas porque ninguém foi entrevistado.
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

## Ainda em aberto

- Estrutura do repo (app único ou monorepo): decidir quando a construção começar e o formato dela estiver claro.
- Fluxo guiado por specs: se vale escrever specs antes de construir, e quão leves elas devem ser.
