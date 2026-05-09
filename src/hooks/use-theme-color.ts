import { theme } from "@/constants/theme";
import type { ColorFieldsType } from "@/constants/theme/colors";
import { useColorScheme } from "./use-color-scheme.web";

type UseThemeColorProps = {
  light?: string;
  dark?: string;
};

export function useThemeColor(props: UseThemeColorProps, colorName: keyof ColorFieldsType) {
  const themeColor = useColorScheme() ?? "dark";
  const colorFromProps = props[themeColor];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return theme.color[themeColor][colorName];
  }
}
