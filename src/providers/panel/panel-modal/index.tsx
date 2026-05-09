import { TextApp, TouchableOpacityApp } from "@/components";
import { TextfieldRHF } from "@/components/text-field-rhf";
import { theme } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { PanelSchemaInfertype } from "@/schemas";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import type { Control, UseFormGetValues } from "react-hook-form";
import { Modal, Pressable, TouchableOpacity, View } from "react-native";
import type { PanelModalType } from "../provider";
import { style } from "./style";

interface PanelModalProps {
  visible: boolean;
  modalType: PanelModalType;
  control: Control<PanelSchemaInfertype>;
  getValues: UseFormGetValues<PanelSchemaInfertype>;
  onSubmit: (_: PanelSchemaInfertype) => void;
  onRequestClose: () => void;
}

export function PanelModal(props: PanelModalProps) {
  const { visible, modalType, onRequestClose, control, onSubmit, getValues } = props;
  const textSecondary = useThemeColor({}, "textSecondary");
  const black = useThemeColor({}, "black");

  return (
    <Modal visible={visible} onRequestClose={onRequestClose} animationType="fade" transparent>
      <Pressable style={style.container} onPress={onRequestClose}>
        <Pressable style={style.modalContent} onPress={(e) => e.stopPropagation()}>
          <TouchableOpacity onPress={onRequestClose} style={{ position: "absolute", top: 4, right: 4, padding: 10 }}>
            <MaterialIcons name="close" size={30} color={black} />
          </TouchableOpacity>

          <TextApp type="subtitle" style={[style.title, { color: black }]}>
            {modalType === "create" ? "Novo" : "Editar"} quadro de tarefas
          </TextApp>

          <View style={style.formContainer}>
            <TextfieldRHF
              control={control}
              name="title"
              label="Título:"
              labelStyle={[
                style.inputLabel,
                {
                  color: textSecondary,
                },
              ]}
              placeholder="Digite o título da tarefa"
            />
            <TextfieldRHF
              control={control}
              name="color"
              label="Cor:"
              labelStyle={style.inputLabel}
              containerStyle={{ height: 100, borderRadius: 20 }}
              multiline
              numberOfLines={5}
              placeholder="Sobre o que é a tarefa?"
            />
            {/* <View style={style.containerRangerDate}>
            <DatepickerRHF
              control={control}
              name="limitDate"
              label="Limit date:"
              labelStyle={style.inputLabel}
              containerStyle={{ width: 200 }}
              mode="date"
            />
            <DatepickerRHF
              control={control}
              name="limitTime"
              label="Limit time:"
              labelStyle={style.inputLabel}
              containerStyle={{ width: 120 }}
              mode="time"
            />
          </View>
          <FlagField control={control} setValue={setValue} /> */}
          </View>

          <View style={style.header}>
            <TouchableOpacityApp
              variant="ghost"
              onPress={onRequestClose}
              style={{ borderRadius: theme.spacing.borderRadius.lg }}>
              <MaterialIcons name="close" size={30} color={black} />
            </TouchableOpacityApp>
            <TouchableOpacityApp
              onPress={() => onSubmit(getValues())}
              style={{ borderRadius: theme.spacing.borderRadius.lg }}>
              <AntDesign name="check" size={30} color={black} />
            </TouchableOpacityApp>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
