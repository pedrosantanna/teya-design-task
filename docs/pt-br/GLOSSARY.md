# PT-BR translation brief and glossary

Source: English Markdown in `docs/`. Target: Brazilian Portuguese in `docs/pt-br/`, same relative path (e.g. `docs/discover/benchmarks.md` → `docs/pt-br/discover/benchmarks.md`).

## Voice
- Brazilian Portuguese, natural, first person ("eu decidi", "um agente coletou"). Decisions are always "eu", never "nós". AI work is "um agente" / "o agente", never a product name.
- Follow the human-writing rules: no "não é X, é Y" in separate sentences; no triple anaphora; no empty adjectives; no "mergulhar"/"navegar" in the figurative sense; no title case in headings (sentence case); no colon in headings; em dash (travessão) rarely — prefer comma or full stop; no rhetorical question followed by an answer.
- Short, objective sentences. Keep the same structure, headings and order as the English page; don't add or remove content.

## Keep exactly as in English (do not translate)
- Everything inside ```quote blocks EXCEPT the `context:` line. `text`, `handle`, `network`, `date`, `url`, `tags`, `status` stay identical. Translate `context:` only.
- Block syntax keys: in ```summary keep the keys `Takeaways:`, `Call:`, `AI:`, `Trade-offs:` (translate the bullets). In ```persona keep `name:`, `tagline:`, `image:`, `credit:`, `credit_url:` keys; translate tagline and the attribute labels/values (`- Onde: ...`); keep the first names and translate the descriptor: "Sam, o comprador em missão", "Jess, a local que desistiu", "Ruth, a frequentadora"). The `| evidence` / `| desk research` marker after an attribute: translate to `| evidência` / `| pesquisa documental`.
- In ```persona, change `image: img/x.jpg` to `image: ../../../discover/personas/img/x.jpg` (images live only in the English tree).
- ```empathy-map labels: translate as `Vê:`, `Ouve:`, `Pensa e sente:`, `Diz e faz:`, `Dores:`, `Ganhos:`.
- ```timeline dates stay; translate the text.
- Everything between `<!-- generated:NAME -->` and `<!-- /generated:NAME -->`: copy unchanged (a script regenerates it).
- URLs, file paths, code, handles, product and organisation names, figures and dates.
- Relative links between pages keep the same relative path (the PT tree mirrors the EN tree). Links to `../decision-log.md` etc. stay as they are.

## Glossary
| English | PT-BR |
| --- | --- |
| high street | high street (on first use per page: "high street, a rua comercial do bairro") |
| findability / transaction | findability / transaction (brief terms, keep in English, italic not needed) |
| proto-persona | proto-persona |
| netnography | netnografia |
| empathy map | mapa de empatia |
| desk research | pesquisa documental |
| data collection | coleta de dados |
| survey | survey |
| attitudinal / behavioural (data) | atitudinal / comportamental ("dados de comportamento" also fine) |
| benchmark(s) | benchmark(s) |
| codebook | codebook |
| coding / to code (qualitative) | etiquetagem / etiquetar ("codificação" only when explaining the research term) |
| tag(s) | etiqueta(s) |
| cluster / clustering | cluster / clusterização |
| need urgency | urgência da necessidade |
| purchase stage | etapa da compra |
| browsing ↔ needs it now | passeando ↔ precisa agora |
| find out → find it → accept it → get it | saber → encontrar → aceitar → levar |
| mission shopper | comprador em missão |
| lapsed local | local que desistiu |
| the regular | a frequentadora |
| kept going / gave up on local | continuou / desistiu do comércio local |
| shop local / support local | comprar no comércio local / apoiar o comércio local |
| independent shop(s) | loja(s) independente(s) |
| click and collect | click and collect (compra online, retirada na loja) on first use |
| business rates | business rates (imposto sobre imóveis comerciais) on first use |
| BID | BID (associação de negócios do bairro) on first use |
| decision log | registro de decisões |
| Key takeaways / My call / AI in this step / Trade-offs | (UI labels — rendered by the site, not in the Markdown) |
| Method / Method in detail | Método / Método em detalhe |
| verified / archive | verificada / via arquivo |
| take-home | take-home |
| agent / subagent | agente / subagente |

## Terms settled during the first translation
| English | PT-BR |
| --- | --- |
| landscape (desk-research page) | panorama |
| findings | achados |
| worked example | exemplo trabalhado |
| shopper / shopkeeper / merchant | comprador (or "quem compra") / lojista / comerciante |
| footfall / vacancy | fluxo de pedestres / vacância |
| Budget (UK) / Chancellor | Orçamento / ministro das Finanças |
| rateable value / multiplier / relief threshold / tapered relief | valor locativo / multiplicador / limite de isenção / desconto escalonado |
| council | prefeitura |
| cash / mobile wallet / contactless / card reader | dinheiro vivo / carteira digital / por aproximação / maquininha |
| charity shop / off-licence / newsagent / post office | brechó beneficente / loja de bebidas / banca de jornal / agência dos correios |
| wasted trip | ida perdida |
| White space | Espaço em aberto |
| Use cases / Influencers (persona fields) | Casos de uso / Influências ("Jobs to be done" stays in English) |
| second coder / coded blind | segundo etiquetador / etiquetou às cegas |
| mean silhouette | silhueta média |
| Open / Why (decision-log labels) | Em aberto / Por quê |
| Codebook values (specific, routine, information, persists…) and tag names | stay in English, as in the generated tables |
| Phase names (Discover, Define, Develop, Deliver) | stay in English |
| Inline quotes in prose | stay in English, with a short gloss in parentheses |
| Numbers | decimal comma (13,2%) |
| code (noun, a qualitative tag) | etiqueta ("código" only for the research term) |
| dates inside citations ("Aug 2026") | stay in English, as part of the citation |

## Terms settled in Define
| English | PT-BR |
| --- | --- |
| ring (walking distance) | anel |
| shopping street | rua comercial |
| parade of shops | fileira de lojas / pequeno trecho comercial |
| within reach | ao alcance |
| concierge (the agent's role) | concierge |
| value proposition canvas / value map / customer profile | canvas de proposta de valor / mapa de valor / perfil do cliente |
| Products and services / Pain relievers / Gain creators / Jobs / Pains / Gains (canvas labels) | Produtos e serviços / Aliviadores de dores / Criadores de ganhos / Tarefas / Dores / Ganhos |
| fit | encaixe |
| hypothesis / pass mark / "Pass if" | hipótese / critério de aprovação / "Passa se" |
| go / iterate / stop (marks and zones) / "Go / stop" (column) / direction only | seguir / iterar / parar / "Seguir / parar" / só direção |
| Wilson interval | intervalo de Wilson |
| "We believe that…" (hypothesis column) | "Acredito que…" |
| hold (an item) / no-show | segurar (um item) / falta (o comprador não aparece) |
| browse / ask (the agent) | explorar / perguntar (ao agente) |
| instant answer | resposta na hora |
| till / till data | caixa / dados de caixa |
| collection window | janela de retirada |
| cold start | partida a frio |
| merchant side | lado da loja |
| service blueprint / lane / touchpoint | blueprint de serviço / raia / ponto de contato |
| line of interaction / line of visibility / line of internal interaction | linha de interação / linha de visibilidade / linha de interação interna |
| fail point | ponto de falha |
| standing request / request left ahead of time | pedido recorrente / pedido deixado com antecedência |
| orchestrator / stock agent / matching agent / contact agent / payment agent / courier agent | orquestrador / agente de estoque / agente de seleção de lojas / agente de contato / agente de pagamento / agente de entrega |
| Position on the brief (decision-log label) | Posição no brief |
| collection point / locker / evening delivery | ponto de retirada / armário / entrega à noite |
| later collection (slot) / after work | retirada mais tarde (horário) / depois do trabalho |
| one-off alert ("tell me when it's back") / recurring order ("bread every Friday") | aviso pontual ("me avisa quando voltar") / pedido recorrente ("pão toda sexta") |
| reported stock / recent confirmation / item set aside | estoque informado / confirmação recente / item separado |
| set aside (an item) | separar (um item) |
| stated choice / behaviour (test result) | escolha declarada / comportamento ("Declarado:" / "Comportamento:" in pass marks) |
| exploratory (hypothesis) | exploratória |
| request (what a shopper asks Snuffle for) / ask (one request sent to one shop) | pedido / consulta |
| request filled / valid answer | pedido atendido / resposta válida |
| charge / authorise / capture / refund | cobrar / autorizar / capturar / estornar (estorno) |
| proof of concept | prova de conceito |
| ideation / canvas / wireframe | ideação / canvas / wireframe |
| composer (the concierge bar) | barra de pedido |
| tab bar / avatar menu / settings / sheet (iOS) / large title | barra de abas / menu do avatar / ajustes / sheet / título grande |
| home screen / module (home) | tela inicial / módulo |
| request / order (in the app) | pedido / compra ("compras recentes") |
| promotion (paid) / promoted / promoted slot | destaque pago / em destaque / espaço em destaque |
| revenue / payment provider / payout | receita / provedor de pagamento / repasse |
| POS / card terminal | POS / maquininha |
| network (the provider's) / paid reach | rede / alcance pago |
| acquisition channel | canal de aquisição |
| prepaid order | pedido pré-pago |
| Live Activity, Human Interface Guidelines, Material Design | stay in English |
| interface copy quoted from the wireframes ("Open near you", "Promoted") | stays in English |
| errand (what the shopper asked in one go) | tarefa |
| tab (top tabs in the app) / bottom tab bar | aba / barra de abas embaixo |
| inbox (messaging) / row (in a list) | caixa de mensagens / linha |
| version menu | menu de versões |
| interface copy (Nearby, Requests, Errands, Chats, Orders) and version labels (v1, v2) | stay in English |
| connected shop / asked shop | loja conectada / loja consultada |
| hold (paid) / reserve (unpaid) | reserva paga, "guardar" / reservar sem pagar |
| collection day | dia de retirada |
| warm grey / accent / tint | cinza quente / acento / tint |
| design system | design system |
| Where it stands (board area) | Onde está |
| retriever | retriever (sem tradução; Golden Retriever, Labrador) |
| brand | brand (sem tradução, para não confundir com marca = mark) |
| naming | naming |

## Terms settled for ratings
| English | PT-BR |
| --- | --- |
| rating / Rate (the action) | avaliação / Rate (interface copy stays in English) |
| buyer (who bought and can rate) / "buyers" in interface copy | quem comprou / "buyers" stays in English |
| would go back / "Would you go back?" | voltaria / stays in English |
| thumbs up / thumbs down | polegar para cima / polegar para baixo |
| rating tag | tag de avaliação |
| signals (Snuffle's) / "What Snuffle saw", "What buyers said" | sinais (do Snuffle) / stay in English |
| answer rate / stock accuracy / reply time | taxa de resposta / precisão de estoque / tempo de resposta |
| reliability row / rating summary / review card / product summary / rating sheet | linha de confiabilidade / resumo das avaliações / cartão de avaliação / resumo do que vende / sheet de avaliação |
| "What they sell", "How they do on Snuffle", "What buyers say", "How ratings work" | stay in English |
| dispute (a case) | contestar (um caso) / contestação |
| review gating | review gating |
| review policy | política de avaliações |
| incentivised review | avaliação com incentivo |
| synthetic test users | usuários sintéticos de teste |
| persona-driven scenario test | teste de cenário guiado por persona |

## Terms settled for measurement
| English | PT-BR |
| --- | --- |
| measurement plan / product metrics / tasks and events | plano de medição / métricas de produto / tarefas e eventos |
| hand-run concierge | concierge feito à mão |
| fill rate | taxa de atendimento (fill rate on first use) |
| north star / guardrail / liquidity | north star / guardrail / liquidez |
| answer burden | carga de respostas |
| time on task / task success / abandonment | tempo na tarefa / sucesso na tarefa / abandono |
| service record / app analytics | registro do serviço / analytics do app |
| POS attach | adesão ao POS |
| event names (`request_created`…) | stay in English, in code format |
