# Hipóteses

O conceito se apoia em dezesseis hipóteses. A maioria vem de uma suposição ou pergunta em aberto da [conclusão do Discover](../discover/conclusion.md); quatro vêm dos meus motivos para fazer do concierge um agente, e cinco da forma como ele ganha dinheiro ([receita](revenue.md)). Cada uma tem um teste. Treze têm um critério de aprovação definido antes do teste; a H10, a H11 e a H16 são exploratórias e registram uma divisão ou uma contagem que define uma ordem ou um tamanho. Estão ordenadas por risco: o tamanho do estrago no conceito se a hipótese estiver errada, e o pouco de evidência que existe hoje.

```summary
Takeaways:
- A hipótese mais arriscada está do lado das lojas: lojistas respondendo a um pedido em minutos (H1). Não há evidência, e sem isso o concierge não funciona.
- A minha principal hipótese sobre o produto é que os compradores preferem perguntar a um concierge só a explorar lojas e ligar para elas por conta própria (H3), e que aceitam esperar enquanto ele trabalha (H4).
- Dois testes baratos cobrem a maior parte do risco: um concierge feito à mão pelo WhatsApp com lojas em volta da Blythe Road e um protótipo clicável com seis compradores.
Call:
- Testar primeiro o lado das lojas, à mão, antes de construir qualquer coisa que dependa dele.
- Fazer o teste à mão pelo WhatsApp, comigo no papel de concierge. Ele testa as lojas, a espera e um dos canais de uma vez.
- Os critérios de aprovação são definidos antes do teste, para que um resultado não possa ser lido do jeito que convém.
- Passar no protótipo registra o que os compradores dizem que fariam. Onde sai barato, o concierge feito à mão confere a mesma coisa com pedidos reais (H2, H7).
AI:
- Um agente rascunhou as hipóteses a partir das suposições e do conceito, e propôs testes e critérios de aprovação. Eu acrescentei as quatro sobre o agente e defini a ordem.
Trade-offs:
- Testes pequenos dão direção e não provam nada. Passar com seis compradores justifica o próximo passo. Um lançamento pediria bem mais.
- Um concierge feito por uma pessoa esconde quão bem os agentes fariam o mesmo trabalho. Esse é um teste para depois, quando as lojas passarem.
```

## Hipóteses por risco

| # | Acredito que… | De onde vem | Teste | Passa se |
| --- | --- | --- | --- | --- |
| H1 | Lojistas respondem a um pedido de estoque pelo WhatsApp em até 10 minutos enquanto estão abertos, com uma resposta que o comprador pode usar | A12; perguntas em aberto 2 e 5 | Concierge à mão só pelo WhatsApp: cerca de oito buscas, cada uma enviada às duas ou três lojas prováveis, somando 20 pedidos (2 por loja, 10 lojas a até 15 minutos a pé da Blythe Road) ao longo de dois dias. O tempo começa a contar quando a mensagem é entregue dentro do horário de funcionamento. Uma resposta válida é um sim ou não claro sobre o item e, no caso de sim, o preço e se a loja seguraria o item | 60% dos 20 pedidos recebem uma resposta válida em até 10 minutos, e pelo menos metade das buscas é resolvida (pelo menos um sim utilizável antes do prazo do comprador). As duas taxas são relatadas separadamente |
| H2 | Um comprador com uma necessidade urgente e específica escolhe fazer a ida quando uma loja confirma e segura o item | A5 | Protótipo com 6 compradores, cada um com um cenário com prazo. Acompanhamento no concierge feito à mão: para cada item seguro a partir de uma necessidade real, anotar se o comprador vai e retira | Declarado: 4 de 6 escolhem ir à loja em vez de pedir online. Comportamento: pelo menos 2 de cada 3 itens seguros no teste à mão são retirados, relatado junto com a contagem |
| H3 | Compradores com uma necessidade específica preferem perguntar a um concierge só a explorar lojas e contatá-las uma por uma | Conceito; um post | O protótipo oferece perguntar e explorar desde a primeira tela; anotar a primeira escolha em cada cenário e perguntar qual pareceu mais simples | Perguntar é a primeira escolha em 4 de 6 cenários de necessidade específica, e 4 de 6 dizem que é mais simples |
| H4 | Os compradores aceitam esperar vários minutos quando o concierge diz o que está fazendo e continua procurando | Conceito | Concierge feito à mão pelo WhatsApp com 6 compradores e pedidos reais; anotar quem espera e quem compra em outro lugar enquanto isso | 4 de 6 esperam a resposta |
| H5 | Os compradores confiam mais numa confirmação recente da loja do que no estoque informado por um caixa ou uma listagem | A10 | Mesmo protótipo, duas versões da resposta lado a lado | 4 de 6 preferem a confirmação da loja e dizem por quê |
| H6 | As lojas guardam um item pago por cerca de uma semana, e um não pago até o fim do próximo dia de funcionamento | Pergunta em aberto 5; prazos de retirada no Reino Unido (decisão 030) | Perguntar às 10 lojas da H1 se guardariam e por quanto tempo, com e sem pagamento | 6 de 10 guardariam um item pago por 7 dias (padaria, açougue e floricultura avaliadas pelo mesmo dia ou o seguinte) |
| H6, depois do trabalho | Para quem trabalha no horário das lojas, existe na rua pelo menos uma forma de retirar depois do trabalho | Pergunta em aberto 5; A7 | Perguntar às mesmas 10 lojas se ofereceriam um horário de retirada mais tarde num dia em que fecham tarde, ou se deixariam um item pago num ponto de retirada. Percorrer o anel de 15 minutos em volta da Blythe Road e listar o que fica aberto depois das 18h30 (lojas que abrem até mais tarde, armários) | 3 de 10 lojas fariam uma das duas coisas, e existe no anel de 15 minutos pelo menos um ponto de retirada aberto depois das 18h30 |
| H7 | Compradores que trabalham e desistiram por causa do horário reservariam e pagariam antes, e retirariam numa janela combinada | A6, A7 | Cenário do protótipo para compradores que trabalham, com uma pergunta de acompanhamento sobre o que fariam hoje. Acompanhamento no concierge feito à mão: oferecer a cada comprador que trabalha uma reserva real e anotar se ele reserva e retira | Declarado: 4 de 6 dizem que usariam isso no lugar da Amazon ou do supermercado para aquela compra. Comportamento: pelo menos 2 compradores que trabalham fazem e retiram uma reserva real |
| H8 | Os compradores deixam pedidos com antecedência para o concierge agir sobre eles, como avisos pontuais ("me avisa quando voltar") ou pedidos recorrentes ("pão toda sexta") | Conceito | O protótipo oferece um aviso pontual depois de um cenário em que nada foi encontrado, e um pedido recorrente depois de um cenário de rotina | Pontual: 3 de 6 criam um aviso. Recorrente: 2 de 6 criam um pedido. Relatados separadamente |
| H9 | Os lojistas veem valor em saber o que os compradores próximos pedem, inclusive o que eles não tinham | Pergunta em aberto 1 | Mostrar a 5 lojistas um resumo semanal fictício da demanda na rua deles | 3 de 5 dizem que isso mudaria o que estocam ou os faria responder pedidos |
| H10 | Alguns compradores preferem usar o concierge no WhatsApp ou no próprio assistente a instalar um app | Conceito | Perguntar a cada comprador dos testes da H3 e da H4 onde gostaria de usá-lo | Exploratória: registrada como uma divisão, sem critério de aprovação. Serve para definir a ordem dos canais |
| H11 | Uma minoria das lojas de uma rua tem dados de caixa com detalhe por item | F8; pergunta em aberto 3 | Contar, nas 10 lojas da H1, quais caixas têm códigos de produto | Exploratória: registrada como número, sem critério de aprovação. Serve para dimensionar o atalho da resposta na hora |
| H12 | Os compradores pagam no app pela maioria das reservas e dos pedidos pré-pagos, em vez de pagar no balcão | Receita | Na prova de conceito, oferecer "pagar agora" e "pagar no balcão" em toda reserva; contar qual é escolhido | 70% das reservas concluídas pagas no app |
| H13 | Lojas que ainda não estão no POS do provedor entrariam nele para receber pagamentos e pedidos do app | Receita | Depois de quatro semanas de prova de conceito, oferecer às lojas que usam outra maquininha a conta de pagamento ou o POS do provedor | 2 das primeiras 5 lojas nessa situação aceitam trocar ou fazer um teste |
| H14 | As lojas que já estão no POS do provedor veem os compradores do app como um motivo para mantê-lo | Receita; decisão 023 | Comparar as vendas por reservas do app em cada loja ao longo de quatro semanas e depois perguntar às lojas da rede se isso muda o valor que dão ao seu POS | 3 de 5 dizem que isso as faria manter ou recomendar o POS |
| H15 | As lojas pagariam para aparecer em destaque na tela inicial ou para um bairro além da sua rua | Receita | Depois de quatro semanas de resumos da demanda, oferecer um espaço em destaque a um preço semanal informado | 2 de 10 lojas pagam ou aceitam um teste pago |
| H16 | Os compradores compram de uma loja mais distante quando ela é a única com o item e eles podem pagar antes | Receita | Dados da prova de conceito: parcela das reservas concluídas em lojas a mais de 15 minutos a pé | Exploratória: registrada como parcela; serve para dimensionar o caso do alcance pago |

Um teste de protótipo registra a escolha declarada: o que o comprador diz ou clica num cenário. Ele não mostra se a pessoa iria, pagaria ou retiraria. Para a H2 e a H7, o concierge feito à mão acrescenta a verificação de comportamento, com necessidades reais e itens seguros de verdade.

## O que cada teste precisa

Estes testes acontecem dentro da [prova de conceito](next-step.md): o agente concierge chega às lojas, e o protótipo do app de quem compra é o que os compradores usam. A versão feita à mão abaixo é a alternativa se o agente não estiver pronto.

- **Concierge à mão pelo WhatsApp (H1, acompanhamentos da H2 e da H7, H4, H6, H10, H11).** Um telefone com WhatsApp, uma lista de dez lojas a até 15 minutos a pé da Blythe Road que respondem pelo WhatsApp, de categorias que apareceram na netnografia (ferragens, floricultura, padaria, açougue, farmácia), e seis compradores com necessidades reais, pelo menos três deles trabalhando no horário das lojas. Eu faço o papel de concierge. Nada construído. Dois dias, mais uma volta pelo anel de 15 minutos depois das 18h30.
- **Teste do protótipo (H2, H3, H5, H7, H8, H10).** O protótipo clicável do Deliver, com cenários tirados dos posts das personas (óculos para eclipse na véspera, um ventilador numa onda de calor, as compras da semana depois do trabalho). Seis compradores, 30 minutos cada.
- **Conversas com lojistas (H9).** Cinco visitas curtas com um mock-up impresso.

## Se a H1 falhar

O concierge, do jeito que foi desenhado, não funciona. As alternativas são mais estreitas: só lojas cujos caixas compartilham o estoque (respostas na hora, pouca cobertura), ou um pedido mais lento com a promessa de resposta até um horário definido, que serve mais à Jess do que ao Sam.

## Se a H3 ou a H4 falhar

O agente deixa de ser a entrada principal. Explorar lojas e categorias vira a tela principal, e o concierge fica como ferramenta para os pedidos que explorar não resolve.
