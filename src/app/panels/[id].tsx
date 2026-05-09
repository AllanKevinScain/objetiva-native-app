import { AnimatedScrollView, TextApp, TouchableOpacityApp } from "@/components";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function BoardPanelIndex() {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log("🚀 ~ BoardPanelIndex ~ id:", id);

  return (
    <AnimatedScrollView>
      <View style={{ marginBottom: 20 }}>
        <TextApp type="title">Tarefas do quadro</TextApp>
      </View>

      <TouchableOpacityApp style={{ marginTop: 20 }}>Adicionar Nova Tarefa</TouchableOpacityApp>
    </AnimatedScrollView>
  );
}
