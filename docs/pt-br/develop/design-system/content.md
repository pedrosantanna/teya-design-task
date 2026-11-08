# Conteúdo e voz

Como o Snuffle escreve, como erros e desfechos são redigidos e os formatos de horários, datas, preços, distâncias e contagens. As palavras em si (request, answer, order, Buy) estão fixadas na página Modelo conceitual.

```summary
Takeaways:
- O Snuffle fala em primeira pessoa, em inglês britânico, com frases curtas e simples. Nunca vende e nunca pede desculpas por hábito.
- O Snuffle relata o que as lojas disseram; um cartão de resposta traz os fatos da loja e diz de onde vieram.
- Mensagens de erro e de desfecho dizem o que aconteceu, onde está o dinheiro e o que fazer em seguida, nessa ordem.
- Os formatos são do inglês do Reino Unido, em 12 horas: "by 4pm", "4:30pm", "Mon 9 Nov", "£6", "£14.99", "13 min walk", "9+". Os textos passam por plurais ICU, só en-GB.
- As avaliações fazem uma pergunta só, "Would you go back?", e mostram a resposta como porcentagem de quem comprou, com a contagem ao lado, arredondada para baixo. Sem estrelas, sem "Excellent!", nunca "verified". As regras do Reino Unido sobre avaliações de consumidores definem como as avaliações são coletadas e mostradas.
Call:
- Depois que uma revisão de design encontrou faltando especificações de componentes, estados, equivalentes de plataforma e regras de conteúdo, pedi que o design system ficasse completo o bastante para construir o protótipo a partir dele.
- Escolhi horários em 12 horas em todo o texto, inclusive nos carimbos de hora, e mantive estas regras provisórias (decisão 043).
- Depois pedi avaliações na página da loja. Escolhi um polegar para cima ou para baixo em vez de estrelas e uma contestação para as lojas, e defini as regras a partir do DMCC Act e do guia da CMA sobre avaliações falsas (decisão 047).
- Na rodada 10 pedi que a lista de Requests mostrasse o último status do Snuffle na voz dele para cada estado, sem pontos, ícones nem botão na linha.
- Na rodada 11 disse que as linhas de metadados ligadas por pontos soltos pareciam genéricas e pedi fatos distinguidos por peso, cor, ícone e posição. Pedi que a seção de avaliações abrisse com um número grande, depois as tags, três notas com primeiro nome e data e "See all", e que "Found here recently" virasse uma lista curta.
AI:
- Um agente revisou o design system contra as telas da v7 e encontrou formatos de hora misturados (carimbos em 24 horas ao lado de "by 4pm"). Outro agente escreveu esta página a partir do texto da v7 e do modelo conceitual.
- Um agente leu o Schedule 20 do DMCC Act 2024 e o guia da CMA (CMA208) e transformou cada dever numa regra para as telas do Snuffle.
- Um agente escreveu uma linha de prévia para cada estado de pedido e de compra do modelo conceitual e levou a prévia para uma só função no store.
- Um agente comparou como Airbnb, Apple Maps, Google Maps e Uber Eats agrupam seus fatos, montou um componente para estado, caminhada e rua de uma loja e reescreveu todas as strings com ponto que achou no app; o Mobbin estava bloqueado, então o que ele lembrou de outros apps é orientação, não evidência.
Trade-offs:
- Horários em 12 horas seguem o jeito como se fala no Reino Unido e o estilo do GOV.UK, e ocupam um pouco mais de largura que os de 24 horas nas linhas.
- Uma voz simples e sem desculpas pode soar fria quando algo dá errado; dizer primeiro a situação do dinheiro é o que deve mostrar o cuidado.
- Arredondar para baixo e mostrar a contagem de quem comprou fazem a loja parecer um pouco pior do que uma média de estrelas faria; escolhi isso porque uma nota que nunca bajula é uma em que compradores e lojas conseguem confiar.
```

## A voz do Snuffle

| Traço | Na prática | Exemplo |
| --- | --- | --- |
| Primeira pessoa | O Snuffle diz "I" para o que ele faz e "you" para o comprador | "I'll ask the shops most likely to have them." |
| Inglês britânico | Grafia, palavras e formatos do Reino Unido | "Collect by Mon 9 Nov, 7pm", "£3.50", "Paper & Co's own courier" |
| Curto | Uma ideia por frase, duas frases por balão como regra | "Two shops have them so far." |
| Simples | Palavras do modelo conceitual; nenhum termo de pagamento (authorised, captured) | "You're only charged when they confirm." |
| Nunca vende | Sem pontos de exclamação, sem urgência que não veio de uma loja, sem "great deal" | "Without buying, they may sell before you get there." |
| Sem desculpas de enchimento | Sem "Sorry", "Unfortunately" ou "I'm afraid" antes de um desfecho; os fatos vêm primeiro | "Paper & Co hasn't confirmed in 10 minutes, so you haven't been charged." |
| Pergunta só o que falta | Lugar e prazo vêm preenchidos do que o comprador digitou | "Will you collect them, or should I check delivery too?" |

### Prévias da linha de pedido

A linha de prévia de um pedido é o último status do Snuffle na voz dele, escrito "Snuffle: …". A regra é primeira pessoa, curto, a novidade do estado primeiro. Quando existe um pedido, o estado dele define a linha. As linhas ficam em inglês, como o resto da interface.

| Estado | Linha de prévia |
| --- | --- |
| No request yet | Snuffle: What do you need? |
| Asking | Snuffle: Asking 6 shops |
| One shop has it | Snuffle: Found it at 1 shop |
| Some shops have it | Snuffle: Found them at 2 shops |
| Needs you | Snuffle: Rossi's needs your answer |
| Looking | Snuffle: Still looking until Fri 6 Nov |
| Every Friday | Snuffle: I'll ask again every Friday until Fri 4 Dec |
| Not found | Snuffle: No one had it. Want me to keep looking? |
| Closed | Snuffle: Closed. Nothing was bought (também o que mostra um pedido fechado com o gesto de deslizar) |
| Pedido esperando a loja | Snuffle: Waiting for Rossi's. You haven't been charged |
| Paid | Snuffle: Paid. Rossi's is setting it aside |
| Ready | Snuffle: Ready to collect till 6pm |
| Extended | Snuffle: Extended. Collect by Mon 16 Nov |
| On its way | Snuffle: On its way from Paper & Co |
| Delivered | Snuffle: Delivered. How was Paper & Co? |
| Delivered and rated | Snuffle: Delivered. Thanks for rating Paper & Co |
| Collected | Snuffle: How was Brook Hardware? |
| Rated | Snuffle: Thanks for rating Brook Hardware |
| Not confirmed | Snuffle: Paper & Co didn't confirm. You haven't been charged |
| Sold | Snuffle: Paper & Co sold out. You haven't been charged |
| Cancelled | Snuffle: Cancelled. I've refunded £29.98 |
| Not collected | Snuffle: Not collected, so I've refunded £29.98 |

## O Snuffle e as lojas

| Quem | Onde | Como soa |
| --- | --- | --- |
| Snuffle | Balões | Relata em terceira pessoa o que as lojas fizeram: "Paper & Co on King Street has them too." Nunca fala como loja ("we have") |
| Uma loja | Cartões de resposta | Os fatos da loja nos rótulos da interface, com a origem: "Has them · replied 2 min ago", "In stock now · till". Uma nota escrita pela loja, quando existe, aparece no cartão dela entre aspas |
| O sistema | Rótulos de status, botões, notificações | A tabela de estados e os verbos, palavra por palavra |

## Mensagens de desfecho e de erro

Toda mensagem depois que algo dá errado, ou depois que uma compra termina, tem três partes: o que aconteceu, a situação do dinheiro, o próximo passo. A situação do dinheiro é dita mesmo quando nada mudou.

| Caso | Mensagem do Snuffle (v7) | Rótulo de status | Próximo passo |
| --- | --- | --- | --- |
| Vendido | "Paper & Co sold the last pairs before they could set them aside, so you haven't been charged." | Sold · not charged | O cartão de resposta da próxima loja, "Keep looking" |
| A loja não confirma | "Paper & Co hasn't confirmed in 10 minutes, so you haven't been charged." | Not confirmed · not charged | O cartão de resposta da próxima loja, "Keep looking" |
| Pagamento recusado | "Apple Pay declined the payment, so you haven't been charged and Paper & Co hasn't been asked to set them aside." | nenhum: a compra não existe | "Try again" |
| Não retirado | "You didn't collect by Mon 9 Nov, so your order at Paper & Co is cancelled. I've refunded £29.98 to your card." | Not collected · refunded | "Ask Paper & Co again", "Keep looking" |
| Nada encontrado a tempo | "None of the 6 shops has them before 4pm: 4 said no and 2 didn't reply." | Not found | "Ask further away", "Keep looking" |
| Pedido a lojas mais distantes | "I'm asking three more shops, up to 30 minutes away. I'll tell you as they answer." Depois as respostas das lojas; se nenhuma tem: "None of the 3 shops further away has them either. I can keep looking and tell you when one has them." | Not found, até uma loja responder | "Keep looking" |
| Pedido recorrente | "I'll ask Rossi's again every week, on Fridays, until Fri 4 Dec, and tell you what they say." (um pedido que diz "every Friday") | Every Friday | Change, Stop |
| Busca encerrada | "Done. I've stopped looking, and nothing was bought." (num pedido recorrente: "Done. I won't ask again, and nothing was bought.") | Closed | nenhum |

## Rótulos de botão

Os botões são verbos do modelo conceitual, em sentence case, com o objeto da ação quando ajuda: Buy, "Buy only 1", "Buy for £29.98", Ask, "Ask Rossi's", Extend, "Extend to Mon 16 Nov", "Cancel for a refund", "Keep looking", "Try again", "Show me", "No thanks", Call, Rate. Directions mantém o substantivo de costume da plataforma. Um botão nunca diz OK, Submit ou Continue quando cabe um verbo do modelo.

## Linhas de metadados

Os fatos de uma loja ou de um pedido se distinguem por peso, cor, ícone e posição. Um ponto solto entre eles parece enchimento e dificulta a leitura rápida.

| Regra | Na prática | Nunca |
| --- | --- | --- |
| Estado primeiro, na própria cor | "Open" em Success ou "Closes soon" em Warning, depois o horário em Muted foreground: "Open until 6pm". Loja fechada: "Closed, opens 9am" | "Open till 6pm · Blythe Road · 2 min walk" |
| Um grupo por tipo de fato | A caminhada é o símbolo de pegadas com "2 min walk", a rua um alfinete com "Blythe Road"; cada grupo é uma unidade | Uma sequência de fatos ligada por pontos |
| Unidades inteiras | Espaços não separáveis dentro de um grupo ("2 min walk", "until 6pm"); a linha só quebra entre grupos, em duas linhas no máximo | Quebra entre "2 min" e "walk" |
| Cabeçalho da página da loja | Linha 1 o estado, linha 2 a caminhada e a rua; Promoted é uma tag sob os fatos; o prazo ("Made to order", "2 days' notice") é uma linha em How it works | O prazo ou "Promoted" dentro de uma linha de fatos |
| Linhas e cards | O estado e o tempo de caminhada com o símbolo; a rua só onde nada mais na tela a nomeia | A rua repetida sob um filtro de rua |
| Linhas de pedido | Uma tag de estado ("Needs you"), o prazo como texto próprio ("Buy by Thu 5 Nov"), a contagem como selo ao final | "Needs you · by Tuesday", "Needs you · 1" |
| Contagens em filtros | A contagem depois do rótulo em Muted foreground: "Needs you 1" | Um ponto antes da contagem |
| Detalhes e desfechos | Uma vírgula ou uma frase nova: "Collect by Mon 9 Nov. Full refund if you don't", "In stock now, 1 of 2" | Um ponto entre orações |
| A compra fixada | O rótulo de status na linha 1; na linha 2 a loja e os itens com vírgula ("Paper & Co, 2 × eclipse glasses"), só os itens quando o rótulo já diz a loja; "Code" sobre o código no fim | A loja dita duas vezes em duas linhas |
| O código no recibo | O código, depois a data até quando vale, depois a regra do reembolso: "K7Q2", "Collect by Mon 9 Nov", "Full refund if you don't"; o rótulo de status sai enquanto a data aparece (decisão 068) | A data de retirada no cabeçalho, longe do código |
| Onde o ponto fica | Uma lista simples de fatos contáveis do mesmo tipo, como o Airbnb escreve "2 beds · 1 bath"; o protótipo não tem uma lista assim, então o app não tem pontos; um botão que leva o valor diz "Buy for £29.98" | Um ponto entre um estado e seu detalhe, ou entre fatos de tipos diferentes |

Os rótulos da tabela de estados mantêm o ponto na fonte como o lugar onde o estado termina e o detalhe começa. O rótulo de estado desenha os dois em pesos e cores diferentes e nunca mostra o ponto.

## Avaliações

| Regra | Na prática | Nunca |
| --- | --- | --- |
| Uma pergunta | "Would you go back?", respondida com um polegar para cima ou para baixo | Estrelas, notas de 0 a 10, "How satisfied were you?" |
| Uma porcentagem de pessoas | "92%" grande, com "would go back" e "38 people" ao lado; a contagem sempre ao lado do número | "4.6", "9.2/10", um número sem a contagem |
| Nunca arredondar para cima | 91,7% aparece como "91%"; contagens ficam como contagens ("Had it 24 of 25 times they said yes") | "92%" para 91,7%, "100%" para 24 de 25 |
| Poucas avaliações | Abaixo de 5, as tags e os sinais do Snuffle com "New on Snuffle" e "3 people so far"; nenhuma: "No ratings yet" e "Snuffle has asked them 4 times" | Uma porcentagem a partir de 3 pessoas |
| Pessoas | "38 people" para a contagem; "buyers" onde a regra é sobre quem pode avaliar | customers, reviewers, users |
| Primeiros nomes | Uma nota mostra o primeiro nome da pessoa com o mês ("Priya", "Oct 2026"); a nota da própria pessoa diz "You" | Sobrenomes, fotos, avatares, o tipo de compra |
| Vereditos simples | "Would go back", "Wouldn't go back" e as tags fixas | "Excellent!", "Top rated", "Highly recommended" |
| Origem em todo sinal | "Ratings", "How they do on Snuffle", "from 31 requests on Snuffle", "from the shop's till" | "verified", "trusted", "guaranteed" |
| Datas pelo mês | "Oct 2026", "Edited Oct 2026" | "3 weeks ago", "12/10/2026" |
| Um elemento por linha | Cada sinal é uma linha com rótulo completo: "Would go back, 92 percent of 38 people"; a cor e o glifo de polegar nunca levam o sentido sozinhos | Um número verde ou vermelho sem palavras |

## Regras sobre avaliações

O Schedule 20 do Digital Markets, Competition and Consumers Act 2024 (parágrafo 13), em vigor desde 6 de abril de 2025, proíbe avaliações falsas e avaliações com incentivo escondido, e exige que uma plataforma que publica avaliações tome medidas razoáveis e proporcionais para evitá-las e removê-las. O guia da CMA (CMA208) diz como são essas medidas. O Snuffle as segue como regras de produto:

| Dever | Snuffle |
| --- | --- |
| As avaliações vêm de quem teve a experiência | Só uma compra marcada como Collected ou Delivered pode ser avaliada, uma avaliação por compra, editável por 30 dias |
| Nada de conteúdo falso ou nocivo | As notas passam por filtro de abuso e de dados pessoais antes de aparecer; a loja pode contestar um caso específico |
| Avaliações negativas não são suprimidas | Avaliações negativas nunca são retidas nem atrasadas; os cartões em destaque espelham a divisão geral, então com 10% de polegares para baixo pelo menos um cartão negativo aparece quando há mais de 10 avaliações |
| Nada de review gating (CMA208, 4.5) | O Snuffle pergunta a todos que compraram uma compra retirada ou entregue, nunca só a quem ele espera que esteja satisfeito, com no máximo um lembrete |
| Resumos por IA refletem opiniões reais | Um resumo é feito só com as notas de quem comprou e leva o rótulo "Summary by Snuffle from buyers' notes" |
| Avaliações com incentivo são declaradas | O Snuffle nunca recompensa uma avaliação; uma avaliação que a loja pagou ou recompensou é marcada como tal |
| A loja pode responder | A loja pode responder uma vez, em público, abaixo de uma avaliação |
| As pessoas sabem como as avaliações funcionam | "How ratings work", com link no resumo das avaliações, diz quem pode avaliar, o que é filtrado e como os números são calculados |

## Formatos

| O quê | Formato | Exemplos | Nunca |
| --- | --- | --- | --- |
| Horário no texto | 12 horas, am/pm em minúsculas, sem espaço, minutos só quando não são zero | "by 4pm", "4:30pm", "Collect by Mon 9 Nov, 7pm", "Delivered at 2:41pm" | "16:00", "4 PM", "4.30pm" |
| Meio-dia e meia-noite | Por extenso | "by midday", "open till midnight" | "12pm", "12am" |
| Carimbos de hora nas linhas | Hoje: o horário; nesta semana: o dia; neste ano: dia e mês; antes: mês e ano | "1:12pm", "Fri", "12 Oct", "Aug 2025" | Horários em 24 horas |
| Interface do sistema | O relógio da barra de status e o resto da interface do sistema seguem o relógio de 24 horas do sistema; só o texto da interface usa 12 horas | "13:12" na barra de status, "1:12pm" numa linha | Relógio de 12 horas na barra de status |
| Datas | Dia da semana abreviado, número do dia, mês abreviado; "today" e "tomorrow" quando for o caso | "Mon 9 Nov", "Fri", "12 Oct", "today", "tomorrow" | "9/11", "November 9th" |
| Durações | Só uma vez, antes do Buy | "(7 days)", "2 days' notice" | Durações em qualquer lugar depois do Buy |
| Preços | Símbolo da libra, sem pence quando o valor é inteiro, duas casas decimais nos outros; abaixo de £1, em pence | "£6", "£14.99", "£29.98", "80p" | "£6.00", "GBP 6" |
| Distâncias | Minutos a pé | "13 min walk", "Within 15 min" | Milhas, quilômetros, metros |
| Contagens | Algarismos; um contador para em 9+ | "2 shops", "9+" | "two shops" em rótulos |
| Caixa | Sentence case em tudo, inclusive botões e títulos | "Keep looking", "Open near you" | Title Case, CAIXA ALTA |

Os frames da v7 ainda mostram carimbos em 24 horas ("13:12", "Delivered at 14:41"); o protótipo usa os formatos acima.

## Plurais e concordância

| Regra | Exemplos |
| --- | --- |
| Os rótulos concordam com o item | "has it" para uma coisa, "has them" para várias; "Has 1 of 2" |
| Lojas e itens concordam com a contagem | "1 shop", "2 shops"; "1 pair", "2 pairs" |
| Toda contagem passa por um plural ICU | `{count, plural, one {# shop has them} other {# shops have them}}` |

## Tamanho do texto

| Tamanho | Comportamento |
| --- | --- |
| Do padrão até 200% | Todas as telas funcionam, com o texto quebrando no lugar (WCAG 1.4.4) |
| Tamanhos de acessibilidade (iOS AX1 para cima, Android acima de 150%) | As linhas empilham: meta e preço descem para baixo do título; os carrosséis de Nearby viram listas verticais; os botões crescem em altura e o rótulo quebra em duas linhas |
| Limites por estilo | Os estilos de display param em 1,5 vez o tamanho, já que a Gambetta em 34 já ocupa uma linha; o Caption 2 nunca fica abaixo de 11; o body e os estilos de texto escalam por inteiro |
| Nunca cortados | Preços, totais, códigos de retirada e rótulos de botão |

Os limites são uma proposta a conferir num celular nos maiores tamanhos.

## Localização

O app sai só em en-GB. Todo texto fica numa tabela de strings e passa pelo ICU MessageFormat, então plurais, preços e datas são formatados pelo locale em vez de montados juntando palavras; outra língua depois é uma tabela nova, não código novo. Nomes de lojas, de itens e citações de lojas nunca são traduzidos.

## Fontes

- Digital Markets, Competition and Consumers Act 2024, Schedule 20, parágrafo 13: https://www.legislation.gov.uk/ukpga/2024/13/schedule/20
- Competition and Markets Authority, Fake reviews guidance (CMA208), 2025: https://assets.publishing.service.gov.uk/media/67eeb64fe9c76fa33048c790/CMA208_-_Fake_reviews_guidance.pdf
- GOV.UK, guia de estilo (horários, datas, dinheiro): https://www.gov.uk/guidance/style-guide/a-to-z
- Apple, Human Interface Guidelines, Writing: https://developer.apple.com/design/human-interface-guidelines/writing
- Material 3, content design: https://m3.material.io/foundations/content-design/overview
- Unicode, ICU MessageFormat: https://unicode-org.github.io/icu/userguide/format_parse/messages/
- W3C, WCAG 2.2, 1.4.4 Resize text: https://www.w3.org/WAI/WCAG22/Understanding/resize-text
- [Fluxo do app](../ideation/app-flow.md), v7, para o texto; [Modelo conceitual](conceptual-model.md) para as palavras, os estados e os verbos
