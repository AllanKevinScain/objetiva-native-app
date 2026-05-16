import { BOARD_TABLE_NAME } from "@/constants/async-tables";
import { isEmpty } from "@/helpers";
import { useBoardAsyncStorage } from "@/hooks/use-board-async-storage";
import { useModalType } from "@/hooks/use-modal-type";
import { useTaskAsyncStorage } from "@/hooks/use-task-async-storage";
import type { TaskSchemaInfertype } from "@/schemas";
import * as Crypto from "expo-crypto";
import { useCallback, useMemo, useState } from "react";
import { FormProvider } from "react-hook-form";
import type { ProvidersProps } from "../providers.type";
import { BoardActionsModal } from "./board-actions-modal";
import { BoardContext } from "./context";
import { useBoardActions } from "./hooks/use-board-actions";
import { useFormTaskModal } from "./hooks/use-form-task-modal";
import { useTaskForm } from "./hooks/use-task-form";
import { useTasksArray } from "./hooks/use-tasks-array";
import { TaskFormModal } from "./task-form-modal";

export function BoardProvider({ children }: ProvidersProps) {
  const [currentPageId, setPageId] = useState<string | null>(null);

  function handlePageId(id: string) {
    setPageId(id);
  }
  const { getBoard, addBoard } = useBoardAsyncStorage(BOARD_TABLE_NAME);
  const { addTask, editTask } = useTaskAsyncStorage(BOARD_TABLE_NAME);

  const { actionsModalVisible, handleActionsModal } = useBoardActions();
  const { formTaskVisible, handleFormTaskModal } = useFormTaskModal();
  const { modalType, updateModalType: updateTaskModalType } = useModalType();
  const { defaultValues, resetFormTaskValues, taskFormMethods } = useTaskForm();
  const { tasksMethods, fieldArrayTasksMethods } = useTasksArray();

  const handleSubmit = useCallback(
    async (value: TaskSchemaInfertype) => {
      try {
        if (currentPageId) {
          const board = await getBoard(currentPageId);
          if (isEmpty(board)) {
            const newData = { ...value, id: Crypto.randomUUID() };
            await addBoard({ id: currentPageId, tasks: [newData] });
            fieldArrayTasksMethods.append(newData);
          } else {
            if (modalType === "create") {
              const newData = { ...value, id: Crypto.randomUUID() };
              await addTask(currentPageId, newData);
              fieldArrayTasksMethods.append(newData);
            }

            if (modalType === "edit" && value.id) {
              await editTask(currentPageId, value.id, value);

              const index = fieldArrayTasksMethods.fields.findIndex((f) => f.id === value.id);
              if (index !== -1) fieldArrayTasksMethods.update(index, value);
            }
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        handleFormTaskModal();
        resetFormTaskValues();
      }
    },
    [
      addBoard,
      addTask,
      currentPageId,
      editTask,
      fieldArrayTasksMethods,
      getBoard,
      handleFormTaskModal,
      modalType,
      resetFormTaskValues,
    ],
  );

  const contextValues = useMemo(
    () => ({
      handleActionsModal,
      handleFormTaskModal,
      resetFormTaskValues,
      taskFormMethods,
      defaultValues,
      tasksMethods,
      fieldArrayTasksMethods,
      updateTaskModalType,
      handlePageId,
    }),
    [
      handleActionsModal,
      handleFormTaskModal,
      resetFormTaskValues,
      taskFormMethods,
      defaultValues,
      tasksMethods,
      fieldArrayTasksMethods,
      updateTaskModalType,
    ],
  );

  return (
    <BoardContext.Provider value={contextValues}>
      {children}
      <BoardActionsModal
        currentPageId={currentPageId}
        visible={actionsModalVisible}
        onRequestClose={handleActionsModal}
      />
      <FormProvider {...taskFormMethods}>
        <TaskFormModal
          modalType={modalType}
          visible={formTaskVisible}
          onRequestClose={() => {
            handleFormTaskModal();
            resetFormTaskValues();
          }}
          onSubmit={handleSubmit}
        />
      </FormProvider>
    </BoardContext.Provider>
  );
}
