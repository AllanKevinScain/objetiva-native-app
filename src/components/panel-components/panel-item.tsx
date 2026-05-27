import { TextApp } from "@/components/text-app";
import { useAppTheme } from "@/hooks/use-app-theme";
import type { PanelSchemaInfertype } from "@/schemas";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface PanelItemProps extends Omit<PanelSchemaInfertype, "id"> {
  onPress: () => void;
}

export function PanelItem(props: PanelItemProps) {
  const { title, color, onPress } = props;
  const { colors, font, spacing } = useAppTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          shadowColor: "#000",
        },
      ]}
      onPress={onPress}>
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

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    overflow: "hidden",
    
    // Shadow for iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Elevation for Android
    elevation: 4,
  },
  marker: {
    width: 6,
    height: "100%",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 4,
  },
});
