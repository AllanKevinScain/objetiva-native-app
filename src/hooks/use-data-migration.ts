import { BOARD_TABLE_NAME, MIGRATION_KEY, PANELS_TABLE_NAME } from "@/constants/async-tables";
import type { PanelSchemaInfertype, TaskSchemaInfertype } from "@/schemas";
import * as Crypto from "expo-crypto";
import { useEffect } from "react";
import { useAsyncStorage } from "./use-async-storage";

type TasksType = TaskSchemaInfertype & {
  title: string;
};

type BoardType = {
  id: string;
  tasks: TasksType[];
};

export function useDataMigration() {
  const { getData, editData, addData } = useAsyncStorage();

  useEffect(() => {
    async function migrate() {
      try {
        const migrationCompleted = await getData(MIGRATION_KEY);
        if (migrationCompleted === "true") return;

        const panels = (await getData(PANELS_TABLE_NAME)) as PanelSchemaInfertype[];
        const boards = (await getData(BOARD_TABLE_NAME)) as BoardType[];

        if (!panels || !Array.isArray(panels)) {
          await addData(MIGRATION_KEY, "true");
          return;
        }

        if (!boards || !Array.isArray(boards)) {
          await addData(MIGRATION_KEY, "true");
          return;
        }

        const migratedPanels = panels.map((panel) => {
          const relatedBoards = boards.find((board) => board.id === panel.id);
          if (!relatedBoards) return panel;

          const tasks = relatedBoards?.tasks.map((board) => ({
            id: Crypto.randomUUID(),
            at_updated: board.at_updated || new Date(),
            description: board.title || board.description || "",
            selected: !!board.selected,
          }));

          return { ...panel, tasks: [...(panel.tasks || []), ...tasks] };
        });

        await editData(PANELS_TABLE_NAME, migratedPanels);
        await addData(MIGRATION_KEY, "true");

        console.log("[Migration] Dados migrados com sucesso.");
      } catch (error) {
        console.error("[Migration] Erro durante a migração de dados:", error);
      }
    }

    migrate();
  }, []);
}
