import { useCallback, useState } from "react";
import type { PanelModalType } from "../provider";

export function useModalType() {
  const [modalType, setModalType] = useState<PanelModalType>("create");

  const updateModalType = useCallback((type: PanelModalType) => {
    setModalType(type);
  }, []);

  return {
    modalType,
    updateModalType,
  };
}
