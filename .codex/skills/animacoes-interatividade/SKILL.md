---
name: animacoes-interatividade
description: Orienta animações e interatividade em apps React Native/Expo. Use quando a tarefa envolver transições, microinterações, gestos, feedback visual, React Native Animated, React Native Reanimated, Gesture Handler, animações de entrada/saída, performance de animações ou polimento de sensação nativa.
---

# Animações e Interatividade

## Visão Geral

Use esta skill para criar movimento funcional, responsivo e com sensação nativa em React Native. Animações devem comunicar causa, continuidade e feedback; evite movimento decorativo que atrapalha leitura ou toque.

## Fluxo de Trabalho

1. Identifique se o projeto já usa `Animated`, React Native Reanimated ou Gesture Handler.
2. Defina o objetivo da animação: feedback, transição, orientação espacial, gesto ou estado.
3. Escolha propriedades performáticas como `opacity` e `transform` sempre que possível.
4. Mantenha animações próximas ao componente responsável, extraindo hooks apenas quando houver reutilização real.
5. Respeite acessibilidade e reduza movimento quando houver preferência do sistema ou padrão local.
6. Verifique que a interação continua responsiva durante loading, navegação e gestos repetidos.

## Escolha da API

- Use Reanimated para gestos, animações encadeadas, valores compartilhados, trabalho na UI thread e interações de alta frequência.
- Use `Animated` para transições simples quando o projeto não usa Reanimated e a animação é baixa complexidade.
- Use Gesture Handler para pan, swipe, drag, pinch e interações que precisam competir corretamente com scroll.
- Evite timers manuais para movimento; prefira APIs de animação com ciclo de vida claro.

## Diretrizes

- Use durações curtas para feedback de toque e transições mais suaves para mudanças de tela ou estado.
- Evite animar layout pesado em listas longas sem medir impacto.
- Interrompa, reverta ou atualize animações corretamente quando props mudarem durante a execução.
- Não esconda estados de erro ou loading atrás de animações longas.
- Combine haptics, pressed states e transições visuais quando isso reforçar a ação principal.
- Mantenha worklets pequenos e sem dependências desnecessárias quando usar Reanimated.

## Padrões de Interação

- Botões devem ter resposta imediata de pressed/disabled/loading.
- Cards arrastáveis precisam de limites, snap points e estado final previsível.
- Modais e sheets devem animar entrada e saída sem bloquear fechamento.
- Skeletons e loaders devem preservar dimensões para evitar saltos de layout.

## Checklist de Revisão

- A animação melhora compreensão ou feedback?
- Propriedades animadas são performáticas?
- Gestos funcionam junto com scroll e navegação?
- Há tratamento para disabled, loading e toque repetido?
- O movimento respeita acessibilidade e não causa atraso perceptível?
