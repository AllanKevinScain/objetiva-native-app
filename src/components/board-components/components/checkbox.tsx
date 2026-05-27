import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity, View } from "react-native";

import { useAppTheme } from "@/hooks/use-app-theme";
import { style } from "../style";
interface CheckboxProps {
  handleCheck: () => void;
  selected: boolean;
  icon?: "check" | "check-double";
}

export function Checkbox(props: CheckboxProps) {
  const { handleCheck, selected, icon = "check" } = props;

  const { colors } = useAppTheme();

  return (
    <TouchableOpacity onPress={handleCheck}>
      <View
        style={[
          style.containerBall,
          selected
            ? {
                backgroundColor: colors.primary,
                borderColor: colors.border,
              }
            : {
                borderColor: "white",
              },
        ]}>
        {selected && <FontAwesome5 name={icon} color="white" size={18} />}
      </View>
    </TouchableOpacity>
  );
}
