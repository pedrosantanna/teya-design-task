# Usuários sintéticos de teste

Usuários de teste roteirizados percorrem os fluxos do protótipo para o Sam e a Jess e registram onde o fluxo quebra. Eles rodam num navegador, sobre a build web, a partir de objetivos e restrições tirados das proto-personas, e relatam passos, toques, becos sem saída, alvos de toque pequenos, controles sem nome e texto cortado.

```summary
Takeaways:
- Oito cenários rodam na build web, quatro para o Sam e quatro para a Jess. A Ruth está fora do escopo e não tem nenhum.
- A última rodada chegou ao objetivo em seis cenários, quebrou em um e parou antes em outro. "Ask further away" não pergunta a ninguém, e o pedido "toda sexta" da Jess nunca é confirmado como recorrente.
- A mesma rodada achou um recibo que não nomeia o lugar onde a Jess retira, uma busca em andamento sem como mudar ou parar, e de 1 a 23 alvos de toque abaixo de 44 pt por cenário.
- São usuários de teste para fluxos. Não são compradores, não dizem nada sobre demanda e não substituem pesquisa.
Call:
- Pedi usuários sintéticos de teste construídos a partir das proto-personas para testar fluxos e usabilidade, e para deixar claro que não são pesquisa nem validação.
- Pedi que fossem roteirizados e determinísticos, que dirigissem o protótipo pelos papéis e rótulos acessíveis, e que a rodada falhasse diante de uma quebra funcional.
- Decidi que a revisão heurística continua opcional, rotulada como a leitura de um agente sobre as telas, e não chama nenhum serviço externo.
AI:
- Um agente escreveu os arquivos de cenário a partir das páginas das personas, o runner e o relatório, e rodou todos os cenários. Eu li as quebras e conferi a tela do recibo a olho.
- Um agente pesquisou os limites dos usuários sintéticos; só estão citadas aqui as fontes que ele leu na própria página.
Trade-offs:
- Um cenário segue um caminho que existe, então chegar ao objetivo é evidência fraca e uma quebra é o resultado útil.
- O runner vê um só tamanho de celular, no esquema claro. Escuro, Android, texto maior e VoiceOver não estão cobertos.
```

## O que são

Um usuário sintético de teste aqui é o conjunto de objetivos e restrições de uma persona escrito como arquivo de cenário, mais um runner que o executa contra o protótipo. O nome da atividade é teste de cenário guiado por persona. O runner toca no que está visível na tela, por papel e rótulo, e anota o que aconteceu. Ele roda sem modelo, então a mesma build dá o mesmo relatório.

A checagem é se uma pessoa com aquele objetivo conseguiria atravessar o fluxo. O Sam tem até as 16h, então o runner conta toques e segundos até um código de retirada. A Jess retira depois das 18h, então um cenário termina com um código para a loja da esquina, aberta até as 23h.

## O que não são

Não são pesquisa. Os usuários são scripts e não têm necessidades, hábitos nem opiniões, e as lojas do protótipo respondem por um roteiro fixo. Um cenário que passa diz que o caminho existe. Não diz se compradores querem o app, pagariam por ele ou o usariam como o script usa.

Não substituem compradores nem lojistas, e não são etnografia automatizada. Validar demanda exige compradores e lojistas de verdade.

## Como são construídos

Cada persona tem um arquivo em `app/e2e/personas/`: os objetivos e as restrições (tempo, horário, hábitos de dispositivo e de pagamento) copiados das [proto-personas](../discover/personas/index.md), e os cenários. Um cenário tem um início (os parâmetros de URL e os passos da jornada do protótipo, da [página do protótipo](prototype.md)), uma lista de passos e um passo marcado como objetivo.

Um passo é um destes: tocar, digitar, rolar, esperar algo aparecer, checar que algo está visível. Os alvos são achados por papel e nome acessível entre os controles da tela, nunca por CSS. Uma checagem marcada como usabilidade registra um achado e deixa o cenário continuar. Qualquer outro passo que falhe interrompe o cenário e conta como quebra.

Para cada cenário o runner registra:

- os passos, os toques e o tempo até o objetivo;
- telas sem próxima ação, depois de uma espera curta para a digitação e o processamento terminarem;
- controles sem nome acessível, e imagens com papel mas sem rótulo;
- alvos de toque abaixo de 44 pt;
- texto cortado por reticências ou por limite de linhas;
- erros de console e erros de página não tratados;
- uma captura de tela por passo.

O relatório é gravado em `app/e2e/out/` (não versionado): `report.json`, `summary.md` e as capturas.

## Cenários

| Persona | Cenário | Início | Objetivo |
| --- | --- | --- | --- |
| Sam | Óculos de eclipse antes das 16h | Nearby | Pedir, esperar respostas, comprar 2 pares, abrir o recibo com o código de retirada |
| Sam | Nenhuma loja tem: continuar procurando | `noShop` | Uma busca contínua é confirmada e dá para ver que está rodando |
| Sam | Nenhuma loja tem: perguntar mais longe | `noShop` | Lojas a até 30 minutos respondem |
| Sam | O pagamento é recusado | `declined` | Tentar de novo, pagar, chegar ao recibo |
| Jess | Pão de fermentação natural toda sexta | Nearby | O pedido é confirmado como recorrente toda semana |
| Jess | Retirar depois do trabalho na loja da esquina | `afterWork` | Comprar, escolher a loja da esquina, chegar ao código |
| Jess | Passear pelas padarias e ver a página de uma loja | Nearby | A página da loja mostra fotos, horário, o que vendem e avaliações |
| Jess | Primeiro uso até o Nearby | `?firstRun=1` | Da abertura ao Nearby, passando por localização e login |

## Como rodar

Sirva os docs e a build web, depois rode os cenários a partir de `app/`:

```
npm run export:web
python3 site/serve.py 4173   # a partir da raiz do repositório
npm run synthetic
```

`npm run synthetic -- --only jess` ou `-- --scenario widen-search` roda parte do conjunto, `--no-fail` mantém o código de saída em 0, e `SYNTHETIC_URL` aponta o runner para outra build. O runner abre o protótipo em 402 por 874 com `?scheme=light&debug=0` e os parâmetros do próprio cenário. O Playwright 1.58.2 vem pelo `npx`, então nada é acrescentado às dependências do app. O código de saída é 1 quando um cenário tem uma quebra funcional ou não chega ao objetivo.

A revisão heurística opcional roda em dois passos. `npm run synthetic:judge` grava `app/e2e/out/judge-input.json` a partir do último relatório. Um agente neste repositório então segue `app/e2e/judge/prompt.md`: lê os passos e as capturas e os pontua contra a [revisão de telas](../develop/design-system/screen-review.md) e o [modelo conceitual](../develop/design-system/conceptual-model.md). O prompt manda marcar o que foi medido e o que foi lido, escrever "revisão heurística de um agente, não é evidência de usuário" no topo, e nunca pontuar satisfação nem vontade de comprar. O runner não chama nenhum modelo. A revisão não foi rodada para esta página.

## Últimos resultados

Rodada em 5 de novembro de 2026 contra a build web servida em `localhost:4173`.

| Cenário | Resultado | Toques | Até o objetivo | Alvos abaixo de 44 pt | Sem nome | Texto cortado |
| --- | --- | --- | --- | --- | --- | --- |
| Sam, óculos de eclipse | Chegou | 8 | 34 s | 17 | 0 | 0 |
| Sam, continuar procurando | Chegou | 2 | 9 s | 4 | 0 | 0 |
| Sam, perguntar mais longe | Quebrou | 1 | nenhum | 2 | 0 | 0 |
| Sam, pagamento recusado | Chegou | 2 | 12 s | 5 | 0 | 0 |
| Jess, toda sexta | Não chegou | 2 | nenhum | 12 | 0 | 0 |
| Jess, retirar depois do trabalho | Chegou | 4 | 15 s | 1 | 0 | 0 |
| Jess, padarias | Chegou | 2 | 7 s | 23 | 0 | 0 |
| Jess, primeiro uso | Chegou | 6 | 15 s | 9 | 0 | 0 |

O tempo até o objetivo inclui os atrasos roteirizados das lojas simuladas e as esperas do runner até a tela assentar. Os alvos abaixo de 44 pt contam cada controle uma vez por cenário; em sua maioria são chips e botões pequenos, com 32 a 36 pt de altura.

### O que quebrou

- Ask further away diz "I'm asking shops up to 30 minutes away" e depois nada acontece. Passados 45 segundos, nenhuma loja nova nem resposta aparece. A spec do pedido oferece essa ação e a simulação não tem comportamento por trás.
- O pedido "Sourdough from Rossi's every Friday" vira um pedido avulso. A recorrência só existe em Keep looking, em Every week, e vi que a nota ainda diz "one message" e que vai até sex 6 nov. O runner registra a confirmação que falta; a nota eu vi ao escrever o cenário.
- Depois que a Jess compra para a loja da esquina, o recibo traz o título Rossi's Bakery e nomeia a retirada como "Blythe Road, open till 11pm". Falta o nome da loja, então o 23h parece o horário de fechamento da Rossi's.
- Depois que Keep looking é confirmado, o chat não mostra nenhum controle para ver, mudar ou parar a busca.
- Os controles atrás de uma sheet aberta continuam na árvore de acessibilidade da build web (até 11 numa tela). Não verifiquei se isso também acontece no iOS.
- As únicas telas marcadas como sem próxima ação foram estados de espera: o chat enquanto uma loja é consultada e depois de Keep looking. Nenhuma estava travada.
- Nenhum controle sem nome, nenhum texto cortado e nenhum erro de console na rodada final. Uma rodada anterior teve um erro de página não tratado (uma fonte de mídia que não carregou) enquanto a build web era refeita; ele não se repetiu no mesmo cenário.

### Depois das correções

Um agente corrigiu cada quebra acima, e uma segunda rodada no mesmo dia chegou ao objetivo nos oito cenários. O Ask further away agora pergunta a lojas a 22 a 28 minutos e mostra as respostas delas. Um pedido que diz "every Friday" vira um pedido recorrente, confirmado na conversa. O recibo dá o nome do ponto de retirada. Uma busca em andamento tem Change e Stop. A tela atrás de uma sheet fica oculta para as tecnologias assistivas.

| Cenário | Resultado | Alvos abaixo de 44 pt |
| --- | --- | --- |
| Sam, óculos de eclipse | Chegou | 1 |
| Sam, continuar procurando | Chegou | 2 |
| Sam, perguntar mais longe | Chegou | 0 |
| Sam, pagamento recusado | Chegou | 0 |
| Jess, toda sexta | Chegou | 1 |
| Jess, retirar depois do trabalho | Chegou | 0 |
| Jess, ver padarias | Chegou | 1 |
| Jess, primeiro uso | Chegou | 1 |

Os alvos ainda abaixo de 44 pt na web são as abas do segmented control (32 pt), a barra de pedido (40 pt) e o chip All nas telas de categoria.

## Limites e riscos

- Otimismo. No teste da NN/g, usuários sintéticos disseram ter concluído cursos que alunos reais abandonaram ([Rosala e Moran, 2024](https://www.nngroup.com/articles/synthetic-users/)). Os scripts daqui são determinísticos e não têm esse problema, mas um agente-juiz lendo as mesmas telas poderia ter, por isso ele fica opcional e rotulado.
- Passar porque o cenário foi conduzido. Cada cenário segue um caminho que sei que existe. Um resultado positivo precisa ser conferido contra o que o script foi mandado fazer.
- Comportamento de superfície. Um modelo que interpreta uma persona pode acertar as respostas típicas e ainda assim ser incoerente por baixo ([Mooney et al., 2025](https://arxiv.org/abs/2509.03736)). Agentes baseados em entrevistas acompanharam as respostas de pesquisa das pessoas melhor do que agentes com só dados demográficos ([Park et al., 2024](https://arxiv.org/abs/2411.10109)), e estas personas se apoiam em 20 posts públicos e nenhuma entrevista.
- Grupos pequenos e específicos. A NN/g desaconselha usuários sintéticos para populações de nicho, e lojistas são uma. Nada aqui simula um lojista; as lojas são um roteiro fixo.
- Parar cedo demais. A NN/g coloca os usuários sintéticos na preparação de estudos reais e no refinamento de proto-personas. O UXAgent é o precedente mais próximo de agentes roteirizados num protótipo, e seus autores o apresentam como forma de pilotar um estudo, não como substituto de participantes ([Lu et al., 2025](https://arxiv.org/abs/2502.12561)).
- Cobertura. Um viewport, o esquema claro, uma plataforma na build web e nenhuma tecnologia assistiva.
