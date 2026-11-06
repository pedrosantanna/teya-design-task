# Tarefas e eventos

As tarefas que um comprador e uma loja fazem no Snuffle, cada uma com os eventos que a começam e a terminam, e a taxonomia de eventos que um build futuro implementaria. É só uma definição: o protótipo não envia eventos.

```summary
Takeaways:
- Doze tarefas: nove do comprador (perguntar, responder às perguntas do Snuffle, comparar respostas, comprar, retirar, avaliar, explorar, abrir uma loja, Keep looking) e três da loja (responder a um pedido, separar, entregar no balcão). Cada uma tem um evento de início, um evento de fim e uma definição de sucesso, falha e abandono.
- O tempo na tarefa é relatado como mediana e percentil 90. Num pedido, o esforço do comprador e a espera pelas lojas são números separados, porque a maior parte do tempo decorrido é da loja.
- Quarenta e sete eventos, com nomes no formato objeto_ação. A maioria são registros do serviço, que o backend guarda para funcionar; o resto é analytics do app, pedido com consentimento.
- Nenhum dado pessoal entra num evento: nada de nomes, telefones, endereços, coordenadas, texto do item ou texto da nota. A área é o distrito postal, e o item vira um tipo.
Call:
- Pedi que cada tarefa principal fosse definida com seus eventos de início e fim, sucesso, falha, abandono, tempo na tarefa e taxa de erro, e com as nuances que vêm com os pedidos: uso repetido, pedidos semanais, Keep looking.
- Pedi uma taxonomia de eventos com nomes, gatilhos, propriedades principais e notas de privacidade, marcada como definição para um build futuro.
AI:
- Um agente tirou as tarefas e os eventos dos objetos, estados e verbos do modelo conceitual, das specs de pedido, resposta, compra e retirada e dos estados da simulação do protótipo, para que cada evento corresponda a um estado que o produto já tem.
Trade-offs:
- Só com os registros do serviço não dá para ver um abandono antes de o pedido existir, nem quanto tempo um comprador olha as respostas. Isso precisa de analytics no app, e só entra quem consentir.
- Transformar o texto do item num tipo deixa dados pessoais fora do analytics, e perde o detalhe de que o resumo de demanda precisa, que fica no serviço e só é compartilhado agregado.
```

## Tarefas do comprador

| Tarefa | Começa | Termina com sucesso | Falha | Abandono |
| --- | --- | --- | --- | --- |
| Pedir um item | `ask_started` | `request_created`: o Snuffle confirmou e consultou as lojas | `message_unmatched`, sem pedido depois | Barra de pedido deixada sem enviar |
| Responder às perguntas do Snuffle | `snuffle_question_shown` | `snuffle_question_answered`, por um chip ou em palavras que o Snuffle entendeu | Uma resposta digitada que o Snuffle não reconhece, ou uma segunda rodada na mesma pergunta | A pergunta em aberto quando a sessão termina |
| Comparar respostas | O primeiro `answer_viewed` num pedido | `buy_tapped`, ou No thanks em todas as respostas (`answer_dismissed`), que é um resultado válido | Nenhuma sozinha; veja Comprar | Respostas compráveis sem toque até o prazo |
| Comprar | `buy_tapped` | `payment_succeeded`, depois `order_set_aside` da loja | `payment_failed` sem nova tentativa, `order_not_confirmed`, `order_sold` | A sheet de pagamento fechada sem pagar |
| Retirar com o código | `order_set_aside` | `order_collected` até a data de retirada, contando uma extensão | `order_not_collected`; uma tag "Not ready when I came" na avaliação | Não separado: uma compra não retirada é a falha |
| Avaliar | `rating_prompt_shown` | `rating_submitted` | Nenhuma | Pedido de avaliação dispensado, ou passam 30 dias |
| Explorar o Nearby ou uma categoria | `nearby_viewed` | `shop_opened`, ou `ask_started` a partir de uma categoria ou loja | Nenhuma | A sessão termina sem abrir nada. Explorar pode terminar aí sem falhar |
| Abrir uma loja | `shop_opened` | `shop_action_tapped` (Directions, Call, Ask) ou `ask_started` a partir da página | Nenhuma | Voltar sem nenhuma ação |
| Keep looking | `keep_looking_set` | Um `answer_received` posterior com um sim, depois `payment_succeeded` | `request_closed` com motivo expirado | `request_closed` pelo comprador |

As perguntas do Snuffle são o que falta, uma divisão, retirar ou receber em casa, e notificações. Escolher entre retirar ou receber em casa é uma delas (tipo fulfilment), e a resposta é uma propriedade do pedido.

## Tarefas da loja

| Tarefa | Começa | Termina com sucesso | Falha | Abandono |
| --- | --- | --- | --- | --- |
| Responder a um pedido | `shop_asked` com a loja aberta | `shop_replied` com uma resposta válida em até 10 minutos de loja aberta (H1). Uma resposta válida é um sim ou não claro e, para um sim, o preço | `shop_replied` que não é válida (o Snuffle não consegue ler) | `shop_timed_out` aos 10 minutos; "No reply" no prazo |
| Separar | `payment_succeeded` numa loja consultada | `order_set_aside` em até 10 minutos | `order_sold` | `order_not_confirmed`: a autorização expira e ninguém é cobrado |
| Entregar no balcão | O comprador chega, o que nenhum evento mostra; `collection_code_opened` é o sinal mais próximo | `order_collected` lendo o código | O código não é aceito e a compra é marcada à mão (método: tap); uma contestação | Nenhum |

Uma loja conectada não faz as duas primeiras tarefas: o caixa responde e a venda é imediata. Os eventos dela levam origem: connected, e são relatados à parte das lojas consultadas.

## Tempo na tarefa

As durações são relatadas como mediana e percentil 90, não como média. Elas são assimétricas: um comprador que larga o celular por uma hora no meio da compra puxa a média para longe do que um comprador típico faz, e o percentil 90 mostra a cauda lenta que a média esconde.

Um pedido tem dois relógios. O esforço do comprador é o tempo com o app em primeiro plano nas telas daquele pedido, de `ask_started` a `payment_succeeded`, somado entre sessões; precisa de analytics no app. A espera é o tempo de `request_created` até o primeiro sim válido (`answer_received`) e, depois de comprar, de `payment_succeeded` até `order_set_aside`; a maior parte dela é da loja, e vem dos registros do serviço. O relógio de uma loja consultada só corre enquanto ela está aberta. Relatar os dois juntos culparia o app pelo ritmo da loja, ou esconderia um pedido lento atrás de uma loja rápida.

No protótipo as lojas seguem um roteiro, então os tempos do protótipo medem só o esforço.

## Erros

A taxa de erro é erros por tentativa, por tarefa.

| Tarefa | Erro | Taxa |
| --- | --- | --- |
| Pedir | Mensagem que o Snuffle não reconhece | `message_unmatched` por `request_created` |
| Responder às perguntas do Snuffle | Uma rodada a mais na mesma pergunta | Segundo `snuffle_question_shown` do mesmo tipo por pedido |
| Comprar | Pagamento que falhou | `payment_failed` por `buy_tapped` |
| Responder a um pedido (loja) | Resposta que o Snuffle não consegue ler | `shop_replied` inválida por `shop_asked` |
| Entregar no balcão (loja) | Código não aceito | `order_collected` com método tap depois de uma leitura, por retirada |

## Nuances

Um pedido semanal ("pão toda sexta") gera uma compra por semana sem um novo pedido. Essas compras contam como uso repetido e ficam fora da tarefa de pedir e fora do relógio de 10 minutos.

Keep looking dura dias. Os tempos dele são relatados à parte dos pedidos com prazo no mesmo dia.

Uma divisão transforma uma mensagem em dois pedidos. A tarefa de pedir conta por mensagem; atendimento e conversão contam por pedido.

Uma resposta parcial ("Has 1 of 2"), algo parecido e uma resposta de mais longe só são sucesso se o comprador comprar. Cada resposta registra seu resultado para que os três possam ser separados.

Uso repetido é um segundo pedido em até 30 dias depois da primeira compra retirada do comprador, e pedidos por comprador ativo por semana.

Todo tempo é dividido por origem (consultada ou conectada), já que um caixa responde na hora.

## Taxonomia de eventos

Os nomes seguem objeto_ação no passado, em inglês. Eventos "Serviço" são registros que o backend guarda para funcionar (pedidos, respostas, compras, pagamentos). Eventos "App" são analytics do app do comprador e precisam de consentimento.

Todo evento leva `event_id`, `ts` (UTC), `user_id` (um id pseudônimo aleatório, nunca um email ou telefone), `session_id`, `platform`, `app_version` e `area` (o distrito postal de onde o pedido foi feito, como W14), mais `request_id`, `order_id` e `shop_id` quando se aplicam.

### Explorar e lojas

| Evento | Tipo | Dispara quando | Propriedades principais |
| --- | --- | --- | --- |
| `app_opened` | App | O app vem para o primeiro plano | origem: ícone, notificação, link |
| `area_changed` | App | O comprador confirma um lugar ou raio | tipo de lugar: atual, salvo, buscado; raio em minutos |
| `nearby_viewed` | App | O Nearby aparece | número de lojas abertas, raio |
| `category_opened` | App | Um tipo é tocado | tipo |
| `shop_opened` | App | A página de uma loja abre | id da loja, origem: tile, categoria, resposta, compra, mapa |
| `shop_action_tapped` | App | Directions, Call ou Ask na página da loja | ação |

### Pedir

| Evento | Tipo | Dispara quando | Propriedades principais |
| --- | --- | --- | --- |
| `ask_started` | App | A barra de pedido recebe foco ou uma sugestão é tocada | origem: barra, sugestão, página da loja, chip de categoria |
| `request_created` | Serviço | O Snuffle confirma o pedido | tipo, número de itens, quantidade, prazo em minutos ou nenhum, retirada ou entrega, raio, canal: app, WhatsApp, assistente, recorrente: sim ou não |
| `request_split` | Serviço | O Snuffle propõe dividir e o comprador responde | aceito |
| `snuffle_question_shown` | App | O Snuffle pergunta algo | tipo: falta algo, dividir, retirada ou entrega, notificações |
| `snuffle_question_answered` | App | O comprador responde | tipo, como: chip ou digitado |
| `message_unmatched` | Serviço | O Snuffle não reconhece uma mensagem | etapa |

### Lojas e respostas

| Evento | Tipo | Dispara quando | Propriedades principais |
| --- | --- | --- | --- |
| `shop_asked` | Serviço | A consulta é entregue a uma loja | canal: WhatsApp ou caixa, aberta agora, anel |
| `shop_seen` | Serviço | O WhatsApp informa que a mensagem foi lida | segundos desde a consulta |
| `shop_replied` | Serviço | Uma loja consultada responde | resultado: tem, tem parte, parecido, não tem, pode fazer; válida; minutos até responder em horário aberto |
| `shop_timed_out` | Serviço | Nenhuma resposta válida até um marco | marco: 10 minutos ou prazo |
| `answer_received` | Serviço | Uma resposta chega ao pedido, de uma loja ou de um caixa | origem: consultada ou conectada; resultado; segundos desde o pedido; ordem de chegada |
| `answer_viewed` | App | Um cartão de resposta está na tela | posição, origem |
| `answer_dismissed` | App | No thanks | resultado |
| `request_widened` | Serviço | Ask further away | anel |
| `keep_looking_set` | Serviço | Keep looking é escolhido | recorrente: sim ou não; dias |
| `request_closed` | Serviço | O pedido termina sem uma compra aberta | motivo: comprador, não encontrado, expirado |

### Comprar e retirar

| Evento | Tipo | Dispara quando | Propriedades principais |
| --- | --- | --- | --- |
| `buy_tapped` | App | Buy na sheet de detalhes | origem, quantidade |
| `payment_succeeded` | Serviço | O pagamento é autorizado (loja consultada) ou cobrado (loja conectada) | valor em centavos de libra, método: Apple Pay, Google Pay, cartão; retirada ou entrega |
| `payment_failed` | Serviço | O pagamento não passa | motivo: recusado, cancelado |
| `order_set_aside` | Serviço | A loja confirma, e o pagamento é cobrado | segundos desde o pagamento |
| `order_not_confirmed` | Serviço | Passam 10 minutos sem confirmação | nenhuma |
| `order_sold` | Serviço | A loja diz que vendeu o item | nenhuma |
| `reminder_sent` | Serviço | O lembrete da véspera sai | dias restantes |
| `collection_code_opened` | App | O código é aberto em tela cheia | nenhuma |
| `order_extended` | Serviço | O comprador estende uma vez | dias a mais |
| `order_cancelled` | Serviço | O comprador cancela para ter estorno | dias depois de pronto |
| `order_collected` | Serviço | A loja lê o código ou marca a compra | método: leitura ou tap; lugar: loja ou ponto; dias depois de pronto; minutos a pé |
| `order_not_collected` | Serviço | A janela termina | nenhuma |
| `order_delivered` | Serviço | A loja ou o entregador marca como entregue | minutos desde o pagamento |

### Avaliações, lojas e guardrails

| Evento | Tipo | Dispara quando | Propriedades principais |
| --- | --- | --- | --- |
| `rating_prompt_shown` | App | O cartão Rate ou "How was [shop]?" aparece | nenhuma |
| `rating_submitted` | Serviço | Uma avaliação é enviada ou mudada | para cima ou para baixo; tags; tem nota: sim ou não |
| `rating_disputed` | Serviço | Uma loja contesta um caso | sinal |
| `refund_issued` | Serviço | O dinheiro volta | motivo: cancelada, não retirada, contestação |
| `complaint_opened` | Serviço | Um comprador ou uma loja procura o suporte | assunto |
| `notifications_changed` | App | As notificações são ligadas ou desligadas | estado |
| `shop_joined` | Serviço | Uma loja começa a responder | origem; nova no POS do provedor: sim ou não |
| `shop_opted_out` | Serviço | Uma loja para de responder ou sai | motivo |
| `demand_summary_sent` | Serviço | O resumo semanal vai para uma loja | pedidos contados |
| `demand_summary_read` | Serviço | O WhatsApp informa que foi lido | nenhuma |
| `offer_made` | Serviço | Uma loja recebe a oferta do POS ou de um espaço em destaque | tipo: pos ou promotion |
| `offer_accepted` | Serviço | A loja aceita ou começa um teste | tipo |

## Privacidade

Nenhuma propriedade de evento guarda dado pessoal: nada de nomes, telefones, emails ou endereços, coordenadas, dados de cartão, o texto do item que o comprador digitou ou o texto de uma nota de avaliação. O Snuffle transforma o item num tipo no servidor; o texto do item fica no serviço, onde o resumo semanal de demanda o usa agregado e nunca ligado a um comprador. Uma loja é um id, já que o nome da loja de um empreendedor individual pode identificar uma pessoa; o nome fica no banco de dados do serviço.

A área é o distrito postal, nunca o código postal completo ou a posição do comprador. Os valores ficam nos registros do serviço; o analytics que precisar deles usa faixas.

Os eventos de serviço existem porque o serviço precisa deles para receber um pedido e um pagamento, então são tratados para entregar o que o comprador pediu, sob a UK GDPR. Os eventos do app não são necessários para isso, então ficam desligados até o comprador concordar, e guardar ou ler qualquer coisa no celular para eles segue as mesmas regras dos cookies. O [guia do ICO sobre tecnologias de armazenamento e acesso](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/) lista uma exceção para fins estatísticos; se ela cobre estes eventos é algo a conferir quando forem construídos.

No concierge feito à mão, a planilha de registro usa os mesmos nomes de eventos, identifica os compradores como S1 a S6 e as lojas por id, e não guarda telefones. Compradores e lojas concordam em participar antes do primeiro pedido.
