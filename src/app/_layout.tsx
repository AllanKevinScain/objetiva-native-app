import { Header } from "@/components";
import { PANELS_TABLE_NAME } from "@/constants/async-tables";
import { usePanelAsyncStorage } from "@/hooks/use-panel-async-storage";
import { PanelProvider } from "@/providers";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { getPanel } = usePanelAsyncStorage(PANELS_TABLE_NAME);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PanelProvider>
        <Stack
          screenOptions={{
            header: async (header) => {
              const {
                route: { name, params },
                back,
              } = header;
              let aux = params as { id: string };
              if (aux.id) {
                const panels = await getPanel(aux.id);
                return <Header name={panels?.title!} back={back} />;
              }

              return <Header name={name.includes("index") ? "Painel principal" : name} back={back} />;
            },
          }}
        />
        <StatusBar style="auto" />
      </PanelProvider>
    </ThemeProvider>
  );
}
