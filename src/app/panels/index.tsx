import { BottomBar } from "@/components/bottom-bar";
import { Panels } from "@/components/panel-components";
import { TextApp } from "@/components/text-app";
import { usePanel } from "@/providers/panel";
import { View } from "react-native";

export default function PanelIndex() {
  const { handlePanelModal } = usePanel();

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <View style={{ gap: 30 }}>
        <View style={{ marginBottom: 10 }}>
          <TextApp type="subtitle" style={{ opacity: 0.6, fontSize: 16 }}>
            Gerencie seu
          </TextApp>
          <TextApp type="title" style={{ fontSize: 36 }}>
            Painel de tarefas
          </TextApp>
        </View>

        <Panels />
      </View>

      <BottomBar onMiddleIconPress={handlePanelModal} />
    </View>
  );
}
