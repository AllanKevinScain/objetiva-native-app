import { AnimatedView } from "@/components/animated-view";
import { Tasks } from "@/components/board-components";
import { BottomBar } from "@/components/bottom-bar";
import { TextApp } from "@/components/text-app";
import { TextfieldRHF } from "@/components/text-field-rhf";
import { theme } from "@/constants/theme";
import { useBoard } from "@/providers/board";
import { MaterialIcons } from "@expo/vector-icons";
import { useWatch } from "react-hook-form";
import { View } from "react-native";

export default function BoardPanelIndex() {
  const { tasksMethods, handleFormTaskModal, updateTaskModalType } = useBoard();

  const tasks = useWatch({ control: tasksMethods.control, name: "tasks" });

  return (
    <AnimatedView>
      <View style={{ marginTop: theme.spacing.sizes.xs }}>
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

      {tasks.length > 0 && (
        <BottomBar
          onMiddleIconPress={() => {
            updateTaskModalType("create");
            handleFormTaskModal();
          }}
        />
      )}
    </AnimatedView>
  );
}
