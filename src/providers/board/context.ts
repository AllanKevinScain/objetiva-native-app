import type { ModalType } from "@/hooks/use-modal-type";
import type { TaskSchemaInfertype, TasksSchemaInfertype } from "@/schemas";
import { createContext } from "react";
import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

type BoardContextType = {
  handleActionsModal: () => void;
  handleFormTaskModal: () => void;
  updateTaskModalType: (_: ModalType) => void;
  handlePageId: (id: string) => void;

  // task form
  taskFormMethods: UseFormReturn<TaskSchemaInfertype>;
  defaultValues: TaskSchemaInfertype;
  resetFormTaskValues: (_?: TaskSchemaInfertype) => void;

  // tasks array
  tasksMethods: UseFormReturn<TasksSchemaInfertype>;
  fieldArrayTasksMethods: UseFieldArrayReturn<TasksSchemaInfertype, "tasks", "key">;
};

export const BoardContext = createContext<BoardContextType>({
  handleActionsModal: () => null,
  handleFormTaskModal: () => null,
  updateTaskModalType: () => null,
  handlePageId: () => null,
  taskFormMethods: {} as UseFormReturn<TaskSchemaInfertype>,
  defaultValues: {} as TaskSchemaInfertype,
  resetFormTaskValues: () => null,
  tasksMethods: {} as UseFormReturn<TasksSchemaInfertype>,
  fieldArrayTasksMethods: {} as UseFieldArrayReturn<TasksSchemaInfertype, "tasks", "key">,
});
