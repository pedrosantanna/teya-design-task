# Proto-personas

Plotei 20 posts etiquetados em duas dimensões, urgência da necessidade e etapa da compra, e deixei os clusters se formarem. Três clusters tiveram o melhor resultado com as configurações que escolhi, e cada um virou uma proto-persona.

```summary
Takeaways:
- Sam (11 posts) precisa de uma coisa específica, muitas vezes com prazo, e não consegue saber quem tem. Ele fica do lado da findability.
- Jess (6 posts) faz quase sempre compras de rotina, que travam na hora de conseguir a coisa: horário, dinheiro vivo, prazo de entrega. Ela desiste do comércio local. Lado da transaction.
- Ruth (3 posts) continua comprando no comércio local enquanto as lojas dela fecham. É a que tem menos evidência.
Call:
- Defini o método: etiquetar os posts, pontuá-los em duas dimensões que dialogam com o brief, fazer a clusterização e definir as personas a partir dos clusters.
- Chamei-as de proto-personas, porque ninguém foi entrevistado ([000](../../decision-log.md)).
AI:
- Dois agentes etiquetaram cada post separadamente, a partir de uma lista fixa de etiquetas. Um script pontuou as duas dimensões e rodou a clusterização.
- Eu escolhi as dimensões e conferi os clusters com as citações.
Trade-offs:
- Cada cluster tem de 4 a 11 posts. Trato os clusters como direções para testar no Define.
- Construídas a partir de dados atitudinais de posts públicos: o que as pessoas dizem sobre as próprias compras. O comportamento de ninguém foi observado.
```

## Dimensões

| Dimensão | O que mede | Por que eu escolhi |
| --- | --- | --- |
| **Urgência da necessidade** · passeando → precisa agora | Quão específica e presa a um prazo era a necessidade do comprador: passeando, compras de rotina, um item específico ou um item específico com prazo. | Separa as ocasiões que a netnografia mostrou repetidas vezes, de uma volta sem compromisso a uma busca para o mesmo dia. Cada ocasião pede algo diferente de um produto. |
| **Etapa da compra** · saber → levar | A etapa da compra onde está o problema do post, numa ordem que eu escolhi: 1 saber (quem tem, se está aberto), 2 encontrar o item na loja, 3 aceitar preço e qualidade, 4 levar (pagar, retirar ou receber num horário possível). Cada post recebe o número da sua etapa, o que não mostra que o comprador passou pelas anteriores. | Se traduz direto no brief. Parar na etapa 1 é um problema de findability, parar na etapa 4 é um problema de transaction, e as etapas 2 e 3 são a oferta da própria rua. |

As duas são pontuadas a partir de etiquetas que dois agentes aplicaram separadamente. Eles concordaram em 89–96% dessas etiquetas. Mais em [dimensões propostas](../netnography/dimensions.md).

## Mapa

<!-- generated:chart -->
```cluster-map
{"x": {"label": "Need urgency", "ticks": [[1, "Discovery"], [4, "Routine"], [7, "Specific item"], [10, "Specific + deadline"]], "min": "Browsing", "max": "Needs it now"}, "y": {"label": "Purchase stage", "ticks": [[10, "1 · Find out"], [6.7, "2 · Find it"], [3.3, "3 · Accept it"], [0, "4 · Get it"]], "min": "Get it · transaction", "max": "Find out · findability"}, "names": {"mission": "Sam, the mission shopper", "lapsed": "Jess, the lapsed local", "regular": "Ruth, the regular"}, "centres": {"mission": {"x": 9.2, "y": 8.8, "n": 11}, "lapsed": {"x": 5.5, "y": 0.5, "n": 6}, "regular": {"x": 4.0, "y": 7.8, "n": 3}}, "points": [{"x": 10, "y": 10, "c": "mission", "s": "unknown", "h": "u/jamesshovlin"}, {"x": 10, "y": 10, "c": "mission", "s": "unknown", "h": "u/akat224"}, {"x": 10, "y": 6.7, "c": "mission", "s": "persists", "h": "u/moanyjoany"}, {"x": 7, "y": 10, "c": "mission", "s": "defects", "h": "Dbank"}, {"x": 7, "y": 10, "c": "mission", "s": "unknown", "h": "u/dy14n19"}, {"x": 4, "y": 10, "c": "regular", "s": "persists", "h": "Valentando"}, {"x": 10, "y": 6.7, "c": "mission", "s": "defects", "h": "u/Mediocre_Sprinkles"}, {"x": 4, "y": 0, "c": "lapsed", "s": "defects", "h": "LividArse"}, {"x": 10, "y": 0, "c": "lapsed", "s": "unknown", "h": "u/WearyChampionship365"}, {"x": 10, "y": 6.7, "c": "mission", "s": "unknown", "h": "u/Miraclefish"}, {"x": 4, "y": 0, "c": "lapsed", "s": "unknown", "h": "FerrisWheelsandLilacs"}, {"x": 10, "y": 6.7, "c": "mission", "s": "unknown", "h": "u/xmastreee"}, {"x": 4, "y": 0, "c": "lapsed", "s": "defects", "h": "u/killmetruck"}, {"x": 4, "y": 6.7, "c": "regular", "s": "persists", "h": "u/mjfh2"}, {"x": 4, "y": 6.7, "c": "regular", "s": "unknown", "h": "u/Aggravating-Desk4004"}, {"x": 4, "y": 0, "c": "lapsed", "s": "unknown", "h": "u/rsweb"}, {"x": 7, "y": 10, "c": "mission", "s": "unknown", "h": "@Jojo_agboola"}, {"x": 10, "y": 10, "c": "mission", "s": "unknown", "h": "u/grand_web"}, {"x": 10, "y": 10, "c": "mission", "s": "unknown", "h": "u/claudiav2603"}, {"x": 7, "y": 3.3, "c": "lapsed", "s": "defects", "h": "u/Username8831"}], "worked": ["u/jamesshovlin", "u/Inge_Jones", "u/Vermathorax", "u/rising_then_falling", "u/Peppy_Tomato", "Kenjenny"]}
```
<!-- /generated:chart -->

<!-- generated:groups -->
| Grupo | Posts | Pessoas | Centro (urgência, etapa) | Fontes | Onde parou | O que fizeram depois |
| --- | --- | --- | --- | --- | --- | --- |
| Sam, o comprador em missão | 11 | 11 | 9.2, 8.8 | West London 4, London 3, Reino Unido 3, X/TikTok 1 | information 7, availability 4 | unknown 8, defects 2, persists 1 |
| Jess, a local que desistiu | 6 | 6 | 5.5, 0.5 | Reino Unido 3, West London 2, London 1 | access 5, value 1 | defects 3, unknown 3 |
| Ruth, a frequentadora | 3 | 3 | 4.0, 7.8 | Reino Unido 1, London 1, West London 1 | availability 2, information 1 | persists 2, unknown 1 |
| Nada deu errado (fora dos clusters) | 6 | 6 | – | London 3, Reino Unido 2, West London 1 | none 6 | unknown 4, persists 1, defects 1 |
<!-- /generated:groups -->

Como as pontuações e os clusters foram calculados: [método](method.md).

Os nomes são primeiros nomes britânicos comuns, curtos e fáceis de distinguir, e as fotos são substitutas tiradas do Unsplash. Os posts raramente dizem a idade ou o gênero de alguém, então nomes, pronomes e fotos não carregam evidência. Escolhi os gêneros para equilibrar o conjunto, duas mulheres e um homem. Os atributos de cada card vêm dos posts do cluster, menos a idade de Ruth, que vem de pesquisa documental.

## Sam, o comprador em missão

```persona
name: Sam, o comprador em missão
tagline: Precisa de uma coisa específica, muitas vezes com prazo, e não consegue saber quem tem.
image: ../../../discover/personas/img/sam.jpg
credit: Photo: Elizeu Dias, Unsplash
credit_url: https://unsplash.com/photos/selective-focus-of-man-smiling-during-daytime-2EGNqazbAMk
- Onde: Mora ou trabalha no oeste de Londres
- Pergunta a: Reddit, grupos de WhatsApp, chatbots de IA
- Compra no comércio local: Um item específico, em cima da hora
```

| | |
| --- | --- |
| **Jobs to be done** | Descobrir qual loja próxima tem um item específico, antes de sair. Conseguir o item a tempo. |
| **Casos de uso** | Óculos para eclipse na véspera. Um ventilador numa onda de calor. Saber se uma confeitaria ainda está aberta. Um site mostrando estoque que a loja não tinha. |
| **Dores** | Nenhuma informação de estoque ou horário em que ele confie. Idas perdidas, prateleiras esgotadas. |
| **Ganhos** | Saber antes de sair. Conseguir hoje. |
| **Influências** | Threads do Reddit, grupos de WhatsApp sobre reposição, chatbots de IA. |
| **Para o brief** | Findability. A pergunta é "who has it, right now?" (quem tem, agora?) |

#### Evidência

**Item específico, muitas vezes com prazo · parou na etapa 1 (saber) ou 2 (encontrar).** O maior cluster, com 11 posts de 11 pessoas. Oito deles têm prazo.

```quote
text: Does anyone know any places that have a portable AC in stock around London? Wife is pregnant so need to get one asap!
handle: u/akat224
network: Reddit · r/london
date: 2026-06-24
url: https://www.reddit.com/r/london/comments/1ueg96t/
tags: stock-visibility, urgency
context: Post de abertura durante a onda de calor de junho de 2026; o ar-condicionado pedido online chegou com defeito.
status: verified
```

## Jess, a local que desistiu

```persona
name: Jess, a local que desistiu
tagline: Usaria as lojas do bairro se elas coubessem na semana dela. Não cabem, então ela parou.
image: ../../../discover/personas/img/jess.jpg
credit: Photo: Jake Nackos, Unsplash
credit_url: https://unsplash.com/photos/IF9TK5Uy-KI
- Onde: Londres e outras partes do Reino Unido
- Semana: Está trabalhando no horário em que as lojas abrem
- Paga: Cartão ou celular, sem dinheiro
- Compra: Supermercado e Amazon para as compras de rotina
- Compra no comércio local: Só em ocasiões especiais
```

| | |
| --- | --- |
| **Jobs to be done** | Resolver as compras de rotina com o menor esforço. |
| **Casos de uso** | Lojas independentes fechadas quando ela sai do trabalho. O açougue para aniversários de casamento, o supermercado para a semana. Barracas que só aceitam dinheiro. |
| **Dores** | Lojas abertas só enquanto ela está no trabalho. Um preço mais alto no comércio local sem conveniência extra. |
| **Ganhos** | Sempre aberto, sem surpresas. |
| **Influências** | Hábito: Amazon, o supermercado. |
| **Para o brief** | Transaction. Retirada fora do horário, pagamento com cartão ou entrega a partir da loja do bairro. |

#### Evidência

**Compras quase sempre de rotina · parou na etapa 4 (levar).** Seis posts: horários que batem de frente com o trabalho, barracas que só aceitam dinheiro vivo, uma entrega que não chega a tempo, um preço que não vale a pena. Em três deles ela desiste do comércio local.

```quote
text: So I end up in McDonald's, cos it's always open, and shop on Amazon, because it's always there.
handle: LividArse
network: Mumsnet · Talk › AIBU
date: 2025-12-05
url: https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977221
tags: opening-hours, online-default
context: Mesma thread do Mumsnet sobre o horário das lojas independentes.
status: verified
```

## Ruth, a frequentadora

```persona
name: Ruth, a frequentadora
tagline: Continua comprando no comércio local enquanto as lojas dela fecham.
image: ../../../discover/personas/img/ruth.jpg
credit: Photo: Vitaly Gariev, Unsplash
credit_url: https://unsplash.com/photos/elderly-woman-smiling-in-a-living-room-IihDS3WZGlY
- Onde: Principalmente oeste de Londres (Kew, Ealing, Hammersmith)
- Idade: Provavelmente 50 anos ou mais | pesquisa documental
- Rotina: Açougue toda semana, balcão dos correios na banca de jornal
- Quando uma loja fecha: Vai até a próxima, mais longe
- Fica sabendo por: Vizinhos, fóruns locais
```

| | |
| --- | --- |
| **Jobs to be done** | Continuar usando as lojas de que depende. |
| **Casos de uso** | O açougue de toda semana, fechado no dia em que ela foi. O açougue mais próximo, que agora exige ir até Chiswick. Comprar alguma coisa na banca de jornal cada vez que usa o balcão dos correios de lá. |
| **Dores** | Lojas práticas fechando. Horários que não são cumpridos. |
| **Ganhos** | Uma relação com a loja. Qualidade e pedidos especiais. |
| **Influências** | Vizinhos, fóruns locais, campanhas "shop local" (compre no comércio local) da prefeitura. |
| **Para o brief** | Nenhum dos dois problemas, diretamente. Ela precisa saber o que ainda está lá e aberto. Essa é uma forma mais leve de findability. |

**Por que 50 anos ou mais.** Os posts não dizem idades e o Reddit puxa para um público jovem, então a idade de Ruth vem de pesquisa documental. Numa pesquisa do YouGov para a GLA em 2018, os londrinos de 50 a 64 anos eram os mais propensos a visitar uma high street toda semana (61%, contra 48–51% dos menores de 50) e a procurar lojas independentes ou feiras (57% contra 46–48%). Os de 65 anos ou mais eram os mais propensos a dizer que as lojas da high street são muito importantes (64%, contra 36% dos de 18 a 24) ([GLA/YouGov, 2018](https://data.london.gov.uk/download/gla-poll-results-2018/f9749162-4ba4-4370-a01e-459cde67158d/October%25202018%2520GLA%2520YouGov%2520poll%2520results%2520.pdf)). Compradores mais velhos também compram menos online ([ONS, 2020](https://www.ons.gov.uk/peoplepopulationandcommunity/householdcharacteristics/homeinternetandsocialmediausage/bulletins/internetaccesshouseholdsandindividuals/2020)). As diferenças são moderadas e maiores entre 50 e 64 anos. Nenhuma fonte mede lealdade às lojas por idade, e a FCA conclui que a exclusão digital e a renda, mais do que a idade em si, explicam a dependência do dinheiro vivo ([FCA, 2024](https://www.fca.org.uk/publication/research-notes/research-note-cash-reliance.pdf)). Então a idade dela é um palpite fundamentado, para testar em entrevistas.

#### Evidência

**Compras de rotina · parou na etapa 2: a loja não estava lá.** Quatro posts, o menor cluster. Ela continua indo às lojas do bairro enquanto o açougue e as agências dos correios ao redor fecham.

```quote
text: Having to go to Chiswick is a pain though.
handle: u/mjfh2
network: Reddit · r/london
date: 2025-09-17
url: https://www.reddit.com/r/london/comments/1niwnlw/comment/nemvjcy/
tags: access-transport, decline-closure
context: Mesma thread; o açougue mais próximo agora exige um deslocamento.
status: verified
```

## O que testar primeiro

As personas vêm de posts públicos, então só cobrem quem posta. Antes de me comprometer com uma delas no Define, quero conferir três coisas com cerca de vinte compradores na King Street, com um protótipo simples na frente deles quando couber:

- **Ruth:** comprar no comércio local de forma rotineira e leal é sobretudo um hábito de quem tem mais de 50 anos, como as pesquisas de Londres sugerem? E como as pessoas que nunca postam online descobrem o que ainda está aberto?
- **Sam:** uma loja confirmar "it's here, I'll hold it" (está aqui, eu separo para você) bastaria para ele decidir ir até lá?
- **Jess:** o que pesa mais, o horário de funcionamento, a retirada fora do horário ou o pagamento com cartão?

## Posts em que nada deu errado

Seis posts ficam fora do mapa: um restaurante favorito pedido pelo Deliveroo, um açougue que corta sob encomenda, click and collect (compra online, retirada na loja) escolhido pelo controle sobre o horário. Eles mostram a high street, a rua comercial do bairro, funcionando, e são os mais próximos de Ruth.
