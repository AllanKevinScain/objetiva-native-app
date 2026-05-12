import { theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: theme.spacing.sizes.lg,
  },
  header: {
    width: "100%",
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: theme.spacing.sizes.md,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
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
  },
});
