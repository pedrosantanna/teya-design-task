# Hipóteses

O conceito se apoia em dezenove hipóteses. A maioria vem de uma suposição ou pergunta em aberto da [conclusão do Discover](../discover/conclusion.md); quatro vêm dos meus motivos para fazer do concierge um agente, cinco da forma como ele ganha dinheiro ([valor e receita](revenue.md)) e três das avaliações na página da loja (decisão 047). Cada uma tem um teste. Dezesseis têm um critério de aprovação definido antes do teste; a H10, a H11 e a H16 são exploratórias e registram uma divisão ou uma contagem que define uma ordem ou um tamanho. Estão ordenadas por risco: o tamanho do estrago no conceito se a hipótese estiver errada, e o pouco de evidência que existe hoje.

```summary
Takeaways:
- A hipótese mais arriscada está do lado das lojas: lojistas respondendo a um pedido em minutos (H1). Não há evidência, e sem isso o concierge não funciona.
- A minha principal hipótese sobre o produto é que os compradores preferem perguntar a um concierge só a explorar lojas e ligar para elas por conta própria (H3), e que aceitam esperar enquanto ele trabalha (H4).
- Dois testes baratos cobrem a maior parte do risco: um concierge feito à mão pelo WhatsApp com lojas em volta da Blythe Road e um protótipo clicável com seis compradores.
Call:
- Acrescentei as quatro hipóteses sobre o agente (perguntar primeiro, a espera, pedidos deixados com antecedência, canais) e defini a ordem: o lado da loja é testado primeiro, à mão, antes de construir qualquer coisa que dependa dele.
- Passei o teste à mão para o WhatsApp, comigo no papel de concierge. Ele testa as lojas, a espera e um dos canais de uma vez.
- Defini os critérios de aprovação antes do teste, para que um resultado não possa ser lido do jeito que convém. Passar no protótipo registra o que os compradores dizem que fariam; onde sai barato, o concierge feito à mão confere a mesma coisa com pedidos reais (H2, H7).
- Depois acrescentei três hipóteses sobre avaliações: que os sinais do Snuffle deixam uma loja consultada competir com uma conectada (H17), que "% would go back" se lê tão fácil quanto estrelas (H18) e que as lojas aceitam um número público de precisão de estoque (H19).
AI:
- Um agente rascunhou as hipóteses a partir das suposições e do conceito, e propôs testes e critérios de aprovação. Eu acrescentei as quatro sobre o agente e defini a ordem.
- Um agente rascunhou a H17 a H19 e os testes delas a partir da decisão 047; eu escolhi o teste de 5 segundos para a H18 e perguntar às mesmas 10 lojas para a H19.
Trade-offs:
- Testes pequenos dão direção e não provam nada. Passar com seis compradores justifica o próximo passo. Um lançamento pediria bem mais.
- Um concierge feito por uma pessoa esconde quão bem os agentes fariam o mesmo trabalho. Esse é um teste para depois, quando as lojas passarem.
```

## Hipóteses por risco

| # | Acredito que… | De onde vem | Teste | Passa se |
| --- | --- | --- | --- | --- |
| H1 | Lojistas respondem a um pedido de estoque pelo WhatsApp em até 10 minutos enquanto estão abertos, com uma resposta que o comprador pode usar | A12; perguntas em aberto 2 e 5 | Concierge à mão só pelo WhatsApp: cerca de oito buscas, cada uma enviada às duas ou três lojas prováveis, somando 20 pedidos (2 por loja, 10 lojas a até 15 minutos a pé da Blythe Road) ao longo de dois dias. O tempo começa a contar quando a mensagem é entregue dentro do horário de funcionamento. Uma resposta válida é um sim ou não claro sobre o item e, no caso de sim, o preço e se a loja seguraria o item | 60% dos 20 pedidos recebem uma resposta válida em até 10 minutos, e pelo menos metade das buscas é resolvida (pelo menos um sim utilizável antes do prazo do comprador). As duas taxas são relatadas separadamente |
| H2 | Um comprador com uma necessidade urgente e específica compra no app e faz a ida quando uma loja confirma que separou o item | A5 | Protótipo com 6 compradores, cada um com um cenário com prazo. Acompanhamento no concierge feito à mão: para cada compra feita a partir de uma necessidade real, anotar se o comprador vai e retira | Declarado: 4 de 6 escolhem ir à loja em vez de pedir online. Comportamento: pelo menos 2 de cada 3 compras no teste à mão são retiradas, relatado junto com a contagem |
| H3 | Compradores com uma necessidade específica preferem perguntar a um concierge só a explorar lojas e contatá-las uma por uma | Conceito; um post | O protótipo oferece perguntar e explorar desde a primeira tela; anotar a primeira escolha em cada cenário e perguntar qual pareceu mais simples | Perguntar é a primeira escolha em 4 de 6 cenários de necessidade específica, e 4 de 6 dizem que é mais simples |
| H4 | Os compradores aceitam esperar vários minutos quando o concierge diz o que está fazendo e continua procurando | Conceito | Concierge feito à mão pelo WhatsApp com 6 compradores e pedidos reais; anotar quem espera e quem compra em outro lugar enquanto isso | 4 de 6 esperam a resposta |
| H5 | Os compradores confiam mais numa confirmação recente da loja do que no estoque informado por um caixa ou uma listagem | A10 | Mesmo protótipo, duas versões da resposta lado a lado | 4 de 6 preferem a confirmação da loja e dizem por quê |
| H6 | As lojas deixam um item comprado separado por cerca de uma semana | Pergunta em aberto 5; prazos de retirada no Reino Unido (decisões 030 e 037) | Perguntar às 10 lojas da H1 se deixariam um item comprado separado e por quanto tempo | 6 de 10 deixariam um item comprado separado por 7 dias (padaria, açougue e floricultura avaliadas pelo mesmo dia ou o seguinte) |
| H6, depois do trabalho | Para quem trabalha no horário das lojas, existe na rua pelo menos uma forma de retirar depois do trabalho | Pergunta em aberto 5; A7 | Perguntar às mesmas 10 lojas se ofereceriam um horário de retirada mais tarde num dia em que fecham tarde, ou se deixariam um item pago num ponto de retirada. Percorrer o anel de 15 minutos em volta da Blythe Road e listar o que fica aberto depois das 18h30 (lojas que abrem até mais tarde, armários) | 3 de 10 lojas fariam uma das duas coisas, e existe no anel de 15 minutos pelo menos um ponto de retirada aberto depois das 18h30 |
| H7 | Compradores que trabalham e desistiram por causa do horário comprariam antes e retirariam dentro da janela de retirada da loja | A6, A7 | Cenário do protótipo para compradores que trabalham, com uma pergunta de acompanhamento sobre o que fariam hoje. Acompanhamento no concierge feito à mão: oferecer a cada comprador que trabalha uma compra real e anotar se ele compra e retira | Declarado: 4 de 6 dizem que usariam isso no lugar da Amazon ou do supermercado para aquela compra. Comportamento: pelo menos 2 compradores que trabalham fazem e retiram uma compra real |
| H8 | Os compradores deixam pedidos com antecedência para o concierge agir sobre eles, como avisos pontuais ("me avisa quando voltar") ou pedidos recorrentes ("pão toda sexta") | Conceito | O protótipo oferece um aviso pontual depois de um cenário em que nada foi encontrado, e um pedido recorrente depois de um cenário de rotina | Pontual: 3 de 6 criam um aviso. Recorrente: 2 de 6 criam um pedido. Relatados separadamente |
| H9 | Os lojistas veem valor em saber o que os compradores próximos pedem, inclusive o que eles não tinham | Pergunta em aberto 1 | Mostrar a 5 lojistas um resumo semanal fictício da demanda na rua deles | 3 de 5 dizem que isso mudaria o que estocam ou os faria responder pedidos |
| H10 | Alguns compradores preferem usar o concierge no WhatsApp ou no próprio assistente a instalar um app | Conceito | Perguntar a cada comprador dos testes da H3 e da H4 onde gostaria de usá-lo | Exploratória: registrada como uma divisão, sem critério de aprovação. Serve para definir a ordem dos canais |
| H11 | Uma minoria das lojas de uma rua tem dados de caixa com detalhe por item | F8; pergunta em aberto 3 | Contar, nas 10 lojas da H1, quais caixas têm códigos de produto | Exploratória: registrada como número, sem critério de aprovação. Serve para dimensionar o atalho da resposta na hora |
| H12 | Os compradores que recebem um sim compram no app e retiram depois, em vez de ir à loja sem comprar | Receita; decisões 032 e 037 | Na prova de conceito, contar quantos sins terminam numa compra e quantos compradores dizem que vão mesmo assim | 70% dos sins terminam numa compra |
| H13 | Lojas que ainda não estão no POS do provedor entrariam nele para receber pagamentos e pedidos do app | Receita | Depois de quatro semanas de prova de conceito, oferecer às lojas que usam outra maquininha a conta de pagamento ou o POS do provedor | 2 das primeiras 5 lojas nessa situação aceitam trocar ou fazer um teste |
| H14 | As lojas que já estão no POS do provedor veem os compradores do app como um motivo para mantê-lo | Receita; decisão 023 | Comparar as vendas pelo app em cada loja ao longo de quatro semanas e depois perguntar às lojas da rede se isso muda o valor que dão ao seu POS | 3 de 5 dizem que isso as faria manter ou recomendar o POS |
| H15 | As lojas pagariam para aparecer em destaque na tela inicial ou para um bairro além da sua rua | Receita | Depois de quatro semanas de resumos da demanda, oferecer um espaço em destaque a um preço semanal informado | 2 de 10 lojas pagam ou aceitam um teste pago |
| H16 | Os compradores compram de uma loja mais distante quando ela é a única com o item e eles podem pagar antes | Receita | Dados da prova de conceito: parcela das compras retiradas em lojas a mais de 15 minutos a pé | Exploratória: registrada como parcela; serve para dimensionar o caso do alcance pago |
| H17 | Com uma linha de confiabilidade, os compradores compram numa loja consultada tanto quanto numa loja conectada | Decisão 047; H5 | Protótipo com 6 compradores: dois cartões de resposta com o mesmo preço e o mesmo tempo a pé, um de uma loja consultada e um de uma loja conectada. Cada comprador vê o par duas vezes, com e sem a linha de confiabilidade no cartão da loja consultada, em ordem alternada | Com a linha, a loja consultada é escolhida em pelo menos 3 de 6 pares, e mais vezes do que sem ela |
| H18 | Os compradores leem "% would go back" tão fácil quanto estrelas | Decisão 047 | Teste de 5 segundos com 6 compradores: uma página de loja aparece por cinco segundos, depois a pergunta "Como quem comprou avalia esta loja, e quantas pessoas avaliaram?". Cada um vê uma loja com "92% would go back · 38 buyers" e outra com média de estrelas e contagem, em ordem alternada | 5 de 6 acertam as duas partes com a porcentagem, e não menos do que com estrelas |
| H19 | As lojas aceitam um número público de precisão de estoque | Decisão 047 | Perguntar às 10 lojas da H1, mostrando a cada uma o próprio número do teste à mão ("Had it 9 of 10 times when they said yes") e o direito de contestar um caso | 6 de 10 aceitam o número em público |

Um teste de protótipo registra a escolha declarada: o que o comprador diz ou clica num cenário. Ele não mostra se a pessoa iria, pagaria ou retiraria. Para a H2 e a H7, o concierge feito à mão acrescenta a verificação de comportamento, com necessidades reais e compras de verdade.

## O que cada teste precisa

Estes testes acontecem dentro da [prova de conceito](next-step.md): o agente concierge chega às lojas, e o protótipo do app de quem compra é o que os compradores usam. A versão feita à mão abaixo é a alternativa se o agente não estiver pronto.

- **Concierge à mão pelo WhatsApp (H1, acompanhamentos da H2 e da H7, H4, H6, H10, H11, H19).** Um telefone com WhatsApp, uma lista de dez lojas a até 15 minutos a pé da Blythe Road que respondem pelo WhatsApp, de categorias que apareceram na netnografia (ferragens, floricultura, padaria, açougue, farmácia), e seis compradores com necessidades reais, pelo menos três deles trabalhando no horário das lojas. Eu faço o papel de concierge. Nada construído. Dois dias, mais uma volta pelo anel de 15 minutos depois das 18h30.
- **Teste do protótipo (H2, H3, H5, H7, H8, H10, H17, H18).** O protótipo clicável do Deliver, com cenários tirados dos posts das personas (óculos para eclipse na véspera, um ventilador numa onda de calor, as compras da semana depois do trabalho). Seis compradores, 30 minutos cada.
- **Conversas com lojistas (H9).** Cinco visitas curtas com um mock-up impresso.

## Se a H1 falhar

O concierge, do jeito que foi desenhado, não funciona. As alternativas são mais estreitas: só lojas cujos caixas compartilham o estoque (respostas na hora, pouca cobertura), ou um pedido mais lento com a promessa de resposta até um horário definido, que serve mais à Jess do que ao Sam.

## Se a H3 ou a H4 falhar

O agente deixa de ser a entrada principal. Explorar lojas e categorias vira a tela principal, e o concierge fica como ferramenta para os pedidos que explorar não resolve.

## Se a H19 falhar

A precisão de estoque fica privada: cada loja vê o próprio número, e a página da loja mostra só a taxa e o tempo de resposta.
