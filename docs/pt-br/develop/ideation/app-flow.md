# Fluxo do app

O fluxo principal do app de quem compra em wireframes, da tela inicial até a retirada do item, com os caminhos para quando algo falha. Ele segue o [blueprint de serviço](../../define/blueprint.md), etapas 1 a 5, com as respostas das lojas simuladas. As telas usam o kit de iOS da Apple em preto e branco; o design visual vem depois.

```summary
Takeaways:
- O concierge destas telas é o próprio agente: o app é uma das formas de chegar a ele, ao lado do WhatsApp e do MCP. Os balões de chat marcados como Concierge são as respostas do agente.
- A tela inicial funciona como a do Granola: conteúdo da rua em cima e uma barra de pedido grande embaixo, que abre o concierge. Não há barra de abas.
- Depois de fazer um pedido, o comprador pode sair do app. As respostas das lojas chegam como notificações e numa Live Activity, e cada resposta aparece no chat assim que chega.
- A loja confirma a reserva antes de o Apple Pay aparecer, então o pagamento só acontece para um item que foi mesmo separado.
Call:
- Padrões nativos de iOS primeiro (decisão 021): títulos grandes, sheets, Apple Pay, Live Activities.
- Módulos da tela inicial, de cima para baixo: pedido em andamento, compras recentes, lojas em destaque, novidades por perto, categorias. A ordem vem das referências do Mobbin abaixo.
AI:
- Um agente analisou telas iniciais bem resolvidas no Mobbin (Granola, Shop, Deliveroo, Uber Eats, Wolt, Too Good To Go, Airbnb, ChatGPT, Perplexity) e propôs a ordem dos módulos. Outro agente desenhou os wireframes a partir do blueprint. Eu defini a estrutura: a barra de pedido embaixo, o menu do avatar e as telas do fluxo.
Trade-offs:
- Colocar o concierge numa barra embaixo não deixa espaço para uma barra de abas, então pedidos, compras e ajustes ficam atrás do menu do avatar.
- Wireframes no site da documentação são rápidos de mudar e fáceis de ligar ao blueprint, mas não rodam num celular.
```

## Referências

| App | O que eu peguei |
| --- | --- |
| Granola | Uma barra de pedido flutuante embaixo como a principal porta de entrada |
| Deliveroo, Uber Eats | Um pedido em andamento com o horário de chegada ou de retirada como título, e uma barra recolhida do pedido acima do resto do conteúdo |
| Too Good To Go | Janela de retirada em cada cartão, avatar da loja sobre a foto, "Local heroes" como módulo editorial |
| Wolt | Cartões de loja com o logo como imagem e horário de abertura, distância e retirada numa linha só |
| Shop | Linhas "Ordered on…" com a opção de comprar de novo, e respostas do assistente que misturam texto com carrosséis de lojas |
| Airbnb | Títulos de seção com uma seta, e "Nearby" como a primeira sugestão |

As capturas ficam fora do repositório público porque são telas de terceiros.
