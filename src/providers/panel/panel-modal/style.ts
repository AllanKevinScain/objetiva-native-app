import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  formContainer: {
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: theme.spacing.sizes.xs,
  },
  containerRangerDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: theme.spacing.sizes.md,
    marginTop: theme.spacing.sizes.md,
  },
});
