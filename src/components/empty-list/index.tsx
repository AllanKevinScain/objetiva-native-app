import { useAppTheme } from "@/hooks/use-app-theme";
import { Text, View } from "react-native";
import { TouchableOpacityApp } from "../touchableopacity-app";
import { style } from "./style";

interface EmptyListProps {
  message?: string;
  buttonContent?: string;
  onButtonPress?: () => void;
}

export function EmptyList(props: EmptyListProps) {
  const { message = "Essa lista está vazia.", buttonContent, onButtonPress } = props;
  const { colors } = useAppTheme();
  const textPrimary = colors.text;

  return (
    <View style={style.container}>
      <Text
        style={[
          style.text,
          {
            color: textPrimary,
          },
        ]}>
        {message}
      </Text>
      {buttonContent && (
        <TouchableOpacityApp variant="ghost" style={style.button} onPress={onButtonPress}>
          {buttonContent}
        </TouchableOpacityApp>
      )}
    </View>
  );
}
