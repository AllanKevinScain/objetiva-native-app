---
name: testes-automatizados
description: Orienta criação e manutenção de testes automatizados em apps React Native/Expo. Use quando a tarefa envolver Jest, React Native Testing Library, testes unitários, testes de integração de componentes, mocks, hooks, stores, navegação, requests, snapshots, cobertura ou correção de testes quebrados.
---

# Testes Automatizados

## Visão Geral

Use esta skill para escrever testes que protegem comportamento real do app, não detalhes frágeis de implementação. Priorize Jest e React Native Testing Library para validar componentes, hooks, fluxos e interações como o usuário perceberia.

## Fluxo de Trabalho

1. Inspecione configuração de Jest, setup files, mocks globais, scripts e exemplos de testes existentes.
2. Identifique o comportamento a proteger: renderização, interação, validação, navegação, request, estado ou erro.
3. Escolha o menor escopo útil: unidade pura, hook, componente integrado ou fluxo de tela.
4. Renderize com providers reais ou helpers de teste do projeto quando houver tema, navegação, query client ou store.
5. Use queries acessíveis (`getByRole`, `getByText`, labels) e eventos que representem a interação do usuário.
6. Rode o teste afetado e ajuste mocks/async waits sem mascarar falhas reais.

## Jest

- Teste funções puras com entradas e saídas claras.
- Mocke fronteiras externas: rede, storage, módulos nativos, timers, analytics e navegação quando necessário.
- Evite mocks excessivos de componentes internos; isso reduz confiança no teste.
- Use fake timers apenas quando o comportamento realmente depende de tempo.
- Mantenha nomes de testes descritivos sobre comportamento, não sobre implementação.

## React Native Testing Library

- Prefira assertions sobre o que aparece, desaparece, habilita, desabilita ou muda após interação.
- Use `findBy*` e `waitFor` para efeitos assíncronos, requests e hidratação.
- Evite snapshot grande como principal garantia; use snapshots só para casos pequenos e estáveis.
- Teste estados de loading, erro, vazio e sucesso quando a tela depende de dados.
- Garanta providers mínimos e reset de estado/cache entre testes.

## Mocks Comuns

- Para TanStack Query, crie `QueryClient` isolado por teste e desative retry quando necessário.
- Para navegação, mocke `router`/`navigation` ou use wrapper real conforme padrão do projeto.
- Para storage, use mocks previsíveis e limpe dados entre testes.
- Para módulos nativos, declare mocks no setup global se a dependência quebra o ambiente Jest.

## Checklist de Revisão

- O teste falha se o comportamento principal quebrar?
- O teste evita depender de estrutura interna frágil?
- Estados assíncronos foram aguardados corretamente?
- Providers, cache e mocks são isolados por teste?
- O comando de teste relevante foi executado ou a limitação foi registrada?
