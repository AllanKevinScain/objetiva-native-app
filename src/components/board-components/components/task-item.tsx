import type { UseFieldArrayReturn } from "react-hook-form";
import type { Ref } from "react";
import type { TextInput } from "react-native";
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
  onFocus?: () => void;
  onRemove?: () => void;
  onSubmitTask?: () => boolean;
  inputRef?: Ref<TextInput>;
}

export function TaskItem(props: TaskItemProps) {
  const { taskId, taskIndex, panelIndex, tasksArrayMethods, onFocus, onRemove, onSubmitTask, inputRef } = props;

  return (
    <View style={style.container}>
      <CheckTask taskId={taskId} panelIndex={panelIndex} taskIndex={taskIndex} tasksArrayMethods={tasksArrayMethods} />

      <InputTask
        taskId={taskId}
        panelIndex={panelIndex}
        taskIndex={taskIndex}
        tasksArrayMethods={tasksArrayMethods}
        onFocus={onFocus}
        onRemove={onRemove}
        onSubmitTask={onSubmitTask}
        inputRef={inputRef}
      />
    </View>
  );
}
