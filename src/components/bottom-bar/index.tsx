import { useAppTheme } from "@/hooks/use-app-theme";
import { Entypo } from "@expo/vector-icons";
import { Dimensions, Platform, TouchableOpacity, View } from "react-native";

interface BottomBarProps {
  onMiddleIconPress: () => void;
}

export function BottomBar(props: BottomBarProps) {
  const { onMiddleIconPress } = props;
  const { colors } = useAppTheme();

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: Dimensions.get("window").width,
        height: Platform.OS === "ios" ? 90 : 70,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: colors.bg,
        borderTopWidth: 1,
        borderTopColor: colors.border,

        // Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 20,
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onMiddleIconPress}
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 64,
          width: 64,
          borderRadius: 32,
          backgroundColor: colors.primary,
          top: -30,

          // Button Shadow
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.4,
          shadowRadius: 8,
          elevation: 8,
        }}>
        <Entypo name="plus" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}
