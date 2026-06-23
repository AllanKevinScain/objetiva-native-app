import { usePanel } from "@/providers/panel";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFieldArray } from "react-hook-form";
import type { TextInput } from "react-native";
import { FlatList, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
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

  const tasksListRef = useRef<FlatList<(typeof tasksArrayMethods.fields)[number]>>(null);
  const taskInputRefs = useRef(new Map<string, TextInput>());
  const focusedTaskRef = useRef<{ index: number; key: string } | null>(null);
  const [listHeight, setListHeight] = useState(0);

  const scrollToTask = useCallback((taskIndex: number, taskKey?: string, focusTask = false) => {
    const scroll = () => {
      tasksListRef.current?.scrollToIndex({
        index: taskIndex,
        animated: true,
        viewPosition: 0,
        viewOffset: 8,
      });

      if (focusTask && taskKey) {
        requestAnimationFrame(() => {
          taskInputRefs.current.get(taskKey)?.focus();
        });
      }
    };

    requestAnimationFrame(scroll);
    setTimeout(scroll, 80);
  }, []);

  useEffect(() => {
    const keyboardEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const subscription = Keyboard.addListener(keyboardEvent, () => {
      const focusedTask = focusedTaskRef.current;

      if (focusedTask) {
        setTimeout(() => {
          scrollToTask(focusedTask.index, focusedTask.key);
        }, Platform.OS === "ios" ? 50 : 120);
      }
    });

    return () => subscription.remove();
  }, [scrollToTask]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={0}>
      <CheckAll panelIndex={panelIndex} tasksArrayMethods={tasksArrayMethods} />

      <FlatList
        ref={tasksListRef}
        style={{ flex: 1, marginTop: 20 }}
        contentContainerStyle={{ paddingBottom: Math.max(32, listHeight - 48) }}
        automaticallyAdjustKeyboardInsets={Platform.OS === "ios"}
        onLayout={(event) => setListHeight(event.nativeEvent.layout.height)}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        showsVerticalScrollIndicator={false}
        data={tasksArrayMethods.fields}
        keyExtractor={(item) => item.key}
        onScrollToIndexFailed={({ index, averageItemLength }) => {
          tasksListRef.current?.scrollToOffset({
            offset: averageItemLength * index,
            animated: true,
          });
        }}
        renderItem={({ item, index: taskIndex }) => {
          const previousTask = tasksArrayMethods.fields[taskIndex - 1];

          return (
            <TaskItem
              taskId={item.id!}
              taskIndex={taskIndex}
              panelIndex={panelIndex}
              tasksArrayMethods={tasksArrayMethods}
              inputRef={(input) => {
                if (input) {
                  taskInputRefs.current.set(item.key, input);
                } else {
                  taskInputRefs.current.delete(item.key);
                }
              }}
              onFocus={() => {
                focusedTaskRef.current = { index: taskIndex, key: item.key };
                scrollToTask(taskIndex, item.key);
              }}
              onRemove={() => {
                if (previousTask) {
                  focusedTaskRef.current = {
                    index: taskIndex - 1,
                    key: previousTask.key,
                  };
                  scrollToTask(taskIndex - 1, previousTask.key, true);
                }
              }}
            />
          );
        }}
      />
    </KeyboardAvoidingView>
  );
}
