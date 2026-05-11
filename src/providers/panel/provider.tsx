import { PANELS_TABLE_NAME } from "@/constants/async-tables";
import { usePanelAsyncStorage } from "@/hooks/use-panel-async-storage";
import type { PanelSchemaInfertype } from "@/schemas";
import * as Crypto from "expo-crypto";
import { useCallback, useMemo } from "react";
import { FormProvider } from "react-hook-form";
import type { ProvidersProps } from "../providers.type";
import { PanelContext } from "./context";
import { useModalType } from "./hooks/use-modal-type";
import { usePanelForm } from "./hooks/use-panel-form";
import { usePanelModal } from "./hooks/use-panel-modal";
import { usePanelsArray } from "./hooks/use-panels-array";
import { PanelModal } from "./panel-modal";

export type PanelModalType = "create" | "edit";

export function PanelProvider({ children }: ProvidersProps) {
  const { addPanel, editPanel } = usePanelAsyncStorage(PANELS_TABLE_NAME);

  const { panelModalState, handlePanelModal } = usePanelModal();
  const { modalType, updateModalType } = useModalType();
  const { defaultValues, formPanelMethods, resetFormPanelValues } = usePanelForm();
  const { fieldArrayPanelsMethods, panelsMethods } = usePanelsArray();

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
    [modalType, fieldArrayPanelsMethods, handlePanelModal, resetFormPanelValues, addPanel, editPanel],
  );

  const contextValue = useMemo(
    () => ({
      panelsMethods,
      fieldArrayPanelsMethods,
      handlePanelModal,
      updateModalType,
      resetFormPanelValues,
      defaultValues,
    }),
    [panelsMethods, fieldArrayPanelsMethods, handlePanelModal, updateModalType, resetFormPanelValues, defaultValues],
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
