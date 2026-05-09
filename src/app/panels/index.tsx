import { AnimatedScrollView, TextApp, TouchableOpacityApp } from "@/components";
import { theme } from "@/constants/theme";
import { Entypo } from "@expo/vector-icons";
import { FlatList, View } from "react-native";
import { BottomBar, Panels } from "./components";

export default function PanelIndex() {
  return (
    <AnimatedScrollView>
      <View style={{ gap: 30 }}>
        <View>
          <TextApp type="subtitle" style={{ opacity: 0.7 }}>
            Gerencie seu
          </TextApp>
          <TextApp type="title" style={{ fontSize: 32, fontWeight: "800" }}>
            Painel de tarefas
          </TextApp>
        </View>

        <FlatList
          data={["grid", "row"]}
          keyExtractor={(item) => item}
          numColumns={1}
          contentContainerStyle={{
            gap: 20,
            flexDirection: "row",
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacityApp
                key={item}
                variant="ghost"
                style={{ padding: 10, borderRadius: theme.spacing.borderRadius.lg }}>
                <Entypo size={24} name={item === "grid" ? "grid" : "list"} />
              </TouchableOpacityApp>
            );
          }}
        />

        <Panels />
      </View>

      <BottomBar />
    </AnimatedScrollView>
  );
}
