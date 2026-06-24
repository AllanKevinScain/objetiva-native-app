import { z } from "zod";

const DEFAULT_REQUIRED_MESSAGE = "Campo obrigatório.";

export function createTaskSchema(requiredMessage = DEFAULT_REQUIRED_MESSAGE) {
  return z.object({
    id: z.string().nullish(),
    at_updated: z.date().nullish(),
    description: z.string().nullish(),
    selected: z.boolean().nonoptional(requiredMessage),
  });
}

export const taskSchema = createTaskSchema();
export type TaskSchemaInfertype = z.infer<typeof taskSchema>;

export function createPanelSchema(requiredMessage = DEFAULT_REQUIRED_MESSAGE) {
  return z.object({
    id: z.uuid().nullish(),
    title: z.string().min(1, requiredMessage).nonempty(requiredMessage),
    color: z.string().min(1, requiredMessage).nonempty(requiredMessage),
    tasks: z.array(createTaskSchema(requiredMessage)),
  });
}

export const panelSchema = createPanelSchema();
export type PanelSchemaInfertype = z.infer<typeof panelSchema>;

export const panelsSchema = z.object({
  panels: z.array(panelSchema),
});
export type PanelsSchemaInfertype = z.infer<typeof panelsSchema>;
