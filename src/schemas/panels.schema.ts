import { REQUIRED_MESSAGE } from "@/constants/zod";
import { z } from "zod";

export const taskSchema = z.object({
  id: z.string().nullish(),
  at_updated: z.date().nullish(),
  description: z.string().nullish(),
  selected: z.boolean().nonoptional(REQUIRED_MESSAGE),
});
export type TaskSchemaInfertype = z.infer<typeof taskSchema>;

export const panelSchema = z.object({
  id: z.uuid().nullish(),
  title: z.string().min(1, REQUIRED_MESSAGE).nonempty(REQUIRED_MESSAGE),
  color: z.string().min(1, REQUIRED_MESSAGE).nonempty(REQUIRED_MESSAGE),
  tasks: z.array(taskSchema),
});
export type PanelSchemaInfertype = z.infer<typeof panelSchema>;

export const panelsSchema = z.object({
  panels: z.array(panelSchema),
});
export type PanelsSchemaInfertype = z.infer<typeof panelsSchema>;
