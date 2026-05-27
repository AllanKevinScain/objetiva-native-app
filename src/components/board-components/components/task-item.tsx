import type { UseFieldArrayReturn } from "react-hook-form";
import { View } from "react-native";

import type { PanelsSchemaInfertype } from "@/schemas";
import { style } from "../style";
import { CheckTask } from "./check-item";
import { InputTask } from "./input-task";

export interface TaskItemProps {
  taskId: string;
  taskIndex: number;
  panelIndex: number;
  tasksArrayMethods: UseFieldArrayReturn<PanelsSchemaInfertype, `panels.${number}.tasks`, "key">;
}

export function TaskItem(props: TaskItemProps) {
  const { taskId, taskIndex, panelIndex, tasksArrayMethods } = props;

  return (
    <View style={style.container}>
      <CheckTask taskId={taskId} panelIndex={panelIndex} taskIndex={taskIndex} tasksArrayMethods={tasksArrayMethods} />

      <InputTask taskId={taskId} panelIndex={panelIndex} taskIndex={taskIndex} tasksArrayMethods={tasksArrayMethods} />
    </View>
  );
}
