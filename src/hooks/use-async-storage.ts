import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback } from "react";

export function useAsyncStorage<T = unknown>() {
  async function addData(key: string, data: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      throw error;
    }
  }

  const getData = useCallback(async (key: string): Promise<T | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue ? (JSON.parse(jsonValue) as T) : null;
    } catch (error) {
      console.error("Erro ao buscar item:", error);
      throw error;
    }
  }, []);

  async function editData(key: string, data: Partial<T>): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Erro ao editar item:", error);
      throw error;
    }
  }

  async function removeData(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Erro ao remover item:", error);
      throw error;
    }
  }

  async function clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Erro ao limpar storage:", error);
      throw error;
    }
  }

  return {
    addData,
    getData,
    editData,
    removeData,
    clearAll,
  };
}
