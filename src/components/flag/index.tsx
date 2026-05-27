import { theme } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import type { FlagSchemaInferType } from "@/schemas";
import { Entypo } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { style } from "./style";

interface FlagProps {
  caption: FlagSchemaInferType;
  onPress?: () => void;
  disabled?: boolean;
  selected?: boolean;
}

export function Flag(props: FlagProps) {
  const { caption, onPress, disabled = false, selected = false } = props;

  const { colors, font } = useAppTheme();
  const color = caption === "urgent" ? colors.secondary : colors.primary;

  if (disabled) {
    return (
      <View style={style.container}>
        {caption === "urgent" ? (
          <Entypo size={28} name="warning" color={color} />
        ) : (
          <Entypo size={24} name="emoji-happy" color={color} />
        )}
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={style.container}>
      <Text
        style={[
          style.text,
          {
            color,
            fontFamily: font.bold,
            borderColor: color,
            borderWidth: 1.5,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
            backgroundColor: selected ? `${color}20` : "transparent",
            opacity: selected ? 1 : 0.4,
          },
        ]}>
        {caption === "urgent" ? "URGENTE" : "OPCIONAL"}
      </Text>
    </TouchableOpacity>
  );
}
