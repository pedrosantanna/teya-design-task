# Protótipo

O app do comprador rodando no navegador, a partir do mesmo código Expo que roda no iPhone e no Android. O conteúdo é simulado; as lojas respondem por um roteiro. Aperte D, ou o botão no canto superior direito, para abrir o state debugger, um painel encaixado à direita do celular, e trocar a persona, a plataforma, o passo da jornada e o estado de cada pedido, resposta e compra.

```summary
Takeaways:
- Um app Expo só gera iOS, Android e esta versão web (decisão 038); a moldura troca entre um iPhone e um Pixel junto com a plataforma.
- O state debugger é um painel encaixado à direita do celular, em seções recolhíveis como o painel direito do Figma. Define persona (Sam ou Jess), plataforma, claro ou escuro, passo da jornada, os estados do modelo conceitual e o conjunto de conteúdo; o relógio da simulação pode ser pausado ou avançado.
- A jornada do Sam roda do começo ao fim: pedir, respostas chegando, comprar, esperar a loja, retirar; cada caminho de falha do app flow v7 está a um clique.
- Doze lojas inventadas em volta da Blythe Road carregam a jornada do demo, e cada uma vem de algo que ouvi na Descoberta; outras 30 preenchem o Nearby e as telas de Categoria, 42 no total.
Call:
- Pedi um protótipo que rodasse como app de verdade para o vídeo e como build web dentro destes docs, com um debugger para definir qualquer estado enquanto navego, e uma moldura de iPhone ou Android em volta.
- Pedi que toda tela passasse pelo revisor de telas antes de publicar; o que ele achou foi corrigido neste build.
- Pedi umas doze lojas usadas do mesmo jeito em todo lugar, com mais tipos de loja e fotos que parecessem fachadas de lojinhas britânicas.
AI:
- Agentes construíram a store e o debugger, os componentes do design system, as telas e a simulação a partir das changes do OpenSpec; outro agente revisou as telas rodando e um último corrigiu o que ele achou.
- Um agente rascunhou as doze lojas a partir dos arquivos da Descoberta, escolheu e conferiu as fotos do Unsplash e escreveu o roteiro do demo abaixo; os créditos das fotos ficam no código.
Trade-offs:
- O build web não mostra o glass nativo, os haptics nem as folhas de pagamento reais; eles são desenhados, e o vídeo usa o build de iOS.
- As fotos são de lojas reais em outros lugares da Grã-Bretanha e da Europa, então algumas mostram o nome de outra loja na placa.
```

Abra sozinho para usar a janela inteira: `app-web/index.html`. Em janelas mais estreitas que 800 px o painel aparece sobreposto, vindo da direita, com um botão de fechar, em vez de encaixado. O app abre no claro e só passa para o escuro quando o escuro é escolhido no seletor de tema da documentação ou no debugger. A página em volta do celular e o debugger sempre seguem o tema da documentação; o esquema do debugger muda só o app. O painel sempre começa fechado. Acrescente `?debug=1` para abri-lo no início, `?debug=0` para esconder o debugger, `?os=android` para Android, ou `?step=` para começar num passo.

O painel oferece só os controles que mudam a tela que está à mostra. Persona, plataforma, esquema, moldura, passo da jornada, relógio e ações estão sempre lá; os outros seguem a rota e as folhas abertas (Loading aparece em Nearby e nas páginas de loja, Shop hours na conversa só com a folha de detalhes aberta, os desfechos só onde um pagamento ou a resposta de uma loja pode acontecer em seguida). Cada seção termina com uma linha dizendo o que esconde, e uma seção sem nada a mudar se recolhe ao título com "No effect on this screen". As regras ficam em `app/src/debug/relevance.ts`.

## Conteúdo simulado

Todas as lojas são inventadas e ficam em volta da Blythe Road, W14. Os tempos a pé são a partir da Blythe Road; o lugar Trabalho (Kensington High St, W8) reaproveita a Olympia Cameras, a Abingdon Deli e a Church Street Books a 3, 4 e 9 minutos, além de sete das outras lojas abaixo. O acento segue o tipo da loja em `app/src/store/kinds.ts`. A Lavanda fica reservada ao Snuffle, então as lojas usam só Manteiga, Pêssego e Pistache; as 12 lojas do demo são quatro de cada. Uma loja conectada responde pelo caixa; uma loja consultada responde por mensagem (WhatsApp).

Toda foto do protótipo é uma foto real do Unsplash, escolhida por um agente e conferida na página dela no Unsplash (fotógrafo, perfil e página ficam guardados com ela em `app/src/content/images.ts`), depois baixada e embutida, então o app não faz nenhuma requisição ao Unsplash e nada é escolhido ao acaso. A foto de um pedido é uma delas: cada item do demo (óculos de eclipse, bolo de aniversário, pão de fermentação natural, ganchos para quadro, ventilador de mesa, buquê) tem a própria foto e mais cinco do mesmo item, e o comprador pode trocar entre as seis pela foto na barra da conversa. Um produto precisa ter as fotos adicionadas à mão; um item que o demo não conhece não tem nenhuma. Os créditos não aparecem no app.

| Loja | Tipo | Rua | A pé | Horário | Responde | Retirar em | Entrega | Acento |
|---|---|---|---|---|---|---|---|---|
| Blythe Road News | Banca, com balcão de correio | Blythe Road | 1 min | 7h–23h | Consultada | 7 dias | Não | Manteiga |
| Rossi's Bakery | Padaria | Blythe Road | 2 min | 7h–18h | Consultada | No mesmo dia; bolos pedem 2 dias de antecedência | Não | Manteiga |
| Brook Hardware | Ferragens | Shepherd's Bush Road | 8 min | 8h–17h30 | Consultada | 30 dias | £5, no dia seguinte | Manteiga |
| Brook Green Toys | Brinquedos | Shepherd's Bush Road | 9 min | 10h–18h | Consultada | 30 dias | Não | Pêssego |
| Goldhawk Butchers | Açougue | Goldhawk Road | 11 min | 8h–17h30 | Consultada | No dia seguinte | Não | Pêssego |
| Broadway Chemist | Farmácia | Hammersmith Broadway | 11 min | 8h–20h | Conectada | 7 dias | Não | Pistache |
| Olympia Cameras | Câmeras | Kensington High Street | 14 min | 10h–18h | Consultada | 14 dias | Não | Pêssego |
| Paper & Co | Papelaria | King Street | 13 min | 9h–19h | Consultada | 7 dias | £3,50, hoje | Pistache |
| Halo Florist | Floricultura | Goldhawk Road | 13 min | 8h–17h | Consultada | No mesmo dia | £6, hoje | Pistache |
| Bush Opticians | Ótica | Shepherd's Bush Green | 10 min | 9h–18h | Consultada | 14 dias | Não | Pistache |
| Abingdon Deli | Delicatéssen | Abingdon Road | 25 min | 8h–20h | Consultada | No mesmo dia | £4, hoje | Pêssego |
| Church Street Books | Livraria | Kensington Church Street | 28 min | 9h–19h | Conectada | 30 dias | Não | Manteiga |

O raio de 15 minutos mostra as dez primeiras lojas. Os tempos a pé vêm de trajetos reais a partir do 163 Blythe Road (decisão 063), e a delicatéssen e a livraria ficam a 25 e 28 minutos, mesmo além do raio de 20 minutos, então nenhuma lista do Nearby as mostra.

### Outras lojas

O Nearby e a tela de categoria também listam mais 30 lojas inventadas, para que cada categoria tenha de dois a quatro lugares a até 15 minutos a pé (os tempos vêm de trajetos reais, decisão 063); as 12 lojas acima carregam a jornada do demo, e as outras 30 nunca são consultadas nela. As peixarias ficam em Açougue, as lojas de plantas em Floricultura e a loja de jogos em Brinquedos; a Abingdon Deli passa para uma categoria Delicatéssen com o mesmo acento Pêssego. Cada uma tem horário, prazo de retirada, três itens com preço, avaliações e como se sai no Snuffle (`app/src/store/seed-more.ts`). O lugar Trabalho também lista sete delas. Cada uma tem uma foto de fachada ou de dentro, do Unsplash, embutida a 640 px, e oito têm uma segunda foto.

| Categoria | Loja | Rua | A pé | Responde | Observação |
|---|---|---|---|---|---|
| Padaria (Manteiga) | Brook Green Bread, padaria artesanal | Brook Green | 5 min | Consultada |  |
|  | Pastelaria Estrela, pastelaria portuguesa | Hammersmith Road | 10 min | Consultada |  |
|  | Sugar & Spoon Cakes, confeitaria de bolos | Shepherd's Bush Road | 10 min | Consultada | 3 dias de antecedência; entrega |
| Café (Pêssego) | The Blythe Café, café | Blythe Road | 3 min | Consultada |  |
|  | Yellow Door Coffee, cafeteria | Hammersmith Road | 10 min | Consultada | Nova |
|  | Grove Café, café | Brook Green | 9 min | Consultada |  |
| Delicatéssen (Pêssego) | Alimentari Bellini, empório italiano | North End Road | 12 min | Conectada |  |
|  | Hammersmith Cheese Room, queijaria | King Street | 12 min | Consultada | Entrega |
|  | Askew Road Deli, delicatéssen | Askew Road | 21 min | Consultada |  |
| Ferragens (Manteiga) | Heel & Key, chaveiro e sapateiro | Hammersmith Road | 10 min | Consultada |  |
|  | Hammersmith Paint & DIY, tintas e faça-você-mesmo | King Street | 14 min | Consultada | Entrega |
| Brinquedos e jogos (Pêssego) | Brook Green Games, loja de jogos | Shepherd's Bush Road | 10 min | Consultada |  |
|  | Little Bear Toys, loja de brinquedos | Holland Road | 10 min | Consultada | Nova |
| Açougue e peixaria (Pêssego) | Goldhawk Fish, peixaria | Goldhawk Road | 10 min | Consultada |  |
|  | Larkin & Sons Butchers, açougue orgânico | Askew Road | 22 min | Consultada | Cortes sob encomenda |
| Farmácia (Pistache) | Brook Green Pharmacy, farmácia independente | Brook Green | 4 min | Conectada |  |
|  | Hammersmith Health Foods, loja de produtos naturais | King Street | 15 min | Consultada |  |
| Câmeras (Pêssego) | Addison Cameras, loja de câmeras | Holland Road | 11 min | Consultada | Entrega |
|  | Silver Halide Film Lab, laboratório de filme | Uxbridge Road | 15 min | Consultada | Nova, sem avaliações |
| Papelaria (Pistache) | Quill & Ledger, papelaria | Hammersmith Road | 11 min | Conectada |  |
|  | Pigment Art Supplies, material de arte | Shepherd's Bush Road | 7 min | Consultada | Nova |
| Floricultura e plantas (Pistache) | Fern & Pot, loja de plantas | Brook Green | 6 min | Consultada | Nova, sem avaliações |
|  | Wild Stem Flowers, floricultura | North End Road | 13 min | Consultada | Entrega |
| Ótica (Pistache) | Clear View Opticians, ótica | Holland Road | 9 min | Consultada |  |
|  | King Street Opticians, ótica | King Street | 16 min | Consultada |  |
| Banca (Manteiga) | Brook Green News & Wine, mercadinho de esquina | Brook Green | 5 min | Consultada |  |
|  | Goldhawk Road Kiosk, banca de jornal | Goldhawk Road | 12 min | Consultada |  |
| Livros (Manteiga) | Riverside Books, livros novos | Hammersmith Road | 11 min | Conectada |  |
|  | Second Chapter Books, sebo | Shepherd's Bush Road | 7 min | Consultada |  |
|  | Panel Comics, quadrinhos | King Street | 17 min | Consultada | Nova |

### Itens e origens

| Loja | Três itens | De onde veio |
|---|---|---|
| Blythe Road News | Velas de aniversário £1,99, pilhas AA (4) £4,50, cartão de aniversário £2,95 | Uma pessoa que sempre compra alguma coisa na banca quando usa o balcão de correio (u/Aggravating-Desk4004, [achados](../discover/netnography/findings.md), seção 8). É também onde a Jess retira depois do horário. |
| Rossi's Bakery | Pão de fermentação natural £4,20, pão de centeio £4,50, bolo de aniversário £32 | Lojas que fecham quando as pessoas saem do trabalho (Agix, LividArse, [achados](../discover/netnography/findings.md), seções 2 e 3) e uma pâtisserie em Hammersmith cujo horário ninguém confiava (u/dy14n19, mesmo arquivo) |
| Brook Hardware | Ganchos para quadro (10) £2,49, ventilador de mesa £29,99, cópia de chave £5 | A Robert Dyas sem óculos de eclipse em duas filiais (u/moanyjoany), uma loja de ferragens sem estoque que encomendaria um (u/xmastreee) e a caça a um ar-condicionado portátil na onda de calor (u/akat224), tudo em [achados](../discover/netnography/findings.md) |
| Brook Green Toys | Trenzinho de madeira £24, lembrancinhas de festa £8, kit de ciências do sistema solar £15 | Nenhum post específico. Nas threads do eclipse, as pessoas perguntavam a qualquer loja que pudesse ter os óculos ([dimensões](../discover/netnography/dimensions.md)); a loja de brinquedos é a que não responde |
| Goldhawk Butchers | Costela bovina cortada sob encomenda £38, linguiças (6) £6,50, frango caipira £14 | Um açougue aberto só em horário comercial (u/killmetruck), um fechado no horário anunciado (Valentando), um que corta qualquer peça que você pedir (u/rising_then_falling) e açougues que fecharam (u/mjfh2), em [achados](../discover/netnography/findings.md) |
| Broadway Chemist | Óculos de eclipse £9,50, protetor solar FPS 50 £8,99, antialérgico £4,49 | Perguntar a um chatbot qual loja física tem um item (@Jojo_agboola, [achados](../discover/netnography/findings.md), seção 10) e estoque vindo do caixa (F8 na [conclusão](../discover/conclusion.md)) |
| Olympia Cameras | Cartões visores solares £6, filtro solar em folha £18, filme 35 mm £12,50 | As lojas práticas e especializadas de que as pessoas sentem falta, como a City Radio Stores (u/squeakyeggs, [achados](../discover/netnography/findings.md), seção 6) |
| Paper & Co | Óculos de eclipse £14,99, porta-retrato A4 £12, cartão de aniversário £3,50 | A corrida do eclipse perto de Hammersmith (u/grand_web, u/claudiav2603) e nenhum vendedor online entregando a tempo (u/WearyChampionship365), em [achados](../discover/netnography/findings.md) e [personas](../discover/personas/index.md) |
| Halo Florist | Buquê da estação £35, hastes avulsas £4, orquídea em vaso £22 | Flores num domingo à noite (premissa A4 na [conclusão](../discover/conclusion.md)) e floriculturas que vendem pelo Instagram e por mensagem ([benchmarks](../discover/benchmarks.md)) |
| Bush Opticians | Lentes solares de encaixe £25, kit de reparo de óculos £6, flanelas (3) £3 | As mesmas threads do eclipse: uma loja que as pessoas imaginam ter os óculos e não tem |
| Abingdon Deli | Azeite £9,50, café em grãos £8, cesta de legumes da estação £15 | O hortifrúti e a peixaria que sumiram de uma rua de comércio (u/Accomplished-Pen2660, [achados](../discover/netnography/findings.md), seção 6) |
| Church Street Books | Atlas de ruas de Londres £9,99, livro infantil do céu à noite £7,99, vale-livro £10 | A livraria sem site (Bookshop.org e Hive em [benchmarks](../discover/benchmarks.md)); livros têm ISBN, então ela pode responder pelo caixa |

Cada loja tem uma foto de fachada e uma ou duas fotos de dentro ou da vitrine, do Unsplash, embutidas a 800 px. Os créditos ficam em `app/src/content/images.ts` e não aparecem no app.

## Jornada do demo

O Sam é a persona padrão: precisa de óculos de eclipse, 2 pares, até as 16h de hoje (segunda, 2 de novembro). Cada passo é um passo da jornada no state debugger (`app/src/store/journey.ts`); `?step=` abre o protótipo nele.

| Passo | Hora | O que acontece |
|---|---|---|
| `home` | 13:01 | Nearby em volta da Blythe Road: Browse by category, Open near you e New near you, com Delivers nos tiles das lojas que entregam |
| `ask` | 13:02 | O Sam digita os óculos e um bolo para sábado numa mensagem só |
| `split` | 13:02 | O Snuffle sugere dois pedidos, porque os itens vão para lojas diferentes |
| `confirm` | 13:02 | O Snuffle confirma o pedido dos óculos e pede para mandar notificações |
| `asking` | 13:05 | Seis lojas consultadas: a Broadway Chemist responde pelo caixa (1 de 2 em estoque), a Bush Opticians diz que não, a Paper & Co e a Olympia Cameras visualizaram, a Brook Hardware e a Brook Green Toys foram consultadas |
| `away` | 13:12 | Tela bloqueada: a Paper & Co tem |
| `answers` | 13:14 | A Paper & Co tem por £14,99, retirar até seg 9 nov; a Broadway Chemist tem 1 por £9,50; a Olympia Cameras oferece cartões visores solares por £6, retirar até seg 16 nov |
| `details` | 13:15 | Comprar 2 na Paper & Co: retirar em até 7 dias, ou entrega hoje por £3,50 |
| `applePay` | 13:15 | Apple Pay, £29,98 |
| `waiting` | 13:16 | Esperando a Paper & Co separar; ainda sem cobrança |
| `receipt` | 13:19 | Pronto, código de retirada K7Q2, retirar até seg 9 nov |
| `code` | 15:42 | No balcão, o código em tela cheia |

### Caminhos de falha

| Passo | O que acontece |
|---|---|
| `sold` | A Paper & Co vendeu os últimos pares antes; o Sam não é cobrado e pode comprar 1 na Broadway Chemist |
| `declined` | O pagamento não passa; nenhuma compra é criada |
| `notConfirmed` | A Paper & Co não confirma em 10 minutos, então o Sam não é cobrado |
| `noShop` | Nenhuma das seis tem antes das 16h: quatro dizem que não, a Brook Hardware e a Brook Green Toys não respondem |
| `keepLooking` | O Snuffle continua procurando até sex 6 nov |
| `dayBefore` | Dom 8 nov, 9:00: um lembrete, com uma extensão até seg 16 nov |
| `notCollected` | Ter 10 nov: não retirado, compra cancelada e £29,98 devolvidos |
| `delivers` | O entregador da própria Paper & Co entrega às 14:41, por £33,48 |

### Jess

A Jess quer um pão de fermentação natural da Rossi's Bakery, mas sai do trabalho às 18h, quando a Rossi's fecha. Em `afterWork` (12:30) ela compra o pão de £4,20, e a Rossi's deixa o pão na Blythe Road News, aberta até as 23h, para retirar no mesmo dia. `shopPage` mostra a página da Rossi's, com o pão de fermentação natural em Found here recently, datado de ontem. Os conjuntos de conteúdo do debugger forçam as mesmas lojas: `manyAnswers` consulta as 12, `longNames` dá nomes longos a quatro delas.

## Primeiro uso

Um comprador novo vê o splash (a marca solta sobre a cor de fundo), três páginas de Getting started, o pedido de localização e o login antes do Nearby. Qualquer botão de login entra como a persona selecionada; "Not now" é uma proposta ainda a decidir. Nas aberturas seguintes ele não aparece.

Na web, abra o build com `?firstRun=1` ou toque em "Replay first run" nas Actions do debugger; o grupo "First run" do debugger abre cada tela sozinha. Fora isso, o build da web abre no Nearby.

No iOS, apague o app do simulador ou do celular e instale de novo, ou abra a folha da conta (o avatar no Nearby) e toque em "Replay first run", que só aparece em builds de desenvolvimento. O splash nativo vem do `app.json` e precisa de um novo build (`npx expo run:ios`) quando muda.
