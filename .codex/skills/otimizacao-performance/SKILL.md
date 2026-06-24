---
name: otimizacao-performance
description: Orienta otimização de performance em apps React Native/Expo. Use quando a tarefa envolver gargalos de renderização, re-renderizações excessivas, useMemo, useCallback, memo, FlatList, FlashList, listas longas, imagens pesadas, profiling, startup, navegação lenta ou melhoria de fluidez.
---

# Otimização de Performance

## Visão Geral

Use esta skill para identificar gargalos reais e melhorar fluidez em React Native sem adicionar memoização acidental. Meça ou isole o problema antes de otimizar, e preserve legibilidade quando o ganho for marginal.

## Fluxo de Trabalho

1. Reproduza o sintoma: tela lenta, scroll travando, input atrasado, navegação pesada ou startup demorado.
2. Inspecione renderizações, listas, imagens, chamadas de API, animações e computações síncronas.
3. Corrija primeiro causas estruturais: estado alto demais, props instáveis, listas mal configuradas, componentes grandes ou efeitos caros.
4. Use `memo`, `useMemo` e `useCallback` apenas quando estabilizam props caras ou evitam trabalho repetido mensurável.
5. Valide o comportamento após a otimização e rode lint/testes relevantes quando disponíveis.

## Renderização

- Mova estado para o menor escopo possível.
- Separe componentes pesados de componentes que mudam com frequência.
- Evite criar objetos, arrays e funções inline quando são props de filhos memoizados ou itens de lista.
- Use selectors estáveis em stores globais e cache para evitar re-renderizações amplas.
- Evite efeitos que escrevem estado derivado quando o valor pode ser calculado durante render com baixo custo.

## Listas Longas

- Prefira FlashList quando o projeto já usa ou quando listas grandes exigem melhor virtualização.
- Use FlatList corretamente quando a lista é moderada e não justifica dependência extra.
- Defina `keyExtractor` estável, `renderItem` estável quando necessário e componentes de item memoizados se houver custo real.
- Use `estimatedItemSize` no FlashList e considere `getItemLayout` no FlatList para itens de altura fixa.
- Evite passar objetos mutáveis ou callbacks recriados para cada item.
- Paginar, virtualizar e preservar cache em vez de renderizar tudo de uma vez.

## Imagens, Dados e Navegação

- Otimize imagens em dimensão, cache e formato antes de culpar renderização.
- Evite computações pesadas na thread JS durante transições e scroll.
- Carregue dados por demanda e use skeletons com dimensões estáveis.
- Divida telas muito grandes e adie trabalho não essencial para depois da navegação.
- Não duplique dados remotos em estado global se o cache de servidor já resolve.

## Checklist de Revisão

- O gargalo foi identificado ou ao menos isolado?
- A otimização reduz renderizações ou trabalho real?
- Listas têm keys, virtualização e tamanho estimado/configuração adequada?
- `useMemo` e `useCallback` estão protegendo algo que realmente importa?
- A solução mantém código legível e comportamento equivalente?
