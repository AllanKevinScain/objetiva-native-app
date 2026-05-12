import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    borderRadius: theme.spacing.borderRadius.sm,
    padding: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
  },
});
