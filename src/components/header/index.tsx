import { useThemeColor } from "@/hooks/use-theme-color";
import { useBoard } from "@/providers";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import type { Href } from "expo-router";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { TextApp } from "../text-app";
import { style } from "./style";

interface HeaderProps {
  back?: { title: string | undefined; href: string | undefined };
  name: string;
  isPrincipalPage?: boolean;
}

export function Header(props: HeaderProps) {
  const { name, back, isPrincipalPage = false } = props;
  const { handleActionsModal } = useBoard();

  const { push, back: goBack } = useRouter();

  const primaryColor = useThemeColor({}, "primary");
  const textOnPrimary = useThemeColor({}, "textOnPrimary");

  const handleBack = () => {
    const href = back?.href as Href;

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
          {!isPrincipalPage && (
            <TouchableOpacity style={style.backButton} onPress={handleBack}>
              <Ionicons name="chevron-back" size={28} color={textOnPrimary} />
            </TouchableOpacity>
          )}

          <TextApp style={style.title} darkColor={textOnPrimary} lightColor={textOnPrimary}>
            {isPrincipalPage && (
              <Animated.Text
                style={{
                  fontSize: 28,
                  lineHeight: 32,
                  marginTop: -6,
                  animationName: {
                    "50%": { transform: [{ rotate: "25deg" }] },
                  },
                  animationIterationCount: 4,
                  animationDuration: "300ms",
                }}>
                👋
              </Animated.Text>
            )}
            {isPrincipalPage ? " Seja bem vindo!" : name.split("/").pop() || name}
          </TextApp>
        </View>

        {!isPrincipalPage && (
          <TouchableOpacity style={style.menuButton} onPress={handleActionsModal}>
            <FontAwesome5 name="ellipsis-v" size={20} color={textOnPrimary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
