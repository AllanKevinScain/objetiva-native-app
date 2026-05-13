import type { TextFieldProps } from "@/components/text-field-rhf/text-field";
import { Textfield } from "@/components/text-field-rhf/text-field";
import type { AndroidNativeProps } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMemo, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";

type OmitTextFieldProps = Omit<TextFieldProps, "value" | "onChange">;

export interface DatepickerProps extends OmitTextFieldProps {
  value?: Date;
  mode?: Pick<AndroidNativeProps, "mode">["mode"];
  onChange?: (value?: Date) => void;
}

export function Datepicker(props: DatepickerProps) {
  const { value, mode, onChange, ...restTextfieldProps } = props;

  const [show, setShow] = useState(false);

  const memoValue = useMemo(() => {
    if (!value) return "";

    if (mode === "time") {
      return value.toLocaleTimeString();
    }

    return value.toLocaleDateString();
  }, [mode, value]);

  return (
    <>
      <TouchableOpacity onPress={() => setShow(true)}>
        <Textfield {...restTextfieldProps} editable={false} value={memoValue} />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(_, date) => {
            setShow(false);

            if (date) {
              onChange?.(date);
            }
          }}
        />
      )}
    </>
  );
}
