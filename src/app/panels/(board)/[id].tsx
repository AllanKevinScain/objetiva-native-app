import { AnimatedView } from "@/components/animated-view";
import { BottomBar, Tasks } from "@/components/board-components";
import { TextApp } from "@/components/text-app";
import { TextfieldRHF } from "@/components/text-field-rhf";
import { useBoard } from "@/providers/board";
import { MaterialIcons } from "@expo/vector-icons";
import { useWatch } from "react-hook-form";
import { View } from "react-native";
import { style } from "./style";

export default function BoardPanelIndex() {
  const { tasksMethods } = useBoard();

  const tasks = useWatch({ control: tasksMethods.control, name: "tasks" });

  return (
    <AnimatedView>
      <View style={style.inputBox}>
        <TextfieldRHF
          control={tasksMethods.control}
          name="search"
          IconLeft={MaterialIcons}
          iconLeftName="search"
          placeholder="Search"
        />
      </View>

      <View style={{ marginVertical: 20 }}>
        <TextApp type="title">Tarefas do quadro</TextApp>
      </View>

      <Tasks />

      {tasks.length > 0 && <BottomBar />}
    </AnimatedView>
  );
}
