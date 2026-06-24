---
name: navegacao-fluida
description: Orienta navegação em apps React Native/Expo com Expo Router ou React Navigation. Use quando a tarefa envolver fluxos de autenticação, tabs, stacks, nested navigators, deep links, guards, headers, params tipados, transições, performance de telas, ou organização de rotas.
---

# Navegação Fluida

## Visão Geral

Use esta skill para estruturar navegação previsível, performática e fácil de manter em React Native/Expo. Preserve o roteador já adotado pelo projeto: Expo Router quando a estrutura for baseada em arquivos, React Navigation quando houver configuração explícita de navigators.

## Fluxo de Trabalho

1. Identifique o sistema de navegação atual, diretórios de rotas, layouts, navigators e convenções de nomes.
2. Modele os fluxos principais: autenticação, onboarding, área logada, tabs, stacks internos e modais.
3. Defina guards e redirecionamentos em pontos de layout/alto nível, evitando lógica duplicada em telas.
4. Tipar params e links para reduzir navegações quebradas.
5. Avaliar estado de sessão, splash/loading inicial e restauração de sessão antes de mostrar telas protegidas.
6. Testar navegação de ida, volta, deep link e refresh/reload quando aplicável.

## Diretrizes

- Mantenha fluxos de auth separados dos fluxos autenticados.
- Use tabs para destinos principais e estáveis; use stacks para progressão dentro de um destino.
- Evite passar objetos grandes por params; passe IDs e busque dados na tela de destino.
- Coloque opções de header próximas ao layout/navigator responsável.
- Use lazy loading, memoização e limites de responsabilidade para telas pesadas.
- Preserve comportamento nativo de back button no Android e gestos no iOS.
- Prefira nomes de rota claros e consistentes com o domínio do app.

## Expo Router

- Use grupos de rotas para separar `(auth)`, `(tabs)` e fluxos internos sem afetar URL.
- Coloque decisões de sessão em `_layout.tsx` ou camadas equivalentes.
- Use `router.replace` para impedir retorno a telas de login após autenticação.
- Mantenha params compatíveis com serialização e navegação por link.

## React Navigation

- Defina tipos de param list por navigator e propague para hooks.
- Organize `Stack`, `Tab` e `Drawer` por fluxo, não por conveniência momentânea.
- Use `navigation.reset` ou troca condicional de navigator para mudanças de sessão.
- Evite nested navigators desnecessários; cada nível deve representar uma decisão real de UX.

## Checklist de Revisão

- O usuário consegue voltar de forma previsível?
- Auth, onboarding e área logada estão separados?
- Params são tipados e serializáveis?
- Deep links e estados iniciais foram considerados?
- A estrutura de arquivos/navigators segue o padrão do projeto?
