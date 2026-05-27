import { useAppTheme } from "@/hooks/use-app-theme";
import { Text, type TextProps } from "react-native";
import { styles } from "./style";

type TextAppProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function TextApp(props: TextAppProps) {
  const { style, lightColor, darkColor, type = "default", children, ...rest } = props;
  const { colors, font } = useAppTheme();
  const color = colors.text;

  const getFontFamily = () => {
    switch (type) {
      case "title":
      case "subtitle":
        return font.bold;
      case "defaultSemiBold":
        return font.medium;
      default:
        return font.regular;
    }
  };

  return (
    <Text
      style={[
        { color, fontFamily: getFontFamily() },
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
