import { useState } from "react";

export function useBoardActions() {
  const [actionsModalVisible, setActionsModal] = useState(false);

  function handleActionsModal() {
    setActionsModal((s) => !s);
  }

  return {
    actionsModalVisible,
    handleActionsModal,
  };
}
