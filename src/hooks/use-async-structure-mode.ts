import type { StructureModeType } from "@/components/panel-components";
import { STRUCTURE_PANELS_LIST_NAME } from "@/constants/async-tables";
import { sleep } from "@/helpers";
import { useState } from "react";
import { Alert } from "react-native";
import { useAsyncStorage } from "./use-async-storage";

export function useAsyncStructureMode() {
  const [isLoadingStructure, setLoading] = useState(true);
  const { addData, editData, getData } = useAsyncStorage();

  async function getStructure() {
    setLoading(true);
    try {
      let structure = ((await getData(STRUCTURE_PANELS_LIST_NAME)) as StructureModeType) || null;
      if (!structure) return null;

      await sleep(200);
      return structure;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function toggleStructure(data: StructureModeType) {
    setLoading(true);
    try {
      let structure = ((await getData(STRUCTURE_PANELS_LIST_NAME)) as StructureModeType) || null;
      if (structure && data) {
        await editData(STRUCTURE_PANELS_LIST_NAME, data);
      } else if (data) {
        await addData(STRUCTURE_PANELS_LIST_NAME, data);
      } else {
        Alert.alert("Nenhum modo selecionado!");
      }
      await sleep(200);

      return structure;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return {
    getStructure,
    toggleStructure,
    isLoadingStructure,
  };
}
