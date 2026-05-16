import { EmptyList } from "@/components/empty-list";
import { PANELS_TABLE_NAME } from "@/constants/async-tables";
import { useAsyncStorage } from "@/hooks/use-async-storage";
import { usePanel } from "@/providers/panel";
import type { PanelSchemaInfertype } from "@/schemas";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";
import { FlatList } from "react-native";
import type { StructureModeType } from "./choose-structure-mode";
import { PanelItem } from "./panel-item";

interface PanelsProps {
  structureMode: StructureModeType;
}

export function Panels(props: PanelsProps) {
  const { structureMode } = props;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FlatList
      key={structureMode}
      data={fields}
      keyExtractor={(item, index) => item.id || index.toString()}
      {...(structureMode === "grid" && { numColumns: 2, columnWrapperStyle: { gap: 14 } })}
      renderItem={({ item }) => (
        <PanelItem
          {...item}
          onPress={() => {
            push({
              pathname: "/panels/(board)/[id]",
              params: { id: item.id!, title: item.title },
            });
          }}
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
