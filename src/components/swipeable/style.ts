import { theme } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  actions: {
    width: "100%",
    height: Dimensions.get("window").height / 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: theme.spacing.sizes.md,

    borderRadius: theme.spacing.borderRadius.md,
    paddingVertical: theme.spacing.sizes.sm,
    paddingHorizontal: theme.spacing.sizes.md,

    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
  },
  removeButton: {
    width: "auto",
    height: "100%",
    borderRadius: theme.spacing.borderRadius.sm,
    paddingHorizontal: theme.spacing.sizes.sm,
  },
  updatedButton: {
    width: "auto",
    height: "100%",
    borderRadius: theme.spacing.borderRadius.sm,
    paddingHorizontal: theme.spacing.sizes.sm,
  },
});
