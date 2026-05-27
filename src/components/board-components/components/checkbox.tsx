import { usePanel } from "@/providers/panel";
import { FontAwesome5 } from "@expo/vector-icons";
import { useWatch } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";
import { useTaskList } from "../hooks/use-task-list";
import { style } from "../style";
import type { TaskItemProps } from "./task-item";

export function Checkbox(props: TaskItemProps) {
  const { taskId, panelIndex, taskIndex, tasksArrayMethods } = props;

  const { colors } = useAppTheme();
  const { panelsMethods } = usePanel();

  const tasks = useWatch({ control: panelsMethods.control, name: `panels.${panelIndex}.tasks` });
  const selected = useWatch({
    control: panelsMethods.control,
    name: `panels.${panelIndex}.tasks.${taskIndex}.selected`,
  });
  const { handleCheck } = useTaskList(tasks, tasksArrayMethods);

  return (
    <TouchableOpacity onPress={() => handleCheck({ panelIndex, taskId })}>
      <View
        style={[
          style.containerBall,
          selected
            ? {
                backgroundColor: colors.primary,
                borderColor: colors.border,
              }
            : {
                borderColor: "white",
              },
        ]}>
        {selected && <FontAwesome5 name="check" color="white" size={18} />}
      </View>
    </TouchableOpacity>
  );
}
