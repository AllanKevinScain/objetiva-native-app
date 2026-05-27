import { PANELS_TABLE_NAME } from "@/constants/async-tables";
import { useAsyncStorage } from "@/hooks/use-async-storage";
import { usePanel } from "@/providers/panel";
import type { PanelSchemaInfertype, PanelsSchemaInfertype, TaskSchemaInfertype } from "@/schemas";
import * as Crypto from "expo-crypto";
import { useLocalSearchParams } from "expo-router";
import type { UseFieldArrayReturn } from "react-hook-form";
import type { TextInputKeyPressEvent } from "react-native";
import { useTaskAsyncStorage } from "./use-task-async-storage";

export function useTaskList(
  tasks: TaskSchemaInfertype[],
  methods: UseFieldArrayReturn<PanelsSchemaInfertype, `panels.${number}.tasks`, "key">,
) {
  const { id: panelId } = useLocalSearchParams<{ id: string }>();
  const { panelsMethods } = usePanel();
  const { getData, editData } = useAsyncStorage();

  const { append, update, remove, fields } = methods;
  const { addTask, editTask, removeTask, toggleTask } = useTaskAsyncStorage(PANELS_TABLE_NAME);

  async function newLine() {
    const task = {
      id: Crypto.randomUUID(),
      description: "",
      selected: false,
    };

    append(task);

    await addTask(panelId, task);
  }

  async function editLine(taskId: string, value?: string | null) {
    const taskIndex = tasks?.findIndex((task) => task.id === taskId);

    if (taskIndex === -1 || taskIndex === undefined || !value) return;

    const data = {
      ...tasks?.[taskIndex],
      description: value,
    };
    update(taskIndex, data);

    await editTask(panelId, data.id!, data);
  }

  async function removeLine(props: { event: TextInputKeyPressEvent; taskId: string }) {
    const { event, taskId } = props;
    const taskIndex = tasks?.findIndex((task) => task.id === taskId);
    if (taskIndex === -1 || taskIndex === undefined || fields.length === 1) return;

    const currentTask = tasks?.[taskIndex];

    if (event.nativeEvent.key === "Backspace" && currentTask?.description?.length === 0) {
      remove(taskIndex);
      await removeTask(panelId, currentTask.id!);
    }
  }

  async function handleCheck(props: { panelIndex: number; taskId: string }) {
    const { panelIndex, taskId } = props;
    const taskIndex = tasks?.findIndex((task) => task.id === taskId);

    if (taskIndex === -1 || taskIndex === undefined) return;

    const currentTask = tasks?.[taskIndex];

    panelsMethods.setValue(`panels.${panelIndex}.tasks.${taskIndex}.selected`, !currentTask.selected);

    await toggleTask(panelId, currentTask.id!);
  }

  async function replaceTasks(tasks: TaskSchemaInfertype[]) {
    let panels = ((await getData(PANELS_TABLE_NAME)) as PanelSchemaInfertype[]) || [];

    panels = panels.map((panel) => {
      if (panel.id !== panelId) return panel;

      return {
        ...panel,
        tasks,
      };
    });

    await editData(PANELS_TABLE_NAME, panels);

    return panels;
  }

  return {
    newLine,
    editLine,
    removeLine,
    handleCheck,
    replaceTasks,
  };
}
