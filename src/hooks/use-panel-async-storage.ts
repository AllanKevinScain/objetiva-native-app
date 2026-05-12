import type { PanelSchemaInfertype } from "@/schemas";
import { useAsyncStorage } from "./use-async-storage";

export function usePanelAsyncStorage(key: string) {
  const { getData, editData, addData } = useAsyncStorage();

  async function addPanel(data: PanelSchemaInfertype) {
    let items = ((await getData(key)) as PanelSchemaInfertype[]) || [];

    if (items) items.push(data);
    await addData(key, items);

    return items;
  }

  async function editPanel(id: string, data: PanelSchemaInfertype) {
    let items = ((await getData(key)) as PanelSchemaInfertype[]) || [];

    if (items) {
      items = items.map((i) => {
        if (i.id === id) return data;
        return i;
      });
    }
    await editData(key, items);

    return items;
  }

  async function removePanel(id: string) {
    let items = ((await getData(key)) as PanelSchemaInfertype[]) || [];
    if (items) items = items.filter((i) => i.id !== id);
    await editData(key, items);

    return items;
  }

  async function getPanel(id: string) {
    let items = ((await getData(key)) as PanelSchemaInfertype[]) || [];

    if (!Array.isArray(items)) return null;

    return items.find((panel) => panel.id === id);
  }

  return { addPanel, editPanel, removePanel, getPanel };
}
