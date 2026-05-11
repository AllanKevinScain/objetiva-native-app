import { useThemeColor } from "@/hooks/use-theme-color";
import { Text, type TextProps } from "react-native";
import { styles } from "./style";

type TextAppProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function TextApp(props: TextAppProps) {
  const { style, lightColor, darkColor, type = "default", children, ...rest } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "textPrimary");

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
      {...rest}>
      {children}
    </Text>
  );
}
