import { theme } from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";
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
  const textSecondary = useThemeColor({}, "textSecondary");
  const textPrimary = useThemeColor({}, "textPrimary");
  const error = useThemeColor({}, "error");
  const border = useThemeColor({}, "border");
  const surface = useThemeColor({}, "surface");

  const [showPass, setShowPass] = useState(true);

  const isPasswordField = type === "pass";

  function togglePass() {
    setShowPass((s) => !s);
  }

  return (
    <View style={style.container}>
      {label && <Text style={[style.inputLabel, { color: textSecondary }, labelStyle]}>{label}</Text>}
      <View
        style={[
          style.inputBox,
          { borderColor: border, backgroundColor: surface },
          !!messageError && { borderColor: error },
          containerStyle,
        ]}>
        {IconLeft && iconLeftName && (
          <TouchableOpacity onPress={iconPress} disabled={!iconPress} style={{ marginRight: theme.spacing.sizes.sm }}>
            <IconLeft name={iconLeftName} size={20} color={textSecondary} />
          </TouchableOpacity>
        )}

        <TextInput
          style={[
            style.input,
            {
              color: textPrimary,
            },
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={textSecondary}
          secureTextEntry={isPasswordField ? showPass : secureTextEntry}
          {...restInputProps}
        />

        {isPasswordField && (
          <TouchableOpacity onPress={togglePass} style={{ marginLeft: theme.spacing.sizes.sm }}>
            <Octicons name={showPass ? "eye-closed" : "eye"} size={20} color={textSecondary} />
          </TouchableOpacity>
        )}

        {IconRight && iconRightName && !isPasswordField && (
          <TouchableOpacity onPress={iconPress} style={{ marginLeft: theme.spacing.sizes.sm }}>
            <IconRight name={iconRightName} size={20} color={textSecondary} />
          </TouchableOpacity>
        )}
      </View>
      {!!messageError && (
        <Text
          style={[
            style.error,
            {
              color: error,
            },
          ]}>
          {messageError}
        </Text>
      )}
    </View>
  );
}
