import { useThemeColor } from "@/hooks/use-theme-color";
import { Text, View } from "react-native";

import { style } from "./styles";

import ColorPicker from "react-native-wheel-color-picker";

export interface PickerProps {
  value: string;
  onChangeValue: (_: string) => void;
  messageError?: string;
}

export function Picker(props: PickerProps) {
  const { value, onChangeValue, messageError } = props;
  const error = useThemeColor({}, "error");

  return (
    <View style={style.container}>
      <View style={{ position: "relative", width: "100%", height: 300 }}>
        <ColorPicker
          color={value}
          onColorChangeComplete={onChangeValue}
          thumbSize={30}
          sliderSize={30}
          noSnap
          row={false}
        />
      </View>

      {!!messageError && (
        <Text
          style={[
            style.error,
            {
              color: error,
            },
          ]}>
          {messageError}
        </Text>
      )}
    </View>
  );
}
