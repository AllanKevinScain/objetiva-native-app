import { Header } from "@/components/header";
import { PANELS_TABLE_NAME } from "@/constants/async-tables";
import { isEmpty } from "@/helpers";
import { usePanelAsyncStorage } from "@/hooks/use-panel-async-storage";
import { BoardProvider } from "@/providers/board";
import { PanelProvider } from "@/providers/panel";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const { getPanel } = usePanelAsyncStorage(PANELS_TABLE_NAME);
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
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
        <StatusBar style="auto" />
      </PanelProvider>
    </ThemeProvider>
  );
}
