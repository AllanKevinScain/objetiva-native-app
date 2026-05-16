import { useThemeColor } from "@/hooks/use-theme-color";
import { Entypo } from "@expo/vector-icons";
import { Dimensions, TouchableOpacity, View } from "react-native";

interface BottomBarProps {
  onMiddleIconPress: () => void;
}

export function BottomBar(props: BottomBarProps) {
  const { onMiddleIconPress } = props;

  const black = useThemeColor({}, "black");
  const border = useThemeColor({}, "border");
  const background = useThemeColor({}, "background");
  const primary = useThemeColor({}, "primary");
  const white = useThemeColor({}, "white");

  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: Dimensions.get("window").width,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 20,
        shadowColor: black,
        borderTopWidth: 1,
        borderTopColor: border,
        backgroundColor: background,
      }}>
      <TouchableOpacity
        onPress={onMiddleIconPress}
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 60,
          width: 60,
          borderRadius: 40,
          zIndex: 50,
        }}>
        <View
          style={[
            {
              alignItems: "center",
              justifyContent: "center",
              height: 70,
              width: 70,
              borderRadius: 40,
              top: -30,
            },
            { backgroundColor: primary },
          ]}>
          <Entypo name="plus" size={40} color={white} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
