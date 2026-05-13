import { AnimatedView } from "@/components/animated-view";
import type { StructureModeType } from "@/components/panel-components";
import { BottomBar, ChooseStructureMode, Panels } from "@/components/panel-components";
import { Skeleton } from "@/components/skeleton";
import { TextApp } from "@/components/text-app";
import { useAsyncStructureMode } from "@/hooks/use-async-structure-mode";
import { useEffect, useState } from "react";
import { Dimensions, View } from "react-native";

export default function PanelIndex() {
  const { isLoadingStructure, getStructure, toggleStructure } = useAsyncStructureMode();
  const [structureMode, setMode] = useState<StructureModeType>(null);

  async function handleStructureMode(mode: StructureModeType) {
    if (mode === structureMode) return;
    setMode(mode);
    await toggleStructure(mode);
  }

  useEffect(() => {
    async function load() {
      const structure = await getStructure();
      if (structure) setMode(structure);
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatedView>
      <View style={{ gap: 30 }}>
        <View>
          <TextApp type="subtitle" style={{ opacity: 0.7 }}>
            Gerencie seu
          </TextApp>
          <TextApp type="title" style={{ fontSize: 32, fontWeight: "800" }}>
            Painel de tarefas
          </TextApp>
        </View>

        <ChooseStructureMode handleStructureMode={handleStructureMode} />

        {isLoadingStructure ? (
          <Skeleton height={Dimensions.get("window").height / 2} />
        ) : (
          <Panels structureMode={structureMode} />
        )}
      </View>

      <BottomBar />
    </AnimatedView>
  );
}
