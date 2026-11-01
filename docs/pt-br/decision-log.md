# Registro de decisões

As principais decisões que moldaram o processo, na ordem em que foram tomadas. Cada entrada diz o que foi decidido, por quê e o que fica em aberto.

---

## 000 — Um produto 0-to-1, com profundidade do tamanho de um take-home
**2026-11-01 · Decidido**

Eu decidi tratar isto como um produto que ainda não existe: sem usuários, sem dados de uso e sem comerciantes com quem aprender. Isso define a descoberta. Ela começa de fora para dentro, com conversa pública, pesquisa documental e os produtos que as pessoas já usam, em vez de analytics ou entrevistas com clientes existentes.

Também é um take-home com orçamento de poucas horas. Cada etapa vai tão fundo quanto a próxima decisão precisa, e não mais. Uma descoberta 0-to-1 de verdade entrevistaria compradores e lojistas, faria a etiquetagem com mais de uma pessoa e duraria semanas. Onde eu paro antes disso, a página diz, e o Define lista o que deveria ser validado em seguida.

## 001 — Começar pela descoberta, não pela escolha do problema
**2026-11-01 · Decidido**

O brief pede para escolher Findability ou Transaction como foco principal. Eu adiei essa escolha para depois de uma rodada de descoberta sobre o universo da high street, a rua comercial do bairro (quem são as lojas, como vendem hoje, quem compra nelas e por quê).

**Por quê:** escolher antes de entender o espaço seria escolher por intuição; a posição que o brief pede deve sair da evidência.
**Em aberto:** Findability vs. Transaction, decidido ao fim da descoberta.

## 002 — Plataforma decidida pela solução
**2026-11-01 · Decidido**

Mobile ou web não é escolhido de antemão. Decorre de como o problema escolhido for resolvido.

**Em aberto:** plataforma.

## 003 — O protótipo é construído em código
**2026-11-01 · Decidido**

O protótipo final (e, se fizer sentido, uma aplicação funcionando) é construído em código. Figma e Apple Freeform são usados só como ferramentas de exploração, quando eu escolho usá-los. Os resultados deles podem ser anexados como material de processo, mas não são entregáveis, e o Figma não é fonte de handoff.

**Por quê:** código é o meio de trabalho real neste processo; desenhar e construir acontecem no mesmo lugar.

## 004 — Esta documentação é o registro de trabalho; o vídeo é o resultado
**2026-11-01 · Decidido**

Tudo (descoberta, decisões, protótipo, app) fica neste repo e é publicado como um site de documentação hospedado. O site é o registro de trabalho do que eu faço com os agentes de IA: a pesquisa, as decisões, o que voltou e o que eu mantive. Foi escrito para mim, para os agentes e para qualquer pessoa que entre no trabalho. Não é a apresentação. O resultado para avaliação é o walkthrough gravado, com este registro por trás como evidência.

## 005 — Configuração dos agentes, com um agente principal e um segundo para revisões
**2026-11-01 · Decidido**

Eu criei o `AGENTS.md` como as instruções compartilhadas, para que todo agente que trabalha no repo siga as mesmas regras: o agente principal, que também roda subagentes, e um segundo agente que eu uso para revisões e tarefas secundárias.

## 006 — Método de descoberta com netnografia, mapa de empatia, benchmarks e panorama
**2026-11-01 · Decidido**

A descoberta se apoia em quatro frentes de trabalho, todas restritas a Londres, com Hammersmith como exemplo trabalhado:

1. Uma netnografia do que compradores dizem em redes sociais públicas, seguindo o método de Kozinets.
2. Um mapa de empatia construído a partir desse material, usando o canvas da Strategyzer, mais duas dimensões propostas para segmentar compradores depois.
3. Benchmarks de produtos que já atendem esses compradores, com uma netnografia do que os usuários dizem sobre eles.
4. Uma revisão documental da própria high street: história, regulação, dados e notícias recentes.

**Por quê:** o objetivo é entender o espaço a partir de evidência, não de inferência. Toda afirmação sobre pessoas se apoia numa citação literal com handle, rede, data e link, só dos últimos 18 meses. A netnografia em particular foi escolhida porque monta essa base de evidência de forma rápida e barata, o que cabe num take-home. Num produto real ela seria uma fonte entre várias, não a única; a página de [método](discover/netnography/method.md) explica o trade-off.
**Escolha ética:** as citações mantêm o handle público do autor porque o link já o expõe e isso torna a evidência verificável. Contas privadas e grupos fechados ficam de fora.

## 007 — O entregável se lê como documentação de software
**2026-11-01 · Decidido**

O artifact é um site de documentação com uma barra lateral estruturada, organizado por fase (Discover primeiro; Define, Develop e Deliver em seguida). Usa por enquanto um design neutro no estilo shadcn/ui, a ser personalizado depois. O Markdown em `docs/` é o conteúdo; o site o renderiza, então existe uma cópia só de tudo.

**Por quê:** o processo é tão entregável quanto o protótipo, e uma estrutura de documentação deixa quem avalia ir direto à parte que interessa.

## 008 — Inglês primeiro, escrito com voz humana
**2026-11-01 · Decidido**

O inglês é o idioma de origem do repo; a versão em português veio depois (decisão 014). A escrita segue regras explícitas contra padrões de IA (listadas no `AGENTS.md`).

## 009 — Quais redes sociais a netnografia usa
**2026-11-01 · Decidido**

Eu escolhi as redes com os critérios de seleção de sites de Kozinets: o site é relevante para a pergunta, ativo na janela de tempo, interativo (as pessoas conversam entre si), substancial, heterogêneo e rico em dados descritivos? Por cima disso vem minha própria regra ética: só conteúdo público.

| Rede | Por quê | Peso |
| --- | --- | --- |
| Reddit | Threads longas e francas; subreddits de Londres e dos bairros; fácil de filtrar por data | Principal |
| TikTok | Compradores mais jovens: vlogs de high street, conteúdo de "shop local", threads de comentários | Alto |
| X | Reação a notícias (fechamentos, Hammersmith Bridge, business rates, o imposto sobre imóveis comerciais); mais debate público que hábitos de compra | Médio |
| Mumsnet, App Store, Trustpilot | Abertos para leitura sem conta; relatos longos de experiência e avaliações de produtos | Apoio |
| Instagram | Mais a voz das lojas do que a dos compradores; só comentários em contas locais | Opcional; no fim não foi coletado |
| Facebook, Nextdoor | Onde moradores mais velhos falam da sua high street, mas quase sempre em grupos fechados ou feeds só para vizinhos | Excluídos das citações |

**Por quê:** uma primeira passada automatizada não conseguiu ler Reddit, X nem TikTok (bloqueados ou atrás de login), o que puxou a voz para fontes mais velhas e cheias de reclamação. X e TikTok foram lidos depois pela minha sessão logada no navegador (só leitura: sem postar, curtir ou seguir), e o Reddit por um arquivo público (decisão 010).

## 010 — Reddit por um arquivo, conferido com o site ao vivo
**2026-11-01 · Decidido**

O Reddit bloqueou toda rota automatizada que eu tinha: a ferramenta de fetch, os dois navegadores e o JSON público. A API oficial agora exige uma aprovação que leva dias. Então o trabalho de campo no Reddit foi lido pelo Arctic Shift, um arquivo público do Reddit usado em pesquisa acadêmica, e depois conferido com páginas que eu salvei à mão do site ao vivo. Toda citação do Reddit leva um status: **verificada** (conferida com a página ao vivo) ou **via arquivo** (ainda não conferida). Duas citações foram descartadas porque a checagem ao vivo mostrou que tinham sido removidas. X e TikTok foram lidos numa segunda passada pelo meu navegador logado. As ferramentas não conseguiram ler os comentários do TikTok, então a evidência do TikTok é só de legendas. Posts que usavam a high street para argumentar sobre declínio nacional em termos raciais foram lidos, mas não citados.

## 011 — Citações são trechos curtos
**2026-11-01 · Decidido**

Os posts pertencem a quem os escreveu. As citações ficam restritas à frase que carrega o ponto, cerca de 25 palavras no máximo, sempre com link para o original completo. Isso também segue o conselho de Kozinets de usar o mínimo das palavras de uma pessoa que dê conta do recado.

## 012 — Proto-personas a partir de posts clusterizados
**2026-11-01 · Decidido**

Os posts da netnografia são etiquetados, pontuados em duas dimensões (urgência da necessidade e ponto de falha) e clusterizados com k-means. Cada cluster vira uma proto-persona, descrita com os campos de persona de Lewrick, Link e Leifer. Um segundo agente etiqueta cada post às cegas, para que as pontuações possam ser conferidas. Os dados sustentam três clusters.

**Por quê:** as personas devem sair dos dados, e as dimensões devem conversar com a escolha do brief entre findability e transaction.
**Trade-off:** três grupos pequenos (11, 6 e 4 posts), cada um rastreável até seus posts. São proto-personas porque ninguém foi entrevistado.
**Nomes, gênero, idade:** nomes e gêneros são rótulos que eu escolhi para equilibrar o conjunto (duas mulheres, um homem). A idade fica de fora a menos que outra fonte a sustente: o "provavelmente 50 anos ou mais" da Ruth vem de pesquisas de opinião em Londres, porque os posts não falam pelos compradores mais velhos.

## 013 — A documentação diz quem fez o quê
**2026-11-01 · Decidido**

Toda página abre com os principais aprendizados, a minha decisão, como a IA foi usada naquela etapa e os trade-offs. O detalhe de método fica em subpáginas para quem quiser. Um [log](process/ai-log.md) contínuo registra o que foi pedido a cada agente, o que voltou e o que foi descartado.

## 014 — A documentação é bilíngue
**2026-11-01 · Decidido**

O inglês continua sendo a fonte. Cada página também tem uma versão completa em português do Brasil, escolhida num seletor no topo do site, que abre em inglês por padrão. A partir de agora, todo conteúdo novo é escrito nos dois idiomas, e o português é revisado com base no inglês. As citações ficam no idioma original nas duas versões. A mesma área do topo traz um controle de tema claro, escuro ou do sistema, que substitui o antigo rótulo de fase.

**Por quê:** este registro é para mim e para quem trabalha nele comigo, e algumas dessas pessoas leem português com mais conforto. Manter o inglês como fonte garante uma única versão de referência.

---

## Ainda em aberto

- **Estrutura do repo** (app único ou monorepo): decidir quando a construção começar e o formato dela estiver claro.
- **Fluxo guiado por specs**: se vale escrever specs antes de construir, e quão leves.
