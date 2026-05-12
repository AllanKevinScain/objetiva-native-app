import { theme } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
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

  const error = useThemeColor({}, "error");
  const surfaceSecondary = useThemeColor({}, "surfaceSecondary");

  const color = caption === "urgent" ? error : surfaceSecondary;

  if (disabled) {
    return (
      <View style={style.container}>
        {caption === "urgent" ? (
          <Entypo size={34} name="warning" color={color} />
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
            borderWidth: 1,
            padding: theme.spacing.sizes.sm,
            borderRadius: theme.spacing.borderRadius.md,
            opacity: selected ? 1 : 0.3,
          },
        ]}>
        {caption?.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
}
