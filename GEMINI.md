# Projeto Objetiva - Diretrizes e Arquitetura

Este arquivo contém as diretrizes de desenvolvimento, padrões de design e arquitetura do projeto.

## Sistema de Temas

O projeto utiliza um sistema de temas dinâmico que suporta modo Claro (Light) e Escuro (Dark).

- **Cores:** Definidas em `src/constants/colors.ts`.
- **Hook de Acesso:** Utilize sempre o hook `useThemeColor` para garantir que os componentes respondam às mudanças de tema do sistema.
  ```typescript
  const backgroundColor = useThemeColor({}, "background");
  ```
- **ThemeProvider:** O `ThemeProvider` está configurado no `src/app/_layout.tsx`, integrando-se ao `react-navigation`.

## Componentes Core

### TextApp

Componente central para textos. Suporta diferentes tipos (`title`, `subtitle`, `default`, `defaultSemiBold`, `link`) e cores dinâmicas via props `lightColor` e `darkColor`.

### TouchableOpacityApp

Botão padrão do sistema.

- **Variantes:** `primary` (padrão), `secondary`, `ghost`.
- **Comportamento:** Gerencia automaticamente estados de `loading` e `disabled` com feedback visual e cores do tema.

### Header

Componente de cabeçalho customizado inserido nas `screenOptions` do Expo Router.

- Ocupa a área correta no topo da tela, respeitando o `StatusBar` no Android e o `SafeAre` no iOS.
- Recebe automaticamente informações de navegação (`back`) e nome da rota.

### AnimatedScrollView

Componente padrão para telas com scroll.

- Já possui `padding` e `gap` pré-configurados para manter a consistência visual.
- Utiliza `react-native-reanimated`.

## Estrutura de Navegação

- Utiliza **Expo Router** (File-based routing).
- Rotas principais localizadas em `src/app/`.
- Grupos de telas organizados em subdiretórios (ex: `src/app/panels/`).

### Navegação e Parâmetros

Ao realizar a exclusão ou edição de um item que possua parâmetros dinâmicos (como `id`), prefira utilizar `router.replace` ao retornar para a lista principal ou tela anterior. Isso garante que a rota antiga seja removida da pilha de navegação, limpando os parâmetros do contexto global e evitando que o usuário retorne a um recurso inexistente via botão "voltar".

## Estilização e Layout

- **Espaçamento:** Utilize as constantes em `src/constants/spacing.ts`.
- **Layout de Cards:** Para listas de itens, prefira o padrão de cards com a cor `surface`, bordas arredondadas (12-16px) e sombras leves.
- **SafeArea:** Evite o uso de `SafeAreaView` global se estiver usando um Header customizado que já gerencia o topo da tela.

## Gerenciamento de Estado e Performance

### Estabilidade de Referências

Ao criar Providers, sempre utilize `useMemo` para o valor do contexto e `useCallback` para as funções. Isso evita renderizações desnecessárias e loops infinitos em componentes que utilizam `useEffect` com essas funções como dependência.

### Atualização de Listas (FlatList)

Para garantir que o `FlatList` reflita mudanças em objetos complexos ou arrays gerenciados por formulários (React Hook Form):

- Utilize `watch()` ou `useWatch()` para obter os dados em tempo real.
- Utilize a prop `extraData` passando o próprio array de dados para forçar a re-renderização quando houver mudanças internas nos itens.

### Persistência de Dados

O carregamento inicial de dados (ex: via AsyncStorage) deve ser feito em um `useEffect` com dependências estáveis. Evite incluir objetos de métodos (como os retornados por `useFieldArray`) diretamente nas dependências se eles não forem estáveis.
