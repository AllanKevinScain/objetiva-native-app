import { useAppTheme } from "@/hooks/use-app-theme";
import { useEffect } from "react";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

interface SkeletonProps {
  width?: number | string;
  height?: number;
  radius?: number;
}

export function Skeleton(props: SkeletonProps) {
  const { colors, spacing } = useAppTheme();
  const { width = "100%", height = 20, radius = spacing.borderRadius.sm } = props;

  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.2, {
        duration: 900,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, [opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius: radius,
          backgroundColor: colors.border,
        },
        animatedStyle,
      ]}
    />
  );
}
