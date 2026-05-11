import { useCallback, useState } from "react";

export function usePanelModal() {
  const [panelModalState, setPanelModal] = useState(false);

  const handlePanelModal = useCallback(() => {
    setPanelModal((s) => !s);
  }, []);

  return {
    panelModalState,
    handlePanelModal,
  };
}
