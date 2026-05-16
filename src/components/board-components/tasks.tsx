import { BOARD_TABLE_NAME } from "@/constants/async-tables";
import { sleep } from "@/helpers";
import { useBoardAsyncStorage } from "@/hooks/use-board-async-storage";
import { useBoard } from "@/providers/board";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { Dimensions, FlatList } from "react-native";
import { EmptyList } from "../empty-list";
import { Skeleton } from "../skeleton";
import { TaskItem } from "./task-item";

export function Tasks() {
  const { id: currentPageId } = useLocalSearchParams<{ id: string }>();
  const { getBoard } = useBoardAsyncStorage(BOARD_TABLE_NAME);

  const [isLoadingTasks, setLoadingTasks] = useState(true);

  const { fieldArrayTasksMethods, handleFormTaskModal, handlePageId, tasksMethods, updateTaskModalType } = useBoard();
  const { replace } = fieldArrayTasksMethods;

  const fields = useWatch({ control: tasksMethods.control, name: "tasks" });

  useEffect(() => {
    async function load() {
      handlePageId(currentPageId);
      setLoadingTasks(true);
      try {
        if (!currentPageId) return;
        const board = await getBoard(currentPageId);

        await sleep(600);
        if (!board?.tasks.length) return replace([]);
        else replace(board.tasks);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingTasks(false);
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoadingTasks) {
    return <Skeleton height={Dimensions.get("window").height / 2} />;
  }

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
