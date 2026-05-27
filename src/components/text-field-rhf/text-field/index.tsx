import { theme } from "@/constants/theme";
import { useAppTheme } from "@/hooks/use-app-theme";
import type { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import type { ComponentProps, ElementType } from "react";
import { useState } from "react";
import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { style } from "./styles";

type MaterialIconsType = ComponentProps<typeof MaterialIcons>;
type NameMaterialIconsType = Pick<MaterialIconsType, "name">;

type FontAwesomeType = ComponentProps<typeof FontAwesome>;
type NameFontAwesomeType = Pick<FontAwesomeType, "name">;

type OcticonsType = ComponentProps<typeof Octicons>;
type NameOcticonsType = Pick<OcticonsType, "name">;

type IconNameType = NameMaterialIconsType["name"] | NameFontAwesomeType["name"] | NameOcticonsType["name"];

export interface TextFieldProps extends TextInputProps {
  label?: string;
  IconLeft?: ElementType;
  iconLeftName?: IconNameType;
  IconRight?: ElementType;
  iconRightName?: IconNameType;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  messageError?: string;
  type?: "pass" | "text";
  iconPress?: () => void;
}

export function Textfield(props: TextFieldProps) {
  const {
    value = "",
    onChangeText = () => null,
    label,
    IconLeft,
    iconLeftName,
    IconRight,
    iconRightName,
    iconPress,
    labelStyle,
    containerStyle,
    inputStyle,
    messageError,
    type = "text",
    secureTextEntry,
    ...restInputProps
  } = props;
  const { colors, font } = useAppTheme();

  const [showPass, setShowPass] = useState(true);

  const isPasswordField = type === "pass";

  function togglePass() {
    setShowPass((s) => !s);
  }

  return (
    <View style={style.container}>
      {label && <Text style={[style.inputLabel, { color: colors.text, fontFamily: font.medium }, labelStyle]}>{label}</Text>}
      <View
        style={[
          style.inputBox,
          { borderColor: colors.border, backgroundColor: colors.bg },
          !!messageError && { borderColor: colors.secondary },
          containerStyle,
        ]}>
        {IconLeft && iconLeftName && (
          <TouchableOpacity onPress={iconPress} disabled={!iconPress} style={{ marginRight: theme.spacing.sizes.sm }}>
            <IconLeft name={iconLeftName} size={20} color={colors.text} />
          </TouchableOpacity>
        )}

        <TextInput
          style={[
            style.input,
            {
              color: colors.text,
              fontFamily: font.regular,
            },
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={colors.text}
          secureTextEntry={isPasswordField ? showPass : secureTextEntry}
          {...restInputProps}
        />

        {isPasswordField && (
          <TouchableOpacity onPress={togglePass} style={{ marginLeft: theme.spacing.sizes.sm }}>
            <Octicons name={showPass ? "eye-closed" : "eye"} size={20} color={colors.text} />
          </TouchableOpacity>
        )}

        {IconRight && iconRightName && !isPasswordField && (
          <TouchableOpacity onPress={iconPress} style={{ marginLeft: theme.spacing.sizes.sm }}>
            <IconRight name={iconRightName} size={20} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
      {!!messageError && (
        <Text
          style={[
            style.error,
            {
              color: colors.secondary,
              fontFamily: font.regular,
            },
          ]}>
          {messageError}
        </Text>
      )}
    </View>
  );
}
