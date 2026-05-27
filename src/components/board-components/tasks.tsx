import { useAppTheme } from "@/hooks/use-app-theme";
import { usePanel } from "@/providers/panel";
import { FontAwesome5 } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { FlatList, TextInput, TouchableOpacity, View } from "react-native";

import { useCallback } from "react";
import { useTaskList } from "./hooks/use-task-list";
import { style } from "./style";

export function Tasks() {
  const { index } = useLocalSearchParams<{ index: string }>();
  const panelIndex = Number(index);

  const { colors, font } = useAppTheme();
  const { panelsMethods } = usePanel();

  const tasksArrayMethods = useFieldArray({
    control: panelsMethods.control,
    name: `panels.${panelIndex}.tasks`,
    keyName: "key",
  });

  const tasks = useWatch({ control: panelsMethods.control, name: `panels.${panelIndex}.tasks` });

  const { editLine, handleCheck, newLine, removeLine, replaceTasks } = useTaskList(tasks, tasksArrayMethods);

  useFocusEffect(
    useCallback(() => {
      return () => {
        const currentTasks = panelsMethods.getValues(`panels.${panelIndex}.tasks`);

        replaceTasks(currentTasks);
      };
    }, [panelIndex, panelsMethods, replaceTasks]),
  );

  return (
    <FlatList
      data={tasksArrayMethods.fields}
      keyExtractor={(item, index) => item.id ?? String(index)}
      renderItem={({ item, index: taskIndex }) => {
        const selected = item.selected;

        return (
          <View style={style.container}>
            <TouchableOpacity onPress={() => handleCheck({ panelIndex, taskId: item.id! })}>
              <View
                style={[
                  style.containerBall,
                  selected
                    ? {
                        backgroundColor: colors.primary,
                        borderColor: colors.border,
                      }
                    : {
                        borderColor: "white",
                      },
                ]}>
                {selected && <FontAwesome5 name="check" color="white" size={18} />}
              </View>
            </TouchableOpacity>

            <Controller
              control={panelsMethods.control}
              name={`panels.${panelIndex}.tasks.${taskIndex}.description`}
              render={({ field: { value, onChange } }) => (
                <TextInput
                  value={value ?? undefined}
                  onChangeText={onChange}
                  autoFocus={taskIndex === tasksArrayMethods.fields.length - 1}
                  multiline
                  submitBehavior="submit"
                  style={{
                    flex: 1,
                    fontSize: 16,
                    color: colors.text,
                    fontFamily: font.regular,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    textAlignVertical: "top",
                    textDecorationLine: selected ? "line-through" : "none",
                  }}
                  onSubmitEditing={newLine}
                  onBlur={() => editLine(item.id!, value)}
                  onKeyPress={(e) =>
                    removeLine({
                      event: e,
                      taskId: item.id!,
                    })
                  }
                />
              )}
            />
          </View>
        );
      }}
      contentContainerStyle={{
        paddingBottom: 80,
      }}
      style={{
        padding: 0,
        margin: 0,
        gap: 0,
      }}
    />
  );
}
