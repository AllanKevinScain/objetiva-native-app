import type { PanelsSchemaInfertype } from "@/schemas";
import { panelsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";

export function usePanelsArray() {
  const panelsMethods = useForm<PanelsSchemaInfertype>({
    resolver: zodResolver(panelsSchema),
    defaultValues: { panels: [] },
  });

  const fieldArrayPanelsMethods = useFieldArray({
    control: panelsMethods.control,
    name: "panels",
    keyName: "key",
  });

  return {
    panelsMethods,
    fieldArrayPanelsMethods,
  };
}
