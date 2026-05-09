import { PANELS_TABLE_NAME } from "@/constants/async-tables";
import { usePanelAsyncStorage } from "@/hooks/use-panel-async-storage";
import type { PanelSchemaInfertype, PanelsSchemaInfertype } from "@/schemas";
import { panelSchema, panelsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Crypto from "expo-crypto";
import { useCallback, useMemo, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import type { ProvidersProps } from "../providers.type";
import { PanelContext } from "./context";
import { PanelModal } from "./panel-modal";

export type PanelModalType = "create" | "edit";

export const defaultValues: PanelSchemaInfertype = {
  title: "",
  color: "#000",
  id: undefined,
};

export function PanelProvider({ children }: ProvidersProps) {
  const { addPanel, editPanel } = usePanelAsyncStorage(PANELS_TABLE_NAME);

  const [panelModalState, setPanelModal] = useState(false);
  const [modalType, setModalType] = useState<PanelModalType>("create");

  const panelsMethods = useForm<PanelsSchemaInfertype>({
    resolver: zodResolver(panelsSchema),
    defaultValues: { panels: [] },
  });

  const fieldArrayPanelsMethods = useFieldArray({
    control: panelsMethods.control,
    name: "panels",
    keyName: "key",
  });

  const formPanelMethods = useForm<PanelSchemaInfertype>({
    resolver: zodResolver(panelSchema),
    defaultValues,
  });

  const handlePanelModal = useCallback(() => {
    setPanelModal((s) => !s);
  }, []);

  const updateModalType = useCallback((type: PanelModalType) => {
    setModalType(type);
  }, []);

  const resetFormPanelValues = useCallback(
    (data?: PanelSchemaInfertype) => {
      formPanelMethods.reset(data ? data : defaultValues);
    },
    [formPanelMethods]
  );

  const handleSubmit = useCallback(
    async (value: PanelSchemaInfertype) => {
      try {
        if (modalType === "create") {
          const newData = { ...value, id: Crypto.randomUUID() };
          await addPanel(newData);
          fieldArrayPanelsMethods.append(newData);
        }
        if (modalType === "edit" && value.id) {
          await editPanel(value.id, value);

          const index = fieldArrayPanelsMethods.fields.findIndex((f) => f.id === value.id);
          if (index !== -1) fieldArrayPanelsMethods.update(index, value);
        }
      } catch (error) {
        console.log(error);
      } finally {
        handlePanelModal();
        resetFormPanelValues();
      }
    },
    [modalType, fieldArrayPanelsMethods, handlePanelModal, resetFormPanelValues, addPanel, editPanel]
  );

  const contextValue = useMemo(
    () => ({
      panelsMethods,
      fieldArrayPanelsMethods,
      handlePanelModal,
      updateModalType,
      resetFormPanelValues,
    }),
    [panelsMethods, fieldArrayPanelsMethods, handlePanelModal, updateModalType, resetFormPanelValues]
  );

  return (
    <PanelContext.Provider value={contextValue}>
      <FormProvider {...panelsMethods}>
        {children}
        <PanelModal
          modalType={modalType}
          visible={panelModalState}
          onRequestClose={() => {
            handlePanelModal();
            resetFormPanelValues();
          }}
          onSubmit={handleSubmit}
          control={formPanelMethods.control}
          getValues={formPanelMethods.getValues}
        />
      </FormProvider>
    </PanelContext.Provider>
  );
}
