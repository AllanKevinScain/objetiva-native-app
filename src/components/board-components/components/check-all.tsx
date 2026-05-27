import { usePanel } from "@/providers/panel";
import { useWatch } from "react-hook-form";

import { useAppTheme } from "@/hooks/use-app-theme";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Checkbox } from "./checkbox";
import type { TaskItemProps } from "./task-item";

type CheckAllProps = Pick<TaskItemProps, "panelIndex" | "tasksArrayMethods">;

export function CheckAll(props: CheckAllProps) {
  const { panelIndex, tasksArrayMethods } = props;
  const { replace } = tasksArrayMethods;

  const [selecteds, setSelecteds] = useState(false);

  const { colors } = useAppTheme();
  const { panelsMethods } = usePanel();

  const tasks = useWatch({ control: panelsMethods.control, name: `panels.${panelIndex}.tasks` });
  const isAllSelected = tasks.every((task) => task.selected);

  const selectAll = useCallback(() => {
    if (isAllSelected) {
      setSelecteds(false);
      tasks.forEach((task) => replace({ ...task, selected: false }));
    } else {
      setSelecteds(true);
      tasks.forEach((task) => replace({ ...task, selected: true }));
    }
  }, [isAllSelected, replace, tasks]);

  useEffect(() => {
    if (isAllSelected) setSelecteds(true);
  }, [isAllSelected]);

  return (
    <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
      <Checkbox handleCheck={selectAll} selected={selecteds} icon="check-double" />
      <Text style={{ color: colors.text, fontSize: 16, paddingTop: 8 }}>Selecionar todos</Text>
    </View>
  );
}
