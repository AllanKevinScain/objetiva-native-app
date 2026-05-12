import type { TasksSchemaInfertype } from "@/schemas";
import { useFieldArray, useForm } from "react-hook-form";

export function useTasksArray() {
  const tasksMethods = useForm<TasksSchemaInfertype>({
    defaultValues: { tasks: [], search: undefined },
  });

  const fieldArrayTasksMethods = useFieldArray({
    control: tasksMethods.control,
    name: "tasks",
    keyName: "key",
  });

  return {
    tasksMethods,
    fieldArrayTasksMethods,
  };
}
