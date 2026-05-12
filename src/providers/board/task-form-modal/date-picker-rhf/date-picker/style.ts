import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "80%",
    padding: theme.spacing.sizes.md,
    borderRadius: theme.spacing.borderRadius.md,
    elevation: 5,
    alignItems: "center",
  },
});
