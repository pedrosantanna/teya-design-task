# Dimensões propostas

Duas dimensões que saem dos [achados](findings.md) e servem para fazer a clusterização das [proto-personas](../personas/index.md): **urgência da necessidade** e **ponto de falha**. A segunda é a escolha que o brief pede.

```summary
Takeaways:
- Urgência da necessidade: de quem só está passeando a quem precisa de uma coisa específica agora.
- Ponto de falha: de saber (não conseguiu saber, findability) a conseguir (não conseguiu pegar, transaction).
- O que as pessoas fizeram depois (continuaram ou desistiram) aparece em cada ponto, mas não é um eixo. A maioria dos posts não mostra isso.
Call:
- Escolhi urgência da necessidade e ponto de falha entre as candidatas, porque a segunda se traduz direto em findability versus transaction e as duas podem ser etiquetadas a partir do que as pessoas escreveram.
- Deixei "o que as pessoas fizeram depois" fora dos eixos, porque a maioria dos posts não mostra isso.
AI:
- O agente de pesquisa propôs eixos candidatos a partir da etiquetagem. Um agente revisor confrontou os eixos com o brief. Dois agentes etiquetaram cada post nos dois eixos.
Trade-offs:
- A necessidade descreve ocasiões mais do que pessoas: a mesma pessoa está passeando no sábado e em missão na terça.
```

## Urgência da necessidade, passeando ↔ precisa agora

Quão específica e presa a um prazo é a necessidade. Na ponta **precisa agora**, o comprador quer uma coisa em particular, muitas vezes com prazo, e não tolera uma ida incerta. Na ponta **passeando**, não há item em mente; as compras de rotina ficam no meio.

Pontuada a partir de dois códigos: a tarefa (descoberta, rotina ou um item específico) e se o post menciona um prazo. Veja a [escala](../personas/method.md).

```quote
text: Left it a bit last minute, but does anyone know any stores nearby selling solar eclipse glasses?
handle: u/grand_web
network: Reddit · r/chiswick
date: 2026-08-11
url: https://www.reddit.com/r/chiswick/comments/1vlibmn/
tags: stock-visibility, urgency
context: Ponta precisa agora: item específico, prazo no dia seguinte.
status: verified
```

```quote
text: Anyone knows a store around hammersmith or holborn? 😭
handle: u/claudiav2603
network: Reddit · r/london
date: 2026-08-11
url: https://www.reddit.com/r/london/comments/1vk3h8e/comment/p2y26dy/
tags: stock-visibility, urgency
context: Ponta precisa agora: a mesma corrida do eclipse, perto de Hammersmith.
status: archive
```

```quote
text: we have plenty of shops to browse! But I can't actually remember the last time I went there for clothes shopping.
handle: Kenjenny
network: Mumsnet · Talk › Chat
date: 2026-03-27
url: https://www.mumsnet.com/talk/_chat/5509007-do-you-still-enjoy-shopping-on-the-high-street-or-mostly-online?reply=151334270
tags: online-default
context: Ponta passeando, que esfriou: lojas por perto, nenhuma ida recente.
status: verified
```

## Ponto de falha, saber ↔ conseguir

Onde a ida deu errado. Na ponta **saber**, o comprador não conseguiu saber: se uma loja tem o item, se está aberta, quem vende. Isso aponta para findability. Na ponta **conseguir**, ele não conseguiu pegar: horários que batem de frente com o trabalho, só dinheiro, entrega lenta demais. Isso aponta para transaction. No meio, o item ou a loja simplesmente **não estava lá**, ou não valia o preço. Essa é a oferta da própria rua, que um app pode mostrar mas não resolver.

```quote
text: Hard to know stock levels without visiting, unless you can somehow get through on the phone..!
handle: u/jamesshovlin
network: Reddit · r/london
date: 2026-08-10
url: https://www.reddit.com/r/london/comments/1vk3h8e/comment/p2tdld2/
tags: stock-visibility
context: Ponta saber: não dá para saber o estoque sem ir até lá.
status: verified
```

```quote
text: I've been to Robert Dyas in Ealing and Chiswick today and both sold out
handle: u/moanyjoany
network: Reddit · r/Ealing
date: 2026-08-11
url: https://www.reddit.com/r/Ealing/comments/1vlcuor/comment/p30r2af/
tags: stock-visibility, access-transport
context: Meio: as lojas existiam, o estoque não.
status: verified
```

```quote
text: So I end up in McDonald's, cos it's always open, and shop on Amazon, because it's always there.
handle: LividArse
network: Mumsnet · Talk › AIBU
date: 2025-12-05
url: https://www.mumsnet.com/talk/am_i_being_unreasonable/5455037-to-think-some-independent-shops-really-arent-helping-themselves?reply=148977221
tags: opening-hours, online-default
context: Ponta conseguir: as lojas não estão abertas quando a pessoa pode ir.
status: verified
```

```quote
text: it's only open during office hours and then Saturday morning, and b) it's more than double the cost… I go to them for anniversaries
handle: u/killmetruck
network: Reddit · r/london
date: 2026-06-07
url: https://www.reddit.com/r/london/comments/1tz5j3p/comment/oq967k5/
tags: opening-hours, price, support-local
context: Ponta conseguir: horário comercial e preço empurram as compras da semana para outro lugar.
status: verified
```

## O que as pessoas fizeram depois, um modificador e não um eixo

Alguns posts mostram o que o comprador fez depois do atrito: continuou apesar de um custo, ou trocou pelo online ou por uma rede. Isso importa para saber quem um produto consegue reconquistar, mas só 10 dos 27 posts etiquetados mostram isso, e os dois etiquetadores concordaram menos nesse ponto. Por isso ele aparece como o estilo de cada ponto, não como um eixo.

## Considerados e descartados

- **Esforço pelo comércio local como eixo.** Poucos posts mostram comportamento, e o que as pessoas dizem sobre apoiar o comércio local não é o que fazem ([mapa de empatia](empathy-map.md)).
- **Sensibilidade a preço.** Se mistura com a conveniência: várias pessoas teriam pagado mais se a loja fosse confiável.
- **Tempo disponível.** Alimenta a dor do horário de funcionamento, mas funciona melhor como traço da persona do que como eixo.
- **Lealdade ao lugar (King Street versus Chiswick).** Separa high streets, não compradores.
