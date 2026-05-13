import { EmptyList } from "@/components/empty-list";
import { PANELS_TABLE_NAME } from "@/constants/async-tables";
import { useAsyncStorage } from "@/hooks/use-async-storage";
import { usePanel } from "@/providers/panel";
import type { PanelSchemaInfertype } from "@/schemas";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { FlatList } from "react-native";
import { PanelItem } from "./panel-item";

export function Panels() {
  const { panelsMethods, updatePanelModalType, handlePanelModal, fieldArrayPanelsMethods } = usePanel();
  const { getData } = useAsyncStorage();
  const { replace } = fieldArrayPanelsMethods;

  const fields = useWatch({ control: panelsMethods.control, name: "panels" });

  const { push } = useRouter();

  useEffect(() => {
    async function load() {
      const items = (await getData(PANELS_TABLE_NAME)) as PanelSchemaInfertype[];

      if (!items?.length) return replace([]);
      else replace(items);
    }
    load();
  }, [getData, replace]);

  return (
    <FlatList
      data={fields}
      keyExtractor={(item, index) => item.id || index.toString()}
      contentContainerStyle={{ gap: 10 }}
      renderItem={({ item }) => (
        <PanelItem
          {...item}
          onPress={() =>
            push({
              pathname: "/panels/(board)/[id]",
              params: { id: item.id!, title: item.title },
            })
          }
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
    />
  );
}
