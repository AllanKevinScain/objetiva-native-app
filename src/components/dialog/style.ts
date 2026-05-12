import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  modalContent: {
    bottom: 0,
    position: "absolute",
    width: "100%",

    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
    padding: 20,

    gap: 20,
  },
});
