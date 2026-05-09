import { useThemeColor } from "@/hooks/use-theme-color";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { TextApp } from "../text-app";
import { style } from "./style";

interface HeaderProps {
  back?: { title: string | undefined; href: string | undefined };
  name: string;
}

export function Header(props: HeaderProps) {
  const { name, back } = props;
  const { push, back: goBack } = useRouter();

  const primaryColor = useThemeColor({}, "primary");
  const textOnPrimary = useThemeColor({}, "textOnPrimary");

  const itsIndexPage = name.split("/").pop() === "Painel principal";
  const href = back?.href as Href;

  const handleBack = () => {
    if (href) {
      push(href);
    } else {
      goBack();
    }
  };

  return (
    <View style={[style.header, { backgroundColor: primaryColor }]}>
      <View style={[style.topBar, { justifyContent: "space-between" }]}>
        <View style={style.topBar}>
          {!itsIndexPage && (
            <TouchableOpacity style={style.backButton} onPress={handleBack}>
              <Ionicons name="chevron-back" size={28} color={textOnPrimary} />
            </TouchableOpacity>
          )}

          <TextApp style={style.title} darkColor={textOnPrimary} lightColor={textOnPrimary}>
            {name.split("/").pop() || name}
          </TextApp>
        </View>

        <TouchableOpacity style={style.menuButton}>
          <FontAwesome5 name="ellipsis-v" size={20} color={textOnPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
