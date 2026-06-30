import { usePanel } from "@/providers/panel";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFieldArray } from "react-hook-form";
import type { TextInput } from "react-native";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
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
  const initialLastTaskRef = useRef(tasksArrayMethods.fields.at(-1));
  const hasAppliedInitialFocusRef = useRef(false);
  const pendingFocusIndexRef = useRef<number | null>(null);
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
    const lastTask = initialLastTaskRef.current;
    if (!lastTask || hasAppliedInitialFocusRef.current) return;

    const lastTaskIndex = tasksArrayMethods.fields.length - 1;
    let focusTimeout: ReturnType<typeof setTimeout> | undefined;

    const animationFrame = requestAnimationFrame(() => {
      if (hasAppliedInitialFocusRef.current) return;

      scrollToTask(lastTaskIndex, lastTask.key);
      focusTimeout = setTimeout(() => {
        const lastTaskInput = taskInputRefs.current.get(lastTask.key);
        if (!lastTaskInput || hasAppliedInitialFocusRef.current) return;

        hasAppliedInitialFocusRef.current = true;
        lastTaskInput.focus();
      }, 120);
    });

    return () => {
      cancelAnimationFrame(animationFrame);
      if (focusTimeout) clearTimeout(focusTimeout);
    };
    // O foco inicial pertence exclusivamente ao ciclo de montagem da tela.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const pendingFocusIndex = pendingFocusIndexRef.current;
    if (pendingFocusIndex === null) return;

    const createdTask = tasksArrayMethods.fields[pendingFocusIndex];
    if (!createdTask) return;

    pendingFocusIndexRef.current = null;
    scrollToTask(pendingFocusIndex, createdTask.key, true);
  }, [scrollToTask, tasksArrayMethods.fields]);

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
                scrollToTask(taskIndex, item.key);
              }}
              onRemove={() => {
                if (previousTask) {
                  scrollToTask(taskIndex - 1, previousTask.key, true);
                }
              }}
              onSubmitTask={() => {
                const nextTask = tasksArrayMethods.fields[taskIndex + 1];

                if (nextTask) {
                  scrollToTask(taskIndex + 1, nextTask.key, true);
                  return true;
                }

                pendingFocusIndexRef.current = taskIndex + 1;
                return false;
              }}
            />
          );
        }}
      />
    </KeyboardAvoidingView>
  );
}
