import { HeaderBoardStack } from "@/components/board-components/header-board-stack";
import { theme } from "@/constants/theme";
import { useAsyncStorage } from "@/hooks/use-async-storage";
import { usePanel } from "@/providers/panel";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { Alert, TouchableOpacity } from "react-native";

export function NavigationPage() {
  const { fieldArrayPanelsMethods } = usePanel();
  const { clearAll } = useAsyncStorage();
  const { colors } = useTheme();
  const { t } = useTranslation();

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
          title: t("navigation.welcome"),
          headerRight: () => (
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => {
                Alert.alert(t("navigation.clearMemoryTitle"), t("navigation.clearMemoryMessage"), [
                  {
                    text: t("common.cancel"),
                    style: "cancel",
                  },
                  {
                    text: t("navigation.clear"),
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
          const typedParam = route.params as { title: string; id: string };
          return {
            title: typedParam?.title || route.name,
            animation: "slide_from_right",
            headerRight: () => <HeaderBoardStack currentPageId={typedParam.id} />,
          };
        }}
      />
    </Stack>
  );
}
