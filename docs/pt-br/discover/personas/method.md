# Método

Um agente etiquetou os posts, e um script deu as pontuações nas duas dimensões e fez a clusterização. Cada cluster virou uma persona.

```summary
Takeaways:
- Três clusters se ajustam melhor aos dados (silhueta média 0,57, contra 0,46–0,56 para 2, 4 ou 5).
- Os dois etiquetadores concordaram em 89–96% dos códigos por trás das duas dimensões.
Call:
- Duas dimensões que se ligam ao brief: urgência da necessidade e etapa da compra.
- Os campos de persona de Lewrick, Link e Leifer para descrever cada cluster.
AI:
- Um agente escreveu o codebook e etiquetou 44 posts. Um segundo agente etiquetou às cegas.
- Um script transformou os códigos em pontuações, rodou a clusterização e desenhou o mapa.
Trade-offs:
- Os dois etiquetadores são modelos de IA.
- Com só duas pontuações por post, muitos posts dividem o mesmo lugar no mapa.
```

## Etapas

### 1. Etiquetar

Cada post da [netnografia](../netnography/findings.md) recebe etiquetas de uma lista fixa, o codebook: a tarefa, se é urgente, onde deu errado e o que o comprador fez depois. Na pesquisa qualitativa essa etiquetagem se chama codificação. 27 dos 44 posts descrevem as compras da própria pessoa que postou.

### 2. Conferir

Um segundo agente etiqueta cada post às cegas, sem ver as primeiras etiquetas. Três regras escritas resolvem as divergências.

### 3. Pontuar

Cada post é pontuado nas duas [dimensões](../netnography/dimensions.md), urgência da necessidade e etapa da compra. As duas vão de 0 a 10, então a clusterização dá o mesmo peso às duas. As quatro etapas seguem a ordem da compra, com espaços iguais entre elas.

| Urgência da necessidade | Pontuação | Etapa da compra em que parou | Pontuação |
| --- | --- | --- | --- |
| Descoberta | 1 | 1 · Saber (informação) | 10 |
| Rotina | 4 | 2 · Encontrar (disponibilidade) | 6,7 |
| Item específico | 7 | 3 · Aceitar (valor) | 3,3 |
| Prazo mencionado | +3 | 4 · Levar (acesso) | 0 |

### 4. Agrupar em clusters

Um script roda k-means sobre as duas pontuações para 2 a 5 clusters e fica com o número que tem a melhor silhueta média (uma medida de quão bem separados os clusters ficam). Os 6 posts em que nada deu errado aparecem na lista, mas ficam fora da clusterização.

<!-- generated:silhouette -->
| Clusters (k) | Silhouette médio |
| --- | --- |
| 2 | 0.51 |
| 3 | 0.57 ← escolhido |
| 4 | 0.56 |
| 5 | 0.46 |
<!-- /generated:silhouette -->

### 5. Nomear

O cluster com a maior urgência da necessidade é Sam. Dos outros, o mais próximo da etapa 4, "levar", é Jess, e o restante é Ruth. Cada um é então descrito com os campos de persona: jobs to be done, casos de uso, dores, ganhos e influências.

## Modelo de persona

O perfil de persona/usuário de Lewrick, Link e Leifer ([*The Design Thinking Playbook*](https://www.wiley.com/en-us/The+Design+Thinking+Playbook%3A+Mindful+Digital+Transformation+of+Teams%2C+Products%2C+Services%2C+Businesses+and+Ecosystems-p-9781119467472), 2018; [*The Design Thinking Toolbox*](https://www.wiley.com/en-us/The+Design+Thinking+Toolbox%3A+A+Guide+to+Mastering+the+Most+Popular+and+Valuable+Innovation+Methods-p-9781119629214), 2020) descreve um usuário fictício construído a partir de pesquisa e espera que ele mude à medida que o time aprende. Usei os campos dele. A pontuação e a clusterização são acréscimo meu.

## Limites

- Os clusters são pequenos: 11, 6 e 4 posts. Ruth é a que mais precisa de teste.
- As etiquetas são categorias, então muitos posts caem no mesmo ponto. O mapa desenha esses posts lado a lado.
- Os dois etiquetadores são modelos de IA. A concordância entre dois modelos é uma evidência mais fraca do que a concordância entre duas pessoas.
- Compradores mais velhos e offline quase não aparecem nos dados. Ruth é a mais exposta a isso: o comportamento do cluster dela (rotina, lealdade, ver as lojas fecharem) pode pertencer sobretudo a pessoas que não postam no Reddit. Por isso a idade dela vem de pesquisa documental (uma pesquisa GLA/YouGov de 2018), e ela é a primeira persona a testar.

Codebook, concordância, cada divergência e cada post etiquetado: [método em detalhe](method-details.md).
