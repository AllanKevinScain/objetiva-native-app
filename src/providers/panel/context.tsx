import type { PanelSchemaInfertype, PanelsSchemaInfertype } from "@/schemas";
import { createContext } from "react";
import type { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import type { PanelModalType } from "./provider";

type PanelContextType = {
  panelsMethods: UseFormReturn<PanelsSchemaInfertype>;
  fieldArrayPanelsMethods: UseFieldArrayReturn<PanelsSchemaInfertype, "panels", "key">;
  handlePanelModal: () => void;
  updateModalType: (type: PanelModalType) => void;
  resetFormPanelValues(data?: PanelSchemaInfertype): void;
};

export const PanelContext = createContext<PanelContextType>({
  panelsMethods: {} as UseFormReturn<PanelsSchemaInfertype>,
  fieldArrayPanelsMethods: {} as UseFieldArrayReturn<PanelsSchemaInfertype, "panels", "key">,
  handlePanelModal: () => null,
  updateModalType: () => null,
  resetFormPanelValues: () => null,
});
