# Método

Uma netnografia: ler o que os compradores de Londres já dizem em público sobre a high street, a rua comercial do bairro. Agentes de IA coletaram e etiquetaram os posts; eu escolhi as fontes e conferi as evidências.

```summary
Takeaways:
- Uma base de evidências rápida e barata: 42 citações curtas entre as páginas de netnografia e de personas, 41 conferidas na página ao vivo.
- Boa para mostrar o que importa às pessoas, não com que frequência algo acontece.
Call:
- Netnografia, porque ela constrói evidência rápido para um take-home. Reddit e Mumsnet primeiro.
- Manter os handles públicos para que cada citação possa ser conferida. Manter as citações curtas.
AI:
- Um agente de pesquisa buscou, coletou e etiquetou os posts. Um script conferiu cada citação do Reddit com páginas que eu salvei.
- Um agente fez a passada no X e no TikTok pelo meu navegador.
Trade-offs:
- O Reddit puxa para um público jovem, o Mumsnet para mães. O Reddit veio de um arquivo, e o TikTok rendeu só legendas.
```

## Como foi feito

1. **Pergunta.** Como os compradores do oeste de Londres escolhem entre lojas locais, redes e compra online, e onde falha a tentativa de achar algo por perto?
2. **Fontes.** Reddit e Mumsnet primeiro, depois X e TikTok. Escolhi as fontes usando os critérios de site de Kozinets ([decisão 009](../../decision-log.md)).
3. **Coleta.** Um agente de pesquisa buscou e salvou posts públicos de maio de 2025 a novembro de 2026, cada um com handle, data e link. O Reddit bloqueou as ferramentas, então o agente leu o conteúdo pelo Arctic Shift, um arquivo público para pesquisa. Eu salvei à mão as páginas ao vivo correspondentes para que um script pudesse conferir cada citação.
4. **Etiquetagem ("codificação").** O agente deu a cada citação de uma a três etiquetas de uma lista de 14, como "stock-visibility" ou "opening-hours", e as agrupou em temas. A pesquisa qualitativa chama isso de codificação; não tem nada a ver com programação. Um agente acrescentou um décimo tema a partir de uma passada curta no X e no TikTok pelo meu navegador.
5. **Resultado.** [Achados](findings.md), um [mapa de empatia](empathy-map.md) no formato Strategyzer e duas [dimensões propostas](dimensions.md).

Cada etapa, incluindo o que deu errado, está em [como a IA foi usada](../../process/ai-log.md).

## Por que netnografia

Ela constrói uma base de evidências rápido e quase de graça: as pessoas já escreveram muito, e cada afirmação continua rastreável até um post datado. Isso serve para um take-home. Num produto real, ela abriria a descoberta e apontaria para onde entrevistas e dados de uso deveriam ir depois; eu não decidiria só com ela ([decisão 000](../../decision-log.md)).

## O que ela não consegue mostrar

- Com que frequência algo acontece: as pessoas postam quando algo as irrita ou agrada.
- O que pensam as pessoas que não postam, especialmente compradores mais velhos e offline.
- Qualquer coisa vinda dos lojistas, ou uma reação à ideia de um app. Ninguém foi consultado.

Detalhes completos, incluindo o framework, os termos de busca, a ética e o esquema de etiquetagem: [método em detalhe](method-details.md).
