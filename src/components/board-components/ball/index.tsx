import { BOARD_TABLE_NAME } from "@/constants/async-tables";
import { useBoardAsyncStorage } from "@/hooks/use-board-async-storage";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useBoard } from "@/providers/board";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { Alert, TouchableOpacity, View } from "react-native";
import { style } from "./style";

interface BallProps {
  size?: number;
  color?: string;
  id?: string | null;
  pageId?: string;
}

export function Ball(props: BallProps) {
  const secondary = useThemeColor({}, "secondary");
  const { color = secondary, size = 24, id, pageId } = props;

  const { editBoard } = useBoardAsyncStorage(BOARD_TABLE_NAME);
  const { fieldArrayTasksMethods, tasksMethods } = useBoard();

  const tasks = useWatch({ control: tasksMethods.control, name: "tasks" });

  async function handleSelectTask() {
    if (id) {
      const currentTask = tasksMethods.getValues().tasks.find((task) => task.id === id);

      if (currentTask) {
        const index = fieldArrayTasksMethods.fields.findIndex((f) => f.id === id);
        const atualTask = { ...currentTask, selected: !currentTask.selected };
        if (index !== -1) {
          fieldArrayTasksMethods.update(index, atualTask);
          await editBoard(pageId, id, atualTask);
        }
      }
    } else {
      Alert.alert("Erro", "Nenhum item encontrado!");
    }
  }

  const selected = useMemo(() => {
    const task = tasks.find((task) => task.id === id);
    return task?.selected;
  }, [id, tasks]);

  return (
    <TouchableOpacity style={style.container} onPress={handleSelectTask}>
      <View
        style={[
          style.containerBall,
          {
            height: size,
            width: size,
            borderColor: color,
          },
        ]}>
        <View
          style={[
            style.ball,
            {
              backgroundColor: color,
              opacity: selected ? 1 : 0,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
}
