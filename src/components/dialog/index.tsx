import { useThemeColor } from "@/hooks/use-theme-color";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions, KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, TouchableOpacity } from "react-native";
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
  const white = useThemeColor({}, "white");
  const transparent = useThemeColor({}, "transparent");

  const height = heightContainerModal ? heightContainerModal : Dimensions.get("window").height / 2;

  return (
    <Modal visible={visible} onRequestClose={onRequestClose} animationType="fade" transparent>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <Pressable style={[style.container, { backgroundColor: transparent }]} onPress={onRequestClose}>
          <Pressable
            style={[style.modalContent, { height, backgroundColor: white }]}
            onPress={(e) => {
              // Previne que o clique no conteúdo feche o modal
            }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={style.scrollContent}>
              {children}
            </ScrollView>
            <TouchableOpacity
              onPress={onRequestClose}
              style={{ position: "absolute", top: 4, right: 4, padding: 10, zIndex: 10 }}>
              <MaterialIcons name="close" size={30} color={black} />
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}
