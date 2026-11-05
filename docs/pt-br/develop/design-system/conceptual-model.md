# Modelo conceitual

Os objetos do app, o que o comprador pode fazer com cada um, os estados por que cada um passa e as palavras que a interface usa para eles. As telas são conferidas contra ele: uma tela nova mostra um destes objetos na forma definida, com os verbos e os rótulos de status definidos.

```summary
Takeaways:
- Quatro objetos: Request (pedido), Shop (loja), Answer (resposta) e Order (compra). O Snuffle é a voz que fala com o comprador, não um objeto. Um item nunca é objeto: lojas pequenas não têm catálogo, então um item é texto e quantidade dentro de um pedido, de uma resposta ou de uma compra.
- O lugar de onde o comprador está comprando (a localização atual ou um lugar salvo, com um raio a pé) é um atributo da sessão. Ele define quais lojas e ruas contam, e o modelo mantém os seus quatro objetos.
- Cada objeto tem uma forma de cartão e uma de detalhe: um pedido é uma linha que abre sua conversa, uma resposta é um cartão na conversa que abre uma folha de detalhes, uma compra é um cartão que abre o recibo, uma loja é uma linha que abre a página da loja.
- Um verbo por ação no app inteiro. Buy é o único jeito de pagar; a loja separa; o comprador retira.
- Uma tabela só de rótulos de status, usada igual nas linhas, nos cartões da conversa, nas notificações e na Live Activity. O dinheiro tem três desfechos que o comprador vê: pago, não cobrado, reembolsado.
- Uma avaliação é um atributo da compra, então só quem retirou ou recebeu uma compra pode avaliá-la. A página da loja mostra dois sinais identificados pela origem, "Ratings" e "How they do on Snuffle", e um resumo do que a loja vende; os três são atributos da loja.
Call:
- Pedi um modelo conceitual antes de mais telas: os objetos, o que o comprador faz com cada um, seus estados e palavras, simples e apoiado em referências e na pesquisa.
- Decidi os quatro pontos em aberto (decisão 039): o item fica fora do modelo, o pedido que fica aberto é "Keep looking", a resposta da loja é "answer" e as lojas aparecem como tiles com foto na home. Segue as decisões 025, 031 e 037.
- Perguntei se um só "answer" serve tanto para o estoque de uma loja conectada quanto para a resposta de uma loja consultada, e fechei as lacunas que a revisão das telas encontrou.
- Nesta rodada pedi um fluxo de localização: o endereço no topo de Nearby abre uma sheet para escolher o lugar e o raio, e os lugares salvos são gerenciados pela conta.
- Depois pedi avaliações e um resumo do que a loja vende na página da loja. Escolhi um polegar para cima ou para baixo para "Would you go back?" em vez de estrelas, mostrar a precisão de estoque só depois de 10 respostas "has it" e dar à loja um jeito de contestar um caso específico (decisão 047).
AI:
- Um agente procurou na netnografia, no mapa de empatia, nas personas e nos benchmarks as palavras que os compradores usam e os objetos em que pensam, conferiu as referências abaixo e propôs os objetos, verbos, estados e termos. Também listou onde a v7 quebra o modelo. Eu pedi um modelo simples e apoiado em referências antes de desenhar mais telas.
- Um agente acrescentou o lugar ao modelo como atributo da sessão, seguindo a decisão 024, e escreveu o fluxo nos componentes.
- Um agente comparou como oito produtos coletam e mostram avaliações, leu as regras do Reino Unido sobre avaliações de consumidores e propôs onde as avaliações ficam: na compra, com os sinais do próprio Snuffle na loja. Ele manteve os quatro objetos.
Trade-offs:
- Deixar o item fora do modelo combina com lojas sem catálogo e abre mão de uma página por item, então "quem mais tem" fica no pedido, não no item.
- Request é palavra nossa: os compradores escrevem perguntas, não pedidos. O teste do protótipo vai mostrar se a lista de Requests faz sentido.
- Prender a avaliação a uma compra faz com que só quem comprou avalie, o que mantém as avaliações honestas e deixa uma loja nova ou pouco usada com poucas delas; os sinais do Snuffle cobrem essa falta a partir das respostas.
```

## Fontes do modelo

Pedi um modelo que partisse de como os compradores já pensam e de práticas consolidadas, antes de desenhar mais telas.

| Referência | O que pede ao designer |
| --- | --- |
| Johnson e Henderson, "Conceptual models: begin by designing what to design", *interactions*, 2002 | Projetar o que o sistema é para quem usa (objetos, atributos, ações, termos) antes das telas, e mantê-lo tão simples quanto as tarefas permitem |
| Johnson e Henderson, *Conceptual Models: Core to Good Design*, 2011 | Transformar o modelo numa análise de objetos e operações mais um léxico, um termo por conceito, e conferir cada tela e cada texto contra ele |
| Norman, *The Design of Everyday Things*, edição revista de 2013 | O designer só chega ao usuário pela imagem do sistema (telas, rótulos, mensagens), então ela precisa mostrar o modelo de design de forma consistente |
| Nielsen Norman Group, modelos mentais | Descobrir o que o usuário já acredita e se encaixar nisso ou ensinar a diferença de propósito; as pessoas trazem o que sabem de outros produtos |
| Prater, Object-Oriented UX e o processo ORCA | Tirar os substantivos da pesquisa, mapear as relações nos dois sentidos, listar quem pode fazer o quê com cada objeto, dar a cada objeto um cartão e uma tela de detalhe consistentes |
| Jackson, *The Essence of Software*, 2021 | Dar a cada conceito um propósito só; muitos problemas de usabilidade são conceitos confusos, não layout |
| Apple Human Interface Guidelines, princípios de design e escrita | Depois que o comportamento ou o texto de um elemento está definido, usá-lo em todo lugar; construir sobre padrões que as pessoas conhecem do sistema |

## O que a pesquisa mostra

Os compradores da netnografia pensam em itens e lugares: "any places that have…", "in stock", "sold out", uma loja com nome numa rua com nome. Perguntar à loja já é hábito deles ("call before travelling"), então o Snuffle perguntar às lojas se encaixa nisso. "Collect" e "click and collect" são os verbos deles para pegar o item, e eles esperam reembolso quando o item não está lá. "Order" cobre comprar a distância e a coisa comprada.

Não há evidência de "errand", "basket", "hold" ou "reserve" nas palavras dos compradores, nem de pagar adiantado a uma loja independente pequena. "Request" também é palavra nossa. Fontes: [achados](../../discover/netnography/findings.md), [mapa de empatia](../../discover/netnography/empathy-map.md), [benchmarks](../../discover/benchmarks.md), [conclusão](../../discover/conclusion.md).

| Como o comprador vê | Como o app modela | Risco |
| --- | --- | --- |
| Uma pergunta sobre um item | Um pedido, uma conversa que pode ter vários itens | O nome Requests e a separação de pedidos (decisão 025) não foram testados |
| "Order" é tanto comprar quanto a coisa comprada | Buy é o verbo, order o substantivo | Pequeno, se "order" nunca aparecer como verbo |
| Click and collect das redes, pago, cerca de uma semana | Comprar numa loja independente; cobrado quando a loja confirma | "Autorizado" e "a autorização caiu" não são palavras deles, então a conversa nunca as usa |
| A loja atende o telefone | O Snuffle responde pelas lojas | O comprador precisa ver de quem são as palavras que está lendo (decisão 031) |

## Objetos

| Objeto | Nas palavras do comprador | Atributos principais | Relações | Cartão → detalhe |
| --- | --- | --- | --- | --- |
| Request (pedido) | O que eu pedi | Itens e quantidade, prazo, área, retirar ou entrega, repetição | Tem muitas respostas e quantas compras houver | Linha em Requests → a conversa |
| Shop (loja) | A loja | Nome, rua, tempo a pé, aberta até, feito sob encomenda com antecedência ("2 days' notice"), responde pelo caixa ou por mensagem, janela de retirada, entrega e taxa; o que vende; avaliações; como se sai no Snuffle | Dá muitas respostas, tem muitas compras | Tile com foto em Nearby, a home; linha em qualquer outra lista → página da loja |
| Answer (resposta) | "A Paper & Co tem" | Loja, o que tem (tudo, parte, algo parecido), preço, origem da resposta, data limite de retirada, entrega | Pertence a um pedido e a uma loja; pode virar uma compra | Linha compacta na lista de lojas perguntadas, cartão completo na conversa quando a loja responde → folha de detalhes, onde o comprador compra. O nome da loja na linha, no cartão e no cartão de compra é um link para a página da loja |
| Order (compra) | Minha compra | Itens, loja, total, retirar ou entrega, data limite de retirada, onde retira (a loja ou um ponto de retirada), código de retirada, pagamento, avaliação | Pertence a um pedido, a uma loja e a uma resposta | Cartão na conversa com o rótulo de status → recibo, que tem o código de retirada |

## Uma resposta, duas origens

O POS de uma loja conectada compartilha o estoque, então a resposta dela chega na hora e a venda também; uma loja consultada responde a uma mensagem no seu tempo e confirma depois que o comprador compra (decisão 031). As duas são o mesmo objeto porque fazem o mesmo trabalho para o comprador: dizer se a loja tem o item, por quanto e até quando. O que muda é a origem, que todo cartão de resposta mostra: "Has it · replied 2 min ago" para uma loja consultada, "In stock now · from the shop's till" para uma loja conectada, encurtado nas linhas compactas para "In stock now" ou "In stock · 1 of 2" ao lado do símbolo de raio, que representa o caixa (o VoiceOver continua lendo "from the shop's till"), e os passos depois do Buy: uma resposta vinda do caixa pula o "Waiting for [loja]". A palavra "answer" fica nos docs e em "replied"; a interface mostra o status, não o nome do objeto.

Todo cartão de resposta tem a loja como título. Quando a loja oferece algo parecido, o item oferecido vai na linha de status depois de "Has something similar", e o título continua sendo o nome da loja.

## Avaliações e sinais

Uma avaliação pertence a uma compra e só nasce de uma compra marcada como Collected ou Delivered, uma por compra, editável por 30 dias. Um quinto objeto daria às avaliações vida própria; na compra, uma avaliação só existe onde houve uma compra.

| Atributo da avaliação | Valores |
| --- | --- |
| Would you go back? | Polegar para cima ou para baixo |
| Tags | Até três de uma lista fixa que muda com a resposta. Para cima: "Had it as promised", "Set aside on time", "Friendly", "Good value", "Knew their stuff". Para baixo: "Wasn't as described", "Not ready when I came", "Hard to find" |
| Nota | Opcional, no máximo 140 caracteres, filtrada para abuso e dados pessoais |
| Data | O mês da compra ("Oct 2026") |
| Resposta da loja | Uma resposta pública da loja |

A página da loja mostra dois sinais com títulos separados, para o comprador saber quem está falando. Os dois são atributos da loja.

| Sinal | Origem | Aparece como |
| --- | --- | --- |
| Ratings | Avaliações de compras retiradas e entregues | "92%" com "would go back" e "38 people", e a contagem de cada tag; cada nota mostra o primeiro nome da pessoa e o mês, nunca sobrenome nem foto, e "You" na nota da própria pessoa. Abaixo de 5 avaliações, só as tags: "New on Snuffle" e "3 people so far" |
| How they do on Snuffle: taxa de resposta | Respostas | "Answers 9 in 10 requests" |
| How they do on Snuffle: precisão de estoque | Respostas e compras | "Had it 24 of 25 times when they said yes", só depois de 10 respostas "has it"; antes disso, "New on Snuffle" com a taxa e o tempo de resposta |
| How they do on Snuffle: tempo de resposta | Respostas | "Usually replies in 6 min"; uma loja conectada mostra "Stock from the till" |

O que a loja vende é um terceiro atributo da loja. O de uma loja conectada vem das categorias e dos mais vendidos do caixa; o de uma loja consultada, das respostas "Had it" passadas e do tipo de loja. Aparece como chips de categoria, cada um abrindo o Ask com a categoria preenchida, uma linha de preço ("Most items £2–£35, from past answers" ou "from the shop's till"). Os itens continuam sem página. Abaixo dela, "Found here recently" lista de três a cinco nomes de itens que compradores encontraram na loja, resumindo só pelo nome as respostas "Had it" dela: nada para tocar, sem comprador e sem preço, com uma linha que diz de onde vêm. As linhas "Had it, 2 hours ago" por resposta ficam no chat. Cada nome da lista mostra quando foi encontrado pela última vez ("Yesterday", "2 days ago"), em texto simples no fim da linha.

A página da loja segue esta ordem: cabeçalho e ações, What they sell, Found here recently, How it works, Ratings, How they do on Snuffle.

A loja vê os próprios sinais e pode contestar um caso específico, como um "Not ready when I came" numa compra que ela separou no prazo. A loja não tem interface, então isso fica nos estados do pedido do lado da loja.

## Lugar

A área do comprador (decisão 024) vem de um lugar e de um raio. Os dois pertencem à sessão do comprador; um pedido guarda a área em que foi feito.

| Atributo | Valores | Onde se define |
| --- | --- | --- |
| Lugar | Localização atual, um lugar salvo (Home, Work) ou um endereço que o comprador buscou | A sheet "Where are you shopping?", aberta pelo endereço no topo de Nearby ("Blythe Road, W14 ›") |
| Raio | Within 10, 15 ou 20 min walk | A mesma sheet |
| Lugares salvos | Adicionar, renomear, apagar | A linha Places na sheet da conta |

Escolher um lugar ou um raio recarrega Nearby. O lugar ativo só muda pelo topo de Nearby; a sheet da conta gerencia a lista.

## Ações

| Objeto | O comprador | Outros |
| --- | --- | --- |
| Request | Ask, Split into 2 ou Keep as one, Keep looking, Close | O Snuffle pergunta às lojas |
| Shop | Ask, Directions, Call | nenhum |
| Answer | Buy (abre a folha de detalhes, como um toque no cartão), Show me (para algo parecido), No thanks | A loja responde |
| Order | Extend, Cancel for a refund, Directions, Rate (depois de retirada ou entregue, por 30 dias) | A loja separa, marca como retirado, envia; responde uma vez a uma avaliação, contesta um caso |

## Estados

| Objeto | Rótulos, em ordem |
| --- | --- |
| Request | "Asking 6 shops" → "2 shops have it" → "Needs you · [o quê]"; esperando por escolha: "Looking · until Fri 6 Nov" ou "Every Friday"; nada encontrado: "Not found"; fechado pelo comprador: "Closed". Quando existe uma compra, a linha mostra o rótulo da compra. Vale um sufixo de prazo ("2 shops have them · by 4pm"). Os filtros agrupam os estados: Needs you, Looking (o Snuffle ainda está procurando, uma vez ou de forma recorrente), Waiting (uma compra espera a loja ou a retirada), Done |
| Answer | "Asked" → "Seen" → "Has it", "Has 1 of 2", "Has something similar", "Doesn't have it" ou "No reply"; vinda do caixa: "In stock now" ou "In stock now · 1 of 2", seguido de "· from the shop's till" (nas linhas compactas o símbolo de raio substitui o sufixo, e "In stock now · 1 of 2" encurta para "In stock · 1 of 2"); sob encomenda: "Can make it · [antecedência]" ("Can make it · 2 days' notice"); na página da loja, respostas passadas: "Had it · [quando]", "Didn't have it · [quando]" |
| Order, retirada | "Waiting for [loja] · not charged yet" → "Ready · collect by Mon 9 Nov" → "Extended · collect by Mon 16 Nov" → "Collected" → "Collected · rate [loja]" até quem comprou avaliar (aí "Collected · rated") ou passarem os 30 dias; finais: "Not confirmed · not charged", "Sold · not charged", "Cancelled · refunded", "Not collected · refunded". Depois de uma compra parcial, o cartão ganha uma linha, "Keep looking for [n] more" |
| Order, entrega | "Waiting for [loja] · not charged yet" → "Paid" → "On its way" → "Delivered", seguido do balão do Snuffle "How was [loja]?" com um chip Rate. Um pagamento que falha não cria compra; o pedido mantém o rótulo dele |
| Shop | "Open until 7pm", "Closes soon", "Closed, opens 9am"; na página dela, pelas avaliações: "No ratings yet" com "Snuffle has asked them 4 times", "New on Snuffle" com "3 people so far" (abaixo de 5), "92%" com "would go back" e "38 people" |

Todo pedido abre como uma conversa completa, em qualquer estado: o que o comprador pediu, a confirmação do Snuffle, a lista de consulta, os cartões de resposta e de compra, e depois a única próxima ação que o estado permite. Needs you mostra o cartão de resposta com Buy e o prazo; um pedido recorrente mostra a compra da semana passada, a desta semana e Change e Stop; Collected termina no cartão da compra com Rate; Not found oferece Ask further away e Keep looking. Todo chat tem o compositor, e uma resposta que o protótipo não conhece recebe a resposta fora do roteiro.

O ponto num rótulo ("Ready · collect by Mon 9 Nov") só marca onde o estado termina e o detalhe começa. A interface desenha os dois em pesos e cores diferentes e nunca mostra o ponto (Linhas de metadados na página [Conteúdo](content.md)).

## Palavras

| Coisa | Interface | Docs | Evitar |
| --- | --- | --- | --- |
| O agente | Snuffle | Snuffle | concierge, assistant, AI |
| O que o comprador pediu | request | pedido | errand, search, saved request |
| A resposta de uma loja | answer, "replied" | resposta | offer, result, quote |
| Quem vende | shop | loja; loja conectada, loja consultada | store, merchant, retailer |
| Pagar | Buy, "Buy for £29.98" | comprar | hold, reserve, order como verbo |
| O que foi comprado | order | compra | purchase, booking, hold |
| O passo da loja | sets aside | separar | keeps, holds, puts aside |
| A janela de retirada | "Collect by Mon 9 Nov", com a duração uma vez antes do Buy ("7 days") | janela de retirada | pickup, hold for |
| Dinheiro | paid, not charged, refunded | autorizado, cobrado, autorização caiu, liberado | termos de pagamento na conversa |
| Um pedido que fica aberto | Keep looking | pedido em aberto | keep it open, save request |
| Onde o comprador está comprando | o endereço ("Blythe Road, W14"); "Places" para os salvos | lugar, área | neighbourhood, zone, high street |
| Prova no balcão | collection code | código | outros nomes |
| A home | Nearby | Nearby | Home, street |
| O veredito de quem comprou sobre uma compra | rating, Rate | avaliação | review, stars, score |
| Quem avalia | buyers | quem comprou | customers, reviewers, users |
| A pergunta da avaliação | "Would you go back?", "92% would go back" | voltaria | recommend, satisfied, "Excellent!" |
| As medidas do próprio Snuffle | "What Snuffle saw" | sinais | verified, trusted, score |

Os rótulos concordam com o item: "has it" para uma coisa, "has them" para várias. As mensagens para a loja no WhatsApp e no POS podem dizer autorizado e cobrado, e chamam uma venda pelo Snuffle de "Bought"; nunca dizem keep nem hold.

## Regras para as telas

| Regra | Na prática |
| --- | --- |
| Um cartão e um detalhe por objeto | Nenhum objeto ganha um segundo desenho de cartão |
| Um verbo, uma ação | Buy, Ask, Collect, Extend, Cancel e Keep looking querem dizer a mesma coisa em todas as telas |
| Uma tabela de status | Linhas, cartões da conversa, tela bloqueada, notificações e Live Activity usam os rótulos acima |
| Datas, não durações | O comprador vê "Collect by Mon 9 Nov"; a duração aparece uma vez, antes do Buy |
| O Snuffle fala, as lojas respondem | Loja nunca tem conversa própria; as respostas dela são cartões de resposta com a origem indicada |
| Propostas são balões | Uma proposta do Snuffle (separar, esclarecer) é um balão com chips de sugestão, nunca um cartão |
| Linhas enquanto pergunta | Na lista de lojas perguntadas, toda resposta é uma linha compacta, porque a lista mostra o progresso; os cartões de resposta completos aparecem na conversa |
| Item não tem página | Um item aparece dentro de um pedido, de uma resposta, de uma compra ou na página de uma loja |
| A compra fica no pedido | Requests é a única lista; não existe uma lista separada de compras |
| Avaliações vêm de compras | Só uma compra retirada ou entregue pode ser avaliada, uma vez; a página da loja mantém as avaliações de quem comprou e os sinais do Snuffle com títulos separados, cada um com a sua origem |
| Detalhe é empurrado, tarefa é sheet | A forma de detalhe de um objeto (página da loja, conversa do pedido, recibo) é empurrada e sai com Voltar; uma tarefa (a folha de detalhes onde o comprador compra, pagar, estender, escolher o lugar, a conta) é uma sheet e sai com Fechar; o código de retirada ampliado é um modal com Fechar |

## Pontos decididos

- O item fica fora do modelo.
- "Keep looking" é o nome do pedido que fica aberto. Substitui "Tell me when it's back", "Keep it open" e "Save request", e a lista de pedidos guardados vira um filtro Looking em Requests. Comprar de novo depois que uma compra termina é Ask, porque a loja precisa responder de novo.
- "Answer" é a palavra da interface para a resposta de uma loja.
- As lojas aparecem como tiles com foto em Nearby e como linhas nas outras listas.
- Uma avaliação é atributo da compra; os sinais e o que a loja vende são atributos da loja (decisão 047).

## Referências

- Johnson, J. e Henderson, A. (2002). Conceptual models: begin by designing what to design. *interactions* 9(1), 25–32. https://courses.dubberly.com/frameworks_2024_fall/Conceptual_ModelsInteractionsPaper.pdf
- Johnson, J. e Henderson, A. (2011). *Conceptual Models: Core to Good Design*. Morgan & Claypool. https://doi.org/10.2200/S00391ED1V01Y201111HCI012
- Norman, D. (2013). *The Design of Everyday Things*, edição revista. Resumo dos três modelos: https://essenceofsoftware.com/posts/conceptual-models/
- Nielsen Norman Group. Mental models and user experience design. https://www.nngroup.com/articles/mental-models/
- Prater, S. Object-Oriented UX. https://ooux.com/resources/object-oriented-ux
- Jackson, D. (2021). *The Essence of Software*. Princeton University Press. https://press.princeton.edu/ideas/daniel-jackson-on-the-essence-of-software
- Apple. Human Interface Guidelines, princípios de design: https://developer.apple.com/design/human-interface-guidelines/design-principles; escrita: https://developer.apple.com/design/human-interface-guidelines/writing
