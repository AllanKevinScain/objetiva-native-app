---
name: gerenciamento-estado-global
description: Orienta arquitetura e implementação de estado global em apps React Native/Expo. Use quando a tarefa envolver dados compartilhados entre telas, Zustand, Redux Toolkit, Context API, persistência de estado, selectors, actions, stores, sincronização com cache remoto, ou refatoração de estado local para global.
---

# Gerenciamento de Estado Global

## Visão Geral

Use esta skill para decidir onde o estado deve viver e implementar estado compartilhado com baixo acoplamento. Diferencie estado global de domínio, estado de servidor/cache e estado puramente visual antes de escolher uma ferramenta.

## Escolha da Ferramenta

- Use estado local quando o dado pertence a um componente ou fluxo pequeno.
- Use Context API para valores estáveis e simples, como tema, sessão atual ou dependências de alto nível.
- Use Zustand para estado global leve, ergonomia direta, stores pequenas e selectors simples.
- Use Redux Toolkit quando houver fluxos complexos, muitos eventos, debugging exigente, middleware, normalização extensa ou padrões já existentes no projeto.
- Use TanStack Query para dados remotos/cache de servidor; não duplique esses dados em store global sem motivo claro.

## Fluxo de Trabalho

1. Mapeie quem lê, quem escreve, quando expira e se o dado vem do servidor.
2. Procure stores, providers e hooks existentes antes de criar novos.
3. Defina o menor contrato público: state, actions e selectors necessários.
4. Evite expor setters genéricos quando uma action de domínio deixa a intenção mais clara.
5. Adicione persistência só para dados que precisam sobreviver a reload, logout ou fechamento do app.
6. Valide renderizações: selectors estáveis, shallow compare quando aplicável e ações fora da árvore visual quando possível.

## Padrões Recomendados

- Separar estado de domínio de estado de interface temporário.
- Preferir hooks de acesso (`useAuthStore`, `useCartActions`) a imports diretos espalhados.
- Manter stores pequenas por domínio, não uma store única gigantesca.
- Definir ações com nomes de negócio, como `signIn`, `selectCompany`, `clearDraft`.
- Tratar reset de estado em logout, troca de usuário e limpeza de cache.
- Evitar sincronização manual entre store global e cache remoto; escolher uma fonte de verdade.

## Checklist de Revisão

- Este estado realmente precisa ser global?
- Existe uma fonte de verdade única?
- Os selectors evitam renderizações desnecessárias?
- O reset em logout/troca de conta está coberto?
- Persistência, serialização e migração foram consideradas?
