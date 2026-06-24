import { Tasks } from "@/components/board-components";
import { TextApp } from "@/components/text-app";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function BoardPanelIndex() {
  const { t } = useTranslation();

  return (
    <View style={{ padding: 20, flex: 1, gap: 30 }}>
      <TextApp type="title">{t("tasks.title")}</TextApp>

      <Tasks />
    </View>
  );
}
