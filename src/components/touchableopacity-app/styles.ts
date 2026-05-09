import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  touchableOpacity: {
    flex: 1,
    maxHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.spacing.borderRadius.full,
    // Android Shadow
    elevation: 4,
    // iOS Shadow
    shadowColor: theme.color.dark.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  touchableOpacityText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
