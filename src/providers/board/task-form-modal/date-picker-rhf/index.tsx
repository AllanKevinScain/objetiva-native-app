import type { Control, FieldPath, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Datepicker, type DatepickerProps } from "./date-picker";

interface DatepickerRHFProps<T extends FieldValues> extends DatepickerProps {
  name: Path<T>;
  control: Control<T>;
  rules?: Omit<RegisterOptions<T, FieldPath<T>>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
}

export function DatepickerRHF<T extends FieldValues>(props: DatepickerRHFProps<T>) {
  const { name, control, rules, ...restprops } = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <Datepicker {...restprops} {...field} messageError={error?.message} />
      )}
    />
  );
}
