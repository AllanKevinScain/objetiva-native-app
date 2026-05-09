# Projeto Objetiva - Diretrizes e Arquitetura

Este arquivo contém as diretrizes de desenvolvimento, padrões de design e arquitetura do projeto.

## Sistema de Temas

O projeto utiliza um sistema de temas dinâmico que suporta modo Claro (Light) e Escuro (Dark).

- **Cores:** Definidas em `src/constants/colors.ts`.
- **Hook de Acesso:** Utilize sempre o hook `useThemeColor` para garantir que os componentes respondam às mudanças de tema do sistema.
  ```typescript
  const backgroundColor = useThemeColor({}, 'background');
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

## Estilização e Layout

- **Espaçamento:** Utilize as constantes em `src/constants/spacing.ts`.
- **Layout de Cards:** Para listas de itens, prefira o padrão de cards com a cor `surface`, bordas arredondadas (12-16px) e sombras leves.
- **SafeArea:** Evite o uso de `SafeAreaView` global se estiver usando um Header customizado que já gerencia o topo da tela.
