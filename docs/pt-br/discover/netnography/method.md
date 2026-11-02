# Método

O Discover coletou dados de três fontes: pesquisa documental sobre a rua, benchmarks de produtos que já existem e posts de compradores. Sobre compradores, eu precisava de evidências que pudesse reunir em poucas horas, quase sem custo, e conferir linha por linha. Das formas de coletar, usei uma: uma netnografia, lendo o que os compradores de Londres já escrevem em público sobre a high street, a rua comercial do bairro. O que as pessoas escrevem é quase todo atitudinal, então o mapa de empatia e as proto-personas se apoiam no que as pessoas dizem que pensam e fazem. Ninguém foi observado.

```summary
Takeaways:
- Um método de coleta, a netnografia: 42 citações curtas, 41 conferidas na página ao vivo.
- Os dados são atitudinais. Mostram o que importa às pessoas e como elas contam a própria história. Não mostram com que frequência as coisas acontecem nem o que as pessoas fazem.
- O mapa de empatia e as proto-personas herdam esse limite.
Call:
- Só netnografia. É um take-home, e ela era o jeito mais rápido e barato de ter evidências rastreáveis.
- Num produto 0 a 1, eu não acrescentaria mais rodadas de pesquisa antes de agir. Transformaria isto rápido numa hipótese e testaria com pessoas, que é de onde viriam os dados de comportamento.
AI:
- Um agente de pesquisa buscou, coletou e etiquetou os posts. Um script conferiu cada citação do Reddit com páginas que eu salvei.
- Um agente fez a passada no X e no TikTok pelo meu navegador.
Trade-offs:
- O que as pessoas dizem e o que fazem se afastam, e os posts já mostram isso (numa thread do Mumsnet, há quem elogie as lojas do bairro e alguém conta que acaba comprando na Amazon).
- O Reddit puxa para um público jovem, o Mumsnet para mães. O Reddit veio de um arquivo, e o TikTok rendeu só legendas.
```

## Opções de coleta

| Método | Tipo de dado | Custo para este take-home | Usado |
| --- | --- | --- | --- |
| Pesquisa documental (relatórios, estatísticas, notícias) | Contexto sobre a própria rua | Baixo | Sim, para entender como a high street funciona ([a high street hoje](../high-street-landscape.md)) |
| Benchmarks (páginas de produto, avaliações de apps) | O que os produtos existentes fazem e o que os usuários dizem deles | Baixo | Sim, em paralelo com a netnografia ([benchmarks](../benchmarks.md)) |
| Netnografia (posts públicos) | Atitudinal: o que as pessoas dizem que pensam, sentem e fizeram | Baixo: o material já existe | Sim, a única fonte sobre compradores |
| Entrevistas | Atitudinal, com perguntas de acompanhamento | Médio: recrutamento, sessões, anotações | Não |
| Survey | Atitudinal, em escala | Médio: precisa de um painel para valer alguma coisa | Não |
| Observação na rua ou acompanhamento na King Street | Comportamental: o que as pessoas fazem | Médio a alto | Não |
| Estudo de diário | Comportamental, autorrelatado ao longo de dias | Alto | Não |
| Teste de protótipo | Comportamental, diante de uma ideia concreta | Médio, quando houver algo para testar | Depois, após o Define |

## Por que netnografia

As pessoas já escreveram muito sobre a high street do bairro, e cada afirmação continua presa a um post datado que qualquer um pode abrir. Por isso ela era o caminho mais rápido para uma base que eu pudesse conferir. Não acrescentei entrevistas nem survey, porque num take-home elas custariam mais tempo do que mudariam a direção.

## Dados atitudinais

Um post me conta o que alguém percebeu, como se sentiu e o que diz ter feito depois. Isso basta para ver quais problemas importam às pessoas e as palavras que elas usam para eles. Não me diz com que frequência o problema acontece, o que pensam as pessoas que nunca postam, nem se elas agiriam como dizem. Os posts já mostram essa distância: numa thread do Mumsnet, as pessoas dizem que querem apoiar o comércio local, e uma delas conta que acaba comprando na Amazon.

Por isso o [mapa de empatia](empathy-map.md) e as [proto-personas](../personas/index.md) descrevem como os compradores falam da high street. São uma hipótese inicial sobre comportamento, ainda por testar.

## Com mais tempo

Num produto já estabelecido, eu acrescentaria dados de comportamento em seguida: observar pessoas na rua, ou dados de uso. Para algo que ainda não existe, eu iria o mais rápido possível para uma ideia testável e a colocaria na frente de alguns compradores. A reação deles a um protótipo é evidência de comportamento e responde às perguntas que as personas deixam em aberto (veja [o que testar primeiro](../personas/index.md)).

## Etapas

1. **Pergunta.** Como os compradores do oeste de Londres escolhem entre lojas locais, redes e compra online, e onde falha a tentativa de achar algo por perto?
2. **Fontes.** Reddit e Mumsnet primeiro, depois X e TikTok, escolhidos com os critérios de site de Kozinets ([decisão 009](../../decision-log.md)).
3. **Coleta.** Um agente de pesquisa buscou e salvou posts públicos de maio de 2025 a novembro de 2026, cada um com handle, data e link. O Reddit bloqueou as ferramentas, então o agente leu o conteúdo pelo Arctic Shift, um arquivo público para pesquisa. Eu salvei à mão as páginas ao vivo correspondentes para que um script pudesse conferir cada citação.
4. **Etiquetagem.** O agente deu a cada citação de uma a três etiquetas de uma lista de 14, como "stock-visibility" ou "opening-hours", e as agrupou em temas. A pesquisa qualitativa chama isso de codificação; não tem nada a ver com programação. Um agente acrescentou um décimo tema a partir de uma passada curta no X e no TikTok pelo meu navegador. Esse tema mostra algumas legendas promocionais do TikTok como exceção marcada à exclusão de conteúdo promocional.
5. **Resultado.** [Achados](findings.md), um [mapa de empatia](empathy-map.md) no formato Strategyzer e duas [dimensões propostas](dimensions.md).

O framework, os termos de busca, a ética e a lista de etiquetas estão em [método em detalhe](method-details.md). Cada etapa, incluindo o que deu errado, está em [como a IA foi usada](../../process/ai-log.md).
