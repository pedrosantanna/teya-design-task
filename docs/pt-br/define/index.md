# Conceito

Um concierge da high street, a rua comercial do bairro, com quem o comprador fala numa conversa só. Você diz do que precisa, onde e até quando. Se o caixa de uma loja já compartilha o estoque, ele responde na hora; se não, pergunta às lojas que provavelmente têm o item e volta dizendo quem tem, se guarda para você e se entrega. Você compra na mesma conversa e retira na loja ou recebe em casa. Por trás da conversa, vários agentes dividem o trabalho.

```summary
Takeaways:
- O conceito responde à dor mais forte do Discover, não saber antes de sair de casa (A1), com uma confirmação da própria loja.
- Ele começa pela findability. A transaction (comprar, depois retirar ou receber) fecha o ciclo e é onde aparece o outro problema do brief.
- Escolhi um agente por quatro motivos: uma conversa só para várias tarefas, a espera resolvida no lugar do comprador, agir depois em nome dele e alcance além de um app. Os quatro são hipóteses minhas; o Discover tem pouca evidência sobre eles.
- Tudo depende de as lojas responderem rápido. Nenhum lojista aparece na evidência, então é a primeira coisa a testar.
Call:
- Escrevi o conceito depois do Discover e o escolhi porque um fluxo só atende a busca urgente do Sam e a necessidade da Jess de comprar fora do horário das lojas (decisão 017).
- Fiz do concierge um agente e escolhi o app como protótipo, onde o concierge pode ser a versão mais focada de si mesmo. WhatsApp e outros assistentes são canais para depois (decisão 018).
- Limitei esta entrega ao lado de quem compra. Como uma loja recebe e responde um pedido é suposição, por exemplo pelo app de lojista do provedor de pagamento ou pelo WhatsApp.
AI:
- Eu escrevi o conceito e os motivos para um agente. Um agente conferiu cada parte com a evidência do Discover e escreveu os trade-offs e os riscos abaixo.
Trade-offs:
- Uma resposta do concierge leva minutos, e uma resposta na hora precisa de dados de caixa que a maioria dos independentes não tem (F8). O conceito aceita a espera, mantém o comprador informado durante ela e usa os dados de caixa como atalho onde eles existem.
- A Ruth não é atendida. Deixá-la de fora é uma escolha minha de escopo: o conceito segue as necessidades do Sam e da Jess. A persona dela veio de três posts online, então o canal que ela preferiria e até que ponto adotaria uma ferramenta digital são perguntas em aberto (A13). Um canal no WhatsApp é o mais perto que o conceito chega dela.
```

<div class="dg dg-chain dg-hub"><div class="dg-box"><b>Compradores na área</b><div class="dg-list"><span>Sam: óculos para eclipse até as 16h</span><span>Jess: um pão de fermentação natural que ela possa retirar depois das 18h</span><small>e todo outro pedido por perto</small></div></div><div class="dg-arrow is-both">pedido · respostas</div><div class="dg-box"><b>Snuffle</b><div class="dg-list"><span>Entende o pedido</span><span>Escolhe as lojas prováveis e pergunta a todas de uma vez</span><span>Traz cada resposta, com a fonte indicada</span></div></div><div class="dg-arrow is-both">pergunta · resposta</div><div class="dg-box"><b>Lojas ao alcance</b><div class="dg-list"><span>Broadway Chemist <span class="dg-tag">Caixa</span></span><span>Paper &amp; Co <span class="dg-tag">WhatsApp</span></span><span>Rossi's Bakery <span class="dg-tag">WhatsApp</span></span></div></div></div>

## Como funciona

1. **Pedir.** O comprador diz do que precisa, onde (aqui, ou onde vai estar) e até quando: "óculos para eclipse hoje perto de Hammersmith". Ele também pode pedir com antecedência ("me avisa quando a padaria tiver pão de centeio") e deixar o pedido com o concierge. Explorar lojas e categorias continua disponível para quando não há um item específico em mente.
2. **Resposta na hora, quando dá.** Se o caixa de uma loja próxima compartilha o estoque por item, o concierge responde na hora com a loja, o preço e o horário de funcionamento.
3. **Concierge, quando não dá.** Fora isso, ele avisa que não enxerga o estoque e pergunta às lojas prováveis ao mesmo tempo. Enquanto espera, mantém o comprador informado, amplia a busca se o prazo apertar e verifica a entrega.
4. **Escolher e comprar.** O comprador escolhe uma loja e toca em Buy, com retirada ou a entrega da loja, sem sair da conversa.
5. **Retirar ou receber.** Retirada na loja, dentro de uma janela que a loja aceitou, ou entrega. Para quem trabalha no horário das lojas, pagar antes só ajuda se houver uma forma de retirar depois do trabalho: um horário mais tarde numa loja que fecha tarde o bastante, um ponto de retirada na rua que fica aberto (uma loja que abre até mais tarde ou um armário), ou entrega à noite. As três são suposições, testadas na H6.
6. **Depois.** O concierge acompanha o resultado e mantém os pedidos recorrentes abertos. Cada pedido vira um sinal para as lojas próximas: o que as pessoas em volta estão procurando, inclusive o que elas não tinham.

O [blueprint de serviço](blueprint.md) mostra cada etapa passando pelo comprador, pelo concierge, pelos agentes por trás dele e pela loja.

## Dois tipos de loja

- **Lojas conectadas.** O POS da loja compartilha o estoque por item. O concierge responde na hora ("In stock now"), e o pagamento é cobrado na hora, com o POS marcando o item como separado.
- **Lojas consultadas.** Sem dados de estoque. O concierge pergunta à loja pelo WhatsApp, ou pelas mensagens do POS quando ele tem, e a loja responde do jeito dela. A resposta da loja confirma que ela separou o item.

As duas aparecem na mesma lista de respostas, marcadas pela origem da resposta. A maioria das independentes pequenas começa como loja consultada (A14).

## Formas de levar

| Forma | Pago | Guardado por | Quem entrega |
| --- | --- | --- | --- |
| Comprar e retirar | Sim. Lojas conectadas cobram na hora; nas consultadas o valor é autorizado e cobrado quando a loja confirma | Cada loja define o prazo: 7 dias no padrão, ou 14 ou 30, e o mesmo dia ou o seguinte para perecíveis (padaria, açougue, floricultura); uma prorrogação do mesmo tamanho; reembolso automático se ninguém retirar. O comprador vê a data Collect by e não escolhe um dia | A loja, no balcão, ou um ponto de retirada |
| Pagar e a loja entregar | Sim | Não fica guardado: a loja envia com a entrega ou o entregador dela | A entrega da loja; o concierge só acompanha o status |

Os prazos vêm de como as lojas do Reino Unido guardam pedidos para retirada ([pesquisa documental](../discover/high-street-landscape.md)): uma semana é o normal para pedidos pagos. A entrega pela loja está mapeada, não desenhada: o concierge mostraria "enviado", "a caminho" e "entregue" a partir das atualizações da loja (decisões 030 e 037).

Não existe reserva sem pagamento (decisão 032). Quem não quer pagar vai sem comprar e pode encontrar o item vendido; o concierge avisa. A reserva sem pagamento existia por comodidade e por causa do dinheiro, mas o pagamento acontecia fora do app e a loja ficava com o risco de a pessoa não aparecer.

## Área

O concierge trabalha a partir de onde o comprador está, ou vai estar, e procura até onde ele consegue chegar antes do prazo. As high streets, as ruas comerciais do bairro, agrupam lojas para explorar e para o destaque pago; elas não limitam a busca. Uma loja entra no escopo se é pequena, independente e está ao alcance, numa high street ou numa fileira de lojas. A maioria das pequenas lojas independentes fica em high streets, então na prática as duas coisas quase sempre coincidem.

Os wireframes usam um comprador na Blythe Road, W14. Distâncias a pé a partir dali, medidas no OpenStreetMap a 4,8 km/h:

| Anel | Ruas comerciais | A pé |
| --- | --- | --- |
| Na porta de casa | As lojas da própria Blythe Road | Menos de 5 min |
| Até 15 minutos | Shepherd's Bush Road, Shepherd's Bush Green e Uxbridge Road, Hammersmith Broadway, Kensington High Street (lado do Olympia), Goldhawk Road, King Street | 9 a 13 min (0,7 a 1,1 km) |
| De 15 a 25 minutos | Holland Park Avenue, Askew Road | 21 a 22 min |
| Ônibus, metrô ou entrega | Mercado da North End Road, Kensington High Street (centro), Chiswick High Road | 32 a 39 min |

Seis ruas comerciais ficam a menos de 15 minutos a pé. Prender o comprador a uma delas esconderia as outras cinco, e numa rua nova com poucas lojas a primeira busca voltaria vazia. O prazo define o anel: para o prazo das 16h do Sam, o concierge consulta os dois primeiros anéis e verifica a entrega a partir do terceiro.

## Por que um agente

Um agente é a minha principal hipótese para este produto. O concierge é esse agente: aquele com quem o comprador conversa e a interface do produto, seja no app, no WhatsApp ou como um servidor MCP para o assistente de IA do próprio comprador. Por trás dele, vários agentes dividem o trabalho. Espero quatro coisas desse arranjo.

- **Uma interface para várias tarefas.** Buscar, perguntar às lojas, comprar e combinar a entrega acontecem na mesma conversa, sempre do mesmo jeito. Espero que isso seja mais simples de aprender do que uma tela para cada tarefa.
- **A espera resolvida no lugar do comprador.** As lojas são lentas e difíceis de alcançar. O concierge pergunta a várias de uma vez, continua procurando enquanto elas respondem e verifica a entrega nesse meio-tempo, e o comprador não precisa correr atrás de contatos nem ficar esperando uma resposta só.
- **Agir depois.** O comprador pode deixar um pedido com antecedência, e o concierge age quando chega uma resposta ou o item entra no estoque.
- **Sem depender de um app.** O mesmo concierge pode morar no WhatsApp ou se conectar ao assistente de IA do próprio comprador por MCP. O app é onde ele ganha uma interface focada, feita para esse trabalho.

## O que a evidência sustenta

| Parte do conceito | Evidência do Discover | Força |
| --- | --- | --- |
| Perguntar antes de sair | A1 (Alto): as pessoas não conseguem saber sem ir, e hoje perguntam a desconhecidos no Reddit e no WhatsApp | Forte |
| Informação confiável sobre disponibilidade | A10 (Médio): disponibilidade errada é a reclamação mais repetida, então os compradores precisam de informação em que possam confiar. Se a resposta de uma loja vale mais que o estoque informado é a H5 | Média |
| Rapidez para necessidades urgentes | A4 (Médio): quando é urgente, uma loja perto ganha do online, se a resposta chegar a tempo | Média |
| Perguntar a várias lojas de uma vez | Indireta: idas perdidas e ligações para várias lojas nos posts do Sam (A1). Nada sobre se os compradores aceitam a espera | Fraca |
| Reservar e retirar fora do horário | A6 (Baixo): dois posts da Jess mostram o horário das lojas batendo com o trabalho; A7 (Baixo), que isso a traria de volta, não foi testada | Fraca |
| Um agente como entrada principal | Um post: uma compradora perguntou a um chatbot de IA no X qual loja tinha um item (@Jojo_agboola). Nada além disso | Fraca |
| Uma conversa só para várias tarefas | Nenhuma evidência. Hipótese minha | Nenhuma |
| Pedidos deixados com antecedência | Nenhuma evidência | Nenhuma |
| Canais além do app (WhatsApp, outros assistentes) | Indireta: as pessoas já perguntam em grupos de WhatsApp e no Reddit (A1). Nada sobre usar um concierge lá | Fraca |
| Lojas respondendo a pedidos | Nenhuma evidência. Nenhum lojista aparece no material (perguntas em aberto 1 a 6) | Nenhuma |
| Sinal de demanda como valor para as lojas | Nenhuma evidência | Nenhuma |
| Pagamento na conversa | F5 e F6: cartão e carteira digital para a maioria dos compradores; links de pagamento já existem sem site (benchmarks) | Forte para viabilidade |

## Tipos de disponibilidade

O conceito trabalha com três tipos de disponibilidade. O estoque informado vem de um caixa ou de uma listagem: pode sair na hora, e só é tão bom quanto os registros da loja. Uma confirmação recente é um lojista dizendo que tem há poucos minutos. Um item separado fica guardado para o comprador, então não pode ser vendido antes de ele chegar. O caminho do caixa, com resposta na hora, dá o estoque informado, um tipo de certeza diferente do de uma reserva, por isso o concierge ainda pode oferecer uma reserva depois de uma resposta do caixa. Se os compradores confiam mais numa confirmação do que no estoque informado é a H5.

## Suposições que este conceito acrescenta

O brief pede que o que falta seja suposto e registrado.

- **Lado da loja.** As lojas recebem os pedidos numa ferramenta que já abrem durante o dia e respondem em menos de dez minutos enquanto estão abertas. Elas aceitam guardar um item comprado pelo prazo que definem: uma semana no padrão, mais se quiserem, um dia ou menos para perecíveis (decisões 030 e 037).
- **Pagamento.** Numa loja conectada o pagamento é cobrado na hora, porque o POS tem o estoque. Numa loja consultada o valor é autorizado e cobrado quando a loja responde que separou o item; se ela não responder em 10 minutos, a autorização caduca e o comprador é avisado (decisão 037).
- **Depois do trabalho.** Quem trabalha no horário das lojas retira num horário mais tarde numa loja que fecha tarde o bastante, num ponto de retirada na rua, ou recebe uma entrega à noite. Quem entrega, onde e quando está no [blueprint](blueprint.md).
- **Agentes.** Agentes separados para estoque, seleção de lojas, contato com as lojas, pagamento e entrega trabalham por trás de um concierge só. Quando o estoque é desconhecido, o concierge pergunta à loja e nunca chuta.
- **A quem perguntar.** O agente de seleção de lojas sabe quais lojas ao alcance vendem que tipo de coisa (por listagens públicas e categorias), mesmo sem dados de estoque.
- **Área.** A localização e o prazo do comprador definem até onde o concierge procura. As high streets são uma forma de agrupar lojas, e não um limite.
- **Dados.** Dados de caixa com detalhe por item existem para uma minoria das lojas e são usados onde existem; todo o resto vira uma pergunta à loja.
- **Canais.** O app vem primeiro. O WhatsApp e uma conexão MCP para outros assistentes reaproveitam os mesmos agentes depois.
- **Logística.** A retirada é o padrão. A entrega usa um entregador que a loja ou o concierge chama, uma loja por vez; uma cesta com várias lojas fica fora do escopo do protótipo.
- **Modelo de negócio.** O concierge pertence a um provedor de pagamento com POS próprio. A receita vem dos pagamentos feitos no app, das lojas que entram na rede do provedor e do destaque pago, sem comissão sobre a venda. Veja [valor e receita](revenue.md).

## Riscos

- **Tempo de resposta.** Uma resposta do concierge que leva 20 minutos é lenta demais para o prazo do Sam e incerta demais para uma compra rápida.
- **Carga sobre as lojas.** Cada pergunta vai para várias lojas. Perguntas demais, ou perguntas que não viram venda, e elas param de responder.
- **Partida a frio.** O concierge só funciona se lojas suficientes de uma rua responderem. Poucas lojas, poucas respostas, nenhuma confiança.
- **Respostas erradas.** Uma loja que diz que tem e não tem gasta a confiança em que o conceito se apoia (A10). Um agente que chuta ou entende mal o pedido também.
- **Faltas.** Uma loja separa um item e o comprador não aparece. Pagar antes reduz isso e acrescenta atrito.
- **Regras do canal.** Passadas 24 horas da última mensagem da pessoa, o WhatsApp só deixa uma empresa escrever para ela com modelos pré-aprovados, o que limita os acompanhamentos e os pedidos recorrentes por lá.

A [proposta de valor](value-proposition.md) confronta isso com os perfis de cliente, o [blueprint de serviço](blueprint.md) mostra quem faz o quê, e [hipóteses](hypotheses.md) transforma a evidência fraca ou ausente em testes.
