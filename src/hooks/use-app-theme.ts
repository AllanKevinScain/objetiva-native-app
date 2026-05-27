import { theme } from "@/constants/theme";
import { useTheme as useNavigationTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";

export function useAppTheme() {
  const { colors, ...rest } = useNavigationTheme();
  const colorScheme = useColorScheme() ?? "dark";

  return {
    colors: {
      ...colors,
      secondary: theme.color[colorScheme].secondary,
      bg: colors.background,
      bgModal: theme.color[colorScheme].bgModal,
    },
    ...rest,
    font: theme.font,
    spacing: theme.spacing,
  };
}
