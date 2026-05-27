import { usePanel } from "@/providers/panel";
import { useWatch } from "react-hook-form";

import { useTaskList } from "../hooks/use-task-list";
import { Checkbox } from "./checkbox";
import type { TaskItemProps } from "./task-item";

export function CheckTask(props: TaskItemProps) {
  const { taskId, panelIndex, taskIndex, tasksArrayMethods } = props;

  const { panelsMethods } = usePanel();

  const tasks = useWatch({ control: panelsMethods.control, name: `panels.${panelIndex}.tasks` });
  const selected = useWatch({
    control: panelsMethods.control,
    name: `panels.${panelIndex}.tasks.${taskIndex}.selected`,
  });
  const { handleCheck } = useTaskList(tasks, tasksArrayMethods);

  return <Checkbox handleCheck={() => handleCheck({ panelIndex, taskId })} selected={selected} />;
}
