import { useThemeColor } from "@/hooks/use-theme-color";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions, Modal, Pressable, TouchableOpacity } from "react-native";
import { style } from "./style";

interface DialogProps {
  visible: boolean;
  children: React.ReactNode;
  heightContainerModal?: number;
  onRequestClose: () => void;
}

export function Dialog(props: DialogProps) {
  const { visible, onRequestClose, children, heightContainerModal } = props;
  const black = useThemeColor({}, "black");

  const height = heightContainerModal ? heightContainerModal : Dimensions.get("window").height / 2;

  return (
    <Modal visible={visible} onRequestClose={onRequestClose} animationType="fade" transparent>
      <Pressable style={style.container} onPress={onRequestClose}>
        <Pressable style={[style.modalContent, { height }]} onPress={(e) => e.stopPropagation()}>
          <TouchableOpacity onPress={onRequestClose} style={{ position: "absolute", top: 4, right: 4, padding: 10 }}>
            <MaterialIcons name="close" size={30} color={black} />
          </TouchableOpacity>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
