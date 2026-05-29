import { TextApp } from "@/components/text-app";
import { useAppTheme } from "@/hooks/use-app-theme";
import type { PanelSchemaInfertype } from "@/schemas";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface PanelItemProps extends Omit<PanelSchemaInfertype, "id"> {
  onPress: () => void;
  onLongPress: () => void;
}

export function PanelItem(props: PanelItemProps) {
  const { title, color, onPress, onLongPress } = props;
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          shadowColor: "black",
        },
      ]}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View style={[styles.marker, { backgroundColor: color }]} />
      <View style={styles.content}>
        <TextApp type="subtitle" style={styles.title}>
          {title}
        </TextApp>
        <TextApp type="default" style={{ color: colors.text, opacity: 0.6 }}>
          Toque para ver as tarefas
        </TextApp>
      </View>
    </TouchableOpacity>
  );
}
