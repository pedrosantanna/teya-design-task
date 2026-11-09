# Tarefas e eventos

As tarefas que um comprador e uma loja fazem no Snuffle, cada uma com os eventos que a começam e a terminam, e a taxonomia de eventos que um build futuro implementaria. É só uma definição: o protótipo não envia eventos.

```summary
Takeaways:
- Doze tarefas: nove do comprador (perguntar, responder às perguntas do Snuffle, comparar respostas, comprar, retirar, avaliar, explorar, abrir uma loja, Keep looking) e três da loja (responder a um pedido, confirmar uma compra, entregar no balcão). Cada uma tem um evento de início, um evento de fim e uma definição de sucesso, falha e abandono.
- O tempo na tarefa é relatado como mediana e percentil 90. Num pedido, o esforço do comprador e a espera pelas lojas são números separados, porque a maior parte do tempo decorrido é da loja.
- Cinquenta e oito eventos, com nomes no formato objeto_ação. A maioria são registros do serviço, que o backend guarda para funcionar; o resto é analytics do app, pedido com consentimento.
- Nenhum dado pessoal entra num evento: nada de nomes, telefones, endereços, coordenadas, texto do item ou texto da nota. A área é o distrito postal, e o item vira um tipo.
Call:
- Pedi que cada tarefa principal fosse definida com seus eventos de início e fim, sucesso, falha, abandono, tempo na tarefa e taxa de erro, e com as nuances que vêm com os pedidos: uso repetido, pedidos semanais, Keep looking.
- Pedi uma taxonomia de eventos com nomes, gatilhos, propriedades principais e notas de privacidade, marcada como definição para um build futuro.
- Pedi uma revisão das tarefas e dos eventos contra os estados do protótipo e que os achados fossem corrigidos: lojas conectadas e entrega, autorização separada da cobrança, Not found como estado vivo e taxas de erro com um denominador de verdade.
AI:
- Um agente tirou as tarefas e os eventos dos objetos, estados e verbos do modelo conceitual, das specs de pedido, resposta, compra e retirada e dos estados da simulação do protótipo, para que cada evento corresponda a um estado que o produto já tem.
- Numa segunda passada, um agente conferiu cada tarefa e evento contra os estados de compra e pagamento da simulação, acrescentou os eventos que faltavam (pronto, a caminho, não encontrado, pagamento tentado e cancelado, tempo de tela num pedido) e tirou dois duplicados.
Trade-offs:
- Só com os registros do serviço não dá para ver um abandono antes de o pedido existir, nem quanto tempo um comprador olha as respostas. Isso precisa de analytics no app, e só entra quem consentir.
- Transformar o texto do item num tipo deixa dados pessoais fora do analytics, e perde o detalhe de que o resumo de demanda precisa, que fica no serviço e só é compartilhado agregado.
```

## Tarefas do comprador

| Tarefa | Começa | Termina com sucesso | Falha | Abandono |
| --- | --- | --- | --- | --- |
| Pedir um item | `ask_started` | `request_created`: o Snuffle confirmou e consultou as lojas | `message_unmatched` (etapa ask), sem pedido depois | `ask_started` sem `message_sent` |
| Responder às perguntas do Snuffle | `snuffle_question_shown` | `snuffle_question_answered`, por um chip ou em palavras que o Snuffle entendeu | `message_unmatched` (etapa question), ou uma segunda rodada na mesma pergunta | A pergunta em aberto quando a sessão termina |
| Comparar respostas | O primeiro `answer_viewed` num pedido | `buy_tapped`, ou `answer_dismissed` em todas as respostas, que é um resultado válido | Nenhuma sozinha; veja Comprar | `request_closed` com motivo prazo com respostas |
| Comprar | `buy_tapped` | Uma compra: `payment_authorised` numa loja consultada, `payment_taken` numa conectada | `payment_failed` sem um `payment_attempted` depois na mesma resposta | `payment_cancelled` sem nova tentativa |
| Retirar com o código | `order_ready` (retirada) | `order_collected` até a data de retirada, contando uma extensão | `order_not_collected` | `order_cancelled` |
| Avaliar | `rating_prompt_shown` | `rating_submitted` | Nenhuma | Pedido de avaliação dispensado, ou passam 30 dias |
| Explorar o Nearby ou uma categoria | `nearby_viewed` | `shop_opened`, ou `ask_started` a partir de uma categoria ou loja | Nenhuma | A sessão termina sem abrir nada. Explorar pode terminar aí sem falhar |
| Abrir uma loja | `shop_opened` | `shop_action_tapped` (Directions, Call) ou `ask_started` a partir da página | Nenhuma | Voltar sem nenhuma ação |
| Keep looking | `keep_looking_set` | Um `answer_received` posterior com um sim, depois uma compra | `request_closed` com motivo busca expirada | `request_closed` com motivo comprador |

As perguntas do Snuffle são o que falta, uma divisão, retirar ou receber em casa, e notificações. Escolher entre retirar ou receber em casa é uma delas (tipo fulfilment), e a resposta é uma propriedade do pedido.

Uma tag "Not ready when I came" numa avaliação é um indicador de qualidade da loja, relatado ao lado da taxa de retirada. A compra foi retirada mesmo assim.

Uma entrega não tem tarefa do comprador depois de comprar. Os estados dela são registros do serviço: `order_ready` quando está paga, `order_dispatched` quando sai para entrega, `order_delivered` na porta.

## Tarefas da loja

| Tarefa | Começa | Termina com sucesso | Falha | Abandono |
| --- | --- | --- | --- | --- |
| Responder a um pedido | `shop_asked` com a loja aberta | `shop_replied`, válida, em até 10 minutos de loja aberta (H1) | `shop_replied` que não é válida; nenhum `answer_received` vem depois | `shop_timed_out` no marco de 10 minutos |
| Confirmar uma compra | `payment_authorised` numa loja consultada | `order_confirmed` em até 10 minutos de loja aberta | `order_sold` | `order_not_confirmed`: a autorização expira e ninguém é cobrado |
| Entregar no balcão | O comprador chega, o que nenhum evento mostra; `collection_code_opened` é o sinal mais próximo | `order_collected` lendo o código | `collection_code_rejected`, e a compra marcada à mão (método tap) | Nenhum |

Uma resposta válida que chega depois do marco de 10 minutos e antes do prazo é uma resposta válida atrasada. O comprador a recebe e pode comprar; a H1 não a conta como sucesso.

Uma loja conectada não faz as duas primeiras tarefas: o caixa responde e a venda é imediata, então a compra vai direto para `order_ready`. Os eventos dela levam origem: connected, e são relatados à parte das lojas consultadas.

## Definições

| Termo | Significado |
| --- | --- |
| Sim | Uma resposta que tem o item: tem, tem parte, em estoque, em estoque em parte. A mesma lista de `YES` na simulação do protótipo |
| Comprável | Um sim, algo parecido ou pode fazer. A mesma lista de `BUYABLE` na simulação |
| Resposta válida | Uma resposta que o Snuffle consegue ler como um sim ou não claro sobre o item e, para um sim, o preço |
| Compra | O pagamento do comprador passar: `payment_authorised` numa loja consultada, `payment_taken` numa loja conectada |
| Minutos de loja aberta | Minutos com a loja aberta. Os dois relógios de 10 minutos (responder e confirmar) só contam esses |
| Uso repetido | Um comprador com uma compra retirada ou entregue que tem outro pedido em até 30 dias, novo ou o próximo ciclo de um pedido recorrente. Os dois são relatados separados |

## Tempo na tarefa

As durações são relatadas como mediana e percentil 90, não como média. Elas são assimétricas: um comprador que larga o celular por uma hora no meio da compra puxa a média para longe do que um comprador típico faz, e o percentil 90 mostra a cauda lenta que a média esconde.

| Relógio | Medido como | Termina | Fonte |
| --- | --- | --- | --- |
| Esforço do comprador | Segundos entre cada `request_opened` e seu `request_left` nas telas daquele pedido (conversa, detalhes, pagamento), somados entre sessões, a partir de `ask_started` | A compra; sem compra, o último `request_left` antes de `request_closed` | Analytics do app |
| Espera por uma resposta | `request_created` até o primeiro `answer_received` comprável | Essa resposta | Serviço |
| Espera pela confirmação | `payment_authorised` até `order_confirmed`, em minutos de loja aberta | A confirmação | Serviço |
| Entrega | `order_ready` até `order_delivered` | Entregue | Serviço |

Relatar esforço e espera juntos culparia o app pelo ritmo da loja, ou esconderia um pedido lento atrás de uma loja rápida. No protótipo as lojas seguem um roteiro, então os tempos do protótipo medem só o esforço.

## Erros

A taxa de erro é erros por tentativa, por tarefa. Todo denominador é um evento que dispara a cada tentativa.

| Tarefa | Erro | Taxa |
| --- | --- | --- |
| Pedir | Mensagem que o Snuffle não reconhece | `message_unmatched` (etapa ask) por `message_sent` (etapa ask) |
| Responder às perguntas do Snuffle | Uma rodada a mais na mesma pergunta | Segundo `snuffle_question_shown` do mesmo tipo por pedido |
| Comprar | Pagamento que falhou | `payment_failed` por `payment_attempted` |
| Responder a um pedido (loja) | Resposta que o Snuffle não consegue ler | `shop_replied` inválida por `shop_asked` no WhatsApp; mensagens por resposta resolvida ao lado |
| Entregar no balcão (loja) | Código não aceito | `collection_code_rejected` por `order_collected` |

## Nuances

Um pedido recorrente ("pão toda sexta") gera uma compra por semana sem um novo pedido. Cada semana é um ciclo do mesmo pedido, e os eventos de pedido levam `cycle` (1 num pedido avulso). Os ciclos seguintes ficam fora da tarefa de pedir e fora do relógio de 10 minutos de resposta. `keep_looking_set` dispara sempre que um pedido passa a se repetir, com origem ask quando o comprador diz isso na primeira mensagem.

Keep looking dura dias. Os tempos dele são relatados à parte dos pedidos com prazo no mesmo dia.

Uma divisão transforma uma mensagem em dois pedidos. `snuffle_question_answered` (tipo split) registra se ela foi aceita e os ids dos pedidos que gerou. A tarefa de pedir conta por mensagem; atendimento e conversão contam por pedido.

Not found é um estado vivo. `request_not_found` dispara quando todas as lojas consultadas disseram não ou não responderam; o pedido continua aberto para Ask further away e Keep looking, e só `request_closed` o termina.

Uma resposta parcial ("Has 1 of 2"), algo parecido e uma resposta de mais longe só são sucesso se o comprador comprar. Cada resposta registra seu resultado para que os três possam ser separados.

Todo tempo é dividido por origem (consultada ou conectada), já que um caixa responde na hora.

## Taxonomia de eventos

Os nomes seguem objeto_ação no passado, em inglês. Eventos "Serviço" são registros que o backend guarda para funcionar (pedidos, respostas, compras, pagamentos). Eventos "App" são analytics do app do comprador e precisam de consentimento.

Todo evento leva `event_id`, `ts` (UTC), `user_id` (um id pseudônimo aleatório, nunca um email ou telefone), `session_id`, `platform`, `app_version` e `area` (o distrito postal de onde o pedido foi feito, como W14), mais `request_id`, `order_id` e `shop_id` quando se aplicam. Eventos de pedido levam `cycle`. Todo evento payment_* e order_* leva `source` (consultada ou conectada) e `fulfilment`; os eventos payment_* levam também `answer_id` e `attempt`. Cada comprador tem um atributo, guardado com o id pseudônimo e registrado quando entra: trabalha no horário das lojas, sim ou não (H7).

### Explorar e lojas

| Evento | Tipo | Dispara quando | Propriedades principais |
| --- | --- | --- | --- |
| `app_opened` | App | O app vem para o primeiro plano | origem: ícone, notificação, link |
| `area_changed` | App | O comprador confirma um lugar ou raio | tipo de lugar: atual, salvo, buscado; raio em minutos |
| `nearby_viewed` | App | O Nearby aparece | número de lojas abertas, raio |
| `category_opened` | App | Um tipo é tocado | tipo |
| `shop_opened` | App | A página de uma loja abre | id da loja, origem: tile, categoria, resposta, compra, mapa |
| `shop_action_tapped` | App | Directions ou Call na página da loja. Ask dispara só `ask_started` | ação |

### Pedir

| Evento | Tipo | Dispara quando | Propriedades principais |
| --- | --- | --- | --- |
| `ask_started` | App | A barra de pedido recebe foco ou uma sugestão é tocada | origem: barra, sugestão, página da loja, chip de categoria |
| `message_sent` | App | O comprador envia uma mensagem ao Snuffle | etapa: ask, question, chat |
| `request_created` | Serviço | O Snuffle confirma o pedido | tipo, número de itens, quantidade, prazo em minutos ou nenhum, retirada ou entrega, raio, canal: app, WhatsApp, assistente, recorrente: sim ou não |
| `snuffle_question_shown` | Serviço | O Snuffle pergunta algo | tipo: falta algo, dividir, retirada ou entrega, notificações |
| `snuffle_question_answered` | Serviço | O comprador responde | tipo; como: chip ou digitado; numa divisão, aceita e os ids dos pedidos gerados |
| `message_unmatched` | Serviço | O Snuffle não reconhece uma mensagem | etapa: ask, question, chat |

### Lojas e respostas

| Evento | Tipo | Dispara quando | Propriedades principais |
| --- | --- | --- | --- |
| `shop_asked` | Serviço | A consulta é entregue a uma loja | canal: WhatsApp ou caixa, aberta agora, anel |
| `shop_seen` | Serviço | O WhatsApp informa que a mensagem foi lida | segundos desde a consulta |
| `shop_replied` | Serviço | Uma vez por loja e pedido, quando o Snuffle leu a resposta como uma resposta válida ou desistiu de ler | resultado: tem, tem parte, parecido, não tem, pode fazer; válida; mensagens; minutos até responder em horário aberto |
| `shop_timed_out` | Serviço | Nenhuma resposta válida até um marco | marco: 10 minutos ou prazo |
| `answer_received` | Serviço | Uma resposta chega ao pedido, de uma resposta válida ou de um caixa | origem; resultado; segundos desde o pedido; ordem de chegada |
| `answer_viewed` | App | Um cartão de resposta está na tela | posição, origem |
| `answer_dismissed` | App | No thanks | resultado |
| `answer_restored` | App | Undo depois de No thanks | nenhuma |
| `request_opened` | App | Uma tela do pedido aparece | tela: conversa, detalhes, pagamento |
| `request_left` | App | Essa tela sai ou o app vai para segundo plano | tela; segundos |
| `request_widened` | Serviço | Ask further away | anel |
| `request_not_found` | Serviço | Todas as lojas consultadas disseram não ou não responderam | número de nãos, número sem resposta |
| `keep_looking_set` | Serviço | Um pedido passa a Keep looking, uma vez ou repetido | origem: ask, chat, not found; recorrente: sim ou não; dias |
| `request_closed` | Serviço | O pedido termina sem uma compra aberta | motivo: comprador, prazo com respostas, prazo sem respostas, busca expirada; comprou em outro lugar: antes do primeiro sim, depois dele, não, não perguntado (informado pelo comprador depois, H4) |

### Comprar e pagar

| Evento | Tipo | Dispara quando | Propriedades principais |
| --- | --- | --- | --- |
| `buy_tapped` | App | Buy na sheet de detalhes | quantidade |
| `payment_attempted` | Serviço | O comprador confirma na sheet de pagamento | método: Apple Pay, Google Pay, cartão |
| `payment_cancelled` | App | A sheet de pagamento é fechada sem pagar | nenhuma |
| `payment_failed` | Serviço | O pagamento não passa | motivo: recusado, erro |
| `payment_authorised` | Serviço | O pagamento numa loja consultada é autorizado, ainda não cobrado | método |
| `payment_taken` | Serviço | O dinheiro é cobrado: na confirmação numa loja consultada, na hora numa conectada | valor em centavos de libra; quando: confirmação ou na hora |

### Compras

| Evento | Tipo | Dispara quando | Propriedades principais |
| --- | --- | --- | --- |
| `order_confirmed` | Serviço | Uma loja consultada confirma; a compra fica separada ou pronta para envio | segundos de loja aberta desde a autorização |
| `order_not_confirmed` | Serviço | Passam 10 minutos de loja aberta sem confirmação | nenhuma |
| `order_sold` | Serviço | Uma loja consultada diz que vendeu o item | nenhuma |
| `order_ready` | Serviço | A compra vira Ready (retirada) ou Paid (entrega): na confirmação numa loja consultada, no pagamento numa conectada | segundos desde o pagamento |
| `reminder_sent` | Serviço | O lembrete da véspera sai | dias restantes |
| `collection_code_opened` | App | O código é aberto em tela cheia | nenhuma |
| `collection_code_rejected` | Serviço | A leitura do código pela loja falha | nenhuma |
| `order_extended` | Serviço | O comprador estende uma vez | dias a mais |
| `order_cancelled` | Serviço | O comprador cancela para ter estorno | dias depois de pronto |
| `order_collected` | Serviço | A loja lê o código ou marca a compra | método: leitura ou tap; lugar: loja ou ponto; dias depois de pronto; minutos a pé (o tempo a pé mostrado, a partir do lugar do pedido) |
| `order_not_collected` | Serviço | A janela termina | nenhuma |
| `order_dispatched` | Serviço | A loja ou o entregador sai (On its way) | minutos desde pronto |
| `order_delivered` | Serviço | A loja ou o entregador marca como entregue | minutos desde pronto |

### Avaliações, lojas e guardrails

| Evento | Tipo | Dispara quando | Propriedades principais |
| --- | --- | --- | --- |
| `rating_prompt_shown` | App | O cartão Rate ou "How was [shop]?" aparece, uma vez por compra | nenhuma |
| `rating_submitted` | Serviço | Uma avaliação é enviada ou mudada; conta a mais recente de cada compra | para cima ou para baixo; tags; tem nota: sim ou não; edição: sim ou não |
| `rating_disputed` | Serviço | Uma loja contesta uma avaliação | sinal |
| `refund_issued` | Serviço | O dinheiro volta | valor em centavos de libra; motivo: cancelada, não retirada, contestação |
| `complaint_opened` | Serviço | Um comprador ou uma loja procura o suporte | assunto |
| `notification_sent` | Serviço | O Snuffle manda uma notificação push | tipo: resposta, confirmada, lembrete, não encontrado, avaliar |
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

No concierge feito à mão, a planilha de registro usa os mesmos nomes de eventos, identifica os compradores como S1 a S20 e as lojas por id, e não guarda telefones. Compradores e lojas concordam em participar antes do primeiro pedido.

A [camada de medição](../develop/ideation/app-flow.md) no canvas App flow coloca cada tarefa e evento nas telas onde acontecem. Ela é conferida contra esta página por `python3 scripts/build_measurement_layer.py`.
