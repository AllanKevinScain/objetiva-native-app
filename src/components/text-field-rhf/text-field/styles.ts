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
  inputBox: {
    width: "100%",
    height: 48,
    borderWidth: 1,

    borderRadius: theme.spacing.borderRadius.md,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.sizes.md,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  error: {
    fontWeight: "500",
    fontSize: 12,
    marginTop: theme.spacing.sizes.xs,
  },
});
