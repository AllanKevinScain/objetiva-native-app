import { theme } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height / 10,
    justifyContent: "center",
    paddingRight: theme.spacing.sizes.md,
  },
  containerBall: {
    borderRadius: 40,
    borderWidth: 1,
    padding: 2,
  },
  ball: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },
});
