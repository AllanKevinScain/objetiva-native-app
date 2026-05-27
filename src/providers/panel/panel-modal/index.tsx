import { ColorpickerRHF } from "@/components/color-picker-field";
import { Dialog } from "@/components/dialog";
import { TextApp } from "@/components/text-app";
import { TextfieldRHF } from "@/components/text-field-rhf";
import { TouchableOpacityApp } from "@/components/touchableopacity-app";
import { theme } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import type { ModalType } from "@/hooks/use-modal-type";
import type { PanelSchemaInfertype } from "@/schemas";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useFormContext } from "react-hook-form";
import { Dimensions, View } from "react-native";
import { style } from "./style";

interface PanelModalProps {
  visible: boolean;
  modalType: ModalType;
  onSubmit: (_: PanelSchemaInfertype) => void;
  onRequestClose: () => void;
}

export function PanelModal(props: PanelModalProps) {
  const { visible, modalType, onRequestClose, onSubmit } = props;

  const { control, handleSubmit } = useFormContext<PanelSchemaInfertype>();
  const { colors, font } = useAppTheme();

  return (
    <Dialog
      visible={visible}
      onRequestClose={onRequestClose}
      heightContainerModal={Dimensions.get("window").height / 1.5}>
      <TextApp type="subtitle" style={[style.title, { color: colors.text, fontFamily: font.bold }]}>
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
              color: colors.text,
              fontFamily: font.medium,
            },
          ]}
          placeholder="Digite o título da tarefa"
        />
        <ColorpickerRHF control={control} name="color" />
      </View>

      <View style={style.header}>
        <TouchableOpacityApp
          variant="ghost"
          onPress={onRequestClose}
          style={{ borderRadius: theme.spacing.borderRadius.lg, borderColor: colors.border }}>
          <MaterialIcons name="close" size={30} color={colors.text} />
        </TouchableOpacityApp>
        <TouchableOpacityApp onPress={handleSubmit(onSubmit)} style={{ borderRadius: theme.spacing.borderRadius.lg }}>
          <Entypo name="check" size={30} color={colors.text} />
        </TouchableOpacityApp>
      </View>
    </Dialog>
  );
}
