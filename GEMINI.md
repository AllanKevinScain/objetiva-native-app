# Projeto Objetiva - Guia de Desenvolvimento

Este documento descreve as convenções arquiteturais, padrões de estilo e fluxos de trabalho estabelecidos para este repositório.

## 🎨 Sistema de Temas e Estilização

O projeto utiliza o `ThemeProvider` do `@react-navigation/native` como fonte única de verdade para o tema.

### Cores Base
O tema foi simplificado para 5 chaves principais, acessíveis através do hook `useAppTheme`:
- `bg`: Cor de fundo principal e superfícies.
- `text`: Cor principal para textos e ícones de alto contraste.
- `primary`: Cor de destaque principal (ex: botões de ação, headers).
- `secondary`: Cor de destaque secundária (ex: avisos, erros, estados urgentes).
- `border`: Cor para bordas, divisores e skeletons.

### Tipografia
A fonte principal do projeto é a **Roboto**.
- **Configuração:** Localizada em `src/constants/theme/fonts.ts`.
- **Uso:** Deve-se preferir o uso do componente `<TextApp />` que já integra as variações da Roboto conforme a propriedade `type`.
- **Variações disponíveis:** Regular (400), Medium (500), Bold (700), Black (900).

### Hook de Tema: `useAppTheme`
Sempre utilize o hook `useAppTheme` para acessar cores, fontes e espaçamentos. Nunca acesse `theme.color.dark.xxx` diretamente nos componentes.

```tsx
const { colors, font, spacing } = useAppTheme();
```

## 🏗️ Arquitetura de Componentes

### Padrões de UI
- **Sombras:** Utilize o padrão de `shadow` para iOS e `elevation` para Android para dar profundidade aos cards (ex: `PanelItem`, `TaskItem`).
- **Cards:** Devem possuir bordas arredondadas (preferencialmente `borderRadius: 16`) e separação clara via `border` ou `shadow`.
- **Feedback Visual:** Interações como `TouchableOpacity` devem usar `activeOpacity={0.7}` ou `0.8`.

## 📁 Estrutura de Pastas

- `src/components`: Componentes reutilizáveis e atômicos.
- `src/app`: Rotas e layouts baseados no Expo Router.
- `src/providers`: Contextos de estado global (Board, Panel).
- `src/hooks`: Hooks customizados (incluindo `useAppTheme`).
- `src/constants/theme`: Definições brutas de cores, fontes e espaçamentos.

## 🛠️ Ferramentas
- **Expo Router:** Navegação baseada em arquivos.
- **React Hook Form + Zod:** Gerenciamento e validação de formulários.
- **Lucide / Entypo / Ionicons:** Conjunto de ícones via `@expo/vector-icons`.
