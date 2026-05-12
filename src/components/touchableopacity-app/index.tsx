import { useThemeColor } from "@/hooks/use-theme-color";
import type { TouchableOpacityProps } from "react-native";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { style } from "./styles";

interface TouchableOpacityAppProps extends TouchableOpacityProps {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
}

export function TouchableOpacityApp(props: TouchableOpacityAppProps) {
  const { children, isLoading, variant = "primary", style: customStyle, disabled, ...rest } = props;

  const primaryColor = useThemeColor({}, "primary");
  const secondaryColor = useThemeColor({}, "secondary");
  const surfaceSecondaryColor = useThemeColor({}, "surfaceSecondary");
  const transparentColor = useThemeColor({}, "transparent");
  const textOnPrimary = useThemeColor({}, "textOnPrimary");
  const black = useThemeColor({}, "black");

  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return { backgroundColor: secondaryColor };
      case "ghost":
        return {
          backgroundColor: transparentColor,
          borderWidth: 1,
          borderColor: primaryColor,
          elevation: 0,
          shadowOpacity: 0,
        };
      default:
        return { backgroundColor: primaryColor };
    }
  };

  const disabledStyles = disabled
    ? {
        backgroundColor: surfaceSecondaryColor,
        elevation: 0,
        shadowOpacity: 0,
        opacity: 0.6,
      }
    : {};

  const textStyles = [style.touchableOpacityText, { color: variant === "ghost" ? primaryColor : textOnPrimary }];

  return (
    <TouchableOpacity
      style={[style.touchableOpacity, { shadowColor: black }, getVariantStyles(), disabledStyles, customStyle]}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator color={variant === "ghost" ? primaryColor : textOnPrimary} />
      ) : (
        <Text style={textStyles}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}
