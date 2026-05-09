import { theme } from "@/constants/theme";
import { Platform, StatusBar, StyleSheet } from "react-native";

export const style = StyleSheet.create({
  header: {
    height: Platform.OS === "ios" ? 100 : 70 + (StatusBar.currentHeight || 0),
    justifyContent: "flex-end",
    paddingBottom: 10,
    paddingHorizontal: 15,
    // Android Shadow
    elevation: 8,
    // iOS Shadow
    shadowColor: theme.color.dark.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  menuButton: {
    padding: 5,
  },
});
