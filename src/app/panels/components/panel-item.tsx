import { TextApp, TouchableOpacityApp } from "@/components";
import { theme } from "@/constants/theme";
import type { PanelSchemaInfertype } from "@/schemas";
import { View } from "react-native";

interface PanelItemProps extends Omit<PanelSchemaInfertype, "id"> {
  onPress: () => void;
}

export function PanelItem(props: PanelItemProps) {
  const { title, color, onPress } = props;

  return (
    <TouchableOpacityApp
      variant="ghost"
      style={{
        maxWidth: "100%",
        borderRadius: theme.spacing.borderRadius.lg,
        paddingHorizontal: 30,
        height: 80,
        alignItems: "flex-start",
      }}
      onPress={onPress}>
      <View style={{ width: "100%", flexDirection: "column" }}>
        <TextApp type="defaultSemiBold">{title}</TextApp>

        <View style={{ width: "100%", height: 1, backgroundColor: color, marginTop: 10 }} />
      </View>
    </TouchableOpacityApp>
  );
}
