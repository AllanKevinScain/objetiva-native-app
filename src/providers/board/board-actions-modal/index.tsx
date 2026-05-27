import { Dialog } from "@/components/dialog";
import { TextApp } from "@/components/text-app";
import { PANELS_TABLE_NAME } from "@/constants/async-tables";
import { theme } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import { usePanelAsyncStorage } from "@/hooks/use-panel-async-storage";
import { usePanel } from "@/providers/panel";
import { useRouter } from "expo-router";
import { Alert, TouchableOpacity } from "react-native";
import { useBoard } from "../hooks/use-board-provider";

interface BoardActionsModalProps {
  visible: boolean;
  currentPageId: string | null;
  onRequestClose: () => void;
}

export function BoardActionsModal(props: BoardActionsModalProps) {
  const { visible, onRequestClose, currentPageId } = props;
  const { getPanel, removePanel } = usePanelAsyncStorage(PANELS_TABLE_NAME);
  const router = useRouter();

  const { updatePanelModalType, handlePanelModal, resetFormPanelValues, panelsMethods, fieldArrayPanelsMethods } =
    usePanel();
  const { handleActionsModal } = useBoard();

  const { colors } = useAppTheme();

  async function handleRemovePanel() {
    Alert.alert("Remover quadro", "Deseja remover este quadro?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover",
        onPress: async () => {
          if (currentPageId) {
            const panels = panelsMethods.getValues("panels");
            const index = panels.findIndex((f) => f.id === currentPageId);

            if (index !== -1) {
              fieldArrayPanelsMethods.remove(index);

              await removePanel(currentPageId);
            }

            handleActionsModal();

            router.replace("/panels");
          } else {
            Alert.alert("Erro", "Painel não encontrado");
          }
        },
      },
    ]);
  }

  async function handleEditPanel() {
    if (currentPageId) {
      const panel = await getPanel(currentPageId);
      if (panel) resetFormPanelValues(panel);
      updatePanelModalType("edit");
      handlePanelModal();
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
          borderColor: colors.secondary,
          borderBottomWidth: 4,
          backgroundColor: colors.bg,
          borderTopLeftRadius: theme.spacing.borderRadius.lg,
          borderTopRightRadius: theme.spacing.borderRadius.lg,
        }}
        onPress={handleEditPanel}>
        <TextApp type="defaultSemiBold">Editar este quadro</TextApp>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 16,
          backgroundColor: colors.secondary,
        }}
        onPress={handleRemovePanel}>
        <TextApp type="defaultSemiBold">Excluir este quadro</TextApp>
      </TouchableOpacity>
    </Dialog>
  );
}
