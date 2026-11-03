# Tipografia

Duas fontes: Gambetta para todo título que nomeia uma tela ou uma seção, e Switzer para tudo o que fica dentro das seções. A escala segue os estilos de texto da Apple no tamanho padrão do Dynamic Type, e cada estilo corresponde a um papel do Material 3 no Android.

```summary
Takeaways:
- Dezessete estilos: cinco em Gambetta 700 (Splash, Display large, Display title, Display name, Section title), onze de texto em Switzer do Title 1 (28 pt) ao Caption 2 (11 pt) e um estilo para o código de retirada.
- A Gambetta nomeia telas e seções: títulos grandes, títulos de seção e uma loja como assunto. A Switzer é tudo o que fica dentro de uma seção, e os títulos de sheet: linhas, cartões, botões, conversa, preços e rótulos.
- As telas raiz (Nearby, Requests) têm título grande em Display large, de 48 pt; as outras, como Places, usam Display title, de 40; os dois recolhem para um título em linha de 17 pt em Switzer.
- Os títulos de seção são Section title, Gambetta 22/28. Os títulos de sheet são Headline (Switzer 600, 17), centralizados na barra. O nome da loja no recibo e o nome da loja na sheet de detalhes, alinhado à esquerda no conteúdo, são Display name, de 26.
- Os balões da conversa, as listas, os botões, os preços e as notificações são sempre em Switzer, então a conversa se lê numa fonte só. A única exceção é o nome da loja no cartão de uma compra no estado Ready.
Call:
- Indiquei as fontes a testar e descartei as fontes do sistema como escolha: SF Pro e Roboto são só fallback (decisão 027).
- Decidi que o chat usa uma sans só e que a fonte de display fica só onde ela se destaca (decisão 028), e depois escolhi Gambetta 700 com Switzer (decisão 029).
- Pedi que o espaçamento fosse refinado a partir de fontes confiáveis em vez de memória, e achei os títulos em Switzer 800 pesados demais, então os títulos são 600.
- Decidi que os títulos grandes são em Gambetta onde o display se aplica e em Title 1 nos outros lugares, e pedi um estilo para o código de retirada.
- Numa rodada anterior pedi títulos grandes com serifa maiores, com mais presença: o Display title passou de 34 para 40 pt, com entrelinha de 44.
- Nesta rodada, depois de uma revisão de marca ver que a Gambetta tinha pouca presença, pedi o nome da loja no recibo e o título da sheet de detalhes em Display name, depois todo título de tela e de seção em Gambetta e títulos raiz maiores (48 pt). Isso substitui a regra de "no máximo uma vez por tela" das decisões 028 e 029. É um teste meu na rodada de 2026-11-03 e pode ser revertido (decisão 045).
- Na revisão de acabamento seguinte pedi que os títulos de sheet voltassem para a Switzer: um título serifado entre Fechar e Confirmar brigava com os dois botões, e as sheets do iOS usam o estilo headline no título (change craft-pass-2).
AI:
- Um agente mediu as fontes com o fontTools, definiu o tracking por fonte e por tamanho e comparou os pesos dos títulos com as hastes da Gambetta. Eu escolhi o par, os pesos e onde o display pode aparecer.
- Um agente aplicou o novo tamanho à escala e às regras dos títulos grandes, e ajustou o tracking para os −0,02 em do estilo Splash, porque a Gambetta fecha à medida que cresce.
- Um agente criou o Display large e o Section title como tokens, passou todo título de tela e de seção para Gambetta no app e conferiu as telas no claro e no escuro.
Trade-offs:
- Fontes próprias precisam ser registradas para o Dynamic Type no iOS e para a escala de fonte no Android; a fonte do sistema escalaria sem custo.
- As fontes do Fontshare são gratuitas pela ITF Free Font License; embuti-las no app precisa ser verificado antes da Deliver.
- Com 40 pt, um nome de loja longo chega mais cedo a duas linhas; o limite de duas linhas continua, e o nome nunca desce abaixo de 26 pt para caber.
- Com Gambetta em todo título, uma tela pode mostrar quatro ou cinco linhas com serifa ao mesmo tempo. A fonte de display deixa de ser rara; agora ela marca a estrutura em vez de um momento.
```

## Fontes

```typefaces
Gambetta | 700 | Títulos: de tela, de seção, uma loja como assunto | Ready at Paper & Co
Switzer | 400, 500, 600 | Texto: conversa, listas, botões, preços, navegação, todo o resto | Eclipse glasses, 2 pairs, £14.99
```

As fontes carregam de uma pasta privada que não está no repositório público; sem elas, as amostras usam a fonte do sistema.

## Escala tipográfica

```type-scale
Splash | Gambetta 700 | 40/46 | −0.02 em | Display medium | Só no splash | Everything on King Street
Display large | Gambetta 700 | 48/52 | −0.02 em | Display medium | Títulos grandes das telas raiz, Nearby e Requests | Nearby
Display title | Gambetta 700 | 40/44 | −0.02 em | Display small | Entrada, títulos grandes das outras telas (Places), cabeçalho da página da loja | Places
Display name | Gambetta 700 | 26/30 | −0.01 em | Headline small | Uma loja como assunto: o cartão de compra em Ready, o recibo, o nome da loja no conteúdo da sheet de detalhes | Paper & Co
Section title | Gambetta 700 | 22/28 | −0.01 em | Title large | Títulos de seção | Open near you
Title 1 | Switzer 600 | 28/32 | −0.015 em | Headline medium | Conteúdo que pede uma linha grande em sans, como um telefone | Requests
Title 2 | Switzer 600 | 22/26 | −0.01 em | Title large | O nome de uma pessoa na sheet da conta | This week on King Street
Title 3 | Switzer 600 | 20/24 | −0.005 em | Title large | Títulos em superfícies com cara de sistema (a sheet de pagamento, alertas do Android) | Open near you
Headline | Switzer 600 | 17/22 | 0 em | Title medium | Títulos de linha, nomes de loja em listas, títulos de sheet e títulos em linha na barra | Broadway Chemist
Body | Switzer 400 | 17/24 | 0 em | Body large | Balões da conversa, descrições | Two shops have them. Still waiting on 3.
Callout | Switzer 400 | 16/22 | 0 em | Body large | Barra de pedido, campos | Ask for anything on King Street
Subheadline | Switzer 400 | 15/20 | 0 em | Body medium | Prévias, linhas secundárias | Ready · collect by Mon 9 Nov
Footnote | Switzer 400 | 13/18 | +0.01 em | Body small | Meta: rua, tempo a pé | King Street · 13 min walk · open till 7pm
Caption 1 | Switzer 500 | 12/16 | +0.015 em | Label medium | Horários, status | Replied 4 min ago
Caption 1 Strong | Switzer 600 | 12/16 | +0.015 em | Label medium | "Needs you" numa linha de pedido | Needs you
Caption 2 | Switzer 500 | 11/14 | +0.02 em | Label small | Selos; o mínimo | 3 new
Code | Switzer 600 | 48/56 | +0.12 em | Display medium | Código de retirada no recibo | K7Q2
```

As amostras acima de 34 px aparecem com 34 px para caber na página; a coluna de tamanho traz o valor real. Os tamanhos são pontos no iOS e sp no Android; o papel do Material 3 é o mais próximo, com o tamanho definido por esta escala. Os textos das amostras são da interface e ficam em inglês.

## Títulos grandes

As telas raiz, Nearby e Requests, usam o Display large: 48 pt com entrelinha de 52, bem acima do título grande do sistema, de 34 pt (`largeTitle` no iOS). As outras telas com título grande, como Places, e o nome da loja na página dela usam o Display title, de 40. Os títulos de navegação recolhidos ficam em 17 pt, em Switzer 600, como o sistema os desenha. A home não tem saudação; o título dela é "Nearby".

Um título grande fica mais perto do conteúdo que apresenta do que do que está acima dele: 24 da linha da área em Nearby, 16 dos controles da barra em Requests e Places, e 16 até o primeiro título de seção ou os chips de filtro ([Espaçamento e layout](spacing.md), Ritmo vertical).

## Regras do display

- Gambetta para todo título que nomeia uma tela ou uma seção: títulos grandes, títulos de seção ("Open near you", "Browse by category", "Asked about recently") e uma loja como assunto de uma tela. Switzer para tudo o que fica dentro das seções e para os títulos de sheet ("Where are you shopping?"): linhas, cartões, botões, conversa, preços, rótulos.
- Isso substitui a regra anterior de no máximo um elemento em Gambetta por tela (decisões 028 e 029). É um teste meu na rodada de 2026-11-03; reverter quer dizer voltar os títulos de seção para Title 3 e os títulos de tela, fora Nearby, para Title 1 em Switzer.
- No máximo duas linhas e nunca abaixo de 22 pt. A altura-x dela é 0,46 do em contra 0,53 da Switzer, então 22 pt é o menor tamanho em que um título ainda se lê como título.
- Nunca em caixa-alta ou itálico, e nunca nos balões da conversa, em listas, botões, títulos de navegação recolhidos, preços, formulários ou notificações. O nome de uma loja numa lista ou num cartão de opção fica em Switzer.
- Uma compra tem um desenho de cartão só. No estado Ready, o mesmo cartão põe o nome da loja em Display name; em qualquer outro estado o nome fica em Headline, em Switzer. Esse é o único lugar em que a Gambetta aparece na conversa.

## Regras do texto

- Os títulos em Switzer usam 600. Em 700 ou 800 ficam tão escuros quanto a Gambetta 700, e aí competem com ela.
- O tracking é definido por fonte e por tamanho: a Gambetta aperta conforme cresce, a Switzer fica em 0 no texto e abre um pouco abaixo de 15 pt. Kerning e ligaduras sempre ligados.
- Os números da Switzer são tabulares no próprio desenho, então preços, horários e contagens alinham sem configurar nada.
- Só a primeira letra maiúscula em todo lugar, sem rótulos em caixa-alta acima de títulos; a ênfase vem de tamanho e peso.

## Código de retirada

O código mostrado no balcão tem um estilo próprio: Switzer 600 em 48 pt com tracking de +0,12 em, para cada caractere ficar separado e o código ser lido com o braço esticado. Os números da Switzer são tabulares, então o código mantém o ritmo regular de uma fonte monoespaçada sem uma segunda fonte. Enquanto o código está na tela, o app sobe o brilho ao máximo e o devolve quando o comprador sai, como fazem os cartões de embarque na Wallet. O código escala com o Dynamic Type como qualquer outro estilo, e o VoiceOver o lê caractere por caractere.

## Acessibilidade

- Todo estilo escala com o Dynamic Type no iOS (pelo `UIFontMetrics`, no caso de fonte própria) e com a configuração de tamanho de fonte no Android (tamanhos em sp). O texto precisa funcionar a 200% (WCAG 1.4.4).
- Nada abaixo de 11 pt; o corpo tem 17 pt com entrelinha de pelo menos 1,2, e os layouts aguentam entrelinha de 1,5 e espaçamento maior entre letras (WCAG 1.4.12).
- Contraste de 4,5:1 para texto, 3:1 para texto grande e ícones (WCAG 1.4.3 e 1.4.11).
- SF Pro no iOS e Roboto no Android são o fallback quando uma fonte própria não carrega (decisão 027).
