import { Flag } from "@/components/flag";
import { Swipeable } from "@/components/swipeable";
import { BOARD_TABLE_NAME } from "@/constants/async-tables";
import { formatDateToBR } from "@/helpers";
import { useTaskAsyncStorage } from "@/hooks/use-task-async-storage";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useBoard } from "@/providers/board";
import type { TaskSchemaInfertype } from "@/schemas";
import { Alert, Text, View } from "react-native";
import { Ball } from "../ball";
import { style } from "./style";

type TaskItemProps = TaskSchemaInfertype & {
  pageId: string;
};

export function TaskItem(props: TaskItemProps) {
  const { pageId, ...item } = props;
  const { id, title, limitDate, limitTime, flag, at_updated } = item;

  const { fieldArrayTasksMethods, taskFormMethods, handleFormTaskModal, updateTaskModalType } = useBoard();
  const { remove, fields } = fieldArrayTasksMethods;

  const { removeTask } = useTaskAsyncStorage(BOARD_TABLE_NAME);

  const border = useThemeColor({}, "border");
  const textPrimary = useThemeColor({}, "textPrimary");
  const surface = useThemeColor({}, "surface");
  const textSecondary = useThemeColor({}, "textSecondary");

  async function handleRemoveTask() {
    Alert.alert("Remover tarefa", "Deseja remover esta tarefa?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover",
        onPress: async () => {
          if (id) {
            await removeTask(pageId, id);
            const index = fields.findIndex((f) => f.id === id);
            if (index !== -1) {
              remove(index);
            }
          } else {
            Alert.alert("Erro", "Tarefa não encontrada");
          }
        },
      },
    ]);
  }

  async function handleEditTask() {
    taskFormMethods.reset(item);
    updateTaskModalType("edit");
    handleFormTaskModal();
  }

  return (
    <View style={style.container}>
      <Ball id={id} />

      <Swipeable
        styleContainer={[style.swipeableContainer, { backgroundColor: surface, borderColor: border }]}
        onRemove={handleRemoveTask}
        onUpdated={handleEditTask}>
        <View style={style.secondaryContainer}>
          <Text style={[style.title, { color: textPrimary }]} numberOfLines={1} ellipsizeMode="tail">
            {title}
          </Text>
          <Text style={[style.description, { color: textSecondary }]}>
            {formatDateToBR({ date: limitDate, time: limitTime }).replace(" ", " - ")}
          </Text>
          {at_updated && (
            <Text style={style.description}>Create at: {formatDateToBR({ date: at_updated }).replace(" ", " - ")}</Text>
          )}
        </View>
        <Flag caption={flag} disabled />
      </Swipeable>
    </View>
  );
}
