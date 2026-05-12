import type { TaskSchemaInfertype } from "@/schemas";
import { taskSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

export function useTaskForm() {
  const defaultValues: TaskSchemaInfertype = useMemo(
    () => ({
      title: "",
      description: "",
      limitTime: new Date(),
      limitDate: new Date(),
      flag: "optional",
      selected: false,
    }),
    [],
  );

  const taskFormMethods = useForm<TaskSchemaInfertype>({
    resolver: zodResolver(taskSchema),
    defaultValues,
  });

  const resetFormTaskValues = useCallback(
    (data?: TaskSchemaInfertype) => {
      taskFormMethods.reset(data ? data : defaultValues);
    },
    [defaultValues, taskFormMethods],
  );

  return {
    taskFormMethods,
    defaultValues,
    resetFormTaskValues,
  };
}
