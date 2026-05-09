import { useThemeColor } from "@/hooks/use-theme-color";
import { Text, type TextProps } from "react-native";
import Animated from "react-native-reanimated";
import { styles } from "./style";

type TextAppProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
  hasAnimation?: boolean;
};

export function TextApp(props: TextAppProps) {
  const {
    style,
    lightColor,
    darkColor,
    type = "default",
    hasAnimation = false,
    children,
    ...rest
  } = props;
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "textPrimary",
  );

  if (hasAnimation) {
    return (
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
        }}
      >
        👋
      </Animated.Text>
    );
  }

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
}
