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
Steps: Pedir | Buscar | Ofertas | Reservar e pagar | Retirar ou receber | Depois
Ponto de contato {muted}: Chat no app ; WhatsApp ; Assistente de AI próprio (MCP) | Mesma conversa | Cartões de opções | Tela de pagamento | Balcão da loja ; Entregador | Notificação
Comprador {c1 flow}: Diz o quê, onde e até quando ; Ou deixa um pedido antes | Espera, ou sai da conversa | Compara as opções | Escolhe uma loja ; Paga para segurar | Mostra o código ; Ou recebe a entrega | Avalia a loja ; Mantém um pedido recorrente
--- Linha de interação
Concierge {c3}: Confirma em uma linha ; Pergunta só o que falta | "Consultando seis lojas perto de você" | Primeira resposta na hora ; Continua procurando | Código e prazo da reserva | Como chegar ; Aviso antes de a reserva acabar | Pergunta como foi ; Executa pedidos recorrentes
--- Linha de visibilidade
Agentes {c4}: **Orquestrador** planeja as tarefas | **Estoque** lê os caixas compartilhados ; **Seleção** escolhe as lojas prováveis ; **Contato** manda mensagem a cada loja | Reúne as respostas ; **Entrega** cota o frete ; Amplia a busca perto do prazo | **Pagamento** cobra ; **Contato** confirma e libera as outras | Acompanha a reserva ; **Entrega** agenda a corrida | Registra a demanda ; Cruza pedidos recorrentes
Loja {c2}: - | Recebe o pedido no app da maquininha ou no WhatsApp | Responde: tem, preço, reserva, entrega | Separa o item | Passa o item ao comprador | Resumo semanal da demanda
--- Linha de interação interna
Sistemas {muted}: Localização ; Preferências salvas | Estoque do caixa ; Perfis e horários | Entregador ; Mapas | Cartão, carteira, link de pagamento | Entregador ; Repasse | Registro da demanda
Pontos de falha {fail}: Pedido vago | Nenhuma resposta a tempo (H1) | Um "tem" errado (A10) | Item já vendido | Comprador não aparece ; Janela não serve para a Jess | Resumo sem valor (H9)
```

## Versão da Jess

A Jess usa o mesmo fluxo em outro horário do dia. Ela pede de manhã, muitas vezes pelo WhatsApp a caminho do trabalho. O concierge tem o dia inteiro da loja para reunir as respostas, então a rapidez pesa menos e a reserva pesa mais: ela paga para segurar, e a retirada é uma janela depois do trabalho que a loja aceitou, ou entrega. Um pedido recorrente ("pão da padaria às sextas") faz a etapa 1 acontecer uma vez por semana.

## O que o protótipo cobre

O protótipo é o canal do app: as três raias do comprador (ponto de contato, comprador, concierge) nas etapas 1 a 4, com as respostas das lojas simuladas. O WhatsApp, a conexão MCP com outros assistentes e o lado da loja ficam como suposições registradas.
