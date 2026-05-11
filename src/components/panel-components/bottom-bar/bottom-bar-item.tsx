import { useThemeColor } from "@/hooks/use-theme-color";
import type { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import type { ComponentProps, ElementType } from "react";
import { TouchableOpacity, View } from "react-native";
import { style } from "./styles";

type NameAntDesigneType = ComponentProps<typeof AntDesign>["name"];
type NameFontAwesomeType = ComponentProps<typeof FontAwesome>["name"];
type NameEntypoType = ComponentProps<typeof Entypo>["name"];

type IconNameType = NameAntDesigneType | NameFontAwesomeType | NameEntypoType;
type TabIconType = ElementType;

interface BottomBarItemProps {
  Icon: TabIconType;
  iconName: IconNameType;
  onPress?: () => void;
  disabled?: boolean;
  iconSize?: number;
  isPrincipal?: boolean;
  isSelected?: boolean;
}

export function BottomBarItem(props: BottomBarItemProps) {
  const { Icon, iconName, onPress, disabled = false, iconSize = 32, isPrincipal = false, isSelected = false } = props;

  const primary = useThemeColor({}, "primary");
  const textSecondary = useThemeColor({}, "textSecondary");
  const white = useThemeColor({}, "white");

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={style.container}>
      {isPrincipal && (
        <View style={[style.principalContainer, { backgroundColor: primary }]}>
          <Icon name={iconName} size={iconSize} color={white} />
        </View>
      )}
      {!isPrincipal && (
        <Icon
          name={iconName}
          size={iconSize}
          color={isSelected ? primary : textSecondary}
          style={[style.icon, { color: primary }]}
        />
      )}
    </TouchableOpacity>
  );
}
