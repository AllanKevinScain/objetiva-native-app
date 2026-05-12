import { useCallback, useState } from "react";

export type ModalType = "create" | "edit";

export function useModalType() {
  const [modalType, setModalType] = useState<ModalType>("create");

  const updateModalType = useCallback((type: ModalType) => {
    setModalType(type);
  }, []);

  return {
    modalType,
    updateModalType,
  };
}
