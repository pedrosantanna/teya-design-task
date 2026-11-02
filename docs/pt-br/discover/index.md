# Discover

Antes de escolher entre findability e transaction, eu me propus a entender a high street, a rua comercial do bairro, de fora para dentro: o que ela é em 2026, o que compradores de Londres dizem sobre ela em público, e o que os produtos que já os atendem acertam e erram. Hammersmith, onde a King Street encontra a Broadway, é o exemplo trabalhado do começo ao fim.

```summary
Takeaways:
- Quem compra não consegue saber se uma loja próxima tem algo, ou se está aberta, sem ir até lá. Esse foi o sinal mais forte.
- Em dois posts, uma ida frustrada terminou num pedido na Amazon. Quando o online não conseguia chegar a tempo, uma loja próxima ganhou.
- Sam, o comprador em missão, é a maior e mais clara das três proto-personas (11 de 20 posts clusterizados). O ponto de parada mais comum foi a primeira etapa: saber quem tem o item e se a loja está aberta (8 de 20 posts clusterizados).
Call:
- Descoberta antes de escolher findability ou transaction ([001](../decision-log.md)).
- De fora para dentro, porque o produto ainda não existe ([000](../decision-log.md)). Hammersmith como exemplo trabalhado.
AI:
- Três agentes de pesquisa trabalharam em paralelo, depois dois agentes de escrita, um revisor e um segundo etiquetador às cegas.
- Eu escolhi as fontes, salvei as páginas do Reddit que as ferramentas não alcançavam e questionei o método. [Log completo](../process/ai-log.md).
Trade-offs:
- Usei uma só forma de coletar dados, a netnografia, porque era rápida e barata. Os dados dela são atitudinais: o que as pessoas dizem que pensam e fazem. O mapa de empatia e as proto-personas se apoiam neles.
- Sem entrevistas, e posts públicos super-representam quem tem uma reclamação.
```

## O que eu fiz

| Frente de trabalho | Pergunta | Página |
| --- | --- | --- |
| Pesquisa documental | O que é uma high street hoje, e quais regras, dinheiro e acontecimentos a afetam? Usei para aprender o contexto. | [A high street hoje](high-street-landscape.md) |
| Netnografia | O que compradores de Londres dizem, com as próprias palavras, sobre usar a sua high street? Dados atitudinais, a única fonte sobre compradores. | [Método](netnography/method.md) · [Achados](netnography/findings.md) |
| Mapa de empatia | O que esse comprador vê, ouve, pensa, diz e faz, e o que dói? | [Mapa de empatia](netnography/empathy-map.md) |
| Segmentação | Quais diferenças entre compradores importam para este brief? | [Dimensões propostas](netnography/dimensions.md) |
| Proto-personas | Quais ocasiões de compra se repetem, e onde elas quebram? | [As proto-personas](personas/index.md) · [Método](personas/method.md) |
| Benchmarks | Quais produtos já atendem esses compradores, e o que os usuários deles dizem? Levantados junto com a netnografia e organizados por persona depois. | [Benchmarks](benchmarks.md) |
| Conclusão | O que é fato, o que é suposição e quanto confio nela, e o que ainda não se sabe? | [Conclusão](conclusion.md) |

Cada citação é um trecho curto de um post público, datado entre maio de 2025 e novembro de 2026, com o handle do autor e um link. Todas menos uma foram conferidas com a página ao vivo. A lista completa está em [Fontes](sources.md), e as decisões por trás do método estão no [registro de decisões](../decision-log.md).

## O que os compradores dizem

A reclamação mais frequente é que não dá para saber o que uma loja tem, ou se está aberta, sem ir até lá. Quando a necessidade é urgente (óculos para eclipse na véspera, um ventilador numa onda de calor, flores num domingo à noite), os londrinos perguntam a desconhecidos no Reddit, ligam para várias lojas ou entram em grupos de WhatsApp que postam contagens de estoque com horário. Eles confiam mais na resposta de um vizinho do que em listagens do Google ou sites das lojas.

Dois posts descrevem uma ida frustrada que terminou num pedido na Amazon, um deles depois de pagar estacionamento e voltar de mãos vazias. Quando a compra online não chega a tempo, os posts vão no sentido contrário, e uma loja próxima que tem o item ganha, a quase qualquer preço.

A lealdade ao comércio local depende da conveniência. Uma pessoa paga mais num pequeno negócio se for "reasonably convenient" (razoavelmente conveniente). Outra deixa o açougue independente, aberto só em horário comercial, para os aniversários de casamento, e o supermercado fica com as compras da semana. Depois de uma ida perdida, alguns posts terminam no online, e uma frequentadora continuou comprando num açougue que encontrou fechado no horário anunciado.

Os moradores tratam a King Street como uma rua de resolver coisas e mandam visitantes para a Chiswick High Road. Um produto ancorado aqui precisa ajudar as pessoas a resolver tarefas antes de poder ser um lugar para passear.

## Dados da high street

Pontos vazios voltam a ser alugados (vacância na high street de 13,2%, a mais baixa desde a Covid), mas o fluxo de pedestres de setembro de 2026 caiu 3% e o online responde por 28,8% das vendas no varejo. Os empregos nas high streets centrais migraram de lojas para cafés e serviços. O dinheiro vivo caiu para 8% de todos os pagamentos, mas ainda é cerca de um quinto das transações no varejo. A política pública pende para os pequenos ocupantes: business rates (imposto sobre imóveis comerciais) mais baixos para varejo, hospitalidade e lazer a partir de abril de 2026, e um limite de isenção maior anunciado no Orçamento de outubro de 2026.

## Produtos existentes

Entre apps de delivery, apps de sobras de comida e ferramentas de busca de estoque, a reclamação que os usuários mais repetem é ouvir que algo estava disponível quando não estava. Uma cesta única com vários vendedores já existe (Etsy, Amazon, e desde outubro de 2026 o Shop app, e o Google só nos EUA), mas só com entrega pelo correio. Ninguém junta várias lojas de uma mesma rua com retirada em cada loja ou uma única rota de entregador local. Diretórios sem estoque ao vivo, como o ShopAppy, não duraram.

## Findability ou transaction

*Interpretação, a ser testada no Define.*

A evidência sustenta as duas opções, e a escolha entre elas é a primeira decisão da próxima fase.

- **A favor de findability:** a dor mais forte e mais repetida é não saber se uma loja próxima tem o item e está aberta. Suponho que a maioria das lojas pequenas não mantém um catálogo por item que uma busca consiga ler (não encontrei número nem a favor nem contra), então o que quer que responda "está lá?" precisa vir de algo que a loja já faz, como confirmar uma reserva ou o que passa pelo caixa.
- **A favor de transaction:** o checkout com várias lojas está chegando pelas grandes plataformas, mas sem a metade local: retirar em várias lojas, ou um só entregador fazendo a ronda. Ninguém ocupou essa metade ainda.
- **Como cada um restringe o outro:** quem compra só monta uma cesta com várias lojas se antes confiar que os itens estão lá. Uma promessa de disponibilidade só vale algo se a loja guardar o item quando o comprador decidir comprar.

## Perguntas em aberto para o Define

- O comprador para quem desenhar. As [proto-personas](personas/index.md) colocam a dor mais forte no Sam, o comprador em missão, que precisa de algo específico logo.
- Como uma loja sem códigos de produto diz o que tem, com quase nenhum trabalho extra?
- A retirada na loja é o padrão e a entrega, a opção, já que a maioria das pessoas chega à sua high street a pé?
- O que os organizadores que a rua já tem, como o Hammersmith BID (associação de negócios do bairro), precisariam ver para participar?

## Lacunas conhecidas

X e TikTok foram lidos, mas o X tem pouca conversa sobre compras e os comentários do TikTok não puderam ser coletados, então os compradores mais jovens aparecem sobretudo pelas legendas dos criadores. Instagram e Nextdoor não foram coletados, então moradores mais velhos em grupos de bairro estão sub-representados. Ninguém foi entrevistado: toda citação surgiu de forma espontânea, e ninguém foi questionado sobre um app. As duas lacunas estão listadas na página de [método](netnography/method.md).
