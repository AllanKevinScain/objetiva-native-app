---
name: consumo-apis-cache
description: Orienta consumo de APIs, cache e estados de requisição em apps React Native/Expo. Use quando a tarefa envolver Axios, Fetch, clientes HTTP, autenticação em requests, interceptors, TanStack Query/React Query, mutations, invalidação de cache, optimistic updates, loading/error states, paginação ou sincronização de dados remotos.
---

# Consumo de APIs e Cache

## Visão Geral

Use esta skill para conectar o app a serviços externos com contratos claros, cache eficiente e estados de requisição consistentes. Trate dados de servidor como responsabilidade do cliente HTTP e do TanStack Query sempre que possível.

## Fluxo de Trabalho

1. Inspecione o cliente HTTP existente, providers, query client, hooks e padrões de tratamento de erro.
2. Defina contratos de request/response e transforme DTOs para modelos usados pela UI quando necessário.
3. Escolha `useQuery`, `useMutation`, infinite query ou chamada imperativa conforme o ciclo de vida do dado.
4. Crie query keys estáveis, específicas e derivadas dos filtros reais.
5. Configure invalidação, atualização otimista ou `setQueryData` de acordo com o impacto da mutation.
6. Exponha hooks de domínio para telas, não chamadas HTTP cruas espalhadas pela UI.
7. Verifique loading, empty, error, retry e offline quando fizer sentido para o fluxo.

## Cliente HTTP

- Reuse Axios ou Fetch conforme o padrão do projeto.
- Centralize base URL, headers, autenticação, refresh token e tratamento de erros recorrentes.
- Evite engolir erros; normalize-os para uma forma que a UI consiga exibir ou tratar.
- Use abort/cancelamento quando telas podem desmontar durante requests longos.
- Não misture detalhes de transporte com componentes visuais.

## TanStack Query

- Use query keys em formato array com domínio e parâmetros: `['orders', companyId, filters]`.
- Defina `staleTime` conforme a volatilidade do dado; não use cache infinito por padrão.
- Invalide queries relacionadas após mutations que alteram listas ou detalhes.
- Prefira optimistic update só quando rollback e consistência forem claros.
- Use `enabled` para queries dependentes de sessão, IDs ou filtros obrigatórios.
- Para paginação, preservar dados anteriores quando isso melhora a continuidade visual.

## Estados de UI

- Diferencie carregamento inicial de refetch em segundo plano.
- Exiba empty state quando a requisição teve sucesso sem itens.
- Preserve dados existentes durante refetch sempre que isso evitar piscadas desnecessárias.
- Garanta que erros de autenticação, permissão e conectividade tenham tratamento distinto quando o app precisar.

## Checklist de Revisão

- A query key representa todos os parâmetros que mudam o resultado?
- O cache é a fonte de verdade para dados remotos?
- Mutations invalidam ou atualizam os dados afetados?
- Erros e loading states estão claros para a tela?
- Contratos externos estão tipados e isolados da UI?
