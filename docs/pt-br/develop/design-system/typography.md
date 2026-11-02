# Tipografia

Duas fontes: Gambetta para alguns momentos de display e Switzer para tudo o que o comprador lê. A escala segue os estilos de texto da Apple no tamanho padrão do Dynamic Type, e cada estilo corresponde a um papel do Material 3 no Android.

```summary
Takeaways:
- Treze estilos: três de display em Gambetta 700 e dez de texto em Switzer, do Title 1 (28 pt) ao Caption 2 (11 pt).
- A Gambetta aparece no máximo uma vez por tela, só no splash, na entrada, na saudação da home e quando uma loja é o assunto.
- A conversa, as listas, os botões, os preços e as notificações são sempre em Switzer, então a conversa tem uma fonte só.
Call:
- Decisões 027 (fontes do sistema só como fallback), 028 (uma sans para leitura, display só onde aparece) e 029 (Gambetta 700 com Switzer, títulos em 600).
AI:
- Um agente mediu as fontes com o fontTools, definiu o tracking por fonte e por tamanho e comparou os pesos dos títulos com as hastes da Gambetta. Eu escolhi o par, os pesos e onde o display pode aparecer.
Trade-offs:
- Fontes próprias precisam ser registradas para o Dynamic Type no iOS e para a escala de fonte no Android; a fonte do sistema escalaria sem custo.
- As fontes do Fontshare são gratuitas pela ITF Free Font License; embuti-las no app precisa ser verificado antes da Deliver.
```

## Fontes

```typefaces
Gambetta | 700 | Display: splash, entrada, saudação da home, uma loja como assunto | Ready at Paper & Co
Switzer | 400, 500, 600 | Texto: conversa, listas, botões, preços, navegação, todo o resto | Eclipse glasses, 2 pairs, £14.99
```

As fontes carregam de uma pasta privada que não está no repositório público; sem elas, as amostras usam a fonte do sistema.

## Escala tipográfica

```type-scale
Splash | Gambetta 700 | 40/46 | −0.02 em | Display medium | Só no splash | Everything on King Street
Display title | Gambetta 700 | 34/40 | −0.015 em | Display small | Entrada, saudação da home, cabeçalho da página da loja | Good morning, Sam
Display name | Gambetta 700 | 26/30 | −0.01 em | Headline small | Cartão de pronto para retirar, uma linha | Paper & Co
Title 1 | Switzer 600 | 28/32 | −0.015 em | Headline medium | Títulos de tela | Requests
Title 2 | Switzer 600 | 22/26 | −0.01 em | Title large | Títulos de seção grandes | This week on King Street
Title 3 | Switzer 600 | 20/24 | −0.005 em | Title large | Títulos de seção | Open near you
Headline | Switzer 600 | 17/22 | 0 em | Title medium | Títulos de linha, nomes de loja em listas | Broadway Chemist
Body | Switzer 400 | 17/24 | 0 em | Body large | Balões da conversa, descrições | Two shops have them. Still waiting on 3.
Callout | Switzer 400 | 16/22 | 0 em | Body large | Barra de pedido, campos | Ask for anything on King Street
Subheadline | Switzer 400 | 15/20 | 0 em | Body medium | Prévias, linhas secundárias | Held until Mon 9 Nov
Footnote | Switzer 400 | 13/18 | +0.01 em | Body small | Meta: rua, tempo a pé | King Street · 13 min walk · open till 7pm
Caption 1 | Switzer 500 | 12/16 | +0.015 em | Label medium | Horários, status | Replied 4 min ago
Caption 2 | Switzer 500 | 11/14 | +0.02 em | Label small | Selos; o mínimo | 3 new
```

As amostras acima de 34 px aparecem com 34 px para caber na página; a coluna de tamanho traz o valor real. Os tamanhos são pontos no iOS e sp no Android; o papel do Material 3 é o mais próximo, com o tamanho definido por esta escala. Os textos das amostras são da interface e ficam em inglês.

## Regras do display

- No máximo um elemento em Gambetta por tela, no máximo duas linhas, nunca abaixo de 26 pt. A altura-x dela é 0,46 do em contra 0,53 da Switzer, então tamanhos menores não parecem maiores que um título em Switzer.
- Nunca em caixa-alta ou itálico, e nunca na conversa, em listas, botões, barras de navegação, preços, formulários ou notificações. O nome de uma loja numa lista ou num cartão de opção fica em Switzer.
- Uma loja em destaque na home fica em Switzer, porque a saudação já usa Gambetta.

## Regras do texto

- Os títulos em Switzer usam 600. Em 700 ou 800 ficam tão escuros quanto a Gambetta 700, e aí competem com ela.
- O tracking é definido por fonte e por tamanho: a Gambetta aperta conforme cresce, a Switzer fica em 0 no texto e abre um pouco abaixo de 15 pt. Kerning e ligaduras sempre ligados.
- Os números da Switzer são tabulares no próprio desenho, então preços, horários e contagens alinham sem configurar nada.
- Só a primeira letra maiúscula em todo lugar, sem rótulos em caixa-alta acima de títulos; a ênfase vem de tamanho e peso.

## Acessibilidade

- Todo estilo escala com o Dynamic Type no iOS (pelo `UIFontMetrics`, no caso de fonte própria) e com a configuração de tamanho de fonte no Android (tamanhos em sp). O texto precisa funcionar a 200% (WCAG 1.4.4).
- Nada abaixo de 11 pt; o corpo tem 17 pt com entrelinha de pelo menos 1,2, e os layouts aguentam entrelinha de 1,5 e espaçamento maior entre letras (WCAG 1.4.12).
- Contraste de 4,5:1 para texto, 3:1 para texto grande e ícones (WCAG 1.4.3 e 1.4.11).
- SF Pro no iOS e Roboto no Android são o fallback quando uma fonte própria não carrega (decisão 027).
