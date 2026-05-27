import { useAppTheme } from "@/hooks/use-app-theme";
import type { TouchableOpacityProps } from "react-native";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { style } from "./styles";

interface TouchableOpacityAppProps extends TouchableOpacityProps {
  isLoading?: boolean;
  variant?: "primary" | "secondary" | "ghost";
}

export function TouchableOpacityApp(props: TouchableOpacityAppProps) {
  const { children, isLoading, variant = "primary", style: customStyle, disabled, ...rest } = props;
  const { colors, font } = useAppTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return { backgroundColor: colors.secondary };
      case "ghost":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: colors.primary,
          elevation: 0,
          shadowOpacity: 0,
        };
      default:
        return { backgroundColor: colors.primary };
    }
  };

  const disabledStyles = disabled
    ? {
        backgroundColor: colors.border,
        elevation: 0,
        shadowOpacity: 0,
        opacity: 0.6,
      }
    : {};

  const textStyles = [
    style.touchableOpacityText,
    {
      color: variant === "ghost" ? colors.primary : colors.text,
      fontFamily: font.bold,
    },
  ];

  return (
    <TouchableOpacity
      style={[style.touchableOpacity, { shadowColor: "#000" }, getVariantStyles(), disabledStyles, customStyle]}
      disabled={disabled || isLoading}
      activeOpacity={0.7}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator color={variant === "ghost" ? colors.primary : colors.text} />
      ) : (
        <Text style={textStyles}>{children}</Text>
      )}
    </TouchableOpacity>
  );
}
