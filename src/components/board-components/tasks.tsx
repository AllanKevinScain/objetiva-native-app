import { usePanel } from "@/providers/panel";
import { useLocalSearchParams } from "expo-router";
import { useFieldArray } from "react-hook-form";
import { FlatList, View } from "react-native";

import { CheckAll } from "./components/check-all";
import { TaskItem } from "./components/task-item";

export function Tasks() {
  const { index } = useLocalSearchParams<{ index: string }>();
  const panelIndex = Number(index);

  const { panelsMethods } = usePanel();

  const tasksArrayMethods = useFieldArray({
    control: panelsMethods.control,
    name: `panels.${panelIndex}.tasks`,
    keyName: "key",
  });

  return (
    <View style={{ gap: 20 }}>
      <CheckAll panelIndex={panelIndex} tasksArrayMethods={tasksArrayMethods} />
      <FlatList
        data={tasksArrayMethods.fields}
        keyExtractor={(item, index) => item.id ?? String(index)}
        renderItem={({ item, index: taskIndex }) => (
          <TaskItem
            taskId={item.id!}
            taskIndex={taskIndex}
            panelIndex={panelIndex}
            tasksArrayMethods={tasksArrayMethods}
          />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
}
