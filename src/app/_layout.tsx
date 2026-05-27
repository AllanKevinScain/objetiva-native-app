import { theme } from "@/constants/theme";
import { useAsyncStorage } from "@/hooks/use-async-storage";
import { BoardProvider, useBoard } from "@/providers/board";
import { PanelProvider, usePanel } from "@/providers/panel";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
  useFonts,
} from "@expo-google-fonts/roboto";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { DarkTheme, DefaultTheme, ThemeProvider, useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Alert, TouchableOpacity, useColorScheme } from "react-native";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: theme.color.dark.bg,
    card: theme.color.dark.bg,
    text: theme.color.dark.text,
    border: theme.color.dark.border,
    primary: theme.color.dark.primary,
  },
};

const AppLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.color.light.bg,
    card: theme.color.light.bg,
    text: theme.color.light.text,
    border: theme.color.light.border,
    primary: theme.color.light.primary,
  },
};

function NavigationPage() {
  const { handleActionsModal } = useBoard();
  const { fieldArrayPanelsMethods } = usePanel();
  const { clearAll } = useAsyncStorage();
  const { colors } = useTheme();

  async function clearAllData() {
    await clearAll();
    fieldArrayPanelsMethods.replace([]);
  }

  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          color: colors.text,
          fontFamily: theme.font.bold,
        },
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerShadowVisible: false,
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
              <Ionicons name="trash" size={20} color={colors.primary} />
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
                <FontAwesome5 name="ellipsis-v" size={20} color={colors.primary} />
              </TouchableOpacity>
            ),
          };
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? AppDarkTheme : AppLightTheme}>
      <PanelProvider>
        <BoardProvider>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor:
                colorScheme === "dark" ? AppDarkTheme.colors.background : AppLightTheme.colors.background,
            }}>
            <NavigationPage />
          </SafeAreaView>
        </BoardProvider>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </PanelProvider>
    </ThemeProvider>
  );
}
