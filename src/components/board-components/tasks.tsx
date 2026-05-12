import { BOARD_TABLE_NAME } from "@/constants/async-tables";
import { useBoardAsyncStorage } from "@/hooks/use-board-async-storage";
import { useBoard } from "@/providers/board";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { FlatList } from "react-native";
import { EmptyList } from "../empty-list";
import { TaskItem } from "./task-item";

export function Tasks() {
  const { id: currentPageId } = useLocalSearchParams<{ id: string }>();
  const { getBoard } = useBoardAsyncStorage(BOARD_TABLE_NAME);

  const { fieldArrayTasksMethods, handleFormTaskModal, handlePageId, tasksMethods, updateTaskModalType } = useBoard();
  const { replace } = fieldArrayTasksMethods;

  const fields = useWatch({ control: tasksMethods.control, name: "tasks" });

  useEffect(() => {
    async function load() {
      if (!currentPageId) return;
      const board = await getBoard(currentPageId);

      if (!board?.tasks.length) return replace([]);
      else replace(board.tasks);
    }
    load();
  }, [getBoard, currentPageId, replace]);

  return (
    <FlatList
      data={fields}
      keyExtractor={(item, index) => item.id || index.toString()}
      renderItem={({ item }) => <TaskItem {...item} pageId={currentPageId} />}
      contentContainerStyle={{ paddingBottom: 80 }}
      ListEmptyComponent={() => {
        if (fields.length === 0) {
          return (
            <EmptyList
              buttonContent="Adicionar Tarefa"
              onButtonPress={() => {
                updateTaskModalType("create");
                handlePageId(currentPageId);
                handleFormTaskModal();
              }}
            />
          );
        }

        return (
          <EmptyList message="Nenhuma tarefa encontrada." buttonContent="Limpar pesquisa" onButtonPress={() => null} />
        );
      }}
    />
  );
}
