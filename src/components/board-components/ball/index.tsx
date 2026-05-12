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
}

export function Ball(props: BallProps) {
  const secondary = useThemeColor({}, "secondary");
  const { color = secondary, size = 24, id } = props;

  const { fieldArrayTasksMethods, tasksMethods } = useBoard();

  const tasks = useWatch({ control: tasksMethods.control, name: "tasks" });

  function handleSelectTask() {
    if (id) {
      const currentTask = tasksMethods.getValues().tasks.find((task) => task.id === id);

      if (currentTask) {
        const index = fieldArrayTasksMethods.fields.findIndex((f) => f.id === id);
        if (index !== -1) fieldArrayTasksMethods.update(index, { ...currentTask, selected: !currentTask.selected });
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
