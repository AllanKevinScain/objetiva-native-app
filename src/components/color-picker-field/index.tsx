import type { Control, FieldPath, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { Controller, useController } from "react-hook-form";

import { useEffect } from "react";
import type { PickerProps } from "./picker";
import { Picker } from "./picker";

function generateRandomHex(): string {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);

  return `#${hex.padStart(6, "0")}`;
}

interface ColorpickerRHFProps<T extends FieldValues> extends Omit<PickerProps, "value" | "onChangeValue" | "error"> {
  name: Path<T>;
  control: Control<T>;
  rules?: Omit<RegisterOptions<T, FieldPath<T>>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">;
}

export function ColorpickerRHF<T extends FieldValues>(props: ColorpickerRHFProps<T>) {
  const { control, name, rules, ...restProps } = props;

  const {
    field: { onChange, value },
  } = useController({ control, name });

  useEffect(() => {
    if (value) return;

    const hex = generateRandomHex();
    onChange(hex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, ...restRHF }, fieldState: { error } }) => {
        return <Picker {...restProps} {...restRHF} onChangeValue={onChange} messageError={error?.message} />;
      }}
    />
  );
}
