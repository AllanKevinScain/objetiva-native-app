---
name: typescript-avancado
description: Orienta uso avançado de TypeScript em apps React Native/Expo. Use quando a tarefa envolver tipagem estática, refatoração de tipos, contratos de API, generics, unions discriminadas, narrowing, DTOs, props, hooks, stores, navegação tipada, remoção de any/unknown inseguro, ou revisão de segurança de tipos.
---

# TypeScript Avançado

## Visão Geral

Use esta skill para tornar o código React Native/Expo mais autoexplicativo, refatorável e resistente a bugs por meio de tipagem estática forte. Priorize padrões já existentes no projeto antes de introduzir novos tipos ou abstrações.

## Fluxo de Trabalho

1. Inspecione `tsconfig`, convenções locais, aliases, tipos compartilhados e exemplos próximos antes de editar.
2. Modele dados por contratos claros: tipos de domínio, DTOs de API, parâmetros de navegação, payloads de ações e props públicas.
3. Prefira inferência local quando ela for legível; adicione tipos explícitos nas fronteiras do sistema.
4. Elimine `any` e type assertions frágeis quando houver caminho seguro com narrowing, schemas, guards ou tipos derivados.
5. Rode verificação TypeScript, lint ou testes relevantes quando disponíveis.

## Diretrizes

- Use `type` para composições, unions, mapped types e contratos simples; use `interface` quando o projeto já usa esse padrão para objetos extensíveis.
- Modele estados assíncronos com unions discriminadas quando houver combinações inválidas de flags.
- Use `as const`, `satisfies`, `keyof`, indexed access types e generics quando melhorarem a relação entre dados e código consumidor.
- Evite duplicar tipos que podem ser derivados de constantes, schemas, rotas ou funções existentes.
- Trate `unknown` em fronteiras externas e valide antes de promover para tipos internos confiáveis.
- Para componentes, tipar props públicas com nomes de domínio e evitar acoplamento a detalhes internos.
- Para hooks, explicitar retorno quando isso melhora a API consumidora; manter inferência quando o retorno é simples.

## React Native e Expo

- Tipar rotas, params e links profundos junto ao sistema de navegação usado no projeto.
- Separar tipos de API dos tipos usados pela UI quando houver transformação de formato, nullability ou datas.
- Em listas, forms e callbacks, proteger contra valores opcionais e estados de carregamento sem esconder erros com `!`.
- Manter tipos portáveis entre iOS, Android e web quando o app usa Expo multi-plataforma.

## Checklist de Revisão

- O tipo expressa uma regra real do domínio?
- Há `any`, `as`, `!` ou casts que podem mascarar bug?
- O contrato de entrada e saída está claro nas fronteiras da feature?
- A refatoração futura falharia em compile time se quebrar o contrato?
- A solução segue o estilo já usado no repositório?
