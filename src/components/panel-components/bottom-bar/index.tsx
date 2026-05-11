import { useThemeColor } from "@/hooks/use-theme-color";
import { usePanel } from "@/providers/panel";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { Dimensions, View } from "react-native";
import { BottomBarItem } from "./bottom-bar-item";

export function BottomBar() {
  const { handlePanelModal } = usePanel();

  const black = useThemeColor({}, "black");
  const border = useThemeColor({}, "border");

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
        paddingBottom: 40,
        shadowColor: black,
        borderTopWidth: 1,
        borderTopColor: border,
      }}>
      <BottomBarItem Icon={AntDesign} iconName="bars" onPress={() => null} isSelected={false} />
      <BottomBarItem Icon={Entypo} iconName="plus" iconSize={40} isPrincipal onPress={handlePanelModal} />
      <BottomBarItem Icon={FontAwesome} iconName="user" onPress={() => null} isSelected={false} />
    </View>
  );
}
