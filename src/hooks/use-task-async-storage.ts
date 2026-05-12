import type { BoardSchemaInfertype, TaskSchemaInfertype } from "@/schemas";
import { useAsyncStorage } from "./use-async-storage";

export function useTaskAsyncStorage(key: string) {
  const { getData, addData } = useAsyncStorage();

  async function addTask(id: string, data: TaskSchemaInfertype) {
    const boards = ((await getData(key)) as BoardSchemaInfertype[]) || [];

    const boardIndex = boards.findIndex((board) => board.id === id);

    if (boardIndex !== -1) {
      boards[boardIndex].tasks.push(data);
      await addData(key, boards);
      return boards[boardIndex].tasks;
    }
  }

  async function editTask(pageid: string, taskId: string, data: TaskSchemaInfertype) {
    const boards = ((await getData(key)) as BoardSchemaInfertype[]) || [];

    const boardIndex = boards.findIndex((board) => board.id === pageid);

    if (boardIndex !== -1) {
      boards[boardIndex].tasks = boards[boardIndex].tasks.map((task) => {
        if (task.id === taskId) return data;
        return task;
      });

      await addData(key, boards);
      return boards[boardIndex].tasks;
    }
  }

  async function removeTask(pageId: string, taskId: string) {
    const boards = ((await getData(key)) as BoardSchemaInfertype[]) || [];

    const boardIndex = boards.findIndex((board) => board.id === pageId);

    if (boardIndex !== -1) {
      boards[boardIndex].tasks = boards[boardIndex].tasks.filter((task) => task.id !== taskId);

      await addData(key, boards);
      return boards[boardIndex].tasks;
    }
  }

  return { addTask, editTask, removeTask };
}
