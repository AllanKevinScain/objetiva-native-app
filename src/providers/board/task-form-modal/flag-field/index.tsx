import { Flag } from "@/components/board-components";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { FlagSchemaInferType, TaskSchemaInfertype } from "@/schemas";
import { useFormContext, useWatch } from "react-hook-form";
import { Text, View } from "react-native";
import { style } from "./style";

type FlagsType = {
  caption: FlagSchemaInferType;
  color: string;
};

export function FlagField() {
  const { control, setValue } = useFormContext<TaskSchemaInfertype>();

  const error = useThemeColor({}, "error");
  const secondary = useThemeColor({}, "secondary");
  const black = useThemeColor({}, "black");

  const currentFlag = useWatch({ control, name: "flag" });

  const flags: FlagsType[] = [
    { caption: "urgent", color: error },
    { caption: "optional", color: secondary },
  ];

  return (
    <View>
      <Text style={[style.textFlags, { color: black }]}>Priority:</Text>
      <View style={style.containerFlags}>
        {flags.map((flag) => {
          return (
            <Flag
              key={flag.caption}
              selected={flag.caption === currentFlag}
              caption={flag.caption}
              onPress={() => setValue("flag", flag.caption!)}
            />
          );
        })}
      </View>
    </View>
  );
}
