---
name: estilizacao-responsividade
description: Orienta estilização flexível e responsividade em apps React Native/Expo. Use quando a tarefa envolver Flexbox, StyleSheet, Styled Components, NativeWind/Tailwind CSS, adaptação para celulares e tablets, breakpoints, safe area, orientação, densidade de pixel, acessibilidade visual ou revisão de layout responsivo.
---

# Estilização e Responsividade

## Visão Geral

Use esta skill para criar interfaces React Native que se adaptem bem de telas pequenas a tablets, preservando clareza, toque confortável e consistência visual. Comece pelos padrões de estilização existentes no projeto antes de introduzir StyleSheet, Styled Components ou NativeWind.

## Fluxo de Trabalho

1. Identifique a abordagem atual de estilo: `StyleSheet`, Styled Components, NativeWind, tokens, tema e helpers de espaçamento.
2. Inspecione componentes próximos para manter padrões de layout, naming, cores, tipografia e espaçamentos.
3. Modele o layout com Flexbox, evitando dimensões fixas quando o conteúdo ou a tela pode variar.
4. Considere safe areas, teclado, orientação, tablets, fontes maiores e tamanhos mínimos de toque.
5. Teste mentalmente ou visualmente em largura compacta, telefone grande e tablet.

## Diretrizes de Layout

- Use `flex`, `flexDirection`, `gap`, `alignItems`, `justifyContent`, `flexWrap` e constraints em vez de posicionamento absoluto sempre que possível.
- Prefira `minWidth`, `maxWidth`, `minHeight`, `aspectRatio` e containers fluidos a larguras fixas.
- Garanta que textos longos quebrem linha, não estourem botões e não cubram controles vizinhos.
- Use `ScrollView` apenas quando a tela inteira precisa rolar; para coleções longas, prefira listas virtualizadas.
- Respeite `SafeAreaView` ou utilitários equivalentes em áreas próximas a notch, status bar e gestos do sistema.
- Evite layouts que dependam de uma única dimensão de aparelho ou de pixel-perfect rígido.

## Escolha de Estilização

- Use `StyleSheet` quando o projeto privilegia estilos nativos, objetos simples e baixo overhead.
- Use Styled Components quando o projeto já estrutura tema, variantes e componentes por estilo encapsulado.
- Use NativeWind quando classes utilitárias já são padrão local e aceleram composição sem perder legibilidade.
- Evite misturar estilos inline, tokens soltos e bibliotecas diferentes no mesmo componente sem uma razão clara.

## Responsividade

- Ajuste densidade de informação por largura disponível, não só por plataforma.
- Em tablets, aproveite espaço com colunas, painéis ou largura máxima; não estique conteúdo de leitura indefinidamente.
- Em telas pequenas, priorize hierarquia, truncamento consciente e ações principais acessíveis.
- Verifique estados com teclado aberto, textos traduzidos, fontes ampliadas e conteúdo vazio.

## Checklist de Revisão

- A tela funciona bem entre 5 e 13 polegadas?
- Há algum texto, botão ou card que pode estourar?
- O layout respeita safe area e teclado?
- Espaçamentos e cores vêm de tokens ou padrões do projeto?
- A solução evita dimensões fixas desnecessárias?
