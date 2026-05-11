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
  const { panelsMethods, updateModalType, handlePanelModal, fieldArrayPanelsMethods } = usePanel();
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
      keyExtractor={({ id }) => id!}
      contentContainerStyle={{ gap: 10 }}
      renderItem={({ item }) => (
        <PanelItem
          {...item}
          key={item.id}
          onPress={() =>
            push({
              pathname: "/panels/(board)/[id]",
              params: { id: item.id! },
            })
          }
        />
      )}
      ListEmptyComponent={() => (
        <EmptyList
          buttonContent="Adicionar quadro de tarefas"
          onButtonPress={() => {
            updateModalType("create");
            handlePanelModal();
          }}
        />
      )}
    />
  );
}
