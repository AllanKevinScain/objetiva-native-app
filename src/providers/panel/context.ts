import type { ModalType } from "@/hooks/use-modal-type";
import type { PanelSchemaInfertype, PanelsSchemaInfertype } from "@/schemas";
import { createContext } from "react";
import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

type PanelContextType = {
  panelsMethods: UseFormReturn<PanelsSchemaInfertype>;
  fieldArrayPanelsMethods: UseFieldArrayReturn<PanelsSchemaInfertype, "panels", "key">;
  handlePanelModal: () => void;
  updatePanelModalType: (type: ModalType) => void;
  resetFormPanelValues(_?: PanelSchemaInfertype): void;
  defaultValues: PanelSchemaInfertype;
};

export const PanelContext = createContext<PanelContextType>({
  panelsMethods: {} as UseFormReturn<PanelsSchemaInfertype>,
  fieldArrayPanelsMethods: {} as UseFieldArrayReturn<PanelsSchemaInfertype, "panels", "key">,
  handlePanelModal: () => null,
  updatePanelModalType: () => null,
  resetFormPanelValues: () => null,
  defaultValues: {} as PanelSchemaInfertype,
});
