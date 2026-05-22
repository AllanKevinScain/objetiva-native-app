import type { BoardSchemaInfertype, TaskSchemaInfertype } from "@/schemas";
import { useAsyncStorage } from "./use-async-storage";

export function useBoardAsyncStorage(key: string) {
  const { getData, addData, editData } = useAsyncStorage();

  async function getBoard(id: string) {
    const boards = ((await getData(key)) as BoardSchemaInfertype[]) || [];

    if (!Array.isArray(boards)) return null;

    return boards.find((board) => board.id === id);
  }

  async function addBoard(data: BoardSchemaInfertype) {
    let items = ((await getData(key)) as BoardSchemaInfertype[]) || [];

    if (items) items.push(data);
    await addData(key, items);

    return items;
  }

  async function editBoard(boardId: string | undefined, taskId: string, data: TaskSchemaInfertype) {
    let items = ((await getData(key)) as BoardSchemaInfertype[]) || [];
    if (items) {
      items = items.map((board) => {
        if (boardId) {
          if (board.id === boardId) {
            board.tasks = board.tasks.map((task) => {
              if (task.id === taskId) return data;
              return task;
            });
          }
          return board;
        }

        return board;
      });
    }
    await editData(key, items);

    return items;
  }

  async function replaceTasks(boardId: string | undefined, data: TaskSchemaInfertype[]) {
    let items = ((await getData(key)) as BoardSchemaInfertype[]) || [];

    if (items) {
      items = items.map((board) => {
        if (boardId) {
          if (board.id === boardId) return { id: board.id, tasks: data };
          return board;
        }
        return board;
      });
    }
    await editData(key, items);

    return items;
  }

  return { getBoard, addBoard, editBoard, replaceTasks };
}
