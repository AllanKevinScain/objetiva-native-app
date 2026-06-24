import type { PanelSchemaInfertype } from "@/schemas";
import { createPanelSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function usePanelForm() {
  const { t } = useTranslation();
  const requiredMessage = t("validation.required");
  const resolver = useMemo(() => zodResolver(createPanelSchema(requiredMessage)), [requiredMessage]);

  const defaultValues: PanelSchemaInfertype = useMemo(
    () => ({
      title: "",
      color: "",
      id: undefined,
      tasks: [],
    }),
    [],
  );

  const formPanelMethods = useForm<PanelSchemaInfertype>({
    resolver,
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
