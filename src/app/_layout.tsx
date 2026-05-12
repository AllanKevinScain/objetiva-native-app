import { Header } from "@/components/header";
import { PANELS_TABLE_NAME } from "@/constants/async-tables";
import { theme } from "@/constants/theme";
import { isEmpty } from "@/helpers";
import { usePanelAsyncStorage } from "@/hooks/use-panel-async-storage";
import { BoardProvider } from "@/providers/board";
import { PanelProvider } from "@/providers/panel";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: theme.color.dark.background,
    card: theme.color.dark.background,
    text: theme.color.dark.textPrimary,
    border: theme.color.dark.border,
    primary: theme.color.dark.primary,
  },
};

export default function RootLayout() {
  const { getPanel } = usePanelAsyncStorage(PANELS_TABLE_NAME);

  return (
    <ThemeProvider value={CustomDarkTheme}>
      <PanelProvider>
        <BoardProvider>
          <Stack
            screenOptions={{
              header: async (header) => {
                const {
                  route: { name, params },
                  back,
                } = header;

                let panel = undefined;
                const typedParam = params as { id: string };
                if (!isEmpty(params)) {
                  panel = await getPanel(typedParam.id);
                }

                return <Header name={panel?.title || name} back={back} isPrincipalPage={name.includes("index")} />;
              },
            }}
          />
        </BoardProvider>
        <StatusBar style="dark" />
      </PanelProvider>
    </ThemeProvider>
  );
}
