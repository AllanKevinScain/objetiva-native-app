import { useAsyncStorage } from "@/hooks/use-async-storage";
import type { PanelSchemaInfertype, TaskSchemaInfertype } from "@/schemas";

export function useTaskAsyncStorage(key: string) {
  const { getData, editData } = useAsyncStorage();

  async function getPanels() {
    const items = ((await getData(key)) as PanelSchemaInfertype[]) || [];

    if (!Array.isArray(items)) return [];

    return items;
  }

  async function editTask(panelId: string, taskId: string, data: TaskSchemaInfertype) {
    let panels = await getPanels();

    panels = panels.map((panel) => {
      if (panel.id !== panelId) return panel;

      return {
        ...panel,
        tasks: panel.tasks.map((task) => {
          if (task.id !== taskId) return task;

          return data;
        }),
      };
    });

    await editData(key, panels);

    return panels;
  }

  async function addTask(panelId: string, task: TaskSchemaInfertype) {
    let panels = await getPanels();

    panels = panels.map((panel) => {
      if (panel.id !== panelId) return panel;

      return {
        ...panel,
        tasks: [...panel.tasks, task],
      };
    });

    await editData(key, panels);

    return panels;
  }

  async function removeTask(panelId: string, taskId: string) {
    let panels = await getPanels();

    panels = panels.map((panel) => {
      if (panel.id !== panelId) return panel;

      return {
        ...panel,
        tasks: panel.tasks.filter((task) => task.id !== taskId),
      };
    });

    await editData(key, panels);

    return panels;
  }

  async function toggleTask(panelId: string, taskId: string) {
    let panels = await getPanels();

    panels = panels.map((panel) => {
      if (panel.id !== panelId) return panel;

      return {
        ...panel,
        tasks: panel.tasks.map((task) => {
          if (task.id !== taskId) return task;

          return {
            ...task,
            selected: !task.selected,
          };
        }),
      };
    });

    await editData(key, panels);

    return panels;
  }

  return {
    addTask,
    editTask,
    removeTask,
    toggleTask,
  };
}
