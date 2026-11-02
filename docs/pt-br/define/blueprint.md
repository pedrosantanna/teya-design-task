# Blueprint de serviço

Como um pedido passa entre o comprador, o concierge e a loja, da primeira mensagem até a retirada e o que acontece depois. As raias acima da linha de visibilidade são o que o comprador vê; as de baixo são os agentes, a loja e os sistemas por trás deles. O exemplo é o do Sam: óculos para eclipse perto de Hammersmith antes das 16h. O concierge é um agente, e o único com quem o comprador conversa, no app, no WhatsApp ou pelo próprio assistente de AI via MCP. Os agentes abaixo da linha de visibilidade são partes do mesmo sistema, que fazem o trabalho por trás dele.

```summary
Takeaways:
- O comprador fala com um concierge só do começo ao fim. Por trás dele, agentes separados leem o estoque do caixa, escolhem as lojas prováveis, mandam mensagem para elas, reúnem as respostas, recebem o pagamento e chamam entregadores.
- A loja faz três coisas: responde a um pedido, separa o item e passa o item ao comprador. Todo o resto fica do lado do concierge.
- A maioria dos pontos de falha está onde o concierge espera por uma loja: nenhuma resposta a tempo, um "tem" errado, um item seguro que ninguém retira.
- A loja separa o item antes de o comprador pagar. Para a Jess, retirar depois do trabalho depende de um horário mais tarde, de um ponto de retirada ou de entrega à noite, e nada disso foi testado.
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
Ponto de contato {muted text smartphone}: Chat no app ; WhatsApp ; Assistente de AI próprio (MCP) | Mesma conversa | Cartões de opções | Tela de pagamento | Balcão da loja ; Ponto de retirada ; Entregador | Notificação
Comprador {c1 card user}: Diz o quê, onde e até quando ; Ou deixa um pedido antes | Espera, ou sai da conversa | Compara as opções | Escolhe a loja e o horário de retirada ; Paga quando o item está separado | Mostra o código ; Ou retira depois do trabalho ; Ou recebe a entrega | Avalia a loja ; Mantém um pedido recorrente
--- Linha de interação
Agente concierge {c3 card bot}: Confirma em uma linha ; Pergunta só o que falta | "Consultando seis lojas perto de você" | Mostra cada resposta quando chega ; Na hora só com caixa compartilhado ; Continua procurando | "Separado", vindo da loja ; Depois o pagamento ; Código, local e prazo da reserva | Como chegar ; Aviso antes de a reserva acabar | Pergunta como foi ; Executa pedidos recorrentes
--- Linha de visibilidade
Agentes por trás dele {c4 agent settings}: **Orquestrador** planeja as tarefas | **Estoque** lê os caixas compartilhados ; **Seleção** escolhe as lojas prováveis ; **Contato** manda mensagem a cada loja | Reúne as respostas ; **Entrega** cota o frete ; Amplia a busca perto do prazo | **Contato** recebe a confirmação da loja ; **Pagamento** cobra ; **Contato** libera as outras | Acompanha a reserva ; **Entrega** agenda a corrida ou a entrega à noite | Registra a demanda ; Cruza pedidos recorrentes
Loja {c2 card store}: - | Recebe o pedido no app da maquininha ou no WhatsApp | Responde: tem, preço, reserva, entrega | Separa o item ; Confirma | Passa o item ao comprador ; Ou deixa num ponto de retirada | Resumo semanal da demanda
--- Linha de interação interna
Sistemas {muted text server}: Localização ; Preferências salvas | Estoque do caixa ; Perfis e horários | Entregador ; Mapas | Cartão, carteira, link de pagamento | Entregador ; Pontos de retirada ; Repasse | Registro da demanda
Pontos de falha {fail triangle-alert}: Pedido vago | Nenhuma resposta a tempo (H1) | Um "tem" errado (A10) | Item já vendido ; Pagamento falha | Reserva expira ; Nenhuma opção depois do trabalho (H6) | Resumo sem valor (H9)
```

## Respostas na etapa 3

O concierge mostra a resposta de cada loja assim que ela chega e continua procurando opções melhores. Uma resposta só sai na hora quando o caixa da loja compartilha o estoque por item. Todas as outras vêm de uma loja respondendo ao pedido, o que leva minutos.

## Reserva e pagamento

A loja confirma que separou o item, e só então o comprador é cobrado. Suponho que o valor inteiro é cobrado nesse momento e estornado se a reserva expirar. Autorizar o cartão na reserva e capturar na retirada é a alternativa, que deixei em aberto.

| Caso | O que acontece |
| --- | --- |
| Item já vendido | A loja não consegue separar o item, então nada é cobrado. O concierge oferece a próxima loja que disse que tem, ou continua procurando. |
| Pagamento falha | O comprador pode tentar de novo. Depois de 10 minutos sem pagamento, a reserva é liberada e a loja é avisada. |
| Reserva expira | O concierge avisa o comprador antes do prazo. No fim do prazo, a reserva é liberada, a loja é avisada de que pode vender o item e o pagamento é estornado. |

## Versão da Jess

A Jess usa o mesmo fluxo em outro horário do dia. Ela pede de manhã, muitas vezes pelo WhatsApp a caminho do trabalho. O concierge tem o dia inteiro da loja para reunir as respostas, então a rapidez pesa menos e a reserva pesa mais. Um pedido recorrente ("pão da padaria às sextas") faz a etapa 1 acontecer uma vez por semana.

Pagar antes não adianta se a loja fecha antes de ela sair do trabalho, o que suponho ser por volta das 18h30 nos dias de semana. A etapa 5 precisa então de uma de três opções. Todas são suposições e nenhuma foi testada:

| Opção | Quem entrega | Onde | Quando |
| --- | --- | --- | --- |
| Retirada mais tarde na loja | O lojista | O balcão da loja | Um horário combinado, num dia em que a loja fecha tarde o bastante |
| Ponto de retirada | Alguém de uma loja que abre até mais tarde, ou um armário com o código da reserva | Na mesma rua; a loja ou um entregador deixa o item lá durante o dia | Depois do trabalho, até o ponto fechar |
| Entrega à noite | Um entregador chamado pelo agente de entrega | A casa da Jess | Um horário à noite; o entregador busca o item antes de a loja fechar |

A H6, nas [hipóteses](hypotheses.md), testa se as lojas ofereceriam um horário mais tarde ou deixariam um item pago num ponto de retirada, e se existe um ponto assim na King Street.

## O que o protótipo cobre

O protótipo é o canal do app: as três raias do comprador (ponto de contato, comprador, concierge) nas etapas 1 a 4, com as respostas das lojas simuladas. Ele inclui os três casos de reserva e pagamento (item já vendido, pagamento falha, reserva expira), então o aviso e o estorno da etapa 5 também entram. O WhatsApp, a conexão MCP com outros assistentes e o lado da loja ficam como suposições registradas.
