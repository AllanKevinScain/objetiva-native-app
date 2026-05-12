import type { TextFieldProps } from "@/components/text-field-rhf/text-field";
import { Textfield } from "@/components/text-field-rhf/text-field";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { AndroidNativeProps } from "@react-native-community/datetimepicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useMemo, useState } from "react";
import { Modal, Platform, TouchableOpacity, View } from "react-native";
import { style } from "./style";

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
    if (mode === "date") return value?.toLocaleDateString();
    return value?.toLocaleTimeString();
  }, [mode, value]);

  const white = useThemeColor({}, "white");
  const transparent = useThemeColor({}, "transparent");

  return (
    <>
      <TouchableOpacity onPress={() => setShow(true)}>
        <Textfield {...restTextfieldProps} editable={false} value={memoValue} />
      </TouchableOpacity>
      <Modal transparent visible={show}>
        <View style={[style.overlay, { backgroundColor: transparent }]}>
          <View
            style={[
              style.container,
              { backgroundColor: white },
              Platform.OS === "android" && { backgroundColor: "transparent" },
            ]}>
            <DateTimePicker
              value={value || new Date()}
              mode={mode}
              display={Platform.OS === "ios" ? "inline" : "default"}
              onValueChange={(_, date) => {
                onChange?.(date);
                setShow(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}
