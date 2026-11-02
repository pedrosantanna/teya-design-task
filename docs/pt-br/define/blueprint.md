# Blueprint de serviço

Como um pedido passa entre o comprador, o concierge e a loja, da primeira mensagem até a retirada e o que acontece depois. As raias acima da linha de visibilidade são o que o comprador vê; as de baixo são os agentes, a loja e os sistemas por trás deles. O exemplo é o do Sam: óculos para eclipse perto de Hammersmith antes das 16h.

```summary
Takeaways:
- O comprador fala com um concierge só do começo ao fim. Por trás dele, agentes separados leem o estoque do caixa, escolhem as lojas prováveis, mandam mensagem para elas, reúnem as respostas, recebem o pagamento e chamam entregadores.
- A loja faz três coisas: responde a um pedido, separa o item e passa o item ao comprador. Todo o resto fica do lado do concierge.
- A maioria dos pontos de falha está onde o concierge espera por uma loja: nenhuma resposta a tempo, um "tem" errado, um item seguro que ninguém retira.
Call:
- Desenhei um blueprint para o fluxo principal e listei como a versão da Jess é diferente, em vez de fazer um segundo blueprint.
- A raia da loja é suposição. Nenhum lojista foi consultado ainda (H1 e H6 nas [hipóteses](hypotheses.md)).
AI:
- Um agente rascunhou as raias e as células a partir do [conceito](index.md) e dos riscos. Eu defini as etapas e quais agentes ficam por trás do concierge.
Trade-offs:
- Um blueprint neste nível mostra quem faz o quê e deixa o tempo de fora. Quanto cada espera pode durar é uma pergunta para o teste do concierge feito à mão.
```

## Blueprint

```blueprint
Steps: 1 · Pedir | 2 · Buscar | 3 · Oferecer | 4 · Reservar e pagar | 5 · Retirar ou receber | 6 · Depois
Ponto de contato: Chat do concierge no app ; Ou WhatsApp, ou o assistente de IA do próprio comprador | Mesma conversa | Mesma conversa, com cartões de opção | Mesma conversa ; Tela de pagamento | Balcão da loja ; Entregador na porta | Mesma conversa ; Notificação
Comprador: Diz do que precisa, onde e até quando ; Ou deixa um pedido com antecedência ("me avisa quando tiverem") | Espera, ou sai da conversa e recebe uma mensagem depois | Compara as opções conforme chegam | Escolhe uma ; Reserva, ou paga para segurar | Vai até a loja e mostra o código ; Ou recebe a entrega | Avalia a loja ; Mantém um pedido recorrente
--- Linha de interação
Concierge: Confirma o pedido numa linha ; Pergunta só o que falta (tamanho, orçamento, prazo) | "Estou consultando seis lojas perto de você. Te aviso conforme elas responderem." | Mostra a primeira resposta assim que chega ; Continua procurando enquanto outras estão pendentes ; Preço, distância, horário de fechamento, tempo de reserva, entrega | Confirma a reserva com um código e um horário-limite | Como chegar ; Lembrete antes de a reserva acabar ; Acompanhamento da entrega | Pergunta como foi ; Age depois sobre os pedidos recorrentes
--- Linha de visibilidade
Agentes: O orquestrador lê o item, o lugar e o prazo, e planeja as tarefas | O agente de estoque lê os dados de caixa onde a loja compartilha ; O agente de seleção de lojas escolhe as lojas prováveis por listagens e categorias ; O agente de contato manda um pedido por loja | Reúne as respostas e descarta as vencidas ; Pede uma cotação de entrega ao agente de entrega ; Amplia a busca quando o prazo aperta | O agente de pagamento recebe o pagamento ; O agente de contato confirma com a loja escolhida e libera as outras | Acompanha a janela de reserva, estende ou cancela ; Chama o entregador | Registra o pedido como demanda ; Cruza os pedidos recorrentes com novas respostas ou estoque
Loja: - | Recebe o pedido na ferramenta que já usa (app de lojista ou WhatsApp) | Responde com um toque ou uma mensagem curta: tem, preço, segura até, entrega | Separa o item com o código | Passa o item ao comprador e marca como retirado | Recebe um resumo semanal do que as pessoas por perto pediram, inclusive o que ela não tinha
--- Linha de interação interna
Sistemas: Localização ; Preferências e forma de pagamento salvas | Estoque do caixa, onde compartilhado ; Listagens públicas e horários de funcionamento ; Mensagens para as lojas | Cotações de entrega ; Mapas | Provedor de pagamento: cartão, carteira digital, link de pagamento | Entregador ; Repasse do pagamento à loja | Registros de demanda por rua
Pontos de falha: Pedido vago ; Canal sem localização | Nenhuma loja responde a tempo (H1) ; Pedidos demais por loja | Uma loja diz que tem e não tem (A10) | O pagamento falha ; O item já foi vendido | Falta ; A janela de retirada não cabe (Jess) | As lojas não dão valor ao resumo (H9)
```

## Versão da Jess

A Jess usa o mesmo fluxo em outro horário do dia. Ela pede de manhã, muitas vezes pelo WhatsApp a caminho do trabalho. O concierge tem o dia inteiro da loja para reunir as respostas, então a rapidez pesa menos e a reserva pesa mais: ela paga para segurar, e a retirada é uma janela depois do trabalho que a loja aceitou, ou entrega. Um pedido recorrente ("pão da padaria às sextas") faz a etapa 1 acontecer uma vez por semana.

## O que o protótipo cobre

O protótipo é o canal do app: as três raias do comprador (ponto de contato, comprador, concierge) nas etapas 1 a 4, com as respostas das lojas simuladas. O WhatsApp, a conexão MCP com outros assistentes e o lado da loja ficam como suposições registradas.
