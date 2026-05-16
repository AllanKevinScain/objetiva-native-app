import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputLabel: {
    marginBottom: theme.spacing.sizes.xs,
    fontWeight: "600",
    fontSize: 14,
  },
  error: {
    fontWeight: "500",
    fontSize: 12,
    marginTop: theme.spacing.sizes.xs,
  },
});
