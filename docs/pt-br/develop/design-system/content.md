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
AI:
- Um agente revisou o design system contra as telas da v7 e encontrou formatos de hora misturados (carimbos em 24 horas ao lado de "by 4pm"). Outro agente escreveu esta página a partir do texto da v7 e do modelo conceitual.
- Um agente leu o Schedule 20 do DMCC Act 2024 e o guia da CMA (CMA208) e transformou cada dever numa regra para as telas do Snuffle.
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

## Rótulos de botão

Os botões são verbos do modelo conceitual, em sentence case, com o objeto da ação quando ajuda: Buy, "Buy 1", "Buy · £29.98", Ask, "Ask Rossi's", Extend, "Extend to Mon 16 Nov", "Cancel for a refund", "Keep looking", "Try again", "Show me", "No thanks", Call, Rate. Directions mantém o substantivo de costume da plataforma. Um botão nunca diz OK, Submit ou Continue quando cabe um verbo do modelo.

## Avaliações

| Regra | Na prática | Nunca |
| --- | --- | --- |
| Uma pergunta | "Would you go back?", respondida com um polegar para cima ou para baixo | Estrelas, notas de 0 a 10, "How satisfied were you?" |
| Uma porcentagem de quem comprou | "92% would go back · 38 buyers"; a contagem sempre ao lado do número | "4.6", "9.2/10", um número sem a contagem |
| Nunca arredondar para cima | 91,7% aparece como "91%"; contagens ficam como contagens ("Had it 24 of 25 times when they said yes") | "92%" para 91,7%, "100%" para 24 de 25 |
| Poucas avaliações | Abaixo de 5, as tags e os sinais do Snuffle com "New on Snuffle · 3 buyers so far"; nenhuma: "No ratings yet · Snuffle has asked them 4 times" | Uma porcentagem a partir de 3 pessoas |
| Quem comprou | "buyers", "38 buyers" | customers, reviewers, users |
| Vereditos simples | "Would go back", "Wouldn't go back" e as tags fixas | "Excellent!", "Top rated", "Highly recommended" |
| Origem em todo sinal | "What buyers said", "What Snuffle saw", "from 31 requests on Snuffle", "from the shop's till" | "verified", "trusted", "guaranteed" |
| Datas pelo mês | "Oct 2026", "Edited Oct 2026" | "3 weeks ago", "12/10/2026" |
| Um elemento por linha | Cada sinal é uma linha com rótulo completo: "Would go back, 92 percent of 38 buyers"; a cor e o glifo de polegar nunca levam o sentido sozinhos | Um número verde ou vermelho sem palavras |

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
