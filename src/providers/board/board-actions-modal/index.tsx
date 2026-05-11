import { Dialog } from "@/components/dialog";
import { TextApp } from "@/components/text-app";
import { PANELS_TABLE_NAME } from "@/constants/async-tables";
import { theme } from "@/constants/theme";
import { usePanelAsyncStorage } from "@/hooks/use-panel-async-storage";
import { usePanel } from "@/providers/panel";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Alert, TouchableOpacity } from "react-native";

interface BoardActionsModalProps {
  visible: boolean;
  onRequestClose: () => void;
}

export function BoardActionsModal(props: BoardActionsModalProps) {
  const { visible, onRequestClose } = props;
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getPanel, removePanel } = usePanelAsyncStorage(PANELS_TABLE_NAME);

  const router = useRouter();

  const { updateModalType, handlePanelModal, resetFormPanelValues } = usePanel();

  async function handleRemovePanel() {
    Alert.alert("Remover quadro", "Deseja remover este quadro?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover",
        onPress: () => {
          if (id) {
            removePanel(id);
            router.replace("/panels");
          } else {
            Alert.alert("Erro", "Painel não encontrado");
          }
        },
      },
    ]);
  }

  async function handleEditPanel() {
    if (id) {
      const panel = await getPanel(id);

      updateModalType("edit");
      handlePanelModal();
      resetFormPanelValues(panel);
    } else {
      Alert.alert("Erro", "Painel não encontrado");
    }
  }

  return (
    <Dialog visible={visible} onRequestClose={onRequestClose}>
      <TouchableOpacity
        style={{
          padding: 16,
          marginTop: 32,
          borderColor: theme.color.dark.warning,
          borderBottomWidth: 4,
          backgroundColor: theme.color.dark.surfaceSecondary,
          borderTopLeftRadius: theme.spacing.borderRadius.lg,
          borderTopRightRadius: theme.spacing.borderRadius.lg,
        }}
        onPress={handleEditPanel}>
        <TextApp type="defaultSemiBold">Editar este quadro</TextApp>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 16,
          backgroundColor: theme.color.dark.error,
        }}
        onPress={handleRemovePanel}>
        <TextApp type="defaultSemiBold">Excluir este quadro</TextApp>
      </TouchableOpacity>
    </Dialog>
  );
}
