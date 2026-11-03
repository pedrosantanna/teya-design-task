# Protótipo

O app do comprador rodando no navegador, a partir do mesmo código Expo que roda no iPhone e no Android. O conteúdo é simulado; as lojas respondem por um roteiro. Aperte D, ou o botão redondo, para abrir o state debugger e trocar a persona, a plataforma, o passo da jornada e o estado de cada pedido, resposta e compra.

```summary
Takeaways:
- Um app Expo só gera iOS, Android e esta versão web (decisão 038); a moldura troca entre um iPhone e um Pixel junto com a plataforma.
- O state debugger define persona (Sam ou Jess), plataforma, claro ou escuro, passo da jornada, os estados do modelo conceitual e o conjunto de conteúdo; o relógio da simulação pode ser pausado ou avançado.
- A jornada do Sam roda do começo ao fim: pedir, respostas chegando, comprar, esperar a loja, retirar; cada caminho de falha do app flow v7 está a um clique.
Call:
- Pedi um protótipo que rodasse como app de verdade para o vídeo e como build web dentro destes docs, com um debugger para definir qualquer estado enquanto navego, e uma moldura de iPhone ou Android em volta.
- Pedi que toda tela passasse pelo revisor de telas antes de publicar; o que ele achou foi corrigido neste build.
AI:
- Agentes construíram a store e o debugger, os componentes do design system, as telas e a simulação a partir das changes do OpenSpec; outro agente revisou as telas rodando e um último corrigiu o que ele achou.
Trade-offs:
- O build web não mostra o glass nativo, os haptics nem as folhas de pagamento reais; eles são desenhados, e o vídeo usa o build de iOS.
```

Abra sozinho para usar a janela inteira: `app-web/index.html`. Acrescente `?debug=0` para esconder o debugger, `?os=android` para Android, ou `?step=` para começar num passo.
