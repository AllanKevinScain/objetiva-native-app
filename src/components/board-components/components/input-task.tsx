import { useAppTheme } from "@/hooks/use-app-theme";
import { usePanel } from "@/providers/panel";
import { Controller, useWatch } from "react-hook-form";
import { TextInput } from "react-native";

import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { useTaskList } from "../hooks/use-task-list";
import type { TaskItemProps } from "./task-item";

export function InputTask(props: TaskItemProps) {
  const { taskId, taskIndex, panelIndex, tasksArrayMethods, onFocus, onRemove, inputRef } = props;

  const { colors, font } = useAppTheme();
  const { panelsMethods } = usePanel();

  const tasks = useWatch({ control: panelsMethods.control, name: `panels.${panelIndex}.tasks` });
  const selected = useWatch({
    control: panelsMethods.control,
    name: `panels.${panelIndex}.tasks.${taskIndex}.selected`,
  });
  const { editLine, newLine, removeLine, replaceTasks } = useTaskList(tasks, tasksArrayMethods);

  useFocusEffect(
    useCallback(() => {
      return () => {
        const currentTasks = panelsMethods.getValues(`panels.${panelIndex}.tasks`);

        replaceTasks(currentTasks);
      };
    }, [panelIndex, panelsMethods, replaceTasks]),
  );

  return (
    <Controller
      control={panelsMethods.control}
      name={`panels.${panelIndex}.tasks.${taskIndex}.description`}
      render={({ field: { value, onChange } }) => (
        <TextInput
          ref={inputRef}
          value={value ?? undefined}
          onChangeText={onChange}
          autoFocus={taskIndex === tasksArrayMethods.fields.length - 1}
          multiline
          submitBehavior="submit"
          style={{
            flex: 1,
            fontSize: 16,
            color: colors.text,
            fontFamily: font.regular,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            textAlignVertical: "top",
            textDecorationLine: selected ? "line-through" : "none",
          }}
          onSubmitEditing={newLine}
          onFocus={onFocus}
          onBlur={() => editLine(taskId, value)}
          onKeyPress={async (e) => {
            const wasRemoved = await removeLine({
              event: e,
              taskId,
            });

            if (wasRemoved) onRemove?.();
          }}
        />
      )}
    />
  );
}
