import type { BoardSchemaInfertype } from "@/schemas";
import { useAsyncStorage } from "./use-async-storage";

export function useBoardAsyncStorage(key: string) {
  const { getData, addData } = useAsyncStorage();

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

  return { getBoard, addBoard };
}
