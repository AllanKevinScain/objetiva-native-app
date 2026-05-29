import { EmptyList } from "@/components/empty-list";
import { PANELS_TABLE_NAME } from "@/constants/async-tables";
import { useAsyncStorage } from "@/hooks/use-async-storage";
import { usePanelAsyncStorage } from "@/hooks/use-panel-async-storage";
import { usePanel } from "@/providers/panel";
import type { PanelSchemaInfertype } from "@/schemas";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { useWatch } from "react-hook-form";
import { Alert, Dimensions, FlatList } from "react-native";
import { PanelItem } from "./panel-item";

export function Panels() {
  const { panelsMethods, updatePanelModalType, handlePanelModal, fieldArrayPanelsMethods } = usePanel();
  const { getData } = useAsyncStorage();
  const { removePanel } = usePanelAsyncStorage(PANELS_TABLE_NAME);
  const { replace } = fieldArrayPanelsMethods;

  const [isRefreshing, setRefresh] = useState(true);

  const fields = useWatch({ control: panelsMethods.control, name: "panels" });

  const { push } = useRouter();

  async function handleRemovePanel(itemId: string) {
    Alert.alert("Remover quadro", "Deseja remover este quadro?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover",
        onPress: async () => {
          if (itemId) {
            const panels = panelsMethods.getValues("panels");
            const index = panels.findIndex((f) => f.id === itemId);

            if (index !== -1) {
              fieldArrayPanelsMethods.remove(index);

              await removePanel(itemId);
            }
          } else {
            Alert.alert("Erro", "Painel não encontrado");
          }
        },
      },
    ]);
  }

  const load = useCallback(async () => {
    setRefresh(true);

    const items = (await getData(PANELS_TABLE_NAME)) as PanelSchemaInfertype[];

    if (!items?.length) {
      replace([]);
    } else {
      replace(items);
    }

    setRefresh(false);
  }, [getData, replace]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  return (
    <FlatList
      data={fields}
      keyExtractor={(item, index) => item.id || index.toString()}
      style={{ overflowY: "scroll", maxHeight: Dimensions.get("window").height / 1.73 }}
      renderItem={({ item, index }) => (
        <PanelItem
          {...item}
          onPress={() => {
            push({
              pathname: "/panels/(board)/[id]",
              params: { id: item.id!, title: item.title, index: index },
            });
          }}
          onLongPress={() => handleRemovePanel(item.id!)}
        />
      )}
      ListEmptyComponent={() => (
        <EmptyList
          buttonContent="Adicionar quadro de tarefas"
          onButtonPress={() => {
            updatePanelModalType("create");
            handlePanelModal();
          }}
        />
      )}
      refreshing={isRefreshing}
      onRefresh={load}
    />
  );
}
