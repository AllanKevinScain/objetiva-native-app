import type { PanelSchemaInfertype } from "@/schemas";
import { panelSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

export function usePanelForm() {
  const defaultValues: PanelSchemaInfertype = useMemo(
    () => ({
      title: "",
      color: "#000",
      id: undefined,
    }),
    [],
  );

  const formPanelMethods = useForm<PanelSchemaInfertype>({
    resolver: zodResolver(panelSchema),
    defaultValues,
  });

  const resetFormPanelValues = useCallback(
    (data?: PanelSchemaInfertype) => {
      formPanelMethods.reset(data ? data : defaultValues);
    },
    [defaultValues, formPanelMethods],
  );

  return {
    formPanelMethods,
    resetFormPanelValues,
    defaultValues,
  };
}
