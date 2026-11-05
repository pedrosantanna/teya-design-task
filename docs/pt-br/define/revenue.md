# Receita

Como o produto ganha dinheiro, escrito como hipóteses. O conceito responde aos problemas de quem compra e do lojista, e também precisa se pagar. Trabalho com um cenário: o concierge pertence a um provedor de pagamento com POS próprio, como a Teya. A receita vem dos pagamentos, de trazer lojas para a rede do provedor e do destaque pago.

```summary
Takeaways:
- A fonte principal são os pagamentos. Toda reserva, pedido pré-pago e entrega é paga no app, então o provedor processa uma compra que de outro jeito seria em dinheiro vivo ou na maquininha de outra empresa.
- O app também dá ao provedor um motivo para as lojas entrarem no seu POS: receber esses pagamentos e esses compradores. Cada loja nova traz todas as suas vendas, não só as do app.
- O destaque pago é a terceira fonte: posição paga na tela inicial e alcance além da rua da própria loja.
- Para um provedor de POS, o app agrega valor à rede inteira: mais compradores para as lojas que já usam o seu POS, o que faz o POS valer a pena de manter.
Call:
- Defini o cenário: um provedor de pagamento com POS próprio (decisão 023). Um app independente precisaria de comissão, e escolhi não explorar esse caminho.
- Descartei comissão sobre a venda. Os apps de delivery cobram 14–35% (F9), e é desse custo que as lojas independentes reclamam. A receita vem do pagamento e do destaque pago, que a loja pode desligar.
- Deixei por enquanto fora das hipóteses as duas fontes extras que o agente sugeriu.
AI:
- Eu defini as fontes de receita e o cenário de rede. Um agente as escreveu como hipóteses com testes na prova de conceito e sugeriu mais duas fontes, listadas no fim.
Trade-offs:
- Listar só as lojas que estão no POS do provedor faz do app um motivo forte para entrar, e faz a rua parecer vazia no começo (partida a frio). Listar todas as lojas e pagar no app melhora a cobertura, e enfraquece o argumento da rede.
```

## Fontes

| Fonte | Como funciona | Hipótese |
| --- | --- | --- |
| Pagamentos no app | O comprador paga no app por uma reserva, um pedido pago antes ou uma entrega. O provedor processa o pagamento e ganha a sua taxa, inclusive em compras que antes eram em dinheiro vivo ou em outra maquininha | H12 |
| Lojas novas na rede | Uma loja que quer receber pagamentos e pedidos do app adota a conta de pagamento ou o POS do provedor. A partir daí, o provedor também processa as vendas de balcão da loja | H13 |
| Valor da rede de POS | As lojas no POS do provedor recebem compradores do app. Isso aumenta as vendas delas, então vale a pena manter o POS e recomendá-lo | H14 |
| Destaque pago | Uma loja paga para aparecer na tela inicial ("Open near you", "New nearby") ou para alcançar compradores além da própria rua, por exemplo uma loja da Goldhawk Road mostrada a quem está em volta da Blythe Road | H15 |
| Alcance por Londres | Um comprador compra de uma loja mais distante porque ela é a única com o item e ele pode pagar antes. É isso que faz o alcance pago valer a compra | H16 |

## Cenário de rede

Trato isto como um cenário hipotético: o concierge faz parte do ecossistema de um provedor de POS. Há duas versões possíveis.

- **Só a rede.** Só as lojas no POS do provedor aparecem e respondem a pedidos. O app é um benefício do POS e um motivo para outras lojas entrarem. A rua parece pouco povoada até que lojas suficientes entrem.
- **Aberto, pago pela rede.** Qualquer loja pode responder, e todo pagamento passa pelo provedor. A cobertura é melhor desde o começo, e entrar no POS vira o upgrade (repasses mais rápidos, integração com o POS, respostas na hora a partir do estoque do caixa).

Na prova de conceito começo pela versão aberta, porque as hipóteses precisam de lojas suficientes respondendo (H1), e registro quais lojas já usam o POS do provedor para poder comparar as duas versões.

## Outras fontes que eu consideraria

- **Uma taxa de agendamento na entrega.** O comprador paga uma taxa fixa quando o concierge agenda um entregador, com uma margem sobre o preço do entregador. Depende de os compradores aceitarem uma taxa de entrega para lojas locais (H7).
- **Dados de demanda pagos.** O resumo semanal da demanda é gratuito; uma versão paga traria detalhe por hora, por item e em comparação com o resto da rua. Depende de as lojas darem valor ao resumo gratuito primeiro (H9).

As duas ficam fora das hipóteses até a prova de conceito dizer se as condições delas se confirmam.

Coloquei números nessas fontes na [estimativa de receita](revenue-estimate.md): lojas, compradores, GMV e receita em três cenários.
