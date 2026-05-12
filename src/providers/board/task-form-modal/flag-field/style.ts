import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  containerFlags: {
    flexDirection: "row",
    gap: theme.spacing.sizes.sm,
    marginTop: theme.spacing.sizes.sm,
  },
  textFlags: {
    fontSize: 16,
    fontWeight: "600",
  },
});
