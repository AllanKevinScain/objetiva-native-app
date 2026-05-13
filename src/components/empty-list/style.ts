import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 40,
  },
  text: {
    fontSize: 16,
  },
  button: {
    paddingHorizontal: theme.spacing.sizes.md,
  },
});
