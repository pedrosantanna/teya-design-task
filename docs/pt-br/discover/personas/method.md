# Método

Como as proto-personas foram feitas. Os posts foram etiquetados, pontuados em duas dimensões e agrupados em clusters. Cada cluster virou uma persona.

```summary
Takeaways:
- Três clusters se ajustam melhor aos dados (silhueta média 0,55, contra 0,48–0,53 para 2, 4 ou 5).
- Os dois etiquetadores concordaram em 89–96% dos códigos por trás das duas dimensões.
Call:
- Duas dimensões que se ligam ao brief: urgência da necessidade e ponto de falha.
- Os campos de persona de Lewrick, Link e Leifer para descrever cada cluster.
AI:
- Um agente escreveu o codebook e etiquetou 44 posts. Um segundo agente etiquetou às cegas.
- Um script transformou os códigos em pontuações, rodou a clusterização e desenhou o mapa.
Trade-offs:
- Os dois etiquetadores são modelos de IA. Duas pontuações por post fazem muitos posts dividirem o mesmo lugar no mapa.
```

## Etapas

### 1. Etiquetar ("codificar")

Cada post da [netnografia](../netnography/findings.md) recebe etiquetas de uma lista fixa, o codebook: a tarefa, se é urgente, onde deu errado e o que o comprador fez depois. Na pesquisa qualitativa essa etiquetagem se chama codificação; não tem nada a ver com programação. 27 dos 44 posts descrevem as compras da própria pessoa que postou.

### 2. Conferir

Um segundo agente etiqueta cada post às cegas, sem ver as primeiras etiquetas. Três regras escritas resolvem as divergências.

### 3. Pontuar

Cada post é pontuado nas duas [dimensões](../netnography/dimensions.md), urgência da necessidade e ponto de falha:

| Urgência da necessidade | Pontuação | Ponto de falha | Pontuação |
| --- | --- | --- | --- |
| Descoberta | 1 | Não conseguiu saber (informação) | 9 |
| Rotina | 4 | Não estava lá (disponibilidade) | 6 |
| Item específico | 7 | Não valeu a pena (valor) | 4 |
| Prazo mencionado | +3 | Não conseguiu pegar (acesso) | 1 |

### 4. Agrupar em clusters

k-means sobre as duas pontuações, testando de 2 a 5 clusters e mantendo o número com a melhor silhueta média, que mede quão bem separados os clusters ficam. Os 6 posts em que nada deu errado aparecem na lista, mas não entram na clusterização.

<!-- generated:silhouette -->
| Clusters (k) | Silhouette médio |
| --- | --- |
| 2 | 0.5 |
| 3 | 0.55 ← escolhido |
| 4 | 0.53 |
| 5 | 0.48 |
<!-- /generated:silhouette -->

### 5. Nomear

O cluster com a maior urgência da necessidade é Sam. Dos outros, o mais próximo de "não conseguiu pegar" é Jess, e o restante é Ruth. Cada um é então descrito com os campos de persona: jobs to be done, casos de uso, dores, ganhos e influências.

## A ferramenta de persona

O perfil de persona/usuário de Lewrick, Link e Leifer ([*The Design Thinking Playbook*](https://www.wiley.com/en-us/The+Design+Thinking+Playbook%3A+Mindful+Digital+Transformation+of+Teams%2C+Products%2C+Services%2C+Businesses+and+Ecosystems-p-9781119467472), 2018; [*The Design Thinking Toolbox*](https://www.wiley.com/en-us/The+Design+Thinking+Toolbox%3A+A+Guide+to+Mastering+the+Most+Popular+and+Valuable+Innovation+Methods-p-9781119629214), 2020) descreve um usuário fictício construído a partir de pesquisa e espera que ele mude à medida que o time aprende. Usei os campos dele. A pontuação e a clusterização são acréscimo meu.

## Limites

- **Clusters pequenos.** 11, 6 e 4 posts. Ruth em especial precisa ser testada.
- **Pontuações pouco granulares.** Os códigos são categorias, então muitos posts dividem o mesmo ponto. O mapa mostra esses posts lado a lado.
- **IA dos dois lados.** A concordância entre dois modelos é uma evidência mais fraca do que a concordância entre duas pessoas.
- **Compradores ausentes.** Compradores mais velhos e offline quase não aparecem nos dados. Ruth é a persona mais exposta a isso: o comportamento que o cluster dela mostra (rotina, lealdade, ver as lojas fecharem) pode pertencer sobretudo a pessoas que não postam no Reddit. Por isso a idade dela vem de pesquisa documental (uma pesquisa GLA/YouGov de 2018), não dos posts, e ela é a primeira persona a testar.

Codebook, concordância, cada divergência e cada post etiquetado: [método em detalhe](method-details.md).
