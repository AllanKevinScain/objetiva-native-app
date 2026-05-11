import { AnimatedView } from "@/components/animated-view";
import { TextApp } from "@/components/text-app";
import { TouchableOpacityApp } from "@/components/touchableopacity-app";
import { View } from "react-native";

export default function BoardPanelIndex() {
  return (
    <AnimatedView>
      <View style={{ marginBottom: 20 }}>
        <TextApp type="title">Tarefas do quadro</TextApp>
      </View>

      <TouchableOpacityApp style={{ marginTop: 20 }}>Adicionar Nova Tarefa</TouchableOpacityApp>
    </AnimatedView>
  );
}
