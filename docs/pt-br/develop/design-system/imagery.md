# Imagens e ícones

De onde vêm as imagens e os ícones, os tamanhos e proporções que eles têm em cada superfície, e as regras para fotos, ícones, o mapa e o tile mostrado quando uma loja não tem foto.

```summary
Takeaways:
- Os ícones são do HugeIcons, o conjunto gratuito Stroke Rounded, via `@hugeicons/react-native` com `@hugeicons/core-free-icons`. Um conjunto só nas duas plataformas; compartilhar, voltar e mais mudam de forma no Android.
- A espessura do traço segue o texto ao lado do ícone: 1,5 ao lado de texto regular, 2 ao lado de semibold.
- As fotos são da própria loja, com luz do dia, da fachada ou do balcão. Sem fotos de banco de imagens, sem filtros, sem pessoas identificáveis. Um item nunca tem foto: as miniaturas mostram a loja ou um placeholder do pedido.
- Poucas proporções: 4:3 para tiles, 1:1 para miniaturas e categorias, 3:2 para o topo da página da loja. Os cantos seguem os tokens de forma.
- Uma loja sem foto ganha um tile tonal com as iniciais e o toldo da marca. É uma proposta e não foi testada.
Call:
- Pedi que as imagens fossem tratadas do mesmo jeito que forma e movimento, partindo do iOS e ampliando para o Material (decisão 041).
- Escolhi o HugeIcons em vez do SF Symbols e do Material Symbols, para o app ter um estilo de ícone só nas duas plataformas (decisão 042).
- Mantive os valores provisórios, para serem ajustados no tamanho real, no protótipo.
AI:
- Um agente pesquisou as Human Interface Guidelines da Apple sobre imagens (lidas a partir do JSON da HIG, porque as páginas são renderizadas por script) e propôs os tamanhos e as regras. Eu pedi um design system moderno, baseado primeiro no iOS, depois no Material.
- Um agente associou cada ícone do app flow v7 a um nome do HugeIcons, conferiu cada nome na lista de ícones do `@hugeicons/core-free-icons` 4.4.0 e desenhou os candidatos numa folha de contatos para escolher as formas. Eu escolhi o conjunto.
Trade-offs:
- Fotos reais das lojas variam em qualidade; fotos de banco de imagens ficariam mais arrumadas e não diriam nada ao comprador sobre a loja.
- Um conjunto só de ícones fica igual no iOS e no Android e abre mão do que os símbolos do sistema fazem sem custo: peso que acompanha o Dynamic Type, animações de símbolo e variantes preenchidas. O conjunto gratuito é só de traço, então um estado selecionado não pode trocar para um ícone preenchido.
```

## Origem das imagens e dos ícones

| Tipo | iOS | Android e web |
| --- | --- | --- |
| Ícones | HugeIcons Stroke Rounded, conjunto gratuito (licença MIT), grid de 24 × 24 | O mesmo |
| Acesso | `HugeiconsIcon` do `@hugeicons/react-native`, que desenha com o `react-native-svg`; ícones importados um a um do `@hugeicons/core-free-icons` | O mesmo |
| Fotos | JPEG ou HEIC em @2x e @3x | Os mesmos arquivos |
| Gráficos chapados | SVG ou PDF | SVG |
| Ilustrações 3D | PNG em @2x e @3x | Os mesmos arquivos |

## Tamanhos e proporções

| Imagem | Proporção | Tamanho | Canto |
| --- | --- | --- | --- |
| Tile grande (Open near you) | 4:3 | `tile.large` | `radius.bubble` |
| Tile médio (New near you) | 4:3 | `tile.medium` | `radius.bubble` |
| Célula de categoria | 1:1 | Célula de categoria | `radius.bubble` |
| Miniatura de loja ou de pedido | 1:1 | 56 em linhas, 40 em linhas de resposta | `radius.inner` |
| Topo da página da loja | 3:2 | De ponta a ponta | `radius.none` |
| Marca do Snuffle na conversa | 1:1 | 28 | Círculo |
| Logo ou monograma da loja | 1:1 | 24 sobre uma miniatura, 40 numa linha de loja | Círculo |
| Ícone na linha do texto | n/a | A entrelinha do texto menos 4 (16 ao lado do Body) | n/a |
| Ícone na barra de navegação e na toolbar | n/a | 22 | n/a |
| Ícone no botão de Requests e na barra de pedido | n/a | 24 | n/a |

Os tamanhos são em pt no iOS e em dp no Android. As larguras dos tiles estão em [Espaçamento e layout](spacing.md). Uma miniatura é a foto da loja que respondeu, ou o placeholder do pedido numa linha de pedido; nunca é a foto de um item tirada de um catálogo, porque no [modelo conceitual](conceptual-model.md) um item é texto.

## Regras

| Regra | Na prática |
| --- | --- |
| O traço segue o texto | `strokeWidth` 1,5 ao lado de Switzer 400 e 500, 2 ao lado de Switzer 600; os ícones escalam com o texto ao lado deles |
| Monocromático por padrão | Um ícone usa a cor do seu texto; ícones de status usam o papel de aviso ou de sucesso da [Cor](colour.md) |
| Sem preenchimento para seleção | O conjunto gratuito não tem formas preenchidas, então a seleção aparece na cor e no rótulo |
| Formas da plataforma | Compartilhar, voltar e mais seguem a plataforma, como no mapa abaixo; todos os outros ícones são iguais nas duas |
| Fotos das lojas | Da própria loja, com luz do dia, fachada ou balcão, sem filtros, sem banco de imagens, sem pessoas identificáveis |
| Sem fotos de item | Itens não têm foto; uma linha mostra a foto da loja ou o placeholder do pedido |
| Scrim só quando precisa | Um gradiente preto de 0 → 40% só sob badges ou botões de glass sobre uma foto |
| Placeholder sem foto (proposta, não testada) | Um tile tonal com o fundo 100 do acento escolhido pelo tipo de loja, iniciais em Switzer 600 no tom 800 e o toldo de cinco listras da marca como uma faixa no topo |
| Estilo do mapa | Claro: chão Manteiga 50 (#F9F7F0), ruas em Cinza biscoito (secundário, #E5E2DE), pinos Índigo 800. Escuro: chão Manteiga 900 (#382C04), ruas no secundário (#332C27), pinos Índigo 300. Rótulos em Switzer, nenhum ponto de interesse além das lojas |
| Texto alternativo | "[Shop] shopfront, [street]"; placeholders e imagens decorativas ficam ocultos para o VoiceOver e o TalkBack; um ícone que age leva o nome da ação |
| Badges no rótulo | Os badges são lidos como parte do rótulo do tile: "Rossi's Bakery, promoted, open till 6pm" |

## Mapa de ícones

Todos os ícones do [app flow v7](../ideation/app-flow.md) e os que as próximas telas precisam. Os nomes são os exports do `@hugeicons/core-free-icons`; todos foram conferidos na versão 4.4.0. Sinal, Wi-Fi e bateria da barra de status são desenhados pelo sistema.

| Papel | Onde | HugeIcons | Android, se for diferente |
| --- | --- | --- | --- |
| Enviar | O enviar do compositor, num círculo Índigo | `ArrowUp02Icon` | `SentIcon` |
| Microfone | Ditado na barra de pedido e no compositor | `Mic01Icon` | |
| Requests | O botão redondo de Requests; mandar mensagem à loja a partir de uma compra | `BubbleChatIcon` | |
| Localização | A área do comprador em Nearby | `Location05Icon` | |
| Localização atual | Centralizar o mapa no comprador | `Gps01Icon` | |
| Pino no mapa | Uma loja no mapa, uma linha de endereço | `Location01Icon` | |
| Como chegar | Directions numa compra e na página da loja | `Navigation03Icon` | |
| Ligar | Ligar para a loja | `Call02Icon` | |
| Fechar | Sheets, o código em tela cheia | `Cancel01Icon` | |
| Voltar | Barra de navegação | `ArrowLeft01Icon` (chevron) | `ArrowLeft02Icon` (seta) |
| Chevron | Linhas que abrem algo | `ArrowRight01Icon` | Nenhum; as linhas do Material não mostram |
| Mais | Menu da barra de navegação | `MoreHorizontalIcon` | `MoreVerticalIcon` |
| Compartilhar | Compra e página da loja | `Share03Icon` (caixa com seta) | `Share08Icon` (três nós) |
| Aviso | "Not confirmed · not charged", "Sold · not charged" | `Alert02Icon` | |
| Check | Ready, Paid, Collected; uma opção escolhida | `Tick02Icon` | |
| Relógio | Datas de retirada, horário de funcionamento | `Clock01Icon` | |
| Calendário | "Until Fri 6 Nov" num pedido em Keep looking | `Calendar03Icon` | |
| QR code | O código de retirada no recibo | `QrCodeIcon` | |
| Expandir | Abrir o código em tela cheia | `ArrowExpand01Icon` | |
| Pessoa | Avatar sem foto, o menu da conta | `UserIcon` | |
| Mais um | Aumentar a quantidade | `PlusSignIcon` | |
| Menos um | Diminuir a quantidade | `MinusSignIcon` | |
| Notificações | Ajustes de notificação | `Notification01Icon` | |
| Busca | Busca em Requests | `Search01Icon` | |
| Câmera | Pedir com uma foto | `Camera01Icon` | |
| Repetir | "Every Friday" | `RepeatIcon` | |
| Do caixa | "In stock now · till" | `FlashIcon` | |
| Visto | Uma loja consultada viu o pedido | `ViewIcon` | |
| Não tem | Uma resposta sem nada para comprar | `CancelCircleIcon` | |
| Retirar | Retirar na loja | `Store02Icon` | |
| Entrega | A loja entrega | `DeliveryTruck01Icon` | |
| Pagamento | O cartão na sheet do Buy | `CreditCardIcon` | |
| Avaliar | Avaliar uma compra | `StarIcon` | |
| Ajustes | Ajustes no menu da conta | `Settings01Icon` | |

## Ilustrações 3D

Estados vazios, o primeiro uso e o splash usam ilustrações 3D: formas simples, as cores da paleta, contornos finos e sombras chapadas e sólidas, sem degradês nem texturas de foto. Como elas são feitas e onde cada uma entra está em [Ilustrações](illustrations.md).

## Fontes

- HugeIcons: https://hugeicons.com
- `@hugeicons/react-native` (props `icon`, `size`, `color`, `strokeWidth`): https://www.npmjs.com/package/@hugeicons/react-native
- `@hugeicons/core-free-icons` (lista de ícones, licença MIT): https://www.npmjs.com/package/@hugeicons/core-free-icons
- Apple, Human Interface Guidelines, Images: https://developer.apple.com/design/human-interface-guidelines/images
- Apple, Human Interface Guidelines, Icons (ícones de interface): https://developer.apple.com/design/human-interface-guidelines/icons
- [Forma e materiais](shape.md) (tokens de canto), [Cor](colour.md) (fundos dos acentos, cores do mapa), [Marca](mark.md) (o toldo)
