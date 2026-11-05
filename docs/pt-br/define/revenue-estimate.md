# Estimativa de receita

Uma projeção básica do que o Snuffle poderia ganhar por mês e por ano em Londres e no Reino Unido, montada a partir de referências públicas. Ela segue as três fontes de [Receita](revenue.md): pagamentos no app, lojas que entram no POS do provedor por causa do app e destaque pago. Não há comissão. São estimativas para enquadrar a oportunidade e mostrar quais entradas pesam, não previsões.

```summary
Takeaways:
- No cenário base, o Reino Unido chega a cerca de 3.200 lojas ativas, 125.000 compradores por mês e £40 milhões de GMV por ano, e gera cerca de £1,0 milhão por ano. Londres sozinha gera cerca de £170.000.
- Nessa escala, os pagamentos no app são a menor parte: cerca de £3 de receita líquida por comprador ao ano. As lojas que entram no POS (vendas de balcão e assinatura) são a maior fonte, depois os pagamentos, depois o destaque pago.
- O cenário base do Reino Unido fica perto do custo que assumi para um time pequeno, £1,0 milhão por ano. Precisa de cerca de 3.300 lojas ativas e 128.000 compradores por mês. Londres sozinha não cobre esse custo em nenhum cenário, exceto o otimista.
- A entrada que mais move o resultado é a parcela de lojas que entram e continuam ativas, depois as instalações e a taxa líquida.
Call:
- Pedi uma estimativa básica de receita a partir de referências: quantas lojas, qual conversão, quantos itens, qual taxa e qual receita por mês e por ano.
- Mantive o cenário de Receita: sem comissão, um provedor de pagamento com POS próprio, e receita de pagamentos, lojas novas na rede e destaque pago.
- Fixei o custo a cobrir num único valor assumido, £1,0 milhão por ano, e deixei o ponto de equilíbrio para ser lido contra ele.
AI:
- Um agente buscou fontes públicas, leu as que conseguiu abrir, rodou o modelo e escreveu a página. Onde não abriu uma fonte ou não achou um número, a entrada está marcada como suposição, com a forma como foi escolhida.
- Eu reviso cada suposição e posso mudá-la; o modelo é um script curto, então uma mudança roda de novo em segundos.
Trade-offs:
- O lado do comprador e o das lojas são modelados separadamente, então os números não conferem se cada loja recebe os pedidos que os compradores sugerem. O cenário base dá cerca de 58 pedidos por loja por mês, o que considero plausível e não testei.
- Contar as lojas que entram no POS como receita depende de quanto dessa entrada o app causa. Defini essa parcela por cenário (30%, 50%, 70%) porque não existe fonte para ela.
```

## Método

O modelo descreve um estado estável, cerca de três anos depois do lançamento, num mercado em que o provedor já tem uma rede de POS. Roda uma vez para Londres e uma para o Reino Unido, em três cenários.

- Lojas: o número de lojas independentes nas categorias do protótipo, vezes a parcela que está ativa no Snuffle.
- Compradores: instalações como parcela da população, depois usuários ativos por mês, depois compradores, depois pedidos e itens.
- Receita: a parte líquida do GMV que o provedor retém nos pagamentos do app, as vendas de balcão e a assinatura das lojas novas no POS do provedor, e os espaços de destaque.

Toda entrada é uma suposição com uma base. Quando um número público a ancora, a fonte está na tabela e em [Fontes](#fontes). Não consegui abrir alguns relatórios primários, então essas âncoras vêm de resumos de busca e estão sinalizadas.

## Funil

O primeiro bloco conta lojas, o segundo compradores, o terceiro dinheiro. Conservador, base e otimista são os três valores dos cenários. Cada item custa £6 em todos os cenários, então o valor médio do pedido decorre dos itens por pedido.

| Etapa | Conservador | Base | Otimista | Base da entrada |
| --- | --- | --- | --- | --- |
| Empresas de varejo, Reino Unido | 213.000 | 213.000 | 213.000 | ONS, retrato de março de 2025, com base em IVA e PAYE |
| Parcela nas categorias do protótipo (alimentos especializados, floristas, ferragens) | 15% | 15% | 15% | Suposição. Escolhi a olho a partir das categorias do protótipo; o ONS não dá divisão por categoria nas páginas que consegui abrir |
| Lojas endereçáveis, Reino Unido | 31.950 | 31.950 | 31.950 | 213.000 × 15% |
| Lojas endereçáveis, Londres | 6.294 | 6.294 | 6.294 | Londres tem 19,7% das empresas do Reino Unido (ONS), usado como aproximação da parcela de Londres no varejo. Suposição: a parcela real de Londres nesse número pode ser outra |
| Parcela das lojas endereçáveis ativas no Snuffle | 5% | 10% | 20% | Suposição. Como escala: o Too Good To Go informou mais de 26.000 parceiros no Reino Unido em 2024, e essa contagem inclui filiais de redes |
| Dessas, parcela nova no POS do provedor | 15% | 25% | 35% | Suposição. A H13 passa com 2 das 5 primeiras lojas abordadas |
| Parcela dessa entrada causada pelo app | 30% | 50% | 70% | Suposição. Sem fonte; é o número em que menos confio |
| Instalações, como parcela da população | 1% | 3% | 6% | Suposição. Como escala: os 4,1 milhões de consumidores ativos por mês da Deliveroo no Reino Unido e na Irlanda são cerca de 6% da população do Reino Unido; o Too Good To Go informa mais de 7 milhões de usuários no Reino Unido, cerca de 10% (sem data) |
| Usuários ativos por mês, como parcela das instalações | 10% | 15% | 25% | Suposição. Apps de compras retêm cerca de 4–9% dos usuários no dia 30, que é um limite inferior para um número mensal |
| Compradores, como parcela dos usuários ativos por mês | 30% | 40% | 50% | Suposição |
| Pedidos por comprador por mês | 1,0 | 1,5 | 2,5 | Suposição. Teto: os 3,5 pedidos por mês de cada consumidor ativo da Deliveroo, em comida entregue |
| Itens por pedido | 2 | 3 | 4 | Suposição |
| Valor médio do pedido | £12 | £18 | £24 | Itens × £6. Como escala: cesta média de £7,75 nas lojas de conveniência da ACS (2023); £27,6 por pedido da Deliveroo no Reino Unido e na Irlanda (2024) |
| Taxa líquida sobre os pagamentos do app | 0,6% | 0,9% | 1,2% | Veja [taxa líquida](#taxa-liquida) |
| Faturamento de balcão no cartão de uma loja nova no POS, por ano | £80.000 | £120.000 | £160.000 | Suposição. A PSR achou que 93,7% dos lojistas adquiridos faturam menos de £380.000 por ano em cartão |
| Assinatura do POS por loja nova, por mês | £0 | £10 | £19 | Âncoras: £0 por mês no plano Start da Teya; £19 por mês no SumUp Payments Plus. A base é meu palpite combinado |
| Lojas que compram um espaço de destaque | 3% | 8% | 15% | Suposição. A H15 passa com 2 de 10 lojas, ou 20% |
| Preço por semana de destaque | £10 | £20 | £30 | Suposição. Como escala: a receita anualizada de anúncios da Deliveroo era de £77 milhões no fim de 2023, cerca de 1% do GTV |
| Semanas por ano em que a loja que compra faz destaque | 26 | 26 | 26 | Suposição |

### Taxa líquida

Um pequeno lojista do Reino Unido paga uma taxa combinada de cerca de 1,5–1,75% nos pagamentos com cartão: o SumUp lista 1,69%, a Square 1,75% e a Teya 1,59% em cartões de consumidor, e a página da maquininha Essential da Teya mostra 1,49%. A Teya cota taxas individuais e não publica tabela padrão. A PSR achou cerca de 98% dos pequenos e médios lojistas em preço padrão (combinado).

O provedor retém menos do que isso. A interchange nos cartões de consumidor do Reino Unido é limitada a 0,2% no débito e 0,3% no crédito. As taxas das bandeiras eram de 0,14%, segundo dados de membros da BRC citados pela PSR. Processamento, fraude, suporte e risco custam mais; assumo 0,2–0,5% do GMV. Sobram 0,6–1,2%, então uso 0,9% no cenário base. A receita líquida da Adyen é cerca de 0,17% do volume (2º semestre de 2025), o que um grande processador retém e um piso de comparação, não uma taxa para pequenos lojistas.

## Cenários

A receita é a receita líquida do provedor, por ano, salvo quando indicado. GMV é o valor dos pedidos pagos no app. "Lojas novas" é a parte do app na margem das vendas de balcão e na assinatura de lojas que entraram no POS.

| | Londres conservador | Londres base | Londres otimista | Reino Unido conservador | Reino Unido base | Reino Unido otimista |
| --- | --- | --- | --- | --- | --- | --- |
| Lojas ativas | 315 | 629 | 1.259 | 1.598 | 3.195 | 6.390 |
| Instalações | 89.500 | 268.500 | 537.000 | 693.000 | 2,08 mi | 4,16 mi |
| Usuários ativos por mês | 9.000 | 40.300 | 134.000 | 69.300 | 312.000 | 1,04 mi |
| Compradores por mês | 2.700 | 16.100 | 67.100 | 20.800 | 125.000 | 520.000 |
| Pedidos por mês | 2.700 | 24.200 | 168.000 | 20.800 | 187.000 | 1,30 mi |
| GMV por mês | £32.000 | £435.000 | £4,03 mi | £249.000 | £3,37 mi | £31,2 mi |
| GMV por ano | £0,39 mi | £5,2 mi | £48,3 mi | £3,0 mi | £40,4 mi | £374 mi |
| Receita de pagamentos | £2.000 | £47.000 | £580.000 | £18.000 | £364.000 | £4,49 mi |
| Receita de lojas novas | £7.000 | £94.000 | £662.000 | £35.000 | £479.000 | £3,36 mi |
| Receita de destaque pago | £2.000 | £26.000 | £147.000 | £12.000 | £133.000 | £748.000 |
| Total por ano | £12.000 | £168.000 | £1,39 mi | £65.000 | £976.000 | £8,60 mi |
| Total por mês | £1.000 | £14.000 | £116.000 | £5.000 | £81.000 | £717.000 |
| Contra £1,0 mi por ano de custo | -£988.000 | -£832.000 | +£390.000 | -£935.000 | -£24.000 | +£7,6 mi |

Duas conferências com números públicos. O GMV base de £40 milhões do Reino Unido é cerca de 0,9% dos £4,5 bilhões da Deliveroo no Reino Unido e na Irlanda (162,8 milhões de pedidos a £27,6, 2024). O destaque pago fica em 0,3–0,6% do GMV no cenário base, abaixo do 1% que a Deliveroo ganha com publicidade.

## Ponto de equilíbrio

Assumo £1,0 milhão por ano para um time de produto pequeno e seus custos de operação: cerca de oito pessoas (produto, design, engenharia, dados, entrada de lojas) a £85.000 de custo total cada, ou £680.000, mais £150.000 de infraestrutura, operação de pagamentos e suporte, mais £170.000 de ferramentas e de aquisição dos primeiros compradores. O valor é meu e não tem fonte.

Com a economia unitária do cenário base, o Reino Unido cobre £1,0 milhão com cerca de 3.300 lojas ativas, 128.000 compradores por mês e 320.000 usuários ativos por mês. Com £0,6 milhão de custo, a necessidade cai para cerca de 2.000 lojas e 77.000 compradores; com £1,5 milhão, sobe para cerca de 4.900 lojas e 192.000 compradores.

Londres sozinha precisaria de cerca de seis vezes a atividade do cenário base para cobrir £1,0 milhão, em torno de 3.800 lojas ativas, mais da metade das 6.294 endereçáveis. Londres funciona como mercado de lançamento e prova de conceito; sozinha, ela não paga o produto.

## Sensibilidade

Mexi numa entrada por vez no cenário base do Reino Unido, para o valor conservador e depois para o otimista, e olhei a mudança na receita total.

| Entrada | Conservador | Otimista |
| --- | --- | --- |
| Parcela de lojas ativas | -31% | +63% |
| Instalações como parcela da população | -25% | +37% |
| Taxa líquida | -27% | +27% |
| Usuários ativos por mês, parcela das instalações | -12% | +25% |
| Pedidos por comprador | -12% | +25% |
| Itens por pedido | -12% | +12% |

A parcela das lojas endereçáveis que entra e continua ativa move mais o resultado, porque as lojas puxam tanto o destaque pago quanto a receita das vendas de balcão. Instalações e taxa líquida vêm em seguida. O preço da assinatura, o preço do destaque e as semanas de destaque movem o total em menos de 10% cada.

## Como ler estes números

São estimativas de ordem de grandeza para enquadrar a oportunidade. Não são previsões, e a distância entre o conservador e o otimista é de cerca de 130 vezes no Reino Unido. As entradas com menos evidência são a parcela de lojas ativas, a parcela da entrada de lojas que o app causa e o funil de compradores; a prova de conceito em [Hipóteses](hypotheses.md) (H12 a H16) é o que as trocaria por dados.

## Fontes

- ONS, [UK business: activity, size and location, 2025](https://www.ons.gov.uk/businessindustryandtrade/business/activitysizeandlocation/bulletins/ukbusinessactivitysizeandlocation/2025): varejo com 213.000 e hospedagem e alimentação com 177.000 empresas com base em IVA e PAYE; Londres com 538.000 empresas, 19,7% do Reino Unido. Arredondado na publicação.
- Department for Business and Trade, [Business population estimates 2025](https://www.gov.uk/government/statistics/business-population-estimates-2025/business-population-estimates-for-the-uk-and-regions-2025-statistical-release): 5,69 milhões de empresas do setor privado no Reino Unido, 547.000 PMEs no comércio atacadista e varejista. Um número diferente, 304.560 empresas de varejo, aparece no [briefing da Biblioteca da Câmara dos Comuns sobre o varejo](https://researchbriefings.files.parliament.uk/documents/SN06186/SN06186.pdf); só o vi num resumo de busca e por isso não o usei.
- Greater London Authority, [dados demográficos](https://data.london.gov.uk/demography): 8,95 milhões em Londres (meados de 2023, visto num resumo de busca). ONS, [estimativas de população do Reino Unido, meados de 2024](https://www.gov.uk/government/statistics/population-estimates-for-the-uk-england-wales-scotland-and-northern-ireland-mid-2024): 69,3 milhões, como noticiado pela imprensa; não abri a publicação.
- Payment Systems Regulator, [revisão do mercado de adquirência de cartões, relatório final (novembro de 2021)](https://www.psr.org.uk/media/p1tlg0iw/psr-card-acquiring-market-review-final-report-november-2021.pdf): cerca de 98% dos pequenos e médios lojistas em preço padrão; 93,7% dos lojistas adquiridos com faturamento abaixo de £380.000; taxas das bandeiras em 0,14% (dados da BRC).
- Osborne Clarke, [The Interchange Fee Regulation: the fee cap is now in force](https://www.osborneclarke.com/insights/the-interchange-fee-regulation-the-fee-cap-is-now-in-force): tetos de interchange do Reino Unido de 0,2% no débito e 0,3% no crédito de cartões de consumidor (visto num resumo de busca).
- SumUp, [melhores leitores de cartão para pequenas empresas do Reino Unido](https://www.sumup.com/en-gb/compare/best-card-readers/): SumUp 1,69% e £19 por mês no Payments Plus, Square 1,75%, Teya 1,59% e £0 por mês no Start. É a página de um concorrente, então vale como marketing. Teya, [maquininha Essential](https://teya.com/shop/essential-card-machine): 1,49%. Teya, [preços](https://www.teya.com/pricing): taxas cotadas individualmente.
- Adyen, [resultados do 2º semestre de 2025](https://www.adyen.com/press-and-media/adyen-publishes-h2-2025-financial-results-3pgu2): receita líquida de €1.270,7 milhões sobre €745,3 bilhões de volume, cerca de 17 pontos-base.
- Deliveroo, [atualização de resultados do 4º trimestre de 2024](https://corporate.deliveroo.co.uk/assets/2317/3700/9446/Deliveroo_Q4_2024_Trading_Update_RNS_vFINAL.pdf): Reino Unido e Irlanda com 162,8 milhões de pedidos e £27,6 por pedido em 2024; 4,1 milhões de consumidores ativos por mês no 4º trimestre de 2024; frequência de 3,5 pedidos por mês no grupo. Statista, [receita de anúncios da Deliveroo](https://fr.statista.com/statistics/1208634/deliveroo-ad-revenue/): £77 milhões anualizados no fim de 2023 (visto num resumo de busca). O 1% do GTV é a minha divisão contra o GTV do grupo, de cerca de £7 bilhões.
- Too Good To Go Reino Unido, [comunicado dos 40 milhões de sacolas](https://www.toogoodtogo.com/en-gb/press/40-million): 26.000 ou mais parceiros no Reino Unido num anúncio de 2024 (visto num resumo de busca). IGD, [perfil do Too Good To Go](https://www.igd.com/articles/too-good-to-go): mais de 7 milhões de usuários no Reino Unido, sem data.
- Retenção de apps: Braze, [retenção de apps](https://www.braze.com/resources/articles/mobile-app-retention) (compras com 4,0–4,6% no dia 30, citando dados da Business of Apps e da AppsFlyer) e Phiture, [referências de retenção](https://phiture.com/mobilegrowthstack/managing-retention-rate-benchmarks-and-expectations/) (marketplaces com 8–9%). Não cheguei aos relatórios da Adjust nem da AppsFlyer.
- ACS, [pesquisa](https://www.acs.org.uk/research): cesta média de £7,75 em lojas de conveniência no Local Shop Report de 2023 (visto num resumo de busca).

Não achei fonte para quantos independentes existem nas categorias do protótipo, para itens por pedido em independentes, para a frequência de pedidos num app como o Snuffle, para o preço ou a adesão a um espaço de destaque em uma loja pequena, nem para o preço da assinatura de POS da Teya. Essas são suposições, escolhidas como a tabela indica.
