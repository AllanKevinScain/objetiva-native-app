import { PANELS_TABLE_NAME } from "@/constants/async-tables";
import { useAppTheme } from "@/hooks/use-app-theme";
import { usePanelAsyncStorage } from "@/hooks/use-panel-async-storage";
import { usePanel } from "@/providers/panel";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Alert, TouchableOpacity, View } from "react-native";

export function HeaderBoardStack(props: { currentPageId: string }) {
  const { currentPageId } = props;

  const router = useRouter();
  const navigation = useNavigation();

  const { panelsMethods, fieldArrayPanelsMethods, resetFormPanelValues, updatePanelModalType, handlePanelModal } =
    usePanel();

  const panels = useWatch({ control: panelsMethods.control, name: "panels" });
  const currentPanel = panels?.find((p) => p.id === currentPageId);
  const { t } = useTranslation();

  useEffect(() => {
    if (currentPanel?.title) {
      navigation.setOptions({ title: currentPanel.title });
    }
  }, [currentPanel?.title, navigation]);

  const { getPanel, removePanel } = usePanelAsyncStorage(PANELS_TABLE_NAME);
  const { colors } = useAppTheme();

  async function handleRemovePanel() {
    Alert.alert(t("panels.removeTitle"), t("panels.removeMessage"), [
      {
        text: t("common.cancel"),
        style: "cancel",
      },
      {
        text: t("common.remove"),
        onPress: async () => {
          if (currentPageId) {
            const panels = panelsMethods.getValues("panels");
            const index = panels.findIndex((f) => f.id === currentPageId);

            if (index !== -1) {
              fieldArrayPanelsMethods.remove(index);

              await removePanel(currentPageId);
            }

            router.replace("/panels");
          } else {
            Alert.alert(t("common.error"), t("panels.notFound"));
          }
        },
      },
    ]);
  }

  async function handleEditPanel() {
    if (currentPageId) {
      const panel = await getPanel(currentPageId);
      if (panel) resetFormPanelValues(panel);
      updatePanelModalType("edit");
      handlePanelModal();
    } else {
      Alert.alert(t("common.error"), t("panels.notFound"));
    }
  }

  return (
    <View style={{ flexDirection: "row", gap: 20, justifyContent: "flex-end" }}>
      <TouchableOpacity
        onPress={handleRemovePanel}
        style={{ padding: 10, borderWidth: 1, borderColor: colors.secondary, borderRadius: 6 }}>
        <Ionicons name="trash" size={20} color={colors.secondary} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleEditPanel}
        style={{ padding: 10, borderWidth: 1, borderColor: colors.text, borderRadius: 6 }}>
        <Feather name="edit" size={20} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}
