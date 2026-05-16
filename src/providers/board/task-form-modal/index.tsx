import { Dialog } from "@/components/dialog";
import { TextfieldRHF } from "@/components/text-field-rhf";
import { TouchableOpacityApp } from "@/components/touchableopacity-app";
import type { ModalType } from "@/hooks/use-modal-type";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { TaskSchemaInfertype } from "@/schemas";
import { useFormContext } from "react-hook-form";
import { Dimensions, Text, View } from "react-native";
import { DatepickerRHF } from "./date-picker-rhf";
import { FlagField } from "./flag-field";
import { style } from "./style";

interface TaskFormModalProps {
  visible: boolean;
  modalType: ModalType;
  onRequestClose: () => void;
  onSubmit: (_: TaskSchemaInfertype) => void;
}

export function TaskFormModal(props: TaskFormModalProps) {
  const { visible, onRequestClose, onSubmit, modalType } = props;

  const { control, handleSubmit } = useFormContext<TaskSchemaInfertype>();

  const textSecondary = useThemeColor({}, "textSecondary");
  const black = useThemeColor({}, "black");

  return (
    <Dialog
      visible={visible}
      onRequestClose={onRequestClose}
      heightContainerModal={Dimensions.get("window").height / 1.4}>
      <Text style={[style.title, { color: black }]}>{modalType === "create" ? "Registrar" : "Atualizar"} tarefa</Text>

      <TextfieldRHF
        control={control}
        name="title"
        label="Título:"
        labelStyle={[style.inputLabel, { color: textSecondary }]}
        placeholder="Digite o título da tarefa"
      />
      <TextfieldRHF
        control={control}
        name="description"
        label="Descrição:"
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
          label="Data:"
          labelStyle={[style.inputLabel, { color: textSecondary }]}
          containerStyle={{ width: 200 }}
          mode="date"
        />
        <DatepickerRHF
          control={control}
          name="limitTime"
          label="Hora:"
          labelStyle={[style.inputLabel, { color: textSecondary }]}
          containerStyle={{ width: 140 }}
          mode="time"
        />
      </View>
      <FlagField />
      <TouchableOpacityApp onPress={handleSubmit(onSubmit)}>Salvar</TouchableOpacityApp>
    </Dialog>
  );
}
