# Tags

Os cinco tipos de rótulo pequeno do app: chips de filtro, chips de sugestão, rótulos de status, badges e contadores. Cada um tem uma função, um tamanho e uma regra de cor, para o comprador distinguir de relance uma ação de um estado e de uma promoção.

```summary
Takeaways:
- Dois chips que o comprador toca (filtro e sugestão) e três rótulos que só informam (rótulo de status, badge, contador).
- Rótulos de status não têm preenchimento e seguem palavra por palavra a tabela de estados do modelo conceitual; um por cartão ou linha.
- Badges ficam só em tiles com foto, no máximo dois por tile, com fundo 100 do acento e texto 800. Promoted sempre aparece, porque declara o posicionamento pago.
- A cor nunca é o único sinal: avisos levam um símbolo, e chips selecionados mantêm o rótulo (o Android acrescenta um checkmark).
Call:
- Pedi que as etiquetas fossem tratadas do mesmo jeito que forma e movimento, partindo do iOS e ampliando para o Material (decisão 041).
- Mantive os valores provisórios, para serem ajustados no tamanho real, no protótipo.
AI:
- Um agente pesquisou as Human Interface Guidelines da Apple (lidas a partir do JSON da HIG, porque as páginas são renderizadas por script) e os chips e badges do Material 3, e propôs os tipos e as regras a partir da página de cor e do modelo conceitual. Eu pedi um design system moderno, baseado primeiro no iOS, depois no Material.
Trade-offs:
- Um rótulo de status sem preenchimento é mais discreto que uma pílula e mais fácil de passar despercebido; escolhi assim para que o preço continue sendo o elemento mais forte do cartão.
- O iOS não tem componente de chip, então os chips são próprios no iOS e chips do Material no Android.
```

## Tipos

| Tipo | Anatomia | Tamanho | Cor | Onde |
| --- | --- | --- | --- | --- |
| Chip de filtro | Rótulo, símbolo opcional à esquerda, contagem depois de "·" | 32 de altura, padding 12–14, `radius.full`, toque de 44 | Desligado: secundária. Ligado: fundo Índigo 100, texto 800 (escuro: 900 / 200) | Filtros de Requests, filtro de rua em Nearby; escolha única, "All" primeiro |
| Chip de sugestão | Texto, símbolo opcional | Como o chip de filtro | Fundo secundário, texto em primeiro plano | Acima da barra de pedido; um toque envia o texto; no máximo 3 visíveis |
| Rótulo de status | Ícone opcional, depois texto em Caption 1 | Na linha, sem preenchimento | Primeiro plano secundário; tint só para "Needs you"; um ícone de aviso só nos finais "Not confirmed · not charged" e "Sold · not charged", nunca em "not charged yet" | Linhas, cartões e notificações, exatamente como na tabela de estados |
| Badge | Texto em Caption 2 | 20 de altura, padding 8, `radius.full`, a 8 do canto da foto | Fundo 100 do acento, texto 800 (escuro: 900 / 200). Promoted Pistache, New Pêssego, Delivers Manteiga | Só em tiles com foto |
| Contador | Um número | Diâmetro mínimo de 18, `radius.full` | Fundo da primária com a cor do rótulo dela | No botão redondo de Requests, para pedidos que precisam do comprador; limite de "9+" |

## Regras

| Regra | Na prática |
| --- | --- |
| Um status por objeto | Um rótulo de status por cartão ou linha |
| Poucos badges | No máximo dois badges por tile; Promoted sempre aparece, porque declara o posicionamento pago |
| Sem preenchimento no rótulo de status | Uma pílula competiria com o preço |
| Mais que cor | Avisos também ganham um símbolo; a cor nunca carrega significado sozinha |
| A seleção mantém o rótulo | Um chip selecionado mantém o texto; o Android acrescenta um checkmark, como o Material |
| Badges para o que importa | Um contador só para pedidos que precisam do comprador, já que a HIG reserva badges para informação crítica |
| Origem de uma resposta | A resposta de uma loja consultada diz "Has it · replied 2 min ago"; a de uma loja conectada diz "In stock now · from the shop's till", encurtado para "In stock now · till" nas linhas compactas |

Os tamanhos dos badges do Material (ponto de 6 dp, com texto de 16 dp) estão a conferir em m3.material.io.

## Fontes

- Apple, Human Interface Guidelines, Tab bars (badges): https://developer.apple.com/design/human-interface-guidelines/tab-bars
- Apple, Human Interface Guidelines, Accessibility (mais que cor): https://developer.apple.com/design/human-interface-guidelines/accessibility
- Material 3, chips (assist, filter, input, suggestion; 32 dp de altura, alvo de 48 dp): https://m3.material.io/components/chips
- Material Components for Android, `BadgeDrawable`: https://developer.android.com/reference/com/google/android/material/badge/BadgeDrawable
- [Cor](colour.md) (papéis de badge e de chip selecionado) e [Modelo conceitual](conceptual-model.md) (estados e palavras)
