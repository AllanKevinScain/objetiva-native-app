import { TouchableOpacityApp } from "@/components/touchableopacity-app";
import { theme } from "@/constants/theme";
import { Entypo } from "@expo/vector-icons";
import { FlatList } from "react-native";

export type StructureModeType = "grid" | "row" | null;

const structureModes: StructureModeType[] = ["grid", "row"];

interface ChooseStructureModeProps {
  handleStructureMode: (mode: StructureModeType) => void;
}

export function ChooseStructureMode(props: ChooseStructureModeProps) {
  const { handleStructureMode } = props;
  return (
    <FlatList
      data={structureModes}
      keyExtractor={(item, index) => (item ? item : index.toString())}
      numColumns={1}
      contentContainerStyle={{
        gap: 20,
        flexDirection: "row",
      }}
      renderItem={({ item }) => {
        return (
          <TouchableOpacityApp
            key={item}
            variant="ghost"
            onPress={() => handleStructureMode(item)}
            style={{ padding: 10, borderRadius: theme.spacing.borderRadius.lg }}>
            <Entypo size={24} name={item === "grid" ? "grid" : "list"} />
          </TouchableOpacityApp>
        );
      }}
    />
  );
}
