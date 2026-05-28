import { Tasks } from "@/components/board-components";
import { TextApp } from "@/components/text-app";
import { View } from "react-native";

export default function BoardPanelIndex() {
  return (
    <View style={{ padding: 20, flex: 1, gap: 30 }}>
      <TextApp type="title">Tarefas do quadro</TextApp>

      <Tasks />
    </View>
  );
}
