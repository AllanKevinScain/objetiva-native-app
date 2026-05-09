import { theme } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    bottom: 0,
    position: "absolute",
    width: "100%",
    height: Dimensions.get("window").height / 2,
    backgroundColor: "#fff",

    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
    padding: 20,

    gap: 20,
  },
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
