import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    width: "100%",

    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
    overflow: "hidden",
  },
  scrollContent: {
    padding: 20,
    gap: 20,
  },
});
