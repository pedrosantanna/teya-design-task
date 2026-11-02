# Conceito

Um app para quem compra, com um agente que funciona como concierge da high street, a rua comercial do bairro. Você diz do que precisa. Se o caixa de uma loja já compartilha o estoque, o agente responde na hora; se não, ele pergunta às lojas que provavelmente têm o item e volta dizendo quem tem, se segura para você e se entrega. Você reserva ou paga no app e retira na loja ou recebe em casa.

```summary
Takeaways:
- O conceito responde à dor mais forte do Discover, não saber antes de sair de casa (A1), com uma confirmação da própria loja.
- Ele começa pela findability. A transaction (reservar, pagar, retirar ou receber) fecha o ciclo e é onde aparece o outro problema do brief.
- Tudo depende de as lojas responderem rápido. Nenhum lojista aparece na evidência, então é a primeira coisa a testar.
Call:
- Escolhi este conceito depois do Discover. Ele atende a busca urgente do Sam e a necessidade da Jess de comprar fora do horário das lojas com um fluxo só.
- Esta entrega cobre só o lado de quem compra. Como uma loja recebe e responde um pedido é suposição, por exemplo pelo app de lojista do provedor de pagamento ou por mensagem.
AI:
- Um agente conferiu cada parte do conceito com a evidência do Discover e escreveu os trade-offs e os riscos em aberto abaixo. O conceito eu escrevi.
Trade-offs:
- Uma resposta do concierge leva minutos, e uma resposta na hora precisa de dados de caixa que a maioria dos independentes não tem (F8). O conceito aceita a espera e usa os dados de caixa como atalho onde eles existem.
- A Ruth fica de fora: ela não posta e provavelmente não usaria um app (A13).
```

## Como funciona

1. **Perguntar ou explorar.** O comprador escolhe um local (aqui, ou onde vai estar) e pergunta ao agente ("óculos para eclipse hoje perto de Hammersmith") ou explora lojas e categorias por perto. O agente é a entrada principal; explorar serve para quando não há um item específico em mente.
2. **Resposta na hora, quando dá.** Se o caixa de uma loja próxima compartilha o estoque por item, o agente responde na hora com a loja, o preço e o horário de funcionamento.
3. **Concierge, quando não dá.** Fora isso, o agente avisa que não enxerga o estoque e pergunta às lojas com mais chance de ter o item. Cada loja responde do seu jeito: tem, segura até tal hora, entrega.
4. **Escolher e pagar.** O comprador escolhe uma loja e reserva, paga para segurar ou pede entrega, no app.
5. **Retirar ou receber.** Retirada na loja, dentro de uma janela que a loja aceitou, ou entrega.
6. **Demanda para a loja.** Cada pedido vira um sinal para as lojas próximas: o que as pessoas em volta estão procurando, inclusive o que elas não tinham.

## O que a evidência sustenta

| Parte do conceito | Evidência do Discover | Força |
| --- | --- | --- |
| Perguntar antes de sair | A1 (Alto): as pessoas não conseguem saber sem ir, e hoje perguntam a desconhecidos no Reddit e no WhatsApp | Forte |
| Uma confirmação da própria loja | A10 (Médio): disponibilidade errada é a reclamação mais repetida, então uma resposta humana da loja vale mais que um número publicado | Média |
| Rapidez para necessidades urgentes | A4 (Médio): quando é urgente, uma loja perto ganha do online, se a resposta chegar a tempo | Média |
| Reservar e retirar fora do horário | A6 (Médio) diz que o horário afasta a Jess; A7 (Baixo), que isso a traria de volta, não foi testada | Fraca |
| Um agente como entrada principal | Um post: uma compradora perguntou a um chatbot de IA no X qual loja tinha um item (@Jojo_agboola). Nada além disso | Fraca |
| Lojas respondendo a pedidos | Nenhuma evidência. Nenhum lojista aparece no material (perguntas em aberto 1 a 6) | Nenhuma |
| Sinal de demanda como valor para as lojas | Nenhuma evidência | Nenhuma |
| Pagamento no app | F5 e F6: cartão e carteira digital para a maioria dos compradores; links de pagamento já existem sem site (benchmarks) | Forte para viabilidade |

## Suposições que este conceito acrescenta

O brief pede que o que falta seja suposto e registrado.

- **Lado da loja.** As lojas recebem os pedidos numa ferramenta que já abrem durante o dia e respondem em menos de dez minutos enquanto estão abertas. Elas aceitam segurar um item por algumas horas.
- **A quem perguntar.** O agente sabe quais lojas próximas vendem que tipo de coisa (por listagens públicas e categorias), mesmo sem dados de estoque.
- **Dados.** Dados de caixa com detalhe por item existem para uma minoria das lojas e são usados onde existem; todo o resto vira uma pergunta à loja.
- **Logística.** A retirada é o padrão. A entrega usa um entregador que a loja ou o app chama, uma loja por vez; uma cesta com várias lojas fica fora do escopo do protótipo.
- **Modelo de negócio.** Não decidido neste take-home. As opções incluem comissão, promoção paga para as lojas, ou o app como forma de um provedor de pagamento atrair lojas.

## Riscos

- **Tempo de resposta.** Uma resposta do concierge que leva 20 minutos é lenta demais para o prazo do Sam e incerta demais para uma compra rápida.
- **Carga sobre as lojas.** Cada pergunta vai para várias lojas. Perguntas demais, ou perguntas que não viram venda, e elas param de responder.
- **Partida a frio.** O concierge só funciona se lojas suficientes de uma rua responderem. Poucas lojas, poucas respostas, nenhuma confiança.
- **Respostas erradas.** Uma loja que diz que tem e não tem gasta a confiança em que o conceito se apoia (A10). Um agente que chuta também.
- **Reservas e faltas.** Uma loja segura um item e o comprador não aparece. Pagar para segurar reduz isso e acrescenta atrito.

A [proposta de valor](value-proposition.md) confronta isso com os perfis de cliente, e [hipóteses](hypotheses.md) transforma a evidência fraca ou ausente em testes.
