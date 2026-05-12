import { Dialog } from "@/components/dialog";
import { TextfieldRHF } from "@/components/text-field-rhf";
import { TouchableOpacityApp } from "@/components/touchableopacity-app";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { TaskSchemaInfertype } from "@/schemas";
import type { UseFormGetValues } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { Dimensions, Text, View } from "react-native";
import { DatepickerRHF } from "./date-picker-rhf";
import { FlagField } from "./flag-field";
import { style } from "./style";

interface TaskFormModalProps {
  visible: boolean;
  onRequestClose: () => void;
  getValues: UseFormGetValues<TaskSchemaInfertype>;
  onSubmit: (_: TaskSchemaInfertype) => void;
}

export function TaskFormModal(props: TaskFormModalProps) {
  const { visible, onRequestClose, getValues, onSubmit } = props;

  const { control } = useFormContext<TaskSchemaInfertype>();

  const textSecondary = useThemeColor({}, "textSecondary");
  const black = useThemeColor({}, "black");

  return (
    <Dialog
      visible={visible}
      onRequestClose={onRequestClose}
      heightContainerModal={Dimensions.get("window").height / 1.4}>
      <Text style={[style.title, { color: black }]}>Register task</Text>

      <TextfieldRHF
        control={control}
        name="title"
        label="Title:"
        labelStyle={[style.inputLabel, { color: textSecondary }]}
        placeholder="Digite o título da tarefa"
      />
      <TextfieldRHF
        control={control}
        name="description"
        label="Description:"
        labelStyle={[style.inputLabel, { color: textSecondary }]}
        containerStyle={{ height: 100, borderRadius: 20 }}
        multiline
        numberOfLines={5}
        placeholder="Sobre o que é a tarefa?"
      />
      <View style={style.containerRangerDate}>
        <DatepickerRHF
          control={control}
          name="limitDate"
          label="Limit date:"
          labelStyle={[style.inputLabel, { color: textSecondary }]}
          containerStyle={{ width: 200 }}
          mode="date"
        />
        <DatepickerRHF
          control={control}
          name="limitTime"
          label="Limit time:"
          labelStyle={[style.inputLabel, { color: textSecondary }]}
          containerStyle={{ width: 120 }}
          mode="time"
        />
      </View>
      <FlagField />
      <TouchableOpacityApp onPress={() => onSubmit(getValues())}>Salvar</TouchableOpacityApp>
    </Dialog>
  );
}
