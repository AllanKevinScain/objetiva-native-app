import { useThemeColor } from "@/hooks/use-theme-color";
import React from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { TouchableOpacityApp } from "../touchableopacity-app";
import { style } from "./style";

interface SwipeableProps {
  styleContainer?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  onRemove: () => void;
  onUpdated: () => void;
}

export function Swipeable(props: SwipeableProps) {
  const { children, styleContainer, onRemove, onUpdated } = props;
  const border = useThemeColor({}, "border");
  const error = useThemeColor({}, "error");
  const primary = useThemeColor({}, "primary");

  const translateX = useSharedValue(0);
  const ACTION_WIDTH = 190;

  const handlePress = () => {
    const isOpen = translateX.value !== 0;

    if (isOpen) {
      translateX.value = withSpring(0);
    } else {
      translateX.value = withSpring(-ACTION_WIDTH);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
      <View
        style={[
          style.actions,
          {
            backgroundColor: border,
          },
        ]}>
        <TouchableOpacityApp
          style={[
            style.removeButton,
            {
              backgroundColor: error,
            },
          ]}
          variant="primary"
          onPress={(e) => {
            e.stopPropagation();
            onRemove();
          }}>
          Remove
        </TouchableOpacityApp>
        <TouchableOpacityApp
          style={[
            style.updatedButton,
            {
              backgroundColor: primary,
            },
          ]}
          variant="secondary"
          onPress={(e) => {
            e.stopPropagation();
            onUpdated();
            handlePress();
          }}>
          Update
        </TouchableOpacityApp>
      </View>

      <Animated.View style={[styleContainer, animatedStyle]}>{children}</Animated.View>
    </TouchableOpacity>
  );
}
