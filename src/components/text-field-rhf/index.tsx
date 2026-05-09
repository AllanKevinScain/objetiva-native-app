import type { Control, FieldPath, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { Controller } from "react-hook-form";
import type { TextFieldProps } from "./text-field";
import { Textfield } from "./text-field";

interface TextfieldRHFProps<T extends FieldValues> extends TextFieldProps {
  name: Path<T>;
  control: Control<T>;
  rules?: Omit<RegisterOptions<T, FieldPath<T>>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
}

export function TextfieldRHF<T extends FieldValues>(props: TextfieldRHFProps<T>) {
  const { control, name, rules, ...restProps } = props;

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, ...restRHF }, fieldState: { error } }) => {
        return <Textfield {...restProps} {...restRHF} onChangeText={onChange} messageError={error?.message} />;
      }}
    />
  );
}
