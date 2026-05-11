import { theme } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
import Animated from "react-native-reanimated";

export function AnimatedView({ children }: { children: React.ReactNode }) {
  const backgroundColor = useThemeColor(
    {
      light: theme.color.light.background,
      dark: theme.color.dark.background,
    },
    "background",
  );

  return <Animated.View style={{ padding: 20, backgroundColor, flex: 1 }}>{children}</Animated.View>;
}
