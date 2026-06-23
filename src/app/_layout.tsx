import { NavigationPage } from "@/components/app-components";
import { theme } from "@/constants/theme";
import { PanelProvider } from "@/providers/panel";
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
  useFonts,
} from "@expo-google-fonts/roboto";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
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
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: colorScheme === "dark" ? AppDarkTheme.colors.background : AppLightTheme.colors.background,
          }}>
          <NavigationPage />
        </SafeAreaView>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      </PanelProvider>
    </ThemeProvider>
  );
}
