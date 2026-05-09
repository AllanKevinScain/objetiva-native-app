import { REQUIRED_MESSAGE } from "@/constants/zod";
import { z } from "zod";

export const panelSchema = z.object({
  id: z.uuid().nullish(),
  title: z.string().min(1, REQUIRED_MESSAGE),
  color: z.string().min(1, REQUIRED_MESSAGE),
});
export type PanelSchemaInfertype = z.infer<typeof panelSchema>;

export const panelsSchema = z.object({
  panels: z.array(panelSchema),
});
export type PanelsSchemaInfertype = z.infer<typeof panelsSchema>;
