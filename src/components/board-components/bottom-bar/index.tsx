import { useThemeColor } from "@/hooks/use-theme-color";
import { useBoard } from "@/providers/board";
import { Entypo } from "@expo/vector-icons";
import { Dimensions, View } from "react-native";
import { BottomBarItem } from "./bottom-bar-item";

export function BottomBar() {
  const { handleFormTaskModal, updateTaskModalType } = useBoard();

  const black = useThemeColor({}, "black");
  const border = useThemeColor({}, "border");
  const background = useThemeColor({}, "background");

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
      <BottomBarItem
        Icon={Entypo}
        iconName="plus"
        iconSize={40}
        isPrincipal
        onPress={() => {
          updateTaskModalType("create");
          handleFormTaskModal();
        }}
      />
    </View>
  );
}
