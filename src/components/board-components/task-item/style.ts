import { theme } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: theme.spacing.sizes.xl,
    paddingBottom: theme.spacing.sizes.md,
  },
  swipeableContainer: {
    width: "100%",
    height: Dimensions.get("window").height / 10,
    paddingHorizontal: theme.spacing.sizes.md,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderRadius: theme.spacing.borderRadius.md,
    borderWidth: 1,
  },
  secondaryContainer: {
    maxWidth: Dimensions.get("window").width / 1.6,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  description: {
    fontSize: 13,
    fontWeight: "500",
    marginTop: 2,
  },
});
