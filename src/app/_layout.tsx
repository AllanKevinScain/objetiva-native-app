import { theme } from "@/constants/theme";
import { useAsyncStorage } from "@/hooks/use-async-storage";
import { useThemeColor } from "@/hooks/use-theme-color";
import { BoardProvider, useBoard } from "@/providers/board";
import { PanelProvider, usePanel } from "@/providers/panel";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, TouchableOpacity } from "react-native";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

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

function NavigationPage() {
  const { handleActionsModal } = useBoard();
  const { fieldArrayPanelsMethods } = usePanel();
  const { clearAll } = useAsyncStorage();

  async function clearAllData() {
    await clearAll();
    fieldArrayPanelsMethods.replace([]);
  }
  const textOnPrimary = useThemeColor({}, "textOnPrimary");

  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          color: theme.color.dark.textPrimary,
        },
        headerStyle: {
          backgroundColor: theme.color.dark.primary,
        },
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="panels/index"
        options={{
          title: "Seja bem vindo!",
          headerRight: () => (
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => {
                Alert.alert("Limpar memória", "Deseja remover todo seu progresso?", [
                  {
                    text: "Cancelar",
                    style: "cancel",
                  },
                  {
                    text: "Limpar",
                    style: "default",
                    onPress: clearAllData,
                  },
                ]);
              }}>
              <Ionicons name="trash" size={20} color={textOnPrimary} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="panels/(board)/[id]"
        options={({ route }) => {
          const typedParam = route.params as { title: string };
          return {
            title: typedParam?.title || route.name,
            animation: "slide_from_right",
            headerRight: () => (
              <TouchableOpacity style={{ padding: 5 }} onPress={handleActionsModal}>
                <FontAwesome5 name="ellipsis-v" size={20} color={textOnPrimary} />
              </TouchableOpacity>
            ),
          };
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider value={CustomDarkTheme}>
      <PanelProvider>
        <BoardProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <NavigationPage />
          </SafeAreaView>
        </BoardProvider>
        <StatusBar style="dark" />
      </PanelProvider>
    </ThemeProvider>
  );
}
