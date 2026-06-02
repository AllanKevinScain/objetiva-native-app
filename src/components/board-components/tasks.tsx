import { usePanel } from "@/providers/panel";
import { useLocalSearchParams } from "expo-router";
import { useFieldArray } from "react-hook-form";
import { View } from "react-native";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
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
    <View style={{ flex: 1, gap: 20 }}>
      <CheckAll panelIndex={panelIndex} tasksArrayMethods={tasksArrayMethods} />

      <KeyboardAwareFlatList
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
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
      />
    </View>
  );
}
