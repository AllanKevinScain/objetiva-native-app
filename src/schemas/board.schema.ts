import { REQUIRED_MESSAGE } from "@/constants/zod";
import { z } from "zod";

export const flagSchema = z.enum(["urgent", "optional"]);
export type FlagSchemaInferType = z.infer<typeof flagSchema>;

export const taskSchema = z.object({
  id: z.string().nullish(),
  at_updated: z.date().nullish(),
  description: z.string().nullish(),

  selected: z.boolean().nonoptional(REQUIRED_MESSAGE),
  title: z.string().min(1, REQUIRED_MESSAGE),
  limitTime: z.date().nonoptional(REQUIRED_MESSAGE),
  limitDate: z.date().nonoptional(REQUIRED_MESSAGE),
  flag: flagSchema.nonoptional(REQUIRED_MESSAGE),
});
export type TaskSchemaInfertype = z.infer<typeof taskSchema>;

export const tasksSchema = z.object({
  tasks: z.array(taskSchema),
  search: z.string().nullish(),
});
export type TasksSchemaInfertype = z.infer<typeof tasksSchema>;

const _boardSchema = z.object({
  id: z.string().min(1, REQUIRED_MESSAGE),
  tasks: z.array(taskSchema),
});
export type BoardSchemaInfertype = z.infer<typeof _boardSchema>;
